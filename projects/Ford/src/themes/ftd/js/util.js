/**
 * @author Sohrab Zabetian
 * 
 * added a utility that contains utility methods accessible across the site
 * 
 */

var ND = window.ND = window.ND || {};

ND.Utils = window.ND.Utils = window.ND.Utils || {};
/**
 * 
 * @returns if the device is an ipad/ipod/iphone
 */
ND.Utils.isTouchDevice = function() {
	if (/iPhone|iPad|iPod/.test(navigator.platform) || 
	   (Modernizr !== undefined && Modernizr.touch)) {
		return true;
	}
	return false;
}

/**
 * 
 * lazily loads an image. Requires the following setup
 * <div data-src="image url" data-alt=" optional name" class="thumb-lazy" >&nbsp;</div>
 * An image tag is created and injected into the div.
 * 
 */
ND.Utils.lazyLoadImage = function(selector) {
	$(selector ? selector : 'div.thumb-lazy').each(function() {
	    var $div = $(this);
	    var src = $div.data('src');
	    var img = new Image();
		
		// call this function after it's loaded
		img.onload = function() {
			// make wrapper fully visible
			$div.html(img);
			img.alt = $div.data('alt');
		};
		// begin loading the image from www.flickr.com
		img.src = src;
		
	});
}


