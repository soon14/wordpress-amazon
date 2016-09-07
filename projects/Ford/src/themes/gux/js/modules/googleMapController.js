/*
Author: 		Jay Gauten
File name: 		googleMapController.js
Description: 	load google map
Dependencies: 	jQuery 
Usage: 			
*/


var guxApp = guxApp || {};

(function($) {

	guxApp.googleMapController = {
		init: function() {

			var self = this,
				APIconfig = {
					language : self.config.localisation,
					countryCode : self.config.country_code,
					countryCodes : self.config.country_code,
					imagePath : self.config.marker_image_path,
					countryBounds: self.config.country_bounds,
					autocompleteCallbackName: "googleAutocompleteCallbackName",
					dealerTableURL: self.config.dealer_table
				};
  			
  			self.mapAPI = new googleMapsApi(APIconfig);
			
			if ($('.dealer-locator').length) {
				self.mapContainer = $('.dealer-map-field')[0];
			} else if ($('.mini-dealer').length) {
				self.mapContainer = $('#map-container')[0];
			}

			if (!self.map && !!self.mapContainer) self.loadMap(self.mapContainer);

			$.publish('api-done');

		},
		loadMap: function(mapContainer) {

			var self = this;

			// initialize map
			var map = new self.mapAPI.map(mapContainer, {
				center: {
					lat: self.config.currentLat,
					lng: self.config.currentLong
				},
				scrollwheel: false,
				mapTypeControl: true,
			    mapTypeControlOptions: {
			        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
			        position: google.maps.ControlPosition.RIGHT_BOTTOM
			    },
			    panControl: true,
			    panControlOptions: {
			        position: google.maps.ControlPosition.TOP_RIGHT
			    },
			    zoomControl: true,
			    zoomControlOptions: {
			        position: google.maps.ControlPosition.RIGHT_TOP
			    },
			    scaleControl: true, 
			    streetViewControl: false,
				supressInfoWindows: true,
				zoom: parseInt(self.config.zoom_level)
			});

			self.map = map;
			
			if ($('.map-default', $('.dealer-locator')).length) $('.map-default', $('.dealer-locator')).remove();

			$.publish('map-api-done');

		},

		getCoordsFromAddressString: function(address, callback) {
			this.map.geocodeLocation(address, callback);
		},

		getAddressStringFromCoord: function(coords, callback) {
			this.map.reverseGeocode(coords, callback);
		},

		searchDealersByKeyword: function(keyword, container, callback, errmessage) {

		    guxApp.commonMapController.searchDealersByKeyword.call(this, keyword, container, callback, errmessage);

		},

		searchDealersByProperties: function(matchParams, containsParams, callback, errmessage) {

			var _self = this,
				map = _self.map,
				matchParams = matchParams || {},
				containsParams = containsParams || null;

			_self.cleanMap();
			_self.currentLocationCoords = null;
			
			if(_self.config.langFilter){
				matchParams.Language = _self.config.langFilter;
			}
			// add brand filter
			if(_self.config.brandFilter){
				matchParams.Brand = _self.config.brandFilter;
			}
			// add country filter
			if(_self.config.countryCodeFilter){
				// matchParams.CountryCode = _self.config.countryCodeFilter;
			}
			
			map.searchDealersByProperties(_self.config.limit, function(response) {
				callback(response, errmessage);
			}, matchParams, containsParams);

		},

		searchDealersByLocation: function(address, searchField, matchParams, containParams, callback, errmessage, isAutoDetection) {

			// method for auto detection

			var self = this,
				map = this.map,
				response = null,
				matchParams = matchParams || {},
				containParams = containParams || null;

			self.currentLocationCoords = null;

			var search = function(address) {
				map.geocodeLocation(address, function(locations) {

					// locations = _.filter(locations, function(location) { return !_.contains(location.types, "country"); });
					
					var currLocation = locations[0];

					if (!currLocation) {
						callback(false, errmessage);
						return false;
					} else if (_.contains(currLocation.types, 'country') && currLocation.description.toLowerCase() != address.toLowerCase()) {
						callback(false, self.config.error_message.location_not_found);
						return false;
					}
					
					if(isAutoDetection){
						//auto detection will prefill search input box
						searchField.val(currLocation.description);
					}
					
					self.currentLocationCoords = {
						lat: currLocation.lat,
						lng: currLocation.lng
					}
					
					self.searchForDealers(currLocation, self.config.radius, self.config.limit, matchParams, containParams, callback, self.config.error_message.nearest_dealer_not_found);
	
				});
			}
			
			//search by lat/lng
			if(typeof address == "object"){
				//conver lat/lng to address first.
				map.reverseGeocode(address,function(location){
					//restore coverted address
					search(location.address);
				});
			}else{//search by address
				search(address);
			}
		},

		searchForDealers: function(origin, radius, resultLimit, matchParams, containParams, callback, errormessage) {

			var _self = this,
				map = _self.map,
				distance_interval = 50,
				search_interval = 1,
				matchParams = matchParams || {},
				containParams = containParams || null;
			
			_self.reiterate = null;
			_self.cleanMap();
			
			if(_self.config.langFilter){
				matchParams.Language = _self.config.langFilter;
			}
			// add brand filter
			if(_self.config.brandFilter){
				matchParams.Brand = _self.config.brandFilter;
			}
			// add country filter
			if(_self.config.countryCodeFilter){
				// matchParams.CountryCode = _self.config.countryCodeFilter;
			}

			map.searchDealersByDistance(origin, radius, resultLimit, function(results) {

				if (results.length) {
					
					callback(results);

				} else {

					// iterate search until distance limit is reached
					if (radius <= _self.config.max_radius) {
						// notify user
						_self.reiterate = setTimeout(function() {
							_self.searchForDealers(origin, radius+distance_interval, resultLimit, matchParams, containParams, callback, errormessage);
						}, search_interval*1000);

					} else {
						// show error
						callback(false, errormessage);
					}

				}

			}, matchParams, containParams);

		},

		makeMapURL: function(destination, origin) {
			
			var self = this,
				map = this.map;
			return map.getDirectionsURL(destination, origin);

		},

		makeDealerURL: function(dealer) {

		    return guxApp.commonMapController.makeDealerURL.call(this, dealer);

		},

		makeDealerAddress: function(dealer, format) {

		    return guxApp.commonMapController.makeDealerAddress.call(this, dealer, format);

		},

		displayMap: function() {
			google.maps.event.trigger(this.map.map, 'resize');
		},

		cleanMap: function() {

			var map = this.map;

			map.deselectMarkers();
			map.clearMarkers(map.markers);
			map.clearRoutes();
			map.clearDealers();

		},

		open_dept: function(dept_hours) {
			
		    return guxApp.commonMapController.open_dept.call(this, dept_hours);

		},

		capitalize: function (string) {

		    return guxApp.commonMapController.capitalize.call(this, string);

		},

		is_dealerOpen: function (dealer, day) {

		    return guxApp.commonMapController.is_dealerOpen.call(this, dealer, day);

		},

		filterData: function(obj, filter) {
			
		    return guxApp.commonMapController.filterData.call(this, obj, filter);

		},

		getDeptSchedule: function(obj) {

		    return guxApp.commonMapController.getDeptSchedule.call(this, obj, guxApp.googleMapController);

		},

		strTotime: function(timeStr, return_time_obj) {

		    return guxApp.commonMapController.strTotime.call(this, timeStr, return_time_obj);

		},

		getCloseTime: function(dealer, day) {
			
		    return guxApp.commonMapController.getCloseTime.call(this, dealer, day);

		},

		getNextOpenTime: function(dealer) {

		    return guxApp.commonMapController.getNextOpenTime.call(this, dealer);

		},

		scheduleString: function(dealer, hours, day) {

		    return guxApp.commonMapController.scheduleString.call(this, dealer, hours, day);

		}

	};

	$(function() {
		
		// if (($('.dealer-locator').length==0 && $('.mini-dealer').length==0) || guxApp.tools.isBingMap() || guxApp.tools.isAutoNaviMap()) {return;}
		if (($('.dealer-locator').length==0 && $('.mini-dealer').length==0) || guxApp.tools.isAutoNaviMap()) {return;}
		
		var locator_config = $('#locator-config').embeddedData(),
			common_config = $("#common-config").embeddedData(),
			mapController = guxApp.googleMapController;
		
		mapController.config = locator_config;
		if (common_config.multiLanguage == true && common_config.language){
			mapController.config.langFilter = common_config.language;
		}
		// add brand filter
		mapController.config.brandFilter = common_config.brand?common_config.brand:"Ford";
		// add country filter
		mapController.config.countryCodeFilter = common_config.iso2country;

		mapController.map_loaded = false;

		mapController.currentLocationCoords = null;

		// load google map api
		var script = document.createElement('script');
  		script.type = 'text/javascript';


  		var clientMode = (!common_config.apiClient) ? 'client_id' : common_config.apiClient;

  		script.src = 'https://maps.googleapis.com/maps/api/js?' + clientMode + '=gme-fordmotorcompany2&libraries=places&language=' + locator_config.localisation + '&callback=guxApp.googleMapController.init';
  		document.body.appendChild(script);

  		// for modern browsers
  		script.onerror = function(a,b,c,d) {
  			var google = google || undefined;
  			$('.error', $('.dealer-locator, .mini-dealer')).show().find('.text').text(locator_config.error_message.map_not_loaded);
  			return;
  		}

  		// for ie8
  		script.onreadystatechange = function(a,b,c,d) {
  			// this.readyState, 
  			if (this.readyState == "loaded") {
  				if (!window.google) {
  					$('.error', $('.dealer-locator, .mini-dealer')).show().find('.text').text(locator_config.error_message.map_not_loaded);
  					return;
  				}
  			}
  		}


	});

	

})(jQuery);