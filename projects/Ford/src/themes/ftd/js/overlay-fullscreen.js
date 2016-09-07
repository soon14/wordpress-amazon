/*
 * Author: Ruiwen Qin
 * This is fullscreen overlay plugin. By triggering this plugin, simply add 'fullscreen-overlay' class onto the element.
 *
 *Instructions:
 *1. load overlay through url
 *<a href='overlay.html' class='fullscreen-overlay'/>
 *$('.fullscreen-overlay').fullScreenOverlay({... });
 *
 *2. load overlay use customize content
 *<a href='#' class='fullscreen-overlay'/>
 *$('.fullscreen-overlay').fullScreenOverlay({
 *   useCustomizeContent: true,
 *   customizedContent: "<span class='loading'></span>"
 *});
 *
 *
 */

(function($) {
	
	$.fn.fullScreenOverlay = function(options){
		var defaults = {
			overlayId: "fullscreen-overlay",
			openOverlay: false,
			close: 'CLOSE',
			backtotop: 'BACK TO TOP',
			complete: null, //callback function
			useCustomizeContent: false,   // if set as true, will load the customized content
			customizedContent: null     //customizedContent will be loaded to contentbody when useCustomizeContent=true
		};
		
		var options = $.extend(defaults, options);
		
		var fullOverlay = function(element){
			var fulloverlay = this,
				url,
				cid,
				overlayContainer,
				overlayContent,
				currentPosition,
				state = {},
				scrolltop;

			// retrieve the texts for controls
			if ($("#overlay-controls").length > 0){
				var controlTexts = $("#overlay-controls").embeddedData();
				if (!$.isEmptyObject(controlTexts)){
					options.close = controlTexts.close;
					options.backtotop = controlTexts.backtotop;
				}
			}
			
			fulloverlay.init = function () {
				url = element.attr("href");
				cid = url.match(/cid=\d+/);
				
				if (Modernizr.history){
					var index = window.location.toString().indexOf(options.overlayId);
					if (index < 0){
						history.pushState(null,options.overlayId,location+"#"+options.overlayId+"="+cid);
					}
					
				}
				else {
					if (cid){
						state[options.overlayId] = cid.toString();
						$.bbq.pushState(state);
					}
					
				}
				
				fulloverlay.injectContainer();
				fulloverlay.injectControls();
				fulloverlay.loadContent();
				
			};
			
			fulloverlay.injectContainer = function(){
				var markup = '<div class="overlay-wrap"><span class="loader"></span></div>';
				$("body").addClass("noscroll");
				$("body").append(markup); 
				overlayContainer = $(".overlay-wrap");

				/* For fixing scroll issue on mobile - ios */
				/* Disable body scroll */
				$("body").on('touchmove',function(e){
					if($(this).hasClass("noscroll")){
						e.preventDefault();
					}
				});
				/* Allow overlay scroll */
				overlayContainer.on('touchmove', function(e){
					e.stopPropagation();
				});
				/** **/
				
			};
			
			fulloverlay.injectControls = function(){
				var markup = {
					topCloseBtn: function () {
						return '<div class="top-close"><a class="close" href="#"><span>' + options.close + '</span></a></div>';
					},
					bottomControls: function () {
						return '<div class="controls"><a href="#" class="backToTop">' + options.backtotop + '</a><a href="#" class="close">' + options.close + '</a></div>';
					}
				};
				
				overlayContent = $('<div class="overlay-content"></div>').hide();
				overlayContent.prepend($(markup.topCloseBtn()));
				$(".top-close", overlayContent).after($('<div class="content"></div>'));
				overlayContent.append(markup.bottomControls());

				overlayContentBody = $(".content", overlayContent);
				
			};
			
			fulloverlay.loadContent = function () {

                //load customized content
			    if (options.useCustomizeContent) {
			        fulloverlay.injectContent(options.customizedContent);
			    }
                //load content from url
			    else {
			        $.ajax({
			            url: url,
			            success: function (data) {
			                fulloverlay.injectContent(data);
			            },
			            error: function () {
			                fulloverlay.loadError();
			            }
			        });
			    }
			};
			
			fulloverlay.injectContent = function(data){
			
				overlayContainer.imagesLoaded(function(){
					overlayContentBody.html(data);
				});
				
				overlayContainer.html(overlayContent);
				overlayContent.show();
				
				fulloverlay.eventsRegister();

				if (Modernizr.touch) {
				    var topControlHeight = $(".top-close", overlayContent).outerHeight();
				    var bodyHeight = $(".content", overlayContent).outerHeight();
				    var bottomControlHeight = $(".controls", overlayContent).outerHeight();
				    overlayContent.css("height", topControlHeight + bodyHeight + bottomControlHeight + 80 + 'px');
				}
				
			};
			
			fulloverlay.eventsRegister = function(){

				overlayContainer.on("click", function(){
					fulloverlay.unloadOverlay();
				}).children().on("click", function(e){
					e.stopPropagation();
					// e.preventDefault();
					// return false;
				});



				$(".close",overlayContainer).on("click", function(e){
					fulloverlay.unloadOverlay();
					e.preventDefault();
					return false;
				});

				$(".backToTop",overlayContainer).on("click", function(e){
					overlayContainer.animate({
						scrollTop: 0
					});
					e.preventDefault();
					return false;
				});

				// callback 
				if ($.isFunction(options.complete)){
					options.complete.call(this);
				}

				/* Overlay banner - hotspots/video/slider */
				if ($(".banner", overlayContainer).length > 0){
					var id = $(".banner", overlayContainer).attr("id");
					
					switch (id){
						case "hotspots":
							fulloverlay.hotspots()
							break;
						case "video":
							fulloverlay.video()
							break;
						case "slider":
							fulloverlay.slider()
							break;
					}

				}
				
			};
			
			fulloverlay.unloadOverlay = function(){
			    if (typeof jwplayer != "undefined" && $(".banner", overlayContainer).attr("id") === "video") {
					jwplayer().stop(); 
				}

				

				$("body").removeClass("noscroll");
				overlayContainer.fadeOut('800');
				overlayContainer.remove();

				if (Modernizr.history){

					history.replaceState(null,options.overlayId,"");
					history.back();
				}
				else {
					window.location.hash = 'nooverlay';
					$.bbq.removeState(options.overlayId);
				}

			};

			fulloverlay.removeOverlay = function(){
				overlayContainer.remove();
				$("body").removeClass("noscroll");
				$.bbq.removeState(options.overlayId);
			};
			
			fulloverlay.loadError = function(){
				
				overlayContainer = $(".overlay-wrap");
				overlayContainer.html(markup.clone());
				$("body").addClass("noscroll");
				fulloverlay.eventsRegister();
			};

			/* Bind banner contents events */
			fulloverlay.hotspots = function(){
				var spots = $(".hotspots", overlayContainer),
					data = $("#hotspots-data").embeddedData();

					$("#hotspots-template").tmpl(data).appendTo(spots);
					var spot = $(".spot .outer",spots);
					
					spot.hover(function(){
						var that = $(this),
							container = that.parent(),
							detail = that.next(".detail");
						container.siblings().removeClass("active");
						container.toggleClass("active");
						
					});

				
			};

			/* Banner video */
			fulloverlay.video = function(){
				var videoConfig = $(".banner .video-config",overlayContainer).embeddedData();
				ND.video.init(videoConfig);
			};

			/* Banner slider */
			fulloverlay.slider = function(){
				
				var slider = $(".banner-slider",overlayContainer);
				slider.bxSlider({
					mode: 'fade'
				});
				
				/* bind image carousal to careers overlay*/
				if($("body").hasClass("careers")){
					ND.rotatingBanner(".careers .overlay-wrap .bxslider",{
						controls: false,
						auto: true,
						pause : 6000,
						autoHover : true
					});
				}
			};

			
		};

		
		
		var appendOverlay = function(element){
		    var overlay = new fullOverlay(element);		    
		    overlay.init();
		};
		
		this.click(function(e){
			if (e.which == 1 || e.which == 0){
				appendOverlay($(this));
				e.preventDefault();
			}
			
			return false;
		});

		

	};
	

}(jQuery));
