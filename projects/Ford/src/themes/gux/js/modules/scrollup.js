/*
Author: 		Brett Chaney
File name: 		scrollup.js
Description: 	Back to top button
Dependencies: 	jQuery
*/
var guxApp = guxApp || {};

(function($){
	guxApp.scrollup = {
		init: function(){
			$("#page-wrapper").append('<div class="back-top"><a><span></span></a></div>');
			$(".back-top").click(function(){
		        $("html, body").animate({ scrollTop: 0 }, 300);
			    return false;
			});

			var currentScroll = $(window).scrollTop();

			var scrolltime = false;

			$(window).scroll(function(e){
			    var newScroll = $(window).scrollTop();

			    if (newScroll > currentScroll) {
			    	guxApp.scrollup.scrolledUp = false;
			    } else if (newScroll < currentScroll) {
			    	guxApp.scrollup.scrolledUp = true;
			    } else if (newScroll === currentScroll) {
			    	guxApp.scrollup.scrolledUp = null;
			    }

			    guxApp.scrollup.userScrolled();
			    currentScroll = newScroll;

			    if (scrolltime) {
			      clearTimeout(scrolltime);
			   	}
   				scrolltime = setTimeout(guxApp.scrollup.afterScroll, 2500);

			});
		},
		afterScroll: function() {
			var scrollPos = $(window).scrollTop();

			if (scrollPos >= 480) {
				guxApp.scrollup.hideButton();
			}
		},
		userScrolled: function(){
			var scrollPos = $(window).scrollTop();
			
			if (scrollPos >= 480 && guxApp.scrollup.scrolledUp) {
				guxApp.scrollup.showButton();
			} else if (scrollPos <= 480 || guxApp.scrollup.scrolledUp === false) {
				guxApp.scrollup.hideButton();
			}
		},
		showButton: function(){
			if (Modernizr.csstransitions) {
				$(".back-top a").addClass("btn-visible");
			} else {
				$(".back-top a").clearQueue().animate({
					right: 0,
					opacity: 1
				},200);
			}
		},
		hideButton: function(){
			if (Modernizr.csstransitions) {
				$(".back-top a").removeClass("btn-visible");
			} else {
				$(".back-top a").clearQueue().animate({
					right: -60,
					opacity: 0
				},200);
			}
		}
	};

	$(function(){
		guxApp.scrollup.init();
	});

})(jQuery);