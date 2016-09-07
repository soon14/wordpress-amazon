/*
Author: Ruiwen Qin
File name: foundationInit.js
Description: Initiate foundation JS
Dependencies: lib/foundation/foundation.js
*/
(function($){
	var foundationModules = {
		init: function(){
			$(document).foundation({
				reveal: {
	                animation: 'fade',
	                animation_speed: 400,
	                close_on_esc: false,
	                dismiss_modal_class: 'close-reveal-modal',
	                css: {
	                    open: {
	                        'opacity': 0,
	                        'visibility': 'visible',
	                        'display': 'block'
	                    },
	                    close: {
	                        'opacity': 1,
	                        'visibility': 'hidden',
	                        'display': 'none'
	                    }
	                }
	            }
			});
		}
	};

	$(function(){
		foundationModules.init();
	});

})(jQuery);