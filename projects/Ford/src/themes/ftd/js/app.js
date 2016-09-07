/* 
 * App.js has been seperated from global.js to avoid bloat.
 * App.js will load modules but never do it's own work
 */
(function($, win, doc){
	
	// If  in Qunit test suite, then we stall.
	if(!!window.QUnit) { return; }

	$(doc).ready(function(){
		// shoppref.js
		
		ND.shoppingPreferenceManager();
		// hotdeals.js
		ND.hotDeals();
		
		// sync.js
		ND.syncVersionManager();
		// getprice.js
		ND.CalcPrice.init();
		
		ND.expandTable();
		
		ND.ResizeHeadline();
		
		ND.fleetTabs();
		
		ND.Experienceb299();
		
	});
	
})(jQuery, window, document);