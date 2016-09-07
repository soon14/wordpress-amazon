
/**
 * BxSlider v4.1 
 */

;(function($){

	var plugin = {};
	
	var defaults = {
		
		// GENERAL
		mode: 'horizontal',
		slideSelector: '',
		infiniteLoop: true,
		hideControlOnEnd: false,
		speed: 500,
		easing: null,
		slideMargin: 0,
		startSlide: 0,
		randomStart: false,
		captions: false,
		ticker: false,
		tickerHover: false,
		adaptiveHeight: false,
		adaptiveHeightSpeed: 500,
		video: false,
		useCSS: true,
		preloadImages: 'visible',

		// TOUCH
		touchEnabled: true,
		swipeThreshold: 50,
		oneToOneTouch: true,
		preventDefaultSwipeX: true,
		preventDefaultSwipeY: false,
		
		// PAGER
		pager: true,
		pagerType: 'full',
		pagerShortSeparator: ' / ',
		pagerSelector: null,
		buildPager: null,
		pagerCustom: null,
		
		// CONTROLS
		controls: true,
		nextText: 'Next',
		prevText: 'Prev',
		nextSelector: null,
		prevSelector: null,
		autoControls: false,
		startText: 'Start',
		stopText: 'Stop',
		autoControlsCombine: false,
		autoControlsSelector: null,
		
		// AUTO
		auto: false,
		pause: 4000,
		autoStart: true,
		autoDirection: 'next',
		autoHover: false,
		autoDelay: 0,
		
		// CAROUSEL
		minSlides: 1,
		maxSlides: 1,
		moveSlides: 0,
		slideWidth: 0,
		
		// CALLBACKS
		onSliderLoad: function() {},
		onSlideBefore: function() {},
		onSlideAfter: function() {},
		onSlideNext: function() {},
		onSlidePrev: function() {}
	}

	$.fn.bxSlider = function(options){
		
		if(this.length == 0) return;
		
		// support mutltiple elements
		if(this.length > 1){
			this.each(function(){$(this).bxSlider(options)});
			return this;
		}
		
		// create a namespace to be used throughout the plugin
		var slider = {};
		// set a reference to our slider element
		var el = this;
		plugin.el = this;

		/**
		 * Makes slideshow responsive
		 */
		// first get the original window dimens (thanks alot IE)
		var windowWidth = $(window).width();
		var windowHeight = $(window).height();

		
		
		/**
		 * ===================================================================================
		 * = PRIVATE FUNCTIONS
		 * ===================================================================================
		 */
		
		/**
		 * Initializes namespace settings to be used throughout plugin
		 */
		var init = function(){
			// merge user-supplied options with the defaults
			slider.settings = $.extend({}, defaults, options);
			// parse slideWidth setting
			slider.settings.slideWidth = parseInt(slider.settings.slideWidth);
			// store the original children
			slider.children = el.children(slider.settings.slideSelector);
			// check if actual number of slides is less than minSlides / maxSlides
			if(slider.children.length < slider.settings.minSlides) slider.settings.minSlides = slider.children.length;
			if(slider.children.length < slider.settings.maxSlides) slider.settings.maxSlides = slider.children.length;
			// if random start, set the startSlide setting to random number
			if(slider.settings.randomStart) slider.settings.startSlide = Math.floor(Math.random() * slider.children.length);
			// store active slide information
			slider.active = { index: slider.settings.startSlide }
			// store if the slider is in carousel mode (displaying / moving multiple slides)
			slider.carousel = slider.settings.minSlides > 1 || slider.settings.maxSlides > 1;
			// if carousel, force preloadImages = 'all'
			if(slider.carousel) slider.settings.preloadImages = 'all';
			// calculate the min / max width thresholds based on min / max number of slides
			// used to setup and update carousel slides dimensions
			slider.minThreshold = (slider.settings.minSlides * slider.settings.slideWidth) + ((slider.settings.minSlides - 1) * slider.settings.slideMargin);
			slider.maxThreshold = (slider.settings.maxSlides * slider.settings.slideWidth) + ((slider.settings.maxSlides - 1) * slider.settings.slideMargin);
			// store the current state of the slider (if currently animating, working is true)
			slider.working = false;
			// initialize the controls object
			slider.controls = {};
			// initialize an auto interval
			slider.interval = null;
			// determine which property to use for transitions
			slider.animProp = slider.settings.mode == 'vertical' ? 'top' : 'left';
			// determine if hardware acceleration can be used
			slider.usingCSS = slider.settings.useCSS && slider.settings.mode != 'fade' && (function(){
				// create our test div element
				var div = document.createElement('div');
				// css transition properties
				var props = ['WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
				// test for each property
				for(var i in props){
					if(div.style[props[i]] !== undefined){
						slider.cssPrefix = props[i].replace('Perspective', '').toLowerCase();
						slider.animProp = '-' + slider.cssPrefix + '-transform';
						return true;
					}
				}
				return false;
			}());
			// if vertical mode always make maxSlides and minSlides equal
			if(slider.settings.mode == 'vertical') slider.settings.maxSlides = slider.settings.minSlides;
			// perform all DOM / CSS modifications
			setup();
		}

		/**
		 * Performs all DOM and CSS modifications
		 */
		var setup = function(){
			// wrap el in a wrapper
			el.wrap('<div class="bx-wrapper"><div class="bx-viewport"></div></div>');
			// store a namspace reference to .bx-viewport
			slider.viewport = el.parent();
			// add a loading div to display while images are loading
			slider.loader = $('<div class="bx-loading" />');
			slider.viewport.prepend(slider.loader);
			// set el to a massive width, to hold any needed slides
			// also strip any margin and padding from el
			el.css({
				width: slider.settings.mode == 'horizontal' ? slider.children.length * 215 + '%' : 'auto',
				position: 'relative'
			});
			// if using CSS, add the easing property
			if(slider.usingCSS && slider.settings.easing){
				el.css('-' + slider.cssPrefix + '-transition-timing-function', slider.settings.easing);
			// if not using CSS and no easing value was supplied, use the default JS animation easing (swing)
			}else if(!slider.settings.easing){
				slider.settings.easing = 'swing';
			}
			var slidesShowing = getNumberSlidesShowing();
			// make modifications to the viewport (.bx-viewport)
			slider.viewport.css({
				width: '100%',
				overflow: 'hidden',
				position: 'relative'
			});
			slider.viewport.parent().css({
				maxWidth: getViewportMaxWidth()
			});
			// apply css to all slider children
			slider.children.css({
				'float': slider.settings.mode == 'horizontal' ? 'left' : 'none',
				listStyle: 'none',
				position: 'relative'
			});
			// apply the calculated width after the float is applied to prevent scrollbar interference
			slider.children.width(getSlideWidth());
			// if slideMargin is supplied, add the css
			if(slider.settings.mode == 'horizontal' && slider.settings.slideMargin > 0) slider.children.css('marginRight', slider.settings.slideMargin);
			if(slider.settings.mode == 'vertical' && slider.settings.slideMargin > 0) slider.children.css('marginBottom', slider.settings.slideMargin);
			// if "fade" mode, add positioning and z-index CSS
			if(slider.settings.mode == 'fade'){
				slider.children.css({
					position: 'absolute',
					zIndex: 0,
					display: 'none'
				});
				// prepare the z-index on the showing element
				slider.children.eq(slider.settings.startSlide).css({zIndex: 50, display: 'block'});
			}
			// create an element to contain all slider controls (pager, start / stop, etc)
			slider.controls.el = $('<div class="bx-controls" />');
			// if captions are requested, add them
			if(slider.settings.captions) appendCaptions();
			// if infinite loop, prepare additional slides
			if(slider.settings.infiniteLoop && slider.settings.mode != 'fade' && !slider.settings.ticker){
				var slice = slider.settings.mode == 'vertical' ? slider.settings.minSlides : slider.settings.maxSlides;
				var sliceAppend = slider.children.slice(0, slice).clone().addClass('bx-clone');
				var slicePrepend = slider.children.slice(-slice).clone().addClass('bx-clone');
				el.append(sliceAppend).prepend(slicePrepend);
			}
			// check if startSlide is last slide
			slider.active.last = slider.settings.startSlide == getPagerQty() - 1;
			// if video is true, set up the fitVids plugin
			if(slider.settings.video) el.fitVids();
			// set the default preload selector (visible)
			var preloadSelector = slider.children.eq(slider.settings.startSlide);
			if (slider.settings.preloadImages == "all") preloadSelector = el.children();
			// only check for control addition if not in "ticker" mode
			if(!slider.settings.ticker){
				// if pager is requested, add it
				if(slider.settings.pager) appendPager();
				// if controls are requested, add them
				if(slider.settings.controls) appendControls();
				// if auto is true, and auto controls are requested, add them
				if(slider.settings.auto && slider.settings.autoControls) appendControlsAuto();
				// if any control option is requested, add the controls wrapper
				if(slider.settings.controls || slider.settings.autoControls || slider.settings.pager) slider.viewport.after(slider.controls.el);
			}
			// preload all images, then perform final DOM / CSS modifications that depend on images being loaded
			preloadSelector.imagesLoaded(start);
		}

		/**
		 * Start the slider
		 */
		var start = function(){
			// remove the loading DOM element
			slider.loader.remove();
			// set the left / top position of "el"
			setSlidePosition();
			// if "vertical" mode, always use adaptiveHeight to prevent odd behavior
			if (slider.settings.mode == 'vertical') slider.settings.adaptiveHeight = true;
			// set the viewport height
			slider.viewport.height(getViewportHeight());
			// make sure everything is positioned just right (same as a window resize)
			el.redrawSlider();
			// onSliderLoad callback
			slider.settings.onSliderLoad(slider.active.index);
			// slider has been fully initialized
			slider.initialized = true;
			// bind the resize call to the window
			$(window).bind('resize', resizeWindow);
			// if auto is true, start the show
			if (slider.settings.auto && slider.settings.autoStart) initAuto();
			// if ticker is true, start the ticker
			if (slider.settings.ticker) initTicker();
			// if pager is requested, make the appropriate pager link active
			if (slider.settings.pager) updatePagerActive(slider.settings.startSlide);
			// check for any updates to the controls (like hideControlOnEnd updates)
			if (slider.settings.controls) updateDirectionControls();
			// if touchEnabled is true, setup the touch events
			if (slider.settings.touchEnabled && !slider.settings.ticker) initTouch();
		}
		
		/**
		 * Returns the calculated height of the viewport, used to determine either adaptiveHeight or the maxHeight value
		 */
		var getViewportHeight = function(){
			var height = 0;
			// first determine which children (slides) should be used in our height calculation
			var children = $();
			// if mode is not "vertical" and adaptiveHeight is false, include all children
			if(slider.settings.mode != 'vertical' && !slider.settings.adaptiveHeight){
				children = slider.children;
			}else{
				// if not carousel, return the single active child
				if(!slider.carousel){
					children = slider.children.eq(slider.active.index);
				// if carousel, return a slice of children
				}else{
					// get the individual slide index
					var currentIndex = slider.settings.moveSlides == 1 ? slider.active.index : slider.active.index * getMoveBy();
					// add the current slide to the children
					children = slider.children.eq(currentIndex);
					// cycle through the remaining "showing" slides
					for (i = 1; i <= slider.settings.maxSlides - 1; i++){
						// if looped back to the start
						if(currentIndex + i >= slider.children.length){
							children = children.add(slider.children.eq(i - 1));
						}else{
							children = children.add(slider.children.eq(currentIndex + i));
						}
					}
				}
			}
			// if "vertical" mode, calculate the sum of the heights of the children
			if(slider.settings.mode == 'vertical'){
				children.each(function(index) {
				  height += $(this).outerHeight();
				});
				// add user-supplied margins
				if(slider.settings.slideMargin > 0){
					height += slider.settings.slideMargin * (slider.settings.minSlides - 1);
				}
			// if not "vertical" mode, calculate the max height of the children
			}else{
				height = Math.max.apply(Math, children.map(function(){
					return $(this).outerHeight(false);
				}).get());
			}
			return height;
		}

		/**
		 * Returns the calculated width to be used for the outer wrapper / viewport
		 */
		var getViewportMaxWidth = function(){
			var width = '100%';
			if(slider.settings.slideWidth > 0){
				if(slider.settings.mode == 'horizontal'){
					width = (slider.settings.maxSlides * slider.settings.slideWidth) + ((slider.settings.maxSlides - 1) * slider.settings.slideMargin);
				}else{
					width = slider.settings.slideWidth;
				}
			}
			return width;
		}
		
		/**
		 * Returns the calculated width to be applied to each slide
		 */
		var getSlideWidth = function(){
			// start with any user-supplied slide width
			var newElWidth = slider.settings.slideWidth;
			// get the current viewport width
			var wrapWidth = slider.viewport.width();
			// if slide width was not supplied, or is larger than the viewport use the viewport width
			if(slider.settings.slideWidth == 0 ||
				(slider.settings.slideWidth > wrapWidth && !slider.carousel) ||
				slider.settings.mode == 'vertical'){
				newElWidth = wrapWidth;
			// if carousel, use the thresholds to determine the width
			}else if(slider.settings.maxSlides > 1 && slider.settings.mode == 'horizontal'){
				if(wrapWidth > slider.maxThreshold){
					// newElWidth = (wrapWidth - (slider.settings.slideMargin * (slider.settings.maxSlides - 1))) / slider.settings.maxSlides;
				}else if(wrapWidth < slider.minThreshold){
					newElWidth = (wrapWidth - (slider.settings.slideMargin * (slider.settings.minSlides - 1))) / slider.settings.minSlides;
				}
			}
			return newElWidth;
		}
		
		/**
		 * Returns the number of slides currently visible in the viewport (includes partially visible slides)
		 */
		var getNumberSlidesShowing = function(){
			var slidesShowing = 1;
			if(slider.settings.mode == 'horizontal' && slider.settings.slideWidth > 0){
				// if viewport is smaller than minThreshold, return minSlides
				if(slider.viewport.width() < slider.minThreshold){
					slidesShowing = slider.settings.minSlides;
				// if viewport is larger than minThreshold, return maxSlides
				}else if(slider.viewport.width() > slider.maxThreshold){
					slidesShowing = slider.settings.maxSlides;
				// if viewport is between min / max thresholds, divide viewport width by first child width
				}else{
					var childWidth = slider.children.first().width();
					slidesShowing = Math.floor(slider.viewport.width() / childWidth);
				}
			// if "vertical" mode, slides showing will always be minSlides
			}else if(slider.settings.mode == 'vertical'){
				slidesShowing = slider.settings.minSlides;
			}
			return slidesShowing;
		}
		
		/**
		 * Returns the number of pages (one full viewport of slides is one "page")
		 */
		var getPagerQty = function(){
			var pagerQty = 0;
			// if moveSlides is specified by the user
			if(slider.settings.moveSlides > 0){
				if(slider.settings.infiniteLoop){
					pagerQty = slider.children.length / getMoveBy();
				}else{
					// use a while loop to determine pages
					var breakPoint = 0;
					var counter = 0
					// when breakpoint goes above children length, counter is the number of pages
					while (breakPoint < slider.children.length){
						++pagerQty;
						breakPoint = counter + getNumberSlidesShowing();
						counter += slider.settings.moveSlides <= getNumberSlidesShowing() ? slider.settings.moveSlides : getNumberSlidesShowing();
					}
				}
			// if moveSlides is 0 (auto) divide children length by sides showing, then round up
			}else{
				pagerQty = Math.ceil(slider.children.length / getNumberSlidesShowing());
			}
			return pagerQty;
		}
		
		/**
		 * Returns the number of indivual slides by which to shift the slider
		 */
		var getMoveBy = function(){
			// if moveSlides was set by the user and moveSlides is less than number of slides showing
			if(slider.settings.moveSlides > 0 && slider.settings.moveSlides <= getNumberSlidesShowing()){
				return slider.settings.moveSlides;
			}
			// if moveSlides is 0 (auto)
			return getNumberSlidesShowing();
		}
		
		/**
		 * Sets the slider's (el) left or top position
		 */
		var setSlidePosition = function(){
			// if last slide, not infinite loop, and number of children is larger than specified maxSlides
			if(slider.children.length > slider.settings.maxSlides && slider.active.last && !slider.settings.infiniteLoop){
				if (slider.settings.mode == 'horizontal'){
					// get the last child's position
					var lastChild = slider.children.last();
					var position = lastChild.position();
					// set the left position
					setPositionProperty(-(position.left - (slider.viewport.width() - lastChild.width())), 'reset', 0);
				}else if(slider.settings.mode == 'vertical'){
					// get the last showing index's position
					var lastShowingIndex = slider.children.length - slider.settings.minSlides;
					var position = slider.children.eq(lastShowingIndex).position();
					// set the top position
					setPositionProperty(-position.top, 'reset', 0);
				}
			// if not last slide
			}else{
				// get the position of the first showing slide
				var position = slider.children.eq(slider.active.index * getMoveBy()).position();
				// check for last slide
				if (slider.active.index == getPagerQty() - 1) slider.active.last = true;
				// set the repective position
				if (position != undefined){
					if (slider.settings.mode == 'horizontal') setPositionProperty(-position.left, 'reset', 0);
					else if (slider.settings.mode == 'vertical') setPositionProperty(-position.top, 'reset', 0);
				}
			}
		}
		
		/**
		 * Sets the el's animating property position (which in turn will sometimes animate el).
		 * If using CSS, sets the transform property. If not using CSS, sets the top / left property.
		 *
		 * @param value (int) 
		 *  - the animating property's value
		 *
		 * @param type (string) 'slider', 'reset', 'ticker'
		 *  - the type of instance for which the function is being
		 *
		 * @param duration (int) 
		 *  - the amount of time (in ms) the transition should occupy
		 *
		 * @param params (array) optional
		 *  - an optional parameter containing any variables that need to be passed in
		 */
		var setPositionProperty = function(value, type, duration, params){
			// use CSS transform
			if(slider.usingCSS){
				// determine the translate3d value
				var propValue = slider.settings.mode == 'vertical' ? 'translate3d(0, ' + value + 'px, 0)' : 'translate3d(' + value + 'px, 0, 0)';
				// add the CSS transition-duration
				el.css('-' + slider.cssPrefix + '-transition-duration', duration / 1000 + 's');
				if(type == 'slide'){
					// set the property value
					el.css(slider.animProp, propValue);
					// turn off the slider working flag here, in case transitionEnd never gets called
                    slider.working = false;
					// bind a callback method - executes when CSS transition completes
					el.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(){
						// unbind the callback
						el.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
						updateAfterSlideTransition();
					});
				}else if(type == 'reset'){
					el.css(slider.animProp, propValue);
				}else if(type == 'ticker'){
					// make the transition use 'linear'
					el.css('-' + slider.cssPrefix + '-transition-timing-function', 'linear');
					el.css(slider.animProp, propValue);
					// bind a callback method - executes when CSS transition completes
					el.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(){
						// unbind the callback
						el.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
						// reset the position
						setPositionProperty(params['resetValue'], 'reset', 0);
						// start the loop again
						tickerLoop();
					});
				}
			// use JS animate
			}else{
				var animateObj = {};
				animateObj[slider.animProp] = value;
				if(type == 'slide'){
					el.animate(animateObj, duration, slider.settings.easing, function(){
						updateAfterSlideTransition();
					});
				}else if(type == 'reset'){
					el.css(slider.animProp, value)
				}else if(type == 'ticker'){
					el.animate(animateObj, speed, 'linear', function(){
						setPositionProperty(params['resetValue'], 'reset', 0);
						// run the recursive loop after animation
						tickerLoop();
					});
				}
			}
		}
		
		/**
		 * Populates the pager with proper amount of pages
		 */
		var populatePager = function(){
			var pagerHtml = '';
			pagerQty = getPagerQty();
			// loop through each pager item
			for(var i=0; i < pagerQty; i++){
				var linkContent = '';
				// if a buildPager function is supplied, use it to get pager link value, else use index + 1
				if(slider.settings.buildPager && $.isFunction(slider.settings.buildPager)){
					linkContent = slider.settings.buildPager(i);
					slider.pagerEl.addClass('bx-custom-pager');
				}else{
					linkContent = i + 1;
					slider.pagerEl.addClass('bx-default-pager');
				}
				// var linkContent = slider.settings.buildPager && $.isFunction(slider.settings.buildPager) ? slider.settings.buildPager(i) : i + 1;
				// add the markup to the string
				pagerHtml += '<div class="bx-pager-item"><a href="" data-slide-index="' + i + '" class="bx-pager-link">' + linkContent + '</a></div>';
			};
			// populate the pager element with pager links
			slider.pagerEl.html(pagerHtml);
		}
		
		/**
		 * Appends the pager to the controls element
		 */
		var appendPager = function(){
			if(!slider.settings.pagerCustom){
				// create the pager DOM element
				slider.pagerEl = $('<div class="bx-pager" />');
				// if a pager selector was supplied, populate it with the pager
				if(slider.settings.pagerSelector){
					$(slider.settings.pagerSelector).html(slider.pagerEl);
				// if no pager selector was supplied, add it after the wrapper
				}else{
					slider.controls.el.addClass('bx-has-pager').append(slider.pagerEl);
				}
				// populate the pager
				populatePager();
			}else{
				slider.pagerEl = $(slider.settings.pagerCustom);
			}
			// assign the pager click binding
			slider.pagerEl.delegate('a', 'click', clickPagerBind);
		}
		
		/**
		 * Appends prev / next controls to the controls element
		 */
		var appendControls = function(){
			slider.controls.next = $('<a class="bx-next" href="">' + slider.settings.nextText + '</a>');
			slider.controls.prev = $('<a class="bx-prev" href="">' + slider.settings.prevText + '</a>');
			// bind click actions to the controls
			slider.controls.next.bind('click', clickNextBind);
			slider.controls.prev.bind('click', clickPrevBind);
			// if nextSlector was supplied, populate it
			if(slider.settings.nextSelector){
				$(slider.settings.nextSelector).append(slider.controls.next);
			}
			// if prevSlector was supplied, populate it
			if(slider.settings.prevSelector){
				$(slider.settings.prevSelector).append(slider.controls.prev);
			}
			// if no custom selectors were supplied
			if(!slider.settings.nextSelector && !slider.settings.prevSelector){
				// add the controls to the DOM
				slider.controls.directionEl = $('<div class="bx-controls-direction" />');
				// add the control elements to the directionEl
				slider.controls.directionEl.append(slider.controls.prev).append(slider.controls.next);
				// slider.viewport.append(slider.controls.directionEl);
				slider.controls.el.addClass('bx-has-controls-direction').append(slider.controls.directionEl);
			}
		}
		
		/**
		 * Appends start / stop auto controls to the controls element
		 */
		var appendControlsAuto = function(){
			slider.controls.start = $('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + slider.settings.startText + '</a></div>');
			slider.controls.stop = $('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + slider.settings.stopText + '</a></div>');
			// add the controls to the DOM
			slider.controls.autoEl = $('<div class="bx-controls-auto" />');
			// bind click actions to the controls
			slider.controls.autoEl.delegate('.bx-start', 'click', clickStartBind);
			slider.controls.autoEl.delegate('.bx-stop', 'click', clickStopBind);
			// if autoControlsCombine, insert only the "start" control
			if(slider.settings.autoControlsCombine){
				slider.controls.autoEl.append(slider.controls.start);
			// if autoControlsCombine is false, insert both controls
			}else{
				slider.controls.autoEl.append(slider.controls.start).append(slider.controls.stop);
			}
			// if auto controls selector was supplied, populate it with the controls
			if(slider.settings.autoControlsSelector){
				$(slider.settings.autoControlsSelector).html(slider.controls.autoEl);
			// if auto controls selector was not supplied, add it after the wrapper
			}else{
				slider.controls.el.addClass('bx-has-controls-auto').append(slider.controls.autoEl);
			}
			// update the auto controls
			updateAutoControls(slider.settings.autoStart ? 'stop' : 'start');
		}
		
		/**
		 * Appends image captions to the DOM
		 */
		var appendCaptions = function(){
			// cycle through each child
			slider.children.each(function(index){
				// get the image title attribute
				var title = $(this).find('img:first').attr('title');
				// append the caption
				if (title != undefined) $(this).append('<div class="bx-caption"><span>' + title + '</span></div>');
			});
		}
		
		/**
		 * Click next binding
		 *
		 * @param e (event) 
		 *  - DOM event object
		 */
		var clickNextBind = function(e){
			// if auto show is running, stop it
			if (slider.settings.auto) el.stopAuto();
			el.goToNextSlide();
			e.preventDefault();
		}
		
		/**
		 * Click prev binding
		 *
		 * @param e (event) 
		 *  - DOM event object
		 */
		var clickPrevBind = function(e){
			// if auto show is running, stop it
			if (slider.settings.auto) el.stopAuto();
			el.goToPrevSlide();
			e.preventDefault();
		}
		
		/**
		 * Click start binding
		 *
		 * @param e (event) 
		 *  - DOM event object
		 */
		var clickStartBind = function(e){
			el.startAuto();
			e.preventDefault();
		}
		
		/**
		 * Click stop binding
		 *
		 * @param e (event) 
		 *  - DOM event object
		 */
		var clickStopBind = function(e){
			el.stopAuto();
			e.preventDefault();
		}

		/**
		 * Click pager binding
		 *
		 * @param e (event) 
		 *  - DOM event object
		 */
		var clickPagerBind = function(e){
			// if auto show is running, stop it
			if (slider.settings.auto) el.stopAuto();
			var pagerLink = $(e.currentTarget);
			var pagerIndex = parseInt(pagerLink.attr('data-slide-index'));
			// if clicked pager link is not active, continue with the goToSlide call
			if(pagerIndex != slider.active.index) el.goToSlide(pagerIndex);
			e.preventDefault();
		}
		
		/**
		 * Updates the pager links with an active class
		 *
		 * @param slideIndex (int) 
		 *  - index of slide to make active
		 */
		var updatePagerActive = function(slideIndex){
			// if "short" pager type
			if(slider.settings.pagerType == 'short'){
				slider.pagerEl.html((slideIndex + 1) + slider.settings.pagerShortSeparator + slider.children.length);
				return;
			}
			// remove all pager active classes
			slider.pagerEl.find('a').removeClass('active');
			// apply the active class for all pagers
			slider.pagerEl.each(function(i, el) { $(el).find('a').eq(slideIndex).addClass('active'); });
		}
		
		/**
		 * Performs needed actions after a slide transition
		 */
		var updateAfterSlideTransition = function(){
			// if infinte loop is true
			if(slider.settings.infiniteLoop){
				var position = '';
				// first slide
				if(slider.active.index == 0){
					// set the new position
					position = slider.children.eq(0).position();
				// carousel, last slide
				}else if(slider.active.index == getPagerQty() - 1 && slider.carousel){
					position = slider.children.eq((getPagerQty() - 1) * getMoveBy()).position();
				// last slide
				}else if(slider.active.index == slider.children.length - 1){
					position = slider.children.eq(slider.children.length - 1).position();
				}
				if (slider.settings.mode == 'horizontal') { setPositionProperty(-position.left, 'reset', 0);; }
				else if (slider.settings.mode == 'vertical') { setPositionProperty(-position.top, 'reset', 0);; }
			}
			// declare that the transition is complete
			slider.working = false;
			// onSlideAfter callback
			slider.settings.onSlideAfter(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
		}
		
		/**
		 * Updates the auto controls state (either active, or combined switch)
		 *
		 * @param state (string) "start", "stop"
		 *  - the new state of the auto show
		 */
		var updateAutoControls = function(state){
			// if autoControlsCombine is true, replace the current control with the new state 
			if(slider.settings.autoControlsCombine){
				slider.controls.autoEl.html(slider.controls[state]);
			// if autoControlsCombine is false, apply the "active" class to the appropriate control 
			}else{
				slider.controls.autoEl.find('a').removeClass('active');
				slider.controls.autoEl.find('a:not(.bx-' + state + ')').addClass('active');
			}
		}
		
		/**
		 * Updates the direction controls (checks if either should be hidden)
		 */
		var updateDirectionControls = function(){
			// if infiniteLoop is false and hideControlOnEnd is true
			if(!slider.settings.infiniteLoop && slider.settings.hideControlOnEnd){
				// if first slide
				if (slider.active.index == 0){
					slider.controls.prev.addClass('disabled');
					slider.controls.next.removeClass('disabled');
				// if last slide
				}else if(slider.active.index == getPagerQty() - 1){
					slider.controls.next.addClass('disabled');
					slider.controls.prev.removeClass('disabled');
				// if any slide in the middle
				}else{
					slider.controls.prev.removeClass('disabled');
					slider.controls.next.removeClass('disabled');
				}
			// if slider has only one page, disable controls
			}else if(getPagerQty() == 1){
				slider.controls.prev.addClass('disabled');
				slider.controls.next.addClass('disabled');
			}
		}
		
		/**
		 * Initialzes the auto process
		 */
		var initAuto = function(){
			// if autoDelay was supplied, launch the auto show using a setTimeout() call
			if(slider.settings.autoDelay > 0){
				var timeout = setTimeout(el.startAuto, slider.settings.autoDelay);
			// if autoDelay was not supplied, start the auto show normally
			}else{
				el.startAuto();
			}
			// if autoHover is requested
			if(slider.settings.autoHover){
				// on el hover
				el.hover(function(){
					// if the auto show is currently playing (has an active interval)
					if(slider.interval){
						// stop the auto show and pass true agument which will prevent control update
						el.stopAuto(true);
						// create a new autoPaused value which will be used by the relative "mouseout" event
						slider.autoPaused = true;
					}
				}, function(){
					// if the autoPaused value was created be the prior "mouseover" event
					if(slider.autoPaused){
						// start the auto show and pass true agument which will prevent control update
						el.startAuto(true);
						// reset the autoPaused value
						slider.autoPaused = null;
					}
				});
			}
		}
		
		/**
		 * Initialzes the ticker process
		 */
		var initTicker = function(){
			var startPosition = 0;
			// if autoDirection is "next", append a clone of the entire slider
			if(slider.settings.autoDirection == 'next'){
				el.append(slider.children.clone().addClass('bx-clone'));
			// if autoDirection is "prev", prepend a clone of the entire slider, and set the left position
			}else{
				el.prepend(slider.children.clone().addClass('bx-clone'));
				var position = slider.children.first().position();
				startPosition = slider.settings.mode == 'horizontal' ? -position.left : -position.top;
			}
			setPositionProperty(startPosition, 'reset', 0);
			// do not allow controls in ticker mode
			slider.settings.pager = false;
			slider.settings.controls = false;
			slider.settings.autoControls = false;
			// if autoHover is requested
			if(slider.settings.tickerHover && !slider.usingCSS){
				// on el hover
				slider.viewport.hover(function(){
					el.stop();
				}, function(){
					// calculate the total width of children (used to calculate the speed ratio)
					var totalDimens = 0;
					slider.children.each(function(index){
					  totalDimens += slider.settings.mode == 'horizontal' ? $(this).outerWidth(true) : $(this).outerHeight(true);
					});
					// calculate the speed ratio (used to determine the new speed to finish the paused animation)
					var ratio = slider.settings.speed / totalDimens;
					// determine which property to use
					var property = slider.settings.mode == 'horizontal' ? 'left' : 'top';
					// calculate the new speed
					var newSpeed = ratio * (totalDimens - (Math.abs(parseInt(el.css(property)))));
					tickerLoop(newSpeed);
				});
			}
			// start the ticker loop
			tickerLoop();
		}
		
		/**
		 * Runs a continuous loop, news ticker-style
		 */
		var tickerLoop = function(resumeSpeed){
			speed = resumeSpeed ? resumeSpeed : slider.settings.speed;
			var position = {left: 0, top: 0};
			var reset = {left: 0, top: 0};
			// if "next" animate left position to last child, then reset left to 0
			if(slider.settings.autoDirection == 'next'){
				position = el.find('.bx-clone').first().position();
			// if "prev" animate left position to 0, then reset left to first non-clone child
			}else{
				reset = slider.children.first().position();
			}
			var animateProperty = slider.settings.mode == 'horizontal' ? -position.left : -position.top;
			var resetValue = slider.settings.mode == 'horizontal' ? -reset.left : -reset.top;
			var params = {resetValue: resetValue};
			setPositionProperty(animateProperty, 'ticker', speed, params);
		}
		
		/**
		 * Initializes touch events
		 */
		var initTouch = function(){
			// initialize object to contain all touch values
			slider.touch = {
				start: {x: 0, y: 0},
				end: {x: 0, y: 0}
			}
			slider.viewport.bind('touchstart', onTouchStart);
		}
		
		/**
		 * Event handler for "touchstart"
		 *
		 * @param e (event) 
		 *  - DOM event object
		 */
		var onTouchStart = function(e){
			if(slider.working){
				e.preventDefault();
			}else{
				// record the original position when touch starts
				slider.touch.originalPos = el.position();
				var orig = e.originalEvent;
				// record the starting touch x, y coordinates
				slider.touch.start.x = orig.changedTouches[0].pageX;
				slider.touch.start.y = orig.changedTouches[0].pageY;
				// bind a "touchmove" event to the viewport
				slider.viewport.bind('touchmove', onTouchMove);
				// bind a "touchend" event to the viewport
				slider.viewport.bind('touchend', onTouchEnd);
			}
		}
		
		/**
		 * Event handler for "touchmove"
		 *
		 * @param e (event) 
		 *  - DOM event object
		 */
		var onTouchMove = function(e){
			var orig = e.originalEvent;
			// if scrolling on y axis, do not prevent default
			var xMovement = Math.abs(orig.changedTouches[0].pageX - slider.touch.start.x);
			var yMovement = Math.abs(orig.changedTouches[0].pageY - slider.touch.start.y);
			// x axis swipe
			if((xMovement * 3) > yMovement && slider.settings.preventDefaultSwipeX){
				e.preventDefault();
			// y axis swipe
			}else if((yMovement * 3) > xMovement && slider.settings.preventDefaultSwipeY){
				e.preventDefault();
			}
			if(slider.settings.mode != 'fade' && slider.settings.oneToOneTouch){
				var value = 0;
				// if horizontal, drag along x axis
				if(slider.settings.mode == 'horizontal'){
					var change = orig.changedTouches[0].pageX - slider.touch.start.x;
					value = slider.touch.originalPos.left + change;
				// if vertical, drag along y axis
				}else{
					var change = orig.changedTouches[0].pageY - slider.touch.start.y;
					value = slider.touch.originalPos.top + change;
				}
				setPositionProperty(value, 'reset', 0);
			}
		}
		
		/**
		 * Event handler for "touchend"
		 *
		 * @param e (event) 
		 *  - DOM event object
		 */
		var onTouchEnd = function(e){
			slider.viewport.unbind('touchmove', onTouchMove);
			var orig = e.originalEvent;
			var value = 0;
			// record end x, y positions
			slider.touch.end.x = orig.changedTouches[0].pageX;
			slider.touch.end.y = orig.changedTouches[0].pageY;
			// if fade mode, check if absolute x distance clears the threshold
			if(slider.settings.mode == 'fade'){
				var distance = Math.abs(slider.touch.start.x - slider.touch.end.x);
				if(distance >= slider.settings.swipeThreshold){
					slider.touch.start.x > slider.touch.end.x ? el.goToNextSlide() : el.goToPrevSlide();
					el.stopAuto();
				}
			// not fade mode
			}else{
				var distance = 0;
				// calculate distance and el's animate property
				if(slider.settings.mode == 'horizontal'){
					distance = slider.touch.end.x - slider.touch.start.x;
					value = slider.touch.originalPos.left;
				}else{
					distance = slider.touch.end.y - slider.touch.start.y;
					value = slider.touch.originalPos.top;
				}
				// if not infinite loop and first / last slide, do not attempt a slide transition
				if(!slider.settings.infiniteLoop && ((slider.active.index == 0 && distance > 0) || (slider.active.last && distance < 0))){
					setPositionProperty(value, 'reset', 200);
				}else{
					// check if distance clears threshold
					if(Math.abs(distance) >= slider.settings.swipeThreshold){
						distance < 0 ? el.goToNextSlide() : el.goToPrevSlide();
						el.stopAuto();
					}else{
						// el.animate(property, 200);
						setPositionProperty(value, 'reset', 200);
					}
				}
			}
			slider.viewport.unbind('touchend', onTouchEnd);
		}

		/**
		 * Window resize event callback
		 */
		var resizeWindow = function(e){
			// get the new window dimens (again, thank you IE)
			var windowWidthNew = $(window).width();
			var windowHeightNew = $(window).height();
			// make sure that it is a true window resize
			// *we must check this because our dinosaur friend IE fires a window resize event when certain DOM elements
			// are resized. Can you just die already?*
			if(windowWidth != windowWidthNew || windowHeight != windowHeightNew){
				// set the new window dimens
				windowWidth = windowWidthNew;
				windowHeight = windowHeightNew;
				// update all dynamic elements
				el.redrawSlider();
			}
		}
		
		/**
		 * ===================================================================================
		 * = PUBLIC FUNCTIONS
		 * ===================================================================================
		 */
		
		/**
		 * Performs slide transition to the specified slide
		 *
		 * @param slideIndex (int) 
		 *  - the destination slide's index (zero-based)
		 *
		 * @param direction (string) 
		 *  - INTERNAL USE ONLY - the direction of travel ("prev" / "next")
		 */
		el.goToSlide = function(slideIndex, direction){
			// if plugin is currently in motion, ignore request
			if(slider.working || slider.active.index == slideIndex) return;
			// declare that plugin is in motion
			slider.working = true;
			// store the old index
			slider.oldIndex = slider.active.index;
			// if slideIndex is less than zero, set active index to last child (this happens during infinite loop)
			if(slideIndex < 0){
				slider.active.index = getPagerQty() - 1;
			// if slideIndex is greater than children length, set active index to 0 (this happens during infinite loop)
			}else if(slideIndex >= getPagerQty()){
				slider.active.index = 0;
			// set active index to requested slide
			}else{
				slider.active.index = slideIndex;
			}
			// onSlideBefore, onSlideNext, onSlidePrev callbacks
			slider.settings.onSlideBefore(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
			if(direction == 'next'){
				slider.settings.onSlideNext(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
			}else if(direction == 'prev'){
				slider.settings.onSlidePrev(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
			}
			// check if last slide
			slider.active.last = slider.active.index >= getPagerQty() - 1;
			// update the pager with active class
			if(slider.settings.pager) updatePagerActive(slider.active.index);
			// // check for direction control update
			if(slider.settings.controls) updateDirectionControls();
			// if slider is set to mode: "fade"
			if(slider.settings.mode == 'fade'){
				// if adaptiveHeight is true and next height is different from current height, animate to the new height
				if(slider.settings.adaptiveHeight && slider.viewport.height() != getViewportHeight()){
					slider.viewport.animate({height: getViewportHeight()}, slider.settings.adaptiveHeightSpeed);
				}
				// fade out the visible child and reset its z-index value
				slider.children.filter(':visible').fadeOut(slider.settings.speed).css({zIndex: 0});
				// fade in the newly requested slide
				slider.children.eq(slider.active.index).css('zIndex', 51).fadeIn(slider.settings.speed, function(){
					$(this).css('zIndex', 50);
					updateAfterSlideTransition();
				});
			// slider mode is not "fade"
			}else{
				// if adaptiveHeight is true and next height is different from current height, animate to the new height
				if(slider.settings.adaptiveHeight && slider.viewport.height() != getViewportHeight()){
					slider.viewport.animate({height: getViewportHeight()}, slider.settings.adaptiveHeightSpeed);
				}
				var moveBy = 0;
				var position = {left: 0, top: 0};
				// if carousel and not infinite loop
				if(!slider.settings.infiniteLoop && slider.carousel && slider.active.last){
					if(slider.settings.mode == 'horizontal'){
						// get the last child position
						var lastChild = slider.children.eq(slider.children.length - 1);
						position = lastChild.position();
						// calculate the position of the last slide
						moveBy = slider.viewport.width() - lastChild.width();
					}else{
						// get last showing index position
						var lastShowingIndex = slider.children.length - slider.settings.minSlides;
						position = slider.children.eq(lastShowingIndex).position();
					}
					// horizontal carousel, going previous while on first slide (infiniteLoop mode)
				}else if(slider.carousel && slider.active.last && direction == 'prev'){
					// get the last child position
					var eq = slider.settings.moveSlides == 1 ? slider.settings.maxSlides - getMoveBy() : ((getPagerQty() - 1) * getMoveBy()) - (slider.children.length - slider.settings.maxSlides);
					var lastChild = el.children('.bx-clone').eq(eq);
					position = lastChild.position();
				// if infinite loop and "Next" is clicked on the last slide
				}else if(direction == 'next' && slider.active.index == 0){
					// get the last clone position
					position = el.find('.bx-clone').eq(slider.settings.maxSlides).position();
					slider.active.last = false;
				// normal non-zero requests
				}else if(slideIndex >= 0){
					var requestEl = slideIndex * getMoveBy();
					position = slider.children.eq(requestEl).position();
				}
				// plugin values to be animated
				var value = slider.settings.mode == 'horizontal' ? -(position.left - moveBy) : -position.top;
				setPositionProperty(value, 'slide', slider.settings.speed);
			}
		}
		
		/**
		 * Transitions to the next slide in the show
		 */
		el.goToNextSlide = function(){
			// if infiniteLoop is false and last page is showing, disregard call
			if (!slider.settings.infiniteLoop && slider.active.last) return;
			var pagerIndex = parseInt(slider.active.index) + 1;
			el.goToSlide(pagerIndex, 'next');
		}
		
		/**
		 * Transitions to the prev slide in the show
		 */
		el.goToPrevSlide = function(){
			// if infiniteLoop is false and last page is showing, disregard call
			if (!slider.settings.infiniteLoop && slider.active.index == 0) return;
			var pagerIndex = parseInt(slider.active.index) - 1;
			el.goToSlide(pagerIndex, 'prev');
		}
		
		/**
		 * Starts the auto show
		 *
		 * @param preventControlUpdate (boolean) 
		 *  - if true, auto controls state will not be updated
		 */
		el.startAuto = function(preventControlUpdate){
			// if an interval already exists, disregard call
			if(slider.interval) return;
			// create an interval
			slider.interval = setInterval(function(){
				slider.settings.autoDirection == 'next' ? el.goToNextSlide() : el.goToPrevSlide();
			}, slider.settings.pause);
			// if auto controls are displayed and preventControlUpdate is not true
			if (slider.settings.autoControls && preventControlUpdate != true) updateAutoControls('stop');
		}
		
		/**
		 * Stops the auto show
		 *
		 * @param preventControlUpdate (boolean) 
		 *  - if true, auto controls state will not be updated
		 */
		el.stopAuto = function(preventControlUpdate){
			// if no interval exists, disregard call
			if(!slider.interval) return;
			// clear the interval
			clearInterval(slider.interval);
			slider.interval = null;
			// if auto controls are displayed and preventControlUpdate is not true
			if (slider.settings.autoControls && preventControlUpdate != true) updateAutoControls('start');
		}
		
		/**
		 * Returns current slide index (zero-based)
		 */
		el.getCurrentSlide = function(){
			return slider.active.index;
		}
		
		/**
		 * Returns number of slides in show
		 */
		el.getSlideCount = function(){
			return slider.children.length;
		}

		/**
		 * Update all dynamic slider elements
		 */
		el.redrawSlider = function(){
			// resize all children in ratio to new screen size
			slider.children.add(el.find('.bx-clone')).width(getSlideWidth());
			// adjust the height
			slider.viewport.css('height', getViewportHeight());
			// update the slide position
			if(!slider.settings.ticker) setSlidePosition();
			// if active.last was true before the screen resize, we want
			// to keep it last no matter what screen size we end on
			if (slider.active.last) slider.active.index = getPagerQty() - 1;
			// if the active index (page) no longer exists due to the resize, simply set the index as last
			if (slider.active.index >= getPagerQty()) slider.active.last = true;
			// if a pager is being displayed and a custom pager is not being used, update it
			if(slider.settings.pager && !slider.settings.pagerCustom){
				populatePager();
				updatePagerActive(slider.active.index);
			}
		}

		/**
		 * Destroy the current instance of the slider (revert everything back to original state)
		 */
		el.destroySlider = function(){
			// don't do anything if slider has already been destroyed
			if(!slider.initialized) return;
			slider.initialized = false;
			$('.bx-clone', this).remove();
			slider.children.removeAttr('style');
			this.removeAttr('style').unwrap().unwrap();
			if(slider.controls.el) slider.controls.el.remove();
			if(slider.controls.next) slider.controls.next.remove();
			if(slider.controls.prev) slider.controls.prev.remove();
			if(slider.pagerEl) slider.pagerEl.remove();
			$('.bx-caption', this).remove();
			if(slider.controls.autoEl) slider.controls.autoEl.remove();
			clearInterval(slider.interval);
			$(window).unbind('resize', resizeWindow);
		}

		/**
		 * Reload the slider (revert all DOM changes, and re-initialize)
		 */
		el.reloadSlider = function(settings){
			if (settings != undefined) options = settings;
			el.destroySlider();
			init();
		}
		
		init();
		
		// returns the current jQuery object
		return this;
	}

})(jQuery);

/*!
 * jQuery imagesLoaded plugin v2.1.0
 * http://github.com/desandro/imagesloaded
 *
 * MIT License. by Paul Irish et al.
 */

/*jshint curly: true, eqeqeq: true, noempty: true, strict: true, undef: true, browser: true */
/*global jQuery: false */

(function(c,n){var l="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";c.fn.imagesLoaded=function(f){function m(){var b=c(i),a=c(h);d&&(h.length?d.reject(e,b,a):d.resolve(e));c.isFunction(f)&&f.call(g,e,b,a)}function j(b,a){b.src===l||-1!==c.inArray(b,k)||(k.push(b),a?h.push(b):i.push(b),c.data(b,"imagesLoaded",{isBroken:a,src:b.src}),o&&d.notifyWith(c(b),[a,e,c(i),c(h)]),e.length===k.length&&(setTimeout(m),e.unbind(".imagesLoaded")))}var g=this,d=c.isFunction(c.Deferred)?c.Deferred():
0,o=c.isFunction(d.notify),e=g.find("img").add(g.filter("img")),k=[],i=[],h=[];c.isPlainObject(f)&&c.each(f,function(b,a){if("callback"===b)f=a;else if(d)d[b](a)});e.length?e.bind("load.imagesLoaded error.imagesLoaded",function(b){j(b.target,"error"===b.type)}).each(function(b,a){var d=a.src,e=c.data(a,"imagesLoaded");if(e&&e.src===d)j(a,e.isBroken);else if(a.complete&&a.naturalWidth!==n)j(a,0===a.naturalWidth||0===a.naturalHeight);else if(a.readyState||a.complete)a.src=l,a.src=d}):m();return d?d.promise(g):
g}})(jQuery);


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


(function($){
	var syncselect={
			
		init:function(){
			var self = this;
			
			self.chooseSiteVersion();
		},
		overlayelm:"<div id='overlay-select'><div id='overlay-content'><div id='closebtn'><span>" + Translator.translate("AssetMg/Apa/Owner/Sync/Overlay/Close") + "</span></div>|</div></div>",
		chooseSiteVersion:function(){
			
			var self = this,
				syncData = $("#sync-data").embeddedData();
				
			
			if( syncData['xhr-sync-flag']=="sync5" ) {
				
				self.savecookie();
				self.poposync5overlay();
				self.synclinksguide();
				self.forceoverlaysync();
				self.checkOverlayDeepLink();

			}
		},
		poposync5overlay:function(){
			var self=this;
			if($("body").hasClass("popsyncselect")){
				self.popoverlay();
				$("body.popsyncselect").css({"height":window.screen.availHeight+"px"})
			}
		},
		setsync5versionCookie: function(value){
			////SYNC5
			$.cookie("sync5version",value);
			
		},
		 getParameterByName:function(name)
		{
		  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		  var regexS = "[\\?&]"+name+"=([^&#]*)",
		  regex = new RegExp( regexS ),
		  results = regex.exec( window.location.href );
		  
		  if( results == null )
		    return "";
		  else
		    return decodeURIComponent(results[1].replace(/\+/g, " "));
		}
		,
		getsync5versionCookie:function(){
			////SYNC5
			return $.cookie("sync5version");
		},
		savecookie:function(){
			////SYNC5
			var self = this,
			vs= self.getParameterByName("v");
			
			if(vs !=""){
			self.setsync5versionCookie(vs);
			}
			
		},
		removeOvelay:function(){
			var headdiv=$(".apa .page-heading");
			$("#rad-sync-overlay #overlay-select").remove();
			if(headdiv.size()){headdiv.show()};
			if($(".sync-select-version").size()>0){
				$(".sync-select-version").show();
			}
            //location hash
			var location = window.location.toString().substring(0, window.location.toString().indexOf('#'));
			if (Modernizr.history) {
			    history.pushState(null, "popsync", location);
			}
			else {
			    var state = {};
			    state["popsync"] = null;
			    $.bbq.pushState(state);
			}
		}
		,
		synclinksguide:function(){
			////SYNC5
			var self = this;
			
			$("#overlay-select #closebtn").live("click",function(){
				self.removeOvelay();
			})
			$("#overlay-select .header").live("click",function(){
				self.removeOvelay();
			})
			
			$(".overlay-sync").click(function( e ){
				
				
				var currentahref=$(this).attr("href"),
			    vsi= self.getParameterByName("v");
			    
			  
			    if($(this).hasClass("sync4")){
			    	
			    	e.preventDefault();	
			    }else{
			    	
			    if(vsi==""){
			    
			    	
			    	
			    if(self.getsync5versionCookie() !=null){
				
			    	
				    var currenthref;
				    
				    if(currentahref.indexOf("?") === -1){
				    
				    currenthref=currentahref+"?v="+	self.getsync5versionCookie();
				    
				    }else{
				    	
				     currenthref=currentahref+"&v="+	self.getsync5versionCookie();
				    }
				   
				    e.preventDefault();	
				    e.stopPropagation();
				    window.location.href = currenthref;
				    
				    
			     }else{
			    	 
				//Lanch overlay
				e.preventDefault();	
				e.stopPropagation();
				
			    self.popoverlay();
				//track sync5
			    if(!$(this).hasClass("trackable")){
			    	self.track(this);	
			    	}
			     }
			    	
			    	
			    }
			    }
			    
			})
		},
		track:function(){
			//sync5 omniture
		     $.publish('/analytics/link/', { 
					title: "owner support:sync:change sync version",
					link: this,
					type: "o",
					onclicks: "change sync version"
				});
			 // 
		},
		resizeItemwidth:function(){
			var vitem=$("#overlay-select #versionItem"),
				overlay=$("#rad-sync-overlay"),
				widp=(1/vitem.size()*100)+"%",
				infoPheight=0,
				h4height=0,
				h5height=0;
				
			if($("body").hasClass("smobile")==false){
				vitem.width(widp);
			}else{
				vitem.width("100%");
			}
			$.each(vitem,function(i){
				var eachPh=$("#info p",vitem.eq(i)).height();
				var eachh4=$("#info h4",vitem.eq(i)).height();
				var eachh5=$("#info h5",vitem.eq(i)).height();
				if(eachPh>infoPheight){
					infoPheight=eachPh;
				}
				if(eachh4>h4height){
					h4height=eachh4;
				}
				if(eachh5>h5height){
					h5height=eachh5;
				}
			})
			$("#info p",vitem).height(infoPheight);
			$("#info h4",vitem).height(h4height);
			$("#info h5",vitem).height(h5height);
		}
		,popoverlay: function( ) {

			var self = this,
			syncData = $("#sync-data").embeddedData(),
			forceoverlay=$(".sync-select-version"),
			overlaypanel=$("#rad-sync-overlay #overlay-select");
			
			if(forceoverlay.size()>0){
				forceoverlay.hide();
			}
			if(syncData['xhr-sync-close']){
				
				self.overlayelm=self.overlayelm.replace("%CLOSE",syncData['xhr-sync-close'])
			}else{
				
				self.overlayelm=self.overlayelm.replace("%CLOSE","CLOSE");
			}
			
			if( syncData['xhr-sync-overlay'] ) {
				
				//Launch overlay
				if(overlaypanel.size()==0){
					self.loadselect($("#rad-sync-overlay"),syncData['xhr-sync-overlay']);
				}
                //location hash
				var location = window.location.toString().substring(0, window.location.toString().indexOf('#'));
				if (Modernizr.history) {
				    history.pushState(null, "popsync", location);
				    history.pushState(null, "popsync", location + "#popsync=show");
				}
				else {
				    var state = {};
				    state["popsync"] = 'show';
				    $.bbq.pushState(state);
				}
		
			}
			
	
		},loadselect:function(brother,url,option){
			var self=this;
			
			$.get(url,function(data){
				var headdiv=$(".apa .page-heading");
				if(headdiv.size()){headdiv.hide()};
				brother.html(self.overlayelm.split("|")[0]+data+self.overlayelm.split("|")[1]);
				self.resizeItemwidth();
				$(window).resize(function(){
					self.resizeItemwidth();
				})
			})		
			
		}
		,forceoverlaysync:function(){
			////SYNC5
			var self = this;
			$("A.force-overlay-sync").bind("click",function(e){
				 e.preventDefault();
				 self.popoverlay();	
			})
		},
		checkOverlayDeepLink: function () {
		    var self = this;
		    if (window.location.hash.indexOf('popsync=show') >= 0) {
		        self.popoverlay();
		    }
		}
	};
	$(function(){
		
		syncselect.init();
	});
})(jQuery);


(function($){
	
	var sync={
		init:function(){
			var self=this;
			self.repaginationpd(".searchresults-list .pagination");
			self.syncinstruction();
			self.syncmultipleSlideModule();
			self.resaultEven();
			self.highlightSyncPage();
			//self.tabActivation();  //moved to app-link.js
		},
		
		repaginationpd:function(elm){
			var eul=$(elm),
			    liitem=$("li",eul),
				lisize=liitem.size(),
				firstwid=liitem.eq(0),
				lastwid=liitem.eq(lisize-1),
				totalwid=0,
				previtem=$("li.prev",eul),
				nextitem=$("li.next",eul);
			
			$.each(liitem,function(i){
				
					if((!liitem.eq(i).hasClass("prev")) && (!liitem.eq(i).hasClass("next"))){
						totalwid+=1;
					}
				})
			totalwid=totalwid*30+(previtem.outerWidth(true)*1.5)-18;
			if($('body').hasClass("rtl")){
				if(!$("form",firstwid).size()){
					firstwid.css({"margin-right":((eul.width()-totalwid)/2+"px")});
				}else{
					firstwid.css({"margin-left":((eul.width()-totalwid)/2+"px")});
				}
			} else {
				if(!$("form",firstwid).size()){
					firstwid.css({"margin-left":((eul.width()-totalwid)/2+"px")});
				}else{
					firstwid.css({"margin-right":((eul.width()-totalwid)/2+"px")});
				}
			}
			
			$(window).resize(function(){
				if($('body').hasClass("rtl")){
					if(!$("form",firstwid).size()){
						firstwid.css({"margin-right":((eul.width()-totalwid)/2+"px")});
					}else{
						firstwid.css({"margin-left":((eul.width()-totalwid)/2+"px")});
					}
				} else {
					if(!$("form",firstwid).size()){
						firstwid.css({"margin-left":((eul.width()-totalwid)/2+"px")});
					}else{
						firstwid.css({"margin-right":((eul.width()-totalwid)/2+"px")});
					}
				}
				

			})
		},syncinstruction:function(){
			var self=this;
			self.initsmobinstruction();
			$(window).resize(function(){
				self.initsmobinstruction();
				
			})
		},
		smobslidershow:false,
		smobsilder:{},
		removepagercss:function(){
			$("#instruction a.bx-next").removeClass("disabled");
			$("#instruction a.bx-prev").removeClass("disabled");
		}
		,initsmobinstruction:function(){
			var sliderul=$(".accordion-panel #instruction"),
			    sliderli=$("li",sliderul),
			    sliderlidiv=$(">div",sliderli),
			    imgdiv,
			    infodiv,
			    self=this,
			    imgslider,
			    isslider=false;
			if(!sliderul.size()) {return;}
			sync.isMobile = $("body").hasClass("smobile");
			sync.isDesktop = $("body").hasClass("desktop");   
			
			 
			if(self.isMobile==true){
				//switch elm sort
				$.each(sliderli,function(i){
					imgdiv=$("#img",sliderli.eq(i));
					infodiv=$("#info",sliderli.eq(i));
					imgdiv.before(infodiv);
				})
				
				if(self.smobslidershow==false){
					self.smobsilder = $("#instruction .bxslider").bxSlider({
						mode:"fade",
						pagerType:"short",
						adaptiveHeight: true,
						infiniteLoop:false,
						onSlideNext:function(){
							
							var curindex=parseInt(self.smobsilder.getCurrentSlide())+1;
							var totalnum=parseInt(self.smobsilder.getSlideCount());
							self.removepagercss();
							if(curindex==totalnum){
								$("#instruction a.bx-next").addClass("disabled");
							}
						},
						onSlidePrev:function(currentIndex){
							
							var curindex=parseInt(self.smobsilder.getCurrentSlide());
							self.removepagercss();
							if(curindex==0){
								$("#instruction a.bx-prev").addClass("disabled");
							}else{
								
							}
						},onSliderLoad:function(currentIndex){
							var curindex=parseInt(currentIndex);
							self.removepagercss();
							if(curindex==0){
								$("#instruction a.bx-prev").addClass("disabled");
							}
						}
						
					})
					self.smobslidershow=true;
				}
				
				
			}else{
				
				if(self.smobslidershow==true){
					
					self.smobsilder.destroySlider();
					self.smobslidershow=false;
				}
				$.each(sliderli,function(i){
					imgdiv=$("#img",sliderli.eq(i));
					infodiv=$("#info",sliderli.eq(i));
					infodiv.before(imgdiv);
				})
				
			}
		},syncmultipleSlideModule:function(){
			
			if(!$(".content-slider").size()) {return;}

			var pageSum = $("div.content-slider > UL > LI").size();

			$("div.content-slider > UL > LI").each(function(index,value){
				var index = index + 1;
				$(this).find("span.page-current").text(index);
				$(this).find("span.page-sum").text(" / " + pageSum);
			});

			$("div.content-slider > UL").bxSlider({
				mode:"fade",
				adaptiveHeight: false,
				onSliderLoad:function(){sync.reposcsldctr();},
				onSlideNext:function(){sync.reposcsldctr();},
				onSlidePrev:function(){sync.reposcsldctr();}
			});
			

		},reposcsldctr:function(){
			if(!$(".content-slider").size()) {return;}
			var cspager=$(".content-slider .bx-pager.bx-default-pager"),
				prenext=$(".content-slider .bx-wrapper .bx-controls-direction"),
				bximg=$(".content-slider .bx-wrapper .image"),
				bxtext=$(".content-slider .bx-wrapper .text"),
				bxsli=$(".content-slider .bx-wrapper .bx-viewport"),
				bxcontrols=$(".content-slider .bx-controls"),
				mheight=-(bxsli.height());
				bxcontrols.css({"top":mheight});
				prenext.css({"height":bxsli.height()});
				cspager.css({"height":bxsli.height()});
				$(window).resize(function(){
					mheight=-(bxsli.height());
					bxcontrols.css({"top":mheight});
					prenext.css({"height":bxsli.height()});
					cspager.css({"height":bxsli.height()});
				})
		},resaultEven:function(){
			/*var isIE8 = $.browser.msie && $.browser.version < 9;
			
			if(!isIE8) {return;}*/
			
			$("div.searchresults-list div.item:even").addClass("even");
		},highlightSyncPage:function(){
			if($("body").hasClass("highlightsync")){
				var syncspan="span.icon-talk",
					primaryli=$(".primary-nav li");
				$.each(primaryli,function(i){
					if($(syncspan,primaryli.eq(i)).size()>0){
						primaryli.eq(i).addClass("active");
					}
				})
				
			}
		}
	    ////activate current tab, show/hide related tab content         //moved to app-link.js
		//tabActivation : function() {
		//	if($(".appLink-content").length>0){//if appLink page
		//		var _tab = $(".appLink-content .tab-con");
		//		var _content =  $(".appLink-content .tab-content");
		//		_tab.on("click",function(){
		//			var _currentTab = $(this);
		//			if(!_currentTab.hasClass("current")){
		//				_tab.removeClass("current");//remove "current" state from tab field
		//				_content.children(".appLink-accordion-panel").removeClass("current");//remove "current" state to hide all the content
		//				_currentTab.addClass("current");//add "current" to clicked tab field
		//				_content.children(".appLink-accordion-panel:eq("+_currentTab.index()+")").addClass("current");//add "current" state to show related content
		//			}
		//		})
		//	}
		//}
	};
	$(function(){
		
		sync.init();
	});
})(jQuery);


/*
 To get the heightest col of the table, and set the height to all the cols
 * */
(function($,undefined){
	$(document).ready(function(){
		var _height=[];
		var max_height=[];
		if($(".owners-table").length>0){
				$(".owners-table .element-wrap").each(function(index) {//find table
				var row = $(this).find(".row");
				row.each(function(index){//find row
					var column = $(this).find(".columns");
					column.each(function(index){//find column
						_height.push($(this).outerHeight());
					});
					var max_height = Math.max.apply(Math,_height);
					column.each(function(index){
						$(this).css({
							height:max_height+"px"
						});//set max height to the column;
					});
					_height = []; //reset _height to empty array
				});
			});
		}
	});
})(jQuery);


/**
 Author: Doris
 Description:
 1. Fetch json data and render category list
 2. Bind overlay to element with class "fullscreen-overlay", update content in complete callback
 3. Tab pre-select. Detect device system (Android/iOS), using ND.detectDevice
 */

(function ($) {

    var appLink = {
        init: function () {
            if ($(".applink .accordion-panel .dropdown-content").length <= 0) { return; }
            appLink.appendApps();
            appLink.tabActivation();
        },

        appendApps: function () {

            var appLinkContent = $('.applink .accordion-panel .tab-content');

            // get category list for app
            appLink.fetchCategoryListByTab($('.appLink-accordion-panel.apple', appLinkContent), 'iOS');
            appLink.fetchCategoryListByTab($('.appLink-accordion-panel.android', appLinkContent), 'Android');

            appLink.preOpenOverlaybyURL();

        },

        preOpenOverlaybyURL: function () {
            var location = window.location.toString();
            var url = '';
            if (window.location.toString().indexOf('fullscreen-overlay') > -1) {
                url = location.substring(location.indexOf('fullscreen-overlay') + 'fullscreen-overlay'.length + 1);
            }
            else if (window.location.toString().indexOf('overlay') > -1) {
                url = location.substring(location.indexOf('overlay') + 'overlay'.length + 1);
            }
            if (url.length > 0) {
                if (Modernizr.history) {
                    history.pushState(null, "fullscreen-overlay", location.substring(0, location.indexOf('#')));
                    //history.replaceState(null, "fullscreen-overlay", "");
                    //history.back();
                    //history.replaceState(null, "fullscreen-overlay", location + "#fullscreen-overlay=" + param);
                }
                url = decodeURIComponent(decodeURIComponent(url));
                var appid = '', platform = '';
                $.each(url.split('&'), function (i, item) {
                    if (item.split('=')[0].toLowerCase() == 'appid') {
                        appid = item.split('=')[1];
                    }
                    else if (item.split('=')[0].toLowerCase() == 'platform') {
                        platform = item.split('=')[1];
                    }
                });
                if (appid.length > 0 && platform.length > 0) {
                    var clickELE = $("<a href='#' id='" + appid + "' class='fullscreen-overlay'></a>");
                    clickELE.id = appid;
                    clickELE.addClass('fullscreen-overlay');
                    clickELE.fullScreenOverlay({
                        useCustomizeContent: true,
                        customizedContent: "<span class='loading'></span>",
                        close: Translator.translate('AssetMg/Apa/Owner/Sync/Overlay/Close'),
                        backtotop: Translator.translate('AssetMg/BackToTop'),
                        complete: function () { appLink.updateAppDetailOverlay(clickELE, platform); }
                    });
                    clickELE[0].click();
                }
            }
        },

        fetchCategoryListByTab: function ($tab, platform) {
            var catListTemplate = $('#cat-list-template').html();
            var catListItemTemplate = $('#cat-list-item-template').html();
            $.template('catlist-template', catListTemplate);
            $.template('catlistitem-template', catListItemTemplate);
            $.template('noresult-msg-template', $('#app-list-noresult-message-template').html());

            //var appIcons = $("#applink-icon").embeddedData();

            var urlCategoryList = appLink.generateRequestURL('category/list', platform);
            //get category list
            $.ajax({
                type: 'GET',
                url: urlCategoryList,
                dataType: 'json',
                success: function (data) {
                    $tab.empty();
                    if (data.list.length == 0) {
                        $.tmpl('noresult-msg-template').appendTo($tab);
                        return;
                    }
                    var list = $('<ul></ul>');
                    $.each(data.list, function (i, item) {

                        var itembar = $('<li></li>');
                       
                        var iconURL = item.icon[0].imageLocation;
                        //if (appIcons[item.idCat]) {
                        //    iconURL = appIcons[item.idCat];
                        //}
                        //else if (appIcons['default']) {
                        //    iconURL = appIcons['default'];
                        //}
                        $.tmpl('catlist-template', { icon: iconURL, title: item.name, id: item.idCat }).appendTo(itembar);
                        list.append(itembar);

                        //dropdown event
                        $('.dropdown', itembar).hide();
                        $('li:eq(0)', list).addClass('active');
                        $('li:eq(0) .dropdown', list).show();
                        $('.tab-area', itembar).click(function () {
                            var $this = $(this);
                            if (!$this.parent("li").hasClass("active")) {
                                $this.next("div.dropdown").slideDown(200);
                                $this.parent("li").addClass("active");
                            } else {
                                $this.next("div.dropdown").slideUp(200);
                                $this.parent("li").removeClass("active");
                            }
                        });
                        
                        $('.tab-area', itembar).on('mouseover', function () {
                            $(this).addClass('hover');
                        });
                        $('.tab-area', itembar).on('mouseleave', function () {
                            $(this).removeClass('hover');
                        });
                    });

                    //get category detail
                    $('.dropdown', list).each(function (i, cat) {
                        var urlCategoryDetail = appLink.generateRequestURL('category/detail', platform, { catId: cat.id, maxResults: 20 });
                        $.ajax({
                            type: 'GET',
                            url: urlCategoryDetail,
                            dataType: 'json',
                            success: function (catdata) {
                                if (catdata.subCategories.length == 0) {
                                    var apps = [];
                                    $.each(catdata.applications, function (i, app) {
                                        $.each(app.appList, function (i, a) {
                                            apps.push(a);
                                        });
                                    });
                                    var appCount = apps.length;

                                    if (appCount > 0) {
                                        $(cat).empty();
                                        $(cat).append('<ul></ul>');
                                        var dropdown = $('ul', $(cat));
                                        $.each(apps, function (i, app) {
                                            var appItem = $('<li></li>');
                                            $.tmpl('catlistitem-template', { id: app.idApp, image: app.icon[0].imageLocation, name: app.name }).appendTo(appItem);
                                            dropdown.append(appItem);
                                        });

                                        $('span.count', $(cat).parent()).html('(' + appCount + ')');

                                        //overlay
                                        var markupData = null;
                                        $(".fullscreen-overlay", cat).each(function (i, app) {
                                            $(app).fullScreenOverlay({
                                                useCustomizeContent: true,
                                                customizedContent: "<span class='loading'></span>",
                                                close: Translator.translate('AssetMg/Apa/Owner/Sync/Overlay/Close'),
                                                backtotop: Translator.translate('AssetMg/BackToTop'),
                                                complete: function () { appLink.updateAppDetailOverlay(app, platform); }
                                            });
                                        });
                                    }
                                    else {
                                        //$.tmpl('noresult-msg-template').appendTo($(cat));
                                        $(cat).closest('li').hide();
                                    }
                                }
                                else {
                                    $(cat).closest('li').hide();
                                    $.each(catdata.subCategories, function (i, sub) {
                                        var urlSubCategoryDetail = appLink.generateRequestURL('category/detail', platform, { catId: sub.idCat, maxResults: 20 });
                                        $.ajax({
                                            type: 'GET',
                                            url: urlSubCategoryDetail,
                                            dataType: 'json',
                                            success: function (subdata) {
                                                var apps = [];
                                                $.each(subdata.applications, function (i, app) {
                                                    $.each(app.appList, function (i, a) {
                                                        apps.push(a);
                                                    });
                                                });
                                                if (apps.length > 0) {
                                                    if ($('ul', $(cat)).length == 0) {
                                                        $(cat).empty();
                                                        $(cat).append('<ul></ul>');
                                                    }
                                                    var dropdown = $('ul', $(cat));
                                                    $.each(apps, function (i, app) {
                                                        var appItem = $('<li></li>');
                                                        $.tmpl('catlistitem-template', { id: app.idApp, image: app.icon[0].imageLocation, name: app.name }).appendTo(appItem);
                                                        dropdown.append(appItem);
                                                        $('.fullscreen-overlay', appItem).fullScreenOverlay({
                                                            useCustomizeContent: true,
                                                            customizedContent: "<span class='loading'></span>",
                                                            close: Translator.translate('AssetMg/Apa/Owner/Sync/Overlay/Close'),
                                                            backtotop: Translator.translate('AssetMg/BackToTop'),
                                                            complete: function () { appLink.updateAppDetailOverlay($('.fullscreen-overlay', appItem)[0], platform); }
                                                        });
                                                    });
                                                    var appCount = $('ul li', $(cat)).length;
                                                    $('span.count', $(cat).parent()).html('(' + appCount + ')');
                                                    if (appCount > 0) {
                                                        $(cat).closest('li').show();
                                                    }
                                                }
                                            },
                                            error: function () {
                                                
                                            }
                                        });
                                    });
                                }
                            },
                            error: function () {
                                $.template('error-msg-template', $('#app-list-error-message-template').html());
                                $(cat).empty();
                                $.tmpl('error-msg-template').appendTo($(cat));
                            }
                        });
                    });

                    $tab.append(list);
                },
                error: function () {
                    $.template('error-msg-template', $('#app-list-error-message-template').html());
                    $tab.empty();
                    $.tmpl('error-msg-template').appendTo($tab);
                }
            });

        },

        updateAppDetailOverlay: function (item, platform) {
            $.template('app-detail-overlay-template', $('#app-detail-overlay-template').html());
            var container = $('.overlay-wrap > .overlay-content > .content');
            var appid = item.id;
            var urlApplicationDetail = appLink.generateRequestURL('application/detail', platform, { appId: appid });
            var appconfig = $("#applink-config").embeddedData();
            var markupData = {};
            $.ajax({
                type: 'GET',
                url: urlApplicationDetail,
                dataType: 'json',
                success: function (data) {
                    markupData.icon = data.iconLoResUrl;
                    markupData.appname = data.name;
                    markupData.version = data.versionName;
                    markupData.description = data.description80;
                    markupData.voice = new Array();
                    //markupData.voice = data.voiceCommand;
                    //$.each(markupData.voice, function (i, item) {
                    //    item.index = i + 1;
                    //});
                    $.each(data.voiceCommand, function (i, item) {
                        var isExist = false;
                        markupData.voice = $.map(markupData.voice, function (n,i) {
                            if (n.description === item.description) {
                                isExist = true;
                                if (item.type.toLowerCase() === 'manual') {
                                    n.manualCommand = item.title;
                                }
                                else if (item.type.toLowerCase() === 'voice') {
                                    n.voiceCommand = item.title;
                                }
                            }
                            return n;
                        });
                        if (!isExist) {
                            var com = {};
                            com.index = markupData.voice.length + 1;
                            com.description = item.description;
                            if (item.type.toLowerCase() === 'manual') {
                                com.voiceCommand = '/';
                                com.manualCommand = item.title;
                                markupData.voice.push(com);
                            }
                            else if (item.type.toLowerCase() === 'voice') {
                                com.voiceCommand = item.title;
                                com.manualCommand = '/';
                                markupData.voice.push(com);
                            }
                            
                        }
                    });

                    markupData.market = data.market;
                    if (appconfig[appid]) {
                        markupData.appspecific = appconfig[appid];
                    }
                    container.html($.tmpl('app-detail-overlay-template', markupData));

                    if (platform.toLowerCase() != 'ios') {
                        $('.applink-overlay .ios-only').hide();
                    }
                    else {
                        $('.applink-overlay .android-only').hide();
                    }

                    if (Modernizr.touch) {
                        var overlayContent = $('.overlay-wrap > .overlay-content');
                        var topControlHeight = $(".top-close", overlayContent).outerHeight();
                        var bodyHeight = $(".content", overlayContent).outerHeight();
                        var bottomControlHeight = $(".controls", overlayContent).outerHeight();
                        overlayContent.css("height", topControlHeight + bodyHeight + bottomControlHeight + 80 + 'px');
                    }

                    var location = window.location.toString().substring(0, window.location.toString().indexOf('#'));
                    var param = encodeURIComponent("appid=" + appid + "&platform=" + platform);
                    if (Modernizr.history) {
                        //history.pushState(null, "fullscreen-overlay", location);
                        //history.replaceState(null, "fullscreen-overlay", "");
                        //history.back();
                        history.replaceState(null, "fullscreen-overlay", location + "#fullscreen-overlay=" + param);
                    }
                    else {
                        var state = {};
                        state["fullscreen-overlay"] = param;
                        $.bbq.pushState(state);
                    }
                    
                },
                error: function () {
                    container.empty();
                    $.template('error-msg-template', $('#app-list-error-message-template').html());
                    $.tmpl('error-msg-template').appendTo(container);
                }
            });
        },

        // actionName: home | category/list | categroy/detail | application/detail
        // platform: Android | iOS
        // params: {catId, maxResults, appId, uid, timestamp}
        generateRequestURL:function(actionName,platform, params){
            var urlRequest = instance.serviceLocator('applink.request');
            var applinksArg = actionName + '?platform=' + platform;
            //country & locale
            var appconfig = $("#applink-config").embeddedData();
            applinksArg += "&country=" + appconfig['country-code'] + "&locale=" + appconfig['locale-code'];
            //transactionid
            applinksArg += "&transactionid=" + Math.floor(Math.random() * 10000000);            
            //other params
            if (params) {
                if (params.catId) {
                    applinksArg += "&idCat=" + params.catId;
                }
                if (params.maxResults) {
                    applinksArg += "&maxResults=" + params.maxResults;
                }
                if (params.appId) {
                    applinksArg += "&idApp=" + params.appId;
                }
            }
            //uid & timestamp
            //applinksArg += "&uid=abdshweodjskhfcneuwifw&timestamp=123912740932874";

            //just for test
            urlRequest = urlRequest.replace('{testpath}', actionName);
            //console.log("http://10.3.104.29/servlet/rest/tools/appcatalog?category={applinksarg}".replace('{applinksarg}', encodeURIComponent(applinksArg.toLowerCase())));

            return urlRequest.replace('{applinksarg}', encodeURIComponent(applinksArg.toLowerCase()));
        },

        //activate current tab, show/hide related tab content
        tabActivation: function () {
            var _tab = $(".applink .accordion-panel .tab-con");
            var _content = $(".applink .accordion-panel .tab-content");
            _tab.on("click", function () {
                var _currentTab = $(this);
                if (!_currentTab.hasClass("current")) {
                    _tab.removeClass("current");//remove "current" state from tab field
                    _content.children(".appLink-accordion-panel").removeClass("current");//remove "current" state to hide all the content
                    _currentTab.addClass("current");//add "current" to clicked tab field
                    _content.children(".appLink-accordion-panel:eq(" + _currentTab.index() + ")").addClass("current");//add "current" state to show related content
                }
            });
            appLink.tabPreSelect();
        },

        tabPreSelect: function () {
            if (ND.detectDevice.isIOS()) {
                $(".applink .accordion-panel .tab-nav .tab-con").removeClass('current');
                $(".applink .accordion-panel .tab-nav .tab-con.apple").addClass('current');
                $(".applink .accordion-panel .tab-content .appLink-accordion-panel").removeClass('current');
                $(".applink .accordion-panel .tab-content .appLink-accordion-panel.apple").addClass('current');
            }
            else if (ND.detectDevice.isAndroid()) {
                $(".applink .accordion-panel .tab-nav .tab-con").removeClass('current');
                $(".applink .accordion-panel .tab-nav .tab-con.android").addClass('current');
                $(".applink .accordion-panel .tab-content .appLink-accordion-panel").removeClass('current');
                $(".applink .accordion-panel .tab-content .appLink-accordion-panel.android").addClass('current');
            }
            else {
                $(".applink .accordion-panel .tab-nav .tab-con").removeClass('current');
                $(".applink .accordion-panel .tab-nav .tab-con:eq(0)").addClass('current');
                $(".applink .accordion-panel .tab-content .appLink-accordion-panel").removeClass('current');
                $(".applink .accordion-panel .tab-content .appLink-accordion-panel:eq(0)").addClass('current');
            }
        }

    };

    $(function () {
        appLink.init();
	})
}(jQuery));

