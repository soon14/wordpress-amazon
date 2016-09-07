/*
 * Accordion module for sync topic list
 * Author: York Zhang
 * 
 */

/*globals jQuery, ND, window */
var ND = (function(ND, $) {
	
	//The create function creates the module object; It does no initialise the object
	ND.syncAccordion = function () {
	
		var element;
		
		return {

			init: function( elem ) { 

				element = $(elem || ".apa .topic-list");
					
				/* Check this module needs to be initalised for this page */
				if( !element || !element.size() ) { return this; }
			
				element.find(".tab-area").click(function(e){
					e.preventDefault();

					var $this = $(this);
					if($this.parent("li").hasClass("active")){
						$this.parent("li").removeClass("active");
					}else{
						$this.parent("li").addClass("active");
					}
				});
				
				return this;
			
			}
		
		};	
	};
	
	/* Return ND after it's been augmented */ 
	return ND;	

}(window.ND || {}, jQuery));

(function(ND, $){
	$(function($){

		var syncTopicList = ND.syncAccordion().init();
		
	});
}(window.ND || {}, jQuery));
