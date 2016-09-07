/*
*Author: Ruiwen Qin
*Description: 1. Drop pins on the dealer locator map
*					- Cookie does not exist: preferred dealer data is not available, other dealer info pins are dropped on the map
*					- Cookie exists: drop preferred dealer pin and other dealer info pins
*			  2. Pagination clicking events
*					- when pagination is clicked, pins data are retrieved and reload the map
*/

(function($){

	var dealerMap = {
		count: 0,
		step: 0,
		currentPage: 1,
		
		mapInit: function(){

			var filteredData = [];
			var mapData = $("#map-data").size() ? $("#map-data").embeddedData() : {};
			var pinsData = $("#pins-data").size() ? $("#pins-data").embeddedData() : {};
			var directionsData = $("#directions-data").size() ? $("#directions-data").embeddedData() : {};
			preferredDealer = {};

			dealerMap.step = $("#dealer-results-perpage").size() ? $("#dealer-results-perpage").embeddedData() : 1;
			dealerMap.step = parseInt(dealerMap.step.perpage);
			
			dealerMap.loadMap(mapData);
			

			// coming from dealer.js when cookie is found or when user is logged in
			$.subscribe("apa-preferred-dealer-mapPin", (function(_,data){
				preferredDealer = dealerMap.preferredDealerData(data,preferredDealer);
				filteredData = dealerMap.filterData(pinsData,filteredData,true);
				
				dealerMap.dropPins(filteredData,preferredDealer);
				dealerMap.loadMap(mapData);
				$(".dealer-results .preferred-dealer").addClass("unhide");
			}));

			// coming from dealer.js when cookie is NOT found AND when user is NOT logged in
			$.subscribe("apa-preferred-dealer-mapPin-notLoggedIn", (function(){
				filteredData = dealerMap.filterData(pinsData,filteredData,true);
				dealerMap.dropPins(filteredData,preferredDealer);
				dealerMap.loadMap(mapData);
				// $(".dealer-results .preferred-dealer").addClass("hide");
			}));

			// coming from slider.js when slider is loaded
			$.subscribe("sliderLoaded", (function(){
				dealerMap.currentPage = 1;
				dealerMap.count = 1;
			}));			

			// coming from slider.js when next button is clicked
			$.subscribe("slideNext", (function(_,slideCurrent){
				dealerMap.reloadMap(slideCurrent,filteredData,pinsData,preferredDealer,mapData);
			}));

			// coming from slider.js when prev button is clicked
			$.subscribe("slidePrev", (function(_,slideCurrent){
				dealerMap.reloadMap(slideCurrent,filteredData,pinsData,preferredDealer,mapData);
			}));

			// coming from slider.js when full pagination numbers are clicked
			$.subscribe("pagerClick", (function(_,currentIndex){
				dealerMap.reloadMap(currentIndex,filteredData,pinsData,preferredDealer,mapData);
			}));

			// $.subscribe("apa-set-preferred-dealer", (function(_,dealerCode){

			// }));

		},

		preferredDealerData: function(data,preferredDealer){
			preferredDealer.pinid = "preferred";
			preferredDealer.id = data.dealerCode;
			preferredDealer.dealerinfo = "dealer_" + data.localDealerCode;
			preferredDealer.lat = data.latitudeLongitude.latitude;
			preferredDealer.lng = data.latitudeLongitude.longitude;

			return preferredDealer;
		},

		reloadMap: function(slideCurrent,filteredData,pinsData,preferredDealer,mapData){
			if (instance.isMobile()){
				dealerMap.count = slideCurrent;
			}
			else{
				dealerMap.count = slideCurrent * dealerMap.step;
			}
			
			filteredData = dealerMap.filterData(pinsData,filteredData,false);

			dealerMap.dropPins(filteredData,preferredDealer);
			dealerMap.loadMap(mapData);
		},

		filterData: function(pinsData,filteredData,dataInit){
			
			filteredData = [];
			if (dataInit){
				dealerMap.count = 0;
			}

			if (instance.isMobile()){
				if (pinsData[dealerMap.count] !== undefined || preferredDealer.id !== pinsData[dealerMap.count].id){
					filteredData.push(pinsData[dealerMap.count]);
				}	
			}
			else {

				for (var i = dealerMap.count; i < dealerMap.count + dealerMap.step; i++){
					if (pinsData[i] !== undefined){
						if (preferredDealer.id !== pinsData[i].id){
							filteredData.push(pinsData[i]);
						}
						
					}
					
				}
			}

			return filteredData;
		},

		dropPins: function(filteredData,preferredDealer){
			
			ND.dealerLocator.data = [];
			if(filteredData.length > 0 && !dealerMap.isEmptyObject(filteredData) ){
				$.each(filteredData, function(i,pin){
					ND.dealerLocator.add(pin);
				});



			}

			if(!dealerMap.isEmptyObject(preferredDealer) ){
				ND.dealerLocator.add(preferredDealer);
			}
			

		},

		loadMap: function(mapData){
			dealerMap.resizeMap(mapData);
			//in IE8 window resize will not only triggered by resize window.
			//the following code is to prevent resize event triggered not by window resize under ie8
			var windowWidth = $(window).width();
				windowHeight = $(window).height();
			
			$(window).on('resize', function() {
				if($(window).width()!=windowWidth || $(window).height()!=windowHeight){
					dealerMap.resizeMap(mapData);
				}
			});
		},

		resizeMap: function(data){
			if ($(window).width() < 960) {
				
				var mapContainerWidth = $(".dealer-map").width(),
					newHeight = mapContainerWidth * 0.609;
				$('#dealer-map').css({
					'width'		: mapContainerWidth,
					'height'	: newHeight
				});
			}

	  		if(dealerMap.isEmptyObject(data)){
	  			//bing map version7 has an issue - "Can't move focus to the control because it is invisible, not enabled, or of a type that does not accept the focus"
	  			//occured only if version7 and ie8
	  			//this possible becasue bing map version7 has something load slower than $(document).ready
	  			if($("body").hasClass("ie8")&& typeof(Microsoft) != "undefined" && typeof(Microsoft.Maps) != "undefined"){
	  				setTimeout("ND.dealerLocator.init()",2000);
	  			}else{
	  				ND.dealerLocator.init();
	  			}
	  		}else{
	  			//bing map version7 has an issue - "Can't move focus to the control because it is invisible, not enabled, or of a type that does not accept the focus"
	  			//occured only if version7 and ie8
	  			//this possible becasue bing map version7 has something load slower than $(document).ready
	  			if($("body").hasClass("ie8") && typeof(Microsoft) != "undefined" && typeof(Microsoft.Maps) != "undefined"){
	  				setTimeout("ND.dealerLocator.init('"+data.zoomLevel+"','"+data.lng+"','"+data.lat+"','"+data.key+"','"+data.country+"')",2000);
	  			}else{
	  				ND.dealerLocator.init(data.zoomLevel, data.lng, data.lat, data.key, data.country);
	  			}
	  		}
			

		},

		isEmptyObject: function(obj){
			for(var name in obj){
				return false;
			}
			return true;
		}

	};

	$(function(){
		if(!$(".dealer-map").size()) {return;}

		dealerMap.mapInit();

		

	});

})(jQuery);


