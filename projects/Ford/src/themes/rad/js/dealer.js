/*
Author: Ruiwen Qin
Description: This is for displaying the dealer information
*/

(function($){

	var widgets = {
		
		fetchAndDisplayDealerDetails: function(dealerCode) {
			if (typeof dealerCode !== undefined) {
				//[MK] prepare a URL get the dealer details
			 	url = widgets.setupDealerDetailsUrl(dealerCode); 

			 	if (url){
					data = widgets.fetchData(url, function(data) {
						widgets.renderTemplate(data,true);
					}, function () {
						widgets.renderTemplate(data,false);
					});
				 	
			 	}	else { // url is not available
					widgets.renderTemplate(data,false);
				}
			 	
			} else {
				widgets.renderTemplate(data,false);
			}
		},
			
		dealerInit: function(){

			//check if we have dealer template snippet here
			//if not - return - we are on the page with no dealer widget
			if ($("#dealer-template").length == 0 && $("#dealer-template-not-loggedin").length == 0) return; 
			
			var url = null,
			    dealerCode = null,
			    data = null,
			    success = false,
			    store = Object.create(ND.cacheStore);
			    
			//set the cookie name and other cookie params 
			store.key = "dfy.dl";
			store.expires = 365;
			store.domain = instance.commonConfig().cookieDomain;
			
			//
			//[MK] First step is to get the cookie
			//
			if (store.is()){ //cookie exists
			// if (store.key === "dfy.dl"){
			 	// dealerCode = store.get();
			 	dealerCode = $.trim($.cookie(store.key)); // for fixing JSON.parse() issue in IE10

			 	widgets.fetchAndDisplayDealerDetails(dealerCode);

			} else { //cookie does not exist
				
				//checkUserLogin is asynchronous - returns a promise
				var loggedInPromise = instance.checkUserLogin();
				loggedInPromise.success(function (data) {

					// console.log("promise resolved: " + data.loggedin);
					
					if (data.loggedin === "true"){ 
	
						// user has logged in - prepare the url to get the dealer code
						url = widgets.setupOwnerDealerUrl();

						if (url){
							widgets.fetchData(url,
								function (data) {
									//[MK] error handling should go here - what will happen when no data is returned? Call widgets.renderTemplate(data,false);?
									if (typeof data !== "undefined" && $(data).length != 0
											&& typeof data.dealercode !== "undefined" && data.dealercode.length > 0){
										dealerCode = data.dealercode;
										widgets.storeCookie(store, dealerCode);
										widgets.fetchAndDisplayDealerDetails(dealerCode);
									} else {
										widgets.renderTemplate(data,false);
									}
								},
								function () {
									widgets.renderTemplate(data,false);
								});
							
						}
						else {// url is not available
							widgets.renderTemplate(data,false);
						}
						
					}	else{
	
						// user has not logged in
						widgets.notLoggedInTemp();
					}				
				});
			}
		},
		

		//[MK] This functions prepares the url which gets the dealer details
		setupDealerDetailsUrl: function(dealerCode){
			var path = instance.serviceLocator('dealer.code');
			path = path.replace("{code}", dealerCode);
			return path;
		},

		//[MK] This functions prepares the url which gets the dealer code (no parameters)
		setupOwnerDealerUrl: function(dealerCode){
			var path = instance.serviceLocator('owner.dealer');
			return path;
		},
		
		fetchData: function(url, onSuccess, onError){
			$.ajax({
	  			url: url,
	  			async: true,
	  			dataType: 'json', 
	  			success: function(data){
	  				onSuccess(data);
	  			},
				error: function(e, extStatus){
					onError(url, e, extStatus);
				}
	  		});	
		},

		
		// [MK] if you follow my advice you would not need to go through this
		// calculate expirry date business. You'd just need to pass 365 as an
		// argument
		storeCookie: function(store,dealerCode){

			
			//store the cookie with the default options
			store.set(dealerCode);

		},

		renderTemplate: function(data,success){
			if ($(".widgets").length > 0){
				var container = $(".widgets .dealer");
			}

			if ($(".dealer-results .preferred-dealer").length > 0){
				var container = $(".dealer-results .preferred-dealer .dealer");
			}
			
			if (success){
				var markup = $("#dealer-template").html();
				$.template("dealerTemplate",markup);
				$.tmpl("dealerTemplate",data).appendTo(container);
				$(".loading", container).hide();
				if(!instance.isMobile()){
					instance.widgetsInit();
				}

				if (container.length > 0){
					// bind APA specific events - apa-dealer.js
					$.publish('apa-dealer',[container,data,markup]);
				}

				if ($(".dealer-results .preferred-dealer").length > 0){
					// bind APA specific events - apa-dealerMap.js
					$.publish('apa-preferred-dealer-mapPin',[data]);
				}
			}

			else{
				$(".loading", container).hide();
				widgets.notLoggedInTemp();
			}
		},

		notLoggedInTemp: function(){
			var container = $(".widgets .dealer");
			var markup = $("#dealer-template-not-loggedin").html();
			$(markup).appendTo(container);
			$(".loading", container).hide();

			if (container.length > 0){
				// bind APA specific events
				$.publish('apa-dealer-notLoggedIn',[container]);
			}
			
			if(!instance.isMobile()){
				instance.widgetsInit();
			}

			if ($(".dealer-results .preferred-dealer").length > 0){

				// bind APA specific events - apa-dealerMap.js
				$.publish('apa-preferred-dealer-mapPin-notLoggedIn');
			} 
		}

		
	};

	$(function(){
		widgets.dealerInit();
	});

})(jQuery);


