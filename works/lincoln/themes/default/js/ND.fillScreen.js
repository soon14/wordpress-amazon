var ND = (function(ND, $) {
	
	ND.fillScreen = function () {
		var element;
		return {

			init: function( elem ) { 
				
				element = $(elem || ".fill-screen");
				if( !element || !element.size() ) { return this; }
			
				function fill(){
					var winW = $(window).width(),
						winH = $(window).height();
					var eleW = element.width(),
						eleH = element.height();
					var scale = Math.max( winW / eleW, winH / eleH );
					element.css({
						position:	"absolute",
						width:		winW,
						height:		winH,
						top:		( winW - eleW ) / 2,
						left:		( winH - eleH ) / 2
					});
				}
				
				$(window).resize(fill);
				
				return this;
			
			}		
		};	
	};
	
	return ND;	

}(window.ND || {}, jQuery));