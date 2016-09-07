(function($){
	var Carousel = function (object, text, mode, currentItem) {
		var carousel = this;
		
		carousel.id = object.options.id || '' ;
		carousel.impl = object;
		carousel.text = text || {next:{label:"Next Page",title:"Go to next page"},prev:{label: "Previous Page",title: "Go to prev page"},page:{label:"Page",title:"Go to page"}};
		carousel.visibleItems = object.options.visible;
		carousel.currentPage = 1;
		carousel.currentItem = currentItem || 0;
		carousel.totalLength = object.size();
				
		carousel.init = function () {
			carousel.injectControls();
			carousel.wireEvents();
			
			
			if (mode == "fullscreen"){


				if( carousel.impl instanceof TouchCarousel ) {
					var imageLoad = carousel.imageLoad;
					carousel.imageLoad = function( index ) {
						carousel.impl.imageLoad( index )
						carousel.updateCurrent( index );
					}
				}
				
				carousel.imageLoad(carousel.currentItem);
				carousel.imageControls();
			}
		};
		
		carousel.injectControls = function () {
			var controlsContainer, prevButton, nextButton, page, pageLength,
			markup = {
				container: function () {
					return '<ul class="controls"></ul>';
				},
				prevButton: function () {
					return '<li class="previous"><a title="' + carousel.text.prev.title + '" href="#">' + carousel.text.prev.label + '</a></li>';
				},
				nextButton: function () {
					return '<li class="next"><a title="' + carousel.text.next.title + '" href="#">' + carousel.text.next.label + '</a></li>';
				},
				page: function (item) {
					return '<li class="page page-' + item.count + ' ' + item.current + '"><a href="#" title="' + carousel.text.page.title + ' ' + item.count + '" index="' + item.count + '">' + carousel.text.page.label + ' ' + item.count + '</a></li>';
				}
			};
			controlsContainer = $(markup.container());
			prevButton = $(markup.prevButton());
			nextButton = $(markup.nextButton());
			
			pageLength = carousel.pageLength();
			
			$(controlsContainer).append(prevButton);
			
			for (var i = 1; i <= pageLength; i = i + 1) {
				var item = {}
				item.count = i
				item.current = (i === 1) ? 'current' : '';
				page = $(markup.page(item));
				$(controlsContainer).append(page);
			}
			
			$(controlsContainer).append(nextButton);
			
			$(carousel.id + " .featurecarousel").append(controlsContainer);
			
			
			
			
		};
		
		carousel.updateCurrentPage = function (pageNum) {
			if (pageNum < 1 || pageNum > carousel.pageLength()) {
				return;
			}
			else {
				$(carousel.id + ' .featurecarousel UL.controls .page').removeClass("current");
				$(carousel.id + ' .featurecarousel UL.controls .page-'+pageNum).addClass("current");
				
				carousel.currentPage = pageNum;
			}
		};
		
		carousel.pageLength = function () {
			return Math.ceil((carousel.totalLength / carousel.visibleItems));
		};		
		
		carousel.wireEvents = function () {
			var 
				// For jumping pages
				pageHandler = function() {
					if (carousel.impl.locked || carousel.impl.animating) { return false; }
					var pageNum = parseInt($(this).attr("index"));
					var itemNum = pageNum * carousel.visibleItems - carousel.visibleItems + 1;
					carousel.impl.scroll(jQuery.jcarousel.intval(itemNum));
					carousel.updateCurrentPage(pageNum);
					return false;
				},
			
				// For moving to the next page
				nextHandler = function() {
					if (carousel.impl.locked || carousel.impl.animating) { return false; }
					carousel.impl.next();
					var pageNum = carousel.currentPage + 1;
					carousel.updateCurrentPage(pageNum);
					return false;
				},
				
				// For moving to the previous page
				prevHandler = function() {
					if (carousel.impl.locked || carousel.impl.animating) { return false; }
					carousel.impl.prev();
					var pageNum = carousel.currentPage - 1;
					carousel.updateCurrentPage(pageNum);
					return false;
				}, featureCarousel, featureCarouselControls;
				
				// Cache the DOM elements for attaching event handlers
				if (carousel.id != '') {
					featureCarousel = $(carousel.id + ' .featurecarousel');
				} else {
					featureCarousel = carousel.impl.container.closest('.featurecarousel');
				}
				//featureCarouselList = carousel.impl.list,
				featureCarouselControls = featureCarousel.find('UL.controls');
				
				
						
			// Attach the next and prev handlers to wipe 
			featureCarouselControls.find('.page A').on('click', pageHandler);
			featureCarouselControls.find('.next A').on('click', nextHandler);
			
			// Attach the page handler to wipe 
			featureCarouselControls.find('.previous A').on('click', prevHandler);			
			
		};
		
		// Loading the big image in fullscreen mode
		carousel.imageLoad = function (index) {
			
			var imageContainer = $(carousel.id + ".image-container .large-image");
			imageContainer.empty();
			var item = carousel.getItemByIndex( index, carousel.id + " .carousel-wrapper UL.items li" );
			var url = $("a",item).attr("href");
			var caption = $("img",item).attr("alt");
			
			var img = $("<img />").attr('src',url)
							  .css('display','none')							  
							  .load(function(){
								if(this.complete || typeof this.naturalWidth != "undefined" || this.naturalWidth != 0){
									imageContainer.append(img);
									$(this).fadeIn('fast');
								}
							  })
							  .hover(
									function(){
										$(".gallery-fullscreen .image-container .caption").show();
									},
									function(){
										$(".gallery-fullscreen .image-container .caption").hide();
									}
								);
			
			carousel.imageUpdate( caption, index + 1, carousel.totalLength );
			carousel.updateCurrent(item);
		}
		
		carousel.imageUpdate = function(caption, current, total) {
			
			$(".gallery-fullscreen .image-container .caption p").text( caption );
			$(".gallery-fullscreen div.controls .current").text( current );					 
			$(".gallery-fullscreen div.controls .total").text( total);

		}
		
		// Update the current state of the carousel in fullscreenmode
		carousel.updateCurrent = function(currentItem){
			
			var elem = $.type( currentItem ) === 'number' ? 
							carousel.getItemByIndex( currentItem, carousel.id + " .carousel-wrapper UL.items li" ) : 
							$(currentItem),
				siblings = elem.siblings();
				
			if( carousel.impl.getItems ) {
				siblings = carousel.impl.getItems();
			}
			siblings.removeClass("current");
			elem.addClass("current");
			
			return false;
		};
		
		// Delegate to carousel impl if needed
		carousel.getItemIndex = function( elem ) {
			if( carousel.impl.getItemIndex ) {
				return carousel.impl.getItemIndex( elem );
			} else {
				return $(elem).index();
			}
		};
		
		// Delegate to carousel impl if needed
		carousel.getItemByIndex = function( index, selector ) {
			if( carousel.impl.getItemByIndex ) {
				return carousel.impl.getItemByIndex( index );
			} else {
				return $(selector).eq( index );
			}
		};
		
		// The image scrolling controls
		carousel.imageControls = function(){
			
		
			$(carousel.id + " .carousel-wrapper UL.items LI").click(function(){
				var index = carousel.getItemIndex( this )
				carousel.imageLoad( index );
				carousel.navStateUpdate( index );
				return false;
			});
			
			$(carousel.id + ".gallery-fullscreen div.controls .next").click(function(){
				var $this = $(this);
				carousel.navState($( ".gallery-fullscreen div.controls .previous"),"remove");
				index = carousel.getItemIndex( $(".carousel-wrapper UL.items LI.current") );				
				index++;

				if(index < carousel.totalLength - 1){
					if(index % carousel.visibleItems == 0){
						carousel.impl.next();
						var pageNum = parseInt($('.featurecarousel UL.controls .current A').attr("index"));
						carousel.updateCurrentPage(++pageNum);
					}
					carousel.imageLoad(index);
				}
				else if (index == carousel.totalLength - 1){
					carousel.imageLoad(index);
					carousel.navState($this,"add");
				}
				
				var pageNum = parseInt(index / carousel.visibleItems);
				var currentPageNum = $(".carousel-wrapper .controls .current").attr("index");
				
				if (pageNum != currentPageNum){
					var itemNum = ++pageNum * carousel.visibleItems - carousel.visibleItems + 1;
					carousel.impl.scroll(jQuery.jcarousel.intval(itemNum));
					carousel.updateCurrentPage(pageNum);
				}
				
			});
			
			$(".gallery-fullscreen div.controls .previous").click(function(){
				var $this = $(this);
				carousel.navState($(".gallery-fullscreen div.controls .next"),"remove");
				index = carousel.getItemIndex( $(".carousel-wrapper UL.items LI.current") );
				index--;
				
				if(index > 0){
					if(index % carousel.visibleItems == 3){
						if((index+2) != carousel.totalLength){
							carousel.impl.prev();
						}
						var pageNum = parseInt($('.featurecarousel UL.controls .current A').attr("index"));
						carousel.updateCurrentPage(--pageNum);
					}
					carousel.imageLoad(index);
				}
				else if (index == 0){
					carousel.imageLoad(index);
					carousel.navState($this,"add");
				}
				
				var pageNum = parseInt(index / carousel.visibleItems);
				var currentPageNum = $(".carousel-wrapper .controls .current").attr("index");
				
				if (pageNum != currentPageNum){
					var itemNum = ++pageNum * carousel.visibleItems - carousel.visibleItems + 1;
					carousel.impl.scroll(jQuery.jcarousel.intval(itemNum));
					carousel.updateCurrentPage(pageNum);
				}
			});	
			
			$(".gallery-fullscreen .image-info").hover(
				function(){
					$(".gallery-fullscreen .image-container .caption").show();
				},
				function(){
					$(".gallery-fullscreen .image-container .caption").hide();
				}
			);
		}
		
		carousel.navState = function (button,action) {
			if(action == "remove"){$(button).removeClass("disabled");}
			if(action == "add"){$(button).addClass("disabled");}
		}
		
		carousel.navStateUpdate = function (index){
			var item = $(".gallery-fullscreen div.controls li");
			var preBtn = $(".gallery-fullscreen div.controls .previous");
			var nextBtn = $(".gallery-fullscreen div.controls .next");
			
			if (index > 0 && index < (carousel.totalLength - 1)){
				$(item).each(function(){
					if ($(this).hasClass("disabled")){
						carousel.navState($(this),"remove");
					}
				});	
			}
			else if (index == 0) {
				carousel.navState(preBtn,"add");
				if (nextBtn.hasClass("disabled")){
					carousel.navState(nextBtn,"remove");
				}
			}
			else if (index == (carousel.totalLength - 1)) {
				carousel.navState(nextBtn,"add");
				if (preBtn.hasClass("disabled")){
					carousel.navState(preBtn,"remove");
				}
			}
		}
		
	};
	
	
	var carousel_initCallback = function (object) {
		var text = {
			next: {
				label: "Next Page",
				title: "Go to next page"
			},
			prev: {
				label: "Previous Page",
				title: "Go to prev page"
			},
			page: {
				label: "Page",
				title: "Go to page"
			}
		};
		
		var mode = "carousel";
		var carousel = new Carousel(object, text, mode, object.start);
		carousel.init();
		return carousel;
	};
	
	// This initCallback is for gallery fullscreen page
	var carouselFullscreen_initCallback = function (object) {
		var text = {
			next: {
				label: "Next Page",
				title: "Go to next page"
			},
			prev: {
				label: "Previous Page",
				title: "Go to prev page"
			},
			page: {
				label: "Page",
				title: "Go to page"
			}
		};
		var currentItem = window.opener ? window.opener.getCurrentItem() : 1;
		currentItem = currentItem - 1;
		var mode = "fullscreen";
		var carousel = new Carousel(object, text, mode, currentItem);
		carousel.navStateUpdate(currentItem);
		carousel.init();
		return carousel;
	};
	
	var carousel_buttonNextCallback = function (object, element, flag) {
		var element = $(object.options.id + " .featurecarousel UL.controls LI.next");
		if (!flag) {
			$(element).addClass("unclickable");
		}
		else {
			$(element).removeClass("unclickable");
		}
	};
	
	var carousel_buttonPrevCallback = function (object, element, flag) {
		var element = $(object.options.id + " .featurecarousel UL.controls LI.previous");
		if (!flag) {
			$(element).addClass("unclickable");
		}
		else {
			$(element).removeClass("unclickable");
		}
	};

	//Wrap jcarousel in minimun number check.
	$.fn.carouselCustom = function(data){ 
	    if(this.find("li").length <= data.visible) {
	    	this.parent().addClass('no-carousel');
		}
		if( this.length && Modernizr.touch && Modernizr.csstransforms ) {
			data.container = this;
			new TouchCarousel(data);
		} else {
		    this.jcarousel(data); 
		}
	    
	    return this; 
	}
	
	//gbaker@TouchCarousel
	function TouchCarousel() {
		this.init.apply( this, arguments );
	}
	
	//gbaker@TouchCarousel$prototype
	TouchCarousel.prototype = {
	
		constructor: TouchCarousel,
		
		init: function( options ) {
			this.options = options;			
			this.el = options.el;
			// Vars
			this.container = $( this.options.container )
			this.items = this.container.children('LI');
			
			this.subGallery();
			
			// Call super class 
			this.container = this.container;
			this.length = this.items.length;
			this._super = this.options.initCallback( this );
	
			// Pages
			this._pageIndex = 0;
			this._pages = 0;
			
			// Touch
			this.container.addClass('touch-items');
			//debugger;
			this.build();
			
			// Other init fn's
			this.calcWidth();
			this.initScroll();
			this.fireCallbacks();

			// other 
			this.updateGallery()			
		},
		
		build: function() {
			
			// New scrolling wrapper
			this.container.wrap('<div class="featurecarousel-scroller"><div class="featurecarousel-group"></div></div>');
			
			// Ref
			this._group = this.container.parent();
			this._scroller = this._group.parent();
			
			// Remove this because it will be replaced
			this.container.detach();
			
			// Vars
			var group = $('<ul class="items touch-items"></ul>'),
				start = 0,
				visible = this.options.visible,
				offset = this.length % visible,
				pages = $();
			
			// Cache indexes
			this.items.each(function(i){
				$(this).data('carousel-index', i);
			});
			
			// Group items by visible
			while( start < this.length ) {
				
				// How many to slice
				var tempVisible = offset !== 0 && start === 0 && this.options.rtl ? offset : visible; // RTL trick
				
				// Create a page 
				var pageItems = this.items.slice( start, start + tempVisible );
				var page = group.clone(false).append(pageItems);
				
				// Append to the DOM
				this._group.append( page );
				
				// Maintain collection
				pages = pages.add( page );
				
				// Increment pages counter
				start += tempVisible;
				this._pages++;
			}
			
			// Something to refer to.
			this.container = pages;
			this.items = this.container.children('li');
			

		},
		
		// Width of items in on the scroller
		calcWidth: function() {
			var width = 0;
			this._scroller.find('ul').each(function() {
				width += $(this).outerWidth(true);
			})
			this._group.css('width', width);			
		},
		
		// The scroller
		initScroll: function() {
			var self = this;
			var to = this._scroller.get(0);
			this.iscroll = new iScroll( to, {
				snap: 'ul',
				momentum: false,
				hScrollbar: false,
				onScrollEnd: function(e) {
					self._pageIndex = this.currPageX;
					self._super.updateCurrentPage( self.fauxIndex() + 1 );
					self.fireCallbacks();
				}
			});
			this.iscroll.scrollToPage( this.fauxIndex(), 0 );
		},
		
		// Trigger callbacks that the Carousel needs to update the controls	
		fireCallbacks: function() {
			this.options.buttonNextCallback( this, null, this.fauxIndex() !== (this._pages - 1) );
			this.options.buttonPrevCallback( this, null, this.fauxIndex() !== 0 );
		},
		
		// LTR or RTL page index
		fauxIndex: function() {
			return ( this.options.rtl ? (this._pages - (1 + this._pageIndex)) : this._pageIndex )
		},
		
		// Move a page
		scrollToIndex: function() {
			this.iscroll.stop();
			this.iscroll.scrollToPage( this.fauxIndex(), this.options.animation );
			this.fireCallbacks();
		},
		
		subGallery: function() {
			// Gallery
			this.largeImage = $(".image-container .large-image");
			if( this.largeImage.length ) {
				this.previewCarousel = new PreviewTouchCarousel({
					largeimage: this.largeImage, 
					rtl: this.options.rtl,
					items: this.items,
					onChange: $.proxy( this.subGalleryChange, this )
				});
			}
		},
		
		// When the large image is swiped
		// Update the thumbnail carousel and the controls.
		subGalleryChange: function( pos ) {
			this._pageIndex = Math.floor(pos / this.options.visible);
			
			// Move the thumbnail carousel
			if( this.iscroll ) {
				this.iscroll.stop();
				this.iscroll.scrollToPage( this.fauxIndex(), this.options.animation );
			}
			
			// Update the gallery controls etc.
			if( this._super ) {
				this._super.navStateUpdate( pos );
				this._super.imageUpdate( this.items.eq(pos).find('img').attr('alt'), pos + 1, this.items.length );
				this._super.updateCurrent( pos )
			}
			this.fireCallbacks();
		},
		
		// Numbers
		updateGallery: function() {
			if( this.largeImage.length ) { 
				this._super.imageUpdate( this.items.eq( this.fauxIndex() ).find('img').attr('alt'), this.fauxIndex() + 1, this.items.length );
			}
		},
		
		/* Implement same jCarousel Functions */
		
		size: function() {
			return this.length;
		},
		
		scroll: function( pos ) {
			this._pageIndex = Math.floor(pos / this.options.visible);
			this.scrollToIndex();			
		},

		prev: function() {
			this._pageIndex = this.fauxIndex() - 1;
			this.scrollToIndex();
		},

		next: function() {
			this._pageIndex = this.fauxIndex() + 1;
			this.scrollToIndex();
		},
		
		// Helper functions
		
		getItemIndex: function( item ) {
			return $(item).data('carousel-index');
		},
		
		getItems: function() {
			return this.items;
		},

		// Return the faux index of the item or return the real index.
		// Object can be in either state.
		getItemByIndex: function( index ) {
			var self = this,
				item;
			this.items.each(function(i) {
				if( self.items.eq(i).data('carousel-index') === index ) {
					item = self.items.eq(i);
					return false;
				}
			});
			return item || this.items.eq(index);
		},
		
		imageLoad: function( index, callback ) {
			this.previewCarousel.loadIndex( index , callback );			
		}
	};
	
	//gbaker@PreviewTouchCarousel
	function PreviewTouchCarousel() {
		this.init.apply( this, arguments );
	}
	
	//gbaker@PreviewTouchCarousel$prototype
	PreviewTouchCarousel.prototype = {
	
		constructor: PreviewTouchCarousel,
	
		init: function( options ) {
			this.options = options;			
			this.el = options.el;
			// vars
			this.container = $( this.options.largeimage ).empty();
			
			// images
			this._imageIndex = 0;
			this._images = [];
			
			// html
			this.build();
			
			// start
			this.idxHelper = new FauxIndex( this._images.length, 0, this.options.rtl );
			if( this._images.length ) {
				//this.toggleVisibility( this._images.eq( this.idxHelper.getIndex() ), true );
			}
			
			// Scroll
			this.calcWidth();
			this.initScroll();
			
		},
		
		build: function() {
			
			// New scrolling wrapper
			this.container.html('<div class="large-image-scroller"><div class="large-image-group"></div></div>');
			
			// Ref
			this._scroller = this.container.children();
			this._group = this._scroller.children();
			
			// vars
			var largeImage = $('<img class="preview-image" />'),
				items = this.options.items,
				images = $();
			
			// images creation
			items.each(function(i){
				
				//vars
				var item = items.eq(i),
					href = item.find('a:first').attr('href'),
					image = largeImage.clone();
				
				// Save for later
				image.data('imageUrl', href)
				
				// Maintain collection
				images = images.add( image );
			});
			
			
			this._images = images;
			this._group.append( images );
		},
		
		// Width of items in on the scroller
		calcWidth: function() {
			var width = 0;
			this._images.each(function(i) {
				width += $(this).outerWidth(true);
			})
			this._group.css('width', width);			
		},

		// The scroller
		initScroll: function() {
			var self = this;
			var to = this._scroller.get(0);
			this.iscroll = new iScroll( to, {
				snap: true,
				momentum: false,
				hScrollbar: false,
				onScrollStart: function() {
					self.idxHelper.setIndex( this.currPageX );
					self.optimiseIndex( self.idxHelper.getIndex() );
				},
				onScrollEnd: function(e) {
					self.idxHelper.setIndex( this.currPageX );
					self.optimiseIndex( self.idxHelper.getIndex() );
					self.options.onChange( self.idxHelper.getIndex() );					
				}
			});
			this.iscroll.scrollToPage( this.idxHelper.getIndex(), 0, 0 );
		},				
				
		loadIndex: function( index ) {
			this.idxHelper.setIndex( index );
			this.imageDownload( this.idxHelper.getIndex() )
			this.optimiseIndex( this.idxHelper.getIndex() );
			this.iscroll.scrollToPage( this.idxHelper.getIndex(), 0, 600 );
		},
		
		optimiseIndex: function( index ) {
			var images = this._images;
			images.each(function( i ){
				var image = images.eq(i);
				if( i === index || i === index + 1 || i === index - 1) {
					image.css('visibility', 'visible');
				} else {
					image.css('visibility', 'hidden');
				}
			});
			this.imageDownload( index - 1);
			this.imageDownload( index );
			this.imageDownload( index + 1 );

		},
		
		imageDownload: function( index ) {
			var image = this._images.eq( index ),
				imageUrl = image.data('imageUrl');
			
			if( image.attr('src') != imageUrl ) {
				image.attr('src', imageUrl);
			}
		}
	};
	
	//gbaker@FauxIndex
	function FauxIndex() {
		this.init.apply( this, arguments );
	}
	
	//gbaker@FauxIndex$prototype
	FauxIndex.prototype = {
	
		constructor: FauxIndex,
		
		init: function( length, start, rtl ) {
			this.length = length;
			this._index = start;
			this._rtl = rtl || false;
		},
		
		// Get the faux index
		getIndex: function() {
			return ( this._rtl ? (this.length - (1 + this._index)) : this._index )
		},
		
		// Set the true index
		setIndex: function( index ) {
			this._index = index;
		}
		
	};
	
	$.fn.buildComparatorCarousel = function(id) {
		var $carousel = $(id);
		var $featureCarousel =  $carousel.find("UL.items");
		if ($featureCarousel.length > 0) {
			var carouselOptions = {
				id : id,
				rtl: window.ND && ND.rtl,
				visible: 5,
				scroll: 5,
				animation: 8e2,
				initCallback: carousel_initCallback,
				buttonNextCallback: carousel_buttonNextCallback,
				buttonPrevCallback: carousel_buttonPrevCallback
			};
			carouselOptions.itemFallbackDimension = 300;//Sohrab : ie8 fix for build and price
			$featureCarousel.carouselCustom(carouselOptions);
		}
	}
	
	$.fn.buildCarousel = function(options) {
		var scrollNum = $(".featurecarousel-wrapper.buildmodel").size() ? 5 : 6;

		var $featureCarousel =$(".featurecarousel-wrapper UL.items");
		if ($featureCarousel.length > 0) {
			var carouselOptions ={
				rtl: window.ND && ND.rtl,
				visible: scrollNum,
				scroll: scrollNum,
				animation: 8e2,
				initCallback: carousel_initCallback,
				buttonNextCallback: carousel_buttonNextCallback,
				buttonPrevCallback: carousel_buttonPrevCallback
			} ;
			if (scrollNum === 5) {//TODO: update this and replace it with options.isBuildandprice
				carouselOptions.itemFallbackDimension = 300;//Sohrab : ie8 fix for build and price
			}
			$featureCarousel.carouselCustom(carouselOptions);
		}
		
		$carouselWrapper = $(".carousel-wrapper UL.items");
		if ($carouselWrapper.length > 0) {
			$carouselWrapper.carouselCustom({
				rtl: window.ND && ND.rtl,
				visible: 4,
				scroll: 4,
				animation: 8e2,
				initCallback: carouselFullscreen_initCallback,
				buttonNextCallback: carousel_buttonNextCallback,
				buttonPrevCallback: carousel_buttonPrevCallback
			});	
		}
		
		if (options && options.start) {
			carousel.updateCurrentPage(options.start);
		}
	};
	
	$(function(){
		$.fn.buildCarousel();
	});
	
})(jQuery);