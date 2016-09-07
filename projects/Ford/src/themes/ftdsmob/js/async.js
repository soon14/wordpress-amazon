/*
 * Description: async is used to execute an function when an object is available
 * For example, the Bing Map will download other additional scripts,
 * but we don't know when the download is complete.
 */
(function(){
	var w=window;
	var ND = w.ND = w.ND || {};

	w.async = ND.async = function (expr, fun) {
		var num = 40;
		var syncId = w.setInterval(function () {
			if (typeof w[expr] != "undefined") {
				w.clearInterval(syncId);
				fun();
			} else if (!num--) {
				w.clearInterval(syncId);
			}
		}, 800);
	};
})();