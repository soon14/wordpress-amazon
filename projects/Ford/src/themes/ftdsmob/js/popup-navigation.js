/**
 * Created by bjie on 1/7/2015.
 */

//remove the default drop down icon style and add a custom one
(function($) {
    $(document).on('pageinit', function(){
        var parent = $('.ui-icon.ui-icon-arrow-d.ui-icon-shadow').parent();
        $('.ui-icon.ui-icon-arrow-d.ui-icon-shadow').remove();
        parent.append('<span class="nav-dropdown-icon">&nbsp</span>');
        $('.article .ui-select select, .ui-navbar .ui-select select').change(function(){
            var redirectUrl = $(this).val();
            if(redirectUrl.length <= 0){
                return;
            }
            var selectedOption = $(this).find('option[value="'+redirectUrl+'"]');
            var shouldNewTab = selectedOption.data('target');
            if(shouldNewTab === true){
                window.open(redirectUrl);
            }else{
                location.href = redirectUrl;
            }
        });
    });
})(jQuery);