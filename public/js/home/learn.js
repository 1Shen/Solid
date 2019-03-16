$(function () {

    $('li.home').removeClass('active');
    $('li.learn').addClass('active');


    // timeline的支持
    $('.layui-timeline-title').click(function () {

        let videoId = $('.layui-timeline-content .active').attr('data-video');
        let videoContainer = document.querySelector('#video' + videoId);
        let player;
        if ($(videoContainer)[0]) {
            player = $(videoContainer)[0].children[0];
            let video = $(player).find('video')[0];
            if (video && !video.paused) togglePlay(video, player);
        }

        let _this = $(this);

        $('.layui-timeline-title').each(function () {
            $(this).removeClass('active');
        });
        $('.layui-timeline-axis').each(function () {
            $(this).removeClass('active');
        });

        $('.layui-timeline-content ul').each(function () {
            $(this).hide();
        });

        _this.parent().siblings('.layui-timeline-axis').addClass('active');
        _this.addClass('active');
        _this.siblings('.layui-timeline-content ul').show();

        $('.video-container').hide();
        $('#video' + _this.attr('data-video')).show();
    });

    $('.layui-timeline-axis').click(function () {
        let _this = $(this).next().children('.layui-timeline-title');

        _this.trigger('click');
    });

    $('.layui-timeline-title').first().trigger('click');

    // 视频播放器按钮hover特效
    $('.default__button').hover(function(){
        $(this).addClass('largen').removeClass('narrow');
    }, function(){
        $(this).removeClass('largen').addClass('narrow');
    });

    $('.default__button--big .ckin-play').hover(function(){
        $(this).css('font-size', '76.8px');
    }, function(){
        $(this).css('font-size', '64px');
    });

    // TODO：注册按钮及登录按钮的特效，跳转register及index界面的navbar选择
})