<div class="min-h-screen bg-gray-900 text-white">

    
    <div class="bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center justify-between">

        
        <a href="<?php echo e(route('course.detail', $course->uuid)); ?>"
           class="inline-flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-all duration-200 group flex-shrink-0">
            <i class="fas fa-arrow-left text-xs group-hover:-translate-x-0.5 transition-transform duration-200"></i>
            <span class="hidden sm:inline">Back to course</span>
        </a>

        <h1 class="text-sm font-medium text-white truncate max-w-xs lg:max-w-lg px-4">
            <?php echo e($course->title); ?>

        </h1>

        <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if(auth()->guard()->check()): ?>
            <div class="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                <?php echo e(strtoupper(substr(Auth::user()->name, 0, 2))); ?>

            </div>
        <?php else: ?>
            <div class="w-8 h-8"></div>
        <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
    </div>

    
    <div class="flex" style="min-height: calc(100vh - 53px)">

        
        <div class="flex-1 flex flex-col min-w-0">


<div class="bg-black" style="aspect-ratio:16/9; max-height:65vh">

    <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if(!empty($videoFileUrl)): ?>
        <video
            src="<?php echo e($videoFileUrl); ?>"
            class="w-full h-full"
            controls
            autoplay
            playsinline
            preload="metadata"
            controlsList="nodownload noremoteplayback"
            disablePictureInPicture
            oncontextmenu="return false">
        </video>

    <?php elseif(!empty($embedUrl)): ?>
        <iframe src="<?php echo e($embedUrl); ?>"
                class="w-full h-full"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
        </iframe>

    <?php else: ?>
        <div class="w-full h-full flex items-center justify-center text-gray-500">
            Select a module to start watching
        </div>
    <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>

</div>

            
            <div class="flex-1 bg-white dark:bg-gray-800 p-5 overflow-y-auto">

                <div class="flex items-start justify-between gap-4 mb-4">
                    <h2 class="text-lg font-bold text-gray-900 dark:text-white">
                        <?php echo e($currentModule?->title ?? 'Select a module'); ?>

                    </h2>
                    <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($currentModule?->is_free): ?>
                        <span class="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full flex-shrink-0">
                            Free Preview
                        </span>
                    <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                </div>

                <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($currentModule?->description): ?>
                    <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-4">
                        <h4 class="font-medium text-sm mb-2 text-gray-900 dark:text-white">About this module</h4>
                        <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            <?php echo e($currentModule->description); ?>

                        </p>
                    </div>
                <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>

                
                <div class="mb-4">
                    <div class="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Course progress</span>
                        <span><?php echo e($progress); ?>%</span>
                    </div>
                    <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div class="h-full bg-purple-600 rounded-full transition-all duration-500"
                             style="width: <?php echo e($progress); ?>%"></div>
                    </div>
                    <p class="text-xs text-gray-500 mt-1">
                        <?php echo e(count($completedModules)); ?> of <?php echo e($modules->count()); ?> modules completed
                    </p>
                </div>

                
                <div class="flex items-center justify-between gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button wire:click="goPrevious"
                            <?php if($currentIndex === 0): echo 'disabled'; endif; ?>
                            class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border
                                   <?php echo e($currentIndex === 0
                                       ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                                       : 'border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'); ?>">
                        <i class="fas fa-chevron-left text-xs"></i>
                        Previous
                    </button>

                    <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($currentModule): ?>
                        <button wire:click="markComplete"
                                class="flex-1 max-w-xs py-2 px-4 rounded-lg text-sm font-semibold transition-colors text-center
                                       <?php echo e(in_array($currentModule->videoCourseItem_id, $completedModules)
                                           ? 'bg-green-600 hover:bg-green-700 text-white'
                                           : 'bg-purple-600 hover:bg-purple-700 text-white'); ?>">
                            <span wire:loading.remove wire:target="markComplete">
                                <i class="fas <?php echo e(in_array($currentModule->videoCourseItem_id, $completedModules) ? 'fa-check-double' : 'fa-check'); ?> mr-2"></i>
                                <?php echo e(in_array($currentModule->videoCourseItem_id, $completedModules) ? 'Completed' : 'Mark complete'); ?>

                            </span>
                            <span wire:loading wire:target="markComplete">
                                <i class="fas fa-circle-notch fa-spin mr-2"></i> Saving...
                            </span>
                        </button>
                    <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>

                    <button wire:click="goNext"
                            <?php if($currentIndex >= $modules->count() - 1): echo 'disabled'; endif; ?>
                            class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border
                                   <?php echo e($currentIndex >= $modules->count() - 1
                                       ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                                       : 'border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'); ?>">
                        Next
                        <i class="fas fa-chevron-right text-xs"></i>
                    </button>
                </div>
            </div>
        </div>

        
        <div class="w-80 flex-shrink-0 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 overflow-y-auto hidden lg:block">

            <div class="p-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
                <h3 class="font-bold text-sm text-gray-900 dark:text-white">Course content</h3>
                <p class="text-xs text-gray-500 mt-1"><?php echo e($modules->count()); ?> modules</p>
                <div class="mt-2">
                    <div class="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div class="h-full bg-purple-600 rounded-full transition-all duration-500"
                             style="width: <?php echo e($progress); ?>%"></div>
                    </div>
                </div>
            </div>

            <div>
                <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php $__currentLoopData = $modules; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $index => $module): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <?php
                        $isCompleted = in_array($module->videoCourseItem_id, $completedModules);
                        $isActive    = $currentModule?->uuid === $module->uuid;
                        $isLocked    = !$isOwned && !$module->is_free;
                    ?>

                    
                    <button
                        <?php if(!$isLocked): ?>wire:click="selectModule('<?php echo e($module->uuid); ?>')<?php endif; ?>"
                        <?php echo e($isLocked ? 'disabled' : ''); ?>

                        class="w-full text-left p-3 border-b border-gray-100 dark:border-gray-700 flex items-start gap-3 transition-colors border-l-4
                               <?php echo e($isActive
                                   ? 'bg-purple-50 dark:bg-purple-900/30 border-l-purple-600'
                                   : 'hover:bg-gray-50 dark:hover:bg-gray-700 border-l-transparent'); ?>

                               <?php echo e($isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'); ?>">

                        <div class="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5
                                    <?php echo e($isCompleted ? 'bg-green-100' : ($isActive ? 'bg-purple-100' : 'bg-gray-100')); ?>">
                            <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($isLocked): ?>
                                <i class="fas fa-lock text-gray-400" style="font-size:9px"></i>
                            <?php elseif($isCompleted): ?>
                                <i class="fas fa-check text-green-600" style="font-size:9px"></i>
                            <?php elseif($isActive): ?>
                                <i class="fas fa-play text-purple-600" style="font-size:9px"></i>
                            <?php else: ?>
                                <i class="fas fa-circle text-gray-300" style="font-size:9px"></i>
                            <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                        </div>

                        <div class="flex-1 min-w-0">
                            <p class="text-xs font-medium leading-tight truncate
                                       <?php echo e($isActive
                                           ? 'text-purple-700 dark:text-purple-300'
                                           : ($isCompleted
                                               ? 'text-green-700 dark:text-green-400'
                                               : 'text-gray-900 dark:text-white')); ?>">
                                <?php echo e($module->title); ?>

                            </p>
                            <div class="flex items-center gap-2 mt-1">
                                <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($module->duration): ?>
                                    <span class="text-xs text-gray-400"><?php echo e($module->duration); ?></span>
                                <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                                <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($module->is_free && !$isOwned): ?>
                                    <span class="text-xs px-1.5 py-0.5 bg-green-100 text-green-700 rounded">Free</span>
                                <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                            </div>
                        </div>
                    </button>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
            </div>
        </div>
    </div>
</div>
<?php /**PATH D:\Internship_ASS\Laravel\learnhub_project\resources\views/livewire/video-player.blade.php ENDPATH**/ ?>