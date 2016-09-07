/*
 * Author:      Ray Huang
 * Description: add class "active" to specific element when click, remove before page showing
 */

(function($) {
	
	$(function(){
		/*
		 * @param element
		 */
		ND.addActiveCls = function(element) {
			$(element).bind("click",function(){
				$(this).addClass("active");
			})
		}
	});

})(jQuery);

(function($, window, undefined){
	//bind "tab" event when init the page
	$(document).on("pageinit","div:jqmData(role='page')", "div:jqmData(role='dialog')", function(){
		ND.addActiveCls(".navbtns .icon");
		ND.addActiveCls(".navbtns .custom-brown");
	})
	//remove active states during page switch
	$(document).on("pagebeforeshow pageaftershow", "div:jqmData(role='page')", "div:jqmData(role='dialog')", function(){
		if($(this).find(".navbtns").length>0){
			$(this).find(".navbtns a").removeClass("active");
		}
	})
})(jQuery, window);