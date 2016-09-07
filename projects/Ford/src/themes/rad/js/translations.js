/**
 * 
 */
var Translator = (function($,undefined) {
	var translations = {};
	return {
		translate : function(key) {
			var $translationsData = $("#translations");
			if ($translationsData.length > 0) {
				translations = $translationsData.embeddedData();
			}
			var result =  translations[key];
			if (result == null) {
				result = key;
			}
			return result;
		}
	};    
})(jQuery);