/**
 * @author: Sohrab Zabetian
 * @project: hotdeals
 * @description: use geopostion to find postcode/matching addresses using bing
 * 
 * How to use:
 * 
 *  ND.geoLocator(options).findLocation();
 * 
 * options : {
 * 		success(postcode (number) , address (Array) results for more advanced processing) [required]: when address is found,
 * 		error (error message) [required]: when address is not found,
 * 		enableHighAccuracy [optional, default false],
 *		maximumAge [optional, default 120000], 
 *		timeout[optional, default 60000]
 *	}
 */

ND.geoLocator = function(options) {
	var bingMapGeoLocatorUrl = "http://dev.virtualearth.net/REST/v1/Locations/";

	
	var $bingConfig = $('#bing-config');
	var $currentPositionTranslationConfig = $('#current-position-config');
	var bingMapsKey = "AneS6_OFtD0WZ43Xzp3kTumQpZGNxlycZiFErrnU6cmNmwqKFU3wRBZ7f80Q7MT6";
	if ($bingConfig.length) {
		var bingConfigData = $bingConfig.embeddedData();
		bingMapsKey = bingConfigData['bing-maps-key']; 
	}
	
	var currentPositionTranslationConfigData = {
		"geo-trans-denied-access-error" : "User denied the request for Geolocation",
		"geo-trans-loc-unavail-error" : "Location information is unavailable",
		"geo-trans-req-timeout-error" : "The request to get user location timed out",
		"geo-trans-unknown-error" : "Unknown error"
	};
	
	if ($currentPositionTranslationConfig.length) {
		currentPositionTranslationConfigData = $.extend(currentPositionTranslationConfigData,$currentPositionTranslationConfig.embeddedData());
	}
	
	var generalError = currentPositionTranslationConfigData['geo-trans-unknown-error'];
	var getPostalCodeByCoordinates = function(position) {
		var urlString = bingMapGeoLocatorUrl + position.coords.latitude + ", " + position.coords.longitude;
		$.ajax({
	      url: urlString,
	      dataType: "jsonp",
	      jsonp: "jsonp",
	      //timeout: 12000,
		  data: { key: bingMapsKey },
		  success: function (data) {
			 if (data && data.resourceSets && data.resourceSets.length > 0) {
				var result = data.resourceSets[0];
				if (result && result.estimatedTotal > 0 && result.resources.length > 0) {
					if (options.success) {
						var postcode = result.resources[0].address['postalCode'];
						options.success(postcode, result.resources);
					}
				} else {
//					console.dir(data);
					handleError(generalError);
				}
			 } else {
//				 console.dir(data);
				 handleError(generalError);
			 }
		  },
		  error: function(jqXHR, textStatus, errorThrown){
			  handleError(generalError);
	      }
	   });
	};
	
	var handleError = function(errorMsg) {
		if (options.error) {
			options.error(errorMsg);
		}
	};
	
	/**
	 * @param error.code	short	an enumerated value
	 */
	var locationNotFound = function(error) {
		var tranlatedError = generalError;
		switch(error.code) {
	    	case error.PERMISSION_DENIED:
	    		tranlatedError = currentPositionTranslationConfigData['geo-trans-denied-access-error'];//"User denied the request for Geolocation."
		      break;
		    case error.POSITION_UNAVAILABLE:
		    	tranlatedError = currentPositionTranslationConfigData['geo-trans-loc-unavail-error']; // 'Location information is unavailable.';
		      break;
		    case error.TIMEOUT:
		    	tranlatedError = currentPositionTranslationConfigData['geo-trans-req-timeout-error']; //"The request to get user location timed out."
		      break;
	    }
		
		handleError(tranlatedError);
	};
	
	return {
		findLocation : function() {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					getPostalCodeByCoordinates,
					locationNotFound,{
					enableHighAccuracy : options.highAccuracy || false,
					maximumAge:(options.maxAge || 120000), 
					timeout: (options.timeout || 60000)
					}
				);
			} else {
				handleError(generalError);
			}
		},
		
		locationNotFound: locationNotFound
	};
};