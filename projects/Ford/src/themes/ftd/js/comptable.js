(function($) {
	var ComparatorContainer = function(compContainer) {
		var comparatorContainer = this;

		comparatorContainer.init = function() {
			var tables = $(compContainer).children("TABLE");
			if (tables.size() > 0) {
				tables.each(function() {
					var links = $(this).find("a.button");
					links.each(function() {
						$(this).click(function(event) {
							event.preventDefault();
							comparatorContainer.removeColumn(this);
						});
					});
				});
			}
		};

		comparatorContainer.removeColumn = function(linkButton) {
			var index = $(linkButton).parent("td").prevAll().length;
			var tables = $(compContainer).children("TABLE");
			var colCount = $(tables).eq(0).find('TR').eq(1).find("TD").size() - 1;

			tables.each(function() {
				if (colCount > 2) {
					var cells = $(this).find(
							'td:nth-child(' + (index + 1) + ')');
					cells.remove();
					if (colCount == 3) {
						$(this).find('TR').eq(2).remove();
						$(this).find("TBODY TR:even").removeClass("odd");
						$(this).find("TBODY TR:odd").removeClass("even");
						$(this).find("TBODY TR:even").addClass("even");
						$(this).find("TBODY TR:odd").addClass("odd");
					}
				}
			});
		};
	};

	$(function() {
		var comparatorContainer = new ComparatorContainer($(".compa"));
		comparatorContainer.init();
	});

})(jQuery);