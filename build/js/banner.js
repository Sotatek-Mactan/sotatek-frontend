var interleaveOffset = 1;

var swiperOptions = {
    loop: true,
    speed: 1000,
    grabCursor: true,
    watchSlidesProgress: true,
    mousewheelControl: true,
    keyboardControl: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    on: {
        progress: function() {
        var swiper = this;
        for (var i = 0; i < swiper.slides.length; i++) {
            var slideProgress = swiper.slides[i].progress;
            var innerOffset = swiper.width * interleaveOffset;
            var innerTranslate = slideProgress * innerOffset;
            swiper.slides[i].querySelector(".slide-inner").style.transform =
            "translate3d(" + innerTranslate + "px, 0, 0)";
        }      
        },
        touchStart: function() {
        var swiper = this;
        for (var i = 0; i < swiper.slides.length; i++) {
            swiper.slides[i].style.transition = "";
        }
        },
        setTransition: function(speed) {
        var swiper = this;
        for (var i = 0; i < swiper.slides.length; i++) {
            swiper.slides[i].style.transition = speed + "ms";
            swiper.slides[i].querySelector(".slide-inner").style.transition =
            speed + "ms";
        }
        }
    }
};

var swiper = new Swiper(".swiper-flip", swiperOptions);