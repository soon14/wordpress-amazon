/*
Author: 		Randell Quitain
File name: 		component-billboard.js
Description: 	Display a personalised billboard component
Dependencies: 	jQuery
Usage: 			
*/

var guxPersonalisation = guxPersonalisation || {};

(function($){

	guxPersonalisation.billboard = {

		// each component requires an init function 
		init: function(element) {
			this.ruleEngine(element);
		},
		ruleEngine: function(element) {

			// get personalised URL
			var psnURL = guxPersonalisation.rest.getURL('psn', element);

			// get personalised data
			guxPersonalisation.rest.getData(psnURL).done(function (data) {

				// check if data is available
				if(data && data != null && !_.isEmpty(data)) {
					
					// get a much cleaner data
					var cleanData = guxApp.tools.cleanData(data);

					// render content
					guxPersonalisation.rest.renderTemplate(element, cleanData);

					if(typeof picturefill !== "undefined" ) { picturefill(); }

					// image preloader
					guxPersonalisation.rest.imageLoader(element, function() {
						// loader
						guxPersonalisation.rest.loader(element);

						// reinit billboardCarousel
						guxApp.billboardCarousel.init(element);
					});

				} else {
					element.hide();
				}
				
			}).fail(function (jqXHR, textStatus, errorThrown) {
				// console.log('Not able to fetch ' + psnURL + ' (' + errorThrown + ')');
				element.hide();
			});

		}

	}

})(jQuery);