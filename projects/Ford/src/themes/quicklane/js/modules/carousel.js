/*
Author: Roy Anonuevo
File name: carousel.js
Description: This file holds the carousels on pages.
             1. Go through all the elements have flexslider class names
             2. By adding 'data-carousel-smoothheight-on-mobile="true"' attribute, it will enable auto height functionality on mobile viewport
             3. By adding 'carousel-animation="your desire effects"' attribute, it will change the animation effect

            // Resetting of options
            setOpts(slider, options), use for updating a specific slider opts

            e.g:
            qlApp.carousel.setOpts(slider.data('flexslider'), {
                smoothHeight: false
            });

Dependencies: lib/jquery.flexslider.js, JQuery
*/
var qlApp = qlApp || {};

(function($){
    qlApp.carousel = {
        init: function(){
            if(!$(".flexslider").length){return;}

            var self = this;

            // cache dom
            this.$window = $(window);
            this.$sliders = $(".flexslider");

            this.$sliders.each(function(i, e){
                var slider = $(e),
                    options = {
                        animation: (slider.data('carousel-animation'))? (slider.data('carousel-animation')) : "slide",
                        animationLoop: true
                    };

                // initialize flexslider
                slider.flexslider(options);

                // bind listener
                self.$window.on('resize', self.winResize.bind(slider)).resize();
            });
        },


        winResize: function(){
            var slider = this;
            
            // Repaint "float" issue when resizing
            slider.find("li").removeClass("leftfloat").addClass("rightfloat");
            setTimeout(function(){ slider.find("li").removeClass("rightfloat").addClass("leftfloat"); }, 500);


            if(qlApp.viewport.view == "mobile"){
                qlApp.carousel.setOpts(slider.data("flexslider"), { smoothHeight: true });
            }else{
                qlApp.carousel.setOpts(slider.data("flexslider"), { smoothHeight: false });
            }
        },

        setOpts: function(slider, opts) {
            for (var opt in opts) {
                slider.vars[opt] = opts[opt];
            }
            slider.setup();            
        }        
    };

    $(function(){
        qlApp.carousel.init();
    });

})(jQuery);