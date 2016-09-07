/*
Author: 		Jessie Biros
File name: 		guxApp.accordion.js
Description: 	Accordion [used in model-walk-compare]
				How to use:
				1. add class "tabular" on your container
				2. To create tabs 
					a. create a container (eg. div) and add the class name "tab item"
					
					b. for the title of the nav add a text tag (or any container) inside "tab-item" and add class "tab-nav"
					
					c. after the 'tab-nav' create a container and add a class "tab-contents" that will serve as the wrapper of your contents
					
					d. for you to add styles (eg. margin/padding) on your contents you need to add a container again inside and add a class name "tab-data" and inside that container you may put your contents

				3. To disable a specific tab-item from opening and closing add the class "disable" to that "tab-item" DIV i.e. <div class="tab-item disable">...

				Example:
					<section class="accordion-block">
						<div class="tab-item">
							<h2 class="tab-nav">
								  //title of tab
							</h2>
							<div class="tab-contents">
								<div class="tab-data">
								  //lorem ipsum ...
								</div>
							</div>
						</div>
					</section>

Dependencies: 	jQuery
*/

var guxApp = guxApp || {};

(function($){
	guxApp.accordion = {
		init: function(){
			var accordionBlock = $('.accordion-block');

			if(!accordionBlock.length){return;}
			$('.tab-item .open').next().css('display','block');
            this.stickyTitle();
            var me = this;
			$('.tab-nav',accordionBlock).off('click').on('click', function(){
				var self = $(this);

				// if the current accordion "tab-item" has the disable class do not go any further
				if (self.hasClass('disable')){return;}

                $(".title-holder").trigger("sticky_kit:detach");
				if(!self.hasClass('open')) {
					guxApp.accordion.toggleAnimate($('.tab-nav.open:not(".disable")',accordionBlock).removeClass('open'));
					self.toggleClass('open');
					guxApp.accordion.toggleAnimate(self);
				} else {
					guxApp.accordion.toggleAnimate(self.removeClass('open'));
					$.publish("accordion-tab-nav-close");
				}
			});

			// Added Functionality to Close on Click of Close Button inside Accordion; class:close-accordion
			var closeAccordion = $('.close-accordion',accordionBlock);
			if(closeAccordion.length){
				$('.close-accordion',accordionBlock).off('click').on('click',function(e){
					e.preventDefault();
					guxApp.accordion.toggleAnimate($('.tab-nav.open',accordionBlock).removeClass('open'));
					$('.selected-sticky').addClass('fixed');
	                var offsetTop = accordionBlock.offset().top - $('.selected-sticky').outerHeight() - 50;
	                $('html,body').animate({scrollTop: offsetTop},200);
				});
			}

			$(window).on("resize",function(){
				$(".title-holder").trigger("sticky_kit:detach");
			});
		},
		toggleAnimate: function (elem){
			elem.next().animate({
				'height': 'toggle',
				opacity : 'toggle'
			}, {
				duration: 600,
				complete: function() {
					$.publish("accordion-tab-nav-open",[$(this).prev()]);
					$(document).foundation('equalizer', 'reflow');
				}
			});
		},
		toggleWaypoint: function (){
		},
		stickyTitle: function(){
			$(".title-holder").stick_in_parent({
				parent:".title-waypoint",
				offset_top: 350,
				recalc_every: 5
			});
		},
		recalcSticky: function(){
			$(document.body).trigger("sticky_kit:recalc");
		}
	};

	$(function(){
		guxApp.accordion.init();
	});

})(jQuery);