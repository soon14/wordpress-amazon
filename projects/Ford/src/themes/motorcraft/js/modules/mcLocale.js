/*
Author:                 Joel Wang
File name:              mcLocale.js
Description:    		set cookie for user preferred country&language 
Dependencies:   		jQuery
Usage:                  Motorcraft project phase II
*/
(function($){
	mcLocale = {
		init: function() {
			var commonConfig = $("#common-config").embeddedData(),
				localeName = commonConfig.locale,
				url	= window.location.href;
				this.cookieKey="dfy.locale";				
				this.cookieDomain = commonConfig.cookieDomain;
				if ($("#locale-data").size()) {
					this.updateCookie(url);
				}
			$(".country-list>.country>ul>li>a, .country-select>ul>li a").on("click", function(e){
				if($(this).attr("href")) {
					mcLocale.updateCookie($(this).attr("href"));
				}
			});
		},
		updateCookie: function(value) {
			if (value) {
				//remove the host name,  get the relative path, etc "/en/irq/xxx"
				var host = location.host, i = value.indexOf(host);
				value = i > 0 ? value.substr(i + host.length) : value;
				if (!value) return;
				//remove the first '/' if nessary.
				value = value.charAt(0) == '/' ? value.substr(1) : value;

				//get the locale array, like [ "en", "irq", "0" ]
				var localeArr = value.split('/').slice(0,2);				

				$.cookie(this.cookieKey, localeArr.join('-'), {
					expires: 365,
					path: '/',
					domain: this.cookieDomain
				});
				
				// Whether current url contains sth like "/bh/ar"?
				if(location.href.indexOf('/' + localeArr.slice(0,2).join('/')) > 0){
					return 0;
				}

			}
		}
	}

	$(function(){
				mcLocale.init();
	});

}) (jQuery);