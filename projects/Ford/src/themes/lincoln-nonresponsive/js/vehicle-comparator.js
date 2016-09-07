/*

Author:Doris

*/

(function ($) {
	
    var VehicleComparator = {

        init: function () {

            $('#c-derivative-carousel UL#c-drv-featurecarousel-ul > LI > .c-derivative-list-item').live('click', function (e) {
                var nameplate = $('#c-nameplate-carousel UL#c-featurecarousel-ul > LI').filter('.cur');
                if (nameplate.length > 0) {
                    $('#c-nameplate-carousel UL#c-featurecarousel-ul > LI').removeClass('cur').removeClass('click');
                    nameplate.addClass('click');
                }
            });

            $('#c-nameplate-carousel UL#c-featurecarousel-ul > LI > .c-nameplate-list-item').live('click', function (e) {
                $('#c-nameplate-carousel UL#c-featurecarousel-ul > LI').removeClass('cur').removeClass('click');
                $(this).closest('li').addClass('click');
            });

        }

    };
	
    $(function () {

        VehicleComparator.init();

	});
	
})(jQuery);