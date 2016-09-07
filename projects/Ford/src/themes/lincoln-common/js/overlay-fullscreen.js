/*
 * Author: Ruiwen Qin
 * This is fullscreen overlay plugin. By triggering this plugin, simply add 'fullscreen-overlay' class onto the element.
 */

( function($) {
		$.fn.fullScreenOverlay = function(options, callback) {
				var defaults = {
					overlayId : "fullscreen-overlay",
					openOverlay : false,
					close : 'CLOSE',
					backtotop : 'BACK TO TOP',
					control : true
				};

				var options = $.extend(defaults, options);

				var fullOverlay = function(element) {
					var fulloverlay = this, url, cid, overlayContainer, overlayContent, currentPosition, state = {}, scrolltop;

					// retrieve the texts for controls
					if ($("#overlay-controls").length > 0) {
						var controlTexts = $("#overlay-controls").embeddedData();
						if (!$.isEmptyObject(controlTexts)) {
							options.close = controlTexts.close;
							options.backtotop = controlTexts.backtotop;
						}
					}

					fulloverlay.init = function() {
						url = element.attr("href");
						cid = url.match(/cid=\d+/);
						if (Modernizr.history) {
							var index = window.location.toString().indexOf(options.overlayId);
							if (index < 0) {
								history.pushState(null, options.overlayId, location + "#" + options.overlayId + "=" + cid);
							}

						} else {
							state[options.overlayId] = cid.toString();
							//$.bbq.pushState(state);
						}
						fulloverlay.injectContainer();
						fulloverlay.injectControls();
						fulloverlay.loadContent();

					};

					fulloverlay.injectContainer = function() {
						var markup = '<div class="overlay-wrap"><span class="loader"></span></div>';
						$("body").addClass("noscroll");
						$("body").append(markup);
						overlayContainer = $(".overlay-wrap");

					};

					fulloverlay.injectControls = function() {
						var markup = {
							topCloseBtn : function() {
								return '<div class="top-close"><a class="close" href="#"><span>' + options.close + '</span></a></div>';
							},
							bottomControls : function() {
								return options.control == true ? '<div class="controls"><a href="#" class="backToTop">' + options.backtotop + '</a><a href="#" class="close">' + options.close + '</a></div>' : null;
							}
						}

						overlayContent = $('<div class="overlay-content"></div>').hide();
						overlayContent.prepend($(markup.topCloseBtn()));
						$(".top-close", overlayContent).after($('<div class="content"></div>'));
						overlayContent.append(markup.bottomControls());

						overlayContentBody = $(".content", overlayContent);

					};

					fulloverlay.loadContent = function() {
						$.ajax({
							url : url,
							success : function(data) {
								fulloverlay.injectContent(data);
							},
							error : function() {
								fulloverlay.loadError();
							}
						});
					};

					fulloverlay.injectContent = function(data) {
						overlayContainer.imagesLoaded(function() {
							overlayContentBody.html(data);
						});

						overlayContainer.html(overlayContent);
						overlayContent.show();

						fulloverlay.eventsRegister();

					};

					fulloverlay.eventsRegister = function() {

						overlayContainer.on("click", function() {
							fulloverlay.unloadOverlay();
						}).children().on("click", function(e) {
							e.stopPropagation();
							// e.preventDefault();
							// return false;
						});

						$(".close", overlayContainer).on("click", function(e) {
							fulloverlay.unloadOverlay();
							e.preventDefault();
							return false;
						});

						$(".backToTop", overlayContainer).on("click", function(e) {
							overlayContainer.animate({
								scrollTop : 0
							});
							e.preventDefault();
							return false;
						});
						
						if(ND.isIpad()){//only trigger under certain devices
							
							$(document).on("touchend",function(){
								$(".overlay-wrap .btn-wrapper.share-btn-wrapper.active").removeClass("active");//anything gets to document will remove all active states on certain element
							})
							
							/*
							* fixes share flyout contents cannot be closed on ipad
							*/
							$(".overlay-wrap .btn-wrapper.share-btn-wrapper").on("touchend",function(e){
								$(this).addClass("active");
								e.stopPropagation();//stop event bubbling to this event
							})
							
							$(".overlay-wrap .btn-wrapper.share-btn-wrapper > a").on("touchend",function(e){
								e.preventDefault();//prevent tag "a" default behaviour which jump to the top of the page
							})
							
						}else{//for desktop browsers, normal behaviours
							$(".overlay-wrap .btn-wrapper.share-btn-wrapper").hover(function(){
								$(this).toggleClass("active");
							})
						}
						
						/* Overlay banner - hotspots/video/slider */
						if ($(".banner", overlayContainer).length > 0) {
							var id = $(".banner", overlayContainer).attr("id");

							switch (id) {
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

					fulloverlay.unloadOverlay = function() {
						var _social = $(".jiathis_weixin_close");
						if ( typeof jwplayer != "undefined") {
							jwplayer().stop();
						}
						if(_social.length>0){//close weichat if already opened
							_social.trigger("click");
						}
						$("body").removeClass("noscroll");
						overlayContainer.fadeOut('800');
						overlayContainer.remove();

						if (Modernizr.history) {

							history.replaceState(null, options.overlayId, "");
							history.back();
						} else {
							window.location.hash = 'nooverlay';
							//$.bbq.removeState(options.overlayId);
						}

					};

					fulloverlay.removeOverlay = function() {
						overlayContainer.remove();
						$("body").removeClass("noscroll");
						//$.bbq.removeState(options.overlayId);
					};

					fulloverlay.loadError = function() {

						overlayContainer = $(".overlay-wrap");
						overlayContainer.html(markup.clone());
						$("body").addClass("noscroll");
						fulloverlay.eventsRegister();
					};

					/* Bind banner contents events */
					fulloverlay.hotspots = function() {
						var spots = $(".hotspots", overlayContainer), data = $("#hotspots-data").embeddedData();

						$("#hotspots-template").tmpl(data).appendTo(spots);
						var spot = $(".spot .outer", spots);

						spot.click(function() {
							var that = $(this), container = that.parent(), detail = that.next(".detail");
							container.siblings().removeClass("active");
							container.toggleClass("active");

						});

					};

					/* Banner video */
					fulloverlay.video = function() {
						var videoConfig = $(".banner .video-config", overlayContainer).embeddedData();
						ND.video.init(videoConfig);
					};

					/* Banner slider */
					fulloverlay.slider = function() {
						var el = ".overlay-hotspots .slideritemwrap";
						var index = 0;
						if ($(el).parents(".img-gallery").length != 0) {//only img-gallery need start from the current page
							index = fulloverlay.index;
						}
						if ($(el)) {
							ND.rotatingBanner().init(".overlay-hotspots .slideritemwrap", true, "short", index);
						}
					};

				};

				var appendOverlay = function(element) {
					var overlay = new fullOverlay(element);
					overlay.index = element.parent().index();
					overlay.init();
				};

				this.click(function(e) {

					if ($(".overlay-wrap").length == 0) {
						appendOverlay($(this));
					}
					e.preventDefault();
					return false;
				});

				// callback
				if ($.isFunction(callback)) {
					callback.call(this);
				}

			}
	}(jQuery));
