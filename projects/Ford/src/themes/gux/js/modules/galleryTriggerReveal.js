/*
Author: 		Brett Chaney
File name: 		galleryTriggerReveal.js
Description: 	Simple toggle for gallery trigger reveal
Dependencies: 	jQuery 	
*/


(function($){
	var galleryTriggerReveal = {

		init: function(){

			if($(".reveal-trigger .multi-buttons").find(".active").length < 1) {
				// if there is no active class found then add them
				$(".reveal-trigger .button").eq(0).addClass("active")
					.parents(".reveal-trigger").find(".gallery").eq(0).addClass("active");
			}
			
			$(".reveal-trigger").on("click", ".button", function(e) {
				e.preventDefault();
				
				var gallerySelected = $(this).data("gallery-type");

				$(this).parent().find(".button").removeClass("active").parent().find(".button[data-gallery-type=" + gallerySelected + "]").addClass("active")
					.parents(".reveal-trigger").find(".gallery").removeClass("active").parent().find(".gallery[data-gallery-type=" + gallerySelected + "]").addClass("active");

			});

		}		
	
	};

	$(function(){
		if (!$(".reveal-trigger").length) {return;}
		galleryTriggerReveal.init();
	});

})(jQuery);