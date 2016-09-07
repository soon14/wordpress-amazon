/*
Author: 		Randell Quitain
File name: 		personalisation-fps.js
Description: 	Use FPS API Get
Dependencies: 	jQuery
Usage: 			
*/

var guxPersonalisation = guxPersonalisation || {};

(function($){
	guxPersonalisation.fps = {
		
		done: false,
		get: function(obj, success, error, callback){

			var execute;

			function OnPersonalizationScriptLoaded() {
				// do the personalization stuff in here after it's been loaded
			}

			// check if valid callback function
			if(typeof callback === "function") {
				execute = callback();
			}

			// check if FPS object exist
			if(typeof FPS != "undefined") {
				FPS.get(obj, { success: success, error: error, complete: execute });
			} else {
				return false;
			}
			
		}
		
	}

})(jQuery); 