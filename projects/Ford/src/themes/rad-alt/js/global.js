/*
 * Author: Ruiwen Qin
 * Description: 
 */

(function($){
	
	$(document).ready(function(){

		var isMobile = instance.isMobile(),
		 	isDesktop = instance.isDesktop(),
		 	isTablet = instance.isTablet(),
		 	dealerResults;

		/* If data-background is specified, get the image path and set this published background.
		*  Add active state when click the widgets
		*/
		if ($(".widgets").length > 0){
			var widgets = $(".widgets");
			var widgetsItem = $(".widgets > ul > li");
			

			widgetsItem.each(function(){
				var that = $(this);
				var backgroundImage = that.data('background');
				if (backgroundImage){
					that.addClass("customized");

					if (isDesktop){
						that.css({
							"background-image":'url(' + backgroundImage + ')'
						});
						that.children("div").css({
							"background-image":'url(' + backgroundImage + ')'
						});

						that.click(function(){
							$(this).addClass("active").siblings().removeClass("active");
						});
					}

					if (isTablet){
						that.css({
							"background-image":'url(' + backgroundImage + ')'
						});
						that.children("div").css({
							"background-image":'url(' + backgroundImage + ')'
						});

						that.click(function(){
							$(this).addClass("active").siblings().removeClass("active");
						});
					}

					if (isMobile){
						$("h2", that).css({
							"background-image":'url(' + backgroundImage + ')'
						});
						$("h2", that).click(function(e){						
							$(this).parents("li").toggleClass("active");
						});
					}
				}
				else {
					if (isMobile){
						$("h2", that).click(function(e){						
							$(this).parents("li").toggleClass("active");
						});
					}
					else {
						that.click(function(){
							$(this).addClass("active").siblings().removeClass("active");
						});
					}
					
				}
			});

			
		}


		/* Call sliders.js for triggering bxslider */
		/* The options are below */
		/* elem,minSlides,maxSlides,slideWidth,slideMargin,infiniteLoop,hideControlOnEnd,adaptiveHeight,pageCounter,moveSlides,pagerType */
		var nextText = Translator.translate("Next");
		var prevText = Translator.translate("Prev");
		if (isMobile){
			// video carousel on dashboard
			var videoCarousel = sliders().init(".video-carousel",1,3,212,26,true,true,false,false,1,"short",nextText,prevText);
			// dealer locator search results
			sliders().init('.dealer-outer-wrap .locator .dealer-results .mobile-view',1,1,0,0,false,true,true,true,1,"short",nextText,prevText);
		}
		else {
			// video carousel on dashboard
			var videoCarousel = sliders().init(".video-carousel",3,3,286,26,false,true,false,false,3,"full",nextText,prevText);
			// dealer locator search results
			sliders().init('.dealer-outer-wrap .locator .dealer-results .tablet-view',1,1,0,0,false,true,true,true,1,"short",nextText,prevText);
		}

		/* Preferred dealer module toggle on dealer locator page */
		// if (!isDesktop){
			if ($(".dealer-results .preferred-dealer").length > 0){
				var container = $(".dealer-results .preferred-dealer"),
					heading = $(".heading", container),
					content = $(".dealer", container);
				heading.click(function(){
					content.slideToggle();
					$(this).toggleClass('active');
				});
			}
		// }
		
		

	});
		

}(jQuery));
