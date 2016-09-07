/*
 * Heavily Modified Basic jQuery Slider plug-in v.1.3
 *
 * http://www.basic-slider.com
 *
 * Original authored by John Cobb
 * http://www.johncobb.name
 * @john0514
 *
 * Copyright 2011, John Cobb
 * License: GNU General Public License, version 3 (GPL-3.0)
 * http://www.opensource.org/licenses/gpl-3.0.html
 *
 */

;(function($) {

    "use strict";

    $.fn.jslider = function(o) {
        
        // slider default settings
        var defaults        = {

            // w + h to enforce consistency
            width           : 480,
            height          : 579,

            // transition valuess
            animtype        : 'reveal',
            animduration    : 600,      // length of transition
            animspeed       : 4000,     // delay between transitions
            automatic       : true,     // enable/disable automatic slide rotation

            // control and marker configuration
            showcontrols    : true,     // enable/disable next + previous UI elements
            defaultcontrols : true,     // enable/disable next + previous to default position
            nexttext        : 'Next',   // text/html inside next UI element
            prevtext        : 'Prev',   // text/html inside previous UI element
            showmarkers     : false,    // enable/disable individual slide UI markers

            // interaction values
            keyboardnav     : true,     // enable/disable keyboard navigation
            hoverpause      : false,    // enable/disable pause slides on hover

            // presentational options
            responsive      : false,    // enable responsive behaviour
            intro           : false

        };

        // create settings from defauls and user options
        var settings        = $.extend({}, defaults, o);

        return this.each(function(){

            // slider elements
            var $wrapper        = $(this),
                $slider         = $wrapper.find('ul.jslider'),
                $slides         = $slider.children('li'),

                // control elements
                $c_wrapper      = null,
                $c_fwd          = null,
                $c_prev         = null,

                // marker elements
                $m_wrapper      = null,
                $m_markers      = null,

                // elements for slide animation
                $canvas         = null,
                $clone_first    = null,
                $clone_second   = null,
                $clone_last     = null;

            // state management object
            var state           = {
                slidecount      : $slides.length,   // total number of slides
                animating       : false,            // bool: is transition is progress
                paused          : false,            // bool: is the slider paused
                currentslide    : 0,                // current slide being viewed (not 0 based)
                nextslide       : 0,                // slide to view next (not 0 based)
                currentindex    : 0,                // current slide being viewed (0 based) - left slide
                nextindex       : 0,                // slide to view next (0 based)
                interval        : null              // interval for automatic rotation
            };

            var responsive      = {
                width           : null,
                height          : null,
                ratio           : null
            };

            // helpful variables
            var vars            = {
                fwd             : 'forward',
                prev            : 'previous'
            };

            // initialise intro slide counter
            var introcount = 2;
                
            // run through options and initialise settings
            var init = function() {

                // differentiate slider li from content li
                $slides.addClass('jslider-slide');

                // conf dimensions, responsive or static
                if( settings.responsive ){
                    conf_responsive();
                }
                else{
                    conf_static();
                }

                // configurations only available if more than 1 slide
                if( state.slidecount > 1 ){

                    // create and show controls
                    if( settings.showcontrols ){
                        conf_controls();
                    }

                    // create and show controls
                    if( settings.defaultcontrols ){
                        conf_defaultcontrols();
                    }

                    // create and show markers
                    if( settings.showmarkers ){
                        conf_markers();
                    }

                    // enable slidenumboard navigation
                    if( settings.keyboardnav ){
                        conf_keynav();
                    }

                    // enable pause on hover
                    if ( settings.hoverpause && settings.automatic ){
                        conf_hoverpause();
                    }

                    // conf slide animation
                    if ( settings.animtype === 'slide' ){
                        conf_slide();
                    }

                    // conf reveal animation
                    if ( settings.animtype === 'reveal' ){
                        conf_reveal();
                    }

                    // enable intro click
                    if ( settings.intro ){
                        conf_intro();
                    }

                    $slider.children().each(function( index ){
                        var index = index + 1,
                            slideNum = index.toString();
                        $(this).addClass('slide' + slideNum);              
                    });

                    // enable swipe
                    if( !settings.automatic ) {
                        conf_swipe();
                    }

                }

                if(settings.animtype === 'slide' || settings.animtype === 'reveal'){
                    state.currentindex = 1;
                    state.currentslide = 2;
                }

                // slide components are hidden by default, show them now
                $slider.show();
                $slides.eq(state.currentindex).show();

                // Finally, if automatic is set to true, kick off the interval
                if(settings.automatic){
                    state.interval = setInterval(function () {
                        go(vars.fwd, false);
                    }, settings.animspeed);
                }

                // disable prev button at start of slideshow
                disablePrevBtn(2);

                // anchor link to experience layer
                $('.experience-anchor').on('click',function(e){
                    e.preventDefault();
                    $('html,body').animate({scrollTop: $('#experience').offset().top}, 400);
                });
 
            };

            var conf_intro = function() {
                
                $('.start-experience').on('click',function() { 

                	//set required v13/c13 value - only here as we only want to track the first "page" view
                	//it assumes nameplate is required
					
                	if( window._da && window._da.om && ND && ND.omniture ) {
						
					s.eVar13 = s.prop13 = 'exp-intro' + (state.currentslide/2) + '-' + _da.nameplate.name;
                	trackEvent($('#experience-slider ul.jslider .slide1 .content'));
					
					}

                    // clear the interval set above for the intro slides
                    clearInterval(state.interval);

                    // reveal experience slider
                    reveal_experience();

                });

            };

            // function that calls omniture for click/keyboard and swipe events
            var trackEvent = function(slide) {
                if (window._da && window._da.om && ND && ND.omniture) {
					ND.analyticsTag.trackOmniturePage({
						pname: slide.data('pname'),
						hier: slide.data('hier'),
						tool: slide.data('tool'),
						tooldesc: slide.data('tooldesc')
					});
				}
            };

            var disablePrevBtn = function(currentSlide) {
                if(state.currentslide === currentSlide){
                    $('li.jslider-prev a').addClass('disabled').on('click.prevbtn', function() {
                        return false;
                    });
                } else {
                    $('li.jslider-prev a').off('click.prevbtn');
                }
            };

            var disableNextBtn = function(currentSlide) {
                if(state.currentslide === state.slidecount){
                    $('li.jslider-next a').addClass('disabled').on('click.nextbtn', function() {
                        return false;
                    });
                } else {
                    $('li.jslider-next a').off('click.nextbtn');
                }
            };

            // attach intro slide number to URL hash
            /*var insertParam = function(key, value) {
                    
                var encodedKey = encodeURIComponent(key), encodedValue = encodeURIComponent(value);
                document.location.hash = encodedKey + '=' + encodedValue;
                
            };*/

            var conf_responsive = function() {

                responsive.width    = $wrapper.outerWidth();
                responsive.ratio    = responsive.width/settings.width;
                responsive.height   = settings.height * responsive.ratio;

                if(settings.animtype === 'fade'){

                    // initial setup
                    $slides.css({
                        'height'        : settings.height,
                        'width'         : '100%'
                    });
                    $slides.children('img').css({
                        'height'        : settings.height,
                        'width'         : '100%'
                    });
                    $slider.css({
                        'height'        : settings.height,
                        'width'         : '100%'
                    });
                    $wrapper.css({
                        'height'        : settings.height,
                        'max-width'     : settings.width,
                        'position'      : 'relative'
                    });

                    if(responsive.width < settings.width){

                        $slides.css({
                            'height'        : responsive.height
                        });
                        $slides.children('img').css({
                            'height'        : responsive.height
                        });
                        $slider.css({
                            'height'        : responsive.height
                        });
                        $wrapper.css({
                            'height'        : responsive.height
                        });

                    }

                    $(window).resize(function() {

                        // calculate and update dimensions
                        responsive.width    = $wrapper.outerWidth();
                        responsive.ratio    = responsive.width/settings.width;
                        responsive.height   = settings.height * responsive.ratio;

                        $slides.css({
                            'height'        : responsive.height
                        });
                        $slides.children('img').css({
                            'height'        : responsive.height
                        });
                        $slider.css({
                            'height'        : responsive.height
                        });
                        $wrapper.css({
                            'height'        : responsive.height
                        });

                    });

                }

                if(settings.animtype === 'slide'){

                    // initial setup
                    $slides.css({
                        'height'        : settings.height,
                        'width'         : settings.width
                    });
                    $slides.children('img').css({
                        'height'        : settings.height,
                        'width'         : settings.width
                    });
                    $slider.css({
                        'height'        : settings.height,
                        'width'         : settings.width * settings.slidecount
                    });
                    $wrapper.css({
                        'height'        : settings.height,
                        'max-width'     : settings.width,
                        'position'      : 'relative'
                    });

                    if(responsive.width < settings.width){

                        $slides.css({
                            'height'        : responsive.height
                        });
                        $slides.children('img').css({
                            'height'        : responsive.height
                        });
                        $slider.css({
                            'height'        : responsive.height
                        });
                        $wrapper.css({
                            'height'        : responsive.height
                        });

                    }

                    $(window).resize(function() {

                        // calculate and update dimensions
                        responsive.width    = $wrapper.outerWidth();
                        responsive.ratio    = responsive.width/settings.width;
                        responsive.height   = settings.height * responsive.ratio;

                        $slides.css({
                            'height'        : responsive.height,
                            'width'         : responsive.width
                        });
                        $slides.children('img').css({
                            'height'        : responsive.height,
                            'width'         : responsive.width
                        });
                        $slider.css({
                            'height'        : responsive.height,
                            'width'         : responsive.width * settings.slidecount
                        });
                        $wrapper.css({
                            'height'        : responsive.height
                        });
                        $canvas.css({
                            'height'        : responsive.height,
                            'width'         : responsive.width
                        });

                        resize_complete(function(){
                            go(false,state.currentslide);
                        }, 200, "some unique string");

                    });

                }

            };

            var resize_complete = (function () {
                
                var timers = {};
                
                return function (callback, ms, uniqueId) {
                    if (!uniqueId) {
                        uniqueId = "Don't call this twice without a uniqueId";
                    }
                    if (timers[uniqueId]) {
                        clearTimeout (timers[uniqueId]);
                    }
                    timers[uniqueId] = setTimeout(callback, ms);
                };

            })();

            // enforce fixed sizing on slides, slider and wrapper
            var conf_static = function() {

                $slides.css({
                    'height'    : settings.height,
                    'width'     : settings.width
                });
                $slider.css({
                    'height'    : settings.height,
                    'width'     : settings.width
                });
                $wrapper.css({
                    'height'    : settings.height,
                    'width'     : settings.width,
                    'position'  : 'relative'
                });

            };

            var conf_reveal = function() {

                // update the elements object
                $slides             = $slider.children('li');
                state.slidecount    = $slides.length;

                // create a 'canvas' element which is neccessary for the slide animation to work
                $canvas = $('<div class="jslider-wrapper"></div>');

                // if the slider is responsive && the calculated width is less than the max width
                if(settings.responsive && (responsive.width < settings.width)){

                    $canvas.css({
                        'width'     : responsive.width,
                        'height'    : responsive.height,
                        'overflow'  : 'hidden',
                        'position'  : 'relative'
                    });

                    // update the dimensions to the slider to accomodate all the slides side by side
                    $slider.css({
                        'width'     : responsive.width * (state.slidecount + 2),
                        'left'      : -responsive.width * state.currentslide
                    });

                }
                else {

                    $canvas.css({
                        'width'     : settings.width * 2,
                        'height'    : settings.height,
                        'overflow'  : 'hidden',
                        'position'  : 'relative'
                    });

                    // update the dimensions to the slider to accomodate all the slides side by side
                    $slider.css({
                        'width'     : settings.width * (state.slidecount + 2),
                        'left'      : -settings.width * state.currentslide
                    });

                }

                // add some inline styles which will align our slides for left-right sliding
                $slides.css({
                    'float'         : 'left',
                    'position'      : 'relative',
                    'display'       : 'list-item'
                });

                // 'everything.. in it's right place'
                $canvas.prependTo($wrapper);
                $slider.appendTo($canvas);

                //insertParam('intcmp','exp-intro1');

            };

            var conf_slide = function() {

                // create three extra elements which are clones of the first, second and last slides
                $clone_first    = $slides.eq(0).clone();
                $clone_second   = $slides.eq(1).clone();
                $clone_last     = $slides.eq(state.slidecount-1).clone();

                // add them to the DOM where we need them
                $clone_first.attr({'data-clone' : 'last', 'data-slide' : 0}).appendTo($slider).show();
                $clone_second.appendTo($slider).show();
                $clone_last.attr({'data-clone' : 'first', 'data-slide' : 0}).prependTo($slider).show();

                // update the elements object
                $slides             = $slider.children('li');
                state.slidecount    = $slides.length;

                // create a 'canvas' element which is neccessary for the slide animation to work
                $canvas = $('<div class="jslider-wrapper"></div>');

                $canvas.css({
                    'width'     : settings.width * 2,
                    'height'    : settings.height,
                    'overflow'  : 'hidden',
                    'position'  : 'relative'
                });

                // update the dimensions to the slider to accomodate all the slides side by side
                $slider.css({
                    'width'     : settings.width * (state.slidecount + 2),
                    'left'      : -settings.width * state.currentslide
                });

                // add some inline styles which will align our slides for left-right sliding
                $slides.css({
                    'float'         : 'left',
                    'position'      : 'relative',
                    'display'       : 'list-item'
                });

                // 'everything.. in it's right place'
                $canvas.prependTo($wrapper);
                $slider.appendTo($canvas);

            };

            var conf_controls = function() {

                // create the elements for the controls
                $c_wrapper  = $('<ul class="jslider-controls"></ul>');
                $c_fwd      = $('<li class="jslider-next"><a href="#" data-direction="'+ vars.fwd +'">' + settings.nexttext + '</a></li>');
                $c_prev     = $('<li class="jslider-prev"><a href="#" data-direction="'+ vars.prev +'">' + settings.prevtext + '</a></li>');

                    // bind click events
                    //$c_wrapper.on('click','ul.jslider-controls a',function(e){
                	$c_wrapper.on('click','a',function(e){

                        e.preventDefault();
                        var direction = $(this).attr('data-direction');

                        if(!state.animating){

                            if(direction === vars.fwd){
                                go(vars.fwd,false);
                                disableNextBtn(state.currentslide);
                                if(state.currentslide != 2){
                                    $('li.jslider-prev a').removeClass('disabled');
                                }
                            }

                            if(direction === vars.prev){
                                go(vars.prev,false);
                                disableNextBtn(state.currentslide);
                                if(state.currentslide === 2){
                                    $('li.jslider-prev a').addClass('disabled');
                                }
                                if(state.currentslide < state.slidecount){
                                    $('li.jslider-next a').removeClass('disabled');
                                }
                            }

                            trackEvent($('.slide' + state.currentindex).children('.content'));

                        }

                    });

                // put 'em all together
                $c_prev.appendTo($c_wrapper);
                $c_fwd.appendTo($c_wrapper);
                $c_wrapper.appendTo($wrapper);

            };

            var conf_defaultcontrols = function() {
                $('ul.jslider-controls li a').addClass('default');
            };

            var conf_markers = function() {

                // create a wrapper for our markers
                $m_wrapper = $('<ol class="jslider-markers"></ol>');

                // for every slide, create a marker
                $.each($slides, function(key, slide){

                    var slidenum    = key + 1,
                        gotoslide   = key + 1;
                    
                    if(settings.animtype === 'slide'){
                        // + 2 to account for clones
                        gotoslide = key + 2;
                    }

                    var marker = $('<li><a href="#">'+ slidenum +'</a></li>');

                    // set the first marker to be active
                    if(slidenum === state.currentslide){ marker.addClass('active-marker'); }

                    // bind the click event
                    marker.on('click','a',function(e){
                        e.preventDefault();
                        if(!state.animating && state.currentslide !== gotoslide){
                            go(false,gotoslide);
                        }
                    });

                    // add the marker to the wrapper
                    marker.appendTo($m_wrapper);

                });

                $m_wrapper.appendTo($wrapper);
                $m_markers = $m_wrapper.find('li');

            };

            var nextSlide = function() {

                if(state.currentslide != state.slidecount && settings.animtype === 'reveal') {
                    go(vars.fwd, false);
                } else if(settings.animtype != 'reveal'){
                    go(vars.fwd, false);
                }

                disableNextBtn(state.currentslide);

                if(state.currentslide != 2){
                    $('li.jslider-prev a').removeClass('disabled');
                }

                trackEvent($('.slide' + (state.currentindex)).children('.content'));

            };

            var prevSlide = function() {

                if(state.currentslide >= 4 && settings.animtype === 'reveal') {
                    go(vars.prev, false);
                } else if(settings.animtype != 'reveal'){
                    go(vars.prev, false);
                }

                disableNextBtn(state.currentslide);
                
                if(state.currentslide === 2){
                    $('li.jslider-prev a').addClass('disabled');
                }
                if(state.currentslide < state.slidecount){
                    $('li.jslider-next a').removeClass('disabled');
                }

                trackEvent($('.slide' + state.currentindex).children('.content'));

            };

            var conf_keynav = function() {

                $(document).keyup(function (event) {

                    // run code only if the intro is complete
                    if ($('#intro-slider').length === 0){

                        if (!state.paused) {
                            clearInterval(state.interval);
                            state.paused = true;
                        }

                        if (!state.animating) {
                            if (event.keyCode === 39) {
                                
                                event.preventDefault();
                                nextSlide();

                            } else if (event.keyCode === 37) {
                                
                                event.preventDefault();
                                prevSlide();

                            }
                        }

                        if (state.paused && settings.automatic) {
                            state.interval = setInterval(function () {
                                go(vars.fwd);
                            }, settings.animspeed);
                            state.paused = false;
                        }

                    }

                });

            };

            var conf_swipe = function() {

                if (Modernizr.touch) {
                    // bind swipe events
                    if(!state.animating){
            
                        $slider.touchwipe({
                            wipeLeft: function() {
                                nextSlide();
                            },
                            wipeRight: function() {
                                prevSlide();
                            },
                            min_move_x: 20,
                            preventDefaultEvents: true
                        });

                    }
                }   

            };

            var conf_hoverpause = function() {

                $wrapper.hover(function () {
                    if (!state.paused) {
                        clearInterval(state.interval);
                        state.paused = true;
                    }
                }, function () {
                    if (state.paused) {
                        state.interval = setInterval(function () {
                            go(vars.fwd, false);
                        }, settings.animspeed);
                        state.paused = false;
                    }
                });

            };

            var set_next = function(direction) {

                if(direction === vars.fwd){
                    
                    if($slides.eq(state.currentindex).next().length){
                        state.nextindex = state.currentindex + 1;
                        state.nextslide = state.currentslide + 1;
                    }
                    else{
                        state.nextindex = 0;
                        state.nextslide = 1;
                    }

                }
                else{

                    if($slides.eq(state.currentindex).prev().length){
                        state.nextindex = state.currentindex - 3;
                        state.nextslide = state.currentslide - 3;
                        state.currentslide = state.currentslide - 4;
                    }
                    else{
                        state.nextindex = state.slidecount - 1;
                        state.nextslide = state.slidecount;
                    }

                }

            };

            var reveal_experience = function() {

                // clone the first and second slide of the experience layer for masking
                var $clone_firstSlide = $('#experience-slider .jslider li').eq(0).children().clone(),
                    $clone_secondSlide = $('#experience-slider .jslider li').eq(1).children().clone();

                if (Modernizr.csstransitions) {

                    // CSS3 transition version
                    // create masks of current and next slider and then animate
                    $clone_secondSlide.prependTo($canvas).addClass('reveal-right-mask');

                    // timeout required for transition to work
                    setTimeout(function(){
                        $('.reveal-right-mask').css({
                            'height'    : settings.height,
                            'width'     : settings.width,
                            'z-index'   : 12
                        });
                    },50);

                    // second reveal/slide activated just before first reveal/slide is complete
                    setTimeout(function(){

                        $clone_firstSlide.prependTo($canvas).addClass('reveal-left-mask').find("a.overlay").hide();//hide clone a.overlay because it doesnt have click event. this will broken overlay functionality
                        
                        setTimeout(function(){
                            $('.reveal-left-mask').css({
                                'height'    : settings.height,
                                'width'     : settings.width,
                                'z-index'   : 12
                            });

                            setTimeout(function(){
                                // once transitions are complete fade out masks and then remove intro slider from DOM
                                $('#intro-slider').fadeOut(700, function() {
                                    $('#intro-slider').remove(); 
                                });
                            },settings.animduration+50);
                        },50);
                    },200);

                } else {

                    // jQuery fallback animate version
                    // create masks of current and next slider and then animate
                    $clone_secondSlide.prependTo($canvas).addClass('reveal-right-mask').css({
                        'right'     : 0,
                        'height'    : settings.height,
                        'width'     : 0,
                        'z-index'   : 12
                    }).animate({'width': settings.width}, settings.animduration, 'easeOutCubic');

                    // second reveal/slide activated just before first reveal/slide is complete
                    setTimeout(function(){

                        $clone_firstSlide.prependTo($canvas).addClass('reveal-left-mask').css({
                            'right': state.slidewidth,
                            'height': settings.height,
                            'width': 0,
                            'z-index': 12
                        }).animate({'width': settings.width}, settings.animduration, 'easeOutCubic', function() {
                            $('#intro-slider').fadeOut(700, function() {
                                $('#intro-slider').remove(); 
                            });
                        });

                    },250);
                
                }        

            };

            var go = function(direction, position) {

                // only if we're not already doing things
                if(!state.animating){

                    // doing things
                    state.animating = true;

                    $('.btn_build-quote').hide();

                    if(position){
                        state.nextslide = position;
                        state.nextindex = position-1;
                    }
                    else{
                        set_next(direction);
                    }

                    // fade animation
                    if(settings.animtype === 'fade'){

                        if(settings.showmarkers){
                            $m_markers.removeClass('active-marker');
                            $m_markers.eq(state.nextindex).addClass('active-marker');
                        }

                        // fade out current
                        $slides.eq(state.currentindex).fadeOut(settings.animduration);
                        // fade in next
                        $slides.eq(state.nextindex).fadeIn(settings.animduration, function(){

                            // update state variables
                            state.animating = false;
                            state.currentslide = state.nextslide;
                            state.currentindex = state.nextindex;

                        });

                    }

                    // disable prev button at start of slideshow
                    disablePrevBtn(0);

                    // reveal animation
                    if(settings.animtype === 'reveal'){

                        state.slidewidth = settings.width;
                
                        // add intro slide number to URL hash
                        /*if ($('#intro-slider').length > 0) {
                            insertParam('intcmp','exp-intro' + introcount);
                            introcount++;
                            if (introcount > (state.slidecount / 2)) {
                                introcount = 1;
                            }
                        }*/

                        // clone the first, current and next slide for masking
                        var $clone_firstSlide = $slides.eq(state.currentslide-1).children().clone(),
                            $clone_currentSlide = $slides.eq(state.currentslide).children().clone(),
                            $clone_nextSlide = $slides.eq(state.nextslide).children().clone();

                            // CSS3 transitions for modern browsers and fallback to jQuery for IE9 and below
                            if (Modernizr.csstransitions) {

                                // CSS3 transition version
                                // create masks of current and next slider and then animate
                                if (direction === 'previous') {
                                    $clone_currentSlide.prependTo($canvas).addClass('left-mask').addClass('previous-mask');
                                } else {
                                    $clone_nextSlide.prependTo($canvas).addClass('right-mask');
                                }

                                // timeout required for transition to work
                                setTimeout(function(){
                                    $(direction === 'previous' ? '.left-mask' : '.right-mask').css({
                                        'height': settings.height,
                                        'width' : settings.width
                                    });
                                },50);

                                // second reveal/slide activated just before first reveal/slide is complete
                                setTimeout(function(){

                                    if (state.currentslide === 2 && settings.automatic) {
                                        $clone_currentSlide = $slides.eq(state.currentslide-2).children().clone();
                                    }
                                    if (direction === 'previous') {
                                        $clone_nextSlide.prependTo($canvas).addClass('right-mask').addClass('previous-mask');
                                    } else {
                                        $clone_currentSlide.prependTo($canvas).addClass('left-mask');
                                    }

                                    setTimeout(function(){
                                        $(direction === 'previous' ? '.right-mask' : '.left-mask').css({
                                            'height': settings.height,
                                            'width' : settings.width,
                                            'z-index': 3
                                        });

                                        setTimeout(function(){
                                            $('.left-mask').remove();
                                            $('.right-mask').remove();
                                            $slider.css({'left': -state.nextindex * state.slidewidth }); 
                                            $('.jslider-next').css('visibility','visible');
                                            state.animating = false;
                                            if (state.currentslide > 17){
                                                $('.btn_build-quote').delay(300).stop().fadeIn(750);
                                            }
                                        },settings.animduration+50);
                                    },50);
                                },200);

                            } else {

                                // jQuery fallback animate version
                                // create masks of current and next slider and then animate
                                if (direction === 'previous') {
                                    $clone_currentSlide.prependTo($canvas).addClass('left-mask').addClass('previous-mask').css({

                                        'left': 0,
                                        'height': settings.height,
                                        'width': 0

                                    }).animate({'width': settings.width}, settings.animduration, 'easeOutCubic');
                                } else {
                                    $clone_nextSlide.prependTo($canvas).addClass('right-mask').css({

                                        'right': 0,
                                        'height': settings.height,
                                        'width': 0

                                    }).animate({'width': settings.width}, settings.animduration, 'easeOutCubic');
                                }

                                // second reveal/slide activated just before first reveal/slide is complete
                                setTimeout(function(){
                                    
                                    if (state.currentslide === 2 && settings.automatic) {
                                        $clone_currentSlide = $slides.eq(state.currentslide-2).children().clone();
                                    }

                                    if (direction === 'previous') {
                                        $clone_nextSlide.prependTo($canvas).addClass('right-mask').addClass('previous-mask').css({
                                            'left': state.slidewidth,
                                            'height': settings.height,
                                            'width': 0,
                                            'z-index': 3
                                        }).animate({'width': settings.width}, settings.animduration, 'easeOutCubic', function() {
                                            $('.left-mask').remove();
                                            $('.right-mask').remove();
                                            $slider.css({'left': -state.nextindex * state.slidewidth });        
                                            $('.jslider-next').css('visibility','visible');

                                            state.animating = false;
                                            if (state.currentslide > 17){
                                                $('.btn_build-quote').delay(300).stop().fadeIn(750);
                                            }
                                        });
                                    } else {
                                        $clone_currentSlide.prependTo($canvas).addClass('left-mask').css({
                                        'right': state.slidewidth,
                                        'height': settings.height,
                                        'width': 0,
                                        'z-index': 3
                                        }).animate({'width': settings.width}, settings.animduration, 'easeOutCubic', function() {
                                            $('.left-mask').remove();
                                            $('.right-mask').remove();
                                            $slider.css({'left': -state.nextindex * state.slidewidth });        
                                            $('.jslider-next').css('visibility','visible');

                                            state.animating = false;
                                            if (state.currentslide > 17){
                                                $('.btn_build-quote').delay(300).stop().fadeIn(750);
                                            }
                                        });

                                    }

                                },250);

                            }                      
                        
                        state.currentslide = state.nextslide + 1;
                        state.currentindex = state.nextindex + 1;
                        
                    }

                    // slide animation
                    if(settings.animtype === 'slide'){

                        if(settings.showmarkers){
                            
                            var markerindex = state.nextindex-1;

                            if(markerindex === state.slidecount-2){
                                markerindex = 0;
                            }
                            else if(markerindex === -1){
                                markerindex = state.slidecount-3;
                            }

                            $m_markers.removeClass('active-marker');
                            $m_markers.eq(markerindex).addClass('active-marker');
                        }

                        // if the slider is responsive && the calculated width is less than the max width
                        if(settings.responsive && ( responsive.width < settings.width ) ){
                            state.slidewidth = responsive.width;
                        }
                        else{
                            state.slidewidth = settings.width;
                        }
                        
                        state.slidewidth = settings.width;

                        $slider.animate({'left': -state.nextindex * state.slidewidth }, settings.animduration, function(){

                            state.currentslide = state.nextslide;
                            state.currentindex = state.nextindex;
                            
                            // is the current slide a clone?
                            if($slides.eq(state.currentindex).attr('data-clone') === 'last'){
                                
                                // affirmative, at the last slide (clone of first)
                                $slider.css({'left': -state.slidewidth });
                                state.currentslide = 2;
                                state.currentindex = 1;

                            }
                            else if($slides.eq(state.currentindex).attr('data-clone') === 'first'){

                                // affirmative, at the fist slide (clone of last)
                                $slider.css({'left': -state.slidewidth *(state.slidecount - 3)});
                                state.currentslide = state.slidecount - 2;
                                state.currentindex = state.slidecount - 3;

                            }

                            state.animating = false;

                        });

                    }

                }

            };

            // start the slideshow
            init();

        });

    };

})(jQuery);