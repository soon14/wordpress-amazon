/*
Author: 		
File name: 		embeddedData.js
Description: 	Read JSON data
Dependencies: 	jQuery
Usage: 			<script id="price-urls" type="text/x-json">
 				{
  					"xhr-calcprice-data":"GetPrices.js",
 					"xhr-calcprice-form":"overlay-calculateprice.html?v2"
  				}
  				</script>

  				var mydata = $("price-urls").embeddedData();
*/
(function($){
	$.fn.embeddedData = function(prop){
		var xJson = this.data('x-json');
		
		if( !xJson && this.attr('type') === 'text/x-json' ) {
			xJson = $.parseJSON( this.html() );
			this.data( 'x-json', xJson );
		}	
		
		if( prop ) {
			return xJson[prop] || null;
		} else {
			return xJson || {};
		}
	};
})(jQuery);