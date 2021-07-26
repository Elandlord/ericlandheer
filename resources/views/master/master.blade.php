<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">

    <title>Eric Landheer | Webdeveloper | Interactive resume</title>

    @production
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-86938202-1"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-86938202-1');
        </script>
    @endproduction

    @livewireStyles
</head>
</html>
<body class="bg-gray-50">
    <div id="app">
        @include('master.navbar')

        @yield('content')

        @include('master.footer')
    </div>

    <script src="{{ mix('js/app.js') }}"></script>
    @livewireScripts
</body>
