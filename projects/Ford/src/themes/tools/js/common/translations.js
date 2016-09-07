/**
 * global self executing function
 * 
 * @author Sohrab Zabetian 
 */
var Translator = (function($,undefined) {	
	
	var translations = {};
	var $translationsData = $("#translations");
	if ($translationsData.length > 0) {
		translations = $translationsData.embeddedData();
	}
	
	return {
		translate : function(key) {
			var result =  translations[key];
			if (result == null) {
				result = key;
				//console.log('Could not find translation for key ' + key);
			}
			return result;
		}
	};
	
})(jQuery);