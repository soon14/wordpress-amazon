var jiathis_config; 
var addthis_share_config;

var lincoln = (function(lincoln, $) {

	var $win = $(window);

	lincoln.overbox = function() {

		return {

			init: function() { 

				var currHash = document.location.hash;

				var openOverlay = function(overboxLink) {

					if (Modernizr.touch) {
	                	var reinitialiseScrollPane = function(){
							$('.scroll-pane').jScrollPane({
								autoReinitialise 		: false,
								verticalDragMinHeight 	: 153,
								verticalDragMaxHeight 	: 153
							});
						}
	                } else {
	                	var reinitialiseScrollPane = function(){
							$('.scroll-pane').jScrollPane({
								autoReinitialise 		: true,
								verticalDragMinHeight 	: 153,
								verticalDragMaxHeight 	: 153
							});
						}
	                }

					$('.overbox-wrap').remove();

                		$('body').append('<div class="overbox-wrap" />');

                		var $overbox 			= $('.overbox-wrap');

                		$overbox.load(overboxLink, function() {

                			$wait(function() {

                				setTimeout(function() {

		                			var $overboxContainer 	= $('.overbox-container');
		                			var $extraBg = $('.extra-bg', $overboxContainer);

			                		$overboxContainer.prepend('<div class="close"><a href="#">close</a></div>');

			                		var boxHeight 			= $overboxContainer.height(),
			                			rwidth    			= $win.innerWidth(),
			                    		rheight   			= $win.innerHeight();

					                $overboxContainer.css({
					                	marginTop : -boxHeight / 2
					                });

									$overbox.css({
										height: rheight,
										width: rwidth
									});

									$overbox.show();
			                		$overboxContainer.show();

			                		// attach '&overlay' to URL hash
									var currentHash = document.location.hash;
									if (currentHash.indexOf('overlay') > -1) {
										
									} else {
										document.location.hash = currentHash + '&overlay';
									}
		                			

		                			function updateHash() {
		                				currentHash = document.location.hash;
					                	if (currentHash.indexOf('&overlay') > -1) {
					                		var URLstring		= document.location.hash.replace(/^.*?#/, ''),
					                			spliceString  	= URLstring.replace('&overlay','');

					                		// remove '&overlay' from hash
					                		document.location.hash = spliceString;

				                		}
		                			}

				                	$overboxContainer.find('.close').on('click','a',function(e){
					                	e.preventDefault();
					                	updateHash();
					                	$overbox.remove();
					                	var picURL = $('.slideshow .activeslide img').attr("src");
					                	if (picURL.indexOf('http') < 0){
					                		jiathis_config.pic = 'http://' + document.domain + picURL;
											addthis_share_config.screenshot = 'http://' + document.domain + picURL;
					                	}
					                	else {
					                		jiathis_config.pic = picURL;
											addthis_share_config.screenshot = picURL;
					                	}
					                	
					                });

					                // close overlay when click outside of box
					               	$(document).click(function() {
					               		updateHash();
									    $overbox.remove();
									});
									$overboxContainer.click(function(e) {
									    e.stopPropagation();
									});
									
									if ($('#overbox-image-text').length > 0) {
										// resize images once images are fully loaded
						                $overboxContainer.imagesLoaded( function(){
						                    var imgHeight = $overboxContainer.find('img').height();
											$overboxContainer.height(imgHeight);
											$extraBg.height(imgHeight);
											var picURL = $('img',$overboxContainer).attr("src");
											if (picURL.indexOf('http') < 0){
												jiathis_config.pic = 'http://' + document.domain + picURL;
												addthis_share_config.screenshot = 'http://' + document.domain + picURL;
											}
											else {
												jiathis_config.pic = picURL;
												addthis_share_config.screenshot = picURL;
											}
											
						                });
									}	

									if (Modernizr.touch){
										setTimeout(reinitialiseScrollPane,1000);
									}
									else {
										reinitialiseScrollPane();
									}
								},1000);

	                		});

                		});

                		

						$win.resize(function(){

							rwidth = $win.innerWidth(),
		                    rheight = $win.innerHeight();

		                    // update overbox wrap size on window resize
							$('.overbox-wrap').css({
								height: rheight,
								width: rwidth
							});
						});
				};
				
				if (currHash.indexOf('overlay') > -1) {

					var currentHash     = window.location.hash,
                    currentNum          = currentHash.replace('#slide',''),
                    currentNumStripped  = currentNum.replace(/\D/g,''),
                    overlayLink 		= $('.slideshow li').eq(currentNumStripped-1).find('.overbox').attr('href');

                    // open overlay from hash '&overlay' link
                    openOverlay(overlayLink);

				}

				$('body').find('.overbox').each(function() {

	                // open overlay code here
	                var overboxLink 		= $(this).attr('href');

	                $(this).on('click',function(e){
	                	
	                	e.preventDefault();
	                	openOverlay(overboxLink);
	                	
		                
	                });              

				});

			}
		};	
	};

	lincoln.fullSizeImages = function() {

		return {

			init: function(intro) { 

				var handleResize = function(intro){

	                $('#lincoln-wrapper').find('img.full-width-bg').each(function() {

	                    var rwidth    		= $win.innerWidth(),
	                    	rheight   		= $win.innerHeight();

	                    var bgCSS           = {left: 0, top: 0}, 
	                        rootWidth       = rwidth, 
	                        bgWidth         = rootWidth, 
	                        rootHeight      = rheight, 
	                        imgRatio        = $(this).width() / $(this).height(),
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
	                        if(intro != 'undefined') {
	                    		bgCSS.left  = '-' + bgOffset + 'px';
	                    	}
	                        
	                    }

	                    $(this).parent().css({width: rootWidth, height: rootHeight})
	                            .find('img.full-width-bg').css({width: bgWidth, height: bgHeight}).css(bgCSS);

	                });

					$('#lincoln-wrapper').find('img.full-width-bg').css('display','block');
					
				};

				// resize images once images are fully loaded
				$('#lincoln-wrapper').imagesLoaded( function(){
					handleResize();
				});
				
				$win.resize( handleResize );

			}
		};	
	};

	return {

		init: function(){

			$('.scroll-pane').jScrollPane();

			if($('ul.slideshow')[0]) {

				$('ul.slideshow').slideshow();

			} else {
				
				// if no slideshow on page then resize all images with '.full-width-bg' class to 100% in height & width
				if($('a.intro-link')[0]) {
					lincoln.fullSizeImages().init('intro');
				} else {
					lincoln.fullSizeImages().init();
				}

			}

			if($('a.intro-link')[0]) {

				var $introlink = $('a.intro-link');

				if (!Modernizr.touch) {
					setTimeout(function(){
						$introlink.fadeIn();
					},1000);
				} else {
					$introlink.show();
				}

			}

			if($('.overbox')[0]) {
				lincoln.overbox().init();
			}

			// add class for top nav with 7 items (default is 6 items)
			if ($('.top-nav li').length === 7) {
				$('.top-nav').addClass('seven-items');
			}
			
			// share flyout
			$('.top-nav a').each(function () {
				if($(this).parent().children(".menu").size() > 0){
					$(this).click(function(e) {
						e.preventDefault();
					});
					$(this).append('<span class="arrow" />');	
					$(this).parent().on({
		                mouseenter: function(){
		                    $(this).addClass('hilite').find('.menu').stop(true,true).show();
		                },
		                mouseleave: function(){
		                    $(this).removeClass('hilite').find('.menu').hide();
		                }
		            });
			}});
			
			if($('.form-content-bg').length > 0) {

				if (Modernizr.touch) {
                	var reinitialiseScrollPane = function(){
						$('.content-wrap .form-wrap').jScrollPane({
							autoReinitialise 		: false,
							verticalDragMinHeight 	: 220,
							verticalDragMaxHeight 	: 220,
							contentWidth			: 1
						});
					}
                } else {
                	var reinitialiseScrollPane = function(){
						$('.content-wrap .form-wrap').jScrollPane({
							autoReinitialise 		: true,
							verticalDragMinHeight 	: 220,
							verticalDragMaxHeight 	: 220
						});
					}
                }

            	setTimeout(function() {
            		var formHeight = $('.content-wrap').outerHeight();
            		$('.form-content-bg img').css('height',formHeight);
            		reinitialiseScrollPane();
            	},300);
            	
            	$win.resize( function() {
            		var formHeight = $('.content-wrap').outerHeight();
            		$('.form-content-bg img').css('height',formHeight);
            		reinitialiseScrollPane();
            	});

			}

			// fix the container width on tablet
			if (Modernizr.touch){
				$("#captchalabel").parent("div").css("width", "95%");
			}
		}

	};	

}(window.lincoln || {}, jQuery));


$(function($){
	if($('#lincoln-wrapper')[0]) {
		// run code if lincoln-wrapper ID exists
		lincoln.init();
	}
});