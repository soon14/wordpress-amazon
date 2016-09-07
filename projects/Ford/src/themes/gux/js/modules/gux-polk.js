/*
Author:         Brett Chaney
File name:      gux-polk.js
Description:    GUX specific code for FoA Polk pricing
				Includes Polk price change overlay launch
Dependencies:   jQuery, getprice.js, bootstrap.modal.js, guxRadioButtons.js
*/
var guxApp = guxApp || {};

(function($) {

guxApp.polk = {
	init: function() {
		$.subscribe('overlay.launchgux', function(event, options){
			if (!guxApp.polk.launched) {
				guxApp.polk.launchOverlay(options);
			}			
		});

		$.subscribe('overlay.hidegux', guxApp.polk.hideOverlay);

		guxApp.polk.closeOverlay();
		guxApp.polk.inputLength();

		$.subscribe('userchangesuccess.calculateprice.dfy', function(event, data) {
			$('#compareContainer .body.derivative-price').css('width','');			

			if ($('.model-walk')[0]) {
				guxApp.ModelWalk.fetchDate();
				guxApp.polk.startingPrice(event, data);
			}

			if ($('.model-compare')[0]) {
				guxApp.polk.appendZero(true);
				guxApp.polk.modelCompareOffers();
			} else {
				guxApp.polk.appendZero();
			}

			if($('.model-display')[0]) {
				guxApp.polk.compareVehicleOffers();
			}

			if ($('.section-cars')[0]) {
				guxApp.polk.showroomPrices(event, data);
			}
		});

		$.subscribe('shopping.pref.retrieve', function() {
			if ($('#compareContainer .body.derivative-price:empty')) {
		    	$('#compareContainer .body.derivative-price').attr('style','width:0 !important');
		    } else {
		    	$('#compareContainer .body.derivative-price').css('width','');
		    }
		});

		guxApp.innerPopup.init();
	},

	appendZero: function(compare) {
		var postcodeLength;

		// Fixes IE issue that removes '0' from postcodes that start with a '0' i.e. 0800
		if (compare) {
			postcodeLength = $('.calc-price-overlay')[0] ? $('.calc-price-overlay .pc-input').val().length : $('.model-compare .need-price .prices-shown .postcode').html().length;
		} else {
			postcodeLength = $('.calc-price-overlay')[0] ? $('.calc-price-overlay .pc-input').val().length : $('.need-price .prices-shown .postcode').html().length;
		}

		if (postcodeLength === 3) {
			if ($('.calc-price-overlay')[0]) {
				var valuePC = $('.calc-price-overlay .pc-input').val(),
					addedZero = 0 + valuePC;
				
				$('.calc-price-overlay .pc-input').val(addedZero);
			} else {
				$('.need-price .prices-shown .postcode').prepend('0');
			}	
		}
	},

	showroomPrices: function(event, data) {
		var displayPrice,
			price;

		$.each(data.derivatives, function(i, obj) {
			displayPrice = obj.price;
			price = parseInt(displayPrice.replace(/[^0-9.]/g, ''));

			$('.derivative-price[data-derivativeid="' + obj.id + '"]').parents('.vehicle-data').attr('data-price',price);
		});
	},

	startingPrice: function(event, data) {
	    var prices = [],
			displayPrice,
			lowestPrice,
			formattedPrice;

		function sortNumber(num1, num2) {
	        return num1 - num2;
	    }

	    function numberWithCommas(x) {
		    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}

		var priceList;

		$.each(data.derivatives, function(i, obj) {
			displayPrice = obj.price;
			prices.push(parseInt(displayPrice.replace(/[^0-9.]/g, '')));
			if (priceList !== undefined) {
				priceList = priceList + "\n" + 'Price: ' + displayPrice + '  ID: ' + obj.id;
			} else {
				priceList = 'Price: ' + displayPrice + '  ID: ' + obj.id;
			}
		});

	    lowestPrice = prices.sort(sortNumber)[0];
	    formattedPrice = numberWithCommas(lowestPrice);
	},

	modelCompareOffers: function() {

		// Move Latest Offers link below the Vehicle details on Modal Compare page
	    $('.model-compare .model-hero .derivative-price').each(function() {
	    	var elem = $(this);

	    	elem.parent().append('<li />');
	    	elem.find('.offers').appendTo(elem.parent().find('li:last-child'));
	    	elem.parent().find('.offers').parent().css('marginRight', 0);

	    	// Remove all remaining empty <li>'s
	    	elem.parent().find('li:empty').remove();

	    	if (elem.parent().find('.offers').length > 1) {

	    		// Remove duplicated 'latest offers'
	    		elem.parent().find('.offers').eq(0).parent().remove();
	    	}
	    });

	    // Reset equal element heights for H2 and UL
	    $('.model-compare .mw-content .model-hero .model-container .model-data .model-content ul').removeAttr( 'style' );
	    $('.model-compare section.model-hero .model-container h2').removeAttr( 'style' );

	    guxApp.ModelCompare._equalizeElemHeight($('.model-compare .mw-content .model-hero .model-container .model-data .model-content ul'));
	    guxApp.ModelCompare._equalizeElemHeight($('.model-compare section.model-hero .model-container h2'));
	},

	compareVehicleOffers: function() {

		// Move Latest Offers link below the Vehicle details on Compare Module
	    $('.model-display .derivative-price').each(function() {
	    	$(this).find('.price').siblings('.offers').remove();
	    	$(this).find('.offers').appendTo($(this));
	    });
	},
	
	hideOverlay: function () {

		// Hide modal and then remove content
		$('#modalWrap').modal('hide').removeClass('polk-modal').find('.modal-body').html('');

		guxApp.polk.launched = false;
	},

	launchOverlay: function(options) {

		guxApp.polk.launched = true;

		// Launch Bootstrap modal
		$('#modalWrap').addClass('polk-modal').modal({
			"backdrop" : false,
			"keyboard" : false
		});

		// Inject content into modal
		$('.polk-modal .modal-body').load(options.url, function() {
			options.success.call();

			// Initiate radio buttons GUX-style method
			guxApp.radioButtons.init();
			
			setTimeout(function(){
				guxApp.polk.appendZero();
			},250);
		
			// Publish
			$.publish('overlay.success');
		});
	},

	closeOverlay: function() {
		$('#modalWrap').on('click', '.icon-close, .close-overlay', function(e) {
			e.preventDefault();
			$.publish('overlay.usercancel');
			guxApp.polk.hideOverlay();
		});

		$(document).keydown(function(e) {

			// ESC key pressed
			if (e.keyCode == 27) {
				$.publish('overlay.usercancel');
				guxApp.polk.hideOverlay();
			}
		});
	},

	inputLength:function() {
		$('.modal').on('input keyup', '.pc-input', function() {
			if ($(this).val().length > 4) {
				$(this).val($(this).val().slice(0,4));
			}
		});
	}
};

$(function() {
	if ($('.need-price')[0]) {

		// getprice.js
		ND.CalcPrice.init();
		guxApp.polk.init();
	}
});

})(jQuery);
