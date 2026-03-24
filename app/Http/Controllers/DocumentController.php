<?php

namespace App\Http\Controllers;

use App\Models\FreeDocument;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
    // ✅ GET /api/documents
    public function index(Request $request)
    {
        $query = FreeDocument::with(['header', 'category']);

        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->has('search')) {
            $query->where('title', 'ilike', '%' . $request->search . '%');
        }

        // ← featured for home page
        if ($request->has('featured')) {
            $query->where('show_in_header', true);
        }

        $documents = $query->get();

        $documents->each(function ($doc) {
            if ($doc->logo && !str_starts_with($doc->logo, 'http')) {
                $doc->logo = asset('storage/' . $doc->logo);
            }
        });

        return response()->json(['documents' => $documents]);
    }

    // ✅ GET /api/documents/{id}
    public function show($id)
    {
        $document = FreeDocument::with(['header', 'category'])->findOrFail($id);

        if ($document->logo && !str_starts_with($document->logo, 'http')) {
            $document->logo = asset('storage/' . $document->logo);
        }

        return response()->json(['document' => $document]);
    }

    // ✅ POST /api/admin/documents
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:200',
            'description' => 'nullable|string',
            'file' => 'required|string|max:500',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'header_id' => 'nullable|exists:header,header_id',
            'category_id' => 'nullable|exists:category,category_id',
            'is_active' => 'nullable|boolean',
            'show_in_header' => 'nullable|boolean',
        ]);

        $logoPath = null;

        // Handle image upload
        if ($request->hasFile('logo')) {
            $logoPath = $request->file('logo')->store('documents', 'public');
        }

        $document = FreeDocument::create([
            'header_id' => $request->header_id,
            'category_id' => $request->category_id,
            'logo' => $logoPath,
            'title' => $request->title,
            'description' => $request->description,
            'file' => $request->file,
            'is_active' => $request->is_active ?? true,
            'show_in_header' => $request->show_in_header ?? false,
        ]);

        return response()->json([
            'message' => 'Document created!',
            'document' => $document,
        ], 201);
    }

    // ✅ PUT /api/admin/documents/{id}
    public function update(Request $request, $id)
    {
        $document = FreeDocument::findOrFail($id);

        $request->validate([
            'title' => 'sometimes|string|max:200',
            'description' => 'nullable|string',
            'file' => 'sometimes|string|max:500',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'header_id' => 'nullable|exists:header,header_id',
            'category_id' => 'nullable|exists:category,category_id',
            'is_active' => 'nullable|boolean',
            'show_in_header' => 'nullable|boolean',
        ]);

        // Handle new image upload
        if ($request->hasFile('logo')) {
            // Delete old image if exists
            if ($document->logo) {
                Storage::disk('public')->delete($document->logo);
            }
            $document->logo = $request->file('logo')->store('documents', 'public');
        }

        if ($request->has('title'))
            $document->title = $request->title;
        if ($request->has('description'))
            $document->description = $request->description;
        if ($request->has('file'))
            $document->file = $request->file;
        if ($request->has('header_id'))
            $document->header_id = $request->header_id;
        if ($request->has('category_id'))
            $document->category_id = $request->category_id;
        if ($request->has('is_active'))
            $document->is_active = $request->is_active;
        if ($request->has('show_in_header'))
            $document->show_in_header = $request->show_in_header;

        $document->save();

        return response()->json([
            'message' => 'Document updated!',
            'document' => $document,
        ]);
    }

    // ✅ DELETE /api/admin/documents/{id}
    public function destroy($id)
    {
        $document = FreeDocument::findOrFail($id);

        // Delete image file if exists
        if ($document->logo) {
            Storage::disk('public')->delete($document->logo);
        }

        $document->delete();

        return response()->json(['message' => 'Document deleted!']);
    }
}