/*
Author: 		Randell Quitain
File name: 		component-popular-accessories.js
Description: 	Display or suppress popular accessories
Dependencies: 	jQuery
Usage: 			
*/

var guxPersonalisation = guxPersonalisation || {};

(function($){


	guxPersonalisation.accessories = {

		// each component requires an init function 
		init: function(element) {
			this.ruleEngine(element);
		},
		ruleEngine: function(element) {

			if (guxPersonalisation.psn.profile.authState === "OW") {

				// nameplate REST URL
				var nameplateURL = guxPersonalisation.rest.getURL('nameplates', element);

				// check nameplate supported
				guxPersonalisation.rest.getData(nameplateURL).done(function (data) {

					// check if data is available
					if(data && data != null && !_.isEmpty(data) && !_.isEmpty(data.data.tiles)) {

						// render content
						guxPersonalisation.rest.renderTemplate(element, data.data);

						// get now value from dfy.u cookie
						var cookieUser = $.parseJSON( $.cookie('dfy.u') ),
							headingText = $(element).find('.heading h1').text();

						// put nameplate name on .heading
						$(element).find('.heading h1').text(headingText.replace('%1', data.data.modelShortName));

						// reinit billboardCarousel
						guxApp.billboardCarousel.init(element);

						// image preloader
						guxPersonalisation.rest.imageLoader(element, function() {
							// loader
							guxPersonalisation.rest.loader(element);
						});
							
					} else {
						element.hide();
					}
					
				}).fail(function (jqXHR, textStatus, errorThrown) {
					// console.log('Not able to fetch ' + nameplateURL + ' (' + errorThrown + ')');
					element.hide();
				});

				
			} else {
				element.hide();
			}
		}

	};

})(jQuery);