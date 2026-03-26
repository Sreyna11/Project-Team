@extends('app')

@section('title', 'Courses')

@section('content')
<div id="course-detail-page" class="page page-hidden">
    <div class="py-6 lg:py-10">
        <div class="container mx-auto px-4">
            <button onclick="navigateTo('courses')"
                class="mb-4 lg:mb-6 flex items-center text-purple-600 hover:text-purple-700 bg-purple-100 rounded-2xl p-2 text-sm lg:text-base">
                <i class="fas fa-arrow-left mr-2 text-xs lg:text-sm"></i> Back to Courses
            </button>

            <div class="grid gap-6 lg:gap-8 lg:grid-cols-4">
                <!-- Left Sidebar -->
                <div class="lg:col-span-1">
                    <div id="desktop-sidebar" class="hidden lg:block space-y-4">
                        <div
                            class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                                <h3 class="font-bold text-lg mb-1" id="sidebar-course-title">Course Title</h3>
                                <div class="flex items-center justify-between">
                                    <span class="text-sm text-gray-600 dark:text-gray-400" id="sidebar-course-modules">0
                                        modules</span>
                                    <span class="text-sm font-semibold text-purple-600"
                                        id="sidebar-course-price">$0.00</span>
                                </div>
                            </div>

                            <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                                <div class="flex justify-between text-sm mb-1">
                                    <span class="text-gray-600 dark:text-gray-400">Progress</span>
                                    <span class="font-medium" id="sidebar-progress-percentage">0%</span>
                                </div>
                                <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div id="sidebar-progress-bar" class="h-full bg-purple-600 rounded-full"
                                        style="width: 0%"></div>
                                </div>
                                <p class="text-xs text-gray-500 dark:text-gray-400 mt-2" id="sidebar-progress-text">
                                    Start learning to track progress</p>
                            </div>

                            <div class="overflow-y-auto max-h-[40vh]">
                                <div class="p-2" id="desktop-module-list"></div>
                            </div>
                        </div>

                        <!-- Desktop Purchase Card -->
                        <div
                            class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden lg:block hidden">
                            <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                                <div class="flex items-end gap-2">
                                    <div id="desktop-price" class="text-2xl font-bold text-gray-900 dark:text-white">
                                        $0.00</div>
                                    <span class="text-sm text-gray-500 dark:text-gray-400 mb-1">one-time</span>
                                </div>
                                <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">Lifetime access to all modules
                                </p>
                            </div>
                            <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                                <div id="desktop-system-status"></div>
                            </div>
                            <div class="p-4 bg-gray-50 dark:bg-gray-900">
                                <button id="desktop-purchase-button"
                                    class="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed mb-2 text-sm">
                                    <i class="fas fa-shopping-cart mr-2"></i> Purchase Course
                                </button>
                                <p class="text-center text-xs text-gray-500 dark:text-gray-400">One time payment -
                                    Lifetime access</p>
                            </div>
                        </div>
                    </div>

                    <!-- Mobile Toggle -->
                    <div class="lg:hidden mb-4">
                        <button id="mobile-modules-toggle"
                            class="w-full flex items-center justify-between p-3 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition-colors text-sm">
                            <span class="font-medium">View Course Modules</span>
                            <i class="fas fa-chevron-right text-xs"></i>
                        </button>
                    </div>
                </div>

                <!-- Main Content -->
                <div class="lg:col-span-3">
                    <div class="mb-4 lg:mb-6">
                        <div id="course-video-player" class="aspect-video bg-gray-700 rounded-xl overflow-hidden">
                            <div class="w-full h-full flex flex-col items-center justify-center p-4 lg:p-8 text-center">
                                <i class="fas fa-play-circle text-4xl lg:text-6xl text-purple-600 mb-2 lg:mb-4"></i>
                                <h3 class="text-lg lg:text-2xl font-bold text-white mb-1 lg:mb-2">Select a Module</h3>
                                <p class="text-xs lg:text-sm text-gray-300 max-w-md px-2">
                                    Click the "View Course Modules" button to start learning. The introduction module is
                                    free!
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-4 lg:space-y-6">
                        <div>
                            <span id="course-detail-category"
                                class="inline-block px-2 lg:px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs lg:text-sm font-semibold mb-2 lg:mb-3"></span>
                            <h1 id="course-detail-title" class="text-xl lg:text-3xl font-bold mb-2 lg:mb-3"></h1>
                            <p id="course-detail-description"
                                class="text-sm lg:text-base text-gray-600 dark:text-gray-300"></p>
                        </div>

                        <!-- Mobile Purchase Card -->
                        <div class="lg:hidden block">
                            <div
                                class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                                <div class="p-3 border-b border-gray-200 dark:border-gray-700">
                                    <div class="flex items-end gap-2">
                                        <div id="mobile-price" class="text-xl font-bold text-gray-900 dark:text-white">
                                            $0.00</div>
                                        <span class="text-xs text-gray-500 mb-1">one-time</span>
                                    </div>
                                    <p class="text-xs text-gray-600 dark:text-gray-300 mt-1">Lifetime access to all
                                        modules</p>
                                </div>
                                <div class="p-3 border-b border-gray-200 dark:border-gray-700">
                                    <div id="mobile-system-status"></div>
                                </div>
                                <div class="p-3 bg-gray-50 dark:bg-gray-900">
                                    <button id="mobile-purchase-button"
                                        class="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-sm">
                                        <i class="fas fa-shopping-cart mr-2 text-xs"></i> Purchase Course
                                    </button>
                                    <p class="text-center text-xs text-gray-500 mt-2">One time Payment - Lifetime access
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 class="text-lg lg:text-xl font-bold mb-3 lg:mb-4">What You'll Learn</h2>
                            <ul id="course-learning-points" class="space-y-2 text-sm lg:text-base"></ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Mobile Modules Overlay -->
            <div id="mobile-modules-overlay" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden lg:hidden">
                <div
                    class="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white dark:bg-gray-800 shadow-xl overflow-hidden">
                    <div
                        class="p-3 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-purple-700 text-white flex justify-between items-center">
                        <h3 class="font-bold text-base">Course Modules</h3>
                        <button id="close-mobile-modules" class="p-1.5 hover:bg-white/10 rounded-lg">
                            <i class="fas fa-times text-base"></i>
                        </button>
                    </div>
                    <div class="p-3 border-b border-gray-200 dark:border-gray-700">
                        <div class="flex justify-between text-xs mb-2">
                            <span class="text-gray-600">Progress</span>
                            <span class="font-bold text-purple-600" id="mobile-progress-percentage">0%</span>
                        </div>
                        <div class="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div id="mobile-progress-bar"
                                class="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"
                                style="width: 0%"></div>
                        </div>
                        <p class="text-xs text-gray-500 mt-2" id="mobile-progress-text">Start learning to track progress
                        </p>
                    </div>
                    <div class="p-3 border-b border-gray-200 bg-purple-50 dark:bg-purple-900/20">
                        <h4 class="font-semibold text-sm text-gray-900 dark:text-white" id="mobile-sidebar-title">Course
                            Title</h4>
                        <div class="flex justify-between items-center mt-1">
                            <span class="text-xs text-gray-600" id="mobile-sidebar-modules">0 modules</span>
                            <span class="text-xs font-bold text-purple-600" id="mobile-sidebar-price">$0.00</span>
                        </div>
                    </div>
                    <div class="overflow-y-auto" style="height: calc(100vh - 260px)">
                        <div class="p-2" id="mobile-module-list"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
