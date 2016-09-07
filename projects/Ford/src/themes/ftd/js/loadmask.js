/**
 * The amazing, incredible, life-saving loadmask.js!
 * Prevents impatient users from clicking around an app that isn't ready to receive instructions!
 * Genius, right?  BUT WAIT, THERE'S MORE!
 * Call in the next 10 minutes to receive this free set of wonderful JSON Steak knives* :D
 * (*note: offer not available anywhere.)
 */
(function($,undefined) {	
	//if (!ND) var ND = window.ND = window.ND || {};
	
	ND.loadmask = function() {
		// This is the constructor method.
		// Not suitable for children under 5 years of age.
		// See your doctor if symptoms persist.
		var maskElem = $("<div class='loadmask' style='opacity: 1, display: none'></div>");
		var loadGif = $("<span class='loadgif'>&nbsp;</span>").appendTo(maskElem);
		// Dimensions of the loader gif, have to be pre-determined since we can't compute them when the element is hidden
		var loaderDimensions = {
			width: 220,
			height: 19
		};
		// Cachce the dimensions of the viewport for performance considerations
		var viewport = {
			height: $(window).height(),
			width: $(window).width()
		};
		
		loadGif.css("top", (viewport.height + loaderDimensions.height) / 2)
			.css("left", (viewport.width - loaderDimensions.width) / 2);
			
		maskElem.appendTo("body");
		
		return {
			show: function() {
				maskElem.stop().fadeIn();
			},
			hide: function() {
				maskElem.stop().fadeOut();
			}, 
			hideSlowly: function() {
				maskElem.fadeOut();
			}
		}
	};
})(jQuery);