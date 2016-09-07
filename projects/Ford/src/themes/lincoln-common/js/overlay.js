(function($, undefined){
	
	/*
	 * Overlay URL. This reproduces the URL that Facebook URL Linter creates.
	 * eg. http://developers.facebook.com/tools/lint/?url=http%3A%2F%2Fwww.ford.com.au%2Fservlet%2FSatellite%3Fc%3DDFYPage%26cid%3D1248884660596%26pagename%3DFOA%252Fcontroller%26site%3DFOA%23overlay%3D1234567890BD
	 */
	function overlayURL( url, assetid ) {
		url = url || "";
		return escape(url.split('#')[0] + '#overlay=' + assetid).replace("\/", "%2F", "g")			
	}
	
	/*
	 * Overlay Object.
	 */
	var Overlay = function (list, text, rtl) {
		var overlay = this,
			positionNameXaxis = rtl ? 'left' : 'right',
			cacheStore = {};
			cacheStore.identifier = [];//to store the class name of those 360 images which have been already loaded
		
		overlay.container;
		overlay.text = text || {close: "Close",of: "of",prev: "Previous",next: "Next",loading: "Loading Content...",error: "There seems to be a problem."};
		overlay.list = list;
		overlay.fadeSpeed = 200;
		overlay.timeout = 8000;
		overlay.view360Class = "view-360";
		overlay.lightClass = "overlay-light";
		overlay.disclaimerClass = "external-disclaimer";
		
		overlay.init = function (curElem) {
			overlay.prepareBannerModes(curElem);			
			overlay.injectContainer();
			overlay.injectControls();
			overlay.registerLiveEvents();
		};
		
		//** INIT FUNCTIONS
		
		// unload Overlay
		overlay.unloadOverlayMask = function(){// remove mask and hide overlay
			var overlayContainer = $(".overlay-wrap");
			$("body").removeClass("noscroll");
			overlay.hide();
			overlayContainer.fadeOut('800');
			overlayContainer.remove();
		}
		overlay.loadOverlayMask = function(){
			$("body").append('<div class="overlay-wrap"></div>');
			$(".overlay-wrap").click(function(){//trigger when click on mask
				overlay.unloadOverlayMask(this);
			})
		}
		//INIT: Events register once
		overlay.registerLiveEvents = function () {
			$(".close-button A, .close-overlay", overlay.container).live("click", function () {
				overlay.hide();
				overlay.unloadOverlayMask();
				
				$(".overlayblackbg").remove();
				addedBlackbg=false;
				if (overlay.asset != null){
					$.bbq.removeState("overlay");
				}
				
				if($("#overlay").hasClass("syncsltoverlay")==true){
					
					$("#overlay").removeClass("syncsltoverlay");
					
				}
				$.publish('overlay.usercancel');	
				return false;
			});
			
			$(".controls .previous:not(.disabled)", overlay.container).live("click", function () {
				var prevPage = overlay.currentPage * 1 - 1;
				overlay.moveTo(prevPage);
				$.publish('overlay.userprevious');
				return false;
			});
			
			$(".controls .next:not(.disabled)", overlay.container).live("click", function () {
				var prevPage = overlay.currentPage * 1 + 1;
				overlay.moveTo(prevPage);
				$.publish('overlay.usernext');
				return false;
			});
			
			
			$(".click-out A", overlay.container).live("click", function () {
				overlay.hide();
			});			
			
			$(".controls .disabled", overlay.container).live("click", function () {
				return false;
			});
		};
		
		//INIT: Inject Overlay Base mark-up
		overlay.injectContainer = function () {
			var emptyDiv, loading,
			markup = {
				container: function () {
					return '<div id="overlay" class="overlay-box"></div>';
				},
				emptyDIV: function () {
					return '<div class="overlay-box-inner"></div>';
				},
				loading: function () {
					return '<div class="loading"><div class="image"></div><p>' + overlay.text.loading + '</p></div>';
				}
			};
			overlay.jcontainer = $(markup.container())
			overlay.container = overlay.jcontainer.get(0);
			emptyDiv = $(markup.emptyDIV());
			loading = $(markup.loading());
			
			overlay.innerWrapper = emptyDiv; 
			
			overlay.jcontainer.append(emptyDiv).append(loading);
			$("body").append(overlay.container);
		};	
		
		//INIT: Decypher if there is a banner
		overlay.setPositionMode = function(type) {
			overlay.modePosition =  type && overlay.positions[type] ? overlay.positions[type] : overlay.defaultPosition
		};
		
		//INIT: Decypher if there is a banner
		overlay.prepareBannerModes = function(curElem) {
			var jbanner = $('#banner'),
				jhero = $('.principal-hero'),
				offset = '',
				banner = false,
				positions = overlay.positions = {};

			
				
			if( (banner = jhero.size()) ) {
				offset = '0 30';
			} else if ( (banner = jbanner.size())) {
				offset = '0 -5';
			}
			
			//Open overlay in window mode if anchor has class centeroverlay
			if (curElem) {
				
				if (curElem.srcElement)  var currentClasses = curElem.srcElement.className;
 					else if (curElem.target) var currentClasses = curElem.target.className;

 				if (currentClasses.toLowerCase().indexOf("centeroverlay") >= 0)
					banner = false;
 			}			
				
			//C520 feature page, so overlay can open in window mode
			if ($('.featuregeneric .principal-hero').size() > 0)
				banner = false;
						
			positions.banner = {
				of: $('#body'),
				my: 'center bottom',
				at: 'center top',
				offset: offset, 
				collision: 'none',
				//Extra prop for overlay
				scrollTop:true
			};
			
			positions.window = {
				of: window,
				my: 'center',
				at: 'center',
				collision: 'none',
				using: function(hash){
					hash[positionNameXaxis] = (hash[positionNameXaxis] >= 0 ? hash[positionNameXaxis] : 0); 
					$(this).css(hash);
				}
			};

			// Current Position	& Default		   
			overlay.modePosition = overlay.defaultPosition = banner ? positions.banner : positions.window;
			
		};
		
		//INIT: Inject the close button and pagination
		overlay.injectControls = function () {
			var controls, closeButton, markup = {
					closeButton: function () {
						return '<div class="close-button"><span><a href="#">' + overlay.text.close + '</a></span></div>';
					},
					controls: function (item) {
						return '<div class="controls"><ul><li class="pagination"><p><span class="current">1</span> ' + overlay.text.of + ' <span class="total">1</span></p></li><li class="previous"><a href="#" title="' + overlay.text.prev + '">' + overlay.text.prev + '</a></li><li class="next"><a href="#" title="' + overlay.text.next + '">' + overlay.text.next + '</a></li></ul></div>';
					}
				};
			
				//The Close Button
				overlay.closeButton = $(markup.closeButton());

				//Hide Pagination for later showing
				controls = $(markup.controls()).hide();
				
				//Insert into the document
				overlay.jcontainer.append(overlay.closeButton).append(controls);
				
				//View Gallery Button
				if($(".view-gallery").length > 0){		
					var viewGalleryButton = $(".view-gallery").clone(false);	
					overlay.jcontainer.append(viewGalleryButton);
					viewGalleryButton.hide();
				}

				
				//
				if($("#overlay").parent().hasClass("lincoln")==true){
					ND.lincolnResetOl();
				}
				
				
		};
		
		// Push state to history (jQuery.bbq.js)
		overlay.pushState = function(){
			var state = {}, asset;
			
			if ($(overlay.anchor).attr("class")){
				asset = $(overlay.anchor).attr("class").match(/asset-\d+/);
			}
			
			if (asset != null){
				overlay.asset = asset;
				overlay.assetid = asset[0].substr(6);
				state["overlay"] = overlay.assetid;
				$.bbq.pushState(state);
			}
		};
		
		
		var socialCache = {};
		
		// Inject Facebook and Add This Button
		overlay.injectSocial = function(){
			
			var share = $("#overlay .share"),
				parent = share.parent(),
				template,
				render,
				done;
			
			//Fade In Social Widgets
			function doneFn() {
				if( !done ) {
					share.fadeIn(200);
					
					//Special initaliser code for add this.
					window.addthis && window.addthis.button( '.addthis-overlay');
					
					done = true;
				}
			}
			
			
			if( share.size() > 0 && overlay.assetid ) {
				
				if( socialCache[overlay.assetid] ) {
					
					share = socialCache[overlay.assetid];
					
				} else {
					
					//Remove it from the DOM
					share.remove();
					
					//Compile Template
					template = overlay.socialTemplate || (overlay.socialTemplate = $('#tmpl-overlay-share').template());
					
					//Render the Template
					render = $.tmpl(template, {replaceURL: overlayURL( window.location.href, overlay.assetid) });
					
					//using html as tmpl plugin is Beta. html will at least create new DOM elements
					share.html(render.html());
				}
					
				parent.prepend( share.hide() )
				
				//Once the facebook like iframe is loaded.. Fade all social widgets in.
				share.find('iframe').bind('load', doneFn);
				
				//Set a timeout incase the face book iframe takes too long.
				setTimeout(doneFn, 5e2);
				
				//Cache the share DOM element
				socialCache[overlay.assetid] = share;
			}
				
		};
		
		var vrCache = {};
		
		// Support VR in the overlay
		//@param cls, to calculate the given class height and adding to #overlay wrapper, useful for adding extra element in jQuery-reel 360 overlay
		overlay.enableVR = function (cls, _imagesData, visibleContainerIndex) {
			var vrContainer = overlay.jcontainer.find(".vr-container");
			
			var currentIndex = 0, nextIndex = 1;
			if (typeof (visibleContainerIndex) == 'number' && visibleContainerIndex > 0) {
			    currentIndex = 1;
			    nextIndex = 0;
			}
			

			var compareNames = [];
			var cacheData = []; // There appears to be a design flaw somehwere in this system.  I need to re-visit it later.
			
			// Set the overlay's position to absolute for this particular overlay, since we want it to stay in place
			// And I didn't want to change it in the CSS lest it break any other overlay functionality
			var _height=$("#overlay").height();
			if(typeof(cls)!="undefined"){
				_height=_height+$(cls).height();
			}
			$("#overlay").css({
				position:"absolute",
				height:_height+"px"
			});
			
			var pad = function(num, size) {
				    var s = num+"";
				    while (s.length < size) s = "0" + s;
				    return s;
				};
			
			
			
			vrContainer.each(function(index){
				var container = $(this);
				var vr = container.find('.vr'), data, images, imagesData;
				/**
				 * 
				 * JSON spec
				 * 
				 * {
				 * 	"name": "Focus",
				 * 	"vrImages": {
				 * 		"location": http://faptest.edgesuite.net/test-dir/360demo/C346/, // Forward-slash must be included at the end
				 * 	
				 * 	}
				 * }
				 * 
				 */
				// Useful data and images
				
				data = vr.length > 0 ? vr.parent().find(".vr-data").embeddedData() : 0;
				
				var banner = $("#img-banner");
				var colorName = banner.attr("data-color");
				if(banner.length>0&&colorName&&colorName.length>0){
					data.vrImages.filenamePrefix = colorName+"_FINAL_";
					data.vrImages.location = "http://apacvideo.ford.com.edgesuite.net/LCN2014/Desktop/nameplate/360colorizer/"+colorName+"/";
					banner.removeAttr("data-color");//reset attr "data-color"
				}
				
				imagesData = (data && 'vrImages' in data) ? data.vrImages : {};
				
				var _counter=0; //need to change back to 0 later
				if (typeof (_imagesData) != "undefined" && !ND.isEmptyObject(_imagesData) && index == currentIndex) {
					imagesData=_imagesData;
				}
				
				cacheData.push(data);

				// Cache vehicle data for toggle button
				
				overlay.jcontainer.data("cache", cacheData);
				
				// Set the initial image source, for great justice
				if (index === 0) {
					vr.attr("src", imagesData.location + imagesData.filenamePrefix + pad(_counter, imagesData.counterFormat.length) + "." + imagesData.extension)
				}
				
				// If the vr already exists then replace the placeholder with the existing vr.
				// Had to be moved due to automagic above being required and making this entirely ineffective in its old position :(
				/*
				if( vrCache[ vr.attr('src') ] ) {
									vr.replaceWith( vrCache[ vr.attr('src') ] );
									return;
								}*/
				
				
				// Populate the parent array of names with this one, too!  So that we may add them to our button.
				compareNames.push(data.name);
				vr.parent().data("name", data.name);
				
				// Create the overlay dynamically
				$("<span class='car-info'>"+data.name+"</span>").appendTo(container);
				
				images = [];
				for (var i=imagesData.start; i<=imagesData.end; i++){
					images.push(imagesData.location + imagesData.filenamePrefix + pad(i, imagesData.counterFormat.length) + "." + imagesData.extension);
				}
				if (images.length) {
					vr.reel({
						revolution: 500,
						frames: images.length,
						images: images
					}); 
				}
			})

			// VR Cursor
			$('.jquery-reel-interface').on('mousedown', function() {
				if (!$.support.optSelected) {
				    $(this).removeClass('reel-cursor').addClass('grab-cursor-ie');
				} else {
					$(this).addClass('grab-cursor');
				}
			});
			$('.jquery-reel-interface').on('mouseup', function() {
				if (!$.support.optSelected) {
					$(this).removeClass('grab-cursor-ie').addClass('reel-cursor');
				} else {
					$(this).removeClass('grab-cursor');
				}
			});

			// display directions  
			$('.reeldirections').fadeTo(1500, 0.7);

			if (typeof (visibleContainerIndex) == 'number' && visibleContainerIndex > 0) {
			    if ($(vrContainer[currentIndex]).length > 0) {
			        vrContainer.hide();
			        $(vrContainer[currentIndex]).css('display', 'block');
			    }
			}
	
			// Create the toggle button
			if (vrContainer.length > 1) {
				
				var currentElem = vrContainer.eq(currentIndex); // little bit hacky but that's ok
				var vrToggleButton = $("<button class='vr-toggle'>" + overlay.jcontainer.data("cache")[nextIndex].name + "</button>")
					.on("click", function(e){
						var elem = vrToggleButton;
						currentIndex++;
						nextIndex++;
						if (currentIndex >= vrContainer.length) currentIndex = 0;
						if (nextIndex >= vrContainer.length) nextIndex = 0;
						// Change the inner text of this button to correspond with the next car to be toggled.
						// Here comes a repetition of code
						elem.html(vrContainer.eq(nextIndex).find("span.car-info").html()); // Word Display should probably be left to the template for i18n considerations
						// This could probably be cleaned up a bit but it works right at this moment.
						currentElem.css("display", "none");
						// Switch to the next element
						currentElem = vrContainer.eq(currentIndex);
						
						currentElem.css("display", "block");
						
					})
					.appendTo(vrContainer);
			}

			overlay.moveToPosition();
		};
		
		// Save the VR from being trashed
		overlay.storeVR = function() {
			var vr = overlay.jcontainer.find('.vr')
			vrCache[ vr.attr('src') ] = vr;
			vr.detach();
		};
		
		//** EVENT FUNCTIONS
		
		//Reposition the overlay.. Especially on window resize.
		overlay.moveToPosition = function(){
			if (overlay.shown) {
				overlay.jcontainer.position(overlay.modePosition);
				if($("#overlay").position().top<0){
					
					$("#overlay").css("top", "0");
					
				}
				// fixing ipad position issue
				if ( /iPhone|iPad|iPod/.test( navigator.platform ) ) {
					overlay.jcontainer.css("left", "10px");
				}
			}
			
		};
			
		/*
		 * Load the URL.. delegates to 
		 * 	.loadContent() or .loadDisclaimerContent()
		 */
		overlay.load = function (anchor, type, url, options) {
			if($(".overlay-wrap").length==0){
				overlay.loadOverlayMask();
			}
			options = options || {};
			
			//Patch for analytics
			overlay.namedTitle = options.name || "";
			
			//Protect Repeat calls. This will fix the issue of Two ajax calles that occurs when the hash change event
			//calls the overlay to load again. We can fix this by checking that the overlay is already in the same State
			//that the repeat call is asking of it. Why send open and send an Ajax call when the overlay is already open
			//on the same URL and same <a> tag.
			if( overlay.shown ) {
				if( anchor !== null && typeof anchor !== 'undefined' && overlay.anchor === anchor ) { return ; }
				if( (anchor === null || typeof anchor === 'undefined') && overlay.contentUrl === url ) { return ; }
			}
			
			//Try to prevent too much flash execution.
			if( overlay.flashLoadTimer ) {
				clearTimeout( overlay.flashLoadTimer );								
			} 

			// Support disabling the clsoe button for SYNC
			overlay.closeButtonEnabled = (typeof options.disableClose === 'undefined') || !options.disableClose
			
			// Optionsl position Type
			overlay.setPositionMode(options.positionType);				
			
			// Scroll up to the top of the page
			if (overlay.modePosition.scrollTop) {
				$('html, body').animate({scrollTop:0}, 'fast');
			}
			
			// Store ref to the Anchor and a ref to the URL
			overlay.anchor = anchor;
			overlay.contentUrl = $(anchor).attr("href");

			// Support Hash Urls
			overlay.asset = ($(anchor).attr("class") || "").match(/asset-\d+/);
			if (overlay.asset != null){
				overlay.pushState(overlay.asset[0]);
			}

			// Clear settings
			overlay.resetType();

			// Config new settings
			if (type === "urlOnly") {
				overlay.contentUrl = url;
				overlay.loadContent( options.success );
			}
			else if (type === "disclaimer") {
				overlay.loadDisclaimerContent();
				overlay.updateClassDisclaimer();
			}
			else if (type === "overlay-sync"){
				overlay.contentUrl = url;
				$("#overlay").addClass("overlay-sync");
				overlay.loadContent( options.success );
				
			}
			else if(type==="syncoverlay5"){
				
				$("#overlay").addClass("syncsltoverlay");
			    if(addedBlackbg==false){
					
					var pheight=$(document).height(); 
					var pwidth=$(document).width(); 
					$("#overlay").before("<div class='overlayblackbg' style='height:"+pheight+"px;width:"+pwidth+"px;' ></div>");
					$("#overlay").addClass("syncsltoverlay");
					addedBlackbg=true;
				}
				
				overlay.contentUrl = url;
				overlay.loadContent();
				
			}else {
				overlay.loadContent();
				overlay.updateClassOnOverlay();
			}
			
			// Display the overlay on the screen of the user to see.
			overlay.show();			
			overlay.moveToPosition();
		};
		
		
		/* Flexible size of overlay
		 * This function was added very late in the game to try and ease the strict size of the overlay
		 */
		overlay.checkSize = function() {
			var padding = parseInt(overlay.innerWrapper.css('padding-left')) * 2,
				contents = overlay.innerWrapper.children().first(),
				width = contents.outerWidth(),
				height = contents.outerHeight();
			
			if($(".view-gallery").length > 0){
				height = height + 30;
				overlay.jcontainer.find(".secondary").css("min-height","385px");
			}
			overlay.previousWidth = overlay.jcontainer.css('width');
			overlay.previousHeight = overlay.jcontainer.css('height');
			overlay.jcontainer.css({'width':width + padding, 'height':height + padding});			
			overlay.moveToPosition();
			

		};
		
		/*
		 * Reset some CSS that is required for smooth functioning
		 */
		overlay.resetCSS = function() {
			
			overlay.jcontainer.css({
				'display':'block',
				'top':'',
				'left':'',
				'width':overlay.previousWidth,
				'height':overlay.previousHeight
			});
		};
		
		/*
		 * SHOW OVERLAY
		 */
		overlay.show = function (callback) {
			overlay.shown = overlay.shown || false;
			if (!overlay.shown) {
				overlay.shown = true;
				overlay.jcontainer.fadeIn(overlay.fadeSpeed, callback);
			}
			overlay.moveToPosition();			
			
		};

		/*
		 * HIDE OVERLAY
		 */		
		overlay.hide = function () {
			overlay.shown = false;
			overlay.updateClassnames("removeActive");
			
			overlay.storeVR();
			
			//Empty the contents of the overlay
			overlay.empty();
			
			//Hide Pagination
			overlay.jcontainer.find(".controls").hide();
			overlay.jcontainer.find(".view-gallery").hide();
			
			//Hide it will effect;
			overlay.jcontainer.fadeOut(overlay.fadeSpeed, function(){
				//Restore display block (must use Left)
				overlay.resetCSS();				
			})
			
		};
		
		
		/*
		 * EMPTY OVERLAY
		 * We do this so we can kill the flash.. Damn Flash!
		 */		
		overlay.empty = function () {
			
			//Kill that damned flash.
			overlay.jcontainer && overlay.jcontainer.find('.flash').killFlash();
			
			//Empty the contents of the overlay
			overlay.innerWrapper.empty();
		};
		
		/*
		 * When overlay is all done and loaded
		 */
		overlay.done = function() {
			$.publish('overlay.done', { contents: overlay.innerWrapper, assetid: overlay.assetid, name: overlay.namedTitle });
			// And yes, we're gonna call this here too, because I said so.  Rationality not included.  If symptoms persist, seek psychiatric attention.
			setTimeout(overlay.moveToPosition, 1000); // After one second, because this is still failing on silly old firefox.
		}
		
		//External Disclaimer Click Content
		overlay.loadDisclaimerContent = function () {
			var markup = {
				link: function (link) {
					return '<p class="click-out"><a href="' + link.href + '" title="' + link.text + " " + link.href + '" target="_blank">' + link.text + " " + link.href + '</a></p>';
				}
			}
			var link = {
				text: overlay.text.externalLink,
				href: overlay.contentUrl
			};
			var html = overlay.text.disclaimer;
			html = '<div class="ext-disc">' + html + markup.link(link) + "</div>";
			overlay.innerWrapper.html(html);
			overlay.checkSize();
			
		};
		
		
		//Fill the overlay with content
		//@param _activeElIdx, element index to add "touch-active" class for simulate hover state on ipad
		overlay.loadContent = function (successFn, _imagesData, _activeElIdx, visibleContainerIndex) {
			var jcontainer = overlay.jcontainer,
				overlayContentArea = overlay.innerWrapper,
				overlayLoading = $(".loading",jcontainer),
				success,
				noGutsNoGlory,
				pageEnabled = "pagination-enabled",
				counter=0;
			
			// Show or Hide the close button
			if( overlay.closeButtonEnabled ) {
				overlay.closeButton.show();
			} else {
				overlay.closeButton.hide();
			}
			
			jcontainer.addClass("loading");
			overlayLoading.children("P").text(overlay.text.loading);
			overlayLoading.children("DIV.image").show();
						
			//Had to group all these actions so that they could be executed a couple of times.
			noGutsNoGlory = function(fn) {
				overlay.empty();
				if(arguments.length > 0) {
					fn.apply(overlay);
				}
				overlay.updateClassnames();
				
				if (overlay.list.totalCount > 0) {
					jcontainer.addClass(pageEnabled);
					overlay.pagination();
				} else {
					jcontainer.removeClass(pageEnabled);
				}
				
				overlay.customScrollBar();
			}
			
			//Store timestamps so we can compare in the success
			var thisRequest = +new Date();
			overlay.activeRequest = thisRequest;
			//Ajax success
			success = function(data, status, xhr) {
				//If this callback is not the latest Overlay AJAX request, then cancel
				if( thisRequest !== overlay.activeRequest ) {
					return; 
				}
				
				noGutsNoGlory(function(){
					jcontainer.removeClass("loading");
					overlayContentArea.html(data);
					
					$('#overlay .color-picker > ul> li .color').on('click touchstart',function(e){//bind click event ,when click on specific color img, will get the value of attr "data-color" as the folder name
						e.preventDefault();
						var _currentEl = $(this);
						var _cls = _currentEl.children('a').attr('data-color');
						
						if(typeof(_cls)!== 'undefined'){
							var _folder = _currentEl.children('a').attr('data-color').split(' ')[0];
							var _location = "http://apacvideo.ford.com.edgesuite.net/LCN2014/Desktop/nameplate/360colorizer/"+_cls+"/";
							var _fileName = _cls+"_FINAL_";
							var _imagesData={
								location:_location,
								filenamePrefix:_fileName,
								counterFormat:"NN",
								extension:"jpg",
								start:0,
								end:35,
								folder:_folder
							}
							overlay.loadContent(null, _imagesData, _currentEl.closest("li").index(), _currentEl.closest(".vr-container").index());//pass active element index
						}
					})
					
					//Load flash in a timer so that it can be delayed and a little better managed.
					overlay.flashLoadTimer = setTimeout(function() {
						//If this callback is not the latest Overlay AJAX request, then cancel
						if( thisRequest !== overlay.activeRequest ) { return; }
						jcontainer.find('.flash').metaBasedFlash();
					}, 300);
					overlay.checkSize();
					overlay.injectSocial();
					overlay.enableVR("#overlay .color-picker", _imagesData, visibleContainerIndex);
					overlay.done();
					
					if(ND.isIpad()){//if ipad, add class "touch-active" to simulate hover state, auto remove after 5 seconds
						if(ND.isNumeric(_activeElIdx)){// if _activeElIdx is valid number
							var _currentList = $("#overlay .vr-container:visible .color-picker > ul> li:eq("+_activeElIdx+")");
							_currentList.addClass("active");
							setTimeout(function(){// auto remove the active state after 5 seconds
								if(_currentList.hasClass("active")){
									_currentList.removeClass("active");
								}
							},5000);
						}
					}else{//for desktop browsers, normal behaviours
						$("#overlay .vr-container .color-picker > ul> li").hover(function(){
							$(this).toggleClass("active");
						})
					}
				});
				if(_imagesData&&_imagesData.folder){//store success ajax call in , so that dont need to send ajax call again
					//cacheStore[overlay.contentUrl]=data;
					if(!cacheStore.identifier[0]){
						cacheStore.identifier.push({
							color:_imagesData.folder,
							overlayContentUrl:data
						});
					}else{
						var cacheStoreIdLength = cacheStore.identifier.length;
						for(var i=0;i<cacheStoreIdLength;i++){
							if(cacheStore.identifier[i].color==_imagesData.folder){
								counter=1;
								return;
							}
						}
						if(counter==0){
							cacheStore.identifier.push({
								color:_imagesData.folder,
								overlayContentUrl:data
							});
						}
					}
				}
				
				//Publish.
				$.publish('overlay.success');
				
				//Callback too
				if( successFn ) {
					successFn.call();
				}
				else {
					overlay.moveToPosition(); // Seriously, we have to call this everywhere now for some reason, as a failsafe measure.  Might as well be infinite looping.  *sigh*
				}
			};

			overlay.pushState();
			//Store the Response so that the next click doesn't return to the server
			/*if(cacheStore[overlay.contentUrl]) {
				success(cacheStore[overlay.contentUrl]);
				return;
			}*/
			var cacheStoreIdLength = cacheStore.identifier.length;
			for(var i=0;i<cacheStoreIdLength;i++){//stop duplicated ajax call if already called
				if(_imagesData&&_imagesData.folder&&cacheStore.identifier[i]&&cacheStore.identifier[i].color==_imagesData.folder){
					success(cacheStore.identifier[i].overlayContentUrl);
					return;
				}
			}
			
			//Clear the contents so that it is free of content if there is an error.
			noGutsNoGlory();
			$.ajax({
				url:overlay.contentUrl,
				//timeout:overlay.timeout,
				success: success,
				dataType:'html',
				error: function (request, error) {
					//Add the buttons in again... :S .
					noGutsNoGlory();
					overlayLoading.children("DIV.image").hide();
					overlayLoading.children("P").text(overlay.text.error);
					delete cacheStore.identifier;
					//delete cacheStore[overlay.contentUrl];		
				}
			});
			
			
		};
		
		/*
		 * Prefetch the URL and store it in cache
		 * Call this method in advance, if you want to avoid the user seeing the *Loading* Dialog
		 * This change was added for the SYNC USB transfer process which uses abuot 6 overlays in sequence.
		 */
		overlay.prefetch = function( url ) {
			
			// Check if already fetched
			if( cacheStore[url] ) { return; }
			
			// Fetch and store in the local cache store for Overlays.
			$.ajax({
				url: url,
				timeout: overlay.timeout,
				success: function(data) {
					cacheStore[ url ] = data;
				}
			});
		};
		
		/*
		 * Function to initalise of re-inialise the custom scrollbar within the overlay.
		 */
		overlay.customScrollBar = function() {
			//Scroll bars
			overlay.jcontainer
				.find('.secondary .body, .custom-scroll')
				.doOnce(function(){
					$(this)
						.jScrollPane({showArrows:false, scrollbarWidth: 13, scrollbarOnLeft:rtl});
				});
		};
		
		/*
		 * Function to initalise of re-inialise anything with the overlay that needs to be
		 */
		
		overlay.reinitalise = function() {
			overlay.customScrollBar();
		};
		$.subscribe('overlay.reinitalise', overlay.reinitalise );
		
		/*
		 * 	Modify classes for updateClassOnOverlay mode
		 */
		overlay.updateClassOnOverlay = function () {
			var link = $(overlay.anchor);
			overlay.jcontainer.toggleClass( overlay.view360Class, link.hasClass(overlay.view360Class) );
			overlay.jcontainer.toggleClass( overlay.lightClass, link.hasClass(overlay.lightClass) );
		};
		
		/*
		 * 	Modify classes for updateClassDisclaimer mode
		 */
		overlay.updateClassDisclaimer = function () {
			if ($(overlay.anchor).hasClass(overlay.disclaimerClass)) {
				overlay.jcontainer.addClass(overlay.disclaimerClass);
			}
			else {
				overlay.jcontainer.removeClass(overlay.disclaimerClass);
			}
		};

		/*
		 * It frustrates me that in order to support a different size overlay I need to modify the overlay script.
		 * Modify classes for updateClassDisclaimer mode
		 
		overlay.updateClassCalcPrice = function () {
			if ($(overlay.anchor).hasClass(overlay.disclaimerClass)) {
				overlay.jcontainer.addClass(overlay.disclaimerClass);
			}
			else {
				overlay.jcontainer.removeClass(overlay.disclaimerClass);
			}
		};*/
		
		overlay.resetType = function () {
			//Actions that must occur to reset the overlay every time it is shown.
			overlay.jcontainer.removeClass(overlay.lightClass);
			overlay.jcontainer.removeClass(overlay.view360Class);
			overlay.jcontainer.removeClass(overlay.disclaimerClass);			
		};
		
		overlay.updateClassnames = function (method) {
			if (overlay.anchor !== undefined) {
				var overlayType = ".overlay" + (overlay.listType() ? "-" + overlay.listType() : "");
				
				$(overlayType).closest(".item.active").removeClass("active");
				
				if (method !== "removeActive") {
					$(overlay.anchor).closest(".item").addClass("active");
				}
			}
		};
		

		
		overlay.listType = function () {
			var type;
			var classname = $(overlay.anchor).attr("class") || "";
			
			if (classname !== undefined) {
				if (classname.match(/overlay-group/) !== null) {
					var group = classname.match(/group[0-9]*/);
					type = group[0];
				}
				else {
					type = "";
				}

				return type;
			}
			
			return "";
			
		};
		
		overlay.pagination = function () {
			var type = overlay.listType();
			var innerChild = overlay.innerWrapper.children("div");
			var height = innerChild.outerHeight();
			if (type !== "") {
				overlay.updateCurrentPage = overlay.setPagination(overlay.list[type].count);
				overlay.updateCurrentPage(overlay.list[type].items[overlay.contentUrl].order);
				//to stop control displaying with loader
				if ((innerChild.length > 0) && (height > 100 )) {
					overlay.jcontainer.find(".controls").show();
					overlay.jcontainer.find(".view-gallery").show();
				}
				
			}
		};
		
		overlay.setPagination = function (total) {
			// Total
			$(".pagination .total", overlay.container).text(total);
			
			return function (current) {
				// Current
				overlay.currentPage = current;
				$(".pagination .current", overlay.container).text(current);
				overlay.disablePaginationButtons(current, total);				
			};
		};
		
		overlay.disablePaginationButtons = function (current, total) {
			if (current === 1) {
				$(".controls .previous", overlay.container).addClass("disabled");
			}
			else {
				$(".controls .previous", overlay.container).removeClass("disabled");
			}
			if(current === total) {
				$(".controls .next", overlay.container).addClass("disabled");
			}
			else {
				$(".controls .next", overlay.container).removeClass("disabled");
			}
		};
		
		overlay.moveTo = function (prevPage) {
			var type = overlay.listType();
			var items = overlay.list[type].items;
			var href, node;
			
			for (var item in items) {
				if (items[item]["order"] === prevPage) {
					node = items[item]["node"];
					href = items[item]["href"];
				}
			}
			
			overlay.anchor = node;
			overlay.contentUrl = href;
			
			overlay.asset = ($(overlay.anchor).attr("class") || "").match(/asset-\d+/);
			if (overlay.asset != null){
				overlay.pushState(overlay.asset[0]);
			}
			overlay.loadContent();
		};
		
		//redundant
		//overlay.wireEvents = function(){};
		
	};
	
	var populatePaginationList = function () {
		var list = {},
		totalCount = 0,
		count, i, max = 50;
		
		for (i = 1; i < max; i = i + 1) {
			
			if ($("A.overlay-group" + i).size() > 0) {
				count = 0;
				
				list["group"+i] = {};
				$("A.overlay-group" + i).each(function (j) {
					var node = this;
					var href = $(node).attr("href");
					if (href.indexOf("#") == 0){
						href = href.substr(1);
						
					}
					list["group"+i]["items"] = (j === 0) ? {} : list["group"+i]["items"];
					
					if (! list["group"+i]["items"][href]) {
						list["group"+i]["items"][href] = {
							href: href,
							node: node,
							order: count + 1
						};
						totalCount = totalCount + 1;
						count = count + 1;
					}
				});
				list["group"+i]["count"] = count;
				
			}
			else {
				break;
			}
		}
		list["totalCount"] = totalCount;
		
		return list;
	};
	
	
	var appendOverlay = function (curElem) {
		if ($("#overlay").size() === 0) {
			
			var textContainer = $("#javascript-text"),
				text = $(textContainer.html()),
				getText = function( key ) {
					return text.find("."+key).html();
				},				
				textVals = textContainer.size() ? {
					close: getText("close"),
					of: getText("of"),
					prev: getText("prev"),
					next: getText("next"),
					loading: getText("loading"),
					error: getText("error"),
					disclaimer: getText("disclaimer-text"),
					externalLink: getText("disclaimer-link")
				} : null;

			var overlay = new Overlay(populatePaginationList(), textVals, window.ND && ND.rtl);
			
			overlay.init(curElem);

			$(window).bind('resize', function(){
				overlay.moveToPosition();
			}).bind('scroll', function(){
				overlay.moveToPosition();
			});
			
			return overlay;
		}
	};
	
	// This function is called by child window to retrieve the current item information
	getCurrentItem = function(){
		var item = $("#overlay .controls .current").text();
		return item;
	};
	addedBlackbg=false;
	;
	
	$(function(){
		
		var overlay;
		
		$wait(function(){
		if ($("A.overlay, A.external-disclaimer,A.overlay-sync,A.overlay-light").size() > 0) {
				
			if(window.location.toString().indexOf("#overlay")!=-1){
				//overlay = overlay || appendOverlay();
				if ($("#overlay").size() === 0) {
				//console.log("append");
				overlay =  appendOverlay();
				}else{
				//console.log("overlay");	
				overlay =  overlay;
				}
			}	
			
				
			$("A.overlay").bind("click", function (e) {
				
				if ($("#overlay").size() === 0) {
				
				overlay =  appendOverlay(e);
				}else{
					
				overlay = overlay;
				}
			     
				

				//toggle the custom class of the container.
				var reg = /overlay-[^\s$]+/,
                    $this = $(this);
					$overlay = $("#overlay"),
					newClass = $this.attr("class").match(reg);
				if(newClass){
					oldClass = $overlay.attr("class").match(reg);
					oldClass && $overlay.removeClass(oldClass.join(' '));
					$overlay.addClass(newClass[0] + " overlay-box");
				}
				
				if($this.hasClass("blackbackground")){
					
					if(addedBlackbg==false){
					
					var pheight=$(document).height(); 
					var pwidth=$(document).width(); 
					$("#overlay").before("<div class='overlayblackbg' style='height:"+pheight+"px;width:"+pwidth+"px;' ></div>");
					$("#overlay").addClass("syncsltoverlay");
					addedBlackbg=true;
					}
				}
				

                //inject the custom contents if link contains data attributes that start with "tmpl-"
                var tmplData = $this.attr("data");
                if(tmplData && tmplData.indexOf("tmpl-") == 0){
                    overlay.load(null, "urlOnly", $this.attr("href"), {
                        success: function(){
                            var template = $('#' + tmplData).template();
                            $('#' + tmplData.substr(5)).append( $.tmpl( template ) );
                            //reset the scrollbar, since the content has been changed.
                            overlay.reinitalise();
                        }
                    });
                }else{
                    overlay.load(this);
                }

				e.preventDefault();
				e.stopPropagation();
				flag = true;
				return false;
			});
			
			
			$("A.overlay-light").bind("click", function (e) {
				
				if ($("#overlay").size() === 0) {
				
				overlay =  appendOverlay(e);
				}else{
					
				overlay =  overlay;
				}
				
				overlay.load(this);
				$("#overlay").addClass();
				e.preventDefault();
				e.stopPropagation();
				flag = true;
				return false;
			});
			
			$("A.external-disclaimer").live("click", function (e) {
				if ($("#overlay").size() === 0) {
				
				overlay =  appendOverlay(e);
				}else{
					
				overlay =  overlay;
				}
				var href = $(this).attr("href");
				overlay.load(this, "disclaimer")
				e.preventDefault();
				e.stopPropagation();
				return false;
			});
			
			$(".overlay-parent").bind("click", function (e) {
				if ($("#overlay").size() === 0) {
				
				overlay =  appendOverlay(e);
				}else{
					
				overlay =  overlay;
				}
				var link = $(this).find("A:eq(0)");
				if (link.size() > 0) {
					overlay.load(link);
				}
				e.preventDefault();
				e.stopPropagation();
				return false;
			});
			
			
			
			
		}})//end 
		
		//ND.API for Flash
		ND.API.launchOverlay = ND.launchOverlay = function(url, options) {
			overlay = overlay || appendOverlay();

			if(!options) options = {};
			var type = options.type || "urlOnly";

			if (url !== undefined) {
				
				overlay.load(null, type, url, options);
			}

			//implement custom class
			if(options.customClass){
				var reg = /overlay-[^\s$]+/,
					$overlay = $("#overlay"),
					oldClass = $overlay.attr("class").match(reg);
				oldClass && $overlay.removeClass(oldClass.join(' '));
				$overlay.addClass(options.customClass + " overlay-box");
			};
		};
		
		$.subscribe('overlay.launch', function(event, options){
			options && ND.launchOverlay(options.url, options);
		});
		
		
		$.subscribe('overlay.hide', function(event){	
			overlay && overlay.hide();
		});
		
		$.subscribe('overlay.prefetch', function(event, options){
			overlay = overlay || appendOverlay();
			overlay.prefetch( options.url );
		});
		
		ND.API.getOverlay = function(){
			overlay = overlay || appendOverlay();
			return 	overlay;
		};
		
		//Open the overlay if the id exists in URL
		$(window).bind('pageLoadedWithOverlay', function(e){
			if( overlay === undefined) { return;}
			
			var url;

			if( window.location.toString().indexOf("#") > 0 ) {
				
				url = $.bbq.getState("overlay") || "";
				//if( url && $("#overlay").is(':hidden')){
				if( url ){
					$('a[class*=' + url + ']').filter('.overlay').eq(0).trigger("click");
				}
			}

			if ( !url && overlay.shown ) {
				overlay.hide();
			}
		});
		$(window).trigger( 'pageLoadedWithOverlay' );
		
	});
	
})(jQuery);