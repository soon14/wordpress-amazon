/*
Author: 		Randell Quitain
File name: 		cookie.js
Description: 	Create, Retrieve & Delete cookie
Dependencies: 	jQuery
Usage: 			
				Create a cookie 
				guxApp.cookie.set('name', 'value', expiration, secured);

				name – cookie name
				value – cookie value
				expiration – cookie expiration (can be String || Number || Date) *optional*
				secured – Boolean (default: false) *optional*

				Retrieve a cookie as object
				guxApp.cookie.get('name');

				Delete a cookie
				guxApp.cookie.del('name');

*/
var guxApp = guxApp || {};

(function($){
	guxApp.cookie = {
		/**
		 * get cookie string or specific item value from cookie string
		 * example to get "pc" from dfy.u cookie:
		 * dfy.u="{"fn":"TestOwner3","pc":"ST158BG"}"
		 * @param cookieName
		 * @param keyName, String, the key of the value (fn,country_code)
		 * @param seperator, String, use to split the string ("#",",")
		 * @return value, result Object, {"pc":"ST158BG"}
		 * @return cookieStr, cookie string "{"fn":"TestOwner3","pc":"ST158BG"}"
		 *
		 */
		get: function (cookieName,keyName,seperator) {
			
			// check if cookie exist
			if (!cookieName) { return null; }
			
			var self = this,
				cookieStr = guxApp.tools.decode(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + guxApp.tools.encode(cookieName).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
			
			if(cookieStr&&keyName&&seperator){
				return self.getCookieVal(cookieStr,keyName,seperator);
			}else{
				return cookieStr;
			}
		},
		set: function (cookieName, cookieValue, cookieExp, cookieSecure) {

			// check if cookieNmae set and if same cookie is already set
			if (!cookieName || /^(?:expires|max\-age|path|domain|secure)$/i.test(cookieName)) { return false; }

			var configInfo = (typeof $('#common-config') != 'undefined' && $('#common-config').length > 0) ? $('#common-config').embeddedData() : null,
				expiration = '',
				cookiePath = '/', // set cookie path
				cookieDomain = '';

			// set cookie expiration
			if (cookieExp) {
				switch (cookieExp.constructor) {
					case Number:
					expiration = cookieExp === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + cookieExp;
					break;
					case String:
					expiration = '; expires=' + cookieExp;
					break;
					case Date:
					expiration = '; expires=' + cookieExp.toUTCString();
					break;
				}
			}

			// set cookie domain
			if(configInfo != null && configInfo.cookieDomain) {
				cookieDomain = configInfo.cookieDomain;
			}

			document.cookie = guxApp.tools.encode(cookieName) + '=' + guxApp.tools.encode(cookieValue) + expiration + (cookieDomain ? '; domain=' + cookieDomain : '') + (cookiePath ? '; path=' + cookiePath : '') + (cookieSecure ? '; secure' : '');
			
			return true;

		},
		del: function (cookieName) {

			// check if cookie doesn't exist
			if (!this.hasItem(cookieName)) { return false; }

			var configInfo = (typeof $('#common-config') != 'undefined' && $('#common-config').length > 0) ? $('#common-config').embeddedData() : null,
				cookiePath = '/', // set cookie path
				cookieDomain = '';

			// set cookie domain
			if(configInfo != null && configInfo.cookieDomain) {
				cookieDomain = configInfo.cookieDomain;
			}

			document.cookie = guxApp.tools.encode(cookieName) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + (cookieDomain ? '; domain=' + cookieDomain : '') + (cookiePath ? '; path=' + cookiePath : '');
			
			return true;
		},
		hasItem: function (cookieName) {
			if (!cookieName) { return false; }
			return (new RegExp("(?:^|;\\s*)" + guxApp.tools.encode(cookieName).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
		},
		/**
		 * check whether the string is a Json String
		 * example string '{"fn":"TestOwner3","pc":"ST158BG"}'
		 * @param str, string
		 * @return boolean.
		 */
		isJsonStr : function(str) {
			try {
				$.parseJSON(str);
			} catch (e) {
				return false;
			}
			return true;
		},
		/**
		 * get specific item value from cookie
		 * example to get "pc" from dfy.u cookie:
		 * dfy.u="{"fn":"TestOwner3","pc":"ST158BG"}"
		 * @param cookieStr, JSON string ("{"fn":"TestOwner3","pc":"ST158BG"}"), or normal string ("userInfo=country_code=CN#region_code=SH#city=SHANGHAI")
		 * @param valName, String, the key of the value (fn,country_code)
		 * @param seperator, String, use to split the string ("#",",")
		 * @return value, result Object, {"pc":"ST158BG"}
		 *
		 */
		getCookieVal : function(cookieStr, valName, seperator) {
			var self = this, value = {}, valNameLen = valName.length;
			if (self.isJsonStr(cookieStr)) {
				var cookieObj = $.parseJSON(cookieStr);
				for (var i in cookieObj) {
					for (var j = 0; j < valNameLen; j++) {
						if (i == valName[j]) {
							value[valName[j]] = cookieObj[i];
						}
					}
				}
			} else {
				var cookieArr = cookieStr.split(seperator), cookieLen = cookieArr.length;
				for (var i = 0; i < cookieLen; i++) {
					for (var j = 0; j < valNameLen; j++) {
						if (cookieArr[i].indexOf(valName[j]) != -1) {//if value name exist in current cookieArr
							value[valName[j]] = cookieArr[i].substring(valName[j].length + 1, cookieArr[i].length);
						}
					}
				}
			}
			return value;
		}
	}

})(jQuery);