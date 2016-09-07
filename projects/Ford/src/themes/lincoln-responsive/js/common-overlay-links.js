/*
 * Common overlay for Lincoln RAD site (eg. the links in the global footer)
 * Author: York Zhang
 *
 */

/*globals jQuery, ND, window */
var ND = (function(ND, $) {
	
	ND.radCommonOverlay = function () {
	
		var element;
		
		return {

			init: function( elem ) { 

				//element = $(elem || ".comparison-overlay");
					
				/* Check this module needs to be initalised for this page */
				//if( !element || !element.size() ) { return this; }

				$("#footer-links .fullscreen-overlay, .rad-overlay").radOverlay({
					additionalClass: "auto-height-overlay"
				});
				
				/* Return this so it can be chained / assigned
				 * eg. var myModule = ND.myModuleName().init();
				 */
				return this;
			
			}
			

		
		
		};	
	};
	
	/* Return ND after it's been augmented */ 
	return ND;	

}(window.ND || {}, jQuery));

(function(ND, $){
	$(function($){
		
		ND.radCommonOverlay().init();
		
	});
}(window.ND || {}, jQuery));

