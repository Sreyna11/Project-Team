<div class="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gray-50 dark:bg-gray-900/50">
    <div class="w-full max-w-lg">

        
        <div class="text-center mb-10">
            <a href="<?php echo e(route('home')); ?>"
               class="inline-flex items-center justify-center w-16 h-16 bg-purple-600 text-white rounded-2xl shadow-lg shadow-purple-200 dark:shadow-none mb-6">
                <i class="fas fa-graduation-cap text-2xl"></i>
            </a>
            <h1 class="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Join the Academy</h1>
            <p class="text-gray-500 dark:text-gray-400 mt-2">Create your free account and start learning today</p>
        </div>

        
        <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div class="p-8 lg:p-10">
                <form wire:submit="register" class="space-y-6">

                    
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                        <div class="relative">
                            <i class="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none"></i>
                            <input wire:model="name"
                                   type="text"
                                   class="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none text-gray-900 dark:text-white"
                                   placeholder="Your full name"
                                   required
                                   autocomplete="name">
                        </div>
                        <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php $__errorArgs = ['name'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?>
                            <p class="text-red-500 text-xs mt-2 flex items-center gap-1">
                                <i class="fas fa-exclamation-circle"></i> <?php echo e($message); ?>

                            </p>
                        <?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                    </div>

                    
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                        <div class="relative">
                            <i class="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none"></i>
                            <input wire:model="email"
                                   type="email"
                                   class="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none text-gray-900 dark:text-white"
                                   placeholder="name@example.com"
                                   required
                                   autocomplete="email">
                        </div>
                        <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php $__errorArgs = ['email'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?>
                            <p class="text-red-500 text-xs mt-2 flex items-center gap-1">
                                <i class="fas fa-exclamation-circle"></i> <?php echo e($message); ?>

                            </p>
                        <?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                    </div>

                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

                        
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Password</label>
                            <div class="relative">
                                <input wire:model="password"
                                       type="password"
                                       id="reg-password"
                                       class="w-full pl-4 pr-11 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none text-gray-900 dark:text-white"
                                       placeholder="••••••••"
                                       required
                                       autocomplete="new-password">
                                <button type="button"
                                        onclick="
                                            var inp = document.getElementById('reg-password');
                                            var ico = document.getElementById('reg-password-icon');
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
                                    <i id="reg-password-icon" class="fas fa-eye text-sm"></i>
                                </button>
                            </div>
                            <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php $__errorArgs = ['password'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?>
                                <p class="text-red-500 text-xs mt-2 flex items-center gap-1">
                                    <i class="fas fa-exclamation-circle"></i> <?php echo e($message); ?>

                                </p>
                            <?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                        </div>

                        
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Confirm Password</label>
                            <div class="relative">
                                <input wire:model="password_confirmation"
                                       type="password"
                                       id="reg-password-confirm"
                                       class="w-full pl-4 pr-11 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none text-gray-900 dark:text-white"
                                       placeholder="••••••••"
                                       required
                                       autocomplete="new-password">
                                <button type="button"
                                        onclick="
                                            var inp = document.getElementById('reg-password-confirm');
                                            var ico = document.getElementById('reg-password-confirm-icon');
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
                                    <i id="reg-password-confirm-icon" class="fas fa-eye text-sm"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    
                    <div class="bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 rounded-2xl p-4 text-center">
                        <p class="text-[0.7rem] text-gray-500 dark:text-gray-400 leading-relaxed">
                            By registering you agree to our
                            <a href="#" class="font-bold text-purple-600 hover:text-purple-700">Terms of Service</a>
                            and <a href="#" class="font-bold text-purple-600 hover:text-purple-700">Privacy Policy</a>.
                        </p>
                    </div>

                    <button type="submit"
                            class="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-purple-200 dark:shadow-none active:scale-[.98]">
                        <span wire:loading.remove wire:target="register">
                            Create Account <i class="fas fa-arrow-right ml-1"></i>
                        </span>
                        <span wire:loading wire:target="register">
                            <i class="fas fa-circle-notch fa-spin mr-2"></i> Creating Account...
                        </span>
                    </button>


                </form>
            </div>

            <div class="bg-gray-50 dark:bg-gray-900/50 p-6 text-center border-t border-gray-100 dark:border-gray-700">
                <p class="text-sm text-gray-500 dark:text-gray-400">
                    Already have an account?
                    <a href="<?php echo e(route('login')); ?>" class="font-bold text-purple-600 hover:text-purple-700 ml-1">Sign In</a>
                </p>
            </div>
        </div>
    </div>
</div><?php /**PATH D:\Internship_ASS\Laravel\learnhub_project\resources\views/livewire/auth/register.blade.php ENDPATH**/ ?>