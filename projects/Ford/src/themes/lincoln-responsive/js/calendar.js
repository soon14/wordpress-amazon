/*
 * datepicker for Lincoln form
 * AUTHOR: YORK ZHANG
 */

/*globals jQuery, ND, window */

var ND = (function(ND, $) {
	
	//The create function creates the module object; It does no initialise the object
	ND.formDatepicker = function () {
	
		var element;
		var w = $(window);
		
		return {

			init: function( elem ) { 

				element = $(elem || ".datepicker");
					
				/* Check this module needs to be initalised for this page */
				if( !element || !element.size() ) { return this; }

                //diable the input method editor
                element.attr('onfocus',"this.style.imeMode='disabled'");

                element.on('keydown', function(e){
                    e.preventDefault();
                });
				
				element.datepicker({
					dateFormat:"yymmdd",
					minDate:0

				});

				//console.log(typeof datepickerCN);
				if(typeof datepickerCN !== "undefined"){
					jQuery.datepicker.setDefaults(datepickerCN);
				}

				return this;
			
			}


		
		};	
	};
	
	/* Return ND after it's been augmented */ 
	return ND;	

}(window.ND || {}, jQuery));


(function(ND, $){
	$(function($){

		ND.formDatepicker().init();
		
	});
}(window.ND || {}, jQuery));

/* End File */