/*
Author: 		Randell Quitain
File name: 		modelWalk.js
Description: 	Compare vehicles
Dependencies: 	Angular, jQuery
*/

(function($){
	var modelWalk = {
		init: function(){
			// selected sticky header
			if (!$('.selected-sticky').length) {return;};
				var selectedSticky = selectedSticky?selectedSticky:$('.selected-sticky'),
					startPoint = 70,
					startPointSecondNav = 70,
					sNav = $('.secondarynav');

          
				$(window).on('scroll', function() {
					var scroll = $(window).scrollTop();
					if (scroll > startPoint) {
						selectedSticky.addClass('fixed');
					} else {
						selectedSticky.removeClass('fixed');
					}

					if(scroll < startPointSecondNav){
		                sNav.removeClass('fullwidth');
		            } else {
		                sNav.addClass('fullwidth');     
		            }

		            if(guxApp.viewport.view == "mobile"){
						$(".title-holder").trigger("sticky_kit:detach");
					}else{
						guxApp.accordion.stickyTitle();
					}
				});

				$('.tab-nav:eq(1)').addClass('open');
				$('.tab-contents:eq(1)').addClass('open');

		},
		zebraStyling: function(){
			//this is for accordion table styling for ie8
			var accordion = $('.accordion-block');
			
			if (!$(accordion).length) {return;}
			
			if(guxApp.tools.isIE(8)) {
				$('.accordion-block .table-holder > table tr:odd').addClass('odd');
			}
		},
        recalcSticky: function(){
            var debouncedCalc = _.debounce(function() {
                if(guxApp.viewport.view !== "mobile"){
                    guxApp.accordion.stickyTitle();
                }
            },300);

            $(window).on('resize', debouncedCalc);            
        },
		/* on mobile view, enlareg "vehicle card" by click */
		enlargeVehicleCard : function() {
			var container = $("#content .model-walk.model-enhance"),
			    vehicleCard = $(".mw-wrapper .mw-content .select-models .model-container", container);
			if ( !container || vehicleCard.length===0) return;
			$(".model-data .model-select a", vehicleCard).on("click", function(e){
				var clonedVehicleCard = $(".mw-wrapper",container).siblings(".model-container");
				if(guxApp.viewport.view ==="mobile" && clonedVehicleCard.length ===0) {
					e.preventDefault();
					var curVehicleCard = $(this).closest(".model-container");
					$("body").addClass("no-scroll has-scroll");
					curVehicleCard.clone().addClass("clone").insertAfter($(".mw-wrapper",container)).fadeIn(function(){
						//"hide-for-large-up" is a foundation visibility setting class, to hide the element above your query setting "@media #{$large-up}"
						$(this).addClass("hide-for-large-up");
					});
				}
			
			});
			container.on("click",".close-vehicle",function(e){
				e.preventDefault();
				$(this).closest(".model-container").fadeOut(function(){
					$("body").removeClass("no-scroll has-scroll");
					$(this).remove();
					});
			});
		
		}
	};

	$(function(){
		modelWalk.init();
		modelWalk.zebraStyling();
		modelWalk.recalcSticky();
		modelWalk.enlargeVehicleCard();
	});
})(jQuery);