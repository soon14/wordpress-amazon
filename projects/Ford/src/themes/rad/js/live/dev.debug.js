
/*
* Description: Check a object, when it's avaiable exec the function, etc:
  $ready("CompanyNamespace.Package.FunctionName", function(){ 
      //do something with CompanyNamespace.Package.FunctionName;
  });
* Author: ChunLiang Zhang
*/


(function(window){

  window.$ready = function(tag, func) {
    var syncId, count = 200,
        tagAry = tag.split('.'), len = tagAry.length;

    var verify = function(){
      var i = 0, obj = window;

      do {
        obj = obj[tagAry[i]]
        if(!obj) return false;
      } while(++i < len);

      func();
      return true;
    };

    !verify() && (syncId = window.setInterval(function() {
      if (verify() || !count--) {
        window.clearInterval(syncId);
      }
    }, 150));

  };

})(window);


/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-fontface-backgroundsize-borderimage-borderradius-boxshadow-flexbox-flexboxlegacy-hsla-multiplebgs-opacity-rgba-textshadow-cssanimations-csscolumns-generatedcontent-cssgradients-cssreflections-csstransforms-csstransforms3d-csstransitions-applicationcache-canvas-canvastext-draganddrop-hashchange-history-audio-video-indexeddb-input-inputtypes-localstorage-postmessage-sessionstorage-websockets-websqldatabase-webworkers-geolocation-inlinesvg-smil-svg-svgclippaths-touch-webgl-shiv-cssclasses-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-forms_fileinput-forms_formattribute-forms_placeholder-forms_speechinput-forms_validation-ie8compat-load
 */
;window.Modernizr=function(a,b,c){function C(a){j.cssText=a}function D(a,b){return C(n.join(a+";")+(b||""))}function E(a,b){return typeof a===b}function F(a,b){return!!~(""+a).indexOf(b)}function G(a,b){for(var d in a){var e=a[d];if(!F(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function H(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:E(f,"function")?f.bind(d||b):f}return!1}function I(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+p.join(d+" ")+d).split(" ");return E(b,"string")||E(b,"undefined")?G(e,b):(e=(a+" "+q.join(d+" ")+d).split(" "),H(e,b,c))}function J(){e.input=function(c){for(var d=0,e=c.length;d<e;d++)u[c[d]]=c[d]in k;return u.list&&(u.list=!!b.createElement("datalist")&&!!a.HTMLDataListElement),u}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),e.inputtypes=function(a){for(var d=0,e,f,h,i=a.length;d<i;d++)k.setAttribute("type",f=a[d]),e=k.type!=="text",e&&(k.value=l,k.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(f)&&k.style.WebkitAppearance!==c?(g.appendChild(k),h=b.defaultView,e=h.getComputedStyle&&h.getComputedStyle(k,null).WebkitAppearance!=="textfield"&&k.offsetHeight!==0,g.removeChild(k)):/^(search|tel)$/.test(f)||(/^(url|email)$/.test(f)?e=k.checkValidity&&k.checkValidity()===!1:e=k.value!=l)),t[a[d]]=!!e;return t}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var d="2.6.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k=b.createElement("input"),l=":)",m={}.toString,n=" -webkit- -moz- -o- -ms- ".split(" "),o="Webkit Moz O ms",p=o.split(" "),q=o.toLowerCase().split(" "),r={svg:"http://www.w3.org/2000/svg"},s={},t={},u={},v=[],w=v.slice,x,y=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},z=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;return f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=E(e[d],"function"),E(e[d],"undefined")||(e[d]=c),e.removeAttribute(d))),e=null,f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),A={}.hasOwnProperty,B;!E(A,"undefined")&&!E(A.call,"undefined")?B=function(a,b){return A.call(a,b)}:B=function(a,b){return b in a&&E(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=w.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(w.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(w.call(arguments)))};return e}),s.flexbox=function(){return I("flexWrap")},s.flexboxlegacy=function(){return I("boxDirection")},s.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")},s.canvastext=function(){return!!e.canvas&&!!E(b.createElement("canvas").getContext("2d").fillText,"function")},s.webgl=function(){return!!a.WebGLRenderingContext},s.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:y(["@media (",n.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},s.geolocation=function(){return"geolocation"in navigator},s.postmessage=function(){return!!a.postMessage},s.websqldatabase=function(){return!!a.openDatabase},s.indexedDB=function(){return!!I("indexedDB",a)},s.hashchange=function(){return z("hashchange",a)&&(b.documentMode===c||b.documentMode>7)},s.history=function(){return!!a.history&&!!history.pushState},s.draganddrop=function(){var a=b.createElement("div");return"draggable"in a||"ondragstart"in a&&"ondrop"in a},s.websockets=function(){return"WebSocket"in a||"MozWebSocket"in a},s.rgba=function(){return C("background-color:rgba(150,255,150,.5)"),F(j.backgroundColor,"rgba")},s.hsla=function(){return C("background-color:hsla(120,40%,100%,.5)"),F(j.backgroundColor,"rgba")||F(j.backgroundColor,"hsla")},s.multiplebgs=function(){return C("background:url(https://),url(https://),red url(https://)"),/(url\s*\(.*?){3}/.test(j.background)},s.backgroundsize=function(){return I("backgroundSize")},s.borderimage=function(){return I("borderImage")},s.borderradius=function(){return I("borderRadius")},s.boxshadow=function(){return I("boxShadow")},s.textshadow=function(){return b.createElement("div").style.textShadow===""},s.opacity=function(){return D("opacity:.55"),/^0.55$/.test(j.opacity)},s.cssanimations=function(){return I("animationName")},s.csscolumns=function(){return I("columnCount")},s.cssgradients=function(){var a="background-image:",b="gradient(linear,left top,right bottom,from(#9f9),to(white));",c="linear-gradient(left top,#9f9, white);";return C((a+"-webkit- ".split(" ").join(b+a)+n.join(c+a)).slice(0,-a.length)),F(j.backgroundImage,"gradient")},s.cssreflections=function(){return I("boxReflect")},s.csstransforms=function(){return!!I("transform")},s.csstransforms3d=function(){var a=!!I("perspective");return a&&"webkitPerspective"in g.style&&y("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=b.offsetLeft===9&&b.offsetHeight===3}),a},s.csstransitions=function(){return I("transition")},s.fontface=function(){var a;return y('@font-face {font-family:"font";src:url("https://")}',function(c,d){var e=b.getElementById("smodernizr"),f=e.sheet||e.styleSheet,g=f?f.cssRules&&f.cssRules[0]?f.cssRules[0].cssText:f.cssText||"":"";a=/src/i.test(g)&&g.indexOf(d.split(" ")[0])===0}),a},s.generatedcontent=function(){var a;return y(["#",h,"{font:0/0 a}#",h,':after{content:"',l,'";visibility:hidden;font:3px/1 a}'].join(""),function(b){a=b.offsetHeight>=3}),a},s.video=function(){var a=b.createElement("video"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),c.h264=a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),c.webm=a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,"")}catch(d){}return c},s.audio=function(){var a=b.createElement("audio"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),c.mp3=a.canPlayType("audio/mpeg;").replace(/^no$/,""),c.wav=a.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),c.m4a=(a.canPlayType("audio/x-m4a;")||a.canPlayType("audio/aac;")).replace(/^no$/,"")}catch(d){}return c},s.localstorage=function(){try{return localStorage.setItem(h,h),localStorage.removeItem(h),!0}catch(a){return!1}},s.sessionstorage=function(){try{return sessionStorage.setItem(h,h),sessionStorage.removeItem(h),!0}catch(a){return!1}},s.webworkers=function(){return!!a.Worker},s.applicationcache=function(){return!!a.applicationCache},s.svg=function(){return!!b.createElementNS&&!!b.createElementNS(r.svg,"svg").createSVGRect},s.inlinesvg=function(){var a=b.createElement("div");return a.innerHTML="<svg/>",(a.firstChild&&a.firstChild.namespaceURI)==r.svg},s.smil=function(){return!!b.createElementNS&&/SVGAnimate/.test(m.call(b.createElementNS(r.svg,"animate")))},s.svgclippaths=function(){return!!b.createElementNS&&/SVGClipPath/.test(m.call(b.createElementNS(r.svg,"clipPath")))};for(var K in s)B(s,K)&&(x=K.toLowerCase(),e[x]=s[K](),v.push((e[x]?"":"no-")+x));return e.input||J(),e.addTest=function(a,b){if(typeof a=="object")for(var d in a)B(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},C(""),i=k=null,function(a,b){function k(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function l(){var a=r.elements;return typeof a=="string"?a.split(" "):a}function m(a){var b=i[a[g]];return b||(b={},h++,a[g]=h,i[h]=b),b}function n(a,c,f){c||(c=b);if(j)return c.createElement(a);f||(f=m(c));var g;return f.cache[a]?g=f.cache[a].cloneNode():e.test(a)?g=(f.cache[a]=f.createElem(a)).cloneNode():g=f.createElem(a),g.canHaveChildren&&!d.test(a)?f.frag.appendChild(g):g}function o(a,c){a||(a=b);if(j)return a.createDocumentFragment();c=c||m(a);var d=c.frag.cloneNode(),e=0,f=l(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function p(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return r.shivMethods?n(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+l().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(r,b.frag)}function q(a){a||(a=b);var c=m(a);return r.shivCSS&&!f&&!c.hasCSS&&(c.hasCSS=!!k(a,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),j||p(a,c),a}var c=a.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,e=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,f,g="_html5shiv",h=0,i={},j;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",f="hidden"in a,j=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){f=!0,j=!0}})();var r={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,supportsUnknownElements:j,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:q,createElement:n,createDocumentFragment:o};a.html5=r,q(b)}(this,b),e._version=d,e._prefixes=n,e._domPrefixes=q,e._cssomPrefixes=p,e.hasEvent=z,e.testProp=function(a){return G([a])},e.testAllProps=I,e.testStyles=y,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+v.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))},Modernizr.addTest("fileinput",function(){var a=document.createElement("input");return a.type="file",!a.disabled}),Modernizr.addTest("formattribute",function(){var a=document.createElement("form"),b=document.createElement("input"),c=document.createElement("div"),d="formtest"+(new Date).getTime(),e,f=!1;return a.id=d,document.createAttribute&&(e=document.createAttribute("form"),e.nodeValue=d,b.setAttributeNode(e),c.appendChild(a),c.appendChild(b),document.documentElement.appendChild(c),f=a.elements.length===1&&b.form==a,c.parentNode.removeChild(c)),f}),Modernizr.addTest("placeholder",function(){return"placeholder"in(Modernizr.input||document.createElement("input"))&&"placeholder"in(Modernizr.textarea||document.createElement("textarea"))}),Modernizr.addTest("speechinput",function(){var a=document.createElement("input");return"speech"in a||"onwebkitspeechchange"in a}),function(a,b){b.formvalidationapi=!1,b.formvalidationmessage=!1,b.addTest("formvalidation",function(){var c=a.createElement("form");if("checkValidity"in c){var d=a.body,e=a.documentElement,f=!1,g=!1,h;return b.formvalidationapi=!0,c.onsubmit=function(a){window.opera||a.preventDefault(),a.stopPropagation()},c.innerHTML='<input name="modTest" required><button></button>',c.style.position="absolute",c.style.top="-99999em",d||(f=!0,d=a.createElement("body"),d.style.background="",e.appendChild(d)),d.appendChild(c),h=c.getElementsByTagName("input")[0],h.oninvalid=function(a){g=!0,a.preventDefault(),a.stopPropagation()},b.formvalidationmessage=!!h.validationMessage,c.getElementsByTagName("button")[0].click(),d.removeChild(c),f&&e.removeChild(d),g}return!1})}(document,window.Modernizr),Modernizr.addTest("ie8compat",function(){return!window.addEventListener&&document.documentMode&&document.documentMode===7});


// ES5 15.2.3.5 
if (!Object.create) {
    Object.create = function(prototype, properties) {
        var object;
        if (prototype === null) {
            object = {"__proto__": null};
        } else {
            if (typeof prototype != "object")
                throw new TypeError("typeof prototype["+(typeof prototype)+"] != 'object'");
            var Type = function () {};
            Type.prototype = prototype;
            object = new Type();
        }
        if (typeof properties !== "undefined")
            Object.defineProperties(object, properties);
        return object;
    };
}


/**
* hoverIntent r5 // 2007.03.27 // jQuery 1.1.2+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne <brian@cherne.net>
*/
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY;};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev]);}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev]);};var handleHover=function(e){var p=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;while(p&&p!=this){try{p=p.parentNode;}catch(e){p=this;}}if(p==this){return false;}var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);}if(e.type=="mouseover"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob);},cfg.timeout);}}};return this.mouseover(handleHover).mouseout(handleHover);};})(jQuery);


/*!
 * imagesLoaded PACKAGED v3.0.1
 * JavaScript is all like "You images are done yet or what?"
 */

(function(e){"use strict";function t(){}function n(e,t){if(r)return t.indexOf(e);for(var n=t.length;n--;)if(t[n]===e)return n;return-1}var i=t.prototype,r=Array.prototype.indexOf?!0:!1;i._getEvents=function(){return this._events||(this._events={})},i.getListeners=function(e){var t,n,i=this._getEvents();if("object"==typeof e){t={};for(n in i)i.hasOwnProperty(n)&&e.test(n)&&(t[n]=i[n])}else t=i[e]||(i[e]=[]);return t},i.getListenersAsObject=function(e){var t,n=this.getListeners(e);return n instanceof Array&&(t={},t[e]=n),t||n},i.addListener=function(e,t){var i,r=this.getListenersAsObject(e);for(i in r)r.hasOwnProperty(i)&&-1===n(t,r[i])&&r[i].push(t);return this},i.on=i.addListener,i.defineEvent=function(e){return this.getListeners(e),this},i.defineEvents=function(e){for(var t=0;e.length>t;t+=1)this.defineEvent(e[t]);return this},i.removeListener=function(e,t){var i,r,s=this.getListenersAsObject(e);for(r in s)s.hasOwnProperty(r)&&(i=n(t,s[r]),-1!==i&&s[r].splice(i,1));return this},i.off=i.removeListener,i.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},i.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},i.manipulateListeners=function(e,t,n){var i,r,s=e?this.removeListener:this.addListener,o=e?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(i=n.length;i--;)s.call(this,t,n[i]);else for(i in t)t.hasOwnProperty(i)&&(r=t[i])&&("function"==typeof r?s.call(this,i,r):o.call(this,i,r));return this},i.removeEvent=function(e){var t,n=typeof e,i=this._getEvents();if("string"===n)delete i[e];else if("object"===n)for(t in i)i.hasOwnProperty(t)&&e.test(t)&&delete i[t];else delete this._events;return this},i.emitEvent=function(e,t){var n,i,r,s=this.getListenersAsObject(e);for(i in s)if(s.hasOwnProperty(i))for(n=s[i].length;n--;)r=t?s[i][n].apply(null,t):s[i][n](),r===!0&&this.removeListener(e,s[i][n]);return this},i.trigger=i.emitEvent,i.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},"function"==typeof define&&define.amd?define(function(){return t}):e.EventEmitter=t})(this),function(e){"use strict";var t=document.documentElement,n=function(){};t.addEventListener?n=function(e,t,n){e.addEventListener(t,n,!1)}:t.attachEvent&&(n=function(t,n,i){t[n+i]=i.handleEvent?function(){var t=e.event;t.target=t.target||t.srcElement,i.handleEvent.call(i,t)}:function(){var n=e.event;n.target=n.target||n.srcElement,i.call(t,n)},t.attachEvent("on"+n,t[n+i])});var i=function(){};t.removeEventListener?i=function(e,t,n){e.removeEventListener(t,n,!1)}:t.detachEvent&&(i=function(e,t,n){e.detachEvent("on"+t,e[t+n]);try{delete e[t+n]}catch(i){e[t+n]=void 0}});var r={bind:n,unbind:i};"function"==typeof define&&define.amd?define(r):e.eventie=r}(this),function(e){"use strict";function t(e,t){for(var n in t)e[n]=t[n];return e}function n(e){return"[object Array]"===a.call(e)}function i(e){var t=[];if(n(e))t=e;else if("number"==typeof e.length)for(var i=0,r=e.length;r>i;i++)t.push(e[i]);else t.push(e);return t}function r(e,n){function r(e,n,o){if(!(this instanceof r))return new r(e,n);"string"==typeof e&&(e=document.querySelectorAll(e)),this.elements=i(e),this.options=t({},this.options),"function"==typeof n?o=n:t(this.options,n),o&&this.on("always",o),this.getImages(),s&&(this.jqDeferred=new s.Deferred);var h=this;setTimeout(function(){h.check()})}function a(e){this.img=e}r.prototype=new e,r.prototype.options={},r.prototype.getImages=function(){this.images=[];for(var e=0,t=this.elements.length;t>e;e++){var n=this.elements[e];"IMG"===n.nodeName&&this.addImage(n);for(var i=n.querySelectorAll("img"),r=0,s=i.length;s>r;r++){var o=i[r];this.addImage(o)}}},r.prototype.addImage=function(e){var t=new a(e);this.images.push(t)},r.prototype.check=function(){function e(e,r){return t.options.debug&&h&&o.log("confirm",e,r),t.progress(e),n++,n===i&&t.complete(),!0}var t=this,n=0,i=this.images.length;this.hasAnyBroken=!1;for(var r=0;i>r;r++){var s=this.images[r];s.on("confirm",e),s.check()}},r.prototype.progress=function(e){this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded,this.emit("progress",this,e),this.jqDeferred&&this.jqDeferred.notify(this,e)},r.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emit(e,this),this.emit("always",this),this.jqDeferred){var t=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[t](this)}},s&&(s.fn.imagesLoaded=function(e,t){var n=new r(this,e,t);return n.jqDeferred.promise(s(this))});var f={};return a.prototype=new e,a.prototype.check=function(){var e=f[this.img.src];if(e)return this.useCached(e),void 0;if(f[this.img.src]=this,this.img.complete&&void 0!==this.img.naturalWidth)return this.confirm(0!==this.img.naturalWidth,"naturalWidth"),void 0;var t=this.proxyImage=new Image;n.bind(t,"load",this),n.bind(t,"error",this),t.src=this.img.src},a.prototype.useCached=function(e){if(e.isConfirmed)this.confirm(e.isLoaded,"cached was confirmed");else{var t=this;e.on("confirm",function(e){return t.confirm(e.isLoaded,"cache emitted confirmed"),!0})}},a.prototype.confirm=function(e,t){this.isConfirmed=!0,this.isLoaded=e,this.emit("confirm",this,t)},a.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},a.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindProxyEvents()},a.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindProxyEvents()},a.prototype.unbindProxyEvents=function(){n.unbind(this.proxyImage,"load",this),n.unbind(this.proxyImage,"error",this)},r}var s=e.jQuery,o=e.console,h=o!==void 0,a=Object.prototype.toString;"function"==typeof define&&define.amd?define(["eventEmitter","eventie"],r):e.imagesLoaded=r(e.EventEmitter,e.eventie)}(window);


/*!
jQuery wookmark plugin
@name jquery.wookmark.js
@author Christoph Ono (chri@sto.ph or @gbks)
@author Sebastian Helzle (sebastian@helzle.net or @sebobo)
@version 1.3.0
@date 06/27/2013
@category jQuery plugin
@copyright (c) 2009-2013 Christoph Ono (www.wookmark.com)
@license Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
*/
(function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)})(function(t){var e,s,h;h=function(t,i){return function(){return t.apply(i,arguments)}},s={align:"center",container:t("body"),offset:2,autoResize:!1,itemWidth:0,flexibleWidth:0,resizeDelay:50,onLayoutChanged:void 0,fillEmptySpace:!1},e=function(){function e(i,e){this.handler=i,this.columns=this.containerWidth=this.resizeTimer=null,this.activeItemCount=0,this.direction="left",this.itemHeightsDirty=!0,this.placeholders=[],t.extend(!0,this,s,e),this.update=h(this.update,this),this.onResize=h(this.onResize,this),this.onRefresh=h(this.onRefresh,this),this.getItemWidth=h(this.getItemWidth,this),this.layout=h(this.layout,this),this.layoutFull=h(this.layoutFull,this),this.layoutColumns=h(this.layoutColumns,this),this.filter=h(this.filter,this),this.clear=h(this.clear,this),this.getActiveItems=h(this.getActiveItems,this),this.refreshPlaceholders=h(this.refreshPlaceholders,this);for(var o,n=j=0,r={};i.length>n;n++)if($item=i.eq(n),o=$item.data("filterClass"),"object"==typeof o&&o.length>0)for(j=0;o.length>j;j++)filterClass=t.trim(o[j]).toLowerCase(),filterClass in r||(r[filterClass]=[]),r[filterClass].push($item[0]);this.filterClasses=r,this.autoResize&&t(window).bind("resize.wookmark",this.onResize),this.container.bind("refreshWookmark",this.onRefresh)}return e.prototype.update=function(i){this.itemHeightsDirty=!0,t.extend(!0,this,i)},e.prototype.onResize=function(){clearTimeout(this.resizeTimer),this.itemHeightsDirty=0!=this.flexibleWidth,this.resizeTimer=setTimeout(this.layout,this.resizeDelay)},e.prototype.onRefresh=function(){this.itemHeightsDirty=!0,this.layout()},e.prototype.filter=function(i,e){var s,h,o,n,r,a=[],l=t();if(i=i||[],e=e||"or",i.length){for(h=0;i.length>h;h++)r=t.trim(i[h].toLowerCase()),r in this.filterClasses&&a.push(this.filterClasses[r]);if(s=a.length,"or"==e||1==s)for(h=0;s>h;h++)l=l.add(a[h]);else if("and"==e){var f,u,c,d=a[0],m=!0;for(h=1;s>h;h++)a[h].length<d.length&&(d=a[h]);for(h=0;d.length>h;h++){for(u=d[h],m=!0,o=0;a.length>o&&m;o++)if(c=a[o],d!=c){for(n=0,f=!1;c.length>n&&!f;n++)f=c[n]==u;m&=f}m&&l.push(d[h])}}this.handler.not(l).addClass("inactive")}else l=this.handler;l.removeClass("inactive"),this.columns=null,this.layout()},e.prototype.refreshPlaceholders=function(i,e){for(var s,h,o,n,r,a=this.placeholders.length,l=this.columns.length,f=this.container.outerHeight();l>a;a++)s=t('<div class="wookmark-placeholder"/>').appendTo(this.container),this.placeholders.push(s);for(innerOffset=this.offset+2*parseInt(this.placeholders[0].css("borderWidth")),a=0;this.placeholders.length>a;a++)if(s=this.placeholders[a],o=this.columns[a],a>=l||!o[o.length-1])s.css("display","none");else{if(h=o[o.length-1],!h)continue;r=h.data("wookmark-top")+h.data("wookmark-height")+this.offset,n=f-r-innerOffset,s.css({position:"absolute",display:n>0?"block":"none",left:a*i+e,top:r,width:i-innerOffset,height:n})}},e.prototype.getActiveItems=function(){return this.handler.not(".inactive")},e.prototype.getItemWidth=function(){var t=this.itemWidth,i=this.container.width(),e=this.handler.eq(0),s=this.flexibleWidth;if(void 0===this.itemWidth||0===this.itemWidth&&!this.flexibleWidth?t=e.outerWidth():"string"==typeof this.itemWidth&&this.itemWidth.indexOf("%")>=0&&(t=parseFloat(this.itemWidth)/100*i),s){"string"==typeof s&&s.indexOf("%")>=0&&(s=parseFloat(s)/100*i-e.outerWidth()+e.innerWidth());var h=~~(1+i/(s+this.offset)),o=(i-(h-1)*this.offset)/h;t=Math.max(t,~~o),this.handler.css("width",t)}return t},e.prototype.layout=function(){if(this.container.is(":visible")){var t,e=this.getItemWidth()+this.offset,s=this.container.width(),h=~~((s+this.offset)/e),o=maxHeight=i=0,n=this.getActiveItems(),r=n.length;if(this.itemHeightsDirty){for(;r>i;i++)t=n.eq(i),t.data("wookmark-height",t.outerHeight());this.itemHeightsDirty=!1}h=Math.max(1,Math.min(h,r)),o="left"==this.align||"right"==this.align?~~(h/e+this.offset>>1):~~(.5+(s-(h*e-this.offset))>>1),this.direction="right"==this.align?"right":"left",maxHeight=null!=this.columns&&this.columns.length==h&&this.activeItemCount==r?this.layoutColumns(e,o):this.layoutFull(e,h,o),this.activeItemCount=r,this.container.css("height",maxHeight),this.fillEmptySpace&&this.refreshPlaceholders(e,o),void 0!==this.onLayoutChanged&&"function"==typeof this.onLayoutChanged&&this.onLayoutChanged()}},e.prototype.layoutFull=function(t,i,e){var s,h=0,o=0,n=this.getActiveItems(),r=n.length,a=null,l=null,f={position:"absolute"},u=[],c="left"==this.align?!0:!1;for(this.columns=[];i>u.length;)u.push(0),this.columns.push([]);for(;r>h;h++){for($item=n.eq(h),a=u[0],l=0,o=0;i>o;o++)a>u[o]&&(a=u[o],l=o);s=0==l&&c?0:l*t+e,f[this.direction]=s,f.top=a,$item.css(f).data("wookmark-top",a),u[l]+=$item.data("wookmark-height")+this.offset,this.columns[l].push($item)}return Math.max.apply(Math,u)},e.prototype.layoutColumns=function(t,i){for(var e,s,h,o=[],n=0,r=0;this.columns.length>n;n++){for(o.push(0),e=this.columns[n],h=n*t+i,currentHeight=o[n],r=0;e.length>r;r++)$item=e[r],s={top:currentHeight},s[this.direction]=h,$item.css(s).data("wookmark-top",currentHeight),currentHeight+=$item.data("wookmark-height")+this.offset;o[n]=currentHeight}return Math.max.apply(Math,o)},e.prototype.clear=function(){clearTimeout(this.resizeTimer),t(window).unbind("resize.wookmark",this.onResize),this.container.unbind("refreshWookmark",this.onRefresh)},e}(),t.fn.wookmark=function(t){return this.wookmarkInstance?this.wookmarkInstance.update(t||{}):this.wookmarkInstance=new e(this,t||{}),this.wookmarkInstance.layout(),this.show()}});


/*
 * Foundation Responsive Library
 * http://foundation.zurb.com
 * Copyright 2013, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/

/*jslint unparam: true, browser: true, indent: 2 */

// Accommodate running jQuery or Zepto in noConflict() mode by
// using an anonymous function to redefine the $ shorthand name.
// See http://docs.jquery.com/Using_jQuery_with_Other_Libraries
// and http://zeptojs.com/
var libFuncName = null;

if (typeof jQuery === "undefined" &&
    typeof Zepto === "undefined" &&
    typeof $ === "function") {
  libFuncName = $;
} else if (typeof jQuery === "function") {
  libFuncName = jQuery;
} else if (typeof Zepto === "function") {
  libFuncName = Zepto;
} else {
  throw new TypeError();
}

(function ($, window, document, undefined) {
  'use strict';

  /*
    matchMedia() polyfill - Test a CSS media 
    type/query in JS. Authors & copyright (c) 2012: 
    Scott Jehl, Paul Irish, Nicholas Zakas. 
    Dual MIT/BSD license

    https://github.com/paulirish/matchMedia.js
  */

  window.matchMedia = window.matchMedia || (function( doc, undefined ) {

    "use strict";

    var bool,
        docElem = doc.documentElement,
        refNode = docElem.firstElementChild || docElem.firstChild,
        // fakeBody required for <FF4 when executed in <head>
        fakeBody = doc.createElement( "body" ),
        div = doc.createElement( "div" );

    div.id = "mq-test-1";
    div.style.cssText = "position:absolute;top:-100em";
    fakeBody.style.background = "none";
    fakeBody.appendChild(div);

    return function(q){

      div.innerHTML = "&shy;<style media=\"" + q + "\"> #mq-test-1 { width: 42px; }</style>";

      docElem.insertBefore( fakeBody, refNode );
      bool = div.offsetWidth === 42;
      docElem.removeChild( fakeBody );

      return {
        matches: bool,
        media: q
      };

    };

  }( document ));

  // add dusty browser stuff
  if (!Array.prototype.filter) {
    Array.prototype.filter = function(fun /*, thisp */) {
      "use strict";
   
      if (this == null) {
        throw new TypeError();
      }

      var t = Object(this),
          len = t.length >>> 0;
      if (typeof fun !== "function") {
          return;
      }

      var res = [],
          thisp = arguments[1];
      for (var i = 0; i < len; i++) {
        if (i in t) {
          var val = t[i]; // in case fun mutates this
          if (fun && fun.call(thisp, val, i, t)) {
            res.push(val);
          }
        }
      }

      return res;
    }
  }

  if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
      if (typeof this !== "function") {
        // closest thing possible to the ECMAScript 5 internal IsCallable function
        throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
      }
   
      var aArgs = Array.prototype.slice.call(arguments, 1), 
          fToBind = this, 
          fNOP = function () {},
          fBound = function () {
            return fToBind.apply(this instanceof fNOP && oThis
               ? this
               : oThis,
             aArgs.concat(Array.prototype.slice.call(arguments)));
          };
   
      fNOP.prototype = this.prototype;
      fBound.prototype = new fNOP();
   
      return fBound;
    };
  }

  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
      "use strict";
      if (this == null) {
        throw new TypeError();
      }
      var t = Object(this);
      var len = t.length >>> 0;
      if (len === 0) {
        return -1;
      }
      var n = 0;
      if (arguments.length > 1) {
        n = Number(arguments[1]);
        if (n != n) { // shortcut for verifying if it's NaN
          n = 0;
        } else if (n != 0 && n != Infinity && n != -Infinity) {
          n = (n > 0 || -1) * Math.floor(Math.abs(n));
        }
      }
      if (n >= len) {
          return -1;
      }
      var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
      for (; k < len; k++) {
        if (k in t && t[k] === searchElement) {
          return k;
        }
      }
      return -1;
    }
  }

  // fake stop() for zepto.
  $.fn.stop = $.fn.stop || function() {
    return this;
  };

  window.Foundation = {
    name : 'Foundation',

    version : '4.3.1',

    cache : {},

    init : function (scope, libraries, method, options, response, /* internal */ nc) {
      var library_arr,
          args = [scope, method, options, response],
          responses = [],
          nc = nc || false;

      // disable library error catching,
      // used for development only
      if (nc) this.nc = nc;

      // check RTL
      this.rtl = /rtl/i.test($('html').attr('dir'));

      // set foundation global scope
      this.scope = scope || this.scope;

      if (libraries && typeof libraries === 'string' && !/reflow/i.test(libraries)) {
        if (/off/i.test(libraries)) return this.off();

        library_arr = libraries.split(' ');

        if (library_arr.length > 0) {
          for (var i = library_arr.length - 1; i >= 0; i--) {
            responses.push(this.init_lib(library_arr[i], args));
          }
        }
      } else {
        if (/reflow/i.test(libraries)) args[1] = 'reflow';

        for (var lib in this.libs) {
          responses.push(this.init_lib(lib, args));
        }
      }

      // if first argument is callback, add to args
      if (typeof libraries === 'function') {
        args.unshift(libraries);
      }

      return this.response_obj(responses, args);
    },

    response_obj : function (response_arr, args) {
      for (var i = 0, len = args.length; i < len; i++) {
        if (typeof args[i] === 'function') {
          return args[i]({
            errors: response_arr.filter(function (s) {
              if (typeof s === 'string') return s;
            })
          });
        }
      }

      return response_arr;
    },

    init_lib : function (lib, args) {
      return this.trap(function () {
        if (this.libs.hasOwnProperty(lib)) {
          this.patch(this.libs[lib]);
          return this.libs[lib].init.apply(this.libs[lib], args);
        } else {
          return function () {};
        }
      }.bind(this), lib);
    },

    trap : function (fun, lib) {
      if (!this.nc) {
        try {
          return fun();
        } catch (e) {
          return this.error({name: lib, message: 'could not be initialized', more: e.name + ' ' + e.message});
        }
      }

      return fun();
    },

    patch : function (lib) {
      this.fix_outer(lib);
      lib.scope = this.scope;
      lib.rtl = this.rtl;
    },

    inherit : function (scope, methods) {
      var methods_arr = methods.split(' ');

      for (var i = methods_arr.length - 1; i >= 0; i--) {
        if (this.lib_methods.hasOwnProperty(methods_arr[i])) {
          this.libs[scope.name][methods_arr[i]] = this.lib_methods[methods_arr[i]];
        }
      }
    },

    random_str : function (length) {
      var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

      if (!length) {
        length = Math.floor(Math.random() * chars.length);
      }

      var str = '';
      for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
      }
      return str;
    },

    libs : {},

    // methods that can be inherited in libraries
    lib_methods : {
      set_data : function (node, data) {
        // this.name references the name of the library calling this method
        var id = [this.name,+new Date(),Foundation.random_str(5)].join('-');

        Foundation.cache[id] = data;
        node.attr('data-' + this.name + '-id', id);
        return data;
      },

      get_data : function (node) {
        return Foundation.cache[node.attr('data-' + this.name + '-id')];
      },

      remove_data : function (node) {
        if (node) {
          delete Foundation.cache[node.attr('data-' + this.name + '-id')];
          node.attr('data-' + this.name + '-id', '');
        } else {
          $('[data-' + this.name + '-id]').each(function () {
            delete Foundation.cache[$(this).attr('data-' + this.name + '-id')];
            $(this).attr('data-' + this.name + '-id', '');
          });
        }
      },

      throttle : function(fun, delay) {
        var timer = null;
        return function () {
          var context = this, args = arguments;
          clearTimeout(timer);
          timer = setTimeout(function () {
            fun.apply(context, args);
          }, delay);
        };
      },

      // parses data-options attribute on nodes and turns
      // them into an object
      data_options : function (el) {
        var opts = {}, ii, p,
            opts_arr = (el.attr('data-options') || ':').split(';'),
            opts_len = opts_arr.length;

        function isNumber (o) {
          return ! isNaN (o-0) && o !== null && o !== "" && o !== false && o !== true;
        }

        function trim(str) {
          if (typeof str === 'string') return $.trim(str);
          return str;
        }

        // parse options
        for (ii = opts_len - 1; ii >= 0; ii--) {
          p = opts_arr[ii].split(':');

          if (/true/i.test(p[1])) p[1] = true;
          if (/false/i.test(p[1])) p[1] = false;
          if (isNumber(p[1])) p[1] = parseInt(p[1], 10);

          if (p.length === 2 && p[0].length > 0) {
            opts[trim(p[0])] = trim(p[1]);
          }
        }

        return opts;
      },

      delay : function (fun, delay) {
        return setTimeout(fun, delay);
      },

      // animated scrolling
      scrollTo : function (el, to, duration) {
        if (duration < 0) return;
        var difference = to - $(window).scrollTop();
        var perTick = difference / duration * 10;

        this.scrollToTimerCache = setTimeout(function() {
          if (!isNaN(parseInt(perTick, 10))) {
            window.scrollTo(0, $(window).scrollTop() + perTick);
            this.scrollTo(el, to, duration - 10);
          }
        }.bind(this), 10);
      },

      // not supported in core Zepto
      scrollLeft : function (el) {
        if (!el.length) return;
        return ('scrollLeft' in el[0]) ? el[0].scrollLeft : el[0].pageXOffset;
      },

      // test for empty object or array
      empty : function (obj) {
        if (obj.length && obj.length > 0)    return false;
        if (obj.length && obj.length === 0)  return true;

        for (var key in obj) {
          if (hasOwnProperty.call(obj, key))    return false;
        }

        return true;
      }
    },

    fix_outer : function (lib) {
      lib.outerHeight = function (el, bool) {
        if (typeof Zepto === 'function') {
          return el.height();
        }

        if (typeof bool !== 'undefined') {
          return el.outerHeight(bool);
        }

        return el.outerHeight();
      };

      lib.outerWidth = function (el, bool) {
        if (typeof Zepto === 'function') {
          return el.width();
        }

        if (typeof bool !== 'undefined') {
          return el.outerWidth(bool);
        }

        return el.outerWidth();
      };
    },

    error : function (error) {
      return error.name + ' ' + error.message + '; ' + error.more;
    },

    // remove all foundation events.
    off: function () {
      $(this.scope).off('.fndtn');
      $(window).off('.fndtn');
      return true;
    },

    zj : $
  };

  $.fn.foundation = function () {
    var args = Array.prototype.slice.call(arguments, 0);

    return this.each(function () {
      Foundation.init.apply(Foundation, [this].concat(args));
      return this;
    });
  };

}(libFuncName, this, this.document));


/*jslint unparam: true, browser: true, indent: 2 */

;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.reveal = {
    name : 'reveal',

    version : '4.2.2',

    locked : false,

    settings : {
      animation: 'fadeAndPop',
      animationSpeed: 250,
      closeOnBackgroundClick: true,
      closeOnEsc: true,
      dismissModalClass: 'close-reveal-modal',
      bgClass: 'reveal-modal-bg',
      open: function(){},
      opened: function(){},
      close: function(){},
      closed: function(){},
      bg : $('.reveal-modal-bg'),
      css : {
        open : {
          'opacity': 0,
          'visibility': 'visible',
          'display' : 'block'
        },
        close : {
          'opacity': 1,
          'visibility': 'hidden',
          'display': 'none'
        }
      }
    },

    init : function (scope, method, options) {
      Foundation.inherit(this, 'data_options delay');

      if (typeof method === 'object') {
        $.extend(true, this.settings, method);
      } else if (typeof options !== 'undefined') {
        $.extend(true, this.settings, options);
      }

      if (typeof method !== 'string') {
        this.events();

        return this.settings.init;
      } else {
        return this[method].call(this, options);
      }
    },

    events : function () {
      var self = this;

      $(this.scope)
        .off('.fndtn.reveal')
        .on('click.fndtn.reveal', '[data-reveal-id]', function (e) {
          e.preventDefault();

          if (!self.locked) {
            var element = $(this),
                ajax = element.data('reveal-ajax');

            self.locked = true;

            if (typeof ajax === 'undefined') {
              self.open.call(self, element);
            } else {
              var url = ajax === true ? element.attr('href') : ajax;

              self.open.call(self, element, {url: url});
            }
          }
        })
        .on('click.fndtn.reveal', this.close_targets(), function (e) {
          e.preventDefault();
          if (!self.locked) {
            var settings = $.extend({}, self.settings, self.data_options($('.reveal-modal.open')));
            if ($(e.target)[0] === $('.' + settings.bgClass)[0] && !settings.closeOnBackgroundClick) {
              return;
            }

            self.locked = true;
            self.close.call(self, $(this).closest('.reveal-modal'));
          }
        })
        .on('open.fndtn.reveal', '.reveal-modal', this.settings.open)
        .on('opened.fndtn.reveal', '.reveal-modal', this.settings.opened)
        .on('opened.fndtn.reveal', '.reveal-modal', this.open_video)
        .on('close.fndtn.reveal', '.reveal-modal', this.settings.close)
        .on('closed.fndtn.reveal', '.reveal-modal', this.settings.closed)
        .on('closed.fndtn.reveal', '.reveal-modal', this.close_video);

      $( 'body' ).bind( 'keyup.reveal', function ( event ) {
        var open_modal = $('.reveal-modal.open'),
            settings = $.extend({}, self.settings, self.data_options(open_modal));
        if ( event.which === 27  && settings.closeOnEsc) { // 27 is the keycode for the Escape key
          open_modal.foundation('reveal', 'close');
        }
      });

      return true;
    },

    open : function (target, ajax_settings) {
      if (target) {
        if (typeof target.selector !== 'undefined') {
          var modal = $('#' + target.data('reveal-id'));
        } else {
          var modal = $(this.scope);

          ajax_settings = target;
        }
      } else {
        var modal = $(this.scope);
      }

      if (!modal.hasClass('open')) {
        var open_modal = $('.reveal-modal.open');

        if (typeof modal.data('css-top') === 'undefined') {
          modal.data('css-top', parseInt(modal.css('top'), 10))
            .data('offset', this.cache_offset(modal));
        }

        modal.trigger('open');

        if (open_modal.length < 1) {
          this.toggle_bg(modal);
        }

        if (typeof ajax_settings === 'undefined' || !ajax_settings.url) {
          this.hide(open_modal, this.settings.css.close);
          this.show(modal, this.settings.css.open);
        } else {
          var self = this,
              old_success = typeof ajax_settings.success !== 'undefined' ? ajax_settings.success : null;

          $.extend(ajax_settings, {
            success: function (data, textStatus, jqXHR) {
              if ( $.isFunction(old_success) ) {
                old_success(data, textStatus, jqXHR);
              }

              modal.html(data);
              $(modal).foundation('section', 'reflow');

              self.hide(open_modal, self.settings.css.close);
              self.show(modal, self.settings.css.open);
            }
          });

          $.ajax(ajax_settings);
        }
      }
    },

    close : function (modal) {

      var modal = modal && modal.length ? modal : $(this.scope),
          open_modals = $('.reveal-modal.open');

      if (open_modals.length > 0) {
        this.locked = true;
        modal.trigger('close');
        this.toggle_bg(modal);
        this.hide(open_modals, this.settings.css.close);
      }
    },

    close_targets : function () {
      var base = '.' + this.settings.dismissModalClass;

      if (this.settings.closeOnBackgroundClick) {
        return base + ', .' + this.settings.bgClass;
      }

      return base;
    },

    toggle_bg : function (modal) {
      if ($('.reveal-modal-bg').length === 0) {
        this.settings.bg = $('<div />', {'class': this.settings.bgClass})
          .appendTo('body');
      }

      if (this.settings.bg.filter(':visible').length > 0) {
        this.hide(this.settings.bg);
      } else {
        this.show(this.settings.bg);
      }
    },

    show : function (el, css) {
      // is modal
      if (css) {
        if (/pop/i.test(this.settings.animation)) {
          css.top = $(window).scrollTop() - el.data('offset') + 'px';
          var end_css = {
            top: $(window).scrollTop() + el.data('css-top') + 'px',
            opacity: 1
          };

          return this.delay(function () {
            return el
              .css(css)
              .animate(end_css, this.settings.animationSpeed, 'linear', function () {
                this.locked = false;
                el.trigger('opened');
              }.bind(this))
              .addClass('open');
          }.bind(this), this.settings.animationSpeed / 2);
        }

        if (/fade/i.test(this.settings.animation)) {
          var end_css = {opacity: 1};

          return this.delay(function () {
            return el
              .css(css)
              .animate(end_css, this.settings.animationSpeed, 'linear', function () {
                this.locked = false;
                el.trigger('opened');
              }.bind(this))
              .addClass('open');
          }.bind(this), this.settings.animationSpeed / 2);
        }

        return el.css(css).show().css({opacity: 1}).addClass('open').trigger('opened');
      }

      // should we animate the background?
      if (/fade/i.test(this.settings.animation)) {
        return el.fadeIn(this.settings.animationSpeed / 2);
      }

      return el.show();
    },

    hide : function (el, css) {
      // is modal
      if (css) {
        if (/pop/i.test(this.settings.animation)) {
          var end_css = {
            top: - $(window).scrollTop() - el.data('offset') + 'px',
            opacity: 0
          };

          return this.delay(function () {
            return el
              .animate(end_css, this.settings.animationSpeed, 'linear', function () {
                this.locked = false;
                el.css(css).trigger('closed');
              }.bind(this))
              .removeClass('open');
          }.bind(this), this.settings.animationSpeed / 2);
        }

        if (/fade/i.test(this.settings.animation)) {
          var end_css = {opacity: 0};

          return this.delay(function () {
            return el
              .animate(end_css, this.settings.animationSpeed, 'linear', function () {
                this.locked = false;
                el.css(css).trigger('closed');
              }.bind(this))
              .removeClass('open');
          }.bind(this), this.settings.animationSpeed / 2);
        }

        return el.hide().css(css).removeClass('open').trigger('closed');
      }

      // should we animate the background?
      if (/fade/i.test(this.settings.animation)) {
        return el.fadeOut(this.settings.animationSpeed / 2);
      }

      return el.hide();
    },

    close_video : function (e) {
      var video = $(this).find('.flex-video'),
          iframe = video.find('iframe');

      if (iframe.length > 0) {
        iframe.attr('data-src', iframe[0].src);
        iframe.attr('src', 'about:blank');
        video.hide();
      }
    },

    open_video : function (e) {
      var video = $(this).find('.flex-video'),
          iframe = video.find('iframe');

      if (iframe.length > 0) {
        var data_src = iframe.attr('data-src');
        if (typeof data_src === 'string') {
          iframe[0].src = iframe.attr('data-src');
        } else {
          var src = iframe[0].src;
          iframe[0].src = undefined;
          iframe[0].src = src;
        }
        video.show();
      }
    },

    cache_offset : function (modal) {
      var offset = modal.show().height() + parseInt(modal.css('top'), 10);

      modal.hide();

      return offset;
    },

    off : function () {
      $(this.scope).off('.fndtn.reveal');
    },

    reflow : function () {}
  };
}(Foundation.zj, this, this.document));



(function($){
  
  $.pubsubLogging = false;
  
  var o = $({});
  
  $.subscribe = function() {
    o.bind.apply( o, arguments );
  };
  
  $.subscribeOnce = function() {
    o.one.apply( o, arguments );
  };
  
  $.unsubscribe = function() {
    o.unbind.apply( o, arguments );
  };
  
  $.publish = function() {
    if( $.pubsubLogging ) { console.log.apply( console, arguments ); }
	o.trigger.apply( o, arguments );
  };
  
}(jQuery));


/* ************************ APAC Ford H.27.3 Code *************************/
/*
  CAUTION: AT NO TIME IS ANY PARTY TO MODIFY THIS FILE OTHER THAN FORD ANALYTICS
  REQUIRED: JS variables that must be set of EVERY call are s_account and omni_filters 

	140827 - add gnav tracking, update BTL
	150609 - current file on site
	160614 - change tracking servers to fordap root

*/

/************************ ADDITIONAL FEATURES ************************   	
	Dynamic Report Suite Selection
	Universal Tag
	Plugins
*/

/*************** Load Account and Filters - Should be set on a page level *****************/

	if (typeof s_account == "undefined" || s_account==null || s_account=='' || typeof omni_filters == "undefined" || omni_filters==null || omni_filters==''){
		var s_account="fapadev";
		var s=s_gi(s_account,1);
		s.linkInternalFilters="javascript:,dragonfly.ford.com," + document.location.host;
	}else{
		var s=s_gi(s_account,1);
		s.linkInternalFilters = omni_filters;
	}
	
	if (changeCookiePeriods(document.location.host)){
		s.cookieDomainPeriods="3"
   		s.fpcookieDomainPeriods="3"
   	}	
		

/**************************************************COMMON CODE******************************************/
/* Conversion Config */
/* Link Tracking Config */
s.trackDownloadLinks=false
s.trackExternalLinks=false
s.trackInlineStats=true
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx"
s.linkTrackVars="None"
s.linkTrackEvents="None"
s.linkLeaveQueryString=false


/* Plugin Config */
s.usePlugins=true
function s_doPlugins(s) {

/* Set the character set to the same as the page */
	if(!s.charSet) {
		if (document.characterSet)
			{s.charSet = document.characterSet} 
		else
			{s.charSet = document.charset}
	}

/* Force pageName to Lowercase all sites*/
	if(s.pageName)
		s.pageName=s.pageName.toLowerCase();
		
/* Web Trends Tracking */
	if(s.getQueryParam('WT.tsrc') || s.getQueryParam('WT.srch') || s.getQueryParam('WT.mc_id')) webTrendsTracking();
	
/* External Campaign Tracking */
	if(!s.campaign){		
		if(s.getQueryParam('bannerid'))s.campaign=s.getQueryParam('bannerid');
		s.campaign=s.getCustomValOnce(s.campaign,"cmp_getval",0)
	}
	
	if(s.campaign) s.events=s.apl(s.events,"event53",",",2);
	s.prop17=s.getAndPersistValue(s.campaign,'s_p17_pers',90);

/* Set ford campaign ID*/
	if(s.getQueryParam('fmccmp')) s.eVar30=s.getQueryParam('fmccmp');
	s.prop30=s.getAndPersistValue(s.eVar30,'s_p30_pers',90);
	s.eVar30=s.getCustomValOnce(s.eVar30,"eVar30_getval",0);	

/* Campaign Path Tracking */
	s.prop19=s.pageName;
	if(s.campaign) s.prop19=s.campaign+': '+s.pageName;
	else if(s.eVar30) s.prop19=s.eVar30+': '+s.pageName;   
	
/* Internal Campaign Tracking */
	if(!s.eVar13) s.eVar13=s.getQueryParam('intcmp'); 
	s.eVar13=s.getCustomValOnce(s.eVar13,"int_getval",0);
	s.prop13=s.getAndPersistValue(s.eVar13,'s_p13_pers',0);
	
/* Adobe Social Integration */
	if (!s.eVar60) s.eVar60=s.getQueryParam('scmp');
	s.socialPlatforms();

/* Referrer Overide */
	if(s.getQueryParam('referrer')) s.referrer=s.getQueryParam('referrer');   

/* Email Campaign Tracking */
	if (s.getQueryParam('emailid')) s.eVar33=s.getQueryParam('emailid');
	s.prop33=s.getAndPersistValue(s.eVar33,'s_p33_pers',90);
	s.eVar33=s.getCustomValOnce(s.eVar33,"eVar33_getval",0);

/* Paid Search Tracking */
	if (s.getQueryParam('searchid')) s.eVar26 = s.prop26 = s.getQueryParam('searchid','');
	s.eVar26=s.getCustomValOnce(s.eVar26,"eVar26_getval",0);
	if(s.eVar26)s.events=s.apl(s.events,"event54",",",2);
	
/* Navigation Tracking */
	if (s.getQueryParam('gnav')) s.eVar5 = s.getQueryParam('gnav');
	
/* Visit Start Logic */	

	var tempSuite="nosuite"
	if(!s.c_r("s_suite")){
		s.setSuite(s_account,"s_suite",0)	
	}else{
		tempSuite=s.c_r("s_suite");
	}
	
	if(s.getVisitStart("s_visit")||((!tempSuite.match(s_account))&& tempSuite!="")){
		if(!isInternal()||document.referrer==''){
			s.prop48=s.prop49=s.eVar8=trafficsource();			
			s.prop8=s.getAndPersistValue(s.eVar8,'s_p_s_prop8',0);
			var dt=popDT();
			s.eVar36 = s.getCustomValOnce(dt,'ev_36_getval',0);
			s.events = s.apl(s.events,"event17,event52",",",2);
		}
	}
	else if (refSearch(document.referrer)){
    	if (s.getQueryParam('searchid')){
      		s.eVar50 = s.prop50 = "paid:"+s.prop50;
    	}else{
      		s.eVar50 = s.prop50 = "natural:"+s.prop50;
    	}
    	s.eVar50=s.getCustomValOnce(s.eVar50,"eVar50_getval",0)
	}
		
	if(!tempSuite.match(s_account)){
		s.setSuite(tempSuite+s_account,"s_suite",0)
		tempSuite=s.c_r("s_suite");
	}
	    
//support vars
	if((s.linkTrackVars!='None'&& s.linkTrackVars!='')||s.linkTrackVars.match('prop')||s.linkTrackVars.match('eVar')||s.linkTrackVars.match('evar')||s.linkTrackVars.match('events'))
	{
		s.linkTrackVars=s.linkTrackVars+",prop37,prop39,pageName,eVar52,prop52,prop14,eVar14,prop15,eVar15,zip,prop1,prop2,prop3,eVar1,eVar2,eVar3"		
	}
   	s.prop37="160614"
   	if(!s.prop39 && s.pageName)s.prop39=s.pageName
	s.eVar52=s.prop52=document.URL
	s.prop47=s.eVar47="D=UserAgent"
 
 if(s.eVar12 && s.eVar16)s.prop36=s.eVar34=s.eVar12+":"+s.eVar16

}
		
/*************************************CUSTOM COMMON SITE FUNCTIONS*****************************/

function webTrendsTracking(){

	if (s.getQueryParam('WT.srch').indexOf('1') != -1) s.prop26 = s.eVar26 = s.getQueryParam('WT.mc_id');
	
	if (s.getQueryParam('WT.tsrc')){
		if (s.getQueryParam('WT.tsrc').indexOf('AutoBuyout') !=-1) s.campaign='autobuyout: ' + s.getQueryParam('WT.mc_id');
		if (s.getQueryParam('WT.tsrc').indexOf('Banner') !=-1) s.campaign='banner: ' + s.getQueryParam('WT.mc_id');
		if (s.getQueryParam('WT.tsrc').indexOf('Advertorial') !=-1) s.campaign='advertorial: ' + s.getQueryParam('WT.mc_id');
		if (s.getQueryParam('WT.tsrc').indexOf('Video') !=-1) s.campaign='video: ' + s.getQueryParam('WT.mc_id');
		if (s.getQueryParam('WT.tsrc').indexOf('QR_code') !=-1) s.campaign='qrcode: ' + s.getQueryParam('WT.mc_id');
		if (s.getQueryParam('WT.tsrc').indexOf('DirectMail') !=-1) s.campaign='directmail: ' + s.getQueryParam('WT.mc_id');

		if (s.getQueryParam('WT.tsrc').indexOf('Email') !=-1)s.prop33= s.eVar33= s.getQueryParam('WT.mc_id');

		if (s.getQueryParam('WT.tsrc').indexOf('eBroc') !=-1) s.prop30=s.eVar30='ebrochure: ' + s.getQueryParam('WT.mc_id');
		if (s.getQueryParam('WT.tsrc').indexOf('CampaignSite') !=-1) s.prop30=s.eVar30='campaignsite: ' + s.getQueryParam('WT.mc_id');
	}
	
	if (!s.getQueryParam('WT.tsrc') && s.getQueryParam('WT.mc_id')){
	
		if (s.getQueryParam('WT.mc_id').indexOf('eDM_') != -1)s.prop33= s.eVar33= s.getQueryParam('WT.mc_id');
		else s.campaign='banner: ' + s.getQueryParam('WT.mc_id');
	}
}


function padFrontZero(val) {
	if (val < 10) return '0'+val; else return val.toString();
}

function popDT() {
	var dte = new Date();
	return dte.getFullYear()+padFrontZero(dte.getMonth()+1)+padFrontZero(dte.getDate())+' '+padFrontZero(dte.getHours());
}


function trafficsource() {

  	return camp()
}

function camp(){

	if(s.getQueryParam('referrer')) var ref=s.getQueryParam('referrer') 
	else var ref = document.referrer; 
	
	var fordCamp = s.getQueryParam('fmccmp');
	 
	if(s.getQueryParam('bannerid')) return 'banner';
	else if(s.getQueryParam('emailid')) return 'email';
    else if(s.getQueryParam('searchid')) {s.eVar50 = s.prop50 = "paid:" + s.prop50; return 'search-paid';}
    else if(s.getQueryParam('scmp')) return 'social-placement';
    else if(fordCamp){if (fordCamp.indexOf('t2-fdaf')>-1 || fordCamp.indexOf('t2-lda')>-1){return 'fmc:tier2';}else return 'fmc:other';}
    else if(ref=='') return 'typed-bookmarked';
    else if(refSearch(ref)) {s.eVar50 = s.prop50 = "natural:"+s.prop50; return 'search-natural';}
    else if(refSocial(ref)) return 'social';
    else return 'natural-referrer';
}


function refSearch(ref) {
   	var se = new Array('google.|q','yahoo.com|p','msn.com|q','ask.com|q','myway.com|searchfor','altavista.com|q','netscape.com|query','live.com|q','allthweb.com|q','lycos.com|query','.aol.|q','.aol.|query','suche.aolsvc.de|query','suche.aolsvc.de|q','bing.com|q','ask.jp|q','ask.co|ask','ask.jp|ask','ask.co|q','search.mywebsearch.com|searchfor','baidu.com|wd');

    for (i = 0; i < se.length; i++) {
        var tmp = se[i].split('|');
        var keyword = s.getQueryParam(tmp[1], '', ref);
        if (ref.indexOf(tmp[0]) > -1) {
	        if(keyword == ''&& typeof keyword != "undefined")keyword="no keyword"
	   		s.eVar50 = s.prop50 = keyword;
            if (tmp[0] == 'google.') {
                var rnk1 = s.getQueryParam('resnum', '', ref);
                var rnk2 = s.getQueryParam('cd', '', ref);
    
                if (rnk1||rnk2) {
                    s.events = s.apl(s.events, "event50", ",", 1);
                    s.events = s.apl(s.events, "event51", ",", 1);
                   
                    if(rnk1)s.products = s.apl(s.products, ";;;;" + "event50=" + rnk1, ",", 1);
                    if(rnk2)s.products = s.apl(s.products, ";;;;" + "event50=" + rnk2, ",", 1);
                	}
            	}
        
            return true;
        }
    }

    return false;
}

function refSocial(ref) {
   	var socialSites = new Array('12seconds.tv','4travel.jp','advogato.org','ameba.jp','anobii.com','asmallworld.net','backtype.com','badoo.com','bebo.com','bigadda.com','bigtent.com','biip.no','blackplanet.com','blog.seesaa.jp','blogspot.com','blogster.com','blomotion.jp','bolt.com','brightkite.com','buzznet.com','cafemom.com','care2.com','classmates.com','cloob.com','collegeblender.com','cyworld.co.kr','cyworld.com.cn','dailymotion.com','delicious.com','deviantart.com','digg.com','diigo.com','disqus.com','draugiem.lv','facebook.com','faceparty.com','fc2.com','flickr.com','flixster.com','fotolog.com','foursquare.com','friendfeed.com','friendsreunited.com','friendster.com','fubar.com','gaiaonline.com','geni.com','goodreads.com','grono.net','habbo.com','hatena.ne.jp','hi5.com','hotnews.infoseek.co.jp','hyves.nl','ibibo.com','identi.ca','imeem.com','intensedebate.com','irc-galleria.net','iwiw.hu','jaiku.com','jp.myspace.com','kaixin001.com','kaixin002.com','kakaku.com','kanshin.com','kozocom.com','last.fm','linkedin.com','livejournal.com','me2day.net','meetup.com','mister-wong.com','mixi.jp','mixx.com','mouthshut.com','multiply.com','myheritage.com','mylife.com','myspace.com','myyearbook.com','nasza-klasa.pl','netlog.com','nettby.no','netvibes.com','nicovideo.jp','ning.com','odnoklassniki.ru','orkut.com','pakila.jp','photobucket.com','pinterest.com','plaxo.com','plurk.com','plus.google.com','reddit.com','renren.com','skyrock.com','slideshare.net','smcb.jp','smugmug.com','sonico.com','studivz.net','stumbleupon.com','t.163.com','t.co','t.hexun.com','t.ifeng.com','t.people.com.cn','t.qq.com','t.sohu.com','tabelog.com','tagged.com','taringa.net','tripit.com','trombi.com','trytrend.jp','tuenti.com','tumblr.com','twine.com','twitter.com','uhuru.jp','viadeo.com','vimeo.com','vkontakte.ru','vox.com','wayn.com','weibo.com','weourfamily.com','wer-kennt-wen.de','wordpress.com','xanga.com','xing.com','yaplog.jp','yelp.com','youtube.com','yozm.daum.net','yuku.com','zooomr.com');
	
    for (i = 0; i < socialSites.length; i++) {
        if (ref.indexOf(socialSites[i]) > -1) {return true;}
    }
    return false;
}


function isInternal()
{
	
	var ref=document.referrer
	if(ref!='')
	{
		if(ref.indexOf('www.')>-1)ref=ref.replace('www.','')
		if(ref.indexOf('https://')>-1)ref=ref.replace('https://','')
		if(ref.indexOf('http://')>-1)ref=ref.replace('http://','')	
		var ref1=ref.split('/');
		var refdom=ref1[0];
		
	var filter =s.linkInternalFilters.split(',')
	
		for(i=0;i<filter.length; i++)
		{
		if(refdom.indexOf(filter[i])>-1)return true;
		}
	}	

		return false;
}

function changeCookiePeriods(host){
//if more than "ford.co" or "ford.com" - return true
	var hostArray = new Array();
	hostArray = host.split('.');
	for (i=0; i < hostArray.length; i++) {
		if (hostArray[i] == 'ford' || hostArray[i] == 'fordpartner' || hostArray[i] == 'fordfranchise' || hostArray[i] == 'mazda' || hostArray[i] == 'lincoln' || hostArray[i] == 'motocraft' || hostArray[i] == 'fordcaminhoes' || hostArray[i] == 'myford'){
			var maxlength = i + 2;
			if (hostArray.length > maxlength) return true;
		}
	}
}

//List of plugins
s.doPlugins=s_doPlugins
/************************** PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */

/*
 * Plugin Utility: Replace v1.0
 */
s.repl=new Function("x","o","n",""
+"var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+"substring(i+o.length);i=x.indexOf(o,i+l)}return x");

/*
 * Plugin: socialPlatforms v1.1
 */
s.socialPlatforms=new Function("a",""
+"var s=this,g,K,D,E,F,i;g=s.referrer?s.referrer:document.referrer;g=g."
+"toLowerCase();K=s.split(s.socPlatList,'|');for(i=0;i<K.length;i++){"
+"D=s.split(K[i],'>');if(g.indexOf(D[0])!=-1){s.contextData['a.socialcontentprovider']=D[1];}}");
 
s.socPlatList="facebook.com>Facebook|twitter.com>Twitter|t.co/>Twitter|youtube.com>Youtube|clipmarks.com>Clipmarks|dailymotion.com>Dailymotion|delicious.com>Delicious|digg.com>Digg|diigo.com>Diigo|flickr.com>Flickr|flixster.com>Flixster|fotolog.com>Fotolog|friendfeed.com>FriendFeed|google.com/buzz>Google Buzz|buzz.googleapis.com>Google Buzz|plus.google.com>Google+|hulu.com>Hulu|identi.ca>identi.ca|ilike.com>iLike|intensedebate.com>IntenseDebate|myspace.com>MySpace|newsgator.com>Newsgator|photobucket.com>Photobucket|plurk.com>Plurk|slideshare.net>SlideShare|smugmug.com>SmugMug|stumbleupon.com>StumbleUpon|tumblr.com>Tumblr|vimeo.com>Vimeo|wordpress.com>WordPress|xanga.com>Xanga|metacafe.com>Metacafe|pinterest.com>Pinterest";

/*  
 * socialAuthors v1.5.2
 */
s.socialAuthors=new Function("",""
+"var s=this,g;g=s.referrer?s.referrer:document.referrer;if(g.indexOf"
+"('http://t.co/')===0||g.indexOf('https://t.co/')===0||g.indexOf('pi"
+"nterest.com/pin')!==-1||g.indexOf('tumblr.com')!==-1||g.indexOf('yo"
+"utube.com')!==-1){s.Integrate.add('SocialAuthor');s.Integrate.Socia"
+"lAuthor.tEvar='reserved';s.Integrate.SocialAuthor.get('http://sa-se"
+"rvices.social.omniture.com/author/name?var=[VAR]&callback=s.socialA"
+"uthorSearch&rs='+encodeURIComponent(s_account)+'&q='+encodeURICompo"
+"nent(g));s.Integrate.SocialAuthor.delay();s.Integrate.SocialAuthor."
+"setVars=function(s,p){if(p.tEvar==='reserved'){s.contextData['a.soc"
+"ialauthor']=s.user;}else{s[p.tEvar]=s.user;}}}");
s.socialAuthorSearch=new Function("obj",""
+"var s=this;if(typeof obj==='undefined'||typeof obj.author==='undefi"
+"ned'){s.user='Not Found';}else{s.user=obj.author;}s.Integrate.Socia"
+"lAuthor.ready();");

/*
* Plugin Utility: apl v1.1
*/
s.apl = new Function("l", "v", "d", "u", ""
+ "var s=this,m=0;if(!l)l='';if(u){var i,n,a=s.split(l,d);for(i=0;i<a."
+ "length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+ "e()));}}if(!m)l=l?l+d+v:v;return l");

/*
* Utility Function: split v1.5 (JS 1.0 compatible)
*/
s.split = new Function("l", "d", ""
+ "var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+ "++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

/*
 * Plugin: getQueryParam 2.3
 */
s.getQueryParam=new Function("p","d","u",""
+"var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati"
+"on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p"
+".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-"
+"1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i="
+"=p.length?i:i+1)}return v");
s.p_gpv=new Function("k","u",""
+"var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
+"=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+"epa(v)}return ''");

/*
 * Plugin: Set Suite
 */
s.setSuite=new Function("v","c","e",""
+"var s=this,k=s.c_r(c),a=new Date;e=e?e:0;if(v){a.setTime(a.getTime("
+")+1800000);s.c_w(c,v,a);}else{v='novalue';a.setTime(a.getTime()+1800000);s.c_w(c,v,a);}");

/*
 * Plugin: getAndPersistValue 0.3 - get a value on every page
 */
s.getAndPersistValue=new Function("v","c","e",""
+"var s=this,a=new Date;e=e?e:0;a.setTime(a.getTime()+e*86400000);if("
+"v)s.c_w(c,v,e?a:0);return s.c_r(c);");



/*
 * Plugin: getCustomValOnce 
 */
s.getCustomValOnce=new Function("v","c","e",""
+"var s=this,k=s.c_r(c),a=new Date;e=e?e:0;if(v){a.setTime(a.getTime("
+")+1800000);if(!s.c_w(c,v,a))s.c_w(c,v,0);}else{a.setTime(a.getTime()+1800000);v=s.c_r(c);if(!s.c_w(c,v,a))s.c_w(c,v,a);}return v==k?'':v");


s.join = new Function("v","p",""
+"var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"
+":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"
+";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el"
+"se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");

/*
 * Plugin: getVisitStart v2.0 - returns 1 on first page of visit
 * otherwise 0
 */
s.getVisitStart=new Function("c",""
+"var s=this,v=1,t=new Date;t.setTime(t.getTime()+1800000);if(s.c_r(c"
+")){v=0}if(!s.c_w(c,1,t)){s.c_w(c,1,0)}if(!s.c_r(c)){v=0}return v;"); 

function fnGetDomain(url) {
return (url.match(/:\/\/(.[^/]+)/)[1]);
}

/* Configure Modules and Plugins */

s.maxDelay='3000';//max time to wait for 3rd party api response in milliseconds
s.loadModule("Integrate")
s.Integrate.onLoad=function(s,m){
	s.socialAuthors();
	//add other integration module dependent functions here
 };


/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/

s.trackingServer="fordap.sc.omtrdc.net"
s.trackingServerSecure="fordap.sc.omtrdc.net"

/************* Modules **************/

/* Module: Integrate */
s.m_Integrate_c="var m=s.m_i('Integrate');m.add=function(n,o){var m=this,p;if(!o)o='s_Integrate_'+n;if(!m.s.wd[o])m.s.wd[o]=new Object;m[n]=new Object;p=m[n];p._n=n;p._m=m;p._c=0;p._d=0;p.disable=0;p"
+".get=m.get;p.delay=m.delay;p.ready=m.ready;p.beacon=m.beacon;p.script=m.script;m.l[m.l.length]=n};m._g=function(t){var m=this,s=m.s,i,p,f=(t?'use':'set')+'Vars',tcf;for(i=0;i<m.l.length;i++){p=m[m."
+"l[i]];if(p&&!p.disable&&p[f]){if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','p','f','var e;try{p[f](s,p)}catch(e){}');tcf(s,p,f)}else p[f](s,p)}}};m._t=function(){this._g(1)};m._fu=func"
+"tion(p,u){var m=this,s=m.s,v,x,y,z,tm=new Date;if(u.toLowerCase().substring(0,4) != 'http')u='http://'+u;if(s.ssl)u=s.rep(u,'http:','https:');p.RAND=Math&&Math.random?Math.floor(Math.random()*10000"
+"000000000):tm.getTime();p.RAND+=Math.floor(tm.getTime()/10800000)%10;x=0;while(x>=0){x=u.indexOf('[',x);if(x>=0){y=u.indexOf(']',x);if(y>x){z=u.substring(x+1,y);if(z.length>2&&z.substring(0,2)=='s."
+"'){v=s[z.substring(2)];if(!v)v=''}else{v=''+p[z];if(!(v==p[z]||parseFloat(v)==p[z]))z=0}if(z) {u=u.substring(0,x)+s.rep(escape(v),'+','%2B')+u.substring(y+1);x=y-(z.length-v.length+1)} else {x=y}}}"
+"}return u};m.get=function(u,v){var p=this,m=p._m;if(!p.disable){if(!v)v='s_'+m._in+'_Integrate_'+p._n+'_get_'+p._c;p._c++;p.VAR=v;p._d++;m.s.loadModule('Integrate:'+v,m._fu(p,u),0,1,p._n)}};m.delay"
+"=function(){var p=this;if(p._d<=0)p._d=1};m.ready=function(){var p=this,m=p._m;p._d=0;if(!p.disable)m.s.dlt()};m._d=function(){var m=this,i,p;for(i=0;i<m.l.length;i++){p=m[m.l[i]];if(p&&!p.disable&"
+"&p._d>0)return 1}return 0};m._x=function(d,n){var p=this[n],x;if(!p.disable){for(x in d)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))p[x]=d[x];p._d--}};m.beacon=function(u){var p=this,m"
+"=p._m,s=m.s,imn='s_i_'+m._in+'_Integrate_'+p._n+'_'+p._c,im;if(!p.disable&&s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){p._c++;im=s.wd[imn]=new Image;im.src=m._fu(p,u)}};m.s"
+"cript=function(u){var p=this,m=p._m;if(!p.disable)m.s.loadModule(0,m._fu(p,u),0,1)};m.l=new Array;if(m.onLoad)m.onLoad(s,m)";
s.m_i("Integrate");


/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s.version='H.27.3';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(s.rep(m,\"\\\\\",\"\\\\"
+"\\\\\"),\"\\n\",\"\\\\n\"),\"\\\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}retur"
+"n y};s.fl=function(x,l){return x?(''+x).substring(0,l):x};s.co=function(o){return o};s.num=function(x){x=''+x;for(var p=0;p<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;ret"
+"urn 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',f=\"+~!*()'\",i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3){x=encodeURIComponent("
+"x);for(i=0;i<f.length;i++) {n=f.substring(i,i+1);if(x.indexOf(n)>=0)x=s.rep(x,n,\"%\"+n.charCodeAt(0).toString(16).toUpperCase())}}else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.su"
+"bstring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else x=s.rep(escape(''+x),'+"
+"','%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00"
+"'+x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x){var s=this,y,tcf;if(x){x=s.rep(''+x,'+',' ');if(s.em==3){tcf=new Function('x','var y,e;try{y=decodeURIComponent(x)}catch(e){y=unesc"
+"ape(x)}return y');return tcf(x)}else return unescape(x)}return y};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r"
+";z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a=a.substring(0,c);if(t.substring("
+"0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf'"
+",f);return s.fsg};s.mpc=function(m,a){var s=this,c,l,n,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(v&&v=='prerender'){if(!s.mpq){s.mpq=new Array;l=s.sp('webkitvisibilitychange,visi"
+"bilitychange',',');for(n=0;n<l.length;n++){s.d.addEventListener(l[n],new Function('var s=s_c_il['+s._in+'],c,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(s.mpq&&v==\"visible\"){whil"
+"e(s.mpq.length>0){c=s.mpq.shift();s[c.m].apply(s,c.a)}s.mpq=0}'),false)}}c=new Object;c.m=m;c.a=a;s.mpq.push(c);return 1}return 0};s.si=function(){var s=this,i,k,v,c=s_gi+'var s=s_gi(\"'+s.oun+'\")"
+";s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=undefined){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}c+=\"s.lnk=s.eo=s.linkName=s.li"
+"nkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostnam"
+"e,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'"
+".','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<"
+"0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-6"
+"0);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':''"
+");return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i"
+";l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tc"
+"f=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s"
+".wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0"
+";return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return "
+"s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)fo"
+"r(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r.t,r.u)}};s.flushBufferedRequests=function(){};s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackin"
+"gServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+s._in+'_'+un,im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLow"
+"erCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/'+s.vers"
+"ion+(s.tcn?'T':'')+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(rs,2047)}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if"
+"(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]"
+"=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}if(s.debugTracking){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;for(dln=0;dln<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im=s.wd["
+"imn];if(!im)im=s.wd[imn]=new Image;im.alt=\"\";im.s_l=0;im.onload=im.onerror=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.bcr();s.mrq(\"'+un+'\");s.nrs--;if(!"
+"s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;im.src=rs;if(s.useForcedLinkTracking||s.bcf){if(!s.forcedLinkTrackingTimeout)s.forcedLinkTrackingTimeout=250;setTimeout('if(window"
+".s_c_il)window.s_c_il['+s._in+'].bcr()',s.forcedLinkTrackingTimeout);}else if((s.lnk||s.eo)&&(!ta||ta=='_self'||ta=='_top'||ta=='_parent'||(s.wd.name&&ta==s.wd.name))){b=e=new Date;while(!im.s_l&&e"
+".getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'"
+"+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,"
+"l=0,q,a,b='',c='',t;if(x&&x.length>255){y=''+x;i=y.indexOf('?');if(i>0){q=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCase();j=0;if(h.substring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='ht"
+"tps://')j+=8;i=h.indexOf(\"/\",j);if(i>0){h=h.substring(j,i);p=y.substring(i);y=y.substring(0,i);if(h.indexOf('google')>=0)l=',q,ie,start,search_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l="
+"',p,ei,';if(l&&q){a=s.sp(q,'&');if(a&&a.length>1){for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'"
+"+c;else c=''}i=253-(q.length-c.length)-y.length;x=y+(i>0?p.substring(0,i):'')+'?'+q}}}}return x};s.s2q=function(k,v,vf,vfp,f){var s=this,qs='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextDat"
+"a\")k=\"c\";if(v){for(sk in v)if((!f||sk.substring(0,f.length)==f)&&v[sk]&&(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',')>=0)&&(!Object||!Object.prototype||!Object.prototype[sk])){nfm=0;if(nfl)for(n"
+"fn=0;nfn<nfl.length;nfn++)if(sk.substring(0,nfl[nfn].length)==nfl[nfn])nfm=1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk];if(f)sk=sk.substring(f.length);if(sk.length>0){nke=sk.indexOf('.');if(nke>0){n"
+"k=sk.substring(0,nke);nf=(f?f:'')+nk+'.';if(!nfl)nfl=new Array;nfl[nfl.length]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(typeof(sv)=='boolean'){if(sv)sv='true';else sv='false'}if(sv){if(vfp=='retrieveLi"
+"ghtData'&&f.indexOf('.contextData.')<0){sp=sk.substring(0,4);ss=sk.substring(4);if(sk=='transactionID')sk='xact';else if(sk=='channel')sk='ch';else if(sk=='campaign')sk='v0';else if(s.num(ss)){if(s"
+"p=='prop')sk='c'+ss;else if(sp=='eVar')sk='v'+ss;else if(sp=='list')sk='l'+ss;else if(sp=='hier'){sk='h'+ss;sv=sv.substring(0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}if(qs!='')qs+='&.'+k}return "
+"qs};s.hav=function(){var s=this,qs='',l,fv='',fe='',mn,i,e;if(s.lightProfileID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv=','+fv+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType){fv=s.linkTrackVars;fe"
+"=s.linkTrackEvents;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;if(fe){fe=','+fe+',';if"
+"(fv)fv+=',events,'}if (s.events2)e=(e?',':'')+s.events2}for(i=0;i<l.length;i++){var k=l[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&e){v=e;e=''}if(v&&(!fv|"
+"|fv.indexOf(','+k+',')>=0)&&k!='linkName'&&k!='linkType'){if(k=='supplementalDataID')q='sdid';else if(k=='timestamp')q='ts';else if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';e"
+"lse if(k=='marketingCloudVisitorID')q='mid';else if(k=='analyticsVisitorID')q='aid';else if(k=='audienceManagerLocationHint')q='aamlh';else if(k=='audienceManagerBlob')q='aamb';else if(k=='authStat"
+"e')q='as';else if(k=='pageURL'){q='g';if(v.length>255){s.pageURLRest=v.substring(255);v=v.substring(0,255);}}else if(k=='pageURLRest')q='-g';else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if"
+"(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigrationServerSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&"
+"s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em==2||s.em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainP"
+"eriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode')q='cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=="
+"'campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j';else if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='brows"
+"erWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp';else if(k=='plugins')q='p';else if(k=='events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v"
+",fe)}else if(k=='events2')v='';else if(k=='contextData'){qs+=s.s2q('c',s[k],fv,k,0);v=''}else if(k=='lightProfileID')q='mtp';else if(k=='lightStoreForSeconds'){q='mtss';if(!s.lightProfileID)v=''}el"
+"se if(k=='lightIncrementBy'){q='mti';if(!s.lightProfileID)v=''}else if(k=='retrieveLightProfiles')q='mtsr';else if(k=='deleteLightProfiles')q='mtsd';else if(k=='retrieveLightData'){if(s.retrieveLig"
+"htProfiles)qs+=s.s2q('mts',s[k],fv,k,0);v=''}else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape("
+"q)+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('?'),hi=h.indexOf('#');if(qi>=0){if(hi>=0&&hi<qi)qi=hi;}e"
+"lse qi=hi;h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)ret"
+"urn 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLi"
+"nks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.indexOf('#')!=0&&h.indexOf('about:')!=0&&h.indexOf('javascript:')!=0&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt"
+"(lif,',','ltef',h)))return 'e';return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=this;s.t();s.lnk=0;if(b)return this[b](e);return true');s.bcr=function(){var "
+"s=this;if(s.bct&&s.bce)s.bct.dispatchEvent(s.bce);if(s.bcf){if(typeof(s.bcf)=='function')s.bcf();else if(s.bct&&s.bct.href)s.d.location=s.bct.href}s.bct=s.bce=s.bcf=0};s.bc=new Function('e','if(e&&"
+"e.s_fe)return;var s=s_c_il['+s._in+'],f,tcf,t,n,nrs,a,h;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;if(!s.bbc)s.useForcedLinkTracking=0;else if(!s.useForcedLinkTracking){s.b.removeEventListener(\"cli"
+"ck\",s.bc,true);s.bbc=s.useForcedLinkTracking=0;return}else s.b.removeEventListener(\"click\",s.bc,false);s.eo=e.srcElement?e.srcElement:e.target;nrs=s.nrs;s.t();s.eo=0;if(s.nrs>nrs&&s.useForcedLin"
+"kTracking&&e.target){a=e.target;while(a&&a!=s.b&&a.tagName.toUpperCase()!=\"A\"&&a.tagName.toUpperCase()!=\"AREA\")a=a.parentNode;if(a){h=a.href;if(h.indexOf(\"#\")==0||h.indexOf(\"about:\")==0||h."
+"indexOf(\"javascript:\")==0)h=0;t=a.target;if(e.target.dispatchEvent&&h&&(!t||t==\"_self\"||t==\"_top\"||t==\"_parent\"||(s.wd.name&&t==s.wd.name))){tcf=new Function(\"s\",\"var x;try{n=s.d.createE"
+"vent(\\\\\"MouseEvents\\\\\")}catch(x){n=new MouseEvent}return n\");n=tcf(s);if(n){tcf=new Function(\"n\",\"e\",\"var x;try{n.initMouseEvent(\\\\\"click\\\\\",e.bubbles,e.cancelable,e.view,e.detail"
+",e.screenX,e.screenY,e.clientX,e.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.button,e.relatedTarget)}catch(x){n=0}return n\");n=tcf(n,e);if(n){n.s_fe=1;e.stopPropagation();if (e.stopImmediate"
+"Propagation) {e.stopImmediatePropagation();}e.preventDefault();s.bct=e.target;s.bce=n}}}}}');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?')"
+";k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host"
+"?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagName;if(o.tagUrn||(o.scopeName&&o.scopeName.toUpperCase()!='HTML'))return '';t=t&"
+"&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE')t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var "
+"s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.r"
+"ep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' ','');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.s"
+"rc&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&("
+"','+u+',').indexOf(','+un+',')>=0){if(u!=s.un&&s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c"
+"<0)return s.pt(v,'&','rqf',un);return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);re"
+"turn 0};s.sqs=function(un,q){var s=this;s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','"
+"sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype["
+"x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for("
+"i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s."
+"wds=function(){var s=this;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener){if(s.n&&((s.n.userAgent.indexOf('WebK"
+"it')>=0&&s.d.createEvent)||(s.n.userAgent.indexOf('Firefox/2')>=0&&s.wd.MouseEvent))){s.bbc=1;s.useForcedLinkTracking=1;s.b.addEventListener('click',s.bc,true)}s.b.addEventListener('click',s.bc,fal"
+"se)}else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=function(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<19"
+"00?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t"
+"?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.substring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountL"
+"ist,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.i"
+"ndexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};s.sa=function(un){var s=this;if(s.un&&s.mpc('sa',arguments))return;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=',"
+"'+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_"
+"m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l"
+"[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=ne"
+"w Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(s.mpc(\"m_a\",arguments))return;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)"
+"));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m."
+"_d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).index"
+"Of('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]("
+")}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var"
+" s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement"
+"){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)c"
+"learTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b"
+"+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o"
+".l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s"
+".m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.voa=function(vo,r){var s=this,l=s.va_g,i,k,v,x;for(i=0;i<l.length;i++){k=l[i];v=vo[k];if(v||vo['!'+k]"
+"){if(!r&&(k==\"contextData\"||k==\"retrieveLightData\")&&s[k])for(x in s[k])if(!v[x])v[x]=s[k][x];s[k]=v}}};s.vob=function(vo,onlySet){var s=this,l=s.va_g,i,k;for(i=0;i<l.length;i++){k=l[i];vo[k]=s"
+"[k];if(!onlySet&&!vo[k])vo['!'+k]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s."
+"maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if(!vo)vo=new O"
+"bject;s.vob(vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s._waitingForMarketingCloudVisitorID = false;s._doneWaitingForMarketingClou"
+"dVisitorID = false;s._marketingCloudVisitorIDCallback=function(marketingCloudVisitorID) {var s=this;s.marketingCloudVisitorID = marketingCloudVisitorID;s._doneWaitingForMarketingCloudVisitorID = tr"
+"ue;s._callbackWhenReadyToTrackCheck();};s._waitingForAnalyticsVisitorID = false;s._doneWaitingForAnalyticsVisitorID = false;s._analyticsVisitorIDCallback=function(analyticsVisitorID) {var s=this;s."
+"analyticsVisitorID = analyticsVisitorID;s._doneWaitingForAnalyticsVisitorID = true;s._callbackWhenReadyToTrackCheck();};s._waitingForAudienceManagerLocationHint = false;s._doneWaitingForAudienceMan"
+"agerLocationHint = false;s._audienceManagerLocationHintCallback=function(audienceManagerLocationHint) {var s=this;s.audienceManagerLocationHint = audienceManagerLocationHint;s._doneWaitingForAudien"
+"ceManagerLocationHint = true;s._callbackWhenReadyToTrackCheck();};s._waitingForAudienceManagerBlob = false;s._doneWaitingForAudienceManagerBlob = false;s._audienceManagerBlobCallback=function(audie"
+"nceManagerBlob) {var s=this;s.audienceManagerBlob = audienceManagerBlob;s._doneWaitingForAudienceManagerBlob = true;s._callbackWhenReadyToTrackCheck();};s.isReadyToTrack=function() {var s=this,read"
+"yToTrack = true,visitor = s.visitor;if ((visitor) && (visitor.isAllowed())) {if ((!s._waitingForMarketingCloudVisitorID) && (!s.marketingCloudVisitorID) && (visitor.getMarketingCloudVisitorID)) {s."
+"_waitingForMarketingCloudVisitorID = true;s.marketingCloudVisitorID = visitor.getMarketingCloudVisitorID([s,s._marketingCloudVisitorIDCallback]);if (s.marketingCloudVisitorID) {s._doneWaitingForMar"
+"ketingCloudVisitorID = true;}}if ((!s._waitingForAnalyticsVisitorID) && (!s.analyticsVisitorID) && (visitor.getAnalyticsVisitorID)) {s._waitingForAnalyticsVisitorID = true;s.analyticsVisitorID = vi"
+"sitor.getAnalyticsVisitorID([s,s._analyticsVisitorIDCallback]);if (s.analyticsVisitorID) {s._doneWaitingForAnalyticsVisitorID = true;}}if ((!s._waitingForAudienceManagerLocationHint) && (!s.audienc"
+"eManagerLocationHint) && (visitor.getAudienceManagerLocationHint)) {s._waitingForAudienceManagerLocationHint = true;s.audienceManagerLocationHint = visitor.getAudienceManagerLocationHint([s,s._audi"
+"enceManagerLocationHintCallback]);if (s.audienceManagerLocationHint) {s._doneWaitingForAudienceManagerLocationHint = true;}}if ((!s._waitingForAudienceManagerBlob) && (!s.audienceManagerBlob) && (v"
+"isitor.getAudienceManagerBlob)) {s._waitingForAudienceManagerBlob = true;s.audienceManagerBlob = visitor.getAudienceManagerBlob([s,s._audienceManagerBlobCallback]);if (s.audienceManagerBlob) {s._do"
+"neWaitingForAudienceManagerBlob = true;}}if (((s._waitingForMarketingCloudVisitorID)     && (!s._doneWaitingForMarketingCloudVisitorID)     && (!s.marketingCloudVisitorID)) ||((s._waitingForAnalyti"
+"csVisitorID)          && (!s._doneWaitingForAnalyticsVisitorID)          && (!s.analyticsVisitorID)) ||((s._waitingForAudienceManagerLocationHint) && (!s._doneWaitingForAudienceManagerLocationHint)"
+" && (!s.audienceManagerLocationHint)) ||((s._waitingForAudienceManagerBlob)         && (!s._doneWaitingForAudienceManagerBlob)         && (!s.audienceManagerBlob))) {readyToTrack = false;}}return r"
+"eadyToTrack;};s._callbackWhenReadyToTrackQueue = null;s._callbackWhenReadyToTrackInterval = 0;s.callbackWhenReadyToTrack=function(callbackThis,callback,args) {var s=this,callbackInfo;callbackInfo ="
+" {};callbackInfo.callbackThis = callbackThis;callbackInfo.callback     = callback;callbackInfo.args         = args;if (s._callbackWhenReadyToTrackQueue == null) {s._callbackWhenReadyToTrackQueue = "
+"[];}s._callbackWhenReadyToTrackQueue.push(callbackInfo);if (s._callbackWhenReadyToTrackInterval == 0) {s._callbackWhenReadyToTrackInterval = setInterval(s._callbackWhenReadyToTrackCheck,100);}};s._"
+"callbackWhenReadyToTrackCheck=new Function('var s=s_c_il['+s._in+'],callbackNum,callbackInfo;if (s.isReadyToTrack()) {if (s._callbackWhenReadyToTrackInterval) {clearInterval(s._callbackWhenReadyToT"
+"rackInterval);s._callbackWhenReadyToTrackInterval = 0;}if (s._callbackWhenReadyToTrackQueue != null) {while (s._callbackWhenReadyToTrackQueue.length > 0) {callbackInfo = s._callbackWhenReadyToTrack"
+"Queue.shift();callbackInfo.callback.apply(callbackInfo.callbackThis,callbackInfo.args);}}}');s._handleNotReadyToTrack=function(variableOverrides) {var s=this,args,varKey,variableOverridesCopy = nul"
+"l,setVariables = null;if (!s.isReadyToTrack()) {args = [];if (variableOverrides != null) {variableOverridesCopy = {};for (varKey in variableOverrides) {variableOverridesCopy[varKey] = variableOverr"
+"ides[varKey];}}setVariables = {};s.vob(setVariables,true);args.push(variableOverridesCopy);args.push(setVariables);s.callbackWhenReadyToTrack(s,s.track,args);return true;}return false;};s.gfid=func"
+"tion(){var s=this,d='0123456789ABCDEF',k='s_fid',fid=s.c_r(k),h='',l='',i,j,m=8,n=4,e=new Date,y;if(!fid||fid.indexOf('-')<0){for(i=0;i<16;i++){j=Math.floor(Math.random()*m);h+=d.substring(j,j+1);j"
+"=Math.floor(Math.random()*n);l+=d.substring(j,j+1);m=n=16}fid=h+'-'+l;}y=e.getYear();e.setYear(y+2+(y<1900?1900:0));if(!s.c_w(k,fid,e))fid=0;return fid};s.track=s.t=function(vo,setVariables){var s="
+"this,notReadyToTrack,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate()+'"
+"/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',vb=new Object;i"
+"f (s.visitor) {if (s.visitor.getAuthState) {s.authState = s.visitor.getAuthState();}if ((!s.supplementalDataID) && (s.visitor.getSupplementalDataID)) {s.supplementalDataID = s.visitor.getSupplement"
+"alDataID(\"AppMeasurement:\" + s._in,(s.expectSupplementalData ? false : true));}}if(s.mpc('t',arguments))return;s.gl(s.vl_g);s.uns();s.m_ll();notReadyToTrack = s._handleNotReadyToTrack(vo);if (!no"
+"tReadyToTrack) {if (setVariables) {s.voa(setVariables);}if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&S"
+"tring.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Fun"
+"ction('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next){j='1.7';if(a.reduce){j='1.8';if(j.trim){j='1.8.1';if(Date.parse){j='1.8.2';if(Object.create)j='1.8.5'}}}}}}}}}"
+"if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins"
+"}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElement.offsetWidth;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function("
+"'s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}return hp');hp=tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#"
+"clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.co"
+"lorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.vob(vb);s.voa(vo)}if(!s.analyt"
+"icsVisitorID&&!s.marketingCloudVisitorID)s.fid=s.gfid();if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);if(!s.abort){var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL="
+"l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk,p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s"
+".eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(o){t=s.ot(o);n=s.oid(o);x=o.s_oidt}}if(!n||t=='BODY')o='';if(o){oc=o.onclick?''+o.onclick:'';if((oc.indexOf('s_gs(')>="
+"0&&oc.indexOf('.s_oc(')<0)||oc.indexOf('.tl(')>=0)o=0}}if(o){if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowe"
+"rCase():s.lt(h);if(t&&(h||l)){s.pe='lnk_'+(t=='d'||t=='e'?t:'o');s.pev1=(h?s.ape(h):'');s.pev2=(l?s.ape(l):'')}else trk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if("
+"o.dataset&&o.dataset.sObjectId){s.wd.s_objectID=o.dataset.sObjectId;}else if(o.getAttribute&&o.getAttribute('data-s-object-id')){s.wd.s_objectID=o.getAttribute('data-s-object-id');}else if(s.useFor"
+"cedLinkTracking){s.wd.s_objectID='';oc=o.onclick?''+o.onclick:'';if(oc){var ocb=oc.indexOf('s_objectID'),oce,ocq,ocx;if(ocb>=0){ocb+=10;while(ocb<oc.length&&(\"= \\t\\r\\n\").indexOf(oc.charAt(ocb)"
+")>=0)ocb++;if(ocb<oc.length){oce=ocb;ocq=ocx=0;while(oce<oc.length&&(oc.charAt(oce)!=';'||ocq)){if(ocq){if(oc.charAt(oce)==ocq&&!ocx)ocq=0;else if(oc.charAt(oce)==\"\\\\\")ocx=!ocx;else ocx=0;}else"
+"{ocq=oc.charAt(oce);if(ocq!='\"'&&ocq!=\"'\")ocq=0}oce++;}oc=oc.substring(ocb,oce);if(oc){o.s_soid=new Function('s','var e;try{s.wd.s_objectID='+oc+'}catch(e){}');o.s_soid(s)}}}}}if(s.gg('objectID'"
+")){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}else trk=0}if(trk||qs){s.sampl"
+"ed=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,ta);qs='';s.m_m('t');if(s.p_r)s.p_r();s.referrer=s.lightProfileID=s.retrieveLightProfiles=s.delet"
+"eLightProfiles=''}s.sq(qs)}}}else s.dl(vo);if(vo)s.voa(vb,1);}s.abort=0;s.supplementalDataID=s.pageURLRest=s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.p"
+"g)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';return code};s.trackLink=s.tl=function(o,t,n,vo,f){var s=this;s.lnk=o;s.linkType=t;s.linkName=n;if(f){s.bct=o;s.bcf=f}s.t(vo)};s.trackLight"
+"=function(p,ss,i,vo){var s=this;s.lightProfileID=p;s.lightStoreForSeconds=ss;s.lightIncrementBy=i;s.t(vo)};s.setTagContainer=function(n){var s=this,l=s.wd.s_c_il,i,t,x,y;s.tcn=n;if(l)for(i=0;i<l.le"
+"ngth;i++){t=l[i];if(t&&t._c=='s_l'&&t.tagContainerName==n){s.voa(t);if(t.lmq)for(i=0;i<t.lmq.length;i++){x=t.lmq[i];y='m_'+x.n;if(!s[y]&&!s[y+'_c']){s[y]=t[y];s[y+'_c']=t[y+'_c']}s.loadModule(x.n,x"
+".u,x.d)}if(t.ml)for(x in t.ml)if(s[x]){y=s[x];x=t.ml[x];for(i in x)if(!Object.prototype[i]){if(typeof(x[i])!='function'||(''+x[i]).indexOf('s_c_il')<0)y[i]=x[i]}}if(t.mmq)for(i=0;i<t.mmq.length;i++"
+"){x=t.mmq[i];if(s[x.m]){y=s[x.m];if(y[x.f]&&typeof(y[x.f])=='function'){if(x.a)y[x.f].apply(y,x.a);else y[x.f].apply(y)}}}if(t.tq)for(i=0;i<t.tq.length;i++)s.t(t.tq[i]);t.s=s;return}}};s.wd=window;"
+"s.ssl=(s.wd.location.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n."
+"userAgent;s.ns6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Inte"
+"rnet Explorer');s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s."
+"apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharC"
+"ode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.sa(un);s.vl_l='supplementalDataID,timestamp,dynamicVariablePrefix,visitorID,marketingCloudVisitorID,analyticsVi"
+"sitorID,audienceManagerLocationHint,fid,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServerSecure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pageURL,"
+"referrer,contextData,currencyCode,lightProfileID,lightStoreForSeconds,lightIncrementBy,retrieveLightProfiles,deleteLightProfiles,retrieveLightData';s.va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='timestamp"
+",charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,contextData,lightProfileID,lightStoreForSeconds,lightIncrementBy';s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID"
+",purchaseID,campaign,state,zip,events,events2,products,audienceManagerBlob,authState,linkName,linkType';var n;for(n=1;n<=75;n++){s.vl_t+=',prop'+n+',eVar'+n;s.vl_m+=',prop'+n+',eVar'+n}for(n=1;n<=5"
+";n++)s.vl_t+=',hier'+n;for(n=1;n<=3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,bro"
+"wserHeight,connectionType,homepage,pageURLRest,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableB"
+"ufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryStrin"
+"g,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,lightTrackVars,_1_referrer,un';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);s.contextD"
+"ata=new Object;s.retrieveLightData=new Object;if(!ss)s.wds();if(pg){s.wd.s_co=function(o){return o};s.wd.s_gs=function(un){s_gi(un,1,1).t()};s.wd.s_dc=function(un){s_gi(un,1).t()}}",
w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,j,x,s;if(un){un=un.toLowerCase();if(l)for(j=0;j<2;j++)for(i=0;i<l.length;i++){s=l[i];x=s._c;if((!x||x=='s_c'||(j>0&&x=='s_l'))&&(s.oun==un||(s.fs&&s.sa&&s.fs(s.oun,un)))){if(s.sa)s.sa(un);if(x=='s_c')return s}else s=0}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
w.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
+"ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
w.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
w.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");
w.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
+"=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
+"x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
w.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
w.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
+"a");
w.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
+"f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
+"'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a<5||v.indexOf('Opera')>=0||u.indexOf('Opera')>=0)c=s_ft(c);if(!s){s=new Object;if(!w.s_c_in){w.s_c_il=new Array;w.s_c_in=0}s._il=w.s_c_il;s._in=w.s_c_in;s._il[s._in]=s;w.s_c_in++;}s._c='s_c';(new Function("s","un","pg","ss",c))(s,un,pg,ss);return s}
function s_giqf(){var w=window,q=w.s_giq,i,t,s;if(q)for(i=0;i<q.length;i++){t=q[i];s=s_gi(t.oun);s.sa(t.un);s.setTagContainer(t.tagContainerName)}w.s_giq=0}s_giqf();


//Ford chooses to use jQuery tmpl and its associated components under the MIT License.
(function(a){var r=a.fn.domManip,d="_tmplitem",q=/^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,b={},f={},e,p={key:0,data:{}},h=0,c=0,l=[];function g(e,d,g,i){var c={data:i||(d?d.data:{}),_wrap:d?d._wrap:null,tmpl:null,parent:d||null,nodes:[],calls:u,nest:w,wrap:x,html:v,update:t};e&&a.extend(c,e,{nodes:[],parent:d});if(g){c.tmpl=g;c._ctnt=c._ctnt||c.tmpl(a,c);c.key=++h;(l.length?f:b)[h]=c}return c}a.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(f,d){a.fn[f]=function(n){var g=[],i=a(n),k,h,m,l,j=this.length===1&&this[0].parentNode;e=b||{};if(j&&j.nodeType===11&&j.childNodes.length===1&&i.length===1){i[d](this[0]);g=this}else{for(h=0,m=i.length;h<m;h++){c=h;k=(h>0?this.clone(true):this).get();a.fn[d].apply(a(i[h]),k);g=g.concat(k)}c=0;g=this.pushStack(g,f,i.selector)}l=e;e=null;a.tmpl.complete(l);return g}});a.fn.extend({tmpl:function(d,c,b){return a.tmpl(this[0],d,c,b)},tmplItem:function(){return a.tmplItem(this[0])},template:function(b){return a.template(b,this[0])},domManip:function(d,l,j){if(d[0]&&d[0].nodeType){var f=a.makeArray(arguments),g=d.length,i=0,h;while(i<g&&!(h=a.data(d[i++],"tmplItem")));if(g>1)f[0]=[a.makeArray(d)];if(h&&c)f[2]=function(b){a.tmpl.afterManip(this,b,j)};r.apply(this,f)}else r.apply(this,arguments);c=0;!e&&a.tmpl.complete(b);return this}});a.extend({tmpl:function(d,h,e,c){var j,k=!c;if(k){c=p;d=a.template[d]||a.template(null,d);f={}}else if(!d){d=c.tmpl;b[c.key]=c;c.nodes=[];c.wrapped&&n(c,c.wrapped);return a(i(c,null,c.tmpl(a,c)))}if(!d)return[];if(typeof h==="function")h=h.call(c||{});e&&e.wrapped&&n(e,e.wrapped);j=a.isArray(h)?a.map(h,function(a){return a?g(e,c,d,a):null}):[g(e,c,d,h)];return k?a(i(c,null,j)):j},tmplItem:function(b){var c;if(b instanceof a)b=b[0];while(b&&b.nodeType===1&&!(c=a.data(b,"tmplItem"))&&(b=b.parentNode));return c||p},template:function(c,b){if(b){if(typeof b==="string")b=o(b);else if(b instanceof a)b=b[0]||{};if(b.nodeType)b=a.data(b,"tmpl")||a.data(b,"tmpl",o(b.innerHTML));return typeof c==="string"?(a.template[c]=b):b}return c?typeof c!=="string"?a.template(null,c):a.template[c]||a.template(null,q.test(c)?c:a(c)):null},encode:function(a){return(""+a).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;")}});a.extend(a.tmpl,{tag:{tmpl:{_default:{$2:"null"},open:"if($notnull_1){_=_.concat($item.nest($1,$2));}"},wrap:{_default:{$2:"null"},open:"$item.calls(_,$1,$2);_=[];",close:"call=$item.calls();_=call._.concat($item.wrap(call,_));"},each:{_default:{$2:"$index, $value"},open:"if($notnull_1){$.each($1a,function($2){with(this){",close:"}});}"},"if":{open:"if(($notnull_1) && $1a){",close:"}"},"else":{_default:{$1:"true"},open:"}else if(($notnull_1) && $1a){"},html:{open:"if($notnull_1){_.push($1a);}"},"=":{_default:{$1:"$data"},open:"if($notnull_1){_.push($.encode($1a));}"},"!":{open:""}},complete:function(){b={}},afterManip:function(f,b,d){var e=b.nodeType===11?a.makeArray(b.childNodes):b.nodeType===1?[b]:[];d.call(f,b);m(e);c++}});function i(e,g,f){var b,c=f?a.map(f,function(a){return typeof a==="string"?e.key?a.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g,"$1 "+d+'="'+e.key+'" $2'):a:i(a,e,a._ctnt)}):e;if(g)return c;c=c.join("");c.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/,function(f,c,e,d){b=a(e).get();m(b);if(c)b=j(c).concat(b);if(d)b=b.concat(j(d))});return b?b:j(c)}function j(c){var b=document.createElement("div");b.innerHTML=c;return a.makeArray(b.childNodes)}function o(b){return new Function("jQuery","$item","var $=jQuery,call,_=[],$data=$item.data;with($data){_.push('"+a.trim(b).replace(/([\\'])/g,"\\$1").replace(/[\r\t\n]/g," ").replace(/\$\{([^\}]*)\}/g,"{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g,function(m,l,j,d,b,c,e){var i=a.tmpl.tag[j],h,f,g;h=i._default||[];if(c&&!/\w$/.test(b)){b+=c;c=""}if(b){b=k(b);e=e?","+k(e)+")":c?")":"";f=c?b.indexOf(".")>-1?b+c:"("+b+").call($item"+e:b;g=c?f:"(typeof("+b+")==='function'?("+b+").call($item):("+b+"))"}else g=f=h.$1||"null";d=k(d);return"');"+i[l?"close":"open"].split("$notnull_1").join(b?"typeof("+b+")!=='undefined' && ("+b+")!=null":"true").split("$1a").join(g).split("$1").join(f).split("$2").join(d?d.replace(/\s*([^\(]+)\s*(\((.*?)\))?/g,function(d,c,b,a){a=a?","+a+")":b?")":"";return a?"("+c+").call($item"+a:d}):h.$2||"")+"_.push('"})+"');}return _;")}function n(c,b){c._wrap=i(c,true,a.isArray(b)?b:[q.test(b)?b:a(b).html()]).join("")}function k(a){return a?a.replace(/\\'/g,"'").replace(/\\\\/g,"\\"):null}function s(b){var a=document.createElement("div");a.appendChild(b.cloneNode(true));return a.innerHTML}function m(o){var n="_"+c,k,j,l={},e,p,i;for(e=0,p=o.length;e<p;e++){if((k=o[e]).nodeType!==1)continue;j=k.getElementsByTagName("*");for(i=j.length-1;i>=0;i--)m(j[i]);m(k)}function m(j){var p,i=j,k,e,m;if(m=j.getAttribute(d)){while(i.parentNode&&(i=i.parentNode).nodeType===1&&!(p=i.getAttribute(d)));if(p!==m){i=i.parentNode?i.nodeType===11?0:i.getAttribute(d)||0:0;if(!(e=b[m])){e=f[m];e=g(e,b[i]||f[i],null,true);e.key=++h;b[h]=e}c&&o(m)}j.removeAttribute(d)}else if(c&&(e=a.data(j,"tmplItem"))){o(e.key);b[e.key]=e;i=a.data(j.parentNode,"tmplItem");i=i?i.key:0}if(e){k=e;while(k&&k.key!=i){k.nodes.push(j);k=k.parent}delete e._ctnt;delete e._wrap;a.data(j,"tmplItem",e)}function o(a){a=a+n;e=l[a]=l[a]||g(e,b[e.parent.key+n]||e.parent,null,true)}}}function u(a,d,c,b){if(!a)return l.pop();l.push({_:a,tmpl:d,item:this,data:c,options:b})}function w(d,c,b){return a.tmpl(a.template(d),c,b,this)}function x(b,d){var c=b.options||{};c.wrapped=d;return a.tmpl(a.template(b.tmpl),b.data,c,b.item)}function v(d,c){var b=this._wrap;return a.map(a(a.isArray(b)?b.join(""):b).filter(d||"*"),function(a){return c?a.innerText||a.textContent:a.outerHTML||s(a)})}function t(){var b=this.nodes;a.tmpl(null,null,null,this).insertBefore(b[0]);a(b).remove()}})(jQuery);


/*
    http://www.JSON.org/json2.js
    2010-08-25

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, strict: false */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (!this.JSON) {
    this.JSON = {};
}

(function () {

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf()) ?
                   this.getUTCFullYear()   + '-' +
                 f(this.getUTCMonth() + 1) + '-' +
                 f(this.getUTCDate())      + 'T' +
                 f(this.getUTCHours())     + ':' +
                 f(this.getUTCMinutes())   + ':' +
                 f(this.getUTCSeconds())   + 'Z' : null;
        };

        String.prototype.toJSON =
        Number.prototype.toJSON =
        Boolean.prototype.toJSON = function (key) {
            return this.valueOf();
        };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ?
            '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string' ? c :
                    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' :
            '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0 ? '[]' :
                    gap ? '[\n' + gap +
                            partial.join(',\n' + gap) + '\n' +
                                mind + ']' :
                          '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === 'string') {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0 ? '{}' :
                gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                        mind + '}' : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                     typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
.replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());


/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var pluses = /\+/g;

    function encode(s) {
        return config.raw ? s : encodeURIComponent(s);
    }

    function decode(s) {
        return config.raw ? s : decodeURIComponent(s);
    }

    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }

    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape...
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }

        try {
            // Replace server-side written pluses with spaces.
            // If we can't decode the cookie, ignore it, it's unusable.
            // If we can't parse the cookie, ignore it, it's unusable.
            s = decodeURIComponent(s.replace(pluses, ' '));
            return config.json ? JSON.parse(s) : s;
        } catch(e) {}
    }

    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    }

    var config = $.cookie = function (key, value, options) {

        // Write

        if (arguments.length > 1 && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setTime(+t + days * 864e+5);
            }

            return (document.cookie = [
                encode(key), '=', stringifyCookieValue(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // Read

        var result = key ? undefined : {};

        // To prevent the for loop in the first place assign an empty array
        // in case there are no cookies at all. Also prevents odd result when
        // calling $.cookie().
        var cookies = document.cookie ? document.cookie.split('; ') : [];

        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = parts.join('=');

            if (key && key === name) {
                // If second argument (value) is a function it's a converter...
                result = read(cookie, value);
                break;
            }

            // Prevent storing a cookie that we couldn't decode.
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }

        return result;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
        if ($.cookie(key) === undefined) {
            return false;
        }

        // Must not alter options, thus extending a fresh object...
        $.cookie(key, '', $.extend({}, options, { expires: -1 }));
        return !$.cookie(key);
    };

}));


/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 * 
 * Requires: 1.2.2+
 */

(function($) {

var types = ['DOMMouseScroll', 'mousewheel'];

if ($.event.fixHooks) {
    for ( var i=types.length; i; ) {
        $.event.fixHooks[ types[--i] ] = $.event.mouseHooks;
    }
}

$.event.special.mousewheel = {
    setup: function() {
        if ( this.addEventListener ) {
            for ( var i=types.length; i; ) {
                this.addEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = handler;
        }
    },
    
    teardown: function() {
        if ( this.removeEventListener ) {
            for ( var i=types.length; i; ) {
                this.removeEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = null;
        }
    }
};

$.fn.extend({
    mousewheel: function(fn) {
        return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
    },
    
    unmousewheel: function(fn) {
        return this.unbind("mousewheel", fn);
    }
});


function handler(event) {
    var orgEvent = event || window.event, args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
    event = $.event.fix(orgEvent);
    event.type = "mousewheel";
    
    // Old school scrollwheel delta
    if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta/120; }
    if ( orgEvent.detail     ) { delta = -orgEvent.detail/3; }
    
    // New school multidimensional scroll (touchpads) deltas
    deltaY = delta;
    
    // Gecko
    if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
        deltaY = 0;
        deltaX = -1*delta;
    }
    
    // Webkit
    if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY/120; }
    if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = -1*orgEvent.wheelDeltaX/120; }
    
    // Add event and delta to the front of the arguments
    args.unshift(event, delta, deltaX, deltaY);
    
    return ($.event.dispatch || $.event.handle).apply(this, args);
}

})(jQuery);


/*!
 * jScrollPane - v2.0.0beta11 - 2011-07-04
 * http://jscrollpane.kelvinluck.com/
 *
 * Copyright (c) 2010 Kelvin Luck
 * Dual licensed under the MIT and GPL licenses.
 */

// Script: jScrollPane - cross browser customisable scrollbars
//
// *Version: 2.0.0beta11, Last updated: 2011-07-04*
//
// Project Home - http://jscrollpane.kelvinluck.com/
// GitHub       - http://github.com/vitch/jScrollPane
// Source       - http://github.com/vitch/jScrollPane/raw/master/script/jquery.jscrollpane.js
// (Minified)   - http://github.com/vitch/jScrollPane/raw/master/script/jquery.jscrollpane.min.js
//
// About: License
//
// Copyright (c) 2011 Kelvin Luck
// Dual licensed under the MIT or GPL Version 2 licenses.
// http://jscrollpane.kelvinluck.com/MIT-LICENSE.txt
// http://jscrollpane.kelvinluck.com/GPL-LICENSE.txt
//
// About: Examples
//
// All examples and demos are available through the jScrollPane example site at:
// http://jscrollpane.kelvinluck.com/
//
// About: Support and Testing
//
// This plugin is tested on the browsers below and has been found to work reliably on them. If you run
// into a problem on one of the supported browsers then please visit the support section on the jScrollPane
// website (http://jscrollpane.kelvinluck.com/) for more information on getting support. You are also
// welcome to fork the project on GitHub if you can contribute a fix for a given issue. 
//
// jQuery Versions - tested in 1.4.2+ - reported to work in 1.3.x
// Browsers Tested - Firefox 3.6.8, Safari 5, Opera 10.6, Chrome 5.0, IE 6, 7, 8
//
// About: Release History
//
// 2.0.0beta11 - (in progress) 
// 2.0.0beta10 - (2011-04-17) cleaner required size calculation, improved keyboard support, stickToBottom/Left, other small fixes
// 2.0.0beta9 - (2011-01-31) new API methods, bug fixes and correct keyboard support for FF/OSX
// 2.0.0beta8 - (2011-01-29) touchscreen support, improved keyboard support
// 2.0.0beta7 - (2011-01-23) scroll speed consistent (thanks Aivo Paas)
// 2.0.0beta6 - (2010-12-07) scrollToElement horizontal support
// 2.0.0beta5 - (2010-10-18) jQuery 1.4.3 support, various bug fixes
// 2.0.0beta4 - (2010-09-17) clickOnTrack support, bug fixes
// 2.0.0beta3 - (2010-08-27) Horizontal mousewheel, mwheelIntent, keyboard support, bug fixes
// 2.0.0beta2 - (2010-08-21) Bug fixes
// 2.0.0beta1 - (2010-08-17) Rewrite to follow modern best practices and enable horizontal scrolling, initially hidden
//							 elements and dynamically sized elements.
// 1.x - (2006-12-31 - 2010-07-31) Initial version, hosted at googlecode, deprecated

(function($,window,undefined){

	$.fn.jScrollPane = function(settings)
	{
		// JScrollPane "class" - public methods are available through $('selector').data('jsp')
		function JScrollPane(elem, s)
		{
			var settings, jsp = this, pane, paneWidth, paneHeight, container, contentWidth, contentHeight,
				percentInViewH, percentInViewV, isScrollableV, isScrollableH, verticalDrag, dragMaxY,
				verticalDragPosition, horizontalDrag, dragMaxX, horizontalDragPosition,
				verticalBar, verticalTrack, scrollbarWidth, verticalTrackHeight, verticalDragHeight, arrowUp, arrowDown,
				horizontalBar, horizontalTrack, horizontalTrackWidth, horizontalDragWidth, arrowLeft, arrowRight,
				reinitialiseInterval, originalPadding, originalPaddingTotalWidth, previousContentWidth,
				wasAtTop = true, wasAtLeft = true, wasAtBottom = false, wasAtRight = false,
				originalElement = elem.clone(false, false).empty(),
				mwEvent = $.fn.mwheelIntent ? 'mwheelIntent.jsp' : 'mousewheel.jsp';

			originalPadding = elem.css('paddingTop') + ' ' +
								elem.css('paddingRight') + ' ' +
								elem.css('paddingBottom') + ' ' +
								elem.css('paddingLeft');
			originalPaddingTotalWidth = (parseInt(elem.css('paddingLeft'), 10) || 0) +
										(parseInt(elem.css('paddingRight'), 10) || 0);

			function initialise(s)
			{

				var /*firstChild, lastChild, */isMaintainingPositon, lastContentX, lastContentY,
						hasContainingSpaceChanged, originalScrollTop, originalScrollLeft,
						maintainAtBottom = false, maintainAtRight = false;

				settings = s;

				if (pane === undefined) {
					originalScrollTop = elem.scrollTop();
					originalScrollLeft = elem.scrollLeft();

					elem.css(
						{
							overflow: 'hidden',
							padding: 0
						}
					);
					// TODO: Deal with where width/ height is 0 as it probably means the element is hidden and we should
					// come back to it later and check once it is unhidden...
					paneWidth = elem.innerWidth() + originalPaddingTotalWidth;
					paneHeight = elem.innerHeight();

					elem.width(paneWidth);
					
					pane = $('<div class="jspPane" />').css('padding', originalPadding).append(elem.children());
					container = $('<div class="jspContainer" />')
						.css({
							'width': paneWidth + 'px',
							'height': paneHeight + 'px'
						}
					).append(pane).appendTo(elem);

					/*
					// Move any margins from the first and last children up to the container so they can still
					// collapse with neighbouring elements as they would before jScrollPane 
					firstChild = pane.find(':first-child');
					lastChild = pane.find(':last-child');
					elem.css(
						{
							'margin-top': firstChild.css('margin-top'),
							'margin-bottom': lastChild.css('margin-bottom')
						}
					);
					firstChild.css('margin-top', 0);
					lastChild.css('margin-bottom', 0);
					*/
				} else {
					elem.css('width', '');

					maintainAtBottom = settings.stickToBottom && isCloseToBottom();
					maintainAtRight  = settings.stickToRight  && isCloseToRight();

					hasContainingSpaceChanged = elem.innerWidth() + originalPaddingTotalWidth != paneWidth || elem.outerHeight() != paneHeight;

					if (hasContainingSpaceChanged) {
						paneWidth = elem.innerWidth() + originalPaddingTotalWidth;
						paneHeight = elem.innerHeight();
						container.css({
							width: paneWidth + 'px',
							height: paneHeight + 'px'
						});
					}

					// If nothing changed since last check...
					if (!hasContainingSpaceChanged && previousContentWidth == contentWidth && pane.outerHeight() == contentHeight) {
						elem.width(paneWidth);
						return;
					}
					previousContentWidth = contentWidth;
					
					pane.css('width', '');
					elem.width(paneWidth);

					container.find('>.jspVerticalBar,>.jspHorizontalBar').remove().end();
				}

				pane.css('overflow', 'auto');
				if (s.contentWidth) {
					contentWidth = s.contentWidth;
				} else {
					contentWidth = pane[0].scrollWidth;
				}
				contentHeight = pane[0].scrollHeight;
				pane.css('overflow', '');

				percentInViewH = contentWidth / paneWidth;
				percentInViewV = contentHeight / paneHeight;
				isScrollableV = percentInViewV > 1;

				isScrollableH = percentInViewH > 1;

				//console.log(paneWidth, paneHeight, contentWidth, contentHeight, percentInViewH, percentInViewV, isScrollableH, isScrollableV);

				if (!(isScrollableH || isScrollableV)) {
					elem.removeClass('jspScrollable');
					pane.css({
						top: 0,
						width: container.width() - originalPaddingTotalWidth
					});
					removeMousewheel();
					removeFocusHandler();
					removeKeyboardNav();
					removeClickOnTrack();
					unhijackInternalLinks();
				} else {
					elem.addClass('jspScrollable');

					isMaintainingPositon = settings.maintainPosition && (verticalDragPosition || horizontalDragPosition);
					if (isMaintainingPositon) {
						lastContentX = contentPositionX();
						lastContentY = contentPositionY();
					}

					initialiseVerticalScroll();
					initialiseHorizontalScroll();
					resizeScrollbars();

					if (isMaintainingPositon) {
						scrollToX(maintainAtRight  ? (contentWidth  - paneWidth ) : lastContentX, false);
						scrollToY(maintainAtBottom ? (contentHeight - paneHeight) : lastContentY, false);
					}

					initFocusHandler();
					initMousewheel();
					initTouch();
					
					if (settings.enableKeyboardNavigation) {
						initKeyboardNav();
					}
					if (settings.clickOnTrack) {
						initClickOnTrack();
					}
					
					observeHash();
					if (settings.hijackInternalLinks) {
						hijackInternalLinks();
					}
				}

				if (settings.autoReinitialise && !reinitialiseInterval) {
					reinitialiseInterval = setInterval(
						function()
						{
							initialise(settings);
						},
						settings.autoReinitialiseDelay
					);
				} else if (!settings.autoReinitialise && reinitialiseInterval) {
					clearInterval(reinitialiseInterval);
				}

				originalScrollTop && elem.scrollTop(0) && scrollToY(originalScrollTop, false);
				originalScrollLeft && elem.scrollLeft(0) && scrollToX(originalScrollLeft, false);

				elem.trigger('jsp-initialised', [isScrollableH || isScrollableV]);
			}

			function initialiseVerticalScroll()
			{
				if (isScrollableV) {

					container.append(
						$('<div class="jspVerticalBar" />').append(
							$('<div class="jspCap jspCapTop" />'),
							$('<div class="jspTrack" />').append(
								$('<div class="jspDrag" />').append(
									$('<div class="jspDragTop" />'),
									$('<div class="jspDragBottom" />')
								)
							),
							$('<div class="jspCap jspCapBottom" />')
						)
					);

					verticalBar = container.find('>.jspVerticalBar');
					verticalTrack = verticalBar.find('>.jspTrack');
					verticalDrag = verticalTrack.find('>.jspDrag');

					if (settings.showArrows) {
						arrowUp = $('<a class="jspArrow jspArrowUp" />').bind(
							'mousedown.jsp', getArrowScroll(0, -1)
						).bind('click.jsp', nil);
						arrowDown = $('<a class="jspArrow jspArrowDown" />').bind(
							'mousedown.jsp', getArrowScroll(0, 1)
						).bind('click.jsp', nil);
						if (settings.arrowScrollOnHover) {
							arrowUp.bind('mouseover.jsp', getArrowScroll(0, -1, arrowUp));
							arrowDown.bind('mouseover.jsp', getArrowScroll(0, 1, arrowDown));
						}

						appendArrows(verticalTrack, settings.verticalArrowPositions, arrowUp, arrowDown);
					}

					verticalTrackHeight = paneHeight;
					container.find('>.jspVerticalBar>.jspCap:visible,>.jspVerticalBar>.jspArrow').each(
						function()
						{
							verticalTrackHeight -= $(this).outerHeight();
						}
					);


					verticalDrag.hover(
						function()
						{
							verticalDrag.addClass('jspHover');
						},
						function()
						{
							verticalDrag.removeClass('jspHover');
						}
					).bind(
						'mousedown.jsp',
						function(e)
						{
							// Stop IE from allowing text selection
							$('html').bind('dragstart.jsp selectstart.jsp', nil);

							verticalDrag.addClass('jspActive');

							var startY = e.pageY - verticalDrag.position().top;

							$('html').bind(
								'mousemove.jsp',
								function(e)
								{
									positionDragY(e.pageY - startY, false);
								}
							).bind('mouseup.jsp mouseleave.jsp', cancelDrag);
							return false;
						}
					);
					sizeVerticalScrollbar();
				}
			}

			function sizeVerticalScrollbar()
			{
				verticalTrack.height(verticalTrackHeight + 'px');
				verticalDragPosition = 0;
				scrollbarWidth = settings.verticalGutter + verticalTrack.outerWidth();

				// Make the pane thinner to allow for the vertical scrollbar
				pane.width(paneWidth - scrollbarWidth - originalPaddingTotalWidth);

				// Add margin to the left of the pane if scrollbars are on that side (to position
				// the scrollbar on the left or right set it's left or right property in CSS)
				try {
					if (verticalBar.position().left === 0) {
						pane.css('margin-left', scrollbarWidth + 'px');
					}
				} catch (err) {
				}
			}

			function initialiseHorizontalScroll()
			{
				if (isScrollableH) {

					container.append(
						$('<div class="jspHorizontalBar" />').append(
							$('<div class="jspCap jspCapLeft" />'),
							$('<div class="jspTrack" />').append(
								$('<div class="jspDrag" />').append(
									$('<div class="jspDragLeft" />'),
									$('<div class="jspDragRight" />')
								)
							),
							$('<div class="jspCap jspCapRight" />')
						)
					);

					horizontalBar = container.find('>.jspHorizontalBar');
					horizontalTrack = horizontalBar.find('>.jspTrack');
					horizontalDrag = horizontalTrack.find('>.jspDrag');

					if (settings.showArrows) {
						arrowLeft = $('<a class="jspArrow jspArrowLeft" />').bind(
							'mousedown.jsp', getArrowScroll(-1, 0)
						).bind('click.jsp', nil);
						arrowRight = $('<a class="jspArrow jspArrowRight" />').bind(
							'mousedown.jsp', getArrowScroll(1, 0)
						).bind('click.jsp', nil);
						if (settings.arrowScrollOnHover) {
							arrowLeft.bind('mouseover.jsp', getArrowScroll(-1, 0, arrowLeft));
							arrowRight.bind('mouseover.jsp', getArrowScroll(1, 0, arrowRight));
						}
						appendArrows(horizontalTrack, settings.horizontalArrowPositions, arrowLeft, arrowRight);
					}

					horizontalDrag.hover(
						function()
						{
							horizontalDrag.addClass('jspHover');
						},
						function()
						{
							horizontalDrag.removeClass('jspHover');
						}
					).bind(
						'mousedown.jsp',
						function(e)
						{
							// Stop IE from allowing text selection
							$('html').bind('dragstart.jsp selectstart.jsp', nil);

							horizontalDrag.addClass('jspActive');

							var startX = e.pageX - horizontalDrag.position().left;

							$('html').bind(
								'mousemove.jsp',
								function(e)
								{
									positionDragX(e.pageX - startX, false);
								}
							).bind('mouseup.jsp mouseleave.jsp', cancelDrag);
							return false;
						}
					);
					horizontalTrackWidth = container.innerWidth();
					sizeHorizontalScrollbar();
				}
			}

			function sizeHorizontalScrollbar()
			{
				container.find('>.jspHorizontalBar>.jspCap:visible,>.jspHorizontalBar>.jspArrow').each(
					function()
					{
						horizontalTrackWidth -= $(this).outerWidth();
					}
				);

				horizontalTrack.width(horizontalTrackWidth + 'px');
				horizontalDragPosition = 0;
			}

			function resizeScrollbars()
			{
				if (isScrollableH && isScrollableV) {
					var horizontalTrackHeight = horizontalTrack.outerHeight(),
						verticalTrackWidth = verticalTrack.outerWidth();
					verticalTrackHeight -= horizontalTrackHeight;
					$(horizontalBar).find('>.jspCap:visible,>.jspArrow').each(
						function()
						{
							horizontalTrackWidth += $(this).outerWidth();
						}
					);
					horizontalTrackWidth -= verticalTrackWidth;
					paneHeight -= verticalTrackWidth;
					paneWidth -= horizontalTrackHeight;
					horizontalTrack.parent().append(
						$('<div class="jspCorner" />').css('width', horizontalTrackHeight + 'px')
					);
					sizeVerticalScrollbar();
					sizeHorizontalScrollbar();
				}
				// reflow content
				if (isScrollableH) {
					pane.width((container.outerWidth() - originalPaddingTotalWidth) + 'px');
				}
				contentHeight = pane.outerHeight();
				percentInViewV = contentHeight / paneHeight;

				if (isScrollableH) {
					horizontalDragWidth = Math.ceil(1 / percentInViewH * horizontalTrackWidth);
					if (horizontalDragWidth > settings.horizontalDragMaxWidth) {
						horizontalDragWidth = settings.horizontalDragMaxWidth;
					} else if (horizontalDragWidth < settings.horizontalDragMinWidth) {
						horizontalDragWidth = settings.horizontalDragMinWidth;
					}
					horizontalDrag.width(horizontalDragWidth + 'px');
					dragMaxX = horizontalTrackWidth - horizontalDragWidth;
					_positionDragX(horizontalDragPosition); // To update the state for the arrow buttons
				}
				if (isScrollableV) {
					verticalDragHeight = Math.ceil(1 / percentInViewV * verticalTrackHeight);
					if (verticalDragHeight > settings.verticalDragMaxHeight) {
						verticalDragHeight = settings.verticalDragMaxHeight;
					} else if (verticalDragHeight < settings.verticalDragMinHeight) {
						verticalDragHeight = settings.verticalDragMinHeight;
					}
					verticalDrag.height(verticalDragHeight + 'px');
					dragMaxY = verticalTrackHeight - verticalDragHeight;
					_positionDragY(verticalDragPosition); // To update the state for the arrow buttons
				}
			}

			function appendArrows(ele, p, a1, a2)
			{
				var p1 = "before", p2 = "after", aTemp;
				
				// Sniff for mac... Is there a better way to determine whether the arrows would naturally appear
				// at the top or the bottom of the bar?
				if (p == "os") {
					p = /Mac/.test(navigator.platform) ? "after" : "split";
				}
				if (p == p1) {
					p2 = p;
				} else if (p == p2) {
					p1 = p;
					aTemp = a1;
					a1 = a2;
					a2 = aTemp;
				}

				ele[p1](a1)[p2](a2);
			}

			function getArrowScroll(dirX, dirY, ele)
			{
				return function()
				{
					arrowScroll(dirX, dirY, this, ele);
					this.blur();
					return false;
				};
			}

			function arrowScroll(dirX, dirY, arrow, ele)
			{
				arrow = $(arrow).addClass('jspActive');

				var eve,
					scrollTimeout,
					isFirst = true,
					doScroll = function()
					{
						if (dirX !== 0) {
							jsp.scrollByX(dirX * settings.arrowButtonSpeed);
						}
						if (dirY !== 0) {
							jsp.scrollByY(dirY * settings.arrowButtonSpeed);
						}
						scrollTimeout = setTimeout(doScroll, isFirst ? settings.initialDelay : settings.arrowRepeatFreq);
						isFirst = false;
					};

				doScroll();

				eve = ele ? 'mouseout.jsp' : 'mouseup.jsp';
				ele = ele || $('html');
				ele.bind(
					eve,
					function()
					{
						arrow.removeClass('jspActive');
						scrollTimeout && clearTimeout(scrollTimeout);
						scrollTimeout = null;
						ele.unbind(eve);
					}
				);
			}

			function initClickOnTrack()
			{
				removeClickOnTrack();
				if (isScrollableV) {
					verticalTrack.bind(
						'mousedown.jsp',
						function(e)
						{
							if (e.originalTarget === undefined || e.originalTarget == e.currentTarget) {
								var clickedTrack = $(this),
									offset = clickedTrack.offset(),
									direction = e.pageY - offset.top - verticalDragPosition,
									scrollTimeout,
									isFirst = true,
									doScroll = function()
									{
										var offset = clickedTrack.offset(),
											pos = e.pageY - offset.top - verticalDragHeight / 2,
											contentDragY = paneHeight * settings.scrollPagePercent,
											dragY = dragMaxY * contentDragY / (contentHeight - paneHeight);
										if (direction < 0) {
											if (verticalDragPosition - dragY > pos) {
												jsp.scrollByY(-contentDragY);
											} else {
												positionDragY(pos);
											}
										} else if (direction > 0) {
											if (verticalDragPosition + dragY < pos) {
												jsp.scrollByY(contentDragY);
											} else {
												positionDragY(pos);
											}
										} else {
											cancelClick();
											return;
										}
										scrollTimeout = setTimeout(doScroll, isFirst ? settings.initialDelay : settings.trackClickRepeatFreq);
										isFirst = false;
									},
									cancelClick = function()
									{
										scrollTimeout && clearTimeout(scrollTimeout);
										scrollTimeout = null;
										$(document).unbind('mouseup.jsp', cancelClick);
									};
								doScroll();
								$(document).bind('mouseup.jsp', cancelClick);
								return false;
							}
						}
					);
				}
				
				if (isScrollableH) {
					horizontalTrack.bind(
						'mousedown.jsp',
						function(e)
						{
							if (e.originalTarget === undefined || e.originalTarget == e.currentTarget) {
								var clickedTrack = $(this),
									offset = clickedTrack.offset(),
									direction = e.pageX - offset.left - horizontalDragPosition,
									scrollTimeout,
									isFirst = true,
									doScroll = function()
									{
										var offset = clickedTrack.offset(),
											pos = e.pageX - offset.left - horizontalDragWidth / 2,
											contentDragX = paneWidth * settings.scrollPagePercent,
											dragX = dragMaxX * contentDragX / (contentWidth - paneWidth);
										if (direction < 0) {
											if (horizontalDragPosition - dragX > pos) {
												jsp.scrollByX(-contentDragX);
											} else {
												positionDragX(pos);
											}
										} else if (direction > 0) {
											if (horizontalDragPosition + dragX < pos) {
												jsp.scrollByX(contentDragX);
											} else {
												positionDragX(pos);
											}
										} else {
											cancelClick();
											return;
										}
										scrollTimeout = setTimeout(doScroll, isFirst ? settings.initialDelay : settings.trackClickRepeatFreq);
										isFirst = false;
									},
									cancelClick = function()
									{
										scrollTimeout && clearTimeout(scrollTimeout);
										scrollTimeout = null;
										$(document).unbind('mouseup.jsp', cancelClick);
									};
								doScroll();
								$(document).bind('mouseup.jsp', cancelClick);
								return false;
							}
						}
					);
				}
			}

			function removeClickOnTrack()
			{
				if (horizontalTrack) {
					horizontalTrack.unbind('mousedown.jsp');
				}
				if (verticalTrack) {
					verticalTrack.unbind('mousedown.jsp');
				}
			}

			function cancelDrag()
			{
				$('html').unbind('dragstart.jsp selectstart.jsp mousemove.jsp mouseup.jsp mouseleave.jsp');

				if (verticalDrag) {
					verticalDrag.removeClass('jspActive');
				}
				if (horizontalDrag) {
					horizontalDrag.removeClass('jspActive');
				}
			}

			function positionDragY(destY, animate)
			{
				if (!isScrollableV) {
					return;
				}
				if (destY < 0) {
					destY = 0;
				} else if (destY > dragMaxY) {
					destY = dragMaxY;
				}

				// can't just check if(animate) because false is a valid value that could be passed in...
				if (animate === undefined) {
					animate = settings.animateScroll;
				}
				if (animate) {
					jsp.animate(verticalDrag, 'top', destY,	_positionDragY);
				} else {
					verticalDrag.css('top', destY);
					_positionDragY(destY);
				}

			}

			function _positionDragY(destY)
			{
				if (destY === undefined) {
					destY = verticalDrag.position().top;
				}

				container.scrollTop(0);
				verticalDragPosition = destY;

				var isAtTop = verticalDragPosition === 0,
					isAtBottom = verticalDragPosition == dragMaxY,
					percentScrolled = destY/ dragMaxY,
					destTop = -percentScrolled * (contentHeight - paneHeight);

				if (wasAtTop != isAtTop || wasAtBottom != isAtBottom) {
					wasAtTop = isAtTop;
					wasAtBottom = isAtBottom;
					elem.trigger('jsp-arrow-change', [wasAtTop, wasAtBottom, wasAtLeft, wasAtRight]);
				}
				
				updateVerticalArrows(isAtTop, isAtBottom);
				pane.css('top', destTop);
				elem.trigger('jsp-scroll-y', [-destTop, isAtTop, isAtBottom]).trigger('scroll');
			}

			function positionDragX(destX, animate)
			{
				if (!isScrollableH) {
					return;
				}
				if (destX < 0) {
					destX = 0;
				} else if (destX > dragMaxX) {
					destX = dragMaxX;
				}

				if (animate === undefined) {
					animate = settings.animateScroll;
				}
				if (animate) {
					jsp.animate(horizontalDrag, 'left', destX,	_positionDragX);
				} else {
					horizontalDrag.css('left', destX);
					_positionDragX(destX);
				}
			}

			function _positionDragX(destX)
			{
				if (destX === undefined) {
					destX = horizontalDrag.position().left;
				}

				container.scrollTop(0);
				horizontalDragPosition = destX;

				var isAtLeft = horizontalDragPosition === 0,
					isAtRight = horizontalDragPosition == dragMaxX,
					percentScrolled = destX / dragMaxX,
					destLeft = -percentScrolled * (contentWidth - paneWidth);

				if (wasAtLeft != isAtLeft || wasAtRight != isAtRight) {
					wasAtLeft = isAtLeft;
					wasAtRight = isAtRight;
					elem.trigger('jsp-arrow-change', [wasAtTop, wasAtBottom, wasAtLeft, wasAtRight]);
				}
				
				updateHorizontalArrows(isAtLeft, isAtRight);
				pane.css('left', destLeft);
				elem.trigger('jsp-scroll-x', [-destLeft, isAtLeft, isAtRight]).trigger('scroll');
			}

			function updateVerticalArrows(isAtTop, isAtBottom)
			{
				if (settings.showArrows) {
					arrowUp[isAtTop ? 'addClass' : 'removeClass']('jspDisabled');
					arrowDown[isAtBottom ? 'addClass' : 'removeClass']('jspDisabled');
				}
			}

			function updateHorizontalArrows(isAtLeft, isAtRight)
			{
				if (settings.showArrows) {
					arrowLeft[isAtLeft ? 'addClass' : 'removeClass']('jspDisabled');
					arrowRight[isAtRight ? 'addClass' : 'removeClass']('jspDisabled');
				}
			}

			function scrollToY(destY, animate)
			{
				var percentScrolled = destY / (contentHeight - paneHeight);
				positionDragY(percentScrolled * dragMaxY, animate);
			}

			function scrollToX(destX, animate)
			{
				var percentScrolled = destX / (contentWidth - paneWidth);
				positionDragX(percentScrolled * dragMaxX, animate);
			}

			function scrollToElement(ele, stickToTop, animate)
			{
				var e, eleHeight, eleWidth, eleTop = 0, eleLeft = 0, viewportTop, viewportLeft, maxVisibleEleTop, maxVisibleEleLeft, destY, destX;

				// Legal hash values aren't necessarily legal jQuery selectors so we need to catch any
				// errors from the lookup...
				try {
					e = $(ele);
				} catch (err) {
					return;
				}
				eleHeight = e.outerHeight();
				eleWidth= e.outerWidth();

				container.scrollTop(0);
				container.scrollLeft(0);
				
				// loop through parents adding the offset top of any elements that are relatively positioned between
				// the focused element and the jspPane so we can get the true distance from the top
				// of the focused element to the top of the scrollpane...
				while (!e.is('.jspPane')) {
					eleTop += e.position().top;
					eleLeft += e.position().left;
					e = e.offsetParent();
					if (/^body|html$/i.test(e[0].nodeName)) {
						// we ended up too high in the document structure. Quit!
						return;
					}
				}

				viewportTop = contentPositionY();
				maxVisibleEleTop = viewportTop + paneHeight;
				if (eleTop < viewportTop || stickToTop) { // element is above viewport
					destY = eleTop - settings.verticalGutter;
				} else if (eleTop + eleHeight > maxVisibleEleTop) { // element is below viewport
					destY = eleTop - paneHeight + eleHeight + settings.verticalGutter;
				}
				if (destY) {
					scrollToY(destY, animate);
				}
				
				viewportLeft = contentPositionX();
	            maxVisibleEleLeft = viewportLeft + paneWidth;
	            if (eleLeft < viewportLeft || stickToTop) { // element is to the left of viewport
	                destX = eleLeft - settings.horizontalGutter;
	            } else if (eleLeft + eleWidth > maxVisibleEleLeft) { // element is to the right viewport
	                destX = eleLeft - paneWidth + eleWidth + settings.horizontalGutter;
	            }
	            if (destX) {
	                scrollToX(destX, animate);
	            }

			}

			function contentPositionX()
			{
				return -pane.position().left;
			}

			function contentPositionY()
			{
				return -pane.position().top;
			}

			function isCloseToBottom()
			{
				var scrollableHeight = contentHeight - paneHeight;
				return (scrollableHeight > 20) && (scrollableHeight - contentPositionY() < 10);
			}

			function isCloseToRight()
			{
				var scrollableWidth = contentWidth - paneWidth;
				return (scrollableWidth > 20) && (scrollableWidth - contentPositionX() < 10);
			}

			function initMousewheel()
			{
				container.unbind(mwEvent).bind(
					mwEvent,
					function (event, delta, deltaX, deltaY) {
						var dX = horizontalDragPosition, dY = verticalDragPosition;
						jsp.scrollBy(deltaX * settings.mouseWheelSpeed, -deltaY * settings.mouseWheelSpeed, false);
						// return true if there was no movement so rest of screen can scroll
						return dX == horizontalDragPosition && dY == verticalDragPosition;
					}
				);
			}

			function removeMousewheel()
			{
				container.unbind(mwEvent);
			}

			function nil()
			{
				return false;
			}

			function initFocusHandler()
			{
				pane.find(':input,a').unbind('focus.jsp').bind(
					'focus.jsp',
					function(e)
					{
						scrollToElement(e.target, false);
					}
				);
			}

			function removeFocusHandler()
			{
				pane.find(':input,a').unbind('focus.jsp');
			}
			
			function initKeyboardNav()
			{
				var keyDown, elementHasScrolled, validParents = [];
				isScrollableH && validParents.push(horizontalBar[0]);
				isScrollableV && validParents.push(verticalBar[0]);
				
				// IE also focuses elements that don't have tabindex set.
				pane.focus(
					function()
					{
						elem.focus();
					}
				);
				
				elem.attr('tabindex', 0)
					.unbind('keydown.jsp keypress.jsp')
					.bind(
						'keydown.jsp',
						function(e)
						{
							if (e.target !== this && !(validParents.length && $(e.target).closest(validParents).length)){
								return;
							}
							var dX = horizontalDragPosition, dY = verticalDragPosition;
							switch(e.keyCode) {
								case 40: // down
								case 38: // up
								case 34: // page down
								case 32: // space
								case 33: // page up
								case 39: // right
								case 37: // left
									keyDown = e.keyCode;
									keyDownHandler();
									break;
								case 35: // end
									scrollToY(contentHeight - paneHeight);
									keyDown = null;
									break;
								case 36: // home
									scrollToY(0);
									keyDown = null;
									break;
							}

							elementHasScrolled = e.keyCode == keyDown && dX != horizontalDragPosition || dY != verticalDragPosition;
							return !elementHasScrolled;
						}
					).bind(
						'keypress.jsp', // For FF/ OSX so that we can cancel the repeat key presses if the JSP scrolls...
						function(e)
						{
							if (e.keyCode == keyDown) {
								keyDownHandler();
							}
							return !elementHasScrolled;
						}
					);
				
				if (settings.hideFocus) {
					elem.css('outline', 'none');
					if ('hideFocus' in container[0]){
						elem.attr('hideFocus', true);
					}
				} else {
					elem.css('outline', '');
					if ('hideFocus' in container[0]){
						elem.attr('hideFocus', false);
					}
				}
				
				function keyDownHandler()
				{
					var dX = horizontalDragPosition, dY = verticalDragPosition;
					switch(keyDown) {
						case 40: // down
							jsp.scrollByY(settings.keyboardSpeed, false);
							break;
						case 38: // up
							jsp.scrollByY(-settings.keyboardSpeed, false);
							break;
						case 34: // page down
						case 32: // space
							jsp.scrollByY(paneHeight * settings.scrollPagePercent, false);
							break;
						case 33: // page up
							jsp.scrollByY(-paneHeight * settings.scrollPagePercent, false);
							break;
						case 39: // right
							jsp.scrollByX(settings.keyboardSpeed, false);
							break;
						case 37: // left
							jsp.scrollByX(-settings.keyboardSpeed, false);
							break;
					}

					elementHasScrolled = dX != horizontalDragPosition || dY != verticalDragPosition;
					return elementHasScrolled;
				}
			}
			
			function removeKeyboardNav()
			{
				elem.attr('tabindex', '-1')
					.removeAttr('tabindex')
					.unbind('keydown.jsp keypress.jsp');
			}

			function observeHash()
			{
				if (location.hash && location.hash.length > 1) {
					var e,
						retryInt,
						hash = escape(location.hash) // hash must be escaped to prevent XSS
						;
					try {
						e = $(hash);
					} catch (err) {
						return;
					}

					if (e.length && pane.find(hash)) {
						// nasty workaround but it appears to take a little while before the hash has done its thing
						// to the rendered page so we just wait until the container's scrollTop has been messed up.
						if (container.scrollTop() === 0) {
							retryInt = setInterval(
								function()
								{
									if (container.scrollTop() > 0) {
										scrollToElement(hash, true);
										$(document).scrollTop(container.position().top);
										clearInterval(retryInt);
									}
								},
								50
							);
						} else {
							scrollToElement(hash, true);
							$(document).scrollTop(container.position().top);
						}
					}
				}
			}

			function unhijackInternalLinks()
			{
				$('a.jspHijack').unbind('click.jsp-hijack').removeClass('jspHijack');
			}

			function hijackInternalLinks()
			{
				unhijackInternalLinks();
				$('a[href^=#]').addClass('jspHijack').bind(
					'click.jsp-hijack',
					function()
					{
						var uriParts = this.href.split('#'), hash;
						if (uriParts.length > 1) {
							hash = uriParts[1];
							if (hash.length > 0 && pane.find('#' + hash).length > 0) {
								scrollToElement('#' + hash, true);
								// Need to return false otherwise things mess up... Would be nice to maybe also scroll
								// the window to the top of the scrollpane?
								return false;
							}
						}
					}
				);
			}
			
			// Init touch on iPad, iPhone, iPod, Android
			function initTouch()
			{
				var startX,
					startY,
					touchStartX,
					touchStartY,
					moved,
					moving = false;
  
				container.unbind('touchstart.jsp touchmove.jsp touchend.jsp click.jsp-touchclick').bind(
					'touchstart.jsp',
					function(e)
					{
						var touch = e.originalEvent.touches[0];
						startX = contentPositionX();
						startY = contentPositionY();
						touchStartX = touch.pageX;
						touchStartY = touch.pageY;
						moved = false;
						moving = true;
					}
				).bind(
					'touchmove.jsp',
					function(ev)
					{
						if(!moving) {
							return;
						}
						
						var touchPos = ev.originalEvent.touches[0],
							dX = horizontalDragPosition, dY = verticalDragPosition;
						
						jsp.scrollTo(startX + touchStartX - touchPos.pageX, startY + touchStartY - touchPos.pageY);
						
						moved = moved || Math.abs(touchStartX - touchPos.pageX) > 5 || Math.abs(touchStartY - touchPos.pageY) > 5;
						
						// return true if there was no movement so rest of screen can scroll
						return dX == horizontalDragPosition && dY == verticalDragPosition;
					}
				).bind(
					'touchend.jsp',
					function(e)
					{
						moving = false;
						/*if(moved) {
							return false;
						}*/
					}
				).bind(
					'click.jsp-touchclick',
					function(e)
					{
						if(moved) {
							moved = false;
							return false;
						}
					}
				);
			}
			
			function destroy(){
				var currentY = contentPositionY(),
					currentX = contentPositionX();
				elem.removeClass('jspScrollable').unbind('.jsp');
				elem.replaceWith(originalElement.append(pane.children()));
				originalElement.scrollTop(currentY);
				originalElement.scrollLeft(currentX);
			}

			// Public API
			$.extend(
				jsp,
				{
					// Reinitialises the scroll pane (if it's internal dimensions have changed since the last time it
					// was initialised). The settings object which is passed in will override any settings from the
					// previous time it was initialised - if you don't pass any settings then the ones from the previous
					// initialisation will be used.
					reinitialise: function(s)
					{
						s = $.extend({}, settings, s);
						initialise(s);
					},
					// Scrolls the specified element (a jQuery object, DOM node or jQuery selector string) into view so
					// that it can be seen within the viewport. If stickToTop is true then the element will appear at
					// the top of the viewport, if it is false then the viewport will scroll as little as possible to
					// show the element. You can also specify if you want animation to occur. If you don't provide this
					// argument then the animateScroll value from the settings object is used instead.
					scrollToElement: function(ele, stickToTop, animate)
					{
						scrollToElement(ele, stickToTop, animate);
					},
					// Scrolls the pane so that the specified co-ordinates within the content are at the top left
					// of the viewport. animate is optional and if not passed then the value of animateScroll from
					// the settings object this jScrollPane was initialised with is used.
					scrollTo: function(destX, destY, animate)
					{
						scrollToX(destX, animate);
						scrollToY(destY, animate);
					},
					// Scrolls the pane so that the specified co-ordinate within the content is at the left of the
					// viewport. animate is optional and if not passed then the value of animateScroll from the settings
					// object this jScrollPane was initialised with is used.
					scrollToX: function(destX, animate)
					{
						scrollToX(destX, animate);
					},
					// Scrolls the pane so that the specified co-ordinate within the content is at the top of the
					// viewport. animate is optional and if not passed then the value of animateScroll from the settings
					// object this jScrollPane was initialised with is used.
					scrollToY: function(destY, animate)
					{
						scrollToY(destY, animate);
					},
					// Scrolls the pane to the specified percentage of its maximum horizontal scroll position. animate
					// is optional and if not passed then the value of animateScroll from the settings object this
					// jScrollPane was initialised with is used.
					scrollToPercentX: function(destPercentX, animate)
					{
						scrollToX(destPercentX * (contentWidth - paneWidth), animate);
					},
					// Scrolls the pane to the specified percentage of its maximum vertical scroll position. animate
					// is optional and if not passed then the value of animateScroll from the settings object this
					// jScrollPane was initialised with is used.
					scrollToPercentY: function(destPercentY, animate)
					{
						scrollToY(destPercentY * (contentHeight - paneHeight), animate);
					},
					// Scrolls the pane by the specified amount of pixels. animate is optional and if not passed then
					// the value of animateScroll from the settings object this jScrollPane was initialised with is used.
					scrollBy: function(deltaX, deltaY, animate)
					{
						jsp.scrollByX(deltaX, animate);
						jsp.scrollByY(deltaY, animate);
					},
					// Scrolls the pane by the specified amount of pixels. animate is optional and if not passed then
					// the value of animateScroll from the settings object this jScrollPane was initialised with is used.
					scrollByX: function(deltaX, animate)
					{
						var destX = contentPositionX() + Math[deltaX<0 ? 'floor' : 'ceil'](deltaX),
							percentScrolled = destX / (contentWidth - paneWidth);
						positionDragX(percentScrolled * dragMaxX, animate);
					},
					// Scrolls the pane by the specified amount of pixels. animate is optional and if not passed then
					// the value of animateScroll from the settings object this jScrollPane was initialised with is used.
					scrollByY: function(deltaY, animate)
					{
						var destY = contentPositionY() + Math[deltaY<0 ? 'floor' : 'ceil'](deltaY),
							percentScrolled = destY / (contentHeight - paneHeight);
						positionDragY(percentScrolled * dragMaxY, animate);
					},
					// Positions the horizontal drag at the specified x position (and updates the viewport to reflect
					// this). animate is optional and if not passed then the value of animateScroll from the settings
					// object this jScrollPane was initialised with is used.
					positionDragX: function(x, animate)
					{
						positionDragX(x, animate);
					},
					// Positions the vertical drag at the specified y position (and updates the viewport to reflect
					// this). animate is optional and if not passed then the value of animateScroll from the settings
					// object this jScrollPane was initialised with is used.
					positionDragY: function(y, animate)
					{
						positionDragY(y, animate);
					},
					// This method is called when jScrollPane is trying to animate to a new position. You can override
					// it if you want to provide advanced animation functionality. It is passed the following arguments:
					//  * ele          - the element whose position is being animated
					//  * prop         - the property that is being animated
					//  * value        - the value it's being animated to
					//  * stepCallback - a function that you must execute each time you update the value of the property
					// You can use the default implementation (below) as a starting point for your own implementation.
					animate: function(ele, prop, value, stepCallback)
					{
						var params = {};
						params[prop] = value;
						ele.animate(
							params,
							{
								'duration'	: settings.animateDuration,
								'easing'	: settings.animateEase,
								'queue'		: false,
								'step'		: stepCallback
							}
						);
					},
					// Returns the current x position of the viewport with regards to the content pane.
					getContentPositionX: function()
					{
						return contentPositionX();
					},
					// Returns the current y position of the viewport with regards to the content pane.
					getContentPositionY: function()
					{
						return contentPositionY();
					},
					// Returns the width of the content within the scroll pane.
					getContentWidth: function()
					{
						return contentWidth;
					},
					// Returns the height of the content within the scroll pane.
					getContentHeight: function()
					{
						return contentHeight;
					},
					// Returns the horizontal position of the viewport within the pane content.
					getPercentScrolledX: function()
					{
						return contentPositionX() / (contentWidth - paneWidth);
					},
					// Returns the vertical position of the viewport within the pane content.
					getPercentScrolledY: function()
					{
						return contentPositionY() / (contentHeight - paneHeight);
					},
					// Returns whether or not this scrollpane has a horizontal scrollbar.
					getIsScrollableH: function()
					{
						return isScrollableH;
					},
					// Returns whether or not this scrollpane has a vertical scrollbar.
					getIsScrollableV: function()
					{
						return isScrollableV;
					},
					// Gets a reference to the content pane. It is important that you use this method if you want to
					// edit the content of your jScrollPane as if you access the element directly then you may have some
					// problems (as your original element has had additional elements for the scrollbars etc added into
					// it).
					getContentPane: function()
					{
						return pane;
					},
					// Scrolls this jScrollPane down as far as it can currently scroll. If animate isn't passed then the
					// animateScroll value from settings is used instead.
					scrollToBottom: function(animate)
					{
						positionDragY(dragMaxY, animate);
					},
					// Hijacks the links on the page which link to content inside the scrollpane. If you have changed
					// the content of your page (e.g. via AJAX) and want to make sure any new anchor links to the
					// contents of your scroll pane will work then call this function.
					hijackInternalLinks: function()
					{
						hijackInternalLinks();
					},
					// Removes the jScrollPane and returns the page to the state it was in before jScrollPane was
					// initialised.
					destroy: function()
					{
							destroy();
					}
				}
			);
			
			initialise(s);
		}

		// Pluginifying code...
		settings = $.extend({}, $.fn.jScrollPane.defaults, settings);
		
		// Apply default speed
		$.each(['mouseWheelSpeed', 'arrowButtonSpeed', 'trackClickSpeed', 'keyboardSpeed'], function() {
			settings[this] = settings[this] || settings.speed;
		});

		return this.each(
			function()
			{
				var elem = $(this), jspApi = elem.data('jsp');
				if (jspApi) {
					jspApi.reinitialise(settings);
				} else {
					jspApi = new JScrollPane(elem, settings);
					elem.data('jsp', jspApi);
				}
			}
		);
	};

	$.fn.jScrollPane.defaults = {
		showArrows					: false,
		maintainPosition			: true,
		stickToBottom				: false,
		stickToRight				: false,
		clickOnTrack				: true,
		autoReinitialise			: false,
		autoReinitialiseDelay		: 500,
		verticalDragMinHeight		: 0,
		verticalDragMaxHeight		: 99999,
		horizontalDragMinWidth		: 0,
		horizontalDragMaxWidth		: 99999,
		contentWidth				: undefined,
		animateScroll				: false,
		animateDuration				: 300,
		animateEase					: 'linear',
		hijackInternalLinks			: false,
		verticalGutter				: 4,
		horizontalGutter			: 4,
		mouseWheelSpeed				: 0,
		arrowButtonSpeed			: 0,
		arrowRepeatFreq				: 50,
		arrowScrollOnHover			: false,
		trackClickSpeed				: 0,
		trackClickRepeatFreq		: 70,
		verticalArrowPositions		: 'split',
		horizontalArrowPositions	: 'split',
		enableKeyboardNavigation	: true,
		hideFocus					: false,
		keyboardSpeed				: 0,
		initialDelay                : 300,        // Delay before starting repeating
		speed						: 30,		// Default speed when others falsey
		scrollPagePercent			: .8		// Percent of visible area scrolled when pageUp/Down or track area pressed
	};

})(jQuery,this);



//     uuid.js
//

(function() {
  var _global = this;

  // Unique ID creation requires a high quality random # generator.  We feature
  // detect to determine the best RNG source, normalizing to a function that
  // returns 128-bits of randomness, since that's what's usually required
  var _rng;

  // Node.js crypto-based RNG - http://nodejs.org/docs/v0.6.2/api/crypto.html
  //
  // Moderately fast, high quality
  if (typeof(require) == 'function') {
    try {
      var _rb = require('crypto').randomBytes;
      _rng = _rb && function() {return _rb(16);};
    } catch(e) {}
  }

  if (!_rng && _global.crypto && crypto.getRandomValues) {
    // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
    //
    // Moderately fast, high quality
    var _rnds8 = new Uint8Array(16);
    _rng = function whatwgRNG() {
      crypto.getRandomValues(_rnds8);
      return _rnds8;
    };
  }

  if (!_rng) {
    // Math.random()-based (RNG)
    //
    // If all else fails, use Math.random().  It's fast, but is of unspecified
    // quality.
    var  _rnds = new Array(16);
    _rng = function() {
      for (var i = 0, r; i < 16; i++) {
        if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
        _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
      }

      return _rnds;
    };
  }

  // Buffer class to use
  var BufferClass = typeof(Buffer) == 'function' ? Buffer : Array;

  // Maps for number <-> hex string conversion
  var _byteToHex = [];
  var _hexToByte = {};
  for (var i = 0; i < 256; i++) {
    _byteToHex[i] = (i + 0x100).toString(16).substr(1);
    _hexToByte[_byteToHex[i]] = i;
  }

  // **`parse()` - Parse a UUID into it's component bytes**
  function parse(s, buf, offset) {
    var i = (buf && offset) || 0, ii = 0;

    buf = buf || [];
    s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
      if (ii < 16) { // Don't overflow!
        buf[i + ii++] = _hexToByte[oct];
      }
    });

    // Zero out remaining bytes if string was short
    while (ii < 16) {
      buf[i + ii++] = 0;
    }

    return buf;
  }

  // **`unparse()` - Convert UUID byte array (ala parse()) into a string**
  function unparse(buf, offset) {
    var i = offset || 0, bth = _byteToHex;
    return  bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]];
  }

  // **`v1()` - Generate time-based UUID**
  //
  // Inspired by https://github.com/LiosK/UUID.js
  // and http://docs.python.org/library/uuid.html

  // random #'s we need to init node and clockseq
  var _seedBytes = _rng();

  // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
  var _nodeId = [
    _seedBytes[0] | 0x01,
    _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
  ];

  // Per 4.2.2, randomize (14 bit) clockseq
  var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

  // Previous uuid creation time
  var _lastMSecs = 0, _lastNSecs = 0;

  // See https://github.com/broofa/node-uuid for API details
  function v1(options, buf, offset) {
    var i = buf && offset || 0;
    var b = buf || [];

    options = options || {};

    var clockseq = options.clockseq != null ? options.clockseq : _clockseq;

    // UUID timestamps are 100 nano-second units since the Gregorian epoch,
    // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
    // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
    // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
    var msecs = options.msecs != null ? options.msecs : new Date().getTime();

    // Per 4.2.1.2, use count of uuid's generated during the current clock
    // cycle to simulate higher resolution clock
    var nsecs = options.nsecs != null ? options.nsecs : _lastNSecs + 1;

    // Time since last uuid creation (in msecs)
    var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

    // Per 4.2.1.2, Bump clockseq on clock regression
    if (dt < 0 && options.clockseq == null) {
      clockseq = clockseq + 1 & 0x3fff;
    }

    // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
    // time interval
    if ((dt < 0 || msecs > _lastMSecs) && options.nsecs == null) {
      nsecs = 0;
    }

    // Per 4.2.1.2 Throw error if too many uuids are requested
    if (nsecs >= 10000) {
      throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
    }

    _lastMSecs = msecs;
    _lastNSecs = nsecs;
    _clockseq = clockseq;

    // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
    msecs += 12219292800000;

    // `time_low`
    var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
    b[i++] = tl >>> 24 & 0xff;
    b[i++] = tl >>> 16 & 0xff;
    b[i++] = tl >>> 8 & 0xff;
    b[i++] = tl & 0xff;

    // `time_mid`
    var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
    b[i++] = tmh >>> 8 & 0xff;
    b[i++] = tmh & 0xff;

    // `time_high_and_version`
    b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
    b[i++] = tmh >>> 16 & 0xff;

    // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
    b[i++] = clockseq >>> 8 | 0x80;

    // `clock_seq_low`
    b[i++] = clockseq & 0xff;

    // `node`
    var node = options.node || _nodeId;
    for (var n = 0; n < 6; n++) {
      b[i + n] = node[n];
    }

    return buf ? buf : unparse(b);
  }

  // **`v4()` - Generate random UUID**

  // See https://github.com/broofa/node-uuid for API details
  function v4(options, buf, offset) {
    // Deprecated - 'format' argument, as supported in v1.2
    var i = buf && offset || 0;

    if (typeof(options) == 'string') {
      buf = options == 'binary' ? new BufferClass(16) : null;
      options = null;
    }
    options = options || {};

    var rnds = options.random || (options.rng || _rng)();

    // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
    rnds[6] = (rnds[6] & 0x0f) | 0x40;
    rnds[8] = (rnds[8] & 0x3f) | 0x80;

    // Copy bytes to buffer, if provided
    if (buf) {
      for (var ii = 0; ii < 16; ii++) {
        buf[i + ii] = rnds[ii];
      }
    }

    return buf || unparse(rnds);
  }

  // Export public API
  var uuid = v4;
  uuid.v1 = v1;
  uuid.v4 = v4;
  uuid.parse = parse;
  uuid.unparse = unparse;
  uuid.BufferClass = BufferClass;

  if (typeof define === 'function' && define.amd) {
    // Publish as AMD module
    define(function() {return uuid;});
  } else if (typeof(module) != 'undefined' && module.exports) {
    // Publish as node.js module
    module.exports = uuid;
  } else {
    // Publish as global (in browsers)
    var _previousRoot = _global.uuid;

    // **`noConflict()` - (browser only) to reset global 'uuid' var**
    uuid.noConflict = function() {
      _global.uuid = _previousRoot;
      return uuid;
    };

    _global.uuid = uuid;
  }
}).call(this);


(function($, window, undefined){

	//namespacing
	var ND = window.ND = window.ND || {};
	ND.API = ND.api || {};
	
	ND.cacheStore = {
			get:function(){
				var value = $.trim($.cookie(this.key));
				try {
					return value ? JSON.parse(value) : "";
				} catch (e) {
					return value || "";
				}			
			},
			set:function(value){
				value = $.isPlainObject(value) ? JSON.stringify(value) : value;
				if(this.get() !== value) {
					//Session cookie
					var options = {path:'/'};
					if( this.expires ) {
						options.expires = this.expires; 
					}			
					if(this.domain){
						options.domain=this.domain;
					}	
					$.cookie(this.key, value || null, options);
				}
			},
			is:function(){
				return this.get() != null ? (this.get().toString().length > 0) : false;
			},
			contains:function(value){
				return this.get().indexOf(value) > -1;
			}
		};
		
		//Quick (single callback) Deferred Implementation.
		ND.deferred = function() {

			var cb, 
				resolved,
				run = function() {
					cb && cb.call();						
				};
			
			return {
				resolve: function() {
					resolved = true;
					run();
				},
				done: function( fn ) {
					cb = fn;
					resolved && run()
				}
			};		
		};

			
	
	
	//Protect from missing LAB/loader script.
	if(window['$wait'] === undefined) {
		window['$wait'] = function(fn){
			fn();
		}
	}
	
})(jQuery, window);


/*
 * File to house the mini plugins that are created for modules.
 */
(function($, win, doc){

	/*
	 * jQuery Plugin - embeddedData
	 * <script id="price-urls" type="text/x-json">
	 * {
	 * 		"xhr-calcprice-data":"GetPrices.js",
	 *		"xhr-calcprice-form":"overlay-calculateprice.html?v2"
	 * }
	 * </script>
	 */
	$.fn.embeddedData = function(prop){
		var xJson = this.data('x-json');
		
		if( !xJson && this.attr('type') === 'text/x-json' ) {
			xJson = $.parseJSON( this.html() );
			this.data( 'x-json', xJson );
		}	
		
		if( prop ) {
			return xJson[prop] || null;
		} else {
			return xJson || {};
		}
	};
	
	
	/*
	 * jQuery Plugin - doOnce
	 * Does nothing if the collection is empty
	 */
	$.fn.doOnce = function(func){ 
	    this.length && func.apply(this); 
	    return this; 
	};
	
	/*
	 * jQuery Plugin - forEach
	 * Does nothing if the collection is empty, other normal loop
	 */
	$.fn.forEach = function(func){ 
	    this.length && this.each(func); 
	    return this; 
	};
	
	/*
	 * jQuery Plugin - killFlash
	 * kill the flash object in the overlay
	 */
	$.fn.killFlash = function(){ 
	    this.length && this.each(function(){
	    	var flash = $(this).flash();
			flash.remove && flash.remove();
	    }); 
	    return this; 
	}
	
	/*
	 * jQuery Plugin - killFlash
	 * Render Flash based on the meta data in the class
	 */
	$.fn.metaBasedFlash = (function(){
		var defaults = {},
			getData = function(flash){
				var data = flash.length > 0 ? flash.metadata({type: 'class'}) : 0,
					ret = (data && 'swf' in data) ? data : 0;
					
				return ret
			};
		
		return function(options){ 
			this.length && this.each(function(){
				var item = $(this),
					data = getData(item);
					options = $.extend(defaults, options);
			
				if(data) {
					//extend the JSON object extracted from the class with some system wide ones.
					data = $.extend(true, data, options.swfobject);
				
					item.flash(data);
					item.addClass("flash-loaded");
					if(options['success']) {
						options.success.apply(this)
					}
				}
			}); 
			return this; 
		}

	})();
	
	/*
	 * jQuery Plugin - lazyLoadImages
	 * Enable lazy load images
	 */
	$.fn.lazyLoadImages = (function(){
		var defaults = {},
			getData = function (image) {
				var data = (image.length > 0) ? image.metadata({type: 'class'}) : 0,
					ret = (data && 'src' in data) ? data : 0;
				return ret
			};
		
		return function (options) {
			this.length && this.each(function () {
				var item = $(this),
					data = getData(item);
					options = $.extend(defaults, options);
				if(data) {
					item.attr("src", data['src']);
					if(options['success']) {
						options.success.apply(this)
					}
				}
			}); 
			return this; 
		}
	})();

	/*
	 * jQuery Plugin - getQueryVariable
	 * 
	 * Calling method: var item = $.getQueryVariable(url,key);
	 * 
	 * url: http://www.example.com/index.html?id=1&image=awesome.jpg
	 * key: "id"
	 * - would return "1"
	 * 
	 * key: null
	 * - would return ["id=1","image=awesome.jpg"]
	 * 
	 * key: "hello"
	 * - would return false
	 * 
	 * 
	 * url: http://www.example.com/index.html?id&image
	 * key: "id"
	 * - would return undefined
	 *
	 * key: null
	 * - would return ["id","image"]
	 * 
	 * key: "hello"
	 * - would return false
	 *
	 * url: http://www.example.com/index.html
	 * key: "id"
	 * - would return false
	 *
	 * key: null
	 * - would return false
	 * 
	 * key: "hello"
	 * - would return false
	 */
	$.extend({
		getQueryVariable: function(url,key){
			var index = url.indexOf('?');
			if (index != -1){
				var query = url.substring( index + 1);
				var params = query.split("&");

				if (key){
					for (var i = 0; i < params.length; i++){
						var pair = params[i].split("=");

						if (pair[0] === key){
							return decodeURI(pair[1]);
						}
					}
				}
				else{
					return params;
				}
			}
			
			return false;
		}
	});

/* End */

})(jQuery, window, document);


/*
 * Description: Change select option, doesn't have depandence of jQuery 
 */
(function(window, document){
	var ND = window.ND = window.ND || {};

	var selectOption = ND.selectCity = {

		init : function(citieName, mainSelector, subSelector ){
			var mainOption = $(mainSelector)[0],
                subOption = $(subSelector);
                // cities = window[citieName];

            var $cities = $("#cityDropdownData");
            var cities;

			if($cities.length > 0) {
                  cities = JSON.parse($cities.html());
            }

			if(!cities || !mainOption){
				return;
			}

			//create states option list
			var states, optionObj = {}, i, j, len;

			selectOption.clearOption(mainOption);
            for(i=0, leni = cities.list.length; i<leni; i++){
                states = cities.list[i].states;
                for(j=0, lenj = states.length; j<lenj; j++){
                    var val = states[j][0];
                    optionObj[val] = states[j][1].cities;
                    selectOption.addOption(mainOption, val, val);
                }
            }

			//create cities option list
			mainOption.onchange = function(e){
				var city = optionObj[mainOption.value];
				
				selectOption.clearOption(subOption[0]);
				
				if(!city){
					return;
				}
				
				for(i=0, len=city.length;i<len;i++){
					selectOption.addOption(subOption[0], city[i][0] , city[i][0]);
				}
			};

            //Trigger change in order to set default option.
            selectOption.selected(mainOption);
            window.setTimeout(function(){
                selectOption.selected(subOption);
            }, 300);
		},

		addOption : function(select, txt, value){
			if (select && select.options) {
				var opts = select.options;
				opts[opts.length] = new Option(txt, value);
			}
		},

		clearOption : function(select){
			if (select && select.options) {
				select.options.length = 1;
			}
		},

        /*Set selected option by value in the data*/
        selected : function(select){
            var $select = $(select),
                value = $select.attr('data');

            if(value != $select.val()){
                $select.val(value).trigger("change");
            }
        }
	};

    //the jason data may rednered very slow, so init it after DOM is ready.
    $(document).ready(function(){
        selectOption.init("cities", "#state", "#city");
    });

})(window, document);


/**
 * BxSlider v4.1 
 */

;(function($){

	var plugin = {};
	
	var defaults = {
		
		// GENERAL
		mode: 'horizontal',
		slideSelector: '',
		infiniteLoop: true,
		hideControlOnEnd: false,
		speed: 500,
		easing: null,
		slideMargin: 0,
		startSlide: 0,
		randomStart: false,
		captions: false,
		ticker: false,
		tickerHover: false,
		adaptiveHeight: false,
		adaptiveHeightSpeed: 500,
		video: false,
		useCSS: true,
		preloadImages: 'visible',

		// TOUCH
		touchEnabled: true,
		swipeThreshold: 50,
		oneToOneTouch: true,
		preventDefaultSwipeX: true,
		preventDefaultSwipeY: false,
		
		// PAGER
		pager: true,
		pagerType: 'full',
		pagerShortSeparator: ' / ',
		pagerSelector: null,
		buildPager: null,
		pagerCustom: null,
		
		// CONTROLS
		controls: true,
		nextText: 'Next',
		prevText: 'Prev',
		nextSelector: null,
		prevSelector: null,
		autoControls: false,
		startText: 'Start',
		stopText: 'Stop',
		autoControlsCombine: false,
		autoControlsSelector: null,
		
		// AUTO
		auto: false,
		pause: 4000,
		autoStart: true,
		autoDirection: 'next',
		autoHover: false,
		autoDelay: 0,
		
		// CAROUSEL
		minSlides: 1,
		maxSlides: 1,
		moveSlides: 0,
		slideWidth: 0,
		
		// CALLBACKS
		onSliderLoad: function() {},
		onSlideBefore: function() {},
		onSlideAfter: function() {},
		onSlideNext: function() {},
		onSlidePrev: function() {}
	}

	$.fn.bxSlider = function(options){
		
		if(this.length == 0) return;
		
		// support mutltiple elements
		if(this.length > 1){
			this.each(function(){$(this).bxSlider(options)});
			return this;
		}
		
		// create a namespace to be used throughout the plugin
		var slider = {};
		// set a reference to our slider element
		var el = this;
		plugin.el = this;

		/**
		 * Makes slideshow responsive
		 */
		// first get the original window dimens (thanks alot IE)
		var windowWidth = $(window).width();
		var windowHeight = $(window).height();

		
		
		/**
		 * ===================================================================================
		 * = PRIVATE FUNCTIONS
		 * ===================================================================================
		 */
		
		/**
		 * Initializes namespace settings to be used throughout plugin
		 */
		var init = function(){
			// merge user-supplied options with the defaults
			slider.settings = $.extend({}, defaults, options);
			// parse slideWidth setting
			slider.settings.slideWidth = parseInt(slider.settings.slideWidth);
			// store the original children
			slider.children = el.children(slider.settings.slideSelector);
			// check if actual number of slides is less than minSlides / maxSlides
			if(slider.children.length < slider.settings.minSlides) slider.settings.minSlides = slider.children.length;
			if(slider.children.length < slider.settings.maxSlides) slider.settings.maxSlides = slider.children.length;
			// if random start, set the startSlide setting to random number
			if(slider.settings.randomStart) slider.settings.startSlide = Math.floor(Math.random() * slider.children.length);
			// store active slide information
			slider.active = { index: slider.settings.startSlide }
			// store if the slider is in carousel mode (displaying / moving multiple slides)
			slider.carousel = slider.settings.minSlides > 1 || slider.settings.maxSlides > 1;
			// if carousel, force preloadImages = 'all'
			if(slider.carousel) slider.settings.preloadImages = 'all';
			// calculate the min / max width thresholds based on min / max number of slides
			// used to setup and update carousel slides dimensions
			slider.minThreshold = (slider.settings.minSlides * slider.settings.slideWidth) + ((slider.settings.minSlides - 1) * slider.settings.slideMargin);
			slider.maxThreshold = (slider.settings.maxSlides * slider.settings.slideWidth) + ((slider.settings.maxSlides - 1) * slider.settings.slideMargin);
			// store the current state of the slider (if currently animating, working is true)
			slider.working = false;
			// initialize the controls object
			slider.controls = {};
			// initialize an auto interval
			slider.interval = null;
			// determine which property to use for transitions
			slider.animProp = slider.settings.mode == 'vertical' ? 'top' : 'left';
			// determine if hardware acceleration can be used
			slider.usingCSS = slider.settings.useCSS && slider.settings.mode != 'fade' && (function(){
				// create our test div element
				var div = document.createElement('div');
				// css transition properties
				var props = ['WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
				// test for each property
				for(var i in props){
					if(div.style[props[i]] !== undefined){
						slider.cssPrefix = props[i].replace('Perspective', '').toLowerCase();
						slider.animProp = '-' + slider.cssPrefix + '-transform';
						return true;
					}
				}
				return false;
			}());
			// if vertical mode always make maxSlides and minSlides equal
			if(slider.settings.mode == 'vertical') slider.settings.maxSlides = slider.settings.minSlides;
			// perform all DOM / CSS modifications
			setup();
		}

		/**
		 * Performs all DOM and CSS modifications
		 */
		var setup = function(){
			// wrap el in a wrapper
			el.wrap('<div class="bx-wrapper"><div class="bx-viewport"></div></div>');
			// store a namspace reference to .bx-viewport
			slider.viewport = el.parent();
			// add a loading div to display while images are loading
			slider.loader = $('<div class="bx-loading" />');
			slider.viewport.prepend(slider.loader);
			// set el to a massive width, to hold any needed slides
			// also strip any margin and padding from el
			el.css({
				width: slider.settings.mode == 'horizontal' ? slider.children.length * 215 + '%' : 'auto',
				position: 'relative'
			});
			// if using CSS, add the easing property
			if(slider.usingCSS && slider.settings.easing){
				el.css('-' + slider.cssPrefix + '-transition-timing-function', slider.settings.easing);
			// if not using CSS and no easing value was supplied, use the default JS animation easing (swing)
			}else if(!slider.settings.easing){
				slider.settings.easing = 'swing';
			}
			var slidesShowing = getNumberSlidesShowing();
			// make modifications to the viewport (.bx-viewport)
			slider.viewport.css({
				width: '100%',
				overflow: 'hidden',
				position: 'relative'
			});
			slider.viewport.parent().css({
				maxWidth: getViewportMaxWidth()
			});
			// apply css to all slider children
			slider.children.css({
				'float': slider.settings.mode == 'horizontal' ? 'left' : 'none',
				listStyle: 'none',
				position: 'relative'
			});
			// apply the calculated width after the float is applied to prevent scrollbar interference
			slider.children.width(getSlideWidth());
			// if slideMargin is supplied, add the css
			if(slider.settings.mode == 'horizontal' && slider.settings.slideMargin > 0) slider.children.css('marginRight', slider.settings.slideMargin);
			if(slider.settings.mode == 'vertical' && slider.settings.slideMargin > 0) slider.children.css('marginBottom', slider.settings.slideMargin);
			// if "fade" mode, add positioning and z-index CSS
			if(slider.settings.mode == 'fade'){
				slider.children.css({
					position: 'absolute',
					zIndex: 0,
					display: 'none'
				});
				// prepare the z-index on the showing element
				slider.children.eq(slider.settings.startSlide).css({zIndex: 50, display: 'block'});
			}
			// create an element to contain all slider controls (pager, start / stop, etc)
			slider.controls.el = $('<div class="bx-controls" />');
			// if captions are requested, add them
			if(slider.settings.captions) appendCaptions();
			// if infinite loop, prepare additional slides
			if(slider.settings.infiniteLoop && slider.settings.mode != 'fade' && !slider.settings.ticker){
				var slice = slider.settings.mode == 'vertical' ? slider.settings.minSlides : slider.settings.maxSlides;
				var sliceAppend = slider.children.slice(0, slice).clone().addClass('bx-clone');
				var slicePrepend = slider.children.slice(-slice).clone().addClass('bx-clone');
				el.append(sliceAppend).prepend(slicePrepend);
			}
			// check if startSlide is last slide
			slider.active.last = slider.settings.startSlide == getPagerQty() - 1;
			// if video is true, set up the fitVids plugin
			if(slider.settings.video) el.fitVids();
			// set the default preload selector (visible)
			var preloadSelector = slider.children.eq(slider.settings.startSlide);
			if (slider.settings.preloadImages == "all") preloadSelector = el.children();
			// only check for control addition if not in "ticker" mode
			if(!slider.settings.ticker){
				// if pager is requested, add it
				if(slider.settings.pager) appendPager();
				// if controls are requested, add them
				if(slider.settings.controls) appendControls();
				// if auto is true, and auto controls are requested, add them
				if(slider.settings.auto && slider.settings.autoControls) appendControlsAuto();
				// if any control option is requested, add the controls wrapper
				if(slider.settings.controls || slider.settings.autoControls || slider.settings.pager) slider.viewport.after(slider.controls.el);
			}
			// preload all images, then perform final DOM / CSS modifications that depend on images being loaded
			preloadSelector.imagesLoaded(start);
		}

		/**
		 * Start the slider
		 */
		var start = function(){
			// remove the loading DOM element
			slider.loader.remove();
			// set the left / top position of "el"
			setSlidePosition();
			// if "vertical" mode, always use adaptiveHeight to prevent odd behavior
			if (slider.settings.mode == 'vertical') slider.settings.adaptiveHeight = true;
			// set the viewport height
			slider.viewport.height(getViewportHeight());
			// make sure everything is positioned just right (same as a window resize)
			el.redrawSlider();
			// onSliderLoad callback
			slider.settings.onSliderLoad(slider.active.index);
			// slider has been fully initialized
			slider.initialized = true;
			// bind the resize call to the window
			$(window).bind('resize', resizeWindow);
			// if auto is true, start the show
			if (slider.settings.auto && slider.settings.autoStart) initAuto();
			// if ticker is true, start the ticker
			if (slider.settings.ticker) initTicker();
			// if pager is requested, make the appropriate pager link active
			if (slider.settings.pager) updatePagerActive(slider.settings.startSlide);
			// check for any updates to the controls (like hideControlOnEnd updates)
			if (slider.settings.controls) updateDirectionControls();
			// if touchEnabled is true, setup the touch events
			if (slider.settings.touchEnabled && !slider.settings.ticker) initTouch();
		}
		
		/**
		 * Returns the calculated height of the viewport, used to determine either adaptiveHeight or the maxHeight value
		 */
		var getViewportHeight = function(){
			var height = 0;
			// first determine which children (slides) should be used in our height calculation
			var children = $();
			// if mode is not "vertical" and adaptiveHeight is false, include all children
			if(slider.settings.mode != 'vertical' && !slider.settings.adaptiveHeight){
				children = slider.children;
			}else{
				// if not carousel, return the single active child
				if(!slider.carousel){
					children = slider.children.eq(slider.active.index);
				// if carousel, return a slice of children
				}else{
					// get the individual slide index
					var currentIndex = slider.settings.moveSlides == 1 ? slider.active.index : slider.active.index * getMoveBy();
					// add the current slide to the children
					children = slider.children.eq(currentIndex);
					// cycle through the remaining "showing" slides
					for (i = 1; i <= slider.settings.maxSlides - 1; i++){
						// if looped back to the start
						if(currentIndex + i >= slider.children.length){
							children = children.add(slider.children.eq(i - 1));
						}else{
							children = children.add(slider.children.eq(currentIndex + i));
						}
					}
				}
			}
			// if "vertical" mode, calculate the sum of the heights of the children
			if(slider.settings.mode == 'vertical'){
				children.each(function(index) {
				  height += $(this).outerHeight();
				});
				// add user-supplied margins
				if(slider.settings.slideMargin > 0){
					height += slider.settings.slideMargin * (slider.settings.minSlides - 1);
				}
			// if not "vertical" mode, calculate the max height of the children
			}else{
				height = Math.max.apply(Math, children.map(function(){
					return $(this).outerHeight(false);
				}).get());
			}
			return height;
		}

		/**
		 * Returns the calculated width to be used for the outer wrapper / viewport
		 */
		var getViewportMaxWidth = function(){
			var width = '100%';
			if(slider.settings.slideWidth > 0){
				if(slider.settings.mode == 'horizontal'){
					width = (slider.settings.maxSlides * slider.settings.slideWidth) + ((slider.settings.maxSlides - 1) * slider.settings.slideMargin);
				}else{
					width = slider.settings.slideWidth;
				}
			}
			return width;
		}
		
		/**
		 * Returns the calculated width to be applied to each slide
		 */
		var getSlideWidth = function(){
			// start with any user-supplied slide width
			var newElWidth = slider.settings.slideWidth;
			// get the current viewport width
			var wrapWidth = slider.viewport.width();
			// if slide width was not supplied, or is larger than the viewport use the viewport width
			if(slider.settings.slideWidth == 0 ||
				(slider.settings.slideWidth > wrapWidth && !slider.carousel) ||
				slider.settings.mode == 'vertical'){
				newElWidth = wrapWidth;
			// if carousel, use the thresholds to determine the width
			}else if(slider.settings.maxSlides > 1 && slider.settings.mode == 'horizontal'){
				if(wrapWidth > slider.maxThreshold){
					// newElWidth = (wrapWidth - (slider.settings.slideMargin * (slider.settings.maxSlides - 1))) / slider.settings.maxSlides;
				}else if(wrapWidth < slider.minThreshold){
					newElWidth = (wrapWidth - (slider.settings.slideMargin * (slider.settings.minSlides - 1))) / slider.settings.minSlides;
				}
			}
			return newElWidth;
		}
		
		/**
		 * Returns the number of slides currently visible in the viewport (includes partially visible slides)
		 */
		var getNumberSlidesShowing = function(){
			var slidesShowing = 1;
			if(slider.settings.mode == 'horizontal' && slider.settings.slideWidth > 0){
				// if viewport is smaller than minThreshold, return minSlides
				if(slider.viewport.width() < slider.minThreshold){
					slidesShowing = slider.settings.minSlides;
				// if viewport is larger than minThreshold, return maxSlides
				}else if(slider.viewport.width() > slider.maxThreshold){
					slidesShowing = slider.settings.maxSlides;
				// if viewport is between min / max thresholds, divide viewport width by first child width
				}else{
					var childWidth = slider.children.first().width();
					slidesShowing = Math.floor(slider.viewport.width() / childWidth);
				}
			// if "vertical" mode, slides showing will always be minSlides
			}else if(slider.settings.mode == 'vertical'){
				slidesShowing = slider.settings.minSlides;
			}
			return slidesShowing;
		}
		
		/**
		 * Returns the number of pages (one full viewport of slides is one "page")
		 */
		var getPagerQty = function(){
			var pagerQty = 0;
			// if moveSlides is specified by the user
			if(slider.settings.moveSlides > 0){
				if(slider.settings.infiniteLoop){
					pagerQty = slider.children.length / getMoveBy();
				}else{
					// use a while loop to determine pages
					var breakPoint = 0;
					var counter = 0
					// when breakpoint goes above children length, counter is the number of pages
					while (breakPoint < slider.children.length){
						++pagerQty;
						breakPoint = counter + getNumberSlidesShowing();
						counter += slider.settings.moveSlides <= getNumberSlidesShowing() ? slider.settings.moveSlides : getNumberSlidesShowing();
					}
				}
			// if moveSlides is 0 (auto) divide children length by sides showing, then round up
			}else{
				pagerQty = Math.ceil(slider.children.length / getNumberSlidesShowing());
			}
			return pagerQty;
		}
		
		/**
		 * Returns the number of indivual slides by which to shift the slider
		 */
		var getMoveBy = function(){
			// if moveSlides was set by the user and moveSlides is less than number of slides showing
			if(slider.settings.moveSlides > 0 && slider.settings.moveSlides <= getNumberSlidesShowing()){
				return slider.settings.moveSlides;
			}
			// if moveSlides is 0 (auto)
			return getNumberSlidesShowing();
		}
		
		/**
		 * Sets the slider's (el) left or top position
		 */
		var setSlidePosition = function(){
			// if last slide, not infinite loop, and number of children is larger than specified maxSlides
			if(slider.children.length > slider.settings.maxSlides && slider.active.last && !slider.settings.infiniteLoop){
				if (slider.settings.mode == 'horizontal'){
					// get the last child's position
					var lastChild = slider.children.last();
					var position = lastChild.position();
					// set the left position
					setPositionProperty(-(position.left - (slider.viewport.width() - lastChild.width())), 'reset', 0);
				}else if(slider.settings.mode == 'vertical'){
					// get the last showing index's position
					var lastShowingIndex = slider.children.length - slider.settings.minSlides;
					var position = slider.children.eq(lastShowingIndex).position();
					// set the top position
					setPositionProperty(-position.top, 'reset', 0);
				}
			// if not last slide
			}else{
				// get the position of the first showing slide
				var position = slider.children.eq(slider.active.index * getMoveBy()).position();
				// check for last slide
				if (slider.active.index == getPagerQty() - 1) slider.active.last = true;
				// set the repective position
				if (position != undefined){
					if (slider.settings.mode == 'horizontal') setPositionProperty(-position.left, 'reset', 0);
					else if (slider.settings.mode == 'vertical') setPositionProperty(-position.top, 'reset', 0);
				}
			}
		}
		
		/**
		 * Sets the el's animating property position (which in turn will sometimes animate el).
		 * If using CSS, sets the transform property. If not using CSS, sets the top / left property.
		 *
		 * @param value (int) 
		 *  - the animating property's value
		 *
		 * @param type (string) 'slider', 'reset', 'ticker'
		 *  - the type of instance for which the function is being
		 *
		 * @param duration (int) 
		 *  - the amount of time (in ms) the transition should occupy
		 *
		 * @param params (array) optional
		 *  - an optional parameter containing any variables that need to be passed in
		 */
		var setPositionProperty = function(value, type, duration, params){
			// use CSS transform
			if(slider.usingCSS){
				// determine the translate3d value
				var propValue = slider.settings.mode == 'vertical' ? 'translate3d(0, ' + value + 'px, 0)' : 'translate3d(' + value + 'px, 0, 0)';
				// add the CSS transition-duration
				el.css('-' + slider.cssPrefix + '-transition-duration', duration / 1000 + 's');
				if(type == 'slide'){
					// set the property value
					el.css(slider.animProp, propValue);
					// turn off the slider working flag here, in case transitionEnd never gets called
                    slider.working = false;
					// bind a callback method - executes when CSS transition completes
					el.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(){
						// unbind the callback
						el.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
						updateAfterSlideTransition();
					});
				}else if(type == 'reset'){
					el.css(slider.animProp, propValue);
				}else if(type == 'ticker'){
					// make the transition use 'linear'
					el.css('-' + slider.cssPrefix + '-transition-timing-function', 'linear');
					el.css(slider.animProp, propValue);
					// bind a callback method - executes when CSS transition completes
					el.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(){
						// unbind the callback
						el.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
						// reset the position
						setPositionProperty(params['resetValue'], 'reset', 0);
						// start the loop again
						tickerLoop();
					});
				}
			// use JS animate
			}else{
				var animateObj = {};
				animateObj[slider.animProp] = value;
				if(type == 'slide'){
					el.animate(animateObj, duration, slider.settings.easing, function(){
						updateAfterSlideTransition();
					});
				}else if(type == 'reset'){
					el.css(slider.animProp, value)
				}else if(type == 'ticker'){
					el.animate(animateObj, speed, 'linear', function(){
						setPositionProperty(params['resetValue'], 'reset', 0);
						// run the recursive loop after animation
						tickerLoop();
					});
				}
			}
		}
		
		/**
		 * Populates the pager with proper amount of pages
		 */
		var populatePager = function(){
			var pagerHtml = '';
			pagerQty = getPagerQty();
			// loop through each pager item
			for(var i=0; i < pagerQty; i++){
				var linkContent = '';
				// if a buildPager function is supplied, use it to get pager link value, else use index + 1
				if(slider.settings.buildPager && $.isFunction(slider.settings.buildPager)){
					linkContent = slider.settings.buildPager(i);
					slider.pagerEl.addClass('bx-custom-pager');
				}else{
					linkContent = i + 1;
					slider.pagerEl.addClass('bx-default-pager');
				}
				// var linkContent = slider.settings.buildPager && $.isFunction(slider.settings.buildPager) ? slider.settings.buildPager(i) : i + 1;
				// add the markup to the string
				pagerHtml += '<div class="bx-pager-item"><a href="" data-slide-index="' + i + '" class="bx-pager-link">' + linkContent + '</a></div>';
			};
			// populate the pager element with pager links
			slider.pagerEl.html(pagerHtml);
		}
		
		/**
		 * Appends the pager to the controls element
		 */
		var appendPager = function(){
			if(!slider.settings.pagerCustom){
				// create the pager DOM element
				slider.pagerEl = $('<div class="bx-pager" />');
				// if a pager selector was supplied, populate it with the pager
				if(slider.settings.pagerSelector){
					$(slider.settings.pagerSelector).html(slider.pagerEl);
				// if no pager selector was supplied, add it after the wrapper
				}else{
					slider.controls.el.addClass('bx-has-pager').append(slider.pagerEl);
				}
				// populate the pager
				populatePager();
			}else{
				slider.pagerEl = $(slider.settings.pagerCustom);
			}
			// assign the pager click binding
			slider.pagerEl.delegate('a', 'click', clickPagerBind);
		}
		
		/**
		 * Appends prev / next controls to the controls element
		 */
		var appendControls = function(){
			slider.controls.next = $('<a class="bx-next" href="">' + slider.settings.nextText + '</a>');
			slider.controls.prev = $('<a class="bx-prev" href="">' + slider.settings.prevText + '</a>');
			// bind click actions to the controls
			slider.controls.next.bind('click', clickNextBind);
			slider.controls.prev.bind('click', clickPrevBind);
			// if nextSlector was supplied, populate it
			if(slider.settings.nextSelector){
				$(slider.settings.nextSelector).append(slider.controls.next);
			}
			// if prevSlector was supplied, populate it
			if(slider.settings.prevSelector){
				$(slider.settings.prevSelector).append(slider.controls.prev);
			}
			// if no custom selectors were supplied
			if(!slider.settings.nextSelector && !slider.settings.prevSelector){
				// add the controls to the DOM
				slider.controls.directionEl = $('<div class="bx-controls-direction" />');
				// add the control elements to the directionEl
				slider.controls.directionEl.append(slider.controls.prev).append(slider.controls.next);
				// slider.viewport.append(slider.controls.directionEl);
				slider.controls.el.addClass('bx-has-controls-direction').append(slider.controls.directionEl);
			}
		}
		
		/**
		 * Appends start / stop auto controls to the controls element
		 */
		var appendControlsAuto = function(){
			slider.controls.start = $('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + slider.settings.startText + '</a></div>');
			slider.controls.stop = $('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + slider.settings.stopText + '</a></div>');
			// add the controls to the DOM
			slider.controls.autoEl = $('<div class="bx-controls-auto" />');
			// bind click actions to the controls
			slider.controls.autoEl.delegate('.bx-start', 'click', clickStartBind);
			slider.controls.autoEl.delegate('.bx-stop', 'click', clickStopBind);
			// if autoControlsCombine, insert only the "start" control
			if(slider.settings.autoControlsCombine){
				slider.controls.autoEl.append(slider.controls.start);
			// if autoControlsCombine is false, insert both controls
			}else{
				slider.controls.autoEl.append(slider.controls.start).append(slider.controls.stop);
			}
			// if auto controls selector was supplied, populate it with the controls
			if(slider.settings.autoControlsSelector){
				$(slider.settings.autoControlsSelector).html(slider.controls.autoEl);
			// if auto controls selector was not supplied, add it after the wrapper
			}else{
				slider.controls.el.addClass('bx-has-controls-auto').append(slider.controls.autoEl);
			}
			// update the auto controls
			updateAutoControls(slider.settings.autoStart ? 'stop' : 'start');
		}
		
		/**
		 * Appends image captions to the DOM
		 */
		var appendCaptions = function(){
			// cycle through each child
			slider.children.each(function(index){
				// get the image title attribute
				var title = $(this).find('img:first').attr('title');
				// append the caption
				if (title != undefined) $(this).append('<div class="bx-caption"><span>' + title + '</span></div>');
			});
		}
		
		/**
		 * Click next binding
		 *
		 * @param e (event) 
		 *  - DOM event object
		 */
		var clickNextBind = function(e){
			// if auto show is running, stop it
			if (slider.settings.auto) el.stopAuto();
			el.goToNextSlide();
			e.preventDefault();
		}
		
		/**
		 * Click prev binding
		 *
		 * @param e (event) 
		 *  - DOM event object
		 */
		var clickPrevBind = function(e){
			// if auto show is running, stop it
			if (slider.settings.auto) el.stopAuto();
			el.goToPrevSlide();
			e.preventDefault();
		}
		
		/**
		 * Click start binding
		 *
		 * @param e (event) 
		 *  - DOM event object
		 */
		var clickStartBind = function(e){
			el.startAuto();
			e.preventDefault();
		}
		
		/**
		 * Click stop binding
		 *
		 * @param e (event) 
		 *  - DOM event object
		 */
		var clickStopBind = function(e){
			el.stopAuto();
			e.preventDefault();
		}

		/**
		 * Click pager binding
		 *
		 * @param e (event) 
		 *  - DOM event object
		 */
		var clickPagerBind = function(e){
			// if auto show is running, stop it
			if (slider.settings.auto) el.stopAuto();
			var pagerLink = $(e.currentTarget);
			var pagerIndex = parseInt(pagerLink.attr('data-slide-index'));
			// if clicked pager link is not active, continue with the goToSlide call
			if(pagerIndex != slider.active.index) el.goToSlide(pagerIndex);
			e.preventDefault();
		}
		
		/**
		 * Updates the pager links with an active class
		 *
		 * @param slideIndex (int) 
		 *  - index of slide to make active
		 */
		var updatePagerActive = function(slideIndex){
			// if "short" pager type
			if(slider.settings.pagerType == 'short'){
				slider.pagerEl.html((slideIndex + 1) + slider.settings.pagerShortSeparator + slider.children.length);
				return;
			}
			// remove all pager active classes
			slider.pagerEl.find('a').removeClass('active');
			// apply the active class for all pagers
			slider.pagerEl.each(function(i, el) { $(el).find('a').eq(slideIndex).addClass('active'); });
		}
		
		/**
		 * Performs needed actions after a slide transition
		 */
		var updateAfterSlideTransition = function(){
			// if infinte loop is true
			if(slider.settings.infiniteLoop){
				var position = '';
				// first slide
				if(slider.active.index == 0){
					// set the new position
					position = slider.children.eq(0).position();
				// carousel, last slide
				}else if(slider.active.index == getPagerQty() - 1 && slider.carousel){
					position = slider.children.eq((getPagerQty() - 1) * getMoveBy()).position();
				// last slide
				}else if(slider.active.index == slider.children.length - 1){
					position = slider.children.eq(slider.children.length - 1).position();
				}
				if (slider.settings.mode == 'horizontal') { setPositionProperty(-position.left, 'reset', 0);; }
				else if (slider.settings.mode == 'vertical') { setPositionProperty(-position.top, 'reset', 0);; }
			}
			// declare that the transition is complete
			slider.working = false;
			// onSlideAfter callback
			slider.settings.onSlideAfter(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
		}
		
		/**
		 * Updates the auto controls state (either active, or combined switch)
		 *
		 * @param state (string) "start", "stop"
		 *  - the new state of the auto show
		 */
		var updateAutoControls = function(state){
			// if autoControlsCombine is true, replace the current control with the new state 
			if(slider.settings.autoControlsCombine){
				slider.controls.autoEl.html(slider.controls[state]);
			// if autoControlsCombine is false, apply the "active" class to the appropriate control 
			}else{
				slider.controls.autoEl.find('a').removeClass('active');
				slider.controls.autoEl.find('a:not(.bx-' + state + ')').addClass('active');
			}
		}
		
		/**
		 * Updates the direction controls (checks if either should be hidden)
		 */
		var updateDirectionControls = function(){
			// if infiniteLoop is false and hideControlOnEnd is true
			if(!slider.settings.infiniteLoop && slider.settings.hideControlOnEnd){
				// if first slide
				if (slider.active.index == 0){
					slider.controls.prev.addClass('disabled');
					slider.controls.next.removeClass('disabled');
				// if last slide
				}else if(slider.active.index == getPagerQty() - 1){
					slider.controls.next.addClass('disabled');
					slider.controls.prev.removeClass('disabled');
				// if any slide in the middle
				}else{
					slider.controls.prev.removeClass('disabled');
					slider.controls.next.removeClass('disabled');
				}
			// if slider has only one page, disable controls
			}else if(getPagerQty() == 1){
				slider.controls.prev.addClass('disabled');
				slider.controls.next.addClass('disabled');
			}
		}
		
		/**
		 * Initialzes the auto process
		 */
		var initAuto = function(){
			// if autoDelay was supplied, launch the auto show using a setTimeout() call
			if(slider.settings.autoDelay > 0){
				var timeout = setTimeout(el.startAuto, slider.settings.autoDelay);
			// if autoDelay was not supplied, start the auto show normally
			}else{
				el.startAuto();
			}
			// if autoHover is requested
			if(slider.settings.autoHover){
				// on el hover
				el.hover(function(){
					// if the auto show is currently playing (has an active interval)
					if(slider.interval){
						// stop the auto show and pass true agument which will prevent control update
						el.stopAuto(true);
						// create a new autoPaused value which will be used by the relative "mouseout" event
						slider.autoPaused = true;
					}
				}, function(){
					// if the autoPaused value was created be the prior "mouseover" event
					if(slider.autoPaused){
						// start the auto show and pass true agument which will prevent control update
						el.startAuto(true);
						// reset the autoPaused value
						slider.autoPaused = null;
					}
				});
			}
		}
		
		/**
		 * Initialzes the ticker process
		 */
		var initTicker = function(){
			var startPosition = 0;
			// if autoDirection is "next", append a clone of the entire slider
			if(slider.settings.autoDirection == 'next'){
				el.append(slider.children.clone().addClass('bx-clone'));
			// if autoDirection is "prev", prepend a clone of the entire slider, and set the left position
			}else{
				el.prepend(slider.children.clone().addClass('bx-clone'));
				var position = slider.children.first().position();
				startPosition = slider.settings.mode == 'horizontal' ? -position.left : -position.top;
			}
			setPositionProperty(startPosition, 'reset', 0);
			// do not allow controls in ticker mode
			slider.settings.pager = false;
			slider.settings.controls = false;
			slider.settings.autoControls = false;
			// if autoHover is requested
			if(slider.settings.tickerHover && !slider.usingCSS){
				// on el hover
				slider.viewport.hover(function(){
					el.stop();
				}, function(){
					// calculate the total width of children (used to calculate the speed ratio)
					var totalDimens = 0;
					slider.children.each(function(index){
					  totalDimens += slider.settings.mode == 'horizontal' ? $(this).outerWidth(true) : $(this).outerHeight(true);
					});
					// calculate the speed ratio (used to determine the new speed to finish the paused animation)
					var ratio = slider.settings.speed / totalDimens;
					// determine which property to use
					var property = slider.settings.mode == 'horizontal' ? 'left' : 'top';
					// calculate the new speed
					var newSpeed = ratio * (totalDimens - (Math.abs(parseInt(el.css(property)))));
					tickerLoop(newSpeed);
				});
			}
			// start the ticker loop
			tickerLoop();
		}
		
		/**
		 * Runs a continuous loop, news ticker-style
		 */
		var tickerLoop = function(resumeSpeed){
			speed = resumeSpeed ? resumeSpeed : slider.settings.speed;
			var position = {left: 0, top: 0};
			var reset = {left: 0, top: 0};
			// if "next" animate left position to last child, then reset left to 0
			if(slider.settings.autoDirection == 'next'){
				position = el.find('.bx-clone').first().position();
			// if "prev" animate left position to 0, then reset left to first non-clone child
			}else{
				reset = slider.children.first().position();
			}
			var animateProperty = slider.settings.mode == 'horizontal' ? -position.left : -position.top;
			var resetValue = slider.settings.mode == 'horizontal' ? -reset.left : -reset.top;
			var params = {resetValue: resetValue};
			setPositionProperty(animateProperty, 'ticker', speed, params);
		}
		
		/**
		 * Initializes touch events
		 */
		var initTouch = function(){
			// initialize object to contain all touch values
			slider.touch = {
				start: {x: 0, y: 0},
				end: {x: 0, y: 0}
			}
			slider.viewport.bind('touchstart', onTouchStart);
		}
		
		/**
		 * Event handler for "touchstart"
		 *
		 * @param e (event) 
		 *  - DOM event object
		 */
		var onTouchStart = function(e){
			if(slider.working){
				e.preventDefault();
			}else{
				// record the original position when touch starts
				slider.touch.originalPos = el.position();
				var orig = e.originalEvent;
				// record the starting touch x, y coordinates
				slider.touch.start.x = orig.changedTouches[0].pageX;
				slider.touch.start.y = orig.changedTouches[0].pageY;
				// bind a "touchmove" event to the viewport
				slider.viewport.bind('touchmove', onTouchMove);
				// bind a "touchend" event to the viewport
				slider.viewport.bind('touchend', onTouchEnd);
			}
		}
		
		/**
		 * Event handler for "touchmove"
		 *
		 * @param e (event) 
		 *  - DOM event object
		 */
		var onTouchMove = function(e){
			var orig = e.originalEvent;
			// if scrolling on y axis, do not prevent default
			var xMovement = Math.abs(orig.changedTouches[0].pageX - slider.touch.start.x);
			var yMovement = Math.abs(orig.changedTouches[0].pageY - slider.touch.start.y);
			// x axis swipe
			if((xMovement * 3) > yMovement && slider.settings.preventDefaultSwipeX){
				e.preventDefault();
			// y axis swipe
			}else if((yMovement * 3) > xMovement && slider.settings.preventDefaultSwipeY){
				e.preventDefault();
			}
			if(slider.settings.mode != 'fade' && slider.settings.oneToOneTouch){
				var value = 0;
				// if horizontal, drag along x axis
				if(slider.settings.mode == 'horizontal'){
					var change = orig.changedTouches[0].pageX - slider.touch.start.x;
					value = slider.touch.originalPos.left + change;
				// if vertical, drag along y axis
				}else{
					var change = orig.changedTouches[0].pageY - slider.touch.start.y;
					value = slider.touch.originalPos.top + change;
				}
				setPositionProperty(value, 'reset', 0);
			}
		}
		
		/**
		 * Event handler for "touchend"
		 *
		 * @param e (event) 
		 *  - DOM event object
		 */
		var onTouchEnd = function(e){
			slider.viewport.unbind('touchmove', onTouchMove);
			var orig = e.originalEvent;
			var value = 0;
			// record end x, y positions
			slider.touch.end.x = orig.changedTouches[0].pageX;
			slider.touch.end.y = orig.changedTouches[0].pageY;
			// if fade mode, check if absolute x distance clears the threshold
			if(slider.settings.mode == 'fade'){
				var distance = Math.abs(slider.touch.start.x - slider.touch.end.x);
				if(distance >= slider.settings.swipeThreshold){
					slider.touch.start.x > slider.touch.end.x ? el.goToNextSlide() : el.goToPrevSlide();
					el.stopAuto();
				}
			// not fade mode
			}else{
				var distance = 0;
				// calculate distance and el's animate property
				if(slider.settings.mode == 'horizontal'){
					distance = slider.touch.end.x - slider.touch.start.x;
					value = slider.touch.originalPos.left;
				}else{
					distance = slider.touch.end.y - slider.touch.start.y;
					value = slider.touch.originalPos.top;
				}
				// if not infinite loop and first / last slide, do not attempt a slide transition
				if(!slider.settings.infiniteLoop && ((slider.active.index == 0 && distance > 0) || (slider.active.last && distance < 0))){
					setPositionProperty(value, 'reset', 200);
				}else{
					// check if distance clears threshold
					if(Math.abs(distance) >= slider.settings.swipeThreshold){
						distance < 0 ? el.goToNextSlide() : el.goToPrevSlide();
						el.stopAuto();
					}else{
						// el.animate(property, 200);
						setPositionProperty(value, 'reset', 200);
					}
				}
			}
			slider.viewport.unbind('touchend', onTouchEnd);
		}

		/**
		 * Window resize event callback
		 */
		var resizeWindow = function(e){
			// get the new window dimens (again, thank you IE)
			var windowWidthNew = $(window).width();
			var windowHeightNew = $(window).height();
			// make sure that it is a true window resize
			// *we must check this because our dinosaur friend IE fires a window resize event when certain DOM elements
			// are resized. Can you just die already?*
			if(windowWidth != windowWidthNew || windowHeight != windowHeightNew){
				// set the new window dimens
				windowWidth = windowWidthNew;
				windowHeight = windowHeightNew;
				// update all dynamic elements
				el.redrawSlider();
			}
		}
		
		/**
		 * ===================================================================================
		 * = PUBLIC FUNCTIONS
		 * ===================================================================================
		 */
		
		/**
		 * Performs slide transition to the specified slide
		 *
		 * @param slideIndex (int) 
		 *  - the destination slide's index (zero-based)
		 *
		 * @param direction (string) 
		 *  - INTERNAL USE ONLY - the direction of travel ("prev" / "next")
		 */
		el.goToSlide = function(slideIndex, direction){
			// if plugin is currently in motion, ignore request
			if(slider.working || slider.active.index == slideIndex) return;
			// declare that plugin is in motion
			slider.working = true;
			// store the old index
			slider.oldIndex = slider.active.index;
			// if slideIndex is less than zero, set active index to last child (this happens during infinite loop)
			if(slideIndex < 0){
				slider.active.index = getPagerQty() - 1;
			// if slideIndex is greater than children length, set active index to 0 (this happens during infinite loop)
			}else if(slideIndex >= getPagerQty()){
				slider.active.index = 0;
			// set active index to requested slide
			}else{
				slider.active.index = slideIndex;
			}
			// onSlideBefore, onSlideNext, onSlidePrev callbacks
			slider.settings.onSlideBefore(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
			if(direction == 'next'){
				slider.settings.onSlideNext(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
			}else if(direction == 'prev'){
				slider.settings.onSlidePrev(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
			}
			// check if last slide
			slider.active.last = slider.active.index >= getPagerQty() - 1;
			// update the pager with active class
			if(slider.settings.pager) updatePagerActive(slider.active.index);
			// // check for direction control update
			if(slider.settings.controls) updateDirectionControls();
			// if slider is set to mode: "fade"
			if(slider.settings.mode == 'fade'){
				// if adaptiveHeight is true and next height is different from current height, animate to the new height
				if(slider.settings.adaptiveHeight && slider.viewport.height() != getViewportHeight()){
					slider.viewport.animate({height: getViewportHeight()}, slider.settings.adaptiveHeightSpeed);
				}
				// fade out the visible child and reset its z-index value
				slider.children.filter(':visible').fadeOut(slider.settings.speed).css({zIndex: 0});
				// fade in the newly requested slide
				slider.children.eq(slider.active.index).css('zIndex', 51).fadeIn(slider.settings.speed, function(){
					$(this).css('zIndex', 50);
					updateAfterSlideTransition();
				});
			// slider mode is not "fade"
			}else{
				// if adaptiveHeight is true and next height is different from current height, animate to the new height
				if(slider.settings.adaptiveHeight && slider.viewport.height() != getViewportHeight()){
					slider.viewport.animate({height: getViewportHeight()}, slider.settings.adaptiveHeightSpeed);
				}
				var moveBy = 0;
				var position = {left: 0, top: 0};
				// if carousel and not infinite loop
				if(!slider.settings.infiniteLoop && slider.carousel && slider.active.last){
					if(slider.settings.mode == 'horizontal'){
						// get the last child position
						var lastChild = slider.children.eq(slider.children.length - 1);
						position = lastChild.position();
						// calculate the position of the last slide
						moveBy = slider.viewport.width() - lastChild.width();
					}else{
						// get last showing index position
						var lastShowingIndex = slider.children.length - slider.settings.minSlides;
						position = slider.children.eq(lastShowingIndex).position();
					}
					// horizontal carousel, going previous while on first slide (infiniteLoop mode)
				}else if(slider.carousel && slider.active.last && direction == 'prev'){
					// get the last child position
					var eq = slider.settings.moveSlides == 1 ? slider.settings.maxSlides - getMoveBy() : ((getPagerQty() - 1) * getMoveBy()) - (slider.children.length - slider.settings.maxSlides);
					var lastChild = el.children('.bx-clone').eq(eq);
					position = lastChild.position();
				// if infinite loop and "Next" is clicked on the last slide
				}else if(direction == 'next' && slider.active.index == 0){
					// get the last clone position
					position = el.find('.bx-clone').eq(slider.settings.maxSlides).position();
					slider.active.last = false;
				// normal non-zero requests
				}else if(slideIndex >= 0){
					var requestEl = slideIndex * getMoveBy();
					position = slider.children.eq(requestEl).position();
				}
				// plugin values to be animated
				var value = slider.settings.mode == 'horizontal' ? -(position.left - moveBy) : -position.top;
				setPositionProperty(value, 'slide', slider.settings.speed);
			}
		}
		
		/**
		 * Transitions to the next slide in the show
		 */
		el.goToNextSlide = function(){
			// if infiniteLoop is false and last page is showing, disregard call
			if (!slider.settings.infiniteLoop && slider.active.last) return;
			var pagerIndex = parseInt(slider.active.index) + 1;
			el.goToSlide(pagerIndex, 'next');
		}
		
		/**
		 * Transitions to the prev slide in the show
		 */
		el.goToPrevSlide = function(){
			// if infiniteLoop is false and last page is showing, disregard call
			if (!slider.settings.infiniteLoop && slider.active.index == 0) return;
			var pagerIndex = parseInt(slider.active.index) - 1;
			el.goToSlide(pagerIndex, 'prev');
		}
		
		/**
		 * Starts the auto show
		 *
		 * @param preventControlUpdate (boolean) 
		 *  - if true, auto controls state will not be updated
		 */
		el.startAuto = function(preventControlUpdate){
			// if an interval already exists, disregard call
			if(slider.interval) return;
			// create an interval
			slider.interval = setInterval(function(){
				slider.settings.autoDirection == 'next' ? el.goToNextSlide() : el.goToPrevSlide();
			}, slider.settings.pause);
			// if auto controls are displayed and preventControlUpdate is not true
			if (slider.settings.autoControls && preventControlUpdate != true) updateAutoControls('stop');
		}
		
		/**
		 * Stops the auto show
		 *
		 * @param preventControlUpdate (boolean) 
		 *  - if true, auto controls state will not be updated
		 */
		el.stopAuto = function(preventControlUpdate){
			// if no interval exists, disregard call
			if(!slider.interval) return;
			// clear the interval
			clearInterval(slider.interval);
			slider.interval = null;
			// if auto controls are displayed and preventControlUpdate is not true
			if (slider.settings.autoControls && preventControlUpdate != true) updateAutoControls('start');
		}
		
		/**
		 * Returns current slide index (zero-based)
		 */
		el.getCurrentSlide = function(){
			return slider.active.index;
		}
		
		/**
		 * Returns number of slides in show
		 */
		el.getSlideCount = function(){
			return slider.children.length;
		}

		/**
		 * Update all dynamic slider elements
		 */
		el.redrawSlider = function(){
			// resize all children in ratio to new screen size
			slider.children.add(el.find('.bx-clone')).width(getSlideWidth());
			// adjust the height
			slider.viewport.css('height', getViewportHeight());
			// update the slide position
			if(!slider.settings.ticker) setSlidePosition();
			// if active.last was true before the screen resize, we want
			// to keep it last no matter what screen size we end on
			if (slider.active.last) slider.active.index = getPagerQty() - 1;
			// if the active index (page) no longer exists due to the resize, simply set the index as last
			if (slider.active.index >= getPagerQty()) slider.active.last = true;
			// if a pager is being displayed and a custom pager is not being used, update it
			if(slider.settings.pager && !slider.settings.pagerCustom){
				populatePager();
				updatePagerActive(slider.active.index);
			}
		}

		/**
		 * Destroy the current instance of the slider (revert everything back to original state)
		 */
		el.destroySlider = function(){
			// don't do anything if slider has already been destroyed
			if(!slider.initialized) return;
			slider.initialized = false;
			$('.bx-clone', this).remove();
			slider.children.removeAttr('style');
			this.removeAttr('style').unwrap().unwrap();
			if(slider.controls.el) slider.controls.el.remove();
			if(slider.controls.next) slider.controls.next.remove();
			if(slider.controls.prev) slider.controls.prev.remove();
			if(slider.pagerEl) slider.pagerEl.remove();
			$('.bx-caption', this).remove();
			if(slider.controls.autoEl) slider.controls.autoEl.remove();
			clearInterval(slider.interval);
			$(window).unbind('resize', resizeWindow);
		}

		/**
		 * Reload the slider (revert all DOM changes, and re-initialize)
		 */
		el.reloadSlider = function(settings){
			if (settings != undefined) options = settings;
			el.destroySlider();
			init();
		}
		
		init();
		
		// returns the current jQuery object
		return this;
	}

})(jQuery);

/*!
 * jQuery imagesLoaded plugin v2.1.0
 * http://github.com/desandro/imagesloaded
 *
 * MIT License. by Paul Irish et al.
 */

/*jshint curly: true, eqeqeq: true, noempty: true, strict: true, undef: true, browser: true */
/*global jQuery: false */

(function(c,n){var l="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";c.fn.imagesLoaded=function(f){function m(){var b=c(i),a=c(h);d&&(h.length?d.reject(e,b,a):d.resolve(e));c.isFunction(f)&&f.call(g,e,b,a)}function j(b,a){b.src===l||-1!==c.inArray(b,k)||(k.push(b),a?h.push(b):i.push(b),c.data(b,"imagesLoaded",{isBroken:a,src:b.src}),o&&d.notifyWith(c(b),[a,e,c(i),c(h)]),e.length===k.length&&(setTimeout(m),e.unbind(".imagesLoaded")))}var g=this,d=c.isFunction(c.Deferred)?c.Deferred():
0,o=c.isFunction(d.notify),e=g.find("img").add(g.filter("img")),k=[],i=[],h=[];c.isPlainObject(f)&&c.each(f,function(b,a){if("callback"===b)f=a;else if(d)d[b](a)});e.length?e.bind("load.imagesLoaded error.imagesLoaded",function(b){j(b.target,"error"===b.type)}).each(function(b,a){var d=a.src,e=c.data(a,"imagesLoaded");if(e&&e.src===d)j(a,e.isBroken);else if(a.complete&&a.naturalWidth!==n)j(a,0===a.naturalWidth||0===a.naturalHeight);else if(a.readyState||a.complete)a.src=l,a.src=d}):m();return d?d.promise(g):
g}})(jQuery);



(function($,window){
  '$:nomunge'; // Used by YUI compressor.
  
  // Some convenient shortcuts.
  var undefined,
    aps = Array.prototype.slice,
    decode = decodeURIComponent,
    
    // Method / object references.
    jq_param = $.param,
    jq_param_fragment,
    jq_deparam,
    jq_deparam_fragment,
    jq_bbq = $.bbq = $.bbq || {},
    jq_bbq_pushState,
    jq_bbq_getState,
    jq_elemUrlAttr,
    jq_event_special = $.event.special,
    
    // Reused strings.
    str_hashchange = 'hashchange',
    str_querystring = 'querystring',
    str_fragment = 'fragment',
    str_elemUrlAttr = 'elemUrlAttr',
    str_location = 'location',
    str_href = 'href',
    str_src = 'src',
    
    // Reused RegExp.
    re_trim_querystring = /^.*\?|#.*$/g,
    re_trim_fragment = /^.*\#/,
    re_no_escape,
    
    // Used by jQuery.elemUrlAttr.
    elemUrlAttr_cache = {};
  
  // A few commonly used bits, broken out to help reduce minified file size.
  function is_string( arg ) {
    return typeof arg === 'string';
  };
  
  // Why write the same function twice? Let's curry! Mmmm, curry..
  
  function curry( func ) {
    var args = aps.call( arguments, 1 );
    
    return function() {
      return func.apply( this, args.concat( aps.call( arguments ) ) );
    };
  };
  
  // Get location.hash (or what you'd expect location.hash to be) sans any
  // leading #. Thanks for making this necessary, Firefox!
  function get_fragment( url ) {
    return url.replace( /^[^#]*#?(.*)$/, '$1' );
  };
  
  // Get location.search (or what you'd expect location.search to be) sans any
  // leading #. Thanks for making this necessary, IE6!
  function get_querystring( url ) {
    return url.replace( /(?:^[^?#]*\?([^#]*).*$)?.*/, '$1' );
  };
  
  // Section: Param (to string)
  // 
  // Method: jQuery.param.querystring
  // 
  // Retrieve the query string from a URL or if no arguments are passed, the
  // current window.location.
  // 
  // Usage:
  // 
  // > jQuery.param.querystring( [ url ] );
  // 
  // Arguments:
  // 
  //  url - (String) A URL containing query string params to be parsed. If url
  //    is not passed, the current window.location is used.
  // 
  // Returns:
  // 
  //  (String) The parsed query string, with any leading "?" removed.
  //
  
  // Method: jQuery.param.querystring (build url)
  // 
  // Merge a URL, with or without pre-existing query string params, plus any
  // object, params string or URL containing query string params into a new URL.
  // 
  // Usage:
  // 
  // > jQuery.param.querystring( url, params [, merge_mode ] );
  // 
  // Arguments:
  // 
  //  url - (String) A valid URL for params to be merged into. This URL may
  //    contain a query string and/or fragment (hash).
  //  params - (String) A params string or URL containing query string params to
  //    be merged into url.
  //  params - (Object) A params object to be merged into url.
  //  merge_mode - (Number) Merge behavior defaults to 0 if merge_mode is not
  //    specified, and is as-follows:
  // 
  //    * 0: params in the params argument will override any query string
  //         params in url.
  //    * 1: any query string params in url will override params in the params
  //         argument.
  //    * 2: params argument will completely replace any query string in url.
  // 
  // Returns:
  // 
  //  (String) Either a params string with urlencoded data or a URL with a
  //    urlencoded query string in the format 'a=b&c=d&e=f'.
  
  // Method: jQuery.param.fragment
  // 
  // Retrieve the fragment (hash) from a URL or if no arguments are passed, the
  // current window.location.
  // 
  // Usage:
  // 
  // > jQuery.param.fragment( [ url ] );
  // 
  // Arguments:
  // 
  //  url - (String) A URL containing fragment (hash) params to be parsed. If
  //    url is not passed, the current window.location is used.
  // 
  // Returns:
  // 
  //  (String) The parsed fragment (hash) string, with any leading "#" removed.
  
  // Method: jQuery.param.fragment (build url)
  // 
  // Merge a URL, with or without pre-existing fragment (hash) params, plus any
  // object, params string or URL containing fragment (hash) params into a new
  // URL.
  // 
  // Usage:
  // 
  // > jQuery.param.fragment( url, params [, merge_mode ] );
  // 
  // Arguments:
  // 
  //  url - (String) A valid URL for params to be merged into. This URL may
  //    contain a query string and/or fragment (hash).
  //  params - (String) A params string or URL containing fragment (hash) params
  //    to be merged into url.
  //  params - (Object) A params object to be merged into url.
  //  merge_mode - (Number) Merge behavior defaults to 0 if merge_mode is not
  //    specified, and is as-follows:
  // 
  //    * 0: params in the params argument will override any fragment (hash)
  //         params in url.
  //    * 1: any fragment (hash) params in url will override params in the
  //         params argument.
  //    * 2: params argument will completely replace any query string in url.
  // 
  // Returns:
  // 
  //  (String) Either a params string with urlencoded data or a URL with a
  //    urlencoded fragment (hash) in the format 'a=b&c=d&e=f'.
  
  function jq_param_sub( is_fragment, get_func, url, params, merge_mode ) {
    var result,
      qs,
      matches,
      url_params,
      hash;
    
    if ( params !== undefined ) {
      // Build URL by merging params into url string.
      
      // matches[1] = url part that precedes params, not including trailing ?/#
      // matches[2] = params, not including leading ?/#
      // matches[3] = if in 'querystring' mode, hash including leading #, otherwise ''
      matches = url.match( is_fragment ? /^([^#]*)\#?(.*)$/ : /^([^#?]*)\??([^#]*)(#?.*)/ );
      
      // Get the hash if in 'querystring' mode, and it exists.
      hash = matches[3] || '';
      
      if ( merge_mode === 2 && is_string( params ) ) {
        // If merge_mode is 2 and params is a string, merge the fragment / query
        // string into the URL wholesale, without converting it into an object.
        qs = params.replace( is_fragment ? re_trim_fragment : re_trim_querystring, '' );
        
      } else {
        // Convert relevant params in url to object.
        url_params = jq_deparam( matches[2] );
        
        params = is_string( params )
          
          // Convert passed params string into object.
          ? jq_deparam[ is_fragment ? str_fragment : str_querystring ]( params )
          
          // Passed params object.
          : params;
        
        qs = merge_mode === 2 ? params                              // passed params replace url params
          : merge_mode === 1  ? $.extend( {}, params, url_params )  // url params override passed params
          : $.extend( {}, url_params, params );                     // passed params override url params
        
        // Convert params object to a string.
        qs = jq_param( qs );
        
        // Unescape characters specified via $.param.noEscape. Since only hash-
        // history users have requested this feature, it's only enabled for
        // fragment-related params strings.
        if ( is_fragment ) {
          qs = qs.replace( re_no_escape, decode );
        }
      }
      
      // Build URL from the base url, querystring and hash. In 'querystring'
      // mode, ? is only added if a query string exists. In 'fragment' mode, #
      // is always added.
      result = matches[1] + ( is_fragment ? '#' : qs || !matches[1] ? '?' : '' ) + qs + hash;
      
    } else {
      // If URL was passed in, parse params from URL string, otherwise parse
      // params from window.location.
      result = get_func( url !== undefined ? url : window[ str_location ][ str_href ] );
    }
    
    return result;
  };
  
  jq_param[ str_querystring ]                  = curry( jq_param_sub, 0, get_querystring );
  jq_param[ str_fragment ] = jq_param_fragment = curry( jq_param_sub, 1, get_fragment );
  
  // Method: jQuery.param.fragment.noEscape
  // 
  // Specify characters that will be left unescaped when fragments are created
  // or merged using <jQuery.param.fragment>, or when the fragment is modified
  // using <jQuery.bbq.pushState>. This option only applies to serialized data
  // object fragments, and not set-as-string fragments. Does not affect the
  // query string. Defaults to ",/" (comma, forward slash).
  // 
  // Note that this is considered a purely aesthetic option, and will help to
  // create URLs that "look pretty" in the address bar or bookmarks, without
  // affecting functionality in any way. That being said, be careful to not
  // unescape characters that are used as delimiters or serve a special
  // purpose, such as the "#?&=+" (octothorpe, question mark, ampersand,
  // equals, plus) characters.
  // 
  // Usage:
  // 
  // > jQuery.param.fragment.noEscape( [ chars ] );
  // 
  // Arguments:
  // 
  //  chars - (String) The characters to not escape in the fragment. If
  //    unspecified, defaults to empty string (escape all characters).
  // 
  // Returns:
  // 
  //  Nothing.
  
  jq_param_fragment.noEscape = function( chars ) {
    chars = chars || '';
    var arr = $.map( chars.split(''), encodeURIComponent );
    re_no_escape = new RegExp( arr.join('|'), 'g' );
  };
  
  // A sensible default. These are the characters people seem to complain about
  // "uglifying up the URL" the most.
  jq_param_fragment.noEscape( ',/' );
  
  // Section: Deparam (from string)
  // 
  // Method: jQuery.deparam
  // 
  // Deserialize a params string into an object, optionally coercing numbers,
  // booleans, null and undefined values; this method is the counterpart to the
  // internal jQuery.param method.
  // 
  // Usage:
  // 
  // > jQuery.deparam( params [, coerce ] );
  // 
  // Arguments:
  // 
  //  params - (String) A params string to be parsed.
  //  coerce - (Boolean) If true, coerces any numbers or true, false, null, and
  //    undefined to their actual value. Defaults to false if omitted.
  // 
  // Returns:
  // 
  //  (Object) An object representing the deserialized params string.
  
  $.deparam = jq_deparam = function( params, coerce ) {
    var obj = {},
      coerce_types = { 'true': !0, 'false': !1, 'null': null };
    
    // Iterate over all name=value pairs.
    $.each( params.replace( /\+/g, ' ' ).split( '&' ), function(j,v){
      var param = v.split( '=' ),
        key = decode( param[0] ),
        val,
        cur = obj,
        i = 0,
        
        // If key is more complex than 'foo', like 'a[]' or 'a[b][c]', split it
        // into its component parts.
        keys = key.split( '][' ),
        keys_last = keys.length - 1;
      
      // If the first keys part contains [ and the last ends with ], then []
      // are correctly balanced.
      if ( /\[/.test( keys[0] ) && /\]$/.test( keys[ keys_last ] ) ) {
        // Remove the trailing ] from the last keys part.
        keys[ keys_last ] = keys[ keys_last ].replace( /\]$/, '' );
        
        // Split first keys part into two parts on the [ and add them back onto
        // the beginning of the keys array.
        keys = keys.shift().split('[').concat( keys );
        
        keys_last = keys.length - 1;
      } else {
        // Basic 'foo' style key.
        keys_last = 0;
      }
      
      // Are we dealing with a name=value pair, or just a name?
      if ( param.length === 2 ) {
        val = decode( param[1] );
        
        // Coerce values.
        if ( coerce ) {
          val = val && !isNaN(val)            ? +val              // number
            : val === 'undefined'             ? undefined         // undefined
            : coerce_types[val] !== undefined ? coerce_types[val] // true, false, null
            : val;                                                // string
        }
        
        if ( keys_last ) {
          // Complex key, build deep object structure based on a few rules:
          // * The 'cur' pointer starts at the object top-level.
          // * [] = array push (n is set to array length), [n] = array if n is 
          //   numeric, otherwise object.
          // * If at the last keys part, set the value.
          // * For each keys part, if the current level is undefined create an
          //   object or array based on the type of the next keys part.
          // * Move the 'cur' pointer to the next level.
          // * Rinse & repeat.
          for ( ; i <= keys_last; i++ ) {
            key = keys[i] === '' ? cur.length : keys[i];
            cur = cur[key] = i < keys_last
              ? cur[key] || ( keys[i+1] && isNaN( keys[i+1] ) ? {} : [] )
              : val;
          }
          
        } else {
          // Simple key, even simpler rules, since only scalars and shallow
          // arrays are allowed.
          
          if ( $.isArray( obj[key] ) ) {
            // val is already an array, so push on the next value.
            obj[key].push( val );
            
          } else if ( obj[key] !== undefined ) {
            // val isn't an array, but since a second value has been specified,
            // convert val into an array.
            obj[key] = [ obj[key], val ];
            
          } else {
            // val is a scalar.
            obj[key] = val;
          }
        }
        
      } else if ( key ) {
        // No value was defined, so set something meaningful.
        obj[key] = coerce
          ? undefined
          : '';
      }
    });
    
    return obj;
  };
  
  // Method: jQuery.deparam.querystring
  // 
  // Parse the query string from a URL or the current window.location,
  // deserializing it into an object, optionally coercing numbers, booleans,
  // null and undefined values.
  // 
  // Usage:
  // 
  // > jQuery.deparam.querystring( [ url ] [, coerce ] );
  // 
  // Arguments:
  // 
  //  url - (String) An optional params string or URL containing query string
  //    params to be parsed. If url is omitted, the current window.location
  //    is used.
  //  coerce - (Boolean) If true, coerces any numbers or true, false, null, and
  //    undefined to their actual value. Defaults to false if omitted.
  // 
  // Returns:
  // 
  //  (Object) An object representing the deserialized params string.
  
  // Method: jQuery.deparam.fragment
  // 
  // Parse the fragment (hash) from a URL or the current window.location,
  // deserializing it into an object, optionally coercing numbers, booleans,
  // null and undefined values.
  // 
  // Usage:
  // 
  // > jQuery.deparam.fragment( [ url ] [, coerce ] );
  // 
  // Arguments:
  // 
  //  url - (String) An optional params string or URL containing fragment (hash)
  //    params to be parsed. If url is omitted, the current window.location
  //    is used.
  //  coerce - (Boolean) If true, coerces any numbers or true, false, null, and
  //    undefined to their actual value. Defaults to false if omitted.
  // 
  // Returns:
  // 
  //  (Object) An object representing the deserialized params string.
  
  function jq_deparam_sub( is_fragment, url_or_params, coerce ) {
    if ( url_or_params === undefined || typeof url_or_params === 'boolean' ) {
      // url_or_params not specified.
      coerce = url_or_params;
      url_or_params = jq_param[ is_fragment ? str_fragment : str_querystring ]();
    } else {
      url_or_params = is_string( url_or_params )
        ? url_or_params.replace( is_fragment ? re_trim_fragment : re_trim_querystring, '' )
        : url_or_params;
    }
    
    return jq_deparam( url_or_params, coerce );
  };
  
  jq_deparam[ str_querystring ]                    = curry( jq_deparam_sub, 0 );
  jq_deparam[ str_fragment ] = jq_deparam_fragment = curry( jq_deparam_sub, 1 );
  
  // Section: Element manipulation
  // 
  // Method: jQuery.elemUrlAttr
  // 
  // Get the internal "Default URL attribute per tag" list, or augment the list
  // with additional tag-attribute pairs, in case the defaults are insufficient.
  // 
  // In the <jQuery.fn.querystring> and <jQuery.fn.fragment> methods, this list
  // is used to determine which attribute contains the URL to be modified, if
  // an "attr" param is not specified.
  // 
  // Default Tag-Attribute List:
  // 
  //  a      - href
  //  base   - href
  //  iframe - src
  //  img    - src
  //  input  - src
  //  form   - action
  //  link   - href
  //  script - src
  // 
  // Usage:
  // 
  // > jQuery.elemUrlAttr( [ tag_attr ] );
  // 
  // Arguments:
  // 
  //  tag_attr - (Object) An object containing a list of tag names and their
  //    associated default attribute names in the format { tag: 'attr', ... } to
  //    be merged into the internal tag-attribute list.
  // 
  // Returns:
  // 
  //  (Object) An object containing all stored tag-attribute values.
  
  // Only define function and set defaults if function doesn't already exist, as
  // the urlInternal plugin will provide this method as well.
  $[ str_elemUrlAttr ] || ($[ str_elemUrlAttr ] = function( obj ) {
    return $.extend( elemUrlAttr_cache, obj );
  })({
    a: str_href,
    base: str_href,
    iframe: str_src,
    img: str_src,
    input: str_src,
    form: 'action',
    link: str_href,
    script: str_src
  });
  
  jq_elemUrlAttr = $[ str_elemUrlAttr ];
  
  // Method: jQuery.fn.querystring
  // 
  // Update URL attribute in one or more elements, merging the current URL (with
  // or without pre-existing query string params) plus any params object or
  // string into a new URL, which is then set into that attribute. Like
  // <jQuery.param.querystring (build url)>, but for all elements in a jQuery
  // collection.
  // 
  // Usage:
  // 
  // > jQuery('selector').querystring( [ attr, ] params [, merge_mode ] );
  // 
  // Arguments:
  // 
  //  attr - (String) Optional name of an attribute that will contain a URL to
  //    merge params or url into. See <jQuery.elemUrlAttr> for a list of default
  //    attributes.
  //  params - (Object) A params object to be merged into the URL attribute.
  //  params - (String) A URL containing query string params, or params string
  //    to be merged into the URL attribute.
  //  merge_mode - (Number) Merge behavior defaults to 0 if merge_mode is not
  //    specified, and is as-follows:
  //    
  //    * 0: params in the params argument will override any params in attr URL.
  //    * 1: any params in attr URL will override params in the params argument.
  //    * 2: params argument will completely replace any query string in attr
  //         URL.
  // 
  // Returns:
  // 
  //  (jQuery) The initial jQuery collection of elements, but with modified URL
  //  attribute values.
  
  // Method: jQuery.fn.fragment
  // 
  // Update URL attribute in one or more elements, merging the current URL (with
  // or without pre-existing fragment/hash params) plus any params object or
  // string into a new URL, which is then set into that attribute. Like
  // <jQuery.param.fragment (build url)>, but for all elements in a jQuery
  // collection.
  // 
  // Usage:
  // 
  // > jQuery('selector').fragment( [ attr, ] params [, merge_mode ] );
  // 
  // Arguments:
  // 
  //  attr - (String) Optional name of an attribute that will contain a URL to
  //    merge params into. See <jQuery.elemUrlAttr> for a list of default
  //    attributes.
  //  params - (Object) A params object to be merged into the URL attribute.
  //  params - (String) A URL containing fragment (hash) params, or params
  //    string to be merged into the URL attribute.
  //  merge_mode - (Number) Merge behavior defaults to 0 if merge_mode is not
  //    specified, and is as-follows:
  //    
  //    * 0: params in the params argument will override any params in attr URL.
  //    * 1: any params in attr URL will override params in the params argument.
  //    * 2: params argument will completely replace any fragment (hash) in attr
  //         URL.
  // 
  // Returns:
  // 
  //  (jQuery) The initial jQuery collection of elements, but with modified URL
  //  attribute values.
  
  function jq_fn_sub( mode, force_attr, params, merge_mode ) {
    if ( !is_string( params ) && typeof params !== 'object' ) {
      // force_attr not specified.
      merge_mode = params;
      params = force_attr;
      force_attr = undefined;
    }
    
    return this.each(function(){
      var that = $(this),
        
        // Get attribute specified, or default specified via $.elemUrlAttr.
        attr = force_attr || jq_elemUrlAttr()[ ( this.nodeName || '' ).toLowerCase() ] || '',
        
        // Get URL value.
        url = attr && that.attr( attr ) || '';
      
      // Update attribute with new URL.
      that.attr( attr, jq_param[ mode ]( url, params, merge_mode ) );
    });
    
  };
  
  $.fn[ str_querystring ] = curry( jq_fn_sub, str_querystring );
  $.fn[ str_fragment ]    = curry( jq_fn_sub, str_fragment );
  
  // Section: History, hashchange event
  // 
  // Method: jQuery.bbq.pushState
  // 
  // Adds a 'state' into the browser history at the current position, setting
  // location.hash and triggering any bound <hashchange event> callbacks
  // (provided the new state is different than the previous state).
  // 
  // If no arguments are passed, an empty state is created, which is just a
  // shortcut for jQuery.bbq.pushState( {}, 2 ).
  // 
  // Usage:
  // 
  // > jQuery.bbq.pushState( [ params [, merge_mode ] ] );
  // 
  // Arguments:
  // 
  //  params - (String) A serialized params string or a hash string beginning
  //    with # to merge into location.hash.
  //  params - (Object) A params object to merge into location.hash.
  //  merge_mode - (Number) Merge behavior defaults to 0 if merge_mode is not
  //    specified (unless a hash string beginning with # is specified, in which
  //    case merge behavior defaults to 2), and is as-follows:
  // 
  //    * 0: params in the params argument will override any params in the
  //         current state.
  //    * 1: any params in the current state will override params in the params
  //         argument.
  //    * 2: params argument will completely replace current state.
  // 
  // Returns:
  // 
  //  Nothing.
  // 
  // Additional Notes:
  // 
  //  * Setting an empty state may cause the browser to scroll.
  //  * Unlike the fragment and querystring methods, if a hash string beginning
  //    with # is specified as the params agrument, merge_mode defaults to 2.
  
  jq_bbq.pushState = jq_bbq_pushState = function( params, merge_mode ) {
    if ( is_string( params ) && /^#/.test( params ) && merge_mode === undefined ) {
      // Params string begins with # and merge_mode not specified, so completely
      // overwrite window.location.hash.
      merge_mode = 2;
    }
    
    var has_args = params !== undefined,
      // Merge params into window.location using $.param.fragment.
      url = jq_param_fragment( window[ str_location ][ str_href ],
        has_args ? params : {}, has_args ? merge_mode : 2 );
    
    // Set new window.location.href. If hash is empty, use just # to prevent
    // browser from reloading the page. Note that Safari 3 & Chrome barf on
    // location.hash = '#'.
    window[ str_location ][ str_href ] = url + ( /#/.test( url ) ? '' : '#' );
  };
  
  // Method: jQuery.bbq.getState
  // 
  // Retrieves the current 'state' from the browser history, parsing
  // location.hash for a specific key or returning an object containing the
  // entire state, optionally coercing numbers, booleans, null and undefined
  // values.
  // 
  // Usage:
  // 
  // > jQuery.bbq.getState( [ key ] [, coerce ] );
  // 
  // Arguments:
  // 
  //  key - (String) An optional state key for which to return a value.
  //  coerce - (Boolean) If true, coerces any numbers or true, false, null, and
  //    undefined to their actual value. Defaults to false.
  // 
  // Returns:
  // 
  //  (Anything) If key is passed, returns the value corresponding with that key
  //    in the location.hash 'state', or undefined. If not, an object
  //    representing the entire 'state' is returned.
  
  jq_bbq.getState = jq_bbq_getState = function( key, coerce ) {
    return key === undefined || typeof key === 'boolean'
      ? jq_deparam_fragment( key ) // 'key' really means 'coerce' here
      : jq_deparam_fragment( coerce )[ key ];
  };
  
  // Method: jQuery.bbq.removeState
  // 
  // Remove one or more keys from the current browser history 'state', creating
  // a new state, setting location.hash and triggering any bound
  // <hashchange event> callbacks (provided the new state is different than
  // the previous state).
  // 
  // If no arguments are passed, an empty state is created, which is just a
  // shortcut for jQuery.bbq.pushState( {}, 2 ).
  // 
  // Usage:
  // 
  // > jQuery.bbq.removeState( [ key [, key ... ] ] );
  // 
  // Arguments:
  // 
  //  key - (String) One or more key values to remove from the current state,
  //    passed as individual arguments.
  //  key - (Array) A single array argument that contains a list of key values
  //    to remove from the current state.
  // 
  // Returns:
  // 
  //  Nothing.
  // 
  // Additional Notes:
  // 
  //  * Setting an empty state may cause the browser to scroll.
  
  jq_bbq.removeState = function( arr ) {
    var state = {};
    
    // If one or more arguments is passed..
    if ( arr !== undefined ) {
      
      // Get the current state.
      state = jq_bbq_getState();
      
      // For each passed key, delete the corresponding property from the current
      // state.
      $.each( $.isArray( arr ) ? arr : arguments, function(i,v){
        delete state[ v ];
      });
    }
    
    // Set the state, completely overriding any existing state.
    jq_bbq_pushState( state, 2 );
  };
  
  // Event: hashchange event (BBQ)
  // 
  // Usage in jQuery 1.4 and newer:
  // 
  // In jQuery 1.4 and newer, the event object passed into any hashchange event
  // callback is augmented with a copy of the location.hash fragment at the time
  // the event was triggered as its event.fragment property. In addition, the
  // event.getState method operates on this property (instead of location.hash)
  // which allows this fragment-as-a-state to be referenced later, even after
  // window.location may have changed.
  // 
  // Note that event.fragment and event.getState are not defined according to
  // W3C (or any other) specification, but will still be available whether or
  // not the hashchange event exists natively in the browser, because of the
  // utility they provide.
  // 
  // The event.fragment property contains the output of <jQuery.param.fragment>
  // and the event.getState method is equivalent to the <jQuery.bbq.getState>
  // method.
  // 
  // > $(window).bind( 'hashchange', function( event ) {
  // >   var hash_str = event.fragment,
  // >     param_obj = event.getState(),
  // >     param_val = event.getState( 'param_name' ),
  // >     param_val_coerced = event.getState( 'param_name', true );
  // >   ...
  // > });
  // 
  // Usage in jQuery 1.3.2:
  // 
  // In jQuery 1.3.2, the event object cannot to be augmented as in jQuery 1.4+,
  // so the fragment state isn't bound to the event object and must instead be
  // parsed using the <jQuery.param.fragment> and <jQuery.bbq.getState> methods.
  // 
  // > $(window).bind( 'hashchange', function( event ) {
  // >   var hash_str = $.param.fragment(),
  // >     param_obj = $.bbq.getState(),
  // >     param_val = $.bbq.getState( 'param_name' ),
  // >     param_val_coerced = $.bbq.getState( 'param_name', true );
  // >   ...
  // > });
  // 
  // Additional Notes:
  // 
  // * Due to changes in the special events API, jQuery BBQ v1.2 or newer is
  //   required to enable the augmented event object in jQuery 1.4.2 and newer.
  // * See <jQuery hashchange event> for more detailed information.
  
  jq_event_special[ str_hashchange ] = $.extend( jq_event_special[ str_hashchange ], {
    
    // Augmenting the event object with the .fragment property and .getState
    // method requires jQuery 1.4 or newer. Note: with 1.3.2, everything will
    // work, but the event won't be augmented)
    add: function( handleObj ) {
      var old_handler;
      
      function new_handler(e) {
        // e.fragment is set to the value of location.hash (with any leading #
        // removed) at the time the event is triggered.
        var hash = e[ str_fragment ] = jq_param_fragment();
        
        // e.getState() works just like $.bbq.getState(), but uses the
        // e.fragment property stored on the event object.
        e.getState = function( key, coerce ) {
          return key === undefined || typeof key === 'boolean'
            ? jq_deparam( hash, key ) // 'key' really means 'coerce' here
            : jq_deparam( hash, coerce )[ key ];
        };
        
        old_handler.apply( this, arguments );
      };
      
      // This may seem a little complicated, but it normalizes the special event
      // .add method between jQuery 1.4/1.4.1 and 1.4.2+
      if ( $.isFunction( handleObj ) ) {
        // 1.4, 1.4.1
        old_handler = handleObj;
        return new_handler;
      } else {
        // 1.4.2+
        old_handler = handleObj.handler;
        handleObj.handler = new_handler;
      }
    }
    
  });
  
})(jQuery,this);

/*!
 * jQuery hashchange event - v1.2 - 2/11/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

// Script: jQuery hashchange event
//
// *Version: 1.2, Last updated: 2/11/2010*
// 
// Project Home - http://benalman.com/projects/jquery-hashchange-plugin/
// GitHub       - http://github.com/cowboy/jquery-hashchange/
// Source       - http://github.com/cowboy/jquery-hashchange/raw/master/jquery.ba-hashchange.js
// (Minified)   - http://github.com/cowboy/jquery-hashchange/raw/master/jquery.ba-hashchange.min.js (1.1kb)
// 
// About: License
// 
// Copyright (c) 2010 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
// 
// About: Examples
// 
// This working example, complete with fully commented code, illustrate one way
// in which this plugin can be used.
// 
// hashchange event - http://benalman.com/code/projects/jquery-hashchange/examples/hashchange/
// 
// About: Support and Testing
// 
// Information about what version or versions of jQuery this plugin has been
// tested with, what browsers it has been tested in, and where the unit tests
// reside (so you can test it yourself).
// 
// jQuery Versions - 1.3.2, 1.4.1, 1.4.2
// Browsers Tested - Internet Explorer 6-8, Firefox 2-3.7, Safari 3-4, Chrome, Opera 9.6-10.1.
// Unit Tests      - http://benalman.com/code/projects/jquery-hashchange/unit/
// 
// About: Known issues
// 
// While this jQuery hashchange event implementation is quite stable and robust,
// there are a few unfortunate browser bugs surrounding expected hashchange
// event-based behaviors, independent of any JavaScript window.onhashchange
// abstraction. See the following examples for more information:
// 
// Chrome: Back Button - http://benalman.com/code/projects/jquery-hashchange/examples/bug-chrome-back-button/
// Firefox: Remote XMLHttpRequest - http://benalman.com/code/projects/jquery-hashchange/examples/bug-firefox-remote-xhr/
// WebKit: Back Button in an Iframe - http://benalman.com/code/projects/jquery-hashchange/examples/bug-webkit-hash-iframe/
// Safari: Back Button from a different domain - http://benalman.com/code/projects/jquery-hashchange/examples/bug-safari-back-from-diff-domain/
// 
// About: Release History
// 
// 1.2   - (2/11/2010) Fixed a bug where coming back to a page using this plugin
//         from a page on another domain would cause an error in Safari 4. Also,
//         IE6/7 Iframe is now inserted after the body (this actually works),
//         which prevents the page from scrolling when the event is first bound.
//         Event can also now be bound before DOM ready, but it won't be usable
//         before then in IE6/7.
// 1.1   - (1/21/2010) Incorporated document.documentMode test to fix IE8 bug
//         where browser version is incorrectly reported as 8.0, despite
//         inclusion of the X-UA-Compatible IE=EmulateIE7 meta tag.
// 1.0   - (1/9/2010) Initial Release. Broke out the jQuery BBQ event.special
//         window.onhashchange functionality into a separate plugin for users
//         who want just the basic event & back button support, without all the
//         extra awesomeness that BBQ provides. This plugin will be included as
//         part of jQuery BBQ, but also be available separately.

(function($,window,undefined){
  '$:nomunge'; // Used by YUI compressor.
  
  // Method / object references.
  var fake_onhashchange,
    jq_event_special = $.event.special,
    
    // Reused strings.
    str_location = 'location',
    str_hashchange = 'hashchange',
    str_href = 'href',
    
    // IE6/7 specifically need some special love when it comes to back-button
    // support, so let's do a little browser sniffing..
    browser = $.browser,
    mode = document.documentMode,
    is_old_ie = browser.msie && ( mode === undefined || mode < 8 ),
    
    // Does the browser support window.onhashchange? Test for IE version, since
    // IE8 incorrectly reports this when in "IE7" or "IE8 Compatibility View"!
    supports_onhashchange = 'on' + str_hashchange in window && !is_old_ie;
  
  // Get location.hash (or what you'd expect location.hash to be) sans any
  // leading #. Thanks for making this necessary, Firefox!
  function get_fragment( url ) {
    url = url || window[ str_location ][ str_href ];
    return url.replace( /^[^#]*#?(.*)$/, '$1' );
  };
  
  // Property: jQuery.hashchangeDelay
  // 
  // The numeric interval (in milliseconds) at which the <hashchange event>
  // polling loop executes. Defaults to 100.
  
  $[ str_hashchange + 'Delay' ] = 100;
  
  // Event: hashchange event
  // 
  // Fired when location.hash changes. In browsers that support it, the native
  // window.onhashchange event is used (IE8, FF3.6), otherwise a polling loop is
  // initialized, running every <jQuery.hashchangeDelay> milliseconds to see if
  // the hash has changed. In IE 6 and 7, a hidden Iframe is created to allow
  // the back button and hash-based history to work.
  // 
  // Usage:
  // 
  // > $(window).bind( 'hashchange', function(e) {
  // >   var hash = location.hash;
  // >   ...
  // > });
  // 
  // Additional Notes:
  // 
  // * The polling loop and Iframe are not created until at least one callback
  //   is actually bound to 'hashchange'.
  // * If you need the bound callback(s) to execute immediately, in cases where
  //   the page 'state' exists on page load (via bookmark or page refresh, for
  //   example) use $(window).trigger( 'hashchange' );
  // * The event can be bound before DOM ready, but since it won't be usable
  //   before then in IE6/7 (due to the necessary Iframe), recommended usage is
  //   to bind it inside a $(document).ready() callback.
  
  jq_event_special[ str_hashchange ] = $.extend( jq_event_special[ str_hashchange ], {
    
    // Called only when the first 'hashchange' event is bound to window.
    setup: function() {
      // If window.onhashchange is supported natively, there's nothing to do..
      if ( supports_onhashchange ) { return false; }
      
      // Otherwise, we need to create our own. And we don't want to call this
      // until the user binds to the event, just in case they never do, since it
      // will create a polling loop and possibly even a hidden Iframe.
      $( fake_onhashchange.start );
    },
    
    // Called only when the last 'hashchange' event is unbound from window.
    teardown: function() {
      // If window.onhashchange is supported natively, there's nothing to do..
      if ( supports_onhashchange ) { return false; }
      
      // Otherwise, we need to stop ours (if possible).
      $( fake_onhashchange.stop );
    }
    
  });
  
  // fake_onhashchange does all the work of triggering the window.onhashchange
  // event for browsers that don't natively support it, including creating a
  // polling loop to watch for hash changes and in IE 6/7 creating a hidden
  // Iframe to enable back and forward.
  fake_onhashchange = (function(){
    var self = {},
      timeout_id,
      iframe,
      set_history,
      get_history;
    
    // Initialize. In IE 6/7, creates a hidden Iframe for history handling.
    function init(){
      // Most browsers don't need special methods here..
      set_history = get_history = function(val){ return val; };
      
      // But IE6/7 do!
      if ( is_old_ie ) {
        
        // Create hidden Iframe after the end of the body to prevent initial
        // page load from scrolling unnecessarily.
        iframe = $('<iframe src="javascript:0"/>').hide().insertAfter( 'body' )[0].contentWindow;
        
        // Get history by looking at the hidden Iframe's location.hash.
        get_history = function() {
          return get_fragment( iframe.document[ str_location ][ str_href ] );
        };
        
        // Set a new history item by opening and then closing the Iframe
        // document, *then* setting its location.hash.
        set_history = function( hash, history_hash ) {
          if ( hash !== history_hash ) {
            var doc = iframe.document;
            doc.open().close();
            doc[ str_location ].hash = '#' + hash;
          }
        };
        
        // Set initial history.
        set_history( get_fragment() );
      }
    };
    
    // Start the polling loop.
    self.start = function() {
      // Polling loop is already running!
      if ( timeout_id ) { return; }
      
      // Remember the initial hash so it doesn't get triggered immediately.
      var last_hash = get_fragment();
      
      // Initialize if not yet initialized.
      set_history || init();
      
      // This polling loop checks every $.hashchangeDelay milliseconds to see if
      // location.hash has changed, and triggers the 'hashchange' event on
      // window when necessary.
      (function loopy(){
        var hash = get_fragment(),
          history_hash = get_history( last_hash );
        
        if ( hash !== last_hash ) {
          set_history( last_hash = hash, history_hash );
          
          $(window).trigger( str_hashchange );
          
        } else if ( history_hash !== last_hash ) {
          window[ str_location ][ str_href ] = window[ str_location ][ str_href ].replace( /#.*/, '' ) + '#' + history_hash;
        }
        
        timeout_id = setTimeout( loopy, $[ str_hashchange + 'Delay' ] );
      })();
    };
    
    // Stop the polling loop, but only if an IE6/7 Iframe wasn't created. In
    // that case, even if there are no longer any bound event handlers, the
    // polling loop is still necessary for back/next to work at all!
    self.stop = function() {
      if ( !iframe ) {
        timeout_id && clearTimeout( timeout_id );
        timeout_id = 0;
      }
    };
    
    return self;
  })();
  
})(jQuery,this);


/*
Author: 		Brett Chaney
Description: 	Returns true if a mobile/tablet device is detected
*/

ND = window.ND = window.ND || {};

(function($){

	ND.detectMobile = {
		init:function() {

			var ua 		= navigator.userAgent || navigator.vendor || window.opera,
				uaReg1 	= /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(ua),
				uaReg2 	= /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.substr(0, 4));
			
			if (uaReg1 || uaReg2)  { 
				return true;
			}
			else {
				return false;
			}
		}
	};

	$(function(){
		ND.detectMobile.init();
	});

})(jQuery);


/*
Author: 		Doris
Description: 	Detect device system is ios or android
*/

ND = window.ND = window.ND || {};

(function($){

	ND.detectDevice = {
		
		isAndroid: function () {
		    return /Android/i.test(navigator.userAgent);
		},

		isIOS: function () {
		    return /iPhone|iPad|iPod|Mac OS X/i.test(navigator.userAgent);
		}

	};


})(jQuery);


(function($){
	
	var MegaMenu = function (container) {
		var menu = this;
		menu.container = container;
		menu.timeout = 100;
		menu.interval = 100;
		menu.sensitivity = 2;
		
		//hide li title bug 167937 Internal image ID will be shown up when mouse rollover to the extreme right of the vehicle image on the top navigation bar
		
		$("ul#nav > li").attr('title','');
		//end hide
		
		this.showMenu = function () {
			$(menu.container).addClass("active");
		};
		
		this.hideMenu = function () {
			$(menu.container).removeClass("active");
		};
		
		this.init = function () {
			// Hover over/out
			$(this.container).hoverIntent({
				over: this.showMenu,
				out: this.hideMenu,
				interval: this.interval,
				sensitivity: this.sensitivity,
				timeout: this.timeout
			});
			/*
			// Click
			$(this.container).bind("click", function () {
				menu.showMenu();
				return false;
			});
			*/
			// Close button
			$("DIV.close-button A").bind("click", function () {
				menu.hideMenu();
				return false;
			});
		};
	};
	
	$(function(){
		var megaMenuInit = function() {
			$(".top-level-menu ul#nav > li").each(function () {
				if ($(this).children("div.mega-menu").size() > 0 && $(window).width() > 976) {
					var megaMenu = new MegaMenu(this);
					megaMenu.init();
				}
				else if ($(this).children("div.menu").size() > 0 && $(window).width() > 976) {
					$(this).hover(
						function() {
							$(this).addClass("active");
						},
						function() {
							$(this).removeClass("active");
						}
					);
				}
			});
		};

		megaMenuInit();

		$(window).on('resize', function() {
  			megaMenuInit();
  		});
	});
	
})(jQuery);


/**
 * 
 */
var Translator = (function($,undefined) {
	var translations = {};
	return {
		translate : function(key) {
			var $translationsData = $("#translations");
			if ($translationsData.length > 0) {
				translations = $translationsData.embeddedData();
			}
			var result =  translations[key];
			if (result == null) {
				result = key;
			}
			return result;
		}
	};    
})(jQuery);


//Enhance HTML5 video player
/*
 * This js  is cut off ../../../../FTD2010/themes/ftd/js/video.js
Description: This is for displaying in-page single video
*/
(function($) {
  var ND = window.ND = window.ND || {};

  var settings;
  var video = ND.video = {
    // the deeplink only works when user open the page by default,
    // when user click sth. in video list, it will be false.
    deepLink : 1,
    fromLink : 0,

    defaults : {
      width : 593,
      height : 348,
      modes : [
          // Bug #146204: Enhanced Video Player - 30 box FOA - IE 8 - The
          // second time user clicks the video player, a js error will be
          // displayed.; html5 mode is not stable, disable it.
          {
            type : 'html5',
            config : {
              skin : "/themes/ftd/skin/glow/glow.xml"
            }
          }, 
          {
            type : 'flash',
            src : '/themes/ftd/swf/player.swf',
            config : {
              skin : "/themes/ftd/skin/glow.zip"
            }
          } ],
      // Close tracking by default (begin, 25, 50, 75, finish)
      track : "00000",
      play : false
    },

    init : function(options) {
      settings = $.extend( {}, video.defaults, options);
      //console.log(settings);

      video.load("jwplayer-js", "/themes/ftd/js/lib/jwplayer.js");

      $ready("jwplayer", video.setup);

    },

    //load script dynamicly
    load: function(id, src){
      if(document.getElementById(id)) return;

      var js, fjs = document.getElementsByTagName("script")[0];
      js = document.createElement("script");
      js.id = id;
      js.src = src;
      fjs.parentNode.insertBefore(js, fjs);
    },

    // set up jwplayer
    setup: function(){
      // setup video list

      if (!video.fromLink) {
         // alternative image
         var imageUrl = $(".video-image img").attr("src");        
         var playerOption = {
            image : imageUrl,
            modes : settings.modes,
            //controlbar: "none",
            levels : [ {
              type : 'video/mp4',
              file : settings.file
            } ],
            width : settings.width,
            height : settings.height,
            'plugins' : {}
          }

          if(settings.controlbar){
            playerOption.controlbar = "none";
          }

          if (settings.caption) {
            playerOption["plugins"]["captions-2"] = {
              "file" : settings.caption
            };
          }

          // setup video player         
          jwplayer("video-inner").setup(playerOption);
          // tracking impl
          settings.track != "00000" && video.track(settings);

          // autoplay interface
          settings.play && jwplayer().play();
        }
    },

    // track video
    track : function(settings) {
      // tracking flag
      var trackPos = { "0" : 1, "0.2" : 1, "0.5" : 1, "0.7" : 1, "0.8" : 1},
          ti = settings.title || "",
          dcsuri = settings.url || "",
          pname = settings.pname || "",
          hier = settings.hier|| "";

      jwplayer().onTime(function(e) {
        var percent = Math.round(e.position / e.duration * 10) / 10, action;
        var omTitle, omEvents;
        
        
        if (trackPos[percent]) {
          switch (percent) {
            case 0:
              if (settings.track.charAt(0) == "1") {
                action = "Play";
                omTitle = "video start";
                omEvents = "event56";
              }
              break;
            case 0.2:
              if (settings.track.charAt(1) == "1") {
                action = "Play 25";
              }
              break;
            case 0.5:
              if (settings.track.charAt(2) == "1") {
                action = "Play 50";
              }
              break;
            case 0.7:
              if (settings.track.charAt(3) == "1") {
                action = "Play 75";
              }
              break;
            case 0.8:
              if (settings.track.charAt(4) == "1") {
                action = "Finish";
                omTitle = "video finish";
                omEvents = "event57";
              }
              break;
          }

          trackPos[percent] = 0;

          if (omTitle && omEvents) {
        	  
        	  if( window._da && window._da.om && ND && ND.omniture ) {
        		  
        		  var clip_n = settings.clip_n || ti;
        		 
        		//  ND.omniture.trackLink({
        		//  	'link':true,
        		//	  	'onclicks':omTitle,
        		//	  	'events':omEvents,
        		//	  	'type':'o',
        		//	  	'content':clip_n,
        		//	  	'title':omTitle,
        		//	  	'nameplate':'none',
        		//	  	'pname':pname,
        		//	  	'hier1':hier
        		//	  	}
        		//  );

        		  $.publish('/analytics/link/', {
      			  	'link':true,
      			  	'onclicks':omTitle,
      			  	'events':omEvents,
      			  	'type':'o',
      			  	'content':clip_n,
      			  	'title':omTitle,
      			  	'nameplate':'none',
      			  	'pname':pname,
      			  	'hier1':hier
      			  	}
      		      );
        		  
        		  
        		  
    		  }
          }          
          
          if (action) {
            var clip_n = settings.clip_n || (ti + (e.duration>>0)) ;
          
            //console.log('action: ' + action + ' clip_n: ' + clip_n);
            //console.log(ND.analytics._tag);
            
            // Tracking implementation
            ND.analytics._tag.dcsMultiTrack(
                "WT.ti", ti + action,
                "DCS.dcsuri", (dcsuri + action.replace(/ /g, '')).toLowerCase().replace(/ /g, '-'),
                "WT.clip_ev", action.replace(/ /g,''),
                "WT.clip_n", clip_n,
                "WT.dl", 7
              );
          }
          
          
        }

      });

      // For replaying.
      jwplayer().onComplete(function(){
          trackPos = { "0" : 1, "0.2" : 1, "0.5" : 1, "0.7" : 1, "0.8" : 1};
      });
      
      var _flag = true;
      jwplayer().onFullscreen(function(videoInfo){//add ominture on video full screen only once per page load
      	var $link = $("#"+videoInfo.id).closest(".full-screen-trackable");
		if(_flag&&$link.length>0){
	  		
      		  ND.omniture.trackLink({
			  	   'link':true,
				   'onclicks':$link.attr('data-onclicks'),
				   'type':'o',
				   'title':$link.attr('data-title'),
				   'nameplate':$link.attr('data-nameplate'),
				   'pname':$link.attr("data-pname")
				   
      		 /*$.publish('/analytics/link', {
			  	   'link':true,
				   'onclicks':$link.attr('data-onclicks'),
				   'type':'o',
				   'title':$link.attr('data-title'),
				   'nameplate':$link.attr('data-nameplate'),
				   'pname':$link.attr("data-pname")*/
		  	});
		  	_flag = false;
      	}
       })
    }

  };
  $(function(){				
		if(!$("#video-config").size()) {return;}
		var videoConfig = $("#video-config").embeddedData();
		video.init(videoConfig);			
	});

})(jQuery);


//LABjs window.onload helper
if( window.isWindowLoaded === undefined ) {
	window.isWindowLoaded = false;
}

(function($, window, undefined){

	//namespacing
	var ND = window.ND = window.ND || {};
	ND.API = ND.api || {};
	
	//Protect from missing SiteConf page JS errors
	window.SiteConf = window.SiteConf || {}; 
	
	/* ND.urlParams Version 0.9 - Glenn Baker */
	ND.urlParams=function(){var d=function(s){var a=s.match(/[\%][a-fA-F0-9]{2}/g);for(o=0;a&&o<a.length;o++) {var hex=/[\%]([a-fA-F0-9]{2})/i.exec(a[o]).pop();s=s.replace(a[o],String.fromCharCode(parseInt(hex,16)));}return s;};if(!window.location['param']){window.location.param={};}var qs=window.location.href.match(/([^?=&]+)(=([^&#]*))?/g);for(i=0;i<qs.length;i++){if(qs[i].indexOf("=")>-1){var c=qs[i].split('=');var v=c.pop();var n=c.pop();window.location.param[n]=d(v);}}};ND.urlParams();
	
	
	// Pad with leading zeros
	ND.pad = function(num, size) {
	    var s = num+"";
	    while (s.length < size) s = "0" + s;
	    return s;
	};
	
	//ND is in the window scope.
	
	
	ND.selectCurrent = {
		init: function () {
		
			var $navs = $('#nav, #subnav, #leftnav'),
			
			getIds = function () {
				$("#breadcrumb LI").each(function (i) {
					if (i !== 0) {
						var id = $(this).attr("id");
						if (id !== undefined) {
							selectPage(id);
						}
					}
				});
			},
		
			selectPage = function (id) {
		
				$navs.each(function(){
					var $this = $(this),
						$UL = !$this.is('UL') ? $this.children("UL") : $this;
						
					$UL.children("LI").each(function (i) {
						var link = $(this).children("A"),
							title = $(this).attr("title"),
							href = $(link).attr("href");

						if (title !== "" && title == id){
							$(this).addClass("current");
							return false;
						}
					});
				});
				
			};
			
			getIds();
		}
	};
	
	ND.delegate = {
		init: function () {
			
			var simulateNativeAnchor = '_sna';
		
			$(document)
				.delegate('.clickable', 'click', function(e){
					var $this = $(this);
					if(!$(e.target).is('a,a *')) {
						var a = $this.find("A:eq(0)");
						//Fix [105295] - Can't trigger native event handlers. 
						a.trigger('click', simulateNativeAnchor)
					}
				})
				.delegate('a', 'click', function(e, data){
					if($(this).hasClass('external')) {
						window.open(this.href);
						e.stopPropagation();
						e.stopImmediatePropagation();
						e.preventDefault();
					} else if(data === simulateNativeAnchor){					
						window.location = this.href;
					}
				});
		}				
	};

	
	
	
	


	

	


	ND.videoLoad = {
		init:function() {
			
			if(!$(".inner-video").size()) {return;}

			var videoConfig = $("#video-config").embeddedData();
			//console.log(videoConfig);


			ND.video.init(videoConfig);
				

		}
	};


	
	
	ND.lang = {
		init:function(){
			if($("#lang-toggle")){
				$("#lang-toggle").change(function(){
					window.location.href = jQuery("#lang-toggle option:selected").val();
				});
			}
		}
	};
	
	ND.fblike = {
		load: function() {
			var fblikeButton = $('#facebook-page-like'),
				fblike = fblikeButton.parent(),
				url = window.location.href,
				done;
			
			//Fade In Social Widgets
			function doneFn() {
				if( !done ) {
					fblike.parent().find('.social-widget').fadeIn(200);
					done = true;					
				}
			}
			
			if( fblikeButton.size() &&  fblike.size() ) {
				fblike.html( fblikeButton.val().replace('##REPLACEURL##', escape(url.split('#')[0]).replace("\/", "%2F", "g") ));
				//Once the facebook like iframe is loaded.. Fade all social widgets in.
				fblike.find('iframe').bind('load', doneFn);
				//Set a timeout incase the face book iframe takes too long.
				setTimeout(doneFn, 2e3);
			}
		}		
	};
	
	function wLoad() {
		ND.fblike.load();
	}

	if( isWindowLoaded ) {
		wLoad();
	} else {
		$(window).bind('load', wLoad);
	}
	

	
	$(document).ready(function(){
		
		if(typeof Number !== 'function'){
			window.Number = function(string){
			return parseInt(string);
			}
		}
		
		ND.rtl = $('BODY').hasClass('rtl');
		ND.ltr = !ND.rtl;
		
		ND.selectCurrent.init();		
		ND.delegate.init();	
		
		ND.lang.init();
		
		ND.videoLoad.init();
		
	});
	
	//add print function
	$(function(){		
		$(".print").click(function(){
			window.print();
		});		
	});		
	
	//Protect from missing LAB/loader script.
	if(window['$wait'] === undefined) {
		window['$wait'] = function(fn){
			fn();
		}
	}
	
})(jQuery, window);




//create the fblike button
(function($, window, document){

	//callback function
	window.fbAsyncInit = function() {
		FB.init({
			appId      : '277451909039945', // App ID
			channelUrl : '//WWW.YOUR_DOMAIN.COM/channel.html', // Channel File
			status     : false, // check login status
			cookie     : true, // enable cookies to allow the server to access the session
			xfbml      : true  // parse XFBML
		});

		// Localise a grabber function. Grabber function helps with content values and urls
		var grabber = ND.analytics.grabber();
		master = grabber({meta:"meta[name='dfy.title']"});

		/*
		Tracking like event
		api: https://developers.facebook.com/docs/reference/javascript/FB.Event.subscribe/
		edge.remove,  comment.create,  comment.remove
		*/
		FB.Event.subscribe('edge.create', function(href, widget) {
			var	data = { 
					title: 'Facebook',
					uri: '/like/facebook',
					socialId: 'Facebook'
				};

			$.publish('/analytics/social/', data);
		});
	};

	var fbLike = {
		init: function(){
			if(document.getElementById("facebook-jssdk")) return;
			var api = $(".fb-like").eq(0).attr("title");
			if(!api || api=="") return;

			var js, fjs = document.getElementsByTagName("script")[0];
			js = document.createElement("script");
			js.id = "facebook-jssdk";
			js.src = api;
			fjs.parentNode.insertBefore(js, fjs);
		}
	};

	$(document).ready(function(){
		fbLike.init();
	});

})(jQuery, window, document);


// JavaScript modules for Ford Owners Responsive site
// modules include language dropdown, flyout menus, subnav, banner change vehicle and widgets
// Author: Brett Chaney

var fordRad = fordRad || {};

fordRad.modules = function() { 

	var subNavHeight 		= $('#subnav > ul').height(),
		topLevelCalled 		= false,
		windowWidth 		= $(window).width(),
		imagesLoaded    	= false, //flag ensuring we are loading the images only once 
		toolbarWidth 		= null,
		isRtl 				= $("body").hasClass("rtl"),
		commonConfiture 	= undefined,
		restServicesConfig 	= null;
  
  	this.init = function() {

  		var start = new Date();
  		
		this.commonConfig();
  		
		// run on document ready
		this.loadImages();
		this.deviceClass();

		// initialise modules
		this.clearme();
		this.subnav();
		this.vehicleToggle();
		this.dealerToggle();
		this.centerToolbar();

		// open menu item by default for mobile/tablet
		this.triggerMenu();

		// this.formValidation();

		if ($('.widgets').length > 0) {
			this.widgetsInit();		
			this.widgets();
		}

		if (this.checkDataSnippet("#user") && ($(".dashboard-banner").length > 0 || $(".content-banner").length > 0)){
			this.bannerInfo();
		}

		this.fblike();

		// run account menu, language and search flyout function
		this.flyoutMenus();

		// set width and height for mobile/tablet menu and search dropdown
		$(document).ready(function() {
			// set tool bar visible
			$('body.ie8').css('visibility','visible');
			$('#toolbar').css('visibility','visible');

			// set heights and widths for mobile toolbar dropdown menus
			$('.smobile ul#toolbar > li > div > ul').each(function() {
				
				var subMenuWidth 	= windowWidth;
				$(this).css('width',subMenuWidth);

				var subMenuHeight 	= $(this).height();
				$(this).css('height',subMenuHeight);

			});

			// inject toolbar menu widths
			$('.smobile ul#toolbar > li > div > ul, .tablet ul#toolbar > li > div > ul').css('width', windowWidth);
		});
			
	};	

	this.triggerMenu = function(){
		
		$(function() {
			if (windowWidth < 993) {
				$(".top-level-menu > .js-reveal").trigger("click");
			}
		});	
		
	};

	this.themeCheck = function(theme){
		if ($("body").hasClass(theme)){
			return true;
		}
		else {
			return false;
		}
	};

  	this.deviceClass = function() {
		
		// add desktop class to body tag when window width is 977px and greater
		// add tablet class to body tag when window width is less than 977px and greater than 767px
		// add smobile class to body tag when window width is less than 768px 
		if (windowWidth > 976) {
			$('body').removeClass('tablet').removeClass('smobile').addClass('desktop');
		} else if (windowWidth < 977 && windowWidth > 767) {
			$('body').removeClass('desktop').removeClass('smobile').addClass('tablet');
		} else if (windowWidth < 768) {
			$('body').removeClass('desktop').removeClass('tablet').addClass('smobile');
		} else {
			$('body').removeClass('desktop').removeClass('tablet').removeClass('smobile');
		}

  	};

  	this.checkSiteType = function() {
  		var url = this.serviceLocator("common.user-agent");
  		return $.ajax({
			type: "GET",
			url: url,
			async: true,
			dataType: "json"
		});		
  	};
  	
  	this.isDesktop = function() {

  		// function to check for current device is a desktop
		// USEAGE: if (isDesktop()) { true } else { false }
		// NOTE!!! this is based on the window width, NOT on feature detection
  		if ($('body').hasClass('desktop')){
			return true;
		} else {
			return false;
		}

  	};

  	this.isMobile = function() {

  		// function to check for current device is a desktop
		// USEAGE: if (isMobile()) { true } else { false }
		// NOTE!!! this is based on the window width, NOT on feature detection
  		if ($('body').hasClass('smobile')){
			return true;
		} else {
			return false;
		}

  	};

  	this.isTablet = function() {

  		// function to check for current device is a desktop
		// USEAGE: if (isTablet()) { true } else { false }
		// NOTE!!! this is based on the window width, NOT on feature detection
  		if ($('body').hasClass('tablet')){
			return true;
		} else {
			return false;
		}

  	};
  
  	this.resizeWin = function() {
    	
  		windowWidth = $(window).width();

    	// functions to be run when the browser window is resized or orientation changes

  		// set device class for the body tag
		this.deviceClass();
		this.loadImages();

		// add missing divides to toolbar menu items
		$("#toolbar").children("li").children("div").removeClass("no-divide");


		// reload wookmark plugin for widgets for tablets and desktop 
		// otherwise if mobile close widgets and remove inline styles left from wookmark
		if ($('.widgets').length > 0) {
			if ($('body').hasClass('tablet') || $('body').hasClass('desktop')){
				this.widgetsInit();
			} else {
				// close widgets
			    $('.widgets-wrap li .content').removeClass('open').addClass('closed').parents("li").removeClass("active");

			    $('.widgets > ul > li').css({
			    	'position' 	: 'static',
			    	'left' 		: 'auto',
			    	'top'		: 'auto'
			    }).parents('.widgets, .widgets-wrap').css({
			    	'height'	: 'auto'
			    });
			}
		}
		
		
		if (this.isDesktop()) {

			// functions for desktop only
			$('#subnav .revealed').hide(0, function() {
				$(this).removeClass('revealed');
				$(this).parent().removeClass('reveal-open');
			});
			$('#subnav ul').show();

			// reset header
			$('#header').css('height','');

			// reset toolbar menus
			$('ul#toolbar ul').css({
				'top'			:'',
				'width' 		:''
			});
			$('ul#toolbar div.search-wrap ul').css({
				'visibility'	: 'visible',
				'width' 		: ''
			});
			$('ul#toolbar > li').first().css('margin-left','');
			$('ul#toolbar > li').first().css('margin-right','');

			// reset top level nav
			$('ul#nav').css({
				'visibility': 'visible',
				'overflow' 	: '',
				'width'	 	: '',
				'height'    :'auto' 
			}).find('.menu ul').css({
				'display' 	: '',
				'width' 	: ''
			});

			// reset subnav for desktop
			$('.desktop #subnav > ul').css({'height':'36px','overflow':'visible'});
			$('.desktop #subnav > ul > li > ul').css({'display':'none','right':'','left':''});
			if ($('.desktop #subnav > ul').find('.reveal-open').length === 0) {
				$('.subnav-level2').removeClass('subnav-open');
			}	

			$('.desktop #subnav > ul > li > ul.full-width').css({
				'margin-left' 	:'-406px',
				'text-align' 	:'center',
				'width' 		:'960px'
			});

		} else {

			// reset subnav for mobile
			$('.smobile #subnav > ul, .tablet #subnav > ul').css('height','auto');

			// functions for devices smaller than desktop
			if(!$('#subnav ul').hasClass('revealed')) {
				$('#subnav ul').hide();
			}

			// get new subnav height
			subNavHeight = $('#subnav > ul').height();
			
			$('#subnav > ul > li > ul.full-width').css({'margin-left':'','text-align':'left', 'width':''});

			// reset toolbar menus
			$('ul#toolbar > li > div > ul').css({
				'visibility'	: 'hidden',
				'width' 		: windowWidth
			});

			$('#header').css('height','');

			$('ul#toolbar > li > div').removeClass('opened').css('height','');

			this.centerToolbar();
		}

  	};

  	this.clearme = function() {

  		// clear inputs with the class "clearme"
		$('input.clearme').focus(function(){
			var inputVal = $(this).attr('title');
			$(this).blur(function(){
				if ($(this).val() === '') {
					$(this).val(inputVal);
				}
			});
			if ($(this).val() === '' || $(this).val() === inputVal) {
				$(this).val('');
			}
		});

  	};

  	this.loadImages = function() {


  		if (windowWidth > 767 && imagesLoaded == false) {
			var lazyloadImgs = $('img.lazy');

			// loop through images on desktop screens (larger than 976 pixels)
			// images with a 'data-hires' attribute will use the value of that 'data-src' as the IMG src
			for(var i = 0; i < lazyloadImgs.length; i++){

				if (lazyloadImgs[i].getAttribute('data-hires')) {
					lazyloadImgs[i].setAttribute("src", lazyloadImgs[i].getAttribute('data-hires'));
				}
			}
			imagesLoaded = true;
		} 
 
  	};
  		
	this.flyoutMenus = function() {
		
		var hasIconText = $('#toolbar').hasClass('icon-text');

		// reset toolbar variable
		toolbarWidth = null;

  		// get toolbar width
  		$('#toolbar > li').each(function() {
  			toolbarWidth += $(this).width();
  		});

  		// add class 'alt' to each odd list item on the Nav
  		// this is to add different padding values for items on the right on the mobile menu
  		$('#nav li:odd').each(function() {
  			$(this).addClass('alt');
  		});

		// add class="js-reveal" to the opening/close button
		$('span.js-reveal').live('click', function(e) {

			e.preventDefault();

			var fullHeight = (hasIconText) ? $(this).next().height() + 76 : $(this).next().height() + 52;

			$(this).parent().parent().siblings().children("div").removeClass("no-divide");

			if (!$(this).parent().hasClass('opened')) {
				$(this).parent().parent().next().children("div").addClass("no-divide");
			}

			$(this).parent().parent().siblings().find('.opened').removeClass('opened').children('ul').css('visibility','hidden').parents('#header').css('height','');

			if ($(this).parent().hasClass('opened')) {
				$(this).parent().removeClass('opened').children('ul').css('visibility','hidden').parents('#header').css('height','');
			} else {
				if (windowWidth > 976) {
					$(this).parent().addClass('opened').children('ul').css('visibility','visible').parents('#header').css('height','');
				} else {
					if (windowWidth > toolbarWidth) {
						$(this).parent().addClass('opened').children('ul').css({'visibility':'visible','top':''}).parents('#header').css('height', fullHeight + 70);
					} else {
						$(this).parent().addClass('opened').children('ul').css({'visibility':'visible','top':(hasIconText) ? 140 : 90}).parents('#header').css('height', (hasIconText) ? fullHeight + 120 : fullHeight + 94);
					}
					
				}
				
			}

		});

  	};

  	this.centerToolbar = function() {
  		
  		// reset toolbar variable
  		toolbarWidth = null;

  		// get toolbar width
  		$('#toolbar > li').each(function() {
  			var $this = $(this);
  			if(!$this.hasClass('social-share')){
  				toolbarWidth += $this.width();
  			}
  		});

  		if (windowWidth > toolbarWidth) {
  			if(isRtl){
  				$('.smobile #toolbar > li, .tablet #toolbar > li').first().css('margin-right',(windowWidth / 2) - (toolbarWidth / 2));
  			} else if (!this.themeCheck('apa')) {
  				$('.smobile #toolbar > li, .tablet #toolbar > li').first().css('margin-left',(windowWidth / 2) - (toolbarWidth / 2));
  			}
  		} else {
  			$('.smobile #toolbar > li, .tablet #toolbar > li').first().css('margin-left','');
  			$('.smobile #toolbar > li, .tablet #toolbar > li').first().css('margin-right','');
  		}

  	};

  	this.subnav = function() {

  		// subnav open and close for mobile
		$(document).on('click','.smobile #subnav .subnav-btn, .tablet #subnav .subnav-btn', function(e) {
			e.preventDefault();

			var subMenu = $(this).parent().find('ul').eq(0);

			if(subMenu.hasClass('revealed')) {
				subMenu.slideUp(200, function() {
					$(this).removeClass('revealed');
					$(this).parent().removeClass('reveal-open').parent().removeClass('sub-opened');
				});
			} else {
				$(this).parent().addClass('reveal-open').parent().addClass('sub-opened');
				subMenu.slideDown(200, function() {
					$(this).addClass('revealed');
				});
			}
		});

		// subnav second level animation for mobile
		$(document).on('click', '.smobile #subnav > ul > li > a, .tablet #subnav > ul > li > a', function(e) {
			
			// open second level nav if exists
			if ($(this).parent().find('ul').length > 0) {
				e.preventDefault();
				var newHeight = $(this).parent().children('ul').height();
				$(this).parent().parent().animate({height:newHeight});
				$(this).parent().children('ul').css({display: 'block', right: -windowWidth});
				$(this).parent().children('ul').animate({right: 10});
			}		
		});
		$(document).on('click', '.smobile #subnav ul li ul > li.title a, .tablet #subnav ul li ul > li.title a', function(e) {
			e.preventDefault();
			$(this).parent().parent().animate({right: -windowWidth}, function(){
				$(this).parent().parent().animate({height: subNavHeight}, 250, function() {
					$(this).find('ul').css({display: 'none'});
				});
			});		
		});

		if (windowWidth > 976) {
			$('.desktop #subnav > ul > li > ul.full-width').css({'margin-left':'-406px','text-align':'center','width':'960px'});
		} else {
			$('.desktop #subnav > ul > li > ul.full-width').css({'margin-left':'','width':''});
			$('.desktop #subnav > ul > li > ul.full-width').css({'margin-right':'','width':''});
		}
		

		

		if (Modernizr.touch) {
            
            $(document).on('click', '.desktop #subnav > ul > li > a', function(e) {

				// if there is no 2nd level then do not continue
				if ($(this).parent().find('ul').length === 0) {
					return;
				}

				e.preventDefault();

				var subMenuItem = $(this).parent().find('ul'),
					itemPos 	= $(this).parent().position(),
					leftItemPos = itemPos.left;

				if(subMenuItem.hasClass('revealed')) {
					subMenuItem.fadeOut(0, function() {
						$(this).removeClass('revealed');
					});	
					$('.desktop .subnav-level2').removeClass('subnav-open');
					$(this).parent().removeClass('reveal-open');
				} else {

					//if (leftItemPos > 300 ) {
						
					//}
					
					subMenuItem.addClass('align-right');
					
					

					$(this).parent().siblings('.reveal-open').find('ul').removeClass('revealed').hide().parent().removeClass('reveal-open');

					$('.desktop .subnav-level2').addClass('subnav-open');
					$(this).parent().addClass('reveal-open');
					subMenuItem.fadeIn(0, function() {
						$(this).addClass('revealed');
					});
				}

			});
            
        } else {

        	// subnav second level flyout for desktop
			$(document).on('mouseenter', '.desktop #subnav > ul > li', function(e) {

				// if there is no 2nd level then do not continue
				if ($(this).find('ul').length === 0) {
					return;
				}

				e.preventDefault();

				var subMenuItem = $(this).find('ul'),
					itemPos 	= $(this).position(),
					leftItemPos = itemPos.left;
				
					if(navigator.userAgent.indexOf("MSIE")>0){
						
						if(navigator.userAgent.indexOf("MSIE 9.0")>0){
							
							$("body").addClass("ie9");
						}
						if(navigator.userAgent.indexOf("MSIE 10.0")>0){
							
							$("body").addClass("ie9");
						}
					}

					//if (leftItemPos > 300 ) {
						subMenuItem.addClass('align-right');
					//}
						
						

					$(this).siblings('.reveal-open').find('ul').removeClass('revealed').hide().removeClass('reveal-open');

					$('.desktop .subnav-level2').addClass('subnav-open');
					$(this).addClass('reveal-open');
					subMenuItem.fadeIn(0, function() {
						$(this).addClass('revealed');
					});

			});

			// subnav second level flyout for desktop
			$(document).on('mouseleave', '.desktop #subnav > ul > li', function(e) {

				// if there is no 2nd level then do not continue
				if ($(this).find('ul').length === 0) {
					return;
				}

				e.preventDefault();

				var subMenuItem = $(this).find('ul'),
					itemPos 	= $(this).position(),
					leftItemPos = itemPos.left;

				
					subMenuItem.fadeOut(0, function() {
						$(this).removeClass('revealed');
					});	
					$('.desktop .subnav-level2').removeClass('subnav-open');
					$(this).removeClass('reveal-open');


			});

		}

  	};

  	this.vehicleToggle = function() {

  		// change vehicle toggle for mobile
		$('.mobile-banner .change-btn, .smobile .content-banner .change-btn').live('click', function(e) {
			e.preventDefault();
			$(this).parent().toggleClass('toggle-open');
		});

		// change vehicle slider for tablet/desktop
		$('.js-change-slider .change-btn').live('click', function(e) {

			e.preventDefault();

			$slider 	= $(this).parent().find('.thumb-wrap > div');
			$sliderWrap = $slider.parent().parent();

	    	if (parseInt($slider.css('right'),10) === 0) {
		    	$sliderWrap.removeClass('js-slider-open');
		    } else {
		    	$sliderWrap.addClass('js-slider-open');
		    }

			$slider.animate({
		      right: parseInt($slider.css('right'),10) === 0 ?
		        -$slider.outerWidth() :
		        0
		    }, function() {

		    });

		});

  	};

  	this.dealerToggle = function() {
  		
  		// hide 'locate a dealership' form
  		$('.locator .fbform').css('display','none');

  		$('.locator .mini-dealer-form h2').on('click', function(e) {

  			e.preventDefault();

  			if ($(this).hasClass('open')) {
  				$(this).removeClass('open').next().css('display','none');
  			} else {
  				$(this).addClass('open').next().css('display','block');
  			}
  			
  		});
	  	
  	};

  	this.widgetsInit = function() {
		if (windowWidth >= 320 && windowWidth < 768) {

			// close widgets
		    $('.widgets-wrap li .content').removeClass('open').addClass('closed');

		    $('.widgets > ul > li').css({
		    	'position' 	: 'static',
		    	'left' 		: 'auto',
		    	'top'		: 'auto'
		    }).parents('.widgets, .widgets-wrap').css({
		    	'height'	: 'auto'
		    });

		} else if (windowWidth >= 768) {

			// open widgets
		    $('.widgets-wrap li .content').removeClass('closed').find('.content-inside').css('display','');

			var wookmarkOptions = {
		        container: $('.widgets'),
		        offset: 20
		    };

		    function wookmarkInit(){
				var handler = $('.widgets > ul > li');
				
				$('.widgets ul').imagesLoaded(function(){
					handler.wookmark(wookmarkOptions);
				});

				handler.wookmark(wookmarkOptions);

				// update widget container height to add top and bottom padding
				var widgetHeight = $('.widgets').height();
				$('.widgets-wrap').css('height', widgetHeight + 68);
			}

			if ($('.widgets ul img').length > 0){
				$('.widgets ul').imagesLoaded(wookmarkInit());
			}
			else{
				wookmarkInit();
			}

		    
		}

  	};

  	this.widgets = function() {

  		$('.widgets h2 > a').live('touchstart, click', function(e) {
			
			if (e.target == this){
				if ($(this).parent().parent().hasClass('open')) {
	                $(this).parent().parent().removeClass('open').addClass('closed');
	            } else {
	                $(this).parent().parent().removeClass('closed').addClass('open');
	            }
			}
  			
	        
	        e.preventDefault();
  			e.stopPropagation();

  		});
  		

  	};

  	this.fblike = function() {
  		var fblikeButton = $('#facebook-page-like'),
				fblike = fblikeButton.parent(),
				url = window.location.href,
				done;
			
			//Fade In Social Widgets
			function doneFn() {
				if( !done ) {
					fblike.parent().find('.social-widget').fadeIn(200);
					done = true;					
				}
			}
			
			if( fblikeButton.size() &&  fblike.size() ) {
				fblike.html( fblikeButton.val().replace('##REPLACEURL##', escape(url.split('#')[0]).replace("\/", "%2F", "g") ));
				//Once the facebook like iframe is loaded.. Fade all social widgets in.
				fblike.find('iframe').bind('load', doneFn);
				//Set a timeout incase the face book iframe takes too long.
				setTimeout(doneFn, 2e3);
			}
  	};

  	this.commonConfig = function() {
  		if (fordRad.modules.commonConfiture === undefined) {
  			fordRad.modules.commonConfiture = $('#common-config').embeddedData();
  		} 
  		return fordRad.modules.commonConfiture;
  	};
  	
  	this.serviceLocator = function(service) {
  		if (fordRad.modules.restServicesConfig == null) {
  			if(!$("#rest-services").size()) {
  				return;
  			}
  			fordRad.modules.restServicesConfig = $('#rest-services').embeddedData();
  		}
  		
  		if (fordRad.modules.restServicesConfig[service]){
  			var url = fordRad.modules.restServicesConfig[service].replace('{site}', this.commonConfig().site);
  			return url.replace('{locale}', this.commonConfig().locale);
  		}
  		
  	};

  	this.bannerInfo = function() {
  		var data = $('#user').embeddedData(),
  			container = $(".dashboard-banner"),
  			contentContainer = $(".content-banner"),
  			intro = $(".intro",container);

  	
  		if (container.length > 0 && intro.length > 0){    			
  			$("#intro-template").tmpl(data).prependTo(intro);  
  			$(".desktop-banner .details").prepend($("#intro-detail-template").tmpl(data));
  			$(".mobile-banner .details").append($("#intro-detail-template").tmpl(data));
  			if (data.numberOfVehicles > 1){
  				$("#vehicles-template").tmpl(data).appendTo($(".dashboard-banner.desktop-banner"));
  				$("#vehicles-template").tmpl(data).appendTo($(".dashboard-banner.mobile-banner div.details"));
  				$(".dashboard-banner.desktop-banner").find(".change").addClass("js-change-slider");
	  			$(".change",container).css("display","block");
	  		}
  		}

  		if (contentContainer.length > 0){

  			$(".details",contentContainer).prepend($("#user-detail-template").tmpl(data));
  			if (data.numberOfVehicles >= 1){
  				$("#vehicles-template").tmpl(data).appendTo($(".content-banner .details"));
  				$(".content-banner .details").find(".change").addClass("js-change-slider");
	  			$(".change",container).css("display","block");
	  		}
  		}
  	};

  	this.checkUserLogin = function(){
  		var serviceUrl = this.serviceLocator("owner.status");
        
        //should not be needed anymore as server returns "no cache" response headers
  		//var randomNum = Math.random();
        //serviceUrl = serviceUrl + "?randomNum=" + randomNum;
        
  		return $.ajax({
  			url: serviceUrl,
  			async: true,	//this calls should async
  			dataType: 'json'
  		});	
  	};

  	this.checkDataSnippet = function(elem){
  		return $(elem).size() && $(elem).html() !== '';
  	};

  	
};

var instance = null;

$(function(){
  	instance = new fordRad.modules();
  	// run modules
  	instance.init();

  	// only execute resize function if the width has change, not the height 
  	// fixes keyboard popup issue on older smobile OS's
  	var currentWidth = $(window).width();
  	$(window).on('resize', function() {
  		var newWidth = $(window).width();	

  		if (newWidth !== currentWidth) {
  			instance.resizeWin();
  		}
  		
  		// update current width
  		currentWidth = newWidth;
  	});
});


/**
 * @author: Brett Chaney
 * @project: form builder/rad
 * 
 * @description: styles select boxes for new forms
 */

ND.FormBuilder = window.ND.FormBuilder || {};

(function($) {
	// Loop through select box options and slice options with long text
	ND.FormBuilder.styleSelectOptions = function($select) {
		
		if (typeof $select === 'undefined' || $select == null || $select.length === 0 ) {
			$select = $('select');
		}
		
		var children = $select.children();
		if (children.length > 0) {
			children.each(function() {
			    var child = $(this),
			    	currentSel     	= child.text(),
			        currentLength  	= currentSel.length,
			        selectWidth 	= parseInt(child.parent().parent().width());

			    if (!child.parent().hasClass('remove-select-fix')) {

				    if (currentLength > 16 && selectWidth < 290) {
				    	
				        child.text(currentSel.slice(0, 16) + "...");
				    } else if (currentLength > 30 && selectWidth < 350) {
				    	
				        child.text(currentSel.slice(0, 30) + "...");
				    } else if (currentLength > 35 && selectWidth < 450) {
				    	
				    	child.text(currentSel.slice(0, 35) + "...");
				    } else if (currentLength > 40 && selectWidth < 550) {
				    	
				    	child.text(currentSel.slice(0, 50) + "...");
				    } else if (currentLength > 55 && selectWidth < 620) {
				    	
				    	child.text(currentSel.slice(0, 55) + "...");
				    }

				}


			});
		}

	};


	$(window).on('resize', function() {
		ND.FormBuilder.styleSelectOptions();
	});
	
	$(function() {
		$('select').bind("focus",function(){
			ND.FormBuilder.styleSelectOptions();
		});
	});


})(jQuery);


(function (factory) {
	
	if(window.jQuery){
		factory(jQuery);
		factory = jQuery.noop;
	}
	if (typeof define === 'function' && define.amd && define.amd.jQuery) {
		define('polyfiller', ['jquery'], factory);
	}
}(function($){
	"use strict";
	var DOMSUPPORT = 'dom-support';
	var jScripts = $(document.scripts || 'script');
	var special = $.event.special;
	var emptyJ = $([]);
	var Modernizr = window.Modernizr;
	var asyncWebshims = window.asyncWebshims;
	var addTest = Modernizr.addTest;
	var Object = window.Object;
	var html5 = window.html5 || {};
	
	Modernizr.advancedObjectProperties = Modernizr.objectAccessor = Modernizr.ES5 = !!('create' in Object && 'seal' in Object);
	
	if(Modernizr.ES5 && !('toJSON' in Date.prototype)){
		Modernizr.ES5 = false;
	}
	
	
	var webshims = {
		version: '1.11.1',
		cfg: {
			
			//addCacheBuster: false,
			waitReady: true,
//			extendNative: false,
			loadStyles: true,
			disableShivMethods: true,
			wspopover: {appendTo: 'body', hideOnBlur: true},
			basePath: (function(){
				var script = jScripts.filter('[src*="polyfiller.js"]');
				var path;
				script = script[0] || script.end()[script.end().length - 1];
				path = ( ( !('hrefNormalized' in $.support) || $.support.hrefNormalized  ) ? script.src : script.getAttribute("src", 4) ).split('?')[0];
				path = path.slice(0, path.lastIndexOf("/") + 1) + 'shims/';
				return path;
			})()
		},
		bugs: {},
		/*
		 * some data
		 */
		modules: {},
		features: {},
		featureList: [],
		setOptions: function(name, opts){
			if (typeof name == 'string' && opts !== undefined) {
				webCFG[name] = (!$.isPlainObject(opts)) ? opts : $.extend(true, webCFG[name] || {}, opts);
			} else if (typeof name == 'object') {
				$.extend(true, webCFG, name);
			}
		},
		addPolyfill: function(name, cfg){
			cfg = cfg || {};
			var feature = cfg.f || name;
			if (!webshimsFeatures[feature]) {
				webshimsFeatures[feature] = [];
				webshims.featureList.push(feature);
				webCFG[feature] = {};
			}
			
			if(!webshimsFeatures[feature].failedM && cfg.nM){
				$.each(cfg.nM.split(' '), function(i, name){
					if(!(name in Modernizr)){
						webshimsFeatures[feature].failedM = name;
						return false;
					}
				});
			}
			
			if(webshimsFeatures[feature].failedM){
				cfg.test = function(){
					webshims.error('webshims needs Modernizr.'+webshimsFeatures[feature].failedM + ' to implement feature: '+ feature);
					return true;
				};
			}
			webshimsFeatures[feature].push(name);
			cfg.options = $.extend(webCFG[feature], cfg.options);
			
			addModule(name, cfg);
			if (cfg.methodNames) {
				$.each(cfg.methodNames, function(i, methodName){
					webshims.addMethodName(methodName);
				});
			}
		},
		polyfill: (function(){
			var loaded = {};
			return function(features){
				if(!features){
					features = webshims.featureList;
					webshims.info('loading all features without specifing might be bad for performance');
				}
					
				if (typeof features == 'string') {
					features = features.split(' ');
				}
				
				for(var i = 0; i < features.length; i++){
					if(loaded[features[i]]){
						webshims.error(features[i] +' already loaded, you might want to use updatePolyfill instead? see: bit.ly/12BtXX3');
					}
					loaded[features[i]] = true;
				}
				return webshims._polyfill(features);
			};
		})(),
		_polyfill: (function(){
			var firstPolyfillCall = function(features){
				var addClass = [];
				var onReadyEvts = features;
				var timer;
				
				if(webCFG.disableShivMethods){
					html5.shivMethods = false;
				}
				
				var removeLoader = function(){
					$('html').removeClass('loading-polyfills long-loading-polyfills');
					$(window).unbind('.lP');
					clearTimeout(timer);
				};
				
				
				
				addClass.push('loading-polyfills');
				timer = setTimeout(function(){
					$('html').addClass('long-loading-polyfills');
					timer = setTimeout(removeLoader, 300);
				}, 300);
				$(window).on('load.lP error.lP', removeLoader);
				
				if (webCFG.waitReady && $.isReady) {
					webshims.warn('Call webshims.polyfill before DOM-Ready or set waitReady to false.');
				}
				onReady(features, removeLoader);
				if (addClass[0]) {
					$('html').addClass(addClass.join(' '));
				}
				if(webCFG.loadStyles){
					loader.loadCSS('styles/shim.css');
				}
				//remove function
				firstPolyfillCall = $.noop;
			};
			var loadedFormBase;
			return function(features){
				
				var toLoadFeatures = [];
				
				if(!loadedFormBase){
					loadedFormBase = $.inArray('forms', features) !== -1;
					if(!loadedFormBase && $.inArray('forms-ext', features) !== -1){
						features.push('forms');
						loadedFormBase = true;
					}
				}
				
				if (webCFG.waitReady) {
					$.readyWait++;
					onReady(features, function(){
						$.ready(true);
					});
				}
				
				$.each(features, function(i, feature){
					if(!webshimsFeatures[feature]){
						webshims.error("could not find webshims-feature (aborted): "+ feature);
						isReady(feature, true);
						return;
					}
					if (feature !== webshimsFeatures[feature][0]) {
						onReady(webshimsFeatures[feature], function(){
							isReady(feature, true);
						});
					}
					toLoadFeatures = toLoadFeatures.concat(webshimsFeatures[feature]);
				});
				
				firstPolyfillCall(features);
				loadList(toLoadFeatures);
				
			};
		})(),
		
		/*
		 * handle ready modules
		 */
		reTest: (function(){
			var resList;
			var reTest = function(i, name){
				var module = modules[name];
				var readyName = name+'Ready';
				var feature;
				if(module && !module.loaded && !( (module.test && $.isFunction(module.test) ) ? module.test([]) : module.test )){
					if(special[readyName]){
						delete special[readyName];
					}
					feature = webshimsFeatures[module.f];
					
					resList.push(name);
				}
			};
			return function(moduleNames){
				if(typeof moduleNames == 'string'){
					moduleNames = moduleNames.split(' ');
				}
				resList = [];
				$.each(moduleNames, reTest);
				loadList(resList);
			};
		})(),
		isReady: function(name, _set){
			
			name = name + 'Ready';
			if (_set) {
				if (special[name] && special[name].add) {
					return true;
				}
				
				special[name] = $.extend(special[name] || {}, {
					add: function(details){
						details.handler.call(this, name);
					}
				});
				$(document).triggerHandler(name);
			}
			return !!(special[name] && special[name].add) || false;
		},
		ready: function(events, fn /*, _created*/){
			var _created = arguments[2];
			var evt = events;
			if (typeof events == 'string') {
				events = events.split(' ');
			}
			
			if (!_created) {
				events = $.map($.grep(events, function(evt){
					return !isReady(evt);
				}), function(evt){
					return evt + 'Ready';
				});
			}
			if (!events.length) {
				fn($, webshims, window, document);
				return;
			}
			var readyEv = events.shift(), readyFn = function(){
				onReady(events, fn, true);
			};
			
			$(document).one(readyEv, readyFn);
		},
		
		/*
		 * basic DOM-/jQuery-Helpers
		 */
		
		
		capturingEvents: function(names, _maybePrevented){
			if (!document.addEventListener) {
				return;
			}
			if (typeof names == 'string') {
				names = [names];
			}
			$.each(names, function(i, name){
				var handler = function(e){
					e = $.event.fix(e);
					if (_maybePrevented && webshims.capturingEventPrevented) {
						webshims.capturingEventPrevented(e);
					}
					return $.event.dispatch.call(this, e);
				};
				special[name] = special[name] || {};
				if (special[name].setup || special[name].teardown) {
					return;
				}
				$.extend(special[name], {
					setup: function(){
						this.addEventListener(name, handler, true);
					},
					teardown: function(){
						this.removeEventListener(name, handler, true);
					}
				});
			});
		},
		register: function(name, fn){
			var module = modules[name];
			if (!module) {
				webshims.error("can't find module: " + name);
				return;
			}
			if (module.noAutoCallback) {
				var ready = function(){
					fn($, webshims, window, document, undefined, module.options);
					isReady(name, true);
				};
				if (module.d && module.d.length) {
					onReady(module.d, ready);
				} else {
					ready();
				}
			}
		},
		c: {},
		/*
		 * loader
		 */
		loader: {
		
			addModule: function(name, ext){
				modules[name] = ext;
				ext.name = ext.name || name;
				if(!ext.c){
					ext.c = [];
				}
				$.each(ext.c, function(i, comboname){
					if(!webshims.c[comboname]){
						webshims.c[comboname] = [];
					}
					webshims.c[comboname].push(name);
				});
			},
			loadList: (function(){
			
				var loadedModules = [];
				var loadScript = function(src, names){
					if (typeof names == 'string') {
						names = [names];
					}
					$.merge(loadedModules, names);
					loader.loadScript(src, false, names);
				};
				
				var noNeedToLoad = function(name, list){
					if (isReady(name) || $.inArray(name, loadedModules) != -1) {
						return true;
					}
					var module = modules[name];
					var cfg = webCFG[module.f || name] || {};
					var supported;
					if (module) {
						supported = (module.test && $.isFunction(module.test)) ? module.test(list) : module.test;
						if (supported) {
							isReady(name, true);
							return true;
						} else {
							return false;
						}
					}
					return true;
				};
				
				var setDependencies = function(module, list){
					if (module.d && module.d.length) {
						var addDependency = function(i, dependency){
							if (!noNeedToLoad(dependency, list) && $.inArray(dependency, list) == -1) {
								list.push(dependency);
							}
						};
						$.each(module.d, function(i, dependency){
							if (modules[dependency]) {
								addDependency(i, dependency);
							}
							else 
								if (webshimsFeatures[dependency]) {
									$.each(webshimsFeatures[dependency], addDependency);
									onReady(webshimsFeatures[dependency], function(){
										isReady(dependency, true);
									});
								}
						});
						if (!module.noAutoCallback) {
							module.noAutoCallback = true;
						}
					}
				};
				
				return function(list, combo){
					var module;
					var loadCombos = [];
					var i;
					var len;
					var foundCombo;
					var loadCombo = function(j, combo){
						foundCombo = combo;
						$.each(webshims.c[combo], function(i, moduleName){
							if($.inArray(moduleName, loadCombos) == -1 || $.inArray(moduleName, loadedModules) != -1){
								foundCombo = false;
								return false;
							}
						});
						if(foundCombo){
							loadScript('combos/'+foundCombo, webshims.c[foundCombo]);
							return false;
						}
					};
					
					//length of list is dynamically
					for (i = 0; i < list.length; i++) {
						module = modules[list[i]];
						if (!module || noNeedToLoad(module.name, list)) {
							if (!module) {
								webshims.warn('could not find: ' + list[i]);
							}
							continue;
						}
						if (module.css) {
							loader.loadCSS(module.css);
						}
						
						if (module.loadInit) {
							module.loadInit();
						}
						
						module.loaded = true;
						setDependencies(module, list);
						loadCombos.push(module.name);
					}
					
					for(i = 0, len = loadCombos.length; i < len; i++){
						foundCombo = false;
						
						module = loadCombos[i];
						
						if($.inArray(module, loadedModules) == -1){
							if(webshims.debug != 'noCombo'){
								$.each(modules[module].c, loadCombo);
							}
							if(!foundCombo){
								loadScript(modules[module].src || module, module);
							}
						}
					}
				};
			})(),
			
			makePath: function(src){
				if (src.indexOf('//') != -1 || src.indexOf('/') === 0) {
					return src;
				}
				
				if (src.indexOf('.') == -1) {
					src += '.js';
				}
				if (webCFG.addCacheBuster) {
					src += webCFG.addCacheBuster;
				}
				return webCFG.basePath + src;
			},
			
			loadCSS: (function(){
				var parent, loadedSrcs = [];
				return function(src){
					src = this.makePath(src);
					if ($.inArray(src, loadedSrcs) != -1) {
						return;
					}
					parent = parent || $('link, style')[0] || $('script')[0];
					loadedSrcs.push(src);
					$('<link rel="stylesheet" />').insertBefore(parent).attr({
						href: src
					});
				};
			})(),
			
			loadScript: (function(){
				var loadedSrcs = [];
				var scriptLoader;
				return function(src, callback, name){
				
					src = loader.makePath(src);
					if ($.inArray(src, loadedSrcs) != -1) {return;}
					var complete = function(){
						
						complete = null;
						if (callback) {
							callback();
						}
						
						if (name) {
							if (typeof name == 'string') {
								name = name.split(' ');
							}
							$.each(name, function(i, name){
								if (!modules[name]) {
									return;
								}
								if (modules[name].afterLoad) {
									modules[name].afterLoad();
								}
								isReady(!modules[name].noAutoCallback ? name : name + 'FileLoaded', true);
							});
							
						}
					};
					
					loadedSrcs.push(src);
					if(window.require && window.define && window.define.amd){
						require([src], complete);
					} else if (window.sssl) {
						sssl(src, complete);
					} else if (window.yepnope) {
						yepnope.injectJs(src, complete);
					} else if (window.steal) {
						steal(src).then(complete);
					} 
				};
			})()
		}
	};
	
	/*
	 * shortcuts
	 */
	$.webshims = webshims;
	
	var webCFG = webshims.cfg;
	var webshimsFeatures = webshims.features;
	var isReady = webshims.isReady;
	var onReady = webshims.ready;
	var addPolyfill = webshims.addPolyfill;
	var modules = webshims.modules;
	var loader = webshims.loader;
	var loadList = loader.loadList;
	var addModule = loader.addModule;
	var bugs = webshims.bugs;
	var removeCombos = [];
	var importantLogs = {
		warn: 1,
		error: 1
	};
	
	webshims.addMethodName = function(name){
		name = name.split(':');
		var prop = name[1];
		if (name.length == 1) {
			prop = name[0];
			name = name[0];
		} else {
			name = name[0];
		}
		
		$.fn[name] = function(){
			return this.callProp(prop, arguments);
		};
	};
	$.fn.callProp = function(prop, args){
		var ret;
		if(!args){
			args = []; 
		}
		this.each(function(){
			var fn = $.prop(this, prop);
			
			if (fn && fn.apply) {
				ret = fn.apply(this, args);
				if (ret !== undefined) {
					return false;
				}
			} else {
				webshims.warn(prop+ " is not a method of "+ this);
			}
		});
		return (ret !== undefined) ? ret : this;
	};
	
	//activeLang will be overridden

	
	//	set current Lang:
	//		- webshims.activeLang(lang:string);
	//	get current lang
	//		- webshims.activeLang();
	//		- webshims.activeLang({
	//			module: moduleName:string,
	//			callback: callback:function,
	//			langObj: languageObj:array/object
	//		});

	webshims.activeLang = (function(){
		var curLang = navigator.browserLanguage || navigator.language || '';
		onReady('webshimLocalization', function(){
			webshims.activeLang(curLang);
			
		});
		return function(lang){
			if(lang){
				if (typeof lang == 'string' ) {
					curLang = lang;
				} else if(typeof lang == 'object'){
					var args = arguments;
					var that = this;
					onReady('webshimLocalization', function(){
						webshims.activeLang.apply(that, args);
					});
				}
			}
			return curLang;
		};
	})();
	
	webshims.errorLog = [];
	$.each(['log', 'error', 'warn', 'info'], function(i, fn){
		webshims[fn] = function(message){
			if( (importantLogs[fn] && webshims.debug !== false) || webshims.debug){
				webshims.errorLog.push(message);
				if(window.console && console.log){
					console[(console[fn]) ? fn : 'log'](message);
				}
			}
		};
	});
		
	
	//Overwrite DOM-Ready and implement a new ready-method
	(function(){
		$.isDOMReady = $.isReady;
		var onReady = function(){
			$.isDOMReady = true;
			isReady('DOM', true);
			setTimeout(function(){
				isReady('WINDOWLOAD', true);
			}, 9999);
		};
		if(!$.isDOMReady){
			var $Ready = $.ready;
			$.ready = function(unwait){
				if(unwait !== true && document.body){
					onReady();
					$.ready = $Ready;
				}
				return $Ready.apply(this, arguments);
			};
			$.ready.promise = $Ready.promise;
		} else {
			onReady();
		}
		$(onReady);
		
		$(window).load(function(){
			onReady();
			setTimeout(function(){
				isReady('WINDOWLOAD', true);
			}, 9);
		});
	})();
	
	/*
	 * jQuery-plugins for triggering dom updates can be also very usefull in conjunction with non-HTML5 DOM-Changes (AJAX)
	 * Example:
	 * $.webshims.addReady(function(context, insertedElement){
	 * 		$('div.tabs', context).add(insertedElement.filter('div.tabs')).tabs();
	 * });
	 * 
	 * $.ajax({
	 * 		success: function(html){
	 * 			$('#main').htmlPolyfill(html);
	 * 		}
	 * });
	 */
	
	(function(){
		var readyFns = [];
		var eachTrigger = function(){
			if(this.nodeType == 1){
				webshims.triggerDomUpdate(this);
			}
		};
		$.extend(webshims, {
			addReady: function(fn){
				var readyFn = function(context, elem){
					webshims.ready('DOM', function(){fn(context, elem);});
				};
				readyFns.push(readyFn);
				readyFn(document, emptyJ);
			},
			triggerDomUpdate: function(context){
				if(!context || !context.nodeType){
					if(context && context.jquery){
						context.each(function(){
							webshims.triggerDomUpdate(this);
						});
					}
					return;
				}
				var type = context.nodeType;
				if(type != 1 && type != 9){return;}
				var elem = (context !== document) ? $(context) : emptyJ;
				$.each(readyFns, function(i, fn){
					fn(context, elem);
				});
			}
		});
		
		$.fn.htmlPolyfill = function(a){
			var ret = $.fn.html.call(this,  a);
			if(ret === this && $.isDOMReady){
				this.each(eachTrigger);
			}
			return ret;
		};
		
		$.fn.jProp = function(){
			return $($.fn.prop.apply(this, arguments) || []);
		};
		
		$.each(['after', 'before', 'append', 'prepend', 'replaceWith'], function(i, name){
			$.fn[name+'Polyfill'] = function(a){
				a = $(a);
				$.fn[name].call(this, a);
				if($.isDOMReady){
					a.each(eachTrigger);
				}
				return this;
			};
			
		});
		
		$.each(['insertAfter', 'insertBefore', 'appendTo', 'prependTo', 'replaceAll'], function(i, name){
			$.fn[name.replace(/[A-Z]/, function(c){return "Polyfill"+c;})] = function(){
				$.fn[name].apply(this, arguments);
				if($.isDOMReady){
					webshims.triggerDomUpdate(this);
				}
				return this;
			};
		});
		
		$.fn.updatePolyfill = function(){
			if($.isDOMReady){
				webshims.triggerDomUpdate(this);
			}
			return this;
		};
		
		$.each(['getNativeElement', 'getShadowElement', 'getShadowFocusElement'], function(i, name){
			$.fn[name] = function(){
				return this.pushStack(this);
			};
		});
		
	})();
	
	//this might be extended by ES5 shim feature
	(function(){
		var defineProperty = 'defineProperty';
		var has = Object.prototype.hasOwnProperty;
		var descProps = ['configurable', 'enumerable', 'writable'];
		var extendUndefined = function(prop){
			for(var i = 0; i < 3; i++){
				if(prop[descProps[i]] === undefined && (descProps[i] !== 'writable' || prop.value !== undefined)){
					prop[descProps[i]] = true;
				}
			}
		};
		var extendProps = function(props){
			if(props){
				for(var i in props){
					if(has.call(props, i)){
						extendUndefined(props[i]);
					}
				}
			}
		};
		if(Object.create){
			webshims.objectCreate = function(proto, props, opts){
				extendProps(props);
				var o = Object.create(proto, props);
				if(opts){
					o.options = $.extend(true, {}, o.options  || {}, opts);
					opts = o.options;
				}
				if(o._create && $.isFunction(o._create)){
					o._create(opts);
				}
				return o;
			};
		}
		if(Object[defineProperty]){
			webshims[defineProperty] = function(obj, prop, desc){
				extendUndefined(desc);
				return Object[defineProperty](obj, prop, desc);
			};
		}
		if(Object.defineProperties){
			webshims.defineProperties = function(obj, props){
				extendProps(props);
				return Object.defineProperties(obj, props);
			};
		}
		webshims.getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
		
		webshims.getPrototypeOf = Object.getPrototypeOf;
	})();
	
	

	
	/*
	 * Start Features 
	 */
	
	/* general modules */
	/* change path $.webshims.modules[moduleName].src */
	
	
	addModule('swfmini', {
		test: function(){
			if(window.swfobject && !window.swfmini){
				window.swfmini = window.swfobject;
			}
			return ('swfmini' in window);
		},
		c: [16, 7, 2, 8, 1, 12, 19, 25, 23, 27]
	});
	modules.swfmini.test();
		
	/* 
	 * polyfill-Modules 
	 */
	
	// webshims lib uses a of http://github.com/kriskowal/es5-shim/ to implement
	addPolyfill('es5', {
		test: !!(Modernizr.ES5 && Function.prototype.bind),
		c: [14, 18, 19, 25, 20]
	});
	
	addPolyfill('dom-extend', {
		f: DOMSUPPORT,
		noAutoCallback: true,
		d: ['es5'],
		c: [16, 7, 2, 15, 30, 3, 8, 4, 9, 10, 14, 25, 19, 20, 26, 28, 31]
	});
		
	
	//<json-storage
	
	addPolyfill('json-storage', {
		test: Modernizr.localstorage && 'sessionStorage' in window && 'JSON' in window,
		d: ['swfmini'],
		noAutoCallback: true,
		c: [14],
		nM: 'localstorage'
	});
	//>json-storage
	
	
	//<geolocation
	
	addPolyfill('geolocation', {
		test: Modernizr.geolocation,
		options: {
			destroyWrite: true
//			,confirmText: ''
		},
		d: ['json-storage'],
		c: [21],
		nM: 'geolocation'
	});
	//>
	
	//<canvas
	(function(){
		var flashCanvas;
		addPolyfill('canvas', {
			src: 'excanvas',
			test: Modernizr.canvas,
			options: {type: 'flash'}, //excanvas | flash | flashpro
			noAutoCallback: true,
			
			loadInit: function(){
				var type = this.options.type;
				var src;
				if(type && type.indexOf('flash') !== -1 && (!modules.swfmini.test() || swfmini.hasFlashPlayerVersion('9.0.0'))){
					window.FlashCanvasOptions = window.FlashCanvasOptions || {};
					flashCanvas = FlashCanvasOptions;
					if(type == 'flash'){
						$.extend(flashCanvas, {
							swfPath: webCFG.basePath + 'FlashCanvas/'
						});
						this.src = 'FlashCanvas/flashcanvas';
						src = flashCanvas.swfPath + 'flashcanvas.swf';
					} else {
						$.extend(flashCanvas, {swfPath: webCFG.basePath + 'FlashCanvasPro/'});
						this.src = 'FlashCanvasPro/flashcanvas';
						//assume, that the user has flash10+
						src = flashCanvas.swfPath + 'flash10canvas.swf';
					}
					//todo: implement cachbuster for flashcanvas
//					if(webCFG.addCacheBuster){
//						src += webCFG.addCacheBuster;
//					}
				}
			},
			afterLoad: function(){
				webshims.addReady(function(context, elem){
					if(context == document){
						if(window.G_vmlCanvasManager && G_vmlCanvasManager.init_ ){
							G_vmlCanvasManager.init_(document);
						}
					}
					$('canvas', context).add(elem.filter('canvas')).each(function(){
						var hasContext = this.getContext;
						if(!hasContext && window.G_vmlCanvasManager){
							G_vmlCanvasManager.initElement(this);
						}
					});
					if(context == document){
						isReady('canvas', true);
					}
				});
			},
			methodNames: ['getContext'],
			d: [DOMSUPPORT],
			nM: 'canvas'
		});
	})();
	//>
	
	
	//<forms
	(function(){
		var formExtend, formOptions, formExtras;
		var fShim = 'form-shim-extend';
		var modernizrInputAttrs = Modernizr.input;
		var modernizrInputTypes = Modernizr.inputtypes;
		var formvalidation = 'formvalidation';
		var fNuAPI = 'form-number-date-api';
		var select = $('<select required="" name="a"><option disabled="" /></select>')[0];
		var bustedValidity = false;
		var bustedWidgetUi = false;
		
		var initialFormTest = function(){
			if(!initialFormTest.run){
				addTest(formvalidation, function(){
					return !!(modernizrInputAttrs.required && modernizrInputAttrs.pattern);
				});
				
				addTest('fieldsetdisabled', function(){
					var fieldset = $('<fieldset />')[0];
					return 'elements' in fieldset && 'disabled' in fieldset;
				});
				
				if(modernizrInputTypes){
					addTest('styleableinputrange', function(){
						return modernizrInputTypes.range && !window.opera;
					});
				}
				
				if(Modernizr[formvalidation]){
					bustedWidgetUi = window.opera || Modernizr.formattribute === false || !Modernizr.fieldsetdisabled || !('value' in document.createElement('progress')) || !('value' in document.createElement('output')) || !($('<input type="date" value="1488-12-11" />')[0].validity || {valid: true}).valid || !('required' in select) || (select.validity || {}).valid;
					bugs.bustedValidity = bustedValidity = bustedWidgetUi || !modernizrInputAttrs.list;
				}

				formExtend = Modernizr[formvalidation] && !bustedValidity ? 'form-native-extend' : fShim;
				
			}
			initialFormTest.run = true;
			return false;
		};
		
		if(modernizrInputAttrs && modernizrInputTypes){
			initialFormTest();
		}
		document.createElement('datalist');
				
		webshims.formcfg = [];
		webshims.validationMessages = webshims.validityMessages = [];
		webshims.inputTypes = {};
				
		addPolyfill('form-core', {
			f: 'forms',
			d: ['es5'],
			test: initialFormTest,
			options: {
				placeholderType: 'value',
				langSrc: 'i18n/formcfg-',
				messagePopover: {},
				datalistPopover: {
					constrainWidth: true
				},
				iVal: {
					handleBubble: true,
					sel: '.ws-instantvalidation',
					recheckDelay: 400
//					,hideBubble: undefined,
//					,fieldWrapper: undefined
//					,fx: 'slide'
				},
				availabeLangs: ['ar', 'ch-ZN', 'el', 'es', 'fr', 'he', 'hi', 'hu', 'it', 'ja', 'lt', 'nl', 'pl', 'pt-PT', 'ru', 'sv'] //en and de are directly implemented in core
	//			,customMessages: false,
	//			overridePlaceholder: false, // might be good for IE10
	//			replaceValidationUI: false
			},
			methodNames: ['setCustomValidity','checkValidity'],
			c: [16, 7, 2, 8, 1, 15, 30, 3, 31],
			nM: 'input'
		});
		
		formOptions = webCFG.forms;
				
		addPolyfill('form-native-extend', {
			f: 'forms',
			test: function(toLoad){
				return !Modernizr[formvalidation] || bustedValidity  || $.inArray(fNuAPI, toLoad  || []) == -1 || modules[fNuAPI].test();
			},
			d: ['form-core', DOMSUPPORT, 'form-message'],
			c: [6, 5]
		});
		
		addPolyfill(fShim, {
			f: 'forms',
			test: function(){
				return Modernizr[formvalidation] && !bustedValidity;
			},
			d: ['form-core', DOMSUPPORT],
			c: [16, 15]
		});
		
		addPolyfill('form-message', {
			f: 'forms',
			test: function(toLoad){
				return !( formOptions.customMessages || !Modernizr[formvalidation] || bustedValidity || !modules[formExtend].test(toLoad) );
			},
			d: [DOMSUPPORT],
			c: [16, 7, 15, 30, 3, 8, 4]
		});
		
		formExtras = {
			noAutoCallback: true,
			options: formOptions,
			c: [24]
		};
		addModule('form-validation', $.extend({d: ['form-message', 'form-core']}, formExtras));
		
		addModule('form-validators', $.extend({}, formExtras));
				
		addPolyfill(fNuAPI, {
			f: 'forms-ext',
			options: {
				types: 'datetime-local month date time range number'
			},
			test: function(){
				var ret = true;
				var o = this.options;
				if(!o._types){
					o._types = o.types.split(' ');
				}
				
				initialFormTest();
				$.each(o._types, function(i, name){
					if((name in modernizrInputTypes) && !modernizrInputTypes[name]){
						ret = false;
						return false;
					}
				});
				
				return ret;
			},
			methodNames: ['stepUp', 'stepDown'],
			d: ['forms', DOMSUPPORT],
			c: [6, 5, 18, 17],
			nM: 'input inputtypes'
		});
		
		addModule('range-ui', {
			options: {},
			noAutoCallback: true,
			test: function(){
				return !!$.fn.rangeUI;
			},
			d: ['es5'],
			c: [6, 5, 9, 10, 18, 17, 11]
		});
		
		addPolyfill('form-number-date-ui', {
			f: 'forms-ext',
			test: function(){
				var o = this.options;
				initialFormTest();
				//input widgets on old on old androids can't be trusted
				if(bustedWidgetUi && !o.replaceUI && (/Android/i).test(navigator.userAgent)){
					o.replaceUI = true;
				}
				return !o.replaceUI && modules[fNuAPI].test();
			},
			d: ['forms', DOMSUPPORT, fNuAPI, 'range-ui'],
			options: {
				
				widgets: {
					calculateWidth: true,
					monthNames: 'monthNamesShort',
					monthNamesHead: 'monthNames'
				}
	//			,replaceUI: false
			},
			c: [6, 5, 9, 10, 18, 17, 11]
		});
		
		addPolyfill('form-datalist', {
			f: 'forms',
			test: function(){
				initialFormTest();
				return modernizrInputAttrs.list && !formOptions.fD;
			},
			d: ['form-core', DOMSUPPORT],
			c: [16, 7, 6, 2, 9, 15, 30, 31]
		});
	})();
	//>
	
	addPolyfill('filereader', {
		test: 'FileReader' in window,
		d: ['swfmini', DOMSUPPORT],
		c: [25, 26, 27]
//		,nM: 'filereader'
	});
	
	//<details
	if(!('details' in Modernizr)){
		addTest('details', function(){
			return ('open' in document.createElement('details'));
		});
	}
	addPolyfill('details', {
		test: Modernizr.details,
		d: [DOMSUPPORT],
		options: {
//			animate: false,
			text: 'Details'
		},
		c: [21, 22]
	});
	//>
	
	//<mediaelement
	(function(){
		webshims.mediaelement = {};
		
		addPolyfill('mediaelement-core', {
			f: 'mediaelement',
			noAutoCallback: true,
			options: {
				preferFlash: false,
				player: 'jaris',
				vars: {},
				params: {},
				attrs: {},
				changeSWF: $.noop
			},
			methodNames: ['play', 'pause', 'canPlayType', 'mediaLoad:load'],
			d: ['swfmini'],
			c: [16, 7, 2, 8, 1, 12, 13, 19, 25, 20, 23],
			nM: 'audio video texttrackapi'
		});
		
		
		addPolyfill('mediaelement-jaris', {
			f: 'mediaelement',
			d: ['swfmini', DOMSUPPORT],
			test: function(){
				if(!Modernizr.audio || !Modernizr.video || webshims.mediaelement.loadSwf){
					return false;
				}
				
				var options = this.options;
				if(options.preferFlash && !modules.swfmini.test()){
					options.preferFlash = false;
				}
				return !( options.preferFlash && window.swfmini.hasFlashPlayerVersion('9.0.115') );
			},
			c: [21, 19, 25, 20, 28]
		});
		
		bugs.track = (Modernizr.track && (!Modernizr.texttrackapi || typeof (document.createElement('track').track || {}).mode != 'string'));
		
		addPolyfill('track', {
			options: {
				positionDisplay: true,
				override: bugs.track
			},
			test: function(){
				return Modernizr.track && !this.options.override && !bugs.track;
			},
			d: ['mediaelement', DOMSUPPORT],
			methodNames: ['addTextTrack'],
			c: [21, 12, 13, 22, 29],
			nM: 'texttrackapi'
		});
		
		
		addModule('track-ui', {
			d: ['track', DOMSUPPORT],
			c: [29]
		});
		
	})();
	//>
	
	
	//>removeCombos<
	addPolyfill('feature-dummy', {
		test: true,
		loaded: true,
		c: removeCombos
	});
	
	webshims.$ = $;
	webshims.M = Modernizr;
	window.webshims = webshims;
	
	jScripts
		.filter('[data-polyfill-cfg]')
		.each(function(){
			try {
				webshims.setOptions( $(this).data('polyfillCfg') );
			} catch(e){
				webshims.warn('error parsing polyfill cfg: '+e);
			}
		})
		.end()
		.filter('[data-polyfill]')
		.each(function(){
			webshims.polyfill( $.trim( $(this).data('polyfill') || '' ) );
		})
	;
	if(asyncWebshims){
		if(asyncWebshims.cfg){
			webshims.setOptions(asyncWebshims.cfg);
		}
		if(asyncWebshims.lang){
			webshims.activeLang(asyncWebshims.lang);
		}
		if('polyfill' in asyncWebshims){
			webshims.polyfill(asyncWebshims.polyfill);
		}
	}
	return webshims;
}));


/*
Author: York Zhang
Description: This is for displaying the recall information
			 APA specific events handlers are in themes\rad-alt\js\apa-recalls.js
*/

(function($){

	var widgets = {
		recallsInit: function(){
			if(!$(".recalls.content-inside").size()) {return;}


			var container = $(".widgets .content-inside.recalls");
			var markup = $("#recalls-template").html();
			var widgetData = '';

			//checkUserLogin is asynchronous - returns a promise
			var loggedInPromise = instance.checkUserLogin();
			loggedInPromise.success(function (data) {

				if (data.loggedin === "true"){
					var userInfo = $('#user').embeddedData();
					var url = userInfo.vin ? widgets.getRecallsUrl(userInfo.vin) : null;

					if (url) {
						$.ajax({
							type:"GET",
							url: url,
							dataType: "json",
							success: function(data){
								widgetData = data;
								widgetData.rVin = userInfo.vin;
								widgetData.showForm = false;
								$.template("userTemplate",markup);
								$(".widgets .content-inside.recalls").html($.tmpl("userTemplate",widgetData));
								$(".loading", container).hide();
								if(!instance.isMobile()){
									setTimeout("instance.widgetsInit()",4000);
								}
								
								if ($("#recallsvin").length != 0){
									widgets.queryForm();
								}

								// bind APA specific events
								$.publish('apa-recalls',[container,widgetData,markup]);

							}
						});
					}else{
						$(".alert-text", container).css("display","block");
						if(!instance.isMobile()){
							instance.widgetsInit();
						}
					}

				}else{
					//  bind APA specific events
					$.publish('apa-recalls-render', [container, markup]);
					widgets.renderRecallsForm(markup,container);

				}
			});

			// widgets.queryForm();
		},

		
		renderRecallsForm: function(markup,container){
			var widgetData = {};
					
			widgetData.showForm = true;
			widgetData.items = false;
			
			$.template("userTemplate",markup);
			$(".widgets .content-inside.recalls").html($.tmpl("userTemplate",widgetData));
			$(".loading", container).hide();
			if(!instance.isMobile()){
				instance.widgetsInit();
			}

			widgets.queryForm();

			if ($(".findVin a",container).length > 0){
				widgets.messageToggle(container);
			}

		},

		messageToggle: function(container){
			/* hint message toggle. hint message is on apa market */
			var hint = $(".findVin a",container);
			if (hint.length > 0){
				hint.click(function(e){
					e.preventDefault();
					$(this).parent().next().slideToggle(function(){
						if(!instance.isMobile()){
							instance.widgetsInit();
						}
					});
				});
				return false;
			}
		},

		getRecallsUrl:function(vin){
			var config = instance.commonConfig();
			var url = instance.serviceLocator("recalls.vin");
		
			url = url.replace('{vin}', vin).replace('{site}', config.site);
			return url;
		},

		queryForm: function(){
			$("div.content-inside.recalls .recalls-query").on("click", function(e){
				e.preventDefault();

				var container = $(".widgets .content-inside.recalls");
				var queryVin = $("#recallsvin").val();

				if(queryVin.length == 17){

					$(".loading",container).show();
					var markup = $("#recalls-template").html();
					var url = widgets.getRecallsUrl(queryVin);

					$.ajax({
						type:"GET",
						url: url,
						dataType: "json",
						success: function(data){
							var widgetData = data;
							widgetData.rVin = queryVin;
							widgetData.showForm = false;
							$.template("userTemplate",markup);
							$(".widgets .content-inside.recalls").html($.tmpl("userTemplate",widgetData));
							$(".loading", container).hide();
							if(!instance.isMobile()){
								instance.widgetsInit();
							}

							if ($("#recallsvin").length != 0){
								widgets.queryForm();
							}

							// bind APA specific events
							$.publish('apa-recalls',[container,widgetData,markup]);

						},
						error: function(data, status, error){
							if (error === "Not Found"){
								$(".loading", container).hide();
								$(".alert-text", container).show();
							}
						}
					});

				}else{
					$("div.content-inside.recalls p.error").show();
					if(!instance.isMobile()){
						instance.widgetsInit();
					}
					
					return false;
				}

			});
		}
	};

	$(function(){
		widgets.recallsInit();
	});

})(jQuery);




/*
Author: York Zhang
Description: This is for displaying the recall information
*			 APA specific events handlers are in themes\rad-alt\js\apa-manuals.js
*/

(function($){

	var widgets = {
		
		manualsInit: function(){
			if(!$(".manuals.content-inside").size() || $("body").hasClass("apa")) {return;}

			container = $(".widgets .content-inside.manuals");
			var markup = $("#manuals-template").html();
			var bodycss = $("body").hasClass("forceshowform");
			var widgetData = '';

			//checkUserLogin is asynchronous - returns a promise
			if (bodycss == true){
			
				widgets.islogin=false;
				widgets.renderManualsForm();
			
			}else{
			
			var loggedInPromise = instance.checkUserLogin();
			loggedInPromise.success(function (data) {
				
				if (data.loggedin === "true"){
					
					var userInfo = $('#user').embeddedData();
					var url = userInfo.vin ? widgets.getManualsDetailsByVinUrl(userInfo.vin) : null;
					
                    widgets.islogin=true;

					if (url){

						$.ajax({
							type:"GET",
							url: url,
							dataType: "json",
							success: function(data){
								widgetData = {};
								widgetData.items = data;
								widgetData.mYear = "";
								widgetData.mModel = "";
								widgetData.mVin = userInfo.vin;
								widgetData.mName = userInfo.vehicleNickname;
								
								if(widgetData.items.length > 0){
									widgetData.showForm = false;
								}else{
									widgetData.showForm = true;
									
								}

								$.template("manualsTemplate",markup);
								$.tmpl("manualsTemplate",widgetData).appendTo(container);

								if(widgetData.showForm){
									widgets.manualSelect();
								}

								$(".loading", container).hide();
								if(!instance.isMobile()){
									instance.widgetsInit();
								}

							},
							error: function(XMLHttpRequest, textStatus, errorThrown){
								if(XMLHttpRequest.status == 404){
									widgets.renderManualsForm();
								}
							}
						})
					} else{
						$(".alert-text", container).css("display","block");
						if(!instance.isMobile()){
							instance.widgetsInit();
						}
						
					}
					
				} else {

					widgets.islogin=false;
					widgets.renderManualsForm();
				}			
			});
			
			}
		},
		islogin:false,

		renderManualsForm: function(){
			var markup = $("#manuals-template").html();
			var widgetData = {};
			widgetData.showForm = true;
			widgetData.login=widgets.islogin;
			var container = $(".widgets .content-inside.manuals");

			$.template("manualsTemplate",markup);
			$.tmpl("manualsTemplate",widgetData).appendTo($(".manuals.content-inside"));
			$(".loading", container).hide();

			if(!instance.isMobile()){
				instance.widgetsInit();
			}

			widgets.manualSelect();

			if ($(".findVin a",container).length > 0){
				widgets.messageToggle(container);
			}

		},

		getManualsDetailsByVinUrl: function(vin){
			
			var config = instance.commonConfig();
			var url = instance.serviceLocator("pts.vin");
			
			url = url.replace('{vin}', vin).replace('{locale}', config.locale);

			if (config.locale === ''){
				url = url.substring(0,url.length - 1);
			}
			
			return url;
		},

		getManualsSelectUrl: function(){
			
			var config = instance.commonConfig();
			var url = instance.serviceLocator("pts.yearmodel");
			
			url = url.replace('{locale}', config.locale);

			if (config.locale === ''){
				url = url.substring(0,url.length - 1);
			}

			return url;
		},

		getManualsDetailsByYearUrl: function(year, model){
			
			var config = instance.commonConfig();
			var url = instance.serviceLocator("pts.yearvehicle");
			// console.log(url);
			url = url.replace('{year}', year).replace('{model}', model).replace('{locale}', config.locale);

			if (config.locale === ''){
				url = url.substring(0,url.length - 1);
			}

			return url;
		},

		manualSelect: function(){
			var url = widgets.getManualsSelectUrl();

			var loadingOption = '<option value="" class="loading"></option>';
			$("#modelyear").append(loadingOption);

			$.ajax({
					type:"GET",
					url: url,
					dataType: "json",
					success: function(data){
						var yearsOption = "";

						$.each(data, function(index, value){
							var year = value.year;
							yearsOption += "<option value='" + year + "'>" + year + "</option>";
						});
						$("#modelyear .loading").remove();
						$("#modelyear").append(yearsOption);

						$("#modelyear").on("change", function(){
							var $this = $(this),
								selectedYear = $this.val();

							if(selectedYear.length){
								
								$.each(data, function(index, value){

									if(value.year == selectedYear){
										var modelsOption = "",
											showModels = value.models;

										$.each(showModels, function(index, model){
											modelsOption += "<option value='" + model.model + "'>" + model.model + "</option>";
										});

										$("#modelnameplate").html(modelsOption);
									}
								});
							}else{
								$("#modelnameplate").html("<option value=''>Select</option>");
							}
						});

					}
				});

			widgets.queryForm();
		},

		queryForm: function(){
			$("div.content-inside.manuals .manuals-query").on("click", function(e){

				e.preventDefault();
				var queryYear = $("#modelyear").val(),
					queryModel = $("#modelnameplate").val(),
					queryVin = $("#manualsvin").val(),
					alertMsg = $("div.content-inside.manuals p.alert-text");

				if(queryVin.length == 17){

					$("div.content-inside.manuals span.loading").show();
					if(!instance.isMobile()){
						instance.widgetsInit();
					}
					var markup = $("#manuals-template").html();
					var url = widgets.getManualsDetailsByVinUrl(queryVin);

					$.ajax({
						type:"GET",
						url: url,
						dataType: "json",
						success: function(data){
							var widgetData = {};
							widgetData.items = data;
							widgetData.mYear = queryYear;
							widgetData.mModel = queryModel;
							widgetData.mVin = queryVin;

							$.template("manualsTemplate",markup);
							$("div.content-inside.manuals").html($.tmpl("manualsTemplate",widgetData));
							$("div.content-inside.manuals span.loading").hide();
							if(!instance.isMobile()){
								instance.widgetsInit();
							}

						},
						error: function(XMLHttpRequest, textStatus, errorThrown){
							if(XMLHttpRequest.status == 404){

								var widgetData = {};
								widgetData.items = false;
								widgetData.mYear = queryYear;
								widgetData.mModel = queryModel;
								widgetData.mVin = queryVin;

								$.template("manualsTemplate",markup);
								$("div.content-inside.manuals").html($.tmpl("manualsTemplate",widgetData));
								$("div.content-inside.manuals span.loading").hide();
								$("div.content-inside.manuals p.alert-text").show();
								if(!instance.isMobile()){
									instance.widgetsInit();
								}
								
							}
						}
					});
				}else if(queryModel.length){

					$("div.content-inside.manuals span.loading").show();
					if(!instance.isMobile()){
						instance.widgetsInit();
					}

					var markup = $("#manuals-template").html();
					var url = widgets.getManualsDetailsByYearUrl(queryYear, queryModel);

					var jqXHR = $.getJSON(url, function(data){

						var widgetData = {};
						widgetData.items = data;
						widgetData.mYear = queryYear;
						widgetData.mModel = queryModel;
						widgetData.mVin = queryVin;

						if(widgetData.items.length > 0){
							widgetData.showForm = false;
						}else{
							widgetData.showForm = true;
						}

						$.template("manualsTemplate",markup);
						$("div.content-inside.manuals").html($.tmpl("manualsTemplate",widgetData));
						if(!instance.isMobile()){
							instance.widgetsInit();
						}
						
					}).fail(function(){

						var widgetData = {};
						widgetData.items = false;
						widgetData.mYear = queryYear;
						widgetData.mModel = queryModel;
						widgetData.mVin = queryVin;

						$.template("manualsTemplate",markup);
						$("div.content-inside.manuals").html($.tmpl("manualsTemplate",widgetData));
						$("div.content-inside.manuals span.loading").hide();
						$("div.content-inside.manuals p.alert-text").show();
						if(!instance.isMobile()){
							instance.widgetsInit();
						}
							
					});
				}else{
					$("div.content-inside.manuals p.error").show();
					if(!instance.isMobile()){
						instance.widgetsInit();
					}
				}

			});
		}
	};

	$(function(){

		widgets.manualsInit();
		
		if($("form.manuals-search").size()){			
			widgets.renderManualsForm();
		}
		
	});

})(jQuery);




/*
Author: York Zhang
Description: This is for displaying the coupons widget
*/

(function($){

	var widgets = {
		
		couponsInit: function(){
			if(!$(".coupons-widget.content").size()) {return;}

			var container = $(".coupons-widget.content");
			var markup = '<li><div><div class="content coupons-widget">'+$("#coupons-template").html()+'</div></div></li>';
			var wigtul=container.parent().parent().parent();

			//checkUserLogin is asynchronous - returns a promise
			var loggedInPromise = instance.checkUserLogin();

			loggedInPromise.success(function (data) {
				
				if (data.loggedin === "true"){

					var url = widgets.getCouponsUrl();

					$.ajax({
						type:"GET",
						url: url,
						dataType: "json",
						success: function(data){

							var widgetData = data;

							if(data.length > 0){
                                container.parent().parent("li").remove();
								$.each(widgetData,function(i){
								$.template("manualsTemplate",markup);
								wigtul.append($.tmpl("manualsTemplate",widgetData[i]));
								})
								

								if($(window).width() > 767){
									
									$.each($("img.lazy",wigtul),function(i,value){
										var $this = $(this);
										var imgUrl = $this.attr("data-hires");
										$this.attr("src",imgUrl);
									});
									
									
								}
								
							}else{
								container.parent().parent("li").remove();
							}

							instance.widgetsInit();

						},
						error: function(XMLHttpRequest, textStatus, errorThrown){

							if(XMLHttpRequest.status == 404){

								container.parent().parent("li").remove();
								instance.widgetsInit();
							}
						}
					});

				} else {

					// if user not logged in, remove widget from DOM
					$(".widget-coupons").remove();

				}

			});
			
		},

		getCouponsUrl: function(){
			var url = instance.serviceLocator("owner.campaign");
			return url;
		}

	};

	$(function(){

		widgets.couponsInit();
		
	});

})(jQuery);




/*
Author: Ruiwen Qin
Description: This is for displaying the dealer information
*/

(function($){

	var widgets = {
		
		fetchAndDisplayDealerDetails: function(dealerCode) {
			if (typeof dealerCode !== undefined) {
				//[MK] prepare a URL get the dealer details
			 	url = widgets.setupDealerDetailsUrl(dealerCode); 

			 	if (url){
					data = widgets.fetchData(url, function(data) {
						widgets.renderTemplate(data,true);
					}, function () {
						widgets.renderTemplate(data,false);
					});
				 	
			 	}	else { // url is not available
					widgets.renderTemplate(data,false);
				}
			 	
			} else {
				widgets.renderTemplate(data,false);
			}
		},
			
		dealerInit: function(){

			//check if we have dealer template snippet here
			//if not - return - we are on the page with no dealer widget
			if ($("#dealer-template").length == 0 && $("#dealer-template-not-loggedin").length == 0) return; 
			
			var url = null,
			    dealerCode = null,
			    data = null,
			    success = false,
			    store = Object.create(ND.cacheStore);
			    
			//set the cookie name and other cookie params 
			store.key = "dfy.dl";
			store.expires = 365;
			store.domain = instance.commonConfig().cookieDomain;
			
			//
			//[MK] First step is to get the cookie
			//
			if (store.is()){ //cookie exists
			// if (store.key === "dfy.dl"){
			 	// dealerCode = store.get();
			 	dealerCode = $.trim($.cookie(store.key)); // for fixing JSON.parse() issue in IE10

			 	widgets.fetchAndDisplayDealerDetails(dealerCode);

			} else { //cookie does not exist
				
				//checkUserLogin is asynchronous - returns a promise
				var loggedInPromise = instance.checkUserLogin();
				loggedInPromise.success(function (data) {

					// console.log("promise resolved: " + data.loggedin);
					
					if (data.loggedin === "true"){ 
	
						// user has logged in - prepare the url to get the dealer code
						url = widgets.setupOwnerDealerUrl();

						if (url){
							widgets.fetchData(url,
								function (data) {
									//[MK] error handling should go here - what will happen when no data is returned? Call widgets.renderTemplate(data,false);?
									if (typeof data !== "undefined" && $(data).length != 0
											&& typeof data.dealercode !== "undefined" && data.dealercode.length > 0){
										dealerCode = data.dealercode;
										widgets.storeCookie(store, dealerCode);
										widgets.fetchAndDisplayDealerDetails(dealerCode);
									} else {
										widgets.renderTemplate(data,false);
									}
								},
								function () {
									widgets.renderTemplate(data,false);
								});
							
						}
						else {// url is not available
							widgets.renderTemplate(data,false);
						}
						
					}	else{
	
						// user has not logged in
						widgets.notLoggedInTemp();
					}				
				});
			}
		},
		

		//[MK] This functions prepares the url which gets the dealer details
		setupDealerDetailsUrl: function(dealerCode){
			var path = instance.serviceLocator('dealer.code');
			path = path.replace("{code}", dealerCode);
			return path;
		},

		//[MK] This functions prepares the url which gets the dealer code (no parameters)
		setupOwnerDealerUrl: function(dealerCode){
			var path = instance.serviceLocator('owner.dealer');
			return path;
		},
		
		fetchData: function(url, onSuccess, onError){
			$.ajax({
	  			url: url,
	  			async: true,
	  			dataType: 'json', 
	  			success: function(data){
	  				onSuccess(data);
	  			},
				error: function(e, extStatus){
					onError(url, e, extStatus);
				}
	  		});	
		},

		
		// [MK] if you follow my advice you would not need to go through this
		// calculate expirry date business. You'd just need to pass 365 as an
		// argument
		storeCookie: function(store,dealerCode){

			
			//store the cookie with the default options
			store.set(dealerCode);

		},

		renderTemplate: function(data,success){
			if ($(".widgets").length > 0){
				var container = $(".widgets .dealer");
			}

			if ($(".dealer-results .preferred-dealer").length > 0){
				var container = $(".dealer-results .preferred-dealer .dealer");
			}
			
			if (success){
				var markup = $("#dealer-template").html();
				$.template("dealerTemplate",markup);
				$.tmpl("dealerTemplate",data).appendTo(container);
				$(".loading", container).hide();
				if(!instance.isMobile()){
					instance.widgetsInit();
				}

				if (container.length > 0){
					// bind APA specific events - apa-dealer.js
					$.publish('apa-dealer',[container,data,markup]);
				}

				if ($(".dealer-results .preferred-dealer").length > 0){
					// bind APA specific events - apa-dealerMap.js
					$.publish('apa-preferred-dealer-mapPin',[data]);
				}
			}

			else{
				$(".loading", container).hide();
				widgets.notLoggedInTemp();
			}
		},

		notLoggedInTemp: function(){
			var container = $(".widgets .dealer");
			var markup = $("#dealer-template-not-loggedin").html();
			$(markup).appendTo(container);
			$(".loading", container).hide();

			if (container.length > 0){
				// bind APA specific events
				$.publish('apa-dealer-notLoggedIn',[container]);
			}
			
			if(!instance.isMobile()){
				instance.widgetsInit();
			}

			if ($(".dealer-results .preferred-dealer").length > 0){

				// bind APA specific events - apa-dealerMap.js
				$.publish('apa-preferred-dealer-mapPin-notLoggedIn');
			} 
		}

		
	};

	$(function(){
		widgets.dealerInit();
	});

})(jQuery);




/*
Author: York Zhang
Description: Owner Avatar Icon login/logout dropdown
*/

(function($){

	var avatar = {
		init: function(){
			if(!$(".account-menu").size() || !$("#avatar-dropdown").size()) {return;}
			
			var loggedInPromise = instance.checkUserLogin();
			loggedInPromise.success(function (data) {
				//console.log("login",data.loggedin);
				if (data.loggedin === "true"){
					var $listItem = $("div.account-menu.list-items");
					var markup = $("#avatar-dropdown");

					$listItem.html("");

					$.template("avatarDropdown",markup);
					$.tmpl("avatarDropdown",data).appendTo($listItem);

					if ($("#toolbar .signup").length > 0){
						$("#toolbar .signup").hide();
					}
				}
				
			});
		}
	};

	$(function(){
		avatar.init();
	});

})(jQuery);




/*
Author: York Zhang
Description: Let user set prefered dealer on dealer locator page
*/

(function($){

	var dealer = {
		
		setPreferedDealer: function(){
			
			$(".set-preferred").click(function(e){
				e.preventDefault();

				var $this = $(this);
				var dealerCode = $this.parents(".dealer").attr("id");
				var dealerRegion = $this.parents(".dealer").attr("data-region");

				var store = Object.create(ND.cacheStore);
				store.key = "dfy.dl";
				store.expires = 365;
				store.domain = instance.commonConfig().cookieDomain;

				store.set(dealerCode);

				$("#successful-content").foundation('reveal', 'open', {
					animationSpeed: 110
				});
				if (window._da && window._da.om && ND && ND.omniture) {	
					_da.events = undefined;
					_da.tool = undefined;
					_da.onclicks = undefined;
					_da.funnel.stepname = "preferred dealer";
					if(dealerRegion){
						_da.region = dealerRegion;	
					}	            
		            _da.dealer = {code: dealerCode}
					ND.analyticsTag.trackOmniturePage();
				}
				// $.publish('apa-set-preferred-dealer',[dealerCode]);
			});

			$("#successful-content .close-reveal-modal, .reveal-modal-bg").live("click", function(e){
				e.preventDefault();
				$('#successful-content').foundation('reveal', 'close');

				if ($(".dealer-map-pagination").length > 0){
					location.reload(); // updating the preferred dealer
				}
			});

		},

		showOrHideDealerBtn: function(){
			var loggedInPromise = instance.checkUserLogin();
			loggedInPromise.success(function (data) {
				// console.log("login",data.loggedin);
				if (data.loggedin === "true"){
					$(".set-preferred").css('visibility','visible');
				}
			});
		}

	};

	$(function(){
		if(!$(".set-preferred").size()) {return;}
		dealer.showOrHideDealerBtn();
		dealer.setPreferedDealer();
		
	});

})(jQuery);




(function($){

	var siteTypeUtils = {

			
		init: function(){
			
			//check if the cookie exist
			//set the cookie name and other cookie params 
			var store = Object.create(ND.cacheStore);
			store.key = "dfy.st";
			store.expires = 30;//30 days expiry
			store.domain = instance.commonConfig().cookieDomain;
			
			if (store.is()){ //cookie exists
				//console.log("dfy.st cookie exists")
				this.multiPlatformLinks(store.get()) //so process links
			} else {
				//get the promise from rad modules and wait till resolved
				//console.log("no dfy.st cookie exists")
				var siteTypePromise = instance.checkSiteType();
				siteTypePromise.success(function (data) {
					//console.log("got site type " + data)
				    store.set(data.siteType);
					siteTypeUtils.multiPlatformLinks(data.siteType);
				});
				siteTypePromise.error(function () {
					//console.log("unable to get site type.");
				});
			}
		},
	
		updateLink: function(anchor, siteType){
			var href = anchor.attr('data-href' + siteType);
			if (typeof href !== 'undefined' && href != '') {
				anchor.attr('href', href);
				//console.log("updated " + anchor);
			}
		},
			
		multiPlatformLinks: function(siteType){
			
			if (siteType !== 'web') {
				//process multi platform links and apply links specific to the device
				$('a.multiplatform').each(function() {
					if (siteType == 'smob' || siteType == 'mob') {
						siteTypeUtils.updateLink($(this), siteType);
					}
				});
			}
		}
	};
	
	$(function(){
		//console.log('siteTypeUtils init');
		siteTypeUtils.init();
	});

})(jQuery);


/*
Author: York Zhang
Description: overlay initialize
*/

(function($){

	$(function(){
		if(!$(".reveal-link").size()) {return;}
		
		$(document).foundation('reveal',{
			animationSpeed: 250
		});
/*		$(".reveal-link").click(function(){
			$(document).foundation('reveal','open');
		});*/
	});

})(jQuery);




//Try to resolve app loader.
if( window.resolve$wait ) {
	resolve$wait();	
}


/* Validate User Profile */
(function(window, document){
	
	var ND = window.ND = window.ND || {};

	/*
	 * ExpandBox: When user click on an anchor,
	 * Expand/Close the closet element of ".group", via add/remove the class of ".add";
	 */
	var ExpandBox = ND.ExpandBox = function($btns){
		/*Expose the api to other application*/
		ExpandBox.expand = function($btn, flag){
			var $group = $btn.closest(".group");
			if(arguments.length < 2){
				$group.toggleClass("close");
			}else{
				flag ? $group.removeClass("close") : $group.addClass("close");
			}
		};

		$btns.live("click",function(e){
			e.preventDefault();
			e.stopPropagation();
			ND.ExpandBox.expand($(this));
		});
	};

	var Validate =  ND.Validate = function(){

		var validate = this, $form;

		//validate result
		validate.result = true;
		//validate fields
		validate.array = [];

		/*
		 * Check username is existing via ajax
		 * Etc. <a class="icon-check" target="#uaername" href="SYNC-User-data.js"></a>
		 * Post the data: username =  $("#username").val();
		 * Handle the callback: $("#msg-username").text(callbackdata);
		 */
		validate.isExist = function($inputs){
			$inputs.each(function(){
				var $input = $(this),
					$tip = $input.data("vtip"),
					$chk = $input.data("vchk"),
					$msg = $input.data("vamsg"),
					json = $input.data("vjson");

				//When target field changed, change the icon back to "check" state.
				$input.keyup(function(e){
					$chk.removeClass("hide")
						.addClass("icon-check");
					$msg.addClass("hide");
				});

				var exist = function(e){
					//If other error message aviliable, skip the ajax check.
					if($(".alert:visible", $input.parent()).size() > 0){
						return;
					}

					var //$field = $(this).parent().find("input"),
						//$chk = $field.data("vchk"),
						//$tip = $input.data("vtip"),
						data = {},
						href = $chk.attr("href");

					var dataAry = json.data.split(',');
					for(var i in dataAry){
						data[dataAry[i]] = $("[name='" + dataAry[i] + "']", $form).val();
					}

					if (href) {
						$.ajax({
							type: "POST",
							url: href,
							data: data,
							dataType: 'json',
							success: function(msg){
								if (msg){
									if(msg.valid) {
										$chk.addClass("hide");
										//$chk.removeClass("icon-check icon-wrong").addClass("icon-right");
										$msg.addClass("hide");
									} else {
										$chk.removeClass("hide");
										$tip.addClass("icon-wrong");
										//$chk.removeClass("icon-check icon-right").addClass("icon-wrong");
										validate.result = false;
										ND.ExpandBox.expand($input, true);

										if(msg.message){
											$msg.removeClass("hide")
												.addClass("tips")
												.text(msg.message);
										}
									}
								}
							},
							error: function(e){
								//console.log("error", data);
							}
						});
					}
				};

				//delay some time to execute the validate progress, in order to let other validation complete.
				var delay = function(e){
					e.preventDefault();
					setTimeout(function(){
						exist(e);
					}, 100);
				};

				//When user click the "check" btn,  or jump from the input fields
				$input.focusout(delay);
				$chk.click(delay);
				//we will not check aajax on submit event
				//validate.array.push([$btns, "click"]);
			});
		};
		
		/*
		 * Etc: <input type="text" id="email" name="email" />
		 * Alert Msg: <p id="msg-email">Alert Information</p>
		 */
		validate.isMatch = function($fields){
			$fields.focusout(function(e){
				var $field = $(this),
					json = $field.data("vjson"),
					$tip = $field.data("vtip"),
					$msg = $field.data("vmsg");

				var regExp = new RegExp(json.reg);

				if($field.val() !="" && !regExp.test($field.val()) || json.required =="true" && $field.val() =="" ){
					$tip.removeClass("icon-right hide")
						.addClass("icon-wrong");
					$msg.removeClass("hide");
					$msg.html(json.regmsg);
					$field.css('border','1px solid red');
					validate.result = false;
					ND.ExpandBox.expand($field, true);
				}else{
					$tip.removeClass("icon-wrong hide")
						.addClass("icon-right");
					$msg.addClass("hide");
					$field.css('border','');
				}
			});
			validate.array.push([$fields, "focusout"]);
		};

		/*
		 * Etc: Check 2 password is equal
		 * or Check new password and old password should not be equal.
		 */
		validate.isEqual = function($repasswords){
			$repasswords.focusout(function(e){
				var $repassword = $(this),
					json = $repassword.data("vjson"),
          tags = $repassword.data("tags") || [],
					$password = $repassword.closest("form").find("input[name='" + json.target + "']"),
					$tip = $repassword.data("vtip"),
					$msg = $repassword.data("vmsg");

				//If other error message aviliable, skip the ajax check.
				if($(".alert:visible", $repassword.parent()).size() && tags.join().indexOf("fields") >= 0 ){
					return;
				}

				var condition = function(){
					if(json.different){
						return $repassword.val() == $password.val();
					}
					return $repassword.val() != $password.val();
				};

				if(condition() || $password.val() == ""){
					$tip.removeClass("icon-right hide")
						.addClass("icon-wrong");
					$msg.removeClass("hide");
					$msg.html(json.eqmsg);

					validate.result = false;
					ND.ExpandBox.expand($repassword, true);
				}else{
					$tip.removeClass("icon-wrong hide")
						.addClass("icon-right");
					$msg.addClass("hide");
				}

			});
			validate.array.push([$repasswords, "focusout"]);
		};

		/*
		 * Etc: Check if user accept the terms and privacy.
		 */
		validate.isAccepted = function($items){
			$items.change(function(e){
				var $item = $(e.target),
					$msg = $item.data("vmsg"),
					json = $item.data("vjson");

				if($item.attr("checked") == "checked"){
					$msg.addClass("hide");
				}else{
					$msg.html(json.acpmsg);
					$msg.removeClass("hide");
					validate.result = false;
				}
			});
			validate.array.push([$items, "change"]);
		};

		validate.flexfield = function(json){

			//event handler
			var handler = function(e){
				e.preventDefault();

				var cfg = {}, data={}, paraname, href;
				for(paraname in json){
					cfg = json[paraname];
					href = cfg.url;
				}
				var $container = $(this).closest(".flexfield")
					, $field = $("input[name^='" + cfg.data + "']", $container)
					, $msg = $("p.alert", $container)
					, $chk = $(".icon-check", $container)
					, $tip = $(".icon-wrong, .icon-right", $container);

				data[paraname] = $field.val();

				if (href && $field.val()) {
					$.ajax({
						type: "POST",
						url: href,
						data: data,
						dataType: 'json',
						success: function(msg){
							if (msg){
								if(msg.valid) {
									$chk.addClass("hide");
									$tip.removeClass("icon-wrong hide")
										.addClass("icon-right");
									$msg.addClass("hide");
									//$field.attr({"readonly":"readonly"});
								} else {
									$chk.removeClass("hide");
									$tip.removeClass("icon-right hide")
										.addClass("icon-wrong");
									validate.result = false;

									if(msg.message){
										$msg.removeClass("hide")
											.addClass("tips")
											.text(msg.message);
									}
								}
							}
						},
						error: function(e){
							//console.log("error", data);
						}
					});
				}
			};

			//delegate event
			//$(".double", $form).delegate("input", "focusout", handler);
			$(".double", $form)
				.delegate(".icon-check", "click", handler)
				.delegate("input[name^='vehicle_vin']", "focusout", handler);
		};

		/*
		* Check All the validations in Array, by trigger the validate event.
		*/
		validate.check = function(){
			validate.result = true;
			for(var len = validate.array.length; len--;){
				validate.array[len][0].trigger(validate.array[len][1]);
			}
			return validate.result;
		};

		/*
		  * Add tip information and
		  * 0001 : has the msg icon
		  * 0010 : has the right/wrong icon, this is hidden by default
		  * 0100 : has the refresh icon, this is visibility by default
		  * 1000 : has the ajax msg icon
		  * <a class="tip icon-check"></a>
		  * <a class="tip hide"></a>
		  */
		var MESSAGE = 1,
			TIP = 10,
			CHECK = 100,
			AJAXMSG = 1000;

		validate.prepare = function(jsoncfg, flag, fuc, tag){
			//store the json configration
			//$input.data({ validate:cfg });

			for(var i in jsoncfg){
				//console.log(i);
				var $input = $("[name='" + i + "']", $form),
					$vtip = $input.data("vtip"),
					$vmsg = $input.data("vmsg"),
					$vchk = $input.data("vchk"),
					$vamsg = $input.data("vamsg"),
					$temp;

				if($input.size()){
					//merge the former validations.
					var vjson = $input.data("vjson") || {},
              		tags = $input.data("tags") || [];


					$.extend(vjson, jsoncfg[i]);
					tags.push(tag);
					$input.data({"vjson" : vjson, "tags" : tags});

					if(typeof $vchk == "undefined"){
						if(flag & CHECK){
							$temp = $('<a class="icon-check" href="{0}"></a>'.replace('{0}', jsoncfg[i].url));
							$input.after($temp);
							$input.data({ vchk: $temp });
						}
					}
					if(typeof $vtip == "undefined"){
						if(flag & TIP){
							$temp = $('<a class="icon-wrong hide"></a>');
							$input.after($temp);
							$input.data({ vtip: $temp });
						}
					}
					if(typeof $vmsg == "undefined"){
						if(flag & MESSAGE){
							$temp = $('<p class="alert hide"></p>');
							$input.parent().append($temp);
							$input.data({ vmsg: $temp });
						}
					}
					if(typeof $vamsg == "undefined"){
						if(flag & AJAXMSG){
							$temp = $('<p class="alert hide"></p>');
							$input.parent().append($temp);
							$input.data({ vamsg: $temp });
						}
					}

					//validate function
					fuc($input);
				};
			}
		};

		/*praw json interface*/
		validate.parseJson = function(formjson){
			/*validate configuration from the json*/
			if(formjson.ajax){
				validate.prepare(formjson.ajax, "1110", validate.isExist, "ajax");
			}
			if(formjson.fields){
				validate.prepare(formjson.fields, "0011", validate.isMatch, "fields");
			}
			if(formjson.equal){
				validate.prepare(formjson.equal, "0011", validate.isEqual, "equal");
			}
			if(formjson.accept){
				validate.prepare(formjson.accept, "0001", validate.isAccepted, "accept");
			}
			if(formjson.flexfield){
				validate.flexfield(formjson.flexfield);
			}
		};

		validate.parseConfig = function(config){
			switch(typeof config){
				//if it's a json object
				case "object":
					validate.parseJson(config);
					break;
				//if it's a string url
				case "string":
					$.ajax({
						type: "GET",
						data: {},
						url: config,
						dataType: 'json',
						success: function(data){
							validate.parseJson(data);
						},
						error: function(e){
							//console.log("error", e);
						}
					});
					break;
			}
		};

		/*checked all matched fields*/
		validate.init = function(form){
			$form = $(form);
			var cancel = false;

			var config = window[$form.attr("name")];
			//console.log($form.attr("name"));
			if(config){
				validate.parseConfig(config);

				//when user click on the submit button, one error message displayed by "focusout", the position moved, 
				//so user will not release on that button, so the submit event canceled in IE.
				$("input[type='submit']", $form).mousedown(function(e){
					validate.check();
					//If no error message submit the form
					if($(".alert:visible", $form).size() < 1){
						//remove grey options before submit.
						$(".flexfield.grey:visible").remove();
						//submit manually
						cancel =  false;
						$form.submit();
					}

					cancel = true;
				});

				$form.submit(function(e){
					if(cancel){
						//152786	Bug	Start	User Profile - QA FOA - Reset Password Request page - On the browser IE9, the request email will sent twice when user clicks the "reset my password" button.
						//cancel the submit event by stopping propup the mousedown event.
						e.preventDefault();
						e.stopPropagation();
						return false;
					}else{
						return true;
					}
				});

				//clear all the error messages.
				$("input[type='reset']", $form).mousedown(function(e){
					$(".alert:visible", $form).each(function(){
						$(this).addClass("hide");
					});

					//#152753 User Profile - QA FOA - Reset button - If the registration form has a error message and some input data then user clicks the reset buton, the error message is disappeared but the data is still there.
					$form[0].reset && $form[0].reset();
				});
			}
		};

	};


	/*
	* Add add/remove button on fields
	*/
	var FlexField = ND.FlexField = function(){
		var flexField = this;

		flexField.defaults = {
			container: "form .double",
			fieldsTmpl: ".flexfield.tmpl",
			addBtn: ".icon-add",
			removeBtn: ".icon-remove"
		};

		flexField.init = function(options){
			var settings = $.extend(flexField.defaults, options);

			var $fieldsTmpl = $(settings.fieldsTmpl).first(),
				$container = $(settings.container);

			//$(htmlRemove).appendTo($fieldsGroup);
			var $fieldsTemp = $fieldsTmpl.clone().removeClass("tmpl");

			var $btnAdd = $(settings.addBtn).click(function(e){
					e.preventDefault();
					var $flexFields = $(this).closest(".double").find(".flexfield");

					if($flexFields.size() < 10){
						$fieldsTemp.clone().insertBefore($btnAdd.parent());
					}

					//rename the queue, skip the template,  retain the flexfield group first
					$flexFields = $(this).closest(".double").find(".flexfield");
					for(var i=2;i <= $flexFields.size(); i++){
						//+1 of the name
						$("input", $flexFields.eq(i-1)).each(function(){
							var $input = $(this);
							$input.attr({
								"name": $input.attr("name").replace(/\d+$/g, i)
							});
						});
					}
				});

			/*remove the grey tips*/
			$container.delegate("input", "click", function(e){
				var $flexField = $(this).closest(".flexfield");
				if($flexField.hasClass("grey")){
					$flexField.removeClass("grey");
					$("input", $flexField).val("");
				}
			});

			$container.delegate(settings.removeBtn, "click", function(e){
				e.preventDefault();
				$(this).parents(".flexfield").remove();
			});
		}
	};

	$(function(){

        
          
		new ExpandBox($(".ibtn"));
        (new FlexField()).init();

		/*validate each form*/
		$(document).ready(function(){
			$(".validate").each(function(){
				var validate = new Validate();
				validate.init($(this));
			});
		});
	});

})(window, document);


/*
 * This file combine 2 versions of bing map together for each market to switch between these 2 versions
 */
(function($) {
	//Adds up the values of all the selected elements
	jQuery.fn.totalValString = function() {
		var total = '';
		this.each(function() {
			total = total + jQuery(this).val().replace(/[\s\t\n]/g, '');
		});
		return total;
	};
})(jQuery);

(function($) {
	var ND = window['ND'] || {};

	ND.loadScript = function(url, callback) {

		var script = document.createElement("script")
		script.type = "text/javascript";

		if (script.readyState) {//IE
			script.onreadystatechange = function() {
				if (script.readyState == "loaded" || script.readyState == "complete") {
					script.onreadystatechange = null;
					callback();
				}
			};
		} else {//Others
			script.onload = function() {
				callback();
			};
		}

		script.src = url;
		document.body.appendChild(script);
	};

	/*
	 * BingMap has the depandence of document.attachEvent, it may not ready when called by $wait in Firefox.
	 * only use for version6 . version7 doesnt have this issue
	 */
	var isReady = function(func) {
		if ( (typeof (Microsoft) == "undefined" || typeof (Microsoft.Maps) == "undefined") && $.browser && $.browser.mozilla) {
			$ready("document.attachEvent", func);
		} else {
			func();
		}
	};

	ND.dealerLocator = {
		data : [],
		dl : [],
		init : function(zoom, lng, lat, key, country) {
			var self = this;
			var args = arguments;

			isReady(function() {
				if (args.length > 0) {
					self.dl = new DealerLocator({
						mapId : "dealer-map",
						lng : lng,
						lat : lat,
						zoom : zoom,
						key : key,
						country : country
					});
					//eg. 133.769531, -25.244696, 4
				} else {
					self.dl = new DealerLocator({
						mapId : "dealer-map",
						lng : 0,
						lat : 0,
						zoom : 0
					});
				}
				self.dl.setSearch(self.data);
				self.domInit();
			});
		},
		directions : function(endPoint, lang) {
			var self = this;
			var working = false;

			isReady(function() {
				$(function() {
					var holder = document.createElement("div");
					holder.innerHTML = document.getElementById('get_directions').innerHTML;
					var $getDir = $(holder);
					var $miniForm = $('.mini-dealer-form');
					/* For Owner */
					if ($(".owner-map").size()) {
						$getDir.addClass("dealer-route");
						$miniForm = $(".dealer-details");
					}

					$getDir.insertAfter($miniForm);
					$getDir.find('form').submit(function(e) {
						var $this = $(this);
						var $mapDirectionsStart = $('#map-directions-start');
						var jmsg = $this.find('.message').length > 0 ? $this.find('.message') : $('<p class="message">' + $('#directions-failed-message').val() + '</p>');
						if ($mapDirectionsStart.val().length > 0) {
							jmsg.hide(0);
							if (!working) {
								working = true;
								self.dl.findRoute($mapDirectionsStart.val(), endPoint, lang, function() {
									working = false;
								});
							}
						} else {
							$this.prepend(jmsg.hide(0));
							jmsg.slideDown();
						}
						e.preventDefault();
					});
					$('a.VE_PlaceList_Close').live('click', function() {
						$('#map-directions-panel').parent().removeClass("loading");
						working = false;
					});
				});
			});
		},
		add : function(obj) {
			var self = this;
			self.data.push(obj);
			//fixed asyn issue
			if(self.dl.setSearch && obj.islast && obj.islast=="true"){
				self.dl.setSearch(self.data);
			}
		},
		domInit : function() {
			$(function() {
				$dealerResultsMap = $('#dealer-results-map');

				$dealerResultsMap.each(function() {
					lastSelected = $('');
					$(this).find('TBODY TR.dealer TD').hover(function() {
						$(this).closest('TR').addClass('hover');
					}, function() {
						$(this).closest('TR').removeClass('hover');
					});
				});

				// Populate cookie postcode.
				$('#dl_location').each(function() {
					var loc = $(this);
					loc.each(function() {
						if ($.trim(loc.val()) === "") {
							$.publish("shopping.pref.retrieve", function(e, data) {
								if (data && data.postcode) {
									loc.val(data.postcode);
								}
							});
						}
					});
				});

				//Form Builder Submit Version
				$('#dealer-search-button').each(function() {

					if ($('div.webshim-validation').size() != 0) {
						return;
					}

					$('#dragonflyform').submit(function(e) {
						var jform = $(this);

						if ($('INPUT[type=text], SELECT', jform).totalValString().length < 1) {
							var jmsg = jform.find('.message').length > 0 ? jform.find('.message') : $('<p class="message">' + $('#submission-failed-message').val() + '</p>');
							jform.prepend(jmsg.hide(0));
							jmsg.slideDown();
							e.preventDefault();
						}
					});
				});

				//Form Builder Submit Version
				$('#submit-dealer').each(function() {
					$('#dragonflyform').submit(function(e) {
						if ($(this).find('INPUT:checked').length <= 0) {
							$('#dealer-error').hide().addClass("error").fadeIn("slow");
							e.preventDefault();
							return false;
						}
					});
				});

				$dealerResultsMap.find('TBODY TR').click(function(event) {
					var $input = (this.nodeName == "INPUT" ? this : $("INPUT.dealerinfo", this));
					if (event.target.nodeName != "INPUT" && event.target.nodeName != "LABEL" && event.target.nodeName != "A") {
						if (!$input.is(":checked")) {
							$input.attr("checked", true)
						}
					}
					if ($input.is(":checked")) {
						$(this).siblings(".selected").removeClass("selected");
						$(this).addClass("selected");
					}
				});
				$dealerResultsMap.find("INPUT.dealerinfo:checked").closest("TR").addClass("selected");

				$('.dealer-popup').live('click', function(e) {
					ND.anchors.storage.popup.apply(this);
					e.preventDefault();
				});
				$('.dealer-external').live('click', function(e) {
					ND.anchors.storage.external.apply(this);
					e.preventDefault();
				});
			});
		},
		selectById : function(id, dealerinfo) {
			$tr = $('#' + id);
			$tr.siblings(".selected").removeClass('selected');
			$tr.addClass('selected');
			$input = $('#' + dealerinfo);
			$input.attr("checked", true)
			var targetOffset = $tr.offset().top - 200;
			$('html,body').animate({
				scrollTop : targetOffset
			}, 1000);
		}
	};

	var InteractiveMap = function(options) {
		if (options.isVersion7) {
			this.initV7(options);
		} else {
			this.init(options);
		}
	};
	/**
	 * the following prototype contains 2 different versions of bingmap.
	 */
	InteractiveMap.prototype = {
		/**
		 * use the following methods for bing map Version 7.0
		 */
		initV7 : function(options) {
			this.country = options.country;
			this.resetMarkers();
			this.loadMapV7(options);
		},
		loadMapV7 : function(options) {
			var map = this.map = new Microsoft.Maps.Map(document.getElementById(options.mapId), {
				credentials : options.key,
				center : new Microsoft.Maps.Location(options.lat, options.lng),
				zoom : parseInt(options.zoom),
				mapTypeId : Microsoft.Maps.MapTypeId.road,
				enableSearchLogo : false
			});
		},
		resetMarkers : function() {
			this.shapes = {};
		},
		//add pushpin and info box on the map
		addMarkerV7 : function(data, selectable) {
			var scope = this, pushpinIcon, jdealer = $('#' + data.id),
			//create current dealer location
			location = new Microsoft.Maps.Location(data.lat, data.lng), infoboxOption = {
				id : "infoDesc_" + data.pinid,
				width : 265,
				showCloseButton : false,
				offset : new Microsoft.Maps.Point(77, -117)
			};
			//add custom pushpin icon
			if (jdealer.find('.dealer-icon').length > 0) {//pushpin element can be found from dealer-result list
				pushpinIcon = '<span class="' + jdealer.find('.dealer-icon').attr("class") + ' ' + data.pinid + '">' + data.pinid + '</span>';
			} else {// for those dealer-result list which doesnt have pushpin icon definded
				pushpinIcon = '<span class="dealer-icon cat1 ' + data.pinid + '">' + data.pinid + '</span>';
			}
			//create pushpin
			var shape = new Microsoft.Maps.Pushpin(location, {
				htmlContent : pushpinIcon,
				width : 20,
				typeName : "customDealerPin"
			});

			if ($(".owner-map").size()) {
				infoboxOption.description = '<div class="dealer-flyout" id="infoDesc_' + data.pinid + '">' + ( selectable ? '<p class="selectdealer"><a href="javascript:void(0)" onclick="ND.dealerLocator.selectById(\'' + data.id + '\',\'' + data.dealerinfo + '\')">' + data.selectDealer + '</a></p>' : '' ) + '<h3>' + jdealer.find(".dealername").html() + "</h3><p>" + jdealer.find(".address").html() + "</p><p>" + jdealer.find(".contact").html() + "</p></div>";
			} else {
				if ($(".dealer-map-pagination").size()) {
					infoboxOption.description = '<div class="dealer-flyout" id="infoDesc_' + data.pinid + '">' + ( selectable ? '<p class="selectdealer"><a href="javascript:void(0)" onclick="ND.dealerLocator.selectById(\'' + data.id + '\',\'' + data.dealerinfo + '\')">' + data.selectDealer + '</a></p>' : '' ) + jdealer.find(".dealername").html() + jdealer.find(".contact").html() + "</div>";
				} else {
					infoboxOption.description = '<div class="dealer-flyout" id="infoDesc_' + data.pinid + '">' + ( selectable ? '<p class="selectdealer"><a href="javascript:void(0)" onclick="ND.dealerLocator.selectById(\'' + data.id + '\',\'' + data.dealerinfo + '\')">' + data.selectDealer + '</a></p>' : '' ) + '<h3>' + jdealer.find(".dealername").html() + "</h3><p>" + jdealer.find(".contact").html() + "</p></div>";
				}
			}
			//create info box for pushpin, set the default location to the infobox, the default location should be the same with its pushpin location
			var infobox = new Microsoft.Maps.Infobox(location, infoboxOption);
			//display infobox
			scope.displayInfobox(shape, infobox, location, data.pinid);
			//add info box to map
			scope.map.entities.push(infobox);
			//add pushpin to the map
			scope.map.entities.push(shape);
			scope.shapes[data.pinid] = data;
		},
		/**
		 * To switch the infobox position from pushpin left to pushpin right if the pushpin is located at the right of the map
		 * To switch the infobox position from bottom of the pushpin to the top if the pushpin is located at the bottom of the map
		 * the idea is find the center of the map, compare with the pushpin location, reset the related infobox location
		 *
		 * @param shape, current pushpin object
		 * @param infobox, current infobox object
		 * @param location, defalut infobox location
		 * @param pinId, unique id to identify the current pushpin
		 */
		displayInfobox : function(shape, infobox, location, pinId) {
			var scope = this, thisInfobox = {};
			//add event to pushpin, a tricky way to show the info box while mouseovering pushpin.
			Microsoft.Maps.Events.addHandler(shape, 'mouseover', function() {
				//set to the default location before each show , as the location will be overrided under specific case (eg, map offset to the right, override infobox location to show it at left of the map center)
				infobox.setLocation(location);
				//find the current info box
				thisInfobox = $(".MicrosoftMap #infoDesc_" + pinId).closest(".Infobox");
				//find mapCenter and transform it to pixel
				//find pushPinLocation and transform it to pixel
				//define infobox offset, the entire infobox offset should be include: "infobox width(that is infoboxWidth)", "infobox arrow width(that is infoarrowWidth)", "pushpin width(that is pushpinWidth)" and infobox itself default offset
				var mapCenter = scope.map.tryLocationToPixel(scope.map.getCenter(), Microsoft.Maps.PixelReference.control), pushPinLocation = scope.map.tryLocationToPixel(shape.getLocation(), Microsoft.Maps.PixelReference.control), infoboxLocation = infobox.getLocation(), infoboxPixel = scope.map.tryLocationToPixel(infoboxLocation, Microsoft.Maps.PixelReference.control), infoarrowWidth = thisInfobox.find(".infobox-stalk").outerWidth(), pushpinWidth = shape.getWidth(), infoboxWidth = thisInfobox.outerWidth(), hasLeftClass = false, hasTopClass = false,
				//define infobox offset
				infoboxHeight = thisInfobox.outerHeight();
				//map offset right, should display infobox on the left of pushpin
				if (pushPinLocation.x > mapCenter.x) {
					infoboxPixel.x = infoboxPixel.x - infoarrowWidth - pushpinWidth - infoboxWidth - 24;
					var infoboxDestinationLocationX = scope.map.tryPixelToLocation(new Microsoft.Maps.Point(infoboxPixel.x, infoboxPixel.y), Microsoft.Maps.PixelReference.control);
					//class will be removed after reset the location
					infobox.setLocation(infoboxDestinationLocationX);
					hasLeftClass = true;
				}
				//map offset bottom, should display infobox on the top of pushpin
				if (pushPinLocation.y > mapCenter.y) {
					infoboxPixel.y = infoboxPixel.y - infoboxHeight + 55;
					var infoboxDestinationLocationY = scope.map.tryPixelToLocation(new Microsoft.Maps.Point(infoboxPixel.x, infoboxPixel.y), Microsoft.Maps.PixelReference.control);
					//class will be removed after reset the location
					infobox.setLocation(infoboxDestinationLocationY);
					hasTopClass = true;
				}

				if (hasLeftClass) {
					thisInfobox.addClass("left");
				}
				if (hasTopClass) {
					thisInfobox.addClass("top");
				}

				thisInfobox.css("visibility", "visible");
			});
			Microsoft.Maps.Events.addHandler(shape, 'mouseout', function() {
				thisInfobox.css("visibility", "hidden");
			});
			Microsoft.Maps.Events.addHandler(infobox, 'mouseenter', function() {
				thisInfobox.css("visibility", "visible");
			});
			Microsoft.Maps.Events.addHandler(infobox, 'mouseleave', function() {
				thisInfobox.css("visibility", "hidden");
			});
			//hide infobox when map veiw change
			Microsoft.Maps.Events.addHandler(scope.map, 'viewchangestart', function() {
				$(".MicrosoftMap .Infobox").css("visibility", "hidden");
			});
		},
		setMapViewV7 : function(data) {
			var collectionCordindates = new Array();
			for (var i = 0; i < data.length; i++) {
				collectionCordindates.push(new Microsoft.Maps.Location(data[i].lat, data[i].lng));
			}
			//only one dealer found
			if (collectionCordindates.length == 1) {
				this.map.setView({
					center: collectionCordindates[0],
					zoom: 16
				});
			}else if (collectionCordindates.length > 1){
				this.map.setView({
					bounds: Microsoft.Maps.LocationRect.fromLocations(collectionCordindates)
				});
			}
			
		},
		/**
		 * define search, add and display routine on the map
		 *
		 * @param startPoint, start place string entered by user.
		 * @param endPoint, current destination coordinates
		 * @param lang, object contains information for search (eg, error message)
		 * @param callbackfn, run after loadRoute function excute success, set "working" flag back to false
		 */
		loadRouteV7 : function(startPoint, endPoint, lang, callbackfn) {
			$('#map-direction-list').html('');

			var im = this;
			//define RequestOptions
			var requestOptions = {
				avoidTraffic : true,
				routeDraggable : false
			}
			//define renderOptions
			var renderOptions = {
				itineraryContainer : document.getElementById("map-direction-list"),
				displayManeuverIcons : false,
				displayPostItineraryItemHints : false,
				displayPreItineraryItemHints : false,
				displayRouteSelector : false,
				displayStepWarnings : false,
				displayTrafficAvoidanceOption : false,
				displayWalkingWarning : false
			}
			Microsoft.Maps.loadModule('Microsoft.Maps.Directions', {
				callback : function() {

					if (!im.directionsManager) {
						im.directionsManager = new Microsoft.Maps.Directions.DirectionsManager(im.map);
					}
					//remove all waypoints and routine before each search
					im.directionsManager.resetDirections();
					//define start and end point
					var startWaypoint = new Microsoft.Maps.Directions.Waypoint({
						address : startPoint + " " + im.country
					});
					var endWaypoint = new Microsoft.Maps.Directions.Waypoint({
						location : new Microsoft.Maps.Location(endPoint.lat, endPoint.lng)
					});

					//add start and end point
					im.directionsManager.addWaypoint(startWaypoint);
					im.directionsManager.addWaypoint(endWaypoint);
					//Reset distance unit in options(Route Table);
					lang.unit = $('#dealer-locator-maps').embeddedData()["xhr-distance-unit"] == "miles" ? "mi" : "km";
					//Reset distance unit in Bing Map
					requestOptions.distanceUnit = lang.unit == "mi" ? Microsoft.Maps.Directions.DistanceUnit.miles : Microsoft.Maps.Directions.DistanceUnit.kilometers;
					// Set request options
					im.directionsManager.setRequestOptions(requestOptions);
					// Set the render options
					im.directionsManager.setRenderOptions(renderOptions);
					// define error messages when error occurs (eg, 2 destinations can not be reached)
					Microsoft.Maps.Events.addHandler(im.directionsManager, 'directionsError', function() {
						alert(lang.fail);
					});
					// display the route on the map
					im.directionsManager.calculateDirections();
					callbackfn();
				}
			});
		},
		loadDirections : function(route, lang) {
			var legs = route.RouteLegs;
			var turns = '<tr><td class="total" colspan="3"><span>' + lang.total + '</span> ' + route.Distance.toFixed(1) + ' ' + lang.unit + '</td></tr>';
			var numTurns = 0;
			var leg = null;
			// console.log(legs.length, route.Distance);
			if (legs.length > 60 || route.Distance > 1000) {
				this.map.DeleteRoute();
				this.map.ShowMessage(lang.tofar);
			} else if (legs.length > 0) {
				//this.map.DeleteAllShapes()
				//this.addMarker(this.shapes[0]);
				for (var i = 0; i < legs.length; i++) {
					leg = legs[i];
					var turn = null;
					turns += '<tr>';
					for (var j = 0; j < leg.Itinerary.Items.length; j++) {

						turn = leg.Itinerary.Items[j];
						turns += '<td class="num">' + (numTurns == 0 ? '' : numTurns) + '</td>';
						turns += '<td>' + turn.Text + '</td>';
						turns += '<td class="dist">' + turn.Distance.toFixed(1) + ' ' + lang.unit + '</td>';
						if (j + 1 < leg.Itinerary.Items.length) {
							turns += '<tr></tr>';
						}
						numTurns++;
					}
					turns += '</tr>';
				}
				$('#map-direction-list').html('<table class="map-directions">' + turns + '</table>');
			} else {
				this.map.ShowMessage(lang.fail);
			}
		},

		/**
		 * use the following methods for bing map Version 6.2
		 */
		init : function(options) {
			this.country = options.country;
			var map = this.map = new VEMap(options.mapId);
			this.resetMarkers();

			if (options['key'] != undefined) {
				map.SetCredentials(options.key);
			}

			//Distance Unit: Kilometers or Miles?
			this.unit = $('#dealer-locator-maps').embeddedData()["xhr-distance-unit"] == "miles" ? VEDistanceUnit.Miles : VEDistanceUnit.Kilometers;

			map.SetDashboardSize(VEDashboardSize.Small);
			map.LoadMap(new VELatLong(options.lat, options.lng), options.zoom, VEMapStyle.road, false);
			map.SetScaleBarDistanceUnit(this.unit);
		},
		loadMap : function(options) {
			this.map.LoadMap(new VELatLong(options.lat, options.lng), options.zoom, VEMapStyle.road, false);
		},
		addMarker : function(data, selectable) {
			var jdealer = $('#' + data.id);
			var shape = new VEShape(VEShapeType.Pushpin, new VELatLong(data.lat, data.lng));

			if (jdealer.find('.dealer-icon').length > 0) {//pushpin element can be found from dealer-result list
				shape.SetCustomIcon('<span class="' + jdealer.find('.dealer-icon').attr("class") + ' ' + data.pinid + '">' + data.pinid + '</span>');
			} else {// for those dealer-result list which doesnt have pushpin icon definded
				shape.SetCustomIcon('<span class="dealer-icon ' + data.pinid + '">' + data.pinid + '</span>');
			}

			if ($(".owner-map").size()) {
				shape.SetDescription('<div class="dealer-flyout">' + ( selectable ? '<p class="selectdealer"><a href="javascript:void(0)" onclick="ND.dealerLocator.selectById(\'' + data.id + '\',\'' + data.dealerinfo + '\')">' + data.selectDealer + '</a></p>' : '' ) + '<h3>' + jdealer.find(".dealername").html() + "</h3><p>" + jdealer.find(".address").html() + "</p><p>" + jdealer.find(".contact").html() + "</p></div>");
			} else {
				if ($(".dealer-map-pagination").size()) {
					shape.SetDescription('<div class="dealer-flyout">' + ( selectable ? '<p class="selectdealer"><a href="javascript:void(0)" onclick="ND.dealerLocator.selectById(\'' + data.id + '\',\'' + data.dealerinfo + '\')">' + data.selectDealer + '</a></p>' : '' ) + jdealer.find(".dealername").html() + jdealer.find(".contact").html() + "</div>");
				} else {
					shape.SetDescription('<div class="dealer-flyout">' + ( selectable ? '<p class="selectdealer"><a href="javascript:void(0)" onclick="ND.dealerLocator.selectById(\'' + data.id + '\',\'' + data.dealerinfo + '\')">' + data.selectDealer + '</a></p>' : '' ) + '<h3>' + jdealer.find(".dealername").html() + "</h3><p>" + jdealer.find(".contact").html() + "</p></div>");
				}
			}
			this.map.AddShape(shape);
			this.shapes[shape.GetID()] = data;
		},
		setMapView : function(data) {
			var collectionCordindates = new Array();
			for (var i = 0; i < data.length; i++) {
				collectionCordindates.push(new VELatLong(data[i].lat, data[i].lng));
			}

			if (collectionCordindates.length != 0) {
				this.map.SetMapView(collectionCordindates);
			}
		},
		loadRoute : function(startPoint, endPoint, lang, callback) {
			// console.log("loadRoute");
			$('#map-direction-list').html('');
			$('#map-directions-panel').parent().addClass("loading");
			var im = this;
			var options = new VERouteOptions();

			//Reset distance unit in options(Route Table);
			lang.unit = $('#dealer-locator-maps').embeddedData()["xhr-distance-unit"] == "miles" ? "mi" : "km";
			//Reset distance unit in Bing Map
			options.DistanceUnit = lang.unit == "mi" ? VERouteDistanceUnit.Kilometer : VERouteDistanceUnit.Kilometer;

			options.RouteColor = new VEColor(0, 55, 134, 1);
			options.RouteWeight = 3;
			options.RouteCallback = function(route) {
				$('#map-directions-panel').parent().removeClass("loading");
				if (route != undefined) {
					im.loadDirections.apply(im, [route, lang]);
				}
				callback.call();
			};
			this.map.GetDirections([startPoint + " " + this.country, new VELatLong(endPoint.lat, endPoint.lng)], options);
		}
	};

	var DealerLocator = function(options) {
		this.init(options)
	};
	DealerLocator.prototype = {
		init : function(options) {
			//detemine whether the bing map version is 7
			this.isVersion7 = true;
			if ( typeof (Microsoft) == "undefined" || typeof (Microsoft.Maps) == "undefined") {
				this.isVersion7 = false;
			}
			options.isVersion7 = this.isVersion7;
			this.options = options;
			this.load();
		},
		load : function() {
			this.map = new InteractiveMap(this.options);
		},
		setSearch : function(data) {
			if (data.length > 0) {
				this.load();
				this.map.resetMarkers();
				this.isVersion7 ? this.map.setMapViewV7(data) : this.map.setMapView(data);
				var selectable = data.length > 1;
				for (var i = 0; i < data.length; i++) {
					this.addDealer(data[i], selectable);
				}
			}
		},
		addDealer : function(dealer, selectable) {
			//the "select this dealer" needs to be publishble, get it from translation
			dealer.selectDealer = "Select this dealer";
			if($("#dealer-translations").length > 0){
				var selectDealer = $("#dealer-translations").embeddedData().SelectThisDealer;
				if(selectDealer){
					dealer.selectDealer = selectDealer;
				}
			}
			this.isVersion7 ? this.map.addMarkerV7(dealer, selectable) : this.map.addMarker(dealer, selectable);
		},
		findRoute : function(startPoint, endPoint, lang, callback) {
			if (startPoint != undefined && endPoint != undefined) {
				this.isVersion7 ? this.map.loadRouteV7(startPoint, endPoint, lang, callback) : this.map.loadRoute(startPoint, endPoint, lang, callback);
			}
		}
	};

})(jQuery);

// pre-populate the service type on dealer locater page - Ford China
(function($) {
	var serviceTypePopulate = function() {

		var url = window.location.href;
		var key = "serviceType";

		var type = $.getQueryVariable(url, key);

		if (type) {
			$(".dealer-form-siderbar select[name='specialities']").val(type);
		}

	};

	$(function() {
		if ($(".dealer-form-siderbar select[name='specialities']").length > 0) {
			serviceTypePopulate();
		}
		/**
		 * due to increasing spacing between the relative ".print" button and ".dealer-results-map",
		 * set the spacing dynamically will fix the lack of spacing issue of relateive ".print" btn in the future
		 */
		var printBtn = $(".content-high > .hardpanel + .dealer-results-map > .print");
		//identify deeply to prevent conflict with other "print" btn in other pages if have
		dealerRsIllustrator = $(".content-high > .hardpanel .dealer-results-illustrator");
		if (printBtn.length > 0 && dealerRsIllustrator.length > 0) {// if both of them exist
			var spacing = dealerRsIllustrator.outerHeight(true);
			printBtn.css("top", "-=" + spacing);
		}

	});
})(jQuery);


(function(window, document){
	var ND = window.ND = window.ND || {};

	var selectOption = ND.selectOption = {

		init : function(json, options){
			var mainOption = $(options.parentSelector)[0];
			var subOption = $(options.childrenSelector);

			var cities = window[json];

			if(!mainOption || !cities){
				return;
			}

			var optionObj = {}, i, len;

			//create country options list
			//selectOption.clearOption(mainOption);
			var countries = cities.list;
			for(i=0, len=countries.length;i<len;i++){
				var key = countries[i].name,
					val = countries[i].code;
				optionObj[val] = countries[i].states;
				//selectOption.addOption(mainOption, key, val);
			}

			//create cities option list
			mainOption.onchange = function(e){
				selectOption.clearOption(subOption[0]);
				var city = optionObj[mainOption.value];
				if(!city){
					return;
				}

				
				//selectOption.addOption(subOption[0], "Select", "");
				for(i=0, len=city.length;i<len;i++){
					var key = city[i].name,
						val = city[i].code;
					selectOption.addOption(subOption[0], key, val);
				}
			};
		},

		addOption : function(select, txt, value){
			if (select && select.options) {
				var opts = select.options;
				opts[opts.length] = new Option(txt, value);
			}
		},

		//clear all the options except the first one
		clearOption : function(select){
			if (select && select.options) {
				select.options.length = 1;
			}
		}
	};

	$(document).ready(function(){
		selectOption.init("countryStates", 
			{
				parentSelector:"#country",
				childrenSelector:"#state"
			}
		);
	});
})(window, document);


(function($){

	var Locale = function(){
		var locale = this;

		//locale code array
		var localeArr = [],
			COUNTRY = 1,
			CONFIRMED = 2;

		//locale cookie store
		var cookieKey = "dfy.fme.locale", domain;

		var commonConfig = $("#common-config").embeddedData(),
			cookieDomain = commonConfig.cookieDomain,
			localeName = commonConfig.locale;


		locale.checkLocale = function(){
			var self = this;
			var url = window.location.href;
			var location = [];

			
			if ($.cookie(cookieKey)){
				location = $.cookie(cookieKey).split('-');

				if (url.indexOf(location[1]) < 0){
					locale.clearFPSinfo();
					
					locale.setGTUID();
				}

				if (url.indexOf(locale[2]) === "1"){
				// true: locale confirmed
					self.updateCookie(url,true);
				}
				else {
					self.updateCookie(url,false);
				}
			}
			else {
				// false: locale not confirmed
				self.updateCookie(url,false);
			}
			
		};

		//check if there existing confirmed locale cookie
		//if not popup the overlay
		locale.checkCookie = function(url){
			var cookieVal = $.cookie(cookieKey);
			if(cookieVal){
				localeArr = cookieVal.split('-');
			}

			var json = $("#locale-data").embeddedData();
			var url = json["locale-overlay"];
			domain = json["domain"];

			



			//if the locale is confirmed, will not popup overlay.
			if(localeArr[CONFIRMED]=="1"){
				return;
			}

			if (url) {
				$.publish("overlay.launch", {
					url: url,
					success: function() {
						locale.bindOverlay();
					}
				});
			}
		};

		//bind event to overlay, force redirection and change cookie
		//whern user submit the form.
		locale.bindOverlay = function(){
			if($("#overlay .controls").size()){
				$("#overlay .controls").hide();
			}
			$(".country-overlay select").change(function(e){
				$(this).parent("form").attr({"action":$(this).val()});
			}).trigger("change");		//rise change event on default

			$(".country-overlay form").submit(function(e){
				var $this = $(this);
				var value = $("select",$this).val();

				if($this.attr("action")){
					$this.attr({"action": value});
				}

				if (value.indexOf(localeName) < 0){
					locale.clearFPSinfo();
				}

				//if current submit data match the current current url
				//cancel the submit redirection and hide the overlay
				if(!locale.updateCookie(value,true)){
					e.preventDefault();
					$.publish("overlay.hide");
					return false;
				}
			});
			
			var country = localeArr[COUNTRY];
			if (country) {
				$(".country-overlay select option").each(function(idx){
					var $options = $(this);
					var val = $options.attr("value");
					if (val && val.indexOf(country) > 0) {
						$options.attr({"selected" : "selected"});
					}
				});
			}
		};

		//init the tab menu, has dependence of the checkCookie
		locale.initMenu = function(){
			var $current = $(".countrytab .current");
			var $anchors = $(".country li a");

			//Update Menu text
			if(localeArr[CONFIRMED] == "1"){
				//convert ["bh", "ar", "1"] => "bh/ar"
				var key = localeArr.slice(0,2).join('/');
				$anchors.each(function(){
					var $this = $(this);
					var href = $this.attr("href");
					if(href.indexOf(key) >-1 ){
						$current.text($this.text());
					}
				});
			}

			//bind event to top menu update cookie when click on the anchors
			$anchors.click(function(e){
				var value = $(this).attr("href");
				if(!locale.updateCookie(value)){





				if (value.indexOf(localeName) < 0){
					locale.clearFPSinfo();
				}

				if(!locale.updateCookie(value,true)){
					e.preventDefault();
				}
			}
				
			});
		};

		//update locale cookie: convert url "/bh/ar/homeXXX#**" => bh-ar-1
		//return 0 means selected locale match the current url
		locale.updateCookie = function(value,confirmed){
			if (value) {
				//remove the host name,  get the relative path, etc "/en/irq/xxx"
				var host = location.host, i = value.indexOf(host);
				value = i > 0 ? value.substr(i + host.length) : value;
				//remove the first '/' if nessary.
				value = value.charAt(0) == '/' ? value.substr(1) : value;

				//get the locale array, like [ "en", "irq", "0" ]
				var localeArr = value.split('/').slice(0,2);

				if (confirmed){
					localeArr[CONFIRMED] = "1";
				}
				else{
					localeArr[CONFIRMED] = "0";
				}
				

				$.cookie(cookieKey, localeArr.join('-'), {
					expires: 365,
					path: '/',
					domain: domain
				});

				

				// Whether current url contains sth like "/bh/ar"?
				if(location.href.indexOf('/' + localeArr.slice(0,2).join('/')) > 0){
					return 0;
				}

			}

			return 1;
		};

























		locale.clearFPSinfo = function(){
			if($.cookie('dfy.uuid')){
				$.removeCookie('dfy.uuid', {path:'/', domain:cookieDomain});
			}

			if($.cookie('gt_uid')){
				var dmArray = [];
				dmArray = cookieDomain.split('.');

				var dmStr = "." + dmArray[dmArray.length - 2] + "." + dmArray[dmArray.length - 1];
				
				$.removeCookie('gt_uid', {path:'/', domain:dmStr});
			}

			if($.cookie('dfy.p')){
				$.removeCookie('dfy.p', {path:'/', domain:cookieDomain});
			}

			if(sessionStorage.getItem("dfy.p") !== null){
				sessionStorage.removeItem("dfy.p");
			}

		};

		locale.setGTUID = function(){
			//gt_uid is the cookie used by FPS to check user status
			var setCookie = function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
		        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
		        var sExpires = "";
		        if (vEnd) {
		            switch (vEnd.constructor) {
		                case Number:
		                    sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
		                    break;
		                case String:
		                    sExpires = "; expires=" + vEnd;
		                    break;
		                case Date:
		                    sExpires = "; expires=" + vEnd.toUTCString();
		                    break;
		            }
		        }
		        document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
		        return true;
		    };
		    var readCookie = function (name) {
		        var nameEQ = name + "=";
		        var ca = document.cookie.split(';');
		        for (var i = 0; i < ca.length; i++) {
		            var c = ca[i];
		            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
		        }
		        return null;
		    }
			var UUIDV4 = function b(a) { return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b) };
		    var uid = readCookie('gt_uid') || UUIDV4();

		    var now = new Date();
		    var domain = (function () {
		        var i = 0, domain = document.domain, p = domain.split('.'), s = '_gd' + now.getTime();
		        while (i < (p.length - 1) && document.cookie.indexOf(s + '=' + s) == -1) {
		            domain = p.slice(-1 - (++i)).join('.');
		            document.cookie = s + "=" + s + ";domain=" + domain + ";";
		        }
		        document.cookie = s + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=" + domain + ";";
		        return domain;
		    })();
		    setCookie('gt_uid', uid, new Date(now.getTime() + (365 * 86400000)), '/', domain);
		};

		locale.init = function(){
			locale.checkLocale();
			locale.checkCookie();
			locale.initMenu();
		};
	};

	$(document).ready(function(){
		// if ($("#locale-data").size()) {
		// 	window.setTimeout(function(){
		// 		var locale = new Locale();
		// 		locale.init();
		// 	}, 1000);
		// }
		if ($("#locale-data").size()){
			window.setTimeout(function(){
			var locale = new Locale();
			locale.init();
			}, 1000);
		}
		
	});

})(jQuery);


/*
Author: York Zhang
Description: Owner video page
*/

(function($){

	var videosModule = {
		init: function(){
			if(!$(".video-list").size()) {return;}

			var $firstVideo = $(".video-list").find(".video-link").eq(0);

			var videoSetting = $firstVideo.find(".video-config").embeddedData();
			var imgCount = 0;
			var $firstTierImgs = $(".video-list").find(".columns.large-6").eq(1).find('img.video-img');
			$firstTierImgs.each(function(index,element){
				var $this = $(this);
				//console.log("size", $firstTierImgs.size());
				if(element.complete){
					imgCount++;
					//console.log("complete count", imgCount);
					if(imgCount == ($firstTierImgs.size())){
						var videoWidth = $firstVideo.width();
						var videoHeight = $firstVideo.parent(".columns.large-6").height();

						var videoSize = {
							width: videoWidth,
							height: videoHeight,
							play:false
						}

						var videoOption = $.extend({},videoSetting,videoSize);
						ND.video.init(videoOption);
					}
				}else{

					element.onload = function(){
						imgCount++;
						//console.log("count", imgCount);
						if(imgCount == ($firstTierImgs.size())){
							var videoWidth = $firstVideo.width();
							var videoHeight = $firstVideo.parent(".columns.large-6").height();

							var videoSize = {
								width: videoWidth,
								height: videoHeight,
								play:false
							}

							var videoOption = $.extend({},videoSetting,videoSize);
							ND.video.init(videoOption);
						}
					}
				}

			});

			
			$("div.video-link a.play-video").click(function(e){
				var $this = $(this);
				var $videoStaging = $(".video-list");
				//console.log($videoStaging.offset().top);
				var targetOffset = $videoStaging.offset().top;
				$('html,body').animate({scrollTop:targetOffset},300);
				e.preventDefault();
				jwplayer("video-inner").remove();
				var videoSetting = $this.next(".video-config").embeddedData();

				var videoWidth = $this.parent(".video-link").width();
				var videoHeight = $this.parents(".columns.large-6").eq(0).height();

				var videoSize = {
					width: videoWidth,
					height: videoHeight,
					play:true
				}

				var videoOption = $.extend({},videoSetting,videoSize);
				//console.log(videoOption);
				ND.video.init(videoOption);
				
			});
		}

	};

	$(function(){
		videosModule.init();
	});

})(jQuery);




/*
Author: York Zhang
Description: Owner Dealer locator initialize
*/

(function($){

	var dealerMap = {
		resizeMap: function(data){
			if ($(window).width() < 960) {

				var currentWidth = $(window).width(),
					newHeight = currentWidth * 0.485;

				$('#dealer-map').css({
					'height'	: newHeight,
					'width'		: $(window).width()
				});

	  		} else {
	  			$('#dealer-map').css({
	  				'height' 	: 415,
	  				'width' 	: 960
	  			});
	  			
	  		}

	  		if(dealerMap.isEmptyObject(data)){
	  			//bing map version7 has an issue - "Can't move focus to the control because it is invisible, not enabled, or of a type that does not accept the focus"
	  			//occured only if version7 and ie8
	  			//this possible becasue bing map version7 has something load slower than $(document).ready
	  			if($("body").hasClass("ie8")&& typeof(Microsoft) != "undefined" && typeof(Microsoft.Maps) != "undefined"){
	  				setTimeout("ND.dealerLocator.init()",2000);
	  			}else{
	  				ND.dealerLocator.init();
	  			}
	  		}else{
	  			//bing map version7 has an issue - "Can't move focus to the control because it is invisible, not enabled, or of a type that does not accept the focus"
	  			//occured only if version7 and ie8
	  			//this possible becasue bing map version7 has something load slower than $(document).ready
	  			if($("body").hasClass("ie8")&& typeof(Microsoft) != "undefined" && typeof(Microsoft.Maps) != "undefined"){
	  				setTimeout("ND.dealerLocator.init('"+data.zoomLevel+"','"+data.lng+"','"+data.lat+"','"+data.key+"','"+data.country+"')",2000);
	  			}else{
	  				ND.dealerLocator.init(data.zoomLevel, data.lng, data.lat, data.key, data.country);
	  			}
	  		}
			

		},

		isEmptyObject: function(obj){
			for(var name in obj){
				return false;
			}
			return true;
		}

	};

	$(function(){
		// if dealer-map-pagination class exists, terminate and execute apa-dealerMap.js
		if($(".dealer-map-pagination").size()){return;}
		
		if(!$(".dealer-map").size()) {return;}




		var mapData = $("#map-data").size() ? $("#map-data").embeddedData() : {};
		var pinsData = $("#pins-data").size() ? $("#pins-data").embeddedData() : {};
		var directionsData = $("#directions-data").size() ? $("#directions-data").embeddedData() : {};

		if(pinsData.length > 0 && !dealerMap.isEmptyObject(pinsData) ){

			$.each(pinsData, function(i,pin){
				ND.dealerLocator.add(pin);
/*				ND.dealerLocator.add({
					pinid: parseInt(pin.pinid),
					id: pin.id,
					dealerinfo: pin.dealerinfo,
					lat: pin.lat,
					lng: pin.lng
				});*/
			});

		}

		if(!dealerMap.isEmptyObject(directionsData)){
			ND.dealerLocator.directions(directionsData.endPoint, directionsData.information);
		}


		dealerMap.resizeMap(mapData);
		
		//in IE8 window resize will not only triggered by resize window.
		//the following code is to prevent resize event triggered not by window resize under ie8
		var windowWidth = $(window).width();
			windowHeight = $(window).height();
		
		$(window).on('resize', function() {
			if($(window).width()!=windowWidth || $(window).height()!=windowHeight){
				dealerMap.resizeMap(mapData);
			}
		});


	});

})(jQuery);




/*
Author: York Zhang
Description: set primary vehicle
*/

(function($){

	var formEdit = {
		setPrimary: function(){
			if(!$(".set-primary").size()) {return;}

			$(".flexfield input.set-primary").live("change", function(){
				var $this = $(this);
				
				if($this.prop("checked")){
					$(".flexfield input.set-primary").prop("checked",false);
					$this.prop("checked",true);
				}
			});
		}
	};

	$(function(){
		formEdit.setPrimary();
	});

})(jQuery);




/*
Author: 		Brett Chaney
Description: 	Accordion taken from global.js in FTD2010 JS folder and added to ND namespace.
				Amends made to extend functionality for title links.
				Also add "single-open" class to "accordion-panel" DIV so only a single panel will open at any one time and prev/back buttons.
*/

ND = window.ND = window.ND || {};

(function($){

	ND.accordionMod = {
		init:function() {

			var curStep 	= $(".accordion-panel ul li").index($("li.active")) + 1,
				nextStep 	= curStep + 1,
				prevStep 	= curStep - 1;


			if(!$(".accordion-active").size()) {return;}
			
			$("div.accordion-active > UL > LI > DIV.dropdown").hide();
			$("div.accordion-active > UL > LI.active > DIV.dropdown").show();

			$("div.accordion-active > UL > LI > DIV.tab-area a").click(function(e) {
				e.stopPropagation();
			});

			$("div.accordion-active > UL > LI > DIV.tab-area").each(function() {

				if (!$(this).next().hasClass('dropdown')) {
					$(this).addClass('no-dropdown');
				}

			});

			$("div.accordion-active > UL > LI > DIV.tab-area").click(function(){

				var $this 		= $(this);

				// Add "single-open" class to "accordion-panel" DIV if you require only one panel to be open at any one time
				if ($(".accordion-panel.single-open")[0]) { 
				
					if($this.parent("li").hasClass("active")) {
						return;
					}
					$this.parents(".accordion-panel").find(".dropdown").slideUp(200).parent("li").removeClass("active");

					setTimeout(function() {
						$('html, body').animate({
					        scrollTop: $this.offset().top
					    },150);

					    // Show all dropdowns in Personalisation section
					    if ($(".panel").length) {
					    	$("div.accordion-active .panel .dropdown").show();
					    }
						
					},250);
					
				}

				if ($this.next().hasClass('dropdown')) {
					
					if(!$this.parent("li").hasClass("active")){
						$this.next("div.dropdown").slideDown(200);
						$this.parent("li").addClass("active");
					} else {
						$this.next("div.dropdown").slideUp(200);
						$this.parent("li").removeClass("active");
					}

					if ($(".single-open")[0]) { 
						nextStep = $(".accordion-panel > ul > li").index($("li.active")) + 2;
						prevStep = $(".accordion-panel > ul > li").index($("li.active"));
					}

				} else {

					var currLink = $this.find('a').attr('href');
					location.href = currLink;
				}
				
			});


			if ($(".accordion-panel.single-open")[0]) { 

				$(".accordion-next").on("click", function(e) {
					e.preventDefault();
					$("div.single-open > ul > li:nth-child(" + nextStep + ") > DIV.tab-area").trigger('click');
				});

				$(".accordion-prev").on("click", function(e) {
					if($(this).hasClass("islink")){
						return;
					}
					e.preventDefault();
					$("div.single-open > ul > li:nth-child(" + prevStep + ") > DIV.tab-area").trigger('click');
				});

			}

		}
	};

	$(function(){
		ND.accordionMod.init();
	});

})(jQuery);


/* context.js */
/**
 * @author szabetian
 * @project VOI prepopulation/Form builder/dealer locator
 * @description pre-populates model/series drop downs on forms if form is
 *              associated with proper context (by publisher). It also adds
 *              context param to links with ctx-voi class
 * 
 * @depends on shoppref.js (to read cookie and add pc param)
 */
ND.Context = (function($) {
	
	var 
	
	voiConfig = {
			excludedModels : ''
	},
	
	privateFunctions = {
			
		restServices : {
			fetchVOIData : function(url) {
				privateFunctions.restServices.ajaxCall(url, function(jqXHR) {
					privateFunctions.displayVehicleBanner(jqXHR);
					privateFunctions.displayDisclaimer(jqXHR);
					privateFunctions.populateModelDropdown(jqXHR);
                    privateFunctions.populateVehicleDropdown(jqXHR);
				});
			},
			fetchColorData: function(url, callback) {
				
				privateFunctions.restServices.ajaxCall(url, function(jqXHR) {
					var i = 0,
						colors = [];
					
					for (i = 0; i < jqXHR.length; i++) {
						colors.push({
							name: jqXHR[i].name,
							order: jqXHR[i].order,
							code: jqXHR[i].code
						});
					}
					
					callback(colors);
					
				});
			},
			ajaxCall : function(url, successCallback) {
				$.ajax({
					url: url,
					dataType: 'json', 
					success: function(jqXHR, textStatus, textResponse) {
						if (typeof jqXHR !== 'undefined' && jqXHR != null) {
							successCallback(jqXHR);
						}
					}, 
					error : function(jqXHR, textStatus, textResponse) {
						//console.log('Could not fetch voi rest data');
					}
				});
			}
			
		},
	
		
	   /**
         * Extracts context param (ctx=m:1178856483523;d:1178856483570) from URL
         */
		extractContext : function(idx, url) {
			idx += 4;
			var lastParam = url.indexOf('&', idx);
			return url.substring(idx, lastParam > idx ? lastParam : url.length );
		},
		
		addContextToHref : function(elmnt, ctx) {
	        var href = elmnt.attr('href'),
	            ctxIdx;
	        if (typeof href !== 'undefined') {
		        if ((ctxIdx = href.indexOf('ctx=')) > 0) {
		             // if there is already a ctx, compare it with new one
		            var indexOfLastAnd = href.lastIndexOf('&');
		            if (indexOfLastAnd < ctxIdx) {
		                indexOfLastAnd = href.length;
		            }
		
	            var oldCtx = href.substring(ctxIdx, indexOfLastAnd);
	            if (oldCtx !== ctx) {
	               href = href.replace(oldCtx, ctx);
	               elmnt.attr('href', href).attr('data-ajax', 'false');
	            }
	
	        } else if (href.length > 1) {  // don't add to # hrefs
	            if(href.indexOf('?') > 0) {
	                href +='&';
	            } else {
	                href += '?';
	            }
	            elmnt.attr('href', href + ctx).attr('data-ajax', 'false');
		        }
	        }
	    },
	    
		addDropdownChangeListeners: function($modelDD, voiRestData) {
			
			var $seriesDD = $('#voi-series-name'),
				$colorDD = $('#voi-colour-dd');
			if ($seriesDD.length > 0) {
				var $firstOption;
				if (privateFunctions.firstTime) {
					$firstOption = $seriesDD.html();
					privateFunctions.firstTime = false;
				}
				
				$modelDD.on('change', function (e) {
				    e.stopImmediatePropagation();
					var result = privateFunctions.findIdForName($modelDD.val(), null, voiRestData);
					
					if (result.m != null) {
						privateFunctions.setModelDropDownValue(result);
						privateFunctions.populateSeriesDropdown($seriesDD, voiRestData[result.mIdx].derivatives, $firstOption, $colorDD);
					} else {
						privateFunctions.populateSeriesDropdown($seriesDD, [], $firstOption, $colorDD);
					}
				});
				
				$seriesDD.on('change', function() {
					var result = privateFunctions.findIdForName($modelDD.val(), $seriesDD.val(), voiRestData);
					
					if (result.d != null) {
						privateFunctions.setDerivativeDropDownValue(result);
					}
					if ($colorDD.length > 0) {
						privateFunctions.populateColorDropdown($seriesDD, $('#voi-colour-dd'));
					}
				});
				
				
				if ($colorDD.length > 0) {
					$colorDD.on('change', function() {
						privateFunctions.setColorDropDownValue($colorDD);
					});
				}
			}
		},

        addDealerDropDownListeners: function($modelDD, voiRestData){
            var $versaoDD = $('#FormSales_Derivative'),
                $corDD = $('#FormSales_Color');

            var $firstOption = $versaoDD.html();

            $modelDD.on('change',function(){
                if($modelDD.get(0).selectedIndex !== 0){
                    $versaoDD.parent().css('display', 'block');
                }else{
                    $versaoDD.parent().css('display', 'none');
                    $corDD.parent().css('display', 'none');
                }
                var result  = privateFunctions.findIdForName($modelDD.val(), null, voiRestData);

                if(result.m != null){
                    //privateFunctions.setVehicleDropDownValue(result);
                    privateFunctions.populateSeriesDropdown($versaoDD, voiRestData[result.mIdx].derivatives,$firstOption, $corDD);
                }else{
                    privateFunctions.populateSeriesDropdown($versaoDD, [], $firstOption, $corDD);
                }
            });

            $versaoDD.on('change', function(){
                if($versaoDD.get(0).selectedIndex !== 0){
                    $corDD.parent().css('display', 'block');
                }else{
                    $corDD.parent().css('display', 'none');
                }
                var result = privateFunctions.findIdForName($modelDD.val(), $versaoDD.val(), voiRestData);

                if(result.d != null){
                    //privateFunctions.setDerivativeDropDownValue(result);
                }
                if($corDD.length > 0){
                    privateFunctions.populateColorDropdown($versaoDD, $corDD);
                }
            });

            if($corDD.length > 0){
                $corDD.on('change', function(){
                    privateFunctions.setColorDropDownValue($corDD);
                });
            }

        },
		
		findIdForName: function(modelName,derivativeName,voiRestData) {
			var i,j, derivative;
			var result = { m : null, d : null,//ids 
					mIdx : -1, dIdx : -1, 
					dy: null,//derivative year
					dcks: null,//derivative cks code
					mcks: null,//model cks code
					dqcode: null,//derivative quote code
					dtdcode: null,//derivative test drive code
					dbcode: null//derivative brochure code
					};
	
			for (i = 0; i < voiRestData.length; i++) {
				if (modelName === voiRestData[i].name) {
					
					result.m = voiRestData[i].id;
					result.mcks = voiRestData[i].modelCode;
					result.mIdx = i;
					if (derivativeName != null) {
						for (j = 0; j < voiRestData[i].derivatives.length; j++) {
							derivative = voiRestData[i].derivatives[j];								
							if (derivativeName === derivative.name) {
								result.dcks = derivative.derivativeCode;
								result.dy = derivative.year;
								result.d = derivative.id;
								result.dIdx = j;
								result.dqcode = derivative.quoteFulfilmentCode;
								result.dtdcode = derivative.testdriveFulfilmentCode;
								result.dbcode = derivative.brochureFulfilmentCode;
								break;
							}
						}
					}
					break;
				}
			}
			
			return result;
		},
		
		firstTime : true,
		
		displayVehicleBanner: function(voiRestData) {
			var ctx = publicFunctions.toJSONFromUrl();
			if (ctx != null && typeof ctx.m !== 'undefined' && ctx.m != null) {
				// consider using ND.Utils.lazyLoadImage
				var $bannerCFF = $('#voi-banner'),
					$banners = $('.voi-banner'),
					bannerUrl,
					$bannerDiv;
				if ($bannerCFF.length > 0 && $banners.length > 0) {
					for (i = 0; i < voiRestData.length; i++) {
						if (ctx.m === voiRestData[i].id) {
							bannerUrl = voiRestData[i][voiConfig.formRequestType + 'Banner'];
							if (typeof bannerUrl !== 'undefined' && bannerUrl != null && bannerUrl !== '') {
								// display loader
								
								// show loading image
								$banners.each(function() {
									$(this).removeAttr('style');
								});
								
								var img = new Image();
								// call this function after it's loaded
								img.onload = function() {
									// make wrapperformbuilder.data.EmailHandler
                                    // fully visible
									$banners.each(function() {
										$(this).find('img').attr('src',bannerUrl);
									});
								};
								// begin loading the image from ...
								img.src = bannerUrl;
							}
							break;
						}
					}
				}
			}
		},
		
		displayDisclaimer: function(voiRestData) {
			var ctx = publicFunctions.toJSONFromUrl();
			if (ctx != null && typeof ctx.m !== 'undefined' && ctx.m != null) {
				// consider using ND.Utils.lazyLoadImage
				var $disclaimer = $('#voi-disclaimer'),
					disclaimerText = null,
					foundDrv = false,
					i,j;
				if ($disclaimer.length > 0) {
					for (i = 0; i < voiRestData.length; i++) {
						if (ctx.m === voiRestData[i].id) {
							if (typeof ctx.d !== 'undefined' && ctx.d != null) {
								for (j = 0; j < voiRestData[i].derivatives.length; j++ ) {
									if (ctx.d === voiRestData[i].derivatives[j].id) {
										disclaimerText = voiRestData[i].derivatives[j]['derivative' + voiConfig.formRequestTypeUppercase + 'Disclaimer'];
										if (typeof disclaimerText !== 'undefined' && disclaimerText != null) {
											$disclaimer.hide().html(disclaimerText).fadeIn('fast');
											foundDrv = true;
										}
										break;
									}
								}
							}
							
							if (!foundDrv) {
								disclaimerText = voiRestData[i][voiConfig.formRequestType + 'Disclaimer'];
								if (typeof disclaimerText !== 'undefined' && disclaimerText != null) {
									$disclaimer.hide().html(disclaimerText).fadeIn('fast');
								}
							}
						} 
					}
				}
			}
		},
		
		populateModelDropdown: function(voiRestData) {
			var $dd = $('#voi-model-name');
			
			if ($dd.length > 0) {
				var options = [],
					excludedSerEl = $("#modelseries"),
					filterList = [],
					optionList = voiRestData.slice(0),
					i;
				//if there is excludedSeries defined, remove from option list	
				if(excludedSerEl.length>0){
					var excludeSerJson = $.parseJSON(excludedSerEl.html()),
						excludeModel = excludeSerJson.excludedModels;
					if(excludeModel&&excludeModel.length>0){
						var excludeModelArr = excludeModel.split(",");//convert excluded list from string to array
						for(var k = 0; k < voiRestData.length; k++){
							var count = 0;
							//if there is excludedSeries defined, remove from option list
							if(excludeModelArr && excludeModelArr instanceof Array && excludeModelArr.length>0){
								for(var j = 0; j < excludeModelArr.length; j++){
									if($.trim(voiRestData[k].name)==$.trim(excludeModelArr[j])){
										count++;//record as a flag if match exclude element
									}
								}
								//filter the array element, store those not in the exclude list
								if(count==0){
									filterList.push(voiRestData[k]);
								}
							}
						}
					}
				}
				//update list if has filter element
				if(filterList.length > 0){
					optionList = filterList.slice(0);
				}
				
				for (var i = 0; i < optionList.length; i++) {
					options.push('<option value="' + optionList[i].name + '">' + optionList[i].name + '</options>');
				}
				$dd.append(options.join(''));
				if (ND.FormBuilder && ND.FormBuilder.styleSelectOptions) {
					ND.FormBuilder.styleSelectOptions($dd);
				}
				privateFunctions.addDropdownChangeListeners($dd, voiRestData);
			
				var ctx = publicFunctions.toJSONFromUrl();
				if (ctx != null && (typeof ctx.m !== 'undefined' && ctx.m != null) ) {
					for (i = 0; i < voiRestData.length; i++) {
						if (ctx.m === voiRestData[i].id) {
							$dd.val(voiRestData[i].name);
							privateFunctions.setModelDropDownValue(ctx);
							//trigger change only if ctx exists
							$dd.trigger('change');
							break;
						}
					}
				}
				privateFunctions.refreshMobileDropdown($dd);
			}
		},

        populateVehicleDropdown: function(voiRestData) {
            var $vehicleDropdown = $('#FormSales_Model');
            var options = [];
            var optionList = voiRestData.slice(0);
            for(var i = 0; i < optionList.length; i++){
                options.push('<option value="' + optionList[i].name + '">'+ optionList[i].name +'</option>');
            }
            $vehicleDropdown.append(options.join(''));
            privateFunctions.addDealerDropDownListeners($vehicleDropdown, voiRestData);
        },
		
		
		setHiddenInputValue: function(selector, value) {
			if (value != undefined) {
				var $hiddenInput = $(selector);
				if ($hiddenInput.length > 0) {
					$hiddenInput.val(value);
				}
			}
		},
		
		setModelDropDownValue: function(value) {
			privateFunctions.setHiddenInputValue('#voi-model-id', value.m);
			privateFunctions.setHiddenInputValue('#voi-model-cks-code', value.mcks);
		},

		populateSeriesDropdown: function($dd, modelDerivatives, $firstOption, $colorDD) {
			
			if (typeof modelDerivatives !== 'undefined' && modelDerivatives != null && modelDerivatives.length > 0) {
				var options = [],
				i;	
				for (i = 0; i < modelDerivatives.length; i++) {
					options.push('<option value="' + modelDerivatives[i].name + 
								 '" data-derivativeid="' + modelDerivatives[i].id + '">' + modelDerivatives[i].name + '</options>');
				}
				$dd.empty().html($firstOption).append(options.join(''));
				if (ND.FormBuilder && ND.FormBuilder.styleSelectOptions) {
					ND.FormBuilder.styleSelectOptions($dd);
				}
				var ctx = publicFunctions.toJSONFromUrl(),
					derivative;
			
				if (ctx != null && ((typeof ctx.d !== 'undefined' && ctx.d != null))) {
					for (i = 0; i < modelDerivatives.length; i++) {
						derivative = modelDerivatives[i];
						if (ctx.d === derivative.id) {
							$dd.val(derivative.name);
							// /console.log('setting value of dropdown: ' +
                            // select + ' to ' + derName);
							privateFunctions.setDerivativeDropDownValue(ctx);
							
							$dd.trigger('change');
							break;
						}
					}
				} else {
					privateFunctions.populateColorDropdown($dd, $colorDD);
				}
				
			} else {
				$dd.html($firstOption);
				privateFunctions.populateColorDropdown($dd, $colorDD);
				
			}
			privateFunctions.refreshMobileDropdown($dd);
		},
		setDerivativeDropDownValue : function(value) {
			privateFunctions.setHiddenInputValue('#voi-series-id', value.d);
			privateFunctions.setHiddenInputValue('#voi-series-cks-code', value.dcks);
			privateFunctions.setHiddenInputValue('#voi-series-year', value.dy);
			privateFunctions.setHiddenInputValue('#voi-series-quote-code', value.dqcode);
			privateFunctions.setHiddenInputValue('#voi-series-brochure-code', value.dbcode);
			privateFunctions.setHiddenInputValue('#voi-series-testdrive-code', value.dtdcode);			
		},
		
		colorDropdownFirstOption : null,
		
		populateColorDropdown: function($seriesDD, $dd) {
			if ($dd.length > 0) {
				
				if (privateFunctions.colorDropdownFirstOption == null) {
					privateFunctions.colorDropdownFirstOption = $dd.html();
				}
			
				// call ajax service
				
				var derivativeId = $seriesDD.find(':selected').data('derivativeid');
				
				if (typeof derivativeId !== 'undefined' && derivativeId != null) {
					var colorUrl = voiConfig.colorUrl.replace('{site}', voiConfig.site)
					  .replace('{priceZone}', voiConfig.priceZone)
					  .replace('{derivative}', derivativeId);

					$dd.empty().html('<option value="">' + voiConfig.pleaseWaitMsg + '</options>');

					privateFunctions.restServices.fetchColorData(colorUrl, function(colorData) {
						var options = [],
							i;
						for (i = 0; i < colorData.length; i++) {
							options.push('<option value="' + colorData[i].code + '">' + colorData[i].name + '</options>');
						}
						$dd.empty().html(privateFunctions.colorDropdownFirstOption).append(options.join(''));
						if (ND.FormBuilder && ND.FormBuilder.styleSelectOptions) {
							ND.FormBuilder.styleSelectOptions($dd);
						}
						privateFunctions.refreshMobileDropdown($dd);
					});
				}
//                if (typeof derivativeId !== 'undefined' && derivativeId != null) {
//                    $dd.empty().html('<option value="">wait</options>');
//                    privateFunctions.restServices.fetchColorData('../../../../latest-offers-2014-client/carve/RAD2013/rest/dealer-color.js', function(colorData) {
//                            var options = [],
//                                i;
//                            for (i = 0; i < colorData.length; i++) {
//                                options.push('<option value="' + colorData[i].code + '">' + colorData[i].name + '</options>');
//                            }
//                            $dd.empty().html(privateFunctions.colorDropdownFirstOption).append(options.join(''));
//                            if (ND.FormBuilder && ND.FormBuilder.styleSelectOptions) {
//                                ND.FormBuilder.styleSelectOptions($dd);
//                            }
//                            privateFunctions.refreshMobileDropdown($dd);
//                    });
//                }
                else {
					$dd.empty().html(privateFunctions.colorDropdownFirstOption);
				}
				privateFunctions.refreshMobileDropdown($dd);
			}
		},
		
		refreshMobileDropdown: function($dd) {
			if ( $.mobile ) {
				$dd.selectmenu('refresh', true);
			}
		},
		
		setColorDropDownValue : function(colourDropdown) {
			privateFunctions.setHiddenInputValue('#voi-colour-code', colourDropdown.find(':selected').val());
			privateFunctions.setHiddenInputValue('#voi-colour-name', colourDropdown.find(':selected').text());
		},
			
		
		/**
         * if we have a form and config, make an ajax call and retrieve the VOI
         * list
         */
	    init : function() {
	    	
	    	var $restConfig = $('#rest-services'),
	    		$modeSeriesConfig = $('#modelseries'),
	    		$commonConfig = $('#common-config'),
	    		$form = ('form');
	    	// if there is at least one form on the page
            $('#FormSales_Derivative').parent().css('display','none');
            $('#FormSales_Color').parent().css('display','none');
	    	if ($form.length > 0) {
	    		
	    		// from legacy code...can't move it
		    	publicFunctions.legacyDisplayVehicleBanner();
				publicFunctions.legacyDisplayVehicleDisclaimer();
	    			
	    		if ($restConfig.length > 0 && $modeSeriesConfig.length > 0) {
		    		$.extend(voiConfig, JSON.parse($modeSeriesConfig.html()),
					    				JSON.parse($restConfig.html()),
					    				JSON.parse($commonConfig.html()));
		    		
		    		if (voiConfig.formRequestType) {
		    			var firstChar = voiConfig.formRequestType.charAt(0);
		    			voiConfig.formRequestTypeUppercase = voiConfig.formRequestType;
		    			voiConfig.formRequestType = voiConfig.formRequestType.replace(firstChar, firstChar.toLowerCase());
		    		}
		    		
		    		voiConfig.voiUrl = voiConfig.voiUrl.replace('{site}', voiConfig.site).replace('{makeName}', voiConfig.make);
		    		voiConfig.voiUrl += voiConfig.excludedModels;
		    		
		    		privateFunctions.restServices.fetchVOIData(voiConfig.voiUrl);
	    		}
                //privateFunctions.restServices.fetchVOIData('../../../../latest-offers-2014-client/carve/RAD2013/rest/dealer-vehicle.js');
	    	}
	    }
	    
	    
	},
	
	publicFunctions = {
			
		//used to prevent smob logic from double firing 
		//once after page init and once after document ready.
		isContextInitialised : false,
		
		startUp : function() {
	    	
	    	if (!publicFunctions.isContextInitialised) {
				// need to do this check on every page regardless
				publicFunctions.addContextToLinks();
				publicFunctions.addPostcodeContextToLinks();
				
				// if we have a form and config, make an ajax call and retrieve the
	            // VOI list
				privateFunctions.init();
				publicFunctions.isContextInitialised = true;
	    	}
	    },
		/**
         * Converts parameterised context to JSON
         * 
         * d:<derivativeid>;m:<modelid>
         */
		toJSON : function(contextParam) {
			var result = {};
			if (typeof contextParam !== 'undefined') {
				params = contextParam.split(";");
				for (var i = 0; i < params.length ; i++) {
					var nameValuePair = params[i].split(':');
					if (nameValuePair.length == 2) {// ensure it's a name value
                                                    // pair
						result[nameValuePair[0]] = nameValuePair[1];
					}
				}
			}
			return result;
		},
		
		/**
         * builds the context param (ctx=m:1178856483523;d:1178856483570)
         */
		buildContext: function(additionalParams) {
			var params = new Array();
			if ((typeof _da !== 'undefined') && (typeof _da.nameplate !== 'undefined') && (typeof _da.nameplate.id !== 'undefined') && _da.nameplate.id != '') {
				
				params.push( 'm:' + _da.nameplate.id);
			} 
			if	((typeof _da !== 'undefined') && (typeof _da.der !== 'undefined') && (typeof _da.der.id !== 'undefined') && _da.der.id != '') {
				params.push( 'd:' + _da.der.id);
			}
            if (typeof additionalParams !== 'undefined' && additionalParams != null) {
                for (key in additionalParams) {
                    params.push( key + ':' + additionalParams[key]);
                }
            }
// console.log('built ctx=' + params.join(';') + ' context');
			return params.length > 0 ? ('ctx=' + params.join(';')) : '';
		},

		/**
         * if the url does not contain the context variable, it might still
         * exist (if we are on a smart mobile site). in that case check for a
         * div with data-role page; if that div has a data-url with ctx param
         * then call this method with the new url.
         */
		toJSONFromUrl: function(url) {
			url = decodeURIComponent(url || window.location.href);
			
			// console.log('looking for ctx in url ' + url);
			var idx = url.indexOf('ctx=');
			var ctx = null;
			if (idx > 0) {
				ctx = privateFunctions.extractContext(idx, url);
			} else {
				// perhaps we are on a mobile site
				var mobileUrl = null;
				var page = null;
				if ((page = $('div[data-role="page"]').filter(':visible')) != null && 
					(mobileUrl = page.attr('data-url')) != null) {
					if ((idx = mobileUrl.indexOf('ctx=')) > 0) {
						ctx = privateFunctions.extractContext(idx, url);
					} 	
				}
			}
			if (ctx != null) {
				ctx = publicFunctions.toJSON(ctx);
			}
			// console.log('ctx is = ' + ctx);
			return ctx;
		},
		
		/**
         * adds context param (ctx=m:1178856483523;d:1178856483570) to links
         * with 'ctx-voi' class
         */
		addContextToLinks: function() {
			var ctx = publicFunctions.buildContext();
// console.log('addContextToLinks');
			$('a.ctx-voi').each(function() {
                privateFunctions.addContextToHref($(this), ctx);
			});
		},
        /**
         * If postcode cookie exists, add ctx=pc:3000 to links with class ctx-pc
         */
        addPostcodeContextToLinks: function() {
            $.publish('shopping.pref.retrieve', function(e, postcodeData) {
                if (typeof postcodeData !== 'undefined' && postcodeData != null &&
                    typeof postcodeData.postcode !== 'undefined' && postcodeData.postcode != null)  {
                    var ctx = publicFunctions.buildContext({pc : postcodeData.postcode });
                    $('a.ctx-pc').each(function() {
                        var link = $(this);
                        // we have to add a class to the link to make sure we
                        // don't
                        // add the param twice, as page DOM still remains part
                        // of the page after page change.
                        if (!link.hasClass('ctx-pc-added')) {
                            privateFunctions.addContextToHref(link, ctx);
                            // for smob. adding data-ajax="false" to ensure form
                            // reloads properly
                            // since it's a form post, it shouldn't be captured
                            // in history anyways.
                            link.attr('data-ajax', 'false');
                        }
                    });
                }
            });
        },
		
		/**
         * inserts a banner image on forms that have been properly setup for VOI
         * prepopulation
         */
		legacyDisplayVehicleBanner: function() {
			var ctx = publicFunctions.toJSONFromUrl();
			if (ctx != null && typeof ctx.m !== 'undefined' && ctx.m != null) {
				// consider using ND.Utils.lazyLoadImage
				var $bannerCFF = $('#voi-banner'),
					$data = $('#model-context-banner');
				if ($bannerCFF.size() && $data.size()) {
					var content = JSON.parse($data.html());
					// console.log('legacyDisplayVehicleBanner');
					if (typeof content[ctx.m] !== 'undefined') {
						 var url = content[ctx.m];
						 // console.log('legacyDisplayVehicleBanner: found
                            // url for model[' + ctx.m + ']: ' + url);
						 $bannerCFF.html('<img src="' + url + '" />');
						
					}
				}
			}
		},
		
		/**
         * inserts a derivative disclaimer text on confirmation page that have
         * been properly setup for VOI prepopulation
         */
		legacyDisplayVehicleDisclaimer : function() {
			var ctx = publicFunctions.toJSONFromUrl(),
				$disclaimer = $('#voi-disclaimer');
			if (ctx != null && $disclaimer.size()) {
				var $derivativeData = $('#derivative-context-disclaimer');
				if ((typeof ctx.d !== 'undefined' && ctx.d != null) && $derivativeData.size()) {
					var derivativeDisclaimer = $derivativeData.embeddedData();
					if (derivativeDisclaimer[ctx.d] != null) {
						var disclaimerText = derivativeDisclaimer[ctx.d];
						// console.log('legacyDisplayVehicleDisclaimer: found
                        // disclaimer for derivative[' + ctx.d + ']: ' +
                        // disclaimerText);
						$disclaimer.hide().html(disclaimerText).fadeIn('fast');
					} else {
						publicFunctions.legacyDisplayNameplateDisclaimer(ctx, $disclaimer);
					}
				} else {
					publicFunctions.legacyDisplayNameplateDisclaimer(ctx, $disclaimer);
				} 
			}
		},
		
		/**
         * inserts a disclaimer text for namteplates on confirmation page that
         * have been properly setup for VOI prepopulation
         */
		legacyDisplayNameplateDisclaimer : function(ctx, $disclaimer) {
			var $modelData = $('#model-context-disclaimer');
			if ((typeof ctx.m !== 'undefined' && ctx.m != null) && $modelData.size()) {
				var modelDisclaimer = $modelData.embeddedData();
				if (modelDisclaimer[ctx.m] != null) {
					var disclaimerText = modelDisclaimer[ctx.m];
					// console.log('legacyDisplayVehicleDisclaimer: found
                    // disclaimer for model[' + ctx.m + ']: ' + disclaimerText);
					$disclaimer.hide().html(disclaimerText).fadeIn('fast');
				}
			}
		},
		
		/**
         * Populates nameplate dropdown on any form that has a valid ctx=m:<modelId>
         */
		legacyPopulateModelDropdown: function(select, hiddenInput, modelNameList) {
			var ctx = publicFunctions.toJSONFromUrl(),
				$dd = $('#' + select);
			if (ctx != null && ((typeof ctx.m !== 'undefined' && ctx.m != null) && $dd.length > 0)) {
				var modelName = modelNameList[ctx.m];
				if (modelName && modelName != null) {
					$dd.val(modelName);
					$dd.trigger('change');
					// console.log('setting value of dropdown: ' + select + ' to
                    // ' + modelName);
					var $hi = $('#' + hiddenInput);
					if ($hi.size()) {
						$hi.val(ctx.m);
					}
				}
			}
		},
		
		/**
         * Populates derivative dropdown on any form that has a valid ctx=m:<modelId>;d:<derivativeId>
         */
		legacyPopulateSeriesDropdown: function(select, hiddenInput, derivativeNameList) {
			var ctx = publicFunctions.toJSONFromUrl(),
				$dd = $('#' + select);
			
			if (ctx != null && ((typeof ctx.d !== 'undefined' && ctx.d != null) && $dd.length > 0)) {
				var derName = derivativeNameList[ctx.d];
				if (derName && derName != null) {
					$dd.val(derName);
					$dd.trigger('change');
					// /console.log('setting value of dropdown: ' + select + '
                    // to ' + derName);
					var $hi = $('#' + hiddenInput);
					if ($hi.size()) {
						$hi.val(ctx.d);
					}
				}
			}
		}
		
		
	};
	
	/**
     * Execute voi-prepopulation for web
     */
	$(document).ready(publicFunctions.startUp);
	
	return publicFunctions;
	
})(jQuery);


/**
 * @author Sohrab Zabetian
 * @project formbuilder. To be used on Smob and Web
 * 
 * @description manages close button on pages/forms. Requires ND.cacheStore to manage cookie, Object.create and jQuery
 * 
 * 
 */
(function($) {
	
	BB = {
	
		config : {
			bkBtnCookieName : 'dfy.pg.bkbtn',
			bkBtnId : '#page-back-btn',
			bkBtnClass: '.formbuilder-close'
		},	
		
		store: null,
		$bkBtn: null,
		
		prepareBBCookie : function() {
			var store = BB.store = Object.create(ND.cacheStore),
				cookie = ''; //an array of uri for current domain
			
			store.key = BB.config.bkBtnCookieName;
			
			if (store.is()) {
				cookie = store.get();
			} else {
				store.expires = 365;
			} 
			return cookie;
		},
		
		init: function() {
			
			
			var $formConfig = $('#form-config');
    		if ($formConfig.length > 0) {
	    		
				var formConfig = $.extend(BB.config,JSON.parse($formConfig.html()));
				
				if (typeof formConfig.isform !== 'undefined' && (formConfig.isform === 'false' || formConfig.isform === false)) {
					BB.addPageToCookie(BB.prepareBBCookie());
				}
				
				BB.$bkBtn = $(BB.config.bkBtnClass);

				if (BB.$bkBtn.length > 0) {
					BB.addListeners();
				}
    		}
		},
		
		addPageToCookie: function(cookie) {
			// var pageURI = encodeURI('/' + window.location.href.replace(window.location.protocol + '//', '').replace(window.location.host + '/', ''));
			var pageURI = encodeURI(window.location.href);
			if (cookie !== pageURI) {
				BB.store.set(pageURI);
			}
		},
		
		handleBkBtnEvent: function(e) {
			e.stopPropagation();
			
			//user clicked form back button
			//check cookie, if we have a cookie and history has been recorded
			//go back to that page, otherwise use data-homepage to go back home
			
			var cookie = BB.prepareBBCookie(),
				lastURI = null;
			
			//remove the page we are just on now (Except if this page is a form page since it wasn't in the cookie), as we are navigating away from it
			if (cookie != null && cookie.length > 0) {
				lastURI = cookie;
				BB.store.set(null);
			} else if (typeof BB.config.homepage !== 'undefined' && BB.config.homepage !== '' && !$("body").hasClass("apaform") ) {
				lastURI = BB.config.homepage; 
			}else if($("body").hasClass("apaform") && BB.config.dashboardpage !==''){
				lastURI=BB.config.dashboardpage;
				
			} else {
				console.error("homepage data attribute is missing, can't go back");
			}
			
			if (lastURI != null) {
				
				var decodedLink = decodeURI(lastURI);
				BB.$bkBtn.each(function() {
					$(this).attr('href', decodedLink);
				});
			}
		},
		
		addListeners : function() {

			if($("body").hasClass("confirm-alert")){

				$(document).on('click', "#confirmPopup .formbuilder-close", BB.handleBkBtnEvent);//for APA owner confirm popup before close the page

			}else{

				$(document).on('click', BB.config.bkBtnClass, BB.handleBkBtnEvent);
			}
			
		},
		
		destroy: function() {
			if (BB.$bkBtn == null) {
				BB.$bkBtn = $(BB.config.bkBtnClass);
			}
			if (BB.$bkBtn.length > 0) {
				$(document).off('click', BB.config.bkBtnClass);
			}
		}
	};
	
	$(document).ready(BB.init);
	$(document).on('pagechange', function() {
		BB.destroy();
		BB.init();
	});
	
})(jQuery);


/*
Author: Biao
Description: Edit profile

Modified By: Faris
Modified Date: 2013-11-20
Description: Add, update, delete vehicle
*/

(function($) {

	var editprofile = {
		init: function() {
			var delitem;
			$("#displaypwd").click(function(e) {							
				$('#password').hide();
				$('#passwordfake').show().val($('#password').val()).attr("class",$('#password').attr("class"));	
				$("#displaypwd").hide();
				$("#hidepwd").show();
			})
			$("#hidepwd").click(function(e) {				
				$('#passwordfake').hide();
				$('#password').show().val($('#passwordfake').val()).attr("class",$('#passwordfake').attr("class"));
				$("#displaypwd").show();
				$("#hidepwd").hide();
			})
			$('#passwordfake').change(function(e){
				$('#password').val($('#passwordfake').val()).attr("class",$('#passwordfake').attr("class"));	
			})
			$('#password').change(function(e){
				$('#passwordfake').val($('#password').val()).attr("class",$('#password').attr("class"));	
			})
			
			$(".user-vehicle .edit").click(function(e) {
				e.preventDefault();
				e.stopPropagation();
				$(".user-vehicle .state-readonly").hide();
				$(".user-vehicle .state-edit").show();
				
				var vehicleId = $(this).parent().parent().children(":eq(0)").attr("for");
				delitem = $(".user-vehicle .state-edit").children();
				for (var i = 0; i < delitem.size(); i++) {
					if (delitem.eq(i).children(":eq(0)").children(":eq(0)").children(":eq(0)").attr("name") == vehicleId) {
						delitem.eq(i).show();
					} else {
						delitem.eq(i).hide();
					}
				}
			})
			
			$(".user-vehicle .icon-add").click(function(e) {
				e.preventDefault();
				var $flexFields = $(this).closest(".double").find(".flexfield");
				var doubleSize = $(".double").children().size();

				// rename the queue, skip the template, retain the flexfield group first
				$flexFields = $(this).closest(".double").find(".flexfield");
				for (var i = 1; i <= $flexFields.size(); i++) {
					$("input", $flexFields.eq(i)).each(function() {
						var $input = $(this);
						$input.attr({
							"name": $input.attr("name").replace(/\d+$/g, doubleSize - 2 + i),
							"id": $input.attr("id").replace(/\d+$/g, doubleSize - 2 + i)
						});
					});
					$("label", $flexFields.eq(i)).each(function() {
						var $input = $(this);
						$input.attr({
							"for": $input.attr("for").replace(/\d+$/g, doubleSize - 2 + i)
						});
					});
					$(".submitVehicleForm", $flexFields.eq(i)).each(function() {
						var $input = $(this);
						$input.attr({
							"data-index": doubleSize - 2 + i
						});
					});
					
				}
			})
			
			$(".user-vehicle .cancel").live('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				$(this).closest("form").get(0).reset();
				$(".user-vehicle .state-readonly").show();
				$(".user-vehicle .state-edit").hide();
			})
			
			$(".userdetail .edit").click(function(e) {
				e.preventDefault();
				e.stopPropagation();
				$(".userdetail .state-readonly").hide();
				$(".userdetail .state-edit").show();
			})
			
			$(".userdetail .cancel").click(function(e) {
				e.preventDefault();
				e.stopPropagation();
				$(this).closest("form").get(0).reset();
				$(".userdetail .state-readonly").show();
				$(".userdetail .state-edit").hide();
			})
			
			$(".user-vehicle .cancelAddVehicle").live('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				$(this).parent().parent().parent().remove();
			})
			
			$(".user-vehicle .icon-remove").click(function(e) {
				e.preventDefault();
				e.stopPropagation();
				$("#deleteoverlay").show();
				$("body").addClass("noscroll");//fix issue #194303
				var delVehicle = $(this).attr("data-delete");
				$("#deleteoverlay #bg #content input[id=delVehicle]").attr("name",delVehicle);
				var textVal = $("#deleteoverlay #bg #content input[name=confirmDelVehicle]").val()
								.replace("%1", $("div fieldset div div.row label[for=firstname]").parent().find("h5").text())
								.replace("%2", $("div fieldset div div.row label[for=lastname]").parent().find("h5").text())
								.replace("%3", $(this).parent().parent().find("h5:first").text());
				//$("#deleteoverlay #bg #content input[name=confirmDelVehicleId]").val($(this).parent().parent().find("label:first").attr("for"));
			
				$("#deleteoverlay #bg #content h3").text(textVal);
				$("#deleteoverlay #bg #content img").attr("src", $(this).parent().parent().parent().find("div div div img").attr("src"));
			})
			$(".state-edit .passwords-match").live('keyup',function(){
				
				var inputpss=$(".state-edit .passwords-match"),
					totallen=0;
				$.each(inputpss,function(i){
					totallen+=inputpss.eq(i).val().length;
				})
				
				if(totallen>0){
					inputpss.attr("required","true");
				}else{
					inputpss.removeAttr("required");
				}
				inputpss.trigger("focusout");
			})
			$(".state-edit #password").live('keyup',function(){				
				var oldpwd = $(".state-edit #oldpassword");
				if($(this).val()!==""){
					oldpwd.attr("required","true");
				}else{
					oldpwd.removeAttr("required");
				}
				oldpwd.trigger("focusout");
				$(this).trigger("focusout");
			})
			$("#deleteoverlay .cancel").click(function(e) {
				e.preventDefault();
				e.stopPropagation();
				$("#deleteoverlay #bg #content input[id=delVehicle]").attr("name","delVehicle");
				$("#deleteoverlay").hide();
				$("body").removeClass("noscroll");
			})
			
			$("#deleteoverlay .delete").click(function(e) {
				e.preventDefault();
				e.stopPropagation();
				
				var delVehicleId = $("#deleteoverlay #bg #content input[id=delVehicle]").attr("name");
				$(".user-vehicle .state-edit input[name=" + delVehicleId + "]").parent().parent().parent().remove();
				$(".user-vehicle .state-readonly label[for=" + delVehicleId + "]").parent().parent().remove();
				
				$("#deleteoverlay").hide();
			})
			
			$(".double div[class~=flexfield] div[class~=radio] div").live('click', function(e) {
				$(this).children("input[type=radio]:eq(0)").val("Y");
				$(this).children("input[type=radio]:eq(1)").val("N");
			})
			
			$(".cancelPreference").live('click',(function(e) {
				e.preventDefault();
				e.stopPropagation();
				
				/*$(this).closest("form").get(0).reset();
				location.reload(true);*/
				editprofile.fillPreferenceVaules($(this));
				
				
			}))
			
			$(".submitForm").click(function(e) {				
				 var $form = $(this).closest("form");
				 if($form.checkValidity()){
					 var fieldsData = new Object();	
					 var inputs = $("input,select,textarea",$form);
					 jQuery.each(inputs, function(i, field){
						 var fieldValue = $(this).val();
						 if ($(this).attr("type") == 'radio' || $(this).attr("type") == 'checkbox'){
							 fieldValue = $(this).filter(':checked').val();
							 if(!fieldValue) fieldValue = "N";
						 }					 
						 if($(this).attr("type") !== 'password'||($(this).attr("type") == 'password' && fieldValue !=="" && fieldValue!==undefined)){
							 //for state&& city,cannot pass an empty string
							 if($.trim(fieldValue) == ""||fieldValue == undefined){fieldValue = "";$(this).val(fieldValue);}
							 fieldsData[$(this).attr("name")] = fieldValue;
						 }
					 });					 
					//console.log(fieldsData);				
					editprofile.sendFormData($(this),$form,fieldsData);
				}			
			})
			$(".delVehicleForm").click(function(e) {				
				var $form = $(this).closest("form");				
				var delVel = $("#deleteoverlay #bg #content input[id=delVehicle]");
				if (!delVel) return;
				var fieldsData = new Object();								
				fieldsData["user-profile-action"] = "update-partial-user";
				fieldsData[delVel.attr("name")] = delVel.val();
				editprofile.sendFormData($(this),$form,fieldsData);
			})
			
			$(".submitVehicleForm").live('click', function(e) {
				var $form = $(this).closest("form");				
				var fields = [{"name":"vehicle_vin_X"},{"name":"vehicle_nickname_X"},{"name":"primary_vehicle_id_X"}];
				var fieldsData = new Object();
				var index = $(this).attr("data-index");
				if (!index) return;
				fieldsData["user-profile-action"] = "update-partial-user";
				var inputParent = $(this).parent().parent();
				jQuery.each(fields, function(i, field){
					var fieldName = field.name.replace("X",index);
					if ($("input[name = "+ fieldName +"]",inputParent).checkValidity()){
						var fieldValue = $("input[name = "+ fieldName +"]",inputParent).val();
						if ($("input[name = "+ fieldName +"]",inputParent).attr("type") == 'radio'){
							fieldValue = $("input[name = "+ fieldName +"]",inputParent).filter(':checked').val();
						}
						fieldsData[fieldName] = fieldValue;
					}
				});					
				editprofile.sendFormData($(this),$form,fieldsData);				
			})			
		},checkData:{}
		,
		getPreferenceVaules:function(){
			if(!$(".preferences").size()){return;}
			var checkItem=$(".preferences .checkbox-image"),
				checkItemid="",
				checkItemvalue="N";
			
			$.each(checkItem,function(i){
				
				checkItemid=checkItem.eq(i).next().attr("id");
				if(checkItem.eq(i).hasClass("checked")){
					checkItemvalue="Y";
				}else{
					checkItemvalue="N";
				}
				
				editprofile.checkData[checkItemid]=checkItemvalue;
			})
			
		},
		trackpage:function(){
			
			if (window._da && window._da.om && ND && ND.omniture) {
				ND.analyticsTag.trackOmniturePage({
					pname: _da.pname+" completed",
					hier: _da.hier
				});
			}
		}
		,
		fillPreferenceVaules:function(curEl){
			var checkItem=$(".preferences .checkbox-image"),
				checkItemid="";
			if(curEl){
				var optGroup = curEl.closest(".preferences").find(".opt-inout-checkbox .option-group");
			}
			$.each(checkItem,function(i){
				checkItemid=checkItem.eq(i).next().attr("id");
				if(editprofile.checkData && editprofile.checkData[checkItemid]){
					if(editprofile.checkData[checkItemid]=="Y"){
						checkItem.eq(i).addClass("checked");
						checkItem.eq(i).siblings("input[type=checkbox]").prop("checked",true);//while remove the value as well
					}else{
						checkItem.eq(i).removeClass("checked");
						checkItem.eq(i).siblings("input[type=checkbox]").prop("checked",false);//while remove the value as well
					}
				}
			});
			//"component with class ".opt-inout-checkbox" has slide animation, will need to trigger slide manually after "cancel" btn clicked"
			if(optGroup&&optGroup.length>0){
				var parentChkBox = optGroup.siblings(".checkbox-image"),
					childChkBox = optGroup.find(".checkbox-image"),
					count = 0;
				if(childChkBox.length>0){
					childChkBox.each(function(){
						if($(this).hasClass("checked")){
							count++;
						}
					});
					
					if(parentChkBox.hasClass("checked")){
						optGroup.slideUp();//hide
						curEl.closest(".preferences").find(".opt-inout-checkbox").removeClass("showErr");
						optGroup.find("input[type=checkbox]").each(function(){
							$(this).prop("required",false);
						});
					}else{
						if(count>0&&optGroup.is(":hidden")){
							optGroup.slideDown();//show
						}
					}
				}
			}
		}
		,
		sendFormData:function(item,elem,json){
		    if ($(elem).find(".ws-invalid").length > 0) return;

		    //add primary vin info
		    var primaryVin = null;
		    $.each($('.state-readonly div div .columns-vehicle label[for^=primary_vehicle_id_]'), function (i, label) {
		        if ($(label).text() === 'true') {
		            primaryVin = $(label);
		        }
		    });
		    var vin = primaryVin.parent().find('label[for^=vehicle_vin_]');
		    var vin_name = primaryVin.parent().find('label[for^=vehicle_nickname_]');
		    if (vin.length > 0 && vin_name.length > 0 && !json[vin.attr('for')]) {
		        json[vin.attr('for')] = vin.next().text();
		        json[vin_name.attr('for')] = vin_name.next().text();
		    }

			var fieldset = $(elem).find(".state-readonly")[0];
			$(elem).find(".columns.error").empty();
			$.ajax({
				type: "post",
				url: $(elem).attr("action"),
				contentType:"application/json; charset=UTF-8",
				data: JSON.stringify(json),					
				dataType: "json",
				success: function(result) {					
					if (result.success ==="true"){		
						var editIndex = $("a.savechange").index($(item));
						if($(item).attr("data-index")){
							editIndex = $(item).attr("data-index");
						}
						$.cookie("postsuccess",editIndex);						
						editprofile.trackpage();
						location.reload(true);
					}else if(result.errors.length > 0){						
						var errorMsg = "";
						$.each(result.errors,function(idx,item){
							var label = $("[name="+item.field+"]").prev("label").text();
							if(!label){label = item.field;}
							if(item.translation){
								errorMsg += label +": " +item.translation +"<br/>";
							}else{
								errorMsg += label +": " +item.translationKey +"<br/>";
							}
						});							
						$(fieldset).before("<div class='large-10 large-centered columns error'><p style='color:#f00'>"+errorMsg+"</p></div>")
					}	
				}
			});	
		},getpostsuccessmeg:function(){
			if($.cookie("postsuccess")){
				var savedtextIndex = $.cookie("postsuccess");				
				$("p.successtips").show();
				
				if (savedtextIndex != -1){										
					$("h5.savedtext").eq(savedtextIndex).show();
				}
				$.cookie("postsuccess",null);
			}else{
				$("p.successtips").hide();
				$("h5.savedtext").hide();
			}
		}
	};
	$(window).load(function(){
		
		editprofile.getPreferenceVaules();
		
	})

	$(function() {
	
		editprofile.getpostsuccessmeg();
		editprofile.init();
	});
})(jQuery);


/***************************************
add the redirection disable flag to all the urls under the page
****************************************/
$( document ).ready(function(){
	var current = window.location.href;
	var str = "uar=false"
	
	if(current.indexOf("?" + str) > 0 || current.indexOf("&" + str) > 0){
		$("a").each(function (){
			if($( this ).hasClass('external-disclaimer') == false){
				var url = $( this ).attr("href")
				if(url.indexOf("http") == 0){
					if(url.indexOf("?") > 0){
						url += "&" + str;
					}else{
						url += "?" + str;
					}
					$(this).attr("href",url);
				}
			}
		});
	}
});


/*
Author: Ruiwen Qin
File name: brochure-request.js
Description: 1. Retrieve the models information and render the carousel
*/

(function($){

	$(function(){
		if(!$(".auto-download").size()) {return;}

		$("img").imagesLoaded(function(){
			$(".auto-download")[0].click();
		})
		
		

	});

})(jQuery);


/*
Author: 		Randell Quitain
File name: 		personalisation.js
Description: 	Check auth status and setup cookies
Dependencies: 	jQuery, jQuery.cookie, jquery.tinypubsub, FPS
Usage: 			
*/

var guxPersonalisation = guxPersonalisation || {};

(function($){
	guxPersonalisation.psn = {
		uuid: {},
		profile: {},
		init: function(){

			/*
			Test UserCookie
			$.cookie('dfy.u', '{"fn":"John","now":"Mustang","s":"OW","authid":"311982","authby":"005","pcode":"MUSTANG","pc":"3000"}');
			*/

			var success, error;

			// subscribe to profile-done
			$.subscribe('profile-done', (function(){
				if(typeof guxPersonalisation.components !== "undefined") {
					// console.log('Start all components.');
					guxPersonalisation.components.execute();
				}
			}));

			// when FPS success
			success = function (value, status, jqXHR) {
				guxPersonalisation.psn.setProfile(value);
			};

			// when FPS fail
			error = function (value, status, jqXHR) {
				// console.log("FPS isn't loaded, dfy.p value based on FPS will not be updated.");
				// guxPersonalisation.psn.setProfile();
				return;
			};

			// check is FPS is available
			if(typeof FPS !== "undefined") {
				FPS.get([{ 'KBA': {} }, { 'LastViewedVehicle': {} }, { 'RecentlyViewedVehicles': {} }, { 'PreferredDealer': {} }], { success: success, error: error });
			} else {
				// console.log("FPS does not exist, dfy.p value based on FPS will not be updated.");
				// guxPersonalisation.psn.setProfile();
				return;
			}

			// $(window).on('resize',function(){
			// 	guxPersonalisation.psn.init();
			// });

		},
		setUUID: function(){
			if (!$.cookie('dfy.uuid')) {
				if (typeof uuid !== "undefined"){
					var configInfo = guxPersonalisation.psn.commonConfig(),
						cookieDomain = window.location.host;
					if(configInfo !== null && configInfo.cookieDomain) {
						cookieDomain = configInfo.cookieDomain;
					}
					// temporary adobe id
					guxPersonalisation.psn.uuid = { "id": uuid.v1() };
					// expiration: 5 years
					$.cookie('dfy.uuid', JSON.stringify(guxPersonalisation.psn.uuid), { expires: 1825, path: '/', domain: cookieDomain });
				}
			} else {
				guxPersonalisation.psn.uuid = $.parseJSON( JSON.stringify($.cookie('dfy.uuid')) );
			}
		},
		setProfile: function(data){
			// check if sessionStorage is supported
			if(typeof sessionStorage !== "undefined") {
				if (sessionStorage.getItem("dfy.p") === null) {
					sessionStorage.setItem("dfy.p", JSON.stringify(this.fillProfile(data)));
					// create adobeid on first visit
					guxPersonalisation.psn.setUUID();
				} else {
					// check/update  = $.parseJSON( JSON.stringify($.cookie('dfy.uuid')) );
					guxPersonalisation.psn.setUUID();
					sessionStorage.setItem("dfy.p", JSON.stringify(this.fillProfile(data)));
				}
			} else {
				// if sessionStorage is not supported - create cookie
				if (!$.cookie('dfy.p')) {
					var configInfo = guxPersonalisation.psn.commonConfig(),
						cookieDomain = window.location.host;
					if(configInfo !== null && configInfo.cookieDomain) {
						cookieDomain = configInfo.cookieDomain;
					}
					$.cookie('dfy.p', JSON.stringify(this.fillProfile(data)), { path: '/', domain: cookieDomain });
					// create adobeid on first visit
					guxPersonalisation.psn.setUUID();
				} else {
					// check/update  = $.parseJSON( JSON.stringify($.cookie('dfy.uuid')) );
					guxPersonalisation.psn.setUUID();
					$.cookie('dfy.p', JSON.stringify(this.fillProfile(data)), { path: '/', domain: cookieDomain });
				}
			}
		},
		fillProfile: function(value) {

			// standalone check if object is empty
			function isEmpty(obj) {
				for(var prop in obj) {
					if(obj.hasOwnProperty(prop)){ return false; }
				}
				return true;
			}

			// sort via "on"
			function sortOnDesc(arr) {
				var data = arr.sort(function(a, b) {
					var _a = a.on, _b = b.on;
					return _a <= _b ? -1 : 1;
				});
				return data.reverse();
			}

			// parse cookies/common-config
			var configInfo = guxPersonalisation.psn.commonConfig(),
				cookieUUID = null,
				cookieUser = null,
				cookieDL = null;

			if($.cookie('dfy.uuid')) {
				cookieUUID = $.parseJSON( $.cookie('dfy.uuid') );
			}
			
			if($.cookie('dfy.u')) {
				cookieUser = $.parseJSON( $.cookie('dfy.u') );
			}

			if($.cookie('dfy.dl')) {
				cookieDL = $.cookie('dfy.dl');
			}

			// FPS based values
			var noi = "NoVehicle",
				kba = "",
				f = "", 
				rvv = [],
				dc = (cookieDL != null) ? cookieDL : "";
				
			// set FPS values
			if(typeof value !== "undefined" && value !== null && !isEmpty(value)) {

				// console.group('FPS data:');
				// console.log(value);

				var kbas = value[0]['KBA'],
					lastViewedVehicle = value[1]['LastViewedVehicle'],
					recentlyViewedVehicles = value[2]['RecentlyViewedVehicles'],
					preferredDealer = value[3]['PreferredDealer'];

				if(typeof kbas !== "undefined" && !isEmpty(kbas)) {
					kba = "#";
					for (var key in kbas) {
						if (kbas.hasOwnProperty(key)) {
							kba += kbas[key]._KBA + "#";
						}
					}
				}

				/* buggy */
				// if(typeof lastViewedVehicle != "undefined" && lastViewedVehicle != null && !isEmpty(lastViewedVehicle)) {
				// 	noi = lastViewedVehicle[0]._nameplate.split(':')[1];
				// }

				if(typeof recentlyViewedVehicles !== "undefined" && !isEmpty(recentlyViewedVehicles)) {
					// sort to recently viewed - temporary lastViewedVehicle
					var lastViewedVehicle = sortOnDesc(recentlyViewedVehicles);
					noi = lastViewedVehicle[0]._nameplate.split(':')[1];
					for (var key in recentlyViewedVehicles) {
						if (recentlyViewedVehicles.hasOwnProperty(key)) {
							rvv.push({ "_nameplate": recentlyViewedVehicles[key]._nameplate });
						}
					}
					rvv = JSON.stringify(rvv);
				}

				if(typeof preferredDealer !== "undefined" && !isEmpty(preferredDealer)) {
					// sort to preferred dealer
					var preferredDealer = sortOnDesc(preferredDealer);
					// override dfy.d value if FPS is available
					dc = preferredDealer[0]._paCode;
				}
			}
			
			// check tools
			var tools = "";

			// define initial value
			var authState = "",
				now = "",
				id = (cookieUUID) ? cookieUUID.id : "",
				authid = "", /*TBD - based on dfy.p*/
				fn = "";

			//console.log(sessionStorage.getItem("dfy.p"));
			// set values depending on authState
			if(this.viewport() === "mobile"){
				if (cookieUser !== null) {
					authState = cookieUser.s;
					now = cookieUser.now;
					authid = cookieUser.authid;
					fn = cookieUser.fn;
				} else if (cookieUUID === null) {
					authState = "FS";
					// assign tools depending on authState
					if(configInfo != null && configInfo.smobFsTools) {
						tools = configInfo.smobFsTools;
					}
				} else if (cookieUUID != null && cookieUser === null) {
					authState = "AN";
					// assign tools depending on authState
					if(configInfo != null && configInfo.smobAnTools) {
						tools = configInfo.smobAnTools;
					}
				}
			} else {
				if (cookieUser !== null) {
					authState = cookieUser.s;
					now = cookieUser.now;
					authid = cookieUser.authid;
					fn = cookieUser.fn;
				} else if (cookieUUID === null) {
					authState = "FS";
					// assign tools depending on authState
					if(configInfo != null && configInfo.fsTools) {
						tools = configInfo.fsTools;
					}
				} else if (cookieUUID != null && cookieUser === null) {
					authState = "AN";
					// assign tools depending on authState
					if(configInfo != null && configInfo.anTools) {
						tools = configInfo.anTools;
					}
				}
			}
			// set profile
			guxPersonalisation.psn.profile = {
				"authState"	: 	authState,
				"now"		: 	now,
				"noi"		: 	noi, 
				"id"		: 	id, 
				"authid"	:  	authid,
				"tools"		:  	tools, 
				"kba"		:  	kba,
				"fn"		:  	fn, 
				"f"			:   f,
				"rvv"		:  	rvv,
				"dc"		:  	dc
			}
			
			// profile cookie/session creation done
			$.publish('profile-done');
			

			return guxPersonalisation.psn.profile;
		},
		commonConfig: function() {
			// standalone check #common-config
			if ($('#common-config').length) {
				return $('#common-config').embeddedData();
			} else {
				return null;
			}
		},
		viewport: function() {
			var view = "";
			if ($(window).width() < 768){
				this.view = "mobile";
			}
			else {
				this.view = "tablet";
			}
			return view;
		}
	}

	$(function(){
		guxPersonalisation.psn.init();
	});

})(jQuery);


(function(){
	var ND = window.ND = window.ND || {};
			
	var fps = ND.fps = {
					
		_init: function( _fpstag ) {
			this._fpstag = _fpstag;			

		},
		
		// store links
		pageClicks : {},
		
		
		/*
		 * Track Page Views. 
		 */			
		trackPageView: function( params ) {			
			// if function is to be implemented, it will be the same as trackLink, so
			// console.log('Tracking FPS trackPageView');
			fps.trackFps(params);
		},
		
		trackLink: function( params ) {
			// console.log('Tracking FPS trackLink');
			//TODO
			//function executed when a trackable link is clicked
			// this function should track information to FPS The code should
			// call trackFps function (as links and pages are to be tracked in
			// the same way). What might differ might be a parameter format
			fps.trackFps(params);
		},
		
		

		trackFps:  function(params) {	
			// console.log('Tracking FPS');
			var kbaEvents = '';
			var setViewedVehicle = {};
			var setDelear = {};
			var setKBA = {};
			var setTool = {};
			var setAnonymous = {};
			var setOwner = {};
			var setKBARTDC = {};
			var setKBABRQC = {};
			var setKBABAPC = {};
			var setKBARAQC = {};
						
						
			var derivativeName = '';
			var derivativeID = '';
			var nameplateBrand = '';
			var nameplateYear = '';
			var nameplateName = '';
			var nameplateID = '';
			
			var bolSetFPS = false;
			
			
			// console.log('params = ' + params );
			if(typeof params !== 'undefined') {
				// console.log('params.nameplate = ' + params.nameplate );
			}
			
			if (typeof params !== 'undefined' && typeof params.nameplate !== 'undefined' ) {//'params contains nameplate information or other information relevant for FPS') {
	
				if(typeof _da !== 'undefined' && typeof _da.nameplate !== 'undefined') {
					
					
					if(params.nameplate == _da.nameplate.name) {												
						
						if(typeof _da.om.site !== 'undefined' ) {
							nameplateBrand =  _da.om.site;
						}
						
						if(typeof _da.nameplate !== 'undefined') {
							
							if(typeof _da.nameplate.name !== 'undefined') {
								nameplateName = _da.nameplate.name;
							}
							
							if(typeof _da.nameplate.id !== 'undefined') {
								nameplateID = _da.nameplate.id;
							}
							
							if(typeof _da.nameplate.year !== 'undefined' ) {
								nameplateYear =  _da.nameplate.year;
							}

						}
						
						if(typeof _da.der !== 'undefined') {
							
							if(typeof _da.der.name !== 'undefined') {
								derivativeName = _da.der.name;
							}
							
							if(typeof _da.der.id !== 'undefined') {
								derivativeID = _da.der.id;
							}

						}
						
											
						if(nameplateName != '') {
							   // console.log('FPS Set ViewedVehicle via Params');
							   setViewedVehicle = { 'ViewedVehicle': { _year: nameplateYear, _brand: nameplateBrand , _nameplate: nameplateID + ':' + nameplateName, _trim: derivativeID + ':' + derivativeName, _interior: '' , _exterior: '' }, metadata: { active: 'true' } }
							   bolSetFPS = true;
						}
					
					}
				}
	
			} else {
					
				if(typeof _da !== 'undefined') {
													
					if(typeof _da.om.site !== 'undefined' ) {
						nameplateBrand =  _da.om.site;
					}
					
					if(typeof _da.nameplate !== 'undefined') {
						
						if(typeof _da.nameplate.name !== 'undefined') {
							nameplateName = _da.nameplate.name;
						}
						
						if(typeof _da.nameplate.id !== 'undefined') {
							nameplateID = _da.nameplate.id;
						}
						
						if(typeof _da.nameplate.year !== 'undefined' ) {
							nameplateYear =  _da.nameplate.year;
						}

					}
					
					if(typeof _da.der !== 'undefined') {
						
						if(typeof _da.der.name !== 'undefined') {
							derivativeName = _da.der.name;
						}
						
						if(typeof _da.der.id !== 'undefined') {
							derivativeID = _da.der.id;
						}

					}
					
					// console.log('Nameplate = ' + nameplateName );
										
					if(nameplateName != '') {
						   // console.log('FPS Set ViewedVehicle via _da');
						   setViewedVehicle = { 'ViewedVehicle': { _year: nameplateYear, _brand: nameplateBrand , _nameplate: nameplateID + ':' + nameplateName, _trim: derivativeID + ':' + derivativeName, _interior: '' , _exterior: '' }, metadata: { active: 'true'} }
						   bolSetFPS = true;
					}

				}
			}

		
		
			if (typeof _da.events !== 'undefined') {				
				var currentEvent;
							
				
				if(typeof guxPersonalisation !== 'undefined' ) {
					
					if(typeof guxPersonalisation.psn.profile.kba !== 'undefined') {
						kbaEvents = guxPersonalisation.psn.profile.kba;
					}
				}

				
				for (var i = 0; i < _da.events.length; i++) {
				
					currentEvent = _da.events[i];
					
					if(currentEvent == 'event2') {
						
						if(kbaEvents.search('BAPC') == -1) {
						     // console.log('FPS Set KBAEvent BAPC');
							setKBABAPC = {'KBAEvent': {_KBA: 'BAPC'}, metadata: { active: 'true' } };
							bolSetFPS = true;
						}
					}

					if(currentEvent == 'event3') {
						
						if(kbaEvents.search('RAQC') == -1) {
						     // console.log('FPS Set KBAEvent RAQC');
							setKBARAQC = {'KBAEvent': {_KBA: 'RAQC'}, metadata: { active: 'true' } };
							bolSetFPS = true;
						}
					}
					
					if(currentEvent == 'event15') {
						if(kbaEvents.search('BRQC') == -1) {
							// console.log('FPS Set KBAEvent BRQC');
							setKBABRQC = {'KBAEvent': {_KBA: 'BRQC'}, metadata: { active: 'true' } };
							bolSetFPS = true;
						}
					}

					if(currentEvent == 'event20') {
						if(kbaEvents.search('RTDC') == -1) {
							// console.log('FPS Set KBAEvent RTDC');
							setKBARTDC = {'KBAEvent': {_KBA: 'RTDC'}, metadata: { active: 'true' } };
							bolSetFPS = true;
						}
					}					
					
				}
				

			}			

			
			if(typeof guxPersonalisation !== 'undefined' ) {
				
				
				if(typeof guxPersonalisation.psn.profile.authid !== 'undefined') {
					
					setOwner = {'ExternalRef': {_type: 'DFL', _id: guxPersonalisation.psn.profile.authid}, metadata: { active: 'true' } };
					bolSetFPS = true;
				}
				
				if(typeof guxPersonalisation.psn.profile.id !== 'undefined') {

					setAnonymous = {'ExternalRef': {_type: 'DFLA', _id: guxPersonalisation.psn.profile.id}, metadata: { active: 'true' } };
					bolSetFPS = true;
				}
				
				
			}			
			
			if(typeof FPS !== 'undefined') {
				
				if(bolSetFPS) {
					// Set all at once to minimized network connection
					FPS.set([ setViewedVehicle, setKBABAPC, setKBABRQC, setKBARTDC, setKBARAQC, setOwner, setAnonymous  ]);
				}

			
			}

		},
		
		trackEvent: function( params ) {
			// console.log('FPS Tracking Event');
			//TODO track favouriting dealer here and other 
			if (params.type == 'fav-dealer') {
				if(typeof FPS !== 'undefined') {
					FPS.set([ { 'PreferredDealer': { _paCode: params.code }, metadata: { active: 'true' } }]);
				}
			} else if (params.type == 'specified postcode') {
				//FPS.set( ... );
			} //else if {
				//TODO add all types here
			//}
		},
		trackSocial: function( params ) {
			// empty not needed at the current state, left here for
			// compatibility and future extensions reasons
		},			
		trackField: function( params ) {
			// empty not needed at the current state, left here for
			// compatibility and future extensions reasons
		},
		preCollection: function( options, params) {
			//this functional is called before tracking call is made.
			//TODO place here any code which has to happen before page track is made. like reading cookies or DOM metadata

		}

	};

})();


(function(){
	var ND = window.ND = window.ND || {};
	
	var omniture = ND.omniture = {
					
		_init: function( _omtag ) {
			this._omtag = _omtag;
		},
		
		// store links
		pageClicks : {},
		//store module component types
		moduleTypes : {},
		
		/*
		 * Track Page Views. 
		 */			
		trackPageView: function( params ) {
			//empty not needed at the current state, left here for compatibility reasons
			if (typeof params.login !== 'undefined') {
				s.eVar42 = 'x';
			}

		},
		createHier1 : function( hier1 ){
			if (typeof hier1 !== 'undefined') {
				s.hier1 = hier1;
			} else {
				s.hier1 = _da.hier;
			}
			
			if (typeof _da.nameplate !== 'undefined') {
				s.hier1 = s.hier1 + ':' + _da.nameplate.year + ':' + _da.nameplate.cat + ':' + _da.nameplate.name;
			}
		},
		createPageName : function( param ){
			if (typeof param !== 'undefined' && param !== '') {
				s.pageName = s.eVar11 = s.prop11 = param;
			} else {
				s.pageName = s.eVar11 = s.prop11 = _da.pname;
			}
			if (_da.funnel.stepname) {
				s.pageName = s.pageName + ':' + _da.funnel.stepname;
				s.eVar11 = s.eVar11 + ':' + _da.funnel.stepname;
				s.prop11 = s.prop11 + ':' + _da.funnel.stepname;
			}
			//lincoln2014 site search
			if (_da.pagenumber) {
				s.pageName = s.pageName + _da.pagenumber;
				s.eVar11 = s.eVar11 + _da.pagenumber;
				s.prop11 = s.prop11 + _da.pagenumber;
			}
			//sync omniture
			if (typeof _da.sync!== 'undefined'){
				if (typeof _da.sync.version  !== 'undefined') {
					s.pageName = s.pageName + ':' + _da.sync.version;
					s.eVar11 = s.eVar11 + ':' + _da.sync.version;
					s.prop11 = s.prop11 + ':' + _da.sync.version;
				}
			}
			if (typeof _da.prefix !== 'undefined') {	//set for prefix
				s.pageName = _da.prefix  + ':' + s.pageName;
				s.eVar11 = _da.prefix  + ':' + s.eVar11;
				s.prop11 = _da.prefix  + ':' + s.prop11 ;
			}
			if (typeof _da.nameplate !== 'undefined') {	//set for nameplate based templates only
				s.pageName = s.pageName + ':' + _da.nameplate.name;
			}
			
			//add radui ominture tag
			if (typeof _da.radui !== 'undefined'){
				var raduiTag=_da.radui,windowWidth=$(window).width();
				raduiTag=raduiTag.split("|");
				if (windowWidth > 976) {
					//desktop
					s.prop54 =s.eVar54=raduiTag[0]+raduiTag[1];
				} else if (windowWidth < 977 && windowWidth > 767) {
					//tablet
					s.prop54=s.eVar54=raduiTag[0]+raduiTag[2];
				} else if (windowWidth < 768) {
					//smobile
					s.prop54 =s.eVar54=raduiTag[0]+raduiTag[3];
				}
			}

		},
		
		setRegion: function() {
			if (typeof _da.region !== 'undefined') {
				s.prop2 = s.eVar2 = _da.region;
			} else {
				s.prop2 = s.eVar2 = undefined;
			}
		},
		
		trackDerivativeDetails: function() {
			//v18	"Body Model,Trim"
			//v19	"Ext:Int Color Code"
			//v20	Accessories Picked
			//v21	Veh. Options Picked	
			//v23	"Option	Pkgs Picked"
			//v24	"Engine: Trans"
			//v25 	Price
			s.eVar18 = s.eVar19 = s.eVar20 = s.eVar21 = s.eVar23 = s.eVar24 = s.eVar25 = undefined;
			if (typeof _da.der  !== 'undefined') {
				if (typeof _da.der.name !== 'undefined') {
					s.eVar18 = _da.der.name;
				} 
				if (typeof _da.der.colour !== 'undefined' && typeof _da.der.trim !== 'undefined') {
					s.eVar19 = _da.der.colour + ':' + _da.der.trim;
				} 
				if (typeof _da.der.features !== 'undefined') {
					s.eVar20 = _da.der.features;
				}
				if (typeof _da.der.options !== 'undefined') {
					s.eVar21 = _da.der.options;
				}
				if (typeof _da.der.optionpacks !== 'undefined') {
					s.eVar23 = _da.der.optionpacks;
				} 
				if (typeof _da.der.engine  !== 'undefined') {
					s.eVar24 = _da.der.engine;
				}
				if (typeof _da.der.price   !== 'undefined') {
					s.eVar25 = _da.der.price;
				}
			} 
		},
		
		trackLink: function( params ) {
			if (params === undefined) {
				return;
			}
			//need to also set channel here...there is a case in
			//build and price where pre collection is not called yet.
			s.channel = _da.funnel.name;
			s.eVar4 = s.prop4 = _da.om.lang;	//language
			s.eVar14 = s.prop14 = _da.om.client;	//client
			s.eVar15 = s.prop15 = _da.om.site;	//site	
			//set the media value undefined
			s.prop57 = s.eVar57 = undefined; 
			s.prop55 = s.eVar55 = undefined;
			//fix end
			s.linkTrackVars=_da.om.linkTrackVars;
			s.linkTrackEvents=_da.om.linkTrackEvents;
			if (_da.nameplate && _da.nameplate.name && params.nameplate === undefined) {
				params.nameplate = _da.nameplate.name;
			}	
			//track pagename
			if (typeof params.pname !== 'undefined') {
				omniture.createPageName(params.pname);
			} else {
				omniture.createPageName();
			}
			
			//set h1 based on data-hier attribute
			if (typeof params.hier1 !== 'undefined' && params.hier1 !== '') {
				omniture.createHier1(params.hier1);
			} else {
				omniture.createHier1(_da.hier);
			}
			
			if (params.intcmp){
				s.eVar13 = s.prop13 = params.intcmp;
			}else  {
				//?????	
			}			
			
			s.prop5 = params.onclicks;
			s.prop18 = params.leadtype;
			s.prop48 = s.eVar48 = params.tool;
			s.prop49 = s.eVar49 = params.tooldesc;
			
			if (typeof _da.deviceType !== 'undefined') {
                s.eVar54 = _da.deviceType;
            }
			
			s.events = params.events;
			if (params.year || typeof _da.nameplate !=="undefined") {
				if(params.year){
					s.prop12 = s.eVar12 = params.year;
				}
				if(typeof _da.nameplate !=="undefined" && !params.year){
					s.prop12 = s.eVar12 =_da.nameplate.year;
				}
			}else{
				s.prop12 = s.eVar12 = undefined;
			}
			if (params.nameplate && params.nameplate !== 'none') {
				s.prop16 = s.eVar16 = params.nameplate;
				params.title = params.titleNameplate == 'none' ? params.title : params.title + ':' + params.nameplate;
				omniture.trackDerivativeDetails();
			}else{
				s.prop16 = s.eVar16 = undefined;
			}
			
			if (params.content) {
				s.prop56 = s.eVar56 = params.content;
				if(s.prop5=="video start" || s.prop5=="video finish"|| s.prop5=="video complete"){
					
					s.prop5 = s.prop5;
					
				}else{
					
					s.prop5 = s.prop5 + ':' + params.content;
				}
				
			} else {
				s.prop56 = s.eVar56 = undefined;
			}
			omniture.setRegion();
			//add a nameplate to the link, if defined in context
			//if (_da.nameplate) {
			//	params.title += (':' + _da.nameplate.name);
			//}
	//		_.debounce( function() {
			// add freq param

			// Turn on for parameter debugging and a tree-list of the data
			//console.log("Tracking link parameters: ");
			//console.dir(params);
			
			//gux module type
			if (typeof params.moduletype !== 'undefined') {
	            s.prop24 = params.moduletype;
	        }else{
	        	s.prop24 = undefined;
	        }
	        //gux c25 module name
	        if (typeof params.modulename !== 'undefined') {
	        	 s.prop25 = params.modulename;
	        }else{
	        	s.prop25 = undefined;
	        }

			//gux c23 click
	        omniture.setModulePage(params.moduleaction);
	        //gux v35/c21
	        omniture.createSearchTag(params);
	        var linkTitle = params.title;
	        if (typeof _da.prefix !== 'undefined' && params.type !=='e') {
	        	linkTitle = _da.prefix + ":"+linkTitle;
	        }
			if(typeof params.freq === 'undefined'){
				s.tl(params.link, params.type, linkTitle);
			}else if (params.freq =="page" && !omniture.pageClicks[linkTitle]){
				s.tl(params.link, params.type, linkTitle);				
				omniture.pageClicks[linkTitle] = linkTitle;
			}else if (params.freq =="category" && (!omniture.pageClicks[params.onclicks] || (params.moduletype && !omniture.moduleTypes[params.moduletype]))){
				s.tl(params.link, params.type, linkTitle);				
				omniture.pageClicks[params.onclicks] = params.onclicks;
				if(params.moduletype) omniture.moduleTypes[params.moduletype] = params.moduletype;
			}
	//		}, 1000);
		},
		trackMedia: function( params ) {
			// begin track video			
			if (params.content) {
				s.prop56 = s.eVar56 = params.content;
			} else {
				s.prop56 = s.eVar56 = undefined;
			}
			if (params.progress && params.content) {
				s.prop57 = s.eVar57 = params.content + ":"+params.progress;
			} else {
				s.prop57 = s.eVar57 = undefined;
			}
			if (params.segment) {
				 s.eVar55 = params.segment;
			} else {
				s.eVar55 = undefined;
			}			
			if (params.content && s.pageName) {
				s.prop55 = params.content +":"+ s.pageName;
			} else {
				s.prop55 = undefined;
			}
			if (params.mediaType) {
				s.pev3 = params.mediaType;
			} else {
				s.pev3 = undefined;
			}
			if (params.linkType) {
				s.pe = params.linkType;
			} else {
				s.pe = undefined;
			}
			if (params.events) {
				s.events = params.events;
			} else {
				s.events = undefined;
			}
			if (params.onclicks) {
                s.prop5 = params.onclicks;
			} else {
			    s.prop5 = undefined;
			} 
			//gux module type
			if (typeof params.moduletype !== 'undefined') {
	            s.prop24 = params.moduletype;
	        }else{
	        	s.prop24 = undefined;
	        }
	        // gux c25 module name
	        if (typeof params.modulename !== 'undefined') {
	        	 s.prop25 = params.modulename;
	        }else{
	        	s.prop25 = undefined;
	        }

			//gux c23 click
	        omniture.setModulePage(params.moduleaction);
			//end  track video
			s.t();
		},
		trackEvent: function( params ) {
			// empty not needed at the current state, left here for
			// compatibility and future extensions reasons
		},
		trackSocial: function( params ) {
			// empty not needed at the current state, left here for
			// compatibility and future extensions reasons
		},			
		trackField: function( params ) {
			// empty not needed at the current state, left here for
			// compatibility and future extensions reasons
		},
		createSearchTag:function(params){
			
			if(typeof params!=='undefined' && params.search=='none'){
				s.eVar22 = s.prop22 = undefined;
				s.eVar35 = s.prop21 = undefined;
			}else {			
				if(typeof _da.searchKeyword !== 'undefined'){
					s.eVar22=s.prop22=_da.searchKeyword;
				}else{
					s.eVar22=s.prop22= undefined;
				}
				if(typeof params!=='undefined' && typeof params.totalresult!=='undefined' && typeof params.resultnumber!=='undefined'){
					s.eVar35= s.prop21 = params.resultnumber+ ':' +params.totalresult;
				}
				else if(typeof _da.totalresult !== 'undefined'){
						if(typeof _da.resultnumber !== 'undefined'){
							s.eVar35=s.prop21=_da.resultnumber+":"+_da.totalresult;
						}else {
							s.eVar35=s.prop21=_da.totalresult;
						}
				}else {
					s.eVar35 = s.prop21 = undefined;
				}
			}
		},
		setModulePage:function(param){
			if (typeof param!== 'undefined' && typeof _da.module!== 'undefined' && typeof _da.module.page!=='undefined' && typeof _da.module.template!=='undefined'){
				moduleAction = param;
				s.prop23 = _da.module.page +":"+ _da.module.template + ":"+moduleAction;	
			}else{
				s.prop23 = undefined;
			}
		},
		preCollection: function( options, params) {
			//set some global stuff
			s.eVar4 = s.prop4 = _da.om.lang;	//language
			s.eVar14 = s.prop14 = _da.om.client;	//client
			s.eVar15 = s.prop15 = _da.om.site;	//site
			s.prop56 = s.eVar56 = undefined;
			
			//track pagename,c11/v11 and hierarchy
			if (typeof params !== 'undefined') {
				omniture.createPageName(params.pname);
				omniture.createHier1(params.hier);
			} else {
				omniture.createPageName(undefined);
				omniture.createHier1(undefined);
			}

			s.channel = _da.funnel.name;
			s.prop39 = s.prop5 = undefined;
			
			if (typeof _da.nameplate !== 'undefined') {	//set for nameplate based templates only
				s.prop16 = s.eVar16 = _da.nameplate.name;
				s.prop12 = s.eVar12 = _da.nameplate.year;
			} else {
				s.prop12 = s.eVar12 = s.prop16 = s.eVar16 = undefined;
				s.prop36 = s.eVar34 = undefined;
			}
			omniture.trackDerivativeDetails();
			
			if (typeof params !== 'undefined' && params.tool !== 'undefined') {
				s.prop48 = s.eVar48 = params.tool;
				if (params.tooldesc !== 'undefined') {
					s.prop49 = s.eVar49 = params.tooldesc;
				}
			} else if (typeof _da.tool !== 'undefined') {
				s.prop48 = s.eVar48 = _da.tool.name;
				if (_da.tool.descriptor) {
					s.prop49 = s.eVar49 = _da.tool.descriptor;
				} else {
					s.prop49 = s.eVar49 = undefined;
				}
			} else {
				s.prop49 = s.eVar49 = s.prop48 = s.eVar48 = undefined;
			}
			
			if (typeof _da.lead !== 'undefined') {
				s.prop18 = s.eVar28 = _da.lead.type;
				if (_da.lead.optins) {
					s.prop20 = _da.lead.optins;
				} else {
					s.prop20 = undefined;
				}
			} else {
				s.prop18 = s.eVar28 = s.prop20 = undefined;
			}
			
			omniture.setRegion();
			
			if (typeof _da.events !== 'undefined') {
				s.events =  "";
				for (var i = 0; i < _da.events.length; i++) {
					if (s.events.length === 0) {
						s.events += _da.events[i];
					} else {
						s.events += ("," + _da.events[i]);
					}
				}
			} else {
				s.events = "";
			}
			//dealer info
			if (typeof _da.dealer !== 'undefined' && typeof _da.dealer.code!== 'undefined') {
                s.prop1 = s.eVar1 = _da.dealer.code;
			} else {
                s.prop1 = s.eVar1 = undefined;
			}
			
			if (typeof _da.user !== 'undefined' && typeof _da.user.loggedin !== 'undefined') {
                s.prop42 = s.eVar42 = _da.user.loggedin;
			} else {
                s.prop42 = s.eVar42 = undefined;
			}
			if (typeof _da.user !== 'undefined' && typeof _da.user.registered !== 'undefined') {
                s.prop45 = s.eVar45 = _da.user.registered;
			} else {
                s.prop45 = s.eVar45 = undefined;
			}
			if (typeof _da.onclicks !== 'undefined') {
                s.prop5 = _da.onclicks;
			} else {
			    s.prop5 = undefined;
			} 
			omniture.createSearchTag();
			//gux c23
			var moduleAction ="impress"
			omniture.setModulePage(moduleAction);
		}

	};

})();


/*
 * analytics.js
 * Author:gbaker 11/05/2011 
 *
 * #Exported API methods
 * ND.analytics.create				//Function to create Analytics Wrapper Implementation
 * ND.analytics.register			//Function to register Analytics Wrapper Implementation
 */
  
 var ND = (function(module, $) {
 
	var implementation = {},
		registrations = [];
	
	/*
	 * Omniture wrapper implementation (defined in analytics-omniture-impl.js)
	 */
	implementation.omniture = ND.omniture;
	
	
	//TODO Add fps implementation here (defined in fps-omniture-impl.js)
	implementation.fps = ND.fps;
	
	
	/*
	 * Webtrends Wrapper Implementation
	 */
	implementation.webtrends = (function(){
		
		function _dcsMultiTrack( _tag, arr ) {
			arr = arr || [];
			/*Need we clear all the cached parameters before tracking?*/
			//_tag.dcsCleanUp();
			_tag.dcsMultiTrack.apply( _tag , arr );
		}
		
		/* Helpers */
		var helpers = {
			
			// Looper
			each: function( help, arr, params) {
				$.each( help.split(','), function( i, item ) {
					helpers[item].apply( this, [arr, params] )
				});	
			},
			
			//Individuals
			title: function( arr, params ) {
				if( params && 'title' in params ) {
					$.merge( arr, ["WT.ti", params.title]);
				}			
			},
            funnel: function( arr, params ){
                if( params && 'funnel' in params) {
                    $.merge( arr, ["WT.si_n", params.funnel] );
                }
            },
            step: function( arr, params ){
                if( params && 'step' in params) {
                    $.merge( arr, ["WT.si_p", params.step] );
                }
            },
			event: function( arr ) {
				$.merge( arr, ["WT.dl", "99"]);
			},
			link: function( arr ) {
				$.merge( arr, ["WT.dl", "0"]);
			},	
			share: function( arr, params ) {
				if( params && 'socialId' in params ) {
					$.merge( arr, ["WT.z_share", params.socialId]);
				}
			},	
			uri: function ( arr, params ) {
				if( params && 'uri' in params ) {
					$.merge( arr, ["DCS.dcsuri", params.uri]);
				}
			},
			field: function( arr, params ) {
				if( params && 'field' in params) {
					var field = params.field;
					if(field.name){
						$.merge( arr, ["DCSext." + params.field.name, params.field.value || "" ]);
					}else if(field.constructor == Array){
						var r = [];
						for(var idx = field.length; --idx > -1 ; ){
							field[idx].name
								&& r.push("DCSext." + field[idx].name, field[idx].value || "");
						}
						$.merge( arr, r);
					}
				}
			},
			meta: function( a, b ) {
				return $(['<meta name="', a, '" content="', b, '"/>'].join(""));
			}
		}
			
		return {
			/*
			 * Constructor
			 */
			_init: function( _tag ) {
				this._tag = _tag;
			},
			
			/*
			 * Track Page Views. 
			 */			
			trackPageView: function( params ) {
				var arr = [];
				helpers.each( "title,uri", arr, params);					
				_dcsMultiTrack( this._tag, arr );
			},
			trackLink: function( params ) {
				var arr = [];
				helpers.each( "title,uri,link", arr, params);					
				_dcsMultiTrack( this._tag, arr );
			},
			trackEvent: function( params ) {
				var arr = [];
				helpers.each( "event,title,uri", arr, params);					
				_dcsMultiTrack( this._tag, arr );		
			},
			trackSocial: function( params ) {
				var arr = [];
				helpers.each( "event,title,uri,share", arr, params);					
				_dcsMultiTrack( this._tag, arr );
			},			
			trackField: function( params ) {
				var arr = [];
				helpers.each( "event,field,funnel,step", arr, params);					
				_dcsMultiTrack( this._tag, arr );
			},			
			/*
			 *  Before default tracking is triggered.
			 *
			 *	Function to handle when the form builder is on the page.
			 *  This function will be executed right before the Webtrends default tracking function
			 *  This gives ample time to prepare any special Meta Data require for this formpage.
			 *
			 *  Function will inject <meta> tags for WT.
			 */
			preCollection: function( options ) {
				var funnel = options.funnel || false,
					meta = $('meta:last');
				
				if( funnel && funnel.name ) {
					 meta.after( helpers.meta("WT.si_n", funnel.name ) );
				}
				if( funnel && funnel.stepname ) {
					 meta.after( helpers.meta("WT.si_p", funnel.stepname ) );
				}
				
			}
			
		};
	}());
		
	
	
	/*
	 * Exports 
	 */
	module.analytics = {

		/*
		 * Create instance of webtrends wrapper
		 */
		create: function( name, engine ) {
		
			function TrackerClass() {};
			TrackerClass.prototype = implementation[name];
			var tracker = new  TrackerClass();
		
			//var tracker = Object.create( implementation[name] )
			
			tracker._init( engine );
			delete tracker._init;
			tracker.name = name;
			return tracker;
		}, 
		
		/*
		 * Register the PUBSUB channel handlers 
		 * 
		 * PASTE this code into console if you want to see that is going on
		 *  	$.each( 'page,event,link,social'.split(',') , function( i, item ) {
		 * 			$.subscribe('/analytics/'+item+'/', function(e, data) { console.log( e.type, data ) });
		 *		})
		 */
		register: function( tracker ) {
			if( !tracker ) { return; }
			
			//check if this tracker is already registered
			for (i = 0; i < registrations.length; i++) {
				if (tracker.name === registrations[i].name) {
					//console.log("Tracker ["+registrations[i].name+"] already registered.")
					return;
				}
			}
			
			
			//TODO... use rules... 
			// -- remove track and lowercase
			var mapping =  {
				"pageview": "trackPageView",
				"link": "trackLink",
				"social": "trackSocial",
				"event": "trackEvent",
				"field": "trackField",
				"media":"trackMedia"
			}
			
			$.each( mapping, function(channel, funcName) {
				if( funcName in tracker ) {
					$.subscribe( "/analytics/" + channel + "/", (function( tracker, fn ) {
						return function( event, data ) {
							fn.apply( tracker, [data] );
						}
					})(tracker, tracker[funcName]) );
				}
			});
			
			registrations.push( tracker );
		},
		
		/*
		 *  Return a Helper function for grabbing content out of the DOM and using it in tracking.
		 */
		grabber: function() {
			
			function urlise( str ) {
				str = (str || "").toLowerCase()
					.replace(/[\s'"!@#$%\^\&\*\(\),\.<>;:\[\]{}?+/\\-_=]/g, "-")
					.replace(/(-){2,}/g, "-")
					.replace(/^-|-$/g, "");
					
				return str;
			}
			
			//Helper function
			return function( options ) {
				
				var elem, value, url, best;
				
				if( options.link ) {
					elem = $( options.link );			
					value = elem.attr("data-tracking-value") || elem.attr("title") || elem.text() || "",
					url = urlise( value );
				}
				
				if( options.meta ) {
					elem = $( options.meta );		
					value = elem.attr("content") || "",
					url = urlise( value );
				}
				
				if( options.inner ) {
					elem = $( options.inner );		
					value = elem.text() || "",
					url = urlise( value );
				}
				
				if( options.name ) {
					value = options.name,
					url = urlise( options.name );
				}

				return {
					value: value,
					url: url
				}
				
			}
			
		}
	}

	
	return module;
 
 }(window.ND || {}, jQuery));


/*
 * A place for Tracking code when there is no other.
 */
var ND = (function(module, $, window, document) {
	
	trackWebtrendFields = function() {
		/*
         * Tracking that implement by DOM ready.
         */
        var _da = window._da;
        if(_da === undefined) {
        	return;
        }
        var trackFields = _da.trackFields;
        if(trackFields !== undefined){
            var fields = [], key;
            for(key in trackFields){
                fields.push({
                    name: key,
                    value: trackFields[key]
                });
            }

            $.publish('/analytics/field/', { field : fields });
        }
	}	
	
	module.analyticsBinder = {
			
		/*
		 * Create instance of webtrends wrapper
		 */
		bind: function() {
			$(document).ready(function(){
				
				// Localise a grabber function. Grabber function helps with content values and urls
				var grabber = ND.analytics.grabber();
				
				/*
				 * <meta name="dfy.title" content="Focus" />
				 */
				master = grabber( { meta: "meta[name='dfy.title']" } );
			
				/*
				 * Social Links
				 */
				$('.socialmedia-wrapper').delegate('.socialmedia a', 'click', function(e){
				
					var link = grabber( { link: this } ),
						data = { 
							title: 'Follow ' + master.value + ' on ' + link.value,
							uri: '/follow/' +  link.url
						};
						
					$.publish('/analytics/social/', data);
					
				});
	
				
				/*
				 * When an Overlay opens.. 
				 * It is not based on the <A> tag because overlays are a complex beast.
				 * It's based on the overlay itself regardless of what trigger the event that opened it.
				 * See Unit Tests for example variations
				 */
				$.subscribe( "overlay.done", function( e, eventData ){
					var heading, link, name, data = {}, 
						blind = true,
						excludeClass = ".country-overlay"; //exclude select country overlay.
	
					if( eventData && eventData.contents && $(excludeClass, eventData.contents).size() < 1) {
	
						//Grab content
						heading = eventData.contents ? grabber( { link: eventData.contents.find(".head h1") } ) : {};
						link = grabber( { link: eventData.anchor } )
						name = grabber( { name: eventData.name } )
						
						//If no values are usable, then we are Blind tracking this overlay
						blind = !heading.value && !link.value && !name.value && !eventData.assetid;
						
						data = { 
							title: master.value + ' | ' + (name.value || heading.value || link.value || eventData.assetid),
							uri: '/' + master.url + '/overlay/' +  (name.url || heading.url || link.url || eventData.assetid)
						};
	
						if ( blind ) {
							data = { 
								title: master.value + ' | Overlay',
								uri: '/' + master.url + '/overlay'
							};
						}
						
						$.publish('/analytics/event/', data);
					
					}
				}); 
	
				/* 
				 * TBD: RSS
				 */
				$(".rss").delegate("a", "click", function(e){
					var link = grabber( { link: this } ),
						data = { 
							title: 'RSS',
							uri: link.url
						};
	
					$.publish('/analytics/event/', data);
				});
	
				/* 
				 * AddThis: 
				 * When click on AddThis link
				 * The add this layout is insert to body by script.
				 * Create a delegate event on document.
				 */
				$(document).delegate(".at_item", "click", function(e){
					var link = grabber( { link: this } ),
						data = { 
							title: ' Send to ' + link.value,
							uri: '/share/' + link.url,
							socialId: link.value
						};
	
					$.publish('/analytics/social/', data);
	
				});
	
				/*
				 * AddThis China
				 */
				$(document).delegate(".addlist a", "click", function(e){
					var link = grabber( { link: this } ),
						data = { 
							title: ' Send to ' + link.value,
							uri: '/share/' + link.url,
							socialId: link.value
						};
	
					$.publish('/analytics/social/', data);
	
				});
	
				/* 
				 * TBD: Like button 
				 */
				/*
				$(".fb-like").mouseover(function(e){
					var target = e.target; 
					if(e.tagName == "IFRAME"){
						
					}
				})
				*/;
	
				/*
				 * TBD: Google Plus Button
				 */
				/*
				$(".addthis_button_google_plusone").mouseover(function(e){
					var target = e.target; 
					if(e.tagName == "IFRAME"){
						
					}
				});
				*/
	
				/*
				 * TBD: Form Field Drop Off
				 */
				$('#dragonflyform').delegate('.ff-track-drop-off', 'focusout', function(e) {
	
					var field = $(this),
						data = {
							field: {
								name: field.attr('name') || this.id,
								value: field.val()
							}
						};
	
					//TBD: "parameters about the prefix "DCSext.xxx"
					$.publish('/analytics/field/', data);
				});
	
				/*
				 * VOI
				 */
				$('#dragonflyform').submit(function(e){
					var $model = $("#VOI_ModelSeries_Model", form);
					var $services = $("#VOI_ModelSeries_Series", form);
	
					if(!$model.size() && !$services.size()){
						return;
					}
	
					var form = $(this),
						data = {
							field: [
								{
									name: "model",
									value: $model.val()
								},
								{
									name: "series",
									value: $services.val()
								}
							]
						};
	
					$.publish('/analytics/field/', data);
				});
	
				/*
				 * View 360 Button: 2.8.1
				 */ 
				$('.view360-button a').click(function(e){
					
					var link = grabber( { link: this } ),			
						data = { 
							title: master.value + ' | ' + link.value,
							uri: '/' + master.url + '/360-view'
						};
						
					$.publish('/analytics/event/', data);
					
				});
	
				/* 
				 * Switch(Flash): 2.8.2
				 * */ 
				$("#car-swapper a").click(function(e){
					var link = grabber( { link: this } ),
						data = { 
							title: master.value + ' | ' + link.value,
							uri: '/' + master.url + '/switch-to-super-cab'
						};
	
					$.publish('/analytics/event/', data);
				});
	
				/*
				 * Switcher(banner): 2.8.3
				 */
				$('.slider .next, .slider .prev').click(function(e){
	
					var link = grabber( { link: this } ),
						data = { 
							title: master.value + ' | ' + link.value,
							uri: '/' + master.url + '/switch-to-banner'
						};
	
					$.publish('/analytics/event/', data);
				});
				
				/*
				 */ 
				$('.download').click(function(e){
					data = { 
						title: 'this is my link',
						link: this,
						type: 'd'
					};
	
					$.publish('/analytics/link/', data);			
				});
				/*$wait(function(){
					$(".trackable,.external-disclaimer").live({mouseover:function(e){},mousedown:function(){alert("live-mousedown")}});
					//$(".trackable,.external-disclaimer").on('click',function(e){alert('on')});
				})*/
				
				//$('.trackable,.external-disclaimer').click(function(e){
				//$(document).delegate(".trackable,.external-disclaimer","click",function(e){
				//$(document).on("click",'.trackable,.external-disclaimer',function(e){
				$(".trackable,.external-disclaimer").live('mouseup',function(e){
					if($('.staging-wrap .trackable').size()>0){
						return;
					}
					//if(!e.target||!e.target.id||!e.target.tagName||e.target.tagName!='SELECT'||(e.target.id!='state'&&e.target.id!='city')) e.preventDefault();
					//if(!e.target||!e.target.tagName||e.target.tagName!='OPTION'||!e.target.parentElement||!e.target.parentElement.id||(e.target.parentElement.id!='state'&&e.target.parentElement.id!='city'))
					if(!e.target||!e.target.tagName||e.target.tagName!='OPTION'||!e.target.parentElement||!e.target.parentElement.tagName||e.target.parentElement.tagName!='SELECT')
					{
					e.preventDefault();
					}
					if(!$(this).hasClass("overlay")&&!$(this).closest("ul").hasClass("gallery")&&!$(this).hasClass("service-booking-overlay")&&!$(this).hasClass("open-video-flip") && !$(this).hasClass("collapse-btn")&&!$(this).hasClass("save-dealer-btn")&&!$(this).hasClass("bing-directions")&&!$(this).hasClass("filter-toggler")&&!$(this).hasClass("viewSaved")&&!$(this).hasClass("accordion-next")&&!$(this).hasClass("open-vid")&&!$(this).hasClass("open-modal")&&!$(this).hasClass("save-continue")&&!$(this).hasClass("pdf-btn")&&!$(this).hasClass("finish-btn")&&!$(this).hasClass("tab-area")&&!$(this).closest(".predelivery-new")){
						$(this).trigger('click');
					}
					var $link = $(this);
					var img, name, type, onclick, trigger = false, nameplate, leadtype, tool, events, year, pname,intcmp,hier,tooldesc,content,freq,moduletype,modulename,moduleaction;
					//link has omniture tracking data, capture the data and publish to pubsub
					if ((name = $link.attr('data-name')) && 
						(type = $link.attr('data-type'))) {
						onclick = $link.attr("data-onclicks");
						nameplate = $link.attr("data-nameplate");
						year = $link.attr("data-nameplate-year");
						leadtype = $link.attr("data-leadtype");
						tool = $link.attr("data-tool");
						tooldesc = $link.attr("data-tooldesc");
						events = $link.attr("data-events");
						pname = $link.attr("data-pname");
						intcmp = $link.attr("data-intcmp");
						hier = $link.attr("data-hier"); 
						content = $link.attr("data-content"); 
						freq = $link.attr("data-freq"); 
						moduletype = $link.attr("data-moduletype");
						modulename = $link.attr("data-modulename");
						
					} 
					//look for images inside the link, if the img has any omniture tracking data, publish to pubsub
					else if ((img = $link.find('img').first()) &&
								(name = img.attr('data-name')) && 
								(type = img.attr('data-type'))){
						onclick = img.attr("data-onclicks");
						nameplate = img.attr("data-nameplate");
						year = img.attr("data-nameplate-year");
						leadtype = img.attr("data-leadtype");
						tool = img.attr("data-tool");
						tooldesc = img.attr("data-tooldesc");
						events = img.attr("data-events");
						pname = img.attr("data-pname");
						intcmp = img.attr("data-intcmp");
						hier = img.attr("data-hier"); 
						content = img.attr("data-content"); 
						freq = img.attr("data-freq"); 
						moduletype = $link.attr("data-moduletype");
						modulename = $link.attr("data-modulename");
						
					}
					
					//check the type
					if ($link.hasClass('external-disclaimer')) { type = 'e'};
					//if name not set by data-name attribute, get the link name
					if (!name) {
						var link = grabber( { link: this } )
						name = link.value;
					}
					//check personalisation click
					if (!($(this).hasClass("open-video-flip")) && ($link.closest("section").hasClass('personalisation') || $link.closest("section").hasClass('smartnextsteps'))){						
						moduleaction = 'click';
					}
					//gux Popular Accessories /Get to Know Your Vehicles			
					if ($link.closest("section").data('psn-module')=='knowvehicle' || $link.closest("section").data('psn-module')=='accessories'){						
						if(typeof $.cookie('dfy.u') !== "undefined" && typeof $.cookie('dfy.u') !== "function") {
							cookieUser = JSON.parse($.cookie('dfy.u'));
						}
						if (cookieUser != null) {
							modulename = cookieUser.now;
						 }
					}
					
					//moduleaction
					$.publish('/analytics/link/', { 
						title: name,
						link: this,
						type: type,
						onclicks: onclick,
						leadtype: leadtype,
						tool: tool,
						tooldesc: tooldesc,
						events: events,
						year: year,
						nameplate: nameplate,
						pname: pname,
						intcmp: intcmp,
						hier1:hier,
						content:content,
						freq:freq,
						moduletype:moduletype,
					    modulename:modulename,
					    moduleaction:moduleaction
					});	
				
				});
				
				// add omniture on gux billboard next/prev,billboard bullet
				$(".billboard  .flex-next,.billboard .flex-prev,.billboard .flex-control-paging a").live("click",function(e){					
					var $link = $(this);
					if(typeof _da!=="undefined" && _da.om.mobileApp==true &&($(this).hasClass("flex-prev")||$(this).hasClass("flex-next"))) return;
					var name,onclicks,modulename,moduletype;
					var $section = $link.closest("section");
					name = $section.data('name');
					onclicks = $section.data('onclicks');
					modulename = $section.data('modulename');
					moduletype = $section.data('moduletype');
					//moduleaction
					$.publish('/analytics/link/', { 
						title: name,
						link: this,
						type: "o",
						onclicks: onclicks,
						moduletype: modulename,
					    modulename: moduletype,
					    moduleaction:"click"
					});	
				});				
				//gux dealer omniture
				$(".view-all-dealers",$("section.dealer-locator")).live("mouseup",function(e){
					e.preventDefault();
					$(this).trigger('click');
					if (window._da && window._da.om && ND && ND.omniture) {
						_da.funnel.stepname='results';
						_da.events = "event1,event43".split(',');	
						_da.dealer = {};
					}
				});
				
				$.subscribe('dealers-done', (function(){
					if (window._da && window._da.om && ND && ND.omniture) {
						_da.funnel.stepname='results';
						_da.events = "event1,event43".split(',');	
						_da.dealer = {};						
						var totalNum = $('.dealer-result-container .count .num').text();
						if(totalNum){
							var totalResult = Number(totalNum);
							var perPage = 5;
							var totalPage = Math.floor((totalResult + perPage - 1 ) / perPage);
							var postcode = $('.dealer-result-container .result-list .dealer-result:first-child').data("postcode");
							_da.region = postcode;
							ND.analyticsTag.trackOmniturePage({
								tool:'event:find dealer',
								tooldesc:'find dealer:1 of '+totalPage
							});	
						}
						//only track once
						$.unsubscribe('dealers-done');
					}
				}));
				
				$("section.dealer-locator .dealer-result .dealer-heading a,section.dealer-locator .dealer-result .details").live("click",function(e){					
					var dealerId = $(this).closest(".dealer-result").data("dealerid");
					var postcode = $(this).closest(".dealer-result").data("postcode");
					if (window._da && window._da.om && ND && ND.omniture) {
						_da.funnel.stepname='dealer:info';
						_da.events = '';
						_da.dealer = {code:dealerId};
						_da.region = postcode;
						ND.analyticsTag.trackOmniturePage();
					}
				});
				//add ominture on per 360 movement
				$("#overlay .vr-container .360trackable").live("slide",function(e){
					if($('.staging-wrap .trackable').size()>0){
						return;
					}
					e.preventDefault();
					$(this).trigger('click');
					var $link = $(this);
					var img, name, type, onclick, trigger = false, nameplate, leadtype, tool, events, year, pname,intcmp,hier,tooldesc,content,freq;
					//link has omniture tracking data, capture the data and publish to pubsub
					if ((name = $link.attr('data-name')) && 
						(type = $link.attr('data-type'))) {
						onclick = $link.attr("data-onclicks");
						nameplate = $link.attr("data-nameplate");
						year = $link.attr("data-nameplate-year");
						leadtype = $link.attr("data-leadtype");
						tool = $link.attr("data-tool");
						tooldesc = $link.attr("data-tooldesc");
						events = $link.attr("data-events");
						pname = $link.attr("data-pname");
						intcmp = $link.attr("data-intcmp");
						hier = $link.attr("data-hier"); 
						content = $link.attr("data-content"); 
						freq = $link.attr("data-freq"); 
						
					} 
					//look for images inside the link, if the img has any omniture tracking data, publish to pubsub
					else if ((img = $link.find('img').first()) &&
								(name = img.attr('data-name')) && 
								(type = img.attr('data-type'))){
						onclick = img.attr("data-onclicks");
						nameplate = img.attr("data-nameplate");
						year = img.attr("data-nameplate-year");
						leadtype = img.attr("data-leadtype");
						tool = img.attr("data-tool");
						tooldesc = img.attr("data-tooldesc");
						events = img.attr("data-events");
						pname = img.attr("data-pname");
						intcmp = img.attr("data-intcmp");
						hier = img.attr("data-hier"); 
						content = img.attr("data-content"); 
						freq = img.attr("data-freq");
					}
					
					//check the type
					if ($link.hasClass('external-disclaimer')) { type = 'e'};
					//if name not set by data-name attribute, get the link name
					if (!name) {
						var link = grabber( { link: this } )
						name = link.value;
					}
					$.publish('/analytics/link/', { 
						title: name,
						link: this,
						type: type,
						onclicks: onclick,
						leadtype: leadtype,
						tool: tool,
						tooldesc: tooldesc,
						events: events,
						year: year,
						nameplate: nameplate,
						pname: pname,
						intcmp: intcmp,
						hier1:hier,
						content:content,
						freq:freq
					});
					$("#overlay .vr-container .360trackable").die("slide");//only need to trigger once
				})
				
				// predelivery phase 3 personalisation omniture
				var personalisationTrack = function(){
					var $panel = $(this).closest(".panel");
					var name,onclicks,pname;
					name = $panel.data('name');
					onclicks = $panel.data('onclicks');
					pname = $panel.data('pname');
					
					$.publish('/analytics/link/', { 
						title: name,
						link: this,
						type: "o",
						onclicks: onclicks,
					    pname: pname,
					    moduleaction:"click",
					    freq: "category"
					});	
				}
				
				$(".predelivery-new .last-step .panel").on("click","input,select,textarea", personalisationTrack);		
				
				//This solution should fire the ambient lighting omniture. This bypasses the return false that is triggered by the color link event listener
				$(".predelivery-new .last-step .color-palette a").on("click", personalisationTrack);		
				
				/* for B515 experience tracking */
				$('.staging-wrap .trackable, .staging-wrap .external-disclaimer').live("click",function(e){
					var $link = $(this);
					var img, name, type, onclick, trigger = false, nameplate, leadtype, tool, events, year, pname,intcmp,hier,tooldesc;
					//link has omniture tracking data, capture the data and publish to pubsub
					if ((name = $link.attr('data-name')) && 
						(type = $link.attr('data-type'))) {
						onclick = $link.attr("data-onclicks");
						nameplate = $link.attr("data-nameplate");
						year = $link.attr("data-nameplate-year");
						leadtype = $link.attr("data-leadtype");
						tool = $link.attr("data-tool");
						tooldesc = $link.attr("data-tooldesc");
						events = $link.attr("data-events");
						pname = $link.attr("data-pname");
						intcmp = $link.attr("data-intcmp");
						hier = $link.attr("data-hier"); 
					} 
					//look for images inside the link, if the img has any omniture tracking data, publish to pubsub
					else if ((img = $link.find('img').first()) &&
								(name = img.attr('data-name')) && 
								(type = img.attr('data-type'))){
						onclick = img.attr("data-onclicks");
						nameplate = img.attr("data-nameplate");
						year = img.attr("data-nameplate-year");
						leadtype = img.attr("data-leadtype");
						tool = img.attr("data-tool");
						tooldesc = img.attr("data-tooldesc");
						events = img.attr("data-events");
						pname = img.attr("data-pname");
						intcmp = img.attr("data-intcmp");
						hier = $link.attr("data-hier"); 
					}
					
					//check the type
					if ($link.hasClass('external-disclaimer')) { type = 'e'};
					//if name not set by data-name attribute, get the link name
					if (!name) {
						var link = grabber( { link: this } )
						name = link.value;
					}
					$.publish('/analytics/link/', { 
						title: name,
						link: this,
						type: type,
						onclicks: onclick,
						leadtype: leadtype,
						tool: tool,
						tooldesc: tooldesc,
						events: events,
						year: year,
						nameplate: nameplate,
						pname: pname,
						intcmp: intcmp,
						hier1:hier
					});	
					
				});
	
		        /*
		         * Email tracking: Email Link Tracking Handler
		         * Attach an event (on click) to all emailto links. [ Design P12 ]
		        */
		        var mailHandler = function(e){
		            var anchorHref = e.target.href || '';
		                anchorFormat = anchorHref.toLowerCase();
	
		            if(anchorHref && anchorFormat.indexOf("mailto:") > -1){
		                anchorFormat = anchorFormat.replace(/[^\w]+/g, '-');
		                var data = { 
		                        title: anchorHref + ' | Email',
		                        uri: '/' + master.url + '/email/' + anchorFormat
		                    };
	
		                $.publish('/analytics/event/', data);
		            }
		        };
	
		        /*
		         * External dealer website tracking:
		         * Attach an event to all external links(click out). [ Design P12 ]
		        */
		        var externalHandler = function(e){
		            var anchor = e.target, anchorClass = anchor.className;
	
		            //There will be 2 case: 1) It's in the external-disclaimer overlay. 2) It's an external link whout popup overlay
		            if(anchorClass && typeof(anchorClass)==="string" &&
		                (anchorClass.indexOf("external") > -1 || anchorClass.indexOf("external-disclaimer ") > -1)){
	
		                var href = $(anchor).attr("href"),
		                	hrefFormat ="";
		                if(typeof(href)!="undefined"){
		                	hrefFormat = href.replace(/[^\w]+/g, '-');
		                }
		                var data = {
		                        title: "Offsite:" + href,
		                        uri: '/' + master.url + '/external/' + hrefFormat
		                    };
	
		                $.publish('/analytics/event/', data);
		            }
		        };
	
		        //Handles all Omniture tracking links in an overlay
		        var trackingHandler = function(e) {
		        	var anchor = e.target, anchorClass = anchor.className;
	
		            //fullscreen button
					 if(anchorClass && typeof(anchorClass)==="string" && anchorClass.indexOf("btn-fullscreen") > -1) {
		            	//gallery view full screen button
		        		var linkName = s.eVar11 + ':full screen' //link name from a page name
		        		$.publish('/analytics/link/', { 
		        			title: linkName,
		        			link: this,
		        			type: 'o',
		        			onclicks: 'view full screen'
		        		});		
		        	}
		        }
		        
		        if ((_da.nameplate !== undefined && _da.nameplate.id !== undefined) || 
		        	(_da.derivative !== undefined && _da.derivative.id !== undefined)) {
		        	//delegate to context
		        	ND.Context.addContextToLinks();
		        } 
		        	
	
		        /*
		         * Global Click Tracking Listener
		         * One event listener intead of binding on every link, 
		         * In order to let it work on dynamic anchors that injected by Javascript.
		         */
		        $(document).bind("click", "a", function(e){
		        	//some listener may prevent/cancel the event listener.
		            if(e && e.target){
		                externalHandler(e);
		                mailHandler(e);
		                trackingHandler(e);
		            }
		        });
		        
		        trackWebtrendFields();
		        
			})
		}			
	}
	
	return module;
	
	
}(window.ND || {}, jQuery, window, document));



/*
		<!-- Configuration, must come from site wide configuration -->
		<script type="text/javascript">
		var _da = {}, _tag = _da.wt = {};
		// Web Trends ID, same ID for whole publication.
		_tag.dcsid="dcs3e9phnudz5bdfu8tzlamfrh_8n7o";
		// The hostname of the website.. Notice the DOT..  -> ".ford.com.au"
		_tag.fpcdom=".hostnamegoeshere.com";
		// The Time Zone
		_tag.timezone=10;
		</script>
*/

 (function(globals, $){

  /**
   * Private functions
   */
	var _isAnalyticsConfigured = function() {
		// Minimum variables required
		if( !globals._da ||
			!globals.ND ||
			!globals.ND.analytics ) {
			return false;
		}
		return true;
	};
	
	var _isWebTrendsConfigured = function() {
		if( globals._tag && 
				globals._da.wt && 
				globals._tag === globals._da.wt &&
				globals.WebTrends ) {
			return true;
		}
		return false;
	};
	
	/**
	 * Do not track single page applications(such as build and price)/mobile applications.The flag is set 
	 * in the view of the single page application.
	 */
	var _isNonSpecialWebAppOmnitureConfigured = function() {
		if(globals._da.om && 
		  (typeof globals._da.om.singlePageApp === 'undefined' || 
		   globals._da.om.singlePageApp === false) &&
		   (globals._da.om.mobileApp === undefined ||
		   globals._da.om.mobileApp === false)) {
			return true;
		}
		return false;
	};
	
	/**
	 * Tracks single page applications only as they need to set omniture variables manually (such as build and price).
	 * The flag is set in the view of the single page application.
	 */
	var _isSinglePageAppOmnitureConfigured = function() {
		if(!_isAnalyticsConfigured()) {
			return false;
		}
		if(globals._da.om && 
		   globals._da.om.singlePageApp === true) {
			return true;
		}
		return false;
	};
	
	/**
	 * Tracks mobile applications using jquery mobile.
	 * The flag is set in the view of the mobile application.
	 */
	var _isMobileAppOmnitureConfigured = function() {
		if(!_isAnalyticsConfigured()) {
			return false;
		}
		if(globals._da.om && 
		   globals._da.om.mobileApp === true) {
			return true;
		}
		return false;
	};
	
	

	//
	// TODO added new trackFps function here, something along these lines:
	//
	
	//var _trackFps = function(_tag, options, wtTracker, params) {
	var _trackFps = function(params) {
		

		//TODO not sure about this if - but likely we also need it here 
		if (_da.skipTracking == undefined || globals._da.skipTracking === false) {
			
			//Create Dragonfly FPS Tracking implementation
			var fpsTracker = ND.analytics.create( 'fps', s );
			
			//Register the DFY tracker implementation for custom activities
			ND.analytics.register( fpsTracker );
			
			//TODO Not sure what parameters are needed in these 2 calls ...
			
			//Give dragonfly a chance to inject meta tags dynamically
			fpsTracker.preCollection(_da, params);
			
			//Execute the normal default page load tracking function.
			//fpsTracker.trackPageView( _da, params);
			fpsTracker.trackPageView( params);
		}		
	};
	
	
	
	var _trackWebTrends = function(_tag, options, wtTracker) {
		//Initalise
		_tag = new WebTrends();

		//Extend.. Similiar as $.extend
		$.extend( _tag, options );
		
		//Further Initalise
		_tag.dcsGetId();
		
		//Create Dragonfly Tracking implementation
		wtTracker = ND.analytics.create( 'webtrends', _tag );
		
		//Register the DFY tracker implementation for custom activities
		ND.analytics.register( wtTracker );
		
		//Copy object
		var choice = $.extend( {}, _da );
		delete choice.wt;
	
		//Give dragonfly a chance to inject meta tags dynamically
		wtTracker.preCollection( choice );
		
		//Execute the normal default page load tracking function.			
		_tag.dcsCollect();
		
		//Expose the parameter
		ND.analytics._tag = _tag;
	};
	
	var _trackOmniture = function(params) {
		
		if (_da.skipTracking == undefined || globals._da.skipTracking === false) {
			//Create Dragonfly Tracking implementation
			var omTracker = ND.analytics.create( 'omniture', s );
			
			//Register the DFY tracker implementation for custom activities
			ND.analytics.register( omTracker );
			
			var _counterField = $('.searchresults-list .no-of-results');// for lincoln result page only. need send out the total No of results
			if(_counterField.length>0){
				_da.pname = _da.pname +':' + $.trim(_counterField.html());
			}
			//Give dragonfly a chance to inject meta tags dynamically
			//module page will need profile is ready
			if (typeof _da.module!=='undefined' && typeof _da.module.page!=='undefined' && typeof _da.module.template=='undefined'){
				var cookieUser = null,cookieUUID = null,moduleTemplate=null;
				if($.cookie('dfy.u')) {
					cookieUser = $.parseJSON($.cookie('dfy.u'));
				}
				if($.cookie('dfy.uuid')) {
					cookieUUID = $.parseJSON($.cookie('dfy.uuid'));
				}
				// set values depending on cookie
				if (cookieUser !== null) {
					moduleTemplate = "owner";					
				} else if (cookieUUID === null) {
					moduleTemplate = "new";
				} else if (cookieUUID != null && cookieUser === null) {
					moduleTemplate = "return";
				}				
				if (moduleTemplate!=null){
					_da.module.template = moduleTemplate;
					$("section.personalisation a[href*='intcmp='],section.smartnextsteps a[href*='intcmp='],section.personalisation form[action*='intcmp=']").each(function(idx){
						var attrName="",attrValue="";
						var attrHref = $(this).attr("href");
						var attrAction = $(this).attr("action");
						if(attrHref!= null && typeof attrHref!=='undefined'){
							attrName = "href";
							attrValue = attrHref;
						}else if(attrAction!= null && typeof attrAction!=='undefined'){
							attrName = "action";
							attrValue = attrAction;
						}
						var temp = "STATUS";
						if(attrValue.indexOf(temp)!=-1){	
							$(this).attr(attrName,attrValue.replace(temp,moduleTemplate));
						}	
					});
				}
				omTracker.preCollection( _da, params);
				//Execute the normal default page load tracking function.
				s.t();	
			}else{
				omTracker.preCollection( _da, params);
				//Execute the normal default page load tracking function.
				s.t();
			}
			
		}
	};
	 
	
	var _track = function() {
		// Minimum variables required
		if(!_isAnalyticsConfigured()) {
			return;
		}
	
	
		/* WEBTRENDS ONLY
	     * This if block represnets the integration of Webtrends only
		 */
		if(_isWebTrendsConfigured()) {
				
				//Create the real Tag
			var _tag,
				//The _tag configuration
				options = globals._tag,
				//Other
				wtTracker;
			
			//When the DOM is ready.
			$(document).ready(function() {
				_trackWebTrends(_tag, options, wtTracker);
				ND.analyticsBinder.bind();
			});
	
			
			//Export the _tag into the global space so that it looks like a normal webtrends tag in the DOM inspector
			globals._tag = globals._da.wt = _tag;
			
		}
	
		/* 
		 * The following is an example of how another implementation might work
		 * Google Analytics
		 * /
		if( globals._gaq && 
			globals._da.ga && 
			globals._gaq === globals._da.ga ) {
				
			//Create Dragonfly Tracking implementation
			var gaTracker = ND.analytics.create( 'google', _gaq );
			
			//Register the DFY tracker implementation for custom activities
			ND.analytics.register( gaTracker );
	
			// When the DOM is ready and analytics is ready.
			$(document).ready(function() {
				//Give dragonfly a chance to inject meta tags dynamically
				gaTracker.preCollection( _da );
				
				//Execute the normal default page load tracking function.
				_gaq.push(['_trackPageview']);
			});		
		}
		 */
	
			
		/* 
		 * Omniture implmentation
		 */
		if(_isNonSpecialWebAppOmnitureConfigured()) {
	 
			// When the DOM is ready and analytics is ready.
			$(document).ready(function() {
				if(_isNonSpecialWebAppOmnitureConfigured()) {

					_trackOmniture();
					_trackFps(); // added
					ND.analyticsBinder.bind();
				}
			});
			
			//TODO add similar code for FPS here
			globals._tag_om = globals._da.om;
			
		}  if(_isMobileAppOmnitureConfigured()) {
			
			/* 
			 * Omniture mobile implmentation
			 */
			
			/**
			 * if this method gets called we are on a mobile device that's using jquery mobile
			 */
			$(document).bind("mobileinit", function(){
				$(document).bind('pagechange', function() {
					
					_trackOmniture();
					//TODO wherever we have _trackOmniture() called, we also have to add trackFps();
					_trackFps();
					ND.analyticsBinder.bind();
				});
				//TODO add similar code for FPS here
				globals._tag_om = globals._da.om;
			});
		}
	}
	
	_track();
	
	/**
	 * WARNING: must be called explicitly every time page changes in single page app
	 */
	ND.analyticsTag = ND.analyticsTag || {
		
		trackOmnitureSinglePageApp : function() {
			if(_isSinglePageAppOmnitureConfigured()) {
				_trackOmniture();
				_trackFps(); // added by remjo
				//DO NOT bind more than once (ND.analyticsBinder.bind()), it's called in _setOnce
				//we want to set globals._da.om only once so remove the method after it's set.
				if (ND.analyticsTag._setOnce !== undefined) {
					ND.analyticsTag._setOnce();
					delete ND.analyticsTag._setOnce;
				}
			}
		},

		trackOmniturePage : function(params) {

			_trackOmniture(params);
			_trackFps(params); // added by remjo
		},
		
		_setOnce : function() {
			globals._tag_om = globals._da.om;
			ND.analyticsBinder.bind();
		},
		
		isSinglePageAppOmnitureConfigured: _isSinglePageAppOmnitureConfigured
	};
	
	
	
}(window, jQuery));

// Now that this code is executed  ->  _tag instanceof WebTrends




(function(e,t){"use strict";function n(e){var t=Array.prototype.slice.call(arguments,1);return e.prop?e.prop.apply(e,t):e.attr.apply(e,t)}function s(e,t,n){var s,a;for(s in n)n.hasOwnProperty(s)&&(a=s.replace(/ |$/g,t.eventNamespace),e.bind(a,n[s]))}function a(e,t,n){s(e,n,{focus:function(){t.addClass(n.focusClass)},blur:function(){t.removeClass(n.focusClass),t.removeClass(n.activeClass)},mouseenter:function(){t.addClass(n.hoverClass)},mouseleave:function(){t.removeClass(n.hoverClass),t.removeClass(n.activeClass)},"mousedown touchbegin":function(){e.is(":disabled")||t.addClass(n.activeClass)},"mouseup touchend":function(){t.removeClass(n.activeClass)}})}function i(e,t){e.removeClass(t.hoverClass+" "+t.focusClass+" "+t.activeClass)}function r(e,t,n){n?e.addClass(t):e.removeClass(t)}function l(e,t,n){var s="checked",a=t.is(":"+s);t.prop?t.prop(s,a):a?t.attr(s,s):t.removeAttr(s),r(e,n.checkedClass,a)}function u(e,t,n){r(e,n.disabledClass,t.is(":disabled"))}function o(e,t,n){switch(n){case"after":return e.after(t),e.next();case"before":return e.before(t),e.prev();case"wrap":return e.wrap(t),e.parent()}return null}function c(t,s,a){var i,r,l;return a||(a={}),a=e.extend({bind:{},divClass:null,divWrap:"wrap",spanClass:null,spanHtml:null,spanWrap:"wrap"},a),i=e("<div />"),r=e("<span />"),s.autoHide&&t.is(":hidden")&&"none"===t.css("display")&&i.hide(),a.divClass&&i.addClass(a.divClass),s.wrapperClass&&i.addClass(s.wrapperClass),a.spanClass&&r.addClass(a.spanClass),l=n(t,"id"),s.useID&&l&&n(i,"id",s.idPrefix+"-"+l),a.spanHtml&&r.html(a.spanHtml),i=o(t,i,a.divWrap),r=o(t,r,a.spanWrap),u(i,t,s),{div:i,span:r}}function d(t,n){var s;return n.wrapperClass?(s=e("<span />").addClass(n.wrapperClass),s=o(t,s,"wrap")):null}function f(){var t,n,s,a;return a="rgb(120,2,153)",n=e('<div style="width:0;height:0;color:'+a+'">'),e("body").append(n),s=n.get(0),t=window.getComputedStyle?window.getComputedStyle(s,"").color:(s.currentStyle||s.style||{}).color,n.remove(),t.replace(/ /g,"")!==a}function p(t){return t?e("<span />").text(t).html():""}function m(){return navigator.cpuClass&&!navigator.product}function v(){return window.XMLHttpRequest!==void 0?!0:!1}function h(e){var t;return e[0].multiple?!0:(t=n(e,"size"),!t||1>=t?!1:!0)}function C(){return!1}function w(e,t){var n="none";s(e,t,{"selectstart dragstart mousedown":C}),e.css({MozUserSelect:n,msUserSelect:n,webkitUserSelect:n,userSelect:n})}function b(e,t,n){var s=e.val();""===s?s=n.fileDefaultHtml:(s=s.split(/[\/\\]+/),s=s[s.length-1]),t.text(s)}function y(e,t,n){var s,a;for(s=[],e.each(function(){var e;for(e in t)Object.prototype.hasOwnProperty.call(t,e)&&(s.push({el:this,name:e,old:this.style[e]}),this.style[e]=t[e])}),n();s.length;)a=s.pop(),a.el.style[a.name]=a.old}function g(e,t){var n;n=e.parents(),n.push(e[0]),n=n.not(":visible"),y(n,{visibility:"hidden",display:"block",position:"absolute"},t)}function k(e,t){return function(){e.unwrap().unwrap().unbind(t.eventNamespace)}}var H=!0,x=!1,A=[{match:function(e){return e.is("a, button, :submit, :reset, input[type='button']")},apply:function(e,t){var r,l,o,d,f;return l=t.submitDefaultHtml,e.is(":reset")&&(l=t.resetDefaultHtml),d=e.is("a, button")?function(){return e.html()||l}:function(){return p(n(e,"value"))||l},o=c(e,t,{divClass:t.buttonClass,spanHtml:d()}),r=o.div,a(e,r,t),f=!1,s(r,t,{"click touchend":function(){var t,s,a,i;f||e.is(":disabled")||(f=!0,e[0].dispatchEvent?(t=document.createEvent("MouseEvents"),t.initEvent("click",!0,!0),s=e[0].dispatchEvent(t),e.is("a")&&s&&(a=n(e,"target"),i=n(e,"href"),a&&"_self"!==a?window.open(i,a):document.location.href=i)):e.click(),f=!1)}}),w(r,t),{remove:function(){return r.after(e),r.remove(),e.unbind(t.eventNamespace),e},update:function(){i(r,t),u(r,e,t),e.detach(),o.span.html(d()).append(e)}}}},{match:function(e){return e.is(":checkbox")},apply:function(e,t){var n,r,o;return n=c(e,t,{divClass:t.checkboxClass}),r=n.div,o=n.span,a(e,r,t),s(e,t,{"click touchend":function(){l(o,e,t)}}),l(o,e,t),{remove:k(e,t),update:function(){i(r,t),o.removeClass(t.checkedClass),l(o,e,t),u(r,e,t)}}}},{match:function(e){return e.is(":file")},apply:function(t,r){function l(){b(t,p,r)}var d,f,p,v;return d=c(t,r,{divClass:r.fileClass,spanClass:r.fileButtonClass,spanHtml:r.fileButtonHtml,spanWrap:"after"}),f=d.div,v=d.span,p=e("<span />").html(r.fileDefaultHtml),p.addClass(r.filenameClass),p=o(t,p,"after"),n(t,"size")||n(t,"size",f.width()/10),a(t,f,r),l(),m()?s(t,r,{click:function(){t.trigger("change"),setTimeout(l,0)}}):s(t,r,{change:l}),w(p,r),w(v,r),{remove:function(){return p.remove(),v.remove(),t.unwrap().unbind(r.eventNamespace)},update:function(){i(f,r),b(t,p,r),u(f,t,r)}}}},{match:function(e){if(e.is("input")){var t=(" "+n(e,"type")+" ").toLowerCase(),s=" color date datetime datetime-local email month number password search tel text time url week ";return s.indexOf(t)>=0}return!1},apply:function(e,t){var s,i;return s=n(e,"type"),e.addClass(t.inputClass),i=d(e,t),a(e,e,t),t.inputAddTypeAsClass&&e.addClass(s),{remove:function(){e.removeClass(t.inputClass),t.inputAddTypeAsClass&&e.removeClass(s),i&&e.unwrap()},update:C}}},{match:function(e){return e.is(":radio")},apply:function(t,r){var o,d,f;return o=c(t,r,{divClass:r.radioClass}),d=o.div,f=o.span,a(t,d,r),s(t,r,{"click touchend":function(){e.uniform.update(e(':radio[name="'+n(t,"name")+'"]'))}}),l(f,t,r),{remove:k(t,r),update:function(){i(d,r),l(f,t,r),u(d,t,r)}}}},{match:function(e){return e.is("select")&&!h(e)?!0:!1},apply:function(t,n){var r,l,o,d;return n.selectAutoWidth&&g(t,function(){d=t.width()}),r=c(t,n,{divClass:n.selectClass,spanHtml:(t.find(":selected:first")||t.find("option:first")).html(),spanWrap:"before"}),l=r.div,o=r.span,n.selectAutoWidth?g(t,function(){y(e([o[0],l[0]]),{display:"block"},function(){var e;e=o.outerWidth()-o.width(),l.width(d+e),o.width(d)})}):l.addClass("fixedWidth"),a(t,l,n),s(t,n,{change:function(){o.html(t.find(":selected").html()),l.removeClass(n.activeClass)},"click touchend":function(){var e=t.find(":selected").html();o.html()!==e&&t.trigger("change")},keyup:function(){o.html(t.find(":selected").html())}}),w(o,n),{remove:function(){return o.remove(),t.unwrap().unbind(n.eventNamespace),t},update:function(){n.selectAutoWidth?(e.uniform.restore(t),t.uniform(n)):(i(l,n),o.html(t.find(":selected").html()),u(l,t,n))}}}},{match:function(e){return e.is("select")&&h(e)?!0:!1},apply:function(e,t){var n;return e.addClass(t.selectMultiClass),n=d(e,t),a(e,e,t),{remove:function(){e.removeClass(t.selectMultiClass),n&&e.unwrap()},update:C}}},{match:function(e){return e.is("textarea")},apply:function(e,t){var n;return e.addClass(t.textareaClass),n=d(e,t),a(e,e,t),{remove:function(){e.removeClass(t.textareaClass),n&&e.unwrap()},update:C}}}];m()&&!v()&&(H=!1),e.uniform={defaults:{activeClass:"active",autoHide:!0,buttonClass:"button",checkboxClass:"checker",checkedClass:"checked",disabledClass:"disabled",eventNamespace:".uniform",fileButtonClass:"action",fileButtonHtml:"Choose File",fileClass:"uploader",fileDefaultHtml:"No file selected",filenameClass:"filename",focusClass:"focus",hoverClass:"hover",idPrefix:"uniform",inputAddTypeAsClass:!0,inputClass:"uniform-input",radioClass:"radio",resetDefaultHtml:"Reset",resetSelector:!1,selectAutoWidth:!0,selectClass:"selector",selectMultiClass:"uniform-multiselect",submitDefaultHtml:"Submit",textareaClass:"uniform",useID:!0,wrapperClass:null},elements:[]},e.fn.uniform=function(t){var n=this;return t=e.extend({},e.uniform.defaults,t),x||(x=!0,f()&&(H=!1)),H?(t.resetSelector&&e(t.resetSelector).mouseup(function(){window.setTimeout(function(){e.uniform.update(n)},10)}),this.each(function(){var n,s,a,i=e(this);if(i.data("uniformed"))return e.uniform.update(i),void 0;for(n=0;A.length>n;n+=1)if(s=A[n],s.match(i,t))return a=s.apply(i,t),i.data("uniformed",a),e.uniform.elements.push(i.get(0)),void 0})):this},e.uniform.restore=e.fn.uniform.restore=function(n){n===t&&(n=e.uniform.elements),e(n).each(function(){var t,n,s=e(this);n=s.data("uniformed"),n&&(n.remove(),t=e.inArray(this,e.uniform.elements),t>=0&&e.uniform.elements.splice(t,1),s.removeData("uniformed"))})},e.uniform.update=e.fn.uniform.update=function(n){n===t&&(n=e.uniform.elements),e(n).each(function(){var t,n=e(this);t=n.data("uniformed"),t&&t.update(n,t.options)})}})(jQuery);


//     Underscore.js 1.6.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.6.0';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return obj;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, length = obj.length; i < length; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      var keys = _.keys(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
      }
    }
    return obj;
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results.push(iterator.call(context, value, index, list));
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var result;
    any(obj, function(value, index, list) {
      if (predicate.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(predicate, context);
    each(obj, function(value, index, list) {
      if (predicate.call(context, value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, function(value, index, list) {
      return !predicate.call(context, value, index, list);
    }, context);
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate || (predicate = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(predicate, context);
    each(obj, function(value, index, list) {
      if (!(result = result && predicate.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, predicate, context) {
    predicate || (predicate = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(predicate, context);
    each(obj, function(value, index, list) {
      if (result || (result = predicate.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matches(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matches(attrs));
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See [WebKit Bug 80797](https://bugs.webkit.org/show_bug.cgi?id=80797)
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    var result = -Infinity, lastComputed = -Infinity;
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      if (computed > lastComputed) {
        result = value;
        lastComputed = computed;
      }
    });
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    var result = Infinity, lastComputed = Infinity;
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      if (computed < lastComputed) {
        result = value;
        lastComputed = computed;
      }
    });
    return result;
  };

  // Shuffle an array, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher???Yates_shuffle).
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (obj.length !== +obj.length) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return value;
    return _.property(value);
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, iterator, context) {
    iterator = lookupIterator(iterator);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iterator, context) {
      var result = {};
      iterator = lookupIterator(iterator);
      each(obj, function(value, index) {
        var key = iterator.call(context, value, index, obj);
        behavior(result, key, value);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, key, value) {
    _.has(result, key) ? result[key].push(value) : result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, key, value) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, key) {
    _.has(result, key) ? result[key]++ : result[key] = 1;
  });

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) return array[0];
    if (n < 0) return [];
    return slice.call(array, 0, n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) return array[array.length - 1];
    return slice.call(array, Math.max(array.length - n, 0));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    each(input, function(value) {
      if (_.isArray(value) || _.isArguments(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Split an array into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(array, predicate) {
    var pass = [], fail = [];
    each(array, function(elem) {
      (predicate(elem) ? pass : fail).push(elem);
    });
    return [pass, fail];
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(_.flatten(arguments, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.contains(other, item);
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var length = _.max(_.pluck(arguments, 'length').concat(0));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, '' + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, length + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(length);

    while(idx < length) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    return function() {
      var position = 0;
      var args = boundArgs.slice();
      for (var i = 0, length = args.length; i < length; i++) {
        if (args[i] === _) args[i] = arguments[position++];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return func.apply(this, args);
    };
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) throw new Error('bindAll must be passed function names');
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    options || (options = {});
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;
      if (last < wait) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = new Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = new Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] === void 0) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                             _.isFunction(bCtor) && (bCtor instanceof bCtor))
                        && ('constructor' in a && 'constructor' in b)) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  _.constant = function(value) {
    return function () {
      return value;
    };
  };

  _.property = function(key) {
    return function(obj) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
  _.matches = function(attrs) {
    return function(obj) {
      if (obj === attrs) return true; //avoid comparing an object to itself.
      for (var key in attrs) {
        if (attrs[key] !== obj[key])
          return false;
      }
      return true;
    }
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    var accum = Array(Math.max(0, n));
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() { return new Date().getTime(); };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    var render;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}).call(this);


/*
Author: 		Randell Quitain
File name: 		cookie.js
Description: 	Create, Retrieve & Delete cookie
Dependencies: 	jQuery
Usage: 			
				Create a cookie 
				guxApp.cookie.set('name', 'value', expiration, secured);

				name ??? cookie name
				value ??? cookie value
				expiration ??? cookie expiration (can be String || Number || Date) *optional*
				secured ??? Boolean (default: false) *optional*

				Retrieve a cookie as object
				guxApp.cookie.get('name');

				Delete a cookie
				guxApp.cookie.del('name');

*/
var guxApp = guxApp || {};

(function($){
	guxApp.cookie = {
		/**
		 * get cookie string or specific item value from cookie string
		 * example to get "pc" from dfy.u cookie:
		 * dfy.u="{"fn":"TestOwner3","pc":"ST158BG"}"
		 * @param cookieName
		 * @param keyName, String, the key of the value (fn,country_code)
		 * @param seperator, String, use to split the string ("#",",")
		 * @return value, result Object, {"pc":"ST158BG"}
		 * @return cookieStr, cookie string "{"fn":"TestOwner3","pc":"ST158BG"}"
		 *
		 */
		get: function (cookieName,keyName,seperator) {
			
			// check if cookie exist
			if (!cookieName) { return null; }
			
			var self = this,
				cookieStr = guxApp.tools.decode(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + guxApp.tools.encode(cookieName).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
			
			if(cookieStr&&keyName&&seperator){
				return self.getCookieVal(cookieStr,keyName,seperator);
			}else{
				return cookieStr;
			}
		},
		set: function (cookieName, cookieValue, cookieExp, cookieSecure) {

			// check if cookieNmae set and if same cookie is already set
			if (!cookieName || /^(?:expires|max\-age|path|domain|secure)$/i.test(cookieName)) { return false; }

			var configInfo = (typeof $('#common-config') != 'undefined' && $('#common-config').length > 0) ? $('#common-config').embeddedData() : null,
				expiration = '',
				cookiePath = '/', // set cookie path
				cookieDomain = '';

			// set cookie expiration
			if (cookieExp) {
				switch (cookieExp.constructor) {
					case Number:
					expiration = cookieExp === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + cookieExp;
					break;
					case String:
					expiration = '; expires=' + cookieExp;
					break;
					case Date:
					expiration = '; expires=' + cookieExp.toUTCString();
					break;
				}
			}

			// set cookie domain
			if(configInfo != null && configInfo.cookieDomain) {
				cookieDomain = configInfo.cookieDomain;
			}

			document.cookie = guxApp.tools.encode(cookieName) + '=' + guxApp.tools.encode(cookieValue) + expiration + (cookieDomain ? '; domain=' + cookieDomain : '') + (cookiePath ? '; path=' + cookiePath : '') + (cookieSecure ? '; secure' : '');
			
			return true;

		},
		del: function (cookieName) {

			// check if cookie doesn't exist
			if (!this.hasItem(cookieName)) { return false; }

			var configInfo = (typeof $('#common-config') != 'undefined' && $('#common-config').length > 0) ? $('#common-config').embeddedData() : null,
				cookiePath = '/', // set cookie path
				cookieDomain = '';

			// set cookie domain
			if(configInfo != null && configInfo.cookieDomain) {
				cookieDomain = configInfo.cookieDomain;
			}

			document.cookie = guxApp.tools.encode(cookieName) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + (cookieDomain ? '; domain=' + cookieDomain : '') + (cookiePath ? '; path=' + cookiePath : '');
			
			return true;
		},
		hasItem: function (cookieName) {
			if (!cookieName) { return false; }
			return (new RegExp("(?:^|;\\s*)" + guxApp.tools.encode(cookieName).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
		},
		/**
		 * check whether the string is a Json String
		 * example string '{"fn":"TestOwner3","pc":"ST158BG"}'
		 * @param str, string
		 * @return boolean.
		 */
		isJsonStr : function(str) {
			try {
				$.parseJSON(str);
			} catch (e) {
				return false;
			}
			return true;
		},
		/**
		 * get specific item value from cookie
		 * example to get "pc" from dfy.u cookie:
		 * dfy.u="{"fn":"TestOwner3","pc":"ST158BG"}"
		 * @param cookieStr, JSON string ("{"fn":"TestOwner3","pc":"ST158BG"}"), or normal string ("userInfo=country_code=CN#region_code=SH#city=SHANGHAI")
		 * @param valName, String, the key of the value (fn,country_code)
		 * @param seperator, String, use to split the string ("#",",")
		 * @return value, result Object, {"pc":"ST158BG"}
		 *
		 */
		getCookieVal : function(cookieStr, valName, seperator) {
			var self = this, value = {}, valNameLen = valName.length;
			if (self.isJsonStr(cookieStr)) {
				var cookieObj = $.parseJSON(cookieStr);
				for (var i in cookieObj) {
					for (var j = 0; j < valNameLen; j++) {
						if (i == valName[j]) {
							value[valName[j]] = cookieObj[i];
						}
					}
				}
			} else {
				var cookieArr = cookieStr.split(seperator), cookieLen = cookieArr.length;
				for (var i = 0; i < cookieLen; i++) {
					for (var j = 0; j < valNameLen; j++) {
						if (cookieArr[i].indexOf(valName[j]) != -1) {//if value name exist in current cookieArr
							value[valName[j]] = cookieArr[i].substring(valName[j].length + 1, cookieArr[i].length);
						}
					}
				}
			}
			return value;
		}
	}

})(jQuery);


	/*
		Ford Global UX - Google Maps Bing Contingency API v1.4.3
	*/
	function googleMapsApi(config) {

		var language = config.language,
			countryCode = config.countryCode,
			countryCodes = config.countryCodes ? config.countryCodes.split(',') : [countryCode],
			imagePath = config.imagePath,
			countryBounds = config.countryBounds,
			autocompleteServiceURL = config.autocompleteCallbackURL,
			autocompleteCallback = config.autocompleteCallbackName,
			boundsString = '',
			countryCodes = config.countryCodes ? config.countryCodes.split(',') : [countryCode],
           	bingKey = config.apiKey? config.apiKey : 'Al1EdZ_aW5T6XNlr-BJxCw1l4KaA0tmXFI_eTl1RITyYptWUS0qit_MprtcG7w2F',
			dealerTableBingURL = config.dealerTableURL ? config.dealerTableURL : 'https://spatial.virtualearth.net/REST/v1/data/1652026ff3b247cd9d1f4cc12b9a080b/FordEuropeDealers_Transition/Dealer',
            autocompleteDealerList = [],
			punctuationRegex = /[\!"#\$%&'\(\)\*\+`\-\.\/\:;\<\=\>\?@\[\\\]\^_'\{\|\}~]/g,
			googleMatrixLimit = 100;

		if(countryBounds) {
			var bounds = [];

			for(var i = 0; i < countryBounds.length; i++) {
				if(countryBounds[i].lat && countryBounds[i].lng) {
					bounds.push(countryBounds[i].lng + ' ' + countryBounds[i].lat);
				}
			}
			if(!(countryBounds[0].lat === countryBounds[countryBounds.length-1].lat && countryBounds[0].lng === countryBounds[countryBounds.length-1].lng)) {
				bounds.push(countryBounds[0].lng + ' ' + countryBounds[0].lat);
			}
					
		}
		
		if(countryBounds){
			
			var nLat = - 91;	//North is +X, so maximise it in the range
			var sLat = 91;		//South is -X, so minimise it in the range
			
			var eLng = - 181;	//East is +Y, so maximise it in the range
			var wLng = 181;		//West is -Y, so minimise it in the range 
					
			for(var i = 0; i < countryBounds.length; i++) {

				var x = countryBounds[i];
				x.lat = Number(x.lat);
				x.lng = Number(x.lng);
			
				if(x.lat !== "" || x.lng !== ""){
			
					if(x.lat > nLat){
						nLat = x.lat;
					}
					if(x.lat < sLat){
						sLat = x.lat;
					}
					if(x.lng > eLng){
						eLng = x.lng;
					}
					if(x.lng < wLng){
						wLng = x.lng;	
					}
				}
			}			
			boundsString = '(' + sLat + ',' + wLng + ',' + nLat + ',' + eLng + ')';						
		}
		

		if(autocompleteServiceURL) {
			jsonpRequest(autocompleteServiceURL);
		}

		window[autocompleteCallback] = function(dealers) {
			autocompleteDealerList = dealers;
		};
		
		function googleMap(element, options) {
			var geocoder,
				self = this;
			
			options.streetViewControl = false;

			if(options.center && options.zoom) {
				this.map = new google.maps.Map(element, options);
			} else {
				this.map = new google.maps.Map(element, options);
				this.setBounds(countryBounds);
			}

			if(!options.enableZoom) {
				this.map.setOptions({
					scrollwheel: false
				});
			}

			if(options.disableBusinessPOI) {
				// Some businesses in Google Maps aren't flagged as businesses, so to disable them, we need to disable all POI, and re-enable all except businesses.
				this.map.setOptions({
					styles: [
						{							
							"featureType": "poi",
							"elementType": "labels",
							"stylers": [
								{ "visibility": "off" }
							]
						},{
							"featureType": "poi.attraction",
							"stylers": [
								{ "visibility": "on" }
							]
						},{
							"featureType": "poi.government",
							"stylers": [
								{ "visibility": "on" }
							]
						},{
							"featureType": "poi.medical",
							"stylers": [
								{ "visibility": "on" }
							]
						},{
							"featureType": "poi.park",
							"stylers": [
								{ "visibility": "on" }
							]
						},{
							"featureType": "poi.place_of_worship",
							"stylers": [
								{ "visibility": "on" }
							]
						},{
							"featureType": "poi.school",
							"stylers": [
								{ "visibility": "on" }
							]
						},{
							"featureType": "poi.sports_complex",
							"stylers": [
								{ "visibility": "on" }
							]
						}
					]
				});
			}

			this.map.setOptions({
				zoomControlOptions: {
					position: google.maps.ControlPosition.RIGHT_TOP
				},
				panControlOptions: {
					position: google.maps.ControlPosition.RIGHT_TOP
				}
			});

			this.markers = [];
			this.autocompleteTimeout = null;
			this.directionsService = new google.maps.DirectionsService();
			this.directionsDisplay = new google.maps.DirectionsRenderer({
				suppressMarkers: true
			});

			this.offsetByPixels = function(latlng, offset) {
				var projection = this.map.getProjection(),
					scale = 1 << this.map.getZoom(),
					gLatLng,
					point,
					newLatLng;

				gLatLng = new google.maps.LatLng(latlng.lat, latlng.lng);
				point = projection.fromLatLngToPoint(gLatLng);
				point.x = point.x + (offset / scale);
				newLatLng = projection.fromPointToLatLng(point);

				return {
					lat: newLatLng.lat(),
					lng: newLatLng.lng()
				};
			};
		}

		googleMap.prototype.setCenter = function(latlng, offset) {
			var self = this;
			this.map.setCenter(latlng);
			if(offset) {
				var listener = google.maps.event.addListener(this.map, 'idle', function() {
					self.map.panBy(offset, 0);
					google.maps.event.removeListener(listener);
				});
			}
		};

		googleMap.prototype.getCenter = function() {
			var center = this.map.getCenter();
			return {
				lat: center.lat(),
				lng: center.lng()
			};
		};

		googleMap.prototype.panTo = function(latlng) {
			this.map.panTo({
				lat: latlng.lat,
				lng: latlng.lng
			});
		};

		googleMap.prototype.setZoom = function(zoomLevel) {
			this.map.setZoom(zoomLevel);
		};

		googleMap.prototype.getZoom = function() {
			return this.map.getZoom();
		};

		googleMap.prototype.setBounds = function(points, offset) {
			var bounds = new google.maps.LatLngBounds(),
				self = this;
			for(var i = 0; i < points.length; i++) {
				if(points[i].lat && points[i].lng) { // For normal latlng objects
					bounds.extend(new google.maps.LatLng(points[i].lat, points[i].lng));
				} else {
					if(points[i].location && points[i].location.lat && points[i].location.lng) { // For dealer object
						bounds.extend(new google.maps.LatLng(points[i].location.lat, points[i].location.lng));
					}
				}
			}
			if(points.length) {
				this.map.fitBounds(bounds);
				if(offset) {
					var listener = google.maps.event.addListener(this.map, 'idle', function() {
						var zoom = self.map.getZoom();
						self.map.setZoom(zoom-1);
						self.map.panBy(offset, 0);
						google.maps.event.removeListener(listener);
					});
				}
			}
		};

		googleMap.prototype.getBounds = function() {
			var bounds = this.map.getBounds(),
				ne = bounds.getNorthEast(),
				sw = bounds.getSouthWest();

			return {
				ne: {
					lat: ne.lat(),
					lng: ne.lng()
				},
				sw: {
					lat: sw.lat(),
					lng: sw.lng()
				}
			};
		};
		
		googleMap.prototype.geocodeLocation = function(location, callback) {
			var geocoder = new google.maps.Geocoder(),
				locations = [];
			
			geocoder.geocode({
					address: location,
					region: countryCode
				},
				function(data) {
					var addLocation = false;
					for(var i = 0; i < data.length; i++) {
						addLocation = false;
						for(var j = 0; j < data[i].address_components.length; j++) {
							for(var k = 0; k < data[i].address_components[j].types.length; k++) {
								if(data[i].address_components[j].types[k] === 'country') {
									for(var m = 0; m < countryCodes.length; m++) {
										if(data[i].address_components[j].short_name === countryCodes[m]) {
											addLocation = true;
										}
									}
								}
							}
						}
						if(addLocation) {
							locations.push({
								lat: data[i].geometry.location.lat(),
								lng: data[i].geometry.location.lng(),
								description: data[i].formatted_address,
								types: data[i].types,
								address_components: data[i].address_components
							});
						}
					}
					callback(locations);
				}
			);
		};

		googleMap.prototype.reverseGeocode = function(latlng, callback) {
			var geocoder = new google.maps.Geocoder();

			geocoder.geocode({
				'latLng': new google.maps.LatLng(latlng.lat, latlng.lng)
			},
			function(results, status) {
				if(results[0]) {
					callback(results[0].formatted_address);
				}
			});
		};

		googleMap.prototype.addMarker = function(latlng) {
			var marker = new google.maps.Marker({
				position: latlng,
				map: this.map
			});
			return marker;
		};

		googleMap.prototype.addGuxMarker = function(latlng, label, infoWindowContent, callback) {
			var overlay;

			overlay = new guxMarker(new google.maps.LatLng(latlng.lat, latlng.lng), this.map, label, infoWindowContent, callback);
			this.markers.unshift(overlay);
			return overlay;
		};

		googleMap.prototype.addListener = function(target, event, handler) {
			return google.maps.event.addListener(target, event, handler);
		};

		googleMap.prototype.removeListener = function(listener) {
			google.maps.event.removeListener(listener);
		};

		googleMap.prototype.trigger = function(target, event) {
			google.maps.event.trigger(target, event);
		};

		googleMap.prototype.clearMarkers = function(markers) {
			for(var i = 0; i < markers.length; i++) {
				markers[i].setMap(null);
			}
		};


		//Bing
		googleMap.prototype.searchDealersByDistance = function(origin, radius, limit, callback, matchParameters, containsParameters) {
			
			var url,
				baseUrl = dealerTableBingURL + '?',
				geoFilter = radius ? 'spatialFilter=nearby(' + origin.lat + ',' + origin.lng + ',' + radius + ')' : 'spatialFilter=bbox' + boundsString,
				select = '&$select=*,__Distance',
				matchArr = [],
				codeArr = [],
				distanceMatrixDealers = [],
				filter = '&$filter=',
				maxResults = '&$top=' + limit,
				format = '&$format=json',
				key = '&key=' + bingKey,
				jsonp = '&Jsonp=processDealerResults'
				matchORClauses = [],
				matchNOTClauses = [];
			
			
			if(matchParameters && matchParameters.OR_CLAUSES) {
				for(var i = 0; i < matchParameters.OR_CLAUSES.length; i++) {
					orArr = [];
					for(var orKey in matchParameters.OR_CLAUSES[i]) {
						if(orKey.indexOf('!') === 0) {
							orArr.push(orKey.slice(1) + '%20Ne%20%27' + matchParameters.OR_CLAUSES[i][orKey] + '%27');
						} else {
							orArr.push(orKey + '%20Eq%20%27' + matchParameters.OR_CLAUSES[i][orKey] + '%27');
						}
					}
					matchArr.push('(' + orArr.join('%20OR%20') + ')');
				}
				delete matchParameters.OR_CLAUSES;
			}
						
			if(matchParameters) {
				for(var k in matchParameters) {
					if(k.indexOf('!') === 0) {
						matchArr.push(k.slice(1) + '%20Ne%20%27' + matchParameters[k] + '%27');
					} else {
						matchArr.push(k + '%20Eq%20%27' + matchParameters[k] + '%27');
					}
				}
			}			
			
						
			if(matchArr.length) {
				filter += matchArr.join('%20And%20');
			} else {
				throw new Error('Must specify at least one match parameter.');
			}
						
			url = baseUrl + geoFilter + select + filter + maxResults + format + key + jsonp;

			jsonpRequest(url);

			window.processDealerResults = function(data) {
				var dealer,
					dealers = [];
				var service = new google.maps.DistanceMatrixService();

				for(var i = 0; i < data.d.results.length; i++) {
					dealer = data.d.results[i];
					dealer.location = {
						lat: data.d.results[i].Latitude,
						lng: data.d.results[i].Longitude
					};
					dealer.distance = data.d.results[i].__Distance * 1000;
					dealers.push(dealer);
				}

				destinationLatLngs = [];
				var newDealers = filterDealers(dealers, containsParameters, googleMatrixLimit);

				//Create parallel array of lat lngs to pass into distance matrix
                for (i = 0; i < newDealers.length; i++) {
					destinationLatLngs.push(new google.maps.LatLng(newDealers[i].location.lat, newDealers[i].location.lng));
				}

				//(Dealers chopped into) Chunks of 25, rounded up.
                //This is the have-I-finished array for AJAX calls.
                distanceResponses = new Array(Math.ceil(destinationLatLngs.length/25));

                if(newDealers.length){

                    var createDistanceCallback = function(index) {
						return function(distances) {
							var count = destinationLatLngs.slice(index*25, index*25 + 25).length, j;

                            if(distances) {
								for(j = 0; j < distances.rows[0].elements.length; j++) {
									if(distances.rows[0].elements[j].status === 'OK') {
										newDealers[index*25 + j].distance = distances.rows[0].elements[j].distance.value;
										newDealers[index*25 + j].drivingTime = distances.rows[0].elements[j].duration.value;
										if(radius) {
                                            //Only push dealers within driving distance of radius, not generic distance
											if(newDealers[index*25+j].distance <= radius * 1000) {
												distanceMatrixDealers.push(newDealers[index*25+j]);
											}
										} else {
											distanceMatrixDealers.push(newDealers[index*25+j]);
										}
									} else {
                                            //Error handling for no distance.
											newDealers[index*25 + j].distanceError = distances.rows[0].elements[j].status;
											newDealers[index*25 + j].distance = null;
											distanceMatrixDealers.push(newDealers[index*25+j]);
									}
								}
							} else {
                                //Error is no distances array returned
								for(j = 0; j < count; j++) {
									newDealers[index*25 + j].distanceError = 'DRIVING DISTANCE UNAVAILABLE';
									newDealers[index*25 + j].distance = null;
									distanceMatrixDealers.push(newDealers[index*25+j]);
								}
							}

                            //This chunk of dealers has come back.
							distanceResponses[index] = true;
							responsesReturned = true;

							//If any of the chunks haven't returned, we fail.
							for(var k = 0; k < distanceResponses.length; k++) {
								if(!distanceResponses[k]) {
									responsesReturned = false;
								}
							}

							if(responsesReturned) {

								//The dealers array becomes our array of dealers that went through the distance matrix.
								//This seems the dealers are in the right order regardless of function-call return order.
								dealers = distanceMatrixDealers.sort(function(a, b) {
									if(typeof a.distance === 'number' && typeof b.distance === 'number') {
										return a.distance - b.distance;
									} else {
										if(typeof a.distance !== 'number' && typeof b.distance !== 'number') {
											return a.directDistance - b.directDistance;
										}
										if(typeof a.distance === 'number') {
											return -1;
										} else {
											return 1;
										}
									}
								});
								callback(dealers.slice(0, limit));
							}
						};
					};

					for(i = 0; i < destinationLatLngs.length / 25; i++) {
						service.getDistanceMatrix(
						{
							origins: [origin],
							destinations: destinationLatLngs.slice(i*25, i*25 + 25),
							travelMode: google.maps.TravelMode.DRIVING
						}, createDistanceCallback(i));
					}

				} else {
					callback(newDealers);
				}			
			};
		};


		//Bing
        //Limit is max results to be given to the application.
		googleMap.prototype.searchDealersByProperties = function(limit, callback, matchParameters, containsParameters) {

			var	url,
				baseUrl = dealerTableBingURL + '?',
				geoFilter = 'spatialFilter=bbox' + boundsString,
				select = '&$select=*',
				matchArr = [],
				filter = '&$filter=',				
				maxResults = '&$top=' + limit,
				format = '&$format=json',
				linecount = '&$inlinecount=allpages'
				key = '&key=' + bingKey,
				jsonp = '&Jsonp=processDealerResults';

            var dealers = [];

			//space is %20, quote is %27
			//Eg: $filter=CountryCode%20Eq%20%27GBR%27%20And%20AccidentRepair%20Eq%20%271%27%20And%20HasSalesDepartmentPV%20Eq%20%271%27
			if(matchParameters && matchParameters.OR_CLAUSES) {
				for(var i = 0; i < matchParameters.OR_CLAUSES.length; i++) {
					orArr = [];
					for(var orKey in matchParameters.OR_CLAUSES[i]) {
						if(orKey.indexOf('!') === 0) {
							orArr.push(orKey.slice(1) + '%20Ne%20%27' + matchParameters.OR_CLAUSES[i][orKey] + '%27');
						} else {
							orArr.push(orKey + '%20Eq%20%27' + matchParameters.OR_CLAUSES[i][orKey] + '%27');
						}
					}
					matchArr.push('(' + orArr.join('%20OR%20') + ')');
				}
				delete matchParameters.OR_CLAUSES;
			}
			

			if(matchParameters) {
				for(var k in matchParameters) {
					if(k.indexOf('!') === 0) {
						matchArr.push(k.slice(1) + '%20Ne%20%27' + matchParameters[k] + '%27');
					} else {
						matchArr.push(k + '%20Eq%20%27' + matchParameters[k] + '%27');
					}
				}
			}

			if(matchArr.length) {
				filter += matchArr.join('%20And%20');
			} else {
				throw new Error('Must specify at least one match parameter.');
			}

			var dealersCompleted = [],
                dealerCount;

			url = baseUrl + geoFilter + select + filter + maxResults + linecount + format + key + jsonp;


			jsonpRequest(url);

            //Initial processing of dealer results.
			window.processDealerResults = function(data) {

                dealerCount = data.d.__count;
            	var dealer;
            	
				for(i = 0; i < (dealerCount / 250); i++){					
					dealersCompleted.push(false); 			
				}				

				for(var i = 0; i < data.d.results.length; i++) {
					dealer = data.d.results[i];
					dealer.location = {
						lat: data.d.results[i].Latitude,
						lng: data.d.results[i].Longitude
					};
					dealer.distance = data.d.results[i].__Distance * 1000;
					dealers.push(dealer);
				}

                if(dealerCount > limit){

                    var iterationCount = parseInt(limit, 10),
                        skip,
                        mResults;

					var completed = 0;	

                    var testLoop = 0;

                    for(var outloop = 0; outloop < (dealerCount / 250); outloop++){	
    
                        //rebuild the string
                        skip = '&$skip=' + iterationCount;
                        mResults = '&$top=' + 250;
                        url = baseUrl + geoFilter + select + filter + skip + mResults + format + key + jsonp;

   						//Increment the loop count.
						iterationCount = iterationCount + 250;

                        //Re do it.
                        jsonpRequest(url);

                        window.processDealerResults = function(data) {

							var dealer;
						
                            for(var i = 0; i < data.d.results.length; i++) {
                                dealer = data.d.results[i];
                                dealer.location = {
                                    lat: data.d.results[i].Latitude,
                                    lng: data.d.results[i].Longitude
                                };
                                dealer.distance = data.d.results[i].__Distance * 1000;
                                dealers.push(dealer);
                            }

                            dealersCompleted[testLoop] = true;
							 testLoop = testLoop + 1;

                            var complete = true;	
                            for(var innerLoop = 0; innerLoop < dealersCompleted.length; innerLoop++){					
                                if(dealersCompleted[innerLoop] == false){
                                    complete = false;
                                }
                            }

                            if(complete == true){
								var newDealers = filterDealers(dealers, containsParameters, limit);
                                callback(newDealers);
                            }

                        };
                    }
                } else {
					var newDealers = filterDealers(dealers, containsParameters, limit);
					callback(newDealers);
                }    
			};
		};


        filterDealers = function(dealers, containsParameters, maxResults) {
		
			if(!containsParameters){
				return dealers;
			}
		
            var dealersFiltered = [];
						
            if(dealers.length > 0) {

				for(var i = 0; i < dealers.length; i++){
				
					var allMatched = true;
					
					for(var key in containsParameters){
						if(containsParameters.hasOwnProperty(key)){					
							
							var check = containsParameters[key];
							var dealerString = dealers[i][key];
														
							if(dealerString.indexOf(check) === -1){
								allMatched = false;
							}							
						}	
					}
					
					if(allMatched === true){
						dealersFiltered.push(dealers[i]);							
					}
				}
          	}

          	var dealersReturned = [];

            if(dealersFiltered.length >= maxResults){
                dealersReturned = dealersFiltered.slice(0,maxResults); 
    		} else {
              	dealersReturned = dealersFiltered;
            }

            return dealersReturned;
        };


		googleMap.prototype.displayDealers = function(dealers) {
				var marker,
					index,
					latlngs = {};

				this.clearMarkers(this.markers);
				this.markers = [];
				for(var i = dealers.length - 1; i >= 0; i--) {
					index = dealers[i].indexOverride || i + 1;
					marker = this.addGuxMarker({lat: dealers[i].location.lat, lng: dealers[i].location.lng }, index, dealers[i].infoWindowMarkup, dealers[i].callback);
					if(latlngs[dealers[i].location.lat + ',' + dealers[i].location.lng]) {
						marker.xOffset = 12;
					}
					latlngs[dealers[i].location.lat + ',' + dealers[i].location.lng] = true;
					
				}
			};

		googleMap.prototype.clearDealers = function() {
			this.clearMarkers(this.markers);
			this.markers = [];
		};

		googleMap.prototype.selectMarker = function(index, delay) {
			if(this.markers[index]) {
				this.markers[index].select(delay);
			}
		};

		googleMap.prototype.deselectMarker = function(index) {
			if(this.markers[index]) {
				this.markers[index].deselect();
			}
		};

		googleMap.prototype.deselectMarkers = function() {
			for (var i = 0; i < this.markers.length; i++) {
				this.markers[i].deselect();
			};
		};

		googleMap.prototype.autocomplete = function(text, limit, callback, type) {
			var ac,
				delay = 300,
				locationPredictions,
				dealerPredictions,
				predictions = {
					dealers: [],
					locations: []
				},
				self = this,			
				placesCompleted = 0,
				places = {};

			if(this.autocompleteTimeout) {
				clearTimeout(this.autocompleteTimeout);
			}

			if(type !== 'dealers') {
				ac = new google.maps.places.AutocompleteService();
			}

			this.autocompleteTimeout = setTimeout(function() {
				if(type === 'dealers') {
					// Get dealer name predictions
					var dealerMatches = [],
						dealerMatch;

					for (var i = 0; i < autocompleteDealerList.length; i++) {
						if(autocompleteMatch(autocompleteDealerList[i].n, text) !== -1) {
							dealerMatch = {
								DealerName: autocompleteDealerList[i].n,
								EntityID: autocompleteDealerList[i].e
							};
							if(autocompleteMatch(autocompleteDealerList[i].n, text) === 0) {
								dealerMatches.splice(0, 0, dealerMatch);
							} else {
								dealerMatches.push(dealerMatch);
							}
						}
					};
					predictions.dealers = dealerMatches.slice(0, limit);
					callback(predictions);

				} else {
					// Get location predictions
					for(var i = 0; i < countryCodes.length; i++) {
						ac.getPlacePredictions(
							{
								input: text,
								componentRestrictions: {country: countryCodes[i]},
								types: ['geocode']
							},
							function(index) {
								return function(results, status) {
									locationPredictions = [];
									if(status == google.maps.places.PlacesServiceStatus.OK) {
										for(var j = 0; j < results.length; j++) {
											locationPredictions.push(results[j].description);
										}
									}
									places[countryCodes[index]] = locationPredictions;
									placesCompleted++;
									
									if(placesCompleted === countryCodes.length) {
										for(var k = 0; k < countryCodes.length; k++) {
											predictions.locations = predictions.locations.concat(places[countryCodes[k]]);
										}
										// predictions.locations = predictions.locations.slice(0, limit);
										if(type !== 'locations') {
											// Get dealer name predictions
											var dealerMatches = [],
												dealerMatch;

											for (var m = 0; m < autocompleteDealerList.length; m++) {
												if(autocompleteMatch(autocompleteDealerList[m].n, text) !== -1) {
													dealerMatch = {
														DealerName: autocompleteDealerList[m].n,
														EntityID: autocompleteDealerList[m].e
													};
													if(autocompleteMatch(autocompleteDealerList[m].n, text) === 0) {
														dealerMatches.splice(0, 0, dealerMatch);
													} else {
														dealerMatches.push(dealerMatch);
													}
												}
											};
											predictions.dealers = dealerMatches.slice(0, limit);
										}
										callback(predictions);
									}
								}
							}(i)
						);
					}
				}	
			}, delay);
		};

		googleMap.prototype.displayRouteToDealer = function(origin, dealer) {
			var self = this;
			this.directionsDisplay.setMap(this.map);
			this.directionsService.route({
				origin: origin.lat + ', ' + origin.lng,
				destination: dealer.location.lat + ', ' + dealer.location.lng,
				travelMode: google.maps.TravelMode.DRIVING
			}, function(response, status) {
				if (status == google.maps.DirectionsStatus.OK) {
					self.directionsDisplay.setDirections(response);
				}
			});
		};

		googleMap.prototype.clearRoutes = function() {
			this.directionsDisplay.setMap(null);
		};

		googleMap.prototype.getDirectionsURL = function(destination, origin) {
			var start,
				end;

			start = origin ? 'saddr=' + origin.lat + ',' + origin.lng + '&': '';
			end = 'daddr=' + destination.lat + ',' + destination.lng;
			return 'https://maps.google.com?' + start + end;
		};

		googleMap.prototype.getAddressDirectionsURL = function(destinationDealer, addressFormat, origin) {

			var start,
				end,
				addressLines = [];

			for(var i = 0; i < addressFormat.length; i++) {
				if(destinationDealer[addressFormat[i]]) {
					addressLines.push(destinationDealer[addressFormat[i]]);
				}
			}

			start = origin ? 'saddr=' + origin.description + '&': '';
			end = 'daddr=' + addressLines.join('+');
			return 'https://maps.google.com?' + start + end + '&output=classic';
		};

		// Custom marker using OverlayView to allow us to use HTML and numbered markers
		guxMarker.prototype = new google.maps.OverlayView();

		function guxMarker(position, map, label, infoWindowContent, callback) {
			this.position_ = position;
			this.map_ = map;
			this.label_ = label;
			this.content_ = infoWindowContent;
			this.div_ = null;
			this.icon = null;
			this.callback = callback;
			this.infoWindow = null;
			this.setMap(map);
		}

				
		guxMarker.prototype.select = function(delay) {
		
			var self = this; 			
							
			if(self.icon && self.div_){
				self.icon.src = imagePath + 'map-marker-active.png';
				self.div_.style.zIndex = 100;
			} else {
				var timeOut = delay || 500;
				setTimeout(function(){
					if(self.icon && self.div_){
						self.icon.src = imagePath + 'map-marker-active.png';
						self.div_.style.zIndex = 100;
					}
				}, timeOut);
			}
		};

		guxMarker.prototype.deselect = function(delay) {
		
			var self = this;
			
			if(self.icon && self.div_){
				self.icon.src = imagePath + 'map-marker.png';
				self.div_.style.zIndex = 1;
				if(self.infoWindow) {
					self.infoWindow.hide();
				}
			} else {
				var timeOut = delay || 500;
				setTimeout(function(){
					if(self.icon && self.div_){
						self.icon.src = imagePath + 'map-marker.png';
						self.div_.style.zIndex = 1;
						if(self.infoWindow) {
							self.infoWindow.hide();
						}
					}
				}, timeOut);
			}			
		};
		
		
		guxMarker.prototype.onAdd = function() {
			var div = document.createElement('div'),
				self = this;
			div.className = "map-marker";
			div.style.width = '35px';
			div.style.height = '46px';

			var img = document.createElement('img');
			img.src = imagePath + 'map-marker.png';
			this.icon = img;
			div.appendChild(img);

			if(this.label_) {
				var span = document.createElement('span');
				span.innerHTML = this.label_;
				span.className = 'marker-label';
				div.appendChild(span);
			}

			this.div_ = div;

			var panes = this.getPanes();
			panes.overlayMouseTarget.appendChild(div);

			if(this.callback) {
				google.maps.event.addDomListener(div, 'click', function() {
					self.callback();
				});
			}
			
			if(this.content_) {
				// var infoWindow;
				google.maps.event.addDomListener(div, 'click', function() {
					self.showInfoWindow();
				});
			}
			
		};

		guxMarker.prototype.showInfoWindow = function() {
			var self = this;
			// If already displayed then hide the current version before showing a new one
			// Perhaps show should be a no-op on an already displayed info window?
			if(this.infoWindow) {
				this.infoWindow.hide();
			}
			self.infoWindow = new guxInfoWindow(self.getPosition(), self.map_, self.content_);
			if(self.xOffset) {
				self.infoWindow.xOffset = self.xOffset;
			}
		};

		guxMarker.prototype.hideInfowindow = function() {
			if(this.infoWindow) {
				this.infoWindow.hide();
			}
		};

		guxMarker.prototype.draw = function() {
			var overlayProjection = this.getProjection();

			var pos = overlayProjection.fromLatLngToDivPixel(this.position_);
			var xOffset = this.xOffset || 0;

			var div = this.div_;
			div.style.position = 'absolute';
			div.style.left = pos.x - (17 + xOffset) + 'px';
			div.style.top = pos.y - 46 + 'px';
			};

		guxMarker.prototype.onRemove = function() {
			this.div_.parentNode.removeChild(this.div_);
			this.div_ = null;
			if(this.infoWindow) {
				this.infoWindow.hide();
			}
		};

		guxMarker.prototype.getPosition = function() {
			return {
				lat: this.position_.lat(),
				lng: this.position_.lng()
			};
		};

		// Custom infowindow
		guxInfoWindow.prototype = new google.maps.OverlayView();

		function guxInfoWindow(position, map, content) {
			this.position_ = new google.maps.LatLng(position.lat, position.lng);
			this.map_ = map;
			this.content_ = content;
			this.div_ = null;

			this.setMap(map);
		}

		guxInfoWindow.prototype.onAdd = function() {
			var div = document.createElement('div');
			div.className = "info-window";
			div.innerHTML = this.content_;
			this.div_ = div;

			var panes = this.getPanes();
			panes.overlayMouseTarget.appendChild(div);

			var self = this;
			google.maps.event.addListener(this.map_, 'click', function() {
				self.setMap(null);
			});

			google.maps.event.addDomListener(div, 'click', function(e) {
				e.stopPropagation();
			});

		};

		guxInfoWindow.prototype.draw = function() {
			var overlayProjection = this.getProjection();

			var pos = overlayProjection.fromLatLngToDivPixel(this.position_);
			var xOffset = this.xOffset || 0;

			var div = this.div_;
			div.style.position = 'absolute';
			div.style.left = pos.x + 30 - xOffset + 'px';
			div.style.top = pos.y - 60 + 'px';
		};

		guxInfoWindow.prototype.onRemove = function() {
			this.div_.parentNode.removeChild(this.div_);
			this.div_ = null;
		};

		guxInfoWindow.prototype.hide = function() {
			this.setMap(null);
		};



		function jsonpRequest(url) {
			var script = document.createElement('script');
			script.setAttribute('type', 'text/javascript');
			script.setAttribute('src', url);
			document.body.appendChild(script);
		}

		function dealerDistance(olat, olon, dlat, dlon) {
			var R = 6371; // Approx. radius of the Earth http://en.wikipedia.org/wiki/Earth_radius
			var lat1 = Math.PI * olat / 180;
			var lon1 = Math.PI * olon / 180;
			var lat2 = Math.PI * dlat / 180;
			var lon2 = Math.PI * dlon / 180;
			var dlon = lon2 - lon1, dlat = lat2 - lat1;
			var a = Math.pow(Math.sin(dlat/2),2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon/2),2);
			var c = 2 * Math.asin(Math.min(1, Math.sqrt(a)));
			var d = R * c;
			return d;
		}

		function characterFolding(character) {
			var characterMap = {
				//'\u0049': '\u0131',
				'\u00B5': '\u03BC',
				'\u00DF': '\u0073\u0073',
				'\u0130': '\u0069\u0307',
				//'\u0130': '\u0069',
				'\u0149': '\u02BC\u006E',
				'\u017F': '\u0073',
				'\u01F0': '\u006A\u030C',
				'\u0345': '\u03B9',
				'\u0390': '\u03B9\u0308\u0301',
				'\u03B0': '\u03C5\u0308\u0301',
				'\u03C2': '\u03C3',
				'\u03D0': '\u03B2',
				'\u03D1': '\u03B8',
				'\u03D5': '\u03C6',
				'\u03D6': '\u03C0',
				'\u03F0': '\u03BA',
				'\u03F1': '\u03C1',
				'\u03F5': '\u03B5',
				'\u0587': '\u0565\u0582',
				'\u1E96': '\u0068\u0331',
				'\u1E97': '\u0074\u0308',
				'\u1E98': '\u0077\u030A',
				'\u1E99': '\u0079\u030A',
				'\u1E9A': '\u0061\u02BE',
				'\u1E9B': '\u1E61',
				'\u1E9E': '\u0073\u0073',
				'\u1F50': '\u03C5\u0313',
				'\u1F52': '\u03C5\u0313\u0300',
				'\u1F54': '\u03C5\u0313\u0301',
				'\u1F56': '\u03C5\u0313\u0342',
				'\u1F80': '\u1F00\u03B9',
				'\u1F81': '\u1F01\u03B9',
				'\u1F82': '\u1F02\u03B9',
				'\u1F83': '\u1F03\u03B9',
				'\u1F84': '\u1F04\u03B9',
				'\u1F85': '\u1F05\u03B9',
				'\u1F86': '\u1F06\u03B9',
				'\u1F87': '\u1F07\u03B9',
				'\u1F88': '\u1F00\u03B9',
				'\u1F89': '\u1F01\u03B9',
				'\u1F8A': '\u1F02\u03B9',
				'\u1F8B': '\u1F03\u03B9',
				'\u1F8C': '\u1F04\u03B9',
				'\u1F8D': '\u1F05\u03B9',
				'\u1F8E': '\u1F06\u03B9',
				'\u1F8F': '\u1F07\u03B9',
				'\u1F90': '\u1F20\u03B9',
				'\u1F91': '\u1F21\u03B9',
				'\u1F92': '\u1F22\u03B9',
				'\u1F93': '\u1F23\u03B9',
				'\u1F94': '\u1F24\u03B9',
				'\u1F95': '\u1F25\u03B9',
				'\u1F96': '\u1F26\u03B9',
				'\u1F97': '\u1F27\u03B9',
				'\u1F98': '\u1F20\u03B9',
				'\u1F99': '\u1F21\u03B9',
				'\u1F9A': '\u1F22\u03B9',
				'\u1F9B': '\u1F23\u03B9',
				'\u1F9C': '\u1F24\u03B9',
				'\u1F9D': '\u1F25\u03B9',
				'\u1F9E': '\u1F26\u03B9',
				'\u1F9F': '\u1F27\u03B9',
				'\u1FA0': '\u1F60\u03B9',
				'\u1FA1': '\u1F61\u03B9',
				'\u1FA2': '\u1F62\u03B9',
				'\u1FA3': '\u1F63\u03B9',
				'\u1FA4': '\u1F64\u03B9',
				'\u1FA5': '\u1F65\u03B9',
				'\u1FA6': '\u1F66\u03B9',
				'\u1FA7': '\u1F67\u03B9',
				'\u1FA8': '\u1F60\u03B9',
				'\u1FA9': '\u1F61\u03B9',
				'\u1FAA': '\u1F62\u03B9',
				'\u1FAB': '\u1F63\u03B9',
				'\u1FAC': '\u1F64\u03B9',
				'\u1FAD': '\u1F65\u03B9',
				'\u1FAE': '\u1F66\u03B9',
				'\u1FAF': '\u1F67\u03B9',
				'\u1FB2': '\u1F70\u03B9',
				'\u1FB3': '\u03B1\u03B9',
				'\u1FB4': '\u03AC\u03B9',
				'\u1FB6': '\u03B1\u0342',
				'\u1FB7': '\u03B1\u0342\u03B9',
				'\u1FBC': '\u03B1\u03B9',
				'\u1FBE': '\u03B9',
				'\u1FC2': '\u1F74\u03B9',
				'\u1FC3': '\u03B7\u03B9',
				'\u1FC4': '\u03AE\u03B9',
				'\u1FC6': '\u03B7\u0342',
				'\u1FC7': '\u03B7\u0342\u03B9',
				'\u1FCC': '\u03B7\u03B9',
				'\u1FD2': '\u03B9\u0308\u0300',
				'\u1FD3': '\u03B9\u0308\u0301',
				'\u1FD6': '\u03B9\u0342',
				'\u1FD7': '\u03B9\u0308\u0342',
				'\u1FE2': '\u03C5\u0308\u0300',
				'\u1FE3': '\u03C5\u0308\u0301',
				'\u1FE4': '\u03C1\u0313',
				'\u1FE6': '\u03C5\u0342',
				'\u1FE7': '\u03C5\u0308\u0342',
				'\u1FF2': '\u1F7C\u03B9',
				'\u1FF3': '\u03C9\u03B9',
				'\u1FF4': '\u03CE\u03B9',
				'\u1FF6': '\u03C9\u0342',
				'\u1FF7': '\u03C9\u0342\u03B9',
				'\u1FFC': '\u03C9\u03B9',
				'\uFB00': '\u0066\u0066',
				'\uFB01': '\u0066\u0069',
				'\uFB02': '\u0066\u006C',
				'\uFB03': '\u0066\u0066\u0069',
				'\uFB04': '\u0066\u0066\u006C',
				'\uFB05': '\u0073\u0074',
				'\uFB06': '\u0073\u0074',
				'\uFB13': '\u0574\u0576',
				'\uFB14': '\u0574\u0565',
				'\uFB15': '\u0574\u056B',
				'\uFB16': '\u057E\u0576',
				'\uFB17': '\u0574\u056D'
			};
			return characterMap[character] || character;
		}

		function autocompleteMatch(dealerName, searchString) {
			searchString = searchString.toLowerCase().replace(punctuationRegex, '').replace(/\s+/g, ' ').replace(/./g, characterFolding);
			dealerName = dealerName.toLowerCase().replace(punctuationRegex, '').replace(/\s+/g, ' ').replace(/./g, characterFolding);
			return dealerName.indexOf(searchString);
		}
		
		return {
			map: googleMap
		};
	}


/*
 * functionalities of dealerlocator
 * author : Ray
 * dependencies: jquery, underscorejs, uniformjs, googleMapController, lib/googleMaps, tinypubsub, cookie, jquery-cookie
 
 * History
 * 2015/12/11, Steven Xue, SMW - INC000015398018 - REQ #6689341 - Dragonfly Front end issue about dealer telephone number not display the sam, Line 706, remove .replace(/\s/g, '')
 */
var guxApp = guxApp || {};

(function($) {

	guxApp.dealerLocator = {
		
		init : function() {

			// check if component exists
			var dealerLocator = $('.dealer-locator');
			if (!dealerLocator.length || $('.dealer-unaware',dealerLocator).hasClass('search-panel')) return;

			// container
			var dealerLocatorContainer = $('.dealer-locator'),
				self = this;

			self.colorLengend = self.colorLengend || $();
			

			// utility apps
			var cookie = guxApp.cookie,
				locatorConfig = $("#locator-config").embeddedData();
			
			self.mapController = guxApp.googleMapController;
			/* if(guxApp.tools.isBingMap()){
				self.mapController = guxApp.bingMapController;
			}
			else  */if(guxApp.tools.isAutoNaviMap()) {
				self.mapController = guxApp.autonaviMapController;
			}
			
			// data holders
			self.filters = [];
			self.container = dealerLocatorContainer;
			self.mapContainer = $('.dealer-map-field', self.container);
			self.dealerResultHolder = $('.dealer-list', dealerLocatorContainer);
			self.config = self.mapController.config;
			self.is_mobile = guxApp.viewport.view == "mobile";
			self.is_autoDetection = false;
			self.is_selectLocation = false;
			self.hideDistanceByLocation = !!self.config.hideDistanceByLocation;
			self.errorContainer = $(".error", self.container);
			
			//will not show the landing img if it visited by SEO url directly
			if(self.config.dealerId.length==0){$('.dealer-map-landing').removeClass('hide');}
			
			$('.btn-search', dealerLocatorContainer).on('click', function(e) {
				if ($(this).is('.trackable') && !e.originalEvent) return false;
			});

			// filter button
			$('.filter-toggler', dealerLocatorContainer).on('click', function(e) {
				e.preventDefault();
				//$('.result-list').toggle();
				var	filterBar = $(this).closest(".dealer-filter-bar"),
					resultLists = filterBar.siblings(".result-list");
				if(filterBar.hasClass("active")){//hiding now
					if(self._LastHasCls){
						filterBar.siblings(".result-list.selected").show();
					}else{
						filterBar.siblings(".result-list.selected").siblings(".result-list").show();
					}
				}else{
					self._LastHasCls = filterBar.siblings(".result-list:visible").hasClass("selected")?true:false;
					resultLists.hide();
				}
				
				//gux omniture
				if($(".dealer-filter-bar").hasClass('active')){
					$(this).removeClass('trackable');
				}

				var view_saved_cta = $('.viewSaved', dealerLocatorContainer);
				if (self.getSavedDealer()) {
					view_saved_cta.show();
				} else {
					view_saved_cta.hide();
				}

				// popove launcher
				$('.view-details', dealerLocatorContainer).on('click', self.togglePopInfo);
				
				$(".dealer-filter-bar").toggleClass('active');

			});

			// filter group accordion
			$('.filter-accordion', dealerLocatorContainer).find('.control').on('click', self.toggleAccordion);
			
			// distance dropdown trigger
			$('.filter-distance', dealerLocatorContainer).find('dt a').on('click', self.showOptions);

			// // popove launcher

			// close popover
			$('.group-list', dealerLocatorContainer).on('click', '.close-info', self.closePopInfo);
					

			// remove selected filter
			$('.filter-clear', dealerLocatorContainer).on('click', function(e) {
				var groupList = $('.group-list', dealerLocatorContainer);
				groupList.find('input:checked').removeAttr('checked');
				groupList.find('span[class="checked"]').removeClass('checked');
			});

			$('.input-panel input[type=text]', dealerLocatorContainer).on('focus', function() {
				var elem = this,
					placeholder = $(elem).attr('placeholder'),
					value = $(elem).val();

				if ($(elem).attr('placeholder')) {
					$(elem).data('placeholder', placeholder);
					$(elem).removeAttr('placeholder');
				}

			});

			$('.input-panel input[type=text]', dealerLocatorContainer).on('blur', function(e) {
				var elem = this,
					placeholder = $(elem).attr('placeholder'),
					value = $(elem).val();

				if (!value) {
					$(elem).attr('placeholder', $(elem).data('placeholder'));
				}

			});

			$('.dealer-filter-bar', dealerLocatorContainer).on('submit', '.filter-accordion', function(e) {
				e.preventDefault();

				var form_data = $(this).serialize(),
					dealers = self.dealers || [],
					filters = {};
				
				self.filters = [];
				self.is_autoDetection = false;
				
				self.closeTabs();

				if (!!form_data) {
					
					form_data = form_data.split("&");

					$.each(form_data, function(i, filter) {
						var filter_obj = filter.split('=');

						self.filters.push(filter_obj[0]);

						filters[filter_obj[0]] = true;

					});

					dealers = _.where(self.dealers, filters);

					if (!dealers.length) {

						self.loadedDealers = [];
						self.mapController.cleanMap();

						$('.dealer-result-container .count .num').text("");
						$('.dealer-result-container .count .msg').text("");
						$('.result-list ul').empty()
							.append($('<li class="error" />').text(self.config.error_message.filtered_dealer_not_found));
						$('.result-list').not('.selected').find('.dealer-view-more').hide();
						return;
					}
					
					
				}
				
				self.loadedDealers = [];

				self.mapController.cleanMap();

				self.processResults(dealers, '', true);

				return false;

			});

			// show saved dealer on list
			$('.viewSaved', dealerLocatorContainer).on('click', function(e) {
				e.preventDefault();
				self.closeTabs();
				self.showSavedDealer();
			});

			$('.show-list', dealerLocatorContainer).on('click', function() {
				self.closeTabs();
			});

			$('.dealer-result-container', dealerLocatorContainer).on('click', '.view-all-dealers', function(e) {
				e.preventDefault();
				e.stopPropagation();
				var dealerTrans = $("#dealer-translations").embeddedData(); 
				var pathRootUrl = dealerTrans.pathRootUrl;
				if (window.history.pushState && !self.is_mobile) {
					var domain = location.href,
						has_query_string = _.contains(domain, '?'),
						has_dealer_param = /(\?|\&)+(dealer)+\=/.test(domain);

					if (has_dealer_param) {
						domain = domain.split(/(\?|\&)+(dealer)+\=/)[0];
					}else {
						//if usePathUrl  
						if (dealerTrans.usePathUrl && dealerTrans.usePathUrl == "true"){
							var newURI = domain;
							var parts = domain.split('/'); 
							var toRemove = parts[parts.length-3];
							if ($(".dealer-result-container").hasClass("detailed")) {
								domain = domain.split(toRemove)[0];
							}
						}
					}
					window.history.pushState("", "", domain);
				}

				$(this).parents('.dealer-result-container').removeClass('detailed');
				$(this).parents('.dealer-result-container').find(".filter-toggler").addClass('trackable');

				if ($('.dealer-filter-bar').is('.active')) $('.filter-toggler', self.container).triggerHandler('click');
				$('.result-list', dealerLocatorContainer).show().siblings('.selected').hide();

			});

			// get user location via current location
			$('.dealer-unaware .btn-current', dealerLocatorContainer).on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				self.getDealersFromCurrentLocation();
				self.is_selectLocation = false;
			});

			$('.search-panel', dealerLocatorContainer).on('submit', function(e) {
				e.preventDefault();
				self.getDealersByKeyword($('.input-panel input[type=text]').val(), false);
				return false;
			});

			// search dealer
			$('.input-panel input[type=text]', dealerLocatorContainer).on('keyup', self.autoCompleteTrigger);			
			var self = this;
			/*$.urlParam = function(name){
			    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
			    if (results==null){
			       return null;
			    }
			    else{
			       return results[1] || 0;
			    }
			};
			var specialitiesID = !!$.urlParam('specialities')?decodeURI($.urlParam('specialities')):'';*/
			if (sessionStorage['dealers']) {
			    self.processResults(JSON.parse(sessionStorage['dealers']), sessionStorage['error_message']);


				if (sessionStorage['search_keyword']) {
					$('.input-panel input[type=text]', self.container).val(sessionStorage['search_keyword']).blur();
				}

				sessionStorage.removeItem('dealers');
				sessionStorage.removeItem('search_keyword');
				sessionStorage.removeItem('error_message');

			} else {
				//SEO dealer Search 1st
				if(locatorConfig.dealerId.length!=0){
					//var waitMap = setInterval(function() {
						//if(guxApp.googleMapController.map){//issue
							//clearInterval(waitMap);
							self.mapController.searchDealersByProperties({DealerID: locatorConfig.dealerId}, {}, function(dealers) {
								if (dealers.length) {
									self.processResults(dealers, null, null, true);
									
									$('.result-list.selected').show().siblings('.result-list').hide();
									$('.dealer-result-container').addClass('detailed').find(".filter-toggler").removeClass('trackable');
									self.showDealerCard($('.dealer-result-container li.dealer-result'), true);
									if (guxApp.tools.isAutoNaviMap()) self.mapController.map.panTo(dealers[0].location);									
								}
							});
						//}
					//},1000);
				}
				/*else if(guxApp.tools.isAutoNaviMap()&&specialitiesID.length!=0){
							self.mapController.searchDealersByProperties({}, {DealerNewVehicle:specialitiesID}, function(dealers) {
								if (dealers.length) {
									self.processResults(dealers);								
								}
							});
				}*/else{// location aware 2nd
					guxApp.locationAware.locationDetection(function(addressInfo,isAutoDetection){
						if(addressInfo){
	
							self.mapController.searchDealersByLocation(addressInfo, $('.input-panel input[type=text]', dealerLocatorContainer),{},{}, function(results, response) {
	
								// location not found
								if (!results) {
									// self.showError( (response)?response:self.config.error_message.location_not_found);
									return false;
								}
	
								self.is_autoDetection = isAutoDetection;
	
								self.processResults(results);
	
							},"",isAutoDetection);
							
						}
					});
				}
			}
		},
		showNotification: function(e) {
			
			var self = guxApp.dealerLocator,
				notification = $('.save-dealer', self.container);

			notification.stop().slideDown();

			setTimeout(function() {
				notification.stop().slideUp();
			}, 5000);

		},
		hideNotification: function(e) {
			var self = guxApp.dealerLocator,
				notification = $('.save-dealer', self.container);

			notification.stop().slideUp();
		},
		toggleAccordion: function(e) {
			e.preventDefault();
			
			if ($(this).is('.trackable') && !e.originalEvent) return false;

			var control = $(this);
			control.parent().toggleClass('active')
				.siblings().removeClass('active');

			//gux omniture
			$(":first-child", control).toggleClass('trackable');

		},

		showOptions: function(e) {
			e.preventDefault();
			$(this).parents('.values').toggleClass('active').siblings().removeClass('active');

		},

		togglePopInfo: function(e) {
			e.preventDefault();

			var btn = $(this),
				popover = btn.siblings('.popover');

			if (!btn.is('.active')) {
				$('.popover').hide();
				$('.view-details').removeClass('active');
			}

			btn.toggleClass('active');
			popover.toggle();
			
			// TODO position of popover

		},

		closePopInfo: function(e) {
			e.preventDefault();

			guxApp.dealerLocator.togglePopInfo(e);

		},

		getDealerServices: function(obj) {

			var services = $('#services-config').embeddedData(),
				fetched_services = [];

			$.each(services, function(service, info) {
				if (obj[service]) fetched_services.push(info);
			});
			
			//sort service list (service in detail tab) in order
			fetched_services.sort(function(a,b){
				return parseInt(a.order) - parseInt(b.order);
			});

			return (fetched_services.length)?fetched_services:false;
		},

		


		showSavedDealer: function() {

			var self = guxApp.dealerLocator,
				map = self.mapController.map,
				dealers = [];

			var dc = self.getSavedDealer();

			self.loadedDealers = [];
			self.mapController.cleanMap();

			if (_.contains(_.pluck(self.dealers, "DealerID"), dc)) {
				self.processResults(self.dealers,null, null, null,true);
			} else {
				self.mapController.searchDealersByProperties({DealerID: dc}, {}, function(dealers) {
					self.processResults(_.union(dealers,self.dealers),null, null, null,true);
				});
			}

			// self.closeTabs();

		},

		removeSavedDealer: function() {

			var self = guxApp.dealerLocator,
				map = self.mapController.map,
				dealers = [];

			var dc = self.getSavedDealer();

			self.loadedDealers = [];
			self.mapController.cleanMap();
			if (_.contains(_.pluck(self.dealers, "DealerID"), dc)) {
				self.dealers.splice(_.indexOf(self.dealer, dc), 1);
			}

			self.processResults(self.dealers,null, null, null,true);

			// self.closeTabs();
		},

		is_loggedin: function() {
			return guxPersonalisation.psn.profile.authState === "OW";
		},

		getSavedDealer: function() {

			var self = this,
				dc;

			if (self.is_loggedin()) {
				dc = guxApp.cookie.get('dfy.dl') || JSON.parse(sessionStorage['dfy.p']).dc;
			} else {
				dc = guxApp.cookie.get('dfy.dl');
			}

			return dc;
		},
		
		is_savedDealer: function(dealer) {
			return (dealer.DealerID == this.getSavedDealer());
		},
		showDealerCard: function(container, is_dealer) {	
			
			var self = this,
				dealer = $(container).data(),
				services = guxApp.dealerLocator.getDealerServices(dealer),
				personalisation = guxPersonalisation.psn,
				cookie = guxApp.cookie,
				is_favdealer = false,
				is_dealer = is_dealer || false;

			$.extend(dealer, {
				services: services
			});

			if (window.history.pushState && !self.is_mobile && !is_dealer) window.history.pushState(dealer, dealer.DealerName, dealer.dealershipURL);
			// if ($.bbq.pushState && !self.is_mobile && !is_dealer) 	$.bbq.pushState({dealer:decodeURIComponent(dealer.dealershipURL.split('?')[1]||'')});

			// show card template
			$('.result-list.selected .dealer-result').html(_.template($('#dealer-detail').html(), dealer)).data(dealer);
			if (self.is_selectLocation && self.hideDistanceByLocation) {
			    $('.distance', $('.result-list.selected .dealer-result')).hide();
			}
			
			// bind uniform event to customize select elements - uniform.js
			$.publish('uniform', {
				el: $('.select-dept', self.container),
				el_type: "select"
			});

			// check if the saved dealer
			if (self.is_savedDealer(dealer)) {
				$('.save-dealer-btn', $(".result-list.selected")).addClass('saved');
				is_favdealer = true;
			}

			$('.save-dealer-btn em', self.container).html( (is_favdealer)?self.config.translation.saved:self.config.translation.save);
			if(guxApp.tools.isAutoNaviMap()) $('.dealer-locator .dealer-result-container .result-list.selected .dealer-result .dealer-num').addClass(dealer['DealerAffiliation']);
			$('.dealer-accordion').find('.control').on('click', self.toggleAccordion);


			$('.save-dealer-btn').on('click', function(e) {

				e.preventDefault();
				//for omniture
				var omName = $(this).attr('data-name');
				var omType = $(this).attr('data-type');
				var freq = $(this).attr('data-freq');
				var omOnClick = "dealer info:save";
				//end for omniture
				var save_btn = this,
					view_all_btn = $('.view-all-dealers', self.container);

				var queued_event = function(e) {
					if (!$('.input-panel', self.container).is('.active')) view_all_btn.data('dealerEvent')();
					view_all_btn.unbind('click', queued_event);
				}

				view_all_btn.on('click', queued_event);

				// init personalisation
				personalisation_data = JSON.parse(sessionStorage['dfy.p']);

				// change state
				if ($(this).is('.saved')) {

					$(this).removeClass('saved');
					omOnClick = "dealer info:unsave";
					// remove dealer
					$.publish('/analytics/event/', {
						"type": "fav-dealer",
						"code": ""
					});

					// remove from cookie
					personalisation_data.dc = "";

					personalisation.profile = personalisation_data;
					sessionStorage['dfy.p'] = JSON.stringify(personalisation_data);

					if (cookie.hasItem('dfy.dl')) cookie.del('dfy.dl');

					$('.dealer-result.preferred').removeClass('preferred');

					$('em', save_btn).html(self.config.translation.save);
					self.hideNotification();

					view_all_btn.data('dealerEvent', self.removeSavedDealer);
					
					$.publish('/analytics/link/', { 
	        			title: omName,
	        			link: this,
	        			type: omType,
	        			onclicks: omOnClick,
	        			freq:freq
	        			
	        		});	
					return false;

				}

				// show notification
				self.showNotification();
				
				$.publish('/analytics/event/', {
					"type": "fav-dealer",
					"code": dealer.DealerID
				});

				if (self.is_loggedin()) {

					// halt to warn for overwrite
					personalisation_data.dc = dealer.DealerID;
					personalisation.profile = personalisation_data;
					sessionStorage['dfy.p'] = JSON.stringify(personalisation_data);
				}
				
				cookie.set('dfy.dl', dealer.DealerID, Infinity);
				$(save_btn).addClass('saved');
				$('em', save_btn).html(self.config.translation.saved);
				view_all_btn.data('dealerEvent', self.showSavedDealer);
				$.publish('/analytics/link/', { 
        			title: omName,
        			link: this,
        			type: omType,
        			onclicks: omOnClick,
        			freq:freq
        		});		
				
			});


			$('.save-dealer .view-details').on('click', function(e) {
				e.preventDefault();
				$(this).parent().find('.popover').toggle();
			});

			// change hours for specified dept
			$('.select-dept', self.container).on('change', function(e) {
				var key = $(this).val(),
					schedList = $(this).closest(".dropdown").siblings(".hours-wrap").children(".sched");
				
				schedList.each(function(){
					if($(this).hasClass(key)){
						$(this).show();
					}else{
						$(this).hide();
					}
				});
			});
			$('.result-list.selected', self.container).show().siblings('.result-list').hide();
			$('.dealer-result-container', self.container).addClass('detailed');
			$(".filter-toggler", self.container).removeClass('trackable');

		},

		scrollToDealer: function(i, marker, isIcon, isPin) {

			var self = this,
				index = i-1,
				container = $('.result-list').not('.selected'),
				dealer = $('li', container).eq(index),
				map = self.mapController.map,
				pos = {};

			// pan to
			if (guxApp.tools.isAutoNaviMap()) {
				map.panTo(marker.marker.getPosition());
			}
			else {
				map.panTo(marker.getPosition());
			}
			if (dealer.is('.active')) return;

			if(self.is_mobile){
				if(isIcon){
					$("html,body").animate({
						scrollTop: $('.dealer-locator .dealer-unaware').offset().top
					});
				}
				if(isPin&&!$('.dealer-result-container .result-list:visible').hasClass('selected')){
					$("html,body").animate({
						scrollTop: dealer.offset().top - parseInt(dealer.css("margin-top"))
					});
				}
			} else {
				$('.result-list').not('.selected').animate({
					scrollTop: dealer.position().top
				});
			}
			if (map.markers.length) {
				map.deselectMarkers();
			}

			if(!guxApp.tools.isAutoNaviMap()) marker.select(3000);
			if (!self.is_mobile) marker.showInfoWindow();
			
			if(!guxApp.tools.isAutoNaviMap()) dealer.addClass('active').siblings().removeClass('active');

			window.setTimeout(function () {
			    $('.alt-theme .info-window .dealer-name').off('click').on('click', function (e) {
			        e.preventDefault();
			        self.showDealerCard(dealer);
			    });
			}, 500);
			

		},
		addDealerToList: function(dealer, container, index, self, map, mapController, is_preferred) {
			
			//this code is easy for tester to use mocked api data to test
			/*if($("#mocked-api").length == 1){
				var mockedData = $("#mocked-api").embeddedData();
				for(var i in mockedData){
					if(dealer.hasOwnProperty(i)){
						dealer[i] = mockedData[i]
					}
				}
			}*/
			
			dealer['hours'] = mapController.getDeptSchedule(dealer);
			
			$.extend(dealer, {
				address: mapController.makeDealerAddress(dealer, self.config.addressFormat),
				dealershipURL: mapController.makeDealerURL(dealer),
				index: index,
				is_preferred: self.is_savedDealer(dealer),
				is_mobile: self.is_mobile,
				is_open: mapController.is_dealerOpen(dealer, self.day),//false
				closeTime: mapController.getCloseTime(dealer, self.day),//undefinded
				govtTaxIDName: self.config.govtTaxIdName,
				mapURL: mapController.makeMapURL(dealer.location, mapController.currentLocationCoords)
			});
			
			dealer['day_str'] = [];
			dealer['day_str_translated'] = [];
			for (var i in self.config.translation.day_str) {
				dealer['day_str'].push(i);
				dealer['day_str_translated'].push(self.config.translation.day_str[i])
			}
			
			dealer['nextOpenTime'] = mapController.getNextOpenTime(dealer);//""
			var schedule = mapController.scheduleString(dealer, dealer.hours, self.day);//"Closed"
			dealer['schedule'] = schedule.description;
			dealer['scheduleType'] = schedule.type;
			dealer['vehicleOffer'] = self.getVehiOffer(dealer);
			dealer['phoneNumbers'] = (dealer['PrimaryPhone'] && dealer['PrimaryPhone'].length) ? dealer['PrimaryPhone'].split(/[;,]/g) : [];
			dealer['DealerAffiliation'] = dealer['DealerAffiliation'] || '';
			dealer['entityText'] = getDealerEntityTextByCategory(dealer['DealerAffiliation']);
			dealer['dealerNewVehicle'] = (dealer['DealerNewVehicle'] && dealer['DealerNewVehicle'].length) ? dealer['DealerNewVehicle'].replace(/\s/g, '').split(/[;,]/g) : [];

			function getDealerEntityTextByCategory(category) {
			    var text = '';
			    if (category) {
			        if ($('.color-lengend .' + category).length) {
			            text = $('.color-lengend .' + category).parent().text();
			        }
			    }
			    return text;
			}

			// checking if url is properly formatted
			if (guxApp.tools.isAutoNaviMap()) {
				if ((dealer.dealershipURL != "") && (dealer.dealershipURL.indexOf("http://") != 0)) {
					dealer.dealershipURL = "http://" + dealer.dealershipURL;
				}
			}
			else {
				if ((dealer.PrimaryURL != "") && (dealer.PrimaryURL.indexOf("http://") != 0)) {
					dealer.PrimaryURL = "http://" + dealer.PrimaryURL;
				}
			}
			

			var dealerElem = $(_.template($('#dealer-results').html(), dealer)),
				markerImages = {};
			if(self.config.markerImages && self.config.markerImagesAttribute){
				markerImages = self.config.markerImages[dealer[self.config.markerImagesAttribute]];
			}
			// add marker to map
			var marker = map.addGuxMarker(dealer.location, dealer.index, _.template($('#infobox-template').html(), dealer).toString(), function(dealer) {
				return function() {	
				    self.scrollToDealer(index, marker, false, true);
				}
			}(dealer),markerImages);

			$(container).append(dealerElem);
			if (self.is_selectLocation && self.hideDistanceByLocation) {
			    $('.distance', dealerElem).hide();
			}

			// embed data to element
			dealerElem.data(dealer);

			// scroll to dealer
			$('.dealer-icon .dealer-num', dealerElem).on('click', function() {
				if ($(dealerElem).is('.active')) return;
				self.scrollToDealer(index, marker,$(this).hasClass('dealer-num')?true:false);
			});
			
			// show detailed
			$('.details, .dealer-heading a', dealerElem).on('click', function(e) {
				e.preventDefault();
				self.scrollToDealer(index, marker);
				self.showDealerCard(dealerElem);
			});

			//init select 1st dealer by default
			if (is_preferred) {
				var _event = 'idle';
				/* if(guxApp.tools.isBingMap()){
					_event = 'viewchangeend';
				} */
				if(guxApp.tools.isAutoNaviMap()){
					_event = 'moveend';
				} 
				var handler = map.addListener(map.map, _event, function() {
					// geolocation.getCurrentPosition();
					// geolocation.watchPosition();
					self.scrollToDealer(index, marker);
					map.removeListener(handler);
				});

				$('.save-dealer-btn.saved em', dealerElem).text(self.config.translation.saved);
			}			

		},
		loadDealers: function(dealers) {

			var self = this,
				map = self.mapController.map,
				dealer_list = $('.result-list').find("> ul"),
				loadedDealers = self.loadedDealers || [],
				loadedDealersCount = loadedDealers.length,
				cached_dealers = dealers.slice(loadedDealersCount,loadedDealersCount+5),
				origin = {
					lat: self.mapController.currentLat,
					lng: self.mapController.currentLong
				};

			loadedDealers = _.union(loadedDealers, cached_dealers);
			self.loadedDealers = loadedDealers;

			// map.displayDealers(dealers);
			$.each(cached_dealers, function(i, dealer) {
				
				var index = i+loadedDealersCount+1;
				self.addDealerToList(dealer, dealer_list, index, self, map, self.mapController, index==1);

			});

			// add to view
			$('.dealer-result-container').show();
			if (guxApp.tools.isAutoNaviMap()) {
				var dealerBonds = [];
				$.each(loadedDealers,function(i,value){dealerBonds[i]=value._location});
				map.setBounds(dealerBonds,1);
			}
			else {
				map.setBounds(loadedDealers, 1);
			}
			if(_.size(dealers) < 5){
				map.setZoom(10);
			}

			if (dealers.length > loadedDealers.length) {
				$('.result-list').not('.selected').find('.dealer-view-more').show();
			} else {
				$('.result-list').not('.selected').find('.dealer-view-more').hide();
			}
		},

		autoCompleteTrigger: function(e) {

			var self = guxApp.dealerLocator,
				map = self.mapController.map,
				searchKey = $(this).val(),
				strlen = searchKey.length,
				search_panel = $('.search-panel'),
				location_limit = self.config.auto_suggest_limit,
				user_intent_delay = null,
				key = !e.charCode ? e.which : e.charCode;

			var keys_regex = new RegExp("^[a-zA-Z0-9]+$");
		    var str = String.fromCharCode(key).valueOf();

		    // prevent trigger if ctrl/alt key is pressed
		    if (e.altKey || e.ctrlKey || key == 17 || key == 18) return false;


		    if (user_intent_delay) {
		    	clearTimeout(user_intent_delay);
		    	user_intent_delay = null;
		    }


		    // arrow keys
		    if (key == 38 || key == 40) {

		    	switch(key) {
		    		case 38:
		    			var direction = true;
		    			break;
		    		case 40:
		    			var direction = false;
		    			break;
		    	}

		    	if ($('.dealer-disambiguation', self.container).is(':visible')) self.selectSuggestion(this, direction);

		    	return;
		    } 

			// enable predictive search
			if (!!searchKey && (/[A-Z]{2,}/.test(searchKey) || strlen >= self.config.autocomplete_char_count)) {
				// keys_regex.test(str) &&	

				user_intent_delay = setTimeout(function() {

		    		if ($('.input-panel', self.container).is('.active')) return false;

					guxApp.googleMapController.map.autocomplete(searchKey, location_limit, function(results) {//issue

						var locations = results.locations,
							dealers = _.pluck(results.dealers, "DealerName");

						if (locations.length || dealers.length) {
							guxApp.dealerLocator.showSuggestions(_.union(dealers, locations), search_panel);
						}

					});

				}, 300);

			}
		},

		selectSuggestion: function(field, up) {

			var suggestion_holder = $('.search-panel .dealer-disambiguation'),
				current_selected = $('li.active', suggestion_holder),
				next = (current_selected.next().length)?current_selected.next():$('li', suggestion_holder).eq(0),
				prev = (current_selected.prev().length)?current_selected.prev():$('li', suggestion_holder).eq($('li', suggestion_holder).length-1);

			current_selected = next;

			if (up) {
				current_selected = prev
			}
			
			current_selected.addClass('active').siblings().removeClass('active');
			$(field).val($('a', current_selected).text());

		},

		showSuggestions: function(suggestions, container) {

			$('.search-panel .error').hide();
			$('.dealer-result-container').hide();

			if (suggestions.length) {

				$('.dealer-disambiguation', container).show();
				$(".dealer-disambiguation ul", container).html(_.template($("#dealer-disambiguation").html(), {suggestions:suggestions}));
				$('.dealer-disambiguation a', $(container)).on("click", function(e) {
					
					e.preventDefault();

					$(".input-panel input[type=text]", container).val($(this).text());
					$('.dealer-disambiguation', container).hide();
					$(container).trigger('submit');

				});
			} else {
				$('.dealer-disambiguation', container).hide();
			}
		},

		getDealersByKeyword: function(keyword, matchParams) {

			var self = this,
				map = self.mapController.map,
				errmessage = self.config.error_message.dealer_not_found,
				matchParams = matchParams || {},
				containsParams = {},
				origin = {
					lat: self.mapController.currentLat,
					lng: self.mapController.currentLong
				};


			self.is_autoDetection = false;
			self.filters = [];

			$('.error', self.container).hide();

			if (keyword == "" || !keyword) {
				self.showError(self.config.error_message.blank_field);
				return;
			}

			if ($('.input-panel', self.container).is('.active')) return false;
			$('.input-panel', self.container).addClass('active');

			clearTimeout(map.autocompleteTimeout);
			map.autocompleteTimeout = null;
			
			self.mapController.searchDealersByKeyword(keyword, $('.input-panel input[type=text]', self.container), self.processResults, errmessage)

			self.loadedDealers = [];

			$('.input-panel input[type=text]', self.container).blur();
			
			self.closeTabs();

		},

		showError: function(errorText) {
			this.closeTabs();
			$('.dealer-result-container').hide();
			this.errorContainer.addClass("active").show().find('.text').text(errorText);//issue
		},

		getDealersFromCurrentLocation: function() {
			var self = this,
				map = self.mapController.map || null,
				searchField = $('.input-panel input[type=text]', self.container),
				errmessage = self.config.error_message.nearest_dealer_not_found,
				geoLocationTimeout = null;

			self.is_autoDetection = false;
			self.filters = [];
			self.closeTabs();
			self.mapController.cleanMap();

			$('.error', self.container).hide();

			if ($('.input-panel', self.container).is('.active')) return false;
			$('.input-panel', self.container).addClass('active');

			geoLocationTimeout = setTimeout(function() {
				self.showError(self.config.error_message.geolocation_error_timeout);
				$('.input-panel', self.container).removeClass('active');	
			}, 10000);

			if (!!navigator.geolocation) {
				
				navigator.geolocation.getCurrentPosition(function(position) {
					
					var lat = position.coords.latitude,
						lng = position.coords.longitude;

					self.loadedDealers = [];

					clearTimeout(geoLocationTimeout);
					geoLocationTimeout = null;

					self.mapController.getAddressStringFromCoord({ "lat":lat, "lng":lng}, function(result, status) {
							searchField.val(result);
							self.mapController.searchDealersByLocation(result, searchField, {},{},self.processResults, self.config.error_message.location_not_found);					

					});
												
				}, function(err) {
					
					clearTimeout(geoLocationTimeout);
					geoLocationTimeout = null;

					switch (err.code) {
						case err.PERMISSION_DENIED:
							self.showError(self.config.error_message.geolocation_error_denied);
							break;
						case err.POSITION_UNAVAILABLE:
							self.showError(self.config.error_message.geolocation_error);
							break;
						case err.TIMEOUT:
							self.showError(self.config.error_message.geolocation_error_timeout);
							break;
					}

					$('.input-panel', self.container).removeClass('active');

				}, { timeout:7000 });

			} else {
				clearTimeout(geoLocationTimeout);
				geoLocationTimeout = null;
				
				self.showError(self.config.error_message.geolocation_error_denied);
				$('.input-panel', self.container).removeClass('active');
			}

		},
		// 23/11/2015 : added is_hideTrack, if save/remove prefer dealers, will not track
		processResults: function(dealers, errmessage, is_filtered_results, is_detailed,is_hideTrack) {
			var self = guxApp.dealerLocator,
				map = self.mapController.map,
				subOpts = $(".sub-options",self.searchContainer),
				filterBar = $(".dealer-result-container .filter-header"),
				origin = {
					lat: self.mapController.currentLat,
					lng: self.mapController.currentLong
				};
				
			//detect whether it is url opened dealer
			if(is_detailed){
				filterBar.hide();
			} else {
				filterBar.show();
			}

			$('.input-panel', self.container).removeClass('active');

			if (!dealers || !dealers.length) {
				self.hasResults = false;
				self.colorLengend.removeClass("active");
				//auto detection dont need error message
				if (!self.is_autoDetection) { self.showError(errmessage); }
				subOpts.show();
				return false;
			}
			if(subOpts.length > 0){
				self.hasResults = true;
				subOpts.hide();
				$(".wrap .title",self.container).removeClass("active");
				self.colorLengend.addClass("active");
				self.errorContainer.removeClass("active");
				self.resultsContainer.removeClass("detailed");
				self.selResContainer.hide();
			}
			$('.dealer-map-field').addClass("show");
			$('.dealer-map-landing').addClass("hide");
			self.mapController.displayMap();
			
			// map.setCenter({ lat: origin.lat, lng: origin.lng });
			_.each(dealers, function(dealer, i) {
				_.defaults(dealer, { "distance":"", "ABN":"" });
			});

			if ($('.result-list.selected', self.container).is(':hidden')) $('.result-list').not('.selected').show();
			$('.dealer-disambiguation').hide();
			$('.search-panel .error').hide();
			$('.result-list > ul').empty();

			// guxApp.dealerLocator.cachedDealers = _.sortBy(dealers, "distance"); /* refactor this part*/
			if(!is_filtered_results) self.dealers = _.sortBy(dealers, "distance");

			// make the fave dealer appear as the first item of the list
			var saved_dealer = _.find(dealers, function(dealer) { return self.is_savedDealer(dealer); });
			

			if (_.size(saved_dealer)) {
				new_dealers = _.reject(dealers, function(dealer) { return self.is_savedDealer(dealer); });
				dealers = _.union(saved_dealer, new_dealers);
			}
			
			var	dealer_count = "", 
				dealer_count_text = self.config.dealer_count_message.no_dealer;
			if(dealers.length == 1){
				dealer_count = dealers.length;
				dealer_count_text = " "+self.config.dealer_count_message.single_dealer;
			}else if (dealers.length > 1) {
				dealer_count = dealers.length;
				dealer_count_text = " "+self.config.dealer_count_message.multiple_dealer;
			}
			$('.dealer-result-container .count .num').text(dealer_count);
			$('.dealer-result-container .count .msg').text(dealer_count_text);
			
			self.loadDealers(dealers);
			//gux omniture
			is_hideTrack = is_hideTrack || false;
			if(!is_hideTrack){
				$.publish('dealers-done');
			}
			
			var services_config = $('#services-config').embeddedData(),
				filters = self.filters || [];

			if (!is_filtered_results) {
				self.services = {};
				$.each(dealers, function(i, dealer) {

					_.each(services_config, function(service, key) {

						if (!!parseInt(dealer[key]) || dealer[key] === "Y" || dealer[key] === true) {
							self.services[key] = service;
						}
					});
				});
			}
			
			//hide filter tab if no filter
			if(!guxApp.tools.isEmpty(self.services)){
				//convert to array
				var services = [];
				for (var i in self.services){
					services.push(self.services[i]);
					services[services.length-1].key = i;
				}
				//sort service list (service in filter tab) in order
				services.sort(function(a,b){
					return parseInt(a.order) - parseInt(b.order);
				});
	
				$('.filter-services .group-list').html(_.template($('#services-template').html(), {services:services, filters:filters}));
				if($('.filter-header .filter-toggler').is(':hidden')){
					$('.filter-header .filter-toggler').show();
				}
			}else{
				$('.filter-header .filter-toggler').hide();
			}
			
			$.publish('uniform', {
				el: $('.filter-services input:checkbox', self.container),
				el_type: "rounded-checkbox"
			});

			// load more dealers
			$('.dealer-view-more', $('.result-list', self.container).not('.selected')).unbind().on('click', '.button', function(e) {
				
				var existing_dealers = $('.dealer-result').length;

				e.preventDefault();
				self.loadDealers(dealers);

			});

			$('.input-panel', self.container).removeClass('active');

		},

		displayRouteToDealerTrigger: function(e) {
			// event handler

			e.preventDefault();

			var self = guxApp.dealerLocator,
				map = self.mapController.map,
				dealer = $(this).parents('.dealer-result').data();

			map.displayRouteToDealer({lat: self.mapController.currentLat, lng: self.mapController.currentLong}, dealer);

		},

		closeTabs: function() {
			var self = this;

			$('.view-all-dealers', self.container).trigger('click');
			if ($('.dealer-filter-bar').is('.active')) $('.filter-toggler', self.container).triggerHandler('click');
			$('.dealer-disambiguation', self.container).hide();
			$('.error', self.container).removeClass("active");

		}
	};

	$(function(){

		// check if component exists
		if (!$('.dealer-locator').length) return;
		
		guxApp.dealerLocator.loading = true;

		var date = new Date();
		guxApp.dealerLocator.date = date;
		guxApp.dealerLocator.day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getDay()];

		$.subscribe('api-done', function() {
			guxApp.dealerLocator.init();
		});

	});
	
	//jQuery mobile will add "ui-link" to "a" tag which cause style issue.
	$(document).on("pageinit", function() {
		if (!$('.dealer-locator').length) return;
		
		$('.dealer-locator .ui-link').removeClass('ui-link');
		
		var self = this;

		if (!guxApp.dealerLocator.loading) {
			
			if ($('.dealer-map-field').is(":hidden")) $('.dealer-map-field').show();
			$.subscribe('api-done', function() {
				guxApp.dealerLocator.init();
			});

			//self.mapController.map = null;
			//self.mapController.mapContainer = null;
			//self.mapController.currentLocationCoords = null;

		}
		
	});

	$(document).on('pageshow', function() {
		//if (!guxApp.dealerLocator.loading) guxApp.googleMapController.init();
		guxApp.dealerLocator.loading = false;
	});

}(jQuery));



/*
 * functionalities of dealerlocator Bing
 * author : Ray
 * dependencies: jquery, underscorejs, uniformjs, bingMapController, bingMaps
 */
(function($) {
	/**
	 * to filter dealers
	 * @param dealers, dealer object, contains all dealer information
	 */
	guxApp.dealerLocator.resultsFiltering = function(dealers,errorMsg){
		var self = this,
			errmessage = errorMsg||self.config.error_message.nearest_dealer_not_found,
			dealerName = $("input[type='text']",".name-search"),
			dealerNamePlaceholder = dealerName.attr("placeholder-value"),
			dealerNameVal = dealerName.val(),
			dealerNameplateVal = $("select",".vehicle-search").val(),
			filteredByName = [],
			filteredByNameplate = [];
		//reset placeholder value on IE
		if(dealerNamePlaceholder && dealerNamePlaceholder == dealerNameVal){
			dealerNameVal = "";
		}
		
		//filter by dealerName
		if(dealerNameVal && dealerNameVal.length > 0){
			$.each(dealers,function(){
				if (guxApp.tools.isAutoNaviMap()) {
					if(this._name.indexOf(dealerNameVal) != -1){
						filteredByName.push(this);
					}
				}
				else {
					if(this.DealerName.indexOf(dealerNameVal) != -1){
						filteredByName.push(this);
					}
				}
			});
			dealers = filteredByName;
		}
		//filter by dealerNameplate
		if(dealerNameplateVal && dealerNameplateVal.length > 0){
			$.each(dealers,function(){
				if (guxApp.tools.isAutoNaviMap()) {
					if (this.DealerNewVehicle.toString().indexOf(dealerNameplateVal) != -1) {    //this.DealerSpeciality
						filteredByNameplate.push(this);
					}
				}
				else {
					if (this.DealerRangeNew.indexOf(dealerNameplateVal) != -1) {    //this.DealerSpeciality
						filteredByNameplate.push(this);
					}
				}
			});
			dealers = filteredByNameplate;
		}
		self.processResults(dealers,errmessage);
	};
	/**
	 * to get Province and City from pre defined json on the page
	 */
	guxApp.dealerLocator.getOptData = function(){
		var self = this,
			dataConfig = $("#cityDropdownData"),
			dataArr = [],
			province = $("select[name='province']",self.searchContainer),
			city = $("select[name='city']",self.searchContainer);
		//initial disable city
		city.prop("disabled","disabled").closest(".dropdown").addClass("disabled");
		if (dataConfig.length > 0 && dataConfig.embeddedData().list && dataConfig.embeddedData().list.length) {
			dataArr = dataConfig.embeddedData().list[0].states;
		}
		//import Province data
		if (dataArr.length > 0){
			$.each(dataArr,function(key,val){
				$("<option value='"+val[1].name+"'>"+val[1].name+"</option>").appendTo(province); 
			});
		}
		//import City data
		province.on("change",function(){
			var provinceVal = $(this).val(),
				endLoop = false;
			city.val("");//select the default value
			city.uniform.update();//update select val in uniform
			$.each(dataArr,function(key,val){
				if(provinceVal==val[1].name){
					city.children("option:gt(0)").remove();
					$.each(val[1].cities,function(key,val){
						$("<option value='"+val[1].name+"'>"+val[1].name+"</option>").appendTo(city);
					});
					endLoop = true;
				}
				if(endLoop){return false;}
			});
			//enable city
			province.val() == ""?city.prop("disabled","disabled").closest(".dropdown").addClass("disabled"):city.prop("disabled",false).closest(".dropdown").removeClass("disabled");
		});
	};
	/**
	 * to get Country and State&City from pre defined json on the page
	 */
	guxApp.dealerLocator.getOptDataQL = function(){
		var self = this,
			dataConfig = $("#countryCityDropdownData"),
			dataArr = [],
			country = $("select[name='country']",self.searchContainer),
			statecity = $("select[name='statecity']",self.searchContainer);
		//initial disable statecity
		statecity.prop("disabled","disabled").closest(".dropdown").addClass("disabled");
		if (dataConfig.length > 0 && dataConfig.embeddedData().list && dataConfig.embeddedData().list.length) {
			dataArr = dataConfig.embeddedData().list[0].countries;
		}
		//import Country data
		if (dataArr.length > 0){
			$.each(dataArr,function(key,val){
				$("<option value='"+val[1].name+"'>"+val[1].name+"</option>").appendTo(country); 
			});
		}
		//import State&City data
		country.on("change",function(){
			var countryVal = $(this).val(),
				endLoop = false;
			statecity.val("");//select the default value
			statecity.uniform.update();//update select val in uniform
			$.each(dataArr,function(key,val){
				if(countryVal==val[1].name){
					statecity.children("option:gt(0)").remove();
					if(val[1].cities.length>0) {
						$.each(val[1].cities,function(key,val){
							$("<option value=city>"+val[1].name+"</option>").appendTo(statecity);
						});
					}
					else if(val[1].states.length>0){
						$.each(val[1].states,function(key,val){
							$("<option value=state>"+val[1].name+"</option>").appendTo(statecity);
						});
					
					}
					endLoop = true;
				}
				if(endLoop){return false;}
			});
			//enable statecity
			country.val() == ""?statecity.prop("disabled","disabled").closest(".dropdown").addClass("disabled"):statecity.prop("disabled",false).closest(".dropdown").removeClass("disabled");
		});
	};
	/**
	 * get vehicle offering from data returned
	 * @param dealer, dealer object contains all dealer infomation
	 */
	guxApp.dealerLocator.getVehiOffer = function(dealer){
		var self = this,
			vehicleOffer = {};
		dealer.PerOwnedVehicle = "type1,type2";// mocked data ,needs to be removed
		if (dealer.DealerRangeNew && dealer.DealerRangeNew.length > 0) {  //dealer.DealerRangeNew
			vehicleOffer.newCars = {
				"name" : self.config.newCars,
				"value": dealer.DealerRangeNew.split(',')
			}
		}
		if(dealer.PerOwnedVehicle && dealer.PerOwnedVehicle.length > 0){
			vehicleOffer.preOwnedCars = {
				"name" : self.config.preOwnedCars,
				"value" : dealer.PerOwnedVehicle.split(',')
			}
		}
		return vehicleOffer;
	};
	
	$(function(){
		var self = guxApp.dealerLocator;
		self.mapWrapper = $(".dealer-locator.alt-theme");
		if(self.mapWrapper.length == 0){return;}
		
		self = guxApp.dealerLocator;
		self.hasResults = false;
		self.mapController = guxApp.googleMapController;
		self.searchContainer = $(".dealer-unaware",self.mapWrapper);
		self.resultsContainer = $(".dealer-result-container",self.mapWrapper);
		self.errorContainer = $(".error",'.location-search',self.searchContainer);
		self.selResContainer = $(".selected",self.resultsContainer);
		self.colorLengend = $(".color-lengend",self.mapWrapper);
		if(!$('.store-locator-form').length || !$("#countryCityDropdownData").length) {
		self.getOptData();
		}
		else {
		self.getOptDataQL();
		//quicklane get country and city list
		}
		
		$(".title",self.searchContainer).on("click",function(){
			var title = $(this),
				subOpt = title.siblings(".sub-options");
			//before animation
			if(self.hasResults){
				if(subOpt.is(":visible")){
					self.resultsContainer.show();
				}else{					  
					self.resultsContainer.hide();
				}
			}
			subOpt.slideToggle(function(){
				//after animation
				if(subOpt.is(":visible")){//expand suboptions
					title.addClass("active");
				}else{					  //collapse suboptions
					title.removeClass("active");
				}
			});
		});
		//click event has been used by uniform.
		// $(".sub-options label",self.searchContainer).on("mouseup",function(e){
			// if(e.button!=2){//prevent from right click
		$(".sub-options label",self.searchContainer).on("click",function(e){
				if(e.target.tagName==="INPUT") {
				var label = $(this),
					nestedOpt = label.siblings(".nested-options");
				//before animation
				if(nestedOpt.is(":hidden")){
					label.addClass("active");
				}else{
					label.removeClass("active");
				}
				nestedOpt.slideToggle(function(){
					//after animation
					if(nestedOpt.length > 0 && nestedOpt.is(":hidden")){//collapsed
						nestedOpt.find("select,input[type='text']").val("").uniform.update();;//remove value
					}
				});
			 }
		});
		
		//submit
		$(".actions-bar .button",self.searchContainer).on("click",function(e){
			var formDataArr = $("select",".location-search").serializeArray(),
				province = $("select[name='province']",self.searchContainer),
				city = $("select[name='city']",self.searchContainer),
				keywordStr = "",
				country = $("select[name='country']",self.searchContainer),
				statecity = $("select[name='statecity']",self.searchContainer);

			self.filters = [];
			self.closeTabs();
				
			e.preventDefault();
			if(!$('.store-locator-form').length || !$("#countryCityDropdownData").length) {
				if(province.val()==""||city.val()==""){
					province.closest(".location-search").find(".error").addClass("active").find('.text').text(self.config.error_message.isMandatory);//temp move errormsg to config
				}else{
					$.each(formDataArr,function(key,val){
						if(val.value!=""){
							keywordStr = keywordStr + val.value;
						}
					});
					self.loadedDealers = [];
					if (guxApp.tools.isAutoNaviMap()) {
					// Search based on center point of province and city  (dealer properties) --Autonavi map
					self.mapController.searchDealersByLocation(keywordStr, false, {AdministrativeArea: province.val()||"", Locality: city.val()||""}, {}, function (dealers,errorMsg) {
						self.is_selectLocation = true;
						self.resultsFiltering(dealers,errorMsg);
					});
					}
					else {
					// Search based on province and city (dealer properties) --Thailand google map
					self.mapController.searchDealersByProperties({AdministrativeArea: province.val(), Locality: city.val()}, {}, function(dealers,errorMsg) {
						self.is_selectLocation = true;
						self.resultsFiltering(dealers,errorMsg);
					});
					}
				}
			}
			else {
			//quicklane get country and city
				if(country.val()==""||statecity.val()==""){
					province.closest(".location-search").find(".error").addClass("active").find('.text').text(self.config.error_message.isMandatory);//temp move errormsg to config
				}else{
					self.loadedDealers = [];
					if(statecity.val()=='city') {
						self.mapController.searchDealersByProperties({Country: country.val(), Locality: $("select[name='statecity'] option:selected").text()}, {}, function(dealers,errorMsg) {
							self.is_selectLocation = true;
							self.resultsFiltering(dealers,errorMsg);
						});
					}
					else if(statecity.val()=='state') {
						self.mapController.searchDealersByProperties({Country: country.val(), AdministrativeArea: $("select[name='statecity'] option:selected").text()}, {}, function(dealers,errorMsg) {
							self.is_selectLocation = true;
							self.resultsFiltering(dealers,errorMsg);
						});
					}
				}
			}
		});

		if (sessionStorage['search_province']) {
		    $('select[name=province]', self.searchContainer).val(sessionStorage['search_province']).blur();
		    $('select[name=province]', self.searchContainer).change();
		    $('select[name=province]', self.searchContainer).uniform.update();
		    sessionStorage.removeItem('search_province');
		}
		if (sessionStorage['search_city']) {
		    $('select[name=city]', self.searchContainer).val(sessionStorage['search_city']).blur();
		    $('select[name=city]', self.searchContainer).uniform.update();
		    sessionStorage.removeItem('search_city');
		}
		if (sessionStorage['search_vehicle']) {
		    $('select[name=vehicle]', self.searchContainer).val(sessionStorage['search_vehicle']).blur();
		    $('select[name=vehicle]', self.searchContainer).uniform.update();
		    sessionStorage.removeItem('search_vehicle');
		}
		if (sessionStorage['search_location']) {
		    $('input[name=location]', self.searchContainer).val(sessionStorage['search_location']).blur();
		    sessionStorage.removeItem('search_location');
		}
		$.urlParam = function(name){
			    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
			    if (results==null){
			       return null;
			    }
			    else{
			       return results[1] || 0;
			    }
			};
		var specialitiesID = !!$.urlParam('specialities')?decodeURI($.urlParam('specialities')):'';
		
		if(guxApp.tools.isAutoNaviMap()){
			$(".vehicle-search label",self.searchContainer).addClass("active").siblings(".nested-options").slideToggle();
			$("#vehicle-search").attr("checked","true");
			$("#uniform-vehicle-search").children("span").addClass("checked");
			$(".name-search label",self.searchContainer).addClass("active").siblings(".nested-options").slideToggle();
			$("#name-search").attr("checked","true");
			$("#uniform-name-search").children("span").addClass("checked");
				
			if(specialitiesID.length!=0){
				var label = $(".vehicle-search label",self.searchContainer),
				nestedOpt = label.siblings(".nested-options");
				// label.addClass("active");
				// $("#vehicle-search").attr("checked","true");
				// $("#uniform-vehicle-search").children("span").addClass("checked");
				// nestedOpt.slideToggle(function(){
					//after animation
					if(nestedOpt.length > 0){//collapsed
						$(".vehicle-search label").siblings(".nested-options").find("select").find("option[value='"+specialitiesID+"']").attr("selected","true").click();
					}
				// });
			}
		}	

	});
}(jQuery));		
		


/*
Author: 		Jay Gauten
File name: 		googleMapController.js
Description: 	load google map
Dependencies: 	jQuery 
Usage: 			
*/


var guxApp = guxApp || {};

(function($) {

	guxApp.googleMapController = {
		init: function() {

			var self = this,
				APIconfig = {
					language : self.config.localisation,
					countryCode : self.config.country_code,
					countryCodes : self.config.country_code,
					imagePath : self.config.marker_image_path,
					countryBounds: self.config.country_bounds,
					autocompleteCallbackName: "googleAutocompleteCallbackName",
					dealerTableURL: self.config.dealer_table
				};
  			
  			self.mapAPI = new googleMapsApi(APIconfig);
			
			if ($('.dealer-locator').length) {
				self.mapContainer = $('.dealer-map-field')[0];
			} else if ($('.mini-dealer').length) {
				self.mapContainer = $('#map-container')[0];
			}

			if (!self.map && !!self.mapContainer) self.loadMap(self.mapContainer);

			$.publish('api-done');

		},
		loadMap: function(mapContainer) {

			var self = this;

			// initialize map
			var map = new self.mapAPI.map(mapContainer, {
				center: {
					lat: self.config.currentLat,
					lng: self.config.currentLong
				},
				scrollwheel: false,
				mapTypeControl: true,
			    mapTypeControlOptions: {
			        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
			        position: google.maps.ControlPosition.RIGHT_BOTTOM
			    },
			    panControl: true,
			    panControlOptions: {
			        position: google.maps.ControlPosition.TOP_RIGHT
			    },
			    zoomControl: true,
			    zoomControlOptions: {
			        position: google.maps.ControlPosition.RIGHT_TOP
			    },
			    scaleControl: true, 
			    streetViewControl: false,
				supressInfoWindows: true,
				zoom: parseInt(self.config.zoom_level)
			});

			self.map = map;
			
			if ($('.map-default', $('.dealer-locator')).length) $('.map-default', $('.dealer-locator')).remove();

			$.publish('map-api-done');

		},

		getCoordsFromAddressString: function(address, callback) {
			this.map.geocodeLocation(address, callback);
		},

		getAddressStringFromCoord: function(coords, callback) {
			this.map.reverseGeocode(coords, callback);
		},

		searchDealersByKeyword: function(keyword, container, callback, errmessage) {

		    guxApp.commonMapController.searchDealersByKeyword.call(this, keyword, container, callback, errmessage);

		},

		searchDealersByProperties: function(matchParams, containsParams, callback, errmessage) {

			var _self = this,
				map = _self.map,
				matchParams = matchParams || {},
				containsParams = containsParams || null;

			_self.cleanMap();
			_self.currentLocationCoords = null;
			
			if(_self.config.langFilter){
				matchParams.Language = _self.config.langFilter;
			}
			// add brand filter
			if(_self.config.brandFilter){
				matchParams.Brand = _self.config.brandFilter;
			}
			// add country filter
			if(_self.config.countryCodeFilter){
				// matchParams.CountryCode = _self.config.countryCodeFilter;
			}
			
			map.searchDealersByProperties(_self.config.limit, function(response) {
				callback(response, errmessage);
			}, matchParams, containsParams);

		},

		searchDealersByLocation: function(address, searchField, matchParams, containParams, callback, errmessage, isAutoDetection) {

			// method for auto detection

			var self = this,
				map = this.map,
				response = null,
				matchParams = matchParams || {},
				containParams = containParams || null;

			self.currentLocationCoords = null;

			var search = function(address) {
				map.geocodeLocation(address, function(locations) {

					// locations = _.filter(locations, function(location) { return !_.contains(location.types, "country"); });
					
					var currLocation = locations[0];

					if (!currLocation) {
						callback(false, errmessage);
						return false;
					} else if (_.contains(currLocation.types, 'country') && currLocation.description.toLowerCase() != address.toLowerCase()) {
						callback(false, self.config.error_message.location_not_found);
						return false;
					}
					
					if(isAutoDetection){
						//auto detection will prefill search input box
						searchField.val(currLocation.description);
					}
					
					self.currentLocationCoords = {
						lat: currLocation.lat,
						lng: currLocation.lng
					}
					
					self.searchForDealers(currLocation, self.config.radius, self.config.limit, matchParams, containParams, callback, self.config.error_message.nearest_dealer_not_found);
	
				});
			}
			
			//search by lat/lng
			if(typeof address == "object"){
				//conver lat/lng to address first.
				map.reverseGeocode(address,function(location){
					//restore coverted address
					search(location.address);
				});
			}else{//search by address
				search(address);
			}
		},

		searchForDealers: function(origin, radius, resultLimit, matchParams, containParams, callback, errormessage) {

			var _self = this,
				map = _self.map,
				distance_interval = 50,
				search_interval = 1,
				matchParams = matchParams || {},
				containParams = containParams || null;
			
			_self.reiterate = null;
			_self.cleanMap();
			
			if(_self.config.langFilter){
				matchParams.Language = _self.config.langFilter;
			}
			// add brand filter
			if(_self.config.brandFilter){
				matchParams.Brand = _self.config.brandFilter;
			}
			// add country filter
			if(_self.config.countryCodeFilter){
				// matchParams.CountryCode = _self.config.countryCodeFilter;
			}

			map.searchDealersByDistance(origin, radius, resultLimit, function(results) {

				if (results.length) {
					
					callback(results);

				} else {

					// iterate search until distance limit is reached
					if (radius <= _self.config.max_radius) {
						// notify user
						_self.reiterate = setTimeout(function() {
							_self.searchForDealers(origin, radius+distance_interval, resultLimit, matchParams, containParams, callback, errormessage);
						}, search_interval*1000);

					} else {
						// show error
						callback(false, errormessage);
					}

				}

			}, matchParams, containParams);

		},

		makeMapURL: function(destination, origin) {
			
			var self = this,
				map = this.map;
			return map.getDirectionsURL(destination, origin);

		},

		makeDealerURL: function(dealer) {

		    return guxApp.commonMapController.makeDealerURL.call(this, dealer);

		},

		makeDealerAddress: function(dealer, format) {

		    return guxApp.commonMapController.makeDealerAddress.call(this, dealer, format);

		},

		displayMap: function() {
			google.maps.event.trigger(this.map.map, 'resize');
		},

		cleanMap: function() {

			var map = this.map;

			map.deselectMarkers();
			map.clearMarkers(map.markers);
			map.clearRoutes();
			map.clearDealers();

		},

		open_dept: function(dept_hours) {
			
		    return guxApp.commonMapController.open_dept.call(this, dept_hours);

		},

		capitalize: function (string) {

		    return guxApp.commonMapController.capitalize.call(this, string);

		},

		is_dealerOpen: function (dealer, day) {

		    return guxApp.commonMapController.is_dealerOpen.call(this, dealer, day);

		},

		filterData: function(obj, filter) {
			
		    return guxApp.commonMapController.filterData.call(this, obj, filter);

		},

		getDeptSchedule: function(obj) {

		    return guxApp.commonMapController.getDeptSchedule.call(this, obj, guxApp.googleMapController);

		},

		strTotime: function(timeStr, return_time_obj) {

		    return guxApp.commonMapController.strTotime.call(this, timeStr, return_time_obj);

		},

		getCloseTime: function(dealer, day) {
			
		    return guxApp.commonMapController.getCloseTime.call(this, dealer, day);

		},

		getNextOpenTime: function(dealer) {

		    return guxApp.commonMapController.getNextOpenTime.call(this, dealer);

		},

		scheduleString: function(dealer, hours, day) {

		    return guxApp.commonMapController.scheduleString.call(this, dealer, hours, day);

		}

	};

	$(function() {
		
		// if (($('.dealer-locator').length==0 && $('.mini-dealer').length==0) || guxApp.tools.isBingMap() || guxApp.tools.isAutoNaviMap()) {return;}
		if (($('.dealer-locator').length==0 && $('.mini-dealer').length==0) || guxApp.tools.isAutoNaviMap()) {return;}
		
		var locator_config = $('#locator-config').embeddedData(),
			common_config = $("#common-config").embeddedData(),
			mapController = guxApp.googleMapController;
		
		mapController.config = locator_config;
		if (common_config.multiLanguage == true && common_config.language){
			mapController.config.langFilter = common_config.language;
		}
		// add brand filter
		mapController.config.brandFilter = common_config.brand?common_config.brand:"Ford";
		// add country filter
		mapController.config.countryCodeFilter = common_config.iso2country;

		mapController.map_loaded = false;

		mapController.currentLocationCoords = null;

		// load google map api
		var script = document.createElement('script');
  		script.type = 'text/javascript';


  		var clientMode = (!common_config.apiClient) ? 'client_id' : common_config.apiClient;

  		script.src = 'https://maps.googleapis.com/maps/api/js?' + clientMode + '=gme-fordmotorcompany2&libraries=places&language=' + locator_config.localisation + '&callback=guxApp.googleMapController.init';
  		document.body.appendChild(script);

  		// for modern browsers
  		script.onerror = function(a,b,c,d) {
  			var google = google || undefined;
  			$('.error', $('.dealer-locator, .mini-dealer')).show().find('.text').text(locator_config.error_message.map_not_loaded);
  			return;
  		}

  		// for ie8
  		script.onreadystatechange = function(a,b,c,d) {
  			// this.readyState, 
  			if (this.readyState == "loaded") {
  				if (!window.google) {
  					$('.error', $('.dealer-locator, .mini-dealer')).show().find('.text').text(locator_config.error_message.map_not_loaded);
  					return;
  				}
  			}
  		}


	});

	

})(jQuery);


/*
Author: 		Randell Quitain
File name: 		tools.js
Description: 	Global tools
Dependencies: 	jQuery
Usage: 			// encode a url string - param: url/string
				guxApp.tools.encode(uri);

				// decode a url string - param: url/string
				guxApp.tools.decode(uri);
				
				// get specifically the #rest-services data
				guxApp.tools.restServicesData();
				
				// get specifically the #common-config data
				guxApp.tools.commonConfigData();
				
				// get a custom x-json script data - param: x-json script id
				guxApp.tools.getEmbeddedData(id);
				
				// get object length - param: object
				guxApp.tools.getObjectLength(obj);

				// check if object is empty - param: object
				guxApp.tools.isEmpty(obj);

				// check if browser currently used is IE, returns boolean - param: IE version, comparison
				// is it IE8?
				guxApp.tools.isIE(8);

				// is it less than or equal to IE 6?
				guxApp.tools.isIE(7, 'lte');
				
				// cleans a object data that is not grouped based on its index suffix (billboard rest returns this kind of json structure), so for example;

				// if your data return is like this:

				var data = {
					"title_0": "Title 0",
					"desc_0": "Desc 0",
					"title_1": "Title 1",
					"desc_1": "Desc 1",
					"title_2": "Title 2",
					"desc_2": "Desc 2"
				}
				
				guxApp.tools.cleanData(data);

				// returns:

				{
					0: {
						"title_0": "Title 0",
						"desc_0": "Desc 0"
					},
					1: {
						"title_1": "Title 1",
						"desc_1": "Desc 1"
					},
					2: {
						"title_2": "Title 2",
						"desc_2": "Desc 2"
					}
				}

				// check if iOS browser, returns true if iOS
				Example: guxApp.tools.isIOS()?true:false;
				guxApp.tools.isIOS();

				//check if device is mobile [or not]
				guxApp.tools.isMobile();

				// Check if Site is Right To Left; Returns true if RTL
				guxApp.tools.isRTL();
				
				// Check if IE Browser, returns version number if yes and false if not/
				guxApp.tools.detectIE();

*/

var guxApp = guxApp || {};

(function($){
	guxApp.tools = {

		encode: function (uri) {
			if (!uri) { return null; }
			return encodeURIComponent(uri) || null;
		},
		decode: function (uri) {
			if (!uri) { return null; }
			return decodeURIComponent(uri) || null;
		},
		restServicesData: function() {
			if ($('#rest-services').length){
				return $('#rest-services').embeddedData();
			} else {
				return null;
			}
		},
		commonConfigData: function() {
			if ($('#common-config').length){
				return $('#common-config').embeddedData();
			} else {
				return null;
			}
		},
		getEmbeddedData: function(id) {
			if ($(id).length){
				return $(id).embeddedData();
			} else {
				return null;
			}
		},
		getObjectLength: function(obj) {
			var getLength = 0;
			for(var prop in obj) {
				(obj.hasOwnProperty(prop)) ? getLength++ : getLength;
			}
			return getLength;
		},
		isEmpty: function(obj) {
			for(var prop in obj) {
				if(obj.hasOwnProperty(prop))
					return false;
			}
			return true;
		},
		cleanData: function(data) {
			var cleaned = [];
			for(var key in data){
				var suffix = key.match(/\d/);
				// the following will create the new "group" in the master cleaned variable if it doesn't exist
				if(!cleaned[suffix]){cleaned[suffix] = {};}
				cleaned[suffix][key] = data[key];
			}
			return cleaned;
		},
		slugify: function(string) {
			/*
			 * this function converts a normal string to a slug format - lowercased, hyphened and sanitized
			 * ie. from: ABCD - (EFgh)
			 *       to: abcd-efgh
			 */

			// sanitize
			string = $.trim(string.replace(/([~!@#$%^&*()_-]+)(\s)?/g, ''));
			
			return string.toLowerCase().replace(/\s/g, "-");
		},
		isIE: function(version, comparison) {
			var cc = 'IE',
				b = document.createElement('B'),
				docElem = document.documentElement,
				isIE;

			if(version){
				cc += ' ' + version;
				if(comparison){ cc = comparison + ' ' + cc; }
			}

			b.innerHTML = '<!--[if '+ cc +']><b id="iecctest"></b><![endif]-->';
			docElem.appendChild(b);
			isIE = !!document.getElementById('iecctest');
			docElem.removeChild(b);
			return isIE;
		},
		detectIE: function(){
			var ua = window.navigator.userAgent;

		    var msie = ua.indexOf('MSIE ');
		    if (msie > 0) {
		        // IE 10 or older => return version number
		        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
		    }

		    var trident = ua.indexOf('Trident/');
		    if (trident > 0) {
		        // IE 11 => return version number
		        var rv = ua.indexOf('rv:');
		        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
		    }

		    var edge = ua.indexOf('Edge/');
		    if (edge > 0) {
		       // IE 12 (aka Edge) => return version number
		       return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
		    }

		    // other browser
		    return false;
		},
		loader: function(element) {
			element.prev('.loading').remove();
			element.removeClass('module-loader');
		},
		imageLoader: function(element, callback) {
			var imgLoad = imagesLoaded( element );
			imgLoad.on( 'always', function( instance ) {
				// show carousel nav
				if(guxApp.viewport.view !== "mobile" && $('.flex-direction-nav', element).length > 0) { $('.flex-direction-nav', element).show(); }
				if(typeof callback === "function") { callback(); }
			}).promise().done(function(){
				guxApp.billboardCarousel.init();
			});
		},
		isBingMap: function(){
			if(typeof (Microsoft) != "undefined" && typeof (Microsoft.Maps) != "undefined"){
				return true;
			}
			return false;
		},
		isAutoNaviMap: function(){
			if(typeof (AMap) != "undefined" && typeof (AMap.Map) != "undefined"){
				return true;
			}
			return false;
		},
		isIOS: function(){
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		getMonth: function() {

			// return current month in a number i.e. 6 (for July) and then add one to make 7 for July
			var d = new Date();
			return d.getMonth() + 1;
		},
		getYear: function() {

			// return current year in a four digit number i.e. 2015
			var d = new Date();
			return d.getFullYear();
		},
		numberCommas: function(num) {

			// convert a number to a string with commas
			num = num.toString().replace(/,/g, '');
			return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		},

		removeCommas: function(str) {

			// remove commas from a string and then convert to a number
			var removeCommas = str.replace(/,/g,'');
	    	return parseFloat(removeCommas, 10);
		},

		equalHeight: function(){
			var elem = arguments,
				maxHeight = 0;

			$(elem).each(function(){
				var self = $(this);

				if (self.outerHeight(true) > maxHeight){
					maxHeight = self.outerHeight(true);
				}
			});

			return maxHeight;
		},

		isMobile: function(){
			var isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/);
			return isMobile;
		},

		isRTL: function(){
			var rtl = $('body').hasClass('rtl');
			return rtl;
		}


	
	}

})(jQuery);


/*
Author: 		Ruiwen Qin
File name: 		viewport.js
Description: 	Find out the viewport width
Dependencies: 	jQuery 
Usage: 			Use guxApp.viewport.view for your condition. The value of guxApp.viewport is either mobile or tablet.
*/
var guxApp = guxApp || {};

(function($){
	guxApp.viewport = {
		view:'',
		init: function(){
			if ($(window).width() < 768){
				guxApp.viewport.view = "mobile";
			}
			else {
				guxApp.viewport.view = "tablet";
			}
			this.resize();
		},
		resize: function(){
			$(window).on("resize", function() {
				if ($(window).width() < 768){
					guxApp.viewport.view = "mobile";
				}
				else {
					guxApp.viewport.view = "tablet";
				}
			});
		}	
	}

	$(function(){
		guxApp.viewport.init();
	});

})(jQuery);


/*
 Author: 		Ray Huang
 File name: 		locationAware.js
 Description: 	auto detect user location by:
 address detection(dfy.u)->postCode detection(dfy.p)->IP detection(userInfo)
 Dependencies: 	jQuery, jquery.uniform.min.js, cookie.js
 Usage:
 */

var guxApp = guxApp || {};

(function($) {
	guxApp.locationAware = {
		/**
		 * detect location by :
		 * address detection(dfy.u)->IP detection(userInfo)
		 * @param callback, can be used if address detected
		 */
		locationDetection : function(callback) {
			//mocked cookie & sessionStorage for local testing
			//document.cookie=" dfy.u=%7B%22fn%22%3A%22TestOwner3%22%2C%22now%22%3A%22Mustang%22%2C%22s%22%3A%22OW%22%2C%22authid%22%3A%22311942%22%2C%22authby%22%3A%22005%3D%3D%3D%3D%3D%3D%3D%22%2C%22pcode%22%3A%22MUSTANG%22%2C%22pc%22%3A%223000%22%7D";
			//document.cookie=" dfy.u=%7B%22fn%22%3A%22TestOwner3%22%2C%22now%22%3A%22Mustang%22%2C%22s%22%3A%22OW%22%2C%22authid%22%3A%22311942%22%2C%22authby%22%3A%22005%3D%3D%3D%3D%3D%3D%3D%22%2C%22pcode%22%3A%22MUSTANG%22%2C%22pc%22%3A%22%22%7D";
			//document.cookie=" dfy.p=%7B%22fn%22%3A%22TestOwner3%22%2C%22pc%22%3A%22ggg%22%7D";
			//document.cookie=" dfy.p=%7B%22fn%22%3A%22TestOwner3%22%2C%22pc%22%3A%22%22%7D";
			//sessionStorage.setItem("dfy.p",'{"authState":"OW","pc":"2220"}');
			//sessionStorage.setItem("dfy.p",'{"authState":"OW","pc":""}');
			//document.cookie="userInfo=country_code=AU#region_code=SH#city=SHANGHAI#county=#zip=#latitude=-33.86#longitude=151.20";
			//document.cookie='userInfo=""';
			var self = this,
				mapController = guxApp.googleMapController,
				searchInput = $(".search-panel .input-panel input[type=text]"),
				searchKeyObj = {
					"dfy.u" : {
						"key" : ["pc"]
					},
					"userInfo" : {
						"key" : ["country_code", "latitude", "longitude"],
						"seperator" : "#"
					}
				};
			//switch between maps	
			/* if(guxApp.tools.isBingMap()){
				mapController = guxApp.bingMapController;
			}
			else  */if(guxApp.tools.isAutoNaviMap()) {
				mapController = guxApp.autonaviMapController;
			}
			//loadMap called before "mapController.init" callback, wait untill "mapController.init" has been loaded.
			var waitMap = setInterval(function() {
				if (mapController.mapAPI) {
					clearInterval(waitMap);
					var valueObj = {};
					//address detection(dfy.u)->postCode detection(dfy.p)->IP detection(userInfo)

					for (var i in searchKeyObj) {
						//address detection
						if (guxApp.cookie.get(i)) {
							valueObj = guxApp.cookie.getCookieVal(guxApp.cookie.get(i), searchKeyObj[i].key, searchKeyObj[i].seperator);
						} else {//if not in cookie, try search in sessionStorage
							if ( typeof sessionStorage != "undefined" && sessionStorage.getItem(i) != null) {
								valueObj = guxApp.cookie.getCookieVal(sessionStorage.getItem(i), searchKeyObj[i].key, searchKeyObj[i].seperator);
							}
						}

						if (searchKeyObj[i].key.length == 1) {
							var addressInfo = valueObj[searchKeyObj[i].key[0]];
						} else {
							var countryCode = $("#common-config").embeddedData().iso2country;
							if ((i == "userInfo") && valueObj.country_code && countryCode && (valueObj.country_code == countryCode)) {
								//var addressInfo = valueObj.latitude + "," + valueObj.longitude;
								var addressInfo = {
									lat : valueObj.latitude,
									lng : valueObj.longitude
								}
								searchInput.addClass("isIpDetection");
							}
						}
						
						//if location detected, jump out of the loop
						if (addressInfo) {break;}
					}
					//return address information in callback
					if(callback){callback(addressInfo,true);}
				}
			}, 1000);
		}
	}

})(jQuery); 


/*
Author: 		Doris Zhang
File name: 		commonMapController.js
Description: 	common method of mapcontroller
Dependencies: 	jQuery 
Usage: 			
*/


var guxApp = guxApp || {};

(function($) {

	guxApp.commonMapController = {
		
		searchDealersByKeyword: function(keyword, container, callback, errmessage) {

			var self = this,
				map = this.map,
				is_postcode = /^\d/.test(keyword),
				is_invalidAd = /[@#$%^*()_+]+/.test(keyword),
				moduleContainer = $('dealer-locator,mini-dealer');

			if (is_postcode) {

				self.searchDealersByLocation(keyword, container, null, null, callback, errmessage);

			} else {
				
				if(is_invalidAd){keyword="@";}
				self.searchDealersByProperties( {}, { DealerNameSearch: keyword.toLowerCase() }, function(dealer) {
					if (!dealer.length) {
						//search by property of country if address is country level 
						map.geocodeLocation(keyword, function(locations) {
							var currLocation = locations[0];
							if (currLocation&&_.contains(currLocation.types,'country')) {
								self.searchDealersByProperties({}, {Country:currLocation.description}, function(dealer) {
									if(!dealer.length){
										setTimeout(function() {
											self.searchDealersByLocation(keyword, container, null, null, callback, errmessage);
										}, 1000);
										return;
									} 
									else {
										callback(dealer);											
									}						
								});
							}
							else {
								setTimeout(function() {
											self.searchDealersByLocation(keyword, container, null, null, callback, errmessage);
										}, 1000);
										return;
							}
						});
						
					}
					else {
						callback(dealer);
					}
				});
			}	

		},
		makeDealerURL: function(dealer) {
			
			var params = dealer.DealerID,
				domain = this.config.lad_url || location.href,
				has_query_string = _.contains(domain, '?'),
				has_dealer_param = /(\?|\&)+(dealer)+\=/.test(domain);
			var dealerTrans = $("#dealer-translations").embeddedData();
			var pathRootUrl = dealerTrans.pathRootUrl;
			//if usePathUrl exist and true
			if (dealerTrans.usePathUrl && dealerTrans.usePathUrl == "true"){
				//console.log("usePathUrl is true");
				if (guxApp.tools.isAutoNaviMap()) {
				params = guxApp.tools.slugify(dealer._name) + "-" + params;
				params = ((dealer._address)? guxApp.tools.slugify(dealer._address)+"/":"") + params;
				params = ((dealer.Province)? guxApp.tools.slugify(dealer.Province)+"/":"") + params;
				
				}
				else {
				params = guxApp.tools.slugify(dealer.DealerName) + "-" + params; 
				params = ((dealer.Locality)? guxApp.tools.slugify(dealer.Locality)+"/":"") + params;
				params = ((dealer.AdministrativeArea)? guxApp.tools.slugify(dealer.AdministrativeArea)+"/":"") + params;
				
				}

				// if the domain has query string, this will insert the dealer param (<dealer code>/<dealer city>/<dealer name>)  between domain and query string 
				if (has_query_string) {
					var domainArr = domain.split("?");					
					return domainArr[0]  + "/" + params + "?" + domainArr[1];		
				};
			
				return domain  + "/" + params;
			}else {
				
				//console.log("usePathUrl is false");
				if (guxApp.tools.isAutoNaviMap()) {
				params = guxApp.tools.slugify(dealer._name) + "-" + params;
				params = ((dealer._address)? guxApp.tools.slugify(dealer._address)+"-":"") + params;
				params = ((dealer.Province)? guxApp.tools.slugify(dealer.Province)+"-":"") + params;

				}
				else {
				params = guxApp.tools.slugify(dealer.DealerName) + "-" + params;
				params = ((dealer.Locality)? guxApp.tools.slugify(dealer.Locality)+"-":"") + params;
				params = ((dealer.AdministrativeArea)? guxApp.tools.slugify(dealer.AdministrativeArea)+"-":"") + params;

				}
				if (has_query_string && has_dealer_param) {
					domain = domain.split(/(\?|\&)+(dealer)+\=/)[0];
					has_query_string=_.contains(domain, '?');
				};
				//repalce ominiture data
				if(_da&&_da.module&&_da.module.template&&domain.indexOf("intcmp")!=-1){
					if(domain.indexOf("STATUS")!=-1){
						domain = domain.replace(/STATUS/,_da.module.template);
					}
				}
				return domain + (has_query_string?"&":"?") + "dealer=" + params;
			}
			

			// dealership_url = location.href.split('?')[0]+"?dealer=";

		},

		makeDealerAddress: function(dealer, format) {

			var self = this,
				address = (format || "a l L A C p").split(/\s/),
				address_obj = {
					"a": _.reduce([
						dealer.AddressLine1,
						dealer.AddressLine2,
						dealer.AddressLine3
					], function(memo, a) { return memo + ((a)?" "+a:""); }),
					"l": (dealer.SubLocality?dealer.SubLocality:""),
					"L": (dealer.Locality?dealer.Locality:""),
					"A": (dealer.AdministrativeArea?dealer.AdministrativeArea:""),
					"C": (dealer.Country?dealer.Country: ""),
					"p": (dealer.PostCode?dealer.PostCode:"")
				};

			_.each(address, function(value, i) {

				var key_name = value.replace(/\W/g, ''),
					key_value = address_obj[key_name];

				if (!key_value) {
					address.splice(i, 1, " ");
					return;
				}
				//seperate each address info by ","   except the last address info
				if(i < address.length-1){
					key_value = key_value + ","
				}
				//as required country name such as "New Zealand" should not be displayed
				if(self.config.display_country && self.config.display_country == "N" && key_name == "C" ) {
					key_value = "";
				}
				
				value = value.replace(key_name.toString(), key_value);
				address.splice(i, 1, value);

			});

			return address.join(" ");

		},
        		
		open_dept: function(dept_hours) {
			
			var open_dept = false;

			for (key in dept_hours) {
				open_dept = dept_hours[key];
				break;
			}

			return open_dept;

		},

		capitalize: function(string) {
			if (string){
				return string.charAt(0).toUpperCase()+string.slice(1);
			}
		},

		is_dealerOpen: function(dealer, day) {
			var self = this,
				is_open = false,
				now = new Date();

			if (dealer.hours) {
				
				var dept = self.open_dept(dealer.hours),
					dept_name = self.capitalize(dept.key);
				
				if (!!parseInt(dealer[dept_name+day+"Open"]) || dealer[dept_name+day+"Open"] === "Y") {
					var dealer_time = self.strTotime(dealer[dept_name+day+"CloseTime"], true);
					is_open = Date.parse(now) <= Date.parse(dealer_time);
				}
			}

			return is_open;

		},

		filterData: function(obj, filter) {
			/*
			 * filter objects with specified filter pattern
			 * return: object of filtered objects
			 */

			var filtered_objects = false;

			for (var key in obj) {
				if (filter.test(key) && obj[key] != "") {
					
					if (!filtered_objects) filtered_objects = {};

					filtered_objects[key] = obj[key];

				}
			}

			return filtered_objects;

		},

		getDeptSchedule: function (obj, mapController) {

			var self = this,
				dept = {
					"sales": {
						pattern: /^Sales+\w+(Time|Open|Comments)$/,
						keys: ["HasSalesDepartmentPV", "HasSalesDepartmentCV","Used","ApprovedUsed"]
					},
					"service": {
						pattern: /^Service+\w+(Time|Open|Comments)$/,
						keys: ["HasServiceDepartmentPV", "HasServiceDepartmentCV"]
					},
					"parts": {
						pattern: /^Parts+\w+(Time|Open|Comments)$/,
						keys: ["HasPartsDepartment"]
					}
				},
				hours = false,
				displayHours = false;

			//this code is easy for tester to use mock api data to test
			if($("#mocked-api").length == 1){
				obj = $("#mocked-api").embeddedData();
			}	
			
			for (var key in dept) {

				displayHours = false;
				$.each(dept[key].keys,function(i,value) {
					displayHours = (obj[value]=="Y"||obj[value]=="1")? true:displayHours;
				})
				if (!displayHours) continue;

				// if (obj[dept[key].keys[0]] === "N" || obj[dept[key].keys[0]] === "0" || !obj[dept[key].keys[0]]) continue;

				
				var deptHours = self.filterData(obj, dept[key].pattern);

				if (!hours) hours = {};
				for (var deptDay in deptHours) {
					if (!hours.hasOwnProperty(key)) {
						hours[key] = {
							"name": self.config.translation[key],
							"key": key
						};
					}

					hours[key][deptDay] = (deptDay.indexOf("OpenTime")!=-1||deptDay.indexOf("CloseTime")!=-1)&&(/^\d{4}$/.test(deptHours[deptDay]) || /\d{2}\:\d{2}/.test(deptHours[deptDay]))? mapController.strTotime(deptHours[deptDay]) : deptHours[deptDay];
				}

			}

			return hours;
		},

		strTotime: function(timeStr, return_time_obj) {

			if (!timeStr) return;

			timeStr = timeStr.replace(':','');

			var self = this,
				date = new Date(),
				hours = parseInt(timeStr,10)/100,
				minutes = parseInt(timeStr,10)%100
				time = null;

			time = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes, 00, 00);

			if (return_time_obj) return time;

			hours = time.getHours();
			minutes = time.getMinutes().toString();

			return ((hours>12)?hours-12:((hours==0)?12:hours))+":"+((minutes.length<=1)?"0"+minutes:minutes)+((hours>=12)? self.config.translation.evening_suffix: self.config.translation.morning_suffix);

		},

		getCloseTime: function (dealer, day) {
			var self = this,
				closeTime = false;

			if (dealer.hours) {
				var dept = self.open_dept(dealer.hours);
				closeTime = self.strTotime( dealer[ self.capitalize(dept.key) +day+"CloseTime"])
			}

			return closeTime;
		},

		getNextOpenTime: function (dealer) {

			var self = this,
				day = (new Date()).getDay(),
				next_open = "";

			if (dealer.hours) {
				var dept = self.open_dept(dealer.hours),
					dept_name = self.capitalize(dept.key);

				for (var i = day+1, counter=0; counter < 7; counter++) {
					if (!!parseInt(dealer[dept_name+dealer.day_str[i]+"Open"]) || dealer[dept_name+dealer.day_str[i]+"Open"] === "Y") {
						next_open = dealer.day_str_translated[i] + " " + self.strTotime(dealer[dept_name+dealer.day_str[i]+"OpenTime"]);
						break;
					}
					i = (i >= 6)?0:i+1;
				};
			}

			return next_open;
		},

		scheduleString: function(dealer, hours, day) {

			var self = this,
				date = new Date(),
				curTime = parseInt(date.getHours().toString()+date.getMinutes().toString()),
				scheduleString = {
					type : "",
					description: self.config.translation.closed_str
				};

			if (dealer.hours) {
				
				var dept = self.open_dept(hours),
					dept_name = self.capitalize(dept.key),
					dept_val = self.capitalize(dept.name),
					closeTime = dealer[dept_name+day+"CloseTime"]?parseInt(dealer[dept_name+day+"CloseTime"],10):2459;


				if ((!!parseInt(dealer[dept_name+day+"Open"]) || dealer[dept_name+day+"Open"] === "Y") && (curTime < closeTime)) {

					if (!dealer.closeTime) {
						scheduleString.description = "";
					} else {
						scheduleString.type = dept_val + " ";
						scheduleString.description = self.config.translation.open_until + dealer.closeTime;
					}
				} else if (dealer.nextOpenTime) {
					scheduleString.type = dept_val + " ";
					scheduleString.description = self.config.translation.reopen_on + dealer.nextOpenTime;
				}
				
			}


			return scheduleString;
		}

	};

	

})(jQuery);


/*
Author: 		Ray Huang
File name: 		uniform.js
Description: 	bind uniform UI to specified element
Dependencies: 	jQuery, jquery.uniform.min.js
Usage: 			
*/

var guxApp = guxApp || {};

(function($){
	var uniform = {
		/**
		 * bind uniform UI for existing dom element goes here.
		 * for those delegated elements, please use "bindTo" function
		 */
		init: function(){
			var self = this;
				//to exclude those non custom uniform elements
				wrapper = ".uniform",
				elementObj = {
					//type 	:  element
					"select" : "select",
					"checkbox" : "input[type=checkbox]",
					"radio-round" : "input[type=radio].round",
					"radio-square" : "input[type=radio].square"
				}
			
			for (var i in elementObj){
				self.bindTo($(wrapper + " " + elementObj[i]),i);
			}
			
			$.subscribe("uniform", function(ev, obj, c, d) {
				self.bindTo(obj.el, obj.el_type);
			});
			
		},
		/**
		 * bind uniform UI to specified element,
		 * @param el, jquery Object, the specified element
		 * @param type, string, the type to define what option should be passed to uniform UI
		 */
		bindTo: function(el, type) {

			var self = this,
				option = {};
			
			switch (type)
			{
				case "select" :
					option.selectAutoWidth = false;
					option.selectClass = "dropdown";
					break;
				case "radio-square" :
					option.radioClass = "radio square";
					break;
				/* custom option example:
				case "checkbox" :
					option.checkboxClass = "checkbox";
					option.checkedClass = "selected";
					break;
				*/
			}
				
			el.uniform(self.isEmptyObject(option)?null:option);
		},
		/*
		* check whether the object is empty
		* @param obj, object need to be checked
		*/
		isEmptyObject: function(obj) {
			for (var n in obj) {
				return false
			}
			return true;
		}	
	}

	$(function(){
		uniform.init();
	});

})(jQuery);


/*
Source: 		http://stackoverflow.com/questions/5771742/underscore-js-templates-within-jsp
File name: 		underscoreInterpolate.js
Description: 	Change Underscore's template settings to use different symbols to set off interpolated code that doesn't conflict with jsp
Usage: 			Use <@ @> instead of Underscore's default <% %>
*/

var guxApp = guxApp || {};

(function($){
	guxApp.interpolate = {
		init: function(){
			_.templateSettings = {
				interpolate: /\<\@\=(.+?)\@\>/gim,
				evaluate: /\<\@([\s\S]+?)\@\>/gim,
				escape: /\<\@\-(.+?)\@\>/gim
			};
		}
	}

	$(function(){
		guxApp.interpolate.init();
	});

})(jQuery);


/*
 * jQuery way to fix placeholder not work on older browsers. for example IE8
 * author : Ray
 * dependencies: jquery, Modernizr
 */

(function($) {
	var placeholder = {
		init : function() {
			if(!Modernizr.input.placeholder){
				$('[placeholder]').focus(function() {
					var input = $(this);
					if (input.val() == input.attr('placeholder-value')) {
						input.val('');
						input.removeClass('placeholder');
					}
				}).blur(function() {
					var input = $(this);
					//page load, store placeholder value to new attribute
					if(!input.attr('placeholder-value')){input.attr('placeholder-value',input.attr('placeholder'));}
					if (input.val() == '' || input.val() == input.attr('placeholder-value')) {
						input.addClass('placeholder');
						input.val(input.attr('placeholder-value'));
					}
				}).blur();
				
				// prevent placeholder value from submit
				$('[placeholder]').parents('form').submit(function() {
					$(this).find('.placeholder').each(function() {
						var input = $(this);
						if (input.val() == input.attr('placeholder-value')) {
							input.val('');
						}
					})
				});
			}
		}
	}

	$(function() {
		placeholder.init();
	});
})(jQuery);


/*
Author: 		Ruiwen Qin
File name: 		mapcontroller.js
Description: 	load bing map
Dependencies: 	jQuery 
Usage: 			NOT BEING USED IN GUX
*/

var guxApp = guxApp || {};

(function($){
	guxApp.mapController = {
		init: function(){
			if(!$("#map-container").length) {return;}

			var mapContainer = $("#map-container"),
				windowWidth = $(window).width(),
				mapContainerHeight = windowWidth * 0.37;

			if ($(window).width() < 1024) {
				mapContainerHeight = windowWidth * 0.8;
			}

			mapContainer.css("height", mapContainerHeight); //set the height of the map container as 40% of its width

			if ($("#map-options").length){
				mapOptions = $("#map-options").embeddedData(); //read the map configuration data
			}

			//create the map object
			map = new Microsoft.Maps.Map(document.getElementById("map-container"),
				{
					credentials: mapOptions.credentials,
					center: new Microsoft.Maps.Location(mapOptions.lat,mapOptions.lng),
					mapTypeId: Microsoft.Maps.MapTypeId.road,
					showMapTypeSelector: mapOptions.showMapTypeSelector,
					zoom:mapOptions.zoom
				});


			dataLayer = new Microsoft.Maps.EntityCollection();
			map.entities.push(dataLayer);

			//add infobox popup
			infoboxLayer = new Microsoft.Maps.EntityCollection();
			map.entities.push(infoboxLayer);

			infobox = new Microsoft.Maps.Infobox(new Microsoft.Maps.Location(0, 0), { visible: false, offset: new Microsoft.Maps.Point(0, 20) });
			infoboxLayer.push(infobox);

			guxApp.mapController.dropPins();
		},
		dropPins: function(){
			//read dealers information
			if ($("#pins-data").length){
				var pins = $("#pins-data").embeddedData();
			}

			var pushpinOptions = {
				icon: ''
			};

			var locs = [];

			// loop through pushpins
			for (var pin in pins){
				pushpinOptions.text = String(parseInt(pin)+1);
				pushpinOptions.typeName = pins[pin].id;
				pushpinOptions.id = pins[pin].id;

				var pushpin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(pins[pin].latitude,pins[pin].longitude),pushpinOptions);
								
				Microsoft.Maps.Events.addHandler(pushpin, 'click', guxApp.mapController.displayInfobox); //bind click event onto pins

				locs.push(pushpin.getLocation());

				dataLayer.push(pushpin);
			}

			var bestview = Microsoft.Maps.LocationRect.fromLocations(locs);

			map.setView({bounds:bestview});
		},
		displayInfobox: function(e){

			if (e.targetType == 'pushpin') {

                infobox.setLocation(e.target.getLocation());

                //read dealers information
				if ($("#pins-data").length){
					var dealer = $("#pins-data").embeddedData();
				}
				
				var tmpl 	= _.template(guxApp.mapController.template),
					pinNum 	= e.target._text - 1;

                // display infobox and inject relevant HTML
                infobox.setOptions({ 
					visible: 		true, 
					htmlContent: 	tmpl(dealer[pinNum]),
					offset: 		new Microsoft.Maps.Point(28,-174)
				});

				var directionsLnk 	= $(".infobox").find(".directions a"),
					bingURL 		= "http://www.bing.com/maps/default.aspx?rtp=pos." + guxApp.mapController.currentLat + "_" + guxApp.mapController.currentLong + "~pos." + dealer[pinNum].latitude + "_" + dealer[pinNum].longitude + "&style=r";
				
				directionsLnk.attr("href", bingURL);
            }
		},
		addDirections: function(){
			if ($("#pins-data").length){
				var dealers = $("#pins-data").embeddedData();
			}
			
			var listItems 		= $(".dealer-items .slides > li:not('.clone')"),
				preferredLat	= dealers[0].latitude,
				preferredLong	= dealers[0].longitude,
				preferredURL 	= "http://www.bing.com/maps/default.aspx?rtp=pos." + guxApp.mapController.currentLat + "_" + guxApp.mapController.currentLong + "~pos." + preferredLat + "_" + preferredLong + "&style=r";

			// inject preferred dealer directions bing URL
			$(".preferred-dealer, .bing-directions").attr("href", preferredURL);

			// loop through mobile dealer list items and inject relevant dealer directions bing URL
			listItems.each(function(idx, litem) {
				var directionsBtn 	= $(litem).find("a.bing-directions"),
				bingURL 		= "http://www.bing.com/maps/default.aspx?rtp=pos." + guxApp.mapController.currentLat + "_" + guxApp.mapController.currentLong + "~pos." + dealers[idx].latitude + "_" + dealers[idx].longitude + "&style=r";
				
				directionsBtn.attr("href", bingURL);
			});
		}
	};

	$(function(){
		// since geolocation/ip location is not implemented at this time, dummy latitude (currentLat) and 
		// longitude (currentLong) are used below for the current users location (dummy location is Sydney 2000)
		guxApp.mapController.currentLat 	= -33.874001;
		guxApp.mapController.currentLong 	= 151.203003;

		// set HTML template for dealer infobox's
		guxApp.mapController.template = $("#infobox-template").html();

		$(".mini-dealer .revealer-open").on("click", function() {
			if ($(this).hasClass("active")) {
				guxApp.mapController.init();
			}
		});

		// function that adds bing URL with route to each directions link/button
		// run on document load
		if ($("#pins-data").length){
			guxApp.mapController.addDirections();
		}
	});

})(jQuery);


/*
Author: 		Randell Quitain
File name: 		component-locate-dealer.js
Description: 	Display or suppress Locate a Dealer component
Dependencies: 	jQuery
Usage: 	

* History
* 2015/12/11, Steven Xue, SMW - INC000015398018 - REQ #6689341 - Dragonfly Front end issue about dealer telephone number not display the sam, Line 248, remove .replace(/\s/g, '')		
*/

var guxPersonalisation = guxPersonalisation || {};

(function($){


	guxPersonalisation.locatedealer = {

		// each component requires an init function 
		init: function(element) {
			
			$(element).hide();
			
			var self = this,
 				// dealerLocator = guxApp.dealerLocator,
 				miniDealerContainer = element,
 				// mapController = guxApp.tools.isBingMap()?guxApp.bingMapController:guxApp.googleMapController,
				mapController = guxApp.tools.isAutoNaviMap()?guxApp.autonaviMapController:guxApp.googleMapController,
				map = mapController.map || null,
				searchField = $('.input-panel input[type=text]', miniDealerContainer);

			miniDealerContainer.hide();

			self.container = miniDealerContainer;
			self.config = mapController.config;
			self.mapContainer = $('#map-container')[0];
			self.mapController = mapController;

			self.day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][(new Date()).getDay()];

			this.ruleEngine(element);

			self.is_mobile = guxApp.viewport.view == "mobile";

			// init UI
 			$('.search-panel .btn-current', miniDealerContainer).on('click', function(e) {
 				e.preventDefault();
 				self.searchByPosition(searchField);
 			});

 			$('.search-panel', miniDealerContainer).on('submit', function(e) {
				e.preventDefault();
				// setTimeout(function(){				
				self.searchDealersByKeyword($('.keyword-field', miniDealerContainer).val(), false);
				// },3000);
				return false;
			});

			$('.btn-search', miniDealerContainer).on('click', function(e) {
				if ($(this).is('.trackable') && !e.originalEvent) return false;
			});

			searchField.on('focus', function() {
				var elem = this,
					placeholder = $(elem).attr('placeholder'),
					value = $(elem).val();
				
				if ($(elem).attr('placeholder')) {
					$(elem).data('placeholder', placeholder);
					$(elem).removeAttr('placeholder');
				}

				// if (value) {
				// 	$(elem).data('data', value);
				// 	$(elem).val('');
				// }

			});

			searchField.on('blur', function() {
				var elem = this,
					placeholder = $(elem).attr('placeholder'),
					value = $(elem).val();

				if (!value) {
					// if ($(elem).data('data')) {
					// 	$(elem).val($(elem).data('data'));
					// } else {
						$(elem).attr('placeholder', $(elem).data('placeholder'));
					// }
				}

			});

			$('.input-panel input[type=text]', miniDealerContainer).on('keyup', self.autoCompleteTrigger);

			if (guxPersonalisation.locatedealeralt) {
			    guxPersonalisation.locatedealeralt.init(self);
			}

		},
		ruleEngine: function(element) {

			var self = this,
				mapController = self.mapController;

			// loader
			guxPersonalisation.rest.loader(element);

			// if (guxPersonalisation.psn.profile.authState === "OW") {

				// element.hide();

			// } else {

				// element.hide();
				if (guxPersonalisation.psn.profile.authState === "AN") {

					// element.show();
					
					// temp
					var locationAware = false;

					// reset blocks
					// location aware initialization

					guxApp.locationAware.locationDetection(function(addressInfo, isAutoDetection){
						if(!guxApp.tools.isAutoNaviMap()&&addressInfo){
							mapController.searchDealersByLocation(addressInfo, $('.input-panel input[type=text]', self.container),{},{}, function(results, response) {

								// location not found
								if (!results) {
									self.showError( (response)?response:self.config.error_message.location_not_found);
									return false;
								}

								self.is_autoDetection = isAutoDetection;

								self.processResults(results);

							}, null, true);
							
						} else {
							element.show();
						}
					});
				}

			// }
		},

		selectMarker: function(marker, number_icon) {

			var	self = this,
				mapController = self.mapController,
				map = mapController.map;

			map.deselectMarkers();
			if(!guxApp.tools.isAutoNaviMap()) marker.select();
			map.panTo(marker.getPosition());

			if(!self.is_mobile) marker.showInfoWindow();

			$('.listing-number.active', self.container).removeClass('active');
			number_icon.addClass('active');

		},

		initMarkerIcon: function(dealer, index, number_icon, is_featured) {
			var self = this,
				container = $(self.container),
				mapController = self.mapController,
				map = mapController.map,
				marker;

			marker = map.addGuxMarker(dealer.location, index, _.template($('#infobox-template').html(), dealer), function(dealer) {
				return function() {
					self.selectMarker(marker, number_icon);
					
				}
			}(dealer));
			
			number_icon.on('click', function() {
				self.selectMarker(marker, number_icon);
			});

			return marker;

		},

		
 		processResults: function(dealers, errmessage) {

 			var self = guxPersonalisation.locatedealer,
 				container = $(self.container),
 				mapController = self.mapController,
				map = mapController.map,
				selected_marker = 0,
				map_is_open = false,
				origin = {
				    lat: self.mapController.currentLat,
				    lng: self.mapController.currentLong
				};

			var slides_container = $('.slides', container);

			if (!dealers.length) {
				self.showError(errmessage);
				$('.input-panel', self.container).removeClass('active');
				return;
			}

			var limit_dealers = dealers.slice(0,5);
			$.each(limit_dealers, function(i, dealer) {

				dealer['hours'] = mapController.getDeptSchedule(dealer);
				
				var index = i;
				
				$.extend(dealer, {
					address: mapController.makeDealerAddress(dealer, self.config.addressFormat),
					dealershipURL: mapController.makeDealerURL(dealer),
					index: index,
					is_mobile: self.is_mobile,
					is_open: mapController.is_dealerOpen(dealer, self.day),
					closeTime: mapController.getCloseTime(dealer, self.day),
					mapURL: mapController.makeMapURL(dealer.location, mapController.currentLocationCoords)
				});
				
				dealer['day_str'] = [];
				dealer['day_str_translated'] = [];
				for (var i in self.config.translation.day_str) {
					dealer['day_str'].push(i);
					dealer['day_str_translated'].push(self.config.translation.day_str[i])
				}

				// checking if url is properly formatted
				if ((dealer.PrimaryURL != "") && (dealer.PrimaryURL.indexOf("http://") != 0)) {
					dealer.PrimaryURL = "http://" + dealer.PrimaryURL;
				}

				if (!dealer['distance']) {
                	dealer['distance'] = "";
                }

				dealer['nextOpenTime'] = mapController.getNextOpenTime(dealer);
				var schedule = mapController.scheduleString(dealer, dealer.hours, self.day);
				dealer['schedule'] = schedule.description;
				dealer['scheduleType'] = schedule.type;
				dealer['phoneNumbers'] = (dealer['PrimaryPhone'] && dealer['PrimaryPhone'].length) ? dealer['PrimaryPhone'].split(';') : [];
				dealer['dealerNewVehicle'] = (dealer['DealerNewVehicle'] && dealer['DealerNewVehicle'].length) ? dealer['DealerNewVehicle'].replace(/\s/g, '').split(/[;,]/g) : [];
			});
			
			// show featured nearest
			var featured_dealer = limit_dealers[0],
				other_dealers = _.rest(limit_dealers),
				featured_dealer_elem = _.template($('#preferred-dealer-template').html(), featured_dealer),
				number_icons = [];

			var preferred = $('.preferred-dealer', container).html(featured_dealer_elem),
				featured_number_icon = $('.listing-number', preferred);
			
			$('.slides .preferred .item', container).html(_.template($('#preferred-dealer-mobile-template').html(), featured_dealer));
			featured_number_icon.addClass('active');

			var featured_marker = self.initMarkerIcon(featured_dealer, 1, featured_number_icon, true);


			// other dealers
			_.each(other_dealers, function(dealer, i) {

				var index = i + 2;

				dealer["index"] = index;

				var dealerElem = $(_.template($('#other-dealers-template').html(), dealer)),
					number_icon = $('.listing-number', dealerElem);

				slides_container.append(dealerElem);
				self.initMarkerIcon(dealer, index, number_icon);

			});
			if (_da&&_da.module&&_da.module.template){
				$("section.personalisation a[href*='intcmp='],section.smartnextsteps a[href*='intcmp=']").each(function(idx){
					var attrHref = $(this).attr("href");
					var temp = "STATUS";
					if(attrHref.indexOf(temp)!=-1){	
						$(this).attr("href",attrHref.replace(temp,_da.module.template));
					}	
				});
			}
			
			self.container.show();
			self.showLocationAwarePanel();

			$('.revealer-open', container).on('click', function(e) {

				mapController.displayMap();
				map.setCenter({ lat:featured_dealer.location.lat, lng:featured_dealer.location.lng});
				
				if (!map_is_open) {
					// map.setZoom(10);
					featured_marker.select();
					if(!self.is_mobile) featured_marker.showInfoWindow();

					map_is_open = true;
					map.setZoom(10);
					// map.setBounds(dealers, 1);
				}

				e.preventDefault();
				return false;

			});

			$('.link-search', container).on('click', function(e) {
				sessionStorage['dealers'] = JSON.stringify(dealers);
				sessionStorage['search_keyword'] = $('.input-panel').find('.keyword-field').val();
			});

			$('.input-panel', self.container).removeClass('active');

			guxApp.billboardCarousel.init();
		},

		searchByPosition: function(searchField, oncompletecallback) {
 			// event handler for search dealers from current position

 			var self = this,
 				// dealerLocator = guxApp.dealerLocator
 				container = self.container,
				mapController = self.mapController,
				map = mapController.map || null,
				errmessage = self.config.error_message.nearest_dealer_not_found,
				geoLocationTimeout = null;

			$('.error', self.container).hide();

			if ($('.input-panel', self.container).is('.active')) return false;
			$('.input-panel', self.container).addClass('active');

			if (!!navigator.geolocation) {

				navigator.geolocation.getCurrentPosition(function(position) {
										
					var lat = position.coords.latitude,
						lng = position.coords.longitude;

					clearTimeout(geoLocationTimeout);
					geoLocationTimeout = null;

					mapController.getAddressStringFromCoord({ "lat": lat, "lng": lng }, function (result, status) {
						
							searchField.val(result);
							if (oncompletecallback && $.isFunction(oncompletecallback)) {
							mapController.searchDealersByLocation(result, searchField, {},{},function (dealers, status) {
								oncompletecallback(dealers, status);
            						});	
							}
							else {
							mapController.searchDealersByLocation(result, searchField, {},{},self.processResults, self.config.error_message.location_not_found);
							}

					});


				}, function(err) {

					clearTimeout(geoLocationTimeout);
					geoLocationTimeout = null;

					if (oncompletecallback && $.isFunction(oncompletecallback)) {
					    oncompletecallback(false, err);
					}

					switch (err.code) {
						case err.PERMISSION_DENIED:
							self.showError(self.config.error_message.geolocation_error_denied);
							break;
						case err.POSITION_UNAVAILABLE:
							self.showError(self.config.error_message.geolocation_error);
							break;
						case err.TIMEOUT:
							self.showError(self.config.error_message.geolocation_error_timeout);
							break;
					}
					
					$('.input-panel', self.container).removeClass('active');

				}, { timeout: 7*1000 });


			} else {
				clearTimeout(geoLocationTimeout);
				geoLocationTimeout = null;
				// $('.search-panel .btn-current').hide();
				self.showError(self.config.error_message.geolocation_error_denied);
				$('.input-panel', self.container).removeClass('active');
			}
			
			geoLocationTimeout = setTimeout(function() {
				self.showError(self.config.error_message.geolocation_error_timeout);
				$('.input-panel', self.container).removeClass('active');	
			}, 7000);

 		},

 		searchDealersByKeyword: function(keyword, matchParams) {

			var self = this,
				mapController = self.mapController,
				map = mapController.map,
				is_postcode = /^\d/.test(keyword),
				errmessage = self.config.error_message.dealer_not_found,
				matchParams = matchParams || {},
				containsParams = {},
				origin = {
					lat: mapController.currentLat,
					lng: mapController.currentLong
				};

			self.is_autoDetection = false;
			self.filters = [];

			$('.error', self.container).hide();

			if ($('.input-panel', self.container).is('.active')) return false;
			$('.input-panel', self.container).addClass('active');

			if (keyword == "" || !keyword) {
				self.showError(self.config.error_message.blank_field);
				$('.input-panel', self.container).removeClass('active');
				return;
			}

			setTimeout(function() {
			mapController.searchDealersByKeyword(keyword, $('.input-panel input[type=text]', self.container), self.processResults, errmessage);
			},3000);

			self.loadedDealers = [];

		},

		// autoCompleteTrigger: function(e) {

		// 	var self = guxPersonalisation.locatedealer,
		// 		mapController = guxApp.googleMapController,
		// 		map = mapController.map,
		// 		searchKey = $(this).val(),
		// 		strlen = searchKey.length,
		// 		search_panel = $('.search-panel'),
		// 		location_limit = self.config.auto_suggest_limit,
		// 		user_intent_delay = null;

		// 	var keys_regex = new RegExp("^[a-zA-Z0-9]+$");
		//     var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);

		//     if (user_intent_delay) {
		//     	clearTimeout(user_intent_delay);
		//     	user_intent_delay = null;
		//     }


		// 	// enable predictive search
		// 	if (keys_regex.test(str) && !!searchKey && (/[A-Z]{2,}/.test(searchKey) || strlen >= self.config.autocomplete_char_count)) {
					

		// 		user_intent_delay = setTimeout(function() {

		//     		if ($('.input-panel', self.container).is('.active')) return false;

		// 			guxApp.googleMapController.map.autocomplete(searchKey, location_limit, function(results) {

		// 				var locations = results.locations,
		// 					dealers = _.pluck(results.dealers, "DealerName");

		// 				self.showSuggestions(_.union(dealers, locations), search_panel);

		// 			});

		// 		}, 300);

		// 	} else {
		// 		$('.dealer-disambiguation', search_panel).hide();
		// 	}

		// },

		autoCompleteTrigger: function(e) {

			var self = guxPersonalisation.locatedealer,
				mapController = self.mapController,
				map = mapController.map,
				searchKey = $(this).val(),
				strlen = searchKey.length,
				search_panel = $('.search-panel'),
				location_limit = self.config.auto_suggest_limit,
				user_intent_delay = null,
				key = !e.charCode ? e.which : e.charCode;

			var keys_regex = new RegExp("^[a-zA-Z0-9]+$");
		    var str = String.fromCharCode(key).valueOf();

		    // prevent trigger if ctrl/alt key is pressed
		    if (e.altKey || e.ctrlKey || key == 17 || key == 18) return false;


		    if (user_intent_delay) {
		    	clearTimeout(user_intent_delay);
		    	user_intent_delay = null;
		    }


		    // arrow keys
		    if (key == 38 || key == 40) {

		    	switch(key) {
		    		case 38:
		    			var direction = true;
		    			break;
		    		case 40:
		    			var direction = false;
		    			break;
		    	}

		    	if ($('.dealer-disambiguation', self.container).is(':visible')) self.selectSuggestion(this, direction);

		    	return;
		    } 

			// enable predictive search
			if (!!searchKey && (/[A-Z]{2,}/.test(searchKey) || strlen >= self.config.autocomplete_char_count)) {
				// keys_regex.test(str) &&	

				user_intent_delay = setTimeout(function() {

		    		if ($('.input-panel', self.container).is('.active')) return false;

		    		mapController.map.autocomplete(searchKey, location_limit, function (results) {

						var locations = results.locations,
							dealers = _.pluck(results.dealers, "DealerName");

						if (locations.length || dealers.length) {
							self.showSuggestions(_.union(dealers, locations), search_panel);
						}

					});

				}, 300);

			}

		},

		selectSuggestion: function(field, up) {

			var suggestion_holder = $('.search-panel .dealer-disambiguation'),
				current_selected = $('li.active', suggestion_holder),
				next = (current_selected.next().length)?current_selected.next():$('li', suggestion_holder).eq(0),
				prev = (current_selected.prev().length)?current_selected.prev():$('li', suggestion_holder).eq($('li', suggestion_holder).length-1);

			current_selected = next;

			if (up) {
				current_selected = prev
			}
			
			current_selected.addClass('active').siblings().removeClass('active');
			$(field).val($('a', current_selected).text());

		},

		showSuggestions: function(suggestions, container) {

			$('.search-panel .error').hide();

			if (suggestions.length) {

				$('.dealer-disambiguation', container).show();
				$(".dealer-disambiguation ul", container).html(_.template($("#dealer-disambiguation").html(), {suggestions:suggestions}));
				$('.dealer-disambiguation a', $(container)).on("click", function(e) {
					
					e.preventDefault();

					$(".input-panel input[type=text]", container).val($(this).text());
					$('.dealer-disambiguation', container).hide();
					$(container).trigger('submit');

				});
			} else {
				$('.dealer-disambiguation', container).hide();
			}
		},

 		showLocationAwarePanel: function() {

 			var container = $(this.container);

 			$('.dealer-unaware', container).hide();
			$('.location-aware', container).show();

 		},

 		showError: function(errorText) {
			$('.error', this.container).show().find('.text').text(errorText);
			$('.dealer-disambiguation', self.container).hide();
 		}
	};

})(jQuery);


/*
Author: 		Doris
File name: 		component-locate-dealer-alt.js
Description: 	Display or suppress Locate a Dealer component
Dependencies: 	jQuery
Usage: 			
*/

var guxPersonalisation = guxPersonalisation || {};

(function($){

    guxPersonalisation.locatedealeralt = {

        init: function (locatedealer) {
            var self = this;
            self.locatedealer = locatedealer;
            self.altThemeContainer = self.locatedealer.container.hasClass('alt-theme') ? self.locatedealer.container : [];
            self.searchbtn = $('.actions-bar .button', self.altThemeContainer);
            self.searchContainer = $('.search-panel', self.altThemeContainer);
            self.vehicle = $("select[name='vehicle']", self.searchContainer);
            self.location = $("input[name='location']", self.searchContainer);
            if (!self.altThemeContainer.length) return;

            self.vehicle && self.vehicle.length && self.vehicle.val('') && self.vehicle.uniform.update();
            self.location && self.location.length && self.location.val('');
            
            //self.locatedealer.container.show();

            self.getOptData();
            self.searchbtn.on('click', function (e) {
                e.preventDefault();
                
                var formDataArr = $("select, input", self.searchContainer).serializeArray(),
				    province = $("select[name='province']", self.searchContainer),
				    city = $("select[name='city']", self.searchContainer),
                    vehicle = $("select[name='vehicle']", self.searchContainer),
                    location = $("input[name='location']", self.searchContainer),
                    keywordStr = "",
					matchParams = {},
					containParams = {};

                self.searchbtn.siblings('.error').removeClass('active');

                if (province.val().length && city.val().length) {
                    $.each(formDataArr, function (key, val) {
                        if (val.value != "") {
                            keywordStr = keywordStr + val.value;
                        }
                    });
                    self.locatedealer.loadedDealers = [];
 					if (guxApp.tools.isAutoNaviMap()) 
                        {
							matchParams={AdministrativeArea: province.val()||"", Locality: city.val()||""};
							containParams={_name:location.val()||"",DealerNewVehicle:vehicle.val()||""};
							self.locatedealer.mapController.searchDealersByLocation(keywordStr, false , matchParams , containParams, function(dealers,errorMsg) {
								errorMsg = errorMsg||((!!guxPersonalisation.locatedealer.config.error_message)?guxPersonalisation.locatedealer.config.error_message.dealer_not_found:"No results were Found. Please try a different search."),
								sessionStorage['dealers'] = JSON.stringify(dealers);
								sessionStorage['search_province'] = province.val();
								sessionStorage['search_city'] = city.val();
								sessionStorage['error_message'] = errorMsg;
								location.length && location.val().length && (sessionStorage['search_location'] = location.val());
								vehicle.length && vehicle.val().length && (sessionStorage['search_vehicle'] = vehicle.val());
								if (window.history.pushState) {
									window.history.pushState('', '', window.location.href);
								}
								window.location.href = self.searchContainer.attr('action');
							});	
                        }
						else {
							self.locatedealer.mapController.searchDealersByProperties({AdministrativeArea: province.val(), Locality: city.val()}, {}, function(dealers,errorMsg) {
								errorMsg = errorMsg||((!!guxPersonalisation.locatedealer.config.error_message)?guxPersonalisation.locatedealer.config.error_message.dealer_not_found:"No results were Found. Please try a different search."),
								sessionStorage['dealers'] = JSON.stringify(dealers);
								sessionStorage['search_province'] = province.val();
								sessionStorage['search_city'] = city.val();
								sessionStorage['error_message'] = errorMsg;
								location.length && location.val().length && (sessionStorage['search_location'] = location.val());
								vehicle.length && vehicle.val().length && (sessionStorage['search_vehicle'] = vehicle.val());
								if (window.history.pushState) {
									window.history.pushState('', '', window.location.href);
								}
								window.location.href = self.searchContainer.attr('action');
							});	
						}
                        					
                }
                else {
                    self.searchbtn.siblings('.error').addClass('active').find('.text').text(self.locatedealer.mapController.config.error_message.isMandatory);
                }
                
                return false;
            });
            $('.btn-current', self.searchContainer).off('click').on('click', function (e) {
                e.preventDefault();
                self.locatedealer.searchByPosition($("input[name='location']", self.searchContainer), function (dealers, status) {
                    if (dealers) {
                        sessionStorage['dealers'] = JSON.stringify(dealers);
                        window.location.href = self.searchContainer.attr('action');
                    }
                })
            });

        },
        getOptData: function () {
            var self = this,
                dataConfig = $("#cityDropdownData"),
			    dataArr = [],
			    province = $("select[name='province']", self.altThemeContainer),
			    city = $("select[name='city']", self.altThemeContainer);
            //self.searchbtn.addClass('disabled').attr("disabled", "disabled");
            //initial disable city
            city.prop("disabled", "disabled").closest(".dropdown").addClass("disabled");
            province.uniform.update();
            city.uniform.update();
            if (dataConfig.length > 0 && dataConfig.embeddedData().list && dataConfig.embeddedData().list.length) {
                dataArr = dataConfig.embeddedData().list[0].states;
            }
            //import Province data
            if (dataArr.length > 0) {
                $.each(dataArr, function (key, val) {
                    $("<option value='" + val[1].name + "'>" + val[1].name + "</option>").appendTo(province);
                });                
            }
            //import City data
            province.on("change", function () {
                var provinceVal = $(this).val(),
                    endLoop = false;
                city.val("");//select the default value
                city.uniform.update();//update select val in uniform
                $.each(dataArr, function (key, val) {
                    if (provinceVal == val[1].name) {
                        city.children("option:gt(0)").remove();
                        $.each(val[1].cities, function (key, val) {
                            $("<option value='" + val[1].name + "'>" + val[1].name + "</option>").appendTo(city);
                        });
                        endLoop = true;
                    }
                    if (endLoop) { return false; }
                });
                //enable city
                province.val() == "" ? city.prop("disabled", "disabled").closest(".dropdown").addClass("disabled") : city.prop("disabled", false).closest(".dropdown").removeClass("disabled");
                //city.val().length ? self.searchbtn.removeClass('disabled').attr("disabled", false) : self.searchbtn.addClass('disabled').attr("disabled", "disabled");
            });
            //city.on('change', function () {
            //    city.val().length ? self.searchbtn.removeClass('disabled').attr("disabled", false) : self.searchbtn.addClass('disabled').attr("disabled", "disabled");
            //});
        }

    };
    

})(jQuery);


/*
Author: Jessie Biros
Description: Disable an 'a href' when the class 'disable' is added
			: this is for motorcraft Phase 2 because 1 of the requirements is 
				to give the publisher an option to disable a link.
*/

(function($){

	var disableLink = {
		init: function(){
			if(!$(".disable").length){return;}
			
			$('.disable').on('click', function(e){
				e.preventDefault();
			});			

		}
	}

	$(function(){
		disableLink.init();
	});

})(jQuery);

