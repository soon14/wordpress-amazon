
/**
 * author: Ronnel Ocampo
 * 100% derivative car for only 1 model
 */
(function ($) {

    $(function () {

        var $carField = $('#c-first-row').find('.car-field');
        var $derivatives = $carField.find('.derivative-car');

        $carField
            .find('.derivative-car:only-child')
            .addClass('only-child');

        if ($derivatives.length === 1) {
            var $colgroups = $('#tables')
                .find('.specification-table')
                .find('colgroup')
                .addClass('single-group');

            // Fix IE 8 & 9 repaint bug
            $colgroups.hide().show(0);
        }
		else if ($derivatives.length === 4 ) {
			$('#c-first-row').find('#c-vehicles-to-compare').addClass('grid-4');
			$carField.addClass('grid-4');	
		}



    });


})(jQuery);