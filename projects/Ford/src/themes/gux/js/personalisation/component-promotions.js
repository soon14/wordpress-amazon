/*
Author: 		Ruiwen Qin
File name: 		component-promotions.js
Description: 	Display or suppress promotions component
Dependencies: 	jQuery
Usage: 			
*/

var guxPersonalisation = guxPersonalisation || {};

(function($){


	guxPersonalisation.promotions = {

		// each component requires an init function 
		init: function(element) {
			this.ruleEngine(element);
		},
		ruleEngine: function(element) {

			if (guxPersonalisation.psn.profile.authState === "OW") {
				element.hide();
			} else {
				element.show();
				// reinit billboardCarousel
				guxApp.billboardCarousel.init(element);
				if(typeof picturefill !== "undefined" ) { picturefill(); }
				// image preloader
				guxPersonalisation.rest.imageLoader(element, function() {
					// loader
					guxPersonalisation.rest.loader(element);
				});
			}
		}

	};

})(jQuery);