<?php

use App\Livewire\HomePage;
use App\Livewire\CoursesPage;
use App\Livewire\CourseDetail;
use App\Livewire\DocumentsPage;
use App\Livewire\DashboardPage;
use App\Livewire\ContactForm;
use App\Livewire\VideoPlayer;

use Illuminate\Support\Facades\Route;

// Public routes
Route::get('/', HomePage::class)->name('home');
Route::get('/courses', CoursesPage::class)->name('courses');
Route::get('/courses/{course}', CourseDetail::class)
    ->name('course.detail');
Route::get('/documents', DocumentsPage::class)->name('documents');
Route::get('/about', fn() => view('pages.about'))->name('about');
Route::get('/contact', fn() => view('pages.contact'))->name('contact');

// Video player (accessible for everyone - VideoPlayer component handles auth/access control)
Route::get('/courses/{course}/learn', VideoPlayer::class)
    ->name('course.player');

Route::get('/courses/{course}/learn/{module}', VideoPlayer::class)
    ->name('course.player.module');

// Auth required
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', DashboardPage::class)->name('dashboard');
});



// Image proxy — serves MinIO images through the app
Route::get('/image/{path}', function (string $path) {
    $path = ltrim($path, '/');
    $disk = \Illuminate\Support\Facades\Storage::disk('minio');

    if (!$disk->exists($path)) {
        abort(404);
    }

    return response($disk->get($path))
        ->header('Content-Type', $disk->mimeType($path));
})->where('path', '.*')->name('image.proxy');

// Video proxy — hides real MinIO URL
Route::get('/watch/{course}/{module}', function (\App\Models\CourseItem $course, \App\Models\VideoCourseItem $module) {
    // Check ownership
    $owned = \App\Models\Payment::where('user_id', Auth::id())
        ->where('course_item_id', $course->courseItem_id)
        ->where('status', 'paid')
        ->exists();

    if (!$owned && !$module->is_free) {
        abort(403, 'Purchase required');
    }

    // Stream video from MinIO
    $stream = \Illuminate\Support\Facades\Storage::disk('minio')
        ->readStream($module->video_file);

    $size = \Illuminate\Support\Facades\Storage::disk('minio')
        ->size($module->video_file);
    $mimeType = 'video/mp4';

    return response()->stream(function () use ($stream) {
        fpassthru($stream);
    }, 200, [
        'Content-Type' => $mimeType,
        'Content-Length' => $size,
        'Content-Disposition' => 'inline',
        'Cache-Control' => 'no-store, no-cache',
        'X-Content-Type-Options' => 'nosniff',
        'Accept-Ranges' => 'bytes',
    ]);
})->middleware('auth')->whereUuid('course')->whereUuid('module')->name('video.proxy');

// Document proxy — handles reliable access to document files
Route::get('/document/{document}/read', function (\App\Models\FreeDocument $document) {
    if (!$document->file) abort(404);
    $disk = \Illuminate\Support\Facades\Storage::disk('public');
    if (! $disk->exists($document->file)) abort(404, 'File not found on public disk');
    
    return response($disk->get($document->file), 200, [
        'Content-Type' => 'application/pdf',
        'Content-Disposition' => 'inline; filename="' . \Illuminate\Support\Str::slug($document->title) . '.pdf"',
    ]);
})->middleware('auth')->name('document.read');

Route::get('/document/{document}/download', function (\App\Models\FreeDocument $document) {
    if (!$document->file) abort(404);
    $disk = \Illuminate\Support\Facades\Storage::disk('public');
    if (! $disk->exists($document->file)) abort(404, 'File not found on public disk');
    
    return $disk->download($document->file, \Illuminate\Support\Str::slug($document->title) . '.pdf');
})->middleware('auth')->name('document.download');

require __DIR__ . '/auth.php';