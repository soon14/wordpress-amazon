/*
 * Top menu toggle
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

				element = $(elem || "#menu");
					
				/* Check this module needs to be initalised for this page */
				if( !element || !element.size() ) { return this; }


				$("span.menu-icon").on("click",function(e){
					e.preventDefault();

					if(element.hasClass("active")){
						element.removeClass("active");
					}else{
						element.addClass("active");
					}
				});

				$("#nav").find(".nav-item").on("click",function(e){
					e.preventDefault();

					var $this = $(this);
					var $thisContainer = $this.parent("li")
					//console.log(w.width());
					if((w.width() >= 768) && (w.width() < 977)){
						if($thisContainer.hasClass("active")){
							$thisContainer.removeClass("active");
						}else{
							$("#nav > li").removeClass("active");
							$thisContainer.addClass("active");
						}
					} else if(w.width() < 768){
                        var subMenu = $thisContainer.find('.sub-menu');
                        var arrow = $this.find('span');
                        if(subMenu.hasClass('clps-nav')){
                            subMenu.removeClass('clps-nav').addClass('expand-nav');
                            arrow.removeClass('arrow').addClass('expand-arrow');
                        }else if(subMenu.hasClass('expand-nav')){
                            subMenu.removeClass('expand-nav').addClass('clps-nav');
                            arrow.removeClass('expand-arrow').addClass('arrow');
					}
                    }
				});

				this.colCalulator();
				

				return this;
			
			},


			colCalulator: function(){

				var colWarp = $("#nav").find(".sub-menu.fat-menu");
				var colNum = colWarp.children("li").size();

				var classAdd = "col-" + colNum;

				colWarp.addClass(classAdd);

			}
		
		};	
	};
	
	/* Return ND after it's been augmented */ 
	return ND;	

}(window.ND || {}, jQuery));


(function(ND, $){
	$(function($){

		ND.lincolnNav().init();
		
	});
}(window.ND || {}, jQuery));

/* End File */