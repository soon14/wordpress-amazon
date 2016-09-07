/* 
Discription: For latest offer click event, to load postcode related modules
             And extended functions from ftd/js/mini-plugins.js && ftd/js/lib/es5-shim-parts.js
*/

(function ($, win, doc) {

    //ftd/js/mini-plugins.js
    $.fn.killFlash = function () {
        this.length && this.each(function () {
            var flash = $(this).flash();
            flash.remove && flash.remove();
        });
        return this;
    };

    $.fn.doOnce = function (func) {
        this.length && func.apply(this);
        return this;
    };

    $.fn.metaBasedFlash = (function () {
        var defaults = {},
			getData = function (flash) {
			    var data = flash.length > 0 ? flash.metadata({ type: 'class' }) : 0,
					ret = (data && 'swf' in data) ? data : 0;

			    return ret
			};

        return function (options) {
            this.length && this.each(function () {
                var item = $(this),
					data = getData(item);
                options = $.extend(defaults, options);

                if (data) {
                    //extend the JSON object extracted from the class with some system wide ones.
                    data = $.extend(true, data, options.swfobject);

                    item.flash(data);
                    item.addClass("flash-loaded");
                    if (options['success']) {
                        options.success.apply(this)
                    }
                }
            });
            return this;
        }

    })();

    //ftd/js/lib/es5-shim-parts.js
    if (!Object.create) {
        Object.create = function (prototype, properties) {
            var object;
            if (prototype === null) {
                object = { "__proto__": null };
            } else {
                if (typeof prototype != "object")
                    throw new TypeError("typeof prototype[" + (typeof prototype) + "] != 'object'");
                var Type = function () { };
                Type.prototype = prototype;
                object = new Type();
            }
            if (typeof properties !== "undefined")
                Object.defineProperties(object, properties);
            return object;
        };
    }
	
	// If  in Qunit test suite, then we stall.
	if(!!window.QUnit) { return; }

	$(doc).ready(function(){
		// shoppref.js
		
		ND.shoppingPreferenceManager();
		// hotdeals.js
		ND.hotDeals();
		
	});
	
})(jQuery, window, document);