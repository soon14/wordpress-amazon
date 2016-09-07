	/*
		Ford Global UX - Google Maps Bing Contingency API v1.4.3
	*/
	function googleMapsApi(config) {

		var language = config.language,
			countryCode = config.countryCode,
			countryCodes = config.countryCodes ? config.countryCodes.split(',') : [countryCode],
			imagePath = config.imagePath,
			countryBounds = config.countryBounds,
			autocompleteServiceURL = config.autocompleteCallbackURL,
			autocompleteCallback = config.autocompleteCallbackName,
			boundsString = '',
			countryCodes = config.countryCodes ? config.countryCodes.split(',') : [countryCode],
           	bingKey = config.apiKey? config.apiKey : 'Al1EdZ_aW5T6XNlr-BJxCw1l4KaA0tmXFI_eTl1RITyYptWUS0qit_MprtcG7w2F',
			dealerTableBingURL = config.dealerTableURL ? config.dealerTableURL : 'https://spatial.virtualearth.net/REST/v1/data/1652026ff3b247cd9d1f4cc12b9a080b/FordEuropeDealers_Transition/Dealer',
            autocompleteDealerList = [],
			punctuationRegex = /[\!"#\$%&'\(\)\*\+`\-\.\/\:;\<\=\>\?@\[\\\]\^_'\{\|\}~]/g,
			googleMatrixLimit = 100;

		if(countryBounds) {
			var bounds = [];

			for(var i = 0; i < countryBounds.length; i++) {
				if(countryBounds[i].lat && countryBounds[i].lng) {
					bounds.push(countryBounds[i].lng + ' ' + countryBounds[i].lat);
				}
			}
			if(!(countryBounds[0].lat === countryBounds[countryBounds.length-1].lat && countryBounds[0].lng === countryBounds[countryBounds.length-1].lng)) {
				bounds.push(countryBounds[0].lng + ' ' + countryBounds[0].lat);
			}
					
		}
		
		if(countryBounds){
			
			var nLat = - 91;	//North is +X, so maximise it in the range
			var sLat = 91;		//South is -X, so minimise it in the range
			
			var eLng = - 181;	//East is +Y, so maximise it in the range
			var wLng = 181;		//West is -Y, so minimise it in the range 
					
			for(var i = 0; i < countryBounds.length; i++) {

				var x = countryBounds[i];
				x.lat = Number(x.lat);
				x.lng = Number(x.lng);
			
				if(x.lat !== "" || x.lng !== ""){
			
					if(x.lat > nLat){
						nLat = x.lat;
					}
					if(x.lat < sLat){
						sLat = x.lat;
					}
					if(x.lng > eLng){
						eLng = x.lng;
					}
					if(x.lng < wLng){
						wLng = x.lng;	
					}
				}
			}			
			boundsString = '(' + sLat + ',' + wLng + ',' + nLat + ',' + eLng + ')';						
		}
		

		if(autocompleteServiceURL) {
			jsonpRequest(autocompleteServiceURL);
		}

		window[autocompleteCallback] = function(dealers) {
			autocompleteDealerList = dealers;
		};
		
		function googleMap(element, options) {
			var geocoder,
				self = this;
			
			options.streetViewControl = false;

			if(options.center && options.zoom) {
				this.map = new google.maps.Map(element, options);
			} else {
				this.map = new google.maps.Map(element, options);
				this.setBounds(countryBounds);
			}

			if(!options.enableZoom) {
				this.map.setOptions({
					scrollwheel: false
				});
			}

			if(options.disableBusinessPOI) {
				// Some businesses in Google Maps aren't flagged as businesses, so to disable them, we need to disable all POI, and re-enable all except businesses.
				this.map.setOptions({
					styles: [
						{							
							"featureType": "poi",
							"elementType": "labels",
							"stylers": [
								{ "visibility": "off" }
							]
						},{
							"featureType": "poi.attraction",
							"stylers": [
								{ "visibility": "on" }
							]
						},{
							"featureType": "poi.government",
							"stylers": [
								{ "visibility": "on" }
							]
						},{
							"featureType": "poi.medical",
							"stylers": [
								{ "visibility": "on" }
							]
						},{
							"featureType": "poi.park",
							"stylers": [
								{ "visibility": "on" }
							]
						},{
							"featureType": "poi.place_of_worship",
							"stylers": [
								{ "visibility": "on" }
							]
						},{
							"featureType": "poi.school",
							"stylers": [
								{ "visibility": "on" }
							]
						},{
							"featureType": "poi.sports_complex",
							"stylers": [
								{ "visibility": "on" }
							]
						}
					]
				});
			}

			this.map.setOptions({
				zoomControlOptions: {
					position: google.maps.ControlPosition.RIGHT_TOP
				},
				panControlOptions: {
					position: google.maps.ControlPosition.RIGHT_TOP
				}
			});

			this.markers = [];
			this.autocompleteTimeout = null;
			this.directionsService = new google.maps.DirectionsService();
			this.directionsDisplay = new google.maps.DirectionsRenderer({
				suppressMarkers: true
			});

			this.offsetByPixels = function(latlng, offset) {
				var projection = this.map.getProjection(),
					scale = 1 << this.map.getZoom(),
					gLatLng,
					point,
					newLatLng;

				gLatLng = new google.maps.LatLng(latlng.lat, latlng.lng);
				point = projection.fromLatLngToPoint(gLatLng);
				point.x = point.x + (offset / scale);
				newLatLng = projection.fromPointToLatLng(point);

				return {
					lat: newLatLng.lat(),
					lng: newLatLng.lng()
				};
			};
		}

		googleMap.prototype.setCenter = function(latlng, offset) {
			var self = this;
			this.map.setCenter(latlng);
			if(offset) {
				var listener = google.maps.event.addListener(this.map, 'idle', function() {
					self.map.panBy(offset, 0);
					google.maps.event.removeListener(listener);
				});
			}
		};

		googleMap.prototype.getCenter = function() {
			var center = this.map.getCenter();
			return {
				lat: center.lat(),
				lng: center.lng()
			};
		};

		googleMap.prototype.panTo = function(latlng) {
			this.map.panTo({
				lat: latlng.lat,
				lng: latlng.lng
			});
		};

		googleMap.prototype.setZoom = function(zoomLevel) {
			this.map.setZoom(zoomLevel);
		};

		googleMap.prototype.getZoom = function() {
			return this.map.getZoom();
		};

		googleMap.prototype.setBounds = function(points, offset) {
			var bounds = new google.maps.LatLngBounds(),
				self = this;
			for(var i = 0; i < points.length; i++) {
				if(points[i].lat && points[i].lng) { // For normal latlng objects
					bounds.extend(new google.maps.LatLng(points[i].lat, points[i].lng));
				} else {
					if(points[i].location && points[i].location.lat && points[i].location.lng) { // For dealer object
						bounds.extend(new google.maps.LatLng(points[i].location.lat, points[i].location.lng));
					}
				}
			}
			if(points.length) {
				this.map.fitBounds(bounds);
				if(offset) {
					var listener = google.maps.event.addListener(this.map, 'idle', function() {
						var zoom = self.map.getZoom();
						self.map.setZoom(zoom-1);
						self.map.panBy(offset, 0);
						google.maps.event.removeListener(listener);
					});
				}
			}
		};

		googleMap.prototype.getBounds = function() {
			var bounds = this.map.getBounds(),
				ne = bounds.getNorthEast(),
				sw = bounds.getSouthWest();

			return {
				ne: {
					lat: ne.lat(),
					lng: ne.lng()
				},
				sw: {
					lat: sw.lat(),
					lng: sw.lng()
				}
			};
		};
		
		googleMap.prototype.geocodeLocation = function(location, callback) {
			var geocoder = new google.maps.Geocoder(),
				locations = [];
			
			geocoder.geocode({
					address: location,
					region: countryCode
				},
				function(data) {
					var addLocation = false;
					for(var i = 0; i < data.length; i++) {
						addLocation = false;
						for(var j = 0; j < data[i].address_components.length; j++) {
							for(var k = 0; k < data[i].address_components[j].types.length; k++) {
								if(data[i].address_components[j].types[k] === 'country') {
									for(var m = 0; m < countryCodes.length; m++) {
										if(data[i].address_components[j].short_name === countryCodes[m]) {
											addLocation = true;
										}
									}
								}
							}
						}
						if(addLocation) {
							locations.push({
								lat: data[i].geometry.location.lat(),
								lng: data[i].geometry.location.lng(),
								description: data[i].formatted_address,
								types: data[i].types,
								address_components: data[i].address_components
							});
						}
					}
					callback(locations);
				}
			);
		};

		googleMap.prototype.reverseGeocode = function(latlng, callback) {
			var geocoder = new google.maps.Geocoder();

			geocoder.geocode({
				'latLng': new google.maps.LatLng(latlng.lat, latlng.lng)
			},
			function(results, status) {
				if(results[0]) {
					callback(results[0].formatted_address);
				}
			});
		};

		googleMap.prototype.addMarker = function(latlng) {
			var marker = new google.maps.Marker({
				position: latlng,
				map: this.map
			});
			return marker;
		};

		googleMap.prototype.addGuxMarker = function(latlng, label, infoWindowContent, callback) {
			var overlay;

			overlay = new guxMarker(new google.maps.LatLng(latlng.lat, latlng.lng), this.map, label, infoWindowContent, callback);
			this.markers.unshift(overlay);
			return overlay;
		};

		googleMap.prototype.addListener = function(target, event, handler) {
			return google.maps.event.addListener(target, event, handler);
		};

		googleMap.prototype.removeListener = function(listener) {
			google.maps.event.removeListener(listener);
		};

		googleMap.prototype.trigger = function(target, event) {
			google.maps.event.trigger(target, event);
		};

		googleMap.prototype.clearMarkers = function(markers) {
			for(var i = 0; i < markers.length; i++) {
				markers[i].setMap(null);
			}
		};


		//Bing
		googleMap.prototype.searchDealersByDistance = function(origin, radius, limit, callback, matchParameters, containsParameters) {
			
			var url,
				baseUrl = dealerTableBingURL + '?',
				geoFilter = radius ? 'spatialFilter=nearby(' + origin.lat + ',' + origin.lng + ',' + radius + ')' : 'spatialFilter=bbox' + boundsString,
				select = '&$select=*,__Distance',
				matchArr = [],
				codeArr = [],
				distanceMatrixDealers = [],
				filter = '&$filter=',
				maxResults = '&$top=' + limit,
				format = '&$format=json',
				key = '&key=' + bingKey,
				jsonp = '&Jsonp=processDealerResults'
				matchORClauses = [],
				matchNOTClauses = [];
			
			
			if(matchParameters && matchParameters.OR_CLAUSES) {
				for(var i = 0; i < matchParameters.OR_CLAUSES.length; i++) {
					orArr = [];
					for(var orKey in matchParameters.OR_CLAUSES[i]) {
						if(orKey.indexOf('!') === 0) {
							orArr.push(orKey.slice(1) + '%20Ne%20%27' + matchParameters.OR_CLAUSES[i][orKey] + '%27');
						} else {
							orArr.push(orKey + '%20Eq%20%27' + matchParameters.OR_CLAUSES[i][orKey] + '%27');
						}
					}
					matchArr.push('(' + orArr.join('%20OR%20') + ')');
				}
				delete matchParameters.OR_CLAUSES;
			}
						
			if(matchParameters) {
				for(var k in matchParameters) {
					if(k.indexOf('!') === 0) {
						matchArr.push(k.slice(1) + '%20Ne%20%27' + matchParameters[k] + '%27');
					} else {
						matchArr.push(k + '%20Eq%20%27' + matchParameters[k] + '%27');
					}
				}
			}			
			
						
			if(matchArr.length) {
				filter += matchArr.join('%20And%20');
			} else {
				throw new Error('Must specify at least one match parameter.');
			}
						
			url = baseUrl + geoFilter + select + filter + maxResults + format + key + jsonp;

			jsonpRequest(url);

			window.processDealerResults = function(data) {
				var dealer,
					dealers = [];
				var service = new google.maps.DistanceMatrixService();

				for(var i = 0; i < data.d.results.length; i++) {
					dealer = data.d.results[i];
					dealer.location = {
						lat: data.d.results[i].Latitude,
						lng: data.d.results[i].Longitude
					};
					dealer.distance = data.d.results[i].__Distance * 1000;
					dealers.push(dealer);
				}

				destinationLatLngs = [];
				var newDealers = filterDealers(dealers, containsParameters, googleMatrixLimit);

				//Create parallel array of lat lngs to pass into distance matrix
                for (i = 0; i < newDealers.length; i++) {
					destinationLatLngs.push(new google.maps.LatLng(newDealers[i].location.lat, newDealers[i].location.lng));
				}

				//(Dealers chopped into) Chunks of 25, rounded up.
                //This is the have-I-finished array for AJAX calls.
                distanceResponses = new Array(Math.ceil(destinationLatLngs.length/25));

                if(newDealers.length){

                    var createDistanceCallback = function(index) {
						return function(distances) {
							var count = destinationLatLngs.slice(index*25, index*25 + 25).length, j;

                            if(distances) {
								for(j = 0; j < distances.rows[0].elements.length; j++) {
									if(distances.rows[0].elements[j].status === 'OK') {
										newDealers[index*25 + j].distance = distances.rows[0].elements[j].distance.value;
										newDealers[index*25 + j].drivingTime = distances.rows[0].elements[j].duration.value;
										if(radius) {
                                            //Only push dealers within driving distance of radius, not generic distance
											if(newDealers[index*25+j].distance <= radius * 1000) {
												distanceMatrixDealers.push(newDealers[index*25+j]);
											}
										} else {
											distanceMatrixDealers.push(newDealers[index*25+j]);
										}
									} else {
                                            //Error handling for no distance.
											newDealers[index*25 + j].distanceError = distances.rows[0].elements[j].status;
											newDealers[index*25 + j].distance = null;
											distanceMatrixDealers.push(newDealers[index*25+j]);
									}
								}
							} else {
                                //Error is no distances array returned
								for(j = 0; j < count; j++) {
									newDealers[index*25 + j].distanceError = 'DRIVING DISTANCE UNAVAILABLE';
									newDealers[index*25 + j].distance = null;
									distanceMatrixDealers.push(newDealers[index*25+j]);
								}
							}

                            //This chunk of dealers has come back.
							distanceResponses[index] = true;
							responsesReturned = true;

							//If any of the chunks haven't returned, we fail.
							for(var k = 0; k < distanceResponses.length; k++) {
								if(!distanceResponses[k]) {
									responsesReturned = false;
								}
							}

							if(responsesReturned) {

								//The dealers array becomes our array of dealers that went through the distance matrix.
								//This seems the dealers are in the right order regardless of function-call return order.
								dealers = distanceMatrixDealers.sort(function(a, b) {
									if(typeof a.distance === 'number' && typeof b.distance === 'number') {
										return a.distance - b.distance;
									} else {
										if(typeof a.distance !== 'number' && typeof b.distance !== 'number') {
											return a.directDistance - b.directDistance;
										}
										if(typeof a.distance === 'number') {
											return -1;
										} else {
											return 1;
										}
									}
								});
								callback(dealers.slice(0, limit));
							}
						};
					};

					for(i = 0; i < destinationLatLngs.length / 25; i++) {
						service.getDistanceMatrix(
						{
							origins: [origin],
							destinations: destinationLatLngs.slice(i*25, i*25 + 25),
							travelMode: google.maps.TravelMode.DRIVING
						}, createDistanceCallback(i));
					}

				} else {
					callback(newDealers);
				}			
			};
		};


		//Bing
        //Limit is max results to be given to the application.
		googleMap.prototype.searchDealersByProperties = function(limit, callback, matchParameters, containsParameters) {

			var	url,
				baseUrl = dealerTableBingURL + '?',
				geoFilter = 'spatialFilter=bbox' + boundsString,
				select = '&$select=*',
				matchArr = [],
				filter = '&$filter=',				
				maxResults = '&$top=' + limit,
				format = '&$format=json',
				linecount = '&$inlinecount=allpages'
				key = '&key=' + bingKey,
				jsonp = '&Jsonp=processDealerResults';

            var dealers = [];

			//space is %20, quote is %27
			//Eg: $filter=CountryCode%20Eq%20%27GBR%27%20And%20AccidentRepair%20Eq%20%271%27%20And%20HasSalesDepartmentPV%20Eq%20%271%27
			if(matchParameters && matchParameters.OR_CLAUSES) {
				for(var i = 0; i < matchParameters.OR_CLAUSES.length; i++) {
					orArr = [];
					for(var orKey in matchParameters.OR_CLAUSES[i]) {
						if(orKey.indexOf('!') === 0) {
							orArr.push(orKey.slice(1) + '%20Ne%20%27' + matchParameters.OR_CLAUSES[i][orKey] + '%27');
						} else {
							orArr.push(orKey + '%20Eq%20%27' + matchParameters.OR_CLAUSES[i][orKey] + '%27');
						}
					}
					matchArr.push('(' + orArr.join('%20OR%20') + ')');
				}
				delete matchParameters.OR_CLAUSES;
			}
			

			if(matchParameters) {
				for(var k in matchParameters) {
					if(k.indexOf('!') === 0) {
						matchArr.push(k.slice(1) + '%20Ne%20%27' + matchParameters[k] + '%27');
					} else {
						matchArr.push(k + '%20Eq%20%27' + matchParameters[k] + '%27');
					}
				}
			}

			if(matchArr.length) {
				filter += matchArr.join('%20And%20');
			} else {
				throw new Error('Must specify at least one match parameter.');
			}

			var dealersCompleted = [],
                dealerCount;

			url = baseUrl + geoFilter + select + filter + maxResults + linecount + format + key + jsonp;


			jsonpRequest(url);

            //Initial processing of dealer results.
			window.processDealerResults = function(data) {

                dealerCount = data.d.__count;
            	var dealer;
            	
				for(i = 0; i < (dealerCount / 250); i++){					
					dealersCompleted.push(false); 			
				}				

				for(var i = 0; i < data.d.results.length; i++) {
					dealer = data.d.results[i];
					dealer.location = {
						lat: data.d.results[i].Latitude,
						lng: data.d.results[i].Longitude
					};
					dealer.distance = data.d.results[i].__Distance * 1000;
					dealers.push(dealer);
				}

                if(dealerCount > limit){

                    var iterationCount = parseInt(limit, 10),
                        skip,
                        mResults;

					var completed = 0;	

                    var testLoop = 0;

                    for(var outloop = 0; outloop < (dealerCount / 250); outloop++){	
    
                        //rebuild the string
                        skip = '&$skip=' + iterationCount;
                        mResults = '&$top=' + 250;
                        url = baseUrl + geoFilter + select + filter + skip + mResults + format + key + jsonp;

   						//Increment the loop count.
						iterationCount = iterationCount + 250;

                        //Re do it.
                        jsonpRequest(url);

                        window.processDealerResults = function(data) {

							var dealer;
						
                            for(var i = 0; i < data.d.results.length; i++) {
                                dealer = data.d.results[i];
                                dealer.location = {
                                    lat: data.d.results[i].Latitude,
                                    lng: data.d.results[i].Longitude
                                };
                                dealer.distance = data.d.results[i].__Distance * 1000;
                                dealers.push(dealer);
                            }

                            dealersCompleted[testLoop] = true;
							 testLoop = testLoop + 1;

                            var complete = true;	
                            for(var innerLoop = 0; innerLoop < dealersCompleted.length; innerLoop++){					
                                if(dealersCompleted[innerLoop] == false){
                                    complete = false;
                                }
                            }

                            if(complete == true){
								var newDealers = filterDealers(dealers, containsParameters, limit);
                                callback(newDealers);
                            }

                        };
                    }
                } else {
					var newDealers = filterDealers(dealers, containsParameters, limit);
					callback(newDealers);
                }    
			};
		};


        filterDealers = function(dealers, containsParameters, maxResults) {
		
			if(!containsParameters){
				return dealers;
			}
		
            var dealersFiltered = [];
						
            if(dealers.length > 0) {

				for(var i = 0; i < dealers.length; i++){
				
					var allMatched = true;
					
					for(var key in containsParameters){
						if(containsParameters.hasOwnProperty(key)){					
							
							var check = containsParameters[key];
							var dealerString = dealers[i][key];
														
							if(dealerString.indexOf(check) === -1){
								allMatched = false;
							}							
						}	
					}
					
					if(allMatched === true){
						dealersFiltered.push(dealers[i]);							
					}
				}
          	}

          	var dealersReturned = [];

            if(dealersFiltered.length >= maxResults){
                dealersReturned = dealersFiltered.slice(0,maxResults); 
    		} else {
              	dealersReturned = dealersFiltered;
            }

            return dealersReturned;
        };


		googleMap.prototype.displayDealers = function(dealers) {
				var marker,
					index,
					latlngs = {};

				this.clearMarkers(this.markers);
				this.markers = [];
				for(var i = dealers.length - 1; i >= 0; i--) {
					index = dealers[i].indexOverride || i + 1;
					marker = this.addGuxMarker({lat: dealers[i].location.lat, lng: dealers[i].location.lng }, index, dealers[i].infoWindowMarkup, dealers[i].callback);
					if(latlngs[dealers[i].location.lat + ',' + dealers[i].location.lng]) {
						marker.xOffset = 12;
					}
					latlngs[dealers[i].location.lat + ',' + dealers[i].location.lng] = true;
					
				}
			};

		googleMap.prototype.clearDealers = function() {
			this.clearMarkers(this.markers);
			this.markers = [];
		};

		googleMap.prototype.selectMarker = function(index, delay) {
			if(this.markers[index]) {
				this.markers[index].select(delay);
			}
		};

		googleMap.prototype.deselectMarker = function(index) {
			if(this.markers[index]) {
				this.markers[index].deselect();
			}
		};

		googleMap.prototype.deselectMarkers = function() {
			for (var i = 0; i < this.markers.length; i++) {
				this.markers[i].deselect();
			};
		};

		googleMap.prototype.autocomplete = function(text, limit, callback, type) {
			var ac,
				delay = 300,
				locationPredictions,
				dealerPredictions,
				predictions = {
					dealers: [],
					locations: []
				},
				self = this,			
				placesCompleted = 0,
				places = {};

			if(this.autocompleteTimeout) {
				clearTimeout(this.autocompleteTimeout);
			}

			if(type !== 'dealers') {
				ac = new google.maps.places.AutocompleteService();
			}

			this.autocompleteTimeout = setTimeout(function() {
				if(type === 'dealers') {
					// Get dealer name predictions
					var dealerMatches = [],
						dealerMatch;

					for (var i = 0; i < autocompleteDealerList.length; i++) {
						if(autocompleteMatch(autocompleteDealerList[i].n, text) !== -1) {
							dealerMatch = {
								DealerName: autocompleteDealerList[i].n,
								EntityID: autocompleteDealerList[i].e
							};
							if(autocompleteMatch(autocompleteDealerList[i].n, text) === 0) {
								dealerMatches.splice(0, 0, dealerMatch);
							} else {
								dealerMatches.push(dealerMatch);
							}
						}
					};
					predictions.dealers = dealerMatches.slice(0, limit);
					callback(predictions);

				} else {
					// Get location predictions
					for(var i = 0; i < countryCodes.length; i++) {
						ac.getPlacePredictions(
							{
								input: text,
								componentRestrictions: {country: countryCodes[i]},
								types: ['geocode']
							},
							function(index) {
								return function(results, status) {
									locationPredictions = [];
									if(status == google.maps.places.PlacesServiceStatus.OK) {
										for(var j = 0; j < results.length; j++) {
											locationPredictions.push(results[j].description);
										}
									}
									places[countryCodes[index]] = locationPredictions;
									placesCompleted++;
									
									if(placesCompleted === countryCodes.length) {
										for(var k = 0; k < countryCodes.length; k++) {
											predictions.locations = predictions.locations.concat(places[countryCodes[k]]);
										}
										// predictions.locations = predictions.locations.slice(0, limit);
										if(type !== 'locations') {
											// Get dealer name predictions
											var dealerMatches = [],
												dealerMatch;

											for (var m = 0; m < autocompleteDealerList.length; m++) {
												if(autocompleteMatch(autocompleteDealerList[m].n, text) !== -1) {
													dealerMatch = {
														DealerName: autocompleteDealerList[m].n,
														EntityID: autocompleteDealerList[m].e
													};
													if(autocompleteMatch(autocompleteDealerList[m].n, text) === 0) {
														dealerMatches.splice(0, 0, dealerMatch);
													} else {
														dealerMatches.push(dealerMatch);
													}
												}
											};
											predictions.dealers = dealerMatches.slice(0, limit);
										}
										callback(predictions);
									}
								}
							}(i)
						);
					}
				}	
			}, delay);
		};

		googleMap.prototype.displayRouteToDealer = function(origin, dealer) {
			var self = this;
			this.directionsDisplay.setMap(this.map);
			this.directionsService.route({
				origin: origin.lat + ', ' + origin.lng,
				destination: dealer.location.lat + ', ' + dealer.location.lng,
				travelMode: google.maps.TravelMode.DRIVING
			}, function(response, status) {
				if (status == google.maps.DirectionsStatus.OK) {
					self.directionsDisplay.setDirections(response);
				}
			});
		};

		googleMap.prototype.clearRoutes = function() {
			this.directionsDisplay.setMap(null);
		};

		googleMap.prototype.getDirectionsURL = function(destination, origin) {
			var start,
				end;

			start = origin ? 'saddr=' + origin.lat + ',' + origin.lng + '&': '';
			end = 'daddr=' + destination.lat + ',' + destination.lng;
			return 'https://maps.google.com?' + start + end;
		};

		googleMap.prototype.getAddressDirectionsURL = function(destinationDealer, addressFormat, origin) {

			var start,
				end,
				addressLines = [];

			for(var i = 0; i < addressFormat.length; i++) {
				if(destinationDealer[addressFormat[i]]) {
					addressLines.push(destinationDealer[addressFormat[i]]);
				}
			}

			start = origin ? 'saddr=' + origin.description + '&': '';
			end = 'daddr=' + addressLines.join('+');
			return 'https://maps.google.com?' + start + end + '&output=classic';
		};

		// Custom marker using OverlayView to allow us to use HTML and numbered markers
		guxMarker.prototype = new google.maps.OverlayView();

		function guxMarker(position, map, label, infoWindowContent, callback) {
			this.position_ = position;
			this.map_ = map;
			this.label_ = label;
			this.content_ = infoWindowContent;
			this.div_ = null;
			this.icon = null;
			this.callback = callback;
			this.infoWindow = null;
			this.setMap(map);
		}

				
		guxMarker.prototype.select = function(delay) {
		
			var self = this; 			
							
			if(self.icon && self.div_){
				self.icon.src = imagePath + 'map-marker-active.png';
				self.div_.style.zIndex = 100;
			} else {
				var timeOut = delay || 500;
				setTimeout(function(){
					if(self.icon && self.div_){
						self.icon.src = imagePath + 'map-marker-active.png';
						self.div_.style.zIndex = 100;
					}
				}, timeOut);
			}
		};

		guxMarker.prototype.deselect = function(delay) {
		
			var self = this;
			
			if(self.icon && self.div_){
				self.icon.src = imagePath + 'map-marker.png';
				self.div_.style.zIndex = 1;
				if(self.infoWindow) {
					self.infoWindow.hide();
				}
			} else {
				var timeOut = delay || 500;
				setTimeout(function(){
					if(self.icon && self.div_){
						self.icon.src = imagePath + 'map-marker.png';
						self.div_.style.zIndex = 1;
						if(self.infoWindow) {
							self.infoWindow.hide();
						}
					}
				}, timeOut);
			}			
		};
		
		
		guxMarker.prototype.onAdd = function() {
			var div = document.createElement('div'),
				self = this;
			div.className = "map-marker";
			div.style.width = '35px';
			div.style.height = '46px';

			var img = document.createElement('img');
			img.src = imagePath + 'map-marker.png';
			this.icon = img;
			div.appendChild(img);

			if(this.label_) {
				var span = document.createElement('span');
				span.innerHTML = this.label_;
				span.className = 'marker-label';
				div.appendChild(span);
			}

			this.div_ = div;

			var panes = this.getPanes();
			panes.overlayMouseTarget.appendChild(div);

			if(this.callback) {
				google.maps.event.addDomListener(div, 'click', function() {
					self.callback();
				});
			}
			
			if(this.content_) {
				// var infoWindow;
				google.maps.event.addDomListener(div, 'click', function() {
					self.showInfoWindow();
				});
			}
			
		};

		guxMarker.prototype.showInfoWindow = function() {
			var self = this;
			// If already displayed then hide the current version before showing a new one
			// Perhaps show should be a no-op on an already displayed info window?
			if(this.infoWindow) {
				this.infoWindow.hide();
			}
			self.infoWindow = new guxInfoWindow(self.getPosition(), self.map_, self.content_);
			if(self.xOffset) {
				self.infoWindow.xOffset = self.xOffset;
			}
		};

		guxMarker.prototype.hideInfowindow = function() {
			if(this.infoWindow) {
				this.infoWindow.hide();
			}
		};

		guxMarker.prototype.draw = function() {
			var overlayProjection = this.getProjection();

			var pos = overlayProjection.fromLatLngToDivPixel(this.position_);
			var xOffset = this.xOffset || 0;

			var div = this.div_;
			div.style.position = 'absolute';
			div.style.left = pos.x - (17 + xOffset) + 'px';
			div.style.top = pos.y - 46 + 'px';
			};

		guxMarker.prototype.onRemove = function() {
			this.div_.parentNode.removeChild(this.div_);
			this.div_ = null;
			if(this.infoWindow) {
				this.infoWindow.hide();
			}
		};

		guxMarker.prototype.getPosition = function() {
			return {
				lat: this.position_.lat(),
				lng: this.position_.lng()
			};
		};

		// Custom infowindow
		guxInfoWindow.prototype = new google.maps.OverlayView();

		function guxInfoWindow(position, map, content) {
			this.position_ = new google.maps.LatLng(position.lat, position.lng);
			this.map_ = map;
			this.content_ = content;
			this.div_ = null;

			this.setMap(map);
		}

		guxInfoWindow.prototype.onAdd = function() {
			var div = document.createElement('div');
			div.className = "info-window";
			div.innerHTML = this.content_;
			this.div_ = div;

			var panes = this.getPanes();
			panes.overlayMouseTarget.appendChild(div);

			var self = this;
			google.maps.event.addListener(this.map_, 'click', function() {
				self.setMap(null);
			});

			google.maps.event.addDomListener(div, 'click', function(e) {
				e.stopPropagation();
			});

		};

		guxInfoWindow.prototype.draw = function() {
			var overlayProjection = this.getProjection();

			var pos = overlayProjection.fromLatLngToDivPixel(this.position_);
			var xOffset = this.xOffset || 0;

			var div = this.div_;
			div.style.position = 'absolute';
			div.style.left = pos.x + 30 - xOffset + 'px';
			div.style.top = pos.y - 60 + 'px';
		};

		guxInfoWindow.prototype.onRemove = function() {
			this.div_.parentNode.removeChild(this.div_);
			this.div_ = null;
		};

		guxInfoWindow.prototype.hide = function() {
			this.setMap(null);
		};



		function jsonpRequest(url) {
			var script = document.createElement('script');
			script.setAttribute('type', 'text/javascript');
			script.setAttribute('src', url);
			document.body.appendChild(script);
		}

		function dealerDistance(olat, olon, dlat, dlon) {
			var R = 6371; // Approx. radius of the Earth http://en.wikipedia.org/wiki/Earth_radius
			var lat1 = Math.PI * olat / 180;
			var lon1 = Math.PI * olon / 180;
			var lat2 = Math.PI * dlat / 180;
			var lon2 = Math.PI * dlon / 180;
			var dlon = lon2 - lon1, dlat = lat2 - lat1;
			var a = Math.pow(Math.sin(dlat/2),2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon/2),2);
			var c = 2 * Math.asin(Math.min(1, Math.sqrt(a)));
			var d = R * c;
			return d;
		}

		function characterFolding(character) {
			var characterMap = {
				//'\u0049': '\u0131',
				'\u00B5': '\u03BC',
				'\u00DF': '\u0073\u0073',
				'\u0130': '\u0069\u0307',
				//'\u0130': '\u0069',
				'\u0149': '\u02BC\u006E',
				'\u017F': '\u0073',
				'\u01F0': '\u006A\u030C',
				'\u0345': '\u03B9',
				'\u0390': '\u03B9\u0308\u0301',
				'\u03B0': '\u03C5\u0308\u0301',
				'\u03C2': '\u03C3',
				'\u03D0': '\u03B2',
				'\u03D1': '\u03B8',
				'\u03D5': '\u03C6',
				'\u03D6': '\u03C0',
				'\u03F0': '\u03BA',
				'\u03F1': '\u03C1',
				'\u03F5': '\u03B5',
				'\u0587': '\u0565\u0582',
				'\u1E96': '\u0068\u0331',
				'\u1E97': '\u0074\u0308',
				'\u1E98': '\u0077\u030A',
				'\u1E99': '\u0079\u030A',
				'\u1E9A': '\u0061\u02BE',
				'\u1E9B': '\u1E61',
				'\u1E9E': '\u0073\u0073',
				'\u1F50': '\u03C5\u0313',
				'\u1F52': '\u03C5\u0313\u0300',
				'\u1F54': '\u03C5\u0313\u0301',
				'\u1F56': '\u03C5\u0313\u0342',
				'\u1F80': '\u1F00\u03B9',
				'\u1F81': '\u1F01\u03B9',
				'\u1F82': '\u1F02\u03B9',
				'\u1F83': '\u1F03\u03B9',
				'\u1F84': '\u1F04\u03B9',
				'\u1F85': '\u1F05\u03B9',
				'\u1F86': '\u1F06\u03B9',
				'\u1F87': '\u1F07\u03B9',
				'\u1F88': '\u1F00\u03B9',
				'\u1F89': '\u1F01\u03B9',
				'\u1F8A': '\u1F02\u03B9',
				'\u1F8B': '\u1F03\u03B9',
				'\u1F8C': '\u1F04\u03B9',
				'\u1F8D': '\u1F05\u03B9',
				'\u1F8E': '\u1F06\u03B9',
				'\u1F8F': '\u1F07\u03B9',
				'\u1F90': '\u1F20\u03B9',
				'\u1F91': '\u1F21\u03B9',
				'\u1F92': '\u1F22\u03B9',
				'\u1F93': '\u1F23\u03B9',
				'\u1F94': '\u1F24\u03B9',
				'\u1F95': '\u1F25\u03B9',
				'\u1F96': '\u1F26\u03B9',
				'\u1F97': '\u1F27\u03B9',
				'\u1F98': '\u1F20\u03B9',
				'\u1F99': '\u1F21\u03B9',
				'\u1F9A': '\u1F22\u03B9',
				'\u1F9B': '\u1F23\u03B9',
				'\u1F9C': '\u1F24\u03B9',
				'\u1F9D': '\u1F25\u03B9',
				'\u1F9E': '\u1F26\u03B9',
				'\u1F9F': '\u1F27\u03B9',
				'\u1FA0': '\u1F60\u03B9',
				'\u1FA1': '\u1F61\u03B9',
				'\u1FA2': '\u1F62\u03B9',
				'\u1FA3': '\u1F63\u03B9',
				'\u1FA4': '\u1F64\u03B9',
				'\u1FA5': '\u1F65\u03B9',
				'\u1FA6': '\u1F66\u03B9',
				'\u1FA7': '\u1F67\u03B9',
				'\u1FA8': '\u1F60\u03B9',
				'\u1FA9': '\u1F61\u03B9',
				'\u1FAA': '\u1F62\u03B9',
				'\u1FAB': '\u1F63\u03B9',
				'\u1FAC': '\u1F64\u03B9',
				'\u1FAD': '\u1F65\u03B9',
				'\u1FAE': '\u1F66\u03B9',
				'\u1FAF': '\u1F67\u03B9',
				'\u1FB2': '\u1F70\u03B9',
				'\u1FB3': '\u03B1\u03B9',
				'\u1FB4': '\u03AC\u03B9',
				'\u1FB6': '\u03B1\u0342',
				'\u1FB7': '\u03B1\u0342\u03B9',
				'\u1FBC': '\u03B1\u03B9',
				'\u1FBE': '\u03B9',
				'\u1FC2': '\u1F74\u03B9',
				'\u1FC3': '\u03B7\u03B9',
				'\u1FC4': '\u03AE\u03B9',
				'\u1FC6': '\u03B7\u0342',
				'\u1FC7': '\u03B7\u0342\u03B9',
				'\u1FCC': '\u03B7\u03B9',
				'\u1FD2': '\u03B9\u0308\u0300',
				'\u1FD3': '\u03B9\u0308\u0301',
				'\u1FD6': '\u03B9\u0342',
				'\u1FD7': '\u03B9\u0308\u0342',
				'\u1FE2': '\u03C5\u0308\u0300',
				'\u1FE3': '\u03C5\u0308\u0301',
				'\u1FE4': '\u03C1\u0313',
				'\u1FE6': '\u03C5\u0342',
				'\u1FE7': '\u03C5\u0308\u0342',
				'\u1FF2': '\u1F7C\u03B9',
				'\u1FF3': '\u03C9\u03B9',
				'\u1FF4': '\u03CE\u03B9',
				'\u1FF6': '\u03C9\u0342',
				'\u1FF7': '\u03C9\u0342\u03B9',
				'\u1FFC': '\u03C9\u03B9',
				'\uFB00': '\u0066\u0066',
				'\uFB01': '\u0066\u0069',
				'\uFB02': '\u0066\u006C',
				'\uFB03': '\u0066\u0066\u0069',
				'\uFB04': '\u0066\u0066\u006C',
				'\uFB05': '\u0073\u0074',
				'\uFB06': '\u0073\u0074',
				'\uFB13': '\u0574\u0576',
				'\uFB14': '\u0574\u0565',
				'\uFB15': '\u0574\u056B',
				'\uFB16': '\u057E\u0576',
				'\uFB17': '\u0574\u056D'
			};
			return characterMap[character] || character;
		}

		function autocompleteMatch(dealerName, searchString) {
			searchString = searchString.toLowerCase().replace(punctuationRegex, '').replace(/\s+/g, ' ').replace(/./g, characterFolding);
			dealerName = dealerName.toLowerCase().replace(punctuationRegex, '').replace(/\s+/g, ' ').replace(/./g, characterFolding);
			return dealerName.indexOf(searchString);
		}
		
		return {
			map: googleMap
		};
	}