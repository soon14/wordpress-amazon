/*
Author: 		Brett Chaney
File name: 		postcode-select.js
Description: 	Pre Delivery Phase 3 welcome page
				User enters first digit of postcode and the state will automatically select the relevant state 
				Additionally, only numbers can be enterned
Dependencies: 	jQuery
*/

var PD = PD || {};

(function($){

PD.postcodeSelect = {

	init: function() {

		var self = this;

		self.wrapper = $('#page-wrapper');
		
		// go no further if postcode input is not found on page
		if (!$('#page-wrapper input.input-postcode').length) {return;}

		self.numbersOnly();
		self.selectState();

	},

	numbersOnly: function() {

		var self = this;

		// method to force 'postcode' input to accept number input only, no other characters allowed
		$('input.input-postcode', self.wrapper).on('keypress', function(e) {

			// if the character is not a digit then don't type anything
			if (e.which !== 8 && e.which !== 0 && (e.which < 48 || e.which > 57)) {
				return false;
			}				

		});			

	},

	selectState: function() {

		var self = this,
			updated;

		$('input.input-postcode', self.wrapper).on('keyup', function(e){
			
			// if the character is not a digit then don't type anything
			if (e.which !== 8 && e.which !== 0 && (e.which < 48 || e.which > 57) && (e.which < 96 || e.which > 105)) {
				return false;
			}

			var currVal = $(this).val(),
				stateSel = $(this).parents('.row').find('.state-select'),
				dealerSel = $('#page-wrapper select#Dealership_State');
				
			if (currVal === "0") {

				// 0XXX
				$('option[value="NT"]', stateSel[0]).prop('selected', true);

				//if (dealerSel.val() === "") {
					$('option[value="NT"]', dealerSel).prop('selected', true);
					updated = true;
				//}


			} else if (currVal === "2") {

				// 2XXX
				$('option[value="NSW"]', stateSel[0]).prop('selected', true);

				//if (dealerSel.val() === "") {
					$('option[value="NSW"]', dealerSel).prop('selected', true);
					updated = true;
				//}

			} else if (currVal === "26" || currVal === "29") {

				// 26XX or 29XX
				$('option[value="ACT"]', stateSel[0]).prop('selected', true);

				//if (dealerSel.val() === "") {
					$('option[value="ACT"]', dealerSel).prop('selected', true);
					updated = true;
				//}

			} else if (currVal === "3") {
				
				// 3XXX
				$('option[value="VIC"]', stateSel[0]).prop('selected', true);

				//if (dealerSel.val() === "") {
					$('option[value="VIC"]', dealerSel).prop('selected', true);
					updated = true;
				//}

			} else if (currVal === "4") {

				// 4XXX
				$('option[value="QLD"]', stateSel[0]).prop('selected', true);

				//if (dealerSel.val() === "") {
					$('option[value="QLD"]', dealerSel).prop('selected', true);
					updated = true;
				//}

			} else if (currVal === "5") {

				// 5XXX
				$('option[value="SA"]', stateSel[0]).prop('selected', true);

				//if (dealerSel.val() === "") {
					$('option[value="SA"]', dealerSel).prop('selected', true);
					updated = true;
				//}

			} else if (currVal === "6") {

				// 6XXX
				$('option[value="WA"]', stateSel[0]).prop('selected', true);

				//if (dealerSel.val() === "") {
					$('option[value="WA"]', dealerSel).prop('selected', true);
					updated = true;
				//}

			} else if (currVal === "7") {

				// 7XXX
				$('option[value="TAS"]', stateSel[0]).prop('selected', true);

				//if (dealerSel.val() === "") {
					$('option[value="TAS"]', dealerSel).prop('selected', true);
					updated = true;
				//}

			}

			// reset uniformjs for State select
			stateSel.uniform();

			if (updated) {

				// update Dealership State select as well
				dealerSel.uniform().change();
				updated = false;
			} 
			
		});

	}

};

$(function() {
	PD.postcodeSelect.init();
});

})(jQuery);