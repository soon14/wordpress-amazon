/*
Author: Jessie Biros
Description: Disable an 'a href' when the class 'disable' is added
			: this is for motorcraft Phase 2 because 1 of the requirements is 
				to give the publisher an option to disable a link.
*/

(function($){

	var disableLink = {
		init: function(){
			if(!$(".disable").length){return;}
			
			$('.disable').on('click', function(e){
				e.preventDefault();
			});			

		}
	}

	$(function(){
		disableLink.init();
	});

})(jQuery);
