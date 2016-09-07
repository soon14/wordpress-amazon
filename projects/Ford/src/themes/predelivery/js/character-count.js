/*
Author: 		Brett Chaney
File name: 		character-count.js
Description: 	Pre Delivery Phase 3
				Shows remaining characters left for textarea input
Dependencies: 	jQuery
*/

var PD = PD || {};

(function($){

PD.characterCount = {

	init: function() {
		// go no further if textarea is not found on page
		if (!$('.charlimit').length) {return;}

		var self = this;

		self.textfield = $('.charlimit');
		self.charLeftSpan = $('.characters-left span');
		

		self.maxChar = self.textfield.data('max-char');

		// inject the number of character left onto the page
		self.charLeftSpan.html(self.maxChar);

		// bind the event listener to get this started
		self.bindListener();
	},

	bindListener: function() {

		var self = this;

		$('.charlimit').keyup(function() {
			var activeCharlimit = $(this);
			var remText = $(this).next('.characters-left').children('span');
			self.countChar(remText, activeCharlimit);
		});

	},

	countChar: function(remaining, currTextArea) {

		var self = this,
			charLength = currTextArea.val().length,
			charRemaining = self.maxChar - charLength,
			currVal = currTextArea.val(),
			newVal;

		if (charRemaining < 0) {
			
			newVal = currVal.substring(0, currVal.length - 1);

			// update character left SPAN with 0 if character count is more than the max allowed
			currTextArea.val(newVal);
			remaining.html('0');

			// check if text is pasted into textarea with more than the max characters allowed
			if (charLength > self.maxChar) {

				newVal = currVal.substring(0, self.maxChar);

				currTextArea.val(newVal);
				remaining.html('0');

			}

		} else {

			// updated character left SPAN with characters remaining
			remaining.html(charRemaining);
		}

	}

};

$(function() {
	PD.characterCount.init();
});

})(jQuery);