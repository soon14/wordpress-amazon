/*
Author: 		Ruiwen Qin
File name: 		component-know-vehicle.js
Description: 	Display or suppress showroom component - Get to Know Your Vehicle
Dependencies: 	jQuery
Usage: 			
*/

var guxPersonalisation = guxPersonalisation || {};

(function($){


	guxPersonalisation.knowvehicle = {

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
							headingText = $(element).find('.heading h1').text(),
							subHeadingText = $(element).find('.heading h2').text();

						// put nameplate name on .heading
						$(element).find('.heading h1').text(headingText.replace('%1', data.data.modelShortName));
						$(element).find('.heading h2').text(subHeadingText.replace('%1', data.data.modelShortName));

						// reinit billboardCarousel
						guxApp.billboardCarousel.init(element);

						// reinit openModal
						guxApp.mediaOverlay.init();

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