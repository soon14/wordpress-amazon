/*
Author: York Zhang
Description: set primary vehicle
*/

(function($){

	var formEdit = {
		setPrimary: function(){
			if(!$(".set-primary").size()) {return;}

			$(".flexfield input.set-primary").live("change", function(){
				var $this = $(this);
				
				if($this.prop("checked")){
					$(".flexfield input.set-primary").prop("checked",false);
					$this.prop("checked",true);
				}
			});
		}
	};

	$(function(){
		formEdit.setPrimary();
	});

})(jQuery);


