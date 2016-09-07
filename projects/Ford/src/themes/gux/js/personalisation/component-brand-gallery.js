/*
Author: 		Randell Quitain
File name: 		component-brand-gallery.js
Description: 	Display or suppress brand gallery component
Dependencies: 	jQuery
Usage: 			
*/

var guxPersonalisation = guxPersonalisation || {};

(function($){


	guxPersonalisation.brandgallery = {

		// each component requires an init function 
		init: function(element) {
			this.ruleEngine(element);
		},
		ruleEngine: function(element) {

			// loader
			guxPersonalisation.rest.loader(element);
			
			if (guxPersonalisation.psn.profile.authState === "OW") {
				element.hide();
			} else {
				element.show();
			}
		}

	};

})(jQuery);