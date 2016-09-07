/**
 * rotating banner
 * use bxslider to implement slideShow functionality
 * implementation will be added by adding "rotating-banner" class in body tag
 * default behavior is automatically jump to the next page every 6 seconds
 * @author Ray Huang
 */

//globals jQuery, ND, window
var ND = ( function(ND, $) {
	/**
	 * @param el, String, element that you wish bind image carousel to
	 * @param opts, Object, an options object to initialize the carousel
	 */
	ND.rotatingBanner = function(el,opts) {
		var element = el||".rotating-banner .slideritemwrap";
		if($(element+">div").length < 2 && $(element+">li").length < 2) { return; }//no rotate if there is only one slide
		var options = opts||{
			slideWidth : 1200,
			slideMargin : 0,
			auto : true,
			pause : 6000,
			autoHover : true
		}
		//fixed bxslider bug : auto slide will stop after click/swipe to the next slide manually
		//can use call() method to inherit onSlideAfter from opts in order to prevent onSlideAfter method been overrided
		if(!options.onSlideAfter&&options.auto){
			options.onSlideAfter = function() {
				slider.startAuto();
			}
		}
		
		var slider = $(element).bxSlider(options);
		
		/*
		* if ipad and bannerWidth greater than bodyWidth(entire page),
		* override the body width and footer width.
		* this fixed incorrected page display under ipad when banner width is greater than page width
		*/
		var ua = navigator.userAgent.toLowerCase(),
			bannerWidth = $(element).closest(".bx-wrapper").width(),
			bodyWidth = $("body").width();
		if (ua.match(/iPad/i)=="ipad"&&bannerWidth>bodyWidth){
			$("body,#footer-wrapper").css("min-width",bannerWidth);
		}
	}
	
	return ND;
}(window.ND || {}, jQuery));

(function($){
	/**
	 * load image carousel here, you can have as many way as you like
	 * Alternatively, you can load your image carousel in other files for specific purpose (eg, you want to bind the image carousel after some events triggered)
	 */
	$(function(){
		//keep "if" statement for this carousel load only , to remain previous projects load image carousel safely
		var bannerWidth = $(".rotating-banner .slideritemwrap").width();
		if($(".rotating-banner").length>0&&bannerWidth==1200){
			ND.rotatingBanner();
		}
		
		/**
		 * custom an image carousel: for example
		 * 
		 *  ND.rotatingBanner(".careers .slideritemwrap",{
		 *	    controls: false,
		 *	    pause : 6000,
		 *	    autoHover : true
		 *  });
		 */
		
	});
}(jQuery));