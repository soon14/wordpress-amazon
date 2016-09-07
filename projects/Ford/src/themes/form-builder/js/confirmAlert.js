/*
Author: Jennie Ji
Description: Owners dashboard SYNC widget. 
			 1. 'Save change' alert for register form when click 'close' button
			 2. 'Save change' alert for edit profile form when click 'close' button

Modified by York...
*/

(function($){
	var confirmAlert = {
			init: function () {
				this.popup( 'body.confirm-alert .close.formbuilder-close' );
			},
			// btn: 		String. Selector of the object which will trigger the confirm popup
			
			popup: function( btn ){
				
				var $btn = $(btn);

				if( $btn.length<1 ) { return this; }
				
				$btn.each(function() {
					var $this = $(this);
					var $popup = $("#confirmPopup" || $this.data('confirm') );

					if( $popup.length < 1 ) { return; }

					$this.on('click', function(e){
						e.preventDefault();
						
						if( $('.state-edit').length > 0 && $('.state-edit:visible').length < 1 ) {

							$("#confirmPopup .formbuilder-close")[0].click();
						}else{
							
							$popup.foundation('reveal', 'open', {
								animationSpeed: 110
							});
						}
					});

					$(".close-reveal-modal, .cancel", $popup).live("click", function(e){
						e.preventDefault();
						$popup.foundation('reveal', 'close');
					});
					$(".reveal-modal-bg").live("click", function() {
						if( !$popup.is(":visible") ) { return; }
						$popup.foundation('reveal', 'close');
					});

				});

				return this;
			}
	};

	

	$(function(){

		confirmAlert.init();
		
	});

})(jQuery);