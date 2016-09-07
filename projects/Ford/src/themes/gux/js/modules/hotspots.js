/*
Author: Brett Chaney
File name: hotspots.js
Description: activates the hotspot associated with each slide
Dependencies: jQuery, lib/jquery.flexslider.js
*/
var guxApp = guxApp || {};

(function($){
	guxApp.hotspots = {
		init: function(){
			if (!$(".hotspots .flexslider").length) {return;}

			var slider = $(".hotspots .flexslider"),
				currSlide;

			this.activateTrigger(slider);

			slider.on("click", ".flex-active", function() {
				guxApp.hotspots.activateTrigger(slider);
			});

			$(document).on("keyup", function() {
				guxApp.hotspots.activateTrigger(slider);
			});

			slider.touchwipe({
			  	wipeLeft: function() {
			    	setTimeout(function() {
			    		guxApp.hotspots.activateTrigger(slider);
			    	},500);
			  	}, 
			  	wipeRight: function() {
			  		setTimeout(function() {
			     		guxApp.hotspots.activateTrigger(slider);
			     	},500);
			  	}
			});

		},
		getCurrentSlide: function(slider) {
			return $(".flex-control-nav li a", slider).index($(".flex-active"));
		},
		activateTrigger: function(slider) {
			currSlide = guxApp.hotspots.getCurrentSlide(slider);
			slider.parents(".hotspots").find(".hs-triggers .trigger").removeClass("active").eq(currSlide).addClass("active");
		}
	};

	$(function(){
		guxApp.hotspots.init();
	});

})(jQuery);