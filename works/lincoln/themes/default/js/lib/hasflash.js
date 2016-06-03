/*! hasflash.js version 1.0 gbaker 
 *	Flash Detect from MIT/GPL - http://jquery.thewikies.com/swfobject/
 * */
/*jslint onevar: true, undef: true, eqeqeq: true, regexp: true, newcap: true, immed: true */
/*globals navigator, window, document */
(function(window, Plugin, footprint){
	if(window[footprint]){return;}
	else {window[footprint]=1;}
	var getFlashVersion = function() {
			var flashVersion;
			try {
				flashVersion = Plugin.description || (function () {
					return (
						new Plugin('ShockwaveFlash.ShockwaveFlash')
					).GetVariable('$version');
				}());
			}
			catch (e) {
				flashVersion = 'Unavailable';
			}
			return flashVersion;
		},
		flashVersionMatchVersionNumbers = getFlashVersion().match(/\d+/g) || [0],
		fv = parseInt(flashVersionMatchVersionNumbers[0], 10) || 0,
		t = "has-js js", 
		de = document.documentElement,
		setDE = function(s){
			de.className += (de.className === "" ? "" : " ") + s;
		},
		counter;
	if(!isNaN(fv) && fv > 1 && fv < 100) {
		t += " has-flash";
		for(counter = fv; counter >= 8; counter--) {
			t += " flash-gt-eq-" + counter;
		}
	}
	setDE(t);
}(window, navigator.plugins['Shockwave Flash'] || window.ActiveXObject, 'hasflash-js-footprint'));