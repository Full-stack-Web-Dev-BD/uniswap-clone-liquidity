wow = new WOW(
    {
        animateClass: 'animated',
        offset: 100,
        callback: function (box) {
        }
    }
);
wow.init();
var scroll = new SmoothScroll('a[href*="#"]');
$(document).ready(function () {
    $(document).on('click', '.nav-item a', function (e) {
        $(this).parent().addClass('active').siblings().removeClass('active');
    });
});
$(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
        $('.fixed-top').addClass('bg-blue');
    } else {
        $('.fixed-top').removeClass('bg-blue');
    }
});
function stopvid() {
    var videos = document.querySelectorAll('iframe, video');
    Array.prototype.forEach.call(videos, function (video) {
        if (video.tagName.toLowerCase() === 'video') {
            video.pause();
        } else {
            var src = video.src;
            video.src = src;
        }
    });
};
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})