/*
Author: York Zhang
Description: Let user set prefered dealer on dealer locator page
*/

(function($){

	var dealer = {
		
		setPreferedDealer: function(){
			
			$(".set-preferred").click(function(e){
				e.preventDefault();

				var $this = $(this);
				var dealerCode = $this.parents(".dealer").attr("id");
				var dealerRegion = $this.parents(".dealer").attr("data-region");

				var store = Object.create(ND.cacheStore);
				store.key = "dfy.dl";
				store.expires = 365;
				store.domain = instance.commonConfig().cookieDomain;

				store.set(dealerCode);

				$("#successful-content").foundation('reveal', 'open', {
					animationSpeed: 110
				});
				if (window._da && window._da.om && ND && ND.omniture) {	
					_da.events = undefined;
					_da.tool = undefined;
					_da.onclicks = undefined;
					_da.funnel.stepname = "preferred dealer";
					if(dealerRegion){
						_da.region = dealerRegion;	
					}	            
		            _da.dealer = {code: dealerCode}
					ND.analyticsTag.trackOmniturePage();
				}
				// $.publish('apa-set-preferred-dealer',[dealerCode]);
			});

			$("#successful-content .close-reveal-modal, .reveal-modal-bg").live("click", function(e){
				e.preventDefault();
				$('#successful-content').foundation('reveal', 'close');

				if ($(".dealer-map-pagination").length > 0){
					location.reload(); // updating the preferred dealer
				}
			});

		},

		showOrHideDealerBtn: function(){
			var loggedInPromise = instance.checkUserLogin();
			loggedInPromise.success(function (data) {
				// console.log("login",data.loggedin);
				if (data.loggedin === "true"){
					$(".set-preferred").css('visibility','visible');
				}
			});
		}

	};

	$(function(){
		if(!$(".set-preferred").size()) {return;}
		dealer.showOrHideDealerBtn();
		dealer.setPreferedDealer();
		
	});

})(jQuery);


