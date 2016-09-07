/**
 * all js related careers page goes here
 * require, rotating-banner.js
 * @author Ray Huang
 */

(function($){
	$(function(){
		if($("body").hasClass("careers")){
			/**
			 * custom image carousal
			 */
			ND.rotatingBanner(".careers .slideritemwrap",{
				mode: "fade",
				auto: true,
				controls: false,
				pause : 6000,
				autoHover : true
			});
			
			ND.rotatingBanner("#body .bxslider",{
				infiniteLoop: false,
				pager: false,
				slideWidth: 153,
			    minSlides: 2,
			    maxSlides: 3,
			    slideMargin: 1,
				hideControlOnEnd : true,
				onSlideBefore : function(slideElement,oldIdx,newIdx) {
					var clonedElement = slideElement.closest(".img-carousal").find(".thumbnail.clone");
					if(clonedElement.length>0){
						clonedElement.remove();//remove cloned element before each slide start
					}
				}
			});
			
			/**
			 * sticky the secondary navgation
			 * scroll to the specific content after click
			 */
			var nav = $("#secondary-nav");
			
			if(nav.length>0){//if navigation exist
				var topHeight = nav.offset().top;
				if ($(window).scrollTop() > topHeight){//for page load
					nav.addClass("sticky");
				}
				
				$(window).scroll(function(){//trigger when scroll event occurs
					if ($(window).scrollTop() > topHeight){
						nav.addClass("sticky");
					}
					else {
						nav.removeClass("sticky");
					}
				});
				
				var navItem = $("#secondary-nav li > a");
				navItem.on("click",function(e){
					e.preventDefault();
					var scope = $(this);
					var anchor = scope.attr("href");
					if(anchor=="#top"){//if anchor sets "#top", scroll to the top
						$("html, body").stop().animate({
							scrollTop: 0
						}, 500); 
					}else{
						if(!$(anchor).offset()){ return; }//if anchor is not exist, do nothing
						var position = $(anchor).offset().top-nav.outerHeight()-30;
						$("html, body").stop().animate({
							scrollTop: position
						}, 500); 
					}
				})
			}
			
			/**
			 * add "current" class for clicked element as activated element
			 * copy original element
			 * position copied element above the orirginal element as activation status
			 * 
			 * the reason for not doing this in css is because the parent has "overflow:hidden" and "position:relative"
			 * this will banned any child overflow element flyout to their parent box
			 */
			var stopExcution = true;// a flag to stop excute functionalities behand it
			$(".careers .img-carousal .bx-wrapper li").click(function(e){
				e.preventDefault();
				var scope = $(this);
				var idx = scope.index();
				var wrapper = scope.closest("#work-ford");
				
				//add "current" class to activated element
				wrapper.find("ul.bxslider > li").removeClass("current");
				scope.addClass("current");
				
				//copy original element, ready for cover above the original element
				var element = scope.children(".thumbnail");
				wrapper.find(".clone").remove();
				var cloneElement = element.clone().addClass("clone").insertAfter($(".careers .img-carousal .bx-controls"));
				cloneElement.click(function(e){e.preventDefault()});//prevent click tag "a" jump back to the top of browser
				var coordinates = {
					top: element.offset().top-12,
					left: element.offset().left-12
				}
				cloneElement.offset(coordinates);
				
				//to prevent first time click first element issue which will casue the first element disapper and fade in again.
				if(scope.index()==0&&stopExcution){ return; }
				//add "current" class to related element as activation status
				wrapper.find("ul.detail > li").fadeOut("slow").removeClass("current");
				wrapper.find("ul.detail > li:eq("+idx+")").fadeIn("slow").addClass("current");//show the related image
				stopExcution = false;
			})
		}
	});
}(jQuery));