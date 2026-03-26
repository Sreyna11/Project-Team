<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>LearnHub - Master Tech Skills with Expert-Led Courses</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    <script src="https://cdn.tailwindcss.com"></script>

    <link rel="stylesheet" href="{{ asset('css/style.css') }}">

</head>

<body class="min-h-screen">
    {{-- Navbar --}}
    @include('partials.navbar')

    {{-- Page Content --}}
    <main id="main-content">
        @yield('content')
    </main>

    {{-- Footer --}}
    @include('partials.footer')


    <script src="{{ asset('js/script.js') }}"></script>

</body>

</html>