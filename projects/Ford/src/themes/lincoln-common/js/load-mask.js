/*
 * load mask
 * to have a mask overlay on the specific container
 * Author: Ray Huang
 */

//globals jQuery, ND, window
var ND = (function(ND, $) {
	ND.mask = function () {
		return{
/*
 * @param sWarpper, the container needs to be put mask on
 */
			add: function(sWrapper) {
				var linkWrapper = $(sWrapper).children("a");//add mask
				if(linkWrapper.length>0){
					linkWrapper.each(function(){
						var mask = $(this).find(".mask");
						if(mask.length==0){//no mask under 'a' wrapper
							$(this).append("<div class='mask'></div>");
						}
						
						$(this).find(".mask").hide();
					});
				}
				
				if ( $(".ie8")[0] ) {
					$(sWrapper).hover(
						function(){
							$(this).find(".mask").show();
						},
						function(){
							$(this).find(".mask").hide();
						}
					)
				} else {
					$(sWrapper).hover(
						function(){
							$(this).find(".mask").fadeIn();
						},
						function(){
							$(this).find(".mask").fadeOut();
						}
					)
				}
			}
		}
	};
	return ND;	// Return ND after it's been augmented
}(window.ND || {}, jQuery));

(function($){
	$(function(){
		if(!ND.isIpad()){// remove hover state on ipad
			ND.mask().add(".tiles .element");
			ND.mask().add(".article-list .thumbnail");
		}
	});
}(jQuery));