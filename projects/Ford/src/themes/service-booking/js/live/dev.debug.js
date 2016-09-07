
/*
 * Foundation Responsive Library
 * http://foundation.zurb.com
 * Copyright 2013, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/

/*jslint unparam: true, browser: true, indent: 2 */

// Accommodate running jQuery or Zepto in noConflict() mode by
// using an anonymous function to redefine the $ shorthand name.
// See http://docs.jquery.com/Using_jQuery_with_Other_Libraries
// and http://zeptojs.com/
var libFuncName = null;

if (typeof jQuery === "undefined" &&
    typeof Zepto === "undefined" &&
    typeof $ === "function") {
  libFuncName = $;
} else if (typeof jQuery === "function") {
  libFuncName = jQuery;
} else if (typeof Zepto === "function") {
  libFuncName = Zepto;
} else {
  throw new TypeError();
}

(function ($, window, document, undefined) {
  'use strict';

  /*
    matchMedia() polyfill - Test a CSS media 
    type/query in JS. Authors & copyright (c) 2012: 
    Scott Jehl, Paul Irish, Nicholas Zakas. 
    Dual MIT/BSD license

    https://github.com/paulirish/matchMedia.js
  */

  window.matchMedia = window.matchMedia || (function( doc, undefined ) {

    "use strict";

    var bool,
        docElem = doc.documentElement,
        refNode = docElem.firstElementChild || docElem.firstChild,
        // fakeBody required for <FF4 when executed in <head>
        fakeBody = doc.createElement( "body" ),
        div = doc.createElement( "div" );

    div.id = "mq-test-1";
    div.style.cssText = "position:absolute;top:-100em";
    fakeBody.style.background = "none";
    fakeBody.appendChild(div);

    return function(q){

      div.innerHTML = "&shy;<style media=\"" + q + "\"> #mq-test-1 { width: 42px; }</style>";

      docElem.insertBefore( fakeBody, refNode );
      bool = div.offsetWidth === 42;
      docElem.removeChild( fakeBody );

      return {
        matches: bool,
        media: q
      };

    };

  }( document ));

  // add dusty browser stuff
  if (!Array.prototype.filter) {
    Array.prototype.filter = function(fun /*, thisp */) {
      "use strict";
   
      if (this == null) {
        throw new TypeError();
      }

      var t = Object(this),
          len = t.length >>> 0;
      if (typeof fun !== "function") {
          return;
      }

      var res = [],
          thisp = arguments[1];
      for (var i = 0; i < len; i++) {
        if (i in t) {
          var val = t[i]; // in case fun mutates this
          if (fun && fun.call(thisp, val, i, t)) {
            res.push(val);
          }
        }
      }

      return res;
    }
  }

  if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
      if (typeof this !== "function") {
        // closest thing possible to the ECMAScript 5 internal IsCallable function
        throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
      }
   
      var aArgs = Array.prototype.slice.call(arguments, 1), 
          fToBind = this, 
          fNOP = function () {},
          fBound = function () {
            return fToBind.apply(this instanceof fNOP && oThis
               ? this
               : oThis,
             aArgs.concat(Array.prototype.slice.call(arguments)));
          };
   
      fNOP.prototype = this.prototype;
      fBound.prototype = new fNOP();
   
      return fBound;
    };
  }

  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
      "use strict";
      if (this == null) {
        throw new TypeError();
      }
      var t = Object(this);
      var len = t.length >>> 0;
      if (len === 0) {
        return -1;
      }
      var n = 0;
      if (arguments.length > 1) {
        n = Number(arguments[1]);
        if (n != n) { // shortcut for verifying if it's NaN
          n = 0;
        } else if (n != 0 && n != Infinity && n != -Infinity) {
          n = (n > 0 || -1) * Math.floor(Math.abs(n));
        }
      }
      if (n >= len) {
          return -1;
      }
      var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
      for (; k < len; k++) {
        if (k in t && t[k] === searchElement) {
          return k;
        }
      }
      return -1;
    }
  }

  // fake stop() for zepto.
  $.fn.stop = $.fn.stop || function() {
    return this;
  };

  window.Foundation = {
    name : 'Foundation',

    version : '4.3.1',

    cache : {},

    init : function (scope, libraries, method, options, response, /* internal */ nc) {
      var library_arr,
          args = [scope, method, options, response],
          responses = [],
          nc = nc || false;

      // disable library error catching,
      // used for development only
      if (nc) this.nc = nc;

      // check RTL
      this.rtl = /rtl/i.test($('html').attr('dir'));

      // set foundation global scope
      this.scope = scope || this.scope;

      if (libraries && typeof libraries === 'string' && !/reflow/i.test(libraries)) {
        if (/off/i.test(libraries)) return this.off();

        library_arr = libraries.split(' ');

        if (library_arr.length > 0) {
          for (var i = library_arr.length - 1; i >= 0; i--) {
            responses.push(this.init_lib(library_arr[i], args));
          }
        }
      } else {
        if (/reflow/i.test(libraries)) args[1] = 'reflow';

        for (var lib in this.libs) {
          responses.push(this.init_lib(lib, args));
        }
      }

      // if first argument is callback, add to args
      if (typeof libraries === 'function') {
        args.unshift(libraries);
      }

      return this.response_obj(responses, args);
    },

    response_obj : function (response_arr, args) {
      for (var i = 0, len = args.length; i < len; i++) {
        if (typeof args[i] === 'function') {
          return args[i]({
            errors: response_arr.filter(function (s) {
              if (typeof s === 'string') return s;
            })
          });
        }
      }

      return response_arr;
    },

    init_lib : function (lib, args) {
      return this.trap(function () {
        if (this.libs.hasOwnProperty(lib)) {
          this.patch(this.libs[lib]);
          return this.libs[lib].init.apply(this.libs[lib], args);
        } else {
          return function () {};
        }
      }.bind(this), lib);
    },

    trap : function (fun, lib) {
      if (!this.nc) {
        try {
          return fun();
        } catch (e) {
          return this.error({name: lib, message: 'could not be initialized', more: e.name + ' ' + e.message});
        }
      }

      return fun();
    },

    patch : function (lib) {
      this.fix_outer(lib);
      lib.scope = this.scope;
      lib.rtl = this.rtl;
    },

    inherit : function (scope, methods) {
      var methods_arr = methods.split(' ');

      for (var i = methods_arr.length - 1; i >= 0; i--) {
        if (this.lib_methods.hasOwnProperty(methods_arr[i])) {
          this.libs[scope.name][methods_arr[i]] = this.lib_methods[methods_arr[i]];
        }
      }
    },

    random_str : function (length) {
      var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

      if (!length) {
        length = Math.floor(Math.random() * chars.length);
      }

      var str = '';
      for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
      }
      return str;
    },

    libs : {},

    // methods that can be inherited in libraries
    lib_methods : {
      set_data : function (node, data) {
        // this.name references the name of the library calling this method
        var id = [this.name,+new Date(),Foundation.random_str(5)].join('-');

        Foundation.cache[id] = data;
        node.attr('data-' + this.name + '-id', id);
        return data;
      },

      get_data : function (node) {
        return Foundation.cache[node.attr('data-' + this.name + '-id')];
      },

      remove_data : function (node) {
        if (node) {
          delete Foundation.cache[node.attr('data-' + this.name + '-id')];
          node.attr('data-' + this.name + '-id', '');
        } else {
          $('[data-' + this.name + '-id]').each(function () {
            delete Foundation.cache[$(this).attr('data-' + this.name + '-id')];
            $(this).attr('data-' + this.name + '-id', '');
          });
        }
      },

      throttle : function(fun, delay) {
        var timer = null;
        return function () {
          var context = this, args = arguments;
          clearTimeout(timer);
          timer = setTimeout(function () {
            fun.apply(context, args);
          }, delay);
        };
      },

      // parses data-options attribute on nodes and turns
      // them into an object
      data_options : function (el) {
        var opts = {}, ii, p,
            opts_arr = (el.attr('data-options') || ':').split(';'),
            opts_len = opts_arr.length;

        function isNumber (o) {
          return ! isNaN (o-0) && o !== null && o !== "" && o !== false && o !== true;
        }

        function trim(str) {
          if (typeof str === 'string') return $.trim(str);
          return str;
        }

        // parse options
        for (ii = opts_len - 1; ii >= 0; ii--) {
          p = opts_arr[ii].split(':');

          if (/true/i.test(p[1])) p[1] = true;
          if (/false/i.test(p[1])) p[1] = false;
          if (isNumber(p[1])) p[1] = parseInt(p[1], 10);

          if (p.length === 2 && p[0].length > 0) {
            opts[trim(p[0])] = trim(p[1]);
          }
        }

        return opts;
      },

      delay : function (fun, delay) {
        return setTimeout(fun, delay);
      },

      // animated scrolling
      scrollTo : function (el, to, duration) {
        if (duration < 0) return;
        var difference = to - $(window).scrollTop();
        var perTick = difference / duration * 10;

        this.scrollToTimerCache = setTimeout(function() {
          if (!isNaN(parseInt(perTick, 10))) {
            window.scrollTo(0, $(window).scrollTop() + perTick);
            this.scrollTo(el, to, duration - 10);
          }
        }.bind(this), 10);
      },

      // not supported in core Zepto
      scrollLeft : function (el) {
        if (!el.length) return;
        return ('scrollLeft' in el[0]) ? el[0].scrollLeft : el[0].pageXOffset;
      },

      // test for empty object or array
      empty : function (obj) {
        if (obj.length && obj.length > 0)    return false;
        if (obj.length && obj.length === 0)  return true;

        for (var key in obj) {
          if (hasOwnProperty.call(obj, key))    return false;
        }

        return true;
      }
    },

    fix_outer : function (lib) {
      lib.outerHeight = function (el, bool) {
        if (typeof Zepto === 'function') {
          return el.height();
        }

        if (typeof bool !== 'undefined') {
          return el.outerHeight(bool);
        }

        return el.outerHeight();
      };

      lib.outerWidth = function (el, bool) {
        if (typeof Zepto === 'function') {
          return el.width();
        }

        if (typeof bool !== 'undefined') {
          return el.outerWidth(bool);
        }

        return el.outerWidth();
      };
    },

    error : function (error) {
      return error.name + ' ' + error.message + '; ' + error.more;
    },

    // remove all foundation events.
    off: function () {
      $(this.scope).off('.fndtn');
      $(window).off('.fndtn');
      return true;
    },

    zj : $
  };

  $.fn.foundation = function () {
    var args = Array.prototype.slice.call(arguments, 0);

    return this.each(function () {
      Foundation.init.apply(Foundation, [this].concat(args));
      return this;
    });
  };

}(libFuncName, this, this.document));


/*jslint unparam: true, browser: true, indent: 2 */

;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.reveal = {
    name : 'reveal',

    version : '4.2.2',

    locked : false,

    settings : {
      animation: 'fadeAndPop',
      animationSpeed: 250,
      closeOnBackgroundClick: true,
      closeOnEsc: true,
      dismissModalClass: 'close-reveal-modal',
      bgClass: 'reveal-modal-bg',
      open: function(){},
      opened: function(){},
      close: function(){},
      closed: function(){},
      bg : $('.reveal-modal-bg'),
      css : {
        open : {
          'opacity': 0,
          'visibility': 'visible',
          'display' : 'block'
        },
        close : {
          'opacity': 1,
          'visibility': 'hidden',
          'display': 'none'
        }
      }
    },

    init : function (scope, method, options) {
      Foundation.inherit(this, 'data_options delay');

      if (typeof method === 'object') {
        $.extend(true, this.settings, method);
      } else if (typeof options !== 'undefined') {
        $.extend(true, this.settings, options);
      }

      if (typeof method !== 'string') {
        this.events();

        return this.settings.init;
      } else {
        return this[method].call(this, options);
      }
    },

    events : function () {
      var self = this;

      $(this.scope)
        .off('.fndtn.reveal')
        .on('click.fndtn.reveal', '[data-reveal-id]', function (e) {
          e.preventDefault();

          if (!self.locked) {
            var element = $(this),
                ajax = element.data('reveal-ajax');

            self.locked = true;

            if (typeof ajax === 'undefined') {
              self.open.call(self, element);
            } else {
              var url = ajax === true ? element.attr('href') : ajax;

              self.open.call(self, element, {url: url});
            }
          }
        })
        .on('click.fndtn.reveal', this.close_targets(), function (e) {
          e.preventDefault();
          if (!self.locked) {
            var settings = $.extend({}, self.settings, self.data_options($('.reveal-modal.open')));
            if ($(e.target)[0] === $('.' + settings.bgClass)[0] && !settings.closeOnBackgroundClick) {
              return;
            }

            self.locked = true;
            self.close.call(self, $(this).closest('.reveal-modal'));
          }
        })
        .on('open.fndtn.reveal', '.reveal-modal', this.settings.open)
        .on('opened.fndtn.reveal', '.reveal-modal', this.settings.opened)
        .on('opened.fndtn.reveal', '.reveal-modal', this.open_video)
        .on('close.fndtn.reveal', '.reveal-modal', this.settings.close)
        .on('closed.fndtn.reveal', '.reveal-modal', this.settings.closed)
        .on('closed.fndtn.reveal', '.reveal-modal', this.close_video);

      $( 'body' ).bind( 'keyup.reveal', function ( event ) {
        var open_modal = $('.reveal-modal.open'),
            settings = $.extend({}, self.settings, self.data_options(open_modal));
        if ( event.which === 27  && settings.closeOnEsc) { // 27 is the keycode for the Escape key
          open_modal.foundation('reveal', 'close');
        }
      });

      return true;
    },

    open : function (target, ajax_settings) {
      if (target) {
        if (typeof target.selector !== 'undefined') {
          var modal = $('#' + target.data('reveal-id'));
        } else {
          var modal = $(this.scope);

          ajax_settings = target;
        }
      } else {
        var modal = $(this.scope);
      }

      if (!modal.hasClass('open')) {
        var open_modal = $('.reveal-modal.open');

        if (typeof modal.data('css-top') === 'undefined') {
          modal.data('css-top', parseInt(modal.css('top'), 10))
            .data('offset', this.cache_offset(modal));
        }

        modal.trigger('open');

        if (open_modal.length < 1) {
          this.toggle_bg(modal);
        }

        if (typeof ajax_settings === 'undefined' || !ajax_settings.url) {
          this.hide(open_modal, this.settings.css.close);
          this.show(modal, this.settings.css.open);
        } else {
          var self = this,
              old_success = typeof ajax_settings.success !== 'undefined' ? ajax_settings.success : null;

          $.extend(ajax_settings, {
            success: function (data, textStatus, jqXHR) {
              if ( $.isFunction(old_success) ) {
                old_success(data, textStatus, jqXHR);
              }

              modal.html(data);
              $(modal).foundation('section', 'reflow');

              self.hide(open_modal, self.settings.css.close);
              self.show(modal, self.settings.css.open);
            }
          });

          $.ajax(ajax_settings);
        }
      }
    },

    close : function (modal) {

      var modal = modal && modal.length ? modal : $(this.scope),
          open_modals = $('.reveal-modal.open');

      if (open_modals.length > 0) {
        this.locked = true;
        modal.trigger('close');
        this.toggle_bg(modal);
        this.hide(open_modals, this.settings.css.close);
      }
    },

    close_targets : function () {
      var base = '.' + this.settings.dismissModalClass;

      if (this.settings.closeOnBackgroundClick) {
        return base + ', .' + this.settings.bgClass;
      }

      return base;
    },

    toggle_bg : function (modal) {
      if ($('.reveal-modal-bg').length === 0) {
        this.settings.bg = $('<div />', {'class': this.settings.bgClass})
          .appendTo('body');
      }

      if (this.settings.bg.filter(':visible').length > 0) {
        this.hide(this.settings.bg);
      } else {
        this.show(this.settings.bg);
      }
    },

    show : function (el, css) {
      // is modal
      if (css) {
        if (/pop/i.test(this.settings.animation)) {
          css.top = $(window).scrollTop() - el.data('offset') + 'px';
          var end_css = {
            top: $(window).scrollTop() + el.data('css-top') + 'px',
            opacity: 1
          };

          return this.delay(function () {
            return el
              .css(css)
              .animate(end_css, this.settings.animationSpeed, 'linear', function () {
                this.locked = false;
                el.trigger('opened');
              }.bind(this))
              .addClass('open');
          }.bind(this), this.settings.animationSpeed / 2);
        }

        if (/fade/i.test(this.settings.animation)) {
          var end_css = {opacity: 1};

          return this.delay(function () {
            return el
              .css(css)
              .animate(end_css, this.settings.animationSpeed, 'linear', function () {
                this.locked = false;
                el.trigger('opened');
              }.bind(this))
              .addClass('open');
          }.bind(this), this.settings.animationSpeed / 2);
        }

        return el.css(css).show().css({opacity: 1}).addClass('open').trigger('opened');
      }

      // should we animate the background?
      if (/fade/i.test(this.settings.animation)) {
        return el.fadeIn(this.settings.animationSpeed / 2);
      }

      return el.show();
    },

    hide : function (el, css) {
      // is modal
      if (css) {
        if (/pop/i.test(this.settings.animation)) {
          var end_css = {
            top: - $(window).scrollTop() - el.data('offset') + 'px',
            opacity: 0
          };

          return this.delay(function () {
            return el
              .animate(end_css, this.settings.animationSpeed, 'linear', function () {
                this.locked = false;
                el.css(css).trigger('closed');
              }.bind(this))
              .removeClass('open');
          }.bind(this), this.settings.animationSpeed / 2);
        }

        if (/fade/i.test(this.settings.animation)) {
          var end_css = {opacity: 0};

          return this.delay(function () {
            return el
              .animate(end_css, this.settings.animationSpeed, 'linear', function () {
                this.locked = false;
                el.css(css).trigger('closed');
              }.bind(this))
              .removeClass('open');
          }.bind(this), this.settings.animationSpeed / 2);
        }

        return el.hide().css(css).removeClass('open').trigger('closed');
      }

      // should we animate the background?
      if (/fade/i.test(this.settings.animation)) {
        return el.fadeOut(this.settings.animationSpeed / 2);
      }

      return el.hide();
    },

    close_video : function (e) {
      var video = $(this).find('.flex-video'),
          iframe = video.find('iframe');

      if (iframe.length > 0) {
        iframe.attr('data-src', iframe[0].src);
        iframe.attr('src', 'about:blank');
        video.hide();
      }
    },

    open_video : function (e) {
      var video = $(this).find('.flex-video'),
          iframe = video.find('iframe');

      if (iframe.length > 0) {
        var data_src = iframe.attr('data-src');
        if (typeof data_src === 'string') {
          iframe[0].src = iframe.attr('data-src');
        } else {
          var src = iframe[0].src;
          iframe[0].src = undefined;
          iframe[0].src = src;
        }
        video.show();
      }
    },

    cache_offset : function (modal) {
      var offset = modal.show().height() + parseInt(modal.css('top'), 10);

      modal.hide();

      return offset;
    },

    off : function () {
      $(this.scope).off('.fndtn.reveal');
    },

    reflow : function () {}
  };
}(Foundation.zj, this, this.document));


var SB = SB || {};

(function($) {

	SB.overlay = {

		init: function() {

			// Reveal overlay/modal click events
			$(".service-booking-overlay").not("#content-modal").on("click", function(e) {
				e.preventDefault();
				SB.overlay.scrollToTop();
				
				var modalContent = $(this).attr("href");

				// Attach the keyword and Xtime URL to the SB object associated with this link
				SB.keyword 		= $(this).data("sb-keyword");
				SB.serviceURL 	= $(this).data("sb-url");

				$.ajax({
					url: modalContent,
					success: function(data) {
						SB.overlay.modalSuccess(data);
					},
					error: function() {
						SB.overlay.modalError();
					}
				});
			});

			SB.overlay.modalClose();

		},

		modalSuccess: function(data) {

			$("#content-modal .content").html(data);
			SB.templateWrap = $(".content-col");
			SB.dealers.init();
			$("#content-modal").foundation("reveal", "open", {
				animationSpeed: 100,
				animation: "fade"
			});

		},

		modalError: function() {

			$("#content-modal .content").html('<div class="row"><div class="columns"><div class="content-col"><h3>An Error Occurred</h3><p>There seems to be a problem.</p></div></div></div>');
			$("#content-modal").foundation("reveal", "open", {
				animationSpeed: 100,
				animation: "fade"
			});

		},

		modalClose: function() {

			$("#content-modal .close-reveal-modal").on("click", function(e) {
				e.preventDefault();
				$(".reveal-modal").foundation("reveal", "close");

				setTimeout(function() {
					$("#content-modal .content").html("");
				}, 500);

				// ensure focus onto document body after overlay is closed - IE has focus issues
				$("body").focus();
			});

		},

		scrollToTop: function() {
			$("html, body").animate({
				 scrollTop:0
			},400);
		}

	};

	$(function() {
		SB.overlay.init();
	});

})(jQuery);


var SB = SB || {};

(function($) {

	SB.dealers = {

		init: function() {
			if (!$(".service-booking-overlay").length) {return;}
			this.checkPreferredDealer();
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
	  			async: true,
	  			dataType: "json", 
	  			success: function(data){
	  				if (data.length > 0 || typeof data.dealerCode !== "undefined") {
	  					onSuccess(data);
	  				} else {
	  					$(".search-error").show();
						SB.templateWrap.removeClass("loading");
	  				}
	  			},
				error: function(e, extStatus){
					onError(url, e, extStatus);
				}
	  		});	

		},

		renderDealerTemplate: function(success, data, e){

			if (success){
				$("#preferred-dealer-template").tmpl(data).appendTo(".preferred-dealer", SB.templateWrap);
				SB.templateWrap.removeClass("loading");
			} 
			else {
				$(".dealer-search").show();
				$(".search-error").show();
				SB.templateWrap.removeClass("loading");

				var searchContainer = $(".dealer-search"),
					form 			= $("form", searchContainer);

				form.submit(function(e){
					e.preventDefault();
					SB.dealers.formSubmit();
				});
			}

		},

		renderSearchListTemplate: function(success, data, e){

			if (success){
				$("#search-template").tmpl(data).appendTo("#search-items", SB.templateWrap);
				SB.templateWrap.removeClass("loading");

				if (data.length === 1) {
					$(".pagination").hide();
				} else {
					$(".pagination").show();
				}

				$.each(data, function(idx) {
					// loop through each dealer and display the "request service" button if a full Xtime participant
					if (data[idx].fullXtimeParticipant === "Y") {
						var separator = (SB.serviceURL.indexOf("?") == -1) ? "?" : "&";
						$(".search-results .request-service").eq(idx).attr("href", SB.serviceURL + separator + "dcode=" + data[idx].dealerCode + "&keyword=" + SB.keyword).attr("data-dcode", data[idx].dealerCode);
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

						}else{
							var conURL = this.consumerURL;
							if(conURL === "" || conURL === null ){
								$(".search-results .request-service").eq(idx).hide();
							} else {
								var separator = (SB.serviceURL.indexOf("?") == -1) ? "?" : "&";
								$(".search-results .request-service").eq(idx).attr("href", SB.serviceURL + separator + "dcode=" + data[idx].dealerCode + "&keyword=" + SB.keyword).attr("data-dcode", data[idx].dealerCode +  + SB.dealers.urlAtrrib);
								$(".search-results .no-service").eq(idx).hide();
							}
						}

					} else {
						$(".search-results .request-service").eq(idx).hide();
					}
				});

				$(".search-results").after("<a href='#' class='btn change-dealer results'>Change Dealer</a>");
				
				$(".listing-details .results").show();
				$("div.pagination").pagination({
					callback : function(pages, items) {
    					$(".listing-details .results").html("Results : " + items.range.start + "-" + items.range.end + " of " + items.count);
					}
				});

				$(".btn.request-service").on("click", function(e) {
					e.preventDefault();
					var serviceURL 		= $(this).attr("href"),
						dataDealerCode 	= $(this).data("dcode");

					SB.dealers.requestServiceTracking(dataDealerCode, serviceURL);
				});
			
			} 
			else {
				$(".search-error").show();
				SB.templateWrap.removeClass("loading");
			}

		},

		requestServiceTracking: function(dcode, serviceURL) {
			var params = {type: "o"};
			params.link = params.title = _da.pname + ":request service";
            params.onclicks = "service:book online";
            params.pname = _da.pname;
            s.prop1 = s.eVar1 = dcode;
            $.publish('/analytics/link/', params);
            		    
            window.location.href = serviceURL;
		},

		templateError: function(e) {

			var errorData = {"error" : "An error has occurred: " + e.statusText};
			$("#dealer-template-error").tmpl(errorData).appendTo(SB.templateWrap);

		},

		templateErrorSearch: function(e) {

			var errorData = {"error" : "An error has occurred: " + e.statusText};
			$("#search-template-error").tmpl(errorData).appendTo(SB.templateWrap);

		},

		checkPreferredDealer: function() {

			$(".dealer-search").hide();

			if ($.cookie("dfy.dl")) {
				this.populatePrefDealer();
			} else if ($.cookie("sp.pc")) {
				setTimeout(function() {
					SB.dealers.nearestDealer();
				},100);
			} else {
				this.searchDealer();
			}

		},

		populatePrefDealer: function() {

			var dealerCode 	= $.cookie("dfy.dl"),
				dealer		= SB.restServices["dealer.code"].replace("{site}", SB.site).replace("{code}", dealerCode) + SB.dealers.authorisedFilter;

			this.fetchData(dealer, 
				function (data) {
					
					// check if dealer is an Xtime participant
					if (data.fullXtimeParticipant === "Y") {

						SB.dealers.renderDealerTemplate(true, data);
						$(".preferred-dealer .large-text").hide();
						$(".preferred-dealer .large-text.xtime").show();
						$(".alert-text").hide();
						var separator = (SB.serviceURL.indexOf("?") == -1) ? "?" : "&";
						$(".request-service").attr("href", SB.serviceURL + separator + "dcode=" + data.dealerCode + "&keyword=" + SB.keyword);

						$(".btn.request-service").on("click", function(e) {
							e.preventDefault();
							var serviceURL = $(this).attr("href");
							SB.dealers.requestServiceTracking(data.dealerCode, serviceURL);
						});

					} else if(data.fullXtimeParticipant === null){
						if(SB.dealers.isMobile){
							var mobURL = data.mobileURL;
							if(mobURL === "" || mobURL === null ){
								SB.dealers.renderDealerTemplate(true, data);
								$(".preferred-dealer .large-text").hide();
								$(".preferred-dealer .large-text.noxtime").show();
								$(".request-service").hide();
								$(".change-dealer.results").hide();
							} else {
								SB.dealers.renderDealerTemplate(true, data);
								$(".preferred-dealer .large-text").hide();
								$(".preferred-dealer .large-text.xtime").show();
								$(".alert-text").hide();
								var separator = (SB.serviceURL.indexOf("?") == -1) ? "?" : "&";
								$(".request-service").attr("href", mobURL + SB.dealers.urlAtrrib);

								$(".btn.request-service").on("click", function(e) {
									e.preventDefault();
									var serviceURL = $(this).attr("href");
									SB.dealers.requestServiceTracking(data.dealerCode, serviceURL);
								});
							}

						} else {
							 var conURL = data.consumerURL;
							  if(conURL === "" || conURL === null ){
							  	SB.dealers.renderDealerTemplate(true, data);
								$(".preferred-dealer .large-text").hide();
								$(".preferred-dealer .large-text.noxtime").show();
								$(".request-service").hide();
								$(".change-dealer.results").hide();
							  } else {
							  	SB.dealers.renderDealerTemplate(true, data);
								$(".preferred-dealer .large-text").hide();
								$(".preferred-dealer .large-text.xtime").show();
								$(".alert-text").hide();
								var separator = (SB.serviceURL.indexOf("?") == -1) ? "?" : "&";
								$(".request-service").attr("href", SB.serviceURL + separator + "dcode=" + data.dealerCode + "&keyword=" + SB.keyword + SB.dealers.urlAtrrib);

								$(".btn.request-service").on("click", function(e) {
									e.preventDefault();
									var serviceURL = $(this).attr("href");
									SB.dealers.requestServiceTracking(data.dealerCode, serviceURL);
								});
							  }
						}

					} else {
						
						SB.dealers.renderDealerTemplate(true, data);
						$(".preferred-dealer .large-text").hide();
						$(".preferred-dealer .large-text.noxtime").show();
						$(".request-service").hide();
						$(".change-dealer.results").hide();

					}
					
					$(".change-dealer").on("click", function(e) {
						e.preventDefault();
						SB.dealers.searchDealer();
					});				

				},
				function (url, e, extStatus) {
					SB.dealers.renderDealerTemplate(false, null, e);
				});

		},

		nearestDealer: function() {
			var userLocation 	 = $.cookie("sp.pc"),
				searchContainer  = $(".dealer-search"),
				form 			 = $("form", searchContainer),
				dealerByLocation = SB.restServices["dealer.byAddressUrl"].replace("{site}", SB.site).replace("{location}", userLocation) + SB.dealers.authorisedFilter;

			$(".your-location").show().find("span").html(userLocation);

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

		searchDealer: function() {

			var searchContainer = $(".dealer-search");

			$(".preferred-dealer").hide();
			$(".search-results").hide();
			searchContainer.show();

			var form = $("form", searchContainer);

			form.submit(function(e){
				e.preventDefault();
				SB.dealers.formSubmit();
			});

		},

		formSubmit: function() {
			$(".search-error").hide();
			
			var searchContainer = $(".dealer-search"),
				location 		= $("#sb-dealerlocation").val(),
				name 			= $("#sb-dealername").val();

			if (location === "" && name === ""){
				$(".search-error", searchContainer).show();
				return;
			} else {
				$(".reveal-modal .item").remove();
				SB.dealers.runSearch(location, name);
			}
		},

		runSearch: function(location, name) {

			// rest services for search
			var dealerByName		 = SB.restServices["dealer.name"].replace("{site}", SB.site).replace("{name}", name) + SB.dealers.authorisedFilter,
				dealerByLocation 	 = SB.restServices["dealer.byAddressUrl"].replace("{site}", SB.site).replace("{location}", location) + SB.dealers.authorisedFilter,
				dealerByLocationName = SB.restServices["dealer.byLocationName"].replace("{site}", SB.site).replace("{location}", location).replace("{name}", name) + SB.dealers.authorisedFilter;

			$(".dealer-name").hide();
			$(".your-location").hide();

			if (name) {
				$(".dealer-name").show().find("span").html(name);
			}
			if (location) {
				$(".your-location").show().find("span").html(location);
			}

			if (name !== "" && location !== "" && name !== undefined) {
				// both name and location has a value
				$("reveal-modal .item").remove();

				SB.dealers.fetchData(dealerByLocationName, 
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


			} else if (name !== "" && location === "") {
				// only name has a value
				$("reveal-modal .item").remove();

				SB.dealers.fetchData(dealerByName, 
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

			} else if (name === "" && location !== "" || name === undefined  && location !== "") {
				// only location has a value
				$("reveal-modal .item").remove();

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

				var searchContainer = $(".dealer-search"),
					form 			= $("form", searchContainer);

			}
		},

		changeDealerBtn: function(e) {
			e.preventDefault();
			SB.overlay.scrollToTop();
			$(".dealer-search").show();
			$(".search-results").hide();
			$(".change-dealer.results").remove();
		}

	};

	$(function() {

		var commonConfig = $("#common-config").embeddedData();

		SB.site 		= commonConfig.site;
		SB.restServices = $("#rest-services").embeddedData();


		if ($(".service-booking .iframe").length > 0) {

			$(".service-booking .iframe").addClass("loading");

			$(".service-booking .iframe iframe").on("load", function() {
			  	$(".service-booking .iframe").removeClass("loading");
			});

		}

	});

})(jQuery);


(function($, window, document, undefined) {

  	var name = "pagination",
      	instance = null,
      	defaults = {
	        containerID: "search-items",
	        previous : "Prev",
	        next: "Next",
	        startPage: 1,
	        perPage: 3,
	        midRange: 5,
	        startRange: 1,
	        endRange: 1,
	        delay: 50,
	        direction: "forward",
	        animation: "",
	        fallback: 0,
	        callback: undefined //function( pages, items ) { }
      	};


  	function pag(element, options) {
	    this.options = $.extend({}, defaults, options);

	    this._container = $("#" + this.options.containerID);
	    if (!this._container.length) return;

	    this.jQwindow = $(window);
	    this.jQdocument = $(document);

	    this._holder = $(element);
	    this._nav = {};

	    this._first = {};
	    this._previous = $(this.options.previous);
	    this._next = $(this.options.next);
	    this._last = {};

	    /* only visible items! */
	    this._items = this._container.children(":visible");
	    this._itemsShowing = $([]);
	    this._itemsHiding = $([]);

	    this._numPages = Math.ceil(this._items.length / this.options.perPage);
	    this._currentPageNum = this.options.startPage;

	    this._clicked = false;
	    this._cssAnimSupport = this.getCSSAnimationSupport();

	    this.init();
  	}

  	pag.prototype = {

	    constructor : pag,

	    getCSSAnimationSupport: function() {
	      	var animation = false,
		        animationstring = 'animation',
		        keyframeprefix = '',
		        domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
		        pfx = '',
		        elm = this._container.get(0);

	      	if (elm.style.animationName) animation = true;

	      	if (animation === false) {
		        for (var i = 0; i < domPrefixes.length; i++) {
		          	if (elm.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
			            pfx = domPrefixes[i];
			            animationstring = pfx + 'Animation';
			            keyframeprefix = '-' + pfx.toLowerCase() + '-';
			            animation = true;
			            break;
		          	}
		        }
	      	}

	      	return animation;
	    },

	    init: function() {
	      	this.setStyles();
	      	this.setNav();
	      	this.paginate(this._currentPageNum);
	    },

	    setStyles: function() {
	      	var requiredStyles = "<style>" +
	      	".pag-invisible { visibility: hidden !important; } " +
	      	".pag-hidden { display: none !important; }" +
	      	"</style>";

	      $(requiredStyles).appendTo("head");

	      	if (this._cssAnimSupport && this.options.animation.length)
	        	this._items.addClass("animated pag-hidden");
	      	else this._items.hide();

	    },

	    setNav: function() {
	      	var navhtml = this.writeNav();

	      	this._holder.each(this.bind(function(index, element) {
	        	var holder = $(element);
	        	holder.html(navhtml);
	        	this.cacheNavElements(holder, index);
	        	this.bindNavHandlers(index);
	        	this.disableNavSelection(element);
	      	}, this));
	    },

	    writeNav: function() {
	      	var i = 1, navhtml;
	      	navhtml = this.writeBtn("first") + this.writeBtn("previous");

	      	for (; i <= this._numPages; i++) {
	        	if (i === 1 && this.options.startRange === 0) navhtml += "<span>...</span>";
	        	if (i > this.options.startRange && i <= this._numPages - this.options.endRange)
	          		navhtml += "<a href='#' class='pag-hidden'>";
	        	else
	          		navhtml += "<a>";
	            	navhtml += i;
	            	
	        navhtml += "</a>";
	        if (i === this.options.startRange || i === this._numPages - this.options.endRange)
	          	navhtml += "<span>...</span>";
	      	}
	      	navhtml += this.writeBtn("next") + this.writeBtn("last") + "</div>";
	      	return navhtml;
	    },

	    writeBtn: function(which) {

	      	return this.options[which] !== false && !$(this["_" + which]).length ?
	      	"<a class='pag-" + which + "'>" + this.options[which] + "</a>" : "";

	    },

	    cacheNavElements: function(holder, index) {
	      	this._nav[index] = {};
	      	this._nav[index].holder = holder;
	      	this._nav[index].first = this._first.length ? this._first : this._nav[index].holder.find("a.pag-first");
	      	this._nav[index].previous = this._previous.length ? this._previous : this._nav[index].holder.find("a.pag-previous");
	      	this._nav[index].next = this._next.length ? this._next : this._nav[index].holder.find("a.pag-next");
	      	this._nav[index].last = this._last.length ? this._last : this._nav[index].holder.find("a.pag-last");
	      	this._nav[index].fstBreak = this._nav[index].holder.find("span:first");
	      	this._nav[index].lstBreak = this._nav[index].holder.find("span:last");
	      	this._nav[index].pages = this._nav[index].holder.find("a").not(".pag-first, .pag-previous, .pag-next, .pag-last");
	      	this._nav[index].permPages = this._nav[index].pages.slice(0, this.options.startRange).add(this._nav[index].pages.slice(this._numPages - this.options.endRange, this._numPages));
	      	this._nav[index].pagesShowing = $([]);
	      	this._nav[index].currentPage = $([]);
	    },

	    bindNavHandlers: function(index) {
	      	var nav = this._nav[index];

	      	// default nav
	      	nav.holder.bind("click.pagination", this.bind(function(evt) {
		        var newPage = this.getNewPage(nav, $(evt.target));
		        if (this.validNewPage(newPage)) {
		          	this._clicked = true;
		          	this.paginate(newPage);
		        }
	        	evt.preventDefault();
	      	}, this));

	      	// custom previous
	      	if (this._previous.length) {
	        	this._previous.bind("click.pagination", this.bind(function() {
		          	var newPage = this._currentPageNum - 1;
		          	if (this.validNewPage(newPage)) {
		            	this._clicked = true;
		            	this.paginate(newPage);
		          	}
	        	}, this));
	      	}

	      	// custom next
	      	if (this._next.length) {
	        	this._next.bind("click.pagination", this.bind(function() {
		          	var newPage = this._currentPageNum + 1;
		          	if (this.validNewPage(newPage)) {
		            	this._clicked = true;
		            	this.paginate(newPage);
		          	}
	        	}, this));
	      	}

	    },

	    disableNavSelection: function(element) {
	      	if (typeof element.onselectstart != "undefined")
	        	element.onselectstart = function() {
	          	return false;
	        };
	      	else if (typeof element.style.MozUserSelect != "undefined")
	        	element.style.MozUserSelect = "none";
	      	else
	        	element.onmousedown = function() {
	          	return false;
	        };
	    },

	    getNewPage: function(nav, target) {
	      	if (target.is(nav.currentPage)) return this._currentPageNum;
	      	if (target.is(nav.pages)) return nav.pages.index(target) + 1;
	      	if (target.is(nav.first)) return 1;
	      	if (target.is(nav.last)) return this._numPages;
	      	if (target.is(nav.previous)) return nav.pages.index(nav.currentPage);
	      	if (target.is(nav.next)) return nav.pages.index(nav.currentPage) + 2;
	    },

	    validNewPage: function(newPage) {
	      	return newPage !== this._currentPageNum && newPage > 0 && newPage <= this._numPages;
	    },

	    paginate: function(page) {
	      	var itemRange, pageInterval;
	      	itemRange = this.updateItems(page);
	      	pageInterval = this.updatePages(page);
	      	this._currentPageNum = page;
	      	if ($.isFunction(this.options.callback))
	        	this.callback(page, itemRange, pageInterval);
	    },

	    updateItems: function(page) {
	      	var range = this.getItemRange(page);
	      	this._itemsHiding = this._itemsShowing;
	      	this._itemsShowing = this._items.slice(range.start, range.end);
	      	if (this._cssAnimSupport && this.options.animation.length) this.cssAnimations(page);
	      		else this.jQueryAnimations(page);
	      	return range;
	    },

	    getItemRange: function(page) {
	      	var range = {};
	      	range.start = (page - 1) * this.options.perPage;
	      	range.end = range.start + this.options.perPage;
	      	if (range.end > this._items.length) range.end = this._items.length;
	      	return range;
	    },

	    cssAnimations: function(page) {
	      	clearInterval(this._delay);

	      	this._itemsHiding.removeClass(this.options.animation + " pag-invisible").addClass("pag-hidden");

	      	this._itemsShowing.removeClass("pag-hidden").addClass("pag-invisible");

	      	this._itemsOriented = this.getDirectedItems(page);
	      	this._index = 0;

	      	this._delay = setInterval(this.bind(function() {
	        	if (this._index === this._itemsOriented.length) clearInterval(this._delay);
	       		else {
	          		this._itemsOriented.eq(this._index).removeClass("pag-invisible").addClass(this.options.animation);
	        	}
	        	this._index = this._index + 1;
	      	}, this), this.options.delay);
	    },

	    jQueryAnimations: function(page) {
	      	clearInterval(this._delay);
	      	this._itemsHiding.addClass("pag-hidden");
	      	this._itemsShowing.fadeTo(0, 0).removeClass("pag-hidden");
	      	this._itemsOriented = this.getDirectedItems(page);
	      	this._index = 0;
	      	this._delay = setInterval(this.bind(function() {
	        	if (this._index === this._itemsOriented.length) clearInterval(this._delay);
	        	else {
	          		this._itemsOriented.eq(this._index).fadeTo(this.options.fallback, 1);
	        	}
	        	this._index = this._index + 1;
	      	}, this), this.options.delay);
	    },

	    getDirectedItems: function(page) {
	      	var itemsToShow;

	      	switch (this.options.direction) {
	        	case "backwards":
	          		itemsToShow = $(this._itemsShowing.get().reverse());
	          		break;
	        	case "random":
	          		itemsToShow = $(this._itemsShowing.get().sort(function() {
	            		return (Math.round(Math.random()) - 0.5);
	          		}));
	          		break;
	        	case "auto":
	          		itemsToShow = page >= this._currentPageNum ?
	          		this._itemsShowing : $(this._itemsShowing.get().reverse());
	          		break;
	        	default:
	          		itemsToShow = this._itemsShowing;
	          		break;
	      	}

	      	return itemsToShow;
	    },

	    updatePages: function(page) {
	      	var interval, index, nav;
	      	interval = this.getInterval(page);
	      	for (index in this._nav) {
	        	if (this._nav.hasOwnProperty(index)) {
		          	nav = this._nav[index];
		          	this.updateBtns(nav, page);
		          	this.updateCurrentPage(nav, page);
		          	this.updatePagesShowing(nav, interval);
		          	this.updateBreaks(nav, interval);
	        	}
	      	}
	      	return interval;
	    },

	    getInterval: function(page) {
	      	var neHalf, upperLimit, start, end;
	      	neHalf = Math.ceil(this.options.midRange / 2);
	      	upperLimit = this._numPages - this.options.midRange;
	      	start = page > neHalf ? Math.max(Math.min(page - neHalf, upperLimit), 0) : 0;
	      	end = page > neHalf ?
	        Math.min(page + neHalf - (this.options.midRange % 2 > 0 ? 1 : 0), this._numPages) :
	        Math.min(this.options.midRange, this._numPages);
	      	return {start: start,end: end};
	    },

	    updateBtns: function(nav, page) {
	      	if (page === 1) {
	        	nav.first.addClass("pag-disabled");
	        	nav.previous.addClass("pag-disabled");
	      	}
	      	if (page === this._numPages) {
	        	nav.next.addClass("pag-disabled");
	        	nav.last.addClass("pag-disabled");
	      	}
	      	if (this._currentPageNum === 1 && page > 1) {
	        	nav.first.removeClass("pag-disabled");
	        	nav.previous.removeClass("pag-disabled");
	      	}
	      	if (this._currentPageNum === this._numPages && page < this._numPages) {
	        	nav.next.removeClass("pag-disabled");
	        	nav.last.removeClass("pag-disabled");
	      	}
	    },

	    updateCurrentPage: function(nav, page) {
	      	nav.currentPage.removeClass("pag-current");
	      	nav.currentPage = nav.pages.eq(page - 1).addClass("pag-current");
	    },

	    updatePagesShowing: function(nav, interval) {
	      	var newRange = nav.pages.slice(interval.start, interval.end).not(nav.permPages);
	      	nav.pagesShowing.not(newRange).addClass("pag-hidden");
	      	newRange.not(nav.pagesShowing).removeClass("pag-hidden");
	      	nav.pagesShowing = newRange;
	    },

	    updateBreaks: function(nav, interval) {
	      	if (interval.start > this.options.startRange || (this.options.startRange === 0 && interval.start > 0)) nav.fstBreak.removeClass("pag-hidden");
	      	else nav.fstBreak.addClass("pag-hidden");

	      	if (interval.end < this._numPages - this.options.endRange) nav.lstBreak.removeClass("pag-hidden");
	      	else nav.lstBreak.addClass("pag-hidden");
	    },

	    callback: function(page, itemRange, pageInterval) {
	      	var pages = {
	            current: page,
	            interval: pageInterval,
	            count: this._numPages
	        },
	        items = {
	            showing: this._itemsShowing,
	            oncoming: this._items.slice(itemRange.start + this.options.perPage, itemRange.end + this.options.perPage),
	            range: itemRange,
	            count: this._items.length
	        };

	      	pages.interval.start = pages.interval.start + 1;
	      	items.range.start = items.range.start + 1;
	      	this.options.callback(pages, items);
	    },

	    bind: function(fn, me) {
	      	return function() {
	        	return fn.apply(me, arguments);
	      	};
	    },

	    destroy: function() {
	      	this.jQdocument.unbind("keydown.pagination");
	      	this._container.unbind("mousewheel.pagination DOMMouseScroll.pagination");

	      	if (this._cssAnimSupport && this.options.animation.length)
	        	this._items.removeClass("animated pag-hidden pag-invisible " + this.options.animation);
	      	else this._items.removeClass("pag-hidden").fadeTo(0, 1);
	      	this._holder.unbind("click.pagination").empty();
	    }

  	};

  	$.fn[name] = function(arg) {
	    var type = $.type(arg);

	    if (type === "object") {
	      	if (this.length && !$.data(this, name)) {
	        	instance = new pag(this, arg);
	        	this.each(function() {
	          		$.data(this, name, instance);
	        	});
	      	}
	      	return this;
	    }

	    if (type === "string" && arg === "destroy") {
	      	instance.destroy();
	      	this.each(function() {
	        	$.removeData(this, name);
	      	});
	      	return this;
	    }

	    if (type === 'number' && arg % 1 === 0) {
	      	if (instance.validNewPage(arg)) instance.paginate(arg);
	      	return this;
	    }

	    return this;
  	};

})(jQuery, window, document);

