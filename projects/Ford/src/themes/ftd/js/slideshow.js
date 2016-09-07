/*slideshow.js*/
(function($){
	// 
	jQuery.easing['easeInQuint'] = function(p, t, b, c, d) {
		return c * Math.pow (t/d, 5) + b;
	};
	
	var SlideShow = function($slideContainer){
		
		var slideShow = this;

		var $carousel;
		var $slidesContainer;
		var $slides;
		var cur = 0;
		var pos = 0;
		
		slideShow.init = function(){
			
			$carousel = $("ul", $slideContainer);
			$slidesContainer = $('<div class="btns"></div>')
				.appendTo($slideContainer);

			$("li", $carousel).each(function(idx){
				$("<a></a>")
					.attr({data: idx, href: "javascript:void(0)"})
					.appendTo($slidesContainer);
			});

			$slides = $(".btns a", $slideContainer);

			$carousel.jcarousel({
				easing: 'easeInQuint',
				wrap: 'circular',
				scroll: 1,
				itemVisibleInCallback: {
					onAfterAnimation: function(carousel, item, idx, state){
						$carousel = carousel;
						pos = idx;
						slideShow.resetBtns();
					}
				}
			});
			
			$slides.each(function(idx){
				$(this).click(function(e){
					var idx = parseInt($(this).attr("data"));
					var nav = idx - cur + pos;
					$carousel.scroll(nav);
				});
			});
		}

		slideShow.resetBtns = function(){
			var len = $slides.length;
			cur = (pos + len * 100 - 1) % len;
			$slides.removeClass("cur");
			$($slides[cur]).addClass("cur");
		}
	}

	$(function(){
		
		$(".slideshow").each(function(){
			var slideShow = new SlideShow($(this));
			slideShow.init();
		});
	});

	
})(jQuery);