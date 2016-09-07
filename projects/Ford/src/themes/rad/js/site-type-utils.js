(function($){

	var siteTypeUtils = {

			
		init: function(){
			
			//check if the cookie exist
			//set the cookie name and other cookie params 
			var store = Object.create(ND.cacheStore);
			store.key = "dfy.st";
			store.expires = 30;//30 days expiry
			store.domain = instance.commonConfig().cookieDomain;
			
			if (store.is()){ //cookie exists
				//console.log("dfy.st cookie exists")
				this.multiPlatformLinks(store.get()) //so process links
			} else {
				//get the promise from rad modules and wait till resolved
				//console.log("no dfy.st cookie exists")
				var siteTypePromise = instance.checkSiteType();
				siteTypePromise.success(function (data) {
					//console.log("got site type " + data)
				    store.set(data.siteType);
					siteTypeUtils.multiPlatformLinks(data.siteType);
				});
				siteTypePromise.error(function () {
					//console.log("unable to get site type.");
				});
			}
		},
	
		updateLink: function(anchor, siteType){
			var href = anchor.attr('data-href' + siteType);
			if (typeof href !== 'undefined' && href != '') {
				anchor.attr('href', href);
				//console.log("updated " + anchor);
			}
		},
			
		multiPlatformLinks: function(siteType){
			
			if (siteType !== 'web') {
				//process multi platform links and apply links specific to the device
				$('a.multiplatform').each(function() {
					if (siteType == 'smob' || siteType == 'mob') {
						siteTypeUtils.updateLink($(this), siteType);
					}
				});
			}
		}
	};
	
	$(function(){
		//console.log('siteTypeUtils init');
		siteTypeUtils.init();
	});

})(jQuery);