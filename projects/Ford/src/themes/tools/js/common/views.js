/**
 * 
 */
Views = {
	Buildandprice: {},
	Comparator: {},
	Helper: {
		translateTextOnView : function(selector) {
			if (!selector) {
				selector = $('span.bpt');
			} else {
				selector = selector.find('span.bpt');
			}
			selector.each(function() {
				var tiz = $(this);
				tiz.removeClass('bpt');
				tiz.text(Translator.translate(tiz.text()));
			});
		}
	}
};