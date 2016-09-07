/**
 * @author: Sohrab Zabetian
 * @project hotdeals
 * @description: This file contains platform specific functions for hotdeals. Please refer to
 * 				 hotdeals.js for complete information.
 */
ND.platformDependentHotDeal = {
		
	regionObtainer : {	
		/**
		 * Display region link on the page. 
		 * @param model
		 */
		view : function( model ) {
			
			var existing = this._panel.find( '.hotdeals-postcode' );
				// Create the HTML to be injected
				render = $.tmpl(this.tmpl, model );				
//			console.log('postcodeTemplate.view');
			
			
			//Either replace or inject
			if( existing.length > 0) {
				existing.replaceWith( render );
//				console.log('postcodeTemplate.view - > replacing with old');
			} else {
//				console.log('postcodeTemplate.view - > appending to page');
				this._panel.append( render );
			}
			
			//used for mobile only, has no effect on web
			this._panel.trigger('create');
		},
		
		bindAdditionalListeners: function() {
//			console.log('ND.platformDependentHotDeal.regionObtainer.bindAdditionalListeners');
			var self = this;
			
			var locationTimeout;
			var doesCurrentLocationButtonExist = $('input.hotDeals-form-currentLocation').length > 0 ;
			if (doesCurrentLocationButtonExist) {
				$(document).on('click', 'input.hotDeals-form-currentLocation', function( e ) {
					
					e.preventDefault();
					self.loadingStatus( true );
					
					locationTimeout = setTimeout(function() {
						self.loadingStatus( false );
						geoLocator.locationNotFound(1);
					}, 20000);
					
					var geoLocator = ND.geoLocator({
						success: function(postcode) {
							clearTimeout(locationTimeout);
	//						console.log('success: clearTimeout');
							self.loadingStatus( false );
	//						console.log('Found postcode ' + postcode);
							var form = $(self.formSelector);
							form.find('#postcode').val(postcode);
							form.submit();
						},
						error: function(message) {
							
	//						console.log('error: clearTimeout');
							self.loadingStatus( false );
							self.formError(message);
						},
						maximumAge: 15000,
						timeout: 15000
					});
					geoLocator.findLocation();
				});
			}
			
			$(document).on('submit', '#hotDeals-form', function() {
				if (doesCurrentLocationButtonExist) {
					clearTimeout(locationTimeout);
				}
				return false;
			});
			
			//clean up the overlay for next round
			$.subscribe('overlay.usercancel', function() {
				var form = $(self.formSelector);
				form.find('#postcode').val('');
				self._errorMsg.slideUp('fast');
			});
		},
		
		loadingStatus: function(working) {
			$.mobile.loading( working ?  'show' : 'hide');
		}
	},
	
	hotDeal: {
		needPostcodeTemplate: function( selector ) {
			//var hd = $.mobile.activePage.find(selector);
			var hd = $.mobile.activePage.find(selector);
			return hd.length > 0 ? hd : null;
		}
	}

	
};