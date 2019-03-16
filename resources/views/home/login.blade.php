<!DOCTYPE html>
<html>

<head>
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

            <form class="login__form" action="">
                <div class="login__row">
                    <svg class="login__icon name svg-icon" viewBox="0 0 20 20">
                        <path d="M0,20 a10,8 0 0,1 20,0z M10,0 a4,4 0 0,1 0,8 a4,4 0 0,1 0,-8" />
                    </svg>
                    <input type="text" class="login__input name" placeholder="Username" />
                </div>
                <div class="login__row">
                    <svg class="login__icon pass svg-icon" viewBox="0 0 20 20">
                        <path d="M0,20 20,20 20,8 0,8z M10,13 10,16z M4,8 a6,8 0 0,1 12,0" />
                    </svg>
                    <input type="password" class="login__input pass" placeholder="Password" />
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
    $(document).on('click', '.login__submit', function(e) {
        window.location.href = "{{ url('/') }}";

        if (animating) return;
        animating = true;
        var that = this;
        ripple($(that), e);
        $(that).addClass('processing');
    });
</script>


<!-- <script>
    $(document).ready(function () {
        var animating = false;
            // submitPhase1 = 1100,
            // submitPhase2 = 400,
            // logoutPhase1 = 800,
            // $login = $('.login'),
            // $app = $('.app');

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
        $(document).on('click', '.login__submit', function (e) {
            if (animating)
                return;
            animating = true;
            var that = this;
            ripple($(that), e);
            $(that).addClass('processing');

            // setTimeout(function () {
            //     $(that).addClass('success');
            //     setTimeout(function () {
            //         $app.show();
            //         $app.css('top');
            //         $app.addClass('active');
            //     }, submitPhase2 - 70);
            //     setTimeout(function () {
            //         $login.hide();
            //         $login.addClass('inactive');
            //         animating = false;
            //         $(that).removeClass('success processing');
            //     }, submitPhase2);
            // }, submitPhase1);
        });
        // $(document).on('click', '.app__logout', function (e) {
        //     if (animating)
        //         return;
        //     $('.ripple').remove();
        //     animating = true;
        //     var that = this;
        //     $(that).addClass('clicked');
        //     setTimeout(function () {
        //         $app.removeClass('active');
        //         $login.show();
        //         $login.css('top');
        //         $login.removeClass('inactive');
        //     }, logoutPhase1 - 120);
        //     setTimeout(function () {
        //         $app.hide();
        //         animating = false;
        //         $(that).removeClass('clicked');
        //     }, logoutPhase1);
        // });
    });
</script> -->

</html> 