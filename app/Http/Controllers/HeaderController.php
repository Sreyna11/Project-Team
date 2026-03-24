<?php

namespace App\Http\Controllers;

use App\Models\Header;
use Illuminate\Http\Request;

class HeaderController extends Controller
{
    // ✅ GET /api/headers — get all headers with their courses (public)
    public function index()
    {
        $headers = Header::with([
            'courses' => function ($query) {
                $query->where('is_active', true)
                      ->where('show_in_header', true);
            },
            'freeDocuments' => function ($query) {
                $query->where('is_active', true)
                      ->where('show_in_header', true);
            }
        ])->orderBy('order_num')->get();

        return response()->json(['headers' => $headers]);
    }

    // ✅ POST /api/admin/headers — create header (admin only)
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:200',
            'description' => 'nullable|string',
            'order_num' => 'nullable|integer',
        ]);

        $header = Header::create($request->only([
            'title',
            'description',
            'order_num'
        ]));

        return response()->json([
            'message' => 'Header created!',
            'header' => $header,
        ], 201);
    }

    // ✅ PUT /api/admin/headers/{id} — update header (admin only)
    public function update(Request $request, $id)
    {
        $header = Header::findOrFail($id);

        $request->validate([
            'title' => 'sometimes|string|max:200',
            'description' => 'nullable|string',
            'order_num' => 'nullable|integer',
        ]);

        $header->update($request->only([
            'title',
            'description',
            'order_num'
        ]));

        return response()->json([
            'message' => 'Header updated!',
            'header' => $header,
        ]);
    }

    // ✅ DELETE /api/admin/headers/{id} — delete header (admin only)
    public function destroy($id)
    {
        Header::findOrFail($id)->delete();

        return response()->json(['message' => 'Header deleted!']);
    }
}