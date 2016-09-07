/*
Author: 		Randell Quitain
File name: 		secondarynav.js
Description: 	Secondary Navigation fixed width issue fix
Dependencies: 	jQuery 
*/

(function($){

	secondaryNav = {
		init: function(){

			if (!$(".secondarynav").length) {return;}

			var sNav = $('.secondarynav');
			var selected = $('.selected-sticky');
			// initialize Secondary Navigation width
			sNav.css({
				'width': sNav.closest('.component-container').width()
			});

			// add active class to current and parent page
			this.currentAndParent(sNav);

			// enable click for has-dropdown items
			this.hasDropdown(sNav);

			// properly align secondary nav on ie8 on position fixed
			this.ieAlign(sNav);

			// fixed secondary nav
			$(window).on('scroll', function() {
				var scroll = $(window).scrollTop();
					if (scroll >= 70) {
						sNav.addClass('fixed');
					} else {
						sNav.removeClass('fixed');
						selected.removeClass('fixed');
				 	}
			});

			$(window).on('resize', function(){
				secondaryNav.currentAndParent(sNav);
				secondaryNav.hasDropdown(sNav);
				if(guxApp.tools.isIE(8)) {
					secondaryNav.ieAlign(sNav);
				}
				sNav.css({
					'width': sNav.closest('.component-container').width()
				});
			});
			
		},
		currentAndParent: function(container) {
			var currentParent = $("#current-and-parent").embeddedData();
			for (var active in currentParent) {
				$('li[title="' + currentParent[active] + '"]', container).addClass('active');
			}
		},
		ieAlign: function(container) {
			if(guxApp.tools.isIE(8)) {
				if ($(window).width() < 1342){
					container.addClass('aligned');
				} else {
					container.removeClass('aligned');
				}
			}
		},
		hasDropdown: function(container) {

			var touchOrClick = Modernizr.touch ? 'touchstart' : 'click',
				wWidth = $(window).width();

			if (wWidth < 768){
				$('.has-dropdown > a', container).unbind(touchOrClick).on(touchOrClick, function() {
					$(this).toggleClass('open');
					return false;
				});
			} else {
				$('.has-dropdown > a', container).removeClass('open').unbind(touchOrClick);
			}

		}
	};

	$(function(){
		secondaryNav.init();
	});

})(jQuery);