/*
Author: Ruiwen Qin
File name: brochure-request.js
Description: 1. Retrieve the models information and render the carousel
*/

(function($){

	$(function(){
		if(!$(".auto-download").size()) {return;}

		$("img").imagesLoaded(function(){
			$(".auto-download")[0].click();
		})
		
		

	});

})(jQuery);
