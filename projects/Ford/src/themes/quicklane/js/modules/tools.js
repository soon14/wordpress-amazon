/*
Author: 		Randell Quitain
File name: 		tools.js
Description: 	Global tools
Dependencies: 	jQuery
Usage: 			// encode a url string - param: url/string
				qlApp.tools.encode(uri);

				// decode a url string - param: url/string
				qlApp.tools.decode(uri);
				
				// get specifically the #rest-services data
				qlApp.tools.restServicesData();
				
				// get specifically the #common-config data
				qlApp.tools.commonConfigData();
				
				// get a custom x-json script data - param: x-json script id
				qlApp.tools.getEmbeddedData(id);
				
				// get object length - param: object
				qlApp.tools.getObjectLength(obj);

				// check if object is empty - param: object
				qlApp.tools.isEmpty(obj);

				// check if browser currently used is IE, returns boolean - param: IE version, comparison
				// is it IE8?
				qlApp.tools.isIE(8);

				// is it less than or equal to IE 6?
				qlApp.tools.isIE(7, 'lte');
				
				// cleans a object data that is not grouped based on its index suffix (billboard rest returns this kind of json structure), so for example;

				// if your data return is like this:

				var data = {
					"title_0": "Title 0",
					"desc_0": "Desc 0",
					"title_1": "Title 1",
					"desc_1": "Desc 1",
					"title_2": "Title 2",
					"desc_2": "Desc 2"
				}
				
				qlApp.tools.cleanData(data);

				// returns:

				{
					0: {
						"title_0": "Title 0",
						"desc_0": "Desc 0"
					},
					1: {
						"title_1": "Title 1",
						"desc_1": "Desc 1"
					},
					2: {
						"title_2": "Title 2",
						"desc_2": "Desc 2"
					}
				}

				// check if iOS browser, returns true if iOS
				Example: qlApp.tools.isIOS()?true:false;
				qlApp.tools.isIOS();

				//check if device is mobile [or not]
				qlApp.tools.isMobile();

*/

var qlApp = qlApp || {};

(function($){
	qlApp.tools = {

		encode: function (uri) {
			if (!uri) { return null; }
			return encodeURIComponent(uri) || null;
		},
		decode: function (uri) {
			if (!uri) { return null; }
			return decodeURIComponent(uri) || null;
		},
		restServicesData: function() {
			if ($('#rest-services').length){
				return $('#rest-services').embeddedData();
			} else {
				return null;
			}
		},
		commonConfigData: function() {
			if ($('#common-config').length){
				return $('#common-config').embeddedData();
			} else {
				return null;
			}
		},
		getEmbeddedData: function(id) {
			if ($(id).length){
				return $(id).embeddedData();
			} else {
				return null;
			}
		},
		getObjectLength: function(obj) {
			var getLength = 0;
			for(var prop in obj) {
				(obj.hasOwnProperty(prop)) ? getLength++ : getLength;
			}
			return getLength;
		},
		isEmpty: function(obj) {
			for(var prop in obj) {
				if(obj.hasOwnProperty(prop))
					return false;
			}
			return true;
		},
		cleanData: function(data) {
			var cleaned = [];
			for(var key in data){
				var suffix = key.match(/\d/);
				// the following will create the new "group" in the master cleaned variable if it doesn't exist
				if(!cleaned[suffix]){cleaned[suffix] = {};}
				cleaned[suffix][key] = data[key];
			}
			return cleaned;
		},
		slugify: function(string) {
			/*
			 * this function converts a normal string to a slug format - lowercased, hyphened and sanitized
			 * ie. from: ABCD - (EFgh)
			 *       to: abcd-efgh
			 */

			// sanitize
			string = $.trim(string.replace(/([~!@#$%^&*()_-]+)(\s)?/g, ''));
			
			return string.toLowerCase().replace(/\s/g, "-");
		},
		isIE: function(version, comparison) {
			var cc = 'IE',
				b = document.createElement('B'),
				docElem = document.documentElement,
				isIE;

			if(version){
				cc += ' ' + version;
				if(comparison){ cc = comparison + ' ' + cc; }
			}

			b.innerHTML = '<!--[if '+ cc +']><b id="iecctest"></b><![endif]-->';
			docElem.appendChild(b);
			isIE = !!document.getElementById('iecctest');
			docElem.removeChild(b);
			return isIE;
		},
		loader: function(element) {
			element.prev('.loading').remove();
			element.removeClass('module-loader');
		},
		imageLoader: function(element, callback) {
			var imgLoad = imagesLoaded( element );
			imgLoad.on( 'always', function( instance ) {
				// show carousel nav
				if(qlApp.viewport.view !== "mobile" && $('.flex-direction-nav', element).length > 0) { $('.flex-direction-nav', element).show(); }
				if(typeof callback === "function") { callback(); }
			}).promise().done(function(){
				qlApp.billboardCarousel.init();
			});
		},
		isBingMap: function(){
			if(typeof (Microsoft) != "undefined" && typeof (Microsoft.Maps) != "undefined"){
				return true;
			}
			return false;
		},
		isAutoNaviMap: function(){
			if(typeof (AMap) != "undefined" && typeof (AMap.Map) != "undefined"){
				return true;
			}
			return false;
		},
		isIOS: function(){
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		getMonth: function() {

			// return current month in a number i.e. 6 (for July) and then add one to make 7 for July
			var d = new Date();
			return d.getMonth() + 1;
		},
		getYear: function() {

			// return current year in a four digit number i.e. 2015
			var d = new Date();
			return d.getFullYear();
		},
		numberCommas: function(num) {

			// convert a number to a string with commas
			num = num.toString().replace(/,/g, '');
			return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		},

		removeCommas: function(str) {

			// remove commas from a string and then convert to a number
			var removeCommas = str.replace(/,/g,'');
	    	return parseFloat(removeCommas, 10);
		},

		equalHeight: function(){
			var elem = arguments,
				maxHeight = 0;

			$(elem).each(function(){
				var self = $(this);

				if (self.outerHeight(true) > maxHeight){
					maxHeight = self.outerHeight(true);
				}
			});

			return maxHeight;
		},

		isMobile: function(){
			var isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/);
			return isMobile;
		}


	
	}

})(jQuery);