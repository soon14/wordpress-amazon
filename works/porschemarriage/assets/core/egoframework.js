/**
 * User: remcokrams
 * Date: 07-02-13
 * Time: 12:20
 *
 * This is the basis of the egoframework
 *
 */

(function () { //all vars within this function are local
    "use strict"; //turn on strict mode

    var currentScript = (function () {
        if(document.currentScript && document.currentScript.getAttribute("data-main")) { //current script is supported in chrome & firefox (of course not IE)
            return document.currentScript;
        }

        var scripts = document.getElementsByTagName("script");
        for(var i= 0, c = scripts.length;i < c;i++) {
            if(scripts[i].getAttribute("data-main")) {
                return scripts[i];
            }
        }

        return null;
    })();

    if(!currentScript) {
        throw "Can't locate the currently executing script!";
    }

    var currentScriptDir = currentScript.src.split("/").slice(0, -1).join("/");

    //to be able to position the core folder somewhere else we should add the location of the main.js file inside of the script tag calling this script.
    var antiCache = currentScript.getAttribute("data-cache");
    var main = currentScript.getAttribute("data-main");
    var context = currentScript.getAttribute("data-context") || "default";
	var preloadBehaviour = currentScript.getAttribute("data-preload") || "window.onload";

    var scriptEl = document.createElement("script");

    window.require = {
        waitSeconds : 200
    };

    if(antiCache == "*") {
        window.require.urlArgs = "c=" + (new Date()).getTime(); // add anticaching
    }
    else if(antiCache) {
        window.require.urlArgs = "c=" + antiCache; // add anticaching
    }

    scriptEl.setAttribute("data-main", main);
    scriptEl.src = currentScriptDir + "/require.js";
    currentScript.parentNode.insertBefore(scriptEl, currentScript.nextSibling);

    var windowLoaded = false,
        windowLoadedCallbacks = [];

    window.Egoframework = {
        context : context,
		preloadBehaviour : preloadBehaviour,

        windowLoaded : function (callback) {
            if(windowLoaded) {
                callback();
            }
            else {
                windowLoadedCallbacks.push(callback);
            }
        }
    };

    var onWindowLoaded = function () {
        windowLoaded = true;

        //flush the callbacks
        for(var i= 0, callback;callback = windowLoadedCallbacks[i];i++) {
            callback();
        }
        windowLoadedCallbacks.length = 0;
    }

    if(window.attachEvent) {
        window.attachEvent('onload', onWindowLoaded);
    }
    else if(window.addEventListener) {
        window.addEventListener('load', onWindowLoaded, false);
    }
    else {
        document.addEventListener('load', onWindowLoaded, false);
    }
})();
