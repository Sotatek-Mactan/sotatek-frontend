$(document).ready(function () {
    // var swiperBanner = new Swiper('.sota-banner', {
    //     pagination: {
    //         el: '.swiper-pagination',
    //         clickable: true,
    //     },
    // });
    
   
    
    
    var swiperWork = new Swiper('.swiper-work', {
        slidesPerView: 3,
        spaceBetween: 10,
        pagination: {
            el: '.pagination-work',
            clickable: true,
        },
        navigation: {
            nextEl: '.work-next',
            prevEl: '.work-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
        }
    });
    
    var swiperOurWork = new Swiper('.swiper-our-work', {
        slidesPerView: 2,
        spaceBetween: 100,
        pagination: {
            el: '.pagination-work',
            clickable: true,
        },
        navigation: {
            nextEl: '.work-next',
            prevEl: '.work-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 100,
            },
        }
    });
    var swiperAboutus = new Swiper('.swiper-aboutus', {
        slidesPerView: 2,
        spaceBetween: 10,
        pagination: {
            el: '.pagination-aboutus',
            clickable: true,
        },
        breakpoints: {
            480: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
        }
    });
    var swiperClient = new Swiper('.swiper-client', {
        slidesPerView: 2,
        slidesPerColumn: 2,
        spaceBetween: 0,
        slidesPerGroup: 2,
        pagination: {
            el: '.pagination-client',
            clickable: true,
        },
    });

    var swiperWebDevelopment = new Swiper('.swiper-web-development', {
        slidesPerView: 1,
        spaceBetween: 10,
        pagination: {
            el: '.pagination-web-development',
            clickable: true,
        },
        breakpoints: {
            480: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
        }
    });
    
    $(function() {
        $('a[data-modal]').on('click', function() {
        $($(this).data('modal')).modal();
        return false;
        });
    });

    // AOS
    AOS.init();
});