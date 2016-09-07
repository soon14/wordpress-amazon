/*
Author: 		Randell Quitain
File name: 		component-dealer-message.js
Description: 	Display or suppress dealer message component
Dependencies: 	jQuery
Usage: 			
*/

var guxPersonalisation = guxPersonalisation || {};

(function($){


	guxPersonalisation.dealermessage = {

		// each component requires an init function 
		init: function(element) {
			this.ruleEngine(element);
		},
		ruleEngine: function(element) {

			if(guxPersonalisation.psn.profile.authState === "OW" && guxPersonalisation.psn.profile.dc !== "") {
				
				element.show();

				// get dealers URL
				var psnURL = guxPersonalisation.rest.getURL('dealers', element);

				// get personalised data
				guxPersonalisation.rest.getData(psnURL).done(function (data) {

					// check if data is available
					if(data && data != null && !_.isEmpty(data)) {

						// get now value from dfy.u cookie
						var cookieUser = $.parseJSON( $.cookie('dfy.u') ), destURL;

						// get destination url
						guxApp.googleMapController.getCoordsFromAddressString(cookieUser.pc, function(coor) {
							var destination = {
									'lat': data['latitudeLongitude'].latitude,
									'lng': data['latitudeLongitude'].longitude
								},
								origin = {
									'lat': coor[0].lat,
									'lng': coor[0].lng
								};

							// inject mapURL
							data.destinationURL = guxApp.googleMapController.makeMapURL(destination, origin);

							// render content
							guxPersonalisation.rest.renderTemplate(element, data);

							// put nameplate name on .heading
							$(element).find('.message p').text($(element).find('.message p').text().replace('[Name]', cookieUser.fn));
							$(element).find('.message p').text($(element).find('.message p').text().replace('[Nameplate]', cookieUser.now));

							// loader
							guxPersonalisation.rest.loader(element);
						});
					} else {
						element.hide();
					}
					
				}).fail(function (jqXHR, textStatus, errorThrown) {
					// console.log('Not able to fetch ' + psnURL + ' (' + errorThrown + ')');
					element.hide();
				});

			} else {
				element.hide();
			}

		}

	};

})(jQuery);