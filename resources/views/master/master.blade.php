<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Eric Landheer | Web Developer | Interactive Resume</title>
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
    <script src="{{ mix('js/app.js') }}" defer></script>

    @production
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-86938202-1"></script>
        <script>
            window.dataLayer = window.dataLayer || [];

            function gtag() {
                dataLayer.push(arguments);
            }

            gtag('js', new Date());
            gtag('config', 'UA-86938202-1');
        </script>
    @endproduction
</head>
<body class="min-h-screen bg-slate-950 text-slate-100 antialiased">
    <div id="app" class="relative overflow-x-hidden">
        @include('master.navbar')

        <main>
            @yield('content')
        </main>

        @include('master.footer')
    </div>
</body>
</html>
