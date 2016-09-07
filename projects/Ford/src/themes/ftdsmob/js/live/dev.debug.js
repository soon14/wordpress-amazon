
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


/**
 * BxSlider v4.1 
 */

;(function($){

	var plugin = {};
	
	var defaults = {
		
		// GENERAL
		mode: 'horizontal',
		slideSelector: '',
		infiniteLoop: true,
		hideControlOnEnd: false,
		speed: 500,
		easing: null,
		slideMargin: 0,
		startSlide: 0,
		randomStart: false,
		captions: false,
		ticker: false,
		tickerHover: false,
		adaptiveHeight: false,
		adaptiveHeightSpeed: 500,
		video: false,
		useCSS: true,
		preloadImages: 'visible',

		// TOUCH
		touchEnabled: true,
		swipeThreshold: 50,
		oneToOneTouch: true,
		preventDefaultSwipeX: true,
		preventDefaultSwipeY: false,
		
		// PAGER
		pager: true,
		pagerType: 'full',
		pagerShortSeparator: ' / ',
		pagerSelector: null,
		buildPager: null,
		pagerCustom: null,
		
		// CONTROLS
		controls: true,
		nextText: 'Next',
		prevText: 'Prev',
		nextSelector: null,
		prevSelector: null,
		autoControls: false,
		startText: 'Start',
		stopText: 'Stop',
		autoControlsCombine: false,
		autoControlsSelector: null,
		
		// AUTO
		auto: false,
		pause: 4000,
		autoStart: true,
		autoDirection: 'next',
		autoHover: false,
		autoDelay: 0,
		
		// CAROUSEL
		minSlides: 1,
		maxSlides: 1,
		moveSlides: 0,
		slideWidth: 0,
		
		// CALLBACKS
		onSliderLoad: function() {},
		onSlideBefore: function() {},
		onSlideAfter: function() {},
		onSlideNext: function() {},
		onSlidePrev: function() {}
	}

	$.fn.bxSlider = function(options){
		
		if(this.length == 0) return;
		
		// support mutltiple elements
		if(this.length > 1){
			this.each(function(){$(this).bxSlider(options)});
			return this;
		}
		
		// create a namespace to be used throughout the plugin
		var slider = {};
		// set a reference to our slider element
		var el = this;
		plugin.el = this;

		/**
		 * Makes slideshow responsive
		 */
		// first get the original window dimens (thanks alot IE)
		var windowWidth = $(window).width();
		var windowHeight = $(window).height();

		
		
		/**
		 * ===================================================================================
		 * = PRIVATE FUNCTIONS
		 * ===================================================================================
		 */
		
		/**
		 * Initializes namespace settings to be used throughout plugin
		 */
		var init = function(){
			// merge user-supplied options with the defaults
			slider.settings = $.extend({}, defaults, options);
			// parse slideWidth setting
			slider.settings.slideWidth = parseInt(slider.settings.slideWidth);
			// store the original children
			slider.children = el.children(slider.settings.slideSelector);
			// check if actual number of slides is less than minSlides / maxSlides
			if(slider.children.length < slider.settings.minSlides) slider.settings.minSlides = slider.children.length;
			if(slider.children.length < slider.settings.maxSlides) slider.settings.maxSlides = slider.children.length;
			// if random start, set the startSlide setting to random number
			if(slider.settings.randomStart) slider.settings.startSlide = Math.floor(Math.random() * slider.children.length);
			// store active slide information
			slider.active = { index: slider.settings.startSlide }
			// store if the slider is in carousel mode (displaying / moving multiple slides)
			slider.carousel = slider.settings.minSlides > 1 || slider.settings.maxSlides > 1;
			// if carousel, force preloadImages = 'all'
			if(slider.carousel) slider.settings.preloadImages = 'all';
			// calculate the min / max width thresholds based on min / max number of slides
			// used to setup and update carousel slides dimensions
			slider.minThreshold = (slider.settings.minSlides * slider.settings.slideWidth) + ((slider.settings.minSlides - 1) * slider.settings.slideMargin);
			slider.maxThreshold = (slider.settings.maxSlides * slider.settings.slideWidth) + ((slider.settings.maxSlides - 1) * slider.settings.slideMargin);
			// store the current state of the slider (if currently animating, working is true)
			slider.working = false;
			// initialize the controls object
			slider.controls = {};
			// initialize an auto interval
			slider.interval = null;
			// determine which property to use for transitions
			slider.animProp = slider.settings.mode == 'vertical' ? 'top' : 'left';
			// determine if hardware acceleration can be used
			slider.usingCSS = slider.settings.useCSS && slider.settings.mode != 'fade' && (function(){
				// create our test div element
				var div = document.createElement('div');
				// css transition properties
				var props = ['WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
				// test for each property
				for(var i in props){
					if(div.style[props[i]] !== undefined){
						slider.cssPrefix = props[i].replace('Perspective', '').toLowerCase();
						slider.animProp = '-' + slider.cssPrefix + '-transform';
						return true;
					}
				}
				return false;
			}());
			// if vertical mode always make maxSlides and minSlides equal
			if(slider.settings.mode == 'vertical') slider.settings.maxSlides = slider.settings.minSlides;
			// perform all DOM / CSS modifications
			setup();
		}

		/**
		 * Performs all DOM and CSS modifications
		 */
		var setup = function(){
			// wrap el in a wrapper
			el.wrap('<div class="bx-wrapper"><div class="bx-viewport"></div></div>');
			// store a namspace reference to .bx-viewport
			slider.viewport = el.parent();
			// add a loading div to display while images are loading
			slider.loader = $('<div class="bx-loading" />');
			slider.viewport.prepend(slider.loader);
			// set el to a massive width, to hold any needed slides
			// also strip any margin and padding from el
			el.css({
				width: slider.settings.mode == 'horizontal' ? slider.children.length * 215 + '%' : 'auto',
				position: 'relative'
			});
			// if using CSS, add the easing property
			if(slider.usingCSS && slider.settings.easing){
				el.css('-' + slider.cssPrefix + '-transition-timing-function', slider.settings.easing);
			// if not using CSS and no easing value was supplied, use the default JS animation easing (swing)
			}else if(!slider.settings.easing){
				slider.settings.easing = 'swing';
			}
			var slidesShowing = getNumberSlidesShowing();
			// make modifications to the viewport (.bx-viewport)
			slider.viewport.css({
				width: '100%',
				overflow: 'hidden',
				position: 'relative'
			});
			slider.viewport.parent().css({
				maxWidth: getViewportMaxWidth()
			});
			// apply css to all slider children
			slider.children.css({
				'float': slider.settings.mode == 'horizontal' ? 'left' : 'none',
				listStyle: 'none',
				position: 'relative'
			});
			// apply the calculated width after the float is applied to prevent scrollbar interference
			slider.children.width(getSlideWidth());
			// if slideMargin is supplied, add the css
			if(slider.settings.mode == 'horizontal' && slider.settings.slideMargin > 0) slider.children.css('marginRight', slider.settings.slideMargin);
			if(slider.settings.mode == 'vertical' && slider.settings.slideMargin > 0) slider.children.css('marginBottom', slider.settings.slideMargin);
			// if "fade" mode, add positioning and z-index CSS
			if(slider.settings.mode == 'fade'){
				slider.children.css({
					position: 'absolute',
					zIndex: 0,
					display: 'none'
				});
				// prepare the z-index on the showing element
				slider.children.eq(slider.settings.startSlide).css({zIndex: 50, display: 'block'});
			}
			// create an element to contain all slider controls (pager, start / stop, etc)
			slider.controls.el = $('<div class="bx-controls" />');
			// if captions are requested, add them
			if(slider.settings.captions) appendCaptions();
			// if infinite loop, prepare additional slides
			if(slider.settings.infiniteLoop && slider.settings.mode != 'fade' && !slider.settings.ticker){
				var slice = slider.settings.mode == 'vertical' ? slider.settings.minSlides : slider.settings.maxSlides;
				var sliceAppend = slider.children.slice(0, slice).clone().addClass('bx-clone');
				var slicePrepend = slider.children.slice(-slice).clone().addClass('bx-clone');
				el.append(sliceAppend).prepend(slicePrepend);
			}
			// check if startSlide is last slide
			slider.active.last = slider.settings.startSlide == getPagerQty() - 1;
			// if video is true, set up the fitVids plugin
			if(slider.settings.video) el.fitVids();
			// set the default preload selector (visible)
			var preloadSelector = slider.children.eq(slider.settings.startSlide);
			if (slider.settings.preloadImages == "all") preloadSelector = el.children();
			// only check for control addition if not in "ticker" mode
			if(!slider.settings.ticker){
				// if pager is requested, add it
				if(slider.settings.pager) appendPager();
				// if controls are requested, add them
				if(slider.settings.controls) appendControls();
				// if auto is true, and auto controls are requested, add them
				if(slider.settings.auto && slider.settings.autoControls) appendControlsAuto();
				// if any control option is requested, add the controls wrapper
				if(slider.settings.controls || slider.settings.autoControls || slider.settings.pager) slider.viewport.after(slider.controls.el);
			}
			// preload all images, then perform final DOM / CSS modifications that depend on images being loaded
			preloadSelector.imagesLoaded(start);
		}

		/**
		 * Start the slider
		 */
		var start = function(){
			// remove the loading DOM element
			slider.loader.remove();
			// set the left / top position of "el"
			setSlidePosition();
			// if "vertical" mode, always use adaptiveHeight to prevent odd behavior
			if (slider.settings.mode == 'vertical') slider.settings.adaptiveHeight = true;
			// set the viewport height
			slider.viewport.height(getViewportHeight());
			// make sure everything is positioned just right (same as a window resize)
			el.redrawSlider();
			// onSliderLoad callback
			slider.settings.onSliderLoad(slider.active.index);
			// slider has been fully initialized
			slider.initialized = true;
			// bind the resize call to the window
			$(window).bind('resize', resizeWindow);
			// if auto is true, start the show
			if (slider.settings.auto && slider.settings.autoStart) initAuto();
			// if ticker is true, start the ticker
			if (slider.settings.ticker) initTicker();
			// if pager is requested, make the appropriate pager link active
			if (slider.settings.pager) updatePagerActive(slider.settings.startSlide);
			// check for any updates to the controls (like hideControlOnEnd updates)
			if (slider.settings.controls) updateDirectionControls();
			// if touchEnabled is true, setup the touch events
			if (slider.settings.touchEnabled && !slider.settings.ticker) initTouch();
		}
		
		/**
		 * Returns the calculated height of the viewport, used to determine either adaptiveHeight or the maxHeight value
		 */
		var getViewportHeight = function(){
			var height = 0;
			// first determine which children (slides) should be used in our height calculation
			var children = $();
			// if mode is not "vertical" and adaptiveHeight is false, include all children
			if(slider.settings.mode != 'vertical' && !slider.settings.adaptiveHeight){
				children = slider.children;
			}else{
				// if not carousel, return the single active child
				if(!slider.carousel){
					children = slider.children.eq(slider.active.index);
				// if carousel, return a slice of children
				}else{
					// get the individual slide index
					var currentIndex = slider.settings.moveSlides == 1 ? slider.active.index : slider.active.index * getMoveBy();
					// add the current slide to the children
					children = slider.children.eq(currentIndex);
					// cycle through the remaining "showing" slides
					for (i = 1; i <= slider.settings.maxSlides - 1; i++){
						// if looped back to the start
						if(currentIndex + i >= slider.children.length){
							children = children.add(slider.children.eq(i - 1));
						}else{
							children = children.add(slider.children.eq(currentIndex + i));
						}
					}
				}
			}
			// if "vertical" mode, calculate the sum of the heights of the children
			if(slider.settings.mode == 'vertical'){
				children.each(function(index) {
				  height += $(this).outerHeight();
				});
				// add user-supplied margins
				if(slider.settings.slideMargin > 0){
					height += slider.settings.slideMargin * (slider.settings.minSlides - 1);
				}
			// if not "vertical" mode, calculate the max height of the children
			}else{
				height = Math.max.apply(Math, children.map(function(){
					return $(this).outerHeight(false);
				}).get());
			}
			return height;
		}

		/**
		 * Returns the calculated width to be used for the outer wrapper / viewport
		 */
		var getViewportMaxWidth = function(){
			var width = '100%';
			if(slider.settings.slideWidth > 0){
				if(slider.settings.mode == 'horizontal'){
					width = (slider.settings.maxSlides * slider.settings.slideWidth) + ((slider.settings.maxSlides - 1) * slider.settings.slideMargin);
				}else{
					width = slider.settings.slideWidth;
				}
			}
			return width;
		}
		
		/**
		 * Returns the calculated width to be applied to each slide
		 */
		var getSlideWidth = function(){
			// start with any user-supplied slide width
			var newElWidth = slider.settings.slideWidth;
			// get the current viewport width
			var wrapWidth = slider.viewport.width();
			// if slide width was not supplied, or is larger than the viewport use the viewport width
			if(slider.settings.slideWidth == 0 ||
				(slider.settings.slideWidth > wrapWidth && !slider.carousel) ||
				slider.settings.mode == 'vertical'){
				newElWidth = wrapWidth;
			// if carousel, use the thresholds to determine the width
			}else if(slider.settings.maxSlides > 1 && slider.settings.mode == 'horizontal'){
				if(wrapWidth > slider.maxThreshold){
					// newElWidth = (wrapWidth - (slider.settings.slideMargin * (slider.settings.maxSlides - 1))) / slider.settings.maxSlides;
				}else if(wrapWidth < slider.minThreshold){
					newElWidth = (wrapWidth - (slider.settings.slideMargin * (slider.settings.minSlides - 1))) / slider.settings.minSlides;
				}
			}
			return newElWidth;
		}
		
		/**
		 * Returns the number of slides currently visible in the viewport (includes partially visible slides)
		 */
		var getNumberSlidesShowing = function(){
			var slidesShowing = 1;
			if(slider.settings.mode == 'horizontal' && slider.settings.slideWidth > 0){
				// if viewport is smaller than minThreshold, return minSlides
				if(slider.viewport.width() < slider.minThreshold){
					slidesShowing = slider.settings.minSlides;
				// if viewport is larger than minThreshold, return maxSlides
				}else if(slider.viewport.width() > slider.maxThreshold){
					slidesShowing = slider.settings.maxSlides;
				// if viewport is between min / max thresholds, divide viewport width by first child width
				}else{
					var childWidth = slider.children.first().width();
					slidesShowing = Math.floor(slider.viewport.width() / childWidth);
				}
			// if "vertical" mode, slides showing will always be minSlides
			}else if(slider.settings.mode == 'vertical'){
				slidesShowing = slider.settings.minSlides;
			}
			return slidesShowing;
		}
		
		/**
		 * Returns the number of pages (one full viewport of slides is one "page")
		 */
		var getPagerQty = function(){
			var pagerQty = 0;
			// if moveSlides is specified by the user
			if(slider.settings.moveSlides > 0){
				if(slider.settings.infiniteLoop){
					pagerQty = slider.children.length / getMoveBy();
				}else{
					// use a while loop to determine pages
					var breakPoint = 0;
					var counter = 0
					// when breakpoint goes above children length, counter is the number of pages
					while (breakPoint < slider.children.length){
						++pagerQty;
						breakPoint = counter + getNumberSlidesShowing();
						counter += slider.settings.moveSlides <= getNumberSlidesShowing() ? slider.settings.moveSlides : getNumberSlidesShowing();
					}
				}
			// if moveSlides is 0 (auto) divide children length by sides showing, then round up
			}else{
				pagerQty = Math.ceil(slider.children.length / getNumberSlidesShowing());
			}
			return pagerQty;
		}
		
		/**
		 * Returns the number of indivual slides by which to shift the slider
		 */
		var getMoveBy = function(){
			// if moveSlides was set by the user and moveSlides is less than number of slides showing
			if(slider.settings.moveSlides > 0 && slider.settings.moveSlides <= getNumberSlidesShowing()){
				return slider.settings.moveSlides;
			}
			// if moveSlides is 0 (auto)
			return getNumberSlidesShowing();
		}
		
		/**
		 * Sets the slider's (el) left or top position
		 */
		var setSlidePosition = function(){
			// if last slide, not infinite loop, and number of children is larger than specified maxSlides
			if(slider.children.length > slider.settings.maxSlides && slider.active.last && !slider.settings.infiniteLoop){
				if (slider.settings.mode == 'horizontal'){
					// get the last child's position
					var lastChild = slider.children.last();
					var position = lastChild.position();
					// set the left position
					setPositionProperty(-(position.left - (slider.viewport.width() - lastChild.width())), 'reset', 0);
				}else if(slider.settings.mode == 'vertical'){
					// get the last showing index's position
					var lastShowingIndex = slider.children.length - slider.settings.minSlides;
					var position = slider.children.eq(lastShowingIndex).position();
					// set the top position
					setPositionProperty(-position.top, 'reset', 0);
				}
			// if not last slide
			}else{
				// get the position of the first showing slide
				var position = slider.children.eq(slider.active.index * getMoveBy()).position();
				// check for last slide
				if (slider.active.index == getPagerQty() - 1) slider.active.last = true;
				// set the repective position
				if (position != undefined){
					if (slider.settings.mode == 'horizontal') setPositionProperty(-position.left, 'reset', 0);
					else if (slider.settings.mode == 'vertical') setPositionProperty(-position.top, 'reset', 0);
				}
			}
		}
		
		/**
		 * Sets the el's animating property position (which in turn will sometimes animate el).
		 * If using CSS, sets the transform property. If not using CSS, sets the top / left property.
		 *
		 * @param value (int) 
		 *  - the animating property's value
		 *
		 * @param type (string) 'slider', 'reset', 'ticker'
		 *  - the type of instance for which the function is being
		 *
		 * @param duration (int) 
		 *  - the amount of time (in ms) the transition should occupy
		 *
		 * @param params (array) optional
		 *  - an optional parameter containing any variables that need to be passed in
		 */
		var setPositionProperty = function(value, type, duration, params){
			// use CSS transform
			if(slider.usingCSS){
				// determine the translate3d value
				var propValue = slider.settings.mode == 'vertical' ? 'translate3d(0, ' + value + 'px, 0)' : 'translate3d(' + value + 'px, 0, 0)';
				// add the CSS transition-duration
				el.css('-' + slider.cssPrefix + '-transition-duration', duration / 1000 + 's');
				if(type == 'slide'){
					// set the property value
					el.css(slider.animProp, propValue);
					// turn off the slider working flag here, in case transitionEnd never gets called
                    slider.working = false;
					// bind a callback method - executes when CSS transition completes
					el.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(){
						// unbind the callback
						el.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
						updateAfterSlideTransition();
					});
				}else if(type == 'reset'){
					el.css(slider.animProp, propValue);
				}else if(type == 'ticker'){
					// make the transition use 'linear'
					el.css('-' + slider.cssPrefix + '-transition-timing-function', 'linear');
					el.css(slider.animProp, propValue);
					// bind a callback method - executes when CSS transition completes
					el.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(){
						// unbind the callback
						el.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
						// reset the position
						setPositionProperty(params['resetValue'], 'reset', 0);
						// start the loop again
						tickerLoop();
					});
				}
			// use JS animate
			}else{
				var animateObj = {};
				animateObj[slider.animProp] = value;
				if(type == 'slide'){
					el.animate(animateObj, duration, slider.settings.easing, function(){
						updateAfterSlideTransition();
					});
				}else if(type == 'reset'){
					el.css(slider.animProp, value)
				}else if(type == 'ticker'){
					el.animate(animateObj, speed, 'linear', function(){
						setPositionProperty(params['resetValue'], 'reset', 0);
						// run the recursive loop after animation
						tickerLoop();
					});
				}
			}
		}
		
		/**
		 * Populates the pager with proper amount of pages
		 */
		var populatePager = function(){
			var pagerHtml = '';
			pagerQty = getPagerQty();
			// loop through each pager item
			for(var i=0; i < pagerQty; i++){
				var linkContent = '';
				// if a buildPager function is supplied, use it to get pager link value, else use index + 1
				if(slider.settings.buildPager && $.isFunction(slider.settings.buildPager)){
					linkContent = slider.settings.buildPager(i);
					slider.pagerEl.addClass('bx-custom-pager');
				}else{
					linkContent = i + 1;
					slider.pagerEl.addClass('bx-default-pager');
				}
				// var linkContent = slider.settings.buildPager && $.isFunction(slider.settings.buildPager) ? slider.settings.buildPager(i) : i + 1;
				// add the markup to the string
				pagerHtml += '<div class="bx-pager-item"><a href="" data-slide-index="' + i + '" class="bx-pager-link">' + linkContent + '</a></div>';
			};
			// populate the pager element with pager links
			slider.pagerEl.html(pagerHtml);
		}
		
		/**
		 * Appends the pager to the controls element
		 */
		var appendPager = function(){
			if(!slider.settings.pagerCustom){
				// create the pager DOM element
				slider.pagerEl = $('<div class="bx-pager" />');
				// if a pager selector was supplied, populate it with the pager
				if(slider.settings.pagerSelector){
					$(slider.settings.pagerSelector).html(slider.pagerEl);
				// if no pager selector was supplied, add it after the wrapper
				}else{
					slider.controls.el.addClass('bx-has-pager').append(slider.pagerEl);
				}
				// populate the pager
				populatePager();
			}else{
				slider.pagerEl = $(slider.settings.pagerCustom);
			}
			// assign the pager click binding
			slider.pagerEl.delegate('a', 'click', clickPagerBind);
		}
		
		/**
		 * Appends prev / next controls to the controls element
		 */
		var appendControls = function(){
			slider.controls.next = $('<a class="bx-next" href="">' + slider.settings.nextText + '</a>');
			slider.controls.prev = $('<a class="bx-prev" href="">' + slider.settings.prevText + '</a>');
			// bind click actions to the controls
			slider.controls.next.bind('click', clickNextBind);
			slider.controls.prev.bind('click', clickPrevBind);
			// if nextSlector was supplied, populate it
			if(slider.settings.nextSelector){
				$(slider.settings.nextSelector).append(slider.controls.next);
			}
			// if prevSlector was supplied, populate it
			if(slider.settings.prevSelector){
				$(slider.settings.prevSelector).append(slider.controls.prev);
			}
			// if no custom selectors were supplied
			if(!slider.settings.nextSelector && !slider.settings.prevSelector){
				// add the controls to the DOM
				slider.controls.directionEl = $('<div class="bx-controls-direction" />');
				// add the control elements to the directionEl
				slider.controls.directionEl.append(slider.controls.prev).append(slider.controls.next);
				// slider.viewport.append(slider.controls.directionEl);
				slider.controls.el.addClass('bx-has-controls-direction').append(slider.controls.directionEl);
			}
		}
		
		/**
		 * Appends start / stop auto controls to the controls element
		 */
		var appendControlsAuto = function(){
			slider.controls.start = $('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + slider.settings.startText + '</a></div>');
			slider.controls.stop = $('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + slider.settings.stopText + '</a></div>');
			// add the controls to the DOM
			slider.controls.autoEl = $('<div class="bx-controls-auto" />');
			// bind click actions to the controls
			slider.controls.autoEl.delegate('.bx-start', 'click', clickStartBind);
			slider.controls.autoEl.delegate('.bx-stop', 'click', clickStopBind);
			// if autoControlsCombine, insert only the "start" control
			if(slider.settings.autoControlsCombine){
				slider.controls.autoEl.append(slider.controls.start);
			// if autoControlsCombine is false, insert both controls
			}else{
				slider.controls.autoEl.append(slider.controls.start).append(slider.controls.stop);
			}
			// if auto controls selector was supplied, populate it with the controls
			if(slider.settings.autoControlsSelector){
				$(slider.settings.autoControlsSelector).html(slider.controls.autoEl);
			// if auto controls selector was not supplied, add it after the wrapper
			}else{
				slider.controls.el.addClass('bx-has-controls-auto').append(slider.controls.autoEl);
			}
			// update the auto controls
			updateAutoControls(slider.settings.autoStart ? 'stop' : 'start');
		}
		
		/**
		 * Appends image captions to the DOM
		 */
		var appendCaptions = function(){
			// cycle through each child
			slider.children.each(function(index){
				// get the image title attribute
				var title = $(this).find('img:first').attr('title');
				// append the caption
				if (title != undefined) $(this).append('<div class="bx-caption"><span>' + title + '</span></div>');
			});
		}
		
		/**
		 * Click next binding
		 *
		 * @param e (event) 
		 *  - DOM event object
		 */
		var clickNextBind = function(e){
			// if auto show is running, stop it
			if (slider.settings.auto) el.stopAuto();
			el.goToNextSlide();
			e.preventDefault();
		}
		
		/**
		 * Click prev binding
		 *
		 * @param e (event) 
		 *  - DOM event object
		 */
		var clickPrevBind = function(e){
			// if auto show is running, stop it
			if (slider.settings.auto) el.stopAuto();
			el.goToPrevSlide();
			e.preventDefault();
		}
		
		/**
		 * Click start binding
		 *
		 * @param e (event) 
		 *  - DOM event object
		 */
		var clickStartBind = function(e){
			el.startAuto();
			e.preventDefault();
		}
		
		/**
		 * Click stop binding
		 *
		 * @param e (event) 
		 *  - DOM event object
		 */
		var clickStopBind = function(e){
			el.stopAuto();
			e.preventDefault();
		}

		/**
		 * Click pager binding
		 *
		 * @param e (event) 
		 *  - DOM event object
		 */
		var clickPagerBind = function(e){
			// if auto show is running, stop it
			if (slider.settings.auto) el.stopAuto();
			var pagerLink = $(e.currentTarget);
			var pagerIndex = parseInt(pagerLink.attr('data-slide-index'));
			// if clicked pager link is not active, continue with the goToSlide call
			if(pagerIndex != slider.active.index) el.goToSlide(pagerIndex);
			e.preventDefault();
		}
		
		/**
		 * Updates the pager links with an active class
		 *
		 * @param slideIndex (int) 
		 *  - index of slide to make active
		 */
		var updatePagerActive = function(slideIndex){
			// if "short" pager type
			if(slider.settings.pagerType == 'short'){
				slider.pagerEl.html((slideIndex + 1) + slider.settings.pagerShortSeparator + slider.children.length);
				return;
			}
			// remove all pager active classes
			slider.pagerEl.find('a').removeClass('active');
			// apply the active class for all pagers
			slider.pagerEl.each(function(i, el) { $(el).find('a').eq(slideIndex).addClass('active'); });
		}
		
		/**
		 * Performs needed actions after a slide transition
		 */
		var updateAfterSlideTransition = function(){
			// if infinte loop is true
			if(slider.settings.infiniteLoop){
				var position = '';
				// first slide
				if(slider.active.index == 0){
					// set the new position
					position = slider.children.eq(0).position();
				// carousel, last slide
				}else if(slider.active.index == getPagerQty() - 1 && slider.carousel){
					position = slider.children.eq((getPagerQty() - 1) * getMoveBy()).position();
				// last slide
				}else if(slider.active.index == slider.children.length - 1){
					position = slider.children.eq(slider.children.length - 1).position();
				}
				if (slider.settings.mode == 'horizontal') { setPositionProperty(-position.left, 'reset', 0);; }
				else if (slider.settings.mode == 'vertical') { setPositionProperty(-position.top, 'reset', 0);; }
			}
			// declare that the transition is complete
			slider.working = false;
			// onSlideAfter callback
			slider.settings.onSlideAfter(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
		}
		
		/**
		 * Updates the auto controls state (either active, or combined switch)
		 *
		 * @param state (string) "start", "stop"
		 *  - the new state of the auto show
		 */
		var updateAutoControls = function(state){
			// if autoControlsCombine is true, replace the current control with the new state 
			if(slider.settings.autoControlsCombine){
				slider.controls.autoEl.html(slider.controls[state]);
			// if autoControlsCombine is false, apply the "active" class to the appropriate control 
			}else{
				slider.controls.autoEl.find('a').removeClass('active');
				slider.controls.autoEl.find('a:not(.bx-' + state + ')').addClass('active');
			}
		}
		
		/**
		 * Updates the direction controls (checks if either should be hidden)
		 */
		var updateDirectionControls = function(){
			// if infiniteLoop is false and hideControlOnEnd is true
			if(!slider.settings.infiniteLoop && slider.settings.hideControlOnEnd){
				// if first slide
				if (slider.active.index == 0){
					slider.controls.prev.addClass('disabled');
					slider.controls.next.removeClass('disabled');
				// if last slide
				}else if(slider.active.index == getPagerQty() - 1){
					slider.controls.next.addClass('disabled');
					slider.controls.prev.removeClass('disabled');
				// if any slide in the middle
				}else{
					slider.controls.prev.removeClass('disabled');
					slider.controls.next.removeClass('disabled');
				}
			// if slider has only one page, disable controls
			}else if(getPagerQty() == 1){
				slider.controls.prev.addClass('disabled');
				slider.controls.next.addClass('disabled');
			}
		}
		
		/**
		 * Initialzes the auto process
		 */
		var initAuto = function(){
			// if autoDelay was supplied, launch the auto show using a setTimeout() call
			if(slider.settings.autoDelay > 0){
				var timeout = setTimeout(el.startAuto, slider.settings.autoDelay);
			// if autoDelay was not supplied, start the auto show normally
			}else{
				el.startAuto();
			}
			// if autoHover is requested
			if(slider.settings.autoHover){
				// on el hover
				el.hover(function(){
					// if the auto show is currently playing (has an active interval)
					if(slider.interval){
						// stop the auto show and pass true agument which will prevent control update
						el.stopAuto(true);
						// create a new autoPaused value which will be used by the relative "mouseout" event
						slider.autoPaused = true;
					}
				}, function(){
					// if the autoPaused value was created be the prior "mouseover" event
					if(slider.autoPaused){
						// start the auto show and pass true agument which will prevent control update
						el.startAuto(true);
						// reset the autoPaused value
						slider.autoPaused = null;
					}
				});
			}
		}
		
		/**
		 * Initialzes the ticker process
		 */
		var initTicker = function(){
			var startPosition = 0;
			// if autoDirection is "next", append a clone of the entire slider
			if(slider.settings.autoDirection == 'next'){
				el.append(slider.children.clone().addClass('bx-clone'));
			// if autoDirection is "prev", prepend a clone of the entire slider, and set the left position
			}else{
				el.prepend(slider.children.clone().addClass('bx-clone'));
				var position = slider.children.first().position();
				startPosition = slider.settings.mode == 'horizontal' ? -position.left : -position.top;
			}
			setPositionProperty(startPosition, 'reset', 0);
			// do not allow controls in ticker mode
			slider.settings.pager = false;
			slider.settings.controls = false;
			slider.settings.autoControls = false;
			// if autoHover is requested
			if(slider.settings.tickerHover && !slider.usingCSS){
				// on el hover
				slider.viewport.hover(function(){
					el.stop();
				}, function(){
					// calculate the total width of children (used to calculate the speed ratio)
					var totalDimens = 0;
					slider.children.each(function(index){
					  totalDimens += slider.settings.mode == 'horizontal' ? $(this).outerWidth(true) : $(this).outerHeight(true);
					});
					// calculate the speed ratio (used to determine the new speed to finish the paused animation)
					var ratio = slider.settings.speed / totalDimens;
					// determine which property to use
					var property = slider.settings.mode == 'horizontal' ? 'left' : 'top';
					// calculate the new speed
					var newSpeed = ratio * (totalDimens - (Math.abs(parseInt(el.css(property)))));
					tickerLoop(newSpeed);
				});
			}
			// start the ticker loop
			tickerLoop();
		}
		
		/**
		 * Runs a continuous loop, news ticker-style
		 */
		var tickerLoop = function(resumeSpeed){
			speed = resumeSpeed ? resumeSpeed : slider.settings.speed;
			var position = {left: 0, top: 0};
			var reset = {left: 0, top: 0};
			// if "next" animate left position to last child, then reset left to 0
			if(slider.settings.autoDirection == 'next'){
				position = el.find('.bx-clone').first().position();
			// if "prev" animate left position to 0, then reset left to first non-clone child
			}else{
				reset = slider.children.first().position();
			}
			var animateProperty = slider.settings.mode == 'horizontal' ? -position.left : -position.top;
			var resetValue = slider.settings.mode == 'horizontal' ? -reset.left : -reset.top;
			var params = {resetValue: resetValue};
			setPositionProperty(animateProperty, 'ticker', speed, params);
		}
		
		/**
		 * Initializes touch events
		 */
		var initTouch = function(){
			// initialize object to contain all touch values
			slider.touch = {
				start: {x: 0, y: 0},
				end: {x: 0, y: 0}
			}
			slider.viewport.bind('touchstart', onTouchStart);
		}
		
		/**
		 * Event handler for "touchstart"
		 *
		 * @param e (event) 
		 *  - DOM event object
		 */
		var onTouchStart = function(e){
			if(slider.working){
				e.preventDefault();
			}else{
				// record the original position when touch starts
				slider.touch.originalPos = el.position();
				var orig = e.originalEvent;
				// record the starting touch x, y coordinates
				slider.touch.start.x = orig.changedTouches[0].pageX;
				slider.touch.start.y = orig.changedTouches[0].pageY;
				// bind a "touchmove" event to the viewport
				slider.viewport.bind('touchmove', onTouchMove);
				// bind a "touchend" event to the viewport
				slider.viewport.bind('touchend', onTouchEnd);
			}
		}
		
		/**
		 * Event handler for "touchmove"
		 *
		 * @param e (event) 
		 *  - DOM event object
		 */
		var onTouchMove = function(e){
			var orig = e.originalEvent;
			// if scrolling on y axis, do not prevent default
			var xMovement = Math.abs(orig.changedTouches[0].pageX - slider.touch.start.x);
			var yMovement = Math.abs(orig.changedTouches[0].pageY - slider.touch.start.y);
			// x axis swipe
			if((xMovement * 3) > yMovement && slider.settings.preventDefaultSwipeX){
				e.preventDefault();
			// y axis swipe
			}else if((yMovement * 3) > xMovement && slider.settings.preventDefaultSwipeY){
				e.preventDefault();
			}
			if(slider.settings.mode != 'fade' && slider.settings.oneToOneTouch){
				var value = 0;
				// if horizontal, drag along x axis
				if(slider.settings.mode == 'horizontal'){
					var change = orig.changedTouches[0].pageX - slider.touch.start.x;
					value = slider.touch.originalPos.left + change;
				// if vertical, drag along y axis
				}else{
					var change = orig.changedTouches[0].pageY - slider.touch.start.y;
					value = slider.touch.originalPos.top + change;
				}
				setPositionProperty(value, 'reset', 0);
			}
		}
		
		/**
		 * Event handler for "touchend"
		 *
		 * @param e (event) 
		 *  - DOM event object
		 */
		var onTouchEnd = function(e){
			slider.viewport.unbind('touchmove', onTouchMove);
			var orig = e.originalEvent;
			var value = 0;
			// record end x, y positions
			slider.touch.end.x = orig.changedTouches[0].pageX;
			slider.touch.end.y = orig.changedTouches[0].pageY;
			// if fade mode, check if absolute x distance clears the threshold
			if(slider.settings.mode == 'fade'){
				var distance = Math.abs(slider.touch.start.x - slider.touch.end.x);
				if(distance >= slider.settings.swipeThreshold){
					slider.touch.start.x > slider.touch.end.x ? el.goToNextSlide() : el.goToPrevSlide();
					el.stopAuto();
				}
			// not fade mode
			}else{
				var distance = 0;
				// calculate distance and el's animate property
				if(slider.settings.mode == 'horizontal'){
					distance = slider.touch.end.x - slider.touch.start.x;
					value = slider.touch.originalPos.left;
				}else{
					distance = slider.touch.end.y - slider.touch.start.y;
					value = slider.touch.originalPos.top;
				}
				// if not infinite loop and first / last slide, do not attempt a slide transition
				if(!slider.settings.infiniteLoop && ((slider.active.index == 0 && distance > 0) || (slider.active.last && distance < 0))){
					setPositionProperty(value, 'reset', 200);
				}else{
					// check if distance clears threshold
					if(Math.abs(distance) >= slider.settings.swipeThreshold){
						distance < 0 ? el.goToNextSlide() : el.goToPrevSlide();
						el.stopAuto();
					}else{
						// el.animate(property, 200);
						setPositionProperty(value, 'reset', 200);
					}
				}
			}
			slider.viewport.unbind('touchend', onTouchEnd);
		}

		/**
		 * Window resize event callback
		 */
		var resizeWindow = function(e){
			// get the new window dimens (again, thank you IE)
			var windowWidthNew = $(window).width();
			var windowHeightNew = $(window).height();
			// make sure that it is a true window resize
			// *we must check this because our dinosaur friend IE fires a window resize event when certain DOM elements
			// are resized. Can you just die already?*
			if(windowWidth != windowWidthNew || windowHeight != windowHeightNew){
				// set the new window dimens
				windowWidth = windowWidthNew;
				windowHeight = windowHeightNew;
				// update all dynamic elements
				el.redrawSlider();
			}
		}
		
		/**
		 * ===================================================================================
		 * = PUBLIC FUNCTIONS
		 * ===================================================================================
		 */
		
		/**
		 * Performs slide transition to the specified slide
		 *
		 * @param slideIndex (int) 
		 *  - the destination slide's index (zero-based)
		 *
		 * @param direction (string) 
		 *  - INTERNAL USE ONLY - the direction of travel ("prev" / "next")
		 */
		el.goToSlide = function(slideIndex, direction){
			// if plugin is currently in motion, ignore request
			if(slider.working || slider.active.index == slideIndex) return;
			// declare that plugin is in motion
			slider.working = true;
			// store the old index
			slider.oldIndex = slider.active.index;
			// if slideIndex is less than zero, set active index to last child (this happens during infinite loop)
			if(slideIndex < 0){
				slider.active.index = getPagerQty() - 1;
			// if slideIndex is greater than children length, set active index to 0 (this happens during infinite loop)
			}else if(slideIndex >= getPagerQty()){
				slider.active.index = 0;
			// set active index to requested slide
			}else{
				slider.active.index = slideIndex;
			}
			// onSlideBefore, onSlideNext, onSlidePrev callbacks
			slider.settings.onSlideBefore(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
			if(direction == 'next'){
				slider.settings.onSlideNext(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
			}else if(direction == 'prev'){
				slider.settings.onSlidePrev(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
			}
			// check if last slide
			slider.active.last = slider.active.index >= getPagerQty() - 1;
			// update the pager with active class
			if(slider.settings.pager) updatePagerActive(slider.active.index);
			// // check for direction control update
			if(slider.settings.controls) updateDirectionControls();
			// if slider is set to mode: "fade"
			if(slider.settings.mode == 'fade'){
				// if adaptiveHeight is true and next height is different from current height, animate to the new height
				if(slider.settings.adaptiveHeight && slider.viewport.height() != getViewportHeight()){
					slider.viewport.animate({height: getViewportHeight()}, slider.settings.adaptiveHeightSpeed);
				}
				// fade out the visible child and reset its z-index value
				slider.children.filter(':visible').fadeOut(slider.settings.speed).css({zIndex: 0});
				// fade in the newly requested slide
				slider.children.eq(slider.active.index).css('zIndex', 51).fadeIn(slider.settings.speed, function(){
					$(this).css('zIndex', 50);
					updateAfterSlideTransition();
				});
			// slider mode is not "fade"
			}else{
				// if adaptiveHeight is true and next height is different from current height, animate to the new height
				if(slider.settings.adaptiveHeight && slider.viewport.height() != getViewportHeight()){
					slider.viewport.animate({height: getViewportHeight()}, slider.settings.adaptiveHeightSpeed);
				}
				var moveBy = 0;
				var position = {left: 0, top: 0};
				// if carousel and not infinite loop
				if(!slider.settings.infiniteLoop && slider.carousel && slider.active.last){
					if(slider.settings.mode == 'horizontal'){
						// get the last child position
						var lastChild = slider.children.eq(slider.children.length - 1);
						position = lastChild.position();
						// calculate the position of the last slide
						moveBy = slider.viewport.width() - lastChild.width();
					}else{
						// get last showing index position
						var lastShowingIndex = slider.children.length - slider.settings.minSlides;
						position = slider.children.eq(lastShowingIndex).position();
					}
					// horizontal carousel, going previous while on first slide (infiniteLoop mode)
				}else if(slider.carousel && slider.active.last && direction == 'prev'){
					// get the last child position
					var eq = slider.settings.moveSlides == 1 ? slider.settings.maxSlides - getMoveBy() : ((getPagerQty() - 1) * getMoveBy()) - (slider.children.length - slider.settings.maxSlides);
					var lastChild = el.children('.bx-clone').eq(eq);
					position = lastChild.position();
				// if infinite loop and "Next" is clicked on the last slide
				}else if(direction == 'next' && slider.active.index == 0){
					// get the last clone position
					position = el.find('.bx-clone').eq(slider.settings.maxSlides).position();
					slider.active.last = false;
				// normal non-zero requests
				}else if(slideIndex >= 0){
					var requestEl = slideIndex * getMoveBy();
					position = slider.children.eq(requestEl).position();
				}
				// plugin values to be animated
				var value = slider.settings.mode == 'horizontal' ? -(position.left - moveBy) : -position.top;
				setPositionProperty(value, 'slide', slider.settings.speed);
			}
		}
		
		/**
		 * Transitions to the next slide in the show
		 */
		el.goToNextSlide = function(){
			// if infiniteLoop is false and last page is showing, disregard call
			if (!slider.settings.infiniteLoop && slider.active.last) return;
			var pagerIndex = parseInt(slider.active.index) + 1;
			el.goToSlide(pagerIndex, 'next');
		}
		
		/**
		 * Transitions to the prev slide in the show
		 */
		el.goToPrevSlide = function(){
			// if infiniteLoop is false and last page is showing, disregard call
			if (!slider.settings.infiniteLoop && slider.active.index == 0) return;
			var pagerIndex = parseInt(slider.active.index) - 1;
			el.goToSlide(pagerIndex, 'prev');
		}
		
		/**
		 * Starts the auto show
		 *
		 * @param preventControlUpdate (boolean) 
		 *  - if true, auto controls state will not be updated
		 */
		el.startAuto = function(preventControlUpdate){
			// if an interval already exists, disregard call
			if(slider.interval) return;
			// create an interval
			slider.interval = setInterval(function(){
				slider.settings.autoDirection == 'next' ? el.goToNextSlide() : el.goToPrevSlide();
			}, slider.settings.pause);
			// if auto controls are displayed and preventControlUpdate is not true
			if (slider.settings.autoControls && preventControlUpdate != true) updateAutoControls('stop');
		}
		
		/**
		 * Stops the auto show
		 *
		 * @param preventControlUpdate (boolean) 
		 *  - if true, auto controls state will not be updated
		 */
		el.stopAuto = function(preventControlUpdate){
			// if no interval exists, disregard call
			if(!slider.interval) return;
			// clear the interval
			clearInterval(slider.interval);
			slider.interval = null;
			// if auto controls are displayed and preventControlUpdate is not true
			if (slider.settings.autoControls && preventControlUpdate != true) updateAutoControls('start');
		}
		
		/**
		 * Returns current slide index (zero-based)
		 */
		el.getCurrentSlide = function(){
			return slider.active.index;
		}
		
		/**
		 * Returns number of slides in show
		 */
		el.getSlideCount = function(){
			return slider.children.length;
		}

		/**
		 * Update all dynamic slider elements
		 */
		el.redrawSlider = function(){
			// resize all children in ratio to new screen size
			slider.children.add(el.find('.bx-clone')).width(getSlideWidth());
			// adjust the height
			slider.viewport.css('height', getViewportHeight());
			// update the slide position
			if(!slider.settings.ticker) setSlidePosition();
			// if active.last was true before the screen resize, we want
			// to keep it last no matter what screen size we end on
			if (slider.active.last) slider.active.index = getPagerQty() - 1;
			// if the active index (page) no longer exists due to the resize, simply set the index as last
			if (slider.active.index >= getPagerQty()) slider.active.last = true;
			// if a pager is being displayed and a custom pager is not being used, update it
			if(slider.settings.pager && !slider.settings.pagerCustom){
				populatePager();
				updatePagerActive(slider.active.index);
			}
		}

		/**
		 * Destroy the current instance of the slider (revert everything back to original state)
		 */
		el.destroySlider = function(){
			// don't do anything if slider has already been destroyed
			if(!slider.initialized) return;
			slider.initialized = false;
			$('.bx-clone', this).remove();
			slider.children.removeAttr('style');
			this.removeAttr('style').unwrap().unwrap();
			if(slider.controls.el) slider.controls.el.remove();
			if(slider.controls.next) slider.controls.next.remove();
			if(slider.controls.prev) slider.controls.prev.remove();
			if(slider.pagerEl) slider.pagerEl.remove();
			$('.bx-caption', this).remove();
			if(slider.controls.autoEl) slider.controls.autoEl.remove();
			clearInterval(slider.interval);
			$(window).unbind('resize', resizeWindow);
		}

		/**
		 * Reload the slider (revert all DOM changes, and re-initialize)
		 */
		el.reloadSlider = function(settings){
			if (settings != undefined) options = settings;
			el.destroySlider();
			init();
		}
		
		init();
		
		// returns the current jQuery object
		return this;
	}

})(jQuery);

/*!
 * jQuery imagesLoaded plugin v2.1.0
 * http://github.com/desandro/imagesloaded
 *
 * MIT License. by Paul Irish et al.
 */

/*jshint curly: true, eqeqeq: true, noempty: true, strict: true, undef: true, browser: true */
/*global jQuery: false */

(function(c,n){var l="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";c.fn.imagesLoaded=function(f){function m(){var b=c(i),a=c(h);d&&(h.length?d.reject(e,b,a):d.resolve(e));c.isFunction(f)&&f.call(g,e,b,a)}function j(b,a){b.src===l||-1!==c.inArray(b,k)||(k.push(b),a?h.push(b):i.push(b),c.data(b,"imagesLoaded",{isBroken:a,src:b.src}),o&&d.notifyWith(c(b),[a,e,c(i),c(h)]),e.length===k.length&&(setTimeout(m),e.unbind(".imagesLoaded")))}var g=this,d=c.isFunction(c.Deferred)?c.Deferred():
0,o=c.isFunction(d.notify),e=g.find("img").add(g.filter("img")),k=[],i=[],h=[];c.isPlainObject(f)&&c.each(f,function(b,a){if("callback"===b)f=a;else if(d)d[b](a)});e.length?e.bind("load.imagesLoaded error.imagesLoaded",function(b){j(b.target,"error"===b.type)}).each(function(b,a){var d=a.src,e=c.data(a,"imagesLoaded");if(e&&e.src===d)j(a,e.isBroken);else if(a.complete&&a.naturalWidth!==n)j(a,0===a.naturalWidth||0===a.naturalHeight);else if(a.readyState||a.complete)a.src=l,a.src=d}):m();return d?d.promise(g):
g}})(jQuery);


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
 * @author: Sohrab Zabetian
 * @project hotdeals
 * @description: This file contains platform specific functions for hotdeals. Please refer to
 * 				 hotdeals.js for complete information.
 */
ND.platformDependentHotDeal = {
		
	regionObtainer : {	
		/**
		 * Display region link on the page. 
		 * @param model
		 */
		view : function( model ) {
			
			var existing = this._panel.find( '.hotdeals-postcode' );
				// Create the HTML to be injected
				render = $.tmpl(this.tmpl, model );				
//			console.log('postcodeTemplate.view');
			
			
			//Either replace or inject
			if( existing.length > 0) {
				existing.replaceWith( render );
//				console.log('postcodeTemplate.view - > replacing with old');
			} else {
//				console.log('postcodeTemplate.view - > appending to page');
				this._panel.append( render );
			}
			
			//used for mobile only, has no effect on web
			this._panel.trigger('create');
		},
		
		bindAdditionalListeners: function() {
//			console.log('ND.platformDependentHotDeal.regionObtainer.bindAdditionalListeners');
			var self = this;
			
			var locationTimeout;
			var doesCurrentLocationButtonExist = $('input.hotDeals-form-currentLocation').length > 0 ;
			if (doesCurrentLocationButtonExist) {
				$(document).on('click', 'input.hotDeals-form-currentLocation', function( e ) {
					
					e.preventDefault();
					self.loadingStatus( true );
					
					locationTimeout = setTimeout(function() {
						self.loadingStatus( false );
						geoLocator.locationNotFound(1);
					}, 20000);
					
					var geoLocator = ND.geoLocator({
						success: function(postcode) {
							clearTimeout(locationTimeout);
	//						console.log('success: clearTimeout');
							self.loadingStatus( false );
	//						console.log('Found postcode ' + postcode);
							var form = $(self.formSelector);
							form.find('#postcode').val(postcode);
							form.submit();
						},
						error: function(message) {
							
	//						console.log('error: clearTimeout');
							self.loadingStatus( false );
							self.formError(message);
						},
						maximumAge: 15000,
						timeout: 15000
					});
					geoLocator.findLocation();
				});
			}
			
			$(document).on('submit', '#hotDeals-form', function() {
				if (doesCurrentLocationButtonExist) {
					clearTimeout(locationTimeout);
				}
				return false;
			});
			
			//clean up the overlay for next round
			$.subscribe('overlay.usercancel', function() {
				var form = $(self.formSelector);
				form.find('#postcode').val('');
				self._errorMsg.slideUp('fast');
			});
		},
		
		loadingStatus: function(working) {
			$.mobile.loading( working ?  'show' : 'hide');
		}
	},
	
	hotDeal: {
		needPostcodeTemplate: function( selector ) {
			//var hd = $.mobile.activePage.find(selector);
			var hd = $.mobile.activePage.find(selector);
			return hd.length > 0 ? hd : null;
		}
	}

	
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



/**
 * @author Sohrab Zabetian
 * @project mobile shopping tool/dealer locator/form builder
 * @description: This file contains platform specific functions for invoking geolocation for dealerlocator
 * TODO: see if we can use this for all current location buttons 
 */
ND.DealerLocator = (function($, undefined){
	
	var currentLocation = {
		init: function(options) {
			options = options ||  {} ;
			
			var self = this;
			self.pubsubPrefix = options.pubsubPrefix || 'dealerlocator.dfy';
			self.currentLocationButtonSelector = options.currentLocationButtonClass || 'button.dealer-form-currentLocation';
			self.$formSelector = $(options.formSelector || 'form.search');
			self.hiddenFieldSelector = options.hiddentFieldSelector || '#dealer-form-currentLocation';
			self.$errorSelector = $(options.errorSelector || '#currentLocationError');
			
			for (key in this.pubsub) {
				$.subscribe(self.pubsubPrefix + key, this.pubsub[key]);
			}
		},
		
		isCurrentLocationAvailable : function() {
			return this.$formSelector.length > 0 && this.$formSelector.find(this.currentLocationButtonSelector).length > 0;
		},
		
		start: function() {
			var self = this;
			self.$formSelector.on('click', self.currentLocationButtonSelector, function( e ) {
				e.preventDefault();
				locationTimeout = setTimeout(function() {
					geoLocator.locationNotFound(1);
				}, 15000);
				
				var geoLocator = ND.geoLocator({
					success: function(postcode) {
						clearTimeout(locationTimeout);
						$(self.hiddenFieldSelector).val(postcode);
						self.$formSelector.submit();
					},
					error: function(message) {
						clearTimeout(locationTimeout);
						self.$errorSelector.text(message);
					},
					maximumAge: 10000,
					timeout: 10000
				});
				geoLocator.findLocation();
			});
		},
		
		destroy : function() {
			this.$formSelector.off('click', this.currentLocationButtonSelector);
		},
		
		pubsub:  {
			destroy:function( event, data ) {
				this.destroy();
			}
		}
	};
	
	
	/**
	 * For dealerlocators embedded in forms,
	 * manage radio buttons.
	 * 
	 * when span.radio-icon are clicked parent (li) should have class="checked"
	 * also a hidden radio button will be selected.
	 */
	var	manageRadioButtons = function(options) {
		var $form = $('#dl-formBuilder');
		if ($form.length > 0) {
			var $radioBtns = $form.find('span.radio-icon');
			$radioBtns.on('click', function() {
				$radioBtns.each(function() {
					$(this).parent().removeClass('checked');
				});
				$form.find('input[type="radio"]').each(function() {
					$(this).removeAttr('checked');
				});
				
				
				var thisListItem = $(this),
					dealerId = thisListItem.data('dealer');
				
				thisListItem.parent().addClass('checked');
				$('#dealer-' + dealerId).attr('checked', 'checked');
			});
		}
	};
			
	
	/*
	 * Startup currentLocation
	 * TODO: need to expose a handle so we can pass in arguments
	 */
	return function( arg ) {
		var manager = Object.create( currentLocation );
		manager.init.call( manager, arg );
		if (manager.isCurrentLocationAvailable()) {
			manager.start();
		}
		manageRadioButtons();
		return manager;
	};
	
	
})(jQuery);


/* nativemap.js */
/**
 * @author Sohrab Zabetian
 * @project smob dealer locator
 * @description: based on lat/lng, generates a map link recognizable by mobile devices
 * so that when the user clicks on the link, the native map app opens. 
 */

(function($) {
    ND.getMobileDevice = function(){
        var ua = navigator.userAgent,
            plt = navigator.platform,
            device,
            deviceChecker = {
                iphone: function() {
                    return ua.match(/(iPhone|iPod|iPad)/i) || plt.match(/(iPhone|iPod|iPad)/i) ;
                },
//                blackberry : function() {
//                    return ua.match(/BB/i) || plt.indexOf('blackberry');
//                },
                android:  function() {
                    return ua.match(/Android/) 
                    || ua.match(/Dalvik/)
                    || ua.match(/GINGERBREAD/)
                    || ua.match(/Linux;.*Mobile Safari/)
                    || ua.match(/Linux 1\..*AppleWebKit/) || plt.indexOf('android') > 0 ;
                }
//                ,
//                opera:  function() {
//                    return ua.match(/Opera Mini/i) || plt.match(/Opera Mini/i);
//                },
//                windows:  function() {
//                    return ua.match(/IEMobile/i) || plt.indexOf('win');
//                }
            }; 


        for (device in deviceChecker) {
            if (deviceChecker[device].call()) {
                return device;
            }
        }
        return null;
    };
    
    var convert = function(mobileDevice, lat,lng) {

        switch (mobileDevice) {

            case 'iphone' :
                // return 'http://maps.apple.com/?saddr=Current%20Location&daddr=' + lat + ',' + lng;
                return 'http://maps.apple.com/?ll=' + lat + ',' + lng;
            case 'android':
                // return 'https://maps.google.com/maps?f=d&daddr=' + lat + ',' + lng;
                return 'http://maps.apple.com/?ll=' + lat + ',' + lng;
        }
        return null;

    };

    var nativeMapURLGenerator = function() {

        var mobileDevice = ND.getMobileDevice(),
            $linksToConvert = $('.dl-convertToNativeMapUrl'),
            $link, lat, lng;

        if (mobileDevice != null && $linksToConvert.length > 0) {

            $linksToConvert.each(function() {
                $link = $(this);
                lat = $link.data('lat');
                lng = $link.data('lng');
                if (typeof lat !== 'undefined' && typeof lng !== 'undefined' &&
                    lat != null && lng != null && lat !== '' && lng !== '') {

                    var url = convert(mobileDevice, lat, lng);
                    // window.alert(mobileDevice + ' :' +  url);
                    if (url != null) {
                        $link.attr('href', url);
                    } else {
                        $link.removeClass('dl-convertToNativeMapUrl');
                        $link.addClass('dl-showDealerOnMap');
                    }
                }
            });
        }
    };
    
    $(document).on("pagechange", function() {
    	nativeMapURLGenerator();
    });
})(jQuery);


/*
 * hotdeals.js
 * Author: Glenn Baker
 */

/*globals window, document, jQuery, ND, SiteConf */
ND.hotDeals = (function($, undefined){
	
	var /* Generic Error string */
		genericError = "Oops! There was an internal problem",
		
		/* 
		 * Error codes for the JSON service
		 */
		errorCodes = {
			MISSING_POSTCODE: "MISSING_POSTCODE",
			INVALID_POSTCODE: "INVALID_POSTCODE",
			INCORRECT_POSTCODE: "INCORRECT_POSTCODE",
			SUCCESS: "SUCCESS"
		},
		
		/*
		 * Object: hotDeals
		 * 
		 * The Hot Deals manager, takes care of links and cookie considerations
		 */
		hotDeals = {

			/*
			 * Constructor of sorts
			 */
			init: function( options ) {
				// console.log('hotdeal.init()');
				options || ( options = {} );
			
				var self = this;
				self.enabledRedirect = true;
				
				//Required links for page
				self.elementsSelector = options.links || '.overlay-hotdeals, .force-overlay-hotdeals';
				self.elementPanelSelector = options.panel || '#hotdeals-panel';
				
				self.bindLinks();
				self.initPubsub();				
				self.render();
			},
			
			/*
			 * Listen to the PUBSUB channel for Shopping Prefenences
			 */
			initPubsub: function() {
				var self = this;
				
				this.pubsub = {
					change:function( event, data ) {
						data = data || {};
						self.postcode = data.postcode;
						self.region = data.region;
					}
				};
				
				// Get the current postcode right now.
				$.publish( "shopping.pref.retrieve", this.pubsub.change );

				// Register for the changes in the future
				$.subscribe( "shopping.pref.change", this.pubsub.change );
				
				$.subscribe( "shopping.pref.destroy", this.destroy );
			},
			
			/*
			 * Renders the tmpl
			 */
			render: function() {
				var hdPanel = needPostcodeTemplate( this.elementPanelSelector );
				if( hdPanel != null ) {
					this._template = Object.create( postcodeTemplate );
					this._template.conf = self.conf;
					this._template.init( hdPanel , this.getPostcode(), this.getRegion() );					
				}
				return this._template;
			},
			
			/*
			 * Function for getting the postcode
			 */
			getPostcode: function() {
				return this.postcode;
			},
			
			/*
			 * Function for getting the region
			 */
			getRegion: function() {
				return this.region;
			},
			
			/*
			 * Function for getting the Obtainer
			 */
			getObtainer: function() {
				return this._obtainer;
			},			
			
			/*
			 * Binds the overlay links
			 */
			bindLinks: function() {
				var self = this;
				
				$(document).on( "click", self.elementsSelector, function(e) {
					
					var region, postcode, 
						ignoreCookie = $(this).hasClass('force-overlay-hotdeals');

					//Possibly ignore the cookie.
					if( ignoreCookie ) {

						e.preventDefault();
						self.obtainRegion( this );
					
					//	Otherwise
					} else {
					
						e.preventDefault();
	
						region = self.getRegion();
						postcode = self.getPostcode();
	
						if( region || postcode ) {
							self.handleRegion( this, region, postcode );
						} else {
							self.obtainRegion( this );
						}
					}
				});
			},
			
			/*
			 * There is region in cookie, 
			 * But we still need to go and get the destination URL
			 */
			handleRegion: function( elem, region, postcode ) {
				var self = this,
					//"el.href" will return different result when href="", IE return location.host, FF return location.href;
					regionURL = this.ajaxRegionURL($(elem).attr("href") || location.href, region, postcode );

				$.when( regionURL )
					.done( function( data ) {
						
						/*
						 * Success
						 * { "region": "Region1", "regionName": "Melbourne", "regionId": "1248851195750", "url": "http://master2.ndprod.corp.nextdigital.com/en/hot-deals/victoria?sitetype=web&site=Master2", "cid": "1248851260705" } 
						 * Error
						 * { "errorCode": "INVALID_POSTCODE", "error": "There is no region for your postcode" }
						 */

						if( data ) {
						
							//Default value is success if there was no error.
							data.errorCode || ( data.errorCode = errorCodes.SUCCESS);

							if( data.errorCode === errorCodes.SUCCESS && data.region && data.url ) {
						
								// UC-01 7.1.5.	MAP POSTCODE TO REGION: Dragonfly maps the postcode value to obtain the corresponding region. The JavaScript-enabled browser will cache the postcode and set in cookie.
								
								// Confirmed Postcode and region gets set in cookie
								$.publish( "shopping.pref.save", {
									postcode: postcode,
									region: data.region,
									regionLabel: data.regionName
								});
							
								// Send user to region page
								self.doneRedirect( data.url || elem.href );
							
							} else if( data.errorCode === errorCodes.INVALID_POSTCODE )  {
								
								// UC-01 - 8.4 2. DISPLAY ERROR MESSAGE: Dragonfly displays error message advising end user that postcode chosen does not exist. End user stays on the current page being loaded.
								if (typeof self._template === 'undefined') { 
									//On home page, there is no template, hence if an invalid postcode is entered the code will break as
									//tries to find an element to display an error message on the page.
									//as a remedy, just redirect the user to national page and let them see the error message there.
									self.doneNational( elem );
								} else {
									self.doneCasualError(data.error );	
								}
								// Invalid postcode, let's remove it.
								$.publish( "shopping.pref.save", {
									postcode: undefined,
									region: undefined,
									regionLabel: undefined
								});
							
							} else {
								
								self.doneObtainerError( data.error || genericError );
							}

						} else {
							
							// Serious issue
							self.doneObtainerError( genericError );

						}
					
					})
					.fail( function() {
						self._obtainer.loadingStatus( false );					
						self.doneNational( elem );
					});
				
				//Return the promise
				return regionURL;
			},

			/* 
			 * Function to create the Region URL XHR object.
			 */
			ajaxRegionURL: function( destination, region, postcode ) {
				this.conf || ( this.conf = $("#hotdeals-data").embeddedData() );
				
				var params = {
					url: destination
				};
				
				if( postcode ) {
					params.postcode = postcode;
				}

				if( region ) {
					params.region = region;
				}
				
				var promise = $.ajax({
					url: this.conf['xhr-hotdeals-data'],
					dataType: 'json',
					cache: true,
					data: params
				});
								
				return promise;
			},
			
			/*
			 * Do what the link would normally do, but we already prevented the default behaviour.
			 */
			doneRedirect: function( href ) {
				//console.log('doneRedirect');
				if( window.location.href.indexOf( href ) < 0 ) {
					$.publish('hotdeals.redirect', {url: href});
					if( this.enabledRedirect ) {
						window.location.href = href;
					}
				} else {
					this.doneNoRedirect();
				}
			},	
			
			/*
			 *	There was a problem so error message.
			 */
			doneObtainerError: function( msg ) {
				$.publish('hotdeals.noredirect');
				if( this._obtainer ) {
					this._obtainer.loadingStatus( false );
					this._obtainer.formError( msg );
				}
			},
			
			doneNational: function(elem) {
				window.location.href =  $(elem).attr('href');
			},

			/*
			 *	There was a problem so error message.
			 */
			doneCasualError: function( msg ) {
				this.doneNoRedirect();
				this._template.setError( msg );
			},

			
			/*
			 * Function to cleanup if we are not redirecting
			 */
			doneNoRedirect: function() {
				//console.log('doneNoRedirect');
				$.publish('hotdeals.noredirect');
				if( this._obtainer ) {
					this._obtainer.destroy();
					delete this._obtainer;
				}
			},

			/*
			 * There was no region in cookie, 
			 * So let's ask the user to select from overlay
			 */
			obtainRegion: function( elem ) {
				
				var obtainer, self = this;
				
				/*
				if( self._obtainer ) {
					self._obtainer.destroy();					
				}
				*/

				obtainer = Object.create(regionObtainer);
				obtainer.conf = self.conf;
				obtainer.init( { 
					
					/*
					 * Successful form submit. That is all.
					 * Please note the overlay must still be open.
					 */
					formSubmit: function( postcode ) {
						
						//Handle the Result of the Overlay Form
						self.handleRegion( elem, false, postcode );
														
					},
					
					/*
					 * Overlay was cancelled
					 * 
					 */
					cancel: function() {
						if( $(elem).hasClass('force-overlay-hotdeals') ) {
							self.doneNoRedirect();
						} else {
							//UC-01 8.5.2: DISPLAY NATIONAL PAGE
							self.doneRedirect( elem.href );
						}
					}
					
				});				
				self._obtainer = obtainer;
			},
		
			/*
			 * Cleanup method
			 */
			destroy: function() {
				//console.log('ND.hotDeal.destroy');
				if( this._obtainer ) {
					this._obtainer.destroy();
					delete this._obtainer;
				}
				if( this._template ) {
					this._template.destroy();
					delete this._template;
				}
				
				$(document).off("click", this.elementsSelector);
				for( channel in this.pubsub ) {
					$.unsubscribe( "shopping.pref." + channel, this.pubsub[channel] );
				}
				this.pubsub = this.conf = this._template = this._obtainer = null;
			}
			
		},
		
		
		/*
		 * Object: regionObtainer
		 * 
		 * Region Obtainer. Takes it to the next level, launching the overlay and 
		 * Rendering the form
		 */
		regionObtainer = {

			/*
			 * Constructor of sorts
			 */
			init: function( options ) {
				var self = this;
				
				this._guid = +new Date();
				
				this.options = options;
				this.formSelector = options.formSelector || '#hotDeals-form';
				this.conf || ( this.conf = $("#hotdeals-data").embeddedData() );
				
				if( this.conf['xhr-hotdeals-form'] ) {
					
					//Launch overlay
					$.publish('overlay.launch', {
						url: this.conf['xhr-hotdeals-form'],
						positionType: 'window',
						name: "Hot Deals Select Region",
						//type: 'overlay-hotdeals',
						success: function() {
							self._form = $(self.formSelector);
							if( self._form.size() ) {
								self.ready();
							} else {
								self.error();
							}
						}
					});					
				}
			},
			
			/*
			 * Ready to take postcode orders!
			 * I.e the Overlay is readu
			 */
			ready: function() {
				this.bindError();
				this.bindSubmit();
				this.bindAdditionalListeners.call(this);
				this.bindCancel();
				this.loadingStatus( false );
				this.setFocus();
				$.publish('hotdeals.obtainerReady');
			},
			
			/*
			 * Obtainer to go away quietly.
			 */
			done: function() {
				// Check if the overlay is still open based on the form exist.
				if( $( this.formSelector ).length ) {
					$.publish('overlay.hide');
				}
			},
			
			setFocus: function() {
				this._form.find('input[type="text"]').first().select();
			},
			
			/*
			 *	Bind to the overlay hotdeals form submit
			 */
			bindSubmit: function() {
				var self = this;
				//console.log('hotdeals.bindSubmit()');
				
				
				$(document).off('submit', '#hotDeals-form').on('submit', '#hotDeals-form', function( e ) {
					
					e.preventDefault();					
					//console.log('hotdeal->submit');
					var form = self._form;
					
				 	//grab local 
					var $postcodeField = form.find('[name=postcode]');
					var postcode = $postcodeField.val();
					
					//Validate Form
					if( $.trim( postcode ).length === 4 && !isNaN(postcode) ) {
						//prevent multi submission
						
						self.loadingStatus( true );
						self.formSuccess( postcode );
						//clear the fields for next round
						$postcodeField.val('');
					} else {
						self.formError();
					}
					return false;
				});
				
				
				$(document).on('keydown', '#hotDeals-form #postcode', function( e ) {
					
					self._errorMsg.slideUp('fast');
				});
				
			},
			
			bindAdditionalListeners: ND.platformDependentHotDeal.regionObtainer.bindAdditionalListeners,
			
			/*
			 *	Bind to the cancel of the overlay
			 */			
			bindCancel: function() {
				this.loadingStatus( false );		
				if( this.options.cancel ) {
					$.subscribeOnce('overlay.usercancel', this.options.cancel );
				}
			},
			
			/*
			 * Bind for error
			 */
			bindError: function() {
				
				var self = this;
				self.loadingStatus( false );		
				this._errorMsg =  this._form.find('.error');
				this.standardError =  this._form.find('#standard-error').text();

				$(document).on('keydown', '#hotDeals-form #postcode', function( e ) {
					self._errorMsg.slideUp('fast');
				});
			},
			
			/*
			 * Function helper for the loading status
			 */
			loadingStatus: ND.platformDependentHotDeal.regionObtainer.loadingStatus,
			
			/*
			 * Form success
			 * - Overlay does not get closed.
			 */
			formSuccess: function( postcode ) {
				this.loadingStatus( false );		
				this.options.formSubmit.call( null, postcode );
			},
			
			/*
			 * Form error
			 */
			formError: function( msg ) {
				this.loadingStatus( false );		
				this._errorMsg
					.text( msg || this.standardError )
					.slideDown('fast');
			},
			
			/*
			 * An error
			 */
			error: function() {
				//console.log("Error: regionObtainer");
			},
			
			/*
			 * Cleanup method
			 */
			destroy: function() {
				this.done();
				$(document)
					.off('submit', '#hotDeals-form')
					.off('click', '#hotDeals-form .hotDeals-form-currentLocation')
					.off('keydown', '#hotDeals-form #postcode');				
				$.unsubscribe('overlay.usercancel', this.options.cancel );
				this._form = this.conf = null;
			}
		},
		
		
		/*
		 * Helper function to see if the postcodeTemplate object is neccessary
		 */
		needPostcodeTemplate = ND.platformDependentHotDeal.hotDeal.needPostcodeTemplate,		
		
		/*
		 * Object: postcodeTemplate
		 * 
		 * The HTML view for the postcode
		 */
		//TODO..   $.extends( Object.create( hotDealsAbstract ), {
		postcodeTemplate = {
			
			/*
			 * Constructor of sorts
			 */
			init: function( panel, postcode, region) {
				this._panel = panel;
				this._postcode = postcode;
				this._region = region;				
				
				this.conf || ( this.conf = $("#hotdeals-data").embeddedData() );
				
				//Compile main template
				this.tmpl = $('#tmpl-hotdeals-links').template();
				
				this.updatePostCode();
				
				this.subscribing();
				
				this.controller();
			},
			
			/*
			 * Listen to the PUBSUB channel for Shopping Prefenences
			 */
			subscribing: function() {
				var self = this;
				
				this.pubsub = {
					change:function( event, data ) {
						data = data || {};
						self._postcode = data.postcode;
						self._region = data.region;
						self.controller();
					}
				};

				// Register for the changes in the future
				$.subscribe( "shopping.pref.change", this.pubsub.change );
			},
			
			/*
			* Update postcode in the contents
			*/
			updatePostCode: function() {
				if(this._postcode){
					$(".user-selected-postcode").text(" " + this._postcode);
				}else{
					$(".user-selected-postcode-msg").hide();
				}
			},
			
			/*
			 * Control the render;
			 */
			controller: function() {
				
				this.view( 
					this.model( 
						this.useError()
					) 
				);
				
			},	
			
			/*
			 * The data for the tmpl
			 */
			model: function( error ) {
				var model =  {};
				
				// Current postcode
				model.postcode = this._postcode;
				
				// Is page region is different to the region in cookie
				model.wrongPostcode = ( this._postcode && this.getPageRegion() && this._region !== this.getPageRegion() );
				
				// The error (is a string or false)
				model.error = error;
				
				return model;
			},
			
			/*
			 * Render the view
			 */
			view: ND.platformDependentHotDeal.regionObtainer.view,
			
			/*
			 * Returns the region for the current page
			 */
			getPageRegion: function() {
				return this.conf["page-region"];
			},
			
			/*
			 *  Set's the error for templating
			 */
			setError: function( error ) {
				this._error = error;
			},
			
			/*
			 * Use the error once
			 */
			useError: function() {
				var err = $.type( this._error ) === 'string' ? this._error : false;
					
				//reset the error once used
				delete this._error; 

				return err;
			},
			
			/*
			 * Cleanup method
			 */
			destroy: function() {
				$.unsubscribe( "shopping.pref.change", this.pubsub.change );
			}			
		};
		 
	/*
	 * Expose function that creates new hotDeals
	 * - ND.hotDeals 
	 */
	return function( arg ) {
		var manager = Object.create( hotDeals );
		manager.init.call( manager, arg );
		return manager;
	};
	
}(jQuery));


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


/**
 * @author szabetian
 * Description: Initializes hotdeals and region read/write from cookie
 * Project hotdeals/polk 
 */
(function() {
	
	//update default underscore template to use {{}} instead of default ${}
	
	$(document).on("pagechange", function() {
			//initialize cookie manager
			ND.shoppingPreferenceManager();
			// initilize hotdeals
			ND.hotDeals();
			//initialize polk 
			ND.CalcPrice.init();
			
			ND.DealerLocator();
			
			
			/**
			 * Since the new context depends on shopping pref, context need to be triggered right after
			 * to avoid race condition
		     * Execute voi-prepopulation for mobile
		     */
			ND.Context.isContextInitialised = false;
			ND.Context.startUp();
			
	});
	
	$(document).on('pagehide', function() {
		//remove hotdeals and shoppingpref listeners
		$.publish('shopping.pref.destroy');
		//remove polk listeners
		$.publish('destroy.calculateprice.dfy');
		
		$.publish('dealerlocator.dfy.destroy');
	});

})();


/*
 * Author: Doris
 *
 <a class="loan-calculator-overlay" href="/servlet/Satellite/doris/loan-calc">Loan Calculator</a>
 $('.loan-calculator-overlay').on('click',function(){
    $(this).loanCalculatorOverlay({...});
 });
 *
 */

(function($) {
	
	$.fn.loanCalculatorOverlay = function(options){
	    var defaults = {
	        price: 0,
	        symbol: '',
	        url: '',
	        priceformatter: null,
	        customClass: 'loan-calc',
	        location: '',
			complete: null //callback function
	    };

	    
		var options = $.extend(defaults, options);
		
		var loanOverlay = function(element){
		    var loanOverlay = this,
				url,
                total_price = 0,
				interest_rate = 0,
                loan_duration = 0,
                down_payment=0,
                results = 0;

			loanOverlay.init = function () {
			    total_price = Math.round(options.price);
			    results = total_price;
			    url = options.url.length > 0 ? options.url : element.attr("href");
			    $.publish('overlay.launch', {
			        url: url,
			        positionType: 'window',
			        customClass: options.customClass,
			        name: "Loan Calculator",
			        success: function () {
			            loanOverlay.calculate();
			            loanOverlay.updateContent();
			            loanOverlay.registerEvent();
			        },
			        error: function (e) {
			            console.log(e);
			        }
			    });
			};
			
			loanOverlay.calculate = function (isInvalid) {
			    if (!isInvalid && total_price > 0 && interest_rate > 0 && loan_duration > 0 && down_payment > 0 && down_payment < total_price) {
			        var total_rate_payable = (total_price - down_payment) * (interest_rate/100) * loan_duration;
			        results = (total_rate_payable + (total_price - down_payment)) / (loan_duration * 12);
			    }
			    else {
			        results = 0;
			    }
			};

			loanOverlay.updateContent = function () {
			    if (options.priceformatter) {
			        $('.loan-calc-overlay .title span.price').html(options.priceformatter.format(total_price));
			        $('.loan-calc-overlay .result span.price').html(options.priceformatter.format(results));
			    }
			    else {
			        $('.loan-calc-overlay .title span.price').html(total_price);
			        $('.loan-calc-overlay .result span.price').html(results);
			    }
			    $('.loan-calc-overlay span.symbol').html(options.symbol);
			    if (options.location.length) {
			        $('.loan-calc-overlay span.location').html(options.location);
			    }
			    else {
			        $('.loan-calc-overlay p.loc').hide();
			    }
			};

			loanOverlay.registerEvent = function () {
			    $('#duration').on('change propertychange input', function () {
			        loan_duration = parseFloat($(this).val());
			        doCalculate($(this));
			    });
			    $('#rate').on('change propertychange input', function () {
			        interest_rate = parseFloat($(this).val());
			        doCalculate($(this));
			    });
			    $('#payment').on('change propertychange input', function () {
			        down_payment = parseFloat($(this).val());
			        doCalculate($(this));
			    });

			    function doCalculate($ele) {
			        if (isNaN($ele.val())) {
			            $ele.parent().addClass('invalid');
			            loanOverlay.calculate(true);
			        }
			        else {
			            $ele.parent().removeClass('invalid');
			            loanOverlay.calculate(false);
			        }
			        loanOverlay.updateContent();
			    }

			    $('#overlay .close-button a').on('click', function (e) {
			        $('#overlay').removeClass(options.customClass);
			    })

			    // callback 
			    if ($.isFunction(options.complete)) {
			        options.complete.call(this);
			    }
			};
						
		};
		
		var appendOverlay = function(element){
		    var overlay = new loanOverlay(element);
		    overlay.init();
		};
		
		appendOverlay($(this));
		

	};
	

}(jQuery));


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


/*
 * Description: async is used to execute an function when an object is available
 * For example, the Bing Map will download other additional scripts,
 * but we don't know when the download is complete.
 */
(function(){
	var w=window;
	var ND = w.ND = w.ND || {};

	w.async = ND.async = function (expr, fun) {
		var num = 40;
		var syncId = w.setInterval(function () {
			if (typeof w[expr] != "undefined") {
				w.clearInterval(syncId);
				fun();
			} else if (!num--) {
				w.clearInterval(syncId);
			}
		}, 800);
	};
})();


/*Loadscript from third part url*/
(function($){
	var ND = window.ND = window.ND || {};

	ND.loadScript = function(url, callback){

		var script = document.createElement("script")
		script.type = "text/javascript";

		if (script.readyState){  //IE
			script.onreadystatechange = function(){
				if (script.readyState == "loaded" ||
						script.readyState == "complete"){
					script.onreadystatechange = null;
					callback();
				}
			};
		} else {  //Others
			script.onload = function(){
				callback();
			};
		}

		script.src = url;
		document.body.appendChild(script);
	}
})(jQuery);


/**
 * @author ? /updated by Sohrab Zabetian
 * @project smob dealer locator/
 * @description: manages/init map for smob dealer locator
 * Requires the following json somewhere in DOM body:
 * 
 * <script id="dealerLocatorBingMapConfig" type="text/x-json">
 *	{
 *		"zoom" : "${dealerLocatorBean.map_default_zoom *2}",
 *		"mapContainer" : "#dealerLocatorMap",
 *		"mapCloseMapButton" : "#mapCloseMapButton",
 *		"credentials" : "${dealerLocatorBean.mapKey}"
 *	}
 *	</script>
 *
 * as well as at least one div with lat, lng data
 * 
 * <div class="dealerMapData" data-lng="-25" data-lat="-140"></div>
 *
 * if no div exists centers the map to center of Australia. 
 *
 * REMEMBER that MAP IS ENABLED/DISABLED by DFYTranslation "DealerLocator/EnableMapForDealer"						
 */
(function($){

    var bingMap = {
	    map : null,
        defaultCenter : {lat : -25.610111, lng : 134.354806},
        defaultZoom: 12,

        init : function($mapConfig){

            var mapConfig;

            if ($mapConfig.length) {
            	//incase microsoft is not available right away, try again in 300 ms
                if (typeof Microsoft === 'undefined' || 
                	typeof  Microsoft.Maps === 'undefined' || 
                	typeof Microsoft.Maps.Location === 'undefined')  {
                    setTimeout(function() {
                    	bingMap.parseMapConfig($mapConfig) ;
                    }, 500);
                }  else {
                	bingMap.parseMapConfig($mapConfig);
                }
            }
        },

        parseMapConfig: function($mapConfig) {
            mapConfig = JSON.parse($mapConfig.html());
            var locations = [], mapPoint, lat, lng, i, dealerLocation;
            $('div.dealerMapData').filter(':visible').each(function() {
                mapPoint = $(this);
                lat = mapPoint.data('lat');
                lng = mapPoint.data('lng');
                if (typeof lat !== 'undefined' && typeof lng !== 'undefined' &&
                    lat != null && lng != null && lat !== '' && lng !== '') {
                    dealerLocation = new Microsoft.Maps.Location(lat,lng) ;
                    locations.push(dealerLocation);
                    bingMap.attachPanToPinEventHandler(mapPoint.parent().find('.dl-showDealerOnMap'), dealerLocation);
                }
            });

            bingMap.attachHeroMapEventHandler($('.dl-viewFullScreen'), $(mapConfig.mapCloseMapButton));

            if (locations.length === 0) {
                locations.push(new Microsoft.Maps.Location(bingMap.defaultCenter.lat, bingMap.defaultCenter.lng));
            }
            mapConfig.dealers = locations;
            bingMap.create(mapConfig);
            for (i = 0; i < locations.length; i++) {
                bingMap.addPin(locations[i]);
            }
        },

        //Create map
        create : function(config){
        	bingMap.map = new Microsoft.Maps.Map($(config.mapContainer)[0], {
                credentials: config.credentials,
                enableSearchLogo: false,
                enableClickableLogo: false,
                mapTypeId: Microsoft.Maps.MapTypeId.road,
                zoom: Number(config.zoom),
                showDashboard: false
            });
        	bingMap.defaultZoom = Number(config.zoom);
        	bingMap.map.setView({bounds: Microsoft.Maps.LocationRect.fromLocations(config.dealers)});
        },

        //Add a pin to the center of the map
        addPin: function(point){
            var pin = new Microsoft.Maps.Pushpin(point);
            bingMap.map.entities.push(pin);
        },


        attachPanToPinEventHandler: function($btn, dlLocation) {
            $btn.on('click', function(e) {
                e.preventDefault();
                bingMap.map.setView({center: dlLocation, zoom: bingMap.defaultZoom});
                $('html, body').animate({ scrollTop: 0 }, 'slow');
            });
        },

        //Larger map handler
        attachHeroMapEventHandler: function($enterBtns, $exitBtns){
            if ($enterBtns.length && $exitBtns.length) {
                var $window = $(window), 
					$body,
                	$currentPage;

                var enter = function(e){
                	e.preventDefault();
                	e.stopPropagation();
                	
                	$body = $(document.body);
                	$currentPage = $body.find("div[data-role='page']");
                	
                	var winHeight = $currentPage.css("min-height");
                	
                	$currentPage.css("height",winHeight);
                	$body.addClass("hero");

                    $window.on("resize", resize);
                    $window.trigger("resize");
                };

                var exit = function(e){
                	e.preventDefault();
                	e.stopPropagation();
                	$currentPage.css("height","");

                    $body.removeClass("hero");

                    $window.off("resize", resize);
                };

                var resize = function(){
                    $window.scrollTop($window.height());
                };

                $enterBtns.on("click", enter);
                $exitBtns.on("click", exit);
            }
        }
    };
    
    $(document).on("pagechange", function() {
    	
		var $mapConfig = $('#dealerLocatorBingMapConfig');
		if ($mapConfig.length > 0) {
			var mgr = Object.create(bingMap);
			mgr.init.call(mgr, $mapConfig);
	    }
    });

})(jQuery);


/* History go back button: reset state, and go back implement. */
(function($){
	$.fn.historyBack = function(){
		return this.each(function(){
			//using override "onclick" to avoid duplicate click event rised.
			this.onclick = function(e){
				//window.history.go(-1);
				
                e.stopPropagation();
                e.preventDefault();
                window.history.back(-1);
				
			};
		});
	};
})(jQuery);


/* Switch image from anchor*/
(function($){
	
	var defaults = {
		uriAttr: "href",
		target: ".imgnav img",
		targetAttr: "src"
	};

	$.fn.switchImage = function(options){

		var settings = $.extend(true, {}, defaults, options);

		return this.each(function(){
			$(this).click(onClickSource);
		});

		function onClickSource(e){
			//prevent link to the image directly
			e.stopPropagation();
			e.preventDefault();

			var $this = $(this),
				uri = $this.attr(settings.uriAttr),
				$target = $(settings.target);

			//The last one is the real one.
			$target = $target[$target.size()-1];
			$target.onload = $target.onerror = onLoadComplete;

			if (uri) {
				//open the message box
				$.mobile.showPageLoadingMsg();

				//load the image
				$target[settings.targetAttr] = uri;

				//change the display text
				$this.parent().parent().parent().find(".colortxt").html(
					$this.attr("title")
				);
			}
		}

		//when the image is loaded or error is rised close the loading box
		function onLoadComplete(e){
			$.mobile.hidePageLoadingMsg();
		};
	};
})(jQuery);


/*
 * Description: Change select option, doesn't have depandence of jQuery 
 */
(function(){
	var ND = window.ND = window.ND || {};

	var selectOption = ND.selectOption = {

		init : function(cities){
			var mainOption = $("#select-state")[0];
			var subOption = $("#select-city");
			var isSelectRegionOnly = false;
			if ($("body div[data-role='page']").length>0) {
			    isSelectRegionOnly = $("body div[data-role='page']").hasClass("select-region-only") || $("body div[data-role='content']").hasClass("select-region-only");
			}

			if(!mainOption){
				return;
			}

			//create states option list
			var states = cities.list[0].states,
				optionObj = {}, i, len;

			selectOption.clearOption(mainOption);
			//selectOption.addOption(mainOption, "Select", "");
			for(i=0, len=states.length;i<len;i++){
				var val = states[i][0];
				var txt = val;
				optionObj[val] = states[i][1].cities;
				if (isSelectRegionOnly) {
				    txt = (val === optionObj[val][0][0]) ? val : (val + '/' + optionObj[val][0][0]);
				}
				selectOption.addOption(mainOption, txt, val);
			}

			if (isSelectRegionOnly) {
			    subOption[0].parentNode.parentNode.parentNode.remove();
			}
			else {
			    //create cities option list
			    mainOption.onchange = function (e) {
			        var city = optionObj[mainOption.value];
			        if (!city) {
			            return;
			        }

			        selectOption.clearOption(subOption[0]);
			        //selectOption.addOption(subOption[0], "Select", "");
			        for (i = 0, len = city.length; i < len; i++) {
			            selectOption.addOption(subOption[0], city[i][0], city[i][0]);
			        }

			        //jQuery Mobile: refresh the select options.
			        if ($.mobile) {
			            subOption.selectmenu('refresh');
			        }
			    };
			}
		},

		addOption : function(select, txt, value){
			if (select && select.options) {
				var opts = select.options;
				opts[opts.length] = new Option(txt, value);
			}
		},

		clearOption : function(select){
			if (select && select.options) {
				select.options.length = 1;
			}
		}
	};

})();


/* 
 * Link State
 * Compare the current page url with anchors,
 * if match attach the selected class.
 */
(function($){
	var defaults = {
		selectedClass: "ui-btn-active"
	};

	$.fn.linkState = function(options){

		var settings = $.extend(true, {}, defaults, options);

		return this.each(function(){
			var $this = $(this);
			var absoluteUrl = $this[0]["href"];

			if(isCurrentLink(absoluteUrl)){
				$this.addClass(settings.selectedClass);
			}else{
				$this.removeClass(settings.selectedClass);
			}
		});
	};

	/*
	 * some url of the device will be like:
	 * 1) http://zliang-pc/smart_dealer.html#/smart_assistance.html
	 * 2) http://zliang-pc/smart_assistance.html
	 */
	function isCurrentLink(url){
		if(!url){
			return 0;
		}
		url = getRelativeUrl(url);

		//if current is case 1, get the fragement url.
		var current = location.href,
			i = current.indexOf('#/');
		if(i>-1){
			//remove all string before '#' and keep the '/'
			current = current.substr(i + 1);
		}

		if(current.indexOf(url) > -1){
			return 1;
		}
		return 0;
	}

	//remove the host and the fragment parameters
	function getRelativeUrl(url){
		var host = location.host, len = host.length, idx = url.indexOf(host);
		if(idx > 0){
			url = url.substr(idx + len);
		}
		return url;
	}

})(jQuery);


/*Display full article when user click on it*/

(function($){

	$.fn.fullArticle = function(){

		return this.each(function(){
			var $article = $(".article"),
				$hide = $(".hide");

				$(".full").click(function(e){
					e.stopPropagation();
					e.preventDefault();

					$(this).hide();
					$hide.show();

					//If the hidden content contains alert information
					if($hide.hasClass("alert")){
						$(".content", $article).hide();
					}
				});
		});
	};

})(jQuery);


/*
 * Description: Hint Text 
 */
(function($){
	$.fn.hintText = function(){
		var hintClass = "hint";

		var $hints = $(this);

		return this.each(function(){
			var $hint = $(this).click(function(){
				if($hint.hasClass(hintClass)){
					$hints.removeClass(hintClass);
					$hints.val('');
				}
			});
		});
	};
})(jQuery);


/* 
 * Share
 * Add current page url to the addthis link.
 * Update addthis button
 */
(function(){
	var ND = window.ND = window.ND || {};


	var share = ND.share = {
		init: function($links, link){
			var i;

			link = link ? link.toLowerCase() : location.href;
			link = encodeURIComponent(link);

			for (i = $links.length; i-- >0;){
				var $this = $links[i];
				var url = $this.href.toLowerCase();

				if(url.indexOf("url=")<0){
					var query = url.indexOf("?") >= 0 ? "&url=" : "?url=";
					url = url + query + link;
				}else{
					url = url.replace(/url=[^&#]+/g, "url=" + link);
				}
				$this.href = url;
			}
		}
	};

})();


/* sync the height of the table rows*/
(function($) {
	window.SyncTable = function(syncContainer) {
		var syncTable = this;

		syncTable.sync = function() {
			var tables = $(syncContainer).children("table");

			if (tables.size() == 2) {
				var list1 = $(tables[0]).find("tbody>tr");
				var list2 = $(tables[1]).find("tbody>tr");
				
				
             
             
				//only need to sync up with the smaller one
				var len = list1.length > list2.length ? list2.length : list1.length;

				for(var idx = 0;idx<len;idx++){
					var height1 = $(list1[idx]).height();
					var height2 = $(list2[idx]).height();

					if(height1 != height2){
						if(height1>height2){
							$(list2[idx]).css({height:height1});
							
						}else{
							$(list1[idx]).css({height:height2});
							
						}
					}
				}
			}
		};
	};


})(jQuery);


/* Code Binding */
(function($) {
	$(document).on("pageinit", function() {
		//go previous history
		$(".back").historyBack();

		//switch images
		$(".colors li a").switchImage();

		$(".article").fullArticle();

		//update addthis button
		var $share = $(".share .btns a");
		if($share.size()) {
			ND.share.init($share);
		}
		///bqu smart version select
		$(".vsersion_content_gray_bg").click(function() {

			var $this = $(this);
			$(".vsersion_content_blue_bg").removeClass("vsersion_content_blue_bg");

			$this.toggleClass("vsersion_content_blue_bg");
		})
		///end bqu

		///bqu user guide
		$(".bq_spsc_next").click(function() {

			var $this = $(this);

			var sindex = Number($this.parent().parent().attr("id").substring(1));

			var next_dvi = sindex + 1;
			var nextdvN = "div#p" + next_dvi;
			if($(nextdvN).attr("id") != undefined) {
				$("[data-role='split_screen']").hide();
				$(nextdvN).fadeIn();
			}

		})

		$(".bq_spsc_pre").click(function() {

			var $this = $(this);

			var sindex = Number($this.parent().parent().attr("id").substring(1));

			var next_dvi = sindex - 1;
			var nextdvN = "div#p" + next_dvi;
			if($(nextdvN).attr("id") != undefined) {
				$("[data-role='split_screen']").hide();
				$(nextdvN).fadeIn();
			}

		})

		$("[data-role='split_screen']").hide();
		$("div[data-role='split_screen']:first").show();
		checkUGHasImg();


		// dropdown
		// $('.dropdown>A').click(function(){
		// 	$(this).parent().toggleClass('active');
		// });

		// $('.slider').touchSlider({
		// 	mouseTouch:true,
		// 	autoplay:true
		// });
		
		$(document).on("pagechange", function() {
			//Bind linkState
			$("div[data-role='header'] .ui-controlgroup a").linkState();

			$(".hint").hintText();
			

			var $cities = $('#cityDropdownData'), 
				cityList;
			//console.log('cities pagechange ' + $cities.length);
			if($cities.length > 0) {
				cityList = JSON.parse($cities.html());
				ND.selectOption.init(cityList);
			}

			var syncTable = new SyncTable($(".tabcde"));
			syncTable.sync();
		});
	});

	function checkUGHasImg() {

		// user guide btns
		
		//imges nav div
		
		
		var $thisall = $("[data-role='split_screen'] .imgnav");
		var $thishave = $("[data-role='split_screen'] .imgnav:has(img)");
		
		

		$thisall.addClass("noimagebtns");
		$thishave.removeClass("noimagebtns");
		
		///pre btns

		var $thisallpre = $("[data-role='split_screen'] .imgnav .bq_spsc_pre");
		var $thishavepre = $("[data-role='split_screen'] .imgnav:has(img) .bq_spsc_pre");

		$thisallpre.removeClass("prev");
		$thisallpre.addClass("noimagebtns_prev");
		
		$thishavepre.removeClass("noimagebtns_prev");
		$thishavepre.addClass("prev");
		
		///next btn
		
		var $thisallnext = $("[data-role='split_screen'] .imgnav .bq_spsc_next");
		var $thishavenext = $("[data-role='split_screen'] .imgnav:has(img) .bq_spsc_next");

		$thisallnext.removeClass("next");
		$thisallnext.addClass("noimagebtns_next");
		
		$thishavenext.removeClass("noimagebtns_next");
		$thishavenext.addClass("next");

	}

})(jQuery);


/**
 * @author Sohrab Zabetian
 * @project formbuilder. To be used on Smob and Web
 * 
 * @description manages close button on pages/forms. Requires ND.cacheStore to manage cookie, Object.create and jQuery
 * 
 * 
 */
(function($) {
	
	BB = {
	
		config : {
			bkBtnCookieName : 'dfy.pg.bkbtn',
			bkBtnId : '#page-back-btn',
			bkBtnClass: '.formbuilder-close'
		},	
		
		store: null,
		$bkBtn: null,
		
		prepareBBCookie : function() {
			var store = BB.store = Object.create(ND.cacheStore),
				cookie = ''; //an array of uri for current domain
			
			store.key = BB.config.bkBtnCookieName;
			
			if (store.is()) {
				cookie = store.get();
			} else {
				store.expires = 365;
			} 
			return cookie;
		},
		
		init: function() {
			
			
			var $formConfig = $('#form-config');
    		if ($formConfig.length > 0) {
	    		
				var formConfig = $.extend(BB.config,JSON.parse($formConfig.html()));
				
				if (typeof formConfig.isform !== 'undefined' && (formConfig.isform === 'false' || formConfig.isform === false)) {
					BB.addPageToCookie(BB.prepareBBCookie());
				}
				
				BB.$bkBtn = $(BB.config.bkBtnClass);

				if (BB.$bkBtn.length > 0) {
					BB.addListeners();
				}
    		}
		},
		
		addPageToCookie: function(cookie) {
			// var pageURI = encodeURI('/' + window.location.href.replace(window.location.protocol + '//', '').replace(window.location.host + '/', ''));
			var pageURI = encodeURI(window.location.href);
			if (cookie !== pageURI) {
				BB.store.set(pageURI);
			}
		},
		
		handleBkBtnEvent: function(e) {
			e.stopPropagation();
			
			//user clicked form back button
			//check cookie, if we have a cookie and history has been recorded
			//go back to that page, otherwise use data-homepage to go back home
			
			var cookie = BB.prepareBBCookie(),
				lastURI = null;
			
			//remove the page we are just on now (Except if this page is a form page since it wasn't in the cookie), as we are navigating away from it
			if (cookie != null && cookie.length > 0) {
				lastURI = cookie;
				BB.store.set(null);
			} else if (typeof BB.config.homepage !== 'undefined' && BB.config.homepage !== '' && !$("body").hasClass("apaform") ) {
				lastURI = BB.config.homepage; 
			}else if($("body").hasClass("apaform") && BB.config.dashboardpage !==''){
				lastURI=BB.config.dashboardpage;
				
			} else {
				console.error("homepage data attribute is missing, can't go back");
			}
			
			if (lastURI != null) {
				
				var decodedLink = decodeURI(lastURI);
				BB.$bkBtn.each(function() {
					$(this).attr('href', decodedLink);
				});
			}
		},
		
		addListeners : function() {

			if($("body").hasClass("confirm-alert")){

				$(document).on('click', "#confirmPopup .formbuilder-close", BB.handleBkBtnEvent);//for APA owner confirm popup before close the page

			}else{

				$(document).on('click', BB.config.bkBtnClass, BB.handleBkBtnEvent);
			}
			
		},
		
		destroy: function() {
			if (BB.$bkBtn == null) {
				BB.$bkBtn = $(BB.config.bkBtnClass);
			}
			if (BB.$bkBtn.length > 0) {
				$(document).off('click', BB.config.bkBtnClass);
			}
		}
	};
	
	$(document).ready(BB.init);
	$(document).on('pagechange', function() {
		BB.destroy();
		BB.init();
	});
	
})(jQuery);


/*
 * Author:      Brett Chaney
 * Description: Simple show/hide
 */

(function($) {
	
	$(function(){
		
		var 

		showHideClass	= $(".show-hide"),
		selectMenu		= $(".select-menu > select"),
		
		showHide = function() {

			// hide all sections with "show-hide" class
			showHideClass.hide();

			// show only section that is selected in select menu
			$("#" + selectMenu.val()).show();

			selectMenu.change(function() {
				showHideClass.hide();   
				$("#" + this.value).show();

			});
		};

		// run show/hide function if "show-hide" class is found
		if (showHideClass.length > 0) {
			showHide();
		}
		//expand/collaspe the row 
		$(".section-wrap .section .head").click(function(){
			var scope = $(this),
				sectionWrap = scope.closest(".row"),
				animationField = sectionWrap.find(".comparator_content");
			
			if(sectionWrap.hasClass("active")){
				animationField.slideUp(400,function(){
					sectionWrap.removeClass("active");
				});
			}else{
				animationField.slideDown(400,function(){
					sectionWrap.addClass("active");
				});
			}
		})
		
		/*
		 * as data of mobile specification page is read from brandsite, it will add <a href=".."></a> to some of data which does not require a link in mobile page
		 * the following code is to banned default link behaviour by adding class "banned-link"
		 */
		var elementWrap = $(".specification-table td .banned-link");
		if(elementWrap.length>0){
			elementWrap.on("click",function(e){
				e.preventDefault();
			})
		}
	});

})(jQuery);


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


/*
 * Author:      Ray Huang
 * Description: add class "active" to specific element when click, remove before page showing
 */

(function($) {
	
	$(function(){
		/*
		 * @param element
		 */
		ND.addActiveCls = function(element) {
			$(element).bind("click",function(){
				$(this).addClass("active");
			})
		}
	});

})(jQuery);

(function($, window, undefined){
	//bind "tab" event when init the page
	$(document).on("pageinit","div:jqmData(role='page')", "div:jqmData(role='dialog')", function(){
		ND.addActiveCls(".navbtns .icon");
		ND.addActiveCls(".navbtns .custom-brown");
	})
	//remove active states during page switch
	$(document).on("pagebeforeshow pageaftershow", "div:jqmData(role='page')", "div:jqmData(role='dialog')", function(){
		if($(this).find(".navbtns").length>0){
			$(this).find(".navbtns a").removeClass("active");
		}
	})
})(jQuery, window);


/*
 * rotating banner
 * use bxslider to implement slideShow functionality
 * automatically jump to the next page every 6 seconds
 * Author: Ray Huang
 */

//globals jQuery, ND, window
var ND = (function(ND, $) {
	ND.rotatingBanner = function () {
		var element;
		return{
/*
 * @param sEl, slider element
 * @param bPager,false to remove pagination of the rotating banner
 * @param sPagerType, "full" and "short" represent different type of pagers
 * @param iIndex, integer number to indecate start from which slide,default 0
 */
			init: function(sEl,bPager,sPagerType,iIndex) {
				var i=0;
				if(sPagerType&&sPagerType=="short"){//fixed img pager duplicated perload issue when use short PagerType
					$(sEl).parent().addClass("hideFullPager");
				}
				element = $(sEl+" li");// Check this module needs to be initalised for this page
				if( element.size() < 2 ) { return; }//no rotating if there is only one slides
                var isHomePage = ($('.rotatingbanner .image .slideritemwrap').length > 0)?true:false;
				var slider = $(sEl).bxSlider({
					pause : 5000,
					pager: bPager,
					autoHover : true,
					pagerType : sPagerType,
					startSlide : iIndex,
                    auto: isHomePage?true:false,
                    autoHover: isHomePage?true:false
				});
                if(isHomePage){
                    $('.image .bx-controls-direction .bx-prev, .image .bx-controls-direction .bx-next').click(function(){
                        slider.stopAuto();
                        slider.startAuto();
                    })
                }
			}
		}
	};
	return ND;	// Return ND after it's been augmented
}(window.ND || {}, jQuery));

(function($){
	$(function(){
		ND.rotatingBanner().init(".image .slideritemwrap",false);
	});
}(jQuery));


/**
 * Created by bjie on 1/7/2015.
 */

//remove the default drop down icon style and add a custom one
(function($) {
    $(document).on('pageinit', function(){
        var parent = $('.ui-icon.ui-icon-arrow-d.ui-icon-shadow').parent();
        $('.ui-icon.ui-icon-arrow-d.ui-icon-shadow').remove();
        parent.append('<span class="nav-dropdown-icon">&nbsp</span>');
        $('.article .ui-select select, .ui-navbar .ui-select select').change(function(){
            var redirectUrl = $(this).val();
            if(redirectUrl.length <= 0){
                return;
            }
            var selectedOption = $(this).find('option[value="'+redirectUrl+'"]');
            var shouldNewTab = selectedOption.data('target');
            if(shouldNewTab === true){
                window.open(redirectUrl);
            }else{
                location.href = redirectUrl;
            }
        });
    });
})(jQuery);


/*
 * Author:      Brett Chaney
 * Description: Override jQuery mobile defaults here
 */

(function($) {
	
	$(document).bind("mobileinit", function(){

		var errorStr 	= "%E5%BE%88%E6%8A%B1%E6%AD%89%EF%BC%8C%E4%BD%A0%E6%89%80%E8%AE%BF%E9%97%AE%E7%9A%84%E9%A1%B5%E9%9D%A2%E5%87%BA%E7%8E%B0%E9%97%AE%E9%A2%98%E3%80%82%E8%AF%B7%E5%88%B7%E6%96%B0%E9%A1%B5%E9%9D%A2%E3%80%82%0A",
			errorDecode = decodeURIComponent(errorStr),
			enStr 		= " An error has occurred, we apologize for the inconvenience. Please refresh your page.";

		$.mobile.pageLoadErrorMessage = errorDecode + enStr;
	
	});

})(jQuery);


// GWS Version v3.13

//-------- openlayers --------//
/*

  OpenLayers.js -- OpenLayers Map Viewer Library

  Copyright (c) 2006-2012 by OpenLayers Contributors
  Published under the 2-clause BSD license.
  See http://openlayers.org/dev/license.txt for the full text of the license, and http://openlayers.org/dev/authors.txt for full list of contributors.

  Includes compressed code under the following licenses:

  (For uncompressed versions of the code used, please see the
  OpenLayers Github repository: <https://github.com/openlayers/openlayers>)

*/
/**
 * Contains XMLHttpRequest.js <http://code.google.com/p/xmlhttprequest/>
 * Copyright 2007 Sergey Ilinsky (http://www.ilinsky.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 */
/**
 * OpenLayers.Util.pagePosition is based on Yahoo's getXY method, which is
 * Copyright (c) 2006, Yahoo! Inc.
 * All rights reserved.
 *
 * Redistribution and use of this software in source and binary forms, with or
 * without modification, are permitted provided that the following conditions
 * are met:
 *
 * * Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * * Neither the name of Yahoo! Inc. nor the names of its contributors may be
 *   used to endorse or promote products derived from this software without
 *   specific prior written permission of Yahoo! Inc.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */
var OpenLayers = {
    VERSION_NUMBER: "Release 2.12",
    singleFile: true,
    _getScriptLocation: (function () {
        var r = new RegExp("(^|(.*?\\/))(OpenLayers[^\\/]*?\\.js)(\\?|$)"),
            s = document.getElementsByTagName('script'),
            src, m, l = "";
        for (var i = 0, len = s.length; i < len; i++) {
            src = s[i].getAttribute('src');
            if (src) {
                m = src.match(r);
                if (m) {
                    l = m[1];
                    break;
                }
            }
        }
        return (function () {
            return l;
        });
    })(),
    ImgPath: ''
};
OpenLayers.Class = function () {
    var len = arguments.length;
    var P = arguments[0];
    var F = arguments[len - 1];
    var C = typeof F.initialize == "function" ? F.initialize : function () {
            P.prototype.initialize.apply(this, arguments);
        };
    if (len > 1) {
        var newArgs = [C, P].concat(Array.prototype.slice.call(arguments).slice(1, len - 1), F);
        OpenLayers.inherit.apply(null, newArgs);
    } else {
        C.prototype = F;
    }
    return C;
};
OpenLayers.inherit = function (C, P) {
    var F = function () {};
    F.prototype = P.prototype;
    C.prototype = new F;
    var i, l, o;
    for (i = 2, l = arguments.length; i < l; i++) {
        o = arguments[i];
        if (typeof o === "function") {
            o = o.prototype;
        }
        OpenLayers.Util.extend(C.prototype, o);
    }
};
OpenLayers.Util = OpenLayers.Util || {};
OpenLayers.Util.extend = function (destination, source) {
    destination = destination || {};
    if (source) {
        for (var property in source) {
            var value = source[property];
            if (value !== undefined) {
                destination[property] = value;
            }
        }
        var sourceIsEvt = typeof window.Event == "function" && source instanceof window.Event;
        if (!sourceIsEvt && source.hasOwnProperty && source.hasOwnProperty("toString")) {
            destination.toString = source.toString;
        }
    }
    return destination;
};
OpenLayers.Animation = (function (window) {
    var isNative = !! (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame);
    var requestFrame = (function () {
        var request = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback, element) {
                window.setTimeout(callback, 16);
            };
        return function (callback, element) {
            request.apply(window, [callback, element]);
        };
    })();
    var counter = 0;
    var loops = {};

    function start(callback, duration, element) {
        duration = duration > 0 ? duration : Number.POSITIVE_INFINITY;
        var id = ++counter;
        var start = +new Date;
        loops[id] = function () {
            if (loops[id] && +new Date - start <= duration) {
                callback();
                if (loops[id]) {
                    requestFrame(loops[id], element);
                }
            } else {
                delete loops[id];
            }
        };
        requestFrame(loops[id], element);
        return id;
    }

    function stop(id) {
        delete loops[id];
    }
    return {
        isNative: isNative,
        requestFrame: requestFrame,
        start: start,
        stop: stop
    };
})(window);
OpenLayers.Tween = OpenLayers.Class({
    easing: null,
    begin: null,
    finish: null,
    duration: null,
    callbacks: null,
    time: null,
    animationId: null,
    playing: false,
    initialize: function (easing) {
        this.easing = (easing) ? easing : OpenLayers.Easing.Expo.easeOut;
    },
    start: function (begin, finish, duration, options) {
        this.playing = true;
        this.begin = begin;
        this.finish = finish;
        this.duration = duration;
        this.callbacks = options.callbacks;
        this.time = 0;
        OpenLayers.Animation.stop(this.animationId);
        this.animationId = null;
        if (this.callbacks && this.callbacks.start) {
            this.callbacks.start.call(this, this.begin);
        }
        this.animationId = OpenLayers.Animation.start(OpenLayers.Function.bind(this.play, this));
    },
    stop: function () {
        if (!this.playing) {
            return;
        }
        if (this.callbacks && this.callbacks.done) {
            this.callbacks.done.call(this, this.finish);
        }
        OpenLayers.Animation.stop(this.animationId);
        this.animationId = null;
        this.playing = false;
    },
    play: function () {
        var value = {};
        for (var i in this.begin) {
            var b = this.begin[i];
            var f = this.finish[i];
            if (b == null || f == null || isNaN(b) || isNaN(f)) {
                throw new TypeError('invalid value for Tween');
            }
            var c = f - b;
            value[i] = this.easing.apply(this, [this.time, b, c, this.duration]);
        }
        this.time++;
        if (this.callbacks && this.callbacks.eachStep) {
            this.callbacks.eachStep.call(this, value);
        }
        if (this.time > this.duration) {
            this.stop();
        }
    },
    CLASS_NAME: "OpenLayers.Tween"
});
OpenLayers.Easing = {
    CLASS_NAME: "OpenLayers.Easing"
};
OpenLayers.Easing.Linear = {
    easeIn: function (t, b, c, d) {
        return c * t / d + b;
    },
    easeOut: function (t, b, c, d) {
        return c * t / d + b;
    },
    easeInOut: function (t, b, c, d) {
        return c * t / d + b;
    },
    CLASS_NAME: "OpenLayers.Easing.Linear"
};
OpenLayers.Easing.Expo = {
    easeIn: function (t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOut: function (t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOut: function (t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    CLASS_NAME: "OpenLayers.Easing.Expo"
};
OpenLayers.Easing.Quad = {
    easeIn: function (t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    easeOut: function (t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    easeInOut: function (t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    CLASS_NAME: "OpenLayers.Easing.Quad"
};
OpenLayers.String = {
    startsWith: function (str, sub) {
        return (str.indexOf(sub) == 0);
    },
    contains: function (str, sub) {
        return (str.indexOf(sub) != -1);
    },
    trim: function (str) {
        return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    },
    camelize: function (str) {
        var oStringList = str.split('-');
        var camelizedString = oStringList[0];
        for (var i = 1, len = oStringList.length; i < len; i++) {
            var s = oStringList[i];
            camelizedString += s.charAt(0).toUpperCase() + s.substring(1);
        }
        return camelizedString;
    },
    format: function (template, context, args) {
        if (!context) {
            context = window;
        }
        var replacer = function (str, match) {
            var replacement;
            var subs = match.split(/\.+/);
            for (var i = 0; i < subs.length; i++) {
                if (i == 0) {
                    replacement = context;
                }
                replacement = replacement[subs[i]];
            }
            if (typeof replacement == "function") {
                replacement = args ? replacement.apply(null, args) : replacement();
            }
            if (typeof replacement == 'undefined') {
                return 'undefined';
            } else {
                return replacement;
            }
        };
        return template.replace(OpenLayers.String.tokenRegEx, replacer);
    },
    tokenRegEx: /\$\{([\w.]+?)\}/g,
    numberRegEx: /^([+-]?)(?=\d|\.\d)\d*(\.\d*)?([Ee]([+-]?\d+))?$/,
    isNumeric: function (value) {
        return OpenLayers.String.numberRegEx.test(value);
    },
    numericIf: function (value) {
        return OpenLayers.String.isNumeric(value) ? parseFloat(value) : value;
    }
};
OpenLayers.Number = {
    decimalSeparator: ".",
    thousandsSeparator: ",",
    limitSigDigs: function (num, sig) {
        var fig = 0;
        if (sig > 0) {
            fig = parseFloat(num.toPrecision(sig));
        }
        return fig;
    },
    format: function (num, dec, tsep, dsep) {
        dec = (typeof dec != "undefined") ? dec : 0;
        tsep = (typeof tsep != "undefined") ? tsep : OpenLayers.Number.thousandsSeparator;
        dsep = (typeof dsep != "undefined") ? dsep : OpenLayers.Number.decimalSeparator;
        if (dec != null) {
            num = parseFloat(num.toFixed(dec));
        }
        var parts = num.toString().split(".");
        if (parts.length == 1 && dec == null) {
            dec = 0;
        }
        var integer = parts[0];
        if (tsep) {
            var thousands = /(-?[0-9]+)([0-9]{3})/;
            while (thousands.test(integer)) {
                integer = integer.replace(thousands, "$1" + tsep + "$2");
            }
        }
        var str;
        if (dec == 0) {
            str = integer;
        } else {
            var rem = parts.length > 1 ? parts[1] : "0";
            if (dec != null) {
                rem = rem + new Array(dec - rem.length + 1).join("0");
            }
            str = integer + dsep + rem;
        }
        return str;
    }
};
OpenLayers.Function = {
    bind: function (func, object) {
        var args = Array.prototype.slice.apply(arguments, [2]);
        return function () {
            var newArgs = args.concat(Array.prototype.slice.apply(arguments, [0]));
            return func.apply(object, newArgs);
        };
    },
    bindAsEventListener: function (func, object) {
        return function (event) {
            return func.call(object, event || window.event);
        };
    },
    False: function () {
        return false;
    },
    True: function () {
        return true;
    },
    Void: function () {}
};
OpenLayers.Array = {
    filter: function (array, callback, caller) {
        var selected = [];
        if (Array.prototype.filter) {
            selected = array.filter(callback, caller);
        } else {
            var len = array.length;
            if (typeof callback != "function") {
                throw new TypeError();
            }
            for (var i = 0; i < len; i++) {
                if (i in array) {
                    var val = array[i];
                    if (callback.call(caller, val, i, array)) {
                        selected.push(val);
                    }
                }
            }
        }
        return selected;
    }
};
OpenLayers.Bounds = OpenLayers.Class({
    left: null,
    bottom: null,
    right: null,
    top: null,
    centerLonLat: null,
    initialize: function (left, bottom, right, top) {
        if (OpenLayers.Util.isArray(left)) {
            top = left[3];
            right = left[2];
            bottom = left[1];
            left = left[0];
        }
        if (left != null) {
            this.left = OpenLayers.Util.toFloat(left);
        }
        if (bottom != null) {
            this.bottom = OpenLayers.Util.toFloat(bottom);
        }
        if (right != null) {
            this.right = OpenLayers.Util.toFloat(right);
        }
        if (top != null) {
            this.top = OpenLayers.Util.toFloat(top);
        }
    },
    clone: function () {
        return new OpenLayers.Bounds(this.left, this.bottom, this.right, this.top);
    },
    equals: function (bounds) {
        var equals = false;
        if (bounds != null) {
            equals = ((this.left == bounds.left) && (this.right == bounds.right) && (this.top == bounds.top) && (this.bottom == bounds.bottom));
        }
        return equals;
    },
    toString: function () {
        return [this.left, this.bottom, this.right, this.top].join(",");
    },
    toArray: function (reverseAxisOrder) {
        if (reverseAxisOrder === true) {
            return [this.bottom, this.left, this.top, this.right];
        } else {
            return [this.left, this.bottom, this.right, this.top];
        }
    },
    toBBOX: function (decimal, reverseAxisOrder) {
        if (decimal == null) {
            decimal = 6;
        }
        var mult = Math.pow(10, decimal);
        var xmin = Math.round(this.left * mult) / mult;
        var ymin = Math.round(this.bottom * mult) / mult;
        var xmax = Math.round(this.right * mult) / mult;
        var ymax = Math.round(this.top * mult) / mult;
        if (reverseAxisOrder === true) {
            return ymin + "," + xmin + "," + ymax + "," + xmax;
        } else {
            return xmin + "," + ymin + "," + xmax + "," + ymax;
        }
    },
    toGeometry: function () {
        return new OpenLayers.Geometry.Polygon([new OpenLayers.Geometry.LinearRing([new OpenLayers.Geometry.Point(this.left, this.bottom), new OpenLayers.Geometry.Point(this.right, this.bottom), new OpenLayers.Geometry.Point(this.right, this.top), new OpenLayers.Geometry.Point(this.left, this.top)])]);
    },
    getWidth: function () {
        return (this.right - this.left);
    },
    getHeight: function () {
        return (this.top - this.bottom);
    },
    getSize: function () {
        return new OpenLayers.Size(this.getWidth(), this.getHeight());
    },
    getCenterPixel: function () {
        return new OpenLayers.Pixel((this.left + this.right) / 2, (this.bottom + this.top) / 2);
    },
    getCenterLonLat: function () {
        if (!this.centerLonLat) {
            this.centerLonLat = new OpenLayers.LonLat((this.left + this.right) / 2, (this.bottom + this.top) / 2);
        }
        return this.centerLonLat;
    },
    scale: function (ratio, origin) {
        if (origin == null) {
            origin = this.getCenterLonLat();
        }
        var origx, origy;
        if (origin.CLASS_NAME == "OpenLayers.LonLat") {
            origx = origin.lon;
            origy = origin.lat;
        } else {
            origx = origin.x;
            origy = origin.y;
        }
        var left = (this.left - origx) * ratio + origx;
        var bottom = (this.bottom - origy) * ratio + origy;
        var right = (this.right - origx) * ratio + origx;
        var top = (this.top - origy) * ratio + origy;
        return new OpenLayers.Bounds(left, bottom, right, top);
    },
    add: function (x, y) {
        if ((x == null) || (y == null)) {
            throw new TypeError('Bounds.add cannot receive null values');
        }
        return new OpenLayers.Bounds(this.left + x, this.bottom + y, this.right + x, this.top + y);
    },
    extend: function (object) {
        var bounds = null;
        if (object) {
            switch (object.CLASS_NAME) {
            case "OpenLayers.LonLat":
                bounds = new OpenLayers.Bounds(object.lon, object.lat, object.lon, object.lat);
                break;
            case "OpenLayers.Geometry.Point":
                bounds = new OpenLayers.Bounds(object.x, object.y, object.x, object.y);
                break;
            case "OpenLayers.Bounds":
                bounds = object;
                break;
            }
            if (bounds) {
                this.centerLonLat = null;
                if ((this.left == null) || (bounds.left < this.left)) {
                    this.left = bounds.left;
                }
                if ((this.bottom == null) || (bounds.bottom < this.bottom)) {
                    this.bottom = bounds.bottom;
                }
                if ((this.right == null) || (bounds.right > this.right)) {
                    this.right = bounds.right;
                }
                if ((this.top == null) || (bounds.top > this.top)) {
                    this.top = bounds.top;
                }
            }
        }
    },
    containsLonLat: function (ll, options) {
        if (typeof options === "boolean") {
            options = {
                inclusive: options
            };
        }
        options = options || {};
        var contains = this.contains(ll.lon, ll.lat, options.inclusive),
            worldBounds = options.worldBounds;
        if (worldBounds && !contains) {
            var worldWidth = worldBounds.getWidth();
            var worldCenterX = (worldBounds.left + worldBounds.right) / 2;
            var worldsAway = Math.round((ll.lon - worldCenterX) / worldWidth);
            contains = this.containsLonLat({
                lon: ll.lon - worldsAway * worldWidth,
                lat: ll.lat
            }, {
                inclusive: options.inclusive
            });
        }
        return contains;
    },
    containsPixel: function (px, inclusive) {
        return this.contains(px.x, px.y, inclusive);
    },
    contains: function (x, y, inclusive) {
        if (inclusive == null) {
            inclusive = true;
        }
        if (x == null || y == null) {
            return false;
        }
        x = OpenLayers.Util.toFloat(x);
        y = OpenLayers.Util.toFloat(y);
        var contains = false;
        if (inclusive) {
            contains = ((x >= this.left) && (x <= this.right) && (y >= this.bottom) && (y <= this.top));
        } else {
            contains = ((x > this.left) && (x < this.right) && (y > this.bottom) && (y < this.top));
        }
        return contains;
    },
    intersectsBounds: function (bounds, options) {
        if (typeof options === "boolean") {
            options = {
                inclusive: options
            };
        }
        options = options || {};
        if (options.worldBounds) {
            var self = this.wrapDateLine(options.worldBounds);
            bounds = bounds.wrapDateLine(options.worldBounds);
        } else {
            self = this;
        }
        if (options.inclusive == null) {
            options.inclusive = true;
        }
        var intersects = false;
        var mightTouch = (self.left == bounds.right || self.right == bounds.left || self.top == bounds.bottom || self.bottom == bounds.top);
        if (options.inclusive || !mightTouch) {
            var inBottom = (((bounds.bottom >= self.bottom) && (bounds.bottom <= self.top)) || ((self.bottom >= bounds.bottom) && (self.bottom <= bounds.top)));
            var inTop = (((bounds.top >= self.bottom) && (bounds.top <= self.top)) || ((self.top > bounds.bottom) && (self.top < bounds.top)));
            var inLeft = (((bounds.left >= self.left) && (bounds.left <= self.right)) || ((self.left >= bounds.left) && (self.left <= bounds.right)));
            var inRight = (((bounds.right >= self.left) && (bounds.right <= self.right)) || ((self.right >= bounds.left) && (self.right <= bounds.right)));
            intersects = ((inBottom || inTop) && (inLeft || inRight));
        }
        if (options.worldBounds && !intersects) {
            var world = options.worldBounds;
            var width = world.getWidth();
            var selfCrosses = !world.containsBounds(self);
            var boundsCrosses = !world.containsBounds(bounds);
            if (selfCrosses && !boundsCrosses) {
                bounds = bounds.add(-width, 0);
                intersects = self.intersectsBounds(bounds, {
                    inclusive: options.inclusive
                });
            } else if (boundsCrosses && !selfCrosses) {
                self = self.add(-width, 0);
                intersects = bounds.intersectsBounds(self, {
                    inclusive: options.inclusive
                });
            }
        }
        return intersects;
    },
    containsBounds: function (bounds, partial, inclusive) {
        if (partial == null) {
            partial = false;
        }
        if (inclusive == null) {
            inclusive = true;
        }
        var bottomLeft = this.contains(bounds.left, bounds.bottom, inclusive);
        var bottomRight = this.contains(bounds.right, bounds.bottom, inclusive);
        var topLeft = this.contains(bounds.left, bounds.top, inclusive);
        var topRight = this.contains(bounds.right, bounds.top, inclusive);
        return (partial) ? (bottomLeft || bottomRight || topLeft || topRight) : (bottomLeft && bottomRight && topLeft && topRight);
    },
    determineQuadrant: function (lonlat) {
        var quadrant = "";
        var center = this.getCenterLonLat();
        quadrant += (lonlat.lat < center.lat) ? "b" : "t";
        quadrant += (lonlat.lon < center.lon) ? "l" : "r";
        return quadrant;
    },
    transform: function (source, dest) {
        this.centerLonLat = null;
        var ll = OpenLayers.Projection.transform({
            'x': this.left,
            'y': this.bottom
        }, source, dest);
        var lr = OpenLayers.Projection.transform({
            'x': this.right,
            'y': this.bottom
        }, source, dest);
        var ul = OpenLayers.Projection.transform({
            'x': this.left,
            'y': this.top
        }, source, dest);
        var ur = OpenLayers.Projection.transform({
            'x': this.right,
            'y': this.top
        }, source, dest);
        this.left = Math.min(ll.x, ul.x);
        this.bottom = Math.min(ll.y, lr.y);
        this.right = Math.max(lr.x, ur.x);
        this.top = Math.max(ul.y, ur.y);
        return this;
    },
    wrapDateLine: function (maxExtent, options) {
        options = options || {};
        var leftTolerance = options.leftTolerance || 0;
        var rightTolerance = options.rightTolerance || 0;
        var newBounds = this.clone();
        if (maxExtent) {
            var width = maxExtent.getWidth();
            while (newBounds.left < maxExtent.left && newBounds.right - rightTolerance <= maxExtent.left) {
                newBounds = newBounds.add(width, 0);
            }
            while (newBounds.left + leftTolerance >= maxExtent.right && newBounds.right > maxExtent.right) {
                newBounds = newBounds.add(-width, 0);
            }
            var newLeft = newBounds.left + leftTolerance;
            if (newLeft < maxExtent.right && newLeft > maxExtent.left && newBounds.right - rightTolerance > maxExtent.right) {
                newBounds = newBounds.add(-width, 0);
            }
        }
        return newBounds;
    },
    CLASS_NAME: "OpenLayers.Bounds"
});
OpenLayers.Bounds.fromString = function (str, reverseAxisOrder) {
    var bounds = str.split(",");
    return OpenLayers.Bounds.fromArray(bounds, reverseAxisOrder);
};
OpenLayers.Bounds.fromArray = function (bbox, reverseAxisOrder) {
    return reverseAxisOrder === true ? new OpenLayers.Bounds(bbox[1], bbox[0], bbox[3], bbox[2]) : new OpenLayers.Bounds(bbox[0], bbox[1], bbox[2], bbox[3]);
};
OpenLayers.Bounds.fromSize = function (size) {
    return new OpenLayers.Bounds(0, size.h, size.w, 0);
};
OpenLayers.Bounds.oppositeQuadrant = function (quadrant) {
    var opp = "";
    opp += (quadrant.charAt(0) == 't') ? 'b' : 't';
    opp += (quadrant.charAt(1) == 'l') ? 'r' : 'l';
    return opp;
};
OpenLayers.Element = {
    visible: function (element) {
        return OpenLayers.Util.getElement(element).style.display != 'none';
    },
    toggle: function () {
        for (var i = 0, len = arguments.length; i < len; i++) {
            var element = OpenLayers.Util.getElement(arguments[i]);
            var display = OpenLayers.Element.visible(element) ? 'none' : '';
            element.style.display = display;
        }
    },
    remove: function (element) {
        element = OpenLayers.Util.getElement(element);
        element.parentNode.removeChild(element);
    },
    getHeight: function (element) {
        element = OpenLayers.Util.getElement(element);
        return element.offsetHeight;
    },
    hasClass: function (element, name) {
        var names = element.className;
        return ( !! names && new RegExp("(^|\\s)" + name + "(\\s|$)").test(names));
    },
    addClass: function (element, name) {
        if (!OpenLayers.Element.hasClass(element, name)) {
            element.className += (element.className ? " " : "") + name;
        }
        return element;
    },
    removeClass: function (element, name) {
        var names = element.className;
        if (names) {
            element.className = OpenLayers.String.trim(names.replace(new RegExp("(^|\\s+)" + name + "(\\s+|$)"), " "));
        }
        return element;
    },
    toggleClass: function (element, name) {
        if (OpenLayers.Element.hasClass(element, name)) {
            OpenLayers.Element.removeClass(element, name);
        } else {
            OpenLayers.Element.addClass(element, name);
        }
        return element;
    },
    getStyle: function (element, style) {
        element = OpenLayers.Util.getElement(element);
        var value = null;
        if (element && element.style) {
            value = element.style[OpenLayers.String.camelize(style)];
            if (!value) {
                if (document.defaultView && document.defaultView.getComputedStyle) {
                    var css = document.defaultView.getComputedStyle(element, null);
                    value = css ? css.getPropertyValue(style) : null;
                } else if (element.currentStyle) {
                    value = element.currentStyle[OpenLayers.String.camelize(style)];
                }
            }
            var positions = ['left', 'top', 'right', 'bottom'];
            if (window.opera && (OpenLayers.Util.indexOf(positions, style) != -1) && (OpenLayers.Element.getStyle(element, 'position') == 'static')) {
                value = 'auto';
            }
        }
        return value == 'auto' ? null : value;
    }
};
OpenLayers.LonLat = OpenLayers.Class({
    lon: 0.0,
    lat: 0.0,
    initialize: function (lon, lat) {
        if (OpenLayers.Util.isArray(lon)) {
            lat = lon[1];
            lon = lon[0];
        }
        this.lon = OpenLayers.Util.toFloat(lon);
        this.lat = OpenLayers.Util.toFloat(lat);
    },
    toString: function () {
        return ("lon=" + this.lon + ",lat=" + this.lat);
    },
    toShortString: function () {
        return (this.lon + ", " + this.lat);
    },
    clone: function () {
        return new OpenLayers.LonLat(this.lon, this.lat);
    },
    add: function (lon, lat) {
        if ((lon == null) || (lat == null)) {
            throw new TypeError('LonLat.add cannot receive null values');
        }
        return new OpenLayers.LonLat(this.lon + OpenLayers.Util.toFloat(lon), this.lat + OpenLayers.Util.toFloat(lat));
    },
    equals: function (ll) {
        var equals = false;
        if (ll != null) {
            equals = ((this.lon == ll.lon && this.lat == ll.lat) || (isNaN(this.lon) && isNaN(this.lat) && isNaN(ll.lon) && isNaN(ll.lat)));
        }
        return equals;
    },
    transform: function (source, dest) {
        var point = OpenLayers.Projection.transform({
            'x': this.lon,
            'y': this.lat
        }, source, dest);
        this.lon = point.x;
        this.lat = point.y;
        return this;
    },
    wrapDateLine: function (maxExtent) {
        var newLonLat = this.clone();
        if (maxExtent) {
            while (newLonLat.lon < maxExtent.left) {
                newLonLat.lon += maxExtent.getWidth();
            }
            while (newLonLat.lon > maxExtent.right) {
                newLonLat.lon -= maxExtent.getWidth();
            }
        }
        return newLonLat;
    },
    CLASS_NAME: "OpenLayers.LonLat"
});
OpenLayers.LonLat.fromString = function (str) {
    var pair = str.split(",");
    return new OpenLayers.LonLat(pair[0], pair[1]);
};
OpenLayers.LonLat.fromArray = function (arr) {
    var gotArr = OpenLayers.Util.isArray(arr),
        lon = gotArr && arr[0],
        lat = gotArr && arr[1];
    return new OpenLayers.LonLat(lon, lat);
};
OpenLayers.Pixel = OpenLayers.Class({
    x: 0.0,
    y: 0.0,
    initialize: function (x, y) {
        this.x = parseFloat(x);
        this.y = parseFloat(y);
    },
    toString: function () {
        return ("x=" + this.x + ",y=" + this.y);
    },
    clone: function () {
        return new OpenLayers.Pixel(this.x, this.y);
    },
    equals: function (px) {
        var equals = false;
        if (px != null) {
            equals = ((this.x == px.x && this.y == px.y) || (isNaN(this.x) && isNaN(this.y) && isNaN(px.x) && isNaN(px.y)));
        }
        return equals;
    },
    distanceTo: function (px) {
        return Math.sqrt(Math.pow(this.x - px.x, 2) +
            Math.pow(this.y - px.y, 2));
    },
    add: function (x, y) {
        if ((x == null) || (y == null)) {
            throw new TypeError('Pixel.add cannot receive null values');
        }
        return new OpenLayers.Pixel(this.x + x, this.y + y);
    },
    offset: function (px) {
        var newPx = this.clone();
        if (px) {
            newPx = this.add(px.x, px.y);
        }
        return newPx;
    },
    CLASS_NAME: "OpenLayers.Pixel"
});
OpenLayers.Size = OpenLayers.Class({
    w: 0.0,
    h: 0.0,
    initialize: function (w, h) {
        this.w = parseFloat(w);
        this.h = parseFloat(h);
    },
    toString: function () {
        return ("w=" + this.w + ",h=" + this.h);
    },
    clone: function () {
        return new OpenLayers.Size(this.w, this.h);
    },
    equals: function (sz) {
        var equals = false;
        if (sz != null) {
            equals = ((this.w == sz.w && this.h == sz.h) || (isNaN(this.w) && isNaN(this.h) && isNaN(sz.w) && isNaN(sz.h)));
        }
        return equals;
    },
    CLASS_NAME: "OpenLayers.Size"
});
OpenLayers.Console = {
    log: function () {},
    debug: function () {},
    info: function () {},
    warn: function () {},
    error: function () {},
    userError: function (error) {
        alert(error);
    },
    assert: function () {},
    dir: function () {},
    dirxml: function () {},
    trace: function () {},
    group: function () {},
    groupEnd: function () {},
    time: function () {},
    timeEnd: function () {},
    profile: function () {},
    profileEnd: function () {},
    count: function () {},
    CLASS_NAME: "OpenLayers.Console"
};
(function () {
    var scripts = document.getElementsByTagName("script");
    for (var i = 0, len = scripts.length; i < len; ++i) {
        if (scripts[i].src.indexOf("firebug.js") != -1) {
            if (console) {
                OpenLayers.Util.extend(OpenLayers.Console, console);
                break;
            }
        }
    }
})();
OpenLayers.Lang = {
    code: null,
    defaultCode: "en",
    getCode: function () {
        if (!OpenLayers.Lang.code) {
            OpenLayers.Lang.setCode();
        }
        return OpenLayers.Lang.code;
    },
    setCode: function (code) {
        var lang;
        if (!code) {
            code = (OpenLayers.BROWSER_NAME == "msie") ? navigator.userLanguage : navigator.language;
        }
        var parts = code.split('-');
        parts[0] = parts[0].toLowerCase();
        if (typeof OpenLayers.Lang[parts[0]] == "object") {
            lang = parts[0];
        }
        if (parts[1]) {
            var testLang = parts[0] + '-' + parts[1].toUpperCase();
            if (typeof OpenLayers.Lang[testLang] == "object") {
                lang = testLang;
            }
        }
        if (!lang) {
            OpenLayers.Console.warn('Failed to find OpenLayers.Lang.' + parts.join("-") + ' dictionary, falling back to default language');
            lang = OpenLayers.Lang.defaultCode;
        }
        OpenLayers.Lang.code = lang;
    },
    translate: function (key, context) {
        var dictionary = OpenLayers.Lang[OpenLayers.Lang.getCode()];
        var message = dictionary && dictionary[key];
        if (!message) {
            message = key;
        }
        if (context) {
            message = OpenLayers.String.format(message, context);
        }
        return message;
    }
};
OpenLayers.i18n = OpenLayers.Lang.translate;
OpenLayers.Util = OpenLayers.Util || {};
OpenLayers.Util.getElement = function () {
    var elements = [];
    for (var i = 0, len = arguments.length; i < len; i++) {
        var element = arguments[i];
        if (typeof element == 'string') {
            element = document.getElementById(element);
        }
        if (arguments.length == 1) {
            return element;
        }
        elements.push(element);
    }
    return elements;
};
OpenLayers.Util.isElement = function (o) {
    return !!(o && o.nodeType === 1);
};
OpenLayers.Util.isArray = function (a) {
    return (Object.prototype.toString.call(a) === '[object Array]');
};
if (typeof window.$ === "undefined") {
    window.$ = OpenLayers.Util.getElement;
}
OpenLayers.Util.removeItem = function (array, item) {
    for (var i = array.length - 1; i >= 0; i--) {
        if (array[i] == item) {
            array.splice(i, 1);
        }
    }
    return array;
};
OpenLayers.Util.indexOf = function (array, obj) {
    if (typeof array.indexOf == "function") {
        return array.indexOf(obj);
    } else {
        for (var i = 0, len = array.length; i < len; i++) {
            if (array[i] == obj) {
                return i;
            }
        }
        return -1;
    }
};
OpenLayers.Util.modifyDOMElement = function (element, id, px, sz, position, border, overflow, opacity) {
    if (id) {
        element.id = id;
    }
    if (px) {
        element.style.left = px.x + "px";
        element.style.top = px.y + "px";
    }
    if (sz) {
        element.style.width = sz.w + "px";
        element.style.height = sz.h + "px";
    }
    if (position) {
        element.style.position = position;
    }
    if (border) {
        element.style.border = border;
    }
    if (overflow) {
        element.style.overflow = overflow;
    }
    if (parseFloat(opacity) >= 0.0 && parseFloat(opacity) < 1.0) {
        element.style.filter = 'alpha(opacity=' + (opacity * 100) + ')';
        element.style.opacity = opacity;
    } else if (parseFloat(opacity) == 1.0) {
        element.style.filter = '';
        element.style.opacity = '';
    }
};
OpenLayers.Util.createDiv = function (id, px, sz, imgURL, position, border, overflow, opacity) {
    var dom = document.createElement('div');
    if (imgURL) {
        dom.style.backgroundImage = 'url(' + imgURL + ')';
    }
    if (!id) {
        id = OpenLayers.Util.createUniqueID("OpenLayersDiv");
    }
    if (!position) {
        position = "absolute";
    }
    OpenLayers.Util.modifyDOMElement(dom, id, px, sz, position, border, overflow, opacity);
    return dom;
};
OpenLayers.Util.createImage = function (id, px, sz, imgURL, position, border, opacity, delayDisplay) {
    var image = document.createElement("img");
    if (!id) {
        id = OpenLayers.Util.createUniqueID("OpenLayersDiv");
    }
    if (!position) {
        position = "relative";
    }
    OpenLayers.Util.modifyDOMElement(image, id, px, sz, position, border, null, opacity);
    if (delayDisplay) {
        image.style.display = "none";

        function display() {
            image.style.display = "";
            OpenLayers.Event.stopObservingElement(image);
        }
        OpenLayers.Event.observe(image, "load", display);
        OpenLayers.Event.observe(image, "error", display);
    }
    image.style.alt = id;
    image.galleryImg = "no";
    if (imgURL) {
        image.src = imgURL;
    }
    return image;
};
OpenLayers.IMAGE_RELOAD_ATTEMPTS = 0;
OpenLayers.Util.alphaHackNeeded = null;
OpenLayers.Util.alphaHack = function () {
    if (OpenLayers.Util.alphaHackNeeded == null) {
        var arVersion = navigator.appVersion.split("MSIE");
        var version = parseFloat(arVersion[1]);
        var filter = false;
        try {
            filter = !! (document.body.filters);
        } catch (e) {}
        OpenLayers.Util.alphaHackNeeded = (filter && (version >= 5.5) && (version < 7));
    }
    return OpenLayers.Util.alphaHackNeeded;
};
OpenLayers.Util.modifyAlphaImageDiv = function (div, id, px, sz, imgURL, position, border, sizing, opacity) {
    OpenLayers.Util.modifyDOMElement(div, id, px, sz, position, null, null, opacity);
    var img = div.childNodes[0];
    if (imgURL) {
        img.src = imgURL;
    }
    OpenLayers.Util.modifyDOMElement(img, div.id + "_innerImage", null, sz, "relative", border);
    if (OpenLayers.Util.alphaHack()) {
        if (div.style.display != "none") {
            div.style.display = "inline-block";
        }
        if (sizing == null) {
            sizing = "scale";
        }
        div.style.filter = "progid:DXImageTransform.Microsoft" + ".AlphaImageLoader(src='" + img.src + "', " + "sizingMethod='" + sizing + "')";
        if (parseFloat(div.style.opacity) >= 0.0 && parseFloat(div.style.opacity) < 1.0) {
            div.style.filter += " alpha(opacity=" + div.style.opacity * 100 + ")";
        }
        img.style.filter = "alpha(opacity=0)";
    }
};
OpenLayers.Util.createAlphaImageDiv = function (id, px, sz, imgURL, position, border, sizing, opacity, delayDisplay) {
    var div = OpenLayers.Util.createDiv();
    var img = OpenLayers.Util.createImage(null, null, null, null, null, null, null, delayDisplay);
    img.className = "olAlphaImg";
    div.appendChild(img);
    OpenLayers.Util.modifyAlphaImageDiv(div, id, px, sz, imgURL, position, border, sizing, opacity);
    return div;
};
OpenLayers.Util.upperCaseObject = function (object) {
    var uObject = {};
    for (var key in object) {
        uObject[key.toUpperCase()] = object[key];
    }
    return uObject;
};
OpenLayers.Util.applyDefaults = function (to, from) {
    to = to || {};
    var fromIsEvt = typeof window.Event == "function" && from instanceof window.Event;
    for (var key in from) {
        if (to[key] === undefined || (!fromIsEvt && from.hasOwnProperty && from.hasOwnProperty(key) && !to.hasOwnProperty(key))) {
            to[key] = from[key];
        }
    }
    if (!fromIsEvt && from && from.hasOwnProperty && from.hasOwnProperty('toString') && !to.hasOwnProperty('toString')) {
        to.toString = from.toString;
    }
    return to;
};
OpenLayers.Util.getParameterString = function (params) {
    var paramsArray = [];
    for (var key in params) {
        var value = params[key];
        if ((value != null) && (typeof value != 'function')) {
            var encodedValue;
            if (typeof value == 'object' && value.constructor == Array) {
                var encodedItemArray = [];
                var item;
                for (var itemIndex = 0, len = value.length; itemIndex < len; itemIndex++) {
                    item = value[itemIndex];
                    encodedItemArray.push(encodeURIComponent((item === null || item === undefined) ? "" : item));
                }
                encodedValue = encodedItemArray.join(",");
            } else {
                encodedValue = encodeURIComponent(value);
            }
            paramsArray.push(encodeURIComponent(key) + "=" + encodedValue);
        }
    }
    return paramsArray.join("&");
};
OpenLayers.Util.urlAppend = function (url, paramStr) {
    var newUrl = url;
    if (paramStr) {
        var parts = (url + " ").split(/[?&]/);
        newUrl += (parts.pop() === " " ? paramStr : parts.length ? "&" + paramStr : "?" + paramStr);
    }
    return newUrl;
};
OpenLayers.Util.getImagesLocation = function () {
    return OpenLayers.ImgPath || (OpenLayers._getScriptLocation() + "img/");
};
OpenLayers.Util.getImageLocation = function (image) {
    return OpenLayers.Util.getImagesLocation() + image;
};
OpenLayers.Util.Try = function () {
    var returnValue = null;
    for (var i = 0, len = arguments.length; i < len; i++) {
        var lambda = arguments[i];
        try {
            returnValue = lambda();
            break;
        } catch (e) {}
    }
    return returnValue;
};
OpenLayers.Util.getXmlNodeValue = function (node) {
    var val = null;
    OpenLayers.Util.Try(function () {
        val = node.text;
        if (!val) {
            val = node.textContent;
        }
        if (!val) {
            val = node.firstChild.nodeValue;
        }
    }, function () {
        val = node.textContent;
    });
    return val;
};
OpenLayers.Util.mouseLeft = function (evt, div) {
    var target = (evt.relatedTarget) ? evt.relatedTarget : evt.toElement;
    while (target != div && target != null) {
        target = target.parentNode;
    }
    return (target != div);
};
OpenLayers.Util.DEFAULT_PRECISION = 14;
OpenLayers.Util.toFloat = function (number, precision) {
    if (precision == null) {
        precision = OpenLayers.Util.DEFAULT_PRECISION;
    }
    if (typeof number !== "number") {
        number = parseFloat(number);
    }
    return precision === 0 ? number : parseFloat(number.toPrecision(precision));
};
OpenLayers.Util.rad = function (x) {
    return x * Math.PI / 180;
};
OpenLayers.Util.deg = function (x) {
    return x * 180 / Math.PI;
};
OpenLayers.Util.VincentyConstants = {
    a: 6378137,
    b: 6356752.3142,
    f: 1 / 298.257223563
};
OpenLayers.Util.distVincenty = function (p1, p2) {
    var ct = OpenLayers.Util.VincentyConstants;
    var a = ct.a,
        b = ct.b,
        f = ct.f;
    var L = OpenLayers.Util.rad(p2.lon - p1.lon);
    var U1 = Math.atan((1 - f) * Math.tan(OpenLayers.Util.rad(p1.lat)));
    var U2 = Math.atan((1 - f) * Math.tan(OpenLayers.Util.rad(p2.lat)));
    var sinU1 = Math.sin(U1),
        cosU1 = Math.cos(U1);
    var sinU2 = Math.sin(U2),
        cosU2 = Math.cos(U2);
    var lambda = L,
        lambdaP = 2 * Math.PI;
    var iterLimit = 20;
    while (Math.abs(lambda - lambdaP) > 1e-12 && --iterLimit > 0) {
        var sinLambda = Math.sin(lambda),
            cosLambda = Math.cos(lambda);
        var sinSigma = Math.sqrt((cosU2 * sinLambda) * (cosU2 * sinLambda) +
            (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda) * (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda));
        if (sinSigma == 0) {
            return 0;
        }
        var cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda;
        var sigma = Math.atan2(sinSigma, cosSigma);
        var alpha = Math.asin(cosU1 * cosU2 * sinLambda / sinSigma);
        var cosSqAlpha = Math.cos(alpha) * Math.cos(alpha);
        var cos2SigmaM = cosSigma - 2 * sinU1 * sinU2 / cosSqAlpha;
        var C = f / 16 * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
        lambdaP = lambda;
        lambda = L + (1 - C) * f * Math.sin(alpha) * (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));
    }
    if (iterLimit == 0) {
        return NaN;
    }
    var uSq = cosSqAlpha * (a * a - b * b) / (b * b);
    var A = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
    var B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
    var deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) -
        B / 6 * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)));
    var s = b * A * (sigma - deltaSigma);
    var d = s.toFixed(3) / 1000;
    return d;
};
OpenLayers.Util.destinationVincenty = function (lonlat, brng, dist) {
    var u = OpenLayers.Util;
    var ct = u.VincentyConstants;
    var a = ct.a,
        b = ct.b,
        f = ct.f;
    var lon1 = lonlat.lon;
    var lat1 = lonlat.lat;
    var s = dist;
    var alpha1 = u.rad(brng);
    var sinAlpha1 = Math.sin(alpha1);
    var cosAlpha1 = Math.cos(alpha1);
    var tanU1 = (1 - f) * Math.tan(u.rad(lat1));
    var cosU1 = 1 / Math.sqrt((1 + tanU1 * tanU1)),
        sinU1 = tanU1 * cosU1;
    var sigma1 = Math.atan2(tanU1, cosAlpha1);
    var sinAlpha = cosU1 * sinAlpha1;
    var cosSqAlpha = 1 - sinAlpha * sinAlpha;
    var uSq = cosSqAlpha * (a * a - b * b) / (b * b);
    var A = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
    var B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
    var sigma = s / (b * A),
        sigmaP = 2 * Math.PI;
    while (Math.abs(sigma - sigmaP) > 1e-12) {
        var cos2SigmaM = Math.cos(2 * sigma1 + sigma);
        var sinSigma = Math.sin(sigma);
        var cosSigma = Math.cos(sigma);
        var deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) -
            B / 6 * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)));
        sigmaP = sigma;
        sigma = s / (b * A) + deltaSigma;
    }
    var tmp = sinU1 * sinSigma - cosU1 * cosSigma * cosAlpha1;
    var lat2 = Math.atan2(sinU1 * cosSigma + cosU1 * sinSigma * cosAlpha1, (1 - f) * Math.sqrt(sinAlpha * sinAlpha + tmp * tmp));
    var lambda = Math.atan2(sinSigma * sinAlpha1, cosU1 * cosSigma - sinU1 * sinSigma * cosAlpha1);
    var C = f / 16 * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
    var L = lambda - (1 - C) * f * sinAlpha * (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));
    var revAz = Math.atan2(sinAlpha, -tmp);
    return new OpenLayers.LonLat(lon1 + u.deg(L), u.deg(lat2));
};
OpenLayers.Util.getParameters = function (url) {
    url = (url === null || url === undefined) ? window.location.href : url;
    var paramsString = "";
    if (OpenLayers.String.contains(url, '?')) {
        var start = url.indexOf('?') + 1;
        var end = OpenLayers.String.contains(url, "#") ? url.indexOf('#') : url.length;
        paramsString = url.substring(start, end);
    }
    var parameters = {};
    var pairs = paramsString.split(/[&;]/);
    for (var i = 0, len = pairs.length; i < len; ++i) {
        var keyValue = pairs[i].split('=');
        if (keyValue[0]) {
            var key = keyValue[0];
            try {
                key = decodeURIComponent(key);
            } catch (err) {
                key = unescape(key);
            }
            var value = (keyValue[1] || '').replace(/\+/g, " ");
            try {
                value = decodeURIComponent(value);
            } catch (err) {
                value = unescape(value);
            }
            value = value.split(",");
            if (value.length == 1) {
                value = value[0];
            }
            parameters[key] = value;
        }
    }
    return parameters;
};
OpenLayers.Util.lastSeqID = 0;
OpenLayers.Util.createUniqueID = function (prefix) {
    if (prefix == null) {
        prefix = "id_";
    }
    OpenLayers.Util.lastSeqID += 1;
    return prefix + OpenLayers.Util.lastSeqID;
};
OpenLayers.INCHES_PER_UNIT = {
    'inches': 1.0,
    'ft': 12.0,
    'mi': 63360.0,
    'm': 39.3701,
    'km': 39370.1,
    'dd': 4374754,
    'yd': 36
};
OpenLayers.INCHES_PER_UNIT["in"] = OpenLayers.INCHES_PER_UNIT.inches;
OpenLayers.INCHES_PER_UNIT["degrees"] = OpenLayers.INCHES_PER_UNIT.dd;
OpenLayers.INCHES_PER_UNIT["nmi"] = 1852 * OpenLayers.INCHES_PER_UNIT.m;
OpenLayers.METERS_PER_INCH = 0.02540005080010160020;
OpenLayers.Util.extend(OpenLayers.INCHES_PER_UNIT, {
    "Inch": OpenLayers.INCHES_PER_UNIT.inches,
    "Meter": 1.0 / OpenLayers.METERS_PER_INCH,
    "Foot": 0.30480060960121920243 / OpenLayers.METERS_PER_INCH,
    "IFoot": 0.30480000000000000000 / OpenLayers.METERS_PER_INCH,
    "ClarkeFoot": 0.3047972651151 / OpenLayers.METERS_PER_INCH,
    "SearsFoot": 0.30479947153867624624 / OpenLayers.METERS_PER_INCH,
    "GoldCoastFoot": 0.30479971018150881758 / OpenLayers.METERS_PER_INCH,
    "IInch": 0.02540000000000000000 / OpenLayers.METERS_PER_INCH,
    "MicroInch": 0.00002540000000000000 / OpenLayers.METERS_PER_INCH,
    "Mil": 0.00000002540000000000 / OpenLayers.METERS_PER_INCH,
    "Centimeter": 0.01000000000000000000 / OpenLayers.METERS_PER_INCH,
    "Kilometer": 1000.00000000000000000000 / OpenLayers.METERS_PER_INCH,
    "Yard": 0.91440182880365760731 / OpenLayers.METERS_PER_INCH,
    "SearsYard": 0.914398414616029 / OpenLayers.METERS_PER_INCH,
    "IndianYard": 0.91439853074444079983 / OpenLayers.METERS_PER_INCH,
    "IndianYd37": 0.91439523 / OpenLayers.METERS_PER_INCH,
    "IndianYd62": 0.9143988 / OpenLayers.METERS_PER_INCH,
    "IndianYd75": 0.9143985 / OpenLayers.METERS_PER_INCH,
    "IndianFoot": 0.30479951 / OpenLayers.METERS_PER_INCH,
    "IndianFt37": 0.30479841 / OpenLayers.METERS_PER_INCH,
    "IndianFt62": 0.3047996 / OpenLayers.METERS_PER_INCH,
    "IndianFt75": 0.3047995 / OpenLayers.METERS_PER_INCH,
    "Mile": 1609.34721869443738887477 / OpenLayers.METERS_PER_INCH,
    "IYard": 0.91440000000000000000 / OpenLayers.METERS_PER_INCH,
    "IMile": 1609.34400000000000000000 / OpenLayers.METERS_PER_INCH,
    "NautM": 1852.00000000000000000000 / OpenLayers.METERS_PER_INCH,
    "Lat-66": 110943.316488932731 / OpenLayers.METERS_PER_INCH,
    "Lat-83": 110946.25736872234125 / OpenLayers.METERS_PER_INCH,
    "Decimeter": 0.10000000000000000000 / OpenLayers.METERS_PER_INCH,
    "Millimeter": 0.00100000000000000000 / OpenLayers.METERS_PER_INCH,
    "Dekameter": 10.00000000000000000000 / OpenLayers.METERS_PER_INCH,
    "Decameter": 10.00000000000000000000 / OpenLayers.METERS_PER_INCH,
    "Hectometer": 100.00000000000000000000 / OpenLayers.METERS_PER_INCH,
    "GermanMeter": 1.0000135965 / OpenLayers.METERS_PER_INCH,
    "CaGrid": 0.999738 / OpenLayers.METERS_PER_INCH,
    "ClarkeChain": 20.1166194976 / OpenLayers.METERS_PER_INCH,
    "GunterChain": 20.11684023368047 / OpenLayers.METERS_PER_INCH,
    "BenoitChain": 20.116782494375872 / OpenLayers.METERS_PER_INCH,
    "SearsChain": 20.11676512155 / OpenLayers.METERS_PER_INCH,
    "ClarkeLink": 0.201166194976 / OpenLayers.METERS_PER_INCH,
    "GunterLink": 0.2011684023368047 / OpenLayers.METERS_PER_INCH,
    "BenoitLink": 0.20116782494375872 / OpenLayers.METERS_PER_INCH,
    "SearsLink": 0.2011676512155 / OpenLayers.METERS_PER_INCH,
    "Rod": 5.02921005842012 / OpenLayers.METERS_PER_INCH,
    "IntnlChain": 20.1168 / OpenLayers.METERS_PER_INCH,
    "IntnlLink": 0.201168 / OpenLayers.METERS_PER_INCH,
    "Perch": 5.02921005842012 / OpenLayers.METERS_PER_INCH,
    "Pole": 5.02921005842012 / OpenLayers.METERS_PER_INCH,
    "Furlong": 201.1684023368046 / OpenLayers.METERS_PER_INCH,
    "Rood": 3.778266898 / OpenLayers.METERS_PER_INCH,
    "CapeFoot": 0.3047972615 / OpenLayers.METERS_PER_INCH,
    "Brealey": 375.00000000000000000000 / OpenLayers.METERS_PER_INCH,
    "ModAmFt": 0.304812252984505969011938 / OpenLayers.METERS_PER_INCH,
    "Fathom": 1.8288 / OpenLayers.METERS_PER_INCH,
    "NautM-UK": 1853.184 / OpenLayers.METERS_PER_INCH,
    "50kilometers": 50000.0 / OpenLayers.METERS_PER_INCH,
    "150kilometers": 150000.0 / OpenLayers.METERS_PER_INCH
});
OpenLayers.Util.extend(OpenLayers.INCHES_PER_UNIT, {
    "mm": OpenLayers.INCHES_PER_UNIT["Meter"] / 1000.0,
    "cm": OpenLayers.INCHES_PER_UNIT["Meter"] / 100.0,
    "dm": OpenLayers.INCHES_PER_UNIT["Meter"] * 100.0,
    "km": OpenLayers.INCHES_PER_UNIT["Meter"] * 1000.0,
    "kmi": OpenLayers.INCHES_PER_UNIT["nmi"],
    "fath": OpenLayers.INCHES_PER_UNIT["Fathom"],
    "ch": OpenLayers.INCHES_PER_UNIT["IntnlChain"],
    "link": OpenLayers.INCHES_PER_UNIT["IntnlLink"],
    "us-in": OpenLayers.INCHES_PER_UNIT["inches"],
    "us-ft": OpenLayers.INCHES_PER_UNIT["Foot"],
    "us-yd": OpenLayers.INCHES_PER_UNIT["Yard"],
    "us-ch": OpenLayers.INCHES_PER_UNIT["GunterChain"],
    "us-mi": OpenLayers.INCHES_PER_UNIT["Mile"],
    "ind-yd": OpenLayers.INCHES_PER_UNIT["IndianYd37"],
    "ind-ft": OpenLayers.INCHES_PER_UNIT["IndianFt37"],
    "ind-ch": 20.11669506 / OpenLayers.METERS_PER_INCH
});
OpenLayers.DOTS_PER_INCH = 72;
OpenLayers.Util.normalizeScale = function (scale) {
    var normScale = (scale > 1.0) ? (1.0 / scale) : scale;
    return normScale;
};
OpenLayers.Util.getResolutionFromScale = function (scale, units) {
    var resolution;
    if (scale) {
        if (units == null) {
            units = "degrees";
        }
        var normScale = OpenLayers.Util.normalizeScale(scale);
        resolution = 1 / (normScale * OpenLayers.INCHES_PER_UNIT[units] * OpenLayers.DOTS_PER_INCH);
    }
    return resolution;
};
OpenLayers.Util.getScaleFromResolution = function (resolution, units) {
    if (units == null) {
        units = "degrees";
    }
    var scale = resolution * OpenLayers.INCHES_PER_UNIT[units] * OpenLayers.DOTS_PER_INCH;
    return scale;
};
OpenLayers.Util.pagePosition = function (forElement) {
    var pos = [0, 0];
    var viewportElement = OpenLayers.Util.getViewportElement();
    if (!forElement || forElement == window || forElement == viewportElement) {
        return pos;
    }
    var BUGGY_GECKO_BOX_OBJECT = OpenLayers.IS_GECKO && document.getBoxObjectFor && OpenLayers.Element.getStyle(forElement, 'position') == 'absolute' && (forElement.style.top == '' || forElement.style.left == '');
    var parent = null;
    var box;
    if (forElement.getBoundingClientRect) {
        box = forElement.getBoundingClientRect();
        var scrollTop = viewportElement.scrollTop;
        var scrollLeft = viewportElement.scrollLeft;
        pos[0] = box.left + scrollLeft;
        pos[1] = box.top + scrollTop;
    } else if (document.getBoxObjectFor && !BUGGY_GECKO_BOX_OBJECT) {
        box = document.getBoxObjectFor(forElement);
        var vpBox = document.getBoxObjectFor(viewportElement);
        pos[0] = box.screenX - vpBox.screenX;
        pos[1] = box.screenY - vpBox.screenY;
    } else {
        pos[0] = forElement.offsetLeft;
        pos[1] = forElement.offsetTop;
        parent = forElement.offsetParent;
        if (parent != forElement) {
            while (parent) {
                pos[0] += parent.offsetLeft;
                pos[1] += parent.offsetTop;
                parent = parent.offsetParent;
            }
        }
        var browser = OpenLayers.BROWSER_NAME;
        if (browser == "opera" || (browser == "safari" && OpenLayers.Element.getStyle(forElement, 'position') == 'absolute')) {
            pos[1] -= document.body.offsetTop;
        }
        parent = forElement.offsetParent;
        while (parent && parent != document.body) {
            pos[0] -= parent.scrollLeft;
            if (browser != "opera" || parent.tagName != 'TR') {
                pos[1] -= parent.scrollTop;
            }
            parent = parent.offsetParent;
        }
    }
    return pos;
};
OpenLayers.Util.getViewportElement = function () {
    var viewportElement = arguments.callee.viewportElement;
    if (viewportElement == undefined) {
        viewportElement = (OpenLayers.BROWSER_NAME == "msie" && document.compatMode != 'CSS1Compat') ? document.body : document.documentElement;
        arguments.callee.viewportElement = viewportElement;
    }
    return viewportElement;
};
OpenLayers.Util.isEquivalentUrl = function (url1, url2, options) {
    options = options || {};
    OpenLayers.Util.applyDefaults(options, {
        ignoreCase: true,
        ignorePort80: true,
        ignoreHash: true
    });
    var urlObj1 = OpenLayers.Util.createUrlObject(url1, options);
    var urlObj2 = OpenLayers.Util.createUrlObject(url2, options);
    for (var key in urlObj1) {
        if (key !== "args") {
            if (urlObj1[key] != urlObj2[key]) {
                return false;
            }
        }
    }
    for (var key in urlObj1.args) {
        if (urlObj1.args[key] != urlObj2.args[key]) {
            return false;
        }
        delete urlObj2.args[key];
    }
    for (var key in urlObj2.args) {
        return false;
    }
    return true;
};
OpenLayers.Util.createUrlObject = function (url, options) {
    options = options || {};
    if (!(/^\w+:\/\//).test(url)) {
        var loc = window.location;
        var port = loc.port ? ":" + loc.port : "";
        var fullUrl = loc.protocol + "//" + loc.host.split(":").shift() + port;
        if (url.indexOf("/") === 0) {
            url = fullUrl + url;
        } else {
            var parts = loc.pathname.split("/");
            parts.pop();
            url = fullUrl + parts.join("/") + "/" + url;
        }
    }
    if (options.ignoreCase) {
        url = url.toLowerCase();
    }
    var a = document.createElement('a');
    a.href = url;
    var urlObject = {};
    urlObject.host = a.host.split(":").shift();
    urlObject.protocol = a.protocol;
    if (options.ignorePort80) {
        urlObject.port = (a.port == "80" || a.port == "0") ? "" : a.port;
    } else {
        urlObject.port = (a.port == "" || a.port == "0") ? "80" : a.port;
    }
    urlObject.hash = (options.ignoreHash || a.hash === "#") ? "" : a.hash;
    var queryString = a.search;
    if (!queryString) {
        var qMark = url.indexOf("?");
        queryString = (qMark != -1) ? url.substr(qMark) : "";
    }
    urlObject.args = OpenLayers.Util.getParameters(queryString);
    urlObject.pathname = (a.pathname.charAt(0) == "/") ? a.pathname : "/" + a.pathname;
    return urlObject;
};
OpenLayers.Util.removeTail = function (url) {
    var head = null;
    var qMark = url.indexOf("?");
    var hashMark = url.indexOf("#");
    if (qMark == -1) {
        head = (hashMark != -1) ? url.substr(0, hashMark) : url;
    } else {
        head = (hashMark != -1) ? url.substr(0, Math.min(qMark, hashMark)) : url.substr(0, qMark);
    }
    return head;
};
OpenLayers.IS_GECKO = (function () {
    var ua = navigator.userAgent.toLowerCase();
    return ua.indexOf("webkit") == -1 && ua.indexOf("gecko") != -1;
})();
OpenLayers.CANVAS_SUPPORTED = (function () {
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
})();
OpenLayers.BROWSER_NAME = (function () {
    var name = "";
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("opera") != -1) {
        name = "opera";
    } else if (ua.indexOf("msie") != -1) {
        name = "msie";
    } else if (ua.indexOf("safari") != -1) {
        name = "safari";
    } else if (ua.indexOf("mozilla") != -1) {
        if (ua.indexOf("firefox") != -1) {
            name = "firefox";
        } else {
            name = "mozilla";
        }
    }
    return name;
})();
OpenLayers.Util.getBrowserName = function () {
    return OpenLayers.BROWSER_NAME;
};
OpenLayers.Util.getRenderedDimensions = function (contentHTML, size, options) {
    var w, h;
    var container = document.createElement("div");
    container.style.visibility = "hidden";
    var containerElement = (options && options.containerElement) ? options.containerElement : document.body;
    var parentHasPositionAbsolute = false;
    var superContainer = null;
    var parent = containerElement;
    while (parent && parent.tagName.toLowerCase() != "body") {
        var parentPosition = OpenLayers.Element.getStyle(parent, "position");
        if (parentPosition == "absolute") {
            parentHasPositionAbsolute = true;
            break;
        } else if (parentPosition && parentPosition != "static") {
            break;
        }
        parent = parent.parentNode;
    }
    if (parentHasPositionAbsolute && (containerElement.clientHeight === 0 || containerElement.clientWidth === 0)) {
        superContainer = document.createElement("div");
        superContainer.style.visibility = "hidden";
        superContainer.style.position = "absolute";
        superContainer.style.overflow = "visible";
        superContainer.style.width = document.body.clientWidth + "px";
        superContainer.style.height = document.body.clientHeight + "px";
        superContainer.appendChild(container);
    }
    container.style.position = "absolute";
    if (size) {
        if (size.w) {
            w = size.w;
            container.style.width = w + "px";
        } else if (size.h) {
            h = size.h;
            container.style.height = h + "px";
        }
    }
    if (options && options.displayClass) {
        container.className = options.displayClass;
    }
    var content = document.createElement("div");
    content.innerHTML = contentHTML;
    content.style.overflow = "visible";
    if (content.childNodes) {
        for (var i = 0, l = content.childNodes.length; i < l; i++) {
            if (!content.childNodes[i].style) continue;
            content.childNodes[i].style.overflow = "visible";
        }
    }
    container.appendChild(content);
    if (superContainer) {
        containerElement.appendChild(superContainer);
    } else {
        containerElement.appendChild(container);
    }
    if (!w) {
        w = parseInt(content.scrollWidth);
        container.style.width = w + "px";
    }
    if (!h) {
        h = parseInt(content.scrollHeight);
    }
    container.removeChild(content);
    if (superContainer) {
        superContainer.removeChild(container);
        containerElement.removeChild(superContainer);
    } else {
        containerElement.removeChild(container);
    }
    return new OpenLayers.Size(w, h);
};
OpenLayers.Util.getScrollbarWidth = function () {
    var scrollbarWidth = OpenLayers.Util._scrollbarWidth;
    if (scrollbarWidth == null) {
        var scr = null;
        var inn = null;
        var wNoScroll = 0;
        var wScroll = 0;
        scr = document.createElement('div');
        scr.style.position = 'absolute';
        scr.style.top = '-1000px';
        scr.style.left = '-1000px';
        scr.style.width = '100px';
        scr.style.height = '50px';
        scr.style.overflow = 'hidden';
        inn = document.createElement('div');
        inn.style.width = '100%';
        inn.style.height = '200px';
        scr.appendChild(inn);
        document.body.appendChild(scr);
        wNoScroll = inn.offsetWidth;
        scr.style.overflow = 'scroll';
        wScroll = inn.offsetWidth;
        document.body.removeChild(document.body.lastChild);
        OpenLayers.Util._scrollbarWidth = (wNoScroll - wScroll);
        scrollbarWidth = OpenLayers.Util._scrollbarWidth;
    }
    return scrollbarWidth;
};
OpenLayers.Util.getFormattedLonLat = function (coordinate, axis, dmsOption) {
    if (!dmsOption) {
        dmsOption = 'dms';
    }
    coordinate = (coordinate + 540) % 360 - 180;
    var abscoordinate = Math.abs(coordinate);
    var coordinatedegrees = Math.floor(abscoordinate);
    var coordinateminutes = (abscoordinate - coordinatedegrees) / (1 / 60);
    var tempcoordinateminutes = coordinateminutes;
    coordinateminutes = Math.floor(coordinateminutes);
    var coordinateseconds = (tempcoordinateminutes - coordinateminutes) / (1 / 60);
    coordinateseconds = Math.round(coordinateseconds * 10);
    coordinateseconds /= 10;
    if (coordinateseconds >= 60) {
        coordinateseconds -= 60;
        coordinateminutes += 1;
        if (coordinateminutes >= 60) {
            coordinateminutes -= 60;
            coordinatedegrees += 1;
        }
    }
    if (coordinatedegrees < 10) {
        coordinatedegrees = "0" + coordinatedegrees;
    }
    var str = coordinatedegrees + "\u00B0";
    if (dmsOption.indexOf('dm') >= 0) {
        if (coordinateminutes < 10) {
            coordinateminutes = "0" + coordinateminutes;
        }
        str += coordinateminutes + "'";
        if (dmsOption.indexOf('dms') >= 0) {
            if (coordinateseconds < 10) {
                coordinateseconds = "0" + coordinateseconds;
            }
            str += coordinateseconds + '"';
        }
    }
    if (axis == "lon") {
        str += coordinate < 0 ? OpenLayers.i18n("W") : OpenLayers.i18n("E");
    } else {
        str += coordinate < 0 ? OpenLayers.i18n("S") : OpenLayers.i18n("N");
    }
    return str;
};
OpenLayers.Event = {
    observers: false,
    KEY_SPACE: 32,
    KEY_BACKSPACE: 8,
    KEY_TAB: 9,
    KEY_RETURN: 13,
    KEY_ESC: 27,
    KEY_LEFT: 37,
    KEY_UP: 38,
    KEY_RIGHT: 39,
    KEY_DOWN: 40,
    KEY_DELETE: 46,
    element: function (event) {
        return event.target || event.srcElement;
    },
    isSingleTouch: function (event) {
        return event.touches && event.touches.length == 1;
    },
    isMultiTouch: function (event) {
        return event.touches && event.touches.length > 1;
    },
    isLeftClick: function (event) {
        return (((event.which) && (event.which == 1)) || ((event.button) && (event.button == 1)));
    },
    isRightClick: function (event) {
        return (((event.which) && (event.which == 3)) || ((event.button) && (event.button == 2)));
    },
    stop: function (event, allowDefault) {
        if (!allowDefault) {
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        }
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },
    findElement: function (event, tagName) {
        var element = OpenLayers.Event.element(event);
        while (element.parentNode && (!element.tagName || (element.tagName.toUpperCase() != tagName.toUpperCase()))) {
            element = element.parentNode;
        }
        return element;
    },
    observe: function (elementParam, name, observer, useCapture) {
        var element = OpenLayers.Util.getElement(elementParam);
        useCapture = useCapture || false;
        if (name == 'keypress' && (navigator.appVersion.match(/Konqueror|Safari|KHTML/) || element.attachEvent)) {
            name = 'keydown';
        }
        if (!this.observers) {
            this.observers = {};
        }
        if (!element._eventCacheID) {
            var idPrefix = "eventCacheID_";
            if (element.id) {
                idPrefix = element.id + "_" + idPrefix;
            }
            element._eventCacheID = OpenLayers.Util.createUniqueID(idPrefix);
        }
        var cacheID = element._eventCacheID;
        if (!this.observers[cacheID]) {
            this.observers[cacheID] = [];
        }
        this.observers[cacheID].push({
            'element': element,
            'name': name,
            'observer': observer,
            'useCapture': useCapture
        });
        if (element.addEventListener) {
            element.addEventListener(name, observer, useCapture);
        } else if (element.attachEvent) {
            element.attachEvent('on' + name, observer);
        }
    },
    stopObservingElement: function (elementParam) {
        var element = OpenLayers.Util.getElement(elementParam);
        var cacheID = element._eventCacheID;
        this._removeElementObservers(OpenLayers.Event.observers[cacheID]);
    },
    _removeElementObservers: function (elementObservers) {
        if (elementObservers) {
            for (var i = elementObservers.length - 1; i >= 0; i--) {
                var entry = elementObservers[i];
                var args = new Array(entry.element, entry.name, entry.observer, entry.useCapture);
                var removed = OpenLayers.Event.stopObserving.apply(this, args);
            }
        }
    },
    stopObserving: function (elementParam, name, observer, useCapture) {
        useCapture = useCapture || false;
        var element = OpenLayers.Util.getElement(elementParam);
        var cacheID = element._eventCacheID;
        if (name == 'keypress') {
            if (navigator.appVersion.match(/Konqueror|Safari|KHTML/) || element.detachEvent) {
                name = 'keydown';
            }
        }
        var foundEntry = false;
        var elementObservers = OpenLayers.Event.observers[cacheID];
        if (elementObservers) {
            var i = 0;
            while (!foundEntry && i < elementObservers.length) {
                var cacheEntry = elementObservers[i];
                if ((cacheEntry.name == name) && (cacheEntry.observer == observer) && (cacheEntry.useCapture == useCapture)) {
                    elementObservers.splice(i, 1);
                    if (elementObservers.length == 0) {
                        delete OpenLayers.Event.observers[cacheID];
                    }
                    foundEntry = true;
                    break;
                }
                i++;
            }
        }
        if (foundEntry) {
            if (element.removeEventListener) {
                element.removeEventListener(name, observer, useCapture);
            } else if (element && element.detachEvent) {
                element.detachEvent('on' + name, observer);
            }
        }
        return foundEntry;
    },
    unloadCache: function () {
        if (OpenLayers.Event && OpenLayers.Event.observers) {
            for (var cacheID in OpenLayers.Event.observers) {
                var elementObservers = OpenLayers.Event.observers[cacheID];
                OpenLayers.Event._removeElementObservers.apply(this, [elementObservers]);
            }
            OpenLayers.Event.observers = false;
        }
    },
    CLASS_NAME: "OpenLayers.Event"
};
OpenLayers.Event.observe(window, 'unload', OpenLayers.Event.unloadCache, false);
OpenLayers.Events = OpenLayers.Class({
    BROWSER_EVENTS: ["mouseover", "mouseout", "mousedown", "mouseup", "mousemove", "click", "dblclick", "rightclick", "dblrightclick", "resize", "focus", "blur", "touchstart", "touchmove", "touchend", "keydown"],
    listeners: null,
    object: null,
    element: null,
    eventHandler: null,
    fallThrough: null,
    includeXY: false,
    extensions: null,
    extensionCount: null,
    clearMouseListener: null,
    initialize: function (object, element, eventTypes, fallThrough, options) {
        OpenLayers.Util.extend(this, options);
        this.object = object;
        this.fallThrough = fallThrough;
        this.listeners = {};
        this.extensions = {};
        this.extensionCount = {};
        if (element != null) {
            this.attachToElement(element);
        }
    },
    destroy: function () {
        for (var e in this.extensions) {
            if (typeof this.extensions[e] !== "boolean") {
                this.extensions[e].destroy();
            }
        }
        this.extensions = null;
        if (this.element) {
            OpenLayers.Event.stopObservingElement(this.element);
            if (this.element.hasScrollEvent) {
                OpenLayers.Event.stopObserving(window, "scroll", this.clearMouseListener);
            }
        }
        this.element = null;
        this.listeners = null;
        this.object = null;
        this.fallThrough = null;
        this.eventHandler = null;
    },
    addEventType: function (eventName) {},
    attachToElement: function (element) {
        if (this.element) {
            OpenLayers.Event.stopObservingElement(this.element);
        } else {
            this.eventHandler = OpenLayers.Function.bindAsEventListener(this.handleBrowserEvent, this);
            this.clearMouseListener = OpenLayers.Function.bind(this.clearMouseCache, this);
        }
        this.element = element;
        for (var i = 0, len = this.BROWSER_EVENTS.length; i < len; i++) {
            OpenLayers.Event.observe(element, this.BROWSER_EVENTS[i], this.eventHandler);
        }
        OpenLayers.Event.observe(element, "dragstart", OpenLayers.Event.stop);
    },
    on: function (object) {
        for (var type in object) {
            if (type != "scope" && object.hasOwnProperty(type)) {
                this.register(type, object.scope, object[type]);
            }
        }
    },
    register: function (type, obj, func, priority) {
        if (type in OpenLayers.Events && !this.extensions[type]) {
            this.extensions[type] = new OpenLayers.Events[type](this);
        }
        if (func != null) {
            if (obj == null) {
                obj = this.object;
            }
            var listeners = this.listeners[type];
            if (!listeners) {
                listeners = [];
                this.listeners[type] = listeners;
                this.extensionCount[type] = 0;
            }
            var listener = {
                obj: obj,
                func: func
            };
            if (priority) {
                listeners.splice(this.extensionCount[type], 0, listener);
                if (typeof priority === "object" && priority.extension) {
                    this.extensionCount[type]++;
                }
            } else {
                listeners.push(listener);
            }
        }
    },
    registerPriority: function (type, obj, func) {
        this.register(type, obj, func, true);
    },
    un: function (object) {
        for (var type in object) {
            if (type != "scope" && object.hasOwnProperty(type)) {
                this.unregister(type, object.scope, object[type]);
            }
        }
    },
    unregister: function (type, obj, func) {
        if (obj == null) {
            obj = this.object;
        }
        var listeners = this.listeners[type];
        if (listeners != null) {
            for (var i = 0, len = listeners.length; i < len; i++) {
                if (listeners[i].obj == obj && listeners[i].func == func) {
                    listeners.splice(i, 1);
                    break;
                }
            }
        }
    },
    remove: function (type) {
        if (this.listeners[type] != null) {
            this.listeners[type] = [];
        }
    },
    triggerEvent: function (type, evt) {
        var listeners = this.listeners[type];
        if (!listeners || listeners.length == 0) {
            return undefined;
        }
        if (evt == null) {
            evt = {};
        }
        evt.object = this.object;
        evt.element = this.element;
        if (!evt.type) {
            evt.type = type;
        }
        listeners = listeners.slice();
        var continueChain;
        for (var i = 0, len = listeners.length; i < len; i++) {
            var callback = listeners[i];
            continueChain = callback.func.apply(callback.obj, [evt]);
            if ((continueChain != undefined) && (continueChain == false)) {
                break;
            }
        }
        if (!this.fallThrough) {
            OpenLayers.Event.stop(evt, true);
        }
        return continueChain;
    },
    handleBrowserEvent: function (evt) {
        var type = evt.type,
            listeners = this.listeners[type];
        if (!listeners || listeners.length == 0) {
            return;
        }
        var touches = evt.touches;
        if (touches && touches[0]) {
            var x = 0;
            var y = 0;
            var num = touches.length;
            var touch;
            for (var i = 0; i < num; ++i) {
                touch = touches[i];
                x += touch.clientX;
                y += touch.clientY;
            }
            evt.clientX = x / num;
            evt.clientY = y / num;
        }
        if (this.includeXY) {
            evt.xy = this.getMousePosition(evt);
        }
        this.triggerEvent(type, evt);
    },
    clearMouseCache: function () {
        this.element.scrolls = null;
        this.element.lefttop = null;
        var body = document.body;
        if (body && !((body.scrollTop != 0 || body.scrollLeft != 0) && navigator.userAgent.match(/iPhone/i))) {
            this.element.offsets = null;
        }
    },
    getMousePosition: function (evt) {
        if (!this.includeXY) {
            this.clearMouseCache();
        } else if (!this.element.hasScrollEvent) {
            OpenLayers.Event.observe(window, "scroll", this.clearMouseListener);
            this.element.hasScrollEvent = true;
        }
        if (!this.element.scrolls) {
            var viewportElement = OpenLayers.Util.getViewportElement();
            this.element.scrolls = [viewportElement.scrollLeft, viewportElement.scrollTop];
        }
        if (!this.element.lefttop) {
            this.element.lefttop = [(document.documentElement.clientLeft || 0), (document.documentElement.clientTop || 0)];
        }
        if (!this.element.offsets) {
            this.element.offsets = OpenLayers.Util.pagePosition(this.element);
        }
        return new OpenLayers.Pixel((evt.clientX + this.element.scrolls[0]) - this.element.offsets[0] - this.element.lefttop[0], (evt.clientY + this.element.scrolls[1]) - this.element.offsets[1] - this.element.lefttop[1]);
    },
    CLASS_NAME: "OpenLayers.Events"
});
OpenLayers.Projection = OpenLayers.Class({
    proj: null,
    projCode: null,
    titleRegEx: /\+title=[^\+]*/,
    initialize: function (projCode, options) {
        OpenLayers.Util.extend(this, options);
        this.projCode = projCode;
        if (window.Proj4js) {
            this.proj = new Proj4js.Proj(projCode);
        }
    },
    getCode: function () {
        return this.proj ? this.proj.srsCode : this.projCode;
    },
    getUnits: function () {
        return this.proj ? this.proj.units : null;
    },
    toString: function () {
        return this.getCode();
    },
    equals: function (projection) {
        var p = projection,
            equals = false;
        if (p) {
            if (!(p instanceof OpenLayers.Projection)) {
                p = new OpenLayers.Projection(p);
            }
            if (window.Proj4js && this.proj.defData && p.proj.defData) {
                equals = this.proj.defData.replace(this.titleRegEx, "") == p.proj.defData.replace(this.titleRegEx, "");
            } else if (p.getCode) {
                var source = this.getCode(),
                    target = p.getCode();
                equals = source == target || !! OpenLayers.Projection.transforms[source] && OpenLayers.Projection.transforms[source][target] === OpenLayers.Projection.nullTransform;
            }
        }
        return equals;
    },
    destroy: function () {
        delete this.proj;
        delete this.projCode;
    },
    CLASS_NAME: "OpenLayers.Projection"
});
OpenLayers.Projection.transforms = {};
OpenLayers.Projection.defaults = {
    "EPSG:4326": {
        units: "degrees",
        maxExtent: [-180, -90, 180, 90],
        yx: true
    },
    "CRS:84": {
        units: "degrees",
        maxExtent: [-180, -90, 180, 90]
    },
    "EPSG:900913": {
        units: "m",
        maxExtent: [-20037508.34, -20037508.34, 20037508.34, 20037508.34]
    }
};
OpenLayers.Projection.addTransform = function (from, to, method) {
    if (method === OpenLayers.Projection.nullTransform) {
        var defaults = OpenLayers.Projection.defaults[from];
        if (defaults && !OpenLayers.Projection.defaults[to]) {
            OpenLayers.Projection.defaults[to] = defaults;
        }
    }
    if (!OpenLayers.Projection.transforms[from]) {
        OpenLayers.Projection.transforms[from] = {};
    }
    OpenLayers.Projection.transforms[from][to] = method;
};
OpenLayers.Projection.transform = function (point, source, dest) {
    if (source && dest) {
        if (!(source instanceof OpenLayers.Projection)) {
            source = new OpenLayers.Projection(source);
        }
        if (!(dest instanceof OpenLayers.Projection)) {
            dest = new OpenLayers.Projection(dest);
        }
        if (source.proj && dest.proj) {
            point = Proj4js.transform(source.proj, dest.proj, point);
        } else {
            var sourceCode = source.getCode();
            var destCode = dest.getCode();
            var transforms = OpenLayers.Projection.transforms;
            if (transforms[sourceCode] && transforms[sourceCode][destCode]) {
                transforms[sourceCode][destCode](point);
            }
        }
    }
    return point;
};
OpenLayers.Projection.nullTransform = function (point) {
    return point;
};
(function () {
    var pole = 20037508.34;

    function inverseMercator(xy) {
        xy.x = 180 * xy.x / pole;
        xy.y = 180 / Math.PI * (2 * Math.atan(Math.exp((xy.y / pole) * Math.PI)) - Math.PI / 2);
        return xy;
    }

    function forwardMercator(xy) {
        xy.x = xy.x * pole / 180;
        xy.y = Math.log(Math.tan((90 + xy.y) * Math.PI / 360)) / Math.PI * pole;
        return xy;
    }

    function map(base, codes) {
        var add = OpenLayers.Projection.addTransform;
        var same = OpenLayers.Projection.nullTransform;
        var i, len, code, other, j;
        for (i = 0, len = codes.length; i < len; ++i) {
            code = codes[i];
            add(base, code, forwardMercator);
            add(code, base, inverseMercator);
            for (j = i + 1; j < len; ++j) {
                other = codes[j];
                add(code, other, same);
                add(other, code, same);
            }
        }
    }
    var mercator = ["EPSG:900913", "EPSG:3857", "EPSG:102113", "EPSG:102100"],
        geographic = ["CRS:84", "urn:ogc:def:crs:EPSG:6.6:4326", "EPSG:4326"],
        i;
    for (i = mercator.length - 1; i >= 0; --i) {
        map(mercator[i], geographic);
    }
    for (i = geographic.length - 1; i >= 0; --i) {
        map(geographic[i], mercator);
    }
})();
OpenLayers.Map = OpenLayers.Class({
    Z_INDEX_BASE: {
        BaseLayer: 100,
        Overlay: 325,
        Feature: 725,
        Popup: 750,
        Control: 1000
    },
    id: null,
    fractionalZoom: false,
    events: null,
    allOverlays: false,
    div: null,
    dragging: false,
    size: null,
    viewPortDiv: null,
    layerContainerOrigin: null,
    layerContainerDiv: null,
    layers: null,
    controls: null,
    popups: null,
    baseLayer: null,
    center: null,
    resolution: null,
    zoom: 0,
    panRatio: 1.5,
    options: null,
    tileSize: null,
    projection: "EPSG:4326",
    units: null,
    resolutions: null,
    maxResolution: null,
    minResolution: null,
    maxScale: null,
    minScale: null,
    maxExtent: null,
    minExtent: null,
    restrictedExtent: null,
    numZoomLevels: 16,
    theme: null,
    displayProjection: null,
    fallThrough: true,
    panTween: null,
    eventListeners: null,
    panMethod: OpenLayers.Easing.Expo.easeOut,
    panDuration: 50,
    paddingForPopups: null,
    minPx: null,
    maxPx: null,
    initialize: function (div, options) {
        if (arguments.length === 1 && typeof div === "object") {
            options = div;
            div = options && options.div;
        }
        this.tileSize = new OpenLayers.Size(OpenLayers.Map.TILE_WIDTH, OpenLayers.Map.TILE_HEIGHT);
        this.paddingForPopups = new OpenLayers.Bounds(15, 15, 15, 15);
        this.theme = OpenLayers._getScriptLocation() + 'theme/default/style.css';
        this.options = OpenLayers.Util.extend({}, options);
        OpenLayers.Util.extend(this, options);
        var projCode = this.projection instanceof OpenLayers.Projection ? this.projection.projCode : this.projection;
        OpenLayers.Util.applyDefaults(this, OpenLayers.Projection.defaults[projCode]);
        if (this.maxExtent && !(this.maxExtent instanceof OpenLayers.Bounds)) {
            this.maxExtent = new OpenLayers.Bounds(this.maxExtent);
        }
        if (this.minExtent && !(this.minExtent instanceof OpenLayers.Bounds)) {
            this.minExtent = new OpenLayers.Bounds(this.minExtent);
        }
        if (this.restrictedExtent && !(this.restrictedExtent instanceof OpenLayers.Bounds)) {
            this.restrictedExtent = new OpenLayers.Bounds(this.restrictedExtent);
        }
        if (this.center && !(this.center instanceof OpenLayers.LonLat)) {
            this.center = new OpenLayers.LonLat(this.center);
        }
        this.layers = [];
        this.id = OpenLayers.Util.createUniqueID("OpenLayers.Map_");
        this.div = OpenLayers.Util.getElement(div);
        if (!this.div) {
            this.div = document.createElement("div");
            this.div.style.height = "1px";
            this.div.style.width = "1px";
        }
        OpenLayers.Element.addClass(this.div, 'olMap');
        var id = this.id + "_OpenLayers_ViewPort";
        this.viewPortDiv = OpenLayers.Util.createDiv(id, null, null, null, "relative", null, "hidden");
        this.viewPortDiv.style.width = "100%";
        this.viewPortDiv.style.height = "100%";
        this.viewPortDiv.className = "olMapViewport";
        this.div.appendChild(this.viewPortDiv);
        this.events = new OpenLayers.Events(this, this.viewPortDiv, null, this.fallThrough, {
            includeXY: true
        });
        id = this.id + "_OpenLayers_Container";
        this.layerContainerDiv = OpenLayers.Util.createDiv(id);
        this.layerContainerDiv.style.width = '100px';
        this.layerContainerDiv.style.height = '100px';
        this.layerContainerDiv.style.zIndex = this.Z_INDEX_BASE['Popup'] - 1;
        this.viewPortDiv.appendChild(this.layerContainerDiv);
        this.updateSize();
        if (this.eventListeners instanceof Object) {
            this.events.on(this.eventListeners);
        }
        if (parseFloat(navigator.appVersion.split("MSIE")[1]) < 9) {
            this.events.register("resize", this, this.updateSize);
        } else {
            this.updateSizeDestroy = OpenLayers.Function.bind(this.updateSize, this);
            OpenLayers.Event.observe(window, 'resize', this.updateSizeDestroy);
        }
        if (this.theme) {
            var addNode = true;
            var nodes = document.getElementsByTagName('link');
            for (var i = 0, len = nodes.length; i < len; ++i) {
                if (OpenLayers.Util.isEquivalentUrl(nodes.item(i).href, this.theme)) {
                    addNode = false;
                    break;
                }
            }
            if (addNode) {
                var cssNode = document.createElement('link');
                cssNode.setAttribute('rel', 'stylesheet');
                cssNode.setAttribute('type', 'text/css');
                cssNode.setAttribute('href', this.theme);
                document.getElementsByTagName('head')[0].appendChild(cssNode);
            }
        }
        if (this.controls == null) {
            this.controls = [];
            if (OpenLayers.Control != null) {
                if (OpenLayers.Control.Navigation) {
                    this.controls.push(new OpenLayers.Control.Navigation());
                } else if (OpenLayers.Control.TouchNavigation) {
                    this.controls.push(new OpenLayers.Control.TouchNavigation());
                }
                if (OpenLayers.Control.Zoom) {
                    this.controls.push(new OpenLayers.Control.Zoom());
                } else if (OpenLayers.Control.PanZoom) {
                    this.controls.push(new OpenLayers.Control.PanZoom());
                }
                if (OpenLayers.Control.ArgParser) {
                    this.controls.push(new OpenLayers.Control.ArgParser());
                }
                if (OpenLayers.Control.Attribution) {
                    this.controls.push(new OpenLayers.Control.Attribution());
                }
            }
        }
        for (var i = 0, len = this.controls.length; i < len; i++) {
            this.addControlToMap(this.controls[i]);
        }
        this.popups = [];
        this.unloadDestroy = OpenLayers.Function.bind(this.destroy, this);
        OpenLayers.Event.observe(window, 'unload', this.unloadDestroy);
        if (options && options.layers) {
            delete this.center;
            this.addLayers(options.layers);
            if (options.center && !this.getCenter()) {
                this.setCenter(options.center, options.zoom);
            }
        }
    },
    getViewport: function () {
        return this.viewPortDiv;
    },
    render: function (div) {
        this.div = OpenLayers.Util.getElement(div);
        OpenLayers.Element.addClass(this.div, 'olMap');
        this.viewPortDiv.parentNode.removeChild(this.viewPortDiv);
        this.div.appendChild(this.viewPortDiv);
        this.updateSize();
    },
    unloadDestroy: null,
    updateSizeDestroy: null,
    destroy: function () {
        if (!this.unloadDestroy) {
            return false;
        }
        if (this.panTween) {
            this.panTween.stop();
            this.panTween = null;
        }
        OpenLayers.Event.stopObserving(window, 'unload', this.unloadDestroy);
        this.unloadDestroy = null;
        if (this.updateSizeDestroy) {
            OpenLayers.Event.stopObserving(window, 'resize', this.updateSizeDestroy);
        } else {
            this.events.unregister("resize", this, this.updateSize);
        }
        this.paddingForPopups = null;
        if (this.controls != null) {
            for (var i = this.controls.length - 1; i >= 0; --i) {
                this.controls[i].destroy();
            }
            this.controls = null;
        }
        if (this.layers != null) {
            for (var i = this.layers.length - 1; i >= 0; --i) {
                this.layers[i].destroy(false);
            }
            this.layers = null;
        }
        if (this.viewPortDiv) {
            this.div.removeChild(this.viewPortDiv);
        }
        this.viewPortDiv = null;
        if (this.eventListeners) {
            this.events.un(this.eventListeners);
            this.eventListeners = null;
        }
        this.events.destroy();
        this.events = null;
        this.options = null;
    },
    setOptions: function (options) {
        var updatePxExtent = this.minPx && options.restrictedExtent != this.restrictedExtent;
        OpenLayers.Util.extend(this, options);
        updatePxExtent && this.moveTo(this.getCachedCenter(), this.zoom, {
            forceZoomChange: true
        });
    },
    getTileSize: function () {
        return this.tileSize;
    },
    getBy: function (array, property, match) {
        var test = (typeof match.test == "function");
        var found = OpenLayers.Array.filter(this[array], function (item) {
            return item[property] == match || (test && match.test(item[property]));
        });
        return found;
    },
    getLayersBy: function (property, match) {
        return this.getBy("layers", property, match);
    },
    getLayersByName: function (match) {
        return this.getLayersBy("name", match);
    },
    getLayersByClass: function (match) {
        return this.getLayersBy("CLASS_NAME", match);
    },
    getControlsBy: function (property, match) {
        return this.getBy("controls", property, match);
    },
    getControlsByClass: function (match) {
        return this.getControlsBy("CLASS_NAME", match);
    },
    getLayer: function (id) {
        var foundLayer = null;
        for (var i = 0, len = this.layers.length; i < len; i++) {
            var layer = this.layers[i];
            if (layer.id == id) {
                foundLayer = layer;
                break;
            }
        }
        return foundLayer;
    },
    setLayerZIndex: function (layer, zIdx) {
        layer.setZIndex(this.Z_INDEX_BASE[layer.isBaseLayer ? 'BaseLayer' : 'Overlay'] + zIdx * 5);
    },
    resetLayersZIndex: function () {
        for (var i = 0, len = this.layers.length; i < len; i++) {
            var layer = this.layers[i];
            this.setLayerZIndex(layer, i);
        }
    },
    addLayer: function (layer) {
        for (var i = 0, len = this.layers.length; i < len; i++) {
            if (this.layers[i] == layer) {
                return false;
            }
        }
        if (this.events.triggerEvent("preaddlayer", {
            layer: layer
        }) === false) {
            return false;
        }
        if (this.allOverlays) {
            layer.isBaseLayer = false;
        }
        layer.div.className = "olLayerDiv";
        layer.div.style.overflow = "";
        this.setLayerZIndex(layer, this.layers.length);
        if (layer.isFixed) {
            this.viewPortDiv.appendChild(layer.div);
        } else {
            this.layerContainerDiv.appendChild(layer.div);
        }
        this.layers.push(layer);
        layer.setMap(this);
        if (layer.isBaseLayer || (this.allOverlays && !this.baseLayer)) {
            if (this.baseLayer == null) {
                this.setBaseLayer(layer);
            } else {
                layer.setVisibility(false);
            }
        } else {
            layer.redraw();
        }
        this.events.triggerEvent("addlayer", {
            layer: layer
        });
        layer.events.triggerEvent("added", {
            map: this,
            layer: layer
        });
        layer.afterAdd();
        return true;
    },
    addLayers: function (layers) {
        for (var i = 0, len = layers.length; i < len; i++) {
            this.addLayer(layers[i]);
        }
    },
    removeLayer: function (layer, setNewBaseLayer) {
        if (this.events.triggerEvent("preremovelayer", {
            layer: layer
        }) === false) {
            return;
        }
        if (setNewBaseLayer == null) {
            setNewBaseLayer = true;
        }
        if (layer.isFixed) {
            this.viewPortDiv.removeChild(layer.div);
        } else {
            this.layerContainerDiv.removeChild(layer.div);
        }
        OpenLayers.Util.removeItem(this.layers, layer);
        layer.removeMap(this);
        layer.map = null;
        if (this.baseLayer == layer) {
            this.baseLayer = null;
            if (setNewBaseLayer) {
                for (var i = 0, len = this.layers.length; i < len; i++) {
                    var iLayer = this.layers[i];
                    if (iLayer.isBaseLayer || this.allOverlays) {
                        this.setBaseLayer(iLayer);
                        break;
                    }
                }
            }
        }
        this.resetLayersZIndex();
        this.events.triggerEvent("removelayer", {
            layer: layer
        });
        layer.events.triggerEvent("removed", {
            map: this,
            layer: layer
        });
    },
    getNumLayers: function () {
        return this.layers.length;
    },
    getLayerIndex: function (layer) {
        return OpenLayers.Util.indexOf(this.layers, layer);
    },
    setLayerIndex: function (layer, idx) {
        var base = this.getLayerIndex(layer);
        if (idx < 0) {
            idx = 0;
        } else if (idx > this.layers.length) {
            idx = this.layers.length;
        }
        if (base != idx) {
            this.layers.splice(base, 1);
            this.layers.splice(idx, 0, layer);
            for (var i = 0, len = this.layers.length; i < len; i++) {
                this.setLayerZIndex(this.layers[i], i);
            }
            this.events.triggerEvent("changelayer", {
                layer: layer,
                property: "order"
            });
            if (this.allOverlays) {
                if (idx === 0) {
                    this.setBaseLayer(layer);
                } else if (this.baseLayer !== this.layers[0]) {
                    this.setBaseLayer(this.layers[0]);
                }
            }
        }
    },
    raiseLayer: function (layer, delta) {
        var idx = this.getLayerIndex(layer) + delta;
        this.setLayerIndex(layer, idx);
    },
    setBaseLayer: function (newBaseLayer) {
        if (newBaseLayer != this.baseLayer) {
            if (OpenLayers.Util.indexOf(this.layers, newBaseLayer) != -1) {
                var center = this.getCachedCenter();
                var newResolution = OpenLayers.Util.getResolutionFromScale(this.getScale(), newBaseLayer.units);
                if (this.baseLayer != null && !this.allOverlays) {
                    this.baseLayer.setVisibility(false);
                }
                this.baseLayer = newBaseLayer;
                if (!this.allOverlays || this.baseLayer.visibility) {
                    this.baseLayer.setVisibility(true);
                    if (this.baseLayer.inRange === false) {
                        this.baseLayer.redraw();
                    }
                }
                if (center != null) {
                    var newZoom = this.getZoomForResolution(newResolution || this.resolution, true);
                    this.setCenter(center, newZoom, false, true);
                }
                this.events.triggerEvent("changebaselayer", {
                    layer: this.baseLayer
                });
            }
        }
    },
    addControl: function (control, px) {
        this.controls.push(control);
        this.addControlToMap(control, px);
    },
    addControls: function (controls, pixels) {
        var pxs = (arguments.length === 1) ? [] : pixels;
        for (var i = 0, len = controls.length; i < len; i++) {
            var ctrl = controls[i];
            var px = (pxs[i]) ? pxs[i] : null;
            this.addControl(ctrl, px);
        }
    },
    addControlToMap: function (control, px) {
        control.outsideViewport = (control.div != null);
        if (this.displayProjection && !control.displayProjection) {
            control.displayProjection = this.displayProjection;
        }
        control.setMap(this);
        var div = control.draw(px);
        if (div) {
            if (!control.outsideViewport) {
                div.style.zIndex = this.Z_INDEX_BASE['Control'] +
                    this.controls.length;
                this.viewPortDiv.appendChild(div);
            }
        }
        if (control.autoActivate) {
            control.activate();
        }
    },
    getControl: function (id) {
        var returnControl = null;
        for (var i = 0, len = this.controls.length; i < len; i++) {
            var control = this.controls[i];
            if (control.id == id) {
                returnControl = control;
                break;
            }
        }
        return returnControl;
    },
    removeControl: function (control) {
        if ((control) && (control == this.getControl(control.id))) {
            if (control.div && (control.div.parentNode == this.viewPortDiv)) {
                this.viewPortDiv.removeChild(control.div);
            }
            OpenLayers.Util.removeItem(this.controls, control);
        }
    },
    addPopup: function (popup, exclusive) {
        if (exclusive) {
            for (var i = this.popups.length - 1; i >= 0; --i) {
                this.removePopup(this.popups[i]);
            }
        }
        popup.map = this;
        this.popups.push(popup);
        var popupDiv = popup.draw();
        if (popupDiv) {
            popupDiv.style.zIndex = this.Z_INDEX_BASE['Popup'] +
                this.popups.length;
            this.layerContainerDiv.appendChild(popupDiv);
        }
    },
    removePopup: function (popup) {
        OpenLayers.Util.removeItem(this.popups, popup);
        if (popup.div) {
            try {
                this.layerContainerDiv.removeChild(popup.div);
            } catch (e) {}
        }
        popup.map = null;
    },
    getSize: function () {
        var size = null;
        if (this.size != null) {
            size = this.size.clone();
        }
        return size;
    },
    updateSize: function () {
        var newSize = this.getCurrentSize();
        if (newSize && !isNaN(newSize.h) && !isNaN(newSize.w)) {
            this.events.clearMouseCache();
            var oldSize = this.getSize();
            if (oldSize == null) {
                this.size = oldSize = newSize;
            }
            if (!newSize.equals(oldSize)) {
                this.size = newSize;
                for (var i = 0, len = this.layers.length; i < len; i++) {
                    this.layers[i].onMapResize();
                }
                var center = this.getCachedCenter();
                if (this.baseLayer != null && center != null) {
                    var zoom = this.getZoom();
                    this.zoom = null;
                    this.setCenter(center, zoom);
                }
            }
        }
    },
    getCurrentSize: function () {
        var size = new OpenLayers.Size(this.div.clientWidth, this.div.clientHeight);
        if (size.w == 0 && size.h == 0 || isNaN(size.w) && isNaN(size.h)) {
            size.w = this.div.offsetWidth;
            size.h = this.div.offsetHeight;
        }
        if (size.w == 0 && size.h == 0 || isNaN(size.w) && isNaN(size.h)) {
            size.w = parseInt(this.div.style.width);
            size.h = parseInt(this.div.style.height);
        }
        return size;
    },
    calculateBounds: function (center, resolution) {
        var extent = null;
        if (center == null) {
            center = this.getCachedCenter();
        }
        if (resolution == null) {
            resolution = this.getResolution();
        }
        if ((center != null) && (resolution != null)) {
            var halfWDeg = (this.size.w * resolution) / 2;
            var halfHDeg = (this.size.h * resolution) / 2;
            extent = new OpenLayers.Bounds(center.lon - halfWDeg, center.lat - halfHDeg, center.lon + halfWDeg, center.lat + halfHDeg);
        }
        return extent;
    },
    getCenter: function () {
        var center = null;
        var cachedCenter = this.getCachedCenter();
        if (cachedCenter) {
            center = cachedCenter.clone();
        }
        return center;
    },
    getCachedCenter: function () {
        if (!this.center && this.size) {
            this.center = this.getLonLatFromViewPortPx({
                x: this.size.w / 2,
                y: this.size.h / 2
            });
        }
        return this.center;
    },
    getZoom: function () {
        return this.zoom;
    },
    pan: function (dx, dy, options) {
        options = OpenLayers.Util.applyDefaults(options, {
            animate: true,
            dragging: false
        });
        if (options.dragging) {
            if (dx != 0 || dy != 0) {
                this.moveByPx(dx, dy);
            }
        } else {
            var centerPx = this.getViewPortPxFromLonLat(this.getCachedCenter());
            var newCenterPx = centerPx.add(dx, dy);
            if (this.dragging || !newCenterPx.equals(centerPx)) {
                var newCenterLonLat = this.getLonLatFromViewPortPx(newCenterPx);
                if (options.animate) {
                    this.panTo(newCenterLonLat);
                } else {
                    this.moveTo(newCenterLonLat);
                    if (this.dragging) {
                        this.dragging = false;
                        this.events.triggerEvent("moveend");
                    }
                }
            }
        }
    },
    panTo: function (lonlat) {
        if (this.panMethod && this.getExtent().scale(this.panRatio).containsLonLat(lonlat)) {
            if (!this.panTween) {
                this.panTween = new OpenLayers.Tween(this.panMethod);
            }
            var center = this.getCachedCenter();
            if (lonlat.equals(center)) {
                return;
            }
            var from = this.getPixelFromLonLat(center);
            var to = this.getPixelFromLonLat(lonlat);
            var vector = {
                x: to.x - from.x,
                y: to.y - from.y
            };
            var last = {
                x: 0,
                y: 0
            };
            this.panTween.start({
                x: 0,
                y: 0
            }, vector, this.panDuration, {
                callbacks: {
                    eachStep: OpenLayers.Function.bind(function (px) {
                        var x = px.x - last.x,
                            y = px.y - last.y;
                        this.moveByPx(x, y);
                        last.x = Math.round(px.x);
                        last.y = Math.round(px.y);
                    }, this),
                    done: OpenLayers.Function.bind(function (px) {
                        this.moveTo(lonlat);
                        this.dragging = false;
                        this.events.triggerEvent("moveend");
                    }, this)
                }
            });
        } else {
            this.setCenter(lonlat);
        }
    },
    setCenter: function (lonlat, zoom, dragging, forceZoomChange) {
        this.panTween && this.panTween.stop();
        this.moveTo(lonlat, zoom, {
            'dragging': dragging,
            'forceZoomChange': forceZoomChange
        });
    },
    moveByPx: function (dx, dy) {
        var hw = this.size.w / 2;
        var hh = this.size.h / 2;
        var x = hw + dx;
        var y = hh + dy;
        var wrapDateLine = this.baseLayer.wrapDateLine;
        var xRestriction = 0;
        var yRestriction = 0;
        if (this.restrictedExtent) {
            xRestriction = hw;
            yRestriction = hh;
            wrapDateLine = false;
        }
        dx = wrapDateLine || x <= this.maxPx.x - xRestriction && x >= this.minPx.x + xRestriction ? Math.round(dx) : 0;
        dy = y <= this.maxPx.y - yRestriction && y >= this.minPx.y + yRestriction ? Math.round(dy) : 0;
        if (dx || dy) {
            if (!this.dragging) {
                this.dragging = true;
                this.events.triggerEvent("movestart");
            }
            this.center = null;
            if (dx) {
                this.layerContainerDiv.style.left = parseInt(this.layerContainerDiv.style.left) - dx + "px";
                this.minPx.x -= dx;
                this.maxPx.x -= dx;
            }
            if (dy) {
                this.layerContainerDiv.style.top = parseInt(this.layerContainerDiv.style.top) - dy + "px";
                this.minPx.y -= dy;
                this.maxPx.y -= dy;
            }
            var layer, i, len;
            for (i = 0, len = this.layers.length; i < len; ++i) {
                layer = this.layers[i];
                if (layer.visibility && (layer === this.baseLayer || layer.inRange)) {
                    layer.moveByPx(dx, dy);
                    layer.events.triggerEvent("move");
                }
            }
            this.events.triggerEvent("move");
        }
    },
    adjustZoom: function (zoom) {
        var resolution, resolutions = this.baseLayer.resolutions,
            maxResolution = this.getMaxExtent().getWidth() / this.size.w;
        if (this.getResolutionForZoom(zoom) > maxResolution) {
            for (var i = zoom | 0, ii = resolutions.length; i < ii; ++i) {
                if (resolutions[i] <= maxResolution) {
                    zoom = i;
                    break;
                }
            }
        }
        return zoom;
    },
    moveTo: function (lonlat, zoom, options) {
        if (lonlat != null && !(lonlat instanceof OpenLayers.LonLat)) {
            lonlat = new OpenLayers.LonLat(lonlat);
        }
        if (!options) {
            options = {};
        }
        if (zoom != null) {
            zoom = parseFloat(zoom);
            if (!this.fractionalZoom) {
                zoom = Math.round(zoom);
            }
        }
        if (this.baseLayer.wrapDateLine) {
            var requestedZoom = zoom;
            zoom = this.adjustZoom(zoom);
            if (zoom !== requestedZoom) {
                lonlat = this.getCenter();
            }
        }
        var dragging = options.dragging || this.dragging;
        var forceZoomChange = options.forceZoomChange;
        if (!this.getCachedCenter() && !this.isValidLonLat(lonlat)) {
            lonlat = this.maxExtent.getCenterLonLat();
            this.center = lonlat.clone();
        }
        if (this.restrictedExtent != null) {
            if (lonlat == null) {
                lonlat = this.center;
            }
            if (zoom == null) {
                zoom = this.getZoom();
            }
            var resolution = this.getResolutionForZoom(zoom);
            var extent = this.calculateBounds(lonlat, resolution);
            if (!this.restrictedExtent.containsBounds(extent)) {
                var maxCenter = this.restrictedExtent.getCenterLonLat();
                if (extent.getWidth() > this.restrictedExtent.getWidth()) {
                    lonlat = new OpenLayers.LonLat(maxCenter.lon, lonlat.lat);
                } else if (extent.left < this.restrictedExtent.left) {
                    lonlat = lonlat.add(this.restrictedExtent.left -
                        extent.left, 0);
                } else if (extent.right > this.restrictedExtent.right) {
                    lonlat = lonlat.add(this.restrictedExtent.right -
                        extent.right, 0);
                }
                if (extent.getHeight() > this.restrictedExtent.getHeight()) {
                    lonlat = new OpenLayers.LonLat(lonlat.lon, maxCenter.lat);
                } else if (extent.bottom < this.restrictedExtent.bottom) {
                    lonlat = lonlat.add(0, this.restrictedExtent.bottom -
                        extent.bottom);
                } else if (extent.top > this.restrictedExtent.top) {
                    lonlat = lonlat.add(0, this.restrictedExtent.top -
                        extent.top);
                }
            }
        }
        var zoomChanged = forceZoomChange || ((this.isValidZoomLevel(zoom)) && (zoom != this.getZoom()));
        var centerChanged = (this.isValidLonLat(lonlat)) && (!lonlat.equals(this.center));
        if (zoomChanged || centerChanged || dragging) {
            dragging || this.events.triggerEvent("movestart");
            if (centerChanged) {
                if (!zoomChanged && this.center) {
                    this.centerLayerContainer(lonlat);
                }
                this.center = lonlat.clone();
            }
            var res = zoomChanged ? this.getResolutionForZoom(zoom) : this.getResolution();
            if (zoomChanged || this.layerContainerOrigin == null) {
                this.layerContainerOrigin = this.getCachedCenter();
                this.layerContainerDiv.style.left = "0px";
                this.layerContainerDiv.style.top = "0px";
                var maxExtent = this.getMaxExtent({
                    restricted: true
                });
                var maxExtentCenter = maxExtent.getCenterLonLat();
                var lonDelta = this.center.lon - maxExtentCenter.lon;
                var latDelta = maxExtentCenter.lat - this.center.lat;
                var extentWidth = Math.round(maxExtent.getWidth() / res);
                var extentHeight = Math.round(maxExtent.getHeight() / res);
                this.minPx = {
                    x: (this.size.w - extentWidth) / 2 - lonDelta / res,
                    y: (this.size.h - extentHeight) / 2 - latDelta / res
                };
                this.maxPx = {
                    x: this.minPx.x + Math.round(maxExtent.getWidth() / res),
                    y: this.minPx.y + Math.round(maxExtent.getHeight() / res)
                };
            }
            if (zoomChanged) {
                this.zoom = zoom;
                this.resolution = res;
            }
            var bounds = this.getExtent();
            if (this.baseLayer.visibility) {
                this.baseLayer.moveTo(bounds, zoomChanged, options.dragging);
                options.dragging || this.baseLayer.events.triggerEvent("moveend", {
                    zoomChanged: zoomChanged
                });
            }
            bounds = this.baseLayer.getExtent();
            for (var i = this.layers.length - 1; i >= 0; --i) {
                var layer = this.layers[i];
                if (layer !== this.baseLayer && !layer.isBaseLayer) {
                    var inRange = layer.calculateInRange();
                    if (layer.inRange != inRange) {
                        layer.inRange = inRange;
                        if (!inRange) {
                            layer.display(false);
                        }
                        this.events.triggerEvent("changelayer", {
                            layer: layer,
                            property: "visibility"
                        });
                    }
                    if (inRange && layer.visibility) {
                        layer.moveTo(bounds, zoomChanged, options.dragging);
                        options.dragging || layer.events.triggerEvent("moveend", {
                            zoomChanged: zoomChanged
                        });
                    }
                }
            }
            this.events.triggerEvent("move");
            dragging || this.events.triggerEvent("moveend");
            if (zoomChanged) {
                for (var i = 0, len = this.popups.length; i < len; i++) {
                    this.popups[i].updatePosition();
                }
                this.events.triggerEvent("zoomend");
            }
        }
    },
    centerLayerContainer: function (lonlat) {
        var originPx = this.getViewPortPxFromLonLat(this.layerContainerOrigin);
        var newPx = this.getViewPortPxFromLonLat(lonlat);
        if ((originPx != null) && (newPx != null)) {
            var oldLeft = parseInt(this.layerContainerDiv.style.left);
            var oldTop = parseInt(this.layerContainerDiv.style.top);
            var newLeft = Math.round(originPx.x - newPx.x);
            var newTop = Math.round(originPx.y - newPx.y);
            this.layerContainerDiv.style.left = newLeft + "px";
            this.layerContainerDiv.style.top = newTop + "px";
            var dx = oldLeft - newLeft;
            var dy = oldTop - newTop;
            this.minPx.x -= dx;
            this.maxPx.x -= dx;
            this.minPx.y -= dy;
            this.maxPx.y -= dy;
        }
    },
    isValidZoomLevel: function (zoomLevel) {
        return ((zoomLevel != null) && (zoomLevel >= 0) && (zoomLevel < this.getNumZoomLevels()));
    },
    isValidLonLat: function (lonlat) {
        var valid = false;
        if (lonlat != null) {
            var maxExtent = this.getMaxExtent();
            var worldBounds = this.baseLayer.wrapDateLine && maxExtent;
            valid = maxExtent.containsLonLat(lonlat, {
                worldBounds: worldBounds
            });
        }
        return valid;
    },
    getProjection: function () {
        var projection = this.getProjectionObject();
        return projection ? projection.getCode() : null;
    },
    getProjectionObject: function () {
        var projection = null;
        if (this.baseLayer != null) {
            projection = this.baseLayer.projection;
        }
        return projection;
    },
    getMaxResolution: function () {
        var maxResolution = null;
        if (this.baseLayer != null) {
            maxResolution = this.baseLayer.maxResolution;
        }
        return maxResolution;
    },
    getMaxExtent: function (options) {
        var maxExtent = null;
        if (options && options.restricted && this.restrictedExtent) {
            maxExtent = this.restrictedExtent;
        } else if (this.baseLayer != null) {
            maxExtent = this.baseLayer.maxExtent;
        }
        return maxExtent;
    },
    getNumZoomLevels: function () {
        var numZoomLevels = null;
        if (this.baseLayer != null) {
            numZoomLevels = this.baseLayer.numZoomLevels;
        }
        return numZoomLevels;
    },
    getExtent: function () {
        var extent = null;
        if (this.baseLayer != null) {
            extent = this.baseLayer.getExtent();
        }
        return extent;
    },
    getResolution: function () {
        var resolution = null;
        if (this.baseLayer != null) {
            resolution = this.baseLayer.getResolution();
        } else if (this.allOverlays === true && this.layers.length > 0) {
            resolution = this.layers[0].getResolution();
        }
        return resolution;
    },
    getUnits: function () {
        var units = null;
        if (this.baseLayer != null) {
            units = this.baseLayer.units;
        }
        return units;
    },
    getScale: function () {
        var scale = null;
        if (this.baseLayer != null) {
            var res = this.getResolution();
            var units = this.baseLayer.units;
            scale = OpenLayers.Util.getScaleFromResolution(res, units);
        }
        return scale;
    },
    getZoomForExtent: function (bounds, closest) {
        var zoom = null;
        if (this.baseLayer != null) {
            zoom = this.baseLayer.getZoomForExtent(bounds, closest);
        }
        return zoom;
    },
    getResolutionForZoom: function (zoom) {
        var resolution = null;
        if (this.baseLayer) {
            resolution = this.baseLayer.getResolutionForZoom(zoom);
        }
        return resolution;
    },
    getZoomForResolution: function (resolution, closest) {
        var zoom = null;
        if (this.baseLayer != null) {
            zoom = this.baseLayer.getZoomForResolution(resolution, closest);
        }
        return zoom;
    },
    zoomTo: function (zoom) {
        if (this.isValidZoomLevel(zoom)) {
            this.setCenter(null, zoom);
        }
    },
    zoomIn: function () {
        this.zoomTo(this.getZoom() + 1);
    },
    zoomOut: function () {
        this.zoomTo(this.getZoom() - 1);
    },
    zoomToExtent: function (bounds, closest) {
        if (!(bounds instanceof OpenLayers.Bounds)) {
            bounds = new OpenLayers.Bounds(bounds);
        }
        var center = bounds.getCenterLonLat();
        if (this.baseLayer.wrapDateLine) {
            var maxExtent = this.getMaxExtent();
            bounds = bounds.clone();
            while (bounds.right < bounds.left) {
                bounds.right += maxExtent.getWidth();
            }
            center = bounds.getCenterLonLat().wrapDateLine(maxExtent);
        }
        this.setCenter(center, this.getZoomForExtent(bounds, closest));
    },
    zoomToMaxExtent: function (options) {
        var restricted = (options) ? options.restricted : true;
        var maxExtent = this.getMaxExtent({
            'restricted': restricted
        });
        this.zoomToExtent(maxExtent);
    },
    zoomToScale: function (scale, closest) {
        var res = OpenLayers.Util.getResolutionFromScale(scale, this.baseLayer.units);
        var halfWDeg = (this.size.w * res) / 2;
        var halfHDeg = (this.size.h * res) / 2;
        var center = this.getCachedCenter();
        var extent = new OpenLayers.Bounds(center.lon - halfWDeg, center.lat - halfHDeg, center.lon + halfWDeg, center.lat + halfHDeg);
        this.zoomToExtent(extent, closest);
    },
    getLonLatFromViewPortPx: function (viewPortPx) {
        var lonlat = null;
        if (this.baseLayer != null) {
            lonlat = this.baseLayer.getLonLatFromViewPortPx(viewPortPx);
        }
        return lonlat;
    },
    getViewPortPxFromLonLat: function (lonlat) {
        var px = null;
        if (this.baseLayer != null) {
            px = this.baseLayer.getViewPortPxFromLonLat(lonlat);
        }
        return px;
    },
    getLonLatFromPixel: function (px) {
        return this.getLonLatFromViewPortPx(px);
    },
    getPixelFromLonLat: function (lonlat) {
        var px = this.getViewPortPxFromLonLat(lonlat);
        px.x = Math.round(px.x);
        px.y = Math.round(px.y);
        return px;
    },
    getGeodesicPixelSize: function (px) {
        var lonlat = px ? this.getLonLatFromPixel(px) : (this.getCachedCenter() || new OpenLayers.LonLat(0, 0));
        var res = this.getResolution();
        var left = lonlat.add(-res / 2, 0);
        var right = lonlat.add(res / 2, 0);
        var bottom = lonlat.add(0, -res / 2);
        var top = lonlat.add(0, res / 2);
        var dest = new OpenLayers.Projection("EPSG:4326");
        var source = this.getProjectionObject() || dest;
        if (!source.equals(dest)) {
            left.transform(source, dest);
            right.transform(source, dest);
            bottom.transform(source, dest);
            top.transform(source, dest);
        }
        return new OpenLayers.Size(OpenLayers.Util.distVincenty(left, right), OpenLayers.Util.distVincenty(bottom, top));
    },
    getViewPortPxFromLayerPx: function (layerPx) {
        var viewPortPx = null;
        if (layerPx != null) {
            var dX = parseInt(this.layerContainerDiv.style.left);
            var dY = parseInt(this.layerContainerDiv.style.top);
            viewPortPx = layerPx.add(dX, dY);
        }
        return viewPortPx;
    },
    getLayerPxFromViewPortPx: function (viewPortPx) {
        var layerPx = null;
        if (viewPortPx != null) {
            var dX = -parseInt(this.layerContainerDiv.style.left);
            var dY = -parseInt(this.layerContainerDiv.style.top);
            layerPx = viewPortPx.add(dX, dY);
            if (isNaN(layerPx.x) || isNaN(layerPx.y)) {
                layerPx = null;
            }
        }
        return layerPx;
    },
    getLonLatFromLayerPx: function (px) {
        px = this.getViewPortPxFromLayerPx(px);
        return this.getLonLatFromViewPortPx(px);
    },
    getLayerPxFromLonLat: function (lonlat) {
        var px = this.getPixelFromLonLat(lonlat);
        return this.getLayerPxFromViewPortPx(px);
    },
    CLASS_NAME: "OpenLayers.Map"
});
OpenLayers.Map.TILE_WIDTH = 256;
OpenLayers.Map.TILE_HEIGHT = 256;
OpenLayers.Layer = OpenLayers.Class({
    id: null,
    name: null,
    div: null,
    opacity: 1,
    alwaysInRange: null,
    RESOLUTION_PROPERTIES: ['scales', 'resolutions', 'maxScale', 'minScale', 'maxResolution', 'minResolution', 'numZoomLevels', 'maxZoomLevel'],
    events: null,
    map: null,
    isBaseLayer: false,
    alpha: false,
    displayInLayerSwitcher: true,
    visibility: true,
    attribution: null,
    inRange: false,
    imageSize: null,
    options: null,
    eventListeners: null,
    gutter: 0,
    projection: null,
    units: null,
    scales: null,
    resolutions: null,
    maxExtent: null,
    minExtent: null,
    maxResolution: null,
    minResolution: null,
    numZoomLevels: null,
    minScale: null,
    maxScale: null,
    displayOutsideMaxExtent: false,
    wrapDateLine: false,
    metadata: null,
    initialize: function (name, options) {
        this.metadata = {};
        this.addOptions(options);
        this.name = name;
        if (this.id == null) {
            this.id = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_");
            this.div = OpenLayers.Util.createDiv(this.id);
            this.div.style.width = "100%";
            this.div.style.height = "100%";
            this.div.dir = "ltr";
            this.events = new OpenLayers.Events(this, this.div);
            if (this.eventListeners instanceof Object) {
                this.events.on(this.eventListeners);
            }
        }
    },
    destroy: function (setNewBaseLayer) {
        if (setNewBaseLayer == null) {
            setNewBaseLayer = true;
        }
        if (this.map != null) {
            this.map.removeLayer(this, setNewBaseLayer);
        }
        this.projection = null;
        this.map = null;
        this.name = null;
        this.div = null;
        this.options = null;
        if (this.events) {
            if (this.eventListeners) {
                this.events.un(this.eventListeners);
            }
            this.events.destroy();
        }
        this.eventListeners = null;
        this.events = null;
    },
    clone: function (obj) {
        if (obj == null) {
            obj = new OpenLayers.Layer(this.name, this.getOptions());
        }
        OpenLayers.Util.applyDefaults(obj, this);
        obj.map = null;
        return obj;
    },
    getOptions: function () {
        var options = {};
        for (var o in this.options) {
            options[o] = this[o];
        }
        return options;
    },
    setName: function (newName) {
        if (newName != this.name) {
            this.name = newName;
            if (this.map != null) {
                this.map.events.triggerEvent("changelayer", {
                    layer: this,
                    property: "name"
                });
            }
        }
    },
    addOptions: function (newOptions, reinitialize) {
        if (this.options == null) {
            this.options = {};
        }
        if (newOptions) {
            if (typeof newOptions.projection == "string") {
                newOptions.projection = new OpenLayers.Projection(newOptions.projection);
            }
            if (newOptions.projection) {
                OpenLayers.Util.applyDefaults(newOptions, OpenLayers.Projection.defaults[newOptions.projection.getCode()]);
            }
            if (newOptions.maxExtent && !(newOptions.maxExtent instanceof OpenLayers.Bounds)) {
                newOptions.maxExtent = new OpenLayers.Bounds(newOptions.maxExtent);
            }
            if (newOptions.minExtent && !(newOptions.minExtent instanceof OpenLayers.Bounds)) {
                newOptions.minExtent = new OpenLayers.Bounds(newOptions.minExtent);
            }
        }
        OpenLayers.Util.extend(this.options, newOptions);
        OpenLayers.Util.extend(this, newOptions);
        if (this.projection && this.projection.getUnits()) {
            this.units = this.projection.getUnits();
        }
        if (this.map) {
            var resolution = this.map.getResolution();
            var properties = this.RESOLUTION_PROPERTIES.concat(["projection", "units", "minExtent", "maxExtent"]);
            for (var o in newOptions) {
                if (newOptions.hasOwnProperty(o) && OpenLayers.Util.indexOf(properties, o) >= 0) {
                    this.initResolutions();
                    if (reinitialize && this.map.baseLayer === this) {
                        this.map.setCenter(this.map.getCenter(), this.map.getZoomForResolution(resolution), false, true);
                        this.map.events.triggerEvent("changebaselayer", {
                            layer: this
                        });
                    }
                    break;
                }
            }
        }
    },
    onMapResize: function () {},
    redraw: function () {
        var redrawn = false;
        if (this.map) {
            this.inRange = this.calculateInRange();
            var extent = this.getExtent();
            if (extent && this.inRange && this.visibility) {
                var zoomChanged = true;
                this.moveTo(extent, zoomChanged, false);
                this.events.triggerEvent("moveend", {
                    "zoomChanged": zoomChanged
                });
                redrawn = true;
            }
        }
        return redrawn;
    },
    moveTo: function (bounds, zoomChanged, dragging) {
        var display = this.visibility;
        if (!this.isBaseLayer) {
            display = display && this.inRange;
        }
        this.display(display);
    },
    moveByPx: function (dx, dy) {},
    setMap: function (map) {
        if (this.map == null) {
            this.map = map;
            this.maxExtent = this.maxExtent || this.map.maxExtent;
            this.minExtent = this.minExtent || this.map.minExtent;
            this.projection = this.projection || this.map.projection;
            if (typeof this.projection == "string") {
                this.projection = new OpenLayers.Projection(this.projection);
            }
            this.units = this.projection.getUnits() || this.units || this.map.units;
            this.initResolutions();
            if (!this.isBaseLayer) {
                this.inRange = this.calculateInRange();
                var show = ((this.visibility) && (this.inRange));
                this.div.style.display = show ? "" : "none";
            }
            this.setTileSize();
        }
    },
    afterAdd: function () {},
    removeMap: function (map) {},
    getImageSize: function (bounds) {
        return (this.imageSize || this.tileSize);
    },
    setTileSize: function (size) {
        var tileSize = (size) ? size : ((this.tileSize) ? this.tileSize : this.map.getTileSize());
        this.tileSize = tileSize;
        if (this.gutter) {
            this.imageSize = new OpenLayers.Size(tileSize.w + (2 * this.gutter), tileSize.h + (2 * this.gutter));
        }
    },
    getVisibility: function () {
        return this.visibility;
    },
    setVisibility: function (visibility) {
        if (visibility != this.visibility) {
            this.visibility = visibility;
            this.display(visibility);
            this.redraw();
            if (this.map != null) {
                this.map.events.triggerEvent("changelayer", {
                    layer: this,
                    property: "visibility"
                });
            }
            this.events.triggerEvent("visibilitychanged");
        }
    },
    display: function (display) {
        if (display != (this.div.style.display != "none")) {
            this.div.style.display = (display && this.calculateInRange()) ? "block" : "none";
        }
    },
    calculateInRange: function () {
        var inRange = false;
        if (this.alwaysInRange) {
            inRange = true;
        } else {
            if (this.map) {
                var resolution = this.map.getResolution();
                inRange = ((resolution >= this.minResolution) && (resolution <= this.maxResolution));
            }
        }
        return inRange;
    },
    setIsBaseLayer: function (isBaseLayer) {
        if (isBaseLayer != this.isBaseLayer) {
            this.isBaseLayer = isBaseLayer;
            if (this.map != null) {
                this.map.events.triggerEvent("changebaselayer", {
                    layer: this
                });
            }
        }
    },
    initResolutions: function () {
        var i, len, p;
        var props = {}, alwaysInRange = true;
        for (i = 0, len = this.RESOLUTION_PROPERTIES.length; i < len; i++) {
            p = this.RESOLUTION_PROPERTIES[i];
            props[p] = this.options[p];
            if (alwaysInRange && this.options[p]) {
                alwaysInRange = false;
            }
        }
        if (this.alwaysInRange == null) {
            this.alwaysInRange = alwaysInRange;
        }
        if (props.resolutions == null) {
            props.resolutions = this.resolutionsFromScales(props.scales);
        }
        if (props.resolutions == null) {
            props.resolutions = this.calculateResolutions(props);
        }
        if (props.resolutions == null) {
            for (i = 0, len = this.RESOLUTION_PROPERTIES.length; i < len; i++) {
                p = this.RESOLUTION_PROPERTIES[i];
                props[p] = this.options[p] != null ? this.options[p] : this.map[p];
            }
            if (props.resolutions == null) {
                props.resolutions = this.resolutionsFromScales(props.scales);
            }
            if (props.resolutions == null) {
                props.resolutions = this.calculateResolutions(props);
            }
        }
        var maxResolution;
        if (this.options.maxResolution && this.options.maxResolution !== "auto") {
            maxResolution = this.options.maxResolution;
        }
        if (this.options.minScale) {
            maxResolution = OpenLayers.Util.getResolutionFromScale(this.options.minScale, this.units);
        }
        var minResolution;
        if (this.options.minResolution && this.options.minResolution !== "auto") {
            minResolution = this.options.minResolution;
        }
        if (this.options.maxScale) {
            minResolution = OpenLayers.Util.getResolutionFromScale(this.options.maxScale, this.units);
        }
        if (props.resolutions) {
            props.resolutions.sort(function (a, b) {
                return (b - a);
            });
            if (!maxResolution) {
                maxResolution = props.resolutions[0];
            }
            if (!minResolution) {
                var lastIdx = props.resolutions.length - 1;
                minResolution = props.resolutions[lastIdx];
            }
        }
        this.resolutions = props.resolutions;
        if (this.resolutions) {
            len = this.resolutions.length;
            this.scales = new Array(len);
            for (i = 0; i < len; i++) {
                this.scales[i] = OpenLayers.Util.getScaleFromResolution(this.resolutions[i], this.units);
            }
            this.numZoomLevels = len;
        }
        this.minResolution = minResolution;
        if (minResolution) {
            this.maxScale = OpenLayers.Util.getScaleFromResolution(minResolution, this.units);
        }
        this.maxResolution = maxResolution;
        if (maxResolution) {
            this.minScale = OpenLayers.Util.getScaleFromResolution(maxResolution, this.units);
        }
    },
    resolutionsFromScales: function (scales) {
        if (scales == null) {
            return;
        }
        var resolutions, i, len;
        len = scales.length;
        resolutions = new Array(len);
        for (i = 0; i < len; i++) {
            resolutions[i] = OpenLayers.Util.getResolutionFromScale(scales[i], this.units);
        }
        return resolutions;
    },
    calculateResolutions: function (props) {
        var viewSize, wRes, hRes;
        var maxResolution = props.maxResolution;
        if (props.minScale != null) {
            maxResolution = OpenLayers.Util.getResolutionFromScale(props.minScale, this.units);
        } else if (maxResolution == "auto" && this.maxExtent != null) {
            viewSize = this.map.getSize();
            wRes = this.maxExtent.getWidth() / viewSize.w;
            hRes = this.maxExtent.getHeight() / viewSize.h;
            maxResolution = Math.max(wRes, hRes);
        }
        var minResolution = props.minResolution;
        if (props.maxScale != null) {
            minResolution = OpenLayers.Util.getResolutionFromScale(props.maxScale, this.units);
        } else if (props.minResolution == "auto" && this.minExtent != null) {
            viewSize = this.map.getSize();
            wRes = this.minExtent.getWidth() / viewSize.w;
            hRes = this.minExtent.getHeight() / viewSize.h;
            minResolution = Math.max(wRes, hRes);
        }
        if (typeof maxResolution !== "number" && typeof minResolution !== "number" && this.maxExtent != null) {
            var tileSize = this.map.getTileSize();
            maxResolution = Math.max(this.maxExtent.getWidth() / tileSize.w, this.maxExtent.getHeight() / tileSize.h);
        }
        var maxZoomLevel = props.maxZoomLevel;
        var numZoomLevels = props.numZoomLevels;
        if (typeof minResolution === "number" && typeof maxResolution === "number" && numZoomLevels === undefined) {
            var ratio = maxResolution / minResolution;
            numZoomLevels = Math.floor(Math.log(ratio) / Math.log(2)) + 1;
        } else if (numZoomLevels === undefined && maxZoomLevel != null) {
            numZoomLevels = maxZoomLevel + 1;
        }
        if (typeof numZoomLevels !== "number" || numZoomLevels <= 0 || (typeof maxResolution !== "number" && typeof minResolution !== "number")) {
            return;
        }
        var resolutions = new Array(numZoomLevels);
        var base = 2;
        if (typeof minResolution == "number" && typeof maxResolution == "number") {
            base = Math.pow((maxResolution / minResolution), (1 / (numZoomLevels - 1)));
        }
        var i;
        if (typeof maxResolution === "number") {
            for (i = 0; i < numZoomLevels; i++) {
                resolutions[i] = maxResolution / Math.pow(base, i);
            }
        } else {
            for (i = 0; i < numZoomLevels; i++) {
                resolutions[numZoomLevels - 1 - i] = minResolution * Math.pow(base, i);
            }
        }
        return resolutions;
    },
    getResolution: function () {
        var zoom = this.map.getZoom();
        return this.getResolutionForZoom(zoom);
    },
    getExtent: function () {
        return this.map.calculateBounds();
    },
    getZoomForExtent: function (extent, closest) {
        var viewSize = this.map.getSize();
        var idealResolution = Math.max(extent.getWidth() / viewSize.w, extent.getHeight() / viewSize.h);
        return this.getZoomForResolution(idealResolution, closest);
    },
    getDataExtent: function () {},
    getResolutionForZoom: function (zoom) {
        zoom = Math.max(0, Math.min(zoom, this.resolutions.length - 1));
        var resolution;
        if (this.map.fractionalZoom) {
            var low = Math.floor(zoom);
            var high = Math.ceil(zoom);
            resolution = this.resolutions[low] -
                ((zoom - low) * (this.resolutions[low] - this.resolutions[high]));
        } else {
            resolution = this.resolutions[Math.round(zoom)];
        }
        return resolution;
    },
    getZoomForResolution: function (resolution, closest) {
        var zoom, i, len;
        if (this.map.fractionalZoom) {
            var lowZoom = 0;
            var highZoom = this.resolutions.length - 1;
            var highRes = this.resolutions[lowZoom];
            var lowRes = this.resolutions[highZoom];
            var res;
            for (i = 0, len = this.resolutions.length; i < len; ++i) {
                res = this.resolutions[i];
                if (res >= resolution) {
                    highRes = res;
                    lowZoom = i;
                }
                if (res <= resolution) {
                    lowRes = res;
                    highZoom = i;
                    break;
                }
            }
            var dRes = highRes - lowRes;
            if (dRes > 0) {
                zoom = lowZoom + ((highRes - resolution) / dRes);
            } else {
                zoom = lowZoom;
            }
        } else {
            var diff;
            var minDiff = Number.POSITIVE_INFINITY;
            for (i = 0, len = this.resolutions.length; i < len; i++) {
                if (closest) {
                    diff = Math.abs(this.resolutions[i] - resolution);
                    if (diff > minDiff) {
                        break;
                    }
                    minDiff = diff;
                } else {
                    if (this.resolutions[i] < resolution) {
                        break;
                    }
                }
            }
            zoom = Math.max(0, i - 1);
        }
        return zoom;
    },
    getLonLatFromViewPortPx: function (viewPortPx) {
        var lonlat = null;
        var map = this.map;
        if (viewPortPx != null && map.minPx) {
            var res = map.getResolution();
            var maxExtent = map.getMaxExtent({
                restricted: true
            });
            var lon = (viewPortPx.x - map.minPx.x) * res + maxExtent.left;
            var lat = (map.minPx.y - viewPortPx.y) * res + maxExtent.top;
            lonlat = new OpenLayers.LonLat(lon, lat);
            if (this.wrapDateLine) {
                lonlat = lonlat.wrapDateLine(this.maxExtent);
            }
        }
        return lonlat;
    },
    getViewPortPxFromLonLat: function (lonlat, resolution) {
        var px = null;
        if (lonlat != null) {
            resolution = resolution || this.map.getResolution();
            var extent = this.map.calculateBounds(null, resolution);
            px = new OpenLayers.Pixel((1 / resolution * (lonlat.lon - extent.left)), (1 / resolution * (extent.top - lonlat.lat)));
        }
        return px;
    },
    setOpacity: function (opacity) {
        if (opacity != this.opacity) {
            this.opacity = opacity;
            var childNodes = this.div.childNodes;
            for (var i = 0, len = childNodes.length; i < len; ++i) {
                var element = childNodes[i].firstChild || childNodes[i];
                var lastChild = childNodes[i].lastChild;
                if (lastChild && lastChild.nodeName.toLowerCase() === "iframe") {
                    element = lastChild.parentNode;
                }
                OpenLayers.Util.modifyDOMElement(element, null, null, null, null, null, null, opacity);
            }
            if (this.map != null) {
                this.map.events.triggerEvent("changelayer", {
                    layer: this,
                    property: "opacity"
                });
            }
        }
    },
    getZIndex: function () {
        return this.div.style.zIndex;
    },
    setZIndex: function (zIndex) {
        this.div.style.zIndex = zIndex;
    },
    adjustBounds: function (bounds) {
        if (this.gutter) {
            var mapGutter = this.gutter * this.map.getResolution();
            bounds = new OpenLayers.Bounds(bounds.left - mapGutter, bounds.bottom - mapGutter, bounds.right + mapGutter, bounds.top + mapGutter);
        }
        if (this.wrapDateLine) {
            var wrappingOptions = {
                'rightTolerance': this.getResolution(),
                'leftTolerance': this.getResolution()
            };
            bounds = bounds.wrapDateLine(this.maxExtent, wrappingOptions);
        }
        return bounds;
    },
    CLASS_NAME: "OpenLayers.Layer"
});
OpenLayers.Layer.HTTPRequest = OpenLayers.Class(OpenLayers.Layer, {
    URL_HASH_FACTOR: (Math.sqrt(5) - 1) / 2,
    url: null,
    params: null,
    reproject: false,
    initialize: function (name, url, params, options) {
        OpenLayers.Layer.prototype.initialize.apply(this, [name, options]);
        this.url = url;
        if (!this.params) {
            this.params = OpenLayers.Util.extend({}, params);
        }
    },
    destroy: function () {
        this.url = null;
        this.params = null;
        OpenLayers.Layer.prototype.destroy.apply(this, arguments);
    },
    clone: function (obj) {
        if (obj == null) {
            obj = new OpenLayers.Layer.HTTPRequest(this.name, this.url, this.params, this.getOptions());
        }
        obj = OpenLayers.Layer.prototype.clone.apply(this, [obj]);
        return obj;
    },
    setUrl: function (newUrl) {
        this.url = newUrl;
    },
    mergeNewParams: function (newParams) {
        this.params = OpenLayers.Util.extend(this.params, newParams);
        var ret = this.redraw();
        if (this.map != null) {
            this.map.events.triggerEvent("changelayer", {
                layer: this,
                property: "params"
            });
        }
        return ret;
    },
    redraw: function (force) {
        if (force) {
            return this.mergeNewParams({
                "_olSalt": Math.random()
            });
        } else {
            return OpenLayers.Layer.prototype.redraw.apply(this, []);
        }
    },
    selectUrl: function (paramString, urls) {
        var product = 1;
        for (var i = 0, len = paramString.length; i < len; i++) {
            product *= paramString.charCodeAt(i) * this.URL_HASH_FACTOR;
            product -= Math.floor(product);
        }
        return urls[Math.floor(product * urls.length)];
    },
    getFullRequestString: function (newParams, altUrl) {
        var url = altUrl || this.url;
        var allParams = OpenLayers.Util.extend({}, this.params);
        allParams = OpenLayers.Util.extend(allParams, newParams);
        var paramsString = OpenLayers.Util.getParameterString(allParams);
        if (OpenLayers.Util.isArray(url)) {
            url = this.selectUrl(paramsString, url);
        }
        var urlParams = OpenLayers.Util.upperCaseObject(OpenLayers.Util.getParameters(url));
        for (var key in allParams) {
            if (key.toUpperCase() in urlParams) {
                delete allParams[key];
            }
        }
        paramsString = OpenLayers.Util.getParameterString(allParams);
        return OpenLayers.Util.urlAppend(url, paramsString);
    },
    CLASS_NAME: "OpenLayers.Layer.HTTPRequest"
});
OpenLayers.Tile = OpenLayers.Class({
    events: null,
    eventListeners: null,
    id: null,
    layer: null,
    url: null,
    bounds: null,
    size: null,
    position: null,
    isLoading: false,
    initialize: function (layer, position, bounds, url, size, options) {
        this.layer = layer;
        this.position = position.clone();
        this.setBounds(bounds);
        this.url = url;
        if (size) {
            this.size = size.clone();
        }
        this.id = OpenLayers.Util.createUniqueID("Tile_");
        OpenLayers.Util.extend(this, options);
        this.events = new OpenLayers.Events(this);
        if (this.eventListeners instanceof Object) {
            this.events.on(this.eventListeners);
        }
    },
    unload: function () {
        if (this.isLoading) {
            this.isLoading = false;
            this.events.triggerEvent("unload");
        }
    },
    destroy: function () {
        this.layer = null;
        this.bounds = null;
        this.size = null;
        this.position = null;
        if (this.eventListeners) {
            this.events.un(this.eventListeners);
        }
        this.events.destroy();
        this.eventListeners = null;
        this.events = null;
    },
    draw: function (deferred) {
        if (!deferred) {
            this.clear();
        }
        var draw = this.shouldDraw();
        if (draw && !deferred) {
            draw = this.events.triggerEvent("beforedraw") !== false;
        }
        return draw;
    },
    shouldDraw: function () {
        var withinMaxExtent = false,
            maxExtent = this.layer.maxExtent;
        if (maxExtent) {
            var map = this.layer.map;
            var worldBounds = map.baseLayer.wrapDateLine && map.getMaxExtent();
            if (this.bounds.intersectsBounds(maxExtent, {
                inclusive: false,
                worldBounds: worldBounds
            })) {
                withinMaxExtent = true;
            }
        }
        return withinMaxExtent || this.layer.displayOutsideMaxExtent;
    },
    setBounds: function (bounds) {
        bounds = bounds.clone();
        if (this.layer.map.baseLayer.wrapDateLine) {
            var worldExtent = this.layer.map.getMaxExtent(),
                tolerance = this.layer.map.getResolution();
            bounds = bounds.wrapDateLine(worldExtent, {
                leftTolerance: tolerance,
                rightTolerance: tolerance
            });
        }
        this.bounds = bounds;
    },
    moveTo: function (bounds, position, redraw) {
        if (redraw == null) {
            redraw = true;
        }
        this.setBounds(bounds);
        this.position = position.clone();
        if (redraw) {
            this.draw();
        }
    },
    clear: function (draw) {},
    CLASS_NAME: "OpenLayers.Tile"
});
OpenLayers.Tile.Image = OpenLayers.Class(OpenLayers.Tile, {
    url: null,
    imgDiv: null,
    frame: null,
    imageReloadAttempts: null,
    layerAlphaHack: null,
    asyncRequestId: null,
    blankImageUrl: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAQAIBRAA7",
    maxGetUrlLength: null,
    canvasContext: null,
    crossOriginKeyword: null,
    initialize: function (layer, position, bounds, url, size, options) {
        OpenLayers.Tile.prototype.initialize.apply(this, arguments);
        this.url = url;
        this.layerAlphaHack = this.layer.alpha && OpenLayers.Util.alphaHack();
        if (this.maxGetUrlLength != null || this.layer.gutter || this.layerAlphaHack) {
            this.frame = document.createElement("div");
            this.frame.style.position = "absolute";
            this.frame.style.overflow = "hidden";
        }
        if (this.maxGetUrlLength != null) {
            OpenLayers.Util.extend(this, OpenLayers.Tile.Image.IFrame);
        }
    },
    destroy: function () {
        if (this.imgDiv) {
            this.clear();
            this.imgDiv = null;
            this.frame = null;
        }
        this.asyncRequestId = null;
        OpenLayers.Tile.prototype.destroy.apply(this, arguments);
    },
    draw: function () {
        var drawn = OpenLayers.Tile.prototype.draw.apply(this, arguments);
        if (drawn) {
            if (this.layer != this.layer.map.baseLayer && this.layer.reproject) {
                this.bounds = this.getBoundsFromBaseLayer(this.position);
            }
            if (this.isLoading) {
                this._loadEvent = "reload";
            } else {
                this.isLoading = true;
                this._loadEvent = "loadstart";
            }
            this.positionTile();
            this.renderTile();
        } else {
            this.unload();
        }
        return drawn;
    },
    renderTile: function () {
        this.layer.div.appendChild(this.getTile());
        if (this.layer.async) {
            var id = this.asyncRequestId = (this.asyncRequestId || 0) + 1;
            this.layer.getURLasync(this.bounds, function (url) {
                if (id == this.asyncRequestId) {
                    this.url = url;
                    this.initImage();
                }
            }, this);
        } else {
            this.url = this.layer.getURL(this.bounds);
            this.initImage();
        }
    },
    positionTile: function () {
        var style = this.getTile().style,
            size = this.frame ? this.size : this.layer.getImageSize(this.bounds);
        style.left = this.position.x + "%";
        style.top = this.position.y + "%";
        style.width = size.w + "%";
        style.height = size.h + "%";
    },
    clear: function () {
        OpenLayers.Tile.prototype.clear.apply(this, arguments);
        var img = this.imgDiv;
        if (img) {
            OpenLayers.Event.stopObservingElement(img);
            var tile = this.getTile();
            if (tile.parentNode === this.layer.div) {
                this.layer.div.removeChild(tile);
            }
            this.setImgSrc();
            if (this.layerAlphaHack === true) {
                img.style.filter = "";
            }
            OpenLayers.Element.removeClass(img, "olImageLoadError");
        }
        this.canvasContext = null;
    },
    getImage: function () {
        if (!this.imgDiv) {
            this.imgDiv = document.createElement("img");
            this.imgDiv.className = "olTileImage";
            this.imgDiv.galleryImg = "no";
            var style = this.imgDiv.style;
            if (this.frame) {
                var left = 0,
                    top = 0;
                if (this.layer.gutter) {
                    left = this.layer.gutter / this.layer.tileSize.w * 100;
                    top = this.layer.gutter / this.layer.tileSize.h * 100;
                }
                style.left = -left + "%";
                style.top = -top + "%";
                style.width = (2 * left + 100) + "%";
                style.height = (2 * top + 100) + "%";
            }
            style.visibility = "hidden";
            style.opacity = 0;
            if (this.layer.opacity < 1) {
                style.filter = 'alpha(opacity=' +
                    (this.layer.opacity * 100) + ')';
            }
            style.position = "absolute";
            if (this.layerAlphaHack) {
                style.paddingTop = style.height;
                style.height = "0";
                style.width = "100%";
            }
            if (this.frame) {
                this.frame.appendChild(this.imgDiv);
            }
        }
        return this.imgDiv;
    },
    initImage: function () {
        this.events.triggerEvent(this._loadEvent);
        var img = this.getImage();
        if (this.url && img.getAttribute("src") == this.url) {
            this.onImageLoad();
        } else {
            var load = OpenLayers.Function.bind(function () {
                OpenLayers.Event.stopObservingElement(img);
                OpenLayers.Event.observe(img, "load", OpenLayers.Function.bind(this.onImageLoad, this));
                OpenLayers.Event.observe(img, "error", OpenLayers.Function.bind(this.onImageError, this));
                this.imageReloadAttempts = 0;
                this.setImgSrc(this.url);
            }, this);
            if (img.getAttribute("src") == this.blankImageUrl) {
                load();
            } else {
                OpenLayers.Event.observe(img, "load", load);
                OpenLayers.Event.observe(img, "error", load);
                if (this.crossOriginKeyword) {
                    img.removeAttribute("crossorigin");
                }
                img.src = this.blankImageUrl;
            }
        }
    },
    setImgSrc: function (url) {
        var img = this.imgDiv;
        img.style.visibility = 'hidden';
        img.style.opacity = 0;
        if (url) {
            if (this.crossOriginKeyword) {
                if (url.substr(0, 5) !== 'data:') {
                    img.setAttribute("crossorigin", this.crossOriginKeyword);
                } else {
                    img.removeAttribute("crossorigin");
                }
            }
            img.src = url;
        }
    },
    getTile: function () {
        return this.frame ? this.frame : this.getImage();
    },
    createBackBuffer: function () {
        if (!this.imgDiv || this.isLoading) {
            return;
        }
        var backBuffer;
        if (this.frame) {
            backBuffer = this.frame.cloneNode(false);
            backBuffer.appendChild(this.imgDiv);
        } else {
            backBuffer = this.imgDiv;
        }
        this.imgDiv = null;
        return backBuffer;
    },
    onImageLoad: function () {
        var img = this.imgDiv;
        OpenLayers.Event.stopObservingElement(img);
        img.style.visibility = 'inherit';
        img.style.opacity = this.layer.opacity;
        this.isLoading = false;
        this.canvasContext = null;
        this.events.triggerEvent("loadend");
        if (parseFloat(navigator.appVersion.split("MSIE")[1]) < 7 && this.layer && this.layer.div) {
            var span = document.createElement("span");
            span.style.display = "none";
            var layerDiv = this.layer.div;
            layerDiv.appendChild(span);
            window.setTimeout(function () {
                span.parentNode === layerDiv && span.parentNode.removeChild(span);
            }, 0);
        }
        if (this.layerAlphaHack === true) {
            img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" +
                img.src + "', sizingMethod='scale')";
        }
    },
    onImageError: function () {
        var img = this.imgDiv;
        if (img.src != null) {
            this.imageReloadAttempts++;
            if (this.imageReloadAttempts <= OpenLayers.IMAGE_RELOAD_ATTEMPTS) {
                this.setImgSrc(this.layer.getURL(this.bounds));
            } else {
                OpenLayers.Element.addClass(img, "olImageLoadError");
                this.events.triggerEvent("loaderror");
                this.onImageLoad();
            }
        }
    },
    getCanvasContext: function () {
        if (OpenLayers.CANVAS_SUPPORTED && this.imgDiv && !this.isLoading) {
            if (!this.canvasContext) {
                var canvas = document.createElement("canvas");
                canvas.width = this.size.w;
                canvas.height = this.size.h;
                this.canvasContext = canvas.getContext("2d");
                this.canvasContext.drawImage(this.imgDiv, 0, 0);
            }
            return this.canvasContext;
        }
    },
    CLASS_NAME: "OpenLayers.Tile.Image"
});
OpenLayers.Layer.Grid = OpenLayers.Class(OpenLayers.Layer.HTTPRequest, {
    tileSize: null,
    tileOriginCorner: "bl",
    tileOrigin: null,
    tileOptions: null,
    tileClass: OpenLayers.Tile.Image,
    grid: null,
    singleTile: false,
    ratio: 1.5,
    buffer: 0,
    transitionEffect: null,
    numLoadingTiles: 0,
    tileLoadingDelay: 85,
    serverResolutions: null,
    moveTimerId: null,
    deferMoveGriddedTiles: null,
    tileQueueId: null,
    tileQueue: null,
    loading: false,
    backBuffer: null,
    gridResolution: null,
    backBufferResolution: null,
    backBufferLonLat: null,
    backBufferTimerId: null,
    removeBackBufferDelay: null,
    className: null,
    initialize: function (name, url, params, options) {
        OpenLayers.Layer.HTTPRequest.prototype.initialize.apply(this, arguments);
        this.grid = [];
        this.tileQueue = [];
        if (this.removeBackBufferDelay === null) {
            this.removeBackBufferDelay = this.singleTile ? 0 : 2500;
        }
        if (this.className === null) {
            this.className = this.singleTile ? 'olLayerGridSingleTile' : 'olLayerGrid';
        }
        if (!OpenLayers.Animation.isNative) {
            this.deferMoveGriddedTiles = OpenLayers.Function.bind(function () {
                this.moveGriddedTiles(true);
                this.moveTimerId = null;
            }, this);
        }
    },
    setMap: function (map) {
        OpenLayers.Layer.HTTPRequest.prototype.setMap.call(this, map);
        OpenLayers.Element.addClass(this.div, this.className);
    },
    removeMap: function (map) {
        if (this.moveTimerId !== null) {
            window.clearTimeout(this.moveTimerId);
            this.moveTimerId = null;
        }
        this.clearTileQueue();
        if (this.backBufferTimerId !== null) {
            window.clearTimeout(this.backBufferTimerId);
            this.backBufferTimerId = null;
        }
    },
    destroy: function () {
        this.removeBackBuffer();
        this.clearGrid();
        this.grid = null;
        this.tileSize = null;
        OpenLayers.Layer.HTTPRequest.prototype.destroy.apply(this, arguments);
    },
    clearGrid: function () {
        this.clearTileQueue();
        if (this.grid) {
            for (var iRow = 0, len = this.grid.length; iRow < len; iRow++) {
                var row = this.grid[iRow];
                for (var iCol = 0, clen = row.length; iCol < clen; iCol++) {
                    var tile = row[iCol];
                    this.destroyTile(tile);
                }
            }
            this.grid = [];
            this.gridResolution = null;
        }
    },
    clone: function (obj) {
        if (obj == null) {
            obj = new OpenLayers.Layer.Grid(this.name, this.url, this.params, this.getOptions());
        }
        obj = OpenLayers.Layer.HTTPRequest.prototype.clone.apply(this, [obj]);
        if (this.tileSize != null) {
            obj.tileSize = this.tileSize.clone();
        }
        obj.grid = [];
        obj.gridResolution = null;
        obj.backBuffer = null;
        obj.backBufferTimerId = null;
        obj.tileQueue = [];
        obj.tileQueueId = null;
        obj.loading = false;
        obj.moveTimerId = null;
        return obj;
    },
    moveTo: function (bounds, zoomChanged, dragging) {
        OpenLayers.Layer.HTTPRequest.prototype.moveTo.apply(this, arguments);
        bounds = bounds || this.map.getExtent();
        if (bounds != null) {
            var forceReTile = !this.grid.length || zoomChanged;
            var tilesBounds = this.getTilesBounds();
            var resolution = this.map.getResolution();
            var serverResolution = this.getServerResolution(resolution);
            if (this.singleTile) {
                if (forceReTile || (!dragging && !tilesBounds.containsBounds(bounds))) {
                    if (zoomChanged && this.transitionEffect !== 'resize') {
                        this.removeBackBuffer();
                    }
                    if (!zoomChanged || this.transitionEffect === 'resize') {
                        this.applyBackBuffer(serverResolution);
                    }
                    this.initSingleTile(bounds);
                }
            } else {
                forceReTile = forceReTile || !tilesBounds.intersectsBounds(bounds, {
                    worldBounds: this.map.baseLayer.wrapDateLine && this.map.getMaxExtent()
                });
                if (resolution !== serverResolution) {
                    bounds = this.map.calculateBounds(null, serverResolution);
                    if (forceReTile) {
                        var scale = serverResolution / resolution;
                        this.transformDiv(scale);
                    }
                } else {
                    this.div.style.width = '100%';
                    this.div.style.height = '100%';
                    this.div.style.left = '0%';
                    this.div.style.top = '0%';
                }
                if (forceReTile) {
                    if (zoomChanged && this.transitionEffect === 'resize') {
                        this.applyBackBuffer(serverResolution);
                    }
                    this.initGriddedTiles(bounds);
                } else {
                    this.moveGriddedTiles();
                }
            }
        }
    },
    getTileData: function (loc) {
        var data = null,
            x = loc.lon,
            y = loc.lat,
            numRows = this.grid.length;
        if (this.map && numRows) {
            var res = this.map.getResolution(),
                tileWidth = this.tileSize.w,
                tileHeight = this.tileSize.h,
                bounds = this.grid[0][0].bounds,
                left = bounds.left,
                top = bounds.top;
            if (x < left) {
                if (this.map.baseLayer.wrapDateLine) {
                    var worldWidth = this.map.getMaxExtent().getWidth();
                    var worldsAway = Math.ceil((left - x) / worldWidth);
                    x += worldWidth * worldsAway;
                }
            }
            var dtx = (x - left) / (res * tileWidth);
            var dty = (top - y) / (res * tileHeight);
            var col = Math.floor(dtx);
            var row = Math.floor(dty);
            if (row >= 0 && row < numRows) {
                var tile = this.grid[row][col];
                if (tile) {
                    data = {
                        tile: tile,
                        i: Math.floor((dtx - col) * tileWidth),
                        j: Math.floor((dty - row) * tileHeight)
                    };
                }
            }
        }
        return data;
    },
    queueTileDraw: function (evt) {
        var tile = evt.object;
        if (!~OpenLayers.Util.indexOf(this.tileQueue, tile)) {
            this.tileQueue.push(tile);
        }
        if (!this.tileQueueId) {
            this.tileQueueId = OpenLayers.Animation.start(OpenLayers.Function.bind(this.drawTileFromQueue, this), null, this.div);
        }
        return false;
    },
    drawTileFromQueue: function () {
        if (this.tileQueue.length === 0) {
            this.clearTileQueue();
        } else {
            this.tileQueue.shift().draw(true);
        }
    },
    clearTileQueue: function () {
        OpenLayers.Animation.stop(this.tileQueueId);
        this.tileQueueId = null;
        this.tileQueue = [];
    },
    destroyTile: function (tile) {
        this.removeTileMonitoringHooks(tile);
        tile.destroy();
    },
    getServerResolution: function (resolution) {
        resolution = resolution || this.map.getResolution();
        if (this.serverResolutions && OpenLayers.Util.indexOf(this.serverResolutions, resolution) === -1) {
            var i, serverResolution;
            for (i = this.serverResolutions.length - 1; i >= 0; i--) {
                serverResolution = this.serverResolutions[i];
                if (serverResolution > resolution) {
                    resolution = serverResolution;
                    break;
                }
            }
            if (i === -1) {
                throw 'no appropriate resolution in serverResolutions';
            }
        }
        return resolution;
    },
    getServerZoom: function () {
        var resolution = this.getServerResolution();
        return this.serverResolutions ? OpenLayers.Util.indexOf(this.serverResolutions, resolution) : this.map.getZoomForResolution(resolution) + (this.zoomOffset || 0);
    },
    transformDiv: function (scale) {
        this.div.style.width = 100 * scale + '%';
        this.div.style.height = 100 * scale + '%';
        var size = this.map.getSize();
        var lcX = parseInt(this.map.layerContainerDiv.style.left, 10);
        var lcY = parseInt(this.map.layerContainerDiv.style.top, 10);
        var x = (lcX - (size.w / 2.0)) * (scale - 1);
        var y = (lcY - (size.h / 2.0)) * (scale - 1);
        this.div.style.left = x + '%';
        this.div.style.top = y + '%';
    },
    getResolutionScale: function () {
        return parseInt(this.div.style.width, 10) / 100;
    },
    applyBackBuffer: function (resolution) {
        if (this.backBufferTimerId !== null) {
            this.removeBackBuffer();
        }
        var backBuffer = this.backBuffer;
        if (!backBuffer) {
            backBuffer = this.createBackBuffer();
            if (!backBuffer) {
                return;
            }
            this.div.insertBefore(backBuffer, this.div.firstChild);
            this.backBuffer = backBuffer;
            var topLeftTileBounds = this.grid[0][0].bounds;
            this.backBufferLonLat = {
                lon: topLeftTileBounds.left,
                lat: topLeftTileBounds.top
            };
            this.backBufferResolution = this.gridResolution;
        }
        var style = backBuffer.style;
        var ratio = this.backBufferResolution / resolution;
        style.width = 100 * ratio + '%';
        style.height = 100 * ratio + '%';
        var position = this.getViewPortPxFromLonLat(this.backBufferLonLat, resolution);
        var leftOffset = parseInt(this.map.layerContainerDiv.style.left, 10);
        var topOffset = parseInt(this.map.layerContainerDiv.style.top, 10);
        backBuffer.style.left = Math.round(position.x - leftOffset) + '%';
        backBuffer.style.top = Math.round(position.y - topOffset) + '%';
    },
    createBackBuffer: function () {
        var backBuffer;
        if (this.grid.length > 0) {
            backBuffer = document.createElement('div');
            backBuffer.id = this.div.id + '_bb';
            backBuffer.className = 'olBackBuffer';
            backBuffer.style.position = 'absolute';
            backBuffer.style.width = '100%';
            backBuffer.style.height = '100%';
            for (var i = 0, lenI = this.grid.length; i < lenI; i++) {
                for (var j = 0, lenJ = this.grid[i].length; j < lenJ; j++) {
                    var tile = this.grid[i][j].createBackBuffer();
                    if (!tile) {
                        continue;
                    }
                    tile.style.top = (i * this.tileSize.h) + '%';
                    tile.style.left = (j * this.tileSize.w) + '%';
                    backBuffer.appendChild(tile);
                }
            }
        }
        return backBuffer;
    },
    removeBackBuffer: function () {
        if (this.backBuffer) {
            this.div.removeChild(this.backBuffer);
            this.backBuffer = null;
            this.backBufferResolution = null;
            if (this.backBufferTimerId !== null) {
                window.clearTimeout(this.backBufferTimerId);
                this.backBufferTimerId = null;
            }
        }
    },
    moveByPx: function (dx, dy) {
        if (!this.singleTile) {
            this.moveGriddedTiles();
        }
    },
    setTileSize: function (size) {
        if (this.singleTile) {
            size = this.map.getSize();
            size.h = parseInt(size.h * this.ratio);
            size.w = parseInt(size.w * this.ratio);
        }
        OpenLayers.Layer.HTTPRequest.prototype.setTileSize.apply(this, [size]);
    },
    getTilesBounds: function () {
        var bounds = null;
        var length = this.grid.length;
        if (length) {
            var bottomLeftTileBounds = this.grid[length - 1][0].bounds,
                width = this.grid[0].length * bottomLeftTileBounds.getWidth(),
                height = this.grid.length * bottomLeftTileBounds.getHeight();
            bounds = new OpenLayers.Bounds(bottomLeftTileBounds.left, bottomLeftTileBounds.bottom, bottomLeftTileBounds.left + width, bottomLeftTileBounds.bottom + height);
        }
        return bounds;
    },
    initSingleTile: function (bounds) {
        this.clearTileQueue();
        var center = bounds.getCenterLonLat();
        var tileWidth = bounds.getWidth() * this.ratio;
        var tileHeight = bounds.getHeight() * this.ratio;
        var tileBounds = new OpenLayers.Bounds(center.lon - (tileWidth / 2), center.lat - (tileHeight / 2), center.lon + (tileWidth / 2), center.lat + (tileHeight / 2));
        var px = this.map.getLayerPxFromLonLat({
            lon: tileBounds.left,
            lat: tileBounds.top
        });
        if (!this.grid.length) {
            this.grid[0] = [];
        }
        var tile = this.grid[0][0];
        if (!tile) {
            tile = this.addTile(tileBounds, px);
            this.addTileMonitoringHooks(tile);
            tile.draw();
            this.grid[0][0] = tile;
        } else {
            tile.moveTo(tileBounds, px);
        }
        this.removeExcessTiles(1, 1);
        this.gridResolution = this.getServerResolution();
    },
    calculateGridLayout: function (bounds, origin, resolution) {
        var tilelon = resolution * this.tileSize.w;
        var tilelat = resolution * this.tileSize.h;
        var offsetlon = bounds.left - origin.lon;
        var tilecol = Math.floor(offsetlon / tilelon) - this.buffer;
        var tilecolremain = offsetlon / tilelon - tilecol;
        var tileoffsetx = -tilecolremain * this.tileSize.w;
        var tileoffsetlon = origin.lon + tilecol * tilelon;
        var offsetlat = bounds.top - (origin.lat + tilelat);
        var tilerow = Math.ceil(offsetlat / tilelat) + this.buffer;
        var tilerowremain = tilerow - offsetlat / tilelat;
        var tileoffsety = -tilerowremain * this.tileSize.h;
        var tileoffsetlat = origin.lat + tilerow * tilelat;
        return {
            tilelon: tilelon,
            tilelat: tilelat,
            tileoffsetlon: tileoffsetlon,
            tileoffsetlat: tileoffsetlat,
            tileoffsetx: tileoffsetx,
            tileoffsety: tileoffsety
        };
    },
    getTileOrigin: function () {
        var origin = this.tileOrigin;
        if (!origin) {
            var extent = this.getMaxExtent();
            var edges = ({
                "tl": ["left", "top"],
                "tr": ["right", "top"],
                "bl": ["left", "bottom"],
                "br": ["right", "bottom"]
            })[this.tileOriginCorner];
            origin = new OpenLayers.LonLat(extent[edges[0]], extent[edges[1]]);
        }
        return origin;
    },
    initGriddedTiles: function (bounds) {
        this.clearTileQueue();
        var viewSize = this.map.getSize();
        var minRows = Math.ceil(viewSize.h / this.tileSize.h) +
            Math.max(1, 2 * this.buffer);
        var minCols = Math.ceil(viewSize.w / this.tileSize.w) +
            Math.max(1, 2 * this.buffer);
        var origin = this.getTileOrigin();
        var resolution = this.getServerResolution();
        var tileLayout = this.calculateGridLayout(bounds, origin, resolution);
        var tileoffsetx = Math.round(tileLayout.tileoffsetx);
        var tileoffsety = Math.round(tileLayout.tileoffsety);
        var tileoffsetlon = tileLayout.tileoffsetlon;
        var tileoffsetlat = tileLayout.tileoffsetlat;
        var tilelon = tileLayout.tilelon;
        var tilelat = tileLayout.tilelat;
        var startX = tileoffsetx;
        var startLon = tileoffsetlon;
        var rowidx = 0;
        var layerContainerDivLeft = parseInt(this.map.layerContainerDiv.style.left);
        var layerContainerDivTop = parseInt(this.map.layerContainerDiv.style.top);
        var tileData = [],
            center = this.map.getCenter();
        do {
            var row = this.grid[rowidx++];
            if (!row) {
                row = [];
                this.grid.push(row);
            }
            tileoffsetlon = startLon;
            tileoffsetx = startX;
            var colidx = 0;
            do {
                var tileBounds = new OpenLayers.Bounds(tileoffsetlon, tileoffsetlat, tileoffsetlon + tilelon, tileoffsetlat + tilelat);
                var x = tileoffsetx;
                x -= layerContainerDivLeft;
                var y = tileoffsety;
                y -= layerContainerDivTop;
                var px = new OpenLayers.Pixel(x, y);
                var tile = row[colidx++];
                if (!tile) {
                    tile = this.addTile(tileBounds, px);
                    this.addTileMonitoringHooks(tile);
                    row.push(tile);
                } else {
                    tile.moveTo(tileBounds, px, false);
                }
                var tileCenter = tileBounds.getCenterLonLat();
                tileData.push({
                    tile: tile,
                    distance: Math.pow(tileCenter.lon - center.lon, 2) + Math.pow(tileCenter.lat - center.lat, 2)
                });
                tileoffsetlon += tilelon;
                tileoffsetx += this.tileSize.w;
            } while ((tileoffsetlon <= bounds.right + tilelon * this.buffer) || colidx < minCols);
            tileoffsetlat -= tilelat;
            tileoffsety += this.tileSize.h;
        } while ((tileoffsetlat >= bounds.bottom - tilelat * this.buffer) || rowidx < minRows);
        this.removeExcessTiles(rowidx, colidx);
        this.gridResolution = this.getServerResolution();
        tileData.sort(function (a, b) {
            return a.distance - b.distance;
        });
        for (var i = 0, ii = tileData.length; i < ii; ++i) {
            tileData[i].tile.draw();
        }
    },
    getMaxExtent: function () {
        return this.maxExtent;
    },
    addTile: function (bounds, position) {
        var tile = new this.tileClass(this, position, bounds, null, this.tileSize, this.tileOptions);
        tile.events.register("beforedraw", this, this.queueTileDraw);
        return tile;
    },
    addTileMonitoringHooks: function (tile) {
        tile.onLoadStart = function () {
            if (this.loading === false) {
                this.loading = true;
                this.events.triggerEvent("loadstart");
            }
            this.events.triggerEvent("tileloadstart", {
                tile: tile
            });
            this.numLoadingTiles++;
        };
        tile.onLoadEnd = function () {
            this.numLoadingTiles--;
            this.events.triggerEvent("tileloaded", {
                tile: tile
            });
            if (this.tileQueue.length === 0 && this.numLoadingTiles === 0) {
                this.loading = false;
                this.events.triggerEvent("loadend");
                if (this.backBuffer) {
                    this.backBufferTimerId = window.setTimeout(OpenLayers.Function.bind(this.removeBackBuffer, this), this.removeBackBufferDelay);
                }
            }
        };
        tile.onLoadError = function () {
            this.events.triggerEvent("tileerror", {
                tile: tile
            });
        };
        tile.events.on({
            "loadstart": tile.onLoadStart,
            "loadend": tile.onLoadEnd,
            "unload": tile.onLoadEnd,
            "loaderror": tile.onLoadError,
            scope: this
        });
    },
    removeTileMonitoringHooks: function (tile) {
        tile.unload();
        tile.events.un({
            "loadstart": tile.onLoadStart,
            "loadend": tile.onLoadEnd,
            "unload": tile.onLoadEnd,
            "loaderror": tile.onLoadError,
            scope: this
        });
    },
    moveGriddedTiles: function (deferred) {
        if (!deferred && !OpenLayers.Animation.isNative) {
            if (this.moveTimerId != null) {
                window.clearTimeout(this.moveTimerId);
            }
            this.moveTimerId = window.setTimeout(this.deferMoveGriddedTiles, this.tileLoadingDelay);
            return;
        }
        var buffer = this.buffer || 1;
        var scale = this.getResolutionScale();
        while (true) {
            var tlViewPort = {
                x: (this.grid[0][0].position.x * scale) + parseInt(this.div.style.left, 10) + parseInt(this.map.layerContainerDiv.style.left),
                y: (this.grid[0][0].position.y * scale) + parseInt(this.div.style.top, 10) + parseInt(this.map.layerContainerDiv.style.top)
            };
            var tileSize = {
                w: this.tileSize.w * scale,
                h: this.tileSize.h * scale
            };
            if (tlViewPort.x > -tileSize.w * (buffer - 1)) {
                this.shiftColumn(true);
            } else if (tlViewPort.x < -tileSize.w * buffer) {
                this.shiftColumn(false);
            } else if (tlViewPort.y > -tileSize.h * (buffer - 1)) {
                this.shiftRow(true);
            } else if (tlViewPort.y < -tileSize.h * buffer) {
                this.shiftRow(false);
            } else {
                break;
            }
        }
    },
    shiftRow: function (prepend) {
        var modelRowIndex = (prepend) ? 0 : (this.grid.length - 1);
        var grid = this.grid;
        var modelRow = grid[modelRowIndex];
        var resolution = this.getServerResolution();
        var deltaY = (prepend) ? -this.tileSize.h : this.tileSize.h;
        var deltaLat = resolution * -deltaY;
        var row = (prepend) ? grid.pop() : grid.shift();
        for (var i = 0, len = modelRow.length; i < len; i++) {
            var modelTile = modelRow[i];
            var bounds = modelTile.bounds.clone();
            var position = modelTile.position.clone();
            bounds.bottom = bounds.bottom + deltaLat;
            bounds.top = bounds.top + deltaLat;
            position.y = position.y + deltaY;
            row[i].moveTo(bounds, position);
        }
        if (prepend) {
            grid.unshift(row);
        } else {
            grid.push(row);
        }
    },
    shiftColumn: function (prepend) {
        var deltaX = (prepend) ? -this.tileSize.w : this.tileSize.w;
        var resolution = this.getServerResolution();
        var deltaLon = resolution * deltaX;
        for (var i = 0, len = this.grid.length; i < len; i++) {
            var row = this.grid[i];
            var modelTileIndex = (prepend) ? 0 : (row.length - 1);
            var modelTile = row[modelTileIndex];
            var bounds = modelTile.bounds.clone();
            var position = modelTile.position.clone();
            bounds.left = bounds.left + deltaLon;
            bounds.right = bounds.right + deltaLon;
            position.x = position.x + deltaX;
            var tile = prepend ? this.grid[i].pop() : this.grid[i].shift();
            tile.moveTo(bounds, position);
            if (prepend) {
                row.unshift(tile);
            } else {
                row.push(tile);
            }
        }
    },
    removeExcessTiles: function (rows, columns) {
        var i, l;
        while (this.grid.length > rows) {
            var row = this.grid.pop();
            for (i = 0, l = row.length; i < l; i++) {
                var tile = row[i];
                this.destroyTile(tile);
            }
        }
        for (i = 0, l = this.grid.length; i < l; i++) {
            while (this.grid[i].length > columns) {
                var row = this.grid[i];
                var tile = row.pop();
                this.destroyTile(tile);
            }
        }
    },
    onMapResize: function () {
        if (this.singleTile) {
            this.clearGrid();
            this.setTileSize();
        }
    },
    getTileBounds: function (viewPortPx) {
        var maxExtent = this.maxExtent;
        var resolution = this.getResolution();
        var tileMapWidth = resolution * this.tileSize.w;
        var tileMapHeight = resolution * this.tileSize.h;
        var mapPoint = this.getLonLatFromViewPortPx(viewPortPx);
        var tileLeft = maxExtent.left + (tileMapWidth * Math.floor((mapPoint.lon -
            maxExtent.left) / tileMapWidth));
        var tileBottom = maxExtent.bottom + (tileMapHeight * Math.floor((mapPoint.lat -
            maxExtent.bottom) / tileMapHeight));
        return new OpenLayers.Bounds(tileLeft, tileBottom, tileLeft + tileMapWidth, tileBottom + tileMapHeight);
    },
    CLASS_NAME: "OpenLayers.Layer.Grid"
});
OpenLayers.Handler = OpenLayers.Class({
    id: null,
    control: null,
    map: null,
    keyMask: null,
    active: false,
    evt: null,
    initialize: function (control, callbacks, options) {
        OpenLayers.Util.extend(this, options);
        this.control = control;
        this.callbacks = callbacks;
        var map = this.map || control.map;
        if (map) {
            this.setMap(map);
        }
        this.id = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_");
    },
    setMap: function (map) {
        this.map = map;
    },
    checkModifiers: function (evt) {
        if (this.keyMask == null) {
            return true;
        }
        var keyModifiers = (evt.shiftKey ? OpenLayers.Handler.MOD_SHIFT : 0) | (evt.ctrlKey ? OpenLayers.Handler.MOD_CTRL : 0) | (evt.altKey ? OpenLayers.Handler.MOD_ALT : 0);
        return (keyModifiers == this.keyMask);
    },
    activate: function () {
        if (this.active) {
            return false;
        }
        var events = OpenLayers.Events.prototype.BROWSER_EVENTS;
        for (var i = 0, len = events.length; i < len; i++) {
            if (this[events[i]]) {
                this.register(events[i], this[events[i]]);
            }
        }
        this.active = true;
        return true;
    },
    deactivate: function () {
        if (!this.active) {
            return false;
        }
        var events = OpenLayers.Events.prototype.BROWSER_EVENTS;
        for (var i = 0, len = events.length; i < len; i++) {
            if (this[events[i]]) {
                this.unregister(events[i], this[events[i]]);
            }
        }
        this.active = false;
        return true;
    },
    callback: function (name, args) {
        if (name && this.callbacks[name]) {
            this.callbacks[name].apply(this.control, args);
        }
    },
    register: function (name, method) {
        this.map.events.registerPriority(name, this, method);
        this.map.events.registerPriority(name, this, this.setEvent);
    },
    unregister: function (name, method) {
        this.map.events.unregister(name, this, method);
        this.map.events.unregister(name, this, this.setEvent);
    },
    setEvent: function (evt) {
        this.evt = evt;
        return true;
    },
    destroy: function () {
        this.deactivate();
        this.control = this.map = null;
    },
    CLASS_NAME: "OpenLayers.Handler"
});
OpenLayers.Handler.MOD_NONE = 0;
OpenLayers.Handler.MOD_SHIFT = 1;
OpenLayers.Handler.MOD_CTRL = 2;
OpenLayers.Handler.MOD_ALT = 4;
OpenLayers.Handler.Click = OpenLayers.Class(OpenLayers.Handler, {
    delay: 300,
    single: true,
    'double': false,
    pixelTolerance: 0,
    dblclickTolerance: 13,
    stopSingle: false,
    stopDouble: false,
    timerId: null,
    touch: false,
    down: null,
    last: null,
    first: null,
    rightclickTimerId: null,
    touchstart: function (evt) {
        if (!this.touch) {
            this.unregisterMouseListeners();
            this.touch = true;
        }
        this.down = this.getEventInfo(evt);
        this.last = this.getEventInfo(evt);
        return true;
    },
    touchmove: function (evt) {
        this.last = this.getEventInfo(evt);
        return true;
    },
    touchend: function (evt) {
        if (this.down) {
            evt.xy = this.last.xy;
            evt.lastTouches = this.last.touches;
            this.handleSingle(evt);
            this.down = null;
        }
        return true;
    },
    unregisterMouseListeners: function () {
        this.map.events.un({
            mousedown: this.mousedown,
            mouseup: this.mouseup,
            click: this.click,
            dblclick: this.dblclick,
            scope: this
        });
    },
    mousedown: function (evt) {
        this.down = this.getEventInfo(evt);
        this.last = this.getEventInfo(evt);
        return true;
    },
    mouseup: function (evt) {
        var propagate = true;
        if (this.checkModifiers(evt) && this.control.handleRightClicks && OpenLayers.Event.isRightClick(evt)) {
            propagate = this.rightclick(evt);
        }
        return propagate;
    },
    rightclick: function (evt) {
        if (this.passesTolerance(evt)) {
            if (this.rightclickTimerId != null) {
                this.clearTimer();
                this.callback('dblrightclick', [evt]);
                return !this.stopDouble;
            } else {
                var clickEvent = this['double'] ? OpenLayers.Util.extend({}, evt) : this.callback('rightclick', [evt]);
                var delayedRightCall = OpenLayers.Function.bind(this.delayedRightCall, this, clickEvent);
                this.rightclickTimerId = window.setTimeout(delayedRightCall, this.delay);
            }
        }
        return !this.stopSingle;
    },
    delayedRightCall: function (evt) {
        this.rightclickTimerId = null;
        if (evt) {
            this.callback('rightclick', [evt]);
        }
    },
    click: function (evt) {
        if (!this.last) {
            this.last = this.getEventInfo(evt);
        }
        this.handleSingle(evt);
        return !this.stopSingle;
    },
    dblclick: function (evt) {
        this.handleDouble(evt);
        return !this.stopDouble;
    },
    handleDouble: function (evt) {
        if (this.passesDblclickTolerance(evt)) {
            if (this["double"]) {
                this.callback("dblclick", [evt]);
            }
            this.clearTimer();
        }
    },
    handleSingle: function (evt) {
        if (this.passesTolerance(evt)) {
            if (this.timerId != null) {
                if (this.last.touches && this.last.touches.length === 1) {
                    if (this["double"]) {
                        OpenLayers.Event.stop(evt);
                    }
                    this.handleDouble(evt);
                }
                if (!this.last.touches || this.last.touches.length !== 2) {
                    this.clearTimer();
                }
            } else {
                this.first = this.getEventInfo(evt);
                var clickEvent = this.single ? OpenLayers.Util.extend({}, evt) : null;
                this.queuePotentialClick(clickEvent);
            }
        }
    },
    queuePotentialClick: function (evt) {
        this.timerId = window.setTimeout(OpenLayers.Function.bind(this.delayedCall, this, evt), this.delay);
    },
    passesTolerance: function (evt) {
        var passes = true;
        if (this.pixelTolerance != null && this.down && this.down.xy) {
            passes = this.pixelTolerance >= this.down.xy.distanceTo(evt.xy);
            if (passes && this.touch && this.down.touches.length === this.last.touches.length) {
                for (var i = 0, ii = this.down.touches.length; i < ii; ++i) {
                    if (this.getTouchDistance(this.down.touches[i], this.last.touches[i]) > this.pixelTolerance) {
                        passes = false;
                        break;
                    }
                }
            }
        }
        return passes;
    },
    getTouchDistance: function (from, to) {
        return Math.sqrt(Math.pow(from.clientX - to.clientX, 2) +
            Math.pow(from.clientY - to.clientY, 2));
    },
    passesDblclickTolerance: function (evt) {
        var passes = true;
        if (this.down && this.first) {
            passes = this.down.xy.distanceTo(this.first.xy) <= this.dblclickTolerance;
        }
        return passes;
    },
    clearTimer: function () {
        if (this.timerId != null) {
            window.clearTimeout(this.timerId);
            this.timerId = null;
        }
        if (this.rightclickTimerId != null) {
            window.clearTimeout(this.rightclickTimerId);
            this.rightclickTimerId = null;
        }
    },
    delayedCall: function (evt) {
        this.timerId = null;
        if (evt) {
            this.callback("click", [evt]);
        }
    },
    getEventInfo: function (evt) {
        var touches;
        if (evt.touches) {
            var len = evt.touches.length;
            touches = new Array(len);
            var touch;
            for (var i = 0; i < len; i++) {
                touch = evt.touches[i];
                touches[i] = {
                    clientX: touch.clientX,
                    clientY: touch.clientY
                };
            }
        }
        return {
            xy: evt.xy,
            touches: touches
        };
    },
    deactivate: function () {
        var deactivated = false;
        if (OpenLayers.Handler.prototype.deactivate.apply(this, arguments)) {
            this.clearTimer();
            this.down = null;
            this.first = null;
            this.last = null;
            this.touch = false;
            deactivated = true;
        }
        return deactivated;
    },
    CLASS_NAME: "OpenLayers.Handler.Click"
});
OpenLayers.Kinetic = OpenLayers.Class({
    threshold: 0,
    deceleration: 0.0035,
    nbPoints: 100,
    delay: 200,
    points: undefined,
    timerId: undefined,
    initialize: function (options) {
        OpenLayers.Util.extend(this, options);
    },
    begin: function () {
        OpenLayers.Animation.stop(this.timerId);
        this.timerId = undefined;
        this.points = [];
    },
    update: function (xy) {
        this.points.unshift({
            xy: xy,
            tick: new Date().getTime()
        });
        if (this.points.length > this.nbPoints) {
            this.points.pop();
        }
    },
    end: function (xy) {
        var last, now = new Date().getTime();
        for (var i = 0, l = this.points.length, point; i < l; i++) {
            point = this.points[i];
            if (now - point.tick > this.delay) {
                break;
            }
            last = point;
        }
        if (!last) {
            return;
        }
        var time = new Date().getTime() - last.tick;
        var dist = Math.sqrt(Math.pow(xy.x - last.xy.x, 2) +
            Math.pow(xy.y - last.xy.y, 2));
        var speed = dist / time;
        if (speed == 0 || speed < this.threshold) {
            return;
        }
        var theta = Math.asin((xy.y - last.xy.y) / dist);
        if (last.xy.x <= xy.x) {
            theta = Math.PI - theta;
        }
        return {
            speed: speed,
            theta: theta
        };
    },
    move: function (info, callback) {
        var v0 = info.speed;
        var fx = Math.cos(info.theta);
        var fy = -Math.sin(info.theta);
        var initialTime = new Date().getTime();
        var lastX = 0;
        var lastY = 0;
        var timerCallback = function () {
            if (this.timerId == null) {
                return;
            }
            var t = new Date().getTime() - initialTime;
            var p = (-this.deceleration * Math.pow(t, 2)) / 2.0 + v0 * t;
            var x = p * fx;
            var y = p * fy;
            var args = {};
            args.end = false;
            var v = -this.deceleration * t + v0;
            if (v <= 0) {
                OpenLayers.Animation.stop(this.timerId);
                this.timerId = null;
                args.end = true;
            }
            args.x = x - lastX;
            args.y = y - lastY;
            lastX = x;
            lastY = y;
            callback(args.x, args.y, args.end);
        };
        this.timerId = OpenLayers.Animation.start(OpenLayers.Function.bind(timerCallback, this));
    },
    CLASS_NAME: "OpenLayers.Kinetic"
});
OpenLayers.Control = OpenLayers.Class({
    id: null,
    map: null,
    div: null,
    type: null,
    allowSelection: false,
    displayClass: "",
    title: "",
    autoActivate: false,
    active: null,
    handler: null,
    eventListeners: null,
    events: null,
    initialize: function (options) {
        this.displayClass = this.CLASS_NAME.replace("OpenLayers.", "ol").replace(/\./g, "");
        OpenLayers.Util.extend(this, options);
        this.events = new OpenLayers.Events(this);
        if (this.eventListeners instanceof Object) {
            this.events.on(this.eventListeners);
        }
        if (this.id == null) {
            this.id = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_");
        }
    },
    destroy: function () {
        if (this.events) {
            if (this.eventListeners) {
                this.events.un(this.eventListeners);
            }
            this.events.destroy();
            this.events = null;
        }
        this.eventListeners = null;
        if (this.handler) {
            this.handler.destroy();
            this.handler = null;
        }
        if (this.handlers) {
            for (var key in this.handlers) {
                if (this.handlers.hasOwnProperty(key) && typeof this.handlers[key].destroy == "function") {
                    this.handlers[key].destroy();
                }
            }
            this.handlers = null;
        }
        if (this.map) {
            this.map.removeControl(this);
            this.map = null;
        }
        this.div = null;
    },
    setMap: function (map) {
        this.map = map;
        if (this.handler) {
            this.handler.setMap(map);
        }
    },
    draw: function (px) {
        if (this.div == null) {
            this.div = OpenLayers.Util.createDiv(this.id);
            this.div.className = this.displayClass;
            if (!this.allowSelection) {
                this.div.className += " olControlNoSelect";
                this.div.setAttribute("unselectable", "on", 0);
                this.div.onselectstart = OpenLayers.Function.False;
            }
            if (this.title != "") {
                this.div.title = this.title;
            }
        }
        if (px != null) {
            this.position = px.clone();
        }
        this.moveTo(this.position);
        return this.div;
    },
    moveTo: function (px) {
        if ((px != null) && (this.div != null)) {
            this.div.style.left = px.x + "px";
            this.div.style.top = px.y + "px";
        }
    },
    activate: function () {
        if (this.active) {
            return false;
        }
        if (this.handler) {
            this.handler.activate();
        }
        this.active = true;
        if (this.map) {
            OpenLayers.Element.addClass(this.map.viewPortDiv, this.displayClass.replace(/ /g, "") + "Active");
        }
        this.events.triggerEvent("activate");
        return true;
    },
    deactivate: function () {
        if (this.active) {
            if (this.handler) {
                this.handler.deactivate();
            }
            this.active = false;
            if (this.map) {
                OpenLayers.Element.removeClass(this.map.viewPortDiv, this.displayClass.replace(/ /g, "") + "Active");
            }
            this.events.triggerEvent("deactivate");
            return true;
        }
        return false;
    },
    CLASS_NAME: "OpenLayers.Control"
});
OpenLayers.Control.TYPE_BUTTON = 1;
OpenLayers.Control.TYPE_TOGGLE = 2;
OpenLayers.Control.TYPE_TOOL = 3;
OpenLayers.Handler.Drag = OpenLayers.Class(OpenLayers.Handler, {
    started: false,
    stopDown: true,
    dragging: false,
    touch: false,
    last: null,
    start: null,
    lastMoveEvt: null,
    oldOnselectstart: null,
    interval: 0,
    timeoutId: null,
    documentDrag: false,
    documentEvents: null,
    initialize: function (control, callbacks, options) {
        OpenLayers.Handler.prototype.initialize.apply(this, arguments);
        if (this.documentDrag === true) {
            var me = this;
            this._docMove = function (evt) {
                me.mousemove({
                    xy: {
                        x: evt.clientX,
                        y: evt.clientY
                    },
                    element: document
                });
            };
            this._docUp = function (evt) {
                me.mouseup({
                    xy: {
                        x: evt.clientX,
                        y: evt.clientY
                    }
                });
            };
        }
    },
    dragstart: function (evt) {
        var propagate = true;
        this.dragging = false;
        if (this.checkModifiers(evt) && (OpenLayers.Event.isLeftClick(evt) || OpenLayers.Event.isSingleTouch(evt))) {
            this.started = true;
            this.start = evt.xy;
            this.last = evt.xy;
            OpenLayers.Element.addClass(this.map.viewPortDiv, "olDragDown");
            this.down(evt);
            this.callback("down", [evt.xy]);
            OpenLayers.Event.stop(evt);
            if (!this.oldOnselectstart) {
                this.oldOnselectstart = document.onselectstart ? document.onselectstart : OpenLayers.Function.True;
            }
            document.onselectstart = OpenLayers.Function.False;
            propagate = !this.stopDown;
        } else {
            this.started = false;
            this.start = null;
            this.last = null;
        }
        return propagate;
    },
    dragmove: function (evt) {
        this.lastMoveEvt = evt;
        if (this.started && !this.timeoutId && (evt.xy.x != this.last.x || evt.xy.y != this.last.y)) {
            if (this.documentDrag === true && this.documentEvents) {
                if (evt.element === document) {
                    this.adjustXY(evt);
                    this.setEvent(evt);
                } else {
                    this.removeDocumentEvents();
                }
            }
            if (this.interval > 0) {
                this.timeoutId = setTimeout(OpenLayers.Function.bind(this.removeTimeout, this), this.interval);
            }
            this.dragging = true;
            this.move(evt);
            this.callback("move", [evt.xy]);
            if (!this.oldOnselectstart) {
                this.oldOnselectstart = document.onselectstart;
                document.onselectstart = OpenLayers.Function.False;
            }
            this.last = evt.xy;
        }
        return true;
    },
    dragend: function (evt) {
        if (this.started) {
            if (this.documentDrag === true && this.documentEvents) {
                this.adjustXY(evt);
                this.removeDocumentEvents();
            }
            var dragged = (this.start != this.last);
            this.started = false;
            this.dragging = false;
            OpenLayers.Element.removeClass(this.map.viewPortDiv, "olDragDown");
            this.up(evt);
            this.callback("up", [evt.xy]);
            if (dragged) {
                this.callback("done", [evt.xy]);
            }
            document.onselectstart = this.oldOnselectstart;
        }
        return true;
    },
    down: function (evt) {},
    move: function (evt) {},
    up: function (evt) {},
    out: function (evt) {},
    mousedown: function (evt) {
        return this.dragstart(evt);
    },
    touchstart: function (evt) {
        if (!this.touch) {
            this.touch = true;
            this.map.events.un({
                mousedown: this.mousedown,
                mouseup: this.mouseup,
                mousemove: this.mousemove,
                click: this.click,
                scope: this
            });
        }
        return this.dragstart(evt);
    },
    mousemove: function (evt) {
        return this.dragmove(evt);
    },
    touchmove: function (evt) {
        return this.dragmove(evt);
    },
    removeTimeout: function () {
        this.timeoutId = null;
        if (this.dragging) {
            this.mousemove(this.lastMoveEvt);
        }
    },
    mouseup: function (evt) {
        return this.dragend(evt);
    },
    touchend: function (evt) {
        evt.xy = this.last;
        return this.dragend(evt);
    },
    mouseout: function (evt) {
        if (this.started && OpenLayers.Util.mouseLeft(evt, this.map.viewPortDiv)) {
            if (this.documentDrag === true) {
                this.addDocumentEvents();
            } else {
                var dragged = (this.start != this.last);
                this.started = false;
                this.dragging = false;
                OpenLayers.Element.removeClass(this.map.viewPortDiv, "olDragDown");
                this.out(evt);
                this.callback("out", []);
                if (dragged) {
                    this.callback("done", [evt.xy]);
                }
                if (document.onselectstart) {
                    document.onselectstart = this.oldOnselectstart;
                }
            }
        }
        return true;
    },
    click: function (evt) {
        return (this.start == this.last);
    },
    activate: function () {
        var activated = false;
        if (OpenLayers.Handler.prototype.activate.apply(this, arguments)) {
            this.dragging = false;
            activated = true;
        }
        return activated;
    },
    deactivate: function () {
        var deactivated = false;
        if (OpenLayers.Handler.prototype.deactivate.apply(this, arguments)) {
            this.touch = false;
            this.started = false;
            this.dragging = false;
            this.start = null;
            this.last = null;
            deactivated = true;
            OpenLayers.Element.removeClass(this.map.viewPortDiv, "olDragDown");
        }
        return deactivated;
    },
    adjustXY: function (evt) {
        var pos = OpenLayers.Util.pagePosition(this.map.viewPortDiv);
        evt.xy.x -= pos[0];
        evt.xy.y -= pos[1];
    },
    addDocumentEvents: function () {
        OpenLayers.Element.addClass(document.body, "olDragDown");
        this.documentEvents = true;
        OpenLayers.Event.observe(document, "mousemove", this._docMove);
        OpenLayers.Event.observe(document, "mouseup", this._docUp);
    },
    removeDocumentEvents: function () {
        OpenLayers.Element.removeClass(document.body, "olDragDown");
        this.documentEvents = false;
        OpenLayers.Event.stopObserving(document, "mousemove", this._docMove);
        OpenLayers.Event.stopObserving(document, "mouseup", this._docUp);
    },
    CLASS_NAME: "OpenLayers.Handler.Drag"
});
OpenLayers.Handler.Box = OpenLayers.Class(OpenLayers.Handler, {
    dragHandler: null,
    boxDivClassName: 'olHandlerBoxZoomBox',
    boxOffsets: null,
    initialize: function (control, callbacks, options) {
        OpenLayers.Handler.prototype.initialize.apply(this, arguments);
        this.dragHandler = new OpenLayers.Handler.Drag(this, {
            down: this.startBox,
            move: this.moveBox,
            out: this.removeBox,
            up: this.endBox
        }, {
            keyMask: this.keyMask
        });
    },
    destroy: function () {
        OpenLayers.Handler.prototype.destroy.apply(this, arguments);
        if (this.dragHandler) {
            this.dragHandler.destroy();
            this.dragHandler = null;
        }
    },
    setMap: function (map) {
        OpenLayers.Handler.prototype.setMap.apply(this, arguments);
        if (this.dragHandler) {
            this.dragHandler.setMap(map);
        }
    },
    startBox: function (xy) {
        this.callback("start", []);
        this.zoomBox = OpenLayers.Util.createDiv('zoomBox', {
            x: -9999,
            y: -9999
        });
        this.zoomBox.className = this.boxDivClassName;
        this.zoomBox.style.zIndex = this.map.Z_INDEX_BASE["Popup"] - 1;
        this.map.viewPortDiv.appendChild(this.zoomBox);
        OpenLayers.Element.addClass(this.map.viewPortDiv, "olDrawBox");
    },
    moveBox: function (xy) {
        var startX = this.dragHandler.start.x;
        var startY = this.dragHandler.start.y;
        var deltaX = Math.abs(startX - xy.x);
        var deltaY = Math.abs(startY - xy.y);
        var offset = this.getBoxOffsets();
        this.zoomBox.style.width = (deltaX + offset.width + 1) + "px";
        this.zoomBox.style.height = (deltaY + offset.height + 1) + "px";
        this.zoomBox.style.left = (xy.x < startX ? startX - deltaX - offset.left : startX - offset.left) + "px";
        this.zoomBox.style.top = (xy.y < startY ? startY - deltaY - offset.top : startY - offset.top) + "px";
    },
    endBox: function (end) {
        var result;
        if (Math.abs(this.dragHandler.start.x - end.x) > 5 || Math.abs(this.dragHandler.start.y - end.y) > 5) {
            var start = this.dragHandler.start;
            var top = Math.min(start.y, end.y);
            var bottom = Math.max(start.y, end.y);
            var left = Math.min(start.x, end.x);
            var right = Math.max(start.x, end.x);
            result = new OpenLayers.Bounds(left, bottom, right, top);
        } else {
            result = this.dragHandler.start.clone();
        }
        this.removeBox();
        this.callback("done", [result]);
    },
    removeBox: function () {
        this.map.viewPortDiv.removeChild(this.zoomBox);
        this.zoomBox = null;
        this.boxOffsets = null;
        OpenLayers.Element.removeClass(this.map.viewPortDiv, "olDrawBox");
    },
    activate: function () {
        if (OpenLayers.Handler.prototype.activate.apply(this, arguments)) {
            this.dragHandler.activate();
            return true;
        } else {
            return false;
        }
    },
    deactivate: function () {
        if (OpenLayers.Handler.prototype.deactivate.apply(this, arguments)) {
            if (this.dragHandler.deactivate()) {
                if (this.zoomBox) {
                    this.removeBox();
                }
            }
            return true;
        } else {
            return false;
        }
    },
    getBoxOffsets: function () {
        if (!this.boxOffsets) {
            var testDiv = document.createElement("div");
            testDiv.style.position = "absolute";
            testDiv.style.border = "1px solid black";
            testDiv.style.width = "3px";
            document.body.appendChild(testDiv);
            var w3cBoxModel = testDiv.clientWidth == 3;
            document.body.removeChild(testDiv);
            var left = parseInt(OpenLayers.Element.getStyle(this.zoomBox, "border-left-width"));
            var right = parseInt(OpenLayers.Element.getStyle(this.zoomBox, "border-right-width"));
            var top = parseInt(OpenLayers.Element.getStyle(this.zoomBox, "border-top-width"));
            var bottom = parseInt(OpenLayers.Element.getStyle(this.zoomBox, "border-bottom-width"));
            this.boxOffsets = {
                left: left,
                right: right,
                top: top,
                bottom: bottom,
                width: w3cBoxModel === false ? left + right : 0,
                height: w3cBoxModel === false ? top + bottom : 0
            };
        }
        return this.boxOffsets;
    },
    CLASS_NAME: "OpenLayers.Handler.Box"
});
OpenLayers.Control.ZoomBox = OpenLayers.Class(OpenLayers.Control, {
    type: OpenLayers.Control.TYPE_TOOL,
    out: false,
    keyMask: null,
    alwaysZoom: false,
    draw: function () {
        this.handler = new OpenLayers.Handler.Box(this, {
            done: this.zoomBox
        }, {
            keyMask: this.keyMask
        });
    },
    zoomBox: function (position) {
        if (position instanceof OpenLayers.Bounds) {
            var bounds;
            if (!this.out) {
                var minXY = this.map.getLonLatFromPixel({
                    x: position.left,
                    y: position.bottom
                });
                var maxXY = this.map.getLonLatFromPixel({
                    x: position.right,
                    y: position.top
                });
                bounds = new OpenLayers.Bounds(minXY.lon, minXY.lat, maxXY.lon, maxXY.lat);
            } else {
                var pixWidth = Math.abs(position.right - position.left);
                var pixHeight = Math.abs(position.top - position.bottom);
                var zoomFactor = Math.min((this.map.size.h / pixHeight), (this.map.size.w / pixWidth));
                var extent = this.map.getExtent();
                var center = this.map.getLonLatFromPixel(position.getCenterPixel());
                var xmin = center.lon - (extent.getWidth() / 2) * zoomFactor;
                var xmax = center.lon + (extent.getWidth() / 2) * zoomFactor;
                var ymin = center.lat - (extent.getHeight() / 2) * zoomFactor;
                var ymax = center.lat + (extent.getHeight() / 2) * zoomFactor;
                bounds = new OpenLayers.Bounds(xmin, ymin, xmax, ymax);
            }
            var lastZoom = this.map.getZoom();
            this.map.zoomToExtent(bounds);
            if (lastZoom == this.map.getZoom() && this.alwaysZoom == true) {
                this.map.zoomTo(lastZoom + (this.out ? -1 : 1));
            }
        } else {
            if (!this.out) {
                this.map.setCenter(this.map.getLonLatFromPixel(position), this.map.getZoom() + 1);
            } else {
                this.map.setCenter(this.map.getLonLatFromPixel(position), this.map.getZoom() - 1);
            }
        }
    },
    CLASS_NAME: "OpenLayers.Control.ZoomBox"
});
OpenLayers.Control.DragPan = OpenLayers.Class(OpenLayers.Control, {
    type: OpenLayers.Control.TYPE_TOOL,
    panned: false,
    interval: 1,
    documentDrag: false,
    kinetic: null,
    enableKinetic: false,
    kineticInterval: 10,
    draw: function () {
        if (this.enableKinetic) {
            var config = {
                interval: this.kineticInterval
            };
            if (typeof this.enableKinetic === "object") {
                config = OpenLayers.Util.extend(config, this.enableKinetic);
            }
            this.kinetic = new OpenLayers.Kinetic(config);
        }
        this.handler = new OpenLayers.Handler.Drag(this, {
            "move": this.panMap,
            "done": this.panMapDone,
            "down": this.panMapStart
        }, {
            interval: this.interval,
            documentDrag: this.documentDrag
        });
    },
    panMapStart: function () {
        if (this.kinetic) {
            this.kinetic.begin();
        }
    },
    panMap: function (xy) {
        if (this.kinetic) {
            this.kinetic.update(xy);
        }
        this.panned = true;
        this.map.pan(this.handler.last.x - xy.x, this.handler.last.y - xy.y, {
            dragging: true,
            animate: false
        });
    },
    panMapDone: function (xy) {
        if (this.panned) {
            var res = null;
            if (this.kinetic) {
                res = this.kinetic.end(xy);
            }
            this.map.pan(this.handler.last.x - xy.x, this.handler.last.y - xy.y, {
                dragging: !! res,
                animate: false
            });
            if (res) {
                var self = this;
                this.kinetic.move(res, function (x, y, end) {
                    self.map.pan(x, y, {
                        dragging: !end,
                        animate: false
                    });
                });
            }
            this.panned = false;
        }
    },
    CLASS_NAME: "OpenLayers.Control.DragPan"
});
OpenLayers.Handler.MouseWheel = OpenLayers.Class(OpenLayers.Handler, {
    wheelListener: null,
    mousePosition: null,
    interval: 0,
    delta: 0,
    cumulative: true,
    initialize: function (control, callbacks, options) {
        OpenLayers.Handler.prototype.initialize.apply(this, arguments);
        this.wheelListener = OpenLayers.Function.bindAsEventListener(this.onWheelEvent, this);
    },
    destroy: function () {
        OpenLayers.Handler.prototype.destroy.apply(this, arguments);
        this.wheelListener = null;
    },
    onWheelEvent: function (e) {
        if (!this.map || !this.checkModifiers(e)) {
            return;
        }
        var overScrollableDiv = false;
        var overLayerDiv = false;
        var overMapDiv = false;
        var elem = OpenLayers.Event.element(e);
        while ((elem != null) && !overMapDiv && !overScrollableDiv) {
            if (!overScrollableDiv) {
                try {
                    if (elem.currentStyle) {
                        overflow = elem.currentStyle["overflow"];
                    } else {
                        var style = document.defaultView.getComputedStyle(elem, null);
                        var overflow = style.getPropertyValue("overflow");
                    }
                    overScrollableDiv = (overflow && (overflow == "auto") || (overflow == "scroll"));
                } catch (err) {}
            }
            if (!overLayerDiv) {
                for (var i = 0, len = this.map.layers.length; i < len; i++) {
                    if (elem == this.map.layers[i].div || elem == this.map.layers[i].pane) {
                        overLayerDiv = true;
                        break;
                    }
                }
            }
            overMapDiv = (elem == this.map.div);
            elem = elem.parentNode;
        }
        if (!overScrollableDiv && overMapDiv) {
            if (overLayerDiv) {
                var delta = 0;
                if (!e) {
                    e = window.event;
                }
                if (e.wheelDelta) {
                    delta = e.wheelDelta / 120;
                    if (window.opera && window.opera.version() < 9.2) {
                        delta = -delta;
                    }
                } else if (e.detail) {
                    delta = -e.detail / 3;
                }
                this.delta = this.delta + delta;
                if (this.interval) {
                    window.clearTimeout(this._timeoutId);
                    this._timeoutId = window.setTimeout(OpenLayers.Function.bind(function () {
                        this.wheelZoom(e);
                    }, this), this.interval);
                } else {
                    this.wheelZoom(e);
                }
            }
            OpenLayers.Event.stop(e);
        }
    },
    wheelZoom: function (e) {
        var delta = this.delta;
        this.delta = 0;
        if (delta) {
            if (this.mousePosition) {
                e.xy = this.mousePosition;
            }
            if (!e.xy) {
                e.xy = this.map.getPixelFromLonLat(this.map.getCenter());
            }
            if (delta < 0) {
                this.callback("down", [e, this.cumulative ? delta : -1]);
            } else {
                this.callback("up", [e, this.cumulative ? delta : 1]);
            }
        }
    },
    mousemove: function (evt) {
        this.mousePosition = evt.xy;
    },
    activate: function (evt) {
        if (OpenLayers.Handler.prototype.activate.apply(this, arguments)) {
            var wheelListener = this.wheelListener;
            OpenLayers.Event.observe(window, "DOMMouseScroll", wheelListener);
            OpenLayers.Event.observe(window, "mousewheel", wheelListener);
            OpenLayers.Event.observe(document, "mousewheel", wheelListener);
            return true;
        } else {
            return false;
        }
    },
    deactivate: function (evt) {
        if (OpenLayers.Handler.prototype.deactivate.apply(this, arguments)) {
            var wheelListener = this.wheelListener;
            OpenLayers.Event.stopObserving(window, "DOMMouseScroll", wheelListener);
            OpenLayers.Event.stopObserving(window, "mousewheel", wheelListener);
            OpenLayers.Event.stopObserving(document, "mousewheel", wheelListener);
            return true;
        } else {
            return false;
        }
    },
    CLASS_NAME: "OpenLayers.Handler.MouseWheel"
});
OpenLayers.Control.Navigation = OpenLayers.Class(OpenLayers.Control, {
    dragPan: null,
    dragPanOptions: null,
    pinchZoom: null,
    pinchZoomOptions: null,
    documentDrag: false,
    zoomBox: null,
    zoomBoxEnabled: true,
    zoomWheelEnabled: true,
    mouseWheelOptions: null,
    handleRightClicks: false,
    zoomBoxKeyMask: OpenLayers.Handler.MOD_SHIFT,
    autoActivate: true,
    initialize: function (options) {
        this.handlers = {};
        OpenLayers.Control.prototype.initialize.apply(this, arguments);
    },
    destroy: function () {
        this.deactivate();
        if (this.dragPan) {
            this.dragPan.destroy();
        }
        this.dragPan = null;
        if (this.zoomBox) {
            this.zoomBox.destroy();
        }
        this.zoomBox = null;
        if (this.pinchZoom) {
            this.pinchZoom.destroy();
        }
        this.pinchZoom = null;
        OpenLayers.Control.prototype.destroy.apply(this, arguments);
    },
    activate: function () {
        this.dragPan.activate();
        if (this.zoomWheelEnabled) {
            this.handlers.wheel.activate();
        }
        this.handlers.click.activate();
        if (this.zoomBoxEnabled) {
            this.zoomBox.activate();
        }
        if (this.pinchZoom) {
            this.pinchZoom.activate();
        }
        return OpenLayers.Control.prototype.activate.apply(this, arguments);
    },
    deactivate: function () {
        if (this.pinchZoom) {
            this.pinchZoom.deactivate();
        }
        this.zoomBox.deactivate();
        this.dragPan.deactivate();
        this.handlers.click.deactivate();
        this.handlers.wheel.deactivate();
        return OpenLayers.Control.prototype.deactivate.apply(this, arguments);
    },
    draw: function () {
        if (this.handleRightClicks) {
            this.map.viewPortDiv.oncontextmenu = OpenLayers.Function.False;
        }
        var clickCallbacks = {
            'click': this.defaultClick,
            'dblclick': this.defaultDblClick,
            'dblrightclick': this.defaultDblRightClick
        };
        var clickOptions = {
            'double': true,
            'stopDouble': true
        };
        this.handlers.click = new OpenLayers.Handler.Click(this, clickCallbacks, clickOptions);
        this.dragPan = new OpenLayers.Control.DragPan(OpenLayers.Util.extend({
            map: this.map,
            documentDrag: this.documentDrag
        }, this.dragPanOptions));
        this.zoomBox = new OpenLayers.Control.ZoomBox({
            map: this.map,
            keyMask: this.zoomBoxKeyMask
        });
        this.dragPan.draw();
        this.zoomBox.draw();
        this.handlers.wheel = new OpenLayers.Handler.MouseWheel(this, {
            "up": this.wheelUp,
            "down": this.wheelDown
        }, this.mouseWheelOptions);
        if (OpenLayers.Control.PinchZoom) {
            this.pinchZoom = new OpenLayers.Control.PinchZoom(OpenLayers.Util.extend({
                map: this.map
            }, this.pinchZoomOptions));
        }
    },
    defaultClick: function (evt) {
        if (evt.lastTouches && evt.lastTouches.length == 2) {
            this.map.zoomOut();
        }
    },
    defaultDblClick: function (evt) {
        var newCenter = this.map.getLonLatFromViewPortPx(evt.xy);
        this.map.setCenter(newCenter, this.map.zoom + 1);
    },
    defaultDblRightClick: function (evt) {
        var newCenter = this.map.getLonLatFromViewPortPx(evt.xy);
        this.map.setCenter(newCenter, this.map.zoom - 1);
    },
    wheelChange: function (evt, deltaZ) {
        var currentZoom = this.map.getZoom();
        var newZoom = this.map.getZoom() + Math.round(deltaZ);
        newZoom = Math.max(newZoom, 0);
        newZoom = Math.min(newZoom, this.map.getNumZoomLevels());
        if (newZoom === currentZoom) {
            return;
        }
        var size = this.map.getSize();
        var deltaX = size.w / 2 - evt.xy.x;
        var deltaY = evt.xy.y - size.h / 2;
        var newRes = this.map.baseLayer.getResolutionForZoom(newZoom);
        var zoomPoint = this.map.getLonLatFromPixel(evt.xy);
        var newCenter = new OpenLayers.LonLat(zoomPoint.lon + deltaX * newRes, zoomPoint.lat + deltaY * newRes);
        this.map.setCenter(newCenter, newZoom);
    },
    wheelUp: function (evt, delta) {
        this.wheelChange(evt, delta || 1);
    },
    wheelDown: function (evt, delta) {
        this.wheelChange(evt, delta || -1);
    },
    disableZoomBox: function () {
        this.zoomBoxEnabled = false;
        this.zoomBox.deactivate();
    },
    enableZoomBox: function () {
        this.zoomBoxEnabled = true;
        if (this.active) {
            this.zoomBox.activate();
        }
    },
    disableZoomWheel: function () {
        this.zoomWheelEnabled = false;
        this.handlers.wheel.deactivate();
    },
    enableZoomWheel: function () {
        this.zoomWheelEnabled = true;
        if (this.active) {
            this.handlers.wheel.activate();
        }
    },
    CLASS_NAME: "OpenLayers.Control.Navigation"
});
OpenLayers.Layer.Image = OpenLayers.Class(OpenLayers.Layer, {
    isBaseLayer: true,
    url: null,
    extent: null,
    size: null,
    tile: null,
    aspectRatio: null,
    initialize: function (name, url, extent, size, options) {
        this.url = url;
        this.extent = extent;
        this.maxExtent = extent;
        this.size = size;
        OpenLayers.Layer.prototype.initialize.apply(this, [name, options]);
        this.aspectRatio = (this.extent.getHeight() / this.size.h) / (this.extent.getWidth() / this.size.w);
    },
    destroy: function () {
        if (this.tile) {
            this.removeTileMonitoringHooks(this.tile);
            this.tile.destroy();
            this.tile = null;
        }
        OpenLayers.Layer.prototype.destroy.apply(this, arguments);
    },
    clone: function (obj) {
        if (obj == null) {
            obj = new OpenLayers.Layer.Image(this.name, this.url, this.extent, this.size, this.getOptions());
        }
        obj = OpenLayers.Layer.prototype.clone.apply(this, [obj]);
        return obj;
    },
    setMap: function (map) {
        if (this.options.maxResolution == null) {
            this.options.maxResolution = this.aspectRatio * this.extent.getWidth() / this.size.w;
        }
        OpenLayers.Layer.prototype.setMap.apply(this, arguments);
    },
    moveTo: function (bounds, zoomChanged, dragging) {
        OpenLayers.Layer.prototype.moveTo.apply(this, arguments);
        var firstRendering = (this.tile == null);
        if (zoomChanged || firstRendering) {
            this.setTileSize();
            var ulPx = this.map.getLayerPxFromLonLat({
                lon: this.extent.left,
                lat: this.extent.top
            });
            if (firstRendering) {
                this.tile = new OpenLayers.Tile.Image(this, ulPx, this.extent, null, this.tileSize);
                this.addTileMonitoringHooks(this.tile);
            } else {
                this.tile.size = this.tileSize.clone();
                this.tile.position = ulPx.clone();
            }
            this.tile.draw();
        }
    },
    setTileSize: function () {
        var tileWidth = this.extent.getWidth() / this.map.getResolution();
        var tileHeight = this.extent.getHeight() / this.map.getResolution();
        this.tileSize = new OpenLayers.Size(tileWidth, tileHeight);
    },
    addTileMonitoringHooks: function (tile) {
        tile.onLoadStart = function () {
            this.events.triggerEvent("loadstart");
        };
        tile.events.register("loadstart", this, tile.onLoadStart);
        tile.onLoadEnd = function () {
            this.events.triggerEvent("loadend");
        };
        tile.events.register("loadend", this, tile.onLoadEnd);
        tile.events.register("unload", this, tile.onLoadEnd);
    },
    removeTileMonitoringHooks: function (tile) {
        tile.unload();
        tile.events.un({
            "loadstart": tile.onLoadStart,
            "loadend": tile.onLoadEnd,
            "unload": tile.onLoadEnd,
            scope: this
        });
    },
    setUrl: function (newUrl) {
        this.url = newUrl;
        this.tile.draw();
    },
    getURL: function (bounds) {
        return this.url;
    },
    CLASS_NAME: "OpenLayers.Layer.Image"
});
OpenLayers.Handler.Pinch = OpenLayers.Class(OpenLayers.Handler, {
    started: false,
    stopDown: false,
    pinching: false,
    last: null,
    start: null,
    touchstart: function (evt) {
        var propagate = true;
        this.pinching = false;
        if (OpenLayers.Event.isMultiTouch(evt)) {
            this.started = true;
            this.last = this.start = {
                distance: this.getDistance(evt.touches),
                delta: 0,
                scale: 1
            };
            this.callback("start", [evt, this.start]);
            propagate = !this.stopDown;
        } else {
            this.started = false;
            this.start = null;
            this.last = null;
        }
        OpenLayers.Event.stop(evt);
        return propagate;
    },
    touchmove: function (evt) {
        if (this.started && OpenLayers.Event.isMultiTouch(evt)) {
            this.pinching = true;
            var current = this.getPinchData(evt);
            this.callback("move", [evt, current]);
            this.last = current;
            OpenLayers.Event.stop(evt);
        }
        return true;
    },
    touchend: function (evt) {
        if (this.started) {
            this.started = false;
            this.pinching = false;
            this.callback("done", [evt, this.start, this.last]);
            this.start = null;
            this.last = null;
        }
        return true;
    },
    activate: function () {
        var activated = false;
        if (OpenLayers.Handler.prototype.activate.apply(this, arguments)) {
            this.pinching = false;
            activated = true;
        }
        return activated;
    },
    deactivate: function () {
        var deactivated = false;
        if (OpenLayers.Handler.prototype.deactivate.apply(this, arguments)) {
            this.started = false;
            this.pinching = false;
            this.start = null;
            this.last = null;
            deactivated = true;
        }
        return deactivated;
    },
    getDistance: function (touches) {
        var t0 = touches[0];
        var t1 = touches[1];
        return Math.sqrt(Math.pow(t0.clientX - t1.clientX, 2) +
            Math.pow(t0.clientY - t1.clientY, 2));
    },
    getPinchData: function (evt) {
        var distance = this.getDistance(evt.touches);
        var scale = distance / this.start.distance;
        return {
            distance: distance,
            delta: this.last.distance - distance,
            scale: scale
        };
    },
    CLASS_NAME: "OpenLayers.Handler.Pinch"
});
OpenLayers.Events.buttonclick = OpenLayers.Class({
    target: null,
    events: ['mousedown', 'mouseup', 'click', 'dblclick', 'touchstart', 'touchmove', 'touchend', 'keydown'],
    startRegEx: /^mousedown|touchstart$/,
    cancelRegEx: /^touchmove$/,
    completeRegEx: /^mouseup|touchend$/,
    initialize: function (target) {
        this.target = target;
        for (var i = this.events.length - 1; i >= 0; --i) {
            this.target.register(this.events[i], this, this.buttonClick, {
                extension: true
            });
        }
    },
    destroy: function () {
        for (var i = this.events.length - 1; i >= 0; --i) {
            this.target.unregister(this.events[i], this, this.buttonClick);
        }
        delete this.target;
    },
    getPressedButton: function (element) {
        var depth = 3,
            button;
        do {
            if (OpenLayers.Element.hasClass(element, "olButton")) {
                button = element;
                break;
            }
            element = element.parentNode;
        } while (--depth > 0 && element);
        return button;
    },
    buttonClick: function (evt) {
        var propagate = true,
            element = OpenLayers.Event.element(evt);
        if (element && (OpenLayers.Event.isLeftClick(evt) || !~evt.type.indexOf("mouse"))) {
            var button = this.getPressedButton(element);
            if (button) {
                if (evt.type === "keydown") {
                    switch (evt.keyCode) {
                    case OpenLayers.Event.KEY_RETURN:
                    case OpenLayers.Event.KEY_SPACE:
                        this.target.triggerEvent("buttonclick", {
                            buttonElement: button
                        });
                        OpenLayers.Event.stop(evt);
                        propagate = false;
                        break;
                    }
                } else if (this.startEvt) {
                    if (this.completeRegEx.test(evt.type)) {
                        var pos = OpenLayers.Util.pagePosition(button);
                        this.target.triggerEvent("buttonclick", {
                            buttonElement: button,
                            buttonXY: {
                                x: this.startEvt.clientX - pos[0],
                                y: this.startEvt.clientY - pos[1]
                            }
                        });
                    }
                    if (this.cancelRegEx.test(evt.type)) {
                        delete this.startEvt;
                    }
                    OpenLayers.Event.stop(evt);
                    propagate = false;
                }
                if (this.startRegEx.test(evt.type)) {
                    this.startEvt = evt;
                    OpenLayers.Event.stop(evt);
                    propagate = false;
                }
            } else {
                delete this.startEvt;
            }
        }
        return propagate;
    }
});
OpenLayers.Control.PinchZoom = OpenLayers.Class(OpenLayers.Control, {
    type: OpenLayers.Control.TYPE_TOOL,
    containerCenter: null,
    pinchOrigin: null,
    currentCenter: null,
    autoActivate: true,
    initialize: function (options) {
        OpenLayers.Control.prototype.initialize.apply(this, arguments);
        this.handler = new OpenLayers.Handler.Pinch(this, {
            start: this.pinchStart,
            move: this.pinchMove,
            done: this.pinchDone
        }, this.handlerOptions);
    },
    activate: function () {
        var activated = OpenLayers.Control.prototype.activate.apply(this, arguments);
        if (activated) {
            this.map.events.on({
                moveend: this.updateContainerCenter,
                scope: this
            });
            this.updateContainerCenter();
        }
        return activated;
    },
    deactivate: function () {
        var deactivated = OpenLayers.Control.prototype.deactivate.apply(this, arguments);
        if (this.map && this.map.events) {
            this.map.events.un({
                moveend: this.updateContainerCenter,
                scope: this
            });
        }
        return deactivated;
    },
    updateContainerCenter: function () {
        var container = this.map.layerContainerDiv;
        this.containerCenter = {
            x: parseInt(container.style.left, 10) + 50,
            y: parseInt(container.style.top, 10) + 50
        };
    },
    pinchStart: function (evt, pinchData) {
        this.pinchOrigin = evt.xy;
        this.currentCenter = evt.xy;
    },
    pinchMove: function (evt, pinchData) {
        var scale = pinchData.scale;
        var containerCenter = this.containerCenter;
        var pinchOrigin = this.pinchOrigin;
        var current = evt.xy;
        var dx = Math.round((current.x - pinchOrigin.x) + (scale - 1) * (containerCenter.x - pinchOrigin.x));
        var dy = Math.round((current.y - pinchOrigin.y) + (scale - 1) * (containerCenter.y - pinchOrigin.y));
        this.applyTransform("translate(" + dx + "px, " + dy + "px) scale(" + scale + ")");
        this.currentCenter = current;
    },
    applyTransform: function (transform) {
        var style = this.map.layerContainerDiv.style;
        style['-webkit-transform'] = transform;
        style['-moz-transform'] = transform;
    },
    pinchDone: function (evt, start, last) {
        this.applyTransform("");
        var zoom = this.map.getZoomForResolution(this.map.getResolution() / last.scale, true);
        if (zoom !== this.map.getZoom() || !this.currentCenter.equals(this.pinchOrigin)) {
            var resolution = this.map.getResolutionForZoom(zoom);
            var location = this.map.getLonLatFromPixel(this.pinchOrigin);
            var zoomPixel = this.currentCenter;
            var size = this.map.getSize();
            location.lon += resolution * ((size.w / 2) - zoomPixel.x);
            location.lat -= resolution * ((size.h / 2) - zoomPixel.y);
            this.map.div.clientWidth = this.map.div.clientWidth;
            this.map.setCenter(location, zoom);
        }
    },
    CLASS_NAME: "OpenLayers.Control.PinchZoom"
});
OpenLayers.Control.TouchNavigation = OpenLayers.Class(OpenLayers.Control, {
    dragPan: null,
    dragPanOptions: null,
    pinchZoom: null,
    pinchZoomOptions: null,
    clickHandlerOptions: null,
    documentDrag: false,
    autoActivate: true,
    initialize: function (options) {
        this.handlers = {};
        OpenLayers.Control.prototype.initialize.apply(this, arguments);
    },
    destroy: function () {
        this.deactivate();
        if (this.dragPan) {
            this.dragPan.destroy();
        }
        this.dragPan = null;
        if (this.pinchZoom) {
            this.pinchZoom.destroy();
            delete this.pinchZoom;
        }
        OpenLayers.Control.prototype.destroy.apply(this, arguments);
    },
    activate: function () {
        if (OpenLayers.Control.prototype.activate.apply(this, arguments)) {
            this.dragPan.activate();
            this.handlers.click.activate();
            this.pinchZoom.activate();
            return true;
        }
        return false;
    },
    deactivate: function () {
        if (OpenLayers.Control.prototype.deactivate.apply(this, arguments)) {
            this.dragPan.deactivate();
            this.handlers.click.deactivate();
            this.pinchZoom.deactivate();
            return true;
        }
        return false;
    },
    draw: function () {
        var clickCallbacks = {
            click: this.defaultClick,
            dblclick: this.defaultDblClick
        };
        var clickOptions = OpenLayers.Util.extend({
            "double": true,
            stopDouble: true,
            pixelTolerance: 2
        }, this.clickHandlerOptions);
        this.handlers.click = new OpenLayers.Handler.Click(this, clickCallbacks, clickOptions);
        this.dragPan = new OpenLayers.Control.DragPan(OpenLayers.Util.extend({
            map: this.map,
            documentDrag: this.documentDrag
        }, this.dragPanOptions));
        this.dragPan.draw();
        this.pinchZoom = new OpenLayers.Control.PinchZoom(OpenLayers.Util.extend({
            map: this.map
        }, this.pinchZoomOptions));
    },
    defaultClick: function (evt) {
        if (evt.lastTouches && evt.lastTouches.length == 2) {
            this.map.zoomOut();
        }
    },
    defaultDblClick: function (evt) {
        var newCenter = this.map.getLonLatFromViewPortPx(evt.xy);
        this.map.setCenter(newCenter, this.map.zoom + 1);
    },
    CLASS_NAME: "OpenLayers.Control.TouchNavigation"
});

OpenLayers.Control.OverviewMap = OpenLayers.Class(OpenLayers.Control, {
    element: null,
    ovmap: null,
    size: {
        w: 180,
        h: 90
    },
    layers: null,
    minRectSize: 15,
    minRectDisplayClass: "RectReplacement",
    minRatio: 8,
    maxRatio: 32,
    mapOptions: null,
    autoPan: false,
    handlers: null,
    resolutionFactor: 1,
    maximized: false,
    initialize: function (options) {
        this.layers = [];
        this.handlers = {};
        OpenLayers.Control.prototype.initialize.apply(this, [options]);
    },
    destroy: function () {
        if (!this.mapDiv) {
            return;
        }
        if (this.handlers.click) {
            this.handlers.click.destroy();
        }
        if (this.handlers.drag) {
            this.handlers.drag.destroy();
        }
        this.ovmap && this.ovmap.viewPortDiv.removeChild(this.extentRectangle);
        this.extentRectangle = null;
        if (this.rectEvents) {
            this.rectEvents.destroy();
            this.rectEvents = null;
        }
        if (this.ovmap) {
            this.ovmap.destroy();
            this.ovmap = null;
        }
        this.element.removeChild(this.mapDiv);
        this.mapDiv = null;
        this.div.removeChild(this.element);
        this.element = null;
        if (this.maximizeDiv) {
            this.div.removeChild(this.maximizeDiv);
            this.maximizeDiv = null;
        }
        if (this.minimizeDiv) {
            this.div.removeChild(this.minimizeDiv);
            this.minimizeDiv = null;
        }
        this.map.events.un({
            buttonclick: this.onButtonClick,
            moveend: this.update,
            changebaselayer: this.baseLayerDraw,
            scope: this
        });
        OpenLayers.Control.prototype.destroy.apply(this, arguments);
    },
    draw: function () {
        OpenLayers.Control.prototype.draw.apply(this, arguments);
        if (this.layers.length === 0) {
            if (this.map.baseLayer) {
                var layer = this.map.baseLayer.clone();
                this.layers = [layer];
            } else {
                this.map.events.register("changebaselayer", this, this.baseLayerDraw);
                return this.div;
            }
        }
        this.element = document.createElement('div');
        this.element.className = this.displayClass + 'Element';
        this.element.style.display = 'none';
        this.mapDiv = document.createElement('div');
        this.mapDiv.style.width = this.size.w + 'px';
        this.mapDiv.style.height = this.size.h + 'px';
        this.mapDiv.style.position = 'relative';
        this.mapDiv.style.overflow = 'hidden';
        this.mapDiv.id = OpenLayers.Util.createUniqueID('overviewMap');
        this.extentRectangle = document.createElement('div');
        this.extentRectangle.style.position = 'absolute';
        this.extentRectangle.style.zIndex = 1000;
        this.extentRectangle.className = this.displayClass + 'ExtentRectangle';
        this.element.appendChild(this.mapDiv);
        this.div.appendChild(this.element);
        if (!this.outsideViewport) {
            this.div.className += " " + this.displayClass + 'Container';
            var img = OpenLayers.Util.getImageLocation('layer-switcher-maximize.png');
            this.maximizeDiv = OpenLayers.Util.createAlphaImageDiv(this.displayClass + 'MaximizeButton', null, null, img, 'absolute');
            this.maximizeDiv.style.display = 'none';
            this.maximizeDiv.className = this.displayClass + 'MaximizeButton olButton';
            this.div.appendChild(this.maximizeDiv);
            var img = OpenLayers.Util.getImageLocation('layer-switcher-minimize.png');
            this.minimizeDiv = OpenLayers.Util.createAlphaImageDiv('OpenLayers_Control_minimizeDiv', null, null, img, 'absolute');
            this.minimizeDiv.style.display = 'none';
            this.minimizeDiv.className = this.displayClass + 'MinimizeButton olButton';
            this.div.appendChild(this.minimizeDiv);
            this.minimizeControl();
        } else {
            this.element.style.display = '';
        }
        if (this.map.getExtent()) {
            this.update();
        }
        this.map.events.on({
            buttonclick: this.onButtonClick,
            moveend: this.update,
            scope: this
        });
        if (this.maximized) {
            this.maximizeControl();
        }
        return this.div;
    },
    baseLayerDraw: function () {
        this.draw();
        this.map.events.unregister("changebaselayer", this, this.baseLayerDraw);
    },
    rectDrag: function (px) {
        var deltaX = this.handlers.drag.last.x - px.x;
        var deltaY = this.handlers.drag.last.y - px.y;
        if (deltaX != 0 || deltaY != 0) {
            var rectTop = this.rectPxBounds.top;
            var rectLeft = this.rectPxBounds.left;
            var rectHeight = Math.abs(this.rectPxBounds.getHeight());
            var rectWidth = this.rectPxBounds.getWidth();
            var newTop = Math.max(0, (rectTop - deltaY));
            newTop = Math.min(newTop, this.ovmap.size.h - this.hComp - rectHeight);
            var newLeft = Math.max(0, (rectLeft - deltaX));
            newLeft = Math.min(newLeft, this.ovmap.size.w - this.wComp - rectWidth);
            this.setRectPxBounds(new OpenLayers.Bounds(newLeft, newTop + rectHeight, newLeft + rectWidth, newTop));
        }
    },
    mapDivClick: function (evt) {
        var pxCenter = this.rectPxBounds.getCenterPixel();
        var deltaX = evt.xy.x - pxCenter.x;
        var deltaY = evt.xy.y - pxCenter.y;
        var top = this.rectPxBounds.top;
        var left = this.rectPxBounds.left;
        var height = Math.abs(this.rectPxBounds.getHeight());
        var width = this.rectPxBounds.getWidth();
        var newTop = Math.max(0, (top + deltaY));
        newTop = Math.min(newTop, this.ovmap.size.h - height);
        var newLeft = Math.max(0, (left + deltaX));
        newLeft = Math.min(newLeft, this.ovmap.size.w - width);
        this.setRectPxBounds(new OpenLayers.Bounds(newLeft, newTop + height, newLeft + width, newTop));
        this.updateMapToRect();
    },
    onButtonClick: function (evt) {
        if (evt.buttonElement === this.minimizeDiv) {
            this.minimizeControl();
        } else if (evt.buttonElement === this.maximizeDiv) {
            this.maximizeControl();
        }
    },
    maximizeControl: function (e) {
        this.element.style.display = '';
        this.showToggle(false);
        if (e != null) {
            OpenLayers.Event.stop(e);
        }
    },
    minimizeControl: function (e) {
        this.element.style.display = 'none';
        this.showToggle(true);
        if (e != null) {
            OpenLayers.Event.stop(e);
        }
    },
    showToggle: function (minimize) {
        this.maximizeDiv.style.display = minimize ? '' : 'none';
        this.minimizeDiv.style.display = minimize ? 'none' : '';
    },
    update: function () {
        if (this.ovmap == null) {
            this.createMap();
        }
        if (this.autoPan || !this.isSuitableOverview()) {
            this.updateOverview();
        }
        this.updateRectToMap();
    },
    isSuitableOverview: function () {
        var mapExtent = this.map.getExtent();
        var maxExtent = this.map.maxExtent;
        var testExtent = new OpenLayers.Bounds(Math.max(mapExtent.left, maxExtent.left), Math.max(mapExtent.bottom, maxExtent.bottom), Math.min(mapExtent.right, maxExtent.right), Math.min(mapExtent.top, maxExtent.top));
        if (this.ovmap.getProjection() != this.map.getProjection()) {
            testExtent = testExtent.transform(this.map.getProjectionObject(), this.ovmap.getProjectionObject());
        }
        var resRatio = this.ovmap.getResolution() / this.map.getResolution();
        return ((resRatio > this.minRatio) && (resRatio <= this.maxRatio) && (this.ovmap.getExtent().containsBounds(testExtent)));
    },
    updateOverview: function () {
        var mapRes = this.map.getResolution();
        var targetRes = this.ovmap.getResolution();
        var resRatio = targetRes / mapRes;
        if (resRatio > this.maxRatio) {
            targetRes = this.minRatio * mapRes;
        } else if (resRatio <= this.minRatio) {
            targetRes = this.maxRatio * mapRes;
        }
        var center;
        if (this.ovmap.getProjection() != this.map.getProjection()) {
            center = this.map.center.clone();
            center.transform(this.map.getProjectionObject(), this.ovmap.getProjectionObject());
        } else {
            center = this.map.center;
        }
        this.ovmap.setCenter(center, this.ovmap.getZoomForResolution(targetRes * this.resolutionFactor));
        this.updateRectToMap();
    },
    createMap: function () {
        var options = OpenLayers.Util.extend({
            controls: [],
            maxResolution: 'auto',
            fallThrough: false
        }, this.mapOptions);
        this.ovmap = new OpenLayers.Map(this.mapDiv, options);
        this.ovmap.viewPortDiv.appendChild(this.extentRectangle);
        OpenLayers.Event.stopObserving(window, 'unload', this.ovmap.unloadDestroy);
        this.ovmap.addLayers(this.layers);
        this.ovmap.zoomToMaxExtent();
        this.wComp = parseInt(OpenLayers.Element.getStyle(this.extentRectangle, 'border-left-width')) +
            parseInt(OpenLayers.Element.getStyle(this.extentRectangle, 'border-right-width'));
        this.wComp = (this.wComp) ? this.wComp : 2;
        this.hComp = parseInt(OpenLayers.Element.getStyle(this.extentRectangle, 'border-top-width')) +
            parseInt(OpenLayers.Element.getStyle(this.extentRectangle, 'border-bottom-width'));
        this.hComp = (this.hComp) ? this.hComp : 2;
        this.handlers.drag = new OpenLayers.Handler.Drag(this, {
            move: this.rectDrag,
            done: this.updateMapToRect
        }, {
            map: this.ovmap
        });
        this.handlers.click = new OpenLayers.Handler.Click(this, {
            "click": this.mapDivClick
        }, {
            "single": true,
            "double": false,
            "stopSingle": true,
            "stopDouble": true,
            "pixelTolerance": 1,
            map: this.ovmap
        });
        this.handlers.click.activate();
        this.rectEvents = new OpenLayers.Events(this, this.extentRectangle, null, true);
        this.rectEvents.register("mouseover", this, function (e) {
            if (!this.handlers.drag.active && !this.map.dragging) {
                this.handlers.drag.activate();
            }
        });
        this.rectEvents.register("mouseout", this, function (e) {
            if (!this.handlers.drag.dragging) {
                this.handlers.drag.deactivate();
            }
        });
        if (this.ovmap.getProjection() != this.map.getProjection()) {
            var sourceUnits = this.map.getProjectionObject().getUnits() || this.map.units || this.map.baseLayer.units;
            var targetUnits = this.ovmap.getProjectionObject().getUnits() || this.ovmap.units || this.ovmap.baseLayer.units;
            this.resolutionFactor = sourceUnits && targetUnits ? OpenLayers.INCHES_PER_UNIT[sourceUnits] / OpenLayers.INCHES_PER_UNIT[targetUnits] : 1;
        }
    },
    updateRectToMap: function () {
        var bounds;
        if (this.ovmap.getProjection() != this.map.getProjection()) {
            bounds = this.map.getExtent().transform(this.map.getProjectionObject(), this.ovmap.getProjectionObject());
        } else {
            bounds = this.map.getExtent();
        }
        var pxBounds = this.getRectBoundsFromMapBounds(bounds);
        if (pxBounds) {
            this.setRectPxBounds(pxBounds);
        }
    },
    updateMapToRect: function () {
        var lonLatBounds = this.getMapBoundsFromRectBounds(this.rectPxBounds);
        if (this.ovmap.getProjection() != this.map.getProjection()) {
            lonLatBounds = lonLatBounds.transform(this.ovmap.getProjectionObject(), this.map.getProjectionObject());
        }
        this.map.panTo(lonLatBounds.getCenterLonLat());
    },
    setRectPxBounds: function (pxBounds) {
        var top = Math.max(pxBounds.top, 0);
        var left = Math.max(pxBounds.left, 0);
        var bottom = Math.min(pxBounds.top + Math.abs(pxBounds.getHeight()), this.ovmap.size.h - this.hComp);
        var right = Math.min(pxBounds.left + pxBounds.getWidth(), this.ovmap.size.w - this.wComp);
        var width = Math.max(right - left, 0);
        var height = Math.max(bottom - top, 0);
        if (width < this.minRectSize || height < this.minRectSize) {
            this.extentRectangle.className = this.displayClass +
                this.minRectDisplayClass;
            var rLeft = left + (width / 2) - (this.minRectSize / 2);
            var rTop = top + (height / 2) - (this.minRectSize / 2);
            this.extentRectangle.style.top = Math.round(rTop) + 'px';
            this.extentRectangle.style.left = Math.round(rLeft) + 'px';
            this.extentRectangle.style.height = this.minRectSize + 'px';
            this.extentRectangle.style.width = this.minRectSize + 'px';
        } else {
            this.extentRectangle.className = this.displayClass + 'ExtentRectangle';
            this.extentRectangle.style.top = Math.round(top) + 'px';
            this.extentRectangle.style.left = Math.round(left) + 'px';
            this.extentRectangle.style.height = Math.round(height) + 'px';
            this.extentRectangle.style.width = Math.round(width) + 'px';
        }
        this.rectPxBounds = new OpenLayers.Bounds(Math.round(left), Math.round(bottom), Math.round(right), Math.round(top));
    },
    getRectBoundsFromMapBounds: function (lonLatBounds) {
        var leftBottomPx = this.getOverviewPxFromLonLat({
            lon: lonLatBounds.left,
            lat: lonLatBounds.bottom
        });
        var rightTopPx = this.getOverviewPxFromLonLat({
            lon: lonLatBounds.right,
            lat: lonLatBounds.top
        });
        var bounds = null;
        if (leftBottomPx && rightTopPx) {
            bounds = new OpenLayers.Bounds(leftBottomPx.x, leftBottomPx.y, rightTopPx.x, rightTopPx.y);
        }
        return bounds;
    },
    getMapBoundsFromRectBounds: function (pxBounds) {
        var leftBottomLonLat = this.getLonLatFromOverviewPx({
            x: pxBounds.left,
            y: pxBounds.bottom
        });
        var rightTopLonLat = this.getLonLatFromOverviewPx({
            x: pxBounds.right,
            y: pxBounds.top
        });
        return new OpenLayers.Bounds(leftBottomLonLat.lon, leftBottomLonLat.lat, rightTopLonLat.lon, rightTopLonLat.lat);
    },
    getLonLatFromOverviewPx: function (overviewMapPx) {
        var size = this.ovmap.size;
        var res = this.ovmap.getResolution();
        var center = this.ovmap.getExtent().getCenterLonLat();
        var deltaX = overviewMapPx.x - (size.w / 2);
        var deltaY = overviewMapPx.y - (size.h / 2);
        return {
            lon: center.lon + deltaX * res,
            lat: center.lat - deltaY * res
        };
    },
    getOverviewPxFromLonLat: function (lonlat) {
        var res = this.ovmap.getResolution();
        var extent = this.ovmap.getExtent();
        if (extent) {
            return {
                x: Math.round(1 / res * (lonlat.lon - extent.left)),
                y: Math.round(1 / res * (extent.top - lonlat.lat))
            };
        }
    },
    CLASS_NAME: 'OpenLayers.Control.OverviewMap'
});
OpenLayers.Control.Zoom = OpenLayers.Class(OpenLayers.Control, {
    zoomInText: "+",
    zoomInId: "olZoomInLink",
    zoomOutText: "-",
    zoomOutId: "olZoomOutLink",
    draw: function () {
        var div = OpenLayers.Control.prototype.draw.apply(this),
            links = this.getOrCreateLinks(div),
            zoomIn = links.zoomIn,
            zoomOut = links.zoomOut,
            eventsInstance = this.map.events;
        if (zoomOut.parentNode !== div) {
            eventsInstance = this.events;
            eventsInstance.attachToElement(zoomOut.parentNode);
        }
        eventsInstance.register("buttonclick", this, this.onZoomClick);
        this.zoomInLink = zoomIn;
        this.zoomOutLink = zoomOut;
        return div;
    },
    getOrCreateLinks: function (el) {
        var zoomIn = document.getElementById(this.zoomInId),
            zoomOut = document.getElementById(this.zoomOutId);
        if (!zoomIn) {
            zoomIn = document.createElement("a");
            zoomIn.href = "#zoomIn";
            zoomIn.appendChild(document.createTextNode(this.zoomInText));
            zoomIn.className = "olControlZoomIn";
            el.appendChild(zoomIn);
        }
        OpenLayers.Element.addClass(zoomIn, "olButton");
        if (!zoomOut) {
            zoomOut = document.createElement("a");
            zoomOut.href = "#zoomOut";
            zoomOut.appendChild(document.createTextNode(this.zoomOutText));
            zoomOut.className = "olControlZoomOut";
            el.appendChild(zoomOut);
        }
        OpenLayers.Element.addClass(zoomOut, "olButton");
        return {
            zoomIn: zoomIn,
            zoomOut: zoomOut
        };
    },
    onZoomClick: function (evt) {
        var button = evt.buttonElement;
        if (button === this.zoomInLink) {
            this.map.zoomIn();
        } else if (button === this.zoomOutLink) {
            this.map.zoomOut();
        }
    },
    destroy: function () {
        if (this.map) {
            this.map.events.unregister("buttonclick", this, this.onZoomClick);
        }
        delete this.zoomInLink;
        delete this.zoomOutLink;
        OpenLayers.Control.prototype.destroy.apply(this);
    },
    CLASS_NAME: "OpenLayers.Control.Zoom"
});
OpenLayers.ProxyHost = "";
OpenLayers.Request = {
    DEFAULT_CONFIG: {
        method: "GET",
        url: window.location.href,
        async: true,
        user: undefined,
        password: undefined,
        params: null,
        proxy: OpenLayers.ProxyHost,
        headers: {},
        data: null,
        callback: function () {},
        success: null,
        failure: null,
        scope: null
    },
    URL_SPLIT_REGEX: /([^:]*:)\/\/([^:]*:?[^@]*@)?([^:\/\?]*):?([^\/\?]*)/,
    events: new OpenLayers.Events(this),
    makeSameOrigin: function (url, proxy) {
        var sameOrigin = url.indexOf("http") !== 0;
        var urlParts = !sameOrigin && url.match(this.URL_SPLIT_REGEX);
        if (urlParts) {
            var location = window.location;
            sameOrigin = urlParts[1] == location.protocol && urlParts[3] == location.hostname;
            var uPort = urlParts[4],
                lPort = location.port;
            if (uPort != 80 && uPort != "" || lPort != "80" && lPort != "") {
                sameOrigin = sameOrigin && uPort == lPort;
            }
        }
        if (!sameOrigin) {
            if (proxy) {
                if (typeof proxy == "function") {
                    url = proxy(url);
                } else {
                    url = proxy + encodeURIComponent(url);
                }
            } else {
                OpenLayers.Console.warn(OpenLayers.i18n("proxyNeeded"), {
                    url: url
                });
            }
        }
        return url;
    },
    issue: function (config) {
        var defaultConfig = OpenLayers.Util.extend(this.DEFAULT_CONFIG, {
            proxy: OpenLayers.ProxyHost
        });
        config = OpenLayers.Util.applyDefaults(config, defaultConfig);
        var customRequestedWithHeader = false,
            headerKey;
        for (headerKey in config.headers) {
            if (config.headers.hasOwnProperty(headerKey)) {
                if (headerKey.toLowerCase() === 'x-requested-with') {
                    customRequestedWithHeader = true;
                }
            }
        }
        if (customRequestedWithHeader === false) {
            config.headers['X-Requested-With'] = 'XMLHttpRequest';
        }
        var request = new OpenLayers.Request.XMLHttpRequest();
        var url = OpenLayers.Util.urlAppend(config.url, OpenLayers.Util.getParameterString(config.params || {}));
        url = OpenLayers.Request.makeSameOrigin(url, config.proxy);
        request.open(config.method, url, config.async, config.user, config.password);
        for (var header in config.headers) {
            request.setRequestHeader(header, config.headers[header]);
        }
        var events = this.events;
        var self = this;
        request.onreadystatechange = function () {
            if (request.readyState == OpenLayers.Request.XMLHttpRequest.DONE) {
                var proceed = events.triggerEvent("complete", {
                    request: request,
                    config: config,
                    requestUrl: url
                });
                if (proceed !== false) {
                    self.runCallbacks({
                        request: request,
                        config: config,
                        requestUrl: url
                    });
                }
            }
        };
        if (config.async === false) {
            request.send(config.data);
        } else {
            window.setTimeout(function () {
                if (request.readyState !== 0) {
                    request.send(config.data);
                }
            }, 0);
        }
        return request;
    },
    runCallbacks: function (options) {
        var request = options.request;
        var config = options.config;
        var complete = (config.scope) ? OpenLayers.Function.bind(config.callback, config.scope) : config.callback;
        var success;
        if (config.success) {
            success = (config.scope) ? OpenLayers.Function.bind(config.success, config.scope) : config.success;
        }
        var failure;
        if (config.failure) {
            failure = (config.scope) ? OpenLayers.Function.bind(config.failure, config.scope) : config.failure;
        }
        if (OpenLayers.Util.createUrlObject(config.url).protocol == "file:" && request.responseText) {
            request.status = 200;
        }
        complete(request);
        if (!request.status || (request.status >= 200 && request.status < 300)) {
            this.events.triggerEvent("success", options);
            if (success) {
                success(request);
            }
        }
        if (request.status && (request.status < 200 || request.status >= 300)) {
            this.events.triggerEvent("failure", options);
            if (failure) {
                failure(request);
            }
        }
    },
    GET: function (config) {
        config = OpenLayers.Util.extend(config, {
            method: "GET"
        });
        return OpenLayers.Request.issue(config);
    },
    POST: function (config) {
        config = OpenLayers.Util.extend(config, {
            method: "POST"
        });
        config.headers = config.headers ? config.headers : {};
        if (!("CONTENT-TYPE" in OpenLayers.Util.upperCaseObject(config.headers))) {
            config.headers["Content-Type"] = "application/xml";
        }
        return OpenLayers.Request.issue(config);
    },
    PUT: function (config) {
        config = OpenLayers.Util.extend(config, {
            method: "PUT"
        });
        config.headers = config.headers ? config.headers : {};
        if (!("CONTENT-TYPE" in OpenLayers.Util.upperCaseObject(config.headers))) {
            config.headers["Content-Type"] = "application/xml";
        }
        return OpenLayers.Request.issue(config);
    },
    DELETE: function (config) {
        config = OpenLayers.Util.extend(config, {
            method: "DELETE"
        });
        return OpenLayers.Request.issue(config);
    },
    HEAD: function (config) {
        config = OpenLayers.Util.extend(config, {
            method: "HEAD"
        });
        return OpenLayers.Request.issue(config);
    },
    OPTIONS: function (config) {
        config = OpenLayers.Util.extend(config, {
            method: "OPTIONS"
        });
        return OpenLayers.Request.issue(config);
    }
};
(function () {
    var oXMLHttpRequest = window.XMLHttpRequest;
    var bGecko = !! window.controllers,
        bIE = window.document.all && !window.opera,
        bIE7 = bIE && window.navigator.userAgent.match(/MSIE 7.0/);

    function fXMLHttpRequest() {
        this._object = oXMLHttpRequest && !bIE7 ? new oXMLHttpRequest : new window.ActiveXObject("Microsoft.XMLHTTP");
        this._listeners = [];
    };

    function cXMLHttpRequest() {
        return new fXMLHttpRequest;
    };
    cXMLHttpRequest.prototype = fXMLHttpRequest.prototype;
    if (bGecko && oXMLHttpRequest.wrapped)
        cXMLHttpRequest.wrapped = oXMLHttpRequest.wrapped;
    cXMLHttpRequest.UNSENT = 0;
    cXMLHttpRequest.OPENED = 1;
    cXMLHttpRequest.HEADERS_RECEIVED = 2;
    cXMLHttpRequest.LOADING = 3;
    cXMLHttpRequest.DONE = 4;
    cXMLHttpRequest.prototype.readyState = cXMLHttpRequest.UNSENT;
    cXMLHttpRequest.prototype.responseText = '';
    cXMLHttpRequest.prototype.responseXML = null;
    cXMLHttpRequest.prototype.status = 0;
    cXMLHttpRequest.prototype.statusText = '';
    cXMLHttpRequest.prototype.priority = "NORMAL";
    cXMLHttpRequest.prototype.onreadystatechange = null;
    cXMLHttpRequest.onreadystatechange = null;
    cXMLHttpRequest.onopen = null;
    cXMLHttpRequest.onsend = null;
    cXMLHttpRequest.onabort = null;
    cXMLHttpRequest.prototype.open = function (sMethod, sUrl, bAsync, sUser, sPassword) {
        delete this._headers;
        if (arguments.length < 3)
            bAsync = true;
        this._async = bAsync;
        var oRequest = this,
            nState = this.readyState,
            fOnUnload;
        if (bIE && bAsync) {
            fOnUnload = function () {
                if (nState != cXMLHttpRequest.DONE) {
                    fCleanTransport(oRequest);
                    oRequest.abort();
                }
            };
            window.attachEvent("onunload", fOnUnload);
        }
        if (cXMLHttpRequest.onopen)
            cXMLHttpRequest.onopen.apply(this, arguments);
        if (arguments.length > 4)
            this._object.open(sMethod, sUrl, bAsync, sUser, sPassword);
        else
        if (arguments.length > 3)
            this._object.open(sMethod, sUrl, bAsync, sUser);
        else
            this._object.open(sMethod, sUrl, bAsync);
        this.readyState = cXMLHttpRequest.OPENED;
        fReadyStateChange(this);
        this._object.onreadystatechange = function () {
            if (bGecko && !bAsync)
                return;
            oRequest.readyState = oRequest._object.readyState;
            fSynchronizeValues(oRequest);
            if (oRequest._aborted) {
                oRequest.readyState = cXMLHttpRequest.UNSENT;
                return;
            }
            if (oRequest.readyState == cXMLHttpRequest.DONE) {
                delete oRequest._data;
                fCleanTransport(oRequest);
                if (bIE && bAsync)
                    window.detachEvent("onunload", fOnUnload);
            }
            if (nState != oRequest.readyState)
                fReadyStateChange(oRequest);
            nState = oRequest.readyState;
        }
    };

    function fXMLHttpRequest_send(oRequest) {
        oRequest._object.send(oRequest._data);
        if (bGecko && !oRequest._async) {
            oRequest.readyState = cXMLHttpRequest.OPENED;
            fSynchronizeValues(oRequest);
            while (oRequest.readyState < cXMLHttpRequest.DONE) {
                oRequest.readyState++;
                fReadyStateChange(oRequest);
                if (oRequest._aborted)
                    return;
            }
        }
    };
    cXMLHttpRequest.prototype.send = function (vData) {
        if (cXMLHttpRequest.onsend)
            cXMLHttpRequest.onsend.apply(this, arguments);
        if (!arguments.length)
            vData = null;
        if (vData && vData.nodeType) {
            vData = window.XMLSerializer ? new window.XMLSerializer().serializeToString(vData) : vData.xml;
            if (!this._headers["Content-Type"])
                this._object.setRequestHeader("Content-Type", "application/xml");
        }
        this._data = vData;
        fXMLHttpRequest_send(this);
    };
    cXMLHttpRequest.prototype.abort = function () {
        if (cXMLHttpRequest.onabort)
            cXMLHttpRequest.onabort.apply(this, arguments);
        if (this.readyState > cXMLHttpRequest.UNSENT)
            this._aborted = true;
        this._object.abort();
        fCleanTransport(this);
        this.readyState = cXMLHttpRequest.UNSENT;
        delete this._data;
    };
    cXMLHttpRequest.prototype.getAllResponseHeaders = function () {
        return this._object.getAllResponseHeaders();
    };
    cXMLHttpRequest.prototype.getResponseHeader = function (sName) {
        return this._object.getResponseHeader(sName);
    };
    cXMLHttpRequest.prototype.setRequestHeader = function (sName, sValue) {
        if (!this._headers)
            this._headers = {};
        this._headers[sName] = sValue;
        return this._object.setRequestHeader(sName, sValue);
    };
    cXMLHttpRequest.prototype.addEventListener = function (sName, fHandler, bUseCapture) {
        for (var nIndex = 0, oListener; oListener = this._listeners[nIndex]; nIndex++)
            if (oListener[0] == sName && oListener[1] == fHandler && oListener[2] == bUseCapture)
                return;
        this._listeners.push([sName, fHandler, bUseCapture]);
    };
    cXMLHttpRequest.prototype.removeEventListener = function (sName, fHandler, bUseCapture) {
        for (var nIndex = 0, oListener; oListener = this._listeners[nIndex]; nIndex++)
            if (oListener[0] == sName && oListener[1] == fHandler && oListener[2] == bUseCapture)
                break;
        if (oListener)
            this._listeners.splice(nIndex, 1);
    };
    cXMLHttpRequest.prototype.dispatchEvent = function (oEvent) {
        var oEventPseudo = {
            'type': oEvent.type,
            'target': this,
            'currentTarget': this,
            'eventPhase': 2,
            'bubbles': oEvent.bubbles,
            'cancelable': oEvent.cancelable,
            'timeStamp': oEvent.timeStamp,
            'stopPropagation': function () {},
            'preventDefault': function () {},
            'initEvent': function () {}
        };
        if (oEventPseudo.type == "readystatechange" && this.onreadystatechange)
            (this.onreadystatechange.handleEvent || this.onreadystatechange).apply(this, [oEventPseudo]);
        for (var nIndex = 0, oListener; oListener = this._listeners[nIndex]; nIndex++)
            if (oListener[0] == oEventPseudo.type && !oListener[2])
                (oListener[1].handleEvent || oListener[1]).apply(this, [oEventPseudo]);
    };
    cXMLHttpRequest.prototype.toString = function () {
        return '[' + "object" + ' ' + "XMLHttpRequest" + ']';
    };
    cXMLHttpRequest.toString = function () {
        return '[' + "XMLHttpRequest" + ']';
    };

    function fReadyStateChange(oRequest) {
        if (cXMLHttpRequest.onreadystatechange)
            cXMLHttpRequest.onreadystatechange.apply(oRequest);
        oRequest.dispatchEvent({
            'type': "readystatechange",
            'bubbles': false,
            'cancelable': false,
            'timeStamp': new Date + 0
        });
    };

    function fGetDocument(oRequest) {
        var oDocument = oRequest.responseXML,
            sResponse = oRequest.responseText;
        if (bIE && sResponse && oDocument && !oDocument.documentElement && oRequest.getResponseHeader("Content-Type").match(/[^\/]+\/[^\+]+\+xml/)) {
            oDocument = new window.ActiveXObject("Microsoft.XMLDOM");
            oDocument.async = false;
            oDocument.validateOnParse = false;
            oDocument.loadXML(sResponse);
        }
        if (oDocument)
            if ((bIE && oDocument.parseError != 0) || !oDocument.documentElement || (oDocument.documentElement && oDocument.documentElement.tagName == "parsererror"))
                return null;
        return oDocument;
    };

    function fSynchronizeValues(oRequest) {
        try {
            oRequest.responseText = oRequest._object.responseText;
        } catch (e) {}
        try {
            oRequest.responseXML = fGetDocument(oRequest._object);
        } catch (e) {}
        try {
            oRequest.status = oRequest._object.status;
        } catch (e) {}
        try {
            oRequest.statusText = oRequest._object.statusText;
        } catch (e) {}
    };

    function fCleanTransport(oRequest) {
        oRequest._object.onreadystatechange = new window.Function;
    };
    if (!window.Function.prototype.apply) {
        window.Function.prototype.apply = function (oRequest, oArguments) {
            if (!oArguments)
                oArguments = [];
            oRequest.__func = this;
            oRequest.__func(oArguments[0], oArguments[1], oArguments[2], oArguments[3], oArguments[4]);
            delete oRequest.__func;
        };
    };
    OpenLayers.Request.XMLHttpRequest = cXMLHttpRequest;
})();
OpenLayers.Handler.Keyboard = OpenLayers.Class(OpenLayers.Handler, {
    KEY_EVENTS: ["keydown", "keyup"],
    eventListener: null,
    observeElement: null,
    initialize: function (control, callbacks, options) {
        OpenLayers.Handler.prototype.initialize.apply(this, arguments);
        this.eventListener = OpenLayers.Function.bindAsEventListener(this.handleKeyEvent, this);
    },
    destroy: function () {
        this.deactivate();
        this.eventListener = null;
        OpenLayers.Handler.prototype.destroy.apply(this, arguments);
    },
    activate: function () {
        if (OpenLayers.Handler.prototype.activate.apply(this, arguments)) {
            this.observeElement = this.observeElement || document;
            for (var i = 0, len = this.KEY_EVENTS.length; i < len; i++) {
                OpenLayers.Event.observe(this.observeElement, this.KEY_EVENTS[i], this.eventListener);
            }
            return true;
        } else {
            return false;
        }
    },
    deactivate: function () {
        var deactivated = false;
        if (OpenLayers.Handler.prototype.deactivate.apply(this, arguments)) {
            for (var i = 0, len = this.KEY_EVENTS.length; i < len; i++) {
                OpenLayers.Event.stopObserving(this.observeElement, this.KEY_EVENTS[i], this.eventListener);
            }
            deactivated = true;
        }
        return deactivated;
    },
    handleKeyEvent: function (evt) {
        if (this.checkModifiers(evt)) {
            this.callback(evt.type, [evt]);
        }
    },
    CLASS_NAME: "OpenLayers.Handler.Keyboard"
});
OpenLayers.Control.KeyboardDefaults = OpenLayers.Class(OpenLayers.Control, {
    autoActivate: true,
    slideFactor: 75,
    observeElement: null,
    draw: function () {
        var observeElement = this.observeElement || document;
        this.handler = new OpenLayers.Handler.Keyboard(this, {
            "keydown": this.defaultKeyPress
        }, {
            observeElement: observeElement
        });
    },
    defaultKeyPress: function (evt) {
        var size, handled = true;
        switch (evt.keyCode) {
        case OpenLayers.Event.KEY_LEFT:
            this.map.pan(-this.slideFactor, 0);
            break;
        case OpenLayers.Event.KEY_RIGHT:
            this.map.pan(this.slideFactor, 0);
            break;
        case OpenLayers.Event.KEY_UP:
            this.map.pan(0, -this.slideFactor);
            break;
        case OpenLayers.Event.KEY_DOWN:
            this.map.pan(0, this.slideFactor);
            break;
        case 33:
            size = this.map.getSize();
            this.map.pan(0, -0.75 * size.h);
            break;
        case 34:
            size = this.map.getSize();
            this.map.pan(0, 0.75 * size.h);
            break;
        case 35:
            size = this.map.getSize();
            this.map.pan(0.75 * size.w, 0);
            break;
        case 36:
            size = this.map.getSize();
            this.map.pan(-0.75 * size.w, 0);
            break;
        case 43:
        case 61:
        case 187:
        case 107:
            this.map.zoomIn();
            break;
        case 45:
        case 109:
        case 189:
        case 95:
            this.map.zoomOut();
            break;
        default:
            handled = false;
        }
        if (handled) {
            OpenLayers.Event.stop(evt);
        }
    },
    CLASS_NAME: "OpenLayers.Control.KeyboardDefaults"
});
OpenLayers.Layer.Zoomify = OpenLayers.Class(OpenLayers.Layer.Grid, {
    size: null,
    isBaseLayer: true,
    standardTileSize: 256,
    tileOriginCorner: "tl",
    numberOfTiers: 0,
    tileCountUpToTier: null,
    tierSizeInTiles: null,
    tierImageSize: null,
    initialize: function (name, url, size, options) {
        this.initializeZoomify(size);
        OpenLayers.Layer.Grid.prototype.initialize.apply(this, [name, url, size, {},
            options
        ]);
    },
    initializeZoomify: function (size) {
        var imageSize = size.clone();
        var tiles = new OpenLayers.Size(Math.ceil(imageSize.w / this.standardTileSize), Math.ceil(imageSize.h / this.standardTileSize));
        this.tierSizeInTiles = [tiles];
        this.tierImageSize = [imageSize];
        while (imageSize.w > this.standardTileSize || imageSize.h > this.standardTileSize) {
            imageSize = new OpenLayers.Size(Math.floor(imageSize.w / 2), Math.floor(imageSize.h / 2));
            tiles = new OpenLayers.Size(Math.ceil(imageSize.w / this.standardTileSize), Math.ceil(imageSize.h / this.standardTileSize));
            this.tierSizeInTiles.push(tiles);
            this.tierImageSize.push(imageSize);
        }
        this.tierSizeInTiles.reverse();
        this.tierImageSize.reverse();
        this.numberOfTiers = this.tierSizeInTiles.length;
        this.tileCountUpToTier = [0];
        for (var i = 1; i < this.numberOfTiers; i++) {
            this.tileCountUpToTier.push(this.tierSizeInTiles[i - 1].w * this.tierSizeInTiles[i - 1].h +
                this.tileCountUpToTier[i - 1]);
        }
    },
    destroy: function () {
        OpenLayers.Layer.Grid.prototype.destroy.apply(this, arguments);
        this.tileCountUpToTier.length = 0;
        this.tierSizeInTiles.length = 0;
        this.tierImageSize.length = 0;
    },
    clone: function (obj) {
        if (obj == null) {
            obj = new OpenLayers.Layer.Zoomify(this.name, this.url, this.size, this.options);
        }
        obj = OpenLayers.Layer.Grid.prototype.clone.apply(this, [obj]);
        return obj;
    },
    getURL: function (bounds) {
        bounds = this.adjustBounds(bounds);
        var res = this.map.getResolution();
        var x = Math.round((bounds.left - this.tileOrigin.lon) / (res * this.tileSize.w));
        var y = Math.round((this.tileOrigin.lat - bounds.top) / (res * this.tileSize.h));
        var z = this.map.getZoom();
        var tileIndex = x + y * this.tierSizeInTiles[z].w + this.tileCountUpToTier[z];
        var path = "TileGroup" + Math.floor((tileIndex) / 256) + "/" + z + "-" + x + "-" + y + ".jpg";
        var url = this.url;
        if (OpenLayers.Util.isArray(url)) {
            url = this.selectUrl(path, url);
        }
        return url + path;
    },
    getImageSize: function () {
        if (arguments.length > 0) {
            var bounds = this.adjustBounds(arguments[0]);
            var res = this.map.getResolution();
            var x = Math.round((bounds.left - this.tileOrigin.lon) / (res * this.tileSize.w));
            var y = Math.round((this.tileOrigin.lat - bounds.top) / (res * this.tileSize.h));
            var z = this.map.getZoom();
            var w = this.standardTileSize;
            var h = this.standardTileSize;
            if (x == this.tierSizeInTiles[z].w - 1) {
                var w = this.tierImageSize[z].w % this.standardTileSize;
                if (w == 0) {
                    w = this.standardTileSize;
                }
            }
            if (y == this.tierSizeInTiles[z].h - 1) {
                var h = this.tierImageSize[z].h % this.standardTileSize;
                if (h == 0) {
                    h = this.standardTileSize;
                }
            }
            if (x == this.tierSizeInTiles[z].w) {
                w = Math.ceil(this.size.w / Math.pow(2, this.numberOfTiers - 1 - z) - this.tierImageSize[z].w);
            }
            if (y == this.tierSizeInTiles[z].h) {
                h = Math.ceil(this.size.h / Math.pow(2, this.numberOfTiers - 1 - z) - this.tierImageSize[z].h);
            }
            return (new OpenLayers.Size(w, h));
        } else {
            return this.tileSize;
        }
    },
    setMap: function (map) {
        OpenLayers.Layer.Grid.prototype.setMap.apply(this, arguments);
        this.tileOrigin = new OpenLayers.LonLat(this.map.maxExtent.left, this.map.maxExtent.top);
    },
    calculateGridLayout: function (bounds, origin, resolution) {
        var tilelon = resolution * this.tileSize.w;
        var tilelat = resolution * this.tileSize.h;
        var offsetlon = bounds.left - origin.lon;
        var tilecol = Math.floor(offsetlon / tilelon) - this.buffer;
        var tilecolremain = offsetlon / tilelon - tilecol;
        var tileoffsetx = -tilecolremain * this.tileSize.w;
        var tileoffsetlon = origin.lon + tilecol * tilelon;
        var offsetlat = origin.lat - bounds.top + tilelat;
        var tilerow = Math.floor(offsetlat / tilelat) - this.buffer;
        var tilerowremain = tilerow - offsetlat / tilelat;
        var tileoffsety = tilerowremain * this.tileSize.h;
        var tileoffsetlat = origin.lat - tilelat * tilerow;
        return {
            tilelon: tilelon,
            tilelat: tilelat,
            tileoffsetlon: tileoffsetlon,
            tileoffsetlat: tileoffsetlat,
            tileoffsetx: tileoffsetx,
            tileoffsety: tileoffsety
        };
    },
    CLASS_NAME: "OpenLayers.Layer.Zoomify"
});
//-------- spritespin --------//
(function () {
  var Loader = this.SpriteLoader = {};
  Loader.preload = function(images, callback){
    if (typeof (images) === "string") { images = [images]; }
    var i, data = {
      callback : callback,
      numLoaded: 0,
      numImages: images.length,
      images   : []
    };
    for (i = 0; i < images.length; i += 1 ) {
      Loader.load(images[i], data); 
    }
  };
  Loader.load = function(imageSource, data){
    var image = new Image();
    data.images.push(image);
    image.onload = function(){
      data.numLoaded += 1;
      if (data.numLoaded === data.numImages) { 
        data.callback(data.images); 
      }
    }; 
    image.src = imageSource;
  };
}());
(function($, window) {
  var Spin = window.SpriteSpin = {};
  var api = Spin.api = {};
  Spin.modules = {};
  Spin.behaviors = {};
      
  Spin.disableSelection = function(e){
    e.attr('unselectable', 'on')
     .css({
        "-moz-user-select": "none",
        "-khtml-user-select": "none",
        "-webkit-user-select": "none",
        "user-select": 'none'
     })
     .on('selectstart', false);
    return e;
  };

  Spin.updateInput = function(e, data){
    if (e.touches === undefined && e.originalEvent !== undefined){
      // jQuery Event normalization does not preserve the 'event.touches'
      // try to grab touches from the original event
      e.touches = e.originalEvent.touches;
    }
    
    data.oldX = data.currentX;
    data.oldY = data.currentY;
    
    if (e.touches !== undefined && e.touches.length > 0){
      data.currentX = e.touches[0].clientX;
      data.currentY = e.touches[0].clientY;
    } else {
      data.currentX = e.clientX;
      data.currentY = e.clientY;
    }
    
    if (data.startX === undefined || data.startY === undefined){
      data.startX = data.currentX;
      data.startY = data.currentY;
      data.clickframe = data.frame;
    }
    
    if (data.oldX === undefined || data.oldY === undefined){
      data.oldX = data.currentX;
      data.oldY = data.currentY;
    }
    
    // total drag distance
    data.dX = data.currentX - data.startX;
    data.dY = data.currentY - data.startY;
    data.dW = data.dX * data.dragDirX + data.dY * data.dragDirY;
    
    // frame drag distance
    data.ddX = data.currentX - data.oldX;
    data.ddY = data.currentY - data.oldY;
    data.ddW = data.ddX * data.dragDirX + data.ddY * data.dragDirY;
    
    return false;
  };
  
  Spin.resetInput = function(data){
    // initial touch or click position
    data.startX = undefined;
    data.startY = undefined;
    // touch or click position in current frame
    data.currentX = undefined;
    data.currentY = undefined;
    // touch or click position in last frame
    data.oldX = undefined;
    data.oldY = undefined;
    // total drag distance, respecting the start position
    data.dX = 0;
    data.dY = 0;
    data.dW = 0;
    // total drag distance, respecting the last frame position
    data.ddX = 0;
    data.ddY = 0;
    data.ddW = 0;
    
    if (typeof(data.module.resetInput) === "function"){
      data.module.resetInput(data);
    }
  };
  
  Spin.clamp = function(value, min, max){ 
    return (value > max ? max : (value < min ? min : value));
  };
  
  Spin.wrap = function(value, min, max, size){
    while (value > max){ value -= size; } 
    while (value < min){ value += size; }
    return value;
  };
  
  Spin.reload = function(data, andInit){
    if (andInit && data.module.initialize){
      data.module.initialize(data);
    }
    
    Spin.prepareBackground(data);
    Spin.preloadImages(data, function(){
      Spin.rebindEvents(data);
      data.module.reload(data);
      data.target.trigger("onLoad", data);
    });
  };
  
  Spin.preloadImages = function(data, callback) {
    data.preload.fadeIn(250, function(){
      SpriteLoader.preload(data.source, function(images){
        data.preload.fadeOut(250, function() {
            data.preload.hide();
        });
        data.stage.show();
        if (data.canvas){
          data.canvas.show();
        }
        data.images = images;
        callback.apply(data.target, [data]);
      });
    });
  };
  
  Spin.prepareBackground = function(data){
    var w = [data.width, "px"].join("");
    var h = [data.height, "px"].join("");
    
    data.target.css({ 
      width    : w, 
      height   : h,
      position : "relative"
    });
    
    var css = {
      width    : w, 
      height   : h,
      top      : "0px", 
      left     : "0px",
      position : "absolute"  
    };
    $.extend(css, data.preloadCSS || {});
    data.preload.css(css).html(data.preloadHtml || "").hide();
    
    data.stage.css({
      width    : w, 
      height   : h,
      top      : "0px", 
      left     : "0px",
      position : "absolute"
    }).hide();
    
    if (data.canvas){
      data.canvas[0].width = data.width;
      data.canvas[0].height = data.height;      
      data.canvas.css({
        width    : w, 
        height   : h,
        top      : "0px", 
        left     : "0px",
        position : "absolute"
      }).hide();
    }
  };
  
  Spin.draw = function(data){
    data.module.draw(data);
  };
  
  Spin.rebindEvents = function(data){
    var target = data.target;
    // unbind all events
    target.unbind('.spritespin');
  
    // use custom or build in behavior
    var beh = data.behavior;
    if (typeof(data.behavior) === "string"){
      beh = Spin.behaviors[data.behavior];
    }
    beh = beh || {};
    
    var prevent = function(e){
      if (e.cancelable){ e.preventDefault(); }
      return false;
    };
    
    // rebind interaction events
    target.bind('mousedown.spritespin',  beh.mousedown  || $.noop);
    target.bind('mousemove.spritespin',  beh.mousemove  || $.noop);
    target.bind('mouseup.spritespin',    beh.mouseup    || $.noop);
    target.bind('mouseenter.spritespin', beh.mouseenter || $.noop);
    target.bind('mouseover.spritespin',  beh.mouseover  || $.noop);
    target.bind('mouseleave.spritespin', beh.mouseleave || $.noop);
    target.bind('dblclick.spritespin',   beh.dblclick   || $.noop);
    target.bind('onFrame.spritespin',    beh.onFrame    || $.noop);
  
    if (data.touchable){
      target.bind('touchstart.spritespin',  beh.mousedown  || $.noop);
      target.bind('touchmove.spritespin',   beh.mousemove  || $.noop);
      target.bind('touchend.spritespin',    beh.mouseup    || $.noop); 
      target.bind('touchcancel.spritespin', beh.mouseleave || $.noop);
      target.bind('click.spritespin',         prevent); 
      target.bind('gesturestart.spritespin',  prevent); 
      target.bind('gesturechange.spritespin', prevent); 
      target.bind('gestureend.spritespin',    prevent); 
    }
            
    // disable selection
      target.bind("mousedown.spritespin selectstart.spritespin", prevent);

      target.bind("onFrame.spritespin", function(event, data){
        Spin.draw(data);
      });
      target.bind("onLoad.spritespin", function(event, data){
        data.target.spritespin("animate", data.animate, data.loop);
      });
      
      // bind custom events
      if (typeof(data.onFrame) === "function"){
        target.bind("onFrame.spritespin", data.onFrame);
      }
      if (typeof(data.onLoad) === "function"){
        target.bind("onLoad.spritespin", data.onLoad);
      }
  };
    
  $.fn.spritespin = function(method) {
    if ( api[method] ) {
      return api[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    }
    if (typeof(method) === 'object' || !method) {
      return api.init.apply(this, arguments);
    }
    $.error( 'Method ' +  method + ' does not exist on jQuery.spritespin' );
  };


    api.init = function(options){
    // Default settings
    var settings = {
      // dimensions
      width             : undefined,              // Window width (or frame width)
      height            : undefined,              // Window height (or frame height)
      frames            : 36,                     // Total number of frames
      frame             : 0,                      // Initial frame number
      module            : "360",
      behavior          : "drag",
      // animation & update
      animate           : true,                   // Run animation when after initialize
      loop              : false,                  // Repeat animation in a loop
      loopFrame         : 0,                      // Indicates the loop start frame
      frameStep         : 1,                      // Number of frames to increment on each animation update
      frameTime         : 36,                     // Time between updates
      frameWrap         : true,                   // Same as 'loob' but for user interaction (behavior)
      reverse           : false,                  // If true animation is played backward
      sense             : 1,                      // Interaction sensitivity used by behavior implementations
      orientation       : "horizontal",
      
      // appearance               
      source            : undefined,              // Stiched source image
      preloadHtml       : undefined,              // Html to appear when images are preloaded
      preloadCSS        : undefined,
      
      // events
      onFrame           : undefined,              // Occurs whe frame has been updated
      onLoad            : undefined,              // Occurs when images are loaded
      touchable         : undefined              // Tells spritespin that it is running on a touchable device
    };
    
    // extending options
    options = (options || {});
    $.extend(settings, options);
    
    return this.each(function(){
      var $this = $(this);
      var data  = $this.data('spritespin');
      
      if (!data){
        // spritespin is not initialized
        
        var images = $this.find("img");
        var i = 0;
        if (images.length > 0){
          settings.source = [];
          for(i = 0; i < images.length; i += 1){
            settings.source.push($(images[i]).attr("src"));
          }
        }
        
        if (typeof(settings.source) === "string"){
          settings.source = [settings.source];
        }
        
        // disable selection & hide overflow
        Spin.disableSelection($this).css({ 
          overflow : "hidden", 
          position : "relative"
        });
        
        // build inner html
        $this.empty();
        $this.append($("<div class='spritespin-stage'/>"));
        $this.append($("<div class='spritespin-preload'/>"));
        $this.addClass("spritespin-instance");

        if (settings.enableCanvas){
          var canvas = $("<canvas class='spritespin-canvas'/>")[0];
          var supported = !!(canvas.getContext && canvas.getContext('2d'));
          if (supported){
            settings.canvas = $(canvas);
            settings.context = canvas.getContext("2d");
            $this.append(settings.canvas);
          }
        }

        // resolve module
        if (typeof(settings.module) === "string"){
          settings.module = SpriteSpin.modules[settings.module];
        }
        
        // build data
        settings.target = $this;
        settings.stage = $this.find(".spritespin-stage");
        settings.preload = $this.find(".spritespin-preload");
        settings.animation = null;
        settings.touchable =(settings.touchable || (/iphone|ipod|ipad|android/i).test(window.navigator.userAgent));
        
        $this.data('spritespin', settings);
        SpriteSpin.reload(settings, true);
      } else {
        // spritespin is initialized.
        $.extend(data, options);

        if (options.source){
          // when images are passed, need to reload the plugin
          SpriteSpin.reload(data);
        } else {
          // otherwise just reanimate spritespin
          $this.spritespin("animate", data.animate, data.loop);
        }
      }
    });
  };
  
    api.destroy = function(){
    return this.each(function(){
      var $this = $(this);
      $this.unbind('.spritespin');
      var data = $this.data('spritespin');
      if (data && data.animation){
        window.clearInterval(data.animation);
        data.animation = null;
      }
      $this.removeData('spritespin');
    });
  };

  // Updates a single frame to the specified frame number. If no value is 
  // given this will increment the current frame counter.
  // Triggers the onFrame event
  api.update = function(frame){
    return this.each(function(){
      var $this = $(this);
      var data = $this.data('spritespin');
      
      // update frame counter
      if (frame === undefined){
        data.frame += ((data.animation && data.reverse) ? -data.frameStep : data.frameStep);
      } else {
        data.frame = frame;
      }
      
      // wrap/clamp the frame value to fit in range [0, data.frames]
      if ( data.animation ||                    // wrap frame during animation
          (!data.animation && data.frameWrap)){   // wrap frame during user input 
        data.frame = Spin.wrap(data.frame, 0, data.frames - 1, data.frames);
      } else {
        data.frame = Spin.clamp(data.frame, 0, data.frames - 1);
      }

      // stop animation if the loopFrame is reached
      if (!data.loop && data.animation && (data.frame === data.loopFrame)){
        api.animate.apply(data.target, [false]);
      }
      
      data.target.trigger("onFrame", data);
    });
  };

  // Starts or stops the animation depend on the animate paramter.
  // In case when animation is already running pass "false" to stop.
  // In case when animation is not running pass "true" to start.
  // To keep animation running forever pass "true" for the loop parameter.
  // To detect whether the animation is running or not, do not pass any
  // parameters.
  api.animate = function(animate, loop){
    if (animate === undefined){
      return $(this).data('spritespin').animation !== null;
    } 
    return this.each(function(){
      var $this = $(this);
      var data = $this.data('spritespin');
      
      // check the loop variable and update settings
      if (typeof(loop) === "boolean"){
        data.loop = loop;
      }
      // toggle and update animation settings
      if (animate === "toggle"){
        data.animate = !data.animate;
      }
      //
      if (typeof(animate) === "boolean"){
        data.animate = animate;
      }
      // stop the running animation
      if (data.animation){
        window.clearInterval(data.animation);
        data.animation = null;
      }
      // start animation
      if (data.animate){
        data.animation = window.setInterval(function(){ 
          try { 
            $this.spritespin("update"); 
          } catch(err){
            // The try catch block is a hack for Opera Browser
            // Opera sometimes rises an exception here and
            // stops performing the script
          }
        }, data.frameTime);
      }  
    });
  };

  // Gets the current framenumber when no parameter is passed or
  // updates the spinner to the sepcified frame.
  api.frame = function(frame){
    if (frame === undefined){
      return $(this).data('spritespin').frame;
    }
    return this.each(function(){
      $(this).spritespin("update", frame);
    });        
  };

  // Gets or sets a value indicating whether the animation is looped or not.
  // Starts the animation when settings.animate is set to true passed value
  // is defined
  api.loop = function(value){
    if (value === undefined){
      return $(this).data('spritespin').loop;
    }
    return this.each(function(){
      var $this = $(this);
      $this.spritespin("animate", $this.data('spritespin').animate, value);
    }); 
  };

  api.next = function(){
    return this.each(function(){
      var $this = $(this); $this.spritespin("frame", $this.spritespin("frame") + 1);
    });
  };
  
  api.prev = function(){
    return this.each(function(){
      var $this = $(this); $this.spritespin("frame", $this.spritespin("frame") - 1);
    });
  };
  
  api.animateTo = function(frame){
    return this.each(function(){
      var $this = $(this); $this.spritespin({
        animate : true,
        loop : false,
        loopFrame : frame
      });
    });
  };

  Spin.behaviors.none = {
    name : "none",
    mousedown  : $.noop,
    mousemove  : $.noop,
    mouseup    : $.noop,
    
    mouseenter : $.noop,
    mouseover  : $.noop,
    mouseleave : $.noop,
    dblclick   : $.noop,
    
    onFrame : $.noop
  };
  
}(jQuery, window));
(function($, window, Spin){
  Spin.behaviors.click = {
    name : "click",
    mouseup    : function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      Spin.updateInput(e, data);
      $this.spritespin("animate", false); // stop animation

      var h, p, o = data.target.offset();
      if (data.orientation == "horizontal"){
        h = data.width / 2;
        p = data.currentX - o.left;
      } else {
        h = data.height / 2;
        p = data.currentY - o.top;        
      }
      if (p > h){
        $this.spritespin("frame", data.frame + 1);
        data.reverse = false;
      } else {
        $this.spritespin("frame", data.frame - 1);
        data.reverse = true;
      }
    }
  };
}(jQuery, window, window.SpriteSpin));
(function($, window, Spin){
  Spin.behaviors.drag = {
    name : "drag",
    mousedown  : function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      Spin.updateInput(e, data);
      data.onDrag = true;
    },
    mousemove  : function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      if (data.onDrag){
        Spin.updateInput(e, data);
        
        var d;
        if (data.orientation == "horizontal"){
          d = data.dX / data.width;
        } else {
          d = data.dY / data.height;
        }
      
        var dFrame = d * data.frames * data.sense;
        var frame = Math.round(data.clickframe + dFrame);
        $this.spritespin("update", frame);  // update to frame
        $this.spritespin("animate", false);  // stop animation
      }
    },
    mouseup    : function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      Spin.resetInput(data);
      data.onDrag = false;
    },
    mouseleave : function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      Spin.resetInput(data);
      data.onDrag = false;
    }
  };  
}(jQuery, window, window.SpriteSpin));
(function($, window, Spin){
  Spin.behaviors.hold = {
    name : "hold",
    mousedown  : function(e){
      var $this = $(this), data = $this.data('spritespin');
      Spin.updateInput(e, data);
      data.onDrag = true;
      $this.spritespin("animate", true);
    },
    mousemove  : function(e){
      var $this = $(this), data = $this.data('spritespin');
      
      if (data.onDrag){
        Spin.updateInput(e, data);
        
        var h, d, o = data.target.offset();
        if (data.orientation == "horizontal"){
          h = (data.width / 2);
          d = (data.currentX - o.left - h) / h;
        } else {
          h = (data.height / 2);
          d = (data.currentY - o.top - h) / h;
        }
        data.reverse = d < 0;
        d = d < 0 ? -d : d;
        data.frameTime = 80 * (1 - d) + 20;        
      }
    },
    mouseup    : function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      Spin.resetInput(data);
      data.onDrag = false;
      $this.spritespin("animate", false);
    },
    mouseleave : function(e){
      var $this = $(this), data = $this.data('spritespin');
      Spin.resetInput(data);
      data.onDrag = false;
      $this.spritespin("animate", false);
    },
    onFrame : function(e){
      var $this = $(this);
      $this.spritespin("animate", true);
    }
  };
}(jQuery, window, window.SpriteSpin));
(function($, window, Spin){
  Spin.behaviors.swipe = {
    name : "swipe",
    mousedown  : function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      Spin.updateInput(e, data);
      data.onDrag = true;
    },
    mousemove  : function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      if (data.onDrag){
        Spin.updateInput(e, data);
        
        var frame = data.frame;
        var snap = data.snap || 0.25;
        var d, s;
        
        if (data.orientation == "horizontal"){
          d = data.dX; 
          s = data.width * snap;
        } else {
          d = data.dY; 
          s = data.height * snap;
        }
        
        if (d > s){
          frame = data.frame - 1;       
          data.onDrag = false;
        } else if (d < -s){
          frame = data.frame + 1;
          data.onDrag = false;
        }
        
        $this.spritespin("update", frame);  // update to frame
        $this.spritespin("animate", false); // stop animation
      }
    },
    mouseup    : function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      data.onDrag = false;
      Spin.resetInput(data);
    },
    mouseleave : function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      data.onDrag = false;
      Spin.resetInput(data);
    }
  };  
}(jQuery, window, window.SpriteSpin));
(function($, window) {
  
  var Module = window.SpriteSpin.modules["360"] = {};
  
  Module.reload = function(data){
    var images = $(data.images);

    // clear the stage and refill with images
    data.stage.empty()

    // precalculate and cache options for this module
    data.modopts = {
      is_sprite : (data.images.length == 1),
      resX      : (data.resolutionX || data.images[0].width),
      resY      : (data.resolutionY || data.images[0].height),
      offX      : (data.offsetX || 0),
      offY      : (data.offsetY || 0),
      stepX     : (data.stepX || data.width),
      stepY     : (data.stepY || data.height),
      numFramesX: (data.framesX || data.frames),
      oldFrame  : data.frame,
      images    : images
    };

    if (!data.modopts.is_sprite && !data.canvas){
      data.stage.append(images);
    }

    images.css({
      width: data.modopts.resX,
      height: data.modopts.resY
    });

    Module.draw(data);
  };
  
  Module.draw = function(data){    
    if (data.modopts.is_sprite){
      Module.drawSpritesheet(data);
    } else{
      Module.drawImages(data);
    }
  };

  Module.drawSpritesheet = function(data){
    // Assumes all images are batched in a single sprite image

    var opts = data.modopts;
    var image = data.source[0];
    var frameX = (data.frame % opts.numFramesX);
    var frameY = (data.frame / opts.numFramesX)|0;
    var x = opts.offX + frameX * opts.stepX;
    var y = opts.offY + frameY * opts.stepY;

    if (data.canvas){
      data.context.clearRect(0, 0, data.width, data.height);
      data.context.drawImage(data.images[0], x, y, data.width, data.height, 0, 0, data.width, data.height);
      return;
    }

    data.stage.css({
      width      : [data.width, "px"].join(""),
      height     : [data.height, "px"].join(""),
      "background-image"    : ["url('", image, "')"].join(""),
      "background-repeat"   : "no-repeat",
      "background-position" : [-x, "px ", -y, "px"].join(""),
      // Spritesheets may easily exceed the maximum image size for iphones.
      // In this case the browser will scale down the image automaticly and
      // this will break the logic how spritespin works.
      // Here we set the webkit css attribute to display the background in its
      // original dimension even if it has been scaled down.
      "-webkit-background-size" : [opts.resX, "px ", opts.resY, "px"].join(""),
      "-moz-background-size" : [opts.resX, "px ", opts.resY, "px"].join(""),
      "background-size" : [opts.resX, "px ", opts.resY, "px"].join("")
    }); 
  };

  Module.drawImages = function(data){
    var img = data.images[data.frame];
    if (data.canvas){
      data.context.clearRect(0, 0, data.width, data.height);
      data.context.drawImage(img, 0, 0);
      return;
    }

    var frame = data.stage.css({
      width      : [data.width, "px"].join(""),
      height     : [data.height, "px"].join("")
    }).children().hide()[data.frame];
    SpriteSpin.disableSelection($(frame)).show();
  };

}(window.jQuery, window));
(function($, window) {
  var Module = window.SpriteSpin.modules.gallery = {};
  
  Module.reload = function(data){
    data.images = [];
    data.offsets = [];
    data.stage.empty();
    data.speed = 500;
    data.opacity = 0.25;
    data.oldFrame = 0;
    var size = 0, i = 0;
    for(i = 0; i < data.source.length; i+= 1){
      var img = $("<img src='" + data.source[i] + "'/>");
      data.stage.append(img);
      data.images.push(img);
      data.offsets.push(-size + (data.width - img[0].width) / 2);
      size += img[0].width;
      
      img.css({ opacity : 0.25 });
    }
    data.stage.css({ width : size });
    data.images[data.oldFrame].animate({ opacity : 1 }, data.speed);
  };
  
  Module.draw = function(data){
    if ((data.oldFrame != data.frame) && data.offsets){
      data.stage.stop(true, false);
      data.stage.animate({ 
        "left" : data.offsets[data.frame]
      }, data.speed);
      
      data.images[data.oldFrame].animate({ opacity : data.opacity }, data.speed);
      data.oldFrame = data.frame;
      data.images[data.oldFrame].animate({ opacity : 1 }, data.speed);
    } else {
      //console.log(data.dX);
      data.stage.css({
        "left" : data.offsets[data.frame] + data.dX
      });
    }
  };
  
  Module.resetInput = function(data){
    if (!data.onDrag){
      data.stage.animate({
        "left" : data.offsets[data.frame]
      });
    }
  };
}(jQuery, window));
(function($, window) {  
  var Module = window.SpriteSpin.modules.panorama = {};

  Module.reload = function(data){
    data.stage.empty();             // clear the stage
    var opts = data.modopts = {};   // precalculate and cache options for this module
    opts.resX = (data.resolutionX || data.images[0].width);
    opts.resY = (data.resolutionY || data.images[0].height);
    if (data.orientation == "horizontal"){
      opts.frames = (data.frames || opts.resX);
    } else {
      opts.frames = (data.frames || opts.resY);
    }
    
    Module.drawFirst(data);
  };
  
  // The function was stripped to do only necessary CSS updates
  Module.draw = function(data){      
    var opts = data.modopts;
    var x, y;
       
    if (data.orientation == "horizontal"){
      x = (data.frame % opts.frames);
      y = 0;      
    } else {
      x = 0;
      y = (data.frame % opts.frames);
    }
    data.stage.css({
      "background-position"     : [-x, "px ", -y, "px"].join("")
    });
  };
  
   // Renamed original draw function which is called only once at Load/Reload
  Module.drawFirst = function(data){      
    var opts = data.modopts;
    var x, y;

    if (data.orientation == "horizontal"){
      x = (data.frame % opts.frames);
      y = 0;      
    } else {
      x = 0;
      y = (data.frame % opts.frames);
    }
    data.stage.css({
      width      : [data.width, "px"].join(""),
      height     : [data.height, "px"].join(""),
      "background-image"        : ["url('", data.source[0], "')"].join(""),
      "background-repeat"       : "repeat-both",
      "background-position"     : [-x, "px ", -y, "px"].join(""),
      "-webkit-background-size" : [opts.resX, "px ", opts.resY, "px"].join("")
    });
  };
  
}(window.jQuery, window));
//-------- ngbs --------//
/*global jQuery, window */
(function () {
    "use strict";
    var MessageBus, Widgets, BaseObject, classes, _message_bus;

    BaseObject = function () {};


    function objectify(object_parts, args) {
        args = args || []; // passing undefined to Function.apply will throw an error "Object expected" in IE.
        // this could be a native constructor not a user supplied function
        var obj, part, static_part, Superclass = null;

        if (typeof object_parts === 'function') {
            object_parts = object_parts.apply(null, args);
            if (typeof object_parts !== 'object') {
                return false;
            }
        }

        obj = object_parts.constructor;

        Superclass = object_parts.superclass || BaseObject;
        object_parts.superclass = new Superclass();
        obj.prototype = new Superclass();

        /*jslint forin: true */
        for (part in object_parts) {
            obj.prototype[part] = object_parts[part];
        }

        obj.prototype.constructor = object_parts.constructor; // IE8 doesn't enumerate the constructor property, set it manually
        for (static_part in Superclass) {
            if (!(Superclass.prototype[static_part]) && static_part !== "prototype") {
                obj[static_part] = Superclass[static_part];
            }
        }

        return obj;
    }

    MessageBus = objectify({
        /**
         * @class ngbs._message_bus
         * The message bus is simply a wrapper for jQuery custom events. Using the message bus
         * you can send "messages" back and forth between widgets and views.<br><br>
         * Changes from the current system:<br>
         * - Initialized as a "private" variable, rather than a property of "Widgets"<br><br>
         *
         * This is not accessible outside the ngbs closure.
         * @dependency jQuery
         * @todo figure out a better nomenclature for widgets
         */
        constructor: function () {

            this.is_queueing = false;
            this.message_queue = [];
            this.messages_attached = [];
        },


        /**
         * Pause the queue
         * @private
         */
        pause: function () {
            this.is_queueing = true;
        },

        /**
         * Play the queue
         * @private
         */
        play: function () {
            var i, l, que;
            for (i = 0, l = this.message_queue.length; i < l; i++) {
                que = this.message_queue[i]; // the item in the message queue
                jQuery(que.element).trigger(que.event, [que.data]);
            }

            this.is_queueing = false;
        },

        /**
         * Send an event
         * @param {String|HTMLElement|Object} element Element to send the event to; takes anything accepted by jQuery()
         * @param {String} event The name of the event
         * @param {Object} data Data passed to listener as the second parameter
         */
        send: function (element, event, data) {
            if (this.is_queueing) {
                this.message_queue.push({
                    event: "message-" + event,
                    element: element,
                    data: data || {}
                });
            } else {
                jQuery(element).trigger("message-" + event, [data]);
            }
        },

        /**
         * Listen for an event
         * @param {String|HTMLElement|Object} element Element to send the event to; takes anything accepted by jQuery()
         * @param {String} event The name of the event
         * @param {Function} callback The callback function
         * @param {Boolean} isDelegated Is the listener delegated
         */
        listen : function (elements, event, callback, isDelegated) {
            if (isDelegated) {
                jQuery(document).delegate(elements, "message-" + event, callback);
            } else {
                jQuery(elements).bind("message-" + event, callback);
            }
        },

        /**
         * Remove an event listener
         * @param {String|HTMLElement|Object} element Element to send the event to; takes anything accepted by jQuery()
         * @param {String} event The name of the event
         * @param {Function} callback The callback function
         */
        remove: function (elements, event, callback) {
            if (callback) {
                jQuery(elements).unbind("message-" + event, callback);
            } else {
                jQuery(elements).unbind("message-" + event);
            }
        }
    });

    Widgets = objectify({
        /**
         * @class ngbs
         * Changes from the current system:
         * - .before, .add removed, replaced with .page [for pages] and .widget [for widgets]
         * - jQuery no longer passed as a parameter
         *
         * @dependency jQuery
         */
        constructor: function () {
            this._loaded = false;
            this._widgets = [];

            this._message_bus = _message_bus;

            /**
             * Whether or not we are in debug mode
             * @type Boolean
             */
            this.debug = window._NGBSDEBUG;

            /**
             * create a first-class JavaScript object from an object literal.
             * @method objectify
             *
             * @param {Object} object_parts Either an object literal or a function which returns an object literal
             * the following values have special meaning:
             * <ul><li>constructor: {Function} this is the constructor for the object</li>
             * <li>superclass: {Object} (optional) this is the parent class,
             * if no superclass is provided it defaults to BaseObject</li></ul>
             * @param {Array} args Only used if object_parts is a function which return an object
             * @return {Function} First-class javascript object
             */
            this.objectify = objectify;
        },


        /**
         * Essentially just a page that runs immediately.  Useful for interfacing with legacy code
         * @param {Function} callback Function to execute when this widget is invoked
         */
        legacy: function (callback) {

            this.widget(false, callback, true);

        },

        /**
         * Add a page.  Does the same thing as .widget, except it does not match elements
         * @param {Function} callback Function to execute when this widget is invoked
         * @param {Boolean} immediate Whether to invoke immediately or defer to DOMReady
         */
        page: function (callback, immediate) {

            this.widget(false, callback, immediate);
        },

        /**
         * Add a widget
         * @param {String} name The name of the widget, must not be an integer
         * @param {Function} callback Function to execute when this widget is invoked
         * @param {Boolean} immediate Whether to invoke immediately or defer to DOMReady
         */
        widget: function (name, callback, immediate) {

            if (typeof callback !== "function") {
                callback = this.objectify(callback);
            }

            var index = this._widgets.push({
                callback: callback,
                loaded: false,
                name: name
            });

            if (this._loaded || !!immediate) {
                this.initialize(index - 1, callback);
            }
        },

        /**
         * Intializes a widget or page
         * @param {String|Integer} name The name of a widget or index of a page
         * @private
         */
        initialize: function (index) {

            var $elements, blackhole, widget = this._widgets[index];

            if (widget.name) {
                $elements = jQuery("." + widget.name);
            }

            if (widget.callback.prototype instanceof BaseObject) {
                blackhole = new widget.callback(this._message_bus, $elements);
            } else {
                widget.callback(this._message_bus, $elements);
            }

            blackhole = null;


        },

        /**
         * Runs onDOMReady and intializes pages, then widgets
         * @private
         */
        load: function () {
            var name, i, l;
            this._message_bus.pause();

            for (i = 0, l = this._widgets.length; i < l; i++) {
                if (this._widgets[i].loaded === false) {

                    this.initialize(i);
                    this._widgets[i].loaded = true;
                }
            }

            this._message_bus.play();
            this._loaded = true;
        },


        /**
         * Re-initialize a widget for testing purposes
         * @private
         */
        _reinitialize: function (name) {
            var i, l, $elements, widget, blackhole;

            for (i = 0, l = this._widgets.length; i < l; i++) {
                if (this._widgets[i].name === name) {
                    widget = this._widgets[i];

                    $elements = jQuery("." + widget.name);
                    if (widget.callback.prototype instanceof BaseObject) {
                        blackhole = new widget.callback(this._message_bus, $elements);
                    } else {
                        widget.callback(this._message_bus, $elements);
                    }

                }
            }

        }

    });

    classes = (window.ngbs && window.ngbs._classes) || {};
    _message_bus = new MessageBus();

    window.ngbs = new Widgets();
    window.ngbs.u = {};

    window.ngbs._classes = window.ngbs._classes || classes;
    // for tests, please do not instantiate these on your own. Thanks.
    window.ngbs._classes.Widgets = Widgets;
    window.ngbs._classes.MessageBus = MessageBus;
    window.ngbs._classes.BaseObject = BaseObject;

    jQuery(document).ready(function () {
        if (window.ngbs.metrics) {
            window.ngbs.metrics._load();
        }
        window.ngbs.load();
    });

}());



/*global jQuery, console, ngbs, __params NGBS_002*/
(function (ngbs, jQuery, window) {
    'use strict';

    if (!ngbs.u) {
        return;
    }

    ngbs.u.region = (function () {

        var SERVICES = {
            'fpi' : '/services/geo/PostalCodes.json?postalCode='
            //'locatedealer' : 'http://www.inventory.lincoln.com/dealer/Dealers?&make=Lincoln&zipcode=90210'
            //'locatedealer' : 'dealer/Dealers'
        };

        var Region = function (callback, oldMetrics) {
            this.val = '';
            this.baseURL = __params.baseURL || '';
            this.make = __params.make || '';
            this.zipCode = ngbs.u.cookie.zip();
            this.oldMetrics = (oldMetrics === true) ? true : false;
            this.callback = (callback && typeof (callback) === 'function') ? callback : false;

            this.init();
        };

        Region.prototype = {

            init: function () {
                var regionCookie;
                //console.log(this.zipCode);
                if (this.zipCode === false || (typeof this.zipCode === "undefined")) {
                    this.setDefaultCookie();
                    if (this.callback !== false) {
                        this.callback();
                    }
                    if (this.oldMetrics) {
                        jQuery(document.body).trigger('region-set');
                    }
                    return false;
                }

                regionCookie = ngbs.u.cookie.get('regions');
                if (regionCookie === false) {
                    this.setCookieRegion();
                } else {
                    this.isRegionZipTodate(regionCookie);
                }

            },
            setDefaultCookie: function () {
                var cookieName, value, options;
                cookieName = "regions";
                options = {
                    'domain': document.domain,
                    'expires': '1',
                    'path': '/'
                };
                value = 'zip=00000&FDAF=none&LMDA=none&DMA=none&Marketing=none&PACode=none';
                ngbs.u.cookie.set(cookieName, value, options);
            },
            setCookieRegion: function () {
                var cookieName, value, options,
                    regionData, self;
                self = this;

                cookieName = "regions";
                this.getRegionData(function () {
                    value = self.val;
                    options = {
                        'domain': document.domain,
                        'expires': '1',
                        'path': '/'
                    };
                    ngbs.u.cookie.set(cookieName, value, options);
                    if (self.callback !== false) {
                        self.callback();
                    }
                    if (self.oldMetrics) {
                        jQuery(document.body).trigger('region-set');
                    }
                });
            },

            getRegionData: function (setRegioncallback) {
                var self = this;
                jQuery.ajax({
                    url: this.baseURL + SERVICES.fpi + this.zipCode,
                    dataType: 'json',
                    error: function (xhr, status) {
                        //console.log(status);
                    }
                }).done(function (data) {
                    if (data) {
                        self.val += self.handelData(data.Response);
                    }
                }, function () {
                    self.getLocateDealerData(setRegioncallback);
                }).fail(function () {
                    self.setDefaultCookie();
                    if (self.callback !== false) {
                        self.callback();
                    }
                    if (self.oldMetrics) {
                        jQuery(document.body).trigger('region-set');
                    }
                });
            },

            getLocateDealerData: function (setRegioncallback) {
                var serviceUrl, self;
                self = this;

                //TODO touchpoint
                serviceUrl = this.baseURL + '/core-services/dealers/byzipcode.json?zipCode=' + this.zipCode + '&distance=50&pageSize=1&pageIndex=1';
                jQuery.ajax({
                    url: serviceUrl,
                    dataType: 'json',
                    error: function (xhr, status) {
                        //console.log(status);
                    }
                }).done(function (data) {
                    if (data) {
                        self.val += '&PACode=' + data.Response.Dealer.PACode;
                    }
                }, function () {
                    if (setRegioncallback && typeof (setRegioncallback) === 'function') {
                        setRegioncallback();
                    }
                }).fail(function () {
                    self.setDefaultCookie();
                    if (self.callback !== false) {
                        self.callback();
                    }
                    if (self.oldMetrics) {
                        jQuery(document.body).trigger('region-set');
                    }
                });
            },

            handelData: function (data) {
                var processData = '';
                var oDealer, PACode, encodeUrl;
                var i = 0;
                var aValue = [];
                var zip = 'zip=' + data.PostalCode.Name.content;
                var regions = data.PostalCode.Regions.Region;
                processData += zip;
                if (regions) {
                    jQuery.each(regions, function (k, v) {
                        aValue.push(v.type + '=' + v.Code);
                    });
                    processData += "&" + aValue.join('&');
                }
                return processData;
            },

            isRegionZipTodate: function (regionCookie) {
                var aux, zip;
                aux = regionCookie.split('&', 1).join();
                aux = aux.split('=');
                if (aux[0] === 'zip') {
                    zip = aux[1];
                    //console.log(this.zipCode + '-----' + zip);
                    if (this.zipCode !== zip) {
                        this.setCookieRegion();
                    } else {
                        if (this.callback !== false) {
                            this.callback();
                        }
                        if (this.oldMetrics) {
                            jQuery(document.body).trigger('region-set');
                        }
                    }
                } else {
                    this.setCookieRegion();
                }
            }
        };

        Region.factory = function (callback, oldMetrics) {
            return new Region(callback, oldMetrics);
        };
        return Region.factory;
    }());

}(ngbs, jQuery, window));

//NGBS_007
/*global ngbs, unescape */
(function (ngbs) {
    'use strict';

    /**
     * @class ngbs.u.cookie
     * @singleton
     */
    ngbs.u.cookie = (function () {

        /**
         * Resolves options parameter for set/setSub
         * @private
         */
        var resolveOptions = function (options) {
            var values = [];

            if (typeof options.expires === "number") {
                var ex = new Date();
                ex.setDate(ex.getDate() + options.expires);
                values.push("expires=" + ex.toUTCString());
            }

            if (typeof options.path === "string") {
                values.push("path=" + options.path);
            }

            if (typeof options.domain === "string") {
                values.push("domain=" + options.domain);
            }

            if (typeof options.secure !== 'undefined') {
                values.push("secure");
            }

            return values.length ? '; ' + values.join('; ') : '';

        };

        return {

            /**
             * Gets a cookie
             *
             * @param {String} main The main cookie to check (eg "FPI")
             * @returns {String|Boolean} Returns the cookie if found, false it not found
             * @namespace
             */
            get: function (main) {
                var cookies, i, cookie, key, value, length;

                if (document.cookie.indexOf(main) !== -1) {
                    cookies = document.cookie.split(';');

                    for (i = 0, length = cookies.length; i < length; i++) {
                        cookie = cookies[i].split('=');
                        key = cookie.shift().replace(/^\s*/, '').replace(/\s*$/, '');
                        if (cookie.length && key === main) {
                            return unescape(cookie.join('='));
                        }
                    }
                }
                return false;

            },


            /**
             * Gets a 'sub'-cookie
             *
             * @param {String} main The main cookie to check (eg "FPI")
             * @param {String} sub The sub cookie to return (eg "zip")
             * @param {String} sep Optional, separator the subcookie uses (FPI uses &, userInfo uses ,). Defaults to &
             * @returns {String|Boolean} Returns the cookie if found, false it not found
             */
            getSub: function (main, sub, sep) {
                var cookie, subCookies, subCookie, i, l;

                sep = sep || '&';

                cookie = this.get(main);
                if (cookie) {
                    subCookies = cookie.split(sep);

                    for (i = 0, l = subCookies.length; i < l; i++) {
                        subCookie = subCookies[i].split('=');
                        if (subCookie.length === 2 && subCookie[0] === sub) {
                            return unescape(subCookie[1]);
                        }
                    }
                }
                return false;

            },

            /**
             * Sets a cookie
             * @param {String} cookie The name of the cookie to set
             * @param {String} value The value of the cookie to set
             * @param {Object} options Optional<ul>
             *      <li>domain</li>
             *      <li>expires -  Number of days until the cookie expires (negative numbers are accepted); if falsey, will set a session-cookie</li>
             *      <li>path</li>
             *      <li>secure</li></ul>
             */
            set: function (cookie, value, options) {
                options = options || {};
                options = resolveOptions(options);

                value = encodeURI(value).replace(/;/g, '%3B');
                document.cookie = cookie + "=" + value + options;
            },


            /**
             * Sets a 'sub'-cookie
             * @param {String} cookie The name of the 'main'-cookie to set
             * @param {String} sub The name of the 'sub'-cookie to set
             * @param {String} value The value of the cookie to set
             * @param {Object} options Optional<ul>
             *      <li>domain</li>
             *      <li>expires -  Number of days until the cookie expires (negative numbers are accepted); if falsey, will set a session-cookie</li>
             *      <li>path</li>
             *      <li>secure</li>
             *      <li>separator,sep - Separator character; default is &</li></ul>
             */
            setSub: function (cookie, sub, value, options) {
                options = options || {};
                var ex = new Date(),
                    sep = options.sep || options.separator || '&',
                    old_main = this.get(cookie),
                    old_sub = this.getSub(cookie, sub, sep),
                    encoded = (encodeURI(value).replace(/;/g, '%3B'));

                options = resolveOptions(options);

                if (old_sub) {
                    value = old_main.replace(old_sub, encoded);
                } else {
                    value = old_main + sep + sub + '=' + encoded;
                }
                document.cookie = cookie + "=" + value + options;
            },

            /**
             * Returns the current ZIP code.  First tries FPI (user-set) then tries userInfo (Akamai set QA/Prod only)
             * @param {Boolean} Pass in true to supress zip code from Akamai
             * @returns {String|Boolean} Returns the cookie if found, false it not found
             */
            zip: function (ignoreAkami) {
                var userZip, zip;
                ignoreAkami = ignoreAkami || false;

                zip = this.getSub("FPI", "zip");

                if (!zip && !ignoreAkami) {
                    userZip = this.getSub("userInfo", "zip", ",");
                    zip = (userZip && userZip !== '') ? userZip : false;
                    zip = zip ? zip.substr(0, 5) : zip;
                }

                return zip;
            },
            /**
             * Sets the FPI cookie zip to the provided zipcode
             * @param {Number|String} Value of the new zip
             * @param {Object} Options for the cookie
             * @returns {Boolean} Returns true if provides zip is valid, false otherwise
             * */
            setZip: function (zipCode, options) {
                //Minimal validation. Do not trust this if you absolutely need to be sure the zipcode is valid
                var re = /\d{5}/;
                if (re.test(zipCode)) {
                    this.setSub("FPI", "zip", zipCode, options);
                    return true;
                }
                return false;
            }
        };
    }());

}(ngbs));



//-------- ngbs-overrides --------//
//ngbs-overrides.js

ngbs.metrics = {
    page: function(){return;},
    click: function(){return;},
    _load: function(){return;}
};
//-------- mustangreveal --------//
/*global ngbs, jQuery */
ngbs.page(function (message_bus) {
    'use strict';

    var $ = jQuery, page;

    var S550 = function () {
        this.PREFIX = 's550-';
        this.$container = $('#' + this.PREFIX + 'container');
        this.$sections = this.$container.find('.' + this.PREFIX + 'section');
        this.$nav = this.$container.find('.autofill-stickynav');
        this.$navItems = this.$nav.find('li');
        this.ACT_CLASS = 'active';
        this.HID_CLASS = 'hidden';
        this.firedBuzz = false;
        this.firedSocial = false;

        this.init();
        this.bindHandlers();
    };

    S550.prototype = {
        init: function () {
            this.updateHead();
            this.isMobile = ('ontouchstart' in document.body || 'ontouchstart' in window || 'ontouchstart' in document.documentElement) && ($(window).width() <= 480);
            this.badBrowser = (navigator.appVersion.indexOf("MSIE 9") === -1 && navigator.appVersion.indexOf("MSIE 1") === -1);

            this.configurePictureLoader();
            this.getContentDirection();
            if (!this.badBrowser)
                this.configureCollapser();
            this.configureNav();
            this.configureBillboard();
            this.configureViewpoints();
            this.configureGallerySlider();
            this.configureView360();
            this.configureRevealer();
            this.configureBuzz();
            this.configureSocialFeed();
            !this.isMobile && this.configureParallax();
            this.configureBackToTop();
            message_bus.send(document.body, 's550-metrics', {action: 'page', name: 'mr-page'});
        },

        updateHead: function () {
            var $head = $("head"),
                imageSrc = jQuery(".getupdates-social-list").find('.share-facebook').data('image');
            //$head.append('<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0"/>');
            $head.append('<meta property="og:image" content="' + imageSrc + ' " />');
        },

        bindHandlers: function () {
            var self = this;

            this.$container.on('click', '.feature-buttons', function (e) {
                e.preventDefault();
                if ($(this).hasClass('open') && !$(this).data('opened')) {
                    message_bus.send(document.body, 's550-metrics', {action: 'click', name: 'mr-feature-read-more-interaction', feature: $(this).data('feature-id')});
                    $(this).attr('data-opened', true);
                }
                $(this).toggleClass('open').toggleClass("close").prev('.feature-list').slideToggle();
                GWS && GWS.broadcast('features-button', $(this));
            });

            this.$container.on('click', '#s550-getupdates a', function (e) {
                e.preventDefault();
                if ($(this).data('id')) {
                    GWS && GWS.broadcast('getupdates-' + $(this).data('id'), $(this));
                }
            });

            this.$container.on('click', '.get-updates-link', function () {
                self.configureForm();
                GWS && GWS.broadcast('getupdates-getupdates', $(this));
            });

            this.$container.on('click', 'buzz-item a', function () {
                GWS && GWS.broadcast('carousel-slider-read-article');
            });

            $('.share-btn').on('click', function (e) {
                e.preventDefault();
                self.share($(this));
                var social = $(this).data('id');
                if (social) {
                    if (self.isMobile && social === 'email') {
                        ngbs.metrics.page('mr-share-email-mobile');
                    } else {
                        message_bus.send(document.body, 's550-metrics', {action: 'click', name: 'mr-social-share', social: social});
                    }
                }
            });

            this.$container.on('click', '#s550-buzz-slider .arrow', function () {
                if (!self.firedBuzz) {
                    message_bus.send(document.body, 's550-metrics', {action: 'click', name: 'mr-buzz-news-interaction'});
                    self.firedBuzz = true;
                }
            });

            this.$container.on('click', '#s550-social-slider .arrow', function () {
                if (!self.firedSocial) {
                    message_bus.send(document.body, 's550-metrics', {action: 'click', name: 'mr-buzz-social-interaction'});
                    self.firedSocial = true;
                }
            });

            this.$container.on('click', '.section-collapser', function () {
                var section = $(this).parent().attr('data-title');
                if (!$(this).hasClass('collapsed') && section) {
                    section = section.toLowerCase();
                    ngbs.metrics.page('mr-page-' + section);
                }
            });
        },

        getSections: function () {
            var sections = [],
                name,
                i = 0;

            for (i; i < this.$sections.length; i++) {
                name = $(this.$sections[i]).attr('id').replace(this.PREFIX, '');
                sections.push(name);
            }

            return sections;
        },

        getElement: function (elem) {
            if (this.$container.find(elem).length) {
                return this.$container.find(elem);
            }
            return false;
        },

        getContentDirection: function () {
            if ($('[dir="rtl"]').length) {
                this.direction = 'right';
            } else {
                this.direction = 'left';
            }
        },

        configurePictureLoader: function () {
            var timer, self = this;
            message_bus.send(document.body, 'picture-loader', {
                onInitialized: function () {
                },
                onComplete: function () {
                    $('#s550-features .section-collapser, #s550-buzz .section-collapser').trigger("click");
                },
                onChange: function () {
                    if (!self.badBrowser) {
                        clearTimeout(timer);
                        timer = setTimeout(function () {
                            message_bus.send(document.body, 'parallax-refresh');
                        }, 100);
                    }
                }
            });
        },

        configureNav: function () {
            if (this.$nav.length) {
                message_bus.send(document.body, 'sticky-add', {
                    $el: this.$nav,
                    items: this.getSections(),
                    offset: this.$nav.offset().top
                });
            }
        },

        configureBillboard: function () {
            var $billboard = this.getElement('#s550-billboard-slider'),
                self = this;

            if ($billboard) {
                var $innerAnimation = $billboard.find(".carousel-text");
                message_bus.send(document.body, 'carousel-create', {
                    $el: $billboard,
                    onInitialized: function () {
                        if ($billboard.height() > 0) {
                            self.showSections();
                        } else {
                            window.setTimeout(function () {
                                self.showSections();
                            }, 1000);
                        }
                    },
                    onSlideStart: function (data) {
                        if (data.toPage !== data.currentPage) {
                            $innerAnimation.eq(data.toPage - 1).stop().animate({"margin-left":  (data.currentPage < data.toPage) ? "-100%" : "100%"}, data.speed);
                            $innerAnimation.eq(data.toPage).css({"margin-left": (data.currentPage < data.toPage) ? "100%" : "-100%"})
                        }
                    },
                    onSlideEnd: function (data) {
                        $innerAnimation.eq(data.toPage - 1).css({"margin-left": 0});
                        $innerAnimation.eq(data.toPage).stop().animate({"margin-left": 0}, data.speed / 3);
                    }
                });
            }
        },

        configureViewpoints: function () {
            var self = this,
                section,
                highligtNavigation = {
                    $el: $("#s550-billboard, #s550-gallery, #s550-features, #s550-buzz, #s550-CTA"),
                    offset: this.$nav.outerHeight(),
                    inside: function (context, data) {
                        section = data.$el[0].id.replace('s550-', '');
                        self.$navItems.removeClass(self.ACT_CLASS);
                        self.$navItems.filter('[data-section="' + section + '"]').addClass(self.ACT_CLASS);
                    }
                },
                animate360 = {
                    $el: this.$container.find("#s550-view360"),
                    offset: function () {
                        return $(window).height() - self.$container.find(".view360-player").height()
                    },
                    crossing: function (context, data) {
                        if (data.direction === "down") {
                            if (!self.badBrowser) {
                                self.$container.find(".view360-player").spritespin("animate", true, false);
                                context.active = false;//one animation only
                            }
                        }
                    }
                };
            message_bus.send(document.body, 'viewpoints', highligtNavigation);
            message_bus.send(document.body, 'viewpoints', animate360);

        },

        configureBackToTop: function () {
            var $button = this.getElement('.back-to-top-button');

            if ($button) {
                message_bus.send(document.body, 'back-to-top-config', {
                    $el: $button
                });
            }
        },

        configureGallerySlider: function () {
            var $gallery = this.getElement('.gallery-slider');

            if ($gallery) {
                message_bus.send(document.body, 'gallery-add', {
                    $el: $gallery,
                    arrows: $gallery.data('arrows'),
                    scrollbar: $gallery.data('scrollbar'),
                    direction: this.direction,
                    zoom: !this.isMobile
                });
            }
        },

        configureView360: function () {
            this.$container.find('.feature-list').hide();

            var $view360 = this.$container.find('#s550-view360-view'),
                data = {
                    $el: $view360/*,
                    onFrame: function (e) {
                        console.log(e)
                    }*/
                };
            message_bus.send(document.body, 'view360-apply', data);
        },

        configureRevealer: function () {
            var $revealer = this.getElement('.reveal-slider'),
                $borders;

            if ($revealer) {
                $revealer.find('.scroller-limit').append("<div class='limit-border'/>");
                $borders = $revealer.find(".limit-border");
                message_bus.send(document.body, 'revealer-config', {
                    $el: $revealer,
                    onDrag: function (event) {
                        $borders.eq(0).css({opacity: 1 - (event.value / 100)});
                        $borders.eq(1).css({opacity: event.value / 100});
                    }
                });
            }
        },

        configureBuzz: function () {
            var $buzz = this.getElement('#' + this.PREFIX + 'buzz'),
                padding = 16,
                $carouselItem,
                $buzzItem,
                $itemClone;

            if ($buzz) {
                if (this.isMobile) {
                    $carouselItem = $buzz.find(".carousel-item");
                    $buzzItem = $buzz.find(".buzz-item");

                    $buzz.attr('data-adjustslide', true);

                    $("#s550-buzz-slider").find(".carousel-widget").css({"padding-left": padding})
                    $buzzItem.width($buzz.width() - (padding * 4));

                    $carouselItem.width($buzz.width() - (padding * 2));
                    $carouselItem.last().css({width: $carouselItem.last().width() + (padding * 2) });
                }
                message_bus.send(document.body, 'carousel-create', {
                    $el: $buzz.find("#s550-buzz-slider"),
                    name: 'news'
                });
            }
        },

        configureSocialFeed: function () {
            var i = 0,
                self = this,
                $social = this.getElement("#s550-social-feed");

            if ($social) {
                $social.hide();
                var $carousel = $social.find('.carousel-slider-list');
                $.ajax({
                    url: $social.data("feed-source"),
                    data: {'networks[]': ['facebook', 'twitter']},
                    dataType: 'jsonp'
                }).done(function (response) {
                    var data = self.shuffleArray(response.data);
                    //console.log(data);
                    if (data.length) {
                        $social.show();
                        for (i = 0; i <= 20; i ++) {
                            var item = data[i],
                                text = "",
                                $li = jQuery("<li></li>");
                            $li.addClass('carousel-item');
                            if (item && item.network && (item.message || item.text)) {
                                if (item.network  == "facebook") {
                                    text = item.message.substring(0, 200) + '...';
                                    $li.addClass('fb');
                                } else {
                                    text = item.text;
                                    $li.addClass('tw');
                                }
                                $li.html('<div><span class="social-icon"></span><p>' + text + '</p></div>');
                                $carousel.append($li);
                            }
                        }
                        if (self.isMobile) {
                            $social.find('.carousel-item').width($social.width());
                            $social.find('.carousel-slider').attr('data-adjustslide', true);
                        }
                        message_bus.send(document.body, 'carousel-create', {
                            $el: $social.find("#s550-social-slider"),
                            name: 'social'
                        });
                    }
                });
            }
        },

        share: function ($link) {
            var url = $link.attr('href'),
                location = $link.attr('data-deeplink') || window.location.href;

            if ($link.hasClass('share-twitter') || $link.hasClass('share-google')) {
                url += encodeURIComponent(location);
            }

            if ($link.hasClass('share-twitter')) {
                if ($link.data('text')) {
                    url += '&text=' + $link.data('text');
                }
                if ($link.data('hashtags')) {
                    url += '&hashtags=' + $link.data('hashtags');
                }
            }

            if ($link.hasClass('share-facebook')) {
                if (this.isMobile) {
                    url = url.replace('s=100', 'm2w&s=100');
                }
                url += '&p[url]=' + encodeURIComponent(location) + '&p[title]=' + encodeURIComponent($link.data('title')) + '&p[summary]=' + encodeURIComponent($link.data('summary')) + '&p[images][0]=' + encodeURIComponent($link.data('image'));
            }

            if ($link.hasClass('share-by-email')) {
                if (this.isMobile) {
                    window.location.href = 'mailto:?body=' + encodeURIComponent(($link.data('description') || '') + '\n\n' + location) + '&subject=' + encodeURIComponent($link.data('title')) || '';
                } else {
                    this.openEmailWindow($link.data());
                }
            } else {
                window.open(url);
            }
            return false;
        },

        openEmailWindow: function (data) {
            var width = 715,
                height = 550,
                left = screen.width / 2 - width / 2,
                top = screen.height / 2 - height / 2,
                location = data.deeplink || window.location.href,
                params = {'t' : data.title,
                    'l' : location,
                    'd' : data.description,
                    's' : data.image,
                    'n' : __params.metricsname,
                    'y' : __params.year,
                    'level' : 'asset'},
                params_encoded = ngbs.u.encoder(JSON.stringify(params), "base64").encode().replace(/\=/g, "%3D");

            window.open('/share-email?params=' + params_encoded, '', 'width=' + width + ',height=' + height + ',top=' + top + ',left=' + left + ',location=no,resizable=no,scrollbars=no,toolbar=no');
            //this.metrics.email.share();
            return false;
        },

        shuffleArray: function (arr) {
            for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
            return arr;
        },

        configureParallax: function () {
            var $parallax = this.getElement('.parallax-feature, .reveal-slider-player'),
                $parallaxRevealer = this.getElement('.reveal-slider-player');

            if ($parallax) {
                var obj = {$el: $parallax},
                    data = $.extend(obj, $parallax.data());
                message_bus.send(document.body, 'parallax', data);
            }
        },

        configureCollapser: function () {
            message_bus.send(document.body, 'section-collapser', {$el: this.$sections});
        },

        configureScrolling: function () {
            message_bus.send(document.body, 'smooth-scrolling');
        },

        configureForm: function () {
            var $combo = $('#getupdates-vehicles-select-1');

            if ($combo.length) {
                window.setTimeout(function () {
                    $combo.find('option[data-name="Mustang"]').attr('selected', 'selected');
                }, 100);
            }
        },

        showSections: function ($section) {
            var $sections = $section || this.$sections;
            $sections.removeClass(this.HID_CLASS);
        },

        hideSections: function ($section) {
            var $sections = $section || this.$sections;
            $sections.addClass(this.HID_CLASS);
        }
    };

    message_bus.listen(document.body, 's550-metrics', function (e, data) {
        if (page && page.isMobile) {
            ngbs.metrics[data.action](data.name + '-mobile', data);
        } else {
            ngbs.metrics[data.action](data.name, data);
        }
    });

    message_bus.listen(document.body, 'page-init', function (e, data) {
        page = new S550();
    });

});
//-------- picture-loader --------//
/*global ngbs, jQuery */
ngbs.widget('picture-loader', function (message_bus, $elements) {
    'use strict';

    var $ = jQuery, pictureLoader, firstRound = true, timer;

    function PictureLoader(options) {
        this.$preImages = jQuery(".picture-loader");
        this.mediaCount = this.$preImages.length;
        this.loadedCount = 0;
        this.options = options;
        this.largerWidth = $(window).width();
        this.init();
        this.bindings();

        if (navigator.appName.indexOf("Internet Explorer") !== -1) {
            this.badBrowser = (navigator.appVersion.indexOf("MSIE 9") === -1 && navigator.appVersion.indexOf("MSIE 1") === -1);
        }

        if (typeof options.onInitialized === "function") {
            options.onInitialized();
        }
    }

    PictureLoader.prototype.init = function () {
        this.retina = this.checkPixelRatio();
        this.update();
    };

    PictureLoader.prototype.loadedCheck = function (src, firstTime) {
        var self = this, interval, count;
        $("<img>").on("load", function () {
            self.loadedCount++;
            if (self.mediaCount === self.loadedCount) {
                if (firstTime && typeof self.options.onComplete === 'function') {
                    self.options.onComplete();
                } else if (typeof self.options.onChange === 'function') {
                    self.options.onChange();
                }
            }
        }).attr("src", src);
    };

    PictureLoader.prototype.replaceImage = function ($elem, firstTime) {
        var self = this, $parent = $elem.parent(), finalSrc, classes, alt;

        $parent.find("img").remove();
        classes = $elem.data("class") || "";
        alt = $parent.data("alt") || "";

        if (this.retina && $elem.data("retina")) {
            finalSrc = $elem.data("retina");
        } else {
            finalSrc = $elem.data("src");
        }

        if (firstTime) {
            $elem.html("<img src='" + finalSrc + "' class='" + classes + "' alt='" + alt + "'/>");
        } else {
            $("<img>").on("load", function () {
                $elem.html("<img src='" + finalSrc + "' class='" + classes + "' alt='" + alt + "'/>");
            }).attr("src", finalSrc);
        }
        self.loadedCheck(finalSrc, firstTime);
    };

    PictureLoader.prototype.update = function () {
        var self = this,
            wWidth = $(window).width();
        this.loadedCount = 0;
        this.$preImages.each(function (index, outer) {
            var $preImage = $(outer);
            var generalClasses = $preImage.data("class");
            $preImage.find(".media-selector").each(function (index, inner) {
                var $this = $(inner),
                    minViewport = parseInt($this.data("min-width"), 10) || 0,
                    maxViewport = parseInt($this.data("max-width"), 10) || 9999999999999; //huge screens from the future ;)

                if (wWidth >= minViewport && wWidth <= maxViewport) {
                    if (!firstRound) {
                        if (wWidth < self.largerWidth && $this.data("force-replace")) {
                            self.replaceImage($this, false);
                        } else if (wWidth > self.largerWidth) {
                            self.replaceImage($this, false);
                        }
                    } else {
                        this.largerWidth = minViewport;//setting at the lowest viewport (width config) size of current viewport
                        self.replaceImage($this, true);
                    }
                    return false;
                }
            });
        });
        firstRound = false;
    };

    PictureLoader.prototype.bindings = function () {
        var self = this;
        $(window).on("resize", function () {
            if (!self.badBrowser) {
                clearTimeout(timer);
                setTimeout(function () {
                    self.update();
                }, 1000);
            }
        });
    };

    PictureLoader.prototype.checkPixelRatio = function () {
        var returnValue, mediaQuery = "(-webkit-min-device-pixel-ratio: 2), (min--moz-device-pixel-ratio: 2), (-o-min-device-pixel-ratio: 2/2), (min-resolution: 2dppx)";
        if (window.devicePixelRatio > 1) {
            returnValue = true;
        } else if (window.matchMedia && window.matchMedia(mediaQuery).matches) {
            returnValue = true;
        } else {
            returnValue = false;
        }
        return returnValue;
    };

    message_bus.listen(document.body, 'picture-loader', function (e, data) {
        pictureLoader = new PictureLoader(data);
    });

});
//-------- autofill-stickynav --------//
/*global ngbs, jQuery */
ngbs.widget('autofill-stickynav', function (message_bus, $elements) {
    'use strict';

    var $ = jQuery, sticky;

    function Sticky(config) {
        this.$nav = config.$el;
        this.$content = this.$nav.find('.nav-content');
        this.$items = this.$content.find('li');
        this.offset = config.offset;
        this.items_active = config.items;
        this.duration = config.duration || 500;
        this.CLASS_NAV = 'sticky';
        this.CLASS_ACT = 'active';
        this.CLASS_DIS = 'disabled';

        this.init();
        this.bindHandlers();
    }

    Sticky.prototype = {
        init: function () {
            this.populateNav();
        },

        bindHandlers: function () {
            var self = this;

            this.$content.on('click', 'a', function (e) {
                e.preventDefault();
                var $item = $(this).parent('li');
                GWS && GWS.broadcast('subnav-item', $(this));
                if ($item.data('section')) {
                    $(window).trigger('disableViewPoints');
                    self.toggleActive($item);
                    self.scrollTo($(this).attr('href'));
                }
                if ($item.data('metric')) {
                    message_bus.send(document.body, 's550-metrics', {action: 'click',  name: 'mr-' + $item.data('metric') + '-interaction'});
                }
            });

            $(window).on('scroll', function () {
                if ($(window).scrollTop() >= self.offset) {
                    self.enable();
                } else {
                    self.disable();
                }
                GWS && GWS.broadcast('subnav-scroll');
            });
        },

        populateNav: function () {
            var self = this;

            this.$items.each(function () {
                if ($.inArray($(this).data('section'), self.items_active) > -1 || ($(this).data('show') === true)) {
                    $(this).removeClass(self.CLASS_DIS);
                } else {
                    $(this).remove();
                }
            });
        },

        enable: function () {
            this.$nav.addClass(this.CLASS_NAV);
        },

        disable: function () {
            this.$nav.removeClass(this.CLASS_NAV);
        },

        toggleActive: function ($item) {
            this.$content.find('li').removeClass(this.CLASS_ACT);
            $item.addClass(this.CLASS_ACT);
        },

        scrollTo: function (anchor) {
            var position = $(anchor).offset().top - this.$content.outerHeight() + 1;

            $('html, body').stop().animate({
                scrollTop: position
            }, sticky.duration, function () {
                $(window).trigger('enableViewPoints');
            });
        }

    };

    message_bus.listen(document.body, 'sticky-add', function (e, data) {
        sticky = new Sticky(data);
    });

});

//-------- carousel-slider --------//
/*global ngbs, __params, jQuery */
ngbs.widget("carousel-slider", function (message_bus, $elements) {
    'use strict';
    var $ = jQuery;

    var timerControls, clickEvent = ("ontouchstart" in window) ? "touchstart" : "click";

    function Carousel(options) {
        if (options.$el.hasClass("carousel-enabled")) {
            return;
        }

        this.$el = options.$el;
        this.options = {
            name: options.name,
            selector: ".carousel-item", //jquery string selector for every slide
            initialPage: this.$el.data('initialpage') || 0, // initial page
            showArrows: this.$el.data('arrows') == false ? false : true, // show arrow at the sides of the carousel

            speed: this.$el.data('speed') || 400, // global aniamtion speed
            animate: this.$el.data('animate') == false ? false : true, //apply jquery animations, maybe you want to use CSS3 transitions
            easing: this.$el.data('easing') || "swing",

            autoscroll: this.$el.data('autoscroll') || false, // auto scroll carousel
            autoscrollTime: this.$el.data('autoscrolltime') || 4000, // ms of timeout, slide next page when autoscroll is true
            scrollAmount: this.$el.data('scrollamount') || 0, // not implemented yet :( //0 if you want to scroll page by page else apply continous scrolling, this is the amount of pixesls

            adjustSlide: this.$el.data('adjustslide') == false ? false : true, //adjust slide width to fit container according amount of pages

            forceCarousel: this.$el.data('forcecaruosel') || false, // force carousel even if there is just one slide

            hideControls: this.$el.data('hidecontrols') || false, // hide controls on start
            autoControls: this.$el.data('autocontrols') == false ? false : true, // when hideControls is true, this flag automatically show/hide controls when user mouseover or touches carousel

            cycle: this.$el.data('cycle') == false ? false : true, // when using scrollByPage if the end of carousel is reached, start from the beggining, same backwards :P
            infinite: this.$el.data('infinite') || false, // not implemented yet :(

            /* all callback function returns the instance as the context, please make sure data IS a function */
            onInitialized: options.onInitialized || this.$el.data('oninitialized') || undefined, //callback trggered when successful initialized
            onSlideStart: options.onSlideStart || this.$el.data('onslidestart') || undefined, //callback triggered when starting changing slide (params sent > slide position index)
            onSlideEnd: options.onSlideEnd || this.$el.data('onslideend') || undefined //callback triggered when finishing changing slide (params sent > slide position index)
        };

        this.$disclaimer = options.$disclaimer;
        this.animating = false;
        this.firedSwipe = false;
        this.init();
    }

    Carousel.prototype.getImgsToLoad = function () {
        var $imgs = this.$slides.find('img[data-lazy]');
        this.imgsLoaded = 0;
        return $imgs;
    };

    Carousel.prototype.init = function () {
        var self = this;

        this.$slider = this.$el.find(".carousel-slider-list");
        this.$slides = this.$slider.find(this.options.selector);

        this.imgsToLoad = this.getImgsToLoad();

        this.slidesLength = this.$slides.length;
        if (this.slidesLength === 1 && !this.options.forceCarousel) {//there is just one slide and carousel not forced
            return;
        }

        if (this.imgsToLoad.length) {
            this.imgsToLoad.each(function (i, e) {
                self.loadImg($(e));
            });
        } else {
            this.launchCarousel();
        }
    };

    Carousel.prototype.loadImg = function ($img) {
        var self = this,
            newSrc = $img.data('lazy');

        $('<img>').load(function () {
            $img.attr('src', newSrc);
            self.imgsLoaded++;
            self.checkLoaded();
        }).attr('src', newSrc);
    };

    Carousel.prototype.checkLoaded = function () {
        if (this.imgsLoaded === this.imgsToLoad.length) {
            this.launchCarousel();
        }
    };

    Carousel.prototype.launchCarousel = function () {
        var sliderWidth = 0;

        this.$el.addClass("carousel-enabled");

        this.createControls();

        if (this.options.adjustSlide) {
            sliderWidth = 100 * this.slidesLength + "%";
            this.$slides.addClass("fit-width").css({width: (100 / this.slidesLength).toFixed(2) + "%"});
        } else {
            this.$slider.width('auto');
            this.$slides.each(function (index, elem) {
                sliderWidth += $(this).outerWidth();
            });
            this.totalSlidesWidth = sliderWidth;
            this.trimLeft = this.$slider.outerWidth() - this.totalSlidesWidth;
            sliderWidth += "px";
        }
        this.$slider.css({width: sliderWidth, "height": "auto"});

        //TODO: add function here
        /*blGlobal.utils.disableSelect(this.$navigationArrows);*/
        this.visibleSlides = Math.round(this.$el.outerWidth() / this.$slides.first().outerWidth());
        this.totalPages = Math.ceil(this.$slides.length / this.visibleSlides);

        this.slideTo({to: this.options.initialPage, animate: false});
        if (this.options.autoscroll) {
            this.autoscroll();
        }

        if (this.options.hideControls) {
            this.hideControls();
            if (this.options.autoControls) {
                this.autoControls();
            }
        }

        if ("touchstart" in window || 'ontouchstart' in document.documentElement) {
            this.mobileNavigation();//touch-enabled environment detected, check: doesn't override proto.bindings
        }

        this.bindings();

        if (typeof this.options.onInitialized === "function") {
            this.options.onInitialized.call();
        }

    };

    Carousel.prototype.bindings = function () {
        var self = this;
        this.$navigationButtons.on(clickEvent, function () {
            self.autoscrollPause();
            self.slideTo($(this).index());
            GWS && GWS.broadcast('carousel-slider-bullet');
        });

        this.$navigationArrows.on(clickEvent, function () {
            self.autoscrollPause();
            if ($(this).hasClass("carousel-prev")) {
                self.prev();
            } else {//should be carousel-next
                self.next();
            }
            GWS && GWS.broadcast('carousel-slider-arrow');
        });

        $(window).on("resize", function () {
            self.updateView();
        })

    };

    //TODO: check all this functions, selectors, variables, etc., this needs a lot of work, and should be on bindings !!!
    Carousel.prototype.mobileNavigation = function () {
        var initialX, scrollY, scrollLen, scrollYLen, absScrollLen = 0,
            self = this,
            viewportWidth = $(window).width(),
            minScrollLen = viewportWidth / 6,
            slideWidth = this.$el.find(".carousel-item").width();

        this.$slides.on("touchstart", function (evt) {
            if (evt.touches === undefined && evt.originalEvent !== undefined){
                evt.touches = evt.originalEvent.touches;
            }

            initialX = evt.touches[0].pageX;
            scrollY = evt.touches[0].pageY;
            scrollYLen = 0;
        });

        this.$slides.on("touchmove", function (evt) {
            var isScrolling, delta;
            var event = evt.originalEvent;

            // ensure swiping with one touch and not pinching
            if (event.touches.length > 1 || event.scale && event.scale !== 1) return;

            var touches = event.touches[0];
            // measure change in x and y
            delta = {
                x: touches.pageX - initialX,
                y: touches.pageY - scrollY
            };
            // determine if scrolling test has run - one time test
            if ( typeof isScrolling == 'undefined') {
                isScrolling = !!(isScrolling || Math.abs(delta.x) < Math.abs(delta.y));
            }
            // if user is not trying to scroll vertically
            if (!isScrolling) {
                if (evt.touches === undefined && evt.originalEvent !== undefined){
                    evt.touches = evt.originalEvent.touches;
                }
                scrollLen = -((evt.touches[0].clientX || evt.touches[0].pageX) - initialX);
                absScrollLen = Math.abs(scrollLen);
                if (absScrollLen > 10 && absScrollLen <= 15) {
                    //blGlobal.utils.disableScrolling();
                } else if (absScrollLen > 15) {
                    scrollYLen = (evt.touches[0].clientY || evt.touches[0].pageY) - scrollY;
                    if (delta.x > 0) {
                        if (!self.animating)
                            self.prev();
                    } else if (delta.x < 0) {
                        if (!self.animating)
                            self.next();
                    }
                }
                self.autoscrollPause();
                if (self.options.name && !self.firedSwipe) {
                    ngbs.metrics.click('mr-buzz-' + self.options.name + '-interaction-mobile')
                    self.firedSwipe = true;
                }
            }
        });
    };

    Carousel.prototype.next = function () {
        return this.slideTo(this.currentPage + 1);
    };

    Carousel.prototype.prev = function () {
        return this.slideTo(this.currentPage - 1);
    };

    Carousel.prototype.slideTo = function (options) {
        var self = this, toPage, left, timer;
        this.animating = true;
        if (typeof options === "number") {
            toPage = this.checkRange(options);
        } else if (typeof options === "object") {
            toPage = options.to;
        } else {
            toPage = -1;
        }

        if (toPage === -1) {
            return false;
        }

        this.updateControls(toPage);
        this.$slider.attr("data-page", toPage);


        if (this.options.adjustSlide) {
            left = -100 * toPage + "%";
        } else {
            if (this.options.scrollAmount) {
                left = parseInt(this.$slider.css("margin-left"), 10) - this.options.scrollAmount;
            } else {
                var moveTo = (Math.abs(toPage * this.$slides.width() * this.visibleSlides)) * (-1);
                left = moveTo;
            }

            if (left < this.trimLeft && toPage !== 0) {
                left = this.trimLeft;
                this.currentPage = this.slidesLength - 1;
            }
        }

        (typeof self.options.onSlideStart === "function") && self.options.onSlideStart.call(self, {toPage: toPage, currentPage: self.currentPage, speed: self.options.speed});
        if (this.options.animate) {

            this.$slider.stop().animate({"margin-left": left}, self.options.speed, self.options.easing, function () {
                self.animating = false;
                (typeof self.options.onSlideEnd === "function") && self.options.onSlideEnd.call(self, {toPage: toPage, currentPage: self.currentPage, speed: self.options.speed});
            });
        } else {
            this.$slider.stop().css({"margin-left": left});
            (typeof self.options.onSlideEnd === "function") && self.options.onSlideEnd.call(self, {to: toPage, currentPage: self.currentPage, speed: self.options.speed});
        }
        this.currentPage = toPage;
        return true;
    };

    /* check slides length and current page to avoid going out of bounds */
    Carousel.prototype.checkRange = function (toPage) {
        if (toPage === this.currentPage) {
            return -1;
        } else if (toPage < 0) {
            if (this.options.cycle) {
                return (this.slidesLength - 1);
            } else {
                return 0;
            }
        } else if (toPage > this.slidesLength - 1) {
            if (this.options.cycle) {
                return 0;
            } else {
                return this.slidesLength - 1;
            }
        } else {
            return toPage;
        }
    };

    //TODO: revision to selectors and DOM nodes creation performance
    Carousel.prototype.createControls = function () {
        var bullets = "", i;
        for (i = 0; i < this.slidesLength; i++) {
            bullets += "<li class='carousel-meatball'></li>";
        }
        this.$slider.after("<div class='carousel-text-centered'><ul class='carousel-navigation'>" + bullets + "</ul></div>");
        if (this.options.showArrows) {
            this.$slider.after("<div class='carousel-prev arrow'></div><div class='carousel-next arrow'></div>");
        }

        this.$navigationArrows = this.$el.find(".arrow");
        this.$navigationButtons = this.$el.find(".carousel-meatball");

        if (this.$disclaimer && this.$disclaimer.length) {
            this.$disclaimer.addClass("carousel-disclaimer").appendTo(this.$el);
        }
    };

    Carousel.prototype.showControls = function (options) {
        options = $.extend({}, this.options, options);
        if (options.animate) {
            this.$navigationArrows.fadeIn(options.speed);
            this.$navigationButtons.fadeIn(options.speed);
        } else {
            this.$navigationArrows.show();
            this.$navigationButtons.show();
        }
    };

    Carousel.prototype.hideControls = function (options) {
        options = $.extend({}, this.options, options);
        if (options.animate) {
            this.$navigationArrows.fadeOut(options.speed);
            this.$navigationButtons.fadeOut(options.speed);
        } else {
            this.$navigationArrows.hide();
            this.$navigationButtons.hide();
        }
    };

    /*
        Not touch friendly :(
    */
    Carousel.prototype.autoControls = function () {
        var self = this;
        this.$el.on('mouseenter', function (e) {
            clearTimeout(timerControls);
            timerControls = setTimeout(function () {
                self.showControls();
            }, self.options.speed / 2);
        });

        this.$el.on('mouseleave', function (e) {
            clearTimeout(timerControls);
            timerControls = setTimeout(function () {
                self.hideControls();
            }, self.options.speed / 2);
        });
    };


    //TODO: update function to refresh carousel if new items are found
    Carousel.prototype.updateView = function () {
        if (!this.options.adjustSlide) {
            this.trimLeft = this.$slider.parent().outerWidth() - this.totalSlidesWidth;
        }
    };

    Carousel.prototype.updateControls = function (toPage) {
        /*
            checking if we should show prev/next arrow depending options (cycle, etc.)
        */
        if (this.options.adjustSlide) {
            if (toPage === 0 && !this.options.cycle && !this.options.hideControls) {
                if (this.options.animate) {
                    this.$navigationArrows.eq(0).fadeOut();//prev arrow
                    if (this.slidesLength === 2) {
                        this.$navigationArrows.eq(1).fadeIn()
                    }
                } else {
                    this.$navigationArrows.eq(0).hide();//prev arrow
                    if (this.slidesLength === 2) {
                        this.$navigationArrows.eq(1).show()
                    }
                }
            } else if (toPage === this.slidesLength - 1  && !this.options.cycle && !this.options.hideControls) {
                if (this.options.animate) {
                    this.$navigationArrows.eq(1).fadeOut();//next arrow
                    if (this.slidesLength === 2) {
                        this.$navigationArrows.eq(0).fadeIn()
                    }
                } else {
                    this.$navigationArrows.eq(1).hide();//next arrow
                    if (this.slidesLength === 2) {
                        this.$navigationArrows.eq(0).show()
                    }
                }
            } else if (!this.options.hideControls) {
                if (this.options.animate) {
                    this.$navigationArrows.fadeIn();
                } else {
                    this.$navigationArrows.show();
                }
            }
        } else {
            if (toPage !== 0) {
                if (this.options.animate) {
                    this.$navigationArrows.eq(0).fadeIn();//next arrow
                } else {
                    this.$navigationArrows.eq(0).show();//next arrow
                }
            } else {
                if (this.options.animate) {
                    this.$navigationArrows.eq(0).fadeOut();//next arrow
                } else {
                    this.$navigationArrows.eq(0).hide();//next arrow
                }
            }

            if (toPage !== (this.totalPages - 1)) {
                if (this.options.animate) {
                    this.$navigationArrows.eq(1).fadeIn();//next arrow
                } else {
                    this.$navigationArrows.eq(1).show();//next arrow
                }
            } else {
                if (this.options.animate) {
                    this.$navigationArrows.eq(1).fadeOut();//next arrow
                } else {
                    this.$navigationArrows.eq(1).hide();//next arrow
                }
            }
        }

        /*
            update meatball images on/off
        */
        this.$navigationButtons.removeClass("active").eq(toPage).addClass("active");
    };

    Carousel.prototype.autoscroll = function (interval) {
        var self = this, interval = interval || this.options.autoscrollTime;
        this.timer = setTimeout(function () {
            if (self.next()) {
                self.autoscroll(interval + self.options.speed);
            }
        }, interval);
    };

    Carousel.prototype.autoscrollPause = function () {
        clearTimeout(this.timer);
    };

    /*
        you need to pass $el as a jQuery collection of a UL to apply the carousel or a DIV containing an UL
        message_bus.send(document.body, 'carousel-create', {
            $el: jQuery collection,
            .
            .
            .
            .
        });
    */

    message_bus.listen(document.body, 'carousel-create', function (e, data) {
        var config = {}, i = 0, carousel;
        config = $.extend({}, data);
        data.$el.each(function (index, $el) {
            config.$el = data.$el.eq(index);
            carousel = new Carousel(config);
        });
    });

});
//-------- gallery-slider --------//
/*global ngbs, jQuery */
ngbs.widget("gallery-slider", function (message_bus, $elements) {
    'use strict';

    var $ = jQuery, gallery;

    function GallerySlider(config) {
        this.$gallery = config.$el;
        this.$container = this.$gallery.find('.gallery-container');
        this.$wrapper = this.$container.find('.gallery-wrapper');
        this.$photos = this.$wrapper.find('.gallery-photo');
        this.$scrollbar = this.$container.find('.gallery-scroller');
        this.$arrows = this.$container.find('.arrow');
        if (this.$scrollbar.length) {
            this.$wheel = this.$scrollbar.find('.wheel');
        }
        this.zoomEnabled = config.zoom;
        this.firedScroll = false;
        this.firedFull = false;
        this.ACT_CLASS = 'active';
        this.DIS_CLASS = 'disabled';

        if (navigator.appName.indexOf("Internet Explorer") !== -1) {
            this.badBrowser = (navigator.appVersion.indexOf("MSIE 9") === -1 && navigator.appVersion.indexOf("MSIE 1") === -1);
        }

        this.touchSupport = 'ontouchstart' in document.body;
        this.animating = false;
        this.init();
    }

    GallerySlider.prototype = {
        init: function () {
            var self = this;

            this.buildImgs();

            this.imgsToLoad = this.getImgsToLoad();

            if (this.imgsToLoad.length) {
                this.imgsToLoad.each(function (i, e) {
                    self.loadImg($(e));
                });
            } else {
                this.launch();
            }

            if (this.touchSupport) {
                this.addSwipeSupport();
            }
        },

        buildImgs: function () {
            this.$photos.each(function (index, elem) {
                var $this = $(elem),
                    wWidth = $(window).width(),
                    $input = $this.find("input[type='hidden']"),
                    src = "",
                    width = 0;
                $this.find("img").remove();
                if (wWidth <= 568) {
                    src = $input.data("small") || $input.data("medium") || $input.data("large");
                } else if (wWidth > 568 && wWidth <= 768) {
                    src = $input.data("medium") || $input.data("large");
                } else if (wWidth > 768) {
                    src = $input.data("large");
                }
                $this.append("<img src='" + src + "' >");
            });
        },

        getImgsToLoad: function () {
            var $imgs = this.$photos.find('img[data-lazy]');
            this.imgsLoaded = 0;
            return $imgs;
        },

        loadImg: function ($img) {
            var self = this,
                newSrc = $img.data('lazy');

            $('<img>').load(function () {
                $img.attr('src',  newSrc);
                self.imgsLoaded++;
                self.checkLoaded();
            }).attr('src', newSrc);
        },

        checkLoaded: function () {
            var self = this;
            if (this.imgsLoaded === this.imgsToLoad.length) {
                window.setTimeout(function () {
                    self.launch();
                }, 1000);
            }
        },

        launch: function () {
            this.$gallery.addClass('gallery-enabled');
            this.configureWrapper();
            this.checkArrows();
            this.setHandlers();
        },

        setHandlers: function () {
            var self = this;

            this.$container.on('click', '.gallery-scroller', function (e) {
                if (!$(e.target).is(self.$wheel)) {
                    var shift = self.calculateShift(e.clientX);
                    self.moveTo(self.$wrapper, -shift.wrapper, true);
                    self.moveTo(self.$wheel, shift.scroller, true);
                    if (!self.firedScroll) {
                        message_bus.send(document.body, 's550-metrics', {action: 'click', name: 'mr-gallery-scroll-interaction'});
                        self.firedScroll = true;
                    }
                    GWS && GWS.broadcast('gallery-slider-scroll-click');
                }
            });

            this.$container.on('mousedown', '.wheel', '.gallery-scroller', function (e) {
                e.preventDefault();
                self.isMouseDown = true;
                self.configureDrag(e);
                GWS && GWS.broadcast('gallery-slider-scroll-mousedown');
            });

            this.$container.on('click', '.arrow', function () {
                var position = $(this).hasClass('prev') ? -1 : 1;
                self.handleArrows(position);
                if (!self.firedScroll) {
                    message_bus.send(document.body, 's550-metrics', {action: 'click', name: 'mr-gallery-scroll-interaction'});
                    self.firedScroll = true;
                }
                GWS && GWS.broadcast('gallery-slider-arrow');
            });

            // Clear touch events from arrows so it doesn't collapse
            // with swipe functionality
            this.$container.on("touchstart", '.arrow', function (e) {
                e.preventDefault();
                var position = $(this).hasClass('prev') ? -1 : 1;
                self.handleArrows(position);
                if (!self.firedScroll) {
                    ngbs.metrics.click('mr-gallery-scroll-interaction-mobile')
                    self.firedScroll = true;
                }
                GWS && GWS.broadcast('gallery-slider-arrow');
                e.stopPropagation();
            });
            this.$container.on("touchmove", '.arrow', function (e) {
                e.preventDefault();
                e.stopPropagation();
            });
            this.$container.on("touchend", '.arrow', function (e) {
                e.preventDefault();
                e.stopPropagation();
            });

            $('body, html').on('mousemove', function (e) {
                if (e.which === 1 && self.isMouseDown) {
                    self.configureDrag(e);
                    if (!self.firedScroll) {
                        message_bus.send(document.body, 's550-metrics', {action: 'click', name: 'mr-gallery-scroll-interaction'});
                        self.firedScroll = true;
                    }
                    GWS && GWS.broadcast('gallery-slider-scroll-mousemove');
                }
            });

            $('body, html').on('mouseup', function () {
                if (self.isMouseDown) {
                    self.isMouseDown = false;
                    GWS && GWS.broadcast('gallery-slider-scroll-mouseup');
                }
            });

            this.$container.on('click', '.zoomable', function (e) {
                e.stopPropagation();

                if (self.zoomEnabled) {
                    self.fireZoom($(this));
                    if (!self.firedFull) {
                        message_bus.send(document.body, 's550-metrics', {action: 'click', name: 'mr-gallery-full-interaction'});
                        self.firedFull = true;
                    }
                    GWS && GWS.broadcast('gallery-slider-image', $(this));
                }
            });

            $(window).on("resize", function () {
                if (!self.badBrowser) {
                    self.buildImgs();
                    self.configureWrapper();
                }
            })

        },

        checkArrows: function () {
            if (this.$arrows) {
                this.$arrows.removeClass(this.DIS_CLASS);
                if (this.$wrapper.position().left === 0) {
                    this.$arrows.filter('.prev').addClass(this.DIS_CLASS);
                } else if (this.$wrapper.position().left - this.$container.outerWidth() + this.$wrapper.outerWidth() === 0) {
                    this.$arrows.filter('.next').addClass(this.DIS_CLASS);
                }
            }
        },

        configureWrapper: function () {
            var self = this,
                wrapper_width = 0,
                totalImgs = this.$photos.length,
                loaded = 0,
                timer,
                $img,
                width;

            this.$photos.each(function (index, elem) {
                $("<img/>").on("load", function () {
                    loaded++;
                }).attr("src", $(this).find("img").attr("src"));
            });

            timer = setInterval(function () {
                if (totalImgs === loaded) {
                    clearTimeout(timer);
                    self.$photos.each(function () {
                        var $photo = $(this),
                            $img = $photo.find('img');

                        //Fix problem with ie7 width calculations
                        if (self.badBrowser) {
                            wrapper_width += $img.outerWidth();
                        } else {
                            wrapper_width += $photo.outerWidth();
                            $img.css('width', $photo.outerWidth());
                        }
                    });
                    if (wrapper_width > 0)
                       self.$wrapper.width(wrapper_width + 1);

                    if (self.zoomEnabled) {
                        self.checkDeepLink();
                    }
                }
            }, 100);
        },

        configureDrag: function (e) {
            var offset = e.clientX,
                left = this.$wheel.offset().left,
                left_end,
                shift = {};

            switch (e.type) {
            case 'mousedown':
                this.wheel_left_ini = offset;
                this.wheel_left_end = null;
                break;
            case 'mousemove':
                this.wheel_left_end = offset;
                break;
            }

            if (this.wheel_left_end) {
                shift = this.calculateShift(this.wheel_left_end);
                this.moveTo(this.$wrapper, -shift.wrapper);
                this.moveTo(this.$wheel, shift.scroller);
            }
        },

        handleArrows: function (position) {
            var $active = this.$photos.filter('.' + this.ACT_CLASS),
                left = $active.position().left,
                width = $active.outerWidth(),
                wrapper_offset,
                scrollbar_offset;
            if (!this.animating) {
                this.animating = true;
                switch (position) {
                case -1:
                    if (this.$wrapper.position().left !== -left) {
                        wrapper_offset = left;
                    } else {
                        wrapper_offset = $active.prev('.gallery-photo').position().left;
                    }
                    break;
                case 1:
                    wrapper_offset = left + $active.outerWidth();
                    break;
                }

                if (-wrapper_offset <= -(this.$wrapper.outerWidth() - this.$container.outerWidth())) {
                    wrapper_offset = this.$wrapper.outerWidth() - this.$container.outerWidth();
                }

                this.moveTo(this.$wrapper, -wrapper_offset, true);

                if (this.$wheel) {
                    scrollbar_offset = wrapper_offset / (this.$wrapper.outerWidth() - this.$container.outerWidth()) * (this.$scrollbar.outerWidth() - this.$wheel.outerWidth());
                    this.moveTo(this.$wheel, scrollbar_offset, true);
                }
            }
        },

        calculateShift: function (x) {
            var scrollbar_width = this.$scrollbar.outerWidth(),
                wheel_width = this.$wheel.outerWidth(),
                wheel_axis = wheel_width / 2,
                scrollbar_left = x + wheel_axis >= scrollbar_width ? scrollbar_width - wheel_width
                                : x - wheel_axis <= 0 ? 0
                                : x - wheel_axis,
                wrapper_left = (this.$wrapper.outerWidth() - this.$container.outerWidth()) * scrollbar_left / (scrollbar_width - wheel_width);

            return {wrapper: wrapper_left, scroller: scrollbar_left};
        },

        moveTo: function ($elem, offset, animate) {
            var self = this;

            if (animate) {
                $elem.animate({left: offset}, 500, function () {self.callback(); self.animating = false; });
            } else {
                $elem.css('left', offset);
                this.callback();
            }
        },

        callback: function () {
            this.toggleActive();
            this.checkArrows();
        },

        toggleActive: function () {
            var self = this;

            this.$photos.removeClass(this.ACT_CLASS);
            this.$photos.each(function () {
                if (self.$wrapper.position().left <= -$(this).position().left && self.$wrapper.position().left > -$(this).position().left - $(this).outerWidth()) {
                    $($(this)[0]).addClass(self.ACT_CLASS);
                    return;
                }
            });
        },

        addSwipeSupport: function () {
            var initialX, scrollY, scrollLen, scrollYLen, absScrollLen = 0,
                self = this,
                viewportWidth = $(window).width(),
                minScrollLen = viewportWidth / 6;

            this.$gallery.on("touchstart", function (event) {
                var evt = event.originalEvent;
                initialX = evt.touches[0].pageX;
                scrollY = evt.touches[0].pageY;
                scrollYLen = 0;
            });

            this.$gallery.on("touchmove", function (evt) {
                var isScrolling, delta, position;
                var event = evt.originalEvent;

                // ensure swiping with one touch and not pinching
                if (event.touches.length > 1 || event.scale && event.scale !== 1) return;

                var touches = event.touches[0];
                // measure change in x and y
                delta = {
                    x: touches.pageX - initialX,
                    y: touches.pageY - scrollY
                };
                // determine if scrolling test has run - one time test
                if ( typeof isScrolling == 'undefined') {
                    isScrolling = !!(isScrolling || Math.abs(delta.x) < Math.abs(delta.y));
                }
                // if user is not trying to scroll vertically
                if (!isScrolling) {
                    if (evt.touches === undefined && evt.originalEvent !== undefined){
                        evt.touches = evt.originalEvent.touches;
                    }
                    scrollLen = -((evt.touches[0].clientX || evt.touches[0].pageX) - initialX);
                    absScrollLen = Math.abs(scrollLen);
                    if (absScrollLen > 10 && absScrollLen <= 15) {
                        //blGlobal.utils.disableScrolling();
                    } else if (absScrollLen > 15) {
                        scrollYLen = (evt.touches[0].clientY || evt.touches[0].pageY) - scrollY;
                        if (delta.x > 0) {
                            if (!self.animating)
                                position = -1;
                        } else if (delta.x < 0) {
                            if (!self.animating)
                                position = 1;
                        }
                        self.handleArrows(position);
                        if (!self.firedScroll) {
                            ngbs.metrics.click('mr-gallery-scroll-interaction-mobile')
                            self.firedScroll = true;
                        }
                    }
                }
            });
        },

        checkDeepLink: function () {
            /*jslint regexp: true */
            var url_parts = this.checkRegex(),
                self = this;

            if (url_parts) {
                var photo = url_parts[4].indexOf('&') > -1 ? url_parts[4].split('&')[0] : url_parts[4];
                this.$photos.each(function () {
                    if (photo === $(this).data('name')) {
                        self.fireZoom($(this), window.location.href);
                        return false;
                    }
                });
            }
        },

        checkRegex: function () {
            var regex = /(\?|\&)(gallery)(\=)(.*)/;
            return window.location.href.match(regex);
        },

        constructDeepLink: function (name) {
            var url_parts = this.checkRegex(),
                href = window.location.href,
                deeplink,
                param;

            if (url_parts) {
                var target = url_parts[4].indexOf('&') > -1 ? url_parts[4].split('&')[0] : url_parts[4];
                deeplink = href.replace(target, name);
            } else {
                param = href.indexOf('?') > -1 ? '&' : '?';
                deeplink = href + param + 'gallery=' + name;
            }
            return deeplink;
        },

        fireZoom: function ($selected, deeplink) {
            message_bus.send(document.body, 'zoom-open', {
                $el: $selected,
                config: $.extend($selected.data(), {deeplink: deeplink || this.constructDeepLink($selected.data('name'))})
            });
        }
    };

    message_bus.listen(document.body, 'gallery-add', function (e, data) {
        gallery = new GallerySlider(data);
    });

    message_bus.listen(document.body, 'zoom-deeplink', function (e, data) {
        gallery.fireZoom(data.$el);
    });

});

//-------- zoom-fullscreen --------//
/*global ngbs, jQuery, OpenLayers, GWS */
ngbs.widget('zoom-fullscreen', function (message_bus, $elements) {
    'use strict';
    var $ = jQuery, Zoom;

    function ZoomFullscreen() {
        this.$container = $('.zoom-fullscreen');
        this.$controls = this.$container.find('.zoom-controlbar');
        this.in_place = false;
        this.firedZoom = false;
        this.ACT_CLASS = 'active';
        this.DIS_CLASS = 'disabled';
    }

    ZoomFullscreen.prototype = {
        init: function (data) {
            this.$selected = data.$el;
            this.config = data.config;
            this.$controls.find('li').first().addClass('first');

            if (!this.in_place) {
                this.$container.prependTo('body');
                this.in_place = true;
            }

            if (this.$controls.find('.save').length) {
                this.configureSave();
            }

            if (this.$controls.find('.share-btn').length) {
                this.configureShare();
            }

            this.configureZoom();
            this.bindHandlers();
        },

        bindHandlers: function () {
            var self = this;

            this.$container.on('click', '.zoom-arrow', function () {
                if (!$(this).hasClass(self.DIS_CLASS)) {
                    if ($(this).hasClass('prev')) {
                        self.$selected = self.$selected.prev();
                    } else {
                        self.$selected = self.$selected.next();
                    }
                    self.destroy();
                    message_bus.send(document.body, 'zoom-deeplink', {$el: self.$selected});
                    GWS && GWS.broadcast('zoom-fullscreen-arrow');
                }
            });

            this.$container.on('click', '.zoom-close', function () {
                self.close();
                GWS && GWS.broadcast('zoom-fullscreen-close');
            });

            this.$controls.on('click', '.save', function () {
                GWS && GWS.broadcast('zoom-fullscreen-save');
            });

            this.$controls.on('click', '.share', function () {
                $(this).find('.share-popup').toggleClass(self.ACT_CLASS);
                GWS && GWS.broadcast('zoom-fullscreen-share');
            });
        },

        configureSave: function () {
            var href = this.config.src,
                dwld = this.config.name ? '=' + this.config.name : '';

            this.$controls.find('.save').html('<a href="' + href + '" download' + dwld + ' target="_blank"></a>');
        },

        configureShare: function () {
            this.$controls.find('.share-btn').attr('data-deeplink', this.config.deeplink);
        },

        configureZoom: function () {
            var zoomify,
                width = this.config.width || 5000,
                height = this.config.height || 2300,
                url = this.config.tilespath,
                options,
                image,
                resolutions = [],
                overviewOptions,
                overview,
                zoom,
                zoomW,
                zoomMin,
                i;

            this.open();

            zoomify = new OpenLayers.Layer.Zoomify('Zoomify', url, new OpenLayers.Size(width, height));
            zoomify.transitionEffect = 'resize';
            zoomify.isBaseLayer = false;

            for (i = zoomify.numberOfTiers - 1; i >= 0; i--) {
                resolutions.push(Math.pow(2, i));
            }

            image = new OpenLayers.Layer.Image('Image', url + 'TileGroup0/0-0-0.jpg', new OpenLayers.Bounds(0, 0, width, height), zoomify.tierImageSize[0], {
                alwaysInRange: true
            });

            options = {
                resolutions: resolutions,
                maxExtent: new OpenLayers.Bounds(0, 0, width, height),
                restrictedExtent: new OpenLayers.Bounds(0, 0, width, height),
                numZoomLevels: zoomify.numberOfTiers,
                units: 'pixels',
                controls: [],
                theme: null
            };

            this.map = new OpenLayers.Map('zoom-flip-map', options);

            // add layers
            this.map.addLayer(zoomify);
            this.map.addLayer(image);

            // add controls
            this.map.addControl(new OpenLayers.Control.Zoom({
                zoomInId: 'zoomin',
                zoomOutId: 'zoomout'
            }));
            this.map.addControl(new OpenLayers.Control.KeyboardDefaults());
            this.map.addControl(new OpenLayers.Control.Navigation({
                mouseWheelOptions: {
                    cumulative: false,
                    interval: 0
                },
                dragPanOptions: {
                    enableKinetic: false
                },
                zoomBoxEnabled: false,
                zoomWheelEnabled: true
            }));

            // overview map
            if (this.$container.find('#zoom-overviewmap').length) {
                overviewOptions = {
                    div: document.getElementById('zoom-overviewmap'),
                    size: zoomify.tierImageSize[0],
                    autoPan: false,
                    mapOptions: {
                        numZoomLevels: 1
                    }
                };
                overview = new OpenLayers.Control.OverviewMap(overviewOptions);
                overview.isSuitableOverview = function () {
                    return true;
                };
                this.map.addControl(overview);
            }

            // zoom to fit the viewport
            for (i = 0; i <= options.numZoomLevels; i++) {
                zoomW = image.size.w * resolutions[zoomify.numberOfTiers - 1 - i];
                if (zoomW >= this.map.size.w) {
                    zoomMin = i;
                    this.map.zoomTo(zoomMin);
                    break;
                }
            }

            // zoomin/out listener, prevents zooming passed the minZoom
            this.map.events.register('zoomend', this, function (event) {
                var x = this.map.getZoom();
                if (x < zoomMin) {
                    this.map.zoomTo(zoomMin);
                }
                this.fireZoomMetrics();
            });

            this.map.events.register('move', this, function () {
                this.fireZoomMetrics();
            });
        },

        checkArrows: function () {
            var $arrows = this.$container.find('.zoom-arrow');

            $arrows.addClass(this.DIS_CLASS);

            if (this.$selected.prev().length) {
                $arrows.filter('.prev').removeClass(this.DIS_CLASS);
            }

            if (this.$selected.next().length) {
                $arrows.filter('.next').removeClass(this.DIS_CLASS);
            }
        },

        open: function () {
            this.$container.addClass(this.ACT_CLASS);
            this.checkArrows();
            message_bus.send(document.body, 'view360-remove');
        },

        close: function () {
            this.$container.removeClass(this.ACT_CLASS);
            this.destroy();
        },

        destroy: function () {
            this.map.destroy();
        },

        fireZoomMetrics: function () {
            if (!this.firedZoom) {
                message_bus.send(document.body, 's550-metrics', {action: 'click', name: 'mr-gallery-zoom-interaction'});
                this.firedZoom = true;
            }
        }
    };

    message_bus.listen(document.body, 'zoom-open', function (e, data) {
        if (!(Zoom instanceof ZoomFullscreen)) {
            Zoom = new ZoomFullscreen();
        } else {
            Zoom.$controls.off('click');
            Zoom.$container.off('click');
        }
        Zoom.init(data);
    });

});
//-------- view360 --------//
/*global ngbs, jQuery, GWS */
ngbs.widget('view360', function (message_bus, $elements) {
    "use strict";
    var $ = jQuery, view360;

    var View360 = function (options) {
        if (options instanceof jQuery) {
            this.$el = options;
        } else {
            this.$el = options.$el;
        }

        this.options = {
            showControls: this.$el.data('showcontrols') == false ? false : true,
            showArrows: this.$el.data('showarrows') == false ? false : true,
            autoHideControls: this.$el.data('autohidecontrols') == false ? false : true,
            initialColor: parseInt(this.$el.data('initialcolor'), 10) || 0,
            initialTrim: parseInt(this.$el.data('initialtrim'), 10) || 0,
            initialBackground: parseInt(this.$el.data('initialbackground'), 10) || 0,
            fixedOnBadIE: this.$el.data('fixedonbadie') == false ? false : true,
            direction: this.$el.data('direction') || -1
        };
        this.init(options);
    };

    View360.prototype.init = function (options) {
        var self = this, $initialColor;


        this.$player = this.$el.find(".view360-player");
        this.$components = this.$el.find(".view360-components");
        this.$arrows = this.$el.find(".view360-arrows").children("div");
        this.firedSpin = false;
        this.firedColor = false;
        this.firedRim = false;

        this.$components.find(".view360-color-picker li").each(function (index, elem) {
            var color = $(this).data("color");
            $(this).attr("data-index", index).css({"background-color": color});
        });

        if (!this.options.showControls) {
            this.$components.hide();
        }

        if (!this.options.showArrows) {
            this.$arrows.hide();
        }

        this.fn = options.onFrame || function () {};//setting onFrame event

        this.readSettings();

        if (this.resX && this.resY) {
            this.ratio = (this.resX / this.framesX) / (this.resY / this.framesY);
        }

        if (this.options.fixedOnBadIE) {
            if (navigator.appName.indexOf("Internet Explorer") !== -1) {
                this.badBrowser = (navigator.appVersion.indexOf("MSIE 9") === -1 && navigator.appVersion.indexOf("MSIE 1") === -1);
                if (this.badBrowser) {
                    this.$arrows.parent().addClass('light');
                }
            }
        }

        this.bindings();

        this.trimPath = this.$components.find(".view360-trims li").eq(this.options.initialTrim).addClass("active").data("trim-path");
        this.backgroundSuffix = this.$components.find(".view360-backgrounds li").eq(this.options.initialBackground).addClass("active").data("background-id");

        $initialColor = this.$components.find(".view360-color-picker li").eq(this.options.initialColor);
        this.changeColor($initialColor);
        $initialColor.addClass('active');
        this.preload = this.preloadHtml();
        this.render();

    };

    View360.prototype.readSettings = function () {
        var self = this, wWidth = $(window).width();

        this.$el.find(".qualityChoser").each(function (index, elem) {
            var $this = $(elem),
                minViewport = parseInt($this.data("min-width"), 10) || 0,
                maxViewport = parseInt($this.data("max-width"), 10) || 9999999999999; //huge screens from the future ;)

            if (wWidth >= minViewport && wWidth < maxViewport) {
                self.quality = $this.val();
                self.extension = $this.data("extension");
                self.framesX = parseInt($this.data("columns"), 10);
                self.framesY = parseInt($this.data("rows"), 10);
                self.framesCount = self.framesX * self.framesY;
                self.resX = parseInt($this.data("asset-width"), 10);
                self.resY = parseInt($this.data("asset-height"), 10);

                return false;
            }
        });
    };

    View360.prototype.preloadHtml = function () {
        //style='background-image: url(" + this.trimPath + this.folder + this.quality + "preload.jpg)'
        return "<div class='view360-preloader'><div class='view360-spinner-container'></div></div>";
    };

    View360.prototype.bindings = function () {
        var self = this,
            timer,
            resizeTimer;

        this.$arrows.on("mousedown", function () {
            var $this = $(this);
            if (!self.badBrowser) {
                timer = setInterval(function () {
                    if ($this.data("direction") === "right") {
                        self.$player.spritespin("animate", false);
                        self.$player.spritespin("prev");
                    } else {
                        self.$player.spritespin("animate", false);
                        self.$player.spritespin("next");
                    }
                }, 60);
            }
        }).on("mouseup mouseleave", function () {
            if (!self.badBrowser) {
                clearInterval(timer);
                self.fireRotateMetrics();
                GWS && GWS.broadcast('360-view-rotate');
            }
        });


        this.$components.on("click", "li", function () {
            var $this = $(this), $parent = $this.parent();
            if ($this.hasClass("active")) {
                return;
            }

            $parent.find("li").removeClass("active");
            $this.addClass("active");

            if ($parent.hasClass("trims")) {
                self.trimPath = $this.data("trim-path");
                if (self.$components.find('.view360-modifier-label') && self.$components.find('.view360-modifier-label').css('display') === 'block') {
                    self.$components.find('.view360-modifier-label').text($this.find('.picker-title').text());
                }
                if (!self.firedRim) {
                    message_bus.send(document.body, 's550-metrics', {action: 'click', name: 'mr-360-rim-interaction'});
                    self.firedRim = true;
                }
                GWS && GWS.broadcast('360-view-wheel', $this);
            } else if ($parent.hasClass("backgrounds")) {
                self.backgroundSuffix = $this.data("background-id");
            } else if ($parent.hasClass("colors")) {
                self.changeColor($this);
                if (!self.firedColor) {
                    message_bus.send(document.body, 's550-metrics', {action: 'click', name: 'mr-360-colorizor-interaction'});
                    self.firedColor = true;
                }
                GWS && GWS.broadcast('360-view-color', $this);
            }
            self.preload = self.preloadHtml();
            self.render();
        });


        if (/android/i.test(navigator.userAgent) && /webkit/i.test(navigator.userAgent) || /chrome/i.test(navigator.userAgent)) {
            this.$player.on("touchstart", function (e) {
                e.preventDefault();
            });
        }

        this.$player.on("mousedown", function () {
            if (!self.badBrowser) {
                self.$player.spritespin("animate", false).addClass("playing");
                //TODO: convert to function
                if (self.options.autoHideControls) {
                    self.$components.stop(false, true).fadeOut();
                }

                $(window).on("mouseup", function () {
                    self.$player.removeClass("playing");

                    if (self.options.autoHideControls) {
                        self.$components.stop(false, true).fadeIn();
                    }
                    self.fireRotateMetrics();
                    GWS && GWS.broadcast('360-view-rotate');
                });
            }
        });

        this.$player.on("touchstart", function () {
            self.fireRotateMetrics();
        });

        $(window).on("resize", function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                self.readjust();
            }, 200);
        });
    };

    View360.prototype.render = function (options) {
        var self = this, widgetWidth = this.$el.width(), config = $.extend({}, options);

        config.source = this.trimPath + this.folder + this.quality + this.filename + this.backgroundSuffix + this.extension;
        this.currentOptions = {
            width: widgetWidth,
            height: widgetWidth / self.ratio,

            resolutionX: widgetWidth * self.framesX,
            resolutionY: (widgetWidth / self.ratio) * self.framesY,

            resX: self.resX,
            resY: self.resY,

            frames: this.framesCount,
            framesX: this.framesX,
            frame: config.frame || this.$player.hasClass("spritespin-instance") ? this.$player.spritespin("frame") : 0,

            animate: false,

            sense: config.direction || self.options.direction,
            source: config.source,
            preloadHtml: this.preload
        };

        this.destroy();
    };

    View360.prototype.changeColor = function ($elem) {
        this.folder = $elem.data("folder");
        this.filename = $elem.data("filename");
        if (this.$components.find('.picker-label') && this.$components.find('.picker-label').css('display') === 'block') {
            this.$components.find('.picker-label').text($elem.find('.picker-title').text());
        }
    };

    View360.prototype.destroy = function () {
        var self = this;
        this.$player.removeClass('light');
        if (this.badBrowser) {
            self.$player.addClass('light');
            message_bus.send(document.body, 'view360-light-init', {
                element: self.$player,
                options: self.currentOptions
            });
        } else {
            this.$player.spritespin("destroy");
            this.$player.spritespin(this.currentOptions);
        }
    };

    View360.prototype.readjust = function (player, width) {
        var self = this;
        if (this.badBrowser) {
            message_bus.send(document.body, 'view360-light-reset', {
                element: self.$player,
                options: self.currentOptions
            });
        } else {
            //this.currentOptions.frame = this.$player.spritespin("frame"); //last used frame
            this.preload = undefined;
            this.render(this.currentOptions);
        }
    };

    View360.prototype.fireRotateMetrics = function () {
        if (!this.firedSpin) {
            message_bus.send(document.body, 's550-metrics', {action: 'click', name: 'mr-360-spin-interaction'});
            this.firedSpin = true;
        }
    };

    message_bus.listen(document.body, 'view360-apply', function (e, data) {
        view360 = new View360(data);
    });

    message_bus.listen(document.body, 'view360-remove', function (e, data) {
        view360.destroy();
    });
});
//-------- view360-light --------//
/*global ngbs, jQuery */
jQuery(function () {
    "use strict";
    var $ = jQuery;
    var currFrame = 1,
        currX = 1,
        currY = 0,
        frames = 360,
        framesX = 4,
        animating = false,
        index = 30,
        initalX = 0,
        currXPos = false,
        ratio = 2.23,
        drag = false,
        initialized = false,
        arrowInterval = false,
        $arrows = jQuery(".view360-arrows"),
        $container,
        $frameContainer;

    function goToFirst() {
        currFrame = 1;
        currX = 1;
        animateLeft();
    }

    function animateLeft() {
        currFrame++;
        currX++;
        var nextPos = {x: 0, y: 0};

        nextPos.y = (Math.ceil(currFrame / framesX) - 1)  * $container.height();
        nextPos.x = (currX - 1) * $container.width();

        $frameContainer.css({
            'left': (-1) * nextPos.x + 'px',
            'top' : (-1) * nextPos.y + 'px'
        });
        if (currX >= 4) {
            currX = 0;
        }
    }

    function animateRight() {
        currFrame--;
        currX--;

        if (currX <= 0) {
            currX = 4;
        }

        var nextPos = {x: 0, y: 0};

        nextPos.y = (Math.ceil(currFrame / framesX) - 1)  * $container.height();
        nextPos.x = (currX - 1) * $container.width();

        $frameContainer.css({
            'left': (-1) * nextPos.x + 'px',
            'top' : (-1) * nextPos.y + 'px'
        });
    }

    function goToLast() {
        currFrame = 36;
        currX = 4;
        animateRight();
    }

    function reset360() {
        if ($container !== undefined && $container.length > 0 && $frameContainer !== undefined && $frameContainer.length > 0) {
            animating = false;
            drag = false;
            currFrame = 1;
            currX = 1;
            currY = 0;
            $frameContainer.css({
                'top': 0,
                'left': 0
            });
        }
    }

    function bindEvents() {
        $container.find('.draggable').on('mousedown', function (e) {
            e.preventDefault();
            animating = true;
            drag = true;
            initalX =  e.clientX;
        });

        $container.find('.draggable').on('mouseup', function (e) {
            e.preventDefault();
            animating = false;
            drag = false;
            initalX = false;
        });

        $arrows.on('mousedown', 'div', function (e) {
            drag = false;
            e.preventDefault();
            var direction = jQuery(this).data('direction');
            if (direction === 'left') {
                arrowInterval = setInterval(function () {
                    if (currFrame < 36) {
                        animateLeft();
                        animating = false;
                        setTimeout(function () {
                            animating = true;
                        }, 50);
                    } else if (currFrame === 36) {
                        currX = 4;
                        goToFirst();
                    }
                }, 100);
            } else if (direction === 'right') {
                arrowInterval = setInterval(function () {
                    if (currFrame < 1) {
                        currFrame = 1;
                    }
                    if (currFrame > 1) {
                        animateRight();
                        animating = false;
                        setTimeout(function () {
                            animating = true;
                        }, 50);
                    } else if (currFrame === 1) {
                        goToLast();
                    }
                }, 100);

            }
            e.stopPropagation();
        });

        $arrows.find('div').on('mouseup', function (e) {
            drag = false;
            animating = false;
            e.preventDefault();
            clearInterval(arrowInterval);
            e.stopPropagation();
        });

        $arrows.find('div').on('mouseleave', function (e) {
            drag = false;
            animating = false;
            e.preventDefault();
            clearInterval(arrowInterval);
            e.stopPropagation();
        });

        $container.find('.draggable').on('mousemove', function (event) {
            event.preventDefault();
            if (animating === true) {
                currXPos = event.clientX;
                if (currXPos > initalX && (currXPos - initalX) > 50) {
                    if (currFrame > 1) {
                        animateRight();
                        animating = false;
                        setTimeout(function () {
                            if (drag) {
                                animating = true;
                            }
                        }, 30);
                    } else if (currFrame === 1) {
                        goToLast();
                    }

                } else if ((currXPos < initalX) && (currFrame <= 36) && (initalX - currXPos) > 50) {
                    if (currFrame === 36) {
                        currX = 4;
                        goToFirst();
                    } else {
                        animateLeft();
                        //console.log('left ||| frame: ' + currFrame + ' currX: ' + currX);
                        animating = false;
                        setTimeout(function () {
                            if (drag) {
                                animating = true;
                            }
                        }, 30);
                    }
                }
            }
        });

        jQuery(window).on('resize', function () {
            $container.height($container.width() / ratio);
            $frameContainer.width($container.width() * framesX);
            reset360();
        });
    }

    function init($ele, options) {
        if (!initialized) {
            $container = $ele;
            $container.html('<div class="draggable"></div>');

            $frameContainer = jQuery('<img/>');
            $frameContainer.attr('src', options.source);

            $container.find('.draggable').html($frameContainer);

            $container.height($container.width() / ratio);
            $frameContainer.width($container.width() * framesX);

            bindEvents();
            initialized = true;
        } else {
            $frameContainer.attr('src', options.source);
        }
    }

    ngbs._message_bus.listen(document.body, 'view360-light-init', function (e, data) {
        init(data.element, data.options);
    });

    ngbs._message_bus.listen(document.body, 'view360-light-reset', function (e, data) {
        if (initialized) {
            reset360();
        } else {
            init(data.element, data.options);
        }
    });
});
//-------- reveal-slider --------//
/*global ngbs, __params, jQuery, blGlobal */
ngbs.widget('reveal-slider', function (message_bus, $elements) {
    'use strict';

    var $ = jQuery, revealer;

    var defaultSettings = {
        maskSelector: "*:first"
    }

    function Revealer(options) {
        if (options.$el.hasClass("reveal-slider-enabled")) {
            return;
        }
        this.$slider = options.$el;
        this.options = $.extend({}, defaultSettings, options);
        this.onDrag = options.onDrag;
        this.$scroller = this.$slider.find('.reveal-scroller');
        this.$dragger = this.$scroller.find('.scroller-dragger');
        this.$limits = this.$scroller.find('.scroller-limit');
        this.$background = this.$slider.find('.reveal-img').eq(0);

        this.rangeStart = this.$slider.data('rangestart') || 0;
        this.rangeEnd = this.$slider.data('rangeend') || 100;
        this.initPos = this.$slider.data('initposition') || 0;
        this.lastPos = this.initPos;
        this.firedMetric = false;

        this.init();
    }

    Revealer.prototype.init = function () {
        this.$slider.addClass("reveal-slider-enabled");
        //this.drag(this.initPos * (this.$scroller.outerWidth() - this.$dragger.outerWidth()) / 100);
        this.drag(0);

        this.setHandlers();
    };

    Revealer.prototype.setHandlers = function () {
        var self = this;

        this.$dragger.on('mousedown touchstart', function (e) {
            e.preventDefault();
            e.stopPropagation();
            GWS && GWS.broadcast('reveal-slider-scroll-mousedown');

            $('body').on('mouseup touchend', function (e) {
                self.$dragger.removeClass("active");
                $('body').off('mousemove.reveal-slider, touchmove.reveal-slider');
                GWS && GWS.broadcast('reveal-slider-scroll-mouseup');
            }).on('mousemove.reveal-slider, touchmove.reveal-slider', function (e) {
                e.preventDefault();
                self.$dragger.addClass("active");
                self.calculateDrag(e);
                if (!self.firedMetric) {
                    message_bus.send(document.body, 's550-metrics', {action: 'click', name: 'mr-convertible-interaction'});
                    self.firedMetric = true;
                }
                GWS && GWS.broadcast('reveal-slider-scroll-mousemove');
            });
        });
    };

    Revealer.prototype.calculateDrag = function (e) {
        var value,
            pageX = e.originalEvent.clientX || e.clientX || e.originalEvent.touches[0].clientX || e.touches[0].clientX || e.originalEvent.pageX || e.pageX || e.originalEvent.touches[0].pageX || e.touches[0].pageX,
            scrollerWidth = this.$scroller.outerWidth(),
            draggerWidth = this.$dragger.outerWidth(),
            draggerAxis = draggerWidth / 2;

        value = pageX - this.$scroller.offset().left - draggerAxis;
        value = value >= scrollerWidth - draggerWidth ? scrollerWidth - draggerWidth : value <= 0 ? 0 : value;
        this.drag(value);
    };

    Revealer.prototype.drag = function (val) {
        var draggerOffset = val * 100 / this.$scroller.outerWidth(),
            value = val * 100 / (this.$scroller.outerWidth() - this.$dragger.outerWidth()),
            bounded = (value * (this.rangeEnd - this.rangeStart) / 100) + this.rangeStart;

        this.$dragger.css('left', draggerOffset + '%');
        this.play(bounded);
        this.lastPos = bounded;
        if (typeof this.onDrag === "function") {
            this.onDrag({
                value: value,
                bounded: bounded
            });
        }
    };

    Revealer.prototype.play = function (value) {
        this.$background.css('left', value + '%').find(this.options.maskSelector).css('left', -value + '%');
    };

    message_bus.listen(document.body, 'revealer-update', function (e, data) {
        revealer.play(revealer.lastPos);
    });

    message_bus.listen(document.body, 'revealer-config', function (e, data) {
        revealer = new Revealer(data);
    });

});

//-------- back-to-top --------//
/*global ngbs, jQuery */
ngbs.widget('back-to-top-button', function (message_bus, $elements) {
    'use strict';
    var $ = jQuery, button;

    function BackToTop(config) {
        this.$widget = config.$el;
        this.$button = this.$widget.find('.btt-button');
        this.duration = config.duration || 500;
        this.$button.on('click', function () {
            $('body, html').animate({scrollTop: 0}, self.duration);
            GWS.broadcast('back-to-top');
        });
    }

    message_bus.listen(document.body, 'back-to-top-config', function (e, data) {
        button = new BackToTop(data);
    });

});

//-------- wechat-qr-barcode --------//
/*global ngbs, jQuery */
ngbs.widget('wechat-barcode', function () {
    'use strict';
    var $           = jQuery,
        $WeChatBtn  = $(".share-by-wechat"),
        $WeChatQR   = $(".wechat-qrcode");

    function WeChatBarcode() {

        $WeChatBtn.on("click", function() {
            if ($WeChatQR.hasClass("show")) {
                $WeChatQR.removeClass("show");
            } else {
                $WeChatQR.addClass("show");
            }
        });

    }

    WeChatBarcode();

});
//-------- viewpoints --------//
/*global ngbs, jQuery, console */
ngbs.widget("viewpoints", function (message_bus, $elements) {
    'use strict';

    var $ = jQuery, viewpoint;

    var defaultSettings = {
            offset: 0,
            autoUpdate: true, //update viewpoint on window resize/load
            forceUpdate: false //force update viewpoint on scrolling
        };

    function ViewPoints(options) {
        this.viewpoints = options.$el;
        this.options = $.extend({}, defaultSettings, options);
        this.init(options);

        return this.viewpoints;
    }

    ViewPoints.prototype.init = function (options) {
        var self = this;

        //this.offset = options.offset || 0; //done in update()

        this.active = true;

        this.offsets = [];
        this.heights = [];
        this.triggered = [];

        this.inside = options.inside;
        this.before = options.before;
        this.after = options.after;
        this.crossing = options.crossing;

        this.update();
        this.bindHandlers();
        this.events();

        $(window).trigger("scroll");
    };

    ViewPoints.prototype.bindHandlers = function () {
        var self = this,
            $window = $(window),
            i,
            triggeredDown = [],
            triggeredUp = [],
            scroll,
            oldScroll,
            direction;

        for (i = 0; i < this.viewpoints.length; i++) {
            triggeredDown.push(false);
            triggeredUp.push(false);
        }

        if (this.options.autoUpdate) {
            $window.on("resize.viewpoints, load", function () {
                self.update();
            });
            if (this.options.forceUpdate) {
                $window.on("scroll.viewpoints", function () {
                    if (++i % 3 === 0) {
                        self.update();
                    }
                });
            }
        }

        $window.on("scroll.viewpoints", function () {
            var data = {};

            if (!self.active) {
                return;
            }
            scroll = $window.scrollTop() + self.offset;

            //dont do anything if someone triggers jQuery(window).trgger("scroll")
            if (oldScroll === scroll) {
                return;
            }

            if (scroll > oldScroll) {
                direction = "down";
            } else if (scroll < oldScroll) {
                direction = "up";
            }

            data = {
                direction: direction,
                scrollTop: scroll - self.offset,
                scroll: scroll
            };

            self.viewpoints.each(function (index, elem) {
                if (self.inside && scroll >= self.offsets[index] && scroll <= self.offsets[index] + self.heights[index] && !self.triggered[index]) {
                    //clear triggered status flag for every viewpoint
                    $.each(self.triggered, function (key, value) {
                        self.triggered[key] = false;
                    });
                    //then we set the status flag as triggered for this viewpoint
                    self.triggered[index] = true;
                    data.$el = $(elem);
                    self.inside(self, data);
                }
                if (self.before && scroll < self.offsets[index]) {
                    data.$el = $(elem);
                    self.before(self, data);
                }
                if (self.after && scroll > self.offsets[index] + self.heights[index]) {
                    data.$el = $(elem);
                    self.after(self, data);
                }

                //crossing element (waypoint ;) )
                if (self.crossing) {
                    if (scroll >= self.offsets[index] && direction === "down" && !triggeredDown[index]) {
                        data.$el = $(elem);
                        self.crossing(self, data);
                        triggeredDown[index] = true;
                        triggeredUp[index] = false;
                    } else if (scroll <= self.offsets[index] && direction === "up" && !triggeredUp[index]) {
                        data.$el = $(elem);
                        self.crossing(self, data);
                        triggeredDown[index] = false;
                        triggeredUp[index] = true;
                    }
                }
            });
            oldScroll = scroll;
        });
    };

    ViewPoints.prototype.destroy = function () {
        $(window).off("scroll.viewpoints");
    };

    ViewPoints.prototype.update = function () {
        var self = this;

        this.offsets.length = 0;
        this.heights.length = 0;
        this.triggered.length = 0;

        this.viewpoints.each(function (index, elem) {
            self.offsets.push($(elem).offset().top);
            self.heights.push($(elem).outerHeight());
            self.triggered.push(false);
        });

        if (typeof this.options.offset === "function") {
            this.offset = this.options.offset();
        } else {
            this.offset = this.options.offset || 0;
        }
    };

    ViewPoints.prototype.enable = function () {
        this.active = false;
    };

    ViewPoints.prototype.disable = function () {
        this.active = true;
    };

    ViewPoints.prototype.events = function () {
        var self = this;
        message_bus.listen(document.body, 'viewpoints-update', function (e, data) {
            self.update();
        });

        message_bus.listen(document.body, 'viewpoints-enable', function (e, data) {
            self.enable();
        });

        message_bus.listen(document.body, 'viewpoints-disable', function (e, data) {
            self.disable();
        });
    };

    message_bus.listen(document.body, 'viewpoints', function (e, data) {
        viewpoint = new ViewPoints(data);
    });

    /*
        ViewPoints(options):

        options: object
            $el = jquery target elements
            offset = offset to apply (can be a function if you want variable offset, only executed on init/update )

            inside (retunrObject) = triggered when element is inside viewport
            before (retunrObject) = triggered when element is before top viewport
            after (retunrObject) = triggered when element is after top viewport

            retunrObject {
                $el: jQuery target element
                direction: "up" || "down"
                scroll: scroll value with offset
                scrollTop: current window scroll top value
            }

    */
});

//-------- parallax --------//

/*global ngbs, __params, jQuery */
ngbs.widget("parallax", function (message_bus, $elements) {
    'use strict';

    var $ = jQuery, parallax,
        scroll = 0,
        wWidth,
        offsetTop = [],
        heights = [];

    var defaultSettings = {
        adjustSize: false,
        heightcrop: 1.75 / 2, //height of parallax container to avoid "black" gaps at the bottom (1 = same height)
        animate: true, //use animations when type = "container"
        animateSpeed: 180,
        offset: 0
    };

    function Parallax(options) {
        this.options = $.extend({}, defaultSettings, options);

        this.$el = options.$el || $();
        this.$container = options.cont || $("body");
        this.init();
    }

    Parallax.prototype.init = function () {
        var self = this, imagesLen, timer;

        this.$el.wrap("<div class='parallax-container' />");
        this.$parallax = this.$el.parent(".parallax-container");
        this.$insideImages = this.$parallax.find("img");
        imagesLen = this.$insideImages.length;
        this.active = true;

        if (imagesLen) {
            this.insideImagesCount = 0;
            this.$insideImages.each(function (index, elem) {
                $("<img/>").on("load", function () {
                    self.insideImagesCount++;
                }).attr("src", elem.src);
            });
            timer = setInterval(function () {
                if (self.insideImagesCount === imagesLen) {
                    clearInterval(timer);
                    self.updateView();
                    self.bindings();
                }
            }, 500);
        } else {
            self.updateView();
            self.bindings();
        }
    };

    Parallax.prototype.bindings = function () {
        var self = this, resizing;
        $(window).on("resize", function () {
            //Holy timeouts
            clearTimeout(resizing);
            resizing = setTimeout(function () {
                //self.recalculate();
                self.updateView();
            }, 500);
        }).on("scroll", function () {
            if (self.active) {
                scroll = $(window).scrollTop() - self.options.offset; //do you have issues on IE8? this could be the problem, jQuery failing -.-
                self.parallax(scroll);
            }
        });
    };

    /*
        Make parallax to background image of element
    */
    Parallax.prototype.parallax = function (scroll) {
        var self = this, value;
        this.$parallax.each(function (index, parallaxContainer) {
            var $this = $(parallaxContainer),
                $parallax,
                containerHeight,
                containerMoveLength,
                parallaxHeight,
                parallaxMoveHeight,
                top,
                containerOffsetPerc,
                parallaxValue,
                offsetTop = $this.offset().top - self.wHeight;


            $parallax = $this.children().eq(0);//should be children object with height > 0

            containerHeight = $this.height();//onResize
            containerMoveLength = (self.wHeight + containerHeight);
            parallaxHeight = $parallax.height();//onResize
            parallaxMoveHeight = (containerHeight + parallaxHeight);

            if (scroll > offsetTop && scroll < (offsetTop + $this.outerHeight() + self.wHeight)) {
                top = -1 * (scroll - $this.offset().top - containerHeight);
                containerOffsetPerc = 100 - (top * 100 / containerMoveLength);

                parallaxValue = (parallaxHeight - containerHeight) * containerOffsetPerc / 100;
                if (self.options.animate) {
                    $parallax.css("position", "relative").stop().animate({"top": -parallaxValue + "px"}, self.options.animateSpeed);
                } else {
                    $parallax.css({"position": "relative", "top": -parallaxValue + "px"});
                }
            }
        });
    };

    Parallax.prototype.disable = function () {
        var self = this;
        /* for type background */
        /*this.$el.removeClass("parallax-target");
        this.$parallax.css({"background-image": "none"});*/


        this.active = false;
    };

    Parallax.prototype.enable = function () {
        var self = this;
        /* for type background */
        //this.$el.addClass("parallax-target");
        /*this.$el.each(function (index, elem) {
            //self.$parallax.eq(index).css({"background-image": "url(" + elem.src + ")" });
        });*/


        this.active = true;
    };

    Parallax.prototype.updateView = function () {
        var self = this, newHeight;
        this.wHeight = $(window).height();
        this.wWidth = $(window).width();
        if (self.options.heightcrop !== 1) {
            newHeight = self.options.heightcrop * self.$el.height();
            self.$parallax.css({
                "height": newHeight
            });
        }
        this.parallax(scroll);
        message_bus.send(document.body, "paralax-update-view-done");
    };

    message_bus.listen(document.body, 'parallax-refresh', function (e, data) {
        parallax.updateView();
    });

    message_bus.listen(document.body, 'parallax-enable', function (e, data) {
        parallax.enable();
    });

    message_bus.listen(document.body, 'parallax-disable', function (e, data) {
        parallax.disable();
    });

    message_bus.listen(document.body, 'parallax', function (e, data) {
        if ('ontouchstart' in document.body || 'ontouchstart' in window || 'ontouchstart' in document.documentElement) {
            return false;
        }
        parallax = new Parallax(data);
    });

});

//-------- smooth-scrolling --------//
/*global ngbs, __params, jQuery, blGlobal */
ngbs.widget("smooth-scrolling", function (message_bus, $elements) {
    'use strict';

    var $ = jQuery;
    var scrolling;
    var defaultSettings = {
        speed: 200, // duration/speed of animation
        distance: 150, // how much each mouse wheel even must scroll
        deltaScalar: 3, // 8| cuack / dont' touch this :P
        easing: "linear"
    };

    function Scrolling(options) {
        this.options = $.extend({}, defaultSettings, options);
        if (navigator.appVersion.indexOf("Mac") > -1) {
            return; //MacOS maybe with trackpad enabled events.
        }
        this.bindings();
    }

    Scrolling.prototype.bindings = function () {
        var self = this;
        $(window).on("mousewheel.scrolling", function (e) {
            self.wheel(e.originalEvent);
        });
    };

    Scrolling.prototype.wheel = function (event) {
        var self = this,
            delta = 0;
        event.preventDefault();

        if (event.wheelDelta) {
            delta = event.wheelDelta / (self.options.deltaScalar * 40);
        } else if (event.detail) {
            delta = -event.detail / self.options.deltaScalar;
        }
        $('html, body').stop(false, false).animate({scrollTop: $(window).scrollTop() - (self.options.distance * delta)}, self.options.speed, self.options.easing);
    };

    Scrolling.prototype.disable = function () {
        $(window).off("mousewheel.scrolling");
    };

    Scrolling.prototype.enable = function () {
        this.bindings();
    };

    message_bus.listen(document.body, 'smooth-scrolling', function (e, data) {
        data = data || {};
        scrolling = new Scrolling(data);
    });

    message_bus.listen(document.body, 'smooth-scrolling-disable', function (e, data) {
        scrolling.disable();
    });

    message_bus.listen(document.body, 'smooth-scrolling-enable', function (e, data) {
        scrolling.enable();
    });

});
//-------- section-collapser --------//
/*global ngbs, jQuery */
ngbs.widget('section-collapser', function (message_bus, $elements) {
    'use strict';
    var $ = jQuery, collapser, defaultSetting = {
        speed: 400
    };

    function Collapser(options) {
        this.$el = options.$el;
        this.options = $.extend({}, defaultSetting, options);
        this.init();
        this.bindings();
    }

    Collapser.prototype.init = function () {
        this.$el.each(function (index, elem) {
            var $this = $(elem), hidden = false;

            if (!$this.data("collapsible")) {
                return;
            }
            if ($this.data("collapsed") === true) {
                hidden = true;
            }

            $this.wrapInner("<div class='collapsible' style='display: " + (hidden ? "none" : "block") + "'/>");
            $this.prepend("<div class='section-collapser " + (hidden ? "collapsed" : "") + "'>" + ($this.data("title") ? $this.data("title") : $this[0].id) + "<div class='collapser-status' /></div>");
        });

        this.$collapserBtn = this.$el.find(".section-collapser");
        this.$collapserArea = this.$el.find(".collapsible");
    };

    Collapser.prototype.bindings = function () {
        var self = this;
        this.$collapserBtn.on("click", function (e) {

            e.preventDefault();
            $(this).toggleClass("collapsed").next(".collapsible").slideToggle(
                self.options.speed,
                function () {
                    if (typeof self.options.onChange === "function") {
                        self.options.onChange();
                    }
                }
            );
        });
    };

    Collapser.prototype.deactivate = function () {
        this.$el.find(".section-collapser").hide();
        this.$el.find(".collapsible").show();
    };

    Collapser.prototype.activate = function () {
        this.$el.find(".section-collapser").show();
        this.$el.find(".collapsible").hide();
    };

    message_bus.listen(document.body, 'section-collapser', function (e, data) {
        collapser = new Collapser(data);
    });

});
//-------- GWS --------//
var GWS = (function () {
    var $ = jQuery,
        events = {};
    var initiated = false;
    var init = function(){
        if(initiated){
            return;
        }
        this.$widgets = $('.GWS-widget');
        if(this.$widgets.length){
            this.$widgets.wrapAll('<div id="s550-container"></div>');
            window.ngbs._message_bus.send(document.body, 'page-init');

            $.each(".feature-buttons.open", function(i, obj){
                $(this).attr("data-feature-id", $(this));
            });
        }
        initiated = true;
    };
    
    var broadcast = function (event, obj) {
        if(typeof obj == "undefined"){
            obj = {};
        }
        var data;
        if (event in events){
            try{
                if (obj instanceof HTMLElement) {
                    obj = $(obj);
                }
            }
            catch(e){}
            if (obj instanceof jQuery) {
                data = $(obj).data();
                var id = $(obj).attr('id');
                if (typeof id !== 'undefined' && id !== false) {
                    data = $.extend(data, {"id": id});
                }
            }
            else{
                data = obj; //custom data object is ok too
            }
            data.event = event;
            events[event](data); //execute and pass applicable data object
            return true;
        }
        return false;
    };
    var listen = function (event, func) { //will replace previous listener, not append another function (current design)
        if (typeof func == 'function') {
            events[event] = func;
            return true;
        }
        return false;
    };
    var ignore = function (event) {
        if (event in events){
            delete events[event];
            return true;
        }
        return false;
    };
    return {
        listen: listen,
        broadcast: broadcast,
        ignore: ignore,
        init: init
    };
})();


/* This loads the S550 Widget scripts.js code */

var s550eventmap = {};

function flagEventFired(event) {
    s550eventmap[event] = true;
}

function hasEventFired(event) {
    var hasfired = !((s550eventmap[event] === undefined) || (s550eventmap[event] === false));
    return hasfired;
}

function showShareThisLink(socialId, url) {
    $.publish('/analytics/link/', { title : 'share this', nameplate : 'none', link : true, type : 'e', onclicks : 'share this:' + socialId });
    window.open(url);
}

function showFollowLink(socialId, url) {
    $.publish('/analytics/link/', { title : 'social:follow', nameplate : 'none', link : true, type : 'e', onclicks : 'social:follow:' + socialId, events : 'event4' });
    window.open(url);
}

function publishS550Link(title, linktype, onclicks, throttleKey) {
    if (throttleKey === undefined) {
        $.publish('/analytics/link/', { title : title, link : true, type : linktype, onclicks : onclicks });
    } else {
        if (!hasEventFired(throttleKey)) {
            flagEventFired(throttleKey);
            $.publish('/analytics/link/', { title : title, link : true, type : linktype, onclicks : onclicks });
        }
    }
}

$(document).bind('mobileinit', function(){
    $(document).bind('pagechange', function() {
        
        // Run GWS.init manually if the auto-init.js script is not included
        GWS.init();

        // Subscribe to events in the S550 widgets
        GWS.listen('features-button', function(data) {
            var onclicks = '', eventKey = '';
            if (data.featuresId) {
                if (data.featuresId === 'performance') {
                    onclicks = eventKey = 'reveal:performance:read more:ford mustang';
                    publishS550Link('reveal:performance:read more', 'o', onclicks, eventKey);
                } else if (data.featuresId === 'tech') {
                    onclicks = eventKey = 'reveal:tech:read more:ford mustang';
                    publishS550Link('reveal:tech:read more', 'o', onclicks, eventKey); 
                }
            }
        });

        GWS.listen('gallery-slider-image', function(data) {
            publishS550Link('reveal:gallery:image', 'o', 'reveal:gallery:image:ford mustang', 'gallery-slider-image');
        });

        GWS.listen('gallery-slider-arrow', function(data) {
            publishS550Link('reveal:gallery:scroll', 'o', 'reveal:gallery:scroll:ford mustang', 'gallery-slider-arrow');
        });

        GWS.listen('360-view-rotate', function(data) {
            publishS550Link('reveal:360:spin', 'o', 'reveal:360:spin:ford mustang', '360-view-rotate');
        });

        GWS.listen('360-view-color', function(data) {
            publishS550Link('reveal:360:colorizor', 'o', 'reveal:360:colorizor:ford mustang', '360-view-color');
        });

        GWS.listen('360-view-wheel', function(data) {
            publishS550Link('reveal:360:select rim', 'o', 'reveal:360:select rim:ford mustang', '360-view-wheel');
        });

        GWS.listen('zoom-fullscreen-save', function(data) {
            publishS550Link('reveal:gallery:image:download', 'd', 'reveal:gallery:image:download:ford mustang', 'zoom-fullscreen-save');
        });

        GWS.listen('reveal-slider-scroll-mousemove', function(data) {
            publishS550Link('reveal:convertible', 'o', 'reveal:convertible:ford mustang', 'reveal-slider-scroll-mousemove');
        });

        // Page initialization settings
        if ($('#s550-billboard').length > 0) {

            // Attach click event handlers for the social media sites in the gallery
            var socialMediaSites = ['facebook', 'twitter', 'googleplus', 'weibo'];
            $.each(socialMediaSites, function(index, socialMediaSite) {
                $("a[data-id='" + socialMediaSite + "']").each(function(index, value) {
                    var anchor = value;
                    $(anchor).unbind();
                    var url = $(anchor).data("url");
                    if (index === 0) {
                        $(anchor).click(function(event) {
                            showShareThisLink(socialMediaSite, url);
                            return false;
                        });
                    } else {
                        $(anchor).click(function(event) {
                            showFollowLink(socialMediaSite, url);
                            return false;
                        });
                    }
                });
            });
            
            // Override email handling
            $("a.share-by-email").each(function(index, value) {
                var emailLink = $(this);
                var pev2 = (index === 0) ? "share this" : "social:follow";
                var c5 = (index === 0) ? "share this:email" : "social:follow:email";
                emailLink.unbind();
                emailLink.on('click', function(event) {
                    $.publish('/analytics/link/', { title : pev2, nameplate : 'none', link : true, type : 'e', onclicks : c5, events : 'event4' });
                    window.location.href = 'mailto:' + emailLink.data('email');
                });
            });
            
            // Attach tracking to the subnav items (do not use IE8-unsupported methods)
            var s550SubnavItems = ['gallery', 'features'];
            $("ul.nav-content").find("li > a").each(function() {
                var link = $(this);
                var linkHref = $(this).attr("href");
                $.each(s550SubnavItems, function(key, value) {
                    if (linkHref === '#s550-'+value) {
                        $(link).on('click', function(event) {
                            publishS550Link('reveal:' + value, 'o', 'reveal:' + value + ':ford mustang', 'subnav:' + value);
                        });
                        return false;
                    }
                });
            });
            
            // Attach event handlers for the get-updates links
            var getUpdates  = document.querySelectorAll('.get-updates-link');
            if (getUpdates.length >= 2) {
                if (typeof getUpdates[0] !== 'undefined') {
                    var getUpdatesLink1 = getUpdates[0].getAttribute("href");
                    getUpdates[0].onclick = function() {
                        window.location = getUpdatesLink1;
                    }; 
                }
                if (typeof getUpdates[1] !== 'undefined') {
                    var getUpdatesLink2 = getUpdates[1].getAttribute("href");
                    getUpdates[1].onclick = function() {
                        window.location = getUpdatesLink2;
                    };
                }
            }
        };
    });
});


/*! jQuery Mobile 1.3.1 | Git HEAD hash: 74b4bec <> 2013-04-10T21:57:23Z | (c) 2010, 2013 jQuery Foundation, Inc. | jquery.org/license */
(function(e,t,i){"function"==typeof define&&define.amd?define(["jquery"],function(n){return i(n,e,t),n.mobile}):i(e.jQuery,e,t)})(this,document,function(e,t,i,n){(function(e){e.mobile={}})(e),function(e,t,n){var a={};e.mobile=e.extend(e.mobile,{version:"1.3.1",ns:"",subPageUrlKey:"ui-page",activePageClass:"ui-page-active",activeBtnClass:"ui-btn-active",focusClass:"ui-focus",ajaxEnabled:!0,hashListeningEnabled:!0,linkBindingEnabled:!0,defaultPageTransition:"fade",maxTransitionWidth:!1,minScrollBack:250,touchOverflowEnabled:!1,defaultDialogTransition:"pop",pageLoadErrorMessage:"Error Loading Page",pageLoadErrorMessageTheme:"e",phonegapNavigationEnabled:!1,autoInitializePage:!0,pushStateEnabled:!0,ignoreContentEnabled:!1,orientationChangeEnabled:!0,buttonMarkup:{hoverDelay:200},window:e(t),document:e(i),keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91},behaviors:{},silentScroll:function(i){"number"!==e.type(i)&&(i=e.mobile.defaultHomeScroll),e.event.special.scrollstart.enabled=!1,setTimeout(function(){t.scrollTo(0,i),e.mobile.document.trigger("silentscroll",{x:0,y:i})},20),setTimeout(function(){e.event.special.scrollstart.enabled=!0},150)},nsNormalizeDict:a,nsNormalize:function(t){return t?a[t]||(a[t]=e.camelCase(e.mobile.ns+t)):n},getInheritedTheme:function(e,t){for(var i,n,a=e[0],o="",s=/ui-(bar|body|overlay)-([a-z])\b/;a&&(i=a.className||"",!(i&&(n=s.exec(i))&&(o=n[2])));)a=a.parentNode;return o||t||"a"},closestPageData:function(e){return e.closest(':jqmData(role="page"), :jqmData(role="dialog")').data("mobile-page")},enhanceable:function(e){return this.haveParents(e,"enhance")},hijackable:function(e){return this.haveParents(e,"ajax")},haveParents:function(t,i){if(!e.mobile.ignoreContentEnabled)return t;for(var n,a,o,s=t.length,r=e(),l=0;s>l;l++){for(a=t.eq(l),o=!1,n=t[l];n;){var d=n.getAttribute?n.getAttribute("data-"+e.mobile.ns+i):"";if("false"===d){o=!0;break}n=n.parentNode}o||(r=r.add(a))}return r},getScreenHeight:function(){return t.innerHeight||e.mobile.window.height()}},e.mobile),e.fn.jqmData=function(t,i){var a;return t!==n&&(t&&(t=e.mobile.nsNormalize(t)),a=2>arguments.length||i===n?this.data(t):this.data(t,i)),a},e.jqmData=function(t,i,a){var o;return i!==n&&(o=e.data(t,i?e.mobile.nsNormalize(i):i,a)),o},e.fn.jqmRemoveData=function(t){return this.removeData(e.mobile.nsNormalize(t))},e.jqmRemoveData=function(t,i){return e.removeData(t,e.mobile.nsNormalize(i))},e.fn.removeWithDependents=function(){e.removeWithDependents(this)},e.removeWithDependents=function(t){var i=e(t);(i.jqmData("dependents")||e()).remove(),i.remove()},e.fn.addDependents=function(t){e.addDependents(e(this),t)},e.addDependents=function(t,i){var n=e(t).jqmData("dependents")||e();e(t).jqmData("dependents",e.merge(n,i))},e.fn.getEncodedText=function(){return e("<div/>").text(e(this).text()).html()},e.fn.jqmEnhanceable=function(){return e.mobile.enhanceable(this)},e.fn.jqmHijackable=function(){return e.mobile.hijackable(this)};var o=e.find,s=/:jqmData\(([^)]*)\)/g;e.find=function(t,i,n,a){return t=t.replace(s,"[data-"+(e.mobile.ns||"")+"$1]"),o.call(this,t,i,n,a)},e.extend(e.find,o),e.find.matches=function(t,i){return e.find(t,null,null,i)},e.find.matchesSelector=function(t,i){return e.find(i,null,null,[t]).length>0}}(e,this),function(e,t){var i=0,n=Array.prototype.slice,a=e.cleanData;e.cleanData=function(t){for(var i,n=0;null!=(i=t[n]);n++)try{e(i).triggerHandler("remove")}catch(o){}a(t)},e.widget=function(i,n,a){var o,s,r,l,d=i.split(".")[0];i=i.split(".")[1],o=d+"-"+i,a||(a=n,n=e.Widget),e.expr[":"][o.toLowerCase()]=function(t){return!!e.data(t,o)},e[d]=e[d]||{},s=e[d][i],r=e[d][i]=function(e,i){return this._createWidget?(arguments.length&&this._createWidget(e,i),t):new r(e,i)},e.extend(r,s,{version:a.version,_proto:e.extend({},a),_childConstructors:[]}),l=new n,l.options=e.widget.extend({},l.options),e.each(a,function(t,i){e.isFunction(i)&&(a[t]=function(){var e=function(){return n.prototype[t].apply(this,arguments)},a=function(e){return n.prototype[t].apply(this,e)};return function(){var t,n=this._super,o=this._superApply;return this._super=e,this._superApply=a,t=i.apply(this,arguments),this._super=n,this._superApply=o,t}}())}),r.prototype=e.widget.extend(l,{widgetEventPrefix:s?l.widgetEventPrefix:i},a,{constructor:r,namespace:d,widgetName:i,widgetFullName:o}),s?(e.each(s._childConstructors,function(t,i){var n=i.prototype;e.widget(n.namespace+"."+n.widgetName,r,i._proto)}),delete s._childConstructors):n._childConstructors.push(r),e.widget.bridge(i,r)},e.widget.extend=function(i){for(var a,o,s=n.call(arguments,1),r=0,l=s.length;l>r;r++)for(a in s[r])o=s[r][a],s[r].hasOwnProperty(a)&&o!==t&&(i[a]=e.isPlainObject(o)?e.isPlainObject(i[a])?e.widget.extend({},i[a],o):e.widget.extend({},o):o);return i},e.widget.bridge=function(i,a){var o=a.prototype.widgetFullName||i;e.fn[i]=function(s){var r="string"==typeof s,l=n.call(arguments,1),d=this;return s=!r&&l.length?e.widget.extend.apply(null,[s].concat(l)):s,r?this.each(function(){var n,a=e.data(this,o);return a?e.isFunction(a[s])&&"_"!==s.charAt(0)?(n=a[s].apply(a,l),n!==a&&n!==t?(d=n&&n.jquery?d.pushStack(n.get()):n,!1):t):e.error("no such method '"+s+"' for "+i+" widget instance"):e.error("cannot call methods on "+i+" prior to initialization; "+"attempted to call method '"+s+"'")}):this.each(function(){var t=e.data(this,o);t?t.option(s||{})._init():e.data(this,o,new a(s,this))}),d}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(t,n){n=e(n||this.defaultElement||this)[0],this.element=e(n),this.uuid=i++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=e.widget.extend({},this.options,this._getCreateOptions(),t),this.bindings=e(),this.hoverable=e(),this.focusable=e(),n!==this&&(e.data(n,this.widgetFullName,this),this._on(!0,this.element,{remove:function(e){e.target===n&&this.destroy()}}),this.document=e(n.style?n.ownerDocument:n.document||n),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:e.noop,_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:e.noop,widget:function(){return this.element},option:function(i,n){var a,o,s,r=i;if(0===arguments.length)return e.widget.extend({},this.options);if("string"==typeof i)if(r={},a=i.split("."),i=a.shift(),a.length){for(o=r[i]=e.widget.extend({},this.options[i]),s=0;a.length-1>s;s++)o[a[s]]=o[a[s]]||{},o=o[a[s]];if(i=a.pop(),n===t)return o[i]===t?null:o[i];o[i]=n}else{if(n===t)return this.options[i]===t?null:this.options[i];r[i]=n}return this._setOptions(r),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return this.options[e]=t,"disabled"===e&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!t).attr("aria-disabled",t),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(i,n,a){var o,s=this;"boolean"!=typeof i&&(a=n,n=i,i=!1),a?(n=o=e(n),this.bindings=this.bindings.add(n)):(a=n,n=this.element,o=this.widget()),e.each(a,function(a,r){function l(){return i||s.options.disabled!==!0&&!e(this).hasClass("ui-state-disabled")?("string"==typeof r?s[r]:r).apply(s,arguments):t}"string"!=typeof r&&(l.guid=r.guid=r.guid||l.guid||e.guid++);var d=a.match(/^(\w+)\s*(.*)$/),c=d[1]+s.eventNamespace,h=d[2];h?o.delegate(h,c,l):n.bind(c,l)})},_off:function(e,t){t=(t||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.unbind(t).undelegate(t)},_delay:function(e,t){function i(){return("string"==typeof e?n[e]:e).apply(n,arguments)}var n=this;return setTimeout(i,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){e(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){e(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){e(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){e(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,i,n){var a,o,s=this.options[t];if(n=n||{},i=e.Event(i),i.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),i.target=this.element[0],o=i.originalEvent)for(a in o)a in i||(i[a]=o[a]);return this.element.trigger(i,n),!(e.isFunction(s)&&s.apply(this.element[0],[i].concat(n))===!1||i.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,i){e.Widget.prototype["_"+t]=function(n,a,o){"string"==typeof a&&(a={effect:a});var s,r=a?a===!0||"number"==typeof a?i:a.effect||i:t;a=a||{},"number"==typeof a&&(a={duration:a}),s=!e.isEmptyObject(a),a.complete=o,a.delay&&n.delay(a.delay),s&&e.effects&&e.effects.effect[r]?n[t](a):r!==t&&n[r]?n[r](a.duration,a.easing,o):n.queue(function(i){e(this)[t](),o&&o.call(n[0]),i()})}})}(e),function(e,t){e.widget("mobile.widget",{_createWidget:function(){e.Widget.prototype._createWidget.apply(this,arguments),this._trigger("init")},_getCreateOptions:function(){var i=this.element,n={};return e.each(this.options,function(e){var a=i.jqmData(e.replace(/[A-Z]/g,function(e){return"-"+e.toLowerCase()}));a!==t&&(n[e]=a)}),n},enhanceWithin:function(t,i){this.enhance(e(this.options.initSelector,e(t)),i)},enhance:function(t,i){var n,a,o=e(t);o=e.mobile.enhanceable(o),i&&o.length&&(n=e.mobile.closestPageData(o),a=n&&n.keepNativeSelector()||"",o=o.not(a)),o[this.widgetName]()},raise:function(e){throw"Widget ["+this.widgetName+"]: "+e}})}(e),function(e){e.extend(e.mobile,{loadingMessageTextVisible:n,loadingMessageTheme:n,loadingMessage:n,showPageLoadingMsg:function(t,i,n){e.mobile.loading("show",t,i,n)},hidePageLoadingMsg:function(){e.mobile.loading("hide")},loading:function(){this.loaderWidget.loader.apply(this.loaderWidget,arguments)}});var t="ui-loader",i=e("html"),a=e.mobile.window;e.widget("mobile.loader",{options:{theme:"a",textVisible:!1,html:"",text:"loading"},defaultHtml:"<div class='"+t+"'>"+"<span class='ui-icon ui-icon-loading'></span>"+"<h1></h1>"+"</div>",fakeFixLoader:function(){var t=e("."+e.mobile.activeBtnClass).first();this.element.css({top:e.support.scrollTop&&a.scrollTop()+a.height()/2||t.length&&t.offset().top||100})},checkLoaderPosition:function(){var t=this.element.offset(),i=a.scrollTop(),n=e.mobile.getScreenHeight();(i>t.top||t.top-i>n)&&(this.element.addClass("ui-loader-fakefix"),this.fakeFixLoader(),a.unbind("scroll",this.checkLoaderPosition).bind("scroll",e.proxy(this.fakeFixLoader,this)))},resetHtml:function(){this.element.html(e(this.defaultHtml).html())},show:function(o,s,r){var l,d,c;this.resetHtml(),"object"===e.type(o)?(c=e.extend({},this.options,o),o=c.theme||e.mobile.loadingMessageTheme):(c=this.options,o=o||e.mobile.loadingMessageTheme||c.theme),d=s||e.mobile.loadingMessage||c.text,i.addClass("ui-loading"),(e.mobile.loadingMessage!==!1||c.html)&&(l=e.mobile.loadingMessageTextVisible!==n?e.mobile.loadingMessageTextVisible:c.textVisible,this.element.attr("class",t+" ui-corner-all ui-body-"+o+" ui-loader-"+(l||s||o.text?"verbose":"default")+(c.textonly||r?" ui-loader-textonly":"")),c.html?this.element.html(c.html):this.element.find("h1").text(d),this.element.appendTo(e.mobile.pageContainer),this.checkLoaderPosition(),a.bind("scroll",e.proxy(this.checkLoaderPosition,this)))},hide:function(){i.removeClass("ui-loading"),e.mobile.loadingMessage&&this.element.removeClass("ui-loader-fakefix"),e.mobile.window.unbind("scroll",this.fakeFixLoader),e.mobile.window.unbind("scroll",this.checkLoaderPosition)}}),a.bind("pagecontainercreate",function(){e.mobile.loaderWidget=e.mobile.loaderWidget||e(e.mobile.loader.prototype.defaultHtml).loader()})}(e,this),function(e,t,n){function a(e){return e=e||location.href,"#"+e.replace(/^[^#]*#?(.*)$/,"$1")}var o,s="hashchange",r=i,l=e.event.special,d=r.documentMode,c="on"+s in t&&(d===n||d>7);e.fn[s]=function(e){return e?this.bind(s,e):this.trigger(s)},e.fn[s].delay=50,l[s]=e.extend(l[s],{setup:function(){return c?!1:(e(o.start),n)},teardown:function(){return c?!1:(e(o.stop),n)}}),o=function(){function i(){var n=a(),r=p(d);n!==d?(u(d=n,r),e(t).trigger(s)):r!==d&&(location.href=location.href.replace(/#.*/,"")+r),o=setTimeout(i,e.fn[s].delay)}var o,l={},d=a(),h=function(e){return e},u=h,p=h;return l.start=function(){o||i()},l.stop=function(){o&&clearTimeout(o),o=n},t.attachEvent&&!t.addEventListener&&!c&&function(){var t,n;l.start=function(){t||(n=e.fn[s].src,n=n&&n+a(),t=e('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){n||u(a()),i()}).attr("src",n||"javascript:0").insertAfter("body")[0].contentWindow,r.onpropertychange=function(){try{"title"===event.propertyName&&(t.document.title=r.title)}catch(e){}})},l.stop=h,p=function(){return a(t.location.href)},u=function(i,n){var a=t.document,o=e.fn[s].domain;i!==n&&(a.title=r.title,a.open(),o&&a.write('<script>document.domain="'+o+'"</script>'),a.close(),t.location.hash=i)}}(),l}()}(e,this),function(e){t.matchMedia=t.matchMedia||function(e){var t,i=e.documentElement,n=i.firstElementChild||i.firstChild,a=e.createElement("body"),o=e.createElement("div");return o.id="mq-test-1",o.style.cssText="position:absolute;top:-100em",a.style.background="none",a.appendChild(o),function(e){return o.innerHTML='&shy;<style media="'+e+'"> #mq-test-1 { width: 42px; }</style>',i.insertBefore(a,n),t=42===o.offsetWidth,i.removeChild(a),{matches:t,media:e}}}(i),e.mobile.media=function(e){return t.matchMedia(e).matches}}(e),function(e){var t={touch:"ontouchend"in i};e.mobile.support=e.mobile.support||{},e.extend(e.support,t),e.extend(e.mobile.support,t)}(e),function(e){e.extend(e.support,{orientation:"orientation"in t&&"onorientationchange"in t})}(e),function(e,n){function a(e){var t=e.charAt(0).toUpperCase()+e.substr(1),i=(e+" "+p.join(t+" ")+t).split(" ");for(var a in i)if(u[i[a]]!==n)return!0}function o(e,t,n){for(var a,o=i.createElement("div"),s=function(e){return e.charAt(0).toUpperCase()+e.substr(1)},r=function(e){return""===e?"":"-"+e.charAt(0).toLowerCase()+e.substr(1)+"-"},l=function(i){var n=r(i)+e+": "+t+";",l=s(i),d=l+(""===l?e:s(e));o.setAttribute("style",n),o.style[d]&&(a=!0)},d=n?n:p,c=0;d.length>c;c++)l(d[c]);return!!a}function s(){var a="transform-3d",o=e.mobile.media("(-"+p.join("-"+a+"),(-")+"-"+a+"),("+a+")");if(o)return!!o;var s=i.createElement("div"),r={MozTransform:"-moz-transform",transform:"transform"};h.append(s);for(var l in r)s.style[l]!==n&&(s.style[l]="translate3d( 100px, 1px, 1px )",o=t.getComputedStyle(s).getPropertyValue(r[l]));return!!o&&"none"!==o}function r(){var t,i,n=location.protocol+"//"+location.host+location.pathname+"ui-dir/",a=e("head base"),o=null,s="";return a.length?s=a.attr("href"):a=o=e("<base>",{href:n}).appendTo("head"),t=e("<a href='testurl' />").prependTo(h),i=t[0].href,a[0].href=s||location.pathname,o&&o.remove(),0===i.indexOf(n)}function l(){var e,n=i.createElement("x"),a=i.documentElement,o=t.getComputedStyle;return"pointerEvents"in n.style?(n.style.pointerEvents="auto",n.style.pointerEvents="x",a.appendChild(n),e=o&&"auto"===o(n,"").pointerEvents,a.removeChild(n),!!e):!1}function d(){var e=i.createElement("div");return e.getBoundingClientRect!==n}function c(){var e=t,i=navigator.userAgent,n=navigator.platform,a=i.match(/AppleWebKit\/([0-9]+)/),o=!!a&&a[1],s=i.match(/Fennec\/([0-9]+)/),r=!!s&&s[1],l=i.match(/Opera Mobi\/([0-9]+)/),d=!!l&&l[1];return(n.indexOf("iPhone")>-1||n.indexOf("iPad")>-1||n.indexOf("iPod")>-1)&&o&&534>o||e.operamini&&"[object OperaMini]"==={}.toString.call(e.operamini)||l&&7458>d||i.indexOf("Android")>-1&&o&&533>o||r&&6>r||"palmGetResource"in t&&o&&534>o||i.indexOf("MeeGo")>-1&&i.indexOf("NokiaBrowser/8.5.0")>-1?!1:!0}var h=e("<body>").prependTo("html"),u=h[0].style,p=["Webkit","Moz","O"],m="palmGetResource"in t,f=t.opera,g=t.operamini&&"[object OperaMini]"==={}.toString.call(t.operamini),b=t.blackberry&&!a("-webkit-transform");e.extend(e.mobile,{browser:{}}),e.mobile.browser.oldIE=function(){var e=3,t=i.createElement("div"),n=t.all||[];do t.innerHTML="<!--[if gt IE "+ ++e+"]><br><![endif]-->";while(n[0]);return e>4?e:!e}(),e.extend(e.support,{cssTransitions:"WebKitTransitionEvent"in t||o("transition","height 100ms linear",["Webkit","Moz",""])&&!e.mobile.browser.oldIE&&!f,pushState:"pushState"in history&&"replaceState"in history&&!(t.navigator.userAgent.indexOf("Firefox")>=0&&t.top!==t)&&-1===t.navigator.userAgent.search(/CriOS/),mediaquery:e.mobile.media("only all"),cssPseudoElement:!!a("content"),touchOverflow:!!a("overflowScrolling"),cssTransform3d:s(),boxShadow:!!a("boxShadow")&&!b,fixedPosition:c(),scrollTop:("pageXOffset"in t||"scrollTop"in i.documentElement||"scrollTop"in h[0])&&!m&&!g,dynamicBaseTag:r(),cssPointerEvents:l(),boundingRect:d()}),h.remove();var v=function(){var e=t.navigator.userAgent;return e.indexOf("Nokia")>-1&&(e.indexOf("Symbian/3")>-1||e.indexOf("Series60/5")>-1)&&e.indexOf("AppleWebKit")>-1&&e.match(/(BrowserNG|NokiaBrowser)\/7\.[0-3]/)}();e.mobile.gradeA=function(){return(e.support.mediaquery||e.mobile.browser.oldIE&&e.mobile.browser.oldIE>=7)&&(e.support.boundingRect||null!==e.fn.jquery.match(/1\.[0-7+]\.[0-9+]?/))},e.mobile.ajaxBlacklist=t.blackberry&&!t.WebKitPoint||g||v,v&&e(function(){e("head link[rel='stylesheet']").attr("rel","alternate stylesheet").attr("rel","stylesheet")}),e.support.boxShadow||e("html").addClass("ui-mobile-nosupport-boxshadow")}(e),function(e,t){var i,n=e.mobile.window;e.event.special.navigate=i={bound:!1,pushStateEnabled:!0,originalEventName:t,isPushStateEnabled:function(){return e.support.pushState&&e.mobile.pushStateEnabled===!0&&this.isHashChangeEnabled()},isHashChangeEnabled:function(){return e.mobile.hashListeningEnabled===!0},popstate:function(t){var i=new e.Event("navigate"),a=new e.Event("beforenavigate"),o=t.originalEvent.state||{};location.href,n.trigger(a),a.isDefaultPrevented()||(t.historyState&&e.extend(o,t.historyState),i.originalEvent=t,setTimeout(function(){n.trigger(i,{state:o})},0))},hashchange:function(t){var i=new e.Event("navigate"),a=new e.Event("beforenavigate");n.trigger(a),a.isDefaultPrevented()||(i.originalEvent=t,n.trigger(i,{state:t.hashchangeState||{}}))},setup:function(){i.bound||(i.bound=!0,i.isPushStateEnabled()?(i.originalEventName="popstate",n.bind("popstate.navigate",i.popstate)):i.isHashChangeEnabled()&&(i.originalEventName="hashchange",n.bind("hashchange.navigate",i.hashchange)))}}}(e),function(e,i){var n,a,o="&ui-state=dialog";e.mobile.path=n={uiStateKey:"&ui-state",urlParseRE:/^\s*(((([^:\/#\?]+:)?(?:(\/\/)((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/,getLocation:function(e){var t=e?this.parseUrl(e):location,i=this.parseUrl(e||location.href).hash;return i="#"===i?"":i,t.protocol+"//"+t.host+t.pathname+t.search+i},parseLocation:function(){return this.parseUrl(this.getLocation())},parseUrl:function(t){if("object"===e.type(t))return t;var i=n.urlParseRE.exec(t||"")||[];return{href:i[0]||"",hrefNoHash:i[1]||"",hrefNoSearch:i[2]||"",domain:i[3]||"",protocol:i[4]||"",doubleSlash:i[5]||"",authority:i[6]||"",username:i[8]||"",password:i[9]||"",host:i[10]||"",hostname:i[11]||"",port:i[12]||"",pathname:i[13]||"",directory:i[14]||"",filename:i[15]||"",search:i[16]||"",hash:i[17]||""}},makePathAbsolute:function(e,t){if(e&&"/"===e.charAt(0))return e;e=e||"",t=t?t.replace(/^\/|(\/[^\/]*|[^\/]+)$/g,""):"";for(var i=t?t.split("/"):[],n=e.split("/"),a=0;n.length>a;a++){var o=n[a];switch(o){case".":break;case"..":i.length&&i.pop();break;default:i.push(o)}}return"/"+i.join("/")},isSameDomain:function(e,t){return n.parseUrl(e).domain===n.parseUrl(t).domain},isRelativeUrl:function(e){return""===n.parseUrl(e).protocol},isAbsoluteUrl:function(e){return""!==n.parseUrl(e).protocol},makeUrlAbsolute:function(e,t){if(!n.isRelativeUrl(e))return e;t===i&&(t=this.documentBase);var a=n.parseUrl(e),o=n.parseUrl(t),s=a.protocol||o.protocol,r=a.protocol?a.doubleSlash:a.doubleSlash||o.doubleSlash,l=a.authority||o.authority,d=""!==a.pathname,c=n.makePathAbsolute(a.pathname||o.filename,o.pathname),h=a.search||!d&&o.search||"",u=a.hash;return s+r+l+c+h+u},addSearchParams:function(t,i){var a=n.parseUrl(t),o="object"==typeof i?e.param(i):i,s=a.search||"?";return a.hrefNoSearch+s+("?"!==s.charAt(s.length-1)?"&":"")+o+(a.hash||"")},convertUrlToDataUrl:function(e){var i=n.parseUrl(e);return n.isEmbeddedPage(i)?i.hash.split(o)[0].replace(/^#/,"").replace(/\?.*$/,""):n.isSameDomain(i,this.documentBase)?i.hrefNoHash.replace(this.documentBase.domain,"").split(o)[0]:t.decodeURIComponent(e)},get:function(e){return e===i&&(e=n.parseLocation().hash),n.stripHash(e).replace(/[^\/]*\.[^\/*]+$/,"")},set:function(e){location.hash=e},isPath:function(e){return/\//.test(e)},clean:function(e){return e.replace(this.documentBase.domain,"")},stripHash:function(e){return e.replace(/^#/,"")},stripQueryParams:function(e){return e.replace(/\?.*$/,"")},cleanHash:function(e){return n.stripHash(e.replace(/\?.*$/,"").replace(o,""))},isHashValid:function(e){return/^#[^#]+$/.test(e)},isExternal:function(e){var t=n.parseUrl(e);return t.protocol&&t.domain!==this.documentUrl.domain?!0:!1},hasProtocol:function(e){return/^(:?\w+:)/.test(e)},isEmbeddedPage:function(e){var t=n.parseUrl(e);return""!==t.protocol?!this.isPath(t.hash)&&t.hash&&(t.hrefNoHash===this.documentUrl.hrefNoHash||this.documentBaseDiffers&&t.hrefNoHash===this.documentBase.hrefNoHash):/^#/.test(t.href)},squash:function(e,t){var i,a,o,s,r=this.isPath(e),l=this.parseUrl(e),d=l.hash,c="";return t=t||(n.isPath(e)?n.getLocation():n.getDocumentUrl()),a=r?n.stripHash(e):e,a=n.isPath(l.hash)?n.stripHash(l.hash):a,s=a.indexOf(this.uiStateKey),s>-1&&(c=a.slice(s),a=a.slice(0,s)),i=n.makeUrlAbsolute(a,t),o=this.parseUrl(i).search,r?((n.isPath(d)||0===d.replace("#","").indexOf(this.uiStateKey))&&(d=""),c&&-1===d.indexOf(this.uiStateKey)&&(d+=c),-1===d.indexOf("#")&&""!==d&&(d="#"+d),i=n.parseUrl(i),i=i.protocol+"//"+i.host+i.pathname+o+d):i+=i.indexOf("#")>-1?c:"#"+c,i},isPreservableHash:function(e){return 0===e.replace("#","").indexOf(this.uiStateKey)}},n.documentUrl=n.parseLocation(),a=e("head").find("base"),n.documentBase=a.length?n.parseUrl(n.makeUrlAbsolute(a.attr("href"),n.documentUrl.href)):n.documentUrl,n.documentBaseDiffers=n.documentUrl.hrefNoHash!==n.documentBase.hrefNoHash,n.getDocumentUrl=function(t){return t?e.extend({},n.documentUrl):n.documentUrl.href},n.getDocumentBase=function(t){return t?e.extend({},n.documentBase):n.documentBase.href}}(e),function(e,t){e.mobile.path,e.mobile.History=function(e,t){this.stack=e||[],this.activeIndex=t||0},e.extend(e.mobile.History.prototype,{getActive:function(){return this.stack[this.activeIndex]},getLast:function(){return this.stack[this.previousIndex]},getNext:function(){return this.stack[this.activeIndex+1]},getPrev:function(){return this.stack[this.activeIndex-1]},add:function(e,t){t=t||{},this.getNext()&&this.clearForward(),t.hash&&-1===t.hash.indexOf("#")&&(t.hash="#"+t.hash),t.url=e,this.stack.push(t),this.activeIndex=this.stack.length-1},clearForward:function(){this.stack=this.stack.slice(0,this.activeIndex+1)},find:function(e,t,i){t=t||this.stack;var n,a,o,s=t.length;for(a=0;s>a;a++)if(n=t[a],(decodeURIComponent(e)===decodeURIComponent(n.url)||decodeURIComponent(e)===decodeURIComponent(n.hash))&&(o=a,i))return o;return o},closest:function(e){var i,n=this.activeIndex;return i=this.find(e,this.stack.slice(0,n)),i===t&&(i=this.find(e,this.stack.slice(n),!0),i=i===t?i:i+n),i},direct:function(i){var n=this.closest(i.url),a=this.activeIndex;n!==t&&(this.activeIndex=n,this.previousIndex=a),a>n?(i.present||i.back||e.noop)(this.getActive(),"back"):n>a?(i.present||i.forward||e.noop)(this.getActive(),"forward"):n===t&&i.missing&&i.missing(this.getActive())}})}(e),function(e){var a=e.mobile.path,o=location.href;e.mobile.Navigator=function(t){this.history=t,this.ignoreInitialHashChange=!0,e.mobile.window.bind({"popstate.history":e.proxy(this.popstate,this),"hashchange.history":e.proxy(this.hashchange,this)})},e.extend(e.mobile.Navigator.prototype,{squash:function(n,o){var s,r,l=a.isPath(n)?a.stripHash(n):n;return r=a.squash(n),s=e.extend({hash:l,url:r},o),t.history.replaceState(s,s.title||i.title,r),s},hash:function(e,t){var i,n,o;if(i=a.parseUrl(e),n=a.parseLocation(),n.pathname+n.search===i.pathname+i.search)o=i.hash?i.hash:i.pathname+i.search;else if(a.isPath(e)){var s=a.parseUrl(t);o=s.pathname+s.search+(a.isPreservableHash(s.hash)?s.hash.replace("#",""):"")}else o=e;return o},go:function(n,o,s){var r,l,d,c,h=e.event.special.navigate.isPushStateEnabled();l=a.squash(n),d=this.hash(n,l),s&&d!==a.stripHash(a.parseLocation().hash)&&(this.preventNextHashChange=s),this.preventHashAssignPopState=!0,t.location.hash=d,this.preventHashAssignPopState=!1,r=e.extend({url:l,hash:d,title:i.title},o),h&&(c=new e.Event("popstate"),c.originalEvent={type:"popstate",state:null},this.squash(n,r),s||(this.ignorePopState=!0,e.mobile.window.trigger(c))),this.history.add(r.url,r)},popstate:function(t){var i,s;if(e.event.special.navigate.isPushStateEnabled())return this.preventHashAssignPopState?(this.preventHashAssignPopState=!1,t.stopImmediatePropagation(),n):this.ignorePopState?(this.ignorePopState=!1,n):!t.originalEvent.state&&1===this.history.stack.length&&this.ignoreInitialHashChange&&(this.ignoreInitialHashChange=!1,location.href===o)?(t.preventDefault(),n):(i=a.parseLocation().hash,!t.originalEvent.state&&i?(s=this.squash(i),this.history.add(s.url,s),t.historyState=s,n):(this.history.direct({url:(t.originalEvent.state||{}).url||i,present:function(i,n){t.historyState=e.extend({},i),t.historyState.direction=n}}),n))},hashchange:function(t){var o,s;if(e.event.special.navigate.isHashChangeEnabled()&&!e.event.special.navigate.isPushStateEnabled()){if(this.preventNextHashChange)return this.preventNextHashChange=!1,t.stopImmediatePropagation(),n;o=this.history,s=a.parseLocation().hash,this.history.direct({url:s,present:function(i,n){t.hashchangeState=e.extend({},i),t.hashchangeState.direction=n},missing:function(){o.add(s,{hash:s,title:i.title})}})}}})}(e),function(e){e.mobile.navigate=function(t,i,n){e.mobile.navigate.navigator.go(t,i,n)},e.mobile.navigate.history=new e.mobile.History,e.mobile.navigate.navigator=new e.mobile.Navigator(e.mobile.navigate.history);var t=e.mobile.path.parseLocation();e.mobile.navigate.history.add(t.href,{hash:t.hash})}(e),function(e,t,i,n){function a(e){for(;e&&e.originalEvent!==n;)e=e.originalEvent;return e}function o(t,i){var o,s,r,l,d,c,h,u,p,m=t.type;if(t=e.Event(t),t.type=i,o=t.originalEvent,s=e.event.props,m.search(/^(mouse|click)/)>-1&&(s=q),o)for(h=s.length,l;h;)l=s[--h],t[l]=o[l];if(m.search(/mouse(down|up)|click/)>-1&&!t.which&&(t.which=1),-1!==m.search(/^touch/)&&(r=a(o),m=r.touches,d=r.changedTouches,c=m&&m.length?m[0]:d&&d.length?d[0]:n))for(u=0,p=k.length;p>u;u++)l=k[u],t[l]=c[l];return t}function s(t){for(var i,n,a={};t;){i=e.data(t,T);for(n in i)i[n]&&(a[n]=a.hasVirtualBinding=!0);t=t.parentNode}return a}function r(t,i){for(var n;t;){if(n=e.data(t,T),n&&(!i||n[i]))return t;t=t.parentNode}return null}function l(){M=!1}function d(){M=!0}function c(){U=0,O.length=0,H=!1,d()}function h(){l()}function u(){p(),S=setTimeout(function(){S=0,c()},e.vmouse.resetTimerDuration)}function p(){S&&(clearTimeout(S),S=0)}function m(t,i,n){var a;return(n&&n[t]||!n&&r(i.target,t))&&(a=o(i,t),e(i.target).trigger(a)),a}function f(t){var i=e.data(t.target,D);if(!(H||U&&U===i)){var n=m("v"+t.type,t);n&&(n.isDefaultPrevented()&&t.preventDefault(),n.isPropagationStopped()&&t.stopPropagation(),n.isImmediatePropagationStopped()&&t.stopImmediatePropagation())}}function g(t){var i,n,o=a(t).touches;if(o&&1===o.length&&(i=t.target,n=s(i),n.hasVirtualBinding)){U=L++,e.data(i,D,U),p(),h(),I=!1;var r=a(t).touches[0];A=r.pageX,N=r.pageY,m("vmouseover",t,n),m("vmousedown",t,n)}}function b(e){M||(I||m("vmousecancel",e,s(e.target)),I=!0,u())}function v(t){if(!M){var i=a(t).touches[0],n=I,o=e.vmouse.moveDistanceThreshold,r=s(t.target);I=I||Math.abs(i.pageX-A)>o||Math.abs(i.pageY-N)>o,I&&!n&&m("vmousecancel",t,r),m("vmousemove",t,r),u()}}function _(e){if(!M){d();var t,i=s(e.target);if(m("vmouseup",e,i),!I){var n=m("vclick",e,i);n&&n.isDefaultPrevented()&&(t=a(e).changedTouches[0],O.push({touchID:U,x:t.clientX,y:t.clientY}),H=!0)}m("vmouseout",e,i),I=!1,u()}}function C(t){var i,n=e.data(t,T);if(n)for(i in n)if(n[i])return!0;return!1}function x(){}function y(t){var i=t.substr(1);return{setup:function(){C(this)||e.data(this,T,{});var n=e.data(this,T);n[t]=!0,j[t]=(j[t]||0)+1,1===j[t]&&B.bind(i,f),e(this).bind(i,x),F&&(j.touchstart=(j.touchstart||0)+1,1===j.touchstart&&B.bind("touchstart",g).bind("touchend",_).bind("touchmove",v).bind("scroll",b))},teardown:function(){--j[t],j[t]||B.unbind(i,f),F&&(--j.touchstart,j.touchstart||B.unbind("touchstart",g).unbind("touchmove",v).unbind("touchend",_).unbind("scroll",b));var n=e(this),a=e.data(this,T);a&&(a[t]=!1),n.unbind(i,x),C(this)||n.removeData(T)}}}var w,T="virtualMouseBindings",D="virtualTouchID",P="vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "),k="clientX clientY pageX pageY screenX screenY".split(" "),E=e.event.mouseHooks?e.event.mouseHooks.props:[],q=e.event.props.concat(E),j={},S=0,A=0,N=0,I=!1,O=[],H=!1,M=!1,F="addEventListener"in i,B=e(i),L=1,U=0;e.vmouse={moveDistanceThreshold:10,clickDistanceThreshold:10,resetTimerDuration:1500};for(var z=0;P.length>z;z++)e.event.special[P[z]]=y(P[z]);F&&i.addEventListener("click",function(t){var i,a,o,s,r,l,d=O.length,c=t.target;if(d)for(i=t.clientX,a=t.clientY,w=e.vmouse.clickDistanceThreshold,o=c;o;){for(s=0;d>s;s++)if(r=O[s],l=0,o===c&&w>Math.abs(r.x-i)&&w>Math.abs(r.y-a)||e.data(o,D)===r.touchID)return t.preventDefault(),t.stopPropagation(),n;o=o.parentNode}},!0)}(e,t,i),function(e,t,n){function a(t,i,n){var a=n.type;n.type=i,e.event.dispatch.call(t,n),n.type=a}var o=e(i);e.each("touchstart touchmove touchend tap taphold swipe swipeleft swiperight scrollstart scrollstop".split(" "),function(t,i){e.fn[i]=function(e){return e?this.bind(i,e):this.trigger(i)},e.attrFn&&(e.attrFn[i]=!0)});var s=e.mobile.support.touch,r="touchmove scroll",l=s?"touchstart":"mousedown",d=s?"touchend":"mouseup",c=s?"touchmove":"mousemove";e.event.special.scrollstart={enabled:!0,setup:function(){function t(e,t){i=t,a(o,i?"scrollstart":"scrollstop",e)}var i,n,o=this,s=e(o);s.bind(r,function(a){e.event.special.scrollstart.enabled&&(i||t(a,!0),clearTimeout(n),n=setTimeout(function(){t(a,!1)},50))})}},e.event.special.tap={tapholdThreshold:750,setup:function(){var t=this,i=e(t);i.bind("vmousedown",function(n){function s(){clearTimeout(d)}function r(){s(),i.unbind("vclick",l).unbind("vmouseup",s),o.unbind("vmousecancel",r)}function l(e){r(),c===e.target&&a(t,"tap",e)}if(n.which&&1!==n.which)return!1;var d,c=n.target;n.originalEvent,i.bind("vmouseup",s).bind("vclick",l),o.bind("vmousecancel",r),d=setTimeout(function(){a(t,"taphold",e.Event("taphold",{target:c}))
},e.event.special.tap.tapholdThreshold)})}},e.event.special.swipe={scrollSupressionThreshold:30,durationThreshold:1e3,horizontalDistanceThreshold:30,verticalDistanceThreshold:75,start:function(t){var i=t.originalEvent.touches?t.originalEvent.touches[0]:t;return{time:(new Date).getTime(),coords:[i.pageX,i.pageY],origin:e(t.target)}},stop:function(e){var t=e.originalEvent.touches?e.originalEvent.touches[0]:e;return{time:(new Date).getTime(),coords:[t.pageX,t.pageY]}},handleSwipe:function(t,i){i.time-t.time<e.event.special.swipe.durationThreshold&&Math.abs(t.coords[0]-i.coords[0])>e.event.special.swipe.horizontalDistanceThreshold&&Math.abs(t.coords[1]-i.coords[1])<e.event.special.swipe.verticalDistanceThreshold&&t.origin.trigger("swipe").trigger(t.coords[0]>i.coords[0]?"swipeleft":"swiperight")},setup:function(){var t=this,i=e(t);i.bind(l,function(t){function a(t){s&&(o=e.event.special.swipe.stop(t),Math.abs(s.coords[0]-o.coords[0])>e.event.special.swipe.scrollSupressionThreshold&&t.preventDefault())}var o,s=e.event.special.swipe.start(t);i.bind(c,a).one(d,function(){i.unbind(c,a),s&&o&&e.event.special.swipe.handleSwipe(s,o),s=o=n})})}},e.each({scrollstop:"scrollstart",taphold:"tap",swipeleft:"swipe",swiperight:"swipe"},function(t,i){e.event.special[t]={setup:function(){e(this).bind(i,e.noop)}}})}(e,this),function(e){e.event.special.throttledresize={setup:function(){e(this).bind("resize",o)},teardown:function(){e(this).unbind("resize",o)}};var t,i,n,a=250,o=function(){i=(new Date).getTime(),n=i-s,n>=a?(s=i,e(this).trigger("throttledresize")):(t&&clearTimeout(t),t=setTimeout(o,a-n))},s=0}(e),function(e,t){function a(){var e=o();e!==s&&(s=e,d.trigger(c))}var o,s,r,l,d=e(t),c="orientationchange",h={0:!0,180:!0};if(e.support.orientation){var u=t.innerWidth||d.width(),p=t.innerHeight||d.height(),m=50;r=u>p&&u-p>m,l=h[t.orientation],(r&&l||!r&&!l)&&(h={"-90":!0,90:!0})}e.event.special.orientationchange=e.extend({},e.event.special.orientationchange,{setup:function(){return e.support.orientation&&!e.event.special.orientationchange.disabled?!1:(s=o(),d.bind("throttledresize",a),n)},teardown:function(){return e.support.orientation&&!e.event.special.orientationchange.disabled?!1:(d.unbind("throttledresize",a),n)},add:function(e){var t=e.handler;e.handler=function(e){return e.orientation=o(),t.apply(this,arguments)}}}),e.event.special.orientationchange.orientation=o=function(){var n=!0,a=i.documentElement;return n=e.support.orientation?h[t.orientation]:a&&1.1>a.clientWidth/a.clientHeight,n?"portrait":"landscape"},e.fn[c]=function(e){return e?this.bind(c,e):this.trigger(c)},e.attrFn&&(e.attrFn[c]=!0)}(e,this),function(e){e.widget("mobile.page",e.mobile.widget,{options:{theme:"c",domCache:!1,keepNativeDefault:":jqmData(role='none'), :jqmData(role='nojs')"},_create:function(){return this._trigger("beforecreate")===!1?!1:(this.element.attr("tabindex","0").addClass("ui-page ui-body-"+this.options.theme),this._on(this.element,{pagebeforehide:"removeContainerBackground",pagebeforeshow:"_handlePageBeforeShow"}),n)},_handlePageBeforeShow:function(){this.setContainerBackground()},removeContainerBackground:function(){e.mobile.pageContainer.removeClass("ui-overlay-"+e.mobile.getInheritedTheme(this.element.parent()))},setContainerBackground:function(t){this.options.theme&&e.mobile.pageContainer.addClass("ui-overlay-"+(t||this.options.theme))},keepNativeSelector:function(){var t=this.options,i=t.keepNative&&e.trim(t.keepNative);return i&&t.keepNative!==t.keepNativeDefault?[t.keepNative,t.keepNativeDefault].join(", "):t.keepNativeDefault}})}(e),function(e,t,i){var n=function(n){return n===i&&(n=!0),function(i,a,o,s){var r=new e.Deferred,l=a?" reverse":"",d=e.mobile.urlHistory.getActive(),c=d.lastScroll||e.mobile.defaultHomeScroll,h=e.mobile.getScreenHeight(),u=e.mobile.maxTransitionWidth!==!1&&e.mobile.window.width()>e.mobile.maxTransitionWidth,p=!e.support.cssTransitions||u||!i||"none"===i||Math.max(e.mobile.window.scrollTop(),c)>e.mobile.getMaxScrollForTransition(),m=" ui-page-pre-in",f=function(){e.mobile.pageContainer.toggleClass("ui-mobile-viewport-transitioning viewport-"+i)},g=function(){e.event.special.scrollstart.enabled=!1,t.scrollTo(0,c),setTimeout(function(){e.event.special.scrollstart.enabled=!0},150)},b=function(){s.removeClass(e.mobile.activePageClass+" out in reverse "+i).height("")},v=function(){n?s.animationComplete(_):_(),s.height(h+e.mobile.window.scrollTop()).addClass(i+" out"+l)},_=function(){s&&n&&b(),C()},C=function(){o.css("z-index",-10),o.addClass(e.mobile.activePageClass+m),e.mobile.focusPage(o),o.height(h+c),g(),o.css("z-index",""),p||o.animationComplete(x),o.removeClass(m).addClass(i+" in"+l),p&&x()},x=function(){n||s&&b(),o.removeClass("out in reverse "+i).height(""),f(),e.mobile.window.scrollTop()!==c&&g(),r.resolve(i,a,o,s,!0)};return f(),s&&!p?v():_(),r.promise()}},a=n(),o=n(!1),s=function(){return 3*e.mobile.getScreenHeight()};e.mobile.defaultTransitionHandler=a,e.mobile.transitionHandlers={"default":e.mobile.defaultTransitionHandler,sequential:a,simultaneous:o},e.mobile.transitionFallbacks={},e.mobile._maybeDegradeTransition=function(t){return t&&!e.support.cssTransform3d&&e.mobile.transitionFallbacks[t]&&(t=e.mobile.transitionFallbacks[t]),t},e.mobile.getMaxScrollForTransition=e.mobile.getMaxScrollForTransition||s}(e,this),function(e,n){function a(t){!f||f.closest("."+e.mobile.activePageClass).length&&!t||f.removeClass(e.mobile.activeBtnClass),f=null}function o(){_=!1,v.length>0&&e.mobile.changePage.apply(null,v.pop())}function s(t,i,n,a){i&&i.data("mobile-page")._trigger("beforehide",null,{nextPage:t}),t.data("mobile-page")._trigger("beforeshow",null,{prevPage:i||e("")}),e.mobile.hidePageLoadingMsg(),n=e.mobile._maybeDegradeTransition(n);var o=e.mobile.transitionHandlers[n||"default"]||e.mobile.defaultTransitionHandler,s=o(n,a,t,i);return s.done(function(){i&&i.data("mobile-page")._trigger("hide",null,{nextPage:t}),t.data("mobile-page")._trigger("show",null,{prevPage:i||e("")})}),s}function r(t,i){i&&t.attr("data-"+e.mobile.ns+"role",i),t.page()}function l(){var t=e.mobile.activePage&&c(e.mobile.activePage);return t||w.hrefNoHash}function d(e){for(;e&&("string"!=typeof e.nodeName||"a"!==e.nodeName.toLowerCase());)e=e.parentNode;return e}function c(t){var i=e(t).closest(".ui-page").jqmData("url"),n=w.hrefNoHash;return i&&p.isPath(i)||(i=n),p.makeUrlAbsolute(i,n)}var h=e.mobile.window,u=(e("html"),e("head")),p=e.extend(e.mobile.path,{getFilePath:function(t){var i="&"+e.mobile.subPageUrlKey;return t&&t.split(i)[0].split(C)[0]},isFirstPageUrl:function(t){var i=p.parseUrl(p.makeUrlAbsolute(t,this.documentBase)),a=i.hrefNoHash===this.documentUrl.hrefNoHash||this.documentBaseDiffers&&i.hrefNoHash===this.documentBase.hrefNoHash,o=e.mobile.firstPage,s=o&&o[0]?o[0].id:n;return a&&(!i.hash||"#"===i.hash||s&&i.hash.replace(/^#/,"")===s)},isPermittedCrossDomainRequest:function(t,i){return e.mobile.allowCrossDomainPages&&"file:"===t.protocol&&-1!==i.search(/^https?:/)}}),m=null,f=null,g=e.Deferred(),b=e.mobile.navigate.history,v=[],_=!1,C="&ui-state=dialog",x=u.children("base"),y=p.documentUrl,w=p.documentBase,T=(p.documentBaseDiffers,e.mobile.getScreenHeight),D=e.support.dynamicBaseTag?{element:x.length?x:e("<base>",{href:w.hrefNoHash}).prependTo(u),set:function(e){e=p.parseUrl(e).hrefNoHash,D.element.attr("href",p.makeUrlAbsolute(e,w))},reset:function(){D.element.attr("href",w.hrefNoSearch)}}:n;e.mobile.getDocumentUrl=p.getDocumentUrl,e.mobile.getDocumentBase=p.getDocumentBase,e.mobile.back=function(){var e=t.navigator;this.phonegapNavigationEnabled&&e&&e.app&&e.app.backHistory?e.app.backHistory():t.history.back()},e.mobile.focusPage=function(e){var t=e.find("[autofocus]"),i=e.find(".ui-title:eq(0)");return t.length?(t.focus(),n):(i.length?i.focus():e.focus(),n)};var P,k,E=!0;P=function(){if(E){var t=e.mobile.urlHistory.getActive();if(t){var i=h.scrollTop();t.lastScroll=e.mobile.minScrollBack>i?e.mobile.defaultHomeScroll:i}}},k=function(){setTimeout(P,100)},h.bind(e.support.pushState?"popstate":"hashchange",function(){E=!1}),h.one(e.support.pushState?"popstate":"hashchange",function(){E=!0}),h.one("pagecontainercreate",function(){e.mobile.pageContainer.bind("pagechange",function(){E=!0,h.unbind("scrollstop",k),h.bind("scrollstop",k)})}),h.bind("scrollstop",k),e.mobile._maybeDegradeTransition=e.mobile._maybeDegradeTransition||function(e){return e},e.mobile.resetActivePageHeight=function(t){var i=e("."+e.mobile.activePageClass),n=parseFloat(i.css("padding-top")),a=parseFloat(i.css("padding-bottom")),o=parseFloat(i.css("border-top-width")),s=parseFloat(i.css("border-bottom-width"));t="number"==typeof t?t:T(),i.css("min-height",t-n-a-o-s)},e.fn.animationComplete=function(t){return e.support.cssTransitions?e(this).one("webkitAnimationEnd animationend",t):(setTimeout(t,0),e(this))},e.mobile.path=p,e.mobile.base=D,e.mobile.urlHistory=b,e.mobile.dialogHashKey=C,e.mobile.allowCrossDomainPages=!1,e.mobile._bindPageRemove=function(){var t=e(this);!t.data("mobile-page").options.domCache&&t.is(":jqmData(external-page='true')")&&t.bind("pagehide.remove",function(){var t=e(this),i=new e.Event("pageremove");t.trigger(i),i.isDefaultPrevented()||t.removeWithDependents()})},e.mobile.loadPage=function(t,i){var a=e.Deferred(),o=e.extend({},e.mobile.loadPage.defaults,i),s=null,d=null,c=p.makeUrlAbsolute(t,l());o.data&&"get"===o.type&&(c=p.addSearchParams(c,o.data),o.data=n),o.data&&"post"===o.type&&(o.reloadPage=!0);var h=p.getFilePath(c),u=p.convertUrlToDataUrl(c);if(o.pageContainer=o.pageContainer||e.mobile.pageContainer,s=o.pageContainer.children("[data-"+e.mobile.ns+"url='"+u+"']"),0===s.length&&u&&!p.isPath(u)&&(s=o.pageContainer.children("#"+u).attr("data-"+e.mobile.ns+"url",u).jqmData("url",u)),0===s.length)if(e.mobile.firstPage&&p.isFirstPageUrl(h))e.mobile.firstPage.parent().length&&(s=e(e.mobile.firstPage));else if(p.isEmbeddedPage(h))return a.reject(c,i),a.promise();if(s.length){if(!o.reloadPage)return r(s,o.role),a.resolve(c,i,s),D&&!i.prefetch&&D.set(t),a.promise();d=s}var m=o.pageContainer,f=new e.Event("pagebeforeload"),g={url:t,absUrl:c,dataUrl:u,deferred:a,options:o};if(m.trigger(f,g),f.isDefaultPrevented())return a.promise();if(o.showLoadMsg)var b=setTimeout(function(){e.mobile.showPageLoadingMsg()},o.loadMsgDelay),v=function(){clearTimeout(b),e.mobile.hidePageLoadingMsg()};return D&&i.prefetch===n&&D.reset(),e.mobile.allowCrossDomainPages||p.isSameDomain(y,c)?e.ajax({url:h,type:o.type,data:o.data,contentType:o.contentType,dataType:"html",success:function(l,m,f){var b=e("<div></div>"),_=l.match(/<title[^>]*>([^<]*)/)&&RegExp.$1,C=RegExp("(<[^>]+\\bdata-"+e.mobile.ns+"role=[\"']?page[\"']?[^>]*>)"),x=RegExp("\\bdata-"+e.mobile.ns+"url=[\"']?([^\"'>]*)[\"']?");if(C.test(l)&&RegExp.$1&&x.test(RegExp.$1)&&RegExp.$1&&(t=h=p.getFilePath(e("<div>"+RegExp.$1+"</div>").text())),D&&i.prefetch===n&&D.set(h),b.get(0).innerHTML=l,s=b.find(":jqmData(role='page'), :jqmData(role='dialog')").first(),s.length||(s=e("<div data-"+e.mobile.ns+"role='page'>"+(l.split(/<\/?body[^>]*>/gim)[1]||"")+"</div>")),_&&!s.jqmData("title")&&(~_.indexOf("&")&&(_=e("<div>"+_+"</div>").text()),s.jqmData("title",_)),!e.support.dynamicBaseTag){var y=p.get(h);s.find("[src], link[href], a[rel='external'], :jqmData(ajax='false'), a[target]").each(function(){var t=e(this).is("[href]")?"href":e(this).is("[src]")?"src":"action",i=e(this).attr(t);i=i.replace(location.protocol+"//"+location.host+location.pathname,""),/^(\w+:|#|\/)/.test(i)||e(this).attr(t,y+i)})}s.attr("data-"+e.mobile.ns+"url",p.convertUrlToDataUrl(h)).attr("data-"+e.mobile.ns+"external-page",!0).appendTo(o.pageContainer),s.one("pagecreate",e.mobile._bindPageRemove),r(s,o.role),c.indexOf("&"+e.mobile.subPageUrlKey)>-1&&(s=o.pageContainer.children("[data-"+e.mobile.ns+"url='"+u+"']")),o.showLoadMsg&&v(),g.xhr=f,g.textStatus=m,g.page=s,o.pageContainer.trigger("pageload",g),a.resolve(c,i,s,d)},error:function(t,n,s){D&&D.set(p.get()),g.xhr=t,g.textStatus=n,g.errorThrown=s;var r=new e.Event("pageloadfailed");o.pageContainer.trigger(r,g),r.isDefaultPrevented()||(o.showLoadMsg&&(v(),e.mobile.showPageLoadingMsg(e.mobile.pageLoadErrorMessageTheme,e.mobile.pageLoadErrorMessage,!0),setTimeout(e.mobile.hidePageLoadingMsg,1500)),a.reject(c,i))}}):a.reject(c,i),a.promise()},e.mobile.loadPage.defaults={type:"get",data:n,reloadPage:!1,role:n,showLoadMsg:!1,pageContainer:n,loadMsgDelay:50},e.mobile.changePage=function(t,d){if(_)return v.unshift(arguments),n;var c,h=e.extend({},e.mobile.changePage.defaults,d);h.pageContainer=h.pageContainer||e.mobile.pageContainer,h.fromPage=h.fromPage||e.mobile.activePage,c="string"==typeof t;var u=h.pageContainer,m=new e.Event("pagebeforechange"),f={toPage:t,options:h};if(f.absUrl=c?p.makeUrlAbsolute(t,l()):t.data("absUrl"),u.trigger(m,f),!m.isDefaultPrevented()){if(t=f.toPage,c="string"==typeof t,_=!0,c)return h.target=t,e.mobile.loadPage(t,h).done(function(t,i,n,a){_=!1,i.duplicateCachedPage=a,n.data("absUrl",f.absUrl),e.mobile.changePage(n,i)}).fail(function(){a(!0),o(),h.pageContainer.trigger("pagechangefailed",f)}),n;t[0]!==e.mobile.firstPage[0]||h.dataUrl||(h.dataUrl=y.hrefNoHash);var g=h.fromPage,x=h.dataUrl&&p.convertUrlToDataUrl(h.dataUrl)||t.jqmData("url"),w=x,T=(p.getFilePath(x),b.getActive()),D=0===b.activeIndex,P=0,k=i.title,E="dialog"===h.role||"dialog"===t.jqmData("role");if(g&&g[0]===t[0]&&!h.allowSamePageTransition)return _=!1,u.trigger("pagechange",f),h.fromHashChange&&b.direct({url:x}),n;r(t,h.role),h.fromHashChange&&(P="back"===d.direction?-1:1);try{i.activeElement&&"body"!==i.activeElement.nodeName.toLowerCase()?e(i.activeElement).blur():e("input:focus, textarea:focus, select:focus").blur()}catch(q){}var j=!1;E&&T&&(T.url&&T.url.indexOf(C)>-1&&e.mobile.activePage&&!e.mobile.activePage.is(".ui-dialog")&&b.activeIndex>0&&(h.changeHash=!1,j=!0),x=T.url||"",x+=!j&&x.indexOf("#")>-1?C:"#"+C,0===b.activeIndex&&x===b.initialDst&&(x+=C));var S=T?t.jqmData("title")||t.children(":jqmData(role='header')").find(".ui-title").text():k;if(S&&k===i.title&&(k=S),t.jqmData("title")||t.jqmData("title",k),h.transition=h.transition||(P&&!D?T.transition:n)||(E?e.mobile.defaultDialogTransition:e.mobile.defaultPageTransition),!P&&j&&(b.getActive().pageUrl=w),x&&!h.fromHashChange){var A;!p.isPath(x)&&0>x.indexOf("#")&&(x="#"+x),A={transition:h.transition,title:k,pageUrl:w,role:h.role},h.changeHash!==!1&&e.mobile.hashListeningEnabled?e.mobile.navigate(x,A,!0):t[0]!==e.mobile.firstPage[0]&&e.mobile.navigate.history.add(x,A)}i.title=k,e.mobile.activePage=t,h.reverse=h.reverse||0>P,s(t,g,h.transition,h.reverse).done(function(i,n,s,r,l){a(),h.duplicateCachedPage&&h.duplicateCachedPage.remove(),l||e.mobile.focusPage(t),o(),u.trigger("pagechange",f)})}},e.mobile.changePage.defaults={transition:n,reverse:!1,changeHash:!0,fromHashChange:!1,role:n,duplicateCachedPage:n,pageContainer:n,showLoadMsg:!0,dataUrl:n,fromPage:n,allowSamePageTransition:!1},e.mobile.navreadyDeferred=e.Deferred(),e.mobile._registerInternalEvents=function(){var i=function(t,i){var a,o,s,r,l=!0;return!e.mobile.ajaxEnabled||t.is(":jqmData(ajax='false')")||!t.jqmHijackable().length||t.attr("target")?!1:(a=t.attr("action"),r=(t.attr("method")||"get").toLowerCase(),a||(a=c(t),"get"===r&&(a=p.parseUrl(a).hrefNoSearch),a===w.hrefNoHash&&(a=y.hrefNoSearch)),a=p.makeUrlAbsolute(a,c(t)),p.isExternal(a)&&!p.isPermittedCrossDomainRequest(y,a)?!1:(i||(o=t.serializeArray(),m&&m[0].form===t[0]&&(s=m.attr("name"),s&&(e.each(o,function(e,t){return t.name===s?(s="",!1):n}),s&&o.push({name:s,value:m.attr("value")}))),l={url:a,options:{type:r,data:e.param(o),transition:t.jqmData("transition"),reverse:"reverse"===t.jqmData("direction"),reloadPage:!0}}),l))};e.mobile.document.delegate("form","submit",function(t){var n=i(e(this));n&&(e.mobile.changePage(n.url,n.options),t.preventDefault())}),e.mobile.document.bind("vclick",function(t){var n,o,s=t.target,r=!1;if(!(t.which>1)&&e.mobile.linkBindingEnabled){if(m=e(s),e.data(s,"mobile-button")){if(!i(e(s).closest("form"),!0))return;s.parentNode&&(s=s.parentNode)}else{if(s=d(s),!s||"#"===p.parseUrl(s.getAttribute("href")||"#").hash)return;if(!e(s).jqmHijackable().length)return}~s.className.indexOf("ui-link-inherit")?s.parentNode&&(o=e.data(s.parentNode,"buttonElements")):o=e.data(s,"buttonElements"),o?s=o.outer:r=!0,n=e(s),r&&(n=n.closest(".ui-btn")),n.length>0&&!n.hasClass("ui-disabled")&&(a(!0),f=n,f.addClass(e.mobile.activeBtnClass))}}),e.mobile.document.bind("click",function(i){if(e.mobile.linkBindingEnabled&&!i.isDefaultPrevented()){var o,s=d(i.target),r=e(s);if(s&&!(i.which>1)&&r.jqmHijackable().length){if(o=function(){t.setTimeout(function(){a(!0)},200)},r.is(":jqmData(rel='back')"))return e.mobile.back(),!1;var l=c(r),h=p.makeUrlAbsolute(r.attr("href")||"#",l);if(!e.mobile.ajaxEnabled&&!p.isEmbeddedPage(h))return o(),n;if(-1!==h.search("#")){if(h=h.replace(/[^#]*#/,""),!h)return i.preventDefault(),n;h=p.isPath(h)?p.makeUrlAbsolute(h,l):p.makeUrlAbsolute("#"+h,y.hrefNoHash)}var u=r.is("[rel='external']")||r.is(":jqmData(ajax='false')")||r.is("[target]"),m=u||p.isExternal(h)&&!p.isPermittedCrossDomainRequest(y,h);if(m)return o(),n;var f=r.jqmData("transition"),g="reverse"===r.jqmData("direction")||r.jqmData("back"),b=r.attr("data-"+e.mobile.ns+"rel")||n;e.mobile.changePage(h,{transition:f,reverse:g,role:b,link:r}),i.preventDefault()}}}),e.mobile.document.delegate(".ui-page","pageshow.prefetch",function(){var t=[];e(this).find("a:jqmData(prefetch)").each(function(){var i=e(this),n=i.attr("href");n&&-1===e.inArray(n,t)&&(t.push(n),e.mobile.loadPage(n,{role:i.attr("data-"+e.mobile.ns+"rel"),prefetch:!0}))})}),e.mobile._handleHashChange=function(i,a){var o=p.stripHash(i),s=0===e.mobile.urlHistory.stack.length?"none":n,r={changeHash:!1,fromHashChange:!0,reverse:"back"===a.direction};if(e.extend(r,a,{transition:(b.getLast()||{}).transition||s}),b.activeIndex>0&&o.indexOf(C)>-1&&b.initialDst!==o){if(e.mobile.activePage&&!e.mobile.activePage.is(".ui-dialog"))return"back"===a.direction?e.mobile.back():t.history.forward(),n;o=a.pageUrl;var l=e.mobile.urlHistory.getActive();e.extend(r,{role:l.role,transition:l.transition,reverse:"back"===a.direction})}o?(o=p.isPath(o)?o:p.makeUrlAbsolute("#"+o,w),o===p.makeUrlAbsolute("#"+b.initialDst,w)&&b.stack.length&&b.stack[0].url!==b.initialDst.replace(C,"")&&(o=e.mobile.firstPage),e.mobile.changePage(o,r)):e.mobile.changePage(e.mobile.firstPage,r)},h.bind("navigate",function(t,i){var n;t.originalEvent&&t.originalEvent.isDefaultPrevented()||(n=e.event.special.navigate.originalEventName.indexOf("hashchange")>-1?i.state.hash:i.state.url,n||(n=e.mobile.path.parseLocation().hash),n&&"#"!==n&&0!==n.indexOf("#"+e.mobile.path.uiStateKey)||(n=location.href),e.mobile._handleHashChange(n,i.state))}),e.mobile.document.bind("pageshow",e.mobile.resetActivePageHeight),e.mobile.window.bind("throttledresize",e.mobile.resetActivePageHeight)},e(function(){g.resolve()}),e.when(g,e.mobile.navreadyDeferred).done(function(){e.mobile._registerInternalEvents()})}(e),function(e){e.mobile.transitionFallbacks.flip="fade"}(e,this),function(e){e.mobile.transitionFallbacks.flow="fade"}(e,this),function(e){e.mobile.transitionFallbacks.pop="fade"}(e,this),function(e){e.mobile.transitionHandlers.slide=e.mobile.transitionHandlers.simultaneous,e.mobile.transitionFallbacks.slide="fade"}(e,this),function(e){e.mobile.transitionFallbacks.slidedown="fade"}(e,this),function(e){e.mobile.transitionFallbacks.slidefade="fade"}(e,this),function(e){e.mobile.transitionFallbacks.slideup="fade"}(e,this),function(e){e.mobile.transitionFallbacks.turn="fade"}(e,this),function(e){e.mobile.page.prototype.options.degradeInputs={color:!1,date:!1,datetime:!1,"datetime-local":!1,email:!1,month:!1,number:!1,range:"number",search:"text",tel:!1,time:!1,url:!1,week:!1},e.mobile.document.bind("pagecreate create",function(t){var i,n=e.mobile.closestPageData(e(t.target));n&&(i=n.options,e(t.target).find("input").not(n.keepNativeSelector()).each(function(){var t=e(this),n=this.getAttribute("type"),a=i.degradeInputs[n]||"text";if(i.degradeInputs[n]){var o=e("<div>").html(t.clone()).html(),s=o.indexOf(" type=")>-1,r=s?/\s+type=["']?\w+['"]?/:/\/?>/,l=' type="'+a+'" data-'+e.mobile.ns+'type="'+n+'"'+(s?"":">");t.replaceWith(o.replace(r,l))}}))})}(e),function(e){e.widget("mobile.dialog",e.mobile.widget,{options:{closeBtn:"left",closeBtnText:"Close",overlayTheme:"a",corners:!0,initSelector:":jqmData(role='dialog')"},_handlePageBeforeShow:function(){this._isCloseable=!0,this.options.overlayTheme&&this.element.page("removeContainerBackground").page("setContainerBackground",this.options.overlayTheme)},_create:function(){var t=this.element,i=this.options.corners?" ui-corner-all":"",n=e("<div/>",{role:"dialog","class":"ui-dialog-contain ui-overlay-shadow"+i});t.addClass("ui-dialog ui-overlay-"+this.options.overlayTheme),t.wrapInner(n),t.bind("vclick submit",function(t){var i,n=e(t.target).closest("vclick"===t.type?"a":"form");n.length&&!n.jqmData("transition")&&(i=e.mobile.urlHistory.getActive()||{},n.attr("data-"+e.mobile.ns+"transition",i.transition||e.mobile.defaultDialogTransition).attr("data-"+e.mobile.ns+"direction","reverse"))}),this._on(t,{pagebeforeshow:"_handlePageBeforeShow"}),e.extend(this,{_createComplete:!1}),this._setCloseBtn(this.options.closeBtn)},_setCloseBtn:function(t){var i,n,a=this;this._headerCloseButton&&(this._headerCloseButton.remove(),this._headerCloseButton=null),"none"!==t&&(n="left"===t?"left":"right",i=e("<a href='#' class='ui-btn-"+n+"' data-"+e.mobile.ns+"icon='delete' data-"+e.mobile.ns+"iconpos='notext'>"+this.options.closeBtnText+"</a>"),this.element.children().find(":jqmData(role='header')").first().prepend(i),this._createComplete&&e.fn.buttonMarkup&&i.buttonMarkup(),this._createComplete=!0,i.bind("click",function(){a.close()}),this._headerCloseButton=i)},_setOption:function(e,t){"closeBtn"===e&&this._setCloseBtn(t),this._super(e,t)},close:function(){var t,i,n=e.mobile.navigate.history;this._isCloseable&&(this._isCloseable=!1,e.mobile.hashListeningEnabled&&n.activeIndex>0?e.mobile.back():(t=Math.max(0,n.activeIndex-1),i=n.stack[t].pageUrl||n.stack[t].url,n.previousIndex=n.activeIndex,n.activeIndex=t,e.mobile.path.isPath(i)||(i=e.mobile.path.makeUrlAbsolute("#"+i)),e.mobile.changePage(i,{direction:"back",changeHash:!1,fromHashChange:!0})))}}),e.mobile.document.delegate(e.mobile.dialog.prototype.options.initSelector,"pagecreate",function(){e.mobile.dialog.prototype.enhance(this)})}(e,this),function(e){e.mobile.page.prototype.options.backBtnText="Back",e.mobile.page.prototype.options.addBackBtn=!1,e.mobile.page.prototype.options.backBtnTheme=null,e.mobile.page.prototype.options.headerTheme="a",e.mobile.page.prototype.options.footerTheme="a",e.mobile.page.prototype.options.contentTheme=null,e.mobile.document.bind("pagecreate",function(t){var i=e(t.target),n=i.data("mobile-page").options,a=i.jqmData("role"),o=n.theme;e(":jqmData(role='header'), :jqmData(role='footer'), :jqmData(role='content')",i).jqmEnhanceable().each(function(){var t,s,r,l,d=e(this),c=d.jqmData("role"),h=d.jqmData("theme"),u=h||n.contentTheme||"dialog"===a&&o;if(d.addClass("ui-"+c),"header"===c||"footer"===c){var p=h||("header"===c?n.headerTheme:n.footerTheme)||o;d.addClass("ui-bar-"+p).attr("role","header"===c?"banner":"contentinfo"),"header"===c&&(t=d.children("a, button"),s=t.hasClass("ui-btn-left"),r=t.hasClass("ui-btn-right"),s=s||t.eq(0).not(".ui-btn-right").addClass("ui-btn-left").length,r=r||t.eq(1).addClass("ui-btn-right").length),n.addBackBtn&&"header"===c&&e(".ui-page").length>1&&i.jqmData("url")!==e.mobile.path.stripHash(location.hash)&&!s&&(l=e("<a href='javascript:void(0);' class='ui-btn-left' data-"+e.mobile.ns+"rel='back' data-"+e.mobile.ns+"icon='arrow-l'>"+n.backBtnText+"</a>").attr("data-"+e.mobile.ns+"theme",n.backBtnTheme||p).prependTo(d)),d.children("h1, h2, h3, h4, h5, h6").addClass("ui-title").attr({role:"heading","aria-level":"1"})}else"content"===c&&(u&&d.addClass("ui-body-"+u),d.attr("role","main"))})})}(e),function(e,t){function n(e){for(var t;e&&(t="string"==typeof e.className&&e.className+" ",!(t&&t.indexOf("ui-btn ")>-1&&0>t.indexOf("ui-disabled ")));)e=e.parentNode;return e}function a(n,a,o,s,r){var l=e.data(n[0],"buttonElements");n.removeClass(a).addClass(o),l&&(l.bcls=e(i.createElement("div")).addClass(l.bcls+" "+o).removeClass(a).attr("class"),s!==t&&(l.hover=s),l.state=r)}var o=function(e,i){var n=e.getAttribute(i);return"true"===n?!0:"false"===n?!1:null===n?t:n};e.fn.buttonMarkup=function(n){var a,r=this,l="data-"+e.mobile.ns;n=n&&"object"===e.type(n)?n:{};for(var d=0;r.length>d;d++){var c,h,u,p,m,f,g=r.eq(d),b=g[0],v=e.extend({},e.fn.buttonMarkup.defaults,{icon:n.icon!==t?n.icon:o(b,l+"icon"),iconpos:n.iconpos!==t?n.iconpos:o(b,l+"iconpos"),theme:n.theme!==t?n.theme:o(b,l+"theme")||e.mobile.getInheritedTheme(g,"c"),inline:n.inline!==t?n.inline:o(b,l+"inline"),shadow:n.shadow!==t?n.shadow:o(b,l+"shadow"),corners:n.corners!==t?n.corners:o(b,l+"corners"),iconshadow:n.iconshadow!==t?n.iconshadow:o(b,l+"iconshadow"),mini:n.mini!==t?n.mini:o(b,l+"mini")},n),_="ui-btn-inner",C="ui-btn-text",x=!1,y="up";for(a in v)v[a]===t||null===v[a]?g.removeAttr(l+a):b.setAttribute(l+a,v[a]);for("popup"===o(b,l+"rel")&&g.attr("href")&&(b.setAttribute("aria-haspopup",!0),b.setAttribute("aria-owns",g.attr("href"))),f=e.data("INPUT"===b.tagName||"BUTTON"===b.tagName?b.parentNode:b,"buttonElements"),f?(b=f.outer,g=e(b),u=f.inner,p=f.text,e(f.icon).remove(),f.icon=null,x=f.hover,y=f.state):(u=i.createElement(v.wrapperEls),p=i.createElement(v.wrapperEls)),m=v.icon?i.createElement("span"):null,s&&!f&&s(),v.theme||(v.theme=e.mobile.getInheritedTheme(g,"c")),c="ui-btn ",c+=x?"ui-btn-hover-"+v.theme:"",c+=y?" ui-btn-"+y+"-"+v.theme:"",c+=v.shadow?" ui-shadow":"",c+=v.corners?" ui-btn-corner-all":"",v.mini!==t&&(c+=v.mini===!0?" ui-mini":" ui-fullsize"),v.inline!==t&&(c+=v.inline===!0?" ui-btn-inline":" ui-btn-block"),v.icon&&(v.icon="ui-icon-"+v.icon,v.iconpos=v.iconpos||"left",h="ui-icon "+v.icon,v.iconshadow&&(h+=" ui-icon-shadow")),v.iconpos&&(c+=" ui-btn-icon-"+v.iconpos,"notext"!==v.iconpos||g.attr("title")||g.attr("title",g.getEncodedText())),f&&g.removeClass(f.bcls||""),g.removeClass("ui-link").addClass(c),u.className=_,p.className=C,f||u.appendChild(p),m&&(m.className=h,f&&f.icon||(m.innerHTML="&#160;",u.appendChild(m)));b.firstChild&&!f;)p.appendChild(b.firstChild);f||b.appendChild(u),f={hover:x,state:y,bcls:c,outer:b,inner:u,text:p,icon:m},e.data(b,"buttonElements",f),e.data(u,"buttonElements",f),e.data(p,"buttonElements",f),m&&e.data(m,"buttonElements",f)}return this},e.fn.buttonMarkup.defaults={corners:!0,shadow:!0,iconshadow:!0,wrapperEls:"span"};var s=function(){var i,o,r=e.mobile.buttonMarkup.hoverDelay;e.mobile.document.bind({"vmousedown vmousecancel vmouseup vmouseover vmouseout focus blur scrollstart":function(s){var l,d=e(n(s.target)),c=s.originalEvent&&/^touch/.test(s.originalEvent.type),h=s.type;d.length&&(l=d.attr("data-"+e.mobile.ns+"theme"),"vmousedown"===h?c?i=setTimeout(function(){a(d,"ui-btn-up-"+l,"ui-btn-down-"+l,t,"down")},r):a(d,"ui-btn-up-"+l,"ui-btn-down-"+l,t,"down"):"vmousecancel"===h||"vmouseup"===h?a(d,"ui-btn-down-"+l,"ui-btn-up-"+l,t,"up"):"vmouseover"===h||"focus"===h?c?o=setTimeout(function(){a(d,"ui-btn-up-"+l,"ui-btn-hover-"+l,!0,"")},r):a(d,"ui-btn-up-"+l,"ui-btn-hover-"+l,!0,""):("vmouseout"===h||"blur"===h||"scrollstart"===h)&&(a(d,"ui-btn-hover-"+l+" ui-btn-down-"+l,"ui-btn-up-"+l,!1,"up"),i&&clearTimeout(i),o&&clearTimeout(o)))},"focusin focus":function(t){e(n(t.target)).addClass(e.mobile.focusClass)},"focusout blur":function(t){e(n(t.target)).removeClass(e.mobile.focusClass)}}),s=null};e.mobile.document.bind("pagecreate create",function(t){e(":jqmData(role='button'), .ui-bar > a, .ui-header > a, .ui-footer > a, .ui-bar > :jqmData(role='controlgroup') > a",t.target).jqmEnhanceable().not("button, input, .ui-btn, :jqmData(role='none'), :jqmData(role='nojs')").buttonMarkup()})}(e),function(e,t){e.widget("mobile.collapsible",e.mobile.widget,{options:{expandCueText:" click to expand contents",collapseCueText:" click to collapse contents",collapsed:!0,heading:"h1,h2,h3,h4,h5,h6,legend",collapsedIcon:"plus",expandedIcon:"minus",iconpos:"left",theme:null,contentTheme:null,inset:!0,corners:!0,mini:!1,initSelector:":jqmData(role='collapsible')"},_create:function(){var i=this.element,n=this.options,a=i.addClass("ui-collapsible"),o=i.children(n.heading).first(),s=a.wrapInner("<div class='ui-collapsible-content'></div>").children(".ui-collapsible-content"),r=i.closest(":jqmData(role='collapsible-set')").addClass("ui-collapsible-set"),l="";o.is("legend")&&(o=e("<div role='heading'>"+o.html()+"</div>").insertBefore(o),o.next().remove()),r.length?(n.theme||(n.theme=r.jqmData("theme")||e.mobile.getInheritedTheme(r,"c")),n.contentTheme||(n.contentTheme=r.jqmData("content-theme")),n.collapsedIcon=i.jqmData("collapsed-icon")||r.jqmData("collapsed-icon")||n.collapsedIcon,n.expandedIcon=i.jqmData("expanded-icon")||r.jqmData("expanded-icon")||n.expandedIcon,n.iconpos=i.jqmData("iconpos")||r.jqmData("iconpos")||n.iconpos,n.inset=r.jqmData("inset")!==t?r.jqmData("inset"):!0,n.corners=!1,n.mini||(n.mini=r.jqmData("mini"))):n.theme||(n.theme=e.mobile.getInheritedTheme(i,"c")),n.inset&&(l+=" ui-collapsible-inset",n.corners&&(l+=" ui-corner-all")),n.contentTheme&&(l+=" ui-collapsible-themed-content",s.addClass("ui-body-"+n.contentTheme)),""!==l&&a.addClass(l),o.insertBefore(s).addClass("ui-collapsible-heading").append("<span class='ui-collapsible-heading-status'></span>").wrapInner("<a href='#' class='ui-collapsible-heading-toggle'></a>").find("a").first().buttonMarkup({shadow:!1,corners:!1,iconpos:n.iconpos,icon:n.collapsedIcon,mini:n.mini,theme:n.theme}),a.bind("expand collapse",function(t){if(!t.isDefaultPrevented()){var i=e(this),a="collapse"===t.type;t.preventDefault(),o.toggleClass("ui-collapsible-heading-collapsed",a).find(".ui-collapsible-heading-status").text(a?n.expandCueText:n.collapseCueText).end().find(".ui-icon").toggleClass("ui-icon-"+n.expandedIcon,!a).toggleClass("ui-icon-"+n.collapsedIcon,a||n.expandedIcon===n.collapsedIcon).end().find("a").first().removeClass(e.mobile.activeBtnClass),i.toggleClass("ui-collapsible-collapsed",a),s.toggleClass("ui-collapsible-content-collapsed",a).attr("aria-hidden",a),s.trigger("updatelayout")}}).trigger(n.collapsed?"collapse":"expand"),o.bind("tap",function(){o.find("a").first().addClass(e.mobile.activeBtnClass)}).bind("click",function(e){var t=o.is(".ui-collapsible-heading-collapsed")?"expand":"collapse";a.trigger(t),e.preventDefault(),e.stopPropagation()})}}),e.mobile.document.bind("pagecreate create",function(t){e.mobile.collapsible.prototype.enhanceWithin(t.target)})}(e),function(e){e.mobile.behaviors.addFirstLastClasses={_getVisibles:function(e,t){var i;return t?i=e.not(".ui-screen-hidden"):(i=e.filter(":visible"),0===i.length&&(i=e.not(".ui-screen-hidden"))),i},_addFirstLastClasses:function(e,t,i){e.removeClass("ui-first-child ui-last-child"),t.eq(0).addClass("ui-first-child").end().last().addClass("ui-last-child"),i||this.element.trigger("updatelayout")}}}(e),function(e,t){e.widget("mobile.collapsibleset",e.mobile.widget,e.extend({options:{initSelector:":jqmData(role='collapsible-set')"},_create:function(){var i=this.element.addClass("ui-collapsible-set"),n=this.options;n.theme||(n.theme=e.mobile.getInheritedTheme(i,"c")),n.contentTheme||(n.contentTheme=i.jqmData("content-theme")),n.corners||(n.corners=i.jqmData("corners")),i.jqmData("inset")!==t&&(n.inset=i.jqmData("inset")),n.inset=n.inset!==t?n.inset:!0,n.corners=n.corners!==t?n.corners:!0,n.corners&&n.inset&&i.addClass("ui-corner-all"),i.jqmData("collapsiblebound")||i.jqmData("collapsiblebound",!0).bind("expand",function(t){var i=e(t.target).closest(".ui-collapsible");i.parent().is(":jqmData(role='collapsible-set')")&&i.siblings(".ui-collapsible").trigger("collapse")})},_init:function(){var e=this.element,t=e.children(":jqmData(role='collapsible')"),i=t.filter(":jqmData(collapsed='false')");
this._refresh("true"),i.trigger("expand")},_refresh:function(t){var i=this.element.children(":jqmData(role='collapsible')");e.mobile.collapsible.prototype.enhance(i.not(".ui-collapsible")),this._addFirstLastClasses(i,this._getVisibles(i,t),t)},refresh:function(){this._refresh(!1)}},e.mobile.behaviors.addFirstLastClasses)),e.mobile.document.bind("pagecreate create",function(t){e.mobile.collapsibleset.prototype.enhanceWithin(t.target)})}(e),function(e){e.fn.fieldcontain=function(){return this.addClass("ui-field-contain ui-body ui-br").contents().filter(function(){return 3===this.nodeType&&!/\S/.test(this.nodeValue)}).remove()},e(i).bind("pagecreate create",function(t){e(":jqmData(role='fieldcontain')",t.target).jqmEnhanceable().fieldcontain()})}(e),function(e){e.fn.grid=function(t){return this.each(function(){var i,n=e(this),a=e.extend({grid:null},t),o=n.children(),s={solo:1,a:2,b:3,c:4,d:5},r=a.grid;if(!r)if(5>=o.length)for(var l in s)s[l]===o.length&&(r=l);else r="a",n.addClass("ui-grid-duo");i=s[r],n.addClass("ui-grid-"+r),o.filter(":nth-child("+i+"n+1)").addClass("ui-block-a"),i>1&&o.filter(":nth-child("+i+"n+2)").addClass("ui-block-b"),i>2&&o.filter(":nth-child("+i+"n+3)").addClass("ui-block-c"),i>3&&o.filter(":nth-child("+i+"n+4)").addClass("ui-block-d"),i>4&&o.filter(":nth-child("+i+"n+5)").addClass("ui-block-e")})}}(e),function(e,t){e.widget("mobile.navbar",e.mobile.widget,{options:{iconpos:"top",grid:null,initSelector:":jqmData(role='navbar')"},_create:function(){var n=this.element,a=n.find("a"),o=a.filter(":jqmData(icon)").length?this.options.iconpos:t;n.addClass("ui-navbar ui-mini").attr("role","navigation").find("ul").jqmEnhanceable().grid({grid:this.options.grid}),a.buttonMarkup({corners:!1,shadow:!1,inline:!0,iconpos:o}),n.delegate("a","vclick",function(t){var n=e(t.target).is("a")?e(this):e(this).parent("a");if(!n.is(".ui-disabled, .ui-btn-active")){a.removeClass(e.mobile.activeBtnClass),e(this).addClass(e.mobile.activeBtnClass);var o=e(this);e(i).one("pagehide",function(){o.removeClass(e.mobile.activeBtnClass)})}}),n.closest(".ui-page").bind("pagebeforeshow",function(){a.filter(".ui-state-persist").addClass(e.mobile.activeBtnClass)})}}),e.mobile.document.bind("pagecreate create",function(t){e.mobile.navbar.prototype.enhanceWithin(t.target)})}(e),function(e){var t={};e.widget("mobile.listview",e.mobile.widget,e.extend({options:{theme:null,countTheme:"c",headerTheme:"b",dividerTheme:"b",icon:"arrow-r",splitIcon:"arrow-r",splitTheme:"b",corners:!0,shadow:!0,inset:!1,initSelector:":jqmData(role='listview')"},_create:function(){var e=this,t="";t+=e.options.inset?" ui-listview-inset":"",e.options.inset&&(t+=e.options.corners?" ui-corner-all":"",t+=e.options.shadow?" ui-shadow":""),e.element.addClass(function(e,i){return i+" ui-listview"+t}),e.refresh(!0)},_findFirstElementByTagName:function(e,t,i,n){var a={};for(a[i]=a[n]=!0;e;){if(a[e.nodeName])return e;e=e[t]}return null},_getChildrenByTagName:function(t,i,n){var a=[],o={};for(o[i]=o[n]=!0,t=t.firstChild;t;)o[t.nodeName]&&a.push(t),t=t.nextSibling;return e(a)},_addThumbClasses:function(t){var i,n,a=t.length;for(i=0;a>i;i++)n=e(this._findFirstElementByTagName(t[i].firstChild,"nextSibling","img","IMG")),n.length&&(n.addClass("ui-li-thumb"),e(this._findFirstElementByTagName(n[0].parentNode,"parentNode","li","LI")).addClass(n.is(".ui-li-icon")?"ui-li-has-icon":"ui-li-has-thumb"))},refresh:function(t){this.parentPage=this.element.closest(".ui-page"),this._createSubPages();var n,a,o,s,r,l,d,c,h,u,p,m,f=this.options,g=this.element,b=g.jqmData("dividertheme")||f.dividerTheme,v=g.jqmData("splittheme"),_=g.jqmData("spliticon"),C=g.jqmData("icon"),x=this._getChildrenByTagName(g[0],"li","LI"),y=!!e.nodeName(g[0],"ol"),w=!e.support.cssPseudoElement,T=g.attr("start"),D={};y&&w&&g.find(".ui-li-dec").remove(),y&&(T||0===T?w?d=parseInt(T,10):(c=parseInt(T,10)-1,g.css("counter-reset","listnumbering "+c)):w&&(d=1)),f.theme||(f.theme=e.mobile.getInheritedTheme(this.element,"c"));for(var P=0,k=x.length;k>P;P++){if(n=x.eq(P),a="ui-li",t||!n.hasClass("ui-li")){o=n.jqmData("theme")||f.theme,s=this._getChildrenByTagName(n[0],"a","A");var E="list-divider"===n.jqmData("role");s.length&&!E?(p=n.jqmData("icon"),n.buttonMarkup({wrapperEls:"div",shadow:!1,corners:!1,iconpos:"right",icon:s.length>1||p===!1?!1:p||C||f.icon,theme:o}),p!==!1&&1===s.length&&n.addClass("ui-li-has-arrow"),s.first().removeClass("ui-link").addClass("ui-link-inherit"),s.length>1&&(a+=" ui-li-has-alt",r=s.last(),l=v||r.jqmData("theme")||f.splitTheme,m=r.jqmData("icon"),r.appendTo(n).attr("title",e.trim(r.getEncodedText())).addClass("ui-li-link-alt").empty().buttonMarkup({shadow:!1,corners:!1,theme:o,icon:!1,iconpos:"notext"}).find(".ui-btn-inner").append(e(i.createElement("span")).buttonMarkup({shadow:!0,corners:!0,theme:l,iconpos:"notext",icon:m||p||_||f.splitIcon})))):E?(a+=" ui-li-divider ui-bar-"+(n.jqmData("theme")||b),n.attr("role","heading"),y&&(T||0===T?w?d=parseInt(T,10):(h=parseInt(T,10)-1,n.css("counter-reset","listnumbering "+h)):w&&(d=1))):a+=" ui-li-static ui-btn-up-"+o}y&&w&&0>a.indexOf("ui-li-divider")&&(u=a.indexOf("ui-li-static")>0?n:n.find(".ui-link-inherit"),u.addClass("ui-li-jsnumbering").prepend("<span class='ui-li-dec'>"+d++ +". </span>")),D[a]||(D[a]=[]),D[a].push(n[0])}for(a in D)e(D[a]).addClass(a).children(".ui-btn-inner").addClass(a);g.find("h1, h2, h3, h4, h5, h6").addClass("ui-li-heading").end().find("p, dl").addClass("ui-li-desc").end().find(".ui-li-aside").each(function(){var t=e(this);t.prependTo(t.parent())}).end().find(".ui-li-count").each(function(){e(this).closest("li").addClass("ui-li-has-count")}).addClass("ui-btn-up-"+(g.jqmData("counttheme")||this.options.countTheme)+" ui-btn-corner-all"),this._addThumbClasses(x),this._addThumbClasses(g.find(".ui-link-inherit")),this._addFirstLastClasses(x,this._getVisibles(x,t),t),this._trigger("afterrefresh")},_idStringEscape:function(e){return e.replace(/[^a-zA-Z0-9]/g,"-")},_createSubPages:function(){var i,a=this.element,o=a.closest(".ui-page"),s=o.jqmData("url"),r=s||o[0][e.expando],l=a.attr("id"),d=this.options,c="data-"+e.mobile.ns,h=this,u=o.find(":jqmData(role='footer')").jqmData("id");if(t[r]===n&&(t[r]=-1),l=l||++t[r],e(a.find("li>ul, li>ol").toArray().reverse()).each(function(t){var n,o,r=e(this),h=r.attr("id")||l+"-"+t,p=r.parent(),m=e(r.prevAll().toArray().reverse()),f=m.length?m:e("<span>"+e.trim(p.contents()[0].nodeValue)+"</span>"),g=f.first().getEncodedText(),b=(s||"")+"&"+e.mobile.subPageUrlKey+"="+h,v=r.jqmData("theme")||d.theme,_=r.jqmData("counttheme")||a.jqmData("counttheme")||d.countTheme;i=!0,n=r.detach().wrap("<div "+c+"role='page' "+c+"url='"+b+"' "+c+"theme='"+v+"' "+c+"count-theme='"+_+"'><div "+c+"role='content'></div></div>").parent().before("<div "+c+"role='header' "+c+"theme='"+d.headerTheme+"'><div class='ui-title'>"+g+"</div></div>").after(u?e("<div "+c+"role='footer' "+c+"id='"+u+"'>"):"").parent().appendTo(e.mobile.pageContainer),n.page(),o=p.find("a:first"),o.length||(o=e("<a/>").html(f||g).prependTo(p.empty())),o.attr("href","#"+b)}).listview(),i&&o.is(":jqmData(external-page='true')")&&o.data("mobile-page").options.domCache===!1){var p=function(t,i){var n,a=i.nextPage,r=new e.Event("pageremove");i.nextPage&&(n=a.jqmData("url"),0!==n.indexOf(s+"&"+e.mobile.subPageUrlKey)&&(h.childPages().remove(),o.trigger(r),r.isDefaultPrevented()||o.removeWithDependents()))};o.unbind("pagehide.remove").bind("pagehide.remove",p)}},childPages:function(){var t=this.parentPage.jqmData("url");return e(":jqmData(url^='"+t+"&"+e.mobile.subPageUrlKey+"')")}},e.mobile.behaviors.addFirstLastClasses)),e.mobile.document.bind("pagecreate create",function(t){e.mobile.listview.prototype.enhanceWithin(t.target)})}(e),function(e){var t=e("meta[name=viewport]"),i=t.attr("content"),n=i+",maximum-scale=1, user-scalable=no",a=i+",maximum-scale=10, user-scalable=yes",o=/(user-scalable[\s]*=[\s]*no)|(maximum-scale[\s]*=[\s]*1)[$,\s]/.test(i);e.mobile.zoom=e.extend({},{enabled:!o,locked:!1,disable:function(i){o||e.mobile.zoom.locked||(t.attr("content",n),e.mobile.zoom.enabled=!1,e.mobile.zoom.locked=i||!1)},enable:function(i){o||e.mobile.zoom.locked&&i!==!0||(t.attr("content",a),e.mobile.zoom.enabled=!0,e.mobile.zoom.locked=!1)},restore:function(){o||(t.attr("content",i),e.mobile.zoom.enabled=!0)}})}(e),function(e){e.widget("mobile.textinput",e.mobile.widget,{options:{theme:null,mini:!1,preventFocusZoom:/iPhone|iPad|iPod/.test(navigator.platform)&&navigator.userAgent.indexOf("AppleWebKit")>-1,initSelector:"input[type='text'], input[type='search'], :jqmData(type='search'), input[type='number'], :jqmData(type='number'), input[type='password'], input[type='email'], input[type='url'], input[type='tel'], textarea, input[type='time'], input[type='date'], input[type='month'], input[type='week'], input[type='datetime'], input[type='datetime-local'], input[type='color'], input:not([type]), input[type='file']",clearBtn:!1,clearSearchButtonText:null,clearBtnText:"clear text",disabled:!1},_create:function(){function t(){setTimeout(function(){a.toggleClass("ui-input-clear-hidden",!s.val())},0)}var i,a,o=this,s=this.element,r=this.options,l=r.theme||e.mobile.getInheritedTheme(this.element,"c"),d=" ui-body-"+l,c=r.mini?" ui-mini":"",h=s.is("[type='search'], :jqmData(type='search')"),u=r.clearSearchButtonText||r.clearBtnText,p=s.is("textarea, :jqmData(type='range')"),m=!!r.clearBtn&&!p,f=s.is("input")&&!s.is(":jqmData(type='range')");if(e("label[for='"+s.attr("id")+"']").addClass("ui-input-text"),i=s.addClass("ui-input-text ui-body-"+l),s[0].autocorrect===n||e.support.touchOverflow||(s[0].setAttribute("autocorrect","off"),s[0].setAttribute("autocomplete","off")),h?i=s.wrap("<div class='ui-input-search ui-shadow-inset ui-btn-corner-all ui-btn-shadow ui-icon-searchfield"+d+c+"'></div>").parent():f&&(i=s.wrap("<div class='ui-input-text ui-shadow-inset ui-corner-all ui-btn-shadow"+d+c+"'></div>").parent()),m||h?(a=e("<a href='#' class='ui-input-clear' title='"+u+"'>"+u+"</a>").bind("click",function(e){s.val("").focus().trigger("change"),a.addClass("ui-input-clear-hidden"),e.preventDefault()}).appendTo(i).buttonMarkup({icon:"delete",iconpos:"notext",corners:!0,shadow:!0,mini:r.mini}),h||i.addClass("ui-input-has-clear"),t(),s.bind("paste cut keyup input focus change blur",t)):f||h||s.addClass("ui-corner-all ui-shadow-inset"+d+c),s.focus(function(){r.preventFocusZoom&&e.mobile.zoom.disable(!0),i.addClass(e.mobile.focusClass)}).blur(function(){i.removeClass(e.mobile.focusClass),r.preventFocusZoom&&e.mobile.zoom.enable(!0)}),s.is("textarea")){var g,b=15,v=100;this._keyup=function(){var e=s[0].scrollHeight,t=s[0].clientHeight;if(e>t){var i=parseFloat(s.css("padding-top")),n=parseFloat(s.css("padding-bottom")),a=i+n;s.height(e-a+b)}},s.on("keyup change input paste",function(){clearTimeout(g),g=setTimeout(o._keyup,v)}),this._on(!0,e.mobile.document,{pagechange:"_keyup"}),e.trim(s.val())&&this._on(!0,e.mobile.window,{load:"_keyup"})}s.attr("disabled")&&this.disable()},disable:function(){var e,t=this.element.is("[type='search'], :jqmData(type='search')"),i=this.element.is("input")&&!this.element.is(":jqmData(type='range')"),n=this.element.attr("disabled",!0)&&(i||t);return e=n?this.element.parent():this.element,e.addClass("ui-disabled"),this._setOption("disabled",!0)},enable:function(){var e,t=this.element.is("[type='search'], :jqmData(type='search')"),i=this.element.is("input")&&!this.element.is(":jqmData(type='range')"),n=this.element.attr("disabled",!1)&&(i||t);return e=n?this.element.parent():this.element,e.removeClass("ui-disabled"),this._setOption("disabled",!1)}}),e.mobile.document.bind("pagecreate create",function(t){e.mobile.textinput.prototype.enhanceWithin(t.target,!0)})}(e),function(e){e.mobile.listview.prototype.options.filter=!1,e.mobile.listview.prototype.options.filterPlaceholder="Filter items...",e.mobile.listview.prototype.options.filterTheme="c",e.mobile.listview.prototype.options.filterReveal=!1;var t=function(e,t){return-1===(""+e).toLowerCase().indexOf(t)};e.mobile.listview.prototype.options.filterCallback=t,e.mobile.document.delegate("ul, ol","listviewcreate",function(){var i=e(this),n=i.data("mobile-listview");if(n&&n.options.filter){n.options.filterReveal&&i.children().addClass("ui-screen-hidden");var a=e("<form>",{"class":"ui-listview-filter ui-bar-"+n.options.filterTheme,role:"search"}).submit(function(e){e.preventDefault(),s.blur()}),o=function(){var a,o=e(this),s=this.value.toLowerCase(),r=null,l=i.children(),d=o.jqmData("lastval")+"",c=!1,h="",u=n.options.filterCallback!==t;if(!d||d!==s){if(n._trigger("beforefilter","beforefilter",{input:this}),o.jqmData("lastval",s),u||s.length<d.length||0!==s.indexOf(d)?r=i.children():(r=i.children(":not(.ui-screen-hidden)"),!r.length&&n.options.filterReveal&&(r=i.children(".ui-screen-hidden"))),s){for(var p=r.length-1;p>=0;p--)a=e(r[p]),h=a.jqmData("filtertext")||a.text(),a.is("li:jqmData(role=list-divider)")?(a.toggleClass("ui-filter-hidequeue",!c),c=!1):n.options.filterCallback(h,s,a)?a.toggleClass("ui-filter-hidequeue",!0):c=!0;r.filter(":not(.ui-filter-hidequeue)").toggleClass("ui-screen-hidden",!1),r.filter(".ui-filter-hidequeue").toggleClass("ui-screen-hidden",!0).toggleClass("ui-filter-hidequeue",!1)}else r.toggleClass("ui-screen-hidden",!!n.options.filterReveal);n._addFirstLastClasses(l,n._getVisibles(l,!1),!1)}},s=e("<input>",{placeholder:n.options.filterPlaceholder}).attr("data-"+e.mobile.ns+"type","search").jqmData("lastval","").bind("keyup change input",o).appendTo(a).textinput();n.options.inset&&a.addClass("ui-listview-filter-inset"),a.bind("submit",function(){return!1}).insertBefore(i)}})}(e),function(e){e.mobile.listview.prototype.options.autodividers=!1,e.mobile.listview.prototype.options.autodividersSelector=function(t){var i=e.trim(t.text())||null;return i?i=i.slice(0,1).toUpperCase():null},e.mobile.document.delegate("ul,ol","listviewcreate",function(){var t=e(this),n=t.data("mobile-listview");if(n&&n.options.autodividers){var a=function(){t.find("li:jqmData(role='list-divider')").remove();for(var a,o,s=t.find("li"),r=null,l=0;s.length>l;l++){if(a=s[l],o=n.options.autodividersSelector(e(a)),o&&r!==o){var d=i.createElement("li");d.appendChild(i.createTextNode(o)),d.setAttribute("data-"+e.mobile.ns+"role","list-divider"),a.parentNode.insertBefore(d,a)}r=o}},o=function(){t.unbind("listviewafterrefresh",o),a(),n.refresh(),t.bind("listviewafterrefresh",o)};o()}})}(e),function(e){e(i).bind("pagecreate create",function(t){e(":jqmData(role='nojs')",t.target).addClass("ui-nojs")})}(e),function(e){e.mobile.behaviors.formReset={_handleFormReset:function(){this._on(this.element.closest("form"),{reset:function(){this._delay("_reset")}})}}}(e),function(e){e.widget("mobile.checkboxradio",e.mobile.widget,e.extend({options:{theme:null,mini:!1,initSelector:"input[type='checkbox'],input[type='radio']"},_create:function(){var t=this,a=this.element,o=this.options,s=function(e,t){return e.jqmData(t)||e.closest("form, fieldset").jqmData(t)},r=e(a).closest("label"),l=r.length?r:e(a).closest("form, fieldset, :jqmData(role='page'), :jqmData(role='dialog')").find("label").filter("[for='"+a[0].id+"']").first(),d=a[0].type,c=s(a,"mini")||o.mini,h=d+"-on",u=d+"-off",p=s(a,"iconpos"),m="ui-"+h,f="ui-"+u;if("checkbox"===d||"radio"===d){e.extend(this,{label:l,inputtype:d,checkedClass:m,uncheckedClass:f,checkedicon:h,uncheckedicon:u}),o.theme||(o.theme=e.mobile.getInheritedTheme(this.element,"c")),l.buttonMarkup({theme:o.theme,icon:u,shadow:!1,mini:c,iconpos:p});var g=i.createElement("div");g.className="ui-"+d,a.add(l).wrapAll(g),l.bind({vmouseover:function(t){e(this).parent().is(".ui-disabled")&&t.stopPropagation()},vclick:function(e){return a.is(":disabled")?(e.preventDefault(),n):(t._cacheVals(),a.prop("checked","radio"===d&&!0||!a.prop("checked")),a.triggerHandler("click"),t._getInputSet().not(a).prop("checked",!1),t._updateAll(),!1)}}),a.bind({vmousedown:function(){t._cacheVals()},vclick:function(){var i=e(this);i.is(":checked")?(i.prop("checked",!0),t._getInputSet().not(i).prop("checked",!1)):i.prop("checked",!1),t._updateAll()},focus:function(){l.addClass(e.mobile.focusClass)},blur:function(){l.removeClass(e.mobile.focusClass)}}),this._handleFormReset(),this.refresh()}},_cacheVals:function(){this._getInputSet().each(function(){e(this).jqmData("cacheVal",this.checked)})},_getInputSet:function(){return"checkbox"===this.inputtype?this.element:this.element.closest("form, :jqmData(role='page'), :jqmData(role='dialog')").find("input[name='"+this.element[0].name+"'][type='"+this.inputtype+"']")},_updateAll:function(){var t=this;this._getInputSet().each(function(){var i=e(this);(this.checked||"checkbox"===t.inputtype)&&i.trigger("change")}).checkboxradio("refresh")},_reset:function(){this.refresh()},refresh:function(){var t=this.element[0],i=" "+e.mobile.activeBtnClass,n=this.checkedClass+(this.element.parents(".ui-controlgroup-horizontal").length?i:""),a=this.label;t.checked?a.removeClass(this.uncheckedClass+i).addClass(n).buttonMarkup({icon:this.checkedicon}):a.removeClass(n).addClass(this.uncheckedClass).buttonMarkup({icon:this.uncheckedicon}),t.disabled?this.disable():this.enable()},disable:function(){this.element.prop("disabled",!0).parent().addClass("ui-disabled")},enable:function(){this.element.prop("disabled",!1).parent().removeClass("ui-disabled")}},e.mobile.behaviors.formReset)),e.mobile.document.bind("pagecreate create",function(t){e.mobile.checkboxradio.prototype.enhanceWithin(t.target,!0)})}(e),function(e){e.widget("mobile.button",e.mobile.widget,{options:{theme:null,icon:null,iconpos:null,corners:!0,shadow:!0,iconshadow:!0,inline:null,mini:null,initSelector:"button, [type='button'], [type='submit'], [type='reset']"},_create:function(){var t,i=this.element,a=function(e){var t,i={};for(t in e)null!==e[t]&&"initSelector"!==t&&(i[t]=e[t]);return i}(this.options),o="";return"A"===i[0].tagName?(i.hasClass("ui-btn")||i.buttonMarkup(),n):(this.options.theme||(this.options.theme=e.mobile.getInheritedTheme(this.element,"c")),~i[0].className.indexOf("ui-btn-left")&&(o="ui-btn-left"),~i[0].className.indexOf("ui-btn-right")&&(o="ui-btn-right"),("submit"===i.attr("type")||"reset"===i.attr("type"))&&(o?o+=" ui-submit":o="ui-submit"),e("label[for='"+i.attr("id")+"']").addClass("ui-submit"),this.button=e("<div></div>")[i.html()?"html":"text"](i.html()||i.val()).insertBefore(i).buttonMarkup(a).addClass(o).append(i.addClass("ui-btn-hidden")),t=this.button,i.bind({focus:function(){t.addClass(e.mobile.focusClass)},blur:function(){t.removeClass(e.mobile.focusClass)}}),this.refresh(),n)},_setOption:function(t,i){var n={};n[t]=i,"initSelector"!==t&&(this.button.buttonMarkup(n),this.element.attr("data-"+(e.mobile.ns||"")+t.replace(/([A-Z])/,"-$1").toLowerCase(),i)),this._super("_setOption",t,i)},enable:function(){return this.element.attr("disabled",!1),this.button.removeClass("ui-disabled").attr("aria-disabled",!1),this._setOption("disabled",!1)},disable:function(){return this.element.attr("disabled",!0),this.button.addClass("ui-disabled").attr("aria-disabled",!0),this._setOption("disabled",!0)},refresh:function(){var t=this.element;t.prop("disabled")?this.disable():this.enable(),e(this.button.data("buttonElements").text)[t.html()?"html":"text"](t.html()||t.val())}}),e.mobile.document.bind("pagecreate create",function(t){e.mobile.button.prototype.enhanceWithin(t.target,!0)})}(e),function(e,n){e.widget("mobile.slider",e.mobile.widget,e.extend({widgetEventPrefix:"slide",options:{theme:null,trackTheme:null,disabled:!1,initSelector:"input[type='range'], :jqmData(type='range'), :jqmData(role='slider')",mini:!1,highlight:!1},_create:function(){var a,o,s=this,r=this.element,l=e.mobile.getInheritedTheme(r,"c"),d=this.options.theme||l,c=this.options.trackTheme||l,h=r[0].nodeName.toLowerCase(),u=(this.isToggleSwitch="select"===h,r.parent().is(":jqmData(role='rangeslider')")),p=this.isToggleSwitch?"ui-slider-switch":"",m=r.attr("id"),f=e("[for='"+m+"']"),g=f.attr("id")||m+"-label",b=f.attr("id",g),v=this.isToggleSwitch?0:parseFloat(r.attr("min")),_=this.isToggleSwitch?r.find("option").length-1:parseFloat(r.attr("max")),C=t.parseFloat(r.attr("step")||1),x=this.options.mini||r.jqmData("mini")?" ui-mini":"",y=i.createElement("a"),w=e(y),T=i.createElement("div"),D=e(T),P=this.options.highlight&&!this.isToggleSwitch?function(){var t=i.createElement("div");return t.className="ui-slider-bg "+e.mobile.activeBtnClass+" ui-btn-corner-all",e(t).prependTo(D)}():!1;if(y.setAttribute("href","#"),T.setAttribute("role","application"),T.className=[this.isToggleSwitch?"ui-slider ":"ui-slider-track ",p," ui-btn-down-",c," ui-btn-corner-all",x].join(""),y.className="ui-slider-handle",T.appendChild(y),w.buttonMarkup({corners:!0,theme:d,shadow:!0}).attr({role:"slider","aria-valuemin":v,"aria-valuemax":_,"aria-valuenow":this._value(),"aria-valuetext":this._value(),title:this._value(),"aria-labelledby":g}),e.extend(this,{slider:D,handle:w,type:h,step:C,max:_,min:v,valuebg:P,isRangeslider:u,dragging:!1,beforeStart:null,userModified:!1,mouseMoved:!1}),this.isToggleSwitch){o=i.createElement("div"),o.className="ui-slider-inneroffset";for(var k=0,E=T.childNodes.length;E>k;k++)o.appendChild(T.childNodes[k]);T.appendChild(o),w.addClass("ui-slider-handle-snapping"),a=r.find("option");for(var q=0,j=a.length;j>q;q++){var S=q?"a":"b",A=q?" "+e.mobile.activeBtnClass:" ui-btn-down-"+c,N=(i.createElement("div"),i.createElement("span"));N.className=["ui-slider-label ui-slider-label-",S,A," ui-btn-corner-all"].join(""),N.setAttribute("role","img"),N.appendChild(i.createTextNode(a[q].innerHTML)),e(N).prependTo(D)}s._labels=e(".ui-slider-label",D)}b.addClass("ui-slider"),r.addClass(this.isToggleSwitch?"ui-slider-switch":"ui-slider-input"),this._on(r,{change:"_controlChange",keyup:"_controlKeyup",blur:"_controlBlur",vmouseup:"_controlVMouseUp"}),D.bind("vmousedown",e.proxy(this._sliderVMouseDown,this)).bind("vclick",!1),this._on(i,{vmousemove:"_preventDocumentDrag"}),this._on(D.add(i),{vmouseup:"_sliderVMouseUp"}),D.insertAfter(r),this.isToggleSwitch||u||(o=this.options.mini?"<div class='ui-slider ui-mini'>":"<div class='ui-slider'>",r.add(D).wrapAll(o)),this.isToggleSwitch&&this.handle.bind({focus:function(){D.addClass(e.mobile.focusClass)},blur:function(){D.removeClass(e.mobile.focusClass)}}),this._on(this.handle,{vmousedown:"_handleVMouseDown",keydown:"_handleKeydown",keyup:"_handleKeyup"}),this.handle.bind("vclick",!1),this._handleFormReset(),this.refresh(n,n,!0)},_controlChange:function(e){return this._trigger("controlchange",e)===!1?!1:(this.mouseMoved||this.refresh(this._value(),!0),n)},_controlKeyup:function(){this.refresh(this._value(),!0,!0)},_controlBlur:function(){this.refresh(this._value(),!0)},_controlVMouseUp:function(){this._checkedRefresh()},_handleVMouseDown:function(){this.handle.focus()},_handleKeydown:function(t){var i=this._value();if(!this.options.disabled){switch(t.keyCode){case e.mobile.keyCode.HOME:case e.mobile.keyCode.END:case e.mobile.keyCode.PAGE_UP:case e.mobile.keyCode.PAGE_DOWN:case e.mobile.keyCode.UP:case e.mobile.keyCode.RIGHT:case e.mobile.keyCode.DOWN:case e.mobile.keyCode.LEFT:t.preventDefault(),this._keySliding||(this._keySliding=!0,this.handle.addClass("ui-state-active"))}switch(t.keyCode){case e.mobile.keyCode.HOME:this.refresh(this.min);break;case e.mobile.keyCode.END:this.refresh(this.max);break;case e.mobile.keyCode.PAGE_UP:case e.mobile.keyCode.UP:case e.mobile.keyCode.RIGHT:this.refresh(i+this.step);break;case e.mobile.keyCode.PAGE_DOWN:case e.mobile.keyCode.DOWN:case e.mobile.keyCode.LEFT:this.refresh(i-this.step)}}},_handleKeyup:function(){this._keySliding&&(this._keySliding=!1,this.handle.removeClass("ui-state-active"))},_sliderVMouseDown:function(e){return this.options.disabled||1!==e.which&&0!==e.which?!1:this._trigger("beforestart",e)===!1?!1:(this.dragging=!0,this.userModified=!1,this.mouseMoved=!1,this.isToggleSwitch&&(this.beforeStart=this.element[0].selectedIndex),this.refresh(e),this._trigger("start"),!1)},_sliderVMouseUp:function(){return this.dragging?(this.dragging=!1,this.isToggleSwitch&&(this.handle.addClass("ui-slider-handle-snapping"),this.mouseMoved?this.userModified?this.refresh(0===this.beforeStart?1:0):this.refresh(this.beforeStart):this.refresh(0===this.beforeStart?1:0)),this.mouseMoved=!1,this._trigger("stop"),!1):n},_preventDocumentDrag:function(e){return this._trigger("drag",e)===!1?!1:this.dragging&&!this.options.disabled?(this.mouseMoved=!0,this.isToggleSwitch&&this.handle.removeClass("ui-slider-handle-snapping"),this.refresh(e),this.userModified=this.beforeStart!==this.element[0].selectedIndex,!1):n},_checkedRefresh:function(){this.value!==this._value()&&this.refresh(this._value())},_value:function(){return this.isToggleSwitch?this.element[0].selectedIndex:parseFloat(this.element.val())},_reset:function(){this.refresh(n,!1,!0)},refresh:function(t,a,o){var s,r,l,d,c=this,h=e.mobile.getInheritedTheme(this.element,"c"),u=this.options.theme||h,p=this.options.trackTheme||h;c.slider[0].className=[this.isToggleSwitch?"ui-slider ui-slider-switch":"ui-slider-track"," ui-btn-down-"+p," ui-btn-corner-all",this.options.mini?" ui-mini":""].join(""),(this.options.disabled||this.element.attr("disabled"))&&this.disable(),this.value=this._value(),this.options.highlight&&!this.isToggleSwitch&&0===this.slider.find(".ui-slider-bg").length&&(this.valuebg=function(){var t=i.createElement("div");return t.className="ui-slider-bg "+e.mobile.activeBtnClass+" ui-btn-corner-all",e(t).prependTo(c.slider)}()),this.handle.buttonMarkup({corners:!0,theme:u,shadow:!0});var m,f,g=this.element,b=!this.isToggleSwitch,v=b?[]:g.find("option"),_=b?parseFloat(g.attr("min")):0,C=b?parseFloat(g.attr("max")):v.length-1,x=b&&parseFloat(g.attr("step"))>0?parseFloat(g.attr("step")):1;if("object"==typeof t){if(l=t,d=8,s=this.slider.offset().left,r=this.slider.width(),m=r/((C-_)/x),!this.dragging||s-d>l.pageX||l.pageX>s+r+d)return;f=m>1?100*((l.pageX-s)/r):Math.round(100*((l.pageX-s)/r))}else null==t&&(t=b?parseFloat(g.val()||0):g[0].selectedIndex),f=100*((parseFloat(t)-_)/(C-_));if(!isNaN(f)){var y=f/100*(C-_)+_,w=(y-_)%x,T=y-w;2*Math.abs(w)>=x&&(T+=w>0?x:-x);var D=100/((C-_)/x);if(y=parseFloat(T.toFixed(5)),m===n&&(m=r/((C-_)/x)),m>1&&b&&(f=(y-_)*D*(1/x)),0>f&&(f=0),f>100&&(f=100),_>y&&(y=_),y>C&&(y=C),this.handle.css("left",f+"%"),this.handle[0].setAttribute("aria-valuenow",b?y:v.eq(y).attr("value")),this.handle[0].setAttribute("aria-valuetext",b?y:v.eq(y).getEncodedText()),this.handle[0].setAttribute("title",b?y:v.eq(y).getEncodedText()),this.valuebg&&this.valuebg.css("width",f+"%"),this._labels){var P=100*(this.handle.width()/this.slider.width()),k=f&&P+(100-P)*f/100,E=100===f?0:Math.min(P+100-k,100);this._labels.each(function(){var t=e(this).is(".ui-slider-label-a");e(this).width((t?k:E)+"%")})}if(!o){var q=!1;if(b?(q=g.val()!==y,g.val(y)):(q=g[0].selectedIndex!==y,g[0].selectedIndex=y),this._trigger("beforechange",t)===!1)return!1;!a&&q&&g.trigger("change")}}},enable:function(){return this.element.attr("disabled",!1),this.slider.removeClass("ui-disabled").attr("aria-disabled",!1),this._setOption("disabled",!1)},disable:function(){return this.element.attr("disabled",!0),this.slider.addClass("ui-disabled").attr("aria-disabled",!0),this._setOption("disabled",!0)}},e.mobile.behaviors.formReset)),e.mobile.document.bind("pagecreate create",function(t){e.mobile.slider.prototype.enhanceWithin(t.target,!0)})}(e),function(e){e.widget("mobile.rangeslider",e.mobile.widget,{options:{theme:null,trackTheme:null,disabled:!1,initSelector:":jqmData(role='rangeslider')",mini:!1,highlight:!0},_create:function(){var t,i=this.element,n=this.options.mini?"ui-rangeslider ui-mini":"ui-rangeslider",a=i.find("input").first(),o=i.find("input").last(),s=i.find("label").first(),r=e.data(a.get(0),"mobileSlider").slider,l=e.data(o.get(0),"mobileSlider").slider,d=e.data(a.get(0),"mobileSlider").handle,c=e('<div class="ui-rangeslider-sliders" />').appendTo(i);i.find("label").length>1&&(t=i.find("label").last().hide()),a.addClass("ui-rangeslider-first"),o.addClass("ui-rangeslider-last"),i.addClass(n),r.appendTo(c),l.appendTo(c),s.prependTo(i),d.prependTo(l),e.extend(this,{_inputFirst:a,_inputLast:o,_sliderFirst:r,_sliderLast:l,_targetVal:null,_sliderTarget:!1,_sliders:c,_proxy:!1}),this.refresh(),this._on(this.element.find("input.ui-slider-input"),{slidebeforestart:"_slidebeforestart",slidestop:"_slidestop",slidedrag:"_slidedrag",slidebeforechange:"_change",blur:"_change",keyup:"_change"}),this._on({mousedown:"_change"}),this._on(this.element.closest("form"),{reset:"_handleReset"}),this._on(d,{vmousedown:"_dragFirstHandle"})},_handleReset:function(){var e=this;setTimeout(function(){e._updateHighlight()},0)},_dragFirstHandle:function(t){return e.data(this._inputFirst.get(0),"mobileSlider").dragging=!0,e.data(this._inputFirst.get(0),"mobileSlider").refresh(t),!1},_slidedrag:function(t){var i=e(t.target).is(this._inputFirst),a=i?this._inputLast:this._inputFirst;return this._sliderTarget=!1,"first"===this._proxy&&i||"last"===this._proxy&&!i?(e.data(a.get(0),"mobileSlider").dragging=!0,e.data(a.get(0),"mobileSlider").refresh(t),!1):n},_slidestop:function(t){var i=e(t.target).is(this._inputFirst);this._proxy=!1,this.element.find("input").trigger("vmouseup"),this._sliderFirst.css("z-index",i?1:"")},_slidebeforestart:function(t){this._sliderTarget=!1,e(t.originalEvent.target).hasClass("ui-slider-track")&&(this._sliderTarget=!0,this._targetVal=e(t.target).val())},_setOption:function(e){this._superApply(e),this.refresh()},refresh:function(){var e=this.element,t=this.options;e.find("input").slider({theme:t.theme,trackTheme:t.trackTheme,disabled:t.disabled,mini:t.mini,highlight:t.highlight}).slider("refresh"),this._updateHighlight()},_change:function(t){if("keyup"===t.type)return this._updateHighlight(),!1;var i=this,a=parseFloat(this._inputFirst.val(),10),o=parseFloat(this._inputLast.val(),10),s=e(t.target).hasClass("ui-rangeslider-first"),r=s?this._inputFirst:this._inputLast,l=s?this._inputLast:this._inputFirst;if(this._inputFirst.val()>this._inputLast.val()&&"mousedown"===t.type&&!e(t.target).hasClass("ui-slider-handle"))r.blur();else if("mousedown"===t.type)return;return a>o&&!this._sliderTarget?(r.val(s?o:a).slider("refresh"),this._trigger("normalize")):a>o&&(r.val(this._targetVal).slider("refresh"),setTimeout(function(){l.val(s?a:o).slider("refresh"),e.data(l.get(0),"mobileSlider").handle.focus(),i._sliderFirst.css("z-index",s?"":1),i._trigger("normalize")},0),this._proxy=s?"first":"last"),a===o?(e.data(r.get(0),"mobileSlider").handle.css("z-index",1),e.data(l.get(0),"mobileSlider").handle.css("z-index",0)):(e.data(l.get(0),"mobileSlider").handle.css("z-index",""),e.data(r.get(0),"mobileSlider").handle.css("z-index","")),this._updateHighlight(),a>=o?!1:n},_updateHighlight:function(){var t=parseInt(e.data(this._inputFirst.get(0),"mobileSlider").handle.get(0).style.left,10),i=parseInt(e.data(this._inputLast.get(0),"mobileSlider").handle.get(0).style.left,10),n=i-t;this.element.find(".ui-slider-bg").css({"margin-left":t+"%",width:n+"%"})},_destroy:function(){this.element.removeClass("ui-rangeslider ui-mini").find("label").show(),this._inputFirst.after(this._sliderFirst),this._inputLast.after(this._sliderLast),this._sliders.remove(),this.element.find("input").removeClass("ui-rangeslider-first ui-rangeslider-last").slider("destroy")}}),e.widget("mobile.rangeslider",e.mobile.rangeslider,e.mobile.behaviors.formReset),e(i).bind("pagecreate create",function(t){e.mobile.rangeslider.prototype.enhanceWithin(t.target,!0)})}(e),function(e){e.widget("mobile.selectmenu",e.mobile.widget,e.extend({options:{theme:null,disabled:!1,icon:"arrow-d",iconpos:"right",inline:!1,corners:!0,shadow:!0,iconshadow:!0,overlayTheme:"a",dividerTheme:"b",hidePlaceholderMenuItems:!0,closeText:"Close",nativeMenu:!0,preventFocusZoom:/iPhone|iPad|iPod/.test(navigator.platform)&&navigator.userAgent.indexOf("AppleWebKit")>-1,initSelector:"select:not( :jqmData(role='slider') )",mini:!1},_button:function(){return e("<div/>")
},_setDisabled:function(e){return this.element.attr("disabled",e),this.button.attr("aria-disabled",e),this._setOption("disabled",e)},_focusButton:function(){var e=this;setTimeout(function(){e.button.focus()},40)},_selectOptions:function(){return this.select.find("option")},_preExtension:function(){var t="";~this.element[0].className.indexOf("ui-btn-left")&&(t=" ui-btn-left"),~this.element[0].className.indexOf("ui-btn-right")&&(t=" ui-btn-right"),this.select=this.element.removeClass("ui-btn-left ui-btn-right").wrap("<div class='ui-select"+t+"'>"),this.selectID=this.select.attr("id"),this.label=e("label[for='"+this.selectID+"']").addClass("ui-select"),this.isMultiple=this.select[0].multiple,this.options.theme||(this.options.theme=e.mobile.getInheritedTheme(this.select,"c"))},_destroy:function(){var e=this.element.parents(".ui-select");e.length>0&&(e.is(".ui-btn-left, .ui-btn-right")&&this.element.addClass(e.is(".ui-btn-left")?"ui-btn-left":"ui-btn-right"),this.element.insertAfter(e),e.remove())},_create:function(){this._preExtension(),this._trigger("beforeCreate"),this.button=this._button();var i=this,n=this.options,a=n.inline||this.select.jqmData("inline"),o=n.mini||this.select.jqmData("mini"),s=n.icon?n.iconpos||this.select.jqmData("iconpos"):!1,r=(-1===this.select[0].selectedIndex?0:this.select[0].selectedIndex,this.button.insertBefore(this.select).buttonMarkup({theme:n.theme,icon:n.icon,iconpos:s,inline:a,corners:n.corners,shadow:n.shadow,iconshadow:n.iconshadow,mini:o}));this.setButtonText(),n.nativeMenu&&t.opera&&t.opera.version&&r.addClass("ui-select-nativeonly"),this.isMultiple&&(this.buttonCount=e("<span>").addClass("ui-li-count ui-btn-up-c ui-btn-corner-all").hide().appendTo(r.addClass("ui-li-has-count"))),(n.disabled||this.element.attr("disabled"))&&this.disable(),this.select.change(function(){i.refresh(),n.nativeMenu&&this.blur()}),this._handleFormReset(),this.build()},build:function(){var t=this;this.select.appendTo(t.button).bind("vmousedown",function(){t.button.addClass(e.mobile.activeBtnClass)}).bind("focus",function(){t.button.addClass(e.mobile.focusClass)}).bind("blur",function(){t.button.removeClass(e.mobile.focusClass)}).bind("focus vmouseover",function(){t.button.trigger("vmouseover")}).bind("vmousemove",function(){t.button.removeClass(e.mobile.activeBtnClass)}).bind("change blur vmouseout",function(){t.button.trigger("vmouseout").removeClass(e.mobile.activeBtnClass)}).bind("change blur",function(){t.button.removeClass("ui-btn-down-"+t.options.theme)}),t.button.bind("vmousedown",function(){t.options.preventFocusZoom&&e.mobile.zoom.disable(!0)}),t.label.bind("click focus",function(){t.options.preventFocusZoom&&e.mobile.zoom.disable(!0)}),t.select.bind("focus",function(){t.options.preventFocusZoom&&e.mobile.zoom.disable(!0)}),t.button.bind("mouseup",function(){t.options.preventFocusZoom&&setTimeout(function(){e.mobile.zoom.enable(!0)},0)}),t.select.bind("blur",function(){t.options.preventFocusZoom&&e.mobile.zoom.enable(!0)})},selected:function(){return this._selectOptions().filter(":selected")},selectedIndices:function(){var e=this;return this.selected().map(function(){return e._selectOptions().index(this)}).get()},setButtonText:function(){var t=this,n=this.selected(),a=this.placeholder,o=e(i.createElement("span"));this.button.find(".ui-btn-text").html(function(){return a=n.length?n.map(function(){return e(this).text()}).get().join(", "):t.placeholder,o.text(a).addClass(t.select.attr("class")).addClass(n.attr("class"))})},setButtonCount:function(){var e=this.selected();this.isMultiple&&this.buttonCount[e.length>1?"show":"hide"]().text(e.length)},_reset:function(){this.refresh()},refresh:function(){this.setButtonText(),this.setButtonCount()},open:e.noop,close:e.noop,disable:function(){this._setDisabled(!0),this.button.addClass("ui-disabled")},enable:function(){this._setDisabled(!1),this.button.removeClass("ui-disabled")}},e.mobile.behaviors.formReset)),e.mobile.document.bind("pagecreate create",function(t){e.mobile.selectmenu.prototype.enhanceWithin(t.target,!0)})}(e),function(e,n){function a(e,t,i,n){var a=n;return a=t>e?i+(e-t)/2:Math.min(Math.max(i,n-t/2),i+e-t)}function o(){var i=e.mobile.window;return{x:i.scrollLeft(),y:i.scrollTop(),cx:t.innerWidth||i.width(),cy:t.innerHeight||i.height()}}e.widget("mobile.popup",e.mobile.widget,{options:{theme:null,overlayTheme:null,shadow:!0,corners:!0,transition:"none",positionTo:"origin",tolerance:null,initSelector:":jqmData(role='popup')",closeLinkSelector:"a:jqmData(rel='back')",closeLinkEvents:"click.popup",navigateEvents:"navigate.popup",closeEvents:"navigate.popup pagebeforechange.popup",dismissible:!0,history:!e.mobile.browser.oldIE},_eatEventAndClose:function(e){return e.preventDefault(),e.stopImmediatePropagation(),this.options.dismissible&&this.close(),!1},_resizeScreen:function(){var e=this._ui.container.outerHeight(!0);this._ui.screen.removeAttr("style"),e>this._ui.screen.height()&&this._ui.screen.height(e)},_handleWindowKeyUp:function(t){return this._isOpen&&t.keyCode===e.mobile.keyCode.ESCAPE?this._eatEventAndClose(t):n},_expectResizeEvent:function(){var t=o();if(this._resizeData){if(t.x===this._resizeData.winCoords.x&&t.y===this._resizeData.winCoords.y&&t.cx===this._resizeData.winCoords.cx&&t.cy===this._resizeData.winCoords.cy)return!1;clearTimeout(this._resizeData.timeoutId)}return this._resizeData={timeoutId:setTimeout(e.proxy(this,"_resizeTimeout"),200),winCoords:t},!0},_resizeTimeout:function(){this._isOpen?this._expectResizeEvent()||(this._ui.container.hasClass("ui-popup-hidden")&&(this._ui.container.removeClass("ui-popup-hidden"),this.reposition({positionTo:"window"}),this._ignoreResizeEvents()),this._resizeScreen(),this._resizeData=null,this._orientationchangeInProgress=!1):(this._resizeData=null,this._orientationchangeInProgress=!1)},_ignoreResizeEvents:function(){var e=this;this._ignoreResizeTo&&clearTimeout(this._ignoreResizeTo),this._ignoreResizeTo=setTimeout(function(){e._ignoreResizeTo=0},1e3)},_handleWindowResize:function(){this._isOpen&&0===this._ignoreResizeTo&&(!this._expectResizeEvent()&&!this._orientationchangeInProgress||this._ui.container.hasClass("ui-popup-hidden")||this._ui.container.addClass("ui-popup-hidden").removeAttr("style"))},_handleWindowOrientationchange:function(){!this._orientationchangeInProgress&&this._isOpen&&0===this._ignoreResizeTo&&(this._expectResizeEvent(),this._orientationchangeInProgress=!0)},_handleDocumentFocusIn:function(t){var n,a=t.target,o=this._ui;if(this._isOpen){if(a!==o.container[0]){if(n=e(t.target),0===n.parents().filter(o.container[0]).length)return e(i.activeElement).one("focus",function(){n.blur()}),o.focusElement.focus(),t.preventDefault(),t.stopImmediatePropagation(),!1;o.focusElement[0]===o.container[0]&&(o.focusElement=n)}this._ignoreResizeEvents()}},_create:function(){var t={screen:e("<div class='ui-screen-hidden ui-popup-screen'></div>"),placeholder:e("<div style='display: none;'><!-- placeholder --></div>"),container:e("<div class='ui-popup-container ui-popup-hidden'></div>")},i=this.element.closest(".ui-page"),a=this.element.attr("id"),o=this;this.options.history=this.options.history&&e.mobile.ajaxEnabled&&e.mobile.hashListeningEnabled,0===i.length&&(i=e("body")),this.options.container=this.options.container||e.mobile.pageContainer,i.append(t.screen),t.container.insertAfter(t.screen),t.placeholder.insertAfter(this.element),a&&(t.screen.attr("id",a+"-screen"),t.container.attr("id",a+"-popup"),t.placeholder.html("<!-- placeholder for "+a+" -->")),t.container.append(this.element),t.focusElement=t.container,this.element.addClass("ui-popup"),e.extend(this,{_scrollTop:0,_page:i,_ui:t,_fallbackTransition:"",_currentTransition:!1,_prereqs:null,_isOpen:!1,_tolerance:null,_resizeData:null,_ignoreResizeTo:0,_orientationchangeInProgress:!1}),e.each(this.options,function(e,t){o.options[e]=n,o._setOption(e,t,!0)}),t.screen.bind("vclick",e.proxy(this,"_eatEventAndClose")),this._on(e.mobile.window,{orientationchange:e.proxy(this,"_handleWindowOrientationchange"),resize:e.proxy(this,"_handleWindowResize"),keyup:e.proxy(this,"_handleWindowKeyUp")}),this._on(e.mobile.document,{focusin:e.proxy(this,"_handleDocumentFocusIn")})},_applyTheme:function(e,t,i){for(var n,a=(e.attr("class")||"").split(" "),o=null,s=t+"";a.length>0;){if(o=a.pop(),n=RegExp("^ui-"+i+"-([a-z])$").exec(o),n&&n.length>1){o=n[1];break}o=null}t!==o&&(e.removeClass("ui-"+i+"-"+o),null!==t&&"none"!==t&&e.addClass("ui-"+i+"-"+s))},_setTheme:function(e){this._applyTheme(this.element,e,"body")},_setOverlayTheme:function(e){this._applyTheme(this._ui.screen,e,"overlay"),this._isOpen&&this._ui.screen.addClass("in")},_setShadow:function(e){this.element.toggleClass("ui-overlay-shadow",e)},_setCorners:function(e){this.element.toggleClass("ui-corner-all",e)},_applyTransition:function(t){this._ui.container.removeClass(this._fallbackTransition),t&&"none"!==t&&(this._fallbackTransition=e.mobile._maybeDegradeTransition(t),"none"===this._fallbackTransition&&(this._fallbackTransition=""),this._ui.container.addClass(this._fallbackTransition))},_setTransition:function(e){this._currentTransition||this._applyTransition(e)},_setTolerance:function(t){var i={t:30,r:15,b:30,l:15};if(t!==n){var a=(t+"").split(",");switch(e.each(a,function(e,t){a[e]=parseInt(t,10)}),a.length){case 1:isNaN(a[0])||(i.t=i.r=i.b=i.l=a[0]);break;case 2:isNaN(a[0])||(i.t=i.b=a[0]),isNaN(a[1])||(i.l=i.r=a[1]);break;case 4:isNaN(a[0])||(i.t=a[0]),isNaN(a[1])||(i.r=a[1]),isNaN(a[2])||(i.b=a[2]),isNaN(a[3])||(i.l=a[3]);break;default:}}this._tolerance=i},_setOption:function(t,i){var a,o="_set"+t.charAt(0).toUpperCase()+t.slice(1);this[o]!==n&&this[o](i),a=["initSelector","closeLinkSelector","closeLinkEvents","navigateEvents","closeEvents","history","container"],e.mobile.widget.prototype._setOption.apply(this,arguments),-1===e.inArray(t,a)&&this.element.attr("data-"+(e.mobile.ns||"")+t.replace(/([A-Z])/,"-$1").toLowerCase(),i)},_placementCoords:function(e){var t,n,s=o(),r={x:this._tolerance.l,y:s.y+this._tolerance.t,cx:s.cx-this._tolerance.l-this._tolerance.r,cy:s.cy-this._tolerance.t-this._tolerance.b};this._ui.container.css("max-width",r.cx),t={cx:this._ui.container.outerWidth(!0),cy:this._ui.container.outerHeight(!0)},n={x:a(r.cx,t.cx,r.x,e.x),y:a(r.cy,t.cy,r.y,e.y)},n.y=Math.max(0,n.y);var l=i.documentElement,d=i.body,c=Math.max(l.clientHeight,d.scrollHeight,d.offsetHeight,l.scrollHeight,l.offsetHeight);return n.y-=Math.min(n.y,Math.max(0,n.y+t.cy-c)),{left:n.x,top:n.y}},_createPrereqs:function(t,i,n){var a,o=this;a={screen:e.Deferred(),container:e.Deferred()},a.screen.then(function(){a===o._prereqs&&t()}),a.container.then(function(){a===o._prereqs&&i()}),e.when(a.screen,a.container).done(function(){a===o._prereqs&&(o._prereqs=null,n())}),o._prereqs=a},_animate:function(t){return this._ui.screen.removeClass(t.classToRemove).addClass(t.screenClassToAdd),t.prereqs.screen.resolve(),t.transition&&"none"!==t.transition&&(t.applyTransition&&this._applyTransition(t.transition),this._fallbackTransition)?(this._ui.container.animationComplete(e.proxy(t.prereqs.container,"resolve")).addClass(t.containerClassToAdd).removeClass(t.classToRemove),n):(this._ui.container.removeClass(t.classToRemove),t.prereqs.container.resolve(),n)},_desiredCoords:function(t){var i,n=null,a=o(),s=t.x,r=t.y,l=t.positionTo;if(l&&"origin"!==l)if("window"===l)s=a.cx/2+a.x,r=a.cy/2+a.y;else{try{n=e(l)}catch(d){n=null}n&&(n.filter(":visible"),0===n.length&&(n=null))}return n&&(i=n.offset(),s=i.left+n.outerWidth()/2,r=i.top+n.outerHeight()/2),("number"!==e.type(s)||isNaN(s))&&(s=a.cx/2+a.x),("number"!==e.type(r)||isNaN(r))&&(r=a.cy/2+a.y),{x:s,y:r}},_reposition:function(e){e={x:e.x,y:e.y,positionTo:e.positionTo},this._trigger("beforeposition",e),this._ui.container.offset(this._placementCoords(this._desiredCoords(e)))},reposition:function(e){this._isOpen&&this._reposition(e)},_openPrereqsComplete:function(){this._ui.container.addClass("ui-popup-active"),this._isOpen=!0,this._resizeScreen(),this._ui.container.attr("tabindex","0").focus(),this._ignoreResizeEvents(),this._trigger("afteropen")},_open:function(t){var i=e.extend({},this.options,t),n=function(){var e=navigator.userAgent,t=e.match(/AppleWebKit\/([0-9\.]+)/),i=!!t&&t[1],n=e.match(/Android (\d+(?:\.\d+))/),a=!!n&&n[1],o=e.indexOf("Chrome")>-1;return null!==n&&"4.0"===a&&i&&i>534.13&&!o?!0:!1}();this._createPrereqs(e.noop,e.noop,e.proxy(this,"_openPrereqsComplete")),this._currentTransition=i.transition,this._applyTransition(i.transition),this.options.theme||this._setTheme(this._page.jqmData("theme")||e.mobile.getInheritedTheme(this._page,"c")),this._ui.screen.removeClass("ui-screen-hidden"),this._ui.container.removeClass("ui-popup-hidden"),this._reposition(i),this.options.overlayTheme&&n&&this.element.closest(".ui-page").addClass("ui-popup-open"),this._animate({additionalCondition:!0,transition:i.transition,classToRemove:"",screenClassToAdd:"in",containerClassToAdd:"in",applyTransition:!1,prereqs:this._prereqs})},_closePrereqScreen:function(){this._ui.screen.removeClass("out").addClass("ui-screen-hidden")},_closePrereqContainer:function(){this._ui.container.removeClass("reverse out").addClass("ui-popup-hidden").removeAttr("style")},_closePrereqsDone:function(){this.options,this._ui.container.removeAttr("tabindex"),e.mobile.popup.active=n,this._trigger("afterclose")},_close:function(t){this._ui.container.removeClass("ui-popup-active"),this._page.removeClass("ui-popup-open"),this._isOpen=!1,this._createPrereqs(e.proxy(this,"_closePrereqScreen"),e.proxy(this,"_closePrereqContainer"),e.proxy(this,"_closePrereqsDone")),this._animate({additionalCondition:this._ui.screen.hasClass("in"),transition:t?"none":this._currentTransition,classToRemove:"in",screenClassToAdd:"out",containerClassToAdd:"reverse out",applyTransition:!0,prereqs:this._prereqs})},_unenhance:function(){this._setTheme("none"),this.element.detach().insertAfter(this._ui.placeholder).removeClass("ui-popup ui-overlay-shadow ui-corner-all"),this._ui.screen.remove(),this._ui.container.remove(),this._ui.placeholder.remove()},_destroy:function(){e.mobile.popup.active===this?(this.element.one("popupafterclose",e.proxy(this,"_unenhance")),this.close()):this._unenhance()},_closePopup:function(i,n){var a,o,s=this.options,r=!1;t.scrollTo(0,this._scrollTop),i&&"pagebeforechange"===i.type&&n&&(a="string"==typeof n.toPage?n.toPage:n.toPage.jqmData("url"),a=e.mobile.path.parseUrl(a),o=a.pathname+a.search+a.hash,this._myUrl!==e.mobile.path.makeUrlAbsolute(o)?r=!0:i.preventDefault()),s.container.unbind(s.closeEvents),this.element.undelegate(s.closeLinkSelector,s.closeLinkEvents),this._close(r)},_bindContainerClose:function(){this.options.container.one(this.options.closeEvents,e.proxy(this,"_closePopup"))},open:function(i){var a,o,s,r,l,d,c=this,h=this.options;if(!e.mobile.popup.active){if(e.mobile.popup.active=this,this._scrollTop=e.mobile.window.scrollTop(),!h.history)return c._open(i),c._bindContainerClose(),c.element.delegate(h.closeLinkSelector,h.closeLinkEvents,function(e){c.close(),e.preventDefault()}),n;if(d=e.mobile.urlHistory,o=e.mobile.dialogHashKey,s=e.mobile.activePage,r=s.is(".ui-dialog"),this._myUrl=a=d.getActive().url,l=a.indexOf(o)>-1&&!r&&d.activeIndex>0)return c._open(i),c._bindContainerClose(),n;-1!==a.indexOf(o)||r?a=e.mobile.path.parseLocation().hash+o:a+=a.indexOf("#")>-1?o:"#"+o,0===d.activeIndex&&a===d.initialDst&&(a+=o),e(t).one("beforenavigate",function(e){e.preventDefault(),c._open(i),c._bindContainerClose()}),this.urlAltered=!0,e.mobile.navigate(a,{role:"dialog"})}},close:function(){e.mobile.popup.active===this&&(this._scrollTop=e.mobile.window.scrollTop(),this.options.history&&this.urlAltered?(e.mobile.back(),this.urlAltered=!1):this._closePopup())}}),e.mobile.popup.handleLink=function(t){var i,n=t.closest(":jqmData(role='page')"),a=0===n.length?e("body"):n,o=e(e.mobile.path.parseUrl(t.attr("href")).hash,a[0]);o.data("mobile-popup")&&(i=t.offset(),o.popup("open",{x:i.left+t.outerWidth()/2,y:i.top+t.outerHeight()/2,transition:t.jqmData("transition"),positionTo:t.jqmData("position-to")})),setTimeout(function(){var i=t.parent().parent();i.hasClass("ui-li")&&(t=i.parent()),t.removeClass(e.mobile.activeBtnClass)},300)},e.mobile.document.bind("pagebeforechange",function(t,i){"popup"===i.options.role&&(e.mobile.popup.handleLink(i.options.link),t.preventDefault())}),e.mobile.document.bind("pagecreate create",function(t){e.mobile.popup.prototype.enhanceWithin(t.target,!0)})}(e),function(e,t){var n=function(n){var a,o,s,r=(n.select,n._destroy),l=n.selectID,d=l?l:(e.mobile.ns||"")+"uuid-"+n.uuid,c=d+"-listbox",h=d+"-dialog",u=n.label,p=n.select.closest(".ui-page"),m=n._selectOptions(),f=n.isMultiple=n.select[0].multiple,g=l+"-button",b=l+"-menu",v=e("<div data-"+e.mobile.ns+"role='dialog' id='"+h+"' data-"+e.mobile.ns+"theme='"+n.options.theme+"' data-"+e.mobile.ns+"overlay-theme='"+n.options.overlayTheme+"'>"+"<div data-"+e.mobile.ns+"role='header'>"+"<div class='ui-title'>"+u.getEncodedText()+"</div>"+"</div>"+"<div data-"+e.mobile.ns+"role='content'></div>"+"</div>"),_=e("<div id='"+c+"' class='ui-selectmenu'>").insertAfter(n.select).popup({theme:n.options.overlayTheme}),C=e("<ul>",{"class":"ui-selectmenu-list",id:b,role:"listbox","aria-labelledby":g}).attr("data-"+e.mobile.ns+"theme",n.options.theme).attr("data-"+e.mobile.ns+"divider-theme",n.options.dividerTheme).appendTo(_),x=e("<div>",{"class":"ui-header ui-bar-"+n.options.theme}).prependTo(_),y=e("<h1>",{"class":"ui-title"}).appendTo(x);n.isMultiple&&(s=e("<a>",{text:n.options.closeText,href:"#","class":"ui-btn-left"}).attr("data-"+e.mobile.ns+"iconpos","notext").attr("data-"+e.mobile.ns+"icon","delete").appendTo(x).buttonMarkup()),e.extend(n,{select:n.select,selectID:l,buttonId:g,menuId:b,popupID:c,dialogID:h,thisPage:p,menuPage:v,label:u,selectOptions:m,isMultiple:f,theme:n.options.theme,listbox:_,list:C,header:x,headerTitle:y,headerClose:s,menuPageContent:a,menuPageClose:o,placeholder:"",build:function(){var i=this;i.refresh(),i._origTabIndex===t&&(i._origTabIndex=null===i.select[0].getAttribute("tabindex")?!1:i.select.attr("tabindex")),i.select.attr("tabindex","-1").focus(function(){e(this).blur(),i.button.focus()}),i.button.bind("vclick keydown",function(t){i.options.disabled||i.isOpen||("vclick"===t.type||t.keyCode&&(t.keyCode===e.mobile.keyCode.ENTER||t.keyCode===e.mobile.keyCode.SPACE))&&(i._decideFormat(),"overlay"===i.menuType?i.button.attr("href","#"+i.popupID).attr("data-"+(e.mobile.ns||"")+"rel","popup"):i.button.attr("href","#"+i.dialogID).attr("data-"+(e.mobile.ns||"")+"rel","dialog"),i.isOpen=!0)}),i.list.attr("role","listbox").bind("focusin",function(t){e(t.target).attr("tabindex","0").trigger("vmouseover")}).bind("focusout",function(t){e(t.target).attr("tabindex","-1").trigger("vmouseout")}).delegate("li:not(.ui-disabled, .ui-li-divider)","click",function(t){var a=i.select[0].selectedIndex,o=i.list.find("li:not(.ui-li-divider)").index(this),s=i._selectOptions().eq(o)[0];s.selected=i.isMultiple?!s.selected:!0,i.isMultiple&&e(this).find(".ui-icon").toggleClass("ui-icon-checkbox-on",s.selected).toggleClass("ui-icon-checkbox-off",!s.selected),(i.isMultiple||a!==o)&&i.select.trigger("change"),i.isMultiple?i.list.find("li:not(.ui-li-divider)").eq(o).addClass("ui-btn-down-"+n.options.theme).find("a").first().focus():i.close(),t.preventDefault()}).keydown(function(t){var i,a,o=e(t.target),s=o.closest("li");switch(t.keyCode){case 38:return i=s.prev().not(".ui-selectmenu-placeholder"),i.is(".ui-li-divider")&&(i=i.prev()),i.length&&(o.blur().attr("tabindex","-1"),i.addClass("ui-btn-down-"+n.options.theme).find("a").first().focus()),!1;case 40:return a=s.next(),a.is(".ui-li-divider")&&(a=a.next()),a.length&&(o.blur().attr("tabindex","-1"),a.addClass("ui-btn-down-"+n.options.theme).find("a").first().focus()),!1;case 13:case 32:return o.trigger("click"),!1}}),i.menuPage.bind("pagehide",function(){e.mobile._bindPageRemove.call(i.thisPage)}),i.listbox.bind("popupafterclose",function(){i.close()}),i.isMultiple&&i.headerClose.click(function(){return"overlay"===i.menuType?(i.close(),!1):t}),i.thisPage.addDependents(this.menuPage)},_isRebuildRequired:function(){var e=this.list.find("li"),t=this._selectOptions();return t.text()!==e.text()},selected:function(){return this._selectOptions().filter(":selected:not( :jqmData(placeholder='true') )")},refresh:function(t){var i,n=this;this.element,this.isMultiple,(t||this._isRebuildRequired())&&n._buildList(),i=this.selectedIndices(),n.setButtonText(),n.setButtonCount(),n.list.find("li:not(.ui-li-divider)").removeClass(e.mobile.activeBtnClass).attr("aria-selected",!1).each(function(t){if(e.inArray(t,i)>-1){var a=e(this);a.attr("aria-selected",!0),n.isMultiple?a.find(".ui-icon").removeClass("ui-icon-checkbox-off").addClass("ui-icon-checkbox-on"):a.is(".ui-selectmenu-placeholder")?a.next().addClass(e.mobile.activeBtnClass):a.addClass(e.mobile.activeBtnClass)}})},close:function(){if(!this.options.disabled&&this.isOpen){var e=this;"page"===e.menuType?(e.menuPage.dialog("close"),e.list.appendTo(e.listbox)):e.listbox.popup("close"),e._focusButton(),e.isOpen=!1}},open:function(){this.button.click()},_decideFormat:function(){function t(){var t=i.list.find("."+e.mobile.activeBtnClass+" a");0===t.length&&(t=i.list.find("li.ui-btn:not( :jqmData(placeholder='true') ) a")),t.first().focus().closest("li").addClass("ui-btn-down-"+n.options.theme)}var i=this,a=e.mobile.window,o=i.list.parent(),s=o.outerHeight(),r=(o.outerWidth(),e("."+e.mobile.activePageClass),a.scrollTop()),l=i.button.offset().top,d=a.height();a.width(),s>d-80||!e.support.scrollTop?(i.menuPage.appendTo(e.mobile.pageContainer).page(),i.menuPageContent=v.find(".ui-content"),i.menuPageClose=v.find(".ui-header a"),i.thisPage.unbind("pagehide.remove"),0===r&&l>d&&i.thisPage.one("pagehide",function(){e(this).jqmData("lastScroll",l)}),i.menuPage.one("pageshow",function(){t()}).one("pagehide",function(){i.close()}),i.menuType="page",i.menuPageContent.append(i.list),i.menuPage.find("div .ui-title").text(i.label.text())):(i.menuType="overlay",i.listbox.one("popupafteropen",t))},_buildList:function(){var t=this,n=this.options,a=this.placeholder,o=!0,s=t.isMultiple?"checkbox-off":"false";t.list.empty().filter(".ui-listview").listview("destroy");for(var r,l=t.select.find("option"),d=l.length,c=this.select[0],h="data-"+e.mobile.ns,u=h+"option-index",p=h+"icon",m=h+"role",f=h+"placeholder",g=i.createDocumentFragment(),b=!1,v=0;d>v;v++,b=!1){var _=l[v],C=e(_),x=_.parentNode,y=C.text(),w=i.createElement("a"),T=[];if(w.setAttribute("href","#"),w.appendChild(i.createTextNode(y)),x!==c&&"optgroup"===x.nodeName.toLowerCase()){var D=x.getAttribute("label");if(D!==r){var P=i.createElement("li");P.setAttribute(m,"list-divider"),P.setAttribute("role","option"),P.setAttribute("tabindex","-1"),P.appendChild(i.createTextNode(D)),g.appendChild(P),r=D}}!o||_.getAttribute("value")&&0!==y.length&&!C.jqmData("placeholder")||(o=!1,b=!0,null===_.getAttribute(f)&&(this._removePlaceholderAttr=!0),_.setAttribute(f,!0),n.hidePlaceholderMenuItems&&T.push("ui-selectmenu-placeholder"),a!==y&&(a=t.placeholder=y));var k=i.createElement("li");_.disabled&&(T.push("ui-disabled"),k.setAttribute("aria-disabled",!0)),k.setAttribute(u,v),k.setAttribute(p,s),b&&k.setAttribute(f,!0),k.className=T.join(" "),k.setAttribute("role","option"),w.setAttribute("tabindex","-1"),k.appendChild(w),g.appendChild(k)}t.list[0].appendChild(g),this.isMultiple||a.length?this.headerTitle.text(this.placeholder):this.header.hide(),t.list.listview()},_button:function(){return e("<a>",{href:"#",role:"button",id:this.buttonId,"aria-haspopup":"true","aria-owns":this.menuId})},_destroy:function(){this.close(),this._origTabIndex!==t&&(this._origTabIndex!==!1?this.select.attr("tabindex",this._origTabIndex):this.select.removeAttr("tabindex")),this._removePlaceholderAttr&&this._selectOptions().removeAttr("data-"+e.mobile.ns+"placeholder"),this.listbox.remove(),r.apply(this,arguments)}})};e.mobile.document.bind("selectmenubeforecreate",function(t){var i=e(t.target).data("mobile-selectmenu");i.options.nativeMenu||0!==i.element.parents(":jqmData(role='popup')").length||n(i)})}(e),function(e,t){e.widget("mobile.controlgroup",e.mobile.widget,e.extend({options:{shadow:!1,corners:!0,excludeInvisible:!0,type:"vertical",mini:!1,initSelector:":jqmData(role='controlgroup')"},_create:function(){var i=this.element,n={inner:e("<div class='ui-controlgroup-controls'></div>"),legend:e("<div role='heading' class='ui-controlgroup-label'></div>")},a=i.children("legend"),o=this;i.wrapInner(n.inner),a.length&&n.legend.append(a).insertBefore(i.children(0)),i.addClass("ui-corner-all ui-controlgroup"),e.extend(this,{_initialRefresh:!0}),e.each(this.options,function(e,i){o.options[e]=t,o._setOption(e,i,!0)})},_init:function(){this.refresh()},_setOption:function(i,n){var a="_set"+i.charAt(0).toUpperCase()+i.slice(1);this[a]!==t&&this[a](n),this._super(i,n),this.element.attr("data-"+(e.mobile.ns||"")+i.replace(/([A-Z])/,"-$1").toLowerCase(),n)},_setType:function(e){this.element.removeClass("ui-controlgroup-horizontal ui-controlgroup-vertical").addClass("ui-controlgroup-"+e),this.refresh()},_setCorners:function(e){this.element.toggleClass("ui-corner-all",e)},_setShadow:function(e){this.element.toggleClass("ui-shadow",e)},_setMini:function(e){this.element.toggleClass("ui-mini",e)},container:function(){return this.element.children(".ui-controlgroup-controls")},refresh:function(){var t=this.element.find(".ui-btn").not(".ui-slider-handle"),i=this._initialRefresh;e.mobile.checkboxradio&&this.element.find(":mobile-checkboxradio").checkboxradio("refresh"),this._addFirstLastClasses(t,this.options.excludeInvisible?this._getVisibles(t,i):t,i),this._initialRefresh=!1}},e.mobile.behaviors.addFirstLastClasses)),e(function(){e.mobile.document.bind("pagecreate create",function(t){e.mobile.controlgroup.prototype.enhanceWithin(t.target,!0)})})}(e),function(e){e(i).bind("pagecreate create",function(t){e(t.target).find("a").jqmEnhanceable().not(".ui-btn, .ui-link-inherit, :jqmData(role='none'), :jqmData(role='nojs')").addClass("ui-link")})}(e),function(e,t){e.widget("mobile.fixedtoolbar",e.mobile.widget,{options:{visibleOnPageShow:!0,disablePageZoom:!0,transition:"slide",fullscreen:!1,tapToggle:!0,tapToggleBlacklist:"a, button, input, select, textarea, .ui-header-fixed, .ui-footer-fixed, .ui-popup, .ui-panel, .ui-panel-dismiss-open",hideDuringFocus:"input, textarea, select",updatePagePadding:!0,trackPersistentToolbars:!0,supportBlacklist:function(){return!e.support.fixedPosition},initSelector:":jqmData(position='fixed')"},_create:function(){var i=this,n=i.options,a=i.element,o=a.is(":jqmData(role='header')")?"header":"footer",s=a.closest(".ui-page");return n.supportBlacklist()?(i.destroy(),t):(a.addClass("ui-"+o+"-fixed"),n.fullscreen?(a.addClass("ui-"+o+"-fullscreen"),s.addClass("ui-page-"+o+"-fullscreen")):s.addClass("ui-page-"+o+"-fixed"),e.extend(this,{_thisPage:null}),i._addTransitionClass(),i._bindPageEvents(),i._bindToggleHandlers(),t)},_addTransitionClass:function(){var e=this.options.transition;e&&"none"!==e&&("slide"===e&&(e=this.element.is(".ui-header")?"slidedown":"slideup"),this.element.addClass(e))},_bindPageEvents:function(){this._thisPage=this.element.closest(".ui-page"),this._on(this._thisPage,{pagebeforeshow:"_handlePageBeforeShow",webkitAnimationStart:"_handleAnimationStart",animationstart:"_handleAnimationStart",updatelayout:"_handleAnimationStart",pageshow:"_handlePageShow",pagebeforehide:"_handlePageBeforeHide"})},_handlePageBeforeShow:function(){var t=this.options;t.disablePageZoom&&e.mobile.zoom.disable(!0),t.visibleOnPageShow||this.hide(!0)},_handleAnimationStart:function(){this.options.updatePagePadding&&this.updatePagePadding(this._thisPage)},_handlePageShow:function(){this.updatePagePadding(this._thisPage),this.options.updatePagePadding&&this._on(e.mobile.window,{throttledresize:"updatePagePadding"})},_handlePageBeforeHide:function(t,i){var n=this.options;if(n.disablePageZoom&&e.mobile.zoom.enable(!0),n.updatePagePadding&&this._off(e.mobile.window,"throttledresize"),n.trackPersistentToolbars){var a=e(".ui-footer-fixed:jqmData(id)",this._thisPage),o=e(".ui-header-fixed:jqmData(id)",this._thisPage),s=a.length&&i.nextPage&&e(".ui-footer-fixed:jqmData(id='"+a.jqmData("id")+"')",i.nextPage)||e(),r=o.length&&i.nextPage&&e(".ui-header-fixed:jqmData(id='"+o.jqmData("id")+"')",i.nextPage)||e();(s.length||r.length)&&(s.add(r).appendTo(e.mobile.pageContainer),i.nextPage.one("pageshow",function(){r.prependTo(this),s.appendTo(this)}))}},_visible:!0,updatePagePadding:function(i){var n=this.element,a=n.is(".ui-header"),o=parseFloat(n.css(a?"top":"bottom"));this.options.fullscreen||(i=i&&i.type===t&&i||this._thisPage||n.closest(".ui-page"),e(i).css("padding-"+(a?"top":"bottom"),n.outerHeight()+o))},_useTransition:function(t){var i=e.mobile.window,n=this.element,a=i.scrollTop(),o=n.height(),s=n.closest(".ui-page").height(),r=e.mobile.getScreenHeight(),l=n.is(":jqmData(role='header')")?"header":"footer";return!t&&(this.options.transition&&"none"!==this.options.transition&&("header"===l&&!this.options.fullscreen&&a>o||"footer"===l&&!this.options.fullscreen&&s-o>a+r)||this.options.fullscreen)},show:function(e){var t="ui-fixed-hidden",i=this.element;this._useTransition(e)?i.removeClass("out "+t).addClass("in").animationComplete(function(){i.removeClass("in")}):i.removeClass(t),this._visible=!0},hide:function(e){var t="ui-fixed-hidden",i=this.element,n="out"+("slide"===this.options.transition?" reverse":"");this._useTransition(e)?i.addClass(n).removeClass("in").animationComplete(function(){i.addClass(t).removeClass(n)}):i.addClass(t).removeClass(n),this._visible=!1},toggle:function(){this[this._visible?"hide":"show"]()},_bindToggleHandlers:function(){var t,i,n=this,a=n.options,o=n.element,s=!0;o.closest(".ui-page").bind("vclick",function(t){a.tapToggle&&!e(t.target).closest(a.tapToggleBlacklist).length&&n.toggle()}).bind("focusin focusout",function(o){1025>screen.width&&e(o.target).is(a.hideDuringFocus)&&!e(o.target).closest(".ui-header-fixed, .ui-footer-fixed").length&&("focusout"!==o.type||s?"focusin"===o.type&&s&&(clearTimeout(t),s=!1,i=setTimeout(function(){n.hide()},0)):(s=!0,clearTimeout(i),t=setTimeout(function(){n.show()},0)))})},_destroy:function(){var e=this.element,t=e.is(".ui-header");e.closest(".ui-page").css("padding-"+(t?"top":"bottom"),""),e.removeClass("ui-header-fixed ui-footer-fixed ui-header-fullscreen ui-footer-fullscreen in out fade slidedown slideup ui-fixed-hidden"),e.closest(".ui-page").removeClass("ui-page-header-fixed ui-page-footer-fixed ui-page-header-fullscreen ui-page-footer-fullscreen")}}),e.mobile.document.bind("pagecreate create",function(t){e(t.target).jqmData("fullscreen")&&e(e.mobile.fixedtoolbar.prototype.options.initSelector,t.target).not(":jqmData(fullscreen)").jqmData("fullscreen",!0),e.mobile.fixedtoolbar.prototype.enhanceWithin(t.target)})}(e),function(e){e.widget("mobile.fixedtoolbar",e.mobile.fixedtoolbar,{_create:function(){this._super(),this._workarounds()},_workarounds:function(){var e=navigator.userAgent,t=navigator.platform,i=e.match(/AppleWebKit\/([0-9]+)/),n=!!i&&i[1],a=null,o=this;if(t.indexOf("iPhone")>-1||t.indexOf("iPad")>-1||t.indexOf("iPod")>-1)a="ios";else{if(!(e.indexOf("Android")>-1))return;a="android"}if("ios"===a)o._bindScrollWorkaround();else{if(!("android"===a&&n&&534>n))return;o._bindScrollWorkaround(),o._bindListThumbWorkaround()}},_viewportOffset:function(){var t=this.element,i=t.is(".ui-header"),n=Math.abs(t.offset().top-e.mobile.window.scrollTop());return i||(n=Math.round(n-e.mobile.window.height()+t.outerHeight())-60),n},_bindScrollWorkaround:function(){var t=this;this._on(e.mobile.window,{scrollstop:function(){var e=t._viewportOffset();e>2&&t._visible&&t._triggerRedraw()}})},_bindListThumbWorkaround:function(){this.element.closest(".ui-page").addClass("ui-android-2x-fixed")},_triggerRedraw:function(){var t=parseFloat(e(".ui-page-active").css("padding-bottom"));
e(".ui-page-active").css("padding-bottom",t+1+"px"),setTimeout(function(){e(".ui-page-active").css("padding-bottom",t+"px")},0)},destroy:function(){this._super(),this.element.closest(".ui-page-active").removeClass("ui-android-2x-fix")}})}(e),function(e,n){e.widget("mobile.panel",e.mobile.widget,{options:{classes:{panel:"ui-panel",panelOpen:"ui-panel-open",panelClosed:"ui-panel-closed",panelFixed:"ui-panel-fixed",panelInner:"ui-panel-inner",modal:"ui-panel-dismiss",modalOpen:"ui-panel-dismiss-open",pagePanel:"ui-page-panel",pagePanelOpen:"ui-page-panel-open",contentWrap:"ui-panel-content-wrap",contentWrapOpen:"ui-panel-content-wrap-open",contentWrapClosed:"ui-panel-content-wrap-closed",contentFixedToolbar:"ui-panel-content-fixed-toolbar",contentFixedToolbarOpen:"ui-panel-content-fixed-toolbar-open",contentFixedToolbarClosed:"ui-panel-content-fixed-toolbar-closed",animate:"ui-panel-animate"},animate:!0,theme:"c",position:"left",dismissible:!0,display:"reveal",initSelector:":jqmData(role='panel')",swipeClose:!0,positionFixed:!1},_panelID:null,_closeLink:null,_page:null,_modal:null,_panelInner:null,_wrapper:null,_fixedToolbar:null,_create:function(){var t=this,i=t.element,n=i.closest(":jqmData(role='page')"),a=function(){var t=e.data(n[0],"mobilePage").options.theme,i="ui-body-"+t;return i},o=function(){var e=i.find("."+t.options.classes.panelInner);return 0===e.length&&(e=i.children().wrapAll('<div class="'+t.options.classes.panelInner+'" />').parent()),e},s=function(){var i=n.find("."+t.options.classes.contentWrap);return 0===i.length&&(i=n.children(".ui-header:not(:jqmData(position='fixed')), .ui-content:not(:jqmData(role='popup')), .ui-footer:not(:jqmData(position='fixed'))").wrapAll('<div class="'+t.options.classes.contentWrap+" "+a()+'" />').parent(),e.support.cssTransform3d&&t.options.animate&&i.addClass(t.options.classes.animate)),i},r=function(){var i=n.find("."+t.options.classes.contentFixedToolbar);return 0===i.length&&(i=n.find(".ui-header:jqmData(position='fixed'), .ui-footer:jqmData(position='fixed')").addClass(t.options.classes.contentFixedToolbar),e.support.cssTransform3d&&t.options.animate&&i.addClass(t.options.classes.animate)),i};e.extend(this,{_panelID:i.attr("id"),_closeLink:i.find(":jqmData(rel='close')"),_page:i.closest(":jqmData(role='page')"),_pageTheme:a(),_panelInner:o(),_wrapper:s(),_fixedToolbar:r()}),t._addPanelClasses(),t._wrapper.addClass(this.options.classes.contentWrapClosed),t._fixedToolbar.addClass(this.options.classes.contentFixedToolbarClosed),t._page.addClass(t.options.classes.pagePanel),e.support.cssTransform3d&&t.options.animate&&this.element.addClass(t.options.classes.animate),t._bindUpdateLayout(),t._bindCloseEvents(),t._bindLinkListeners(),t._bindPageEvents(),t.options.dismissible&&t._createModal(),t._bindSwipeEvents()},_createModal:function(){var t=this;t._modal=e("<div class='"+t.options.classes.modal+"' data-panelid='"+t._panelID+"'></div>").on("mousedown",function(){t.close()}).appendTo(this._page)},_getPosDisplayClasses:function(e){return e+"-position-"+this.options.position+" "+e+"-display-"+this.options.display},_getPanelClasses:function(){var e=this.options.classes.panel+" "+this._getPosDisplayClasses(this.options.classes.panel)+" "+this.options.classes.panelClosed;return this.options.theme&&(e+=" ui-body-"+this.options.theme),this.options.positionFixed&&(e+=" "+this.options.classes.panelFixed),e},_addPanelClasses:function(){this.element.addClass(this._getPanelClasses())},_bindCloseEvents:function(){var e=this;e._closeLink.on("click.panel",function(t){return t.preventDefault(),e.close(),!1}),e.element.on("click.panel","a:jqmData(ajax='false')",function(){e.close()})},_positionPanel:function(){var t=this,i=t._panelInner.outerHeight(),n=i>e.mobile.getScreenHeight();n||!t.options.positionFixed?(n&&(t._unfixPanel(),e.mobile.resetActivePageHeight(i)),t._scrollIntoView(i)):t._fixPanel()},_scrollIntoView:function(i){e(t).scrollTop()>i&&t.scrollTo(0,0)},_bindFixListener:function(){this._on(e(t),{throttledresize:"_positionPanel"})},_unbindFixListener:function(){this._off(e(t),"throttledresize")},_unfixPanel:function(){this.options.positionFixed&&e.support.fixedPosition&&this.element.removeClass(this.options.classes.panelFixed)},_fixPanel:function(){this.options.positionFixed&&e.support.fixedPosition&&this.element.addClass(this.options.classes.panelFixed)},_bindUpdateLayout:function(){var e=this;e.element.on("updatelayout",function(){e._open&&e._positionPanel()})},_bindLinkListeners:function(){var t=this;t._page.on("click.panel","a",function(i){if(this.href.split("#")[1]===t._panelID&&t._panelID!==n){i.preventDefault();var a=e(this);return a.hasClass("ui-link")||(a.addClass(e.mobile.activeBtnClass),t.element.one("panelopen panelclose",function(){a.removeClass(e.mobile.activeBtnClass)})),t.toggle(),!1}})},_bindSwipeEvents:function(){var e=this,t=e._modal?e.element.add(e._modal):e.element;e.options.swipeClose&&("left"===e.options.position?t.on("swipeleft.panel",function(){e.close()}):t.on("swiperight.panel",function(){e.close()}))},_bindPageEvents:function(){var e=this;e._page.on("panelbeforeopen",function(t){e._open&&t.target!==e.element[0]&&e.close()}).on("pagehide",function(){e._open&&e.close(!0)}).on("keyup.panel",function(t){27===t.keyCode&&e._open&&e.close()})},_open:!1,_contentWrapOpenClasses:null,_fixedToolbarOpenClasses:null,_modalOpenClasses:null,open:function(t){if(!this._open){var i=this,n=i.options,a=function(){i._page.off("panelclose"),i._page.jqmData("panel","open"),!t&&e.support.cssTransform3d&&n.animate?i.element.add(i._wrapper).on(i._transitionEndEvents,o):setTimeout(o,0),i.options.theme&&"overlay"!==i.options.display&&i._page.removeClass(i._pageTheme).addClass("ui-body-"+i.options.theme),i.element.removeClass(n.classes.panelClosed).addClass(n.classes.panelOpen),i._positionPanel(),i.options.theme&&"overlay"!==i.options.display&&i._wrapper.css("min-height",i._page.css("min-height")),i._contentWrapOpenClasses=i._getPosDisplayClasses(n.classes.contentWrap),i._wrapper.removeClass(n.classes.contentWrapClosed).addClass(i._contentWrapOpenClasses+" "+n.classes.contentWrapOpen),i._fixedToolbarOpenClasses=i._getPosDisplayClasses(n.classes.contentFixedToolbar),i._fixedToolbar.removeClass(n.classes.contentFixedToolbarClosed).addClass(i._fixedToolbarOpenClasses+" "+n.classes.contentFixedToolbarOpen),i._modalOpenClasses=i._getPosDisplayClasses(n.classes.modal)+" "+n.classes.modalOpen,i._modal&&i._modal.addClass(i._modalOpenClasses)},o=function(){i.element.add(i._wrapper).off(i._transitionEndEvents,o),i._page.addClass(n.classes.pagePanelOpen),i._bindFixListener(),i._trigger("open")};0>this.element.closest(".ui-page-active").length&&(t=!0),i._trigger("beforeopen"),"open"===i._page.jqmData("panel")?i._page.on("panelclose",function(){a()}):a(),i._open=!0}},close:function(t){if(this._open){var i=this.options,n=this,a=function(){!t&&e.support.cssTransform3d&&i.animate?n.element.add(n._wrapper).on(n._transitionEndEvents,o):setTimeout(o,0),n._page.removeClass(i.classes.pagePanelOpen),n.element.removeClass(i.classes.panelOpen),n._wrapper.removeClass(i.classes.contentWrapOpen),n._fixedToolbar.removeClass(i.classes.contentFixedToolbarOpen),n._modal&&n._modal.removeClass(n._modalOpenClasses)},o=function(){n.options.theme&&"overlay"!==n.options.display&&(n._page.removeClass("ui-body-"+n.options.theme).addClass(n._pageTheme),n._wrapper.css("min-height","")),n.element.add(n._wrapper).off(n._transitionEndEvents,o),n.element.addClass(i.classes.panelClosed),n._wrapper.removeClass(n._contentWrapOpenClasses).addClass(i.classes.contentWrapClosed),n._fixedToolbar.removeClass(n._fixedToolbarOpenClasses).addClass(i.classes.contentFixedToolbarClosed),n._fixPanel(),n._unbindFixListener(),e.mobile.resetActivePageHeight(),n._page.jqmRemoveData("panel"),n._trigger("close")};0>this.element.closest(".ui-page-active").length&&(t=!0),n._trigger("beforeclose"),a(),n._open=!1}},toggle:function(){this[this._open?"close":"open"]()},_transitionEndEvents:"webkitTransitionEnd oTransitionEnd otransitionend transitionend msTransitionEnd",_destroy:function(){var t=this.options.classes,i=this.options.theme,n=this.element.siblings("."+t.panel).length;n?this._open&&(this._wrapper.removeClass(t.contentWrapOpen),this._fixedToolbar.removeClass(t.contentFixedToolbarOpen),this._page.jqmRemoveData("panel"),this._page.removeClass(t.pagePanelOpen),i&&this._page.removeClass("ui-body-"+i).addClass(this._pageTheme)):(this._wrapper.children().unwrap(),this._page.find("a").unbind("panelopen panelclose"),this._page.removeClass(t.pagePanel),this._open&&(this._page.jqmRemoveData("panel"),this._page.removeClass(t.pagePanelOpen),i&&this._page.removeClass("ui-body-"+i).addClass(this._pageTheme),e.mobile.resetActivePageHeight())),this._panelInner.children().unwrap(),this.element.removeClass([this._getPanelClasses(),t.panelAnimate].join(" ")).off("swipeleft.panel swiperight.panel").off("panelbeforeopen").off("panelhide").off("keyup.panel").off("updatelayout"),this._closeLink.off("click.panel"),this._modal&&this._modal.remove(),this.element.off(this._transitionEndEvents).removeClass([t.panelUnfixed,t.panelClosed,t.panelOpen].join(" "))}}),e(i).bind("pagecreate create",function(t){e.mobile.panel.prototype.enhanceWithin(t.target)})}(e),function(e,t){e.widget("mobile.table",e.mobile.widget,{options:{classes:{table:"ui-table"},initSelector:":jqmData(role='table')"},_create:function(){var e=this;e.refresh(!0)},refresh:function(i){var n=this,a=this.element.find("thead tr");i&&this.element.addClass(this.options.classes.table),n.headers=this.element.find("tr:eq(0)").children(),n.allHeaders=n.headers.add(a.children()),a.each(function(){var o=0;e(this).children().each(function(){var s=parseInt(e(this).attr("colspan"),10),r=":nth-child("+(o+1)+")";if(e(this).jqmData("colstart",o+1),s)for(var l=0;s-1>l;l++)o++,r+=", :nth-child("+(o+1)+")";i===t&&e(this).jqmData("cells",""),e(this).jqmData("cells",n.element.find("tr").not(a.eq(0)).not(this).children(r)),o++})}),i===t&&this.element.trigger("refresh")}}),e.mobile.document.bind("pagecreate create",function(t){e.mobile.table.prototype.enhanceWithin(t.target)})}(e),function(e,t){e.mobile.table.prototype.options.mode="columntoggle",e.mobile.table.prototype.options.columnBtnTheme=null,e.mobile.table.prototype.options.columnPopupTheme=null,e.mobile.table.prototype.options.columnBtnText="Columns...",e.mobile.table.prototype.options.classes=e.extend(e.mobile.table.prototype.options.classes,{popup:"ui-table-columntoggle-popup",columnBtn:"ui-table-columntoggle-btn",priorityPrefix:"ui-table-priority-",columnToggleTable:"ui-table-columntoggle"}),e.mobile.document.delegate(":jqmData(role='table')","tablecreate refresh",function(i){var n,a,o,s,r=e(this),l=r.data("mobile-table"),d=i.type,c=l.options,h=e.mobile.ns,u=(r.attr("id")||c.classes.popup)+"-popup";"columntoggle"===c.mode&&("refresh"!==d&&(l.element.addClass(c.classes.columnToggleTable),n=e("<a href='#"+u+"' class='"+c.classes.columnBtn+"' data-"+h+"rel='popup' data-"+h+"mini='true'>"+c.columnBtnText+"</a>"),a=e("<div data-"+h+"role='popup' data-"+h+"role='fieldcontain' class='"+c.classes.popup+"' id='"+u+"'></div>"),o=e("<fieldset data-"+h+"role='controlgroup'></fieldset>")),l.headers.not("td").each(function(t){var i=e(this).jqmData("priority"),n=e(this).add(e(this).jqmData("cells"));i&&(n.addClass(c.classes.priorityPrefix+i),"refresh"!==d?e("<label><input type='checkbox' checked />"+e(this).text()+"</label>").appendTo(o).children(0).jqmData("cells",n).checkboxradio({theme:c.columnPopupTheme}):e("#"+u+" fieldset div:eq("+t+")").find("input").jqmData("cells",n))}),"refresh"!==d&&o.appendTo(a),s=o===t?e("#"+u+" fieldset"):o,"refresh"!==d&&(s.on("change","input",function(){this.checked?e(this).jqmData("cells").removeClass("ui-table-cell-hidden").addClass("ui-table-cell-visible"):e(this).jqmData("cells").removeClass("ui-table-cell-visible").addClass("ui-table-cell-hidden")}),n.insertBefore(r).buttonMarkup({theme:c.columnBtnTheme}),a.insertBefore(r).popup()),l.update=function(){s.find("input").each(function(){this.checked?(this.checked="table-cell"===e(this).jqmData("cells").eq(0).css("display"),"refresh"===d&&e(this).jqmData("cells").addClass("ui-table-cell-visible")):e(this).jqmData("cells").addClass("ui-table-cell-hidden"),e(this).checkboxradio("refresh")})},e.mobile.window.on("throttledresize",l.update),l.update())})}(e),function(e){e.mobile.table.prototype.options.mode="reflow",e.mobile.table.prototype.options.classes=e.extend(e.mobile.table.prototype.options.classes,{reflowTable:"ui-table-reflow",cellLabels:"ui-table-cell-label"}),e.mobile.document.delegate(":jqmData(role='table')","tablecreate refresh",function(t){var i=e(this),n=t.type,a=i.data("mobile-table"),o=a.options;if("reflow"===o.mode){"refresh"!==n&&a.element.addClass(o.classes.reflowTable);var s=e(a.allHeaders.get().reverse());s.each(function(){var t=e(this).jqmData("cells"),i=e(this).jqmData("colstart"),n=t.not(this).filter("thead th").length&&" ui-table-cell-label-top",a=e(this).text();if(""!==a)if(n){var s=parseInt(e(this).attr("colspan"),10),r="";s&&(r="td:nth-child("+s+"n + "+i+")"),t.filter(r).prepend("<b class='"+o.classes.cellLabels+n+"'>"+a+"</b>")}else t.prepend("<b class='"+o.classes.cellLabels+"'>"+a+"</b>")})}})}(e),function(e,t){function i(e){o=e.originalEvent,d=o.accelerationIncludingGravity,s=Math.abs(d.x),r=Math.abs(d.y),l=Math.abs(d.z),!t.orientation&&(s>7||(l>6&&8>r||8>l&&r>6)&&s>5)?c.enabled&&c.disable():c.enabled||c.enable()}e.mobile.iosorientationfixEnabled=!0;var a=navigator.userAgent;if(!(/iPhone|iPad|iPod/.test(navigator.platform)&&/OS [1-5]_[0-9_]* like Mac OS X/i.test(a)&&a.indexOf("AppleWebKit")>-1))return e.mobile.iosorientationfixEnabled=!1,n;var o,s,r,l,d,c=e.mobile.zoom;e.mobile.document.on("mobileinit",function(){e.mobile.iosorientationfixEnabled&&e.mobile.window.bind("orientationchange.iosorientationfix",c.enable).bind("devicemotion.iosorientationfix",i)})}(e,this),function(e,t){function n(){a.removeClass("ui-mobile-rendering")}var a=e("html"),o=(e("head"),e.mobile.window);e(t.document).trigger("mobileinit"),e.mobile.gradeA()&&(e.mobile.ajaxBlacklist&&(e.mobile.ajaxEnabled=!1),a.addClass("ui-mobile ui-mobile-rendering"),setTimeout(n,5e3),e.extend(e.mobile,{initializePage:function(){var t=e.mobile.path,a=e(":jqmData(role='page'), :jqmData(role='dialog')"),s=t.stripHash(t.stripQueryParams(t.parseLocation().hash)),r=i.getElementById(s);a.length||(a=e("body").wrapInner("<div data-"+e.mobile.ns+"role='page'></div>").children(0)),a.each(function(){var t=e(this);t.jqmData("url")||t.attr("data-"+e.mobile.ns+"url",t.attr("id")||location.pathname+location.search)}),e.mobile.firstPage=a.first(),e.mobile.pageContainer=e.mobile.firstPage.parent().addClass("ui-mobile-viewport"),o.trigger("pagecontainercreate"),e.mobile.showPageLoadingMsg(),n(),e.mobile.hashListeningEnabled&&e.mobile.path.isHashValid(location.hash)&&(e(r).is(':jqmData(role="page")')||e.mobile.path.isPath(s)||s===e.mobile.dialogHashKey)?e.event.special.navigate.isPushStateEnabled()?(e.mobile.navigate.history.stack=[],e.mobile.navigate(e.mobile.path.isPath(location.hash)?location.hash:location.href)):o.trigger("hashchange",[!0]):(e.mobile.path.isHashValid(location.hash)&&(e.mobile.urlHistory.initialDst=s.replace("#","")),e.event.special.navigate.isPushStateEnabled()&&e.mobile.navigate.navigator.squash(t.parseLocation().href),e.mobile.changePage(e.mobile.firstPage,{transition:"none",reverse:!0,changeHash:!1,fromHashChange:!0}))}}),e.mobile.navreadyDeferred.resolve(),e(function(){t.scrollTo(0,1),e.mobile.defaultHomeScroll=e.support.scrollTop&&1!==e.mobile.window.scrollTop()?1:0,e.mobile.autoInitializePage&&e.mobile.initializePage(),o.load(e.mobile.silentScroll),e.support.cssPointerEvents||e.mobile.document.delegate(".ui-disabled","vclick",function(e){e.preventDefault(),e.stopImmediatePropagation()})}))}(e,this)});
//@ sourceMappingURL=jquery.mobile-1.3.1.min.map


(function($){
	
	var gallerySlider = {
		init: function(){
			
			if ($(".imgnav .bxslider").length > 0){
				slider = $(".imgnav .bxslider").bxSlider({
					pager:false,
					speed:300,

					onSliderLoad: function(currentIndex){
						totalSlides = slider.getSlideCount();
						gallerySlider.counterInit(currentIndex,totalSlides);
					},
					onSlideBefore: function($slideElement, oldIndex, newIndex){
						gallerySlider.counterUpdate($slideElement, oldIndex, newIndex);
					}
				});
			}
		},
		counterInit: function(currentIndex,totalSlides){
			var currentPage = $(".imgnav .bxslider .pager .current"),
				totalPages = $(".imgnav .bxslider .pager .total");
		
			currentPage.html(currentIndex+1);
			totalPages.html(totalSlides);
		},
		counterUpdate: function($slideElement, oldIndex, newIndex){
			var currentPage = $(".pager .current", $slideElement);
			currentPage.html(newIndex+1);
		}
	}

	$(function(){
		gallerySlider.init();
		
	});

}(jQuery));


/* Adjust the height of each element on showroom TWO COLUMNS page.
 *
 */
(function($){
	
	var elementsHeight = {
		init: function(){
			var showlist = $(".showlist-two-columns .showlist");

			showlist.each(function(){
				var list = $(this),
					items = $("li",list),
					newHeight = 0;

				for (var i = 0; i < items.length; i+=2){
					newHeight = Math.max($(items[i]).height(), $(items[i+1]).height());
					$(items[i]).css("height",newHeight);
					$(items[i+1]).css("height",newHeight);
				}

			})
		}
	}

	$(function(){
		if ($(".showlist-two-columns").length > 0){
			elementsHeight.init();
		}
		
		
	});

}(jQuery));


/*
	Author: 		Brett Chaney
	Description: 	Detects if user is signed in (via cookie) and display "Welcome Bar"
*/


(function($) {
	$(function() {

		var showWelcomeBar = function() {
			// get user cookie data
			var userCookie 			= $.cookie("dfy.lh.u"),
			 	userCookieParsed 	= JSON.parse(decodeURIComponent(userCookie)),
			 	userTitle 			= userCookieParsed["t"],
			 	userName 			= userCookieParsed["u"],
			 	welcomeMsg			= $(".welcome-bar .user-name").data("msg").replace('{title}', userTitle).replace('{user}', userName);
			
			//if title is Chinese then show name first
			if(userTitle.match(/[\u3400-\u9FBF]/)){
				welcomeMsg			= $(".welcome-bar .user-name").data("msg").replace('{titleName}', userName + ' ' + userTitle);
			}
			else{
				welcomeMsg			= $(".welcome-bar .user-name").data("msg").replace('{titleName}', userTitle + ' ' + userName);
			}
			
			
			// inject welcome message
			$(".welcome-bar .user-name").html(welcomeMsg);

			// display welcome bar
			$(".welcome-bar").show();
			
			//hide "login/register" btn after login
			$("#header UL#eyebrow > LI.text > A, #header UL#toolbar > LI.menu-item > A").each(function(){
				if($(this).prop("href").indexOf("/register")!=-1){//if exist
					$(this).hide();
				}
			})
		};

		if ($.cookie("dfy.lh.u") && $(".welcome-bar")[0]) {
			// if user cookie exists display welcome bar
			showWelcomeBar();
		}

	});
})(jQuery);


/*
 * Author:      Brett Chaney
 * Description: Language/Country select on landing page
 */

(function($) {
	
	$(function(){
		
	    var

		landingClass = $(".landing"),
		languageSel = $("#select-language"),
		countrySel = $("#select-country"),
		countrySelLabel = $(".country-selection label"),
        $language = $('#select-country-language-json'),
        		
		changeCountrySel = function() {

			function disableCountrySel() {
				countrySel.selectmenu("disable");
				countrySelLabel.css('opacity','0.3');
			}

			function enableCountrySel() {
				countrySel.selectmenu("enable");
				countrySelLabel.css('opacity','1');
			}

			disableCountrySel();

			languageSel.change(function() {
				var currVal = languageSel.val();
				if (currVal !== "") {
				    enableCountrySel();
                    //fetch country options according to json data
				    if ($language.length > 0) {
				        var languageList = JSON.parse($language.html());
				        var cityList = null;
				        $.each(languageList.languages, function (i, item) {
				            if (item.language === currVal) {
				                cityList = item.items;
				            }
				        });
				        if (cityList && cityList.length>0 && countrySel.length > 0 && countrySel.children('option').length > 0) {
				            var defaultOpt = countrySel.children('option')[0];
				            countrySel.empty();
				            countrySel.append(defaultOpt);
				            $.each(cityList, function (i, city) {
				                var val = '', txt = '';
				                for (var x in city) {
				                    if (x) {
				                        val = x;
				                        txt = city[x];
				                    }
				                }
				                countrySel.append("<option value='"+val+"'>"+txt+"</option>");
				            });
				            if ($.mobile) {
				                countrySel.selectmenu('refresh');
				            }
				        }
				    }

				} else {
					disableCountrySel();
				}
			});

		};

		// run country select function if "landing" class is found
		if (landingClass.length > 0) {
		    changeCountrySel();
		}
		
	});

})(jQuery);


var SB = SB || {};

(function($) {

	SB.init = false;
	SB.pagename = _da.pname;

	SB.dealers = {

		init: function() {
			// hide search section
			$(".service-booking .ui-header .black").parent().hide();
			$(".dealer-search").hide();

			SB.dealers.getCurrentLocation();

			if ($.cookie("sp.pc")) {
				SB.dealers.nearestDealer();
			} else {
				this.searchDealer();
			}
			this.menuURL = $("#xtimeURL").embeddedData();
			this.authorisedFilter = this.menuURL.authorisedFilter || "";
			// this.authorisedFilter = "?authorisedFilter=HasServiceDepartmentPV";
			this.isMobile = ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) );
			this.urlAtrrib = "&provider=FORDAUPORTAL&keywordParam=null";
		},

		fetchData: function(url, onSuccess, onError){
			
			if (SB.templateWrap) {
				SB.templateWrap.addClass("loading");
			}

			$.ajax({
	  			url: url,
	  			beforeSend: function() {
	  				$.mobile.loading("show");
	  			},
	  			async: true,
	  			dataType: "json", 
	  			success: function(data){
	  				$.mobile.loading("hide");
	  				onSuccess(data);
	  			},
				error: function(e, extStatus){
					$.mobile.loading("hide");
					onError(url, e, extStatus);
				}
	  		});

		},

		getParameterByName: function(name) {
		    var match = RegExp("[?&]" + name + "=([^&]*)").exec(window.location.search);
		    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
		},

		renderSearchListTemplate: function(success, data, e){

			if (success){
				$("#search-template").tmpl(data).appendTo("#search-items", SB.templateWrap);
				SB.templateWrap.removeClass("loading");

				SB.dlength = data.length;

				$(".request-service").buttonMarkup("refresh");

				// more results button
				var maxItems = 3;
				SB.dealers.resultDetails(data.length, maxItems);

				$.each(data, function(idx) {
					SB.serviceURL = data[idx].mobileURL;
					var dealerByCode = SB.restServices["dealer.code"].replace("{site}", SB.site).replace("{code}", data[idx].dealerCode) + SB.dealers.authorisedFilter;

					// loop through each dealer and display the "request service" button if a full Xtime participant
					if (data[idx].fullXtimeParticipant === "Y") {
						$(".search-results .request-service").eq(idx).attr("href", SB.serviceURL + SB.dealers.getParameterByName("keyword")).attr("data-dcode", data[idx].dealerCode);
						$(".search-results .no-service").eq(idx).hide();
					} else if (data[idx].fullXtimeParticipant === null){
						
						if(SB.dealers.isMobile){
							var mobURL = this.mobileURL;
							if(mobURL === "" || mobURL === null ){
								$(".search-results .request-service").eq(idx).hide();
							} else {
								$(".search-results .request-service").eq(idx).attr("href", mobURL + SB.dealers.urlAtrrib);
								$(".search-results .no-service").eq(idx).hide();
							}
						} else {
							var conURL = this.consumerURL;
							if(conURL === "" || conURL === null ){
								$(".search-results .request-service").eq(idx).hide();
							} else {
								$(".search-results .request-service").eq(idx).attr("href", SB.serviceURL + SB.dealers.getParameterByName("keyword")).attr("data-dcode", data[idx].dealerCode +  SB.dealers.urlAtrrib);
								$(".search-results .no-service").eq(idx).hide();
							}
						}

					} else {
						$(".search-results .request-service").eq(idx).hide();
					}

					$(".item").eq(idx).attr("id", data[idx].dealerCode);

					SB.dealers.fetchData(dealerByCode,
						function (data) {

							$("#" + data.dealerCode).find(".dealer-address").attr({
									"data-lng": data.latitudeLongitude.longitude,
									"data-lat": data.latitudeLongitude.latitude
								});

							SB.dcount = SB.dcount + 1;
							
							if (SB.dcount >= SB.dlength) {
								// do this once all the dealer ajax requests are complete
								$(document).trigger("pagechange", function() {
							    	nativeMapURLGenerator();
							    });
							} 
						},
						function (url, e, extStatus) {
							// no long/lat returned for each dealer
						});

				});

				$(".change-dealer.results").show();
				$(".listing-details .results").show();

				$(".btn.request-service").on("click", function(e) {
					e.preventDefault();
					var serviceURL 		= $(this).attr("href"),
						dataDealerCode 	= $(this).data("dcode");

					SB.dealers.requestServiceTracking(dataDealerCode, serviceURL);
				});
			} 
			else {
				$(".error").show();
				SB.templateWrap.removeClass("loading");
			}

		},

		requestServiceTracking: function(dcode, serviceURL) {
			var params = {type: "e"};
            params.link = params.title = SB.pagename + ":results:request service";
            params.onclicks = "service:book online";
            params.pname = SB.pagename + ":results";
            s.prop1 = s.eVar1 = dcode;

            ND.omniture.trackLink(params);

			setTimeout(function() {
				window.location.href = serviceURL;
			},100);
            
		},

		searchResultsTracking: function() {
			var params = {type: "o"};
			_da.pname = SB.pagename + ":results";
            params.link = params.title = SB.pagename + ":results";
            params.onclicks = SB.pagename;
            params.pname = SB.pagename + ":results";
            var events = 'event1';
            params.events = _da.events = events.split(',');
		},

		searchDealerTracking: function() {
            var params = {type: "o"};
            _da.pname = SB.pagename;
            params.link = params.title = SB.pagename;
            params.onclicks = SB.pagename;
            params.pname = SB.pagename;
            params.events = _da.events = "event1";
		},

		searchDealerBtnTracking: function() {
            var params = {type: "o"};
            _da.pname = SB.pagename;
            params.link = params.title = SB.pagename;
            params.onclicks = SB.pagename;
            params.pname = SB.pagename;

            ND.omniture.trackLink(params);
		},

		templateError: function(e) {

			var errorData = {"error" : "An error has occurred: " + e.statusText};
			$("#dealer-template-error").tmpl(errorData).appendTo(SB.templateWrap);

		},

		templateErrorSearch: function(e) {

			var errorData = {"error" : "An error has occurred: " + e.statusText};
			$("#search-template-error").tmpl(errorData).appendTo(SB.templateWrap);

		},

		nearestDealer: function() {

			var userLocation 	 = $.cookie("sp.pc"),
				searchContainer  = $(".dealer-search"),
				form 			 = $("form", searchContainer),
				dealerByLocation = SB.restServices["dealer.byAddressUrl"].replace("{site}", SB.site).replace("{location}", userLocation) + SB.dealers.authorisedFilter;

			$(".item").remove();

			$(".details-user-location").show().find("span").html(userLocation);

			SB.dealers.searchResultsTracking();		

			SB.dealers.fetchData(dealerByLocation,
				function (data) {
					$(".dealer-search").hide();
					$(".search-results").show();

					SB.dealers.renderSearchListTemplate(true, data);

					$(".change-dealer").on("click", function(e) {
						SB.dealers.changeDealerBtn(e);
					});
				},
				function (url, e, extStatus) {
					SB.dealers.renderSearchListTemplate(false, null, e);
				});

			form.submit(function(e){

				e.preventDefault();
				SB.dealers.formSubmit();
				
			});

		},

		geoDealers: function(postcode) {
			
			var searchContainer  = $(".dealer-search"),
				form 			 = $("form", searchContainer),
				dealerByLocation = SB.restServices["dealer.byAddressUrl"].replace("{site}", SB.site).replace("{location}", postcode) + SB.dealers.authorisedFilter;

			$(".item").remove();

			$(".details-user-location").show().find("span").html(postcode);

			SB.dealers.fetchData(dealerByLocation,
				function (data) {
					$(".dealer-search").hide();
					$(".search-results").show();
					$(".details-state").add(".details-city").hide();

					SB.dealers.renderSearchListTemplate(true, data);

					$(".change-dealer").on("click", function(e) {
						SB.dealers.changeDealerBtn(e);
					});
				},
				function (url, e, extStatus) {
					$(".location-error").show();
				});

		},

		searchDealer: function() {

			var searchContainer = $(".dealer-search");

			$(".search-results").hide();
			searchContainer.show();
			$(".service-booking .ui-header .black").parent().show();

			SB.dealers.searchDealerTracking();

			var form = $("form", searchContainer);
			
			form.submit(function(e){
				e.preventDefault();
				SB.dealers.formSubmit();
			});

		},

		getCurrentLocation: function() {
			$(".sb-currentLocation-btn").on("click", function(e) {
				
				e.preventDefault();
				locationTimeout = setTimeout(function() {
					geoLocator.locationNotFound(1);
				}, 15000);

				$.mobile.loading("show");
				
				var geoLocator = ND.geoLocator({
					success: function(postcode) {
						clearTimeout(locationTimeout);
						$("#sb-currentLocation").val(postcode);
						$.mobile.loading("hide");
						SB.dealers.geoDealers(postcode);
					},
					error: function(message) {
						clearTimeout(locationTimeout);
						$(".location-error").show();
						$.mobile.loading("hide");
					},
					maximumAge: 10000,
					timeout: 10000
				});
				geoLocator.findLocation();
			});
		},

		formSubmit: function() {
			$(".error").hide();
			
			var searchContainer = $(".dealer-search"),
				state 			= $("#select-state").val(),
				city 			= $("#select-city").val();

			if (state === "" && city === ""){
				$(".error", searchContainer).show();
				return;
			} else {
				$(".item").remove();
				SB.dealers.runSearch(state, city);
			}
		},

		runSearch: function(state, city) {

			// rest services for search
			var byRegionCityUrl = SB.restServices["dealer.byRegionCityUrl"].replace("{site}", SB.site).replace("{region}", state).replace("{city}", city) + SB.dealers.authorisedFilter;

			$(".details-user-location").hide();
			$(".details-state").show().find("span").html(state);
			$(".details-city").show().find("span").html(city);

			SB.dealers.searchResultsTracking();

			$(".item").remove();

			SB.dealers.fetchData(byRegionCityUrl, 
				function (data) {
					$(".dealer-search").hide();
					$(".search-results").show();

					SB.dealers.renderSearchListTemplate(true, data);

					$(".change-dealer").on("click", function(e) {
						SB.dealers.changeDealerBtn(e);
					});
				},
				function (url, e, extStatus) {
					SB.dealers.renderSearchListTemplate(false, null, e);
				});
		},

		changeDealerBtn: function(e) {
			e.preventDefault();
			
			$(".dealer-search").show().find("select").val("").selectmenu("refresh");
			$("select#select-city").html('<option value="">Select</option>');
			$(".search-results").hide();
			$(".location-error").add(".error").hide();
			$(".change-dealer.results").hide();
			$(".item").remove();
			SB.dealers.scrollToTop();

			SB.dealers.searchDealerBtnTracking();
		},

		scrollToTop: function() {
			$("html, body").animate({
				 scrollTop:$(".dealer-search").offset().top - 20
			},400);
		},

		resultDetails: function(itemCount, maxItems) {
			if (itemCount > maxItems) {
				$(".more-results").css("display","block");

				$("#search-items > div.item").hide().slice(0,maxItems).css("display", "block");
				$(".search-results").on("click", ".more-results", function(e) {
					e.preventDefault();
					SB.dealers.moreButton(maxItems);
					$("#search-items > div.item").css("border-bottom", "1px solid #ddd");
					$("#search-items > div.item:visible:last").css("border-bottom", 0);
					$("#search-items > div.item:last-child").css("border-bottom", "1px solid #ddd");
				});

				$("#search-items > div.item:visible:last").css("border-bottom", 0);

			} else {
				$(".more-results").css("display","none");
			}
			setTimeout(function(){
				var visibleDealerItems = $("#search-items > div.item:visible").length;
				$(".listing-details .details-results span.items-range").html("1-" + visibleDealerItems).next().html(" of " + itemCount);
			},200);
		},

		moreButton: function(maxItems) {
			$("#search-items > div.item:hidden").slice(0,maxItems).fadeIn(350);

			var visibleItems = $("#search-items > div.item:visible").length;
			$(".listing-details .details-results span.items-range").html("1-" + visibleItems);

		    if (!($("#search-items > div.item:hidden").length >= 1)) {
		    	// remove "load more results..." button
		        $(".search-results .more-results").remove();
		    }
		}

	};

    //$(document).on("pageinit", function() {...});    //not work if user visit this page directly

	$(function () {
	    
		var commonConfig = $("#common-config").embeddedData();

		SB.site 		= commonConfig.site;
		SB.restServices = $("#rest-services").embeddedData();
		SB.templateWrap = $(".ui-content");		

	    if ($(".service-booking").length > 0 && SB.init === false) {
	    	SB.init = true;
	        SB.dcount = 0; 
	        SB.dealers.init();
	    }

	    $(".service-booking-btn").on("click", function() {

			var thisHref 	= $(this).attr("href"),
				separator 	= (thisHref.indexOf("?") == -1) ? "?" : "&";
				SB.keyword 	= $(this).data("sb-keyword");

			// if keyword does not exist as a parameter then attach it to the URL
			if (thisHref.indexOf("keyword") == -1) {
				$(this).attr("href", thisHref + separator + "keyword=" + SB.keyword);
			}			
			
		});

	});

	$(document).on("pageinit", function () {
		
		var commonConfig = $("#common-config").embeddedData();

		SB.site 		= commonConfig.site;
		SB.restServices = $("#rest-services").embeddedData();
		SB.templateWrap = $(".ui-content");		

	    if ($(".service-booking").length > 0) {
	    	SB.init = true;
	        SB.dcount = 0; 
	        SB.dealers.init();
	    }

	});

})(jQuery);

