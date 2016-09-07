
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


/*! jQuery v1.8.3 jquery.com | jquery.org/license */
(function(e,t){function _(e){var t=M[e]={};return v.each(e.split(y),function(e,n){t[n]=!0}),t}function H(e,n,r){if(r===t&&e.nodeType===1){var i="data-"+n.replace(P,"-$1").toLowerCase();r=e.getAttribute(i);if(typeof r=="string"){try{r=r==="true"?!0:r==="false"?!1:r==="null"?null:+r+""===r?+r:D.test(r)?v.parseJSON(r):r}catch(s){}v.data(e,n,r)}else r=t}return r}function B(e){var t;for(t in e){if(t==="data"&&v.isEmptyObject(e[t]))continue;if(t!=="toJSON")return!1}return!0}function et(){return!1}function tt(){return!0}function ut(e){return!e||!e.parentNode||e.parentNode.nodeType===11}function at(e,t){do e=e[t];while(e&&e.nodeType!==1);return e}function ft(e,t,n){t=t||0;if(v.isFunction(t))return v.grep(e,function(e,r){var i=!!t.call(e,r,e);return i===n});if(t.nodeType)return v.grep(e,function(e,r){return e===t===n});if(typeof t=="string"){var r=v.grep(e,function(e){return e.nodeType===1});if(it.test(t))return v.filter(t,r,!n);t=v.filter(t,r)}return v.grep(e,function(e,r){return v.inArray(e,t)>=0===n})}function lt(e){var t=ct.split("|"),n=e.createDocumentFragment();if(n.createElement)while(t.length)n.createElement(t.pop());return n}function Lt(e,t){return e.getElementsByTagName(t)[0]||e.appendChild(e.ownerDocument.createElement(t))}function At(e,t){if(t.nodeType!==1||!v.hasData(e))return;var n,r,i,s=v._data(e),o=v._data(t,s),u=s.events;if(u){delete o.handle,o.events={};for(n in u)for(r=0,i=u[n].length;r<i;r++)v.event.add(t,n,u[n][r])}o.data&&(o.data=v.extend({},o.data))}function Ot(e,t){var n;if(t.nodeType!==1)return;t.clearAttributes&&t.clearAttributes(),t.mergeAttributes&&t.mergeAttributes(e),n=t.nodeName.toLowerCase(),n==="object"?(t.parentNode&&(t.outerHTML=e.outerHTML),v.support.html5Clone&&e.innerHTML&&!v.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):n==="input"&&Et.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):n==="option"?t.selected=e.defaultSelected:n==="input"||n==="textarea"?t.defaultValue=e.defaultValue:n==="script"&&t.text!==e.text&&(t.text=e.text),t.removeAttribute(v.expando)}function Mt(e){return typeof e.getElementsByTagName!="undefined"?e.getElementsByTagName("*"):typeof e.querySelectorAll!="undefined"?e.querySelectorAll("*"):[]}function _t(e){Et.test(e.type)&&(e.defaultChecked=e.checked)}function Qt(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=Jt.length;while(i--){t=Jt[i]+n;if(t in e)return t}return r}function Gt(e,t){return e=t||e,v.css(e,"display")==="none"||!v.contains(e.ownerDocument,e)}function Yt(e,t){var n,r,i=[],s=0,o=e.length;for(;s<o;s++){n=e[s];if(!n.style)continue;i[s]=v._data(n,"olddisplay"),t?(!i[s]&&n.style.display==="none"&&(n.style.display=""),n.style.display===""&&Gt(n)&&(i[s]=v._data(n,"olddisplay",nn(n.nodeName)))):(r=Dt(n,"display"),!i[s]&&r!=="none"&&v._data(n,"olddisplay",r))}for(s=0;s<o;s++){n=e[s];if(!n.style)continue;if(!t||n.style.display==="none"||n.style.display==="")n.style.display=t?i[s]||"":"none"}return e}function Zt(e,t,n){var r=Rt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function en(e,t,n,r){var i=n===(r?"border":"content")?4:t==="width"?1:0,s=0;for(;i<4;i+=2)n==="margin"&&(s+=v.css(e,n+$t[i],!0)),r?(n==="content"&&(s-=parseFloat(Dt(e,"padding"+$t[i]))||0),n!=="margin"&&(s-=parseFloat(Dt(e,"border"+$t[i]+"Width"))||0)):(s+=parseFloat(Dt(e,"padding"+$t[i]))||0,n!=="padding"&&(s+=parseFloat(Dt(e,"border"+$t[i]+"Width"))||0));return s}function tn(e,t,n){var r=t==="width"?e.offsetWidth:e.offsetHeight,i=!0,s=v.support.boxSizing&&v.css(e,"boxSizing")==="border-box";if(r<=0||r==null){r=Dt(e,t);if(r<0||r==null)r=e.style[t];if(Ut.test(r))return r;i=s&&(v.support.boxSizingReliable||r===e.style[t]),r=parseFloat(r)||0}return r+en(e,t,n||(s?"border":"content"),i)+"px"}function nn(e){if(Wt[e])return Wt[e];var t=v("<"+e+">").appendTo(i.body),n=t.css("display");t.remove();if(n==="none"||n===""){Pt=i.body.appendChild(Pt||v.extend(i.createElement("iframe"),{frameBorder:0,width:0,height:0}));if(!Ht||!Pt.createElement)Ht=(Pt.contentWindow||Pt.contentDocument).document,Ht.write("<!doctype html><html><body>"),Ht.close();t=Ht.body.appendChild(Ht.createElement(e)),n=Dt(t,"display"),i.body.removeChild(Pt)}return Wt[e]=n,n}function fn(e,t,n,r){var i;if(v.isArray(t))v.each(t,function(t,i){n||sn.test(e)?r(e,i):fn(e+"["+(typeof i=="object"?t:"")+"]",i,n,r)});else if(!n&&v.type(t)==="object")for(i in t)fn(e+"["+i+"]",t[i],n,r);else r(e,t)}function Cn(e){return function(t,n){typeof t!="string"&&(n=t,t="*");var r,i,s,o=t.toLowerCase().split(y),u=0,a=o.length;if(v.isFunction(n))for(;u<a;u++)r=o[u],s=/^\+/.test(r),s&&(r=r.substr(1)||"*"),i=e[r]=e[r]||[],i[s?"unshift":"push"](n)}}function kn(e,n,r,i,s,o){s=s||n.dataTypes[0],o=o||{},o[s]=!0;var u,a=e[s],f=0,l=a?a.length:0,c=e===Sn;for(;f<l&&(c||!u);f++)u=a[f](n,r,i),typeof u=="string"&&(!c||o[u]?u=t:(n.dataTypes.unshift(u),u=kn(e,n,r,i,u,o)));return(c||!u)&&!o["*"]&&(u=kn(e,n,r,i,"*",o)),u}function Ln(e,n){var r,i,s=v.ajaxSettings.flatOptions||{};for(r in n)n[r]!==t&&((s[r]?e:i||(i={}))[r]=n[r]);i&&v.extend(!0,e,i)}function An(e,n,r){var i,s,o,u,a=e.contents,f=e.dataTypes,l=e.responseFields;for(s in l)s in r&&(n[l[s]]=r[s]);while(f[0]==="*")f.shift(),i===t&&(i=e.mimeType||n.getResponseHeader("content-type"));if(i)for(s in a)if(a[s]&&a[s].test(i)){f.unshift(s);break}if(f[0]in r)o=f[0];else{for(s in r){if(!f[0]||e.converters[s+" "+f[0]]){o=s;break}u||(u=s)}o=o||u}if(o)return o!==f[0]&&f.unshift(o),r[o]}function On(e,t){var n,r,i,s,o=e.dataTypes.slice(),u=o[0],a={},f=0;e.dataFilter&&(t=e.dataFilter(t,e.dataType));if(o[1])for(n in e.converters)a[n.toLowerCase()]=e.converters[n];for(;i=o[++f];)if(i!=="*"){if(u!=="*"&&u!==i){n=a[u+" "+i]||a["* "+i];if(!n)for(r in a){s=r.split(" ");if(s[1]===i){n=a[u+" "+s[0]]||a["* "+s[0]];if(n){n===!0?n=a[r]:a[r]!==!0&&(i=s[0],o.splice(f--,0,i));break}}}if(n!==!0)if(n&&e["throws"])t=n(t);else try{t=n(t)}catch(l){return{state:"parsererror",error:n?l:"No conversion from "+u+" to "+i}}}u=i}return{state:"success",data:t}}function Fn(){try{return new e.XMLHttpRequest}catch(t){}}function In(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}function $n(){return setTimeout(function(){qn=t},0),qn=v.now()}function Jn(e,t){v.each(t,function(t,n){var r=(Vn[t]||[]).concat(Vn["*"]),i=0,s=r.length;for(;i<s;i++)if(r[i].call(e,t,n))return})}function Kn(e,t,n){var r,i=0,s=0,o=Xn.length,u=v.Deferred().always(function(){delete a.elem}),a=function(){var t=qn||$n(),n=Math.max(0,f.startTime+f.duration-t),r=n/f.duration||0,i=1-r,s=0,o=f.tweens.length;for(;s<o;s++)f.tweens[s].run(i);return u.notifyWith(e,[f,i,n]),i<1&&o?n:(u.resolveWith(e,[f]),!1)},f=u.promise({elem:e,props:v.extend({},t),opts:v.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:qn||$n(),duration:n.duration,tweens:[],createTween:function(t,n,r){var i=v.Tween(e,f.opts,t,n,f.opts.specialEasing[t]||f.opts.easing);return f.tweens.push(i),i},stop:function(t){var n=0,r=t?f.tweens.length:0;for(;n<r;n++)f.tweens[n].run(1);return t?u.resolveWith(e,[f,t]):u.rejectWith(e,[f,t]),this}}),l=f.props;Qn(l,f.opts.specialEasing);for(;i<o;i++){r=Xn[i].call(f,e,l,f.opts);if(r)return r}return Jn(f,l),v.isFunction(f.opts.start)&&f.opts.start.call(e,f),v.fx.timer(v.extend(a,{anim:f,queue:f.opts.queue,elem:e})),f.progress(f.opts.progress).done(f.opts.done,f.opts.complete).fail(f.opts.fail).always(f.opts.always)}function Qn(e,t){var n,r,i,s,o;for(n in e){r=v.camelCase(n),i=t[r],s=e[n],v.isArray(s)&&(i=s[1],s=e[n]=s[0]),n!==r&&(e[r]=s,delete e[n]),o=v.cssHooks[r];if(o&&"expand"in o){s=o.expand(s),delete e[r];for(n in s)n in e||(e[n]=s[n],t[n]=i)}else t[r]=i}}function Gn(e,t,n){var r,i,s,o,u,a,f,l,c,h=this,p=e.style,d={},m=[],g=e.nodeType&&Gt(e);n.queue||(l=v._queueHooks(e,"fx"),l.unqueued==null&&(l.unqueued=0,c=l.empty.fire,l.empty.fire=function(){l.unqueued||c()}),l.unqueued++,h.always(function(){h.always(function(){l.unqueued--,v.queue(e,"fx").length||l.empty.fire()})})),e.nodeType===1&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],v.css(e,"display")==="inline"&&v.css(e,"float")==="none"&&(!v.support.inlineBlockNeedsLayout||nn(e.nodeName)==="inline"?p.display="inline-block":p.zoom=1)),n.overflow&&(p.overflow="hidden",v.support.shrinkWrapBlocks||h.done(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(r in t){s=t[r];if(Un.exec(s)){delete t[r],a=a||s==="toggle";if(s===(g?"hide":"show"))continue;m.push(r)}}o=m.length;if(o){u=v._data(e,"fxshow")||v._data(e,"fxshow",{}),"hidden"in u&&(g=u.hidden),a&&(u.hidden=!g),g?v(e).show():h.done(function(){v(e).hide()}),h.done(function(){var t;v.removeData(e,"fxshow",!0);for(t in d)v.style(e,t,d[t])});for(r=0;r<o;r++)i=m[r],f=h.createTween(i,g?u[i]:0),d[i]=u[i]||v.style(e,i),i in u||(u[i]=f.start,g&&(f.end=f.start,f.start=i==="width"||i==="height"?1:0))}}function Yn(e,t,n,r,i){return new Yn.prototype.init(e,t,n,r,i)}function Zn(e,t){var n,r={height:e},i=0;t=t?1:0;for(;i<4;i+=2-t)n=$t[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}function tr(e){return v.isWindow(e)?e:e.nodeType===9?e.defaultView||e.parentWindow:!1}var n,r,i=e.document,s=e.location,o=e.navigator,u=e.jQuery,a=e.$,f=Array.prototype.push,l=Array.prototype.slice,c=Array.prototype.indexOf,h=Object.prototype.toString,p=Object.prototype.hasOwnProperty,d=String.prototype.trim,v=function(e,t){return new v.fn.init(e,t,n)},m=/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,g=/\S/,y=/\s+/,b=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,w=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,E=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,S=/^[\],:{}\s]*$/,x=/(?:^|:|,)(?:\s*\[)+/g,T=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,N=/"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,C=/^-ms-/,k=/-([\da-z])/gi,L=function(e,t){return(t+"").toUpperCase()},A=function(){i.addEventListener?(i.removeEventListener("DOMContentLoaded",A,!1),v.ready()):i.readyState==="complete"&&(i.detachEvent("onreadystatechange",A),v.ready())},O={};v.fn=v.prototype={constructor:v,init:function(e,n,r){var s,o,u,a;if(!e)return this;if(e.nodeType)return this.context=this[0]=e,this.length=1,this;if(typeof e=="string"){e.charAt(0)==="<"&&e.charAt(e.length-1)===">"&&e.length>=3?s=[null,e,null]:s=w.exec(e);if(s&&(s[1]||!n)){if(s[1])return n=n instanceof v?n[0]:n,a=n&&n.nodeType?n.ownerDocument||n:i,e=v.parseHTML(s[1],a,!0),E.test(s[1])&&v.isPlainObject(n)&&this.attr.call(e,n,!0),v.merge(this,e);o=i.getElementById(s[2]);if(o&&o.parentNode){if(o.id!==s[2])return r.find(e);this.length=1,this[0]=o}return this.context=i,this.selector=e,this}return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e)}return v.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),v.makeArray(e,this))},selector:"",jquery:"1.8.3",length:0,size:function(){return this.length},toArray:function(){return l.call(this)},get:function(e){return e==null?this.toArray():e<0?this[this.length+e]:this[e]},pushStack:function(e,t,n){var r=v.merge(this.constructor(),e);return r.prevObject=this,r.context=this.context,t==="find"?r.selector=this.selector+(this.selector?" ":"")+n:t&&(r.selector=this.selector+"."+t+"("+n+")"),r},each:function(e,t){return v.each(this,e,t)},ready:function(e){return v.ready.promise().done(e),this},eq:function(e){return e=+e,e===-1?this.slice(e):this.slice(e,e+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(l.apply(this,arguments),"slice",l.call(arguments).join(","))},map:function(e){return this.pushStack(v.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:[].sort,splice:[].splice},v.fn.init.prototype=v.fn,v.extend=v.fn.extend=function(){var e,n,r,i,s,o,u=arguments[0]||{},a=1,f=arguments.length,l=!1;typeof u=="boolean"&&(l=u,u=arguments[1]||{},a=2),typeof u!="object"&&!v.isFunction(u)&&(u={}),f===a&&(u=this,--a);for(;a<f;a++)if((e=arguments[a])!=null)for(n in e){r=u[n],i=e[n];if(u===i)continue;l&&i&&(v.isPlainObject(i)||(s=v.isArray(i)))?(s?(s=!1,o=r&&v.isArray(r)?r:[]):o=r&&v.isPlainObject(r)?r:{},u[n]=v.extend(l,o,i)):i!==t&&(u[n]=i)}return u},v.extend({noConflict:function(t){return e.$===v&&(e.$=a),t&&e.jQuery===v&&(e.jQuery=u),v},isReady:!1,readyWait:1,holdReady:function(e){e?v.readyWait++:v.ready(!0)},ready:function(e){if(e===!0?--v.readyWait:v.isReady)return;if(!i.body)return setTimeout(v.ready,1);v.isReady=!0;if(e!==!0&&--v.readyWait>0)return;r.resolveWith(i,[v]),v.fn.trigger&&v(i).trigger("ready").off("ready")},isFunction:function(e){return v.type(e)==="function"},isArray:Array.isArray||function(e){return v.type(e)==="array"},isWindow:function(e){return e!=null&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return e==null?String(e):O[h.call(e)]||"object"},isPlainObject:function(e){if(!e||v.type(e)!=="object"||e.nodeType||v.isWindow(e))return!1;try{if(e.constructor&&!p.call(e,"constructor")&&!p.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(n){return!1}var r;for(r in e);return r===t||p.call(e,r)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw new Error(e)},parseHTML:function(e,t,n){var r;return!e||typeof e!="string"?null:(typeof t=="boolean"&&(n=t,t=0),t=t||i,(r=E.exec(e))?[t.createElement(r[1])]:(r=v.buildFragment([e],t,n?null:[]),v.merge([],(r.cacheable?v.clone(r.fragment):r.fragment).childNodes)))},parseJSON:function(t){if(!t||typeof t!="string")return null;t=v.trim(t);if(e.JSON&&e.JSON.parse)return e.JSON.parse(t);if(S.test(t.replace(T,"@").replace(N,"]").replace(x,"")))return(new Function("return "+t))();v.error("Invalid JSON: "+t)},parseXML:function(n){var r,i;if(!n||typeof n!="string")return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n))}catch(s){r=t}return(!r||!r.documentElement||r.getElementsByTagName("parsererror").length)&&v.error("Invalid XML: "+n),r},noop:function(){},globalEval:function(t){t&&g.test(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(C,"ms-").replace(k,L)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,n,r){var i,s=0,o=e.length,u=o===t||v.isFunction(e);if(r){if(u){for(i in e)if(n.apply(e[i],r)===!1)break}else for(;s<o;)if(n.apply(e[s++],r)===!1)break}else if(u){for(i in e)if(n.call(e[i],i,e[i])===!1)break}else for(;s<o;)if(n.call(e[s],s,e[s++])===!1)break;return e},trim:d&&!d.call("\ufeff\u00a0")?function(e){return e==null?"":d.call(e)}:function(e){return e==null?"":(e+"").replace(b,"")},makeArray:function(e,t){var n,r=t||[];return e!=null&&(n=v.type(e),e.length==null||n==="string"||n==="function"||n==="regexp"||v.isWindow(e)?f.call(r,e):v.merge(r,e)),r},inArray:function(e,t,n){var r;if(t){if(c)return c.call(t,e,n);r=t.length,n=n?n<0?Math.max(0,r+n):n:0;for(;n<r;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,s=0;if(typeof r=="number")for(;s<r;s++)e[i++]=n[s];else while(n[s]!==t)e[i++]=n[s++];return e.length=i,e},grep:function(e,t,n){var r,i=[],s=0,o=e.length;n=!!n;for(;s<o;s++)r=!!t(e[s],s),n!==r&&i.push(e[s]);return i},map:function(e,n,r){var i,s,o=[],u=0,a=e.length,f=e instanceof v||a!==t&&typeof a=="number"&&(a>0&&e[0]&&e[a-1]||a===0||v.isArray(e));if(f)for(;u<a;u++)i=n(e[u],u,r),i!=null&&(o[o.length]=i);else for(s in e)i=n(e[s],s,r),i!=null&&(o[o.length]=i);return o.concat.apply([],o)},guid:1,proxy:function(e,n){var r,i,s;return typeof n=="string"&&(r=e[n],n=e,e=r),v.isFunction(e)?(i=l.call(arguments,2),s=function(){return e.apply(n,i.concat(l.call(arguments)))},s.guid=e.guid=e.guid||v.guid++,s):t},access:function(e,n,r,i,s,o,u){var a,f=r==null,l=0,c=e.length;if(r&&typeof r=="object"){for(l in r)v.access(e,n,l,r[l],1,o,i);s=1}else if(i!==t){a=u===t&&v.isFunction(i),f&&(a?(a=n,n=function(e,t,n){return a.call(v(e),n)}):(n.call(e,i),n=null));if(n)for(;l<c;l++)n(e[l],r,a?i.call(e[l],l,n(e[l],r)):i,u);s=1}return s?e:f?n.call(e):c?n(e[0],r):o},now:function(){return(new Date).getTime()}}),v.ready.promise=function(t){if(!r){r=v.Deferred();if(i.readyState==="complete")setTimeout(v.ready,1);else if(i.addEventListener)i.addEventListener("DOMContentLoaded",A,!1),e.addEventListener("load",v.ready,!1);else{i.attachEvent("onreadystatechange",A),e.attachEvent("onload",v.ready);var n=!1;try{n=e.frameElement==null&&i.documentElement}catch(s){}n&&n.doScroll&&function o(){if(!v.isReady){try{n.doScroll("left")}catch(e){return setTimeout(o,50)}v.ready()}}()}}return r.promise(t)},v.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(e,t){O["[object "+t+"]"]=t.toLowerCase()}),n=v(i);var M={};v.Callbacks=function(e){e=typeof e=="string"?M[e]||_(e):v.extend({},e);var n,r,i,s,o,u,a=[],f=!e.once&&[],l=function(t){n=e.memory&&t,r=!0,u=s||0,s=0,o=a.length,i=!0;for(;a&&u<o;u++)if(a[u].apply(t[0],t[1])===!1&&e.stopOnFalse){n=!1;break}i=!1,a&&(f?f.length&&l(f.shift()):n?a=[]:c.disable())},c={add:function(){if(a){var t=a.length;(function r(t){v.each(t,function(t,n){var i=v.type(n);i==="function"?(!e.unique||!c.has(n))&&a.push(n):n&&n.length&&i!=="string"&&r(n)})})(arguments),i?o=a.length:n&&(s=t,l(n))}return this},remove:function(){return a&&v.each(arguments,function(e,t){var n;while((n=v.inArray(t,a,n))>-1)a.splice(n,1),i&&(n<=o&&o--,n<=u&&u--)}),this},has:function(e){return v.inArray(e,a)>-1},empty:function(){return a=[],this},disable:function(){return a=f=n=t,this},disabled:function(){return!a},lock:function(){return f=t,n||c.disable(),this},locked:function(){return!f},fireWith:function(e,t){return t=t||[],t=[e,t.slice?t.slice():t],a&&(!r||f)&&(i?f.push(t):l(t)),this},fire:function(){return c.fireWith(this,arguments),this},fired:function(){return!!r}};return c},v.extend({Deferred:function(e){var t=[["resolve","done",v.Callbacks("once memory"),"resolved"],["reject","fail",v.Callbacks("once memory"),"rejected"],["notify","progress",v.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return v.Deferred(function(n){v.each(t,function(t,r){var s=r[0],o=e[t];i[r[1]](v.isFunction(o)?function(){var e=o.apply(this,arguments);e&&v.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[s+"With"](this===i?n:this,[e])}:n[s])}),e=null}).promise()},promise:function(e){return e!=null?v.extend(e,r):r}},i={};return r.pipe=r.then,v.each(t,function(e,s){var o=s[2],u=s[3];r[s[1]]=o.add,u&&o.add(function(){n=u},t[e^1][2].disable,t[2][2].lock),i[s[0]]=o.fire,i[s[0]+"With"]=o.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=l.call(arguments),r=n.length,i=r!==1||e&&v.isFunction(e.promise)?r:0,s=i===1?e:v.Deferred(),o=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?l.call(arguments):r,n===u?s.notifyWith(t,n):--i||s.resolveWith(t,n)}},u,a,f;if(r>1){u=new Array(r),a=new Array(r),f=new Array(r);for(;t<r;t++)n[t]&&v.isFunction(n[t].promise)?n[t].promise().done(o(t,f,n)).fail(s.reject).progress(o(t,a,u)):--i}return i||s.resolveWith(f,n),s.promise()}}),v.support=function(){var t,n,r,s,o,u,a,f,l,c,h,p=i.createElement("div");p.setAttribute("className","t"),p.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",n=p.getElementsByTagName("*"),r=p.getElementsByTagName("a")[0];if(!n||!r||!n.length)return{};s=i.createElement("select"),o=s.appendChild(i.createElement("option")),u=p.getElementsByTagName("input")[0],r.style.cssText="top:1px;float:left;opacity:.5",t={leadingWhitespace:p.firstChild.nodeType===3,tbody:!p.getElementsByTagName("tbody").length,htmlSerialize:!!p.getElementsByTagName("link").length,style:/top/.test(r.getAttribute("style")),hrefNormalized:r.getAttribute("href")==="/a",opacity:/^0.5/.test(r.style.opacity),cssFloat:!!r.style.cssFloat,checkOn:u.value==="on",optSelected:o.selected,getSetAttribute:p.className!=="t",enctype:!!i.createElement("form").enctype,html5Clone:i.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",boxModel:i.compatMode==="CSS1Compat",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},u.checked=!0,t.noCloneChecked=u.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!o.disabled;try{delete p.test}catch(d){t.deleteExpando=!1}!p.addEventListener&&p.attachEvent&&p.fireEvent&&(p.attachEvent("onclick",h=function(){t.noCloneEvent=!1}),p.cloneNode(!0).fireEvent("onclick"),p.detachEvent("onclick",h)),u=i.createElement("input"),u.value="t",u.setAttribute("type","radio"),t.radioValue=u.value==="t",u.setAttribute("checked","checked"),u.setAttribute("name","t"),p.appendChild(u),a=i.createDocumentFragment(),a.appendChild(p.lastChild),t.checkClone=a.cloneNode(!0).cloneNode(!0).lastChild.checked,t.appendChecked=u.checked,a.removeChild(u),a.appendChild(p);if(p.attachEvent)for(l in{submit:!0,change:!0,focusin:!0})f="on"+l,c=f in p,c||(p.setAttribute(f,"return;"),c=typeof p[f]=="function"),t[l+"Bubbles"]=c;return v(function(){var n,r,s,o,u="padding:0;margin:0;border:0;display:block;overflow:hidden;",a=i.getElementsByTagName("body")[0];if(!a)return;n=i.createElement("div"),n.style.cssText="visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px",a.insertBefore(n,a.firstChild),r=i.createElement("div"),n.appendChild(r),r.innerHTML="<table><tr><td></td><td>t</td></tr></table>",s=r.getElementsByTagName("td"),s[0].style.cssText="padding:0;margin:0;border:0;display:none",c=s[0].offsetHeight===0,s[0].style.display="",s[1].style.display="none",t.reliableHiddenOffsets=c&&s[0].offsetHeight===0,r.innerHTML="",r.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",t.boxSizing=r.offsetWidth===4,t.doesNotIncludeMarginInBodyOffset=a.offsetTop!==1,e.getComputedStyle&&(t.pixelPosition=(e.getComputedStyle(r,null)||{}).top!=="1%",t.boxSizingReliable=(e.getComputedStyle(r,null)||{width:"4px"}).width==="4px",o=i.createElement("div"),o.style.cssText=r.style.cssText=u,o.style.marginRight=o.style.width="0",r.style.width="1px",r.appendChild(o),t.reliableMarginRight=!parseFloat((e.getComputedStyle(o,null)||{}).marginRight)),typeof r.style.zoom!="undefined"&&(r.innerHTML="",r.style.cssText=u+"width:1px;padding:1px;display:inline;zoom:1",t.inlineBlockNeedsLayout=r.offsetWidth===3,r.style.display="block",r.style.overflow="visible",r.innerHTML="<div></div>",r.firstChild.style.width="5px",t.shrinkWrapBlocks=r.offsetWidth!==3,n.style.zoom=1),a.removeChild(n),n=r=s=o=null}),a.removeChild(p),n=r=s=o=u=a=p=null,t}();var D=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,P=/([A-Z])/g;v.extend({cache:{},deletedIds:[],uuid:0,expando:"jQuery"+(v.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(e){return e=e.nodeType?v.cache[e[v.expando]]:e[v.expando],!!e&&!B(e)},data:function(e,n,r,i){if(!v.acceptData(e))return;var s,o,u=v.expando,a=typeof n=="string",f=e.nodeType,l=f?v.cache:e,c=f?e[u]:e[u]&&u;if((!c||!l[c]||!i&&!l[c].data)&&a&&r===t)return;c||(f?e[u]=c=v.deletedIds.pop()||v.guid++:c=u),l[c]||(l[c]={},f||(l[c].toJSON=v.noop));if(typeof n=="object"||typeof n=="function")i?l[c]=v.extend(l[c],n):l[c].data=v.extend(l[c].data,n);return s=l[c],i||(s.data||(s.data={}),s=s.data),r!==t&&(s[v.camelCase(n)]=r),a?(o=s[n],o==null&&(o=s[v.camelCase(n)])):o=s,o},removeData:function(e,t,n){if(!v.acceptData(e))return;var r,i,s,o=e.nodeType,u=o?v.cache:e,a=o?e[v.expando]:v.expando;if(!u[a])return;if(t){r=n?u[a]:u[a].data;if(r){v.isArray(t)||(t in r?t=[t]:(t=v.camelCase(t),t in r?t=[t]:t=t.split(" ")));for(i=0,s=t.length;i<s;i++)delete r[t[i]];if(!(n?B:v.isEmptyObject)(r))return}}if(!n){delete u[a].data;if(!B(u[a]))return}o?v.cleanData([e],!0):v.support.deleteExpando||u!=u.window?delete u[a]:u[a]=null},_data:function(e,t,n){return v.data(e,t,n,!0)},acceptData:function(e){var t=e.nodeName&&v.noData[e.nodeName.toLowerCase()];return!t||t!==!0&&e.getAttribute("classid")===t}}),v.fn.extend({data:function(e,n){var r,i,s,o,u,a=this[0],f=0,l=null;if(e===t){if(this.length){l=v.data(a);if(a.nodeType===1&&!v._data(a,"parsedAttrs")){s=a.attributes;for(u=s.length;f<u;f++)o=s[f].name,o.indexOf("data-")||(o=v.camelCase(o.substring(5)),H(a,o,l[o]));v._data(a,"parsedAttrs",!0)}}return l}return typeof e=="object"?this.each(function(){v.data(this,e)}):(r=e.split(".",2),r[1]=r[1]?"."+r[1]:"",i=r[1]+"!",v.access(this,function(n){if(n===t)return l=this.triggerHandler("getData"+i,[r[0]]),l===t&&a&&(l=v.data(a,e),l=H(a,e,l)),l===t&&r[1]?this.data(r[0]):l;r[1]=n,this.each(function(){var t=v(this);t.triggerHandler("setData"+i,r),v.data(this,e,n),t.triggerHandler("changeData"+i,r)})},null,n,arguments.length>1,null,!1))},removeData:function(e){return this.each(function(){v.removeData(this,e)})}}),v.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=v._data(e,t),n&&(!r||v.isArray(n)?r=v._data(e,t,v.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=v.queue(e,t),r=n.length,i=n.shift(),s=v._queueHooks(e,t),o=function(){v.dequeue(e,t)};i==="inprogress"&&(i=n.shift(),r--),i&&(t==="fx"&&n.unshift("inprogress"),delete s.stop,i.call(e,o,s)),!r&&s&&s.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return v._data(e,n)||v._data(e,n,{empty:v.Callbacks("once memory").add(function(){v.removeData(e,t+"queue",!0),v.removeData(e,n,!0)})})}}),v.fn.extend({queue:function(e,n){var r=2;return typeof e!="string"&&(n=e,e="fx",r--),arguments.length<r?v.queue(this[0],e):n===t?this:this.each(function(){var t=v.queue(this,e,n);v._queueHooks(this,e),e==="fx"&&t[0]!=="inprogress"&&v.dequeue(this,e)})},dequeue:function(e){return this.each(function(){v.dequeue(this,e)})},delay:function(e,t){return e=v.fx?v.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var r,i=1,s=v.Deferred(),o=this,u=this.length,a=function(){--i||s.resolveWith(o,[o])};typeof e!="string"&&(n=e,e=t),e=e||"fx";while(u--)r=v._data(o[u],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(a));return a(),s.promise(n)}});var j,F,I,q=/[\t\r\n]/g,R=/\r/g,U=/^(?:button|input)$/i,z=/^(?:button|input|object|select|textarea)$/i,W=/^a(?:rea|)$/i,X=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,V=v.support.getSetAttribute;v.fn.extend({attr:function(e,t){return v.access(this,v.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){v.removeAttr(this,e)})},prop:function(e,t){return v.access(this,v.prop,e,t,arguments.length>1)},removeProp:function(e){return e=v.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,s,o,u;if(v.isFunction(e))return this.each(function(t){v(this).addClass(e.call(this,t,this.className))});if(e&&typeof e=="string"){t=e.split(y);for(n=0,r=this.length;n<r;n++){i=this[n];if(i.nodeType===1)if(!i.className&&t.length===1)i.className=e;else{s=" "+i.className+" ";for(o=0,u=t.length;o<u;o++)s.indexOf(" "+t[o]+" ")<0&&(s+=t[o]+" ");i.className=v.trim(s)}}}return this},removeClass:function(e){var n,r,i,s,o,u,a;if(v.isFunction(e))return this.each(function(t){v(this).removeClass(e.call(this,t,this.className))});if(e&&typeof e=="string"||e===t){n=(e||"").split(y);for(u=0,a=this.length;u<a;u++){i=this[u];if(i.nodeType===1&&i.className){r=(" "+i.className+" ").replace(q," ");for(s=0,o=n.length;s<o;s++)while(r.indexOf(" "+n[s]+" ")>=0)r=r.replace(" "+n[s]+" "," ");i.className=e?v.trim(r):""}}}return this},toggleClass:function(e,t){var n=typeof e,r=typeof t=="boolean";return v.isFunction(e)?this.each(function(n){v(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if(n==="string"){var i,s=0,o=v(this),u=t,a=e.split(y);while(i=a[s++])u=r?u:!o.hasClass(i),o[u?"addClass":"removeClass"](i)}else if(n==="undefined"||n==="boolean")this.className&&v._data(this,"__className__",this.className),this.className=this.className||e===!1?"":v._data(this,"__className__")||""})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;n<r;n++)if(this[n].nodeType===1&&(" "+this[n].className+" ").replace(q," ").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,s=this[0];if(!arguments.length){if(s)return n=v.valHooks[s.type]||v.valHooks[s.nodeName.toLowerCase()],n&&"get"in n&&(r=n.get(s,"value"))!==t?r:(r=s.value,typeof r=="string"?r.replace(R,""):r==null?"":r);return}return i=v.isFunction(e),this.each(function(r){var s,o=v(this);if(this.nodeType!==1)return;i?s=e.call(this,r,o.val()):s=e,s==null?s="":typeof s=="number"?s+="":v.isArray(s)&&(s=v.map(s,function(e){return e==null?"":e+""})),n=v.valHooks[this.type]||v.valHooks[this.nodeName.toLowerCase()];if(!n||!("set"in n)||n.set(this,s,"value")===t)this.value=s})}}),v.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,s=e.type==="select-one"||i<0,o=s?null:[],u=s?i+1:r.length,a=i<0?u:s?i:0;for(;a<u;a++){n=r[a];if((n.selected||a===i)&&(v.support.optDisabled?!n.disabled:n.getAttribute("disabled")===null)&&(!n.parentNode.disabled||!v.nodeName(n.parentNode,"optgroup"))){t=v(n).val();if(s)return t;o.push(t)}}return o},set:function(e,t){var n=v.makeArray(t);return v(e).find("option").each(function(){this.selected=v.inArray(v(this).val(),n)>=0}),n.length||(e.selectedIndex=-1),n}}},attrFn:{},attr:function(e,n,r,i){var s,o,u,a=e.nodeType;if(!e||a===3||a===8||a===2)return;if(i&&v.isFunction(v.fn[n]))return v(e)[n](r);if(typeof e.getAttribute=="undefined")return v.prop(e,n,r);u=a!==1||!v.isXMLDoc(e),u&&(n=n.toLowerCase(),o=v.attrHooks[n]||(X.test(n)?F:j));if(r!==t){if(r===null){v.removeAttr(e,n);return}return o&&"set"in o&&u&&(s=o.set(e,r,n))!==t?s:(e.setAttribute(n,r+""),r)}return o&&"get"in o&&u&&(s=o.get(e,n))!==null?s:(s=e.getAttribute(n),s===null?t:s)},removeAttr:function(e,t){var n,r,i,s,o=0;if(t&&e.nodeType===1){r=t.split(y);for(;o<r.length;o++)i=r[o],i&&(n=v.propFix[i]||i,s=X.test(i),s||v.attr(e,i,""),e.removeAttribute(V?i:n),s&&n in e&&(e[n]=!1))}},attrHooks:{type:{set:function(e,t){if(U.test(e.nodeName)&&e.parentNode)v.error("type property can't be changed");else if(!v.support.radioValue&&t==="radio"&&v.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}},value:{get:function(e,t){return j&&v.nodeName(e,"button")?j.get(e,t):t in e?e.value:null},set:function(e,t,n){if(j&&v.nodeName(e,"button"))return j.set(e,t,n);e.value=t}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(e,n,r){var i,s,o,u=e.nodeType;if(!e||u===3||u===8||u===2)return;return o=u!==1||!v.isXMLDoc(e),o&&(n=v.propFix[n]||n,s=v.propHooks[n]),r!==t?s&&"set"in s&&(i=s.set(e,r,n))!==t?i:e[n]=r:s&&"get"in s&&(i=s.get(e,n))!==null?i:e[n]},propHooks:{tabIndex:{get:function(e){var n=e.getAttributeNode("tabindex");return n&&n.specified?parseInt(n.value,10):z.test(e.nodeName)||W.test(e.nodeName)&&e.href?0:t}}}}),F={get:function(e,n){var r,i=v.prop(e,n);return i===!0||typeof i!="boolean"&&(r=e.getAttributeNode(n))&&r.nodeValue!==!1?n.toLowerCase():t},set:function(e,t,n){var r;return t===!1?v.removeAttr(e,n):(r=v.propFix[n]||n,r in e&&(e[r]=!0),e.setAttribute(n,n.toLowerCase())),n}},V||(I={name:!0,id:!0,coords:!0},j=v.valHooks.button={get:function(e,n){var r;return r=e.getAttributeNode(n),r&&(I[n]?r.value!=="":r.specified)?r.value:t},set:function(e,t,n){var r=e.getAttributeNode(n);return r||(r=i.createAttribute(n),e.setAttributeNode(r)),r.value=t+""}},v.each(["width","height"],function(e,t){v.attrHooks[t]=v.extend(v.attrHooks[t],{set:function(e,n){if(n==="")return e.setAttribute(t,"auto"),n}})}),v.attrHooks.contenteditable={get:j.get,set:function(e,t,n){t===""&&(t="false"),j.set(e,t,n)}}),v.support.hrefNormalized||v.each(["href","src","width","height"],function(e,n){v.attrHooks[n]=v.extend(v.attrHooks[n],{get:function(e){var r=e.getAttribute(n,2);return r===null?t:r}})}),v.support.style||(v.attrHooks.style={get:function(e){return e.style.cssText.toLowerCase()||t},set:function(e,t){return e.style.cssText=t+""}}),v.support.optSelected||(v.propHooks.selected=v.extend(v.propHooks.selected,{get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}})),v.support.enctype||(v.propFix.enctype="encoding"),v.support.checkOn||v.each(["radio","checkbox"],function(){v.valHooks[this]={get:function(e){return e.getAttribute("value")===null?"on":e.value}}}),v.each(["radio","checkbox"],function(){v.valHooks[this]=v.extend(v.valHooks[this],{set:function(e,t){if(v.isArray(t))return e.checked=v.inArray(v(e).val(),t)>=0}})});var $=/^(?:textarea|input|select)$/i,J=/^([^\.]*|)(?:\.(.+)|)$/,K=/(?:^|\s)hover(\.\S+|)\b/,Q=/^key/,G=/^(?:mouse|contextmenu)|click/,Y=/^(?:focusinfocus|focusoutblur)$/,Z=function(e){return v.event.special.hover?e:e.replace(K,"mouseenter$1 mouseleave$1")};v.event={add:function(e,n,r,i,s){var o,u,a,f,l,c,h,p,d,m,g;if(e.nodeType===3||e.nodeType===8||!n||!r||!(o=v._data(e)))return;r.handler&&(d=r,r=d.handler,s=d.selector),r.guid||(r.guid=v.guid++),a=o.events,a||(o.events=a={}),u=o.handle,u||(o.handle=u=function(e){return typeof v=="undefined"||!!e&&v.event.triggered===e.type?t:v.event.dispatch.apply(u.elem,arguments)},u.elem=e),n=v.trim(Z(n)).split(" ");for(f=0;f<n.length;f++){l=J.exec(n[f])||[],c=l[1],h=(l[2]||"").split(".").sort(),g=v.event.special[c]||{},c=(s?g.delegateType:g.bindType)||c,g=v.event.special[c]||{},p=v.extend({type:c,origType:l[1],data:i,handler:r,guid:r.guid,selector:s,needsContext:s&&v.expr.match.needsContext.test(s),namespace:h.join(".")},d),m=a[c];if(!m){m=a[c]=[],m.delegateCount=0;if(!g.setup||g.setup.call(e,i,h,u)===!1)e.addEventListener?e.addEventListener(c,u,!1):e.attachEvent&&e.attachEvent("on"+c,u)}g.add&&(g.add.call(e,p),p.handler.guid||(p.handler.guid=r.guid)),s?m.splice(m.delegateCount++,0,p):m.push(p),v.event.global[c]=!0}e=null},global:{},remove:function(e,t,n,r,i){var s,o,u,a,f,l,c,h,p,d,m,g=v.hasData(e)&&v._data(e);if(!g||!(h=g.events))return;t=v.trim(Z(t||"")).split(" ");for(s=0;s<t.length;s++){o=J.exec(t[s])||[],u=a=o[1],f=o[2];if(!u){for(u in h)v.event.remove(e,u+t[s],n,r,!0);continue}p=v.event.special[u]||{},u=(r?p.delegateType:p.bindType)||u,d=h[u]||[],l=d.length,f=f?new RegExp("(^|\\.)"+f.split(".").sort().join("\\.(?:.*\\.|)")+"(\\.|$)"):null;for(c=0;c<d.length;c++)m=d[c],(i||a===m.origType)&&(!n||n.guid===m.guid)&&(!f||f.test(m.namespace))&&(!r||r===m.selector||r==="**"&&m.selector)&&(d.splice(c--,1),m.selector&&d.delegateCount--,p.remove&&p.remove.call(e,m));d.length===0&&l!==d.length&&((!p.teardown||p.teardown.call(e,f,g.handle)===!1)&&v.removeEvent(e,u,g.handle),delete h[u])}v.isEmptyObject(h)&&(delete g.handle,v.removeData(e,"events",!0))},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(n,r,s,o){if(!s||s.nodeType!==3&&s.nodeType!==8){var u,a,f,l,c,h,p,d,m,g,y=n.type||n,b=[];if(Y.test(y+v.event.triggered))return;y.indexOf("!")>=0&&(y=y.slice(0,-1),a=!0),y.indexOf(".")>=0&&(b=y.split("."),y=b.shift(),b.sort());if((!s||v.event.customEvent[y])&&!v.event.global[y])return;n=typeof n=="object"?n[v.expando]?n:new v.Event(y,n):new v.Event(y),n.type=y,n.isTrigger=!0,n.exclusive=a,n.namespace=b.join("."),n.namespace_re=n.namespace?new RegExp("(^|\\.)"+b.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,h=y.indexOf(":")<0?"on"+y:"";if(!s){u=v.cache;for(f in u)u[f].events&&u[f].events[y]&&v.event.trigger(n,r,u[f].handle.elem,!0);return}n.result=t,n.target||(n.target=s),r=r!=null?v.makeArray(r):[],r.unshift(n),p=v.event.special[y]||{};if(p.trigger&&p.trigger.apply(s,r)===!1)return;m=[[s,p.bindType||y]];if(!o&&!p.noBubble&&!v.isWindow(s)){g=p.delegateType||y,l=Y.test(g+y)?s:s.parentNode;for(c=s;l;l=l.parentNode)m.push([l,g]),c=l;c===(s.ownerDocument||i)&&m.push([c.defaultView||c.parentWindow||e,g])}for(f=0;f<m.length&&!n.isPropagationStopped();f++)l=m[f][0],n.type=m[f][1],d=(v._data(l,"events")||{})[n.type]&&v._data(l,"handle"),d&&d.apply(l,r),d=h&&l[h],d&&v.acceptData(l)&&d.apply&&d.apply(l,r)===!1&&n.preventDefault();return n.type=y,!o&&!n.isDefaultPrevented()&&(!p._default||p._default.apply(s.ownerDocument,r)===!1)&&(y!=="click"||!v.nodeName(s,"a"))&&v.acceptData(s)&&h&&s[y]&&(y!=="focus"&&y!=="blur"||n.target.offsetWidth!==0)&&!v.isWindow(s)&&(c=s[h],c&&(s[h]=null),v.event.triggered=y,s[y](),v.event.triggered=t,c&&(s[h]=c)),n.result}return},dispatch:function(n){n=v.event.fix(n||e.event);var r,i,s,o,u,a,f,c,h,p,d=(v._data(this,"events")||{})[n.type]||[],m=d.delegateCount,g=l.call(arguments),y=!n.exclusive&&!n.namespace,b=v.event.special[n.type]||{},w=[];g[0]=n,n.delegateTarget=this;if(b.preDispatch&&b.preDispatch.call(this,n)===!1)return;if(m&&(!n.button||n.type!=="click"))for(s=n.target;s!=this;s=s.parentNode||this)if(s.disabled!==!0||n.type!=="click"){u={},f=[];for(r=0;r<m;r++)c=d[r],h=c.selector,u[h]===t&&(u[h]=c.needsContext?v(h,this).index(s)>=0:v.find(h,this,null,[s]).length),u[h]&&f.push(c);f.length&&w.push({elem:s,matches:f})}d.length>m&&w.push({elem:this,matches:d.slice(m)});for(r=0;r<w.length&&!n.isPropagationStopped();r++){a=w[r],n.currentTarget=a.elem;for(i=0;i<a.matches.length&&!n.isImmediatePropagationStopped();i++){c=a.matches[i];if(y||!n.namespace&&!c.namespace||n.namespace_re&&n.namespace_re.test(c.namespace))n.data=c.data,n.handleObj=c,o=((v.event.special[c.origType]||{}).handle||c.handler).apply(a.elem,g),o!==t&&(n.result=o,o===!1&&(n.preventDefault(),n.stopPropagation()))}}return b.postDispatch&&b.postDispatch.call(this,n),n.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return e.which==null&&(e.which=t.charCode!=null?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){var r,s,o,u=n.button,a=n.fromElement;return e.pageX==null&&n.clientX!=null&&(r=e.target.ownerDocument||i,s=r.documentElement,o=r.body,e.pageX=n.clientX+(s&&s.scrollLeft||o&&o.scrollLeft||0)-(s&&s.clientLeft||o&&o.clientLeft||0),e.pageY=n.clientY+(s&&s.scrollTop||o&&o.scrollTop||0)-(s&&s.clientTop||o&&o.clientTop||0)),!e.relatedTarget&&a&&(e.relatedTarget=a===e.target?n.toElement:a),!e.which&&u!==t&&(e.which=u&1?1:u&2?3:u&4?2:0),e}},fix:function(e){if(e[v.expando])return e;var t,n,r=e,s=v.event.fixHooks[e.type]||{},o=s.props?this.props.concat(s.props):this.props;e=v.Event(r);for(t=o.length;t;)n=o[--t],e[n]=r[n];return e.target||(e.target=r.srcElement||i),e.target.nodeType===3&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,s.filter?s.filter(e,r):e},special:{load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(e,t,n){v.isWindow(this)&&(this.onbeforeunload=n)},teardown:function(e,t){this.onbeforeunload===t&&(this.onbeforeunload=null)}}},simulate:function(e,t,n,r){var i=v.extend(new v.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?v.event.trigger(i,null,t):v.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},v.event.handle=v.event.dispatch,v.removeEvent=i.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,t,n){var r="on"+t;e.detachEvent&&(typeof e[r]=="undefined"&&(e[r]=null),e.detachEvent(r,n))},v.Event=function(e,t){if(!(this instanceof v.Event))return new v.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?tt:et):this.type=e,t&&v.extend(this,t),this.timeStamp=e&&e.timeStamp||v.now(),this[v.expando]=!0},v.Event.prototype={preventDefault:function(){this.isDefaultPrevented=tt;var e=this.originalEvent;if(!e)return;e.preventDefault?e.preventDefault():e.returnValue=!1},stopPropagation:function(){this.isPropagationStopped=tt;var e=this.originalEvent;if(!e)return;e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=tt,this.stopPropagation()},isDefaultPrevented:et,isPropagationStopped:et,isImmediatePropagationStopped:et},v.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){v.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,s=e.handleObj,o=s.selector;if(!i||i!==r&&!v.contains(r,i))e.type=s.origType,n=s.handler.apply(this,arguments),e.type=t;return n}}}),v.support.submitBubbles||(v.event.special.submit={setup:function(){if(v.nodeName(this,"form"))return!1;v.event.add(this,"click._submit keypress._submit",function(e){var n=e.target,r=v.nodeName(n,"input")||v.nodeName(n,"button")?n.form:t;r&&!v._data(r,"_submit_attached")&&(v.event.add(r,"submit._submit",function(e){e._submit_bubble=!0}),v._data(r,"_submit_attached",!0))})},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&v.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){if(v.nodeName(this,"form"))return!1;v.event.remove(this,"._submit")}}),v.support.changeBubbles||(v.event.special.change={setup:function(){if($.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")v.event.add(this,"propertychange._change",function(e){e.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),v.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),v.event.simulate("change",this,e,!0)});return!1}v.event.add(this,"beforeactivate._change",function(e){var t=e.target;$.test(t.nodeName)&&!v._data(t,"_change_attached")&&(v.event.add(t,"change._change",function(e){this.parentNode&&!e.isSimulated&&!e.isTrigger&&v.event.simulate("change",this.parentNode,e,!0)}),v._data(t,"_change_attached",!0))})},handle:function(e){var t=e.target;if(this!==t||e.isSimulated||e.isTrigger||t.type!=="radio"&&t.type!=="checkbox")return e.handleObj.handler.apply(this,arguments)},teardown:function(){return v.event.remove(this,"._change"),!$.test(this.nodeName)}}),v.support.focusinBubbles||v.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){v.event.simulate(t,e.target,v.event.fix(e),!0)};v.event.special[t]={setup:function(){n++===0&&i.addEventListener(e,r,!0)},teardown:function(){--n===0&&i.removeEventListener(e,r,!0)}}}),v.fn.extend({on:function(e,n,r,i,s){var o,u;if(typeof e=="object"){typeof n!="string"&&(r=r||n,n=t);for(u in e)this.on(u,n,r,e[u],s);return this}r==null&&i==null?(i=n,r=n=t):i==null&&(typeof n=="string"?(i=r,r=t):(i=r,r=n,n=t));if(i===!1)i=et;else if(!i)return this;return s===1&&(o=i,i=function(e){return v().off(e),o.apply(this,arguments)},i.guid=o.guid||(o.guid=v.guid++)),this.each(function(){v.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,s;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,v(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if(typeof e=="object"){for(s in e)this.off(s,n,e[s]);return this}if(n===!1||typeof n=="function")r=n,n=t;return r===!1&&(r=et),this.each(function(){v.event.remove(this,e,r,n)})},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},live:function(e,t,n){return v(this.context).on(e,this.selector,t,n),this},die:function(e,t){return v(this.context).off(e,this.selector||"**",t),this},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return arguments.length===1?this.off(e,"**"):this.off(t,e||"**",n)},trigger:function(e,t){return this.each(function(){v.event.trigger(e,t,this)})},triggerHandler:function(e,t){if(this[0])return v.event.trigger(e,t,this[0],!0)},toggle:function(e){var t=arguments,n=e.guid||v.guid++,r=0,i=function(n){var i=(v._data(this,"lastToggle"+e.guid)||0)%r;return v._data(this,"lastToggle"+e.guid,i+1),n.preventDefault(),t[i].apply(this,arguments)||!1};i.guid=n;while(r<t.length)t[r++].guid=n;return this.click(i)},hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),v.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){v.fn[t]=function(e,n){return n==null&&(n=e,e=null),arguments.length>0?this.on(t,null,e,n):this.trigger(t)},Q.test(t)&&(v.event.fixHooks[t]=v.event.keyHooks),G.test(t)&&(v.event.fixHooks[t]=v.event.mouseHooks)}),function(e,t){function nt(e,t,n,r){n=n||[],t=t||g;var i,s,a,f,l=t.nodeType;if(!e||typeof e!="string")return n;if(l!==1&&l!==9)return[];a=o(t);if(!a&&!r)if(i=R.exec(e))if(f=i[1]){if(l===9){s=t.getElementById(f);if(!s||!s.parentNode)return n;if(s.id===f)return n.push(s),n}else if(t.ownerDocument&&(s=t.ownerDocument.getElementById(f))&&u(t,s)&&s.id===f)return n.push(s),n}else{if(i[2])return S.apply(n,x.call(t.getElementsByTagName(e),0)),n;if((f=i[3])&&Z&&t.getElementsByClassName)return S.apply(n,x.call(t.getElementsByClassName(f),0)),n}return vt(e.replace(j,"$1"),t,n,r,a)}function rt(e){return function(t){var n=t.nodeName.toLowerCase();return n==="input"&&t.type===e}}function it(e){return function(t){var n=t.nodeName.toLowerCase();return(n==="input"||n==="button")&&t.type===e}}function st(e){return N(function(t){return t=+t,N(function(n,r){var i,s=e([],n.length,t),o=s.length;while(o--)n[i=s[o]]&&(n[i]=!(r[i]=n[i]))})})}function ot(e,t,n){if(e===t)return n;var r=e.nextSibling;while(r){if(r===t)return-1;r=r.nextSibling}return 1}function ut(e,t){var n,r,s,o,u,a,f,l=L[d][e+" "];if(l)return t?0:l.slice(0);u=e,a=[],f=i.preFilter;while(u){if(!n||(r=F.exec(u)))r&&(u=u.slice(r[0].length)||u),a.push(s=[]);n=!1;if(r=I.exec(u))s.push(n=new m(r.shift())),u=u.slice(n.length),n.type=r[0].replace(j," ");for(o in i.filter)(r=J[o].exec(u))&&(!f[o]||(r=f[o](r)))&&(s.push(n=new m(r.shift())),u=u.slice(n.length),n.type=o,n.matches=r);if(!n)break}return t?u.length:u?nt.error(e):L(e,a).slice(0)}function at(e,t,r){var i=t.dir,s=r&&t.dir==="parentNode",o=w++;return t.first?function(t,n,r){while(t=t[i])if(s||t.nodeType===1)return e(t,n,r)}:function(t,r,u){if(!u){var a,f=b+" "+o+" ",l=f+n;while(t=t[i])if(s||t.nodeType===1){if((a=t[d])===l)return t.sizset;if(typeof a=="string"&&a.indexOf(f)===0){if(t.sizset)return t}else{t[d]=l;if(e(t,r,u))return t.sizset=!0,t;t.sizset=!1}}}else while(t=t[i])if(s||t.nodeType===1)if(e(t,r,u))return t}}function ft(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function lt(e,t,n,r,i){var s,o=[],u=0,a=e.length,f=t!=null;for(;u<a;u++)if(s=e[u])if(!n||n(s,r,i))o.push(s),f&&t.push(u);return o}function ct(e,t,n,r,i,s){return r&&!r[d]&&(r=ct(r)),i&&!i[d]&&(i=ct(i,s)),N(function(s,o,u,a){var f,l,c,h=[],p=[],d=o.length,v=s||dt(t||"*",u.nodeType?[u]:u,[]),m=e&&(s||!t)?lt(v,h,e,u,a):v,g=n?i||(s?e:d||r)?[]:o:m;n&&n(m,g,u,a);if(r){f=lt(g,p),r(f,[],u,a),l=f.length;while(l--)if(c=f[l])g[p[l]]=!(m[p[l]]=c)}if(s){if(i||e){if(i){f=[],l=g.length;while(l--)(c=g[l])&&f.push(m[l]=c);i(null,g=[],f,a)}l=g.length;while(l--)(c=g[l])&&(f=i?T.call(s,c):h[l])>-1&&(s[f]=!(o[f]=c))}}else g=lt(g===o?g.splice(d,g.length):g),i?i(null,o,g,a):S.apply(o,g)})}function ht(e){var t,n,r,s=e.length,o=i.relative[e[0].type],u=o||i.relative[" "],a=o?1:0,f=at(function(e){return e===t},u,!0),l=at(function(e){return T.call(t,e)>-1},u,!0),h=[function(e,n,r){return!o&&(r||n!==c)||((t=n).nodeType?f(e,n,r):l(e,n,r))}];for(;a<s;a++)if(n=i.relative[e[a].type])h=[at(ft(h),n)];else{n=i.filter[e[a].type].apply(null,e[a].matches);if(n[d]){r=++a;for(;r<s;r++)if(i.relative[e[r].type])break;return ct(a>1&&ft(h),a>1&&e.slice(0,a-1).join("").replace(j,"$1"),n,a<r&&ht(e.slice(a,r)),r<s&&ht(e=e.slice(r)),r<s&&e.join(""))}h.push(n)}return ft(h)}function pt(e,t){var r=t.length>0,s=e.length>0,o=function(u,a,f,l,h){var p,d,v,m=[],y=0,w="0",x=u&&[],T=h!=null,N=c,C=u||s&&i.find.TAG("*",h&&a.parentNode||a),k=b+=N==null?1:Math.E;T&&(c=a!==g&&a,n=o.el);for(;(p=C[w])!=null;w++){if(s&&p){for(d=0;v=e[d];d++)if(v(p,a,f)){l.push(p);break}T&&(b=k,n=++o.el)}r&&((p=!v&&p)&&y--,u&&x.push(p))}y+=w;if(r&&w!==y){for(d=0;v=t[d];d++)v(x,m,a,f);if(u){if(y>0)while(w--)!x[w]&&!m[w]&&(m[w]=E.call(l));m=lt(m)}S.apply(l,m),T&&!u&&m.length>0&&y+t.length>1&&nt.uniqueSort(l)}return T&&(b=k,c=N),x};return o.el=0,r?N(o):o}function dt(e,t,n){var r=0,i=t.length;for(;r<i;r++)nt(e,t[r],n);return n}function vt(e,t,n,r,s){var o,u,f,l,c,h=ut(e),p=h.length;if(!r&&h.length===1){u=h[0]=h[0].slice(0);if(u.length>2&&(f=u[0]).type==="ID"&&t.nodeType===9&&!s&&i.relative[u[1].type]){t=i.find.ID(f.matches[0].replace($,""),t,s)[0];if(!t)return n;e=e.slice(u.shift().length)}for(o=J.POS.test(e)?-1:u.length-1;o>=0;o--){f=u[o];if(i.relative[l=f.type])break;if(c=i.find[l])if(r=c(f.matches[0].replace($,""),z.test(u[0].type)&&t.parentNode||t,s)){u.splice(o,1),e=r.length&&u.join("");if(!e)return S.apply(n,x.call(r,0)),n;break}}}return a(e,h)(r,t,s,n,z.test(e)),n}function mt(){}var n,r,i,s,o,u,a,f,l,c,h=!0,p="undefined",d=("sizcache"+Math.random()).replace(".",""),m=String,g=e.document,y=g.documentElement,b=0,w=0,E=[].pop,S=[].push,x=[].slice,T=[].indexOf||function(e){var t=0,n=this.length;for(;t<n;t++)if(this[t]===e)return t;return-1},N=function(e,t){return e[d]=t==null||t,e},C=function(){var e={},t=[];return N(function(n,r){return t.push(n)>i.cacheLength&&delete e[t.shift()],e[n+" "]=r},e)},k=C(),L=C(),A=C(),O="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",_=M.replace("w","w#"),D="([*^$|!~]?=)",P="\\["+O+"*("+M+")"+O+"*(?:"+D+O+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+_+")|)|)"+O+"*\\]",H=":("+M+")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:"+P+")|[^:]|\\\\.)*|.*))\\)|)",B=":(even|odd|eq|gt|lt|nth|first|last)(?:\\("+O+"*((?:-\\d)?\\d*)"+O+"*\\)|)(?=[^-]|$)",j=new RegExp("^"+O+"+|((?:^|[^\\\\])(?:\\\\.)*)"+O+"+$","g"),F=new RegExp("^"+O+"*,"+O+"*"),I=new RegExp("^"+O+"*([\\x20\\t\\r\\n\\f>+~])"+O+"*"),q=new RegExp(H),R=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,U=/^:not/,z=/[\x20\t\r\n\f]*[+~]/,W=/:not\($/,X=/h\d/i,V=/input|select|textarea|button/i,$=/\\(?!\\)/g,J={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),NAME:new RegExp("^\\[name=['\"]?("+M+")['\"]?\\]"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+P),PSEUDO:new RegExp("^"+H),POS:new RegExp(B,"i"),CHILD:new RegExp("^:(only|nth|first|last)-child(?:\\("+O+"*(even|odd|(([+-]|)(\\d*)n|)"+O+"*(?:([+-]|)"+O+"*(\\d+)|))"+O+"*\\)|)","i"),needsContext:new RegExp("^"+O+"*[>+~]|"+B,"i")},K=function(e){var t=g.createElement("div");try{return e(t)}catch(n){return!1}finally{t=null}},Q=K(function(e){return e.appendChild(g.createComment("")),!e.getElementsByTagName("*").length}),G=K(function(e){return e.innerHTML="<a href='#'></a>",e.firstChild&&typeof e.firstChild.getAttribute!==p&&e.firstChild.getAttribute("href")==="#"}),Y=K(function(e){e.innerHTML="<select></select>";var t=typeof e.lastChild.getAttribute("multiple");return t!=="boolean"&&t!=="string"}),Z=K(function(e){return e.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",!e.getElementsByClassName||!e.getElementsByClassName("e").length?!1:(e.lastChild.className="e",e.getElementsByClassName("e").length===2)}),et=K(function(e){e.id=d+0,e.innerHTML="<a name='"+d+"'></a><div name='"+d+"'></div>",y.insertBefore(e,y.firstChild);var t=g.getElementsByName&&g.getElementsByName(d).length===2+g.getElementsByName(d+0).length;return r=!g.getElementById(d),y.removeChild(e),t});try{x.call(y.childNodes,0)[0].nodeType}catch(tt){x=function(e){var t,n=[];for(;t=this[e];e++)n.push(t);return n}}nt.matches=function(e,t){return nt(e,null,null,t)},nt.matchesSelector=function(e,t){return nt(t,null,null,[e]).length>0},s=nt.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(i===1||i===9||i===11){if(typeof e.textContent=="string")return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=s(e)}else if(i===3||i===4)return e.nodeValue}else for(;t=e[r];r++)n+=s(t);return n},o=nt.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?t.nodeName!=="HTML":!1},u=nt.contains=y.contains?function(e,t){var n=e.nodeType===9?e.documentElement:e,r=t&&t.parentNode;return e===r||!!(r&&r.nodeType===1&&n.contains&&n.contains(r))}:y.compareDocumentPosition?function(e,t){return t&&!!(e.compareDocumentPosition(t)&16)}:function(e,t){while(t=t.parentNode)if(t===e)return!0;return!1},nt.attr=function(e,t){var n,r=o(e);return r||(t=t.toLowerCase()),(n=i.attrHandle[t])?n(e):r||Y?e.getAttribute(t):(n=e.getAttributeNode(t),n?typeof e[t]=="boolean"?e[t]?t:null:n.specified?n.value:null:null)},i=nt.selectors={cacheLength:50,createPseudo:N,match:J,attrHandle:G?{}:{href:function(e){return e.getAttribute("href",2)},type:function(e){return e.getAttribute("type")}},find:{ID:r?function(e,t,n){if(typeof t.getElementById!==p&&!n){var r=t.getElementById(e);return r&&r.parentNode?[r]:[]}}:function(e,n,r){if(typeof n.getElementById!==p&&!r){var i=n.getElementById(e);return i?i.id===e||typeof i.getAttributeNode!==p&&i.getAttributeNode("id").value===e?[i]:t:[]}},TAG:Q?function(e,t){if(typeof t.getElementsByTagName!==p)return t.getElementsByTagName(e)}:function(e,t){var n=t.getElementsByTagName(e);if(e==="*"){var r,i=[],s=0;for(;r=n[s];s++)r.nodeType===1&&i.push(r);return i}return n},NAME:et&&function(e,t){if(typeof t.getElementsByName!==p)return t.getElementsByName(name)},CLASS:Z&&function(e,t,n){if(typeof t.getElementsByClassName!==p&&!n)return t.getElementsByClassName(e)}},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace($,""),e[3]=(e[4]||e[5]||"").replace($,""),e[2]==="~="&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),e[1]==="nth"?(e[2]||nt.error(e[0]),e[3]=+(e[3]?e[4]+(e[5]||1):2*(e[2]==="even"||e[2]==="odd")),e[4]=+(e[6]+e[7]||e[2]==="odd")):e[2]&&nt.error(e[0]),e},PSEUDO:function(e){var t,n;if(J.CHILD.test(e[0]))return null;if(e[3])e[2]=e[3];else if(t=e[4])q.test(t)&&(n=ut(t,!0))&&(n=t.indexOf(")",t.length-n)-t.length)&&(t=t.slice(0,n),e[0]=e[0].slice(0,n)),e[2]=t;return e.slice(0,3)}},filter:{ID:r?function(e){return e=e.replace($,""),function(t){return t.getAttribute("id")===e}}:function(e){return e=e.replace($,""),function(t){var n=typeof t.getAttributeNode!==p&&t.getAttributeNode("id");return n&&n.value===e}},TAG:function(e){return e==="*"?function(){return!0}:(e=e.replace($,"").toLowerCase(),function(t){return t.nodeName&&t.nodeName.toLowerCase()===e})},CLASS:function(e){var t=k[d][e+" "];return t||(t=new RegExp("(^|"+O+")"+e+"("+O+"|$)"))&&k(e,function(e){return t.test(e.className||typeof e.getAttribute!==p&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r,i){var s=nt.attr(r,e);return s==null?t==="!=":t?(s+="",t==="="?s===n:t==="!="?s!==n:t==="^="?n&&s.indexOf(n)===0:t==="*="?n&&s.indexOf(n)>-1:t==="$="?n&&s.substr(s.length-n.length)===n:t==="~="?(" "+s+" ").indexOf(n)>-1:t==="|="?s===n||s.substr(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r){return e==="nth"?function(e){var t,i,s=e.parentNode;if(n===1&&r===0)return!0;if(s){i=0;for(t=s.firstChild;t;t=t.nextSibling)if(t.nodeType===1){i++;if(e===t)break}}return i-=r,i===n||i%n===0&&i/n>=0}:function(t){var n=t;switch(e){case"only":case"first":while(n=n.previousSibling)if(n.nodeType===1)return!1;if(e==="first")return!0;n=t;case"last":while(n=n.nextSibling)if(n.nodeType===1)return!1;return!0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||nt.error("unsupported pseudo: "+e);return r[d]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?N(function(e,n){var i,s=r(e,t),o=s.length;while(o--)i=T.call(e,s[o]),e[i]=!(n[i]=s[o])}):function(e){return r(e,0,n)}):r}},pseudos:{not:N(function(e){var t=[],n=[],r=a(e.replace(j,"$1"));return r[d]?N(function(e,t,n,i){var s,o=r(e,null,i,[]),u=e.length;while(u--)if(s=o[u])e[u]=!(t[u]=s)}):function(e,i,s){return t[0]=e,r(t,null,s,n),!n.pop()}}),has:N(function(e){return function(t){return nt(e,t).length>0}}),contains:N(function(e){return function(t){return(t.textContent||t.innerText||s(t)).indexOf(e)>-1}}),enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&!!e.checked||t==="option"&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},parent:function(e){return!i.pseudos.empty(e)},empty:function(e){var t;e=e.firstChild;while(e){if(e.nodeName>"@"||(t=e.nodeType)===3||t===4)return!1;e=e.nextSibling}return!0},header:function(e){return X.test(e.nodeName)},text:function(e){var t,n;return e.nodeName.toLowerCase()==="input"&&(t=e.type)==="text"&&((n=e.getAttribute("type"))==null||n.toLowerCase()===t)},radio:rt("radio"),checkbox:rt("checkbox"),file:rt("file"),password:rt("password"),image:rt("image"),submit:it("submit"),reset:it("reset"),button:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&e.type==="button"||t==="button"},input:function(e){return V.test(e.nodeName)},focus:function(e){var t=e.ownerDocument;return e===t.activeElement&&(!t.hasFocus||t.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},active:function(e){return e===e.ownerDocument.activeElement},first:st(function(){return[0]}),last:st(function(e,t){return[t-1]}),eq:st(function(e,t,n){return[n<0?n+t:n]}),even:st(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:st(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:st(function(e,t,n){for(var r=n<0?n+t:n;--r>=0;)e.push(r);return e}),gt:st(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}},f=y.compareDocumentPosition?function(e,t){return e===t?(l=!0,0):(!e.compareDocumentPosition||!t.compareDocumentPosition?e.compareDocumentPosition:e.compareDocumentPosition(t)&4)?-1:1}:function(e,t){if(e===t)return l=!0,0;if(e.sourceIndex&&t.sourceIndex)return e.sourceIndex-t.sourceIndex;var n,r,i=[],s=[],o=e.parentNode,u=t.parentNode,a=o;if(o===u)return ot(e,t);if(!o)return-1;if(!u)return 1;while(a)i.unshift(a),a=a.parentNode;a=u;while(a)s.unshift(a),a=a.parentNode;n=i.length,r=s.length;for(var f=0;f<n&&f<r;f++)if(i[f]!==s[f])return ot(i[f],s[f]);return f===n?ot(e,s[f],-1):ot(i[f],t,1)},[0,0].sort(f),h=!l,nt.uniqueSort=function(e){var t,n=[],r=1,i=0;l=h,e.sort(f);if(l){for(;t=e[r];r++)t===e[r-1]&&(i=n.push(r));while(i--)e.splice(n[i],1)}return e},nt.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},a=nt.compile=function(e,t){var n,r=[],i=[],s=A[d][e+" "];if(!s){t||(t=ut(e)),n=t.length;while(n--)s=ht(t[n]),s[d]?r.push(s):i.push(s);s=A(e,pt(i,r))}return s},g.querySelectorAll&&function(){var e,t=vt,n=/'|\\/g,r=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,i=[":focus"],s=[":active"],u=y.matchesSelector||y.mozMatchesSelector||y.webkitMatchesSelector||y.oMatchesSelector||y.msMatchesSelector;K(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||i.push("\\["+O+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),e.querySelectorAll(":checked").length||i.push(":checked")}),K(function(e){e.innerHTML="<p test=''></p>",e.querySelectorAll("[test^='']").length&&i.push("[*^$]="+O+"*(?:\"\"|'')"),e.innerHTML="<input type='hidden'/>",e.querySelectorAll(":enabled").length||i.push(":enabled",":disabled")}),i=new RegExp(i.join("|")),vt=function(e,r,s,o,u){if(!o&&!u&&!i.test(e)){var a,f,l=!0,c=d,h=r,p=r.nodeType===9&&e;if(r.nodeType===1&&r.nodeName.toLowerCase()!=="object"){a=ut(e),(l=r.getAttribute("id"))?c=l.replace(n,"\\$&"):r.setAttribute("id",c),c="[id='"+c+"'] ",f=a.length;while(f--)a[f]=c+a[f].join("");h=z.test(e)&&r.parentNode||r,p=a.join(",")}if(p)try{return S.apply(s,x.call(h.querySelectorAll(p),0)),s}catch(v){}finally{l||r.removeAttribute("id")}}return t(e,r,s,o,u)},u&&(K(function(t){e=u.call(t,"div");try{u.call(t,"[test!='']:sizzle"),s.push("!=",H)}catch(n){}}),s=new RegExp(s.join("|")),nt.matchesSelector=function(t,n){n=n.replace(r,"='$1']");if(!o(t)&&!s.test(n)&&!i.test(n))try{var a=u.call(t,n);if(a||e||t.document&&t.document.nodeType!==11)return a}catch(f){}return nt(n,null,null,[t]).length>0})}(),i.pseudos.nth=i.pseudos.eq,i.filters=mt.prototype=i.pseudos,i.setFilters=new mt,nt.attr=v.attr,v.find=nt,v.expr=nt.selectors,v.expr[":"]=v.expr.pseudos,v.unique=nt.uniqueSort,v.text=nt.getText,v.isXMLDoc=nt.isXML,v.contains=nt.contains}(e);var nt=/Until$/,rt=/^(?:parents|prev(?:Until|All))/,it=/^.[^:#\[\.,]*$/,st=v.expr.match.needsContext,ot={children:!0,contents:!0,next:!0,prev:!0};v.fn.extend({find:function(e){var t,n,r,i,s,o,u=this;if(typeof e!="string")return v(e).filter(function(){for(t=0,n=u.length;t<n;t++)if(v.contains(u[t],this))return!0});o=this.pushStack("","find",e);for(t=0,n=this.length;t<n;t++){r=o.length,v.find(e,this[t],o);if(t>0)for(i=r;i<o.length;i++)for(s=0;s<r;s++)if(o[s]===o[i]){o.splice(i--,1);break}}return o},has:function(e){var t,n=v(e,this),r=n.length;return this.filter(function(){for(t=0;t<r;t++)if(v.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(ft(this,e,!1),"not",e)},filter:function(e){return this.pushStack(ft(this,e,!0),"filter",e)},is:function(e){return!!e&&(typeof e=="string"?st.test(e)?v(e,this.context).index(this[0])>=0:v.filter(e,this).length>0:this.filter(e).length>0)},closest:function(e,t){var n,r=0,i=this.length,s=[],o=st.test(e)||typeof e!="string"?v(e,t||this.context):0;for(;r<i;r++){n=this[r];while(n&&n.ownerDocument&&n!==t&&n.nodeType!==11){if(o?o.index(n)>-1:v.find.matchesSelector(n,e)){s.push(n);break}n=n.parentNode}}return s=s.length>1?v.unique(s):s,this.pushStack(s,"closest",e)},index:function(e){return e?typeof e=="string"?v.inArray(this[0],v(e)):v.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.prevAll().length:-1},add:function(e,t){var n=typeof e=="string"?v(e,t):v.makeArray(e&&e.nodeType?[e]:e),r=v.merge(this.get(),n);return this.pushStack(ut(n[0])||ut(r[0])?r:v.unique(r))},addBack:function(e){return this.add(e==null?this.prevObject:this.prevObject.filter(e))}}),v.fn.andSelf=v.fn.addBack,v.each({parent:function(e){var t=e.parentNode;return t&&t.nodeType!==11?t:null},parents:function(e){return v.dir(e,"parentNode")},parentsUntil:function(e,t,n){return v.dir(e,"parentNode",n)},next:function(e){return at(e,"nextSibling")},prev:function(e){return at(e,"previousSibling")},nextAll:function(e){return v.dir(e,"nextSibling")},prevAll:function(e){return v.dir(e,"previousSibling")},nextUntil:function(e,t,n){return v.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return v.dir(e,"previousSibling",n)},siblings:function(e){return v.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return v.sibling(e.firstChild)},contents:function(e){return v.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:v.merge([],e.childNodes)}},function(e,t){v.fn[e]=function(n,r){var i=v.map(this,t,n);return nt.test(e)||(r=n),r&&typeof r=="string"&&(i=v.filter(r,i)),i=this.length>1&&!ot[e]?v.unique(i):i,this.length>1&&rt.test(e)&&(i=i.reverse()),this.pushStack(i,e,l.call(arguments).join(","))}}),v.extend({filter:function(e,t,n){return n&&(e=":not("+e+")"),t.length===1?v.find.matchesSelector(t[0],e)?[t[0]]:[]:v.find.matches(e,t)},dir:function(e,n,r){var i=[],s=e[n];while(s&&s.nodeType!==9&&(r===t||s.nodeType!==1||!v(s).is(r)))s.nodeType===1&&i.push(s),s=s[n];return i},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)e.nodeType===1&&e!==t&&n.push(e);return n}});var ct="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",ht=/ jQuery\d+="(?:null|\d+)"/g,pt=/^\s+/,dt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,vt=/<([\w:]+)/,mt=/<tbody/i,gt=/<|&#?\w+;/,yt=/<(?:script|style|link)/i,bt=/<(?:script|object|embed|option|style)/i,wt=new RegExp("<(?:"+ct+")[\\s/>]","i"),Et=/^(?:checkbox|radio)$/,St=/checked\s*(?:[^=]|=\s*.checked.)/i,xt=/\/(java|ecma)script/i,Tt=/^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,Nt={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},Ct=lt(i),kt=Ct.appendChild(i.createElement("div"));Nt.optgroup=Nt.option,Nt.tbody=Nt.tfoot=Nt.colgroup=Nt.caption=Nt.thead,Nt.th=Nt.td,v.support.htmlSerialize||(Nt._default=[1,"X<div>","</div>"]),v.fn.extend({text:function(e){return v.access(this,function(e){return e===t?v.text(this):this.empty().append((this[0]&&this[0].ownerDocument||i).createTextNode(e))},null,e,arguments.length)},wrapAll:function(e){if(v.isFunction(e))return this.each(function(t){v(this).wrapAll(e.call(this,t))});if(this[0]){var t=v(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstChild&&e.firstChild.nodeType===1)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return v.isFunction(e)?this.each(function(t){v(this).wrapInner(e.call(this,t))}):this.each(function(){var t=v(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=v.isFunction(e);return this.each(function(n){v(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){v.nodeName(this,"body")||v(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(e){(this.nodeType===1||this.nodeType===11)&&this.appendChild(e)})},prepend:function(){return this.domManip(arguments,!0,function(e){(this.nodeType===1||this.nodeType===11)&&this.insertBefore(e,this.firstChild)})},before:function(){if(!ut(this[0]))return this.domManip(arguments,!1,function(e){this.parentNode.insertBefore(e,this)});if(arguments.length){var e=v.clean(arguments);return this.pushStack(v.merge(e,this),"before",this.selector)}},after:function(){if(!ut(this[0]))return this.domManip(arguments,!1,function(e){this.parentNode.insertBefore(e,this.nextSibling)});if(arguments.length){var e=v.clean(arguments);return this.pushStack(v.merge(this,e),"after",this.selector)}},remove:function(e,t){var n,r=0;for(;(n=this[r])!=null;r++)if(!e||v.filter(e,[n]).length)!t&&n.nodeType===1&&(v.cleanData(n.getElementsByTagName("*")),v.cleanData([n])),n.parentNode&&n.parentNode.removeChild(n);return this},empty:function(){var e,t=0;for(;(e=this[t])!=null;t++){e.nodeType===1&&v.cleanData(e.getElementsByTagName("*"));while(e.firstChild)e.removeChild(e.firstChild)}return this},clone:function(e,t){return e=e==null?!1:e,t=t==null?e:t,this.map(function(){return v.clone(this,e,t)})},html:function(e){return v.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return n.nodeType===1?n.innerHTML.replace(ht,""):t;if(typeof e=="string"&&!yt.test(e)&&(v.support.htmlSerialize||!wt.test(e))&&(v.support.leadingWhitespace||!pt.test(e))&&!Nt[(vt.exec(e)||["",""])[1].toLowerCase()]){e=e.replace(dt,"<$1></$2>");try{for(;r<i;r++)n=this[r]||{},n.nodeType===1&&(v.cleanData(n.getElementsByTagName("*")),n.innerHTML=e);n=0}catch(s){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(e){return ut(this[0])?this.length?this.pushStack(v(v.isFunction(e)?e():e),"replaceWith",e):this:v.isFunction(e)?this.each(function(t){var n=v(this),r=n.html();n.replaceWith(e.call(this,t,r))}):(typeof e!="string"&&(e=v(e).detach()),this.each(function(){var t=this.nextSibling,n=this.parentNode;v(this).remove(),t?v(t).before(e):v(n).append(e)}))},detach:function(e){return this.remove(e,!0)},domManip:function(e,n,r){e=[].concat.apply([],e);var i,s,o,u,a=0,f=e[0],l=[],c=this.length;if(!v.support.checkClone&&c>1&&typeof f=="string"&&St.test(f))return this.each(function(){v(this).domManip(e,n,r)});if(v.isFunction(f))return this.each(function(i){var s=v(this);e[0]=f.call(this,i,n?s.html():t),s.domManip(e,n,r)});if(this[0]){i=v.buildFragment(e,this,l),o=i.fragment,s=o.firstChild,o.childNodes.length===1&&(o=s);if(s){n=n&&v.nodeName(s,"tr");for(u=i.cacheable||c-1;a<c;a++)r.call(n&&v.nodeName(this[a],"table")?Lt(this[a],"tbody"):this[a],a===u?o:v.clone(o,!0,!0))}o=s=null,l.length&&v.each(l,function(e,t){t.src?v.ajax?v.ajax({url:t.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):v.error("no ajax"):v.globalEval((t.text||t.textContent||t.innerHTML||"").replace(Tt,"")),t.parentNode&&t.parentNode.removeChild(t)})}return this}}),v.buildFragment=function(e,n,r){var s,o,u,a=e[0];return n=n||i,n=!n.nodeType&&n[0]||n,n=n.ownerDocument||n,e.length===1&&typeof a=="string"&&a.length<512&&n===i&&a.charAt(0)==="<"&&!bt.test(a)&&(v.support.checkClone||!St.test(a))&&(v.support.html5Clone||!wt.test(a))&&(o=!0,s=v.fragments[a],u=s!==t),s||(s=n.createDocumentFragment(),v.clean(e,n,s,r),o&&(v.fragments[a]=u&&s)),{fragment:s,cacheable:o}},v.fragments={},v.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){v.fn[e]=function(n){var r,i=0,s=[],o=v(n),u=o.length,a=this.length===1&&this[0].parentNode;if((a==null||a&&a.nodeType===11&&a.childNodes.length===1)&&u===1)return o[t](this[0]),this;for(;i<u;i++)r=(i>0?this.clone(!0):this).get(),v(o[i])[t](r),s=s.concat(r);return this.pushStack(s,e,o.selector)}}),v.extend({clone:function(e,t,n){var r,i,s,o;v.support.html5Clone||v.isXMLDoc(e)||!wt.test("<"+e.nodeName+">")?o=e.cloneNode(!0):(kt.innerHTML=e.outerHTML,kt.removeChild(o=kt.firstChild));if((!v.support.noCloneEvent||!v.support.noCloneChecked)&&(e.nodeType===1||e.nodeType===11)&&!v.isXMLDoc(e)){Ot(e,o),r=Mt(e),i=Mt(o);for(s=0;r[s];++s)i[s]&&Ot(r[s],i[s])}if(t){At(e,o);if(n){r=Mt(e),i=Mt(o);for(s=0;r[s];++s)At(r[s],i[s])}}return r=i=null,o},clean:function(e,t,n,r){var s,o,u,a,f,l,c,h,p,d,m,g,y=t===i&&Ct,b=[];if(!t||typeof t.createDocumentFragment=="undefined")t=i;for(s=0;(u=e[s])!=null;s++){typeof u=="number"&&(u+="");if(!u)continue;if(typeof u=="string")if(!gt.test(u))u=t.createTextNode(u);else{y=y||lt(t),c=t.createElement("div"),y.appendChild(c),u=u.replace(dt,"<$1></$2>"),a=(vt.exec(u)||["",""])[1].toLowerCase(),f=Nt[a]||Nt._default,l=f[0],c.innerHTML=f[1]+u+f[2];while(l--)c=c.lastChild;if(!v.support.tbody){h=mt.test(u),p=a==="table"&&!h?c.firstChild&&c.firstChild.childNodes:f[1]==="<table>"&&!h?c.childNodes:[];for(o=p.length-1;o>=0;--o)v.nodeName(p[o],"tbody")&&!p[o].childNodes.length&&p[o].parentNode.removeChild(p[o])}!v.support.leadingWhitespace&&pt.test(u)&&c.insertBefore(t.createTextNode(pt.exec(u)[0]),c.firstChild),u=c.childNodes,c.parentNode.removeChild(c)}u.nodeType?b.push(u):v.merge(b,u)}c&&(u=c=y=null);if(!v.support.appendChecked)for(s=0;(u=b[s])!=null;s++)v.nodeName(u,"input")?_t(u):typeof u.getElementsByTagName!="undefined"&&v.grep(u.getElementsByTagName("input"),_t);if(n){m=function(e){if(!e.type||xt.test(e.type))return r?r.push(e.parentNode?e.parentNode.removeChild(e):e):n.appendChild(e)};for(s=0;(u=b[s])!=null;s++)if(!v.nodeName(u,"script")||!m(u))n.appendChild(u),typeof u.getElementsByTagName!="undefined"&&(g=v.grep(v.merge([],u.getElementsByTagName("script")),m),b.splice.apply(b,[s+1,0].concat(g)),s+=g.length)}return b},cleanData:function(e,t){var n,r,i,s,o=0,u=v.expando,a=v.cache,f=v.support.deleteExpando,l=v.event.special;for(;(i=e[o])!=null;o++)if(t||v.acceptData(i)){r=i[u],n=r&&a[r];if(n){if(n.events)for(s in n.events)l[s]?v.event.remove(i,s):v.removeEvent(i,s,n.handle);a[r]&&(delete a[r],f?delete i[u]:i.removeAttribute?i.removeAttribute(u):i[u]=null,v.deletedIds.push(r))}}}}),function(){var e,t;v.uaMatch=function(e){e=e.toLowerCase();var t=/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[];return{browser:t[1]||"",version:t[2]||"0"}},e=v.uaMatch(o.userAgent),t={},e.browser&&(t[e.browser]=!0,t.version=e.version),t.chrome?t.webkit=!0:t.webkit&&(t.safari=!0),v.browser=t,v.sub=function(){function e(t,n){return new e.fn.init(t,n)}v.extend(!0,e,this),e.superclass=this,e.fn=e.prototype=this(),e.fn.constructor=e,e.sub=this.sub,e.fn.init=function(r,i){return i&&i instanceof v&&!(i instanceof e)&&(i=e(i)),v.fn.init.call(this,r,i,t)},e.fn.init.prototype=e.fn;var t=e(i);return e}}();var Dt,Pt,Ht,Bt=/alpha\([^)]*\)/i,jt=/opacity=([^)]*)/,Ft=/^(top|right|bottom|left)$/,It=/^(none|table(?!-c[ea]).+)/,qt=/^margin/,Rt=new RegExp("^("+m+")(.*)$","i"),Ut=new RegExp("^("+m+")(?!px)[a-z%]+$","i"),zt=new RegExp("^([-+])=("+m+")","i"),Wt={BODY:"block"},Xt={position:"absolute",visibility:"hidden",display:"block"},Vt={letterSpacing:0,fontWeight:400},$t=["Top","Right","Bottom","Left"],Jt=["Webkit","O","Moz","ms"],Kt=v.fn.toggle;v.fn.extend({css:function(e,n){return v.access(this,function(e,n,r){return r!==t?v.style(e,n,r):v.css(e,n)},e,n,arguments.length>1)},show:function(){return Yt(this,!0)},hide:function(){return Yt(this)},toggle:function(e,t){var n=typeof e=="boolean";return v.isFunction(e)&&v.isFunction(t)?Kt.apply(this,arguments):this.each(function(){(n?e:Gt(this))?v(this).show():v(this).hide()})}}),v.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Dt(e,"opacity");return n===""?"1":n}}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":v.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){if(!e||e.nodeType===3||e.nodeType===8||!e.style)return;var s,o,u,a=v.camelCase(n),f=e.style;n=v.cssProps[a]||(v.cssProps[a]=Qt(f,a)),u=v.cssHooks[n]||v.cssHooks[a];if(r===t)return u&&"get"in u&&(s=u.get(e,!1,i))!==t?s:f[n];o=typeof r,o==="string"&&(s=zt.exec(r))&&(r=(s[1]+1)*s[2]+parseFloat(v.css(e,n)),o="number");if(r==null||o==="number"&&isNaN(r))return;o==="number"&&!v.cssNumber[a]&&(r+="px");if(!u||!("set"in u)||(r=u.set(e,r,i))!==t)try{f[n]=r}catch(l){}},css:function(e,n,r,i){var s,o,u,a=v.camelCase(n);return n=v.cssProps[a]||(v.cssProps[a]=Qt(e.style,a)),u=v.cssHooks[n]||v.cssHooks[a],u&&"get"in u&&(s=u.get(e,!0,i)),s===t&&(s=Dt(e,n)),s==="normal"&&n in Vt&&(s=Vt[n]),r||i!==t?(o=parseFloat(s),r||v.isNumeric(o)?o||0:s):s},swap:function(e,t,n){var r,i,s={};for(i in t)s[i]=e.style[i],e.style[i]=t[i];r=n.call(e);for(i in t)e.style[i]=s[i];return r}}),e.getComputedStyle?Dt=function(t,n){var r,i,s,o,u=e.getComputedStyle(t,null),a=t.style;return u&&(r=u.getPropertyValue(n)||u[n],r===""&&!v.contains(t.ownerDocument,t)&&(r=v.style(t,n)),Ut.test(r)&&qt.test(n)&&(i=a.width,s=a.minWidth,o=a.maxWidth,a.minWidth=a.maxWidth=a.width=r,r=u.width,a.width=i,a.minWidth=s,a.maxWidth=o)),r}:i.documentElement.currentStyle&&(Dt=function(e,t){var n,r,i=e.currentStyle&&e.currentStyle[t],s=e.style;return i==null&&s&&s[t]&&(i=s[t]),Ut.test(i)&&!Ft.test(t)&&(n=s.left,r=e.runtimeStyle&&e.runtimeStyle.left,r&&(e.runtimeStyle.left=e.currentStyle.left),s.left=t==="fontSize"?"1em":i,i=s.pixelLeft+"px",s.left=n,r&&(e.runtimeStyle.left=r)),i===""?"auto":i}),v.each(["height","width"],function(e,t){v.cssHooks[t]={get:function(e,n,r){if(n)return e.offsetWidth===0&&It.test(Dt(e,"display"))?v.swap(e,Xt,function(){return tn(e,t,r)}):tn(e,t,r)},set:function(e,n,r){return Zt(e,n,r?en(e,t,r,v.support.boxSizing&&v.css(e,"boxSizing")==="border-box"):0)}}}),v.support.opacity||(v.cssHooks.opacity={get:function(e,t){return jt.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=v.isNumeric(t)?"alpha(opacity="+t*100+")":"",s=r&&r.filter||n.filter||"";n.zoom=1;if(t>=1&&v.trim(s.replace(Bt,""))===""&&n.removeAttribute){n.removeAttribute("filter");if(r&&!r.filter)return}n.filter=Bt.test(s)?s.replace(Bt,i):s+" "+i}}),v(function(){v.support.reliableMarginRight||(v.cssHooks.marginRight={get:function(e,t){return v.swap(e,{display:"inline-block"},function(){if(t)return Dt(e,"marginRight")})}}),!v.support.pixelPosition&&v.fn.position&&v.each(["top","left"],function(e,t){v.cssHooks[t]={get:function(e,n){if(n){var r=Dt(e,t);return Ut.test(r)?v(e).position()[t]+"px":r}}}})}),v.expr&&v.expr.filters&&(v.expr.filters.hidden=function(e){return e.offsetWidth===0&&e.offsetHeight===0||!v.support.reliableHiddenOffsets&&(e.style&&e.style.display||Dt(e,"display"))==="none"},v.expr.filters.visible=function(e){return!v.expr.filters.hidden(e)}),v.each({margin:"",padding:"",border:"Width"},function(e,t){v.cssHooks[e+t]={expand:function(n){var r,i=typeof n=="string"?n.split(" "):[n],s={};for(r=0;r<4;r++)s[e+$t[r]+t]=i[r]||i[r-2]||i[0];return s}},qt.test(e)||(v.cssHooks[e+t].set=Zt)});var rn=/%20/g,sn=/\[\]$/,on=/\r?\n/g,un=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,an=/^(?:select|textarea)/i;v.fn.extend({serialize:function(){return v.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?v.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||an.test(this.nodeName)||un.test(this.type))}).map(function(e,t){var n=v(this).val();return n==null?null:v.isArray(n)?v.map(n,function(e,n){return{name:t.name,value:e.replace(on,"\r\n")}}):{name:t.name,value:n.replace(on,"\r\n")}}).get()}}),v.param=function(e,n){var r,i=[],s=function(e,t){t=v.isFunction(t)?t():t==null?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};n===t&&(n=v.ajaxSettings&&v.ajaxSettings.traditional);if(v.isArray(e)||e.jquery&&!v.isPlainObject(e))v.each(e,function(){s(this.name,this.value)});else for(r in e)fn(r,e[r],n,s);return i.join("&").replace(rn,"+")};var ln,cn,hn=/#.*$/,pn=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,dn=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,vn=/^(?:GET|HEAD)$/,mn=/^\/\//,gn=/\?/,yn=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bn=/([?&])_=[^&]*/,wn=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,En=v.fn.load,Sn={},xn={},Tn=["*/"]+["*"];try{cn=s.href}catch(Nn){cn=i.createElement("a"),cn.href="",cn=cn.href}ln=wn.exec(cn.toLowerCase())||[],v.fn.load=function(e,n,r){if(typeof e!="string"&&En)return En.apply(this,arguments);if(!this.length)return this;var i,s,o,u=this,a=e.indexOf(" ");return a>=0&&(i=e.slice(a,e.length),e=e.slice(0,a)),v.isFunction(n)?(r=n,n=t):n&&typeof n=="object"&&(s="POST"),v.ajax({url:e,type:s,dataType:"html",data:n,complete:function(e,t){r&&u.each(r,o||[e.responseText,t,e])}}).done(function(e){o=arguments,u.html(i?v("<div>").append(e.replace(yn,"")).find(i):e)}),this},v.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(e,t){v.fn[t]=function(e){return this.on(t,e)}}),v.each(["get","post"],function(e,n){v[n]=function(e,r,i,s){return v.isFunction(r)&&(s=s||i,i=r,r=t),v.ajax({type:n,url:e,data:r,success:i,dataType:s})}}),v.extend({getScript:function(e,n){return v.get(e,t,n,"script")},getJSON:function(e,t,n){return v.get(e,t,n,"json")},ajaxSetup:function(e,t){return t?Ln(e,v.ajaxSettings):(t=e,e=v.ajaxSettings),Ln(e,t),e},ajaxSettings:{url:cn,isLocal:dn.test(ln[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":Tn},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":e.String,"text html":!0,"text json":v.parseJSON,"text xml":v.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:Cn(Sn),ajaxTransport:Cn(xn),ajax:function(e,n){function T(e,n,s,a){var l,y,b,w,S,T=n;if(E===2)return;E=2,u&&clearTimeout(u),o=t,i=a||"",x.readyState=e>0?4:0,s&&(w=An(c,x,s));if(e>=200&&e<300||e===304)c.ifModified&&(S=x.getResponseHeader("Last-Modified"),S&&(v.lastModified[r]=S),S=x.getResponseHeader("Etag"),S&&(v.etag[r]=S)),e===304?(T="notmodified",l=!0):(l=On(c,w),T=l.state,y=l.data,b=l.error,l=!b);else{b=T;if(!T||e)T="error",e<0&&(e=0)}x.status=e,x.statusText=(n||T)+"",l?d.resolveWith(h,[y,T,x]):d.rejectWith(h,[x,T,b]),x.statusCode(g),g=t,f&&p.trigger("ajax"+(l?"Success":"Error"),[x,c,l?y:b]),m.fireWith(h,[x,T]),f&&(p.trigger("ajaxComplete",[x,c]),--v.active||v.event.trigger("ajaxStop"))}typeof e=="object"&&(n=e,e=t),n=n||{};var r,i,s,o,u,a,f,l,c=v.ajaxSetup({},n),h=c.context||c,p=h!==c&&(h.nodeType||h instanceof v)?v(h):v.event,d=v.Deferred(),m=v.Callbacks("once memory"),g=c.statusCode||{},b={},w={},E=0,S="canceled",x={readyState:0,setRequestHeader:function(e,t){if(!E){var n=e.toLowerCase();e=w[n]=w[n]||e,b[e]=t}return this},getAllResponseHeaders:function(){return E===2?i:null},getResponseHeader:function(e){var n;if(E===2){if(!s){s={};while(n=pn.exec(i))s[n[1].toLowerCase()]=n[2]}n=s[e.toLowerCase()]}return n===t?null:n},overrideMimeType:function(e){return E||(c.mimeType=e),this},abort:function(e){return e=e||S,o&&o.abort(e),T(0,e),this}};d.promise(x),x.success=x.done,x.error=x.fail,x.complete=m.add,x.statusCode=function(e){if(e){var t;if(E<2)for(t in e)g[t]=[g[t],e[t]];else t=e[x.status],x.always(t)}return this},c.url=((e||c.url)+"").replace(hn,"").replace(mn,ln[1]+"//"),c.dataTypes=v.trim(c.dataType||"*").toLowerCase().split(y),c.crossDomain==null&&(a=wn.exec(c.url.toLowerCase()),c.crossDomain=!(!a||a[1]===ln[1]&&a[2]===ln[2]&&(a[3]||(a[1]==="http:"?80:443))==(ln[3]||(ln[1]==="http:"?80:443)))),c.data&&c.processData&&typeof c.data!="string"&&(c.data=v.param(c.data,c.traditional)),kn(Sn,c,n,x);if(E===2)return x;f=c.global,c.type=c.type.toUpperCase(),c.hasContent=!vn.test(c.type),f&&v.active++===0&&v.event.trigger("ajaxStart");if(!c.hasContent){c.data&&(c.url+=(gn.test(c.url)?"&":"?")+c.data,delete c.data),r=c.url;if(c.cache===!1){var N=v.now(),C=c.url.replace(bn,"$1_="+N);c.url=C+(C===c.url?(gn.test(c.url)?"&":"?")+"_="+N:"")}}(c.data&&c.hasContent&&c.contentType!==!1||n.contentType)&&x.setRequestHeader("Content-Type",c.contentType),c.ifModified&&(r=r||c.url,v.lastModified[r]&&x.setRequestHeader("If-Modified-Since",v.lastModified[r]),v.etag[r]&&x.setRequestHeader("If-None-Match",v.etag[r])),x.setRequestHeader("Accept",c.dataTypes[0]&&c.accepts[c.dataTypes[0]]?c.accepts[c.dataTypes[0]]+(c.dataTypes[0]!=="*"?", "+Tn+"; q=0.01":""):c.accepts["*"]);for(l in c.headers)x.setRequestHeader(l,c.headers[l]);if(!c.beforeSend||c.beforeSend.call(h,x,c)!==!1&&E!==2){S="abort";for(l in{success:1,error:1,complete:1})x[l](c[l]);o=kn(xn,c,n,x);if(!o)T(-1,"No Transport");else{x.readyState=1,f&&p.trigger("ajaxSend",[x,c]),c.async&&c.timeout>0&&(u=setTimeout(function(){x.abort("timeout")},c.timeout));try{E=1,o.send(b,T)}catch(k){if(!(E<2))throw k;T(-1,k)}}return x}return x.abort()},active:0,lastModified:{},etag:{}});var Mn=[],_n=/\?/,Dn=/(=)\?(?=&|$)|\?\?/,Pn=v.now();v.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Mn.pop()||v.expando+"_"+Pn++;return this[e]=!0,e}}),v.ajaxPrefilter("json jsonp",function(n,r,i){var s,o,u,a=n.data,f=n.url,l=n.jsonp!==!1,c=l&&Dn.test(f),h=l&&!c&&typeof a=="string"&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Dn.test(a);if(n.dataTypes[0]==="jsonp"||c||h)return s=n.jsonpCallback=v.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,o=e[s],c?n.url=f.replace(Dn,"$1"+s):h?n.data=a.replace(Dn,"$1"+s):l&&(n.url+=(_n.test(f)?"&":"?")+n.jsonp+"="+s),n.converters["script json"]=function(){return u||v.error(s+" was not called"),u[0]},n.dataTypes[0]="json",e[s]=function(){u=arguments},i.always(function(){e[s]=o,n[s]&&(n.jsonpCallback=r.jsonpCallback,Mn.push(s)),u&&v.isFunction(o)&&o(u[0]),u=o=t}),"script"}),v.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(e){return v.globalEval(e),e}}}),v.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),v.ajaxTransport("script",function(e){if(e.crossDomain){var n,r=i.head||i.getElementsByTagName("head")[0]||i.documentElement;return{send:function(s,o){n=i.createElement("script"),n.async="async",e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,i){if(i||!n.readyState||/loaded|complete/.test(n.readyState))n.onload=n.onreadystatechange=null,r&&n.parentNode&&r.removeChild(n),n=t,i||o(200,"success")},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(0,1)}}}});var Hn,Bn=e.ActiveXObject?function(){for(var e in Hn)Hn[e](0,1)}:!1,jn=0;v.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&Fn()||In()}:Fn,function(e){v.extend(v.support,{ajax:!!e,cors:!!e&&"withCredentials"in e})}(v.ajaxSettings.xhr()),v.support.ajax&&v.ajaxTransport(function(n){if(!n.crossDomain||v.support.cors){var r;return{send:function(i,s){var o,u,a=n.xhr();n.username?a.open(n.type,n.url,n.async,n.username,n.password):a.open(n.type,n.url,n.async);if(n.xhrFields)for(u in n.xhrFields)a[u]=n.xhrFields[u];n.mimeType&&a.overrideMimeType&&a.overrideMimeType(n.mimeType),!n.crossDomain&&!i["X-Requested-With"]&&(i["X-Requested-With"]="XMLHttpRequest");try{for(u in i)a.setRequestHeader(u,i[u])}catch(f){}a.send(n.hasContent&&n.data||null),r=function(e,i){var u,f,l,c,h;try{if(r&&(i||a.readyState===4)){r=t,o&&(a.onreadystatechange=v.noop,Bn&&delete Hn[o]);if(i)a.readyState!==4&&a.abort();else{u=a.status,l=a.getAllResponseHeaders(),c={},h=a.responseXML,h&&h.documentElement&&(c.xml=h);try{c.text=a.responseText}catch(p){}try{f=a.statusText}catch(p){f=""}!u&&n.isLocal&&!n.crossDomain?u=c.text?200:404:u===1223&&(u=204)}}}catch(d){i||s(-1,d)}c&&s(u,f,c,l)},n.async?a.readyState===4?setTimeout(r,0):(o=++jn,Bn&&(Hn||(Hn={},v(e).unload(Bn)),Hn[o]=r),a.onreadystatechange=r):r()},abort:function(){r&&r(0,1)}}}});var qn,Rn,Un=/^(?:toggle|show|hide)$/,zn=new RegExp("^(?:([-+])=|)("+m+")([a-z%]*)$","i"),Wn=/queueHooks$/,Xn=[Gn],Vn={"*":[function(e,t){var n,r,i=this.createTween(e,t),s=zn.exec(t),o=i.cur(),u=+o||0,a=1,f=20;if(s){n=+s[2],r=s[3]||(v.cssNumber[e]?"":"px");if(r!=="px"&&u){u=v.css(i.elem,e,!0)||n||1;do a=a||".5",u/=a,v.style(i.elem,e,u+r);while(a!==(a=i.cur()/o)&&a!==1&&--f)}i.unit=r,i.start=u,i.end=s[1]?u+(s[1]+1)*n:n}return i}]};v.Animation=v.extend(Kn,{tweener:function(e,t){v.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;r<i;r++)n=e[r],Vn[n]=Vn[n]||[],Vn[n].unshift(t)},prefilter:function(e,t){t?Xn.unshift(e):Xn.push(e)}}),v.Tween=Yn,Yn.prototype={constructor:Yn,init:function(e,t,n,r,i,s){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=s||(v.cssNumber[n]?"":"px")},cur:function(){var e=Yn.propHooks[this.prop];return e&&e.get?e.get(this):Yn.propHooks._default.get(this)},run:function(e){var t,n=Yn.propHooks[this.prop];return this.options.duration?this.pos=t=v.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):Yn.propHooks._default.set(this),this}},Yn.prototype.init.prototype=Yn.prototype,Yn.propHooks={_default:{get:function(e){var t;return e.elem[e.prop]==null||!!e.elem.style&&e.elem.style[e.prop]!=null?(t=v.css(e.elem,e.prop,!1,""),!t||t==="auto"?0:t):e.elem[e.prop]},set:function(e){v.fx.step[e.prop]?v.fx.step[e.prop](e):e.elem.style&&(e.elem.style[v.cssProps[e.prop]]!=null||v.cssHooks[e.prop])?v.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},Yn.propHooks.scrollTop=Yn.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},v.each(["toggle","show","hide"],function(e,t){var n=v.fn[t];v.fn[t]=function(r,i,s){return r==null||typeof r=="boolean"||!e&&v.isFunction(r)&&v.isFunction(i)?n.apply(this,arguments):this.animate(Zn(t,!0),r,i,s)}}),v.fn.extend({fadeTo:function(e,t,n,r){return this.filter(Gt).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=v.isEmptyObject(e),s=v.speed(t,n,r),o=function(){var t=Kn(this,v.extend({},e),s);i&&t.stop(!0)};return i||s.queue===!1?this.each(o):this.queue(s.queue,o)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return typeof e!="string"&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,n=e!=null&&e+"queueHooks",s=v.timers,o=v._data(this);if(n)o[n]&&o[n].stop&&i(o[n]);else for(n in o)o[n]&&o[n].stop&&Wn.test(n)&&i(o[n]);for(n=s.length;n--;)s[n].elem===this&&(e==null||s[n].queue===e)&&(s[n].anim.stop(r),t=!1,s.splice(n,1));(t||!r)&&v.dequeue(this,e)})}}),v.each({slideDown:Zn("show"),slideUp:Zn("hide"),slideToggle:Zn("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){v.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),v.speed=function(e,t,n){var r=e&&typeof e=="object"?v.extend({},e):{complete:n||!n&&t||v.isFunction(e)&&e,duration:e,easing:n&&t||t&&!v.isFunction(t)&&t};r.duration=v.fx.off?0:typeof r.duration=="number"?r.duration:r.duration in v.fx.speeds?v.fx.speeds[r.duration]:v.fx.speeds._default;if(r.queue==null||r.queue===!0)r.queue="fx";return r.old=r.complete,r.complete=function(){v.isFunction(r.old)&&r.old.call(this),r.queue&&v.dequeue(this,r.queue)},r},v.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},v.timers=[],v.fx=Yn.prototype.init,v.fx.tick=function(){var e,n=v.timers,r=0;qn=v.now();for(;r<n.length;r++)e=n[r],!e()&&n[r]===e&&n.splice(r--,1);n.length||v.fx.stop(),qn=t},v.fx.timer=function(e){e()&&v.timers.push(e)&&!Rn&&(Rn=setInterval(v.fx.tick,v.fx.interval))},v.fx.interval=13,v.fx.stop=function(){clearInterval(Rn),Rn=null},v.fx.speeds={slow:600,fast:200,_default:400},v.fx.step={},v.expr&&v.expr.filters&&(v.expr.filters.animated=function(e){return v.grep(v.timers,function(t){return e===t.elem}).length});var er=/^(?:body|html)$/i;v.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){v.offset.setOffset(this,e,t)});var n,r,i,s,o,u,a,f={top:0,left:0},l=this[0],c=l&&l.ownerDocument;if(!c)return;return(r=c.body)===l?v.offset.bodyOffset(l):(n=c.documentElement,v.contains(n,l)?(typeof l.getBoundingClientRect!="undefined"&&(f=l.getBoundingClientRect()),i=tr(c),s=n.clientTop||r.clientTop||0,o=n.clientLeft||r.clientLeft||0,u=i.pageYOffset||n.scrollTop,a=i.pageXOffset||n.scrollLeft,{top:f.top+u-s,left:f.left+a-o}):f)},v.offset={bodyOffset:function(e){var t=e.offsetTop,n=e.offsetLeft;return v.support.doesNotIncludeMarginInBodyOffset&&(t+=parseFloat(v.css(e,"marginTop"))||0,n+=parseFloat(v.css(e,"marginLeft"))||0),{top:t,left:n}},setOffset:function(e,t,n){var r=v.css(e,"position");r==="static"&&(e.style.position="relative");var i=v(e),s=i.offset(),o=v.css(e,"top"),u=v.css(e,"left"),a=(r==="absolute"||r==="fixed")&&v.inArray("auto",[o,u])>-1,f={},l={},c,h;a?(l=i.position(),c=l.top,h=l.left):(c=parseFloat(o)||0,h=parseFloat(u)||0),v.isFunction(t)&&(t=t.call(e,n,s)),t.top!=null&&(f.top=t.top-s.top+c),t.left!=null&&(f.left=t.left-s.left+h),"using"in t?t.using.call(e,f):i.css(f)}},v.fn.extend({position:function(){if(!this[0])return;var e=this[0],t=this.offsetParent(),n=this.offset(),r=er.test(t[0].nodeName)?{top:0,left:0}:t.offset();return n.top-=parseFloat(v.css(e,"marginTop"))||0,n.left-=parseFloat(v.css(e,"marginLeft"))||0,r.top+=parseFloat(v.css(t[0],"borderTopWidth"))||0,r.left+=parseFloat(v.css(t[0],"borderLeftWidth"))||0,{top:n.top-r.top,left:n.left-r.left}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||i.body;while(e&&!er.test(e.nodeName)&&v.css(e,"position")==="static")e=e.offsetParent;return e||i.body})}}),v.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var r=/Y/.test(n);v.fn[e]=function(i){return v.access(this,function(e,i,s){var o=tr(e);if(s===t)return o?n in o?o[n]:o.document.documentElement[i]:e[i];o?o.scrollTo(r?v(o).scrollLeft():s,r?s:v(o).scrollTop()):e[i]=s},e,i,arguments.length,null)}}),v.each({Height:"height",Width:"width"},function(e,n){v.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){v.fn[i]=function(i,s){var o=arguments.length&&(r||typeof i!="boolean"),u=r||(i===!0||s===!0?"margin":"border");return v.access(this,function(n,r,i){var s;return v.isWindow(n)?n.document.documentElement["client"+e]:n.nodeType===9?(s=n.documentElement,Math.max(n.body["scroll"+e],s["scroll"+e],n.body["offset"+e],s["offset"+e],s["client"+e])):i===t?v.css(n,r,i,u):v.style(n,r,i,u)},n,o?i:t,o,null)}})}),e.jQuery=e.$=v,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return v})})(window);


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


(function(e,t){"use strict";function n(e){var t=Array.prototype.slice.call(arguments,1);return e.prop?e.prop.apply(e,t):e.attr.apply(e,t)}function s(e,t,n){var s,a;for(s in n)n.hasOwnProperty(s)&&(a=s.replace(/ |$/g,t.eventNamespace),e.bind(a,n[s]))}function a(e,t,n){s(e,n,{focus:function(){t.addClass(n.focusClass)},blur:function(){t.removeClass(n.focusClass),t.removeClass(n.activeClass)},mouseenter:function(){t.addClass(n.hoverClass)},mouseleave:function(){t.removeClass(n.hoverClass),t.removeClass(n.activeClass)},"mousedown touchbegin":function(){e.is(":disabled")||t.addClass(n.activeClass)},"mouseup touchend":function(){t.removeClass(n.activeClass)}})}function i(e,t){e.removeClass(t.hoverClass+" "+t.focusClass+" "+t.activeClass)}function r(e,t,n){n?e.addClass(t):e.removeClass(t)}function l(e,t,n){var s="checked",a=t.is(":"+s);t.prop?t.prop(s,a):a?t.attr(s,s):t.removeAttr(s),r(e,n.checkedClass,a)}function u(e,t,n){r(e,n.disabledClass,t.is(":disabled"))}function o(e,t,n){switch(n){case"after":return e.after(t),e.next();case"before":return e.before(t),e.prev();case"wrap":return e.wrap(t),e.parent()}return null}function c(t,s,a){var i,r,l;return a||(a={}),a=e.extend({bind:{},divClass:null,divWrap:"wrap",spanClass:null,spanHtml:null,spanWrap:"wrap"},a),i=e("<div />"),r=e("<span />"),s.autoHide&&t.is(":hidden")&&"none"===t.css("display")&&i.hide(),a.divClass&&i.addClass(a.divClass),s.wrapperClass&&i.addClass(s.wrapperClass),a.spanClass&&r.addClass(a.spanClass),l=n(t,"id"),s.useID&&l&&n(i,"id",s.idPrefix+"-"+l),a.spanHtml&&r.html(a.spanHtml),i=o(t,i,a.divWrap),r=o(t,r,a.spanWrap),u(i,t,s),{div:i,span:r}}function d(t,n){var s;return n.wrapperClass?(s=e("<span />").addClass(n.wrapperClass),s=o(t,s,"wrap")):null}function f(){var t,n,s,a;return a="rgb(120,2,153)",n=e('<div style="width:0;height:0;color:'+a+'">'),e("body").append(n),s=n.get(0),t=window.getComputedStyle?window.getComputedStyle(s,"").color:(s.currentStyle||s.style||{}).color,n.remove(),t.replace(/ /g,"")!==a}function p(t){return t?e("<span />").text(t).html():""}function m(){return navigator.cpuClass&&!navigator.product}function v(){return window.XMLHttpRequest!==void 0?!0:!1}function h(e){var t;return e[0].multiple?!0:(t=n(e,"size"),!t||1>=t?!1:!0)}function C(){return!1}function w(e,t){var n="none";s(e,t,{"selectstart dragstart mousedown":C}),e.css({MozUserSelect:n,msUserSelect:n,webkitUserSelect:n,userSelect:n})}function b(e,t,n){var s=e.val();""===s?s=n.fileDefaultHtml:(s=s.split(/[\/\\]+/),s=s[s.length-1]),t.text(s)}function y(e,t,n){var s,a;for(s=[],e.each(function(){var e;for(e in t)Object.prototype.hasOwnProperty.call(t,e)&&(s.push({el:this,name:e,old:this.style[e]}),this.style[e]=t[e])}),n();s.length;)a=s.pop(),a.el.style[a.name]=a.old}function g(e,t){var n;n=e.parents(),n.push(e[0]),n=n.not(":visible"),y(n,{visibility:"hidden",display:"block",position:"absolute"},t)}function k(e,t){return function(){e.unwrap().unwrap().unbind(t.eventNamespace)}}var H=!0,x=!1,A=[{match:function(e){return e.is("a, button, :submit, :reset, input[type='button']")},apply:function(e,t){var r,l,o,d,f;return l=t.submitDefaultHtml,e.is(":reset")&&(l=t.resetDefaultHtml),d=e.is("a, button")?function(){return e.html()||l}:function(){return p(n(e,"value"))||l},o=c(e,t,{divClass:t.buttonClass,spanHtml:d()}),r=o.div,a(e,r,t),f=!1,s(r,t,{"click touchend":function(){var t,s,a,i;f||e.is(":disabled")||(f=!0,e[0].dispatchEvent?(t=document.createEvent("MouseEvents"),t.initEvent("click",!0,!0),s=e[0].dispatchEvent(t),e.is("a")&&s&&(a=n(e,"target"),i=n(e,"href"),a&&"_self"!==a?window.open(i,a):document.location.href=i)):e.click(),f=!1)}}),w(r,t),{remove:function(){return r.after(e),r.remove(),e.unbind(t.eventNamespace),e},update:function(){i(r,t),u(r,e,t),e.detach(),o.span.html(d()).append(e)}}}},{match:function(e){return e.is(":checkbox")},apply:function(e,t){var n,r,o;return n=c(e,t,{divClass:t.checkboxClass}),r=n.div,o=n.span,a(e,r,t),s(e,t,{"click touchend":function(){l(o,e,t)}}),l(o,e,t),{remove:k(e,t),update:function(){i(r,t),o.removeClass(t.checkedClass),l(o,e,t),u(r,e,t)}}}},{match:function(e){return e.is(":file")},apply:function(t,r){function l(){b(t,p,r)}var d,f,p,v;return d=c(t,r,{divClass:r.fileClass,spanClass:r.fileButtonClass,spanHtml:r.fileButtonHtml,spanWrap:"after"}),f=d.div,v=d.span,p=e("<span />").html(r.fileDefaultHtml),p.addClass(r.filenameClass),p=o(t,p,"after"),n(t,"size")||n(t,"size",f.width()/10),a(t,f,r),l(),m()?s(t,r,{click:function(){t.trigger("change"),setTimeout(l,0)}}):s(t,r,{change:l}),w(p,r),w(v,r),{remove:function(){return p.remove(),v.remove(),t.unwrap().unbind(r.eventNamespace)},update:function(){i(f,r),b(t,p,r),u(f,t,r)}}}},{match:function(e){if(e.is("input")){var t=(" "+n(e,"type")+" ").toLowerCase(),s=" color date datetime datetime-local email month number password search tel text time url week ";return s.indexOf(t)>=0}return!1},apply:function(e,t){var s,i;return s=n(e,"type"),e.addClass(t.inputClass),i=d(e,t),a(e,e,t),t.inputAddTypeAsClass&&e.addClass(s),{remove:function(){e.removeClass(t.inputClass),t.inputAddTypeAsClass&&e.removeClass(s),i&&e.unwrap()},update:C}}},{match:function(e){return e.is(":radio")},apply:function(t,r){var o,d,f;return o=c(t,r,{divClass:r.radioClass}),d=o.div,f=o.span,a(t,d,r),s(t,r,{"click touchend":function(){e.uniform.update(e(':radio[name="'+n(t,"name")+'"]'))}}),l(f,t,r),{remove:k(t,r),update:function(){i(d,r),l(f,t,r),u(d,t,r)}}}},{match:function(e){return e.is("select")&&!h(e)?!0:!1},apply:function(t,n){var r,l,o,d;return n.selectAutoWidth&&g(t,function(){d=t.width()}),r=c(t,n,{divClass:n.selectClass,spanHtml:(t.find(":selected:first")||t.find("option:first")).html(),spanWrap:"before"}),l=r.div,o=r.span,n.selectAutoWidth?g(t,function(){y(e([o[0],l[0]]),{display:"block"},function(){var e;e=o.outerWidth()-o.width(),l.width(d+e),o.width(d)})}):l.addClass("fixedWidth"),a(t,l,n),s(t,n,{change:function(){o.html(t.find(":selected").html()),l.removeClass(n.activeClass)},"click touchend":function(){var e=t.find(":selected").html();o.html()!==e&&t.trigger("change")},keyup:function(){o.html(t.find(":selected").html())}}),w(o,n),{remove:function(){return o.remove(),t.unwrap().unbind(n.eventNamespace),t},update:function(){n.selectAutoWidth?(e.uniform.restore(t),t.uniform(n)):(i(l,n),o.html(t.find(":selected").html()),u(l,t,n))}}}},{match:function(e){return e.is("select")&&h(e)?!0:!1},apply:function(e,t){var n;return e.addClass(t.selectMultiClass),n=d(e,t),a(e,e,t),{remove:function(){e.removeClass(t.selectMultiClass),n&&e.unwrap()},update:C}}},{match:function(e){return e.is("textarea")},apply:function(e,t){var n;return e.addClass(t.textareaClass),n=d(e,t),a(e,e,t),{remove:function(){e.removeClass(t.textareaClass),n&&e.unwrap()},update:C}}}];m()&&!v()&&(H=!1),e.uniform={defaults:{activeClass:"active",autoHide:!0,buttonClass:"button",checkboxClass:"checker",checkedClass:"checked",disabledClass:"disabled",eventNamespace:".uniform",fileButtonClass:"action",fileButtonHtml:"Choose File",fileClass:"uploader",fileDefaultHtml:"No file selected",filenameClass:"filename",focusClass:"focus",hoverClass:"hover",idPrefix:"uniform",inputAddTypeAsClass:!0,inputClass:"uniform-input",radioClass:"radio",resetDefaultHtml:"Reset",resetSelector:!1,selectAutoWidth:!0,selectClass:"selector",selectMultiClass:"uniform-multiselect",submitDefaultHtml:"Submit",textareaClass:"uniform",useID:!0,wrapperClass:null},elements:[]},e.fn.uniform=function(t){var n=this;return t=e.extend({},e.uniform.defaults,t),x||(x=!0,f()&&(H=!1)),H?(t.resetSelector&&e(t.resetSelector).mouseup(function(){window.setTimeout(function(){e.uniform.update(n)},10)}),this.each(function(){var n,s,a,i=e(this);if(i.data("uniformed"))return e.uniform.update(i),void 0;for(n=0;A.length>n;n+=1)if(s=A[n],s.match(i,t))return a=s.apply(i,t),i.data("uniformed",a),e.uniform.elements.push(i.get(0)),void 0})):this},e.uniform.restore=e.fn.uniform.restore=function(n){n===t&&(n=e.uniform.elements),e(n).each(function(){var t,n,s=e(this);n=s.data("uniformed"),n&&(n.remove(),t=e.inArray(this,e.uniform.elements),t>=0&&e.uniform.elements.splice(t,1),s.removeData("uniformed"))})},e.uniform.update=e.fn.uniform.update=function(n){n===t&&(n=e.uniform.elements),e(n).each(function(){var t,n=e(this);t=n.data("uniformed"),t&&t.update(n,t.options)})}})(jQuery);



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


/* shoppref.js */
/*
 * shoppref.js
 * Author:gbaker 13/12/2011 
 */

/*globals window, document, jQuery, ND, SiteConf */
ND.shoppingPreferenceManager = (function($, undefined){
	
	var 
		/*
		 * The Cookie manager for shopping preferences
		 */
		shoppingPreferenceManager = {
		
			prefix: "shopping.pref.",
	
			/*
			 * List of supported Shopping Preferences, and their short names
			 */
			list: { postcode: "pc", usage: "us", usageLabel: "us.l", region: "rg", regionLabel: "rg.l", pricezone:"pz", pricezoneLabel:"pz.l", priceformatData:"pf" },
			
			/*
			 * Constructor of sorts
			 */
			init: function() {				
				this.cache = {};
				this.store = {};
				this.listen();
				this.upgradeCookie();
			},
			
			/*
			 * Prepare the stores, executed on demand to minise overhead.
			 */
			prepare: function() {
				var self = this;
				var cookieDomain=null;
				var configInfo = (typeof $('#common-config') != 'undefined' && $('#common-config').length > 0) ? JSON.parse($('#common-config').html()) : null;			
				if(configInfo != null && configInfo.cookieDomain){
					cookieDomain=configInfo.cookieDomain;
				}
				$.each( self.list, function(type, typeShort) {
					var value, store;
					
					// Use shortname to keep the cookie small.
					store = Object.create(ND.cacheStore);
					store.key = "sp." + typeShort;
					store.expires = 365;
					if(cookieDomain){
						store.domain=cookieDomain;
					}

					// Cache locally so don't need to grab from the cookie later
					if( value = store.get() ) {
						self.cache[type] = value;
					}
					
					self.store[type] = store;
				});
				
				// When done, erase action
				self.prepare = $.noop;				
			},
			
			/*
			 * Listen to the PUBSUB channel for Shopping Prefenences
			 */
			listen: function() {
				var self = this;
				
				this.pubsub = {
					// Saving Data
					save: function(event, data) {
						data && self.setStoreData( data );
						
						//Broadcast change event (this is confirmed / complete data, as compared to the raw, possible incomplete data from ".save" )
						$.publish( self.prefix + "change", self.getStoreData() );
					},
					// Clear all
					clear: function(event, data) {
						self.clearStoreData();
						
						//Broadcast change event (this is confirmed / complete data, as compared to the raw, possible incomplete data from ".save" )
						$.publish( self.prefix + "change", self.getStoreData() );
					},
					// Retrieve
					retrieve: function(event, fn) {
						$.isFunction(fn) && fn.apply( null, [ event, self.getStoreData() ]);
					},
					//destroy, used by mobile, when changing page.
					destroy: function() {
						self.destroy();
					}
				};

				for( var channel in this.pubsub ) {
					$.subscribe( this.prefix + channel, this.pubsub[channel] );
				}
			},
			
			/*
			 * Get the shopping data
			 */
			getStoreData: function() {
				this.prepare();

				// Return a clone of the cache
				return $.extend( {}, this.cache );
			},
			
			/*
			 * Set the shopping data
			 */
			setStoreData: function( data ) {
				var self = this;
				
				self.prepare();
				
				// Manipulate the data for defaults
				data = this.checkDefaults( data );
				
				// Iterate the data and save it
				data && $.each( data, function(type, value) {
					
					if( type in self.list ) {
						
						// Store in the cookie
						self.store[type].set( value )
						
						// Cache locally so don't need to grab from the cookie later
						if( typeof value !== 'undefined' && String(value).length) {
							self.cache[type] = value;
						} else {							
							delete self.cache[type];
						}
					}
				});
			},
			
			/*
			 * Function to clear the data
			 */
			clearStoreData: function() {
				this.cache = {};
				
				$.each( this.store, function(type, store) {
					store.set();
				});
			},
			
			/*
			 * Function to insist on default values.
			 * Hot Deals, when postcode is provided, a usage is set as default.
			 */
			checkDefaults: function( data ) {
				if( data && data.postcode && !this.cache.usage && !data.usage ) {
					data.usage = 'p';
					data.usageLabel = 'Personal';
				}
				return data;
			},
			
			/*
			 * Function to upgrade the old postcode cookie into the new one.
			 * Can remove this sometime in the future after this has been live for a while.
			 */
			upgradeCookie: function() {
				var polkData, polkStore;
				
				polkStore = Object.create(ND.cacheStore);
				polkStore.key = 'price.usage';
				var configInfo = (typeof $('#common-config') != 'undefined' && $('#common-config').length > 0) ? JSON.parse($('#common-config').html()) : null;			
				if(configInfo != null && configInfo.cookieDomain){
					polkStore.domain=configInfo.cookieDomain;
				}
				
				if( polkData = polkStore.get() ) {
					// Upgrade the cookie
					$.publish( this.prefix + "save", polkData );	
					// Clear the old cookie
					polkStore.set();
				}
			},
			
			
			/*
			 * Cleanup method
			 */
			destroy: function() {
				for( channel in this.pubsub ) {
					$.unsubscribe( this.prefix + channel, this.pubsub[channel] );
				}
				this.cache = this.store = this.pubsub = this.prefix = this.list = null;
			}
			
		};
	
	
	/*
	 * Expose function that creates new shoppingPreferenceManager
	 * - ND.shoppingPreferenceManager 
	 */
	return function( arg ) {
		var manager = Object.create( shoppingPreferenceManager );
		manager.init.call( manager, arg );
		return manager;
	};
	
}(jQuery));


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




/*
 * Author: 		Biao Qu
 * Description: populate predelivery data from session
 */

ND.prepopulate=(function($){
	var prepopulate={
		init:function(elmetsname){
			
			this.populateVehicle(elmetsname);
		},
		populateForm:function(){
			if(!$("#predel-model-translation").size()){
				return;
			}
			var predelModel = $("#predel-model-translation").embeddedData();
			var defaultVals = $("#personalisation-default").embeddedData();
			for (prop in defaultVals) {
				if(predelModel.preferences[prop] === undefined){
					predelModel.preferences[prop] = defaultVals[prop];
				}
			}
			
			$.each(predelModel,function(i,val){
				
				$.each(predelModel[i],function(n,val){
					
					var inputelment=$("input[name="+n+"]"),
						slecetelm=$("select[name="+n+"]"),
						textareaelm=$("textarea[name="+n+"]"),
						aelm=(n === "wt_lighting_1" ? $("a:contains('"+val+"')") : "");
					
					if(inputelment.size()){
						
						if(inputelment.attr("type")=="radio" || inputelment.attr("type")=="checkbox" ){
							
							inputelment.val(predelModel[i][n]);
						}else{
							inputelment.val(predelModel[i][n]);
						}
						
					}
					if(slecetelm.size()){
						slecetelm.val(predelModel[i][n]);
					}
					if(textareaelm.size()){
						textareaelm.val(predelModel[i][n]);
					}
					if(aelm && aelm.size()){
						aelm.addClass("active");
						
						$("input#ambient-colour").val($.trim(aelm.text()));

						$(".colorizer .color-name").html(aelm.text());
					}
				});
			});
			
			$.uniform.update();
		},
		populateVehicle:function(elmetsname){
			
			if(!$("#predel-model-vehicle").size()){
				return;
			}
			var predelVechile=$("#predel-model-vehicle").embeddedData();
			
			$.each(predelVechile,function(v){
				
				
				if(elmetsname==v && elmetsname != "Dealership"){
					
					$("select[name="+v+"]").val(predelVechile[v]);
					$("#"+elmetsname).trigger('change');
					
				}else if(elmetsname==v && elmetsname == "Dealership"){
					var myselect=$("#"+elmetsname+" option");
					$.each(myselect,function(i){
						if(myselect.eq(i).attr("data-dcode")==(predelVechile["Dealership"])){
							myselect.eq(i).attr("selected",true);
						}
					});
				}
				
			});
		}
	};
	$(function(){
		
		prepopulate.populateForm();
		
	});
	return function(arg){
        var prepop = Object.create(prepopulate);
        prepop.init.call(prepop, arg);
        return prepop;
    };
})(jQuery);


/*
Author: 		Brett Chaney
File name: 		option-packs.js
Description: 	Pre Delivery Phase 3 welcome page
				Inject option packs for selected vehicle
Dependencies: 	jQuery, underscorejs
*/

var PD = PD || {};

(function($){

PD.optionsPacks = {

	init: function() {
		
		// go no further if option pack template is not found on page
		if (!$('#optionpack-template').length) {return;}

		var self = this;

		this.wrapper = $('#page-wrapper');

		// lets find some option packs...
		self.getOptions();

	},

	getData: function(url, onSuccess, onError) {

		$.ajax({
			url: url,
			async: true,
			cache: false,
			dataType: 'json',
			headers: {
				'Cache-Control': 'no-cache'
			},
			beforeSend: function(){
				if (!$('.ajax-loader').length) {

					// display ajax loading gif if not already displayed
					$("#Ford_Make").closest(".section").append('<div class="ajax-loader"></div>');
				}
			},
			success: function(data) {				
				onSuccess(data);
			},
			error: function(e, extStatus) {
				onError(url, e, extStatus);
			}
		});
		
	},

	getOptions: function() {

		var self = this,
			restServices = $('#rest-services').embeddedData(),
			commonConfig = $('#common-config').embeddedData(),
			site = commonConfig.site,
			priceZone = commonConfig.priceZone,
			derivative = $('#voi-derivatveid').val(),
			// LOCAL rest return
			//featuresURL = 'rest/predelivery/option-packs.js';
			featuresURL	= restServices.colorUrl.replace('{site}', site).replace('{priceZone}', priceZone).replace('{derivative}', derivative).replace('colours-trims', 'categories');

		this.getData(featuresURL, function(data) {

			var optionsData;

			$('.ajax-loader').remove();

			// loop through payload
			$.each(data, function(index) {
				if (data[index].name === 'Option Packages') {
					// create object with option packages to use for (underscore) template in PD.optionsPacks.appendOptions() method
					optionsData = $.grep(data[index].categories[0].features, function(o){
						return o.featuretype === "Option" && o.groupType === "Option Pack";
					});
				}
			});

			// now time to add the option packs found to the view/template
			self.appendOptions(optionsData);

		}, function(e, extStatus) {

			$('.ajax-loader').remove();
			$('.option-packs', self.wrapper).hide();

		});

	},

	appendOptions: function(optionsData) {
		var self = this,
			optionsView = $('#optionpack-template', self.wrapper).html(),
			predelModel = $("#predel-model-translation").embeddedData(),
			selectedOptionPacks; 
		
		selectedOptionPacks = predelModel.optionalPackages !== undefined ? predelModel.optionalPackages : [];
		// if there are no additional options hide the options DIV
		// otherwise display the additional options through the underscore template
		if (typeof optionsData !== 'object' || optionsData.length === 0) {
			$('.option-packs', self.wrapper).hide();
		} else {
			$('.option-packs ul', self.wrapper).html(_.template(optionsView, {options:optionsData, selectedOptionPacks:selectedOptionPacks}));
			$('.option-packs', self.wrapper).fadeIn(300);
		}

		// re-init uniformjs for each option pack checkbox that has just been inject into the DOM
		$('#page-wrapper .option-packs input').uniform();

	}

};

})(jQuery);


/*
 * Author: Brett Chaney
 * Description: Pre-delivery global JS
 */

(function($){

	$(document).ready(function(){

		// Force checkbox to be checked before form is submitted on the simple and pre-populated welcome pages
		$("#welcomeSubmit").on("click", function(e) {
			e.preventDefault();

			$(this).closest("form.fbform").checkValidity();

			if(!$(this).closest("form.fbform").checkValidity()) {return;}

			var isChecked = $("#isPrivacyChecked").is(":checked");

			if (isChecked) {
				$(this).closest("form.fbform").submit();
			}
		});

		// Checkbox grouping
		$("tr td:not(.select-col1, .select-col2, .select-col3) .checkbox").click(function() {

			var $this 			= $(this),
				checkedState 	= $this.prop("checked");

			$this.parents("tr").find(".checkbox:checked").prop("checked", false);
			$this.parents("tr").find(".checked").removeClass("checked");

			if ($("#page-wrapper").length) {
				$this.parents("table").find(".number.checked").removeClass("checked");
			}

			$this.prop("checked", checkedState);

			if (!$this.parent().hasClass("select-col1")) {
				$this.closest("table").find(".select-col1 .checkbox").prop("checked", false);
			}

			if (!$this.parent().hasClass("select-col2")) {
				$this.closest("table").find(".select-col2 .checkbox").prop("checked", false);
			}

			if (!$this.parent().hasClass("select-col3")) {
				$this.closest("table").find(".select-col3 .checkbox").prop("checked", false);
			}

			$("#page-wrapper input[type=checkbox]").uniform();

		});

		// Select all column checkboxes
		function checkColumn(elem, column) {

			if ($("#page-wrapper").length) {
				elem.hasClass("checked") ? elem.removeClass("checked") : elem.addClass("checked");
			}

			var isChecked = elem.hasClass("number") ? elem.hasClass("checked") : elem.prop("checked");


			elem.closest("table").find(".checkbox").prop("checked", false);
			elem.closest("table").find("tr td:nth-child(" + column + ") input[type=checkbox]").prop("checked", isChecked);

			$("#page-wrapper input[type=checkbox]").uniform();
		}

		$("table .select-col1 .checkbox, .featured-table tbody .select-col1 .number").click(function() {
			if ($("#page-wrapper").length){
				$("table .select-col2 .number, table .select-col3 .number").removeClass("checked");

				checkColumn($(this), 4);
			} else {
				checkColumn($(this), 5);
			}
		});

		$("table .select-col2 .checkbox, .featured-table tbody .select-col2 .number").click(function() {
			if ($("#page-wrapper").length){
				$("table .select-col1 .number, table .select-col3 .number").removeClass("checked");
				checkColumn($(this), 5);
			} else {
				checkColumn($(this), 6);
			}
		});

		$("table .select-col3 .checkbox, .featured-table tbody .select-col3 .number").click(function() {
			if ($("#page-wrapper").length){
				$("table .select-col1 .number, table .select-col2 .number").removeClass("checked");
				checkColumn($(this), 6);
			} else {
				checkColumn($(this), 7);
			}
		});

		// remove event listener of .number check all select box on click
		$('.featured-table').find('tbody').find('.number').off();



		// Steps next button check
		$(".feature-buttons .accordion-next").click(function() {

			$(this).closest(".dropdown").find(".featured-table > tbody > tr:gt(0)").each(function() {

				var isChecked = $(".checkbox", this).is(":checked");

				if (!isChecked) {
					// check all checkboxes in this step
					$(this).find(".col3 .checkbox").prop("checked", true);
					$("#page-wrapper input[type=checkbox]").uniform();
				}
			});
		});

		$("#page-wrapper .accordion-next.btn, #page-wrapper .accordion-prev.btn").click(function() {

			// hide 'save and continue' text
			$(".save-text").hide();

		});

		// Steps h2 tab check
		$(".tab-area h2").click(function() {

			$(".save-text").hide();

			$(this).closest("li").prevAll().find(".featured-table > tbody > tr:gt(0)").each(function() {

				var isChecked = $(".checkbox", this).is(":checked");

				if (!isChecked) {
					// check all checkboxes in previous step
					$(this).find(".col3 .checkbox").prop("checked", true);
					$("#page-wrapper input[type=checkbox]").uniform();
				}
			});
		});


		// Unbind click event for button/link to summary
		$(".summary-btn").unbind("click");


		// Steps page back button to welcome page
		$(".accordion-prev.islink").on("click", function() {
			$("input[type='hidden'][name='back']").val("true");
		});


		// Add "selected" class to radio button parent DIV
		$(".panel-content input[type=radio]").on("click", function() {

			$(this).parents(".panel-content").find(".radio").removeClass("selected");

			$(this).parents(".radio").addClass("selected");
		});

		// loop through radio buttons in personalisation section and add class to already selected ones
		$('.last-step input:radio:checked').each(function() {
			$(this).parents(".radio").addClass("selected");
		});


		// Reveal overlay/modal click events
		$(".open-modal").on("click", function(e) {
			e.preventDefault();

			var infoLink = $(this).attr("href");
			$.ajax({
					url: infoLink,
					success: function(data){
						$("#content-modal .content").html(data);
						$('#content-modal').foundation('reveal', 'open',{
							animationSpeed: 100,
							animation: "fade"
						});
					},
					error: function(){
						$("#content-modal .content").html('<div class="row"><div class="columns"><div class="content-col"><h3>An Error Occurred</h3><p>There seems to be a problem.</p></div></div></div>');
						$('#content-modal').foundation('reveal', 'open',{
							animationSpeed: 100,
							animation: "fade"
						});
					},
					complete: function() {
						if ($("#content-modal iframe").length > 0) {
							$("#content-modal iframe").parent().addClass("flex-video");
						}
					}
			});
		});

		$(".open-vid").on("click", function(e) {
			e.preventDefault();

			var vidLink = $(this).attr("href");
			var featureName = $(this).data("featurename");
			var pagename= $(this).data("pagename");
			$.ajax({
				url: vidLink,
				success: function(data){
					//for omniture tracking full screen with dynamic name based on current step
					$("#video-modal .content").attr("data-title","ford owners:predelivery:"+ featureName +":video:full screen");
					$("#video-modal .content").attr("data-pname","ford owners:predelivery:"+ pagename);
					
					$("#video-modal .content").html(data);
					$('#video-modal').foundation('reveal', 'open',{
						animationSpeed: 100,
						animation: "fade"
					});
					
				},
				error: function(){
					$("#content-modal .content").html('<div class="row"><div class="columns"><div class="content-col"><h3>An Error Occurred</h3><p>There seems to be a problem.</p></div></div></div>');
					$('#content-modal').foundation('reveal', 'open',{
						animationSpeed: 100,
						animation: "fade"
					});
				}
			});

			setTimeout(function() {
				$("#video-modal.reveal-modal .content").addClass("no-loader");
			},500);

		});

		$("#content-modal .close-reveal-modal").click(function(e) {
			e.preventDefault();

			$('.reveal-modal').foundation('reveal', 'close');

			setTimeout(function() {
				$("#content-modal .content").html("");
			},500);

			// ensure focus onto document body after overlay is closed - IE has focus issues
			$("body").focus();
		});

		$("#video-modal .close-reveal-modal").click(function(e) {
			e.preventDefault();

			$('.reveal-modal').foundation('reveal', 'close');

			setTimeout(function() {
				$("#video-modal.reveal-modal .content").removeClass("no-loader");
				$("#video-modal .content").html("");
			},1000);

			// ensure focus onto document body after overlay is closed - IE has focus issues
			$("body").focus();
		});


		// Close window function
		$(".close-window").on("click", function(e) {
			e.preventDefault();

			var formConfig = JSON.parse($('#form-config').html());
			window.location.href = formConfig.homepage;
			//var newWindow = window.open("", "_self", "");
			//window.close();
		});


		// Equal height columns
		var equalCols = function() {

			$(".equal-cols").each(function() {

				var $this 		= $(this),
					heighestCol = null;

				// get highest column value
				$this.find(">.columns .equal-col").each(function() {

					$(this).css("height","");

					var currentColH = $(this).outerHeight();

					if (currentColH > heighestCol) {
						heighestCol = currentColH;
					}

				});

				// add height to each column
				$this.find(">.columns .equal-col").each(function() {
					if ($(window).width() > 752) {
						$(this).css("height", heighestCol);
					} else {
						$(this).css("height", "");
					}
				});

			});

		};

		if ($(".equal-cols").length > 0) {

			$(window).on("load", function() {
				equalCols();
			});

		}

		$(window).on("resize", function() {
			equalCols();
			verticalImgs();
		});


		// Vertically aligned images
		var verticalImgs = function() {

			$(".image > img").each(function() {

				var $this 		= $(this),
					imageH 		= $(this).height(),
					parentH 	= $this.parent().height(),
					topPadding 	= (parentH - imageH) / 2;

					if ($(window).width() > 767) {
						$this.css("padding-top", parseInt(topPadding, 10));
					}

			});

		};

		if ($(".image").length > 0) {

			$(window).on("load", function() {
				verticalImgs();
			});

		}


		var dealershipDD = function() {

			var dealership 			= this,
				dealershipSelect 	= $("#Dealership"),
				stateSelect 		= $("#Dealership_State"),
				commonConfig 		= $("#common-config").embeddedData(),
				site 				= commonConfig.site,
				restServices 		= $("#rest-services").embeddedData(),
				predelServices 		= $("#predel-config").embeddedData();

			// setup global ajax settings
			$.ajaxSetup({
				type: "GET",
				cache: true,
				dataType: "json"
			});

			dealership.setHiddenValue = function(dealerEmail, dealerCode) {

				var $hiddenInputEmail = $("#dealer-email"),
					$hiddenInputCode = $("#dealer-code");

				if ($hiddenInputEmail.length > 0) {
					$hiddenInputEmail.val(dealerEmail);
					$hiddenInputCode.val(dealerCode);
				}

			};

			dealership.populateDealership = function(selectedUrl){

				$.ajax({
					url: selectedUrl,
					statusCode: {
						404: function() {
							$('.ajax-loader').remove();
							$("#Dealership_State").closest(".columns").find(".error-box").addClass("forced-error").children("span").html("Error finding Dealers. Please try again.");
						}
					},
					beforeSend: function(){

						// check for phase 1/2 pre-delivery. Phase 3 only has #page-wrapper DIV
						if ($("#page-wrapper").length === 0) {
							dealershipSelect.find("option").remove().end()
											.append("<option>Loading dealers</option>")
											.after('<div class="ajax-loader2"></div>');
						} else {
							dealershipSelect.find("option").slice(1).remove();
							$(".dealers").after('<div class="ajax-loader2"></div>');
						}

					},
					success: function(data){

						$(".ajax-loader2").remove();

						// check for phase 1/2 pre-delivery. Phase 3 only has #page-wrapper DIV
						if ($("#page-wrapper").length === 0) {
							dealershipSelect.find("option").remove().end()
											.append("<option value=''>Please select dealership</option>");
						} else {
							dealershipSelect.find("option").slice(1).remove();
						}

						jQuery.each(data, function(index,value){

							var dealerName 		= value.dealershipName,
								dealerCity 		= value.city,
								dealerNameCity 	= dealerName + " (" + dealerCity + ")",
								dealerCode 		= value.dealerCode,
								dealerEmail 	= value.email;

							dealershipSelect.append('<option data-dcode="' + dealerCode +'" data-email="' + dealerEmail +'">'+ dealerNameCity +'</option>');

						});

						ND.prepopulate("Dealership");

						// reset uniformjs selects
						$("#page-wrapper select").uniform();

					},
					complete: function() {

						// Add first dealership email address of selected state to email hidden input
						dealership.setHiddenValue($("#Dealership option:first-child").data("email"), $("#Dealership :selected").data("dcode"));

					},
					error: function() {
						$(".ajax-loader2").remove();
					}

				});

				dealershipSelect.on("change", function() {
					dealership.setHiddenValue($("#Dealership :selected").data("email"), $("#Dealership :selected").data("dcode"));
				});

			};

			dealership.stateSelectChange = function(){
				var state = stateSelect.val(),
					functionFilter 	= (predelServices["functionfilter"] !== undefined) ? predelServices["functionfilter"] : "",
					encodeFilter 	= encodeURIComponent(functionFilter),
					// LOCAL rest return
					// dealerRegionUrl	= "rest/predelivery/dealers-region-"+ state +".js?functionfilter=" + encodeFilter;
					dealerRegionUrl	= restServices["dealer.byRegionUrl"].replace('{site}', site).replace('{region}', state)+"?functionfilter=" + encodeFilter;
					
					if (stateSelect.val() !== "") {
						// Enable Dealership select
						// check for phase 1/2 pre-delivery. Phase 3 only has #page-wrapper DIV
						if ($("#page-wrapper").length === 0) {
							dealershipSelect.attr("disabled",false).css("opacity","1");
						}
						dealership.populateDealership(dealerRegionUrl);
					} else if ($("#page-wrapper").length === 0) {
						// Disable Dealership select
						dealershipSelect.attr("disabled","disabled").css("opacity",".5").removeClass("user-success").children("option").remove();
					} else {
						dealershipSelect.removeClass("user-success").children("option").slice(1).remove();
						// reset uniformjs selects
						$("#page-wrapper select").uniform();
					}
			};

			dealership.init = function(){

				// check for phase 1/2 pre-delivery. Phase 3 only has #page-wrapper DIV
				if (!$(".pre-populated")[0] && $("#page-wrapper").length === 0) {
					// Disable Dealership select
					dealershipSelect.attr("disabled","disabled").css("opacity",".5");
				}

				var stateSelectChange = _.debounce(function(){
					var state = stateSelect.val(),
						functionFilter 	= (predelServices["functionfilter"] !== undefined) ? predelServices["functionfilter"] : "",
						encodeFilter 	= encodeURIComponent(functionFilter),
						// LOCAL rest return
						// dealerRegionUrl	= "rest/predelivery/dealers-region-"+ state +".js?functionfilter=" + encodeFilter;
						dealerRegionUrl	= restServices["dealer.byRegionUrl"].replace('{site}', site).replace('{region}', state)+"?functionfilter=" + encodeFilter;
						
						if (stateSelect.val() !== "") {
							// Enable Dealership select
							// check for phase 1/2 pre-delivery. Phase 3 only has #page-wrapper DIV
							if ($("#page-wrapper").length === 0) {
								dealershipSelect.attr("disabled",false).css("opacity","1");
							}
							dealership.populateDealership(dealerRegionUrl);
						} else if ($("#page-wrapper").length === 0) {
							// Disable Dealership select
							dealershipSelect.attr("disabled","disabled").css("opacity",".5").removeClass("user-success").children("option").remove();
						} else {
							dealershipSelect.removeClass("user-success").children("option").slice(1).remove();
							// reset uniformjs selects
							$("#page-wrapper select").uniform();
						}
				}, 2000);	

				stateSelect.on("change", stateSelectChange);

				ND.prepopulate("Dealership_State");
			};

		};

		// initialise dealer dropdown
		if ($('#Dealership').length > 0) {
			var dealership = new dealershipDD();
			dealership.init();
		}

		// START - Derivative-specific vehicle image
		var $modelVal, $seriesVal, $colourVal,

			updateImg = function() {

				var restService 	= $("#rest-services").embeddedData(),
					commonConfig 	= $("#common-config").embeddedData(),
					site 			= commonConfig.site,
					priceZone 		= commonConfig.priceZone,
					derivative 		= $("#voi-derivatveid").val(),
					colourTrimsURL	= restService.colorUrl.replace('{site}', site).replace('{priceZone}', priceZone).replace('{derivative}', derivative),
					selIdx 			= $("#Colour")[0].selectedIndex - 1,
					$carImage 		= $("img.welcome-image"),
					defaultImg 		= $carImage.attr("src"),
					$carDiv 		= $("#page-wrapper .vehicle-image");

				$.ajax({
					url: colourTrimsURL,
					type: "GET",
					cache: true,
					dataType: "json",
					statusCode: {
						404: function() {
							$carDiv.show();
							$carImage.attr("src", defaultImg);
						}
					},
					beforeSend: function(){
						$("#Ford_Make").closest(".section").append('<div class="ajax-loader"></div>');
					},
					success: function(data){

						function searchStringInArray (str, strArray) {
							for (var j=0; j<strArray.length; j++) {
								if (strArray[j].match(str)) return j;
							}
							return -1;
						}

						$carDiv.show();

						if (data[selIdx].imageURL !== undefined) {

							var vehicleImg 		= data[selIdx].imageURL,
								imgPath 		= vehicleImg,
								vehicleImgId 	= imgPath,
								vehicleImgArr 	= vehicleImgId.split("&"),
								arrayPos 		= searchStringInArray("blobwhere",vehicleImgArr),
								vehicleIDtoStr 	= vehicleImgArr[arrayPos];
								vehicleImgId 	= vehicleIDtoStr.match(/\d+$/)[0];

							if (vehicleImg !== undefined) {
								$carImage.attr("src", imgPath).error(function(){
									$carImage.attr("src", defaultImg);
								});
							} else {
								$carImage.attr("src", defaultImg);
							}

							// update vehicleImage hidden field with vehicle image ID
							$("input[name=vehicleImage]").val(vehicleImgId);
						} else {
							$carDiv.hide();
							$carImage.attr("src", defaultImg);
						}

						$('.ajax-loader').remove();

					},
					error: function(jqXHR, textStatus, textResponse) {
						$carDiv.hide();
						$('.ajax-loader').remove();
					}
				});

			},

			getSelValues = function() {
				$modelVal 	= $("#Ford_Make").val();
				$seriesVal 	= $("#Ford_Model").val();
				$colourVal 	= $("#Colour").val();
			},

			checkSelValues = function() {

				var defaultImg = $("img.welcome-image").attr("src");

				$("input[name=vehicleImage]").val("");
				getSelValues();

				$("#Ford_Make, #Ford_Model").on("change", function() {

					$(".option-packs ul").empty();
					$(".option-packs").hide();

					$("#page-wrapper .vehicle-image").hide();
					$("img.welcome-image").attr("src", defaultImg);
					$("input[name=vehicleImage]").val("");

					setTimeout(function() {
						$("#page-wrapper select").uniform();
					},100);

				});

				$("#Colour").on("change", function() {

					getSelValues();

					if ($modelVal === "" || $seriesVal === "" || $colourVal === "") {
						$("img.welcome-image").attr("src", defaultImg);
						$("input[name=vehicleImage]").val("");
					} else if ($modelVal !== "" && $seriesVal !== "" && $colourVal !== ""){
						updateImg();
					}
				});

			};

		if ($("#Ford_Make").length > 0) {
			checkSelValues();
		}
		// END - Derivative-specific vehicle image

	});

}(jQuery));


/*
 * Author: 		Sohrab Zabetian and Brett Chaney
 * Description: Code taken from context.js in FTD2010 JS folder and stripped down for Pre-delivery. 
 *				VOI Pre-population.
 */

ND.selectVehicle = (function($) {
	
	var 
	
	voiConfig = {
			excludedModels : ''
	},
	
	privateFunctions = {
			
		restServices : {
			fetchVOIData : function(url) {
				privateFunctions.restServices.ajaxCall(url, function(jqXHR) {
					privateFunctions.populateModelDropdown(jqXHR);
				});
			},
			fetchColorData : function(url, callback) {
				
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
					beforeSend: function(){
						$("#Ford_Make").closest(".section").append('<div class="ajax-loader"></div>');
					},
					success: function(jqXHR, textStatus, textResponse) {
						if (typeof jqXHR !== 'undefined' && jqXHR !== null) {
							successCallback(jqXHR);
						}
					}, 
					error : function(jqXHR, textStatus, textResponse) {
						$('.ajax-loader').remove();
						//console.log('Could not fetch voi rest data');
					}
				});
			}		
		},    
		
		addDropdownChangeListeners : function($modelDD, voiRestData) {
			
			var $seriesDD = $('#Ford_Model'),
				$colorDD = $('#Colour');
			if ($seriesDD.length > 0) {
				var $firstOption;
				if (privateFunctions.firstTime) {
					$firstOption = $seriesDD.html();
					privateFunctions.firstTime = false;
				}
				
				$modelDD.on('change', function() {
					var result = privateFunctions.findIdForName($modelDD.val(), null, voiRestData);
					
					if (result.m !== null) {
						privateFunctions.setModelHiddenValue(result);
						privateFunctions.populateSeriesDropdown($seriesDD, voiRestData[result.mIdx].derivatives, $firstOption);
					} else {
						privateFunctions.populateSeriesDropdown($seriesDD, [], $firstOption);
					}
				});
				
				$seriesDD.on('change', function() {
					var result = privateFunctions.findIdForName($modelDD.val(), $seriesDD.val(), voiRestData);

					if (result.d !== null) {
						privateFunctions.setDerivativeHiddenValues(result);
						PD.optionsPacks.init();
					}
					if ($colorDD.length > 0) {
						privateFunctions.populateColorDropdown($seriesDD);
					}
				});
				
				
				/*if ($colorDD.length > 0) {
					$colorDD.on('change', function() {
						privateFunctions.setColorDropDownValue($colorDD.val());
					});
				}*/
			}
		},
		
		findIdForName : function(modelName,derivativeName,voiRestData) {
			var i,j, derivative, result = { m : null, mc : null, d : null, dc : null, mIdx : -1, dIdx : -1};
	
			for (i = 0; i < voiRestData.length; i++) {
				if (modelName === voiRestData[i].name) {
					
					result.m = voiRestData[i].id;
					result.mc = voiRestData[i].modelCode;
					result.mIdx = i;
					if (derivativeName !== null) {
						for (j = 0; j < voiRestData[i].derivatives.length; j++) {
							derivative = voiRestData[i].derivatives[j];								
							if (derivativeName === derivative.name) {
								result.d = derivative.id;
								result.dc = derivative.derivativeCode;
								result.dIdx = j;
								
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
		
		populateModelDropdown : function(voiRestData) {
			var $dd = $('#Ford_Make');
			
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
								if(count === 0){
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
				
				for (i = 0; i < optionList.length; i++) {
					options.push('<option value="' + optionList[i].name + '">' + optionList[i].name + '</options>');
				}

				$(".ajax-loader").remove();
				
				$dd.append(options.join(''));
				if (ND.FormBuilder && ND.FormBuilder.styleSelectOptions) {
					ND.FormBuilder.styleSelectOptions($dd);
				}
				privateFunctions.addDropdownChangeListeners($dd, voiRestData);
			}
			ND.prepopulate("Ford_Make");
		},

		setModelHiddenValue : function(value) {
			var $hiddenInputModelID = $('#voi-modelid'),
				$hiddenInputModelCode = $('#voi-modelcode');

				// clear derivative hidden inputs
				$('#voi-derivatveid').val('');
				$('#voi-derivativecode').val('');

			if ($hiddenInputModelID.length > 0) {
				$hiddenInputModelID.val(value.m);
				$hiddenInputModelCode.val(value.mc);
			}
		},
		
		populateSeriesDropdown : function($dd, modelDerivatives, $firstOption) {
			
			if (typeof modelDerivatives !== 'undefined' && modelDerivatives !== null && modelDerivatives.length > 0) {
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
				ND.prepopulate("Ford_Model");
				privateFunctions.populateColorDropdown($dd);
				
			} else {
				$dd.html($firstOption);
				ND.prepopulate("Ford_Model");
				privateFunctions.populateColorDropdown($dd);
				
			}

		},
		
		setDerivativeHiddenValues : function(value) {
			var $hiddenInputID = $('#voi-derivatveid'),
				$hiddenInputCode = $('#voi-derivativecode');
			if ($hiddenInputID.length > 0) {
				$hiddenInputID.val(value.d);
				$hiddenInputCode.val(value.dc);
			}
		},
		
		colorDropdownFirstOption : null,
		
		populateColorDropdown : function($seriesDD) {
			
			var $dd = $('#Colour');
			
			if ($dd.length > 0) {
				
				if (privateFunctions.colorDropdownFirstOption === null) {
					privateFunctions.colorDropdownFirstOption = $dd.html();
				}
			
				// call ajax service
				
				var derivativeId = $seriesDD.find(':selected').data('derivativeid');
				
				if (typeof derivativeId !== 'undefined' && derivativeId !== null) {
					var colorUrl = voiConfig.colorUrl.replace('{site}', voiConfig.site)
					  .replace('{priceZone}', voiConfig.priceZone)
					  .replace('{derivative}', derivativeId);

					$dd.empty().html('<option>Please select colour</option>');
					
					privateFunctions.restServices.fetchColorData(colorUrl, function(colorData) {
						var options = [],
							i;	
						for (i = 0; i < colorData.length; i++) {
							options.push('<option value="' + colorData[i].name + '">' + colorData[i].name + '</options>');

						}
						$dd.empty().html(privateFunctions.colorDropdownFirstOption).append(options.join(''));
						if (ND.FormBuilder && ND.FormBuilder.styleSelectOptions) {
							ND.FormBuilder.styleSelectOptions($dd);
						}
						ND.prepopulate("Colour");
					});
				} else {
					$dd.empty().html(privateFunctions.colorDropdownFirstOption);
				}

			}
			
		},
		
		/*setColorDropDownValue : function(value) {
			var $hiddenInput = $('#voi-modelcolour');
			if ($hiddenInput.length > 0) {
				$hiddenInput.val(value);
			}
		},*/		
		
		/**
		 * if we have a form and config, make an ajax call and retrieve the VOI
		 * list
		 */
		init : function() {
			
			var $restConfig = $('#rest-services'),
				$commonConfig = $('#common-config'),
				$form = ('form');
			// if there is at least one form on the page and it's not the pre-populated welcome page
			if ($form.length > 0 && $('.pre-populated').length === 0) {
				if ($restConfig.length > 0) {
					$.extend(voiConfig, JSON.parse($restConfig.html()),
										JSON.parse($commonConfig.html()));
					
					if (voiConfig.formRequestType) {
						var firstChar = voiConfig.formRequestType.charAt(0);
						voiConfig.formRequestTypeUppercase = voiConfig.formRequestType;
						voiConfig.formRequestType = voiConfig.formRequestType.replace(firstChar, firstChar.toLowerCase());
					}
					
					voiConfig.voiUrl = voiConfig.voiUrl.replace('{site}', voiConfig.site).replace('{makeName}', "Ford");
					voiConfig.voiUrl += voiConfig.excludedModels;
					
					privateFunctions.restServices.fetchVOIData(voiConfig.voiUrl);
				}
			}
		}
				
	},
	
	publicFunctions = {
			
		//used to prevent smob logic from double firing 
		//once after page init and once after document ready.
		isContextInitialised : false,
		
		startUp : function() {
			
			if (!publicFunctions.isContextInitialised && $("#Ford_Make")[0]) {
				// if we have a form and config, make an ajax call and retrieve the
				// VOI list
				privateFunctions.init();
				publicFunctions.isContextInitialised = true;
			}
		}
	};
	
	/**
	 * Execute voi-prepopulation for web
	 */
	$(document).ready(publicFunctions.startUp);
	
	return publicFunctions;
	
})(jQuery);


/*
Author: 		Brett Chaney
File name: 		postcode-select.js
Description: 	Pre Delivery Phase 3 welcome page
				User enters first digit of postcode and the state will automatically select the relevant state 
				Additionally, only numbers can be enterned
Dependencies: 	jQuery
*/

var PD = PD || {};

(function($){

PD.postcodeSelect = {

	init: function() {

		var self = this;

		self.wrapper = $('#page-wrapper');
		
		// go no further if postcode input is not found on page
		if (!$('#page-wrapper input.input-postcode').length) {return;}

		self.numbersOnly();
		self.selectState();

	},

	numbersOnly: function() {

		var self = this;

		// method to force 'postcode' input to accept number input only, no other characters allowed
		$('input.input-postcode', self.wrapper).on('keypress', function(e) {

			// if the character is not a digit then don't type anything
			if (e.which !== 8 && e.which !== 0 && (e.which < 48 || e.which > 57)) {
				return false;
			}				

		});			

	},

	selectState: function() {

		var self = this,
			updated;

		$('input.input-postcode', self.wrapper).on('keyup', function(e){
			
			// if the character is not a digit then don't type anything
			if (e.which !== 8 && e.which !== 0 && (e.which < 48 || e.which > 57) && (e.which < 96 || e.which > 105)) {
				return false;
			}

			var currVal = $(this).val(),
				stateSel = $(this).parents('.row').find('.state-select'),
				dealerSel = $('#page-wrapper select#Dealership_State');
				
			if (currVal === "0") {

				// 0XXX
				$('option[value="NT"]', stateSel[0]).prop('selected', true);

				//if (dealerSel.val() === "") {
					$('option[value="NT"]', dealerSel).prop('selected', true);
					updated = true;
				//}


			} else if (currVal === "2") {

				// 2XXX
				$('option[value="NSW"]', stateSel[0]).prop('selected', true);

				//if (dealerSel.val() === "") {
					$('option[value="NSW"]', dealerSel).prop('selected', true);
					updated = true;
				//}

			} else if (currVal === "26" || currVal === "29") {

				// 26XX or 29XX
				$('option[value="ACT"]', stateSel[0]).prop('selected', true);

				//if (dealerSel.val() === "") {
					$('option[value="ACT"]', dealerSel).prop('selected', true);
					updated = true;
				//}

			} else if (currVal === "3") {
				
				// 3XXX
				$('option[value="VIC"]', stateSel[0]).prop('selected', true);

				//if (dealerSel.val() === "") {
					$('option[value="VIC"]', dealerSel).prop('selected', true);
					updated = true;
				//}

			} else if (currVal === "4") {

				// 4XXX
				$('option[value="QLD"]', stateSel[0]).prop('selected', true);

				//if (dealerSel.val() === "") {
					$('option[value="QLD"]', dealerSel).prop('selected', true);
					updated = true;
				//}

			} else if (currVal === "5") {

				// 5XXX
				$('option[value="SA"]', stateSel[0]).prop('selected', true);

				//if (dealerSel.val() === "") {
					$('option[value="SA"]', dealerSel).prop('selected', true);
					updated = true;
				//}

			} else if (currVal === "6") {

				// 6XXX
				$('option[value="WA"]', stateSel[0]).prop('selected', true);

				//if (dealerSel.val() === "") {
					$('option[value="WA"]', dealerSel).prop('selected', true);
					updated = true;
				//}

			} else if (currVal === "7") {

				// 7XXX
				$('option[value="TAS"]', stateSel[0]).prop('selected', true);

				//if (dealerSel.val() === "") {
					$('option[value="TAS"]', dealerSel).prop('selected', true);
					updated = true;
				//}

			}

			// reset uniformjs for State select
			stateSel.uniform();

			if (updated) {

				// update Dealership State select as well
				dealerSel.uniform().change();
				updated = false;
			} 
			
		});

	}

};

$(function() {
	PD.postcodeSelect.init();
});

})(jQuery);


/*
Author: Ruiwen Qin
File name: colorizer.js
Description: Color picker with amends for Pre Delivery

Dependencies: jQuery
*/


(function($){
	colorizer = {
		init: function(){
			if (!$(".colorizer").length) {return;}

			var container = $(".colorizer"),
				colorName = $(".color-name", container),
				colors = $(".color-palette li", container);

			colorizer.colorSwap(colors,colorName, container);
		},
		colorSwap: function(colors,colorName, container){
			var colorLinks = $("a",colors),
				defaultText = $(".color-name", container).text();

			colorLinks.click(function(){
				var self = $(this);

				if (!self.hasClass("active")){
					colorLinks.removeClass("active");
					self.addClass("active");
					
					$("input#ambient-colour").val($.trim(self.text()));

					colorName.html(self.text());
				} else {
					colorLinks.removeClass("active");
					colorName.html(defaultText);
					$("input#ambient-colour").val("");
				}
				
				return false;
			});
		}
		
	};

	$(function(){
		colorizer.init();
	});

})(jQuery);


/*
Author: 		Brett Chaney
File name: 		character-count.js
Description: 	Pre Delivery Phase 3
				Shows remaining characters left for textarea input
Dependencies: 	jQuery
*/

var PD = PD || {};

(function($){

PD.characterCount = {

	init: function() {
		// go no further if textarea is not found on page
		if (!$('.charlimit').length) {return;}

		var self = this;

		self.textfield = $('.charlimit');
		self.charLeftSpan = $('.characters-left span');
		

		self.maxChar = self.textfield.data('max-char');

		// inject the number of character left onto the page
		self.charLeftSpan.html(self.maxChar);

		// bind the event listener to get this started
		self.bindListener();
	},

	bindListener: function() {

		var self = this;

		$('.charlimit').keyup(function() {
			var activeCharlimit = $(this);
			var remText = $(this).next('.characters-left').children('span');
			self.countChar(remText, activeCharlimit);
		});

	},

	countChar: function(remaining, currTextArea) {

		var self = this,
			charLength = currTextArea.val().length,
			charRemaining = self.maxChar - charLength,
			currVal = currTextArea.val(),
			newVal;

		if (charRemaining < 0) {
			
			newVal = currVal.substring(0, currVal.length - 1);

			// update character left SPAN with 0 if character count is more than the max allowed
			currTextArea.val(newVal);
			remaining.html('0');

			// check if text is pasted into textarea with more than the max characters allowed
			if (charLength > self.maxChar) {

				newVal = currVal.substring(0, self.maxChar);

				currTextArea.val(newVal);
				remaining.html('0');

			}

		} else {

			// updated character left SPAN with characters remaining
			remaining.html(charRemaining);
		}

	}

};

$(function() {
	PD.characterCount.init();
});

})(jQuery);


/*
Author: 		Brett Chaney
File name: 		save-continue.js
Description: 	Pre Delivery Phase 3 
				Save and Continue functionality for Steps page
Dependencies: 	jQuery
*/

var PD = PD || {};

(function($){

PD.saveContinue = {

	init: function() {
		
		// go no further if the Save and Continue buttons are not found on page
		if (!$('.save-continue').length) {return;}

		var self = this;

		// cache 'success text' message
		self.successText = $('.btn-section .save-text').eq(0).find('.columns').html();

		// add event to 'save and continue' buttons
		self.bindSaveButton();	

		// if 'step' is a parameter in query string
		// open and scroll to that step
		self.gotoStep();

	},

	getQueryVariable: function(variable) {

		var query = window.location.search.substring(1),
			vars = query.split('&');

		for (var i=0;i<vars.length;i++) {
			var pair = vars[i].split('=');
			if(pair[0] == variable){return pair[1];}
		}

		return(false);

	},

	gotoStep: function() {
		
		var stepParam = this.getQueryVariable('step');
		var step = stepParam ? stepParam - 1 : 0;
		var tab = $('.accordion-panel ul li').find('.tab-area').eq(step);
		
		// scroll and open relevant step and fire omniture
		setTimeout(function() {
			tab.trigger("mouseup").trigger('click');
		}, 500);
		

	},

	bindSaveButton: function() {

		var self = this;

		$('.save-continue', '#page-wrapper').on('click', function(e) {
			e.preventDefault();

			// add the current step to a hidden input field
			var thisStep = $(this).data('step');
			$('input#step-saved').val(thisStep);

			self.sendRequest($(this));
		});

	},

	sendRequest: function(elem) {

		// serialize form data and replace + with %20 for empty spaces
		var formData = $('.fbform'),
			self = this,
			backBtn = formData.find("#backBtn"),
			prevBackVal = backBtn.val();

		backBtn.val("save");
		var formUrl = formData.serialize().replace(/\+/g,'%20');
		
		$.ajax({
			url: "/servlet/predelivery",
			cache: false,
			data: formUrl,
			type: 'POST',
			beforeSend: function() {

				// inject BG and loading GIF into DOM
				$('body').append('<div class="reveal-modal-bg white-bg" style="display:block;"><div class="ajax-loader"></div></div>');
			},
			complete: function() {

				// remove BG and loading GIF from DOM
				$('.reveal-modal-bg.white-bg').remove();
				backBtn.val(prevBackVal);
			},
			success: function() {

				elem.parents('.btn-section').find('.save-text .columns')
					.html('').html(self.successText)
					.parent().show();
				
			},
			error: function(e, extStatus) {

				var errorMsg = (extStatus + ': ' + e.statusText).toUpperCase();

				elem.parents('.btn-section').find('.save-text .columns').html(errorMsg).parent().show();		
				
			}

		});
		
	}

};

$(function() {
	PD.saveContinue.init();
});

})(jQuery);


/*
 * Author: Jessie Biros
 * Description: Pre-delivery steps - enable other form elements on click of radio button etc.

 example use:

if the one that will enable will come from the SELECT
<div class="panel-content">
	<div class="row">
		<div class="medium-6 medium-centered columns">
			<label for="Frequency1">FAVOURITE COLOUR</label>
			<select id="favoritecolor" name="favoritecolor">
				<option selected="selected">Select Your Religion</option>
				<option value="god1">GOD 1</option>
				<option value="god1">GOD 1</option>
				<option value="Others" data-enable="can_enable">Others</option> //this will enable the disabled element
			</select>
		</div>
	</div>

	<div class="row has_disabled"> //add has disabled class to the parent of the element
		<div class="medium-6 medium-centered columns">
			<label for="Frequency1">OTHER</label>
			<input type="text" id="other_perfume" disabled name="other_perfume" class="trackable disabled_item" /> 
			//class disabled item and property disabled
		</div>
	</div>
</div>

if the one that will enable is from radio button or other elements
<div class="panel-content">
	<div class="row">
		<div class="medium-3 medium-offset-4 columns radio-wrap">
			<input type="radio" name="Time" id="veh_dec_yes" value="Twentyfour_hour" class="radio round trackable can_enable"/> //this can enable
			<label for="veh_dec_yes" class="trackable can_enable">Yes</label> //this can enable
		</div>
		<div class="medium-3 end columns radio-wrap">
			<input type="radio" name="Time" id="veh_dec_no" value="Twelve_hour" class="radio round trackable"/>
			<label for="veh_dec_no" class="trackable">No</label>
		</div>
	</div>

	<div class="row has_disabled"> //add class has disabled
		<div class="medium-6 medium-centered columns">
			<label for="Frequency1">FAVOURITE COLOUR</label>
			//disabled item class and disabled attr.
			<select id="favoritecolor" name="favoritecolor" class="disabled_item" disabled> 
				<option value="color1">Color 1</option>
				<option value="color1">Color 1</option>
				<option value="color1">Color 1</option>
				<option value="color1">Color 1</option>
				<option value="color1">Color 1</option>
			</select>
		</div>
	</div>
</div>
 */

(function($){
	var enableFormElem = {
		init: function(){
			// this will check if the element doesnt exist then it wont run the function
			if (!$(".can_enable", ".uniform").length) {return;}

			// bind enableEvent function to radio buttons
			$("input:radio").on('click', this.enableEvent.bind(this));
			// bind enableEvent function to labels
			$("label").on('click', this.enableEvent.bind(this));

			var canEnableElems = $(".can_enable",".uniform");

			// this will check if by default the option being set is the one that can enable
			enableFormElem.checkDefaultEnable(canEnableElems);

			enableFormElem.checkDefaultEnableSelect($('select', ".uniform"));

			$("select").change(function(){
				var self = $(this);
				// this will check if the select tag is not the disabled item
				if(!self.hasClass('disabled_item')){
					// if it can enable, then it will set the "disabled" property to false to the ".disabled_item"
					var parent = self.parents('.panel-content').find('.has_disabled');

					// this will check if the selected value is can_enable
					if(self.find(':selected').data('enable') == "can_enable"){
						$('.disabled_item', parent).prop("disabled", false);
					} else {
						$('.disabled_item', parent).prop("disabled", true);
					}
				}
			});
		},

		enableEvent: function(e){
			var el = e.target;
			var parent = $(el).parents('.panel-content').find('.has_disabled');

			//this will check if the clicked 'label' is sibling(before) a 'dropdown'
			if($(el).next().hasClass('dropdown')){
				return false;
			}

			if($(el).hasClass("can_enable")){
				$('.disabled_item', parent).prop("disabled", false);
			} else {
				$('.disabled_item', parent).prop("disabled", true);
			}
		},

		checkDefaultEnable: function(arr){
			arr.each(function(){
				var self = $(this);
				if(self.parent().hasClass("checked")){
					var parent = self.parents('.panel-content').find('.has_disabled');
					$('.disabled_item', parent).prop("disabled", false);
				}
			});
		}, 

		checkDefaultEnableSelect: function(arr){
			arr.each(function(){
				var self = $(this);
				if(self.find(':selected').data('enable') == "can_enable"){
					var parent = self.parents('.panel-content').find('.has_disabled');
					$('.disabled_item', parent).prop("disabled", false);
				}
			})
		}
		
	}

	$(document).ready(function(){
		enableFormElem.init();
	});
}(jQuery));


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




(function($) {

	var formValidation = function() {

		this.init = function() {
			// HTML forms shim
			$.webshims.setOptions("extendNative", false);
			$.webshims.setOptions("waitReady", false);
			$.webshims.debug = true;
			if ( typeof SiteConf !== 'undefined' && SiteConf.dev) {
				// local path
				$.webshims.setOptions({
					basePath : "../../src/themes/ftd/js/lib/shims/"
				});
			} else {
				// server path
				$.webshims.setOptions({
					basePath : "/themes/ftd/js/lib/shims/"
				});
			}
			$.webshims.polyfill('forms');
			$.webshims.setOptions('forms', {
				iVal : {
					handleBubble : 'hide'
				},
				addValidators : true
			});
			
			this.customValidity();

			this.elements();
		};

		this.customValidity = function() {
			// group check phone numbers
			
			// webshim group checking has a bug please use this.groupValidation method to avoid this issue happen
			$.webshims.ready('form-validators', function() {
				// group check phone numbers
				$.webshims.addCustomValidityRule('group-required-phone', function(elem, value) {
					var groupTimer = {};
					var name = elem.name;

					if (!name || !$(elem).hasClass('group-required-phone')) {
						return;
					}
					var textelements = $((elem.form && elem.form[name]) || document.getElementsByName(name));

					var isValid = textelements.filter(function() {
						return $(this).val() !== "";
					});

					if (isValid[0]) {
						textelements.each(function() {
							$("input[type=tel]").removeClass("user-error").addClass("user-success");
							$("input[type=tel]").parent().removeClass("ws-invalid").addClass("ws-success");
							$("input[type=tel]").attr("aria-invalid", "false");
						});
						return false;
					}

					var valid = $(".group-required-phone").filter(function() {
						return $(this).val() !== "";
					});

					if (valid.length == 0) {
						return true;
					}

				});

				// group check dealer locator search
				
				// webshim group checking has a bug please use this.groupValidation method to avoid this issue happen
				$.webshims.addCustomValidityRule('group-required-dealer-location', function(elem, value) {
					
					var name = elem.name,
						form = elem.form;

					if (!name || !$(elem).hasClass('group-required-dealer-location')) {
						return;
					}
					var textelements = $((form && form[name]) || document.getElementsByName(name));

					var isValid = textelements.filter(function() {
						return $(this).val() !== "";
					});
					
					if(isValid.length==0){
					    $(form).find(".group-required-dealer-location").each(function () {
					        if ($(this).val() !== "") {
					            isValid.push($(this));
					        }
					    });
					}
					
					if (isValid[0]) {
					    textelements.each(function () {
					        $("input[type=text]").removeClass("user-error").addClass("user-success");
					        $("input[type=text]").parent().removeClass("ws-invalid").addClass("ws-success");
					        $("input[type=text]").attr("aria-invalid", "false");

					        $('select.group-required-dealer-location').removeClass("user-error").addClass("user-success");
					        $("select.group-required-dealer-location").parent().removeClass("ws-invalid").addClass("ws-success");
					        $("select.group-required-dealer-location").attr("aria-invalid", "false");

					    });
					    return false;
					}
                    
					
					return true;
				});
				
				// check passwords match
				$.webshims.addCustomValidityRule('passwords-match', function(elem, value) {
					if (!value || !$(elem).hasClass('passwords-match')) {
						return;
					}
					var passwords = $(".passwords-match");

					if (passwords[0].value !== passwords[1].value && passwords[1].value !== '') {
						return true;
					}
					return false;
				});
				
				//captcha ajax validation, due to the incorrect response data structure already set, have to use "addCustomValidityRule" to define an cusotm ajax validation
				//for other ajax validations, please use webshim "data-ajaxvalidate" which require response data structure as the same as webshim defined data structure
				$.webshims.addCustomValidityRule("captcha-validation", function(elem, value, data) {
					var element = $(elem),
						submitBtn = $(elem.form).find("#submit");
					if (!element.hasClass("captcha")) {return;}
					//instead of setting pattern to html tag, set rules here to avoid webshim combination(html5 validation+ custom validation) validation issue
					//put validation all together as custom
					var reg = /^[0-9]{5}$/;
					
					//set default value
					//_ajaxvalidation, true to allow sending ajax validation
					if(typeof data._ajaxvalidation !== "boolean"){
						data._ajaxvalidation = true;
					}
					//_validRs, result of validation. in webshim, false represent valid, true represent invalid
					if(typeof data._validRs !== "boolean"){
						data._validRs = false;
					}
					//_lastValue, use to compare current value and last value, sending ajax validation again only when new value entered
					if(typeof data._lastValue !== "string"){
						data._lastValue = "";
					}
					//store value of submit button
					if(submitBtn.length>0 && submitBtn.attr("data-pleasewait")){
						var submitBtnVal = submitBtn.val(),
							waitingText = submitBtn.attr("data-pleasewait");
					}
					
					//ajax validtion will only be sent after pass regular validation
					if(reg.test(value)){
						if(data._ajaxvalidation&&data._lastValue!=value){
							//pass json string to server
							var posData = JSON.stringify({
								captcha : value
							});
							//set ajax loading status
							element.addClass("pending").prop("disabled",true);
							//set submit button disabled, prevent submit action happened while waiting the result of ajax validation
							if(submitBtnVal){
								submitBtn.val(waitingText);
								submitBtn.prop("disabled",true);
							}
							$.ajax({
				                type: "POST",
				                url: instance.serviceLocator("captcha.validation"),
				                //local test url
				                //url: "/carve/RAD2013/rest/forms/validate-captcha.js",
				                contentType: "application/json; charset=UTF-8",
				                data: posData,
				                dataType: "json",
				                success: function (response) {
				                	//remove ajax loading status after response returned
				                	element.removeClass("pending").prop("disabled",false);
				                	
				                	if(submitBtnVal){
				                		submitBtn.val(submitBtnVal);
				                		submitBtn.prop("disabled",false);
			                		}
				                	//will run validation again after ajax validation, turn off the ajaxvalidation to prevent sending duplicated ajax call
				                	data._ajaxvalidation = false;
				                	if(response.valid=="false"){
				                		//if "false" recieved, set the validation result to true, represent invalid value
				                		data._validRs = true;
				                		//due to change of the value, sometimes webshim will not change the status, refresh it to have the correct ui status
				                		element.trigger("refreshvalidityui");
				                		//invalid flag "_validRs" already saved, so trigger validation again to tell webshim the value is invalid
				                		element.trigger("refreshCustomValidityRules");
				                	}else if(response.valid=="true"){
				                		//change the ui status manually
				                		element.removeClass("user-error").addClass("user-success");
				                		//pass the ajax validation will do nothing, but tell webshim the value is valid
				                		data._validRs = false;
				                		data._ajaxvalidation = true;
				                	}else{
				                		data._validRs = false;
				                	}
				                },
				                error: function () {
				                   //remove ajax loading status after response returned
				                   element.removeClass("pending").prop("disabled",false);
				                   
				                   if(submitBtnVal){
				                		submitBtn.val(submitBtnVal);
				                		submitBtn.prop("disabled",false);
			                		}
				                   data._validRs = true;
				                   element.trigger("refreshvalidityui");
				                }
				            });
						}else{
							//as _ajaxvalidation already been set false, trigger("refreshCustomValidityRules") will not do ajax validation for current value
							//but turn _ajaxvalidation on to allow new value ajax validation
							data._ajaxvalidation = true;
						}
					}else{
						//save current value as last value
						data._lastValue = value;
						return true;
					}
					//save current value as last value
					data._lastValue = value;
					return data._validRs;
				});
				//on "reload" captcha button click, reset captcha input field as empty
				$("#captchareload").on("click",function(){
					$(this).siblings(".captcha").val("").trigger("refreshvalidityui");
				});
				
				
			});
			
			//add groupValidation
			this.groupValidation([
				"#dragonflyform .group fieldset > .column",
				".opt-inout-survey"
			]);
		};

		this.elements = function() {
			var scope = this;
			// forms - replace checkbox with an image
			var select = $('select'), fbForm = $('.fbform');

			//Only for FOA to load default value for first name and last name
			var $FoaConfig = $('#FoaConfig');
			
			$(".opt-inout-checkbox").show();//hidden in css, display while js ready - fixed default checkbox displayed and clicked by user when the js hasnt finish loading yet
			
			// Selects
			fbForm.on('focus', 'select', function() {
				$(this).parent().addClass('focus');
			});

			fbForm.on('blur', 'select', function() {
				$(this).parent().removeClass('focus');
			});

			$('form select[autofocus]').trigger('focus');

			// Remove ws-errorboxes from DOM
			$('input, select').on('blur', function() {
				$('.ws-errorbox').remove();
			});

			// ie select focus highlight fix
			if ($.browser.msie) {
				$(document).on('change', 'select', function() {
					$(this).blur();
				});
			}

			// Checkboxes
			var checkbox = $('input[type="checkbox"]').not('.uniform-checkbox').filter(function() {
				if (!$(this).parent().hasClass("hidden-options-checkbox")) {
					return $(this);
				}
			});

			checkbox.each(function() {
				var $this = $(this);

				$this.before($('<div class="checkbox-image" />'));

				if ($this.prop('checked')) {
					$this.prev().addClass('checked');
				}

			});

			$('.checkbox-image').on('click', function() {
				var self = $(this);
				
				if (self.hasClass('checked')) {
					self.removeClass('checked');
					self.parent().removeClass('ws-success');
					self.parent().addClass('ws-invalid');
					self.next().removeAttr("aria-invalid");
					self.next().removeClass("user-error");
					self.next().prop('checked', false);
					self.next().removeClass('user-sucess');
					self.next().addClass('user-error');
					self.next().attr('aria-invalid', true);
				} else {
					self.addClass('checked');
					self.parent().removeClass('ws-invalid');
					self.parent().addClass('ws-success');
					self.next().prop('checked', true);
					self.next().removeClass('user-error');
					self.next().addClass('user-success');
					self.next().removeAttr('aria-invalid');
				}

				if (self.siblings(".hidden-options-checkbox").length > 0) {
					var hiddenOptions = self.siblings(".hidden-options-checkbox").find("input[type='checkbox']");
					if (self.is('.checked')) {
						hiddenOptions.prop('checked', true);
					} else {
						hiddenOptions.prop('checked', false);
					}
				}
				
				scope.applyToShowHideFunc(self,scope);
				
			});

			$('.regform [type=submit]').on('click', function() {
				if ($FoaConfig.length > 0) {
					var FoaConfig = JSON.parse($FoaConfig.html());
					if ( typeof FoaConfig.firstname !== 'undefined' && typeof FoaConfig.lastname !== 'undefined' && $('#firstname').val().length == 0 && $('#lastname').val().length == 0) {
						$('#firstname').val(FoaConfig.firstname);
						$('#lastname').val(FoaConfig.lastname);
					}
				}
			});

			$("label").on('click', function() {
				var self = $(this);

				var pretarget = self.parent();
				// $(".checkbox-image",pretarget).trigger("click");
				var checkboxImg = $(".checkbox-image", pretarget);

				if (checkboxImg.hasClass('checked')) {
					checkboxImg.removeClass('checked');
				} else {
					checkboxImg.addClass('checked');
				}
				
				scope.applyToShowHideFunc(self,scope);
				
			});

			// Hide registration form sections on page load, except for the first one 'Account Information'
			if (!$('.regform').hasClass("form-invalid")) {
				$('.regform > .section').slice(1).find('.row.form-bg > .columns').hide();
			}

			$('.section').on('click', '.next-btn', function(e) {

				e.preventDefault();
				$(this).parents('.section').next().find('.row.form-bg > .columns').slideDown(300, function() {

					$(this).parents('.section').prev().find('.next-btn').animate({
						opacity : 0
					}, 200, function() {
						$(this).hide();
					});
					$('html, body').animate({
						scrollTop : $(this).parents('.section').offset().top
					}, 600);

				});

			});

			if ($(".hint").length > 0) {
				var hint = $(".hint");
				hint.click(function() {
					$(this).siblings(".hint-content").slideToggle();
					return false;
				});
			}

			// 'Enter' keyboard action for form
			// Added by Jennie Ji 2014/4/2
			if ($('.regform .next-btn').length > 0) {
				$(document).on('keypress', function(e) {

					if (e.which !== 13) {
						return;
					}
					if ($('.section .next-btn:visible').size() > 0) {
						$('.section .next-btn:visible').click();
					} else {
						$(".regform #submit").click();
					}
				});
			}

			//fixed enter key doesnt trigger under ie8
			if ($(".ie8 .fbform").length > 0) {
				$(document).on("keypress", function(e) {
					if (e.which == 13) {
						$(e.target).closest("fieldset").find("input[type='submit']").trigger("click");
					}
				});
			}
			
			//page load to refresh the captcha image. fixed image load cache issue, will be good if JSP can add timestamp
			var image = document.getElementById("captchaimage");
			if (image) {
				image.src = "/servlet/captcha.png?a=" + (new Date().getTime());
			}
			
			//page load to initalise the option group status
			var optGroup = $(".opt-inout-checkbox .option-group input[type=checkbox]");
			if(optGroup.length>0){
				optGroup.each(function(){
					if($(this).prop("checked")){
						$(this).closest(".option-group").show();
						scope.groupValidation([".opt-inout-checkbox"]);
						return;
					}
				})
			}

			if ($(".two-inputs").length > 0) {

				var inputOne = $(".two-inputs input").eq(0),
					inputTwo = $(".two-inputs input").eq(1);

				inputTwo.on("blur, change", function() {

					if (inputOne.checkValidity() && inputTwo.checkValidity()) {
						// do nothing
					} else {
						$(this).parent().removeClass("ws-success").addClass("ws-invalid");
					}
				});
				
			}
			
			//prevent page scroll to top
			$("a.submitForm").on("click",function(e){
				e.preventDefault();
			});


		}
		
		
		/**
		 * as we are using custom checkbox which contains "checkbox-image" and "label" ,we need to bind the func on both of them
		 * this func here to remove duplicated coding
		 * 
		 * @param self, jQuery object
		 * @param scope, formValidation object
		 */
		this.applyToShowHideFunc = function (self,scope){
			var chkbox = self.siblings("input[type=checkbox]");
			if(chkbox.length==0){return;}
			var chkboxId = chkbox.attr("id").toLowerCase();
			
			//add show/hide functionality to specified element
			//bind to "opt-inout-checkbox"
			if(self.siblings("#opt-inout-checkbox").length>0){
				scope.bindShowHidefunc(self,".option-group","checked",".opt-inout-checkbox",true);
			}
			if(chkboxId.indexOf("other")!=-1){
				//as the structure of CRM form is fixed (can not add any different class), we can only address the specific element by using structure. the structure cannot be changed for sure.
				var identityWrapper = chkbox.parent().parent();
				//bind to "#testOpsurveydebug_Option_Other"
				if(identityWrapper.hasClass("opt-inout-survey")){
					scope.bindShowHidefunc(self,".survey-group","checked",".opt-inout-survey");
				}
				//bind to "#testOpsurveydebug_Option_Other"
				if(identityWrapper.hasClass("survey-group")){
					scope.bindShowHidefunc(self,".textare","checked",".survey-group");
				}
			}
			//enable alternative selection. toggle selection between 2 groups
			scope.alternativeSel(self,"category-one","category-two",".opt-inout-checkbox");
			scope.alternativeSel(self,"category-one","category-two",".opt-inout-survey");
		}
	
		/**
		 * click element to show/hide specified element
		 * it's designed as reusable functionality
		 * 
		 * this functionality : 
		 * 1. can put targetField(field you want to show/hide) anywhere of clicked element no matter it's child, sibeling or parent
		 * 2. can accept checkbox, radio
		 * @param thisObj, jQueryObject, current element jQuery object. eg. $(this) of click event
		 * @param targetField, String, the show/hide field
		 * @param activatedCls, String, optional, default "checked", if there is no activatied class required, pass Boolean false. you can pass any string value as custom activated class.
		 * @param parentEl, String, optional, parent string. if not specified, will assume targetField located within triggerElment
		 * @param reversed, Boolean, optional, default false, only work on checkbox/radio. true means "check" to hide fields. false means "uncheck" to hide fields
		 */
		this.bindShowHidefunc = function(thisObj,targetField,activatedCls,parentEl,reversed) {
			var _self = this,
				_targetFieldObj = thisObj.find(targetField),//default targetField assumed located under clicked element
				_activatedCls = activatedCls,
				_parentEl = parentEl,
				_reversed = reversed,
				_optChkbox = thisObj.siblings(".option-group").find("INPUT[type=checkbox]");
			//set default activatedCls class if not specified
			if(typeof(_activatedCls)!=="string"||(typeof(_activatedCls)==="string"&&_activatedCls.length==0)){
				_activatedCls = "checked";
			}
			//set default reversed value if not specified
			if(typeof(_reversed)!=="boolean"){
				_reversed = false;
			}
			//if the targetField is not nested field, then find it by the parent of both triggerEl and targetField
			if(typeof(_parentEl)==="string"&&_parentEl.length>0){
				_targetFieldObj = thisObj.closest(_parentEl).find(targetField);
			}
			//address targetField, remove all the values within
			var _removeValue = function() {
				_targetFieldObj.find("INPUT,TEXTAREA").each(function(){
					var _thisObj = $(this);
					if(_thisObj.prop("type")=="checkbox"||_thisObj.prop("type")=="radio"){
						_thisObj.prop("checked",false);
					}else{
						_thisObj.val("");
					}
				});
				_targetFieldObj.find(".textare").slideUp();
				//remove the checked state
				_targetFieldObj.find(".checkbox-image").removeClass(_activatedCls);
				//to remove "option check box" mandatory
				_targetFieldObj.find(".altOpt").prop("required",false);
				_targetFieldObj.closest(".opt-inout-checkbox").removeClass("showErr").removeClass("ws-invalid");
				_targetFieldObj.closest(".opt-inout-checkbox").find(".ws-invalid").removeClass("ws-invalid");
			}
			
			//senario for default checkbox/radio
			if(thisObj.prop("type")=="checkbox"||thisObj.prop("type")=="radio"){
				if(thisObj.prop("checked")&&!_reversed){
					_targetFieldObj.slideDown(function(){
						//to set "option check box" mandatory
						if(_targetFieldObj.closest(".opt-inout-checkbox").length>0){
							_self.groupValidation([".opt-inout-checkbox"]);
						}
					});
				}else{
					_targetFieldObj.slideUp(function(){
						//remove all values after hide targetfield
						_removeValue();
					});
				}
			//senario for other types
			}else{
				//senario for custom checkbox
				if(thisObj.hasClass(_activatedCls)){
					//reverse to switch show/hide
					if(_reversed){
						_targetFieldObj.slideUp(function(){
							//remove all values after hide targetfield
							_removeValue();
						});
					}else{
						_targetFieldObj.slideDown(function(){
							//to set "option check box" mandatory
							if(_targetFieldObj.closest(".opt-inout-checkbox").length>0){
								_self.groupValidation([".opt-inout-checkbox"]);
							}
						});
					}
				//senario for non activatedCls
				}else{
					_targetFieldObj.slideToggle(function(){
						//to detect whether it's slideDown/slideup, hidden means slideUp
						if(_targetFieldObj.is(":hidden")){
							//only when reversed
							if(_reversed){
								//tick checkbox if reversed ()
								var checkBoxIcon = thisObj.siblings(".checkbox-image"),
									inputField = thisObj.siblings("INPUT");
								//if has "checkbox-image" slibling
								if(checkBoxIcon.length>0){
									checkBoxIcon.addClass(_activatedCls);
								}
								//if has input field
								if(inputField.length>0){
									inputField.prop("checked",true);
								}
							}
						//in some cases, the checkbox will be selected by click label. to prevent this, will remove the checked state on both slideup and slideDown
						_removeValue();
						//visible means slideDown
						}else{
							//to set "option check box" mandatory
							if(_targetFieldObj.closest(".opt-inout-checkbox").length>0){
								_targetFieldObj.siblings("input[type=checkbox]").prop("checked",false);
								_self.groupValidation([".opt-inout-checkbox"]);
							}
						}
					});
				}
			}
			
		};
		
		/**
		 * enable alternative selection. toggle selection between 2 groups
		 * 
		 * @param thisObj, jQuery element object
		 * @param firstCatCls, string, class name(not css selector) of one of the group
		 * @param secondCatCls, string, class name(not css selector) of one of the group
		 * @param bindUnderElCls, string, class name (css selector). as the click event bind to all element "eg $('label').click ", need to identify specific target elements by their parents 
		 */
		this.alternativeSel = function (thisObj,firstCatCls,secondCatCls,bindUnderElCls){
			//as the click event bind to all element "eg $('label').click ", need to identify specific target elements by their parents 
			if(thisObj.closest(bindUnderElCls).length>0){
				var inputField = thisObj.siblings("INPUT"),
					bindUnderObj = $(bindUnderElCls),
					firstCatObj = bindUnderObj.find("."+firstCatCls),
					secondCatObj = bindUnderObj.find("."+secondCatCls);
				
				var switchSelection = function(catObj){
					catObj.siblings(".checkbox-image").removeClass("checked");
					catObj.prop("checked",false);
					//"testOpsurveydebug_Option_Other" field has expandable fields, need to remove all values after slideUp to prevent those values submit
					if(catObj.attr("id").toLowerCase().indexOf("other")!=-1 && catObj.parent().parent().hasClass("opt-inout-survey")){
						var hiddenFields = catObj.closest(".opt-inout-survey").find(".survey-group");
						hiddenFields.slideUp(function(){
							hiddenFields.find("INPUT").siblings(".checkbox-image").removeClass("checked");
							hiddenFields.find("INPUT").prop("checked",false);
							hiddenFields.find(".textare").slideUp();
							hiddenFields.find("TEXTAREA").val("");
						});
					}
				}
				if(inputField.hasClass(firstCatCls)){
					var catObj = secondCatObj;
					switchSelection(catObj);
				}else if(inputField.hasClass(secondCatCls)){
					var catObj = firstCatObj;
					switchSelection(catObj);
				}
			}
		};
		/**
		 * group check specified elements, must fill at least one element to submit the form
		 * checking types: 
		 * 					textfield
		 * 					checkbox
		 * 					selection
		 * 
		 * webshims has a bug for group required (we previously use $.webshims.addCustomValidityRule to add) validation (submit button has to be clicked twice to submit the form)
		 * use this custom validation to avoid group checking issue
		 * 
		 * This custom validation require:
		 * 1. webshims (in order to work properly under IE8)
		 * 2. specified element must add class "altOpt"
		 * 
		 * @param wrapper, Array, each of them are css seletor to specify the container of the group.
		 * 		  this.groupValidation("#dragonflyform") can be used to check all specified element under form.
		 */
		this.groupValidation = function(wrapper) {
			if(wrapper instanceof Array && wrapper.length>0){
				var numberOfGroups = wrapper.length;
				for(var i=0; i<numberOfGroups; i++){
				    var groupEls = $(wrapper[i] + " INPUT.altOpt" + "," + wrapper[i] + " SELECT.altOpt"),
						form = groupEls.closest("FORM"),
						wrapperObj = $(wrapper[i]);
					if(groupEls.length>0 && form.length>0){
						//delegate change event on "checkbox-image" as it added by js and excuted later.
						//extra class to identify whether event been binded, to prevent bind duplicated event
						if(!$(wrapper[i]).hasClass("eventBinded")){
							form.on("click", wrapper[i]+" .checkbox-image",function(){
								var inputEl = $(this).siblings("INPUT");
								inputEl.trigger("change");
							});
							$(wrapper[i]).addClass("eventBinded");
						}
						/**
						 * recursive function, check groupValidation on every:
						 * 1. page loading
						 * 2. event triggered
						 * 
						 * @param groupEls, jquery obj, group elements
						 * @param wrapperObj, current group container
						 * @param init, boolean, true means the checkValidity is running first time.
						 */
						var checkValidity = function(groupEls,wrapperObj,init,actionELE) {
							var count = 0,
								curForm = groupEls.closest("FORM");
							
							//first time running to bind click event for submit buttom
							if(init){
								curForm.find("INPUT[type=submit]").on("click",function(){
									if(!wrapperObj.hasClass("showErr")&&wrapperObj.find(".altOpt").prop("required")){
										wrapperObj.addClass("showErr");
									}
								});
								curForm.find("a.submitForm").on("click",function(e){
									if(!wrapperObj.hasClass("showErr")&&wrapperObj.find(".altOpt").prop("required")){
										wrapperObj.addClass("showErr");
									}
								});
							}
							
							groupEls.each(function(){
								var curEl = $(this),
									e = "change";
								if(curEl.prop("type")=="text"){
									if(curEl.val()!=""){
										count++;
									}
									e = "blur";
								}else if(curEl.prop("type")=="checkbox"){
									if(curEl.prop("checked")){
										count++;
									}
								}
								else if (curEl.is("select")) {
								    if (curEl.val() != "") {
								        count++;
								    }
								}
								//first time running to bind event on element
								if(init&&!curEl.hasClass("eventBinded")){
									curEl.on(e,function(){
										checkValidity(groupEls,wrapperObj,false,curEl);
									});
									//extra class to identify whether event been binded, to prevent bind duplicated event
							        curEl.addClass("eventBinded");
								}
							});
							if(count>0){
								groupEls.prop("required",false);
								//set valid status , same as replaced validation function 
								groupEls.removeClass("user-error").addClass("user-success");
								groupEls.parent().removeClass("ws-invalid").addClass("ws-success");
								groupEls.attr("aria-invalid", "false");
								if(!init){
									wrapperObj.removeClass("showErr").removeClass("ws-invalid");
									wrapperObj.find(".ws-invalid").removeClass("ws-invalid");
								}
							}else{
								groupEls.prop("required",true);
								if (!init) {
								    wrapperObj.addClass("showErr");
								    if (actionELE && actionELE.length > 0 && actionELE.is('select')) {
								        actionELE.removeClass("user-success").addClass("user-error");
								        actionELE.parent().removeClass("ws-success").addClass("ws-invalid");
								        actionELE.attr("aria-invalid", "true");
								    }
								}
							}
						}
						checkValidity(groupEls,wrapperObj,true);
					}
				}
			}
		}
	};

	$(function() {
		formValidationInstance = new formValidation();
		formValidationInstance.init();
	});

})(jQuery);


