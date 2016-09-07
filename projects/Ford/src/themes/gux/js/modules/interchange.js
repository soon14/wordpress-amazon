/*
Author: Ruiwen Qin
File name: interchange.js
Description: This file setup the named queries 
Dependencies: lib/foundation/foundation.interchange.js
*/

(function($){
	$(function(){
		$(document).foundation('interchange',{
			named_queries: {
				medium: 'only screen and (min-width:768px)',
				large: 'only screen and (min-width:992px)',
				xlarge: 'only screen and (min-width:1200px)'
			}
		});
	});

})(jQuery);