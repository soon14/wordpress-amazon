/*
Author: York Zhang
Description: overlay initialize
*/

(function($){

	$(function(){
		if(!$(".reveal-link").size()) {return;}
		
		$(document).foundation('reveal',{
			animationSpeed: 250
		});
/*		$(".reveal-link").click(function(){
			$(document).foundation('reveal','open');
		});*/
	});

})(jQuery);


