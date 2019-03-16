$(function () {})

function navbarBind() {
    $('.nav-item').mouseover(function () {
        $(this).addClass('nav-hover');
    });
    $('.nav-item').mouseout(function () {
        $(this).removeClass('nav-hover');
    });
    $('.nav-item').click(function () {
        let _this = $(this);

        $('.nav-item').each(function () {
            $(this).removeClass('nav-active');
        });

        _this.addClass('nav-active');
    });
}