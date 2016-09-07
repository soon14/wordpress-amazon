(function($){
	
	var MegaMenu = function (container) {
		var menu = this;
		menu.container = container;
		menu.timeout = 100;
		menu.interval = 100;
		menu.sensitivity = 2;
		
		//hide li title bug 167937 Internal image ID will be shown up when mouse rollover to the extreme right of the vehicle image on the top navigation bar
		
		$("#nav>li").attr('title','');
		//end hide
		
		this.showMenu = function () {
			$(menu.container).addClass("active");
			$("DIV.mega-menu", menu.container).show();
		};
		
		this.hideMenu = function () {
			$(menu.container).removeClass("active");
			$("DIV.mega-menu", menu.container).hide();
		};
		
		
		//hide li title bug 167937 Internal image ID will be shown up when mouse rollover to the extreme right of the vehicle image on the top navigation bar
		
		$("#nav>li").attr('title','');
		//end hide
		
		this.init = function () {
			// Hover over/out
			$(this.container).hoverIntent({
				over: this.showMenu,
				out: this.hideMenu,
				interval: this.interval,
				sensitivity: this.sensitivity,
				timeout: this.timeout
			});
			/*
			// Click
			$(this.container).bind("click", function () {
				menu.showMenu();
				return false;
			});
			*/
			// Close button
			$("DIV.close-button A").bind("click", function () {
				menu.hideMenu();
				return false;
			});
		};
	};
	
	$(function(){
		$("#nav > LI").each(function () {
			if ($(this).children("DIV.mega-menu").size() > 0) {
				var megaMenu = new MegaMenu(this);
				megaMenu.init();
			}
			else if ($(this).children("DIV.menu").size() > 0) {
				$(this).hover(
					function() {
						$(this).addClass("active");
					},
					function() {
						$(this).removeClass("active");
					}
				);
			}
		});
	});
	
})(jQuery);