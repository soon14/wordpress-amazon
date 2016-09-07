/*
Author: Ivy
Description: hidden dealer information if the dealer isn't selected
*/

(function($){	
	$(function(){
		if(!$(".form-dealer-info").size()){return;}
		if($(".form-dealer-info").html()){
			if($(".form-dealer-info").parents(".section").is(":hidden")){
				$(".form-dealer-info").parents(".section").next(".row").hide();
				$(".form-dealer-info").parents(".section").show();
			}
		}
	});
})(jQuery);
