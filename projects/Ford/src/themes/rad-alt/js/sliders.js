/*
 * Author: Ruiwen Qin
 * Description: Triggering bxslider
 * Usage: 1. Options: pageCounter - whether showing the numbers of current/total slider
 *		  2. getPagerSize() and pagerShift() are used to customize the pagination. 
 */

(function($) {
	var pagerContainer,
		pagerContainerWidth,
		pagerContainerOffset,
		firstPager,
		firstPagerOffset,
		difference,
		prevPosition,
		pagers,
		pagersWrap;

	//The create function creates the module object; It does no initialise the object
	sliders = function () {
		
		return {

			init: function( elem,minSlides,maxSlides,slideWidth,slideMargin,infiniteLoop,hideControlOnEnd,adaptiveHeight,pageCounter,moveSlides,pagerType,nextText,prevText ) {
				element = $(elem || "");
					
				/* Check this module needs to be initalised for this page */
				if( !element || !element.size() ) { return this; }
			
				var options = {
					module: elem,
					minSlides: minSlides,
					maxSlides: maxSlides,
					slideWidth: slideWidth,
					slideMargin: slideMargin,
					infiniteLoop: infiniteLoop,
					hideControlOnEnd: hideControlOnEnd,
					adaptiveHeight: adaptiveHeight,
					pageCounter: pageCounter,
					moveSlides: moveSlides,
					pagerType: pagerType,
					nextText: nextText ? nextText: "Next",
					prevText: prevText ? prevText: "Prev"
				}

				sliders().slides(options);
				
				return this;
			
			},

			slides: function(options){
				slider = $(options.module + " .bxslider").bxSlider({
					minSlides: options.minSlides,
					maxSlides: options.maxSlides,
					slideWidth: options.slideWidth,
					slideMargin: options.slideMargin,
					infiniteLoop: options.infiniteLoop,
					hideControlOnEnd: options.hideControlOnEnd,
					moveSlides: options.moveSlides,
					pagerType: options.pagerType,
					pager:  ($(options.module + " .bxslider").children().length > options.minSlides) ? true: false,
					controls: ($(options.module + " .bxslider").children().length > options.minSlides) ? true: false,
					nextText: options.nextText,
					prevText: options.prevText,
					onSliderLoad: function(currentIndex){
						if (options.pageCounter){ 
							var slideCount = ($(options.module + " .bxslider > li").length),
								slideCurrent = currentIndex;
							sliders().insertCount(options.module,slideCurrent,slideCount);
							sliders().pagerEvents(options.module);
							if($(window).width() >= 768){
								instance.widgetsInit(); // refresh the layout for wookmark
							}
							// if (options.pagerType === "full"){
							// 	sliders().getPagerSize(options.module);
							// }
							
						}
						$.publish("sliderLoaded");
					},
					onSlideNext: function(e){
						if (options.pageCounter){
							var slideCount = slider.getSlideCount();
							var slideCurrent = slider.getCurrentSlide();
							sliders().insertCount(options.module,slideCurrent,slideCount);
							sliders().trackEvent(slideCurrent,slideCount);
							// if (options.pagerType === "full"){
							// 	sliders().pagerShift("next");
							// }
						}
						$.publish("slideNext",[slideCurrent]);
						
					},
					onSlidePrev: function(){
						if (options.pageCounter){
							var slideCount = slider.getSlideCount();
							var slideCurrent = slider.getCurrentSlide();
							sliders().insertCount(options.module,slideCurrent,slideCount);
							sliders().trackEvent(slideCurrent,slideCount);
							// if (options.pagerType === "full"){
							// 	sliders().pagerShift("prev");
							// }
						}
						$.publish("slidePrev",[slideCurrent]);
					}
				});	


			},

			// Update the number of current/total slider
			insertCount: function(module,slideCurrent,slideCount){
				var module = $(module),
					current = $(".currentPage",module),
					total = $(".totalPage",module);

				current.html(slideCurrent+1);
				total.html(slideCount);

			},
			trackEvent:function(slideCurrent,slideCount) {
	            if (window._da && window._da.om && ND && ND.omniture) {
	            	ND.analyticsTag.trackOmniturePage({	            		
	            		tool:"event:find dealer",	
	            		tooldesc:"find dealer:" +(slideCurrent+1) +" of "+slideCount
	            	});
	            }				
	        },
			// Update the number of current/total slider when click the pagers
			pagerEvents: function(module){
				$(module).on("click", ".bx-pager a", function(){
					var currentIndex = $(this).data("slide-index");
					sliders().insertCount(module,currentIndex);
					$.publish("pagerClick",[currentIndex]);
				});
			}

			// getPagerSize: function(module){
			// 	pagerContainer = $(".bx-pager",module);
			// 	pagerContainerWidth = pagerContainer.width();
			// 	pagerContainerOffset = pagerContainer.offset();

			// 	pagers = $(".bx-pager-item",pagerContainer);
			// 	pagers.wrapAll("<div class='bx-pager-items'></div>");

			// 	pagersWrap = $(".bx-pager-items",module);

			// 	firstPager = $(".bx-pager .bx-pager-item:first-child");
			// 	firstPagerWidth = firstPager.width();
			// 	firstPagerOffset = firstPager.offset();

			// 	difference = firstPager.next(".bx-pager-item").offset().left - firstPagerOffset.left;

			// },

			// pagerShift: function(direction){
			// 	var activePager = $(".bx-pager .bx-pager-item .active");
			// 	var activePagerWidth = activePager.width();
			// 	var activePagerOffset = activePager.offset();


			// 	if (direction === "next"){
			// 		if (Math.round(activePagerOffset.left + difference) >= (pagerContainerOffset.left + pagerContainerWidth)){
			// 			pagersWrap.animate({
			// 				marginLeft: parseInt(pagersWrap.css("margin-left")) - difference +"px"
			// 			});
			// 		}
			// 	}

			// 	if (direction === "prev"){
			// 		if (Math.round(activePagerOffset.left - pagerContainerOffset.left) < difference){
			// 			pagersWrap.animate({
			// 				marginLeft: parseInt(pagersWrap.css("margin-left")) + difference +"px"
			// 			});
					
			// 		}
			// 	}
				
			// }
		};	
	};
	
	

}(jQuery));

