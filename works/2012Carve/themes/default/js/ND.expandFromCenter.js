var ND = (function(ND, $) {
	
	ND.expandFromCenter = function () {
		var element;
		return {

			init: function( elem ) { 
				
				element = $(elem || ".mail .icon");
				if( !element || !element.size() ) { return this; }
			
			
				element.on("mouseenter",function(){
					element[0].src = "media/static-logo.png";
					element.siblings().animate({width: 176});
				}).parent().on("mouseleave",function(){
					element[0].src = "media/rolling-logo.gif";
					element.siblings().animate({width: 0});
				});
				
				return this;
			
			}		
		};	
	};
	
	return ND;	

}(window.ND || {}, jQuery));