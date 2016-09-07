/*
Author: 		Roy Anonuevo
File name: 		uniform.js
Description: 	uniform functionalities
Dependencies: 	jQuery, jquery.cookie.js, uniformjs, uniform.js module
*/
var _da = _da || {};

(function($){
	var uniform = {

		init: function(){			
			if(!$('.uniform').length){return;}	

			// cache
			var $uniform = $('.uniform');

			$uniform.find("select").uniform({selectClass: 'dropdown', selectAutoWidth: false});
		}
	}
		
	$(function(){
		uniform.init();
	});

})(jQuery);
