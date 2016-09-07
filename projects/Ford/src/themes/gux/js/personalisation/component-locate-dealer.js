/*
Author: 		Randell Quitain
File name: 		component-locate-dealer.js
Description: 	Display or suppress Locate a Dealer component
Dependencies: 	jQuery
Usage: 	

* History
* 2015/12/11, Steven Xue, SMW - INC000015398018 - REQ #6689341 - Dragonfly Front end issue about dealer telephone number not display the sam, Line 248, remove .replace(/\s/g, '')		
*/

var guxPersonalisation = guxPersonalisation || {};

(function($){


	guxPersonalisation.locatedealer = {

		// each component requires an init function 
		init: function(element) {
			
			$(element).hide();
			
			var self = this,
 				// dealerLocator = guxApp.dealerLocator,
 				miniDealerContainer = element,
 				// mapController = guxApp.tools.isBingMap()?guxApp.bingMapController:guxApp.googleMapController,
				mapController = guxApp.tools.isAutoNaviMap()?guxApp.autonaviMapController:guxApp.googleMapController,
				map = mapController.map || null,
				searchField = $('.input-panel input[type=text]', miniDealerContainer);

			miniDealerContainer.hide();

			self.container = miniDealerContainer;
			self.config = mapController.config;
			self.mapContainer = $('#map-container')[0];
			self.mapController = mapController;

			self.day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][(new Date()).getDay()];

			this.ruleEngine(element);

			self.is_mobile = guxApp.viewport.view == "mobile";

			// init UI
 			$('.search-panel .btn-current', miniDealerContainer).on('click', function(e) {
 				e.preventDefault();
 				self.searchByPosition(searchField);
 			});

 			$('.search-panel', miniDealerContainer).on('submit', function(e) {
				e.preventDefault();
				// setTimeout(function(){				
				self.searchDealersByKeyword($('.keyword-field', miniDealerContainer).val(), false);
				// },3000);
				return false;
			});

			$('.btn-search', miniDealerContainer).on('click', function(e) {
				if ($(this).is('.trackable') && !e.originalEvent) return false;
			});

			searchField.on('focus', function() {
				var elem = this,
					placeholder = $(elem).attr('placeholder'),
					value = $(elem).val();
				
				if ($(elem).attr('placeholder')) {
					$(elem).data('placeholder', placeholder);
					$(elem).removeAttr('placeholder');
				}

				// if (value) {
				// 	$(elem).data('data', value);
				// 	$(elem).val('');
				// }

			});

			searchField.on('blur', function() {
				var elem = this,
					placeholder = $(elem).attr('placeholder'),
					value = $(elem).val();

				if (!value) {
					// if ($(elem).data('data')) {
					// 	$(elem).val($(elem).data('data'));
					// } else {
						$(elem).attr('placeholder', $(elem).data('placeholder'));
					// }
				}

			});

			$('.input-panel input[type=text]', miniDealerContainer).on('keyup', self.autoCompleteTrigger);

			if (guxPersonalisation.locatedealeralt) {
			    guxPersonalisation.locatedealeralt.init(self);
			}

		},
		ruleEngine: function(element) {

			var self = this,
				mapController = self.mapController;

			// loader
			guxPersonalisation.rest.loader(element);

			// if (guxPersonalisation.psn.profile.authState === "OW") {

				// element.hide();

			// } else {

				// element.hide();
				if (guxPersonalisation.psn.profile.authState === "AN") {

					// element.show();
					
					// temp
					var locationAware = false;

					// reset blocks
					// location aware initialization

					guxApp.locationAware.locationDetection(function(addressInfo, isAutoDetection){
						if(!guxApp.tools.isAutoNaviMap()&&addressInfo){
							mapController.searchDealersByLocation(addressInfo, $('.input-panel input[type=text]', self.container),{},{}, function(results, response) {

								// location not found
								if (!results) {
									self.showError( (response)?response:self.config.error_message.location_not_found);
									return false;
								}

								self.is_autoDetection = isAutoDetection;

								self.processResults(results);

							}, null, true);
							
						} else {
							element.show();
						}
					});
				}

			// }
		},

		selectMarker: function(marker, number_icon) {

			var	self = this,
				mapController = self.mapController,
				map = mapController.map;

			map.deselectMarkers();
			if(!guxApp.tools.isAutoNaviMap()) marker.select();
			map.panTo(marker.getPosition());

			if(!self.is_mobile) marker.showInfoWindow();

			$('.listing-number.active', self.container).removeClass('active');
			number_icon.addClass('active');

		},

		initMarkerIcon: function(dealer, index, number_icon, is_featured) {
			var self = this,
				container = $(self.container),
				mapController = self.mapController,
				map = mapController.map,
				marker;

			marker = map.addGuxMarker(dealer.location, index, _.template($('#infobox-template').html(), dealer), function(dealer) {
				return function() {
					self.selectMarker(marker, number_icon);
					
				}
			}(dealer));
			
			number_icon.on('click', function() {
				self.selectMarker(marker, number_icon);
			});

			return marker;

		},

		
 		processResults: function(dealers, errmessage) {

 			var self = guxPersonalisation.locatedealer,
 				container = $(self.container),
 				mapController = self.mapController,
				map = mapController.map,
				selected_marker = 0,
				map_is_open = false,
				origin = {
				    lat: self.mapController.currentLat,
				    lng: self.mapController.currentLong
				};

			var slides_container = $('.slides', container);

			if (!dealers.length) {
				self.showError(errmessage);
				$('.input-panel', self.container).removeClass('active');
				return;
			}

			var limit_dealers = dealers.slice(0,5);
			$.each(limit_dealers, function(i, dealer) {

				dealer['hours'] = mapController.getDeptSchedule(dealer);
				
				var index = i;
				
				$.extend(dealer, {
					address: mapController.makeDealerAddress(dealer, self.config.addressFormat),
					dealershipURL: mapController.makeDealerURL(dealer),
					index: index,
					is_mobile: self.is_mobile,
					is_open: mapController.is_dealerOpen(dealer, self.day),
					closeTime: mapController.getCloseTime(dealer, self.day),
					mapURL: mapController.makeMapURL(dealer.location, mapController.currentLocationCoords)
				});
				
				dealer['day_str'] = [];
				dealer['day_str_translated'] = [];
				for (var i in self.config.translation.day_str) {
					dealer['day_str'].push(i);
					dealer['day_str_translated'].push(self.config.translation.day_str[i])
				}

				// checking if url is properly formatted
				if ((dealer.PrimaryURL != "") && (dealer.PrimaryURL.indexOf("http://") != 0)) {
					dealer.PrimaryURL = "http://" + dealer.PrimaryURL;
				}

				if (!dealer['distance']) {
                	dealer['distance'] = "";
                }

				dealer['nextOpenTime'] = mapController.getNextOpenTime(dealer);
				var schedule = mapController.scheduleString(dealer, dealer.hours, self.day);
				dealer['schedule'] = schedule.description;
				dealer['scheduleType'] = schedule.type;
				dealer['phoneNumbers'] = (dealer['PrimaryPhone'] && dealer['PrimaryPhone'].length) ? dealer['PrimaryPhone'].split(';') : [];
				dealer['dealerNewVehicle'] = (dealer['DealerNewVehicle'] && dealer['DealerNewVehicle'].length) ? dealer['DealerNewVehicle'].replace(/\s/g, '').split(/[;,]/g) : [];
			});
			
			// show featured nearest
			var featured_dealer = limit_dealers[0],
				other_dealers = _.rest(limit_dealers),
				featured_dealer_elem = _.template($('#preferred-dealer-template').html(), featured_dealer),
				number_icons = [];

			var preferred = $('.preferred-dealer', container).html(featured_dealer_elem),
				featured_number_icon = $('.listing-number', preferred);
			
			$('.slides .preferred .item', container).html(_.template($('#preferred-dealer-mobile-template').html(), featured_dealer));
			featured_number_icon.addClass('active');

			var featured_marker = self.initMarkerIcon(featured_dealer, 1, featured_number_icon, true);


			// other dealers
			_.each(other_dealers, function(dealer, i) {

				var index = i + 2;

				dealer["index"] = index;

				var dealerElem = $(_.template($('#other-dealers-template').html(), dealer)),
					number_icon = $('.listing-number', dealerElem);

				slides_container.append(dealerElem);
				self.initMarkerIcon(dealer, index, number_icon);

			});
			if (_da&&_da.module&&_da.module.template){
				$("section.personalisation a[href*='intcmp='],section.smartnextsteps a[href*='intcmp=']").each(function(idx){
					var attrHref = $(this).attr("href");
					var temp = "STATUS";
					if(attrHref.indexOf(temp)!=-1){	
						$(this).attr("href",attrHref.replace(temp,_da.module.template));
					}	
				});
			}
			
			self.container.show();
			self.showLocationAwarePanel();

			$('.revealer-open', container).on('click', function(e) {

				mapController.displayMap();
				map.setCenter({ lat:featured_dealer.location.lat, lng:featured_dealer.location.lng});
				
				if (!map_is_open) {
					// map.setZoom(10);
					featured_marker.select();
					if(!self.is_mobile) featured_marker.showInfoWindow();

					map_is_open = true;
					map.setZoom(10);
					// map.setBounds(dealers, 1);
				}

				e.preventDefault();
				return false;

			});

			$('.link-search', container).on('click', function(e) {
				sessionStorage['dealers'] = JSON.stringify(dealers);
				sessionStorage['search_keyword'] = $('.input-panel').find('.keyword-field').val();
			});

			$('.input-panel', self.container).removeClass('active');

			guxApp.billboardCarousel.init();
		},

		searchByPosition: function(searchField, oncompletecallback) {
 			// event handler for search dealers from current position

 			var self = this,
 				// dealerLocator = guxApp.dealerLocator
 				container = self.container,
				mapController = self.mapController,
				map = mapController.map || null,
				errmessage = self.config.error_message.nearest_dealer_not_found,
				geoLocationTimeout = null;

			$('.error', self.container).hide();

			if ($('.input-panel', self.container).is('.active')) return false;
			$('.input-panel', self.container).addClass('active');

			if (!!navigator.geolocation) {

				navigator.geolocation.getCurrentPosition(function(position) {
										
					var lat = position.coords.latitude,
						lng = position.coords.longitude;

					clearTimeout(geoLocationTimeout);
					geoLocationTimeout = null;

					mapController.getAddressStringFromCoord({ "lat": lat, "lng": lng }, function (result, status) {
						
							searchField.val(result);
							if (oncompletecallback && $.isFunction(oncompletecallback)) {
							mapController.searchDealersByLocation(result, searchField, {},{},function (dealers, status) {
								oncompletecallback(dealers, status);
            						});	
							}
							else {
							mapController.searchDealersByLocation(result, searchField, {},{},self.processResults, self.config.error_message.location_not_found);
							}

					});


				}, function(err) {

					clearTimeout(geoLocationTimeout);
					geoLocationTimeout = null;

					if (oncompletecallback && $.isFunction(oncompletecallback)) {
					    oncompletecallback(false, err);
					}

					switch (err.code) {
						case err.PERMISSION_DENIED:
							self.showError(self.config.error_message.geolocation_error_denied);
							break;
						case err.POSITION_UNAVAILABLE:
							self.showError(self.config.error_message.geolocation_error);
							break;
						case err.TIMEOUT:
							self.showError(self.config.error_message.geolocation_error_timeout);
							break;
					}
					
					$('.input-panel', self.container).removeClass('active');

				}, { timeout: 7*1000 });


			} else {
				clearTimeout(geoLocationTimeout);
				geoLocationTimeout = null;
				// $('.search-panel .btn-current').hide();
				self.showError(self.config.error_message.geolocation_error_denied);
				$('.input-panel', self.container).removeClass('active');
			}
			
			geoLocationTimeout = setTimeout(function() {
				self.showError(self.config.error_message.geolocation_error_timeout);
				$('.input-panel', self.container).removeClass('active');	
			}, 7000);

 		},

 		searchDealersByKeyword: function(keyword, matchParams) {

			var self = this,
				mapController = self.mapController,
				map = mapController.map,
				is_postcode = /^\d/.test(keyword),
				errmessage = self.config.error_message.dealer_not_found,
				matchParams = matchParams || {},
				containsParams = {},
				origin = {
					lat: mapController.currentLat,
					lng: mapController.currentLong
				};

			self.is_autoDetection = false;
			self.filters = [];

			$('.error', self.container).hide();

			if ($('.input-panel', self.container).is('.active')) return false;
			$('.input-panel', self.container).addClass('active');

			if (keyword == "" || !keyword) {
				self.showError(self.config.error_message.blank_field);
				$('.input-panel', self.container).removeClass('active');
				return;
			}

			setTimeout(function() {
			mapController.searchDealersByKeyword(keyword, $('.input-panel input[type=text]', self.container), self.processResults, errmessage);
			},3000);

			self.loadedDealers = [];

		},

		// autoCompleteTrigger: function(e) {

		// 	var self = guxPersonalisation.locatedealer,
		// 		mapController = guxApp.googleMapController,
		// 		map = mapController.map,
		// 		searchKey = $(this).val(),
		// 		strlen = searchKey.length,
		// 		search_panel = $('.search-panel'),
		// 		location_limit = self.config.auto_suggest_limit,
		// 		user_intent_delay = null;

		// 	var keys_regex = new RegExp("^[a-zA-Z0-9]+$");
		//     var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);

		//     if (user_intent_delay) {
		//     	clearTimeout(user_intent_delay);
		//     	user_intent_delay = null;
		//     }


		// 	// enable predictive search
		// 	if (keys_regex.test(str) && !!searchKey && (/[A-Z]{2,}/.test(searchKey) || strlen >= self.config.autocomplete_char_count)) {
					

		// 		user_intent_delay = setTimeout(function() {

		//     		if ($('.input-panel', self.container).is('.active')) return false;

		// 			guxApp.googleMapController.map.autocomplete(searchKey, location_limit, function(results) {

		// 				var locations = results.locations,
		// 					dealers = _.pluck(results.dealers, "DealerName");

		// 				self.showSuggestions(_.union(dealers, locations), search_panel);

		// 			});

		// 		}, 300);

		// 	} else {
		// 		$('.dealer-disambiguation', search_panel).hide();
		// 	}

		// },

		autoCompleteTrigger: function(e) {

			var self = guxPersonalisation.locatedealer,
				mapController = self.mapController,
				map = mapController.map,
				searchKey = $(this).val(),
				strlen = searchKey.length,
				search_panel = $('.search-panel'),
				location_limit = self.config.auto_suggest_limit,
				user_intent_delay = null,
				key = !e.charCode ? e.which : e.charCode;

			var keys_regex = new RegExp("^[a-zA-Z0-9]+$");
		    var str = String.fromCharCode(key).valueOf();

		    // prevent trigger if ctrl/alt key is pressed
		    if (e.altKey || e.ctrlKey || key == 17 || key == 18) return false;


		    if (user_intent_delay) {
		    	clearTimeout(user_intent_delay);
		    	user_intent_delay = null;
		    }


		    // arrow keys
		    if (key == 38 || key == 40) {

		    	switch(key) {
		    		case 38:
		    			var direction = true;
		    			break;
		    		case 40:
		    			var direction = false;
		    			break;
		    	}

		    	if ($('.dealer-disambiguation', self.container).is(':visible')) self.selectSuggestion(this, direction);

		    	return;
		    } 

			// enable predictive search
			if (!!searchKey && (/[A-Z]{2,}/.test(searchKey) || strlen >= self.config.autocomplete_char_count)) {
				// keys_regex.test(str) &&	

				user_intent_delay = setTimeout(function() {

		    		if ($('.input-panel', self.container).is('.active')) return false;

		    		mapController.map.autocomplete(searchKey, location_limit, function (results) {

						var locations = results.locations,
							dealers = _.pluck(results.dealers, "DealerName");

						if (locations.length || dealers.length) {
							self.showSuggestions(_.union(dealers, locations), search_panel);
						}

					});

				}, 300);

			}

		},

		selectSuggestion: function(field, up) {

			var suggestion_holder = $('.search-panel .dealer-disambiguation'),
				current_selected = $('li.active', suggestion_holder),
				next = (current_selected.next().length)?current_selected.next():$('li', suggestion_holder).eq(0),
				prev = (current_selected.prev().length)?current_selected.prev():$('li', suggestion_holder).eq($('li', suggestion_holder).length-1);

			current_selected = next;

			if (up) {
				current_selected = prev
			}
			
			current_selected.addClass('active').siblings().removeClass('active');
			$(field).val($('a', current_selected).text());

		},

		showSuggestions: function(suggestions, container) {

			$('.search-panel .error').hide();

			if (suggestions.length) {

				$('.dealer-disambiguation', container).show();
				$(".dealer-disambiguation ul", container).html(_.template($("#dealer-disambiguation").html(), {suggestions:suggestions}));
				$('.dealer-disambiguation a', $(container)).on("click", function(e) {
					
					e.preventDefault();

					$(".input-panel input[type=text]", container).val($(this).text());
					$('.dealer-disambiguation', container).hide();
					$(container).trigger('submit');

				});
			} else {
				$('.dealer-disambiguation', container).hide();
			}
		},

 		showLocationAwarePanel: function() {

 			var container = $(this.container);

 			$('.dealer-unaware', container).hide();
			$('.location-aware', container).show();

 		},

 		showError: function(errorText) {
			$('.error', this.container).show().find('.text').text(errorText);
			$('.dealer-disambiguation', self.container).hide();
 		}
	};

})(jQuery);