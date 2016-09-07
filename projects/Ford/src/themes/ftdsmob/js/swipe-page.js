/*
 * Author:      Ray Huang
 * Description: swipe to switch pages
 */

(function($) {
	$(document).on("pageshow",function(){
		var prevLink = $(".swipe-page .section-wrap .imgnav > .prev:visible");
		var nextLink = $(".swipe-page .section-wrap .imgnav > .next:visible");
		var prevPage = prevLink.attr("href");
		var nextPage = nextLink.attr("href");
		var currentPage = $(".swipe-page:visible").closest("div[data-role=page]");
		currentPage.on( 'swipeleft', function( e ) {     
		    $.mobile.changePage(nextPage,{transition: "fade",changeHash: false});     
		    e.stopImmediatePropagation();      
		    return false;    
	   	}); 
	   	currentPage.on( 'swiperight', function( e ) {     
		    $.mobile.changePage(prevPage,{transition: "fade",changeHash: false});     
		    e.stopImmediatePropagation();      
		    return false;    
	   	});
	   	nextLink.on( 'click', function( e ) {     
		    $.mobile.changePage(nextPage,{transition: "fade",changeHash: false});     
		    e.stopImmediatePropagation();      
		    return false;    
	   	}); 
	   	prevLink.on( 'click', function( e ) {     
		    $.mobile.changePage(prevPage,{transition: "fade",changeHash: false});     
		    e.stopImmediatePropagation();      
		    return false;    
	   	}); 
	})
})(jQuery);