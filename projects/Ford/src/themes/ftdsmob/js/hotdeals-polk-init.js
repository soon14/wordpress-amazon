/**
 * @author szabetian
 * Description: Initializes hotdeals and region read/write from cookie
 * Project hotdeals/polk 
 */
(function() {
	
	//update default underscore template to use {{}} instead of default ${}
	
	$(document).on("pagechange", function() {
			//initialize cookie manager
			ND.shoppingPreferenceManager();
			// initilize hotdeals
			ND.hotDeals();
			//initialize polk 
			ND.CalcPrice.init();
			
			ND.DealerLocator();
			
			
			/**
			 * Since the new context depends on shopping pref, context need to be triggered right after
			 * to avoid race condition
		     * Execute voi-prepopulation for mobile
		     */
			ND.Context.isContextInitialised = false;
			ND.Context.startUp();
			
	});
	
	$(document).on('pagehide', function() {
		//remove hotdeals and shoppingpref listeners
		$.publish('shopping.pref.destroy');
		//remove polk listeners
		$.publish('destroy.calculateprice.dfy');
		
		$.publish('dealerlocator.dfy.destroy');
	});

})();