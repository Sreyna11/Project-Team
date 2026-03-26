<?php

use Illuminate\Support\Facades\Route;

// Home - points to partials.pages.home
Route::get('/', function () { 
    return view('partials.pages.home'); 
})->name('home');

// About
Route::get('/about', function () { 
    return view('partials.pages.about'); 
})->name('about');

// Courses
Route::get('/courses', function () { 
    return view('partials.pages.courses'); 
})->name('courses');

// Documents
Route::get('/documents', function () { 
    return view('partials.pages.documents'); 
})->name('documents');

// Contact
Route::get('/contact', function () { 
    return view('partials.pages.contact'); 
})->name('contact');

// Dashboard
Route::get('/dashboard', function () { 
    return view('partials.pages.dashboard'); 
})->name('dashboard');

// Course Detail
Route::get('/course/{id}', function ($id) { 
    return view('partials.pages.course-detail'); 
})->name('course.detail');