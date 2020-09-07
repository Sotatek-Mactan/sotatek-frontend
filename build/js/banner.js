var interleaveOffset = 1;

var swiperOptions = {
    loop: true,
    speed: 1000,
    autoplay: true,
    grabCursor: true,
    watchSlidesProgress: true,
    mousewheelControl: true,
    keyboardControl: true,
    flipEffect: {
        rotate: 30,
        slideShadows: false,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
    pagination: {
        el: '.swiper-pagination',
              clickable: true,
              renderBullet: function (index, className) {
            return '<span class="' + className + '">'+'<svg class="fp-arc-loader" width="27" height="27" viewBox="0 0 16 16">'+
                          '<circle class="path" cx="8" cy="8" r="5.5" fill="none" transform="rotate(-90 8 8)" stroke="#FFF"'+
                          'stroke-opacity="1" stroke-width="1px"></circle>'+
                  '<circle cx="8" cy="8" r="1.5" fill="#FFF"></circle>'+
                          '</svg></span>';
          },
  
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