<!DOCTYPE html>
<html lang="en" x-data="{ darkMode: localStorage.getItem('theme') === 'dark' }" 
      x-init="$watch('darkMode', val => localStorage.setItem('theme', val ? 'dark' : 'light'))"
      :class="{ 'dark': darkMode }">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $title ?? 'LearnHub' }}</title>

    {{-- Tailwind --}}
    <script src="https://cdn.tailwindcss.com"></script>
    <script>tailwind.config = { darkMode: 'class' }</script>

    {{-- Font Awesome --}}
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

    {{-- Alpine.js --}}
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

    {{-- Livewire Styles --}}
    @livewireStyles
</head>
<body class="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">

    {{-- Navbar --}}
    @include('livewire.partials.navbar')

    {{-- Toast Notification --}}
    <div
        x-data="{ show: false, message: '', type: 'success' }"
        x-on:toast.window="
            message = $event.detail.message;
            type = $event.detail.type ?? 'success';
            show = true;
            setTimeout(() => show = false, 4000)
        "
        x-show="show"
        x-transition.opacity
        class="fixed bottom-4 right-4 z-50 px-5 py-3 rounded-xl shadow-xl text-white font-medium text-sm flex items-center gap-2"
        :class="{
            'bg-green-500': type === 'success',
            'bg-red-500': type === 'error',
            'bg-blue-500': type === 'info'
        }"
        style="display:none"
    >
        <i :class="{
            'fas fa-check-circle': type === 'success',
            'fas fa-exclamation-circle': type === 'error',
            'fas fa-info-circle': type === 'info'
        }"></i>
        <span x-text="message"></span>
    </div>

    {{-- Main Content --}}
    <main>
        {{ $slot }}
    </main>

    {{-- Footer --}}
    @include('livewire.partials.footer')

    {{-- Livewire Scripts --}}
    @livewireScripts
</body>
</html>