/*
 * rotating banner
 * use bxslider to implement slideShow functionality
 * automatically jump to the next page every 6 seconds
 * Author: Ray Huang
 */

//globals jQuery, ND, window
var ND = (function(ND, $) {
	ND.rotatingBanner = function () {
		var element;
		return{
/*
 * @param sEl, slider element
 * @param bPager,false to remove pagination of the rotating banner
 * @param sPagerType, "full" and "short" represent different type of pagers
 * @param iIndex, integer number to indecate start from which slide,default 0
 */
			init: function(sEl,bPager,sPagerType,iIndex) {
				var i=0;
				if(sPagerType&&sPagerType=="short"){//fixed img pager duplicated perload issue when use short PagerType
					$(sEl).parent().addClass("hideFullPager");
				}
				element = $(sEl+" li");// Check this module needs to be initalised for this page
				if( element.size() < 2 ) { return; }//no rotating if there is only one slides
                var isHomePage = ($('.rotatingbanner .image .slideritemwrap').length > 0)?true:false;
				var slider = $(sEl).bxSlider({
					pause : 5000,
					pager: bPager,
					autoHover : true,
					pagerType : sPagerType,
					startSlide : iIndex,
                    auto: isHomePage?true:false,
                    autoHover: isHomePage?true:false
				});
                if(isHomePage){
                    $('.image .bx-controls-direction .bx-prev, .image .bx-controls-direction .bx-next').click(function(){
                        slider.stopAuto();
                        slider.startAuto();
                    })
                }
			}
		}
	};
	return ND;	// Return ND after it's been augmented
}(window.ND || {}, jQuery));

(function($){
	$(function(){
		ND.rotatingBanner().init(".image .slideritemwrap",false);
	});
}(jQuery));