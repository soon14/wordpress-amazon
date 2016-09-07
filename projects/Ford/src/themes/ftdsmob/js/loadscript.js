/*Loadscript from third part url*/
(function($){
	var ND = window.ND = window.ND || {};

	ND.loadScript = function(url, callback){

		var script = document.createElement("script")
		script.type = "text/javascript";

		if (script.readyState){  //IE
			script.onreadystatechange = function(){
				if (script.readyState == "loaded" ||
						script.readyState == "complete"){
					script.onreadystatechange = null;
					callback();
				}
			};
		} else {  //Others
			script.onload = function(){
				callback();
			};
		}

		script.src = url;
		document.body.appendChild(script);
	}
})(jQuery);