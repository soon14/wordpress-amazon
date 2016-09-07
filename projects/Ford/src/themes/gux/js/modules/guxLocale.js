/*
Author:         Brett Chaney
File name:      gux-locale.js
Description:    GUX localisation select overlay and code for FTD template backwards compatibility
Dependencies:   jQuery, bootstrap.modal.js, jquery.uniform, overlay.js, jquery.tinypubsub.js
*/
var guxApp = guxApp || {};

(function($) {

guxApp.locale = {

	init: function() {
		if (!$('#locale-data').length){return;}
		var self = this,
			json = $('#locale-data').embeddedData(),
			commonConfig = $("#common-config").embeddedData();
			
		guxApp.locale.url = json['locale-overlay'];
		guxApp.locale.domain = json.domain;
		guxApp.locale.fromLink = false;
		guxApp.locale.isGUX = $("#gux-footer").length;
		guxApp.locale.cookieDomain = commonConfig.cookieDomain;
		guxApp.locale.locale = commonConfig.locale;

		// set ND.rtl to true if RTL page
		// a condition that needs to be set for overlay.js when opening an overlay on FTD template RTL pages
		ND.rtl = $('body').hasClass('rtl');

		// attach the on click event that launches the locale overlay
		self.launchOverlayEvent();

		self.checkLocale();

		// check locale cookie on page load
		// this is to decide if the locale overlay needs to be launched if no region is confirmed
		if (!guxApp.locale.isGUX) {
			self.checkCookie();
			self.initMenu();
		}
	},

	checkLocale: function(){
		var self = this;
		var url = window.location.href;
		var locale = [];

		if ($.cookie(self.COOKIEKEY)){
			locale = $.cookie(self.COOKIEKEY).split('-');

			if (url.indexOf(locale[1]) < 0){
				self.clearFPSinfo();
				
				self.setGTUID();
			}
			
			if (url.indexOf(locale[2]) === "1"){
				// true: locale confirmed
				self.updateCookie(url,true);
			}
			else {
				self.updateCookie(url,false);
			}
			
		}
		else {
			// false: locale not confirmed
			self.updateCookie(url,false);
		}

	},

	launchOverlayEvent: function() {

		var self = this;

		$('.locale-select').on('click', function(e) {
			e.preventDefault();
			$('body').addClass('modal-open');
			guxApp.locale.fromLink = true;
			self.commonLocaleOverlay();
			self.removeBodyClass();
			self.launchOverlay();
		});

	},

	removeBodyClass:function(){
		$('.close-reveal-modal', '.reveal-modal').on('click',function(e){
			e.preventDefault();
			$('body').removeClass('modal-open');
		})
	},

	launchOverlay: function() {

		var self = this;

		// // launch Bootstrap modal
		// $('#modalWrap').addClass('locale-modal').modal({
		// 	"backdrop" : false,
		// 	"keyboard" : false
		// });

		// inject HTML from cache if previously loaded
		if (self.cache) {
			$('.locale-modal .modal-body').html(self.cache);
			self.commonLocaleOverlay();
		} else {

			$.get(self.url, function( data ) {

				// inject content into modal
				$('.locale-modal .modal-body').html(data);

			  	self.cache = data;
				self.closeOverlayEvent();

				self.commonLocaleOverlay();

			});

		}

	},

	commonLocaleOverlay: function() {

		// the following are functions/methods that are run
		// each time the GUX locale overlay is launched
		
		var self = this;

		// enable uniform js ui styles
		// subscribe on the on-success publish in revealmodal.js
		$.subscribe('foundation-reveal-modal-open', function(){
			if($('.reveal-modal .uniform')){
        		$('.uniform select', '.reveal-modal').uniform({selectClass: 'dropdown', selectAutoWidth: false});
			}
			self.reinitInnerPopup();
		});

		// self.reinitInnerPopup();

		// $('.locale-wrap').on('click', '.close-popup', function() {
		// 	// re-init inner popup
		// 	self.reinitInnerPopup();
		// });

		// self.realignInnerPopup();
		
		if (guxApp.locale.fromLink) {
			// this is run when the user clicks the overlay from the link in the footer
			self.checkCookie();
		}

		self.bindOverlay();

	},

	localeArr: [],

	COUNTRY: 1,
	
	CONFIRMED: 2,

	COOKIEKEY: "dfy.fme.locale",

	checkCookie: function() {
		var self = this,
			cookieVal = $.cookie(self.COOKIEKEY);
		
		if (cookieVal) {
			self.localeArr = cookieVal.split('-');
		}
		//if the locale is confirmed, will not popup overlay.
		if(self.localeArr[self.CONFIRMED] == '1'){
			return;
		}

		if (guxApp.locale.url && !guxApp.locale.fromLink) {
			// this is run when the cookie on page load is not confirmed
			if (guxApp.locale.isGUX) {
				self.launchOverlay();
			} else {
				window.setTimeout(function(){
					$.publish('overlay.launch', {
						url: guxApp.locale.url,
						success: function() {
							self.bindOverlay();
						}
					});
				}, 1000);
			}

		}

	},

	bindOverlay: function() {

		// bind event to overlay, force redirection and
		// change cookie when user submits the form
		var self = this;

		if ($('#overlay .controls').length){
			$('#overlay .controls').hide();
		}

		$('.country-overlay select').on('change', function() {
			$(this).parents('form').attr({'action': $(this).val()});
		}).trigger('change');	// trigger change event when overlay first launches

		$('.country-overlay form').submit(function(e){

			var $this = $(this),
				value = $('select', $this).val();

			if ($this.attr('action')) {
				$this.attr({'action': value});
			}

			if (value.indexOf(guxApp.locale.locale) < 0){
				self.clearFPSinfo();
			}

			// if current submit data match the current current URL
			// cancel the submit redirection and hide the overlay
			if (!self.updateCookie(value,true)) {
				e.preventDefault();

				if (guxApp.locale.isGUX) {
					self.closeOverlay();
				} else {
					$.publish("overlay.hide");
				}
				
				return false;
			}

		});
		
		var country = self.localeArr[self.COUNTRY];
		if (country) {
			$('.country-overlay select option').each(function() {
				var $options = $(this),
					val = $options.attr('value');

				if (val && val.indexOf(country) > 0) {
					$options.attr({'selected' : 'selected'});
				}
			});
		}

		// re-init uniform selects
		if (guxApp.locale.isGUX) {
			$('.locale-modal select').uniform();
		}

	},

	initMenu: function() {

		var $current = $('.countrytab .current'),
			$anchors = $('.country li a'),
			self = this;

		// update Menu text
		if(self.localeArr[self.CONFIRMED] == '1'){
			// convert ["bh", "ar", "1"] => "bh/ar"
			var key = self.localeArr.slice(0,2).join('/');

			$anchors.each(function(){
				var $this = $(this), 
					href = $this.attr('href');

				if(href.indexOf(key) >-1 ){
					$current.text($this.text());
				}
			});
		}

		// bind event to top menu update cookie when click on the anchors
		$anchors.click(function(e){
			var value = $(this).attr('href');
			
			if (value.indexOf(guxApp.locale.locale) < 0){
				self.clearFPSinfo();
			}

			if(!self.updateCookie(value,true)){
				e.preventDefault();
			}
		});

	},

	updateCookie: function(value,confirmed) {

		// update locale cookie: convert url "/en/irq/homeXXX#**" => en-irq-1
		// return 0 means selected locale match the current url
		var self = this;

		if (value) {

			// remove the host name, get the relative path, etc "/en/irq/xxx"
			var host = location.host, i = value.indexOf(host);
			value = i > 0 ? value.substr(i + host.length) : value;
			// remove the first '/' if nessary.
			value = value.charAt(0) == '/' ? value.substr(1) : value;

			// get the locale array, like [ "en", "irq", "0" ]
			var localeArr = value.split('/').slice(0,2);

			if (confirmed){
				localeArr[self.CONFIRMED] = '1';
			}
			else {
				localeArr[self.CONFIRMED] = '0';
			}
			

			$.cookie(self.COOKIEKEY, localeArr.join('-'), {
				expires: 365,
				path: '/'
			});

			

			// whether current URL contains something like "/en/irq/"?
			if (location.href.indexOf('/' + localeArr.slice(0,2).join('/')) > 0) {
				return 0;
			}

		}

		return 1;

	},

	reinitInnerPopup: function() {
		// re-init inner popup
		guxApp.innerPopup.init({
			container : ".reveal-modal"
		});
	},

	realignInnerPopup: function() {

		// align popups correctly for GUX locale overlay
		$('.reveal-modal a.citation').on('click', function() {
			$('.reveal-modal > .inner-popup').removeClass('right-popup');
		});

		$('.reveal-modal .right a.citation').on('click', function() {
			$('.reveal-modal > .inner-popup').addClass('right-popup');
		});

	},

	closeOverlayEvent: function() {

		var self = this;

		// close overlay when clicking on close 'X'
		$('#modalWrap.locale-modal').off('click').on('click', '.icon-close', function(e) {
			e.preventDefault();
			self.closeOverlay();
		});

		$(document).keydown(function(e) {

			// close overlay when ESC key is pressed
			if (e.keyCode == 27) {
				self.closeOverlay();
			}
		});

	},

	closeOverlay: function () {

		// hide modal and then remove content
		$('#modalWrap').modal('hide').removeClass('polk-modal').find('.modal-body').html('');

		guxApp.innerPopup.init();
	},

	clearFPSinfo: function(){
	
		if($.cookie('dfy.uuid')){
			$.removeCookie('dfy.uuid', {path:'/', domain:guxApp.locale.cookieDomain});
		}

		if($.cookie('gt_uid')){
			var dmArray = [];
			dmArray = guxApp.locale.cookieDomain.split('.');

			var dmStr = "." + dmArray[dmArray.length - 2] + "." + dmArray[dmArray.length - 1];
			$.removeCookie('gt_uid', {path:'/', domain:dmStr});
		}

		if($.cookie('dfy.p')){
			$.removeCookie('dfy.p', {path:'/', domain:guxApp.locale.cookieDomain});
		}

		if(sessionStorage.getItem("dfy.p") !== null){
			sessionStorage.removeItem("dfy.p");
		}

		// $.publish('FPS-reset');
	},
	setGTUID: function(){
		//gt_uid is the cookie used by FPS to check user status
		var setCookie = function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
	        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
	        var sExpires = "";
	        if (vEnd) {
	            switch (vEnd.constructor) {
	                case Number:
	                    sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
	                    break;
	                case String:
	                    sExpires = "; expires=" + vEnd;
	                    break;
	                case Date:
	                    sExpires = "; expires=" + vEnd.toUTCString();
	                    break;
	            }
	        }
	        document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
	        return true;
	    };
	    var readCookie = function (name) {
	        var nameEQ = name + "=";
	        var ca = document.cookie.split(';');
	        for (var i = 0; i < ca.length; i++) {
	            var c = ca[i];
	            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
	            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	        }
	        return null;
	    }
		var UUIDV4 = function b(a) { return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b) };
	    var uid = readCookie('gt_uid') || UUIDV4();

	    var now = new Date();
	    var domain = (function () {
	        var i = 0, domain = document.domain, p = domain.split('.'), s = '_gd' + now.getTime();
	        while (i < (p.length - 1) && document.cookie.indexOf(s + '=' + s) == -1) {
	            domain = p.slice(-1 - (++i)).join('.');
	            document.cookie = s + "=" + s + ";domain=" + domain + ";";
	        }
	        document.cookie = s + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=" + domain + ";";
	        return domain;
	    })();
	    setCookie('gt_uid', uid, new Date(now.getTime() + (365 * 86400000)), '/', domain);
	}

};

$(function() {
	// if ($('#locale-data').length) {
	// 	window.setTimeout(function(){
	// 		guxApp.locale.init();
	// 	}, 1000);
	// }
	guxApp.locale.init();
});

})(jQuery);
