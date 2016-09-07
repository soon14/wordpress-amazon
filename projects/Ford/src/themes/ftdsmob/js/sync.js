(function($) {
	$(function(){
		$(".overlay-sync").click(function(){
		//sync omniture
	     $.publish('/analytics/link/', { 
				title: "sync:change sync version",
				link: this,
				type: "o",
				onclicks: "change sync version"
			});
		});
	});
})(jQuery);