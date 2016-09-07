/*
Author: 		Brett Chaney
File name: 		imageRevealInit.js
Description: 	Initiates the imageReveal.js plugin and adds responsiveness
Dependencies: 	jQuery and jquery.imageReveal.js
*/

var guxApp = guxApp || {};

(function($){
	guxApp.imageReveal = {

		init: function(){
			if (!$(".imageReveal").length) {return;}

			var windowWidth = $(window).width();


            var imgLoader = imagesLoaded(".imageReveal");
            
            imgLoader.on("done", function() {

                var sliderWidth = $("#page-wrapper").width(),
                    sliderHeight = $(".imageReveal img").height();

                $(".imageReveal img").hide();
                
                $(".imageReveal").each(function () {
                    var $this = $(this);
                    $this.imageReveal({
                        width: sliderWidth,
                        height: $('img', $this).height()
                    });
                })

            });

            $(window).on("resize", function() {

                var newWindowWidth = $(window).width();

                if (newWindowWidth !== windowWidth) {

                    // destroy reveal slider
                    $.removeData($('.imageReveal'));
                    $(".imageReveal").off('mousemove click touchmove mouseout');
                    $(".imageReveal-overlay, .imageReveal-background, .imageReveal-drag-bar, .imageReveal-drag").remove();
                    $(".imageReveal, .imageReveal img").css({
                        "width" : "",
                        "height" : ""
                    });
                    
                    // get new height/width values for images
                    sliderWidth = $("#page-wrapper").width();
                    sliderHeight = $(".imageReveal img").height();

                    // re-run imageReveal plugin after window resize
                    $(".imageReveal").each(function () {
                        var $this = $(this);
                        $this.imageReveal({
                            width: sliderWidth,
                            height: $('img', $this).height()
                        });
                    })
                    
                }

                windowWidth = $(window).width();
                              
            });		
		}
	};

	$(function() {
		// initiate image reveal slider module
		guxApp.imageReveal.init();
	});

})(jQuery);