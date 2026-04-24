<div class="bg-white dark:bg-gray-900">
    
    <section class="relative bg-gradient-to-br from-purple-50 to-white dark:from-gray-900 dark:to-gray-950 py-10 lg:py-10 overflow-hidden">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                    <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-sm font-medium mb-6">
                        <i class="fas fa-rocket text-xs"></i> Start learning today
                    </span>
                    <h1 class="text-5xl lg:text-6xl font-black leading-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 drop-shadow-sm pb-2">
                        Master Computer Science & Design Skills
                    </h1>
                    <div class="w-16 h-1 bg-purple-600 rounded mb-6"></div>
                    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                        Comprehensive video courses and free documentation to help you become a professional developer.
                    </p>
                    <div class="flex flex-wrap gap-4">
                        <a href="<?php echo e(route('courses')); ?>"
                           class="flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-colors">
                            Browse Courses <i class="fas fa-arrow-right"></i>
                        </a>
                        <a href="<?php echo e(route('documents')); ?>"
                           class="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-purple-600 text-purple-600 hover:bg-purple-50 font-semibold transition-colors">
                            Free Documents <i class="fas fa-book-open"></i>
                        </a>
                    </div>
                </div>
                <div class="relative group">
                    <img src="<?php echo e(asset('Images/hero-image.png')); ?>" alt="LearnHub"
                         class="w-full transform ease-out z-10 relative object-contain">
                </div>
            </div>
        </div>
    </section>

    
    <section class="py-12 bg-gray-50 dark:bg-gray-800/50 border-y border-gray-100 dark:border-gray-800">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <!-- Stat 1 -->
                <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow text-center group">
                    <div class="w-12 h-12 mx-auto bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <i class="fas fa-video text-xl"></i>
                    </div>
                    <div class="text-3xl font-black text-gray-900 dark:text-white mb-1">15+</div>
                    <div class="text-sm font-medium text-gray-500 dark:text-gray-400">Courses Available</div>
                </div>
                <!-- Stat 2 -->
                <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow text-center group">
                    <div class="w-12 h-12 mx-auto bg-pink-100 dark:bg-pink-900/30 text-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <i class="fas fa-layer-group text-xl"></i>
                    </div>
                    <div class="text-3xl font-black text-gray-900 dark:text-white mb-1">7+</div>
                    <div class="text-sm font-medium text-gray-500 dark:text-gray-400">Categories</div>
                </div>
                <!-- Stat 3 -->
                <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow text-center group">
                    <div class="w-12 h-12 mx-auto bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <i class="fas fa-file-alt text-xl"></i>
                    </div>
                    <div class="text-3xl font-black text-gray-900 dark:text-white mb-1">21+</div>
                    <div class="text-sm font-medium text-gray-500 dark:text-gray-400">Free Documents</div>
                </div>
                <!-- Stat 4 -->
                <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow text-center group">
                    <div class="w-12 h-12 mx-auto bg-green-100 dark:bg-green-900/30 text-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <i class="fas fa-clock text-xl"></i>
                    </div>
                    <div class="text-3xl font-black text-gray-900 dark:text-white mb-1">24/7</div>
                    <div class="text-sm font-medium text-gray-500 dark:text-gray-400">Online Access</div>
                </div>
            </div>
        </div>
    </section>

    
    <section class="py-16 lg:py-20">
        <div class="container mx-auto px-4">
            <div class="flex items-center justify-between mb-10">
                <div>
                    <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Featured Courses</h2>
                    <p class="text-gray-500">Start your learning journey with our popular courses</p>
                </div>
                <a href="<?php echo e(route('courses')); ?>"
                   class="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg border border-purple-600 text-purple-600 hover:bg-purple-50 text-sm font-medium transition-colors">
                    View All <i class="fas fa-arrow-right text-xs"></i>
                </a>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php $__empty_1 = true; $__currentLoopData = $featuredCourses; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $course): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); $__empty_1 = false; ?>
                    <?php echo $__env->make('livewire.partials.course-card', ['course' => $course], array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); if ($__empty_1): ?>
                    <div class="col-span-3 text-center py-12 text-gray-500">
                        <i class="fas fa-book-open text-4xl mb-3 text-gray-300"></i>
                        <p>No featured courses yet</p>
                    </div>
                <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
            </div>
        </div>
    </section>

    
    <section class="py-16 lg:py-20 bg-gray-50 dark:bg-gray-800">
        <div class="container mx-auto px-4">
            <div class="flex items-center justify-between mb-10">
                <div>
                    <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Free Learning Documents</h2>
                    <p class="text-gray-500">Access comprehensive documentation — login required</p>
                </div>
                <a href="<?php echo e(route('documents')); ?>"
                   class="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg border border-purple-600 text-purple-600 hover:bg-purple-50 text-sm font-medium transition-colors">
                    View All <i class="fas fa-arrow-right text-xs"></i>
                </a>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php $__empty_1 = true; $__currentLoopData = $featuredDocuments; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $doc): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); $__empty_1 = false; ?>
                    <?php echo $__env->make('livewire.partials.document-card', ['doc' => $doc], array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); if ($__empty_1): ?>
                    <div class="col-span-3 text-center py-12 text-gray-500">
                        <i class="fas fa-file-alt text-4xl mb-3 text-gray-300"></i>
                        <p>No featured documents yet</p>
                    </div>
                <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
            </div>
        </div>
    </section>

    
    <section class="py-16">
        <div class="container mx-auto px-4">
            <div class="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-10 text-center">
                <h2 class="text-3xl font-bold text-white mb-4">Ready to Start Learning?</h2>
                <p class="text-purple-100 text-lg mb-8">Join thousands of students already mastering new tech skills</p>
                <a href="<?php echo e(route('register')); ?>"
                   class="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white text-purple-600 font-bold hover:bg-purple-50 transition-colors">
                    Create Free Account <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </div>
    </section>
</div><?php /**PATH D:\Internship_ASS\Laravel\learnhub_project\resources\views/livewire/home-page.blade.php ENDPATH**/ ?>