/*
 * switches between links for mobile and desktop for Lincoln RAD site
 * Author: York Zhang
 * file: multi-platform-links.js
 */

/*globals jQuery, ND, window */
var ND = (function(ND, $) {
	
	ND.multiPlatformLinks = function () {
	
		var element;
		
		return {

			init: function( elem ) { 

				var isIE8 = $.browser.msie && $.browser.version < 9;
				/* Check this module needs to be initalised for this page */
				if( !!isIE8 ) { return this; }
				
				// switches between links for mobile and desktop 
				var switchLinks = function() {
					$('#menu, #badge').find("a[data-hrefsmob]").each(function(index) {
						var $this = $(this);
						var	mobLink = $this.attr('data-hrefsmob');
						var	desktopLink = $this.attr('data-link');

						//console.log(mobLink);
						
						if ($(window).width() < 768) {
							$this.attr('href', mobLink);
						} else {
							$this.attr('href', desktopLink);
						}

					});
				};

				$(window).on('resize', function() {
					switchLinks();
				});
			
				switchLinks();
				
				return this;
			
			}
			

		
		
		};	
	};
	
	/* Return ND after it's been augmented */ 
	return ND;	

}(window.ND || {}, jQuery));

(function(ND, $){
	$(function($){
		
		ND.multiPlatformLinks().init();
		
	});
}(window.ND || {}, jQuery));

