/*
 * File to house the mini plugins that are created for modules.
 */
(function($, win, doc){

	/*
	 * jQuery Plugin - embeddedData
	 * <script id="price-urls" type="text/x-json">
	 * {
	 * 		"xhr-calcprice-data":"GetPrices.js",
	 *		"xhr-calcprice-form":"overlay-calculateprice.html?v2"
	 * }
	 * </script>
	 */
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
	
	
	/*
	 * jQuery Plugin - doOnce
	 * Does nothing if the collection is empty
	 */
	$.fn.doOnce = function(func){ 
	    this.length && func.apply(this); 
	    return this; 
	};
	
	/*
	 * jQuery Plugin - forEach
	 * Does nothing if the collection is empty, other normal loop
	 */
	$.fn.forEach = function(func){ 
	    this.length && this.each(func); 
	    return this; 
	};
	
	/*
	 * jQuery Plugin - killFlash
	 * kill the flash object in the overlay
	 */
	$.fn.killFlash = function(){ 
	    this.length && this.each(function(){
	    	var flash = $(this).flash();
			flash.remove && flash.remove();
	    }); 
	    return this; 
	}
	
	/*
	 * jQuery Plugin - killFlash
	 * Render Flash based on the meta data in the class
	 */
	$.fn.metaBasedFlash = (function(){
		var defaults = {},
			getData = function(flash){
				var data = flash.length > 0 ? flash.metadata({type: 'class'}) : 0,
					ret = (data && 'swf' in data) ? data : 0;
					
				return ret
			};
		
		return function(options){ 
			this.length && this.each(function(){
				var item = $(this),
					data = getData(item);
					options = $.extend(defaults, options);
			
				if(data) {
					//extend the JSON object extracted from the class with some system wide ones.
					data = $.extend(true, data, options.swfobject);
				
					item.flash(data);
					item.addClass("flash-loaded");
					if(options['success']) {
						options.success.apply(this)
					}
				}
			}); 
			return this; 
		}

	})();
	
	/*
	 * jQuery Plugin - lazyLoadImages
	 * Enable lazy load images
	 */
	$.fn.lazyLoadImages = (function(){
		var defaults = {},
			getData = function (image) {
				var data = (image.length > 0) ? image.metadata({type: 'class'}) : 0,
					ret = (data && 'src' in data) ? data : 0;
				return ret
			};
		
		return function (options) {
			this.length && this.each(function () {
				var item = $(this),
					data = getData(item);
					options = $.extend(defaults, options);
				if(data) {
					item.attr("src", data['src']);
					if(options['success']) {
						options.success.apply(this)
					}
				}
			}); 
			return this; 
		}
	})();

	/*
	 * jQuery Plugin - getQueryVariable
	 * 
	 * Calling method: var item = $.getQueryVariable(url,key);
	 * 
	 * url: http://www.example.com/index.html?id=1&image=awesome.jpg
	 * key: "id"
	 * - would return "1"
	 * 
	 * key: null
	 * - would return ["id=1","image=awesome.jpg"]
	 * 
	 * key: "hello"
	 * - would return false
	 * 
	 * 
	 * url: http://www.example.com/index.html?id&image
	 * key: "id"
	 * - would return undefined
	 *
	 * key: null
	 * - would return ["id","image"]
	 * 
	 * key: "hello"
	 * - would return false
	 *
	 * url: http://www.example.com/index.html
	 * key: "id"
	 * - would return false
	 *
	 * key: null
	 * - would return false
	 * 
	 * key: "hello"
	 * - would return false
	 */
	$.extend({
		getQueryVariable: function(url,key){
			var index = url.indexOf('?');
			if (index != -1){
				var query = url.substring( index + 1);
				var params = query.split("&");

				if (key){
					for (var i = 0; i < params.length; i++){
						var pair = params[i].split("=");

						if (pair[0] === key){
							return decodeURI(pair[1]);
						}
					}
				}
				else{
					return params;
				}
			}
			
			return false;
		}
	});

/* End */

})(jQuery, window, document);