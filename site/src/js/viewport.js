/*
Author: 		Ruiwen Qin
File name: 		viewport.js
Description: 	Find out the viewport width
Dependencies: 	jQuery 
Usage: 			Use guxApp.viewport.view for your condition. The value of guxApp.viewport is either mobile or tablet.
*/
var guxApp = guxApp || {};

(function($){
	guxApp.viewport = {
		view:'',
		init: function(){
			if ($(window).width() < 768){
				guxApp.viewport.view = "mobile";
			}
			else {
				guxApp.viewport.view = "tablet";
			}
			this.resize();
		},
		resize: function(){
			$(window).on("resize", function() {
				if ($(window).width() < 768){
					guxApp.viewport.view = "mobile";
				}
				else {
					guxApp.viewport.view = "tablet";
				}
			});
		}	
	}

	$(function(){
		guxApp.viewport.init();
	});

})(jQuery);