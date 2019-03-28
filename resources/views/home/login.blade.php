<!DOCTYPE html>
<html>

<head>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <script src="/js/commons.js"></script>

    <!-- bg-bubbles -->
    <link rel="stylesheet" href="/css/home/bg-bubbles/normalize.css">
    <link rel="stylesheet" href="/css/home/bg-bubbles/default.css">
    <link rel="stylesheet" href="/css/home/bg-bubbles/styles.css">

    <!-- login-frame -->
    <link rel="stylesheet" type="text/css" href="/css/home/login-frame/normalize.css" />
    <link rel="stylesheet" type="text/css" href="/css/home/login-frame/default.css">
    <link rel="stylesheet" type="text/css" href="/css/home/login-frame/styles.css">
    <script src='/js/home/stopExecutionOnTimeout.js?t=1'></script>
    <script src='/lib/JQuery/js/jquery-1.11.0.min.js'></script>

    <link rel="stylesheet" href="/css/home/login.css">
    <script src="/js/home/login.js"></script>

    <title>登录</title>

</head>

<body ng-app="">

    <div class="wrapper">
        <ul class="bg-bubbles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </div>

    <div id="title" class="blank-25">固体红外光谱的测试与分析</div>
    <div class="blank-25">
        <div id="login-btn" class="hand">
            <i class="fa fa-power-off" aria-hidden="true"></i>
        </div>
    </div>
    <div id="footer" class="blank-25"></div>

    <div class="demo narrow">
        <div class="login">
            <div class="fzu-icon">
                <img src="/static/images/icon/fzu-icon.png" alt="">
            </div>

            <div class="login__form" action="">
                <div class="login__row">
                    <svg class="login__icon name svg-icon" viewBox="0 0 20 20">
                        <path d="M0,20 a10,8 0 0,1 20,0z M10,0 a4,4 0 0,1 0,8 a4,4 0 0,1 0,-8" />
                    </svg>
                    <input id="username" type="text" class="login__input name" placeholder="Username" autocomplete="off" />
                </div>
                <div class="login__row">
                    <svg class="login__icon pass svg-icon" viewBox="0 0 20 20">
                        <path d="M0,20 20,20 20,8 0,8z M10,13 10,16z M4,8 a6,8 0 0,1 12,0" />
                    </svg>
                    <input id="password" type="password" class="login__input pass" placeholder="Password" />
                </div>
                <button type="button" class="login__submit">登 录</button>
                <p class="login__signup">还没有账号? &nbsp;<a href="{{ url('register') }}" target="_blank">立刻注册</a></p>
                </form>
            </div>
            <!-- <div class="app" style="border: 1px red solid;">
            <div class="app__logout">
                <svg class="app__logout-icon svg-icon" viewBox="0 0 20 20">
                    <path d="M6,3 a8,8 0 1,0 8,0 M10,0 10,12" />
                </svg>
            </div>
        </div> -->
        </div>

</body>

<script>
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $(document).ready(function() {

        var animating = false;

        function ripple(elem, e) {
            $('.ripple').remove();
            var elTop = elem.offset().top,
                elLeft = elem.offset().left,
                x = e.pageX - elLeft,
                y = e.pageY - elTop;
            var $ripple = $('<div class=\'ripple\'></div>');
            $ripple.css({
                top: y,
                left: x
            });
            elem.append($ripple);
        };

        // 登录
        $(document).on('click', '.login__submit', function(e) {

            $.ajax({
                type: "post",
                url: "{{ url('/user/login') }}",
                data: {
                    username: $('#username').val(),
                    password: $('#password').val()
                },
                // dataType: "json",
                success: function(res) {
                    console.log(res)
                }
            });

            if (animating) return;
            animating = true;
            var that = this;
            ripple($(that), e);
            $(that).addClass('processing');
        });
    });
</script>

</html> 