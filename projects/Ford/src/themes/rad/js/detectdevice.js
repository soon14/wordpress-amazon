/*
Author: 		Doris
Description: 	Detect device system is ios or android
*/

ND = window.ND = window.ND || {};

(function($){

	ND.detectDevice = {
		
		isAndroid: function () {
		    return /Android/i.test(navigator.userAgent);
		},

		isIOS: function () {
		    return /iPhone|iPad|iPod|Mac OS X/i.test(navigator.userAgent);
		}

	};


})(jQuery);