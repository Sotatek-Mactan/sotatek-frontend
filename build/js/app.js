(function($, app) {

    var generalCls = function() {

        this.run = function() {
            this.init();
            this.bindEvents();
        };

        this.init = function() {

        };

        this.bindEvents = function() {
            initFuncStatic();
        };

        this.resize = function() {

        };



        var initFuncStatic = function() {
            alert("Main")
        };

    };


    $(document).ready(function() {
        var sotaObj = new generalCls();
        sotaObj.run();
        // On resize
        $(window).resize(function() {
            sotaObj.resize();
        });
    });
}(jQuery, $.app));
