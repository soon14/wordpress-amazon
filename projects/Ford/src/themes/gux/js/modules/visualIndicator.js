/*
Author: Roy Anonuevo
File name: visualIndicator.js
Description: Adding visual indicator feature

			 How to use: 
			 Just add a class "visual-indicator" on the module you want to have that feature.
	   		 
	   		 Example: 	   		 
	   		 <section class="billboard visual-indicator"></section>

Dependencies: jQuery, Underscore
*/

(function($){

	var visualIndicator = {

		init: function(){

			if(!$('.visual-indicator').length){return;}
			
			var template = '<div class="indicator"><span></span></div>';
			
			var self = this;

			// cache dom
			this.$window = $(window);
			this.$visualIndicator = $('.visual-indicator');
			this.$visualIndicator.append(template); // append the indicator
			this.$indicator = this.$visualIndicator.find('.indicator');

			// assign values
			this.indicatorHeight =  this.$indicator.height(),
			this.indicatorBottom = parseInt(this.$indicator.css("bottom"));
			this.hasFlexSlider = false;
			this.additionalHeight = 90;
			this.paginationDefaultBottom = 0;
			
			this.indicatorOffset = this.indicatorHeight + (this.paginationDefaultBottom - (this.indicatorHeight + this.indicatorBottom));


			var reposition = _.debounce(self.reposition.bind(self), 100);

			// bind listener
			this.$window.on('resize', reposition);
			this.$window.on('scroll', self.reposition.bind(self));
		},

		checkFlexControlNav: function(){
			// check if flex control navigation exists
			if(this.$visualIndicator.find('.flex-control-nav').length){		
				this.$pagination = this.$visualIndicator.find('.flex-control-nav');
				this.paginationDefaultBottom = parseInt(this.$pagination.css("bottom"));
				this.indicatorOffset = this.indicatorHeight + (this.paginationDefaultBottom - (this.indicatorHeight + this.indicatorBottom));
				this.hasFlexSlider = true;
			}
		},

		reposition: function(){
			// check if there's a flexslider and flex nav control
			if(this.$visualIndicator.find('.flexslider').length && this.hasFlexSlider == false){
				this.checkFlexControlNav();
			}

			var winHeight = this.$window.height(),
				visualIndicatorPosition = this.$visualIndicator.position(),
				visualIndicatorHeight = this.$visualIndicator.outerHeight(),
				maxHeight = visualIndicatorPosition.top + visualIndicatorHeight,				
				scrollBottom = this.$window.scrollTop() + winHeight,
				minHeight = visualIndicatorPosition.top + (visualIndicatorHeight * 3 / 4) + this.paginationDefaultBottom;
				
			if(scrollBottom < minHeight){								
				var bottomPosition = maxHeight - (minHeight - this.paginationDefaultBottom);

				if(this.hasFlexSlider){
					this.$pagination.removeClass("indicator-fixed").css("bottom", bottomPosition);
				}

				// adding and removing 'ie8repaint' class are for ie8 repaint issue		
				this.$indicator.removeClass("indicator-fixed").css("bottom", bottomPosition - this.indicatorOffset).addClass("indicator-visible").addClass('ie8repaint').removeClass('ie8repaint');
			}else{
				if(scrollBottom < maxHeight){
					if(this.hasFlexSlider){
						this.$pagination.css("bottom", "").addClass("indicator-fixed");
					}

					// adding and removing 'ie8repaint' class are for ie8 repaint issue		
					this.$indicator.css("bottom", "").addClass("indicator-fixed indicator-visible").addClass('ie8repaint').removeClass('ie8repaint');
				} else {
					if(this.hasFlexSlider){
						this.$pagination.css("bottom", "").removeClass("indicator-fixed");
					}

					// adding and removing 'ie8repaint' class are for ie8 repaint issue		
					this.$indicator.css("bottom", "").removeClass("indicator-fixed indicator-visible").addClass('ie8repaint').removeClass('ie8repaint');
				}

				maxHeight += this.additionalHeight;

				if(scrollBottom < maxHeight){
					this.$indicator.addClass("indicator-visible");
				}
			}
		}
	}

	$(function(){
        visualIndicator.init();        
    });

})(jQuery);

