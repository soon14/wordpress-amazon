/*globals jQuery, ND, window */
(function(ND, $){
	$(function($){

		var vignettePlayer = ND.vignettePlayer().init();		
		var browserCheck = ND.browserCheck().init();
		var expandFromCenter = ND.expandFromCenter().init();
		var fillScreen = ND.fillScreen().init();
		//var overScroll = $("#page").overscroll();
	});
}(window.ND || {}, jQuery));