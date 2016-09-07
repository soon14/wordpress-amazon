/*
Author: 		Jessie Biros
File name: 		guxLandingPage.js
Description: 	Disable accordion on large up viewport
Dependencies: 	jQuery 
*/

(function($){
	var landingPage = {
		init: function(){
			var guxLandingPage = $(".gux-landing-page");
			if (!guxLandingPage.length) {return;}
			
			landingPage.addDisable(guxLandingPage);

			var debounceResize = _.debounce(function() {
				landingPage.addDisable(guxLandingPage);
			},100);
			
			// call the window resize event
			$(window).on('resize', debounceResize);
		},

		addDisable : function(parent){
			if(guxApp.viewport.view != "mobile"){
				$('.tab-nav', parent).addClass("disable");
			} else{
				$('.tab-nav', parent).removeClass("disable");
			}
		}
	}

	$(function(){
		landingPage.init();
	});

}(jQuery))