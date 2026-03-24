<?php

namespace App\Http\Controllers;

use App\Models\CourseItem;
use App\Models\Payment;
use App\Models\Promotion;
use App\Services\TelegramService;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    protected TelegramService $telegram;

    public function __construct(TelegramService $telegram)
    {
        $this->telegram = $telegram;
    }

    // ✅ POST /api/payment/buy — user buys a course
    public function buy(Request $request)
    {
        $request->validate([
            'course_item_id' => 'required|integer|exists:course_item,courseItem_id',
            'promotion_id' => 'nullable|integer|exists:promotion,promotion_id',
        ]);

        $user = $request->user();
        $course = CourseItem::findOrFail($request->course_item_id);

        // Check if already purchased
        $alreadyPaid = Payment::where('user_id', $user->id)
            ->where('course_item_id', $course->courseItem_id)
            ->where('status', 'paid')
            ->exists();

        if ($alreadyPaid) {
            return response()->json([
                'message' => 'You already own this course.'
            ], 409);
        }

        // Calculate amount
        $amount = (float) $course->price;
        $promotionId = null;

        if ($request->promotion_id) {
            $today = now()->toDateString();
            $promo = Promotion::where('promotion_id', $request->promotion_id)
                ->where('course_item_id', $course->courseItem_id)
                ->where('start_date', '<=', $today)
                ->where('end_date', '>=', $today)
                ->first();

            if ($promo) {
                $amount = $promo->finalPrice($amount);
                $promotionId = $promo->promotion_id;
            }
        }

        // Also check active promotion automatically
        if (!$promotionId) {
            $today = now()->toDateString();
            $autoPromo = Promotion::where('course_item_id', $course->courseItem_id)
                ->where('start_date', '<=', $today)
                ->where('end_date', '>=', $today)
                ->first();

            if ($autoPromo) {
                $amount = $autoPromo->finalPrice($amount);
                $promotionId = $autoPromo->promotion_id;
            }
        }

        // Generate invoice number
        $invoiceNumber = 'INV-' . now()->format('Ym') . '-' . str_pad(
            Payment::count() + 1,
            5,
            '0',
            STR_PAD_LEFT
        );

        // Create payment
        $payment = Payment::create([
            'user_id' => $user->id,
            'course_item_id' => $course->courseItem_id,
            'promotion_id' => $promotionId,
            'invoice_number' => $invoiceNumber,
            'md5' => md5($invoiceNumber . time()),
            'amount' => $amount,
            'status' => 'paid',
            'paid_at' => now(),
        ]);

        // Send Telegram alert
        try {
            $this->telegram->sendPaymentNotification([
                'order_id' => $invoiceNumber,
                'amount' => $amount,
                'currency' => 'USD',
                'status' => 'success',
            ]);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Telegram notification failed: ' . $e->getMessage());
        }

        return response()->json([
            'message' => 'Course purchased successfully!',
            'payment' => $payment->load('course', 'promotion'),
        ], 201);
    }
    // ✅ GET /api/payment/my — get logged in user's purchases
    public function myPayments(Request $request)
    {
        $payments = Payment::where('user_id', $request->user()->id)
            ->with(['course.videoModules', 'course.category', 'promotion'])
            ->where('status', 'paid')
            ->orderBy('paid_at', 'desc')
            ->get();

        return response()->json([
            'payments' => $payments,
            'total_spent' => $payments->sum('amount'),
        ]);
    }

    // ✅ GET /api/admin/payments — admin sees all payments
    public function allPayments()
    {
        $payments = Payment::with(['user', 'course', 'promotion'])
            ->orderBy('paid_at', 'desc')
            ->get();

        return response()->json([
            'payments' => $payments,
            'total_revenue' => $payments->where('status', 'paid')->sum('amount'),
            'total_unpaid' => $payments->where('status', 'unpaid')->count(),
        ]);
    }

    // ✅ PUT /api/admin/payments/{id}/status — admin updates payment status
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:paid,unpaid',
        ]);

        $payment = Payment::findOrFail($id);
        $payment->update([
            'status' => $request->status,
            'paid_at' => $request->status === 'paid' ? now() : null,
        ]);

        return response()->json([
            'message' => 'Payment status updated!',
            'payment' => $payment,
        ]);
    }
}
