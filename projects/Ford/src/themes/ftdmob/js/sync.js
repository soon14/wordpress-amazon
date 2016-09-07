$(document).ready(function() {
	var syncbutton = $(".overlay-sync");
	syncbutton.bind("click", function(e) {
		var p = {'link':'this','onclicks':'change sync version','type':'o','title':'sync:change sync version'};
		if(window._da && ND && ND.omniture ) {$.publish('/analytics/link/',p);p=null; }//{ND.omniture.trackLink(p);p=null;}
	})
});