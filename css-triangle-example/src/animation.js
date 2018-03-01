(function() {
    var demo, run;

    demo = $("#whole-thing");

    run = function() {
        setTimeout(function() {
            return demo.addClass("step-1");
        }, 2500);
        setTimeout(function() {
            return demo.addClass("step-2");
        }, 5000);
        setTimeout(function() {
            return demo.addClass("step-3");
        }, 5500);
        setTimeout(function() {
            return demo.addClass("step-4");
        }, 6000);
        setTimeout(function() {
            return demo.addClass("step-5");
        }, 7500);
        setTimeout(function() {
            return demo.addClass("step-6");
        }, 10000);
        setTimeout(function() {
            return demo.addClass("step-7");
        }, 12000);
        setTimeout(function() {
            return demo.addClass("step-8");
        }, 14000);
        setTimeout(function() {
            return demo.addClass("step-9");
        }, 14500);
        setTimeout(function() {
            return demo.addClass("step-10");
        }, 15000);
        return setTimeout(function() {
            return demo.addClass("step-11");
        }, 18000);
    };

    run();

    $("#re-run").on('click', function() {
        $("#whole-thing").removeClass();
        return run();
    });

}).call(this);
