<?php

namespace App\Http\Controllers;

use App\Models\CourseItem;
use App\Models\Payment;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    // GET /api/courses
    public function index(Request $request)
    {
        $query = CourseItem::with(['category', 'activePromotion'])
            ->where('is_active', true)
            // ← Only courses with at least 1 active module
            ->whereHas('videoModules', fn($q) => $q->where('is_active', true));

        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->has('search') && $request->search) {
            $query->where('title', 'ilike', '%' . $request->search . '%');
        }

        if ($request->has('featured')) {
            $query->where('show_in_header', true);
        }

        $courses = $query->get()->map(function ($course) {
            $promo = $course->activePromotion;
            $course->final_price = $promo
                ? $promo->finalPrice((float) $course->price)
                : (float) $course->price;
            return $course;
        });

        return response()->json(['courses' => $courses]);
    }

    // GET /api/courses/{id}
    public function show(Request $request, $id)
    {
        $course = CourseItem::with([
            'category',
            'activePromotion',
            'videoModules' => fn($q) => $q->where('is_active', true)->orderBy('order_num'),
        ])->findOrFail($id);

        $promo = $course->activePromotion;
        $course->final_price = $promo
            ? $promo->finalPrice((float) $course->price)
            : (float) $course->price;

        // Check if current user owns this course
        $owned = false;
        if ($request->user()) {
            $owned = Payment::where('user_id', $request->user()->id)
                ->where('course_item_id', $course->courseItem_id)
                ->where('status', 'paid')
                ->exists();
        }

        return response()->json([
            'course' => $course,
            'owned'  => $owned,
        ]);
    }
}