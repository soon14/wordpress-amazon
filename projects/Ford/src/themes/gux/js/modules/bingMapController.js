/*
Author: 		Ray Huang
File name: 		bingMapController.js
Description: 	load bing map
Dependencies: 	jQuery
Usage: 			
*/


var guxApp = guxApp || {};

(function($) {

	guxApp.bingMapController = {
		init: function() {

			var self = this,
				APIconfig = {
					language : self.config.localisation,
					countryCode : self.config.country_code,
					imagePath : self.config.marker_image_path,
					countryBounds: self.config.country_bounds,
					autocompleteCallbackName: 'bingAutocompleteCallbackName'
				};
  			
  			self.mapAPI = new bingMapsApi(APIconfig);
			
			if ($('.dealer-locator').length) {
				self.mapContainer = $('.dealer-map-field')[0];
			} else if ($('.mini-dealer').length) {
				self.mapContainer = $('#map-container')[0];
			}

			if (!self.map && !!self.mapContainer) self.loadMap(self.mapContainer);

			

		},
		loadMap: function(mapContainer) {

			var self = this;

			// initialize map
			var map = new self.mapAPI.map(mapContainer,{
				country : self.config.country
			});
			map.addListener(map.map,"tiledownloadcomplete",function(){
				if(!self.map_loaded){
					map.setZoom(parseInt(self.config.zoom_level));
					self.map_loaded = true;
					$.publish('api-done');
				}
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

			map.searchDealersByProperties(_self.config.limit, function(response) {
				callback(response, errmessage);
			}, matchParams, containsParams);

		},

		searchDealersByLocation: function(address, searchField, callback, errmessage, isAutoDetection) {

			// method for auto detection

			var self = this,
				map = this.map,
				response = null;

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
					
					self.searchForDealers(currLocation, self.config.radius, self.config.limit, {}, {}, callback, self.config.error_message.nearest_dealer_not_found);
	
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
				search_interval = 1;
			
			_self.reiterate = null;
			_self.cleanMap();

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
                map = self.map;
			return map.getDirectionsURL(destination, origin)

			
		},

		makeDealerURL: function(dealer) {
		    
		    return guxApp.commonMapController.makeDealerURL.call(this, dealer);
		},

		makeDealerAddress: function(dealer, format) {

		    return guxApp.commonMapController.makeDealerAddress.call(this, dealer, format);

		},

		displayMap: function() {
			//google.maps.event.trigger(this.map.map, 'resize');
			this.map.map.setOptions({width:"100%",height:"100%"});
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

		capitalize: function(string) {
			if(string){
			    return guxApp.commonMapController.capitalize.call(this, string);
			}
		},

		is_dealerOpen: function(dealer, day) {

		    return guxApp.commonMapController.is_dealerOpen.call(this, dealer, day);

		},

		filterData: function(obj, filter) {

			return guxApp.commonMapController.filterData.call(this, obj, filter);

		},

		getDeptSchedule: function(obj) {

			return guxApp.commonMapController.getDeptSchedule.call(this, obj, guxApp.bingMapController);

			
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
		
		if (($('.dealer-locator').length==0 && $('.mini-dealer').length==0) || !guxApp.tools.isBingMap()) {return;}
		
		var locator_config = $('#locator-config').embeddedData(),
			mapController = guxApp.bingMapController;
		
		mapController.config = locator_config;
		mapController.map_loaded = false;

		mapController.currentLocationCoords = null;
		
		guxApp.bingMapController.init();
	});

	

})(jQuery);