<?php

namespace App\Http\Controllers;

use App\Models\Promotion;
use Illuminate\Http\Request;

class PromotionController extends Controller
{
    // ✅ GET /api/promotions/active — get active promotions today (public)
    public function active()
    {
        $promotions = Promotion::with(['course', 'event'])
            ->where('start_date', '<=', now())
            ->where('end_date', '>=', now())
            ->get();

        // Add final price to each promotion
        $promotions->each(function ($promo) {
            $promo->final_price = $promo->finalPrice(
                (float) $promo->course->price
            );
        });

        return response()->json(['promotions' => $promotions]);
    }

    // ✅ GET /api/promotions — get all promotions (admin only)
    public function index()
    {
        $promotions = Promotion::with(['course', 'event'])
            ->orderBy('start_date', 'desc')
            ->get();

        return response()->json(['promotions' => $promotions]);
    }

    // ✅ POST /api/admin/promotions — create promotion (admin only)
    public function store(Request $request)
    {
        $request->validate([
            'event_id' => 'nullable|exists:event,event_id',
            'course_item_id' => 'required|exists:course_item,courseItem_id',
            'promotion_name' => 'required|string|max:150',
            'promotion_type' => 'required|in:percent,amount',
            'discount_value' => 'required|numeric|min:0',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $promotion = Promotion::create($request->only([
            'event_id',
            'course_item_id',
            'promotion_name',
            'promotion_type',
            'discount_value',
            'start_date',
            'end_date',
        ]));

        return response()->json([
            'message' => 'Promotion created!',
            'promotion' => $promotion->load('course', 'event'),
        ], 201);
    }

    // ✅ PUT /api/admin/promotions/{id} — update promotion (admin only)
    public function update(Request $request, $id)
    {
        $promotion = Promotion::findOrFail($id);

        $request->validate([
            'event_id' => 'nullable|exists:event,event_id',
            'course_item_id' => 'sometimes|exists:course_item,courseItem_id',
            'promotion_name' => 'sometimes|string|max:150',
            'promotion_type' => 'sometimes|in:percent,amount',
            'discount_value' => 'sometimes|numeric|min:0',
            'start_date' => 'sometimes|date',
            'end_date' => 'sometimes|date|after_or_equal:start_date',
        ]);

        $promotion->update($request->only([
            'event_id',
            'course_item_id',
            'promotion_name',
            'promotion_type',
            'discount_value',
            'start_date',
            'end_date',
        ]));

        return response()->json([
            'message' => 'Promotion updated!',
            'promotion' => $promotion->load('course', 'event'),
        ]);
    }

    // ✅ DELETE /api/admin/promotions/{id} — delete promotion (admin only)
    public function destroy($id)
    {
        Promotion::findOrFail($id)->delete();

        return response()->json(['message' => 'Promotion deleted!']);
    }
}