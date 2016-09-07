;(function($) {

    "use strict";
    var metaTitle = $("meta[name='og:title']").attr("content") ||''; 
	var metaDesc = $("meta[name='og:description']").attr("content")||'';
	jiathis_config = {
		title: metaTitle,
		summary:metaDesc,
        pic:''
	};
	
	addthis_share_config = 
	{
    title: metaTitle,
    description: metaDesc,
    screenshot: ''
	};
	
    $.fn.slideshow = function(o) {
        
        // slider default settings
        var defaults        = {

            // transition values
            animduration    : 600,      // length of transition
            animspeed       : 4000,     // delay between transitions
            automatic       : false,    // enable/disable automatic slide rotation

            // control configuration
            showcontrols    : true,     // enable/disable next + previous UI elements
            nexttext        : 'Next',   // text/html inside next UI element
            prevtext        : 'Prev',   // text/html inside previous UI element

            // interaction values
            keyboardnav     : true      // enable/disable keyboard navigation

        };

        // create settings from defauls and user options
        var settings            = $.extend({}, defaults, o);
       

        return this.each(function(){

            // slider elements
            var $slider         = $(this),
                $slides         = $slider.children('li'),
                $slidecounter   = null,
                $t_wrapper      = null,
                $timeline       = null,
                $t_markers      = null,

                // control elements
                $c_wrapper      = null,
                $c_fwd          = null,
                $c_prev         = null;

            // state management object
            var state           = {
                slidecount      : $slides.length,   // total number of slides
                animating       : false,            // bool: is transition is progress
                paused          : false,            // bool: is the slider paused
                currentslide    : 0,                // current slide being viewed (not 0 based)
                nextslide       : 0,                // slide to view next (not 0 based)
                currentindex    : 0,                // current slide being viewed (0 based)
                nextindex       : 0,                // slide to view next (0 based)
                interval        : null              // interval for automatic rotation
            };

            var responsive      = {
                width           : null,
                height          : null
            };

            // helpful variables
            var vars            = {
                fwd             : 'forward',
                prev            : 'previous'
            };

            var imgArray        = [],
                tnArray         = [];

            // run through options and initialise settings
            var init = function() {

                // differentiate slider li from content li
                $slider.children('li:first').addClass('activeslide');
                $slider.children('li:last').addClass('prevslide');
                var picURL = $slider.children('li:first').children('.full-width-bg').attr("src");
                if (picURL.indexOf('http') < 0){
                    jiathis_config.pic = 'http://' + document.domain + picURL;
					addthis_share_config.screenshot = 'http://' + document.domain + picURL;
                }
                else{
                    jiathis_config.pic = picURL;
					addthis_share_config.screenshot = picURL;
                }

                

                // add each slide img src into array 
                $slides.find('img.full-width-bg').each(function(index) {

                    if (!Modernizr.touch) {
                        $('<div class="left-arrow-boundary lhover" />').insertBefore($(this));
                        $('<div class="right-arrow-boundary rhover" />').insertBefore($(this));  
                    }
                    
                    var imgHTML = $(this);
                    imgArray.push(imgHTML);

                    // remove images from DOM (except for the first two and last slides)
                    if(index > 1 && index != state.slidecount-1) {
                        $(this).remove();
                    }

                });

                // configurations only available if more than 1 slide
                if( state.slidecount > 1 ){

                    // create and show controls
                    if( settings.showcontrols ){
                        conf_controls();
                    }

                    // conf slide animation
                    conf_slide();

                    // enable slidenumboard navigation
                    if( settings.keyboardnav ){
                        conf_keynav();
                    }

                    // enable swipe
                    if( !settings.automatic ) {
                        conf_swipe();
                    }

                    // start timeline and bottom right slide counter
                    conf_timeline();
                    conf_slidecount();

                    // Finally, if automatic is set to true, kick off the interval
                    if(settings.automatic){
                        state.interval = setInterval(function () {
                            next_slide();
                        }, settings.animspeed);
                    } 

                    if(window.location.hash) {
                        checkHash();
                    } else {
                        insertHash('slide','1');
                    }

                    setTimeout(function() {
                        update_timeline('external');
                    },300);
                    deeplinktrack();
                    updateJiathis();
                }

            };

            var conf_slide = function() {

                responsive.width    = $(window).innerWidth();
                responsive.height   = $(window).innerHeight();

                // initial setup
                $('.slideshow-controls').css({
                    'width'         : responsive.width
                });

                // hide slides and before initial resize adjustment
                $slides.hide();

                // resize images once images are fully loaded
                $slider.imagesLoaded( function(){
                        resize_images('initial');
                        resize_timeline();
                    }
                 );
          
                $(window).resize(function() {
                    // calculate and update dimensions
                    responsive.width    = $(window).innerWidth();
                    responsive.height   = $(window).innerHeight();

                    $slides.css({
                        'height'        : responsive.height,
                        'width'         : responsive.width
                    });
                    $('.slideshow-controls').css({
                        'width'         : responsive.width
                    });

                    resize_images();
                    resize_timeline();

                });

            };

            var resize_images = function(initial, currentSlide) {

                // display slides after page load
                if (initial) $slides.show();

                responsive.width    = $(window).innerWidth();
                responsive.height   = $(window).innerHeight();

                var bgCSS           = {left: 0, top: 0}, 
                    rootWidth       = responsive.width, 
                    bgWidth         = rootWidth, 
                    rootHeight      = responsive.height, 
                    imgRatio        = $slides.eq(1).find('img.full-width-bg').width() / $slides.eq(1).find('img.full-width-bg').height(),
                    bgHeight        = bgWidth / imgRatio, 
                    bgOffset;

                // make adjustments based on image ratio
                if (bgHeight >= rootHeight) {
                    
                    bgOffset        = (bgHeight - rootHeight) / 2;
                    bgCSS.top       = '-' + bgOffset + 'px';
                    
                } else {
                    
                    bgHeight        = rootHeight;
                    bgWidth         = bgHeight * imgRatio;
                    bgOffset        = (bgWidth - rootWidth) / 2;
                    //bgCSS.left      = '-' + bgOffset + 'px';
                    
                }
  
                // only resize next or previous preloaded slide image
                if (currentSlide) {
                    $slides.eq(currentSlide).find('img.full-width-bg').parent().css({width: rootWidth, height: rootHeight})
                            .find('img.full-width-bg').css({width: bgWidth, height: bgHeight}).css(bgCSS);
                } else {
                    $slides.find('img.full-width-bg').each(function() {

                        $(this).parent().css({width: rootWidth, height: rootHeight})
                                .find('img.full-width-bg').css({width: bgWidth, height: bgHeight}).css(bgCSS);
                    });
                }

            };

            var conf_slidecount = function() {

                // create the element for slide counter
                $slidecounter = $('<div class="slide-counter"><span class="current"></span><span class="total"></span></div>');

                $slidecounter.insertAfter($slider);

                $('.slide-counter .current').html(1);
                $('.slide-counter .total').html(state.slidecount);

            };

            var update_slidecount = function() {

                var $slideCounter = $('.slide-counter .current');

                if($slideCounter.html().length > 1) {
                    $slideCounter.css({
                        'top'   : '-13px',
                        'right' : '32px'
                    });
                    // wrap span around first character
                    $slideCounter.each(function() {
                        var text    = $(this).html(),
                            first   = $('<span>'+text.charAt(0)+'</span>').addClass('caps');
                        $(this).html(text.substring(1)).prepend(first);

                    });
                } else {
                    $slideCounter.css({
                        'top'   : '-1px',
                        'right' : '33px'
                    });
                }

            };

            var resize_timeline = function() {

                var itemsFullWidth  = ($(window).innerWidth() - $('.timeline-wrapper li').eq(0).width()) - $('.timeline-wrapper li').last().width();
                var itemWidth       = parseInt(itemsFullWidth / ($('.timeline-wrapper li').length - 2));

                $('.timeline-wrapper li:gt(0)').not(':last').css('width', itemWidth);
                $('.timeline-wrapper li:eq(1)').css('width', itemWidth - 20 );
                $(".timeline-wrapper ul li").not(':last').each(function() {

                    // highlight the correct slide item in the timeline
                    if ($('.timeline-wrapper.thumbnail-timeline')[0]) {
                        var currentPos  = $(this).position(),
                            leftPos     = currentPos.left,
                            itemWidth   = $(this).width(),
                            offsetWidth = (itemWidth / 2) + 1;

                        $(this).find('.arrow').css('left',(leftPos + offsetWidth));
                    }
                    

                });

            };

            var thumbnails = function() {

                // add each slide thumbnail src into array 
                $slides.each(function(index) {
                    
                    var tnSrc = $(this).data('thumbnail');
                    tnArray.push(tnSrc);

                });

                $('.timeline-wrapper ul li').each(function(index) {

                    if (tnArray[index] != undefined) {

                        var imageHtml       = $('<img src="' + tnArray[index] + '" />'),
                            thumbnailHtml     = $('<span class="thumbnail"></span>');

                        // add thumbnails to each timeline item
                        thumbnailHtml.appendTo($(this).find('.divide'));
                        imageHtml.appendTo($(this).find('span.thumbnail'));

                        if ($(this).find('.thumbnail img').attr('src')[0]) {
                            $(this).find('a').hoverIntent(fadeThumbnailIn, fadeThumbnailOut);
                        }           

                    }

                });

                function fadeThumbnailIn(){
                    var itemWidth       = $(this).parent().width(),
                        thumbnailWidth  = $(this).parent().find('span.thumbnail').width(),
                        leftMargin      = (itemWidth - thumbnailWidth) / 2;
	                    if($(this).parents('li.first-item').length > 0){
	                    	leftMargin -=10;
	                    }
                    $(this).parent().find('span.thumbnail').css('margin-left',leftMargin).stop(true, true).fadeIn().css('display','block');
                }

                function fadeThumbnailOut(){
                    $(this).parent().find('span.thumbnail').stop(true, true).fadeOut();
                }

                if ($('.thumbnail')[0]) {
                   $('.timeline-wrapper').addClass('thumbnail-timeline');
                  // $('.timeline-wrapper.thumbnail-timeline').find('div.arrow').remove();
                }

            };
			var deeplinktrack=function(){
					
					 $omidata = $(".slideshow .activeslide>img");
					 var $opname = $omidata.attr("data-pname");
					 var $ohier = $omidata.attr("data-hier");
					 ND.analyticsTag.trackOmniturePage({
                        pname: $opname,
                        hier: $ohier
                    });
					
				}
				;
			var clicktrack = function(){
                
                    $omidata = $(".slideshow .activeslide>img");
                    var $opname = $omidata.attr("data-pname");
                    var $oname = $omidata.attr("data-name");
                    var $otype = $omidata.attr("data-type");
                    var $oclick = $omidata.attr("data-onclicks");
                    var $ohier = $omidata.attr("data-hier");
                    
                    ND.analyticsTag.trackOmniturePage({
                        pname: $opname,
                        hier: $ohier,
                        onclicks: $oclick,
                        type: $otype,
                        name: $oname
                    });
                    
                
                };

            var conf_timeline = function() {        

                // create a wrapper for our markers
                $t_wrapper = $('<div class="timeline-wrapper"></div>');
                $timeline = $('<ul></ul>');

                // hide timeline
                $timeline.hide();              

                // for every slide, create a marker
                $.each($slides, function(key, slide){

                    var slidenum    = key + 1,
                        gotoslide   = key + 1,
                        dataGroup   = $(this).data('group').toString().toLowerCase(),
                        marker      = $('<li><div class="bg"><div class="divide"><a href="#">'+ dataGroup +'</a></div></div></li>');

                    // set the first marker to be active
                    if(slidenum === state.currentslide+1){ marker.addClass('active').append('<div class="arrow" />'); }

                    // bind the click event
                    marker.on('click','a',function(e){
                        e.preventDefault();
                        if(!state.animating){
                            goto_slide(gotoslide);
                        }
						clicktrack();
                    });

                    // add the marker to the wrapper
                    marker.appendTo($timeline);

                });
               
                setTimeout(function() {
                    // remove duplicate list items in the timeline
                    var seen = {};
                    $('.timeline-wrapper li').each(function() {
                        var txt = $(this).text();
                        if (seen[txt]) {
                            $(this).remove();
                        } else {
                            seen[txt] = true;
                        }
                    });
                    
                    $('.timeline-wrapper li').eq(1).addClass('first-item');
                     
                    // show timeline when duplicates are removed 
                    $timeline.show();

                    // append empty list item at the end of the timeline
                    
                    if (Modernizr.touch){
                        $timeline.append('<li style="width:5px"></li>');
                    }
                    else {
                        $timeline.append('<li style="width:30px"></li>');
                    }

                    // calculate timeline item widths
                    var itemsFullWidth  = ($(window).innerWidth() - $('.timeline-wrapper li').eq(0).width()) - $('.timeline-wrapper li').last().width();
                    var itemWidth       = parseInt(itemsFullWidth / ($('.timeline-wrapper li').length - 2));

                    $('.timeline-wrapper li:gt(0)').not(':last').css('width', itemWidth);
                    $('.timeline-wrapper li:eq(1)').css('width', itemWidth - 20);

                    // calculate if there is a remainder between the window and timeline li's and then add the remainder to the last li
                    var timelineWidth = 0;
                    $('.timeline-wrapper li').each(function() {
                        timelineWidth += parseInt($(this).outerWidth());
                    });
                    
                    if (timelineWidth < $(window).innerWidth()) {  
                        var remainderWidth = $(window).innerWidth() - timelineWidth,
                            lastItemWidth = $('.timeline-wrapper li').last().width() + remainderWidth;
                        $('.timeline-wrapper li').last().css('width',lastItemWidth);
                    }

                },0);

                $t_wrapper.insertAfter($slider);
                $timeline.appendTo($t_wrapper);
                $t_markers = $timeline.find('li');

                setTimeout(function(){
                    $('.timeline-wrapper li').last().addClass('last-item');
                },200);

                // run thumbnails
                if (!Modernizr.touch) {
                    thumbnails();
                }

            };

            var conf_controls = function() {

                // create the elements for the controls
                $c_wrapper      = $('<ul class="slideshow-controls"></ul>');
                $c_fwd          = $('<li class="slideshow-next"><a href="#" class="rhover" data-direction="'+ vars.fwd +'">' + settings.nexttext + '</a></li>');
                $c_prev         = $('<li class="slideshow-prev"><a href="#" class="lhover" data-direction="'+ vars.prev +'">' + settings.prevtext + '</a></li>');

                // bind click events
                $c_wrapper.on('click','a',function(e){

                    e.preventDefault();
                    var direction = $(this).attr('data-direction');

                    if(!state.animating){
                        if(direction === vars.fwd){
                            next_slide();
                        }
                        if(direction === vars.prev){
                            prev_slide();
                        }
						clicktrack();
                    }

                });

                // put 'em all together
                $c_prev.appendTo($c_wrapper);
                $c_fwd.appendTo($c_wrapper);
                $c_wrapper.insertAfter($slider);

                // inital reveal of controls on page load
                setTimeout(function(){
                    $('.slideshow-prev a').fadeIn().css("display","block").delay(2000).fadeOut();
                },300);
                    
                setTimeout(function(){
                    $('.slideshow-next a').fadeIn().css("display","block").delay(2000).fadeOut();
                },300);

                // hover over canvas to reveal controls
                $('.lhover').on({
                    mouseenter: function(){
                        $('.slideshow-prev a').stop(true, true).show();
                    },
                    mouseleave: function(){
                        $('.slideshow-prev a').stop(true, true).hide();
                    }
                });
                $('.rhover').on({
                    mouseenter: function(){
                        $('.slideshow-next a').stop(true, true).show();
                    },
                    mouseleave: function(){
                        $('.slideshow-next a').stop(true, true).hide();
                    }
                });

            };

            var conf_keynav = function() {

                $(document).keyup(function (event) {

                    if (!state.paused) {
                        clearInterval(state.interval);
                        state.paused = true;
                    }

                    if (!state.animating && $('.overbox-wrap').length === 0) {
                        if (event.keyCode === 39) {
                            event.preventDefault();
                            next_slide();
                        } else if (event.keyCode === 37) {
                            event.preventDefault();
                            prev_slide();
                        }
						clicktrack();
                    }

                    if (state.paused && settings.automatic) {
                        state.interval = setInterval(function () {
                            next_slide();
                        }, settings.animspeed);
                        state.paused = false;
                    }

                });

            };

            var conf_swipe = function() {

                if (Modernizr.touch) {
                    // bind swipe events
                    if(!state.animating && $('.overbox-wrap').length === 0){
                        $slider.touchwipe({
                            wipeLeft: function() {
                                next_slide();
								clicktrack();
                            },
                            wipeRight: function() {
                                prev_slide();
								clicktrack();
                            },
                            min_move_x: 20,
                            preventDefaultEvents: true
                        });

                    }
                }   

            };

            var checkHash = function() {

                // attach slide number to URL hash
                var currentHash         = window.location.hash,
                    currentNum          = currentHash.replace('#slide',''),
                    currentNumStripped  = currentNum.replace(/\D/g,'');

                if(currentNumStripped != 1 && currentNumStripped <= state.slidecount) {
                    goto_slide(currentNumStripped, 'external');
                }
                
            };
            
            var insertHash = function(key, value) {

                // attach slide number to URL hash
                var encodedKey = encodeURIComponent(key), encodedValue = encodeURIComponent(value);
                document.location.hash = encodedKey + encodedValue;

            };

            var updateJiathis = function() {
                var currentIMG = $slides.eq(state.currentslide).find('img.full-width-bg');
                var slideAlt = currentIMG.attr('alt');
                if(typeof jiathis_config !=='undefined') {
                    jiathis_config.summary = slideAlt;
                    var picURL = currentIMG.attr('src');
                    if (picURL.indexOf('http') < 0){
                        jiathis_config.pic = 'http://' + document.domain + picURL;
                    }
                    else {
                        jiathis_config.pic = picURL;
                    }
                }
				
				if(typeof addthis_share_config !=='undefined') {
                    addthis_share_config.description = slideAlt;
                    var picURL = currentIMG.attr('src');
                    if (picURL.indexOf('http') < 0){
                        addthis_share_config.screenshot = 'http://' + document.domain + picURL;
                    }
                    else {
                        addthis_share_config.screenshot = picURL;
                    }
                }

            };

            var update_timeline = function(fromExternal) {

                // get current slide data-group
                var currentGroup = $('ul.slideshow li').eq(state.currentslide).data("group").toString().toLowerCase();

                $(".timeline-wrapper ul li").not(':last').each(function() {

                    $(this).find('.arrow').remove(); 

                    // highlight the correct slide item in the timeline
                    if ($('a', this).html() == currentGroup) { 
                        $t_markers.removeClass('active');

                        $(this).addClass('active').append('<div class="arrow" />');

                        if ($('.timeline-wrapper.thumbnail-timeline')[0]) {
                            var currentPos  = $(this).position(),
                                leftPos     = currentPos.left,
                                itemWidth   = $(this).width(),
                                offsetWidth = (itemWidth / 2) + 1;
                            	if($(this).hasClass('first-item')){
                            		offsetWidth +=10;
                            	}
                            $(this).find('.arrow').css('left',(leftPos + offsetWidth));
                        }
                    } 

                });

                // update slide counter
                $('.slide-counter .current').html(state.currentslide+1);
                update_slidecount();
                
                updateJiathis();
                
                if (!fromExternal) {
                    insertHash('slide',state.currentslide+1);
                }                

                $slides.each(function(index) {
                   
                    // remove duplicate full width images
                    if ($(this).find('img.full-width-bg').length > 1) {
                        $(this).find('img.full-width-bg')[1].remove();
                    }
                    if(!$(this).hasClass("slide"+(index+1))){
                    	$(this).addClass("slide"+(index+1));
                    }
                    
                });

            };

            var next_slide = function() {

                if(state.animating) return false;   // abort if currently animating
                else state.animating = true;        // otherwise set animation marker

                var liveslide = $slider.find('.activeslide'); // find active slide
                $('.prevslide').removeClass('prevslide');
                liveslide.removeClass('activeslide').addClass('prevslide'); // remove active class & update previous slide

                // get the slide number of new slide
                state.currentslide + 1 == state.slidecount ? state.currentslide = 0 : state.currentslide++;

                var nextslide = $('ul.slideshow li:eq('+state.currentslide+')'),
                    prevslide = $slider.find('.prevslide');

                nextslide.css('visibility','hidden').addClass('activeslide');   // update active slide

                // load next slide image
                var loadSlide = false;

                // determine next slide
                if (state.currentslide == state.slidecount - 1) {
                    loadSlide = 0;
                }  else {
                    loadSlide = state.currentslide + 1;   
                }

                if (nextslide.next().find('img.full-width-bg').length < 1) {
                    
                    var img = $(imgArray[loadSlide]);
                    $('ul.slideshow li:eq('+loadSlide+')').prepend(img);

                    resize_images(false, loadSlide);
                }

                nextslide.css({left : $slider.width(), 'visibility': 'visible'}).animate({ left:0, avoidTransforms : false }, settings.animduration, function(){ after_animation(); });
                liveslide.animate({ left: -$slider.width() }, settings.animduration );

                update_timeline();

            };

            var prev_slide = function() {

                if(state.animating) return false;   // abort if currently animating
                else state.animating = true;        // otherwise set animation marker

                var liveslide = $slider.find('.activeslide'); // find active slide
                $('.prevslide').removeClass('prevslide');
                liveslide.removeClass('activeslide').addClass('prevslide'); // remove active class & update previous slide

                // get the slide number of new slide
                state.currentslide == 0 ? state.currentslide = state.slidecount - 1 : state.currentslide--;

                var nextslide = $('ul.slideshow li:eq('+state.currentslide+')'),
                    prevslide = $slider.find('.prevslide');

                nextslide.css('visibility','hidden').addClass('activeslide');   // update active slide

                // load next slide image
                var loadSlide = false;

                // determine next slide
                if (state.currentslide == state.slidecount - 1) {
                    loadSlide = state.slidecount - 2;
                }  else {
                    loadSlide = state.currentslide;   
                }

                if (prevslide.prev().find('img.full-width-bg').length < 1) {
                    
                    var img = $(imgArray[loadSlide]);
                    $('ul.slideshow li:eq('+loadSlide+')').prepend(img);

                    resize_images(false, loadSlide);
                }

                // animate slides
                nextslide.css({left : -$slider.width(), 'visibility': 'visible'}).animate({ left:0, avoidTransforms : false }, settings.animduration, function(){ after_animation(); });              
                liveslide.css({left : 0}).animate({ left: $slider.width() }, settings.animduration );

                update_timeline();

            };

            var goto_slide = function(targetSlide, external) {
                
                if(targetSlide === state.currentslide+1) return false;

                if(state.animating) return false;      // abort if currently animating
                else state.animating = true; 

                // get the slide number of new slide
                state.currentslide = targetSlide-1;

                var liveslide = $slider.find('.activeslide'); // find active slide
                    $('.prevslide').removeClass('prevslide');
                    liveslide.removeClass('activeslide').addClass('prevslide'); // remove active class & update previous slide

                var nextslide = $('ul.slideshow li:eq('+state.currentslide+')'),
                    prevslide = $slider.find('.prevslide'),
                    prevIndex = $slider.find('.prevslide').index() + 1;

                nextslide.css('visibility','hidden').addClass('activeslide');

                // load next slide image
                var loadSlide = false;

                // determine next slide
                if (state.currentslide == state.slidecount - 1) {
                    loadSlide = 0;
                }  else {
                    loadSlide = state.currentslide + 1;   
                }

                if ($('ul.slideshow li:eq('+targetSlide+')').html() != undefined && $slider.find('.activeslide').prev().html() != undefined) {
                    var preImg = $(imgArray[loadSlide-2]),
                        img = $(imgArray[loadSlide-1]),
                        postImg = $(imgArray[loadSlide]);

                    if (!$('ul.slideshow li:eq('+(loadSlide - 2)+')').find('.full-width-bg')[0]) {
                        $('ul.slideshow li:eq('+(loadSlide - 2)+')').prepend(preImg);
                    }
                    
                    if (!$('ul.slideshow li:eq('+(loadSlide - 1)+')').find('.full-width-bg')[0]) {
                        $('ul.slideshow li:eq('+(loadSlide - 1)+')').prepend(img);
                    }

                    if (!$('ul.slideshow li:eq('+(loadSlide)+')').find('.full-width-bg')[0]) {
                        $('ul.slideshow li:eq('+(loadSlide)+')').prepend(postImg);
                    }

                    resize_images(false, loadSlide-2);
                    resize_images(false, loadSlide-1);
                    resize_images(false, loadSlide);
                
                }

                if (state.currentslide >= prevIndex) {
                    // animate slides forward
                    nextslide.css({left : $slider.width(), 'visibility': 'visible'}).animate({ left:0, avoidTransforms : false }, settings.animduration, function(){ after_animation(); });
                    liveslide.animate({ left: -$slider.width(), avoidTransforms : false }, settings.animduration );
                } else {
                    // animate slides backwards
                    nextslide.css({left : -$slider.width(), 'visibility': 'visible'}).animate({ left:0, avoidTransforms : false }, settings.animduration, function(){ after_animation(); });              
                    liveslide.css({left : 0}).animate({ left: $slider.width() }, settings.animduration );
                }
                
                if (!external) {
                    update_timeline();
                }
                

            };

            var after_animation = function() {
                
                state.animating = false;
                return false;
            
            };

            // start the slideshow
            init();

        });

    };

})(jQuery);