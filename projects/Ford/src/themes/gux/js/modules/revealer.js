/*
Author: 		Brett Chaney
File name: 		revealer.js
Description: 	Reveals hidden panel via a sliding transition.
Dependencies: 	jQuery

Example HTML: 	<div class="large-12 columns">
					<div class="revealer">
						<div class="revealer-one">
							...content here...
							<a href="#" class="revealer-open">open</a>
						</div>
						<div class="revealer-two">
							...content here...
							<a href="#" class="revealer-close">close</a>
						</div>
					</div>
				</div>
*/

var guxApp = guxApp || {};

(function($){
	guxApp.revealer = {

		init: function(){
			if (!$(".revealer").length) {return;}

			// declare common variables/settings
			var $container 		= $(".revealer"),
				$openBtn 		= $(".revealer-open"),
				$closeBtn 		= $(".revealer-close"),
				$revealerOne 	= $(".revealer-one"),
				$revealerTwo 	= $(".revealer-two"),
				currElem 		= null,
				itemW 			= $("#page-wrapper").width(),
				containerW 		= $container.width(),
				tabSliderSpeed 	= 600,					// change slider speed here
				mobSliderSpeed 	= tabSliderSpeed / 1.5,
				isRTL 			= $("body").hasClass("rtl");

			// functions
			var sliderSpeed = function() {
				// slow the slider speed value if mobile screen size detected
				if (guxApp.viewport.view === "tablet") {
					return tabSliderSpeed;
				} else {
					return mobSliderSpeed;
				}
			};

			var open = function(currElem) {
				itemW = $("#page-wrapper").width();

				currElem.parents(".revealer-one")
					.add(currElem.parents(".revealer-one").next())
					.animate({"left": -itemW}, sliderSpeed())
					.parent().addClass("revealer-open");
			};

			var close = function(currElem) {
				currElem.parents(".revealer-two")
					.add(currElem.parents(".revealer-two").prev())
					.animate({"left": 0}, sliderSpeed())
					.parent().removeClass("revealer-open");
			};

			var updateWidths = function() {
				itemW 		= $("#page-wrapper").width();
				containerW 	= itemW * 2;

				$container.css("width", containerW);
				$revealerOne
					.add($revealerTwo)
					.css("width", itemW);
			};

			if (isRTL) {
				$container.parent().css("direction","ltr");
			}

			setTimeout(function() {

				// timeout is to ensure correct width of each item
				updateWidths();
				$container.parent().css("overflow","hidden");
				$revealerOne.css("float", "left");
				$revealerTwo.css({"float": "left", "left": 0});

			},250);

			$(window).on("resize", function() {
				updateWidths();

				$container.each(function() {
					if ($(this).hasClass("revealer-open")) {
						$(this).children(".revealer-one")
							.add($(this).children(".revealer-two"))
							.css("left", -itemW);
					}
				});
			});

			$openBtn.on("click", function(e) {
			 	e.preventDefault();
			 	
			 	currElem = $(this);
			 	open(currElem);
			});

			$closeBtn.on("click", function(e) {
			 	e.preventDefault();

			 	currElem = $(this);
			 	close(currElem);
			});
			
		}
	};

	$(function() {
		// initiate revealer module
		guxApp.revealer.init();
	});

})(jQuery);