(function($){

	var Locale = function(){
		var locale = this;

		//locale code array
		var localeArr = [],
			COUNTRY = 1,
			CONFIRMED = 2;

		//locale cookie store
		var cookieKey = "dfy.fme.locale", domain;

		var commonConfig = $("#common-config").embeddedData(),
			cookieDomain = commonConfig.cookieDomain,
			localeName = commonConfig.locale;


		locale.checkLocale = function(){
			var self = this;
			var url = window.location.href;
			var location = [];

			
			if ($.cookie(cookieKey)){
				location = $.cookie(cookieKey).split('-');

				if (url.indexOf(location[1]) < 0){
					locale.clearFPSinfo();
					
					locale.setGTUID();
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
			
		};

		//check if there existing confirmed locale cookie
		//if not popup the overlay
		locale.checkCookie = function(url){
			var cookieVal = $.cookie(cookieKey);
			if(cookieVal){
				localeArr = cookieVal.split('-');
			}

			var json = $("#locale-data").embeddedData();
			var url = json["locale-overlay"];
			domain = json["domain"];

			



			//if the locale is confirmed, will not popup overlay.
			if(localeArr[CONFIRMED]=="1"){
				return;
			}

			if (url) {
				$.publish("overlay.launch", {
					url: url,
					success: function() {
						locale.bindOverlay();
					}
				});
			}
		};

		//bind event to overlay, force redirection and change cookie
		//whern user submit the form.
		locale.bindOverlay = function(){
			if($("#overlay .controls").size()){
				$("#overlay .controls").hide();
			}
			$(".country-overlay select").change(function(e){
				$(this).parent("form").attr({"action":$(this).val()});
			}).trigger("change");		//rise change event on default

			$(".country-overlay form").submit(function(e){
				var $this = $(this);
				var value = $("select",$this).val();

				if($this.attr("action")){
					$this.attr({"action": value});
				}

				if (value.indexOf(localeName) < 0){
					locale.clearFPSinfo();
				}

				//if current submit data match the current current url
				//cancel the submit redirection and hide the overlay
				if(!locale.updateCookie(value,true)){
					e.preventDefault();
					$.publish("overlay.hide");
					return false;
				}
			});
			
			var country = localeArr[COUNTRY];
			if (country) {
				$(".country-overlay select option").each(function(idx){
					var $options = $(this);
					var val = $options.attr("value");
					if (val && val.indexOf(country) > 0) {
						$options.attr({"selected" : "selected"});
					}
				});
			}
		};

		//init the tab menu, has dependence of the checkCookie
		locale.initMenu = function(){
			var $current = $(".countrytab .current");
			var $anchors = $(".country li a");

			//Update Menu text
			if(localeArr[CONFIRMED] == "1"){
				//convert ["bh", "ar", "1"] => "bh/ar"
				var key = localeArr.slice(0,2).join('/');
				$anchors.each(function(){
					var $this = $(this);
					var href = $this.attr("href");
					if(href.indexOf(key) >-1 ){
						$current.text($this.text());
					}
				});
			}

			//bind event to top menu update cookie when click on the anchors
			$anchors.click(function(e){
				var value = $(this).attr("href");
				if(!locale.updateCookie(value)){





				if (value.indexOf(localeName) < 0){
					locale.clearFPSinfo();
				}

				if(!locale.updateCookie(value,true)){
					e.preventDefault();
				}
			}
				
			});
		};

		//update locale cookie: convert url "/bh/ar/homeXXX#**" => bh-ar-1
		//return 0 means selected locale match the current url
		locale.updateCookie = function(value,confirmed){
			if (value) {
				//remove the host name,  get the relative path, etc "/en/irq/xxx"
				var host = location.host, i = value.indexOf(host);
				value = i > 0 ? value.substr(i + host.length) : value;
				//remove the first '/' if nessary.
				value = value.charAt(0) == '/' ? value.substr(1) : value;

				//get the locale array, like [ "en", "irq", "0" ]
				var localeArr = value.split('/').slice(0,2);

				if (confirmed){
					localeArr[CONFIRMED] = "1";
				}
				else{
					localeArr[CONFIRMED] = "0";
				}
				

				$.cookie(cookieKey, localeArr.join('-'), {
					expires: 365,
					path: '/',
					domain: domain
				});

				

				// Whether current url contains sth like "/bh/ar"?
				if(location.href.indexOf('/' + localeArr.slice(0,2).join('/')) > 0){
					return 0;
				}

			}

			return 1;
		};

























		locale.clearFPSinfo = function(){
			if($.cookie('dfy.uuid')){
				$.removeCookie('dfy.uuid', {path:'/', domain:cookieDomain});
			}

			if($.cookie('gt_uid')){
				var dmArray = [];
				dmArray = cookieDomain.split('.');

				var dmStr = "." + dmArray[dmArray.length - 2] + "." + dmArray[dmArray.length - 1];
				
				$.removeCookie('gt_uid', {path:'/', domain:dmStr});
			}

			if($.cookie('dfy.p')){
				$.removeCookie('dfy.p', {path:'/', domain:cookieDomain});
			}

			if(sessionStorage.getItem("dfy.p") !== null){
				sessionStorage.removeItem("dfy.p");
			}

		};

		locale.setGTUID = function(){
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
		};

		locale.init = function(){
			locale.checkLocale();
			locale.checkCookie();
			locale.initMenu();
		};
	};

	$(document).ready(function(){
		// if ($("#locale-data").size()) {
		// 	window.setTimeout(function(){
		// 		var locale = new Locale();
		// 		locale.init();
		// 	}, 1000);
		// }
		if ($("#locale-data").size()){
			window.setTimeout(function(){
			var locale = new Locale();
			locale.init();
			}, 1000);
		}
		
	});

})(jQuery);