/*
 * pick location for Lincoln B&P first step
 * AUTHOR: YORK ZHANG
 */

/*globals jQuery, ND, window */
var ND = (function(ND, $) {
	
	//The create function creates the module object; It does no initialise the object
	ND.locationOverlay = function () {
	
		var element;
		
		return {

			init: function( elem ) { 

				element = $(elem || "#location-content");
					
				/* Check this module needs to be initalised for this page */
				if( !element || !element.size() ) { return this; }
			
				/* Do stuff */
				$.radOverlay.open(element,{
					additionalClass:"location-overlay"
				});
				

				return this;
			
			}
		
		
		};	
	};
	
	/* Return ND after it's been augmented */ 
	return ND;	

}(window.ND || {}, jQuery));


/* End File */