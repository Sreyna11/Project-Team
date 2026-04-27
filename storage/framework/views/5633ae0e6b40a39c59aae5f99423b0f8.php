<?php
    $user = auth()->user();
    $isPurchased = $user && (
        $user->role === 'admin' || 
        $user->hasRole('super_admin') ||
        \App\Models\Payment::where('user_id', $user->id)
            ->where('course_item_id', $course->courseItem_id)
            ->where('status', 'paid')
            ->exists()
    );
    $finalPrice    = $course->final_price ?? $course->price;
    $originalPrice = $course->price;
    $hasDiscount   = $finalPrice < $originalPrice;
    $rating        = $course->rating ?? 4.5;
    $fullStars     = floor($rating);

    $imageUrl = $course->thumbnail_url;
?>

<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700
            overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
     onclick="window.location.href='<?php echo e(route('course.detail', $course)); ?>'">

    
    <div class="relative aspect-video overflow-hidden">
        <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($imageUrl): ?>
            <img src="<?php echo e($imageUrl); ?>" alt="<?php echo e($course->title); ?>"
                 class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
        <?php else: ?>
            <div class="w-full h-full bg-gradient-to-br from-purple-600 to-purple-800
                        flex items-center justify-center">
                <i class="fas fa-play-circle text-white text-4xl opacity-70"></i>
            </div>
        <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>

        
        <div class="absolute top-3 left-3">
            <span class="text-xs px-2 py-1 rounded-full font-medium bg-purple-600 text-white">
                <?php echo e($course->category?->name ?? 'General'); ?>

            </span>
        </div>

        
        <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($course->is_hot): ?>
            <div class="absolute top-3 right-3">
                <span class="text-xs px-2 py-1 rounded-full font-bold bg-orange-500 text-white">
                    HOT
                </span>
            </div>
        <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>

        
        <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($isPurchased): ?>
            <div class="absolute top-3 right-3">
                <span class="text-xs px-2 py-1 rounded-full bg-green-500 text-white">
                    <i class="fas fa-check mr-1"></i> Purchased
                </span>
            </div>
        <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>

        
        <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($course->duration): ?>
            <div class="absolute bottom-3 right-3">
                <span class="text-xs px-2 py-1 rounded bg-black/70 text-white">
                    <i class="fas fa-clock mr-1"></i><?php echo e($course->duration); ?>

                </span>
            </div>
        <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
    </div>

    
    <div class="p-4">
        <h3 class="font-bold text-base line-clamp-2 mb-1 text-gray-900 dark:text-white
                   group-hover:text-purple-600 transition-colors">
            <?php echo e($course->title); ?>

        </h3>

        <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($course->instructor): ?>
            <p class="text-xs text-gray-500 mb-2">
                <i class="fas fa-user-tie mr-1 text-purple-400"></i><?php echo e($course->instructor); ?>

            </p>
        <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>

        
        <p class="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 leading-relaxed">
            <?php echo e($course->description); ?>

        </p>

        
        <div class="flex items-center justify-between">
            <div>
                <div class="flex items-center gap-2">
                    <span class="font-black text-xl text-gray-900 dark:text-white">
                        $<?php echo e(number_format($finalPrice, 2)); ?>

                    </span>
                    <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($hasDiscount): ?>
                        <span class="text-xs px-2 py-0.5 rounded border border-pink-200 bg-pink-100 text-pink-700 font-bold shadow-sm">
                            -<?php echo e(round((1 - $finalPrice / $originalPrice) * 100)); ?>%
                        </span>
                    <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                </div>
                <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($hasDiscount): ?>
                    <div class="text-sm text-gray-400 line-through font-medium">
                        $<?php echo e(number_format($originalPrice, 2)); ?>

                    </div>
                <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
            </div>
            <a href="<?php echo e(route('course.detail', $course)); ?>"
               onclick="event.stopPropagation()"
               class="text-xs px-3 py-1.5 rounded-lg font-medium transition-colors
                      <?php echo e($isPurchased
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-purple-600 text-white hover:bg-purple-700'); ?>">
                <?php echo e($isPurchased ? 'Watch' : 'Enroll →'); ?>

            </a>
        </div>
    </div>
</div><?php /**PATH D:\Internship_ASS\Laravel\learnhub_project\resources\views/livewire/partials/course-card.blade.php ENDPATH**/ ?>