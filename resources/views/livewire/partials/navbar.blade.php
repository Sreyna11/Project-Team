<nav class="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md"
    x-data="{ 
        mobileOpen: false,
        darkMode: localStorage.getItem('theme') === 'dark'
    }">
    <div class="container mx-auto px-4">
        <div class="flex h-16 items-center justify-between">

            {{-- Logo --}}
            <a href="{{ route('home') }}" class="flex items-center gap-2">
                <div
                    class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-purple-500">
                    <i class="fas fa-graduation-cap text-lg text-white"></i>
                </div>
                <span class="text-xl font-bold text-purple-600">LearnHub</span>
            </a>

            {{-- Desktop Nav --}}
            <div class="hidden items-center gap-2 md:flex">
                <a href="{{ route('home') }}"
                   class="relative px-4 py-2 rounded-xl text-sm transition-all duration-300
                          {{ request()->routeIs('home') 
                             ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-bold after:content-[\'\'] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-6 after:h-[3px] after:rounded-full after:bg-purple-600 dark:after:bg-purple-400' 
                             : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-purple-600 font-medium' }}">
                    Home
                </a>
                <a href="{{ route('about') }}"
                   class="relative px-4 py-2 rounded-xl text-sm transition-all duration-300
                          {{ request()->routeIs('about') 
                             ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-bold after:content-[\'\'] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-6 after:h-[3px] after:rounded-full after:bg-purple-600 dark:after:bg-purple-400' 
                             : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-purple-600 font-medium' }}">
                    About
                </a>
                <a href="{{ route('courses') }}"
                   class="relative px-4 py-2 rounded-xl text-sm transition-all duration-300
                          {{ request()->routeIs('courses') 
                             ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-bold after:content-[\'\'] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-6 after:h-[3px] after:rounded-full after:bg-purple-600 dark:after:bg-purple-400' 
                             : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-purple-600 font-medium' }}">
                    Courses
                </a>
                <a href="{{ route('documents') }}"
                   class="relative px-4 py-2 rounded-xl text-sm transition-all duration-300
                          {{ request()->routeIs('documents') 
                             ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-bold after:content-[\'\'] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-6 after:h-[3px] after:rounded-full after:bg-purple-600 dark:after:bg-purple-400' 
                             : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-purple-600 font-medium' }}">
                    Documents
                </a>
                <a href="{{ route('contact') }}"
                   class="relative px-4 py-2 rounded-xl text-sm transition-all duration-300
                          {{ request()->routeIs('contact') 
                             ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-bold after:content-[\'\'] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-6 after:h-[3px] after:rounded-full after:bg-purple-600 dark:after:bg-purple-400' 
                             : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-purple-600 font-medium' }}">
                    Contact
                </a>
            </div>

            {{-- Right Side --}}
            <div class="flex items-center gap-2">
                {{-- Dark Mode --}}
                <button @click="darkMode = !darkMode; localStorage.setItem('theme', darkMode ? 'dark' : 'light'); document.documentElement.classList.toggle('dark', darkMode)"
                    class="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <i class="fas text-sm transition-colors"
                        :class="darkMode ? 'fa-moon text-indigo-400' : 'fa-sun text-yellow-500'"></i>
                </button>

                @auth
                    {{-- User Menu --}}
                    <div class="hidden md:flex items-center gap-2">
                        <a href="{{ route('dashboard') }}"
                            class="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-medium
                                      text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            <i class="fas fa-tachometer-alt mr-1"></i> Dashboard
                        </a>
                        <form method="POST" action="{{ route('logout') }}" class="inline">
                            @csrf
                            <button type="submit"
                                class="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-medium
                                               text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                <i class="fas fa-sign-out-alt mr-1"></i> Logout
                            </button>
                        </form>
                    </div>
                @else
                    <div class="hidden md:flex items-center gap-2">
                        <a href="{{ route('login') }}"
                            class="px-4 py-2 rounded-lg border border-purple-600 text-purple-600 text-sm font-medium hover:bg-purple-50 transition-colors">
                            Login
                        </a>
                        <a href="{{ route('register') }}"
                            class="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors">
                            Register
                        </a>
                    </div>
                @endauth

                {{-- Mobile Menu Button --}}
                <button @click="mobileOpen = !mobileOpen"
                    class="p-2 rounded-lg border border-gray-200 dark:border-gray-700 md:hidden">
                    <i class="fas text-gray-600 dark:text-gray-300 text-sm"
                        :class="mobileOpen ? 'fa-times' : 'fa-bars'"></i>
                </button>
            </div>
        </div>

        {{-- Mobile Menu --}}
        <div x-show="mobileOpen" x-transition class="border-t border-gray-200 dark:border-gray-700 py-4 md:hidden">
            <div class="flex flex-col gap-2">
                <a href="{{ route('home') }}"
                    class="py-2 px-4 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">Home</a>
                <a href="{{ route('about') }}"
                    class="py-2 px-4 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">About</a>
                <a href="{{ route('courses') }}"
                    class="py-2 px-4 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">Courses</a>
                <a href="{{ route('documents') }}"
                    class="py-2 px-4 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">Documents</a>

                <a href="{{ route('contact') }}"
                    class="py-2 px-4 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">Contact</a>
                <div class="border-t border-gray-200 dark:border-gray-700 pt-3 mt-1 flex flex-col gap-2">
                    @auth
                        <a href="{{ route('dashboard') }}"
                            class="py-2 px-4 rounded-lg bg-purple-50 text-purple-600 font-medium">Dashboard</a>
                        <form method="POST" action="{{ route('logout') }}">
                            @csrf
                            <button type="submit"
                                class="w-full text-left py-2 px-4 rounded-lg text-red-500 hover:bg-red-50">Logout</button>
                        </form>
                    @else
                        <a href="{{ route('login') }}"
                            class="py-2 px-4 rounded-lg border border-purple-600 text-purple-600 text-center">Login</a>
                        <a href="{{ route('register') }}"
                            class="py-2 px-4 rounded-lg bg-purple-600 text-white text-center">Register</a>
                    @endauth
                </div>
            </div>
        </div>
    </div>
</nav>