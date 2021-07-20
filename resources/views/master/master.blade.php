<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">

    <title>Eric Landheer | Webdeveloper | Interactive resume</title>

</head>
</html>
<body class="bg-gray-50">
    <div id="app">
        @yield('content')

        @include('master.footer')
    </div>
</body>
