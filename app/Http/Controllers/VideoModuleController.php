<?php

namespace App\Http\Controllers;

use App\Models\VideoCourseItem;
use App\Models\CourseItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
 public function store(Request $request)
{
    $request->validate([
        'course_id' => 'required',
        'title' => 'required',
        'video' => 'required|file|mimes:mp4,mov,avi'
    ]);

    // ✅ Store in course-specific folder
$path = Storage::disk('minio')->put(
        "courses/{$request->course_id}/videos",
        $request->file('video')
    );

    // ✅ Save correct path
    VideoCourseItem::create([
        'course_item_id' => $request->course_id,
        'title' => $request->title,
        'video_file' => $path,
        'is_active' => true,
    ]);

    return back()->with('success', 'Video uploaded!');
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