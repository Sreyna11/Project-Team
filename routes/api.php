<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\PromotionController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\HeaderController;
use App\Http\Controllers\VideoModuleController;
use App\Http\Controllers\KhqrController;



// ============================================
// ✅ PUBLIC ROUTES — no login needed
// ============================================
Route::get('/khqr/test', function() {
    return response()->json(['message' => 'KhqrController is reachable']);
});

// Auth
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

// Menu
Route::get('/menu', [MenuController::class, 'index']);

// Headers
Route::get('/headers', [HeaderController::class, 'index']);

// Categories
Route::get('/categories', [CategoryController::class, 'index']);

// Courses
Route::get('/courses', [CourseController::class, 'index']);
Route::get('/courses/{id}', [CourseController::class, 'show']);

// Active Promotions
Route::get('/promotions/active', [PromotionController::class, 'active']);

// Contact Form
Route::post('/contact', [ContactController::class, 'send']);

// Documents
Route::get('/documents', [DocumentController::class, 'index']);

// Public — get modules for a course
Route::get('/courses/{courseId}/modules', [VideoModuleController::class, 'index']);
// ============================================
// ✅ PROTECTED ROUTES — login required
// ============================================
Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::post('/logout', [UserController::class, 'logout']);
    Route::get('/me', [UserController::class, 'me']);
    Route::put('/me', [UserController::class, 'updateProfile']);

    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index']);

    // Documents
    Route::get('/documents/{id}', [DocumentController::class, 'show']);

    // Payment
    Route::post('/payment/buy', [PaymentController::class, 'buy']);
    Route::get('/payment/my', [PaymentController::class, 'myPayments']);

    // Progress
    Route::post('/progress/{courseId}', [CourseController::class, 'updateProgress']);
    Route::get('/progress/{courseId}', [CourseController::class, 'getProgress']);

    // ============================================
    // ✅ ADMIN ONLY ROUTES
    // ============================================
    Route::middleware('admin')->prefix('admin')->group(function () {

        // Stats
        Route::get('/stats', [DashboardController::class, 'adminStats']);

        // Users
        Route::get('/users', [UserController::class, 'allUsers']);

        // Delete User
        Route::delete('/users/{id}', [UserController::class, 'destroy']);

        // Courses
        Route::post('/courses', [CourseController::class, 'store']);
        Route::put('/courses/{id}', [CourseController::class, 'update']);
        Route::delete('/courses/{id}', [CourseController::class, 'destroy']);

        // Documents
        Route::post('/documents', [DocumentController::class, 'store']);
        Route::put('/documents/{id}', [DocumentController::class, 'update']);
        Route::delete('/documents/{id}', [DocumentController::class, 'destroy']);

        // Payments
        Route::get('/payments', [PaymentController::class, 'allPayments']);
        Route::put('/payments/{id}/status', [PaymentController::class, 'updateStatus']);

        // Promotions
        Route::get('/promotions', [PromotionController::class, 'index']);
        Route::post('/promotions', [PromotionController::class, 'store']);
        Route::put('/promotions/{id}', [PromotionController::class, 'update']);
        Route::delete('/promotions/{id}', [PromotionController::class, 'destroy']);

        // Events
        Route::get('/events', [EventController::class, 'index']);
        Route::post('/events', [EventController::class, 'store']);
        Route::put('/events/{id}', [EventController::class, 'update']);
        Route::delete('/events/{id}', [EventController::class, 'destroy']);

        // Menu
        Route::post('/menu', [MenuController::class, 'store']);
        Route::put('/menu/{id}', [MenuController::class, 'update']);
        Route::delete('/menu/{id}', [MenuController::class, 'destroy']);

        // Contacts
        Route::get('/contacts', [ContactController::class, 'index']);
        Route::delete('/contacts/{id}', [ContactController::class, 'destroy']);

        // Categories
        Route::post('/categories', [CategoryController::class, 'store']);
        Route::put('/categories/{id}', [CategoryController::class, 'update']);
        Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);

        // Headers
        Route::post('/headers', [HeaderController::class, 'store']);
        Route::put('/headers/{id}', [HeaderController::class, 'update']);
        Route::delete('/headers/{id}', [HeaderController::class, 'destroy']);

        // Modules
        Route::post('/courses/{courseId}/modules', [VideoModuleController::class, 'store']);
        Route::put('/courses/{courseId}/modules/{moduleId}', [VideoModuleController::class, 'update']);
        Route::delete('/courses/{courseId}/modules/{moduleId}', [VideoModuleController::class, 'destroy']);
    });

    Route::post('/khqr/generate',      [KhqrController::class, 'generate']);
    Route::post('/khqr/check-status',  [KhqrController::class, 'checkStatus']);
});

