<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    // ✅ GET /api/categories — get all categories (public)
    public function index()
    {
        $categories = Category::all();

        return response()->json(['categories' => $categories]);
    }

    // ✅ POST /api/admin/categories — create category (admin only)
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100',
        ]);

        $category = Category::create([
            'name' => $request->name,
        ]);

        return response()->json([
            'message' => 'Category created!',
            'category' => $category,
        ], 201);
    }

    // ✅ PUT /api/admin/categories/{id} — update category (admin only)
    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:100',
        ]);

        $category->update(['name' => $request->name]);

        return response()->json([
            'message' => 'Category updated!',
            'category' => $category,
        ]);
    }

    // ✅ DELETE /api/admin/categories/{id} — delete category (admin only)
    public function destroy($id)
    {
        Category::findOrFail($id)->delete();

        return response()->json(['message' => 'Category deleted!']);
    }
}