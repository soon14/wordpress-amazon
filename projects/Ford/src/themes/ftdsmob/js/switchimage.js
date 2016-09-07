/* Switch image from anchor*/
(function($){
	
	var defaults = {
		uriAttr: "href",
		target: ".imgnav img",
		targetAttr: "src"
	};

	$.fn.switchImage = function(options){

		var settings = $.extend(true, {}, defaults, options);

		return this.each(function(){
			$(this).click(onClickSource);
		});

		function onClickSource(e){
			//prevent link to the image directly
			e.stopPropagation();
			e.preventDefault();

			var $this = $(this),
				uri = $this.attr(settings.uriAttr),
				$target = $(settings.target);

			//The last one is the real one.
			$target = $target[$target.size()-1];
			$target.onload = $target.onerror = onLoadComplete;

			if (uri) {
				//open the message box
				$.mobile.showPageLoadingMsg();

				//load the image
				$target[settings.targetAttr] = uri;

				//change the display text
				$this.parent().parent().parent().find(".colortxt").html(
					$this.attr("title")
				);
			}
		}

		//when the image is loaded or error is rised close the loading box
		function onLoadComplete(e){
			$.mobile.hidePageLoadingMsg();
		};
	};
})(jQuery);