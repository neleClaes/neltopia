<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">

<script src="https://kit.fontawesome.com/078c54be57.js" crossorigin="anonymous"></script>
<link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@700&display=swap" rel="stylesheet" />

<meta name="csrf-token" content="{{ csrf_token() }}">
<title>Neltopia</title>

<link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
<div id="index"></div>
<script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
