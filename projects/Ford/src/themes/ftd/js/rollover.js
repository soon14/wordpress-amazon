/*
Add a clickable area on principal image.
*/

(function ($) {

	var defaults = { x: 100, y: 100, w: 100, h: 100, style: "", url: "", href: "", target: "_self" };
	var hover = "<a style=\"display:block;position:absolute;z-index:10;\"><span style=\"background:url('{0}') no-repeat;visibility:hidden;display:block;height:100%\">&nbsp;</span></a>";

	$.fn.rollOver = function (options) {
		var settings = $.extend(true, {}, defaults, options);

		return this.each(function () {
			var $container = $(this);

			var $hover = $(hover.replace("{0}", settings.url));
			//Alternative background image.
			var $alter = $("SPAN", $hover);

			$hover.attr({
					href: settings.href,
					target: settings.target
				})
				.mouseenter(function(){
					$alter.css({ visibility: "visible" });
				})
				.mouseleave(function(){
					$alter.css({ visibility: "hidden" });
				})
				.appendTo($container);

			if(settings.style){
				$hover.attr({
					style: settings.style
				});
			}else{
				$hover.css({
					top: settings.y,
					left: settings.x,
					width: settings.w,
					height: settings.h
				});
			}
		});
	}

	$.fn.rollOver.defaults = defaults;

})(jQuery);