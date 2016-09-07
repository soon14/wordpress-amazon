/* Adjust the height of each element on showroom TWO COLUMNS page.
 *
 */
(function($){
	
	var elementsHeight = {
		init: function(){
			var showlist = $(".showlist-two-columns .showlist");

			showlist.each(function(){
				var list = $(this),
					items = $("li",list),
					newHeight = 0;

				for (var i = 0; i < items.length; i+=2){
					newHeight = Math.max($(items[i]).height(), $(items[i+1]).height());
					$(items[i]).css("height",newHeight);
					$(items[i+1]).css("height",newHeight);
				}

			})
		}
	}

	$(function(){
		if ($(".showlist-two-columns").length > 0){
			elementsHeight.init();
		}
		
		
	});

}(jQuery));