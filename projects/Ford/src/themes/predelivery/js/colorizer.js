/*
Author: Ruiwen Qin
File name: colorizer.js
Description: Color picker with amends for Pre Delivery

Dependencies: jQuery
*/


(function($){
	colorizer = {
		init: function(){
			if (!$(".colorizer").length) {return;}

			var container = $(".colorizer"),
				colorName = $(".color-name", container),
				colors = $(".color-palette li", container);

			colorizer.colorSwap(colors,colorName, container);
		},
		colorSwap: function(colors,colorName, container){
			var colorLinks = $("a",colors),
				defaultText = $(".color-name", container).text();

			colorLinks.click(function(){
				var self = $(this);

				if (!self.hasClass("active")){
					colorLinks.removeClass("active");
					self.addClass("active");
					
					$("input#ambient-colour").val($.trim(self.text()));

					colorName.html(self.text());
				} else {
					colorLinks.removeClass("active");
					colorName.html(defaultText);
					$("input#ambient-colour").val("");
				}
				
				return false;
			});
		}
		
	};

	$(function(){
		colorizer.init();
	});

})(jQuery);