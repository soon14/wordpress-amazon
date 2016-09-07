/*
Author: 		Brett Chaney
File name: 		save-continue.js
Description: 	Pre Delivery Phase 3 
				Save and Continue functionality for Steps page
Dependencies: 	jQuery
*/

var PD = PD || {};

(function($){

PD.saveContinue = {

	init: function() {
		
		// go no further if the Save and Continue buttons are not found on page
		if (!$('.save-continue').length) {return;}

		var self = this;

		// cache 'success text' message
		self.successText = $('.btn-section .save-text').eq(0).find('.columns').html();

		// add event to 'save and continue' buttons
		self.bindSaveButton();	

		// if 'step' is a parameter in query string
		// open and scroll to that step
		self.gotoStep();

	},

	getQueryVariable: function(variable) {

		var query = window.location.search.substring(1),
			vars = query.split('&');

		for (var i=0;i<vars.length;i++) {
			var pair = vars[i].split('=');
			if(pair[0] == variable){return pair[1];}
		}

		return(false);

	},

	gotoStep: function() {
		
		var stepParam = this.getQueryVariable('step');
		var step = stepParam ? stepParam - 1 : 0;
		var tab = $('.accordion-panel ul li').find('.tab-area').eq(step);
		
		// scroll and open relevant step and fire omniture
		setTimeout(function() {
			tab.trigger("mouseup").trigger('click');
		}, 500);
		

	},

	bindSaveButton: function() {

		var self = this;

		$('.save-continue', '#page-wrapper').on('click', function(e) {
			e.preventDefault();

			// add the current step to a hidden input field
			var thisStep = $(this).data('step');
			$('input#step-saved').val(thisStep);

			self.sendRequest($(this));
		});

	},

	sendRequest: function(elem) {

		// serialize form data and replace + with %20 for empty spaces
		var formData = $('.fbform'),
			self = this,
			backBtn = formData.find("#backBtn"),
			prevBackVal = backBtn.val();

		backBtn.val("save");
		var formUrl = formData.serialize().replace(/\+/g,'%20');
		
		$.ajax({
			url: "/servlet/predelivery",
			cache: false,
			data: formUrl,
			type: 'POST',
			beforeSend: function() {

				// inject BG and loading GIF into DOM
				$('body').append('<div class="reveal-modal-bg white-bg" style="display:block;"><div class="ajax-loader"></div></div>');
			},
			complete: function() {

				// remove BG and loading GIF from DOM
				$('.reveal-modal-bg.white-bg').remove();
				backBtn.val(prevBackVal);
			},
			success: function() {

				elem.parents('.btn-section').find('.save-text .columns')
					.html('').html(self.successText)
					.parent().show();
				
			},
			error: function(e, extStatus) {

				var errorMsg = (extStatus + ': ' + e.statusText).toUpperCase();

				elem.parents('.btn-section').find('.save-text .columns').html(errorMsg).parent().show();		
				
			}

		});
		
	}

};

$(function() {
	PD.saveContinue.init();
});

})(jQuery);