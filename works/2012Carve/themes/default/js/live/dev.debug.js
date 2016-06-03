/*!
 * Project Name: (Type Name Here)
 * File Build Date: Wed Aug 15 2012 10:02:02 GMT+0800 (CST)
 */
/* logging.js */
/*! logging.js version 1.0 */
/*jslint onevar: true, undef: true, eqeqeq: true, regexp: true, newcap: true, immed: true */
/*globals jQuery, console, window */
(function($){
	// make it safe to use console.log always
	(function(b){function c(){}for(var d="assert,clear,count,debug,dir,dirxml,error,exception,firebug,group,groupCollapsed,groupEnd,info,log,memoryProfile,memoryProfileEnd,profile,profileEnd,table,time,timeEnd,timeStamp,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try
	{console.log();return window.console;}catch(err){return window.console={};}})());
	
	$.fn.log = function (msg) {
		console.log("%s: %o", msg, this); 
		return this;
	};
}(jQuery));

/* jquery.overscroll.js */
/**
 * Overscroll v1.6.3
 *  A jQuery Plugin that emulates the iPhone scrolling experience in a browser.
 *  http://azoffdesign.com/overscroll
 *
 * Intended for use with the latest jQuery
 *  http://code.jquery.com/jquery-latest.js
 *
 * Copyright 2012, Jonathan Azoff
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *  http://jquery.org/license
 *
 * For API documentation, see the README file
 *  http://azof.fr/pYCzuM
 *
 * Date: Thursday, May 17th 2012
 */

/*jslint onevar: true, strict: true */

/*global window, document, setTimeout, clearTimeout, jQuery */

(function(global, dom, browser, math, wait, cancel, namespace, $, none){

    // We want to run this plug-in in strict-mode
    // so that we may benefit from any optimizations
    // strict execution
    'use strict';

    // The key used to bind-instance specific data to an object
    var datakey = 'overscroll',

    // runs feature detection for overscroll
    compat = (function(){
        var b  = $.browser, fallback,
        agent = browser.userAgent,
        style  = dom.createElement(datakey).style,
        prefix = b.webkit ? 'webkit' : (b.mozilla ? 'moz' : (b.msie ? 'ms' : (b.opera ? 'o' : ''))),
        cssprefix = prefix ? ['-','-'].join(prefix) : '';
        compat = { prefix: prefix, overflowScrolling: false };
        $.each(prefix ? [prefix, ''] : [prefix], function(i, prefix){
            var animator = prefix ? (prefix + 'RequestAnimationFrame') : 'requestAnimationFrame',
            scroller = prefix ? (prefix + 'OverflowScrolling') : 'overflowScrolling';

            // check to see if requestAnimationFrame is available
            if (global[animator] !== none) {
                compat.animate = function(callback){
                    global[animator].call(global, callback);
                };
            }

            // check to see if overflowScrolling is available
            if (style[scroller] !== none) {
                // Chrome 19 introduced overflow scrolling. Unfortunately, their touch 
                // implementation is incomplete. Hence, we act like it is not supported
                // for chrome. #59
                if (agent.indexOf('Chrome') < 0) {
                    compat.overflowScrolling = cssprefix + 'overflow-scrolling';
                }
            }
        });

        // check to see if the client supports touch
        compat.touchEvents = 'ontouchstart' in global;

        // fallback to set timeout for no animation support
        if (!compat.animate) {
            compat.animate = function(callback) {
                wait(callback, 1000/60);
            };
        }

        // firefox and webkit browsers support native grabbing cursors
        if (prefix === 'moz' || prefix === 'webkit') {
            compat.cursorGrab     = cssprefix + 'grab';
            compat.cursorGrabbing = cssprefix + 'grabbing';

        // other browsers can user google's assets
        } else {
            fallback = 'https://mail.google.com/mail/images/2/';
            compat.cursorGrab     = 'url('+fallback+'openhand.cur), default';
            compat.cursorGrabbing = 'url('+fallback+'closedhand.cur), default';
        }
        return compat;
    })(),

    // These are all the events that could possibly 
    // be used by the plug-in
    events = {
        drag:       'mousemove touchmove',
        end:        'mouseup mouseleave click touchend touchcancel',
        hover:      'mouseenter mouseleave',
        ignored:    'select dragstart drag',
        scroll:     'scroll',
        start:      'mousedown touchstart',
        wheel:      'mousewheel DOMMouseScroll'
    },

    // These settings are used to tweak drift settings
    // for the plug-in 
    settings = {
        captureThreshold:   3,
        driftDecay:         1.1,
        driftSequences:     22,
        driftTimeout:       100,
        scrollDelta:        15,
        thumbOpacity:       0.7,
        thumbThickness:     6,
        thumbTimeout:       400,
        wheelDelta:         20
    },

    // These defaults are used to complement any options
    // passed into the plug-in entry point
    defaults = {
        cancelOn:       '',
        direction:      'multi',
        dragHold:       false,
        hoverThumbs:    false,
        scrollDelta:    settings.scrollDelta,
        showThumbs:     true,
        persistThumbs:  false,
        wheelDelta:     settings.wheelDelta,
        wheelDirection: 'vertical',
        zIndex:         999
    },

    // Triggers a DOM event on the overscrolled element.
    // All events are namespaced under the overscroll name
    triggerEvent = function (event, target) {
        target.trigger('overscroll:' + event);
    },

    // Utility function to return a timestamp
    time = function() {
        return (new Date()).getTime();
    },

    // Captures the position from an event, modifies the properties
    // of the second argument to persist the position, and then 
    // returns the modified object
    capturePosition = function (event, position, index) {
        position.x = event.pageX;
        position.y = event.pageY;
        position.time = time();
        position.index = index;
		
        return position;
    },

    // Used to move the thumbs around an overscrolled element
    moveThumbs = function (thumbs, sizing, left, top) {

        var ml, mt;

        if (thumbs && thumbs.added) {
            if (thumbs.horizontal) {
                ml = left * (1 + sizing.container.width / sizing.container.scrollWidth);
                mt = top + sizing.thumbs.horizontal.top;
                thumbs.horizontal.css('margin', mt + 'px 0 0 ' + ml + 'px');
            }
            if (thumbs.vertical) {
                ml = left + sizing.thumbs.vertical.left;
                mt = top * (1 + sizing.container.height / sizing.container.scrollHeight);
                thumbs.vertical.css('margin', mt + 'px 0 0 ' + ml + 'px');
            }
        }

    },  

    // Used to toggle the thumbs on and off
    // of an overscrolled element
    toggleThumbs = function (thumbs, options, dragging) {
        if (thumbs && thumbs.added && !options.persistThumbs) {
            if (dragging) {
                if (thumbs.vertical) {
                    thumbs.vertical.stop(true, true).fadeTo('fast', settings.thumbOpacity);
                }
                if (thumbs.horizontal) {
                    thumbs.horizontal.stop(true, true).fadeTo('fast', settings.thumbOpacity);
                }
            } else {
                if (thumbs.vertical) {
                    thumbs.vertical.fadeTo('fast', 0);
                }
                if (thumbs.horizontal) {
                    thumbs.horizontal.fadeTo('fast', 0);
                }
            }
        }
    },

    // Defers click event listeners to after a mouseup event.
    // Used to avoid unintentional clicks
    deferClick = function (target) {
        var events = target.data('events'),
        click = events && events.click ? events.click.slice() : [];
        if (events) { delete events.click; }
        target.one('mouseup touchend touchcancel', function () {
            $.each(click, function(i, event){
                target.click(event);
            });
            return false;
        });
    },

    // Toggles thumbs on hover. This event is only triggered
    // if the hoverThumbs option is set
    hover = function (event) {
        var data = event.data,
        thumbs   = data.thumbs,
        options  = data.options,
        dragging = event.type === 'mouseenter';
        toggleThumbs(thumbs, options, dragging);
    },

    // This function is only ever used when the overscrolled element
    // scrolled outside of the scope of this plugin.
    scroll = function (event) {
        var data = event.data;
        if (!data.flags.dragged) {
            moveThumbs(data.thumbs, data.sizing, this.scrollLeft, this.scrollTop);            
        }
    },

    // handles mouse wheel scroll events
    wheel = function (event) {

        // prevent any default wheel behavior
        event.preventDefault(); 

        var data = event.data,
        options = data.options,
        sizing = data.sizing,
        thumbs = data.thumbs,
        wheel = data.wheel,
        flags = data.flags, delta,
        original = event.originalEvent;

        // stop any drifts
        flags.drifting = false;

        // calculate how much to move the viewport by
        // TODO: let's base this on some fact somewhere...
        if (original.wheelDelta) {
            delta = original.wheelDelta / (compat.prefix === 'o' ? -120 : 120);
        } if (original.detail) {
            delta = -original.detail / 3;
        } delta *= options.wheelDelta;

        // initialize flags if this is the first tick
        if (!wheel) {
            data.target.data(datakey).dragging = flags.dragging = true;
            data.wheel = wheel = { timeout: null };
            toggleThumbs(thumbs, options, true);
        }

        // actually modify scroll offsets
        if (options.wheelDirection === 'horizontal') {
            this.scrollLeft -= delta;
        } else {
            this.scrollTop -= delta;
        }

        if (wheel.timeout) { cancel(wheel.timeout); }

        moveThumbs(thumbs, sizing, this.scrollLeft, this.scrollTop);

        wheel.timeout = wait(function() {
            data.target.data(datakey).dragging = flags.dragging = false;
            toggleThumbs(thumbs, options, data.wheel = null);
        }, settings.thumbTimeout);

    },

    // updates the current scroll offset during a mouse move
    drag = function (event) {

        event.preventDefault();

        var data = event.data,
        touches  = event.originalEvent.touches,
        options  = data.options,
        sizing   = data.sizing,
        thumbs   = data.thumbs,
        position = data.position,
        flags    = data.flags,
        target   = data.target.get(0);


        // correct page coordinates for touch devices
        if (compat.touchEvents && touches && touches.length) {
            event = touches[0];
        }

        if (!flags.dragged) {
            toggleThumbs(thumbs, options, true);
        }

        flags.dragged = true;

        if (options.direction !== 'vertical') {
            target.scrollLeft -= (event.pageX - position.x);
        }

        if (data.options.direction !== 'horizontal') {
            target.scrollTop -= (event.pageY - position.y);
        }

        capturePosition(event, data.position);

        if (--data.capture.index <= 0) {
            data.target.data(datakey).dragging = flags.dragging = true;
            capturePosition(event, data.capture, settings.captureThreshold);
        }

        moveThumbs(thumbs, sizing, target.scrollLeft, target.scrollTop);
		
		
		triggerEvent('dragging', data.target);
    },

    // sends the overscrolled element into a drift
    drift = function (target, event, callback) {

        var data   = event.data, dx, dy, xMod, yMod,
        capture    = data.capture,
        options    = data.options,
        sizing     = data.sizing,
        thumbs     = data.thumbs,
        elapsed    = time() - capture.time,
        scrollLeft = target.scrollLeft, 
        scrollTop  = target.scrollTop,
        decay      = settings.driftDecay;

        // only drift if enough time has passed since
        // the last capture event
        if (elapsed > settings.driftTimeout) {
            return callback(data);
        }

        // determine offset between last capture and current time
        dx = options.scrollDelta * (event.pageX - capture.x);
        dy = options.scrollDelta * (event.pageY - capture.y);

        // update target scroll offsets
        if (options.direction !== 'vertical') {
            scrollLeft -= dx;
        } if (options.direction !== 'horizontal') {
            scrollTop -= dy;
        }

        // split the distance to travel into a set of sequences
        xMod = dx / settings.driftSequences;
        yMod = dy / settings.driftSequences;

        triggerEvent('driftstart', data.target);

        data.drifting = true;

        // animate the drift sequence
        compat.animate(function render() {
            if (data.drifting) {            
                var min = 1, max = -1;
                data.drifting = false;
                if (yMod > min && target.scrollTop > scrollTop || yMod < max && target.scrollTop < scrollTop) {
                    data.drifting = true;
                    target.scrollTop -= yMod;
                    yMod /= decay;
                }
                if (xMod > min && target.scrollLeft > scrollLeft || xMod < max && target.scrollLeft < scrollLeft) {
                    data.drifting = true; 
                    target.scrollLeft -= xMod;
                    xMod /= decay;
                }
                moveThumbs(thumbs, sizing, target.scrollLeft, target.scrollTop);
                compat.animate(render);
				triggerEvent('drifting', data.target);
		} else {                
                triggerEvent('driftend', data.target);
                callback(data);                
            }            
        });

    },

    // starts the drag operation and binds the mouse move handler
    start = function (event) {

        var data = event.data, 
        target   = data.target,
        start    = data.start = $(event.target),
        flags    = data.flags;

        // stop any drifts
        flags.drifting = false;

        // only start drag if the user has not explictly banned it.
        if (start.size() && !start.is(data.options.cancelOn)) {

            // without this the simple "click" event won't be recognized on touch clients
            if (!compat.touchEvents) {
                event.preventDefault();
            }

            target.css('cursor', compat.cursorGrabbing);
            target.data(datakey).dragging = flags.dragging = flags.dragged = false;

            // apply the drag listeners to the doc or target
            if(data.options.dragHold) {
                $(document).on(events.drag, data, drag);
            } else {
                target.on(events.drag, data, drag);
            }

            data.position = capturePosition(event, {});
            data.capture = capturePosition(event, {}, settings.captureThreshold);
            triggerEvent('dragstart', target);
        }

    },

    // ends the drag operation and unbinds the mouse move handler
    stop = function (event) {

        var data = event.data,
        target = data.target,
        options = data.options,
        flags = data.flags,
        thumbs = data.thumbs,

        // hides the thumbs after the animation is done
        done = function () {
            if (thumbs && !options.hoverThumbs) {
                toggleThumbs(thumbs, options, false);
            }
        };

        // remove drag listeners from doc or target
        if(options.dragHold) {
            $(document).unbind(events.drag, drag);
        } else {
            target.unbind(events.drag, drag);
        }

        // only fire events and drift if we started with a
        // valid position
        if (data.position) {            

            triggerEvent('dragend', target);

            // only drift if a drag passed our threshold
            if (flags.dragging) {
                drift(target.get(0), event, done);
            } else {
                done();
            }

        }

        // only if we moved, and the mouse down is the same as
        // the mouse up target do we defer the event
        if (flags.dragging && data.start.is(event.target)) {
            deferClick(data.start);
        }

        // clear all internal flags and settings
        target.data(datakey).dragging =
            data.start     = 
            data.capture   = 
            data.position  = 
            flags.dragged  = 
            flags.dragging = false;

        // set the cursor back to normal
        target.css('cursor', compat.cursorGrab);

    },

    // Ensures that a full set of options are provided
    // for the plug-in. Also does some validation
    getOptions = function(options) {

        // fill in missing values with defaults
        options = $.extend({}, defaults, options);

        // check for inconsistent directional restrictions
        if (options.direction !== 'multi' && options.direction !== options.wheelDirection) {
            options.wheelDirection = options.direction;
        }

        // ensure positive values for deltas
        options.scrollDelta = math.abs(options.scrollDelta);
        options.wheelDelta  = math.abs(options.wheelDelta);

        // fix values for scroll offset
        options.scrollLeft = options.scrollLeft === none ? null : math.abs(options.scrollLeft);
        options.scrollTop  = options.scrollTop  === none ? null : math.abs(options.scrollTop);

        return options;        

    },

    // Returns the sizing information (bounding box) for the
    // target DOM element
    getSizing = function (target) {

        var $target  = $(target),
        width        = $target.width(),
        height       = $target.height(),
        scrollWidth  = width >= target.scrollWidth ? width : target.scrollWidth,
        scrollHeight = height >= target.scrollHeight ? height : target.scrollHeight,
        hasScroll    = scrollWidth > width || scrollHeight > height;

        return {
            valid: hasScroll,
            container: {
                width: width,
                height: height,
                scrollWidth: scrollWidth,
                scrollHeight: scrollHeight
            },
            thumbs: {
                horizontal: {
                    width: width * width / scrollWidth,
                    height: settings.thumbThickness,
                    corner: settings.thumbThickness / 2,
                    left: 0,
                    top: height - settings.thumbThickness
                },
                vertical: {
                    width: settings.thumbThickness,
                    height: height * height / scrollHeight,
                    corner: settings.thumbThickness / 2,
                    left: width - settings.thumbThickness,
                    top: 0
                }
            }
        };

    },

    // Attempts to get (or implicitly creates) the 
    // remover function for the target passed 
    // in as an argument
    getRemover = function (target, orCreate) {

        var $target = $(target), thumbs,
        data        = $target.data(datakey) || {},
        style       = $target.attr('style'),
        fallback    = orCreate ? function () {

            data = $target.data(datakey);
            thumbs = data.thumbs;

            // restore original styles (if any)
            if (style) {
                $target.attr('style', style);
            } else {
                $target.removeAttr('style');
            }

            // remove any created thumbs
            if (thumbs) {
                if (thumbs.horizontal) { thumbs.horizontal.remove(); }
                if (thumbs.vertical)   { thumbs.vertical.remove();   }
            }            

            // remove any bound overscroll events and data
            $target
                .removeData(datakey)
                .off(events.wheel,      wheel)
                .off(events.start,      start)
                .off(events.end,        stop)
                .off(events.ignored,    false);

        } : $.noop;

        return $.isFunction(data.remover) ? data.remover : fallback;

    },

    // Genterates CSS specific to a particular thumb.
    // It requires sizing data and options
    getThumbCss = function(size, options) {
        return {
            position: 'absolute',
            opacity: options.persistThumbs ? settings.thumbOpacity : 0,
            'background-color': 'black',
            width: size.width + 'px',
            height: size.height + 'px',
            'border-radius': size.corner + 'px', 
            'margin': size.top + 'px 0 0 ' + size.left + 'px',
            'z-index': options.zIndex
        };
    },

    // Creates the DOM elements used as "thumbs" within 
    // the target container.
    createThumbs = function(target, sizing, options) {

        var div = '<div/>',
        thumbs  = {}, 
        css     = false;

        if (sizing.container.scrollWidth > 0 && options.direction !== 'vertical') {
            css = getThumbCss(sizing.thumbs.horizontal, options);
            thumbs.horizontal = $(div).css(css).prependTo(target);
        }

        if (sizing.container.scrollHeight > 0 && options.direction !== 'horizontal') {
            css = getThumbCss(sizing.thumbs.vertical, options);
            thumbs.vertical = $(div).css(css).prependTo(target);
        }

        thumbs.added = !!css;

        return thumbs;

    },

    // This function takes a jQuery element, some
    // (optional) options, and sets up event metadata 
    // for each instance the plug-in affects
    setup = function(target, options) {        

        // create initial data properties for this instance
        options = getOptions(options);
        var sizing = getSizing(target),
        thumbs, data = {
            options: options, sizing: sizing,
            flags: { dragging: false },
            remover: getRemover(target, true)           
        };
        
        // only apply handlers if the overscrolled element
        // actually has an area to scroll
        if (sizing.valid) {
            // provide a circular-reference, enable events, and
            // apply any required CSS
            data.target = target = $(target).css({
                position: 'relative',
                overflow: 'hidden',
                cursor: compat.cursorGrab
            }).on(events.wheel, data, wheel)
              .on(events.start, data, start)
              .on(events.end, data, stop)
              .on(events.scroll, data, scroll)
              .on(events.ignored, false);

            // apply the stop listeners for drag end
            if(options.dragHold) {
                $(document).on(events.end, data, stop);
            } else {
                data.target.on(events.end, data, stop);
            }

            // apply any user-provided scroll offsets
            if (options.scrollLeft !== null) {
                target.scrollLeft(options.scrollLeft);
            } if (options.scrollTop !== null) {
                target.scrollTop(options.scrollTop);
            }

            // add thumbs and listeners (if we're showing them)
            if (options.showThumbs) {
                data.thumbs = thumbs = createThumbs(target, sizing, options);
                if (thumbs.added) {
                    moveThumbs(thumbs, sizing, target.scrollLeft(), target.scrollTop());
                    if (options.hoverThumbs) {
                        target.on(events.hover, data, hover);
                    }
                }
            }

            target.data(datakey, data);   
        }        

    },

    // Removes any event listeners and other instance-specific
    // data from the target. It attempts to leave the target
    // at the state it found it.
    teardown = function(target) {
        getRemover(target)();
    },

    // This is the entry-point for enabling the plug-in;
    // You can find it's exposure point at the end
    // of this closure
    overscroll = function(options) {
        return this.removeOverscroll().each(function() {
            setup(this, options);
        });
    },

    // This function applies touch-specific CSS to enable
    // the behavior that Overscroll emulates. This function
    // is called instead of overscroll if the device supports
    // it
    touchscroll = function() {
        return this.removeOverscroll().each(function() {
            $(this).data(datakey, { remover: getRemover(this) })
            .css(compat.overflowScrolling, 'touch')
            .css('overflow', 'auto');
        });
    },

    // This is the entry-point for disabling the plug-in;
    // You can find it's exposure point at the end
    // of this closure
    removeOverscroll = function() {
        return this.each(function () {
            teardown(this);
        });
    };

    // Extend overscroll to expose settings to the user
    overscroll.settings = settings;

    // Extend jQuery's prototype to expose the plug-in.
    // If the supports native overflowScrolling, overscroll will not
    // attempt to override the browser's built in support
    $.extend(namespace, {
        overscroll:         compat.overflowScrolling ? touchscroll : overscroll,
        removeOverscroll:   removeOverscroll
    });

})(window, document, navigator, Math, setTimeout, clearTimeout, jQuery.fn, jQuery);

/* ND.vignettePlayer.js */
var ND = (function(ND, $) {
	
	ND.vignettePlayer = function () {
		var element;
		return {

			init: function( elem, options ) { 
				element = $(elem || "#vignetteWrapper");
				if( !element || !element.size() ) { return this; }
				var defaults = {
					imgCount:			175,
					videoCount:			9,
					currentVideo:		0,
					videoImgWidth:		1440,
					videoImgHeight:		758,
					windowMinHeight:	484,
					shortcutMinHeight:	50,
					skipMinHeight:		56,
					speed:				4,
					statementHeightRatio:2.24,
					statementTextWidth:	650,
					statementTextHeight:500,
					videoContainer:		'.vignette',
					videos:				'.vignette > img',
					statements:			'.statements',
					bracket:			'.bracket',
					openStatement:		'.open-statement',
					closeStatement:		'.close-statement',
					shortcut:			'.shortcut',
					mailto:				'.mail',
					loading:			'#loading',
					loadingBar:			'.loading-bar DIV',
					path:				'media/vignettes/{currentVideo}/',
					openStatementPath: 	'open-statement.png',
					closeStatementPath: 'close-statement.png',
					vignettePath:		'preview{index}.jpg',
					mp3Path:			'sound-track.mp3',
					oggPath:			'sound-track.ogg'
				};
				var o =  $.extend(defaults,options);
				var windowHeight, windowWidth,
					scrollHeight, fullHeight, videoWidth, videoHeight,
					statementWidth, statementRatioLH = o.statementTextWidth / o.statementTextHeight,
					currentPosition = -1/5000, targetPosition = 0,
					currentSrc, currentVideo = o.currentVideo,
					transferstart = true, transfering = false;
				
				var $win = $(window), container = $("#page");
				var $videoContainer = $(o.videoContainer),
					$videos = $(o.videos, element),
					audio = $("AUDIO", element)[0];
				
				var statements = $(o.statements,element);
				var openStatement= $(o.openStatement,statements),
					openStatementText = $("IMG",openStatement ),
					closeStatement = $(o.closeStatement,statements),
					closeStatementText = $("IMG",closeStatement),
					mailto = $(o.mailto, element);
				var bracket = $(o.bracket,statements);
				var bracketHeight = bracket.height(),
					bracketWidth = bracket.width();

					
				var loading = $(o.loading),
					loadingBar = loading.find(o.loadingBar);
					
				var shortcut = $(o.shortcut,element),
					skip = shortcut.prev();
				var shortcutWidth = shortcut.width(), shortcutHeight = shortcut.height(),
					shortcutRatioWH = shortcutWidth / shortcutHeight * ( o.videoCount - 1 ),
					skipHeight = skip.height(), skipWidth = skip.width(),
					skipOuterHeight = skip.outerHeight(true),
					skipMarginsVertical = skipOuterHeight - skipHeight,
					skipRatioWH = skipWidth / skipHeight;
					
				var myCanvas = document.getElementById("myCanvas");
				var ctx = myCanvas.getContext("2d");
				
				
				function calculateDimensions() {
					windowWidth = $win.width();
					windowHeight = $win.height();
					container.width( windowWidth ).height( windowHeight );
					var fullHeight = windowHeight + o.imgCount*10;
					scrollHeight = fullHeight - windowHeight;
					element.height( fullHeight );
					
					var scale = Math.max( windowHeight/o.videoImgHeight , windowWidth/o.videoImgWidth );
					videoHeight = scale * o.videoImgHeight;
					videoWidth = scale * o.videoImgWidth;
					$videoContainer
							 .width(videoWidth).height(videoHeight)
							 .css('left',(windowWidth-videoWidth)/2+'px')
							 .css('top',(windowHeight-videoHeight)/2+'px');
					myCanvas.width = videoWidth;
					myCanvas.height = videoHeight;
					ctx.fillRect(0,0,myCanvas.width,myCanvas.height);

					//Resize the navigation
					var skipNewHeight = windowHeight < o.windowMinHeight ? o.skipMinHeight :  windowHeight / ( skipOuterHeight + shortcutHeight ) * skipOuterHeight - skipMarginsVertical;
					var shortcutNewHeight = windowHeight - skipNewHeight - skipMarginsVertical;
					var showShortcutCount = Math.min( Math.floor( shortcutNewHeight / o.shortcutMinHeight ), o.videoCount - 1);
					var shortcutNewHeightEach = shortcutNewHeight / showShortcutCount;
					var shortcutNewWidth = shortcutRatioWH * shortcutNewHeightEach ;
					skip.css({
						height: skipNewHeight,
						width: skipRatioWH * skipNewHeight
					});
					shortcut.find("A").animate({
						width: shortcutNewWidth,
						height: shortcutNewHeightEach
					});
					shortcut.parent().width( shortcutNewWidth );
					
					//Resize the bracket elements
					bracket.height( windowHeight );
					bracket.width( Math.ceil( bracketWidth / bracketHeight * windowHeight ));
					
					statementWidth = windowWidth - shortcutNewWidth;
					statementTextHeight = windowHeight / ( windowHeight < o.windowMinHeight ? 1 : o.statementHeightRatio);
					statementTextWidth =  statementRatioLH * statementTextHeight;
					statementOffsetHorizental = (statementWidth - statementTextWidth)/2; 
					statementOffsetVertical = (windowHeight - statementTextHeight)/2;
					openStatementText.css({
						width:	statementTextWidth,
						height:	statementTextHeight,
						left:	statementOffsetHorizental,
						top:	statementOffsetVertical
					});
					closeStatementText.css({
						width:	statementTextWidth,
						height:	statementTextHeight,
						right:	statementOffsetHorizental,
						top:	statementOffsetVertical
					});
					
					//Resize the loading bar
					
					//Resize the mailto logo

				}
				
				function handleResize() {
					calculateDimensions();
					container.scrollTop( targetPosition * scrollHeight );
					render( currentPosition );
				}
				
				function handleScroll() {
					targetPosition = container.scrollTop() / scrollHeight;
					$videos.hide();
					animloop();
				}
				
				window.requestAnimFrame = (function(){
				  return  window.requestAnimationFrame       ||
						  window.webkitRequestAnimationFrame ||
						  window.mozRequestAnimationFrame    ||
						  window.oRequestAnimationFrame      ||
						  window.msRequestAnimationFrame     ||
						  function(/* function */ callback, /* DOMElement */ element){
							window.setTimeout(callback, 1000 / 60);
						  };
				})();


				function animloop(){
					var startPosition = Math.floor( getStartPosition() * 5000 );
					if ( Math.floor(currentPosition*5000) != Math.floor(targetPosition*5000) ) {
						currentPosition += (targetPosition - currentPosition) / 20;
						render( currentPosition );
						requestAnimFrame(animloop);
					}
					else{
						//Goto the prev vignette
						// console.log( Math.floor(currentPosition*5000) + "\t" + Math.floor(targetPosition*5000) );
						if ( Math.floor(currentPosition*5000) < startPosition - 10 ) {
							gotoVideo( currentVideo - 1 );
						}
						//Show the mailto logo
					}
					mailto.hide();
					if( currentVideo == o.videoCount - 1 && Math.floor(currentPosition*5000)>=4990 ){
						mailto.show();
					}
				}

				
				function render(position){
					var transferLeft = renderBracket(position);
					if( transfering && transferLeft < 10 ){
						//Transfer completed
						reset( currentVideo + 1 );
					}
					if( transfering ){
						var prevVideoLeft =  transferLeft + ( videoWidth - windowWidth ) / 2;
						if( preloadImgsNext.length == 0){
							loadImages( currentVideo + 1, preloadImgsNext);
						}
						//Render the next video
						renderVideo( position + getStartPosition( currentVideo + 1 ) - 1 , prevVideoLeft, videoWidth - prevVideoLeft, currentVideo + 1  );
						//Render the current video
						renderVideo( position, 0, prevVideoLeft );
					}
					else{
						renderVideo(position);
					}
					
				}
				
				function renderBracket(position) {
					var totalPhrase = currentVideo == 0 || currentVideo == o.videoCount - 1 ? 4 : 5,
						currentPhrase = Math.max( Math.floor( position * totalPhrase ), 0 );
					var	bracketPosition = position * totalPhrase - currentPhrase,
						openPosition = bracketPosition , closePosition = 1- bracketPosition;
					if( currentVideo == 0 ) { currentPhrase++; }
					switch( currentPhrase ){
						case 1: openStatementText.show(); closeStatementText.hide(); break;
						case 2: closeStatementText.show(); openStatementText.show(); break;
						case 3: openStatementText.hide(); closeStatementText.show();
								if( transfering ){ transfering = false;}
								break;
						case 4: if( closeStatementText.is(":visible") ){ transfering = true; }	
								closeStatementText.hide();
								break;
					}
					if( currentPhrase % 2 == 0){
						openPosition = closePosition;
						closePosition = bracketPosition;
					}
					var openWidth = openPosition * (statementWidth - bracketWidth),
						closeWidth = closePosition * (statementWidth - bracketWidth);
					openStatement.width( openWidth );
					closeStatement.width( closeWidth );
					return openWidth;
				}
				
				function renderVideo(position, left, width, videoIndex) {
					var myVideo = !videoIndex ? currentVideo : videoIndex;
					var imgs = !videoIndex ?  preloadImgs : preloadImgsNext;
					var canvasLeft = !left ? 0 : left;
					var canvasWidth = !width ? myCanvas.width : width;
					var nearestIndex;
					
					getNearest( Math.round( position * (o.imgCount-1) ), myVideo );
					nearestIndex = myImgs[myVideo].nearest;
					if ( nearestIndex < 0 ) myImgs[myVideo].nearest = nearestIndex = 0;
					if ( myImgs[myVideo].current != nearestIndex ) {
						loadImages(myVideo, imgs);
						var preloadIndex = preloadCount/2;
						if( imgs[preloadIndex].complete){
							if( !!videoIndex ) console.log(nearestIndex+","+imgs[preloadIndex].src);
							// console.log((canvasLeft/videoWidth * o.videoImgWidth)+"\t"+ (canvasWidth / videoWidth * o.videoImgWidth)+"\t"+canvasWidth+"\t"+canvasLeft);
							ctx.drawImage(imgs[preloadIndex], Math.floor(canvasLeft/videoWidth * o.videoImgWidth), 0, Math.floor(canvasWidth / videoWidth * o.videoImgWidth), o.videoImgHeight, Math.floor(canvasLeft), 0, Math.floor(canvasWidth), Math.floor(myCanvas.height) );
							myImgs[myVideo].current = nearestIndex;
						}
					}
				}

				function gotoVideo( videoIndex ){
					if( videoIndex >= 0 && videoIndex < o.videoCount ){
						$(myCanvas).stop(true,true);
						$(myCanvas).animate({
							opacity:0
						},function(){
							reset(videoIndex);
							render( getStartPosition() );
							$(this).animate({
								opacity:1
							});
						});
					}
				}
				
				function getNearest( imgIndex, videoIndex ){
					var myVideo = !videoIndex ? currentVideo : videoIndex;
					var imgs = !videoIndex ? preloadImgs : preloadImgsNext;
					var diff = 0, i;
					imgIndex = Math.floor(imgIndex);
					
					for ( diff = 0; diff < preloadCount/2 ; diff++ ) {
						i = imgIndex+diff;
						if ( i>=0 && i < o.imgCount && preloadImgs[preloadCount/2+diff] ) {
							myImgs[myVideo].nearest = i;
							// return getSrcAt(i, myVideo);
						}
						i = imgIndex-diff;
						if ( i>=0 && i < o.imgCount && preloadImgs[preloadCount/2-diff]) {
							myImgs[myVideo].nearest = i;
							// return getSrcAt(i,myVideo);
						}
					}
					// return null;
				};
				
				function getSrcAt( imgIndex, videoIndex ) {
					var myVideo = currentVideo;
					if( !!videoIndex ){ myVideo = videoIndex; }
					var str = (imgIndex+1+Math.pow(10,3)).toString(10).substr(1);
					return getPath( o.vignettePath, myVideo ).replace( '{index}' , str );
				}
				
				function getPath( path, videoIndex ){
					myVideo = currentVideo;
					if( !!videoIndex ){ myVideo = videoIndex; }
					return o.path.replace('{currentVideo}', myVideo + 1 ) + path;
				}
				
				function getStartPosition( videoIndex ){
					var myVideo = currentVideo;
					var startPosition = 0.2;
					if( !!videoIndex ){ myVideo = videoIndex; }
					if( myVideo == o.videoCount - 1 ){ startPosition = 0.25;}
					if( myVideo == 0 ){ startPosition = 0; }
					return startPosition;
				}
				
				function reset( videoIndex ){
					currentVideo = videoIndex;
					var startPosition = getStartPosition();
					transferstart = true;
					transfering = false;
					myImgs[currentVideo].current = -1;
					currentPosition = startPosition - 1/5000;
					targetPosition = startPosition;
					container.scrollTop( scrollHeight * startPosition );
					preloadImgsNext = [];
					
					openStatementText.attr("src",myImgs[videoIndex].openStatement.src);
					closeStatementText.attr("src",myImgs[videoIndex].closeStatement.src);
					
					audio.src = Modernizr.audio.ogg ? getPath( o.oggPath ) :
								Modernizr.audio.mp3 ? getPath( o.mp3Path ) : null;
					$(audio).find("EMBED").attr("src", getPath( o.mp3Path ));
					audio.load;
					audio.play();
				}
				
				//Preload
				var myImgs = [];
				for( var i = 0; i < o.videoCount; i++ ){
					myImgs.push({
						openStatement: 	new Image(),
						closeStatement:	new Image(),
						firstSequence:	new Image(),
						current:		0,
						nearest:		0
					});
					myImgs[i].openStatement.src = getPath( o.openStatementPath, i );
					myImgs[i].closeStatement.src = getPath( o.closeStatementPath, i );
					myImgs[i].firstSequence.src = getSrcAt( 0, i );
				}
				
				var preloadImgs = [], preloadImgsNext = [];
				var preloadCount = 20, loadedNum = 0, loadstart = false;
				function loadImages( videoIndex, imgloader){
					var myVideo = !videoIndex ? currentVideo : videoIndex;
					// console.log(myVideo+"\t"+currentVideo+"\t"+!videoIndex);
					var startIndex = myImgs[myVideo].nearest;
					// if(!!videoIndex) console.log(startIndex);
					var imgs = !imgloader ? preloadImgs : imgloader;
					var diff;
					if( imgs.length == 0 ){
						loading.removeClass("comlete");
						loadingBar.width(0);
						loadedNum = 0;
						for( var i = 0; i < preloadCount + 1; i++ ){
							imgs.push( new Image() );
							if( imgs < preloadCount/2 + 1 ){
								imgs[i].src = getSrcAt( i, myVideo );
							}
						}
						handleLoad();
					} else{
						var i;
						imgs[preloadCount/2] = new Image();
						imgs[preloadCount/2].src = getSrcAt( startIndex, myVideo );
						for( diff = 1; diff < preloadCount/2; diff++ ){
							var i = startIndex - diff;
							if( !(i< 0) ){
								imgs[preloadCount/2 - diff] = new Image();
								if(i< 0) imgs[preloadCount/2 - diff].src = getSrcAt(i,myVideo);
							}
							var i = startIndex + diff;
							imgs[preloadCount/2 - diff] = new Image();
							if(i > o.imgCount - 1) imgs[preloadCount/2 + diff].src = getSrcAt(i,myVideo);
						}
					}
				}
				
				function handleLoad( ){
					// if( loadedNum == preloadCount / 2 + 1 ){
						// loading.addClass("complete");
						// element.css("visibility","visible");
						// return;
					// }
					// if( preloadImgs[loadedNum].complete ){
						// var progress = ++loadedNum / (preloadCount/2 + 1) *100;
						// loadingBar.width( progress + "%" );
					// }
					
					if( loadedNum == preloadCount / 2 + 1 ){
						loading.addClass("complete");
						element.css("visibility","visible");
						return;
					}
					loadingBar.width( ++loadedNum / (preloadCount/2 + 1) *100 + "%" );
					setTimeout(handleLoad,100);
				}
				
				$win.resize( handleResize );
				container.scroll( handleScroll );
				
				//var calScale, touch, drifting = false;
				// $win.on("touchstart",function(e){
					// touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
					// touchTop = touch.pageY - touch.clientY;
					// calScale = touchTop == 0 ? 0 : $win.scrollTop() / touchTop;
				// }).on("touchmove",function(e){
					// targetPosition = ( touch.pageY - touch.clientY ) * calScale / scrollHeight ;
					// animloop();
				// });
				
				skip.on("click",function(e){
					gotoVideo( o.videoCount - 1 );
					e.preventDefault();
				}).find("IMG").on("mouseenter",function(){
					this.src = this.src.replace('logo.png',"logo-glow.png");
				}).on("mouseleave",function(){
					this.src = this.src.replace('logo-glow.png',"logo.png");
				});
				
				shortcut.on("mouseenter","A",function(){
					$("IMG",$(this)).fadeIn();
				}).on("mouseleave","A",function(){
					$("IMG",$(this)).fadeOut();
				}).on("click","A",function(e){
					var targetVideo = shortcut.find("A").index( $(this) );
					gotoVideo( targetVideo );
					e.preventDefault();
				});
				
				
				container.scrollTop(0);
				calculateDimensions();
				loadImages( );
				container.overscroll({
					persistThumbs: 	true,
					showThumbs: 	false,
					wheelDelta: 	o.speed * 20,
					scrollDelta:	o.speed * 5,
					direction:		"vertical"
				}).on('overscroll:drifting overscroll:dragging oversroll:dragstart overscroll:dragend overscroll:driftstart overscroll:driftend', function(e){
					console.log( e.type);
					if (e.type == "overscroll:drifting" || e.type == "overscroll:dragging") {
						handleScroll();
					}
				});
				
				return this;		
			}
		};	
	};
	
	return ND;	

}(window.ND || {}, jQuery));

/* ND.browserCheck.js */
var ND = (function(ND, $) {
	
	ND.browserCheck = function () {
	
		var element;
		return {

			init: function( elem ) { 
				
				element = $(elem || "#unsupport-message");
					
				if( !element || !element.size() ) { return this; }
				
				var b = $.browser,
					v = b.version;
				if(	
					b.msie && parseInt(v)<8 ||
					b.mozilla && parseInt(v)<3.6
				){
					window.location.href = "unsupported.html";
				}
				return this;
			
			}
		
		};	
	};
	
	return ND;	

}(window.ND || {}, jQuery));

/* ND.fillScreen.js */
var ND = (function(ND, $) {
	
	ND.fillScreen = function () {
		var element;
		return {

			init: function( elem ) { 
				
				element = $(elem || ".fill-screen");
				if( !element || !element.size() ) { return this; }
			
				function fill(){
					var winW = $(window).width(),
						winH = $(window).height();
					var eleW = element.width(),
						eleH = element.height();
					var scale = Math.max( winW / eleW, winH / eleH );
					element.css({
						position:	"absolute",
						width:		winW,
						height:		winH,
						top:		( winW - eleW ) / 2,
						left:		( winH - eleH ) / 2
					});
				}
				
				$(window).resize(fill);
				
				return this;
			
			}		
		};	
	};
	
	return ND;	

}(window.ND || {}, jQuery));

/* ND.expandFromCenter.js */
var ND = (function(ND, $) {
	
	ND.expandFromCenter = function () {
		var element;
		return {

			init: function( elem ) { 
				
				element = $(elem || ".mail .icon");
				if( !element || !element.size() ) { return this; }
			
			
				element.on("mouseenter",function(){
					element[0].src = "media/static-logo.png";
					element.siblings().animate({width: 176});
				}).parent().on("mouseleave",function(){
					element[0].src = "media/rolling-logo.gif";
					element.siblings().animate({width: 0});
				});
				
				return this;
			
			}		
		};	
	};
	
	return ND;	

}(window.ND || {}, jQuery));

/* global.js */
/*globals jQuery, ND, window */
(function(ND, $){
	$(function($){

		var vignettePlayer = ND.vignettePlayer().init();		
		var browserCheck = ND.browserCheck().init();
		var expandFromCenter = ND.expandFromCenter().init();
		var fillScreen = ND.fillScreen().init();
		//var overScroll = $("#page").overscroll();
	});
}(window.ND || {}, jQuery));

