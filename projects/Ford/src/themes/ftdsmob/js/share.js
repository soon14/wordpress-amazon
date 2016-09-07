/* 
 * Share
 * Add current page url to the addthis link.
 * Update addthis button
 */
(function(){
	var ND = window.ND = window.ND || {};


	var share = ND.share = {
		init: function($links, link){
			var i;

			link = link ? link.toLowerCase() : location.href;
			link = encodeURIComponent(link);

			for (i = $links.length; i-- >0;){
				var $this = $links[i];
				var url = $this.href.toLowerCase();

				if(url.indexOf("url=")<0){
					var query = url.indexOf("?") >= 0 ? "&url=" : "?url=";
					url = url + query + link;
				}else{
					url = url.replace(/url=[^&#]+/g, "url=" + link);
				}
				$this.href = url;
			}
		}
	};

})();
