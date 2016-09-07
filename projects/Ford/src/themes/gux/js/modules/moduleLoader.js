/*
Author: Ruiwen Qin
File name: moduleLoader.js
Description: 1. Go through .module-loader elements on the page.
			 2. Wait until images are loaded, then remove the loading circle
Dependencies: jQuery, tools.js
*/
var guxApp = guxApp || {};

(function($){
	guxApp.moduleLoader = {
		init: function(){
			if (!$(".module-loader").length) {return;}

			var modules = $(".module-loader");

			modules.each(function(){
				var module = $(this);

				guxApp.moduleLoader.imageLoader(module, function(){
					guxApp.moduleLoader.loader(module);
				});
			});

			//Trigger Resize when Carousel is visible. IE8 Fix for lazy loading and carousel conflict.
			$.subscribe('flex-complete',function(){
				guxApp.billboardCarousel.flexSliderResize();
				guxApp.billboardCarousel.setToFirstSlide();
			});

		},
		imageLoader: function(element, callback) {
			var imgLoad = imagesLoaded( element );
			imgLoad.on( 'always', function( instance ) {
				// show carousel nav
				if(guxApp.viewport.view !== "mobile" && $('.flex-direction-nav', element).length > 0) { $('.flex-direction-nav', element).show(); }
				if(typeof callback === "function") { callback(); }
			});
		},
		loader: function(element) {
			element.children().unwrap();
		}
	};

	$(function(){
		guxApp.moduleLoader.init();
	});

})(jQuery);