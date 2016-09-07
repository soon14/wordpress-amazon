/*
Author: 		Ruiwen Qin
File name: 		priceformatInit.js
Description: 	
Dependencies: 	jQuery
Usage: 			
*/

var guxApp = guxApp || {};

(function($){

	guxApp.priceformatInit = {

		// each component requires an init function 
		init: function(element) {
			var priceFormatOptions;

			if ($('#mpz-config').length){
				priceFormatOptions = $('#mpz-config').embeddedData();

				guxApp.priceFormatter.initialise({
					data: priceFormatOptions.priceFormat,
		            formatString: priceFormatOptions.currencySymbol,
		            centsSeparator: priceFormatOptions.monetaryDecimalSeparator,
		            thousandsSeparator: priceFormatOptions.groupingSeparator
		        });
			}
			
			// console.log(guxApp.priceFormatter.format("2000"));
		
		}

	};

	$(function(){
		guxApp.priceformatInit.init();

	});

})(jQuery);