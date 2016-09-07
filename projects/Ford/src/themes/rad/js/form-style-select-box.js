/**
 * @author: Brett Chaney
 * @project: form builder/rad
 * 
 * @description: styles select boxes for new forms
 */

ND.FormBuilder = window.ND.FormBuilder || {};

(function($) {
	// Loop through select box options and slice options with long text
	ND.FormBuilder.styleSelectOptions = function($select) {
		
		if (typeof $select === 'undefined' || $select == null || $select.length === 0 ) {
			$select = $('select');
		}
		
		var children = $select.children();
		if (children.length > 0) {
			children.each(function() {
			    var child = $(this),
			    	currentSel     	= child.text(),
			        currentLength  	= currentSel.length,
			        selectWidth 	= parseInt(child.parent().parent().width());

			    if (!child.parent().hasClass('remove-select-fix')) {

				    if (currentLength > 16 && selectWidth < 290) {
				    	
				        child.text(currentSel.slice(0, 16) + "...");
				    } else if (currentLength > 30 && selectWidth < 350) {
				    	
				        child.text(currentSel.slice(0, 30) + "...");
				    } else if (currentLength > 35 && selectWidth < 450) {
				    	
				    	child.text(currentSel.slice(0, 35) + "...");
				    } else if (currentLength > 40 && selectWidth < 550) {
				    	
				    	child.text(currentSel.slice(0, 50) + "...");
				    } else if (currentLength > 55 && selectWidth < 620) {
				    	
				    	child.text(currentSel.slice(0, 55) + "...");
				    }

				}


			});
		}

	};


	$(window).on('resize', function() {
		ND.FormBuilder.styleSelectOptions();
	});
	
	$(function() {
		$('select').bind("focus",function(){
			ND.FormBuilder.styleSelectOptions();
		});
	});


})(jQuery);