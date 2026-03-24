<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    // ✅ GET /api/menu — get all menu items (public)
    public function index()
    {
        $menu = Menu::orderBy('order_num')->get();

        return response()->json(['menu' => $menu]);
    }

    // ✅ POST /api/admin/menu — create menu item (admin only)
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'link' => 'required|string|max:255',
            'order_num' => 'nullable|integer',
        ]);

        $item = Menu::create($request->only([
            'name',
            'link',
            'order_num'
        ]));

        return response()->json([
            'message' => 'Menu item created!',
            'item' => $item,
        ], 201);
    }

    // ✅ PUT /api/admin/menu/{id} — update menu item (admin only)
    public function update(Request $request, $id)
    {
        $item = Menu::findOrFail($id);

        $request->validate([
            'name' => 'sometimes|string|max:100',
            'link' => 'sometimes|string|max:255',
            'order_num' => 'nullable|integer',
        ]);

        $item->update($request->only([
            'name',
            'link',
            'order_num'
        ]));

        return response()->json([
            'message' => 'Menu item updated!',
            'item' => $item,
        ]);
    }

    // ✅ DELETE /api/admin/menu/{id} — delete menu item (admin only)
    public function destroy($id)
    {
        Menu::findOrFail($id)->delete();

        return response()->json(['message' => 'Menu item deleted!']);
    }
}