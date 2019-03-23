$(function () {
    $(document).click(function (e) {
        if ($(e.target).closest('#dropdown-nav').length == 0) {
            $('.dropdown-menu').slideUp(250);
            $('.dropdown-toggle .active').hide();
            $('.dropdown-toggle .normal').show();
        }
    });
})

function navbarBind() {
    $('.nav-item').mouseover(function () {
        $(this).addClass('nav-hover');
    });
    $('.nav-item').mouseout(function () {
        $(this).removeClass('nav-hover');
    });
    $('#dropdown-nav').click(function () {
        $('.dropdown-menu').slideToggle(250);
    });
    $('#dropdown-nav').hover(function () {
        $('.dropdown-toggle .active').show();
        $('.dropdown-toggle .normal').hide();
    }, function () {
        if (!$('#dropdown-nav').hasClass('open')) {
            $('.dropdown-toggle .active').hide();
            $('.dropdown-toggle .normal').show();
        }
    })
}
