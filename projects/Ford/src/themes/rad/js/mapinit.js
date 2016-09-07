/*
Author: York Zhang
Description: Owner Dealer locator initialize
*/

(function($){

	var dealerMap = {
		resizeMap: function(data){
			if ($(window).width() < 960) {

				var currentWidth = $(window).width(),
					newHeight = currentWidth * 0.485;

				$('#dealer-map').css({
					'height'	: newHeight,
					'width'		: $(window).width()
				});

	  		} else {
	  			$('#dealer-map').css({
	  				'height' 	: 415,
	  				'width' 	: 960
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
	  			if($("body").hasClass("ie8")&& typeof(Microsoft) != "undefined" && typeof(Microsoft.Maps) != "undefined"){
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
		// if dealer-map-pagination class exists, terminate and execute apa-dealerMap.js
		if($(".dealer-map-pagination").size()){return;}
		
		if(!$(".dealer-map").size()) {return;}




		var mapData = $("#map-data").size() ? $("#map-data").embeddedData() : {};
		var pinsData = $("#pins-data").size() ? $("#pins-data").embeddedData() : {};
		var directionsData = $("#directions-data").size() ? $("#directions-data").embeddedData() : {};

		if(pinsData.length > 0 && !dealerMap.isEmptyObject(pinsData) ){

			$.each(pinsData, function(i,pin){
				ND.dealerLocator.add(pin);
/*				ND.dealerLocator.add({
					pinid: parseInt(pin.pinid),
					id: pin.id,
					dealerinfo: pin.dealerinfo,
					lat: pin.lat,
					lng: pin.lng
				});*/
			});

		}

		if(!dealerMap.isEmptyObject(directionsData)){
			ND.dealerLocator.directions(directionsData.endPoint, directionsData.information);
		}


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


	});

})(jQuery);


