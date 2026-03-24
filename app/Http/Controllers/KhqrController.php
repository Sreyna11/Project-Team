<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\CourseItem;
use App\Services\KHQRService;
use App\Services\TelegramService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class KhqrController extends Controller
{
    protected KHQRService $khqrService;
    protected TelegramService $telegram;

    public function __construct(KHQRService $khqrService, TelegramService $telegram)
    {
        $this->khqrService = $khqrService;
        $this->telegram = $telegram;
    }

    /**
     * Safely generate KHQR payload
     */
    public function generateQR(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'course_item_id' => 'required|integer|exists:course_item,courseItem_id',
        ]);

        $course = CourseItem::with('activePromotion')->findOrFail($validated['course_item_id']);

        // Check if user already paid
        $existingPayment = Payment::where('user_id', $request->user()->id)
            ->where('course_item_id', $course->courseItem_id)  // Use courseItem_id
            ->where('status', 'paid')
            ->first();

        if ($existingPayment) {
            return response()->json([
                'success' => true,
                'status' => 'paid',
                'message' => 'You have already paid for this course!',
                'course_title' => $course->title,
            ]);
        }

        $promo = $course->activePromotion;
        $finalPrice = $promo
            ? $promo->finalPrice((float) $course->price)
            : (float) $course->price;

        $transactionId = 'LH' . strtoupper(Str::random(8));

        try {
            $result = $this->khqrService->generateIndividualQR([
                'amount' => 0,
                'currency' => 'USD',
                'bill_number' => null,
            ]);

            if (isset($result['error']) || !isset($result['data'])) {
                Log::error('QR generation error', ['error' => $result['error'] ?? 'Unknown Format']);
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to generate QR: ' . ($result['error'] ?? 'Invalid response from SDK'),
                ], 400);
            }

            // Save payment with correct course_item_id
            $payment = Payment::create([
                'user_id' => $request->user()->id,
                'course_item_id' => $course->courseItem_id,  // Make sure this matches
                'amount' => $finalPrice,
                'invoice_number' => $transactionId,
                'md5' => $result['data']['md5'],
                'status' => 'unpaid',
                'paid_at' => null,
            ]);

            return response()->json([
                'success' => true,
                'qr_code' => $result['data']['qr'],
                'qr_string' => $result['data']['qr'],
                'amount' => $finalPrice,
                'transaction_id' => $transactionId,
                'payment_id' => $payment->payment_id,
                'md5' => $result['data']['md5'],
                'course_title' => $course->title,
                'message' => 'QR generated successfully',
            ]);

        } catch (\Exception $e) {
            Log::error('Exception in generateQR', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'An error occurred: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Safe Status Checking API
     */
    public function checkPayment(Request $request): JsonResponse
{
    $validated = $request->validate([
        'md5' => 'required|string',
    ]);

    $payment = Payment::where('md5', $validated['md5'])->first();

    if (!$payment) {
        return response()->json([
            'success' => false,
            'message' => 'Payment not found',
        ], 404);
    }

    if ($payment->status === 'paid') {
        return response()->json([
            'success' => true,
            'status' => 'SUCCESS',
            'message' => 'Payment already completed!',
        ]);
    }

    try {
        $result = $this->khqrService->checkPayment($payment->md5);
        $isSuccess = isset($result['responseCode']) && $result['responseCode'] === 0;

        Log::info('KHQR check result', [
            'payment_id' => $payment->payment_id,
            'isSuccess' => $isSuccess,
            'result' => $result
        ]);

        if ($isSuccess && isset($result['data'])) {
            $payment->update([
                'status' => 'paid',
                'paid_at' => now(),
            ]);

            Log::info('Payment updated to paid', [
                'payment_id' => $payment->payment_id,
                'user_id' => $payment->user_id,
                'course_item_id' => $payment->course_item_id,
                'amount' => $payment->amount,
                'invoice_number' => $payment->invoice_number,
            ]);

            // Fetch user and course data
            $user = \App\Models\User::where('id', $payment->user_id)->first();
            $course = \App\Models\CourseItem::where('courseItem_id', $payment->course_item_id)->first();

            Log::info('Fetched data for notification', [
                'user_found' => $user ? true : false,
                'user_data' => $user ? ['id' => $user->id, 'name' => $user->name, 'email' => $user->email] : null,
                'course_found' => $course ? true : false,
                'course_data' => $course ? ['id' => $course->courseItem_id, 'title' => $course->title] : null,
            ]);

            // Prepare notification data
            $notificationData = [
                'name' => $user ? ($user->name ?? $user->full_name ?? 'N/A') : 'N/A',
                'email' => $user ? ($user->email ?? 'N/A') : 'N/A',
                'course_title' => $course ? ($course->title ?? 'N/A') : 'N/A',
                'amount' => $payment->amount,
                'order_id' => $payment->invoice_number,
                'currency' => 'USD',
            ];

            Log::info('Sending Telegram notification with data:', $notificationData);

            // Send Telegram Notification
            $telegramSent = $this->telegram->sendPaymentNotification($notificationData);
            
            Log::info('Telegram notification result', ['sent' => $telegramSent]);

            return response()->json([
                'success' => true,
                'status' => 'SUCCESS',
                'message' => 'Payment completed successfully!',
            ]);
        }

        return response()->json([
            'success' => false,
            'status' => 'PENDING',
            'message' => $result['responseMessage'] ?? 'Waiting for payment...',
        ]);

    } catch (\Exception $e) {
        Log::error('Payment check error: ' . $e->getMessage());
        Log::error('Stack trace: ' . $e->getTraceAsString());
        return response()->json([
            'success' => false,
            'message' => 'An error occurred checking payment: ' . $e->getMessage(),
        ], 500);
    }
}

    /**
     * Fallback old endpoint for legacy frontend compatibility (passes to new architecture)
     */
    public function generate(Request $request)
    {
        return $this->generateQR($request);
    }

    /**
     * Fallback old endpoint for legacy frontend compatibility (passes to new architecture)
     */
    public function checkStatus(Request $request)
    {
        $request->validate([
            'payment_id' => 'required|integer',
        ]);

        $payment = Payment::where('payment_id', $request->payment_id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $request->merge(['md5' => $payment->md5]);

        $response = $this->checkPayment($request);
        $responseData = $response->getData();

        // Ensure consistent status format
        if ($payment->status === 'paid') {
            return response()->json([
                'success' => true,
                'status' => 'SUCCESS',
                'message' => 'Payment completed successfully!',
            ]);
        }

        return $response;
    }
}
