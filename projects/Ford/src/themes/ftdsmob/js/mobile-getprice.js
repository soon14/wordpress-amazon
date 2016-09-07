/**
 * @author: szabetian
 * @project: polk
 * @description: helper methods for ND.calcprice
 * 
 * 
 * getprice.js (ND.calcPrice) uses methods in this file to perform various tasks
 * 
 */
ND.polk = {
		/**
		 * Updates the region in the DOM where vehicle prices are displayed.
		 * That subtle color fadding when a panel updates.
		 * 
		 * @param elem
		 * 
		 */
		showChangeVisually : function(elem) {
			//console.log("showChangeVisually()");
			elem.trigger('create');
			var time = 1500,
				bgColor = elem.closest('.need-price').size() ?  
					//Dark Background
					['#185a78', '#111111' ] :
					//Light Background
					['#aad3e6', '#FFFFFF' ];
			
			//Run the animation, start with a solid background colour
			elem.css('backgroundColor', bgColor[0] )
				.delay(time)
				.animate({
						'backgroundColor' : bgColor[1]								
					}, time,  function() {
						$(this).css('backgroundColor', 'transparent');
					});		
		},
		
		renderDerivative : function(housing, prevPrice, hotDealLocationToAppend, render, renderHotdeals, hotDealClass) {
			
					
			//Either replace or inject a new price
			if( prevPrice.length ) {
				prevPrice.replaceWith( render );
				
			} else {
				housing.prepend( render );
			}
			
			var prevHotDeal = hotDealLocationToAppend.find(hotDealClass);
			if (prevHotDeal.length > 0) {
				prevHotDeal.replaceWith(renderHotdeals);
			} else {
				hotDealLocationToAppend.append(renderHotdeals);
			}					
			
		},

		notifyChange: function (housing) {
		    housing.find('.price').remove();
		    housing.parent().find('.loan-calc').hide();
		},
		
		registerLoanBtn: function (hotDealLocationToAppend, price, priceformatter, location) {

		    if ($('.loan-calc', hotDealLocationToAppend).length > 0) {
		        $('.loan-calc', hotDealLocationToAppend).css('display', 'inline-block');
		        $('.loan-calc', hotDealLocationToAppend).off('click').on('click', function (e) {
		            e.preventDefault();
		            $(this).loanCalculatorOverlay({
		                price: price,
		                priceformatter: priceformatter,
		                location: location,
		                url: $(this).attr('data-url'),
		                complete: function () {
		                    $('.ui-popup-active input').val('');
		                }
		            });
		        });
		    }

		},

		bindAdditionalListeners: function(form) {
			//console.log('ND.polk.bindAdditionalListeners ' + form);
			var doesCurrentLocationButtonExist = $('input.polk-form-currentLocation').length > 0 ;
			if (doesCurrentLocationButtonExist) {
				$(document).on('click', 'input.polk-form-currentLocation', function( e ) {
					
					e.preventDefault();
					$.publish('loading.calculateprice.dfy', true);
					
					setTimeout(function() {
	//					console.log('setTimeout');
						$.publish('loading.calculateprice.dfy', false);
	//					geoLocator.locationNotFound(1);
					}, 10000);
					
					var geoLocator = ND.geoLocator({
						success: function(postcode) {
	//						clearTimeout(timeout);
							//console.log('success: clearTimeout');
							$.publish('loading.calculateprice.dfy', false);
							//console.log('Found postcode ' + postcode);
							var input = $(form).find('[name=postcode]');
							//console.log('input.length ' + input.length);
							var $form = $(form);
							$form.find('[name=postcode]').val(postcode);
							$form.submit();
						},
						error: function(message) {
	//						clearTimeout(timeout);
							//console.log('error: clearTimeout');
							$.publish('loading.calculateprice.dfy', false);
							$.publish('usererror.calculateprice.dfy', message);
						},
						maximumAge: 10000,
						timeout: 10000
					});
					geoLocator.findLocation();
					
					
				});
			}
		},
		
		
		/**
		 * Callback function after postcode is changed to style the newly injected DOM
		 * Do not delete
		 */
		templateUpdated: function(elem) {
			//console.log('templateUpdated');
			//trigger element creation in jquery mobile
			elem.trigger('create');
		}
};

