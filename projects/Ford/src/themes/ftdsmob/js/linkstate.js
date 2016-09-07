/* 
 * Link State
 * Compare the current page url with anchors,
 * if match attach the selected class.
 */
(function($){
	var defaults = {
		selectedClass: "ui-btn-active"
	};

	$.fn.linkState = function(options){

		var settings = $.extend(true, {}, defaults, options);

		return this.each(function(){
			var $this = $(this);
			var absoluteUrl = $this[0]["href"];

			if(isCurrentLink(absoluteUrl)){
				$this.addClass(settings.selectedClass);
			}else{
				$this.removeClass(settings.selectedClass);
			}
		});
	};

	/*
	 * some url of the device will be like:
	 * 1) http://zliang-pc/smart_dealer.html#/smart_assistance.html
	 * 2) http://zliang-pc/smart_assistance.html
	 */
	function isCurrentLink(url){
		if(!url){
			return 0;
		}
		url = getRelativeUrl(url);

		//if current is case 1, get the fragement url.
		var current = location.href,
			i = current.indexOf('#/');
		if(i>-1){
			//remove all string before '#' and keep the '/'
			current = current.substr(i + 1);
		}

		if(current.indexOf(url) > -1){
			return 1;
		}
		return 0;
	}

	//remove the host and the fragment parameters
	function getRelativeUrl(url){
		var host = location.host, len = host.length, idx = url.indexOf(host);
		if(idx > 0){
			url = url.substr(idx + len);
		}
		return url;
	}

})(jQuery);