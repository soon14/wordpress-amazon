/*
Author: 		Ruiwen Qin
File name: 		brandgallery.js
Description: 	Toggle showing elements on mobile view
Dependencies: 	jQuery 
Usage: 			
*/


(function($){
	var brandgallery = {
		init: function(){
			if (!$(".brand-gallery").length) {return;}

			var gallery = $(".brand-gallery");

			brandgallery.toggleElements(gallery);

		},
		toggleElements: function(gallery){
			var items = $(".show-for-large-up",gallery).not(".hero"),
				expandbar = $(".expandbar",gallery),
				btnAll = $(".viewall",expandbar),
				btnLess = $(".viewless",expandbar),
				btnIcon = $(".icon",expandbar);
	
			expandbar.click(function(){
				if (btnAll.is(":visible")){
					btnAll.hide();
					btnLess.show();
					btnIcon.addClass("icon-minus");
					items.removeClass("show-for-large-up");
				}
				else {
					btnAll.show();
					btnLess.hide();
					btnIcon.removeClass("icon-minus");
					items.addClass("show-for-large-up");
				}
			});
		}
	
	}

	$(function(){
		brandgallery.init();
	});

})(jQuery);