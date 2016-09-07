/*Display full article when user click on it*/

(function($){

	$.fn.fullArticle = function(){

		return this.each(function(){
			var $article = $(".article"),
				$hide = $(".hide");

				$(".full").click(function(e){
					e.stopPropagation();
					e.preventDefault();

					$(this).hide();
					$hide.show();

					//If the hidden content contains alert information
					if($hide.hasClass("alert")){
						$(".content", $article).hide();
					}
				});
		});
	};

})(jQuery);
