
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());


// ES5 15.2.3.5 
if (!Object.create) {
    Object.create = function(prototype, properties) {
        var object;
        if (prototype === null) {
            object = {"__proto__": null};
        } else {
            if (typeof prototype != "object")
                throw new TypeError("typeof prototype["+(typeof prototype)+"] != 'object'");
            var Type = function () {};
            Type.prototype = prototype;
            object = new Type();
        }
        if (typeof properties !== "undefined")
            Object.defineProperties(object, properties);
        return object;
    };
}


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


/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var pluses = /\+/g;

    function encode(s) {
        return config.raw ? s : encodeURIComponent(s);
    }

    function decode(s) {
        return config.raw ? s : decodeURIComponent(s);
    }

    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }

    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape...
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }

        try {
            // Replace server-side written pluses with spaces.
            // If we can't decode the cookie, ignore it, it's unusable.
            // If we can't parse the cookie, ignore it, it's unusable.
            s = decodeURIComponent(s.replace(pluses, ' '));
            return config.json ? JSON.parse(s) : s;
        } catch(e) {}
    }

    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    }

    var config = $.cookie = function (key, value, options) {

        // Write

        if (arguments.length > 1 && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setTime(+t + days * 864e+5);
            }

            return (document.cookie = [
                encode(key), '=', stringifyCookieValue(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // Read

        var result = key ? undefined : {};

        // To prevent the for loop in the first place assign an empty array
        // in case there are no cookies at all. Also prevents odd result when
        // calling $.cookie().
        var cookies = document.cookie ? document.cookie.split('; ') : [];

        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = parts.join('=');

            if (key && key === name) {
                // If second argument (value) is a function it's a converter...
                result = read(cookie, value);
                break;
            }

            // Prevent storing a cookie that we couldn't decode.
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }

        return result;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
        if ($.cookie(key) === undefined) {
            return false;
        }

        // Must not alter options, thus extending a fresh object...
        $.cookie(key, '', $.extend({}, options, { expires: -1 }));
        return !$.cookie(key);
    };

}));


//     uuid.js
//

(function() {
  var _global = this;

  // Unique ID creation requires a high quality random # generator.  We feature
  // detect to determine the best RNG source, normalizing to a function that
  // returns 128-bits of randomness, since that's what's usually required
  var _rng;

  // Node.js crypto-based RNG - http://nodejs.org/docs/v0.6.2/api/crypto.html
  //
  // Moderately fast, high quality
  if (typeof(require) == 'function') {
    try {
      var _rb = require('crypto').randomBytes;
      _rng = _rb && function() {return _rb(16);};
    } catch(e) {}
  }

  if (!_rng && _global.crypto && crypto.getRandomValues) {
    // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
    //
    // Moderately fast, high quality
    var _rnds8 = new Uint8Array(16);
    _rng = function whatwgRNG() {
      crypto.getRandomValues(_rnds8);
      return _rnds8;
    };
  }

  if (!_rng) {
    // Math.random()-based (RNG)
    //
    // If all else fails, use Math.random().  It's fast, but is of unspecified
    // quality.
    var  _rnds = new Array(16);
    _rng = function() {
      for (var i = 0, r; i < 16; i++) {
        if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
        _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
      }

      return _rnds;
    };
  }

  // Buffer class to use
  var BufferClass = typeof(Buffer) == 'function' ? Buffer : Array;

  // Maps for number <-> hex string conversion
  var _byteToHex = [];
  var _hexToByte = {};
  for (var i = 0; i < 256; i++) {
    _byteToHex[i] = (i + 0x100).toString(16).substr(1);
    _hexToByte[_byteToHex[i]] = i;
  }

  // **`parse()` - Parse a UUID into it's component bytes**
  function parse(s, buf, offset) {
    var i = (buf && offset) || 0, ii = 0;

    buf = buf || [];
    s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
      if (ii < 16) { // Don't overflow!
        buf[i + ii++] = _hexToByte[oct];
      }
    });

    // Zero out remaining bytes if string was short
    while (ii < 16) {
      buf[i + ii++] = 0;
    }

    return buf;
  }

  // **`unparse()` - Convert UUID byte array (ala parse()) into a string**
  function unparse(buf, offset) {
    var i = offset || 0, bth = _byteToHex;
    return  bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]];
  }

  // **`v1()` - Generate time-based UUID**
  //
  // Inspired by https://github.com/LiosK/UUID.js
  // and http://docs.python.org/library/uuid.html

  // random #'s we need to init node and clockseq
  var _seedBytes = _rng();

  // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
  var _nodeId = [
    _seedBytes[0] | 0x01,
    _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
  ];

  // Per 4.2.2, randomize (14 bit) clockseq
  var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

  // Previous uuid creation time
  var _lastMSecs = 0, _lastNSecs = 0;

  // See https://github.com/broofa/node-uuid for API details
  function v1(options, buf, offset) {
    var i = buf && offset || 0;
    var b = buf || [];

    options = options || {};

    var clockseq = options.clockseq != null ? options.clockseq : _clockseq;

    // UUID timestamps are 100 nano-second units since the Gregorian epoch,
    // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
    // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
    // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
    var msecs = options.msecs != null ? options.msecs : new Date().getTime();

    // Per 4.2.1.2, use count of uuid's generated during the current clock
    // cycle to simulate higher resolution clock
    var nsecs = options.nsecs != null ? options.nsecs : _lastNSecs + 1;

    // Time since last uuid creation (in msecs)
    var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

    // Per 4.2.1.2, Bump clockseq on clock regression
    if (dt < 0 && options.clockseq == null) {
      clockseq = clockseq + 1 & 0x3fff;
    }

    // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
    // time interval
    if ((dt < 0 || msecs > _lastMSecs) && options.nsecs == null) {
      nsecs = 0;
    }

    // Per 4.2.1.2 Throw error if too many uuids are requested
    if (nsecs >= 10000) {
      throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
    }

    _lastMSecs = msecs;
    _lastNSecs = nsecs;
    _clockseq = clockseq;

    // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
    msecs += 12219292800000;

    // `time_low`
    var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
    b[i++] = tl >>> 24 & 0xff;
    b[i++] = tl >>> 16 & 0xff;
    b[i++] = tl >>> 8 & 0xff;
    b[i++] = tl & 0xff;

    // `time_mid`
    var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
    b[i++] = tmh >>> 8 & 0xff;
    b[i++] = tmh & 0xff;

    // `time_high_and_version`
    b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
    b[i++] = tmh >>> 16 & 0xff;

    // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
    b[i++] = clockseq >>> 8 | 0x80;

    // `clock_seq_low`
    b[i++] = clockseq & 0xff;

    // `node`
    var node = options.node || _nodeId;
    for (var n = 0; n < 6; n++) {
      b[i + n] = node[n];
    }

    return buf ? buf : unparse(b);
  }

  // **`v4()` - Generate random UUID**

  // See https://github.com/broofa/node-uuid for API details
  function v4(options, buf, offset) {
    // Deprecated - 'format' argument, as supported in v1.2
    var i = buf && offset || 0;

    if (typeof(options) == 'string') {
      buf = options == 'binary' ? new BufferClass(16) : null;
      options = null;
    }
    options = options || {};

    var rnds = options.random || (options.rng || _rng)();

    // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
    rnds[6] = (rnds[6] & 0x0f) | 0x40;
    rnds[8] = (rnds[8] & 0x3f) | 0x80;

    // Copy bytes to buffer, if provided
    if (buf) {
      for (var ii = 0; ii < 16; ii++) {
        buf[i + ii] = rnds[ii];
      }
    }

    return buf || unparse(rnds);
  }

  // Export public API
  var uuid = v4;
  uuid.v1 = v1;
  uuid.v4 = v4;
  uuid.parse = parse;
  uuid.unparse = unparse;
  uuid.BufferClass = BufferClass;

  if (typeof define === 'function' && define.amd) {
    // Publish as AMD module
    define(function() {return uuid;});
  } else if (typeof(module) != 'undefined' && module.exports) {
    // Publish as node.js module
    module.exports = uuid;
  } else {
    // Publish as global (in browsers)
    var _previousRoot = _global.uuid;

    // **`noConflict()` - (browser only) to reset global 'uuid' var**
    uuid.noConflict = function() {
      _global.uuid = _previousRoot;
      return uuid;
    };

    _global.uuid = uuid;
  }
}).call(this);



(function($){
  
  $.pubsubLogging = false;
  
  var o = $({});
  
  $.subscribe = function() {
    o.bind.apply( o, arguments );
  };
  
  $.subscribeOnce = function() {
    o.one.apply( o, arguments );
  };
  
  $.unsubscribe = function() {
    o.unbind.apply( o, arguments );
  };
  
  $.publish = function() {
    if( $.pubsubLogging ) { console.log.apply( console, arguments ); }
	o.trigger.apply( o, arguments );
  };
  
}(jQuery));


/* ************************ APAC Ford H.27.3 Code *************************/
/*
  CAUTION: AT NO TIME IS ANY PARTY TO MODIFY THIS FILE OTHER THAN FORD ANALYTICS
  REQUIRED: JS variables that must be set of EVERY call are s_account and omni_filters 

	140827 - add gnav tracking, update BTL
	150609 - current file on site
	160614 - change tracking servers to fordap root

*/

/************************ ADDITIONAL FEATURES ************************   	
	Dynamic Report Suite Selection
	Universal Tag
	Plugins
*/

/*************** Load Account and Filters - Should be set on a page level *****************/

	if (typeof s_account == "undefined" || s_account==null || s_account=='' || typeof omni_filters == "undefined" || omni_filters==null || omni_filters==''){
		var s_account="fapadev";
		var s=s_gi(s_account,1);
		s.linkInternalFilters="javascript:,dragonfly.ford.com," + document.location.host;
	}else{
		var s=s_gi(s_account,1);
		s.linkInternalFilters = omni_filters;
	}
	
	if (changeCookiePeriods(document.location.host)){
		s.cookieDomainPeriods="3"
   		s.fpcookieDomainPeriods="3"
   	}	
		

/**************************************************COMMON CODE******************************************/
/* Conversion Config */
/* Link Tracking Config */
s.trackDownloadLinks=false
s.trackExternalLinks=false
s.trackInlineStats=true
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx"
s.linkTrackVars="None"
s.linkTrackEvents="None"
s.linkLeaveQueryString=false


/* Plugin Config */
s.usePlugins=true
function s_doPlugins(s) {

/* Set the character set to the same as the page */
	if(!s.charSet) {
		if (document.characterSet)
			{s.charSet = document.characterSet} 
		else
			{s.charSet = document.charset}
	}

/* Force pageName to Lowercase all sites*/
	if(s.pageName)
		s.pageName=s.pageName.toLowerCase();
		
/* Web Trends Tracking */
	if(s.getQueryParam('WT.tsrc') || s.getQueryParam('WT.srch') || s.getQueryParam('WT.mc_id')) webTrendsTracking();
	
/* External Campaign Tracking */
	if(!s.campaign){		
		if(s.getQueryParam('bannerid'))s.campaign=s.getQueryParam('bannerid');
		s.campaign=s.getCustomValOnce(s.campaign,"cmp_getval",0)
	}
	
	if(s.campaign) s.events=s.apl(s.events,"event53",",",2);
	s.prop17=s.getAndPersistValue(s.campaign,'s_p17_pers',90);

/* Set ford campaign ID*/
	if(s.getQueryParam('fmccmp')) s.eVar30=s.getQueryParam('fmccmp');
	s.prop30=s.getAndPersistValue(s.eVar30,'s_p30_pers',90);
	s.eVar30=s.getCustomValOnce(s.eVar30,"eVar30_getval",0);	

/* Campaign Path Tracking */
	s.prop19=s.pageName;
	if(s.campaign) s.prop19=s.campaign+': '+s.pageName;
	else if(s.eVar30) s.prop19=s.eVar30+': '+s.pageName;   
	
/* Internal Campaign Tracking */
	if(!s.eVar13) s.eVar13=s.getQueryParam('intcmp'); 
	s.eVar13=s.getCustomValOnce(s.eVar13,"int_getval",0);
	s.prop13=s.getAndPersistValue(s.eVar13,'s_p13_pers',0);
	
/* Adobe Social Integration */
	if (!s.eVar60) s.eVar60=s.getQueryParam('scmp');
	s.socialPlatforms();

/* Referrer Overide */
	if(s.getQueryParam('referrer')) s.referrer=s.getQueryParam('referrer');   

/* Email Campaign Tracking */
	if (s.getQueryParam('emailid')) s.eVar33=s.getQueryParam('emailid');
	s.prop33=s.getAndPersistValue(s.eVar33,'s_p33_pers',90);
	s.eVar33=s.getCustomValOnce(s.eVar33,"eVar33_getval",0);

/* Paid Search Tracking */
	if (s.getQueryParam('searchid')) s.eVar26 = s.prop26 = s.getQueryParam('searchid','');
	s.eVar26=s.getCustomValOnce(s.eVar26,"eVar26_getval",0);
	if(s.eVar26)s.events=s.apl(s.events,"event54",",",2);
	
/* Navigation Tracking */
	if (s.getQueryParam('gnav')) s.eVar5 = s.getQueryParam('gnav');
	
/* Visit Start Logic */	

	var tempSuite="nosuite"
	if(!s.c_r("s_suite")){
		s.setSuite(s_account,"s_suite",0)	
	}else{
		tempSuite=s.c_r("s_suite");
	}
	
	if(s.getVisitStart("s_visit")||((!tempSuite.match(s_account))&& tempSuite!="")){
		if(!isInternal()||document.referrer==''){
			s.prop48=s.prop49=s.eVar8=trafficsource();			
			s.prop8=s.getAndPersistValue(s.eVar8,'s_p_s_prop8',0);
			var dt=popDT();
			s.eVar36 = s.getCustomValOnce(dt,'ev_36_getval',0);
			s.events = s.apl(s.events,"event17,event52",",",2);
		}
	}
	else if (refSearch(document.referrer)){
    	if (s.getQueryParam('searchid')){
      		s.eVar50 = s.prop50 = "paid:"+s.prop50;
    	}else{
      		s.eVar50 = s.prop50 = "natural:"+s.prop50;
    	}
    	s.eVar50=s.getCustomValOnce(s.eVar50,"eVar50_getval",0)
	}
		
	if(!tempSuite.match(s_account)){
		s.setSuite(tempSuite+s_account,"s_suite",0)
		tempSuite=s.c_r("s_suite");
	}
	    
//support vars
	if((s.linkTrackVars!='None'&& s.linkTrackVars!='')||s.linkTrackVars.match('prop')||s.linkTrackVars.match('eVar')||s.linkTrackVars.match('evar')||s.linkTrackVars.match('events'))
	{
		s.linkTrackVars=s.linkTrackVars+",prop37,prop39,pageName,eVar52,prop52,prop14,eVar14,prop15,eVar15,zip,prop1,prop2,prop3,eVar1,eVar2,eVar3"		
	}
   	s.prop37="160614"
   	if(!s.prop39 && s.pageName)s.prop39=s.pageName
	s.eVar52=s.prop52=document.URL
	s.prop47=s.eVar47="D=UserAgent"
 
 if(s.eVar12 && s.eVar16)s.prop36=s.eVar34=s.eVar12+":"+s.eVar16

}
		
/*************************************CUSTOM COMMON SITE FUNCTIONS*****************************/

function webTrendsTracking(){

	if (s.getQueryParam('WT.srch').indexOf('1') != -1) s.prop26 = s.eVar26 = s.getQueryParam('WT.mc_id');
	
	if (s.getQueryParam('WT.tsrc')){
		if (s.getQueryParam('WT.tsrc').indexOf('AutoBuyout') !=-1) s.campaign='autobuyout: ' + s.getQueryParam('WT.mc_id');
		if (s.getQueryParam('WT.tsrc').indexOf('Banner') !=-1) s.campaign='banner: ' + s.getQueryParam('WT.mc_id');
		if (s.getQueryParam('WT.tsrc').indexOf('Advertorial') !=-1) s.campaign='advertorial: ' + s.getQueryParam('WT.mc_id');
		if (s.getQueryParam('WT.tsrc').indexOf('Video') !=-1) s.campaign='video: ' + s.getQueryParam('WT.mc_id');
		if (s.getQueryParam('WT.tsrc').indexOf('QR_code') !=-1) s.campaign='qrcode: ' + s.getQueryParam('WT.mc_id');
		if (s.getQueryParam('WT.tsrc').indexOf('DirectMail') !=-1) s.campaign='directmail: ' + s.getQueryParam('WT.mc_id');

		if (s.getQueryParam('WT.tsrc').indexOf('Email') !=-1)s.prop33= s.eVar33= s.getQueryParam('WT.mc_id');

		if (s.getQueryParam('WT.tsrc').indexOf('eBroc') !=-1) s.prop30=s.eVar30='ebrochure: ' + s.getQueryParam('WT.mc_id');
		if (s.getQueryParam('WT.tsrc').indexOf('CampaignSite') !=-1) s.prop30=s.eVar30='campaignsite: ' + s.getQueryParam('WT.mc_id');
	}
	
	if (!s.getQueryParam('WT.tsrc') && s.getQueryParam('WT.mc_id')){
	
		if (s.getQueryParam('WT.mc_id').indexOf('eDM_') != -1)s.prop33= s.eVar33= s.getQueryParam('WT.mc_id');
		else s.campaign='banner: ' + s.getQueryParam('WT.mc_id');
	}
}


function padFrontZero(val) {
	if (val < 10) return '0'+val; else return val.toString();
}

function popDT() {
	var dte = new Date();
	return dte.getFullYear()+padFrontZero(dte.getMonth()+1)+padFrontZero(dte.getDate())+' '+padFrontZero(dte.getHours());
}


function trafficsource() {

  	return camp()
}

function camp(){

	if(s.getQueryParam('referrer')) var ref=s.getQueryParam('referrer') 
	else var ref = document.referrer; 
	
	var fordCamp = s.getQueryParam('fmccmp');
	 
	if(s.getQueryParam('bannerid')) return 'banner';
	else if(s.getQueryParam('emailid')) return 'email';
    else if(s.getQueryParam('searchid')) {s.eVar50 = s.prop50 = "paid:" + s.prop50; return 'search-paid';}
    else if(s.getQueryParam('scmp')) return 'social-placement';
    else if(fordCamp){if (fordCamp.indexOf('t2-fdaf')>-1 || fordCamp.indexOf('t2-lda')>-1){return 'fmc:tier2';}else return 'fmc:other';}
    else if(ref=='') return 'typed-bookmarked';
    else if(refSearch(ref)) {s.eVar50 = s.prop50 = "natural:"+s.prop50; return 'search-natural';}
    else if(refSocial(ref)) return 'social';
    else return 'natural-referrer';
}


function refSearch(ref) {
   	var se = new Array('google.|q','yahoo.com|p','msn.com|q','ask.com|q','myway.com|searchfor','altavista.com|q','netscape.com|query','live.com|q','allthweb.com|q','lycos.com|query','.aol.|q','.aol.|query','suche.aolsvc.de|query','suche.aolsvc.de|q','bing.com|q','ask.jp|q','ask.co|ask','ask.jp|ask','ask.co|q','search.mywebsearch.com|searchfor','baidu.com|wd');

    for (i = 0; i < se.length; i++) {
        var tmp = se[i].split('|');
        var keyword = s.getQueryParam(tmp[1], '', ref);
        if (ref.indexOf(tmp[0]) > -1) {
	        if(keyword == ''&& typeof keyword != "undefined")keyword="no keyword"
	   		s.eVar50 = s.prop50 = keyword;
            if (tmp[0] == 'google.') {
                var rnk1 = s.getQueryParam('resnum', '', ref);
                var rnk2 = s.getQueryParam('cd', '', ref);
    
                if (rnk1||rnk2) {
                    s.events = s.apl(s.events, "event50", ",", 1);
                    s.events = s.apl(s.events, "event51", ",", 1);
                   
                    if(rnk1)s.products = s.apl(s.products, ";;;;" + "event50=" + rnk1, ",", 1);
                    if(rnk2)s.products = s.apl(s.products, ";;;;" + "event50=" + rnk2, ",", 1);
                	}
            	}
        
            return true;
        }
    }

    return false;
}

function refSocial(ref) {
   	var socialSites = new Array('12seconds.tv','4travel.jp','advogato.org','ameba.jp','anobii.com','asmallworld.net','backtype.com','badoo.com','bebo.com','bigadda.com','bigtent.com','biip.no','blackplanet.com','blog.seesaa.jp','blogspot.com','blogster.com','blomotion.jp','bolt.com','brightkite.com','buzznet.com','cafemom.com','care2.com','classmates.com','cloob.com','collegeblender.com','cyworld.co.kr','cyworld.com.cn','dailymotion.com','delicious.com','deviantart.com','digg.com','diigo.com','disqus.com','draugiem.lv','facebook.com','faceparty.com','fc2.com','flickr.com','flixster.com','fotolog.com','foursquare.com','friendfeed.com','friendsreunited.com','friendster.com','fubar.com','gaiaonline.com','geni.com','goodreads.com','grono.net','habbo.com','hatena.ne.jp','hi5.com','hotnews.infoseek.co.jp','hyves.nl','ibibo.com','identi.ca','imeem.com','intensedebate.com','irc-galleria.net','iwiw.hu','jaiku.com','jp.myspace.com','kaixin001.com','kaixin002.com','kakaku.com','kanshin.com','kozocom.com','last.fm','linkedin.com','livejournal.com','me2day.net','meetup.com','mister-wong.com','mixi.jp','mixx.com','mouthshut.com','multiply.com','myheritage.com','mylife.com','myspace.com','myyearbook.com','nasza-klasa.pl','netlog.com','nettby.no','netvibes.com','nicovideo.jp','ning.com','odnoklassniki.ru','orkut.com','pakila.jp','photobucket.com','pinterest.com','plaxo.com','plurk.com','plus.google.com','reddit.com','renren.com','skyrock.com','slideshare.net','smcb.jp','smugmug.com','sonico.com','studivz.net','stumbleupon.com','t.163.com','t.co','t.hexun.com','t.ifeng.com','t.people.com.cn','t.qq.com','t.sohu.com','tabelog.com','tagged.com','taringa.net','tripit.com','trombi.com','trytrend.jp','tuenti.com','tumblr.com','twine.com','twitter.com','uhuru.jp','viadeo.com','vimeo.com','vkontakte.ru','vox.com','wayn.com','weibo.com','weourfamily.com','wer-kennt-wen.de','wordpress.com','xanga.com','xing.com','yaplog.jp','yelp.com','youtube.com','yozm.daum.net','yuku.com','zooomr.com');
	
    for (i = 0; i < socialSites.length; i++) {
        if (ref.indexOf(socialSites[i]) > -1) {return true;}
    }
    return false;
}


function isInternal()
{
	
	var ref=document.referrer
	if(ref!='')
	{
		if(ref.indexOf('www.')>-1)ref=ref.replace('www.','')
		if(ref.indexOf('https://')>-1)ref=ref.replace('https://','')
		if(ref.indexOf('http://')>-1)ref=ref.replace('http://','')	
		var ref1=ref.split('/');
		var refdom=ref1[0];
		
	var filter =s.linkInternalFilters.split(',')
	
		for(i=0;i<filter.length; i++)
		{
		if(refdom.indexOf(filter[i])>-1)return true;
		}
	}	

		return false;
}

function changeCookiePeriods(host){
//if more than "ford.co" or "ford.com" - return true
	var hostArray = new Array();
	hostArray = host.split('.');
	for (i=0; i < hostArray.length; i++) {
		if (hostArray[i] == 'ford' || hostArray[i] == 'fordpartner' || hostArray[i] == 'fordfranchise' || hostArray[i] == 'mazda' || hostArray[i] == 'lincoln' || hostArray[i] == 'motocraft' || hostArray[i] == 'fordcaminhoes' || hostArray[i] == 'myford'){
			var maxlength = i + 2;
			if (hostArray.length > maxlength) return true;
		}
	}
}

//List of plugins
s.doPlugins=s_doPlugins
/************************** PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */

/*
 * Plugin Utility: Replace v1.0
 */
s.repl=new Function("x","o","n",""
+"var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+"substring(i+o.length);i=x.indexOf(o,i+l)}return x");

/*
 * Plugin: socialPlatforms v1.1
 */
s.socialPlatforms=new Function("a",""
+"var s=this,g,K,D,E,F,i;g=s.referrer?s.referrer:document.referrer;g=g."
+"toLowerCase();K=s.split(s.socPlatList,'|');for(i=0;i<K.length;i++){"
+"D=s.split(K[i],'>');if(g.indexOf(D[0])!=-1){s.contextData['a.socialcontentprovider']=D[1];}}");
 
s.socPlatList="facebook.com>Facebook|twitter.com>Twitter|t.co/>Twitter|youtube.com>Youtube|clipmarks.com>Clipmarks|dailymotion.com>Dailymotion|delicious.com>Delicious|digg.com>Digg|diigo.com>Diigo|flickr.com>Flickr|flixster.com>Flixster|fotolog.com>Fotolog|friendfeed.com>FriendFeed|google.com/buzz>Google Buzz|buzz.googleapis.com>Google Buzz|plus.google.com>Google+|hulu.com>Hulu|identi.ca>identi.ca|ilike.com>iLike|intensedebate.com>IntenseDebate|myspace.com>MySpace|newsgator.com>Newsgator|photobucket.com>Photobucket|plurk.com>Plurk|slideshare.net>SlideShare|smugmug.com>SmugMug|stumbleupon.com>StumbleUpon|tumblr.com>Tumblr|vimeo.com>Vimeo|wordpress.com>WordPress|xanga.com>Xanga|metacafe.com>Metacafe|pinterest.com>Pinterest";

/*  
 * socialAuthors v1.5.2
 */
s.socialAuthors=new Function("",""
+"var s=this,g;g=s.referrer?s.referrer:document.referrer;if(g.indexOf"
+"('http://t.co/')===0||g.indexOf('https://t.co/')===0||g.indexOf('pi"
+"nterest.com/pin')!==-1||g.indexOf('tumblr.com')!==-1||g.indexOf('yo"
+"utube.com')!==-1){s.Integrate.add('SocialAuthor');s.Integrate.Socia"
+"lAuthor.tEvar='reserved';s.Integrate.SocialAuthor.get('http://sa-se"
+"rvices.social.omniture.com/author/name?var=[VAR]&callback=s.socialA"
+"uthorSearch&rs='+encodeURIComponent(s_account)+'&q='+encodeURICompo"
+"nent(g));s.Integrate.SocialAuthor.delay();s.Integrate.SocialAuthor."
+"setVars=function(s,p){if(p.tEvar==='reserved'){s.contextData['a.soc"
+"ialauthor']=s.user;}else{s[p.tEvar]=s.user;}}}");
s.socialAuthorSearch=new Function("obj",""
+"var s=this;if(typeof obj==='undefined'||typeof obj.author==='undefi"
+"ned'){s.user='Not Found';}else{s.user=obj.author;}s.Integrate.Socia"
+"lAuthor.ready();");

/*
* Plugin Utility: apl v1.1
*/
s.apl = new Function("l", "v", "d", "u", ""
+ "var s=this,m=0;if(!l)l='';if(u){var i,n,a=s.split(l,d);for(i=0;i<a."
+ "length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+ "e()));}}if(!m)l=l?l+d+v:v;return l");

/*
* Utility Function: split v1.5 (JS 1.0 compatible)
*/
s.split = new Function("l", "d", ""
+ "var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+ "++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

/*
 * Plugin: getQueryParam 2.3
 */
s.getQueryParam=new Function("p","d","u",""
+"var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati"
+"on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p"
+".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-"
+"1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i="
+"=p.length?i:i+1)}return v");
s.p_gpv=new Function("k","u",""
+"var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
+"=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+"epa(v)}return ''");

/*
 * Plugin: Set Suite
 */
s.setSuite=new Function("v","c","e",""
+"var s=this,k=s.c_r(c),a=new Date;e=e?e:0;if(v){a.setTime(a.getTime("
+")+1800000);s.c_w(c,v,a);}else{v='novalue';a.setTime(a.getTime()+1800000);s.c_w(c,v,a);}");

/*
 * Plugin: getAndPersistValue 0.3 - get a value on every page
 */
s.getAndPersistValue=new Function("v","c","e",""
+"var s=this,a=new Date;e=e?e:0;a.setTime(a.getTime()+e*86400000);if("
+"v)s.c_w(c,v,e?a:0);return s.c_r(c);");



/*
 * Plugin: getCustomValOnce 
 */
s.getCustomValOnce=new Function("v","c","e",""
+"var s=this,k=s.c_r(c),a=new Date;e=e?e:0;if(v){a.setTime(a.getTime("
+")+1800000);if(!s.c_w(c,v,a))s.c_w(c,v,0);}else{a.setTime(a.getTime()+1800000);v=s.c_r(c);if(!s.c_w(c,v,a))s.c_w(c,v,a);}return v==k?'':v");


s.join = new Function("v","p",""
+"var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"
+":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"
+";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el"
+"se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");

/*
 * Plugin: getVisitStart v2.0 - returns 1 on first page of visit
 * otherwise 0
 */
s.getVisitStart=new Function("c",""
+"var s=this,v=1,t=new Date;t.setTime(t.getTime()+1800000);if(s.c_r(c"
+")){v=0}if(!s.c_w(c,1,t)){s.c_w(c,1,0)}if(!s.c_r(c)){v=0}return v;"); 

function fnGetDomain(url) {
return (url.match(/:\/\/(.[^/]+)/)[1]);
}

/* Configure Modules and Plugins */

s.maxDelay='3000';//max time to wait for 3rd party api response in milliseconds
s.loadModule("Integrate")
s.Integrate.onLoad=function(s,m){
	s.socialAuthors();
	//add other integration module dependent functions here
 };


/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/

s.trackingServer="fordap.sc.omtrdc.net"
s.trackingServerSecure="fordap.sc.omtrdc.net"

/************* Modules **************/

/* Module: Integrate */
s.m_Integrate_c="var m=s.m_i('Integrate');m.add=function(n,o){var m=this,p;if(!o)o='s_Integrate_'+n;if(!m.s.wd[o])m.s.wd[o]=new Object;m[n]=new Object;p=m[n];p._n=n;p._m=m;p._c=0;p._d=0;p.disable=0;p"
+".get=m.get;p.delay=m.delay;p.ready=m.ready;p.beacon=m.beacon;p.script=m.script;m.l[m.l.length]=n};m._g=function(t){var m=this,s=m.s,i,p,f=(t?'use':'set')+'Vars',tcf;for(i=0;i<m.l.length;i++){p=m[m."
+"l[i]];if(p&&!p.disable&&p[f]){if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','p','f','var e;try{p[f](s,p)}catch(e){}');tcf(s,p,f)}else p[f](s,p)}}};m._t=function(){this._g(1)};m._fu=func"
+"tion(p,u){var m=this,s=m.s,v,x,y,z,tm=new Date;if(u.toLowerCase().substring(0,4) != 'http')u='http://'+u;if(s.ssl)u=s.rep(u,'http:','https:');p.RAND=Math&&Math.random?Math.floor(Math.random()*10000"
+"000000000):tm.getTime();p.RAND+=Math.floor(tm.getTime()/10800000)%10;x=0;while(x>=0){x=u.indexOf('[',x);if(x>=0){y=u.indexOf(']',x);if(y>x){z=u.substring(x+1,y);if(z.length>2&&z.substring(0,2)=='s."
+"'){v=s[z.substring(2)];if(!v)v=''}else{v=''+p[z];if(!(v==p[z]||parseFloat(v)==p[z]))z=0}if(z) {u=u.substring(0,x)+s.rep(escape(v),'+','%2B')+u.substring(y+1);x=y-(z.length-v.length+1)} else {x=y}}}"
+"}return u};m.get=function(u,v){var p=this,m=p._m;if(!p.disable){if(!v)v='s_'+m._in+'_Integrate_'+p._n+'_get_'+p._c;p._c++;p.VAR=v;p._d++;m.s.loadModule('Integrate:'+v,m._fu(p,u),0,1,p._n)}};m.delay"
+"=function(){var p=this;if(p._d<=0)p._d=1};m.ready=function(){var p=this,m=p._m;p._d=0;if(!p.disable)m.s.dlt()};m._d=function(){var m=this,i,p;for(i=0;i<m.l.length;i++){p=m[m.l[i]];if(p&&!p.disable&"
+"&p._d>0)return 1}return 0};m._x=function(d,n){var p=this[n],x;if(!p.disable){for(x in d)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))p[x]=d[x];p._d--}};m.beacon=function(u){var p=this,m"
+"=p._m,s=m.s,imn='s_i_'+m._in+'_Integrate_'+p._n+'_'+p._c,im;if(!p.disable&&s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){p._c++;im=s.wd[imn]=new Image;im.src=m._fu(p,u)}};m.s"
+"cript=function(u){var p=this,m=p._m;if(!p.disable)m.s.loadModule(0,m._fu(p,u),0,1)};m.l=new Array;if(m.onLoad)m.onLoad(s,m)";
s.m_i("Integrate");


/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s.version='H.27.3';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(s.rep(m,\"\\\\\",\"\\\\"
+"\\\\\"),\"\\n\",\"\\\\n\"),\"\\\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}retur"
+"n y};s.fl=function(x,l){return x?(''+x).substring(0,l):x};s.co=function(o){return o};s.num=function(x){x=''+x;for(var p=0;p<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;ret"
+"urn 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',f=\"+~!*()'\",i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3){x=encodeURIComponent("
+"x);for(i=0;i<f.length;i++) {n=f.substring(i,i+1);if(x.indexOf(n)>=0)x=s.rep(x,n,\"%\"+n.charCodeAt(0).toString(16).toUpperCase())}}else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.su"
+"bstring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else x=s.rep(escape(''+x),'+"
+"','%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00"
+"'+x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x){var s=this,y,tcf;if(x){x=s.rep(''+x,'+',' ');if(s.em==3){tcf=new Function('x','var y,e;try{y=decodeURIComponent(x)}catch(e){y=unesc"
+"ape(x)}return y');return tcf(x)}else return unescape(x)}return y};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r"
+";z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a=a.substring(0,c);if(t.substring("
+"0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf'"
+",f);return s.fsg};s.mpc=function(m,a){var s=this,c,l,n,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(v&&v=='prerender'){if(!s.mpq){s.mpq=new Array;l=s.sp('webkitvisibilitychange,visi"
+"bilitychange',',');for(n=0;n<l.length;n++){s.d.addEventListener(l[n],new Function('var s=s_c_il['+s._in+'],c,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(s.mpq&&v==\"visible\"){whil"
+"e(s.mpq.length>0){c=s.mpq.shift();s[c.m].apply(s,c.a)}s.mpq=0}'),false)}}c=new Object;c.m=m;c.a=a;s.mpq.push(c);return 1}return 0};s.si=function(){var s=this,i,k,v,c=s_gi+'var s=s_gi(\"'+s.oun+'\")"
+";s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=undefined){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}c+=\"s.lnk=s.eo=s.linkName=s.li"
+"nkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostnam"
+"e,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'"
+".','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<"
+"0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-6"
+"0);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':''"
+");return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i"
+";l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tc"
+"f=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s"
+".wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0"
+";return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return "
+"s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)fo"
+"r(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r.t,r.u)}};s.flushBufferedRequests=function(){};s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackin"
+"gServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+s._in+'_'+un,im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLow"
+"erCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/'+s.vers"
+"ion+(s.tcn?'T':'')+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(rs,2047)}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if"
+"(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]"
+"=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}if(s.debugTracking){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;for(dln=0;dln<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im=s.wd["
+"imn];if(!im)im=s.wd[imn]=new Image;im.alt=\"\";im.s_l=0;im.onload=im.onerror=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.bcr();s.mrq(\"'+un+'\");s.nrs--;if(!"
+"s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;im.src=rs;if(s.useForcedLinkTracking||s.bcf){if(!s.forcedLinkTrackingTimeout)s.forcedLinkTrackingTimeout=250;setTimeout('if(window"
+".s_c_il)window.s_c_il['+s._in+'].bcr()',s.forcedLinkTrackingTimeout);}else if((s.lnk||s.eo)&&(!ta||ta=='_self'||ta=='_top'||ta=='_parent'||(s.wd.name&&ta==s.wd.name))){b=e=new Date;while(!im.s_l&&e"
+".getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'"
+"+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,"
+"l=0,q,a,b='',c='',t;if(x&&x.length>255){y=''+x;i=y.indexOf('?');if(i>0){q=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCase();j=0;if(h.substring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='ht"
+"tps://')j+=8;i=h.indexOf(\"/\",j);if(i>0){h=h.substring(j,i);p=y.substring(i);y=y.substring(0,i);if(h.indexOf('google')>=0)l=',q,ie,start,search_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l="
+"',p,ei,';if(l&&q){a=s.sp(q,'&');if(a&&a.length>1){for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'"
+"+c;else c=''}i=253-(q.length-c.length)-y.length;x=y+(i>0?p.substring(0,i):'')+'?'+q}}}}return x};s.s2q=function(k,v,vf,vfp,f){var s=this,qs='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextDat"
+"a\")k=\"c\";if(v){for(sk in v)if((!f||sk.substring(0,f.length)==f)&&v[sk]&&(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',')>=0)&&(!Object||!Object.prototype||!Object.prototype[sk])){nfm=0;if(nfl)for(n"
+"fn=0;nfn<nfl.length;nfn++)if(sk.substring(0,nfl[nfn].length)==nfl[nfn])nfm=1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk];if(f)sk=sk.substring(f.length);if(sk.length>0){nke=sk.indexOf('.');if(nke>0){n"
+"k=sk.substring(0,nke);nf=(f?f:'')+nk+'.';if(!nfl)nfl=new Array;nfl[nfl.length]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(typeof(sv)=='boolean'){if(sv)sv='true';else sv='false'}if(sv){if(vfp=='retrieveLi"
+"ghtData'&&f.indexOf('.contextData.')<0){sp=sk.substring(0,4);ss=sk.substring(4);if(sk=='transactionID')sk='xact';else if(sk=='channel')sk='ch';else if(sk=='campaign')sk='v0';else if(s.num(ss)){if(s"
+"p=='prop')sk='c'+ss;else if(sp=='eVar')sk='v'+ss;else if(sp=='list')sk='l'+ss;else if(sp=='hier'){sk='h'+ss;sv=sv.substring(0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}if(qs!='')qs+='&.'+k}return "
+"qs};s.hav=function(){var s=this,qs='',l,fv='',fe='',mn,i,e;if(s.lightProfileID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv=','+fv+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType){fv=s.linkTrackVars;fe"
+"=s.linkTrackEvents;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;if(fe){fe=','+fe+',';if"
+"(fv)fv+=',events,'}if (s.events2)e=(e?',':'')+s.events2}for(i=0;i<l.length;i++){var k=l[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&e){v=e;e=''}if(v&&(!fv|"
+"|fv.indexOf(','+k+',')>=0)&&k!='linkName'&&k!='linkType'){if(k=='supplementalDataID')q='sdid';else if(k=='timestamp')q='ts';else if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';e"
+"lse if(k=='marketingCloudVisitorID')q='mid';else if(k=='analyticsVisitorID')q='aid';else if(k=='audienceManagerLocationHint')q='aamlh';else if(k=='audienceManagerBlob')q='aamb';else if(k=='authStat"
+"e')q='as';else if(k=='pageURL'){q='g';if(v.length>255){s.pageURLRest=v.substring(255);v=v.substring(0,255);}}else if(k=='pageURLRest')q='-g';else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if"
+"(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigrationServerSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&"
+"s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em==2||s.em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainP"
+"eriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode')q='cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=="
+"'campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j';else if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='brows"
+"erWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp';else if(k=='plugins')q='p';else if(k=='events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v"
+",fe)}else if(k=='events2')v='';else if(k=='contextData'){qs+=s.s2q('c',s[k],fv,k,0);v=''}else if(k=='lightProfileID')q='mtp';else if(k=='lightStoreForSeconds'){q='mtss';if(!s.lightProfileID)v=''}el"
+"se if(k=='lightIncrementBy'){q='mti';if(!s.lightProfileID)v=''}else if(k=='retrieveLightProfiles')q='mtsr';else if(k=='deleteLightProfiles')q='mtsd';else if(k=='retrieveLightData'){if(s.retrieveLig"
+"htProfiles)qs+=s.s2q('mts',s[k],fv,k,0);v=''}else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape("
+"q)+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('?'),hi=h.indexOf('#');if(qi>=0){if(hi>=0&&hi<qi)qi=hi;}e"
+"lse qi=hi;h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)ret"
+"urn 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLi"
+"nks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.indexOf('#')!=0&&h.indexOf('about:')!=0&&h.indexOf('javascript:')!=0&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt"
+"(lif,',','ltef',h)))return 'e';return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=this;s.t();s.lnk=0;if(b)return this[b](e);return true');s.bcr=function(){var "
+"s=this;if(s.bct&&s.bce)s.bct.dispatchEvent(s.bce);if(s.bcf){if(typeof(s.bcf)=='function')s.bcf();else if(s.bct&&s.bct.href)s.d.location=s.bct.href}s.bct=s.bce=s.bcf=0};s.bc=new Function('e','if(e&&"
+"e.s_fe)return;var s=s_c_il['+s._in+'],f,tcf,t,n,nrs,a,h;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;if(!s.bbc)s.useForcedLinkTracking=0;else if(!s.useForcedLinkTracking){s.b.removeEventListener(\"cli"
+"ck\",s.bc,true);s.bbc=s.useForcedLinkTracking=0;return}else s.b.removeEventListener(\"click\",s.bc,false);s.eo=e.srcElement?e.srcElement:e.target;nrs=s.nrs;s.t();s.eo=0;if(s.nrs>nrs&&s.useForcedLin"
+"kTracking&&e.target){a=e.target;while(a&&a!=s.b&&a.tagName.toUpperCase()!=\"A\"&&a.tagName.toUpperCase()!=\"AREA\")a=a.parentNode;if(a){h=a.href;if(h.indexOf(\"#\")==0||h.indexOf(\"about:\")==0||h."
+"indexOf(\"javascript:\")==0)h=0;t=a.target;if(e.target.dispatchEvent&&h&&(!t||t==\"_self\"||t==\"_top\"||t==\"_parent\"||(s.wd.name&&t==s.wd.name))){tcf=new Function(\"s\",\"var x;try{n=s.d.createE"
+"vent(\\\\\"MouseEvents\\\\\")}catch(x){n=new MouseEvent}return n\");n=tcf(s);if(n){tcf=new Function(\"n\",\"e\",\"var x;try{n.initMouseEvent(\\\\\"click\\\\\",e.bubbles,e.cancelable,e.view,e.detail"
+",e.screenX,e.screenY,e.clientX,e.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.button,e.relatedTarget)}catch(x){n=0}return n\");n=tcf(n,e);if(n){n.s_fe=1;e.stopPropagation();if (e.stopImmediate"
+"Propagation) {e.stopImmediatePropagation();}e.preventDefault();s.bct=e.target;s.bce=n}}}}}');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?')"
+";k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host"
+"?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagName;if(o.tagUrn||(o.scopeName&&o.scopeName.toUpperCase()!='HTML'))return '';t=t&"
+"&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE')t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var "
+"s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.r"
+"ep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' ','');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.s"
+"rc&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&("
+"','+u+',').indexOf(','+un+',')>=0){if(u!=s.un&&s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c"
+"<0)return s.pt(v,'&','rqf',un);return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);re"
+"turn 0};s.sqs=function(un,q){var s=this;s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','"
+"sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype["
+"x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for("
+"i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s."
+"wds=function(){var s=this;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener){if(s.n&&((s.n.userAgent.indexOf('WebK"
+"it')>=0&&s.d.createEvent)||(s.n.userAgent.indexOf('Firefox/2')>=0&&s.wd.MouseEvent))){s.bbc=1;s.useForcedLinkTracking=1;s.b.addEventListener('click',s.bc,true)}s.b.addEventListener('click',s.bc,fal"
+"se)}else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=function(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<19"
+"00?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t"
+"?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.substring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountL"
+"ist,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.i"
+"ndexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};s.sa=function(un){var s=this;if(s.un&&s.mpc('sa',arguments))return;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=',"
+"'+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_"
+"m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l"
+"[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=ne"
+"w Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(s.mpc(\"m_a\",arguments))return;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)"
+"));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m."
+"_d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).index"
+"Of('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]("
+")}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var"
+" s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement"
+"){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)c"
+"learTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b"
+"+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o"
+".l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s"
+".m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.voa=function(vo,r){var s=this,l=s.va_g,i,k,v,x;for(i=0;i<l.length;i++){k=l[i];v=vo[k];if(v||vo['!'+k]"
+"){if(!r&&(k==\"contextData\"||k==\"retrieveLightData\")&&s[k])for(x in s[k])if(!v[x])v[x]=s[k][x];s[k]=v}}};s.vob=function(vo,onlySet){var s=this,l=s.va_g,i,k;for(i=0;i<l.length;i++){k=l[i];vo[k]=s"
+"[k];if(!onlySet&&!vo[k])vo['!'+k]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s."
+"maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if(!vo)vo=new O"
+"bject;s.vob(vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s._waitingForMarketingCloudVisitorID = false;s._doneWaitingForMarketingClou"
+"dVisitorID = false;s._marketingCloudVisitorIDCallback=function(marketingCloudVisitorID) {var s=this;s.marketingCloudVisitorID = marketingCloudVisitorID;s._doneWaitingForMarketingCloudVisitorID = tr"
+"ue;s._callbackWhenReadyToTrackCheck();};s._waitingForAnalyticsVisitorID = false;s._doneWaitingForAnalyticsVisitorID = false;s._analyticsVisitorIDCallback=function(analyticsVisitorID) {var s=this;s."
+"analyticsVisitorID = analyticsVisitorID;s._doneWaitingForAnalyticsVisitorID = true;s._callbackWhenReadyToTrackCheck();};s._waitingForAudienceManagerLocationHint = false;s._doneWaitingForAudienceMan"
+"agerLocationHint = false;s._audienceManagerLocationHintCallback=function(audienceManagerLocationHint) {var s=this;s.audienceManagerLocationHint = audienceManagerLocationHint;s._doneWaitingForAudien"
+"ceManagerLocationHint = true;s._callbackWhenReadyToTrackCheck();};s._waitingForAudienceManagerBlob = false;s._doneWaitingForAudienceManagerBlob = false;s._audienceManagerBlobCallback=function(audie"
+"nceManagerBlob) {var s=this;s.audienceManagerBlob = audienceManagerBlob;s._doneWaitingForAudienceManagerBlob = true;s._callbackWhenReadyToTrackCheck();};s.isReadyToTrack=function() {var s=this,read"
+"yToTrack = true,visitor = s.visitor;if ((visitor) && (visitor.isAllowed())) {if ((!s._waitingForMarketingCloudVisitorID) && (!s.marketingCloudVisitorID) && (visitor.getMarketingCloudVisitorID)) {s."
+"_waitingForMarketingCloudVisitorID = true;s.marketingCloudVisitorID = visitor.getMarketingCloudVisitorID([s,s._marketingCloudVisitorIDCallback]);if (s.marketingCloudVisitorID) {s._doneWaitingForMar"
+"ketingCloudVisitorID = true;}}if ((!s._waitingForAnalyticsVisitorID) && (!s.analyticsVisitorID) && (visitor.getAnalyticsVisitorID)) {s._waitingForAnalyticsVisitorID = true;s.analyticsVisitorID = vi"
+"sitor.getAnalyticsVisitorID([s,s._analyticsVisitorIDCallback]);if (s.analyticsVisitorID) {s._doneWaitingForAnalyticsVisitorID = true;}}if ((!s._waitingForAudienceManagerLocationHint) && (!s.audienc"
+"eManagerLocationHint) && (visitor.getAudienceManagerLocationHint)) {s._waitingForAudienceManagerLocationHint = true;s.audienceManagerLocationHint = visitor.getAudienceManagerLocationHint([s,s._audi"
+"enceManagerLocationHintCallback]);if (s.audienceManagerLocationHint) {s._doneWaitingForAudienceManagerLocationHint = true;}}if ((!s._waitingForAudienceManagerBlob) && (!s.audienceManagerBlob) && (v"
+"isitor.getAudienceManagerBlob)) {s._waitingForAudienceManagerBlob = true;s.audienceManagerBlob = visitor.getAudienceManagerBlob([s,s._audienceManagerBlobCallback]);if (s.audienceManagerBlob) {s._do"
+"neWaitingForAudienceManagerBlob = true;}}if (((s._waitingForMarketingCloudVisitorID)     && (!s._doneWaitingForMarketingCloudVisitorID)     && (!s.marketingCloudVisitorID)) ||((s._waitingForAnalyti"
+"csVisitorID)          && (!s._doneWaitingForAnalyticsVisitorID)          && (!s.analyticsVisitorID)) ||((s._waitingForAudienceManagerLocationHint) && (!s._doneWaitingForAudienceManagerLocationHint)"
+" && (!s.audienceManagerLocationHint)) ||((s._waitingForAudienceManagerBlob)         && (!s._doneWaitingForAudienceManagerBlob)         && (!s.audienceManagerBlob))) {readyToTrack = false;}}return r"
+"eadyToTrack;};s._callbackWhenReadyToTrackQueue = null;s._callbackWhenReadyToTrackInterval = 0;s.callbackWhenReadyToTrack=function(callbackThis,callback,args) {var s=this,callbackInfo;callbackInfo ="
+" {};callbackInfo.callbackThis = callbackThis;callbackInfo.callback     = callback;callbackInfo.args         = args;if (s._callbackWhenReadyToTrackQueue == null) {s._callbackWhenReadyToTrackQueue = "
+"[];}s._callbackWhenReadyToTrackQueue.push(callbackInfo);if (s._callbackWhenReadyToTrackInterval == 0) {s._callbackWhenReadyToTrackInterval = setInterval(s._callbackWhenReadyToTrackCheck,100);}};s._"
+"callbackWhenReadyToTrackCheck=new Function('var s=s_c_il['+s._in+'],callbackNum,callbackInfo;if (s.isReadyToTrack()) {if (s._callbackWhenReadyToTrackInterval) {clearInterval(s._callbackWhenReadyToT"
+"rackInterval);s._callbackWhenReadyToTrackInterval = 0;}if (s._callbackWhenReadyToTrackQueue != null) {while (s._callbackWhenReadyToTrackQueue.length > 0) {callbackInfo = s._callbackWhenReadyToTrack"
+"Queue.shift();callbackInfo.callback.apply(callbackInfo.callbackThis,callbackInfo.args);}}}');s._handleNotReadyToTrack=function(variableOverrides) {var s=this,args,varKey,variableOverridesCopy = nul"
+"l,setVariables = null;if (!s.isReadyToTrack()) {args = [];if (variableOverrides != null) {variableOverridesCopy = {};for (varKey in variableOverrides) {variableOverridesCopy[varKey] = variableOverr"
+"ides[varKey];}}setVariables = {};s.vob(setVariables,true);args.push(variableOverridesCopy);args.push(setVariables);s.callbackWhenReadyToTrack(s,s.track,args);return true;}return false;};s.gfid=func"
+"tion(){var s=this,d='0123456789ABCDEF',k='s_fid',fid=s.c_r(k),h='',l='',i,j,m=8,n=4,e=new Date,y;if(!fid||fid.indexOf('-')<0){for(i=0;i<16;i++){j=Math.floor(Math.random()*m);h+=d.substring(j,j+1);j"
+"=Math.floor(Math.random()*n);l+=d.substring(j,j+1);m=n=16}fid=h+'-'+l;}y=e.getYear();e.setYear(y+2+(y<1900?1900:0));if(!s.c_w(k,fid,e))fid=0;return fid};s.track=s.t=function(vo,setVariables){var s="
+"this,notReadyToTrack,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate()+'"
+"/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',vb=new Object;i"
+"f (s.visitor) {if (s.visitor.getAuthState) {s.authState = s.visitor.getAuthState();}if ((!s.supplementalDataID) && (s.visitor.getSupplementalDataID)) {s.supplementalDataID = s.visitor.getSupplement"
+"alDataID(\"AppMeasurement:\" + s._in,(s.expectSupplementalData ? false : true));}}if(s.mpc('t',arguments))return;s.gl(s.vl_g);s.uns();s.m_ll();notReadyToTrack = s._handleNotReadyToTrack(vo);if (!no"
+"tReadyToTrack) {if (setVariables) {s.voa(setVariables);}if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&S"
+"tring.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Fun"
+"ction('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next){j='1.7';if(a.reduce){j='1.8';if(j.trim){j='1.8.1';if(Date.parse){j='1.8.2';if(Object.create)j='1.8.5'}}}}}}}}}"
+"if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins"
+"}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElement.offsetWidth;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function("
+"'s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}return hp');hp=tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#"
+"clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.co"
+"lorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.vob(vb);s.voa(vo)}if(!s.analyt"
+"icsVisitorID&&!s.marketingCloudVisitorID)s.fid=s.gfid();if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);if(!s.abort){var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL="
+"l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk,p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s"
+".eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(o){t=s.ot(o);n=s.oid(o);x=o.s_oidt}}if(!n||t=='BODY')o='';if(o){oc=o.onclick?''+o.onclick:'';if((oc.indexOf('s_gs(')>="
+"0&&oc.indexOf('.s_oc(')<0)||oc.indexOf('.tl(')>=0)o=0}}if(o){if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowe"
+"rCase():s.lt(h);if(t&&(h||l)){s.pe='lnk_'+(t=='d'||t=='e'?t:'o');s.pev1=(h?s.ape(h):'');s.pev2=(l?s.ape(l):'')}else trk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if("
+"o.dataset&&o.dataset.sObjectId){s.wd.s_objectID=o.dataset.sObjectId;}else if(o.getAttribute&&o.getAttribute('data-s-object-id')){s.wd.s_objectID=o.getAttribute('data-s-object-id');}else if(s.useFor"
+"cedLinkTracking){s.wd.s_objectID='';oc=o.onclick?''+o.onclick:'';if(oc){var ocb=oc.indexOf('s_objectID'),oce,ocq,ocx;if(ocb>=0){ocb+=10;while(ocb<oc.length&&(\"= \\t\\r\\n\").indexOf(oc.charAt(ocb)"
+")>=0)ocb++;if(ocb<oc.length){oce=ocb;ocq=ocx=0;while(oce<oc.length&&(oc.charAt(oce)!=';'||ocq)){if(ocq){if(oc.charAt(oce)==ocq&&!ocx)ocq=0;else if(oc.charAt(oce)==\"\\\\\")ocx=!ocx;else ocx=0;}else"
+"{ocq=oc.charAt(oce);if(ocq!='\"'&&ocq!=\"'\")ocq=0}oce++;}oc=oc.substring(ocb,oce);if(oc){o.s_soid=new Function('s','var e;try{s.wd.s_objectID='+oc+'}catch(e){}');o.s_soid(s)}}}}}if(s.gg('objectID'"
+")){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}else trk=0}if(trk||qs){s.sampl"
+"ed=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,ta);qs='';s.m_m('t');if(s.p_r)s.p_r();s.referrer=s.lightProfileID=s.retrieveLightProfiles=s.delet"
+"eLightProfiles=''}s.sq(qs)}}}else s.dl(vo);if(vo)s.voa(vb,1);}s.abort=0;s.supplementalDataID=s.pageURLRest=s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.p"
+"g)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';return code};s.trackLink=s.tl=function(o,t,n,vo,f){var s=this;s.lnk=o;s.linkType=t;s.linkName=n;if(f){s.bct=o;s.bcf=f}s.t(vo)};s.trackLight"
+"=function(p,ss,i,vo){var s=this;s.lightProfileID=p;s.lightStoreForSeconds=ss;s.lightIncrementBy=i;s.t(vo)};s.setTagContainer=function(n){var s=this,l=s.wd.s_c_il,i,t,x,y;s.tcn=n;if(l)for(i=0;i<l.le"
+"ngth;i++){t=l[i];if(t&&t._c=='s_l'&&t.tagContainerName==n){s.voa(t);if(t.lmq)for(i=0;i<t.lmq.length;i++){x=t.lmq[i];y='m_'+x.n;if(!s[y]&&!s[y+'_c']){s[y]=t[y];s[y+'_c']=t[y+'_c']}s.loadModule(x.n,x"
+".u,x.d)}if(t.ml)for(x in t.ml)if(s[x]){y=s[x];x=t.ml[x];for(i in x)if(!Object.prototype[i]){if(typeof(x[i])!='function'||(''+x[i]).indexOf('s_c_il')<0)y[i]=x[i]}}if(t.mmq)for(i=0;i<t.mmq.length;i++"
+"){x=t.mmq[i];if(s[x.m]){y=s[x.m];if(y[x.f]&&typeof(y[x.f])=='function'){if(x.a)y[x.f].apply(y,x.a);else y[x.f].apply(y)}}}if(t.tq)for(i=0;i<t.tq.length;i++)s.t(t.tq[i]);t.s=s;return}}};s.wd=window;"
+"s.ssl=(s.wd.location.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n."
+"userAgent;s.ns6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Inte"
+"rnet Explorer');s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s."
+"apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharC"
+"ode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.sa(un);s.vl_l='supplementalDataID,timestamp,dynamicVariablePrefix,visitorID,marketingCloudVisitorID,analyticsVi"
+"sitorID,audienceManagerLocationHint,fid,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServerSecure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pageURL,"
+"referrer,contextData,currencyCode,lightProfileID,lightStoreForSeconds,lightIncrementBy,retrieveLightProfiles,deleteLightProfiles,retrieveLightData';s.va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='timestamp"
+",charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,contextData,lightProfileID,lightStoreForSeconds,lightIncrementBy';s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID"
+",purchaseID,campaign,state,zip,events,events2,products,audienceManagerBlob,authState,linkName,linkType';var n;for(n=1;n<=75;n++){s.vl_t+=',prop'+n+',eVar'+n;s.vl_m+=',prop'+n+',eVar'+n}for(n=1;n<=5"
+";n++)s.vl_t+=',hier'+n;for(n=1;n<=3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,bro"
+"wserHeight,connectionType,homepage,pageURLRest,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableB"
+"ufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryStrin"
+"g,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,lightTrackVars,_1_referrer,un';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);s.contextD"
+"ata=new Object;s.retrieveLightData=new Object;if(!ss)s.wds();if(pg){s.wd.s_co=function(o){return o};s.wd.s_gs=function(un){s_gi(un,1,1).t()};s.wd.s_dc=function(un){s_gi(un,1).t()}}",
w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,j,x,s;if(un){un=un.toLowerCase();if(l)for(j=0;j<2;j++)for(i=0;i<l.length;i++){s=l[i];x=s._c;if((!x||x=='s_c'||(j>0&&x=='s_l'))&&(s.oun==un||(s.fs&&s.sa&&s.fs(s.oun,un)))){if(s.sa)s.sa(un);if(x=='s_c')return s}else s=0}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
w.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
+"ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
w.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
w.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");
w.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
+"=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
+"x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
w.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
w.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
+"a");
w.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
+"f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
+"'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a<5||v.indexOf('Opera')>=0||u.indexOf('Opera')>=0)c=s_ft(c);if(!s){s=new Object;if(!w.s_c_in){w.s_c_il=new Array;w.s_c_in=0}s._il=w.s_c_il;s._in=w.s_c_in;s._il[s._in]=s;w.s_c_in++;}s._c='s_c';(new Function("s","un","pg","ss",c))(s,un,pg,ss);return s}
function s_giqf(){var w=window,q=w.s_giq,i,t,s;if(q)for(i=0;i<q.length;i++){t=q[i];s=s_gi(t.oun);s.sa(t.un);s.setTagContainer(t.tagContainerName)}w.s_giq=0}s_giqf();


/*
 * A place for Tracking code when there is no other.
 */
var ND = (function(module, $, window, document) {
	
	trackWebtrendFields = function() {
		/*
         * Tracking that implement by DOM ready.
         */
        var _da = window._da;
        if(_da === undefined) {
        	return;
        }
        var trackFields = _da.trackFields;
        if(trackFields !== undefined){
            var fields = [], key;
            for(key in trackFields){
                fields.push({
                    name: key,
                    value: trackFields[key]
                });
            }

            $.publish('/analytics/field/', { field : fields });
        }
	}	
	
	module.analyticsBinder = {
			
		/*
		 * Create instance of webtrends wrapper
		 */
		bind: function() {
			$(document).ready(function(){
				
				// Localise a grabber function. Grabber function helps with content values and urls
				var grabber = ND.analytics.grabber();
				
				/*
				 * <meta name="dfy.title" content="Focus" />
				 */
				master = grabber( { meta: "meta[name='dfy.title']" } );
			
				/*
				 * Social Links
				 */
				$('.socialmedia-wrapper').delegate('.socialmedia a', 'click', function(e){
				
					var link = grabber( { link: this } ),
						data = { 
							title: 'Follow ' + master.value + ' on ' + link.value,
							uri: '/follow/' +  link.url
						};
						
					$.publish('/analytics/social/', data);
					
				});
	
				
				/*
				 * When an Overlay opens.. 
				 * It is not based on the <A> tag because overlays are a complex beast.
				 * It's based on the overlay itself regardless of what trigger the event that opened it.
				 * See Unit Tests for example variations
				 */
				$.subscribe( "overlay.done", function( e, eventData ){
					var heading, link, name, data = {}, 
						blind = true,
						excludeClass = ".country-overlay"; //exclude select country overlay.
	
					if( eventData && eventData.contents && $(excludeClass, eventData.contents).size() < 1) {
	
						//Grab content
						heading = eventData.contents ? grabber( { link: eventData.contents.find(".head h1") } ) : {};
						link = grabber( { link: eventData.anchor } )
						name = grabber( { name: eventData.name } )
						
						//If no values are usable, then we are Blind tracking this overlay
						blind = !heading.value && !link.value && !name.value && !eventData.assetid;
						
						data = { 
							title: master.value + ' | ' + (name.value || heading.value || link.value || eventData.assetid),
							uri: '/' + master.url + '/overlay/' +  (name.url || heading.url || link.url || eventData.assetid)
						};
	
						if ( blind ) {
							data = { 
								title: master.value + ' | Overlay',
								uri: '/' + master.url + '/overlay'
							};
						}
						
						$.publish('/analytics/event/', data);
					
					}
				}); 
	
				/* 
				 * TBD: RSS
				 */
				$(".rss").delegate("a", "click", function(e){
					var link = grabber( { link: this } ),
						data = { 
							title: 'RSS',
							uri: link.url
						};
	
					$.publish('/analytics/event/', data);
				});
	
				/* 
				 * AddThis: 
				 * When click on AddThis link
				 * The add this layout is insert to body by script.
				 * Create a delegate event on document.
				 */
				$(document).delegate(".at_item", "click", function(e){
					var link = grabber( { link: this } ),
						data = { 
							title: ' Send to ' + link.value,
							uri: '/share/' + link.url,
							socialId: link.value
						};
	
					$.publish('/analytics/social/', data);
	
				});
	
				/*
				 * AddThis China
				 */
				$(document).delegate(".addlist a", "click", function(e){
					var link = grabber( { link: this } ),
						data = { 
							title: ' Send to ' + link.value,
							uri: '/share/' + link.url,
							socialId: link.value
						};
	
					$.publish('/analytics/social/', data);
	
				});
	
				/* 
				 * TBD: Like button 
				 */
				/*
				$(".fb-like").mouseover(function(e){
					var target = e.target; 
					if(e.tagName == "IFRAME"){
						
					}
				})
				*/;
	
				/*
				 * TBD: Google Plus Button
				 */
				/*
				$(".addthis_button_google_plusone").mouseover(function(e){
					var target = e.target; 
					if(e.tagName == "IFRAME"){
						
					}
				});
				*/
	
				/*
				 * TBD: Form Field Drop Off
				 */
				$('#dragonflyform').delegate('.ff-track-drop-off', 'focusout', function(e) {
	
					var field = $(this),
						data = {
							field: {
								name: field.attr('name') || this.id,
								value: field.val()
							}
						};
	
					//TBD: "parameters about the prefix "DCSext.xxx"
					$.publish('/analytics/field/', data);
				});
	
				/*
				 * VOI
				 */
				$('#dragonflyform').submit(function(e){
					var $model = $("#VOI_ModelSeries_Model", form);
					var $services = $("#VOI_ModelSeries_Series", form);
	
					if(!$model.size() && !$services.size()){
						return;
					}
	
					var form = $(this),
						data = {
							field: [
								{
									name: "model",
									value: $model.val()
								},
								{
									name: "series",
									value: $services.val()
								}
							]
						};
	
					$.publish('/analytics/field/', data);
				});
	
				/*
				 * View 360 Button: 2.8.1
				 */ 
				$('.view360-button a').click(function(e){
					
					var link = grabber( { link: this } ),			
						data = { 
							title: master.value + ' | ' + link.value,
							uri: '/' + master.url + '/360-view'
						};
						
					$.publish('/analytics/event/', data);
					
				});
	
				/* 
				 * Switch(Flash): 2.8.2
				 * */ 
				$("#car-swapper a").click(function(e){
					var link = grabber( { link: this } ),
						data = { 
							title: master.value + ' | ' + link.value,
							uri: '/' + master.url + '/switch-to-super-cab'
						};
	
					$.publish('/analytics/event/', data);
				});
	
				/*
				 * Switcher(banner): 2.8.3
				 */
				$('.slider .next, .slider .prev').click(function(e){
	
					var link = grabber( { link: this } ),
						data = { 
							title: master.value + ' | ' + link.value,
							uri: '/' + master.url + '/switch-to-banner'
						};
	
					$.publish('/analytics/event/', data);
				});
				
				/*
				 */ 
				$('.download').click(function(e){
					data = { 
						title: 'this is my link',
						link: this,
						type: 'd'
					};
	
					$.publish('/analytics/link/', data);			
				});
				/*$wait(function(){
					$(".trackable,.external-disclaimer").live({mouseover:function(e){},mousedown:function(){alert("live-mousedown")}});
					//$(".trackable,.external-disclaimer").on('click',function(e){alert('on')});
				})*/
				
				//$('.trackable,.external-disclaimer').click(function(e){
				//$(document).delegate(".trackable,.external-disclaimer","click",function(e){
				//$(document).on("click",'.trackable,.external-disclaimer',function(e){
				$(".trackable,.external-disclaimer").live('mouseup',function(e){
					if($('.staging-wrap .trackable').size()>0){
						return;
					}
					//if(!e.target||!e.target.id||!e.target.tagName||e.target.tagName!='SELECT'||(e.target.id!='state'&&e.target.id!='city')) e.preventDefault();
					//if(!e.target||!e.target.tagName||e.target.tagName!='OPTION'||!e.target.parentElement||!e.target.parentElement.id||(e.target.parentElement.id!='state'&&e.target.parentElement.id!='city'))
					if(!e.target||!e.target.tagName||e.target.tagName!='OPTION'||!e.target.parentElement||!e.target.parentElement.tagName||e.target.parentElement.tagName!='SELECT')
					{
					e.preventDefault();
					}
					if(!$(this).hasClass("overlay")&&!$(this).closest("ul").hasClass("gallery")&&!$(this).hasClass("service-booking-overlay")&&!$(this).hasClass("open-video-flip") && !$(this).hasClass("collapse-btn")&&!$(this).hasClass("save-dealer-btn")&&!$(this).hasClass("bing-directions")&&!$(this).hasClass("filter-toggler")&&!$(this).hasClass("viewSaved")&&!$(this).hasClass("accordion-next")&&!$(this).hasClass("open-vid")&&!$(this).hasClass("open-modal")&&!$(this).hasClass("save-continue")&&!$(this).hasClass("pdf-btn")&&!$(this).hasClass("finish-btn")&&!$(this).hasClass("tab-area")&&!$(this).closest(".predelivery-new")){
						$(this).trigger('click');
					}
					var $link = $(this);
					var img, name, type, onclick, trigger = false, nameplate, leadtype, tool, events, year, pname,intcmp,hier,tooldesc,content,freq,moduletype,modulename,moduleaction;
					//link has omniture tracking data, capture the data and publish to pubsub
					if ((name = $link.attr('data-name')) && 
						(type = $link.attr('data-type'))) {
						onclick = $link.attr("data-onclicks");
						nameplate = $link.attr("data-nameplate");
						year = $link.attr("data-nameplate-year");
						leadtype = $link.attr("data-leadtype");
						tool = $link.attr("data-tool");
						tooldesc = $link.attr("data-tooldesc");
						events = $link.attr("data-events");
						pname = $link.attr("data-pname");
						intcmp = $link.attr("data-intcmp");
						hier = $link.attr("data-hier"); 
						content = $link.attr("data-content"); 
						freq = $link.attr("data-freq"); 
						moduletype = $link.attr("data-moduletype");
						modulename = $link.attr("data-modulename");
						
					} 
					//look for images inside the link, if the img has any omniture tracking data, publish to pubsub
					else if ((img = $link.find('img').first()) &&
								(name = img.attr('data-name')) && 
								(type = img.attr('data-type'))){
						onclick = img.attr("data-onclicks");
						nameplate = img.attr("data-nameplate");
						year = img.attr("data-nameplate-year");
						leadtype = img.attr("data-leadtype");
						tool = img.attr("data-tool");
						tooldesc = img.attr("data-tooldesc");
						events = img.attr("data-events");
						pname = img.attr("data-pname");
						intcmp = img.attr("data-intcmp");
						hier = img.attr("data-hier"); 
						content = img.attr("data-content"); 
						freq = img.attr("data-freq"); 
						moduletype = $link.attr("data-moduletype");
						modulename = $link.attr("data-modulename");
						
					}
					
					//check the type
					if ($link.hasClass('external-disclaimer')) { type = 'e'};
					//if name not set by data-name attribute, get the link name
					if (!name) {
						var link = grabber( { link: this } )
						name = link.value;
					}
					//check personalisation click
					if (!($(this).hasClass("open-video-flip")) && ($link.closest("section").hasClass('personalisation') || $link.closest("section").hasClass('smartnextsteps'))){						
						moduleaction = 'click';
					}
					//gux Popular Accessories /Get to Know Your Vehicles			
					if ($link.closest("section").data('psn-module')=='knowvehicle' || $link.closest("section").data('psn-module')=='accessories'){						
						if(typeof $.cookie('dfy.u') !== "undefined" && typeof $.cookie('dfy.u') !== "function") {
							cookieUser = JSON.parse($.cookie('dfy.u'));
						}
						if (cookieUser != null) {
							modulename = cookieUser.now;
						 }
					}
					
					//moduleaction
					$.publish('/analytics/link/', { 
						title: name,
						link: this,
						type: type,
						onclicks: onclick,
						leadtype: leadtype,
						tool: tool,
						tooldesc: tooldesc,
						events: events,
						year: year,
						nameplate: nameplate,
						pname: pname,
						intcmp: intcmp,
						hier1:hier,
						content:content,
						freq:freq,
						moduletype:moduletype,
					    modulename:modulename,
					    moduleaction:moduleaction
					});	
				
				});
				
				// add omniture on gux billboard next/prev,billboard bullet
				$(".billboard  .flex-next,.billboard .flex-prev,.billboard .flex-control-paging a").live("click",function(e){					
					var $link = $(this);
					if(typeof _da!=="undefined" && _da.om.mobileApp==true &&($(this).hasClass("flex-prev")||$(this).hasClass("flex-next"))) return;
					var name,onclicks,modulename,moduletype;
					var $section = $link.closest("section");
					name = $section.data('name');
					onclicks = $section.data('onclicks');
					modulename = $section.data('modulename');
					moduletype = $section.data('moduletype');
					//moduleaction
					$.publish('/analytics/link/', { 
						title: name,
						link: this,
						type: "o",
						onclicks: onclicks,
						moduletype: modulename,
					    modulename: moduletype,
					    moduleaction:"click"
					});	
				});				
				//gux dealer omniture
				$(".view-all-dealers",$("section.dealer-locator")).live("mouseup",function(e){
					e.preventDefault();
					$(this).trigger('click');
					if (window._da && window._da.om && ND && ND.omniture) {
						_da.funnel.stepname='results';
						_da.events = "event1,event43".split(',');	
						_da.dealer = {};
					}
				});
				
				$.subscribe('dealers-done', (function(){
					if (window._da && window._da.om && ND && ND.omniture) {
						_da.funnel.stepname='results';
						_da.events = "event1,event43".split(',');	
						_da.dealer = {};						
						var totalNum = $('.dealer-result-container .count .num').text();
						if(totalNum){
							var totalResult = Number(totalNum);
							var perPage = 5;
							var totalPage = Math.floor((totalResult + perPage - 1 ) / perPage);
							var postcode = $('.dealer-result-container .result-list .dealer-result:first-child').data("postcode");
							_da.region = postcode;
							ND.analyticsTag.trackOmniturePage({
								tool:'event:find dealer',
								tooldesc:'find dealer:1 of '+totalPage
							});	
						}
						//only track once
						$.unsubscribe('dealers-done');
					}
				}));
				
				$("section.dealer-locator .dealer-result .dealer-heading a,section.dealer-locator .dealer-result .details").live("click",function(e){					
					var dealerId = $(this).closest(".dealer-result").data("dealerid");
					var postcode = $(this).closest(".dealer-result").data("postcode");
					if (window._da && window._da.om && ND && ND.omniture) {
						_da.funnel.stepname='dealer:info';
						_da.events = '';
						_da.dealer = {code:dealerId};
						_da.region = postcode;
						ND.analyticsTag.trackOmniturePage();
					}
				});
				//add ominture on per 360 movement
				$("#overlay .vr-container .360trackable").live("slide",function(e){
					if($('.staging-wrap .trackable').size()>0){
						return;
					}
					e.preventDefault();
					$(this).trigger('click');
					var $link = $(this);
					var img, name, type, onclick, trigger = false, nameplate, leadtype, tool, events, year, pname,intcmp,hier,tooldesc,content,freq;
					//link has omniture tracking data, capture the data and publish to pubsub
					if ((name = $link.attr('data-name')) && 
						(type = $link.attr('data-type'))) {
						onclick = $link.attr("data-onclicks");
						nameplate = $link.attr("data-nameplate");
						year = $link.attr("data-nameplate-year");
						leadtype = $link.attr("data-leadtype");
						tool = $link.attr("data-tool");
						tooldesc = $link.attr("data-tooldesc");
						events = $link.attr("data-events");
						pname = $link.attr("data-pname");
						intcmp = $link.attr("data-intcmp");
						hier = $link.attr("data-hier"); 
						content = $link.attr("data-content"); 
						freq = $link.attr("data-freq"); 
						
					} 
					//look for images inside the link, if the img has any omniture tracking data, publish to pubsub
					else if ((img = $link.find('img').first()) &&
								(name = img.attr('data-name')) && 
								(type = img.attr('data-type'))){
						onclick = img.attr("data-onclicks");
						nameplate = img.attr("data-nameplate");
						year = img.attr("data-nameplate-year");
						leadtype = img.attr("data-leadtype");
						tool = img.attr("data-tool");
						tooldesc = img.attr("data-tooldesc");
						events = img.attr("data-events");
						pname = img.attr("data-pname");
						intcmp = img.attr("data-intcmp");
						hier = img.attr("data-hier"); 
						content = img.attr("data-content"); 
						freq = img.attr("data-freq");
					}
					
					//check the type
					if ($link.hasClass('external-disclaimer')) { type = 'e'};
					//if name not set by data-name attribute, get the link name
					if (!name) {
						var link = grabber( { link: this } )
						name = link.value;
					}
					$.publish('/analytics/link/', { 
						title: name,
						link: this,
						type: type,
						onclicks: onclick,
						leadtype: leadtype,
						tool: tool,
						tooldesc: tooldesc,
						events: events,
						year: year,
						nameplate: nameplate,
						pname: pname,
						intcmp: intcmp,
						hier1:hier,
						content:content,
						freq:freq
					});
					$("#overlay .vr-container .360trackable").die("slide");//only need to trigger once
				})
				
				// predelivery phase 3 personalisation omniture
				var personalisationTrack = function(){
					var $panel = $(this).closest(".panel");
					var name,onclicks,pname;
					name = $panel.data('name');
					onclicks = $panel.data('onclicks');
					pname = $panel.data('pname');
					
					$.publish('/analytics/link/', { 
						title: name,
						link: this,
						type: "o",
						onclicks: onclicks,
					    pname: pname,
					    moduleaction:"click",
					    freq: "category"
					});	
				}
				
				$(".predelivery-new .last-step .panel").on("click","input,select,textarea", personalisationTrack);		
				
				//This solution should fire the ambient lighting omniture. This bypasses the return false that is triggered by the color link event listener
				$(".predelivery-new .last-step .color-palette a").on("click", personalisationTrack);		
				
				/* for B515 experience tracking */
				$('.staging-wrap .trackable, .staging-wrap .external-disclaimer').live("click",function(e){
					var $link = $(this);
					var img, name, type, onclick, trigger = false, nameplate, leadtype, tool, events, year, pname,intcmp,hier,tooldesc;
					//link has omniture tracking data, capture the data and publish to pubsub
					if ((name = $link.attr('data-name')) && 
						(type = $link.attr('data-type'))) {
						onclick = $link.attr("data-onclicks");
						nameplate = $link.attr("data-nameplate");
						year = $link.attr("data-nameplate-year");
						leadtype = $link.attr("data-leadtype");
						tool = $link.attr("data-tool");
						tooldesc = $link.attr("data-tooldesc");
						events = $link.attr("data-events");
						pname = $link.attr("data-pname");
						intcmp = $link.attr("data-intcmp");
						hier = $link.attr("data-hier"); 
					} 
					//look for images inside the link, if the img has any omniture tracking data, publish to pubsub
					else if ((img = $link.find('img').first()) &&
								(name = img.attr('data-name')) && 
								(type = img.attr('data-type'))){
						onclick = img.attr("data-onclicks");
						nameplate = img.attr("data-nameplate");
						year = img.attr("data-nameplate-year");
						leadtype = img.attr("data-leadtype");
						tool = img.attr("data-tool");
						tooldesc = img.attr("data-tooldesc");
						events = img.attr("data-events");
						pname = img.attr("data-pname");
						intcmp = img.attr("data-intcmp");
						hier = $link.attr("data-hier"); 
					}
					
					//check the type
					if ($link.hasClass('external-disclaimer')) { type = 'e'};
					//if name not set by data-name attribute, get the link name
					if (!name) {
						var link = grabber( { link: this } )
						name = link.value;
					}
					$.publish('/analytics/link/', { 
						title: name,
						link: this,
						type: type,
						onclicks: onclick,
						leadtype: leadtype,
						tool: tool,
						tooldesc: tooldesc,
						events: events,
						year: year,
						nameplate: nameplate,
						pname: pname,
						intcmp: intcmp,
						hier1:hier
					});	
					
				});
	
		        /*
		         * Email tracking: Email Link Tracking Handler
		         * Attach an event (on click) to all emailto links. [ Design P12 ]
		        */
		        var mailHandler = function(e){
		            var anchorHref = e.target.href || '';
		                anchorFormat = anchorHref.toLowerCase();
	
		            if(anchorHref && anchorFormat.indexOf("mailto:") > -1){
		                anchorFormat = anchorFormat.replace(/[^\w]+/g, '-');
		                var data = { 
		                        title: anchorHref + ' | Email',
		                        uri: '/' + master.url + '/email/' + anchorFormat
		                    };
	
		                $.publish('/analytics/event/', data);
		            }
		        };
	
		        /*
		         * External dealer website tracking:
		         * Attach an event to all external links(click out). [ Design P12 ]
		        */
		        var externalHandler = function(e){
		            var anchor = e.target, anchorClass = anchor.className;
	
		            //There will be 2 case: 1) It's in the external-disclaimer overlay. 2) It's an external link whout popup overlay
		            if(anchorClass && typeof(anchorClass)==="string" &&
		                (anchorClass.indexOf("external") > -1 || anchorClass.indexOf("external-disclaimer ") > -1)){
	
		                var href = $(anchor).attr("href"),
		                	hrefFormat ="";
		                if(typeof(href)!="undefined"){
		                	hrefFormat = href.replace(/[^\w]+/g, '-');
		                }
		                var data = {
		                        title: "Offsite:" + href,
		                        uri: '/' + master.url + '/external/' + hrefFormat
		                    };
	
		                $.publish('/analytics/event/', data);
		            }
		        };
	
		        //Handles all Omniture tracking links in an overlay
		        var trackingHandler = function(e) {
		        	var anchor = e.target, anchorClass = anchor.className;
	
		            //fullscreen button
					 if(anchorClass && typeof(anchorClass)==="string" && anchorClass.indexOf("btn-fullscreen") > -1) {
		            	//gallery view full screen button
		        		var linkName = s.eVar11 + ':full screen' //link name from a page name
		        		$.publish('/analytics/link/', { 
		        			title: linkName,
		        			link: this,
		        			type: 'o',
		        			onclicks: 'view full screen'
		        		});		
		        	}
		        }
		        
		        if ((_da.nameplate !== undefined && _da.nameplate.id !== undefined) || 
		        	(_da.derivative !== undefined && _da.derivative.id !== undefined)) {
		        	//delegate to context
		        	ND.Context.addContextToLinks();
		        } 
		        	
	
		        /*
		         * Global Click Tracking Listener
		         * One event listener intead of binding on every link, 
		         * In order to let it work on dynamic anchors that injected by Javascript.
		         */
		        $(document).bind("click", "a", function(e){
		        	//some listener may prevent/cancel the event listener.
		            if(e && e.target){
		                externalHandler(e);
		                mailHandler(e);
		                trackingHandler(e);
		            }
		        });
		        
		        trackWebtrendFields();
		        
			})
		}			
	}
	
	return module;
	
	
}(window.ND || {}, jQuery, window, document));


/*
Author: 		Randell Quitain
File name: 		personalisation.js
Description: 	Check auth status and setup cookies
Dependencies: 	jQuery, jQuery.cookie, jquery.tinypubsub, FPS
Usage: 			
*/

var guxPersonalisation = guxPersonalisation || {};

(function($){
	guxPersonalisation.psn = {
		uuid: {},
		profile: {},
		init: function(){

			/*
			Test UserCookie
			$.cookie('dfy.u', '{"fn":"John","now":"Mustang","s":"OW","authid":"311982","authby":"005","pcode":"MUSTANG","pc":"3000"}');
			*/

			var success, error;

			// subscribe to profile-done
			$.subscribe('profile-done', (function(){
				if(typeof guxPersonalisation.components !== "undefined") {
					// console.log('Start all components.');
					guxPersonalisation.components.execute();
				}
			}));

			// when FPS success
			success = function (value, status, jqXHR) {
				guxPersonalisation.psn.setProfile(value);
			};

			// when FPS fail
			error = function (value, status, jqXHR) {
				// console.log("FPS isn't loaded, dfy.p value based on FPS will not be updated.");
				// guxPersonalisation.psn.setProfile();
				return;
			};

			// check is FPS is available
			if(typeof FPS !== "undefined") {
				FPS.get([{ 'KBA': {} }, { 'LastViewedVehicle': {} }, { 'RecentlyViewedVehicles': {} }, { 'PreferredDealer': {} }], { success: success, error: error });
			} else {
				// console.log("FPS does not exist, dfy.p value based on FPS will not be updated.");
				// guxPersonalisation.psn.setProfile();
				return;
			}

			// $(window).on('resize',function(){
			// 	guxPersonalisation.psn.init();
			// });

		},
		setUUID: function(){
			if (!$.cookie('dfy.uuid')) {
				if (typeof uuid !== "undefined"){
					var configInfo = guxPersonalisation.psn.commonConfig(),
						cookieDomain = window.location.host;
					if(configInfo !== null && configInfo.cookieDomain) {
						cookieDomain = configInfo.cookieDomain;
					}
					// temporary adobe id
					guxPersonalisation.psn.uuid = { "id": uuid.v1() };
					// expiration: 5 years
					$.cookie('dfy.uuid', JSON.stringify(guxPersonalisation.psn.uuid), { expires: 1825, path: '/', domain: cookieDomain });
				}
			} else {
				guxPersonalisation.psn.uuid = $.parseJSON( JSON.stringify($.cookie('dfy.uuid')) );
			}
		},
		setProfile: function(data){
			// check if sessionStorage is supported
			if(typeof sessionStorage !== "undefined") {
				if (sessionStorage.getItem("dfy.p") === null) {
					sessionStorage.setItem("dfy.p", JSON.stringify(this.fillProfile(data)));
					// create adobeid on first visit
					guxPersonalisation.psn.setUUID();
				} else {
					// check/update  = $.parseJSON( JSON.stringify($.cookie('dfy.uuid')) );
					guxPersonalisation.psn.setUUID();
					sessionStorage.setItem("dfy.p", JSON.stringify(this.fillProfile(data)));
				}
			} else {
				// if sessionStorage is not supported - create cookie
				if (!$.cookie('dfy.p')) {
					var configInfo = guxPersonalisation.psn.commonConfig(),
						cookieDomain = window.location.host;
					if(configInfo !== null && configInfo.cookieDomain) {
						cookieDomain = configInfo.cookieDomain;
					}
					$.cookie('dfy.p', JSON.stringify(this.fillProfile(data)), { path: '/', domain: cookieDomain });
					// create adobeid on first visit
					guxPersonalisation.psn.setUUID();
				} else {
					// check/update  = $.parseJSON( JSON.stringify($.cookie('dfy.uuid')) );
					guxPersonalisation.psn.setUUID();
					$.cookie('dfy.p', JSON.stringify(this.fillProfile(data)), { path: '/', domain: cookieDomain });
				}
			}
		},
		fillProfile: function(value) {

			// standalone check if object is empty
			function isEmpty(obj) {
				for(var prop in obj) {
					if(obj.hasOwnProperty(prop)){ return false; }
				}
				return true;
			}

			// sort via "on"
			function sortOnDesc(arr) {
				var data = arr.sort(function(a, b) {
					var _a = a.on, _b = b.on;
					return _a <= _b ? -1 : 1;
				});
				return data.reverse();
			}

			// parse cookies/common-config
			var configInfo = guxPersonalisation.psn.commonConfig(),
				cookieUUID = null,
				cookieUser = null,
				cookieDL = null;

			if($.cookie('dfy.uuid')) {
				cookieUUID = $.parseJSON( $.cookie('dfy.uuid') );
			}
			
			if($.cookie('dfy.u')) {
				cookieUser = $.parseJSON( $.cookie('dfy.u') );
			}

			if($.cookie('dfy.dl')) {
				cookieDL = $.cookie('dfy.dl');
			}

			// FPS based values
			var noi = "NoVehicle",
				kba = "",
				f = "", 
				rvv = [],
				dc = (cookieDL != null) ? cookieDL : "";
				
			// set FPS values
			if(typeof value !== "undefined" && value !== null && !isEmpty(value)) {

				// console.group('FPS data:');
				// console.log(value);

				var kbas = value[0]['KBA'],
					lastViewedVehicle = value[1]['LastViewedVehicle'],
					recentlyViewedVehicles = value[2]['RecentlyViewedVehicles'],
					preferredDealer = value[3]['PreferredDealer'];

				if(typeof kbas !== "undefined" && !isEmpty(kbas)) {
					kba = "#";
					for (var key in kbas) {
						if (kbas.hasOwnProperty(key)) {
							kba += kbas[key]._KBA + "#";
						}
					}
				}

				/* buggy */
				// if(typeof lastViewedVehicle != "undefined" && lastViewedVehicle != null && !isEmpty(lastViewedVehicle)) {
				// 	noi = lastViewedVehicle[0]._nameplate.split(':')[1];
				// }

				if(typeof recentlyViewedVehicles !== "undefined" && !isEmpty(recentlyViewedVehicles)) {
					// sort to recently viewed - temporary lastViewedVehicle
					var lastViewedVehicle = sortOnDesc(recentlyViewedVehicles);
					noi = lastViewedVehicle[0]._nameplate.split(':')[1];
					for (var key in recentlyViewedVehicles) {
						if (recentlyViewedVehicles.hasOwnProperty(key)) {
							rvv.push({ "_nameplate": recentlyViewedVehicles[key]._nameplate });
						}
					}
					rvv = JSON.stringify(rvv);
				}

				if(typeof preferredDealer !== "undefined" && !isEmpty(preferredDealer)) {
					// sort to preferred dealer
					var preferredDealer = sortOnDesc(preferredDealer);
					// override dfy.d value if FPS is available
					dc = preferredDealer[0]._paCode;
				}
			}
			
			// check tools
			var tools = "";

			// define initial value
			var authState = "",
				now = "",
				id = (cookieUUID) ? cookieUUID.id : "",
				authid = "", /*TBD - based on dfy.p*/
				fn = "";

			//console.log(sessionStorage.getItem("dfy.p"));
			// set values depending on authState
			if(this.viewport() === "mobile"){
				if (cookieUser !== null) {
					authState = cookieUser.s;
					now = cookieUser.now;
					authid = cookieUser.authid;
					fn = cookieUser.fn;
				} else if (cookieUUID === null) {
					authState = "FS";
					// assign tools depending on authState
					if(configInfo != null && configInfo.smobFsTools) {
						tools = configInfo.smobFsTools;
					}
				} else if (cookieUUID != null && cookieUser === null) {
					authState = "AN";
					// assign tools depending on authState
					if(configInfo != null && configInfo.smobAnTools) {
						tools = configInfo.smobAnTools;
					}
				}
			} else {
				if (cookieUser !== null) {
					authState = cookieUser.s;
					now = cookieUser.now;
					authid = cookieUser.authid;
					fn = cookieUser.fn;
				} else if (cookieUUID === null) {
					authState = "FS";
					// assign tools depending on authState
					if(configInfo != null && configInfo.fsTools) {
						tools = configInfo.fsTools;
					}
				} else if (cookieUUID != null && cookieUser === null) {
					authState = "AN";
					// assign tools depending on authState
					if(configInfo != null && configInfo.anTools) {
						tools = configInfo.anTools;
					}
				}
			}
			// set profile
			guxPersonalisation.psn.profile = {
				"authState"	: 	authState,
				"now"		: 	now,
				"noi"		: 	noi, 
				"id"		: 	id, 
				"authid"	:  	authid,
				"tools"		:  	tools, 
				"kba"		:  	kba,
				"fn"		:  	fn, 
				"f"			:   f,
				"rvv"		:  	rvv,
				"dc"		:  	dc
			}
			
			// profile cookie/session creation done
			$.publish('profile-done');
			

			return guxPersonalisation.psn.profile;
		},
		commonConfig: function() {
			// standalone check #common-config
			if ($('#common-config').length) {
				return $('#common-config').embeddedData();
			} else {
				return null;
			}
		},
		viewport: function() {
			var view = "";
			if ($(window).width() < 768){
				this.view = "mobile";
			}
			else {
				this.view = "tablet";
			}
			return view;
		}
	}

	$(function(){
		guxPersonalisation.psn.init();
	});

})(jQuery);


(function(){
	var ND = window.ND = window.ND || {};
			
	var fps = ND.fps = {
					
		_init: function( _fpstag ) {
			this._fpstag = _fpstag;			

		},
		
		// store links
		pageClicks : {},
		
		
		/*
		 * Track Page Views. 
		 */			
		trackPageView: function( params ) {			
			// if function is to be implemented, it will be the same as trackLink, so
			// console.log('Tracking FPS trackPageView');
			fps.trackFps(params);
		},
		
		trackLink: function( params ) {
			// console.log('Tracking FPS trackLink');
			//TODO
			//function executed when a trackable link is clicked
			// this function should track information to FPS The code should
			// call trackFps function (as links and pages are to be tracked in
			// the same way). What might differ might be a parameter format
			fps.trackFps(params);
		},
		
		

		trackFps:  function(params) {	
			// console.log('Tracking FPS');
			var kbaEvents = '';
			var setViewedVehicle = {};
			var setDelear = {};
			var setKBA = {};
			var setTool = {};
			var setAnonymous = {};
			var setOwner = {};
			var setKBARTDC = {};
			var setKBABRQC = {};
			var setKBABAPC = {};
			var setKBARAQC = {};
						
						
			var derivativeName = '';
			var derivativeID = '';
			var nameplateBrand = '';
			var nameplateYear = '';
			var nameplateName = '';
			var nameplateID = '';
			
			var bolSetFPS = false;
			
			
			// console.log('params = ' + params );
			if(typeof params !== 'undefined') {
				// console.log('params.nameplate = ' + params.nameplate );
			}
			
			if (typeof params !== 'undefined' && typeof params.nameplate !== 'undefined' ) {//'params contains nameplate information or other information relevant for FPS') {
	
				if(typeof _da !== 'undefined' && typeof _da.nameplate !== 'undefined') {
					
					
					if(params.nameplate == _da.nameplate.name) {												
						
						if(typeof _da.om.site !== 'undefined' ) {
							nameplateBrand =  _da.om.site;
						}
						
						if(typeof _da.nameplate !== 'undefined') {
							
							if(typeof _da.nameplate.name !== 'undefined') {
								nameplateName = _da.nameplate.name;
							}
							
							if(typeof _da.nameplate.id !== 'undefined') {
								nameplateID = _da.nameplate.id;
							}
							
							if(typeof _da.nameplate.year !== 'undefined' ) {
								nameplateYear =  _da.nameplate.year;
							}

						}
						
						if(typeof _da.der !== 'undefined') {
							
							if(typeof _da.der.name !== 'undefined') {
								derivativeName = _da.der.name;
							}
							
							if(typeof _da.der.id !== 'undefined') {
								derivativeID = _da.der.id;
							}

						}
						
											
						if(nameplateName != '') {
							   // console.log('FPS Set ViewedVehicle via Params');
							   setViewedVehicle = { 'ViewedVehicle': { _year: nameplateYear, _brand: nameplateBrand , _nameplate: nameplateID + ':' + nameplateName, _trim: derivativeID + ':' + derivativeName, _interior: '' , _exterior: '' }, metadata: { active: 'true' } }
							   bolSetFPS = true;
						}
					
					}
				}
	
			} else {
					
				if(typeof _da !== 'undefined') {
													
					if(typeof _da.om.site !== 'undefined' ) {
						nameplateBrand =  _da.om.site;
					}
					
					if(typeof _da.nameplate !== 'undefined') {
						
						if(typeof _da.nameplate.name !== 'undefined') {
							nameplateName = _da.nameplate.name;
						}
						
						if(typeof _da.nameplate.id !== 'undefined') {
							nameplateID = _da.nameplate.id;
						}
						
						if(typeof _da.nameplate.year !== 'undefined' ) {
							nameplateYear =  _da.nameplate.year;
						}

					}
					
					if(typeof _da.der !== 'undefined') {
						
						if(typeof _da.der.name !== 'undefined') {
							derivativeName = _da.der.name;
						}
						
						if(typeof _da.der.id !== 'undefined') {
							derivativeID = _da.der.id;
						}

					}
					
					// console.log('Nameplate = ' + nameplateName );
										
					if(nameplateName != '') {
						   // console.log('FPS Set ViewedVehicle via _da');
						   setViewedVehicle = { 'ViewedVehicle': { _year: nameplateYear, _brand: nameplateBrand , _nameplate: nameplateID + ':' + nameplateName, _trim: derivativeID + ':' + derivativeName, _interior: '' , _exterior: '' }, metadata: { active: 'true'} }
						   bolSetFPS = true;
					}

				}
			}

		
		
			if (typeof _da.events !== 'undefined') {				
				var currentEvent;
							
				
				if(typeof guxPersonalisation !== 'undefined' ) {
					
					if(typeof guxPersonalisation.psn.profile.kba !== 'undefined') {
						kbaEvents = guxPersonalisation.psn.profile.kba;
					}
				}

				
				for (var i = 0; i < _da.events.length; i++) {
				
					currentEvent = _da.events[i];
					
					if(currentEvent == 'event2') {
						
						if(kbaEvents.search('BAPC') == -1) {
						     // console.log('FPS Set KBAEvent BAPC');
							setKBABAPC = {'KBAEvent': {_KBA: 'BAPC'}, metadata: { active: 'true' } };
							bolSetFPS = true;
						}
					}

					if(currentEvent == 'event3') {
						
						if(kbaEvents.search('RAQC') == -1) {
						     // console.log('FPS Set KBAEvent RAQC');
							setKBARAQC = {'KBAEvent': {_KBA: 'RAQC'}, metadata: { active: 'true' } };
							bolSetFPS = true;
						}
					}
					
					if(currentEvent == 'event15') {
						if(kbaEvents.search('BRQC') == -1) {
							// console.log('FPS Set KBAEvent BRQC');
							setKBABRQC = {'KBAEvent': {_KBA: 'BRQC'}, metadata: { active: 'true' } };
							bolSetFPS = true;
						}
					}

					if(currentEvent == 'event20') {
						if(kbaEvents.search('RTDC') == -1) {
							// console.log('FPS Set KBAEvent RTDC');
							setKBARTDC = {'KBAEvent': {_KBA: 'RTDC'}, metadata: { active: 'true' } };
							bolSetFPS = true;
						}
					}					
					
				}
				

			}			

			
			if(typeof guxPersonalisation !== 'undefined' ) {
				
				
				if(typeof guxPersonalisation.psn.profile.authid !== 'undefined') {
					
					setOwner = {'ExternalRef': {_type: 'DFL', _id: guxPersonalisation.psn.profile.authid}, metadata: { active: 'true' } };
					bolSetFPS = true;
				}
				
				if(typeof guxPersonalisation.psn.profile.id !== 'undefined') {

					setAnonymous = {'ExternalRef': {_type: 'DFLA', _id: guxPersonalisation.psn.profile.id}, metadata: { active: 'true' } };
					bolSetFPS = true;
				}
				
				
			}			
			
			if(typeof FPS !== 'undefined') {
				
				if(bolSetFPS) {
					// Set all at once to minimized network connection
					FPS.set([ setViewedVehicle, setKBABAPC, setKBABRQC, setKBARTDC, setKBARAQC, setOwner, setAnonymous  ]);
				}

			
			}

		},
		
		trackEvent: function( params ) {
			// console.log('FPS Tracking Event');
			//TODO track favouriting dealer here and other 
			if (params.type == 'fav-dealer') {
				if(typeof FPS !== 'undefined') {
					FPS.set([ { 'PreferredDealer': { _paCode: params.code }, metadata: { active: 'true' } }]);
				}
			} else if (params.type == 'specified postcode') {
				//FPS.set( ... );
			} //else if {
				//TODO add all types here
			//}
		},
		trackSocial: function( params ) {
			// empty not needed at the current state, left here for
			// compatibility and future extensions reasons
		},			
		trackField: function( params ) {
			// empty not needed at the current state, left here for
			// compatibility and future extensions reasons
		},
		preCollection: function( options, params) {
			//this functional is called before tracking call is made.
			//TODO place here any code which has to happen before page track is made. like reading cookies or DOM metadata

		}

	};

})();


(function(){
	var ND = window.ND = window.ND || {};
	
	var omniture = ND.omniture = {
					
		_init: function( _omtag ) {
			this._omtag = _omtag;
		},
		
		// store links
		pageClicks : {},
		//store module component types
		moduleTypes : {},
		
		/*
		 * Track Page Views. 
		 */			
		trackPageView: function( params ) {
			//empty not needed at the current state, left here for compatibility reasons
			if (typeof params.login !== 'undefined') {
				s.eVar42 = 'x';
			}

		},
		createHier1 : function( hier1 ){
			if (typeof hier1 !== 'undefined') {
				s.hier1 = hier1;
			} else {
				s.hier1 = _da.hier;
			}
			
			if (typeof _da.nameplate !== 'undefined') {
				s.hier1 = s.hier1 + ':' + _da.nameplate.year + ':' + _da.nameplate.cat + ':' + _da.nameplate.name;
			}
		},
		createPageName : function( param ){
			if (typeof param !== 'undefined' && param !== '') {
				s.pageName = s.eVar11 = s.prop11 = param;
			} else {
				s.pageName = s.eVar11 = s.prop11 = _da.pname;
			}
			if (_da.funnel.stepname) {
				s.pageName = s.pageName + ':' + _da.funnel.stepname;
				s.eVar11 = s.eVar11 + ':' + _da.funnel.stepname;
				s.prop11 = s.prop11 + ':' + _da.funnel.stepname;
			}
			//lincoln2014 site search
			if (_da.pagenumber) {
				s.pageName = s.pageName + _da.pagenumber;
				s.eVar11 = s.eVar11 + _da.pagenumber;
				s.prop11 = s.prop11 + _da.pagenumber;
			}
			//sync omniture
			if (typeof _da.sync!== 'undefined'){
				if (typeof _da.sync.version  !== 'undefined') {
					s.pageName = s.pageName + ':' + _da.sync.version;
					s.eVar11 = s.eVar11 + ':' + _da.sync.version;
					s.prop11 = s.prop11 + ':' + _da.sync.version;
				}
			}
			if (typeof _da.prefix !== 'undefined') {	//set for prefix
				s.pageName = _da.prefix  + ':' + s.pageName;
				s.eVar11 = _da.prefix  + ':' + s.eVar11;
				s.prop11 = _da.prefix  + ':' + s.prop11 ;
			}
			if (typeof _da.nameplate !== 'undefined') {	//set for nameplate based templates only
				s.pageName = s.pageName + ':' + _da.nameplate.name;
			}
			
			//add radui ominture tag
			if (typeof _da.radui !== 'undefined'){
				var raduiTag=_da.radui,windowWidth=$(window).width();
				raduiTag=raduiTag.split("|");
				if (windowWidth > 976) {
					//desktop
					s.prop54 =s.eVar54=raduiTag[0]+raduiTag[1];
				} else if (windowWidth < 977 && windowWidth > 767) {
					//tablet
					s.prop54=s.eVar54=raduiTag[0]+raduiTag[2];
				} else if (windowWidth < 768) {
					//smobile
					s.prop54 =s.eVar54=raduiTag[0]+raduiTag[3];
				}
			}

		},
		
		setRegion: function() {
			if (typeof _da.region !== 'undefined') {
				s.prop2 = s.eVar2 = _da.region;
			} else {
				s.prop2 = s.eVar2 = undefined;
			}
		},
		
		trackDerivativeDetails: function() {
			//v18	"Body Model,Trim"
			//v19	"Ext:Int Color Code"
			//v20	Accessories Picked
			//v21	Veh. Options Picked	
			//v23	"Option	Pkgs Picked"
			//v24	"Engine: Trans"
			//v25 	Price
			s.eVar18 = s.eVar19 = s.eVar20 = s.eVar21 = s.eVar23 = s.eVar24 = s.eVar25 = undefined;
			if (typeof _da.der  !== 'undefined') {
				if (typeof _da.der.name !== 'undefined') {
					s.eVar18 = _da.der.name;
				} 
				if (typeof _da.der.colour !== 'undefined' && typeof _da.der.trim !== 'undefined') {
					s.eVar19 = _da.der.colour + ':' + _da.der.trim;
				} 
				if (typeof _da.der.features !== 'undefined') {
					s.eVar20 = _da.der.features;
				}
				if (typeof _da.der.options !== 'undefined') {
					s.eVar21 = _da.der.options;
				}
				if (typeof _da.der.optionpacks !== 'undefined') {
					s.eVar23 = _da.der.optionpacks;
				} 
				if (typeof _da.der.engine  !== 'undefined') {
					s.eVar24 = _da.der.engine;
				}
				if (typeof _da.der.price   !== 'undefined') {
					s.eVar25 = _da.der.price;
				}
			} 
		},
		
		trackLink: function( params ) {
			if (params === undefined) {
				return;
			}
			//need to also set channel here...there is a case in
			//build and price where pre collection is not called yet.
			s.channel = _da.funnel.name;
			s.eVar4 = s.prop4 = _da.om.lang;	//language
			s.eVar14 = s.prop14 = _da.om.client;	//client
			s.eVar15 = s.prop15 = _da.om.site;	//site	
			//set the media value undefined
			s.prop57 = s.eVar57 = undefined; 
			s.prop55 = s.eVar55 = undefined;
			//fix end
			s.linkTrackVars=_da.om.linkTrackVars;
			s.linkTrackEvents=_da.om.linkTrackEvents;
			if (_da.nameplate && _da.nameplate.name && params.nameplate === undefined) {
				params.nameplate = _da.nameplate.name;
			}	
			//track pagename
			if (typeof params.pname !== 'undefined') {
				omniture.createPageName(params.pname);
			} else {
				omniture.createPageName();
			}
			
			//set h1 based on data-hier attribute
			if (typeof params.hier1 !== 'undefined' && params.hier1 !== '') {
				omniture.createHier1(params.hier1);
			} else {
				omniture.createHier1(_da.hier);
			}
			
			if (params.intcmp){
				s.eVar13 = s.prop13 = params.intcmp;
			}else  {
				//?????	
			}			
			
			s.prop5 = params.onclicks;
			s.prop18 = params.leadtype;
			s.prop48 = s.eVar48 = params.tool;
			s.prop49 = s.eVar49 = params.tooldesc;
			
			if (typeof _da.deviceType !== 'undefined') {
                s.eVar54 = _da.deviceType;
            }
			
			s.events = params.events;
			if (params.year || typeof _da.nameplate !=="undefined") {
				if(params.year){
					s.prop12 = s.eVar12 = params.year;
				}
				if(typeof _da.nameplate !=="undefined" && !params.year){
					s.prop12 = s.eVar12 =_da.nameplate.year;
				}
			}else{
				s.prop12 = s.eVar12 = undefined;
			}
			if (params.nameplate && params.nameplate !== 'none') {
				s.prop16 = s.eVar16 = params.nameplate;
				params.title = params.titleNameplate == 'none' ? params.title : params.title + ':' + params.nameplate;
				omniture.trackDerivativeDetails();
			}else{
				s.prop16 = s.eVar16 = undefined;
			}
			
			if (params.content) {
				s.prop56 = s.eVar56 = params.content;
				if(s.prop5=="video start" || s.prop5=="video finish"|| s.prop5=="video complete"){
					
					s.prop5 = s.prop5;
					
				}else{
					
					s.prop5 = s.prop5 + ':' + params.content;
				}
				
			} else {
				s.prop56 = s.eVar56 = undefined;
			}
			omniture.setRegion();
			//add a nameplate to the link, if defined in context
			//if (_da.nameplate) {
			//	params.title += (':' + _da.nameplate.name);
			//}
	//		_.debounce( function() {
			// add freq param

			// Turn on for parameter debugging and a tree-list of the data
			//console.log("Tracking link parameters: ");
			//console.dir(params);
			
			//gux module type
			if (typeof params.moduletype !== 'undefined') {
	            s.prop24 = params.moduletype;
	        }else{
	        	s.prop24 = undefined;
	        }
	        //gux c25 module name
	        if (typeof params.modulename !== 'undefined') {
	        	 s.prop25 = params.modulename;
	        }else{
	        	s.prop25 = undefined;
	        }

			//gux c23 click
	        omniture.setModulePage(params.moduleaction);
	        //gux v35/c21
	        omniture.createSearchTag(params);
	        var linkTitle = params.title;
	        if (typeof _da.prefix !== 'undefined' && params.type !=='e') {
	        	linkTitle = _da.prefix + ":"+linkTitle;
	        }
			if(typeof params.freq === 'undefined'){
				s.tl(params.link, params.type, linkTitle);
			}else if (params.freq =="page" && !omniture.pageClicks[linkTitle]){
				s.tl(params.link, params.type, linkTitle);				
				omniture.pageClicks[linkTitle] = linkTitle;
			}else if (params.freq =="category" && (!omniture.pageClicks[params.onclicks] || (params.moduletype && !omniture.moduleTypes[params.moduletype]))){
				s.tl(params.link, params.type, linkTitle);				
				omniture.pageClicks[params.onclicks] = params.onclicks;
				if(params.moduletype) omniture.moduleTypes[params.moduletype] = params.moduletype;
			}
	//		}, 1000);
		},
		trackMedia: function( params ) {
			// begin track video			
			if (params.content) {
				s.prop56 = s.eVar56 = params.content;
			} else {
				s.prop56 = s.eVar56 = undefined;
			}
			if (params.progress && params.content) {
				s.prop57 = s.eVar57 = params.content + ":"+params.progress;
			} else {
				s.prop57 = s.eVar57 = undefined;
			}
			if (params.segment) {
				 s.eVar55 = params.segment;
			} else {
				s.eVar55 = undefined;
			}			
			if (params.content && s.pageName) {
				s.prop55 = params.content +":"+ s.pageName;
			} else {
				s.prop55 = undefined;
			}
			if (params.mediaType) {
				s.pev3 = params.mediaType;
			} else {
				s.pev3 = undefined;
			}
			if (params.linkType) {
				s.pe = params.linkType;
			} else {
				s.pe = undefined;
			}
			if (params.events) {
				s.events = params.events;
			} else {
				s.events = undefined;
			}
			if (params.onclicks) {
                s.prop5 = params.onclicks;
			} else {
			    s.prop5 = undefined;
			} 
			//gux module type
			if (typeof params.moduletype !== 'undefined') {
	            s.prop24 = params.moduletype;
	        }else{
	        	s.prop24 = undefined;
	        }
	        // gux c25 module name
	        if (typeof params.modulename !== 'undefined') {
	        	 s.prop25 = params.modulename;
	        }else{
	        	s.prop25 = undefined;
	        }

			//gux c23 click
	        omniture.setModulePage(params.moduleaction);
			//end  track video
			s.t();
		},
		trackEvent: function( params ) {
			// empty not needed at the current state, left here for
			// compatibility and future extensions reasons
		},
		trackSocial: function( params ) {
			// empty not needed at the current state, left here for
			// compatibility and future extensions reasons
		},			
		trackField: function( params ) {
			// empty not needed at the current state, left here for
			// compatibility and future extensions reasons
		},
		createSearchTag:function(params){
			
			if(typeof params!=='undefined' && params.search=='none'){
				s.eVar22 = s.prop22 = undefined;
				s.eVar35 = s.prop21 = undefined;
			}else {			
				if(typeof _da.searchKeyword !== 'undefined'){
					s.eVar22=s.prop22=_da.searchKeyword;
				}else{
					s.eVar22=s.prop22= undefined;
				}
				if(typeof params!=='undefined' && typeof params.totalresult!=='undefined' && typeof params.resultnumber!=='undefined'){
					s.eVar35= s.prop21 = params.resultnumber+ ':' +params.totalresult;
				}
				else if(typeof _da.totalresult !== 'undefined'){
						if(typeof _da.resultnumber !== 'undefined'){
							s.eVar35=s.prop21=_da.resultnumber+":"+_da.totalresult;
						}else {
							s.eVar35=s.prop21=_da.totalresult;
						}
				}else {
					s.eVar35 = s.prop21 = undefined;
				}
			}
		},
		setModulePage:function(param){
			if (typeof param!== 'undefined' && typeof _da.module!== 'undefined' && typeof _da.module.page!=='undefined' && typeof _da.module.template!=='undefined'){
				moduleAction = param;
				s.prop23 = _da.module.page +":"+ _da.module.template + ":"+moduleAction;	
			}else{
				s.prop23 = undefined;
			}
		},
		preCollection: function( options, params) {
			//set some global stuff
			s.eVar4 = s.prop4 = _da.om.lang;	//language
			s.eVar14 = s.prop14 = _da.om.client;	//client
			s.eVar15 = s.prop15 = _da.om.site;	//site
			s.prop56 = s.eVar56 = undefined;
			
			//track pagename,c11/v11 and hierarchy
			if (typeof params !== 'undefined') {
				omniture.createPageName(params.pname);
				omniture.createHier1(params.hier);
			} else {
				omniture.createPageName(undefined);
				omniture.createHier1(undefined);
			}

			s.channel = _da.funnel.name;
			s.prop39 = s.prop5 = undefined;
			
			if (typeof _da.nameplate !== 'undefined') {	//set for nameplate based templates only
				s.prop16 = s.eVar16 = _da.nameplate.name;
				s.prop12 = s.eVar12 = _da.nameplate.year;
			} else {
				s.prop12 = s.eVar12 = s.prop16 = s.eVar16 = undefined;
				s.prop36 = s.eVar34 = undefined;
			}
			omniture.trackDerivativeDetails();
			
			if (typeof params !== 'undefined' && params.tool !== 'undefined') {
				s.prop48 = s.eVar48 = params.tool;
				if (params.tooldesc !== 'undefined') {
					s.prop49 = s.eVar49 = params.tooldesc;
				}
			} else if (typeof _da.tool !== 'undefined') {
				s.prop48 = s.eVar48 = _da.tool.name;
				if (_da.tool.descriptor) {
					s.prop49 = s.eVar49 = _da.tool.descriptor;
				} else {
					s.prop49 = s.eVar49 = undefined;
				}
			} else {
				s.prop49 = s.eVar49 = s.prop48 = s.eVar48 = undefined;
			}
			
			if (typeof _da.lead !== 'undefined') {
				s.prop18 = s.eVar28 = _da.lead.type;
				if (_da.lead.optins) {
					s.prop20 = _da.lead.optins;
				} else {
					s.prop20 = undefined;
				}
			} else {
				s.prop18 = s.eVar28 = s.prop20 = undefined;
			}
			
			omniture.setRegion();
			
			if (typeof _da.events !== 'undefined') {
				s.events =  "";
				for (var i = 0; i < _da.events.length; i++) {
					if (s.events.length === 0) {
						s.events += _da.events[i];
					} else {
						s.events += ("," + _da.events[i]);
					}
				}
			} else {
				s.events = "";
			}
			//dealer info
			if (typeof _da.dealer !== 'undefined' && typeof _da.dealer.code!== 'undefined') {
                s.prop1 = s.eVar1 = _da.dealer.code;
			} else {
                s.prop1 = s.eVar1 = undefined;
			}
			
			if (typeof _da.user !== 'undefined' && typeof _da.user.loggedin !== 'undefined') {
                s.prop42 = s.eVar42 = _da.user.loggedin;
			} else {
                s.prop42 = s.eVar42 = undefined;
			}
			if (typeof _da.user !== 'undefined' && typeof _da.user.registered !== 'undefined') {
                s.prop45 = s.eVar45 = _da.user.registered;
			} else {
                s.prop45 = s.eVar45 = undefined;
			}
			if (typeof _da.onclicks !== 'undefined') {
                s.prop5 = _da.onclicks;
			} else {
			    s.prop5 = undefined;
			} 
			omniture.createSearchTag();
			//gux c23
			var moduleAction ="impress"
			omniture.setModulePage(moduleAction);
		}

	};

})();


/*
 * analytics.js
 * Author:gbaker 11/05/2011 
 *
 * #Exported API methods
 * ND.analytics.create				//Function to create Analytics Wrapper Implementation
 * ND.analytics.register			//Function to register Analytics Wrapper Implementation
 */
  
 var ND = (function(module, $) {
 
	var implementation = {},
		registrations = [];
	
	/*
	 * Omniture wrapper implementation (defined in analytics-omniture-impl.js)
	 */
	implementation.omniture = ND.omniture;
	
	
	//TODO Add fps implementation here (defined in fps-omniture-impl.js)
	implementation.fps = ND.fps;
	
	
	/*
	 * Webtrends Wrapper Implementation
	 */
	implementation.webtrends = (function(){
		
		function _dcsMultiTrack( _tag, arr ) {
			arr = arr || [];
			/*Need we clear all the cached parameters before tracking?*/
			//_tag.dcsCleanUp();
			_tag.dcsMultiTrack.apply( _tag , arr );
		}
		
		/* Helpers */
		var helpers = {
			
			// Looper
			each: function( help, arr, params) {
				$.each( help.split(','), function( i, item ) {
					helpers[item].apply( this, [arr, params] )
				});	
			},
			
			//Individuals
			title: function( arr, params ) {
				if( params && 'title' in params ) {
					$.merge( arr, ["WT.ti", params.title]);
				}			
			},
            funnel: function( arr, params ){
                if( params && 'funnel' in params) {
                    $.merge( arr, ["WT.si_n", params.funnel] );
                }
            },
            step: function( arr, params ){
                if( params && 'step' in params) {
                    $.merge( arr, ["WT.si_p", params.step] );
                }
            },
			event: function( arr ) {
				$.merge( arr, ["WT.dl", "99"]);
			},
			link: function( arr ) {
				$.merge( arr, ["WT.dl", "0"]);
			},	
			share: function( arr, params ) {
				if( params && 'socialId' in params ) {
					$.merge( arr, ["WT.z_share", params.socialId]);
				}
			},	
			uri: function ( arr, params ) {
				if( params && 'uri' in params ) {
					$.merge( arr, ["DCS.dcsuri", params.uri]);
				}
			},
			field: function( arr, params ) {
				if( params && 'field' in params) {
					var field = params.field;
					if(field.name){
						$.merge( arr, ["DCSext." + params.field.name, params.field.value || "" ]);
					}else if(field.constructor == Array){
						var r = [];
						for(var idx = field.length; --idx > -1 ; ){
							field[idx].name
								&& r.push("DCSext." + field[idx].name, field[idx].value || "");
						}
						$.merge( arr, r);
					}
				}
			},
			meta: function( a, b ) {
				return $(['<meta name="', a, '" content="', b, '"/>'].join(""));
			}
		}
			
		return {
			/*
			 * Constructor
			 */
			_init: function( _tag ) {
				this._tag = _tag;
			},
			
			/*
			 * Track Page Views. 
			 */			
			trackPageView: function( params ) {
				var arr = [];
				helpers.each( "title,uri", arr, params);					
				_dcsMultiTrack( this._tag, arr );
			},
			trackLink: function( params ) {
				var arr = [];
				helpers.each( "title,uri,link", arr, params);					
				_dcsMultiTrack( this._tag, arr );
			},
			trackEvent: function( params ) {
				var arr = [];
				helpers.each( "event,title,uri", arr, params);					
				_dcsMultiTrack( this._tag, arr );		
			},
			trackSocial: function( params ) {
				var arr = [];
				helpers.each( "event,title,uri,share", arr, params);					
				_dcsMultiTrack( this._tag, arr );
			},			
			trackField: function( params ) {
				var arr = [];
				helpers.each( "event,field,funnel,step", arr, params);					
				_dcsMultiTrack( this._tag, arr );
			},			
			/*
			 *  Before default tracking is triggered.
			 *
			 *	Function to handle when the form builder is on the page.
			 *  This function will be executed right before the Webtrends default tracking function
			 *  This gives ample time to prepare any special Meta Data require for this formpage.
			 *
			 *  Function will inject <meta> tags for WT.
			 */
			preCollection: function( options ) {
				var funnel = options.funnel || false,
					meta = $('meta:last');
				
				if( funnel && funnel.name ) {
					 meta.after( helpers.meta("WT.si_n", funnel.name ) );
				}
				if( funnel && funnel.stepname ) {
					 meta.after( helpers.meta("WT.si_p", funnel.stepname ) );
				}
				
			}
			
		};
	}());
		
	
	
	/*
	 * Exports 
	 */
	module.analytics = {

		/*
		 * Create instance of webtrends wrapper
		 */
		create: function( name, engine ) {
		
			function TrackerClass() {};
			TrackerClass.prototype = implementation[name];
			var tracker = new  TrackerClass();
		
			//var tracker = Object.create( implementation[name] )
			
			tracker._init( engine );
			delete tracker._init;
			tracker.name = name;
			return tracker;
		}, 
		
		/*
		 * Register the PUBSUB channel handlers 
		 * 
		 * PASTE this code into console if you want to see that is going on
		 *  	$.each( 'page,event,link,social'.split(',') , function( i, item ) {
		 * 			$.subscribe('/analytics/'+item+'/', function(e, data) { console.log( e.type, data ) });
		 *		})
		 */
		register: function( tracker ) {
			if( !tracker ) { return; }
			
			//check if this tracker is already registered
			for (i = 0; i < registrations.length; i++) {
				if (tracker.name === registrations[i].name) {
					//console.log("Tracker ["+registrations[i].name+"] already registered.")
					return;
				}
			}
			
			
			//TODO... use rules... 
			// -- remove track and lowercase
			var mapping =  {
				"pageview": "trackPageView",
				"link": "trackLink",
				"social": "trackSocial",
				"event": "trackEvent",
				"field": "trackField",
				"media":"trackMedia"
			}
			
			$.each( mapping, function(channel, funcName) {
				if( funcName in tracker ) {
					$.subscribe( "/analytics/" + channel + "/", (function( tracker, fn ) {
						return function( event, data ) {
							fn.apply( tracker, [data] );
						}
					})(tracker, tracker[funcName]) );
				}
			});
			
			registrations.push( tracker );
		},
		
		/*
		 *  Return a Helper function for grabbing content out of the DOM and using it in tracking.
		 */
		grabber: function() {
			
			function urlise( str ) {
				str = (str || "").toLowerCase()
					.replace(/[\s'"!@#$%\^\&\*\(\),\.<>;:\[\]{}?+/\\-_=]/g, "-")
					.replace(/(-){2,}/g, "-")
					.replace(/^-|-$/g, "");
					
				return str;
			}
			
			//Helper function
			return function( options ) {
				
				var elem, value, url, best;
				
				if( options.link ) {
					elem = $( options.link );			
					value = elem.attr("data-tracking-value") || elem.attr("title") || elem.text() || "",
					url = urlise( value );
				}
				
				if( options.meta ) {
					elem = $( options.meta );		
					value = elem.attr("content") || "",
					url = urlise( value );
				}
				
				if( options.inner ) {
					elem = $( options.inner );		
					value = elem.text() || "",
					url = urlise( value );
				}
				
				if( options.name ) {
					value = options.name,
					url = urlise( options.name );
				}

				return {
					value: value,
					url: url
				}
				
			}
			
		}
	}

	
	return module;
 
 }(window.ND || {}, jQuery));



/*
		<!-- Configuration, must come from site wide configuration -->
		<script type="text/javascript">
		var _da = {}, _tag = _da.wt = {};
		// Web Trends ID, same ID for whole publication.
		_tag.dcsid="dcs3e9phnudz5bdfu8tzlamfrh_8n7o";
		// The hostname of the website.. Notice the DOT..  -> ".ford.com.au"
		_tag.fpcdom=".hostnamegoeshere.com";
		// The Time Zone
		_tag.timezone=10;
		</script>
*/

 (function(globals, $){

  /**
   * Private functions
   */
	var _isAnalyticsConfigured = function() {
		// Minimum variables required
		if( !globals._da ||
			!globals.ND ||
			!globals.ND.analytics ) {
			return false;
		}
		return true;
	};
	
	var _isWebTrendsConfigured = function() {
		if( globals._tag && 
				globals._da.wt && 
				globals._tag === globals._da.wt &&
				globals.WebTrends ) {
			return true;
		}
		return false;
	};
	
	/**
	 * Do not track single page applications(such as build and price)/mobile applications.The flag is set 
	 * in the view of the single page application.
	 */
	var _isNonSpecialWebAppOmnitureConfigured = function() {
		if(globals._da.om && 
		  (typeof globals._da.om.singlePageApp === 'undefined' || 
		   globals._da.om.singlePageApp === false) &&
		   (globals._da.om.mobileApp === undefined ||
		   globals._da.om.mobileApp === false)) {
			return true;
		}
		return false;
	};
	
	/**
	 * Tracks single page applications only as they need to set omniture variables manually (such as build and price).
	 * The flag is set in the view of the single page application.
	 */
	var _isSinglePageAppOmnitureConfigured = function() {
		if(!_isAnalyticsConfigured()) {
			return false;
		}
		if(globals._da.om && 
		   globals._da.om.singlePageApp === true) {
			return true;
		}
		return false;
	};
	
	/**
	 * Tracks mobile applications using jquery mobile.
	 * The flag is set in the view of the mobile application.
	 */
	var _isMobileAppOmnitureConfigured = function() {
		if(!_isAnalyticsConfigured()) {
			return false;
		}
		if(globals._da.om && 
		   globals._da.om.mobileApp === true) {
			return true;
		}
		return false;
	};
	
	

	//
	// TODO added new trackFps function here, something along these lines:
	//
	
	//var _trackFps = function(_tag, options, wtTracker, params) {
	var _trackFps = function(params) {
		

		//TODO not sure about this if - but likely we also need it here 
		if (_da.skipTracking == undefined || globals._da.skipTracking === false) {
			
			//Create Dragonfly FPS Tracking implementation
			var fpsTracker = ND.analytics.create( 'fps', s );
			
			//Register the DFY tracker implementation for custom activities
			ND.analytics.register( fpsTracker );
			
			//TODO Not sure what parameters are needed in these 2 calls ...
			
			//Give dragonfly a chance to inject meta tags dynamically
			fpsTracker.preCollection(_da, params);
			
			//Execute the normal default page load tracking function.
			//fpsTracker.trackPageView( _da, params);
			fpsTracker.trackPageView( params);
		}		
	};
	
	
	
	var _trackWebTrends = function(_tag, options, wtTracker) {
		//Initalise
		_tag = new WebTrends();

		//Extend.. Similiar as $.extend
		$.extend( _tag, options );
		
		//Further Initalise
		_tag.dcsGetId();
		
		//Create Dragonfly Tracking implementation
		wtTracker = ND.analytics.create( 'webtrends', _tag );
		
		//Register the DFY tracker implementation for custom activities
		ND.analytics.register( wtTracker );
		
		//Copy object
		var choice = $.extend( {}, _da );
		delete choice.wt;
	
		//Give dragonfly a chance to inject meta tags dynamically
		wtTracker.preCollection( choice );
		
		//Execute the normal default page load tracking function.			
		_tag.dcsCollect();
		
		//Expose the parameter
		ND.analytics._tag = _tag;
	};
	
	var _trackOmniture = function(params) {
		
		if (_da.skipTracking == undefined || globals._da.skipTracking === false) {
			//Create Dragonfly Tracking implementation
			var omTracker = ND.analytics.create( 'omniture', s );
			
			//Register the DFY tracker implementation for custom activities
			ND.analytics.register( omTracker );
			
			var _counterField = $('.searchresults-list .no-of-results');// for lincoln result page only. need send out the total No of results
			if(_counterField.length>0){
				_da.pname = _da.pname +':' + $.trim(_counterField.html());
			}
			//Give dragonfly a chance to inject meta tags dynamically
			//module page will need profile is ready
			if (typeof _da.module!=='undefined' && typeof _da.module.page!=='undefined' && typeof _da.module.template=='undefined'){
				var cookieUser = null,cookieUUID = null,moduleTemplate=null;
				if($.cookie('dfy.u')) {
					cookieUser = $.parseJSON($.cookie('dfy.u'));
				}
				if($.cookie('dfy.uuid')) {
					cookieUUID = $.parseJSON($.cookie('dfy.uuid'));
				}
				// set values depending on cookie
				if (cookieUser !== null) {
					moduleTemplate = "owner";					
				} else if (cookieUUID === null) {
					moduleTemplate = "new";
				} else if (cookieUUID != null && cookieUser === null) {
					moduleTemplate = "return";
				}				
				if (moduleTemplate!=null){
					_da.module.template = moduleTemplate;
					$("section.personalisation a[href*='intcmp='],section.smartnextsteps a[href*='intcmp='],section.personalisation form[action*='intcmp=']").each(function(idx){
						var attrName="",attrValue="";
						var attrHref = $(this).attr("href");
						var attrAction = $(this).attr("action");
						if(attrHref!= null && typeof attrHref!=='undefined'){
							attrName = "href";
							attrValue = attrHref;
						}else if(attrAction!= null && typeof attrAction!=='undefined'){
							attrName = "action";
							attrValue = attrAction;
						}
						var temp = "STATUS";
						if(attrValue.indexOf(temp)!=-1){	
							$(this).attr(attrName,attrValue.replace(temp,moduleTemplate));
						}	
					});
				}
				omTracker.preCollection( _da, params);
				//Execute the normal default page load tracking function.
				s.t();	
			}else{
				omTracker.preCollection( _da, params);
				//Execute the normal default page load tracking function.
				s.t();
			}
			
		}
	};
	 
	
	var _track = function() {
		// Minimum variables required
		if(!_isAnalyticsConfigured()) {
			return;
		}
	
	
		/* WEBTRENDS ONLY
	     * This if block represnets the integration of Webtrends only
		 */
		if(_isWebTrendsConfigured()) {
				
				//Create the real Tag
			var _tag,
				//The _tag configuration
				options = globals._tag,
				//Other
				wtTracker;
			
			//When the DOM is ready.
			$(document).ready(function() {
				_trackWebTrends(_tag, options, wtTracker);
				ND.analyticsBinder.bind();
			});
	
			
			//Export the _tag into the global space so that it looks like a normal webtrends tag in the DOM inspector
			globals._tag = globals._da.wt = _tag;
			
		}
	
		/* 
		 * The following is an example of how another implementation might work
		 * Google Analytics
		 * /
		if( globals._gaq && 
			globals._da.ga && 
			globals._gaq === globals._da.ga ) {
				
			//Create Dragonfly Tracking implementation
			var gaTracker = ND.analytics.create( 'google', _gaq );
			
			//Register the DFY tracker implementation for custom activities
			ND.analytics.register( gaTracker );
	
			// When the DOM is ready and analytics is ready.
			$(document).ready(function() {
				//Give dragonfly a chance to inject meta tags dynamically
				gaTracker.preCollection( _da );
				
				//Execute the normal default page load tracking function.
				_gaq.push(['_trackPageview']);
			});		
		}
		 */
	
			
		/* 
		 * Omniture implmentation
		 */
		if(_isNonSpecialWebAppOmnitureConfigured()) {
	 
			// When the DOM is ready and analytics is ready.
			$(document).ready(function() {
				if(_isNonSpecialWebAppOmnitureConfigured()) {

					_trackOmniture();
					_trackFps(); // added
					ND.analyticsBinder.bind();
				}
			});
			
			//TODO add similar code for FPS here
			globals._tag_om = globals._da.om;
			
		}  if(_isMobileAppOmnitureConfigured()) {
			
			/* 
			 * Omniture mobile implmentation
			 */
			
			/**
			 * if this method gets called we are on a mobile device that's using jquery mobile
			 */
			$(document).bind("mobileinit", function(){
				$(document).bind('pagechange', function() {
					
					_trackOmniture();
					//TODO wherever we have _trackOmniture() called, we also have to add trackFps();
					_trackFps();
					ND.analyticsBinder.bind();
				});
				//TODO add similar code for FPS here
				globals._tag_om = globals._da.om;
			});
		}
	}
	
	_track();
	
	/**
	 * WARNING: must be called explicitly every time page changes in single page app
	 */
	ND.analyticsTag = ND.analyticsTag || {
		
		trackOmnitureSinglePageApp : function() {
			if(_isSinglePageAppOmnitureConfigured()) {
				_trackOmniture();
				_trackFps(); // added by remjo
				//DO NOT bind more than once (ND.analyticsBinder.bind()), it's called in _setOnce
				//we want to set globals._da.om only once so remove the method after it's set.
				if (ND.analyticsTag._setOnce !== undefined) {
					ND.analyticsTag._setOnce();
					delete ND.analyticsTag._setOnce;
				}
			}
		},

		trackOmniturePage : function(params) {

			_trackOmniture(params);
			_trackFps(params); // added by remjo
		},
		
		_setOnce : function() {
			globals._tag_om = globals._da.om;
			ND.analyticsBinder.bind();
		},
		
		isSinglePageAppOmnitureConfigured: _isSinglePageAppOmnitureConfigured
	};
	
	
	
}(window, jQuery));

// Now that this code is executed  ->  _tag instanceof WebTrends




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




/* context.js */
/**
 * @author szabetian
 * @project VOI prepopulation/Form builder/dealer locator
 * @description pre-populates model/series drop downs on forms if form is
 *              associated with proper context (by publisher). It also adds
 *              context param to links with ctx-voi class
 * 
 * @depends on shoppref.js (to read cookie and add pc param)
 */
ND.Context = (function($) {
	
	var 
	
	voiConfig = {
			excludedModels : ''
	},
	
	privateFunctions = {
			
		restServices : {
			fetchVOIData : function(url) {
				privateFunctions.restServices.ajaxCall(url, function(jqXHR) {
					privateFunctions.displayVehicleBanner(jqXHR);
					privateFunctions.displayDisclaimer(jqXHR);
					privateFunctions.populateModelDropdown(jqXHR);
                    privateFunctions.populateVehicleDropdown(jqXHR);
				});
			},
			fetchColorData: function(url, callback) {
				
				privateFunctions.restServices.ajaxCall(url, function(jqXHR) {
					var i = 0,
						colors = [];
					
					for (i = 0; i < jqXHR.length; i++) {
						colors.push({
							name: jqXHR[i].name,
							order: jqXHR[i].order,
							code: jqXHR[i].code
						});
					}
					
					callback(colors);
					
				});
			},
			ajaxCall : function(url, successCallback) {
				$.ajax({
					url: url,
					dataType: 'json', 
					success: function(jqXHR, textStatus, textResponse) {
						if (typeof jqXHR !== 'undefined' && jqXHR != null) {
							successCallback(jqXHR);
						}
					}, 
					error : function(jqXHR, textStatus, textResponse) {
						//console.log('Could not fetch voi rest data');
					}
				});
			}
			
		},
	
		
	   /**
         * Extracts context param (ctx=m:1178856483523;d:1178856483570) from URL
         */
		extractContext : function(idx, url) {
			idx += 4;
			var lastParam = url.indexOf('&', idx);
			return url.substring(idx, lastParam > idx ? lastParam : url.length );
		},
		
		addContextToHref : function(elmnt, ctx) {
	        var href = elmnt.attr('href'),
	            ctxIdx;
	        if (typeof href !== 'undefined') {
		        if ((ctxIdx = href.indexOf('ctx=')) > 0) {
		             // if there is already a ctx, compare it with new one
		            var indexOfLastAnd = href.lastIndexOf('&');
		            if (indexOfLastAnd < ctxIdx) {
		                indexOfLastAnd = href.length;
		            }
		
	            var oldCtx = href.substring(ctxIdx, indexOfLastAnd);
	            if (oldCtx !== ctx) {
	               href = href.replace(oldCtx, ctx);
	               elmnt.attr('href', href).attr('data-ajax', 'false');
	            }
	
	        } else if (href.length > 1) {  // don't add to # hrefs
	            if(href.indexOf('?') > 0) {
	                href +='&';
	            } else {
	                href += '?';
	            }
	            elmnt.attr('href', href + ctx).attr('data-ajax', 'false');
		        }
	        }
	    },
	    
		addDropdownChangeListeners: function($modelDD, voiRestData) {
			
			var $seriesDD = $('#voi-series-name'),
				$colorDD = $('#voi-colour-dd');
			if ($seriesDD.length > 0) {
				var $firstOption;
				if (privateFunctions.firstTime) {
					$firstOption = $seriesDD.html();
					privateFunctions.firstTime = false;
				}
				
				$modelDD.on('change', function (e) {
				    e.stopImmediatePropagation();
					var result = privateFunctions.findIdForName($modelDD.val(), null, voiRestData);
					
					if (result.m != null) {
						privateFunctions.setModelDropDownValue(result);
						privateFunctions.populateSeriesDropdown($seriesDD, voiRestData[result.mIdx].derivatives, $firstOption, $colorDD);
					} else {
						privateFunctions.populateSeriesDropdown($seriesDD, [], $firstOption, $colorDD);
					}
				});
				
				$seriesDD.on('change', function() {
					var result = privateFunctions.findIdForName($modelDD.val(), $seriesDD.val(), voiRestData);
					
					if (result.d != null) {
						privateFunctions.setDerivativeDropDownValue(result);
					}
					if ($colorDD.length > 0) {
						privateFunctions.populateColorDropdown($seriesDD, $('#voi-colour-dd'));
					}
				});
				
				
				if ($colorDD.length > 0) {
					$colorDD.on('change', function() {
						privateFunctions.setColorDropDownValue($colorDD);
					});
				}
			}
		},

        addDealerDropDownListeners: function($modelDD, voiRestData){
            var $versaoDD = $('#FormSales_Derivative'),
                $corDD = $('#FormSales_Color');

            var $firstOption = $versaoDD.html();

            $modelDD.on('change',function(){
                if($modelDD.get(0).selectedIndex !== 0){
                    $versaoDD.parent().css('display', 'block');
                }else{
                    $versaoDD.parent().css('display', 'none');
                    $corDD.parent().css('display', 'none');
                }
                var result  = privateFunctions.findIdForName($modelDD.val(), null, voiRestData);

                if(result.m != null){
                    //privateFunctions.setVehicleDropDownValue(result);
                    privateFunctions.populateSeriesDropdown($versaoDD, voiRestData[result.mIdx].derivatives,$firstOption, $corDD);
                }else{
                    privateFunctions.populateSeriesDropdown($versaoDD, [], $firstOption, $corDD);
                }
            });

            $versaoDD.on('change', function(){
                if($versaoDD.get(0).selectedIndex !== 0){
                    $corDD.parent().css('display', 'block');
                }else{
                    $corDD.parent().css('display', 'none');
                }
                var result = privateFunctions.findIdForName($modelDD.val(), $versaoDD.val(), voiRestData);

                if(result.d != null){
                    //privateFunctions.setDerivativeDropDownValue(result);
                }
                if($corDD.length > 0){
                    privateFunctions.populateColorDropdown($versaoDD, $corDD);
                }
            });

            if($corDD.length > 0){
                $corDD.on('change', function(){
                    privateFunctions.setColorDropDownValue($corDD);
                });
            }

        },
		
		findIdForName: function(modelName,derivativeName,voiRestData) {
			var i,j, derivative;
			var result = { m : null, d : null,//ids 
					mIdx : -1, dIdx : -1, 
					dy: null,//derivative year
					dcks: null,//derivative cks code
					mcks: null,//model cks code
					dqcode: null,//derivative quote code
					dtdcode: null,//derivative test drive code
					dbcode: null//derivative brochure code
					};
	
			for (i = 0; i < voiRestData.length; i++) {
				if (modelName === voiRestData[i].name) {
					
					result.m = voiRestData[i].id;
					result.mcks = voiRestData[i].modelCode;
					result.mIdx = i;
					if (derivativeName != null) {
						for (j = 0; j < voiRestData[i].derivatives.length; j++) {
							derivative = voiRestData[i].derivatives[j];								
							if (derivativeName === derivative.name) {
								result.dcks = derivative.derivativeCode;
								result.dy = derivative.year;
								result.d = derivative.id;
								result.dIdx = j;
								result.dqcode = derivative.quoteFulfilmentCode;
								result.dtdcode = derivative.testdriveFulfilmentCode;
								result.dbcode = derivative.brochureFulfilmentCode;
								break;
							}
						}
					}
					break;
				}
			}
			
			return result;
		},
		
		firstTime : true,
		
		displayVehicleBanner: function(voiRestData) {
			var ctx = publicFunctions.toJSONFromUrl();
			if (ctx != null && typeof ctx.m !== 'undefined' && ctx.m != null) {
				// consider using ND.Utils.lazyLoadImage
				var $bannerCFF = $('#voi-banner'),
					$banners = $('.voi-banner'),
					bannerUrl,
					$bannerDiv;
				if ($bannerCFF.length > 0 && $banners.length > 0) {
					for (i = 0; i < voiRestData.length; i++) {
						if (ctx.m === voiRestData[i].id) {
							bannerUrl = voiRestData[i][voiConfig.formRequestType + 'Banner'];
							if (typeof bannerUrl !== 'undefined' && bannerUrl != null && bannerUrl !== '') {
								// display loader
								
								// show loading image
								$banners.each(function() {
									$(this).removeAttr('style');
								});
								
								var img = new Image();
								// call this function after it's loaded
								img.onload = function() {
									// make wrapperformbuilder.data.EmailHandler
                                    // fully visible
									$banners.each(function() {
										$(this).find('img').attr('src',bannerUrl);
									});
								};
								// begin loading the image from ...
								img.src = bannerUrl;
							}
							break;
						}
					}
				}
			}
		},
		
		displayDisclaimer: function(voiRestData) {
			var ctx = publicFunctions.toJSONFromUrl();
			if (ctx != null && typeof ctx.m !== 'undefined' && ctx.m != null) {
				// consider using ND.Utils.lazyLoadImage
				var $disclaimer = $('#voi-disclaimer'),
					disclaimerText = null,
					foundDrv = false,
					i,j;
				if ($disclaimer.length > 0) {
					for (i = 0; i < voiRestData.length; i++) {
						if (ctx.m === voiRestData[i].id) {
							if (typeof ctx.d !== 'undefined' && ctx.d != null) {
								for (j = 0; j < voiRestData[i].derivatives.length; j++ ) {
									if (ctx.d === voiRestData[i].derivatives[j].id) {
										disclaimerText = voiRestData[i].derivatives[j]['derivative' + voiConfig.formRequestTypeUppercase + 'Disclaimer'];
										if (typeof disclaimerText !== 'undefined' && disclaimerText != null) {
											$disclaimer.hide().html(disclaimerText).fadeIn('fast');
											foundDrv = true;
										}
										break;
									}
								}
							}
							
							if (!foundDrv) {
								disclaimerText = voiRestData[i][voiConfig.formRequestType + 'Disclaimer'];
								if (typeof disclaimerText !== 'undefined' && disclaimerText != null) {
									$disclaimer.hide().html(disclaimerText).fadeIn('fast');
								}
							}
						} 
					}
				}
			}
		},
		
		populateModelDropdown: function(voiRestData) {
			var $dd = $('#voi-model-name');
			
			if ($dd.length > 0) {
				var options = [],
					excludedSerEl = $("#modelseries"),
					filterList = [],
					optionList = voiRestData.slice(0),
					i;
				//if there is excludedSeries defined, remove from option list	
				if(excludedSerEl.length>0){
					var excludeSerJson = $.parseJSON(excludedSerEl.html()),
						excludeModel = excludeSerJson.excludedModels;
					if(excludeModel&&excludeModel.length>0){
						var excludeModelArr = excludeModel.split(",");//convert excluded list from string to array
						for(var k = 0; k < voiRestData.length; k++){
							var count = 0;
							//if there is excludedSeries defined, remove from option list
							if(excludeModelArr && excludeModelArr instanceof Array && excludeModelArr.length>0){
								for(var j = 0; j < excludeModelArr.length; j++){
									if($.trim(voiRestData[k].name)==$.trim(excludeModelArr[j])){
										count++;//record as a flag if match exclude element
									}
								}
								//filter the array element, store those not in the exclude list
								if(count==0){
									filterList.push(voiRestData[k]);
								}
							}
						}
					}
				}
				//update list if has filter element
				if(filterList.length > 0){
					optionList = filterList.slice(0);
				}
				
				for (var i = 0; i < optionList.length; i++) {
					options.push('<option value="' + optionList[i].name + '">' + optionList[i].name + '</options>');
				}
				$dd.append(options.join(''));
				if (ND.FormBuilder && ND.FormBuilder.styleSelectOptions) {
					ND.FormBuilder.styleSelectOptions($dd);
				}
				privateFunctions.addDropdownChangeListeners($dd, voiRestData);
			
				var ctx = publicFunctions.toJSONFromUrl();
				if (ctx != null && (typeof ctx.m !== 'undefined' && ctx.m != null) ) {
					for (i = 0; i < voiRestData.length; i++) {
						if (ctx.m === voiRestData[i].id) {
							$dd.val(voiRestData[i].name);
							privateFunctions.setModelDropDownValue(ctx);
							//trigger change only if ctx exists
							$dd.trigger('change');
							break;
						}
					}
				}
				privateFunctions.refreshMobileDropdown($dd);
			}
		},

        populateVehicleDropdown: function(voiRestData) {
            var $vehicleDropdown = $('#FormSales_Model');
            var options = [];
            var optionList = voiRestData.slice(0);
            for(var i = 0; i < optionList.length; i++){
                options.push('<option value="' + optionList[i].name + '">'+ optionList[i].name +'</option>');
            }
            $vehicleDropdown.append(options.join(''));
            privateFunctions.addDealerDropDownListeners($vehicleDropdown, voiRestData);
        },
		
		
		setHiddenInputValue: function(selector, value) {
			if (value != undefined) {
				var $hiddenInput = $(selector);
				if ($hiddenInput.length > 0) {
					$hiddenInput.val(value);
				}
			}
		},
		
		setModelDropDownValue: function(value) {
			privateFunctions.setHiddenInputValue('#voi-model-id', value.m);
			privateFunctions.setHiddenInputValue('#voi-model-cks-code', value.mcks);
		},

		populateSeriesDropdown: function($dd, modelDerivatives, $firstOption, $colorDD) {
			
			if (typeof modelDerivatives !== 'undefined' && modelDerivatives != null && modelDerivatives.length > 0) {
				var options = [],
				i;	
				for (i = 0; i < modelDerivatives.length; i++) {
					options.push('<option value="' + modelDerivatives[i].name + 
								 '" data-derivativeid="' + modelDerivatives[i].id + '">' + modelDerivatives[i].name + '</options>');
				}
				$dd.empty().html($firstOption).append(options.join(''));
				if (ND.FormBuilder && ND.FormBuilder.styleSelectOptions) {
					ND.FormBuilder.styleSelectOptions($dd);
				}
				var ctx = publicFunctions.toJSONFromUrl(),
					derivative;
			
				if (ctx != null && ((typeof ctx.d !== 'undefined' && ctx.d != null))) {
					for (i = 0; i < modelDerivatives.length; i++) {
						derivative = modelDerivatives[i];
						if (ctx.d === derivative.id) {
							$dd.val(derivative.name);
							// /console.log('setting value of dropdown: ' +
                            // select + ' to ' + derName);
							privateFunctions.setDerivativeDropDownValue(ctx);
							
							$dd.trigger('change');
							break;
						}
					}
				} else {
					privateFunctions.populateColorDropdown($dd, $colorDD);
				}
				
			} else {
				$dd.html($firstOption);
				privateFunctions.populateColorDropdown($dd, $colorDD);
				
			}
			privateFunctions.refreshMobileDropdown($dd);
		},
		setDerivativeDropDownValue : function(value) {
			privateFunctions.setHiddenInputValue('#voi-series-id', value.d);
			privateFunctions.setHiddenInputValue('#voi-series-cks-code', value.dcks);
			privateFunctions.setHiddenInputValue('#voi-series-year', value.dy);
			privateFunctions.setHiddenInputValue('#voi-series-quote-code', value.dqcode);
			privateFunctions.setHiddenInputValue('#voi-series-brochure-code', value.dbcode);
			privateFunctions.setHiddenInputValue('#voi-series-testdrive-code', value.dtdcode);			
		},
		
		colorDropdownFirstOption : null,
		
		populateColorDropdown: function($seriesDD, $dd) {
			if ($dd.length > 0) {
				
				if (privateFunctions.colorDropdownFirstOption == null) {
					privateFunctions.colorDropdownFirstOption = $dd.html();
				}
			
				// call ajax service
				
				var derivativeId = $seriesDD.find(':selected').data('derivativeid');
				
				if (typeof derivativeId !== 'undefined' && derivativeId != null) {
					var colorUrl = voiConfig.colorUrl.replace('{site}', voiConfig.site)
					  .replace('{priceZone}', voiConfig.priceZone)
					  .replace('{derivative}', derivativeId);

					$dd.empty().html('<option value="">' + voiConfig.pleaseWaitMsg + '</options>');

					privateFunctions.restServices.fetchColorData(colorUrl, function(colorData) {
						var options = [],
							i;
						for (i = 0; i < colorData.length; i++) {
							options.push('<option value="' + colorData[i].code + '">' + colorData[i].name + '</options>');
						}
						$dd.empty().html(privateFunctions.colorDropdownFirstOption).append(options.join(''));
						if (ND.FormBuilder && ND.FormBuilder.styleSelectOptions) {
							ND.FormBuilder.styleSelectOptions($dd);
						}
						privateFunctions.refreshMobileDropdown($dd);
					});
				}
//                if (typeof derivativeId !== 'undefined' && derivativeId != null) {
//                    $dd.empty().html('<option value="">wait</options>');
//                    privateFunctions.restServices.fetchColorData('../../../../latest-offers-2014-client/carve/RAD2013/rest/dealer-color.js', function(colorData) {
//                            var options = [],
//                                i;
//                            for (i = 0; i < colorData.length; i++) {
//                                options.push('<option value="' + colorData[i].code + '">' + colorData[i].name + '</options>');
//                            }
//                            $dd.empty().html(privateFunctions.colorDropdownFirstOption).append(options.join(''));
//                            if (ND.FormBuilder && ND.FormBuilder.styleSelectOptions) {
//                                ND.FormBuilder.styleSelectOptions($dd);
//                            }
//                            privateFunctions.refreshMobileDropdown($dd);
//                    });
//                }
                else {
					$dd.empty().html(privateFunctions.colorDropdownFirstOption);
				}
				privateFunctions.refreshMobileDropdown($dd);
			}
		},
		
		refreshMobileDropdown: function($dd) {
			if ( $.mobile ) {
				$dd.selectmenu('refresh', true);
			}
		},
		
		setColorDropDownValue : function(colourDropdown) {
			privateFunctions.setHiddenInputValue('#voi-colour-code', colourDropdown.find(':selected').val());
			privateFunctions.setHiddenInputValue('#voi-colour-name', colourDropdown.find(':selected').text());
		},
			
		
		/**
         * if we have a form and config, make an ajax call and retrieve the VOI
         * list
         */
	    init : function() {
	    	
	    	var $restConfig = $('#rest-services'),
	    		$modeSeriesConfig = $('#modelseries'),
	    		$commonConfig = $('#common-config'),
	    		$form = ('form');
	    	// if there is at least one form on the page
            $('#FormSales_Derivative').parent().css('display','none');
            $('#FormSales_Color').parent().css('display','none');
	    	if ($form.length > 0) {
	    		
	    		// from legacy code...can't move it
		    	publicFunctions.legacyDisplayVehicleBanner();
				publicFunctions.legacyDisplayVehicleDisclaimer();
	    			
	    		if ($restConfig.length > 0 && $modeSeriesConfig.length > 0) {
		    		$.extend(voiConfig, JSON.parse($modeSeriesConfig.html()),
					    				JSON.parse($restConfig.html()),
					    				JSON.parse($commonConfig.html()));
		    		
		    		if (voiConfig.formRequestType) {
		    			var firstChar = voiConfig.formRequestType.charAt(0);
		    			voiConfig.formRequestTypeUppercase = voiConfig.formRequestType;
		    			voiConfig.formRequestType = voiConfig.formRequestType.replace(firstChar, firstChar.toLowerCase());
		    		}
		    		
		    		voiConfig.voiUrl = voiConfig.voiUrl.replace('{site}', voiConfig.site).replace('{makeName}', voiConfig.make);
		    		voiConfig.voiUrl += voiConfig.excludedModels;
		    		
		    		privateFunctions.restServices.fetchVOIData(voiConfig.voiUrl);
	    		}
                //privateFunctions.restServices.fetchVOIData('../../../../latest-offers-2014-client/carve/RAD2013/rest/dealer-vehicle.js');
	    	}
	    }
	    
	    
	},
	
	publicFunctions = {
			
		//used to prevent smob logic from double firing 
		//once after page init and once after document ready.
		isContextInitialised : false,
		
		startUp : function() {
	    	
	    	if (!publicFunctions.isContextInitialised) {
				// need to do this check on every page regardless
				publicFunctions.addContextToLinks();
				publicFunctions.addPostcodeContextToLinks();
				
				// if we have a form and config, make an ajax call and retrieve the
	            // VOI list
				privateFunctions.init();
				publicFunctions.isContextInitialised = true;
	    	}
	    },
		/**
         * Converts parameterised context to JSON
         * 
         * d:<derivativeid>;m:<modelid>
         */
		toJSON : function(contextParam) {
			var result = {};
			if (typeof contextParam !== 'undefined') {
				params = contextParam.split(";");
				for (var i = 0; i < params.length ; i++) {
					var nameValuePair = params[i].split(':');
					if (nameValuePair.length == 2) {// ensure it's a name value
                                                    // pair
						result[nameValuePair[0]] = nameValuePair[1];
					}
				}
			}
			return result;
		},
		
		/**
         * builds the context param (ctx=m:1178856483523;d:1178856483570)
         */
		buildContext: function(additionalParams) {
			var params = new Array();
			if ((typeof _da !== 'undefined') && (typeof _da.nameplate !== 'undefined') && (typeof _da.nameplate.id !== 'undefined') && _da.nameplate.id != '') {
				
				params.push( 'm:' + _da.nameplate.id);
			} 
			if	((typeof _da !== 'undefined') && (typeof _da.der !== 'undefined') && (typeof _da.der.id !== 'undefined') && _da.der.id != '') {
				params.push( 'd:' + _da.der.id);
			}
            if (typeof additionalParams !== 'undefined' && additionalParams != null) {
                for (key in additionalParams) {
                    params.push( key + ':' + additionalParams[key]);
                }
            }
// console.log('built ctx=' + params.join(';') + ' context');
			return params.length > 0 ? ('ctx=' + params.join(';')) : '';
		},

		/**
         * if the url does not contain the context variable, it might still
         * exist (if we are on a smart mobile site). in that case check for a
         * div with data-role page; if that div has a data-url with ctx param
         * then call this method with the new url.
         */
		toJSONFromUrl: function(url) {
			url = decodeURIComponent(url || window.location.href);
			
			// console.log('looking for ctx in url ' + url);
			var idx = url.indexOf('ctx=');
			var ctx = null;
			if (idx > 0) {
				ctx = privateFunctions.extractContext(idx, url);
			} else {
				// perhaps we are on a mobile site
				var mobileUrl = null;
				var page = null;
				if ((page = $('div[data-role="page"]').filter(':visible')) != null && 
					(mobileUrl = page.attr('data-url')) != null) {
					if ((idx = mobileUrl.indexOf('ctx=')) > 0) {
						ctx = privateFunctions.extractContext(idx, url);
					} 	
				}
			}
			if (ctx != null) {
				ctx = publicFunctions.toJSON(ctx);
			}
			// console.log('ctx is = ' + ctx);
			return ctx;
		},
		
		/**
         * adds context param (ctx=m:1178856483523;d:1178856483570) to links
         * with 'ctx-voi' class
         */
		addContextToLinks: function() {
			var ctx = publicFunctions.buildContext();
// console.log('addContextToLinks');
			$('a.ctx-voi').each(function() {
                privateFunctions.addContextToHref($(this), ctx);
			});
		},
        /**
         * If postcode cookie exists, add ctx=pc:3000 to links with class ctx-pc
         */
        addPostcodeContextToLinks: function() {
            $.publish('shopping.pref.retrieve', function(e, postcodeData) {
                if (typeof postcodeData !== 'undefined' && postcodeData != null &&
                    typeof postcodeData.postcode !== 'undefined' && postcodeData.postcode != null)  {
                    var ctx = publicFunctions.buildContext({pc : postcodeData.postcode });
                    $('a.ctx-pc').each(function() {
                        var link = $(this);
                        // we have to add a class to the link to make sure we
                        // don't
                        // add the param twice, as page DOM still remains part
                        // of the page after page change.
                        if (!link.hasClass('ctx-pc-added')) {
                            privateFunctions.addContextToHref(link, ctx);
                            // for smob. adding data-ajax="false" to ensure form
                            // reloads properly
                            // since it's a form post, it shouldn't be captured
                            // in history anyways.
                            link.attr('data-ajax', 'false');
                        }
                    });
                }
            });
        },
		
		/**
         * inserts a banner image on forms that have been properly setup for VOI
         * prepopulation
         */
		legacyDisplayVehicleBanner: function() {
			var ctx = publicFunctions.toJSONFromUrl();
			if (ctx != null && typeof ctx.m !== 'undefined' && ctx.m != null) {
				// consider using ND.Utils.lazyLoadImage
				var $bannerCFF = $('#voi-banner'),
					$data = $('#model-context-banner');
				if ($bannerCFF.size() && $data.size()) {
					var content = JSON.parse($data.html());
					// console.log('legacyDisplayVehicleBanner');
					if (typeof content[ctx.m] !== 'undefined') {
						 var url = content[ctx.m];
						 // console.log('legacyDisplayVehicleBanner: found
                            // url for model[' + ctx.m + ']: ' + url);
						 $bannerCFF.html('<img src="' + url + '" />');
						
					}
				}
			}
		},
		
		/**
         * inserts a derivative disclaimer text on confirmation page that have
         * been properly setup for VOI prepopulation
         */
		legacyDisplayVehicleDisclaimer : function() {
			var ctx = publicFunctions.toJSONFromUrl(),
				$disclaimer = $('#voi-disclaimer');
			if (ctx != null && $disclaimer.size()) {
				var $derivativeData = $('#derivative-context-disclaimer');
				if ((typeof ctx.d !== 'undefined' && ctx.d != null) && $derivativeData.size()) {
					var derivativeDisclaimer = $derivativeData.embeddedData();
					if (derivativeDisclaimer[ctx.d] != null) {
						var disclaimerText = derivativeDisclaimer[ctx.d];
						// console.log('legacyDisplayVehicleDisclaimer: found
                        // disclaimer for derivative[' + ctx.d + ']: ' +
                        // disclaimerText);
						$disclaimer.hide().html(disclaimerText).fadeIn('fast');
					} else {
						publicFunctions.legacyDisplayNameplateDisclaimer(ctx, $disclaimer);
					}
				} else {
					publicFunctions.legacyDisplayNameplateDisclaimer(ctx, $disclaimer);
				} 
			}
		},
		
		/**
         * inserts a disclaimer text for namteplates on confirmation page that
         * have been properly setup for VOI prepopulation
         */
		legacyDisplayNameplateDisclaimer : function(ctx, $disclaimer) {
			var $modelData = $('#model-context-disclaimer');
			if ((typeof ctx.m !== 'undefined' && ctx.m != null) && $modelData.size()) {
				var modelDisclaimer = $modelData.embeddedData();
				if (modelDisclaimer[ctx.m] != null) {
					var disclaimerText = modelDisclaimer[ctx.m];
					// console.log('legacyDisplayVehicleDisclaimer: found
                    // disclaimer for model[' + ctx.m + ']: ' + disclaimerText);
					$disclaimer.hide().html(disclaimerText).fadeIn('fast');
				}
			}
		},
		
		/**
         * Populates nameplate dropdown on any form that has a valid ctx=m:<modelId>
         */
		legacyPopulateModelDropdown: function(select, hiddenInput, modelNameList) {
			var ctx = publicFunctions.toJSONFromUrl(),
				$dd = $('#' + select);
			if (ctx != null && ((typeof ctx.m !== 'undefined' && ctx.m != null) && $dd.length > 0)) {
				var modelName = modelNameList[ctx.m];
				if (modelName && modelName != null) {
					$dd.val(modelName);
					$dd.trigger('change');
					// console.log('setting value of dropdown: ' + select + ' to
                    // ' + modelName);
					var $hi = $('#' + hiddenInput);
					if ($hi.size()) {
						$hi.val(ctx.m);
					}
				}
			}
		},
		
		/**
         * Populates derivative dropdown on any form that has a valid ctx=m:<modelId>;d:<derivativeId>
         */
		legacyPopulateSeriesDropdown: function(select, hiddenInput, derivativeNameList) {
			var ctx = publicFunctions.toJSONFromUrl(),
				$dd = $('#' + select);
			
			if (ctx != null && ((typeof ctx.d !== 'undefined' && ctx.d != null) && $dd.length > 0)) {
				var derName = derivativeNameList[ctx.d];
				if (derName && derName != null) {
					$dd.val(derName);
					$dd.trigger('change');
					// /console.log('setting value of dropdown: ' + select + '
                    // to ' + derName);
					var $hi = $('#' + hiddenInput);
					if ($hi.size()) {
						$hi.val(ctx.d);
					}
				}
			}
		}
		
		
	};
	
	/**
     * Execute voi-prepopulation for web
     */
	$(document).ready(publicFunctions.startUp);
	
	return publicFunctions;
	
})(jQuery);


//Ford chooses to use jQuery tmpl and its associated components under the MIT License.
(function(a){var r=a.fn.domManip,d="_tmplitem",q=/^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,b={},f={},e,p={key:0,data:{}},h=0,c=0,l=[];function g(e,d,g,i){var c={data:i||(d?d.data:{}),_wrap:d?d._wrap:null,tmpl:null,parent:d||null,nodes:[],calls:u,nest:w,wrap:x,html:v,update:t};e&&a.extend(c,e,{nodes:[],parent:d});if(g){c.tmpl=g;c._ctnt=c._ctnt||c.tmpl(a,c);c.key=++h;(l.length?f:b)[h]=c}return c}a.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(f,d){a.fn[f]=function(n){var g=[],i=a(n),k,h,m,l,j=this.length===1&&this[0].parentNode;e=b||{};if(j&&j.nodeType===11&&j.childNodes.length===1&&i.length===1){i[d](this[0]);g=this}else{for(h=0,m=i.length;h<m;h++){c=h;k=(h>0?this.clone(true):this).get();a.fn[d].apply(a(i[h]),k);g=g.concat(k)}c=0;g=this.pushStack(g,f,i.selector)}l=e;e=null;a.tmpl.complete(l);return g}});a.fn.extend({tmpl:function(d,c,b){return a.tmpl(this[0],d,c,b)},tmplItem:function(){return a.tmplItem(this[0])},template:function(b){return a.template(b,this[0])},domManip:function(d,l,j){if(d[0]&&d[0].nodeType){var f=a.makeArray(arguments),g=d.length,i=0,h;while(i<g&&!(h=a.data(d[i++],"tmplItem")));if(g>1)f[0]=[a.makeArray(d)];if(h&&c)f[2]=function(b){a.tmpl.afterManip(this,b,j)};r.apply(this,f)}else r.apply(this,arguments);c=0;!e&&a.tmpl.complete(b);return this}});a.extend({tmpl:function(d,h,e,c){var j,k=!c;if(k){c=p;d=a.template[d]||a.template(null,d);f={}}else if(!d){d=c.tmpl;b[c.key]=c;c.nodes=[];c.wrapped&&n(c,c.wrapped);return a(i(c,null,c.tmpl(a,c)))}if(!d)return[];if(typeof h==="function")h=h.call(c||{});e&&e.wrapped&&n(e,e.wrapped);j=a.isArray(h)?a.map(h,function(a){return a?g(e,c,d,a):null}):[g(e,c,d,h)];return k?a(i(c,null,j)):j},tmplItem:function(b){var c;if(b instanceof a)b=b[0];while(b&&b.nodeType===1&&!(c=a.data(b,"tmplItem"))&&(b=b.parentNode));return c||p},template:function(c,b){if(b){if(typeof b==="string")b=o(b);else if(b instanceof a)b=b[0]||{};if(b.nodeType)b=a.data(b,"tmpl")||a.data(b,"tmpl",o(b.innerHTML));return typeof c==="string"?(a.template[c]=b):b}return c?typeof c!=="string"?a.template(null,c):a.template[c]||a.template(null,q.test(c)?c:a(c)):null},encode:function(a){return(""+a).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;")}});a.extend(a.tmpl,{tag:{tmpl:{_default:{$2:"null"},open:"if($notnull_1){_=_.concat($item.nest($1,$2));}"},wrap:{_default:{$2:"null"},open:"$item.calls(_,$1,$2);_=[];",close:"call=$item.calls();_=call._.concat($item.wrap(call,_));"},each:{_default:{$2:"$index, $value"},open:"if($notnull_1){$.each($1a,function($2){with(this){",close:"}});}"},"if":{open:"if(($notnull_1) && $1a){",close:"}"},"else":{_default:{$1:"true"},open:"}else if(($notnull_1) && $1a){"},html:{open:"if($notnull_1){_.push($1a);}"},"=":{_default:{$1:"$data"},open:"if($notnull_1){_.push($.encode($1a));}"},"!":{open:""}},complete:function(){b={}},afterManip:function(f,b,d){var e=b.nodeType===11?a.makeArray(b.childNodes):b.nodeType===1?[b]:[];d.call(f,b);m(e);c++}});function i(e,g,f){var b,c=f?a.map(f,function(a){return typeof a==="string"?e.key?a.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g,"$1 "+d+'="'+e.key+'" $2'):a:i(a,e,a._ctnt)}):e;if(g)return c;c=c.join("");c.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/,function(f,c,e,d){b=a(e).get();m(b);if(c)b=j(c).concat(b);if(d)b=b.concat(j(d))});return b?b:j(c)}function j(c){var b=document.createElement("div");b.innerHTML=c;return a.makeArray(b.childNodes)}function o(b){return new Function("jQuery","$item","var $=jQuery,call,_=[],$data=$item.data;with($data){_.push('"+a.trim(b).replace(/([\\'])/g,"\\$1").replace(/[\r\t\n]/g," ").replace(/\$\{([^\}]*)\}/g,"{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g,function(m,l,j,d,b,c,e){var i=a.tmpl.tag[j],h,f,g;h=i._default||[];if(c&&!/\w$/.test(b)){b+=c;c=""}if(b){b=k(b);e=e?","+k(e)+")":c?")":"";f=c?b.indexOf(".")>-1?b+c:"("+b+").call($item"+e:b;g=c?f:"(typeof("+b+")==='function'?("+b+").call($item):("+b+"))"}else g=f=h.$1||"null";d=k(d);return"');"+i[l?"close":"open"].split("$notnull_1").join(b?"typeof("+b+")!=='undefined' && ("+b+")!=null":"true").split("$1a").join(g).split("$1").join(f).split("$2").join(d?d.replace(/\s*([^\(]+)\s*(\((.*?)\))?/g,function(d,c,b,a){a=a?","+a+")":b?")":"";return a?"("+c+").call($item"+a:d}):h.$2||"")+"_.push('"})+"');}return _;")}function n(c,b){c._wrap=i(c,true,a.isArray(b)?b:[q.test(b)?b:a(b).html()]).join("")}function k(a){return a?a.replace(/\\'/g,"'").replace(/\\\\/g,"\\"):null}function s(b){var a=document.createElement("div");a.appendChild(b.cloneNode(true));return a.innerHTML}function m(o){var n="_"+c,k,j,l={},e,p,i;for(e=0,p=o.length;e<p;e++){if((k=o[e]).nodeType!==1)continue;j=k.getElementsByTagName("*");for(i=j.length-1;i>=0;i--)m(j[i]);m(k)}function m(j){var p,i=j,k,e,m;if(m=j.getAttribute(d)){while(i.parentNode&&(i=i.parentNode).nodeType===1&&!(p=i.getAttribute(d)));if(p!==m){i=i.parentNode?i.nodeType===11?0:i.getAttribute(d)||0:0;if(!(e=b[m])){e=f[m];e=g(e,b[i]||f[i],null,true);e.key=++h;b[h]=e}c&&o(m)}j.removeAttribute(d)}else if(c&&(e=a.data(j,"tmplItem"))){o(e.key);b[e.key]=e;i=a.data(j.parentNode,"tmplItem");i=i?i.key:0}if(e){k=e;while(k&&k.key!=i){k.nodes.push(j);k=k.parent}delete e._ctnt;delete e._wrap;a.data(j,"tmplItem",e)}function o(a){a=a+n;e=l[a]=l[a]||g(e,b[e.parent.key+n]||e.parent,null,true)}}}function u(a,d,c,b){if(!a)return l.pop();l.push({_:a,tmpl:d,item:this,data:c,options:b})}function w(d,c,b){return a.tmpl(a.template(d),c,b,this)}function x(b,d){var c=b.options||{};c.wrapped=d;return a.tmpl(a.template(b.tmpl),b.data,c,b.item)}function v(d,c){var b=this._wrap;return a.map(a(a.isArray(b)?b.join(""):b).filter(d||"*"),function(a){return c?a.innerText||a.textContent:a.outerHTML||s(a)})}function t(){var b=this.nodes;a.tmpl(null,null,null,this).insertBefore(b[0]);a(b).remove()}})(jQuery);


/**
 * 
 */

//Cookie Object abstraction

ND.cacheStore = {
	get:function(){
		var value = $.trim($.cookie(this.key));
		try {
			return value ? JSON.parse(value) : "";
		} catch (e) {
			return value || "";
		}			
	},
	set:function(value){
		value = $.isPlainObject(value) ? JSON.stringify(value) : value;
		if(this.get() !== value) {
			//Session cookie
			var options = {path:'/'};
			if( this.expires ) {
				options.expires = this.expires; 
			}	
			if(this.domain){
				options.domain=this.domain;
			}			
			$.cookie(this.key, value || null, options);
		}
	},
	is:function(){
		return this.get().length > 0;
	},
	contains:function(value){
		return this.get().indexOf(value) > -1;
	}
};


/* shoppref.js */
/*
 * shoppref.js
 * Author:gbaker 13/12/2011 
 */

/*globals window, document, jQuery, ND, SiteConf */
ND.shoppingPreferenceManager = (function($, undefined){
	
	var 
		/*
		 * The Cookie manager for shopping preferences
		 */
		shoppingPreferenceManager = {
		
			prefix: "shopping.pref.",
	
			/*
			 * List of supported Shopping Preferences, and their short names
			 */
			list: { postcode: "pc", usage: "us", usageLabel: "us.l", region: "rg", regionLabel: "rg.l", pricezone:"pz", pricezoneLabel:"pz.l", priceformatData:"pf" },
			
			/*
			 * Constructor of sorts
			 */
			init: function() {				
				this.cache = {};
				this.store = {};
				this.listen();
				this.upgradeCookie();
			},
			
			/*
			 * Prepare the stores, executed on demand to minise overhead.
			 */
			prepare: function() {
				var self = this;
				var cookieDomain=null;
				var configInfo = (typeof $('#common-config') != 'undefined' && $('#common-config').length > 0) ? JSON.parse($('#common-config').html()) : null;			
				if(configInfo != null && configInfo.cookieDomain){
					cookieDomain=configInfo.cookieDomain;
				}
				$.each( self.list, function(type, typeShort) {
					var value, store;
					
					// Use shortname to keep the cookie small.
					store = Object.create(ND.cacheStore);
					store.key = "sp." + typeShort;
					store.expires = 365;
					if(cookieDomain){
						store.domain=cookieDomain;
					}

					// Cache locally so don't need to grab from the cookie later
					if( value = store.get() ) {
						self.cache[type] = value;
					}
					
					self.store[type] = store;
				});
				
				// When done, erase action
				self.prepare = $.noop;				
			},
			
			/*
			 * Listen to the PUBSUB channel for Shopping Prefenences
			 */
			listen: function() {
				var self = this;
				
				this.pubsub = {
					// Saving Data
					save: function(event, data) {
						data && self.setStoreData( data );
						
						//Broadcast change event (this is confirmed / complete data, as compared to the raw, possible incomplete data from ".save" )
						$.publish( self.prefix + "change", self.getStoreData() );
					},
					// Clear all
					clear: function(event, data) {
						self.clearStoreData();
						
						//Broadcast change event (this is confirmed / complete data, as compared to the raw, possible incomplete data from ".save" )
						$.publish( self.prefix + "change", self.getStoreData() );
					},
					// Retrieve
					retrieve: function(event, fn) {
						$.isFunction(fn) && fn.apply( null, [ event, self.getStoreData() ]);
					},
					//destroy, used by mobile, when changing page.
					destroy: function() {
						self.destroy();
					}
				};

				for( var channel in this.pubsub ) {
					$.subscribe( this.prefix + channel, this.pubsub[channel] );
				}
			},
			
			/*
			 * Get the shopping data
			 */
			getStoreData: function() {
				this.prepare();

				// Return a clone of the cache
				return $.extend( {}, this.cache );
			},
			
			/*
			 * Set the shopping data
			 */
			setStoreData: function( data ) {
				var self = this;
				
				self.prepare();
				
				// Manipulate the data for defaults
				data = this.checkDefaults( data );
				
				// Iterate the data and save it
				data && $.each( data, function(type, value) {
					
					if( type in self.list ) {
						
						// Store in the cookie
						self.store[type].set( value )
						
						// Cache locally so don't need to grab from the cookie later
						if( typeof value !== 'undefined' && String(value).length) {
							self.cache[type] = value;
						} else {							
							delete self.cache[type];
						}
					}
				});
			},
			
			/*
			 * Function to clear the data
			 */
			clearStoreData: function() {
				this.cache = {};
				
				$.each( this.store, function(type, store) {
					store.set();
				});
			},
			
			/*
			 * Function to insist on default values.
			 * Hot Deals, when postcode is provided, a usage is set as default.
			 */
			checkDefaults: function( data ) {
				if( data && data.postcode && !this.cache.usage && !data.usage ) {
					data.usage = 'p';
					data.usageLabel = 'Personal';
				}
				return data;
			},
			
			/*
			 * Function to upgrade the old postcode cookie into the new one.
			 * Can remove this sometime in the future after this has been live for a while.
			 */
			upgradeCookie: function() {
				var polkData, polkStore;
				
				polkStore = Object.create(ND.cacheStore);
				polkStore.key = 'price.usage';
				var configInfo = (typeof $('#common-config') != 'undefined' && $('#common-config').length > 0) ? JSON.parse($('#common-config').html()) : null;			
				if(configInfo != null && configInfo.cookieDomain){
					polkStore.domain=configInfo.cookieDomain;
				}
				
				if( polkData = polkStore.get() ) {
					// Upgrade the cookie
					$.publish( this.prefix + "save", polkData );	
					// Clear the old cookie
					polkStore.set();
				}
			},
			
			
			/*
			 * Cleanup method
			 */
			destroy: function() {
				for( channel in this.pubsub ) {
					$.unsubscribe( this.prefix + channel, this.pubsub[channel] );
				}
				this.cache = this.store = this.pubsub = this.prefix = this.list = null;
			}
			
		};
	
	
	/*
	 * Expose function that creates new shoppingPreferenceManager
	 * - ND.shoppingPreferenceManager 
	 */
	return function( arg ) {
		var manager = Object.create( shoppingPreferenceManager );
		manager.init.call( manager, arg );
		return manager;
	};
	
}(jQuery));


/* mobile-overlay.js */
ND.mobileOverlay = (function($) {
	var $popup=  null;
	var paramData = {};
	var cache = {};
	var overlay = {
		
		init : function(initOptions) {
//			console.log('ND.mobileOverlay');
			var self = this;
			$.subscribe('overlay.launch', function(event, args) {
				paramData = $.extend({}, args);
				self.open();
			});
		},
		
		open : function() {
			
//			console.log('open');
			var self = this;
			
			if (typeof paramData.url !== 'undefined' && paramData.url != '') {
				if (cache[paramData.url] != null) {
					$popup = cache[paramData.url];
					self.launch();
				} else {
//					console.log('found xhr-mobile-hotdeals-form');
					$.mobile.loading('show');
					$.ajax({ url: paramData.url,
					   success: function(data) {
					   	  self.appendToBodyAndCreate(data, paramData);
					   },
					   error: self.error 
				    });
				}
			} else if (typeof paramData.contentId !== 'undefined' && paramData.contentId != null) {
				$popup = $(paramData.contentId);
				if ($popup.length) {
					self.create();
				} else {
					//console.log('cannot find ' + paramData.contentId ); 
				}
				
			}
		},
		
		launch: function() {
			$popup.popup('open');
		},
		
		create: function() {
			var self = this;
//			console.log('create');
			$popup.trigger('create');
			$popup.popup({ history: false });
//				$popup.one('popupafteropen', function( event, ui ) {
//					console.log('popupafteropen.once');
//					
//					if( options.success ) {
//						options.success.call();
//					}
//				});
			
			$popup.on('popupafteropen', function( event, ui ) {
//				console.log('popupafteropen');
				
				//Callback too
				if( paramData.success ) {
//					console.log('$popup.popupafteropen - > call success callback');
					paramData.success.call();
				}
				
				$.subscribeOnce('overlay.hide', self.close);
				//Publish.
				$.publish('overlay.success');
				
				$popup.one('click', '.cancel', function(e) {
					e.preventDefault();
//					console.log('overlay.cancel');
					$.publish('overlay.usercancel');
					return false;
				});
				
			});
			
//			console.log('overlay.success -> popup.open');
			self.launch();
		},
		appendToBodyAndCreate: function(data) {
//			console.log('ND.mobileOverlay.create() -> overlay.success');
			
//			console.log('overlay.success -> create new dom');
			$popup = cache[paramData.url] = $(data);
			$('body').append($popup);
			this.create(data);
			$.mobile.loading('hide');
		},
		
		error: function() {
			cache[paramData.url] = null;
			delete cache[paramData.url];
			$.mobile.loading('hide');
		},
		
		close : function() {
			$popup.popup('close');
//			console.log('overlay.close');
			
		},
		
		destroy: function() {
			$.unsubscribe('overlay.hide');
			if ($popup) {
				$popup.remove();
			}
			$popup = cache = null;
		}
		
	
	};
	
	overlay.init();
	
})(jQuery);


/**
 * @author: Sohrab Zabetian
 * @project: hotdeals
 * @description: use geopostion to find postcode/matching addresses using bing
 * 
 * How to use:
 * 
 *  ND.geoLocator(options).findLocation();
 * 
 * options : {
 * 		success(postcode (number) , address (Array) results for more advanced processing) [required]: when address is found,
 * 		error (error message) [required]: when address is not found,
 * 		enableHighAccuracy [optional, default false],
 *		maximumAge [optional, default 120000], 
 *		timeout[optional, default 60000]
 *	}
 */

ND.geoLocator = function(options) {
	var bingMapGeoLocatorUrl = "http://dev.virtualearth.net/REST/v1/Locations/";

	
	var $bingConfig = $('#bing-config');
	var $currentPositionTranslationConfig = $('#current-position-config');
	var bingMapsKey = "AneS6_OFtD0WZ43Xzp3kTumQpZGNxlycZiFErrnU6cmNmwqKFU3wRBZ7f80Q7MT6";
	if ($bingConfig.length) {
		var bingConfigData = $bingConfig.embeddedData();
		bingMapsKey = bingConfigData['bing-maps-key']; 
	}
	
	var currentPositionTranslationConfigData = {
		"geo-trans-denied-access-error" : "User denied the request for Geolocation",
		"geo-trans-loc-unavail-error" : "Location information is unavailable",
		"geo-trans-req-timeout-error" : "The request to get user location timed out",
		"geo-trans-unknown-error" : "Unknown error"
	};
	
	if ($currentPositionTranslationConfig.length) {
		currentPositionTranslationConfigData = $.extend(currentPositionTranslationConfigData,$currentPositionTranslationConfig.embeddedData());
	}
	
	var generalError = currentPositionTranslationConfigData['geo-trans-unknown-error'];
	var getPostalCodeByCoordinates = function(position) {
		var urlString = bingMapGeoLocatorUrl + position.coords.latitude + ", " + position.coords.longitude;
		$.ajax({
	      url: urlString,
	      dataType: "jsonp",
	      jsonp: "jsonp",
	      //timeout: 12000,
		  data: { key: bingMapsKey },
		  success: function (data) {
			 if (data && data.resourceSets && data.resourceSets.length > 0) {
				var result = data.resourceSets[0];
				if (result && result.estimatedTotal > 0 && result.resources.length > 0) {
					if (options.success) {
						var postcode = result.resources[0].address['postalCode'];
						options.success(postcode, result.resources);
					}
				} else {
//					console.dir(data);
					handleError(generalError);
				}
			 } else {
//				 console.dir(data);
				 handleError(generalError);
			 }
		  },
		  error: function(jqXHR, textStatus, errorThrown){
			  handleError(generalError);
	      }
	   });
	};
	
	var handleError = function(errorMsg) {
		if (options.error) {
			options.error(errorMsg);
		}
	};
	
	/**
	 * @param error.code	short	an enumerated value
	 */
	var locationNotFound = function(error) {
		var tranlatedError = generalError;
		switch(error.code) {
	    	case error.PERMISSION_DENIED:
	    		tranlatedError = currentPositionTranslationConfigData['geo-trans-denied-access-error'];//"User denied the request for Geolocation."
		      break;
		    case error.POSITION_UNAVAILABLE:
		    	tranlatedError = currentPositionTranslationConfigData['geo-trans-loc-unavail-error']; // 'Location information is unavailable.';
		      break;
		    case error.TIMEOUT:
		    	tranlatedError = currentPositionTranslationConfigData['geo-trans-req-timeout-error']; //"The request to get user location timed out."
		      break;
	    }
		
		handleError(tranlatedError);
	};
	
	return {
		findLocation : function() {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					getPostalCodeByCoordinates,
					locationNotFound,{
					enableHighAccuracy : options.highAccuracy || false,
					maximumAge:(options.maxAge || 120000), 
					timeout: (options.timeout || 60000)
					}
				);
			} else {
				handleError(generalError);
			}
		},
		
		locationNotFound: locationNotFound
	};
};


/**
 * @author: szabetian
 * @project: polk
 * @description: helper methods for ND.calcprice
 * 
 * 
 * getprice.js (ND.calcPrice) uses methods in this file to perform various tasks
 * 
 */
ND.polk = {
		/**
		 * Updates the region in the DOM where vehicle prices are displayed.
		 * That subtle color fadding when a panel updates.
		 * 
		 * @param elem
		 * 
		 */
		showChangeVisually : function(elem) {
			//console.log("showChangeVisually()");
			elem.trigger('create');
			var time = 1500,
				bgColor = elem.closest('.need-price').size() ?  
					//Dark Background
					['#185a78', '#111111' ] :
					//Light Background
					['#aad3e6', '#FFFFFF' ];
			
			//Run the animation, start with a solid background colour
			elem.css('backgroundColor', bgColor[0] )
				.delay(time)
				.animate({
						'backgroundColor' : bgColor[1]								
					}, time,  function() {
						$(this).css('backgroundColor', 'transparent');
					});		
		},
		
		renderDerivative : function(housing, prevPrice, hotDealLocationToAppend, render, renderHotdeals, hotDealClass) {
			
					
			//Either replace or inject a new price
			if( prevPrice.length ) {
				prevPrice.replaceWith( render );
				
			} else {
				housing.prepend( render );
			}
			
			var prevHotDeal = hotDealLocationToAppend.find(hotDealClass);
			if (prevHotDeal.length > 0) {
				prevHotDeal.replaceWith(renderHotdeals);
			} else {
				hotDealLocationToAppend.append(renderHotdeals);
			}					
			
		},

		notifyChange: function (housing) {
		    housing.find('.price').remove();
		    housing.parent().find('.loan-calc').hide();
		},
		
		registerLoanBtn: function (hotDealLocationToAppend, price, priceformatter, location) {

		    if ($('.loan-calc', hotDealLocationToAppend).length > 0) {
		        $('.loan-calc', hotDealLocationToAppend).css('display', 'inline-block');
		        $('.loan-calc', hotDealLocationToAppend).off('click').on('click', function (e) {
		            e.preventDefault();
		            $(this).loanCalculatorOverlay({
		                price: price,
		                priceformatter: priceformatter,
		                location: location,
		                url: $(this).attr('data-url'),
		                complete: function () {
		                    $('.ui-popup-active input').val('');
		                }
		            });
		        });
		    }

		},

		bindAdditionalListeners: function(form) {
			//console.log('ND.polk.bindAdditionalListeners ' + form);
			var doesCurrentLocationButtonExist = $('input.polk-form-currentLocation').length > 0 ;
			if (doesCurrentLocationButtonExist) {
				$(document).on('click', 'input.polk-form-currentLocation', function( e ) {
					
					e.preventDefault();
					$.publish('loading.calculateprice.dfy', true);
					
					setTimeout(function() {
	//					console.log('setTimeout');
						$.publish('loading.calculateprice.dfy', false);
	//					geoLocator.locationNotFound(1);
					}, 10000);
					
					var geoLocator = ND.geoLocator({
						success: function(postcode) {
	//						clearTimeout(timeout);
							//console.log('success: clearTimeout');
							$.publish('loading.calculateprice.dfy', false);
							//console.log('Found postcode ' + postcode);
							var input = $(form).find('[name=postcode]');
							//console.log('input.length ' + input.length);
							var $form = $(form);
							$form.find('[name=postcode]').val(postcode);
							$form.submit();
						},
						error: function(message) {
	//						clearTimeout(timeout);
							//console.log('error: clearTimeout');
							$.publish('loading.calculateprice.dfy', false);
							$.publish('usererror.calculateprice.dfy', message);
						},
						maximumAge: 10000,
						timeout: 10000
					});
					geoLocator.findLocation();
					
					
				});
			}
		},
		
		
		/**
		 * Callback function after postcode is changed to style the newly injected DOM
		 * Do not delete
		 */
		templateUpdated: function(elem) {
			//console.log('templateUpdated');
			//trigger element creation in jquery mobile
			elem.trigger('create');
		}
};



// Requires json2.js 
/*globals window, document, jQuery, ND, SiteConf */
(function($, undefined){

	var // Conf
		config = {},
		
		// Pubsub
		suffix = ".calculateprice.dfy",
		
		// Module exports 
		exports = {},
		exportsAPI = {},
		
		//not to be exposed
		internalAPI = {overlayLaunched : false};
		

		/*
		 * Object: priceUpdater
		 * 
		 * Managers the derivatives on the page that need a price.
		 *
		 * <div class="derivative-price {'derivativeid':'123412341234'}">
		 * 		<span class="price">$$$$$</span>
		 * </div>
		 */
		priceUpdater = exports.PriceUpdater = (function(){

		    var derivatives,
				defaults = {
				    priceClass: '.price',
				    hotDealClass: '.latest-offer',
				    loanCalcClass:'.loan-calc',
				    priceContainer: ".derivative-price",
				    tmpl: "#tmpl-price-main",
				    hotDealTmpl: '#tmpl-price-hotdeal-main',
				    noPriceTmpl: "#tmpl-noprice-main"
				},
                modelId = null;
			
			//Private Function
			//Store the derivative DOM elements for later recall
			function mapDerivatives( elements, priceHTML ){
			    derivatives = {};
				$( elements ).each(function( i, e ){
					var elem = $(e),
						metadata = elem.data('derivativeid');
					    
					//Read meta data and use derivativeid as key for storage
					if( metadata ) {
						derivatives[metadata] = elem;
					}
					if (!modelId && elem.data('modelid')) {
					    modelId = elem.data('modelid');
					}
				});
				return derivatives;
			}
			
			function getPriceFormatter(callback) {
			    if (config.priceformatter !== null) {
			        if (typeof callback !== 'undefined') {

			            if ($.isFunction(callback)) {
			                callback();
			            }
			        }
			    }
			    else {
			        priceUserDataManager.initPriceFormatter();
			        if ($.isFunction(callback)) {
			            callback();
			        }
			    }
			}

			//Return Obj with public methods
			return {
				init:function(elements, options){
					var that = this; 
					
					this.options = options = $.extend({}, defaults, options);
					//Store the derivative DOM elements for later recall
					mapDerivatives(this.options.priceContainer);

					//Compile main price template
					this.tmpl = $(this.options.tmpl).template();
					var $hotdealTemplate = $(this.options.hotDealTmpl);
					if ($hotdealTemplate.length > 0) {
						this.hotDealTmpl = $(this.options.hotDealTmpl).template();
					}
					//Listen to change postcode event
					$.subscribe('userchange' + suffix, function(){
						//Notify the price updater that there is impending change to prices.
						that.notifyChange();
					});
					
				},
				list: function(){
					var ret = [];
					//Create a arr of derivative ids (posted to the server web service eventually)
					$.each(derivatives, function(key, obj){
						ret.push(key);
					});
					return ret;
				},
				update:function(prices, visual){
//					console.log('priceUpdater.update()');
					var that = this;
					
					visual = visual === undefined || visual;
					
					if(derivatives) {
						
						//Just in case
						that.notifyChange();
						
					    //Loop prices returned from web service
						getPriceFormatter(function () {
						    $.each(prices, function (id, derivative) {
						        var housing = derivatives[id],
                                    prevPrice,
                                    hotDealLocationToAppend,
                                    render;

						        //Ensure the id from the prices array matches an id in the derivatives DOM storage 
						        //and that there is a displayPrice to inject
						        if (housing && derivative.displayPrice) {

						            prevPrice = housing.find(that.options.priceClass);

						            //Format price for each derivative for GUX
						            if (typeof guxApp !== 'undefined') {
						            	derivative.price = guxApp.priceFormatter.format(derivative.price);
						            }

						            //Render the template with the price data
						            render = $.tmpl(that.tmpl, derivative);


						            //for mobile we need to render the dom differently.
						            if (typeof ND.polk.renderDerivative !== 'undefined') {

						                var $liParent = housing.parents('li').filter(':visible');
						                if ($liParent != null && $liParent.length > 0) {
						                    hotDealLocationToAppend = $($liParent[0]);
						                } else {
						                    hotDealLocationToAppend = housing.parent().parent();
						                }
						                renderHotdeals = $.tmpl(that.hotDealTmpl, derivative);
						                ND.polk.renderDerivative(housing, prevPrice, hotDealLocationToAppend, render, renderHotdeals, that.options.hotDealClass);

						                if (typeof ND.polk.registerLoanBtn !== 'undefined') {
						                    ND.polk.registerLoanBtn(hotDealLocationToAppend, derivative.price, config.priceformatter, priceUserDataManager.locationValue());
						                }

						            } else {

						                //Either replace or inject a new price
						                if (prevPrice.size()) {
						                    prevPrice.replaceWith(render);
						                } else {
						                    if (housing.find('style').length>0) {
						                        housing.find('style').remove();
						                    }
						                    if (housing.find(that.options.loanCalcClass).length > 0) {
						                        housing.find(that.options.loanCalcClass).parent().remove();
						                    }
						                    housing.prepend(render);
						                }

						                $(that.options.loanCalcClass, housing).off('click').on('click', function (e) {
						                    e.preventDefault();
						                    $(this).loanCalculatorOverlay({
						                        price: derivative.price,
						                        priceformatter: config.priceformatter,
						                        location: priceUserDataManager.locationValue()
						                    });
						                });
						            }

						            if (visual) {
						                //console.log('init-> ND.polk.showChangeVisually');
						                ND.polk.showChangeVisually(housing.find(that.options.priceClass));
						            }
						            
						        }
						    });

						    if ($(that.options.noPriceTmpl).length) {
						        var nopricerender = $(that.options.noPriceTmpl).html();
						        $('.body.derivative-price').each(function (i, de) {
						            if ($(de).find('.price').length === 0) {
						                $(de).prepend(nopricerender);
						            }
						        });
						    }
							//latest offer img be publishable in model enhance detail page
							var container = $(".model-enhance .attribute-bar"),
									urls=$('#price-urls').embeddedData();
							if(container.length&&$("a.offers", container).length&&urls&&urls['latest-offer-backimg']) {
								$("a.offers", container).attr("style","background-image:url("+urls['latest-offer-backimg']+")");							
							}
							//extent model content if hot deal exists
							if($(".model-content.body.derivative-price").length && $(".model-content.body.derivative-price a.offers").length) {
								$(".model-content.body.derivative-price").addClass("extend");
							}

						});
						
					} else {
						$.publish('error' + suffix, "ND.PriceUpdater: Could not update Dom");
					}			
				},
				notifyChange: function() {
					var that = this;
					
					if( derivatives ) {
						//OMG get them prices down incase there is a timeout or an error or sometrihngf.asd fasdf !!!!! ARGH!.
					    $.each(derivatives, function (id, housing) {
					        if (typeof ND.polk.notifyChange !== 'undefined') {
					            ND.polk.notifyChange(housing);
					        }
					        else {
					            housing.find(that.options.priceClass).remove();
					            housing.find(that.options.loanCalcClass).parent().remove();
					        }
						});
					}
				},
				modelId: function () {
				    return modelId;
				}
			};
		}()),
		
		/*
		 * Object: priceUserDataManager
		 * 
		 * Managers the overlay and events around the user entering there postcode to get prices.
		 *
		 * <div class="derivative-price {'derivativeid':'123412341234'}">
		 * 		<span class="price">$$$$$</span>
		 * </div>
		 */
		priceUserDataManager = exports.userDataManager = (function(){
			
			//Private Variables
			var userData,
				defaults,			
				derivativeList,
                regionalPriceData,
				formError,
				$form = null,
				defaultFormErrorMsg = null,
				fromCookie;
		
			//Module defaults
			defaults = {
			    formid: '#calc-price-user',
			    regionformid:'#regional-price-user',
				needprice:'.need-price',
				getpostcodeusage:'.get-postcode-usage',
				tmpl:'#tmpl-price-links'
			};
			
			//Private Functions
			
			//Get Prices from web service
			function getPrices() {
				var payload = $.extend( userData, { "derivatives": derivativeList } );
				$.publish('userchange' + suffix, { "payload": payload });				
			}
			
			//Check for persistant user userData, this function is only used on page Load.
			function checkData() {
				userData = loadData();
				
				if (userData && (userData.postcode || userData.pricezone) && userData.usage) {
					fromCookie = true;
					getPrices();
				} else {
					userData = null;
				}
				return userData;
			}

			//Clear for persistant user userData (usaually because of an error)
			function clearData() {
				$.publish( "shopping.pref.clear" );
				userData = null;
			}
			
			function storeData() {
				$.publish( "shopping.pref.save", userData );
			}
			
			function loadData() {
				function userDataPubSubHandler(e, retrieveData) {
					userData = retrieveData;
				}
				// Right now
				$.publish( "shopping.pref.retrieve", userDataPubSubHandler); 
				
				return userData;
			}
			
			//Function to get and set the user userData
			function getterSetterData(postcode, usage, usageLabel, pricezone,pricezoneLabel,priceformatData) {
				if(arguments.length >= 2) {
					userData = {
						"postcode":postcode,
						"usage":usage,
						"usageLabel": usageLabel,
						"pricezone": pricezone,
						"pricezoneLabel": pricezoneLabel,
						"priceformatData": priceformatData
					};
				}
				return userData;
			}
			
			function overlaySuccessPopulateForm(options) {
			    var form = $(options.formid);
			    if (config.isPricezone) {
			        if (!regionalPriceData) {
			            var regiondata = $('#regional-price-json');
			            if (regiondata.length > 0) {
			                regionalPriceData = regiondata.embeddedData();
			            }
			        }
			        //console.log(regionalPriceData);

				    if (form.size() && typeof userData !== 'undefined' && userData != null &&
                        userData.pricezone != null && userData.pricezone !== '' && userData.usage != null && userData.usage !== '') {


				        //form.find('select[name=pricezone]').val(userData.pricezoneLabel).select();
				        for (var regionName in regionalPriceData) {
				            if (regionName && regionalPriceData[regionName]) {
				                var gotRegion = false;
				                $.each(regionalPriceData[regionName], function (i, region) {
				                    if (region.id === userData.pricezone) {
				                        form.find('select[name=pricezone]').val(regionName).select();
				                        gotRegion = true;
				                        return false;
				                    }
				                });
				                if (gotRegion) {
				                    break;
				                }
				            }
				        }
				        
				        var $usage = form.find('input[name=usage]');
				        if ($usage.length) {
				            $usage.filter('[value=' + userData.usage + ']')[0].checked = true;
				        }

				        if ($.mobile) {
				            form.find('select[name=pricezone]').selectmenu('refresh');
				            $usage.checkboxradio('refresh');
				        }
				    }				    
				}
				else {				    
				    if (form.size() && typeof userData !== 'undefined' && userData != null &&
                        userData.postcode != null && userData.postcode !== '' && userData.usage != null && userData.usage !== '') {
				        form.find('input[name=postcode]').val(userData.postcode).select();
				        var $usage = form.find('input[name=usage]');
				        if ($usage.length) {
				            $usage.filter('[value=' + userData.usage + ']')[0].checked = true;
				        }


				    }
				}
			}
            			
			//Function to get and set the user userData
			function asyncUserData(options, change) {
				var userDataChangeEvent = 'userchangesuccess' + suffix,
					userCancelOverlay = 'overlay.usercancel',
					callbacks = [],
					doneCallback;						
				
				//This function is called during events other than page load.
				fromCookie = false;
				
				//Special for Flash
				if( $.isPlainObject( options ) ) {  
					
					if( $.isFunction( options.complete ) ) {
						callbacks.push(options.complete);					
					}
					
					//isFlash implied
					if( options.flashid ) {
										
						callbacks.push(function() {
							//Line of code mutated original from jQuery.swfobject
							var toSend, elem = $('#'+options.flashid).find('object').andSelf().filter('object').get(0);
							
							try {
								//Use External JavaScript API which should be exposed by the Flash Application
								toSend = $.extend({}, userData);
								if( toSend.derivatives ) {
									delete toSend.derivatives;
								}
								elem.message('postcode', JSON.stringify(toSend));							
							} catch( e ) {
								//console.log( "Error messaging flash id = " + options.flashid );						
							}
						});
						
					}
				}

				if ((config.formURL || config.regionformURL) && (change || !userData)) {
					
					//Complete
					doneCallback = function() {
						$.unsubscribe(userDataChangeEvent, doneCallback);
						$.unsubscribe(userCancelOverlay, doneCallback);
						$.each(callbacks, function(i, fn) {
							fn.apply(fn, [loadData()]);
						});
					};				
					$.subscribe(userDataChangeEvent, doneCallback);
					$.subscribe(userCancelOverlay, doneCallback);
						
					//Launch overlay for GUX
					if (typeof guxApp !== 'undefined') {
						$.publish('overlay.launchgux', {
						    url: config.isPricezone?config.regionformURL:config.formURL,
							positionType:'window',
							name: "POLK Select Postcode", 
							success : function() {
								internalAPI.overlayLaunched = true;
							}
						});
					} else {
						$.publish('overlay.launch', {
						    url: config.isPricezone?config.regionformURL:config.formURL,
							positionType:'window',
							name: "POLK Select Postcode", 
							success : function() {
								internalAPI.overlayLaunched = true;
							}
						});
					}
					
				} else {
					$.each(callbacks, function(i, fn) {
						fn.apply(fn, [loadData()]);
					});
				}
				
			}
			
			/* Expose API method to Flash
			 * 
			 * Default usage 
			 * requestChangePriceUserData( {
			 * 		flashid:'flashid',
			 * 		complete: function() { .. }
			 * );
			 * 
			 * From Flash
			 * requestChangePriceUserData( 'flashid', true, function() { .. })
			 */
			exportsAPI.requestPriceUserData = function(optionsOrString, isFlash, complete, change) {
				
				if( isFlash && typeof optionsOrString == "string" ) {
					optionsOrString = {"flashid":optionsOrString};
					optionsOrString.complete = complete;
				}
				
				asyncUserData(optionsOrString, change);
			};

			/*
			 * Add some curry, Expose another API method to Flash
			 */
			exportsAPI.requestChangePriceUserData = function(optionsOrString, isFlash, complete) {
				exportsAPI.requestPriceUserData(optionsOrString, isFlash, complete, true);
			};
			
			/*
			 * Sohrab: Add some soup, Expose another API method for build and price
			 * 
			 * must pass a callback function as options.complete to handle result
			 */
			exportsAPI.requestChangePriceBuildAndPrice = function(options, change) {
				exportsAPI.isBuildAndPrice = ND.API.isBuildAndPrice = true;
				config.isPricezone=false;
				asyncUserData(options, change);
			};
			
			/*
			 * Sohrab: Ask the service to read the cookie and return the values
			 * 
			 */
			exportsAPI.requestCookieValuesBuildAndPrice = function(options) {
				if (options.complete) {
					$.publish( "shopping.pref.retrieve", function(e, userData) {
						options.complete.apply(options.complete, [userData]);
					}); 
				}
			};
			
			function listenForm(form){
				
				ND.polk.bindAdditionalListeners(form);
				
				//Listen for form events
				$( document ).off( 'submit', form).on( 'submit', form,  function(e) {

					var $form = $(this), postcode, usage, jUsage, usageLabel, pricezone, pricezoneLabel, pricezoneValue;
					
					working = false;
					e.preventDefault();
					//console.log('listenForm-> form submit');
					//grab local 
					postcode = $form.find('[name=postcode]').val();
					jUsage = $form.find('[name=usage]:checked');
					usage = jUsage.val();
					pricezoneValue = $form.find('[name=pricezone]').val();
					pricezoneLabel = $form.find('[name=pricezone]').find('option:selected').text();

					
				    //Validate Form
					if (config.isPricezone) {
					    if ($.trim(pricezoneValue).length > 0 && usage && regionalPriceData && regionalPriceData[pricezoneValue]) {
					        var priceformatData;
					        $.each(regionalPriceData[pricezoneValue], function (i, region) {
					            if (region.type === usage) {
					                pricezone = region.id;
					                config.priceformatter = ND.PriceFormatter;
					                config.priceformatter.initialise({
					                    data: region.priceFormat,
					                    formatString: region.currencySymbol,
					                    centsSeparator: region.monetaryDecimalSeparator,
					                    thousandsSeparator: region.groupingSeparator
					                });
					                priceformatData = region.priceFormat + "|" + region.currencySymbol + "|" + region.monetaryDecimalSeparator + "|" + region.groupingSeparator;
					                return false;
					            }
					        });
					        usageLabel = $("[for=" + jUsage.attr("id") + "]").attr('title');
					        getterSetterData(postcode, usage, usageLabel, pricezone, pricezoneLabel,priceformatData);
					        getPrices();
					    } else {
					        $.publish('usererror' + suffix);
					    }
					}
					else {
					    if ($.trim(postcode).length === 4 && !isNaN(postcode) && usage) {


					        usageLabel = $("[for=" + jUsage.attr("id") + "]").attr('title');

					        getterSetterData(postcode, usage, usageLabel);
					        getPrices();

					    } else {
					        $.publish('usererror' + suffix);
					    }
					}


					return false;
				});
				
				
			}
			
			
			//Clear for persistant user userData on error
			//$.subscribe('error' + suffix, clearData);
			
			
			//Return Obj with public methods
			return {
				init:function(dlist, options){
					var that = this;
					
					userData = null;
				
					that.options = options = $.extend({}, defaults, options, { formid: config.isPricezone ? defaults.regionformid : defaults.formid });
					
					//The housing for Need Price
					that.needprice = $(options.needprice);
					
					//Setup click events
					that.needprice.on( 'click', options.getpostcodeusage, function(e){
						e.preventDefault();
						asyncUserData(null, true);
					});
					
					//Store derivative array
					derivativeList = dlist;
					
					
					//Enable listening to the form submit events
					listenForm( options.formid );
					
					//Compile main price template
					that.tmpl = $(options.tmpl).template();

					//Listen to change postcode event
					$.subscribe('userchange' + suffix, function(event, data){
						//Notify the price updater that there is impending change to prices.
//						console.log('load in progress');
//						that.update({
//							loading:'true'
//						});
					});
			
						
					//Listening for the if the form is existing, the data will popup
					$.subscribe('overlay.success', function(){
						//overlaySuccessPopulateForm(options.formid);
						overlaySuccessPopulateForm(options);
						ND.polk.bindAdditionalListeners(options.formid);
					});
					
					//used for mobile to unsubscribe events and remove listeners
					$.subscribe('destroy' + suffix, function() {
						//console.log('ND.CalcPrice.destroy');
						for( var channel in that.pubsub ) {
							$.unsubscribe( channel + suffix, that.pubsub[channel] );
						}
						
						$( document ).off('submit', $(that.options.formid));
						that.needprice.off( 'click', that.options.getpostcodeusage);
						that.needprice.empty();
						
					});
					
					
					if (derivativeList.length === 0) {
						return;
					}
					//Check if the page load data exists
					if(!checkData()) {
						//There was no data so initialise the "Want to see prices"
						that.update();
					}

			
				},
				initPriceFormatter: function () {
				    if (userData && userData.priceformatData && config && !config.priceformatter && ND.PriceFormatter) {
				        var pfdata = userData.priceformatData.split('|');
				        if (pfdata.length === 4) {
				            config.priceformatter = ND.PriceFormatter;
				            config.priceformatter.initialise({
				                data: pfdata[0],
				                formatString: pfdata[1],
				                centsSeparator: pfdata[2],
				                thousandsSeparator: pfdata[3]
				            });
				        }
				    }
				},

				update:function(otherData, visual){
//					console.log('priceUserDataManager.update()');
					var that = this, render,
						//Use the error data or the postcode data in the tmpl
						tmplData = otherData || userData;
					
					if( that.needprice ) {
						
						//Render the tempalte with user data
						render = $.tmpl(that.tmpl, tmplData);
						
						if( that.previousLinks && that.previousLinks.length ) {

							//Replace It (had an issue with $.fn.replaceWith function)
							that.previousLinks.remove();
							that.needprice.append(render);
							that.previousLinks = render;
							
						} else {
							
							//Inject a new element
							if (typeof guxApp !== 'undefined') {
								that.needprice.html(render);
							} else {
								that.needprice.append(render);
							}
							that.previousLinks = render;
							
						}
						
						if( visual && !fromCookie) {
							// Was getting the following error. "Error: uncaught exception: [Exception... "Could not convert JavaScript argument arg 0 [nsIDOMViewCSS.getComputedStyle]"  nsresult: "0x80570009 (NS_ERROR_XPC_BAD_CONVERT_JS)"  location: "JS frame :: http://ftd-trunk-carve.local/themes/ftd/js/live/dev.debug.js :: anonymous :: line 5491"  data: no]"
							// So I get the element in a new jQuery selection
							ND.polk.showChangeVisually($(that.previousLinks.get(0)));
						}
						
						ND.polk.templateUpdated(that.needprice);
					}				
				},
				visualUpdate: function( otherData ) {
//					console.log('priceUserDataManager.visualUpdate()');
					this.update( otherData, true );
				},
				fromCookie: function() {
					return !!fromCookie;
				},
				//error validation
				displayMsg: function(msg) {
					$form = $(priceUserDataManager.options.formid);
					formError = $form.find('.error');
					

					
					
					if (defaultFormErrorMsg == null) {
						defaultFormErrorMsg = $form.find('#standard-error').text();
					}
					formError.text(msg ? msg : defaultFormErrorMsg);
					formError.filter(":hidden").slideDown('fast');
				},
				loading: function(show) {
					$form = $(priceUserDataManager.options.formid);
					if (show) {
						$form.find('.error').hide();
						$form.find('.loading').filter(":hidden").slideDown('fast');
						$form.find('button[type=submit]').attr('disabled', true);
					} else {
						$form.find('.loading').hide();
						$form.find('button[type=submit]').removeAttr('disabled');
					}
					
				},
				locationValue: function () {
				    if (userData) {
				        if (config.isPricezone) {
				            return userData.pricezoneLabel + ' ' + userData.usageLabel;
				        }
				        else {
				            return userData.postcode + ' ' + userData.usageLabel;
				        }
				    }
				    return '';
				},
				getData: loadData,
				setData: storeData
			};
		
		}()),	// end priceUserDataManager
		
	
		/*
		 * Global Pubsub channels for this module
		 */
		pubsub = {
		
			/* Subscribe
			 * @input Object - {"postcode": "3000","usage": "p"}
			 * eg. $.publish('userchange.calculateprice.dfy', {"postcode": "3000","usage": "p"});
			 */	
			userchange: function(event, data){
				
				//Integritry Check
			    if (!config.dataURL && !config.isPricezone) {
					$.publish('error' + suffix, 'There was a problem.');
					//console.log("Missing config.dataURL");
					return;
				}
				
				
				function error( text ) {
					$.publish('change' + suffix, {error:true, errorMessage:'System error.'});
					$.publish('error' + suffix, text);
				}

				
				if( data && data.payload ) {
					priceUserDataManager.loading(true);
					//If there is no derivatives on the page. Skip the AJAX call
//					if ( data.payload.derivatives && data.payload.derivatives.length ) {
				    //We have enough information to calculate the prices

					if (config.isPricezone) {
					    
					    if ($('#rest-services').length > 0) {
					        var dataURL = $('#rest-services').embeddedData()['pricezone.derivatives'];
					        if (dataURL) {
					            $.ajax({
					                type: 'GET',
					                url: dataURL.replace('{site}', config.site).replace('{pricezoneId}', data.payload.pricezone).replace('{modelId}', priceUpdater.modelId()),
					                dataType: 'json',
					                complete: function (xhr, text) {
					                    $.publish('get' + suffix, text);
					                },
					                success: function (data) {
					                    var results = {};
					                    if (data && data.length > 0) {
					                        if (!config.priceformatter) {
					                            priceUserDataManager.initPriceFormatter();
					                        }
					                        var list = $.map(data, function (d) {
					                            if (!d.displayPrice) {
					                                if (config.priceformatter) {
					                                    d.displayPrice = config.priceformatter.format(d.price);
					                                }
					                            }
					                            return d;
					                        });
					                        results.error = false;
					                        results.derivatives = list;
					                    }
					                    else {
					                        results.error = true;
					                        results.errorMessage = $('form.calc-price-user p.error').html();
					                    }
					                    $.publish('change' + suffix, results);
					                },
					                error: function (xhr, text) {
					                    error(text);
					                }
					            });
					        }
					    }
					}
					else {

					    $.ajax({
					        type: 'POST',
					        url: config.dataURL,
					        cache: false,
					        headers: {
						        'Cache-Control': 'no-cache'
						    },
					        data: {
					            "data": JSON.stringify(data.payload)
					        },
					        complete: function (xhr, text) {
					            $.publish('get' + suffix, text);
					        },
					        success: function (data) {
					            $.publish('change' + suffix, data);
					        },
					        error: function (xhr, text) {
					            error(text);
					        },
					        dataType: 'json'
					    });
					}


//					} else {
//						$.publish('change' + suffix);
//					}
			
				} else {
					error("no payload");
				}
			},
			
			/*
			 * Subscribe Price changes
			 */
			change: function(event, data){
				data = data || {};
				priceUserDataManager.loading(false);
				//Data Integrity check
				if( !data.error ) {
					
					$.publish('userchangesuccess' + suffix, data);

					//hide the overlay only if polk overlay is open.
					if (internalAPI.overlayLaunched) {
						//Hide overlay for GUX
						if (typeof guxApp !== 'undefined') {
							$.publish('overlay.hidegux');
						} else {
							$.publish('overlay.hide');
						}
					}
					
				} else {
					
					//Update with the error data (Normalise the error).
					//priceUserDataManager.visualUpdate({error:data.errorMessage});
					//priceUpdater.notifyChange();
					$.publish('usererror' + suffix, data.errorMessage || 'Error');
				}
				
			},
			
			userchangesuccess: function(event, data) {
				//Normalise the prices object for ND.priceUpdater
				var prices = {};
				$.each(data.derivatives || [], function(i, obj){
					prices[obj.id] = obj;
				});
				
				//Update the disclaimer links
				priceUserDataManager.visualUpdate();
				
				//Update the prices on the page
				priceUpdater.update(prices, !priceUserDataManager.fromCookie());
				priceUserDataManager.setData();
			},
			
			usererror: function(event, data){
				//console.log('usererror: ' + data);
				priceUserDataManager.displayMsg(data );
				
			},
			
			loading: function(event, data) {
				//console.log('loading: show: ' + data);
				priceUserDataManager.loading(data);
			}
			
		};			

	// Initalise pubsub!
	for( var channel in pubsub ) {
		$.subscribe( channel + suffix, pubsub[channel] );
	}
	
	// Dynamic confi URLs
	exports.conf = function(obj) {
		var urls = obj || $('#price-urls').embeddedData();
		config.dataURL = urls['xhr-calcprice-data'] || config.dataURL;
		config.formURL = urls['xhr-calcprice-form'] || config.formURL;

		config.regionformURL = urls['xhr-regionalprice-form'] || config.regionformURL;
		config.isPricezone = (config.regionformURL && config.regionformURL.length > 0);

		config.site = $('#common-config').embeddedData().site;
		config.priceformatter = null;
	};
	
	// Constructor of sorts
	exports.init = function() {
		//console.log('ND.CalcPrice.init()');
		this.conf();
		// Init Dynamic URLs AND (Check make sure not in test suite);
		if ((!config.isPricezone && !config.dataURL && !config.formURL) || (config.isPricezone && !config.regionformURL)) {
			return; 
		}
		
		//Objects are singleton (single-use-only)
		priceUpdater.init();
		var derivativeList = priceUpdater.list();
		priceUserDataManager.init(derivativeList);
	};
	
	/* end */
	
	//Expose Price Calculator
	ND.CalcPrice = exports;

	//Expose Price Calculator API methods
	ND.API = $.extend(ND.API, exportsAPI);
	
}(jQuery));


//     Underscore.js 1.4.4
//     http://underscorejs.org
//     (c) 2009-2013 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var push             = ArrayProto.push,
      slice            = ArrayProto.slice,
      concat           = ArrayProto.concat,
      toString         = ObjProto.toString,
      hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.4.4';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      for (var key in obj) {
        if (_.has(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) return;
        }
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results[results.length] = iterator.call(context, value, index, list);
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    return _.filter(obj, function(value, index, list) {
      return !iterator.call(context, value, index, list);
    }, context);
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs, first) {
    if (_.isEmpty(attrs)) return first ? null : [];
    return _[first ? 'find' : 'filter'](obj, function(value) {
      for (var key in attrs) {
        if (attrs[key] !== value[key]) return false;
      }
      return true;
    });
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.where(obj, attrs, true);
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See: https://bugs.webkit.org/show_bug.cgi?id=80797
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = {computed : -Infinity, value: -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed >= result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = {computed : Infinity, value: Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Shuffle an array.
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    return _.isFunction(value) ? value : function(obj){ return obj[value]; };
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, value, context) {
    var iterator = lookupIterator(value);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value : value,
        index : index,
        criteria : iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index < right.index ? -1 : 1;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(obj, value, context, behavior) {
    var result = {};
    var iterator = lookupIterator(value || _.identity);
    each(obj, function(value, index) {
      var key = iterator.call(context, value, index, obj);
      behavior(result, key, value);
    });
    return result;
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = function(obj, value, context) {
    return group(obj, value, context, function(result, key, value) {
      (_.has(result, key) ? result[key] : (result[key] = [])).push(value);
    });
  };

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = function(obj, value, context) {
    return group(obj, value, context, function(result, key) {
      if (!_.has(result, key)) result[key] = 0;
      result[key]++;
    });
  };

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = iterator == null ? _.identity : lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely convert anything iterable into a real, live array.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n != null) && !guard) {
      return slice.call(array, Math.max(array.length - n, 0));
    } else {
      return array[array.length - 1];
    }
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {
    each(input, function(value) {
      if (_.isArray(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Return a completely flattened version of an array.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(concat.apply(ArrayProto, arguments));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var args = slice.call(arguments);
    var length = _.max(_.pluck(args, 'length'));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(args, "" + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, l = list.length; i < l; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, l = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, l + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < l; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(len);

    while(idx < len) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    var args = slice.call(arguments, 2);
    return function() {
      return func.apply(context, args.concat(slice.call(arguments)));
    };
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context.
  _.partial = function(func) {
    var args = slice.call(arguments, 1);
    return function() {
      return func.apply(this, args.concat(slice.call(arguments)));
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) funcs = _.functions(obj);
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  _.throttle = function(func, wait) {
    var context, args, timeout, result;
    var previous = 0;
    var later = function() {
      previous = new Date;
      timeout = null;
      result = func.apply(context, args);
    };
    return function() {
      var now = new Date;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, result;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) result = func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(context, args);
      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func];
      push.apply(args, arguments);
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    if (times <= 0) return func();
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys[keys.length] = key;
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var values = [];
    for (var key in obj) if (_.has(obj, key)) values.push(obj[key]);
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var pairs = [];
    for (var key in obj) if (_.has(obj, key)) pairs.push([key, obj[key]]);
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    for (var key in obj) if (_.has(obj, key)) result[obj[key]] = key;
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] == null) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the Harmony `egal` proposal: http://wiki.ecmascript.org/doku.php?id=harmony:egal.
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Objects with different constructors are not equivalent, but `Object`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                               _.isFunction(bCtor) && (bCtor instanceof bCtor))) {
        return false;
      }
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    var accum = Array(n);
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named property is a function then invoke it;
  // otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return null;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name){
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    var render;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

}).call(this);


//     Backbone.js 0.9.2

//     (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

(function(){

  // Initial Setup
  // -------------

  // Save a reference to the global object (`window` in the browser, `exports`
  // on the server).
  var root = this;

  // Save the previous value of the `Backbone` variable, so that it can be
  // restored later on, if `noConflict` is used.
  var previousBackbone = root.Backbone;

  // Create a local reference to array methods.
  var array = [];
  var push = array.push;
  var slice = array.slice;
  var splice = array.splice;

  // The top-level namespace. All public Backbone classes and modules will
  // be attached to this. Exported for both CommonJS and the browser.
  var Backbone;
  if (typeof exports !== 'undefined') {
    Backbone = exports;
  } else {
    Backbone = root.Backbone = {};
  }

  // Current version of the library. Keep in sync with `package.json`.
  Backbone.VERSION = '0.9.10';

  // Require Underscore, if we're on the server, and it's not already present.
  var _ = root._;
  if (!_ && (typeof require !== 'undefined')) _ = require('underscore');

  // For Backbone's purposes, jQuery, Zepto, or Ender owns the `$` variable.
  Backbone.$ = root.jQuery || root.Zepto || root.ender;

  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
  // to its previous owner. Returns a reference to this Backbone object.
  Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this;
  };

  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
  // will fake `"PUT"` and `"DELETE"` requests via the `_method` parameter and
  // set a `X-Http-Method-Override` header.
  Backbone.emulateHTTP = false;

  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
  // `application/json` requests ... will encode the body as
  // `application/x-www-form-urlencoded` instead and will send the model in a
  // form param named `model`.
  Backbone.emulateJSON = false;

  // Backbone.Events
  // ---------------

  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;

  // Implement fancy features of the Events API such as multiple event
  // names `"change blur"` and jQuery-style event maps `{change: action}`
  // in terms of the existing API.
  var eventsApi = function(obj, action, name, rest) {
    if (!name) return true;
    if (typeof name === 'object') {
      for (var key in name) {
        obj[action].apply(obj, [key, name[key]].concat(rest));
      }
    } else if (eventSplitter.test(name)) {
      var names = name.split(eventSplitter);
      for (var i = 0, l = names.length; i < l; i++) {
        obj[action].apply(obj, [names[i]].concat(rest));
      }
    } else {
      return true;
    }
  };

  // Optimized internal dispatch function for triggering events. Tries to
  // keep the usual cases speedy (most Backbone events have 3 arguments).
  var triggerEvents = function(events, args) {
    var ev, i = -1, l = events.length;
    switch (args.length) {
    case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx);
    return;
    case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, args[0]);
    return;
    case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, args[0], args[1]);
    return;
    case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, args[0], args[1], args[2]);
    return;
    default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args);
    }
  };

  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may bind with `on` or remove with `off` callback
  // functions to an event; `trigger`-ing an event fires all callbacks in
  // succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  var Events = Backbone.Events = {

    // Bind one or more space separated events, or an events map,
    // to a `callback` function. Passing `"all"` will bind the callback to
    // all events fired.
    on: function(name, callback, context) {
      if (!(eventsApi(this, 'on', name, [callback, context]) && callback)) return this;
      this._events || (this._events = {});
      var list = this._events[name] || (this._events[name] = []);
      list.push({callback: callback, context: context, ctx: context || this});
      return this;
    },

    // Bind events to only be triggered a single time. After the first time
    // the callback is invoked, it will be removed.
    once: function(name, callback, context) {
      if (!(eventsApi(this, 'once', name, [callback, context]) && callback)) return this;
      var self = this;
      var once = _.once(function() {
        self.off(name, once);
        callback.apply(this, arguments);
      });
      once._callback = callback;
      this.on(name, once, context);
      return this;
    },

    // Remove one or many callbacks. If `context` is null, removes all
    // callbacks with that function. If `callback` is null, removes all
    // callbacks for the event. If `name` is null, removes all bound
    // callbacks for all events.
    off: function(name, callback, context) {
      var list, ev, events, names, i, l, j, k;
      if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
      if (!name && !callback && !context) {
        this._events = {};
        return this;
      }

      names = name ? [name] : _.keys(this._events);
      for (i = 0, l = names.length; i < l; i++) {
        name = names[i];
        if (list = this._events[name]) {
          events = [];
          if (callback || context) {
            for (j = 0, k = list.length; j < k; j++) {
              ev = list[j];
              if ((callback && callback !== ev.callback &&
                               callback !== ev.callback._callback) ||
                  (context && context !== ev.context)) {
                events.push(ev);
              }
            }
          }
          this._events[name] = events;
        }
      }

      return this;
    },

    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    trigger: function(name) {
      if (!this._events) return this;
      var args = slice.call(arguments, 1);
      if (!eventsApi(this, 'trigger', name, args)) return this;
      var events = this._events[name];
      var allEvents = this._events.all;
      if (events) triggerEvents(events, args);
      if (allEvents) triggerEvents(allEvents, arguments);
      return this;
    },

    // An inversion-of-control version of `on`. Tell *this* object to listen to
    // an event in another object ... keeping track of what it's listening to.
    listenTo: function(obj, name, callback) {
      var listeners = this._listeners || (this._listeners = {});
      var id = obj._listenerId || (obj._listenerId = _.uniqueId('l'));
      listeners[id] = obj;
      obj.on(name, typeof name === 'object' ? this : callback, this);
      return this;
    },

    // Tell this object to stop listening to either specific events ... or
    // to every object it's currently listening to.
    stopListening: function(obj, name, callback) {
      var listeners = this._listeners;
      if (!listeners) return;
      if (obj) {
        obj.off(name, typeof name === 'object' ? this : callback, this);
        if (!name && !callback) delete listeners[obj._listenerId];
      } else {
        if (typeof name === 'object') callback = this;
        for (var id in listeners) {
          listeners[id].off(name, callback, this);
        }
        this._listeners = {};
      }
      return this;
    }
  };

  // Aliases for backwards compatibility.
  Events.bind   = Events.on;
  Events.unbind = Events.off;

  // Allow the `Backbone` object to serve as a global event bus, for folks who
  // want global "pubsub" in a convenient place.
  _.extend(Backbone, Events);

  // Backbone.Model
  // --------------

  // Create a new model, with defined attributes. A client id (`cid`)
  // is automatically generated and assigned for you.
  var Model = Backbone.Model = function(attributes, options) {
    var defaults;
    var attrs = attributes || {};
    this.cid = _.uniqueId('c');
    this.attributes = {};
    if (options && options.collection) this.collection = options.collection;
    if (options && options.parse) attrs = this.parse(attrs, options) || {};
    if (defaults = _.result(this, 'defaults')) {
      attrs = _.defaults({}, attrs, defaults);
    }
    this.set(attrs, options);
    this.changed = {};
    this.initialize.apply(this, arguments);
  };

  // Attach all inheritable methods to the Model prototype.
  _.extend(Model.prototype, Events, {

    // A hash of attributes whose current and previous value differ.
    changed: null,

    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.
    idAttribute: 'id',

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Return a copy of the model's `attributes` object.
    toJSON: function(options) {
      return _.clone(this.attributes);
    },

    // Proxy `Backbone.sync` by default.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Get the value of an attribute.
    get: function(attr) {
      return this.attributes[attr];
    },

    // Get the HTML-escaped value of an attribute.
    escape: function(attr) {
      return _.escape(this.get(attr));
    },

    // Returns `true` if the attribute contains a value that is not null
    // or undefined.
    has: function(attr) {
      return this.get(attr) != null;
    },

    // ----------------------------------------------------------------------

    // Set a hash of model attributes on the object, firing `"change"` unless
    // you choose to silence it.
    set: function(key, val, options) {
      var attr, attrs, unset, changes, silent, changing, prev, current;
      if (key == null) return this;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options || (options = {});

      // Run validation.
      if (!this._validate(attrs, options)) return false;

      // Extract attributes and options.
      unset           = options.unset;
      silent          = options.silent;
      changes         = [];
      changing        = this._changing;
      this._changing  = true;

      if (!changing) {
        this._previousAttributes = _.clone(this.attributes);
        this.changed = {};
      }
      current = this.attributes, prev = this._previousAttributes;

      // Check for changes of `id`.
      if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];

      // For each `set` attribute, update or delete the current value.
      for (attr in attrs) {
        val = attrs[attr];
        if (!_.isEqual(current[attr], val)) changes.push(attr);
        if (!_.isEqual(prev[attr], val)) {
          this.changed[attr] = val;
        } else {
          delete this.changed[attr];
        }
        unset ? delete current[attr] : current[attr] = val;
      }

      // Trigger all relevant attribute changes.
      if (!silent) {
        if (changes.length) this._pending = true;
        for (var i = 0, l = changes.length; i < l; i++) {
          this.trigger('change:' + changes[i], this, current[changes[i]], options);
        }
      }

      if (changing) return this;
      if (!silent) {
        while (this._pending) {
          this._pending = false;
          this.trigger('change', this, options);
        }
      }
      this._pending = false;
      this._changing = false;
      return this;
    },

    // Remove an attribute from the model, firing `"change"` unless you choose
    // to silence it. `unset` is a noop if the attribute doesn't exist.
    unset: function(attr, options) {
      return this.set(attr, void 0, _.extend({}, options, {unset: true}));
    },

    // Clear all attributes on the model, firing `"change"` unless you choose
    // to silence it.
    clear: function(options) {
      var attrs = {};
      for (var key in this.attributes) attrs[key] = void 0;
      return this.set(attrs, _.extend({}, options, {unset: true}));
    },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged: function(attr) {
      if (attr == null) return !_.isEmpty(this.changed);
      return _.has(this.changed, attr);
    },

    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.
    changedAttributes: function(diff) {
      if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
      var val, changed = false;
      var old = this._changing ? this._previousAttributes : this.attributes;
      for (var attr in diff) {
        if (_.isEqual(old[attr], (val = diff[attr]))) continue;
        (changed || (changed = {}))[attr] = val;
      }
      return changed;
    },

    // Get the previous value of an attribute, recorded at the time the last
    // `"change"` event was fired.
    previous: function(attr) {
      if (attr == null || !this._previousAttributes) return null;
      return this._previousAttributes[attr];
    },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes: function() {
      return _.clone(this._previousAttributes);
    },

    // ---------------------------------------------------------------------

    // Fetch the model from the server. If the server's representation of the
    // model differs from its current attributes, they will be overriden,
    // triggering a `"change"` event.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var success = options.success;
      options.success = function(model, resp, options) {
        if (!model.set(model.parse(resp, options), options)) return false;
        if (success) success(model, resp, options);
      };
      return this.sync('read', this, options);
    },

    // Set a hash of model attributes, and sync the model to the server.
    // If the server returns an attributes hash that differs, the model's
    // state will be `set` again.
    save: function(key, val, options) {
      var attrs, success, method, xhr, attributes = this.attributes;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (key == null || typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      // If we're not waiting and attributes exist, save acts as `set(attr).save(null, opts)`.
      if (attrs && (!options || !options.wait) && !this.set(attrs, options)) return false;

      options = _.extend({validate: true}, options);

      // Do not persist invalid models.
      if (!this._validate(attrs, options)) return false;

      // Set temporary attributes if `{wait: true}`.
      if (attrs && options.wait) {
        this.attributes = _.extend({}, attributes, attrs);
      }

      // After a successful server-side save, the client is (optionally)
      // updated with the server-side state.
      if (options.parse === void 0) options.parse = true;
      success = options.success;
      options.success = function(model, resp, options) {
        // Ensure attributes are restored during synchronous saves.
        model.attributes = attributes;
        var serverAttrs = model.parse(resp, options);
        if (options.wait) serverAttrs = _.extend(attrs || {}, serverAttrs);
        if (_.isObject(serverAttrs) && !model.set(serverAttrs, options)) {
          return false;
        }
        if (success) success(model, resp, options);
      };

      // Finish configuring and sending the Ajax request.
      method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
      if (method === 'patch') options.attrs = attrs;
      xhr = this.sync(method, this, options);

      // Restore attributes.
      if (attrs && options.wait) this.attributes = attributes;

      return xhr;
    },

    // Destroy this model on the server if it was already persisted.
    // Optimistically removes the model from its collection, if it has one.
    // If `wait: true` is passed, waits for the server to respond before removal.
    destroy: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;

      var destroy = function() {
        model.trigger('destroy', model, model.collection, options);
      };

      options.success = function(model, resp, options) {
        if (options.wait || model.isNew()) destroy();
        if (success) success(model, resp, options);
      };

      if (this.isNew()) {
        options.success(this, null, options);
        return false;
      }

      var xhr = this.sync('delete', this, options);
      if (!options.wait) destroy();
      return xhr;
    },

    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.
    url: function() {
      var base = _.result(this, 'urlRoot') || _.result(this.collection, 'url') || urlError();
      if (this.isNew()) return base;
      return base + (base.charAt(base.length - 1) === '/' ? '' : '/') + encodeURIComponent(this.id);
    },

    // **parse** converts a response into the hash of attributes to be `set` on
    // the model. The default implementation is just to pass the response along.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new model with identical attributes to this one.
    clone: function() {
      return new this.constructor(this.attributes);
    },

    // A model is new if it has never been saved to the server, and lacks an id.
    isNew: function() {
      return this.id == null;
    },

    // Check if the model is currently in a valid state.
    isValid: function(options) {
      return !this.validate || !this.validate(this.attributes, options);
    },

    // Run validation against the next complete set of model attributes,
    // returning `true` if all is well. Otherwise, fire a general
    // `"error"` event and call the error callback, if specified.
    _validate: function(attrs, options) {
      if (!options.validate || !this.validate) return true;
      attrs = _.extend({}, this.attributes, attrs);
      var error = this.validationError = this.validate(attrs, options) || null;
      if (!error) return true;
      this.trigger('invalid', this, error, options || {});
      return false;
    }

  });

  // Backbone.Collection
  // -------------------

  // Provides a standard collection class for our sets of models, ordered
  // or unordered. If a `comparator` is specified, the Collection will maintain
  // its models in sort order, as they're added and removed.
  var Collection = Backbone.Collection = function(models, options) {
    options || (options = {});
    if (options.model) this.model = options.model;
    if (options.comparator !== void 0) this.comparator = options.comparator;
    this.models = [];
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) this.reset(models, _.extend({silent: true}, options));
  };

  // Define the Collection's inheritable methods.
  _.extend(Collection.prototype, Events, {

    // The default model for a collection is just a **Backbone.Model**.
    // This should be overridden in most cases.
    model: Model,

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // The JSON representation of a Collection is an array of the
    // models' attributes.
    toJSON: function(options) {
      return this.map(function(model){ return model.toJSON(options); });
    },

    // Proxy `Backbone.sync` by default.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Add a model, or list of models to the set.
    add: function(models, options) {
      models = _.isArray(models) ? models.slice() : [models];
      options || (options = {});
      var i, l, model, attrs, existing, doSort, add, at, sort, sortAttr;
      add = [];
      at = options.at;
      sort = this.comparator && (at == null) && options.sort != false;
      sortAttr = _.isString(this.comparator) ? this.comparator : null;

      // Turn bare objects into model references, and prevent invalid models
      // from being added.
      for (i = 0, l = models.length; i < l; i++) {
        if (!(model = this._prepareModel(attrs = models[i], options))) {
          this.trigger('invalid', this, attrs, options);
          continue;
        }

        // If a duplicate is found, prevent it from being added and
        // optionally merge it into the existing model.
        if (existing = this.get(model)) {
          if (options.merge) {
            existing.set(attrs === model ? model.attributes : attrs, options);
            if (sort && !doSort && existing.hasChanged(sortAttr)) doSort = true;
          }
          continue;
        }

        // This is a new model, push it to the `add` list.
        add.push(model);

        // Listen to added models' events, and index models for lookup by
        // `id` and by `cid`.
        model.on('all', this._onModelEvent, this);
        this._byId[model.cid] = model;
        if (model.id != null) this._byId[model.id] = model;
      }

      // See if sorting is needed, update `length` and splice in new models.
      if (add.length) {
        if (sort) doSort = true;
        this.length += add.length;
        if (at != null) {
          splice.apply(this.models, [at, 0].concat(add));
        } else {
          push.apply(this.models, add);
        }
      }

      // Silently sort the collection if appropriate.
      if (doSort) this.sort({silent: true});

      if (options.silent) return this;

      // Trigger `add` events.
      for (i = 0, l = add.length; i < l; i++) {
        (model = add[i]).trigger('add', model, this, options);
      }

      // Trigger `sort` if the collection was sorted.
      if (doSort) this.trigger('sort', this, options);

      return this;
    },

    // Remove a model, or a list of models from the set.
    remove: function(models, options) {
      models = _.isArray(models) ? models.slice() : [models];
      options || (options = {});
      var i, l, index, model;
      for (i = 0, l = models.length; i < l; i++) {
        model = this.get(models[i]);
        if (!model) continue;
        delete this._byId[model.id];
        delete this._byId[model.cid];
        index = this.indexOf(model);
        this.models.splice(index, 1);
        this.length--;
        if (!options.silent) {
          options.index = index;
          model.trigger('remove', model, this, options);
        }
        this._removeReference(model);
      }
      return this;
    },

    // Add a model to the end of the collection.
    push: function(model, options) {
      model = this._prepareModel(model, options);
      this.add(model, _.extend({at: this.length}, options));
      return model;
    },

    // Remove a model from the end of the collection.
    pop: function(options) {
      var model = this.at(this.length - 1);
      this.remove(model, options);
      return model;
    },

    // Add a model to the beginning of the collection.
    unshift: function(model, options) {
      model = this._prepareModel(model, options);
      this.add(model, _.extend({at: 0}, options));
      return model;
    },

    // Remove a model from the beginning of the collection.
    shift: function(options) {
      var model = this.at(0);
      this.remove(model, options);
      return model;
    },

    // Slice out a sub-array of models from the collection.
    slice: function(begin, end) {
      return this.models.slice(begin, end);
    },

    // Get a model from the set by id.
    get: function(obj) {
      if (obj == null) return void 0;
      this._idAttr || (this._idAttr = this.model.prototype.idAttribute);
      return this._byId[obj.id || obj.cid || obj[this._idAttr] || obj];
    },

    // Get the model at the given index.
    at: function(index) {
      return this.models[index];
    },

    // Return models with matching attributes. Useful for simple cases of `filter`.
    where: function(attrs) {
      if (_.isEmpty(attrs)) return [];
      return this.filter(function(model) {
        for (var key in attrs) {
          if (attrs[key] !== model.get(key)) return false;
        }
        return true;
      });
    },

    // Force the collection to re-sort itself. You don't need to call this under
    // normal circumstances, as the set will maintain sort order as each item
    // is added.
    sort: function(options) {
      if (!this.comparator) {
        throw new Error('Cannot sort a set without a comparator');
      }
      options || (options = {});

      // Run sort based on type of `comparator`.
      if (_.isString(this.comparator) || this.comparator.length === 1) {
        this.models = this.sortBy(this.comparator, this);
      } else {
        this.models.sort(_.bind(this.comparator, this));
      }

      if (!options.silent) this.trigger('sort', this, options);
      return this;
    },

    // Pluck an attribute from each model in the collection.
    pluck: function(attr) {
      return _.invoke(this.models, 'get', attr);
    },

    // Smartly update a collection with a change set of models, adding,
    // removing, and merging as necessary.
    update: function(models, options) {
      options = _.extend({add: true, merge: true, remove: true}, options);
      if (options.parse) models = this.parse(models, options);
      var model, i, l, existing;
      var add = [], remove = [], modelMap = {};

      // Allow a single model (or no argument) to be passed.
      if (!_.isArray(models)) models = models ? [models] : [];

      // Proxy to `add` for this case, no need to iterate...
      if (options.add && !options.remove) return this.add(models, options);

      // Determine which models to add and merge, and which to remove.
      for (i = 0, l = models.length; i < l; i++) {
        model = models[i];
        existing = this.get(model);
        if (options.remove && existing) modelMap[existing.cid] = true;
        if ((options.add && !existing) || (options.merge && existing)) {
          add.push(model);
        }
      }
      if (options.remove) {
        for (i = 0, l = this.models.length; i < l; i++) {
          model = this.models[i];
          if (!modelMap[model.cid]) remove.push(model);
        }
      }

      // Remove models (if applicable) before we add and merge the rest.
      if (remove.length) this.remove(remove, options);
      if (add.length) this.add(add, options);
      return this;
    },

    // When you have more items than you want to add or remove individually,
    // you can reset the entire set with a new list of models, without firing
    // any `add` or `remove` events. Fires `reset` when finished.
    reset: function(models, options) {
      options || (options = {});
      if (options.parse) models = this.parse(models, options);
      for (var i = 0, l = this.models.length; i < l; i++) {
        this._removeReference(this.models[i]);
      }
      options.previousModels = this.models.slice();
      this._reset();
      if (models) this.add(models, _.extend({silent: true}, options));
      if (!options.silent) this.trigger('reset', this, options);
      return this;
    },

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `update: true` is passed, the response
    // data will be passed through the `update` method instead of `reset`.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var success = options.success;
      options.success = function(collection, resp, options) {
        var method = options.update ? 'update' : 'reset';
        collection[method](resp, options);
        if (success) success(collection, resp, options);
      };
      return this.sync('read', this, options);
    },

    // Create a new instance of a model in this collection. Add the model to the
    // collection immediately, unless `wait: true` is passed, in which case we
    // wait for the server to agree.
    create: function(model, options) {
      options = options ? _.clone(options) : {};
      if (!(model = this._prepareModel(model, options))) return false;
      if (!options.wait) this.add(model, options);
      var collection = this;
      var success = options.success;
      options.success = function(model, resp, options) {
        if (options.wait) collection.add(model, options);
        if (success) success(model, resp, options);
      };
      model.save(null, options);
      return model;
    },

    // **parse** converts a response into a list of models to be added to the
    // collection. The default implementation is just to pass it through.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new collection with an identical list of models as this one.
    clone: function() {
      return new this.constructor(this.models);
    },

    // Reset all internal state. Called when the collection is reset.
    _reset: function() {
      this.length = 0;
      this.models.length = 0;
      this._byId  = {};
    },

    // Prepare a model or hash of attributes to be added to this collection.
    _prepareModel: function(attrs, options) {
      if (attrs instanceof Model) {
        if (!attrs.collection) attrs.collection = this;
        return attrs;
      }
      options || (options = {});
      options.collection = this;
      var model = new this.model(attrs, options);
      if (!model._validate(attrs, options)) return false;
      return model;
    },

    // Internal method to remove a model's ties to a collection.
    _removeReference: function(model) {
      if (this === model.collection) delete model.collection;
      model.off('all', this._onModelEvent, this);
    },

    // Internal method called every time a model in the set fires an event.
    // Sets need to update their indexes when models change ids. All other
    // events simply proxy through. "add" and "remove" events that originate
    // in other collections are ignored.
    _onModelEvent: function(event, model, collection, options) {
      if ((event === 'add' || event === 'remove') && collection !== this) return;
      if (event === 'destroy') this.remove(model, options);
      if (model && event === 'change:' + model.idAttribute) {
        delete this._byId[model.previous(model.idAttribute)];
        if (model.id != null) this._byId[model.id] = model;
      }
      this.trigger.apply(this, arguments);
    },

    sortedIndex: function (model, value, context) {
      value || (value = this.comparator);
      var iterator = _.isFunction(value) ? value : function(model) {
        return model.get(value);
      };
      return _.sortedIndex(this.models, model, iterator, context);
    }

  });

  // Underscore methods that we want to implement on the Collection.
  var methods = ['forEach', 'each', 'map', 'collect', 'reduce', 'foldl',
    'inject', 'reduceRight', 'foldr', 'find', 'detect', 'filter', 'select',
    'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke',
    'max', 'min', 'toArray', 'size', 'first', 'head', 'take', 'initial', 'rest',
    'tail', 'drop', 'last', 'without', 'indexOf', 'shuffle', 'lastIndexOf',
    'isEmpty', 'chain'];

  // Mix in each Underscore method as a proxy to `Collection#models`.
  _.each(methods, function(method) {
    Collection.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.models);
      return _[method].apply(_, args);
    };
  });

  // Underscore methods that take a property name as an argument.
  var attributeMethods = ['groupBy', 'countBy', 'sortBy'];

  // Use attributes instead of properties.
  _.each(attributeMethods, function(method) {
    Collection.prototype[method] = function(value, context) {
      var iterator = _.isFunction(value) ? value : function(model) {
        return model.get(value);
      };
      return _[method](this.models, iterator, context);
    };
  });

  // Backbone.Router
  // ---------------

  // Routers map faux-URLs to actions, and fire events when routes are
  // matched. Creating a new one sets its `routes` hash, if not set statically.
  var Router = Backbone.Router = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  };

  // Cached regular expressions for matching named param parts and splatted
  // parts of route strings.
  var optionalParam = /\((.*?)\)/g;
  var namedParam    = /(\(\?)?:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

  // Set up all inheritable **Backbone.Router** properties and methods.
  _.extend(Router.prototype, Events, {

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function(query, num) {
    //       ...
    //     });
    //
    route: function(route, name, callback) {
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (!callback) callback = this[name];
      Backbone.history.route(route, _.bind(function(fragment) {
        var args = this._extractParameters(route, fragment);
        callback && callback.apply(this, args);
        this.trigger.apply(this, ['route:' + name].concat(args));
        this.trigger('route', name, args);
        Backbone.history.trigger('route', this, name, args);
      }, this));
      return this;
    },

    // Simple proxy to `Backbone.history` to save a fragment into the history.
    navigate: function(fragment, options) {
      Backbone.history.navigate(fragment, options);
      return this;
    },

    // Bind all defined routes to `Backbone.history`. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.
    _bindRoutes: function() {
      if (!this.routes) return;
      var route, routes = _.keys(this.routes);
      while ((route = routes.pop()) != null) {
        this.route(route, this.routes[route]);
      }
    },

    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    _routeToRegExp: function(route) {
      route = route.replace(escapeRegExp, '\\$&')
                   .replace(optionalParam, '(?:$1)?')
                   .replace(namedParam, function(match, optional){
                     return optional ? match : '([^\/]+)';
                   })
                   .replace(splatParam, '(.*?)');
      return new RegExp('^' + route + '$');
    },

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted parameters.
    _extractParameters: function(route, fragment) {
      return route.exec(fragment).slice(1);
    }

  });

  // Backbone.History
  // ----------------

  // Handles cross-browser history management, based on URL fragments. If the
  // browser does not support `onhashchange`, falls back to polling.
  var History = Backbone.History = function() {
    this.handlers = [];
    _.bindAll(this, 'checkUrl');

    // Ensure that `History` can be used outside of the browser.
    if (typeof window !== 'undefined') {
      this.location = window.location;
      this.history = window.history;
    }
  };

  // Cached regex for stripping a leading hash/slash and trailing space.
  var routeStripper = /^[#\/]|\s+$/g;

  // Cached regex for stripping leading and trailing slashes.
  var rootStripper = /^\/+|\/+$/g;

  // Cached regex for detecting MSIE.
  var isExplorer = /msie [\w.]+/;

  // Cached regex for removing a trailing slash.
  var trailingSlash = /\/$/;

  // Has the history handling already been started?
  History.started = false;

  // Set up all inheritable **Backbone.History** properties and methods.
  _.extend(History.prototype, Events, {

    // The default interval to poll for hash changes, if necessary, is
    // twenty times a second.
    interval: 50,

    // Gets the true hash value. Cannot use location.hash directly due to bug
    // in Firefox where location.hash will always be decoded.
    getHash: function(window) {
      var match = (window || this).location.href.match(/#(.*)$/);
      return match ? match[1] : '';
    },

    // Get the cross-browser normalized URL fragment, either from the URL,
    // the hash, or the override.
    getFragment: function(fragment, forcePushState) {
      if (fragment == null) {
        if (this._hasPushState || !this._wantsHashChange || forcePushState) {
          fragment = this.location.pathname;
          var root = this.root.replace(trailingSlash, '');
          if (!fragment.indexOf(root)) fragment = fragment.substr(root.length);
        } else {
          fragment = this.getHash();
        }
      }
      return fragment.replace(routeStripper, '');
    },

    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    start: function(options) {
      if (History.started) throw new Error("Backbone.history has already been started");
      History.started = true;

      // Figure out the initial configuration. Do we need an iframe?
      // Is pushState desired ... is it available?
      this.options          = _.extend({}, {root: '/'}, this.options, options);
      this.root             = this.options.root;
      this._wantsHashChange = this.options.hashChange !== false;
      this._wantsPushState  = !!this.options.pushState;
      this._hasPushState    = !!(this.options.pushState && this.history && this.history.pushState);
      var fragment          = this.getFragment();
      var docMode           = document.documentMode;
      var oldIE             = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));

      // Normalize root to always include a leading and trailing slash.
      this.root = ('/' + this.root + '/').replace(rootStripper, '/');

      if (oldIE && this._wantsHashChange) {
        this.iframe = Backbone.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo('body')[0].contentWindow;
        this.navigate(fragment);
      }

      // Depending on whether we're using pushState or hashes, and whether
      // 'onhashchange' is supported, determine how we check the URL state.
      if (this._hasPushState) {
        Backbone.$(window).on('popstate', this.checkUrl);
      } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
        Backbone.$(window).on('hashchange', this.checkUrl);
      } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }

      // Determine if we need to change the base url, for a pushState link
      // opened by a non-pushState browser.
      this.fragment = fragment;
      var loc = this.location;
      var atRoot = loc.pathname.replace(/[^\/]$/, '$&/') === this.root;

      // If we've started off with a route from a `pushState`-enabled browser,
      // but we're currently in a browser that doesn't support it...
      if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !atRoot) {
        this.fragment = this.getFragment(null, true);
        this.location.replace(this.root + this.location.search + '#' + this.fragment);
        // Return immediately as browser will do redirect to new url
        return true;

      // Or if we've started out with a hash-based route, but we're currently
      // in a browser where it could be `pushState`-based instead...
      } else if (this._wantsPushState && this._hasPushState && atRoot && loc.hash) {
        this.fragment = this.getHash().replace(routeStripper, '');
        this.history.replaceState({}, document.title, this.root + this.fragment + loc.search);
      }

      if (!this.options.silent) return this.loadUrl();
    },

    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
    // but possibly useful for unit testing Routers.
    stop: function() {
      Backbone.$(window).off('popstate', this.checkUrl).off('hashchange', this.checkUrl);
      clearInterval(this._checkUrlInterval);
      History.started = false;
    },

    // Add a route to be tested when the fragment changes. Routes added later
    // may override previous routes.
    route: function(route, callback) {
      this.handlers.unshift({route: route, callback: callback});
    },

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`, normalizing across the hidden iframe.
    checkUrl: function(e) {
      var current = this.getFragment();
      if (current === this.fragment && this.iframe) {
        current = this.getFragment(this.getHash(this.iframe));
      }
      if (current === this.fragment) return false;
      if (this.iframe) this.navigate(current);
      this.loadUrl() || this.loadUrl(this.getHash());
    },

    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.
    loadUrl: function(fragmentOverride) {
      var fragment = this.fragment = this.getFragment(fragmentOverride);
      var matched = _.any(this.handlers, function(handler) {
        if (handler.route.test(fragment)) {
          handler.callback(fragment);
          return true;
        }
      });
      return matched;
    },

    // Save a fragment into the hash history, or replace the URL state if the
    // 'replace' option is passed. You are responsible for properly URL-encoding
    // the fragment in advance.
    //
    // The options object can contain `trigger: true` if you wish to have the
    // route callback be fired (not usually desirable), or `replace: true`, if
    // you wish to modify the current URL without adding an entry to the history.
    navigate: function(fragment, options) {
      if (!History.started) return false;
      if (!options || options === true) options = {trigger: options};
      fragment = this.getFragment(fragment || '');
      if (this.fragment === fragment) return;
      this.fragment = fragment;
      var url = this.root + fragment;

      // If pushState is available, we use it to set the fragment as a real URL.
      if (this._hasPushState) {
        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

      // If hash changes haven't been explicitly disabled, update the hash
      // fragment to store history.
      } else if (this._wantsHashChange) {
        this._updateHash(this.location, fragment, options.replace);
        if (this.iframe && (fragment !== this.getFragment(this.getHash(this.iframe)))) {
          // Opening and closing the iframe tricks IE7 and earlier to push a
          // history entry on hash-tag change.  When replace is true, we don't
          // want this.
          if(!options.replace) this.iframe.document.open().close();
          this._updateHash(this.iframe.location, fragment, options.replace);
        }

      // If you've told us that you explicitly don't want fallback hashchange-
      // based history, then `navigate` becomes a page refresh.
      } else {
        return this.location.assign(url);
      }
      if (options.trigger) this.loadUrl(fragment);
    },

    // Update the hash location, either replacing the current entry, or adding
    // a new one to the browser history.
    _updateHash: function(location, fragment, replace) {
      if (replace) {
        var href = location.href.replace(/(javascript:|#).*$/, '');
        location.replace(href + '#' + fragment);
      } else {
        // Some browsers require that `hash` contains a leading #.
        location.hash = '#' + fragment;
      }
    }

  });

  // Create the default Backbone.history.
  Backbone.history = new History;

  // Backbone.View
  // -------------

  // Creating a Backbone.View creates its initial element outside of the DOM,
  // if an existing element is not provided...
  var View = Backbone.View = function(options) {
    this.cid = _.uniqueId('view');
    this._configure(options || {});
    this._ensureElement();
    this.initialize.apply(this, arguments);
    this.delegateEvents();
  };

  // Cached regex to split keys for `delegate`.
  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

  // List of view options to be merged as properties.
  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

  // Set up all inheritable **Backbone.View** properties and methods.
  _.extend(View.prototype, Events, {

    // The default `tagName` of a View's element is `"div"`.
    tagName: 'div',

    // jQuery delegate for element lookup, scoped to DOM elements within the
    // current view. This should be prefered to global lookups where possible.
    $: function(selector) {
      return this.$el.find(selector);
    },

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // **render** is the core function that your view should override, in order
    // to populate its element (`this.el`), with the appropriate HTML. The
    // convention is for **render** to always return `this`.
    render: function() {
      return this;
    },

    // Remove this view by taking the element out of the DOM, and removing any
    // applicable Backbone.Events listeners.
    remove: function() {
      this.$el.remove();
      this.stopListening();
      return this;
    },

    // Change the view's element (`this.el` property), including event
    // re-delegation.
    setElement: function(element, delegate) {
      if (this.$el) this.undelegateEvents();
      this.$el = element instanceof Backbone.$ ? element : Backbone.$(element);
      this.el = this.$el[0];
      if (delegate !== false) this.delegateEvents();
      return this;
    },

    // Set callbacks, where `this.events` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save'
    //       'click .open':       function(e) { ... }
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    // This only works for delegate-able events: not `focus`, `blur`, and
    // not `change`, `submit`, and `reset` in Internet Explorer.
    delegateEvents: function(events) {
      if (!(events || (events = _.result(this, 'events')))) return;
      this.undelegateEvents();
      for (var key in events) {
        var method = events[key];
        if (!_.isFunction(method)) method = this[events[key]];
        if (!method) throw new Error('Method "' + events[key] + '" does not exist');
        var match = key.match(delegateEventSplitter);
        var eventName = match[1], selector = match[2];
        method = _.bind(method, this);
        eventName += '.delegateEvents' + this.cid;
        if (selector === '') {
          this.$el.on(eventName, method);
        } else {
          this.$el.on(eventName, selector, method);
        }
      }
    },

    // Clears all callbacks previously bound to the view with `delegateEvents`.
    // You usually don't need to use this, but may wish to if you have multiple
    // Backbone views attached to the same DOM element.
    undelegateEvents: function() {
      this.$el.off('.delegateEvents' + this.cid);
    },

    // Performs the initial configuration of a View with a set of options.
    // Keys with special meaning *(model, collection, id, className)*, are
    // attached directly to the view.
    _configure: function(options) {
      if (this.options) options = _.extend({}, _.result(this, 'options'), options);
      _.extend(this, _.pick(options, viewOptions));
      this.options = options;
    },

    // Ensure that the View has a DOM element to render into.
    // If `this.el` is a string, pass it through `$()`, take the first
    // matching element, and re-assign it to `el`. Otherwise, create
    // an element from the `id`, `className` and `tagName` properties.
    _ensureElement: function() {
      if (!this.el) {
        var attrs = _.extend({}, _.result(this, 'attributes'));
        if (this.id) attrs.id = _.result(this, 'id');
        if (this.className) attrs['class'] = _.result(this, 'className');
        var $el = Backbone.$('<' + _.result(this, 'tagName') + '>').attr(attrs);
        this.setElement($el, false);
      } else {
        this.setElement(_.result(this, 'el'), false);
      }
    }

  });

  // Backbone.sync
  // -------------

  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'patch':  'PATCH',
    'delete': 'DELETE',
    'read':   'GET'
  };

  // Override this function to change the manner in which Backbone persists
  // models to the server. You will be passed the type of request, and the
  // model in question. By default, makes a RESTful Ajax request
  // to the model's `url()`. Some possible customizations could be:
  //
  // * Use `setTimeout` to batch rapid-fire updates into a single request.
  // * Send up the models as XML instead of JSON.
  // * Persist models via WebSockets instead of Ajax.
  //
  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
  // as `POST`, with a `_method` parameter containing the true HTTP method,
  // as well as all requests with the body as `application/x-www-form-urlencoded`
  // instead of `application/json` with the model in a param named `model`.
  // Useful when interfacing with server-side languages like **PHP** that make
  // it difficult to read the body of `PUT` requests.
  Backbone.sync = function(method, model, options) {
    var type = methodMap[method];

    // Default options, unless specified.
    _.defaults(options || (options = {}), {
      emulateHTTP: Backbone.emulateHTTP,
      emulateJSON: Backbone.emulateJSON
    });

    // Default JSON-request options.
    var params = {type: type, dataType: 'json'};

    // Ensure that we have a URL.
    if (!options.url) {
      params.url = _.result(model, 'url') || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(options.attrs || model.toJSON(options));
    }

    // For older servers, emulate JSON by encoding the request into an HTML-form.
    if (options.emulateJSON) {
      params.contentType = 'application/x-www-form-urlencoded';
      params.data = params.data ? {model: params.data} : {};
    }

    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
    // And an `X-HTTP-Method-Override` header.
    if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
      params.type = 'POST';
      if (options.emulateJSON) params.data._method = type;
      var beforeSend = options.beforeSend;
      options.beforeSend = function(xhr) {
        xhr.setRequestHeader('X-HTTP-Method-Override', type);
        if (beforeSend) return beforeSend.apply(this, arguments);
      };
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET' && !options.emulateJSON) {
      params.processData = false;
    }

    var success = options.success;
    options.success = function(resp) {
      if (success) success(model, resp, options);
      model.trigger('sync', model, resp, options);
    };

    var error = options.error;
    options.error = function(xhr) {
      if (error) error(model, xhr, options);
      model.trigger('error', model, xhr, options);
    };

    // Make the request, allowing the user to override any Ajax options.
    var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
    model.trigger('request', model, xhr, options);
    return xhr;
  };

  // Set the default implementation of `Backbone.ajax` to proxy through to `$`.
  Backbone.ajax = function() {
    return Backbone.$.ajax.apply(Backbone.$, arguments);
  };

  // Helpers
  // -------

  // Helper function to correctly set up the prototype chain, for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  var extend = function(protoProps, staticProps) {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && _.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) _.extend(child.prototype, protoProps);

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
  };

  // Set up inheritance for the model, collection, router, view and history.
  Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;

  // Throw an error when a URL is needed, and none is supplied.
  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };

}).call(this);


$(document).bind("mobileinit", function () {
    //console.log('mobileinit');
    $.mobile.ajaxEnabled = false;
    $.mobile.linkBindingEnabled = false;
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled = false;
    
    var firstPage = true;
    // Remove page from DOM when it's being replaced
    $('div[data-role="page"]').live('pagehide', function (event, ui) {
    	//console.log('pageHide');
    	if (!firstPage) {
    		$(event.currentTarget).remove();
    	}
    	firstPage = false;
    });
    
});


/*! jQuery Mobile 1.3.1 | Git HEAD hash: 74b4bec <> 2013-04-10T21:57:23Z | (c) 2010, 2013 jQuery Foundation, Inc. | jquery.org/license */
(function(e,t,i){"function"==typeof define&&define.amd?define(["jquery"],function(n){return i(n,e,t),n.mobile}):i(e.jQuery,e,t)})(this,document,function(e,t,i,n){(function(e){e.mobile={}})(e),function(e,t,n){var a={};e.mobile=e.extend(e.mobile,{version:"1.3.1",ns:"",subPageUrlKey:"ui-page",activePageClass:"ui-page-active",activeBtnClass:"ui-btn-active",focusClass:"ui-focus",ajaxEnabled:!0,hashListeningEnabled:!0,linkBindingEnabled:!0,defaultPageTransition:"fade",maxTransitionWidth:!1,minScrollBack:250,touchOverflowEnabled:!1,defaultDialogTransition:"pop",pageLoadErrorMessage:"Error Loading Page",pageLoadErrorMessageTheme:"e",phonegapNavigationEnabled:!1,autoInitializePage:!0,pushStateEnabled:!0,ignoreContentEnabled:!1,orientationChangeEnabled:!0,buttonMarkup:{hoverDelay:200},window:e(t),document:e(i),keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91},behaviors:{},silentScroll:function(i){"number"!==e.type(i)&&(i=e.mobile.defaultHomeScroll),e.event.special.scrollstart.enabled=!1,setTimeout(function(){t.scrollTo(0,i),e.mobile.document.trigger("silentscroll",{x:0,y:i})},20),setTimeout(function(){e.event.special.scrollstart.enabled=!0},150)},nsNormalizeDict:a,nsNormalize:function(t){return t?a[t]||(a[t]=e.camelCase(e.mobile.ns+t)):n},getInheritedTheme:function(e,t){for(var i,n,a=e[0],o="",s=/ui-(bar|body|overlay)-([a-z])\b/;a&&(i=a.className||"",!(i&&(n=s.exec(i))&&(o=n[2])));)a=a.parentNode;return o||t||"a"},closestPageData:function(e){return e.closest(':jqmData(role="page"), :jqmData(role="dialog")').data("mobile-page")},enhanceable:function(e){return this.haveParents(e,"enhance")},hijackable:function(e){return this.haveParents(e,"ajax")},haveParents:function(t,i){if(!e.mobile.ignoreContentEnabled)return t;for(var n,a,o,s=t.length,r=e(),l=0;s>l;l++){for(a=t.eq(l),o=!1,n=t[l];n;){var d=n.getAttribute?n.getAttribute("data-"+e.mobile.ns+i):"";if("false"===d){o=!0;break}n=n.parentNode}o||(r=r.add(a))}return r},getScreenHeight:function(){return t.innerHeight||e.mobile.window.height()}},e.mobile),e.fn.jqmData=function(t,i){var a;return t!==n&&(t&&(t=e.mobile.nsNormalize(t)),a=2>arguments.length||i===n?this.data(t):this.data(t,i)),a},e.jqmData=function(t,i,a){var o;return i!==n&&(o=e.data(t,i?e.mobile.nsNormalize(i):i,a)),o},e.fn.jqmRemoveData=function(t){return this.removeData(e.mobile.nsNormalize(t))},e.jqmRemoveData=function(t,i){return e.removeData(t,e.mobile.nsNormalize(i))},e.fn.removeWithDependents=function(){e.removeWithDependents(this)},e.removeWithDependents=function(t){var i=e(t);(i.jqmData("dependents")||e()).remove(),i.remove()},e.fn.addDependents=function(t){e.addDependents(e(this),t)},e.addDependents=function(t,i){var n=e(t).jqmData("dependents")||e();e(t).jqmData("dependents",e.merge(n,i))},e.fn.getEncodedText=function(){return e("<div/>").text(e(this).text()).html()},e.fn.jqmEnhanceable=function(){return e.mobile.enhanceable(this)},e.fn.jqmHijackable=function(){return e.mobile.hijackable(this)};var o=e.find,s=/:jqmData\(([^)]*)\)/g;e.find=function(t,i,n,a){return t=t.replace(s,"[data-"+(e.mobile.ns||"")+"$1]"),o.call(this,t,i,n,a)},e.extend(e.find,o),e.find.matches=function(t,i){return e.find(t,null,null,i)},e.find.matchesSelector=function(t,i){return e.find(i,null,null,[t]).length>0}}(e,this),function(e,t){var i=0,n=Array.prototype.slice,a=e.cleanData;e.cleanData=function(t){for(var i,n=0;null!=(i=t[n]);n++)try{e(i).triggerHandler("remove")}catch(o){}a(t)},e.widget=function(i,n,a){var o,s,r,l,d=i.split(".")[0];i=i.split(".")[1],o=d+"-"+i,a||(a=n,n=e.Widget),e.expr[":"][o.toLowerCase()]=function(t){return!!e.data(t,o)},e[d]=e[d]||{},s=e[d][i],r=e[d][i]=function(e,i){return this._createWidget?(arguments.length&&this._createWidget(e,i),t):new r(e,i)},e.extend(r,s,{version:a.version,_proto:e.extend({},a),_childConstructors:[]}),l=new n,l.options=e.widget.extend({},l.options),e.each(a,function(t,i){e.isFunction(i)&&(a[t]=function(){var e=function(){return n.prototype[t].apply(this,arguments)},a=function(e){return n.prototype[t].apply(this,e)};return function(){var t,n=this._super,o=this._superApply;return this._super=e,this._superApply=a,t=i.apply(this,arguments),this._super=n,this._superApply=o,t}}())}),r.prototype=e.widget.extend(l,{widgetEventPrefix:s?l.widgetEventPrefix:i},a,{constructor:r,namespace:d,widgetName:i,widgetFullName:o}),s?(e.each(s._childConstructors,function(t,i){var n=i.prototype;e.widget(n.namespace+"."+n.widgetName,r,i._proto)}),delete s._childConstructors):n._childConstructors.push(r),e.widget.bridge(i,r)},e.widget.extend=function(i){for(var a,o,s=n.call(arguments,1),r=0,l=s.length;l>r;r++)for(a in s[r])o=s[r][a],s[r].hasOwnProperty(a)&&o!==t&&(i[a]=e.isPlainObject(o)?e.isPlainObject(i[a])?e.widget.extend({},i[a],o):e.widget.extend({},o):o);return i},e.widget.bridge=function(i,a){var o=a.prototype.widgetFullName||i;e.fn[i]=function(s){var r="string"==typeof s,l=n.call(arguments,1),d=this;return s=!r&&l.length?e.widget.extend.apply(null,[s].concat(l)):s,r?this.each(function(){var n,a=e.data(this,o);return a?e.isFunction(a[s])&&"_"!==s.charAt(0)?(n=a[s].apply(a,l),n!==a&&n!==t?(d=n&&n.jquery?d.pushStack(n.get()):n,!1):t):e.error("no such method '"+s+"' for "+i+" widget instance"):e.error("cannot call methods on "+i+" prior to initialization; "+"attempted to call method '"+s+"'")}):this.each(function(){var t=e.data(this,o);t?t.option(s||{})._init():e.data(this,o,new a(s,this))}),d}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(t,n){n=e(n||this.defaultElement||this)[0],this.element=e(n),this.uuid=i++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=e.widget.extend({},this.options,this._getCreateOptions(),t),this.bindings=e(),this.hoverable=e(),this.focusable=e(),n!==this&&(e.data(n,this.widgetFullName,this),this._on(!0,this.element,{remove:function(e){e.target===n&&this.destroy()}}),this.document=e(n.style?n.ownerDocument:n.document||n),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:e.noop,_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:e.noop,widget:function(){return this.element},option:function(i,n){var a,o,s,r=i;if(0===arguments.length)return e.widget.extend({},this.options);if("string"==typeof i)if(r={},a=i.split("."),i=a.shift(),a.length){for(o=r[i]=e.widget.extend({},this.options[i]),s=0;a.length-1>s;s++)o[a[s]]=o[a[s]]||{},o=o[a[s]];if(i=a.pop(),n===t)return o[i]===t?null:o[i];o[i]=n}else{if(n===t)return this.options[i]===t?null:this.options[i];r[i]=n}return this._setOptions(r),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return this.options[e]=t,"disabled"===e&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!t).attr("aria-disabled",t),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(i,n,a){var o,s=this;"boolean"!=typeof i&&(a=n,n=i,i=!1),a?(n=o=e(n),this.bindings=this.bindings.add(n)):(a=n,n=this.element,o=this.widget()),e.each(a,function(a,r){function l(){return i||s.options.disabled!==!0&&!e(this).hasClass("ui-state-disabled")?("string"==typeof r?s[r]:r).apply(s,arguments):t}"string"!=typeof r&&(l.guid=r.guid=r.guid||l.guid||e.guid++);var d=a.match(/^(\w+)\s*(.*)$/),c=d[1]+s.eventNamespace,h=d[2];h?o.delegate(h,c,l):n.bind(c,l)})},_off:function(e,t){t=(t||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.unbind(t).undelegate(t)},_delay:function(e,t){function i(){return("string"==typeof e?n[e]:e).apply(n,arguments)}var n=this;return setTimeout(i,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){e(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){e(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){e(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){e(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,i,n){var a,o,s=this.options[t];if(n=n||{},i=e.Event(i),i.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),i.target=this.element[0],o=i.originalEvent)for(a in o)a in i||(i[a]=o[a]);return this.element.trigger(i,n),!(e.isFunction(s)&&s.apply(this.element[0],[i].concat(n))===!1||i.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,i){e.Widget.prototype["_"+t]=function(n,a,o){"string"==typeof a&&(a={effect:a});var s,r=a?a===!0||"number"==typeof a?i:a.effect||i:t;a=a||{},"number"==typeof a&&(a={duration:a}),s=!e.isEmptyObject(a),a.complete=o,a.delay&&n.delay(a.delay),s&&e.effects&&e.effects.effect[r]?n[t](a):r!==t&&n[r]?n[r](a.duration,a.easing,o):n.queue(function(i){e(this)[t](),o&&o.call(n[0]),i()})}})}(e),function(e,t){e.widget("mobile.widget",{_createWidget:function(){e.Widget.prototype._createWidget.apply(this,arguments),this._trigger("init")},_getCreateOptions:function(){var i=this.element,n={};return e.each(this.options,function(e){var a=i.jqmData(e.replace(/[A-Z]/g,function(e){return"-"+e.toLowerCase()}));a!==t&&(n[e]=a)}),n},enhanceWithin:function(t,i){this.enhance(e(this.options.initSelector,e(t)),i)},enhance:function(t,i){var n,a,o=e(t);o=e.mobile.enhanceable(o),i&&o.length&&(n=e.mobile.closestPageData(o),a=n&&n.keepNativeSelector()||"",o=o.not(a)),o[this.widgetName]()},raise:function(e){throw"Widget ["+this.widgetName+"]: "+e}})}(e),function(e){e.extend(e.mobile,{loadingMessageTextVisible:n,loadingMessageTheme:n,loadingMessage:n,showPageLoadingMsg:function(t,i,n){e.mobile.loading("show",t,i,n)},hidePageLoadingMsg:function(){e.mobile.loading("hide")},loading:function(){this.loaderWidget.loader.apply(this.loaderWidget,arguments)}});var t="ui-loader",i=e("html"),a=e.mobile.window;e.widget("mobile.loader",{options:{theme:"a",textVisible:!1,html:"",text:"loading"},defaultHtml:"<div class='"+t+"'>"+"<span class='ui-icon ui-icon-loading'></span>"+"<h1></h1>"+"</div>",fakeFixLoader:function(){var t=e("."+e.mobile.activeBtnClass).first();this.element.css({top:e.support.scrollTop&&a.scrollTop()+a.height()/2||t.length&&t.offset().top||100})},checkLoaderPosition:function(){var t=this.element.offset(),i=a.scrollTop(),n=e.mobile.getScreenHeight();(i>t.top||t.top-i>n)&&(this.element.addClass("ui-loader-fakefix"),this.fakeFixLoader(),a.unbind("scroll",this.checkLoaderPosition).bind("scroll",e.proxy(this.fakeFixLoader,this)))},resetHtml:function(){this.element.html(e(this.defaultHtml).html())},show:function(o,s,r){var l,d,c;this.resetHtml(),"object"===e.type(o)?(c=e.extend({},this.options,o),o=c.theme||e.mobile.loadingMessageTheme):(c=this.options,o=o||e.mobile.loadingMessageTheme||c.theme),d=s||e.mobile.loadingMessage||c.text,i.addClass("ui-loading"),(e.mobile.loadingMessage!==!1||c.html)&&(l=e.mobile.loadingMessageTextVisible!==n?e.mobile.loadingMessageTextVisible:c.textVisible,this.element.attr("class",t+" ui-corner-all ui-body-"+o+" ui-loader-"+(l||s||o.text?"verbose":"default")+(c.textonly||r?" ui-loader-textonly":"")),c.html?this.element.html(c.html):this.element.find("h1").text(d),this.element.appendTo(e.mobile.pageContainer),this.checkLoaderPosition(),a.bind("scroll",e.proxy(this.checkLoaderPosition,this)))},hide:function(){i.removeClass("ui-loading"),e.mobile.loadingMessage&&this.element.removeClass("ui-loader-fakefix"),e.mobile.window.unbind("scroll",this.fakeFixLoader),e.mobile.window.unbind("scroll",this.checkLoaderPosition)}}),a.bind("pagecontainercreate",function(){e.mobile.loaderWidget=e.mobile.loaderWidget||e(e.mobile.loader.prototype.defaultHtml).loader()})}(e,this),function(e,t,n){function a(e){return e=e||location.href,"#"+e.replace(/^[^#]*#?(.*)$/,"$1")}var o,s="hashchange",r=i,l=e.event.special,d=r.documentMode,c="on"+s in t&&(d===n||d>7);e.fn[s]=function(e){return e?this.bind(s,e):this.trigger(s)},e.fn[s].delay=50,l[s]=e.extend(l[s],{setup:function(){return c?!1:(e(o.start),n)},teardown:function(){return c?!1:(e(o.stop),n)}}),o=function(){function i(){var n=a(),r=p(d);n!==d?(u(d=n,r),e(t).trigger(s)):r!==d&&(location.href=location.href.replace(/#.*/,"")+r),o=setTimeout(i,e.fn[s].delay)}var o,l={},d=a(),h=function(e){return e},u=h,p=h;return l.start=function(){o||i()},l.stop=function(){o&&clearTimeout(o),o=n},t.attachEvent&&!t.addEventListener&&!c&&function(){var t,n;l.start=function(){t||(n=e.fn[s].src,n=n&&n+a(),t=e('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){n||u(a()),i()}).attr("src",n||"javascript:0").insertAfter("body")[0].contentWindow,r.onpropertychange=function(){try{"title"===event.propertyName&&(t.document.title=r.title)}catch(e){}})},l.stop=h,p=function(){return a(t.location.href)},u=function(i,n){var a=t.document,o=e.fn[s].domain;i!==n&&(a.title=r.title,a.open(),o&&a.write('<script>document.domain="'+o+'"</script>'),a.close(),t.location.hash=i)}}(),l}()}(e,this),function(e){t.matchMedia=t.matchMedia||function(e){var t,i=e.documentElement,n=i.firstElementChild||i.firstChild,a=e.createElement("body"),o=e.createElement("div");return o.id="mq-test-1",o.style.cssText="position:absolute;top:-100em",a.style.background="none",a.appendChild(o),function(e){return o.innerHTML='&shy;<style media="'+e+'"> #mq-test-1 { width: 42px; }</style>',i.insertBefore(a,n),t=42===o.offsetWidth,i.removeChild(a),{matches:t,media:e}}}(i),e.mobile.media=function(e){return t.matchMedia(e).matches}}(e),function(e){var t={touch:"ontouchend"in i};e.mobile.support=e.mobile.support||{},e.extend(e.support,t),e.extend(e.mobile.support,t)}(e),function(e){e.extend(e.support,{orientation:"orientation"in t&&"onorientationchange"in t})}(e),function(e,n){function a(e){var t=e.charAt(0).toUpperCase()+e.substr(1),i=(e+" "+p.join(t+" ")+t).split(" ");for(var a in i)if(u[i[a]]!==n)return!0}function o(e,t,n){for(var a,o=i.createElement("div"),s=function(e){return e.charAt(0).toUpperCase()+e.substr(1)},r=function(e){return""===e?"":"-"+e.charAt(0).toLowerCase()+e.substr(1)+"-"},l=function(i){var n=r(i)+e+": "+t+";",l=s(i),d=l+(""===l?e:s(e));o.setAttribute("style",n),o.style[d]&&(a=!0)},d=n?n:p,c=0;d.length>c;c++)l(d[c]);return!!a}function s(){var a="transform-3d",o=e.mobile.media("(-"+p.join("-"+a+"),(-")+"-"+a+"),("+a+")");if(o)return!!o;var s=i.createElement("div"),r={MozTransform:"-moz-transform",transform:"transform"};h.append(s);for(var l in r)s.style[l]!==n&&(s.style[l]="translate3d( 100px, 1px, 1px )",o=t.getComputedStyle(s).getPropertyValue(r[l]));return!!o&&"none"!==o}function r(){var t,i,n=location.protocol+"//"+location.host+location.pathname+"ui-dir/",a=e("head base"),o=null,s="";return a.length?s=a.attr("href"):a=o=e("<base>",{href:n}).appendTo("head"),t=e("<a href='testurl' />").prependTo(h),i=t[0].href,a[0].href=s||location.pathname,o&&o.remove(),0===i.indexOf(n)}function l(){var e,n=i.createElement("x"),a=i.documentElement,o=t.getComputedStyle;return"pointerEvents"in n.style?(n.style.pointerEvents="auto",n.style.pointerEvents="x",a.appendChild(n),e=o&&"auto"===o(n,"").pointerEvents,a.removeChild(n),!!e):!1}function d(){var e=i.createElement("div");return e.getBoundingClientRect!==n}function c(){var e=t,i=navigator.userAgent,n=navigator.platform,a=i.match(/AppleWebKit\/([0-9]+)/),o=!!a&&a[1],s=i.match(/Fennec\/([0-9]+)/),r=!!s&&s[1],l=i.match(/Opera Mobi\/([0-9]+)/),d=!!l&&l[1];return(n.indexOf("iPhone")>-1||n.indexOf("iPad")>-1||n.indexOf("iPod")>-1)&&o&&534>o||e.operamini&&"[object OperaMini]"==={}.toString.call(e.operamini)||l&&7458>d||i.indexOf("Android")>-1&&o&&533>o||r&&6>r||"palmGetResource"in t&&o&&534>o||i.indexOf("MeeGo")>-1&&i.indexOf("NokiaBrowser/8.5.0")>-1?!1:!0}var h=e("<body>").prependTo("html"),u=h[0].style,p=["Webkit","Moz","O"],m="palmGetResource"in t,f=t.opera,g=t.operamini&&"[object OperaMini]"==={}.toString.call(t.operamini),b=t.blackberry&&!a("-webkit-transform");e.extend(e.mobile,{browser:{}}),e.mobile.browser.oldIE=function(){var e=3,t=i.createElement("div"),n=t.all||[];do t.innerHTML="<!--[if gt IE "+ ++e+"]><br><![endif]-->";while(n[0]);return e>4?e:!e}(),e.extend(e.support,{cssTransitions:"WebKitTransitionEvent"in t||o("transition","height 100ms linear",["Webkit","Moz",""])&&!e.mobile.browser.oldIE&&!f,pushState:"pushState"in history&&"replaceState"in history&&!(t.navigator.userAgent.indexOf("Firefox")>=0&&t.top!==t)&&-1===t.navigator.userAgent.search(/CriOS/),mediaquery:e.mobile.media("only all"),cssPseudoElement:!!a("content"),touchOverflow:!!a("overflowScrolling"),cssTransform3d:s(),boxShadow:!!a("boxShadow")&&!b,fixedPosition:c(),scrollTop:("pageXOffset"in t||"scrollTop"in i.documentElement||"scrollTop"in h[0])&&!m&&!g,dynamicBaseTag:r(),cssPointerEvents:l(),boundingRect:d()}),h.remove();var v=function(){var e=t.navigator.userAgent;return e.indexOf("Nokia")>-1&&(e.indexOf("Symbian/3")>-1||e.indexOf("Series60/5")>-1)&&e.indexOf("AppleWebKit")>-1&&e.match(/(BrowserNG|NokiaBrowser)\/7\.[0-3]/)}();e.mobile.gradeA=function(){return(e.support.mediaquery||e.mobile.browser.oldIE&&e.mobile.browser.oldIE>=7)&&(e.support.boundingRect||null!==e.fn.jquery.match(/1\.[0-7+]\.[0-9+]?/))},e.mobile.ajaxBlacklist=t.blackberry&&!t.WebKitPoint||g||v,v&&e(function(){e("head link[rel='stylesheet']").attr("rel","alternate stylesheet").attr("rel","stylesheet")}),e.support.boxShadow||e("html").addClass("ui-mobile-nosupport-boxshadow")}(e),function(e,t){var i,n=e.mobile.window;e.event.special.navigate=i={bound:!1,pushStateEnabled:!0,originalEventName:t,isPushStateEnabled:function(){return e.support.pushState&&e.mobile.pushStateEnabled===!0&&this.isHashChangeEnabled()},isHashChangeEnabled:function(){return e.mobile.hashListeningEnabled===!0},popstate:function(t){var i=new e.Event("navigate"),a=new e.Event("beforenavigate"),o=t.originalEvent.state||{};location.href,n.trigger(a),a.isDefaultPrevented()||(t.historyState&&e.extend(o,t.historyState),i.originalEvent=t,setTimeout(function(){n.trigger(i,{state:o})},0))},hashchange:function(t){var i=new e.Event("navigate"),a=new e.Event("beforenavigate");n.trigger(a),a.isDefaultPrevented()||(i.originalEvent=t,n.trigger(i,{state:t.hashchangeState||{}}))},setup:function(){i.bound||(i.bound=!0,i.isPushStateEnabled()?(i.originalEventName="popstate",n.bind("popstate.navigate",i.popstate)):i.isHashChangeEnabled()&&(i.originalEventName="hashchange",n.bind("hashchange.navigate",i.hashchange)))}}}(e),function(e,i){var n,a,o="&ui-state=dialog";e.mobile.path=n={uiStateKey:"&ui-state",urlParseRE:/^\s*(((([^:\/#\?]+:)?(?:(\/\/)((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/,getLocation:function(e){var t=e?this.parseUrl(e):location,i=this.parseUrl(e||location.href).hash;return i="#"===i?"":i,t.protocol+"//"+t.host+t.pathname+t.search+i},parseLocation:function(){return this.parseUrl(this.getLocation())},parseUrl:function(t){if("object"===e.type(t))return t;var i=n.urlParseRE.exec(t||"")||[];return{href:i[0]||"",hrefNoHash:i[1]||"",hrefNoSearch:i[2]||"",domain:i[3]||"",protocol:i[4]||"",doubleSlash:i[5]||"",authority:i[6]||"",username:i[8]||"",password:i[9]||"",host:i[10]||"",hostname:i[11]||"",port:i[12]||"",pathname:i[13]||"",directory:i[14]||"",filename:i[15]||"",search:i[16]||"",hash:i[17]||""}},makePathAbsolute:function(e,t){if(e&&"/"===e.charAt(0))return e;e=e||"",t=t?t.replace(/^\/|(\/[^\/]*|[^\/]+)$/g,""):"";for(var i=t?t.split("/"):[],n=e.split("/"),a=0;n.length>a;a++){var o=n[a];switch(o){case".":break;case"..":i.length&&i.pop();break;default:i.push(o)}}return"/"+i.join("/")},isSameDomain:function(e,t){return n.parseUrl(e).domain===n.parseUrl(t).domain},isRelativeUrl:function(e){return""===n.parseUrl(e).protocol},isAbsoluteUrl:function(e){return""!==n.parseUrl(e).protocol},makeUrlAbsolute:function(e,t){if(!n.isRelativeUrl(e))return e;t===i&&(t=this.documentBase);var a=n.parseUrl(e),o=n.parseUrl(t),s=a.protocol||o.protocol,r=a.protocol?a.doubleSlash:a.doubleSlash||o.doubleSlash,l=a.authority||o.authority,d=""!==a.pathname,c=n.makePathAbsolute(a.pathname||o.filename,o.pathname),h=a.search||!d&&o.search||"",u=a.hash;return s+r+l+c+h+u},addSearchParams:function(t,i){var a=n.parseUrl(t),o="object"==typeof i?e.param(i):i,s=a.search||"?";return a.hrefNoSearch+s+("?"!==s.charAt(s.length-1)?"&":"")+o+(a.hash||"")},convertUrlToDataUrl:function(e){var i=n.parseUrl(e);return n.isEmbeddedPage(i)?i.hash.split(o)[0].replace(/^#/,"").replace(/\?.*$/,""):n.isSameDomain(i,this.documentBase)?i.hrefNoHash.replace(this.documentBase.domain,"").split(o)[0]:t.decodeURIComponent(e)},get:function(e){return e===i&&(e=n.parseLocation().hash),n.stripHash(e).replace(/[^\/]*\.[^\/*]+$/,"")},set:function(e){location.hash=e},isPath:function(e){return/\//.test(e)},clean:function(e){return e.replace(this.documentBase.domain,"")},stripHash:function(e){return e.replace(/^#/,"")},stripQueryParams:function(e){return e.replace(/\?.*$/,"")},cleanHash:function(e){return n.stripHash(e.replace(/\?.*$/,"").replace(o,""))},isHashValid:function(e){return/^#[^#]+$/.test(e)},isExternal:function(e){var t=n.parseUrl(e);return t.protocol&&t.domain!==this.documentUrl.domain?!0:!1},hasProtocol:function(e){return/^(:?\w+:)/.test(e)},isEmbeddedPage:function(e){var t=n.parseUrl(e);return""!==t.protocol?!this.isPath(t.hash)&&t.hash&&(t.hrefNoHash===this.documentUrl.hrefNoHash||this.documentBaseDiffers&&t.hrefNoHash===this.documentBase.hrefNoHash):/^#/.test(t.href)},squash:function(e,t){var i,a,o,s,r=this.isPath(e),l=this.parseUrl(e),d=l.hash,c="";return t=t||(n.isPath(e)?n.getLocation():n.getDocumentUrl()),a=r?n.stripHash(e):e,a=n.isPath(l.hash)?n.stripHash(l.hash):a,s=a.indexOf(this.uiStateKey),s>-1&&(c=a.slice(s),a=a.slice(0,s)),i=n.makeUrlAbsolute(a,t),o=this.parseUrl(i).search,r?((n.isPath(d)||0===d.replace("#","").indexOf(this.uiStateKey))&&(d=""),c&&-1===d.indexOf(this.uiStateKey)&&(d+=c),-1===d.indexOf("#")&&""!==d&&(d="#"+d),i=n.parseUrl(i),i=i.protocol+"//"+i.host+i.pathname+o+d):i+=i.indexOf("#")>-1?c:"#"+c,i},isPreservableHash:function(e){return 0===e.replace("#","").indexOf(this.uiStateKey)}},n.documentUrl=n.parseLocation(),a=e("head").find("base"),n.documentBase=a.length?n.parseUrl(n.makeUrlAbsolute(a.attr("href"),n.documentUrl.href)):n.documentUrl,n.documentBaseDiffers=n.documentUrl.hrefNoHash!==n.documentBase.hrefNoHash,n.getDocumentUrl=function(t){return t?e.extend({},n.documentUrl):n.documentUrl.href},n.getDocumentBase=function(t){return t?e.extend({},n.documentBase):n.documentBase.href}}(e),function(e,t){e.mobile.path,e.mobile.History=function(e,t){this.stack=e||[],this.activeIndex=t||0},e.extend(e.mobile.History.prototype,{getActive:function(){return this.stack[this.activeIndex]},getLast:function(){return this.stack[this.previousIndex]},getNext:function(){return this.stack[this.activeIndex+1]},getPrev:function(){return this.stack[this.activeIndex-1]},add:function(e,t){t=t||{},this.getNext()&&this.clearForward(),t.hash&&-1===t.hash.indexOf("#")&&(t.hash="#"+t.hash),t.url=e,this.stack.push(t),this.activeIndex=this.stack.length-1},clearForward:function(){this.stack=this.stack.slice(0,this.activeIndex+1)},find:function(e,t,i){t=t||this.stack;var n,a,o,s=t.length;for(a=0;s>a;a++)if(n=t[a],(decodeURIComponent(e)===decodeURIComponent(n.url)||decodeURIComponent(e)===decodeURIComponent(n.hash))&&(o=a,i))return o;return o},closest:function(e){var i,n=this.activeIndex;return i=this.find(e,this.stack.slice(0,n)),i===t&&(i=this.find(e,this.stack.slice(n),!0),i=i===t?i:i+n),i},direct:function(i){var n=this.closest(i.url),a=this.activeIndex;n!==t&&(this.activeIndex=n,this.previousIndex=a),a>n?(i.present||i.back||e.noop)(this.getActive(),"back"):n>a?(i.present||i.forward||e.noop)(this.getActive(),"forward"):n===t&&i.missing&&i.missing(this.getActive())}})}(e),function(e){var a=e.mobile.path,o=location.href;e.mobile.Navigator=function(t){this.history=t,this.ignoreInitialHashChange=!0,e.mobile.window.bind({"popstate.history":e.proxy(this.popstate,this),"hashchange.history":e.proxy(this.hashchange,this)})},e.extend(e.mobile.Navigator.prototype,{squash:function(n,o){var s,r,l=a.isPath(n)?a.stripHash(n):n;return r=a.squash(n),s=e.extend({hash:l,url:r},o),t.history.replaceState(s,s.title||i.title,r),s},hash:function(e,t){var i,n,o;if(i=a.parseUrl(e),n=a.parseLocation(),n.pathname+n.search===i.pathname+i.search)o=i.hash?i.hash:i.pathname+i.search;else if(a.isPath(e)){var s=a.parseUrl(t);o=s.pathname+s.search+(a.isPreservableHash(s.hash)?s.hash.replace("#",""):"")}else o=e;return o},go:function(n,o,s){var r,l,d,c,h=e.event.special.navigate.isPushStateEnabled();l=a.squash(n),d=this.hash(n,l),s&&d!==a.stripHash(a.parseLocation().hash)&&(this.preventNextHashChange=s),this.preventHashAssignPopState=!0,t.location.hash=d,this.preventHashAssignPopState=!1,r=e.extend({url:l,hash:d,title:i.title},o),h&&(c=new e.Event("popstate"),c.originalEvent={type:"popstate",state:null},this.squash(n,r),s||(this.ignorePopState=!0,e.mobile.window.trigger(c))),this.history.add(r.url,r)},popstate:function(t){var i,s;if(e.event.special.navigate.isPushStateEnabled())return this.preventHashAssignPopState?(this.preventHashAssignPopState=!1,t.stopImmediatePropagation(),n):this.ignorePopState?(this.ignorePopState=!1,n):!t.originalEvent.state&&1===this.history.stack.length&&this.ignoreInitialHashChange&&(this.ignoreInitialHashChange=!1,location.href===o)?(t.preventDefault(),n):(i=a.parseLocation().hash,!t.originalEvent.state&&i?(s=this.squash(i),this.history.add(s.url,s),t.historyState=s,n):(this.history.direct({url:(t.originalEvent.state||{}).url||i,present:function(i,n){t.historyState=e.extend({},i),t.historyState.direction=n}}),n))},hashchange:function(t){var o,s;if(e.event.special.navigate.isHashChangeEnabled()&&!e.event.special.navigate.isPushStateEnabled()){if(this.preventNextHashChange)return this.preventNextHashChange=!1,t.stopImmediatePropagation(),n;o=this.history,s=a.parseLocation().hash,this.history.direct({url:s,present:function(i,n){t.hashchangeState=e.extend({},i),t.hashchangeState.direction=n},missing:function(){o.add(s,{hash:s,title:i.title})}})}}})}(e),function(e){e.mobile.navigate=function(t,i,n){e.mobile.navigate.navigator.go(t,i,n)},e.mobile.navigate.history=new e.mobile.History,e.mobile.navigate.navigator=new e.mobile.Navigator(e.mobile.navigate.history);var t=e.mobile.path.parseLocation();e.mobile.navigate.history.add(t.href,{hash:t.hash})}(e),function(e,t,i,n){function a(e){for(;e&&e.originalEvent!==n;)e=e.originalEvent;return e}function o(t,i){var o,s,r,l,d,c,h,u,p,m=t.type;if(t=e.Event(t),t.type=i,o=t.originalEvent,s=e.event.props,m.search(/^(mouse|click)/)>-1&&(s=q),o)for(h=s.length,l;h;)l=s[--h],t[l]=o[l];if(m.search(/mouse(down|up)|click/)>-1&&!t.which&&(t.which=1),-1!==m.search(/^touch/)&&(r=a(o),m=r.touches,d=r.changedTouches,c=m&&m.length?m[0]:d&&d.length?d[0]:n))for(u=0,p=k.length;p>u;u++)l=k[u],t[l]=c[l];return t}function s(t){for(var i,n,a={};t;){i=e.data(t,T);for(n in i)i[n]&&(a[n]=a.hasVirtualBinding=!0);t=t.parentNode}return a}function r(t,i){for(var n;t;){if(n=e.data(t,T),n&&(!i||n[i]))return t;t=t.parentNode}return null}function l(){M=!1}function d(){M=!0}function c(){U=0,O.length=0,H=!1,d()}function h(){l()}function u(){p(),S=setTimeout(function(){S=0,c()},e.vmouse.resetTimerDuration)}function p(){S&&(clearTimeout(S),S=0)}function m(t,i,n){var a;return(n&&n[t]||!n&&r(i.target,t))&&(a=o(i,t),e(i.target).trigger(a)),a}function f(t){var i=e.data(t.target,D);if(!(H||U&&U===i)){var n=m("v"+t.type,t);n&&(n.isDefaultPrevented()&&t.preventDefault(),n.isPropagationStopped()&&t.stopPropagation(),n.isImmediatePropagationStopped()&&t.stopImmediatePropagation())}}function g(t){var i,n,o=a(t).touches;if(o&&1===o.length&&(i=t.target,n=s(i),n.hasVirtualBinding)){U=L++,e.data(i,D,U),p(),h(),I=!1;var r=a(t).touches[0];A=r.pageX,N=r.pageY,m("vmouseover",t,n),m("vmousedown",t,n)}}function b(e){M||(I||m("vmousecancel",e,s(e.target)),I=!0,u())}function v(t){if(!M){var i=a(t).touches[0],n=I,o=e.vmouse.moveDistanceThreshold,r=s(t.target);I=I||Math.abs(i.pageX-A)>o||Math.abs(i.pageY-N)>o,I&&!n&&m("vmousecancel",t,r),m("vmousemove",t,r),u()}}function _(e){if(!M){d();var t,i=s(e.target);if(m("vmouseup",e,i),!I){var n=m("vclick",e,i);n&&n.isDefaultPrevented()&&(t=a(e).changedTouches[0],O.push({touchID:U,x:t.clientX,y:t.clientY}),H=!0)}m("vmouseout",e,i),I=!1,u()}}function C(t){var i,n=e.data(t,T);if(n)for(i in n)if(n[i])return!0;return!1}function x(){}function y(t){var i=t.substr(1);return{setup:function(){C(this)||e.data(this,T,{});var n=e.data(this,T);n[t]=!0,j[t]=(j[t]||0)+1,1===j[t]&&B.bind(i,f),e(this).bind(i,x),F&&(j.touchstart=(j.touchstart||0)+1,1===j.touchstart&&B.bind("touchstart",g).bind("touchend",_).bind("touchmove",v).bind("scroll",b))},teardown:function(){--j[t],j[t]||B.unbind(i,f),F&&(--j.touchstart,j.touchstart||B.unbind("touchstart",g).unbind("touchmove",v).unbind("touchend",_).unbind("scroll",b));var n=e(this),a=e.data(this,T);a&&(a[t]=!1),n.unbind(i,x),C(this)||n.removeData(T)}}}var w,T="virtualMouseBindings",D="virtualTouchID",P="vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "),k="clientX clientY pageX pageY screenX screenY".split(" "),E=e.event.mouseHooks?e.event.mouseHooks.props:[],q=e.event.props.concat(E),j={},S=0,A=0,N=0,I=!1,O=[],H=!1,M=!1,F="addEventListener"in i,B=e(i),L=1,U=0;e.vmouse={moveDistanceThreshold:10,clickDistanceThreshold:10,resetTimerDuration:1500};for(var z=0;P.length>z;z++)e.event.special[P[z]]=y(P[z]);F&&i.addEventListener("click",function(t){var i,a,o,s,r,l,d=O.length,c=t.target;if(d)for(i=t.clientX,a=t.clientY,w=e.vmouse.clickDistanceThreshold,o=c;o;){for(s=0;d>s;s++)if(r=O[s],l=0,o===c&&w>Math.abs(r.x-i)&&w>Math.abs(r.y-a)||e.data(o,D)===r.touchID)return t.preventDefault(),t.stopPropagation(),n;o=o.parentNode}},!0)}(e,t,i),function(e,t,n){function a(t,i,n){var a=n.type;n.type=i,e.event.dispatch.call(t,n),n.type=a}var o=e(i);e.each("touchstart touchmove touchend tap taphold swipe swipeleft swiperight scrollstart scrollstop".split(" "),function(t,i){e.fn[i]=function(e){return e?this.bind(i,e):this.trigger(i)},e.attrFn&&(e.attrFn[i]=!0)});var s=e.mobile.support.touch,r="touchmove scroll",l=s?"touchstart":"mousedown",d=s?"touchend":"mouseup",c=s?"touchmove":"mousemove";e.event.special.scrollstart={enabled:!0,setup:function(){function t(e,t){i=t,a(o,i?"scrollstart":"scrollstop",e)}var i,n,o=this,s=e(o);s.bind(r,function(a){e.event.special.scrollstart.enabled&&(i||t(a,!0),clearTimeout(n),n=setTimeout(function(){t(a,!1)},50))})}},e.event.special.tap={tapholdThreshold:750,setup:function(){var t=this,i=e(t);i.bind("vmousedown",function(n){function s(){clearTimeout(d)}function r(){s(),i.unbind("vclick",l).unbind("vmouseup",s),o.unbind("vmousecancel",r)}function l(e){r(),c===e.target&&a(t,"tap",e)}if(n.which&&1!==n.which)return!1;var d,c=n.target;n.originalEvent,i.bind("vmouseup",s).bind("vclick",l),o.bind("vmousecancel",r),d=setTimeout(function(){a(t,"taphold",e.Event("taphold",{target:c}))
},e.event.special.tap.tapholdThreshold)})}},e.event.special.swipe={scrollSupressionThreshold:30,durationThreshold:1e3,horizontalDistanceThreshold:30,verticalDistanceThreshold:75,start:function(t){var i=t.originalEvent.touches?t.originalEvent.touches[0]:t;return{time:(new Date).getTime(),coords:[i.pageX,i.pageY],origin:e(t.target)}},stop:function(e){var t=e.originalEvent.touches?e.originalEvent.touches[0]:e;return{time:(new Date).getTime(),coords:[t.pageX,t.pageY]}},handleSwipe:function(t,i){i.time-t.time<e.event.special.swipe.durationThreshold&&Math.abs(t.coords[0]-i.coords[0])>e.event.special.swipe.horizontalDistanceThreshold&&Math.abs(t.coords[1]-i.coords[1])<e.event.special.swipe.verticalDistanceThreshold&&t.origin.trigger("swipe").trigger(t.coords[0]>i.coords[0]?"swipeleft":"swiperight")},setup:function(){var t=this,i=e(t);i.bind(l,function(t){function a(t){s&&(o=e.event.special.swipe.stop(t),Math.abs(s.coords[0]-o.coords[0])>e.event.special.swipe.scrollSupressionThreshold&&t.preventDefault())}var o,s=e.event.special.swipe.start(t);i.bind(c,a).one(d,function(){i.unbind(c,a),s&&o&&e.event.special.swipe.handleSwipe(s,o),s=o=n})})}},e.each({scrollstop:"scrollstart",taphold:"tap",swipeleft:"swipe",swiperight:"swipe"},function(t,i){e.event.special[t]={setup:function(){e(this).bind(i,e.noop)}}})}(e,this),function(e){e.event.special.throttledresize={setup:function(){e(this).bind("resize",o)},teardown:function(){e(this).unbind("resize",o)}};var t,i,n,a=250,o=function(){i=(new Date).getTime(),n=i-s,n>=a?(s=i,e(this).trigger("throttledresize")):(t&&clearTimeout(t),t=setTimeout(o,a-n))},s=0}(e),function(e,t){function a(){var e=o();e!==s&&(s=e,d.trigger(c))}var o,s,r,l,d=e(t),c="orientationchange",h={0:!0,180:!0};if(e.support.orientation){var u=t.innerWidth||d.width(),p=t.innerHeight||d.height(),m=50;r=u>p&&u-p>m,l=h[t.orientation],(r&&l||!r&&!l)&&(h={"-90":!0,90:!0})}e.event.special.orientationchange=e.extend({},e.event.special.orientationchange,{setup:function(){return e.support.orientation&&!e.event.special.orientationchange.disabled?!1:(s=o(),d.bind("throttledresize",a),n)},teardown:function(){return e.support.orientation&&!e.event.special.orientationchange.disabled?!1:(d.unbind("throttledresize",a),n)},add:function(e){var t=e.handler;e.handler=function(e){return e.orientation=o(),t.apply(this,arguments)}}}),e.event.special.orientationchange.orientation=o=function(){var n=!0,a=i.documentElement;return n=e.support.orientation?h[t.orientation]:a&&1.1>a.clientWidth/a.clientHeight,n?"portrait":"landscape"},e.fn[c]=function(e){return e?this.bind(c,e):this.trigger(c)},e.attrFn&&(e.attrFn[c]=!0)}(e,this),function(e){e.widget("mobile.page",e.mobile.widget,{options:{theme:"c",domCache:!1,keepNativeDefault:":jqmData(role='none'), :jqmData(role='nojs')"},_create:function(){return this._trigger("beforecreate")===!1?!1:(this.element.attr("tabindex","0").addClass("ui-page ui-body-"+this.options.theme),this._on(this.element,{pagebeforehide:"removeContainerBackground",pagebeforeshow:"_handlePageBeforeShow"}),n)},_handlePageBeforeShow:function(){this.setContainerBackground()},removeContainerBackground:function(){e.mobile.pageContainer.removeClass("ui-overlay-"+e.mobile.getInheritedTheme(this.element.parent()))},setContainerBackground:function(t){this.options.theme&&e.mobile.pageContainer.addClass("ui-overlay-"+(t||this.options.theme))},keepNativeSelector:function(){var t=this.options,i=t.keepNative&&e.trim(t.keepNative);return i&&t.keepNative!==t.keepNativeDefault?[t.keepNative,t.keepNativeDefault].join(", "):t.keepNativeDefault}})}(e),function(e,t,i){var n=function(n){return n===i&&(n=!0),function(i,a,o,s){var r=new e.Deferred,l=a?" reverse":"",d=e.mobile.urlHistory.getActive(),c=d.lastScroll||e.mobile.defaultHomeScroll,h=e.mobile.getScreenHeight(),u=e.mobile.maxTransitionWidth!==!1&&e.mobile.window.width()>e.mobile.maxTransitionWidth,p=!e.support.cssTransitions||u||!i||"none"===i||Math.max(e.mobile.window.scrollTop(),c)>e.mobile.getMaxScrollForTransition(),m=" ui-page-pre-in",f=function(){e.mobile.pageContainer.toggleClass("ui-mobile-viewport-transitioning viewport-"+i)},g=function(){e.event.special.scrollstart.enabled=!1,t.scrollTo(0,c),setTimeout(function(){e.event.special.scrollstart.enabled=!0},150)},b=function(){s.removeClass(e.mobile.activePageClass+" out in reverse "+i).height("")},v=function(){n?s.animationComplete(_):_(),s.height(h+e.mobile.window.scrollTop()).addClass(i+" out"+l)},_=function(){s&&n&&b(),C()},C=function(){o.css("z-index",-10),o.addClass(e.mobile.activePageClass+m),e.mobile.focusPage(o),o.height(h+c),g(),o.css("z-index",""),p||o.animationComplete(x),o.removeClass(m).addClass(i+" in"+l),p&&x()},x=function(){n||s&&b(),o.removeClass("out in reverse "+i).height(""),f(),e.mobile.window.scrollTop()!==c&&g(),r.resolve(i,a,o,s,!0)};return f(),s&&!p?v():_(),r.promise()}},a=n(),o=n(!1),s=function(){return 3*e.mobile.getScreenHeight()};e.mobile.defaultTransitionHandler=a,e.mobile.transitionHandlers={"default":e.mobile.defaultTransitionHandler,sequential:a,simultaneous:o},e.mobile.transitionFallbacks={},e.mobile._maybeDegradeTransition=function(t){return t&&!e.support.cssTransform3d&&e.mobile.transitionFallbacks[t]&&(t=e.mobile.transitionFallbacks[t]),t},e.mobile.getMaxScrollForTransition=e.mobile.getMaxScrollForTransition||s}(e,this),function(e,n){function a(t){!f||f.closest("."+e.mobile.activePageClass).length&&!t||f.removeClass(e.mobile.activeBtnClass),f=null}function o(){_=!1,v.length>0&&e.mobile.changePage.apply(null,v.pop())}function s(t,i,n,a){i&&i.data("mobile-page")._trigger("beforehide",null,{nextPage:t}),t.data("mobile-page")._trigger("beforeshow",null,{prevPage:i||e("")}),e.mobile.hidePageLoadingMsg(),n=e.mobile._maybeDegradeTransition(n);var o=e.mobile.transitionHandlers[n||"default"]||e.mobile.defaultTransitionHandler,s=o(n,a,t,i);return s.done(function(){i&&i.data("mobile-page")._trigger("hide",null,{nextPage:t}),t.data("mobile-page")._trigger("show",null,{prevPage:i||e("")})}),s}function r(t,i){i&&t.attr("data-"+e.mobile.ns+"role",i),t.page()}function l(){var t=e.mobile.activePage&&c(e.mobile.activePage);return t||w.hrefNoHash}function d(e){for(;e&&("string"!=typeof e.nodeName||"a"!==e.nodeName.toLowerCase());)e=e.parentNode;return e}function c(t){var i=e(t).closest(".ui-page").jqmData("url"),n=w.hrefNoHash;return i&&p.isPath(i)||(i=n),p.makeUrlAbsolute(i,n)}var h=e.mobile.window,u=(e("html"),e("head")),p=e.extend(e.mobile.path,{getFilePath:function(t){var i="&"+e.mobile.subPageUrlKey;return t&&t.split(i)[0].split(C)[0]},isFirstPageUrl:function(t){var i=p.parseUrl(p.makeUrlAbsolute(t,this.documentBase)),a=i.hrefNoHash===this.documentUrl.hrefNoHash||this.documentBaseDiffers&&i.hrefNoHash===this.documentBase.hrefNoHash,o=e.mobile.firstPage,s=o&&o[0]?o[0].id:n;return a&&(!i.hash||"#"===i.hash||s&&i.hash.replace(/^#/,"")===s)},isPermittedCrossDomainRequest:function(t,i){return e.mobile.allowCrossDomainPages&&"file:"===t.protocol&&-1!==i.search(/^https?:/)}}),m=null,f=null,g=e.Deferred(),b=e.mobile.navigate.history,v=[],_=!1,C="&ui-state=dialog",x=u.children("base"),y=p.documentUrl,w=p.documentBase,T=(p.documentBaseDiffers,e.mobile.getScreenHeight),D=e.support.dynamicBaseTag?{element:x.length?x:e("<base>",{href:w.hrefNoHash}).prependTo(u),set:function(e){e=p.parseUrl(e).hrefNoHash,D.element.attr("href",p.makeUrlAbsolute(e,w))},reset:function(){D.element.attr("href",w.hrefNoSearch)}}:n;e.mobile.getDocumentUrl=p.getDocumentUrl,e.mobile.getDocumentBase=p.getDocumentBase,e.mobile.back=function(){var e=t.navigator;this.phonegapNavigationEnabled&&e&&e.app&&e.app.backHistory?e.app.backHistory():t.history.back()},e.mobile.focusPage=function(e){var t=e.find("[autofocus]"),i=e.find(".ui-title:eq(0)");return t.length?(t.focus(),n):(i.length?i.focus():e.focus(),n)};var P,k,E=!0;P=function(){if(E){var t=e.mobile.urlHistory.getActive();if(t){var i=h.scrollTop();t.lastScroll=e.mobile.minScrollBack>i?e.mobile.defaultHomeScroll:i}}},k=function(){setTimeout(P,100)},h.bind(e.support.pushState?"popstate":"hashchange",function(){E=!1}),h.one(e.support.pushState?"popstate":"hashchange",function(){E=!0}),h.one("pagecontainercreate",function(){e.mobile.pageContainer.bind("pagechange",function(){E=!0,h.unbind("scrollstop",k),h.bind("scrollstop",k)})}),h.bind("scrollstop",k),e.mobile._maybeDegradeTransition=e.mobile._maybeDegradeTransition||function(e){return e},e.mobile.resetActivePageHeight=function(t){var i=e("."+e.mobile.activePageClass),n=parseFloat(i.css("padding-top")),a=parseFloat(i.css("padding-bottom")),o=parseFloat(i.css("border-top-width")),s=parseFloat(i.css("border-bottom-width"));t="number"==typeof t?t:T(),i.css("min-height",t-n-a-o-s)},e.fn.animationComplete=function(t){return e.support.cssTransitions?e(this).one("webkitAnimationEnd animationend",t):(setTimeout(t,0),e(this))},e.mobile.path=p,e.mobile.base=D,e.mobile.urlHistory=b,e.mobile.dialogHashKey=C,e.mobile.allowCrossDomainPages=!1,e.mobile._bindPageRemove=function(){var t=e(this);!t.data("mobile-page").options.domCache&&t.is(":jqmData(external-page='true')")&&t.bind("pagehide.remove",function(){var t=e(this),i=new e.Event("pageremove");t.trigger(i),i.isDefaultPrevented()||t.removeWithDependents()})},e.mobile.loadPage=function(t,i){var a=e.Deferred(),o=e.extend({},e.mobile.loadPage.defaults,i),s=null,d=null,c=p.makeUrlAbsolute(t,l());o.data&&"get"===o.type&&(c=p.addSearchParams(c,o.data),o.data=n),o.data&&"post"===o.type&&(o.reloadPage=!0);var h=p.getFilePath(c),u=p.convertUrlToDataUrl(c);if(o.pageContainer=o.pageContainer||e.mobile.pageContainer,s=o.pageContainer.children("[data-"+e.mobile.ns+"url='"+u+"']"),0===s.length&&u&&!p.isPath(u)&&(s=o.pageContainer.children("#"+u).attr("data-"+e.mobile.ns+"url",u).jqmData("url",u)),0===s.length)if(e.mobile.firstPage&&p.isFirstPageUrl(h))e.mobile.firstPage.parent().length&&(s=e(e.mobile.firstPage));else if(p.isEmbeddedPage(h))return a.reject(c,i),a.promise();if(s.length){if(!o.reloadPage)return r(s,o.role),a.resolve(c,i,s),D&&!i.prefetch&&D.set(t),a.promise();d=s}var m=o.pageContainer,f=new e.Event("pagebeforeload"),g={url:t,absUrl:c,dataUrl:u,deferred:a,options:o};if(m.trigger(f,g),f.isDefaultPrevented())return a.promise();if(o.showLoadMsg)var b=setTimeout(function(){e.mobile.showPageLoadingMsg()},o.loadMsgDelay),v=function(){clearTimeout(b),e.mobile.hidePageLoadingMsg()};return D&&i.prefetch===n&&D.reset(),e.mobile.allowCrossDomainPages||p.isSameDomain(y,c)?e.ajax({url:h,type:o.type,data:o.data,contentType:o.contentType,dataType:"html",success:function(l,m,f){var b=e("<div></div>"),_=l.match(/<title[^>]*>([^<]*)/)&&RegExp.$1,C=RegExp("(<[^>]+\\bdata-"+e.mobile.ns+"role=[\"']?page[\"']?[^>]*>)"),x=RegExp("\\bdata-"+e.mobile.ns+"url=[\"']?([^\"'>]*)[\"']?");if(C.test(l)&&RegExp.$1&&x.test(RegExp.$1)&&RegExp.$1&&(t=h=p.getFilePath(e("<div>"+RegExp.$1+"</div>").text())),D&&i.prefetch===n&&D.set(h),b.get(0).innerHTML=l,s=b.find(":jqmData(role='page'), :jqmData(role='dialog')").first(),s.length||(s=e("<div data-"+e.mobile.ns+"role='page'>"+(l.split(/<\/?body[^>]*>/gim)[1]||"")+"</div>")),_&&!s.jqmData("title")&&(~_.indexOf("&")&&(_=e("<div>"+_+"</div>").text()),s.jqmData("title",_)),!e.support.dynamicBaseTag){var y=p.get(h);s.find("[src], link[href], a[rel='external'], :jqmData(ajax='false'), a[target]").each(function(){var t=e(this).is("[href]")?"href":e(this).is("[src]")?"src":"action",i=e(this).attr(t);i=i.replace(location.protocol+"//"+location.host+location.pathname,""),/^(\w+:|#|\/)/.test(i)||e(this).attr(t,y+i)})}s.attr("data-"+e.mobile.ns+"url",p.convertUrlToDataUrl(h)).attr("data-"+e.mobile.ns+"external-page",!0).appendTo(o.pageContainer),s.one("pagecreate",e.mobile._bindPageRemove),r(s,o.role),c.indexOf("&"+e.mobile.subPageUrlKey)>-1&&(s=o.pageContainer.children("[data-"+e.mobile.ns+"url='"+u+"']")),o.showLoadMsg&&v(),g.xhr=f,g.textStatus=m,g.page=s,o.pageContainer.trigger("pageload",g),a.resolve(c,i,s,d)},error:function(t,n,s){D&&D.set(p.get()),g.xhr=t,g.textStatus=n,g.errorThrown=s;var r=new e.Event("pageloadfailed");o.pageContainer.trigger(r,g),r.isDefaultPrevented()||(o.showLoadMsg&&(v(),e.mobile.showPageLoadingMsg(e.mobile.pageLoadErrorMessageTheme,e.mobile.pageLoadErrorMessage,!0),setTimeout(e.mobile.hidePageLoadingMsg,1500)),a.reject(c,i))}}):a.reject(c,i),a.promise()},e.mobile.loadPage.defaults={type:"get",data:n,reloadPage:!1,role:n,showLoadMsg:!1,pageContainer:n,loadMsgDelay:50},e.mobile.changePage=function(t,d){if(_)return v.unshift(arguments),n;var c,h=e.extend({},e.mobile.changePage.defaults,d);h.pageContainer=h.pageContainer||e.mobile.pageContainer,h.fromPage=h.fromPage||e.mobile.activePage,c="string"==typeof t;var u=h.pageContainer,m=new e.Event("pagebeforechange"),f={toPage:t,options:h};if(f.absUrl=c?p.makeUrlAbsolute(t,l()):t.data("absUrl"),u.trigger(m,f),!m.isDefaultPrevented()){if(t=f.toPage,c="string"==typeof t,_=!0,c)return h.target=t,e.mobile.loadPage(t,h).done(function(t,i,n,a){_=!1,i.duplicateCachedPage=a,n.data("absUrl",f.absUrl),e.mobile.changePage(n,i)}).fail(function(){a(!0),o(),h.pageContainer.trigger("pagechangefailed",f)}),n;t[0]!==e.mobile.firstPage[0]||h.dataUrl||(h.dataUrl=y.hrefNoHash);var g=h.fromPage,x=h.dataUrl&&p.convertUrlToDataUrl(h.dataUrl)||t.jqmData("url"),w=x,T=(p.getFilePath(x),b.getActive()),D=0===b.activeIndex,P=0,k=i.title,E="dialog"===h.role||"dialog"===t.jqmData("role");if(g&&g[0]===t[0]&&!h.allowSamePageTransition)return _=!1,u.trigger("pagechange",f),h.fromHashChange&&b.direct({url:x}),n;r(t,h.role),h.fromHashChange&&(P="back"===d.direction?-1:1);try{i.activeElement&&"body"!==i.activeElement.nodeName.toLowerCase()?e(i.activeElement).blur():e("input:focus, textarea:focus, select:focus").blur()}catch(q){}var j=!1;E&&T&&(T.url&&T.url.indexOf(C)>-1&&e.mobile.activePage&&!e.mobile.activePage.is(".ui-dialog")&&b.activeIndex>0&&(h.changeHash=!1,j=!0),x=T.url||"",x+=!j&&x.indexOf("#")>-1?C:"#"+C,0===b.activeIndex&&x===b.initialDst&&(x+=C));var S=T?t.jqmData("title")||t.children(":jqmData(role='header')").find(".ui-title").text():k;if(S&&k===i.title&&(k=S),t.jqmData("title")||t.jqmData("title",k),h.transition=h.transition||(P&&!D?T.transition:n)||(E?e.mobile.defaultDialogTransition:e.mobile.defaultPageTransition),!P&&j&&(b.getActive().pageUrl=w),x&&!h.fromHashChange){var A;!p.isPath(x)&&0>x.indexOf("#")&&(x="#"+x),A={transition:h.transition,title:k,pageUrl:w,role:h.role},h.changeHash!==!1&&e.mobile.hashListeningEnabled?e.mobile.navigate(x,A,!0):t[0]!==e.mobile.firstPage[0]&&e.mobile.navigate.history.add(x,A)}i.title=k,e.mobile.activePage=t,h.reverse=h.reverse||0>P,s(t,g,h.transition,h.reverse).done(function(i,n,s,r,l){a(),h.duplicateCachedPage&&h.duplicateCachedPage.remove(),l||e.mobile.focusPage(t),o(),u.trigger("pagechange",f)})}},e.mobile.changePage.defaults={transition:n,reverse:!1,changeHash:!0,fromHashChange:!1,role:n,duplicateCachedPage:n,pageContainer:n,showLoadMsg:!0,dataUrl:n,fromPage:n,allowSamePageTransition:!1},e.mobile.navreadyDeferred=e.Deferred(),e.mobile._registerInternalEvents=function(){var i=function(t,i){var a,o,s,r,l=!0;return!e.mobile.ajaxEnabled||t.is(":jqmData(ajax='false')")||!t.jqmHijackable().length||t.attr("target")?!1:(a=t.attr("action"),r=(t.attr("method")||"get").toLowerCase(),a||(a=c(t),"get"===r&&(a=p.parseUrl(a).hrefNoSearch),a===w.hrefNoHash&&(a=y.hrefNoSearch)),a=p.makeUrlAbsolute(a,c(t)),p.isExternal(a)&&!p.isPermittedCrossDomainRequest(y,a)?!1:(i||(o=t.serializeArray(),m&&m[0].form===t[0]&&(s=m.attr("name"),s&&(e.each(o,function(e,t){return t.name===s?(s="",!1):n}),s&&o.push({name:s,value:m.attr("value")}))),l={url:a,options:{type:r,data:e.param(o),transition:t.jqmData("transition"),reverse:"reverse"===t.jqmData("direction"),reloadPage:!0}}),l))};e.mobile.document.delegate("form","submit",function(t){var n=i(e(this));n&&(e.mobile.changePage(n.url,n.options),t.preventDefault())}),e.mobile.document.bind("vclick",function(t){var n,o,s=t.target,r=!1;if(!(t.which>1)&&e.mobile.linkBindingEnabled){if(m=e(s),e.data(s,"mobile-button")){if(!i(e(s).closest("form"),!0))return;s.parentNode&&(s=s.parentNode)}else{if(s=d(s),!s||"#"===p.parseUrl(s.getAttribute("href")||"#").hash)return;if(!e(s).jqmHijackable().length)return}~s.className.indexOf("ui-link-inherit")?s.parentNode&&(o=e.data(s.parentNode,"buttonElements")):o=e.data(s,"buttonElements"),o?s=o.outer:r=!0,n=e(s),r&&(n=n.closest(".ui-btn")),n.length>0&&!n.hasClass("ui-disabled")&&(a(!0),f=n,f.addClass(e.mobile.activeBtnClass))}}),e.mobile.document.bind("click",function(i){if(e.mobile.linkBindingEnabled&&!i.isDefaultPrevented()){var o,s=d(i.target),r=e(s);if(s&&!(i.which>1)&&r.jqmHijackable().length){if(o=function(){t.setTimeout(function(){a(!0)},200)},r.is(":jqmData(rel='back')"))return e.mobile.back(),!1;var l=c(r),h=p.makeUrlAbsolute(r.attr("href")||"#",l);if(!e.mobile.ajaxEnabled&&!p.isEmbeddedPage(h))return o(),n;if(-1!==h.search("#")){if(h=h.replace(/[^#]*#/,""),!h)return i.preventDefault(),n;h=p.isPath(h)?p.makeUrlAbsolute(h,l):p.makeUrlAbsolute("#"+h,y.hrefNoHash)}var u=r.is("[rel='external']")||r.is(":jqmData(ajax='false')")||r.is("[target]"),m=u||p.isExternal(h)&&!p.isPermittedCrossDomainRequest(y,h);if(m)return o(),n;var f=r.jqmData("transition"),g="reverse"===r.jqmData("direction")||r.jqmData("back"),b=r.attr("data-"+e.mobile.ns+"rel")||n;e.mobile.changePage(h,{transition:f,reverse:g,role:b,link:r}),i.preventDefault()}}}),e.mobile.document.delegate(".ui-page","pageshow.prefetch",function(){var t=[];e(this).find("a:jqmData(prefetch)").each(function(){var i=e(this),n=i.attr("href");n&&-1===e.inArray(n,t)&&(t.push(n),e.mobile.loadPage(n,{role:i.attr("data-"+e.mobile.ns+"rel"),prefetch:!0}))})}),e.mobile._handleHashChange=function(i,a){var o=p.stripHash(i),s=0===e.mobile.urlHistory.stack.length?"none":n,r={changeHash:!1,fromHashChange:!0,reverse:"back"===a.direction};if(e.extend(r,a,{transition:(b.getLast()||{}).transition||s}),b.activeIndex>0&&o.indexOf(C)>-1&&b.initialDst!==o){if(e.mobile.activePage&&!e.mobile.activePage.is(".ui-dialog"))return"back"===a.direction?e.mobile.back():t.history.forward(),n;o=a.pageUrl;var l=e.mobile.urlHistory.getActive();e.extend(r,{role:l.role,transition:l.transition,reverse:"back"===a.direction})}o?(o=p.isPath(o)?o:p.makeUrlAbsolute("#"+o,w),o===p.makeUrlAbsolute("#"+b.initialDst,w)&&b.stack.length&&b.stack[0].url!==b.initialDst.replace(C,"")&&(o=e.mobile.firstPage),e.mobile.changePage(o,r)):e.mobile.changePage(e.mobile.firstPage,r)},h.bind("navigate",function(t,i){var n;t.originalEvent&&t.originalEvent.isDefaultPrevented()||(n=e.event.special.navigate.originalEventName.indexOf("hashchange")>-1?i.state.hash:i.state.url,n||(n=e.mobile.path.parseLocation().hash),n&&"#"!==n&&0!==n.indexOf("#"+e.mobile.path.uiStateKey)||(n=location.href),e.mobile._handleHashChange(n,i.state))}),e.mobile.document.bind("pageshow",e.mobile.resetActivePageHeight),e.mobile.window.bind("throttledresize",e.mobile.resetActivePageHeight)},e(function(){g.resolve()}),e.when(g,e.mobile.navreadyDeferred).done(function(){e.mobile._registerInternalEvents()})}(e),function(e){e.mobile.transitionFallbacks.flip="fade"}(e,this),function(e){e.mobile.transitionFallbacks.flow="fade"}(e,this),function(e){e.mobile.transitionFallbacks.pop="fade"}(e,this),function(e){e.mobile.transitionHandlers.slide=e.mobile.transitionHandlers.simultaneous,e.mobile.transitionFallbacks.slide="fade"}(e,this),function(e){e.mobile.transitionFallbacks.slidedown="fade"}(e,this),function(e){e.mobile.transitionFallbacks.slidefade="fade"}(e,this),function(e){e.mobile.transitionFallbacks.slideup="fade"}(e,this),function(e){e.mobile.transitionFallbacks.turn="fade"}(e,this),function(e){e.mobile.page.prototype.options.degradeInputs={color:!1,date:!1,datetime:!1,"datetime-local":!1,email:!1,month:!1,number:!1,range:"number",search:"text",tel:!1,time:!1,url:!1,week:!1},e.mobile.document.bind("pagecreate create",function(t){var i,n=e.mobile.closestPageData(e(t.target));n&&(i=n.options,e(t.target).find("input").not(n.keepNativeSelector()).each(function(){var t=e(this),n=this.getAttribute("type"),a=i.degradeInputs[n]||"text";if(i.degradeInputs[n]){var o=e("<div>").html(t.clone()).html(),s=o.indexOf(" type=")>-1,r=s?/\s+type=["']?\w+['"]?/:/\/?>/,l=' type="'+a+'" data-'+e.mobile.ns+'type="'+n+'"'+(s?"":">");t.replaceWith(o.replace(r,l))}}))})}(e),function(e){e.widget("mobile.dialog",e.mobile.widget,{options:{closeBtn:"left",closeBtnText:"Close",overlayTheme:"a",corners:!0,initSelector:":jqmData(role='dialog')"},_handlePageBeforeShow:function(){this._isCloseable=!0,this.options.overlayTheme&&this.element.page("removeContainerBackground").page("setContainerBackground",this.options.overlayTheme)},_create:function(){var t=this.element,i=this.options.corners?" ui-corner-all":"",n=e("<div/>",{role:"dialog","class":"ui-dialog-contain ui-overlay-shadow"+i});t.addClass("ui-dialog ui-overlay-"+this.options.overlayTheme),t.wrapInner(n),t.bind("vclick submit",function(t){var i,n=e(t.target).closest("vclick"===t.type?"a":"form");n.length&&!n.jqmData("transition")&&(i=e.mobile.urlHistory.getActive()||{},n.attr("data-"+e.mobile.ns+"transition",i.transition||e.mobile.defaultDialogTransition).attr("data-"+e.mobile.ns+"direction","reverse"))}),this._on(t,{pagebeforeshow:"_handlePageBeforeShow"}),e.extend(this,{_createComplete:!1}),this._setCloseBtn(this.options.closeBtn)},_setCloseBtn:function(t){var i,n,a=this;this._headerCloseButton&&(this._headerCloseButton.remove(),this._headerCloseButton=null),"none"!==t&&(n="left"===t?"left":"right",i=e("<a href='#' class='ui-btn-"+n+"' data-"+e.mobile.ns+"icon='delete' data-"+e.mobile.ns+"iconpos='notext'>"+this.options.closeBtnText+"</a>"),this.element.children().find(":jqmData(role='header')").first().prepend(i),this._createComplete&&e.fn.buttonMarkup&&i.buttonMarkup(),this._createComplete=!0,i.bind("click",function(){a.close()}),this._headerCloseButton=i)},_setOption:function(e,t){"closeBtn"===e&&this._setCloseBtn(t),this._super(e,t)},close:function(){var t,i,n=e.mobile.navigate.history;this._isCloseable&&(this._isCloseable=!1,e.mobile.hashListeningEnabled&&n.activeIndex>0?e.mobile.back():(t=Math.max(0,n.activeIndex-1),i=n.stack[t].pageUrl||n.stack[t].url,n.previousIndex=n.activeIndex,n.activeIndex=t,e.mobile.path.isPath(i)||(i=e.mobile.path.makeUrlAbsolute("#"+i)),e.mobile.changePage(i,{direction:"back",changeHash:!1,fromHashChange:!0})))}}),e.mobile.document.delegate(e.mobile.dialog.prototype.options.initSelector,"pagecreate",function(){e.mobile.dialog.prototype.enhance(this)})}(e,this),function(e){e.mobile.page.prototype.options.backBtnText="Back",e.mobile.page.prototype.options.addBackBtn=!1,e.mobile.page.prototype.options.backBtnTheme=null,e.mobile.page.prototype.options.headerTheme="a",e.mobile.page.prototype.options.footerTheme="a",e.mobile.page.prototype.options.contentTheme=null,e.mobile.document.bind("pagecreate",function(t){var i=e(t.target),n=i.data("mobile-page").options,a=i.jqmData("role"),o=n.theme;e(":jqmData(role='header'), :jqmData(role='footer'), :jqmData(role='content')",i).jqmEnhanceable().each(function(){var t,s,r,l,d=e(this),c=d.jqmData("role"),h=d.jqmData("theme"),u=h||n.contentTheme||"dialog"===a&&o;if(d.addClass("ui-"+c),"header"===c||"footer"===c){var p=h||("header"===c?n.headerTheme:n.footerTheme)||o;d.addClass("ui-bar-"+p).attr("role","header"===c?"banner":"contentinfo"),"header"===c&&(t=d.children("a, button"),s=t.hasClass("ui-btn-left"),r=t.hasClass("ui-btn-right"),s=s||t.eq(0).not(".ui-btn-right").addClass("ui-btn-left").length,r=r||t.eq(1).addClass("ui-btn-right").length),n.addBackBtn&&"header"===c&&e(".ui-page").length>1&&i.jqmData("url")!==e.mobile.path.stripHash(location.hash)&&!s&&(l=e("<a href='javascript:void(0);' class='ui-btn-left' data-"+e.mobile.ns+"rel='back' data-"+e.mobile.ns+"icon='arrow-l'>"+n.backBtnText+"</a>").attr("data-"+e.mobile.ns+"theme",n.backBtnTheme||p).prependTo(d)),d.children("h1, h2, h3, h4, h5, h6").addClass("ui-title").attr({role:"heading","aria-level":"1"})}else"content"===c&&(u&&d.addClass("ui-body-"+u),d.attr("role","main"))})})}(e),function(e,t){function n(e){for(var t;e&&(t="string"==typeof e.className&&e.className+" ",!(t&&t.indexOf("ui-btn ")>-1&&0>t.indexOf("ui-disabled ")));)e=e.parentNode;return e}function a(n,a,o,s,r){var l=e.data(n[0],"buttonElements");n.removeClass(a).addClass(o),l&&(l.bcls=e(i.createElement("div")).addClass(l.bcls+" "+o).removeClass(a).attr("class"),s!==t&&(l.hover=s),l.state=r)}var o=function(e,i){var n=e.getAttribute(i);return"true"===n?!0:"false"===n?!1:null===n?t:n};e.fn.buttonMarkup=function(n){var a,r=this,l="data-"+e.mobile.ns;n=n&&"object"===e.type(n)?n:{};for(var d=0;r.length>d;d++){var c,h,u,p,m,f,g=r.eq(d),b=g[0],v=e.extend({},e.fn.buttonMarkup.defaults,{icon:n.icon!==t?n.icon:o(b,l+"icon"),iconpos:n.iconpos!==t?n.iconpos:o(b,l+"iconpos"),theme:n.theme!==t?n.theme:o(b,l+"theme")||e.mobile.getInheritedTheme(g,"c"),inline:n.inline!==t?n.inline:o(b,l+"inline"),shadow:n.shadow!==t?n.shadow:o(b,l+"shadow"),corners:n.corners!==t?n.corners:o(b,l+"corners"),iconshadow:n.iconshadow!==t?n.iconshadow:o(b,l+"iconshadow"),mini:n.mini!==t?n.mini:o(b,l+"mini")},n),_="ui-btn-inner",C="ui-btn-text",x=!1,y="up";for(a in v)v[a]===t||null===v[a]?g.removeAttr(l+a):b.setAttribute(l+a,v[a]);for("popup"===o(b,l+"rel")&&g.attr("href")&&(b.setAttribute("aria-haspopup",!0),b.setAttribute("aria-owns",g.attr("href"))),f=e.data("INPUT"===b.tagName||"BUTTON"===b.tagName?b.parentNode:b,"buttonElements"),f?(b=f.outer,g=e(b),u=f.inner,p=f.text,e(f.icon).remove(),f.icon=null,x=f.hover,y=f.state):(u=i.createElement(v.wrapperEls),p=i.createElement(v.wrapperEls)),m=v.icon?i.createElement("span"):null,s&&!f&&s(),v.theme||(v.theme=e.mobile.getInheritedTheme(g,"c")),c="ui-btn ",c+=x?"ui-btn-hover-"+v.theme:"",c+=y?" ui-btn-"+y+"-"+v.theme:"",c+=v.shadow?" ui-shadow":"",c+=v.corners?" ui-btn-corner-all":"",v.mini!==t&&(c+=v.mini===!0?" ui-mini":" ui-fullsize"),v.inline!==t&&(c+=v.inline===!0?" ui-btn-inline":" ui-btn-block"),v.icon&&(v.icon="ui-icon-"+v.icon,v.iconpos=v.iconpos||"left",h="ui-icon "+v.icon,v.iconshadow&&(h+=" ui-icon-shadow")),v.iconpos&&(c+=" ui-btn-icon-"+v.iconpos,"notext"!==v.iconpos||g.attr("title")||g.attr("title",g.getEncodedText())),f&&g.removeClass(f.bcls||""),g.removeClass("ui-link").addClass(c),u.className=_,p.className=C,f||u.appendChild(p),m&&(m.className=h,f&&f.icon||(m.innerHTML="&#160;",u.appendChild(m)));b.firstChild&&!f;)p.appendChild(b.firstChild);f||b.appendChild(u),f={hover:x,state:y,bcls:c,outer:b,inner:u,text:p,icon:m},e.data(b,"buttonElements",f),e.data(u,"buttonElements",f),e.data(p,"buttonElements",f),m&&e.data(m,"buttonElements",f)}return this},e.fn.buttonMarkup.defaults={corners:!0,shadow:!0,iconshadow:!0,wrapperEls:"span"};var s=function(){var i,o,r=e.mobile.buttonMarkup.hoverDelay;e.mobile.document.bind({"vmousedown vmousecancel vmouseup vmouseover vmouseout focus blur scrollstart":function(s){var l,d=e(n(s.target)),c=s.originalEvent&&/^touch/.test(s.originalEvent.type),h=s.type;d.length&&(l=d.attr("data-"+e.mobile.ns+"theme"),"vmousedown"===h?c?i=setTimeout(function(){a(d,"ui-btn-up-"+l,"ui-btn-down-"+l,t,"down")},r):a(d,"ui-btn-up-"+l,"ui-btn-down-"+l,t,"down"):"vmousecancel"===h||"vmouseup"===h?a(d,"ui-btn-down-"+l,"ui-btn-up-"+l,t,"up"):"vmouseover"===h||"focus"===h?c?o=setTimeout(function(){a(d,"ui-btn-up-"+l,"ui-btn-hover-"+l,!0,"")},r):a(d,"ui-btn-up-"+l,"ui-btn-hover-"+l,!0,""):("vmouseout"===h||"blur"===h||"scrollstart"===h)&&(a(d,"ui-btn-hover-"+l+" ui-btn-down-"+l,"ui-btn-up-"+l,!1,"up"),i&&clearTimeout(i),o&&clearTimeout(o)))},"focusin focus":function(t){e(n(t.target)).addClass(e.mobile.focusClass)},"focusout blur":function(t){e(n(t.target)).removeClass(e.mobile.focusClass)}}),s=null};e.mobile.document.bind("pagecreate create",function(t){e(":jqmData(role='button'), .ui-bar > a, .ui-header > a, .ui-footer > a, .ui-bar > :jqmData(role='controlgroup') > a",t.target).jqmEnhanceable().not("button, input, .ui-btn, :jqmData(role='none'), :jqmData(role='nojs')").buttonMarkup()})}(e),function(e,t){e.widget("mobile.collapsible",e.mobile.widget,{options:{expandCueText:" click to expand contents",collapseCueText:" click to collapse contents",collapsed:!0,heading:"h1,h2,h3,h4,h5,h6,legend",collapsedIcon:"plus",expandedIcon:"minus",iconpos:"left",theme:null,contentTheme:null,inset:!0,corners:!0,mini:!1,initSelector:":jqmData(role='collapsible')"},_create:function(){var i=this.element,n=this.options,a=i.addClass("ui-collapsible"),o=i.children(n.heading).first(),s=a.wrapInner("<div class='ui-collapsible-content'></div>").children(".ui-collapsible-content"),r=i.closest(":jqmData(role='collapsible-set')").addClass("ui-collapsible-set"),l="";o.is("legend")&&(o=e("<div role='heading'>"+o.html()+"</div>").insertBefore(o),o.next().remove()),r.length?(n.theme||(n.theme=r.jqmData("theme")||e.mobile.getInheritedTheme(r,"c")),n.contentTheme||(n.contentTheme=r.jqmData("content-theme")),n.collapsedIcon=i.jqmData("collapsed-icon")||r.jqmData("collapsed-icon")||n.collapsedIcon,n.expandedIcon=i.jqmData("expanded-icon")||r.jqmData("expanded-icon")||n.expandedIcon,n.iconpos=i.jqmData("iconpos")||r.jqmData("iconpos")||n.iconpos,n.inset=r.jqmData("inset")!==t?r.jqmData("inset"):!0,n.corners=!1,n.mini||(n.mini=r.jqmData("mini"))):n.theme||(n.theme=e.mobile.getInheritedTheme(i,"c")),n.inset&&(l+=" ui-collapsible-inset",n.corners&&(l+=" ui-corner-all")),n.contentTheme&&(l+=" ui-collapsible-themed-content",s.addClass("ui-body-"+n.contentTheme)),""!==l&&a.addClass(l),o.insertBefore(s).addClass("ui-collapsible-heading").append("<span class='ui-collapsible-heading-status'></span>").wrapInner("<a href='#' class='ui-collapsible-heading-toggle'></a>").find("a").first().buttonMarkup({shadow:!1,corners:!1,iconpos:n.iconpos,icon:n.collapsedIcon,mini:n.mini,theme:n.theme}),a.bind("expand collapse",function(t){if(!t.isDefaultPrevented()){var i=e(this),a="collapse"===t.type;t.preventDefault(),o.toggleClass("ui-collapsible-heading-collapsed",a).find(".ui-collapsible-heading-status").text(a?n.expandCueText:n.collapseCueText).end().find(".ui-icon").toggleClass("ui-icon-"+n.expandedIcon,!a).toggleClass("ui-icon-"+n.collapsedIcon,a||n.expandedIcon===n.collapsedIcon).end().find("a").first().removeClass(e.mobile.activeBtnClass),i.toggleClass("ui-collapsible-collapsed",a),s.toggleClass("ui-collapsible-content-collapsed",a).attr("aria-hidden",a),s.trigger("updatelayout")}}).trigger(n.collapsed?"collapse":"expand"),o.bind("tap",function(){o.find("a").first().addClass(e.mobile.activeBtnClass)}).bind("click",function(e){var t=o.is(".ui-collapsible-heading-collapsed")?"expand":"collapse";a.trigger(t),e.preventDefault(),e.stopPropagation()})}}),e.mobile.document.bind("pagecreate create",function(t){e.mobile.collapsible.prototype.enhanceWithin(t.target)})}(e),function(e){e.mobile.behaviors.addFirstLastClasses={_getVisibles:function(e,t){var i;return t?i=e.not(".ui-screen-hidden"):(i=e.filter(":visible"),0===i.length&&(i=e.not(".ui-screen-hidden"))),i},_addFirstLastClasses:function(e,t,i){e.removeClass("ui-first-child ui-last-child"),t.eq(0).addClass("ui-first-child").end().last().addClass("ui-last-child"),i||this.element.trigger("updatelayout")}}}(e),function(e,t){e.widget("mobile.collapsibleset",e.mobile.widget,e.extend({options:{initSelector:":jqmData(role='collapsible-set')"},_create:function(){var i=this.element.addClass("ui-collapsible-set"),n=this.options;n.theme||(n.theme=e.mobile.getInheritedTheme(i,"c")),n.contentTheme||(n.contentTheme=i.jqmData("content-theme")),n.corners||(n.corners=i.jqmData("corners")),i.jqmData("inset")!==t&&(n.inset=i.jqmData("inset")),n.inset=n.inset!==t?n.inset:!0,n.corners=n.corners!==t?n.corners:!0,n.corners&&n.inset&&i.addClass("ui-corner-all"),i.jqmData("collapsiblebound")||i.jqmData("collapsiblebound",!0).bind("expand",function(t){var i=e(t.target).closest(".ui-collapsible");i.parent().is(":jqmData(role='collapsible-set')")&&i.siblings(".ui-collapsible").trigger("collapse")})},_init:function(){var e=this.element,t=e.children(":jqmData(role='collapsible')"),i=t.filter(":jqmData(collapsed='false')");
this._refresh("true"),i.trigger("expand")},_refresh:function(t){var i=this.element.children(":jqmData(role='collapsible')");e.mobile.collapsible.prototype.enhance(i.not(".ui-collapsible")),this._addFirstLastClasses(i,this._getVisibles(i,t),t)},refresh:function(){this._refresh(!1)}},e.mobile.behaviors.addFirstLastClasses)),e.mobile.document.bind("pagecreate create",function(t){e.mobile.collapsibleset.prototype.enhanceWithin(t.target)})}(e),function(e){e.fn.fieldcontain=function(){return this.addClass("ui-field-contain ui-body ui-br").contents().filter(function(){return 3===this.nodeType&&!/\S/.test(this.nodeValue)}).remove()},e(i).bind("pagecreate create",function(t){e(":jqmData(role='fieldcontain')",t.target).jqmEnhanceable().fieldcontain()})}(e),function(e){e.fn.grid=function(t){return this.each(function(){var i,n=e(this),a=e.extend({grid:null},t),o=n.children(),s={solo:1,a:2,b:3,c:4,d:5},r=a.grid;if(!r)if(5>=o.length)for(var l in s)s[l]===o.length&&(r=l);else r="a",n.addClass("ui-grid-duo");i=s[r],n.addClass("ui-grid-"+r),o.filter(":nth-child("+i+"n+1)").addClass("ui-block-a"),i>1&&o.filter(":nth-child("+i+"n+2)").addClass("ui-block-b"),i>2&&o.filter(":nth-child("+i+"n+3)").addClass("ui-block-c"),i>3&&o.filter(":nth-child("+i+"n+4)").addClass("ui-block-d"),i>4&&o.filter(":nth-child("+i+"n+5)").addClass("ui-block-e")})}}(e),function(e,t){e.widget("mobile.navbar",e.mobile.widget,{options:{iconpos:"top",grid:null,initSelector:":jqmData(role='navbar')"},_create:function(){var n=this.element,a=n.find("a"),o=a.filter(":jqmData(icon)").length?this.options.iconpos:t;n.addClass("ui-navbar ui-mini").attr("role","navigation").find("ul").jqmEnhanceable().grid({grid:this.options.grid}),a.buttonMarkup({corners:!1,shadow:!1,inline:!0,iconpos:o}),n.delegate("a","vclick",function(t){var n=e(t.target).is("a")?e(this):e(this).parent("a");if(!n.is(".ui-disabled, .ui-btn-active")){a.removeClass(e.mobile.activeBtnClass),e(this).addClass(e.mobile.activeBtnClass);var o=e(this);e(i).one("pagehide",function(){o.removeClass(e.mobile.activeBtnClass)})}}),n.closest(".ui-page").bind("pagebeforeshow",function(){a.filter(".ui-state-persist").addClass(e.mobile.activeBtnClass)})}}),e.mobile.document.bind("pagecreate create",function(t){e.mobile.navbar.prototype.enhanceWithin(t.target)})}(e),function(e){var t={};e.widget("mobile.listview",e.mobile.widget,e.extend({options:{theme:null,countTheme:"c",headerTheme:"b",dividerTheme:"b",icon:"arrow-r",splitIcon:"arrow-r",splitTheme:"b",corners:!0,shadow:!0,inset:!1,initSelector:":jqmData(role='listview')"},_create:function(){var e=this,t="";t+=e.options.inset?" ui-listview-inset":"",e.options.inset&&(t+=e.options.corners?" ui-corner-all":"",t+=e.options.shadow?" ui-shadow":""),e.element.addClass(function(e,i){return i+" ui-listview"+t}),e.refresh(!0)},_findFirstElementByTagName:function(e,t,i,n){var a={};for(a[i]=a[n]=!0;e;){if(a[e.nodeName])return e;e=e[t]}return null},_getChildrenByTagName:function(t,i,n){var a=[],o={};for(o[i]=o[n]=!0,t=t.firstChild;t;)o[t.nodeName]&&a.push(t),t=t.nextSibling;return e(a)},_addThumbClasses:function(t){var i,n,a=t.length;for(i=0;a>i;i++)n=e(this._findFirstElementByTagName(t[i].firstChild,"nextSibling","img","IMG")),n.length&&(n.addClass("ui-li-thumb"),e(this._findFirstElementByTagName(n[0].parentNode,"parentNode","li","LI")).addClass(n.is(".ui-li-icon")?"ui-li-has-icon":"ui-li-has-thumb"))},refresh:function(t){this.parentPage=this.element.closest(".ui-page"),this._createSubPages();var n,a,o,s,r,l,d,c,h,u,p,m,f=this.options,g=this.element,b=g.jqmData("dividertheme")||f.dividerTheme,v=g.jqmData("splittheme"),_=g.jqmData("spliticon"),C=g.jqmData("icon"),x=this._getChildrenByTagName(g[0],"li","LI"),y=!!e.nodeName(g[0],"ol"),w=!e.support.cssPseudoElement,T=g.attr("start"),D={};y&&w&&g.find(".ui-li-dec").remove(),y&&(T||0===T?w?d=parseInt(T,10):(c=parseInt(T,10)-1,g.css("counter-reset","listnumbering "+c)):w&&(d=1)),f.theme||(f.theme=e.mobile.getInheritedTheme(this.element,"c"));for(var P=0,k=x.length;k>P;P++){if(n=x.eq(P),a="ui-li",t||!n.hasClass("ui-li")){o=n.jqmData("theme")||f.theme,s=this._getChildrenByTagName(n[0],"a","A");var E="list-divider"===n.jqmData("role");s.length&&!E?(p=n.jqmData("icon"),n.buttonMarkup({wrapperEls:"div",shadow:!1,corners:!1,iconpos:"right",icon:s.length>1||p===!1?!1:p||C||f.icon,theme:o}),p!==!1&&1===s.length&&n.addClass("ui-li-has-arrow"),s.first().removeClass("ui-link").addClass("ui-link-inherit"),s.length>1&&(a+=" ui-li-has-alt",r=s.last(),l=v||r.jqmData("theme")||f.splitTheme,m=r.jqmData("icon"),r.appendTo(n).attr("title",e.trim(r.getEncodedText())).addClass("ui-li-link-alt").empty().buttonMarkup({shadow:!1,corners:!1,theme:o,icon:!1,iconpos:"notext"}).find(".ui-btn-inner").append(e(i.createElement("span")).buttonMarkup({shadow:!0,corners:!0,theme:l,iconpos:"notext",icon:m||p||_||f.splitIcon})))):E?(a+=" ui-li-divider ui-bar-"+(n.jqmData("theme")||b),n.attr("role","heading"),y&&(T||0===T?w?d=parseInt(T,10):(h=parseInt(T,10)-1,n.css("counter-reset","listnumbering "+h)):w&&(d=1))):a+=" ui-li-static ui-btn-up-"+o}y&&w&&0>a.indexOf("ui-li-divider")&&(u=a.indexOf("ui-li-static")>0?n:n.find(".ui-link-inherit"),u.addClass("ui-li-jsnumbering").prepend("<span class='ui-li-dec'>"+d++ +". </span>")),D[a]||(D[a]=[]),D[a].push(n[0])}for(a in D)e(D[a]).addClass(a).children(".ui-btn-inner").addClass(a);g.find("h1, h2, h3, h4, h5, h6").addClass("ui-li-heading").end().find("p, dl").addClass("ui-li-desc").end().find(".ui-li-aside").each(function(){var t=e(this);t.prependTo(t.parent())}).end().find(".ui-li-count").each(function(){e(this).closest("li").addClass("ui-li-has-count")}).addClass("ui-btn-up-"+(g.jqmData("counttheme")||this.options.countTheme)+" ui-btn-corner-all"),this._addThumbClasses(x),this._addThumbClasses(g.find(".ui-link-inherit")),this._addFirstLastClasses(x,this._getVisibles(x,t),t),this._trigger("afterrefresh")},_idStringEscape:function(e){return e.replace(/[^a-zA-Z0-9]/g,"-")},_createSubPages:function(){var i,a=this.element,o=a.closest(".ui-page"),s=o.jqmData("url"),r=s||o[0][e.expando],l=a.attr("id"),d=this.options,c="data-"+e.mobile.ns,h=this,u=o.find(":jqmData(role='footer')").jqmData("id");if(t[r]===n&&(t[r]=-1),l=l||++t[r],e(a.find("li>ul, li>ol").toArray().reverse()).each(function(t){var n,o,r=e(this),h=r.attr("id")||l+"-"+t,p=r.parent(),m=e(r.prevAll().toArray().reverse()),f=m.length?m:e("<span>"+e.trim(p.contents()[0].nodeValue)+"</span>"),g=f.first().getEncodedText(),b=(s||"")+"&"+e.mobile.subPageUrlKey+"="+h,v=r.jqmData("theme")||d.theme,_=r.jqmData("counttheme")||a.jqmData("counttheme")||d.countTheme;i=!0,n=r.detach().wrap("<div "+c+"role='page' "+c+"url='"+b+"' "+c+"theme='"+v+"' "+c+"count-theme='"+_+"'><div "+c+"role='content'></div></div>").parent().before("<div "+c+"role='header' "+c+"theme='"+d.headerTheme+"'><div class='ui-title'>"+g+"</div></div>").after(u?e("<div "+c+"role='footer' "+c+"id='"+u+"'>"):"").parent().appendTo(e.mobile.pageContainer),n.page(),o=p.find("a:first"),o.length||(o=e("<a/>").html(f||g).prependTo(p.empty())),o.attr("href","#"+b)}).listview(),i&&o.is(":jqmData(external-page='true')")&&o.data("mobile-page").options.domCache===!1){var p=function(t,i){var n,a=i.nextPage,r=new e.Event("pageremove");i.nextPage&&(n=a.jqmData("url"),0!==n.indexOf(s+"&"+e.mobile.subPageUrlKey)&&(h.childPages().remove(),o.trigger(r),r.isDefaultPrevented()||o.removeWithDependents()))};o.unbind("pagehide.remove").bind("pagehide.remove",p)}},childPages:function(){var t=this.parentPage.jqmData("url");return e(":jqmData(url^='"+t+"&"+e.mobile.subPageUrlKey+"')")}},e.mobile.behaviors.addFirstLastClasses)),e.mobile.document.bind("pagecreate create",function(t){e.mobile.listview.prototype.enhanceWithin(t.target)})}(e),function(e){var t=e("meta[name=viewport]"),i=t.attr("content"),n=i+",maximum-scale=1, user-scalable=no",a=i+",maximum-scale=10, user-scalable=yes",o=/(user-scalable[\s]*=[\s]*no)|(maximum-scale[\s]*=[\s]*1)[$,\s]/.test(i);e.mobile.zoom=e.extend({},{enabled:!o,locked:!1,disable:function(i){o||e.mobile.zoom.locked||(t.attr("content",n),e.mobile.zoom.enabled=!1,e.mobile.zoom.locked=i||!1)},enable:function(i){o||e.mobile.zoom.locked&&i!==!0||(t.attr("content",a),e.mobile.zoom.enabled=!0,e.mobile.zoom.locked=!1)},restore:function(){o||(t.attr("content",i),e.mobile.zoom.enabled=!0)}})}(e),function(e){e.widget("mobile.textinput",e.mobile.widget,{options:{theme:null,mini:!1,preventFocusZoom:/iPhone|iPad|iPod/.test(navigator.platform)&&navigator.userAgent.indexOf("AppleWebKit")>-1,initSelector:"input[type='text'], input[type='search'], :jqmData(type='search'), input[type='number'], :jqmData(type='number'), input[type='password'], input[type='email'], input[type='url'], input[type='tel'], textarea, input[type='time'], input[type='date'], input[type='month'], input[type='week'], input[type='datetime'], input[type='datetime-local'], input[type='color'], input:not([type]), input[type='file']",clearBtn:!1,clearSearchButtonText:null,clearBtnText:"clear text",disabled:!1},_create:function(){function t(){setTimeout(function(){a.toggleClass("ui-input-clear-hidden",!s.val())},0)}var i,a,o=this,s=this.element,r=this.options,l=r.theme||e.mobile.getInheritedTheme(this.element,"c"),d=" ui-body-"+l,c=r.mini?" ui-mini":"",h=s.is("[type='search'], :jqmData(type='search')"),u=r.clearSearchButtonText||r.clearBtnText,p=s.is("textarea, :jqmData(type='range')"),m=!!r.clearBtn&&!p,f=s.is("input")&&!s.is(":jqmData(type='range')");if(e("label[for='"+s.attr("id")+"']").addClass("ui-input-text"),i=s.addClass("ui-input-text ui-body-"+l),s[0].autocorrect===n||e.support.touchOverflow||(s[0].setAttribute("autocorrect","off"),s[0].setAttribute("autocomplete","off")),h?i=s.wrap("<div class='ui-input-search ui-shadow-inset ui-btn-corner-all ui-btn-shadow ui-icon-searchfield"+d+c+"'></div>").parent():f&&(i=s.wrap("<div class='ui-input-text ui-shadow-inset ui-corner-all ui-btn-shadow"+d+c+"'></div>").parent()),m||h?(a=e("<a href='#' class='ui-input-clear' title='"+u+"'>"+u+"</a>").bind("click",function(e){s.val("").focus().trigger("change"),a.addClass("ui-input-clear-hidden"),e.preventDefault()}).appendTo(i).buttonMarkup({icon:"delete",iconpos:"notext",corners:!0,shadow:!0,mini:r.mini}),h||i.addClass("ui-input-has-clear"),t(),s.bind("paste cut keyup input focus change blur",t)):f||h||s.addClass("ui-corner-all ui-shadow-inset"+d+c),s.focus(function(){r.preventFocusZoom&&e.mobile.zoom.disable(!0),i.addClass(e.mobile.focusClass)}).blur(function(){i.removeClass(e.mobile.focusClass),r.preventFocusZoom&&e.mobile.zoom.enable(!0)}),s.is("textarea")){var g,b=15,v=100;this._keyup=function(){var e=s[0].scrollHeight,t=s[0].clientHeight;if(e>t){var i=parseFloat(s.css("padding-top")),n=parseFloat(s.css("padding-bottom")),a=i+n;s.height(e-a+b)}},s.on("keyup change input paste",function(){clearTimeout(g),g=setTimeout(o._keyup,v)}),this._on(!0,e.mobile.document,{pagechange:"_keyup"}),e.trim(s.val())&&this._on(!0,e.mobile.window,{load:"_keyup"})}s.attr("disabled")&&this.disable()},disable:function(){var e,t=this.element.is("[type='search'], :jqmData(type='search')"),i=this.element.is("input")&&!this.element.is(":jqmData(type='range')"),n=this.element.attr("disabled",!0)&&(i||t);return e=n?this.element.parent():this.element,e.addClass("ui-disabled"),this._setOption("disabled",!0)},enable:function(){var e,t=this.element.is("[type='search'], :jqmData(type='search')"),i=this.element.is("input")&&!this.element.is(":jqmData(type='range')"),n=this.element.attr("disabled",!1)&&(i||t);return e=n?this.element.parent():this.element,e.removeClass("ui-disabled"),this._setOption("disabled",!1)}}),e.mobile.document.bind("pagecreate create",function(t){e.mobile.textinput.prototype.enhanceWithin(t.target,!0)})}(e),function(e){e.mobile.listview.prototype.options.filter=!1,e.mobile.listview.prototype.options.filterPlaceholder="Filter items...",e.mobile.listview.prototype.options.filterTheme="c",e.mobile.listview.prototype.options.filterReveal=!1;var t=function(e,t){return-1===(""+e).toLowerCase().indexOf(t)};e.mobile.listview.prototype.options.filterCallback=t,e.mobile.document.delegate("ul, ol","listviewcreate",function(){var i=e(this),n=i.data("mobile-listview");if(n&&n.options.filter){n.options.filterReveal&&i.children().addClass("ui-screen-hidden");var a=e("<form>",{"class":"ui-listview-filter ui-bar-"+n.options.filterTheme,role:"search"}).submit(function(e){e.preventDefault(),s.blur()}),o=function(){var a,o=e(this),s=this.value.toLowerCase(),r=null,l=i.children(),d=o.jqmData("lastval")+"",c=!1,h="",u=n.options.filterCallback!==t;if(!d||d!==s){if(n._trigger("beforefilter","beforefilter",{input:this}),o.jqmData("lastval",s),u||s.length<d.length||0!==s.indexOf(d)?r=i.children():(r=i.children(":not(.ui-screen-hidden)"),!r.length&&n.options.filterReveal&&(r=i.children(".ui-screen-hidden"))),s){for(var p=r.length-1;p>=0;p--)a=e(r[p]),h=a.jqmData("filtertext")||a.text(),a.is("li:jqmData(role=list-divider)")?(a.toggleClass("ui-filter-hidequeue",!c),c=!1):n.options.filterCallback(h,s,a)?a.toggleClass("ui-filter-hidequeue",!0):c=!0;r.filter(":not(.ui-filter-hidequeue)").toggleClass("ui-screen-hidden",!1),r.filter(".ui-filter-hidequeue").toggleClass("ui-screen-hidden",!0).toggleClass("ui-filter-hidequeue",!1)}else r.toggleClass("ui-screen-hidden",!!n.options.filterReveal);n._addFirstLastClasses(l,n._getVisibles(l,!1),!1)}},s=e("<input>",{placeholder:n.options.filterPlaceholder}).attr("data-"+e.mobile.ns+"type","search").jqmData("lastval","").bind("keyup change input",o).appendTo(a).textinput();n.options.inset&&a.addClass("ui-listview-filter-inset"),a.bind("submit",function(){return!1}).insertBefore(i)}})}(e),function(e){e.mobile.listview.prototype.options.autodividers=!1,e.mobile.listview.prototype.options.autodividersSelector=function(t){var i=e.trim(t.text())||null;return i?i=i.slice(0,1).toUpperCase():null},e.mobile.document.delegate("ul,ol","listviewcreate",function(){var t=e(this),n=t.data("mobile-listview");if(n&&n.options.autodividers){var a=function(){t.find("li:jqmData(role='list-divider')").remove();for(var a,o,s=t.find("li"),r=null,l=0;s.length>l;l++){if(a=s[l],o=n.options.autodividersSelector(e(a)),o&&r!==o){var d=i.createElement("li");d.appendChild(i.createTextNode(o)),d.setAttribute("data-"+e.mobile.ns+"role","list-divider"),a.parentNode.insertBefore(d,a)}r=o}},o=function(){t.unbind("listviewafterrefresh",o),a(),n.refresh(),t.bind("listviewafterrefresh",o)};o()}})}(e),function(e){e(i).bind("pagecreate create",function(t){e(":jqmData(role='nojs')",t.target).addClass("ui-nojs")})}(e),function(e){e.mobile.behaviors.formReset={_handleFormReset:function(){this._on(this.element.closest("form"),{reset:function(){this._delay("_reset")}})}}}(e),function(e){e.widget("mobile.checkboxradio",e.mobile.widget,e.extend({options:{theme:null,mini:!1,initSelector:"input[type='checkbox'],input[type='radio']"},_create:function(){var t=this,a=this.element,o=this.options,s=function(e,t){return e.jqmData(t)||e.closest("form, fieldset").jqmData(t)},r=e(a).closest("label"),l=r.length?r:e(a).closest("form, fieldset, :jqmData(role='page'), :jqmData(role='dialog')").find("label").filter("[for='"+a[0].id+"']").first(),d=a[0].type,c=s(a,"mini")||o.mini,h=d+"-on",u=d+"-off",p=s(a,"iconpos"),m="ui-"+h,f="ui-"+u;if("checkbox"===d||"radio"===d){e.extend(this,{label:l,inputtype:d,checkedClass:m,uncheckedClass:f,checkedicon:h,uncheckedicon:u}),o.theme||(o.theme=e.mobile.getInheritedTheme(this.element,"c")),l.buttonMarkup({theme:o.theme,icon:u,shadow:!1,mini:c,iconpos:p});var g=i.createElement("div");g.className="ui-"+d,a.add(l).wrapAll(g),l.bind({vmouseover:function(t){e(this).parent().is(".ui-disabled")&&t.stopPropagation()},vclick:function(e){return a.is(":disabled")?(e.preventDefault(),n):(t._cacheVals(),a.prop("checked","radio"===d&&!0||!a.prop("checked")),a.triggerHandler("click"),t._getInputSet().not(a).prop("checked",!1),t._updateAll(),!1)}}),a.bind({vmousedown:function(){t._cacheVals()},vclick:function(){var i=e(this);i.is(":checked")?(i.prop("checked",!0),t._getInputSet().not(i).prop("checked",!1)):i.prop("checked",!1),t._updateAll()},focus:function(){l.addClass(e.mobile.focusClass)},blur:function(){l.removeClass(e.mobile.focusClass)}}),this._handleFormReset(),this.refresh()}},_cacheVals:function(){this._getInputSet().each(function(){e(this).jqmData("cacheVal",this.checked)})},_getInputSet:function(){return"checkbox"===this.inputtype?this.element:this.element.closest("form, :jqmData(role='page'), :jqmData(role='dialog')").find("input[name='"+this.element[0].name+"'][type='"+this.inputtype+"']")},_updateAll:function(){var t=this;this._getInputSet().each(function(){var i=e(this);(this.checked||"checkbox"===t.inputtype)&&i.trigger("change")}).checkboxradio("refresh")},_reset:function(){this.refresh()},refresh:function(){var t=this.element[0],i=" "+e.mobile.activeBtnClass,n=this.checkedClass+(this.element.parents(".ui-controlgroup-horizontal").length?i:""),a=this.label;t.checked?a.removeClass(this.uncheckedClass+i).addClass(n).buttonMarkup({icon:this.checkedicon}):a.removeClass(n).addClass(this.uncheckedClass).buttonMarkup({icon:this.uncheckedicon}),t.disabled?this.disable():this.enable()},disable:function(){this.element.prop("disabled",!0).parent().addClass("ui-disabled")},enable:function(){this.element.prop("disabled",!1).parent().removeClass("ui-disabled")}},e.mobile.behaviors.formReset)),e.mobile.document.bind("pagecreate create",function(t){e.mobile.checkboxradio.prototype.enhanceWithin(t.target,!0)})}(e),function(e){e.widget("mobile.button",e.mobile.widget,{options:{theme:null,icon:null,iconpos:null,corners:!0,shadow:!0,iconshadow:!0,inline:null,mini:null,initSelector:"button, [type='button'], [type='submit'], [type='reset']"},_create:function(){var t,i=this.element,a=function(e){var t,i={};for(t in e)null!==e[t]&&"initSelector"!==t&&(i[t]=e[t]);return i}(this.options),o="";return"A"===i[0].tagName?(i.hasClass("ui-btn")||i.buttonMarkup(),n):(this.options.theme||(this.options.theme=e.mobile.getInheritedTheme(this.element,"c")),~i[0].className.indexOf("ui-btn-left")&&(o="ui-btn-left"),~i[0].className.indexOf("ui-btn-right")&&(o="ui-btn-right"),("submit"===i.attr("type")||"reset"===i.attr("type"))&&(o?o+=" ui-submit":o="ui-submit"),e("label[for='"+i.attr("id")+"']").addClass("ui-submit"),this.button=e("<div></div>")[i.html()?"html":"text"](i.html()||i.val()).insertBefore(i).buttonMarkup(a).addClass(o).append(i.addClass("ui-btn-hidden")),t=this.button,i.bind({focus:function(){t.addClass(e.mobile.focusClass)},blur:function(){t.removeClass(e.mobile.focusClass)}}),this.refresh(),n)},_setOption:function(t,i){var n={};n[t]=i,"initSelector"!==t&&(this.button.buttonMarkup(n),this.element.attr("data-"+(e.mobile.ns||"")+t.replace(/([A-Z])/,"-$1").toLowerCase(),i)),this._super("_setOption",t,i)},enable:function(){return this.element.attr("disabled",!1),this.button.removeClass("ui-disabled").attr("aria-disabled",!1),this._setOption("disabled",!1)},disable:function(){return this.element.attr("disabled",!0),this.button.addClass("ui-disabled").attr("aria-disabled",!0),this._setOption("disabled",!0)},refresh:function(){var t=this.element;t.prop("disabled")?this.disable():this.enable(),e(this.button.data("buttonElements").text)[t.html()?"html":"text"](t.html()||t.val())}}),e.mobile.document.bind("pagecreate create",function(t){e.mobile.button.prototype.enhanceWithin(t.target,!0)})}(e),function(e,n){e.widget("mobile.slider",e.mobile.widget,e.extend({widgetEventPrefix:"slide",options:{theme:null,trackTheme:null,disabled:!1,initSelector:"input[type='range'], :jqmData(type='range'), :jqmData(role='slider')",mini:!1,highlight:!1},_create:function(){var a,o,s=this,r=this.element,l=e.mobile.getInheritedTheme(r,"c"),d=this.options.theme||l,c=this.options.trackTheme||l,h=r[0].nodeName.toLowerCase(),u=(this.isToggleSwitch="select"===h,r.parent().is(":jqmData(role='rangeslider')")),p=this.isToggleSwitch?"ui-slider-switch":"",m=r.attr("id"),f=e("[for='"+m+"']"),g=f.attr("id")||m+"-label",b=f.attr("id",g),v=this.isToggleSwitch?0:parseFloat(r.attr("min")),_=this.isToggleSwitch?r.find("option").length-1:parseFloat(r.attr("max")),C=t.parseFloat(r.attr("step")||1),x=this.options.mini||r.jqmData("mini")?" ui-mini":"",y=i.createElement("a"),w=e(y),T=i.createElement("div"),D=e(T),P=this.options.highlight&&!this.isToggleSwitch?function(){var t=i.createElement("div");return t.className="ui-slider-bg "+e.mobile.activeBtnClass+" ui-btn-corner-all",e(t).prependTo(D)}():!1;if(y.setAttribute("href","#"),T.setAttribute("role","application"),T.className=[this.isToggleSwitch?"ui-slider ":"ui-slider-track ",p," ui-btn-down-",c," ui-btn-corner-all",x].join(""),y.className="ui-slider-handle",T.appendChild(y),w.buttonMarkup({corners:!0,theme:d,shadow:!0}).attr({role:"slider","aria-valuemin":v,"aria-valuemax":_,"aria-valuenow":this._value(),"aria-valuetext":this._value(),title:this._value(),"aria-labelledby":g}),e.extend(this,{slider:D,handle:w,type:h,step:C,max:_,min:v,valuebg:P,isRangeslider:u,dragging:!1,beforeStart:null,userModified:!1,mouseMoved:!1}),this.isToggleSwitch){o=i.createElement("div"),o.className="ui-slider-inneroffset";for(var k=0,E=T.childNodes.length;E>k;k++)o.appendChild(T.childNodes[k]);T.appendChild(o),w.addClass("ui-slider-handle-snapping"),a=r.find("option");for(var q=0,j=a.length;j>q;q++){var S=q?"a":"b",A=q?" "+e.mobile.activeBtnClass:" ui-btn-down-"+c,N=(i.createElement("div"),i.createElement("span"));N.className=["ui-slider-label ui-slider-label-",S,A," ui-btn-corner-all"].join(""),N.setAttribute("role","img"),N.appendChild(i.createTextNode(a[q].innerHTML)),e(N).prependTo(D)}s._labels=e(".ui-slider-label",D)}b.addClass("ui-slider"),r.addClass(this.isToggleSwitch?"ui-slider-switch":"ui-slider-input"),this._on(r,{change:"_controlChange",keyup:"_controlKeyup",blur:"_controlBlur",vmouseup:"_controlVMouseUp"}),D.bind("vmousedown",e.proxy(this._sliderVMouseDown,this)).bind("vclick",!1),this._on(i,{vmousemove:"_preventDocumentDrag"}),this._on(D.add(i),{vmouseup:"_sliderVMouseUp"}),D.insertAfter(r),this.isToggleSwitch||u||(o=this.options.mini?"<div class='ui-slider ui-mini'>":"<div class='ui-slider'>",r.add(D).wrapAll(o)),this.isToggleSwitch&&this.handle.bind({focus:function(){D.addClass(e.mobile.focusClass)},blur:function(){D.removeClass(e.mobile.focusClass)}}),this._on(this.handle,{vmousedown:"_handleVMouseDown",keydown:"_handleKeydown",keyup:"_handleKeyup"}),this.handle.bind("vclick",!1),this._handleFormReset(),this.refresh(n,n,!0)},_controlChange:function(e){return this._trigger("controlchange",e)===!1?!1:(this.mouseMoved||this.refresh(this._value(),!0),n)},_controlKeyup:function(){this.refresh(this._value(),!0,!0)},_controlBlur:function(){this.refresh(this._value(),!0)},_controlVMouseUp:function(){this._checkedRefresh()},_handleVMouseDown:function(){this.handle.focus()},_handleKeydown:function(t){var i=this._value();if(!this.options.disabled){switch(t.keyCode){case e.mobile.keyCode.HOME:case e.mobile.keyCode.END:case e.mobile.keyCode.PAGE_UP:case e.mobile.keyCode.PAGE_DOWN:case e.mobile.keyCode.UP:case e.mobile.keyCode.RIGHT:case e.mobile.keyCode.DOWN:case e.mobile.keyCode.LEFT:t.preventDefault(),this._keySliding||(this._keySliding=!0,this.handle.addClass("ui-state-active"))}switch(t.keyCode){case e.mobile.keyCode.HOME:this.refresh(this.min);break;case e.mobile.keyCode.END:this.refresh(this.max);break;case e.mobile.keyCode.PAGE_UP:case e.mobile.keyCode.UP:case e.mobile.keyCode.RIGHT:this.refresh(i+this.step);break;case e.mobile.keyCode.PAGE_DOWN:case e.mobile.keyCode.DOWN:case e.mobile.keyCode.LEFT:this.refresh(i-this.step)}}},_handleKeyup:function(){this._keySliding&&(this._keySliding=!1,this.handle.removeClass("ui-state-active"))},_sliderVMouseDown:function(e){return this.options.disabled||1!==e.which&&0!==e.which?!1:this._trigger("beforestart",e)===!1?!1:(this.dragging=!0,this.userModified=!1,this.mouseMoved=!1,this.isToggleSwitch&&(this.beforeStart=this.element[0].selectedIndex),this.refresh(e),this._trigger("start"),!1)},_sliderVMouseUp:function(){return this.dragging?(this.dragging=!1,this.isToggleSwitch&&(this.handle.addClass("ui-slider-handle-snapping"),this.mouseMoved?this.userModified?this.refresh(0===this.beforeStart?1:0):this.refresh(this.beforeStart):this.refresh(0===this.beforeStart?1:0)),this.mouseMoved=!1,this._trigger("stop"),!1):n},_preventDocumentDrag:function(e){return this._trigger("drag",e)===!1?!1:this.dragging&&!this.options.disabled?(this.mouseMoved=!0,this.isToggleSwitch&&this.handle.removeClass("ui-slider-handle-snapping"),this.refresh(e),this.userModified=this.beforeStart!==this.element[0].selectedIndex,!1):n},_checkedRefresh:function(){this.value!==this._value()&&this.refresh(this._value())},_value:function(){return this.isToggleSwitch?this.element[0].selectedIndex:parseFloat(this.element.val())},_reset:function(){this.refresh(n,!1,!0)},refresh:function(t,a,o){var s,r,l,d,c=this,h=e.mobile.getInheritedTheme(this.element,"c"),u=this.options.theme||h,p=this.options.trackTheme||h;c.slider[0].className=[this.isToggleSwitch?"ui-slider ui-slider-switch":"ui-slider-track"," ui-btn-down-"+p," ui-btn-corner-all",this.options.mini?" ui-mini":""].join(""),(this.options.disabled||this.element.attr("disabled"))&&this.disable(),this.value=this._value(),this.options.highlight&&!this.isToggleSwitch&&0===this.slider.find(".ui-slider-bg").length&&(this.valuebg=function(){var t=i.createElement("div");return t.className="ui-slider-bg "+e.mobile.activeBtnClass+" ui-btn-corner-all",e(t).prependTo(c.slider)}()),this.handle.buttonMarkup({corners:!0,theme:u,shadow:!0});var m,f,g=this.element,b=!this.isToggleSwitch,v=b?[]:g.find("option"),_=b?parseFloat(g.attr("min")):0,C=b?parseFloat(g.attr("max")):v.length-1,x=b&&parseFloat(g.attr("step"))>0?parseFloat(g.attr("step")):1;if("object"==typeof t){if(l=t,d=8,s=this.slider.offset().left,r=this.slider.width(),m=r/((C-_)/x),!this.dragging||s-d>l.pageX||l.pageX>s+r+d)return;f=m>1?100*((l.pageX-s)/r):Math.round(100*((l.pageX-s)/r))}else null==t&&(t=b?parseFloat(g.val()||0):g[0].selectedIndex),f=100*((parseFloat(t)-_)/(C-_));if(!isNaN(f)){var y=f/100*(C-_)+_,w=(y-_)%x,T=y-w;2*Math.abs(w)>=x&&(T+=w>0?x:-x);var D=100/((C-_)/x);if(y=parseFloat(T.toFixed(5)),m===n&&(m=r/((C-_)/x)),m>1&&b&&(f=(y-_)*D*(1/x)),0>f&&(f=0),f>100&&(f=100),_>y&&(y=_),y>C&&(y=C),this.handle.css("left",f+"%"),this.handle[0].setAttribute("aria-valuenow",b?y:v.eq(y).attr("value")),this.handle[0].setAttribute("aria-valuetext",b?y:v.eq(y).getEncodedText()),this.handle[0].setAttribute("title",b?y:v.eq(y).getEncodedText()),this.valuebg&&this.valuebg.css("width",f+"%"),this._labels){var P=100*(this.handle.width()/this.slider.width()),k=f&&P+(100-P)*f/100,E=100===f?0:Math.min(P+100-k,100);this._labels.each(function(){var t=e(this).is(".ui-slider-label-a");e(this).width((t?k:E)+"%")})}if(!o){var q=!1;if(b?(q=g.val()!==y,g.val(y)):(q=g[0].selectedIndex!==y,g[0].selectedIndex=y),this._trigger("beforechange",t)===!1)return!1;!a&&q&&g.trigger("change")}}},enable:function(){return this.element.attr("disabled",!1),this.slider.removeClass("ui-disabled").attr("aria-disabled",!1),this._setOption("disabled",!1)},disable:function(){return this.element.attr("disabled",!0),this.slider.addClass("ui-disabled").attr("aria-disabled",!0),this._setOption("disabled",!0)}},e.mobile.behaviors.formReset)),e.mobile.document.bind("pagecreate create",function(t){e.mobile.slider.prototype.enhanceWithin(t.target,!0)})}(e),function(e){e.widget("mobile.rangeslider",e.mobile.widget,{options:{theme:null,trackTheme:null,disabled:!1,initSelector:":jqmData(role='rangeslider')",mini:!1,highlight:!0},_create:function(){var t,i=this.element,n=this.options.mini?"ui-rangeslider ui-mini":"ui-rangeslider",a=i.find("input").first(),o=i.find("input").last(),s=i.find("label").first(),r=e.data(a.get(0),"mobileSlider").slider,l=e.data(o.get(0),"mobileSlider").slider,d=e.data(a.get(0),"mobileSlider").handle,c=e('<div class="ui-rangeslider-sliders" />').appendTo(i);i.find("label").length>1&&(t=i.find("label").last().hide()),a.addClass("ui-rangeslider-first"),o.addClass("ui-rangeslider-last"),i.addClass(n),r.appendTo(c),l.appendTo(c),s.prependTo(i),d.prependTo(l),e.extend(this,{_inputFirst:a,_inputLast:o,_sliderFirst:r,_sliderLast:l,_targetVal:null,_sliderTarget:!1,_sliders:c,_proxy:!1}),this.refresh(),this._on(this.element.find("input.ui-slider-input"),{slidebeforestart:"_slidebeforestart",slidestop:"_slidestop",slidedrag:"_slidedrag",slidebeforechange:"_change",blur:"_change",keyup:"_change"}),this._on({mousedown:"_change"}),this._on(this.element.closest("form"),{reset:"_handleReset"}),this._on(d,{vmousedown:"_dragFirstHandle"})},_handleReset:function(){var e=this;setTimeout(function(){e._updateHighlight()},0)},_dragFirstHandle:function(t){return e.data(this._inputFirst.get(0),"mobileSlider").dragging=!0,e.data(this._inputFirst.get(0),"mobileSlider").refresh(t),!1},_slidedrag:function(t){var i=e(t.target).is(this._inputFirst),a=i?this._inputLast:this._inputFirst;return this._sliderTarget=!1,"first"===this._proxy&&i||"last"===this._proxy&&!i?(e.data(a.get(0),"mobileSlider").dragging=!0,e.data(a.get(0),"mobileSlider").refresh(t),!1):n},_slidestop:function(t){var i=e(t.target).is(this._inputFirst);this._proxy=!1,this.element.find("input").trigger("vmouseup"),this._sliderFirst.css("z-index",i?1:"")},_slidebeforestart:function(t){this._sliderTarget=!1,e(t.originalEvent.target).hasClass("ui-slider-track")&&(this._sliderTarget=!0,this._targetVal=e(t.target).val())},_setOption:function(e){this._superApply(e),this.refresh()},refresh:function(){var e=this.element,t=this.options;e.find("input").slider({theme:t.theme,trackTheme:t.trackTheme,disabled:t.disabled,mini:t.mini,highlight:t.highlight}).slider("refresh"),this._updateHighlight()},_change:function(t){if("keyup"===t.type)return this._updateHighlight(),!1;var i=this,a=parseFloat(this._inputFirst.val(),10),o=parseFloat(this._inputLast.val(),10),s=e(t.target).hasClass("ui-rangeslider-first"),r=s?this._inputFirst:this._inputLast,l=s?this._inputLast:this._inputFirst;if(this._inputFirst.val()>this._inputLast.val()&&"mousedown"===t.type&&!e(t.target).hasClass("ui-slider-handle"))r.blur();else if("mousedown"===t.type)return;return a>o&&!this._sliderTarget?(r.val(s?o:a).slider("refresh"),this._trigger("normalize")):a>o&&(r.val(this._targetVal).slider("refresh"),setTimeout(function(){l.val(s?a:o).slider("refresh"),e.data(l.get(0),"mobileSlider").handle.focus(),i._sliderFirst.css("z-index",s?"":1),i._trigger("normalize")},0),this._proxy=s?"first":"last"),a===o?(e.data(r.get(0),"mobileSlider").handle.css("z-index",1),e.data(l.get(0),"mobileSlider").handle.css("z-index",0)):(e.data(l.get(0),"mobileSlider").handle.css("z-index",""),e.data(r.get(0),"mobileSlider").handle.css("z-index","")),this._updateHighlight(),a>=o?!1:n},_updateHighlight:function(){var t=parseInt(e.data(this._inputFirst.get(0),"mobileSlider").handle.get(0).style.left,10),i=parseInt(e.data(this._inputLast.get(0),"mobileSlider").handle.get(0).style.left,10),n=i-t;this.element.find(".ui-slider-bg").css({"margin-left":t+"%",width:n+"%"})},_destroy:function(){this.element.removeClass("ui-rangeslider ui-mini").find("label").show(),this._inputFirst.after(this._sliderFirst),this._inputLast.after(this._sliderLast),this._sliders.remove(),this.element.find("input").removeClass("ui-rangeslider-first ui-rangeslider-last").slider("destroy")}}),e.widget("mobile.rangeslider",e.mobile.rangeslider,e.mobile.behaviors.formReset),e(i).bind("pagecreate create",function(t){e.mobile.rangeslider.prototype.enhanceWithin(t.target,!0)})}(e),function(e){e.widget("mobile.selectmenu",e.mobile.widget,e.extend({options:{theme:null,disabled:!1,icon:"arrow-d",iconpos:"right",inline:!1,corners:!0,shadow:!0,iconshadow:!0,overlayTheme:"a",dividerTheme:"b",hidePlaceholderMenuItems:!0,closeText:"Close",nativeMenu:!0,preventFocusZoom:/iPhone|iPad|iPod/.test(navigator.platform)&&navigator.userAgent.indexOf("AppleWebKit")>-1,initSelector:"select:not( :jqmData(role='slider') )",mini:!1},_button:function(){return e("<div/>")
},_setDisabled:function(e){return this.element.attr("disabled",e),this.button.attr("aria-disabled",e),this._setOption("disabled",e)},_focusButton:function(){var e=this;setTimeout(function(){e.button.focus()},40)},_selectOptions:function(){return this.select.find("option")},_preExtension:function(){var t="";~this.element[0].className.indexOf("ui-btn-left")&&(t=" ui-btn-left"),~this.element[0].className.indexOf("ui-btn-right")&&(t=" ui-btn-right"),this.select=this.element.removeClass("ui-btn-left ui-btn-right").wrap("<div class='ui-select"+t+"'>"),this.selectID=this.select.attr("id"),this.label=e("label[for='"+this.selectID+"']").addClass("ui-select"),this.isMultiple=this.select[0].multiple,this.options.theme||(this.options.theme=e.mobile.getInheritedTheme(this.select,"c"))},_destroy:function(){var e=this.element.parents(".ui-select");e.length>0&&(e.is(".ui-btn-left, .ui-btn-right")&&this.element.addClass(e.is(".ui-btn-left")?"ui-btn-left":"ui-btn-right"),this.element.insertAfter(e),e.remove())},_create:function(){this._preExtension(),this._trigger("beforeCreate"),this.button=this._button();var i=this,n=this.options,a=n.inline||this.select.jqmData("inline"),o=n.mini||this.select.jqmData("mini"),s=n.icon?n.iconpos||this.select.jqmData("iconpos"):!1,r=(-1===this.select[0].selectedIndex?0:this.select[0].selectedIndex,this.button.insertBefore(this.select).buttonMarkup({theme:n.theme,icon:n.icon,iconpos:s,inline:a,corners:n.corners,shadow:n.shadow,iconshadow:n.iconshadow,mini:o}));this.setButtonText(),n.nativeMenu&&t.opera&&t.opera.version&&r.addClass("ui-select-nativeonly"),this.isMultiple&&(this.buttonCount=e("<span>").addClass("ui-li-count ui-btn-up-c ui-btn-corner-all").hide().appendTo(r.addClass("ui-li-has-count"))),(n.disabled||this.element.attr("disabled"))&&this.disable(),this.select.change(function(){i.refresh(),n.nativeMenu&&this.blur()}),this._handleFormReset(),this.build()},build:function(){var t=this;this.select.appendTo(t.button).bind("vmousedown",function(){t.button.addClass(e.mobile.activeBtnClass)}).bind("focus",function(){t.button.addClass(e.mobile.focusClass)}).bind("blur",function(){t.button.removeClass(e.mobile.focusClass)}).bind("focus vmouseover",function(){t.button.trigger("vmouseover")}).bind("vmousemove",function(){t.button.removeClass(e.mobile.activeBtnClass)}).bind("change blur vmouseout",function(){t.button.trigger("vmouseout").removeClass(e.mobile.activeBtnClass)}).bind("change blur",function(){t.button.removeClass("ui-btn-down-"+t.options.theme)}),t.button.bind("vmousedown",function(){t.options.preventFocusZoom&&e.mobile.zoom.disable(!0)}),t.label.bind("click focus",function(){t.options.preventFocusZoom&&e.mobile.zoom.disable(!0)}),t.select.bind("focus",function(){t.options.preventFocusZoom&&e.mobile.zoom.disable(!0)}),t.button.bind("mouseup",function(){t.options.preventFocusZoom&&setTimeout(function(){e.mobile.zoom.enable(!0)},0)}),t.select.bind("blur",function(){t.options.preventFocusZoom&&e.mobile.zoom.enable(!0)})},selected:function(){return this._selectOptions().filter(":selected")},selectedIndices:function(){var e=this;return this.selected().map(function(){return e._selectOptions().index(this)}).get()},setButtonText:function(){var t=this,n=this.selected(),a=this.placeholder,o=e(i.createElement("span"));this.button.find(".ui-btn-text").html(function(){return a=n.length?n.map(function(){return e(this).text()}).get().join(", "):t.placeholder,o.text(a).addClass(t.select.attr("class")).addClass(n.attr("class"))})},setButtonCount:function(){var e=this.selected();this.isMultiple&&this.buttonCount[e.length>1?"show":"hide"]().text(e.length)},_reset:function(){this.refresh()},refresh:function(){this.setButtonText(),this.setButtonCount()},open:e.noop,close:e.noop,disable:function(){this._setDisabled(!0),this.button.addClass("ui-disabled")},enable:function(){this._setDisabled(!1),this.button.removeClass("ui-disabled")}},e.mobile.behaviors.formReset)),e.mobile.document.bind("pagecreate create",function(t){e.mobile.selectmenu.prototype.enhanceWithin(t.target,!0)})}(e),function(e,n){function a(e,t,i,n){var a=n;return a=t>e?i+(e-t)/2:Math.min(Math.max(i,n-t/2),i+e-t)}function o(){var i=e.mobile.window;return{x:i.scrollLeft(),y:i.scrollTop(),cx:t.innerWidth||i.width(),cy:t.innerHeight||i.height()}}e.widget("mobile.popup",e.mobile.widget,{options:{theme:null,overlayTheme:null,shadow:!0,corners:!0,transition:"none",positionTo:"origin",tolerance:null,initSelector:":jqmData(role='popup')",closeLinkSelector:"a:jqmData(rel='back')",closeLinkEvents:"click.popup",navigateEvents:"navigate.popup",closeEvents:"navigate.popup pagebeforechange.popup",dismissible:!0,history:!e.mobile.browser.oldIE},_eatEventAndClose:function(e){return e.preventDefault(),e.stopImmediatePropagation(),this.options.dismissible&&this.close(),!1},_resizeScreen:function(){var e=this._ui.container.outerHeight(!0);this._ui.screen.removeAttr("style"),e>this._ui.screen.height()&&this._ui.screen.height(e)},_handleWindowKeyUp:function(t){return this._isOpen&&t.keyCode===e.mobile.keyCode.ESCAPE?this._eatEventAndClose(t):n},_expectResizeEvent:function(){var t=o();if(this._resizeData){if(t.x===this._resizeData.winCoords.x&&t.y===this._resizeData.winCoords.y&&t.cx===this._resizeData.winCoords.cx&&t.cy===this._resizeData.winCoords.cy)return!1;clearTimeout(this._resizeData.timeoutId)}return this._resizeData={timeoutId:setTimeout(e.proxy(this,"_resizeTimeout"),200),winCoords:t},!0},_resizeTimeout:function(){this._isOpen?this._expectResizeEvent()||(this._ui.container.hasClass("ui-popup-hidden")&&(this._ui.container.removeClass("ui-popup-hidden"),this.reposition({positionTo:"window"}),this._ignoreResizeEvents()),this._resizeScreen(),this._resizeData=null,this._orientationchangeInProgress=!1):(this._resizeData=null,this._orientationchangeInProgress=!1)},_ignoreResizeEvents:function(){var e=this;this._ignoreResizeTo&&clearTimeout(this._ignoreResizeTo),this._ignoreResizeTo=setTimeout(function(){e._ignoreResizeTo=0},1e3)},_handleWindowResize:function(){this._isOpen&&0===this._ignoreResizeTo&&(!this._expectResizeEvent()&&!this._orientationchangeInProgress||this._ui.container.hasClass("ui-popup-hidden")||this._ui.container.addClass("ui-popup-hidden").removeAttr("style"))},_handleWindowOrientationchange:function(){!this._orientationchangeInProgress&&this._isOpen&&0===this._ignoreResizeTo&&(this._expectResizeEvent(),this._orientationchangeInProgress=!0)},_handleDocumentFocusIn:function(t){var n,a=t.target,o=this._ui;if(this._isOpen){if(a!==o.container[0]){if(n=e(t.target),0===n.parents().filter(o.container[0]).length)return e(i.activeElement).one("focus",function(){n.blur()}),o.focusElement.focus(),t.preventDefault(),t.stopImmediatePropagation(),!1;o.focusElement[0]===o.container[0]&&(o.focusElement=n)}this._ignoreResizeEvents()}},_create:function(){var t={screen:e("<div class='ui-screen-hidden ui-popup-screen'></div>"),placeholder:e("<div style='display: none;'><!-- placeholder --></div>"),container:e("<div class='ui-popup-container ui-popup-hidden'></div>")},i=this.element.closest(".ui-page"),a=this.element.attr("id"),o=this;this.options.history=this.options.history&&e.mobile.ajaxEnabled&&e.mobile.hashListeningEnabled,0===i.length&&(i=e("body")),this.options.container=this.options.container||e.mobile.pageContainer,i.append(t.screen),t.container.insertAfter(t.screen),t.placeholder.insertAfter(this.element),a&&(t.screen.attr("id",a+"-screen"),t.container.attr("id",a+"-popup"),t.placeholder.html("<!-- placeholder for "+a+" -->")),t.container.append(this.element),t.focusElement=t.container,this.element.addClass("ui-popup"),e.extend(this,{_scrollTop:0,_page:i,_ui:t,_fallbackTransition:"",_currentTransition:!1,_prereqs:null,_isOpen:!1,_tolerance:null,_resizeData:null,_ignoreResizeTo:0,_orientationchangeInProgress:!1}),e.each(this.options,function(e,t){o.options[e]=n,o._setOption(e,t,!0)}),t.screen.bind("vclick",e.proxy(this,"_eatEventAndClose")),this._on(e.mobile.window,{orientationchange:e.proxy(this,"_handleWindowOrientationchange"),resize:e.proxy(this,"_handleWindowResize"),keyup:e.proxy(this,"_handleWindowKeyUp")}),this._on(e.mobile.document,{focusin:e.proxy(this,"_handleDocumentFocusIn")})},_applyTheme:function(e,t,i){for(var n,a=(e.attr("class")||"").split(" "),o=null,s=t+"";a.length>0;){if(o=a.pop(),n=RegExp("^ui-"+i+"-([a-z])$").exec(o),n&&n.length>1){o=n[1];break}o=null}t!==o&&(e.removeClass("ui-"+i+"-"+o),null!==t&&"none"!==t&&e.addClass("ui-"+i+"-"+s))},_setTheme:function(e){this._applyTheme(this.element,e,"body")},_setOverlayTheme:function(e){this._applyTheme(this._ui.screen,e,"overlay"),this._isOpen&&this._ui.screen.addClass("in")},_setShadow:function(e){this.element.toggleClass("ui-overlay-shadow",e)},_setCorners:function(e){this.element.toggleClass("ui-corner-all",e)},_applyTransition:function(t){this._ui.container.removeClass(this._fallbackTransition),t&&"none"!==t&&(this._fallbackTransition=e.mobile._maybeDegradeTransition(t),"none"===this._fallbackTransition&&(this._fallbackTransition=""),this._ui.container.addClass(this._fallbackTransition))},_setTransition:function(e){this._currentTransition||this._applyTransition(e)},_setTolerance:function(t){var i={t:30,r:15,b:30,l:15};if(t!==n){var a=(t+"").split(",");switch(e.each(a,function(e,t){a[e]=parseInt(t,10)}),a.length){case 1:isNaN(a[0])||(i.t=i.r=i.b=i.l=a[0]);break;case 2:isNaN(a[0])||(i.t=i.b=a[0]),isNaN(a[1])||(i.l=i.r=a[1]);break;case 4:isNaN(a[0])||(i.t=a[0]),isNaN(a[1])||(i.r=a[1]),isNaN(a[2])||(i.b=a[2]),isNaN(a[3])||(i.l=a[3]);break;default:}}this._tolerance=i},_setOption:function(t,i){var a,o="_set"+t.charAt(0).toUpperCase()+t.slice(1);this[o]!==n&&this[o](i),a=["initSelector","closeLinkSelector","closeLinkEvents","navigateEvents","closeEvents","history","container"],e.mobile.widget.prototype._setOption.apply(this,arguments),-1===e.inArray(t,a)&&this.element.attr("data-"+(e.mobile.ns||"")+t.replace(/([A-Z])/,"-$1").toLowerCase(),i)},_placementCoords:function(e){var t,n,s=o(),r={x:this._tolerance.l,y:s.y+this._tolerance.t,cx:s.cx-this._tolerance.l-this._tolerance.r,cy:s.cy-this._tolerance.t-this._tolerance.b};this._ui.container.css("max-width",r.cx),t={cx:this._ui.container.outerWidth(!0),cy:this._ui.container.outerHeight(!0)},n={x:a(r.cx,t.cx,r.x,e.x),y:a(r.cy,t.cy,r.y,e.y)},n.y=Math.max(0,n.y);var l=i.documentElement,d=i.body,c=Math.max(l.clientHeight,d.scrollHeight,d.offsetHeight,l.scrollHeight,l.offsetHeight);return n.y-=Math.min(n.y,Math.max(0,n.y+t.cy-c)),{left:n.x,top:n.y}},_createPrereqs:function(t,i,n){var a,o=this;a={screen:e.Deferred(),container:e.Deferred()},a.screen.then(function(){a===o._prereqs&&t()}),a.container.then(function(){a===o._prereqs&&i()}),e.when(a.screen,a.container).done(function(){a===o._prereqs&&(o._prereqs=null,n())}),o._prereqs=a},_animate:function(t){return this._ui.screen.removeClass(t.classToRemove).addClass(t.screenClassToAdd),t.prereqs.screen.resolve(),t.transition&&"none"!==t.transition&&(t.applyTransition&&this._applyTransition(t.transition),this._fallbackTransition)?(this._ui.container.animationComplete(e.proxy(t.prereqs.container,"resolve")).addClass(t.containerClassToAdd).removeClass(t.classToRemove),n):(this._ui.container.removeClass(t.classToRemove),t.prereqs.container.resolve(),n)},_desiredCoords:function(t){var i,n=null,a=o(),s=t.x,r=t.y,l=t.positionTo;if(l&&"origin"!==l)if("window"===l)s=a.cx/2+a.x,r=a.cy/2+a.y;else{try{n=e(l)}catch(d){n=null}n&&(n.filter(":visible"),0===n.length&&(n=null))}return n&&(i=n.offset(),s=i.left+n.outerWidth()/2,r=i.top+n.outerHeight()/2),("number"!==e.type(s)||isNaN(s))&&(s=a.cx/2+a.x),("number"!==e.type(r)||isNaN(r))&&(r=a.cy/2+a.y),{x:s,y:r}},_reposition:function(e){e={x:e.x,y:e.y,positionTo:e.positionTo},this._trigger("beforeposition",e),this._ui.container.offset(this._placementCoords(this._desiredCoords(e)))},reposition:function(e){this._isOpen&&this._reposition(e)},_openPrereqsComplete:function(){this._ui.container.addClass("ui-popup-active"),this._isOpen=!0,this._resizeScreen(),this._ui.container.attr("tabindex","0").focus(),this._ignoreResizeEvents(),this._trigger("afteropen")},_open:function(t){var i=e.extend({},this.options,t),n=function(){var e=navigator.userAgent,t=e.match(/AppleWebKit\/([0-9\.]+)/),i=!!t&&t[1],n=e.match(/Android (\d+(?:\.\d+))/),a=!!n&&n[1],o=e.indexOf("Chrome")>-1;return null!==n&&"4.0"===a&&i&&i>534.13&&!o?!0:!1}();this._createPrereqs(e.noop,e.noop,e.proxy(this,"_openPrereqsComplete")),this._currentTransition=i.transition,this._applyTransition(i.transition),this.options.theme||this._setTheme(this._page.jqmData("theme")||e.mobile.getInheritedTheme(this._page,"c")),this._ui.screen.removeClass("ui-screen-hidden"),this._ui.container.removeClass("ui-popup-hidden"),this._reposition(i),this.options.overlayTheme&&n&&this.element.closest(".ui-page").addClass("ui-popup-open"),this._animate({additionalCondition:!0,transition:i.transition,classToRemove:"",screenClassToAdd:"in",containerClassToAdd:"in",applyTransition:!1,prereqs:this._prereqs})},_closePrereqScreen:function(){this._ui.screen.removeClass("out").addClass("ui-screen-hidden")},_closePrereqContainer:function(){this._ui.container.removeClass("reverse out").addClass("ui-popup-hidden").removeAttr("style")},_closePrereqsDone:function(){this.options,this._ui.container.removeAttr("tabindex"),e.mobile.popup.active=n,this._trigger("afterclose")},_close:function(t){this._ui.container.removeClass("ui-popup-active"),this._page.removeClass("ui-popup-open"),this._isOpen=!1,this._createPrereqs(e.proxy(this,"_closePrereqScreen"),e.proxy(this,"_closePrereqContainer"),e.proxy(this,"_closePrereqsDone")),this._animate({additionalCondition:this._ui.screen.hasClass("in"),transition:t?"none":this._currentTransition,classToRemove:"in",screenClassToAdd:"out",containerClassToAdd:"reverse out",applyTransition:!0,prereqs:this._prereqs})},_unenhance:function(){this._setTheme("none"),this.element.detach().insertAfter(this._ui.placeholder).removeClass("ui-popup ui-overlay-shadow ui-corner-all"),this._ui.screen.remove(),this._ui.container.remove(),this._ui.placeholder.remove()},_destroy:function(){e.mobile.popup.active===this?(this.element.one("popupafterclose",e.proxy(this,"_unenhance")),this.close()):this._unenhance()},_closePopup:function(i,n){var a,o,s=this.options,r=!1;t.scrollTo(0,this._scrollTop),i&&"pagebeforechange"===i.type&&n&&(a="string"==typeof n.toPage?n.toPage:n.toPage.jqmData("url"),a=e.mobile.path.parseUrl(a),o=a.pathname+a.search+a.hash,this._myUrl!==e.mobile.path.makeUrlAbsolute(o)?r=!0:i.preventDefault()),s.container.unbind(s.closeEvents),this.element.undelegate(s.closeLinkSelector,s.closeLinkEvents),this._close(r)},_bindContainerClose:function(){this.options.container.one(this.options.closeEvents,e.proxy(this,"_closePopup"))},open:function(i){var a,o,s,r,l,d,c=this,h=this.options;if(!e.mobile.popup.active){if(e.mobile.popup.active=this,this._scrollTop=e.mobile.window.scrollTop(),!h.history)return c._open(i),c._bindContainerClose(),c.element.delegate(h.closeLinkSelector,h.closeLinkEvents,function(e){c.close(),e.preventDefault()}),n;if(d=e.mobile.urlHistory,o=e.mobile.dialogHashKey,s=e.mobile.activePage,r=s.is(".ui-dialog"),this._myUrl=a=d.getActive().url,l=a.indexOf(o)>-1&&!r&&d.activeIndex>0)return c._open(i),c._bindContainerClose(),n;-1!==a.indexOf(o)||r?a=e.mobile.path.parseLocation().hash+o:a+=a.indexOf("#")>-1?o:"#"+o,0===d.activeIndex&&a===d.initialDst&&(a+=o),e(t).one("beforenavigate",function(e){e.preventDefault(),c._open(i),c._bindContainerClose()}),this.urlAltered=!0,e.mobile.navigate(a,{role:"dialog"})}},close:function(){e.mobile.popup.active===this&&(this._scrollTop=e.mobile.window.scrollTop(),this.options.history&&this.urlAltered?(e.mobile.back(),this.urlAltered=!1):this._closePopup())}}),e.mobile.popup.handleLink=function(t){var i,n=t.closest(":jqmData(role='page')"),a=0===n.length?e("body"):n,o=e(e.mobile.path.parseUrl(t.attr("href")).hash,a[0]);o.data("mobile-popup")&&(i=t.offset(),o.popup("open",{x:i.left+t.outerWidth()/2,y:i.top+t.outerHeight()/2,transition:t.jqmData("transition"),positionTo:t.jqmData("position-to")})),setTimeout(function(){var i=t.parent().parent();i.hasClass("ui-li")&&(t=i.parent()),t.removeClass(e.mobile.activeBtnClass)},300)},e.mobile.document.bind("pagebeforechange",function(t,i){"popup"===i.options.role&&(e.mobile.popup.handleLink(i.options.link),t.preventDefault())}),e.mobile.document.bind("pagecreate create",function(t){e.mobile.popup.prototype.enhanceWithin(t.target,!0)})}(e),function(e,t){var n=function(n){var a,o,s,r=(n.select,n._destroy),l=n.selectID,d=l?l:(e.mobile.ns||"")+"uuid-"+n.uuid,c=d+"-listbox",h=d+"-dialog",u=n.label,p=n.select.closest(".ui-page"),m=n._selectOptions(),f=n.isMultiple=n.select[0].multiple,g=l+"-button",b=l+"-menu",v=e("<div data-"+e.mobile.ns+"role='dialog' id='"+h+"' data-"+e.mobile.ns+"theme='"+n.options.theme+"' data-"+e.mobile.ns+"overlay-theme='"+n.options.overlayTheme+"'>"+"<div data-"+e.mobile.ns+"role='header'>"+"<div class='ui-title'>"+u.getEncodedText()+"</div>"+"</div>"+"<div data-"+e.mobile.ns+"role='content'></div>"+"</div>"),_=e("<div id='"+c+"' class='ui-selectmenu'>").insertAfter(n.select).popup({theme:n.options.overlayTheme}),C=e("<ul>",{"class":"ui-selectmenu-list",id:b,role:"listbox","aria-labelledby":g}).attr("data-"+e.mobile.ns+"theme",n.options.theme).attr("data-"+e.mobile.ns+"divider-theme",n.options.dividerTheme).appendTo(_),x=e("<div>",{"class":"ui-header ui-bar-"+n.options.theme}).prependTo(_),y=e("<h1>",{"class":"ui-title"}).appendTo(x);n.isMultiple&&(s=e("<a>",{text:n.options.closeText,href:"#","class":"ui-btn-left"}).attr("data-"+e.mobile.ns+"iconpos","notext").attr("data-"+e.mobile.ns+"icon","delete").appendTo(x).buttonMarkup()),e.extend(n,{select:n.select,selectID:l,buttonId:g,menuId:b,popupID:c,dialogID:h,thisPage:p,menuPage:v,label:u,selectOptions:m,isMultiple:f,theme:n.options.theme,listbox:_,list:C,header:x,headerTitle:y,headerClose:s,menuPageContent:a,menuPageClose:o,placeholder:"",build:function(){var i=this;i.refresh(),i._origTabIndex===t&&(i._origTabIndex=null===i.select[0].getAttribute("tabindex")?!1:i.select.attr("tabindex")),i.select.attr("tabindex","-1").focus(function(){e(this).blur(),i.button.focus()}),i.button.bind("vclick keydown",function(t){i.options.disabled||i.isOpen||("vclick"===t.type||t.keyCode&&(t.keyCode===e.mobile.keyCode.ENTER||t.keyCode===e.mobile.keyCode.SPACE))&&(i._decideFormat(),"overlay"===i.menuType?i.button.attr("href","#"+i.popupID).attr("data-"+(e.mobile.ns||"")+"rel","popup"):i.button.attr("href","#"+i.dialogID).attr("data-"+(e.mobile.ns||"")+"rel","dialog"),i.isOpen=!0)}),i.list.attr("role","listbox").bind("focusin",function(t){e(t.target).attr("tabindex","0").trigger("vmouseover")}).bind("focusout",function(t){e(t.target).attr("tabindex","-1").trigger("vmouseout")}).delegate("li:not(.ui-disabled, .ui-li-divider)","click",function(t){var a=i.select[0].selectedIndex,o=i.list.find("li:not(.ui-li-divider)").index(this),s=i._selectOptions().eq(o)[0];s.selected=i.isMultiple?!s.selected:!0,i.isMultiple&&e(this).find(".ui-icon").toggleClass("ui-icon-checkbox-on",s.selected).toggleClass("ui-icon-checkbox-off",!s.selected),(i.isMultiple||a!==o)&&i.select.trigger("change"),i.isMultiple?i.list.find("li:not(.ui-li-divider)").eq(o).addClass("ui-btn-down-"+n.options.theme).find("a").first().focus():i.close(),t.preventDefault()}).keydown(function(t){var i,a,o=e(t.target),s=o.closest("li");switch(t.keyCode){case 38:return i=s.prev().not(".ui-selectmenu-placeholder"),i.is(".ui-li-divider")&&(i=i.prev()),i.length&&(o.blur().attr("tabindex","-1"),i.addClass("ui-btn-down-"+n.options.theme).find("a").first().focus()),!1;case 40:return a=s.next(),a.is(".ui-li-divider")&&(a=a.next()),a.length&&(o.blur().attr("tabindex","-1"),a.addClass("ui-btn-down-"+n.options.theme).find("a").first().focus()),!1;case 13:case 32:return o.trigger("click"),!1}}),i.menuPage.bind("pagehide",function(){e.mobile._bindPageRemove.call(i.thisPage)}),i.listbox.bind("popupafterclose",function(){i.close()}),i.isMultiple&&i.headerClose.click(function(){return"overlay"===i.menuType?(i.close(),!1):t}),i.thisPage.addDependents(this.menuPage)},_isRebuildRequired:function(){var e=this.list.find("li"),t=this._selectOptions();return t.text()!==e.text()},selected:function(){return this._selectOptions().filter(":selected:not( :jqmData(placeholder='true') )")},refresh:function(t){var i,n=this;this.element,this.isMultiple,(t||this._isRebuildRequired())&&n._buildList(),i=this.selectedIndices(),n.setButtonText(),n.setButtonCount(),n.list.find("li:not(.ui-li-divider)").removeClass(e.mobile.activeBtnClass).attr("aria-selected",!1).each(function(t){if(e.inArray(t,i)>-1){var a=e(this);a.attr("aria-selected",!0),n.isMultiple?a.find(".ui-icon").removeClass("ui-icon-checkbox-off").addClass("ui-icon-checkbox-on"):a.is(".ui-selectmenu-placeholder")?a.next().addClass(e.mobile.activeBtnClass):a.addClass(e.mobile.activeBtnClass)}})},close:function(){if(!this.options.disabled&&this.isOpen){var e=this;"page"===e.menuType?(e.menuPage.dialog("close"),e.list.appendTo(e.listbox)):e.listbox.popup("close"),e._focusButton(),e.isOpen=!1}},open:function(){this.button.click()},_decideFormat:function(){function t(){var t=i.list.find("."+e.mobile.activeBtnClass+" a");0===t.length&&(t=i.list.find("li.ui-btn:not( :jqmData(placeholder='true') ) a")),t.first().focus().closest("li").addClass("ui-btn-down-"+n.options.theme)}var i=this,a=e.mobile.window,o=i.list.parent(),s=o.outerHeight(),r=(o.outerWidth(),e("."+e.mobile.activePageClass),a.scrollTop()),l=i.button.offset().top,d=a.height();a.width(),s>d-80||!e.support.scrollTop?(i.menuPage.appendTo(e.mobile.pageContainer).page(),i.menuPageContent=v.find(".ui-content"),i.menuPageClose=v.find(".ui-header a"),i.thisPage.unbind("pagehide.remove"),0===r&&l>d&&i.thisPage.one("pagehide",function(){e(this).jqmData("lastScroll",l)}),i.menuPage.one("pageshow",function(){t()}).one("pagehide",function(){i.close()}),i.menuType="page",i.menuPageContent.append(i.list),i.menuPage.find("div .ui-title").text(i.label.text())):(i.menuType="overlay",i.listbox.one("popupafteropen",t))},_buildList:function(){var t=this,n=this.options,a=this.placeholder,o=!0,s=t.isMultiple?"checkbox-off":"false";t.list.empty().filter(".ui-listview").listview("destroy");for(var r,l=t.select.find("option"),d=l.length,c=this.select[0],h="data-"+e.mobile.ns,u=h+"option-index",p=h+"icon",m=h+"role",f=h+"placeholder",g=i.createDocumentFragment(),b=!1,v=0;d>v;v++,b=!1){var _=l[v],C=e(_),x=_.parentNode,y=C.text(),w=i.createElement("a"),T=[];if(w.setAttribute("href","#"),w.appendChild(i.createTextNode(y)),x!==c&&"optgroup"===x.nodeName.toLowerCase()){var D=x.getAttribute("label");if(D!==r){var P=i.createElement("li");P.setAttribute(m,"list-divider"),P.setAttribute("role","option"),P.setAttribute("tabindex","-1"),P.appendChild(i.createTextNode(D)),g.appendChild(P),r=D}}!o||_.getAttribute("value")&&0!==y.length&&!C.jqmData("placeholder")||(o=!1,b=!0,null===_.getAttribute(f)&&(this._removePlaceholderAttr=!0),_.setAttribute(f,!0),n.hidePlaceholderMenuItems&&T.push("ui-selectmenu-placeholder"),a!==y&&(a=t.placeholder=y));var k=i.createElement("li");_.disabled&&(T.push("ui-disabled"),k.setAttribute("aria-disabled",!0)),k.setAttribute(u,v),k.setAttribute(p,s),b&&k.setAttribute(f,!0),k.className=T.join(" "),k.setAttribute("role","option"),w.setAttribute("tabindex","-1"),k.appendChild(w),g.appendChild(k)}t.list[0].appendChild(g),this.isMultiple||a.length?this.headerTitle.text(this.placeholder):this.header.hide(),t.list.listview()},_button:function(){return e("<a>",{href:"#",role:"button",id:this.buttonId,"aria-haspopup":"true","aria-owns":this.menuId})},_destroy:function(){this.close(),this._origTabIndex!==t&&(this._origTabIndex!==!1?this.select.attr("tabindex",this._origTabIndex):this.select.removeAttr("tabindex")),this._removePlaceholderAttr&&this._selectOptions().removeAttr("data-"+e.mobile.ns+"placeholder"),this.listbox.remove(),r.apply(this,arguments)}})};e.mobile.document.bind("selectmenubeforecreate",function(t){var i=e(t.target).data("mobile-selectmenu");i.options.nativeMenu||0!==i.element.parents(":jqmData(role='popup')").length||n(i)})}(e),function(e,t){e.widget("mobile.controlgroup",e.mobile.widget,e.extend({options:{shadow:!1,corners:!0,excludeInvisible:!0,type:"vertical",mini:!1,initSelector:":jqmData(role='controlgroup')"},_create:function(){var i=this.element,n={inner:e("<div class='ui-controlgroup-controls'></div>"),legend:e("<div role='heading' class='ui-controlgroup-label'></div>")},a=i.children("legend"),o=this;i.wrapInner(n.inner),a.length&&n.legend.append(a).insertBefore(i.children(0)),i.addClass("ui-corner-all ui-controlgroup"),e.extend(this,{_initialRefresh:!0}),e.each(this.options,function(e,i){o.options[e]=t,o._setOption(e,i,!0)})},_init:function(){this.refresh()},_setOption:function(i,n){var a="_set"+i.charAt(0).toUpperCase()+i.slice(1);this[a]!==t&&this[a](n),this._super(i,n),this.element.attr("data-"+(e.mobile.ns||"")+i.replace(/([A-Z])/,"-$1").toLowerCase(),n)},_setType:function(e){this.element.removeClass("ui-controlgroup-horizontal ui-controlgroup-vertical").addClass("ui-controlgroup-"+e),this.refresh()},_setCorners:function(e){this.element.toggleClass("ui-corner-all",e)},_setShadow:function(e){this.element.toggleClass("ui-shadow",e)},_setMini:function(e){this.element.toggleClass("ui-mini",e)},container:function(){return this.element.children(".ui-controlgroup-controls")},refresh:function(){var t=this.element.find(".ui-btn").not(".ui-slider-handle"),i=this._initialRefresh;e.mobile.checkboxradio&&this.element.find(":mobile-checkboxradio").checkboxradio("refresh"),this._addFirstLastClasses(t,this.options.excludeInvisible?this._getVisibles(t,i):t,i),this._initialRefresh=!1}},e.mobile.behaviors.addFirstLastClasses)),e(function(){e.mobile.document.bind("pagecreate create",function(t){e.mobile.controlgroup.prototype.enhanceWithin(t.target,!0)})})}(e),function(e){e(i).bind("pagecreate create",function(t){e(t.target).find("a").jqmEnhanceable().not(".ui-btn, .ui-link-inherit, :jqmData(role='none'), :jqmData(role='nojs')").addClass("ui-link")})}(e),function(e,t){e.widget("mobile.fixedtoolbar",e.mobile.widget,{options:{visibleOnPageShow:!0,disablePageZoom:!0,transition:"slide",fullscreen:!1,tapToggle:!0,tapToggleBlacklist:"a, button, input, select, textarea, .ui-header-fixed, .ui-footer-fixed, .ui-popup, .ui-panel, .ui-panel-dismiss-open",hideDuringFocus:"input, textarea, select",updatePagePadding:!0,trackPersistentToolbars:!0,supportBlacklist:function(){return!e.support.fixedPosition},initSelector:":jqmData(position='fixed')"},_create:function(){var i=this,n=i.options,a=i.element,o=a.is(":jqmData(role='header')")?"header":"footer",s=a.closest(".ui-page");return n.supportBlacklist()?(i.destroy(),t):(a.addClass("ui-"+o+"-fixed"),n.fullscreen?(a.addClass("ui-"+o+"-fullscreen"),s.addClass("ui-page-"+o+"-fullscreen")):s.addClass("ui-page-"+o+"-fixed"),e.extend(this,{_thisPage:null}),i._addTransitionClass(),i._bindPageEvents(),i._bindToggleHandlers(),t)},_addTransitionClass:function(){var e=this.options.transition;e&&"none"!==e&&("slide"===e&&(e=this.element.is(".ui-header")?"slidedown":"slideup"),this.element.addClass(e))},_bindPageEvents:function(){this._thisPage=this.element.closest(".ui-page"),this._on(this._thisPage,{pagebeforeshow:"_handlePageBeforeShow",webkitAnimationStart:"_handleAnimationStart",animationstart:"_handleAnimationStart",updatelayout:"_handleAnimationStart",pageshow:"_handlePageShow",pagebeforehide:"_handlePageBeforeHide"})},_handlePageBeforeShow:function(){var t=this.options;t.disablePageZoom&&e.mobile.zoom.disable(!0),t.visibleOnPageShow||this.hide(!0)},_handleAnimationStart:function(){this.options.updatePagePadding&&this.updatePagePadding(this._thisPage)},_handlePageShow:function(){this.updatePagePadding(this._thisPage),this.options.updatePagePadding&&this._on(e.mobile.window,{throttledresize:"updatePagePadding"})},_handlePageBeforeHide:function(t,i){var n=this.options;if(n.disablePageZoom&&e.mobile.zoom.enable(!0),n.updatePagePadding&&this._off(e.mobile.window,"throttledresize"),n.trackPersistentToolbars){var a=e(".ui-footer-fixed:jqmData(id)",this._thisPage),o=e(".ui-header-fixed:jqmData(id)",this._thisPage),s=a.length&&i.nextPage&&e(".ui-footer-fixed:jqmData(id='"+a.jqmData("id")+"')",i.nextPage)||e(),r=o.length&&i.nextPage&&e(".ui-header-fixed:jqmData(id='"+o.jqmData("id")+"')",i.nextPage)||e();(s.length||r.length)&&(s.add(r).appendTo(e.mobile.pageContainer),i.nextPage.one("pageshow",function(){r.prependTo(this),s.appendTo(this)}))}},_visible:!0,updatePagePadding:function(i){var n=this.element,a=n.is(".ui-header"),o=parseFloat(n.css(a?"top":"bottom"));this.options.fullscreen||(i=i&&i.type===t&&i||this._thisPage||n.closest(".ui-page"),e(i).css("padding-"+(a?"top":"bottom"),n.outerHeight()+o))},_useTransition:function(t){var i=e.mobile.window,n=this.element,a=i.scrollTop(),o=n.height(),s=n.closest(".ui-page").height(),r=e.mobile.getScreenHeight(),l=n.is(":jqmData(role='header')")?"header":"footer";return!t&&(this.options.transition&&"none"!==this.options.transition&&("header"===l&&!this.options.fullscreen&&a>o||"footer"===l&&!this.options.fullscreen&&s-o>a+r)||this.options.fullscreen)},show:function(e){var t="ui-fixed-hidden",i=this.element;this._useTransition(e)?i.removeClass("out "+t).addClass("in").animationComplete(function(){i.removeClass("in")}):i.removeClass(t),this._visible=!0},hide:function(e){var t="ui-fixed-hidden",i=this.element,n="out"+("slide"===this.options.transition?" reverse":"");this._useTransition(e)?i.addClass(n).removeClass("in").animationComplete(function(){i.addClass(t).removeClass(n)}):i.addClass(t).removeClass(n),this._visible=!1},toggle:function(){this[this._visible?"hide":"show"]()},_bindToggleHandlers:function(){var t,i,n=this,a=n.options,o=n.element,s=!0;o.closest(".ui-page").bind("vclick",function(t){a.tapToggle&&!e(t.target).closest(a.tapToggleBlacklist).length&&n.toggle()}).bind("focusin focusout",function(o){1025>screen.width&&e(o.target).is(a.hideDuringFocus)&&!e(o.target).closest(".ui-header-fixed, .ui-footer-fixed").length&&("focusout"!==o.type||s?"focusin"===o.type&&s&&(clearTimeout(t),s=!1,i=setTimeout(function(){n.hide()},0)):(s=!0,clearTimeout(i),t=setTimeout(function(){n.show()},0)))})},_destroy:function(){var e=this.element,t=e.is(".ui-header");e.closest(".ui-page").css("padding-"+(t?"top":"bottom"),""),e.removeClass("ui-header-fixed ui-footer-fixed ui-header-fullscreen ui-footer-fullscreen in out fade slidedown slideup ui-fixed-hidden"),e.closest(".ui-page").removeClass("ui-page-header-fixed ui-page-footer-fixed ui-page-header-fullscreen ui-page-footer-fullscreen")}}),e.mobile.document.bind("pagecreate create",function(t){e(t.target).jqmData("fullscreen")&&e(e.mobile.fixedtoolbar.prototype.options.initSelector,t.target).not(":jqmData(fullscreen)").jqmData("fullscreen",!0),e.mobile.fixedtoolbar.prototype.enhanceWithin(t.target)})}(e),function(e){e.widget("mobile.fixedtoolbar",e.mobile.fixedtoolbar,{_create:function(){this._super(),this._workarounds()},_workarounds:function(){var e=navigator.userAgent,t=navigator.platform,i=e.match(/AppleWebKit\/([0-9]+)/),n=!!i&&i[1],a=null,o=this;if(t.indexOf("iPhone")>-1||t.indexOf("iPad")>-1||t.indexOf("iPod")>-1)a="ios";else{if(!(e.indexOf("Android")>-1))return;a="android"}if("ios"===a)o._bindScrollWorkaround();else{if(!("android"===a&&n&&534>n))return;o._bindScrollWorkaround(),o._bindListThumbWorkaround()}},_viewportOffset:function(){var t=this.element,i=t.is(".ui-header"),n=Math.abs(t.offset().top-e.mobile.window.scrollTop());return i||(n=Math.round(n-e.mobile.window.height()+t.outerHeight())-60),n},_bindScrollWorkaround:function(){var t=this;this._on(e.mobile.window,{scrollstop:function(){var e=t._viewportOffset();e>2&&t._visible&&t._triggerRedraw()}})},_bindListThumbWorkaround:function(){this.element.closest(".ui-page").addClass("ui-android-2x-fixed")},_triggerRedraw:function(){var t=parseFloat(e(".ui-page-active").css("padding-bottom"));
e(".ui-page-active").css("padding-bottom",t+1+"px"),setTimeout(function(){e(".ui-page-active").css("padding-bottom",t+"px")},0)},destroy:function(){this._super(),this.element.closest(".ui-page-active").removeClass("ui-android-2x-fix")}})}(e),function(e,n){e.widget("mobile.panel",e.mobile.widget,{options:{classes:{panel:"ui-panel",panelOpen:"ui-panel-open",panelClosed:"ui-panel-closed",panelFixed:"ui-panel-fixed",panelInner:"ui-panel-inner",modal:"ui-panel-dismiss",modalOpen:"ui-panel-dismiss-open",pagePanel:"ui-page-panel",pagePanelOpen:"ui-page-panel-open",contentWrap:"ui-panel-content-wrap",contentWrapOpen:"ui-panel-content-wrap-open",contentWrapClosed:"ui-panel-content-wrap-closed",contentFixedToolbar:"ui-panel-content-fixed-toolbar",contentFixedToolbarOpen:"ui-panel-content-fixed-toolbar-open",contentFixedToolbarClosed:"ui-panel-content-fixed-toolbar-closed",animate:"ui-panel-animate"},animate:!0,theme:"c",position:"left",dismissible:!0,display:"reveal",initSelector:":jqmData(role='panel')",swipeClose:!0,positionFixed:!1},_panelID:null,_closeLink:null,_page:null,_modal:null,_panelInner:null,_wrapper:null,_fixedToolbar:null,_create:function(){var t=this,i=t.element,n=i.closest(":jqmData(role='page')"),a=function(){var t=e.data(n[0],"mobilePage").options.theme,i="ui-body-"+t;return i},o=function(){var e=i.find("."+t.options.classes.panelInner);return 0===e.length&&(e=i.children().wrapAll('<div class="'+t.options.classes.panelInner+'" />').parent()),e},s=function(){var i=n.find("."+t.options.classes.contentWrap);return 0===i.length&&(i=n.children(".ui-header:not(:jqmData(position='fixed')), .ui-content:not(:jqmData(role='popup')), .ui-footer:not(:jqmData(position='fixed'))").wrapAll('<div class="'+t.options.classes.contentWrap+" "+a()+'" />').parent(),e.support.cssTransform3d&&t.options.animate&&i.addClass(t.options.classes.animate)),i},r=function(){var i=n.find("."+t.options.classes.contentFixedToolbar);return 0===i.length&&(i=n.find(".ui-header:jqmData(position='fixed'), .ui-footer:jqmData(position='fixed')").addClass(t.options.classes.contentFixedToolbar),e.support.cssTransform3d&&t.options.animate&&i.addClass(t.options.classes.animate)),i};e.extend(this,{_panelID:i.attr("id"),_closeLink:i.find(":jqmData(rel='close')"),_page:i.closest(":jqmData(role='page')"),_pageTheme:a(),_panelInner:o(),_wrapper:s(),_fixedToolbar:r()}),t._addPanelClasses(),t._wrapper.addClass(this.options.classes.contentWrapClosed),t._fixedToolbar.addClass(this.options.classes.contentFixedToolbarClosed),t._page.addClass(t.options.classes.pagePanel),e.support.cssTransform3d&&t.options.animate&&this.element.addClass(t.options.classes.animate),t._bindUpdateLayout(),t._bindCloseEvents(),t._bindLinkListeners(),t._bindPageEvents(),t.options.dismissible&&t._createModal(),t._bindSwipeEvents()},_createModal:function(){var t=this;t._modal=e("<div class='"+t.options.classes.modal+"' data-panelid='"+t._panelID+"'></div>").on("mousedown",function(){t.close()}).appendTo(this._page)},_getPosDisplayClasses:function(e){return e+"-position-"+this.options.position+" "+e+"-display-"+this.options.display},_getPanelClasses:function(){var e=this.options.classes.panel+" "+this._getPosDisplayClasses(this.options.classes.panel)+" "+this.options.classes.panelClosed;return this.options.theme&&(e+=" ui-body-"+this.options.theme),this.options.positionFixed&&(e+=" "+this.options.classes.panelFixed),e},_addPanelClasses:function(){this.element.addClass(this._getPanelClasses())},_bindCloseEvents:function(){var e=this;e._closeLink.on("click.panel",function(t){return t.preventDefault(),e.close(),!1}),e.element.on("click.panel","a:jqmData(ajax='false')",function(){e.close()})},_positionPanel:function(){var t=this,i=t._panelInner.outerHeight(),n=i>e.mobile.getScreenHeight();n||!t.options.positionFixed?(n&&(t._unfixPanel(),e.mobile.resetActivePageHeight(i)),t._scrollIntoView(i)):t._fixPanel()},_scrollIntoView:function(i){e(t).scrollTop()>i&&t.scrollTo(0,0)},_bindFixListener:function(){this._on(e(t),{throttledresize:"_positionPanel"})},_unbindFixListener:function(){this._off(e(t),"throttledresize")},_unfixPanel:function(){this.options.positionFixed&&e.support.fixedPosition&&this.element.removeClass(this.options.classes.panelFixed)},_fixPanel:function(){this.options.positionFixed&&e.support.fixedPosition&&this.element.addClass(this.options.classes.panelFixed)},_bindUpdateLayout:function(){var e=this;e.element.on("updatelayout",function(){e._open&&e._positionPanel()})},_bindLinkListeners:function(){var t=this;t._page.on("click.panel","a",function(i){if(this.href.split("#")[1]===t._panelID&&t._panelID!==n){i.preventDefault();var a=e(this);return a.hasClass("ui-link")||(a.addClass(e.mobile.activeBtnClass),t.element.one("panelopen panelclose",function(){a.removeClass(e.mobile.activeBtnClass)})),t.toggle(),!1}})},_bindSwipeEvents:function(){var e=this,t=e._modal?e.element.add(e._modal):e.element;e.options.swipeClose&&("left"===e.options.position?t.on("swipeleft.panel",function(){e.close()}):t.on("swiperight.panel",function(){e.close()}))},_bindPageEvents:function(){var e=this;e._page.on("panelbeforeopen",function(t){e._open&&t.target!==e.element[0]&&e.close()}).on("pagehide",function(){e._open&&e.close(!0)}).on("keyup.panel",function(t){27===t.keyCode&&e._open&&e.close()})},_open:!1,_contentWrapOpenClasses:null,_fixedToolbarOpenClasses:null,_modalOpenClasses:null,open:function(t){if(!this._open){var i=this,n=i.options,a=function(){i._page.off("panelclose"),i._page.jqmData("panel","open"),!t&&e.support.cssTransform3d&&n.animate?i.element.add(i._wrapper).on(i._transitionEndEvents,o):setTimeout(o,0),i.options.theme&&"overlay"!==i.options.display&&i._page.removeClass(i._pageTheme).addClass("ui-body-"+i.options.theme),i.element.removeClass(n.classes.panelClosed).addClass(n.classes.panelOpen),i._positionPanel(),i.options.theme&&"overlay"!==i.options.display&&i._wrapper.css("min-height",i._page.css("min-height")),i._contentWrapOpenClasses=i._getPosDisplayClasses(n.classes.contentWrap),i._wrapper.removeClass(n.classes.contentWrapClosed).addClass(i._contentWrapOpenClasses+" "+n.classes.contentWrapOpen),i._fixedToolbarOpenClasses=i._getPosDisplayClasses(n.classes.contentFixedToolbar),i._fixedToolbar.removeClass(n.classes.contentFixedToolbarClosed).addClass(i._fixedToolbarOpenClasses+" "+n.classes.contentFixedToolbarOpen),i._modalOpenClasses=i._getPosDisplayClasses(n.classes.modal)+" "+n.classes.modalOpen,i._modal&&i._modal.addClass(i._modalOpenClasses)},o=function(){i.element.add(i._wrapper).off(i._transitionEndEvents,o),i._page.addClass(n.classes.pagePanelOpen),i._bindFixListener(),i._trigger("open")};0>this.element.closest(".ui-page-active").length&&(t=!0),i._trigger("beforeopen"),"open"===i._page.jqmData("panel")?i._page.on("panelclose",function(){a()}):a(),i._open=!0}},close:function(t){if(this._open){var i=this.options,n=this,a=function(){!t&&e.support.cssTransform3d&&i.animate?n.element.add(n._wrapper).on(n._transitionEndEvents,o):setTimeout(o,0),n._page.removeClass(i.classes.pagePanelOpen),n.element.removeClass(i.classes.panelOpen),n._wrapper.removeClass(i.classes.contentWrapOpen),n._fixedToolbar.removeClass(i.classes.contentFixedToolbarOpen),n._modal&&n._modal.removeClass(n._modalOpenClasses)},o=function(){n.options.theme&&"overlay"!==n.options.display&&(n._page.removeClass("ui-body-"+n.options.theme).addClass(n._pageTheme),n._wrapper.css("min-height","")),n.element.add(n._wrapper).off(n._transitionEndEvents,o),n.element.addClass(i.classes.panelClosed),n._wrapper.removeClass(n._contentWrapOpenClasses).addClass(i.classes.contentWrapClosed),n._fixedToolbar.removeClass(n._fixedToolbarOpenClasses).addClass(i.classes.contentFixedToolbarClosed),n._fixPanel(),n._unbindFixListener(),e.mobile.resetActivePageHeight(),n._page.jqmRemoveData("panel"),n._trigger("close")};0>this.element.closest(".ui-page-active").length&&(t=!0),n._trigger("beforeclose"),a(),n._open=!1}},toggle:function(){this[this._open?"close":"open"]()},_transitionEndEvents:"webkitTransitionEnd oTransitionEnd otransitionend transitionend msTransitionEnd",_destroy:function(){var t=this.options.classes,i=this.options.theme,n=this.element.siblings("."+t.panel).length;n?this._open&&(this._wrapper.removeClass(t.contentWrapOpen),this._fixedToolbar.removeClass(t.contentFixedToolbarOpen),this._page.jqmRemoveData("panel"),this._page.removeClass(t.pagePanelOpen),i&&this._page.removeClass("ui-body-"+i).addClass(this._pageTheme)):(this._wrapper.children().unwrap(),this._page.find("a").unbind("panelopen panelclose"),this._page.removeClass(t.pagePanel),this._open&&(this._page.jqmRemoveData("panel"),this._page.removeClass(t.pagePanelOpen),i&&this._page.removeClass("ui-body-"+i).addClass(this._pageTheme),e.mobile.resetActivePageHeight())),this._panelInner.children().unwrap(),this.element.removeClass([this._getPanelClasses(),t.panelAnimate].join(" ")).off("swipeleft.panel swiperight.panel").off("panelbeforeopen").off("panelhide").off("keyup.panel").off("updatelayout"),this._closeLink.off("click.panel"),this._modal&&this._modal.remove(),this.element.off(this._transitionEndEvents).removeClass([t.panelUnfixed,t.panelClosed,t.panelOpen].join(" "))}}),e(i).bind("pagecreate create",function(t){e.mobile.panel.prototype.enhanceWithin(t.target)})}(e),function(e,t){e.widget("mobile.table",e.mobile.widget,{options:{classes:{table:"ui-table"},initSelector:":jqmData(role='table')"},_create:function(){var e=this;e.refresh(!0)},refresh:function(i){var n=this,a=this.element.find("thead tr");i&&this.element.addClass(this.options.classes.table),n.headers=this.element.find("tr:eq(0)").children(),n.allHeaders=n.headers.add(a.children()),a.each(function(){var o=0;e(this).children().each(function(){var s=parseInt(e(this).attr("colspan"),10),r=":nth-child("+(o+1)+")";if(e(this).jqmData("colstart",o+1),s)for(var l=0;s-1>l;l++)o++,r+=", :nth-child("+(o+1)+")";i===t&&e(this).jqmData("cells",""),e(this).jqmData("cells",n.element.find("tr").not(a.eq(0)).not(this).children(r)),o++})}),i===t&&this.element.trigger("refresh")}}),e.mobile.document.bind("pagecreate create",function(t){e.mobile.table.prototype.enhanceWithin(t.target)})}(e),function(e,t){e.mobile.table.prototype.options.mode="columntoggle",e.mobile.table.prototype.options.columnBtnTheme=null,e.mobile.table.prototype.options.columnPopupTheme=null,e.mobile.table.prototype.options.columnBtnText="Columns...",e.mobile.table.prototype.options.classes=e.extend(e.mobile.table.prototype.options.classes,{popup:"ui-table-columntoggle-popup",columnBtn:"ui-table-columntoggle-btn",priorityPrefix:"ui-table-priority-",columnToggleTable:"ui-table-columntoggle"}),e.mobile.document.delegate(":jqmData(role='table')","tablecreate refresh",function(i){var n,a,o,s,r=e(this),l=r.data("mobile-table"),d=i.type,c=l.options,h=e.mobile.ns,u=(r.attr("id")||c.classes.popup)+"-popup";"columntoggle"===c.mode&&("refresh"!==d&&(l.element.addClass(c.classes.columnToggleTable),n=e("<a href='#"+u+"' class='"+c.classes.columnBtn+"' data-"+h+"rel='popup' data-"+h+"mini='true'>"+c.columnBtnText+"</a>"),a=e("<div data-"+h+"role='popup' data-"+h+"role='fieldcontain' class='"+c.classes.popup+"' id='"+u+"'></div>"),o=e("<fieldset data-"+h+"role='controlgroup'></fieldset>")),l.headers.not("td").each(function(t){var i=e(this).jqmData("priority"),n=e(this).add(e(this).jqmData("cells"));i&&(n.addClass(c.classes.priorityPrefix+i),"refresh"!==d?e("<label><input type='checkbox' checked />"+e(this).text()+"</label>").appendTo(o).children(0).jqmData("cells",n).checkboxradio({theme:c.columnPopupTheme}):e("#"+u+" fieldset div:eq("+t+")").find("input").jqmData("cells",n))}),"refresh"!==d&&o.appendTo(a),s=o===t?e("#"+u+" fieldset"):o,"refresh"!==d&&(s.on("change","input",function(){this.checked?e(this).jqmData("cells").removeClass("ui-table-cell-hidden").addClass("ui-table-cell-visible"):e(this).jqmData("cells").removeClass("ui-table-cell-visible").addClass("ui-table-cell-hidden")}),n.insertBefore(r).buttonMarkup({theme:c.columnBtnTheme}),a.insertBefore(r).popup()),l.update=function(){s.find("input").each(function(){this.checked?(this.checked="table-cell"===e(this).jqmData("cells").eq(0).css("display"),"refresh"===d&&e(this).jqmData("cells").addClass("ui-table-cell-visible")):e(this).jqmData("cells").addClass("ui-table-cell-hidden"),e(this).checkboxradio("refresh")})},e.mobile.window.on("throttledresize",l.update),l.update())})}(e),function(e){e.mobile.table.prototype.options.mode="reflow",e.mobile.table.prototype.options.classes=e.extend(e.mobile.table.prototype.options.classes,{reflowTable:"ui-table-reflow",cellLabels:"ui-table-cell-label"}),e.mobile.document.delegate(":jqmData(role='table')","tablecreate refresh",function(t){var i=e(this),n=t.type,a=i.data("mobile-table"),o=a.options;if("reflow"===o.mode){"refresh"!==n&&a.element.addClass(o.classes.reflowTable);var s=e(a.allHeaders.get().reverse());s.each(function(){var t=e(this).jqmData("cells"),i=e(this).jqmData("colstart"),n=t.not(this).filter("thead th").length&&" ui-table-cell-label-top",a=e(this).text();if(""!==a)if(n){var s=parseInt(e(this).attr("colspan"),10),r="";s&&(r="td:nth-child("+s+"n + "+i+")"),t.filter(r).prepend("<b class='"+o.classes.cellLabels+n+"'>"+a+"</b>")}else t.prepend("<b class='"+o.classes.cellLabels+"'>"+a+"</b>")})}})}(e),function(e,t){function i(e){o=e.originalEvent,d=o.accelerationIncludingGravity,s=Math.abs(d.x),r=Math.abs(d.y),l=Math.abs(d.z),!t.orientation&&(s>7||(l>6&&8>r||8>l&&r>6)&&s>5)?c.enabled&&c.disable():c.enabled||c.enable()}e.mobile.iosorientationfixEnabled=!0;var a=navigator.userAgent;if(!(/iPhone|iPad|iPod/.test(navigator.platform)&&/OS [1-5]_[0-9_]* like Mac OS X/i.test(a)&&a.indexOf("AppleWebKit")>-1))return e.mobile.iosorientationfixEnabled=!1,n;var o,s,r,l,d,c=e.mobile.zoom;e.mobile.document.on("mobileinit",function(){e.mobile.iosorientationfixEnabled&&e.mobile.window.bind("orientationchange.iosorientationfix",c.enable).bind("devicemotion.iosorientationfix",i)})}(e,this),function(e,t){function n(){a.removeClass("ui-mobile-rendering")}var a=e("html"),o=(e("head"),e.mobile.window);e(t.document).trigger("mobileinit"),e.mobile.gradeA()&&(e.mobile.ajaxBlacklist&&(e.mobile.ajaxEnabled=!1),a.addClass("ui-mobile ui-mobile-rendering"),setTimeout(n,5e3),e.extend(e.mobile,{initializePage:function(){var t=e.mobile.path,a=e(":jqmData(role='page'), :jqmData(role='dialog')"),s=t.stripHash(t.stripQueryParams(t.parseLocation().hash)),r=i.getElementById(s);a.length||(a=e("body").wrapInner("<div data-"+e.mobile.ns+"role='page'></div>").children(0)),a.each(function(){var t=e(this);t.jqmData("url")||t.attr("data-"+e.mobile.ns+"url",t.attr("id")||location.pathname+location.search)}),e.mobile.firstPage=a.first(),e.mobile.pageContainer=e.mobile.firstPage.parent().addClass("ui-mobile-viewport"),o.trigger("pagecontainercreate"),e.mobile.showPageLoadingMsg(),n(),e.mobile.hashListeningEnabled&&e.mobile.path.isHashValid(location.hash)&&(e(r).is(':jqmData(role="page")')||e.mobile.path.isPath(s)||s===e.mobile.dialogHashKey)?e.event.special.navigate.isPushStateEnabled()?(e.mobile.navigate.history.stack=[],e.mobile.navigate(e.mobile.path.isPath(location.hash)?location.hash:location.href)):o.trigger("hashchange",[!0]):(e.mobile.path.isHashValid(location.hash)&&(e.mobile.urlHistory.initialDst=s.replace("#","")),e.event.special.navigate.isPushStateEnabled()&&e.mobile.navigate.navigator.squash(t.parseLocation().href),e.mobile.changePage(e.mobile.firstPage,{transition:"none",reverse:!0,changeHash:!1,fromHashChange:!0}))}}),e.mobile.navreadyDeferred.resolve(),e(function(){t.scrollTo(0,1),e.mobile.defaultHomeScroll=e.support.scrollTop&&1!==e.mobile.window.scrollTop()?1:0,e.mobile.autoInitializePage&&e.mobile.initializePage(),o.load(e.mobile.silentScroll),e.support.cssPointerEvents||e.mobile.document.delegate(".ui-disabled","vclick",function(e){e.preventDefault(),e.stopImmediatePropagation()})}))}(e,this)});
//@ sourceMappingURL=jquery.mobile-1.3.1.min.map


/**
 * global self executing function
 * 
 * @author Sohrab Zabetian 
 */
var Translator = (function($,undefined) {	
	
	var translations = {};
	var $translationsData = $("#translations");
	if ($translationsData.length > 0) {
		translations = $translationsData.embeddedData();
	}
	
	return {
		translate : function(key) {
			var result =  translations[key];
			if (result == null) {
				result = key;
				//console.log('Could not find translation for key ' + key);
			}
			return result;
		}
	};
	
})(jQuery);


/**
 * 
 */
(function($,undefined) {	
	if (!ND) var ND = window.ND = window.ND || {};
	/***
	 * WARNING: SINGLETON ALERT!  SINGLETON ALERT!  CODE: BLACK!
	 */
	ND.PriceFormatter = {
		
		/**
		 * true,0 -> true means use delimiter or not. , means use comma as delimitor for prices, 0 means how many decimal places should be displayed
		 * 
		 * for example if we have true,0 
		 * 
		 * input 2000.00 -> output 2,000
		 *
		 * if we have false,2
		 * 
		 * input 2000 -> output 2000.00
		 * input 2000.999 -> output 2000.99
		 * 
		 * if we have true/2
		 * 
		 * input 2000 -> output 2/000.00
		 * input 2000.999 -> output 2/000.99
		 * 
		 * $ %1
		 * 
		 * 
		 * Internal methods for priceFormatter, shamelessly borrowed from jquery.priceformat.js version 1.7 <http://jquerypriceformat.com>
		 * Originally created By Eduardo Cuducos cuducos [at] gmail [dot] com, and maintained by Flavio Silveira flavio [at] gmail [dot] com
		 * 
		 * usage: var PF = new ND.PriceFormatter({"prefix": "$", thousandsSeparator: ", ", centsLimit: 2});
		 * PF.format("2000.00");
		 */
		initialise: function(options) {
			var defaults =
			{
				data: 'true,0',
				formatString: '',
				prefix: '',
	            suffix: '',
				centsSeparator: '.',
				thousandsSeparator: '',
				limit: false,
				centsLimit: 0,
				clearPrefix: false,
	            clearSufix: false,
				allowNegative: false,
				forceDecimal: false
			};
			
			ND.PriceFormatter.options = $.extend({},defaults, options);
			// Deals with parsing the data options passed to the constructor
			var s = ND.PriceFormatter.options.data.match(/\W+/g);
			var d = ND.PriceFormatter.options.data.split(s);
			if (d[0] === "true") {
				ND.PriceFormatter.options.thousandsSeparator = ND.PriceFormatter.options.thousandsSeparator;
			} else {
				ND.PriceFormatter.options.thousandsSeparator = defaults.thousandsSeparator;
			}
			if (parseInt(d[1]) > 0) {
				ND.PriceFormatter.options.forceDecimal = true;
				ND.PriceFormatter.options.centsLimit = parseInt(d[1]);
			} 
		},
			
			// pre defined options
		internalFormatter: function(value) {
				var obj = value;
				var is_number = /[0-9]/;
		
				// load the pluggings settings
				var prefix = ND.PriceFormatter.options.prefix;
		        var suffix = ND.PriceFormatter.options.suffix;
				var centsSeparator = ND.PriceFormatter.options.centsSeparator;
				var thousandsSeparator = ND.PriceFormatter.options.thousandsSeparator;
				var limit = ND.PriceFormatter.options.limit;
				var centsLimit = ND.PriceFormatter.options.centsLimit;
				var clearPrefix = ND.PriceFormatter.options.clearPrefix;
		        var clearSuffix = ND.PriceFormatter.options.clearSuffix;
				var allowNegative = ND.PriceFormatter.options.allowNegative;
		
				// skip everything that isn't a number
				// and also skip the left zeroes
				function to_numbers (str)
				{
					var formatted = '';
					for (var i=0;i<(str.length);i++)
					{
						char_ = str.charAt(i);
						if (formatted.length==0 && char_==0) char_ = false;
		
						if (char_ && char_.match(is_number))
						{
							if (limit)
							{
								if (formatted.length < limit) formatted = formatted+char_;
							}
							else
							{
								formatted = formatted+char_;
							}
						}
					}
		
					return formatted;
				}
		
				// format to fill with zeros to complete cents chars
				function fill_with_zeroes (str)
				{
					while (str.length<(centsLimit+1)) str = '0'+str;
					return str;
				}
		
				// format as price
				function price_format (str)
				{
					// formatting settings
					var formatted = fill_with_zeroes(to_numbers(str));
					var thousandsFormatted = '';
					var thousandsCount = 0;
		
					// split integer from cents
					var centsVal = formatted.substr(formatted.length-centsLimit,centsLimit);
					var integerVal = formatted.substr(0,formatted.length-centsLimit);
		
					// apply cents pontuation
					formatted = integerVal+centsSeparator+centsVal;
		
					// apply thousands pontuation
					if (thousandsSeparator)
					{
						for (var j=integerVal.length;j>0;j--)
						{
							char_ = integerVal.substr(j-1,1);
							thousandsCount++;
							if (thousandsCount%3==0) char_ = thousandsSeparator+char_;
							thousandsFormatted = char_+thousandsFormatted;
						}
						if (thousandsFormatted.substr(0,1)==thousandsSeparator) thousandsFormatted = thousandsFormatted.substring(1,thousandsFormatted.length);
						formatted = thousandsFormatted+centsSeparator+centsVal;
					}
		
					// if the string contains a dash, it is negative - add it to the begining (except for zero)
					if (allowNegative && str.indexOf('-') != -1 && (integerVal != 0 || centsVal != 0)) formatted = '-' + formatted;
		
					// apply the prefix
					if (prefix) formatted = prefix+formatted;
		            
		            // apply the suffix
					if (suffix) formatted = formatted+suffix;
		
					return formatted;
				}
		
				// filter what user type (only numbers and functional keys)
				function key_check (e)
				{
					var code = (e.keyCode ? e.keyCode : e.which);
					var typed = String.fromCharCode(code);
					var functional = false;
					var str = obj;
					var newValue = price_format(str+typed);
		
					// allow key numbers, 0 to 9
					if((code >= 48 && code <= 57) || (code >= 96 && code <= 105)) functional = true;
		
					// check Backspace, Tab, Enter, Delete, and left/right arrows
					if (code ==  8) functional = true;
					if (code ==  9) functional = true;
					if (code == 13) functional = true;
					if (code == 46) functional = true;
					if (code == 37) functional = true;
					if (code == 39) functional = true;
					if (allowNegative && (code == 189 || code == 109)) functional = true; // dash as well
		
					if (!functional)
					{
						e.preventDefault();
						e.stopPropagation();
						if (str!=newValue) obj = newValue;
					}
		
				}
		
				// inster formatted price as a value of an input field
				function price_it ()
				{
					var str = obj;
					var price = price_format(str);
					if (str != price) obj = price;
				}
		
				// Add prefix on focus
				function add_prefix()
				{
					var val = obj;
					obj = prefix + val;
				}
		        
		        function add_suffix()
				{
					var val = obj;
					obj = val + suffix;
				}
		
				// Clear prefix on blur if is set to true
				function clear_prefix()
				{
					if($.trim(prefix) != '' && clearPrefix)
					{
						var array = obj.split(prefix);
						obj = array[1];
					}
				}
		        
		        // Clear suffix on blur if is set to true
				function clear_suffix()
				{
					if($.trim(suffix) != '' && clearSuffix)
					{
						var array = obj.split(suffix);
						obj = array[0];
					}
				}
				
				price_it();
				return obj;
			},
			
			// Pad with leading zeros
			pad : function(num, size) {
			    var s = num+"";
			    while (s.length < size) s = "0" + s;
			    return s;
			},
		
			format: function(value) {
				var result = value = value.toString();
				try {
					if (ND.PriceFormatter.options === undefined) {
						throw 'Priceformatter not initialized';
					}
					
					//first replace the . coming from the server with centsSeperator
					value = value.replace('.', ND.PriceFormatter.options.centsSeparator);
					
//					console.log('value before : ' + value);
					
				    var length = 0;
				    var centsLimit = ND.PriceFormatter.options.centsLimit;
				    var decimalIdx = value.indexOf(ND.PriceFormatter.options.centsSeparator);
				    //if centsLimit is greater than zero but value has no decimal for instance if we have 500 but 
				    //centLimit = 3 then this line will convert 500 to 500.000
					if (centsLimit > 0 && decimalIdx === -1) {
						value += ND.PriceFormatter.options.centsSeparator + ND.PriceFormatter.pad("0", centsLimit);
						
//						console.log('value += ND.PriceFormatter.options.centsSeparator + ND.PriceFormatter.pad("0", centsLimit) : ' + value);
						
					} else if (decimalIdx > 0 && ((length = value.substring(decimalIdx + 1, value.length).length) < centsLimit)) {
						
//						console.log('value.substring(decimalIdx + 1, value.length): ' + value.substring(decimalIdx + 1, value.length));
						
						value += ND.PriceFormatter.pad("0", centsLimit - length);
						
//						console.log('value += ND.PriceFormatter.pad("0",  - length) : ' + value);
						
					} else if (length > centsLimit) { //value = 100.00000  but cent limit is 2 
						 value = value.substring(0, decimalIdx + 1 + centsLimit);
						 
//						 console.log('value = value.substring(0, decimalIdx + 1 + centsLimit): ' + value);
					}
					var output = ND.PriceFormatter.internalFormatter(value);
					if (!ND.PriceFormatter.options.forceDecimal) {
//						console.log('index of ' + ND.PriceFormatter.options.centsSeparator + ' in ' + output + ' is (output.indexOf(ND.PriceFormatter.options.centsSeparator)): ' + output.indexOf(ND.PriceFormatter.options.centsSeparator));
						output = output.substring(0,output.indexOf(ND.PriceFormatter.options.centsSeparator));
						
//						console.log('output = output.substring(0,output.indexOf(ND.PriceFormatter.options.centsSeparator)); ' + output);
					}
					result = ND.PriceFormatter.options.formatString.replace("%1", output);
					
//					console.log('result: ' + result);
					
				} catch(e) {
					throw e;
				}
				
				return result;
			}
	}; // End of Price Formatter singleton
	
})(jQuery);


var Config = (function(window, document, $, undefined){	

	init = function() { 
		var configs = {};
		var $configData = $("#build-and-price-config");
		
		if ($configData.length > 0) {
			configs = JSON.parse($configData.html());
			var rootURL = '/servlet/rest/tools/' + configs['toolType'] + '/' + configs['site'];
			var rootURLWithPricezone = rootURL + '/:pricezoneId/';
		 
			configs.buildandprice = {
				
				urls : {
					'modelListURL':  rootURLWithPricezone + 'models',
					'derivativeListURL': rootURLWithPricezone + 'model/:id/derivatives',
					'packageListURL':  rootURLWithPricezone + 'model/:id/packages',
					'derivativeDetailURL':	rootURLWithPricezone +':path/:id', /*+ 'derivative/' or 'package/' will be appended based on user selected path*/
					'packageDetailURL':	rootURLWithPricezone +':path/:id',
					'categoryListURL': rootURLWithPricezone +':path/:id/categories',
					'colorTrimListURL': rootURLWithPricezone +':path/:id/colours-trims',
					'engineListURL' : rootURLWithPricezone + 'derivative/:id/engine',
					'shareURL' : '/servlet/rest/tools/share/',
					'viewPDFURL' : '/servlet/rest/tools/share/pdf/',
					'pricezoneListURL' : rootURL + '/pricezones',
					'hotdealsURL' : '/servlet/rest/hotdeals/buildandprice',
					'driveawayURL' : '/servlet/Satellite?pagename=DFY/Tools/CalculatePriceJSON&site=FOA&tool=buildandprice'
				}
			
//			configs.localStorageNames = {
//				'MODEL': 'bp-ls-model',
//				'PATH' : 'bp-ls-path',
//				'PACKAGE': 'bp-ls-package',
//				'DERIVATIVE': 'bp-ls-derivative',
//				'ENGINE': 'bp-ls-engine',
//				'COLOR': 'bp-ls-color',
//				'TRIM': 'bp-ls-trim',
//				'FEATURE': 'bp-ls-features',
//				'PRICEZONE' : 'bp-pricezone'
//			};
			};
			
			var comparatorRootUrl = '/servlet/rest/tools/comparator/' + configs['site'];
			var comparatorRootURLWithPricezone = comparatorRootUrl + '/:pricezoneId/';
			
			configs.comparator = {
				urls : {
					'modelListURL':  comparatorRootURLWithPricezone + 'models',
					'derivativeListURL': comparatorRootURLWithPricezone + 'model/:id/derivatives',	
					'compareURL': comparatorRootUrl + '/results/derivatives/',
					'pricezoneListURL' : comparatorRootUrl + '/pricezones'		
				}
			};
		}
		else {
		    configs.buildandprice = {};
		    configs.buildandprice.urls = {};
		    configs.comparator = {};
		    configs.comparator.urls = {};
		}
		
		return configs;
	 }
	
	return init();
	
})(window, document, jQuery)


/**
 * @author Sohrab Zabetian 
 */

/**
 * Backbone customized Collection functions
 */
Backbone.Collection.prototype.selectable = function() {
	//by default all collection have selection capability.
	//it allows the collection to mark which model is currently visible,
	//selected by the user
	return true;
};

Backbone.Collection.prototype.clickable = function() {
	//by default all collection have selection capability.
	//it allows the collection to mark which model is currently visible,
	//selected by the user
	return false;
};

Backbone.Collection.prototype.supportsMultiSelect = function() {
	//by default all collection have single selection capability.
	return false;
};

/**
 * it allows the collection to mark which model is currently visible
 * @param model
 * @returns whether object was previously selected
 */
Backbone.Collection.prototype.select = function(model) {
	if (this.selectable()) {
		if (!this.supportsMultiSelect()) {
			var selectedObjts = this.where({selected : true});
			if(selectedObjts != null) {
				_.each(selectedObjts, function(obj){
					if (obj.id !== model.id) {
						obj.set('selected', false);
					}
				});
			}
		}
		
		model.set('selected', true);
		if (this.clickable()) {
			model.set('clicked', false);
		}
		return true;
	}
	return false;
};

Backbone.Collection.prototype.deselectAll = function() {
	if (this.selectable()) {
		
		var selectedObjts = this.where({selected : true});
		if(selectedObjts != null) {
			isClickable = this.clickable();
			_.each(selectedObjts, function(obj){
				obj.set('selected', false);
				if (isClickable) {
					obj.set('clicked', false);
				}
			});
		}
	}
};

Backbone.Collection.prototype.click = function(model) {
	if (this.clickable()) {
		var clickedObjects = this.where({clicked : true});
		if(clickedObjects != null) {
			_.each(clickedObjects, function(obj){
				if (obj.id != model.id) {
					obj.set('clicked', false);
				}
			});
		}
		//Util.log('model ' + model.get('id') + ' was clicked');
		model.set('clicked', true);
	}
};

/**
 * Allows the collection to mark which model is currently visible/selected
 * @param id of the model
 * @returns selected model
 */
Backbone.Collection.prototype.selectById = function(id) {
	var model = null;
	if (this.selectable()) {
		var models = this.where({id: id});
		if (models && models.length > 0) {
			 this.select(model = models[0]);
		}
	}
	
	return model;
};

/**
 * Allows the collection to mark which model is currently visible/selected
 * @param id of the model
 * @returns selected model
 */
Backbone.Collection.prototype.clickById = function(id) {
	var model = null;
	if (this.clickable()) {
		var models = this.where({id: id});
		if (models && models.length > 0) {
			 this.click(model = models[0]);
		}
	}
	
	return model;
};

/**
 * it allows the collection to mark which model is currently visible
 */
Backbone.Collection.prototype.getSelected = function() {
	if (this.selectable()) {
		var selectedObjects = this.where({
			selected : true
		});
		if (selectedObjects && selectedObjects != null &&
			 selectedObjects.length > 0) {
			if (this.supportsMultiSelect()) {
				return selectedObjects;
			} else {
				return selectedObjects[0];
			}
		}
	}
	// console.log('could not find any selected objects');
	return null;
};


Backbone.Collection.prototype.getClicked = function() {
	if (this.clickable()) {
		var clickedObjects = this.where({clicked : true});
		if (clickedObjects && clickedObjects != null
				&& clickedObjects.length > 0) {
			return clickedObjects[0];
		}
	}
	return null;
};

Backbone.Collection.prototype.unclick = function(model) {
	if (this.clickable()) {
		var clickedObjects = this.where({clicked : true, id : model.get('id')});
		if (clickedObjects && clickedObjects != null) {
			clickedObjects[0].set('clicked', false);
			return true;
		}
	}
	return false;
}

/**
 * Backbone Customized View functions
 */

/**
 * Changes jQuery template tags to {{ }} instead of <% %> to avoid java tag clash
 * 
 */
_.templateSettings = {
	interpolate : /\{\{(.+?)\}\}/g,
	evaulate : /\{\[(.+?)\]\}/g
 };

 
/**
 * Customize backbone view to include destroy View functionality
 */
Backbone.View.prototype.destroy = function() {
  this.remove();
  this.unbind();
  Events.unbind(null,this);
  /**
   * if view has children, close the children as well
   */
  if (this.children) {
	  _.each(this.children, function(child) {
		 child.destroy(); 
	  });
	  this.children = [];  
  }
};

/**
 * default render method
 * @param id
 * @returns {Backbone.View}
 */
Backbone.View.prototype.render = function() {
	 var html = $(this.template(this.model.toJSON()));
	//TODO: change this to minimize reflow
	 this.translate(html);
	 $(this.el).html(html);
	 return this;
};

Backbone.View.prototype.translate = function(selector) {
	if (!selector) {
		selector = $(this.el);
	}
	Views.Helper.translateTextOnView(selector);
};

Backbone.View.prototype.lazyload = function(selector) {
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
	
};




/**
 * 
 */
Views = {
	Buildandprice: {},
	Comparator: {},
	Helper: {
		translateTextOnView : function(selector) {
			if (!selector) {
				selector = $('span.bpt');
			} else {
				selector = selector.find('span.bpt');
			}
			selector.each(function() {
				var tiz = $(this);
				tiz.removeClass('bpt');
				tiz.text(Translator.translate(tiz.text()));
			});
		}
	}
};


/**
 * global self executing function
 * 
 * @author Sohrab Zabetian 
 */
var Constants = {
			
	storage: {	
		nameplateCollection:	'nameplateCollection',
		packageCollection: 'packageCollection',
		derivativeDetailsModel: 'derivativeDetailModel',
		colorCollection: 'colorCollection',
		categoryGrpCollection: 'categoryGroupCollection',
		galleryCollection: 'galleryCollection',
		pricezoneCollection: 'pricezoneCollection',
		footerModel: 'footerModel',
		headerCollection: 'headerCollection',
		panelCollection: 'panelCollection', //mobile
		headerModel: 'headerModel', //mobile
		pathCollection:'pathCollection',
		derivativeCollection: 'derivativeCollection',
		hotdealCollection: 'hotdealCollection'
	},
	
	state: {
		//DO NOT MESS WITH THESE NUMBERS
		SELECT_NAMEPLATE: 0,
		SELECT_PATH: 1,
		SELECT_PACKAGE: 2,
		SELECT_DERIVATIVE: 2,
		SELECT_ENGINE: 3,
		CUSTOMIZE_DERIVATIVE: 4,
		SUMMARY: 5,
		NO_STATE : -99
	},
	
	analytics: {
		colorTrim : 'colour trim'
	},
	
	postcode: {
		hd: 'hotDeals',
		ot: 'other',
		non: 'none'
	},
	
	view: {
		exterior: 'exterior',
		interior: 'interior'
	},
	
	attr : {
		feats: 'features',
		catgs: 'categories'
	},
	
	values : {
		standard: 'Standard',
		optionPack : 'Option Pack',
		mutuallyExclusiveOptions : 'Mutually Exclusive Options'
	},
	
	header: {
		spa: Translator.translate('bpt-step-path'),
		sm : Translator.translate('bpt-step-model'),
		sp : Translator.translate('bpt-step-package'),
		selectEngine : Translator.translate('bpt-step-engine'), //mobile
		selectColor : Translator.translate('bpt-step-color'), //mobile
		sc: Translator.translate('bpt-step-customize'),
		ss: Translator.translate('bpt-step-summary'),
		sl: Translator.translate('bpt-your-location'),
		c:	Translator.translate('bpt-customize'),
		p:	Translator.translate('bpt-path-sel')
	},
	
	cookie : {
		pzid : 'priceZoneId'
	},
	
	bpt : {
		s1:Translator.translate('bpt-step1'),
		s2:Translator.translate('bpt-step2'),
		s3:Translator.translate('bpt-step3'),
		s4:Translator.translate('bpt-step4'),
		ct: Translator.translate('bpt-colors-trims'),
		av: Translator.translate('bpt-all-vehicles'),
		ssm: Translator.translate('bpt-step-select-model'),
		pc: Translator.translate('bpt-postcode'),
		cp: Translator.translate('bpt-choose-package'),
		chp: Translator.translate('bpt-choose-path'),
		chm: Translator.translate('bpt-choose-model'),
		chooseEngine: Translator.translate('bpt-choose-engine'),
		czp: Translator.translate('bpt-customized-pkg'),
		sczp:Translator.translate('bpt-start-customised-package'),
		summary:Translator.translate('bpt-summary'),
		ppi: Translator.translate('bpt-path-package-instruction'),
		byon:Translator.translate('bpt-build-your-own'),
		byot: Translator.translate('bpt-byo'),
		f: (Translator.translate('bpt-from') + ' '),
		pbyoi: Translator.translate('bpt-path-byo-instruction'),
		sv: Translator.translate('bpt-no-vehicle-aval'),
		cl: Translator.translate('bpt-select-vehicle-location'),
		czpk: Translator.translate('bpt-customize-package'),
		czm: Translator.translate('bpt-customize-model'),
		et: Translator.translate('bpt-error-title'),
        close: Translator.translate('bpt-close'),
		noCostOption: Translator.translate('bpt-no-cost-option'),
		latestOffersInstructions: Translator.translate('bpt-latest-offer-inst'),
		errorCalcPrice: Translator.translate('bpt-error-calc-price'),
		postcodeMisMatch: Translator.translate('bpt-postcode-mismatch'),
		selectRegionToViewPrices: Translator.translate('bpt-select-region-to-view-prices'),
		regionNotSpecified: Translator.translate('bpt-region-not-specified'),
		yourRegionNotSpecified: Translator.translate('bpt-your-region-not-specified'),
		mlp: Translator.translate('bpt-mlp'),
		rrp: Translator.translate('bpt-rrp'),
		featurePartOfOptionPack :  Translator.translate('bpt-feature-partof-optionpack'),
		featurePartOfDependentFeature :  Translator.translate('bpt-feature-partof-depenendent-feature'),
		featurePartOfMutualExclusive :  Translator.translate('bpt-same-featuretype-selected'),
		derivativeSelect: Translator.translate('bpt-derivative-sel'),
		packageSelect: Translator.translate('bpt-package-sel'),
		errorProcessingData : Translator.translate('bpt-error-processing-data'),
		showDisclaimer:  Translator.translate('bpt-show-summary-disclaimer'),
		hideDisclaimer:  Translator.translate('bpt-hide-summary-disclaimer')
	},
	
	priceSuffix : {
//		nameplate : Translator.translate('btp-nameplate-price-suffix'),
//		derivative : Translator.translate('btp-derivative-price-suffix'),
//		engine : Translator.translate('btp-engine-price-suffix'),
//		hotdeal : Translator.translate('btp-hotdeal-price-suffix'),
//		pkg : Translator.translate('btp-package-price-suffix'),
		colour : Translator.translate('btp-colour-price-suffix'),
//		trim : Translator.translate('btp-trim-price-suffix'),
		featureRRP : Translator.translate('btp-feature-rrp-price-suffix'),
		featureMLP : Translator.translate('btp-feature-mlp-price-suffix')
	},
	
	path: {
		pkg: 'package',
		drv: 'derivative',
		pth: 'path',
		nxt: 'next'
	},
	
	comparatorStorage: {	
		nameplateCollection: 'nameplateCollection',
		pricezoneCollection: 'pricezoneCollection',
		derivativeCollection:'derivativeCollection',
		comparisonChart: 'comparisonChart',
		comparableDerivativeCollection : 'comparableDerivativeCollection',
		nameplateContainer: 'nameplateContainer'
	}, 
	
	ct : {
		limitReached : Translator.translate('ct-limit-reached')
	}
};

var Util = {
	
	cookie : {
		root: 'build.n.price',
		expiry: 14,
		
		save: function(key, value) {
			if ($.cookie) {
				//Util.log('saving [' + key + ' : ' + value + '] to cookie ');
				$.cookie(Util.cookie.root + key, value, {expires: 14});
			}
		},
		
		load: function(key) {
			var value = null;
			if ($.cookie) {
				value = $.cookie(Util.cookie.root + key);
				//Util.log('found value [' + value + ' for key: ' + key + ']');
			}
			return value;
		},
		
		remove : function(key) {
			if ($.cookie) {
				$.cookie(Util.cookie.root + key, null);
				//Util.log('found value [' + value + ' for key: ' + key + ']');
			}
		}
	},
	
	log : function(msg) {
		if (SiteConf.dev) {
			console.log(msg);
		}
	},
	
	dir : function(obj) {
		if (SiteConf.dev) {
			console.dir(obj);
		}
	}
	
};

var ConfigUtil = {
	isShortPath: function() {
		return Config.buildAndPriceType === 'short';
	},
	
	showPostcodeSelect: function() {
		return Config.showPostcodeSelect && !ConfigUtil.isShortPath();
	},
	
	usePolkPricing: function(path) {
		return this.showPostcodeSelect() && Constants.path.drv === path;
	},
	
	showPrices: function() {
		return Config.showPrices === true;
	},
	
	showNameplateSegments : function() {
		return Config.buildAndPriceShowVehicleSegments;
	},
	
	showPricezones: function() {
		return Config.showPriceZoneSelect === true;
	}
};


/**
 * 
 */
var BnP = BnP || {};

BnP.CommonHelper = {
	
	initialisePriceFormatter: function(pricezone) {
		ND.PriceFormatter.initialise({
			data: pricezone.get('priceFormat'),
			formatString:  pricezone.get('currencySymbol'),
			centsSeparator: pricezone.get('monetaryDecimalSeparator'),
			thousandsSeparator: pricezone.get('groupingSeparator')
		});
	},
	
	buildURL : function(orig, pricezoneId,  id, path, userPref) {
		var url =  orig.replace(':pricezoneId', pricezoneId)
		.replace(':id', id)
		.replace(':path', path);
		if (ConfigUtil.showPostcodeSelect() && (userPref || false)) {
			var postcode = userPref.get('postcode');
			if (postcode !== undefined && postcode != null && postcode != '') {
				url += ('?postcode=' + postcode + '&usage=' + userPref.get('usage'));
			}
		}
		
//		console.log('orig url was ' + orig + ' and final url is ' + url);
		
		return url;
	},
	
	getUsageLabelFromLabel: function(usage) {
		switch(usage) {
			case 'p' :
				return 'Personal';
			case 'b':
				return 'Commercial';
		}
		return '';
	},
	
	buildNameplateCategoriesFromNameplates : function(collection, nameplateCategories) {
		categories = _.uniq(collection.pluck('category'));
		var i = 0;
		//need to update the urls to skip path step.
		//var isShortPath = ConfigUtil.isShortPath() && collection.at(0).get('nameplateURL').indexOf(Constants.path.pkg) < 0;
		_.each(categories, function(category) {
			var currentCategory = new models.NameplateCategory({name : category, order : i});
			var currentNameplates = new collections.NameplateCollection();
			
			_.each(collection.models, function(nameplate) {
				nameplate.set('displayPrice', ND.PriceFormatter.format(nameplate.get('price')));
				if (category == nameplate.get('category')) {
					BnP.CommonHelper.buildDecisionPageUrl(nameplate);
					currentNameplates.add(nameplate);
				}
			});
			currentCategory.set('nameplates', currentNameplates);
			nameplateCategories.add(currentCategory);
			i++;
		});
	},
	
	postProcessCategoryGroups : function(categoryGroupCollection, categorySummary, summaryFeatures, summaryCategories, userPrefFeatures) {
		var order = 2;
		
		_.each(categoryGroupCollection.models, function(categoryGroup) {		
			var categories = categoryGroup.get(Constants.attr.catgs);
			if (categories != null) {
				_.each(categories.models, function(category) {	
					categorySummary = new models.SummaryCategory({category : category.get('name')});
					summaryFeatures = new collections.SummaryFeatureCollection();
					var features = category.get(Constants.attr.feats), 
						found = false, 
						featurePrice, 
						isOptionPack,
						featureGroupAttrs,
						categoryPrice = 0;
					
					if (features != null) {
						
						_.each(features.models, function(feature) {	
							if (_.contains(userPrefFeatures,feature.get('id'))) {
								found = true;
								featurePrice = parseFloat(feature.get('price'));
								categoryPrice += featurePrice;
								isOptionPack = feature.get('isOptionPack') === true;
								summaryFeatures.add(new models.SummaryFeature({
									name : feature.get('name'), 
									nameSuffix: (isOptionPack ? Constants.priceSuffix.featureMLP : Constants.priceSuffix.featureRRP), 
									price : ND.PriceFormatter.format(featurePrice.toString()),
									pricePrefix: (isOptionPack ? Constants.bpt.mlp : ''),
									priceSuffix: (isOptionPack ? Constants.priceSuffix.featureMLP : '')
								}));
								if (isOptionPack) {
									featureGroupAttrs = feature.get('featureGroupAttributes');
									if (featureGroupAttrs != null && featureGroupAttrs.length > 0) {
										_.each(featureGroupAttrs.models, function(featureGroupAttr) {
											summaryFeatures.add(new models.SummaryFeature({
												name : featureGroupAttr.get('featureName'),
												isChild : true
											}));
										});
									}
								}
							}
						});
					}
					if (found) {
						categorySummary.set(Constants.attr.feats, summaryFeatures);
						categorySummary.set('categoryTotal', ND.PriceFormatter.format(categoryPrice.toString()));
						categorySummary.set('order', order);
						summaryCategories.add(categorySummary);
						order++;
					}
				});
			}
		});
	},
	
	constructStepUrl : function(options) {
		var result = '';
		switch(options.step) {
			case Constants.state.SELECT_PATH:
				result =  '#' + options.modelId + '/path';
				break;
			case Constants.state.SELECT_PACKAGE:
			case Constants.state.SELECT_DERIVATIVE:
				result =  '#' + options.modelId + '/' + options.path;
				break;
			case Constants.state.CUSTOMIZE_DERIVATIVE:
				result = '#' + options.modelId + '/customize/' + options.path + '/' + options.derivativeId;
				break;
			case Constants.state.SUMMARY: 
				result = '#' + options.modelId + '/summary/' + options.path + '/' + options.derivativeId;
				break;
		}
//		Util.log('constructStepUrl : ' + result);
		return result;
	},
		
	
	buildDecisionPageUrls : function(collection) {
		_.each(collection.models, function(nameplate) {
			Helper.buildDecisionPageUrl(nameplate);
			nameplate.set('displayPrice', ND.PriceFormatter.format(nameplate.get('price')));
		});
	},
	
	buildDecisionPageUrl: function(obj) {
		obj.set('nameplateURL', obj.get('id') + '/' + Constants.path.nxt);
	},
	
	postProcessVehicleOptionsCollection : function(collection, pricezoneId, id) {
		collection.add(new models.CategoryGroupModel({id : 1, name : Constants.bpt.ct, 
													  categoryGrouping : Constants.bpt.ct, 
													  order : 0,
													  analyticsName: Constants.analytics.colorTrim,
													  analyticsStep: 'a'}));
		var i = 0;
		_.each(collection.models, function(categoryGroup) {
			categoryGroup.set('derivativeId', id );
			//console.log('order is ' + categoryGroup.get('order'));
			categoryGroup.set('order', i);
			
			var categories = categoryGroup.get('categories');
			if (categories != null) {
				_.each(categories.models, function(category) {
					if (category != null) {
						var features = category.get('features');
						if(features != null) {
							_.each(features.models, function(feature) {
								feature.set('derivativeId', id);
								feature.set('displayPrice', ND.PriceFormatter.format(feature.get('price')));
								feature.set('pricezoneId', pricezoneId);
							});
						}
					}
				});
			}
			i++;
		});
	},
	
	postProcessColorTrims: function(colorCol) {
		var mlp = Constants.bpt.mlp + ' ';
		_.each(colorCol.models, function(color) {
			var colorPrice = color.get('price');
			color.set('displayPrice', colorPrice != 0 ? (mlp + ND.PriceFormatter.format(colorPrice)) : Constants.bpt.noCostOption);
//			Util.log('postProcessColorTrims.colorPrice:' + color.get('displayPrice'));
			var trims = color.get('trims');
			if (trims) {
				var trimPrice;
				_.each(trims.models, function(trim) {
					trimPrice = trim.get('price');
					trim.set('displayPrice', trimPrice != 0 ? (mlp + ND.PriceFormatter.format(trimPrice)) : Constants.bpt.noCostOption);
				});
			}
		});
	},
	isPackagePath: function (options) {
       return ConfigUtil.isShortPath() || options === Constants.path.pkg;
   },

   showPathStep:function(){
   	return Config.site.toLowerCase()==="foa";
   },

   isStateCitySelector:function(){
   		return ConfigUtil.showPricezones()?(!!Config.isStateCitySelector):false;
   }

};


var BnP = BnP || {};
BnP.MobileHelper = {
	processPricezone : function(collection, pricezoneId) {
		var defaultPricezone=collection.get(pricezoneId);
		
		if(!defaultPricezone){
			var cookiePriceZoneId = Util.cookie.load(Constants.cookie.pzid);
			defaultPricezone = collection
		 		.get(cookiePriceZoneId ? cookiePriceZoneId : pricezoneId);
		}
		if (!defaultPricezone) {
			defaultPricezone = collection.where({
				'default' : 'true'
			});
			if (defaultPricezone && defaultPricezone.length > 0) {
				defaultPricezone = defaultPricezone[0];
			} else {
				defaultPricezone = collection.at(0);
			}
		}
		collection.select(defaultPricezone);
		BnP.CommonHelper.initialisePriceFormatter(defaultPricezone);
	}, 
	postProcessDerivatives: function(modelId, pricezoneId, drvCol, hotDealCol) {
		var showPostcode = ConfigUtil.showPostcodeSelect();
		_.each(drvCol.models, function(drv) {
			//only show derivative prices when postcode is enabled
			drv.set('displayPrice', showPostcode ? null : ND.PriceFormatter.format(drv.get('price')));
			drv.set('priceZoneId', pricezoneId);
			drv.set('derivativeURL',  
					BnP.MobileHelper.constructStepUrl({step:  Constants.state.SELECT_ENGINE, 
						modelId: modelId, path : Constants.path.drv, derivativeId :  drv.id}));
		});
		if (hotDealCol != null) {
			_.each(hotDealCol.models, function(hotdeal) {
				var derivativeId = hotdeal.get('derivativeId');
				//Util.log(derivativeId);
				if(drvCol.get(derivativeId) != null) {
				//	Util.log('adding hotdeal url to ' + derivativeId);
					var hotdealUrl = hotdeal.get('hotDealSmobUrl');
					if (typeof hotdealUrl !== 'undefined' && hotdealUrl != null && hotdealUrl !== '') {
						drvCol.get(derivativeId).set('hotDealUrl', hotdealUrl);
					}
				};
				hotdeal.set('displayPrice', ND.PriceFormatter.format(hotdeal.get('offerprice')));
			}, this);
		}
	},
	postProcessPackages: function(modelId, pricezoneId, pkgCol) {
		var showPostcode = ConfigUtil.showPostcodeSelect();
		_.each(pkgCol.models, function(pkg) {
			//only show derivative prices when postcode is enabled
			pkg.set('displayPrice', showPostcode ? null : ND.PriceFormatter.format(pkg.get('price')));
			pkg.set('priceZoneId', pricezoneId);
			pkg.set('derivativeURL',  
					BnP.MobileHelper.constructStepUrl({
						step: Constants.state.CUSTOMIZE_DERIVATIVE, 
						modelId: modelId, 
						path: Constants.path.pkg, 
						derivativeId: pkg.id,
						engineId:0
					}));
		});

	},
	postProcessEngines: function(modelId, drvId, engineCol) {
		var minEnginePrice = _.min(engineCol.pluck('price'), function(p) {
			return parseFloat(p);
		});
//		Util.log('minEnginePrice: ' + minEnginePrice);
		_.each(engineCol.models, function(engine) {
			if (engine.get('featuretype') === Constants.values.standard) {
				engineCol.select(engine);
			}
			var priceDiff = (engine.get('price') - minEnginePrice);
			var priceDiffString = (priceDiff === 0 ? Constants.bpt.noCostOption : ND.PriceFormatter.format(priceDiff.toString()));
//			Util.log('Engine price ' + engine.get('price') + ' & price diff ' + priceDiff + ' and formatted price is ' + priceDiffString);
			engine.set('displayPrice', priceDiffString);
			engine.set('priceDiff', priceDiff);
			engine.set('engineURL', BnP.MobileHelper.constructStepUrl({step:  Constants.state.CUSTOMIZE_DERIVATIVE, modelId: modelId, path : Constants.path.drv, derivativeId :  drvId, engineId:  engine.id}));
		});
		engineCol.models.sort(function(a,b){return (a.get('priceDiff')-b.get('priceDiff'));});
	},
	
	constructStepUrl : function(options) {
		var result = '';

		if (options.step === Constants.state.SELECT_NAMEPLATE) {
			result = '#';
		} else if (typeof options.modelId !== 'undefined' && options.modelId != null) {
			if (options.step === Constants.state.SELECT_PATH) {
				result =  '#' + options.modelId + '/path';
			} else if (typeof options.path !== 'undefined' && options.path != null) {
					
				if (options.step === Constants.state.SELECT_PACKAGE || 
					options.step === Constants.state.SELECT_DERIVATIVE) {
					result =  '#' + options.modelId + '/path/' + options.path;
				} else if (typeof options.derivativeId !== 'undefined' && options.derivativeId != null) {
					
					if (options.step === Constants.state.SELECT_ENGINE) {
						result =  '#' + options.modelId + '/path/' + options.path + '/' + options.derivativeId + '/engine';
					} else if (typeof options.engineId !== 'undefined' && options.engineId != null) {
						
						if (options.step === Constants.state.CUSTOMIZE_DERIVATIVE) {
							if (typeof options.engineId === 'undefined' || options.categoryId == null) {
								result =  '#' + options.modelId + '/path/' + options.path + '/' + options.derivativeId + '/engine/' + options.engineId + '/customize/colors';
							} else {
								result =  '#' +	options.modelId + '/path/' + options.path + '/' + options.derivativeId + '/engine/' + options.engineId + '/customize/accessories/' + options.categoryId;
							}
						} else if (options.step === Constants.state.SUMMARY) {
							result =  '#' + options.modelId + '/path/' + options.path + '/' + options.derivativeId + '/engine/' + options.engineId + '/summary';
						}
					} 
				}
			}
		}
//		Util.log('constructStepUrl : ' + result);
		return result;
	}
};


/**
 * global self executing function
 * 
 * @author Sohrab Zabetian 
 */
var Events = (function(undefined) {	
	
	var eventBus = {context : null};
	_.extend(eventBus, Backbone.Events);
	
	return {
		
		eventList: {},
		
		/**
		 * When an a view triggers an event, generally the model listens to that event
		 * and update itself. model may decide it needs to trigger another event and
		 * notify the controller(router) via the eventBus to perform other tasks.
		 *   
		 * @param listener that listens to an event
		 * @param viewEventName event listener is listening to
		 * @param modelEventName event listener will trigger via the eventBus
		 * @param arg
		 * @returns
		 */
		bindToEvent : function(listener, viewEventName, modelEventName, globalArg) {
			listener.bind(viewEventName, 
			function(arg) {
				eventBus.trigger(modelEventName, arg ? arg : globalArg );
			}, 
			eventBus.context);
		},
		
		fireEvent : function(eventName, arg) {
			eventBus.trigger(eventName, arg, eventBus.context);
		},
		
		bind: function(eventName, callback, context) {
			eventBus.on(eventName, callback, context);
		},
		
		unbind: function(eventName, context) {
			eventBus.off((typeof eventName === 'undefined') ? null : eventName, null, context);
		},
		
		bindOnce: function(eventName, callback, context) {
			eventBus.once(eventName, callback, context);
		},
		
		eventBus : eventBus
	};
		
})();


/**
 * 
 */
Events.eventList.buildandprice = {};
Events.eventList.buildandprice.router = {
	
	ActionTriggeredEvent: 'ActionTriggeredEvent',
	/*
	 * Sends a request to view to change currently selected tab
	 */
	NextTabEvent: 'NextTabEvent',
	PrevTabEvent: 'PrevTabEvent',
	/*
	 * PDF is ready to be served
	 */
	PDFReadyEvent: 'PDFReadyEvent',
	ShareReadyEvent: 'ShareReadyEvent',
	/*
	 * Block and unblock UI to prevent user from clicking away.
	 */
	BlockUIEvent: 'BlockUIEvent',
	UnblockUIEvent: 'UnblockUIEvent',
	UpdatePricezoneEvent : 'UpdatePricezoneEvent',//to update the pricezone on UI
	/*
	 * Fired when Loading customized page is completed. 
	 */
	LoadCompleteEvent: 'LoadCompleteEvent',
	EnginesLoadedEvent : 'EnginesLoadedEvent',
	HidePricesEvent: 'HidePricesEvent',
	HideHotDealPricesEvent: 'HideHotDealPricesEvent',
	/*
	 * Used only when ConfigUtil.showPostcodeSelect = true 
	 * If a user reloads a configuration but does not have a postcode cookie,
	 * Then the configuration will load but as soon as the user navigates away from
	 * summary page the user should be asked to enter a postcode.
	 * 
	 * Accepts a parameter (true or false)
	 * 
	 * pass in False when user switches postcode before changing the page.
	 * 
	 */
	AskForPostcodeEvent: 'AskForPostcodeEvent',
	ShowPricesLaterEvent: 'ShowPricesLaterEvent',
	ShowGalleryCueEvent: 'ShowGalleryCueEvent'
//			,
	/*
	 * occurs when loading configuration (FOA only) and configuration postcode/usage
	 * does not match what's in cookie.
	 */
//		PostcodeMisMatchEvent: 'PostcodeMisMatchEvent'
};

Events.eventList.buildandprice.model = {
	
	ErrorOccuredEvent : {
		name: 'ErrorOccuredModelEvent',
		handler: function(data) {
			this.navToErrorPage(data);
		}
	},
	
	PrevPageRequestedEvent: {
		name: 'PrevPageRequestedModelEvent',
		handler: function() {
			var panel = this.dataLoader.panelData(),
			selectItem = panel.where({'isCurrent' : true})[0],
			index = selectItem.get('step'); //index
//			console.log('back history index ' + index);
			if (index >= 2) {
				var prevItem = panel.at(index - 2);
//				console.log('going back to ' + prevItem.get('headerURL'));
				this.navigate(prevItem.get('headerURL'), {trigger: true});
			} //else we are on nameplate page, done
			
		}
	},
		
	StartAllModulesEvent : {
		name: 'StartAllModulesModelEvent',
		handler: function(data) {
			this.registerAccessoryPageModule(data.modelId, data.path, data.derivativeId, data.engineId, data.categoryId);
			data.callback({path: data.path, askForPostcodeLater: data.askForPostcodeLater, showPricesLater: data.showPricesLater, derivativeId:data.derivativeId, engineId:data.engineId});
		}
	},	
	
	RestoreCompleteEvent : {
		name: 'RestoreCompleteModelEvent',
		handler: function(data) {
			this.navToSummaryPage(data.modelId, data.path, data.derivativeId, data.engineId, data.isLoadingConfig, data.showPricesLater); 
		}
	},
		
	ShareLinkClickedEvent: {
		name: 'ShareLinkClickedModelEvent',
		handler: function(provider) {
	//				Analytics.trackOmnitureAction.call(this, 'ShareLink', provider);
	//				Events.fireEvent(Events.eventList.buildandprice.router.ActionTriggeredEvent, {action : 'ShareLink', value: provider});
			Events.fireEvent(Events.eventList.buildandprice.omniture.ShareLinkClickedEvent, {provider: provider, storage: this.storage});
		}
	},
	
	ViewAccessoryDetailsEvent : {
	    name: 'ViewAccessoryDetailsModelEvent',
	    handler: function () {
	        Events.fireEvent(Events.eventList.buildandprice.omniture.ViewAccessoryDetailsEvent, { storage: this.storage.storageModel });
	    }
	},

	SubTabChangedEvent: {
		name: 'SubTabChangedModelEvent', 
		handler : function(tabId) {
			//Util.log('SubTabChangedModelEvent');
//			var tabIdx = tabId.substring(tabId.indexOf('cat-') + 'cat-'.length, tabId.length);
//			var categoryGroups = this.dataLoader.categoryGroups();
//			var categories = categoryGroups.getSelected().get('categories');
//			categories.selectByOrder(tabIdx);
//			Events.fireEvent(Events.eventList.buildandprice.omniture.TabChangedEvent, {storage: this.storage});
		}
	},
	
	OrientationChangedEvent: {
		name: 'OrientationChangedModelEvent'
	},
	
	ShareLinkClickedEvent: {
		name: 'ShareLinkClickedModelEvent'	
	},
	
	ShareConfigEvent: {
		name : 'ShareConfigModelEvent'
	},
	
	SaveAsPDFEvent : {
		name : 'SaveAsPDFModelEvent'
	},
	
	RequestAQuoteEvent : {
		name: 'RequestAQuoteModelEvent'
	},

	PresentPaymentEvent : {
		name: 'PresentPaymentEvent'
	},
	
	PricezoneSelectedEvent : {
		name :'PricezoneSelectedModelEvent',
		handler : function(pricezoneId) {
			//Util.log('pricezoneSelected');
//			var pcz = this.dataLoader.pricezones();
//			this.storage.destroy();
//			this.storage = new models.Storage();
//			this.userPref.purge();
//			this.storage.set(Constants.storage.pricezoneCollection, pcz);
//			this.updatePricezoneForUserObject(model);
//			Events.fireEvent(Events.eventList.buildandprice.router.UpdatePricezoneEvent, model.get('name'));
//			Events.fireEvent(Events.eventList.buildandprice.omniture.PricezoneChangedEvent, model.get('name'));
//			Util.cookie.save(Constants.cookie.pzid, model.get('id'));
//			this.navigate('reset', {trigger: true});
			var self=this;
			var pricezoneCollection=self.dataLoader.pricezones();
			var pricezone=pricezoneCollection.get(pricezoneId);
			if(pricezone){
				self.dataLoader.updatePricezoneForUserObject(pricezone);
				Util.cookie.save(Constants.cookie.pzid, pricezoneId);
			}
			self.navigate('reset',{trigger:true});
		}
	},
	
	PricezoneChangeRequestEvent: {
		name : 'PricezoneChangeRequestModelEvent',
		handler: function(isFirstLoad) {
//			var self = this;
//			self.fetchPricezones(function(collection) {
//				self.diplayRegionOverlayView(collection);
//			});
			if(isFirstLoad){
				this.viewManager.showPricezone(null,BnP.CommonHelper.isStateCitySelector());
			}
			else{
			var curPricezone=this.dataLoader.pricezones().getSelected();
				this.viewManager.showPricezone(curPricezone,BnP.CommonHelper.isStateCitySelector());
			}
		}
	},
			
	PricezoneCheckRequestEvent:{
		name:'PricezoneCheckRequestModelEvent',
		handler:function(){
			if(this.dataLoader.isFirstLoad && ConfigUtil.showPricezones()){
				var pricezoneCookie=Util.cookie.load(Constants.cookie.pzid);
				if(!pricezoneCookie || !pricezoneCookie.length){
					Events.fireEvent(Events.eventList.buildandprice.model.PricezoneChangeRequestEvent.name,true);
		}
				this.dataLoader.isFirstLoad=false;
			}
		}
	},
	
	RegionPostcodeChangeRequestEvent: {
		name: 'RegionPostcodeChangeRequestModelEvent',
		handler: function(forceDisplayRegionOverlay) {
			//Util.log('Handling RegionPostcodeChangeRequestEvent: ' + forceDisplayRegionOverlay);
			forceDisplayRegionOverlay = forceDisplayRegionOverlay || false;
			if (ConfigUtil.showPostcodeSelect()) {
				//Display region overlay if no region is set.
				//if forceDisplayRegionOverlay is set to true, region overlay will be opened regardless of the status of cookie.
				//if forceDisplayRegionOverlay is set to false, region overlay will be opened only if region cookie is not set.
				var self = this;
				ND.API.requestChangePriceBuildAndPrice({complete: function(result) {
					//fire an event and let whomever is listening to update themselves.
					if (typeof result !== 'undefined' && result != null && result.postcode) {
						var userPref = self.dataLoader.userPref;
						if ((userPref.get('postcode') !== result.postcode) || (userPref.get('usage') !== result.usage)) {
							Events.fireEvent(Events.eventList.buildandprice.model.RegionPostcodeChangedEvent, result);
							Events.fireEvent(Events.eventList.buildandprice.router.HidePricesEvent, !ConfigUtil.showPrices());
							Events.fireEvent(Events.eventList.buildandprice.omniture.RegionPostcodeChangedEvent, result);
							var pcz = self.dataLoader.pricezones();
							self.dataLoader.reset(pcz);
							self.navigate('reset', {trigger: true});
							Events.fireEvent(Events.eventList.buildandprice.router.AskForPostcodeEvent, false);
						}
					} else {
						Events.fireEvent(Events.eventList.buildandprice.router.HidePricesEvent, true);
					}
					
				}}, forceDisplayRegionOverlay);
			}
		}
	},
	
	ChangePostcodeOrPricezoneEvent:{
		name:'ChangePostcodeOrPricezoneEvent',
		handler:function(){
			if(ConfigUtil.showPostcodeSelect()){
				Events.fireEvent(Events.eventList.buildandprice.view.RegionPostcodeChangeRequestEvent, true);				
			}
			else if(ConfigUtil.showPricezones()){
				Events.fireEvent(Events.eventList.buildandprice.model.PricezoneChangeRequestEvent.name);
			}
		}
	},
	
	ToggleViewEvent: {
		name :'ToggleViewModelEvent',
		/**
		 * If Exterior view : Save current visible layers. then find the selected trim and display it
		 * if Interior view : Save interior view and select selected color and all its layers.
		 * @param view
		 */
		handler: function(view) {
				
			var ddm = this.dataLoader.derivativeDetails();
			ddm.set('view', view);
			var gallery = this.dataLoader.gallery().get('gallery');
			
			var colorCollection = this.dataLoader.colors();
			var color = colorCollection.getSelected();
			
			if (color) {
				if (view == Constants.view.exterior) {
					//console.log('view: ', Constants.view.exterior);
					gallery.toggleLayer(color.get('id'));
//						Analytics.trackOmnitureAction.call(this, 'ViewChanged', Constants.view.exterior);
//						Events.fireEvent(Events.eventList.buildandprice.router.ActionTriggeredEvent, {action : 'ViewChanged', value: Constants.view.exterior});
				} else { //interior
					var trim = color.get('trims').getSelected();
					gallery.toggleLayer(trim.get('id'));
//						Analytics.trackOmnitureAction.call(this, 'ViewChanged', Constants.view.interior);
				}
				Events.fireEvent(Events.eventList.buildandprice.router.ActionTriggeredEvent, {action : 'ViewChanged', value: Constants.view.exterior});
				var features = this.dataLoader.categoryGroups().getSelectedFeatures();
				if (features && features.length > 0) {
					_.each(features, function(feature) {
						gallery.toggleLayer(feature.get('id'));
					});
				}
			}
		}	
	},
	
	
	TabChangeRequestEvent : { 
		name : 'TabChangeRequestModelEvent',
		handler : function(tabOrder) {
//			var categoryGroups = this.dataLoader.categoryGroups();
//			var categoryGroup = categoryGroups.getSelected();
//			var prevIdx = categoryGroup.get('order');
//			var dir = tabOrder - prevIdx; 
//			if (dir > 0) {
//				//call eventbus to notify the view to change to next tab
//				Events.fireEvent(Events.eventList.buildandprice.router.NextTabEvent);
//			} else if (dir < 0) {
//				//call eventbus to notify the view to change to prev tab
//				Events.fireEvent(Events.eventList.buildandprice.router.PrevTabEvent);
//			}
			//this.updateFooter(Constants.state.CUSTOMIZE_DERIVATIVE);
		}
	},
	
	StepChangeRequestEvent: { 
		name : 'StepChangeRequestModelEvent',
		handler : function(url) {
			//Util.log('stepChangeRequest URL: ' + url);
//			this.navigate(url, {trigger: true});
		}
	},
	StepChangeHeaderRequestEvent : {
		name : 'StepChangeHeaderRequestModelEvent',
		handler : function(header) {
//				Util.log('stepChangeRequest URL: ' + header.get('headerURL'));
//				this.updateFooter(header.get('state'));
			this.navigate(header.get('headerURL'), {trigger: true});
		}
	},
	TabChangedEvent : {
		name: 'TabChangedModelEvent', 
		handler : function(tabId) {
//			var tabIdx = tabId.substring(tabId.indexOf('cat-group-') + 'cat-group-'.length, tabId.length);
//			//Util.log('Router.tabchanged: ' + tabIdx);
//			var categoryGroups = this.dataLoader.categoryGroups();
//			categoryGroups.selectByOrder(tabIdx);
//			Events.fireEvent(Events.eventList.buildandprice.omniture.TabChangedEvent, {storage: this.storage});
		    //			//this.updateFooter(Constants.state.CUSTOMIZE_DERIVATIVE);
		}
	},
	
	ModelSelectedEvent: {
		name : 'ModelSelectedModelEvent'
	},
	
	PathSelectedEvent: {
		name: 'PathSelectedModelEvent'
	},
	
	DerivativeSelectedEvent : {
		name :'DerivativeSelectedModelEvent'
	},
	
	FeatureSelectedEvent : { 
		name : 'FeatureSelectedModelEvent'
	},
	
	EngineTrasmissionSelectedEvent : { 
		name: 'EngineTrasmissionSelectedModelEvent'
	},
	
	TrimSelectedEvent : { 
		name : 'TrimSelectedModelEvent'
	},
	
	ColorChangedEvent : { 
		name : 'ColorChangedModelEvent'
	},
	
	PackageSelectedEvent: {
		name : 'PackageSelectedModelEvent'
	},
	
	/*
	 * Takes the user back to Nameplate page and clears the history.
	 */
	StartOverEvent: {
		name :'StartOverModelEvent',
		handler :  function() {

			this.dataLoader.reset();
			this.navigate('reset', {trigger: true});
		}
	},
	
	/*
	 * Notifies the view to re-render the sorted list
	 */
	FeaturesSortCompletedEvent: 'FeaturesSortCompletedModelEvent',
	RegionPostcodeChangedEvent: 'RegionPostcodeChangedModelEvent',
	ShowArrowsEvent: 'ShowArrawsModelEvent',
	HideArrowsEvent: 'HideArrawsModelEvent',
	RegionPostcodeLoadedFromConfigEvent: 'RegionPostcodeLoadedFromConfigModelEvent' //to notify omniture only
};


Events.eventList.buildandprice.omniture = {
    RegionPostcodeChangedEvent: 'Omniture:RegionPostcodeChangedEvent',
    PricezoneChangedEvent: 'Omniture:PricezoneChangedEvent',
    StateChangedEvent: 'Omniture:StateChangedEvent',
    TabChangedEvent: 'Omniture:TabChangedEvent',
    ViewAccessoryDetailsEvent: 'Omniture:ViewAccessoryDetailsEvent',
    ColorSelectedEvent: 'Omniture:ColorSelectedEvent',
    TrimSelectedEvent: 'Omniture:TrimSelectedEvent',
    OrientationChangedEvent: 'Omniture:OrientationChangedEvent',
    ShareLinkClickedEvent: 'Omniture:ShareLinkClickedEvent',
    SaveAsPDFEvent: 'Omniture:SaveAsPDFEvent'
};


/**
 * 
 */
var BnP = BnP || {};
Events.eventList.buildandprice.view = {
	/**
	 * Events are grouped based on where they are fired.
	 * view events are Fired from View objects, etc
	 */
		
	ChangeVehicleEvent: 'ChangeVehicleEvent',
	PricezoneChangeRequestEvent: 'PricezoneChangeRequestEvent',
	PathSelectedEvent: 'PathSelectedEvent',
	DerivativeSelectedEvent: 'DerivativeSelectedEvent',
	PackageSelectedEvent: 'PackageSelectedEvent',
	SaveAsPDFEvent : 'SaveAsPDFEvent',
	ShareConfigEvent : 'ShareConfigEvent',
	TrimSelectedEvent: 'TrimSelectedEvent',
	ColorChangedEvent: 'ColorChangedEvent',
	ModelSelectedEvent: 'ModelSelectedEvent',
	PricezoneSelectedEvent : 'PricezoneSelectedEvent',
	ToggleViewEvent: 'ToggleViewEvent',
	RequestAQuoteEvent: 'RequestAQuoteEvent',
	PresentPaymentEvent: 'PresentPaymentEvent',
	TabChangeRequestEvent :'TabChangeRequestEvent',
	StepChangeRequestEvent: 'StepChangeRequestEvent',
	StepChangeHeaderRequestEvent: 'StepChangeHeaderRequestEvent',
	TabChangedEvent : 'TabChangedEvent',
	FeatureSelectedEvent : 'FeatureSelectedEvent',
	DerivativeSelectedEvent : 'DerivativeSelectedEvent',
	NextOrientationEvent: 'NextOrientationEvent',
	PrevOrientationEvent: 'PrevOrientationEvent',
	StartOverEvent : 'StartOverEvent',
	EngineTrasmissionSelectedEvent : 'EngineTrasmissionSelectedEvent',
	SortFeaturesByPriceEvent : 'SortFeaturesByPriceEvent',
	SortFeaturesByNameEvent : 'SortFeaturesByNameEvent',
	RegionPostcodeChangeRequestEvent: 'RegionPostcodeChangeRequestEvent',
	HotDealSelectedEvent: 'HotDealSelectedEvent',
	UpdateScrollBarEvent: 'UpdateScrollBarEvent',
	SubTabChangedEvent: 'SubTabChangedEvent',
	ViewAccessoryDetailsEvent: 'ViewAccessoryDetailsEvent',
	PanelToggleEvent: 'PanelToggleEvent',//internal view event
	PageChangedEvent: 'PagedChangedEvent', //internal view event
	PrevPageRequestedEvent: 'PrevPageRequestedEvent',
	ChangePostcodeOrPricezoneEvent: 'ChangePostcodeOrPricezoneEvent'
};

BnP.Views = (function(window,document, $, undefined){
	
	var views = {};

	views.NameplateCategoryList = Backbone.View.extend({
		tagName: 'ul',
		
		children : [],
		
//		id : 'bp-select-model-container',
//		data-role="listview" class="model-list title-only" data-theme="d" data-divider-theme="d"
		className: 'model-list title-only',
		
		render: function() {
//			var i = 0;
			var el = this.$el;
			el.attr({'data-role':'listview', 'data-theme':'d', 'data-divider-theme':'d'});
			var self = this;
			_.each(this.collection.models, function (category) {
				el.append('<li data-role="list-divider" id="nameplate-cat-' + category.get('order') + '">' + category.get('name') + '</li>');
				var models = category.get('nameplates').models;
				var j = 0;
				_.each(models, function (nameplate) {
					self.children[j] = new views.NameplateItem({model:nameplate});
					el.append(self.children[j++].render().$el);
				});
				
//				ul.append(this.categoryTemplate(category.toJSON()));
//				i++;
	        }, this);
//			el.find('.buildselect').append(ul);
//			el.find('.buildlist').append(rows);
	        return this;
		},
		
		initialize: function() {
//			this.template = _.template($('#bp-nameplate-list-template').html());
//			this.categoryTemplate = _.template($("#bp-nameplate-category-item").html());
			this.collection.bind("reset", this.render, this);
		}
		
	});
	
	
	views.NameplateItem = Backbone.View.extend({
		
		 tagName: 'li',
		 
		 events: {
			'click .bp-nameplate-list-item' : 'modelSelected'
		 },
		  
		 modelSelected : function(e) {
			e.preventDefault();
			this.model.trigger(Events.eventList.buildandprice.view.ModelSelectedEvent, this.model);
		 },
		  
		 initialize: function() {
			this.template = _.template($("#mbp-nameplate-list-item-template").html());
		 	this.model.bind('change:selected', this.toggleClass, this);
		 	this.model.bind('destroy', this.destroy, this);
		 },
		 
		 toggleClass: function() {
			 $(this.el).toggleClass('cur', this.model.get('selected'));
		 },
		 
		 render: function() {
			  var html = this.template(this.model.toJSON());
			 $(this.el).toggleClass('cur', this.model.get('selected')).html(html);
			  return this;
		 }
	});
	
	views.PathList = Backbone.View.extend({
		
		className: 'path',
		
		tagName: 'div',
		
		children: [],
		
		initialize: function() {
		},
		
		render: function() {
			var i = 0;
			var el = this.$el;
			var ul = $('<ul></ul>');
			var self = this;
			_.each(this.collection.models, function (path) {
				self.children[i] = new views.PathListItem({model:path, className:'ui-btn-icon-right'});
				ul.append(self.children[i].render().$el);
				i++;
	        }, this);
			el.append(ul);
	        return this;
		}
	});
	
	views.PathListItem = Backbone.View.extend({
		
		tagName: 'li',
		
		events: {
			'click .bp-path-item' : 'pathSelected'
		},
		
		initialize: function() {
			this.template = _.template($('#bp-path-list-item-template').html());
			this.model.bind('change:selected', this.toggleClass, this);
		},
		
		pathSelected : function(e) {
			//Util.log('pathSelected');
			this.model.trigger(Events.eventList.buildandprice.view.PathSelectedEvent, this.model);
		},
		
		toggleClass: function() {
			 $(this.el).toggleClass('cur', this.model.get('selected'));
		},
		 
		render: function() {
			  var html = this.template(this.model.toJSON());
			  $(this.el).toggleClass('cur', this.model.get('selected')).html(html);
			  return this;
		}
		
		
	
	});
	
	/**
	 * In charge of rendering list of Derivative (NOT DerivativeDetails)  
	 */
	views.DerivativeList = Backbone.View.extend({
		children : [],
		
		tagName: 'ul',
		
		className: 'model-list',
		
		render: function() {
			var i = 0;
			var el = this.$el.attr({'data-role':'listview', 'data-theme':'d'});
			var self = this;
			_.each(this.collection.models, function (vehicle) {
				self.children[i] = new views.DerivativeItem({model:vehicle});
				el.append(self.children[i].render().$el);
				i++;
	        }, this);
	        return this;
		},
		
		initialize: function() {
		}
		
	});
	
	
	
	/**
	 * In charge of rendering a single Derivative (NOT DerivativeDetails) Item
	 */
	views.DerivativeItem = Backbone.View.extend({
		 tagName: 'li',		
		  
		 className : 'bp-derivative-list-item',
		
		 events: {
			 'click .mbp-derivative-list-item' : 'derivativeSelected'
//			 'click .details-button' : 'viewHotDealOffer'
		 },
//		  
		 derivativeSelected : function(e) {
			  e.preventDefault();
			  this.model.trigger(Events.eventList.buildandprice.view.DerivativeSelectedEvent, this.model);
		 },
//		 
//		 viewHotDealOffer: function(e) {
//			 var hotDealUrl = this.model.get('hotDealUrl');
//			 if (hotDealUrl === '#' || hotDealUrl === '') {
//				 Util.log('preventHotDealUrl');
//				 e.preventDefault();
//			 }
//		 },
//		  
		 initialize: function() {
			  this.template = _.template($('#mbp-derivative-list-item-template').html());
			  this.model.bind('change:selected', this.toggleClass, this);
			  this.model.bind('destroy', this.destroy, this);
//			  Events.bind(Events.eventList.buildandprice.router.EnginesLoadedEvent, this.displayEnginesOverlay, this);
		 },
		  
		 render: function() {
			  var html = this.template(this.model.toJSON());
			  $(this.el).toggleClass('cur', this.model.get('selected'))
			  			.toggleClass('has-latest', this.model.get('hotDealUrl') !== '#').html(html);
			  return this;
		 },
		 
//		 addHotDealUrl: function() {
//			$(this.el).append(this.hotDealTemplate({hotDealUrl : this.model.get('hotDealUrl')}));
//		 }, 
		  
		 toggleClass : function() {
			 $(this.el).toggleClass('cur', this.model.get('selected') );
		 }
	});

	views.PackageList = views.DerivativeList.extend({
		
		render: function() {
			var i = 0;
			var el = this.$el.attr({'data-role':'listview', 'data-theme':'d'});
			var self = this;
			_.each(this.collection.models, function (vehicle) {
				self.children[i] = new views.PackageItem({model:vehicle});
				el.append(self.children[i].render().$el);
				i++;
	        }, this);
	        return this;
		}
		
	});
	
	views.PackageItem = views.DerivativeItem.extend({
		
		 events: {
			 'click .mbp-derivative-list-item' : 'packageSelected',
			 'click a#popup':'viewDetails'
		 },
		  
		 packageSelected : function(e) {
			  e.preventDefault();
			  this.model.trigger(Events.eventList.buildandprice.view.PackageSelectedEvent, this.model);
		 },

		 viewDetails: function(e) {			  
			  views.Helper.openOverlay(e);
		  },

		  initialize: function() {
			  this.template = _.template($('#mbp-package-list-item-template').html());
			  this.model.bind('change:selected', this.toggleClass, this);
			  this.model.bind('destroy', this.destroy, this);
		      //Events.bind(Events.eventList.buildandprice.router.EnginesLoadedEvent, this.displayEnginesOverlay, this);
		 },		  

		 toggleClass : function() {
			 $(this.el).toggleClass('cur', this.model.get('selected') );
		 },

		 render: function () {
		     var html = this.template(this.model.toJSON());
		     $(this.el).toggleClass('cur', this.model.get('selected'))
                       .toggleClass('has-latest', true).html(html);
		     return this;
		 }
		
	});

	views.EngineTransmissionList = Backbone.View.extend({
		
//		className: 'engine-list',
		
		children : [],
		
		render: function() {
			var i = 0;
			var el = this.$el;
			$enginesEl = el.html(this.template({derivativeName: this.derivativeName, 
												derivativeThumbnail: this.derivativeThumbnail})
								 ).find('#mbp-engine-list');
			var self = this;
			_.each(this.collection.models, function (engine) {
				self.children[i] = new views.EngineTransmissionItem({model:engine});
				$enginesEl.append(self.children[i].render().$el);
				i++;
	        }, this);
			
	        return this;
		},
		
		initialize: function(options) {
			this.template = _.template($("#mbp-engine-list-template").html());
			this.derivativeName = options.derivativeName;
			this.derivativeThumbnail = options.derivativeThumbnail;
		}
		
	});
	
	views.EngineTransmissionItem = Backbone.View.extend({
		  tagName : 'li',
		  
		  events: {
			'click .mbp-engine' : 'engineChanged'  
		  },

		  engineChanged : function(e) {
			  e.preventDefault();
			  this.model.trigger(Events.eventList.buildandprice.view.EngineTrasmissionSelectedEvent);
		  },
		  
		  initialize: function() {
			  this.template = _.template($("#mbp-engine-list-item-template").html());
			  this.model.bind('change:selected', this.toggleClass, this);
			  this.model.bind('destroy', this.destroy, this);
		  },
		  
		  render: function() {
			  var html = this.template(this.model.toJSON());
			  $(this.el).toggleClass('cur', this.model.get('selected')).html(html);
			  return this;
		 },
		  
		  toggleClass : function() {
			  //Util.log('Engine \'' + this.model.get('id') + '\'  is selected ? ' + this.model.get('selected'));
			  this.$el.toggleClass('cur', this.model.get('selected'));
		  }
		  
	});
	
	views.HotDeal = Backbone.View.extend({
		initialize: function() {
			 this.template = _.template($("#mbp-hotdeals-template").html());
		}
	});
	
	views.ColorList = Backbone.View.extend({
		
		className: 'color',
		
		id : 'mbp-color-name',
		
		children : [],
		
		events: {
		},
		
		render: function() {
			var i = 0;
			var el = this.$el;
//			
			el.html('<h3></h3><ul id="mbp-color-items"></ul><div class="clear"></div>');
			var $colorItems =  el.find('#mbp-color-items');
			var $colorNameDiv = el.find('h3');
			_.each(this.collection.models, function (color) {
				//console.log('color');
				this.children[i] = new views.ColorItem({
					model:color,
					colorNameDiv: $colorNameDiv,
					template : this.colorItemTemplate,
					nameTemplate : this.nameTemplate});
				$colorItems.append(this.children[i].render().$el);
				i++;
	        }, this);
			
	        return this;
		},
		
		initialize: function() {
//			this.template =  _.template($("#bp-color-list-template").html());
			this.colorItemTemplate =  _.template($("#mbp-color-list-item-template").html());
//			this.tooltipTemplate = _.template($("#bp-tooltip-template").html());
			this.nameTemplate = _.template($("#mbp-color-trim-name-template").html());
		}
		
	});

	views.ColorItem = Backbone.View.extend({
		  
		  tagName: 'li',
		
		  events: {
			  'click .color-item' : 'colorChanged'
				  
		  },
		  
		  colorChanged : function (e) {
			  e.preventDefault();
			  //console.log('ColorItemView: isSystem: false');
			  this.model.trigger(Events.eventList.buildandprice.view.ColorChangedEvent, {color: this.model, isSystem: false});
		  },

		  render: function() {
			  var el = $(this.el);
			  el.html(this.template(this.model.toJSON()));
			  this.toggleSelected();
//			  el.append(this.tooltipTemplate(json));
			  return this;
		  },
		  
		  toggleSelected: function() {
			  var selected = this.model.get('selected');
			  $(this.el).toggleClass('active', selected);
			  if (selected === true) {
				  this.$colorNameDiv.html(this.nameTemplate({selected : selected, 
				  	name: this.model.get('name'), 
				  	isColor: true,
				  	categoryTitle:Translator.translate('bpt-module-title-colors')}));
			  }	
		  },
		  
		  initialize: function(options) {
			 
			  this.model.bind('change:selected', this.toggleSelected, this);
			  this.model.bind('destroy', this.destroy, this);
			  this.$colorNameDiv = options.colorNameDiv;
			  this.template = options.template;
			  this.nameTemplate = options.nameTemplate;
//			  this.tooltipTemplate = options.tooltipTemplate;
			  //apple device specific event handling
//			  if (ND.Utils !== undefined && ND.Utils.isTouchDevice() === true) {
//				 $(this.el).on('mouseover', '.color-item' ,$.proxy(this.colorChanged, this)); 
//			  }
		  }

	});	
	
	views.TrimList = Backbone.View.extend({
		
		className: 'trim',
		
		id: 'mbp-trim-name',
		
		children : [],
				
		render: function() {
			var i = 0;
			var el = this.$el;
			el.append('<h3></h3><ul id="mbp-trim-items"></ul><div class="clear"></div>');
			var $trimName = el.find('h3');
			var $trimItems =  el.find('#mbp-trim-items');
			_.each(this.collection.models, function (trim) {
				//console.log('trim');
				this.children[i] = new views.TrimItem({model:trim,
					trimNameDiv: $trimName,
					template : this.trimItemTemplate,
//					tooltipTemplate : this.tooltipTemplate,
					nameTemplate : this.nameTemplate});
				$trimItems.append(this.children[i].render().$el);
				i++;
	        }, this);
	        return this;
		},
		
		
//		render: function() {
//			var i = 0;
//			var el = this.$el;
//			var self = this;
//			_.each(this.collection.models, function (trim) {
//				self.children[i] = new views.TrimItem({model:trim});
//				el.append(self.children[i].render().$el);
//				i++;
//	        }, this);
//	        return this;
//		},
//		
		initialize: function() {
			this.nameTemplate = _.template($("#mbp-color-trim-name-template").html());
			this.trimItemTemplate =  _.template($("#mbp-trim-list-item-template").html());
		}
	});
	

	views.TrimItem = Backbone.View.extend({
		  
		 tagName: 'li',
		
		 events: {
			 'click .trim-item' : 'trimChanged'
		 },
		  
		 render: function() {
			  var el = $(this.el);
			  el.html(this.template(this.model.toJSON()));
			  this.toggleSelected();
//			  el.append(this.tooltipTemplate(json));
			  return this;
		  },
		  
		  initialize: function(options) {
			  this.model.bind('change', this.toggleSelected, this);
			  this.model.bind('destroy', this.destroy, this);
			  //apple device specific event handling
//			  if (ND.Utils !== undefined && ND.Utils.isTouchDevice() === true) {
//				 $(this.el).on('mouseover', '.trim-item' ,$.proxy(this.trimChanged, this)); 
//			  }
			  this.$trimNameDiv = options.trimNameDiv;
			  this.template = options.template;
			  this.nameTemplate = options.nameTemplate;
		  },
		  
		  toggleSelected: function() {
			  var selected = this.model.get('selected');
			  $(this.el).toggleClass('active', selected);
			  if (selected === true) {
				  this.$trimNameDiv.html(this.nameTemplate({selected : selected, 
				  	name : this.model.get('name'),
				  	isColor: false,
				    categoryTitle:Translator.translate('bpt-module-title-trims')}));
			  }
		  },
		  
		  destroy : function() {
			  $(this.el).unbind();
		      $(this.el).remove();
		  },
		  
		  trimChanged : function(e) {
			  e.preventDefault();
//			  console.log('TrimItemView: isSystem: false');
			  this.model.trigger(Events.eventList.buildandprice.view.TrimSelectedEvent, {trim: this.model, isSystem : false});
		  }
	});
	
	views.FeatureList = Backbone.View.extend({
		
		children : [],
		
		className: 'custom',
		
//		events: {
//			'click .bp-sort-price' : 'sortByPrice',
//			'click .bp-sort-name' : 'sortByName'
//	    },
	    
//	    sortByName: function(e) {
//	    	e.preventDefault();
////	    	var sortDir = $(e.target).attr('data-sort-dir');
//	    	//Util.log('sortByName-> dir:' + sortDir);
//	    	this.model.trigger(Events.eventList.buildandprice.view.SortFeaturesByNameEvent);
//	    },
//	    
//	    sortByPrice: function(e) {
//	    	e.preventDefault();
////	    	var sortDir = $(e.target).attr('data-sort-dir');
//	    	//Util.log('sortByPrice-> dir:' + sortDir);
//	    	this.model.trigger(Events.eventList.buildandprice.view.SortFeaturesByPriceEvent);
//	    },
//		
		render: function() {
			var el = this.$el;
//			var sortDir = this.model.get('sortDir');
			//Util.log('FeatureListView.render()-> name:' + sortDir.get('name') + ' price:' + sortDir.get('price'));
//			el.append(this.template({nameSortDir: sortDir.get('name'), priceSortDir: sortDir.get('price')}));
			el.append('<h3>'+this.model.get('name')+'</h3>');
			var $featuresEl = $('<fieldset data-role="controlgroup"></fieldset>');
			this.renderFeatures($featuresEl);
			el.attr('data-role','fieldcontain').append($featuresEl);
	        return this;
		},
		
		renderFeatures : function($featuresEl) {
			var collection = this.model.get('features');
			var i = 0;
			$featuresEl.empty();
			this.reset();
			//$featuresEl.append('<h3>'+this.model.get('name')+'</h3>');
			_.each(collection.models, function (feature) {
				this.children[i] = new views.FeatureItem({model:feature});
				$featuresEl.append(this.children[i].render().$el);
				i++;
	        }, this);
			
		},
		
		initialize: function() {
			var features = this.model.get('features');
			features.bind('reset', this.reset, this);
//			features.bind(Events.eventList.buildandprice.model.FeaturesSortCompletedEvent, this.updateList, this);
		},
		
//		updateList: function () {
//			//Util.log('updateList');
//			var el = this.$el;
//			el.find('.bp-sort-options').remove();
//			var sortDir = this.model.get('sortDir');
//			el.prepend(this.template({nameSortDir: sortDir.get('name'), priceSortDir: sortDir.get('price')}));
//			var $accessoryList = el.find('ul.accessories-list');
//			this.renderFeatures($accessoryList);
//		},
		
		reset: function() {
			_.each(this.children, function(child) {
				child.destroy();
			}, this);
			this.children = [];
			
		}
		
		
	});

	views.FeatureItem = Backbone.View.extend({
			
		  className: 'feature css3-cbox',
		  
		  events: {
			  'click .selection' : 'featureSelected',
			  'click a' : 'viewFeatureDetails'
//			  'click .expand-collapse' : 'expandCollapse',
//			  'mouseenter .bp-tooltip-link' : 'tooltipHoverOn',
//			  'mouseleave .bp-tooltip-link' : 'tooltipHoverOff'
		  },
		  
		  featureSelected : function(e) {
			 //console.log('feature selected');
//			 e.preventDefault();
			 if (!this.model.get('disabled')) {
				 this.model.trigger(Events.eventList.buildandprice.view.FeatureSelectedEvent, this.model);
//				 if (this.model.get('selected')) {
//					 if (this.model.get('spriteUrl') != '') {
//						 views.Helper.displayFeatureVisualisedMessage(this.$visualiseMsg, this.$notVisualiseMsg);
//					 } else {
//						 views.Helper.displayFeatureVisualisedMessage(this.$notVisualiseMsg, this.$visualiseMsg);
//					 }
//			  	 }
			 }
		  },
		  
//		  expandCollapse: function(e) {
//			  e.preventDefault();
////			  var link = $(e.target);
////			  var ul = link.parent().siblings('ul.bp-feature-group');
////			  var hasExpandedClass = ul.hasClass('expanded');
////			  ul.toggleClass('expanded', !hasExpandedClass).toggleClass('hidden', hasExpandedClass);
////			  link.attr('class', hasExpandedClass ? 'spsplus' : 'spstoggle');
////			  Events.fireEvent(Events.eventList.buildandprice.view.UpdateScrollBarEvent);
//				  
//		  },
		  
//		  tooltipHoverOn: function() {
//			  if (!this.model.get('disabled')) {
//				  var $tooltip = $('#bp-feature-tooltip-p');
//				  $tooltip.text(this.model.get('note'));
//				  $('#bp-feature-tooltip').show();
//			  } 
//		  },
//		  
//		  tooltipHoverOff: function() {
//			  $('#bp-feature-tooltip').hide();
//		  },
		  
		  viewFeatureDetails: function(e) {
			  if (!this.model.get('disabled')) {
				  Events.fireEvent(Events.eventList.buildandprice.view.ViewAccessoryDetailsEvent);
				  views.Helper.openOverlay(e);
			  }
		  },
		  
		  initialize: function() {
			  this.template = _.template($("#mbp-feature-list-item-template").html());
			  this.messageTemplate = _.template($("#mbp-feature-message-template").html());
			  this.model.bind('change:selected change:disabled', this.toggleClass, this);
			  this.model.bind('change:message', this.updateMessage, this);
			  this.model.bind('destroy', this.destroy, this);
			  this.isOptionPack = this.model.get('isOptionPack');
//			  this.$visualiseMsg = $('#bp-visualise-msg');
//			  this.$notVisualiseMsg = $('#bp-no-visualise-msg');
		  },
		  
		  toggleClass: function() {
//			  console.log('views.FeatureItem.toggleClass');
			  var el = $(this.el);
			  el.toggleClass('active', this.model.get('selected'))
			    .toggleClass('ui-disabled', this.model.get('disabled'));
			  return el;
		  },
		  
		  updateMessage: function() {
//			  console.log('views.FeatureItem.updateMessage');
			  var el = this.$el;
			  var $elMsg = el.find('div.disabled-msg');
			  if ($elMsg.length > 0) {
				  $elMsg.remove();
			  } 
			  el.append(this.messageTemplate(this.model.toJSON()));  
			  
			  
//			  Events.fireEvent(Events.eventList.buildandprice.view.UpdateScrollBarEvent);
		  },
		  
		  render: function() {
			  var modelJson = this.model.toJSON();
			  var el = this.toggleClass().html(this.template(modelJson));
			  var collection = this.model.get('featureGroupAttributes');
			  if (this.isOptionPack && 
			      collection && collection != null && collection.length > 0) {
				 var $optionPackEl = $('<div class="detail"><ul></ul></div>');
				 var $ulEl = $optionPackEl.find('ul');
				_.each(collection.models, function(featureGroupAttribute) {
					$ulEl.append('<li>' + featureGroupAttribute.get('featureName') + '</li>');
				}, this);
				el.append($optionPackEl);
			  } else {
				  el.append(this.messageTemplate(modelJson));
			  }
			  return this;
		 }
	});
	
	views.Gallery = Backbone.View.extend({
		
		className: 'slider',
		
		children : [],
		  
		events: {
			'click #touchslider-next' : 'prev',
			'click #touchslider-prev' : 'next'
		},

		next: function(e) {
			e.preventDefault();
			//notify the model an orientation change request was requested , model updates itself and view gets updated automatically
			this.collection.trigger(Events.eventList.buildandprice.view.NextOrientationEvent);
		},

		prev: function(e) {
			e.preventDefault();
			//notify the model an orientation change request was requested , model updates itself and view gets updated automatically
			this.collection.trigger(Events.eventList.buildandprice.view.PrevOrientationEvent);
		},

		render: function() {
			$(this.el).html(this.template({showArrows: this.model.get('showArrows')}));
			this.renderChildren();
			return this;
		},

		renderChildren : function() {
			var galleryContent =  $(this.el).find('#mbp-sprites'),
				i = 0, 
				options = {next : this.next, prev : this.prev, parent: this,
				slideNavContainer  :  $(this.el).find('.slider-nav')};
			//can't use this logic...the view hasn't been rendered
//			, displayCueMsg = false;
			_.each(this.collection.models, function (img) {
//				if (i === 0) {
//					console.log('numberImages > 1 ? ' + (img.get('numImages') > 1));
//					displayCueMsg = (img.get('numImages') > 1);
//				}
							
				//console.log('renderChildren');
				options.model = img;
				this.children[i] = new views.GalleryItem(options);
				galleryContent.append(this.children[i++].render().$el);
			}, this);

			options.slideNavContainer.children().removeClass('hidden');

//			if (displayCueMsg === true) {
//				console.log('displayCueMsg');
//				views.Helper.displayGalleryCueMessage();
//			}
			return this;
		},

		initialize: function() {
			this.template = _.template($('#mbp-gallery-template').html());
			this.collection = this.model.get('gallery');
			this.collection.bind('destroy', this.destroy, this);
			Events.bind(Events.eventList.buildandprice.model.ShowArrowsEvent, this.enableNextPrevArrows, this);
			Events.bind(Events.eventList.buildandprice.model.HideArrowsEvent, this.disableNextPrevArrows, this);
			Events.bindOnce(Events.eventList.buildandprice.view.PageChangedEvent, this.displayGalleryMessage, this);
//			Events.bind(Events.eventList.buildandprice.view.PageChangedEvent, this.updateGalleryArrows, this);
		},
		
		displayGalleryMessage : function() {
			
			if (this.model.get('showArrows')) {
				views.Helper.displayGalleryCueMessage();
			}
		},

		enableNextPrevArrows: function() {
			//console.log('enableNextPrevArrows');
			$('#touchslider-prev').removeClass('hidden');
			$('#touchslider-next').removeClass('hidden');
		},

		disableNextPrevArrows: function() {
			//console.log('disableNextPrevArrows');
			$('#touchslider-prev').addClass('hidden');
			$('#touchslider-next').addClass('hidden');
		}

	});
	views.GalleryNavigateItem = Backbone.View.extend({
		className: 'touchslider-nav-item',
		
		tagName: 'span',
		
		render: function() {
//			console.log('GalleryNavigateItem.render() is visible? ' + this.model.get('slideNumber') + ' id:' + this.model.id);
//          console.log('index: ' + this.options.index + ', slideNumber: ' + this.options.slideNumber)
			$(this.el).toggleClass('touchslider-nav-item-current', this.options.index === this.options.slideNumber);
			return this;
		},

		initialize: function(options) {
			this.options = options;
			
//			this.model.bind('change:slideNumber', this.update, this);
//			this.model.bind('destroy', this.destroy, this);
		}
	});
	
	
	views.GalleryItem = Backbone.View.extend({
		className: 'touchslider-item',
		
		events : {
			'swiperight .touchslider-item' : 'prev',
			'swipeleft .touchslider-item' : 'next'
		},
		
		render: function() {
			//console.log('GalleryItem.render():' + this.model.id);
			var html = this.template(this.model.toJSON()),
				elmnt = $(this.el),
				isVisible = this.model.get('visible');
			//console.log('GalleryItem ' + this.model.id + ' is visible? ' + this.model.get('visible') );
			elmnt.toggleClass('hidden', !isVisible).html(html);
			
			var children = elmnt.children('.vehicle-sprite');
			if (this.model.get('layer') === 1) {
				children.css('opacity', 0);
				children.animate({opacity : 1}, 1200);
			} else {
				children.css('opacity', .4);
				children.animate({opacity : 1}, 800);
			}

			var numImages = this.model.get('numImages');
			
			// -- little ball under gallery --
			if (isVisible && numImages > 1) {	
				this.options.slideNavContainer.children().removeClass('hidden');
				this.options.slideNavContainer.empty();			
				for (var i = 0; i < numImages; i++) {
					this.options.slideNavContainer.append(new views.GalleryNavigateItem({index : i, slideNumber: this.model.get('slideNumber')}).render().$el);
				}
			} else {
				 this.options.slideNavContainer.children().addClass('hidden');
			}
		
			return this;
		},

		initialize: function(options) {
			this.options = options;
			this.template = _.template($('#mbp-gallery-image-item-template').html());
			this.model.bind('change', this.render, this);
			this.model.bind('destroy', this.destroy, this);
			this.next = $.proxy(options.next, options.parent);
			this.prev = $.proxy(options.prev, options.parent);
		}
	});

	views.Header = Backbone.View.extend({
		
		events: {
			'click #mbp-change-postcode' : 'changePostcode',
			'click #mbp-panel-link' : 'togglePanel'
		},
		
		changePostcode: function(e) {
			e.preventDefault();
//			Util.log('FOAPostcodeHeaderView.changePostcode');
			//Events.fireEvent(Events.eventList.buildandprice.view.RegionPostcodeChangeRequestEvent, true);

			Events.fireEvent(Events.eventList.buildandprice.view.ChangePostcodeOrPricezoneEvent);
		},
		
		togglePanel: function(e) {
			e.preventDefault();
			Events.fireEvent(Events.eventList.buildandprice.view.PanelToggleEvent, 'toggle');
		},
//		
		initialize: function() {
			this.model.bind('destroy', this.destroy, this);
//			this.model.bind('change', this.render, this);
			this.template = _.template($("#mpt-header-template").html());
		}
		
	});
	
	views.NameplateHeader = Backbone.View.extend({
		
		events: {
			'click #mbp-change-postcode' : 'changePostcode',
			'click #nameplate-panel-link' : 'togglePanel'
		},

		changePostcode: function(e) {
			e.preventDefault();
//			Util.log('FOAPostcodeHeaderView.changePostcode');
			//Events.fireEvent(Events.eventList.buildandprice.view.RegionPostcodeChangeRequestEvent, true);

			Events.fireEvent(Events.eventList.buildandprice.view.ChangePostcodeOrPricezoneEvent);
		},
		
		togglePanel: function(e) {
			e.preventDefault();
			Events.fireEvent(Events.eventList.buildandprice.view.PanelToggleEvent, 'toggle');
		},
		
		initialize: function() {
			this.model.bind('destroy', this.destroy, this);
			this.template = _.template($("#mpt-nameplate-header-template").html());
		}
		
	});
	
	views.Panel = Backbone.View.extend({

		id: 'mbp-panel',
		
		events : {
			'click .mpt-panel-item' : 'panelItemClicked'
		},
		
		initialize: function() {
			//console.log('initialize panel');
			this.template = _.template($("#mpt-panel-template").html());
			this.panelItemTemplate = _.template($("#mpt-panel-item-template").html());
			Events.bind(Events.eventList.buildandprice.view.PanelToggleEvent, this.togglePanel, this);
			//Events.bind(Events.eventList.buildandprice.view.PageChangedEvent, this.initPanel, this);
		},
		
		togglePanel: function(action) {
			$('#' + this.id).panel(action);
		},
		
		panelItemClicked: function(e) {
			var $target = $(e.currentTarget);
			
			if ($target.hasClass('disabled')) {
				e.preventDefault();
				
			} else if ($target.hasClass('cur')) {
				e.preventDefault();
				this.togglePanel('close');
			}
		},
		
//		initPanel: function() {
//			console.log('views.Panel: initPanel:' + this.id);
//			//$('#' + this.id).trigger('create');
//			$('#mbp-panel').panel();
//		},
		
		render: function() {
			var el = this.$el;
			el.attr({'data-role':'panel', 'data-position':'left', 'data-display': 'push'}).html(this.template());
			var $ul = el.find('ul');
			_.each(this.collection.models, function (header) {
				$ul.append(this.panelItemTemplate(header.toJSON()));
	        }, this);
//			console.log('rendering views.Panel: ' + this.id);
			
	        return this;
		}
	});
	
	views.NameplatePanel = views.Panel.extend({

		id: 'mbp-nameplate-panel',
		
		events: {
			'click .panel-link' : 'scrollToCategory'
		},
		
		scrollToCategory: function(e) {
			e.preventDefault();
			var href= $(e.currentTarget).attr('href');

			$('html, body').animate({
			    scrollTop: Math.min($(href).offset().top,$(document).height()-$(window).height())
			}, 500, 'linear', function() {
		    	Events.fireEvent(Events.eventList.buildandprice.view.PanelToggleEvent, 'close');
		    });
		},
		
		render: function() {
			var el = this.$el;
			el.attr({'data-role':'panel', 'data-position':'left', 'data-display': 'push'}).html(this.template());
			var $ul = el.find('ul');
			_.each(this.collection.models, function (vehicle) {
				$ul.append('<li data-iconshadow="false"><a class="panel-link" href="#nameplate-cat-' + vehicle.get('order') + '">' + vehicle.get('name') + '</a></li>');
	        }, this);
	        return this;
		}
	});
	
	views.Postcode = Backbone.View.extend({
		
		className: 'popup',
		
		id: 'postcode-popup',
		
		initialize: function() {
			this.template = _.template($("#mpt-postcode-template").html());
		},
		
		render: function() {
			this.$el.attr({'data-overlay-theme': 'a'}).html(this.template());
			return this;
		}
		
	});	
	
	views.Error = Backbone.View.extend({
		
		className: 'error',
		
		events: {
			'click #bp-start-over' : 'startOver',
			'click #bp-change-region' : 'changeRegionRequested'
		},
		
		startOver: function() {
			this.model.trigger(Events.eventList.buildandprice.view.StartOverEvent);
		},
		
		changeRegionRequested: function(e) {
			//this.model.trigger(Events.eventList.buildandprice.view.PricezoneChangeRequestEvent);
			e.preventDefault();
			Events.fireEvent(Events.eventList.buildandprice.view.ChangePostcodeOrPricezoneEvent);
		},
		
		initialize: function() {
			this.template = _.template($("#mpt-error-template").html());
		}
		
	});
	
	views.Page = Backbone.View.extend({
		
		 className: 'mbp',
		 
		 events: {
			'click #postcode-popup-link' : 'showPostcodePopup',
			'click #mbp-change-postcode' : 'updatePostcode',
			'click .back-button' : 'goBack'
		 },
		 
		 goBack : function(e) {
			 //console.log('goBack');
	         e.preventDefault();
	         
	         Events.fireEvent(Events.eventList.buildandprice.view.PrevPageRequestedEvent);
		     return false;
		 },
		 
		 showPostcodePopup: function(e) {
			 e.preventDefault();
			 var postcodeView = new views.Postcode({postcode: '3000'});
			 this.$el.append(postcodeView.render().$el);
			 $('#postcode-popup').popup().popup( 'open', {'corners': 'false', 'transition': 'slidedown', 'position-to': '#mbp'});
		 },
		 
		 updatePostcode: function(e){
			 e.preventDefault();
			 Events.fireEvent(Events.eventList.buildandprice.view.RegionPostcodeChangeRequestEvent, true);
		 },
		
		 initialize: function() {
			 this.template = _.template($("#mbp-page-template").html());
		 },
		 
		 render: function() {
			var html = this.template();
			this.$el.attr('data-role', 'page').html(html);
			return this;
		 }
	});
	

	views.Summary = Backbone.View.extend({
		
		children: [],
		
		events: {
			//'click .see-included' : 'seeWhatsIncluded',
			//'click #bp-save-as-pdf' : 'saveAsPDF',
			//'click #bp-share-config' : 'shareConfig',
			'click #bp-request-quote-btn' : 'requestAQuote',
			'click #bp-payment-presenter-btn' : 'presentPayment',
			'click #share-link' : 'shareConfig',
			'click #bp-postcode-overlay-warning-close' : 'closePostcodeWarningOverlay',
			'click #view-summary-disclaimer-link' : 'toggleSummaryDisclaimer'
		},
		
		closePostcodeWarningOverlay: function() {
			$('.disclaimerpanel').addClass('hidden');
		},
		
		seeWhatsIncluded: function(e) {
			e.preventDefault();
			views.Helper.openOverlay(e);
		},
		
		saveAsPDF: function(e) {
			e.preventDefault();
			this.model.trigger(Events.eventList.buildandprice.view.SaveAsPDFEvent);
		},
		
		requestAQuote : function(e) {
			e.preventDefault();
			this.model.trigger(Events.eventList.buildandprice.view.RequestAQuoteEvent, '#bp-request-quote-form');
		},

		presentPayment : function(e) {
			e.preventDefault();
			this.model.trigger(Events.eventList.buildandprice.view.PresentPaymentEvent, '#bp-request-quote-form');
		},

		shareConfig: function(e) {
			e.preventDefault();
			this.model.trigger(Events.eventList.buildandprice.view.ShareConfigEvent);
		},
		
		initialize: function() {
			this.template = _.template($('#mbp-summary-template').html());
			this.shareTemplate = _.template($('#mbp-share-template').html());
			this.model.bind('destroy', this.destroy, this);
			this.model.bind('change', this.render, this);
			Events.bind(Events.eventList.buildandprice.router.PDFReadyEvent, this.displayPDF, this);
			Events.bind(Events.eventList.buildandprice.router.ShareReadyEvent, this.displayShareOverlay, this);
		},
		
		displayShareOverlay: function(url) {
			//console.log('displayDialog: ' + url);
			//console.log('displayDialog encodedUrl: ' + encodeURIComponent(url));
			//views.Helper.injectContentOpenDialog($(this.shareTemplate({url : url, encodedUrl : encodeURIComponent(url)})));
			var $shareContent = $(this.shareTemplate({url : url, encodedUrl : encodeURIComponent(url)}));
			this.$el.append($shareContent);
			
			views.Helper.openShareOverlay('#share-popup');
			
			//select text on click
			$('#mbp-share-url').on('click', function() {
				$(this).select();
			});
			
			$('.bp-share-via').on('click', function(e) {
				var provider = $(this).attr('data-provider');
				Events.fireEvent(Events.eventList.buildandprice.view.ShareLinkClickedEvent, provider);
			});
		},
		
		toggleSummaryDisclaimer: function(e) {
			e.preventDefault();
			var $disclaimerDiv = $('#view-summary-disclaimer');
			$disclaimerDiv.toggleClass('hidden');
			var label = $disclaimerDiv.hasClass('hidden') ? Constants.bpt.showDisclaimer : Constants.bpt.hideDisclaimer;
			$('#view-summary-disclaimer-link > span > span').text(label);
		},
		
		render: function() {
			var el = this.$el;
			el.html(this.template(this.model.toJSON()));			
			var $summaryBreakdown = el.find('#summary-breakdown');
			this.children[0] = new views.PriceCategoryBreakdownList({collection: this.collection});
			$summaryBreakdown.empty().append(this.children[0].render().$el);
	        return this;
		}
		
	});
	
	views.PriceCategoryBreakdownList = Backbone.View.extend({
		
		children : [],
		
//		events: {
//			'click .toggle' : 'toggleBreakdown'
//		},
//		
//		toggleBreakdown : function(e) {
//			$(e.currentTarget).parents('li').toggleClass('collapsed');
//		},
//		
		initialize: function() {
			this.template = _.template($('#mbp-summary-price-breakdown-list-template').html());
			this.catTemplateItem = _.template($('#mbp-summary-category-list-item-template').html());
			this.templateItem = _.template($('#mbp-summary-price-breakdown-list-item-template').html());
			this.collection.bind('reset', this.destroy, this);
		},
		
		render: function() {
			var el = this.$el;
			el.html(this.template());
			var $collapsibleSet = el.find('#mbp-collapsible-set'),
			$breakdownItemEl;
			_.each(this.collection.models, function (summary) {
				$collapsibleSet.append(this.catTemplateItem(summary.toJSON()));
				$breakdownItemEl = $collapsibleSet.find('#summary-breakdown-item-' + summary.get('order'));
				
				//TODO: remove breakdown EL from document DOM and manipulate it...then reattach.
				_.each(summary.get('features').models,function(feature) {
//					console.log('appending feature to breakdownItemEl');
					$breakdownItemEl.append(this.templateItem(feature.toJSON()));
				}, this);
				
			}, this);

	        return this;
		}
	});
	
	views.Disclaimer = Backbone.View.extend({
		initialize: function() {
			this.template = _.template($("#mpt-disclaimer-template").html());
		},
		render: function() {
			this.$el.html(this.template());
			return this;
		}
	});

	views.PricezoneHeader=Backbone.View.extend({
		initialize:function(){
			this.template=_.template($("#mbp-pricezone-template").html());
		},
		sortOptions:function(ddlSelector){
			var options=$('option',ddlSelector).toArray();
			var firstOption=(options.length && !options[0].value)?options.shift():null;
			if(options.length){
				options=options.sort(function(a,b){
					//return a.text>b.text;
					if(a.text>b.text) return 1;
					return -1;
				});
				ddlSelector.empty();
				if(firstOption){
					ddlSelector.append(firstOption);
				}
				for(var i=0;i<options.length;i++){
					ddlSelector.append(options[i]);
				}
				$('option',ddlSelector)[0].selected=true;
			}

		},
		render:function(){
			//var $pricezoneContent=$(this.template());
			var self=this;
			var isStateCitySelector=self.isStateCitySelector;
			$('body #mbp-content').append($(self.template({isStateCitySelector:!!isStateCitySelector})));
			views.Helper.openShareOverlay('#pricezone-popup');

			var form=$('.ui-popup-active form#calc-pricezone-user');
			var selector;
			
			if(isStateCitySelector){
				var stateDDL=$('#bpt-state-selector',form),
					cityDDL=selector=$('#bpt-city-selector',form),
					txtSelectCity,
					selectedStateValue,
					selectedCityValue=self.model?self.model.id:null,
					stateCityData;
				cityDDL.selectmenu('disable');
				if(stateDDL.length && cityDDL.length && $('#state-city-json').length){
					stateCityData=$('#state-city-json').embeddedData();					
					for(var state in stateCityData){
						if(state){
							var option=$('<option></option>').val(state).text(state);
							stateDDL.append(option);
							if(selectedCityValue && !selectedStateValue){
								for(var i=0;i<stateCityData[state].length;i++){
									if(stateCityData[state][i].priceZoneId==selectedCityValue){
										selectedStateValue=state;
										break;
									}
								}
							}
						}
					}
					self.sortOptions(stateDDL);
					if($('option',cityDDL).length){
						txtSelectCity=$('option',cityDDL)[0].text;
					}
					if(selectedStateValue){
						stateDDL.val(selectedStateValue);
						cityDDL.empty();
						if(txtSelectCity){
							cityDDL.append($('<option></option>').val('').text(txtSelectCity));
						}
						for(var i=0;i<stateCityData[selectedStateValue].length;i++){
							var city=stateCityData[selectedStateValue][i];
							if(city){
								var option=$('<option></option>').val(city.priceZoneId).text(city.city);
								cityDDL.append(option);
							}
						}
						self.sortOptions(cityDDL);
						cityDDL.val(selectedCityValue);
						cityDDL.selectmenu('enable');
						stateDDL.selectmenu('refresh');
						cityDDL.selectmenu('refresh');
					}					
					stateDDL.on('change',function(){
						cityDDL.empty();
						if(txtSelectCity.length){
							cityDDL.append($('<option></option>').val('').text(txtSelectCity));
						}
						if(stateDDL.val()){							
							var cities=stateCityData[stateDDL.val()];
							for(var i=0;i<cities.length;i++){
								var city=cities[i];
								if(city){
									var option=$('<option></option>').val(city.priceZoneId).text(city.city);
									cityDDL.append(option);
								}
							}
							self.sortOptions(cityDDL);
							cityDDL.selectmenu('enable');							
						}
						else{
							cityDDL.selectmenu('disable');
						}
						cityDDL.selectmenu('refresh');
					});

				}
			}
			else{
				selector=$('#bpt-pricezone-selector',form);			
			if(self.model){
				selector.val(self.model.id);
				
				$.each(selector[0].options,function(i,opt){
					if(opt.value==self.model.id){
						$('span.ui-btn-text span',form).html(opt.text);
					}
				});
			}
			}

			form.submit(function(e){
				e.preventDefault();
				if(selector.val() && selector.val().length>0){
					$('.error',form).hide();
					Events.fireEvent(Events.eventList.buildandprice.model.PricezoneSelectedEvent.name,selector.val());
					$.publish('overlay.usercancel');
				}
				else{
					$('.error',form).text($('#standard-error', form).text());
					$('.error',form).filter(':hidden').slideDown('fast');
				}
				
			});

			
		}
	});
	
	views.Helper = {
		openOverlay: function(e) {
			e.preventDefault();
			var url = e.currentTarget.href;
			//console.log('views.Helper.openOverlay: ' + url);
			$.publish('overlay.launch', {
				url: url,
				name: 'bpt-package-whats-included',
				success: function(){
					if($('.ui-popup-container.ui-popup-active').height()>$(window).height()){
						$(window).scrollTop($('.ui-popup-container.ui-popup-active').offset().top);
					}
				}
			});
			
			this.updateOverlay();

		},
		
		openShareOverlay : function(contentId) {
			$.publish('overlay.launch', {
				contentId: contentId,
				url : undefined,
				name: 'bpt-share',
				success: function(){
					if($('.ui-popup-container.ui-popup-active').height()>$(window).height()){
						$(window).scrollTop($('.ui-popup-container.ui-popup-active').offset().top);
					}
				}
			});

			this.updateOverlay();

		},

		updateOverlay:function(){
			var $container=$('.ui-popup-screen.in');
			var $popup=$('.ui-popup-container.ui-popup-active');
			$.mobile.window.on('orientationchange',function(){
				if($('.ui-popup-screen.in').length<1 || $('.ui-popup-container.ui-popup-active').length<1){
					return;
				}
				setTimeout(function(){
					$.mobile.activePage.css('height','auto');
					//$popup.css('top','0px');
					$(window).scrollTop($('.ui-popup-container.ui-popup-active').offset().top);
					if($.mobile.activePage.height() < $('.ui-popup-screen.in').height()){
						$.mobile.activePage.css('height',$('.ui-popup-screen.in').height());
					}
				},500);				
			});
			if($.mobile.activePage.height() < $container.height()){
				$.mobile.activePage.css('height',$container.height());
			}
			$container.on('click',function(e){
				e.preventDefault();
				$.mobile.window.off('orientationchange');
				$.mobile.activePage.css('height','auto');
			});
			$('.cancel',$popup).on('click',function(e){
				e.preventDefault();
				$.mobile.window.off('orientationchange');
				$.mobile.activePage.css('height','auto');
			});
		},
		
		displayGalleryCueMessage: function() {
			
			var $rotateDiv = $('#bp-rotate-msg');
			if ($rotateDiv.length > 0) {
				//console.log('displayGalleryCueMessage');
				$rotateDiv.fadeIn('fast').delay(1500).fadeOut(1000, function() {
					$rotateDiv.addClass('hidden');
				});
			}
		}
	};
	
	
	
	
	views.MasterView = function() {
		var self = this,
		view = null,
		current = null,
		next = null,
		askForPostcode = false,
		hidePrices = false,
		showPricesLater = false,
		disclaimerView;
		var init = function() {
			resetNext();
//			Events.bind(Events.eventList.buildandprice.ChangePageEvent, this.changePage, this);
			Events.bind(Events.eventList.buildandprice.router.BlockUIEvent, blockUI, self);
			Events.bind(Events.eventList.buildandprice.router.UnblockUIEvent, unblockUI, self);
			Events.bind(Events.eventList.buildandprice.router.HidePricesEvent, hideShowPrices, self);
			Events.bind(Events.eventList.buildandprice.router.AskForPostcodeEvent, setAskForPostcode, self);
			Events.bind(Events.eventList.buildandprice.router.ShowPricesLaterEvent, setShowPricesLater, self);
			disclaimerView = new views.Disclaimer({model : {}});
		};
		
		var resetNext = function() {
			next = { contents : [], header: null, panel: null, page : null};
		};
			
		var blockUI = function() {
			// Show's the jQuery Mobile loading icon
			//console.log(' $.mobile.loading( \'show\' )');
	        $.mobile.loading( 'show' );
		};
		
		var unblockUI = function() {
			//console.log(' $.mobile.loading( \'hide\' )');
			$.mobile.loading( 'hide' );
		};
		
		var error = function(model) {
			next.contents = [new views.Error({model: model})];
			return this;
		};
	
	    var nameplates = function(collection) {
			next.contents = [new views.NameplateCategoryList({collection: collection})];
			return this;
		};
		
		var derivatives = function(collection, hotDeal) {
			// console.log('derivatives');
			next.contents = [new views.DerivativeList({collection: collection})];
			if (hotDeal != null) {
				next.contents.push(new views.HotDeal({model: hotDeal}));
			}
			return this;
		};

		var packages = function(collection) {
			next.contents = [new views.PackageList({collection: collection})];
			return this;
		};		
		
		var engines = function(name, thumbnail, collection, hotDeal) {
			//console.log('engines');
			next.contents = [new views.EngineTransmissionList({collection: collection, 
															 derivativeName : name, 
															 derivativeThumbnail : thumbnail})];
			if (hotDeal != null) {
				next.contents.push(new views.HotDeal({model: hotDeal}));
			}
			return this;
		};
		
		var colors = function(colorCollection, trimCollection, galleryModel, hotDeal) {

			next.contents = 
				[ new views.Gallery({model: galleryModel}),
				  new views.ColorList({collection: colorCollection}),
				  new views.TrimList({collection: trimCollection})
				];
			if (hotDeal != null) {
				next.contents.push(new views.HotDeal({model: hotDeal}));
			}
			return this;
		};
		
		var accessories = function(categoryModel, galleryModel, hotDeal) {
			//console.log('accessories');
			next.contents = 
				[ new views.Gallery({model: galleryModel}),
				  new views.FeatureList({model: categoryModel})
				];
			if (hotDeal != null) {
				next.contents.push(new views.HotDeal({model: hotDeal}));
			}
			return this;
		};
		
		var trims = function(trimCollection) {
			//console.log('update trims');
			var child = new views.TrimList({collection: trimCollection});
			current.contents[2].$el.replaceWith(child.render().$el);
			current.contents[2] = child;
			
//			current.contents.renderChild('trims',);
			return this;
		};
		
		var setAskForPostcode = function(value) {
			askForPostcode = value;
		};
		
		var hideShowPrices = function(show) {
			//console.log('hideShowPrices: show=' + show);
			//cannot just set this class here...need to apply it on every page
			$('#mbp-content').toggleClass('bp-hide-prices', show);
			hidePrices = show;
		};
		
		var setShowPricesLater = function() {
			showPricesLater = true;
			Events.unbind(Events.eventList.buildandprice.router.ShowPricesLaterEvent,this);
		};
		
		var paths = function(collection) {
			next.contents = [new views.PathList({collection: collection})];
			return this;
		};
		
		var summary = function(summaryModel, priceBreakdownCollection, galleryModel, hotDeal) {
			next.contents = [new views.Gallery({model: galleryModel}),
			                 new views.Summary({model: summaryModel, collection: priceBreakdownCollection})
			                 ];
			if (hotDeal != null) {
				next.contents.push(new views.HotDeal({model: hotDeal}));
			}
			return this;
		};
		
		var header = function(model) {
			next.header = new views.Header({model: model});
			return this;
		};
		
		var nameplateHeader = function(model) {
			next.header = new views.NameplateHeader({model: model});
			return this;
		};
		
		var page = function() {
			next.page = new views.Page();
			return this;
		};
		
		var panel = function(collection) {
			next.panel = new views.Panel({collection: collection});
			return this;
		};
		
		var nameplatePanel = function(collection) {
			next.panel = new views.NameplatePanel({collection: collection});
			return this;
		};

		var go = function() {
			
			
			//TODO: do a view clean up
			if (current == null) {
				//TODO: do a comparison of some sort to see if header/navigation has changed
				current = next;
				resetNext();
				//console.log('current is null');
			} else {
				current.page = next.page;
				if (next.panel != null) {
					//console.log('destroying the old panel');
					if (current.panel != null) {
						current.panel.destroy();
					}
					current.panel = next.panel;
				}
				if (next.header != null) {
					//console.log('destroying the old header');
					if (current.header != null) {
						current.header.destroy();
					}
					current.header = next.header;
				}
				current.contents = next.contents || [];
				//console.log('current is not null');
			}
			current.contents.push(disclaimerView);
			changePage(current);
			

			if (askForPostcode === true) {
				//console.log('firing RegionPostcodeChangeRequestEvent');
				Events.fireEvent(Events.eventList.buildandprice.view.RegionPostcodeChangeRequestEvent, true);
				askForPostcode = false;
			} 
		};
		
		var changePage = function (pageElemens) {
			
			var pageContents = pageElemens.contents,
			header = pageElemens.header,
			panel = pageElemens.panel,
			page = pageElemens.page,
			$page = page.render().$el,
			$mbpContent = $page.find('#mbp-content').toggleClass('bp-hide-prices', hidePrices);
	        if (header != null) {
	        	 //console.log('adding header');
	        	 $mbpContent.prepend(header.render().$el);
//	        	 $('body').prepend(header.render().$el);
	        }
	        for (var i = 0; i < pageContents.length; i++) {
	        	$mbpContent.append(pageContents[i].render().$el);
	        }
	        if (panel != null) {
	        	//console.log('adding panel');
	        	panel.render().$el.insertAfter($mbpContent);
	        }
	        
	        
	        $('body').append($page);
	        
//	        $('body').append($page);
	       
//	        var transition = $.mobile.defaultPageTransition;
	        // We don't want to slide the first page
//		        if (firstPage) {
//		            transition = 'none';
//		            firstPage = false;
//		        }
	        //console.log('current is null ? ' +  (current == null));
	        
	        $.mobile.changePage($page, { changeHash: false });
	        
	        //fire an event...in case any views need to do any initialization
	        Events.fireEvent(Events.eventList.buildandprice.view.PageChangedEvent);
	    };

	    var showPricezone=function(curPricezone,isStateCitySelector){
	    	var overlay=new views.PricezoneHeader({model:curPricezone});
	    	overlay.isStateCitySelector=!!isStateCitySelector;
	    	overlay.render();
	    };

		init();
		
		return {
			header: header,
			nameplateHeader: nameplateHeader,
			panel: panel,
			nameplatePanel: nameplatePanel,
			paths: paths,
			page: page,
			error : error,
			nameplates: nameplates,
			derivatives: derivatives,
			packages: packages,
			trims:trims,
			accessories: accessories,
			engines: engines,
			colors: colors,
			summary: summary,
			go: go,
			showPricezone:showPricezone
		};
		
	};
	
	return views;
})(window, document, jQuery);


/**
 * global self executing function
 * 
 * @author Sohrab Zabetian 
 */

var models = (function(window, document, $, Backbone, undefined) {	
	/*******************************MODELS**************************************/
	var models = {};
	
	models.UserPref = Backbone.Model.extend({
		modelObject: null,
		derivativeObject: null,
		packageObject: null,
		colourObject: null,
		trimObject: null,
		engineObject: null,
		featuresObject: null,
		defaults : {
			site: '',
			priceZoneId: '',
			postcode: '',
			polkPrice: null,
			unformattedPolkPrice: null,
			usage: '',
			usageLabel: '',
			features: new Array()
		},
		
		modelId: null,
		derivativeId: null,
		packageId: null,
		tempPostcode: null,
		tempUsage: null,
		colourId: null,
		trimId: null,
		engineId: null,
		
		initialize: function() {
			Events.bind(Events.eventList.buildandprice.model.RegionPostcodeChangedEvent, this.setRegionDetails, this);
		},
		
		purge: function() {
			this.set({
				packageObject: undefined,
				derivativeObject : undefined,
				engineObject : null,
				colourObject: null,
				trimObject: null,
				featuresObject: new collections.FeatureCollection(),
				packageId: undefined,
				derivativeId : undefined,
				polkPrice: null,
				unformattedPolkPrice: null,
				engineId:null,
				colourId:null,
				trimId: null,
				features: new Array()
			});
		},
		
		setRegionDetails: function(result) {
			//console.log('setRegionDetails: ' + result.postcode);
			this.set({postcode: result.postcode, usage: result.usage, usageLabel: result.usageLabel});
		},
		
			
		total : function() {
			var total = 0;
			
			var inclusionList = new Array('packageObject','colourObject','trimObject','engineObject');
			
			_.each(inclusionList, function(item) {
				//we do not want to include the model price:
				var value = this.get(item);
				if (value && value != null) {
					total += parseFloat(value.get('price'));
//					console.log(item + ' has price ' + value.get('price'));
				}
			}, this);
			
			_.each(this.get('featuresObject').models, function(feature) {
				total += parseFloat(feature.get('price'));
//				console.log('feature ' + feature.get('name') + ' has price ' + feature.get('price'));
			});
			
//			console.log('total Price is ' + total + ', formatted price is ' + ND.PriceFormatter.format(total.toString()));
			return total;
		},
		
		/**
		 * Total result to be sent to polk:
		 * 
		 * engine price + color + trim + all accessories of featureType != 'Accessory'
		 */
		totalOptionsForPOLK : function() {
			var total = 0;
			var inclusionList = new Array('colourObject', 'trimObject');
			_.each(inclusionList, function(key) {
				var value = this.get(key);
				if (value && value != null) {
					total += parseFloat(value.get('price'));
//					console.log(key + ' has price ' + value.get('price'));
				}
			}, this);
			
			_.each(this.get('featuresObject').models, function(feature) {
				if (feature.get('featuretype') !== 'Accessory') {
					total += parseFloat(feature.get('price'));
//					console.log('feature ' + feature.get('name') + ' has price ' + feature.get('price'));
				}
			});
//			console.log('totalOptionsForPOLK Price is ' + total + ', formatted price is ' + ND.PriceFormatter.format(total.toString()));
			return total;
		},
		
		/**
		 * Result from POLK rest call + featureType === 'Accessory'
		 */
		totalWithPOLK: function(polkPrice) {
			var total = parseFloat(polkPrice);
			_.each(this.get('featuresObject').models, function(feature) {
				if (feature.get('featuretype') === 'Accessory') {
					total += parseFloat(feature.get('price'));
//					console.log('feature ' + feature.get('name') + ' has price ' + feature.get('price'));
				}
			});
//			console.log('totalWithPOLK Price is ' + total + ', formatted price is ' + ND.PriceFormatter.format(total.toString()));
			return total;
		},
		/**
		 * Override toJSON to pass the essential attributes to the server only.
		 */
		toJSON: function() {
			var inclusionList = new Array('modelId',
			 					'derivativeId',
			 					'packageId',
			 					'colourId',
			 					'postcode',
			 					'usage',
			 					'priceZoneId',
			 					'site',
			 					'trimId',
			 					'engineId',
			 					'features');
			var json = {};
			_.each(inclusionList, function(attr) {
				json[attr] = this.get(attr);
			},this);
			return json;
		},
		urlRoot: Config.buildandprice.urls.shareURL
	});
	
	models.ErrorModel = Backbone.Model.extend({
		title:null,
		message: null,
		defaults : {
			showPricezone: true
		},
		initialize : function() {
			Events.bindToEvent(this, Events.eventList.buildandprice.view.StartOverEvent,
					Events.eventList.buildandprice.model.StartOverEvent.name, this);
			Events.bindToEvent(this, Events.eventList.buildandprice.view.PricezoneChangeRequestEvent,
					Events.eventList.buildandprice.model.PricezoneChangeRequestEvent.name, this);
		}
	});
	
	models.PageTitleModel = Backbone.Model.extend({
		title : '',
		defaults : {
			showLatestOffersBtn: false
		}
	});
	
	models.PriceZoneModel = Backbone.Model.extend({
		id:null,
		name: null,
		priceFormat: null,
		defaults: {
			decimalSeparator: ',',
	        monetaryDecimalSeparator: ',',
	        groupingSeparator: ',',
			'default': false,
			pricesDisabled: false,
			selected : false
		}
	});
	
	
	models.DerivativeModel = Backbone.Model.extend({
		id:null,
		name:'bp-derivative',
		modelCode: null,
		priceZoneId: null,
		nameAuthoring: null,
		derivativeURL : null, //for mobile 
		defaults: {
			thumbnailURL:'',
			imageURL:'',
			midResURL: '',//for mobile 
			engines: null,
			displayPrice: 0,
			order: 0,
			price : 0,
			selected : false,
			hotDealUrl: '#'
		},
		
		initialize : function() {
			Events.bindToEvent(this, Events.eventList.buildandprice.view.DerivativeSelectedEvent,
					Events.eventList.buildandprice.model.DerivativeSelectedEvent.name, this);
		}
	});
	
	models.PackageModel = models.DerivativeModel.extend({
		name:'bp-package',
		engineTransmission: null,
		engineId: null,
		initialize : function() {
			Events.bindToEvent(this, Events.eventList.buildandprice.view.PackageSelectedEvent, 
					Events.eventList.buildandprice.model.PackageSelectedEvent.name, this);
		}
	});
	
	models.Nameplate = Backbone.Model.extend({
		category:null,
		id:null,
		imageURL:null ,
		modelCode:null, 
		name:null, 
		nameplateURL : null,
		byoImageURL: null,
		modelYear: null,
		defaults: {
			makeCode : '',
			order: 0, 
			makeId : '',
			makeName : 'Ford',
			displayPrice : 0,
			thumbnailURL:'',
			pkgImageURL: '',
			hotDealUrl: null,
			hotDealSmobUrl: null,
			analyticsCategory: '',
			analyticsName: '',
			price:0,
			selected : false
		},
		
		initialize : function() {
			Events.bindToEvent(this, Events.eventList.buildandprice.view.ModelSelectedEvent, 
					Events.eventList.buildandprice.model.ModelSelectedEvent.name, this);
			this.set('nameplateURL', this.get('id'));
		}
		
	});
	
	models.NameplateCategory = Backbone.Model.extend({
		name: null,
		defaults : {
			order: 0,
			selected : false
		}
	});
	
	models.PathModel = Backbone.Model.extend({
		name : null,
		title: null,
		instruction: null,
		imageURL : null,
		pathURL : null,
		key : null,
		defaults : {
			selected : false
		},
		
		initialize : function() {
			Events.bindToEvent(this, Events.eventList.buildandprice.view.PathSelectedEvent, 
					Events.eventList.buildandprice.model.PathSelectedEvent.name, this);
		}
	});
	
	models.FeatureModel = Backbone.Model.extend({
		accessoryId:null,
	 	bpdisplayorder:null,
		bpvalue:null,
		compdisplayorder:null,
		featureImage:null,
		featuretype:null,
		groupType:null,
		name:null,
		partNumber:null,
		derivativeId: null,
		pricezoneId: null,
		featureGroupAttributes: null,
		dependentFeaturesIds: null,
		defaults :{
			price:0,
			displayPrice: 0,
			numImages: 4,
			featureDetailUrl: Config.featureDetailUrl,
			thumbnailUrl: '',
			disabled: false,
			/*
			 * An accessory could be a dependentFeature of other accessories.
			 * In cases where two accessories have overlapping dependentFeatures,
			 * we need to impose a lock on the accessory, to track how many other accessories
			 * have selected this accessory as a dependent feature. Primarily used to track
			 * whether an accessory should be enabled or disabled (only when it's a dependentFeature)
			 */
			dependentFeatureLockCount: 0,
			note:null,
			className: null,
			isOptionPack : false,
			isMutuallyExclusive: false,
			hasDependentFeatures: false, 
			spriteUrl : '',
			spriteMidResUrl: '', //for mobile
			message : '',
			selected : false
		},
		
		initialize : function() {
			Events.bindToEvent(this, Events.eventList.buildandprice.view.FeatureSelectedEvent, 
					Events.eventList.buildandprice.model.FeatureSelectedEvent.name);
		},
		
		/**
		 * Parse the response and convert nested featureGroupAttributes JSON response into GeatureGroupAttributes Backbone objects
		 */
		parse : function(response, xhr) {
			for(var key in this) {
				if (key === 'featureGroupAttributes' ) {
					var embeddedClass = new collections.FeatureGroupAttributeCollection();
		            var embeddedData = response[key];
		            if (embeddedData !== undefined) {
		            	embeddedClass.add(embeddedData, {parse:true});
		            }
		            response[key] = embeddedClass;
				}
			}
			return response;
		}
		

	});
	
	models.CategoryGroupModel = Backbone.Model.extend({
		name:null,
		categories : null,
		order : null,
		
		defaults : {
			containsFeatureGroup: false,
			categoryGrouping: '',
			analyticsName: null,
			analyticsStep: null,
			selected : false
		},
		/**
		 * Parse the response and convert nested feature JSON response into Feature Backbone objects
		 */
		parse : function(response, xhr) {
			for(var key in this) {
				if (key === 'categories' ) {
					var embeddedClass = new collections.CategoryCollection();
		            var embeddedData = response[key];
		            if (embeddedData !== undefined) {
		            	embeddedClass.add(embeddedData, {parse:true});
		            }
		            response[key] = embeddedClass;
				}
			}
			return response;
		}
		
	});
	
	models.SortDirModel = Backbone.Model.extend({
		defaults: { 
			name: '',
			price: ''
		}
	});
	
	
	models.CategoryModel = Backbone.Model.extend({
		id: null,
		name:null,
		derivativeId: null,
		pageURL:null, //for mobile
		className : function() {
			return this.get('name').replace(' ', '-');
		},
		features: null,
		defaults: {
			sortDir: new models.SortDirModel(),
			selected : false,
			order:0,
			ASC : 1,
			DESC : -1,
			analyticsName: null,
			analyticsStep: null
		},
		
		initialize: function() {
			this.bind(Events.eventList.buildandprice.view.SortFeaturesByPriceEvent, this.sortByPrice, this);
			this.bind(Events.eventList.buildandprice.view.SortFeaturesByNameEvent, this.sortByName, this);
		},
		
		sortByPrice: function() {
			
			var sortDir = this.get('sortDir');
			var dir = sortDir.get('price');
			var priceSortDir = this.get('DESC');
			if (dir === '' || dir === 'sortdesc') {
				priceSortDir = this.get('ASC');
			} 
			//Util.log('CategoryModel.sortyByPrice: ' + dir);
			sortDir.set('price',this.getSortDir(priceSortDir));
			sortDir.set('name','');
			this.get('features').sortByPrice(priceSortDir);
		},
		
		sortByName: function() {
			var sortDir = this.get('sortDir');
			var dir = sortDir.get('name');
			var nameSortDir = this.get('DESC');
			if (dir === '' || dir === 'sortdesc') {
				nameSortDir = this.get('ASC');
			} 
			//Util.log('CategoryModel.sortyByName: ' +  dir);
			sortDir.set('name',this.getSortDir(nameSortDir));
			sortDir.set('price','');
			this.get('features').sortByName(nameSortDir);
		},
		
		getSortDir: function(dir) {
			if (dir ===  this.get('ASC')){
				return 'sortasc';
			} 
			return 'sortdesc';
		},
		
		/**
		 * Parse the response and convert nested feature JSON response into Feature Backbone objects
		 */
		parse : function(response, xhr) { 
			for(var key in this) {
				if (key == 'features' ) {
					var embeddedClass = new collections.FeatureCollection();
		            var embeddedData = response[key];
		            if (embeddedData !== undefined) {
		            	embeddedClass.add(embeddedData, {parse:true});
		            }
		            response[key] = embeddedClass;
				}
			}
			return response;
		}
		
		
	});

	models.TrimModel = Backbone.Model.extend({
		imageURL:null,
		bpvalue:null,
		note:null,
		name:null,
		id:null,
		
		defaults: {
			spriteUrl:'',
			thumbnailUrl:'',
			price:0,
			displayPrice: 0,
			order:1,
			numImages: 1,
			selected : false,
			isColour: false //used for price suffix
		},
		initialize: function() {
			Events.bindToEvent(this, Events.eventList.buildandprice.view.TrimSelectedEvent, Events.eventList.buildandprice.model.TrimSelectedEvent.name, this);
		}
	});



	models.ColorModel = Backbone.Model.extend({
		bpvalue:null ,
		id:null ,
		majorValue:null ,
		name:null ,
		note:null,
		trims: null,
		
		defaults: {
			numImages: 1,
			spriteUrl:'',
			thumbnailUrl:'',
			order:1,
			spriteMidResUrl: '',
			price:0,
			displayPrice: 0,
			selected : false,
			isColour: true //used for price suffix
		},
		
		/**
		 * Parse the response and convert nested trims JSON response into Trim Backbone objects
		 */
		parse : function(response, xhr) {
			for(var key in this) {
				if (key == 'trims' ) {
					var embeddedClass = new collections.TrimCollection();
		            var embeddedData = response[key];
		            if (embeddedData !== undefined) {
		            	embeddedClass.add(embeddedData, {parse:true});
		            }
		            response[key] = embeddedClass;
				}
			}
			return response;
		}, 
		
		initialize : function() {
			Events.bindToEvent(this, Events.eventList.buildandprice.view.ColorChangedEvent,Events.eventList.buildandprice.model.ColorChangedEvent.name, this);
		}
		
	});

	models.FeatureGroupAttribute = Backbone.Model.extend({
		featureName:null,
		categoryName:null,
		id:null
	});

	models.EngineTransmission = Backbone.Model.extend({
		bpdisplayorder:null,
		bpvalue:null,
		compdisplayorder:null,
		compvalue:null,
		detailpageid:null,
		featureContent:null,
		featureImage:null,
		featuretype:null,
		groupType:null,
		id:null,
		multiResImage:null,
		name:null,
		note:null,
		partNumber:null,
		specdisplayorder:null,
		specvalue:null,
		toolsdisplayflag:null,
		
		defaults: {
			price:0,
			priceDiff:0,
			displayPrice: 0,
			hotDealUrl: '#', //for mobile
			selected : false
		},
		
		initialize : function() {
			Events.bindToEvent(this, Events.eventList.buildandprice.view.EngineTrasmissionSelectedEvent,
					Events.eventList.buildandprice.model.EngineTrasmissionSelectedEvent.name, this);
		}

	});

	models.HeaderModel = Backbone.Model.extend({
		order: null,
		heading : null,
		step : null,
		headerURL : null,
		derivativeName: null,
		state : null,
		postcode : null,
		usageLabel: null,
		defaults : {
			showPricezoneSelect: true,
			enabled: false,
			isCurrent : false,
			visited: false
		},
		
		initialize: function() {
			Events.bind(Events.eventList.buildandprice.router.UpdatePricezoneEvent, this.updatePostcode, this);
			Events.bind(Events.eventList.buildandprice.model.RegionPostcodeChangedEvent, this.regionPostcodeChanged, this);
			Events.bindToEvent(this, Events.eventList.buildandprice.view.PricezoneChangeRequestEvent,
									 Events.eventList.buildandprice.model.PricezoneChangeRequestEvent.name, this);
			this.bind(Events.eventList.buildandprice.view.StepChangeRequestEvent, this.stepChangeRequest, this);
			Events.bindToEvent(this, Events.eventList.buildandprice.view.StepChangeHeaderRequestEvent, 
									 Events.eventList.buildandprice.model.StepChangeHeaderRequestEvent.name, this);
		},
		
		updatePostcode : function(postcode) {
//			console.log('updatePostcode is actually being used!!! Remove this console.log');
			this.set('postcode', postcode);
		},
		
		regionPostcodeChanged: function(result) {
//			//Util.log('regionPostcodeChanged');
			if (result) {
				this.set({'postcode' : result.postcode, 'usage' : result.usage, 'usageLabel' : result.usageLabel});
			} else {
				this.set({'postcode' : '', 'usage' : '', 'usageLabel' : ''});
			}
		},
		
		stepChangeRequest : function(href) {
			Events.fireEvent(Events.eventList.buildandprice.model.StepChangeRequestEvent.name, href);
		}
		
	});
	
	models.MobileHeaderModel = Backbone.Model.extend({
		heading : null,
		step : null,
		nameplate : null,
		totalSteps : null,
		postcode : null,
		usageLabel: null,
		defaults : {
			showPricezoneSelect: true
		},
		
		initialize: function() {
			Events.bind(Events.eventList.buildandprice.router.UpdatePricezoneEvent, this.updatePostcode, this);
			Events.bind(Events.eventList.buildandprice.model.RegionPostcodeChangedEvent, this.regionPostcodeChanged, this);
			Events.bindToEvent(this, Events.eventList.buildandprice.view.PricezoneChangeRequestEvent, 
									 Events.eventList.buildandprice.model.PricezoneChangeRequestEvent.name, this);
		},
		
		updatePostcode : function(postcode) {
//			console.log('updatePostcode is actually being used!!! Remove this console.log');
			this.set('postcode', postcode);
		},
		
		regionPostcodeChanged: function(result) {
//			//Util.log('regionPostcodeChanged');
			if (result) {
				this.set({'postcode' : result.postcode, 'usage' : result.usage, 'usageLabel' : result.usageLabel});
			} else {
				this.set({'postcode' : '', 'usage' : '', 'usageLabel' : ''});
			}
		}
		
	});

	models.FooterModel = Backbone.Model.extend({
		defaults : {
			price: 0.0,
			priceZoneId: null,
			derivativeName: '',
			engine : '',
			transmission: '',
			nextButtonText: '',
			nextButtonURL: '',
			prevButtonText: '',
			prevButtonURL: '',
			prevEnabled: false,
			nextEnabled: false,
			vehicleThumbnailUrl: '',
			hasError: false,
			isPackage: false,
			postcodeHint: null,
			currentDate :  (function() {
				var d = new Date();
			    var date = d.getDate();
			    var month = d.getMonth() + 1; //Months are zero based
			    var year = d.getFullYear();
			    
			    return date + '/' + month + '/' + year;
			})()

		},
		
		initialize: function() {
			Events.bindToEvent(this, Events.eventList.buildandprice.view.SaveAsPDFEvent, Events.eventList.buildandprice.model.SaveAsPDFEvent.name);
			Events.bindToEvent(this, Events.eventList.buildandprice.view.ShareConfigEvent, Events.eventList.buildandprice.model.ShareConfigEvent.name);
			this.bind(Events.eventList.buildandprice.view.TabChangeRequestEvent, this.tabChangeRequested, this);
			this.bind(Events.eventList.buildandprice.view.StepChangeRequestEvent, this.stepChangeRequest, this);
			Events.bindToEvent(this, Events.eventList.buildandprice.view.RequestAQuoteEvent, Events.eventList.buildandprice.model.RequestAQuoteEvent.name);
			if(typeof Events.eventList.buildandprice.model.PresentPaymentEvent !== "undefined"){
				Events.bindToEvent(this, Events.eventList.buildandprice.view.PresentPaymentEvent, Events.eventList.buildandprice.model.PresentPaymentEvent.name);
			}
		},
		
		tabChangeRequested : function(order) {
			Events.fireEvent(Events.eventList.buildandprice.model.TabChangeRequestEvent.name, order);
		},
		
		stepChangeRequest : function(href) {
			Events.fireEvent(Events.eventList.buildandprice.model.StepChangeRequestEvent.name, href);
		},
		
		update : function(derivativeName, price, engine, nextEnabled, nextBtnURL, prevBtnURL, nextBtnText, prevBtnText) {
			this.set({'derivativeName': derivativeName,
					  'price': price, 
					  'engine': engine, 
					  'nextEnabled': nextEnabled,
					  'nextButtonURL': nextBtnURL,
					  'prevButtonURL': prevBtnURL});
			
			if (nextBtnText && nextBtnText != null) {
				this.set('nextButtonText', nextBtnText);
			}
			
			if (prevBtnText && prevBtnText != null) {
				this.set('prevButtonText', prevBtnText);
			}
		},
		
		setNextButton : function(url, name) {
			if (url == '') {
				this.set('nextEnabled', false);
			}
			this.set('nextButtonURL', url);
			this.set('nextButtonText', name);
		},
		
		setPrevButton : function(url, name) {
			if (url == '') {
				this.set('nextPrev', false);
			}
			this.set('prevButtonURL', url);
			if (name) {
				this.set('prevButtonText', name);
			}
		}
		
	});

	models.DerivativeDetailModel = Backbone.Model.extend({
		id:null,
		imageURL:null ,
		derivativeName:null, 
		engineTransmission:null,
		name: null,
		summary: null,
		thumbnailURL:null,
		currentCategory : 0,
		defaults : {
			price:0,
			order:0,
			showVehicleDisclaimer: false,
			derivativeCode:'', 
			hasNext: true,
			hasPrev : false,
			view : 'exterior'
		},
		
		initialize: function() {
			this.currentCategory = 0;
			this.url = this.urlRoot + this.get('id');
//			console.log('DerivativeDetailModel.url ' + this.url);
//			this.bind(Events.eventList.buildandprice.view.ToggleViewEvent, this.toggleView, this);
			Events.bindToEvent(this, Events.eventList.buildandprice.view.ToggleViewEvent, Events.eventList.buildandprice.model.ToggleViewEvent.name);
			Events.bindToEvent(this, Events.eventList.buildandprice.view.TabChangedEvent, Events.eventList.buildandprice.model.TabChangedEvent.name);
		},
		
		
//		toggleView : function(view) {
//			this.set('view', view);
//			Events.fireEvent(Events.eventList.buildandprice.model.ToggleViewEvent.name, view);
//		},
		
		
		urlRoot : Config.buildandprice.urls.derivativeDetailURL
		

	});

	models.GalleryModel = Backbone.Model.extend({
		imageURL : null,
		className: '',
		defaults : {
			visible : false,
			layer : 0,
			slideHeight: 292, // our single page height
			slideWidth:615, // our single page width
			slideYpos: 0, // current Y position of our bg-image (in both pages)
			numImages: 1,
			zIndex: 1,
			spriteLength: 615
		}
		
	});
	
	models.MobileGallery = Backbone.Model.extend({
		imageURL : null,
		className: '',
		defaults : {
			visible : false,
			selected: false,
			layer : 0,
			slideNumber : 0,
			slideHeight: 61, // our single page height
			slideWidth:320, // our single page width
			spriteLength: 320,
			slideYpos: 0, // current Y position of our bg-image (in both pages)
			numMidResImages: 1,
			zIndex: 1
		}
		
	});
	
	models.GalleryWrapper = Backbone.Model.extend({
		showArrows: false,
		gallery : null,
		
		initialize: function() {
			Events.bind(Events.eventList.buildandprice.model.HideArrowsEvent, this.hideArrows, this);
			Events.bind(Events.eventList.buildandprice.model.ShowArrowsEvent, this.showArrows, this);
		},
		
		hideArrows : function() {
			this.set('showArrows', false);
		},
		
		showArrows : function() {
			this.set('showArrows', true);
		}
	});

	models.SummaryCategory = Backbone.Model.extend({
		category : null,
		categoryTotal : null,
		features : null,
		defaults : {
			collapsed : false,
			order : 0
		},
	
		collapse : function() {
			this.set('collapsed', true);
		},
		
		expand : function() {
			this.set('collapsed', false);
		}
	});
	
	models.SummaryFeature = Backbone.Model.extend({
		name : null,
		featureGroups: null,
		defaults : {
			nameSuffix: null,
			price : '',
			priceSuffix : null,
			pricePrefix: null,
			isChild: false
		}
	});
	
	models.HotDeal = Backbone.Model.extend({
		id:null,
		nameplateId:null,
		derivativeId:null,
		defaults : {
			hotDealUrl: null,
			hotDealSmobUrl: null,
			derivativename:'',
			order : 0,
			nameplatename:'',
			offerprice: 0,
			displayPrice: 0,
			pricedisclaimer: '',
			heroImageThumbnailUrl: '',
			imageURL: ''
		}
//	,
//		initialize: function() {
//			Events.bindToEvent(this, Events.eventList.buildandprice.view.HotDealSelectedEvent, 
//					Events.eventList.buildandprice.model.HotDealSelectedEvent.name, this.model);
//		}
	});
	
	models.HotDealContainer = Backbone.Model.extend({
		hotdeals : null,
		latestOffersInstructions : null
	});
	
	models.Storage = Backbone.Model.extend({
		derivativeDetailModel: null,
		categoryGroupCollection: null,
		pricezoneCollection: null,
		nameplateCollection : null,
		headerCollection : null,
		derivativeCollection : null,
		packageCollection : null,
		colorCollection : null,
		hotDealCollection: null,
		pathCollection : null,
		footerModel : null,
		galleryCollection : null
	});
	
	return models;
	
})(window, document, jQuery, Backbone /* nkircher: Added backbone as an injected dependency */);


/**
 * global self executing function
 * 
 * @author Sohrab Zabetian 
 */
var collections = (function(window, document, models, $, undefined) {
	/**
	 * Customize backbone collection to include select & getSelected functionality
	 */
	
	var collections = {};
	
	
	collections.PricezoneCollection = Backbone.Collection.extend({
		model: models.PriceZoneModel,
		url : Config.buildandprice.urls.pricezoneListURL,
		
		initialize: function() {
			this.bind(Events.eventList.buildandprice.view.PricezoneSelectedEvent, this.pricezoneSelected, this);
		},
		
		pricezoneSelected : function(id) {
			var model = this.selectById(id);
			Events.fireEvent(Events.eventList.buildandprice.model.PricezoneSelectedEvent.name, model);
		},
		
		comparator: function(model) {
			return model.get('name');
	    }
	});
	
	collections.DerivativeModelCollection = Backbone.Collection.extend({
		model: models.DerivativeModel,
		urlRoot : Config.buildandprice.urls.derivativeListURL,
		
		comparator: function(model) {
			return parseInt(model.get('order'));
	    }
		
	});
	
	collections.PackageModelCollection = Backbone.Collection.extend({
		model: models.PackageModel,
		urlRoot : Config.buildandprice.urls.packageListURL,
		
		comparator: function(model) {
			return parseInt(model.get('order'));
	    }
	});
	
	collections.NameplateCategoryCollection = Backbone.Collection.extend({
		model: models.NameplateCategory,
		nameplates: null
	});
	
	collections.NameplateCollection = Backbone.Collection.extend({
		model: models.Nameplate,
		urlRoot: Config.buildandprice.urls.modelListURL,
		
		initialize: function() {
			
		},
		
		comparator: function(model) {
			return parseInt(model.get('order'));
	    }
		
	});
	
	collections.PathCollection = Backbone.Collection.extend({
		model: models.PathModel
	
	});
	
	collections.FeatureCollection = Backbone.Collection.extend({
		
		model: models.FeatureModel,
		
		supportsMultiSelect : function() {
			return true;
		},
		
		initialize: function() {
			this.dir = 	null;
		},
		
		comparator: this.defaultComparator,
	    
	    defaultComparator : function(model) {
			return model.get('bpdisplayorder');
	    },
		
		priceComparator: function(model) {
			return this.dir * model.get('price');
		},
		
		nameComparator: function(modelA, modelB) {
			var result = 0;
			var nameA = modelA.get('name').toLowerCase();
			var nameB = modelB.get('name').toLowerCase();
			if (nameA > nameB) {
				result = this.dir;
			} else if (nameA < nameB) {
				result = this.dir * -1;
			}
			return result;
		},
		
		sortByPrice: function(dir) {
			//Util.log('FeatureCollection.sortyByPrice');
			this.dir = dir;
			this.comparator = this.priceComparator;
			this.sort();
			//Util.log(this.pluck('name'));
//			this.comparator = this.defaultComparator;
			this.trigger(Events.eventList.buildandprice.model.FeaturesSortCompletedEvent);
		},
		
		sortByName: function(dir) {
			//Util.log('FeatureCollection.sortyByName');
			this.dir = dir;
			this.comparator = this.nameComparator;
			this.sort();
			//Util.log(this.pluck('name'));
//			this.comparator = this.defaultComparator;
			this.trigger(Events.eventList.buildandprice.model.FeaturesSortCompletedEvent);
		}
	    
	});
	
	collections.CategoryGroupCollection = Backbone.Collection.extend({
		model : models.CategoryGroupModel,
		
		selectByOrder : function(orderVal) {
			
			_.each(this.models, function(obj) {
				obj.set('selected', obj.get('order') == orderVal);
			});
		},
		
		selectCategoryById: function(id) {
			//console.log('this.models.length ' + this.models.length);
			var category = null;
			for (var i = 0; i < this.models.length; i++) {
				var categoryGroup = this.models[i];
				//console.log('selectCategoryById looking into :' + categoryGroup.get('name') + ' with id ' + categoryGroup.id);
	    		var categories = categoryGroup.get('categories');
	    		if (categories != null && categories.length > 0) {
	    			
//	    			categories.each(function(category) {
//	    				console.log('selectCategoryById looking into category :' + category.get('name') + ' with id ' + category.id);
//	    				if (id === category.id) {
//	    					console.log('found a match');
//	    					
//	    				}
//	    			});
	    			
	    			category = categories.selectById(id);
	    			if (category != null) {
	    				break;
	    			}
	    		}
			};
			return category;
		},
		
		getSelectedFeatures : function() {
	    	var selectedFeatures = [];
	    	var i = 0;
	    	_.each(this.models, function(categoryGroup) {
	    		var categories = categoryGroup.get('categories');
	    		if (categories != null && categories.length > 0) {
		    		_.each(categories.models, function(category) {
			    		features = category.get('features');
			    		if (features != null && features.length > 0) {
			    			features = features.where({selected : true});
			    			if (features && features.length > 0) {
			    				_.each(features, function(feature) {
			    					selectedFeatures[i] = feature;
			    					i++;
			    				});
			    			}
			    		}
					});
	    		}
	    	});
	    	return selectedFeatures;
	    },
	    
	    fetchFeatures: function(ids) {
	    	var filteredFeatures = new Array();
	    	_.each(this.models, function(categoryGroup) {
	    		var categories = categoryGroup.get('categories');
	    		if (categories != null && categories.length > 0) {
		    		_.each(categories.models, function(category) {
			    		var features = category.get('features');
			    		if (features != null && features.length > 0) {
				    		_.each(features.models, function(feature) {
			    				if (_.contains(ids, feature.get('id'))) {
			    					//store the feature before it's modified to preserve its state.
			    					filteredFeatures.push(feature);
			    				}
				    		});
			    		}
		    		});
	    		}
	    	});
	    	return filteredFeatures;
	    },
	    
	    /**
	     * @param ids array of ids
	     * @param select boolean true to select, false to deselect, pass null to preserve state of feature
	     * 
	     */
	    toggleFeatures: function(ids, select, disabled) {
	    	var filteredFeatures = new Array();
	    	_.each(this.models, function(categoryGroup) {
	    		var categories = categoryGroup.get('categories');
	    		if (categories != null && categories.length > 0) {
		    		_.each(categories.models, function(category) {
			    		var features = category.get('features');
			    		if (features != null && features.length > 0) {
				    		_.each(features.models, function(feature) {
			    				if (_.contains(ids, feature.get('id'))) {
			    					//store the feature before it's modified to preserve its state.
			    					filteredFeatures.push(feature);
			    					
			    					if (select != null) {
			    						feature.set('selected', select);
			    					}
			    					var count = feature.get('dependentFeatureLockCount');
			    					//keep track of which features (such as option pack/mutual exclusive) trying to disable this feature
			    					//do not enable until disabled count gets to zero
			    					//feature.set('disabledCount', disabled === true ? count + 1 : ((count - 1) < 0 ? 0 : (count - 1)));
//		    						if (disabled === false && feature.get('disabledCount') === 0) {
//		    							feature.set({'disabled' : false});
//		    						} else if (disabled === true) {
//		    							feature.set({'disabled' : true});
//		    						}
//			    					if (!disabled) {
//			    						Util.log(feature.get('name') + ' has ' + count + ' locks. Going to ' + ((disabled ? disabled : (count !== 0)) ? ' disable ' : ' enable ') + 'feature');
//			    					}
			    					feature.set('disabled', (disabled ? disabled : (count > 0)));
		    						//Util.log((disabled === true ? 'disabling' : 'enabling') + ' feature: ' + feature.get('name') + ' disabledCount: ' + feature.get('disabledCount') + ' ->final result:' + feature.get('disabled'));
			    					
			    				}
				    		});
			    		}
					});
	    		}
	    	});
	    	return filteredFeatures;
	    },
		
		comparator: function(model) {
			return parseInt(model.get('order'));
	    },
		
		urlRoot : Config.buildandprice.urls.categoryListURL
	});
	

	collections.CategoryCollection = Backbone.Collection.extend({
		model: models.CategoryModel,

		//only used to capture omniture metrics, add silent to avoid updating the view.
		selectByOrder : function(orderVal) {
			_.each(this.models, function(obj) {
				obj.set('selected', obj.get('order') == orderVal, {silent: true});
			});
		},
		
		comparator: function(model) {
			return parseInt(model.get('order'));
	    },
	    
		urlRoot : Config.buildandprice.urls.categoryListURL
	});
	
	collections.TrimCollection = Backbone.Collection.extend({
		model: models.TrimModel,
		
		comparator: function(model) {
			return parseInt(model.get('order'));
	    }
	});
	
	collections.ColorCollection = Backbone.Collection.extend({
		model: models.ColorModel,
		
		selectTrim : function(trim) {
			selectedColors = this.where({selected : true});
			if(selectedColors && selectedColors.length > 0) {
				selectedColors[0].get('trims').select(trim);
			} 
		},
		
		comparator: function(model) {
			return parseInt(model.get('order'));
	    },
		
		urlRoot : Config.buildandprice.urls.colorTrimListURL
			
			
	});
	

	collections.FeatureGroupAttributeCollection = Backbone.Collection.extend({
		model: models.FeatureGroupAttribute
	});
	
	collections.EngineTransmissionCollection =  Backbone.Collection.extend({
		model: models.EngineTransmission,
		
		urlRoot : Config.buildandprice.urls.engineListURL
	});
	
	collections.HeaderCollection = Backbone.Collection.extend({
		model: models.HeaderModel,
		selectable: function() {
			return false;
		}
	});
	
	
	/**
	 * Manages images in image gallery
	 */
	collections.GalleryCollection = Backbone.Collection.extend({
		model: models.GalleryModel,
		
		initialize: function() {
			this.bind(Events.eventList.buildandprice.view.NextOrientationEvent, this.nextOrientation, this);
			this.bind(Events.eventList.buildandprice.view.PrevOrientationEvent, this.prevOrientation, this);
			this.zIndex = 10;
		},
		
		selectable : function() {
			return false;
		},
		
		/**
		 * Rotates Image Clockwise
		 */
		nextOrientation : function() {
			this.changeOrientation(1);
			Events.fireEvent(Events.eventList.buildandprice.model.OrientationChangedEvent.name);
		},
		
		/**
		 * Rotates Image Counter Clockwise
		 */
		prevOrientation : function() {
			this.changeOrientation(-1);
			Events.fireEvent(Events.eventList.buildandprice.model.OrientationChangedEvent.name);
		},
		
		changeOrientation: function(dir) {
			//console.log('changeOrientation: ' + dir);
			var visibleImages = this.where({visible : true});
			if (visibleImages != null && visibleImages.length > 0) {
				_.each(visibleImages, function(img) {
					var spriteLength = img.get('spriteLength'),
						slideWidth = img.get('slideWidth'),
						slideYpos = img.get('slideYpos') + (dir * slideWidth),
						slideYposAbs = Math.abs(slideYpos),
						slideNumber = img.get('slideNumber') + dir;
					if ((slideYposAbs >= spriteLength)) {
						slideYpos = 0;
					} else if (slideYpos > 0) {
						slideYpos = slideWidth - spriteLength;
					}
					
					if (slideNumber >= img.get('numImages')) {
						slideNumber = 0;
					} else if (slideNumber < 0) {
						slideNumber  = img.get('numImages') - 1;
					}
					
					
					img.set({'slideYpos' : slideYpos, 'slideNumber' : slideNumber});
				});
			}
		},
		
		/**
		 * Adds Sprite base layer to gallery. 
		 * For trims and colors only
		 */
		addBaseSprites : function(collection, prefix) {
			var self = this;
			self.addSprites(collection, prefix, 0);
			_.each(collection.models, function(model) {
				self.addSprites(model.get('trims'), 'trim_', 0);
			});
		},
		
		/**
		 * Adds Accessory layer to gallery. 
		 * For trims and colors only
		 */
		addAccessorySprites : function(collection, prefix) {
			this.addSprites(collection, prefix, 1);
		},
		
		/**
		 * General Sprite add method. To be used by collection internally.
		 */
		addSprites : function(collection, prefix, layer) {
			var self = this;
			var dummyImg = new models.GalleryModel({});
			var slideWidth = dummyImg.get('slideWidth');
			_.each(collection.models, function(model) {
				var numImage = model.get('numImages');
				var spriteUrl = model.get('spriteUrl');
				if (spriteUrl && spriteUrl != null && spriteUrl != '') {
					self.add(new models.GalleryModel({
						id : model.get('id'),
						className: prefix + '_' + model.get('id'),
						imageURL : spriteUrl,
						layer : layer,
						slideNumber: 0,
						numImages : numImage, 
						spriteLength: (slideWidth * (numImage == '' ? numImage = 1 : numImage))
					}));
				}
			});
		},
		
		toggleLayer : function(id, isEnabled) {
			var result = this.get(id); 
			if (result) {
//				Util.log('toggleLayer: ' + result.get('id') + ' isEnabled: ' + isEnabled);
				var isVisible = result.get('visible');
				//Do not bother shwoing the layer if it's already visible
				if (typeof isEnabled !== 'undefined' && (isVisible === isEnabled)) {
					return;
				}
				var layer = result.get('layer');
				
				//before doing anything with the new image, figure out the orientation of the visible images
				//so when this image is displayed, it's in the right orientation
				var slideYpos = 0;
				var visibleImgs = this.where({visible : true, layer : 0});
				if (visibleImgs && visibleImgs.length > 0) {
					//can only be one image...
					slideYpos = visibleImgs[0].get('slideYpos');
				}
				//we need to ensure that there are enough sprite images when layers are toggled.
				//for instance exterior colored sprite may have 4 images but interior image may only have 1.
				result.set('slideYpos', ((result.get('spriteLength') > Math.abs(slideYpos)) ? slideYpos : 0));
				if (layer == 1) {
					isVisible = !isVisible;
					this.zIndex += 1;
					result.set('zIndex', isVisible ? this.zIndex : 1,  {silent:true});
					result.set('visible', isVisible);
					if (this.selectable()) {
						result.set('selected', isVisible);
					}
				} else if (!isVisible) {
					var visibleImgs = this.where({visible : true, layer : 0});
					var isSelectable = this.selectable();
					if (visibleImgs) {
						_.each(visibleImgs, function(model) {
							model.set('visible', false);
							if (isSelectable) {
								result.set('selected', false);
							}
						});
					}
					result.set('visible', !isVisible);
					if (isSelectable) {
						result.set('selected', !isVisible);
					}
					var numImgs = result.get('numImages');
					if (numImgs <= 1) {
						//console.log('hideArrows');
						Events.fireEvent(Events.eventList.buildandprice.model.HideArrowsEvent);
					} else {
						//console.log('showArrows');
						Events.fireEvent(Events.eventList.buildandprice.model.ShowArrowsEvent);
					}
				}
			}
		}
		
	});
	
	collections.MobileGallery = collections.GalleryCollection.extend({
		model: models.MobileGallery,
		
				
		/**
		 * General Sprite add method. To be used by collection internally.
		 */
		addSprites : function(collection, prefix, layer) {
			//console.log('MobileGallery.addSprites');
			var self = this;
			var dummyImg = new models.MobileGallery({});
			var slideWidth = dummyImg.get('slideWidth');
			_.each(collection.models, function(model) {
				var numImage = model.get('numMidResImages');
				var spriteUrl = model.get('spriteMidResUrl');
				if (spriteUrl && spriteUrl != null && spriteUrl != '') {
					self.add(new models.MobileGallery({
						id : model.get('id'),
						className: prefix + '_' + model.get('id'),
						imageURL : spriteUrl,
						layer : layer,
						numImages : numImage, 
						spriteLength: (slideWidth * (numImage == '' ? numImage = 1 : numImage))
					}));
				}
			});
		}

	});
	
	collections.SummaryCategoryCollection = Backbone.Collection.extend({
		model: models.SummaryCategory,
		selectable : function() {
			return false;
		},
		
		comparator: function(model) {
			return parseInt(model.get('order'));
	    }
	});
	
	collections.SummaryFeatureCollection = Backbone.Collection.extend({
		model: models.SummaryFeature,
		selectable : function() {
			return false;
		}
	});
	
	collections.HotDealCollection = Backbone.Collection.extend({
		model: models.HotDeal,
		comparator: function(model) {
			return parseInt(model.get('order'));
	    },
	    urlRoot: Config.buildandprice.urls.hotdealsURL
	});
	
	
	return collections;
	
})(window, document, models, jQuery);


/**
 * @author Sohrab Zabetian
 * 
 * Omniture Analytics
 */
var BPAnalytics = Backbone.Model.extend({
	
	defatuls : {
		region : null
	},
	
	initialize: function() {
//		console.log('BPAnalytics: initialize');
		
		if (ConfigUtil.showPricezones()) {
			Events.bind(Events.eventList.buildandprice.router.UpdatePricezoneEvent,this.storeCurrentPricezone, this);
			Events.bind(Events.eventList.buildandprice.omniture.PricezoneChangedEvent,this.regionChanged, this);
		}
		if (ConfigUtil.showPostcodeSelect()) {
			Events.bind(Events.eventList.buildandprice.model.RegionPostcodeChangedEvent,this.storeCurrentRegion, this);
			Events.bind(Events.eventList.buildandprice.model.RegionPostcodeLoadedFromConfigEvent,this.storeCurrentRegion, this);
			Events.bind(Events.eventList.buildandprice.omniture.RegionPostcodeChangedEvent,this.regionChanged, this);
		}
		
		Events.bind(Events.eventList.buildandprice.omniture.StateChangedEvent,this.trackOmniturePage,this);
		
		Events.bind(Events.eventList.buildandprice.omniture.TabChangedEvent, this.tabChanged, this);
		Events.bind(Events.eventList.buildandprice.omniture.ViewAccessoryDetailsEvent, this.accessoryDetailViewed, this);
		Events.bind(Events.eventList.buildandprice.omniture.ShareLinkClickedEvent, this.shareLinkClicked, this);
		Events.bind(Events.eventList.buildandprice.omniture.SaveAsPDFEvent, this.saveAsPDFClicked, this);
	},
	
	storeCurrentRegion: function(data) {
		this.set('region', data.postcode);
	},
	
	storeCurrentPricezone: function(data) {
		this.set('region', data);
	},
	
	setupParams: function(data, type) {
		var params = { type: type};
		this.resetOmnitureVars();
		this.setPath(data);
		return params;
	},
	
	saveAsPDFClicked: function(data) {
		var params = this.setupParams(data, 'd');
		params.pname = _da.pname + ':4' + data.path + 'summary';
		params.link = params.title = this.constructShareLink(data) + 'pdf';
		params.onclicks = 'build:pdf';
		this.setupNameplateVars(data);
		//ND.omniture.trackLink(params);
		$.publish('/analytics/link/', params);
	},
	
	shareLinkClicked: function(data) {
		var params = this.setupParams(data, 'e');
		params.pname = _da.pname + ':4' + data.path + 'summary';
		params.link = params.title = this.constructShareLink(data) + 'share';
		params.onclicks = 'build:share:' + data.provider;
		this.setupNameplateVars(data);
		//ND.omniture.trackLink(params);
		$.publish('/analytics/link/', params);
	},
	
	constructShareLink: function(data) {
		var link =  _da.pname + data.path + ((data.path === (':' + Constants.path.pkg + ':')) ? '' : 'vehicle summary:');
		return link;
	},
	
	regionChanged: function(data) {
		var params = { type: 'o'};
		this.resetOmnitureVars();
		params.link = params.title = _da.pname + ':0a:model:postal code';
		params.onclicks = 'postal code';
		params.pname = _da.pname + ':0:model:postal code';
		//ND.omniture.trackLink(params);
		$.publish('/analytics/link/', params);
	},
	
	tabChanged: function(data) {
		this.resetOmnitureVars();
		this.setupRegionVars();
		this.constructTabPagename(data);
		if (typeof data.state !== 'undefined') {
			Events.unbind(Events.eventList.buildandprice.omniture.OrientationChangedEvent, this);
			Events.bindOnce(Events.eventList.buildandprice.omniture.OrientationChangedEvent, this.vehicleOrientationChanged, this);
			if (data.isColorTrimTab) {
				Events.unbind(Events.eventList.buildandprice.omniture.ColorSelectedEvent, this);
				Events.bindOnce(Events.eventList.buildandprice.omniture.ColorSelectedEvent, this.colorChanged, this);
				Events.unbind(Events.eventList.buildandprice.omniture.TrimSelectedEvent, this);
				Events.bindOnce(Events.eventList.buildandprice.omniture.TrimSelectedEvent, this.trimChanged, this);
			}
			
			this.setupOmnitureVars(data);
			ND.analyticsTag.trackOmnitureSinglePageApp();
		}
	},
	
	colorChanged: function(data) {
		this.resetOmnitureVars();
		var params = this.setupParams(data, 'o');
		params.pname = _da.pname + ':3a' + data.path + 'colour trim';
		params.link = params.title = _da.pname + data.path + 'colour trim:ext';
		params.onclicks = _da.pname + ':colorizer:ext';
		this.setupNameplateVars(data);
		//ND.omniture.trackLink(params);
		$.publish('/analytics/link/', params);
	},
	trimChanged: function(data) {
		this.resetOmnitureVars();
		var params = this.setupParams(data, 'o');
		_da.region = undefined;
		params.pname = _da.pname + ':3a' + data.path + 'colour trim';
		params.link = params.title = _da.pname + data.path + 'colour trim:int';
		params.onclicks = _da.pname + ':colorizer:int';
		this.setupNameplateVars(data);
		//ND.omniture.trackLink(params);
		$.publish('/analytics/link/', params);
	},
	
	accessoryDetailViewed: function(data) {
		var params = { type: 'o'};
		this.resetOmnitureVars();
		//find the selected category and construct its page name
		this.constructTabPagename(data);
		params.pname = data.state + data.stepName;
		params.link = params.title = 'vehicle:accessories:pop up:detail';
		params.onclicks = 'accessories: detail popup';
		if (typeof data.state !== 'undefined') {
			//ND.omniture.trackLink(params);
			$.publish('/analytics/link/', params);
		}
	},
	
	vehicleOrientationChanged: function (data) {
		var params = { type: 'o'};
		this.resetOmnitureVars();
		this.constructTabPagename(data);
		if (typeof data.state === 'undefined') { //assume something
			data.state= '3';
			data.stepName = 'exterior';
		}
		params.pname = _da.pname + ':' + data.state + data.stepName;
		params.link = params.title = _da.pname +  data.stepNameNoAnalyticsStep + ':360';
		params.onclicks = _da.pname + ':360';
		this.setupNameplateVars(data);
		//ND.omniture.trackLink(params);
		$.publish('/analytics/link/', params);
		
	},
	
	resetOmnitureVars: function() {
		_da.tool = _da.der = _da.nameplate = _da.events = _da.region = undefined;
		_da.funnel.stepname = undefined;
	},
	
	setupRegionVars: function() {
		if (this.get('region') != null) {
			_da.region = this.get('region');
		}
	},
	
	setupOmnitureVars: function(data) {
		_da.funnel.stepname = data.state + data.stepName;
		this.setupNameplateVars(data);
		if (typeof data.events !== 'undefined' && data.events != null) {
			_da.events = data.events.split(',');
		}
	},
	
	setupNameplateVars: function(data) {
		if (typeof data.storage !== 'undefined') {
			var nameplates = data.storage.get(Constants.storage.nameplateCollection);
			
			var selectedNameplate = nameplates.getSelected();
			if (typeof selectedNameplate !== 'undefined' && selectedNameplate != null) {
				_da.nameplate = {name : selectedNameplate.get('analyticsName') || selectedNameplate.get('name'),
								 year :  selectedNameplate.get('modelYear'),
								 id : selectedNameplate.get('id'),
								 cat :  selectedNameplate.get('analyticsCategory') || selectedNameplate.get('category')}; 
			}  
		}
	},
	
	validateAndSetPrice: function(price) {
		var isNumber = false;
		if (price != null && price !== '' && _.isNumber(price)) {
			_da.der.price = parseInt(price, 10);
		} else {
			_da.der.price = undefined;
		}
	},
	
	trackOmniturePage: function(data) {
//		console.log('BPAnalytics: trackOmniturePage: ' + data.state + ' path' + data.path);
//		this.set('state', data.state);
//		this.set('path', data.path);
		
		
		var stepName, events;
		//make sure these global object exist and clear them all.
		//values should not be carried from page to page.
		this.resetOmnitureVars();
		this.setupRegionVars();
		
		
		
		switch(data.state) {
			case Constants.state.SELECT_NAMEPLATE: 
				stepName = ':model:select'; 
				data.state = '0';
				break;
			case Constants.state.SELECT_PATH: //full path 
				stepName = ':package or full';
				data.state = '1';
				break;
			case Constants.state.SELECT_PACKAGE: 
			case Constants.state.SELECT_DERIVATIVE: 
				data.state = '2';
				if (data.path === Constants.path.pkg) {
					stepName = ':package:select';
				} else if(data.path === Constants.path.drv) {
					stepName = ':full:derivative';
				}
				_da.tool = {name : 'event: bp start'};
				events = 'event6,event43';
				break;	
			case Constants.state.CUSTOMIZE_DERIVATIVE: 
				this.tabChanged(data);
				return;
			case Constants.state.SUMMARY:	
				data.state = '4';
				if (data.path === Constants.path.pkg) {
					stepName = ':package';
				} else if(data.path === Constants.path.drv) {
					stepName = ':full';
				}
				stepName += ':summary';
				_da.tool = {name : 'event: bp finished'};
				events = 'event2,event43';
				//v18	"Body Model,Trim"
				//v19	"Ext:Int Color Code"
				//v20	Accessories Picked
				//v21	Veh. Options Picked	
				//v23	"Option	Pkgs Picked"
				//v24	"Engine: Trans"
				//v25 	Price
				_da.der = {};
				//get all the ids from user object.
				var selectedColor = data.storage.get(Constants.storage.colorCollection).getSelected();
				_da.der.colour = selectedColor.get('id');
				_da.der.trim = selectedColor.get('trims').getSelected().get('id');
				
				var options = new Array();
				var features = new Array();
				var optionPacks = new Array();
				var featureObjects = data.userPref.get('featuresObject');
				if (featureObjects != null && featureObjects.length > 0) {
					_.each(featureObjects.models, function(featureObject) {
						if (featureObject.get('groupType') === 'Option Pack') {
							optionPacks.push(featureObject.get('id'));
						} else if (featureObject.get('featuretype') !== 'Accessory') {
							options.push(featureObject.get('id'));
						} else {
							features.push(featureObject.get('id'));
						}
					});
				}
				
				_da.der.optionpacks = optionPacks.length > 0 ? optionPacks.join(',') : undefined;
				_da.der.features = features.length > 0 ? features.join(',') : undefined;
				_da.der.options = options.length > 0 ? options.join(',') : undefined;
				
//				Util.log('_da.der.optionpacks:' + _da.der.optionpacks);
//				Util.log('_da.der.features:' + _da.der.features);
//				Util.log('_da.der.options:' + _da.der.options);
				
				if (data.path === Constants.path.pkg) {
					var packageCollection = data.storage.get(Constants.storage.packageCollection);
					
					var selectedPackage = packageCollection.getSelected();
					_da.der.name = selectedPackage.get('name') + selectedPackage.get('engineTransmission');
					_da.der.engine = selectedPackage.get('engineId');
					
				} else if(data.path === Constants.path.drv) {
					var derivativeCollection = data.storage.get(Constants.storage.derivativeCollection);
					
					var selectedDerivative = derivativeCollection.getSelected();
					
					var engineTx = selectedDerivative.get('engines').getSelected();
					_da.der.name = selectedDerivative.get('name') + engineTx.get('name');
					_da.der.engine = engineTx.get('id');
				}
				
				if (ConfigUtil.usePolkPricing(data.path)) {
					var price = data.userPref.get('unformattedPolkPrice');
					this.validateAndSetPrice(price);
				} else if (ConfigUtil.showPrices()) {
					var price = data.userPref.total();
					this.validateAndSetPrice(price);
				}
//				console.log('price ' + _da.der.price);
				break;
			default : 
				//console.log('unknown step ' + data.state);
		}
		
		data.stepName = stepName;
		data.events = events;
		this.setupOmnitureVars(data);

		ND.analyticsTag.trackOmnitureSinglePageApp();
		
	},
	
	constructTabPagename: function(data) {
		var categoryGroups = data.storage.get(Constants.storage.categoryGrpCollection);
		var categoryGroup = categoryGroups.getSelected();
		
		var analyticsName = null;
		var analyticsStep = null;
		
		var categories = categoryGroup.get('categories');
		//try and collection analytics info from sub-tab
		if (typeof categories !== 'undefined' && categories != null && categories.length > 0) {
			var selectedCategory = categories.getSelected() == null ? categories.at(0) : categories.getSelected();
			//pick the first one
			analyticsName = selectedCategory.get('analyticsName');
			analyticsStep = selectedCategory.get('analyticsStep');
		} else if (categoryGroup.id === 1) { //colour and trim
			analyticsName = categoryGroup.get('analyticsName');
			analyticsStep = categoryGroup.get('analyticsStep');
		}
		if (analyticsName != null && analyticsStep != null) {
			this.setPath(data);
			data.state = '3';
			data.isColorTrimTab = (analyticsName === Constants.analytics.colorTrim);
			data.stepName = analyticsStep + data.path + analyticsName;
			data.stepNameNoAnalyticsStep = data.path + analyticsName;
//			Util.log('tabname:' + data.stepName);
		}
//		Util.log('analyticsName: ' + analyticsName + ' analyticsStep: ' + analyticsStep);
	},
	
	setPath: function(data) {
		var path = Constants.path.pkg; 
		var paths = data.storage.get(Constants.storage.pathCollection);
		if (!ConfigUtil.isShortPath()) {
			path = paths.getSelected().get('key');
		}
		if (path === Constants.path.pkg) {
			path = ':package:';
		} else if(path === Constants.path.drv) {
			path = ':full:';
		}
		data.path = path;
	}
 });


/**
 * 
 */
var BnP = BnP || {};

/*******************************START OF STORAGE***************************/

BnP.Storage = function() {
	
    _cache = {};
    var storageModel = new models.Storage();
	var fetchNStore = function(modelName, modelClass, successCallback) {
		var model = modelClass;
		var cachedModel = load(modelName);
		if ((typeof cachedModel === 'undefined') || (cachedModel == null) || (cachedModel.url !== model.url)) {
			$.when(model.fetch())
			.done(function() {
				store(modelName, model); 
				successCallback(model);
			 }).fail(function() {
				 Events.fireEvent(Events.eventList.buildandprice.model.ErrorOccuredEvent.name);
			 });
		} else  {
			successCallback(cachedModel);
		}
	};

	/**
	 * Loads a FRESH copy of the data from the server and returns when server replies.
	 * @param modelName
	 * @param modelClass
	 * @returns none
	 */
	var fetchFreshNStore = function(modelName, modelClass) {
		//console.log('fetchFreshNStore -> ' + modelName);
		var deferred = $.Deferred();
			var model = modelClass;
			$.when(model.fetch())
			.done(function() {
					store(modelName,model);
					deferred.resolve();
			}).fail(function() {
				Events.fireEvent(Events.eventList.buildandprice.model.ErrorOccuredEvent.name);
			});
		return deferred.promise();
	};

	var store = function(modelName, model) {
	    _cache[modelName] = model;
	    storageModel.set(modelName, model);
	};

	var load = function(modelName) {
		return _cache[modelName];
	};
	
	var remove = function(modelName) {
		delete _cache[modelName];
	};
	
	var removeAll = function(modelList) {
		for (var i = 0; i < modelList.length; i++) {
			delete _cache[modelList[i]];
		}
	};
	
	var reset = function() {
	    _cache = {};
	    storageModel.set(Constants.storage.derivativeDetailsModel, null);
	    storageModel.set(Constants.storage.categoryGrpCollection, null);
	    storageModel.set(Constants.storage.headerCollection, null);
	    storageModel.set(Constants.storage.derivativeCollection, null);
	    storageModel.set(Constants.storage.packageCollection, null);
	    storageModel.set(Constants.storage.colorCollection, null);
	    storageModel.set(Constants.storage.footerModel, null);
	    storageModel.set(Constants.storage.galleryCollection, null);
	};
	
	return {
		fetchNStore : fetchNStore,
		fetchFreshNStore: fetchFreshNStore,
		store: store,
		load: load,
		remove: remove,
		removeAll:removeAll,
		reset: reset,
		storageModel: storageModel
	};
};

/*******************************END OF STORAGE***************************/



/*
 * 
 */
var BnP = BnP || {};

/*******************************START OF DATA LOADER*********************/
BnP.DataLoader = function() {
	var _storage = BnP.Storage(),
//	_userPref = new models.UserPref();
	_userPref = new models.UserPref({'featuresObject': new collections.FeatureCollection()});

	var privateMethods = {};

	
	var restoreAll = function(uuid,callback) {
		_userPref.url = _userPref.urlRoot + uuid;
		var askForPostcodeLater = false;
		var showPricesLater = false;
		$.when(_userPref.fetch()).done(function() {
			
			//first load pricezones
			fetch('Pricezone', {restoringConfig : true, callback : function(collection) {
					//load the saved pricezone from server.
					var defaultPricezone = collection.get(_userPref.get('priceZoneId'));
					if (typeof defaultPricezone === 'undefined' || defaultPricezone == null) {
						defaultPricezone = collection.where({'default': 'true'});
						if (defaultPricezone  && defaultPricezone.length > 0) {
							defaultPricezone = defaultPricezone[0];
						} else {
							defaultPricezone = collection.at(0);
						}
					}
					collection.select(defaultPricezone);
					//initialise price formatter
					BnP.CommonHelper.initialisePriceFormatter(defaultPricezone);
				
					_storage.store(Constants.storage.pricezoneCollection, collection);
					
					updatePricezoneForUserObject(defaultPricezone);
//					var pricezoneId = defaultPricezone.id;
					//no name
					Events.fireEvent(Events.eventList.buildandprice.router.UpdatePricezoneEvent, defaultPricezone.get('name'));
					
					//first check region if we are in FOA
					var derivativeId = _userPref.get('derivativeId');

					//if we have postcodes (usually FOA)
					if (ConfigUtil.showPostcodeSelect() && typeof derivativeId !== 'undefined' && derivativeId != null) {
						//read the cookie and see if we have stored the postcode before
						ND.API.requestCookieValuesBuildAndPrice({complete: 
							function(result) {
								//our saved postcode from loaded config
								var postcode = _userPref.get('postcode');
								var usage = _userPref.get('usage');
								
								//postcode from cookie
								if (typeof result !== 'undefined' && result != null && result.postcode) {
									_userPref.set({ //we need to keep both, crazy logic to start to shape up :P
										'tempPostcode': postcode,
										'tempUsage': usage,
										'postcode': result.postcode,
										'usage': result.usage,
										'usageLabel': result.usageLabel
									});
									showPricesLater = true;
									//let omniture know which region is selected.
								} else {
									_userPref.set({
										'tempPostcode': postcode,
										'tempUsage': usage,
										'postcode': '',
										'usage': ''
									});
									askForPostcodeLater = true;
								}
									
								if (typeof postcode === 'undefined' || postcode == null || postcode === '') {
									Events.fireEvent(Events.eventList.buildandprice.router.HidePricesEvent, true);
								} else {
									//no name in Event
									Events.fireEvent(Events.eventList.buildandprice.model.RegionPostcodeLoadedFromConfigEvent, {postcode: postcode});
								}
							}
						});
					}
					
					//first load nameplates
					var modelId = _userPref.get('modelId');
					//[SOHRAB] path is a parameter, so  you should know if path is pkg at this point, no need for this check here.
					if (ConfigUtil.isShortPath() || typeof _userPref.get('packageId')!=='undefined'){
	                      var path = Constants.path.pkg;
	                      fetch('Package', {
							restoringConfig : true,
							modelId: modelId, 
							path: path, 
							derivativeId: _userPref.get('packageId'),
							engineId: 0,
							callback : function(engines) {
							    Events.fireEvent(Events.eventList.buildandprice.model.StartAllModulesEvent.name, 
						    	{
							    	 modelId: modelId, 
									 path: path, 
									 derivativeId: _userPref.get('packageId'),
									 engineId: 0,
						    		 askForPostcodeLater: askForPostcodeLater, 
						    		 showPricesLater: showPricesLater,
						    		 callback : privateMethods.loadDerivativeDetails
						    	});
							}
						});
	                    var completeURL=BnP.MobileHelper.constructStepUrl({
	                    	step:Constants.state.SUMMARY,
	                    	path:path,
	                    	derivativeId:_userPref.get('packageId'),
	                    	engineId:0,
	                    	modelId:modelId
	                    });
	                } 
	                else{
	                	var path = Constants.path.drv;
	                	fetch('Engine', {
							restoringConfig : true,
							modelId: modelId, 
							path: path, 
							derivativeId: _userPref.get('derivativeId'),
							engineId: _userPref.get('engineId'),
							callback : function(engines) {
							    Events.fireEvent(Events.eventList.buildandprice.model.StartAllModulesEvent.name, 
						    	{
							    	 modelId: modelId, 
									 path: path, 
									 derivativeId: _userPref.get('derivativeId'),
									 engineId: _userPref.get('engineId'),
						    		 askForPostcodeLater: askForPostcodeLater, 
						    		 showPricesLater: showPricesLater,
						    		 callback : privateMethods.loadDerivativeDetails
						    	});
							}
						});
						var completeURL=BnP.MobileHelper.constructStepUrl({
	                    	step:Constants.state.SUMMARY,
	                    	path:path,
	                    	derivativeId:_userPref.get('derivativeId'),
	                    	engineId:_userPref.get('engineId'),
	                    	modelId:modelId
	                    });
	                }
					if (callback && completeURL) {
					    callback(completeURL);
					}
				}
			});
		 }).fail(privateMethods.callFailed);
		
		
	};
	
	privateMethods.callFailed = function() {
		 Events.fireEvent(Events.eventList.buildandprice.model.ErrorOccuredEvent.name);
	};
	
	privateMethods.loadDerivativeDetails = function(data) {
//		var pricezoneId = _userPref.get('pricezoneId'), 
		askForPostcodeLater = data.askForPostcodeLater, 
		showPricesLater = data.showPricesLater, 
		modelId = _userPref.get('modelId'), 
		path = data.path, 
		derivativeId = data.derivativeId,
        engineId = data.engineId;


	
//		var self = this;
		privateMethods.postProcessDerivativeDetails(modelId, path, derivativeId,engineId,undefined, function() {
			//Util.log('postProcessDerivativeDetails.callback = privateMethods.loadDerivativeDetails');
			
			var colorId = _userPref.get('colourId'),
				colorCollection = colors(),
				colorToBeSelected = colorCollection.selectById(colorId);
			if (typeof colorToBeSelected !== 'undefined' && colorToBeSelected != null) {
				updateUserPrice('colour', colorToBeSelected);
				_storage.store(Constants.storage.colorCollection, colorCollection);
				//Util.log('selectedColor');
				//select trims
				var trimId = _userPref.get('trimId'),
					trims = colorToBeSelected.get('trims');
				if (trims && trims.length > 0) {
					var trimToBeSelected = trims.get(trimId);
					if (trimToBeSelected && trimToBeSelected != null) {
						trims.select(trimToBeSelected);
						updateUserPrice('trim', trimToBeSelected);
						//Util.log('selectedTrim');
						var savedFeatureIds = _userPref.get(Constants.attr.feats);
						//console.dir(savedFeatureIds);
						if (typeof savedFeatureIds !== 'undefined' && savedFeatureIds != null && savedFeatureIds.length > 0) {
							//Util.log('hasFeatures');
							var categoryGrpCollection = categoryGroups();
						
							var featuresToBeSelected = categoryGrpCollection.fetchFeatures(savedFeatureIds);
							
							//After introducing Mutual exclusive features, we save more features than we need
							//therefore this equality no longer holds. Just try to find as many
							//features as you can and hope for the best. aughhhhhh!!!
//							if (featuresToBeSelected.length !== savedFeatureIds.length) {
//								privateMethods.callFailed();
//								return;
//							}
							_.each(featuresToBeSelected, function(featureToBeSelected) {
								Events.fireEvent(Events.eventList.buildandprice.model.FeatureSelectedEvent.name, featureToBeSelected);
							});
							
						}
						
						Events.fireEvent(Events.eventList.buildandprice.model.RestoreCompleteEvent.name, {
							modelId: modelId, path: path, derivativeId: derivativeId, engineId: engineId, 
							isLoadingConfig : true, showPricesLater : showPricesLater, askForPostcodeLater: askForPostcodeLater
						});
					}
				} else {
					//NO TRIM, 
					privateMethods.callFailed();
				}
			} else {
				//NO COLOUR, 
				privateMethods.callFailed();
			}
		});

	};
	
	
	var pricezones = function() {
		return _storage.load(Constants.storage.pricezoneCollection);
	};
	
	var derivativeDetails = function() {
		return _storage.load(Constants.storage.derivativeDetailsModel);
	};
	
	var footer = function(options) {
		var model = _storage.load(Constants.storage.footerModel);
		if (typeof model === 'undefined') {
			model = createFooter(options);
			_storage.store(Constants.storage.footerModel, model);
		} 
		
		return model;
	};
	
	var categoryGroups = function() {
		var storedData =  _storage.load(Constants.storage.categoryGrpCollection);
		
		if (storedData != null) {
			if (ConfigUtil.isShortPath() || typeof _userPref.get('packageId') !== 'undefined') {
              var derivatives = _storage.load(Constants.storage.packageCollection);
            }
            else {
              var derivatives = _storage.load(Constants.storage.derivativeCollection);
            }

			if (derivatives != null) {
				var derivative = derivatives.getSelected();
				if (derivative != null && storedData.derivativeId === derivative.id) {
					return storedData.categories;
				}
			}
		}
		return null;
	};
	
	var nameplates = function() {
		
//		if (typeof successFunction === 'undefined') {
		return _storage.load(Constants.storage.nameplateCollection);
//		} else {
//			var nc = new collections.NameplateCollection();
//			nc.url = buildURL(nc.urlRoot, _pricezoneId(), null, null);
//			_storage.fetchNStore(Constants.storage.nameplateCollection, nc, successFunction);
//		}
	};
	
	var storedPanel = function() {
		return _storage.load(Constants.storage.panelCollection);
	};
	
//	privateMethods.panelOptions = {};
	var panel = function(options) {
		
//		var options = $.extend(privateMethods.panelOptions, settings),
		//we have to make sure we are still on the same vehicle as we go back and forth
		var pkgOrDrv = (options.path && options.path != null && options.path === Constants.path.pkg) ? Constants.header.sp : Constants.header.sm;
		
	    var states = [];

	    states.push({ state: Constants.state.SELECT_NAMEPLATE, name: Constants.bpt.ssm });
	    if(!ConfigUtil.isShortPath() && BnP.CommonHelper.showPathStep()) {
	    	states.push({ state: Constants.state.SELECT_PATH, name: Constants.bpt.chp });
	    }
	    if (BnP.CommonHelper.isPackagePath(options.path)) {
		    states.push({ state: Constants.state.SELECT_PACKAGE, name: pkgOrDrv });
	    } else {
	        states.push({ state: Constants.state.SELECT_DERIVATIVE, name: pkgOrDrv },
		              	{ state: Constants.state.SELECT_ENGINE, name: Constants.header.selectEngine });
	    }
		var panelCollection = new collections.HeaderCollection(),
		headerUrl = null, index = 1;
		
		//console.dir(options);
		
		for (var i = 0; i < states.length; i++) {
			headerEnabled = true;
			headerUrl = BnP.MobileHelper.constructStepUrl({
				step: states[i].state, 
				path : options.path, 
				modelId : options.modelId,
				derivativeId: options.derivativeId,
				engineId : options.engineId
			});
			
			
			panelCollection.add(new models.HeaderModel({
				order: i,
				step: index++, 
				state: states[i].state,
				heading : states[i].name,
				headerURL : headerUrl,
				enabled: (headerUrl !== ''),
				isCurrent : (states[i].state === options.state)
			}));
		}

		var state = Constants.state.CUSTOMIZE_DERIVATIVE;
		 //customize_derivative state....let's deal with the mess here
		headerUrl = BnP.MobileHelper.constructStepUrl({
			step: state,
			path : options.path,
			derivativeId: options.derivativeId,
			engineId : options.engineId,
			modelId : options.modelId
		});
		
		//console.log('headerUrl for state ' + state + ' is ' + headerUrl);
			panelCollection.add(new models.HeaderModel({
				order: index,
				step: index,
				state: state,
				heading : Constants.header.selectColor,
				headerURL: headerUrl,
				enabled: (headerUrl !== ''),
				isCurrent : (state === options.state && (typeof options.categoryId === 'undefined'))
			}));
			index++;
			var catGroups = categoryGroups();
			if (catGroups != null) {
				//console.log('categoryGroups are not null');
				_.each(catGroups.models, function(categoryGroup) {
		    		var categories = categoryGroup.get('categories');
//		    		console.log('constructing panel for categoryGroup: ' + categoryGroup.get('name') + ' and index ' + index);
		    		if (categories != null && categories.length > 0) {
			    		_.each(categories.models, function(category) {
//			    			console.log('constructing panel for category: ' + category.get('name') + ' and index ' + index);
			    			
			    			headerUrl = BnP.MobileHelper.constructStepUrl({
								step: state, 
								path : options.path,
								derivativeId: options.derivativeId,
								engineId : options.engineId,
								categoryId: category.id,
								modelId : options.modelId});
			    			//console.log('headerUrl for state ' + state + ' is ' + headerUrl);
			    			panelCollection.add(new models.HeaderModel({
								order:index,
								step: index,
								state: state,
								heading : category.get('name'),
								enabled: (headerUrl !== ''),
								isCurrent : (state === options.state && category.id === options.categoryId),
								headerURL : headerUrl
							}));
			    			index++;
			    		}, this);
		    		}
				}, this);
			}
		
			state = Constants.state.SUMMARY;
			headerUrl = BnP.MobileHelper.constructStepUrl({
				step: state, 
				path : options.path, 
				derivativeId: options.derivativeId,
				engineId : options.engineId,
				modelId : options.modelId});
			
			panelCollection.add(new models.HeaderModel({
				order: index,
				step: index,
				state: state,
				heading : Constants.header.ss,
				enabled: (headerUrl !== ''),
				isCurrent : (state === options.state),
				headerURL : headerUrl
			}));

		_storage.store(Constants.storage.panelCollection, panelCollection);	
		return panelCollection;
		
	};
	
	var paths = function() {
		return _storage.load(Constants.storage.pathCollection);
	};
	
	var colors = function() {
		return _storage.load(Constants.storage.colorCollection);
	};
	
	var trims = function() {
		return _storage.load(Constants.storage.colorCollection).getSelected().get('trims');
	};
	
	var gallery = function() {
		var galleryCollection = _storage.load(Constants.storage.galleryCollection),
			visibleImage = galleryCollection.where({visible : true}),
			showArrows = false;

		if (visibleImage.length > 0) {
			showArrows = visibleImage[0].get('numImages') > 1;
		}
		return new models.GalleryWrapper({gallery : galleryCollection, showArrows : showArrows});
	};
	
	var derivatives = function() {
		return _storage.load(Constants.storage.derivativeCollection);
	};
	
	var packages = function() {
		return _storage.load(Constants.storage.packageCollection);
	};
	
	privateMethods.nameplateHotDeal = function() {
		var nameplateCollections = nameplates(), nameplate = null;
		if (nameplateCollections != null) {
			nameplate = nameplateCollections.getSelected();
			if (nameplate != null) {
				return new models.HotDeal({hotDealUrl:nameplate.get('hotDealSmobUrl')});
			}
		}
		
		return null;
		
	};
	
	var hotdeal = function() {
		if (ConfigUtil.showPostcodeSelect()) {
			var drvCollection = derivatives();
			if (drvCollection != null) {
				var derivative = drvCollection.getSelected();
				if (derivative != null) {
					var hotDealUrl = derivative.get('hotDealUrl');
					if (hotDealUrl !== '#') {
						return new models.HotDeal({hotDealUrl:hotDealUrl});
					} else {
						return privateMethods.nameplateHotDeal();
					}
				} else {
					return privateMethods.nameplateHotDeal();
				}
			}
		}
		return null;
	};
	
	
	/**
	 * Relies on panel data which is passed in as a parameter
	 */
	var header = function(options) {

		var headerData = _storage.load(Constants.storage.headerModel);
		
		
		var panelCollection = options.panel, 
			currentPanelItems = panelCollection.where({isCurrent: true}),
			currentPanelItem = null;
		if (currentPanelItems != null && currentPanelItems.length > 0) {
			currentPanelItem = currentPanelItems[0];
		}
		
		var postcode = '', usageLabel = '';
		if (ConfigUtil.showPostcodeSelect()) {
			postcode = _userPref.get('postcode');
			usageLabel = _userPref.get('usageLabel');
		} else if (ConfigUtil.showPricezones()) {
			var pricezoneCollection = pricezones();
			postcode = pricezoneCollection.getSelected().get('name');
			usageLabel = '';
		} 
		// var showPricezoneSelect = Constants.postcode.non;
		// if (ConfigUtil.showPostcodeSelect()) {
		// 	showPricezoneSelect =  Constants.postcode.hd;
		// } else if (ConfigUtil.showPricezones()) {
		// 	showPricezoneSelect =  Constants.postcode.ot;
		// }
		var showPricezoneSelect = false;
		if (ConfigUtil.showPostcodeSelect() || ConfigUtil.showPricezones()) {
			showPricezoneSelect =  true;
		}
		
		if (headerData == null) {
			headerData = new models.HeaderModel();
		}
		
		
		if (currentPanelItem == null) {
			headerData.set({
				postcode: postcode,
				usageLabel: usageLabel,
				showPricezoneSelect: showPricezoneSelect
			});
			return headerData;
		} else {
			
			var nextPageUrl = null;
			//only show headingURL for customize step
			if (Constants.state.CUSTOMIZE_DERIVATIVE === currentPanelItem.get('state')) {
				//steps start at 1 so currentPanelItem's step is the index of the next item
				//in panelCollection
				nextPageUrl = panelCollection.at(currentPanelItem.get('step')).get('headerURL');
			}
			
			headerData.set({
				postcode: postcode,
				usageLabel: usageLabel,
				showPricezoneSelect: showPricezoneSelect,
				derivativeName: options.name,
				step : currentPanelItem.get('step'),
				totalSteps: panelCollection.length,
				heading: currentPanelItem.get('heading'),
				headerURL: nextPageUrl
			});
			
			_storage.store(Constants.storage.headerModel,headerData);
		}
		return headerData;
	};
	
	privateMethods.postProcessDerivativeDetails = function(modelId, path, derivativeId, engineId, cleanupCallback, onCompleteCallback) {
		//Util.log('postProcessDerivativeDetails');
//		var self = this;
		var derivativeDetailModel = _storage.load(Constants.storage.derivativeDetailsModel);
		var galleryCollection = _storage.load(Constants.storage.galleryCollection);
		var categoryGroupCollection = _storage.load(Constants.storage.categoryGrpCollection);
		var colorCollection = _storage.load(Constants.storage.colorCollection);

//		if (typeof _storage.load(Constants.storage.footerModel) === 'undefined') {
//			this.createFooter({path: path, derivativeId : derivativeId, step: Constants.state.CUSTOMIZE_DERIVATIVE});
//		}
		
		//decide whether to use cached data or pull everything from the server.
		if (derivativeDetailModel != null && galleryCollection  != null && 
			categoryGroupCollection != null && 
			colorCollection != null && (derivativeId === derivativeDetailModel.id)) {
			//console.log('loading from memory for derivative ' + derivativeId);
			if (typeof onCompleteCallback !== 'undefined') {
				onCompleteCallback();
			}
		} else {
			//console.log('loading from server for derivative ' + derivativeId);
			var pricezoneId = _pricezoneId();
			derivativeDetailModel = new models.DerivativeDetailModel({id : derivativeId});
			derivativeDetailModel.url = BnP.CommonHelper.buildURL(derivativeDetailModel.urlRoot, pricezoneId,derivativeId, path); 
			colorCollection = new collections.ColorCollection();
			colorCollection.url = BnP.CommonHelper.buildURL(colorCollection.urlRoot, pricezoneId, derivativeId, path); 
			categoryGroupCollection = new collections.CategoryGroupCollection();
			categoryGroupCollection.url = BnP.CommonHelper.buildURL(categoryGroupCollection.urlRoot, pricezoneId, derivativeId, path);
			galleryCollection = new collections.MobileGallery();
			if (typeof cleanupCallback !== 'undefined') {
				cleanupCallback();
			}
			
			$.when(categoryGroupCollection.fetch(),
				_storage.fetchFreshNStore(Constants.storage.derivativeDetailsModel, derivativeDetailModel),
				_storage.fetchFreshNStore(Constants.storage.colorCollection, colorCollection))
			.then(function() {

				BnP.CommonHelper.postProcessColorTrims(colorCollection);
				galleryCollection.addBaseSprites(colorCollection, 'color');

				_.each(categoryGroupCollection.models, function(categoryGroup) {
					var categories = categoryGroup.get(Constants.attr.catgs);
					var containsFeatureGroup = false;
					if (categories != null) {
						_.each(categories.models, function(category) {
							//console.log('***setting nextPageURL for category : ' + category.get('name'));
							var features = category.get(Constants.attr.feats);
							if (features && features != null) {
								category.set('pageURL', BnP.MobileHelper.constructStepUrl({
									modelId : modelId, 
									path: Constants.path.drv, 
									derivativeId : derivativeId, 
									engineId: engineId, 
									categoryId: category.id,
									step: Constants.state.CUSTOMIZE_DERIVATIVE})); 
								//console.log('category : ' + category.get('name') + ' has nextPageURL: ' + category.get('pageURL'));
//								console.log('registering url ' + ":modelId/" + Constants.path.drv + '/:derivativeId/engines/:engineId);
								var mutuallyExclusiveFeatures = features.where({groupType : Constants.values.mutuallyExclusiveOptions});
								//we need to remove mutually exclusive features from list of features before continuing.
								//they are symbolic features that maintain relationship between real features.
								if (mutuallyExclusiveFeatures && mutuallyExclusiveFeatures != null) {
									//remove mx features
									features.remove(mutuallyExclusiveFeatures);
									_.each(mutuallyExclusiveFeatures, function(mutuallyExclusiveFeature) {
										//extract mx features relational data
										var featureGroupAttributes = mutuallyExclusiveFeature.get('featureGroupAttributes');
										if (featureGroupAttributes != null && featureGroupAttributes.length > 0) {
											//search for ids in real feature list
											var fgaIdList = featureGroupAttributes.pluck('id');
											_.each(fgaIdList, function(id) {
												var feature = features.get(id);
												if (feature != null) {
													//add the relation to each real feature.
													var fgaCollection = new collections.FeatureGroupAttributeCollection();
													var newFgaList = _.without(fgaIdList, id);
													_.each(newFgaList, function(filteredId) {
														fgaCollection.add(new models.FeatureGroupAttribute({id: filteredId}));
													});
													feature.set({'featureGroupAttributes': fgaCollection, 'isMutuallyExclusive': true});
												} else {
													//console.log('WARN: could not find MX feature with id: ' + id);
												}
											});
										}
									});
								}
								galleryCollection.addAccessorySprites(features, 'feature');
								var optionPackFeatures = features.where({groupType : Constants.values.optionPack});
								if (optionPackFeatures && optionPackFeatures != null) {
									_.each(optionPackFeatures, function(optionPackFeature) {
										optionPackFeature.set({'featureDetailUrl': '#', 'isOptionPack': true});
										var featureGroupAttributes = optionPackFeature.get('featureGroupAttributes');
										if (featureGroupAttributes != null && featureGroupAttributes.length > 0) {
								            //we do not have a feature details for feature groups
											containsFeatureGroup = true;
										}
									});
								}
								
								var dependentFeatures = features.reject(function(feature) {
									return feature.get('dependentFeaturesIds') == null;
								});
								
								if (dependentFeatures && dependentFeatures != null) {
									_.each(dependentFeatures, function(dependentFeature) {
										if (dependentFeature.get('isMutuallyExclusive')) {
											alert('Unsupported publishing setup!! A mutually exclusive feature cannot have dependent features');
										}
										dependentFeature.set('hasDependentFeatures', true);
										
										//convert dependentFeaturesIds from "1,2,3,4,5,6" to an array
										dependentFeature.set('dependentFeaturesIds',
												dependentFeature.get('dependentFeaturesIds').split(','));
									});
								}
							}
						 });
					}
					if (containsFeatureGroup) {
						categoryGroup.set('containsFeatureGroup', containsFeatureGroup);
					}
				});

				selectedPackageDerivative({pkgCallback: function(pkg) {
					//Need to pass in a dummy engine because we don't have one.
					//[SOHRAB] why was this line removed?
					updateUserPrice('engine', new models.EngineTransmission({id : derivativeDetailModel.get('engineId')}));
					                                      
                    pkg.set('engineId', derivativeDetailModel.get('engineId'), {silent:true});

					
				}});
				BnP.CommonHelper.postProcessVehicleOptionsCollection(categoryGroupCollection, pricezoneId, derivativeId);
				//_storage.store(Constants.storage.categoryGrpCollection, { derivativeId: derivativeId, categories: categoryGroupCollection });
				_storage.store(Constants.storage.categoryGrpCollection, $.extend({ derivativeId: derivativeId, categories: categoryGroupCollection }, categoryGroupCollection));
				_storage.store(Constants.storage.galleryCollection, galleryCollection);
				
				derivativeDetailModel.set('showVehicleDisclaimer', (ConfigUtil.showPostcodeSelect() && (path !== Constants.path.pkg)));
				categoryGroupCollection.select(categoryGroupCollection.at(0));
				
				if (typeof onCompleteCallback !== 'undefined') {
					onCompleteCallback();
				}
			});
		}
	};
	

//	var categoriesCount = function() {
//		var catGroups = categoryGroups();
//		var numOfCategories = 0;
//		if (typeof catGroups !== 'undefined' && catGroups != null) {
//			numOfCategories = catGroups.categoriesCount();	
//		}
//		return numOfCategories;
//	};
	
	//TODO: make this private
	var fetch =  function(level, options) {
		var restoringConfig =  options.restoringConfig || false;
		
		if (ConfigUtil.showPostcodeSelect() && !restoringConfig) {
			
			ND.API.requestCookieValuesBuildAndPrice({complete: 
				function(result) {
					//if NO cookie exists
					if (typeof result === 'undefined' || result == null || result.postcode == null || result.postcode === '') {
						//open the overlay and ask the user to enter a postcode
						//console.log('calling ND.API.requestChangePriceBuildAndPrice');
						//temporary disable the loader sign so that the loader doesn't show up
						Events.fireEvent(Events.eventList.buildandprice.router.UnblockUIEvent);
						ND.API.requestChangePriceBuildAndPrice({complete: function(result) {
							//pass false for fromExistingCookie param to trigger set of events
							Events.fireEvent(Events.eventList.buildandprice.router.BlockUIEvent);
							privateMethods.processRegionPostcode(result, false);
							privateMethods.fetchWithPostcode(level, options);
						}}, false);
					} else {//if a cookie already exists
						//pass true for fromExistingCookie param to trigger set of events
						privateMethods.processRegionPostcode(result, true);
						privateMethods.fetchWithPostcode(level, options);
					}
				}
			});
		} else {
			privateMethods.fetchWithPostcode(level, options);
		}
	};
	
	privateMethods.fetchWithPostcode = function(level, options) {
		var currentLevel = 'Pricezone';
		var self = this;
		//console.log('currentLevel ' + currentLevel);
		_storage.fetchNStore(Constants.storage.pricezoneCollection,new collections.PricezoneCollection(),function(collection) {
			$.proxy(BnP.MobileHelper.processPricezone, self)(collection, _userPref
					.get('priceZoneId'));
			_storage.store(Constants.storage.pricezoneCollection, collection);
			var defaultPricezone = collection.getSelected();
			updatePricezoneForUserObject(defaultPricezone);
			if (ConfigUtil.showPricezones()) {
				Events.fireEvent(Events.eventList.buildandprice.router.UpdatePricezoneEvent, defaultPricezone.get('name'));
			}
			
			if(!ConfigUtil.showPostcodeSelect()){
				if (defaultPricezone.get('pricesDisabled') == "true") {
					Events.fireEvent(Events.eventList.buildandprice.router.HidePricesEvent, true);
				}
				else{
					Events.fireEvent(Events.eventList.buildandprice.router.HidePricesEvent, false);
				}
			}

			
			if (currentLevel === level) {
				options.callback(collection);
			} else {
				currentLevel = 'Nameplate';
				//console.log('currentLevel ' + currentLevel);
				var npCol = new collections.NameplateCollection();
				npCol.url = BnP.CommonHelper.buildURL(npCol.urlRoot, _pricezoneId(), null, null, _userPref);
				_storage.fetchNStore(Constants.storage.nameplateCollection, npCol, function(nameplateCollection) {
					if (typeof options.modelId !== 'undefined' && options.modelId != null) {
						//console.log('select nameplate ' + options.modelId);
						var toSelect = nameplateCollection.selectById(options.modelId);
						updateUserPrice('model', toSelect);
					}
					var nameplateCategories = new collections.NameplateCategoryCollection();
					BnP.CommonHelper.buildNameplateCategoriesFromNameplates(nameplateCollection, nameplateCategories);
					if (currentLevel === level) {
						options.callback(nameplateCategories);
					} else {
						
						currentLevel = 'Path';
						//console.log('currentLevel ' + currentLevel);
						options.nameplate = nameplateCollection.getSelected();
						
						var nameplate = nameplateCollection.getSelected();
						var paths = createPaths(options.path, nameplate, options.modelId);
						
						if (currentLevel === level) {
							options.callback(paths);
						} else {
							//check if short path
							privateMethods.fetchWithPath(level, options);
						}
					}
				});
			}
		});
	};
	
	privateMethods.fetchWithPath=function(level, options){
		//[SOHRAB] isn't it enough to check 
          if (BnP.CommonHelper.isPackagePath(options.path)) {
             var currentLevel = 'Package';
             //console.log('currentLevel ' + currentLevel);
             var model = new collections.PackageModelCollection();
             var pricezoneId = _pricezoneId();
             model.url = BnP.CommonHelper.buildURL(model.urlRoot, pricezoneId, options.modelId, Constants.path.pkg, _userPref);
             _storage.fetchNStore(Constants.storage.packageCollection, model, function (packages) {
                 if (typeof options.derivativeId !== 'undefined' && options.derivativeId != null) {
                     updateUserPrice('package', packages.selectById(options.derivativeId));
                 }
                 BnP.MobileHelper.postProcessPackages(options.modelId, pricezoneId, packages);
                 //privateMethods.fetchEngineAndBeyond(currentLevel, level, packages, options);
                 if (currentLevel === level) {
					options.callback(packages);
				 }
				 else{
				 	currentLevel = 'Engine';
                 	privateMethods.loadCategories(currentLevel, level, packages.getSelected(), new collections.EngineTransmissionCollection(), options);
				 }
             });
         }
         else {
             var currentLevel = 'Derivative';
             //console.log('currentLevel ' + currentLevel);
             var model = new collections.DerivativeModelCollection();
             var pricezoneId = _pricezoneId();
             model.url = BnP.CommonHelper.buildURL(model.urlRoot, pricezoneId, options.modelId, Constants.path.drv, _userPref);
             _storage.fetchNStore(Constants.storage.derivativeCollection, model, function (derivatives) {
                 //console.log('fetching derivatives');
                 if (typeof options.derivativeId !== 'undefined' && options.derivativeId != null) {
                     updateUserPrice('derivative', derivatives.selectById(options.derivativeId));
                 }
                 if (ConfigUtil.showPostcodeSelect()) {

                     hotdealCollection = new collections.HotDealCollection();
                     //                                        
                     hotdealCollection.url = hotdealCollection.urlRoot + '/' + Config.site + '/' + options.modelId;
                     var postcode = _userPref.get('postcode');
                     if (postcode != null && postcode != '') {
                         hotdealCollection.url += '/' + postcode;
                     }
                     //console.log('fetch n persist hotdeals');
                     _storage.fetchNStore(Constants.storage.hotdealCollection, hotdealCollection, function (hotDealResults) {
                         BnP.MobileHelper.postProcessDerivatives(options.modelId, pricezoneId, derivatives, hotDealResults);
                         privateMethods.fetchEngineAndBeyond(currentLevel, level, derivatives, options);
                     });
                 } else {
                     BnP.MobileHelper.postProcessDerivatives(options.modelId, pricezoneId, derivatives, null);
                     privateMethods.fetchEngineAndBeyond(currentLevel, level, derivatives, options);
                 }
             });
         }
     }

	
	privateMethods.fetchEngineAndBeyond = function(currentLevel, level, derivatives, options) {

		if (currentLevel === level) {
			options.callback(derivatives);
		} else {
			currentLevel = 'Engine';
			var selectedDerivative = derivatives.getSelected();
			var engines = selectedDerivative.get('engines');

			if (engines === null) {
				//console.log('engine');
				var collection = new collections.EngineTransmissionCollection();
				collection.url = BnP.CommonHelper.buildURL(collection.urlRoot,_pricezoneId(), selectedDerivative.id, '', _userPref);
				$.when(collection.fetch()).then(function() {
					BnP.MobileHelper.postProcessEngines(options.modelId, selectedDerivative.id, collection);
					if (typeof options.engineId !== 'undefined' && options.engineId != null) {
						collection.selectById(options.engineId);
						updateUserPrice('engine', collection.getSelected());
					}
					selectedDerivative.set('engines', collection);
					privateMethods.loadCategories(currentLevel, level, selectedDerivative, collection, options);
					
				}).fail(privateMethods.callFailed);
			} else {
				privateMethods.loadCategories(currentLevel, level,selectedDerivative, engines, options);
			}
			
			
		}
	};
	
	privateMethods.processRegionPostcode = function(result, fromExistingCookie) {
		//console.log('processRegionPostcode');
		if (fromExistingCookie) {//do not trigger omniture region changed event
			Events.fireEvent(Events.eventList.buildandprice.model.RegionPostcodeChangedEvent, result);
			Events.fireEvent(Events.eventList.buildandprice.router.HidePricesEvent, !ConfigUtil.showPrices());
		} else {
			//TODO: why isn't this getting called when user cancels out of region overlay
			if (result && result.postcode) { //fire omniture region changed event
				if (((_userPref.get('postcode') !== result.postcode) || (_userPref.get('usage') !== result.usage))) {
					Events.fireEvent(Events.eventList.buildandprice.omniture.RegionPostcodeChangedEvent, result);
					Events.fireEvent(Events.eventList.buildandprice.model.RegionPostcodeChangedEvent, result);
					Events.fireEvent(Events.eventList.buildandprice.router.HidePricesEvent, !ConfigUtil.showPrices());
				} 
			} else {
//				Events.fireEvent(Events.eventList.buildandprice.omniture.RegionPostcodeChangedEvent, {postcode: null});
				//TODO: why fire this event...web version doesn't...to find out later.
				Events.fireEvent(Events.eventList.buildandprice.model.RegionPostcodeChangedEvent, {postcode: ''});
				Events.fireEvent(Events.eventList.buildandprice.router.HidePricesEvent, true);
			}
		}
		
	};
	
	privateMethods.loadCategories = function(currentLevel, level, selectedDerivative, engines, options) {
		if (currentLevel === level) {
			if (typeof options.engineId !== 'undefined' && options.engineId != null) {
				engines.selectById(options.engineId);
			}
			options.callback(engines);
		} else {
			currentLevel = 'Categories';
//			modelId, path, derivativeId, cleanupCallback, onCompleteCallback
			privateMethods.postProcessDerivativeDetails(options.modelId, options.path,options.derivativeId, options.engineId,
					options.cleanup,options.callback);
		}
	};
	
	
	var createPaths  = function(path, nameplate, modelId) {
		var prevPaths = _storage.load(Constants.storage.pathCollection);
		
		var paths = new collections.PathCollection();
		
		var nameplateName = nameplate.get('name');
		var hotDealUrl = nameplate.get('hotDealSmobUrl');
		var pkg = new models.PathModel({key: Constants.path.pkg, 
			imageURL : nameplate.get('pkgMidResURL'), 
			pathURL : (hotDealUrl != null) ? hotDealUrl : 
					  (BnP.MobileHelper.constructStepUrl.call(this, {step: Constants.state.SELECT_PACKAGE, path: Constants.path.pkg, modelId : modelId})), 
			name : Constants.bpt.czp,
			title : Constants.bpt.sczp, 
			instruction: Constants.bpt.ppi.replace('%1', nameplateName)
		});
		
		var drv = new models.PathModel({key: Constants.path.drv, 
			imageURL : nameplate.get('byoMidResURL'),
			pathURL : (BnP.MobileHelper.constructStepUrl.call(this, {step: Constants.state.SELECT_DERIVATIVE, path: Constants.path.drv, modelId :modelId})), 
			name : Constants.bpt.byon, 
			title : Constants.bpt.byot, 
			instruction: Constants.bpt.pbyoi.replace('%1', nameplateName)
		});
		paths.add(pkg);
		paths.add(drv);
		
		if (typeof path === 'undefined' && prevPaths != null) {
			path = prevPaths.getSelected();
			if (path != null) {
				if (path.get('key') === pkg.get('key')) {
					path = pkg;
				} else if (path.get('key') === drv.get('key')) {
					path = drv;
				}
				paths.select(path);
			}
		} else if ((typeof path !== 'undefined') && path != null) {
			if (path === pkg.get('key')) {
				path = pkg;
			} else if (path === drv.get('key')) {
				path = drv;
			}
			paths.select(path);
		} 
		_storage.store(Constants.storage.pathCollection, paths);
		
		return paths;
	};
	
	
	
	
	var clearStorageForStep = function(step) {
		//Util.log('clearStorageForStep: ' + step);
		switch(step) {
		
			case Constants.state.SELECT_NAMEPLATE:
			case Constants.state.SELECT_PATH:
				_storage.removeAll([Constants.storage.derivativeDetailsModel,
				                 Constants.storage.categoryGrpCollection,
				                 Constants.storage.headerCollection,
				                 Constants.storage.derivativeCollection,
				                 Constants.storage.packageCollection,
				                 Constants.storage.colorCollection,
				                 Constants.storage.footerModel,
				                 Constants.storage.galleryCollection
				                 ]);
				privateMethods.panelOptions = {};
				_userPref.purge();
				break;
			case Constants.state.SELECT_DERIVATIVE:
			case Constants.state.SELECT_PACKAGE:
				privateMethods.panelOptions = {};
				break;
			case Constants.state.CUSTOMIZE_DERIVATIVE:
				_userPref.set({
					featuresObject: new collections.FeatureCollection(),
					features: new Array()
				});
				privateMethods.panelOptions = {};
				break;
		}
	};

	var selectedPackageDerivative = function(callbacks) {
		var pkgPath = drvPath = false, selectedPackage,selectedDerivative;
		var packageCollection = packages();
		if (ConfigUtil.isShortPath()) {
			selectedPackage = packageCollection.getSelected();
			pkgPath = (selectedPackage != null);
		} else {
			var pathCollection = paths();
			var selectedPath = pathCollection.getSelected();
			if (typeof selectedPath !== 'undefined' && selectedPath != null) {
				if (selectedPath.get('key') === Constants.path.pkg) {
					selectedPackage = packageCollection ? packageCollection.getSelected() : null;
					pkgPath = (selectedPackage != null);
				} else {//derivative
					var derivativeCollection = derivatives();
					selectedDerivative = derivativeCollection ? derivativeCollection.getSelected() : null;
					drvPath = (selectedDerivative != null);
				}
			}
		}
		if (typeof callbacks !== 'undefined') {
			if (pkgPath && typeof callbacks.pkgCallback !== 'undefined') {
				callbacks.pkgCallback.call(null,selectedPackage);
			} else if (drvPath && typeof callbacks.drvCallback !== 'undefined') {
				callbacks.drvCallback.call(null,selectedDerivative);
			}
		}
	};
	
	var updateUserPrice = function(property, object) {
		if (property != 'features') {
			if(object){
				_userPref.set( property + 'Object', object);
				_userPref.set( property + 'Id' , object.get('id'));
			}
		} else {
			updateUserPriceFeatures(object);
		}
	};
	
	var updateUserPriceFeatures = function(object, isSelected) {
		isSelected = (typeof isSelected !== 'undefined') ? isSelected : object.get('selected');
		var features = _userPref.get(Constants.attr.feats + 'Object');
//		console.log('updateUserPriceFeatures(isSelected:' + isSelected + ')');
		if (isSelected) {
			//make sure we r not doule adding features
			var existingFeature = features.get(object.get('id'));
			if (existingFeature == null) {
				features.add(object);
//				Util.log('adding feature ' + object.get('name'));
				_userPref.get(Constants.attr.feats).push(object.get('id'));
			}
		} else {
			var featureIds = _userPref.get(Constants.attr.feats);
//			Util.log('removing feature ' + object.get('name'));
			//+
//					' featureIds: ' + featureIds +
//					', id of feature to remove ' + object.get('id'));
			features.remove(object);
			
			var i = _.indexOf(featureIds, object.get('id'));
			if (i >= 0) {
//				var slicedFeatures =
				featureIds.splice(i, 1);
//				console.log('removing from featureIds ' + slicedFeatures);
				_userPref.set(Constants.attr.feats,featureIds);
			}
		}
		_userPref.set(Constants.attr.feats + 'Object', features);
	};
	
	var updatePricezoneForUserObject = function(pricezone) {
		_userPref.set('priceZoneId', pricezone.get('id'));
		_userPref.set('site', Config.site);
	};
	
	var createFooter = function(options) {
		model = new models.FooterModel();
		options.step = options.step + 1;
		model.setNextButton(BnP.MobileHelper.constructStepUrl.call(this, options), Constants.header.c);
		options.step = options.step - 2; 
		model.setPrevButton(BnP.MobileHelper.constructStepUrl.call(this, options), Constants.header.p);
		return model;
	};
	
	var _pricezoneId = function() {
		var pricezoneId = _userPref.get('priceZoneId');
		if (typeof pricezoneId === 'undefined' || pricezoneId == null) {
			pricezoneId = Config.priceZoneId;
		}
		return pricezoneId;
	};
	
	var nameplateName = function(modelId) {
		var selectedNameplate = nameplates().getSelected();
		var modelName = '';
		if (selectedNameplate && selectedNameplate != null) {
			modelName = selectedNameplate.get('name');
		} else if (modelId && modelId != null) {
			selectedNameplate = collection.selectById(modelId);
			modelName = selectedNameplate.get('name');
		}
		return modelName;
	};
	
	var error = function(options) {
		options = options || { message : null, title : Constants.bpt.errorProcessingData, showPricezone : false};
		return new models.ErrorModel(options);
	};
	
	var currentGalleryView = function() {
		derivativeDetails().get('view');
	};
	
	var reset = function(pcz) {
		_storage.reset();
		_storage.store(Constants.storage.pricezoneCollection, pcz);
		_userPref.purge();
	};
	
	var publicMethods = {
		fetch: fetch,
		header: header,
		restoreAll: restoreAll,
		pricezones : pricezones,
		pricezoneId: _pricezoneId,
		derivativeDetails: derivativeDetails,
		getSelectedPackageDerivative: selectedPackageDerivative,
		updatePricezoneForUserObject: updatePricezoneForUserObject,
		updateUserPriceFeatures: updateUserPriceFeatures,
		updateUserPrice: updateUserPrice,
		nameplates: nameplates,
		derivatives: derivatives,
		packages: packages,
		footer: footer,
		categoryGroups: categoryGroups,
		currentGalleryView: currentGalleryView,
//		categoriesCount: categoriesCount,
		colors: colors,
		trims: trims,
		gallery: gallery,
		paths: paths,
		hotdeal:  hotdeal,
		userPref: _userPref,
		reset: reset,
		error: error,
		clearStorageForStep: clearStorageForStep,
		panel: panel,
		panelData: storedPanel,
		storage: _storage,
		isFirstLoad:true
	};
	
	return publicMethods;
};

/*******************************END OF DATA LOADER*****************/


/**
 * 
 */
var BnP = BnP || {};

/*******************************START OF DATA LOADER*********************/
BnP.NameplateModule = function(dataLoader, viewManager, options) {
	
	//has to be this name for backward compatibility
	Events.eventList.buildandprice.model.ModelSelectedEvent.handler = function(model) {
		var collection = dataLoader.nameplates();
		
		var selectedModel = collection.getSelected();
		
		if (selectedModel != null && selectedModel.id !== model.id) {
			dataLoader.clearStorageForStep(Constants.state.SELECT_NAMEPLATE);
			collection.select(model);
			dataLoader.updateUserPrice('model', model);
		} else {
			collection.select(model);
			dataLoader.updateUserPrice('model', model);
		}
	
		options.navigate('#' + model.get('nameplateURL'), {trigger: true});
	};
	
	var registerEvents = function() {
		
		Events.bind(Events.eventList.buildandprice.model.ModelSelectedEvent.name, 
				Events.eventList.buildandprice.model.ModelSelectedEvent.handler, this);
		
		return publicMethods;
	};
	
	var go = function() {
		
		Events.fireEvent(Events.eventList.buildandprice.router.BlockUIEvent);
		dataLoader.fetch('Nameplate', {callback: function(nameplateCategories) {
			if (nameplateCategories && nameplateCategories.length > 0) {
				var panelData = dataLoader.panel({state: Constants.state.SELECT_NAMEPLATE});
				
				viewManager.page()
				.nameplates(nameplateCategories)
				.nameplateHeader(dataLoader.header({name: null, panel : panelData}))
				.nameplatePanel(nameplateCategories)
				.go();					
				

			}

			Events.fireEvent(Events.eventList.buildandprice.omniture.StateChangedEvent,
					{ state: Constants.state.SELECT_NAMEPLATE, storage: dataLoader.storage.storageModel });
			Events.fireEvent(Events.eventList.buildandprice.router.UnblockUIEvent);
			}
		});
	};
	
	var publicMethods = {
		registerEvents: registerEvents,
		go: go
	};
	
	return publicMethods;
	
};


/**
 * 
 */
var BnP = BnP || {};

/*******************************START OF DATA LOADER*********************/
BnP.PathModule = function(dataLoader, viewManager, options) {
	
	Events.eventList.buildandprice.model.PathSelectedEvent.handler = function (path) {
		paths = dataLoader.paths();
		var prevPath = paths.getSelected();
//				Util.log('prevPath.key:' + ((prevPath != null) ? prevPath.get('key') : ''));
		if (prevPath != null && prevPath.get('key') !== path.get('key')) {
			//user is changing path, wipe out storage.
			dataLoader.clearStorageForStep(Constants.state.SELECT_PATH);
		}		
		paths.select(path);
		var pathUrl = path.get('pathURL');
		if (pathUrl.charAt(0) === '#') {
			options.navigate(pathUrl, {trigger: true});
		} else {
			window.location = pathUrl;
		}
	};
	
	
	var registerEvents = function() {
		
		Events.bind(Events.eventList.buildandprice.model.PathSelectedEvent.name,
				Events.eventList.buildandprice.model.PathSelectedEvent.handler, this);
		
		return publicMethods;
	};
	
	var updateOptions = function(newOptions) {
		options = newOptions;
	};
	
	var go = function() {
		Events.fireEvent(Events.eventList.buildandprice.router.BlockUIEvent);
		dataLoader.fetch( 'Path', {callback: function(paths) {
			
			var panelData = dataLoader.panel({state: Constants.state.SELECT_PATH, modelId: options.modelId});
			viewManager.page().paths(paths)
			.header(dataLoader.header({
						name: dataLoader.nameplates().getSelected().get('name'),
						panel : panelData
					}))
			.panel(panelData)
			.go();
			
//			self.viewManager.displayParentView(views.SelectPathListView, paths);
//			self.viewManager.displayTitleView(new models.PageTitleModel({title : Constants.bpt.chp}));
//			self.displayHeadersView(modelId);
//			self.updateHeader(Constants.state.SELECT_PATH, Helper.constructStepUrl.call(self, 
//					{step: Constants.state.SELECT_PATH, modelId : modelId}));
			Events.fireEvent(Events.eventList.buildandprice.omniture.StateChangedEvent,
					{ state: Constants.state.SELECT_PATH, storage: dataLoader.storage.storageModel });
			Events.fireEvent(Events.eventList.buildandprice.router.UnblockUIEvent);
			
//			if (ConfigUtil.showPostcodeSelect()) {
//				self.removeHotDealsView();
//			}
			
			
		}, modelId : options.modelId});
	};
	
	var publicMethods = {
		registerEvents: registerEvents,
		updateOptions: updateOptions,
		go: go
	};
	
	return publicMethods;
	
};


/**
 * 
 */
var BnP = BnP || {};

/*******************************START OF DATA LOADER*********************/
BnP.PackagesModule = function(dataLoader, viewManager, options) {
	
	
    Events.eventList.buildandprice.model.PackageSelectedEvent.handler = function (pkg) {
		var collection = dataLoader.packages();
		//TODO: can we move this so the user doesn't lose their progress
		var selectedPkg = collection.getSelected();
		if (selectedPkg && selectedPkg.get('id') !== pkg.get('id')) {
		    dataLoader.clearStorageForStep(Constants.state.SELECT_PACKAGE);
		}
		collection.select(pkg);
		dataLoader.updateUserPrice('package', pkg);
		options.navigate(pkg.get('derivativeURL'), { trigger: true });
	};
	
	var registerEvents = function() {
		
	    Events.bind(Events.eventList.buildandprice.model.PackageSelectedEvent.name,
				Events.eventList.buildandprice.model.PackageSelectedEvent.handler, this);
		
		return publicMethods;
	};
	
	
	var go = function() {
		Events.fireEvent(Events.eventList.buildandprice.router.BlockUIEvent);
		//we should reconstruct the price object as it's out of sync wrt this page.
		dataLoader.fetch( 'Package', {callback : function(modelResult) {
//			var model = new collections.DerivativeModelCollection();
			var pricezoneId = dataLoader.pricezoneId();
//			model.url = Helper.buildURL(model.urlRoot, pricezoneId, modelId, Constants.path.drv, dataLoader.userPref);
//			fetchModel(Constants.storage.derivativeCollection,model, function(modelResult) {
				if (modelResult !== undefined && modelResult.length > 0) {
					var panelData = dataLoader.panel({
						state: Constants.state.SELECT_DERIVATIVE, 
						modelId: options.modelId, 
						engineId:0,
						path: options.path});

					viewManager.page()
					    .packages(modelResult, dataLoader.hotdeal())
						.panel(panelData)
						.header(dataLoader.header({
							name: dataLoader.nameplates().getSelected().get('name'),
							panel : panelData
						}))
					.go();
					Events.fireEvent(Events.eventList.buildandprice.router.UnblockUIEvent);
					
					
				} else {
//					displayNoContentView(modelId, Constants.path.drv);
					
					Events.fireEvent(Events.eventList.buildandprice.model.ErrorOccuredEvent.name, 
						  {
							title: Constants.bpt.sv, 
						    message: Constants.bpt.cl,
						    showPricezone: ConfigUtil.showPricezones()
						  });
				}
				
				Events.fireEvent(Events.eventList.buildandprice.omniture.StateChangedEvent,
						{ state: Constants.state.SELECT_DERIVATIVE, path: Constants.path.drv, storage: dataLoader.storage.storageModel });
				
//			});
			
		}, modelId: options.modelId, path: Constants.path.pkg, derivativeId: options.derivativeId});
	};
	
	var updateOptions = function(newOptions) {
		options = newOptions;
	};

	
	var publicMethods = {
		registerEvents: registerEvents,
		updateOptions: updateOptions,
		go: go
	};
	
	return publicMethods;
	
};


/**
 * 
 */
var BnP = BnP || {};

/*******************************START OF DATA LOADER*********************/
BnP.DerivativeModule = function(dataLoader, viewManager, options) {
	
	
	Events.eventList.buildandprice.model.DerivativeSelectedEvent.handler = function(derivative) {
		var collection = dataLoader.derivatives();
		//TODO: can we move this so the user doesn't lose their progress
		var selectedDrv = collection.getSelected();
		if (selectedDrv && selectedDrv.get('id') !== derivative.get('id')) {
			dataLoader.clearStorageForStep(Constants.state.SELECT_DERIVATIVE);
		}
		collection.select(derivative);
		dataLoader.updateUserPrice('derivative', derivative);
		options.navigate(derivative.get('derivativeURL'), {trigger: true});
	};
	
	var registerEvents = function() {
		
		Events.bind(Events.eventList.buildandprice.model.DerivativeSelectedEvent.name,
				Events.eventList.buildandprice.model.DerivativeSelectedEvent.handler, this);
		
		return publicMethods;
	};
	
	
	var go = function() {
		Events.fireEvent(Events.eventList.buildandprice.router.BlockUIEvent);
		//we should reconstruct the price object as it's out of sync wrt this page.
		dataLoader.fetch( 'Derivative', {callback : function(modelResult) {
//			var model = new collections.DerivativeModelCollection();
			var pricezoneId = dataLoader.pricezoneId();
//			model.url = Helper.buildURL(model.urlRoot, pricezoneId, modelId, Constants.path.drv, dataLoader.userPref);
//			fetchModel(Constants.storage.derivativeCollection,model, function(modelResult) {
				if (modelResult !== undefined && modelResult.length > 0) {
					var panelData = dataLoader.panel({state: Constants.state.SELECT_DERIVATIVE, modelId: options.modelId, path: options.path});
					viewManager.page()
					.derivatives(modelResult, dataLoader.hotdeal())
						.panel(panelData)
						.header(dataLoader.header({
							name: dataLoader.nameplates().getSelected().get('name'),
							panel : panelData
						}))
					.go();
					Events.fireEvent(Events.eventList.buildandprice.router.UnblockUIEvent);
					
					
				} else {
//					displayNoContentView(modelId, Constants.path.drv);
					
					Events.fireEvent(Events.eventList.buildandprice.model.ErrorOccuredEvent.name, 
						  {
							title: Constants.bpt.sv, 
						    message: Constants.bpt.cl,
						    showPricezone: ConfigUtil.showPricezones()
						  });
				}
				
				Events.fireEvent(Events.eventList.buildandprice.omniture.StateChangedEvent,
						{ state: Constants.state.SELECT_DERIVATIVE, path: Constants.path.drv, storage: dataLoader.storage.storageModel });
				
//			});
			
		}, modelId: options.modelId, path: Constants.path.drv, derivativeId: options.derivativeId});
	};
	
	var updateOptions = function(newOptions) {
		options = newOptions;
	};
	
//	var selectDerivative = function(drvCollection) {
//		if (options.derivativeId && options.derivativeId != null) {
//			var derivative = drvCollection.get(options.derivativeId);
//			Events.fireEvent(Events.eventList.buildandprice.model.DerivativeSelectedEvent.name, derivative);
//		}
//	};
	
//	var displayDerivatives = function(options, pricezoneId, modelResult) {
//		viewManager.displayParentView(views.SelectDerivativeListView, modelResult);
//		viewManager.displayTitleView(new models.PageTitleModel({title :  Constants.bpt.chm, showLatestOffersBtn: ConfigUtil.showPostcodeSelect()}));
//		displayHeadersView(modelId, Constants.path.drv);
		
//		selectDerivative(modelResult);
		
//		viewManager.page()
//		.derivatives(modelResult).hotdeal()
//			.panel(dataLoader.panel({state: Constants.state.SELECT_DERIVATIVE, modelId: options.modelId, path: options.path}))
//			.header(dataLoader.header({
//				name: dataLoader.nameplates().getSelected().get('name'),
//				stepName: Constants.bpt.chm,
//				state: Constants.state.SELECT_DERIVATIVE,
//				nextPageURL: null
//			}))
//		.go();
//		Events.fireEvent(Events.eventList.buildandprice.router.UnblockUIEvent);
//		updateHeader(
//				Constants.state.SELECT_DERIVATIVE,
//				Helper.constructStepUrl.call(self,{step: Constants.state.SELECT_DERIVATIVE, 
//												   path: Constants.path.drv,
//												   modelId: modelId}), Constants.header.sm);
		
//		displayFooterView({path: Constants.path.drv, modelId : modelId, step: Constants.state.SELECT_DERIVATIVE});
//		updateFooter(SELECT_ENGINE);
		
//	};
	
	var publicMethods = {
		registerEvents: registerEvents,
		updateOptions: updateOptions,
		go: go
	};
	
	return publicMethods;
	
};


/**
 * 
 */
var BnP = BnP || {};

/*******************************START OF DATA LOADER*********************/
BnP.EngineModule = function(dataLoader, viewManager, options) {
	
	Events.eventList.buildandprice.model.EngineTrasmissionSelectedEvent.handler = function(engine) {
		var derivatives = dataLoader.derivatives();
		derivatives.getSelected().get('engines').select(engine);
		dataLoader.updateUserPrice('engine', engine);
//			//this.updateFooter(Constants.state.SELECT_ENGINE);
		options.navigate(engine.get('engineURL'), {trigger: true});
	};
	
	var registerEvents = function() {
		Events.bind(Events.eventList.buildandprice.model.EngineTrasmissionSelectedEvent.name, 
				Events.eventList.buildandprice.model.EngineTrasmissionSelectedEvent.handler, this);
		
		return publicMethods;
	};
	
	
	var go = function() {
		Events.fireEvent(Events.eventList.buildandprice.router.BlockUIEvent);
		//console.log('navToEnginesPage');
		dataLoader.fetch( 'Engine', {callback : function(engines) {
			    var derivative = dataLoader.derivatives().getSelected(),
			    	panelData = dataLoader.panel({state: Constants.state.SELECT_ENGINE, modelId: options.modelId, 
						 path: Constants.path.drv, derivativeId : options.derivativeId});
				viewManager.page()
				.engines(derivative.get('name'), derivative.get('thumbnailURL'), engines, dataLoader.hotdeal())
					.panel(panelData)
					.header(dataLoader.header({
						name: derivative.get('name'),
						panel : panelData
					}))
				.go();
				Events.fireEvent(Events.eventList.buildandprice.router.UnblockUIEvent);
				Events.fireEvent(Events.eventList.buildandprice.omniture.StateChangedEvent,
                            { state: Constants.state.SELECT_ENGINE, path: Constants.path.drv, storage: dataLoader.storage.storageModel });
//				self.updateFooter(self.SELECT_ENGINE);
		}, modelId: options.modelId, path: Constants.path.drv, derivativeId: options.derivativeId});
		
	};
	
	var updateOptions = function(newOptions) {
		options = newOptions;
	};
	
	var publicMethods = {
		registerEvents: registerEvents,
		updateOptions: updateOptions,
		go: go
	};
	
	return publicMethods;
	
};


/**
 * 
 */
var BnP = BnP || {};

/*******************************START OF DATA LOADER*********************/
BnP.ColorModule = function(dataLoader, viewManager, options) {
	
	/**
	 * data {trim: trimObject, isSystem: true/false}
	 * isSystem indicates whether this trim selection is invoked by the application or the user
	 * the sole purpose of the flag is to determine when to fire an omniture trim selected event.
	 */
	Events.eventList.buildandprice.model.TrimSelectedEvent.handler = function(data) {
		selectTrim(data.trim);
		if (dataLoader.currentGalleryView() === Constants.view.interior) {
			dataLoader.gallery().toggleLayer(data.trim.get('id'));
		} else {
			Events.fireEvent(Events.eventList.buildandprice.model.ToggleViewEvent.name, Constants.view.interior);
		}
//			console.log('TrimSelectedModelEvent: data.isSystem:' + data.isSystem);
//			if (false === data.isSystem) {
//				Events.fireEvent(Events.eventList.buildandprice.omniture.TrimSelectedEvent, {storage: dataLoader});
//			}
	};
	
	/**
	 * data {color: colorObject, isSystem: true/false}
	 * isSystem indicates whether this color selection is invoked by the application or the user
	 * the sole purpose of the flag is to determine when to fire an omniture color selected event.
	 */
	Events.eventList.buildandprice.model.ColorChangedEvent.handler = function(data) {
		selectColor(data);
//		this.selectTrim(color.get('trims').at(0));
		if (dataLoader.currentGalleryView() === Constants.view.exterior) {
			dataLoader.gallery().toggleLayer(data.color.id);
		} else {
			Events.fireEvent(Events.eventList.buildandprice.model.ToggleViewEvent.name,Constants.view.exterior);
		}
//			console.log('ColorChangedModelEvent: data.isSystem:' + data.isSystem);
//			if (false === data.isSystem) {
//				Events.fireEvent(Events.eventList.buildandprice.omniture.ColorSelectedEvent, {storage: this.storage});
//			}
	};
	
	var selectTrim = function(trim) {
		var colorCollection = dataLoader.colors();
		colorCollection.selectTrim(trim);
		
		dataLoader.updateUserPrice('trim', trim);
		
//		this.updateFooter(Constants.state.CUSTOMIZE_DERIVATIVE);
	};

	var selectColor = function(data) {
		var colorCollection = dataLoader.colors();
//		var trimView = new views.TrimListView({collection : data.color.get('trims')});
//		trimView.display();
		
		if (!data.isSystem) {
			viewManager.trims(data.color.get('trims'));
		}
		
		colorCollection.select(data.color);
		var selectedTrim = data.color.get('trims').getSelected();
		if (typeof selectedTrim === 'undefined' || selectedTrim == null) {
			selectedTrim = data.color.get('trims').at(0);
		}
		dataLoader.updateUserPrice('colour', data.color);
		//changing trim as part of selecting colour is always considered a system event, pass true to avoid
		//calling omniture
		Events.fireEvent(Events.eventList.buildandprice.model.TrimSelectedEvent.name, {trim: selectedTrim, isSystem : true});
//		updateFooter();
	};
	
	
	var registerEvents = function() {
		
		Events.bind(Events.eventList.buildandprice.model.TrimSelectedEvent.name, 
				Events.eventList.buildandprice.model.TrimSelectedEvent.handler, this);
		
		Events.bind(Events.eventList.buildandprice.model.ColorChangedEvent.name, 
				Events.eventList.buildandprice.model.ColorChangedEvent.handler, this);
		
		return publicMethods;
	};
	
	
	var go = function() {
		
		Events.fireEvent(Events.eventList.buildandprice.router.BlockUIEvent);
		dataLoader.fetch('Categories', 
						{modelId: options.modelId,
						 path: options.path, 
						 derivativeId: options.derivativeId, 
						 engineId: options.engineId, 
						 cleanup : cleanup,
						 callback: display});
	};
	

	var cleanup = function() {
		dataLoader.clearStorageForStep(Constants.state.CUSTOMIZE_DERIVATIVE);
	};
	
	var display = function() {
			
			//displayDerivativeDetailView(modelId, path, derivativeId);
			Events.fireEvent(Events.eventList.buildandprice.omniture.StateChangedEvent,
					{ state: Constants.state.CUSTOMIZE_DERIVATIVE, path: options.path, storage: dataLoader.storage.storageModel });
		var colorCollection = dataLoader.colors();
		var selectedColor = colorCollection.getSelected();
		if (typeof selectedColor === 'undefined' || selectedColor == null) {
			selectedColor = colorCollection.at(0);
		}
		Events.fireEvent(Events.eventList.buildandprice.model.ColorChangedEvent.name, {color: selectedColor , isSystem: true});
		dataLoader.derivativeDetails().trigger(Events.eventList.buildandprice.router.LoadCompleteEvent);
		
		
		var panelData = dataLoader.panel({state: Constants.state.CUSTOMIZE_DERIVATIVE, modelId: options.modelId, 
			 path: options.path,
			 derivativeId: options.derivativeId, 
			 engineId: options.engineId});

		var headerCollection = BnP.CommonHelper.isPackagePath(options.path) ? dataLoader.packages() : dataLoader.derivatives();

		viewManager.page()
		.colors(colorCollection, selectedColor.get('trims'), dataLoader.gallery(), dataLoader.hotdeal())
				.panel(panelData)
				.header(dataLoader.header({
					name: headerCollection.getSelected().get('name'),
					panel : panelData
				}))
		.go();
		Events.fireEvent(Events.eventList.buildandprice.router.UnblockUIEvent);
	};

	var updateOptions = function(newOptions) {
		options = newOptions;
	};
	
	var publicMethods = {
		registerEvents: registerEvents,
		updateOptions: updateOptions,
		go: go
	};
	
	return publicMethods;
	
};


/**
 * 
 */

var BnP = BnP || {};

/*******************************START OF DATA LOADER*********************/
BnP.AccessoriesModule = function(dataLoader, viewManager, options) {
	
	
	
	Events.eventList.buildandprice.model.FeatureSelectedEvent.handler = function(model) {
		toggleFeaturesByType(model);
			//updateFooter(Constants.state.CUSTOMIZE_DERIVATIVE);
	};
	
	Events.eventList.buildandprice.model.OrientationChangedEvent.handler = function() {
//		Events.fireEvent(Events.eventList.buildandprice.omniture.OrientationChangedEvent, {storage: dataLoader});
	};
	
	Events.eventList.buildandprice.model.handler = function() {
//			Events.fireEvent(Events.eventList.buildandprice.omniture.ViewAccessoryDetailsEvent, {storage: dataStore.storage});
	};
	
	var updateOptions = function(newOptions) {
		options = newOptions;
	};
	
	var toggleFeaturesByType = function(model) {
		//console.log('toggle feature by type');
		//call the appropriate feature method based on flags set
		if (model.get('isOptionPack')) {
			toggleOptionPackSelection(model, false);
		} else if (model.get('isMutuallyExclusive')) {
			toggleMutuallyExclusiveFeatureSelection(model, false);
		} else if (model.get('hasDependentFeatures')) {
			toggleDependentFeatureSelection(model, false);
		} else {
			toggleFeatureSelection(model);
		}
	};
	
	
	var toggleOptionPackSelection = function(model, isPartOfAnotherAccessory, isSelectedByParent) {
		var isSelected;
		if (!isPartOfAnotherAccessory) {
			isSelected = !model.get('selected');
			model.set('selected', isSelected);
			//now that prices of feature groups have been removed add price of option pack to total price.
			dataLoader.updateUserPriceFeatures(model);
			//update the gallery
//			this.updateFeatureInGallery(model, false);
		} else if (typeof isSelectedByParent !== 'undefined'){
			isSelected = isSelectedByParent; //model is already uptodate, do not modify
		}
		
		var fgAttr = model.get('featureGroupAttributes');
		if (fgAttr != null && fgAttr.length > 0) {
			var categoryGroupCollection = dataLoader.categoryGroups();
			var message = isSelected ? Constants.bpt.featurePartOfOptionPack : '';
			//pass null for select to preserve previous value of the feature.
			var selectedFeatureGroups = 
				categoryGroupCollection.toggleFeatures(fgAttr.pluck('id'), null, isSelected);
			_.each(selectedFeatureGroups, function(selectedFeatureGroup) {
				var isOptionPackDeselectedAndFeatureSelected = !isSelected && selectedFeatureGroup.get('selected');
				//Two conditions:
				//1- When option is selected, we must pass false as we DO NOT want the price of featureGroupAttributes in Option pack
				//only price of option pack is calculated.
				//2- When option is not selected, if featureGroupAttribute was previously selected, add its value back to total value
				dataLoader.updateUserPriceFeatures(selectedFeatureGroup, isOptionPackDeselectedAndFeatureSelected);
				
				//update the gallery, pass false to hide these features from the gallery
				//this.updateFeatureInGallery(selectedFeatureGroup, isSelected ? false : selectedFeatureGroup.get('selected'));
				selectedFeatureGroup.set('message', message);
				//console.log('toggleOptionPackSelection -> ' + selectedFeatureGroup.get('name') + ' message = ' + message);
				
				if (selectedFeatureGroup.get('isMutuallyExclusive')) {
					toggleMutuallyExclusiveFeatureSelection(selectedFeatureGroup,true,isSelected || selectedFeatureGroup.get('selected'));
				} else if (selectedFeatureGroup.get('hasDependentFeatures')) {
					//this feature is only have a parent when option pack is selected
					toggleDependentFeatureSelection(selectedFeatureGroup, true, isSelected || selectedFeatureGroup.get('selected'), isSelected);
				}
			}, this);
		}
		/*
		 * Option packs dependent features can ONLY be other Option packs 
		 * 
		 */
		if (model.get('hasDependentFeatures')) {
			var fgAttrIds = model.get('dependentFeaturesIds');
			if (fgAttrIds != null && fgAttrIds.length > 0) {
				//find dependent features of option pack and select them
				var categoryGroupCollection = dataLoader.categoryGroups();
				var optionPacksDependentFeatures = 
					categoryGroupCollection.fetchFeatures(fgAttrIds);
				
				var message = isSelected ? Constants.bpt.featurePartOfDependentFeature : '';
				
				_.each(optionPacksDependentFeatures, function(optionPacksDependentFeature) {
					
					if (optionPacksDependentFeature.get('isOptionPack')) {
						//this.toggleOptionPackSelection(model, true);
						//optionPacksDependentFeatureIds.push(optionPacksDependentFeature.get('id'));
						
//						if (optionPacksDependentFeatureIds.length > 0) {
							var selectedOptionPacksDependentFeatures = 
								categoryGroupCollection.toggleFeatures(new Array(optionPacksDependentFeature.get('id')), null, isSelected);
							_.each(selectedOptionPacksDependentFeatures, function(selectedOptionPacksDependentFeature) {
								
								dataLoader.updateUserPriceFeatures(optionPacksDependentFeature, isSelected);
//								//update the gallery
//								this.updateFeatureInGallery(optionPacksDependentFeature, isSelected);
								
								optionPacksDependentFeature.set('message', message);
								//console.log('toggleOptionPackSelection -> ' + optionPacksDependentFeature.get('name') + ' message = ' + message);
								
								if (!isSelected && selectedOptionPacksDependentFeature.get('selected')) {
									selectedOptionPacksDependentFeature.set('selected', false, {silent: true});
									toggleOptionPackSelection(selectedOptionPacksDependentFeature, false);
								} else {
									toggleOptionPackSelection(selectedOptionPacksDependentFeature, true, isSelected);
								}
							}, this);
//						}
						
						
					} else {
						window.alert('Unsupported publishing configuration: Dependent Features of Option pack' + 
								model.get('id') + ' Can only be other option packs, '
								+ optionPacksDependentFeature.get('id') + ' is not an option pack');
					}
				}, this);
			}
		}
	};
	/**
	 * 
	 * @param model
	 * @param isPartOfAnotherAccessory
	 * @param isParentSelectedOrWasSelected a feature might not be truly selected (selected flag has not been set to preserve previous state), but
	 *  it is selected as part of its parent. 
	 */
	var toggleDependentFeatureSelection = function(model, isPartOfAnotherAccessory, isParentSelectedOrWasSelected, isParentSelected) {
		var isSelected;
		if (!isPartOfAnotherAccessory) {
			isSelected = !model.get('selected');
			model.set('selected', isSelected);
			//now that prices of feature groups have been removed add price of option pack to total price.
			dataLoader.updateUserPriceFeatures(model, isSelected);
			//update the gallery
//			this.updateFeatureInGallery(model, isSelected);
			isParentSelected = isSelected;
		} else if (typeof isSelectedByParent !== 'undefined') {
			isSelected = isParentSelectedOrWasSelected;
		} 
		
		var fgAttrIds = model.get('dependentFeaturesIds');
		if (fgAttrIds != null && fgAttrIds.length > 0) {
			var categoryGroupCollection = dataLoader.categoryGroups();
			//according to the requirements mutual exclusive features are all mutual
			//i.e. if A is MX with B and C, B is MX with C and A, C is MX with A and B.
			//but the publisher may make a mistake.
			var selectedDependentFeatures = categoryGroupCollection.fetchFeatures(fgAttrIds);
			_.each(selectedDependentFeatures, function(selectedDependentFeature) {
				//console.log('dependentFeatureLockCount ->' + selectedDependentFeature.get('dependentFeatureLockCount'));
					selectedDependentFeature.set('dependentFeatureLockCount', 
							selectedDependentFeature.get('dependentFeatureLockCount') + (isParentSelected ? 1 : -1) );
//					Util.log('Parent Feature ' + model.get('name') +
//							' updated the lock for ' + 
//							selectedDependentFeature.get('name') + 
//							' to ' + selectedDependentFeature.get('dependentFeatureLockCount'));
				
				selectedDependentFeature.set('message', 
						(!isParentSelectedOrWasSelected && 
						selectedDependentFeature.get('dependentFeatureLockCount') === 0) ?
						'' : 
						Constants.bpt.featurePartOfDependentFeature);
				
				//console.log('toggleDependentFeatureSelection -> ' + selectedDependentFeature.get('name') + ' message = ' + selectedDependentFeature.get('message'));
			});
			
			selectedDependentFeatures = 
				categoryGroupCollection.toggleFeatures(fgAttrIds, null, isSelected);
			
			_.each(selectedDependentFeatures, function(selectedDependentFeature) {
				
				if (selectedDependentFeature.get('hasDependentFeatures')) {
					window.alert('Unsupported publishing configuration: Feature ' + 
							selectedDependentFeature.get('id') +
							' is a dependent features. Cascading dependent features are not supported.');
				}
				
				
				//Util.log(selectedDependentFeature.get('name') + ' has ' + selectedDependentFeature.get('dependentFeatureLockCount') + ' locks');
				//if parent feature is selected, add the child to the total price
				//otherwise see if it was previously selected, if so add it to the price
				dataLoader.updateUserPriceFeatures(selectedDependentFeature, isSelected || selectedDependentFeature.get('selected'));
				//if parent feature is selected, display the child
				//otherwise see if it was previously selected, if so display the child
//				this.updateFeatureInGallery(selectedDependentFeature, isSelected || selectedDependentFeature.get('selected'));
				
			}, this);
		}
	};
	
	var toggleMutuallyExclusiveFeatureSelection = function(model, isPartOfAnotherAccessory, isSelectedByParent) {
		var isSelected;
		if (!isPartOfAnotherAccessory) {
			isSelected = !model.get('selected');
			model.set('selected', isSelected);
			//now that prices of feature groups have been removed add price of option pack to total price.
			dataLoader.updateUserPriceFeatures(model,isSelected);
			//update the gallery
//			this.updateFeatureInGallery(model,isSelected);
		} else if (typeof isSelectedByParent !== 'undefined'){
			isSelected = isSelectedByParent; //model is already uptodate, do not modify
		}
		
		if (!isSelectedByParent && !isPartOfAnotherAccessory && isSelected) {
			model.set('message', '');
		}
		var fgAttr = model.get('featureGroupAttributes');
		if (fgAttr != null && fgAttr.length > 0) {
			var categoryGroupCollection = dataLoader.categoryGroups();
			//according to the requirements mutual exclusive features are all mutual
			//i.e. if A is MX with B and C, B is MX with C and A, C is MX with A and B.
			//but the publisher may make a mistake.
							
			var selectedFeatureGroups = 
				categoryGroupCollection.toggleFeatures(fgAttr.pluck('id'), null, isSelected);
			var message = isSelected ? Constants.bpt.featurePartOfMutualExclusive : '', 
				selectedFeatureGroup;
			
			
			for(var i = 0; i < selectedFeatureGroups.length; i++) {
				selectedFeatureGroup = selectedFeatureGroups[i];
				
				if (isPartOfAnotherAccessory && !isSelected && selectedFeatureGroup.get('selected')) {
					selectedFeatureGroup.set('selected', false, {silent: true});
					toggleMutuallyExclusiveFeatureSelection(selectedFeatureGroup, false);
					return;
				}
				
				
				//while we are keeping the state of the features, we should remove them from userPref storage
				//to ensure price is up to date.
				dataLoader.updateUserPriceFeatures(selectedFeatureGroup, false);
				//update the gallery, pass false to hide these features from the gallery
//				this.updateFeatureInGallery(selectedFeatureGroup, false);
				
				if (selectedFeatureGroup.get('hasDependentFeatures')) {
					window.alert('Unsupported publishing configuration: Feature ' + 
							selectedFeatureGroup.get('id') +
							' is mutually exclusive and has dependent features. This tool does not support this combination.');
				} else if (selectedFeatureGroup.get('isOptionPack')) {
					window.alert('Unsupported publishing configuration: Feature ' + 
							selectedFeatureGroup.get('id') +
							' is mutually exclusive and is an option pack. This tool does not support this combination.');
				}
				//console.log('feature ID: ' + selectedFeatureGroup.id + ' feature name ' + selectedFeatureGroup.get('name'));
				selectedFeatureGroup.set('message', message);
				
			}
			
		}
		
	};
	
	var toggleFeatureSelection = function(model) {
		model.set({'selected': !model.get('selected'), 'message' : ''});
		dataLoader.updateUserPriceFeatures(model);
//		this.updateFeatureInGallery(model);
	};
	
//	var updateFeatureInGallery = function(model, isShown) {
//		//only switch to an exterior view when on interior view and feature is selected 
//		if (dataLoader.currentGalleryView() !== Constants.view.exterior) {
//			if (model.get('spriteMidResUrl') !== '' && (typeof isShown !== 'undefined' ? isShown : true)) {
//				Events.fireEvent(Events.eventList.buildandprice.model.ToggleViewEvent.name,Constants.view.exterior);
//			} 
//		} else {
//			var gallery = dataLoader.gallery().toggleLayer(model.get('id'), isShown);
//		}
//	};
	
	
	
	var registerEvents = function() {
		
		
		Events.bind(Events.eventList.buildandprice.view.ViewAccessoryDetailsEvent, 
				Events.eventList.buildandprice.model.ViewAccessoryDetailsEvent.handler, this);
		
		
		Events.bind(Events.eventList.buildandprice.model.FeatureSelectedEvent.name,
				Events.eventList.buildandprice.model.FeatureSelectedEvent.handler, this);
		
		return publicMethods;
	};
	
	var go = function() {
		//console.log('navToAccessoryPage:' + options.step);
		Events.fireEvent(Events.eventList.buildandprice.router.BlockUIEvent);
		dataLoader.fetch( 'Categories', 
				{modelId: options.modelId, 
				 path: options.path, 
				 derivativeId: options.derivativeId, 
				 engineId: options.engineId,
				 cleanup : cleanup,
				 callback: display});
	};
	
	var cleanup = function() {
		//console.log("accessories.js ----> dataLoader.fetch( 'Categories') clean up called");
		dataLoader.clearStorageForStep(Constants.state.CUSTOMIZE_DERIVATIVE);
	};
	
	var display = function() {		
			
			var categoryGroupCollection = dataLoader.categoryGroups(),
				category = categoryGroupCollection.selectCategoryById(options.step);
			
			if (category != null) {
				var colorCollection = dataLoader.colors(),
					selectedColor = colorCollection.getSelected();
				if (typeof selectedColor === 'undefined' || selectedColor == null) {
					selectedColor = colorCollection.at(0);
					Events.fireEvent(Events.eventList.buildandprice.model.ColorChangedEvent.name, {color: selectedColor , isSystem: true});
				}
				var gallery = dataLoader.gallery();
				if (dataLoader.currentGalleryView() !== Constants.view.exterior) {
					gallery.get('gallery').toggleLayer(selectedColor.id);
				}
				
				var headerCollection = BnP.CommonHelper.isPackagePath(options.path) ? dataLoader.packages() : dataLoader.derivatives();				
				
				var panelData = dataLoader.panel({state: Constants.state.CUSTOMIZE_DERIVATIVE, modelId: options.modelId,  path: options.path,
					 derivativeId : options.derivativeId, 
					 engineId: options.engineId, categoryId : category.id});
				
				viewManager.page()
				.accessories(category, gallery, dataLoader.hotdeal())
								.panel(panelData)
								.header(dataLoader.header({
									name: headerCollection.getSelected().get('name'),
									panel: panelData
								}))
				.go();
			} else {
				viewManager.page().error(dataLoader.error()).go();
			}

			categoryGroupCollection.selectById(category.id);
			dataLoader.storage.store(Constants.storage.categoryGrpCollection, $.extend({ derivativeId: options.derivativeId, categories: categoryGroupCollection }, categoryGroupCollection));
			Events.fireEvent(Events.eventList.buildandprice.omniture.StateChangedEvent,
                                    { state: Constants.state.CUSTOMIZE_DERIVATIVE, path: options.path, storage: dataLoader.storage.storageModel });
			Events.fireEvent(Events.eventList.buildandprice.router.UnblockUIEvent);
		
	};
	
	var publicMethods = {
		registerEvents: registerEvents,
		updateOptions: updateOptions,
		go: go,
		storage: dataLoader.storage
	};
	
	return publicMethods;
	
};

			
			
			


/**
 * 
 */
var BnP = BnP || {};

/*******************************START OF DATA LOADER*********************/
BnP.SummaryModule = function(dataLoader, viewManager, options) {
	//modelId, options.path, derivativeId, footer, options.isLoadingConfig, showPricesLater
	
	Events.eventList.buildandprice.model.SaveAsPDFEvent.handler =  function () {
			
		var inclusionList = ['modelId',
		 					'derivativeId',
		 					'packageId',
		 					'colourId',
		 					'postcode',
		 					'usage',
		 					'priceZoneId',
		 					'site',
		 					'trimId',
		 					'engineId',
		 					'features'];
		var params = '?';
		var value = null;
		_.each(inclusionList, function(key) {
			value = dataLoader.userPref.get(key);
			if (value !== undefined && value != null) {
				if (key !== 'features') {
					params += (key + '=');
					params += (value + '&');
				} else {
					params += ('features=');
					params += (value.join(',') + '&');
				}
			}
		}, this);
		if (params.length > 1 && (params.charAt(params.length - 1) === '&')) {
			params = params.substring(0,params.length - 1 );
		}
		
		var vehicleName = '';
		var path;
		dataLoader.getSelectedPackageDerivative(
			 {
				pkgCallback: function(pkg) {
					vehicleName = pkg.get('name');
					path = Constants.path.pkg;
				},
				drvCallback : function(drv) {
					vehicleName = drv.get('name');
					path = Constants.path.drv;
				}
			});
//				var nameplateCollection = this.storage.get(Constants.storage.nameplateCollection);
//				var nameplate = nameplateCollection.getSelected();
		//Events.fireEvent(Events.eventList.buildandprice.omniture.SaveAsPDFEvent, {storage: this.storage});
		window.open(Config.buildandprice.urls.viewPDFURL + vehicleName + params);
	};

	Events.eventList.buildandprice.model.ShareConfigEvent.handler = function() {
		dataLoader.userPref.url = Config.buildandprice.urls.shareURL;
		Events.fireEvent(Events.eventList.buildandprice.router.BlockUIEvent);
                  
		dataLoader.userPref.save().done(function(model, response) {
			Events.fireEvent(Events.eventList.buildandprice.router.UnblockUIEvent);
			Events.fireEvent(Events.eventList.buildandprice.router.ShareReadyEvent, model.url);
		}).fail(function() {
			Events.fireEvent(Events.eventList.buildandprice.model.ErrorOccuredEvent.name);
		});
	};

	Events.eventList.buildandprice.model.RequestAQuoteEvent.handler = function(formId) {
		var colorCollection = dataLoader.colors();
		var color = colorCollection.getSelected();
		var trim = color.get('trims').getSelected();
		
		var nameplateCollection = dataLoader.nameplates();
		var nameplate = nameplateCollection.getSelected();
		
		var derivative = dataLoader.derivativeDetails();
		var engineName = '';
		var engineId  = '';
		var packageId = '';
		dataLoader.getSelectedPackageDerivative(
		 {
			pkgCallback:function(pkg) {
				engineName = derivative.get('engineTransmission');
				engineId = derivative.get('engineId');
				packageId = derivative.get('id');
			}, 
			drvCallback : function(drv) {
				var derivativeCollection = dataLoader.derivatives();
				var engine = derivativeCollection.getSelected().get('engines').getSelected();
				engineName = engine.get('name');
				engineId = engine.get('id');
			}
		});
		
		var data = {
			makeckscode : nameplate.get('makeCode'),
			makeid : nameplate.get('makeId'),
			makename: nameplate.get('makeName'),
			
			modelckscode: nameplate.get('modelCode'),
			modelid: nameplate.get('id'),
			modelname: nameplate.get('name'),
			
			pricezoneid: dataLoader.userPref.get('priceZoneId'),
			
			derivativeyear: derivative.get('year'),
			
			derivativeckscode: derivative.get('derivativeCode'),
			derivativename: derivative.get('name'),
			
			enginename: engineName,
			engineid: engineId,
			
			colourname: color.get('name'),
			trimname: trim.get('name'),
			colourid: color.get('id'),
			trimid: trim.get('id'),
			//[SOHRAB] why do we need to check for uniqueness of features. if they are not unique, then there is a bug somewhere
			//and we should fix it.
			//features: _.uniq(dataLoader.userPref.get('features')).join(',')
			features: dataLoader.userPref.get('features').join(',')
		};
		//construct the ctx parameter.
		var ctx = 'm:' + data.modelid + ';';
		if (packageId !== '') {
			data.packageid = packageId;
		} else {
			data.derivativeid = derivative.get('id');
			ctx += 'd:' + data.derivativeid;
		}
		var postcode = dataLoader.userPref.get('postcode');
		if (ConfigUtil.showPostcodeSelect() && postcode !== '') {
			data.postcode = postcode;
			data.usage = dataLoader.userPref.get('usage');
		}
		
		$.each(data, function(key) {
			$('#bp-rq-' + key).val(data[key]);
		});
		var site = dataLoader.userPref.get('site');
		var form = $(formId);
		if (site && site === 'FMX') {
			var action = form.attr('action');
			action += ('&cat=' + data.derivativeckscode + 
					   '&opc=Color Exterior - ' + data.colourname + ', Color Interior -' + data.trimname);
			form.attr('action', action);
		}
		//append ctx parameter
		form.attr('action', form.attr('action') + '&ctx=' + ctx);
		
		form.submit();
			
	};

	if(typeof Events.eventList.buildandprice.model.PresentPaymentEvent !== "undefined"){
		Events.eventList.buildandprice.model.PresentPaymentEvent.handler = function(formId) {

			var nameplateCollection = dataLoader.nameplates();
			var nameplate = nameplateCollection.getSelected();
			
			//construct the ctx parameter.
			var submitBtn = $("#bp-payment-presenter-btn");
			var currentUrl = submitBtn.data("url");
			var separator = (currentUrl.indexOf("?")===-1)?"?":"&";
			var ctx = 'm:' + nameplate.get('id');
			
			var newUrl = currentUrl + separator + "ctx=" + encodeURIComponent(ctx);
			
			window.location.href = newUrl;
		};
	}
	

	Events.eventList.buildandprice.model.ShareLinkClickedEvent.handler = function(provider) {
	//				Analytics.trackOmnitureAction.call(this, 'ShareLink', provider);
	//				Events.fireEvent(Events.eventList.buildandprice.router.ActionTriggeredEvent, {action : 'ShareLink', value: provider});
	    Events.fireEvent(Events.eventList.buildandprice.omniture.ShareLinkClickedEvent, { provider: provider, storage: dataLoader.storage.storageModel });
	};
	
	var registerEvents = function() {
		
		Events.bind(Events.eventList.buildandprice.model.SaveAsPDFEvent.name,
				Events.eventList.buildandprice.model.SaveAsPDFEvent.handler, this);
		
		Events.bind(Events.eventList.buildandprice.model.ShareConfigEvent.name,  
				Events.eventList.buildandprice.model.ShareConfigEvent.handler, this);
		
		
		Events.bind(Events.eventList.buildandprice.model.RequestAQuoteEvent.name, 
				Events.eventList.buildandprice.model.RequestAQuoteEvent.handler, this);
		
		if(typeof Events.eventList.buildandprice.model.PresentPaymentEvent !== "undefined"){
			Events.bind(Events.eventList.buildandprice.model.PresentPaymentEvent.name, 
					Events.eventList.buildandprice.model.PresentPaymentEvent.handler, this);
		}


		Events.bind(Events.eventList.buildandprice.view.ShareLinkClickedEvent, 
				Events.eventList.buildandprice.model.ShareLinkClickedEvent.handler, this);
		
		return publicMethods;
	};
	
	var fetchPolkPrice = function(data) {
		//console.log('fetchPolkPrice()');
		$.ajax({
			dataType: 'json',
			url:Config.buildandprice.urls.driveawayURL + '&data=' + JSON.stringify(data),
			success: function(result, textStatus, jqXHR) {
				if (result.error === false) {
					if (result.derivatives && result.derivatives.length > 0) {
						var polkPrice = dataLoader.userPref.totalWithPOLK(result.derivatives[0].price);
						dataLoader.userPref.set('unformattedPolkPrice', polkPrice);
						dataLoader.userPref.set('polkPrice', ND.PriceFormatter.format(polkPrice.toString()));
						options.footer.set('hasError', false);
					}
				} else {
					options.footer.set('hasError', true);
					dataLoader.userPref.set('unformattedPolkPrice', null);
					dataLoader.userPref.set('polkPrice', result.errorMessage);
				}
				
				data.callback();
			},
			error: function (request, error) {
				//ignore?	
				options.footer.set('hasError', true);
				dataLoader.userPref.set('polkPrice', Constants.bpt.errorCalcPrice);
				dataLoader.userPref.set('unformattedPolkPrice', null);
				data.callback();
			}
		});
	};
	
	var go = function() {
		
		Events.fireEvent(Events.eventList.buildandprice.router.BlockUIEvent);
		options.isLoadingConfig = (typeof options.isLoadingConfig !== 'undefined') ? options.isLoadingConfig : false;
		options.showPricesLater = (typeof options.showPricesLater !== 'undefined') ? options.showPricesLater : false;
		options.step = Constants.state.SUMMARY;
		options.footer = dataLoader.footer(options);
		
		//console.log('usePolkPricing for path: ' + options.path + ' ' + ConfigUtil.usePolkPricing(options.path));
		if (ConfigUtil.usePolkPricing(options.path)) {
			
			var tmpPostcode= dataLoader.userPref.get('tempPostcode');
			var tmpUsage = dataLoader.userPref.get('tempUsage');
			var postcode = dataLoader.userPref.get('postcode');
			var usage = dataLoader.userPref.get('usage');
			if (tmpPostcode != postcode || tmpUsage != usage) {
				
				var postcodeHint = Constants.bpt.postcodeMisMatch;
				if (tmpPostcode === undefined || tmpPostcode == null || tmpUsage === undefined ||
					tmpUsage == null || tmpPostcode === '') {
					postcodeHint = postcodeHint.replace(/%1/g, Constants.bpt.regionNotSpecified)
					.replace(/%2/g, '');
				} else {
					postcodeHint = postcodeHint
					.replace(/%1/g, tmpPostcode)
					.replace(/%2/g, BnP.CommonHelper.getUsageLabelFromLabel(tmpUsage));
				}
				if (postcode === undefined || usage === undefined || 
					postcode == null || usage == null || postcode === '') {
					postcodeHint = postcodeHint.replace(/%3/g, Constants.bpt.yourRegionNotSpecified).replace(/%4/g, '');
				} else {
					postcodeHint = postcodeHint
					.replace(/%3/g, postcode)
					.replace(/%4/g, BnP.CommonHelper.getUsageLabelFromLabel(usage));
				}
				
				options.footer.set("postcodeHint", postcodeHint);
			}
			
			if (typeof tmpPostcode === 'undefined') {
				options.footer.set("postcodeHint", null);
			}
			
			var userJSON = dataLoader.userPref.toJSON();
			tmpPostcode = (typeof tmpPostcode !== 'undefined')  ? tmpPostcode : null;
			tmpUsage = (typeof tmpUsage !== 'undefined') ? tmpUsage : null;
			var data = {
				'postcode' : userJSON.postcode,
				'usage' : userJSON.usage,
				'options' : dataLoader.userPref.totalOptionsForPOLK(),
				'engineid' : userJSON.engineId,
				'derivatives' : new Array(userJSON.derivativeId)
			};
			if (tmpPostcode != null && tmpUsage != null) {
				data.postcode = tmpPostcode;
				data.usage = tmpUsage;
			}
			dataLoader.userPref.unset('tempPostcode'); //remove these attributes
			dataLoader.userPref.unset('tempUsage');
			
			if (data.postcode != null && data.postcode !== '' && data.usage != null && data.usage !== '') {
				data.callback = display;
				fetchPolkPrice(data);
			} else {
				options.footer.set('hasError', true);
				dataLoader.userPref.set('polkPrice', Constants.bpt.selectRegionToViewPrices);
				dataLoader.userPref.set('unformattedPolkPrice', null);
				display();
			}
			
		} else {
			display();
		}
	};
	
	var display = function() {
		options.footer.set('id', options.derivativeId);
		options.footer.set('priceZoneId', dataLoader.pricezoneId());
		options.footer.set('isPackage', options.path === Constants.path.pkg);
		var color = dataLoader.colors().getSelected();
		options.footer.set('vehicleThumbnailUrl', color.get('thumbnailUrl'));
//		var nameplateId = dataLoader.nameplates().getSelected().get('id');
//		this.updateHeader(Constants.state.CUSTOMIZE_DERIVATIVE, Helper.constructStepUrl.call(this,
//				{step: Constants.state.CUSTOMIZE_DERIVATIVE,
//				 modelId : modelId,
//				 path: path,
//				 derivativeId : derivativeId}));
//		this.updateHeader(Constants.state.SUMMARY, Helper.constructStepUrl.call(this, 
//				{step : Constants.state.SUMMARY, 
//				 modelId : modelId,
//				 path: path,
//				 derivativeId: derivativeId}));
		
//		this.updateFooter();
		var summaryCategories = new collections.SummaryCategoryCollection();
		var categoryGroupCollection = dataLoader.categoryGroups();
		var trim = color.get('trims').getSelected();
		var colorTrimPrice = parseFloat(color.get('price')) + parseFloat(trim.get('price'));
		var categorySummary = new models.SummaryCategory({category : Constants.bpt.ct, 
													  categoryTotal : ND.PriceFormatter.format(colorTrimPrice.toString()), 
													  order : 1});
		var summaryFeatures = new collections.SummaryFeatureCollection();
		summaryFeatures.add(new models.SummaryFeature({name : color.get('name'), price : ND.PriceFormatter.format(color.get('price')), nameSuffix : Constants.priceSuffix.colour}));
		summaryFeatures.add(new models.SummaryFeature({name : trim.get('name'), price : ND.PriceFormatter.format(trim.get('price'))}));
		categorySummary.set(Constants.attr.feats, summaryFeatures);
		summaryCategories.add(categorySummary);
		BnP.CommonHelper.postProcessCategoryGroups(categoryGroupCollection, categorySummary, summaryFeatures, summaryCategories, dataLoader.userPref.get(Constants.attr.feats));
		updateFooter();
		
		var panelData = dataLoader.panel({state: Constants.state.SUMMARY, modelId: options.modelId,  path: options.path,
			 derivativeId : options.derivativeId, 
			 engineId: options.engineId});
		
		var gallery = dataLoader.gallery();
		if (dataLoader.currentGalleryView() !== Constants.view.exterior) {
			var colorCollection = dataLoader.colors(),
			selectedColor = colorCollection.getSelected();
			gallery.get('gallery').toggleLayer(selectedColor.id);
		}
		
		var headerCollection = BnP.CommonHelper.isPackagePath(options.path) ? dataLoader.packages() : dataLoader.derivatives();

		viewManager.page()
		.summary(options.footer, summaryCategories, gallery, dataLoader.hotdeal())
		.panel(panelData)
		.header(dataLoader.header({
			name: headerCollection.getSelected().get('name'),
			panel: panelData
		})).go();
		
//		viewManager.displayParentView(views.Summary, footer);
//		displayHeadersView(nameplateId, options.path);
//		viewManager.displayTitleView(new models.PageTitleModel({title: null,
//				showLatestOffersBtn: (ConfigUtil.showPostcodeSelect() && (options.path !== Constants.path.pkg))}));
		
		//update customize derivative header as well to fix reload configuration navigation error.
		
//		viewManager.displayChildView(views.BackButtonView, footer);
//		viewManager.displayChildView(views.PriceCategoryBreakdownListView, summaryCategories);
		
		
		
		
		Events.fireEvent(Events.eventList.buildandprice.omniture.StateChangedEvent, 
				{ state: Constants.state.SUMMARY, path: options.path, storage: dataLoader.storage.storageModel, userPref: dataLoader.userPref });
		if (options.askForPostcodeLater && ConfigUtil.showPostcodeSelect()) {
			Events.fireEvent(Events.eventList.buildandprice.router.AskForPostcodeEvent, true);
		}
		if (options.showPricesLater && ConfigUtil.showPrices()) {
			Events.fireEvent(Events.eventList.buildandprice.router.ShowPricesLaterEvent);
		}
		Events.fireEvent(Events.eventList.buildandprice.router.UnblockUIEvent);
	};
	
	var updateFooter = function(){
//		switch(step) {
//			case Constants.state.SELECT_ENGINE:
//				if (engines && engines != null) {
//					selectedEngine = engines.getSelected();
//					engineSelected = selectedEngine != null;
//					if (engineSelected) {
//						engineName = selectedEngine.get('name');
//					}
//				}
//				//NO break;
//			case Constants.state.SELECT_DERIVATIVE: 
//			case Constants.state.SELECT_PACKAGE: 
//				var self = this;
//				this.getSelectedPackageDerivative(
//					this.storage,{
//					pkgCallback: function(pkg) {
//						nextButtonPath = Helper.constructStepUrl.call(self,
//																	 {step: Constants.state.CUSTOMIZE_DERIVATIVE, 
//																	  path: Constants.path.pkg, 
//																	  derivativeId : pkg.get('id'),
//																	  modelId : modelId});
//						engineName = pkg.get('engineTransmission');
//						engineSelected = true;
//						//price has to match the selected package and need to say from x price
//						price = Constants.bpt.f + pkg.get('displayPrice');
//						vehicleName = pkg.get('name');
//					}, 
//					drvCallback : function(drv) {
//						nextButtonPath = Helper.constructStepUrl.call(self,
//																	 {step: Constants.state.CUSTOMIZE_DERIVATIVE, 
//							 										  path: Constants.path.drv, 
//							 										  derivativeId : drv.get('id'),
//																	  modelId : modelId});
//						vehicleName = drv.get('name');
//						//price has to match the selected derivative and need to say from x price
//						if (engineSelected) {
//							price = Constants.bpt.f + ND.PriceFormatter.format(selectedEngine.get('price').toString());
//						} else {
//							price = Constants.bpt.f + drv.get('displayPrice');
//						}
//					}
//				});
//				var prevPageLabel = null;
//				var prevButtonPath = null;
//				if (!ConfigUtil.isShortPath()) {
//					prevPageLabel = 'bpt-path-sel';
//					prevButtonPath = Helper.constructStepUrl.call(self,{step: Constants.state.SELECT_PATH, modelId: modelId});
//				}
////				Util.log('prevButtonPath: ' + prevButtonPath + ' prevPageLabel:' + prevPageLabel);
//				footer.update(vehicleName,
//						  price,
//						  engineName,
//						  engineSelected,
//						  nextButtonPath,
//						  prevButtonPath,
//						  Constants.header.c, 
//						  prevPageLabel);
//				break;	
//			case Constants.state.CUSTOMIZE_DERIVATIVE: 
//			case Constants.state.SUMMARY:	
				
//				var models = nameplates();
				var engines = null;
				var price = ND.PriceFormatter.format('0');
				var path;
				dataLoader.getSelectedPackageDerivative({
					pkgCallback:function(pkg) {
						path = Constants.path.pkg;
					}, 
					drvCallback: function(drv) {
						engines = drv.get('engines');
						path = Constants.path.drv;
					}
					});
				price = ND.PriceFormatter.format(dataLoader.userPref.total().toString());
				
				//console.log('userPref price is ' + price);
				
//				var selectedEngine = null, 
				var selectedModel = dataLoader.nameplates().getSelected();
				var engineName = '';
//				var nextButtonPath = '';
//				var engineSelected = false;
//				var vehicleName = '';
//				var selectedPathValue;
				var modelId = selectedModel.get('id');
//				Util.log('updateFooter: ' + step);
				
				var selectedDerivative,	isEngineSelected = false,
					//nextTabLabel = null,
//					prevTabLabel = null;
					//,nextTabHref = null,prevTabHref = null;
				selectedPathValue = Constants.path.pkg;
				prevTabLabel = Constants.bpt.packageSelect;
				dataLoader.getSelectedPackageDerivative({
					pkgCallback: function(pkg) {
						isEngineSelected = true;
						selectedDerivative = pkg;
						engineName = selectedDerivative.get('engineTransmission');
					}, 
					drvCallback: function(drv) {
						selectedPathValue = Constants.path.drv;
						var selectedEngine = engines.getSelected();
						isEngineSelected = (selectedEngine != null);
						selectedDerivative = drv;
						prevTabLabel = Constants.bpt.derivativeSelect;
						engineName = isEngineSelected ? selectedEngine.get('name') : '';
					}
				});
				
//				var categoryGroups = this.storage.get(Constants.storage.categoryGrpCollection);
//				if (step === Constants.state.CUSTOMIZE_DERIVATIVE) {
//					var currentTab = parseInt(categoryGroups.getSelected().get('order'));
//					
//					var nextTab = null;
//					var prevTab = null;
//					if ((currentTab + 1) < categoryGroups.length) {
//						nextTab = (currentTab + 1);
//						nextTabLabel = categoryGroups.at(nextTab).get('categoryGrouping');
//						nextTabHref = 'cat-group-' + nextTab;
//					} else {
//						nextTabHref = Helper.constructStepUrl.call(this,
//									{step: Constants.state.SUMMARY,
//									path: selectedPathValue,
//									derivativeId: selectedDerivative.get('id'),
//									modelId: modelId});
//						nextTabLabel = 'bpt-summary';
//					}
//					
//					if ((currentTab - 1) >= 0) {
//						prevTab = (currentTab - 1);
//						prevTabLabel = categoryGroups.at(prevTab).get('categoryGrouping');
//						prevTabHref = 'cat-group-' + prevTab;
//					} else {
//						prevTabHref = Helper.constructStepUrl.call(this,
//								{step: Constants.state.SELECT_PACKAGE, 
//								 path: selectedPathValue,
//								 modelId: modelId});
//								
//					}
////				} else { //Constants.state.SUMMARY
//					prevTabLabel = categoryGroups.at(0).get('categoryGrouping');
//					prevTabHref = Helper.constructStepUrl.call(this,
//							{step: Constants.state.CUSTOMIZE_DERIVATIVE, 
//							 path: selectedPathValue, 
//							 derivativeId : selectedDerivative.get('id'),
//							 modelId: modelId});
					if (ConfigUtil.showPostcodeSelect() && Constants.path.drv === path) {
						price = dataLoader.userPref.get('polkPrice');
						//console.log('polkPrice in userPref is ' + price);
					};
//				}
					
				options.footer.update(selectedDerivative.get('name'),
					  price,
					  engineName,
					  isEngineSelected
//					  ,
//					  nextTabHref,
//					  prevTabHref,
//					  nextTabLabel,
//					  prevTabLabel
					  );
//				break;
//			case Constants.state.SELECT_PATH:
//				break;
//			default : 
//				console.log('unknown step ' + step);
//		}
	};
	
	var updateOptions = function(newOptions) {
		options = newOptions;
	};
	
	var publicMethods = {
		registerEvents: registerEvents,
		updateOptions: updateOptions,
		go: go
	};
	
	return publicMethods;
	
};


/**
 * 
 */
var BnP = BnP || {};

/*******************************START OF DATA LOADER*********************/
BnP.RestoreModule = function(dataLoader, viewManager, options) {
	
	var registerEvents = function() {
		
		
		return publicMethods;
	};
	
	
	var go = function() {
		Events.fireEvent(Events.eventList.buildandprice.router.BlockUIEvent);
		//After restore finished, will change the url to summary page
		dataLoader.restoreAll(options.uuid,function(summaryURL){
			options.navigate(summaryURL,{trigger:false});
		});
		
	};
	
	var publicMethods = {
		registerEvents: registerEvents,
		go: go
	};
	
	return publicMethods;
	
};


/**
 * 
 */
(function(window,document, views, models, collections, $){
	
	
	var MobileBuildAndPriceApp = Backbone.Router.extend({
		
//		storage: null,
//		user : null,
//		price : null,
		
		routes: { 
		   
		    "load/:uuid" : "loadConfigAndNavToSummaryPage",
		    ":modelId/next" : "navToDecisionPage",
//		    "error" : "navToErrorPage",
		    "reset" : 'navToResetPage' //used to reset the tool 
		},
		
		initialize: function(options) {
			
			//Util.log('MobileBuildAndPriceApp.initialize()');
			this.configureRoutes();
//			this.storage = new models.Storage();
			this.registerEventListeners();
			this.dataLoader = BnP.DataLoader();
			this.viewManager = views.MasterView();
			this.modules = [];
			this.setupOnError();
			//if pricezone and postcode have been disabled, hide prices 
			if (!ConfigUtil.showPrices()) {
				Events.fireEvent(Events.eventList.buildandprice.router.HidePricesEvent, true);
				Events.fireEvent(Events.eventList.buildandprice.router.HideHotDealPricesEvent);
			} 
//			
		},
		
		setupOnError: function() {
			var self = this;
			window.onerror = function () {
				self.navigate('', {trigger : true});
				Events.fireEvent(Events.eventList.buildandprice.router.UnblockUIEvent);
			};
		},
		
		configureRoutes: function() {
			this.route("","navToNameplatesPage");
			this.route(":modelId/" + Constants.path.pth + '/' + Constants.path.pkg, "navToPackagesPage");				
			this.route(":modelId/" + Constants.path.pth,"navToPathsPage");
			if(!ConfigUtil.isShortPath()){
				this.route(":modelId/" + Constants.path.pth + '/' + Constants.path.drv, "navToDerivativesPage");
				this.route(":modelId/" + Constants.path.pth + '/' + Constants.path.drv + '/:derivativeId/engine', "navToEnginesPage");
			}
			this.route(":modelId/" + Constants.path.pth + '/:pathId/:derivativeId/engine/:engineId/customize/colors', "navToCustomizeDerivativePage");
			this.route(":modelId/" + Constants.path.pth + '/:pathId/:derivativeId/engine/:engineId/customize/accessories/:step', 'navToAccessoryPage');
			this.route(":modelId/" + Constants.path.pth + '/:pathId/:derivativeId/engine/:engineId/summary', "navToSummaryPage");
		},
		
		registerEventListeners : function() {
			Events.eventBus.context = this;
			//Events.eventBus.context = this;
			
			Events.bind(Events.eventList.buildandprice.model.ChangePostcodeOrPricezoneEvent.name,
					Events.eventList.buildandprice.model.ChangePostcodeOrPricezoneEvent.handler, this);
			
			if (ConfigUtil.showPricezones()) {
				Events.bind(Events.eventList.buildandprice.model.PricezoneSelectedEvent.name, 
						Events.eventList.buildandprice.model.PricezoneSelectedEvent.handler, this);
				
				Events.bind(Events.eventList.buildandprice.model.PricezoneChangeRequestEvent.name, 
						Events.eventList.buildandprice.model.PricezoneChangeRequestEvent.handler, this);
						
				Events.bind(Events.eventList.buildandprice.model.PricezoneCheckRequestEvent.name, 
						Events.eventList.buildandprice.model.PricezoneCheckRequestEvent.handler, this);
			}

			
			Events.bind(Events.eventList.buildandprice.model.StartOverEvent.name,
					Events.eventList.buildandprice.model.StartOverEvent.handler, this);
			
			Events.bind(Events.eventList.buildandprice.model.ToggleViewEvent.name, 
					Events.eventList.buildandprice.model.ToggleViewEvent.handler, this);
			
			Events.bind(Events.eventList.buildandprice.model.TabChangedEvent.name, 
					Events.eventList.buildandprice.model.TabChangedEvent.handler, this);
			
			Events.bind(Events.eventList.buildandprice.view.SubTabChangedEvent, 
					Events.eventList.buildandprice.model.SubTabChangedEvent.handler, this);
			
			Events.bind(Events.eventList.buildandprice.model.TabChangeRequestEvent.name, 
					Events.eventList.buildandprice.model.TabChangeRequestEvent.handler, this);
			
			Events.bind(Events.eventList.buildandprice.model.StepChangeRequestEvent.name,
					Events.eventList.buildandprice.model.StepChangeRequestEvent.handler, this);
			
			Events.bind(Events.eventList.buildandprice.model.StepChangeHeaderRequestEvent.name,
					Events.eventList.buildandprice.model.StepChangeHeaderRequestEvent.handler, this);
			
			Events.bind(Events.eventList.buildandprice.model.PackageSelectedEvent.name, 
					Events.eventList.buildandprice.model.PackageSelectedEvent.handler, this);

			Events.bind(Events.eventList.buildandprice.model.StartAllModulesEvent.name, 
					Events.eventList.buildandprice.model.StartAllModulesEvent.handler, this);
			
			if (ConfigUtil.showPostcodeSelect()) {
				Events.bind(Events.eventList.buildandprice.view.RegionPostcodeChangeRequestEvent, 
					Events.eventList.buildandprice.model.RegionPostcodeChangeRequestEvent.handler, this);
			}
			
			Events.bind(Events.eventList.buildandprice.model.RestoreCompleteEvent.name, 
					Events.eventList.buildandprice.model.RestoreCompleteEvent.handler, this);
			
			Events.bind(Events.eventList.buildandprice.model.ErrorOccuredEvent.name, 
					Events.eventList.buildandprice.model.ErrorOccuredEvent.handler, this);
			
			Events.bind(Events.eventList.buildandprice.view.PrevPageRequestedEvent, 
					Events.eventList.buildandprice.model.PrevPageRequestedEvent.handler, this);
			
			
			
//			Events.bind(Events.eventList.buildandprice.model.OrientationChangedEvent.name, 
//					Events.eventList.buildandprice.model.OrientationChangedEvent.handler, this);
			
//			Events.bind(Events.eventList.buildandprice.model.HotDealSelectedEvent.name, 
//					Events.eventList.buildandprice.model.HotDealSelectedEvent.handler, this);
		},

		/**
		 * Hard reset on all feeds. 
		 */
		navToResetPage : function() {
			this.navToNameplatesPage();
			this.navigate('',{trigger:false,replace:true});
			//this.navigate('', {trigger: true, replace: true});
		},
	
		navToNameplatesPage : function() {
			if (typeof this.modules['nameplates'] === 'undefined') {
				var module = new BnP.NameplateModule(this.dataLoader, this.viewManager, {navigate: this.navigate});
				this.modules['nameplates'] = module.registerEvents();
			}
			
			this.modules['nameplates'].go();
		},
		
		navToDecisionPage : function(modelId) {
			var nextPage =  '#'  + modelId + '/' + Constants.path.pth ;
			if (ConfigUtil.isShortPath()) { //packages only in shortpath
				nextPage += '/' + Constants.path.pkg;
				// nextPage =  '#'  + modelId + '/' + Constants.path.pkg;
			}
			else if(!BnP.CommonHelper.showPathStep()){
				nextPage += '/' + Constants.path.drv;
			}
//			Util.log('nextPageURL: ' + nextPage);
			this.navigate(nextPage, {trigger: true, replace: true});
		},
		
		navToPathsPage : function(modelId) {
			var pathsModuleId = 'paths', 
				options = {modelId: modelId,
						   navigate: this.navigate};
			if (typeof this.modules[pathsModuleId] === 'undefined') {
				var module = new BnP.PathModule(this.dataLoader, this.viewManager,options); 
				this.modules[pathsModuleId] = module.registerEvents();
			} else {
				this.modules[pathsModuleId].updateOptions(options);
			}
			this.modules[pathsModuleId].go();
		},
		
		navToDerivativesPage : function(modelId, derivativeId) {
			var moduleId = 'derivatives', 
				options = {modelId: modelId,
						  path: Constants.path.drv,
						  derivativeId: derivativeId,
						  navigate: this.navigate};
			if (typeof this.modules[moduleId] === 'undefined') {
				var module = new BnP.DerivativeModule(this.dataLoader, this.viewManager, options); 
				this.modules[moduleId] = module.registerEvents();
			} else {
				this.modules[moduleId].updateOptions(options);
			}
			this.modules[moduleId].go();
		},
		
		navToEnginesPage: function(modelId, derivativeId) {
			var moduleId = 'engines', 
				options = {modelId: modelId, 
					  derivativeId: derivativeId,
					  path: Constants.path.drv,
					  navigate: this.navigate};
			if (typeof this.modules[moduleId] === 'undefined') {
				var module = new BnP.EngineModule(this.dataLoader, this.viewManager, options); 
				this.modules[moduleId] = module.registerEvents();
			} else {
				this.modules[moduleId].updateOptions(options);
			}
			this.modules[moduleId].go();
		},
		
		navToSelectDrivativePage: function(modelId, derivativeId) {
//			Util.log('navToSelectDrivativePage');
			this.navToDerivativesPage(modelId, derivativeId);
		},
		
		navToCustomizeDerivativePage : function(modelId, path, derivativeId, engineId) {
			var moduleId = 'customize', 
				options = {modelId: modelId,
						   derivativeId: derivativeId,
						   path: path,
						   engineId: engineId};

			if (typeof this.modules[moduleId] === 'undefined') {
				var module = new BnP.ColorModule(this.dataLoader, this.viewManager, options); 
				this.modules[moduleId] = module.registerEvents();
			} else {
				this.modules[moduleId].updateOptions(options);
			}
			this.modules[moduleId].go();
		},
		
		registerAccessoryPageModule : function(modelId, path, derivativeId, engineId, categoryId) {
			var categoryModuleId = 'accessories';
			var isModuleCreated = false;
			var options = {
					modelId: modelId, path: Constants.path.drv, derivativeId: derivativeId,
					path: path,
					engineId: engineId, step: categoryId
			};
			if (typeof this.modules[categoryModuleId] === 'undefined') {
				//console.log('create AccessoriesModule');
				var module = new BnP.AccessoriesModule(this.dataLoader, this.viewManager, options);
				this.modules[categoryModuleId] = module.registerEvents();
				isModuleCreated = true;
			}
			return {isModuleCreated : isModuleCreated, options: options};
		},
		
		navToAccessoryPage: function(modelId, path, derivativeId, engineId, categoryId) {
			var categoryModuleId = 'accessories';
			var result = this.registerAccessoryPageModule(modelId, path, derivativeId, engineId, categoryId);
			if (!result.isModuleCreated) {
				//console.log('updating Options');
				this.modules[categoryModuleId].updateOptions(result.options);
			}
			this.modules[categoryModuleId].go();	
		},
	
		navToSummaryPage : function(modelId, path, derivativeId, engineId, isLoadingConfig, showPricesLater) {
			var moduleId = 'summary', 
				options = {
						modelId: modelId, path: path, derivativeId: derivativeId, engineId: engineId, 
						isLoadingConfig: isLoadingConfig, showPricesLater: showPricesLater
					};
			if (typeof this.modules[moduleId] === 'undefined') {
				var module = new BnP.SummaryModule(this.dataLoader, this.viewManager, options);
				this.modules[moduleId] = module.registerEvents();
			} else {
				this.modules[moduleId].updateOptions(options);
			}
			this.modules[moduleId].go();	
			
			//displaySummaryView will unblock UI
		},
		
		loadConfigAndNavToSummaryPage: function(uuid) {
			//for this scenario, we first need to make sure all modules are registered, up and running
			//otherwise if any event is fired, no one will pick it up.
			var moduleId = 'restore';
			if (typeof this.modules[moduleId] === 'undefined') {
				var module = new BnP.RestoreModule(this.dataLoader, this.viewManager, {
					uuid: uuid,
					navigate:this.navigate
				});
				this.modules[moduleId] = module.registerEvents();
			}
			this.modules[moduleId].go();	
		},
		
		navToErrorPage : function(data) {
			this.viewManager.page().error(this.dataLoader.error(data)).go();
			Events.fireEvent(Events.eventList.buildandprice.router.UnblockUIEvent);
		},
		

		navToPackagesPage: function(modelId, packageId) {
			var moduleId = 'packages', 
				options = {modelId: modelId,
						  path: Constants.path.pkg,
						  derivativeId: packageId, 
						  navigate: this.navigate};
			if (typeof this.modules[moduleId] === 'undefined') {
				var module = new BnP.PackagesModule(this.dataLoader, this.viewManager, options); 
				this.modules[moduleId] = module.registerEvents();
			} else {
				this.modules[moduleId].updateOptions(options);
			}
			this.modules[moduleId].go();
			
		},
		
		navToSelectPackagePage: function(modelId, packageId) {
//			Util.log('navToSelectPackagePage');
//			this.navToPackagesPage(modelId, packageId);
		},
		
		selectPackage: function(pkgColResult, packageId) {
//			if (packageId && packageId != null) {
//				var model = pkgColResult.get(packageId);
//				Events.fireEvent(Events.eventList.buildandprice.model.PackageSelectedEvent.name, model);
//			}
		}

	});
		

	
	$(document).ready(function() {
		//console.log('b&p document ready');
		setTimeout(function() {
			
			if (ConfigUtil.showPrices()) {
				ND.shoppingPreferenceManager();
				ND.CalcPrice.init();
			}
			
			var app = new MobileBuildAndPriceApp();
			if (ND.analyticsTag.isSinglePageAppOmnitureConfigured()) {
				var bpAnalytics = new BPAnalytics();
			}

			$(document).on('pagechange',function(e){
				Events.fireEvent(Events.eventList.buildandprice.model.PricezoneCheckRequestEvent.name);
			});

			Backbone.history.start();
		}, 500);
		
	});



})(window, document, BnP.Views, models, collections, jQuery);

