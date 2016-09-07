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