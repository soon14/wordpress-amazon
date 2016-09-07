/*
* the global setting
* Author: Ray Huang
*/

//globals jQuery, ND, window
var ND = ( function(ND, $) {
		/*
		* check whether the object is empty
		* @param obj, object need to be checked
		*/
		ND.isEmptyObject = function(obj) {
			for (var n in obj) {
				return false
			}
			return true;
		}
		
		/*
		* check whether the passed parameter is numeric
		* accept either int or a number string : "1"
		* @param obj, parameter need to be checked
		*/
		ND.isNumeric = function(obj) {
			var pattern = /^\d+$/;
			if(!pattern.test(obj)) {
				return false
			}
			return true;
		}
		
		/*
		* check the client device
		*/
		ND.isIpad = function() {
			var ua = navigator.userAgent.toLowerCase();
			if (ua.match(/iPad/i)=="ipad"){
				return true;
			}
			return false;
		}
		
		return ND;
}(window.ND || {}, jQuery));
