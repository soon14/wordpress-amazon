/*
Author: 		Randell Quitain
File name: 		modelDisplay.js
Description: 	Change .model-display layout when its has 1 item only
				Additionally functionality: If there are more than 7 items, text controls are displayed instead of meatballs
Dependencies: 	jQuery 	
*/

(function($){
	var modelDisplay = {
		init: function(){
			var md 	 = $(".model-display"),
				self = this,
				width = $(window).width(),
				maxItems = 7; // set max meatballs displayed here before alt controls are used

			if($(".carousel-limit li", md).length <= 1) {
				md.addClass('model-single');
			}			

			$(".flexslider", md).append("<div class='alt-controls'><span class='alt-prev' /><span class='item-count'><span class='current-item' />/<span class='items-total' /></span><span class='alt-next' /></div>").find(".items-total").html($(".flex-control-nav li", md).length);

			$(".alt-controls", md).hide();

			self.bindControls(md);
			self.updateControls(md, maxItems);

			$(window).on('resize', function() {
				if ($(this).width() != width) {
      				width = $(this).width();

					setTimeout(function() {
						self.updateControls(md, maxItems);
					},500);
				}
			});
		},

		bindControls: function(md) {
			$(".alt-controls", md).on("click", ".alt-prev", function() {
				$(".flex-prev", md).trigger("click");
			});

			$(".alt-controls", md).on("click", ".alt-next", function() {
				$(".flex-next", md).trigger("click");
			});
		},

		updateControls: function(md, maxItems) {
			var items = $(".flex-control-nav li", md).length;
			
			if (items > maxItems) {
				modelDisplay.displayAltControls(md, items);
			} else {
				$(".flex-control-nav", md).show();
				$(".alt-controls", md).hide().parents('.model-display').removeClass('alt-ctrl');
			}
		},

		displayAltControls: function(md, items) {
			$(".flex-control-nav", md).hide();
			$(".alt-controls", md).css('display','inline-block').find(".items-total").html(items);
			$(".alt-controls", md).parents('.model-display').addClass('alt-ctrl');

			var slider 	  = $(".flexslider", md).data("flexslider"),
				currSlide = slider.currentSlide + 1;

			$(".alt-controls .current-item", md).html(currSlide);

			slider.vars.after = function() {
				currSlide = slider.currentSlide + 1;
				$(".alt-controls .current-item", md).html(currSlide);
			};
		}
	};

	$(function(){
		if (!$(".model-display").length) {return;}
		modelDisplay.init();
	});

})(jQuery);