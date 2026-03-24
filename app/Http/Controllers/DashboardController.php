<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\CourseItem;
use App\Models\Payment;
use App\Models\FreeDocument;
use App\Models\UserCourseProgress;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    // ✅ GET /api/dashboard — user's own dashboard
    public function index(Request $request)
    {
        $user = $request->user();

        // Get all paid courses by this user
        $payments = Payment::where('user_id', $user->id)
            ->with(['course.videoModules', 'course.category', 'promotion'])
            ->where('status', 'paid')
            ->orderBy('paid_at', 'desc')
            ->get();

        // Attach progress % to each course
        $coursesWithProgress = $payments->map(function ($payment) use ($user) {
            $course = $payment->course;
            $totalMods = $course->videoModules->count();
            $completedMods = UserCourseProgress::where('user_id', $user->id)
                ->where('courseItem_id', $course->courseItem_id)
                ->where('completed', true)
                ->count();

            return [
                'payment' => $payment,
                'course' => $course,
                'invoice_number' => $payment->invoice_number,
                'amount_paid' => $payment->amount,
                'paid_at' => $payment->paid_at,
                'progress_percent' => $totalMods > 0
                    ? round(($completedMods / $totalMods) * 100)
                    : 0,
                'completed_modules' => $completedMods,
                'total_modules' => $totalMods,
            ];
        });

        return response()->json([
            'user' => $user,
            'courses' => $coursesWithProgress,
            'total_courses' => $payments->count(),
            'total_spent' => $payments->sum('amount'),
            'last_purchase' => $payments->first()?->paid_at,
        ]);
    }

    // ✅ GET /api/admin/stats — admin dashboard statistics
    public function adminStats()
    {
        return response()->json([
            'total_users' => User::count(),
            'total_courses' => CourseItem::count(),
            'total_documents' => FreeDocument::count(),
            'total_payments' => Payment::where('status', 'paid')->count(),
            'total_revenue' => Payment::where('status', 'paid')->sum('amount'),
            'recent_users' => User::latest('created_at')->take(5)->get(),
            'recent_payments' => Payment::with(['user', 'course'])
                ->where('status', 'paid')
                ->latest('paid_at')
                ->take(5)
                ->get(),
        ]);
    }
}