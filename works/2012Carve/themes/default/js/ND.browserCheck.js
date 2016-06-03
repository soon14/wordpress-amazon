var ND = (function(ND, $) {
	
	ND.browserCheck = function () {
	
		var element;
		return {

			init: function( elem ) { 
				
				element = $(elem || "#unsupport-message");
					
				if( !element || !element.size() ) { return this; }
				
				var b = $.browser,
					v = b.version;
				if(	
					b.msie && parseInt(v)<8 ||
					b.mozilla && parseInt(v)<3.6
				){
					window.location.href = "unsupported.html";
				}
				return this;
			
			}
		
		};	
	};
	
	return ND;	

}(window.ND || {}, jQuery));