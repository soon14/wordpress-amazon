(function($){
	
	var gallerySlider = {
		init: function(){
			
			if ($(".imgnav .bxslider").length > 0){
				slider = $(".imgnav .bxslider").bxSlider({
					pager:false,
					speed:300,

					onSliderLoad: function(currentIndex){
						totalSlides = slider.getSlideCount();
						gallerySlider.counterInit(currentIndex,totalSlides);
					},
					onSlideBefore: function($slideElement, oldIndex, newIndex){
						gallerySlider.counterUpdate($slideElement, oldIndex, newIndex);
					}
				});
			}
		},
		counterInit: function(currentIndex,totalSlides){
			var currentPage = $(".imgnav .bxslider .pager .current"),
				totalPages = $(".imgnav .bxslider .pager .total");
		
			currentPage.html(currentIndex+1);
			totalPages.html(totalSlides);
		},
		counterUpdate: function($slideElement, oldIndex, newIndex){
			var currentPage = $(".pager .current", $slideElement);
			currentPage.html(newIndex+1);
		}
	}

	$(function(){
		gallerySlider.init();
		
	});

}(jQuery));