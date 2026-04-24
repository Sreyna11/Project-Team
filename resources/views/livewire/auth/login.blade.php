<div class="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gray-50 dark:bg-gray-900/50">
    <div class="w-full max-w-md">

        {{-- Logo & Header --}}
        <div class="text-center mb-10">
            <a href="{{ route('home') }}"
               class="inline-flex items-center justify-center w-16 h-16 bg-purple-600 text-white rounded-2xl shadow-lg shadow-purple-200 dark:shadow-none mb-6">
                <i class="fas fa-graduation-cap text-2xl"></i>
            </a>
            <h1 class="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Welcome Back</h1>
            <p class="text-gray-500 dark:text-gray-400 mt-2">Sign in to continue your learning journey</p>
        </div>

        {{-- Card --}}
        <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div class="p-8 lg:p-10">
                <form wire:submit="login" class="space-y-6">

                    {{-- Email --}}
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Email Address
                        </label>
                        <div class="relative">
                            <i class="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none"></i>
                            <input wire:model="email"
                                   type="email"
                                   class="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none text-gray-900 dark:text-white"
                                   placeholder="name@example.com"
                                   required
                                   autocomplete="email">
                        </div>
                        @error('email')
                            <p class="text-red-500 text-xs mt-2 flex items-center gap-1">
                                <i class="fas fa-exclamation-circle"></i> {{ $message }}
                            </p>
                        @enderror
                    </div>

                    {{-- Password --}}
                    <div>
                        <div class="flex justify-between items-center mb-2">
                            <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Password</label>
                            <a href="#" class="text-xs font-bold text-purple-600 hover:text-purple-700">Forgot password?</a>
                        </div>
                        <div class="relative">
                            <i class="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none"></i>
                            <input wire:model="password"
                                   type="password"
                                   id="login-password"
                                   class="w-full pl-11 pr-11 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none text-gray-900 dark:text-white"
                                   placeholder="••••••••"
                                   required
                                   autocomplete="current-password">
                            <button type="button"
                                    onclick="
                                        var inp = document.getElementById('login-password');
                                        var ico = document.getElementById('login-password-icon');
                                        if (inp.type === 'password') {
                                            inp.type = 'text';
                                            ico.classList.remove('fa-eye');
                                            ico.classList.add('fa-eye-slash');
                                        } else {
                                            inp.type = 'password';
                                            ico.classList.remove('fa-eye-slash');
                                            ico.classList.add('fa-eye');
                                        }
                                    "
                                    class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-500 transition-colors focus:outline-none">
                                <i id="login-password-icon" class="fas fa-eye text-sm"></i>
                            </button>
                        </div>
                        @error('password')
                            <p class="text-red-500 text-xs mt-2 flex items-center gap-1">
                                <i class="fas fa-exclamation-circle"></i> {{ $message }}
                            </p>
                        @enderror
                    </div>

                    {{-- Remember --}}
                    <div class="flex items-center gap-2">
                        <input wire:model="remember"
                               type="checkbox"
                               id="remember"
                               class="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer">
                        <label for="remember" class="text-sm text-gray-500 dark:text-gray-400 cursor-pointer">
                            Keep me signed in
                        </label>
                    </div>

                    <button type="submit"
                            class="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-purple-200 dark:shadow-none active:scale-[.98]">
                        <span wire:loading.remove wire:target="login">
                            Sign In <i class="fas fa-arrow-right ml-1"></i>
                        </span>
                        <span wire:loading wire:target="login">
                            <i class="fas fa-circle-notch fa-spin mr-2"></i> Signing in...
                        </span>
                    </button>

                </form>
            </div>

            <div class="bg-gray-50 dark:bg-gray-900/50 p-6 text-center border-t border-gray-100 dark:border-gray-700">
                <p class="text-sm text-gray-500 dark:text-gray-400">
                    Don't have an account?
                    <a href="{{ route('register') }}" class="font-bold text-purple-600 hover:text-purple-700 ml-1">
                        Create Account
                    </a>
                </p>
            </div>
        </div>
    </div>
</div>