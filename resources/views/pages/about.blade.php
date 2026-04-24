@extends('layouts.app')
@section('title', 'About LearnHub')
@section('content')
<div>
    {{-- Hero --}}
    <section class="bg-gray-900 py-24 text-center">
        <div class="container mx-auto px-4">
            <span class="inline-block px-4 py-2 rounded-full bg-purple-600/20 text-purple-400 text-sm font-medium mb-6">
                Our Story
            </span>
            <h1 class="text-5xl font-black text-white mb-6 max-w-3xl mx-auto leading-tight">
                LearnHub: Where Tech Education Meets Excellence
            </h1>
            <p class="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Empowering learners worldwide with accessible, high-quality technology education.
            </p>
        </div>
    </section>

    {{-- Mission --}}
    <section class="py-20 bg-white dark:bg-gray-950">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    <p class="text-purple-600 font-semibold text-sm uppercase tracking-wider mb-3">Our Mission</p>
                    <h2 class="text-4xl font-black text-gray-900 dark:text-white mb-6">
                        Democratize Technology Education
                    </h2>
                    <p class="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-6">
                        At LearnHub, we believe that anyone, anywhere should have access to world-class learning resources to build a successful career in tech.
                    </p>
                    <p class="text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
                        We provide comprehensive video courses and free documentation curated by expert developers, helping students in Cambodia and beyond to master modern technology skills.
                    </p>
                    <div class="grid grid-cols-2 gap-4">
                        @foreach([
                            ['number' => '500+', 'label' => 'Students Enrolled'],
                            ['number' => '15+', 'label' => 'Video Courses'],
                            ['number' => '21+', 'label' => 'Free Documents'],
                            ['number' => '4.9', 'label' => 'Average Rating'],
                        ] as $stat)
                            <div class="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-5">
                                <div class="text-3xl font-black text-purple-600 mb-1">{{ $stat['number'] }}</div>
                                <div class="text-sm text-gray-500 dark:text-gray-400">{{ $stat['label'] }}</div>
                            </div>
                        @endforeach
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    @foreach([
                        ['icon' => 'fa-award', 'color' => 'purple', 'title' => 'Quality Education', 'desc' => 'Expert-curated content with real-world projects and industry-relevant skills.'],
                        ['icon' => 'fa-globe', 'color' => 'blue', 'title' => 'Accessibility', 'desc' => 'Affordable pricing with free resources available for all registered users.'],
                        ['icon' => 'fa-star', 'color' => 'yellow', 'title' => 'Excellence', 'desc' => '24/7 access with regular content updates and community-driven improvements.'],
                        ['icon' => 'fa-users', 'color' => 'green', 'title' => 'Community', 'desc' => 'Join thousands of learners building skills and transforming their careers.'],
                    ] as $val)
                        <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
                            <div class="w-12 h-12 rounded-xl bg-{{ $val['color'] }}-50 dark:bg-{{ $val['color'] }}-900/30 flex items-center justify-center mb-4">
                                <i class="fas {{ $val['icon'] }} text-{{ $val['color'] }}-600 text-xl"></i>
                            </div>
                            <h3 class="font-black text-base text-gray-900 dark:text-white mb-2">{{ $val['title'] }}</h3>
                            <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{{ $val['desc'] }}</p>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
    </section>

    {{-- Why Choose --}}
    <section class="py-20 bg-gray-50 dark:bg-gray-900">
        <div class="container mx-auto px-4">
            <div class="text-center mb-14">
                <h2 class="text-4xl font-black text-gray-900 dark:text-white mb-4">Why Choose LearnHub?</h2>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                @foreach([
                    ['icon' => 'fa-play-circle', 'title' => 'Comprehensive Video Courses', 'desc' => 'Learn from industry experts with our extensive library of video courses covering the latest technologies.'],
                    ['icon' => 'fa-file-pdf', 'title' => 'Free Documentation', 'desc' => 'Access high-quality documentation completely free to supplement your learning journey.'],
                    ['icon' => 'fa-mobile-alt', 'title' => 'Learn Anywhere', 'desc' => 'Access your courses and documents from any device, anytime, anywhere with lifetime access.'],
                ] as $reason)
                    <div class="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 text-center hover:shadow-xl transition-shadow">
                        <div class="w-16 h-16 rounded-2xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-6">
                            <i class="fas {{ $reason['icon'] }} text-purple-600 text-2xl"></i>
                        </div>
                        <h3 class="font-black text-xl text-gray-900 dark:text-white mb-4">{{ $reason['title'] }}</h3>
                        <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{{ $reason['desc'] }}</p>
                    </div>
                @endforeach
            </div>
        </div>
    </section>

    {{-- CTA --}}
    <section class="py-20 bg-purple-600">
        <div class="container mx-auto px-4 text-center">
            <h2 class="text-4xl font-black text-white mb-6">Start Your Learning Journey Today</h2>
            <p class="text-purple-100 text-xl mb-10 max-w-xl mx-auto">
                Join thousands of successful learners who have transformed their careers with LearnHub.
            </p>
            <div class="flex flex-wrap gap-4 justify-center">
                <a href="{{ route('courses') }}"
                   class="px-8 py-4 rounded-2xl bg-white text-purple-600 font-black hover:bg-purple-50 transition-all hover:scale-105">
                    Browse Courses
                </a>
                @guest
                    <a href="{{ route('register') }}"
                       class="px-8 py-4 rounded-2xl border-2 border-white text-white font-black hover:bg-white/10 transition-all">
                        Join Free
                    </a>
                @endguest
            </div>
        </div>
    </section>
</div>
@endsection