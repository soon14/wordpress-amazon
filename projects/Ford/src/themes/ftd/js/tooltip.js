(function($){
	
	var Tooltip = function (container, link, parent) {
		var tooltip = this;
		tooltip.container = container;
		tooltip.link = link;
		tooltip.parent = parent;
		tooltip.interval = 50;
		tooltip.timeout = 50;
		tooltip.sensitivity = 2;
		tooltip.itemheight = $(tooltip.parent).height() + parseInt($(tooltip.parent).css("margin-bottom"));
		
		tooltip.showTooltip = function () {
			var tiptop = $(tooltip.parent).offset().top - $(window).scrollTop();
			var tipbottom = $(window).height() - $(tooltip.parent).height() - tiptop;
			if (tipbottom <= tooltip.itemheight){
				$(tooltip.container).addClass("tooltip-top");
			}
			$(tooltip.container).show();
			$(tooltip.parent).css("z-index","1000");
		};
				
		tooltip.hideTooltip = function () {
			$(tooltip.container).removeClass("tooltip-top").hide();
			$(tooltip.parent).css("z-index","");
		};
		
		tooltip.init = function () {
			$(tooltip.link).hoverIntent({
				over: tooltip.showTooltip,
				out: tooltip.hideTooltip,
				interval: tooltip.interval,
				sensitivity: tooltip.sensitivity,
				timeout: tooltip.timeout
			});
		};
	};
	
	
	$.fn.tooltip = function() {
		var $links = $("a.tooltip");
		if ($links.size() > 0) {
			$links.each(function () {
				var $link = $(this);
				var $parent = $link.parent();
				var $container = $("div.tooltip", $parent);
				if ($container.size() === 1) {
					$parent.removeClass("hover");
					var tooltip = new Tooltip($container, $link, $parent);
					tooltip.init();
				}
				
			});
		}
	}
	
	$(function(){
		$.fn.tooltip();
	});
	
	$(function(){
		var $galleryLink = $(".gallery a.tooltip");
		if ($galleryLink.size() > 0) {
			$galleryLink.each(function () {
				var $gLink = $(this);
				if ( /iPhone|iPad|iPod/.test( navigator.platform ) ) {
					$gLink.bind("mouseover", function(){
						$gLink.trigger("click");
					});
				}
			});
		}
	});
	
})(jQuery);