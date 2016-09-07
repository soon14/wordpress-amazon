/*
Author:                 Joel Wang
File name:              detectLocation.js
Description:    		detect location function
Dependencies:   		jQuery
Usage:                  Motorcraft project phase II
*/
(function($){
	detectLocation = {
		init: function() {
			this.site = $("#common-config").embeddedData().site;
			this.restfulURL= $("#detect-location-config").embeddedData().redirectRestfulURL;
			this.restfulURLAlt =  $("#rest-services").embeddedData()['homepage.byLanguage'] || '';
			this.languageList 	  = $("#language-list").embeddedData() || '';	
			this.stayonRedirection=$("#detect-location-config").embeddedData().stayonRedirection || 5000;
			this.tplData = {};
			this.urlRedirect = true;
			this.url = window.location.href;

			if(window.location.pathname=="/") {
			//url is main entry point
					if($.cookie("dfy.locale")||$.cookie("userInfo")) {
					//start detection when cookie exist
						this.openOverlay();
					}
					else {
						//remove blur
						$("body").removeClass('target');
					}
			}
		},
		checkCookie: function() {
			var self=this,
				customCookie=$.cookie("dfy.locale"),
				userinfoCookie=$.cookie("userInfo"),
				site = self.languageList;
				localeArr=[];
				localeArr=customCookie?customCookie.split('-'):[];

			if(customCookie&&localeArr[0]&&localeArr[1]) {
					//return redirect url based on user preference cookie
					self.tplData.redirect=true;

					// check if the new rest service is available
					if(self.restfulURLAlt) {

						var restService = self.restfulURLAlt.replace('{site}', site[localeArr[1]].lang[localeArr[0]].site)
											  	   .replace('{country}', localeArr[1])
											       .replace('{language}', localeArr[0]);

					     //calls the rest service to get the JSON return value
					     $.ajax({
					       url: restService
					     }).done(function(redirectLink) {
					     	//get the url link from the return value of rest service call
					  		detectLocation.tplData.location= redirectLink.url;  	

					  		//redirect to the given url by the rest service call
					  		detectLocation.processRedirection(self.tplData);	
					     });		       
	
					} else {

						//if the new rest service call is not available, proceed to the old link generator
						self.tplData.location=window.location.protocol+'//'+window.location.host+'/'+localeArr[0]+'/'+localeArr[1];
						self.processRedirection(self.tplData);			
					}				
					
					
			}
			//read Akamai location cookie
			else if(userinfoCookie) {
				localeArr=userinfoCookie.split('#');
				if(localeArr[0]&&localeArr[0].indexOf('country_code')!=-1&&self.restfulURL) {
					$.ajax({
						url: self.restfulURL.replace('{countryCode}',localeArr[0].split('=')[1].toLowerCase()).replace('{encoded url}',encodeURIComponent(self.url)),
	                    success: function(data) {
	                    	self.tplData=data;
	                    	self.processRedirection(self.tplData);
	                        
	                    },
	                    error: function() {
	                    	self.closeOverlay();
	                    },
	                    timeout: function() {
	                    	self.closeOverlay();
	                    }
                	});
				}
			}
			else {
				self.closeOverlay();
			}
		},
		processRedirection: function(tplData) {
			var self=this;
			if (tplData.redirect) {
				self.openOverlay(tplData);
				//show rederecting message a period of time 				
				setTimeout(function(){
					if(detectLocation.urlRedirect) {
						$("#content-modal .cancel-redirect").addClass("disabled");
						$("#content-modal .close-reveal-modal").addClass("disabled");
						window.location.href=tplData.location;
					}
				},self.stayonRedirection);
			}
			else {
				self.closeOverlay();
			}
			
		},
		openOverlay: function(tplData){
			var self=this,
				elem = $(".country-list"),
				modalContainer = $("#content-modal");
				elem.data("reveal-sizing","fixed-tiny");
			if(typeof(tplData)=='undefined') {
				$("body").addClass('open-overlay');	
			//show overlay with detecting message
				if(!self.isIE(8)) {
					//add blur when browser  is not IE8		
					$("#header").addClass('target');
					$(".country-list").addClass('target');
					$(".reveal-modal-bg").addClass('target');
					$("#footer-wrapper").addClass('target');
				}
				$("body").removeClass("target");
				$.subscribe('foundation-reveal-modal-open',function(){
					var waitOverlay = setInterval(function() {
						//wait until overlay displayed
						if($("#content-modal").css("display")!=='none') {
							clearInterval(waitOverlay);
							self.loadOverlay();
						}
					},1000);
				});
				revealModal.modalSuccess($(".message-overlay"),elem,modalContainer);

				

			}
			else {
					//show overlay with redirecting message
					self.renderTemplate(tplData);
					$(".message-overlay .layout-detecting").hide();
					$(".message-overlay .layout-redirecting").show();
			}
		},
		loadOverlay: function() {
			var self=this;
			//render message when reveal modal opened
    		revealModal.modalClose();
			self.renderTemplate();
			$(".message-overlay .layout-detecting").show();
			$(".message-overlay .layout-redirecting").hide();					
			$(window).resize(function(){
                if(modalContainer.is(":visible")){
                    revealModal.modalResize(elem,modalContainer);
                }		                
            });
			//show detecting message a period of time 
			setTimeout(function() {
				self.checkCookie();
			},self.stayonRedirection);
		},
		renderTemplate: function(tplData) {
			var self=this;
			if(!$(".message-overlay").length||!("#message-template").length) return;
			$(".message-overlay .layout-detecting").remove();
			$(".message-overlay .layout-redirecting").remove();
			if(typeof(tplData)=="undefined") {
				$("#message-template").tmpl().appendTo(".message-overlay");	
			}
			else {
				$("#message-template").tmpl(tplData).appendTo(".message-overlay");	
			}			
			$(".cancel-redirect").on("click",function(e) {
				e.preventDefault();
				if(!$(this).hasClass('disabled')) {
					self.cancelRedirection();
				}
				
			});
		},
		closeOverlay: function(){
			var self=this;
			$("body").removeClass('open-overlay');	
			if(!self.isIE(8)) {
				$("#header").removeClass('target');
				$(".country-list").removeClass('target');
				$(".reveal-modal-bg").removeClass('target');
				$("#footer-wrapper").removeClass('target');
				$("body").removeClass("target");
			}
			$("#content-modal .close-reveal-modal").trigger("click");
			},
		cancelRedirection: function(){
			var self=this;
			self.urlRedirect=false;
			self.closeOverlay();

		},
		isIE: function(version, comparison) {
			var cc = 'IE',
				b = document.createElement('B'),
				docElem = document.documentElement,
				isIE;

			if(version){
				cc += ' ' + version;
				if(comparison){ cc = comparison + ' ' + cc; }
			}

			b.innerHTML = '<!--[if '+ cc +']><b id="iecctest"></b><![endif]-->';
			docElem.appendChild(b);
			isIE = !!document.getElementById('iecctest');
			docElem.removeChild(b);
			return isIE;
		}
	};
	$(function(){
				detectLocation.init();
	});

}) (jQuery);