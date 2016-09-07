/*
Author: Gianfranco del Mundo
File name: creditInvestor.js
Description: 

Dependencies: jQuery
*/

(function($) {
	
	var investor = {
		init : function(){
			if(!$('.model-display.index-bar').length){return;}

			this.registerControlEvents();
			this.highlightSelectedItem();
		},
		highlightSelectedItem : function(){
			
			$.subscribe('flex-complete',function(){

			var targetDataList = $('.flexslider.carousel-limit .slides li a');
			
				targetDataList.each(function(){
					var thisTargetData = $(this),
						targetDataKey = thisTargetData.attr("href");
					if(window.location.href === targetDataKey){
						thisTargetData.addClass('active');
					}
				});
			});

			
		},
		registerControlEvents: function(){
			$('.next-smob').click(function(e){
			    e.preventDefault();
			    var prevButton = $('.smob-controls .prev-smob');
			    $('.flexslider.carousel-limit').flexslider('next');
   			    prevButton.show();
			    return false;
			});

			$('.prev-smob').click(function(e){
			    e.preventDefault();
			    var nextButton = $('.smob-controls .next-smob'),
			    	prevButton = $('.smob-controls .prev-smob');
			    $('.flexslider.carousel-limit').flexslider('prev');

			    if(nextButton.is(':hidden')){
			    	nextButton.show();
			    }


			    return false;
			});
		}
	};

	$(function(){
		investor.init();
	});

}(jQuery));
