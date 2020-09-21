(function ($) {
    "use strict";
    $.ui = {};

    $.ui.scrollUp = new function () {
        this.init = function () {
            $(window).scroll(function () {
                if ($(this).scrollTop() > 100) {
                    $('.scrollup').fadeIn();
                } else {
                    $('.scrollup').fadeOut();
                }
            });

            $('.scrollup').click(function () {
                $("html, body").animate({
                    scrollTop: 0
                }, 600);
                return false;
            });
        }
    };

    // Init func
    $.ui.demo = new function() {
        this.init = function() {
            
        }
    };

    $(window).resize(function () {
    });

    // On ready
    $(document).ready(function () {

    });

    // On ready stage change
    document.onreadystatechange = function(){

    }
})(jQuery);
