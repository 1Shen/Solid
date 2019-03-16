$(function () {


    $('.layui-tab-title li').click(function () {
        $('.layui-tab-title li').data('active', false);
        $(this).data('active', true);
    })

    $('.layui-tab-title li').hover(function () {
        // over
        if (!$(this).hasClass('layui-this')) {
            $(this).addClass('layui-this');
        } else {
            $(this).data('active', true);
        }
    }, function () {
        // out
        if (!$(this).data('active')) {
            $(this).removeClass('layui-this');
        }
    });
});