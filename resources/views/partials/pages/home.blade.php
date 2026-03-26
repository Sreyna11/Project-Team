@extends('app')

@section('title', 'Home')

@section('content')
    <div id="home-page" class="page">
        <!-- Hero Section with Image on Right -->
        <section class="hero-section w-full">
            <div class="container mx-auto px-4">
                <div class="hero-grid">
                    <!-- Left side - Text content -->
                    <div class="hero-text">
                        <span class="badge badge-primary">
                            <i class="fas fa-rocket mr-2"></i>START LEARNING TODAY
                        </span>

                        <h1 class="hero-title">
                            Master Computer Science & Design Skills
                        </h1>

                        <div class="divider"></div>

                        <p class="hero-subtitle">
                            <i class="fas fa-arrow-right text-purple-600 mr-3"></i>
                            Comprehensive video courses and free documentation to help you
                            become a professional developer. Start your learning journey
                            today.
                        </p>

                        <div class="hero-buttons">
                            <button class="btn btn-primary" onclick="window.location.hash = 'courses'">
                                <span>Browse Courses</span>
                                <i class="fas fa-arrow-right ml-2"></i>
                            </button>
                            <button class="btn btn-outline" onclick="window.location.hash = 'documents'">
                                <span>Free Documents</span>
                                <i class="fas fa-book-open ml-2"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Right side - Image -->
                    <div class="hero-image">
                        <img src="Images/hero-image.png" alt="LearnHub - Tech Learning Platform" class="hero-img" />
                        <div class="floating-elements">
                            <div class="floating-1"></div>
                            <div class="floating-2"></div>
                            <div class="floating-3"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Stats Section -->
        <section class="stats-section w-full">
            <div class="container mx-auto px-4 w-full">
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                    <div class="stat-card">
                        <div class="stat-number">
                            <span>15</span>
                            <span>+</span>
                        </div>
                        <div class="stat-label">Courses Available</div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-number">
                            <span>7</span>
                            <span>+</span>
                        </div>
                        <div class="stat-label">Categories</div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-number">
                            <span>21</span>
                            <span>+</span>
                        </div>
                        <div class="stat-label">Free Documents</div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-number">
                            <span>24/7</span>
                            <span>+</span>
                        </div>
                        <div class="stat-label">Online Access</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Featured Courses -->
        <section class="featured-courses py-16 lg:py-24">
            <div class="container mx-auto px-4">
                <div class="section-header">
                    <div>
                        <h2>Featured Courses</h2>
                        <p>Start your learning journey with our popular courses</p>
                    </div>
                    <button class="btn btn-outline" onclick="window.location.hash = 'courses'">
                        View All Courses <i class="fas fa-arrow-right ml-2"></i>
                    </button>
                </div>
                <div class="course-grid" id="featured-courses-grid">
                    <!-- Featured courses will be loaded here -->
                </div>
            </div>
        </section>

        <!-- Featured Documents -->
        <section class="featured-documents py-16 lg:py-24">
            <div class="container mx-auto px-4">
                <div class="section-header">
                    <div>
                        <h2>Free Learning Documents</h2>
                        <p>Access comprehensive documentation (login required)</p>
                    </div>
                    <button class="btn btn-outline" onclick="window.location.hash = 'documents'">
                        View All Documents <i class="fas fa-arrow-right ml-2"></i>
                    </button>
                </div>
                <div class="course-grid" id="featured-documents-grid">
                    <!-- Featured documents will be loaded here -->
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 text-center lg:mx-32">
            <div class="container mx-auto px-4 text-center">
                <h2 class="text-3xl font-bold text-white mb-4">
                    Ready to Start Learning?
                </h2>
                <p class="text-xl text-purple-100 mb-8">
                    Join thousands of students already mastering new tech skills
                </p>
                <button class="btn btn-accent" onclick="showRegisterModal()">
                    Create Free Account <i class="fas fa-arrow-right ml-2"></i>
                </button>
            </div>
        </section>
    </div>
@endsection
