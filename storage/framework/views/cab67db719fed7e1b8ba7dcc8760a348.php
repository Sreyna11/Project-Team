<div class="py-10">
    <div class="container mx-auto px-4">
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-1">My Dashboard</h1>
            <p class="text-gray-500">Manage your courses and account</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">

            
            <div class="lg:col-span-1">
                <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                    
                    <div class="text-center mb-6">
                        <div class="w-20 h-20 rounded-full bg-purple-100 dark:bg-purple-900
                                    mx-auto mb-3 flex items-center justify-center">
                            <span class="text-purple-600 font-bold text-2xl">
                                <?php echo e(strtoupper(substr($user->name, 0, 2))); ?>

                            </span>
                        </div>
                        <h2 class="font-bold text-lg text-gray-900 dark:text-white"><?php echo e($user->name); ?></h2>
                        <p class="text-gray-500 text-sm"><?php echo e($user->email); ?></p>
                        <p class="text-xs text-gray-400 mt-1">
                            Member since <?php echo e($user->created_at->format('M Y')); ?>

                        </p>
                    </div>

                    
                    <nav class="space-y-1">
                        <button wire:click="setTab('overview')"
                                class="w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors text-sm font-medium
                                       <?php echo e($activeTab === 'overview' ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'); ?>">
                            <i class="fas fa-home w-5 text-center"></i> Overview
                        </button>
                        <button wire:click="setTab('courses')"
                                class="w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors text-sm font-medium
                                       <?php echo e($activeTab === 'courses' ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'); ?>">
                            <i class="fas fa-video w-5 text-center"></i> My Courses
                            <span class="ml-auto text-xs bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded-full">
                                <?php echo e($payments->count()); ?>

                            </span>
                        </button>
                        <button wire:click="setTab('receipts')"
                                class="w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors text-sm font-medium
                                       <?php echo e($activeTab === 'receipts' ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'); ?>">
                            <i class="fas fa-receipt w-5 text-center"></i> Receipts
                        </button>
                        <a href="<?php echo e(route('documents')); ?>"
                           class="flex items-center gap-3 p-3 rounded-lg text-left transition-colors text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                            <i class="fas fa-book-open w-5 text-center"></i> Documents
                        </a>
                        <form method="POST" action="<?php echo e(route('logout')); ?>">
                            <?php echo csrf_field(); ?>
                            <button type="submit"
                                    class="w-full flex items-center gap-3 p-3 rounded-lg text-left text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                                <i class="fas fa-sign-out-alt w-5 text-center"></i> Logout
                            </button>
                        </form>
                    </nav>
                </div>
            </div>

            
            <div class="lg:col-span-3">

                
                <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($activeTab === 'overview'): ?>
                    <div class="space-y-6">
                        
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                                <p class="text-sm text-gray-500 mb-1">Purchased Courses</p>
                                <p class="text-3xl font-bold text-gray-900 dark:text-white"><?php echo e($payments->count()); ?></p>
                            </div>
                            <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                                <p class="text-sm text-gray-500 mb-1">Total Spent</p>
                                <p class="text-3xl font-bold text-green-600">$<?php echo e(number_format($totalSpent, 2)); ?></p>
                            </div>
                            <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                                <p class="text-sm text-gray-500 mb-1">Last Purchase</p>
                                <p class="text-lg font-bold text-gray-900 dark:text-white">
                                    <?php echo e($payments->first()?->paid_at?->format('M d, Y') ?? '-'); ?>

                                </p>
                            </div>
                        </div>

                        
                        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                            <div class="p-5 border-b border-gray-200 dark:border-gray-700">
                                <h2 class="font-bold text-lg text-gray-900 dark:text-white">Recent Courses</h2>
                            </div>
                            <div class="p-5">
                                <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($payments->isEmpty()): ?>
                                    <div class="text-center py-8">
                                        <i class="fas fa-video text-gray-300 text-4xl mb-3"></i>
                                        <p class="text-gray-500 mb-4">No courses purchased yet</p>
                                        <a href="<?php echo e(route('courses')); ?>"
                                           class="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium">
                                            Browse Courses
                                        </a>
                                    </div>
                                <?php else: ?>
                                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php $__currentLoopData = $payments->take(3); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $payment): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                            <div class="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                                                <div class="h-32 overflow-hidden bg-purple-100">
                                                    <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($payment->course?->thumbnail_url): ?>
                                                        <img src="<?php echo e($payment->course->thumbnail_url); ?>" alt=""
                                                             class="w-full h-full object-cover">
                                                    <?php else: ?>
                                                        <div class="w-full h-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
                                                            <i class="fas fa-play-circle text-white text-3xl opacity-70"></i>
                                                        </div>
                                                    <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                                                </div>
                                                <div class="p-3">
                                                    <h4 class="font-semibold text-sm line-clamp-1 mb-2 text-gray-900 dark:text-white">
                                                        <?php echo e($payment->course?->title); ?>

                                                    </h4>
                                                    <a href="<?php echo e(route('course.player', $payment->course?->uuid)); ?>"
                                                       class="block text-center py-1.5 text-xs font-semibold rounded-lg
                                                              bg-purple-600 hover:bg-purple-700 text-white transition-colors">
                                                        <i class="fas fa-play mr-1"></i> Watch Now
                                                    </a>
                                                </div>
                                            </div>
                                        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                                    </div>
                                <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                            </div>
                        </div>
                    </div>

                
                <?php elseif($activeTab === 'courses'): ?>
                    <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                        <div class="p-5 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                            <h2 class="font-bold text-lg text-gray-900 dark:text-white">My Courses</h2>
                            <a href="<?php echo e(route('courses')); ?>"
                               class="text-sm text-purple-600 hover:text-purple-700 font-medium">
                                + Buy more
                            </a>
                        </div>
                        <div class="p-5">
                            <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($payments->isEmpty()): ?>
                                <div class="text-center py-12">
                                    <i class="fas fa-video text-gray-300 text-4xl mb-3"></i>
                                    <p class="text-gray-500 mb-4">No courses purchased yet</p>
                                    <a href="<?php echo e(route('courses')); ?>"
                                       class="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm">Browse Courses</a>
                                </div>
                            <?php else: ?>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php $__currentLoopData = $payments; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $payment): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                        <div class="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                                            <div class="h-36 overflow-hidden">
                                                <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($payment->course?->thumbnail_url): ?>
                                                    <img src="<?php echo e($payment->course->thumbnail_url); ?>" alt=""
                                                         class="w-full h-full object-cover">
                                                <?php else: ?>
                                                    <div class="w-full h-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
                                                        <i class="fas fa-play-circle text-white text-3xl opacity-70"></i>
                                                    </div>
                                                <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                                            </div>
                                            <div class="p-4">
                                                <h4 class="font-semibold text-sm mb-1 text-gray-900 dark:text-white line-clamp-2">
                                                    <?php echo e($payment->course?->title); ?>

                                                </h4>
                                                <p class="text-xs text-gray-500 mb-3">
                                                    <?php echo e($payment->course?->videoModules?->count() ?? 0); ?> modules
                                                    • Purchased <?php echo e($payment->paid_at?->format('M d, Y')); ?>

                                                </p>
                                                <a href="<?php echo e(route('course.player', $payment->course?->uuid)); ?>"
                                                   class="block text-center py-2 text-xs font-semibold rounded-lg
                                                          bg-purple-600 hover:bg-purple-700 text-white transition-colors">
                                                    <i class="fas fa-play mr-1"></i> Continue Learning
                                                </a>
                                            </div>
                                        </div>
                                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                                </div>
                            <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                        </div>
                    </div>

                
                <?php elseif($activeTab === 'receipts'): ?>
                    <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                        <div class="p-5 border-b border-gray-200 dark:border-gray-700">
                            <h2 class="font-bold text-lg text-gray-900 dark:text-white">Purchase History</h2>
                        </div>
                        <div class="p-5">
                            
                            <div class="grid grid-cols-3 gap-4 mb-6">
                                <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                                    <p class="text-2xl font-bold text-gray-900 dark:text-white"><?php echo e($payments->count()); ?></p>
                                    <p class="text-xs text-gray-500 mt-1">Total purchases</p>
                                </div>
                                <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                                    <p class="text-2xl font-bold text-green-600">$<?php echo e(number_format($totalSpent, 2)); ?></p>
                                    <p class="text-xs text-gray-500 mt-1">Total spent</p>
                                </div>
                                <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                                    <p class="text-lg font-bold text-gray-900 dark:text-white">
                                        <?php echo e($payments->first()?->paid_at?->format('M d') ?? '-'); ?>

                                    </p>
                                    <p class="text-xs text-gray-500 mt-1">Last purchase</p>
                                </div>
                            </div>

                            <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($payments->isEmpty()): ?>
                                <div class="text-center py-8 text-gray-500">No purchase history</div>
                            <?php else: ?>
                                <div class="overflow-x-auto">
                                    <table class="w-full text-sm">
                                        <thead>
                                            <tr class="border-b border-gray-200 dark:border-gray-700">
                                                <th class="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Invoice</th>
                                                <th class="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Course</th>
                                                <th class="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Date</th>
                                                <th class="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                                                <th class="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
                                            <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php $__currentLoopData = $payments; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $payment): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                                <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                                    <td class="py-3 px-4 text-xs font-mono text-gray-500">
                                                        <?php echo e($payment->invoice_number); ?>

                                                    </td>
                                                    <td class="py-3 px-4">
                                                        <p class="font-medium text-gray-900 dark:text-white text-xs line-clamp-1">
                                                            <?php echo e($payment->course?->title); ?>

                                                        </p>
                                                    </td>
                                                    <td class="py-3 px-4 text-xs text-gray-500">
                                                        <?php echo e($payment->paid_at?->format('M d, Y')); ?>

                                                    </td>
                                                    <td class="py-3 px-4 text-xs font-bold text-gray-900 dark:text-white">
                                                        $<?php echo e(number_format($payment->amount, 2)); ?>

                                                    </td>
                                                    <td class="py-3 px-4">
                                                        <span class="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                                                            Paid
                                                        </span>
                                                    </td>
                                                </tr>
                                            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                                        </tbody>
                                    </table>
                                </div>
                            <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                        </div>
                    </div>
                <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
            </div>
        </div>
    </div>
</div><?php /**PATH D:\Internship_ASS\Laravel\learnhub_project\resources\views/livewire/dashboard-page.blade.php ENDPATH**/ ?>