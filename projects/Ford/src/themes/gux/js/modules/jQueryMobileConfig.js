/*
Author: Ruiwen Qin
File name: jQueryMobileConfig.js
Description: Configure the initilization data for jQuery mobile page

Dependencies: jQuery, jQuery mobile
*/


(function($){
    $(document).bind("mobileinit", function() {
        $.mobile.ajaxEnabled = false;
        $.mobile.ignoreContentEnabled = true;
    });

})(jQuery);