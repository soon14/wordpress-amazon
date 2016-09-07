/*
 * Author:      Brett Chaney
 * Description: Override jQuery mobile defaults here
 */

(function($) {
	
	$(document).bind("mobileinit", function(){

		var errorStr 	= "%E5%BE%88%E6%8A%B1%E6%AD%89%EF%BC%8C%E4%BD%A0%E6%89%80%E8%AE%BF%E9%97%AE%E7%9A%84%E9%A1%B5%E9%9D%A2%E5%87%BA%E7%8E%B0%E9%97%AE%E9%A2%98%E3%80%82%E8%AF%B7%E5%88%B7%E6%96%B0%E9%A1%B5%E9%9D%A2%E3%80%82%0A",
			errorDecode = decodeURIComponent(errorStr),
			enStr 		= " An error has occurred, we apologize for the inconvenience. Please refresh your page.";

		$.mobile.pageLoadErrorMessage = errorDecode + enStr;
	
	});

})(jQuery);