/*
Author: 		Jessie Biros
File name: 		guxNavigation.js
Description: 	global navigation functionalities and animations
				
Dependencies: 	jQuery
*/

(function($){
	var guxNav = {
		init: function(){
			if (!$("#gux-header").length) {return;}

			var header = $('#gux-header'),
				headerWrapper = $('.header-wrapper', header),
				primaryNav = $('.primary-navigation', header),
				primaryNavLarge = $(".primary-navigation-large",headerWrapper),
				tabs = $('.primary-navigation > ul', header),
				tabContents = $('.primary-navigation > .tabs-content', header),
				bilingualClick = $(".user-action-links .bilingual-menu .option > a", headerWrapper),
				accountLink = $(".user-action-links .account-link",header),
				isMobile = guxApp.tools.isMobile(),
				headerModal = $(".header-pop-up"),
				//clone = $('.header-wrapper', header).clone(),
				body = $('body');

				

			// this will trigger the burger icon on mobile
			// burger icon event listener
			$('.burger-icon > div', header).on('click',function(){
				var directHeaderWrapper = $("#gux-header > .wrapper > .header-wrapper")
				$('> .content.active', tabContents).removeClass('active');
				//headerWrapper.removeClass('stick');
				if(directHeaderWrapper.length > 1){
					directHeaderWrapper.first().remove();
				}
				$('> li', tabs).removeClass('active');
				primaryNav.removeAttr("style"); 
				header.removeClass('show-panel');
				header.toggleClass('show');
				$(this).parent().toggleClass('open');
				body.toggleClass('no-scroll');

			});

			// function that will run when tabs are being triggered on mobile view
			$("li > a",tabs).on("click", function(event){
				var self = $(this),
					target = self.attr("href"),
					parent = self.parent(),
					tabsWrapper = self.parents(".tabs-mob").next(".tabs-content");
				if(guxApp.viewport.view == "mobile"){
					if(self.parent().hasClass("open-panel")){
						event.preventDefault();
						header.addClass('show-panel');
						parent.siblings().removeClass("active");
						parent.addClass("active");
						tabsWrapper.children(".content").removeClass("active");
						tabsWrapper.children(target).addClass("active");
						setTimeout(setHeight,31);
					} else {
						return true;
					}
				}	
			});

			//callback function after css3 animation/transition finished
			// this is for the animation on mobile (e.g. the car transition inside the accordion)
			$(tabContents).bind('oanimationend transitionend animationend webkitAnimationEnd', function() { 
			   if(header.hasClass("show-panel")){
			   	setHeight();
			   }
			   
			});

			

			// event for hiding the 2nd panel [back button mobile]
			$('.hide-panel', tabs).on('click',function(){
				header.removeClass('show-panel');
				primaryNav.removeAttr("style");
				return false;
			});

			// slide up animation of the items inside accordion on mobile 
			$(".tab-nav", header).on("click", function(){
				var activeTab = $(".accordion-block .tab-item .tab-nav.open", tabContents),
					accContents = $(".tab-data > ul > li");

				if(activeTab.length > 0){
				    activeTab.next().find(accContents).each(function(i,el){
				      setTimeout(function(){
			      		$(el).animate({
				       		"margin-top" : 0,
				       		opacity : 1
				        },300);
				      },100 + (i * 100));
				    }).promise().done(function(){
				    	activeTab.parent().siblings(".tab-item").find(accContents).each(function(){
					       $(this).css({
					       		"margin-top" : "30%",
					       		"opacity" : "0"
					       });
					    });
				    });
				 } 

				 else{
				 	$(this).next().find(accContents).each(function(){
				      $(this).animate({
				       		"margin-top" : "30%",
				       		opacity : 1
				       },300);
				    });
				 }
			});

			// event listener when the animation of accordion is finished
			// the publish is in accordion.js (on complete)
			$.subscribe('accordion-tab-nav-open', function(e,tabNavClicked){
				var activeTab = $(".accordion-block .tab-item .tab-nav.open", tabContents),
					tab = $(".accordion-block .tab-item .tab-nav", tabContents),
					accContents = $(".tab-data > ul > li");

				// if the accordion tab clicked is outside the primary navigation then do not continue
				if (!($(tabNavClicked).parents('.primary-navigation').length)) {
					return;
				}

				if(activeTab.length === 0){
					tab.next().find(accContents).each(function(){
				       $(this).css({
				       		"margin-top" : "30%",
			       			"opacity" : "0"
				       });
				    });
				}

				// needs a delay to make sure everything is complete to get correct height
				setTimeout(function() {
					setHeight();
				},850);
					
				if($(tabNavClicked).hasClass("open")){
					
					header.animate({scrollTop:0},{
						duration: 100,
						complete: function(){
							var scrollVal = $(tabNavClicked).offset().top;
							header.animate({scrollTop:scrollVal},600);
						}
					});
					
				}
			});

			// this will get the height of the wrapper and assign it to 
			// primaryNav [mobile] to adjust the border to the bottom
			function setHeight(){
				primaryNav.removeAttr("style"); 
				var contHeight = guxNav.getWrapperHeight();
			    primaryNav.height(contHeight);
			}

			// on resize event [transition from mobile to desktop and/or when 
			// resizing the height on small view]
			var debouncedResizeHeight = _.debounce(function() {
					if(guxApp.viewport.view == "mobile"){
						headerModal.css("display","none");
						if($(header).hasClass("show-panel")){
							setHeight();
						}
					}else{
						//setToLeft();
						if($(".open-panel",primaryNavLarge).hasClass("opened")){
							var width = $(window).width();
							headerModal.css("display","block");

							// this is for wrapping of columns inside the row
							// if the view is on tablet, it will get all the columns and wrap it inside a row by 3's
							if(width >= 768 && width <= 980) {
			                    equalizeModelHeight($(".open-panel.opened",primaryNavLarge).children(".nav-panel").find(".links-list > .columns"),3);
			                }else{
			                	var addedRow = $('.primary-navigation-large .added-row')
			                	 if($(addedRow).length){
				                    addedRow.contents().unwrap();
				                }
			                }
						}

						$(".burger-icon").removeClass("open");
						if(!$(header).hasClass("global-nav-large-show")){
							body.removeClass('no-scroll');
						}
					}
	        },100);
			
			// call the window resize event
			$(window).on('resize', debouncedResizeHeight);

			// close the search box and/or the global navigation for large view in case 
			// a click outside its parent div will be triggered
			$("html").on("click", function(e){
				var target = e.target;

				if(!($(e.target).hasClass('search-input') || $(e.target).parents().hasClass('search-input'))){
					$(".search-input", header).hide();
				}

				if(!($(e.target).parents().hasClass("primary-navigation-large"))){
					closeNavLarge();
				}

				if(!$(target).parents().hasClass("exempt")){
					if((headerModal.css("display") != "none")){
						$("body").removeClass("no-scroll");
						headerModal.fadeOut();
					}
				}
			});


			// search box toggle
			// show and hide the search panel in global navigation for large view
			$(".search-box > a").on("click", function(e){
				e.preventDefault();
				var searchInput = $(".search-input");
				if(($(this).next(searchInput).css("display") == "none")){
					$(this).next(searchInput).show().find("input[name=searchKeyword]").focus();
					headerModal.fadeIn();
				}else{
					$(this).next(searchInput).hide();
					headerModal.fadeOut();
				}
				
				closeNavLarge();
				e.stopPropagation();
			});

			// detect if desktop or not then assign event listener
			// for Bilingual Language
			// this will attach :hover for dektop view and on("click") if tablet view
			if(isMobile === null){
				$(bilingualClick).hover(function(e){
					e.preventDefault();
				 	$(this).next().toggle();
				});

				$(bilingualClick).next().hover(function(){
					$(this).toggle();
				});
				
			} else{
				$(bilingualClick).on("click", function(e){
					e.preventDefault();
				 	$(this).next().toggle();
				 	return true;
				});
			}
			
			// hide dropdown initially
			$(".nav-panel .nameplate", primaryNavLarge).hide();
			$(".nav-panel .wrapper", primaryNavLarge).hide();

			// event listener for primary navigataion links list
			// this will trigger the drop down if there is a nav panel inside
			$(".open-panel > a", primaryNavLarge).on("click",function(e){
				var self = $(this),
					siblings = self.parent().siblings(),
					navPanel = self.siblings(".nav-panel");

					navPanel.css("top","49px");

				//check first if there's a dropdown
				if((self.siblings(".nav-panel").length)){
					e.preventDefault();
					siblings.removeClass("opened");
					siblings.find(".nav-panel .nameplate").css("display","none");
					siblings.find(".nav-panel .wrapper").css("display","none");
					siblings.find(".nav-panel .links-list").css("display","none");
					self.parent().toggleClass("opened");

					if (self.parent().hasClass("opened")){
						headerModal.one().fadeIn();
						if(self.parent().hasClass("withTabs")){
							navPanel.find(".wrapper").slideDown(150, function(){
								navPanel.find(".nameplate").slideDown(100);
							});
						}else{
							navPanel.find(".links-list").slideDown("fast");
						}

					} else{
						headerModal.one().fadeOut();
						if(self.parent().hasClass("withTabs")){
							navPanel.find(".nameplate").slideUp(150, function(){
								navPanel.find(".wrapper").slideUp(100);
							});
						}else{
							navPanel.find(".links-list").slideUp("fast");
						}
					}
				} 

				// this will wrap the columns to a row
				// it will wrap it by 3's
				if(self.parent().hasClass('opened')){
					equalizeModelHeight($(self.next(".nav-panel").find(".links-list > .columns")));
				}else{
					var addedRow = $('.primary-navigation-large .added-row');
					 if($(addedRow)){
	                    addedRow.contents().unwrap();
	                }
				}
			});
			
			// function that will call the add row with parameter
			function equalizeModelHeight(el){
                var width = $(window).width(),
                    modelElem = el;
                if(width >= 768 && width <= 980) {
                    addRow(modelElem,3);
                }
            }

            // will wrap the columns by 3s to row
			function addRow(elem, numOfDivs){
				for(var i = 0; i < elem.length; i+=numOfDivs) {
                  elem.slice(i, i+numOfDivs).wrapAll("<div class='row added-row'></div>");
                }
			}

			//function that closes the nav dropdown
			function closeNavLarge(){
				var openPanel = $(".open-panel", ".primary-navigation-large"),
					panelWithTabs = $(".open-panel.opened.withTabs",primaryNavLarge),
					openPanelOpened = $(".open-panel.opened",primaryNavLarge);

				if(panelWithTabs.length > 0){
					openPanelOpened.children(".nav-panel").find(".nameplate").slideUp(300, function(){
						panelWithTabs.children(".nav-panel").find(".wrapper").slideUp("fast", function(){
							openPanel.removeClass("opened");
						});
					});
				}
				else if((openPanelOpened.length > 0)){
					openPanelOpened.children(".nav-panel").find(".links-list").slideUp("fast", function(){
						openPanel.removeClass("opened");
					});
				}
			}
			
			guxNav.guxNavTab($(".nav-tab > a",".nav-panel"));

			//guxNav.is_loggedin();
			$.subscribe('profile-done', (function(){
				if(typeof guxPersonalisation.components !== "undefined") {
					if(guxPersonalisation.psn.profile.authState === "OW"){
						$("a span:last-child",accountLink).attr("style", "display: none !important");
					}
				}
			}));

			// var sticky_relocate = _.debounce(function() {
			// 	var directHeaderWrapper = $('#gux-header > .wrapper > .header-wrapper');
			//     var window_top = header.scrollTop();
			//     var div_top = directHeaderWrapper.offset().top;

			//     console.log("len : ", directHeaderWrapper.length);
			    
			//     if(header.hasClass('show')){
			//     	if (window_top > div_top) {
			// 	        directHeaderWrapper.addClass('stick');
				        
			// 	        if(directHeaderWrapper.length < 2){
			// 	        	$('.wrapper', header).prepend(clone);
			// 	        }
				       
			// 	    } else {
			// 	    	if(directHeaderWrapper.length > 1){
			// 	    		directHeaderWrapper.first().remove();
			// 	    	}
			// 	        directHeaderWrapper.removeClass('stick');
			// 	    }
			//     }
			    
			// },50);

			// header.scroll(sticky_relocate);
			
		},

		getWrapperHeight: function(){
			var wrapper = $("#gux-header > .wrapper"),
				headerWrapper = $(".header-wrapper",wrapper);

				return(wrapper.outerHeight(true) - headerWrapper.outerHeight(true));
		},

		guxNavTab: function(e){
			$(e).on("click", function(e){
				e.preventDefault();
				var self = $(this),
					parent = $(this).parent(),
					index = self.parent().index(),
					subPanels = parent.parent().next(".wrapper").find(".inner-panels").children(".sub-panel");

				parent.siblings().removeClass("active");
				parent.addClass("active");
				subPanels.removeClass("active").eq(index).addClass("active");
			});
		},

		getBottom: function(e){
			return $(e).outerHeight(true);
		}
	};

	$(function(){
		guxNav.init();
	});

})(jQuery);
