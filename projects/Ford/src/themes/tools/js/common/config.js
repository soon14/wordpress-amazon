var Config = (function(window, document, $, undefined){	

	init = function() { 
		var configs = {};
		var $configData = $("#build-and-price-config");
		
		if ($configData.length > 0) {
			configs = JSON.parse($configData.html());
			var rootURL = '/servlet/rest/tools/' + configs['toolType'] + '/' + configs['site'];
			var rootURLWithPricezone = rootURL + '/:pricezoneId/';
		 
			configs.buildandprice = {
				
				urls : {
					'modelListURL':  rootURLWithPricezone + 'models',
					'derivativeListURL': rootURLWithPricezone + 'model/:id/derivatives',
					'packageListURL':  rootURLWithPricezone + 'model/:id/packages',
					'derivativeDetailURL':	rootURLWithPricezone +':path/:id', /*+ 'derivative/' or 'package/' will be appended based on user selected path*/
					'packageDetailURL':	rootURLWithPricezone +':path/:id',
					'categoryListURL': rootURLWithPricezone +':path/:id/categories',
					'colorTrimListURL': rootURLWithPricezone +':path/:id/colours-trims',
					'engineListURL' : rootURLWithPricezone + 'derivative/:id/engine',
					'shareURL' : '/servlet/rest/tools/share/',
					'viewPDFURL' : '/servlet/rest/tools/share/pdf/',
					'pricezoneListURL' : rootURL + '/pricezones',
					'hotdealsURL' : '/servlet/rest/hotdeals/buildandprice',
					'driveawayURL' : '/servlet/Satellite?pagename=DFY/Tools/CalculatePriceJSON&site=FOA&tool=buildandprice'
				}
			
//			configs.localStorageNames = {
//				'MODEL': 'bp-ls-model',
//				'PATH' : 'bp-ls-path',
//				'PACKAGE': 'bp-ls-package',
//				'DERIVATIVE': 'bp-ls-derivative',
//				'ENGINE': 'bp-ls-engine',
//				'COLOR': 'bp-ls-color',
//				'TRIM': 'bp-ls-trim',
//				'FEATURE': 'bp-ls-features',
//				'PRICEZONE' : 'bp-pricezone'
//			};
			};
			
			var comparatorRootUrl = '/servlet/rest/tools/comparator/' + configs['site'];
			var comparatorRootURLWithPricezone = comparatorRootUrl + '/:pricezoneId/';
			
			configs.comparator = {
				urls : {
					'modelListURL':  comparatorRootURLWithPricezone + 'models',
					'derivativeListURL': comparatorRootURLWithPricezone + 'model/:id/derivatives',	
					'compareURL': comparatorRootUrl + '/results/derivatives/',
					'pricezoneListURL' : comparatorRootUrl + '/pricezones'		
				}
			};
		}
		else {
		    configs.buildandprice = {};
		    configs.buildandprice.urls = {};
		    configs.comparator = {};
		    configs.comparator.urls = {};
		}
		
		return configs;
	 }
	
	return init();
	
})(window, document, jQuery)