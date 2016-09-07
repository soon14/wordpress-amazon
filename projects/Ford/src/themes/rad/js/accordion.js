/*
Author: 		Brett Chaney
Description: 	Accordion taken from global.js in FTD2010 JS folder and added to ND namespace.
				Amends made to extend functionality for title links.
				Also add "single-open" class to "accordion-panel" DIV so only a single panel will open at any one time and prev/back buttons.
*/

ND = window.ND = window.ND || {};

(function($){

	ND.accordionMod = {
		init:function() {

			var curStep 	= $(".accordion-panel ul li").index($("li.active")) + 1,
				nextStep 	= curStep + 1,
				prevStep 	= curStep - 1;


			if(!$(".accordion-active").size()) {return;}
			
			$("div.accordion-active > UL > LI > DIV.dropdown").hide();
			$("div.accordion-active > UL > LI.active > DIV.dropdown").show();

			$("div.accordion-active > UL > LI > DIV.tab-area a").click(function(e) {
				e.stopPropagation();
			});

			$("div.accordion-active > UL > LI > DIV.tab-area").each(function() {

				if (!$(this).next().hasClass('dropdown')) {
					$(this).addClass('no-dropdown');
				}

			});

			$("div.accordion-active > UL > LI > DIV.tab-area").click(function(){

				var $this 		= $(this);

				// Add "single-open" class to "accordion-panel" DIV if you require only one panel to be open at any one time
				if ($(".accordion-panel.single-open")[0]) { 
				
					if($this.parent("li").hasClass("active")) {
						return;
					}
					$this.parents(".accordion-panel").find(".dropdown").slideUp(200).parent("li").removeClass("active");

					setTimeout(function() {
						$('html, body').animate({
					        scrollTop: $this.offset().top
					    },150);

					    // Show all dropdowns in Personalisation section
					    if ($(".panel").length) {
					    	$("div.accordion-active .panel .dropdown").show();
					    }
						
					},250);
					
				}

				if ($this.next().hasClass('dropdown')) {
					
					if(!$this.parent("li").hasClass("active")){
						$this.next("div.dropdown").slideDown(200);
						$this.parent("li").addClass("active");
					} else {
						$this.next("div.dropdown").slideUp(200);
						$this.parent("li").removeClass("active");
					}

					if ($(".single-open")[0]) { 
						nextStep = $(".accordion-panel > ul > li").index($("li.active")) + 2;
						prevStep = $(".accordion-panel > ul > li").index($("li.active"));
					}

				} else {

					var currLink = $this.find('a').attr('href');
					location.href = currLink;
				}
				
			});


			if ($(".accordion-panel.single-open")[0]) { 

				$(".accordion-next").on("click", function(e) {
					e.preventDefault();
					$("div.single-open > ul > li:nth-child(" + nextStep + ") > DIV.tab-area").trigger('click');
				});

				$(".accordion-prev").on("click", function(e) {
					if($(this).hasClass("islink")){
						return;
					}
					e.preventDefault();
					$("div.single-open > ul > li:nth-child(" + prevStep + ") > DIV.tab-area").trigger('click');
				});

			}

		}
	};

	$(function(){
		ND.accordionMod.init();
	});

})(jQuery);