/* History go back button: reset state, and go back implement. */
(function($){
	$.fn.historyBack = function(){
		return this.each(function(){
			//using override "onclick" to avoid duplicate click event rised.
			this.onclick = function(e){
				//window.history.go(-1);
				
                e.stopPropagation();
                e.preventDefault();
                window.history.back(-1);
				
			};
		});
	};
})(jQuery);