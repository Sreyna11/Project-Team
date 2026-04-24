<div class="min-h-screen bg-gray-50 dark:bg-gray-900" wire:poll.2s="checkPaymentStatus">
    
    
    <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($khqrStatus === 'paid'): ?>
        <div class="fixed top-5 right-5 z-50">
            <div class="bg-emerald-500 text-white px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce">
                <i class="fas fa-check-circle text-xl"></i>
                <div>
                    <p class="font-bold text-sm">Payment Successful</p>
                    <p class="text-xs opacity-90">Course unlocked 🎉</p>
                </div>
            </div>
        </div>
    <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>

    
    <div class="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
        <div class="max-w-7xl mx-auto px-4 py-4 lg:py-5">
            <a href="<?php echo e(route('courses')); ?>" class="inline-flex items-center gap-2 px-4 py-2.5 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/40 rounded-xl font-semibold text-sm lg:text-base transition-all duration-200 group">
                <i class="fas fa-arrow-left text-xs lg:text-sm group-hover:-translate-x-0.5 transition-transform duration-200"></i>
                <span>Back to Courses</span>
            </a>
        </div>
    </div>

    
    <div class="bg-gray-900 py-10 lg:py-16">
        <div class="max-w-7xl mx-auto px-4">
            <div class="max-w-3xl">
                <div class="flex flex-wrap gap-2 mb-4">
                    <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($course->is_hot): ?>
                        <span class="text-xs px-3 py-1.5 rounded font-bold bg-yellow-400 text-yellow-900">Highest Rated</span>
                        <span class="text-xs px-3 py-1.5 rounded font-bold bg-red-500 text-white">Hot & New</span>
                    <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                    <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($course->category): ?>
                        <span class="text-xs px-3 py-1.5 rounded bg-purple-600 text-white font-medium"><?php echo e($course->category->name); ?></span>
                    <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                    <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($course->activePromotion): ?>
                        <span class="text-xs px-3 py-1.5 rounded font-bold bg-gradient-to-r from-amber-400 to-orange-500 text-gray-900">
                            <i class="fas fa-star mr-1"></i> <?php echo e($course->activePromotion->promotion_name ?? 'Special Offer'); ?>

                        </span>
                    <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                </div>

                <h1 class="text-3xl lg:text-4xl font-black text-white mb-4 leading-tight"><?php echo e($course->title); ?></h1>
                <p class="text-gray-300 mb-5 leading-relaxed"><?php echo e($course->description); ?></p>

                <div class="flex flex-wrap items-center gap-4 mb-4 text-sm">
                    <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($course->rating): ?>
                        <div class="flex items-center gap-2">
                            <div class="flex gap-0.5">
                                <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php for($i = 1; $i <= 5; $i++): ?>
                                    <i class="fas fa-star text-xs <?php echo e($i <= floor($course->rating) ? 'text-yellow-400' : 'text-gray-600'); ?>"></i>
                                <?php endfor; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                            </div>
                            <span class="text-yellow-400 font-bold"><?php echo e(number_format($course->rating, 1)); ?></span>
                            <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($course->total_students): ?>
                                <span class="text-gray-400">(<?php echo e(number_format($course->total_students)); ?> ratings) • <?php echo e(number_format($course->total_students)); ?> students</span>
                            <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                        </div>
                    <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                </div>

                <div class="flex flex-wrap gap-4 text-sm text-gray-400">
                    <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($course->instructor): ?>
                        <span>Created by <span class="text-purple-400 font-medium"><?php echo e($course->instructor); ?></span></span>
                    <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                    <?php $lastUpdated = $course->last_updated_at ?? now(); ?>
                    <span><i class="fas fa-calendar mr-1"></i> Last updated <?php echo e(\Carbon\Carbon::parse($lastUpdated)->format('d M Y')); ?></span>
                    <span><i class="fas fa-globe mr-1"></i> English</span>
                    <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($course->duration): ?>
                        <span><i class="fas fa-clock mr-1"></i> <?php echo e($course->duration); ?></span>
                    <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                </div>
            </div>
        </div>
    </div>

    
    <div class="max-w-7xl mx-auto px-4 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

            
            <div class="lg:col-span-2 space-y-6">

                
                <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                    <h2 class="text-xl font-black text-gray-900 dark:text-white mb-5">What you'll learn</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php $__empty_1 = true; $__currentLoopData = $course->videoModules; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $module): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); $__empty_1 = false; ?>
                            <div class="flex items-start gap-3">
                                <i class="fas fa-check text-green-500 text-sm mt-0.5 flex-shrink-0"></i>
                                <span class="text-sm text-gray-700 dark:text-gray-300"><?php echo e($module->title); ?></span>
                            </div>
                        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); if ($__empty_1): ?>
                            <p class="text-gray-500 text-sm col-span-2">No learning points available yet.</p>
                        <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                    </div>
                </div>

                
                <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                    <div class="flex items-center justify-between mb-2">
                        <h2 class="text-xl font-black text-gray-900 dark:text-white">Course content</h2>
                        <button wire:click="$set('expandedSections', <?php echo e(json_encode(range(0, count($course->videoModules) - 1))); ?>)" class="text-xs text-purple-600 hover:text-purple-700 font-medium underline">
                            Expand all
                        </button>
                    </div>
                    <p class="text-sm text-gray-500 mb-5">
                        <?php echo e($course->videoModules->count()); ?> modules
                        <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($course->duration): ?> • <?php echo e($course->duration); ?> total <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                    </p>
                    <div class="space-y-2">
                        <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php $__currentLoopData = $course->videoModules; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $index => $module): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                            <?php $isExpanded = in_array($index, $expandedSections); ?>
                            <div class="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                    <button wire:click="toggleSection(<?php echo e($index); ?>)" class="w-full sm:w-auto flex items-center gap-3 text-left">
                                        <i class="fas <?php echo e($isExpanded ? 'fa-chevron-down' : 'fa-chevron-right'); ?> text-xs text-gray-500 w-3"></i>
                                        <span class="text-sm font-semibold text-gray-900 dark:text-white"><?php echo e($module->title); ?></span>
                                        <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($module->is_free): ?>
                                            <span class="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">Free preview</span>
                                        <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                                    </button>
                                    <div class="flex items-center gap-3 mt-3 sm:mt-0 text-xs text-gray-500">
                                        <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($module->duration): ?><span><?php echo e($module->duration); ?></span><?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                                        <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($isOwned || $module->is_free): ?>
                                            <a href="<?php echo e(route('course.player.module', ['course' => $course->uuid, 'module' => $module->uuid])); ?>" class="inline-flex items-center gap-1.5 text-purple-600 hover:text-purple-700 font-medium">
                                                <i class="fas fa-play-circle"></i> Watch now
                                            </a>
                                        <?php else: ?>
                                            <span class="inline-flex items-center gap-1.5 text-gray-400">
                                                <i class="fas fa-lock"></i> Locked
                                            </span>
                                        <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                                    </div>
                                </div>
                                <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($isExpanded && $module->description): ?>
                                    <div class="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                                        <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed"><?php echo e($module->description); ?></p>
                                    </div>
                                <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                            </div>
                        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                    </div>
                </div>

                
                <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($course->instructor): ?>
                    <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                        <h2 class="text-xl font-black text-gray-900 dark:text-white mb-5">Instructor</h2>
                        <div class="flex items-start gap-5">
                            <div class="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                                <span class="text-purple-600 font-black text-xl"><?php echo e(strtoupper(substr($course->instructor, 0, 2))); ?></span>
                            </div>
                            <div class="flex-1">
                                <h3 class="font-black text-lg text-purple-600 mb-0.5"><?php echo e($course->instructor); ?></h3>
                                <p class="text-sm text-gray-500 mb-4">Expert Instructor • LearnHub</p>
                                <div class="flex flex-wrap gap-3">
                                    <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($course->rating): ?>
                                        <div class="text-center px-4 py-2.5 bg-gray-50 dark:bg-gray-700 rounded-xl">
                                            <div class="text-base font-black text-yellow-500"><?php echo e($course->rating); ?></div>
                                            <div class="text-xs text-gray-500">Rating</div>
                                        </div>
                                    <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                                    <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($course->total_students): ?>
                                        <div class="text-center px-4 py-2.5 bg-gray-50 dark:bg-gray-700 rounded-xl">
                                            <div class="text-base font-black text-gray-900 dark:text-white"><?php echo e(number_format($course->total_students)); ?></div>
                                            <div class="text-xs text-gray-500">Students</div>
                                        </div>
                                    <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                                    <div class="text-center px-4 py-2.5 bg-gray-50 dark:bg-gray-700 rounded-xl">
                                        <div class="text-base font-black text-gray-900 dark:text-white"><?php echo e($course->videoModules->count()); ?></div>
                                        <div class="text-xs text-gray-500">Modules</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
            </div>

            
            <div class="lg:col-span-1">
                <div class="sticky top-6 space-y-3">
                    
                    
                    <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($course->activePromotion): ?>
                        <?php
                            $promo          = $course->activePromotion;
                            $endDate        = \Carbon\Carbon::parse($promo->end_date)->endOfDay();
                            $totalHoursLeft = max(0, (int) \Carbon\Carbon::now()->diffInHours($endDate, false));
                            $daysLeft       = (int) floor($totalHoursLeft / 24);
                            $promoName      = $promo->promotion_name ?? 'Special Offer';
                            $discVal        = $promo->discount_value;
                            $discSuffix     = ($promo->promotion_type === 'percent') ? '%' : '$';
                            $isUrgent       = $daysLeft < 3;
                        ?>

                        <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($totalHoursLeft > 0): ?>
                            <div class="relative overflow-hidden rounded-xl <?php echo e($isUrgent ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-gradient-to-r from-amber-400 to-orange-400'); ?>">
                                <div class="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-white/10 pointer-events-none"></div>
                                <div class="relative flex items-center justify-between gap-3 px-4 py-3">
                                    <div class="flex items-center gap-2.5 min-w-0">
                                        <div class="w-7 h-7 rounded-lg bg-black/15 flex items-center justify-center flex-shrink-0">
                                            <i class="fas <?php echo e($isUrgent ? 'fa-fire' : 'fa-tag'); ?> text-white text-xs"></i>
                                        </div>
                                        <div class="min-w-0">
                                            <p class="text-white font-black text-sm leading-none truncate">
                                                <?php echo e($discVal); ?><?php echo e($discSuffix); ?> OFF
                                                <span class="font-medium opacity-80 text-xs ml-1">— <?php echo e($promoName); ?></span>
                                            </p>
                                            <p class="text-white/70 text-[11px] mt-0.5">
                                                <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($daysLeft === 0): ?> Expires in <?php echo e($totalHoursLeft); ?>h
                                                <?php elseif($daysLeft === 1): ?> Ends tomorrow
                                                <?php else: ?> <?php echo e($daysLeft); ?> days left
                                                <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                                                · ends <?php echo e($endDate->format('M d')); ?>

                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                    <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>

                    
                    <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-xl">
                        <div class="aspect-video overflow-hidden">
                            <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($course->image): ?>
                                <?php
                                    $courseImage = $course->thumbnail_url;
                                ?>
                                <img src="<?php echo e($courseImage); ?>" alt="<?php echo e($course->title); ?>" class="w-full h-full object-cover">
                            <?php else: ?>
                                <div class="w-full h-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
                                    <i class="fas fa-play-circle text-white text-5xl opacity-70"></i>
                                </div>
                            <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                        </div>

                        <div class="p-5">
                            <div class="flex items-end gap-3 mb-4">
                                <span class="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                                    $<?php echo e(number_format($finalPrice, 2)); ?>

                                </span>
                                <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($hasDiscount): ?>
                                    <div class="flex flex-col pb-0.5">
                                        <span class="text-gray-400 line-through text-sm leading-none">$<?php echo e(number_format($originalPrice, 2)); ?></span>
                                        <span class="text-xs font-bold text-red-500 mt-0.5"><?php echo e(round((1 - $finalPrice / $originalPrice) * 100)); ?>% off</span>
                                    </div>
                                <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                            </div>

                            <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($isOwned): ?>
                                <button class="w-full py-3.5 rounded-xl font-black text-sm bg-emerald-100 text-emerald-700 cursor-default mb-4">
                                    <i class="fas fa-check-circle mr-2"></i> Course Purchased
                                </button>
                            <?php else: ?>
                                <button wire:click="purchaseCourse"
                                        class="w-full py-3.5 rounded-xl font-black text-sm bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-95 mb-4">
                                    <span wire:loading.remove wire:target="purchaseCourse">
                                        <i class="fas fa-shopping-cart mr-2"></i> Purchase Course
                                    </span>
                                    <span wire:loading wire:target="purchaseCourse">
                                        <i class="fas fa-circle-notch fa-spin mr-2"></i> Generating QR...
                                    </span>
                                </button>
                            <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>

                            <div class="space-y-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                                <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php $__currentLoopData = [
                                    ['icon' => 'fa-shield-alt', 'color' => 'text-green-500',  'text' => '30-day money-back guarantee'],
                                    ['icon' => 'fa-infinity',   'color' => 'text-purple-500', 'text' => 'Full lifetime access'],
                                    ['icon' => 'fa-mobile-alt', 'color' => 'text-blue-500',   'text' => 'Access on mobile & desktop'],
                                    ['icon' => 'fa-film',       'color' => 'text-orange-500', 'text' => $course->videoModules->count() . ' video modules'],
                                ]; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $g): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                    <div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                        <i class="fas <?php echo e($g['icon']); ?> <?php echo e($g['color']); ?> w-4 text-center flex-shrink-0"></i>
                                        <?php echo e($g['text']); ?>

                                    </div>
                                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

    
    <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($showKhqrModal && $khqrData): ?>

<div
    class="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
    wire:click.self="closeKhqrModal"
    wire:poll.3s="checkPaymentStatus"
    x-data="{
        seconds: 300,
        redirectSeconds: 3,
        timer: null,
        redirectTimer: null,

        startTimer() {
            this.timer = setInterval(() => {
                if (this.seconds > 0) this.seconds--;
            }, 1000);
        },

        stopTimer() {
            clearInterval(this.timer);
            clearInterval(this.redirectTimer);
        },

        startRedirect() {
            this.redirectTimer = setInterval(() => {
                if (this.redirectSeconds > 0) this.redirectSeconds--;
            }, 1000);
        },

        get timeFormat() {
            return Math.floor(this.seconds / 60) + ':' + String(this.seconds % 60).padStart(2, '0');
        }
    }"
    x-init="startTimer()"

    
    x-on:payment-confirmed.window="
        stopTimer();
        startRedirect();

        setTimeout(() => {
            $wire.closeKhqrModal();
        }, 2500);
    "
>

    <!-- MODAL BOX -->
    <div class="bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden relative">
        
        <button wire:click="closeKhqrModal" class="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors z-10">
            <i class="fas fa-times text-lg"></i>
        </button>

        
        
        
        <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($khqrStatus !== 'paid'): ?>

        <div class="p-5 border-b text-center">
            <div class="bg-red-600 text-white font-black px-4 py-1 rounded-lg inline-block">
                BAKONG PAYMENT
            </div>
            <p class="text-xs text-gray-500 mt-2">Scan QR to pay</p>
            <p class="text-sm font-bold mt-1"><?php echo e($khqrData['course_title']); ?></p>
        </div>

        <div class="p-6 text-center">

            
            <img src="<?php echo e($khqrData['qr_image']); ?>"
                 class="w-52 h-52 mx-auto mb-4">

            
            <div class="bg-purple-600 text-white rounded-xl p-4 mb-4">
                <p class="text-xs opacity-80">Amount</p>
                <p class="text-3xl font-black">
                    $<?php echo e(number_format($khqrData['amount'], 2)); ?>

                </p>
            </div>

            
            <div class="flex items-center justify-center gap-2 text-yellow-600 font-bold">
                <span class="w-2 h-2 bg-yellow-400 rounded-full animate-ping"></span>
                Waiting for payment...
            </div>

            <p class="text-xs text-gray-400 mt-3">
                Expires in <span x-text="timeFormat"></span>
            </p>

        </div>

        
        
        
        <?php else: ?>

        <div class="p-10 text-center bg-emerald-500 text-white relative overflow-hidden">

            <div class="w-20 h-20 bg-white rounded-full mx-auto flex items-center justify-center mb-5">
                <i class="fas fa-check text-4xl text-emerald-500"></i>
            </div>

            <h2 class="text-2xl font-black mb-2">
                Payment Successful
            </h2>

            <p class="text-sm opacity-90 mb-6">
                Course unlocked successfully 🎉
            </p>

            <div class="bg-black/20 rounded-full px-4 py-2 inline-block">
                Closing in <span x-text="redirectSeconds"></span>s
            </div>

        </div>

        <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>

    </div>
</div>

<?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
</div><?php /**PATH D:\Internship_ASS\Laravel\learnhub_project\resources\views/livewire/course-detail.blade.php ENDPATH**/ ?>