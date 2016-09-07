/*
Author: 		Brett
File name: 		guxRadioButtons.js
Description: 	Function to replace radio buttons with GUX-style buttons
Dependencies: 	jQuery 
Usage: 			HTML...
				<input class="usage first replace-radio-btn" type="radio" id="usage-personal" name="usage" value="p" checked />
				<label class="token" for="usage-personal" title="Personal">
					<a class="button">Residential</a>
				</label>

				JS Function to run...
				guxApp.radioButtons.init();
*/
var guxApp = guxApp || {};

(function($){
	guxApp.radioButtons = {
		init: function(){
			setTimeout(function() {
				$('.replace-radio-btn').each(function() {
					if($(this).is(':checked')) { 
						$(this).next().find('.button').addClass('active');
					}

				});
			},100);

			$('.replace-radio-btn').next().on('click', function() {
				$('.replace-radio-btn').next().find('.button').removeClass('active');
				$('.replace-radio-btn').attr('checked', false);

				$(this).prev().attr('checked', true);
				$(this).find('.button').addClass('active');
			});
		}
	};

})(jQuery);