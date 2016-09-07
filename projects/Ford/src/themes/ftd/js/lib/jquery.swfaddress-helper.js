//Duck Punch jQuery SWFObject into submission and then hook it up on a date with SWFAddress
(function($){
	var _oldFlash = jQuery.fn.flash;
	$.fn.flash = function(){ 
		var ret = _oldFlash.apply(this,arguments);
		this.each(function(){
			var $flash = $(this).find('object').andSelf().filter('object');
			if (typeof SWFAddress != 'undefined') {
				SWFAddress.addId($flash.attr('id'))
			} 
		});		 
		return ret
	}
})(jQuery);	
