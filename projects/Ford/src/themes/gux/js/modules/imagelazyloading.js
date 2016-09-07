/*
Author: Ruiwen Qin
File name: imagelazyloading.js
Description: 
Dependencies: jQuery
Usage: 1. Add .lazy-loading class onto img tags
	   2. Use img/blank.gif as img src
	   3. Specify real image url in data-image-src attribute in img tag

	   Example: 
	   <img class="lazy-loading" src="media/blank.jpg" data-image-src="vehicle_fiesta.jpg" width="146" height="109" alt="Fiesta" />
*/

(function($){
	imageLazyLoading = {
		init: function(){
			if (!$(".lazy-loading").length) {return;}
			var images = $(".lazy-loading");
			imageLazyLoading.loading(images);
		},
		loading: function(images){
			images.each(function(){
				var image = $(this),
					src = image.data("imageSrc");
				image.prop("src",src);
			});
		}
	};

	$(function(){
		imageLazyLoading.init();
	});

})(jQuery);