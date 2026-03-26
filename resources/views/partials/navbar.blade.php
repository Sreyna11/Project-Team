

<nav class="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
    <div class="container mx-auto px-4">
        <div class="flex h-16 items-center justify-between">
            <!-- Logo -->
            <div class="flex items-center gap-2 cursor-pointer logo-container" onclick="window.location.href = '/'">
                <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-purple-500 logo-icon">
                    <i class="fas fa-graduation-cap text-lg text-white"></i>
                </div>
                <span class="text-xl font-bold text-purple-600 logo-text">LearnHub</span>
            </div>

            <!-- Desktop Navigation -->
            <div class="hidden items-center gap-6 md:flex">
                <a href="{{ route('home') }}" class="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors nav-link">Home</a>
                <a href="{{ route('about') }}" class="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors nav-link">About</a>
                <a href="{{ route('courses') }}" class="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors nav-link">Courses</a>
                <a href="{{ route('documents') }}" class="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors nav-link">Documents</a>
                <a href="{{ route('contact') }}" class="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors nav-link">Contact</a>
            </div>

            <!-- Auth Buttons & Theme Toggle -->
            <div class="flex items-center gap-2 md:gap-3">
                <button id="theme-toggle" class="p-2 h-9 w-9 md:h-10 md:w-10 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50">
                    <i class="fas fa-sun text-gray-600 text-sm md:text-base"></i>
                </button>

                <div id="auth-buttons" class="hidden md:flex items-center gap-2 md:gap-3">
                    <!-- Guest buttons -->
                    <div class="flex gap-2 md:gap-3" id="guest-buttons">
                        <button class="btn btn-outline text-xs md:text-sm px-3 py-1.5 md:px-4 md:py-2" onclick="showLoginModal()">Login</button>
                        <button class="btn btn-primary text-xs md:text-sm px-3 py-1.5 md:px-4 md:py-2" onclick="showRegisterModal()">Register</button>
                    </div>
                    <!-- User menu -->
                    <div id="user-menu" class="hidden items-center gap-2 md:gap-3">
                        <div class="flex items-center gap-2 user-info"></div>
                        <button class="btn btn-outline text-xs md:text-sm px-2 md:px-3 py-2" onclick="window.location.href = '/dashboard'">
                            <i class="fas fa-tachometer-alt"></i>
                            <span class="ml-1 md:ml-2">Dashboard</span>
                        </button>
                        <button id="logout-btn" class="btn btn-outline text-xs md:text-sm px-2 md:px-3 py-2">
                            <i class="fas fa-sign-out-alt"></i>
                            <span class="ml-1 md:ml-2">Logout</span>
                        </button>
                    </div>
                </div>

                <button id="mobile-menu-btn" class="p-2 h-9 w-9 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 md:hidden">
                    <i class="fas fa-bars text-gray-600 text-sm"></i>
                </button>
            </div>
        </div>

        <!-- Mobile Menu -->
        <div id="mobile-menu" class="hidden border-t border-gray-200 py-4 md:hidden">
            <div class="flex flex-col gap-3">
                <a href="{{ route('home') }}" class="font-medium text-gray-700 hover:text-purple-600 py-2 px-4 rounded-lg hover:bg-gray-50" onclick="closeMobileMenu()">Home</a>
                <a href="{{ route('about') }}" class="font-medium text-gray-700 hover:text-purple-600 py-2 px-4 rounded-lg hover:bg-gray-50" onclick="closeMobileMenu()">About</a>
                <a href="{{ route('courses') }}" class="font-medium text-gray-700 hover:text-purple-600 py-2 px-4 rounded-lg hover:bg-gray-50" onclick="closeMobileMenu()">Courses</a>
                <a href="{{ route('documents') }}" class="font-medium text-gray-700 hover:text-purple-600 py-2 px-4 rounded-lg hover:bg-gray-50" onclick="closeMobileMenu()">Documents</a>
                <a href="{{ route('contact') }}" class="font-medium text-gray-700 hover:text-purple-600 py-2 px-4 rounded-lg hover:bg-gray-50" onclick="closeMobileMenu()">Contact</a>

                <div class="border-t border-gray-200 pt-4 mt-2">
                    <div id="mobile-guest-buttons" class="flex flex-col gap-2">
                        <button class="btn btn-outline w-full justify-start py-3 px-4" onclick="showLoginModal();closeMobileMenu();">
                            <i class="fas fa-sign-in-alt mr-3 w-5 text-center"></i>Login
                        </button>
                        <button class="btn btn-primary w-full justify-start py-3 px-4" onclick="showRegisterModal();closeMobileMenu();">
                            <i class="fas fa-user-plus mr-3 w-5 text-center"></i>Register
                        </button>
                    </div>
                    <div id="mobile-user-menu" class="hidden flex-col gap-2">
                        <div class="px-4 py-3 rounded-lg bg-gray-50 mb-2">
                            <div class="flex items-center gap-3">
                                <div class="user-avatar w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center">
                                    <i class="fas fa-user text-white"></i>
                                </div>
                                <div>
                                    <p class="text-sm font-medium" id="mobile-user-name">User Name</p>
                                    <p class="text-xs text-gray-500" id="mobile-user-email">user@email.com</p>
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-outline w-full justify-start py-3 px-4" onclick="window.location.href='/dashboard';closeMobileMenu();">
                            <i class="fas fa-tachometer-alt mr-3 w-5 text-center"></i>Dashboard
                        </button>
                        <button class="btn btn-outline w-full justify-start py-3 px-4" onclick="logout();closeMobileMenu();">
                            <i class="fas fa-sign-out-alt mr-3 w-5 text-center"></i>Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</nav>
