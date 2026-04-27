<?php

namespace App\Http\Middleware;

use App\Models\Payment;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnsureCourseOwnership
{
    public function handle(Request $request, Closure $next)
    {
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        $course = $request->route('course');

        if (!$course) {
            return $next($request);
        }

        $user = Auth::user();
        $owned = $user->role === 'admin' || 
                 $user->hasRole('super_admin') ||
                 Payment::where('user_id', $user->id)
                    ->where('course_item_id', $course->courseItem_id)
                    ->where('status', 'paid')
                    ->exists();

        if (!$owned) {
            return redirect()->route('course.detail', $course->uuid)
                ->with('error', 'Please purchase this course first.');
        }

        return $next($request);
    }
}