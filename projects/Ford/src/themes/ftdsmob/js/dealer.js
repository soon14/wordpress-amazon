/**
 * @author Sohrab Zabetian
 * @project mobile shopping tool/dealer locator/form builder
 * @description: This file contains platform specific functions for invoking geolocation for dealerlocator
 * TODO: see if we can use this for all current location buttons 
 */
ND.DealerLocator = (function($, undefined){
	
	var currentLocation = {
		init: function(options) {
			options = options ||  {} ;
			
			var self = this;
			self.pubsubPrefix = options.pubsubPrefix || 'dealerlocator.dfy';
			self.currentLocationButtonSelector = options.currentLocationButtonClass || 'button.dealer-form-currentLocation';
			self.$formSelector = $(options.formSelector || 'form.search');
			self.hiddenFieldSelector = options.hiddentFieldSelector || '#dealer-form-currentLocation';
			self.$errorSelector = $(options.errorSelector || '#currentLocationError');
			
			for (key in this.pubsub) {
				$.subscribe(self.pubsubPrefix + key, this.pubsub[key]);
			}
		},
		
		isCurrentLocationAvailable : function() {
			return this.$formSelector.length > 0 && this.$formSelector.find(this.currentLocationButtonSelector).length > 0;
		},
		
		start: function() {
			var self = this;
			self.$formSelector.on('click', self.currentLocationButtonSelector, function( e ) {
				e.preventDefault();
				locationTimeout = setTimeout(function() {
					geoLocator.locationNotFound(1);
				}, 15000);
				
				var geoLocator = ND.geoLocator({
					success: function(postcode) {
						clearTimeout(locationTimeout);
						$(self.hiddenFieldSelector).val(postcode);
						self.$formSelector.submit();
					},
					error: function(message) {
						clearTimeout(locationTimeout);
						self.$errorSelector.text(message);
					},
					maximumAge: 10000,
					timeout: 10000
				});
				geoLocator.findLocation();
			});
		},
		
		destroy : function() {
			this.$formSelector.off('click', this.currentLocationButtonSelector);
		},
		
		pubsub:  {
			destroy:function( event, data ) {
				this.destroy();
			}
		}
	};
	
	
	/**
	 * For dealerlocators embedded in forms,
	 * manage radio buttons.
	 * 
	 * when span.radio-icon are clicked parent (li) should have class="checked"
	 * also a hidden radio button will be selected.
	 */
	var	manageRadioButtons = function(options) {
		var $form = $('#dl-formBuilder');
		if ($form.length > 0) {
			var $radioBtns = $form.find('span.radio-icon');
			$radioBtns.on('click', function() {
				$radioBtns.each(function() {
					$(this).parent().removeClass('checked');
				});
				$form.find('input[type="radio"]').each(function() {
					$(this).removeAttr('checked');
				});
				
				
				var thisListItem = $(this),
					dealerId = thisListItem.data('dealer');
				
				thisListItem.parent().addClass('checked');
				$('#dealer-' + dealerId).attr('checked', 'checked');
			});
		}
	};
			
	
	/*
	 * Startup currentLocation
	 * TODO: need to expose a handle so we can pass in arguments
	 */
	return function( arg ) {
		var manager = Object.create( currentLocation );
		manager.init.call( manager, arg );
		if (manager.isCurrentLocationAvailable()) {
			manager.start();
		}
		manageRadioButtons();
		return manager;
	};
	
	
})(jQuery);