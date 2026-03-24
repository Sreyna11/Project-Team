<?php

namespace App\Http\Controllers;

use App\Models\CourseItem;
use App\Models\UserCourseProgress;
use App\Models\Payment;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    // ✅ GET /api/courses — get all courses
    public function index(Request $request)
    {
        $query = CourseItem::with(['category', 'activePromotion'])
            ->where('is_active', true);

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

        $courses = $query->get();

        $courses->each(function ($course) {
            $promo = $course->activePromotion;
            $course->final_price = $promo
                ? $promo->finalPrice((float) $course->price)
                : (float) $course->price;
        });

        return response()->json(['courses' => $courses]);
    }

    // ✅ GET /api/courses/{id} — get single course with modules
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

        // ← Check ownership via Sanctum token
        $owned = false;
        if ($request->bearerToken()) {
            $user = $request->user('sanctum');
            if ($user) {
                $owned = Payment::where('user_id', $user->id)
                    ->where('course_item_id', $course->courseItem_id)
                    ->where('status', 'paid')
                    ->exists();
            }
        }

        // ← Hide video_url for locked modules if not owned
        $course->videoModules->each(function ($mod) use ($owned) {
            if (!$owned && !$mod->is_free) {
                $mod->video_url = null;
            }
        });

        return response()->json([
            'course' => $course,
            'owned' => $owned,
        ]);
    }
    // ✅ POST /api/admin/courses — create new course (admin only)
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:200',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'discount' => 'nullable|numeric|min:0',
            'category_id' => 'nullable|exists:category,category_id',
            'header_id' => 'nullable|exists:header,header_id',
            'image' => 'nullable',
            'button' => 'nullable|string|max:100',
            'is_active' => 'nullable',
            'show_in_header' => 'nullable|boolean',
        ]);

        // Handle image — file or URL string
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('courses', 'public');
            $imagePath = asset('storage/' . $imagePath);
        } elseif ($request->image) {
            $imagePath = $request->image;
        }

        // Handle is_active — accepts true/false/1/0/"true"/"false"
        $isActive = filter_var(
            $request->is_active ?? true,
            FILTER_VALIDATE_BOOLEAN,
            FILTER_NULL_ON_FAILURE
        ) ?? true;

        $course = CourseItem::create([
            'header_id' => $request->header_id,
            'category_id' => $request->category_id,
            'image' => $imagePath,
            'title' => $request->title,
            'description' => $request->description,
            'price' => $request->price,
            'discount' => $request->discount ?? 0,
            'button' => $request->button,
            'is_active' => $isActive,
            'show_in_header' => $request->show_in_header ?? false,
        ]);

        if ($request->has('modules')) {
            foreach ($request->modules as $index => $mod) {
                $course->videoModules()->create([
                    'title' => $mod['title'],
                    'description' => $mod['description'] ?? null,
                    'video_url' => $mod['video_url'] ?? null,
                    'duration' => $mod['duration'] ?? null,
                    'is_free' => $mod['is_free'] ?? false,
                    'is_active' => true,
                    'order_num' => $mod['order_num'] ?? $index + 1,
                    'drop_list' => '[]',
                ]);
            }
        }

        return response()->json([
            'message' => 'Course created!',
            'course' => $course->load('videoModules', 'category'),
        ], 201);
    }

    // ✅ PUT /api/admin/courses/{id} — update course (admin only)
    public function update(Request $request, $id)
    {
        $course = CourseItem::findOrFail($id);

        $request->validate([
            'title' => 'sometimes|string|max:200',
            'description' => 'nullable|string',
            'price' => 'sometimes|numeric|min:0',
            'discount' => 'nullable|numeric|min:0',
            'category_id' => 'nullable|exists:category,category_id',
            'header_id' => 'nullable|exists:header,header_id',
            'image' => 'nullable|string|max:500',
            'button' => 'nullable|string|max:100',
            'is_active' => 'boolean',
            'show_in_header' => 'boolean',
        ]);

        $course->update($request->only([
            'header_id',
            'category_id',
            'image',
            'title',
            'description',
            'price',
            'discount',
            'button',
            'is_active',
            'show_in_header',
        ]));

        return response()->json(['message' => 'Course updated!', 'course' => $course]);
    }

    // ✅ DELETE /api/admin/courses/{id} — delete course (admin only)
    public function destroy($id)
    {
        CourseItem::findOrFail($id)->delete();
        return response()->json(['message' => 'Course deleted!']);
    }

    // ✅ POST /api/progress/{courseId} — save module progress
    public function updateProgress(Request $request, $courseId)
    {
        $request->validate([
            'videoCourseItem_id' => 'required|integer|exists:video_course_item,videoCourseItem_id',
            'completed' => 'required|boolean',
        ]);

        $progress = UserCourseProgress::updateOrCreate(
            [
                'user_id' => $request->user()->id,
                'courseItem_id' => $courseId,
                'videoCourseItem_id' => $request->videoCourseItem_id,
            ],
            [
                'completed' => $request->completed,
                'completed_at' => $request->completed ? now() : null,
            ]
        );

        return response()->json(['message' => 'Progress saved!', 'progress' => $progress]);
    }

    // ✅ GET /api/progress/{courseId} — get progress for a course
    public function getProgress(Request $request, $courseId)
    {
        $course = CourseItem::with(['videoModules' => fn($q) => $q->where('is_active', true)])
            ->findOrFail($courseId);

        $progressRows = UserCourseProgress::where('user_id', $request->user()->id)
            ->where('courseItem_id', $courseId)
            ->get();

        $totalModules = $course->videoModules->count();
        $completedModules = $progressRows->where('completed', true)->count();
        $percentage = $totalModules > 0
            ? round(($completedModules / $totalModules) * 100)
            : 0;

        return response()->json([
            'progress' => $progressRows,
            'percentage' => $percentage,
            'completed_modules' => $completedModules,
            'total_modules' => $totalModules,
        ]);
    }
}