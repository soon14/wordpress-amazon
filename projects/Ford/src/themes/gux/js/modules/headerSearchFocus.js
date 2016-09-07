/* Copied from ftd/js/global.js */
/* Will be removed when the new GUX header design is ready */

(function($){
	// search-pannel focus func
	var searchLabel = {
		init: function(){
			if (!$(".search-pannel").length) {return;}

			$(".search-pannel").each(function(){
				var kw = $(this).find(".keyw");
				var kwVal = kw.val();
				kw.focus(function (){
					$(this).val("");
				});
				kw.blur(function (){
					var newkwVal = kw.val();
					if (newkwVal == ""){
						$(this).val(kwVal);
					}else{
						$(this).val(newkwVal);
					}
				});
			});
		}
	}

	$(function(){
		searchLabel.init();
	});
	
})(jQuery);