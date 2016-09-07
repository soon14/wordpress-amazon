/*
Author: 		Brett Chaney
File name: 		guxFooter.js
Description: 	GUX Footer disabling accordion tabs on specific screen sizes 
				GUX Footer addthis sharing initialisation
Dependencies: 	jQuery and underscore.js
*/

var guxApp = guxApp || {};

(function($){

guxApp.footer = {

	init: function() {

		var self = this;
			self.wrapper = $('#gux-footer');
			self.windowWidth = $(window).width();
		
		// go no further if GUX footer wrapper is not found on page
		if (!self.wrapper.length) {return;}

		self.disableTabs();
		self.disableTelDesktop();

		setTimeout(function(){
			self.centerCols();
		}, 500);


		// window resize event for GUX footer
		$(window).on('resize', _.debounce(self.resizeFuncs, 250));

		// load addthis sharing functionality
		guxApp.shareWidget.init("#gux-footer .social-icons");

	},

	resizeFuncs: function() {
		var newWindowWidth = $(window).width();

		if (newWindowWidth !== guxApp.footer.windowWidth) {
			guxApp.footer.disableTabs();
			guxApp.footer.disableTelDesktop();
			guxApp.footer.centerCols();
		}

		guxApp.footer.windowWidth = $(window).width();
	},

	disableTabs: function() {

		var self = this;

		if ($(window).width() > 767 && $(window).width() < 990) {

			// do this for tablet (768px - 989px)
			$('.site-links .tab-1 .tab-nav, .site-links .tab-2 .tab-nav', self.wrapper).addClass('disable');
			$('.site-links .tab-3 .tab-nav, .site-links .tab-4 .tab-nav, .site-links .tab-5 .tab-nav, .site-links .tab-6 .tab-nav', self.wrapper).removeClass('disable');
			$('.site-links .tab-1 .tab-nav', self.wrapper).removeClass('open');
		} 
		else if ($(window).width() > 989) {

			// do this for desktop (990px +)
			$('.site-links .tab-item .tab-nav', self.wrapper).addClass('disable');
		} else {

			// do this for mobile (320px - 767px)
			$('.site-links .tab-item .tab-nav', self.wrapper).removeClass('disable');
		}

	},

	disableTelDesktop: function() {

		var self = this;

		// disable the telephone link if the user is viewing in a window wider than 989 pixels
		// it works as an expected tel anchor in windows below 990 pixels
		// NOTE: this can be applied globally to all anchor links with href="tel:..." by removing "self.wrapper" code below
		$('a[href^="tel"]', self.wrapper).on('click', function(e) {
			if ($(window).width() > 989) {
				e.preventDefault();
				return false;
			} else {
				return true;
			}
		});

	},

	centerCols: function() {

		if ($(window).width() > 991) {

			// loop through each site link row
			// usually there should be only one row but there is a loop anyway for the rare case an extra row of site links is added
			$('.site-links > .row', this.wrapper).each(function() {

				// get total width of columns
				var totalWidth = 0,
					columns = $('.columns', this).find('.columns'),
					wrapWidth = $(this).parent().width();

				// loop through each column and calculate the total width of all columns
				columns.each(function() {
					totalWidth = totalWidth + $(this).outerWidth(true);
				});

				// minus padding of 25 pixels of total
				// these pixels are taken from the last column right padding for the H4
				totalWidth = totalWidth - 25;

				if (wrapWidth >= totalWidth) {
					// horizontally center row by adding left margin for ltr and right margin for rtl 
					if ($("body").hasClass("rtl")) {
						$(this).css('margin-right', parseInt((wrapWidth - totalWidth) / 2));
					} else {
						$(this).css('margin-left', parseInt((wrapWidth - totalWidth) / 2));
					}
				}

			});

		} else {

			$('.site-links > .row').css({marginLeft: '', marginRight: ''});

		}	

	}

};

$(function() {
	guxApp.footer.init();
});

})(jQuery);