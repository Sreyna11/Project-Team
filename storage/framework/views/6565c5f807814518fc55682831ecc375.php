<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700
            p-5 hover:shadow-lg transition-shadow duration-300">

    
    <div class="flex items-start justify-between mb-3">
        <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/30
                        flex items-center justify-center flex-shrink-0 border border-purple-100 dark:border-purple-800">
                <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($doc->logo): ?>
                    <?php
                        $imageUrl = $doc->logo_url;
                    ?>
                    <img src="<?php echo e($imageUrl); ?>" alt="<?php echo e($doc->title); ?>" class="w-full h-full object-cover rounded-xl">
                <?php else: ?>
                    <i class="fas fa-file-alt text-purple-600"></i>
                <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
            </div>
        </div>
        <div>
            <div class="flex flex-wrap gap-1 justify-end">
                <span class="text-xs px-2 py-0.5 rounded-full font-medium"
                      style="background:#EEEDFE;color:#3C3489">
                    <?php echo e($doc->category?->name ?? 'General'); ?>

                </span>
            </div>
        </div>
    </div>

    
    <h3 class="font-bold text-base line-clamp-2 mb-2 text-gray-900 dark:text-white">
        <?php echo e($doc->title); ?>

    </h3>

    
    <p class="text-xs text-gray-500 line-clamp-2 mb-4 leading-relaxed">
        <?php echo e($doc->description); ?>

    </p>

    
    <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if(auth()->guard()->check()): ?>
        <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($doc->file): ?>
            <div class="flex gap-2">
                <a href="<?php echo e(route('document.read', $doc)); ?>" target="_blank"
                   class="flex-1 text-center py-2 text-xs font-semibold rounded-lg
                          bg-purple-600 hover:bg-purple-700 text-white transition-colors">
                    <i class="fas fa-book-open mr-1"></i> Read
                </a>
                <a href="<?php echo e(route('document.download', $doc)); ?>"
                   class="flex-1 text-center py-2 text-xs font-semibold rounded-lg
                          border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300
                          hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <i class="fas fa-download mr-1"></i> Download
                </a>
            </div>
        <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
    <?php else: ?>
        <a href="<?php echo e(route('login')); ?>"
           class="block w-full text-center py-2 text-xs font-semibold rounded-lg
                  border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400
                  hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <i class="fas fa-lock mr-1"></i> Login to Read
        </a>
    <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
</div><?php /**PATH D:\Internship_ASS\Laravel\learnhub_project\resources\views/livewire/partials/document-card.blade.php ENDPATH**/ ?>