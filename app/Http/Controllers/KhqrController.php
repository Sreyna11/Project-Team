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
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class KhqrController extends Controller
{
    protected KHQRService $khqrService;
    protected TelegramService $telegram;

    public function __construct(KHQRService $khqrService, TelegramService $telegram)
    {
        $this->khqrService = $khqrService;
        $this->telegram = $telegram;
    }

    public function generateQR(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'course_item_id' => 'required|integer|exists:course_item,courseItem_id',
        ]);

        $course = CourseItem::with('activePromotion')->findOrFail($validated['course_item_id']);

        // Already paid?
        $existing = Payment::where('user_id', $request->user()->id)
            ->where('course_item_id', $course->courseItem_id)
            ->where('status', 'paid')
            ->first();

        if ($existing) {
            return response()->json([
                'success' => true,
                'status' => 'paid',
                'message' => 'You already own this course.',
                'course_title' => $course->title,
            ]);
        }

        // Price
        $promo = $course->activePromotion;
        $finalPrice = $promo
            ? $promo->finalPrice((float) $course->price)
            : (float) $course->price;

        $transactionId = 'LH' . strtoupper(Str::random(8));

        try {
            $result = $this->khqrService->generateIndividualQR([
                'amount' => $finalPrice,
                'currency' => 'USD',
                'bill_number' => $transactionId,
            ]);

            if (isset($result['error']) || empty($result['data']['qr'])) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to generate QR: ' . ($result['error'] ?? 'Unknown error'),
                ], 400);
            }

            $qrString = $result['data']['qr'];
            $md5 = $result['data']['md5'];

            // Generate QR image server-side using simple-qrcode (SVG)
            $qrSvg = QrCode::format('svg')
                ->size(300)
                ->errorCorrection('M')
                ->generate($qrString);

            $qrImage = 'data:image/svg+xml;base64,' . base64_encode($qrSvg);

            // Cleanup any previous unpaid attempts for this user/course
            Payment::where('user_id', $request->user()->id)
                ->where('course_item_id', $course->courseItem_id)
                ->where('status', 'unpaid')
                ->delete();

            // Save unpaid payment record
            $payment = Payment::create([
                'user_id' => $request->user()->id,
                'course_item_id' => $course->courseItem_id,
                'amount' => $finalPrice,
                'invoice_number' => $transactionId,
                'md5' => $md5,
                'status' => 'unpaid',
                'paid_at' => null,
            ]);

            return response()->json([
                'success' => true,
                'status' => 'unpaid',
                'qr_image' => $qrImage,
                'qr_string' => $qrString,
                'amount' => $finalPrice,
                'transaction_id' => $transactionId,
                'payment_id' => $payment->id,
                'md5' => $md5,
                'course_title' => $course->title,
            ]);

        } catch (\Exception $e) {
            Log::error('generateQR error: ' . $e->getMessage(), ['trace' => $e->getTraceAsString()]);
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function checkPayment(Request $request)
    {
        try {
            $payment = Payment::where('md5', $request->md5)->first();

            if (!$payment) {
                return response()->json(['status' => 'PENDING']);
            }

            if ($payment->status === 'paid') {
                return response()->json(['status' => 'SUCCESS']);
            }

            $result = $this->khqrService->checkPayment($payment->md5);

            $isSuccess =
                ($result['responseCode'] ?? null) == 0 ||
                ($result['status'] ?? null) === 'SUCCESS';

            if ($isSuccess) {

                $payment->update([
                    'status' => 'paid',
                    'paid_at' => now()
                ]);

                // Send Telegram Notification
                try {
                    $payment->load(['user', 'course']);
                    $this->telegram->sendPaymentNotification([
                        'name' => $payment->user->name ?? 'Unknown',
                        'email' => $payment->user->email ?? 'Unknown',
                        'course_title' => $payment->course->title ?? 'Unknown',
                        'amount' => $payment->amount,
                        'order_id' => $payment->invoice_number,
                    ]);
                } catch (\Exception $e) {
                    Log::error('Telegram alert failed inside KhqrController: ' . $e->getMessage());
                }

                return response()->json(['status' => 'SUCCESS']);
            }

            return response()->json(['status' => 'PENDING']);

        } catch (\Throwable $e) {
            Log::error('KHQR controller error: ' . $e->getMessage());

            return response()->json([
                'status' => 'ERROR'
            ], 500);
        }
    }

    // Legacy aliases
    public function generate(Request $request)
    {
        return $this->generateQR($request);
    }

    public function checkStatus(Request $request)
    {
        $request->validate(['payment_id' => 'required|integer']);
        $payment = Payment::where('payment_id', $request->payment_id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        if ($payment->status === 'paid') {
            return response()->json(['success' => true, 'status' => 'SUCCESS']);
        }

        $request->merge(['md5' => $payment->md5]);
        return $this->checkPayment($request);
    }
}