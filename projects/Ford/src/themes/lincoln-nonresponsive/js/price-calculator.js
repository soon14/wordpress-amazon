/*

Author:Doris

*/

(function ($) {
	
    var PriceCalculator = {

        init: function () {
            if (!$('body').is('.calculator')) { return; }
            PriceCalculator.radioSelect();
            PriceCalculator.slideBlock();
        },

        radioSelect: function () {
            if ($("input[type='radio']").length == 0) { return; }

            var radiobtn = $("input[type='radio']").filter(function () {
                var $this = $(this);
                if ($this.prop('checked')) {
                    $this.addClass('checked');
                }
                return $this;
            });

            $("input[type='radio']").parent().find($('label')).on('click', function () {
                var $thisInput = $(this).parent().find($('input'));
                var groupName = $thisInput.prop('name');
                var radioGroup = $("input[name='" + $thisInput.prop('name') + "']");
                radioGroup.removeProp('checked');
                radioGroup.removeClass('checked');
                $thisInput.prop('checked', 'true');
                $thisInput.addClass('checked');
            });

            radiobtn.on('change', function () {
                var $this = $(this);
            });
        },

        slideBlock: function () {            
            var slide = $('.controller .slide');

            if (slide.length == 0) { return; }

            var sliderELE = $("<div id='slider'></div>"),
                maxstep = $('.block', slide).length;
            sliderELE.insertAfter(slide);
            sliderELE.slider({
                orientation: "horizontal",
                range: "min",
                min:1,
                max: maxstep,
                step: 1,
                value:0,
                slide: function (event, ui) {
                    if (ui.value >= 0) {
                        var block = $('.block', slide).eq(ui.value-1);
                        $(ui.handle).html(block.html());
                    }
                },
                create: function (event, ui) {
                    $('.ui-slider-handle', sliderELE).html($('.block', slide).eq(0).html());
                }
            });
        }

    };
	
    $(function () {

	    PriceCalculator.init();

	});
	
})(jQuery);