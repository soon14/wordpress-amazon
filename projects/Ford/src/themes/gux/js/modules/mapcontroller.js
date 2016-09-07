/*
Author: 		Ruiwen Qin
File name: 		mapcontroller.js
Description: 	load bing map
Dependencies: 	jQuery 
Usage: 			NOT BEING USED IN GUX
*/

var guxApp = guxApp || {};

(function($){
	guxApp.mapController = {
		init: function(){
			if(!$("#map-container").length) {return;}

			var mapContainer = $("#map-container"),
				windowWidth = $(window).width(),
				mapContainerHeight = windowWidth * 0.37;

			if ($(window).width() < 1024) {
				mapContainerHeight = windowWidth * 0.8;
			}

			mapContainer.css("height", mapContainerHeight); //set the height of the map container as 40% of its width

			if ($("#map-options").length){
				mapOptions = $("#map-options").embeddedData(); //read the map configuration data
			}

			//create the map object
			map = new Microsoft.Maps.Map(document.getElementById("map-container"),
				{
					credentials: mapOptions.credentials,
					center: new Microsoft.Maps.Location(mapOptions.lat,mapOptions.lng),
					mapTypeId: Microsoft.Maps.MapTypeId.road,
					showMapTypeSelector: mapOptions.showMapTypeSelector,
					zoom:mapOptions.zoom
				});


			dataLayer = new Microsoft.Maps.EntityCollection();
			map.entities.push(dataLayer);

			//add infobox popup
			infoboxLayer = new Microsoft.Maps.EntityCollection();
			map.entities.push(infoboxLayer);

			infobox = new Microsoft.Maps.Infobox(new Microsoft.Maps.Location(0, 0), { visible: false, offset: new Microsoft.Maps.Point(0, 20) });
			infoboxLayer.push(infobox);

			guxApp.mapController.dropPins();
		},
		dropPins: function(){
			//read dealers information
			if ($("#pins-data").length){
				var pins = $("#pins-data").embeddedData();
			}

			var pushpinOptions = {
				icon: ''
			};

			var locs = [];

			// loop through pushpins
			for (var pin in pins){
				pushpinOptions.text = String(parseInt(pin)+1);
				pushpinOptions.typeName = pins[pin].id;
				pushpinOptions.id = pins[pin].id;

				var pushpin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(pins[pin].latitude,pins[pin].longitude),pushpinOptions);
								
				Microsoft.Maps.Events.addHandler(pushpin, 'click', guxApp.mapController.displayInfobox); //bind click event onto pins

				locs.push(pushpin.getLocation());

				dataLayer.push(pushpin);
			}

			var bestview = Microsoft.Maps.LocationRect.fromLocations(locs);

			map.setView({bounds:bestview});
		},
		displayInfobox: function(e){

			if (e.targetType == 'pushpin') {

                infobox.setLocation(e.target.getLocation());

                //read dealers information
				if ($("#pins-data").length){
					var dealer = $("#pins-data").embeddedData();
				}
				
				var tmpl 	= _.template(guxApp.mapController.template),
					pinNum 	= e.target._text - 1;

                // display infobox and inject relevant HTML
                infobox.setOptions({ 
					visible: 		true, 
					htmlContent: 	tmpl(dealer[pinNum]),
					offset: 		new Microsoft.Maps.Point(28,-174)
				});

				var directionsLnk 	= $(".infobox").find(".directions a"),
					bingURL 		= "http://www.bing.com/maps/default.aspx?rtp=pos." + guxApp.mapController.currentLat + "_" + guxApp.mapController.currentLong + "~pos." + dealer[pinNum].latitude + "_" + dealer[pinNum].longitude + "&style=r";
				
				directionsLnk.attr("href", bingURL);
            }
		},
		addDirections: function(){
			if ($("#pins-data").length){
				var dealers = $("#pins-data").embeddedData();
			}
			
			var listItems 		= $(".dealer-items .slides > li:not('.clone')"),
				preferredLat	= dealers[0].latitude,
				preferredLong	= dealers[0].longitude,
				preferredURL 	= "http://www.bing.com/maps/default.aspx?rtp=pos." + guxApp.mapController.currentLat + "_" + guxApp.mapController.currentLong + "~pos." + preferredLat + "_" + preferredLong + "&style=r";

			// inject preferred dealer directions bing URL
			$(".preferred-dealer, .bing-directions").attr("href", preferredURL);

			// loop through mobile dealer list items and inject relevant dealer directions bing URL
			listItems.each(function(idx, litem) {
				var directionsBtn 	= $(litem).find("a.bing-directions"),
				bingURL 		= "http://www.bing.com/maps/default.aspx?rtp=pos." + guxApp.mapController.currentLat + "_" + guxApp.mapController.currentLong + "~pos." + dealers[idx].latitude + "_" + dealers[idx].longitude + "&style=r";
				
				directionsBtn.attr("href", bingURL);
			});
		}
	};

	$(function(){
		// since geolocation/ip location is not implemented at this time, dummy latitude (currentLat) and 
		// longitude (currentLong) are used below for the current users location (dummy location is Sydney 2000)
		guxApp.mapController.currentLat 	= -33.874001;
		guxApp.mapController.currentLong 	= 151.203003;

		// set HTML template for dealer infobox's
		guxApp.mapController.template = $("#infobox-template").html();

		$(".mini-dealer .revealer-open").on("click", function() {
			if ($(this).hasClass("active")) {
				guxApp.mapController.init();
			}
		});

		// function that adds bing URL with route to each directions link/button
		// run on document load
		if ($("#pins-data").length){
			guxApp.mapController.addDirections();
		}
	});

})(jQuery);