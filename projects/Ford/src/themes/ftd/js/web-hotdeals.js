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
			var existing = this._panel.find( '.hotdeals-postcode' ),
				// Create the HTML to be injected
				render = $.tmpl(this.tmpl, model );				
			//Either replace or inject
			if( existing.length ) {
				existing.replaceWith( render );
			} else {
				this._panel.append( render );
			}
			
		},
		
		bindAdditionalListeners: function() {},
		
		loadingStatus: function( working ) {
			
			var self = this;
			
			// Clear delay
			self._loaderTimeout && clearTimeout( self._loaderTimeout );
			
			// Delay the error
			self._loaderTimeout = setTimeout( function() {
				if( !self._form ) { return; }
				self.loader || ( self.loader = $('<span class="loader"/>').appendTo( self._form.find('.final') ) );
				self._form.toggleClass("loading", working );
				self._loaderTimeout = null;
			}, 100);
		}
	},
	
	hotDeal: {
		needPostcodeTemplate: function( selector ) {
			var hd = $(selector);
			return hd.length ? hd : null;
		}
	}
};