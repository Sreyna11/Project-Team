<?php

namespace App\Http\Controllers;

use App\Models\VideoCourseItem;
use App\Models\CourseItem;
use Illuminate\Http\Request;

class VideoModuleController extends Controller
{
    // ✅ GET /api/courses/{courseId}/modules
    public function index($courseId)
    {
        $course = CourseItem::findOrFail($courseId);

        $modules = VideoCourseItem::where('course_item_id', $courseId)
            ->where('is_active', true)
            ->orderBy('order_num')
            ->get();

        return response()->json([
            'course' => $course->title,
            'modules' => $modules,
        ]);
    }

    // ✅ POST /api/admin/courses/{courseId}/modules
    public function store(Request $request, $courseId)
    {
        $course = CourseItem::findOrFail($courseId);

        $request->validate([
            'title' => 'required|string|max:200',
            'description' => 'nullable|string',
            'video_url' => 'nullable|string|max:500',
            'duration' => 'nullable|string|max:50',
            'is_free' => 'boolean',
            'is_active' => 'boolean',
            'order_num' => 'nullable|integer',
        ]);

        // Auto set order_num if not provided
        $orderNum = $request->order_num ??
            VideoCourseItem::where('course_item_id', $courseId)->count() + 1;

        $module = VideoCourseItem::create([
            'course_item_id' => $courseId,
            'title' => $request->title,
            'description' => $request->description,
            'video_url' => $request->video_url,
            'duration' => $request->duration,
            'is_free' => $request->is_free ?? false,
            'is_active' => $request->is_active ?? true,
            'order_num' => $orderNum,
            'drop_list' => '[]',
        ]);

        return response()->json([
            'message' => 'Module added successfully!',
            'module' => $module,
        ], 201);
    }

    // ✅ PUT /api/admin/courses/{courseId}/modules/{moduleId}
    public function update(Request $request, $courseId, $moduleId)
    {
        $module = VideoCourseItem::where('course_item_id', $courseId)
            ->where('videoCourseItem_id', $moduleId)
            ->firstOrFail();

        $request->validate([
            'title' => 'sometimes|string|max:200',
            'description' => 'nullable|string',
            'video_url' => 'nullable|string|max:500',
            'duration' => 'nullable|string|max:50',
            'is_free' => 'boolean',
            'is_active' => 'boolean',
            'order_num' => 'nullable|integer',
        ]);

        $module->update($request->only([
            'title',
            'description',
            'video_url',
            'duration',
            'is_free',
            'is_active',
            'order_num',
        ]));

        return response()->json([
            'message' => 'Module updated!',
            'module' => $module,
        ]);
    }

    // ✅ DELETE /api/admin/courses/{courseId}/modules/{moduleId}
    public function destroy($courseId, $moduleId)
    {
        $module = VideoCourseItem::where('course_item_id', $courseId)
            ->where('videoCourseItem_id', $moduleId)
            ->firstOrFail();

        $module->delete();

        return response()->json(['message' => 'Module deleted!']);
    }
}