// feedback Url
(function($){
	var ND = window['ND'] || {};
	ND.feedbackURL = function(exurl){				
		if ($("#feedback").length > 0){
			var mark = "";
			if (exurl.length > 0 && (exurl.indexOf("?") != -1)){
				mark = "&";
			}
			exurl +=  mark + "fbdata=";
			var currentUrl = window.location;
			var param = encodeURIComponent("feedback_url=" + currentUrl);
			exurl += param;			
			var feedbackMarkup = "<iframe id='feedbackwrap' src = '"+exurl+"' scrolling='no' frameborder='0' style='border:none; overflow:hidden; width:100%;'></iframe>";
			$("#feedback").append(feedbackMarkup);
		}					
	};
})(jQuery);