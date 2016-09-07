/*
Author: Gianfranco S. del Mundo
File name: foundationTabFix.js
Description:
 *
 * 
	This will prevent the bubbling up of the click event from any element that contains [data-tab]

Dependencies: none
*/
(function($) {
  	$('.tabs-content [data-tab] a').click(function(e){
  		e.stopPropagation();
  	});
})(jQuery);