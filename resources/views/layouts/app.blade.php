<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>
    <script src="/js/commons.js"></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css">

    <!-- Styles -->
    <link rel="stylesheet" href="/css/home/register.css">

    <!-- <title>{{ config('app.name', 'Laravel') }}</title> -->
    <title>虚拟仿真实验</title>
</head>

<body>
    <div id="app">
        <nav class="navbar navbar-cyan">
            <div class="container">
                <div class="collapse navbar-collapse" id="navbarSupportedContent">

                    <!-- Left Side Of Navbar -->
                    <ul class="nav navbar-nav navbar-left">
                        <a href="{{ url('/') }}">
                            <li class="navbar-brand">虚拟仿真实验</li>
                        </a>
                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="nav navbar-nav navbar-right">
                        <!-- Authentication Links -->
                        @guest
                        <li id="login-nav" class="nav-item"><a href="{{ url('login') }}">登录</a></li>
                        @if (Route::has('register'))
                        <li id="register-nav" class="nav-item"><a href="{{ url('register') }}">注册</a></li>
                        @endif
                        @else
                        <li id="dropdown-nav" class="nav-item dropdown">
                            <a id="navbarDropdown" class="dropdown-toggle nav-item" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                <img src="/static/images/icon/user-active.png" alt="" class="active" style="display:none">
                                <img src="/static/images/icon/user.png" alt="" class="normal">
                                {{ Auth::user()->username }}
                                <span class="caret"></span>
                            </a>

                            <ul class="dropdown-menu">
                                <li><a href="#">个人中心</a></li>
                                <li><a href="#">在线商城</a></li>
                                <li role="separator" class="divider"></li>
                                <li><a href="{{ route('logout') }}" onclick="event.preventDefault();
                                    document.getElementById('logout-form').submit();">注销</a></li>
                                <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                    @csrf
                                </form>
                            </ul>
                        </li>
                        @endguest
                    </ul>
                </div>
            </div>
        </nav>

        <main class="py-4">
            @yield('content')
        </main>
    </div>
</body>

<script>
    $(function() {
        navbarBind();
        layui.use('element', function() {
            var element = layui.element;
        });
        layui.use('form', function() {
            var form = layui.form;

            //监听提交
            form.on('submit(formDemo)', function(data) {
                // layer.msg(JSON.stringify(data.field));
                return false;
            });
        });
    });
</script>

</html> 