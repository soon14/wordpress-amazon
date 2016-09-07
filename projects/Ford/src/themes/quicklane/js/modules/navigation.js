/*
Author: 		Roy Anonuevo
File name: 		navigation.js
Description: 	global navigation functionalities and animations including language selector
Dependencies: 	jQuery
*/

(function($){

	var navigation = {

		init: function(){			
			if(!$('#header').length){return;}

			var self = this;

			// cache dom
			this.$window = $(window);
			this.$document = $(document);
			this.$header = $('#header');
			this.$burgerMenu = this.$header.find(".burger-menu");
			this.$languageSelector = this.$header.find(".language-selector");
			this.$languageSelectorLink = this.$header.find(".language-selector > a");
			this.$languageSelectorList = this.$languageSelector.find(".language-selector-list");
			this.$nav = this.$header.find("nav");
			this.$navLink = this.$nav.find("ul li a");
			this.$navPanel = this.$nav.find(".nav-panel");

			this.burgerNav();

			// bind listener
			this.$window.on('resize', this.winResize.bind(this));
			//this.$burgerMenu.on('click', this.toggleMenu.bind(this));
			this.$navLink.on('click', this.navLink.bind(this));	
			this.$document.on('click', this.documentPropagation.bind(this));
			this.$navPanel.on('click', this.stopPropagation.bind(this));
			this.$languageSelectorLink.on('click', this.languageSelector.bind(this));
			this.$languageSelector.on('click', this.stopPropagation.bind(this));
			
			this.detectColumns();		

		},

		winResize: function(){
			if(qlApp.viewport.view == "mobile"){				
				this.$nav.hide();
				setTimeout(function(){ $("nav","#header").show(); }, 100);
			}else{
				this.$nav.show();
			}
		},

		// toggleMenu: function(){
		// 	var self = this;

		// 	if(qlApp.viewport.view == "mobile"){
		// 		self.$nav.show();

		// 		setTimeout(function(){ self.$header.toggleClass("show"); }, 100);
		// 	}else{
		// 		self.$header.toggleClass("show");
		// 	}
		// },

		burgerNav: function(){
			$(".burger-menu","#header").on('click', function(e){
				e.preventDefault();
				$("#header").toggleClass("show");
			});
		},

		navLink: function(e){
			var el = e.target;

			if(qlApp.viewport.view != "mobile" && !$(el).parent().hasClass("active")){
				if(!$(el).parents(".nav-panel").length){
					e.preventDefault();
				}
			}

			this.$nav.find("ul li.active").removeClass("active");
			$(el).parent('li').addClass("active");

			this.respositionPanel(el);
		},

		respositionPanel: function(el){
			var navOffset = this.$nav.find("ul").offset().left;
				linkOffset = $(el).parent().offset().left,
				linkWidth = $(el).parent().outerWidth(),				
				linkOffsetWidth = Math.abs(navOffset - linkOffset) + linkWidth,
				$navPanel = $(el).parent().find(".nav-panel");
				navPanelWidth = $navPanel.outerWidth(),
				left = linkOffsetWidth - navPanelWidth;
			
			if(qlApp.tools.isIE(8)){
				navPanelBorderRight = $navPanel.css("border-right-width");
				left += 6;
			}

			if(navPanelWidth < linkOffsetWidth){
				$navPanel.css({"left": left});
			}
		},

		stopPropagation: function(e){
			e.stopPropagation();
		    e.stopImmediatePropagation();
		},

		documentPropagation: function(e){
			if(!$(e.target).parent("li").length){
				this.$nav.find("ul li.active").removeClass("active");
				this.$languageSelectorList.hide();
				this.$languageSelector.removeClass("show-language-list");
		    }		    
		},

		languageSelector: function(e){
			e.preventDefault();
			this.$languageSelector.toggleClass("show-language-list");

			if(qlApp.viewport.view == "mobile"){		
				this.$languageSelectorList.slideToggle();
			}else{
				this.$languageSelectorList.toggle();
			}
		},

		detectColumns: function(){
			this.$navPanel.each(function(){
				if($('> .row .columns', this).length > 1){
					$(this).addClass('wide-col');
				}
			});
		}
	}

	$(function(){
		navigation.init();
	});

})(jQuery);
