$(document).bind("mobileinit", function () {
    //console.log('mobileinit');
    $.mobile.ajaxEnabled = false;
    $.mobile.linkBindingEnabled = false;
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled = false;
    
    var firstPage = true;
    // Remove page from DOM when it's being replaced
    $('div[data-role="page"]').live('pagehide', function (event, ui) {
    	//console.log('pageHide');
    	if (!firstPage) {
    		$(event.currentTarget).remove();
    	}
    	firstPage = false;
    });
    
});