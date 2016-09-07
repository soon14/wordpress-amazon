// JavaScript modules for Ford Owners Responsive site
// modules include language dropdown, flyout menus, subnav, banner change vehicle and widgets
// Author: Brett Chaney

var fordRad = fordRad || {};

fordRad.modules = function() { 

	var subNavHeight 		= $('#subnav > ul').height(),
		topLevelCalled 		= false,
		windowWidth 		= $(window).width(),
		imagesLoaded    	= false, //flag ensuring we are loading the images only once 
		toolbarWidth 		= null,
		isRtl 				= $("body").hasClass("rtl"),
		commonConfiture 	= undefined,
		restServicesConfig 	= null;
  
  	this.init = function() {

  		var start = new Date();
  		
		this.commonConfig();
  		
		// run on document ready
		this.loadImages();
		this.deviceClass();

		// initialise modules
		this.clearme();
		this.subnav();
		this.vehicleToggle();
		this.dealerToggle();
		this.centerToolbar();

		// open menu item by default for mobile/tablet
		this.triggerMenu();

		// this.formValidation();

		if ($('.widgets').length > 0) {
			this.widgetsInit();		
			this.widgets();
		}

		if (this.checkDataSnippet("#user") && ($(".dashboard-banner").length > 0 || $(".content-banner").length > 0)){
			this.bannerInfo();
		}

		this.fblike();

		// run account menu, language and search flyout function
		this.flyoutMenus();

		// set width and height for mobile/tablet menu and search dropdown
		$(document).ready(function() {
			// set tool bar visible
			$('body.ie8').css('visibility','visible');
			$('#toolbar').css('visibility','visible');

			// set heights and widths for mobile toolbar dropdown menus
			$('.smobile ul#toolbar > li > div > ul').each(function() {
				
				var subMenuWidth 	= windowWidth;
				$(this).css('width',subMenuWidth);

				var subMenuHeight 	= $(this).height();
				$(this).css('height',subMenuHeight);

			});

			// inject toolbar menu widths
			$('.smobile ul#toolbar > li > div > ul, .tablet ul#toolbar > li > div > ul').css('width', windowWidth);
		});
			
	};	

	this.triggerMenu = function(){
		
		$(function() {
			if (windowWidth < 993) {
				$(".top-level-menu > .js-reveal").trigger("click");
			}
		});	
		
	};

	this.themeCheck = function(theme){
		if ($("body").hasClass(theme)){
			return true;
		}
		else {
			return false;
		}
	};

  	this.deviceClass = function() {
		
		// add desktop class to body tag when window width is 977px and greater
		// add tablet class to body tag when window width is less than 977px and greater than 767px
		// add smobile class to body tag when window width is less than 768px 
		if (windowWidth > 976) {
			$('body').removeClass('tablet').removeClass('smobile').addClass('desktop');
		} else if (windowWidth < 977 && windowWidth > 767) {
			$('body').removeClass('desktop').removeClass('smobile').addClass('tablet');
		} else if (windowWidth < 768) {
			$('body').removeClass('desktop').removeClass('tablet').addClass('smobile');
		} else {
			$('body').removeClass('desktop').removeClass('tablet').removeClass('smobile');
		}

  	};

  	this.checkSiteType = function() {
  		var url = this.serviceLocator("common.user-agent");
  		return $.ajax({
			type: "GET",
			url: url,
			async: true,
			dataType: "json"
		});		
  	};
  	
  	this.isDesktop = function() {

  		// function to check for current device is a desktop
		// USEAGE: if (isDesktop()) { true } else { false }
		// NOTE!!! this is based on the window width, NOT on feature detection
  		if ($('body').hasClass('desktop')){
			return true;
		} else {
			return false;
		}

  	};

  	this.isMobile = function() {

  		// function to check for current device is a desktop
		// USEAGE: if (isMobile()) { true } else { false }
		// NOTE!!! this is based on the window width, NOT on feature detection
  		if ($('body').hasClass('smobile')){
			return true;
		} else {
			return false;
		}

  	};

  	this.isTablet = function() {

  		// function to check for current device is a desktop
		// USEAGE: if (isTablet()) { true } else { false }
		// NOTE!!! this is based on the window width, NOT on feature detection
  		if ($('body').hasClass('tablet')){
			return true;
		} else {
			return false;
		}

  	};
  
  	this.resizeWin = function() {
    	
  		windowWidth = $(window).width();

    	// functions to be run when the browser window is resized or orientation changes

  		// set device class for the body tag
		this.deviceClass();
		this.loadImages();

		// add missing divides to toolbar menu items
		$("#toolbar").children("li").children("div").removeClass("no-divide");


		// reload wookmark plugin for widgets for tablets and desktop 
		// otherwise if mobile close widgets and remove inline styles left from wookmark
		if ($('.widgets').length > 0) {
			if ($('body').hasClass('tablet') || $('body').hasClass('desktop')){
				this.widgetsInit();
			} else {
				// close widgets
			    $('.widgets-wrap li .content').removeClass('open').addClass('closed').parents("li").removeClass("active");

			    $('.widgets > ul > li').css({
			    	'position' 	: 'static',
			    	'left' 		: 'auto',
			    	'top'		: 'auto'
			    }).parents('.widgets, .widgets-wrap').css({
			    	'height'	: 'auto'
			    });
			}
		}
		
		
		if (this.isDesktop()) {

			// functions for desktop only
			$('#subnav .revealed').hide(0, function() {
				$(this).removeClass('revealed');
				$(this).parent().removeClass('reveal-open');
			});
			$('#subnav ul').show();

			// reset header
			$('#header').css('height','');

			// reset toolbar menus
			$('ul#toolbar ul').css({
				'top'			:'',
				'width' 		:''
			});
			$('ul#toolbar div.search-wrap ul').css({
				'visibility'	: 'visible',
				'width' 		: ''
			});
			$('ul#toolbar > li').first().css('margin-left','');
			$('ul#toolbar > li').first().css('margin-right','');

			// reset top level nav
			$('ul#nav').css({
				'visibility': 'visible',
				'overflow' 	: '',
				'width'	 	: '',
				'height'    :'auto' 
			}).find('.menu ul').css({
				'display' 	: '',
				'width' 	: ''
			});

			// reset subnav for desktop
			$('.desktop #subnav > ul').css({'height':'36px','overflow':'visible'});
			$('.desktop #subnav > ul > li > ul').css({'display':'none','right':'','left':''});
			if ($('.desktop #subnav > ul').find('.reveal-open').length === 0) {
				$('.subnav-level2').removeClass('subnav-open');
			}	

			$('.desktop #subnav > ul > li > ul.full-width').css({
				'margin-left' 	:'-406px',
				'text-align' 	:'center',
				'width' 		:'960px'
			});

		} else {

			// reset subnav for mobile
			$('.smobile #subnav > ul, .tablet #subnav > ul').css('height','auto');

			// functions for devices smaller than desktop
			if(!$('#subnav ul').hasClass('revealed')) {
				$('#subnav ul').hide();
			}

			// get new subnav height
			subNavHeight = $('#subnav > ul').height();
			
			$('#subnav > ul > li > ul.full-width').css({'margin-left':'','text-align':'left', 'width':''});

			// reset toolbar menus
			$('ul#toolbar > li > div > ul').css({
				'visibility'	: 'hidden',
				'width' 		: windowWidth
			});

			$('#header').css('height','');

			$('ul#toolbar > li > div').removeClass('opened').css('height','');

			this.centerToolbar();
		}

  	};

  	this.clearme = function() {

  		// clear inputs with the class "clearme"
		$('input.clearme').focus(function(){
			var inputVal = $(this).attr('title');
			$(this).blur(function(){
				if ($(this).val() === '') {
					$(this).val(inputVal);
				}
			});
			if ($(this).val() === '' || $(this).val() === inputVal) {
				$(this).val('');
			}
		});

  	};

  	this.loadImages = function() {


  		if (windowWidth > 767 && imagesLoaded == false) {
			var lazyloadImgs = $('img.lazy');

			// loop through images on desktop screens (larger than 976 pixels)
			// images with a 'data-hires' attribute will use the value of that 'data-src' as the IMG src
			for(var i = 0; i < lazyloadImgs.length; i++){

				if (lazyloadImgs[i].getAttribute('data-hires')) {
					lazyloadImgs[i].setAttribute("src", lazyloadImgs[i].getAttribute('data-hires'));
				}
			}
			imagesLoaded = true;
		} 
 
  	};
  		
	this.flyoutMenus = function() {
		
		var hasIconText = $('#toolbar').hasClass('icon-text');

		// reset toolbar variable
		toolbarWidth = null;

  		// get toolbar width
  		$('#toolbar > li').each(function() {
  			toolbarWidth += $(this).width();
  		});

  		// add class 'alt' to each odd list item on the Nav
  		// this is to add different padding values for items on the right on the mobile menu
  		$('#nav li:odd').each(function() {
  			$(this).addClass('alt');
  		});

		// add class="js-reveal" to the opening/close button
		$('span.js-reveal').live('click', function(e) {

			e.preventDefault();

			var fullHeight = (hasIconText) ? $(this).next().height() + 76 : $(this).next().height() + 52;

			$(this).parent().parent().siblings().children("div").removeClass("no-divide");

			if (!$(this).parent().hasClass('opened')) {
				$(this).parent().parent().next().children("div").addClass("no-divide");
			}

			$(this).parent().parent().siblings().find('.opened').removeClass('opened').children('ul').css('visibility','hidden').parents('#header').css('height','');

			if ($(this).parent().hasClass('opened')) {
				$(this).parent().removeClass('opened').children('ul').css('visibility','hidden').parents('#header').css('height','');
			} else {
				if (windowWidth > 976) {
					$(this).parent().addClass('opened').children('ul').css('visibility','visible').parents('#header').css('height','');
				} else {
					if (windowWidth > toolbarWidth) {
						$(this).parent().addClass('opened').children('ul').css({'visibility':'visible','top':''}).parents('#header').css('height', fullHeight + 70);
					} else {
						$(this).parent().addClass('opened').children('ul').css({'visibility':'visible','top':(hasIconText) ? 140 : 90}).parents('#header').css('height', (hasIconText) ? fullHeight + 120 : fullHeight + 94);
					}
					
				}
				
			}

		});

  	};

  	this.centerToolbar = function() {
  		
  		// reset toolbar variable
  		toolbarWidth = null;

  		// get toolbar width
  		$('#toolbar > li').each(function() {
  			var $this = $(this);
  			if(!$this.hasClass('social-share')){
  				toolbarWidth += $this.width();
  			}
  		});

  		if (windowWidth > toolbarWidth) {
  			if(isRtl){
  				$('.smobile #toolbar > li, .tablet #toolbar > li').first().css('margin-right',(windowWidth / 2) - (toolbarWidth / 2));
  			} else if (!this.themeCheck('apa')) {
  				$('.smobile #toolbar > li, .tablet #toolbar > li').first().css('margin-left',(windowWidth / 2) - (toolbarWidth / 2));
  			}
  		} else {
  			$('.smobile #toolbar > li, .tablet #toolbar > li').first().css('margin-left','');
  			$('.smobile #toolbar > li, .tablet #toolbar > li').first().css('margin-right','');
  		}

  	};

  	this.subnav = function() {

  		// subnav open and close for mobile
		$(document).on('click','.smobile #subnav .subnav-btn, .tablet #subnav .subnav-btn', function(e) {
			e.preventDefault();

			var subMenu = $(this).parent().find('ul').eq(0);

			if(subMenu.hasClass('revealed')) {
				subMenu.slideUp(200, function() {
					$(this).removeClass('revealed');
					$(this).parent().removeClass('reveal-open').parent().removeClass('sub-opened');
				});
			} else {
				$(this).parent().addClass('reveal-open').parent().addClass('sub-opened');
				subMenu.slideDown(200, function() {
					$(this).addClass('revealed');
				});
			}
		});

		// subnav second level animation for mobile
		$(document).on('click', '.smobile #subnav > ul > li > a, .tablet #subnav > ul > li > a', function(e) {
			
			// open second level nav if exists
			if ($(this).parent().find('ul').length > 0) {
				e.preventDefault();
				var newHeight = $(this).parent().children('ul').height();
				$(this).parent().parent().animate({height:newHeight});
				$(this).parent().children('ul').css({display: 'block', right: -windowWidth});
				$(this).parent().children('ul').animate({right: 10});
			}		
		});
		$(document).on('click', '.smobile #subnav ul li ul > li.title a, .tablet #subnav ul li ul > li.title a', function(e) {
			e.preventDefault();
			$(this).parent().parent().animate({right: -windowWidth}, function(){
				$(this).parent().parent().animate({height: subNavHeight}, 250, function() {
					$(this).find('ul').css({display: 'none'});
				});
			});		
		});

		if (windowWidth > 976) {
			$('.desktop #subnav > ul > li > ul.full-width').css({'margin-left':'-406px','text-align':'center','width':'960px'});
		} else {
			$('.desktop #subnav > ul > li > ul.full-width').css({'margin-left':'','width':''});
			$('.desktop #subnav > ul > li > ul.full-width').css({'margin-right':'','width':''});
		}
		

		

		if (Modernizr.touch) {
            
            $(document).on('click', '.desktop #subnav > ul > li > a', function(e) {

				// if there is no 2nd level then do not continue
				if ($(this).parent().find('ul').length === 0) {
					return;
				}

				e.preventDefault();

				var subMenuItem = $(this).parent().find('ul'),
					itemPos 	= $(this).parent().position(),
					leftItemPos = itemPos.left;

				if(subMenuItem.hasClass('revealed')) {
					subMenuItem.fadeOut(0, function() {
						$(this).removeClass('revealed');
					});	
					$('.desktop .subnav-level2').removeClass('subnav-open');
					$(this).parent().removeClass('reveal-open');
				} else {

					//if (leftItemPos > 300 ) {
						
					//}
					
					subMenuItem.addClass('align-right');
					
					

					$(this).parent().siblings('.reveal-open').find('ul').removeClass('revealed').hide().parent().removeClass('reveal-open');

					$('.desktop .subnav-level2').addClass('subnav-open');
					$(this).parent().addClass('reveal-open');
					subMenuItem.fadeIn(0, function() {
						$(this).addClass('revealed');
					});
				}

			});
            
        } else {

        	// subnav second level flyout for desktop
			$(document).on('mouseenter', '.desktop #subnav > ul > li', function(e) {

				// if there is no 2nd level then do not continue
				if ($(this).find('ul').length === 0) {
					return;
				}

				e.preventDefault();

				var subMenuItem = $(this).find('ul'),
					itemPos 	= $(this).position(),
					leftItemPos = itemPos.left;
				
					if(navigator.userAgent.indexOf("MSIE")>0){
						
						if(navigator.userAgent.indexOf("MSIE 9.0")>0){
							
							$("body").addClass("ie9");
						}
						if(navigator.userAgent.indexOf("MSIE 10.0")>0){
							
							$("body").addClass("ie9");
						}
					}

					//if (leftItemPos > 300 ) {
						subMenuItem.addClass('align-right');
					//}
						
						

					$(this).siblings('.reveal-open').find('ul').removeClass('revealed').hide().removeClass('reveal-open');

					$('.desktop .subnav-level2').addClass('subnav-open');
					$(this).addClass('reveal-open');
					subMenuItem.fadeIn(0, function() {
						$(this).addClass('revealed');
					});

			});

			// subnav second level flyout for desktop
			$(document).on('mouseleave', '.desktop #subnav > ul > li', function(e) {

				// if there is no 2nd level then do not continue
				if ($(this).find('ul').length === 0) {
					return;
				}

				e.preventDefault();

				var subMenuItem = $(this).find('ul'),
					itemPos 	= $(this).position(),
					leftItemPos = itemPos.left;

				
					subMenuItem.fadeOut(0, function() {
						$(this).removeClass('revealed');
					});	
					$('.desktop .subnav-level2').removeClass('subnav-open');
					$(this).removeClass('reveal-open');


			});

		}

  	};

  	this.vehicleToggle = function() {

  		// change vehicle toggle for mobile
		$('.mobile-banner .change-btn, .smobile .content-banner .change-btn').live('click', function(e) {
			e.preventDefault();
			$(this).parent().toggleClass('toggle-open');
		});

		// change vehicle slider for tablet/desktop
		$('.js-change-slider .change-btn').live('click', function(e) {

			e.preventDefault();

			$slider 	= $(this).parent().find('.thumb-wrap > div');
			$sliderWrap = $slider.parent().parent();

	    	if (parseInt($slider.css('right'),10) === 0) {
		    	$sliderWrap.removeClass('js-slider-open');
		    } else {
		    	$sliderWrap.addClass('js-slider-open');
		    }

			$slider.animate({
		      right: parseInt($slider.css('right'),10) === 0 ?
		        -$slider.outerWidth() :
		        0
		    }, function() {

		    });

		});

  	};

  	this.dealerToggle = function() {
  		
  		// hide 'locate a dealership' form
  		$('.locator .fbform').css('display','none');

  		$('.locator .mini-dealer-form h2').on('click', function(e) {

  			e.preventDefault();

  			if ($(this).hasClass('open')) {
  				$(this).removeClass('open').next().css('display','none');
  			} else {
  				$(this).addClass('open').next().css('display','block');
  			}
  			
  		});
	  	
  	};

  	this.widgetsInit = function() {
		if (windowWidth >= 320 && windowWidth < 768) {

			// close widgets
		    $('.widgets-wrap li .content').removeClass('open').addClass('closed');

		    $('.widgets > ul > li').css({
		    	'position' 	: 'static',
		    	'left' 		: 'auto',
		    	'top'		: 'auto'
		    }).parents('.widgets, .widgets-wrap').css({
		    	'height'	: 'auto'
		    });

		} else if (windowWidth >= 768) {

			// open widgets
		    $('.widgets-wrap li .content').removeClass('closed').find('.content-inside').css('display','');

			var wookmarkOptions = {
		        container: $('.widgets'),
		        offset: 20
		    };

		    function wookmarkInit(){
				var handler = $('.widgets > ul > li');
				
				$('.widgets ul').imagesLoaded(function(){
					handler.wookmark(wookmarkOptions);
				});

				handler.wookmark(wookmarkOptions);

				// update widget container height to add top and bottom padding
				var widgetHeight = $('.widgets').height();
				$('.widgets-wrap').css('height', widgetHeight + 68);
			}

			if ($('.widgets ul img').length > 0){
				$('.widgets ul').imagesLoaded(wookmarkInit());
			}
			else{
				wookmarkInit();
			}

		    
		}

  	};

  	this.widgets = function() {

  		$('.widgets h2 > a').live('touchstart, click', function(e) {
			
			if (e.target == this){
				if ($(this).parent().parent().hasClass('open')) {
	                $(this).parent().parent().removeClass('open').addClass('closed');
	            } else {
	                $(this).parent().parent().removeClass('closed').addClass('open');
	            }
			}
  			
	        
	        e.preventDefault();
  			e.stopPropagation();

  		});
  		

  	};

  	this.fblike = function() {
  		var fblikeButton = $('#facebook-page-like'),
				fblike = fblikeButton.parent(),
				url = window.location.href,
				done;
			
			//Fade In Social Widgets
			function doneFn() {
				if( !done ) {
					fblike.parent().find('.social-widget').fadeIn(200);
					done = true;					
				}
			}
			
			if( fblikeButton.size() &&  fblike.size() ) {
				fblike.html( fblikeButton.val().replace('##REPLACEURL##', escape(url.split('#')[0]).replace("\/", "%2F", "g") ));
				//Once the facebook like iframe is loaded.. Fade all social widgets in.
				fblike.find('iframe').bind('load', doneFn);
				//Set a timeout incase the face book iframe takes too long.
				setTimeout(doneFn, 2e3);
			}
  	};

  	this.commonConfig = function() {
  		if (fordRad.modules.commonConfiture === undefined) {
  			fordRad.modules.commonConfiture = $('#common-config').embeddedData();
  		} 
  		return fordRad.modules.commonConfiture;
  	};
  	
  	this.serviceLocator = function(service) {
  		if (fordRad.modules.restServicesConfig == null) {
  			if(!$("#rest-services").size()) {
  				return;
  			}
  			fordRad.modules.restServicesConfig = $('#rest-services').embeddedData();
  		}
  		
  		if (fordRad.modules.restServicesConfig[service]){
  			var url = fordRad.modules.restServicesConfig[service].replace('{site}', this.commonConfig().site);
  			return url.replace('{locale}', this.commonConfig().locale);
  		}
  		
  	};

  	this.bannerInfo = function() {
  		var data = $('#user').embeddedData(),
  			container = $(".dashboard-banner"),
  			contentContainer = $(".content-banner"),
  			intro = $(".intro",container);

  	
  		if (container.length > 0 && intro.length > 0){    			
  			$("#intro-template").tmpl(data).prependTo(intro);  
  			$(".desktop-banner .details").prepend($("#intro-detail-template").tmpl(data));
  			$(".mobile-banner .details").append($("#intro-detail-template").tmpl(data));
  			if (data.numberOfVehicles > 1){
  				$("#vehicles-template").tmpl(data).appendTo($(".dashboard-banner.desktop-banner"));
  				$("#vehicles-template").tmpl(data).appendTo($(".dashboard-banner.mobile-banner div.details"));
  				$(".dashboard-banner.desktop-banner").find(".change").addClass("js-change-slider");
	  			$(".change",container).css("display","block");
	  		}
  		}

  		if (contentContainer.length > 0){

  			$(".details",contentContainer).prepend($("#user-detail-template").tmpl(data));
  			if (data.numberOfVehicles >= 1){
  				$("#vehicles-template").tmpl(data).appendTo($(".content-banner .details"));
  				$(".content-banner .details").find(".change").addClass("js-change-slider");
	  			$(".change",container).css("display","block");
	  		}
  		}
  	};

  	this.checkUserLogin = function(){
  		var serviceUrl = this.serviceLocator("owner.status");
        
        //should not be needed anymore as server returns "no cache" response headers
  		//var randomNum = Math.random();
        //serviceUrl = serviceUrl + "?randomNum=" + randomNum;
        
  		return $.ajax({
  			url: serviceUrl,
  			async: true,	//this calls should async
  			dataType: 'json'
  		});	
  	};

  	this.checkDataSnippet = function(elem){
  		return $(elem).size() && $(elem).html() !== '';
  	};

  	
};

var instance = null;

$(function(){
  	instance = new fordRad.modules();
  	// run modules
  	instance.init();

  	// only execute resize function if the width has change, not the height 
  	// fixes keyboard popup issue on older smobile OS's
  	var currentWidth = $(window).width();
  	$(window).on('resize', function() {
  		var newWidth = $(window).width();	

  		if (newWidth !== currentWidth) {
  			instance.resizeWin();
  		}
  		
  		// update current width
  		currentWidth = newWidth;
  	});
});