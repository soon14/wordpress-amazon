/*
Author: Ruiwen Qin / Randell Quitain
File name: carousel.js
Description: This file holds the carousels on pages.
			 1. Go through all the elements have flexslider class names
			 2. By adding "carousel-mobile-only" class, directionNave will not be generated, such as showcase carousel on homepage return
			 3. By adding "controls-container" class, you can specify the element as the container of controls
			 4. By adding "carousel-main" class, you can specify a main carousel to sync the closest .carousel-fader carousel
			 5. By adding "data-slide-width", to specify item width
			 	ex: data-slide-width="640"
			 6. By adding "data-slide-margin", to specify item margin
			 	ex: data-slide-margin="10"
			 7. By adding "carousel-limit" class, you can specify item min/max items per slide/breakpoint
			 	You also need to add "data-item-limit" attribute to set number of items per breakpoint
			 	ex: data-item-limit='{"small":"1", "medium":"1", "large":"1", "xlarge":"2"}'
             8. By adding "rotating" class, you can add a slideshow/auto-rotate feature to the slider
                You also need to add "data-rotate-on" attribute to set what breakpoint should the slider only auto-rotate
                // tablet - tablet and up view
                // mobile - mobile view only
                ex: data-rotate-on="tablet"

            // Resetting of options
            setOpts(slider, options), use for updating a specific slider opts

            e.g:
            guxApp.billboardCarousel.setOpts(slider.data('flexslider'), {
                minItems: gridSize,
                maxItems: gridSize
            });

Dependencies: lib/jquery.flexslider.js
*/
var guxApp = guxApp || {};

(function($){
    guxApp.billboardCarousel = {
        init: function(element){
            if (!$(".flexslider", element).length) {return;}

            var sliders = $(".flexslider", element),
                controls = "",
                isRTL = $('body').hasClass('rtl');

            sliders.each(function(i, e){

                var slider = $(e),
                    options = {
                        slideshow: (slider.hasClass("rotating")) ? guxApp.billboardCarousel.autoRotate(slider) : false,
                        animation: (slider.hasClass("carousel-fader")) ? "fade" : "slide",
                        animationLoop: (slider.hasClass("noloop")) ? false : true,
                        directionNav: (slider.hasClass("carousel-mobile-only")) ? false : true,
                        sync: (slider.hasClass("carousel-main")) ? guxApp.billboardCarousel.getSyncedCarousel(slider) : "",
                        itemWidth: guxApp.billboardCarousel.getSlideWidth(slider),
                        itemMargin: guxApp.billboardCarousel.getSlideMargin(slider),
                        minItems: (slider.hasClass("carousel-limit")) ? guxApp.billboardCarousel.getGridSize(slider) : 1,
                        maxItems: (slider.hasClass("carousel-limit")) ? guxApp.billboardCarousel.getGridSize(slider) : 0,
                        controlsContainer: "",
                        touch: (slider.hasClass("carousel-fader") || slider.hasClass('no-touch') ) ? false : true,
                        allowOneSlide: true,
                        move: (slider.hasClass("one-slide")) ? 1 : 0,
                        reverse: isRTL,
                        start: function(slider) {
                            slider.resize();
                            //Publishes flex-complete if the carousel is loaded.
                            //$.publish('flex-complete');
                            $('.smob-controls .prev-smob').click(function(){
                                if(slider.currentSlide == 0){
                                    $(this).hide();
                                } else {
                                    $(this).show();    
                                }
                            });
                        },
                        end: function(){
                            if(guxApp.viewport.view == "mobile"){
                                if(slider.hasClass("smob-hide")){
                                    $('.smob-controls .next-smob').hide();
                                }
                            }
                        }
                    };

                //change the default container of carousel controls 
                if (slider.parents(".controls-container").length > 0){
                    options.controlsContainer = slider.parents(".controls-container");
                }

                // initialize slideshow feature
                if(slider.hasClass("rotating")) {
                    options.pauseOnHover = true;
                    options.slideshowSpeed = 5000;
                }

                // initialize flexslider
                slider.flexslider(options);

                // update flexslider on resize
                $(window).on('resize', function() {

                    // change flexslider options on resize
                    if(typeof slider.data('flexslider') != 'undefined') {

                        // add slideshow feature on specific breakpoint
                        if(slider.hasClass("rotating")) {
                            var rotateOn = slider.data('rotate-on');
                            if(guxApp.viewport.view == rotateOn) {
                                guxApp.billboardCarousel.setOpts(slider.data('flexslider'), {
                                    slideshow: true
                                });
                            } else {
                                guxApp.billboardCarousel.setOpts(slider.data('flexslider'), {
                                    slideshow: false
                                });
                            }
                        }

                        // update gridSize for carousel-limit with 2 item count and up only
                        if(slider.hasClass("carousel-limit")) {
                            // update slider min/max items
                            var gridSize = guxApp.billboardCarousel.getGridSize(slider);
                            if(typeof gridSize != 'undefined') {
                                // update min/max flexslider property
                                guxApp.billboardCarousel.setOpts(slider.data('flexslider'), {
                                    minItems: gridSize,
                                    maxItems: gridSize
                                });
                            }
                        }

                    }

                });

            });

            $(document).on('scroll',function(){    
                //guxApp.billboardCarousel.flexSliderResize();
            });
            guxApp.billboardCarousel.flexSliderResize();
            isRTL ? guxApp.billboardCarousel.rtlSupport() : false;
         },
        setOpts: function(slider, opts) {
            for (var opt in opts) {
                slider.vars[opt] = opts[opt];
            }
            slider.setup();
        },
        getGridSize: function(slider) {
            if (!slider.data('item-limit') || $('.slides li', slider).length === 1) {return;}
            var itemLimit = slider.data('item-limit'),
                wWidth = $(window).width(),
                smallRange = 480,
                mediumRange = 768,
                largeRange = 991,
                smallRangeItemCount = itemLimit.small,
                mediumRangeItemCount = itemLimit.medium,
                largeRangeItemCount = itemLimit.large,
                xLargeRangeItemCount = itemLimit.xlarge;

            // check if slide item is less than carousel-limit highest breakpoint
            $('.flex-direction-nav', slider).css('visibility', '');

            if($('.slides li', slider).length <= xLargeRangeItemCount) {
                $('.flex-direction-nav', slider).css('visibility', 'hidden');
            }

            return (wWidth < smallRange) ? smallRangeItemCount : (wWidth < mediumRange) ? mediumRangeItemCount : (wWidth < largeRange) ? largeRangeItemCount : xLargeRangeItemCount;
        },
        getSlideWidth: function(slider) {
            if (!slider.data('slide-width')) {return 0;}
            return slider.data('slide-width');
        }, 
        getSlideMargin: function(slider) {
            if (!slider.data('slide-margin')) {return 0;}
            return slider.data('slide-margin');
        },
        getSyncedCarousel: function(slider) {
            return slider.parent().find('.carousel-fader');
        },
        autoRotate: function(slider) {
            if (!slider.data('rotate-on') || $('.slides li', slider).length === 1) {return false;}
            var rotateOn = slider.data('rotate-on');
            if(guxApp.viewport.view == rotateOn) {
                return true;
            } else {
                return false;
            }
        },
        flexSliderResize: function(){
            if (!$(".flexslider").length) {return;}
            $(window).trigger('resize');
            
        },

        setToFirstSlide: function(){
            var container = $('.flexslider');
            if (!container.length) {return;}

            $('.flex-control-nav li',container).each(function(i,e){
                var slide = $(e);
                slide.first().find('a').triggerHandler('click');
            });

        },

        rtlSupport: function(){
            var flexslider = $(".flexslider")
            flexslider.each(function(){
                var list = $(this).find(".flex-control-nav"),
                listItems = list.children('li');
                list.append(listItems.get().reverse());
            });
        }
    };

    $(function(){
        guxApp.billboardCarousel.init();
    });

})(jQuery);