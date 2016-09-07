
/*
Author: Ruiwen Qin
File name: revealModal.js
Description: AJAX loading for foundation reveal modal
            "reveal-content-modal" class needs to be added, and the clicking event will be handeled here.

            The HTML structure for reveal modal needs to be put on the page as following

            <!-- Foundation Reveal Content Modal -->
            <div id="content-modal" class="reveal-modal">
                <div class="content"></div>
                <a class="close-reveal-modal" href="#">Close</a>
            </div>            
            sizing(foundation default):
            .tiny: 30% wide
            .small: 40% wide
            .medium: 60% wide
            .large: 80% wide - default, if no class is selected, this is the size that gets applied.
            .xlarge: 90% wide
            .full: 100% width and height, defaults the escClose option to true, as well as creates a close button.
            default .full on mobile size ( $(window).size<=751) and .large on desktop size( $(window).size > 751)
            use dataset to change default size on desktop size. e.g. data-reveal-sizing="medium"

            sizing(customized):
            .fixed-tiny: 490px
            .fixed-small: 655px
            .fixed-medium: 980px
            .fixed-large: 1310px
            .fixed-xlarge: 1470px

Dependencies: jQuery, foundation.reveal.js
*/

(function($){
    revealModal = {
        init: function(){
            if (!$(".reveal-content-modal").length) {return;}



            $(".reveal-content-modal").on('click', function(e){
                e.preventDefault();
                
                var modalContent = $(this).attr("href"),
                    elem = $(this),
                    modalContainer = $("#content-modal");



                $.ajax({
                    url: modalContent,
                    success: function(data) {
                        revealModal.modalSuccess(data,elem,modalContainer);
                    }
                });



                $(window).resize(function(){
                    if(modalContainer.is(":visible")){
                        revealModal.modalResize(elem,modalContainer);
                    }
                    
                });

            });

            revealModal.modalClose();
        },
        modalResize: function(elem,modalContainer){
            if($(window).width() > 767){
                //$(".reveal-modal-bg").show();
                $("body").removeClass("no-scroll has-scroll");
                modalContainer.removeClass("full").addClass(elem.data("reveal-sizing")).css({"top":$(window).scrollTop() + modalContainer.data('css-top') +'px'});
            }
            else {
                //$(".reveal-modal-bg").hide();
                $("body").addClass("no-scroll has-scroll");
                modalContainer.removeClass(elem.data("reveal-sizing")).addClass("full");
            }
        },
        modalSuccess: function(data,elem,modalContainer) {
            //fix reveal close not working
            $(".reveal-modal-bg").show();
            $("#content-modal").show();
            $("#content-modal .content").html(data);
            
            $("#content-modal").foundation("reveal", "open", {
                animationSpeed: 100,
                animation: "fade"
            });

            revealModal.modalResize(elem,modalContainer);
            $.publish('foundation-reveal-modal-open',[elem]);
            
        },
        modalClose: function(){
            $("#content-modal .close-reveal-modal").on("click", function(e) {
                e.preventDefault();
                $(".reveal-modal").foundation("reveal", "close");
                //fix reveal close not working
                $(".reveal-modal-bg").hide();
                $("#content-modal").hide();
                setTimeout(function() {
                    $("#content-modal .content").html("");
                }, 500);

                // ensure focus onto document body after overlay is closed - IE has focus issues
                $("body").focus();

                $.publish('foundation-reveal-modal-close');
                $("body").removeClass("no-scroll has-scroll");
            });
        }
        
    };

    $(function(){
        revealModal.init();
    });

})(jQuery);


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


/*
Author: 		Wendelle Alimbubuyog
File name: 		mcLanguageSelect.js
Description: 	Dynamic language selection based on available language in a certain country
Dependencies: 	jQuery, uniform.js
Usage: 			- add class="uniform" to the container of the form
				- add id="country-select" to the select dropdown of country
				- add id="language-select" to the select dropdown of language
				- add id="redirect-btn" to the button that will redirect the page
*/


(function($){
	mcLanguageSelect = {			
		init: function(){	
			var self = this; 

			// check if the module is already existing 
			if(!typeof mcLanguageSelect){return;}

			self.countrySelectEl  = $('#country-select');
			self.langeSelectEl 	  = $('#language-select');	
			self.redirectButtonEl = $('#redirect-btn');
			self.languageList 	  = $("#language-list").embeddedData();
			self.homepageUrl 	  = $("#rest-services").embeddedData()['homepage.byLanguage'];

			// render the options for country select
			self.populateCountry(self.languageList);

			// when the country select is changed, the language select 
			self.countrySelectEl.on('change', self.countryChange.bind(self));

			// when the language select is changed, the link in the button is updated 
			self.langeSelectEl.on('change', self.languageChange.bind(self));

			// reset link href
			self.removeLink();

			$.uniform.update();

			//forces the span of uniform.js to render the text on clicking the back browser
			var cst = this.findFirstOption(this.langeSelectEl);
			this.langeSelectEl.siblings('span').text(cst); 
		},
		setCookie : function(cc, ln) {  //cc = country code , lc = language
			guxApp.cookie.set('dfy.locale', ln+"-"+cc);
		},
		populateCountry: function(list){
			// reset the options of country  select	
			var items = '<option value="0" selected>'+ this.findFirstOption(this.countrySelectEl) +' </option>';
			// var items = '<option value="0" selected> Select Country </option>';

			// add the options to the select dropdown 
			items += this.renderOption('country', list)

			//  append the option items to the country select
			this.countrySelectEl.html(items);
		},
		populateLanguage: function(list, item){
			// reset the options of country  select	
			var items = '<option value="0" selected>'+ this.findFirstOption(this.langeSelectEl) +' </option>';
			// var items = '<option value="0" selected> Select Language </option>';

			// add the options to the select dropdown 
			items += this.renderOption('language', list[item].lang)

			// enable the button
			this.langeSelectEl.html(items).prop('disabled', false);
			this.langeSelectEl.parent().removeClass('disabled');
		},
		countryChange: function(e){
			var self = this,
				el = e.target,
				elVal = $(el).val();

			this.removeLink();

			// check if selected option has value	
			if(elVal != "0") {
				this.populateLanguage(this.languageList, elVal);
			} else {
				this.langeSelectEl.find('option:first').attr('selected','selected');
				this.langeSelectEl.parent().addClass('disabled');
				this.langeSelectEl.prop('disabled', true);
			}


		  	// remove error text
		  	self.redirectButtonEl.find('span').remove();

			// update the text of dropdown
			$.uniform.update();
		},
		languageChange: function(e){
			var el = e.target,
				elVal = $(el).val();

			// check if selected option has value		
			if(elVal != "0") { 
				this.updateLink();
			} else {
				this.removeLink();
			} 

			// $.uniform.update() ;
		},
		findFirstOption: function(elem){
			return elem.find("option[value='0']").text();
		},
		updateLink: function() {
			var self = this,
				country = self.countrySelectEl.val(),
				lang = self.langeSelectEl.val(),
				site = self.languageList[country].lang[lang].site;

			// replace the variables from rest service
			var restService = this.homepageUrl.replace('{site}', site)
											  .replace('{country}', country)
											  .replace('{language}', lang);
			
			

			console.log(restService);	
								  			
			//calls the rest service to get the JSON return value
			$.ajax({
			  url: restService,
			  beforeSend: function( xhr ) {
			    mcLanguageSelect.removeLink();
			  }
			}).done(function(redirectLink) {

			 	// add link to href and disable the button	
			 	mcLanguageSelect.redirectButtonEl.removeClass("disabled")
			 	  					 .prop('disabled', false )
			 	  					 .attr("href", redirectLink.url);

			 	//update coookie upon clicking the button				 
			 	mcLanguageSelect.redirectButtonEl.on('click', function(){
			 		self.setCookie(country, lang)
			 	}) ; 					 
			}).fail(function() {
			    mcLanguageSelect.redirectButtonEl.append('<span> Error </span>')
			})	

		}, 
		removeLink: function() {

			// remove link to href and enable the button
			this.redirectButtonEl.addClass("disabled")
								 .attr("href", "#")
								 .prop('disabled', true );
		},
		renderOption: function( type, list){
		   // var option = "";
		   var option;

		   $.each( list, function( key, val ) {
	   	 		option += '<option value="'+ key +'"> '+ val.name +' </option>';
	   	 	 });
		   return option;

		}	
	}

	$(function(){
		mcLanguageSelect.init();
	});

})(jQuery);


/*
Author: 		Wendelle Alimbubuyog
File name: 		mcStickyFooter.js
Description: 	Check of if the document is shorter that viewport; if true, it will make the footer stick at the bottom
Dependencies: 	jQuery 
Usage: 			
*/


(function($){
	mcStickyFooter = {
		init: function(){	
			// this is only for landing page v2
			this.mainContentDiv = $('.landing-page-v2');

			this.wHeight = $(window).height();
			this.dheight = $(document.body).height();	

			// check if document is shorter that the window height
			if( this.wHeight < this.dheight) {
				$('body').removeClass('sticky-footer');
			} else {
				$('body').addClass('sticky-footer');
			}

			// initialize on window resize
			this.resize();

			// vertically center the content
			this.centerBody(this.wHeight, this.dheight);
		},
		resize: function(){
			$(window).on("resize", function() {
				
				this.wHeight = $(window).height();
				this.dheight = $(document.body).height();

				// check if document is shorter that the window height
				if( this.wHeight < this.dheight) {
					$('body').removeClass('sticky-footer');
				} else {
					$('body').addClass('sticky-footer');
				}

				// vertically center the content
				mcStickyFooter.centerBody(this.wHeight, this.dheight);
			});
		},
		centerBody: function(wh , dh){ // wh = window height, dh = document height
			var marginTop = (wh - dh) / 2;
			
			// add margin top to center the content, even in negative, it will just set the margin top into 0
			this.mainContentDiv.css('marginTop', Math.max(0,marginTop));
		}	
	}

	$(function(){
		mcStickyFooter.init();
	});

})(jQuery);

