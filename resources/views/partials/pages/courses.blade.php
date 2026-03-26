@extends('app')

@section('title', 'Courses')

@section('content')
<div id="courses-page" class="page page-hidden">
    <div class="py-10">
        <div class="container mx-auto px-4">
            <div class="mb-10">
                <h1 class="text-4xl font-bold">Video Courses</h1>
                <p>Premium video courses to help you master programming and development skills.</p>
            </div>
            <div class="mb-10 flex flex-col gap-6 lg:flex-row">
                <div class="relative flex-1">
                    <div class="search-container">
                        <i class="fas fa-search search-icon"></i>
                        <input type="text" id="course-search" class="search-input" placeholder="Search courses..." />
                    </div>
                </div>
                <div class="flex flex-wrap gap-2" id="course-categories-filter"></div>
            </div>
            <p class="results-count">
                Showing <span id="course-results-count" class="font-semibold">0</span> of
                <span id="course-total-count" class="font-semibold">0</span> courses
            </p>
            <div class="course-grid" id="all-courses-grid"></div>
        </div>
    </div>
</div>
@endsection
