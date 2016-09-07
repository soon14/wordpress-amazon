/*
Author: 		Ruiwen Qin
File name: 		revealerVertical.js
Description: 	Vertical revealer
Dependencies: 	jQuery 
Usage: 			<div class="large-12 columns">
					<div class="revealer-vertical">
						<div class="hide">...</div> // add hide class onto the element you want to hide initially
					</div>
				</div>
*/

var guxApp = guxApp || {};

(function($){
	guxApp.revealerVertical = {
		init: function(){
			if (!$(".revealer-vertical").length){return;}

			var container = null,
				items = $(".revealer-vertical .hide");

			$(".revealer-vertical .revealer-open").click(function(e){

				var btnOpen = $(this);

				if (btnOpen.is('.trackable') && !e.originalEvent) { return false; } // temporary solution to prevent multiple trigger
				
				container = btnOpen.parents(".revealer-vertical");
				items = $(".hide",container);

				btnOpen.toggleClass("active");
				items.slideToggle("normal",function(){
					var item = $(this);
					//for maps only
					// if(item.hasClass("map")&&item.is(":visible")&&guxApp.googleMapController.map){
					// 	google.maps.event.trigger(guxApp.googleMapController.map.map,'resize');//resize hidden map
					// }
				});
			});

			$(window).resize(function(){
				if ($(window).width() < 768){
					items.show();
				}
			});

		}
	
	}

	$(function(){
		guxApp.revealerVertical.init();
	});

})(jQuery);