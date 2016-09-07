/*
Author: 		Ruiwen Qin
File name: 		viewport.js
Description: 	Find out the viewport width
Dependencies: 	jQuery 
Usage: 			Use qlApp.viewport.view for your condition. The value of qlApp.viewport is either mobile or tablet.
*/
var qlApp = qlApp || {};

(function($){
	qlApp.viewport = {
		view:'',
		init: function(){
			if ($(window).width() < 768){
				qlApp.viewport.view = "mobile";
			}
			else {
				qlApp.viewport.view = "tablet";
			}
			this.resize();
		},
		resize: function(){
			$(window).on("resize", function() {
				if ($(window).width() < 768){
					qlApp.viewport.view = "mobile";
				}
				else {
					qlApp.viewport.view = "tablet";
				}
			});
		}	
	}

	$(function(){
		qlApp.viewport.init();
	});

})(jQuery);