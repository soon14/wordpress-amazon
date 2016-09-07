/*
Author: 		Ruiwen Qin
File name: 		component-init.js
Description: 	
Dependencies: 	jQuery
Usage: 			
*/

var guxPersonalisation = guxPersonalisation || {};

(function($){


	guxPersonalisation.components = {

		componentItems: {},

		init: function() {

			if (!$(".personalisation").length) {return;}

			$(".personalisation").each(function(){
				//go through the personalisation modules on the page, and store the module name and dom elements into componentsArry
				var $this = $(this);
				guxPersonalisation.components.componentItems[$this.data("psn-module")] = $this;
			});

		},
		execute: function() {

			// init only when personalisation component found
			var billboardEl = guxPersonalisation.components.componentItems["billboard"],
				brandGallaryEl = guxPersonalisation.components.componentItems["brandgallery"],
				knowVehicleEl = guxPersonalisation.components.componentItems["knowvehicle"],
				dealerMsgEl = guxPersonalisation.components.componentItems["dealermessage"],
				locateDealerEl = guxPersonalisation.components.componentItems["locatedealer"],
				accessoriesEl = guxPersonalisation.components.componentItems["accessories"],
				promotionsEl = guxPersonalisation.components.componentItems["promotions"],
				rvvEl = guxPersonalisation.components.componentItems["recentlyviewed"],
				showRoomEl = guxPersonalisation.components.componentItems["showroom"];

			if($(billboardEl).length > 0) {
				guxPersonalisation.billboard.init(billboardEl);
			}

			if($(brandGallaryEl).length > 0) {
				guxPersonalisation.brandgallery.init(brandGallaryEl);
			}

			if($(knowVehicleEl).length > 0) {
				guxPersonalisation.knowvehicle.init(knowVehicleEl);
			}

			if($(dealerMsgEl).length > 0) {
				guxPersonalisation.dealermessage.init(dealerMsgEl);
			}
			if($(locateDealerEl).length > 0) {
				if (guxApp.tools.isAutoNaviMap()&&!guxApp.autonaviMapController) {
				//amap controller not loaded
					$.subscribe('amap-api-done', (function(){
					guxPersonalisation.locatedealer.init(locateDealerEl);
					}));				
				}
				else {
				//google map or amap controller loaded
					guxPersonalisation.locatedealer.init(locateDealerEl);				
				}
			}
			if($(accessoriesEl).length > 0) {
				guxPersonalisation.accessories.init(accessoriesEl);
			}

			if($(promotionsEl).length > 0) {
				guxPersonalisation.promotions.init(promotionsEl);
			}

			if($(rvvEl).length > 0) {
				guxPersonalisation.recentlyviewed.init(rvvEl);
			}

			if($(showRoomEl).length > 0) {
				guxPersonalisation.showroom.init(showRoomEl);
			}

			guxPersonalisation.smartnextsteps.init();
			
		}

	};

	$(function(){
		guxPersonalisation.components.init();
	});

})(jQuery);