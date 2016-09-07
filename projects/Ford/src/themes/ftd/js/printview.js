//change the current css to print mode
(function($){
	var PrintView = function(){
		var printView = this;

		printView.print = function(){
			var $styles = $("link");
			
			for(var idx=$styles.length; idx-- > 0;){
				var $style = $($styles[idx]);

				/* switch the CSS type */
				if($style.attr("media") && $style.attr("media").toLowerCase().indexOf("print") >= 0){
					$style.clone()
						.attr({"media": "screen, projection"})
						.appendTo($("head"));
				}else{
					$style.remove();
				}
			}
		};
		
	};

	$(function(){
		var viewmode = $.bbq.getState( "viewmode" );

		if (viewmode == "print") {
			var printView = new PrintView();
			printView.print();
		}
	});
})(jQuery);