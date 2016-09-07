/*
Author: 		Randell Quitain
File name: 		personalisation-rest.js
Description: 	Build 'personalised' URL
Dependencies: 	jQuery, jquery.cookie.js, underscore.js
Usage: 			getURL(source of rest, current component element)				- used to build the personalised URL for psn, nameplates, rvv and fps
				getData(personalised url) 										- used for collecting the data using the personalised URL
				cleanData(data) 												- reorganize the data
				getObjectLength(object) 										- get object length
				getEmbeddedData(current component element, x-json id)			- read JSON data using the "embeddedData" module specific to a component module
				urlPersonalisation(profile session/cookie)						- for building actual the personalisation rest parameters
				renderTemplate(current component element, data from getData())	- rendering templates of components
				loader(element)													- check if component is ready then show it if its done
				imageLoader(element, callback)									- check if images are done loaded
*/

var guxPersonalisation = guxPersonalisation || {};

(function($){
	guxPersonalisation.rest = {

		getURL: function(source, element) {

			var dfyp = guxPersonalisation.psn.profile,
				dfyu = ($.cookie('dfy.u')) ? $.parseJSON( $.cookie('dfy.u') ) : null,
				assetType = $(element).data('psn-type'),
				contentId = $(element).data('psn-id'),
				configInfo = guxApp.tools.commonConfigData(),
				restInfo = guxApp.tools.restServicesData(),
				ownedVehicle = (dfyu != null) ? dfyu.now : null,
				site = (configInfo != null && configInfo.site) ? configInfo.site : null,
				priceZone = (configInfo != null && configInfo.priceZone) ? configInfo.priceZone : null,
				brand = (configInfo != null && configInfo.brand) ? configInfo.brand : null,
				countryCode = (configInfo != null && configInfo.countryCode) ? configInfo.countryCode : null,
				serviceURL;

			// for billboard component data
			if(source === 'psn') {
				serviceURL = restInfo ? restInfo.psn : null;
				if(serviceURL !== null && site !== null && assetType && contentId) {
					serviceURL = serviceURL.replace('{site}', guxApp.tools.encode(site));
					serviceURL = serviceURL.replace('{assettype}', guxApp.tools.encode(assetType));
					serviceURL = serviceURL.replace('{contentid}', guxApp.tools.encode(contentId)) + '?profile=' + this.urlPersonalisation(dfyp);
				}
			}
			// for getting rvv data
			else if(source === 'rvv') {
				serviceURL = restInfo ? restInfo.rvv : null;
				if(serviceURL !== null && site !== null && priceZone) {
					serviceURL = serviceURL.replace('{site}', guxApp.tools.encode(site));
					serviceURL = serviceURL.replace('{priceZone}', guxApp.tools.encode(priceZone));	
				}
			}
			// for getting to know your vehicle & popular accessories data
			else if(source === 'nameplates') {
				serviceURL = restInfo ? restInfo.nameplates : null;
				if(serviceURL !== null && ownedVehicle !== null && ownedVehicle !== "" && $(element).data('psn-module') && site !== null) {
					serviceURL = serviceURL.replace('{nameplate}', guxApp.tools.encode(ownedVehicle));
					serviceURL = serviceURL.replace('{type}', ($(element).data('psn-module') === 'accessories') ? guxApp.tools.encode('accessories') : guxApp.tools.encode('know-your-vehicle'));
					serviceURL = serviceURL.replace('{site}', guxApp.tools.encode(site));
				}
			}
			// for dealers via code data
			else if(source === 'dealers') {
				serviceURL = restInfo ? restInfo["dealer.code"] : null;
				if(serviceURL !== null && dfyp.dc !== "") {
					serviceURL = serviceURL.replace('{site}', guxApp.tools.encode(site));
					serviceURL = serviceURL.replace('{code}', guxApp.tools.encode(dfyp.dc));
				}
				
			}
			// using fps
			else if(source === 'fps') {
				serviceURL = restInfo ? restInfo.fps : null;
				if(serviceURL !== null && brand !== null && countryCode !== null) {
					serviceURL = serviceURL.replace('{brand}', guxApp.tools.encode(brand));
					serviceURL = serviceURL.replace('{countryCode}', guxApp.tools.encode(countryCode));
				}
			}
			
			return serviceURL;

		},
		getData: function(url) {
			return $.ajax({
				url: url,
				type: 'GET',
				dataType: 'json'
			})
		},
		urlPersonalisation: function(session) {
			var psnJSON = {};
			// check if profile item available, if exist add them to JSON, encoded
			_.each(session, function (value, i) {
				(session['authState'] && session['authState'] != '') ? psnJSON['authState'] = guxApp.tools.encode(session['authState']) : null;
				(session['now'] && session['now'] != '') ? psnJSON['now'] = guxApp.tools.encode(session['now']) : psnJSON['now'] = "";
				(session['noi'] && session['noi'] != '') ? psnJSON['noi'] = guxApp.tools.encode(session['noi']) : null;
				/*(session['tools'] && session['tools'] != '') ? psnJSON['tools'] = guxApp.tools.encode(session['tools']) : null;
				(session['kba'] && session['kba'] != '') ? psnJSON['kba'] = guxApp.tools.encode(session['kba']) : null;*/
			});
			return JSON.stringify(psnJSON).replace(/\s/g, '%20');
		},
		renderTemplate: function(element, data) {
			var module = element.data('psn-module'),
				markup = $('#' + module + '-template', element).html();
			// build template - on a specific container
			// $(element).html(_.template(markup, {data:data}));
			element.find('.' + module + '-template').html(_.template(markup, {data:data}));
		},
		loader: function(element) {
			element.children('.loading').remove();
			element.children('.psn-loader').removeClass('psn-loader');
		},
		imageLoader: function(element, callback) {
			var imgLoad = imagesLoaded( element );
			imgLoad.on( 'always', function( instance ) {
				// show carousel nav
				if(guxApp.viewport.view !== "mobile" && $('.flex-direction-nav', element).length > 0) { $('.flex-direction-nav', element).show(); }
				if(typeof callback === "function") { callback(); }
			});
		}

	};

})(jQuery);