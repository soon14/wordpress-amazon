/*! hasflash.js version 1.0 gbaker 
*/
(function(window, Plugin){
	if(window['hasflashjs']){return;}
	else {window['hasflashjs']=1;}
	try {
		var flashVersion = Plugin.description || (function () {
			return (
				new Plugin('ShockwaveFlash.ShockwaveFlash')
			).GetVariable('$version');
		}())
	}
	catch (e) {
		flashVersion = 'Unavailable';
	}	
	var flashVersionMatchVersionNumbers = flashVersion.match(/\d+/g) || [0],
		fv = parseInt(flashVersionMatchVersionNumbers[0], 10) || 0,
		t = "has-js js", 
		de = document.documentElement,
		setDE = function(s){
			de.className += (de.className == "" ? "" : " ") + s;
		};
	if(!isNaN(fv) && fv > 1 && fv < 100) {
		t += " has-flash";
		for(var x = fv; x >= 8; x--) {
			t += " flash-gt-eq-" + x;
		}
	}
	setDE(t);
})(window, navigator.plugins['Shockwave Flash'] || window.ActiveXObject);