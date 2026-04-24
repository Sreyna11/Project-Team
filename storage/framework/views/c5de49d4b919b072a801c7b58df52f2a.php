<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="csrf-token" content="<?php echo e(csrf_token()); ?>">
    <title>LearnHub - <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if(isset($title)): ?> <?php echo e($title); ?> <?php else: ?> <?php echo $__env->yieldContent('title', 'Master Tech Skills'); ?> <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?></title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        primary: '#9333ea',
                    }
                }
            }
        }
    </script>
    <link rel="stylesheet" href="<?php echo e(asset('css/style.css')); ?>">

    <style>
    /* Block video selection */
    video {
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
        pointer-events: auto;
    }

    /* Block right-click save on images too */
    img {
        -webkit-user-drag: none;
        user-drag: none;
        pointer-events: none;
    }
</style>
</head>
<body class="min-h-screen">
    <script>
        if (localStorage.getItem('theme') === 'dark') {
            document.documentElement.classList.add('dark');
        }
    </script>

    
    <?php echo $__env->make('livewire.partials.navbar', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>

    
    <div id="toast-container"
         class="fixed bottom-4 right-4 z-50 flex flex-col gap-2"
         x-data
         @toast.window="
            const el = document.createElement('div');
            el.className = 'flex items-center gap-3 px-4 py-3 rounded-lg text-white text-sm shadow-lg ' +
                ($event.detail.type === 'success' ? 'bg-green-500' : 'bg-red-500');
            el.innerHTML = '<i class=\'fas ' + ($event.detail.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle') + '\'></i>' +
                '<span>' + $event.detail.message + '</span>';
            $el.appendChild(el);
            setTimeout(() => el.remove(), 4000);
         ">
    </div>

    
    <main>
        <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if(isset($slot)): ?>
            <?php echo e($slot); ?>

        <?php else: ?>
            <?php echo $__env->yieldContent('content'); ?>
        <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
    </main>

    
    <?php echo $__env->make('livewire.partials.footer', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>
</body>
</html><?php /**PATH D:\Internship_ASS\Laravel\learnhub_project\resources\views/layouts/app.blade.php ENDPATH**/ ?>