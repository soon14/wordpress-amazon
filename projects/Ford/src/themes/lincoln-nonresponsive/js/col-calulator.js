/*
 * colums calculator for Non-rad menu
 * AUTHOR: YORK ZHANG
 */

/*globals jQuery, ND, window */

var ND = (function(ND, $) {
	
	//The create function creates the module object; It does no initialise the object
	ND.lincolnNav = function () {
	
		var element;
		var w = $(window);
		
		return {

			init: function( elem ) { 

				element = $(elem || "#nav");
					
				/* Check this module needs to be initalised for this page */
				if( !element || !element.size() ) { return this; }

				var colWarp = $("#nav").find(".mega-wrap");
				var colNum = colWarp.children(".menu").children(".mega-col").size();

				var classAdd = "col-" + colNum;

				colWarp.addClass(classAdd);

				

				return this;
			
			}


		
		};	
	};
	
	/* Return ND after it's been augmented */ 
	return ND;	

}(window.ND || {}, jQuery));


(function(ND, $){
	$(function($){

		ND.lincolnNav().init();
		
		//encode URI before sending
	  	var _button = $(".call-to-action .creative-button .button a");
		if(_button.length>0){
		  _button.each(function(){
		    var encodedURI = encodeURI($(this).attr("href"));
		    $(this).attr("href",encodedURI);
		  });
		}
		
	});
}(window.ND || {}, jQuery));

/* End File */