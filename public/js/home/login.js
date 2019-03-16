$(function () {
    // login-frame的支持
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

    $(document).on('click', '.login__submit', function (e) {
        window.location.href = "../../html/home/index.html";

        if (animating) return;
        animating = true;
        var that = this;
        ripple($(that), e);
        $(that).addClass('processing');
    });


    // login-btn的click事件
    $('#login-btn').click(function () {
        // 标题、按钮、底部文字消失
        $('#title').animate({
            opacity: '0',
            top: '-=400px'
        }, 1000, function () {
            $('#title').hide();
        });
        $('#login-btn').animate({
            opacity: '0',
            top: '+=500px'
        }, 1000, function () {
            $('#login-btn').hide();
        });
        $('#footer').animate({
            opacity: '0',
            top: '+=600px'
        }, 1000, function () {
            $('#footer').hide();
        });

        // login-frame出现
        $('.demo').addClass('largen').removeClass('narrow');
        // var o = document.getElementById('test');
        // o.addEventListener("webkitAnimationStart", function() {
        //     console.log("动画开始");
        // })
        // o.addEventListener("webkitAnimationEnd", function() {
        //     console.log("动画结束");
        // })
        $('#footer').animate({
            left: '-=0px'
        }, 0, function () {
            let _demo = $('.demo');
            $('.demo').remove();
            $('body').append(_demo);
        });

        // 绑定bg-bubbles的click事件
        $('#footer').animate({
            left: '+=0px'
        }, 1000, function () {
            $('.bg-bubbles').click(function () {
                // bg-bubbles解绑click事件
                $('.bg-bubbles').unbind('click');

                // 标题、按钮、底部文字出现
                $('#title').show().animate({
                    opacity: '1',
                    top: '+=400px'
                }, 1000);
                $('#login-btn').show().animate({
                    opacity: '1',
                    top: '-=500px'
                }, 1000);
                $('#footer').show().animate({
                    opacity: '1',
                    top: '-=600px'
                }, 1000);

                // login-frame消失
                $('.demo').removeClass('largen').addClass('narrow');
            });
        });
    });

    // login-btn的hover特效
    $('#login-btn').hover(function () {
        $('#login-btn').css('color', '#53e3a6').animate({
            height: '110px',
            width: '110px',
            'margin-top': '15px',
            'font-size': '55px'
        }, 250);
    }, function () {
        $('#login-btn').css('color', '#eeeeee').animate({
            height: '100px',
            width: '100px',
            'margin-top': '20px',
            'font-size': '50px'
        }, 250);
    });
});