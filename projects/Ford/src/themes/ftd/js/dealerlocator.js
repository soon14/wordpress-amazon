/*
 * This file combine 2 versions of bing map together for each market to switch between these 2 versions
 */
(function($) {
	//Adds up the values of all the selected elements
	jQuery.fn.totalValString = function() {
		var total = '';
		this.each(function() {
			total = total + jQuery(this).val().replace(/[\s\t\n]/g, '');
		});
		return total;
	};
})(jQuery);

(function($) {
	var ND = window['ND'] || {};

	ND.loadScript = function(url, callback) {

		var script = document.createElement("script")
		script.type = "text/javascript";

		if (script.readyState) {//IE
			script.onreadystatechange = function() {
				if (script.readyState == "loaded" || script.readyState == "complete") {
					script.onreadystatechange = null;
					callback();
				}
			};
		} else {//Others
			script.onload = function() {
				callback();
			};
		}

		script.src = url;
		document.body.appendChild(script);
	};

	/*
	 * BingMap has the depandence of document.attachEvent, it may not ready when called by $wait in Firefox.
	 * only use for version6 . version7 doesnt have this issue
	 */
	var isReady = function(func) {
		if ( (typeof (Microsoft) == "undefined" || typeof (Microsoft.Maps) == "undefined") && $.browser && $.browser.mozilla) {
			$ready("document.attachEvent", func);
		} else {
			func();
		}
	};

	ND.dealerLocator = {
		data : [],
		dl : [],
		init : function(zoom, lng, lat, key, country) {
			var self = this;
			var args = arguments;

			isReady(function() {
				if (args.length > 0) {
					self.dl = new DealerLocator({
						mapId : "dealer-map",
						lng : lng,
						lat : lat,
						zoom : zoom,
						key : key,
						country : country
					});
					//eg. 133.769531, -25.244696, 4
				} else {
					self.dl = new DealerLocator({
						mapId : "dealer-map",
						lng : 0,
						lat : 0,
						zoom : 0
					});
				}
				self.dl.setSearch(self.data);
				self.domInit();
			});
		},
		directions : function(endPoint, lang) {
			var self = this;
			var working = false;

			isReady(function() {
				$(function() {
					var holder = document.createElement("div");
					holder.innerHTML = document.getElementById('get_directions').innerHTML;
					var $getDir = $(holder);
					var $miniForm = $('.mini-dealer-form');
					/* For Owner */
					if ($(".owner-map").size()) {
						$getDir.addClass("dealer-route");
						$miniForm = $(".dealer-details");
					}

					$getDir.insertAfter($miniForm);
					$getDir.find('form').submit(function(e) {
						var $this = $(this);
						var $mapDirectionsStart = $('#map-directions-start');
						var jmsg = $this.find('.message').length > 0 ? $this.find('.message') : $('<p class="message">' + $('#directions-failed-message').val() + '</p>');
						if ($mapDirectionsStart.val().length > 0) {
							jmsg.hide(0);
							if (!working) {
								working = true;
								self.dl.findRoute($mapDirectionsStart.val(), endPoint, lang, function() {
									working = false;
								});
							}
						} else {
							$this.prepend(jmsg.hide(0));
							jmsg.slideDown();
						}
						e.preventDefault();
					});
					$('a.VE_PlaceList_Close').live('click', function() {
						$('#map-directions-panel').parent().removeClass("loading");
						working = false;
					});
				});
			});
		},
		add : function(obj) {
			var self = this;
			self.data.push(obj);
			//fixed asyn issue
			if(self.dl.setSearch && obj.islast && obj.islast=="true"){
				self.dl.setSearch(self.data);
			}
		},
		domInit : function() {
			$(function() {
				$dealerResultsMap = $('#dealer-results-map');

				$dealerResultsMap.each(function() {
					lastSelected = $('');
					$(this).find('TBODY TR.dealer TD').hover(function() {
						$(this).closest('TR').addClass('hover');
					}, function() {
						$(this).closest('TR').removeClass('hover');
					});
				});

				// Populate cookie postcode.
				$('#dl_location').each(function() {
					var loc = $(this);
					loc.each(function() {
						if ($.trim(loc.val()) === "") {
							$.publish("shopping.pref.retrieve", function(e, data) {
								if (data && data.postcode) {
									loc.val(data.postcode);
								}
							});
						}
					});
				});

				//Form Builder Submit Version
				$('#dealer-search-button').each(function() {

					if ($('div.webshim-validation').size() != 0) {
						return;
					}

					$('#dragonflyform').submit(function(e) {
						var jform = $(this);

						if ($('INPUT[type=text], SELECT', jform).totalValString().length < 1) {
							var jmsg = jform.find('.message').length > 0 ? jform.find('.message') : $('<p class="message">' + $('#submission-failed-message').val() + '</p>');
							jform.prepend(jmsg.hide(0));
							jmsg.slideDown();
							e.preventDefault();
						}
					});
				});

				//Form Builder Submit Version
				$('#submit-dealer').each(function() {
					$('#dragonflyform').submit(function(e) {
						if ($(this).find('INPUT:checked').length <= 0) {
							$('#dealer-error').hide().addClass("error").fadeIn("slow");
							e.preventDefault();
							return false;
						}
					});
				});

				$dealerResultsMap.find('TBODY TR').click(function(event) {
					var $input = (this.nodeName == "INPUT" ? this : $("INPUT.dealerinfo", this));
					if (event.target.nodeName != "INPUT" && event.target.nodeName != "LABEL" && event.target.nodeName != "A") {
						if (!$input.is(":checked")) {
							$input.attr("checked", true)
						}
					}
					if ($input.is(":checked")) {
						$(this).siblings(".selected").removeClass("selected");
						$(this).addClass("selected");
					}
				});
				$dealerResultsMap.find("INPUT.dealerinfo:checked").closest("TR").addClass("selected");

				$('.dealer-popup').live('click', function(e) {
					ND.anchors.storage.popup.apply(this);
					e.preventDefault();
				});
				$('.dealer-external').live('click', function(e) {
					ND.anchors.storage.external.apply(this);
					e.preventDefault();
				});
			});
		},
		selectById : function(id, dealerinfo) {
			$tr = $('#' + id);
			$tr.siblings(".selected").removeClass('selected');
			$tr.addClass('selected');
			$input = $('#' + dealerinfo);
			$input.attr("checked", true)
			var targetOffset = $tr.offset().top - 200;
			$('html,body').animate({
				scrollTop : targetOffset
			}, 1000);
		}
	};

	var InteractiveMap = function(options) {
		if (options.isVersion7) {
			this.initV7(options);
		} else {
			this.init(options);
		}
	};
	/**
	 * the following prototype contains 2 different versions of bingmap.
	 */
	InteractiveMap.prototype = {
		/**
		 * use the following methods for bing map Version 7.0
		 */
		initV7 : function(options) {
			this.country = options.country;
			this.resetMarkers();
			this.loadMapV7(options);
		},
		loadMapV7 : function(options) {
			var map = this.map = new Microsoft.Maps.Map(document.getElementById(options.mapId), {
				credentials : options.key,
				center : new Microsoft.Maps.Location(options.lat, options.lng),
				zoom : parseInt(options.zoom),
				mapTypeId : Microsoft.Maps.MapTypeId.road,
				enableSearchLogo : false
			});
		},
		resetMarkers : function() {
			this.shapes = {};
		},
		//add pushpin and info box on the map
		addMarkerV7 : function(data, selectable) {
			var scope = this, pushpinIcon, jdealer = $('#' + data.id),
			//create current dealer location
			location = new Microsoft.Maps.Location(data.lat, data.lng), infoboxOption = {
				id : "infoDesc_" + data.pinid,
				width : 265,
				showCloseButton : false,
				offset : new Microsoft.Maps.Point(77, -117)
			};
			//add custom pushpin icon
			if (jdealer.find('.dealer-icon').length > 0) {//pushpin element can be found from dealer-result list
				pushpinIcon = '<span class="' + jdealer.find('.dealer-icon').attr("class") + ' ' + data.pinid + '">' + data.pinid + '</span>';
			} else {// for those dealer-result list which doesnt have pushpin icon definded
				pushpinIcon = '<span class="dealer-icon cat1 ' + data.pinid + '">' + data.pinid + '</span>';
			}
			//create pushpin
			var shape = new Microsoft.Maps.Pushpin(location, {
				htmlContent : pushpinIcon,
				width : 20,
				typeName : "customDealerPin"
			});

			if ($(".owner-map").size()) {
				infoboxOption.description = '<div class="dealer-flyout" id="infoDesc_' + data.pinid + '">' + ( selectable ? '<p class="selectdealer"><a href="javascript:void(0)" onclick="ND.dealerLocator.selectById(\'' + data.id + '\',\'' + data.dealerinfo + '\')">' + data.selectDealer + '</a></p>' : '' ) + '<h3>' + jdealer.find(".dealername").html() + "</h3><p>" + jdealer.find(".address").html() + "</p><p>" + jdealer.find(".contact").html() + "</p></div>";
			} else {
				if ($(".dealer-map-pagination").size()) {
					infoboxOption.description = '<div class="dealer-flyout" id="infoDesc_' + data.pinid + '">' + ( selectable ? '<p class="selectdealer"><a href="javascript:void(0)" onclick="ND.dealerLocator.selectById(\'' + data.id + '\',\'' + data.dealerinfo + '\')">' + data.selectDealer + '</a></p>' : '' ) + jdealer.find(".dealername").html() + jdealer.find(".contact").html() + "</div>";
				} else {
					infoboxOption.description = '<div class="dealer-flyout" id="infoDesc_' + data.pinid + '">' + ( selectable ? '<p class="selectdealer"><a href="javascript:void(0)" onclick="ND.dealerLocator.selectById(\'' + data.id + '\',\'' + data.dealerinfo + '\')">' + data.selectDealer + '</a></p>' : '' ) + '<h3>' + jdealer.find(".dealername").html() + "</h3><p>" + jdealer.find(".contact").html() + "</p></div>";
				}
			}
			//create info box for pushpin, set the default location to the infobox, the default location should be the same with its pushpin location
			var infobox = new Microsoft.Maps.Infobox(location, infoboxOption);
			//display infobox
			scope.displayInfobox(shape, infobox, location, data.pinid);
			//add info box to map
			scope.map.entities.push(infobox);
			//add pushpin to the map
			scope.map.entities.push(shape);
			scope.shapes[data.pinid] = data;
		},
		/**
		 * To switch the infobox position from pushpin left to pushpin right if the pushpin is located at the right of the map
		 * To switch the infobox position from bottom of the pushpin to the top if the pushpin is located at the bottom of the map
		 * the idea is find the center of the map, compare with the pushpin location, reset the related infobox location
		 *
		 * @param shape, current pushpin object
		 * @param infobox, current infobox object
		 * @param location, defalut infobox location
		 * @param pinId, unique id to identify the current pushpin
		 */
		displayInfobox : function(shape, infobox, location, pinId) {
			var scope = this, thisInfobox = {};
			//add event to pushpin, a tricky way to show the info box while mouseovering pushpin.
			Microsoft.Maps.Events.addHandler(shape, 'mouseover', function() {
				//set to the default location before each show , as the location will be overrided under specific case (eg, map offset to the right, override infobox location to show it at left of the map center)
				infobox.setLocation(location);
				//find the current info box
				thisInfobox = $(".MicrosoftMap #infoDesc_" + pinId).closest(".Infobox");
				//find mapCenter and transform it to pixel
				//find pushPinLocation and transform it to pixel
				//define infobox offset, the entire infobox offset should be include: "infobox width(that is infoboxWidth)", "infobox arrow width(that is infoarrowWidth)", "pushpin width(that is pushpinWidth)" and infobox itself default offset
				var mapCenter = scope.map.tryLocationToPixel(scope.map.getCenter(), Microsoft.Maps.PixelReference.control), pushPinLocation = scope.map.tryLocationToPixel(shape.getLocation(), Microsoft.Maps.PixelReference.control), infoboxLocation = infobox.getLocation(), infoboxPixel = scope.map.tryLocationToPixel(infoboxLocation, Microsoft.Maps.PixelReference.control), infoarrowWidth = thisInfobox.find(".infobox-stalk").outerWidth(), pushpinWidth = shape.getWidth(), infoboxWidth = thisInfobox.outerWidth(), hasLeftClass = false, hasTopClass = false,
				//define infobox offset
				infoboxHeight = thisInfobox.outerHeight();
				//map offset right, should display infobox on the left of pushpin
				if (pushPinLocation.x > mapCenter.x) {
					infoboxPixel.x = infoboxPixel.x - infoarrowWidth - pushpinWidth - infoboxWidth - 24;
					var infoboxDestinationLocationX = scope.map.tryPixelToLocation(new Microsoft.Maps.Point(infoboxPixel.x, infoboxPixel.y), Microsoft.Maps.PixelReference.control);
					//class will be removed after reset the location
					infobox.setLocation(infoboxDestinationLocationX);
					hasLeftClass = true;
				}
				//map offset bottom, should display infobox on the top of pushpin
				if (pushPinLocation.y > mapCenter.y) {
					infoboxPixel.y = infoboxPixel.y - infoboxHeight + 55;
					var infoboxDestinationLocationY = scope.map.tryPixelToLocation(new Microsoft.Maps.Point(infoboxPixel.x, infoboxPixel.y), Microsoft.Maps.PixelReference.control);
					//class will be removed after reset the location
					infobox.setLocation(infoboxDestinationLocationY);
					hasTopClass = true;
				}

				if (hasLeftClass) {
					thisInfobox.addClass("left");
				}
				if (hasTopClass) {
					thisInfobox.addClass("top");
				}

				thisInfobox.css("visibility", "visible");
			});
			Microsoft.Maps.Events.addHandler(shape, 'mouseout', function() {
				thisInfobox.css("visibility", "hidden");
			});
			Microsoft.Maps.Events.addHandler(infobox, 'mouseenter', function() {
				thisInfobox.css("visibility", "visible");
			});
			Microsoft.Maps.Events.addHandler(infobox, 'mouseleave', function() {
				thisInfobox.css("visibility", "hidden");
			});
			//hide infobox when map veiw change
			Microsoft.Maps.Events.addHandler(scope.map, 'viewchangestart', function() {
				$(".MicrosoftMap .Infobox").css("visibility", "hidden");
			});
		},
		setMapViewV7 : function(data) {
			var collectionCordindates = new Array();
			for (var i = 0; i < data.length; i++) {
				collectionCordindates.push(new Microsoft.Maps.Location(data[i].lat, data[i].lng));
			}
			//only one dealer found
			if (collectionCordindates.length == 1) {
				this.map.setView({
					center: collectionCordindates[0],
					zoom: 16
				});
			}else if (collectionCordindates.length > 1){
				this.map.setView({
					bounds: Microsoft.Maps.LocationRect.fromLocations(collectionCordindates)
				});
			}
			
		},
		/**
		 * define search, add and display routine on the map
		 *
		 * @param startPoint, start place string entered by user.
		 * @param endPoint, current destination coordinates
		 * @param lang, object contains information for search (eg, error message)
		 * @param callbackfn, run after loadRoute function excute success, set "working" flag back to false
		 */
		loadRouteV7 : function(startPoint, endPoint, lang, callbackfn) {
			$('#map-direction-list').html('');

			var im = this;
			//define RequestOptions
			var requestOptions = {
				avoidTraffic : true,
				routeDraggable : false
			}
			//define renderOptions
			var renderOptions = {
				itineraryContainer : document.getElementById("map-direction-list"),
				displayManeuverIcons : false,
				displayPostItineraryItemHints : false,
				displayPreItineraryItemHints : false,
				displayRouteSelector : false,
				displayStepWarnings : false,
				displayTrafficAvoidanceOption : false,
				displayWalkingWarning : false
			}
			Microsoft.Maps.loadModule('Microsoft.Maps.Directions', {
				callback : function() {

					if (!im.directionsManager) {
						im.directionsManager = new Microsoft.Maps.Directions.DirectionsManager(im.map);
					}
					//remove all waypoints and routine before each search
					im.directionsManager.resetDirections();
					//define start and end point
					var startWaypoint = new Microsoft.Maps.Directions.Waypoint({
						address : startPoint + " " + im.country
					});
					var endWaypoint = new Microsoft.Maps.Directions.Waypoint({
						location : new Microsoft.Maps.Location(endPoint.lat, endPoint.lng)
					});

					//add start and end point
					im.directionsManager.addWaypoint(startWaypoint);
					im.directionsManager.addWaypoint(endWaypoint);
					//Reset distance unit in options(Route Table);
					lang.unit = $('#dealer-locator-maps').embeddedData()["xhr-distance-unit"] == "miles" ? "mi" : "km";
					//Reset distance unit in Bing Map
					requestOptions.distanceUnit = lang.unit == "mi" ? Microsoft.Maps.Directions.DistanceUnit.miles : Microsoft.Maps.Directions.DistanceUnit.kilometers;
					// Set request options
					im.directionsManager.setRequestOptions(requestOptions);
					// Set the render options
					im.directionsManager.setRenderOptions(renderOptions);
					// define error messages when error occurs (eg, 2 destinations can not be reached)
					Microsoft.Maps.Events.addHandler(im.directionsManager, 'directionsError', function() {
						alert(lang.fail);
					});
					// display the route on the map
					im.directionsManager.calculateDirections();
					callbackfn();
				}
			});
		},
		loadDirections : function(route, lang) {
			var legs = route.RouteLegs;
			var turns = '<tr><td class="total" colspan="3"><span>' + lang.total + '</span> ' + route.Distance.toFixed(1) + ' ' + lang.unit + '</td></tr>';
			var numTurns = 0;
			var leg = null;
			// console.log(legs.length, route.Distance);
			if (legs.length > 60 || route.Distance > 1000) {
				this.map.DeleteRoute();
				this.map.ShowMessage(lang.tofar);
			} else if (legs.length > 0) {
				//this.map.DeleteAllShapes()
				//this.addMarker(this.shapes[0]);
				for (var i = 0; i < legs.length; i++) {
					leg = legs[i];
					var turn = null;
					turns += '<tr>';
					for (var j = 0; j < leg.Itinerary.Items.length; j++) {

						turn = leg.Itinerary.Items[j];
						turns += '<td class="num">' + (numTurns == 0 ? '' : numTurns) + '</td>';
						turns += '<td>' + turn.Text + '</td>';
						turns += '<td class="dist">' + turn.Distance.toFixed(1) + ' ' + lang.unit + '</td>';
						if (j + 1 < leg.Itinerary.Items.length) {
							turns += '<tr></tr>';
						}
						numTurns++;
					}
					turns += '</tr>';
				}
				$('#map-direction-list').html('<table class="map-directions">' + turns + '</table>');
			} else {
				this.map.ShowMessage(lang.fail);
			}
		},

		/**
		 * use the following methods for bing map Version 6.2
		 */
		init : function(options) {
			this.country = options.country;
			var map = this.map = new VEMap(options.mapId);
			this.resetMarkers();

			if (options['key'] != undefined) {
				map.SetCredentials(options.key);
			}

			//Distance Unit: Kilometers or Miles?
			this.unit = $('#dealer-locator-maps').embeddedData()["xhr-distance-unit"] == "miles" ? VEDistanceUnit.Miles : VEDistanceUnit.Kilometers;

			map.SetDashboardSize(VEDashboardSize.Small);
			map.LoadMap(new VELatLong(options.lat, options.lng), options.zoom, VEMapStyle.road, false);
			map.SetScaleBarDistanceUnit(this.unit);
		},
		loadMap : function(options) {
			this.map.LoadMap(new VELatLong(options.lat, options.lng), options.zoom, VEMapStyle.road, false);
		},
		addMarker : function(data, selectable) {
			var jdealer = $('#' + data.id);
			var shape = new VEShape(VEShapeType.Pushpin, new VELatLong(data.lat, data.lng));

			if (jdealer.find('.dealer-icon').length > 0) {//pushpin element can be found from dealer-result list
				shape.SetCustomIcon('<span class="' + jdealer.find('.dealer-icon').attr("class") + ' ' + data.pinid + '">' + data.pinid + '</span>');
			} else {// for those dealer-result list which doesnt have pushpin icon definded
				shape.SetCustomIcon('<span class="dealer-icon ' + data.pinid + '">' + data.pinid + '</span>');
			}

			if ($(".owner-map").size()) {
				shape.SetDescription('<div class="dealer-flyout">' + ( selectable ? '<p class="selectdealer"><a href="javascript:void(0)" onclick="ND.dealerLocator.selectById(\'' + data.id + '\',\'' + data.dealerinfo + '\')">' + data.selectDealer + '</a></p>' : '' ) + '<h3>' + jdealer.find(".dealername").html() + "</h3><p>" + jdealer.find(".address").html() + "</p><p>" + jdealer.find(".contact").html() + "</p></div>");
			} else {
				if ($(".dealer-map-pagination").size()) {
					shape.SetDescription('<div class="dealer-flyout">' + ( selectable ? '<p class="selectdealer"><a href="javascript:void(0)" onclick="ND.dealerLocator.selectById(\'' + data.id + '\',\'' + data.dealerinfo + '\')">' + data.selectDealer + '</a></p>' : '' ) + jdealer.find(".dealername").html() + jdealer.find(".contact").html() + "</div>");
				} else {
					shape.SetDescription('<div class="dealer-flyout">' + ( selectable ? '<p class="selectdealer"><a href="javascript:void(0)" onclick="ND.dealerLocator.selectById(\'' + data.id + '\',\'' + data.dealerinfo + '\')">' + data.selectDealer + '</a></p>' : '' ) + '<h3>' + jdealer.find(".dealername").html() + "</h3><p>" + jdealer.find(".contact").html() + "</p></div>");
				}
			}
			this.map.AddShape(shape);
			this.shapes[shape.GetID()] = data;
		},
		setMapView : function(data) {
			var collectionCordindates = new Array();
			for (var i = 0; i < data.length; i++) {
				collectionCordindates.push(new VELatLong(data[i].lat, data[i].lng));
			}

			if (collectionCordindates.length != 0) {
				this.map.SetMapView(collectionCordindates);
			}
		},
		loadRoute : function(startPoint, endPoint, lang, callback) {
			// console.log("loadRoute");
			$('#map-direction-list').html('');
			$('#map-directions-panel').parent().addClass("loading");
			var im = this;
			var options = new VERouteOptions();

			//Reset distance unit in options(Route Table);
			lang.unit = $('#dealer-locator-maps').embeddedData()["xhr-distance-unit"] == "miles" ? "mi" : "km";
			//Reset distance unit in Bing Map
			options.DistanceUnit = lang.unit == "mi" ? VERouteDistanceUnit.Kilometer : VERouteDistanceUnit.Kilometer;

			options.RouteColor = new VEColor(0, 55, 134, 1);
			options.RouteWeight = 3;
			options.RouteCallback = function(route) {
				$('#map-directions-panel').parent().removeClass("loading");
				if (route != undefined) {
					im.loadDirections.apply(im, [route, lang]);
				}
				callback.call();
			};
			this.map.GetDirections([startPoint + " " + this.country, new VELatLong(endPoint.lat, endPoint.lng)], options);
		}
	};

	var DealerLocator = function(options) {
		this.init(options)
	};
	DealerLocator.prototype = {
		init : function(options) {
			//detemine whether the bing map version is 7
			this.isVersion7 = true;
			if ( typeof (Microsoft) == "undefined" || typeof (Microsoft.Maps) == "undefined") {
				this.isVersion7 = false;
			}
			options.isVersion7 = this.isVersion7;
			this.options = options;
			this.load();
		},
		load : function() {
			this.map = new InteractiveMap(this.options);
		},
		setSearch : function(data) {
			if (data.length > 0) {
				this.load();
				this.map.resetMarkers();
				this.isVersion7 ? this.map.setMapViewV7(data) : this.map.setMapView(data);
				var selectable = data.length > 1;
				for (var i = 0; i < data.length; i++) {
					this.addDealer(data[i], selectable);
				}
			}
		},
		addDealer : function(dealer, selectable) {
			//the "select this dealer" needs to be publishble, get it from translation
			dealer.selectDealer = "Select this dealer";
			if($("#dealer-translations").length > 0){
				var selectDealer = $("#dealer-translations").embeddedData().SelectThisDealer;
				if(selectDealer){
					dealer.selectDealer = selectDealer;
				}
			}
			this.isVersion7 ? this.map.addMarkerV7(dealer, selectable) : this.map.addMarker(dealer, selectable);
		},
		findRoute : function(startPoint, endPoint, lang, callback) {
			if (startPoint != undefined && endPoint != undefined) {
				this.isVersion7 ? this.map.loadRouteV7(startPoint, endPoint, lang, callback) : this.map.loadRoute(startPoint, endPoint, lang, callback);
			}
		}
	};

})(jQuery);

// pre-populate the service type on dealer locater page - Ford China
(function($) {
	var serviceTypePopulate = function() {

		var url = window.location.href;
		var key = "serviceType";

		var type = $.getQueryVariable(url, key);

		if (type) {
			$(".dealer-form-siderbar select[name='specialities']").val(type);
		}

	};

	$(function() {
		if ($(".dealer-form-siderbar select[name='specialities']").length > 0) {
			serviceTypePopulate();
		}
		/**
		 * due to increasing spacing between the relative ".print" button and ".dealer-results-map",
		 * set the spacing dynamically will fix the lack of spacing issue of relateive ".print" btn in the future
		 */
		var printBtn = $(".content-high > .hardpanel + .dealer-results-map > .print");
		//identify deeply to prevent conflict with other "print" btn in other pages if have
		dealerRsIllustrator = $(".content-high > .hardpanel .dealer-results-illustrator");
		if (printBtn.length > 0 && dealerRsIllustrator.length > 0) {// if both of them exist
			var spacing = dealerRsIllustrator.outerHeight(true);
			printBtn.css("top", "-=" + spacing);
		}

	});
})(jQuery);
