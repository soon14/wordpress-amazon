/*
 * Author: Ruiwen Qin
 * 
 * This is used on tech section landing page. ISOTOPE plugin is triggered at init stage.
 * 
 * 
 */

(function($) {
	
	//The create function creates the module object; It does no initialise the object
	techTiles = function () {
		var $container = $("#tiles"),
			sectionWidth = $container.width(),
			filterNav = $("#filter"),
			filterNavHeight = filterNav.height(),
			items = $(".element", $container),
			topHeight = $(".tech-section").offset().top - 15,
			exploreBtn = $(".tech-heading .btn");

	
		return {

			
			init: function( elem ) { 
				
				element = $(elem || ".tech-section");
					
				if( !element || !element.size() ) { return this; }

			
				techTiles().IsoGutterRewrite();

				// setup Isotop layout
				$container.isotope({
					itemSelector: '.element',
					transformsEnabled:false,
					masonry: {
						columnWidth:310,
						gutterWidth:15
					}
				});

				// filter
				$('#filter a').click(function(e){
					e.preventDefault();
					var that = $(this),
						parentElem = that.parent("li");

					if (parentElem.hasClass("active")){
						return;
					}
					else {
						$("#filter li").removeClass("active");
						parentElem.addClass("active");
					}

					var selector = that.attr('data-filter');
					$container.isotope({
						filter:selector
					}, function(){
						$("html, body").animate({
							scrollTop: topHeight
						});
						
					});
					
					
					return false;
				});

				$(window).scroll(function(){
					if ($(window).scrollTop() > topHeight){
						filterNav.addClass("sticky");
						filterNav.css({width:sectionWidth});
						$container.css({marginTop:filterNavHeight});
					}
					else {
						filterNav.removeClass("sticky");
						filterNav.css({width:'100%'});
						$container.css({marginTop:0});
					}
				});

				exploreBtn.click(function(){
					
					$("html, body").animate({
						scrollTop: topHeight
					});
					return false;
				});
				
				
				// tiles hover animation
				if (!Modernizr.touch){
					items.hover(function(){
						var overlay = $(this).find(".overlay"),
							image = $(this).find("img");
						
						overlay.stop().animate({
							top: 0
						});
						image.stop().animate({
							marginTop: '-20px'
						});
					}, function(){
						var overlay = $(this).find(".overlay"),
							image = $(this).find("img");
						
						overlay.stop().animate({
							top: '-100%'
						});
						image.stop().animate({
							marginTop: '0px'
						});
					});
					
					
				}
				
				

					
				return this;
			
			},

			IsoGutterRewrite: function(){
				// modified Isotope methods for gutters in masonry
				$.Isotope.prototype._getMasonryGutterColumns = function() {
				    var gutter = this.options.masonry && this.options.masonry.gutterWidth || 0;
				    containerWidth = this.element.width();

				    this.masonry.columnWidth = this.options.masonry && this.options.masonry.columnWidth ||
				    // or use the size of the first item
				    this.$filteredAtoms.outerWidth(true) ||
				    // if there's no items, use size of container
				    containerWidth;

				    this.masonry.columnWidth += gutter;

				    this.masonry.cols = Math.floor((containerWidth + gutter) / this.masonry.columnWidth);
				    this.masonry.cols = Math.max(this.masonry.cols, 1);
				};

				$.Isotope.prototype._masonryReset = function() {
				    // layout-specific props
				    this.masonry = {};
				    // FIXME shouldn't have to call this again
				    this._getMasonryGutterColumns();
				    var i = this.masonry.cols;
				    this.masonry.colYs = [];
				    while (i--) {
				        this.masonry.colYs.push(0);
				    }
				};

				$.Isotope.prototype._positionAbs = function( x, y ) {
					if ( $('BODY').hasClass('rtl') )
					{
						return{right: x, top: y}
					}
					else
					{
						return{left:x,top:y}
					}
				};

				$.Isotope.prototype._masonryResizeChanged = function() {
				    var prevSegments = this.masonry.cols;
				    // update cols/rows
				    this._getMasonryGutterColumns();
				    // return if updated cols/rows is not equal to previous
				    return (this.masonry.cols !== prevSegments);
				};
				/** End of modifying Isotop methods **/
			}
		};	
	};
	

}(jQuery));
