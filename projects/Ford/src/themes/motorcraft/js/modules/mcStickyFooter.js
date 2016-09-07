/*
Author: 		Wendelle Alimbubuyog
File name: 		mcStickyFooter.js
Description: 	Check of if the document is shorter that viewport; if true, it will make the footer stick at the bottom
Dependencies: 	jQuery 
Usage: 			
*/


(function($){
	mcStickyFooter = {
		init: function(){	
			// this is only for landing page v2
			this.mainContentDiv = $('.landing-page-v2');

			this.wHeight = $(window).height();
			this.dheight = $(document.body).height();	

			// check if document is shorter that the window height
			if( this.wHeight < this.dheight) {
				$('body').removeClass('sticky-footer');
			} else {
				$('body').addClass('sticky-footer');
			}

			// initialize on window resize
			this.resize();

			// vertically center the content
			this.centerBody(this.wHeight, this.dheight);
		},
		resize: function(){
			$(window).on("resize", function() {
				
				this.wHeight = $(window).height();
				this.dheight = $(document.body).height();

				// check if document is shorter that the window height
				if( this.wHeight < this.dheight) {
					$('body').removeClass('sticky-footer');
				} else {
					$('body').addClass('sticky-footer');
				}

				// vertically center the content
				mcStickyFooter.centerBody(this.wHeight, this.dheight);
			});
		},
		centerBody: function(wh , dh){ // wh = window height, dh = document height
			var marginTop = (wh - dh) / 2;
			
			// add margin top to center the content, even in negative, it will just set the margin top into 0
			this.mainContentDiv.css('marginTop', Math.max(0,marginTop));
		}	
	}

	$(function(){
		mcStickyFooter.init();
	});

})(jQuery);