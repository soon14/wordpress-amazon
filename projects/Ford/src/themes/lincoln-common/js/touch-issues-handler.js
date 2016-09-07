/*
* contains all solutions for touch issues
* require initial.js
* Author: Ray Huang
*/

(function($) {
	$(function() {
		if(ND.isIpad()){//only trigger under certain devices
			/*
			* fixes flyouts cannot be closed on ipad, remove "active" on any touch on ipad
			*/
			$(document).on("touchend",function(){
				$("#nav > li.active").removeClass("active");//anything gets to document will remove all active states on certain element
				$(".btn-wrapper.share-btn-wrapper.active").removeClass("active");
				$(".nameplate .color-picker ul > li").removeClass("active");
			})
			
			/*
			* fixes menu cannot be closed on ipad
			*/
			$("#nav > li").on("touchend",function(e){
				$("#nav > li").removeClass("active");
				$(this).addClass("active");
				e.stopPropagation();//stop event bubbling to this event
			})
			
			$("#nav > li > a").on("touchend",function(e){
				e.preventDefault();//prevent tag "a" default behaviour which jump to the top of the page
			})
			
			/*
			* fixes share flyout contents cannot be closed on ipad
			*/
			$(".btn-wrapper.share-btn-wrapper").on("touchend",function(e){
				$(this).addClass("active");
				e.stopPropagation();//stop event bubbling to this event
			})
			
			$(".btn-wrapper.share-btn-wrapper > a").on("touchend",function(e){
				e.preventDefault();//prevent tag "a" default behaviour which jump to the top of the page
			})
			
			/*
			* fixes colourisor flyout cannot be closed on ipad
			*/
			$(".nameplate .color-picker ul > li").on("touchend",function(e){
				$(".nameplate .color-picker ul > li").removeClass("active");
				$(this).addClass("active");
				e.stopPropagation();//stop event bubbling to this event
			})
			
		}else{//for desktop browsers, normal behaviours
			
			$("#nav > li, .btn-wrapper.share-btn-wrapper, .nameplate .color-picker ul > li").hover(function(){
				if(!$(this).hasClass("active")){
					$(this).addClass("active");
				}
			},function(){
				if($(this).hasClass("active")){
					$(this).removeClass("active");
				}
			})
		}
	});
}(jQuery));
