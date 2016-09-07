/* shoppref.js */
/*
 * shoppref.js
 * Author:gbaker 13/12/2011 
 */

/*globals window, document, jQuery, ND, SiteConf */
ND.shoppingPreferenceManager = (function($, undefined){
	
	var 
		/*
		 * The Cookie manager for shopping preferences
		 */
		shoppingPreferenceManager = {
		
			prefix: "shopping.pref.",
	
			/*
			 * List of supported Shopping Preferences, and their short names
			 */
			list: { postcode: "pc", usage: "us", usageLabel: "us.l", region: "rg", regionLabel: "rg.l", pricezone:"pz", pricezoneLabel:"pz.l", priceformatData:"pf" },
			
			/*
			 * Constructor of sorts
			 */
			init: function() {				
				this.cache = {};
				this.store = {};
				this.listen();
				this.upgradeCookie();
			},
			
			/*
			 * Prepare the stores, executed on demand to minise overhead.
			 */
			prepare: function() {
				var self = this;
				var cookieDomain=null;
				var configInfo = (typeof $('#common-config') != 'undefined' && $('#common-config').length > 0) ? JSON.parse($('#common-config').html()) : null;			
				if(configInfo != null && configInfo.cookieDomain){
					cookieDomain=configInfo.cookieDomain;
				}
				$.each( self.list, function(type, typeShort) {
					var value, store;
					
					// Use shortname to keep the cookie small.
					store = Object.create(ND.cacheStore);
					store.key = "sp." + typeShort;
					store.expires = 365;
					if(cookieDomain){
						store.domain=cookieDomain;
					}

					// Cache locally so don't need to grab from the cookie later
					if( value = store.get() ) {
						self.cache[type] = value;
					}
					
					self.store[type] = store;
				});
				
				// When done, erase action
				self.prepare = $.noop;				
			},
			
			/*
			 * Listen to the PUBSUB channel for Shopping Prefenences
			 */
			listen: function() {
				var self = this;
				
				this.pubsub = {
					// Saving Data
					save: function(event, data) {
						data && self.setStoreData( data );
						
						//Broadcast change event (this is confirmed / complete data, as compared to the raw, possible incomplete data from ".save" )
						$.publish( self.prefix + "change", self.getStoreData() );
					},
					// Clear all
					clear: function(event, data) {
						self.clearStoreData();
						
						//Broadcast change event (this is confirmed / complete data, as compared to the raw, possible incomplete data from ".save" )
						$.publish( self.prefix + "change", self.getStoreData() );
					},
					// Retrieve
					retrieve: function(event, fn) {
						$.isFunction(fn) && fn.apply( null, [ event, self.getStoreData() ]);
					},
					//destroy, used by mobile, when changing page.
					destroy: function() {
						self.destroy();
					}
				};

				for( var channel in this.pubsub ) {
					$.subscribe( this.prefix + channel, this.pubsub[channel] );
				}
			},
			
			/*
			 * Get the shopping data
			 */
			getStoreData: function() {
				this.prepare();

				// Return a clone of the cache
				return $.extend( {}, this.cache );
			},
			
			/*
			 * Set the shopping data
			 */
			setStoreData: function( data ) {
				var self = this;
				
				self.prepare();
				
				// Manipulate the data for defaults
				data = this.checkDefaults( data );
				
				// Iterate the data and save it
				data && $.each( data, function(type, value) {
					
					if( type in self.list ) {
						
						// Store in the cookie
						self.store[type].set( value )
						
						// Cache locally so don't need to grab from the cookie later
						if( typeof value !== 'undefined' && String(value).length) {
							self.cache[type] = value;
						} else {							
							delete self.cache[type];
						}
					}
				});
			},
			
			/*
			 * Function to clear the data
			 */
			clearStoreData: function() {
				this.cache = {};
				
				$.each( this.store, function(type, store) {
					store.set();
				});
			},
			
			/*
			 * Function to insist on default values.
			 * Hot Deals, when postcode is provided, a usage is set as default.
			 */
			checkDefaults: function( data ) {
				if( data && data.postcode && !this.cache.usage && !data.usage ) {
					data.usage = 'p';
					data.usageLabel = 'Personal';
				}
				return data;
			},
			
			/*
			 * Function to upgrade the old postcode cookie into the new one.
			 * Can remove this sometime in the future after this has been live for a while.
			 */
			upgradeCookie: function() {
				var polkData, polkStore;
				
				polkStore = Object.create(ND.cacheStore);
				polkStore.key = 'price.usage';
				var configInfo = (typeof $('#common-config') != 'undefined' && $('#common-config').length > 0) ? JSON.parse($('#common-config').html()) : null;			
				if(configInfo != null && configInfo.cookieDomain){
					polkStore.domain=configInfo.cookieDomain;
				}
				
				if( polkData = polkStore.get() ) {
					// Upgrade the cookie
					$.publish( this.prefix + "save", polkData );	
					// Clear the old cookie
					polkStore.set();
				}
			},
			
			
			/*
			 * Cleanup method
			 */
			destroy: function() {
				for( channel in this.pubsub ) {
					$.unsubscribe( this.prefix + channel, this.pubsub[channel] );
				}
				this.cache = this.store = this.pubsub = this.prefix = this.list = null;
			}
			
		};
	
	
	/*
	 * Expose function that creates new shoppingPreferenceManager
	 * - ND.shoppingPreferenceManager 
	 */
	return function( arg ) {
		var manager = Object.create( shoppingPreferenceManager );
		manager.init.call( manager, arg );
		return manager;
	};
	
}(jQuery));