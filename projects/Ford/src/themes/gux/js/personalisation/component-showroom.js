/*
Author: 		Ruiwen Qin
File name: 		component-showroom.js
Description: 	Display or suppress showroom component
Dependencies: 	jQuery
Usage: 			
*/

var guxPersonalisation = guxPersonalisation || {};

(function($){


	guxPersonalisation.showroom = {

		// each component requires an init function 
		init: function(element) {
			this.ruleEngine(element);
		},
		ruleEngine: function(element) {

			if (guxPersonalisation.psn.profile.authState === "OW") {
				element.hide();
			} else {
				element.show();
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