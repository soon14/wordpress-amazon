/*
	Ford Global UX - Bing Maps API v0.4.0
*/
function bingMapsApi(config) {

	var language = config.language,
		countryCode = config.countryCode,
		imagePath = config.imagePath,
		countryBounds = config.countryBounds,
		autocompleteServiceURL = config.autocompleteCallbackURL,
		autocompleteCallback = config.autocompleteCallbackName,
		bingKey = config.apiKey || 'AnuTcDasTM1wJ2gyYY9dW4yzzhSMCX0Wtrz0h3-MANQzUsfmmzzdJPslkmpa-Zb-',
		//dealerTableURL = config.dealerTableURL || 'https://spatial.virtualearth.net/REST/v1/data/083a3a2eb7ff4722842e2be97fab38cd/FordGlobalDealers_DEV/Dealer',
		//dealerTableURL = 'https://spatial.virtualearth.net/REST/v1/data/9b373f968cb742a5a425b37f77f15c9e/FordChinaDealers_GFOOTRIN/Dealer',
		dealerTableURL = 'https://spatial.virtualearth.net/REST/v1/data/e53e20e5293f4a608c584fee49b3080b/ChinaDL/Dealer'
		autocompleteDealerList = [],
		markerLatlngs = {},	
		markerImages = config.markerImages || {},
		markerImagesAttribute = config.markerImagesAttribute;

	if(autocompleteServiceURL) {
		jsonpRequest(autocompleteServiceURL);
	}

	window[autocompleteCallback] = function(dealers) {
		autocompleteDealerList = dealers;
	};

	function bingMap(element, options) {
		var self = this;

		this.map = new Microsoft.Maps.Map(element, {credentials: bingKey});

		if(!options.enableZoom) {
			this.map.setOptions({disableZooming: true});
		}

		this.map.setMapType(Microsoft.Maps.MapTypeId.road);

		if(options.country) {

			jsonpRequest('https://dev.virtualearth.net/REST/v1/Locations?' + 
				'query=' + options.country + 
				'&culture=' + language +
				'&output=json' +
				'&jsonp=processCountryCoordinates' +
				'&key=' + bingKey);

			window.processCountryCoordinates = function(data) {
				var bounds = data.resourceSets[0].resources[0].bbox;

				self.setBounds([
				{
					lat: bounds[0],
					lng: bounds[1]
				},
				{
					lat: bounds[2],
					lng: bounds[3]
				}]);
			};
		} else {
			if(countryBounds) {
				var boundsArray = [],
					boundsRect;
				for(var i = 0; i < countryBounds.length; i++) {
					boundsArray.push(new Microsoft.Maps.Location(countryBounds[i].lat, countryBounds[i].lng));
				}
				boundsRect = new Microsoft.Maps.LocationRect.fromLocations(boundsArray);
				this.map.setView({
					bounds: boundsRect
				});
			}
		}

		this.markers = [];
		this.autocompleteTimeout = null;

		Microsoft.Maps.loadModule('Microsoft.Maps.Directions', { 
			callback: function() {
				self.directionsManager = new Microsoft.Maps.Directions.DirectionsManager(self.map);
			}
		});
		Microsoft.Maps.loadModule('Microsoft.Maps.Search', {
			callback: function() {
				self.searchManager = new Microsoft.Maps.Search.SearchManager(self.map);
			}
		});
	}

	bingMap.prototype.setCenter = function(latlng) {
		var lng,
			center;
		
		lng = Microsoft.Maps.Location.normalizeLongitude(latlng.lng);

		center = new Microsoft.Maps.Location(latlng.lat, lng);

		this.map.setView({
			center: center
		});
	};

	bingMap.prototype.getCenter = function() {
		var center = this.map.getCenter();
		return {
			lat: parseFloat(center.latitude.toPrecision(5)),
			lng: parseFloat(center.longitude.toPrecision(5))
		};
	};

	bingMap.prototype.panTo = function(latlng) {
		var lng,
			center;
		
		lng = Microsoft.Maps.Location.normalizeLongitude(latlng.lng);

		center = new Microsoft.Maps.Location(latlng.lat, lng);

		this.map.setView({
			animate: true,
			center: center
		});
	};

	bingMap.prototype.setZoom = function(zoomLevel) {
		this.map.setView({
			zoom: zoomLevel
		});
	};

	bingMap.prototype.getZoom = function() {
		return this.map.getTargetZoom();
	};

	bingMap.prototype.setBounds = function(points) {
		var locations = [],
			locationRect;

		for(var i = 0; i < points.length; i++) {
			if(points[i].lat && points[i].lng) { // For normal latlng objects
				locations.push(new Microsoft.Maps.Location(points[i].lat, points[i].lng));
			} else {
				if(points[i].location && points[i].location.lat && points[i].location.lng) { // For dealer object
					locations.push(new Microsoft.Maps.Location(points[i].location.lat, points[i].location.lng));
				}
			}
		}
		if(locations.length > 1) {
			locationRect = Microsoft.Maps.LocationRect.fromLocations(locations);
			this.map.setView({
				bounds: locationRect
			});
		} else {
			if(locations.length === 1) {
				locationRect = Microsoft.Maps.LocationRect.fromLocations(locations);
				this.map.setView({
					center: locations[0],
					zoom: 12
				});
			}
		}
	};

	bingMap.prototype.getBounds = function() {
		var bounds = this.map.getBounds();

		return {
			ne: {
				lat: bounds.center.latitude + bounds.height/2,
				lng: bounds.center.longitude + bounds.width/2
			},
			sw: {
				lat: bounds.center.latitude - bounds.height/2,
				lng: bounds.center.longitude - bounds.width/2
			}
		};
	};

	bingMap.prototype.geocodeLocation = function(location, callback) {
		var baseUrl = 'http://dev.virtualearth.net/REST/v1/Locations/',
			locations = [];

		window.processLocationPredictions = function(data) {
			if(data.statusCode === 200) {
				for (var i = 0; i < data.resourceSets[0].resources.length; i++) {
					locations.push({
						lat: data.resourceSets[0].resources[i].point.coordinates[0],
						lng: data.resourceSets[0].resources[i].point.coordinates[1],
						description: data.resourceSets[0].resources[i].name
					});
				}
			}
			callback(locations);
		};

		jsonpRequest(baseUrl + location + ',' + countryCode + '?key=' + bingKey + '&c=' + language + '&jsonp=processLocationPredictions');
	};

	bingMap.prototype.reverseGeocode = function(latlng, callback) {
		var baseUrl = 'http://dev.virtualearth.net/REST/v1/Locations/';

		window.processReverseGeocode = function(data) {
			if(data.statusCode === 200 && data.resourceSets[0].resources[0]) {
				callback(data.resourceSets[0].resources[0].name);
			}
		};

		jsonpRequest(baseUrl + latlng.lat + ',' + latlng.lng + '?key=' + bingKey + '&c=' + language + '&jsonp=processReverseGeocode');
	};

	bingMap.prototype.addMarker = function(latlng) {
		var markerOptions = {},
			location,
			pushpin;

		location = new Microsoft.Maps.Location(latlng.lat, latlng.lng);
		pushpin = new Microsoft.Maps.Pushpin(location);

		this.map.entities.push(pushpin);
		return pushpin;
	};

	bingMap.prototype.addGuxMarker = function(latlng, label, infoWindowContent, callback, images) {
		var location,
			pushpin,
			labelHTML,
			pinInfobox,
			inactiveImage = images && images.inactive ? images.inactive : 'map-marker.png',
			activeImage = images && images.active ? images.active : 'map-marker-active.png';

		location = new Microsoft.Maps.Location(latlng.lat, latlng.lng);
		labelHTML = label ? '<span class="marker-label">' + label + '</span>' : '';
		pushpin = new Microsoft.Maps.Pushpin(location, {
			height: 46,
			width: 35,
			htmlContent: '<div class="map-marker"><img src="' +  imagePath + inactiveImage +'" />' + labelHTML + '</div>'
		});
		pushpin.inactiveImage = inactiveImage;
		pushpin.activeImage = activeImage;

		pushpin.select = function() {
			this.setOptions({
				htmlContent: '<div class="map-marker"><img src="' +  imagePath + this.activeImage + '" />' + labelHTML + '</div>',
				zIndex: 100
			});
		};

		pushpin.deselect = function() {
			this.setOptions({
				htmlContent: '<div class="map-marker"><img src="' +  imagePath + this.inactiveImage + '" />' + labelHTML + '</div>',
				zIndex: 1
			});
			this.hideInfowindow();
		};

		pushpin.getPosition = function() {
			return {
				lat: latlng.lat,
				lng: latlng.lng
			};
		};

		this.map.entities.push(pushpin);
		this.markers.unshift(pushpin);
		
		if(markerLatlngs[pushpin.getLocation().latitude + ',' + pushpin.getLocation().longitude]) {
			pushpin.setOptions({
				anchor: {
					x: 30,
					y: 46
				}
			});
		}

		markerLatlngs[pushpin.getLocation().latitude + ',' + pushpin.getLocation().longitude] = true;

		if(infoWindowContent) {
			pinInfobox = new Microsoft.Maps.Infobox(location, {
				visible: false,
				htmlContent: '<div class="info-window">' + infoWindowContent + '</div>'
			});
			this.map.entities.push(pinInfobox);

			Microsoft.Maps.Events.addHandler(pushpin, 'click', function(e) {
				pushpin.showInfoWindow();
			});

			Microsoft.Maps.Events.addHandler(this.map, 'click', function() {
				pinInfobox.setOptions({
					visible: false
				});
			});

			pushpin.hideInfowindow = function() {
				pinInfobox.setOptions({
					visible: false
				});
			};
			pushpin.showInfoWindow = function() {
				var anchor;

				pinInfobox.setOptions({
					visible: true
				});

				anchor = pinInfobox.getAnchor();
				pinInfobox.setOptions({
					offset: new Microsoft.Maps.Point(30, -1 * anchor.y + 60)
				});
			};
		}

		if(callback) {
			Microsoft.Maps.Events.addHandler(pushpin, 'click', function(e) {
				callback();
			});
		}
		return pushpin;
	};

	bingMap.prototype.addListener = function(target, event, handler) {
		return Microsoft.Maps.Events.addHandler(target, event, handler);
	};

	bingMap.prototype.removeListener = function(handlerId) {
		Microsoft.Maps.Events.removeHandler(handlerId);
	};

	bingMap.prototype.trigger = function(target, event) {
		Microsoft.Maps.Events.invoke(target, event);
	};

	bingMap.prototype.clearMarkers = function(markers) {
		for(var i = 0; i < markers.length; i++) {
			this.map.entities.remove(markers[i]);
		}
	};

	bingMap.prototype.searchDealersByDistance = function(origin, radius, limit, callback, matchParameters, containsParameters) {
		var url,
			baseUrl = dealerTableURL + '?',
			geoFilter = radius ? 'spatialFilter=nearby(' + origin.lat + ',' + origin.lng + ',' + radius + ')' : '',
			select = '&$select=*,__Distance',
			matchArr = [],
			filter = '&$filter=',
			maxResults = '&$top=' + limit,
			format = '&$format=json',
			key = '&key=' + bingKey,
			jsonp = '&Jsonp=processDealerResults';

		if(containsParameters) {
			for(var k in containsParameters) {
				matchArr.push('StartsWith(' + k + ',%27' + containsParameters[k] + '%27)%20Eq%20true');
				break;
			}
		}
		if(matchParameters) {
			for(var k in matchParameters) {
				matchArr.push(k + '%20Eq%20\'' + matchParameters[k] + '\'');
			}
		}
		if(matchArr.length) {
			filter += matchArr.join('%20And%20');
		} else {
			filter = '';
		}

		url = baseUrl + geoFilter + select + filter + maxResults + format + key + jsonp;

		jsonpRequest(url);

		window.processDealerResults = function(data) {
			var dealer,
				dealers = [];

			for(var i = 0; i < data.d.results.length; i++) {
				dealer = data.d.results[i];
				dealer.location = {
					lat: data.d.results[i].Latitude,
					lng: data.d.results[i].Longitude
				};
				dealer.distance = data.d.results[i].__Distance * 1000;
				dealers.push(dealer);
			}
			callback(dealers);
		};
	};

	bingMap.prototype.searchDealersByProperties = function(limit, callback, matchParameters, containsParameters) {
		var	url,
			baseUrl = dealerTableURL + '?',
			select = '$select=*',
			matchArr = [],
			filter = '&$filter=',
			maxResults = '&$top=' + limit,
			format = '&$format=json',
			key = '&key=' + bingKey,
			jsonp = '&Jsonp=processDealerResults',
			responseFilter = false;

		if(containsParameters) {
			if(containsParameters.DealerNameSearch) {
				url = baseUrl + select + filter + 'StartsWith(DealerNameSearch,%27' + containsParameters.DealerNameSearch + '%27)%20Eq%20true&$top=250' + format + key + jsonp;
				responseFilter = true;
			}
		} else {
			if(matchParameters) {
				for(var k in matchParameters) {
					matchArr.push(k + '%20Eq%20\'' + matchParameters[k] + '\'');
				}
			}

			if(matchArr.length) {
				filter += matchArr.join('%20And%20');
			}

			url = baseUrl + select + filter + maxResults + format + key + jsonp;
		}
		
		jsonpRequest(url);

		window.processDealerResults = function(data) {
			var dealer,
				dealers = [],
				dealerFilterMatch = true;

			for(var i = 0; i < data.d.results.length; i++) {
				dealerFilterMatch = true;
				dealer = data.d.results[i];
				dealer.location = {
					lat: data.d.results[i].Latitude,
					lng: data.d.results[i].Longitude
				};
				dealer.distance = data.d.results[i].__Distance * 1000;
				if(responseFilter) {
					for(var k in matchParameters) {
						if(dealer[k] != matchParameters[k]) {
							dealerFilterMatch = false;
						}
					}
					if(dealerFilterMatch) {
						dealers.push(dealer);
					}
				} else {
					dealers.push(dealer);
				}
			}
			callback(dealers);
		};
	};

	bingMap.prototype.displayDealers = function(dealers) {
		var index,
			latlngs = {};

		this.clearMarkers(this.markers);
		markerLatlngs = {};
		this.markers = [];
		for(var i = dealers.length - 1; i >= 0; i--) {
			index = dealers[i].indexOverride || i + 1;
			this.addGuxMarker({lat: dealers[i].location.lat, lng: dealers[i].location.lng }, index, dealers[i].infoWindowMarkup, dealers[i].callback, markerImages[dealers[i][markerImagesAttribute]]);
		}
	};

	bingMap.prototype.clearDealers = function() {
		this.clearMarkers(this.markers);
		this.markers = [];
	};

	bingMap.prototype.selectMarker = function(index) {
		if(this.markers[index]) {
			this.markers[index].select();
		}
	};

	bingMap.prototype.deselectMarker = function(index) {
		if(this.markers[index]) {
			this.markers[index].deselect();
		}
	};

	bingMap.prototype.deselectMarkers = function() {
		for (var i = 0; i < this.markers.length; i++) {
			this.markers[i].deselect();
		}
	};

	bingMap.prototype.autocomplete = function(text, limit, callback, type) {
		var ac,
			delay = 300,
			locationPredictions,
			dealerPredictions,
			predictions = {
				dealers: [],
				locations: []
			},
			self = this,
			pattern = /[^a-zA-Z0-9]/g;

		if(this.autocompleteTimeout) {
			clearTimeout(this.autocompleteTimeout);
		}

		this.autocompleteTimeout = setTimeout(function() {
			if(type === 'dealers') {
				// Get dealer name predictions
				var dealerMatches = [],
					dealerMatch,
					searchString = text.toLowerCase().replace(pattern, '');

				for (var i = 0; i < autocompleteDealerList.length; i++) {
					if(autocompleteDealerList[i].n.toLowerCase().replace(pattern, '').indexOf(searchString) !== -1) {
						dealerMatch = {
							DealerName: autocompleteDealerList[i].n,
							EntityID: autocompleteDealerList[i].e
						};
						if(autocompleteDealerList[i].n.toLowerCase().replace(pattern, '').indexOf(searchString) === 0) {
							dealerMatches.splice(0, 0, dealerMatch);
						} else {
							dealerMatches.push(dealerMatch);
						}
					}
				}
				predictions.dealers = dealerMatches.slice(0, limit);
				callback(predictions);

			} else {
				self.geocodeLocation(text, function(results) {
					locationPredictions = [];
					for(var i = 0; i < results.length && i < limit; i++) {
						locationPredictions.push(results[i].description);
					}
					predictions.locations = locationPredictions;
					
					if(type !== 'locations') {
						// Get dealer name predictions
						var dealerMatches = [],
							dealerMatch,
							searchString = text.toLowerCase().replace(pattern, '');

						for (var i = 0; i < autocompleteDealerList.length; i++) {
							if(autocompleteDealerList[i].n.toLowerCase().indexOf(searchString).replace(pattern, '') !== -1) {
								dealerMatch = {
									DealerName: autocompleteDealerList[i].n,
									EntityID: autocompleteDealerList[i].e
								};
								if(autocompleteDealerList[i].n.toLowerCase().indexOf(searchString).replace(pattern, '') === 0) {
									dealerMatches.splice(0, 0, dealerMatch);
								} else {
									dealerMatches.push(dealerMatch);
								}
							}
						}
						predictions.dealers = dealerMatches.slice(0, limit);
					}

					callback(predictions);
				});
			}	
		}, delay);
	};

	bingMap.prototype.displayRouteToDealer = function(origin, dealer) {
		var startLocation,
			endLocation,
			startWaypoint,
			endWaypoint;

		startLocation = new Microsoft.Maps.Location(origin.lat, origin.lng);
		endLocation = new Microsoft.Maps.Location(dealer.location.lat, dealer.location.lng);
		startWaypoint = new Microsoft.Maps.Directions.Waypoint({location: startLocation});
		endWaypoint = new Microsoft.Maps.Directions.Waypoint({location: endLocation});

		this.directionsManager.setRequestOptions({
			routeDraggable: false
		});
		this.directionsManager.setRenderOptions({
			waypointPushpinOptions: {
				visible: false
			}
		});

		this.directionsManager.addWaypoint(startWaypoint);
		this.directionsManager.addWaypoint(endWaypoint);

		this.directionsManager.calculateDirections();
	};

	bingMap.prototype.clearRoutes = function() {
		this.directionsManager.resetDirections();
	};

	bingMap.prototype.getDirectionsURL = function(destination, origin) {
		var start,
			end;

		start = origin ? origin.lat + '_' + origin.lng : '';
		end = destination.lat + '_' + destination.lng;

		return 'http://www.bing.com/maps/default.aspx?rtp=pos.' + start + '~pos.' + end;
	};

	bingMap.prototype.getAddressDirectionsURL = function(destinationDealer, addressFormat, origin) {
		var start,
			end,
			addressLines = [];

		for(var i = 0; i < addressFormat.length; i++) {
			if(destinationDealer[addressFormat[i]]) {
				addressLines.push(destinationDealer[addressFormat[i]]);
			}
		}

		start = origin ? origin.description : '';
		end = addressLines.join(',');
		return 'http://www.bing.com/maps/default.aspx?rtp=adr.' + start + '~adr.' + end;
	};

	function jsonpRequest(url) {
		var script = document.createElement('script');
		script.setAttribute('type', 'text/javascript');
		script.setAttribute('src', url);
		document.body.appendChild(script);
	}

	return {
		map: bingMap
	};
}