/*
 Author: 		Ray Huang
 File name: 		locationAware.js
 Description: 	auto detect user location by:
 address detection(dfy.u)->postCode detection(dfy.p)->IP detection(userInfo)
 Dependencies: 	jQuery, jquery.uniform.min.js, cookie.js
 Usage:
 */

var guxApp = guxApp || {};

(function($) {
	guxApp.locationAware = {
		/**
		 * detect location by :
		 * address detection(dfy.u)->IP detection(userInfo)
		 * @param callback, can be used if address detected
		 */
		locationDetection : function(callback) {
			//mocked cookie & sessionStorage for local testing
			//document.cookie=" dfy.u=%7B%22fn%22%3A%22TestOwner3%22%2C%22now%22%3A%22Mustang%22%2C%22s%22%3A%22OW%22%2C%22authid%22%3A%22311942%22%2C%22authby%22%3A%22005%3D%3D%3D%3D%3D%3D%3D%22%2C%22pcode%22%3A%22MUSTANG%22%2C%22pc%22%3A%223000%22%7D";
			//document.cookie=" dfy.u=%7B%22fn%22%3A%22TestOwner3%22%2C%22now%22%3A%22Mustang%22%2C%22s%22%3A%22OW%22%2C%22authid%22%3A%22311942%22%2C%22authby%22%3A%22005%3D%3D%3D%3D%3D%3D%3D%22%2C%22pcode%22%3A%22MUSTANG%22%2C%22pc%22%3A%22%22%7D";
			//document.cookie=" dfy.p=%7B%22fn%22%3A%22TestOwner3%22%2C%22pc%22%3A%22ggg%22%7D";
			//document.cookie=" dfy.p=%7B%22fn%22%3A%22TestOwner3%22%2C%22pc%22%3A%22%22%7D";
			//sessionStorage.setItem("dfy.p",'{"authState":"OW","pc":"2220"}');
			//sessionStorage.setItem("dfy.p",'{"authState":"OW","pc":""}');
			//document.cookie="userInfo=country_code=AU#region_code=SH#city=SHANGHAI#county=#zip=#latitude=-33.86#longitude=151.20";
			//document.cookie='userInfo=""';
			var self = this,
				mapController = guxApp.googleMapController,
				searchInput = $(".search-panel .input-panel input[type=text]"),
				searchKeyObj = {
					"dfy.u" : {
						"key" : ["pc"]
					},
					"userInfo" : {
						"key" : ["country_code", "latitude", "longitude"],
						"seperator" : "#"
					}
				};
			//switch between maps	
			/* if(guxApp.tools.isBingMap()){
				mapController = guxApp.bingMapController;
			}
			else  */if(guxApp.tools.isAutoNaviMap()) {
				mapController = guxApp.autonaviMapController;
			}
			//loadMap called before "mapController.init" callback, wait untill "mapController.init" has been loaded.
			var waitMap = setInterval(function() {
				if (mapController.mapAPI) {
					clearInterval(waitMap);
					var valueObj = {};
					//address detection(dfy.u)->postCode detection(dfy.p)->IP detection(userInfo)

					for (var i in searchKeyObj) {
						//address detection
						if (guxApp.cookie.get(i)) {
							valueObj = guxApp.cookie.getCookieVal(guxApp.cookie.get(i), searchKeyObj[i].key, searchKeyObj[i].seperator);
						} else {//if not in cookie, try search in sessionStorage
							if ( typeof sessionStorage != "undefined" && sessionStorage.getItem(i) != null) {
								valueObj = guxApp.cookie.getCookieVal(sessionStorage.getItem(i), searchKeyObj[i].key, searchKeyObj[i].seperator);
							}
						}

						if (searchKeyObj[i].key.length == 1) {
							var addressInfo = valueObj[searchKeyObj[i].key[0]];
						} else {
							var countryCode = $("#common-config").embeddedData().iso2country;
							if ((i == "userInfo") && valueObj.country_code && countryCode && (valueObj.country_code == countryCode)) {
								//var addressInfo = valueObj.latitude + "," + valueObj.longitude;
								var addressInfo = {
									lat : valueObj.latitude,
									lng : valueObj.longitude
								}
								searchInput.addClass("isIpDetection");
							}
						}
						
						//if location detected, jump out of the loop
						if (addressInfo) {break;}
					}
					//return address information in callback
					if(callback){callback(addressInfo,true);}
				}
			}, 1000);
		}
	}

})(jQuery); 