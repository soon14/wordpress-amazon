/*
Author: 		Roy Anonuevo
File name: 		shares.js
Description: 	Global social share functionalities
Dependencies: 	revealModal.js, jQuery
*/

(function($){

	var shares = {

		init: function(){	
			if(!$('.reveal-social-share').length || !$('#social-share-tooltip-content').length){return;}

			var self = this;
			// cache dom
			this.$window = $(window);
			this.$shareLink = $('.reveal-social-share');
			this.$shareTooltipContent = $('#social-share-tooltip-content');
			this.$tip = $('.social-share-tooltip .tip');

			// Add listener for modal close when no 'reveal-content-modal' exists
			if(!$(".reveal-content-modal").length){
				revealModal.modalClose();
			}

			// bind listener
			this.$window.on('resize', this.winResize);
			this.$shareLink.on('click', this.revealShare);

			
			$.subscribe('revealtooltip-tip-position-on-top', function(){
				self.$tip = $('#content-tooltip .social-share-tooltip .tip');
				self.rotataTip("top");
			});

			$.subscribe('revealtooltip-tip-position-on-bottom', function(){
				self.$tip = $('#content-tooltip .social-share-tooltip .tip');
				self.rotataTip("bottom");
			});

			$.subscribe('revealtooltip-tip-position-on-right', function(){
				self.$tip = $('#content-tooltip .social-share-tooltip .tip');
				self.rotataTip("right");
			});

			$.subscribe('revealtooltip-tip-position-on-left', function(){
				self.$tip = $('#content-tooltip .social-share-tooltip .tip');
				self.rotataTip("left");
			});

			$.subscribe('foundation-reveal-modal-open', function(){
				self.addThisReflow();
			});

			$.subscribe('revealtooltip-show', function(){
				self.addThisReflow();
			});			
		},

		winResize: function(){ 
			if(qlApp.viewport.view != "mobile"){
				// hide modal when on desktop viewport
	        	revealModal.close();
			}
		},

		revealShare: function(e){
			var self = shares;

			e.preventDefault();
			var elem = $(this),
				contentUrl = elem.attr("href");

            if(qlApp.viewport.view == "mobile"){   
	            $.ajax({
	                url: contentUrl,
	                success: function(data) {
	                    revealModal.modalSuccess(data, elem);

						$.publish('revealtooltip-hidden', this.$tooltip);
	                }
	            });	            
	        }else{	        	
	        	var data = self.$shareTooltipContent.html();
	        	qlApp.revealTooltip.show(elem, data, 40, 0);
	      	}
		},

		rotataTip: function(position){

			switch(position){
				case 'top':
					this.$tip.removeClass("tip-bottom");
				break;

				case 'bottom':
					this.$tip.addClass("tip-bottom");
				break;

				case 'left':
					this.$tip.addClass("tip-left");
				break;

				case 'right':
					this.$tip.removeClass("tip-right");
				break;
			}
		},


		addThisReflow: function(){
			//window['addthis_share'].url = window.location.href;
			//window['addthis_share'].title = window.document.title;
			window.addthis.toolbox('.addthis_toolbox');
		}
	}

	$(function(){
		shares.init();
	});

})(jQuery);
