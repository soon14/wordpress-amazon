/*
 * jQuery way to fix placeholder not work on older browsers. for example IE8
 * author : Ray
 * dependencies: jquery, Modernizr
 */

(function($) {
	var placeholder = {
		init : function() {
			if(!Modernizr.input.placeholder){
				$('[placeholder]').focus(function() {
					var input = $(this);
					if (input.val() == input.attr('placeholder-value')) {
						input.val('');
						input.removeClass('placeholder');
					}
				}).blur(function() {
					var input = $(this);
					//page load, store placeholder value to new attribute
					if(!input.attr('placeholder-value')){input.attr('placeholder-value',input.attr('placeholder'));}
					if (input.val() == '' || input.val() == input.attr('placeholder-value')) {
						input.addClass('placeholder');
						input.val(input.attr('placeholder-value'));
					}
				}).blur();
				
				// prevent placeholder value from submit
				$('[placeholder]').parents('form').submit(function() {
					$(this).find('.placeholder').each(function() {
						var input = $(this);
						if (input.val() == input.attr('placeholder-value')) {
							input.val('');
						}
					})
				});
			}
		}
	}

	$(function() {
		placeholder.init();
	});
})(jQuery);