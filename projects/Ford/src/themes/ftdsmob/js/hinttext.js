/*
 * Description: Hint Text 
 */
(function($){
	$.fn.hintText = function(){
		var hintClass = "hint";

		var $hints = $(this);

		return this.each(function(){
			var $hint = $(this).click(function(){
				if($hint.hasClass(hintClass)){
					$hints.removeClass(hintClass);
					$hints.val('');
				}
			});
		});
	};
})(jQuery);
