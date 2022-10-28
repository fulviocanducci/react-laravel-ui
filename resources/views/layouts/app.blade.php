<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>App - React</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">
    <link rel="stylesheet" href="{{asset('build/app.css')}}?v={{Str::random(16)}}">
</head>
<body>
    @yield('content')
    <script src="{{asset('build/app.js')}}?v={{Str::random(16)}}" defer async></script>
</body>
</html>
