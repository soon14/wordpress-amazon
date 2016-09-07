
/* Modernizr 2.5.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-fontface-backgroundsize-borderimage-borderradius-boxshadow-flexbox-flexbox_legacy-hsla-multiplebgs-opacity-rgba-textshadow-cssanimations-csscolumns-generatedcontent-cssgradients-cssreflections-csstransforms-csstransforms3d-csstransitions-applicationcache-canvas-canvastext-draganddrop-hashchange-history-audio-video-indexeddb-input-inputtypes-localstorage-postmessage-sessionstorage-geolocation-touch-cssclasses-prefixed-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes
 */
;window.Modernizr=function(a,b,c){function B(a){j.cssText=a}function C(a,b){return B(n.join(a+";")+(b||""))}function D(a,b){return typeof a===b}function E(a,b){return!!~(""+a).indexOf(b)}function F(a,b){for(var d in a)if(j[a[d]]!==c)return b=="pfx"?a[d]:!0;return!1}function G(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:D(f,"function")?f.bind(d||b):f}return!1}function H(a,b,c){var d=a.charAt(0).toUpperCase()+a.substr(1),e=(a+" "+p.join(d+" ")+d).split(" ");return D(b,"string")||D(b,"undefined")?F(e,b):(e=(a+" "+q.join(d+" ")+d).split(" "),G(e,b,c))}function J(){e.input=function(c){for(var d=0,e=c.length;d<e;d++)t[c[d]]=c[d]in k;return t.list&&(t.list=!!b.createElement("datalist")&&!!a.HTMLDataListElement),t}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),e.inputtypes=function(a){for(var d=0,e,f,h,i=a.length;d<i;d++)k.setAttribute("type",f=a[d]),e=k.type!=="text",e&&(k.value=l,k.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(f)&&k.style.WebkitAppearance!==c?(g.appendChild(k),h=b.defaultView,e=h.getComputedStyle&&h.getComputedStyle(k,null).WebkitAppearance!=="textfield"&&k.offsetHeight!==0,g.removeChild(k)):/^(search|tel)$/.test(f)||(/^(url|email)$/.test(f)?e=k.checkValidity&&k.checkValidity()===!1:/^color$/.test(f)?(g.appendChild(k),g.offsetWidth,e=k.value!=l,g.removeChild(k)):e=k.value!=l)),s[a[d]]=!!e;return s}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var d="2.5.3",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k=b.createElement("input"),l=":)",m={}.toString,n=" -webkit- -moz- -o- -ms- ".split(" "),o="Webkit Moz O ms",p=o.split(" "),q=o.toLowerCase().split(" "),r={},s={},t={},u=[],v=u.slice,w,x=function(a,c,d,e){var f,i,j,k=b.createElement("div"),l=b.body,m=l?l:b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),k.appendChild(j);return f=["&#173;","<style>",a,"</style>"].join(""),k.id=h,(l?k:m).innerHTML+=f,m.appendChild(k),l||(m.style.background="",g.appendChild(m)),i=c(k,a),l?k.parentNode.removeChild(k):m.parentNode.removeChild(m),!!i},y=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;return f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=D(e[d],"function"),D(e[d],"undefined")||(e[d]=c),e.removeAttribute(d))),e=null,f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),z={}.hasOwnProperty,A;!D(z,"undefined")&&!D(z.call,"undefined")?A=function(a,b){return z.call(a,b)}:A=function(a,b){return b in a&&D(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=v.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(v.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(v.call(arguments)))};return e});var I=function(c,d){var f=c.join(""),g=d.length;x(f,function(c,d){var f=b.styleSheets[b.styleSheets.length-1],h=f?f.cssRules&&f.cssRules[0]?f.cssRules[0].cssText:f.cssText||"":"",i=c.childNodes,j={};while(g--)j[i[g].id]=i[g];e.touch="ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch||(j.touch&&j.touch.offsetTop)===9,e.csstransforms3d=(j.csstransforms3d&&j.csstransforms3d.offsetLeft)===9&&j.csstransforms3d.offsetHeight===3,e.generatedcontent=(j.generatedcontent&&j.generatedcontent.offsetHeight)>=1,e.fontface=/src/i.test(h)&&h.indexOf(d.split(" ")[0])===0},g,d)}(['@font-face {font-family:"font";src:url("https://")}',["@media (",n.join("touch-enabled),("),h,")","{#touch{top:9px;position:absolute}}"].join(""),["@media (",n.join("transform-3d),("),h,")","{#csstransforms3d{left:9px;position:absolute;height:3px;}}"].join(""),['#generatedcontent:after{content:"',l,'";visibility:hidden}'].join("")],["fontface","touch","csstransforms3d","generatedcontent"]);r.flexbox=function(){return H("flexOrder")},r["flexbox-legacy"]=function(){return H("boxDirection")},r.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")},r.canvastext=function(){return!!e.canvas&&!!D(b.createElement("canvas").getContext("2d").fillText,"function")},r.touch=function(){return e.touch},r.geolocation=function(){return!!navigator.geolocation},r.postmessage=function(){return!!a.postMessage},r.indexedDB=function(){return!!H("indexedDB",a)},r.hashchange=function(){return y("hashchange",a)&&(b.documentMode===c||b.documentMode>7)},r.history=function(){return!!a.history&&!!history.pushState},r.draganddrop=function(){var a=b.createElement("div");return"draggable"in a||"ondragstart"in a&&"ondrop"in a},r.rgba=function(){return B("background-color:rgba(150,255,150,.5)"),E(j.backgroundColor,"rgba")},r.hsla=function(){return B("background-color:hsla(120,40%,100%,.5)"),E(j.backgroundColor,"rgba")||E(j.backgroundColor,"hsla")},r.multiplebgs=function(){return B("background:url(https://),url(https://),red url(https://)"),/(url\s*\(.*?){3}/.test(j.background)},r.backgroundsize=function(){return H("backgroundSize")},r.borderimage=function(){return H("borderImage")},r.borderradius=function(){return H("borderRadius")},r.boxshadow=function(){return H("boxShadow")},r.textshadow=function(){return b.createElement("div").style.textShadow===""},r.opacity=function(){return C("opacity:.55"),/^0.55$/.test(j.opacity)},r.cssanimations=function(){return H("animationName")},r.csscolumns=function(){return H("columnCount")},r.cssgradients=function(){var a="background-image:",b="gradient(linear,left top,right bottom,from(#9f9),to(white));",c="linear-gradient(left top,#9f9, white);";return B((a+"-webkit- ".split(" ").join(b+a)+n.join(c+a)).slice(0,-a.length)),E(j.backgroundImage,"gradient")},r.cssreflections=function(){return H("boxReflect")},r.csstransforms=function(){return!!H("transform")},r.csstransforms3d=function(){var a=!!H("perspective");return a&&"webkitPerspective"in g.style&&(a=e.csstransforms3d),a},r.csstransitions=function(){return H("transition")},r.fontface=function(){return e.fontface},r.generatedcontent=function(){return e.generatedcontent},r.video=function(){var a=b.createElement("video"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),c.h264=a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),c.webm=a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,"")}catch(d){}return c},r.audio=function(){var a=b.createElement("audio"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),c.mp3=a.canPlayType("audio/mpeg;").replace(/^no$/,""),c.wav=a.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),c.m4a=(a.canPlayType("audio/x-m4a;")||a.canPlayType("audio/aac;")).replace(/^no$/,"")}catch(d){}return c},r.localstorage=function(){try{return localStorage.setItem(h,h),localStorage.removeItem(h),!0}catch(a){return!1}},r.sessionstorage=function(){try{return sessionStorage.setItem(h,h),sessionStorage.removeItem(h),!0}catch(a){return!1}},r.applicationcache=function(){return!!a.applicationCache};for(var K in r)A(r,K)&&(w=K.toLowerCase(),e[w]=r[K](),u.push((e[w]?"":"no-")+w));return e.input||J(),B(""),i=k=null,e._version=d,e._prefixes=n,e._domPrefixes=q,e._cssomPrefixes=p,e.hasEvent=y,e.testProp=function(a){return F([a])},e.testAllProps=H,e.testStyles=x,e.prefixed=function(a,b,c){return b?H(a,b,c):H(a,"pfx")},g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+u.join(" "):""),e}(this,this.document);


/*! jQuery v1.11.1 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k={},l="1.11.1",m=function(a,b){return new m.fn.init(a,b)},n=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,o=/^-ms-/,p=/-([\da-z])/gi,q=function(a,b){return b.toUpperCase()};m.fn=m.prototype={jquery:l,constructor:m,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=m.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return m.each(this,a,b)},map:function(a){return this.pushStack(m.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},m.extend=m.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||m.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(e=arguments[h]))for(d in e)a=g[d],c=e[d],g!==c&&(j&&c&&(m.isPlainObject(c)||(b=m.isArray(c)))?(b?(b=!1,f=a&&m.isArray(a)?a:[]):f=a&&m.isPlainObject(a)?a:{},g[d]=m.extend(j,f,c)):void 0!==c&&(g[d]=c));return g},m.extend({expando:"jQuery"+(l+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===m.type(a)},isArray:Array.isArray||function(a){return"array"===m.type(a)},isWindow:function(a){return null!=a&&a==a.window},isNumeric:function(a){return!m.isArray(a)&&a-parseFloat(a)>=0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},isPlainObject:function(a){var b;if(!a||"object"!==m.type(a)||a.nodeType||m.isWindow(a))return!1;try{if(a.constructor&&!j.call(a,"constructor")&&!j.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}if(k.ownLast)for(b in a)return j.call(a,b);for(b in a);return void 0===b||j.call(a,b)},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(b){b&&m.trim(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(o,"ms-").replace(p,q)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=r(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(n,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(r(Object(a))?m.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){var d;if(b){if(g)return g.call(b,a,c);for(d=b.length,c=c?0>c?Math.max(0,d+c):c:0;d>c;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,b){var c=+b.length,d=0,e=a.length;while(c>d)a[e++]=b[d++];if(c!==c)while(void 0!==b[d])a[e++]=b[d++];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=r(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(f=a[b],b=a,a=f),m.isFunction(a)?(c=d.call(arguments,2),e=function(){return a.apply(b||this,c.concat(d.call(arguments)))},e.guid=a.guid=a.guid||m.guid++,e):void 0},now:function(){return+new Date},support:k}),m.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function r(a){var b=a.length,c=m.type(a);return"function"===c||m.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var s=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+-new Date,v=a.document,w=0,x=0,y=gb(),z=gb(),A=gb(),B=function(a,b){return a===b&&(l=!0),0},C="undefined",D=1<<31,E={}.hasOwnProperty,F=[],G=F.pop,H=F.push,I=F.push,J=F.slice,K=F.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},L="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",N="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",O=N.replace("w","w#"),P="\\["+M+"*("+N+")(?:"+M+"*([*^$|!~]?=)"+M+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+O+"))|)"+M+"*\\]",Q=":("+N+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+P+")*)|.*)\\)|)",R=new RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),S=new RegExp("^"+M+"*,"+M+"*"),T=new RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),U=new RegExp("="+M+"*([^\\]'\"]*?)"+M+"*\\]","g"),V=new RegExp(Q),W=new RegExp("^"+O+"$"),X={ID:new RegExp("^#("+N+")"),CLASS:new RegExp("^\\.("+N+")"),TAG:new RegExp("^("+N.replace("w","w*")+")"),ATTR:new RegExp("^"+P),PSEUDO:new RegExp("^"+Q),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:new RegExp("^(?:"+L+")$","i"),needsContext:new RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},Y=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,$=/^[^{]+\{\s*\[native \w/,_=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ab=/[+~]/,bb=/'|\\/g,cb=new RegExp("\\\\([\\da-f]{1,6}"+M+"?|("+M+")|.)","ig"),db=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)};try{I.apply(F=J.call(v.childNodes),v.childNodes),F[v.childNodes.length].nodeType}catch(eb){I={apply:F.length?function(a,b){H.apply(a,J.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function fb(a,b,d,e){var f,h,j,k,l,o,r,s,w,x;if((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,d=d||[],!a||"string"!=typeof a)return d;if(1!==(k=b.nodeType)&&9!==k)return[];if(p&&!e){if(f=_.exec(a))if(j=f[1]){if(9===k){if(h=b.getElementById(j),!h||!h.parentNode)return d;if(h.id===j)return d.push(h),d}else if(b.ownerDocument&&(h=b.ownerDocument.getElementById(j))&&t(b,h)&&h.id===j)return d.push(h),d}else{if(f[2])return I.apply(d,b.getElementsByTagName(a)),d;if((j=f[3])&&c.getElementsByClassName&&b.getElementsByClassName)return I.apply(d,b.getElementsByClassName(j)),d}if(c.qsa&&(!q||!q.test(a))){if(s=r=u,w=b,x=9===k&&a,1===k&&"object"!==b.nodeName.toLowerCase()){o=g(a),(r=b.getAttribute("id"))?s=r.replace(bb,"\\$&"):b.setAttribute("id",s),s="[id='"+s+"'] ",l=o.length;while(l--)o[l]=s+qb(o[l]);w=ab.test(a)&&ob(b.parentNode)||b,x=o.join(",")}if(x)try{return I.apply(d,w.querySelectorAll(x)),d}catch(y){}finally{r||b.removeAttribute("id")}}}return i(a.replace(R,"$1"),b,d,e)}function gb(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function hb(a){return a[u]=!0,a}function ib(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function jb(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function kb(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||D)-(~a.sourceIndex||D);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function lb(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function mb(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function nb(a){return hb(function(b){return b=+b,hb(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function ob(a){return a&&typeof a.getElementsByTagName!==C&&a}c=fb.support={},f=fb.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=fb.setDocument=function(a){var b,e=a?a.ownerDocument||a:v,g=e.defaultView;return e!==n&&9===e.nodeType&&e.documentElement?(n=e,o=e.documentElement,p=!f(e),g&&g!==g.top&&(g.addEventListener?g.addEventListener("unload",function(){m()},!1):g.attachEvent&&g.attachEvent("onunload",function(){m()})),c.attributes=ib(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ib(function(a){return a.appendChild(e.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=$.test(e.getElementsByClassName)&&ib(function(a){return a.innerHTML="<div class='a'></div><div class='a i'></div>",a.firstChild.className="i",2===a.getElementsByClassName("i").length}),c.getById=ib(function(a){return o.appendChild(a).id=u,!e.getElementsByName||!e.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if(typeof b.getElementById!==C&&p){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){var c=typeof a.getAttributeNode!==C&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return typeof b.getElementsByTagName!==C?b.getElementsByTagName(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return typeof b.getElementsByClassName!==C&&p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=$.test(e.querySelectorAll))&&(ib(function(a){a.innerHTML="<select msallowclip=''><option selected=''></option></select>",a.querySelectorAll("[msallowclip^='']").length&&q.push("[*^$]="+M+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+M+"*(?:value|"+L+")"),a.querySelectorAll(":checked").length||q.push(":checked")}),ib(function(a){var b=e.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+M+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=$.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ib(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",Q)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=$.test(o.compareDocumentPosition),t=b||$.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===e||a.ownerDocument===v&&t(v,a)?-1:b===e||b.ownerDocument===v&&t(v,b)?1:k?K.call(k,a)-K.call(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,f=a.parentNode,g=b.parentNode,h=[a],i=[b];if(!f||!g)return a===e?-1:b===e?1:f?-1:g?1:k?K.call(k,a)-K.call(k,b):0;if(f===g)return kb(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?kb(h[d],i[d]):h[d]===v?-1:i[d]===v?1:0},e):n},fb.matches=function(a,b){return fb(a,null,null,b)},fb.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(U,"='$1']"),!(!c.matchesSelector||!p||r&&r.test(b)||q&&q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return fb(b,n,null,[a]).length>0},fb.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},fb.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&E.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},fb.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},fb.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=fb.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=fb.selectors={cacheLength:50,createPseudo:hb,match:X,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(cb,db),a[3]=(a[3]||a[4]||a[5]||"").replace(cb,db),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||fb.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&fb.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return X.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&V.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(cb,db).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+M+")"+a+"("+M+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||typeof a.getAttribute!==C&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=fb.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[u]||(q[u]={}),j=k[a]||[],n=j[0]===w&&j[1],m=j[0]===w&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[w,n,m];break}}else if(s&&(j=(b[u]||(b[u]={}))[a])&&j[0]===w)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[u]||(l[u]={}))[a]=[w,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||fb.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?hb(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=K.call(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:hb(function(a){var b=[],c=[],d=h(a.replace(R,"$1"));return d[u]?hb(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),!c.pop()}}),has:hb(function(a){return function(b){return fb(a,b).length>0}}),contains:hb(function(a){return function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:hb(function(a){return W.test(a||"")||fb.error("unsupported lang: "+a),a=a.replace(cb,db).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Z.test(a.nodeName)},input:function(a){return Y.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:nb(function(){return[0]}),last:nb(function(a,b){return[b-1]}),eq:nb(function(a,b,c){return[0>c?c+b:c]}),even:nb(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:nb(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:nb(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:nb(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=lb(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=mb(b);function pb(){}pb.prototype=d.filters=d.pseudos,d.setFilters=new pb,g=fb.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=S.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=T.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(R," ")}),h=h.slice(c.length));for(g in d.filter)!(e=X[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?fb.error(a):z(a,i).slice(0)};function qb(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function rb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[u]||(b[u]={}),(h=i[d])&&h[0]===w&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function sb(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function tb(a,b,c){for(var d=0,e=b.length;e>d;d++)fb(a,b[d],c);return c}function ub(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function vb(a,b,c,d,e,f){return d&&!d[u]&&(d=vb(d)),e&&!e[u]&&(e=vb(e,f)),hb(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||tb(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:ub(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=ub(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?K.call(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=ub(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):I.apply(g,r)})}function wb(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=rb(function(a){return a===b},h,!0),l=rb(function(a){return K.call(b,a)>-1},h,!0),m=[function(a,c,d){return!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d))}];f>i;i++)if(c=d.relative[a[i].type])m=[rb(sb(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return vb(i>1&&sb(m),i>1&&qb(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(R,"$1"),c,e>i&&wb(a.slice(i,e)),f>e&&wb(a=a.slice(e)),f>e&&qb(a))}m.push(c)}return sb(m)}function xb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,m,o,p=0,q="0",r=f&&[],s=[],t=j,u=f||e&&d.find.TAG("*",k),v=w+=null==t?1:Math.random()||.1,x=u.length;for(k&&(j=g!==n&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){m=0;while(o=a[m++])if(o(l,g,h)){i.push(l);break}k&&(w=v)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){m=0;while(o=b[m++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=G.call(i));s=ub(s)}I.apply(i,s),k&&!f&&s.length>0&&p+b.length>1&&fb.uniqueSort(i)}return k&&(w=v,j=t),r};return c?hb(f):f}return h=fb.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=wb(b[c]),f[u]?d.push(f):e.push(f);f=A(a,xb(e,d)),f.selector=a}return f},i=fb.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(cb,db),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=X.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(cb,db),ab.test(j[0].type)&&ob(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&qb(j),!a)return I.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,ab.test(a)&&ob(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ib(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ib(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||jb("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ib(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||jb("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ib(function(a){return null==a.getAttribute("disabled")})||jb(L,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),fb}(a);m.find=s,m.expr=s.selectors,m.expr[":"]=m.expr.pseudos,m.unique=s.uniqueSort,m.text=s.getText,m.isXMLDoc=s.isXML,m.contains=s.contains;var t=m.expr.match.needsContext,u=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,v=/^.[^:#\[\.,]*$/;function w(a,b,c){if(m.isFunction(b))return m.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return m.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(v.test(b))return m.filter(b,a,c);b=m.filter(b,a)}return m.grep(a,function(a){return m.inArray(a,b)>=0!==c})}m.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?m.find.matchesSelector(d,a)?[d]:[]:m.find.matches(a,m.grep(b,function(a){return 1===a.nodeType}))},m.fn.extend({find:function(a){var b,c=[],d=this,e=d.length;if("string"!=typeof a)return this.pushStack(m(a).filter(function(){for(b=0;e>b;b++)if(m.contains(d[b],this))return!0}));for(b=0;e>b;b++)m.find(a,d[b],c);return c=this.pushStack(e>1?m.unique(c):c),c.selector=this.selector?this.selector+" "+a:a,c},filter:function(a){return this.pushStack(w(this,a||[],!1))},not:function(a){return this.pushStack(w(this,a||[],!0))},is:function(a){return!!w(this,"string"==typeof a&&t.test(a)?m(a):a||[],!1).length}});var x,y=a.document,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=m.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a.charAt(0)&&">"===a.charAt(a.length-1)&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||x).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof m?b[0]:b,m.merge(this,m.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:y,!0)),u.test(c[1])&&m.isPlainObject(b))for(c in b)m.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}if(d=y.getElementById(c[2]),d&&d.parentNode){if(d.id!==c[2])return x.find(a);this.length=1,this[0]=d}return this.context=y,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):m.isFunction(a)?"undefined"!=typeof x.ready?x.ready(a):a(m):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),m.makeArray(a,this))};A.prototype=m.fn,x=m(y);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};m.extend({dir:function(a,b,c){var d=[],e=a[b];while(e&&9!==e.nodeType&&(void 0===c||1!==e.nodeType||!m(e).is(c)))1===e.nodeType&&d.push(e),e=e[b];return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),m.fn.extend({has:function(a){var b,c=m(a,this),d=c.length;return this.filter(function(){for(b=0;d>b;b++)if(m.contains(this,c[b]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=t.test(a)||"string"!=typeof a?m(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&m.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?m.unique(f):f)},index:function(a){return a?"string"==typeof a?m.inArray(this[0],m(a)):m.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(m.unique(m.merge(this.get(),m(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){do a=a[b];while(a&&1!==a.nodeType);return a}m.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return m.dir(a,"parentNode")},parentsUntil:function(a,b,c){return m.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return m.dir(a,"nextSibling")},prevAll:function(a){return m.dir(a,"previousSibling")},nextUntil:function(a,b,c){return m.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return m.dir(a,"previousSibling",c)},siblings:function(a){return m.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return m.sibling(a.firstChild)},contents:function(a){return m.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:m.merge([],a.childNodes)}},function(a,b){m.fn[a]=function(c,d){var e=m.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=m.filter(d,e)),this.length>1&&(C[a]||(e=m.unique(e)),B.test(a)&&(e=e.reverse())),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return m.each(a.match(E)||[],function(a,c){b[c]=!0}),b}m.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):m.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(c=a.memory&&l,d=!0,f=g||0,g=0,e=h.length,b=!0;h&&e>f;f++)if(h[f].apply(l[0],l[1])===!1&&a.stopOnFalse){c=!1;break}b=!1,h&&(i?i.length&&j(i.shift()):c?h=[]:k.disable())},k={add:function(){if(h){var d=h.length;!function f(b){m.each(b,function(b,c){var d=m.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&f(c)})}(arguments),b?e=h.length:c&&(g=d,j(c))}return this},remove:function(){return h&&m.each(arguments,function(a,c){var d;while((d=m.inArray(c,h,d))>-1)h.splice(d,1),b&&(e>=d&&e--,f>=d&&f--)}),this},has:function(a){return a?m.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],e=0,this},disable:function(){return h=i=c=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,c||k.disable(),this},locked:function(){return!i},fireWith:function(a,c){return!h||d&&!i||(c=c||[],c=[a,c.slice?c.slice():c],b?i.push(c):j(c)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!d}};return k},m.extend({Deferred:function(a){var b=[["resolve","done",m.Callbacks("once memory"),"resolved"],["reject","fail",m.Callbacks("once memory"),"rejected"],["notify","progress",m.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return m.Deferred(function(c){m.each(b,function(b,f){var g=m.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&m.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?m.extend(a,d):d}},e={};return d.pipe=d.then,m.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&m.isFunction(a.promise)?e:0,g=1===f?a:m.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&m.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;m.fn.ready=function(a){return m.ready.promise().done(a),this},m.extend({isReady:!1,readyWait:1,holdReady:function(a){a?m.readyWait++:m.ready(!0)},ready:function(a){if(a===!0?!--m.readyWait:!m.isReady){if(!y.body)return setTimeout(m.ready);m.isReady=!0,a!==!0&&--m.readyWait>0||(H.resolveWith(y,[m]),m.fn.triggerHandler&&(m(y).triggerHandler("ready"),m(y).off("ready")))}}});function I(){y.addEventListener?(y.removeEventListener("DOMContentLoaded",J,!1),a.removeEventListener("load",J,!1)):(y.detachEvent("onreadystatechange",J),a.detachEvent("onload",J))}function J(){(y.addEventListener||"load"===event.type||"complete"===y.readyState)&&(I(),m.ready())}m.ready.promise=function(b){if(!H)if(H=m.Deferred(),"complete"===y.readyState)setTimeout(m.ready);else if(y.addEventListener)y.addEventListener("DOMContentLoaded",J,!1),a.addEventListener("load",J,!1);else{y.attachEvent("onreadystatechange",J),a.attachEvent("onload",J);var c=!1;try{c=null==a.frameElement&&y.documentElement}catch(d){}c&&c.doScroll&&!function e(){if(!m.isReady){try{c.doScroll("left")}catch(a){return setTimeout(e,50)}I(),m.ready()}}()}return H.promise(b)};var K="undefined",L;for(L in m(k))break;k.ownLast="0"!==L,k.inlineBlockNeedsLayout=!1,m(function(){var a,b,c,d;c=y.getElementsByTagName("body")[0],c&&c.style&&(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),typeof b.style.zoom!==K&&(b.style.cssText="display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",k.inlineBlockNeedsLayout=a=3===b.offsetWidth,a&&(c.style.zoom=1)),c.removeChild(d))}),function(){var a=y.createElement("div");if(null==k.deleteExpando){k.deleteExpando=!0;try{delete a.test}catch(b){k.deleteExpando=!1}}a=null}(),m.acceptData=function(a){var b=m.noData[(a.nodeName+" ").toLowerCase()],c=+a.nodeType||1;return 1!==c&&9!==c?!1:!b||b!==!0&&a.getAttribute("classid")===b};var M=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,N=/([A-Z])/g;function O(a,b,c){if(void 0===c&&1===a.nodeType){var d="data-"+b.replace(N,"-$1").toLowerCase();if(c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:M.test(c)?m.parseJSON(c):c}catch(e){}m.data(a,b,c)}else c=void 0}return c}function P(a){var b;for(b in a)if(("data"!==b||!m.isEmptyObject(a[b]))&&"toJSON"!==b)return!1;return!0}function Q(a,b,d,e){if(m.acceptData(a)){var f,g,h=m.expando,i=a.nodeType,j=i?m.cache:a,k=i?a[h]:a[h]&&h;
if(k&&j[k]&&(e||j[k].data)||void 0!==d||"string"!=typeof b)return k||(k=i?a[h]=c.pop()||m.guid++:h),j[k]||(j[k]=i?{}:{toJSON:m.noop}),("object"==typeof b||"function"==typeof b)&&(e?j[k]=m.extend(j[k],b):j[k].data=m.extend(j[k].data,b)),g=j[k],e||(g.data||(g.data={}),g=g.data),void 0!==d&&(g[m.camelCase(b)]=d),"string"==typeof b?(f=g[b],null==f&&(f=g[m.camelCase(b)])):f=g,f}}function R(a,b,c){if(m.acceptData(a)){var d,e,f=a.nodeType,g=f?m.cache:a,h=f?a[m.expando]:m.expando;if(g[h]){if(b&&(d=c?g[h]:g[h].data)){m.isArray(b)?b=b.concat(m.map(b,m.camelCase)):b in d?b=[b]:(b=m.camelCase(b),b=b in d?[b]:b.split(" ")),e=b.length;while(e--)delete d[b[e]];if(c?!P(d):!m.isEmptyObject(d))return}(c||(delete g[h].data,P(g[h])))&&(f?m.cleanData([a],!0):k.deleteExpando||g!=g.window?delete g[h]:g[h]=null)}}}m.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(a){return a=a.nodeType?m.cache[a[m.expando]]:a[m.expando],!!a&&!P(a)},data:function(a,b,c){return Q(a,b,c)},removeData:function(a,b){return R(a,b)},_data:function(a,b,c){return Q(a,b,c,!0)},_removeData:function(a,b){return R(a,b,!0)}}),m.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=m.data(f),1===f.nodeType&&!m._data(f,"parsedAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=m.camelCase(d.slice(5)),O(f,d,e[d])));m._data(f,"parsedAttrs",!0)}return e}return"object"==typeof a?this.each(function(){m.data(this,a)}):arguments.length>1?this.each(function(){m.data(this,a,b)}):f?O(f,a,m.data(f,a)):void 0},removeData:function(a){return this.each(function(){m.removeData(this,a)})}}),m.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=m._data(a,b),c&&(!d||m.isArray(c)?d=m._data(a,b,m.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=m.queue(a,b),d=c.length,e=c.shift(),f=m._queueHooks(a,b),g=function(){m.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return m._data(a,c)||m._data(a,c,{empty:m.Callbacks("once memory").add(function(){m._removeData(a,b+"queue"),m._removeData(a,c)})})}}),m.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?m.queue(this[0],a):void 0===b?this:this.each(function(){var c=m.queue(this,a,b);m._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&m.dequeue(this,a)})},dequeue:function(a){return this.each(function(){m.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=m.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=m._data(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var S=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,T=["Top","Right","Bottom","Left"],U=function(a,b){return a=b||a,"none"===m.css(a,"display")||!m.contains(a.ownerDocument,a)},V=m.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===m.type(c)){e=!0;for(h in c)m.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,m.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(m(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},W=/^(?:checkbox|radio)$/i;!function(){var a=y.createElement("input"),b=y.createElement("div"),c=y.createDocumentFragment();if(b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",k.leadingWhitespace=3===b.firstChild.nodeType,k.tbody=!b.getElementsByTagName("tbody").length,k.htmlSerialize=!!b.getElementsByTagName("link").length,k.html5Clone="<:nav></:nav>"!==y.createElement("nav").cloneNode(!0).outerHTML,a.type="checkbox",a.checked=!0,c.appendChild(a),k.appendChecked=a.checked,b.innerHTML="<textarea>x</textarea>",k.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue,c.appendChild(b),b.innerHTML="<input type='radio' checked='checked' name='t'/>",k.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,k.noCloneEvent=!0,b.attachEvent&&(b.attachEvent("onclick",function(){k.noCloneEvent=!1}),b.cloneNode(!0).click()),null==k.deleteExpando){k.deleteExpando=!0;try{delete b.test}catch(d){k.deleteExpando=!1}}}(),function(){var b,c,d=y.createElement("div");for(b in{submit:!0,change:!0,focusin:!0})c="on"+b,(k[b+"Bubbles"]=c in a)||(d.setAttribute(c,"t"),k[b+"Bubbles"]=d.attributes[c].expando===!1);d=null}();var X=/^(?:input|select|textarea)$/i,Y=/^key/,Z=/^(?:mouse|pointer|contextmenu)|click/,$=/^(?:focusinfocus|focusoutblur)$/,_=/^([^.]*)(?:\.(.+)|)$/;function ab(){return!0}function bb(){return!1}function cb(){try{return y.activeElement}catch(a){}}m.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,n,o,p,q,r=m._data(a);if(r){c.handler&&(i=c,c=i.handler,e=i.selector),c.guid||(c.guid=m.guid++),(g=r.events)||(g=r.events={}),(k=r.handle)||(k=r.handle=function(a){return typeof m===K||a&&m.event.triggered===a.type?void 0:m.event.dispatch.apply(k.elem,arguments)},k.elem=a),b=(b||"").match(E)||[""],h=b.length;while(h--)f=_.exec(b[h])||[],o=q=f[1],p=(f[2]||"").split(".").sort(),o&&(j=m.event.special[o]||{},o=(e?j.delegateType:j.bindType)||o,j=m.event.special[o]||{},l=m.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&m.expr.match.needsContext.test(e),namespace:p.join(".")},i),(n=g[o])||(n=g[o]=[],n.delegateCount=0,j.setup&&j.setup.call(a,d,p,k)!==!1||(a.addEventListener?a.addEventListener(o,k,!1):a.attachEvent&&a.attachEvent("on"+o,k))),j.add&&(j.add.call(a,l),l.handler.guid||(l.handler.guid=c.guid)),e?n.splice(n.delegateCount++,0,l):n.push(l),m.event.global[o]=!0);a=null}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,n,o,p,q,r=m.hasData(a)&&m._data(a);if(r&&(k=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=_.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=m.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,n=k[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),i=f=n.length;while(f--)g=n[f],!e&&q!==g.origType||c&&c.guid!==g.guid||h&&!h.test(g.namespace)||d&&d!==g.selector&&("**"!==d||!g.selector)||(n.splice(f,1),g.selector&&n.delegateCount--,l.remove&&l.remove.call(a,g));i&&!n.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||m.removeEvent(a,o,r.handle),delete k[o])}else for(o in k)m.event.remove(a,o+b[j],c,d,!0);m.isEmptyObject(k)&&(delete r.handle,m._removeData(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,l,n,o=[d||y],p=j.call(b,"type")?b.type:b,q=j.call(b,"namespace")?b.namespace.split("."):[];if(h=l=d=d||y,3!==d.nodeType&&8!==d.nodeType&&!$.test(p+m.event.triggered)&&(p.indexOf(".")>=0&&(q=p.split("."),p=q.shift(),q.sort()),g=p.indexOf(":")<0&&"on"+p,b=b[m.expando]?b:new m.Event(p,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=q.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+q.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:m.makeArray(c,[b]),k=m.event.special[p]||{},e||!k.trigger||k.trigger.apply(d,c)!==!1)){if(!e&&!k.noBubble&&!m.isWindow(d)){for(i=k.delegateType||p,$.test(i+p)||(h=h.parentNode);h;h=h.parentNode)o.push(h),l=h;l===(d.ownerDocument||y)&&o.push(l.defaultView||l.parentWindow||a)}n=0;while((h=o[n++])&&!b.isPropagationStopped())b.type=n>1?i:k.bindType||p,f=(m._data(h,"events")||{})[b.type]&&m._data(h,"handle"),f&&f.apply(h,c),f=g&&h[g],f&&f.apply&&m.acceptData(h)&&(b.result=f.apply(h,c),b.result===!1&&b.preventDefault());if(b.type=p,!e&&!b.isDefaultPrevented()&&(!k._default||k._default.apply(o.pop(),c)===!1)&&m.acceptData(d)&&g&&d[p]&&!m.isWindow(d)){l=d[g],l&&(d[g]=null),m.event.triggered=p;try{d[p]()}catch(r){}m.event.triggered=void 0,l&&(d[g]=l)}return b.result}},dispatch:function(a){a=m.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(m._data(this,"events")||{})[a.type]||[],k=m.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=m.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,g=0;while((e=f.handlers[g++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(e.namespace))&&(a.handleObj=e,a.data=e.data,c=((m.event.special[e.origType]||{}).handle||e.handler).apply(f.elem,i),void 0!==c&&(a.result=c)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!=this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(e=[],f=0;h>f;f++)d=b[f],c=d.selector+" ",void 0===e[c]&&(e[c]=d.needsContext?m(c,this).index(i)>=0:m.find(c,this,null,[i]).length),e[c]&&e.push(d);e.length&&g.push({elem:i,handlers:e})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},fix:function(a){if(a[m.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=Z.test(e)?this.mouseHooks:Y.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new m.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=f.srcElement||y),3===a.target.nodeType&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,g.filter?g.filter(a,f):a},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button,g=b.fromElement;return null==a.pageX&&null!=b.clientX&&(d=a.target.ownerDocument||y,e=d.documentElement,c=d.body,a.pageX=b.clientX+(e&&e.scrollLeft||c&&c.scrollLeft||0)-(e&&e.clientLeft||c&&c.clientLeft||0),a.pageY=b.clientY+(e&&e.scrollTop||c&&c.scrollTop||0)-(e&&e.clientTop||c&&c.clientTop||0)),!a.relatedTarget&&g&&(a.relatedTarget=g===a.target?b.toElement:g),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==cb()&&this.focus)try{return this.focus(),!1}catch(a){}},delegateType:"focusin"},blur:{trigger:function(){return this===cb()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return m.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0},_default:function(a){return m.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=m.extend(new m.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?m.event.trigger(e,null,b):m.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},m.removeEvent=y.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){var d="on"+b;a.detachEvent&&(typeof a[d]===K&&(a[d]=null),a.detachEvent(d,c))},m.Event=function(a,b){return this instanceof m.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?ab:bb):this.type=a,b&&m.extend(this,b),this.timeStamp=a&&a.timeStamp||m.now(),void(this[m.expando]=!0)):new m.Event(a,b)},m.Event.prototype={isDefaultPrevented:bb,isPropagationStopped:bb,isImmediatePropagationStopped:bb,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=ab,a&&(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=ab,a&&(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=ab,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},m.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){m.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!m.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),k.submitBubbles||(m.event.special.submit={setup:function(){return m.nodeName(this,"form")?!1:void m.event.add(this,"click._submit keypress._submit",function(a){var b=a.target,c=m.nodeName(b,"input")||m.nodeName(b,"button")?b.form:void 0;c&&!m._data(c,"submitBubbles")&&(m.event.add(c,"submit._submit",function(a){a._submit_bubble=!0}),m._data(c,"submitBubbles",!0))})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&m.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){return m.nodeName(this,"form")?!1:void m.event.remove(this,"._submit")}}),k.changeBubbles||(m.event.special.change={setup:function(){return X.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(m.event.add(this,"propertychange._change",function(a){"checked"===a.originalEvent.propertyName&&(this._just_changed=!0)}),m.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1),m.event.simulate("change",this,a,!0)})),!1):void m.event.add(this,"beforeactivate._change",function(a){var b=a.target;X.test(b.nodeName)&&!m._data(b,"changeBubbles")&&(m.event.add(b,"change._change",function(a){!this.parentNode||a.isSimulated||a.isTrigger||m.event.simulate("change",this.parentNode,a,!0)}),m._data(b,"changeBubbles",!0))})},handle:function(a){var b=a.target;return this!==b||a.isSimulated||a.isTrigger||"radio"!==b.type&&"checkbox"!==b.type?a.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return m.event.remove(this,"._change"),!X.test(this.nodeName)}}),k.focusinBubbles||m.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){m.event.simulate(b,a.target,m.event.fix(a),!0)};m.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=m._data(d,b);e||d.addEventListener(a,c,!0),m._data(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=m._data(d,b)-1;e?m._data(d,b,e):(d.removeEventListener(a,c,!0),m._removeData(d,b))}}}),m.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(f in a)this.on(f,b,c,a[f],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=bb;else if(!d)return this;return 1===e&&(g=d,d=function(a){return m().off(a),g.apply(this,arguments)},d.guid=g.guid||(g.guid=m.guid++)),this.each(function(){m.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,m(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=bb),this.each(function(){m.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){m.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?m.event.trigger(a,b,c,!0):void 0}});function db(a){var b=eb.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}var eb="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",fb=/ jQuery\d+="(?:null|\d+)"/g,gb=new RegExp("<(?:"+eb+")[\\s/>]","i"),hb=/^\s+/,ib=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,jb=/<([\w:]+)/,kb=/<tbody/i,lb=/<|&#?\w+;/,mb=/<(?:script|style|link)/i,nb=/checked\s*(?:[^=]|=\s*.checked.)/i,ob=/^$|\/(?:java|ecma)script/i,pb=/^true\/(.*)/,qb=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,rb={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:k.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},sb=db(y),tb=sb.appendChild(y.createElement("div"));rb.optgroup=rb.option,rb.tbody=rb.tfoot=rb.colgroup=rb.caption=rb.thead,rb.th=rb.td;function ub(a,b){var c,d,e=0,f=typeof a.getElementsByTagName!==K?a.getElementsByTagName(b||"*"):typeof a.querySelectorAll!==K?a.querySelectorAll(b||"*"):void 0;if(!f)for(f=[],c=a.childNodes||a;null!=(d=c[e]);e++)!b||m.nodeName(d,b)?f.push(d):m.merge(f,ub(d,b));return void 0===b||b&&m.nodeName(a,b)?m.merge([a],f):f}function vb(a){W.test(a.type)&&(a.defaultChecked=a.checked)}function wb(a,b){return m.nodeName(a,"table")&&m.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function xb(a){return a.type=(null!==m.find.attr(a,"type"))+"/"+a.type,a}function yb(a){var b=pb.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function zb(a,b){for(var c,d=0;null!=(c=a[d]);d++)m._data(c,"globalEval",!b||m._data(b[d],"globalEval"))}function Ab(a,b){if(1===b.nodeType&&m.hasData(a)){var c,d,e,f=m._data(a),g=m._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;e>d;d++)m.event.add(b,c,h[c][d])}g.data&&(g.data=m.extend({},g.data))}}function Bb(a,b){var c,d,e;if(1===b.nodeType){if(c=b.nodeName.toLowerCase(),!k.noCloneEvent&&b[m.expando]){e=m._data(b);for(d in e.events)m.removeEvent(b,d,e.handle);b.removeAttribute(m.expando)}"script"===c&&b.text!==a.text?(xb(b).text=a.text,yb(b)):"object"===c?(b.parentNode&&(b.outerHTML=a.outerHTML),k.html5Clone&&a.innerHTML&&!m.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):"input"===c&&W.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):"option"===c?b.defaultSelected=b.selected=a.defaultSelected:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}}m.extend({clone:function(a,b,c){var d,e,f,g,h,i=m.contains(a.ownerDocument,a);if(k.html5Clone||m.isXMLDoc(a)||!gb.test("<"+a.nodeName+">")?f=a.cloneNode(!0):(tb.innerHTML=a.outerHTML,tb.removeChild(f=tb.firstChild)),!(k.noCloneEvent&&k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||m.isXMLDoc(a)))for(d=ub(f),h=ub(a),g=0;null!=(e=h[g]);++g)d[g]&&Bb(e,d[g]);if(b)if(c)for(h=h||ub(a),d=d||ub(f),g=0;null!=(e=h[g]);g++)Ab(e,d[g]);else Ab(a,f);return d=ub(f,"script"),d.length>0&&zb(d,!i&&ub(a,"script")),d=h=e=null,f},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,l,n=a.length,o=db(b),p=[],q=0;n>q;q++)if(f=a[q],f||0===f)if("object"===m.type(f))m.merge(p,f.nodeType?[f]:f);else if(lb.test(f)){h=h||o.appendChild(b.createElement("div")),i=(jb.exec(f)||["",""])[1].toLowerCase(),l=rb[i]||rb._default,h.innerHTML=l[1]+f.replace(ib,"<$1></$2>")+l[2],e=l[0];while(e--)h=h.lastChild;if(!k.leadingWhitespace&&hb.test(f)&&p.push(b.createTextNode(hb.exec(f)[0])),!k.tbody){f="table"!==i||kb.test(f)?"<table>"!==l[1]||kb.test(f)?0:h:h.firstChild,e=f&&f.childNodes.length;while(e--)m.nodeName(j=f.childNodes[e],"tbody")&&!j.childNodes.length&&f.removeChild(j)}m.merge(p,h.childNodes),h.textContent="";while(h.firstChild)h.removeChild(h.firstChild);h=o.lastChild}else p.push(b.createTextNode(f));h&&o.removeChild(h),k.appendChecked||m.grep(ub(p,"input"),vb),q=0;while(f=p[q++])if((!d||-1===m.inArray(f,d))&&(g=m.contains(f.ownerDocument,f),h=ub(o.appendChild(f),"script"),g&&zb(h),c)){e=0;while(f=h[e++])ob.test(f.type||"")&&c.push(f)}return h=null,o},cleanData:function(a,b){for(var d,e,f,g,h=0,i=m.expando,j=m.cache,l=k.deleteExpando,n=m.event.special;null!=(d=a[h]);h++)if((b||m.acceptData(d))&&(f=d[i],g=f&&j[f])){if(g.events)for(e in g.events)n[e]?m.event.remove(d,e):m.removeEvent(d,e,g.handle);j[f]&&(delete j[f],l?delete d[i]:typeof d.removeAttribute!==K?d.removeAttribute(i):d[i]=null,c.push(f))}}}),m.fn.extend({text:function(a){return V(this,function(a){return void 0===a?m.text(this):this.empty().append((this[0]&&this[0].ownerDocument||y).createTextNode(a))},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=wb(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=wb(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?m.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||m.cleanData(ub(c)),c.parentNode&&(b&&m.contains(c.ownerDocument,c)&&zb(ub(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++){1===a.nodeType&&m.cleanData(ub(a,!1));while(a.firstChild)a.removeChild(a.firstChild);a.options&&m.nodeName(a,"select")&&(a.options.length=0)}return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return m.clone(this,a,b)})},html:function(a){return V(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a)return 1===b.nodeType?b.innerHTML.replace(fb,""):void 0;if(!("string"!=typeof a||mb.test(a)||!k.htmlSerialize&&gb.test(a)||!k.leadingWhitespace&&hb.test(a)||rb[(jb.exec(a)||["",""])[1].toLowerCase()])){a=a.replace(ib,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(m.cleanData(ub(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,m.cleanData(ub(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,l=this.length,n=this,o=l-1,p=a[0],q=m.isFunction(p);if(q||l>1&&"string"==typeof p&&!k.checkClone&&nb.test(p))return this.each(function(c){var d=n.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(l&&(i=m.buildFragment(a,this[0].ownerDocument,!1,this),c=i.firstChild,1===i.childNodes.length&&(i=c),c)){for(g=m.map(ub(i,"script"),xb),f=g.length;l>j;j++)d=i,j!==o&&(d=m.clone(d,!0,!0),f&&m.merge(g,ub(d,"script"))),b.call(this[j],d,j);if(f)for(h=g[g.length-1].ownerDocument,m.map(g,yb),j=0;f>j;j++)d=g[j],ob.test(d.type||"")&&!m._data(d,"globalEval")&&m.contains(h,d)&&(d.src?m._evalUrl&&m._evalUrl(d.src):m.globalEval((d.text||d.textContent||d.innerHTML||"").replace(qb,"")));i=c=null}return this}}),m.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){m.fn[a]=function(a){for(var c,d=0,e=[],g=m(a),h=g.length-1;h>=d;d++)c=d===h?this:this.clone(!0),m(g[d])[b](c),f.apply(e,c.get());return this.pushStack(e)}});var Cb,Db={};function Eb(b,c){var d,e=m(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:m.css(e[0],"display");return e.detach(),f}function Fb(a){var b=y,c=Db[a];return c||(c=Eb(a,b),"none"!==c&&c||(Cb=(Cb||m("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=(Cb[0].contentWindow||Cb[0].contentDocument).document,b.write(),b.close(),c=Eb(a,b),Cb.detach()),Db[a]=c),c}!function(){var a;k.shrinkWrapBlocks=function(){if(null!=a)return a;a=!1;var b,c,d;return c=y.getElementsByTagName("body")[0],c&&c.style?(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),typeof b.style.zoom!==K&&(b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",b.appendChild(y.createElement("div")).style.width="5px",a=3!==b.offsetWidth),c.removeChild(d),a):void 0}}();var Gb=/^margin/,Hb=new RegExp("^("+S+")(?!px)[a-z%]+$","i"),Ib,Jb,Kb=/^(top|right|bottom|left)$/;a.getComputedStyle?(Ib=function(a){return a.ownerDocument.defaultView.getComputedStyle(a,null)},Jb=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ib(a),g=c?c.getPropertyValue(b)||c[b]:void 0,c&&(""!==g||m.contains(a.ownerDocument,a)||(g=m.style(a,b)),Hb.test(g)&&Gb.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0===g?g:g+""}):y.documentElement.currentStyle&&(Ib=function(a){return a.currentStyle},Jb=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ib(a),g=c?c[b]:void 0,null==g&&h&&h[b]&&(g=h[b]),Hb.test(g)&&!Kb.test(b)&&(d=h.left,e=a.runtimeStyle,f=e&&e.left,f&&(e.left=a.currentStyle.left),h.left="fontSize"===b?"1em":g,g=h.pixelLeft+"px",h.left=d,f&&(e.left=f)),void 0===g?g:g+""||"auto"});function Lb(a,b){return{get:function(){var c=a();if(null!=c)return c?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d,e,f,g,h;if(b=y.createElement("div"),b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",d=b.getElementsByTagName("a")[0],c=d&&d.style){c.cssText="float:left;opacity:.5",k.opacity="0.5"===c.opacity,k.cssFloat=!!c.cssFloat,b.style.backgroundClip="content-box",b.cloneNode(!0).style.backgroundClip="",k.clearCloneStyle="content-box"===b.style.backgroundClip,k.boxSizing=""===c.boxSizing||""===c.MozBoxSizing||""===c.WebkitBoxSizing,m.extend(k,{reliableHiddenOffsets:function(){return null==g&&i(),g},boxSizingReliable:function(){return null==f&&i(),f},pixelPosition:function(){return null==e&&i(),e},reliableMarginRight:function(){return null==h&&i(),h}});function i(){var b,c,d,i;c=y.getElementsByTagName("body")[0],c&&c.style&&(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),b.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",e=f=!1,h=!0,a.getComputedStyle&&(e="1%"!==(a.getComputedStyle(b,null)||{}).top,f="4px"===(a.getComputedStyle(b,null)||{width:"4px"}).width,i=b.appendChild(y.createElement("div")),i.style.cssText=b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",i.style.marginRight=i.style.width="0",b.style.width="1px",h=!parseFloat((a.getComputedStyle(i,null)||{}).marginRight)),b.innerHTML="<table><tr><td></td><td>t</td></tr></table>",i=b.getElementsByTagName("td"),i[0].style.cssText="margin:0;border:0;padding:0;display:none",g=0===i[0].offsetHeight,g&&(i[0].style.display="",i[1].style.display="none",g=0===i[0].offsetHeight),c.removeChild(d))}}}(),m.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var Mb=/alpha\([^)]*\)/i,Nb=/opacity\s*=\s*([^)]*)/,Ob=/^(none|table(?!-c[ea]).+)/,Pb=new RegExp("^("+S+")(.*)$","i"),Qb=new RegExp("^([+-])=("+S+")","i"),Rb={position:"absolute",visibility:"hidden",display:"block"},Sb={letterSpacing:"0",fontWeight:"400"},Tb=["Webkit","O","Moz","ms"];function Ub(a,b){if(b in a)return b;var c=b.charAt(0).toUpperCase()+b.slice(1),d=b,e=Tb.length;while(e--)if(b=Tb[e]+c,b in a)return b;return d}function Vb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=m._data(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&U(d)&&(f[g]=m._data(d,"olddisplay",Fb(d.nodeName)))):(e=U(d),(c&&"none"!==c||!e)&&m._data(d,"olddisplay",e?c:m.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}function Wb(a,b,c){var d=Pb.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Xb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=m.css(a,c+T[f],!0,e)),d?("content"===c&&(g-=m.css(a,"padding"+T[f],!0,e)),"margin"!==c&&(g-=m.css(a,"border"+T[f]+"Width",!0,e))):(g+=m.css(a,"padding"+T[f],!0,e),"padding"!==c&&(g+=m.css(a,"border"+T[f]+"Width",!0,e)));return g}function Yb(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=Ib(a),g=k.boxSizing&&"border-box"===m.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=Jb(a,b,f),(0>e||null==e)&&(e=a.style[b]),Hb.test(e))return e;d=g&&(k.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Xb(a,b,c||(g?"border":"content"),d,f)+"px"}m.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Jb(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":k.cssFloat?"cssFloat":"styleFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=m.camelCase(b),i=a.style;if(b=m.cssProps[h]||(m.cssProps[h]=Ub(i,h)),g=m.cssHooks[b]||m.cssHooks[h],void 0===c)return g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b];if(f=typeof c,"string"===f&&(e=Qb.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(m.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||m.cssNumber[h]||(c+="px"),k.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),!(g&&"set"in g&&void 0===(c=g.set(a,c,d)))))try{i[b]=c}catch(j){}}},css:function(a,b,c,d){var e,f,g,h=m.camelCase(b);return b=m.cssProps[h]||(m.cssProps[h]=Ub(a.style,h)),g=m.cssHooks[b]||m.cssHooks[h],g&&"get"in g&&(f=g.get(a,!0,c)),void 0===f&&(f=Jb(a,b,d)),"normal"===f&&b in Sb&&(f=Sb[b]),""===c||c?(e=parseFloat(f),c===!0||m.isNumeric(e)?e||0:f):f}}),m.each(["height","width"],function(a,b){m.cssHooks[b]={get:function(a,c,d){return c?Ob.test(m.css(a,"display"))&&0===a.offsetWidth?m.swap(a,Rb,function(){return Yb(a,b,d)}):Yb(a,b,d):void 0},set:function(a,c,d){var e=d&&Ib(a);return Wb(a,c,d?Xb(a,b,d,k.boxSizing&&"border-box"===m.css(a,"boxSizing",!1,e),e):0)}}}),k.opacity||(m.cssHooks.opacity={get:function(a,b){return Nb.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=m.isNumeric(b)?"alpha(opacity="+100*b+")":"",f=d&&d.filter||c.filter||"";c.zoom=1,(b>=1||""===b)&&""===m.trim(f.replace(Mb,""))&&c.removeAttribute&&(c.removeAttribute("filter"),""===b||d&&!d.filter)||(c.filter=Mb.test(f)?f.replace(Mb,e):f+" "+e)}}),m.cssHooks.marginRight=Lb(k.reliableMarginRight,function(a,b){return b?m.swap(a,{display:"inline-block"},Jb,[a,"marginRight"]):void 0}),m.each({margin:"",padding:"",border:"Width"},function(a,b){m.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+T[d]+b]=f[d]||f[d-2]||f[0];return e}},Gb.test(a)||(m.cssHooks[a+b].set=Wb)}),m.fn.extend({css:function(a,b){return V(this,function(a,b,c){var d,e,f={},g=0;if(m.isArray(b)){for(d=Ib(a),e=b.length;e>g;g++)f[b[g]]=m.css(a,b[g],!1,d);return f}return void 0!==c?m.style(a,b,c):m.css(a,b)},a,b,arguments.length>1)},show:function(){return Vb(this,!0)},hide:function(){return Vb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){U(this)?m(this).show():m(this).hide()})}});function Zb(a,b,c,d,e){return new Zb.prototype.init(a,b,c,d,e)}m.Tween=Zb,Zb.prototype={constructor:Zb,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(m.cssNumber[c]?"":"px")
},cur:function(){var a=Zb.propHooks[this.prop];return a&&a.get?a.get(this):Zb.propHooks._default.get(this)},run:function(a){var b,c=Zb.propHooks[this.prop];return this.pos=b=this.options.duration?m.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Zb.propHooks._default.set(this),this}},Zb.prototype.init.prototype=Zb.prototype,Zb.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=m.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){m.fx.step[a.prop]?m.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[m.cssProps[a.prop]]||m.cssHooks[a.prop])?m.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Zb.propHooks.scrollTop=Zb.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},m.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},m.fx=Zb.prototype.init,m.fx.step={};var $b,_b,ac=/^(?:toggle|show|hide)$/,bc=new RegExp("^(?:([+-])=|)("+S+")([a-z%]*)$","i"),cc=/queueHooks$/,dc=[ic],ec={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=bc.exec(b),f=e&&e[3]||(m.cssNumber[a]?"":"px"),g=(m.cssNumber[a]||"px"!==f&&+d)&&bc.exec(m.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,m.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function fc(){return setTimeout(function(){$b=void 0}),$b=m.now()}function gc(a,b){var c,d={height:a},e=0;for(b=b?1:0;4>e;e+=2-b)c=T[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function hc(a,b,c){for(var d,e=(ec[b]||[]).concat(ec["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function ic(a,b,c){var d,e,f,g,h,i,j,l,n=this,o={},p=a.style,q=a.nodeType&&U(a),r=m._data(a,"fxshow");c.queue||(h=m._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,n.always(function(){n.always(function(){h.unqueued--,m.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[p.overflow,p.overflowX,p.overflowY],j=m.css(a,"display"),l="none"===j?m._data(a,"olddisplay")||Fb(a.nodeName):j,"inline"===l&&"none"===m.css(a,"float")&&(k.inlineBlockNeedsLayout&&"inline"!==Fb(a.nodeName)?p.zoom=1:p.display="inline-block")),c.overflow&&(p.overflow="hidden",k.shrinkWrapBlocks()||n.always(function(){p.overflow=c.overflow[0],p.overflowX=c.overflow[1],p.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],ac.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(q?"hide":"show")){if("show"!==e||!r||void 0===r[d])continue;q=!0}o[d]=r&&r[d]||m.style(a,d)}else j=void 0;if(m.isEmptyObject(o))"inline"===("none"===j?Fb(a.nodeName):j)&&(p.display=j);else{r?"hidden"in r&&(q=r.hidden):r=m._data(a,"fxshow",{}),f&&(r.hidden=!q),q?m(a).show():n.done(function(){m(a).hide()}),n.done(function(){var b;m._removeData(a,"fxshow");for(b in o)m.style(a,b,o[b])});for(d in o)g=hc(q?r[d]:0,d,n),d in r||(r[d]=g.start,q&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function jc(a,b){var c,d,e,f,g;for(c in a)if(d=m.camelCase(c),e=b[d],f=a[c],m.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=m.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function kc(a,b,c){var d,e,f=0,g=dc.length,h=m.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=$b||fc(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:m.extend({},b),opts:m.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:$b||fc(),duration:c.duration,tweens:[],createTween:function(b,c){var d=m.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(jc(k,j.opts.specialEasing);g>f;f++)if(d=dc[f].call(j,a,k,j.opts))return d;return m.map(k,hc,j),m.isFunction(j.opts.start)&&j.opts.start.call(a,j),m.fx.timer(m.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}m.Animation=m.extend(kc,{tweener:function(a,b){m.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],ec[c]=ec[c]||[],ec[c].unshift(b)},prefilter:function(a,b){b?dc.unshift(a):dc.push(a)}}),m.speed=function(a,b,c){var d=a&&"object"==typeof a?m.extend({},a):{complete:c||!c&&b||m.isFunction(a)&&a,duration:a,easing:c&&b||b&&!m.isFunction(b)&&b};return d.duration=m.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in m.fx.speeds?m.fx.speeds[d.duration]:m.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){m.isFunction(d.old)&&d.old.call(this),d.queue&&m.dequeue(this,d.queue)},d},m.fn.extend({fadeTo:function(a,b,c,d){return this.filter(U).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=m.isEmptyObject(a),f=m.speed(b,c,d),g=function(){var b=kc(this,m.extend({},a),f);(e||m._data(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=m.timers,g=m._data(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&cc.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&m.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=m._data(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=m.timers,g=d?d.length:0;for(c.finish=!0,m.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),m.each(["toggle","show","hide"],function(a,b){var c=m.fn[b];m.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(gc(b,!0),a,d,e)}}),m.each({slideDown:gc("show"),slideUp:gc("hide"),slideToggle:gc("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){m.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),m.timers=[],m.fx.tick=function(){var a,b=m.timers,c=0;for($b=m.now();c<b.length;c++)a=b[c],a()||b[c]!==a||b.splice(c--,1);b.length||m.fx.stop(),$b=void 0},m.fx.timer=function(a){m.timers.push(a),a()?m.fx.start():m.timers.pop()},m.fx.interval=13,m.fx.start=function(){_b||(_b=setInterval(m.fx.tick,m.fx.interval))},m.fx.stop=function(){clearInterval(_b),_b=null},m.fx.speeds={slow:600,fast:200,_default:400},m.fn.delay=function(a,b){return a=m.fx?m.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a,b,c,d,e;b=y.createElement("div"),b.setAttribute("className","t"),b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",d=b.getElementsByTagName("a")[0],c=y.createElement("select"),e=c.appendChild(y.createElement("option")),a=b.getElementsByTagName("input")[0],d.style.cssText="top:1px",k.getSetAttribute="t"!==b.className,k.style=/top/.test(d.getAttribute("style")),k.hrefNormalized="/a"===d.getAttribute("href"),k.checkOn=!!a.value,k.optSelected=e.selected,k.enctype=!!y.createElement("form").enctype,c.disabled=!0,k.optDisabled=!e.disabled,a=y.createElement("input"),a.setAttribute("value",""),k.input=""===a.getAttribute("value"),a.value="t",a.setAttribute("type","radio"),k.radioValue="t"===a.value}();var lc=/\r/g;m.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=m.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,m(this).val()):a,null==e?e="":"number"==typeof e?e+="":m.isArray(e)&&(e=m.map(e,function(a){return null==a?"":a+""})),b=m.valHooks[this.type]||m.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=m.valHooks[e.type]||m.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(lc,""):null==c?"":c)}}}),m.extend({valHooks:{option:{get:function(a){var b=m.find.attr(a,"value");return null!=b?b:m.trim(m.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(k.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&m.nodeName(c.parentNode,"optgroup"))){if(b=m(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=m.makeArray(b),g=e.length;while(g--)if(d=e[g],m.inArray(m.valHooks.option.get(d),f)>=0)try{d.selected=c=!0}catch(h){d.scrollHeight}else d.selected=!1;return c||(a.selectedIndex=-1),e}}}}),m.each(["radio","checkbox"],function(){m.valHooks[this]={set:function(a,b){return m.isArray(b)?a.checked=m.inArray(m(a).val(),b)>=0:void 0}},k.checkOn||(m.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var mc,nc,oc=m.expr.attrHandle,pc=/^(?:checked|selected)$/i,qc=k.getSetAttribute,rc=k.input;m.fn.extend({attr:function(a,b){return V(this,m.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){m.removeAttr(this,a)})}}),m.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===K?m.prop(a,b,c):(1===f&&m.isXMLDoc(a)||(b=b.toLowerCase(),d=m.attrHooks[b]||(m.expr.match.bool.test(b)?nc:mc)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=m.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void m.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=m.propFix[c]||c,m.expr.match.bool.test(c)?rc&&qc||!pc.test(c)?a[d]=!1:a[m.camelCase("default-"+c)]=a[d]=!1:m.attr(a,c,""),a.removeAttribute(qc?c:d)},attrHooks:{type:{set:function(a,b){if(!k.radioValue&&"radio"===b&&m.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),nc={set:function(a,b,c){return b===!1?m.removeAttr(a,c):rc&&qc||!pc.test(c)?a.setAttribute(!qc&&m.propFix[c]||c,c):a[m.camelCase("default-"+c)]=a[c]=!0,c}},m.each(m.expr.match.bool.source.match(/\w+/g),function(a,b){var c=oc[b]||m.find.attr;oc[b]=rc&&qc||!pc.test(b)?function(a,b,d){var e,f;return d||(f=oc[b],oc[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,oc[b]=f),e}:function(a,b,c){return c?void 0:a[m.camelCase("default-"+b)]?b.toLowerCase():null}}),rc&&qc||(m.attrHooks.value={set:function(a,b,c){return m.nodeName(a,"input")?void(a.defaultValue=b):mc&&mc.set(a,b,c)}}),qc||(mc={set:function(a,b,c){var d=a.getAttributeNode(c);return d||a.setAttributeNode(d=a.ownerDocument.createAttribute(c)),d.value=b+="","value"===c||b===a.getAttribute(c)?b:void 0}},oc.id=oc.name=oc.coords=function(a,b,c){var d;return c?void 0:(d=a.getAttributeNode(b))&&""!==d.value?d.value:null},m.valHooks.button={get:function(a,b){var c=a.getAttributeNode(b);return c&&c.specified?c.value:void 0},set:mc.set},m.attrHooks.contenteditable={set:function(a,b,c){mc.set(a,""===b?!1:b,c)}},m.each(["width","height"],function(a,b){m.attrHooks[b]={set:function(a,c){return""===c?(a.setAttribute(b,"auto"),c):void 0}}})),k.style||(m.attrHooks.style={get:function(a){return a.style.cssText||void 0},set:function(a,b){return a.style.cssText=b+""}});var sc=/^(?:input|select|textarea|button|object)$/i,tc=/^(?:a|area)$/i;m.fn.extend({prop:function(a,b){return V(this,m.prop,a,b,arguments.length>1)},removeProp:function(a){return a=m.propFix[a]||a,this.each(function(){try{this[a]=void 0,delete this[a]}catch(b){}})}}),m.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!m.isXMLDoc(a),f&&(b=m.propFix[b]||b,e=m.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=m.find.attr(a,"tabindex");return b?parseInt(b,10):sc.test(a.nodeName)||tc.test(a.nodeName)&&a.href?0:-1}}}}),k.hrefNormalized||m.each(["href","src"],function(a,b){m.propHooks[b]={get:function(a){return a.getAttribute(b,4)}}}),k.optSelected||(m.propHooks.selected={get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null}}),m.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){m.propFix[this.toLowerCase()]=this}),k.enctype||(m.propFix.enctype="encoding");var uc=/[\t\r\n\f]/g;m.fn.extend({addClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j="string"==typeof a&&a;if(m.isFunction(a))return this.each(function(b){m(this).addClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(E)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(uc," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=m.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j=0===arguments.length||"string"==typeof a&&a;if(m.isFunction(a))return this.each(function(b){m(this).removeClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(E)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(uc," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?m.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(m.isFunction(a)?function(c){m(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=m(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===K||"boolean"===c)&&(this.className&&m._data(this,"__className__",this.className),this.className=this.className||a===!1?"":m._data(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(uc," ").indexOf(b)>=0)return!0;return!1}}),m.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){m.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),m.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var vc=m.now(),wc=/\?/,xc=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;m.parseJSON=function(b){if(a.JSON&&a.JSON.parse)return a.JSON.parse(b+"");var c,d=null,e=m.trim(b+"");return e&&!m.trim(e.replace(xc,function(a,b,e,f){return c&&b&&(d=0),0===d?a:(c=e||b,d+=!f-!e,"")}))?Function("return "+e)():m.error("Invalid JSON: "+b)},m.parseXML=function(b){var c,d;if(!b||"string"!=typeof b)return null;try{a.DOMParser?(d=new DOMParser,c=d.parseFromString(b,"text/xml")):(c=new ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b))}catch(e){c=void 0}return c&&c.documentElement&&!c.getElementsByTagName("parsererror").length||m.error("Invalid XML: "+b),c};var yc,zc,Ac=/#.*$/,Bc=/([?&])_=[^&]*/,Cc=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Dc=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Ec=/^(?:GET|HEAD)$/,Fc=/^\/\//,Gc=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,Hc={},Ic={},Jc="*/".concat("*");try{zc=location.href}catch(Kc){zc=y.createElement("a"),zc.href="",zc=zc.href}yc=Gc.exec(zc.toLowerCase())||[];function Lc(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(m.isFunction(c))while(d=f[e++])"+"===d.charAt(0)?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Mc(a,b,c,d){var e={},f=a===Ic;function g(h){var i;return e[h]=!0,m.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Nc(a,b){var c,d,e=m.ajaxSettings.flatOptions||{};for(d in b)void 0!==b[d]&&((e[d]?a:c||(c={}))[d]=b[d]);return c&&m.extend(!0,a,c),a}function Oc(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===e&&(e=a.mimeType||b.getResponseHeader("Content-Type"));if(e)for(g in h)if(h[g]&&h[g].test(e)){i.unshift(g);break}if(i[0]in c)f=i[0];else{for(g in c){if(!i[0]||a.converters[g+" "+i[0]]){f=g;break}d||(d=g)}f=f||d}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function Pc(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}m.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:zc,type:"GET",isLocal:Dc.test(yc[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Jc,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":m.parseJSON,"text xml":m.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Nc(Nc(a,m.ajaxSettings),b):Nc(m.ajaxSettings,a)},ajaxPrefilter:Lc(Hc),ajaxTransport:Lc(Ic),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=m.ajaxSetup({},b),l=k.context||k,n=k.context&&(l.nodeType||l.jquery)?m(l):m.event,o=m.Deferred(),p=m.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!j){j={};while(b=Cc.exec(f))j[b[1].toLowerCase()]=b[2]}b=j[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?f:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return i&&i.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||zc)+"").replace(Ac,"").replace(Fc,yc[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=m.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(c=Gc.exec(k.url.toLowerCase()),k.crossDomain=!(!c||c[1]===yc[1]&&c[2]===yc[2]&&(c[3]||("http:"===c[1]?"80":"443"))===(yc[3]||("http:"===yc[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=m.param(k.data,k.traditional)),Mc(Hc,k,b,v),2===t)return v;h=k.global,h&&0===m.active++&&m.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!Ec.test(k.type),e=k.url,k.hasContent||(k.data&&(e=k.url+=(wc.test(e)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=Bc.test(e)?e.replace(Bc,"$1_="+vc++):e+(wc.test(e)?"&":"?")+"_="+vc++)),k.ifModified&&(m.lastModified[e]&&v.setRequestHeader("If-Modified-Since",m.lastModified[e]),m.etag[e]&&v.setRequestHeader("If-None-Match",m.etag[e])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+Jc+"; q=0.01":""):k.accepts["*"]);for(d in k.headers)v.setRequestHeader(d,k.headers[d]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(d in{success:1,error:1,complete:1})v[d](k[d]);if(i=Mc(Ic,k,b,v)){v.readyState=1,h&&n.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,i.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,c,d){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),i=void 0,f=d||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,c&&(u=Oc(k,v,c)),u=Pc(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(m.lastModified[e]=w),w=v.getResponseHeader("etag"),w&&(m.etag[e]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,h&&n.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),h&&(n.trigger("ajaxComplete",[v,k]),--m.active||m.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return m.get(a,b,c,"json")},getScript:function(a,b){return m.get(a,void 0,b,"script")}}),m.each(["get","post"],function(a,b){m[b]=function(a,c,d,e){return m.isFunction(c)&&(e=e||d,d=c,c=void 0),m.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),m.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){m.fn[b]=function(a){return this.on(b,a)}}),m._evalUrl=function(a){return m.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},m.fn.extend({wrapAll:function(a){if(m.isFunction(a))return this.each(function(b){m(this).wrapAll(a.call(this,b))});if(this[0]){var b=m(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&1===a.firstChild.nodeType)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return this.each(m.isFunction(a)?function(b){m(this).wrapInner(a.call(this,b))}:function(){var b=m(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=m.isFunction(a);return this.each(function(c){m(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){m.nodeName(this,"body")||m(this).replaceWith(this.childNodes)}).end()}}),m.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0||!k.reliableHiddenOffsets()&&"none"===(a.style&&a.style.display||m.css(a,"display"))},m.expr.filters.visible=function(a){return!m.expr.filters.hidden(a)};var Qc=/%20/g,Rc=/\[\]$/,Sc=/\r?\n/g,Tc=/^(?:submit|button|image|reset|file)$/i,Uc=/^(?:input|select|textarea|keygen)/i;function Vc(a,b,c,d){var e;if(m.isArray(b))m.each(b,function(b,e){c||Rc.test(a)?d(a,e):Vc(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==m.type(b))d(a,b);else for(e in b)Vc(a+"["+e+"]",b[e],c,d)}m.param=function(a,b){var c,d=[],e=function(a,b){b=m.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=m.ajaxSettings&&m.ajaxSettings.traditional),m.isArray(a)||a.jquery&&!m.isPlainObject(a))m.each(a,function(){e(this.name,this.value)});else for(c in a)Vc(c,a[c],b,e);return d.join("&").replace(Qc,"+")},m.fn.extend({serialize:function(){return m.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=m.prop(this,"elements");return a?m.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!m(this).is(":disabled")&&Uc.test(this.nodeName)&&!Tc.test(a)&&(this.checked||!W.test(a))}).map(function(a,b){var c=m(this).val();return null==c?null:m.isArray(c)?m.map(c,function(a){return{name:b.name,value:a.replace(Sc,"\r\n")}}):{name:b.name,value:c.replace(Sc,"\r\n")}}).get()}}),m.ajaxSettings.xhr=void 0!==a.ActiveXObject?function(){return!this.isLocal&&/^(get|post|head|put|delete|options)$/i.test(this.type)&&Zc()||$c()}:Zc;var Wc=0,Xc={},Yc=m.ajaxSettings.xhr();a.ActiveXObject&&m(a).on("unload",function(){for(var a in Xc)Xc[a](void 0,!0)}),k.cors=!!Yc&&"withCredentials"in Yc,Yc=k.ajax=!!Yc,Yc&&m.ajaxTransport(function(a){if(!a.crossDomain||k.cors){var b;return{send:function(c,d){var e,f=a.xhr(),g=++Wc;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)void 0!==c[e]&&f.setRequestHeader(e,c[e]+"");f.send(a.hasContent&&a.data||null),b=function(c,e){var h,i,j;if(b&&(e||4===f.readyState))if(delete Xc[g],b=void 0,f.onreadystatechange=m.noop,e)4!==f.readyState&&f.abort();else{j={},h=f.status,"string"==typeof f.responseText&&(j.text=f.responseText);try{i=f.statusText}catch(k){i=""}h||!a.isLocal||a.crossDomain?1223===h&&(h=204):h=j.text?200:404}j&&d(h,i,j,f.getAllResponseHeaders())},a.async?4===f.readyState?setTimeout(b):f.onreadystatechange=Xc[g]=b:b()},abort:function(){b&&b(void 0,!0)}}}});function Zc(){try{return new a.XMLHttpRequest}catch(b){}}function $c(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}m.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return m.globalEval(a),a}}}),m.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),m.ajaxTransport("script",function(a){if(a.crossDomain){var b,c=y.head||m("head")[0]||y.documentElement;return{send:function(d,e){b=y.createElement("script"),b.async=!0,a.scriptCharset&&(b.charset=a.scriptCharset),b.src=a.url,b.onload=b.onreadystatechange=function(a,c){(c||!b.readyState||/loaded|complete/.test(b.readyState))&&(b.onload=b.onreadystatechange=null,b.parentNode&&b.parentNode.removeChild(b),b=null,c||e(200,"success"))},c.insertBefore(b,c.firstChild)},abort:function(){b&&b.onload(void 0,!0)}}}});var _c=[],ad=/(=)\?(?=&|$)|\?\?/;m.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=_c.pop()||m.expando+"_"+vc++;return this[a]=!0,a}}),m.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(ad.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&ad.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=m.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(ad,"$1"+e):b.jsonp!==!1&&(b.url+=(wc.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||m.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,_c.push(e)),g&&m.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),m.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||y;var d=u.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=m.buildFragment([a],b,e),e&&e.length&&m(e).remove(),m.merge([],d.childNodes))};var bd=m.fn.load;m.fn.load=function(a,b,c){if("string"!=typeof a&&bd)return bd.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=m.trim(a.slice(h,a.length)),a=a.slice(0,h)),m.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(f="POST"),g.length>0&&m.ajax({url:a,type:f,dataType:"html",data:b}).done(function(a){e=arguments,g.html(d?m("<div>").append(m.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,e||[a.responseText,b,a])}),this},m.expr.filters.animated=function(a){return m.grep(m.timers,function(b){return a===b.elem}).length};var cd=a.document.documentElement;function dd(a){return m.isWindow(a)?a:9===a.nodeType?a.defaultView||a.parentWindow:!1}m.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=m.css(a,"position"),l=m(a),n={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=m.css(a,"top"),i=m.css(a,"left"),j=("absolute"===k||"fixed"===k)&&m.inArray("auto",[f,i])>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),m.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(n.top=b.top-h.top+g),null!=b.left&&(n.left=b.left-h.left+e),"using"in b?b.using.call(a,n):l.css(n)}},m.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){m.offset.setOffset(this,a,b)});var b,c,d={top:0,left:0},e=this[0],f=e&&e.ownerDocument;if(f)return b=f.documentElement,m.contains(b,e)?(typeof e.getBoundingClientRect!==K&&(d=e.getBoundingClientRect()),c=dd(f),{top:d.top+(c.pageYOffset||b.scrollTop)-(b.clientTop||0),left:d.left+(c.pageXOffset||b.scrollLeft)-(b.clientLeft||0)}):d},position:function(){if(this[0]){var a,b,c={top:0,left:0},d=this[0];return"fixed"===m.css(d,"position")?b=d.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),m.nodeName(a[0],"html")||(c=a.offset()),c.top+=m.css(a[0],"borderTopWidth",!0),c.left+=m.css(a[0],"borderLeftWidth",!0)),{top:b.top-c.top-m.css(d,"marginTop",!0),left:b.left-c.left-m.css(d,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||cd;while(a&&!m.nodeName(a,"html")&&"static"===m.css(a,"position"))a=a.offsetParent;return a||cd})}}),m.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c=/Y/.test(b);m.fn[a]=function(d){return V(this,function(a,d,e){var f=dd(a);return void 0===e?f?b in f?f[b]:f.document.documentElement[d]:a[d]:void(f?f.scrollTo(c?m(f).scrollLeft():e,c?e:m(f).scrollTop()):a[d]=e)},a,d,arguments.length,null)}}),m.each(["top","left"],function(a,b){m.cssHooks[b]=Lb(k.pixelPosition,function(a,c){return c?(c=Jb(a,b),Hb.test(c)?m(a).position()[b]+"px":c):void 0})}),m.each({Height:"height",Width:"width"},function(a,b){m.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){m.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return V(this,function(b,c,d){var e;return m.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?m.css(b,c,g):m.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),m.fn.size=function(){return this.length},m.fn.andSelf=m.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return m});var ed=a.jQuery,fd=a.$;return m.noConflict=function(b){return a.$===m&&(a.$=fd),b&&a.jQuery===m&&(a.jQuery=ed),m},typeof b===K&&(a.jQuery=a.$=m),m});


/*!
 * jQuery Migrate - v1.2.1 - 2013-05-08
 * https://github.com/jquery/jquery-migrate
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors; Licensed MIT
 */
(function( jQuery, window, undefined ) {
// See http://bugs.jquery.com/ticket/13335
// "use strict";


var warnedAbout = {};

// List of warnings already given; public read only
jQuery.migrateWarnings = [];

// Set to true to prevent console output; migrateWarnings still maintained
jQuery.migrateMute = true;

// Show a message on the console so devs know we're active
if ( !jQuery.migrateMute && window.console && window.console.log ) {
	window.console.log("JQMIGRATE: Logging is active");
}

// Set to false to disable traces that appear with warnings
if ( jQuery.migrateTrace === undefined ) {
	jQuery.migrateTrace = true;
}

// Forget any warnings we've already given; public
jQuery.migrateReset = function() {
	warnedAbout = {};
	jQuery.migrateWarnings.length = 0;
};

function migrateWarn( msg) {
	var console = window.console;
	if ( !warnedAbout[ msg ] ) {
		warnedAbout[ msg ] = true;
		jQuery.migrateWarnings.push( msg );
		if ( console && console.warn && !jQuery.migrateMute ) {
			console.warn( "JQMIGRATE: " + msg );
			if ( jQuery.migrateTrace && console.trace ) {
				console.trace();
			}
		}
	}
}

function migrateWarnProp( obj, prop, value, msg ) {
	if ( Object.defineProperty ) {
		// On ES5 browsers (non-oldIE), warn if the code tries to get prop;
		// allow property to be overwritten in case some other plugin wants it
		try {
			Object.defineProperty( obj, prop, {
				configurable: true,
				enumerable: true,
				get: function() {
					migrateWarn( msg );
					return value;
				},
				set: function( newValue ) {
					migrateWarn( msg );
					value = newValue;
				}
			});
			return;
		} catch( err ) {
			// IE8 is a dope about Object.defineProperty, can't warn there
		}
	}

	// Non-ES5 (or broken) browser; just set the property
	jQuery._definePropertyBroken = true;
	obj[ prop ] = value;
}

if ( document.compatMode === "BackCompat" ) {
	// jQuery has never supported or tested Quirks Mode
	migrateWarn( "jQuery is not compatible with Quirks Mode" );
}


var attrFn = jQuery( "<input/>", { size: 1 } ).attr("size") && jQuery.attrFn,
	oldAttr = jQuery.attr,
	valueAttrGet = jQuery.attrHooks.value && jQuery.attrHooks.value.get ||
		function() { return null; },
	valueAttrSet = jQuery.attrHooks.value && jQuery.attrHooks.value.set ||
		function() { return undefined; },
	rnoType = /^(?:input|button)$/i,
	rnoAttrNodeType = /^[238]$/,
	rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
	ruseDefault = /^(?:checked|selected)$/i;

// jQuery.attrFn
migrateWarnProp( jQuery, "attrFn", attrFn || {}, "jQuery.attrFn is deprecated" );

jQuery.attr = function( elem, name, value, pass ) {
	var lowerName = name.toLowerCase(),
		nType = elem && elem.nodeType;

	if ( pass ) {
		// Since pass is used internally, we only warn for new jQuery
		// versions where there isn't a pass arg in the formal params
		if ( oldAttr.length < 4 ) {
			migrateWarn("jQuery.fn.attr( props, pass ) is deprecated");
		}
		if ( elem && !rnoAttrNodeType.test( nType ) &&
			(attrFn ? name in attrFn : jQuery.isFunction(jQuery.fn[name])) ) {
			return jQuery( elem )[ name ]( value );
		}
	}

	// Warn if user tries to set `type`, since it breaks on IE 6/7/8; by checking
	// for disconnected elements we don't warn on $( "<button>", { type: "button" } ).
	if ( name === "type" && value !== undefined && rnoType.test( elem.nodeName ) && elem.parentNode ) {
		migrateWarn("Can't change the 'type' of an input or button in IE 6/7/8");
	}

	// Restore boolHook for boolean property/attribute synchronization
	if ( !jQuery.attrHooks[ lowerName ] && rboolean.test( lowerName ) ) {
		jQuery.attrHooks[ lowerName ] = {
			get: function( elem, name ) {
				// Align boolean attributes with corresponding properties
				// Fall back to attribute presence where some booleans are not supported
				var attrNode,
					property = jQuery.prop( elem, name );
				return property === true || typeof property !== "boolean" &&
					( attrNode = elem.getAttributeNode(name) ) && attrNode.nodeValue !== false ?

					name.toLowerCase() :
					undefined;
			},
			set: function( elem, value, name ) {
				var propName;
				if ( value === false ) {
					// Remove boolean attributes when set to false
					jQuery.removeAttr( elem, name );
				} else {
					// value is true since we know at this point it's type boolean and not false
					// Set boolean attributes to the same name and set the DOM property
					propName = jQuery.propFix[ name ] || name;
					if ( propName in elem ) {
						// Only set the IDL specifically if it already exists on the element
						elem[ propName ] = true;
					}

					elem.setAttribute( name, name.toLowerCase() );
				}
				return name;
			}
		};

		// Warn only for attributes that can remain distinct from their properties post-1.9
		if ( ruseDefault.test( lowerName ) ) {
			migrateWarn( "jQuery.fn.attr('" + lowerName + "') may use property instead of attribute" );
		}
	}

	return oldAttr.call( jQuery, elem, name, value );
};

// attrHooks: value
jQuery.attrHooks.value = {
	get: function( elem, name ) {
		var nodeName = ( elem.nodeName || "" ).toLowerCase();
		if ( nodeName === "button" ) {
			return valueAttrGet.apply( this, arguments );
		}
		if ( nodeName !== "input" && nodeName !== "option" ) {
			migrateWarn("jQuery.fn.attr('value') no longer gets properties");
		}
		return name in elem ?
			elem.value :
			null;
	},
	set: function( elem, value ) {
		var nodeName = ( elem.nodeName || "" ).toLowerCase();
		if ( nodeName === "button" ) {
			return valueAttrSet.apply( this, arguments );
		}
		if ( nodeName !== "input" && nodeName !== "option" ) {
			migrateWarn("jQuery.fn.attr('value', val) no longer sets properties");
		}
		// Does not return so that setAttribute is also used
		elem.value = value;
	}
};


var matched, browser,
	oldInit = jQuery.fn.init,
	oldParseJSON = jQuery.parseJSON,
	// Note: XSS check is done below after string is trimmed
	rquickExpr = /^([^<]*)(<[\w\W]+>)([^>]*)$/;

// $(html) "looks like html" rule change
jQuery.fn.init = function( selector, context, rootjQuery ) {
	var match;

	if ( selector && typeof selector === "string" && !jQuery.isPlainObject( context ) &&
			(match = rquickExpr.exec( jQuery.trim( selector ) )) && match[ 0 ] ) {
		// This is an HTML string according to the "old" rules; is it still?
		if ( selector.charAt( 0 ) !== "<" ) {
			migrateWarn("$(html) HTML strings must start with '<' character");
		}
		if ( match[ 3 ] ) {
			migrateWarn("$(html) HTML text after last tag is ignored");
		}
		// Consistently reject any HTML-like string starting with a hash (#9521)
		// Note that this may break jQuery 1.6.x code that otherwise would work.
		if ( match[ 0 ].charAt( 0 ) === "#" ) {
			migrateWarn("HTML string cannot start with a '#' character");
			jQuery.error("JQMIGRATE: Invalid selector string (XSS)");
		}
		// Now process using loose rules; let pre-1.8 play too
		if ( context && context.context ) {
			// jQuery object as context; parseHTML expects a DOM object
			context = context.context;
		}
		if ( jQuery.parseHTML ) {
			return oldInit.call( this, jQuery.parseHTML( match[ 2 ], context, true ),
					context, rootjQuery );
		}
	}
	return oldInit.apply( this, arguments );
};
jQuery.fn.init.prototype = jQuery.fn;

// Let $.parseJSON(falsy_value) return null
jQuery.parseJSON = function( json ) {
	if ( !json && json !== null ) {
		migrateWarn("jQuery.parseJSON requires a valid JSON string");
		return null;
	}
	return oldParseJSON.apply( this, arguments );
};

jQuery.uaMatch = function( ua ) {
	ua = ua.toLowerCase();

	var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
		/(webkit)[ \/]([\w.]+)/.exec( ua ) ||
		/(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
		/(msie) ([\w.]+)/.exec( ua ) ||
		ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
		[];

	return {
		browser: match[ 1 ] || "",
		version: match[ 2 ] || "0"
	};
};

// Don't clobber any existing jQuery.browser in case it's different
if ( !jQuery.browser ) {
	matched = jQuery.uaMatch( navigator.userAgent );
	browser = {};

	if ( matched.browser ) {
		browser[ matched.browser ] = true;
		browser.version = matched.version;
	}

	// Chrome is Webkit, but Webkit is also Safari.
	if ( browser.chrome ) {
		browser.webkit = true;
	} else if ( browser.webkit ) {
		browser.safari = true;
	}

	jQuery.browser = browser;
}

// Warn if the code tries to get jQuery.browser
migrateWarnProp( jQuery, "browser", jQuery.browser, "jQuery.browser is deprecated" );

jQuery.sub = function() {
	function jQuerySub( selector, context ) {
		return new jQuerySub.fn.init( selector, context );
	}
	jQuery.extend( true, jQuerySub, this );
	jQuerySub.superclass = this;
	jQuerySub.fn = jQuerySub.prototype = this();
	jQuerySub.fn.constructor = jQuerySub;
	jQuerySub.sub = this.sub;
	jQuerySub.fn.init = function init( selector, context ) {
		if ( context && context instanceof jQuery && !(context instanceof jQuerySub) ) {
			context = jQuerySub( context );
		}

		return jQuery.fn.init.call( this, selector, context, rootjQuerySub );
	};
	jQuerySub.fn.init.prototype = jQuerySub.fn;
	var rootjQuerySub = jQuerySub(document);
	migrateWarn( "jQuery.sub() is deprecated" );
	return jQuerySub;
};


// Ensure that $.ajax gets the new parseJSON defined in core.js
jQuery.ajaxSetup({
	converters: {
		"text json": jQuery.parseJSON
	}
});


var oldFnData = jQuery.fn.data;

jQuery.fn.data = function( name ) {
	var ret, evt,
		elem = this[0];

	// Handles 1.7 which has this behavior and 1.8 which doesn't
	if ( elem && name === "events" && arguments.length === 1 ) {
		ret = jQuery.data( elem, name );
		evt = jQuery._data( elem, name );
		if ( ( ret === undefined || ret === evt ) && evt !== undefined ) {
			migrateWarn("Use of jQuery.fn.data('events') is deprecated");
			return evt;
		}
	}
	return oldFnData.apply( this, arguments );
};


var rscriptType = /\/(java|ecma)script/i,
	oldSelf = jQuery.fn.andSelf || jQuery.fn.addBack;

jQuery.fn.andSelf = function() {
	migrateWarn("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()");
	return oldSelf.apply( this, arguments );
};

// Since jQuery.clean is used internally on older versions, we only shim if it's missing
if ( !jQuery.clean ) {
	jQuery.clean = function( elems, context, fragment, scripts ) {
		// Set context per 1.8 logic
		context = context || document;
		context = !context.nodeType && context[0] || context;
		context = context.ownerDocument || context;

		migrateWarn("jQuery.clean() is deprecated");

		var i, elem, handleScript, jsTags,
			ret = [];

		jQuery.merge( ret, jQuery.buildFragment( elems, context ).childNodes );

		// Complex logic lifted directly from jQuery 1.8
		if ( fragment ) {
			// Special handling of each script element
			handleScript = function( elem ) {
				// Check if we consider it executable
				if ( !elem.type || rscriptType.test( elem.type ) ) {
					// Detach the script and store it in the scripts array (if provided) or the fragment
					// Return truthy to indicate that it has been handled
					return scripts ?
						scripts.push( elem.parentNode ? elem.parentNode.removeChild( elem ) : elem ) :
						fragment.appendChild( elem );
				}
			};

			for ( i = 0; (elem = ret[i]) != null; i++ ) {
				// Check if we're done after handling an executable script
				if ( !( jQuery.nodeName( elem, "script" ) && handleScript( elem ) ) ) {
					// Append to fragment and handle embedded scripts
					fragment.appendChild( elem );
					if ( typeof elem.getElementsByTagName !== "undefined" ) {
						// handleScript alters the DOM, so use jQuery.merge to ensure snapshot iteration
						jsTags = jQuery.grep( jQuery.merge( [], elem.getElementsByTagName("script") ), handleScript );

						// Splice the scripts into ret after their former ancestor and advance our index beyond them
						ret.splice.apply( ret, [i + 1, 0].concat( jsTags ) );
						i += jsTags.length;
					}
				}
			}
		}

		return ret;
	};
}

var eventAdd = jQuery.event.add,
	eventRemove = jQuery.event.remove,
	eventTrigger = jQuery.event.trigger,
	oldToggle = jQuery.fn.toggle,
	oldLive = jQuery.fn.live,
	oldDie = jQuery.fn.die,
	ajaxEvents = "ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",
	rajaxEvent = new RegExp( "\\b(?:" + ajaxEvents + ")\\b" ),
	rhoverHack = /(?:^|\s)hover(\.\S+|)\b/,
	hoverHack = function( events ) {
		if ( typeof( events ) !== "string" || jQuery.event.special.hover ) {
			return events;
		}
		if ( rhoverHack.test( events ) ) {
			migrateWarn("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'");
		}
		return events && events.replace( rhoverHack, "mouseenter$1 mouseleave$1" );
	};

// Event props removed in 1.9, put them back if needed; no practical way to warn them
if ( jQuery.event.props && jQuery.event.props[ 0 ] !== "attrChange" ) {
	jQuery.event.props.unshift( "attrChange", "attrName", "relatedNode", "srcElement" );
}

// Undocumented jQuery.event.handle was "deprecated" in jQuery 1.7
if ( jQuery.event.dispatch ) {
	migrateWarnProp( jQuery.event, "handle", jQuery.event.dispatch, "jQuery.event.handle is undocumented and deprecated" );
}

// Support for 'hover' pseudo-event and ajax event warnings
jQuery.event.add = function( elem, types, handler, data, selector ){
	if ( elem !== document && rajaxEvent.test( types ) ) {
		migrateWarn( "AJAX events should be attached to document: " + types );
	}
	eventAdd.call( this, elem, hoverHack( types || "" ), handler, data, selector );
};
jQuery.event.remove = function( elem, types, handler, selector, mappedTypes ){
	eventRemove.call( this, elem, hoverHack( types ) || "", handler, selector, mappedTypes );
};

jQuery.fn.error = function() {
	var args = Array.prototype.slice.call( arguments, 0);
	migrateWarn("jQuery.fn.error() is deprecated");
	args.splice( 0, 0, "error" );
	if ( arguments.length ) {
		return this.bind.apply( this, args );
	}
	// error event should not bubble to window, although it does pre-1.7
	this.triggerHandler.apply( this, args );
	return this;
};

jQuery.fn.toggle = function( fn, fn2 ) {

	// Don't mess with animation or css toggles
	if ( !jQuery.isFunction( fn ) || !jQuery.isFunction( fn2 ) ) {
		return oldToggle.apply( this, arguments );
	}
	migrateWarn("jQuery.fn.toggle(handler, handler...) is deprecated");

	// Save reference to arguments for access in closure
	var args = arguments,
		guid = fn.guid || jQuery.guid++,
		i = 0,
		toggler = function( event ) {
			// Figure out which function to execute
			var lastToggle = ( jQuery._data( this, "lastToggle" + fn.guid ) || 0 ) % i;
			jQuery._data( this, "lastToggle" + fn.guid, lastToggle + 1 );

			// Make sure that clicks stop
			event.preventDefault();

			// and execute the function
			return args[ lastToggle ].apply( this, arguments ) || false;
		};

	// link all the functions, so any of them can unbind this click handler
	toggler.guid = guid;
	while ( i < args.length ) {
		args[ i++ ].guid = guid;
	}

	return this.click( toggler );
};

jQuery.fn.live = function( types, data, fn ) {
	migrateWarn("jQuery.fn.live() is deprecated");
	if ( oldLive ) {
		return oldLive.apply( this, arguments );
	}
	jQuery( this.context ).on( types, this.selector, data, fn );
	return this;
};

jQuery.fn.die = function( types, fn ) {
	migrateWarn("jQuery.fn.die() is deprecated");
	if ( oldDie ) {
		return oldDie.apply( this, arguments );
	}
	jQuery( this.context ).off( types, this.selector || "**", fn );
	return this;
};

// Turn global events into document-triggered events
jQuery.event.trigger = function( event, data, elem, onlyHandlers  ){
	if ( !elem && !rajaxEvent.test( event ) ) {
		migrateWarn( "Global events are undocumented and deprecated" );
	}
	return eventTrigger.call( this,  event, data, elem || document, onlyHandlers  );
};
jQuery.each( ajaxEvents.split("|"),
	function( _, name ) {
		jQuery.event.special[ name ] = {
			setup: function() {
				var elem = this;

				// The document needs no shimming; must be !== for oldIE
				if ( elem !== document ) {
					jQuery.event.add( document, name + "." + jQuery.guid, function() {
						jQuery.event.trigger( name, null, elem, true );
					});
					jQuery._data( this, name, jQuery.guid++ );
				}
				return false;
			},
			teardown: function() {
				if ( this !== document ) {
					jQuery.event.remove( document, name + "." + jQuery._data( this, name ) );
				}
				return false;
			}
		};
	}
);


})( jQuery, window );


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


/**
 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
 *
 * @version 1.0.2
 * @codingstandard ftlabs-jsv2
 * @copyright The Financial Times Limited [All Rights Reserved]
 * @license MIT License (see LICENSE.txt)
 */
function FastClick(a,b){"use strict";function c(a,b){return function(){return a.apply(b,arguments)}}var d;if(b=b||{},this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=b.touchBoundary||10,this.layer=a,this.tapDelay=b.tapDelay||200,!FastClick.notNeeded(a)){for(var e=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"],f=this,g=0,h=e.length;h>g;g++)f[e[g]]=c(f[e[g]],f);deviceIsAndroid&&(a.addEventListener("mouseover",this.onMouse,!0),a.addEventListener("mousedown",this.onMouse,!0),a.addEventListener("mouseup",this.onMouse,!0)),a.addEventListener("click",this.onClick,!0),a.addEventListener("touchstart",this.onTouchStart,!1),a.addEventListener("touchmove",this.onTouchMove,!1),a.addEventListener("touchend",this.onTouchEnd,!1),a.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(a.removeEventListener=function(b,c,d){var e=Node.prototype.removeEventListener;"click"===b?e.call(a,b,c.hijacked||c,d):e.call(a,b,c,d)},a.addEventListener=function(b,c,d){var e=Node.prototype.addEventListener;"click"===b?e.call(a,b,c.hijacked||(c.hijacked=function(a){a.propagationStopped||c(a)}),d):e.call(a,b,c,d)}),"function"==typeof a.onclick&&(d=a.onclick,a.addEventListener("click",function(a){d(a)},!1),a.onclick=null)}}var deviceIsAndroid=navigator.userAgent.indexOf("Android")>0,deviceIsIOS=/iP(ad|hone|od)/.test(navigator.userAgent),deviceIsIOS4=deviceIsIOS&&/OS 4_\d(_\d)?/.test(navigator.userAgent),deviceIsIOSWithBadTarget=deviceIsIOS&&/OS ([6-9]|\d{2})_\d/.test(navigator.userAgent);FastClick.prototype.needsClick=function(a){"use strict";switch(a.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(a.disabled)return!0;break;case"input":if(deviceIsIOS&&"file"===a.type||a.disabled)return!0;break;case"label":case"video":return!0}return/\bneedsclick\b/.test(a.className)},FastClick.prototype.needsFocus=function(a){"use strict";switch(a.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!deviceIsAndroid;case"input":switch(a.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!a.disabled&&!a.readOnly;default:return/\bneedsfocus\b/.test(a.className)}},FastClick.prototype.sendClick=function(a,b){"use strict";var c,d;document.activeElement&&document.activeElement!==a&&document.activeElement.blur(),d=b.changedTouches[0],c=document.createEvent("MouseEvents"),c.initMouseEvent(this.determineEventType(a),!0,!0,window,1,d.screenX,d.screenY,d.clientX,d.clientY,!1,!1,!1,!1,0,null),c.forwardedTouchEvent=!0,a.dispatchEvent(c)},FastClick.prototype.determineEventType=function(a){"use strict";return deviceIsAndroid&&"select"===a.tagName.toLowerCase()?"mousedown":"click"},FastClick.prototype.focus=function(a){"use strict";var b;deviceIsIOS&&a.setSelectionRange&&0!==a.type.indexOf("date")&&"time"!==a.type?(b=a.value.length,a.setSelectionRange(b,b)):a.focus()},FastClick.prototype.updateScrollParent=function(a){"use strict";var b,c;if(b=a.fastClickScrollParent,!b||!b.contains(a)){c=a;do{if(c.scrollHeight>c.offsetHeight){b=c,a.fastClickScrollParent=c;break}c=c.parentElement}while(c)}b&&(b.fastClickLastScrollTop=b.scrollTop)},FastClick.prototype.getTargetElementFromEventTarget=function(a){"use strict";return a.nodeType===Node.TEXT_NODE?a.parentNode:a},FastClick.prototype.onTouchStart=function(a){"use strict";var b,c,d;if(a.targetTouches.length>1)return!0;if(b=this.getTargetElementFromEventTarget(a.target),c=a.targetTouches[0],deviceIsIOS){if(d=window.getSelection(),d.rangeCount&&!d.isCollapsed)return!0;if(!deviceIsIOS4){if(c.identifier===this.lastTouchIdentifier)return a.preventDefault(),!1;this.lastTouchIdentifier=c.identifier,this.updateScrollParent(b)}}return this.trackingClick=!0,this.trackingClickStart=a.timeStamp,this.targetElement=b,this.touchStartX=c.pageX,this.touchStartY=c.pageY,a.timeStamp-this.lastClickTime<this.tapDelay&&a.preventDefault(),!0},FastClick.prototype.touchHasMoved=function(a){"use strict";var b=a.changedTouches[0],c=this.touchBoundary;return Math.abs(b.pageX-this.touchStartX)>c||Math.abs(b.pageY-this.touchStartY)>c?!0:!1},FastClick.prototype.onTouchMove=function(a){"use strict";return this.trackingClick?((this.targetElement!==this.getTargetElementFromEventTarget(a.target)||this.touchHasMoved(a))&&(this.trackingClick=!1,this.targetElement=null),!0):!0},FastClick.prototype.findControl=function(a){"use strict";return void 0!==a.control?a.control:a.htmlFor?document.getElementById(a.htmlFor):a.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},FastClick.prototype.onTouchEnd=function(a){"use strict";var b,c,d,e,f,g=this.targetElement;if(!this.trackingClick)return!0;if(a.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0,!0;if(this.cancelNextClick=!1,this.lastClickTime=a.timeStamp,c=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,deviceIsIOSWithBadTarget&&(f=a.changedTouches[0],g=document.elementFromPoint(f.pageX-window.pageXOffset,f.pageY-window.pageYOffset)||g,g.fastClickScrollParent=this.targetElement.fastClickScrollParent),d=g.tagName.toLowerCase(),"label"===d){if(b=this.findControl(g)){if(this.focus(g),deviceIsAndroid)return!1;g=b}}else if(this.needsFocus(g))return a.timeStamp-c>100||deviceIsIOS&&window.top!==window&&"input"===d?(this.targetElement=null,!1):(this.focus(g),this.sendClick(g,a),deviceIsIOS&&"select"===d||(this.targetElement=null,a.preventDefault()),!1);return deviceIsIOS&&!deviceIsIOS4&&(e=g.fastClickScrollParent,e&&e.fastClickLastScrollTop!==e.scrollTop)?!0:(this.needsClick(g)||(a.preventDefault(),this.sendClick(g,a)),!1)},FastClick.prototype.onTouchCancel=function(){"use strict";this.trackingClick=!1,this.targetElement=null},FastClick.prototype.onMouse=function(a){"use strict";return this.targetElement?a.forwardedTouchEvent?!0:a.cancelable&&(!this.needsClick(this.targetElement)||this.cancelNextClick)?(a.stopImmediatePropagation?a.stopImmediatePropagation():a.propagationStopped=!0,a.stopPropagation(),a.preventDefault(),!1):!0:!0},FastClick.prototype.onClick=function(a){"use strict";var b;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===a.target.type&&0===a.detail?!0:(b=this.onMouse(a),b||(this.targetElement=null),b)},FastClick.prototype.destroy=function(){"use strict";var a=this.layer;deviceIsAndroid&&(a.removeEventListener("mouseover",this.onMouse,!0),a.removeEventListener("mousedown",this.onMouse,!0),a.removeEventListener("mouseup",this.onMouse,!0)),a.removeEventListener("click",this.onClick,!0),a.removeEventListener("touchstart",this.onTouchStart,!1),a.removeEventListener("touchmove",this.onTouchMove,!1),a.removeEventListener("touchend",this.onTouchEnd,!1),a.removeEventListener("touchcancel",this.onTouchCancel,!1)},FastClick.notNeeded=function(a){"use strict";var b,c;if("undefined"==typeof window.ontouchstart)return!0;if(c=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!deviceIsAndroid)return!0;if(b=document.querySelector("meta[name=viewport]")){if(-1!==b.content.indexOf("user-scalable=no"))return!0;if(c>31&&document.documentElement.scrollWidth<=window.outerWidth)return!0}}return"none"===a.style.msTouchAction?!0:!1},FastClick.attach=function(a,b){"use strict";return new FastClick(a,b)},"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(function(){"use strict";return FastClick}):"undefined"!=typeof module&&module.exports?(module.exports=FastClick.attach,module.exports.FastClick=FastClick):window.FastClick=FastClick;



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



if(brightcove==undefined){var brightcove={};brightcove.getExperience=function(){alert("Please import APIModules_all.js in order to use the API.");};}
if(brightcove.experiences==undefined){brightcove.servicesURL='http://c.brightcove.com/services';brightcove.cdnURL='http://admin.brightcove.com';brightcove.secureCDNURL='https://sadmin.brightcove.com';brightcove.secureServicesURL='https://secure.brightcove.com/services';brightcove.pubHost='c.$pubcode$.$zoneprefix$$zone$';brightcove.pubSecureHost='secure.$pubcode$.$zoneprefix$$zone$';brightcove.pubSubdomain='ariessaucetown.local';brightcove.experiences={};brightcove.experienceObjects={};brightcove.timeouts={};brightcove.flashTimeoutInterval=10000;brightcove.htmlTimeoutInterval=10000;brightcove.experienceNum=0;brightcove.majorVersion=9;brightcove.majorRevision=0;brightcove.minorRevision=28;brightcove.servlet={AS3:"federated_f9",HTML:"htmlFederated"};brightcove.playerType={FLASH:"flash",HTML:"html",FLASH_IFRAME:"flashIFrame",INSTALLER:"installer",NO_SUPPORT:"nosupport"};brightcove.errorCodes={UNKNOWN:0,DOMAIN_RESTRICTED:1,GEO_RESTRICTED:2,INVALID_ID:3,NO_CONTENT:4,UNAVAILABLE_CONTENT:5,UPGRADE_REQUIRED_FOR_VIDEO:6,UPGRADE_REQUIRED_FOR_PLAYER:7,SERVICE_UNAVAILABLE:8};brightcove.defaultParam={};brightcove.defaultParam.width='100%';brightcove.defaultParam.height='100%';brightcove.defaultFlashParam={};brightcove.defaultFlashParam.allowScriptAccess='always';brightcove.defaultFlashParam.allowFullScreen='true';brightcove.defaultFlashParam.seamlessTabbing=false;brightcove.defaultFlashParam.swliveconnect=true;brightcove.defaultFlashParam.wmode='window';brightcove.defaultFlashParam.quality='high';brightcove.defaultFlashParam.bgcolor='#999999';brightcove.hasActiveX=brightcove.isIE=(window.ActiveXObject!=undefined);brightcove.userAgent=navigator.userAgent;brightcove._queuedAPICalls=[];var brightcoveJS=brightcove;brightcove.createExperiences=function(pEvent,pElementID){var experiences=[];var params;var experience;var flashSupport=brightcove.checkFlashSupport();var htmlSupport=brightcove.checkHtmlSupport();if(pElementID!=null){experiences.push(document.getElementById(pElementID));}else{experiences=brightcove.collectExperiences();}
if(brightcove.hasActiveX){params=document.getElementsByTagName('param');}
var urlParams=brightcove.cacheUrlParams();var numExperiences=experiences.length;for(var i=0;i<numExperiences;i++){experience=experiences[i];experience=brightcove.copyDefaultParams(experience);experience=brightcove.copySnippetParams(experience,params);experience=brightcove.copyUrlParams(experience,urlParams,numExperiences);var playerType=brightcove.determinePlayerType(experience,flashSupport,htmlSupport);var secureConnections=false;if(playerType==brightcove.playerType.HTML){secureConnections=experience.params.secureHTMLConnections=="true";}else{secureConnections=experience.params.secureConnections=="true";}
if(playerType==brightcove.playerType.NO_SUPPORT){brightcove.renderInstallGif(experience,secureConnections);brightcove.reportUpgradeRequired(experience);continue;}
if(playerType==brightcove.playerType.HTML){delete experience.params.linkBaseURL;}else{if(experience.params.includeAPI&&experience.params.templateReadyHandler!=null){experience.params.originalTemplateReadyHandler=experience.params.templateReadyHandler;var handlerName="templateReadyHandler"+experience.id;brightcove[handlerName]=(function(id){return function(event){if(brightcove.internal!=null&&brightcove.internal._instances[id]!=null){brightcove._addModuleToEvent(id,event);}
var player=brightcove.experienceObjects[id];brightcove.callHandlerForPlayer(player,"originalTemplateReadyHandler",event);};})(experience.id);experience.params.templateReadyHandler='brightcove["'+handlerName+'"]';}}
var file=brightcove.generateRequestUrl(experience,playerType,secureConnections);if(document.location.protocol=="http:"){var event='http://goku.brightcove.com/1pix.gif?';var gokuParams=["dcsuri=/viewer/player_load_req","playerType="+playerType,"playerURL="+encodeURIComponent(document.location||"")];var image=brightcove.createElement('image');for(var j in experience.params){gokuParams.push([encodeURIComponent(j)+"="+encodeURIComponent(experience.params[j])]);}
event+=gokuParams.join('&');image.src=event;}
brightcove.renderExperience(experience,file,playerType,secureConnections);}};brightcove.collectExperiences=function(){var experiences=[];var allObjects=document.getElementsByTagName('object');var numObjects=allObjects.length;for(var i=0;i<numObjects;i++){if(/\bBrightcoveExperience\b/.test(allObjects[i].className)){if(allObjects[i].type!='application/x-shockwave-flash'){experiences.push(allObjects[i]);}}}
return experiences;};brightcove.cacheUrlParams=function(){var urlParams={};urlParams.playerKey=decodeURIComponent(brightcove.getParameter("bckey"));urlParams.playerID=brightcove.getParameter("bcpid");urlParams.titleID=brightcove.getParameter("bctid");urlParams.lineupID=brightcove.getParameter("bclid");urlParams.autoStart=brightcove.getParameter("autoStart");urlParams.debuggerID=brightcove.getParameter("debuggerID");urlParams.forceHTML=brightcove.getParameter("forceHTML");urlParams.forceFlashIFrame=brightcove.getParameter("forceFlashIFrame");urlParams.debug=brightcove.getParameter("debug");urlParams.showNoContentMessage=brightcove.getParameter("showNoContentMessage");urlParams.htmlDefaultBitrate=brightcove.getParameter("htmlDefaultBitrate");urlParams.linkSrc=brightcove.getParameter("linkSrc");return urlParams;};brightcove.copyDefaultParams=function(experience){if(!experience.params)experience.params={};if(!experience.flashParams)experience.flashParams={};for(var i in brightcove.defaultParam){experience.params[i]=brightcove.defaultParam[i];}
for(var j in brightcove.defaultFlashParam){experience.flashParams[j]=brightcove.defaultFlashParam[j];}
if(experience.id.length>0){experience.params.flashID=experience.id;}else{experience.id=experience.params.flashID='bcExperienceObj'+(brightcove.experienceNum++);}
return experience;};brightcove.copySnippetParams=function(experience,params){if(!brightcove.hasActiveX){params=experience.getElementsByTagName('param');}
var numParams=params.length;var param;for(var j=0;j<numParams;j++){param=params[j];if(brightcove.hasActiveX&&param.parentNode.id!=experience.id){continue;}
experience.params[param.name]=param.value;}
if(experience.params.bgcolor!=undefined)experience.flashParams.bgcolor=experience.params.bgcolor;if(experience.params.wmode!=undefined)experience.flashParams.wmode=experience.params.wmode;if(experience.params.seamlessTabbing!=undefined)experience.flashParams.seamlessTabbing=experience.params.seamlessTabbing;return experience;};brightcove.copyUrlParams=function(experience,urlParams){if(experience.params.autoStart==undefined&&urlParams.autoStart!=undefined){experience.params.autoStart=urlParams.autoStart;}
if(urlParams.debuggerID!=undefined){experience.params.debuggerID=urlParams.debuggerID;}
if(urlParams.forceHTML!=undefined&&urlParams.forceHTML!==''){experience.params.forceHTML=urlParams.forceHTML;}
if(urlParams.forceFlashIFrame!=undefined&&urlParams.forceFlashIFrame!==''){experience.params.forceFlashIFrame=urlParams.forceFlashIFrame;}
if(urlParams.debug!=undefined&&urlParams.debug!==''){experience.params.debug=urlParams.debug;}
if(urlParams.showNoContentMessage!=undefined&&urlParams.showNoContentMessage!=''){experience.params.showNoContentMessage=urlParams.showNoContentMessage;}
if(urlParams.htmlDefaultBitrate!=undefined&&urlParams.htmlDefaultBitrate!==''){experience.params.htmlDefaultBitrate=urlParams.htmlDefaultBitrate;}
if(urlParams.linkSrc!=undefined&&urlParams.linkSrc!=''){experience.params.linkSrc=urlParams.linkSrc;}
var overrideContent=(urlParams.playerID.length<1&&urlParams.playerKey.length<1)||(urlParams.playerID==experience.params.playerID)||(urlParams.playerKey==experience.params.playerKey);if(overrideContent){if(urlParams.titleID.length>0){experience.params.videoID=urlParams.titleID;experience.params["@videoPlayer"]=urlParams.titleID;experience.params.autoStart=(experience.params.autoStart!="false"&&urlParams.autoStart!="false");}
if(urlParams.lineupID.length>0){experience.params.lineupID=urlParams.lineupID;}}
return experience;};brightcove.determinePlayerType=function(experience,flashSupport,htmlSupport){if(flashSupport==null&&htmlSupport==false){return brightcove.playerType.NO_SUPPORT;}
if(experience.params.forceHTML){if(window.console){var message="The forceHTML parameter was used for the Brightcove player. This value should ONLY be used for";message+=" development and testing purposes and is not supported in production environments.";console.log(message);}
return brightcove.playerType.HTML;}
if(experience.params.forceFlashIFrame||(brightcove.isMetroIE()&&flashSupport==null)){return brightcove.playerType.FLASH_IFRAME;}
if(flashSupport!=null){if(brightcove.isFlashVersionSufficient(experience,flashSupport)){return brightcove.playerType.FLASH;}else{return brightcove.playerType.INSTALLER;}}
if(htmlSupport){if(brightcove.isSupportedHTMLDevice()||experience.params.htmlFallback){return brightcove.playerType.HTML;}}
return brightcove.playerType.NO_SUPPORT;};brightcove.isFlashVersionSufficient=function(experience,flashSupport){if(flashSupport==null)return false;var setMajorVersion=false;var requestedMajorVersion;var requestedMajorRevision;var requestedMinorRevision;if(experience.params.majorVersion!=undefined){requestedMajorVersion=parseInt(experience.params.majorVersion,10);setMajorVersion=true;}else{requestedMajorVersion=brightcove.majorVersion;}
if(experience.params.majorRevision!=undefined){requestedMajorRevision=parseInt(experience.params.majorRevision,10);}else{if(setMajorVersion){requestedMajorRevision=0;}else{requestedMajorRevision=brightcove.majorRevision;}}
if(experience.params.minorRevision!=undefined){requestedMinorRevision=parseInt(experience.params.minorRevision,10);}else{if(setMajorVersion){requestedMinorRevision=0;}else{requestedMinorRevision=brightcove.minorRevision;}}
return(flashSupport.majorVersion>requestedMajorVersion||(flashSupport.majorVersion==requestedMajorVersion&&flashSupport.majorRevision>requestedMajorRevision)||(flashSupport.majorVersion==requestedMajorVersion&&flashSupport.majorRevision==requestedMajorRevision&&flashSupport.minorRevision>=requestedMinorRevision));};brightcove.generateRequestUrl=function(experience,playerType,secureConnections){var file;if(playerType==brightcove.playerType.INSTALLER){file=brightcove.cdnURL+"/viewer/playerProductInstall.swf";var MMPlayerType=brightcove.hasActiveX?"ActiveX":"PlugIn";document.title=document.title.slice(0,47)+" - Flash Player Installation";var MMdoctitle=document.title;file+="?&MMredirectURL="+window.location+'&MMplayerType='+MMPlayerType+'&MMdoctitle='+MMdoctitle;brightcove.reportUpgradeRequired(experience);}else{if(secureConnections){file=brightcove.getPubURL(brightcove.secureServicesURL,brightcove.pubSecureHost,experience.params.pubCode);}else{file=brightcove.getPubURL(brightcove.servicesURL,brightcove.pubHost,experience.params.pubCode);}
var servlet=(playerType==brightcove.playerType.HTML)?brightcove.servlet.HTML:brightcove.servlet.AS3;file+='/viewer/'+servlet+'?'+brightcove.getOverrides();for(var config in experience.params){file+='&'+encodeURIComponent(config)+'='+encodeURIComponent(experience.params[config]);}}
return file;};brightcove.renderInstallGif=function(experience,secureConnections){var containerID='_container'+experience.id;var container=brightcove.createElement('span');if(experience.params.height.charAt(experience.params.height.length-1)=="%"){container.style.display='block';}else{container.style.display='inline-block';}
container.id=containerID;var cdnURL=secureConnections?brightcove.secureCDNURL:brightcove.cdnURL;var upgradeFlashImage=cdnURL.indexOf('.co.jp')>0?"upgrade_flash_player_kk.gif":"upgrade_flash_player2.gif";var linkHTML="<a href='http://www.adobe.com/go/getflash/' target='_blank'><img src='"+cdnURL+"/viewer/"+upgradeFlashImage+"' alt='Get Flash Player' width='314' height='200' border='0'></a>";experience.parentNode.replaceChild(container,experience);document.getElementById(containerID).innerHTML=linkHTML;};brightcove.renderExperience=function(experience,file,playerType,secureConnections){var experienceElement;var experienceID=experience.id;var container;var timeout=brightcove.flashTimeoutInterval;if(!(experience.params.playerKey||experience.params.playerID||experience.params.playerId||experience.params.playerid)){if(window.console){console.log("No playerID or playerKey was found for the Brightcove player, so it can not be rendered.");}
return;}
brightcove.experienceObjects[experienceID]=experience;var unminified=(brightcove.getParameter("unminified")=="true")||(experience.params.unminified==="true");if(experience.params.includeAPI==="true"&&!(brightcove._apiRequested||brightcove.api)){var source="/js/api/";if(unminified){source+="unminified/";}
source+="SmartPlayerAPI.js";var apiInclude=brightcove.createElement('script');apiInclude.type="text/javascript";var cdnURL=secureConnections?brightcove.secureCDNURL:brightcove.cdnURL;apiInclude.src=cdnURL+source;experience.parentNode.appendChild(apiInclude);brightcove._apiRequested=true;}
file+="&startTime="+new Date().getTime();if(playerType===brightcove.playerType.HTML){timeout=brightcove.htmlTimeoutInterval;file+="&refURL="+(window.document.referrer?window.document.referrer:'not available');if(unminified){file+="&unminified=true";}
experienceElement=brightcove.createIFrame(experience);experience.parentNode.replaceChild(experienceElement,experience);brightcove.experiences[experienceID]=experienceElement;experience.element=experienceElement;if(experience.params.videoID||experience.params.videoId){file+="&"+encodeURIComponent("@videoPlayer")+"="+encodeURIComponent(experience.params.videoID||experience.params.videoId);}
experienceElement.src=file;}else if(playerType===brightcove.playerType.FLASH_IFRAME){var currentCDN=secureConnections?brightcove.secureCDNURL:brightcove.cdnURL;var iframeURL=currentCDN+"/js/flash_iframe.html?parentPage="+window.location.toString().split("?")[0];iframeURL+='&currentCDN='+currentCDN;if(unminified){iframeURL+='&unminified='+unminified;}
experienceElement=brightcove.createIFrame(experience);experience.parentNode.replaceChild(experienceElement,experience);brightcove.experiences[experienceID]=experienceElement;experience.element=experienceElement;experienceElement.src=iframeURL;window.addEventListener('message',function(event){if(event.origin.split("/")[2]!==currentCDN.split("/")[2])return;var data=JSON.parse(event.data);if(data!="bcIframeInitialized"){return;}
var playerConfig;if(brightcove.hasActiveX){experience.flashParams.movie=file;var flashEmbedStr=brightcove.getFlashEmbedString(experience,secureConnections);playerConfig={activeX:flashEmbedStr,height:experience.params.height,id:'_container'+experience.id,file:file};}else{playerConfig=brightcove.getFlashObjectParams(experience,file);}
var playerConfigStr=JSON.stringify(playerConfig);experienceElement.contentWindow.postMessage(playerConfigStr,currentCDN);},false);window.addEventListener('message',function(event){if(event.origin.split("/")[2]!==currentCDN.split("/")[2])return;var data=JSON.parse(event.data);if(data.api&&brightcove.internal&&brightcove.internal._setAPICallback){if(data.api=="apiCallback"){brightcove.internal._setAPICallback(data.pid,data.callback,iframeURL);}else if(data.api=="loadEvent"){window[data.callback](data.event);}else if(data.api=="onTemplateReadyEvent"){brightcove[data.callback](data.event);}}},false);}else{if(brightcove.hasActiveX){experience.flashParams.movie=file;var flashEmbedStr=brightcove.getFlashEmbedString(experience,secureConnections);var containerID='_container'+experience.id;container=brightcove.createFlashEmbed(containerID,experience.params.height);experience.parentNode.replaceChild(container,experience);document.getElementById(containerID).innerHTML=flashEmbedStr;brightcove.experiences[experienceID]=container;}else{var flashObjectParams=brightcove.getFlashObjectParams(experience,file);experienceElement=brightcove.createFlashObject(flashObjectParams);experience.parentNode.replaceChild(experienceElement,experience);brightcove.experiences[experienceID]=experienceElement;}}
brightcove.timeouts[experience.id]=setTimeout(function(){brightcove.handleExperienceTimeout(experienceID);},timeout);};brightcove.createIFrame=function(experience){var iframeElement=brightcove.createElement('iframe');iframeElement.id=experience.id;iframeElement.width=experience.params.width;iframeElement.height=experience.params.height;iframeElement.className=experience.className;iframeElement.frameborder=0;iframeElement.scrolling="no";iframeElement.style.borderStyle="none";return iframeElement;};brightcove.getFlashEmbedString=function(experience,secureConnections){var options='';var flashParams=experience.flashParams;for(var pOption in flashParams){options+='<param name="'+pOption+'" value="'+experience.flashParams[pOption]+'" />';}
var protocol=secureConnections?"https":"http";return'<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'
+' codebase="'+protocol+'://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version='+brightcove.majorVersion+','+brightcove.majorRevision+','+brightcove.minorRevision+',0"'
+' id="'+experience.id+'"'
+' width="'+experience.params.width+'"'
+' height="'+experience.params.height+'"'
+' type="application/x-shockwave-flash"'
+' class="BrightcoveExperience">'
+options
+'</object>';};brightcove.getFlashObjectParams=function(experience,file){var experienceObject={};experienceObject.type='application/x-shockwave-flash';experienceObject.data=file;experienceObject.id=experience.params.flashID;experienceObject.width=experience.params.width;experienceObject.height=experience.params.height;experienceObject.className=experience.className;experienceObject.seamlesstabbing=experience.flashParams.seamlessTabbing;for(var config in experience.flashParams){experienceObject["flashParam_"+config]=experience.flashParams[config];}
return experienceObject;};brightcove.createFlashEmbed=function(experienceId,height){var container=brightcove.createElement('span');if(height.charAt(height.length-1)=="%"){container.style.display='block';}else{container.style.display='inline-block';}
container.id=experienceId;return container;};brightcove.createFlashObject=function(playerConfig){var experienceElement=brightcove.createElement('object');experienceElement.type=playerConfig.type;experienceElement.data=playerConfig.data;experienceElement.id=playerConfig.id;experienceElement.width=playerConfig.width;experienceElement.height=playerConfig.height;experienceElement.className=playerConfig.className;experienceElement.setAttribute("seamlesstabbing",playerConfig.seamlessTabbing);var tempParam;var flashParamPrefix="flashParam_";for(var config in playerConfig){var flashParamInd=config.indexOf(flashParamPrefix);if(flashParamInd==0){tempParam=brightcove.createElement('param');tempParam.name=config.substring(flashParamPrefix.length);tempParam.value=playerConfig[config];experienceElement.appendChild(tempParam);}}
return experienceElement;};brightcove.handleExperienceTimeout=function(pID){brightcove.executeErrorHandlerForExperience(brightcove.experienceObjects[pID],{type:"templateError",errorType:"serviceUnavailable",code:brightcove.errorCodes.SERVICE_UNAVAILABLE,info:pID});};brightcove.reportPlayerLoad=function(pID){var timeout=brightcove.timeouts[pID];if(timeout){clearTimeout(timeout);}};brightcove.reportUpgradeRequired=function(pExperience){brightcove.executeErrorHandlerForExperience(pExperience,{type:"templateError",errorType:"upgradeRequiredForPlayer",code:brightcove.errorCodes.UPGRADE_REQUIRED_FOR_PLAYER,info:pExperience.id});};brightcove.checkFlashSupport=function(){var hasActiveX=(window.ActiveXObject!=undefined);return(hasActiveX)?brightcove.checkFlashSupportIE():brightcove.checkFlashSupportStandard();};brightcove.checkFlashSupportIE=function(){var versions;try{var flash=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");var version=flash.GetVariable('$version');versions=/ ([0-9]+),([0-9]+),([0-9]+),/.exec(version);}catch(exception){return null;}
return{majorVersion:versions[1],majorRevision:versions[2],minorRevision:versions[3]};};brightcove.isMetroIE=function(){var version=0;if(navigator.appVersion.indexOf("MSIE")!=-1){var appSplit=navigator.appVersion.split("MSIE");if(appSplit.length>1){version=parseFloat(appSplit[1]);}}
if(version<10||isNaN(version)){return false;}
var activeXSupport=false;try{activeXSupport=!!new ActiveXObject("htmlfile");}catch(e){activeXSupport=false;}
return!activeXSupport;};brightcove.checkFlashSupportStandard=function(){var versions;var majorVersion;var majorRevision;var minorRevision;try{if(typeof navigator.plugins!='undefined'&&navigator.plugins.length>0){if(navigator.plugins["Shockwave Flash 2.0"]||navigator.plugins["Shockwave Flash"]){var swfVersion=navigator.plugins["Shockwave Flash 2.0"]?" 2.0":"";var description=navigator.plugins["Shockwave Flash"+swfVersion].description;var filename=navigator.plugins["Shockwave Flash"+swfVersion].filename;if(filename.match){if(filename.toLowerCase().match(/lite/)){throw new Error();}}
versions=description.split(" ");majorVersion=versions[2].split(".")[0];majorRevision=versions[2].split(".")[1];minorRevision=versions[3];if(minorRevision==""){minorRevision=versions[4];}
if(minorRevision[0]=="d"){minorRevision=minorRevision.substring(1);}else if(minorRevision[0]=="r"){minorRevision=minorRevision.substring(1);if(minorRevision.indexOf("d")>0){minorRevision=minorRevision.substring(0,minorRevision.indexOf("d"));}}}else{throw new Error();}}else{return null;}}catch(exception){return null;}
return{majorVersion:majorVersion,majorRevision:majorRevision,minorRevision:minorRevision};};brightcove.checkHtmlSupport=function(){var v=brightcove.createElement('video');var videoSupport=true;if(!brightcove.userAgent.match(new RegExp("android","i"))){videoSupport=!!(v.canPlayType&&v.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"').replace(/no/,''));}
if(brightcove.userAgent.match(/BlackBerry.*Version\/6\.0/)){return false;}
var canvasSupport=!!brightcove.createElement('canvas').getContext;return videoSupport&&canvasSupport;};brightcove.isSupportedHTMLDevice=function(pUAString){var types=["iPad","iPhone","iPod","android","Silk"];var numTypes=types.length;var uaString=pUAString||brightcove.userAgent;for(var i=0;i<numTypes;i++){if(uaString.match(new RegExp(types[i],"i"))){return true;}}
return false;};brightcove.getTechnology=function(pExperienceId){for(var id in brightcove.experiences){if(pExperienceId==id){return(brightcove.experiences[id].tagName=="object")?brightcove.playerType.FLASH:brightcove.playerType.HTML;}}
return brightcove.playerType.NO_SUPPORT;};brightcove.respondToMessages=function(pMessage){if(brightcove.verifyMessage(pMessage)){var messageData=pMessage.data;if(messageData.charAt(0)=="\""){if(window.JSON){messageData=window.JSON.parse(messageData);}else{messageData=brightcove.json_parse(messageData);}}
var messageParts=messageData.split("::");var type=messageParts[1];var messageInfo="";for(var index=2;index<messageParts.length;index++){messageInfo+=messageParts[index];}
var messageJson=messageInfo.split("\n").join(" ");var messageDataObject;if(window.JSON){messageDataObject=window.JSON.parse(messageJson);}else{messageDataObject=brightcove.json_parse(messageJson);}
switch(type){case"error":brightcove.executeMessageCallback(messageDataObject,brightcove.executeErrorHandlerForExperience);break;case"api":brightcove.handleAPICallForHTML(messageDataObject);break;case"handler":var event=brightcove.internal._convertDates(messageDataObject.event);try{brightcove.internal._handlers[messageDataObject.handler](event);}catch(e){}
break;case"asyncGetter":var data=brightcove.internal._convertDates(messageDataObject.data);brightcove.internal._handlers[messageDataObject.handler](data);break;}}};brightcove.verifyMessage=function(pMessage){return(/^brightcove\.player/).test(pMessage.data);};brightcove.handleAPICallForHTML=function(pMessageObject){var experience=brightcove.experienceObjects[pMessageObject.id];if(experience==null){return;}
var id=experience.id;var method=pMessageObject.method;switch(method){case"initializeBridge":brightcove.reportPlayerLoad(id);if(pMessageObject.arguments[0]){if(brightcove.internal!=null){brightcove.internal._setAPICallback(id,null,pMessageObject.arguments[1]);brightcove.callHandlerForPlayer(experience,"templateLoadHandler",id);}else if(brightcove._apiRequested){brightcove._queuedAPICalls.push(pMessageObject);}}
break;case"callTemplateReady":if(brightcove._apiRequested&&!brightcove.internal){brightcove._queuedAPICalls.push(pMessageObject);}else{var event=pMessageObject.arguments;brightcove._addModuleToEvent(id,event);brightcove.callHandlerForPlayer(experience,"templateReadyHandler",event);}
break;}};brightcove._addModuleToEvent=function(pID,pEvent){if(pEvent.type!=null&&brightcove.api){var experience=brightcove.api.getExperience(pID);if(experience){pEvent.target=experience.getModule("experience");}}};brightcove.callHandlerForPlayer=function(pExperience,pHandler,pArgument){if(pExperience&&pExperience.params&&pExperience.params[pHandler]){var namespaceArray=pExperience.params[pHandler].split(".");var namespaces;if((namespaces=namespaceArray.length)>1){var trace=window;for(var i=0;i<namespaces;i++){trace=trace[namespaceArray[i]];}
if(typeof trace==="function"){trace(pArgument);}}else{window[pExperience.params[pHandler]](pArgument);}}};brightcove.executeErrorHandlerForExperience=function(pExperience,pErrorObject){brightcove.callHandlerForPlayer(pExperience,"templateErrorHandler",pErrorObject);};brightcove.executeMessageCallback=function(pMessageDataObject,pCallback){var experience;for(var experienceKey in brightcove.experienceObjects){experience=brightcove.experienceObjects[experienceKey];if(experience.element.src===pMessageDataObject.__srcUrl){delete pMessageDataObject.__srcUrl;pCallback(experience,pMessageDataObject);break;}}};brightcove.createExperience=function(pElement,pParentOrSibling,pAppend){if(!pElement.id||pElement.id.length<1){pElement.id='bcExperienceObj'+(brightcove.experienceNum++);}
if(pAppend){pParentOrSibling.appendChild(pElement);}else{pParentOrSibling.parentNode.insertBefore(pElement,pParentOrSibling);}
brightcove.createExperiences(null,pElement.id);};brightcove.removeExperience=function(pID){if(brightcove.experiences[pID]!=null){brightcove.experiences[pID].parentNode.removeChild(brightcove.experiences[pID]);}};brightcove.getURL=function(){var url;if(typeof window.location.search!='undefined'){url=window.location.search;}else{url=/(\?.*)$/.exec(document.location.href);}
return url;};brightcove.getOverrides=function(){var url=brightcove.getURL();var query=new RegExp('@[\\w\\.]+=[^&]+','g');var value=query.exec(url);var overrides="";while(value!=null){overrides+="&"+value;value=query.exec(url);}
return overrides;};brightcove.getParameter=function(pName,pDefaultValue){if(pDefaultValue==null)pDefaultValue="";var url=brightcove.getURL();var query=new RegExp(pName+'=([^&]*)');var value=query.exec(url);if(value!=null){return value[1];}else{return pDefaultValue;}};brightcove.createElement=function(el){if(document.createElementNS){return document.createElementNS('http://www.w3.org/1999/xhtml',el);}else{return document.createElement(el);}};brightcove.i18n={'BROWSER_TOO_OLD':'The browser you are using is too old. Please upgrade to the latest version of your browser.'};brightcove.removeListeners=function(){if(/KHTML/i.test(navigator.userAgent)){clearInterval(checkLoad);document.removeEventListener('load',brightcove.createExperiences,false);}
if(typeof document.addEventListener!='undefined'){document.removeEventListener('DOMContentLoaded',brightcove.createExperiences,false);document.removeEventListener('load',brightcove.createExperiences,false);}else if(typeof window.attachEvent!='undefined'){window.detachEvent('onload',brightcove.createExperiences);}};brightcove.getPubURL=function(source,host,pubCode){if(!pubCode||pubCode=="")return source;var re=/^([htps]{4,5}\:\/\/)([^\/\:]+)/i;host=host.replace("$pubcode$",pubCode).replace("$zoneprefix$$zone$",brightcove.pubSubdomain);return source.replace(re,"$1"+host);};brightcove.createExperiencesPostLoad=function(){brightcove.removeListeners();brightcove.createExperiences();};brightcove.encode=function(string){string=escape(string);string=string.replace(/\+/g,"%2B");string=string.replace(/\-/g,"%2D");string=string.replace(/\*/g,"%2A");string=string.replace(/\//g,"%2F");string=string.replace(/\./g,"%2E");string=string.replace(/_/g,"%5F");string=string.replace(/@/g,"%40");return string;};if(/KHTML/i.test(navigator.userAgent)){var checkLoad=setInterval(function(){if(/loaded|complete/.test(document.readyState)){clearInterval(checkLoad);brightcove.createExperiencesPostLoad();}},70);document.addEventListener('load',brightcove.createExperiencesPostLoad,false);}
if(typeof document.addEventListener!='undefined'){document.addEventListener('DOMContentLoaded',brightcove.createExperiencesPostLoad,false);document.addEventListener('load',brightcove.createExperiencesPostLoad,false);window.addEventListener("message",brightcove.respondToMessages,false);}else if(typeof window.attachEvent!='undefined'){window.attachEvent('onload',brightcove.createExperiencesPostLoad);}else{alert(brightcove.i18n.BROWSER_TOO_OLD);}}
brightcove.json_parse=(function(){"use strict";var state,stack,container,key,value,escapes={'\\':'\\','"':'"','/':'/','t':'\t','n':'\n','r':'\r','f':'\f','b':'\b'},string={go:function(){state='ok';},firstokey:function(){key=value;state='colon';},okey:function(){key=value;state='colon';},ovalue:function(){state='ocomma';},firstavalue:function(){state='acomma';},avalue:function(){state='acomma';}},number={go:function(){state='ok';},ovalue:function(){state='ocomma';},firstavalue:function(){state='acomma';},avalue:function(){state='acomma';}},action={'{':{go:function(){stack.push({state:'ok'});container={};state='firstokey';},ovalue:function(){stack.push({container:container,state:'ocomma',key:key});container={};state='firstokey';},firstavalue:function(){stack.push({container:container,state:'acomma'});container={};state='firstokey';},avalue:function(){stack.push({container:container,state:'acomma'});container={};state='firstokey';}},'}':{firstokey:function(){var pop=stack.pop();value=container;container=pop.container;key=pop.key;state=pop.state;},ocomma:function(){var pop=stack.pop();container[key]=value;value=container;container=pop.container;key=pop.key;state=pop.state;}},'[':{go:function(){stack.push({state:'ok'});container=[];state='firstavalue';},ovalue:function(){stack.push({container:container,state:'ocomma',key:key});container=[];state='firstavalue';},firstavalue:function(){stack.push({container:container,state:'acomma'});container=[];state='firstavalue';},avalue:function(){stack.push({container:container,state:'acomma'});container=[];state='firstavalue';}},']':{firstavalue:function(){var pop=stack.pop();value=container;container=pop.container;key=pop.key;state=pop.state;},acomma:function(){var pop=stack.pop();container.push(value);value=container;container=pop.container;key=pop.key;state=pop.state;}},':':{colon:function(){if(Object.hasOwnProperty.call(container,key)){throw new SyntaxError('Duplicate key "'+key+'"');}
state='ovalue';}},',':{ocomma:function(){container[key]=value;state='okey';},acomma:function(){container.push(value);state='avalue';}},'true':{go:function(){value=true;state='ok';},ovalue:function(){value=true;state='ocomma';},firstavalue:function(){value=true;state='acomma';},avalue:function(){value=true;state='acomma';}},'false':{go:function(){value=false;state='ok';},ovalue:function(){value=false;state='ocomma';},firstavalue:function(){value=false;state='acomma';},avalue:function(){value=false;state='acomma';}},'null':{go:function(){value=null;state='ok';},ovalue:function(){value=null;state='ocomma';},firstavalue:function(){value=null;state='acomma';},avalue:function(){value=null;state='acomma';}}};function debackslashify(text){return text.replace(/\\(?:u(.{4})|([^u]))/g,function(a,b,c){return b?String.fromCharCode(parseInt(b,16)):escapes[c];});}
return function(source,reviver){var r,tx=/^[\x20\t\n\r]*(?:([,:\[\]{}]|true|false|null)|(-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)|"((?:[^\r\n\t\\\"]|\\(?:["\\\/trnfb]|u[0-9a-fA-F]{4}))*)")/;state='go';stack=[];try{for(;;){r=tx.exec(source);if(!r){break;}
if(r[1]){action[r[1]][state]();}else if(r[2]){value=+r[2];number[state]();}else{value=debackslashify(r[3]);string[state]();}
source=source.slice(r[0].length);}}catch(e){state=e;}
if(state!=='ok'||(/[^\x20\t\n\r]/).test(source)){throw state instanceof SyntaxError?state:new SyntaxError('JSON');}
return typeof reviver==='function'?(function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}
return reviver.call(holder,key,value);}({'':value},'')):value;};}());


Function.prototype.bind=Function.prototype.bind||function(b){if(typeof this!=="function"){throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");}var a=Array.prototype.slice,f=a.call(arguments,1),e=this,c=function(){},d=function(){return e.apply(this instanceof c?this:b||window,f.concat(a.call(arguments)));};c.prototype=this.prototype;d.prototype=new c();return d;};


/*
 * jQuery FlexSlider v2.5.0
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */
;
(function ($) {

  //FlexSlider: Object Instance
  $.flexslider = function(el, options) {
    var slider = $(el);

    // making variables public
    slider.vars = $.extend({}, $.flexslider.defaults, options);

    var namespace = slider.vars.namespace,
        msGesture = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
        touch = (( "ontouchstart" in window ) || msGesture || window.DocumentTouch && document instanceof DocumentTouch) && slider.vars.touch,
        // depricating this idea, as devices are being released with both of these events
        //eventType = (touch) ? "touchend" : "click",
        eventType = "click touchend MSPointerUp keyup",
        watchedEvent = "",
        watchedEventClearTimer,
        vertical = slider.vars.direction === "vertical",
        reverse = slider.vars.reverse,
        carousel = (slider.vars.itemWidth > 0),
        fade = slider.vars.animation === "fade",
        asNav = slider.vars.asNavFor !== "",
        methods = {},
        focused = true;

    // Store a reference to the slider object
    $.data(el, "flexslider", slider);

    // Private slider methods
    methods = {
      init: function() {
        slider.animating = false;
        // Get current slide and make sure it is a number
        slider.currentSlide = parseInt( ( slider.vars.startAt ? slider.vars.startAt : 0), 10 );
        if ( isNaN( slider.currentSlide ) ) { slider.currentSlide = 0; }
        slider.animatingTo = slider.currentSlide;
        slider.atEnd = (slider.currentSlide === 0 || slider.currentSlide === slider.last);
        slider.containerSelector = slider.vars.selector.substr(0,slider.vars.selector.search(' '));
        slider.slides = $(slider.vars.selector, slider);
        slider.container = $(slider.containerSelector, slider);
        slider.count = slider.slides.length;
        // SYNC:
        slider.syncExists = $(slider.vars.sync).length > 0;
        // SLIDE:
        if (slider.vars.animation === "slide") { slider.vars.animation = "swing"; }
        slider.prop = (vertical) ? "top" : "marginLeft";
        slider.args = {};
        // SLIDESHOW:
        slider.manualPause = false;
        slider.stopped = false;
        //PAUSE WHEN INVISIBLE
        slider.started = false;
        slider.startTimeout = null;
        // TOUCH/USECSS:
        slider.transitions = !slider.vars.video && !fade && slider.vars.useCSS && (function() {
          var obj = document.createElement('div'),
              props = ['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
          for (var i in props) {
            if ( obj.style[ props[i] ] !== undefined ) {
              slider.pfx = props[i].replace('Perspective','').toLowerCase();
              slider.prop = "-" + slider.pfx + "-transform";
              return true;
            }
          }
          return false;
        }());
        slider.ensureAnimationEnd = '';
        // CONTROLSCONTAINER:
        if (slider.vars.controlsContainer !== "") slider.controlsContainer = $(slider.vars.controlsContainer).length > 0 && $(slider.vars.controlsContainer);
        // MANUAL:
        if (slider.vars.manualControls !== "") slider.manualControls = $(slider.vars.manualControls).length > 0 && $(slider.vars.manualControls);

        // CUSTOM DIRECTION NAV:
        if (slider.vars.customDirectionNav !== "") slider.customDirectionNav = $(slider.vars.customDirectionNav).length === 2 && $(slider.vars.customDirectionNav);

        // RANDOMIZE:
        if (slider.vars.randomize) {
          slider.slides.sort(function() { return (Math.round(Math.random())-0.5); });
          slider.container.empty().append(slider.slides);
        }

        slider.doMath();

        // INIT
        slider.setup("init");

        // CONTROLNAV:
        if (slider.vars.controlNav) { methods.controlNav.setup(); }

        // DIRECTIONNAV:
        if (slider.vars.directionNav) { methods.directionNav.setup(); }

        // KEYBOARD:
        if (slider.vars.keyboard && ($(slider.containerSelector).length === 1 || slider.vars.multipleKeyboard)) {
          $(document).bind('keyup', function(event) {
            var keycode = event.keyCode;
            if (!slider.animating && (keycode === 39 || keycode === 37)) {
              var target = (keycode === 39) ? slider.getTarget('next') :
                           (keycode === 37) ? slider.getTarget('prev') : false;
              slider.flexAnimate(target, slider.vars.pauseOnAction);
            }
          });
        }
        // MOUSEWHEEL:
        if (slider.vars.mousewheel) {
          slider.bind('mousewheel', function(event, delta, deltaX, deltaY) {
            event.preventDefault();
            var target = (delta < 0) ? slider.getTarget('next') : slider.getTarget('prev');
            slider.flexAnimate(target, slider.vars.pauseOnAction);
          });
        }

        // PAUSEPLAY
        if (slider.vars.pausePlay) { methods.pausePlay.setup(); }

        //PAUSE WHEN INVISIBLE
        if (slider.vars.slideshow && slider.vars.pauseInvisible) { methods.pauseInvisible.init(); }

        // SLIDSESHOW
        if (slider.vars.slideshow) {
          if (slider.vars.pauseOnHover) {
            slider.hover(function() {
              if (!slider.manualPlay && !slider.manualPause) { slider.pause(); }
            }, function() {
              if (!slider.manualPause && !slider.manualPlay && !slider.stopped) { slider.play(); }
            });
          }
          // initialize animation
          //If we're visible, or we don't use PageVisibility API
          if(!slider.vars.pauseInvisible || !methods.pauseInvisible.isHidden()) {
            (slider.vars.initDelay > 0) ? slider.startTimeout = setTimeout(slider.play, slider.vars.initDelay) : slider.play();
          }
        }

        // ASNAV:
        if (asNav) { methods.asNav.setup(); }

        // TOUCH
        if (touch && slider.vars.touch) { methods.touch(); }

        // FADE&&SMOOTHHEIGHT || SLIDE:
        if (!fade || (fade && slider.vars.smoothHeight)) { $(window).bind("resize orientationchange focus", methods.resize); }

        slider.find("img").attr("draggable", "false");

        // API: start() Callback
        setTimeout(function(){
          slider.vars.start(slider);
        }, 200);
      },
      asNav: {
        setup: function() {
          slider.asNav = true;
          slider.animatingTo = Math.floor(slider.currentSlide/slider.move);
          slider.currentItem = slider.currentSlide;
          slider.slides.removeClass(namespace + "active-slide").eq(slider.currentItem).addClass(namespace + "active-slide");
          if(!msGesture){
              slider.slides.on(eventType, function(e){
                e.preventDefault();
                var $slide = $(this),
                    target = $slide.index();
                var posFromLeft = $slide.offset().left - $(slider).scrollLeft(); // Find position of slide relative to left of slider container
                if( posFromLeft <= 0 && $slide.hasClass( namespace + 'active-slide' ) ) {
                  slider.flexAnimate(slider.getTarget("prev"), true);
                } else if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass(namespace + "active-slide")) {
                  slider.direction = (slider.currentItem < target) ? "next" : "prev";
                  slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true);
                }
              });
          }else{
              el._slider = slider;
              slider.slides.each(function (){
                  var that = this;
                  that._gesture = new MSGesture();
                  that._gesture.target = that;
                  that.addEventListener("MSPointerDown", function (e){
                      e.preventDefault();
                      if(e.currentTarget._gesture) {
                        e.currentTarget._gesture.addPointer(e.pointerId);
                      }
                  }, false);
                  that.addEventListener("MSGestureTap", function (e){
                      e.preventDefault();
                      var $slide = $(this),
                          target = $slide.index();
                      if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass('active')) {
                          slider.direction = (slider.currentItem < target) ? "next" : "prev";
                          slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true);
                      }
                  });
              });
          }
        }
      },
      controlNav: {
        setup: function() {
          if (!slider.manualControls) {
            methods.controlNav.setupPaging();
          } else { // MANUALCONTROLS:
            methods.controlNav.setupManual();
          }
        },
        setupPaging: function() {
          var type = (slider.vars.controlNav === "thumbnails") ? 'control-thumbs' : 'control-paging',
              j = 1,
              item,
              slide;

          slider.controlNavScaffold = $('<ol class="'+ namespace + 'control-nav ' + namespace + type + '"></ol>');

          if (slider.pagingCount > 1) {
            for (var i = 0; i < slider.pagingCount; i++) {
              slide = slider.slides.eq(i);
              item = (slider.vars.controlNav === "thumbnails") ? '<img src="' + slide.attr( 'data-thumb' ) + '"/>' : '<a>' + j + '</a>';
              if ( 'thumbnails' === slider.vars.controlNav && true === slider.vars.thumbCaptions ) {
                var captn = slide.attr( 'data-thumbcaption' );
                if ( '' !== captn && undefined !== captn ) { item += '<span class="' + namespace + 'caption">' + captn + '</span>'; }
              }
              slider.controlNavScaffold.append('<li>' + item + '</li>');
              j++;
            }
          }

          // CONTROLSCONTAINER:
          (slider.controlsContainer) ? $(slider.controlsContainer).append(slider.controlNavScaffold) : slider.append(slider.controlNavScaffold);
          methods.controlNav.set();

          methods.controlNav.active();

          slider.controlNavScaffold.delegate('a, img', eventType, function(event) {
            event.preventDefault();

            if (watchedEvent === "" || watchedEvent === event.type) {
              var $this = $(this),
                  target = slider.controlNav.index($this);

              if (!$this.hasClass(namespace + 'active')) {
                slider.direction = (target > slider.currentSlide) ? "next" : "prev";
                slider.flexAnimate(target, slider.vars.pauseOnAction);
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();

          });
        },
        setupManual: function() {
          slider.controlNav = slider.manualControls;
          methods.controlNav.active();

          slider.controlNav.bind(eventType, function(event) {
            event.preventDefault();

            if (watchedEvent === "" || watchedEvent === event.type) {
              var $this = $(this),
                  target = slider.controlNav.index($this);

              if (!$this.hasClass(namespace + 'active')) {
                (target > slider.currentSlide) ? slider.direction = "next" : slider.direction = "prev";
                slider.flexAnimate(target, slider.vars.pauseOnAction);
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        set: function() {
          var selector = (slider.vars.controlNav === "thumbnails") ? 'img' : 'a';
          slider.controlNav = $('.' + namespace + 'control-nav li ' + selector, (slider.controlsContainer) ? slider.controlsContainer : slider);
        },
        active: function() {
          slider.controlNav.removeClass(namespace + "active").eq(slider.animatingTo).addClass(namespace + "active");
        },
        update: function(action, pos) {
          if (slider.pagingCount > 1 && action === "add") {
            slider.controlNavScaffold.append($('<li><a>' + slider.count + '</a></li>'));
          } else if (slider.pagingCount === 1) {
            slider.controlNavScaffold.find('li').remove();
          } else {
            slider.controlNav.eq(pos).closest('li').remove();
          }
          methods.controlNav.set();
          (slider.pagingCount > 1 && slider.pagingCount !== slider.controlNav.length) ? slider.update(pos, action) : methods.controlNav.active();
        }
      },
      directionNav: {
        setup: function() {
          var directionNavScaffold = $('<ul class="' + namespace + 'direction-nav"><li class="' + namespace + 'nav-prev"><a class="' + namespace + 'prev" href="#">' + slider.vars.prevText + '</a></li><li class="' + namespace + 'nav-next"><a class="' + namespace + 'next" href="#">' + slider.vars.nextText + '</a></li></ul>');

          // CUSTOM DIRECTION NAV:
          if (slider.customDirectionNav) {
            slider.directionNav = slider.customDirectionNav;
          // CONTROLSCONTAINER:
          } else if (slider.controlsContainer) {
            $(slider.controlsContainer).append(directionNavScaffold);
            slider.directionNav = $('.' + namespace + 'direction-nav li a', slider.controlsContainer);
          } else {
            slider.append(directionNavScaffold);
            slider.directionNav = $('.' + namespace + 'direction-nav li a', slider);
          }

          methods.directionNav.update();

          slider.directionNav.bind(eventType, function(event) {
            event.preventDefault();
            var target;

            if (watchedEvent === "" || watchedEvent === event.type) {
              target = ($(this).hasClass(namespace + 'next')) ? slider.getTarget('next') : slider.getTarget('prev');
              slider.flexAnimate(target, slider.vars.pauseOnAction);
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        update: function() {
          var disabledClass = namespace + 'disabled';
          if (slider.pagingCount === 1) {
            slider.directionNav.addClass(disabledClass).attr('tabindex', '-1');
          } else if (!slider.vars.animationLoop) {
            if (slider.animatingTo === 0) {
              slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "prev").addClass(disabledClass).attr('tabindex', '-1');
            } else if (slider.animatingTo === slider.last) {
              slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "next").addClass(disabledClass).attr('tabindex', '-1');
            } else {
              slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
            }
          } else {
            slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
          }
        }
      },
      pausePlay: {
        setup: function() {
          var pausePlayScaffold = $('<div class="' + namespace + 'pauseplay"><a></a></div>');

          // CONTROLSCONTAINER:
          if (slider.controlsContainer) {
            slider.controlsContainer.append(pausePlayScaffold);
            slider.pausePlay = $('.' + namespace + 'pauseplay a', slider.controlsContainer);
          } else {
            slider.append(pausePlayScaffold);
            slider.pausePlay = $('.' + namespace + 'pauseplay a', slider);
          }

          methods.pausePlay.update((slider.vars.slideshow) ? namespace + 'pause' : namespace + 'play');

          slider.pausePlay.bind(eventType, function(event) {
            event.preventDefault();

            if (watchedEvent === "" || watchedEvent === event.type) {
              if ($(this).hasClass(namespace + 'pause')) {
                slider.manualPause = true;
                slider.manualPlay = false;
                slider.pause();
              } else {
                slider.manualPause = false;
                slider.manualPlay = true;
                slider.play();
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        update: function(state) {
          (state === "play") ? slider.pausePlay.removeClass(namespace + 'pause').addClass(namespace + 'play').html(slider.vars.playText) : slider.pausePlay.removeClass(namespace + 'play').addClass(namespace + 'pause').html(slider.vars.pauseText);
        }
      },
      touch: function() {
        var startX,
          startY,
          offset,
          cwidth,
          dx,
          startT,
          onTouchStart,
          onTouchMove,
          onTouchEnd,
          scrolling = false,
          localX = 0,
          localY = 0,
          accDx = 0;

        if(!msGesture){
            onTouchStart = function(e) {
              if (slider.animating) {
                e.preventDefault();
              } else if ( ( window.navigator.msPointerEnabled ) || e.touches.length === 1 ) {
                slider.pause();
                // CAROUSEL:
                cwidth = (vertical) ? slider.h : slider. w;
                startT = Number(new Date());
                // CAROUSEL:

                // Local vars for X and Y points.
                localX = e.touches[0].pageX;
                localY = e.touches[0].pageY;

                offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
                         (carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                         (carousel && slider.currentSlide === slider.last) ? slider.limit :
                         (carousel) ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide :
                         (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
                startX = (vertical) ? localY : localX;
                startY = (vertical) ? localX : localY;

                el.addEventListener('touchmove', onTouchMove, false);
                el.addEventListener('touchend', onTouchEnd, false);
              }
            };

            onTouchMove = function(e) {
              // Local vars for X and Y points.

              localX = e.touches[0].pageX;
              localY = e.touches[0].pageY;

              dx = (vertical) ? startX - localY : startX - localX;
              scrolling = (vertical) ? (Math.abs(dx) < Math.abs(localX - startY)) : (Math.abs(dx) < Math.abs(localY - startY));

              var fxms = 500;

              if ( ! scrolling || Number( new Date() ) - startT > fxms ) {
                e.preventDefault();
                if (!fade && slider.transitions) {
                  if (!slider.vars.animationLoop) {
                    dx = dx/((slider.currentSlide === 0 && dx < 0 || slider.currentSlide === slider.last && dx > 0) ? (Math.abs(dx)/cwidth+2) : 1);
                  }
                  slider.setProps(offset + dx, "setTouch");
                }
              }
            };

            onTouchEnd = function(e) {
              // finish the touch by undoing the touch session
              el.removeEventListener('touchmove', onTouchMove, false);

              if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
                var updateDx = (reverse) ? -dx : dx,
                    target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

                if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth/2)) {
                  slider.flexAnimate(target, slider.vars.pauseOnAction);
                } else {
                  if (!fade) { slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true); }
                }
              }
              el.removeEventListener('touchend', onTouchEnd, false);

              startX = null;
              startY = null;
              dx = null;
              offset = null;
            };

            el.addEventListener('touchstart', onTouchStart, false);
        }else{
            el.style.msTouchAction = "none";
            el._gesture = new MSGesture();
            el._gesture.target = el;
            el.addEventListener("MSPointerDown", onMSPointerDown, false);
            el._slider = slider;
            el.addEventListener("MSGestureChange", onMSGestureChange, false);
            el.addEventListener("MSGestureEnd", onMSGestureEnd, false);

            function onMSPointerDown(e){
                e.stopPropagation();
                if (slider.animating) {
                    e.preventDefault();
                }else{
                    slider.pause();
                    el._gesture.addPointer(e.pointerId);
                    accDx = 0;
                    cwidth = (vertical) ? slider.h : slider. w;
                    startT = Number(new Date());
                    // CAROUSEL:

                    offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
                        (carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                            (carousel && slider.currentSlide === slider.last) ? slider.limit :
                                (carousel) ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide :
                                    (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
                }
            }

            function onMSGestureChange(e) {
                e.stopPropagation();
                var slider = e.target._slider;
                if(!slider){
                    return;
                }
                var transX = -e.translationX,
                    transY = -e.translationY;

                //Accumulate translations.
                accDx = accDx + ((vertical) ? transY : transX);
                dx = accDx;
                scrolling = (vertical) ? (Math.abs(accDx) < Math.abs(-transX)) : (Math.abs(accDx) < Math.abs(-transY));

                if(e.detail === e.MSGESTURE_FLAG_INERTIA){
                    setImmediate(function (){
                        el._gesture.stop();
                    });

                    return;
                }

                if (!scrolling || Number(new Date()) - startT > 500) {
                    e.preventDefault();
                    if (!fade && slider.transitions) {
                        if (!slider.vars.animationLoop) {
                            dx = accDx / ((slider.currentSlide === 0 && accDx < 0 || slider.currentSlide === slider.last && accDx > 0) ? (Math.abs(accDx) / cwidth + 2) : 1);
                        }
                        slider.setProps(offset + dx, "setTouch");
                    }
                }
            }

            function onMSGestureEnd(e) {
                e.stopPropagation();
                var slider = e.target._slider;
                if(!slider){
                    return;
                }
                if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
                    var updateDx = (reverse) ? -dx : dx,
                        target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

                    if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth/2)) {
                        slider.flexAnimate(target, slider.vars.pauseOnAction);
                    } else {
                        if (!fade) { slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true); }
                    }
                }

                startX = null;
                startY = null;
                dx = null;
                offset = null;
                accDx = 0;
            }
        }
      },
      resize: function() {
        if (!slider.animating && slider.is(':visible')) {
          if (!carousel) { slider.doMath(); }

          if (fade) {
            // SMOOTH HEIGHT:
            methods.smoothHeight();
          } else if (carousel) { //CAROUSEL:
            slider.slides.width(slider.computedW);
            slider.update(slider.pagingCount);
            slider.setProps();
          }
          else if (vertical) { //VERTICAL:
            slider.viewport.height(slider.h);
            slider.setProps(slider.h, "setTotal");
          } else {
            // SMOOTH HEIGHT:
            if (slider.vars.smoothHeight) { methods.smoothHeight(); }
            slider.newSlides.width(slider.computedW);
            slider.setProps(slider.computedW, "setTotal");
          }
        }
      },
      smoothHeight: function(dur) {
        if (!vertical || fade) {
          var $obj = (fade) ? slider : slider.viewport;
          (dur) ? $obj.animate({"height": slider.slides.eq(slider.animatingTo).height()}, dur) : $obj.height(slider.slides.eq(slider.animatingTo).height());
        }
      },
      sync: function(action) {
        var $obj = $(slider.vars.sync).data("flexslider"),
            target = slider.animatingTo;

        switch (action) {
          case "animate": $obj.flexAnimate(target, slider.vars.pauseOnAction, false, true); break;
          case "play": if (!$obj.playing && !$obj.asNav) { $obj.play(); } break;
          case "pause": $obj.pause(); break;
        }
      },
      uniqueID: function($clone) {
        // Append _clone to current level and children elements with id attributes
        $clone.filter( '[id]' ).add($clone.find( '[id]' )).each(function() {
          var $this = $(this);
          $this.attr( 'id', $this.attr( 'id' ) + '_clone' );
        });
        return $clone;
      },
      pauseInvisible: {
        visProp: null,
        init: function() {
          var visProp = methods.pauseInvisible.getHiddenProp();
          if (visProp) {
            var evtname = visProp.replace(/[H|h]idden/,'') + 'visibilitychange';
            document.addEventListener(evtname, function() {
              if (methods.pauseInvisible.isHidden()) {
                if(slider.startTimeout) {
                  clearTimeout(slider.startTimeout); //If clock is ticking, stop timer and prevent from starting while invisible
                } else { 
                  slider.pause(); //Or just pause
                }
              }
              else {
                if(slider.started) {
                  slider.play(); //Initiated before, just play
                } else { 
                  if (slider.vars.initDelay > 0) { 
                    setTimeout(slider.play, slider.vars.initDelay);
                  } else {
                    slider.play(); //Didn't init before: simply init or wait for it
                  } 
                }
              }
            });
          }
        },
        isHidden: function() {
          var prop = methods.pauseInvisible.getHiddenProp();
          if (!prop) {
            return false;
          }
          return document[prop];
        },
        getHiddenProp: function() {
          var prefixes = ['webkit','moz','ms','o'];
          // if 'hidden' is natively supported just return it
          if ('hidden' in document) {
            return 'hidden';
          }
          // otherwise loop over all the known prefixes until we find one
          for ( var i = 0; i < prefixes.length; i++ ) {
              if ((prefixes[i] + 'Hidden') in document) {
                return prefixes[i] + 'Hidden';
              }
          }
          // otherwise it's not supported
          return null;
        }
      },
      setToClearWatchedEvent: function() {
        clearTimeout(watchedEventClearTimer);
        watchedEventClearTimer = setTimeout(function() {
          watchedEvent = "";
        }, 3000);
      }
    };

    // public methods
    slider.flexAnimate = function(target, pause, override, withSync, fromNav) {
      if (!slider.vars.animationLoop && target !== slider.currentSlide) {
        slider.direction = (target > slider.currentSlide) ? "next" : "prev";
      }

      if (asNav && slider.pagingCount === 1) slider.direction = (slider.currentItem < target) ? "next" : "prev";

      if (!slider.animating && (slider.canAdvance(target, fromNav) || override) && slider.is(":visible")) {
        if (asNav && withSync) {
          var master = $(slider.vars.asNavFor).data('flexslider');
          slider.atEnd = target === 0 || target === slider.count - 1;
          master.flexAnimate(target, true, false, true, fromNav);
          slider.direction = (slider.currentItem < target) ? "next" : "prev";
          master.direction = slider.direction;

          if (Math.ceil((target + 1)/slider.visible) - 1 !== slider.currentSlide && target !== 0) {
            slider.currentItem = target;
            slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
            target = Math.floor(target/slider.visible);
          } else {
            slider.currentItem = target;
            slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
            return false;
          }
        }

        slider.animating = true;
        slider.animatingTo = target;

        // SLIDESHOW:
        if (pause) { slider.pause(); }

        // API: before() animation Callback
        slider.vars.before(slider);

        // SYNC:
        if (slider.syncExists && !fromNav) { methods.sync("animate"); }

        // CONTROLNAV
        if (slider.vars.controlNav) { methods.controlNav.active(); }

        // !CAROUSEL:
        // CANDIDATE: slide active class (for add/remove slide)
        if (!carousel) { slider.slides.removeClass(namespace + 'active-slide').eq(target).addClass(namespace + 'active-slide'); }

        // INFINITE LOOP:
        // CANDIDATE: atEnd
        slider.atEnd = target === 0 || target === slider.last;

        // DIRECTIONNAV:
        if (slider.vars.directionNav) { methods.directionNav.update(); }

        if (target === slider.last) {
          // API: end() of cycle Callback
          slider.vars.end(slider);
          // SLIDESHOW && !INFINITE LOOP:
          if (!slider.vars.animationLoop) { slider.pause(); }
        }

        // SLIDE:
        if (!fade) {
          var dimension = (vertical) ? slider.slides.filter(':first').height() : slider.computedW,
              margin, slideString, calcNext;

          // INFINITE LOOP / REVERSE:
          if (carousel) {
            //margin = (slider.vars.itemWidth > slider.w) ? slider.vars.itemMargin * 2 : slider.vars.itemMargin;
            margin = slider.vars.itemMargin;
            calcNext = ((slider.itemW + margin) * slider.move) * slider.animatingTo;
            slideString = (calcNext > slider.limit && slider.visible !== 1) ? slider.limit : calcNext;
          } else if (slider.currentSlide === 0 && target === slider.count - 1 && slider.vars.animationLoop && slider.direction !== "next") {
            slideString = (reverse) ? (slider.count + slider.cloneOffset) * dimension : 0;
          } else if (slider.currentSlide === slider.last && target === 0 && slider.vars.animationLoop && slider.direction !== "prev") {
            slideString = (reverse) ? 0 : (slider.count + 1) * dimension;
          } else {
            slideString = (reverse) ? ((slider.count - 1) - target + slider.cloneOffset) * dimension : (target + slider.cloneOffset) * dimension;
          }
          slider.setProps(slideString, "", slider.vars.animationSpeed);
          if (slider.transitions) {
            if (!slider.vars.animationLoop || !slider.atEnd) {
              slider.animating = false;
              slider.currentSlide = slider.animatingTo;
            }
            
            // Unbind previous transitionEnd events and re-bind new transitionEnd event
            slider.container.unbind("webkitTransitionEnd transitionend");
            slider.container.bind("webkitTransitionEnd transitionend", function() {
              clearTimeout(slider.ensureAnimationEnd);
              slider.wrapup(dimension);
            });

            // Insurance for the ever-so-fickle transitionEnd event
            clearTimeout(slider.ensureAnimationEnd);
            slider.ensureAnimationEnd = setTimeout(function() {
              slider.wrapup(dimension);
            }, slider.vars.animationSpeed + 100);

          } else {
            slider.container.animate(slider.args, slider.vars.animationSpeed, slider.vars.easing, function(){
              slider.wrapup(dimension);
            });
          }
        } else { // FADE:
          if (!touch) {
            //slider.slides.eq(slider.currentSlide).fadeOut(slider.vars.animationSpeed, slider.vars.easing);
            //slider.slides.eq(target).fadeIn(slider.vars.animationSpeed, slider.vars.easing, slider.wrapup);

            slider.slides.eq(slider.currentSlide).css({"zIndex": 1}).animate({"opacity": 0}, slider.vars.animationSpeed, slider.vars.easing);
            slider.slides.eq(target).css({"zIndex": 2}).animate({"opacity": 1}, slider.vars.animationSpeed, slider.vars.easing, slider.wrapup);

          } else {
            slider.slides.eq(slider.currentSlide).css({ "opacity": 0, "zIndex": 1 });
            slider.slides.eq(target).css({ "opacity": 1, "zIndex": 2 });
            slider.wrapup(dimension);
          }
        }
        // SMOOTH HEIGHT:
        if (slider.vars.smoothHeight) { methods.smoothHeight(slider.vars.animationSpeed); }
      }
    };
    slider.wrapup = function(dimension) {
      // SLIDE:
      if (!fade && !carousel) {
        if (slider.currentSlide === 0 && slider.animatingTo === slider.last && slider.vars.animationLoop) {
          slider.setProps(dimension, "jumpEnd");
        } else if (slider.currentSlide === slider.last && slider.animatingTo === 0 && slider.vars.animationLoop) {
          slider.setProps(dimension, "jumpStart");
        }
      }
      slider.animating = false;
      slider.currentSlide = slider.animatingTo;
      // API: after() animation Callback
      slider.vars.after(slider);
    };

    // SLIDESHOW:
    slider.animateSlides = function() {
      if (!slider.animating && focused ) { slider.flexAnimate(slider.getTarget("next")); }
    };
    // SLIDESHOW:
    slider.pause = function() {
      clearInterval(slider.animatedSlides);
      slider.animatedSlides = null;
      slider.playing = false;
      // PAUSEPLAY:
      if (slider.vars.pausePlay) { methods.pausePlay.update("play"); }
      // SYNC:
      if (slider.syncExists) { methods.sync("pause"); }
    };
    // SLIDESHOW:
    slider.play = function() {
      if (slider.playing) { clearInterval(slider.animatedSlides); }
      slider.animatedSlides = slider.animatedSlides || setInterval(slider.animateSlides, slider.vars.slideshowSpeed);
      slider.started = slider.playing = true;
      // PAUSEPLAY:
      if (slider.vars.pausePlay) { methods.pausePlay.update("pause"); }
      // SYNC:
      if (slider.syncExists) { methods.sync("play"); }
    };
    // STOP:
    slider.stop = function () {
      slider.pause();
      slider.stopped = true;
    };
    slider.canAdvance = function(target, fromNav) {
      // ASNAV:
      var last = (asNav) ? slider.pagingCount - 1 : slider.last;
      return (fromNav) ? true :
             (asNav && slider.currentItem === slider.count - 1 && target === 0 && slider.direction === "prev") ? true :
             (asNav && slider.currentItem === 0 && target === slider.pagingCount - 1 && slider.direction !== "next") ? false :
             (target === slider.currentSlide && !asNav) ? false :
             (slider.vars.animationLoop) ? true :
             (slider.atEnd && slider.currentSlide === 0 && target === last && slider.direction !== "next") ? false :
             (slider.atEnd && slider.currentSlide === last && target === 0 && slider.direction === "next") ? false :
             true;
    };
    slider.getTarget = function(dir) {
      slider.direction = dir;
      if (dir === "next") {
        return (slider.currentSlide === slider.last) ? 0 : slider.currentSlide + 1;
      } else {
        return (slider.currentSlide === 0) ? slider.last : slider.currentSlide - 1;
      }
    };

    // SLIDE:
    slider.setProps = function(pos, special, dur) {
      var target = (function() {
        var posCheck = (pos) ? pos : ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo,
            posCalc = (function() {
              if (carousel) {
                return (special === "setTouch") ? pos :
                       (reverse && slider.animatingTo === slider.last) ? 0 :
                       (reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                       (slider.animatingTo === slider.last) ? slider.limit : posCheck;
              } else {
                switch (special) {
                  case "setTotal": return (reverse) ? ((slider.count - 1) - slider.currentSlide + slider.cloneOffset) * pos : (slider.currentSlide + slider.cloneOffset) * pos;
                  case "setTouch": return (reverse) ? pos : pos;
                  case "jumpEnd": return (reverse) ? pos : slider.count * pos;
                  case "jumpStart": return (reverse) ? slider.count * pos : pos;
                  default: return pos;
                }
              }
            }());

            return (posCalc * -1) + "px";
          }());

      if (slider.transitions) {
        target = (vertical) ? "translate3d(0," + target + ",0)" : "translate3d(" + target + ",0,0)";
        dur = (dur !== undefined) ? (dur/1000) + "s" : "0s";
        slider.container.css("-" + slider.pfx + "-transition-duration", dur);
         slider.container.css("transition-duration", dur);
      }

      slider.args[slider.prop] = target;
      if (slider.transitions || dur === undefined) { slider.container.css(slider.args); }

      slider.container.css('transform',target);
    };

    slider.setup = function(type) {
      // SLIDE:
      if (!fade) {
        var sliderOffset, arr;

        if (type === "init") {
          slider.viewport = $('<div class="' + namespace + 'viewport"></div>').css({"overflow": "hidden", "position": "relative"}).appendTo(slider).append(slider.container);
          // INFINITE LOOP:
          slider.cloneCount = 0;
          slider.cloneOffset = 0;
          // REVERSE:
          if (reverse) {
            arr = $.makeArray(slider.slides).reverse();
            slider.slides = $(arr);
            slider.container.empty().append(slider.slides);
          }
        }
        // INFINITE LOOP && !CAROUSEL:
        if (slider.vars.animationLoop && !carousel) {
          slider.cloneCount = 2;
          slider.cloneOffset = 1;
          // clear out old clones
          if (type !== "init") { slider.container.find('.clone').remove(); }
          slider.container.append(methods.uniqueID(slider.slides.first().clone().addClass('clone')).attr('aria-hidden', 'true'))
                          .prepend(methods.uniqueID(slider.slides.last().clone().addClass('clone')).attr('aria-hidden', 'true'));
        }
        slider.newSlides = $(slider.vars.selector, slider);

        sliderOffset = (reverse) ? slider.count - 1 - slider.currentSlide + slider.cloneOffset : slider.currentSlide + slider.cloneOffset;
        // VERTICAL:
        if (vertical && !carousel) {
          slider.container.height((slider.count + slider.cloneCount) * 200 + "%").css("position", "absolute").width("100%");
          setTimeout(function(){
            slider.newSlides.css({"display": "block"});
            slider.doMath();
            slider.viewport.height(slider.h);
            slider.setProps(sliderOffset * slider.h, "init");
          }, (type === "init") ? 100 : 0);
        } else {
          slider.container.width((slider.count + slider.cloneCount) * 200 + "%");
          slider.setProps(sliderOffset * slider.computedW, "init");
          setTimeout(function(){
            slider.doMath();
            slider.newSlides.css({"width": slider.computedW, "float": "left", "display": "block"});
            // SMOOTH HEIGHT:
            if (slider.vars.smoothHeight) { methods.smoothHeight(); }
          }, (type === "init") ? 100 : 0);
        }
      } else { // FADE:
        slider.slides.css({"width": "100%", "float": "left", "marginRight": "-100%", "position": "relative"});
        if (type === "init") {
          if (!touch) {
            //slider.slides.eq(slider.currentSlide).fadeIn(slider.vars.animationSpeed, slider.vars.easing);
            if (slider.vars.fadeFirstSlide == false) {
              slider.slides.css({ "opacity": 0, "display": "block", "zIndex": 1 }).eq(slider.currentSlide).css({"zIndex": 2}).css({"opacity": 1});
            } else {
              slider.slides.css({ "opacity": 0, "display": "block", "zIndex": 1 }).eq(slider.currentSlide).css({"zIndex": 2}).animate({"opacity": 1},slider.vars.animationSpeed,slider.vars.easing);
            }
          } else {
            slider.slides.css({ "opacity": 0, "display": "block", "webkitTransition": "opacity " + slider.vars.animationSpeed / 1000 + "s ease", "zIndex": 1 }).eq(slider.currentSlide).css({ "opacity": 1, "zIndex": 2});
          }
        }
        // SMOOTH HEIGHT:
        if (slider.vars.smoothHeight) { methods.smoothHeight(); }
      }
      // !CAROUSEL:
      // CANDIDATE: active slide
      if (!carousel) { slider.slides.removeClass(namespace + "active-slide").eq(slider.currentSlide).addClass(namespace + "active-slide"); }

      //FlexSlider: init() Callback
      slider.vars.init(slider);
    };

    slider.doMath = function() {
      var slide = slider.slides.first(),
          slideMargin = slider.vars.itemMargin,
          minItems = slider.vars.minItems,
          maxItems = slider.vars.maxItems;

      slider.w = (slider.viewport===undefined) ? slider.width() : slider.viewport.width();
      slider.h = slide.height();
      slider.boxPadding = slide.outerWidth() - slide.width();

      // CAROUSEL:
      if (carousel) {
        slider.itemT = slider.vars.itemWidth + slideMargin;
        slider.minW = (minItems) ? minItems * slider.itemT : slider.w;
        slider.maxW = (maxItems) ? (maxItems * slider.itemT) - slideMargin : slider.w;
        slider.itemW = (slider.minW > slider.w) ? (slider.w - (slideMargin * (minItems - 1)))/minItems :
                       (slider.maxW < slider.w) ? (slider.w - (slideMargin * (maxItems - 1)))/maxItems :
                       (slider.vars.itemWidth > slider.w) ? slider.w : slider.vars.itemWidth;

        slider.visible = Math.floor(slider.w/(slider.itemW));
        slider.move = (slider.vars.move > 0 && slider.vars.move < slider.visible ) ? slider.vars.move : slider.visible;
        slider.pagingCount = Math.ceil(((slider.count - slider.visible)/slider.move) + 1);
        slider.last =  slider.pagingCount - 1;
        slider.limit = (slider.pagingCount === 1) ? 0 :
                       (slider.vars.itemWidth > slider.w) ? (slider.itemW * (slider.count - 1)) + (slideMargin * (slider.count - 1)) : ((slider.itemW + slideMargin) * slider.count) - slider.w - slideMargin;
      } else {
        slider.itemW = slider.w;
        slider.pagingCount = slider.count;
        slider.last = slider.count - 1;
      }
      slider.computedW = slider.itemW - slider.boxPadding;
    };

    slider.update = function(pos, action) {
      slider.doMath();

      // update currentSlide and slider.animatingTo if necessary
      if (!carousel) {
        if (pos < slider.currentSlide) {
          slider.currentSlide += 1;
        } else if (pos <= slider.currentSlide && pos !== 0) {
          slider.currentSlide -= 1;
        }
        slider.animatingTo = slider.currentSlide;
      }

      // update controlNav
      if (slider.vars.controlNav && !slider.manualControls) {
        if ((action === "add" && !carousel) || slider.pagingCount > slider.controlNav.length) {
          methods.controlNav.update("add");
        } else if ((action === "remove" && !carousel) || slider.pagingCount < slider.controlNav.length) {
          if (carousel && slider.currentSlide > slider.last) {
            slider.currentSlide -= 1;
            slider.animatingTo -= 1;
          }
          methods.controlNav.update("remove", slider.last);
        }
      }
      // update directionNav
      if (slider.vars.directionNav) { methods.directionNav.update(); }

    };

    slider.addSlide = function(obj, pos) {
      var $obj = $(obj);

      slider.count += 1;
      slider.last = slider.count - 1;

      // append new slide
      if (vertical && reverse) {
        (pos !== undefined) ? slider.slides.eq(slider.count - pos).after($obj) : slider.container.prepend($obj);
      } else {
        (pos !== undefined) ? slider.slides.eq(pos).before($obj) : slider.container.append($obj);
      }

      // update currentSlide, animatingTo, controlNav, and directionNav
      slider.update(pos, "add");

      // update slider.slides
      slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
      // re-setup the slider to accomdate new slide
      slider.setup();

      //FlexSlider: added() Callback
      slider.vars.added(slider);
    };
    slider.removeSlide = function(obj) {
      var pos = (isNaN(obj)) ? slider.slides.index($(obj)) : obj;

      // update count
      slider.count -= 1;
      slider.last = slider.count - 1;

      // remove slide
      if (isNaN(obj)) {
        $(obj, slider.slides).remove();
      } else {
        (vertical && reverse) ? slider.slides.eq(slider.last).remove() : slider.slides.eq(obj).remove();
      }

      // update currentSlide, animatingTo, controlNav, and directionNav
      slider.doMath();
      slider.update(pos, "remove");

      // update slider.slides
      slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
      // re-setup the slider to accomdate new slide
      slider.setup();

      // FlexSlider: removed() Callback
      slider.vars.removed(slider);
    };

    //FlexSlider: Initialize
    methods.init();
  };

  // Ensure the slider isn't focussed if the window loses focus.
  $( window ).blur( function ( e ) {
    focused = false;
  }).focus( function ( e ) {
    focused = true;
  });

  //FlexSlider: Default Settings
  $.flexslider.defaults = {
    namespace: "flex-",             //{NEW} String: Prefix string attached to the class of every element generated by the plugin
    selector: ".slides > li",       //{NEW} Selector: Must match a simple pattern. '{container} > {slide}' -- Ignore pattern at your own peril
    animation: "fade",              //String: Select your animation type, "fade" or "slide"
    easing: "swing",                //{NEW} String: Determines the easing method used in jQuery transitions. jQuery easing plugin is supported!
    direction: "horizontal",        //String: Select the sliding direction, "horizontal" or "vertical"
    reverse: false,                 //{NEW} Boolean: Reverse the animation direction
    animationLoop: true,            //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
    smoothHeight: false,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode
    startAt: 0,                     //Integer: The slide that the slider should start on. Array notation (0 = first slide)
    slideshow: true,                //Boolean: Animate slider automatically
    slideshowSpeed: 7000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
    animationSpeed: 600,            //Integer: Set the speed of animations, in milliseconds
    initDelay: 0,                   //{NEW} Integer: Set an initialization delay, in milliseconds
    randomize: false,               //Boolean: Randomize slide order
    fadeFirstSlide: true,           //Boolean: Fade in the first slide when animation type is "fade"
    thumbCaptions: false,           //Boolean: Whether or not to put captions on thumbnails when using the "thumbnails" controlNav.

    // Usability features
    pauseOnAction: true,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
    pauseOnHover: false,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
    pauseInvisible: true,   		//{NEW} Boolean: Pause the slideshow when tab is invisible, resume when visible. Provides better UX, lower CPU usage.
    useCSS: true,                   //{NEW} Boolean: Slider will use CSS3 transitions if available
    touch: true,                    //{NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices
    video: false,                   //{NEW} Boolean: If using video in the slider, will prevent CSS3 3D Transforms to avoid graphical glitches

    // Primary Controls
    controlNav: true,               //Boolean: Create navigation for paging control of each slide? Note: Leave true for manualControls usage
    directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
    prevText: "Previous",           //String: Set the text for the "previous" directionNav item
    nextText: "Next",               //String: Set the text for the "next" directionNav item

    // Secondary Navigation
    keyboard: true,                 //Boolean: Allow slider navigating via keyboard left/right keys
    multipleKeyboard: false,        //{NEW} Boolean: Allow keyboard navigation to affect multiple sliders. Default behavior cuts out keyboard navigation with more than one slider present.
    mousewheel: false,              //{UPDATED} Boolean: Requires jquery.mousewheel.js (https://github.com/brandonaaron/jquery-mousewheel) - Allows slider navigating via mousewheel
    pausePlay: false,               //Boolean: Create pause/play dynamic element
    pauseText: "Pause",             //String: Set the text for the "pause" pausePlay item
    playText: "Play",               //String: Set the text for the "play" pausePlay item

    // Special properties
    controlsContainer: "",          //{UPDATED} jQuery Object/Selector: Declare which container the navigation elements should be appended too. Default container is the FlexSlider element. Example use would be $(".flexslider-container"). Property is ignored if given element is not found.
    manualControls: "",             //{UPDATED} jQuery Object/Selector: Declare custom control navigation. Examples would be $(".flex-control-nav li") or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
    customDirectionNav: "",         //{NEW} jQuery Object/Selector: Custom prev / next button. Must be two jQuery elements. In order to make the events work they have to have the classes "prev" and "next" (plus namespace)
    sync: "",                       //{NEW} Selector: Mirror the actions performed on this slider with another slider. Use with care.
    asNavFor: "",                   //{NEW} Selector: Internal property exposed for turning the slider into a thumbnail navigation for another slider

    // Carousel Options
    itemWidth: 0,                   //{NEW} Integer: Box-model width of individual carousel items, including horizontal borders and padding.
    itemMargin: 0,                  //{NEW} Integer: Margin between carousel items.
    minItems: 1,                    //{NEW} Integer: Minimum number of carousel items that should be visible. Items will resize fluidly when below this.
    maxItems: 0,                    //{NEW} Integer: Maxmimum number of carousel items that should be visible. Items will resize fluidly when above this limit.
    move: 0,                        //{NEW} Integer: Number of carousel items that should move on animation. If 0, slider will move all visible items.
    allowOneSlide: true,           //{NEW} Boolean: Whether or not to allow a slider comprised of a single slide

    // Callback API
    start: function(){},            //Callback: function(slider) - Fires when the slider loads the first slide
    before: function(){},           //Callback: function(slider) - Fires asynchronously with each slider animation
    after: function(){},            //Callback: function(slider) - Fires after each slider animation completes
    end: function(){},              //Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
    added: function(){},            //{NEW} Callback: function(slider) - Fires after a slide is added
    removed: function(){},           //{NEW} Callback: function(slider) - Fires after a slide is removed
    init: function() {}             //{NEW} Callback: function(slider) - Fires after the slider is initially setup
  };

  //FlexSlider: Plugin Function
  $.fn.flexslider = function(options) {
    if (options === undefined) { options = {}; }

    if (typeof options === "object") {
      return this.each(function() {
        var $this = $(this),
            selector = (options.selector) ? options.selector : ".slides > li",
            $slides = $this.find(selector);

      if ( ( $slides.length === 1 && options.allowOneSlide === true ) || $slides.length === 0 ) {
          $slides.fadeIn(400);
          if (options.start) { options.start($this); }
        } else if ($this.data('flexslider') === undefined) {
          new $.flexslider(this, options);
        }
      });
    } else {
      // Helper strings to quickly perform functions on the slider
      var $slider = $(this).data('flexslider');
      switch (options) {
        case "play": $slider.play(); break;
        case "pause": $slider.pause(); break;
        case "stop": $slider.stop(); break;
        case "next": $slider.flexAnimate($slider.getTarget("next"), true); break;
        case "prev":
        case "previous": $slider.flexAnimate($slider.getTarget("prev"), true); break;
        default: if (typeof options === "number") { $slider.flexAnimate(options, true); }
      }
    }
  };
})(jQuery);


/*! Picturefill - v2.0.0-beta - 2014-05-02
* http://scottjehl.github.io/picturefill
* Copyright (c) 2014 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT */
window.matchMedia||(window.matchMedia=function(){"use strict";var a=window.styleMedia||window.media;if(!a){var b=document.createElement("style"),c=document.getElementsByTagName("script")[0],d=null;b.type="text/css",b.id="matchmediajs-test",c.parentNode.insertBefore(b,c),d="getComputedStyle"in window&&window.getComputedStyle(b,null)||b.currentStyle,a={matchMedium:function(a){var c="@media "+a+"{ #matchmediajs-test { width: 1px; } }";return b.styleSheet?b.styleSheet.cssText=c:b.textContent=c,"1px"===d.width}}}return function(b){return{matches:a.matchMedium(b||"all"),media:b||"all"}}}()),function(a,b){"use strict";function c(a){var b,c,d,f,g,h;a=a||{},b=a.elements||e.getAllElements();for(var i=0,j=b.length;j>i;i++)if(c=b[i],d=c.nodeName.toUpperCase(),f=void 0,g=void 0,h=void 0,c[e.ns]||(c[e.ns]={}),a.reevaluate||!c[e.ns].evaluated){if("PICTURE"===d){if(e.removeVideoShim(c),f=e.getMatch(c),f===!1)continue;h=c.getElementsByTagName("img")[0]}else f=void 0,h=c;h&&(h[e.ns]||(h[e.ns]={}),h.srcset&&("PICTURE"===d||h.getAttribute("sizes"))&&e.dodgeSrcset(h),f?(g=e.processSourceSet(f),e.applyBestCandidate(g,h)):(g=e.processSourceSet(h),(void 0===h.srcset||h.getAttribute("sizes"))&&e.applyBestCandidate(g,h)),c[e.ns].evaluated=!0)}}function d(){c();var d=setInterval(function(){return a.picturefill(),/^loaded|^i|^c/.test(b.readyState)?void clearInterval(d):void 0},250);if(a.addEventListener){var e;a.addEventListener("resize",function(){a.clearTimeout(e),e=a.setTimeout(function(){c({reevaluate:!0})},60)},!1)}}if(!a.HTMLPictureElement){b.createElement("picture");var e={};e.ns="picturefill",e.srcsetSupported=void 0!==(new a.Image).srcset,e.trim=function(a){return a.trim?a.trim():a.replace(/^\s+|\s+$/g,"")},e.endsWith=function(a,b){return a.endsWith?a.endsWith(b):-1!==a.indexOf(b,a.length-b.length)},e.matchesMedia=function(b){return a.matchMedia&&a.matchMedia(b).matches},e.getDpr=function(){return a.devicePixelRatio||1},e.getWidthFromLength=function(a){return a=a&&parseFloat(a)>0?a:"100vw",a=a.replace("vw","%"),e.lengthEl||(e.lengthEl=b.createElement("div"),b.documentElement.insertBefore(e.lengthEl,b.documentElement.firstChild)),e.lengthEl.style.cssText="position: absolute; left: 0; width: "+a+";",e.lengthEl.offsetWidth},e.types={},e.types["image/svg+xml"]=b.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"),e.types["image/webp"]=function(){var b=new a.Image,d="image/webp";b.onerror=function(){e.types[d]=!1,c()},b.onload=function(){e.types[d]=1===b.width,c()},b.src="data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA="},e.verifyTypeSupport=function(a){var b=a.getAttribute("type");return null===b||""===b?!0:"function"==typeof e.types[b]?(e.types[b](),"pending"):e.types[b]},e.parseSize=function(a){var b=/(\([^)]+\))?\s*(.+)/g.exec(a);return{media:b&&b[1],length:b&&b[2]}},e.findWidthFromSourceSize=function(a){for(var b,c=e.trim(a).split(/\s*,\s*/),d=0,f=c.length;f>d;d++){var g=c[d],h=e.parseSize(g),i=h.length,j=h.media;if(i&&(!j||e.matchesMedia(j))){b=i;break}}return e.getWidthFromLength(b)},e.getCandidatesFromSourceSet=function(a,b){for(var c=e.trim(a).split(/,\s+/),d=b?e.findWidthFromSourceSize(b):"100%",f=[],g=0,h=c.length;h>g;g++){var i,j=c[g],k=j.split(/\s+/),l=k[1];!l||"w"!==l.slice(-1)&&"x"!==l.slice(-1)||(l=l.slice(0,-1)),i=b?parseFloat(parseInt(l,10)/d):l?parseFloat(l,10):1;var m={url:k[0],resolution:i};f.push(m)}return f},e.dodgeSrcset=function(a){a.srcset&&(a[e.ns].srcset=a.srcset,a.removeAttribute("srcset"))},e.processSourceSet=function(a){var b=a.getAttribute("srcset"),c=a.getAttribute("sizes"),d=[];return"IMG"===a.nodeName.toUpperCase()&&a[e.ns]&&a[e.ns].srcset&&(b=a[e.ns].srcset),b&&(d=e.getCandidatesFromSourceSet(b,c)),d},e.applyBestCandidate=function(a,b){var c,d,f;a.sort(e.ascendingSort),d=a.length,f=a[d-1];for(var g=0;d>g;g++)if(c=a[g],c.resolution>=e.getDpr()){f=c;break}e.endsWith(b.src,f.url)||(b.src=f.url,b.currentSrc=b.src)},e.ascendingSort=function(a,b){return a.resolution-b.resolution},e.removeVideoShim=function(a){var b=a.getElementsByTagName("video");if(b.length){for(var c=b[0],d=c.getElementsByTagName("source");d.length;)a.insertBefore(d[0],c);c.parentNode.removeChild(c)}},e.getAllElements=function(){for(var a=b.getElementsByTagName("picture"),c=[],d=b.getElementsByTagName("img"),f=0,g=a.length+d.length;g>f;f++)if(f<a.length)c[f]=a[f];else{var h=d[f-a.length];"PICTURE"!==h.parentNode.nodeName.toUpperCase()&&(e.srcsetSupported&&h.getAttribute("sizes")||null!==h.getAttribute("srcset"))&&c.push(h)}return c},e.getMatch=function(a){for(var b,c=a.childNodes,d=0,f=c.length;f>d;d++){var g=c[d];if(1===g.nodeType){if("IMG"===g.nodeName.toUpperCase())return b;if("SOURCE"===g.nodeName.toUpperCase()){var h=g.getAttribute("media");if(g.getAttribute("srcset")&&(!h||e.matchesMedia(h))){var i=e.verifyTypeSupport(g);if(i===!0){b=g;break}if("pending"===i)return!1}}}}return b},d(),c._=e,"object"==typeof module&&"object"==typeof module.exports?module.exports=c:"object"==typeof define&&define.amd?define(function(){return c}):"object"==typeof a&&(a.picturefill=c)}}(this,this.document);


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


/* *****************QuickLane PROD H.27.2 Code ********/
/* San Jose - Remote Code - PROD - H Version
  
  04/13/2009 - uncommented getValOnce for s.campaign
  140925 - update BTL, DFA, DIL, Visit Start
  141217 - fix visit start & page name issue
  
*/

/************************ ADDITIONAL FEATURES ************************
     Dynamic Report Suite Selection
     Universal Tag
     Plugins
     Cookie Migration
*/

var s_account="fmcquicklaneprod"
var s=s_gi(s_account)
/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */
/* Conversion Config */
s.currencyCode="USD"
/* Link Tracking Config */
s.trackDownloadLinks=false
s.trackExternalLinks=false
s.trackInlineStats=true
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,xls"
s.linkInternalFilters="javascript:,quicklane.com,quicklaneservice.com"
s.linkLeaveQueryString=false
s.linkTrackVars="None"
s.linkTrackEvents="None"

s.usePlugins=true
/* Plugin Config */
function s_doPlugins(s) {
	/* Add calls to plugins here */
	
	/* Force pageName to Lowercase */
	if(s.pageName)
		s.pageName=s.pageName.toLowerCase();
        
	/* External Campaign Tracking */
	if(!s.campaign){
		s.campaign=s.getQueryParam('bannerid,csid,sReferrer,campid');
		s.campaign=s.getValOnce(s.campaign,"cmp_getval",0)
	}
    
  	/* Campaign Page View Consumption */
	s.prop17=s.getAndPersistValue(s.campaign,'s_p17_pers',90);

	/* Set global campaign ID in eVar30 */
	s.eVar30=s.getQueryParam('glbcmp,fmccmp');
        
	/* Ford global Campaign Page View Consumption */
	s.prop30=s.getAndPersistValue(s.eVar30,'s_p30_pers',90);
        
	/* Campaign Path Tracking */
	s.prop19=s.pageName;
	if(s.campaign)
		s.prop19=s.campaign+': '+s.pageName;
	else if(s.eVar30)
		s.prop19=s.eVar30+': '+s.pageName;                

	/* Internal Campaign Tracking */
	if(!s.eVar13)
		s.eVar13=s.getQueryParam('intcmp');

	//copy values and persist for visit
	s.prop13=s.getAndPersistValue(s.eVar13,'s_p13_pers',0);

	/* Referrer Overide */
	if(s.getQueryParam('referrer'))
		s.referrer=s.getQueryParam('referrer');        

	/* Email Campaign Tracking */
	if(!s.eVar33)
		s.eVar33=s.getQueryParam('emailid');
	s.prop33=s.getAndPersistValue(s.eVar33,'s_cp_pers',90);

	/* Visit Start Logic */	

	var tempSuite="nosuite"
	if(!s.c_r("s_suite")){s.setSuite(s_account,"s_suite",0);}else{tempSuite=s.c_r("s_suite");}

	if(!s.c_r('v_starting')){
		s_visIdFloodlight('690327','fvflup','adobesvi','u2',1);	
		
		if((!tempSuite.match(s_account))&& tempSuite!=""){
			if(!isInternal()||document.referrer==''){
				s.prop48=s.prop49=s.eVar8=trafficsource();s.prop8=s.getAndPersistValue(s.eVar8,'s_p_s_prop8',0);
				s.eVar36 = s.getCustomValOnce(dt,'ev_36_getval',0);s.events = s.apl(s.events,'event17,event52',',',2);
				var dt=popDT();
			}
		} 
	}
	var expTime=new Date;expTime.setTime(expTime.getTime()+1800000);
	s.c_w('v_starting','nfp',expTime);
		
	if(!tempSuite.match(s_account)){s.setSuite(tempSuite+s_account,"s_suite",0);tempSuite=s.c_r("s_suite");}
	
	//support code
	if((s.linkTrackVars!='None'&& s.linkTrackVars!='')||s.linkTrackVars.match('prop')||s.linkTrackVars.match('eVar')||s.linkTrackVars.match('evar')||s.linkTrackVars.match('events'))
	{
		s.linkTrackVars=s.linkTrackVars+",prop37,prop39,pageName,eVar52,prop52"		
	}
   	s.prop37="141217"
   	if(!s.prop39 && s.pageName)s.prop39=s.pageName
	s.eVar52=s.prop52=document.URL
	s.prop47=s.eVar47="D=UserAgent"
	
	
  }      

function padFrontZero(val) {
	if (val < 10) return '0'+val; else return val.toString();
}

function popDT() {
	var dte = new Date();
	return dte.getFullYear()+padFrontZero(dte.getMonth()+1)+padFrontZero(dte.getDate())+' '+padFrontZero(dte.getHours());

}

// traffic source
function trafficsource() {
    var fs = new Array('fmc:ford.com|ford.com','fmc:fordvehicles.com|fordvehicles.com|fordvehicles-esp.com','fmc:lincoln.com|lincoln.com|lincolnmercury.com',
      'fmc:mercuryvehicles.com|mercuryvehicles.com','fmc:flmowner.com|flmowner.com','fmc:motocraft.com|motocraft.com','fmc:fordracing.com|fordracing.com',
      'fmc:volvocars.us|volvocars.us','fmc:fordaccessories.com|fordaccessoriesstore.com|fordaccessories.com','fmc:lincolnaccessories.com|lincolnaccessories.com',
      'fmc:mercuryaccessories.com|mercuryaccessories.com','fmc:genuineservice.com|genuineservice.com|genuineflmservice.com|genuinefordservice.com|genuinemercuryservice.com|genuinelincolnservice.com|fordautoclub.com|genuineflmservice.com',
      'fmc:syncmyride.com|syncmyride.com','fmc:fordaxz.com|fordaxz.com','fmc:fordurban.com|fordurban.com','fmc:lincolnlounge.com,lincolnlounge.com',
      'fmc:quicklane.com|quicklane.com|quicklaneservice.com','fmc:dealerconnection.com|.dealerconnection.com',
      'fmc:tier2.com|ford.net|fords.com|dealers.com|dealers.net|dealer.com|dealer.net|store.com|store.net|stores.com|stores.net|.ford-now.com',
      'fmc:owneradvantage.com|owneradvantage.com','fmc:fordworksolutions.com|fordworksolutions.com|fordworkssolutions.com',
      'fmc:fordcredit.com|fordcredit.com|acctaccess.com|onlinevehiclefinancing.com|billerweb.com','fmc:fordcpo.com|fordcpo.com','fmc:fordpartsonline.com|fordparts.com|fordpartsonline.com');

    if(s.getQueryParam('referrer')) var ref=s.getQueryParam('referrer') 
	else var ref = document.referrer; 
    
    for (i=0;i<fs.length;i++) {
    var fss = fs[i].split('|');
    	for (j=1;j<fss.length;j++) {
        	if (ref.indexOf(fss[j])>-1){
        		if(refSearch(ref)){ return camp();}else return fss[0];		   
        	}
      	}
    }
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
   	var se = new Array('google.|q','yahoo.com|p','msn.com|q','ask.com|q','myway.com|searchfor','altavista.com|q','netscape.com|query','live.com|q','allthweb.com|q','lycos.com|query','.aol.|q','.aol.|query','suche.aolsvc.de|query','suche.aolsvc.de|q','bing.com|q','ask.jp|q','ask.co|ask','ask.jp|ask','ask.co|q','search.mywebsearch.com|searchfor');

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

function isInternal(){
	
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

s.doPlugins=s_doPlugins
/************************** PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */

/* Floodlight Tag Generation Plugin v0.1 */
s_visIdFloodlight = function (ds, dt, dc, dn, ep) {

    if (!ep || ep != 1) {
        var isFirstPage = s.getVisitStart('s_visit');
    }
    if (ep == 1 || isFirstPage == 1) {
        var dviCookie = s.c_r('s_fid');
        var visRegExp = /[0-9A-F]+-[0-9A-F]+/g;
        var dvi = dviCookie.match(visRegExp);
        var pr = location.protocol;
        var du = pr + '//fls.doubleclick.net/activityi;src=' + ds + ';type=' + dt + ';cat=' + dc + ';' + dn + '=';
        if (dvi) {
            s_dfaCall(du, dvi);
        } else {
            setTimeout('s_dfaCall(\'' + du + '\')', 4000);
        }
    }
}
s_dfaCall = function (du, dvi) {
      s.prop60 = s.c_r('s_fid');
      if(!dvi) {
		var dviCookie = s.c_r('s_fid');
		var visRegExp = /[0-9A-F]+-[0-9A-F]+/g;
		var dvi = dviCookie.match(visRegExp);
      }
      var axel = Math.random() + '';
      var a = axel * 10000000000000;
      dfaUrl = du + dvi + ';ord=' + a + '?';
      var createIframe = document.createElement('iframe');
      createIframe.setAttribute('src', dfaUrl);
      createIframe.setAttribute('width', '1');
      createIframe.setAttribute('height', '1');
      createIframe.setAttribute('frameborder', '0');
      createIframe.setAttribute('style', 'display:none');
      document.getElementsByTagName('body')[0].appendChild(createIframe);
}

/*
 * Plugin: Set Suite
 */
s.setSuite=new Function("v","c","e",""
+"var s=this,k=s.c_r(c),a=new Date;e=e?e:0;if(v){a.setTime(a.getTime("
+")+1800000);s.c_w(c,v,a);}else{v='novalue';a.setTime(a.getTime()+1800000);s.c_w(c,v,a);}");

/*
 * Plugin: getCustomValOnce 
 */
s.getCustomValOnce=new Function("v","c","e",""
+"var s=this,k=s.c_r(c),a=new Date;e=e?e:0;if(v){a.setTime(a.getTime("
+")+1800000);if(!s.c_w(c,v,a))s.c_w(c,v,0);}else{a.setTime(a.getTime()+1800000);v=s.c_r(c);if(!s.c_w(c,v,a))s.c_w(c,v,a);}return v==k?'':v");

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
 * Plugin: getValOnce 0.2 - get a value once per session or number of days
 */
s.getValOnce=new Function("v","c","e",""
+"var s=this,k=s.c_r(c),a=new Date;e=e?e:0;if(v){a.setTime(a.getTime("
+")+e*86400000);s.c_w(c,v,e?a:0);}return v==k?'':v");

/*
 * Plugin: getAndPersistValue 0.3 - get a value on every page
 */
s.getAndPersistValue=new Function("v","c","e",""
+"var s=this,a=new Date;e=e?e:0;a.setTime(a.getTime()+e*86400000);if("
+"v)s.c_w(c,v,e?a:0);return s.c_r(c);");

/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
s.visitorNamespace="ford"
s.trackingServer="metrics.ford.com"
s.trackingServerSecure="smetrics.ford.com"
s.dc="112"
s.vmk="4A43B06B"

/* Configure Modules and Plugins */

s.loadModule("Media")
s.Media.autoTrack=false
s.Media.trackVars="None"
s.Media.trackEvents="None"

/****************************** MODULES *****************************/
/* Module: Media */
s.m_Media_c="='s_media_'+m._in+'_~=new Function(~m.ae(mn,l,\"'+p+'\",~;`H~o.'+f~o.Get~=function(~){var m=this~}^9 p');p=tcf(o)~setTimeout(~x,x!=2?p:-1,o)}~=parseInt(~m.s.d.getElementsByTagName~ersion"
+"Info~'`z_c_il['+m._in+'],~'o','var e,p=~QuickTime~if(~}catch(e){p=~s.wd.addEventListener~m.s.rep(~=new Object~layState~||^D~m.s.wd[f1]~Media~.name~Player '+~s.wd.attachEvent~'a','b',c~;o[f1]~tm.get"
+"Time()/1~m.s.isie~.current~,tm=new Date,~p<p2||p-p2>5)~m.e(n,1,o^F~m.close~i.lx~=v+',n,~){this.e(n,~MovieName()~);o[f~i.lo~m.ol~o.controls~load',m.as~==3)~script';x.~,t;try{t=~Version()~else~o.id~)"
+"{mn=~1;o[f7]=~Position~);m.~(x==~)};m.~&&m.l~l[n])~var m=s~!p){tcf~xc=m.s.~Title()~();~7+'~)}};m.a~\"'+v+';~3,p,o);~5000~return~i.lt~';c2='~Change~n==~',f~);i.~==1)~{p='~4+'=n;~()/t;p~.'+n)}~~`z.m_"
+"i('`P'`uopen`6n,l,p,b`7,i`L`Ya='',x;l`Bl)`3!l)l=1`3n&&p){`H!m.l)m.l`L;n=`Km.s.rep(`Kn,\"\\n\",''),\"\\r\",''),'--**--','')`3m.`y`b(n)`3b&&b.id)a=b.id;for (x in m.l)`Hm.l[x]`x[x].a==a)`b(m.l[x].n^Fn"
+"=n;i.l=l;i.p=p;i.a=a;i.t=0;i.s`B`V000);`c=0;^A=0;`h=0;i.e='';m.l[n]=i}};`b`6n`e0,-1`wplay`6n,o`7,i;i=`am`1`Ei`3m.l){i=m.l[\"'+`Ki.n,'\"','\\\\\"')+'\"]`3i){`H`c^Gm.e(i.n,3,-1^Fmt=`9i.m,^8)}}'^Fm(`w"
+"stop`6n,o`e2,o`we`6n,x,o`7,i=n`x&&m.l[n]?m.l[n]:0`Yts`B`V000),d='--**--'`3i){if `v3||(x!=`c&&(x!=2||`c^G)) {`Hx){`Ho<0&&^A>0){o=(ts-^A)+`h;o=o<i.l?o:i.l-1}o`Bo)`3`v2||x`l&&`h<o)i.t+=o-`h`3x!=3){i.e"
+"+=`v1?'S':'E')+o;`c=x;}`p `H`c!=1)`alt=ts;`h=o;m.s.pe='media';m.s.pev3=i.n+d+i.l+d+i.p+d+i.t+d+i.s+d+i.e+`v3?'E'+o:''`us.t(0,'`P^K`p{m.e(n,2,-1`ul[n]=0;m.s.fbr('`P^K}}^9 i};m.ae`6n,l,p,x,o,b){`Hn&&"
+"p`7`3!m.l||!m.`ym.open(n,l,p,b`ue(n,x,o^5`6o,t`7,i=`q?`q:o`Q,n=o`Q,p=0,v,c,c1,c2,^1h,x,e,f1,f2`0oc^E3`0t^E4`0s^E5`0l^E6`0m^E7`0c',tcf,w`3!i){`H!m.c)m.c=0;i`0'+m.c;m.c++}`H!`q)`q=i`3!o`Q)o`Q=n=i`3!`"
+"i)`i`L`3`i[i])^9;`i[i]=o`3!xc)^1b;tcf`1`F0;try{`Ho.v`D&&o`X`P&&`j)p=1`I0`8`3^0`1`F0`n`5`G`o`3t)p=2`I0`8`3^0`1`F0`n`5V`D()`3t)p=3`I0`8}}v=\"`z_c_il[\"+m._in+\"],o=`i['\"+i+\"']\"`3p^G^HWindows `P `R"
+"o.v`D;c1`dp,l,x=-1,cm,c,mn`3o){cm=o`X`P;c=`j`3cm&&c`rcm`Q?cm`Q:c.URL;l=cm.duration;p=c`X`t;n=o.p`M`3n){`H^D8)x=0`3n`lx=1`3^D1`N2`N4`N5`N6)x=2;}^B`Hx>=0)`2`A}';c=c1+c2`3`W&&xc){x=m.s.d.createElement"
+"('script');x.language='j`mtype='text/java`mhtmlFor=i;x.event='P`M^C(NewState)';x.defer=true;x.text=c;xc.appendChild(x`g6]`1c1+'`Hn`l{x=3;'+c2+'}`9`46+',^8)'`g6]()}}`Hp==2)^H`G `R(`5Is`GRegistered()"
+"?'Pro ':'')+`5`G`o;f1=f2;c`dx,t,l,p,p2,mn`3o`r`5`f?`5`f:`5URL^3n=`5Rate^3t=`5TimeScale^3l=`5Duration^J=`5Time^J2=`45+'`3n!=`44+'||`Z{x=2`3n!=0)x=1;`p `Hp>=l)x=0`3`Z`22,p2,o);`2`A`Hn>0&&`4^4>=10){`2"
+"^7`4^4=0}`4^4++;`4^I`45+'=p;`9^6`42+'(0,0)\",500)}'`U`1`T`g4]=-`s0`U(0,0)}`Hp`l^HReal`R`5V`D^3f1=n+'_OnP`M^C';c1`dx=-1,l,p,mn`3o`r`5^2?`5^2:`5Source^3n=`5P`M^3l=`5Length()/1000;p=`5`t()/1000`3n!=`4"
+"4+'){`Hn`lx=1`3^D0`N2`N4`N5)x=2`3^D0&&(p>=l||p==0))x=0`3x>=0)`2`A`H^D3&&(`4^4>=10||!`43+')){`2^7`4^4=0}`4^4++;`4^I^B`H`42+')`42+'(o,n)}'`3`O)o[f2]=`O;`O`1`T1+c2)`U`1`T1+'`9^6`41+'(0,0)\",`43+'?500:"
+"^8);'+c2`g4]=-1`3`W)o[f3]=`s0`U(0,0^5s`1'e',`El,n`3m.autoTrack&&`C){l=`C(`W?\"OBJECT\":\"EMBED\")`3l)for(n=0;n<l.length;n++)m.a(`y;}')`3`S)`S('on`k);`p `H`J)`J('`k,false)";
s.m_i("Media");

/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s.version='H.27.2';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(s.rep(m,\"\\\\\",\"\\\\"
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
+"lse if(k=='marketingCloudVisitorID')q='mid';else if(k=='analyticsVisitorID')q='aid';else if(k=='audienceManagerLocationHint')q='aamlh';else if(k=='audienceManagerBlob')q='aamb';else if(k=='pageURL'"
+"){q='g';if(v.length>255){s.pageURLRest=v.substring(255);v=v.substring(0,255);}}else if(k=='pageURLRest')q='-g';else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigratio"
+"nKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigrationServerSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}"
+"else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em==2||s.em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='co"
+"okieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode')q='cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='"
+"resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j';else if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='br"
+"owserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp';else if(k=='plugins')q='p';else if(k=='events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='events2')v=''"
+";else if(k=='contextData'){qs+=s.s2q('c',s[k],fv,k,0);v=''}else if(k=='lightProfileID')q='mtp';else if(k=='lightStoreForSeconds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncrementBy'){q"
+"='mti';if(!s.lightProfileID)v=''}else if(k=='retrieveLightProfiles')q='mtsr';else if(k=='deleteLightProfiles')q='mtsd';else if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2q('mts',s[k"
+"],fv,k,0);v=''}else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring(0,3)!='pev"
+"'?s.ape(v):v)}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('?'),hi=h.indexOf('#');if(qi>=0){if(hi>=0&&hi<qi)qi=hi;}else qi=hi;h=qi>=0?h.substring("
+"0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function("
+"h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',"
+"h))return 'd';if(s.trackExternalLinks&&h.indexOf('#')!=0&&h.indexOf('about:')!=0&&h.indexOf('javascript:')!=0&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e'"
+";return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=this;s.t();s.lnk=0;if(b)return this[b](e);return true');s.bcr=function(){var s=this;if(s.bct&&s.bce)s.bct.d"
+"ispatchEvent(s.bce);if(s.bcf){if(typeof(s.bcf)=='function')s.bcf();else if(s.bct&&s.bct.href)s.d.location=s.bct.href}s.bct=s.bce=s.bcf=0};s.bc=new Function('e','if(e&&e.s_fe)return;var s=s_c_il['+s"
+"._in+'],f,tcf,t,n,nrs,a,h;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;if(!s.bbc)s.useForcedLinkTracking=0;else if(!s.useForcedLinkTracking){s.b.removeEventListener(\"click\",s.bc,true);s.bbc=s.useFor"
+"cedLinkTracking=0;return}else s.b.removeEventListener(\"click\",s.bc,false);s.eo=e.srcElement?e.srcElement:e.target;nrs=s.nrs;s.t();s.eo=0;if(s.nrs>nrs&&s.useForcedLinkTracking&&e.target){a=e.targe"
+"t;while(a&&a!=s.b&&a.tagName.toUpperCase()!=\"A\"&&a.tagName.toUpperCase()!=\"AREA\")a=a.parentNode;if(a){h=a.href;if(h.indexOf(\"#\")==0||h.indexOf(\"about:\")==0||h.indexOf(\"javascript:\")==0)h="
+"0;t=a.target;if(e.target.dispatchEvent&&h&&(!t||t==\"_self\"||t==\"_top\"||t==\"_parent\"||(s.wd.name&&t==s.wd.name))){tcf=new Function(\"s\",\"var x;try{n=s.d.createEvent(\\\\\"MouseEvents\\\\\")}"
+"catch(x){n=new MouseEvent}return n\");n=tcf(s);if(n){tcf=new Function(\"n\",\"e\",\"var x;try{n.initMouseEvent(\\\\\"click\\\\\",e.bubbles,e.cancelable,e.view,e.detail,e.screenX,e.screenY,e.clientX"
+",e.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.button,e.relatedTarget)}catch(x){n=0}return n\");n=tcf(n,e);if(n){n.s_fe=1;e.stopPropagation();if (e.stopImmediatePropagation) {e.stopImmediateP"
+"ropagation();}e.preventDefault();s.bct=e.target;s.bce=n}}}}}');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||"
+"(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)"
+"!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagName;if(o.tagUrn||(o.scopeName&&o.scopeName.toUpperCase()!='HTML'))return '';t=t&&t.toUpperCase?t.toUpperCase()"
+":'';if(t=='SHAPE')t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;"
+"if(t&&!o.s_oid){p=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''"
+"),\"\\t\",''),' ','');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o"
+".s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')"
+">=0){if(u!=s.un&&s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un)"
+";return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){v"
+"ar s=this;s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if"
+"(x&&(!Object||!Object.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+"
+"=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o="
+"s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s"
+".apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener){if(s.n&&((s.n.userAgent.indexOf('WebKit')>=0&&s.d.createEvent)||(s."
+"n.userAgent.indexOf('Firefox/2')>=0&&s.wd.MouseEvent))){s.bbc=1;s.useForcedLinkTracking=1;s.b.addEventListener('click',s.bc,true)}s.b.addEventListener('click',s.bc,false)}else s.eh(s.wd,'onload',0,"
+"s.wdl)}};s.vs=function(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n"
+"){if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0"
+"&&m){var n=t.substring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,"
+"i;s.un=s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.u"
+"n.substring(0,i)};s.sa=function(un){var s=this;if(s.un&&s.mpc('sa',arguments))return;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n"
+",a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._"
+"il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}"
+"else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)"
+"g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(s.mpc(\"m_a\",arguments))return;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\"
+"'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m="
+"function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m"
+"[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};"
+"s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s."
+"h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){"
+"if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a("
+"\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c"
+"','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendC"
+"hild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g"
+".length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.voa=function(vo,r){var s=this,l=s.va_g,i,k,v,x;for(i=0;i<l.length;i++){k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"|"
+"|k==\"retrieveLightData\")&&s[k])for(x in s[k])if(!v[x])v[x]=s[k][x];s[k]=v}}};s.vob=function(vo,onlySet){var s=this,l=s.va_g,i,k;for(i=0;i<l.length;i++){k=l[i];vo[k]=s[k];if(!onlySet&&!vo[k])vo['!"
+"'+k]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}"
+"else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.vob(vo);vo._t=d.getTi"
+"me();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s._waitingForMarketingCloudVisitorID = false;s._doneWaitingForMarketingCloudVisitorID = false;s._marketi"
+"ngCloudVisitorIDCallback=function(marketingCloudVisitorID) {var s=this;s.marketingCloudVisitorID = marketingCloudVisitorID;s._doneWaitingForMarketingCloudVisitorID = true;s._callbackWhenReadyToTrac"
+"kCheck();};s._waitingForAnalyticsVisitorID = false;s._doneWaitingForAnalyticsVisitorID = false;s._analyticsVisitorIDCallback=function(analyticsVisitorID) {var s=this;s.analyticsVisitorID = analytic"
+"sVisitorID;s._doneWaitingForAnalyticsVisitorID = true;s._callbackWhenReadyToTrackCheck();};s._waitingForAudienceManagerLocationHint = false;s._doneWaitingForAudienceManagerLocationHint = false;s._a"
+"udienceManagerLocationHintCallback=function(audienceManagerLocationHint) {var s=this;s.audienceManagerLocationHint = audienceManagerLocationHint;s._doneWaitingForAudienceManagerLocationHint = true;"
+"s._callbackWhenReadyToTrackCheck();};s._waitingForAudienceManagerBlob = false;s._doneWaitingForAudienceManagerBlob = false;s._audienceManagerBlobCallback=function(audienceManagerBlob) {var s=this;s"
+".audienceManagerBlob = audienceManagerBlob;s._doneWaitingForAudienceManagerBlob = true;s._callbackWhenReadyToTrackCheck();};s.isReadyToTrack=function() {var s=this,readyToTrack = true,visitor = s.v"
+"isitor;if ((visitor) && (visitor.isAllowed())) {if ((!s._waitingForMarketingCloudVisitorID) && (!s.marketingCloudVisitorID) && (visitor.getMarketingCloudVisitorID)) {s._waitingForMarketingCloudVisi"
+"torID = true;s.marketingCloudVisitorID = visitor.getMarketingCloudVisitorID([s,s._marketingCloudVisitorIDCallback]);if (s.marketingCloudVisitorID) {s._doneWaitingForMarketingCloudVisitorID = true;}"
+"}if ((!s._waitingForAnalyticsVisitorID) && (!s.analyticsVisitorID) && (visitor.getAnalyticsVisitorID)) {s._waitingForAnalyticsVisitorID = true;s.analyticsVisitorID = visitor.getAnalyticsVisitorID(["
+"s,s._analyticsVisitorIDCallback]);if (s.analyticsVisitorID) {s._doneWaitingForAnalyticsVisitorID = true;}}if ((!s._waitingForAudienceManagerLocationHint) && (!s.audienceManagerLocationHint) && (vis"
+"itor.getAudienceManagerLocationHint)) {s._waitingForAudienceManagerLocationHint = true;s.audienceManagerLocationHint = visitor.getAudienceManagerLocationHint([s,s._audienceManagerLocationHintCallba"
+"ck]);if (s.audienceManagerLocationHint) {s._doneWaitingForAudienceManagerLocationHint = true;}}if ((!s._waitingForAudienceManagerBlob) && (!s.audienceManagerBlob) && (visitor.getAudienceManagerBlob"
+")) {s._waitingForAudienceManagerBlob = true;s.audienceManagerBlob = visitor.getAudienceManagerBlob([s,s._audienceManagerBlobCallback]);if (s.audienceManagerBlob) {s._doneWaitingForAudienceManagerBl"
+"ob = true;}}if (((s._waitingForMarketingCloudVisitorID)     && (!s._doneWaitingForMarketingCloudVisitorID)     && (!s.marketingCloudVisitorID)) ||((s._waitingForAnalyticsVisitorID)          && (!s."
+"_doneWaitingForAnalyticsVisitorID)          && (!s.analyticsVisitorID)) ||((s._waitingForAudienceManagerLocationHint) && (!s._doneWaitingForAudienceManagerLocationHint) && (!s.audienceManagerLocati"
+"onHint)) ||((s._waitingForAudienceManagerBlob)         && (!s._doneWaitingForAudienceManagerBlob)         && (!s.audienceManagerBlob))) {readyToTrack = false;}}return readyToTrack;};s._callbackWhen"
+"ReadyToTrackQueue = null;s._callbackWhenReadyToTrackInterval = 0;s.callbackWhenReadyToTrack=function(callbackThis,callback,args) {var s=this,callbackInfo;callbackInfo = {};callbackInfo.callbackThis"
+" = callbackThis;callbackInfo.callback     = callback;callbackInfo.args         = args;if (s._callbackWhenReadyToTrackQueue == null) {s._callbackWhenReadyToTrackQueue = [];}s._callbackWhenReadyToTra"
+"ckQueue.push(callbackInfo);if (s._callbackWhenReadyToTrackInterval == 0) {s._callbackWhenReadyToTrackInterval = setInterval(s._callbackWhenReadyToTrackCheck,100);}};s._callbackWhenReadyToTrackCheck"
+"=new Function('var s=s_c_il['+s._in+'],callbackNum,callbackInfo;if (s.isReadyToTrack()) {if (s._callbackWhenReadyToTrackInterval) {clearInterval(s._callbackWhenReadyToTrackInterval);s._callbackWhen"
+"ReadyToTrackInterval = 0;}if (s._callbackWhenReadyToTrackQueue != null) {while (s._callbackWhenReadyToTrackQueue.length > 0) {callbackInfo = s._callbackWhenReadyToTrackQueue.shift();callbackInfo.ca"
+"llback.apply(callbackInfo.callbackThis,callbackInfo.args);}}}');s._handleNotReadyToTrack=function(variableOverrides) {var s=this,args,varKey,variableOverridesCopy = null,setVariables = null;if (!s."
+"isReadyToTrack()) {args = [];if (variableOverrides != null) {variableOverridesCopy = {};for (varKey in variableOverrides) {variableOverridesCopy[varKey] = variableOverrides[varKey];}}setVariables ="
+" {};s.vob(setVariables,true);args.push(variableOverridesCopy);args.push(setVariables);s.callbackWhenReadyToTrack(s,s.track,args);return true;}return false;};s.gfid=function(){var s=this,d='01234567"
+"89ABCDEF',k='s_fid',fid=s.c_r(k),h='',l='',i,j,m=8,n=4,e=new Date,y;if(!fid||fid.indexOf('-')<0){for(i=0;i<16;i++){j=Math.floor(Math.random()*m);h+=d.substring(j,j+1);j=Math.floor(Math.random()*n);"
+"l+=d.substring(j,j+1);m=n=16}fid=h+'-'+l;}y=e.getYear();e.setYear(y+2+(y<1900?1900:0));if(!s.c_w(k,fid,e))fid=0;return fid};s.track=s.t=function(vo,setVariables){var s=this,notReadyToTrack,trk=1,tm"
+"=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1900?"
+"y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',vb=new Object;if ((!s.supplementalDataID) &&"
+" (s.visitor) && (s.visitor.getSupplementalDataID)) {s.supplementalDataID = s.visitor.getSupplementalDataID(\"AppMeasurement:\" + s._in,(s.expectSupplementalData ? false : true));}if(s.mpc('t',argum"
+"ents))return;s.gl(s.vl_g);s.uns();s.m_ll();notReadyToTrack = s._handleNotReadyToTrack(vo);if (!notReadyToTrack) {if (setVariables) {s.voa(setVariables);}if(!s.td){var tl=tfs.location,a,o,i,x='',c='"
+"',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)"
+"j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next){j='1.7';if(a."
+"reduce){j='1.8';if(j.trim){j='1.8.1';if(Date.parse){j='1.8.2';if(Object.create)j='1.8.5'}}}}}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?"
+"'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.do"
+"cumentElement.offsetWidth;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}ca"
+"tch(e){}return hp');hp=tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.p"
+"l.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeigh"
+"t=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.vob(vb);s.voa(vo)}if(!s.analyticsVisitorID&&!s.marketingCloudVisitorID)s.fid=s.gfid();if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins"
+")s.doPlugins(s);if(!s.abort){var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s."
+"eo){var o=s.eo?s.eo:s.lnk,p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(o){t=s.ot(o);n=s.oid("
+"o);x=o.s_oidt}}if(!n||t=='BODY')o='';if(o){oc=o.onclick?''+o.onclick:'';if((oc.indexOf('s_gs(')>=0&&oc.indexOf('.s_oc(')<0)||oc.indexOf('.tl(')>=0)o=0}}if(o){if(n)ta=o.target;h=s.oh(o);i=h.indexOf("
+"'?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l)){s.pe='lnk_'+(t=='d'||t=='e'?t:'o');s.pev1=(h?s.ape(h):'');s.pev2=(l?s."
+"ape(l):'')}else trk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(o.dataset&&o.dataset.sObjectId){s.wd.s_objectID=o.dataset.sObjectId;}else if(o.getAttribute&&o.getAt"
+"tribute('data-s-object-id')){s.wd.s_objectID=o.getAttribute('data-s-object-id');}else if(s.useForcedLinkTracking){s.wd.s_objectID='';oc=o.onclick?''+o.onclick:'';if(oc){var ocb=oc.indexOf('s_object"
+"ID'),oce,ocq,ocx;if(ocb>=0){ocb+=10;while(ocb<oc.length&&(\"= \\t\\r\\n\").indexOf(oc.charAt(ocb))>=0)ocb++;if(ocb<oc.length){oce=ocb;ocq=ocx=0;while(oce<oc.length&&(oc.charAt(oce)!=';'||ocq)){if(o"
+"cq){if(oc.charAt(oce)==ocq&&!ocx)ocq=0;else if(oc.charAt(oce)==\"\\\\\")ocx=!ocx;else ocx=0;}else{ocq=oc.charAt(oce);if(ocq!='\"'&&ocq!=\"'\")ocq=0}oce++;}oc=oc.substring(ocb,oce);if(oc){o.s_soid=n"
+"ew Function('s','var e;try{s.wd.s_objectID='+oc+'}catch(e){}');o.s_soid(s)}}}}}if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.a"
+"pe(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}else trk=0}if(trk||qs){s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,"
+"ta);qs='';s.m_m('t');if(s.p_r)s.p_r();s.referrer=s.lightProfileID=s.retrieveLightProfiles=s.deleteLightProfiles=''}s.sq(qs)}}}else s.dl(vo);if(vo)s.voa(vb,1);}s.abort=0;s.supplementalDataID=s.pageU"
+"RLRest=s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';return code};s.trackLink=s.tl=function(o,t"
+",n,vo,f){var s=this;s.lnk=o;s.linkType=t;s.linkName=n;if(f){s.bct=o;s.bcf=f}s.t(vo)};s.trackLight=function(p,ss,i,vo){var s=this;s.lightProfileID=p;s.lightStoreForSeconds=ss;s.lightIncrementBy=i;s."
+"t(vo)};s.setTagContainer=function(n){var s=this,l=s.wd.s_c_il,i,t,x,y;s.tcn=n;if(l)for(i=0;i<l.length;i++){t=l[i];if(t&&t._c=='s_l'&&t.tagContainerName==n){s.voa(t);if(t.lmq)for(i=0;i<t.lmq.length;"
+"i++){x=t.lmq[i];y='m_'+x.n;if(!s[y]&&!s[y+'_c']){s[y]=t[y];s[y+'_c']=t[y+'_c']}s.loadModule(x.n,x.u,x.d)}if(t.ml)for(x in t.ml)if(s[x]){y=s[x];x=t.ml[x];for(i in x)if(!Object.prototype[i]){if(typeo"
+"f(x[i])!='function'||(''+x[i]).indexOf('s_c_il')<0)y[i]=x[i]}}if(t.mmq)for(i=0;i<t.mmq.length;i++){x=t.mmq[i];if(s[x.m]){y=s[x.m];if(y[x.f]&&typeof(y[x.f])=='function'){if(x.a)y[x.f].apply(y,x.a);e"
+"lse y[x.f].apply(y)}}}if(t.tq)for(i=0;i<t.tq.length;i++)s.t(t.tq[i]);t.s=s;return}}};s.wd=window;s.ssl=(s.wd.location.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.ge"
+"tElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE ')"
+",o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if"
+"(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parse"
+"Float(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.sa(un);s.vl_l="
+"'supplementalDataID,timestamp,dynamicVariablePrefix,visitorID,marketingCloudVisitorID,analyticsVisitorID,audienceManagerLocationHint,fid,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrat"
+"ionServerSecure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,contextData,currencyCode,lightProfileID,lightStoreForSeconds,lightIncrementBy,retrieveLight"
+"Profiles,deleteLightProfiles,retrieveLightData';s.va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='timestamp,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,contextData,lightProfileID,lightStoreFo"
+"rSeconds,lightIncrementBy';s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,events2,products,audienceManagerBlob,linkName,linkType';var n;"
+"for(n=1;n<=75;n++){s.vl_t+=',prop'+n+',eVar'+n;s.vl_m+=',prop'+n+',eVar'+n}for(n=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<=3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2=',tnt,pe,pev1,pev2,p"
+"ev3,resolution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage,pageURLRest,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+"
+"',trackingServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamic"
+"AccountMatch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo"
+",lightTrackVars,_1_referrer,un';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);s.contextData=new Object;s.retrieveLightData=new Object;if(!ss)s.wds();if(pg){s.wd.s_co=function(o){return o};s.wd.s_gs="
+"function(un){s_gi(un,1,1).t()};s.wd.s_dc=function(un){s_gi(un,1).t()}}",
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

/************* Audience Manager ***********************/
"function"!=typeof DIL&&(DIL=function(a,b){var d=[],c,e;a!==Object(a)&&(a={});var f,h,m,u,s,v,w,q,x,H,I;f=a.partner;h=a.containerNSID;m=a.iframeAttachmentDelay;u=!!a.disableDestinationPublishingIframe;s=a.iframeAkamaiHTTPS;v=a.mappings;w=a.uuidCookie;q=!0===a.enableErrorReporting;x=a.visitorService;H=a.declaredId;I=!0===a.removeFinishedScriptsAndCallbacks;var J,K,E,C;J=!0===a.disableScriptAttachment;K=!0===a.disableDefaultRequest;E=a.afterResultForDefaultRequest;C=a.dpIframeSrc;q&&DIL.errorModule.activate();
var L=!0===window._dil_unit_tests;(c=b)&&d.push(c+"");if(!f||"string"!=typeof f)return c="DIL partner is invalid or not specified in initConfig",DIL.errorModule.handleError({name:"error",message:c,filename:"dil.js"}),Error(c);c="DIL containerNSID is invalid or not specified in initConfig, setting to default of 0";if(h||"number"==typeof h)h=parseInt(h,10),!isNaN(h)&&0<=h&&(c="");c&&(h=0,d.push(c),c="");e=DIL.getDil(f,h);if(e instanceof DIL&&e.api.getPartner()==f&&e.api.getContainerNSID()==h)return e;
if(this instanceof DIL)DIL.registerDil(this,f,h);else return new DIL(a,"DIL was not instantiated with the 'new' operator, returning a valid instance with partner = "+f+" and containerNSID = "+h);var y={IS_HTTPS:"https:"==document.location.protocol,POST_MESSAGE_ENABLED:!!window.postMessage,COOKIE_MAX_EXPIRATION_DATE:"Tue, 19 Jan 2038 03:14:07 UTC"},F={stuffed:{}},n={},p={firingQueue:[],fired:[],firing:!1,sent:[],errored:[],reservedKeys:{sids:!0,pdata:!0,logdata:!0,callback:!0,postCallbackFn:!0,useImageRequest:!0},
callbackPrefix:"demdexRequestCallback",firstRequestHasFired:!1,useJSONP:!0,abortRequests:!1,num_of_jsonp_responses:0,num_of_jsonp_errors:0,num_of_img_responses:0,num_of_img_errors:0,toRemove:[],removed:[],readyToRemove:!1,platformParams:{d_nsid:h+"",d_rtbd:"json",d_jsonv:DIL.jsonVersion+"",d_dst:"1"},nonModStatsParams:{d_rtbd:!0,d_dst:!0,d_cts:!0,d_rs:!0},modStatsParams:null,adms:{TIME_TO_CATCH_ALL_REQUESTS_RELEASE:2E3,calledBack:!1,uuid:null,noVisitorAPI:!1,instance:null,releaseType:"no VisitorAPI",
admsProcessingStarted:!1,process:function(g){try{if(!this.admsProcessingStarted){var a=this,l,k,c,b,d;if("function"==typeof g&&"function"==typeof g.getInstance){if(x===Object(x)&&(l=x.namespace)&&"string"==typeof l)k=g.getInstance(l);else{this.releaseType="no namespace";this.releaseRequests();return}if(k===Object(k)&&"function"==typeof k.isAllowed&&"function"==typeof k.getGlobalVisitorID){if(!k.isAllowed()){this.releaseType="VisitorAPI not allowed";this.releaseRequests();return}this.instance=k;this.admsProcessingStarted=
!0;c=function(g){"VisitorAPI"!=a.releaseType&&(a.uuid=g,a.releaseType="VisitorAPI",a.releaseRequests())};L&&(b=x.server)&&"string"==typeof b&&(k.server=b);d=k.getGlobalVisitorID(c);if("string"==typeof d&&d.length){c(d);return}setTimeout(function(){"VisitorAPI"!=a.releaseType&&(a.releaseType="timeout",a.releaseRequests())},this.TIME_TO_CATCH_ALL_REQUESTS_RELEASE);return}this.releaseType="invalid instance"}else this.noVisitorAPI=!0;this.releaseRequests()}}catch(f){this.releaseRequests()}},releaseRequests:function(){this.calledBack=
!0;p.registerRequest()},getGlobalVisitorID:function(){return this.instance?this.instance.getGlobalVisitorID():null}},declaredId:{uuid:null,declaredId:{init:null,request:null},declaredIdCombos:{},dIdAlwaysOn:!1,dIdInRequest:!1,setDeclaredId:function(g,a){var l=t.isPopulatedString,k=encodeURIComponent;if(g===Object(g)&&l(a)){var c=g.dpid,d=g.dpuuid,b=null;if(l(c)&&l(d)){b=k(c)+"$"+k(d);if(!0===this.declaredIdCombos[b])return"setDeclaredId: combo exists for type '"+a+"'";this.declaredIdCombos[b]=!0;
this.declaredId[a]={dpid:c,dpuuid:d};"init"==a?this.dIdAlwaysOn=!0:"request"==a&&(this.dIdInRequest=!0);return"setDeclaredId: succeeded for type '"+a+"'"}}return"setDeclaredId: failed for type '"+a+"'"},getDeclaredIdQueryString:function(){var g=this.declaredId.request,a=this.declaredId.init,l="";null!==g?l="&d_dpid="+g.dpid+"&d_dpuuid="+g.dpuuid:null!==a&&(l="&d_dpid="+a.dpid+"&d_dpuuid="+a.dpuuid);return l},getUUIDQueryString:function(){var g=p.adms,a=t.isPopulatedString,l=!1,k=p.adms.getGlobalVisitorID();
a(this.uuid)?a(k)&&this.uuid!=k&&(this.uuid=k):this.uuid=k||g.uuid;if(this.dIdAlwaysOn||this.dIdInRequest)l=!0,this.dIdInRequest=!1;return a(this.uuid)&&l?"d_uuid="+this.uuid+"&":""}},registerRequest:function(g){var a=this.firingQueue;g===Object(g)&&a.push(g);!this.firing&&a.length&&(this.adms.calledBack?(g=a.shift(),g.src=g.src.replace(/demdex.net\/event\?d_nsid=/,"demdex.net/event?"+this.declaredId.getUUIDQueryString()+"d_nsid="),z.fireRequest(g),this.firstRequestHasFired||"script"!=g.tag||(this.firstRequestHasFired=
!0)):this.processVisitorAPI())},processVisitorAPI:function(){this.adms.process(window.Visitor)},requestRemoval:function(g){if(!I)return"removeFinishedScriptsAndCallbacks is not boolean true";var a=this.toRemove,l,k;g===Object(g)&&(l=g.script,k=g.callbackName,(l===Object(l)&&"SCRIPT"==l.nodeName||"no script created"==l)&&"string"==typeof k&&k.length&&a.push(g));if(this.readyToRemove&&a.length){k=a.shift();l=k.script;k=k.callbackName;"no script created"!=l?(g=l.src,l.parentNode.removeChild(l)):g=l;
window[k]=null;try{delete window[k]}catch(c){}this.removed.push({scriptSrc:g,callbackName:k});DIL.variables.scriptsRemoved.push(g);DIL.variables.callbacksRemoved.push(k);return this.requestRemoval()}return"requestRemoval() processed"}};e=function(){var g="http://fast.",a="?d_nsid="+h+"#"+encodeURIComponent(document.location.href);if("string"===typeof C&&C.length)return C+a;y.IS_HTTPS&&(g=!0===s?"https://fast.":"https://");return g+f+".demdex.net/dest4.html"+a};var A={THROTTLE_START:3E4,throttleTimerSet:!1,
id:"destination_publishing_iframe_"+f+"_"+h,url:e(),iframe:null,iframeHasLoaded:!1,sendingMessages:!1,messages:[],messagesPosted:[],messageSendingInterval:y.POST_MESSAGE_ENABLED?15:100,jsonProcessed:[],attachIframe:function(){var g=this,a=document.createElement("iframe");a.id=this.id;a.style.cssText="display: none; width: 0; height: 0;";a.src=this.url;r.addListener(a,"load",function(){g.iframeHasLoaded=!0;g.requestToProcess()});document.body.appendChild(a);this.iframe=a},requestToProcess:function(g,
a){var l=this;g&&!t.isEmptyObject(g)&&this.process(g,a);this.iframeHasLoaded&&this.messages.length&&!this.sendingMessages&&(this.throttleTimerSet||(this.throttleTimerSet=!0,setTimeout(function(){l.messageSendingInterval=y.POST_MESSAGE_ENABLED?15:150},this.THROTTLE_START)),this.sendingMessages=!0,this.sendMessages())},process:function(g,a){var l=encodeURIComponent,k,c,d,b,f,e;a===Object(a)&&(e=r.encodeAndBuildRequest([p.declaredId.uuid||"",a.dpid||"",a.dpuuid||""],","));if((k=g.dests)&&k instanceof
Array&&(c=k.length))for(d=0;d<c;d++)b=k[d],b=[l("dests"),l(b.id||""),l(b.y||""),l(b.c||"")],this.addMessage(b.join("|"));if((k=g.ibs)&&k instanceof Array&&(c=k.length))for(d=0;d<c;d++)b=k[d],b=[l("ibs"),l(b.id||""),l(b.tag||""),r.encodeAndBuildRequest(b.url||[],","),l(b.ttl||""),"",e],this.addMessage(b.join("|"));if((k=g.dpcalls)&&k instanceof Array&&(c=k.length))for(d=0;d<c;d++)b=k[d],f=b.callback||{},f=[f.obj||"",f.fn||"",f.key||"",f.tag||"",f.url||""],b=[l("dpm"),l(b.id||""),l(b.tag||""),r.encodeAndBuildRequest(b.url||
[],","),l(b.ttl||""),r.encodeAndBuildRequest(f,","),e],this.addMessage(b.join("|"));this.jsonProcessed.push(g)},addMessage:function(g){var a=encodeURIComponent,a=q?a("---destpub-debug---"):a("---destpub---");this.messages.push(a+g)},sendMessages:function(){var g=this,a;this.messages.length?(a=this.messages.shift(),DIL.xd.postMessage(a,this.url,this.iframe.contentWindow),this.messagesPosted.push(a),setTimeout(function(){g.sendMessages()},this.messageSendingInterval)):this.sendingMessages=!1}},G={traits:function(g){t.isValidPdata(g)&&
(n.sids instanceof Array||(n.sids=[]),r.extendArray(n.sids,g));return this},pixels:function(g){t.isValidPdata(g)&&(n.pdata instanceof Array||(n.pdata=[]),r.extendArray(n.pdata,g));return this},logs:function(g){t.isValidLogdata(g)&&(n.logdata!==Object(n.logdata)&&(n.logdata={}),r.extendObject(n.logdata,g));return this},customQueryParams:function(g){t.isEmptyObject(g)||r.extendObject(n,g,p.reservedKeys);return this},signals:function(g,a){var b,d=g;if(!t.isEmptyObject(d)){if(a&&"string"==typeof a)for(b in d=
{},g)g.hasOwnProperty(b)&&(d[a+b]=g[b]);r.extendObject(n,d,p.reservedKeys)}return this},declaredId:function(g){p.declaredId.setDeclaredId(g,"request");return this},result:function(g){"function"==typeof g&&(n.callback=g);return this},afterResult:function(g){"function"==typeof g&&(n.postCallbackFn=g);return this},useImageRequest:function(){n.useImageRequest=!0;return this},clearData:function(){n={};return this},submit:function(){z.submitRequest(n);n={};return this},getPartner:function(){return f},getContainerNSID:function(){return h},
getEventLog:function(){return d},getState:function(){var g={},a={};r.extendObject(g,p,{callbackPrefix:!0,useJSONP:!0,registerRequest:!0});r.extendObject(a,A,{attachIframe:!0,requestToProcess:!0,process:!0,sendMessages:!0});return{pendingRequest:n,otherRequestInfo:g,destinationPublishingInfo:a}},idSync:function(g){if(g!==Object(g)||"string"!=typeof g.dpid||!g.dpid.length)return"Error: config or config.dpid is empty";if("string"!=typeof g.url||!g.url.length)return"Error: config.url is empty";var a=
g.url,b=g.minutesToLive,d=encodeURIComponent,c=p.declaredId,a=a.replace(/^https:/,"").replace(/^http:/,"");if("undefined"==typeof b)b=20160;else if(b=parseInt(b,10),isNaN(b)||0>=b)return"Error: config.minutesToLive needs to be a positive number";c=r.encodeAndBuildRequest([p.adms.getGlobalVisitorID()||c.uuid||"",g.dpid,g.dpuuid||""],",");g=["ibs",d(g.dpid),"img",d(a),b,"",c];A.addMessage(g.join("|"));p.firstRequestHasFired&&A.requestToProcess();return"Successfully queued"},aamIdSync:function(a){if(a!==
Object(a)||"string"!=typeof a.dpuuid||!a.dpuuid.length)return"Error: config or config.dpuuid is empty";a.url="//dpm.demdex.net/ibs:dpid="+a.dpid+"&dpuuid="+a.dpuuid;return this.idSync(a)},passData:function(a){if(t.isEmptyObject(a))return"Error: json is empty or not an object";z.defaultCallback(a);return"json submitted for processing"},getPlatformParams:function(){return p.platformParams},getEventCallConfigParams:function(){var a=p,b=a.modStatsParams,d=a.platformParams,c;if(!b){b={};for(c in d)d.hasOwnProperty(c)&&
!a.nonModStatsParams[c]&&(b[c.replace(/^d_/,"")]=d[c]);a.modStatsParams=b}return b}},z={submitRequest:function(a){p.registerRequest(z.createQueuedRequest(a));return!0},createQueuedRequest:function(a){var b=p,d,c=a.callback,e="img";if(!t.isEmptyObject(v)){var B,q,s;for(B in v)v.hasOwnProperty(B)&&(q=v[B],null!=q&&""!==q&&B in a&&!(q in a||q in p.reservedKeys)&&(s=a[B],null!=s&&""!==s&&(a[q]=s)))}t.isValidPdata(a.sids)||(a.sids=[]);t.isValidPdata(a.pdata)||(a.pdata=[]);t.isValidLogdata(a.logdata)||
(a.logdata={});a.logdataArray=r.convertObjectToKeyValuePairs(a.logdata,"=",!0);a.logdataArray.push("_ts="+(new Date).getTime());"function"!=typeof c&&(c=this.defaultCallback);if(b.useJSONP=!a.useImageRequest||"boolean"!=typeof a.useImageRequest)e="script",d=b.callbackPrefix+"_"+f+"_"+h+"_"+(new Date).getTime();return{tag:e,src:z.makeRequestSrc(a,d),internalCallbackName:d,callbackFn:c,postCallbackFn:a.postCallbackFn,useImageRequest:a.useImageRequest,requestData:a}},defaultCallback:function(a,b){var d,
c,f,e,h,q,s,v,m;if((d=a.stuff)&&d instanceof Array&&(c=d.length))for(f=0;f<c;f++)if((e=d[f])&&e===Object(e)){h=e.cn;q=e.cv;s=e.ttl;if("undefined"==typeof s||""===s)s=Math.floor(r.getMaxCookieExpiresInMinutes()/60/24);v=e.dmn||"."+document.domain.replace(/^www\./,"");m=e.type;h&&(q||"number"==typeof q)&&("var"!=m&&(s=parseInt(s,10))&&!isNaN(s)&&r.setCookie(h,q,1440*s,"/",v,!1),F.stuffed[h]=q)}d=a.uuid;c=p.declaredId;f=t.isPopulatedString;f(d)&&(f(c.uuid)||(c.uuid=d),t.isEmptyObject(w)||(c=w.path,"string"==
typeof c&&c.length||(c="/"),f=parseInt(w.days,10),isNaN(f)&&(f=100),r.setCookie(w.name||"aam_did",d,1440*f,c,w.domain||"."+document.domain.replace(/^www\./,""),!0===w.secure)));u||p.abortRequests||A.requestToProcess(a,b)},makeRequestSrc:function(a,b){a.sids=t.removeEmptyArrayValues(a.sids||[]);a.pdata=t.removeEmptyArrayValues(a.pdata||[]);var d=p,c=d.platformParams,e=r.encodeAndBuildRequest(a.sids,","),h=r.encodeAndBuildRequest(a.pdata,","),q=(a.logdataArray||[]).join("&");delete a.logdataArray;var s=
y.IS_HTTPS?"https://":"http://",v=d.declaredId.getDeclaredIdQueryString(),m;m=[];var n,w,x,u;for(n in a)if(!(n in d.reservedKeys)&&a.hasOwnProperty(n))if(w=a[n],n=encodeURIComponent(n),w instanceof Array)for(x=0,u=w.length;x<u;x++)m.push(n+"="+encodeURIComponent(w[x]));else m.push(n+"="+encodeURIComponent(w));m=m.length?"&"+m.join("&"):"";return s+f+".demdex.net/event?d_nsid="+c.d_nsid+v+(e.length?"&d_sid="+e:"")+(h.length?"&d_px="+h:"")+(q.length?"&d_ld="+encodeURIComponent(q):"")+m+(d.useJSONP?
"&d_rtbd="+c.d_rtbd+"&d_jsonv="+c.d_jsonv+"&d_dst="+c.d_dst+"&d_cb="+(b||""):"")},fireRequest:function(a){if("img"==a.tag)this.fireImage(a);else if("script"==a.tag){var b=p.declaredId,b=b.declaredId.request||b.declaredId.init||{};this.fireScript(a,{dpid:b.dpid||"",dpuuid:b.dpuuid||""})}},fireImage:function(a){var b=p,f,e;b.abortRequests||(b.firing=!0,f=new Image(0,0),b.sent.push(a),f.onload=function(){b.firing=!1;b.fired.push(a);b.num_of_img_responses++;b.registerRequest()},e=function(f){c="imgAbortOrErrorHandler received the event of type "+
f.type;d.push(c);b.abortRequests=!0;b.firing=!1;b.errored.push(a);b.num_of_img_errors++;b.registerRequest()},f.addEventListener?(f.addEventListener("error",e,!1),f.addEventListener("abort",e,!1)):f.attachEvent&&(f.attachEvent("onerror",e),f.attachEvent("onabort",e)),f.src=a.src)},fireScript:function(a,b){var e=this,k=p,h,q,s=a.src,m=a.postCallbackFn,v="function"==typeof m,n=a.internalCallbackName;k.abortRequests||(k.firing=!0,window[n]=function(e){try{e!==Object(e)&&(e={});var l=a.callbackFn;k.firing=
!1;k.fired.push(a);k.num_of_jsonp_responses++;l(e,b);v&&m(e,b)}catch(h){h.message="DIL jsonp callback caught error with message "+h.message;c=h.message;d.push(c);h.filename=h.filename||"dil.js";h.partner=f;DIL.errorModule.handleError(h);try{l({error:h.name+"|"+h.message}),v&&m({error:h.name+"|"+h.message})}catch(s){}}finally{k.requestRemoval({script:q,callbackName:n}),k.registerRequest()}},J?(k.firing=!1,k.requestRemoval({script:"no script created",callbackName:n})):(q=document.createElement("script"),
q.addEventListener&&q.addEventListener("error",function(b){k.requestRemoval({script:q,callbackName:n});c="jsonp script tag error listener received the event of type "+b.type+" with src "+s;e.handleScriptError(c,a)},!1),q.type="text/javascript",q.src=s,h=DIL.variables.scriptNodeList[0],h.parentNode.insertBefore(q,h)),k.sent.push(a),k.declaredId.declaredId.request=null)},handleScriptError:function(a,b){var c=p;d.push(a);c.abortRequests=!0;c.firing=!1;c.errored.push(b);c.num_of_jsonp_errors++;c.registerRequest()}},
t={isValidPdata:function(a){return a instanceof Array&&this.removeEmptyArrayValues(a).length?!0:!1},isValidLogdata:function(a){return!this.isEmptyObject(a)},isEmptyObject:function(a){if(a!==Object(a))return!0;for(var b in a)if(a.hasOwnProperty(b))return!1;return!0},removeEmptyArrayValues:function(a){for(var b=0,c=a.length,d,f=[],b=0;b<c;b++)d=a[b],"undefined"!=typeof d&&null!=d&&f.push(d);return f},isPopulatedString:function(a){return"string"==typeof a&&a.length}},r={addListener:function(){if(document.addEventListener)return function(a,
b,d){a.addEventListener(b,function(a){"function"==typeof d&&d(a)},!1)};if(document.attachEvent)return function(a,b,d){a.attachEvent("on"+b,function(a){"function"==typeof d&&d(a)})}}(),convertObjectToKeyValuePairs:function(a,b,d){var c=[];b=b||"=";var f,e;for(f in a)e=a[f],"undefined"!=typeof e&&null!=e&&c.push(f+b+(d?encodeURIComponent(e):e));return c},encodeAndBuildRequest:function(a,b){return this.map(a,function(a){return encodeURIComponent(a)}).join(b)},map:function(a,b){if(Array.prototype.map)return a.map(b);
if(void 0===a||null===a)throw new TypeError;var d=Object(a),c=d.length>>>0;if("function"!==typeof b)throw new TypeError;for(var f=Array(c),e=0;e<c;e++)e in d&&(f[e]=b.call(b,d[e],e,d));return f},filter:function(a,b){if(!Array.prototype.filter){if(void 0===a||null===a)throw new TypeError;var d=Object(a),c=d.length>>>0;if("function"!==typeof b)throw new TypeError;for(var f=[],e=0;e<c;e++)if(e in d){var h=d[e];b.call(b,h,e,d)&&f.push(h)}return f}return a.filter(b)},getCookie:function(a){a+="=";var b=
document.cookie.split(";"),d,c,e;d=0;for(c=b.length;d<c;d++){for(e=b[d];" "==e.charAt(0);)e=e.substring(1,e.length);if(0==e.indexOf(a))return decodeURIComponent(e.substring(a.length,e.length))}return null},setCookie:function(a,b,d,c,e,f){var h=new Date;d&&(d*=6E4);document.cookie=a+"="+encodeURIComponent(b)+(d?";expires="+(new Date(h.getTime()+d)).toUTCString():"")+(c?";path="+c:"")+(e?";domain="+e:"")+(f?";secure":"")},extendArray:function(a,b){return a instanceof Array&&b instanceof Array?(Array.prototype.push.apply(a,
b),!0):!1},extendObject:function(a,b,d){var c;if(a===Object(a)&&b===Object(b)){for(c in b)!b.hasOwnProperty(c)||!t.isEmptyObject(d)&&c in d||(a[c]=b[c]);return!0}return!1},getMaxCookieExpiresInMinutes:function(){return((new Date(y.COOKIE_MAX_EXPIRATION_DATE)).getTime()-(new Date).getTime())/1E3/60}};"error"==f&&0==h&&r.addListener(window,"load",function(){DIL.windowLoaded=!0});var D=function(){N();u||p.abortRequests||A.attachIframe();p.readyToRemove=!0;p.requestRemoval()},N=function(){u||setTimeout(function(){K||
p.firstRequestHasFired||p.adms.admsProcessingStarted||p.adms.calledBack||("function"==typeof E?G.afterResult(E).submit():G.submit())},DIL.constants.TIME_TO_DEFAULT_REQUEST)},M=document;"error"!=f&&(DIL.windowLoaded?D():"complete"!=M.readyState&&"loaded"!=M.readyState?r.addListener(window,"load",D):DIL.isAddedPostWindowLoadWasCalled?r.addListener(window,"load",D):(m="number"==typeof m?parseInt(m,10):0,0>m&&(m=0),setTimeout(D,m||DIL.constants.TIME_TO_CATCH_ALL_DP_IFRAME_ATTACHMENT)));p.declaredId.setDeclaredId(H,
"init");this.api=G;this.getStuffedVariable=function(a){var b=F.stuffed[a];b||"number"==typeof b||(b=r.getCookie(a))||"number"==typeof b||(b="");return b};this.validators=t;this.helpers=r;this.constants=y;this.log=d;L&&(this.pendingRequest=n,this.requestController=p,this.setDestinationPublishingUrl=e,this.destinationPublishing=A,this.requestProcs=z,this.variables=F)},function(){var a=document,b;null==a.readyState&&a.addEventListener&&(a.readyState="loading",a.addEventListener("DOMContentLoaded",b=
function(){a.removeEventListener("DOMContentLoaded",b,!1);a.readyState="complete"},!1))}(),DIL.extendStaticPropertiesAndMethods=function(a){var b;if(a===Object(a))for(b in a)a.hasOwnProperty(b)&&(this[b]=a[b])},DIL.extendStaticPropertiesAndMethods({version:"4.8",jsonVersion:1,constants:{TIME_TO_DEFAULT_REQUEST:50,TIME_TO_CATCH_ALL_DP_IFRAME_ATTACHMENT:500},variables:{scriptNodeList:document.getElementsByTagName("script"),scriptsRemoved:[],callbacksRemoved:[]},windowLoaded:!1,dils:{},isAddedPostWindowLoadWasCalled:!1,
isAddedPostWindowLoad:function(a){this.isAddedPostWindowLoadWasCalled=!0;this.windowLoaded="function"==typeof a?!!a():"boolean"==typeof a?a:!0},create:function(a){try{return new DIL(a)}catch(b){return(new Image(0,0)).src="http://error.demdex.net/event?d_nsid=0&d_px=14137&d_ld=name%3Derror%26filename%3Ddil.js%26partner%3Dno_partner%26message%3DError%2520in%2520attempt%2520to%2520create%2520DIL%2520instance%2520with%2520DIL.create()%26_ts%3D"+(new Date).getTime(),Error("Error in attempt to create DIL instance with DIL.create()")}},
registerDil:function(a,b,d){b=b+"$"+d;b in this.dils||(this.dils[b]=a)},getDil:function(a,b){var d;"string"!=typeof a&&(a="");b||(b=0);d=a+"$"+b;return d in this.dils?this.dils[d]:Error("The DIL instance with partner = "+a+" and containerNSID = "+b+" was not found")},dexGetQSVars:function(a,b,d){b=this.getDil(b,d);return b instanceof this?b.getStuffedVariable(a):""},xd:{postMessage:function(a,b,d){var c=1;b&&(window.postMessage?d.postMessage(a,b.replace(/([^:]+:\/\/[^\/]+).*/,"$1")):b&&(d.location=
b.replace(/#.*$/,"")+"#"+ +new Date+c++ +"&"+a))}}}),DIL.errorModule=function(){var a=DIL.create({partner:"error",containerNSID:0,disableDestinationPublishingIframe:!0}),b={harvestererror:14138,destpuberror:14139,dpmerror:14140,generalerror:14137,error:14137,noerrortypedefined:15021,evalerror:15016,rangeerror:15017,referenceerror:15018,typeerror:15019,urierror:15020},d=!1;return{activate:function(){d=!0},handleError:function(c){if(!d)return"DIL error module has not been activated";c!==Object(c)&&
(c={});var e=c.name?(new String(c.name)).toLowerCase():"",f=[];c={name:e,filename:c.filename?c.filename+"":"",partner:c.partner?c.partner+"":"no_partner",site:c.site?c.site+"":document.location.href,message:c.message?c.message+"":""};f.push(e in b?b[e]:b.noerrortypedefined);a.api.pixels(f).logs(c).useImageRequest().submit();return"DIL error report sent"},pixelMap:b}}(),DIL.tools={},DIL.modules={helpers:{handleModuleError:function(a,b,d){var c="";b=b||"Error caught in DIL module/submodule: ";a===Object(a)?
c=b+(a.message||"err has no message"):(c=b+"err is not a valid object",a={});a.message=c;d instanceof DIL&&(a.partner=d.api.getPartner());DIL.errorModule.handleError(a);return this.errorMessage=c}}});
DIL.tools.getSearchReferrer=function(a,b){var d=DIL.getDil("error"),c=DIL.tools.decomposeURI(a||document.referrer),e="",f="",h={queryParam:"q"};return(e=d.helpers.filter([b===Object(b)?b:{},{hostPattern:/aol\./},{hostPattern:/ask\./},{hostPattern:/bing\./},{hostPattern:/google\./},{hostPattern:/yahoo\./,queryParam:"p"}],function(a){return!(!a.hasOwnProperty("hostPattern")||!c.hostname.match(a.hostPattern))}).shift())?{valid:!0,name:c.hostname,keywords:(d.helpers.extendObject(h,e),f=h.queryPattern?
(e=(""+c.search).match(h.queryPattern))?e[1]:"":c.uriParams[h.queryParam],decodeURIComponent(f||"").replace(/\+|%20/g," "))}:{valid:!1,name:"",keywords:""}};
DIL.tools.decomposeURI=function(a){var b=DIL.getDil("error"),d=document.createElement("a");d.href=a||document.referrer;return{hash:d.hash,host:d.host.split(":").shift(),hostname:d.hostname,href:d.href,pathname:d.pathname.replace(/^\//,""),protocol:d.protocol,search:d.search,uriParams:function(a,d){b.helpers.map(d.split("&"),function(b){b=b.split("=");a[b.shift()]=b.shift()});return a}({},d.search.replace(/^(\/|\?)?|\/$/g,""))}};
DIL.tools.getMetaTags=function(){var a={},b=document.getElementsByTagName("meta"),d,c,e,f,h;d=0;for(e=arguments.length;d<e;d++)if(f=arguments[d],null!==f)for(c=0;c<b.length;c++)if(h=b[c],h.name==f){a[f]=h.content;break}return a};
DIL.modules.siteCatalyst={dil:null,handle:DIL.modules.helpers.handleModuleError,init:function(a,b,d){try{var c=this,e={name:"DIL Site Catalyst Module Error"},f=function(a){e.message=a;DIL.errorModule.handleError(e);return a};this.dil=null;if(b instanceof DIL)this.dil=b;else return f("dilInstance is not a valid instance of DIL");e.partner=b.api.getPartner();if(a!==Object(a))return f("siteCatalystReportingSuite is not an object");window.AppMeasurement_Module_DIL=a.m_DIL=function(a){var b="function"===
typeof a.m_i?a.m_i("DIL"):this;if(b!==Object(b))return f("m is not an object");b.trackVars=c.constructTrackVars(d);b.d=0;b.s=a;b._t=function(){var a,b,d=","+this.trackVars+",",c=this.s,e,h=[];e=[];var m={},u=!1;if(c!==Object(c))return f("Error in m._t function: s is not an object");if(this.d){if("function"==typeof c.foreachVar)c.foreachVar(function(a,b){m[a]=b;u=!0},this.trackVars);else{if(!(c.va_t instanceof Array))return f("Error in m._t function: s.va_t is not an array");if(c.lightProfileID)(a=
c.lightTrackVars)&&(a=","+a+","+c.vl_mr+",");else if(c.pe||c.linkType)a=c.linkTrackVars,c.pe&&(b=c.pe.substring(0,1).toUpperCase()+c.pe.substring(1),c[b]&&(a=c[b].trackVars)),a&&(a=","+a+","+c.vl_l+","+c.vl_l2+",");if(a){b=0;for(h=a.split(",");b<h.length;b++)0<=d.indexOf(","+h[b]+",")&&e.push(h[b]);e.length&&(d=","+e.join(",")+",")}e=0;for(b=c.va_t.length;e<b;e++)a=c.va_t[e],0<=d.indexOf(","+a+",")&&null!=c[a]&&""!==c[a]&&(m[a]=c[a],u=!0)}u&&this.d.api.signals(m,"c_").submit()}}};a.loadModule("DIL");
a.DIL.d=b;return e.message?e.message:"DIL.modules.siteCatalyst.init() completed with no errors"}catch(h){return this.handle(h,"DIL.modules.siteCatalyst.init() caught error with message ",this.dil)}},constructTrackVars:function(a){var b=[],d,c,e,f,h;if(a===Object(a)){d=a.names;if(d instanceof Array&&(e=d.length))for(c=0;c<e;c++)f=d[c],"string"==typeof f&&f.length&&b.push(f);a=a.iteratedNames;if(a instanceof Array&&(e=a.length))for(c=0;c<e;c++)if(d=a[c],d===Object(d)&&(f=d.name,h=parseInt(d.maxIndex,
10),"string"==typeof f&&f.length&&!isNaN(h)&&0<=h))for(d=0;d<=h;d++)b.push(f+d);if(b.length)return b.join(",")}return this.constructTrackVars({names:"pageName channel campaign products events pe pev1 pev2 pev3".split(" "),iteratedNames:[{name:"prop",maxIndex:75},{name:"eVar",maxIndex:75}]})}};
DIL.modules.GA={dil:null,arr:null,tv:null,errorMessage:"",defaultTrackVars:["_setAccount","_setCustomVar","_addItem","_addTrans","_trackSocial"],defaultTrackVarsObj:null,signals:{},hasSignals:!1,handle:DIL.modules.helpers.handleModuleError,init:function(a,b,d){try{this.tv=this.arr=this.dil=null;this.errorMessage="";this.signals={};this.hasSignals=!1;var c={name:"DIL GA Module Error"},e="";b instanceof DIL?(this.dil=b,c.partner=this.dil.api.getPartner()):(e="dilInstance is not a valid instance of DIL",
c.message=e,DIL.errorModule.handleError(c));a instanceof Array&&a.length?this.arr=a:(e="gaArray is not an array or is empty",c.message=e,DIL.errorModule.handleError(c));this.tv=this.constructTrackVars(d);this.errorMessage=e}catch(f){this.handle(f,"DIL.modules.GA.init() caught error with message ",this.dil)}finally{return this}},constructTrackVars:function(a){var b=[],d,c,e,f;if(this.defaultTrackVarsObj!==Object(this.defaultTrackVarsObj)){e=this.defaultTrackVars;f={};d=0;for(c=e.length;d<c;d++)f[e[d]]=
!0;this.defaultTrackVarsObj=f}else f=this.defaultTrackVarsObj;if(a===Object(a)){a=a.names;if(a instanceof Array&&(c=a.length))for(d=0;d<c;d++)e=a[d],"string"==typeof e&&e.length&&e in f&&b.push(e);if(b.length)return b}return this.defaultTrackVars},constructGAObj:function(a){var b={};a=a instanceof Array?a:this.arr;var d,c,e,f;d=0;for(c=a.length;d<c;d++)e=a[d],e instanceof Array&&e.length&&(e=[],f=a[d],e instanceof Array&&f instanceof Array&&Array.prototype.push.apply(e,f),f=e.shift(),"string"==typeof f&&
f.length&&(b[f]instanceof Array||(b[f]=[]),b[f].push(e)));return b},addToSignals:function(a,b){if("string"!=typeof a||""===a||null==b||""===b)return!1;this.signals[a]instanceof Array||(this.signals[a]=[]);this.signals[a].push(b);return this.hasSignals=!0},constructSignals:function(){var a=this.constructGAObj(),b={_setAccount:function(a){this.addToSignals("c_accountId",a)},_setCustomVar:function(a,b,c,d){"string"==typeof b&&b.length&&this.addToSignals("c_"+b,c)},_addItem:function(a,b,c,d,e,f){this.addToSignals("c_itemOrderId",
a);this.addToSignals("c_itemSku",b);this.addToSignals("c_itemName",c);this.addToSignals("c_itemCategory",d);this.addToSignals("c_itemPrice",e);this.addToSignals("c_itemQuantity",f)},_addTrans:function(a,b,c,d,e,f,h,m){this.addToSignals("c_transOrderId",a);this.addToSignals("c_transAffiliation",b);this.addToSignals("c_transTotal",c);this.addToSignals("c_transTax",d);this.addToSignals("c_transShipping",e);this.addToSignals("c_transCity",f);this.addToSignals("c_transState",h);this.addToSignals("c_transCountry",
m)},_trackSocial:function(a,b,c,d){this.addToSignals("c_socialNetwork",a);this.addToSignals("c_socialAction",b);this.addToSignals("c_socialTarget",c);this.addToSignals("c_socialPagePath",d)}},d=this.tv,c,e,f,h,m,u;c=0;for(e=d.length;c<e;c++)if(f=d[c],a.hasOwnProperty(f)&&b.hasOwnProperty(f)&&(u=a[f],u instanceof Array))for(h=0,m=u.length;h<m;h++)b[f].apply(this,u[h])},submit:function(){try{if(""!==this.errorMessage)return this.errorMessage;this.constructSignals();return this.hasSignals?(this.dil.api.signals(this.signals).submit(),
"Signals sent: "+this.dil.helpers.convertObjectToKeyValuePairs(this.signals,"=",!0)+this.dil.log):"No signals present"}catch(a){return this.handle(a,"DIL.modules.GA.submit() caught error with message ",this.dil)}},Stuffer:{LIMIT:5,dil:null,cookieName:null,delimiter:null,errorMessage:"",handle:DIL.modules.helpers.handleModuleError,callback:null,v:function(){return!1},init:function(a,b,d){try{this.callback=this.dil=null,this.errorMessage="",a instanceof DIL?(this.dil=a,this.v=this.dil.validators.isPopulatedString,
this.cookieName=this.v(b)?b:"aam_ga",this.delimiter=this.v(d)?d:"|"):this.handle({message:"dilInstance is not a valid instance of DIL"},"DIL.modules.GA.Stuffer.init() error: ")}catch(c){this.handle(c,"DIL.modules.GA.Stuffer.init() caught error with message ",this.dil)}finally{return this}},process:function(a){var b,d,c,e,f,h;h=!1;var m=1;if(a===Object(a)&&(b=a.stuff)&&b instanceof Array&&(d=b.length))for(a=0;a<d;a++)if((c=b[a])&&c===Object(c)&&(e=c.cn,f=c.cv,e==this.cookieName&&this.v(f))){h=!0;break}if(h){b=
f.split(this.delimiter);"undefined"==typeof window._gaq&&(window._gaq=[]);c=window._gaq;a=0;for(d=b.length;a<d&&!(h=b[a].split("="),f=h[0],h=h[1],this.v(f)&&this.v(h)&&c.push(["_setCustomVar",m++,f,h,1]),m>this.LIMIT);a++);this.errorMessage=1<m?"No errors - stuffing successful":"No valid values to stuff"}else this.errorMessage="Cookie name and value not found in json";if("function"==typeof this.callback)return this.callback()},submit:function(){try{var a=this;if(""!==this.errorMessage)return this.errorMessage;
this.dil.api.afterResult(function(b){a.process(b)}).submit();return"DIL.modules.GA.Stuffer.submit() successful"}catch(b){return this.handle(b,"DIL.modules.GA.Stuffer.submit() caught error with message ",this.dil)}}}};
DIL.modules.Peer39={aid:"",dil:null,optionals:null,errorMessage:"",calledBack:!1,script:null,scriptsSent:[],returnedData:[],handle:DIL.modules.helpers.handleModuleError,init:function(a,b,d){try{this.dil=null;this.errorMessage="";this.calledBack=!1;this.optionals=d===Object(d)?d:{};d={name:"DIL Peer39 Module Error"};var c=[],e="";this.isSecurePageButNotEnabled(document.location.protocol)&&(e="Module has not been enabled for a secure page",c.push(e),d.message=e,DIL.errorModule.handleError(d));b instanceof
DIL?(this.dil=b,d.partner=this.dil.api.getPartner()):(e="dilInstance is not a valid instance of DIL",c.push(e),d.message=e,DIL.errorModule.handleError(d));"string"==typeof a&&a.length?this.aid=a:(e="aid is not a string or is empty",c.push(e),d.message=e,DIL.errorModule.handleError(d));this.errorMessage=c.join("\n")}catch(f){this.handle(f,"DIL.modules.Peer39.init() caught error with message ",this.dil)}finally{return this}},isSecurePageButNotEnabled:function(a){return"https:"==a&&!0!==this.optionals.enableHTTPS?
!0:!1},constructSignals:function(){var a=this,b=this.constructScript(),d=DIL.variables.scriptNodeList[0];window["afterFinished_"+this.aid]=function(){try{var b=a.processData(p39_KVP_Short("c_p","|").split("|"));b.hasSignals&&a.dil.api.signals(b.signals).submit()}catch(d){}finally{a.calledBack=!0,"function"==typeof a.optionals.afterResult&&a.optionals.afterResult()}};d.parentNode.insertBefore(b,d);this.scriptsSent.push(b);return"Request sent to Peer39"},processData:function(a){var b,d,c,e,f={},h=!1;
this.returnedData.push(a);if(a instanceof Array)for(b=0,d=a.length;b<d;b++)c=a[b].split("="),e=c[0],c=c[1],e&&isFinite(c)&&!isNaN(parseInt(c,10))&&(f[e]instanceof Array||(f[e]=[]),f[e].push(c),h=!0);return{hasSignals:h,signals:f}},constructScript:function(){var a=document.createElement("script"),b=this.optionals,d=b.scriptId,c=b.scriptSrc,b=b.scriptParams;a.id="string"==typeof d&&d.length?d:"peer39ScriptLoader";a.type="text/javascript";"string"==typeof c&&c.length?a.src=c:(a.src=(this.dil.constants.IS_HTTPS?
"https:":"http:")+"//stags.peer39.net/"+this.aid+"/trg_"+this.aid+".js","string"==typeof b&&b.length&&(a.src+="?"+b));return a},submit:function(){try{return""!==this.errorMessage?this.errorMessage:this.constructSignals()}catch(a){return this.handle(a,"DIL.modules.Peer39.submit() caught error with message ",this.dil)}}};
var fDil = DIL.create({
			partner: "ford",
			uuidCookie:{
				name:'aam_uuid',
				days:30
				}
			});
var _scDilObj = s_gi(s_account);
DIL.modules.siteCatalyst.init(_scDilObj, fDil, {
	names: ['pageName', 'channel', 'campaign', 'products', 'events', 'pe', 'referrer', 'server', 'purchaseID', 'zip', 'state'],
	iteratedNames: [{
		name: 'eVar',
		maxIndex: 75
		}, {
		name: 'prop',
		maxIndex: 75
		}, {
		name: 'pev',
		maxIndex: 3
		}, {
		name: 'hier',
		maxIndex: 4
		}, {
		name: "list",
		maxIndex: 3
		}]
	});
	
	
function objIsEmpty(obj) { 
    for(var prop in obj) { 
        if(obj.hasOwnProperty(prop) && prop !== "") 
                return false; 
    }; 
        return true; 
    };

var uriData = DIL.tools.decomposeURI(document.URL);
delete uriData.hash;
delete uriData.search;
delete uriData.href;
if(! objIsEmpty(uriData.uriParams)){ 
	fDil.api.signals(uriData.uriParams, 'c_');
};
if(objIsEmpty(uriData.pathname)){ 
	delete uriData.pathname;
};
delete uriData.uriParams;

fDil.api.signals(uriData, 'c_').submit();

var b = fDil.helpers.getCookie("s_vi");
if(b){
	b = b.split("|")[1].split("[")[0];
	fDil.api.aamIdSync({
		dpid: '1308',
		dpuuid: b,
		minutesToLive: 20160
	});
};

if(typeof fDil != 'undefined' && typeof s.eVar31 != 'undefined' && s.eVar31 /*&& s.eVar31 != <ADD NOT LOGGED IN VALUE HERE>*/)
{
	var cksId = s.eVar31;
	fDil.api.aamIdSync({
		dpid: '1307',
		dpuuid: cksId,
		minutesToLive: 20160
	});
};



(function(e,t){"use strict";function n(e){var t=Array.prototype.slice.call(arguments,1);return e.prop?e.prop.apply(e,t):e.attr.apply(e,t)}function s(e,t,n){var s,a;for(s in n)n.hasOwnProperty(s)&&(a=s.replace(/ |$/g,t.eventNamespace),e.bind(a,n[s]))}function a(e,t,n){s(e,n,{focus:function(){t.addClass(n.focusClass)},blur:function(){t.removeClass(n.focusClass),t.removeClass(n.activeClass)},mouseenter:function(){t.addClass(n.hoverClass)},mouseleave:function(){t.removeClass(n.hoverClass),t.removeClass(n.activeClass)},"mousedown touchbegin":function(){e.is(":disabled")||t.addClass(n.activeClass)},"mouseup touchend":function(){t.removeClass(n.activeClass)}})}function i(e,t){e.removeClass(t.hoverClass+" "+t.focusClass+" "+t.activeClass)}function r(e,t,n){n?e.addClass(t):e.removeClass(t)}function l(e,t,n){var s="checked",a=t.is(":"+s);t.prop?t.prop(s,a):a?t.attr(s,s):t.removeAttr(s),r(e,n.checkedClass,a)}function u(e,t,n){r(e,n.disabledClass,t.is(":disabled"))}function o(e,t,n){switch(n){case"after":return e.after(t),e.next();case"before":return e.before(t),e.prev();case"wrap":return e.wrap(t),e.parent()}return null}function c(t,s,a){var i,r,l;return a||(a={}),a=e.extend({bind:{},divClass:null,divWrap:"wrap",spanClass:null,spanHtml:null,spanWrap:"wrap"},a),i=e("<div />"),r=e("<span />"),s.autoHide&&t.is(":hidden")&&"none"===t.css("display")&&i.hide(),a.divClass&&i.addClass(a.divClass),s.wrapperClass&&i.addClass(s.wrapperClass),a.spanClass&&r.addClass(a.spanClass),l=n(t,"id"),s.useID&&l&&n(i,"id",s.idPrefix+"-"+l),a.spanHtml&&r.html(a.spanHtml),i=o(t,i,a.divWrap),r=o(t,r,a.spanWrap),u(i,t,s),{div:i,span:r}}function d(t,n){var s;return n.wrapperClass?(s=e("<span />").addClass(n.wrapperClass),s=o(t,s,"wrap")):null}function f(){var t,n,s,a;return a="rgb(120,2,153)",n=e('<div style="width:0;height:0;color:'+a+'">'),e("body").append(n),s=n.get(0),t=window.getComputedStyle?window.getComputedStyle(s,"").color:(s.currentStyle||s.style||{}).color,n.remove(),t.replace(/ /g,"")!==a}function p(t){return t?e("<span />").text(t).html():""}function m(){return navigator.cpuClass&&!navigator.product}function v(){return window.XMLHttpRequest!==void 0?!0:!1}function h(e){var t;return e[0].multiple?!0:(t=n(e,"size"),!t||1>=t?!1:!0)}function C(){return!1}function w(e,t){var n="none";s(e,t,{"selectstart dragstart mousedown":C}),e.css({MozUserSelect:n,msUserSelect:n,webkitUserSelect:n,userSelect:n})}function b(e,t,n){var s=e.val();""===s?s=n.fileDefaultHtml:(s=s.split(/[\/\\]+/),s=s[s.length-1]),t.text(s)}function y(e,t,n){var s,a;for(s=[],e.each(function(){var e;for(e in t)Object.prototype.hasOwnProperty.call(t,e)&&(s.push({el:this,name:e,old:this.style[e]}),this.style[e]=t[e])}),n();s.length;)a=s.pop(),a.el.style[a.name]=a.old}function g(e,t){var n;n=e.parents(),n.push(e[0]),n=n.not(":visible"),y(n,{visibility:"hidden",display:"block",position:"absolute"},t)}function k(e,t){return function(){e.unwrap().unwrap().unbind(t.eventNamespace)}}var H=!0,x=!1,A=[{match:function(e){return e.is("a, button, :submit, :reset, input[type='button']")},apply:function(e,t){var r,l,o,d,f;return l=t.submitDefaultHtml,e.is(":reset")&&(l=t.resetDefaultHtml),d=e.is("a, button")?function(){return e.html()||l}:function(){return p(n(e,"value"))||l},o=c(e,t,{divClass:t.buttonClass,spanHtml:d()}),r=o.div,a(e,r,t),f=!1,s(r,t,{"click touchend":function(){var t,s,a,i;f||e.is(":disabled")||(f=!0,e[0].dispatchEvent?(t=document.createEvent("MouseEvents"),t.initEvent("click",!0,!0),s=e[0].dispatchEvent(t),e.is("a")&&s&&(a=n(e,"target"),i=n(e,"href"),a&&"_self"!==a?window.open(i,a):document.location.href=i)):e.click(),f=!1)}}),w(r,t),{remove:function(){return r.after(e),r.remove(),e.unbind(t.eventNamespace),e},update:function(){i(r,t),u(r,e,t),e.detach(),o.span.html(d()).append(e)}}}},{match:function(e){return e.is(":checkbox")},apply:function(e,t){var n,r,o;return n=c(e,t,{divClass:t.checkboxClass}),r=n.div,o=n.span,a(e,r,t),s(e,t,{"click touchend":function(){l(o,e,t)}}),l(o,e,t),{remove:k(e,t),update:function(){i(r,t),o.removeClass(t.checkedClass),l(o,e,t),u(r,e,t)}}}},{match:function(e){return e.is(":file")},apply:function(t,r){function l(){b(t,p,r)}var d,f,p,v;return d=c(t,r,{divClass:r.fileClass,spanClass:r.fileButtonClass,spanHtml:r.fileButtonHtml,spanWrap:"after"}),f=d.div,v=d.span,p=e("<span />").html(r.fileDefaultHtml),p.addClass(r.filenameClass),p=o(t,p,"after"),n(t,"size")||n(t,"size",f.width()/10),a(t,f,r),l(),m()?s(t,r,{click:function(){t.trigger("change"),setTimeout(l,0)}}):s(t,r,{change:l}),w(p,r),w(v,r),{remove:function(){return p.remove(),v.remove(),t.unwrap().unbind(r.eventNamespace)},update:function(){i(f,r),b(t,p,r),u(f,t,r)}}}},{match:function(e){if(e.is("input")){var t=(" "+n(e,"type")+" ").toLowerCase(),s=" color date datetime datetime-local email month number password search tel text time url week ";return s.indexOf(t)>=0}return!1},apply:function(e,t){var s,i;return s=n(e,"type"),e.addClass(t.inputClass),i=d(e,t),a(e,e,t),t.inputAddTypeAsClass&&e.addClass(s),{remove:function(){e.removeClass(t.inputClass),t.inputAddTypeAsClass&&e.removeClass(s),i&&e.unwrap()},update:C}}},{match:function(e){return e.is(":radio")},apply:function(t,r){var o,d,f;return o=c(t,r,{divClass:r.radioClass}),d=o.div,f=o.span,a(t,d,r),s(t,r,{"click touchend":function(){e.uniform.update(e(':radio[name="'+n(t,"name")+'"]'))}}),l(f,t,r),{remove:k(t,r),update:function(){i(d,r),l(f,t,r),u(d,t,r)}}}},{match:function(e){return e.is("select")&&!h(e)?!0:!1},apply:function(t,n){var r,l,o,d;return n.selectAutoWidth&&g(t,function(){d=t.width()}),r=c(t,n,{divClass:n.selectClass,spanHtml:(t.find(":selected:first")||t.find("option:first")).html(),spanWrap:"before"}),l=r.div,o=r.span,n.selectAutoWidth?g(t,function(){y(e([o[0],l[0]]),{display:"block"},function(){var e;e=o.outerWidth()-o.width(),l.width(d+e),o.width(d)})}):l.addClass("fixedWidth"),a(t,l,n),s(t,n,{change:function(){o.html(t.find(":selected").html()),l.removeClass(n.activeClass)},"click touchend":function(){var e=t.find(":selected").html();o.html()!==e&&t.trigger("change")},keyup:function(){o.html(t.find(":selected").html())}}),w(o,n),{remove:function(){return o.remove(),t.unwrap().unbind(n.eventNamespace),t},update:function(){n.selectAutoWidth?(e.uniform.restore(t),t.uniform(n)):(i(l,n),o.html(t.find(":selected").html()),u(l,t,n))}}}},{match:function(e){return e.is("select")&&h(e)?!0:!1},apply:function(e,t){var n;return e.addClass(t.selectMultiClass),n=d(e,t),a(e,e,t),{remove:function(){e.removeClass(t.selectMultiClass),n&&e.unwrap()},update:C}}},{match:function(e){return e.is("textarea")},apply:function(e,t){var n;return e.addClass(t.textareaClass),n=d(e,t),a(e,e,t),{remove:function(){e.removeClass(t.textareaClass),n&&e.unwrap()},update:C}}}];m()&&!v()&&(H=!1),e.uniform={defaults:{activeClass:"active",autoHide:!0,buttonClass:"button",checkboxClass:"checker",checkedClass:"checked",disabledClass:"disabled",eventNamespace:".uniform",fileButtonClass:"action",fileButtonHtml:"Choose File",fileClass:"uploader",fileDefaultHtml:"No file selected",filenameClass:"filename",focusClass:"focus",hoverClass:"hover",idPrefix:"uniform",inputAddTypeAsClass:!0,inputClass:"uniform-input",radioClass:"radio",resetDefaultHtml:"Reset",resetSelector:!1,selectAutoWidth:!0,selectClass:"selector",selectMultiClass:"uniform-multiselect",submitDefaultHtml:"Submit",textareaClass:"uniform",useID:!0,wrapperClass:null},elements:[]},e.fn.uniform=function(t){var n=this;return t=e.extend({},e.uniform.defaults,t),x||(x=!0,f()&&(H=!1)),H?(t.resetSelector&&e(t.resetSelector).mouseup(function(){window.setTimeout(function(){e.uniform.update(n)},10)}),this.each(function(){var n,s,a,i=e(this);if(i.data("uniformed"))return e.uniform.update(i),void 0;for(n=0;A.length>n;n+=1)if(s=A[n],s.match(i,t))return a=s.apply(i,t),i.data("uniformed",a),e.uniform.elements.push(i.get(0)),void 0})):this},e.uniform.restore=e.fn.uniform.restore=function(n){n===t&&(n=e.uniform.elements),e(n).each(function(){var t,n,s=e(this);n=s.data("uniformed"),n&&(n.remove(),t=e.inArray(this,e.uniform.elements),t>=0&&e.uniform.elements.splice(t,1),s.removeData("uniformed"))})},e.uniform.update=e.fn.uniform.update=function(n){n===t&&(n=e.uniform.elements),e(n).each(function(){var t,n=e(this);t=n.data("uniformed"),t&&t.update(n,t.options)})}})(jQuery);


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
 * Foundation Responsive Library
 * http://foundation.zurb.com
 * Copyright 2014, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/

(function ($, window, document, undefined) {
  'use strict';

  var header_helpers = function (class_array) {
    var i = class_array.length;
    var head = $('head');

    while (i--) {
      if(head.has('.' + class_array[i]).length === 0) {
        head.append('<meta class="' + class_array[i] + '" />');
      }
    }
  };

  header_helpers([
    'foundation-mq-small',
    'foundation-mq-medium',
    'foundation-mq-large',
    'foundation-mq-xlarge',
    'foundation-mq-xxlarge',
    'foundation-data-attribute-namespace']);

  // Enable FastClick if present

  $(function() {
    if (typeof FastClick !== 'undefined') {
      // Don't attach to body if undefined
      if (typeof document.body !== 'undefined') {
        FastClick.attach(document.body);
      }
    }
  });

  // private Fast Selector wrapper,
  // returns jQuery object. Only use where
  // getElementById is not available.
  var S = function (selector, context) {
    if (typeof selector === 'string') {
      if (context) {
        var cont;
        if (context.jquery) {
          cont = context[0];
          if (!cont) return context;
        } else {
          cont = context;
        }
        return $(cont.querySelectorAll(selector));
      }

      return $(document.querySelectorAll(selector));
    }

    return $(selector, context);
  };

  // Namespace functions.

  var attr_name = function (init) {
    var arr = [];
    if (!init) arr.push('data');
    if (this.namespace.length > 0) arr.push(this.namespace);
    arr.push(this.name);

    return arr.join('-');
  };

  var add_namespace = function (str) {
    var parts = str.split('-'),
        i = parts.length,
        arr = [];

    while (i--) {
      if (i !== 0) {
        arr.push(parts[i]);
      } else {
        if (this.namespace.length > 0) {
          arr.push(this.namespace, parts[i]);
        } else {
          arr.push(parts[i]);
        }
      }
    }

    return arr.reverse().join('-');
  };

  // Event binding and data-options updating.

  var bindings = function (method, options) {
    var self = this,
        should_bind_events = !S(this).data(this.attr_name(true));

    if (typeof method === 'string') {
      return this[method].call(this, options);
    }

    if (S(this.scope).is('[' + this.attr_name() +']')) {
      S(this.scope).data(this.attr_name(true) + '-init', $.extend({}, this.settings, (options || method), this.data_options(S(this.scope))));

      if (should_bind_events) {
        this.events(this.scope);
      }

    } else {
      S('[' + this.attr_name() +']', this.scope).each(function () {
        var should_bind_events = !S(this).data(self.attr_name(true) + '-init');
        S(this).data(self.attr_name(true) + '-init', $.extend({}, self.settings, (options || method), self.data_options(S(this))));

        if (should_bind_events) {
          self.events(this);
        }
      });
    }
  };

  var single_image_loaded = function (image, callback) {
    function loaded () {
      callback(image[0]);
    }

    function bindLoad () {
      this.one('load', loaded);

      if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
        var src = this.attr( 'src' ),
            param = src.match( /\?/ ) ? '&' : '?';

        param += 'random=' + (new Date()).getTime();
        this.attr('src', src + param);
      }
    }

    if (!image.attr('src')) {
      loaded();
      return;
    }

    if (image[0].complete || image[0].readyState === 4) {
      loaded();
    } else {
      bindLoad.call(image);
    }
  };

  /*
    https://github.com/paulirish/matchMedia.js
  */

  window.matchMedia = window.matchMedia || (function( doc ) {

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

    return function (q) {

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

  /*
   * jquery.requestAnimationFrame
   * https://github.com/gnarf37/jquery-requestAnimationFrame
   * Requires jQuery 1.8+
   *
   * Copyright (c) 2012 Corey Frang
   * Licensed under the MIT license.
   */

  (function($) {

  // requestAnimationFrame polyfill adapted from Erik M??ller
  // fixes from Paul Irish and Tino Zijdel
  // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

  var animating,
      lastTime = 0,
      vendors = ['webkit', 'moz'],
      requestAnimationFrame = window.requestAnimationFrame,
      cancelAnimationFrame = window.cancelAnimationFrame,
      jqueryFxAvailable = 'undefined' !== typeof jQuery.fx;

  for (; lastTime < vendors.length && !requestAnimationFrame; lastTime++) {
    requestAnimationFrame = window[ vendors[lastTime] + "RequestAnimationFrame" ];
    cancelAnimationFrame = cancelAnimationFrame ||
      window[ vendors[lastTime] + "CancelAnimationFrame" ] ||
      window[ vendors[lastTime] + "CancelRequestAnimationFrame" ];
  }

  function raf() {
    if (animating) {
      requestAnimationFrame(raf);

      if (jqueryFxAvailable) {
        jQuery.fx.tick();
      }
    }
  }

  if (requestAnimationFrame) {
    // use rAF
    window.requestAnimationFrame = requestAnimationFrame;
    window.cancelAnimationFrame = cancelAnimationFrame;

    if (jqueryFxAvailable) {
      jQuery.fx.timer = function (timer) {
        if (timer() && jQuery.timers.push(timer) && !animating) {
          animating = true;
          raf();
        }
      };

      jQuery.fx.stop = function () {
        animating = false;
      };
    }
  } else {
    // polyfill
    window.requestAnimationFrame = function (callback) {
      var currTime = new Date().getTime(),
        timeToCall = Math.max(0, 16 - (currTime - lastTime)),
        id = window.setTimeout(function () {
          callback(currTime + timeToCall);
        }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };

  }

  }( jQuery ));


  function removeQuotes (string) {
    if (typeof string === 'string' || string instanceof String) {
      string = string.replace(/^['\\/"]+|(;\s?})+|['\\/"]+$/g, '');
    }

    return string;
  }

  window.Foundation = {
    name : 'Foundation',

    version : '5.2.3',

    media_queries : {
      small : S('.foundation-mq-small').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
      medium : S('.foundation-mq-medium').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
      large : S('.foundation-mq-large').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
      xlarge: S('.foundation-mq-xlarge').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
      xxlarge: S('.foundation-mq-xxlarge').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, '')
    },

    stylesheet : $('<style></style>').appendTo('head')[0].sheet,

    global: {
      namespace: undefined
    },

    init : function (scope, libraries, method, options, response) {
      var args = [scope, method, options, response],
          responses = [];

      // check RTL
      this.rtl = /rtl/i.test(S('html').attr('dir'));

      // set foundation global scope
      this.scope = scope || this.scope;

      this.set_namespace();

      if (libraries && typeof libraries === 'string' && !/reflow/i.test(libraries)) {
        if (this.libs.hasOwnProperty(libraries)) {
          responses.push(this.init_lib(libraries, args));
        }
      } else {
        for (var lib in this.libs) {
          responses.push(this.init_lib(lib, libraries));
        }
      }

      return scope;
    },

    init_lib : function (lib, args) {
      if (this.libs.hasOwnProperty(lib)) {
        this.patch(this.libs[lib]);

        if (args && args.hasOwnProperty(lib)) {
            if (typeof this.libs[lib].settings !== 'undefined') {
                $.extend(true, this.libs[lib].settings, args[lib]);
            }
            else if (typeof this.libs[lib].defaults !== 'undefined') {
                $.extend(true, this.libs[lib].defaults, args[lib]);
            }
          return this.libs[lib].init.apply(this.libs[lib], [this.scope, args[lib]]);
        }

        args = args instanceof Array ? args : new Array(args);    // PATCH: added this line
        return this.libs[lib].init.apply(this.libs[lib], args);
      }

      return function () {};
    },

    patch : function (lib) {
      lib.scope = this.scope;
      lib.namespace = this.global.namespace;
      lib.rtl = this.rtl;
      lib['data_options'] = this.utils.data_options;
      lib['attr_name'] = attr_name;
      lib['add_namespace'] = add_namespace;
      lib['bindings'] = bindings;
      lib['S'] = this.utils.S;
    },

    inherit : function (scope, methods) {
      var methods_arr = methods.split(' '),
          i = methods_arr.length;

      while (i--) {
        if (this.utils.hasOwnProperty(methods_arr[i])) {
          scope[methods_arr[i]] = this.utils[methods_arr[i]];
        }
      }
    },

    set_namespace: function () {

      // Description:
      //    Don't bother reading the namespace out of the meta tag
      //    if the namespace has been set globally in javascript
      //
      // Example:
      //    Foundation.global.namespace = 'my-namespace';
      // or make it an empty string:
      //    Foundation.global.namespace = '';
      //
      //

      // If the namespace has not been set (is undefined), try to read it out of the meta element.
      // Otherwise use the globally defined namespace, even if it's empty ('')
      var namespace = ( this.global.namespace === undefined ) ? $('.foundation-data-attribute-namespace').css('font-family') : this.global.namespace;

      // Finally, if the namsepace is either undefined or false, set it to an empty string.
      // Otherwise use the namespace value.
      this.global.namespace = ( namespace === undefined || /false/i.test(namespace) ) ? '' : namespace;
    },

    libs : {},

    // methods that can be inherited in libraries
    utils : {

      // Description:
      //    Fast Selector wrapper returns jQuery object. Only use where getElementById
      //    is not available.
      //
      // Arguments:
      //    Selector (String): CSS selector describing the element(s) to be
      //    returned as a jQuery object.
      //
      //    Scope (String): CSS selector describing the area to be searched. Default
      //    is document.
      //
      // Returns:
      //    Element (jQuery Object): jQuery object containing elements matching the
      //    selector within the scope.
      S : S,

      // Description:
      //    Executes a function a max of once every n milliseconds
      //
      // Arguments:
      //    Func (Function): Function to be throttled.
      //
      //    Delay (Integer): Function execution threshold in milliseconds.
      //
      // Returns:
      //    Lazy_function (Function): Function with throttling applied.
      throttle : function (func, delay) {
        var timer = null;

        return function () {
          var context = this, args = arguments;

          if (timer == null) {
            timer = setTimeout(function () {
              func.apply(context, args);
              timer = null;
            }, delay);
          }
        };
      },

      // Description:
      //    Executes a function when it stops being invoked for n seconds
      //    Modified version of _.debounce() http://underscorejs.org
      //
      // Arguments:
      //    Func (Function): Function to be debounced.
      //
      //    Delay (Integer): Function execution threshold in milliseconds.
      //
      //    Immediate (Bool): Whether the function should be called at the beginning
      //    of the delay instead of the end. Default is false.
      //
      // Returns:
      //    Lazy_function (Function): Function with debouncing applied.
      debounce : function (func, delay, immediate) {
        var timeout, result;
        return function () {
          var context = this, args = arguments;
          var later = function () {
            timeout = null;
            if (!immediate) result = func.apply(context, args);
          };
          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, delay);
          if (callNow) result = func.apply(context, args);
          return result;
        };
      },

      // Description:
      //    Parses data-options attribute
      //
      // Arguments:
      //    El (jQuery Object): Element to be parsed.
      //
      // Returns:
      //    Options (Javascript Object): Contents of the element's data-options
      //    attribute.
      data_options : function (el, data_attr_name) {
        data_attr_name = data_attr_name || 'options';
        var opts = {}, ii, p, opts_arr,
            data_options = function (el) {
              var namespace = Foundation.global.namespace;

              if (namespace.length > 0) {
                return el.data(namespace + '-' + data_attr_name);
              }

              return el.data(data_attr_name);
            };

        var cached_options = data_options(el);

        if (typeof cached_options === 'object') {
          return cached_options;
        }

        opts_arr = (cached_options || ':').split(';');
        ii = opts_arr.length;

        function isNumber (o) {
          return ! isNaN (o-0) && o !== null && o !== "" && o !== false && o !== true;
        }

        function trim (str) {
          if (typeof str === 'string') return $.trim(str);
          return str;
        }

        while (ii--) {
          p = opts_arr[ii].split(':');
          p = [p[0], p.slice(1).join(':')];

          if (/true/i.test(p[1])) p[1] = true;
          if (/false/i.test(p[1])) p[1] = false;
          if (isNumber(p[1])) {
            if (p[1].indexOf('.') === -1) {
              p[1] = parseInt(p[1], 10);
            } else {
              p[1] = parseFloat(p[1]);
            }
          }

          if (p.length === 2 && p[0].length > 0) {
            opts[trim(p[0])] = trim(p[1]);
          }
        }

        return opts;
      },

      // Description:
      //    Adds JS-recognizable media queries
      //
      // Arguments:
      //    Media (String): Key string for the media query to be stored as in
      //    Foundation.media_queries
      //
      //    Class (String): Class name for the generated <meta> tag
      register_media : function (media, media_class) {
        if(Foundation.media_queries[media] === undefined) {
          $('head').append('<meta class="' + media_class + '">');
          Foundation.media_queries[media] = removeQuotes($('.' + media_class).css('font-family'));
        }
      },

      // Description:
      //    Add custom CSS within a JS-defined media query
      //
      // Arguments:
      //    Rule (String): CSS rule to be appended to the document.
      //
      //    Media (String): Optional media query string for the CSS rule to be
      //    nested under.
      add_custom_rule : function (rule, media) {
        if (media === undefined && Foundation.stylesheet) {
          Foundation.stylesheet.insertRule(rule, Foundation.stylesheet.cssRules.length);
        } else {
          var query = Foundation.media_queries[media];

          if (query !== undefined) {
            Foundation.stylesheet.insertRule('@media ' +
              Foundation.media_queries[media] + '{ ' + rule + ' }');
          }
        }
      },

      // Description:
      //    Performs a callback function when an image is fully loaded
      //
      // Arguments:
      //    Image (jQuery Object): Image(s) to check if loaded.
      //
      //    Callback (Function): Function to execute when image is fully loaded.
      image_loaded : function (images, callback) {
        var self = this,
            unloaded = images.length;

        if (unloaded === 0) {
          callback(images);
        }

        images.each(function () {
          single_image_loaded(self.S(this), function () {
            unloaded -= 1;
            if (unloaded === 0) {
              callback(images);
            }
          });
        });
      },

      // Description:
      //    Returns a random, alphanumeric string
      //
      // Arguments:
      //    Length (Integer): Length of string to be generated. Defaults to random
      //    integer.
      //
      // Returns:
      //    Rand (String): Pseudo-random, alphanumeric string.
      random_str : function () {
        if (!this.fidx) this.fidx = 0;
        this.prefix = this.prefix || [(this.name || 'F'), (+new Date).toString(36)].join('-');

        return this.prefix + (this.fidx++).toString(36);
      }
    }
  };

  $.fn.foundation = function () {
    var args = Array.prototype.slice.call(arguments, 0);

    return this.each(function () {
      Foundation.init.apply(Foundation, [this].concat(args));
      return this;
    });
  };

}(jQuery, window, window.document));


;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.equalizer = {
    name : 'equalizer',

    version : '5.2.3',

    settings : {
      use_tallest: true,
      before_height_change: $.noop,
      after_height_change: $.noop,
      equalize_on_stack: false
    },

    init : function (scope, method, options) {
      Foundation.inherit(this, 'image_loaded');
      this.bindings(method, options);
      this.reflow();
    },

    events : function () {
      this.S(window).off('.equalizer').on('resize.fndtn.equalizer', function(e){
        this.reflow();
      }.bind(this));
    },

    equalize: function(equalizer) {
      var isStacked = false,
          vals = equalizer.find('[' + this.attr_name() + '-watch]:visible'),
          settings = equalizer.data(this.attr_name(true)+'-init');

      if (vals.length === 0) return;
      var firstTopOffset = vals.first().offset().top;
      settings.before_height_change();
      equalizer.trigger('before-height-change');
      vals.height('inherit');
      vals.each(function(){
        var el = $(this);
        if (el.offset().top !== firstTopOffset) {
          isStacked = true;
        }
      });

      if (settings.equalize_on_stack === false) {
        if (isStacked) return;
      };

      var heights = vals.map(function(){ return $(this).outerHeight(false) }).get();

      if (settings.use_tallest) {
        var max = Math.max.apply(null, heights);
        vals.css('height', max);
      } else {
        var min = Math.min.apply(null, heights);
        vals.css('height', min);
      }
      settings.after_height_change();
      equalizer.trigger('after-height-change');
    },

    reflow : function () {
      var self = this;

      this.S('[' + this.attr_name() + ']', this.scope).each(function(){
        var $eq_target = $(this);
        self.image_loaded(self.S('img', this), function(){
          self.equalize($eq_target)
        });
      });
    }
  };
})(jQuery, window, window.document);



;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.reveal = {
    name : 'reveal',

    version : '5.2.3',

    locked : false,

    settings : {
      animation: 'fadeAndPop',
      animation_speed: 250,
      close_on_background_click: true,
      close_on_esc: true,
      dismiss_modal_class: 'close-reveal-modal',
      bg_class: 'reveal-modal-bg',
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
      $.extend(true, this.settings, method, options);
      this.bindings(method, options);
    },

    events : function (scope) {
      var self = this,
          S = self.S;

      S(this.scope)
        .off('.reveal')
        .on('click.fndtn.reveal', '[' + this.add_namespace('data-reveal-id') + ']', function (e) {
          e.preventDefault();

          if (!self.locked) {
            var element = S(this),
                ajax = element.data(self.data_attr('reveal-ajax'));

            self.locked = true;

            if (typeof ajax === 'undefined') {
              self.open.call(self, element);
            } else {
              var url = ajax === true ? element.attr('href') : ajax;

              self.open.call(self, element, {url: url});
            }
          }
        });

      S(document)
        .on('touchend.fndtn.reveal click.fndtn.reveal', this.close_targets(), function (e) {

          e.preventDefault();

          if (!self.locked) {
            var settings = S('[' + self.attr_name() + '].open').data(self.attr_name(true) + '-init'),
                bg_clicked = S(e.target)[0] === S('.' + settings.bg_class)[0];

            if (bg_clicked) {
              if (settings.close_on_background_click) {
                e.stopPropagation();
              } else {
                return;
              }
            }

            self.locked = true;
            self.close.call(self, bg_clicked ? S('[' + self.attr_name() + '].open') : S(this).closest('[' + self.attr_name() + ']'));
          }
        });

      if(S('[' + self.attr_name() + ']', this.scope).length > 0) {
        S(this.scope)
          // .off('.reveal')
          .on('open.fndtn.reveal', this.settings.open)
          .on('opened.fndtn.reveal', this.settings.opened)
          .on('opened.fndtn.reveal', this.open_video)
          .on('close.fndtn.reveal', this.settings.close)
          .on('closed.fndtn.reveal', this.settings.closed)
          .on('closed.fndtn.reveal', this.close_video);
      } else {
        S(this.scope)
          // .off('.reveal')
          .on('open.fndtn.reveal', '[' + self.attr_name() + ']', this.settings.open)
          .on('opened.fndtn.reveal', '[' + self.attr_name() + ']', this.settings.opened)
          .on('opened.fndtn.reveal', '[' + self.attr_name() + ']', this.open_video)
          .on('close.fndtn.reveal', '[' + self.attr_name() + ']', this.settings.close)
          .on('closed.fndtn.reveal', '[' + self.attr_name() + ']', this.settings.closed)
          .on('closed.fndtn.reveal', '[' + self.attr_name() + ']', this.close_video);
      }

      return true;
    },

    // PATCH #3: turning on key up capture only when a reveal window is open
    key_up_on : function (scope) {
      var self = this;

      // PATCH #1: fixing multiple keyup event trigger from single key press
      self.S('body').off('keyup.fndtn.reveal').on('keyup.fndtn.reveal', function ( event ) {
        var open_modal = self.S('[' + self.attr_name() + '].open'),
            settings = open_modal.data(self.attr_name(true) + '-init');
        // PATCH #2: making sure that the close event can be called only while unlocked,
        //           so that multiple keyup.fndtn.reveal events don't prevent clean closing of the reveal window.
        if ( settings && event.which === 27  && settings.close_on_esc && !self.locked) { // 27 is the keycode for the Escape key
          self.close.call(self, open_modal);
        }
      });

      return true;
    },

    // PATCH #3: turning on key up capture only when a reveal window is open
    key_up_off : function (scope) {
      this.S('body').off('keyup.fndtn.reveal');
      return true;
    },

    open : function (target, ajax_settings) {
      var self = this,
          modal;

      if (target) {
        if (typeof target.selector !== 'undefined') {
          // Find the named node; only use the first one found, since the rest of the code assumes there's only one node
          modal = self.S('#' + target.data(self.data_attr('reveal-id'))).first();
        } else {
          modal = self.S(this.scope);

          ajax_settings = target;
        }
      } else {
        modal = self.S(this.scope);
      }

      var settings = modal.data(self.attr_name(true) + '-init');
      settings = settings || this.settings;

      if (!modal.hasClass('open')) {
        var open_modal = self.S('[' + self.attr_name() + '].open');

        if (typeof modal.data('css-top') === 'undefined') {
          modal.data('css-top', parseInt(modal.css('top'), 10))
            .data('offset', this.cache_offset(modal));
        }

        this.key_up_on(modal);    // PATCH #3: turning on key up capture only when a reveal window is open
        modal.trigger('open');

        if (open_modal.length < 1) {
          this.toggle_bg(modal, true);
        }

        if (typeof ajax_settings === 'string') {
          ajax_settings = {
            url: ajax_settings
          };
        }

        if (typeof ajax_settings === 'undefined' || !ajax_settings.url) {
          if (open_modal.length > 0) {
            this.hide(open_modal, settings.css.close);
          }

          this.show(modal, settings.css.open);
        } else {
          var old_success = typeof ajax_settings.success !== 'undefined' ? ajax_settings.success : null;

          $.extend(ajax_settings, {
            success: function (data, textStatus, jqXHR) {
              if ( $.isFunction(old_success) ) {
                old_success(data, textStatus, jqXHR);
              }

              modal.html(data);
              self.S(modal).foundation('section', 'reflow');
              self.S(modal).children().foundation();

              if (open_modal.length > 0) {
                self.hide(open_modal, settings.css.close);
              }
              self.show(modal, settings.css.open);
            }
          });

          $.ajax(ajax_settings);
        }
      }
    },

    close : function (modal) {
      var modal = modal && modal.length ? modal : this.S(this.scope),
          open_modals = this.S('[' + this.attr_name() + '].open'),
          settings = modal.data(this.attr_name(true) + '-init') || this.settings;

      if (open_modals.length > 0) {
        this.locked = true;
        this.key_up_off(modal);   // PATCH #3: turning on key up capture only when a reveal window is open
        modal.trigger('close');
        this.toggle_bg(modal, false);
        this.hide(open_modals, settings.css.close, settings);
      }
    },

    close_targets : function () {
      var base = '.' + this.settings.dismiss_modal_class;

      if (this.settings.close_on_background_click) {
        return base + ', .' + this.settings.bg_class;
      }

      return base;
    },

    toggle_bg : function (modal, state) {
      if (this.S('.' + this.settings.bg_class).length === 0) {
        this.settings.bg = $('<div />', {'class': this.settings.bg_class})
          .appendTo('body').hide();
      }

      var visible = this.settings.bg.filter(':visible').length > 0;
      if ( state != visible ) {
        if ( state == undefined ? visible : !state ) {
          this.hide(this.settings.bg);
        } else {
          this.show(this.settings.bg);
        }
      }
    },

    show : function (el, css) {
      // is modal
      if (css) {
        var settings = el.data(this.attr_name(true) + '-init');
        settings = settings || this.settings;

        if (el.parent('body').length === 0) {
          var placeholder = el.wrap('<div style="display: none;" />').parent(),
              rootElement = this.settings.rootElement || 'body';

          el.on('closed.fndtn.reveal.wrapped', function() {
            el.detach().appendTo(placeholder);
            el.unwrap().unbind('closed.fndtn.reveal.wrapped');
          });

          el.detach().appendTo(rootElement);
        }

        var animData = getAnimationData(settings.animation);
        if (!animData.animate) {
          this.locked = false;
        }
        if (animData.pop) {
          css.top = $(window).scrollTop() - el.data('offset') + 'px';
          var end_css = {
            top: $(window).scrollTop() + el.data('css-top') + 'px',
            opacity: 1
          };

          return setTimeout(function () {
            return el
              .css(css)
              .animate(end_css, settings.animation_speed, 'linear', function () {
                this.locked = false;
                el.trigger('opened');
              }.bind(this))
              .addClass('open');
          }.bind(this), settings.animation_speed / 2);
        }

        if (animData.fade) {
          css.top = $(window).scrollTop() + el.data('css-top') + 'px';
          var end_css = {opacity: 1};

          return setTimeout(function () {
            return el
              .css(css)
              .animate(end_css, settings.animation_speed, 'linear', function () {
                this.locked = false;
                el.trigger('opened');
              }.bind(this))
              .addClass('open');
          }.bind(this), settings.animation_speed / 2);
        }

        return el.css(css).show().css({opacity: 1}).addClass('open').trigger('opened');
      }

      var settings = this.settings;

      // should we animate the background?
      if (getAnimationData(settings.animation).fade) {
        return el.fadeIn(settings.animation_speed / 2);
      }

      this.locked = false;

      return el.show();
    },

    hide : function (el, css) {
      // is modal
      if (css) {
        var settings = el.data(this.attr_name(true) + '-init');
        settings = settings || this.settings;

        var animData = getAnimationData(settings.animation);
        if (!animData.animate) {
          this.locked = false;
        }
        if (animData.pop) {
          var end_css = {
            top: - $(window).scrollTop() - el.data('offset') + 'px',
            opacity: 0
          };

          return setTimeout(function () {
            return el
              .animate(end_css, settings.animation_speed, 'linear', function () {
                this.locked = false;
                el.css(css).trigger('closed');
              }.bind(this))
              .removeClass('open');
          }.bind(this), settings.animation_speed / 2);
        }

        if (animData.fade) {
          var end_css = {opacity: 0};

          return setTimeout(function () {
            return el
              .animate(end_css, settings.animation_speed, 'linear', function () {
                this.locked = false;
                el.css(css).trigger('closed');
              }.bind(this))
              .removeClass('open');
          }.bind(this), settings.animation_speed / 2);
        }

        return el.hide().css(css).removeClass('open').trigger('closed');
      }

      var settings = this.settings;

      // should we animate the background?
      if (getAnimationData(settings.animation).fade) {
        return el.fadeOut(settings.animation_speed / 2);
      }

      return el.hide();
    },

    close_video : function (e) {
      var video = $('.flex-video', e.target),
          iframe = $('iframe', video);

      if (iframe.length > 0) {
        iframe.attr('data-src', iframe[0].src);
        iframe.attr('src', 'about:blank');
        video.hide();
      }
    },

    open_video : function (e) {
      var video = $('.flex-video', e.target),
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

    data_attr: function (str) {
      if (this.namespace.length > 0) {
        return this.namespace + '-' + str;
      }

      return str;
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

  /*
   * getAnimationData('popAndFade') // {animate: true,  pop: true,  fade: true}
   * getAnimationData('fade')       // {animate: true,  pop: false, fade: true}
   * getAnimationData('pop')        // {animate: true,  pop: true,  fade: false}
   * getAnimationData('foo')        // {animate: false, pop: false, fade: false}
   * getAnimationData(null)         // {animate: false, pop: false, fade: false}
   */
  function getAnimationData(str) {
    var fade = /fade/i.test(str);
    var pop = /pop/i.test(str);
    return {
      animate: fade || pop,
      pop: pop,
      fade: fade
    };
  }
}(jQuery, window, window.document));


/*
Author: Roy Anonuevo
File name: foundationInit.js
Description: Initialize foundation
Dependencies: JQuery, foundation.js
*/

(function($){
	$(function(){
		$(document).foundation();
	});
})(jQuery);


/*
Author: 		Randell Quitain
File name: 		tools.js
Description: 	Global tools
Dependencies: 	jQuery
Usage: 			// encode a url string - param: url/string
				qlApp.tools.encode(uri);

				// decode a url string - param: url/string
				qlApp.tools.decode(uri);
				
				// get specifically the #rest-services data
				qlApp.tools.restServicesData();
				
				// get specifically the #common-config data
				qlApp.tools.commonConfigData();
				
				// get a custom x-json script data - param: x-json script id
				qlApp.tools.getEmbeddedData(id);
				
				// get object length - param: object
				qlApp.tools.getObjectLength(obj);

				// check if object is empty - param: object
				qlApp.tools.isEmpty(obj);

				// check if browser currently used is IE, returns boolean - param: IE version, comparison
				// is it IE8?
				qlApp.tools.isIE(8);

				// is it less than or equal to IE 6?
				qlApp.tools.isIE(7, 'lte');
				
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
				
				qlApp.tools.cleanData(data);

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
				Example: qlApp.tools.isIOS()?true:false;
				qlApp.tools.isIOS();

				//check if device is mobile [or not]
				qlApp.tools.isMobile();

*/

var qlApp = qlApp || {};

(function($){
	qlApp.tools = {

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
		loader: function(element) {
			element.prev('.loading').remove();
			element.removeClass('module-loader');
		},
		imageLoader: function(element, callback) {
			var imgLoad = imagesLoaded( element );
			imgLoad.on( 'always', function( instance ) {
				// show carousel nav
				if(qlApp.viewport.view !== "mobile" && $('.flex-direction-nav', element).length > 0) { $('.flex-direction-nav', element).show(); }
				if(typeof callback === "function") { callback(); }
			}).promise().done(function(){
				qlApp.billboardCarousel.init();
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
		}


	
	}

})(jQuery);


/*
Author: 		
File name: 		embeddedData.js
Description: 	Read JSON data
Dependencies: 	jQuery
Usage: 			<script id="price-urls" type="text/x-json">
 				{
  					"xhr-calcprice-data":"GetPrices.js",
 					"xhr-calcprice-form":"overlay-calculateprice.html?v2"
  				}
  				</script>

  				var mydata = $("price-urls").embeddedData();
*/
(function($){
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
})(jQuery);


/*
Author: 		Ruiwen Qin
File name: 		viewport.js
Description: 	Find out the viewport width
Dependencies: 	jQuery 
Usage: 			Use qlApp.viewport.view for your condition. The value of qlApp.viewport is either mobile or tablet.
*/
var qlApp = qlApp || {};

(function($){
	qlApp.viewport = {
		view:'',
		init: function(){
			if ($(window).width() < 768){
				qlApp.viewport.view = "mobile";
			}
			else {
				qlApp.viewport.view = "tablet";
			}
			this.resize();
		},
		resize: function(){
			$(window).on("resize", function() {
				if ($(window).width() < 768){
					qlApp.viewport.view = "mobile";
				}
				else {
					qlApp.viewport.view = "tablet";
				}
			});
		}	
	}

	$(function(){
		qlApp.viewport.init();
	});

})(jQuery);


/*
Author: 		Roy Anonuevo
File name: 		navigation.js
Description: 	global navigation functionalities and animations including language selector
Dependencies: 	jQuery
*/

(function($){

	var navigation = {

		init: function(){			
			if(!$('#header').length){return;}

			var self = this;

			// cache dom
			this.$window = $(window);
			this.$document = $(document);
			this.$header = $('#header');
			this.$burgerMenu = this.$header.find(".burger-menu");
			this.$languageSelector = this.$header.find(".language-selector");
			this.$languageSelectorLink = this.$header.find(".language-selector > a");
			this.$languageSelectorList = this.$languageSelector.find(".language-selector-list");
			this.$nav = this.$header.find("nav");
			this.$navLink = this.$nav.find("ul li a");
			this.$navPanel = this.$nav.find(".nav-panel");

			this.burgerNav();

			// bind listener
			this.$window.on('resize', this.winResize.bind(this));
			//this.$burgerMenu.on('click', this.toggleMenu.bind(this));
			this.$navLink.on('click', this.navLink.bind(this));	
			this.$document.on('click', this.documentPropagation.bind(this));
			this.$navPanel.on('click', this.stopPropagation.bind(this));
			this.$languageSelectorLink.on('click', this.languageSelector.bind(this));
			this.$languageSelector.on('click', this.stopPropagation.bind(this));
			
			this.detectColumns();		

		},

		winResize: function(){
			if(qlApp.viewport.view == "mobile"){				
				this.$nav.hide();
				setTimeout(function(){ $("nav","#header").show(); }, 100);
			}else{
				this.$nav.show();
			}
		},

		// toggleMenu: function(){
		// 	var self = this;

		// 	if(qlApp.viewport.view == "mobile"){
		// 		self.$nav.show();

		// 		setTimeout(function(){ self.$header.toggleClass("show"); }, 100);
		// 	}else{
		// 		self.$header.toggleClass("show");
		// 	}
		// },

		burgerNav: function(){
			$(".burger-menu","#header").on('click', function(e){
				e.preventDefault();
				$("#header").toggleClass("show");
			});
		},

		navLink: function(e){
			var el = e.target;

			if(qlApp.viewport.view != "mobile" && !$(el).parent().hasClass("active")){
				if(!$(el).parents(".nav-panel").length){
					e.preventDefault();
				}
			}

			this.$nav.find("ul li.active").removeClass("active");
			$(el).parent('li').addClass("active");

			this.respositionPanel(el);
		},

		respositionPanel: function(el){
			var navOffset = this.$nav.find("ul").offset().left;
				linkOffset = $(el).parent().offset().left,
				linkWidth = $(el).parent().outerWidth(),				
				linkOffsetWidth = Math.abs(navOffset - linkOffset) + linkWidth,
				$navPanel = $(el).parent().find(".nav-panel");
				navPanelWidth = $navPanel.outerWidth(),
				left = linkOffsetWidth - navPanelWidth;
			
			if(qlApp.tools.isIE(8)){
				navPanelBorderRight = $navPanel.css("border-right-width");
				left += 6;
			}

			if(navPanelWidth < linkOffsetWidth){
				$navPanel.css({"left": left});
			}
		},

		stopPropagation: function(e){
			e.stopPropagation();
		    e.stopImmediatePropagation();
		},

		documentPropagation: function(e){
			if(!$(e.target).parent("li").length){
				this.$nav.find("ul li.active").removeClass("active");
				this.$languageSelectorList.hide();
				this.$languageSelector.removeClass("show-language-list");
		    }		    
		},

		languageSelector: function(e){
			e.preventDefault();
			this.$languageSelector.toggleClass("show-language-list");

			if(qlApp.viewport.view == "mobile"){		
				this.$languageSelectorList.slideToggle();
			}else{
				this.$languageSelectorList.toggle();
			}
		},

		detectColumns: function(){
			this.$navPanel.each(function(){
				if($('> .row .columns', this).length > 1){
					$(this).addClass('wide-col');
				}
			});
		}
	}

	$(function(){
		navigation.init();
	});

})(jQuery);


/*
Author: Jessie Biros
File name: textExpand.js
Description: 1. add see more and less
             2. expand and collapse text (hide and show)

             how to use:
             1.put the text that you want to be hide inside a span tag with a class of 'hiddenContent'.
             2. add a jquery object in your html then place it at the bottom of the html file with an id of 'controlTexts'

             example:
             //this is an example of the jquery object:
                <script id="controlTexts" type="text/x-json">
                  {
                    //this will be the text while the text is hidden
                    "more":" ...More", 
                    //this will be the text when the text is visible 
                    "less":"Less&#9652;"
                  }
                </script>

                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit expedita porro <span class="hiddenContent">recusandae obcaecati libero deserunt debitis cumque aspernatur autem odit quas fugit ex modi, optio quidem similique ipsa dicta repellendus.</span>
                </p>

                //the text inside the span.hiddenContent will be hidden and can be visible by clicking the more / less.

                // this will only work on screens small and medium

Dependencies: jQuery, underscore
*/

var qlApp = qlApp || {};

(function($){
    qlApp.textExpand = {
        init: function(){
            var controlTexts = qlApp.tools.getEmbeddedData("#controlTexts");
          
            if (!($(".hiddenContent").length > 0 && controlTexts != null)) {return;}

            var hidden = $(".hiddenContent");

            hidden.each(function() {
                    var controlTemplate = $("<a href='#' class='control'></a>"),
                    self = $(this);

                if (window.innerWidth < 780){
                    qlApp.textExpand.contentToggle($(this),controlTexts,controlTemplate);
                }
            });

            qlApp.textExpand.resizeToggle();
        },
        resizeToggle: function(){
            if(!qlApp.tools.isIE(8)) {
                var debounceResize = _.debounce(function(){
                     if (window.innerWidth < 780){
                         qlApp.textExpand.init();
                      } else{
                        $('.control').remove();
                        $(".hiddenContent").show();
                      }
                },200);

                $(window).on('resize', debounceResize);
            }
        },

        contentToggle: function(hidden,controlTexts,controlTemplate){
            
            qlApp.textExpand.controlsInit(hidden,controlTexts,controlTemplate);

            hidden.parent().unbind('click').on('click', 'a.control', function(){
                var self = $(this),
                parentContainer = self.parent();
                if (hidden.is(':visible')) {
                    self.html(controlTexts.more);
                } else {
                    self.html(controlTexts.less);
                }
                hidden.toggle();
                return false;
            });
        },

        controlsInit: function(hidden,controlTexts,controlTemplate){
            if (hidden.next('.control').length == 0){
                hidden.hide();
                controlTemplate.html(controlTexts.more);
                hidden.parent().append(controlTemplate);
            }
        }
    }

    $(function(){
        qlApp.textExpand.init();        
    });

})(jQuery);



/*
Author: Ruiwen Qin
File name: revealModal.js
Description: AJAX loading for foundation reveal modal
            "reveal-content-modal" class needs to be added, and the clicking event will be handeled here.

            The HTML structure for reveal modal needs to be put on the page as following

            <!-- Foundation Reveal Content Modal -->
            <div id="content-modal" class="reveal-modal">
                <div class="content"></div>
                <a class="close-reveal-modal" href="#">Close</a>
            </div>

Dependencies: jQuery, foundation.reveal.js
*/

(function($){
    revealModal = {
        init: function(){
            if (!$(".reveal-content-modal").length) {return;}

            $(".reveal-content-modal").on('click', function(e){
                e.preventDefault();
                
                var modalContent = $(this).attr("href"),
                    elem = $(this);

                $.ajax({
                    url: modalContent,
                    success: function(data) {
                        revealModal.modalSuccess(data,elem);
                    }
                });
            });

            revealModal.modalClose();
        },
        modalSuccess: function(data, elem) {
            //fix reveal close not working
            $(".reveal-modal-bg").show();
            $("#content-modal").show();
            $("#content-modal .content").html(data);
            
            $("#content-modal").foundation("reveal", "open", {
                animationSpeed: 100,
                animation: "fade"
            });

            $.publish('foundation-reveal-modal-open',[elem]);

        },
        modalClose: function(){
            $("#content-modal .close-reveal-modal").on("click", function(e) {
                e.preventDefault();
                revealModal.close();
            });
        },

        close: function(){
            $(".reveal-modal").foundation("reveal", "close");
            //fix reveal close not working
            $(".reveal-modal-bg").hide();
            $("#content-modal").hide();
            setTimeout(function() {
                $("#content-modal .content").html("");
            }, 500);

            // ensure focus onto document body after overlay is closed - IE has focus issues
            $("body").focus();

            $.publish('foundation-reveal-modal-close');
        }        
    };

    $(function(){
        revealModal.init();
    });

})(jQuery);


/*
Author: 		Roy Anonuevo
File name: 		revealTooltip.js
Description: 	Reveal tooltip for specific target element
                To use: 
                qlApp.revealTooltip.show(targetElem, content, verticalMargin, horizontalMargin);

Dependencies: 	jQuery, Underscore, TinyPubSub
*/

var qlApp = qlApp || {};

(function($){

	qlApp.revealTooltip = {

		init: function(){
			 if(!$("#content-tooltip").length){
			 	// append content tooltip once
			 	$('body').append('<div id="content-tooltip"></div>');
			 }

			// cache dom
            this.$window = $(window);
            this.$document = $(document);
			this.$tooltip = $('#content-tooltip');
            this.verticalMargin = 0;
            this.horizontalMargin = 0;

            // hide tooltip first
            this.$tooltip.hide();

            var winResize = _.debounce(this.winResize, 100);

            // bind listener
            this.$tooltip.on('click', this.stopPropagation.bind(this)); 
            this.$document.on('click', this.documentHandler.bind(this)); 
            this.$window.on("resize", winResize);
		},

        stopPropagation: function(e){
            e.stopPropagation();
            e.stopImmediatePropagation();
        },

        documentHandler: function(e){
            $.publish('revealtooltip-document-click', [$(e.target)]);
        },

        winResize: function(){
            $.publish('revealtooltip-window-resize');
        },

		show: function(targetElem, content, verticalMargin, horizontalMargin){
            this.reposition(targetElem, content, verticalMargin, horizontalMargin);

            $.subscribe('revealtooltip-window-resize', function(){
                var self = qlApp.revealTooltip;
                self.reposition(targetElem, content, verticalMargin, horizontalMargin);
            });


            // Check if document is clicked
            $.subscribe('revealtooltip-document-click', (function(e, elem){
                if(elem[0] !== targetElem[0]){
                    this.$tooltip.hide().html("");
                    $.publish('revealtooltip-hidden', this.$tooltip);
                    $.unsubscribe('revealtooltip-document-click');
                    $.unsubscribe('revealtooltip-window-resize');
                }
            }).bind(this));
		},


        reposition: function(targetElem, content, verticalMargin, horizontalMargin){
            if(verticalMargin){
                this.verticalMargin = verticalMargin;
            }

            if(verticalMargin){
                this.horizontalMargin = horizontalMargin;
            }

            this.$tooltip.hide().html(content);

            var targetElemOffset = targetElem.offset(),
                targetElemHeight = targetElem.outerHeight(),
                targetElemWidth = targetElem.outerWidth(),

                tooltipWidth = this.$tooltip.outerWidth(),  
                tooltipHeight = this.$tooltip.outerHeight(),

                tooltipTop = targetElemHeight + targetElemOffset.top + this.verticalMargin,
                tooltipTotalTop =  tooltipTop + tooltipHeight,

                tooltipLeft = targetElemWidth + targetElemOffset.left - (this.horizontalMargin + tooltipWidth),
                tooltipTotalLeft =  tooltipLeft;                    


            // VERTICAL
            if(tooltipTotalTop < this.$document.height()){
                $.publish('revealtooltip-tip-position-on-top');
            }else{
                tooltipTop = targetElemOffset.top - tooltipHeight - this.verticalMargin;
                $.publish('revealtooltip-tip-position-on-bottom');
            }


            // HORIZONTAL
            if(tooltipWidth < targetElemOffset.left){
               $.publish('revealtooltip-tip-position-on-right');
            }else{
                tooltipLeft = targetElemOffset.left;
                $.publish('revealtooltip-tip-position-on-left');
            }

            // console.log("document height: "+ this.$document.height());
            // console.log("tooltipHeight: "+ tooltipHeight); 
            // console.log("tooltipTop: "+ tooltipTop);
            // console.log("tooltipTotalTop: " + tooltipTotalTop);

            // console.log("tooltipWidth: "+ tooltipWidth);   
            // console.log("tooltipLeft: "+ tooltipLeft);
            // console.log("tooltipTotalLeft: "+ tooltipTotalLeft);   
            // console.log("-----------------------------------");

            // Set CSS Position
            this.$tooltip.css({'position': 'absolute', 'top':tooltipTop, 'left':tooltipLeft}).show();
            $.publish('revealtooltip-show');
        }
	}

	$(function(){
		qlApp.revealTooltip.init();
	});

})(jQuery);


/*
Author: 		Roy Anonuevo
File name: 		shares.js
Description: 	Global social share functionalities
Dependencies: 	revealModal.js, jQuery
*/

(function($){

	var shares = {

		init: function(){	
			if(!$('.reveal-social-share').length || !$('#social-share-tooltip-content').length){return;}

			var self = this;
			// cache dom
			this.$window = $(window);
			this.$shareLink = $('.reveal-social-share');
			this.$shareTooltipContent = $('#social-share-tooltip-content');
			this.$tip = $('.social-share-tooltip .tip');

			// Add listener for modal close when no 'reveal-content-modal' exists
			if(!$(".reveal-content-modal").length){
				revealModal.modalClose();
			}

			// bind listener
			this.$window.on('resize', this.winResize);
			this.$shareLink.on('click', this.revealShare);

			
			$.subscribe('revealtooltip-tip-position-on-top', function(){
				self.$tip = $('#content-tooltip .social-share-tooltip .tip');
				self.rotataTip("top");
			});

			$.subscribe('revealtooltip-tip-position-on-bottom', function(){
				self.$tip = $('#content-tooltip .social-share-tooltip .tip');
				self.rotataTip("bottom");
			});

			$.subscribe('revealtooltip-tip-position-on-right', function(){
				self.$tip = $('#content-tooltip .social-share-tooltip .tip');
				self.rotataTip("right");
			});

			$.subscribe('revealtooltip-tip-position-on-left', function(){
				self.$tip = $('#content-tooltip .social-share-tooltip .tip');
				self.rotataTip("left");
			});

			$.subscribe('foundation-reveal-modal-open', function(){
				self.addThisReflow();
			});

			$.subscribe('revealtooltip-show', function(){
				self.addThisReflow();
			});			
		},

		winResize: function(){ 
			if(qlApp.viewport.view != "mobile"){
				// hide modal when on desktop viewport
	        	revealModal.close();
			}
		},

		revealShare: function(e){
			var self = shares;

			e.preventDefault();
			var elem = $(this),
				contentUrl = elem.attr("href");

            if(qlApp.viewport.view == "mobile"){   
	            $.ajax({
	                url: contentUrl,
	                success: function(data) {
	                    revealModal.modalSuccess(data, elem);

						$.publish('revealtooltip-hidden', this.$tooltip);
	                }
	            });	            
	        }else{	        	
	        	var data = self.$shareTooltipContent.html();
	        	qlApp.revealTooltip.show(elem, data, 40, 0);
	      	}
		},

		rotataTip: function(position){

			switch(position){
				case 'top':
					this.$tip.removeClass("tip-bottom");
				break;

				case 'bottom':
					this.$tip.addClass("tip-bottom");
				break;

				case 'left':
					this.$tip.addClass("tip-left");
				break;

				case 'right':
					this.$tip.removeClass("tip-right");
				break;
			}
		},


		addThisReflow: function(){
			//window['addthis_share'].url = window.location.href;
			//window['addthis_share'].title = window.document.title;
			window.addthis.toolbox('.addthis_toolbox');
		}
	}

	$(function(){
		shares.init();
	});

})(jQuery);


/*
Author: Roy Anonuevo
File name: carousel.js
Description: This file holds the carousels on pages.
             1. Go through all the elements have flexslider class names
             2. By adding 'data-carousel-smoothheight-on-mobile="true"' attribute, it will enable auto height functionality on mobile viewport
             3. By adding 'carousel-animation="your desire effects"' attribute, it will change the animation effect

            // Resetting of options
            setOpts(slider, options), use for updating a specific slider opts

            e.g:
            qlApp.carousel.setOpts(slider.data('flexslider'), {
                smoothHeight: false
            });

Dependencies: lib/jquery.flexslider.js, JQuery
*/
var qlApp = qlApp || {};

(function($){
    qlApp.carousel = {
        init: function(){
            if(!$(".flexslider").length){return;}

            var self = this;

            // cache dom
            this.$window = $(window);
            this.$sliders = $(".flexslider");

            this.$sliders.each(function(i, e){
                var slider = $(e),
                    options = {
                        animation: (slider.data('carousel-animation'))? (slider.data('carousel-animation')) : "slide",
                        animationLoop: true
                    };

                // initialize flexslider
                slider.flexslider(options);

                // bind listener
                self.$window.on('resize', self.winResize.bind(slider)).resize();
            });
        },


        winResize: function(){
            var slider = this;
            
            // Repaint "float" issue when resizing
            slider.find("li").removeClass("leftfloat").addClass("rightfloat");
            setTimeout(function(){ slider.find("li").removeClass("rightfloat").addClass("leftfloat"); }, 500);


            if(qlApp.viewport.view == "mobile"){
                qlApp.carousel.setOpts(slider.data("flexslider"), { smoothHeight: true });
            }else{
                qlApp.carousel.setOpts(slider.data("flexslider"), { smoothHeight: false });
            }
        },

        setOpts: function(slider, opts) {
            for (var opt in opts) {
                slider.vars[opt] = opts[opt];
            }
            slider.setup();            
        }        
    };

    $(function(){
        qlApp.carousel.init();
    });

})(jQuery);


/*
Author: 		Roy Anonuevo
File name: 		uniform.js
Description: 	uniform functionalities
Dependencies: 	jQuery, jquery.cookie.js, uniformjs, uniform.js module
*/
var _da = _da || {};

(function($){
	var uniform = {

		init: function(){			
			if(!$('.uniform').length){return;}	

			// cache
			var $uniform = $('.uniform');

			$uniform.find("select").uniform({selectClass: 'dropdown', selectAutoWidth: false});
		}
	}
		
	$(function(){
		uniform.init();
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
				var publishTrackData = function(elem,e){
					
					if ($(elem).hasClass("mobile") && guxApp.viewport.view !== "mobile") {
						return;
					}
					/*
					if(!$(elem).hasClass("noprevent")){
						e.preventDefault();
					}*/
					var $link = $(elem);
					var img, name, type, onclick, trigger = false, nameplate, leadtype, tool, events, year, pname,intcmp,hier,tooldesc,content,freq,moduletype,modulename,moduleaction,
					totalresult,resultnumber,titleNameplate,cat,subcat,referred,search;
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
						moduleaction = $link.attr("data-moduleaction");
						totalresult = $link.attr("data-totalresult");
						resultnumber = $link.attr("data-resultnumber");
						titleNameplate = $link.attr("data-titlenameplate");	
						cat = $link.attr("data-cat");	
						subcat = $link.attr("data-subcat");
						referred= $link.attr("data-referred");
						search= $link.attr("data-search");
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
						moduletype = img.attr("data-moduletype");
						modulename = img.attr("data-modulename");
						moduleaction = img.attr("data-moduleaction");
						totalresult = img.attr("data-totalresult");
						resultnumber = img.attr("data-resultnumber");	
						titleNameplate = img.attr("data-titlenameplate");	
						cat = img.attr("data-cat");
						subcat = img.attr("data-subcat");
						referred= img.attr("data-referred");
						search= img.attr("data-search");
					}
					
					//check the type
					if ($link.hasClass('external-disclaimer')) { type = 'e'};
					//if name not set by data-name attribute, get the link name
					if (!name) {
						var link = grabber( { link: elem } )
						name = link.value;
					}
					//check personalisation click
					if (typeof moduleaction == 'undefined' 
						&& !($(elem).hasClass("open-video-flip")) 
						&& ($link.closest("section").hasClass('personalisation') 
						|| $link.closest("section").hasClass('smartnextsteps'))
						|| $link.hasClass('open-media-overlay')){						
						moduleaction = 'click';
					} else if (typeof moduleaction !== 'undefined'  && moduleaction=="none"){						
						moduleaction = undefined;
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
					
					//gux showroom -- no longer needed
					//if($link.closest(".section-cars").data("sort-total") && $link.closest(".vehicle-data").data("sort-index")){
					//	totalresult = $link.closest(".section-cars").data("sort-total");
					//	resultnumber = $link.closest(".vehicle-data").data("sort-index");
					//}
					
					//for nameplate year and video carousel omniture
					var $section = $link.closest("section");
					if(_da.nameplate){
						if($section.hasClass("video-carousel") || $section.hasClass("reveal-slider")) {
							modulename = _da.nameplate.name;
						}
						if(!year) year = _da.nameplate.year;
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
					    moduleaction:moduleaction,
					    totalresult:totalresult,
						resultnumber:resultnumber,
						titleNameplate: titleNameplate,
						cat:cat,
						subcat:subcat,
						referred:referred,
						search:search
					});	
				};
				/*$wait(function(){
					$(".trackable,.external-disclaimer").live({mouseover:function(e){},mousedown:function(){alert("live-mousedown")}});
					//$(".trackable,.external-disclaimer").on('click',function(e){alert('on')});
				})*/
				
				//$('.trackable,.external-disclaimer').click(function(e){
				//$(document).delegate(".trackable,.external-disclaimer","click",function(e){
				//$(document).on("click",'.trackable,.external-disclaimer',function(e){
				$(".trackable,.external-disclaimer").live('click',function(e){
					if($('.staging-wrap .trackable').size()>0){
						return;
					}
					publishTrackData($(this),e);
				});
				//quick lane share
				$("#content-tooltip").on("click",'.trackable',function(e){
					publishTrackData($(this),e);
				});
				
				
				//needed to use .on method to fire omniture tag for mini-dealer locator expand
				$(".mini-dealer .revealer-vertical .revealer-open.trackable").on('click',function(e){
					publishTrackData($(this),e);
				});
				
				// add omniture on gux billboard next/prev,billboard bullet
				$(".flex-direction-nav .flex-next, .flex-direction-nav .flex-prev, .flex-control-nav.flex-control-paging a,.alt-controls span.alt-prev,.alt-controls span.alt-next").live("click",function(e){		
					var $link = $(this);
					var $section = $link.closest("section");
					
					if(guxApp.viewport.view === "mobile" &&($(this).hasClass("flex-prev")||$(this).hasClass("flex-next"))) return;
					else if(guxApp.viewport.view !== "mobile" && $section.hasClass("hotspots")) return;
					
					if(!$section) return;
					publishTrackData($section,e);
				});				
				
				//gux nameplate colorizer
				//this is added because adding trackable on colorized module will not trigger omniture click event propagation
				$(".color-palette li a").on("click",function(e){
					var $link = $("#colorizer_data_analytics");
					publishTrackData($link,e);
				});
				
				//for nameplate reveal-slider module
				$(".imageReveal").on('mouseover',function(e) {
					$(".reveal-slider .imageReveal-drag").on('mousedown',function(e) {
						var $link = $(this);
						var $section = $link.closest("section");
						if(!$section) return;
						publishTrackData($section,e);
					});
					
					$(".imageReveal").off('mouseover');
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
						//each dealer search will init the dealer freq
						$.each(ND.omniture.pageClicks, function(key, value){
							if(key.match("^dealer")){
								ND.omniture.pageClicks[key] =  undefined;
							}
						});
						var data_tool = "event:find dealer";
						_da.funnel.stepname='results';
						//fire once per visit
						if(typeof _da.events == "undefined"){
							_da.events = "event1,event43".split(',');
							//data_tool = "event:find dealer";
						}else {
							_da.events = '';
							//data_tool = '';
						}							
						_da.dealer = {};
						
						var totalNum = $('.dealer-result-container .count .num').text();
						var vehicleData,$analyticsData = $("#vehilcesdata"),analyticsData;
						if($(".vehicle-search .nested-options select[name='vehicle']").length > 0 && $analyticsData && $analyticsData.length > 0){
							nameplateIndex = $(".vehicle-search .nested-options select[name='vehicle']").get(0).selectedIndex;
							analyticsData = JSON.parse($analyticsData.html());
							if (nameplateIndex && analyticsData && analyticsData["vehiclesdata"]) {
								vehicleData = analyticsData["vehiclesdata"][nameplateIndex - 1];
							}
						}
						if(totalNum){
							var totalResult = Number(totalNum);
							var perPage = 5;
							var totalPage = Math.floor((totalResult + perPage - 1 ) / perPage);
							var postcode = $('.dealer-result-container .result-list .dealer-result:first-child').data("postcode");
							_da.region = postcode;
							if(vehicleData){
								_da.nameplate ={"name":vehicleData.name,"year":vehicleData.year,'id':vehicleData.id};
							}else{
								_da.nameplate = undefined;
							}
							// the c49/v49 is not fired,c48/v48 should be fired every time
//							ND.analyticsTag.trackOmniturePage({
//								tool: data_tool,
//								tooldesc:'find dealer:1 of '+totalPage
//							});	
							ND.analyticsTag.trackOmniturePage({
								tool: data_tool
							});	
						}
						//only track once
						//$.unsubscribe('dealers-done');
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
						_da.tool = {};
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
					publishTrackData($(this),e);
					$("#overlay .vr-container .360trackable").die("slide");//only need to trigger once
				})
				
				/* for B515 experience tracking */
				$('.staging-wrap .trackable').live("click",function(e){
					var $link = $(this);
					publishTrackData($link,e);
				});
				
				/* for Service Calculator */
				$('.service-calc #service-dropdowns').on("change","select",function(e){
					var $link = $(this);
					var $section = $link.closest("section");
					var year = $("#year option:selected" ).text();
					var model = $("#model option:selected" ).text();
					var style = $("#style option:selected" ).text();
					var engine = $("#engine option:selected" ).text();	

					if(year !== guxApp.sc.selectTexts["select.year.text"] && model !== guxApp.sc.selectTexts["select.model.text"]
						&& style !== guxApp.sc.selectTexts["select.style.text"] && engine !== guxApp.sc.selectTexts["select.engine.text"]){

						publishTrackData($section,e);
					}
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
Author: 		Ivy/Brett
File name: 		brightcoveTrack.js
Description: 	track brightcove event  video start/video finish
Dependencies: 	jQuery,brightcove
Usage: 			
*/

var ND = window.ND = window.ND || {};

(function($){

	var newWidth, year, modulename, mediaName,ts25,ts50,ts75,ts100,
		currWidth = window.innerWidth,
		trackPos = { "0" : 1, "0.25" : 1, "0.5" : 1, "0.75" : 1, "1" : 1},
		settings= {"track":"11111"};

	ND.Brightcove = {

		//template loaded event handler
		onTemplateLoad: function (experienceID) {
		  	// get references to the player and API Modules and Events
			ND.Brightcove.player = brightcove.api.getExperience(experienceID);
			ND.Brightcove.APIModules = brightcove.api.modules.APIModules;
			trackPos = { "0" : 1, "0.25" : 1, "0.5" : 1, "0.75" : 1, "1" : 1};
		},

		// template ready event handler
		onTemplateReady: function (evt) {
			ND.Brightcove.videoPlayer = ND.Brightcove.player.getModule(ND.Brightcove.APIModules.VIDEO_PLAYER);
			ND.Brightcove.experienceModule = ND.Brightcove.player.getModule(ND.Brightcove.APIModules.EXPERIENCE);
			ND.Brightcove.cuePointsModule = ND.Brightcove.player.getModule(ND.Brightcove.APIModules.CUE_POINTS);
			
			ND.Brightcove.videoPlayer.getCurrentVideo(function(video){
				var videoLengthEightyPercent = video.length/1000 * 0.8;
				ND.Brightcove.cuePointsModule.addCuePoints(video.id, [videoLengthEightyPercent]);
			});
			
			ND.Brightcove.resizeVideo();
			ND.Brightcove.videoPlayer.addEventListener(brightcove.api.events.MediaEvent.PROGRESS,function(e){				
				 var omTitle, omEvents,omType,omProgress,omSegment;				
				 var percent = Math.round(e.position / e.duration *100) / 100;
				 if (trackPos[percent]) {
			          switch (percent) {
			            case 0:
			              if (settings.track.charAt(0) == "1") {
			                omTitle = "video start";
			                omEvents = "event56";
			                mediaName = e.media.displayName; 
			                omType = "m_s";
			                omProgress = "0%";
			                omSegment = "1:M:0-25";
			              }
			              break;
			            case 0.25:
			              if (settings.track.charAt(1) == "1") {	
			            	omTitle = "video 25%";
			            	ts25 = Math.round(e.position);
			                omEvents = "event58,event61="+ts25+",event62";
			                omType = "m_i";
			                omProgress = "25%";
			                omSegment = "1:M:0-25";
			              }
			              break;
			            case 0.5:
			              if (settings.track.charAt(2) == "1") {
			            	omTitle = "video 50%";
			            	ts50 = Math.round(e.position);
			                omEvents = "event59,event61="+(ts50 - ts25)+",event62";
			                omType = "m_i";
			                omProgress = "50%";
			                omSegment = "2:M:25-50";
			              }
			              break;
			            case 0.75:
			              if (settings.track.charAt(3) == "1") {
			            	omTitle = "video 75%";
			            	ts75 = Math.round(e.position);
			                omEvents = "event57,event61="+(ts75 - ts50)+",event62";
			                omType = "m_i";
			                omProgress = "75%";
			                omSegment = "3:M:50-75";
			              }
			              break;
			            case 1:
			              if (settings.track.charAt(4) == "1") {
			                omTitle = "video finish";
			                ts100 = Math.round(e.position);
			                omEvents = "event60,event61="+(ts100 - ts75)+",event62";
			                omType = "m_i";
			                omSegment = "4:M:75-100";
			              }
			              break;
			          }
			          trackPos[percent] = 0;
//			          console.log("omTitle="+omTitle);
//			          console.log("omEvents="+omEvents);
//			          console.log("mediaName="+mediaName);
//			          console.log("omType="+omType);
//			          console.log("omProgress="+omProgress);
//			          console.log("omSegment="+omSegment);
			          if (omType) { 
			        	  ND.Brightcove.trackEvent(omEvents,omType,omProgress,omSegment);
			          }
				 }
			});
//			ND.Brightcove.videoPlayer.addEventListener(brightcove.api.events.MediaEvent.PLAY,function(e){
//				if (e.position == 0) {
//					mediaName = e.media.displayName; 
//					omTitle = "video start";
//					omEvents = "event56";
//					ND.Brightcove.trackEvent();
//				}
//			});
//			ND.Brightcove.videoPlayer.removeEventListener(brightcove.api.events.MediaEvent.PLAY);
//			
//			ND.Brightcove.videoPlayer.addEventListener(brightcove.api.events.CuePointEvent.CUE,function(e){
//				omTitle = "video finish";
//				omEvents = "event57";
//				ND.Brightcove.trackEvent();
//			})
//			ND.Brightcove.videoPlayer.removeEventListener(brightcove.api.events.CuePointEvent.CUE);
			ND.Brightcove.videoPlayer.addEventListener(brightcove.api.events.MediaEvent.COMPLETE, function(e){
				/*mediaName = e.media.displayName; 
				omTitle = "video finish";
				omEvents = "event57";
				ND.Brightcove.trackEvent();
				*/
				//For replaying.
				trackPos = { "0" : 1, "0.25" : 1, "0.5" : 1, "0.75" : 1, "1" : 1};
			});
			//ND.Brightcove.videoPlayer.removeEventListener(brightcove.api.events.MediaEvent.COMPLETE);

			// HTML5 iframe resize fix
			// Code taken from: http://docs.brightcove.com/en/video-cloud/smart-player-api/samples/responsive-sizing.html#HtmlMode
			ND.Brightcove.videoPlayer.getCurrentRendition(function(renditionDTO) {
			
				if (renditionDTO) {
					ND.Brightcove.calulateNewPercentage(renditionDTO.frameWidth, renditionDTO.frameHeight);
				} else {
					ND.Brightcove.videoPlayer.addEventListener(brightcove.api.events.MediaEvent.PLAY, function(event) {
						ND.Brightcove.calulateNewPercentage(event.media.renditions[0].frameWidth, event.media.renditions[0].frameHeight);
					});
				}
			});

			var evt = document.createEvent("UIEvents");
			evt.initUIEvent("resize",true,false,0);
			window.dispatchEvent(evt);
		},

		trackEvent: function(omEvents,omType,omProgress,omSegment){
			if (mediaName && omType && window._da && window._da.om && ND && ND.omniture ) {
			    var  data ={
				    "events":omEvents,
				    "linkType":omType,
				    "content":mediaName,
				    "progress":omProgress,
				    "segment":omSegment,
				    "mediaType":"video"
			    };
				ND.omniture.trackMedia(data);			    
			}
		},

		calulateNewPercentage: function(width,height) {
			var newPercentage = ((height / width) * 100) + "%";
			document.getElementById("videocontainer").style.paddingBottom = newPercentage;
		},

		resizeVideo: function() {
			window.onresize = function(evt) {
				newWidth = window.innerWidth;

				// only run this code if the browser width changes
				if (currWidth !== newWidth) {
					var resizeWidth = $(".BrightcoveExperience").width(),
						resizeHeight = $(".BrightcoveExperience").height();

					if (ND.Brightcove.experienceModule.experience.type == "html") {
						ND.Brightcove.experienceModule.setSize(resizeWidth, resizeHeight);
					}

					currWidth = window.innerWidth;
				}
			};
		}
	};

})(jQuery);


/*
Author: Ruiwen Qin
File name: video.js
Description: Initialize jwPlayer
Dependencies: jQuery, jwPlayer
*/
var guxApp = guxApp || {};

(function($){
	guxApp.video = {
		settings : {},
		defaults : {
	    	width : 593,
	    	height : 348,
	      	modes : [
	          {
	            type : 'html5',
	            config : {
	              // skin : "../../src/themes/ftd/skin/glow/glow.xml"
	              skin: "/themes/ftd/skin/glow/glow.xml"
	            }
	          }, 
	          {
	            type : 'flash',
	            // src : '../../src/themes/ftd/swf/player.swf',
	            src: "/themes/ftd/swf/player.swf",
	            config : {
	              // skin : "../../src/themes/ftd/skin/glow.zip"
	              skin: "/themes/ftd/skin/glow.zip"
	            }
	          } ],
	      	// Close tracking by default (begin, 25, 50, 75, finish)
	      	track : "00000",
	      	play : false
	    },

		init: function(){
			if (!$("#video-inner").length) {return;}
			
			//prepare setting options
			guxApp.video.dataSetup();
			guxApp.video.load("jwplayer-js", "/themes/ftd/js/lib/jwplayer.js");
		    $ready("jwplayer", guxApp.video.videoSetup);
			//video options setup and video initialize
			//guxApp.video.videoSetup();
			
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
		dataSetup: function(){
			if ($("#video-config").length > 0){
				var videoConfig = $("#video-config").embeddedData();
			}
			
			if (videoConfig !== undefined && !guxApp.tools.isEmpty(videoConfig)){
				guxApp.video.settings = $.extend({},guxApp.video.defaults,videoConfig);

				// customize skin for html5 video player
			    if (videoConfig.skin){
			    	// guxApp.video.settings.modes[0].config.skin = "../../src/themes/ftd/skin/" + guxApp.video.settings.skin + "/" + guxApp.video.settings.skin + ".xml";
			    	guxApp.video.settings.modes[0].config.skin = "/themes/ftd/skin/" + guxApp.video.settings.skin + "/" + guxApp.video.settings.skin + ".xml";
			    }
			}
		},
		videoSetup: function(){

			/*if (guxApp.viewport.view === "mobile") {
				guxApp.video.settings.play = false;
			} else {
				guxApp.video.settings.play = true;
			}*/

			var playerOptions = {
	        	image: guxApp.video.settings.image,
	        	modes: guxApp.video.settings.modes,
	        	levels : [ {
	          		type : 'video/mp4',
	          		file : guxApp.video.settings.file
	        	}],
	        	width: guxApp.video.settings.width,
	        	autostart:guxApp.video.settings.play,
	        	'plugins' : {}
	      	};

	      	if (guxApp.video.settings.controlbar) {
		    	playerOptions.controlbar = "none";
		    }

		    if (guxApp.video.settings.caption) {
        		playerOptions["plugins"]["captions-2"] = {
          			"file" : guxApp.video.settings.caption
        		};
      		}

      		//video initialize
      		jwplayer("video-inner").setup(playerOptions);
      		
      		jwplayer().onReady(function(){
      			var videoContainer = $("#modalWrap .modal-body"),
      				containerWidth = videoContainer.width(),
      				playerHeight,ratio;

      			//hide control bar until video starts to play
  				if (guxApp.video.settings.hideControls){
      				jwplayer().getPlugin("controlbar").hide();
      			}

      			//Don't hide control bar if using chrome.
      			console.log(guxApp.tools.isMobile());
      			if(!(guxApp.tools.isMobile() == "Android")){
      				jwplayer().getPlugin("controlbar").hide();
      			}

      			//set height of the player based on the ratio
      			if (guxApp.video.settings.ratio){
		      		var prop = guxApp.video.settings.ratio.split(":");
		      		ratio = prop[1] / prop[0];
		      		playerHeight = containerWidth * ratio;
		      		jwplayer().resize(containerWidth,playerHeight);
		      	}

      			//resize the dimension of the player along with window size
      			$(window).resize(function(){
		            containerWidth = videoContainer.width();
		            playerHeight = containerWidth * ratio;
		            jwplayer().resize(containerWidth,playerHeight);
      			});

      			// hide close button on fullscreen
      			$("#video-inner").on("click", "#video-inner_jwplayer_controlbar_fullscreenButton", function() {
		            $(".modal .icon-close").hide();
		        });
		        
				// show close button on fullscreen
		        $("#video-inner").on("click", "#video-inner_jwplayer_controlbar_normalscreenButton", function() {
		            $(".modal .icon-close").show();
		        });

      			jwplayer().play(guxApp.video.settings.play);

      			$(".modal-body").removeClass("loading-video");
  			});

  			jwplayer().onPlay(function(){
          		jwplayer().getPlugin("controlbar").show();
          		jwplayer().resize(jwplayer().getWidth(),jwplayer().getHeight());
        	});

        	// tracking impl
          	guxApp.video.settings.track != "00000" && guxApp.video.track(guxApp.video.settings);
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
	        	var omTitle, omEvents, year, nameplate='none';	        	
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
		        		if (window._da && window._da.om && ND && ND.omniture ) {
		        			var clip_n = settings.clip_n || ti;	
//		        			$.publish('/analytics/link',{
//		              			'link':true,
//		              	      	'onclicks':omTitle,
//		              			'events':omEvents,
//		              			'type':'o',
//		              			'content':clip_n,
//		              			'title':omTitle,
//		              			'nameplate':'none',
//		              			'pname':pname,
//		              			'hier1':hier
//		              		});
		        			if(_da.nameplate && _da.nameplate.year) year = _da.nameplate.year;
					    	if(_da.nameplate && _da.nameplate.name) nameplate = _da.nameplate.name;
					    	
		        			ND.omniture.trackLink({
		              			'link':true,
		              	      	'onclicks':omTitle,
		              			'events':omEvents,
		              			'type':'o',
		              			'content':clip_n,
		              			'title':omTitle,
		              			'nameplate':nameplate,
		    				    "titleNameplate":"none",
		              			'pname':pname,
		              			'hier1':hier,
		              			'year':year
		        			});
		    		  	}
		          	}          	          
//		          	if (action) {
//		            	var clip_n = settings.clip_n || (ti + (e.duration>>0)) ;
//		          
//			            // Tracking implementation
//			            ND.analytics._tag.dcsMultiTrack(
//			                "WT.ti", ti + action,
//			                "DCS.dcsuri", (dcsuri + action.replace(/ /g, '')).toLowerCase().replace(/ /g, '-'),
//			                "WT.clip_ev", action.replace(/ /g,''),
//			                "WT.clip_n", clip_n,
//			                "WT.dl", 7
//			            );
//		          	}
	        	}
	    	});

	      	// For replaying.
	      	jwplayer().onComplete(function(){
	        	trackPos = { "0" : 1, "0.2" : 1, "0.5" : 1, "0.7" : 1, "0.8" : 1};
	      	});
    	}
	};

})(jQuery);


/*
Author: 		Roy anonuevo
File name: 		brightcove.js
Description: 	brightcove event

				1. By Adding this mark up, it will add a custom preview image

				<div class="preview-image">
					<a href="#" class="play-btn" data-video-id="3571385405001">
						<img src="media/4E_QL_nextgen_mobile_carousel_435x250_copvideo.png">
						<span class="play-button"></span>
					</a>
				</div>

Dependencies: 	jQuery, brightcove		
*/

var qlApp = qlApp || {};

(function($){

	qlApp.Brightcove = {

		init: function(){
			 if(!$(".brightcove").length){return;}
			 
			// cache dom			
			this.$brightcove = $('.brightcove');
			this.$brightcovePlayBtn = this.$brightcove.find('.play-btn');
			//Firefox fix; Brightcove not firing on firefox
			brightcove.createExperiences();
		},

		onTemplateLoad: function(experienceID){		
		  	// get references to the player and API Modules and Events
			this.player = brightcove.api.getExperience(experienceID);
			this.APIModules = brightcove.api.modules.APIModules;
			this.brPlayer = this.player.getModule(this.APIModules.VIDEO_PLAYER);
			// bind listener
			$('.brightcove').on("click",'.play-btn', this.playVideo);
		},

		onTemplateReady: function(evt){			
			var self = qlApp.Brightcove,omTitle, omEvents,mediaName;			
			self.brPlayer.addEventListener(brightcove.api.events.MediaEvent.BEGIN, function(e){
				mediaName = e.media.displayName; 
				omTitle = "video start";
				omEvents = "event56";
				self.trackEvent(mediaName,omTitle,omEvents);							
			});
			self.brPlayer.addEventListener(brightcove.api.events.MediaEvent.COMPLETE, function(e){
				mediaName = e.media.displayName; 
				omTitle = "video complete";
				omEvents = "event57";
				self.trackEvent(mediaName,omTitle,omEvents);
			});
		},

		playVideo: function(e){
            e.preventDefault();

            var self = qlApp.Brightcove;

            if(self.$brightcove.find(".preview-image").length){
            	self.$brightcove.find(".preview-image").fadeOut();
            }

            var videoID =  $(this).attr("data-video-id");
            self.brPlayer.loadVideoByID(videoID);
        },
        trackEvent: function(mediaName,omTitle,omEvents){
			if (mediaName&& window._da && window._da.om && ND && ND.omniture ) {
				 var linkTitle = omTitle;
				if(typeof _da.pname !=="undfined"){
					linkTitle = _da.pname + ":" + omTitle;
				}
			    var  data ={
				    "content":mediaName,
				    "link":true,
    			  	"onclicks":omTitle,
    			  	"events":omEvents,
    			  	"type":'o',
    			  	"title":linkTitle
			    };
				ND.omniture.trackLink(data);			    
			}
		}
	};


	$(function(){
        qlApp.Brightcove.init();
    });

})(jQuery);


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
			dataConfig = $("#countryCityDropdownData"),
			dataArr = [],
			province = $("select[name='country']",self.searchContainer),
			city = $("select[name='city']",self.searchContainer);
		//initial disable city
		city.prop("disabled","disabled").closest(".dropdown").addClass("disabled");
		if (dataConfig.length > 0 && dataConfig.embeddedData().list && dataConfig.embeddedData().list.length) {
			dataArr = dataConfig.embeddedData().list[0].countries;
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
			// $.each(dataArr,function(key,val){
			// 	if(provinceVal==val[1].name){
			// 		city.children("option:gt(0)").remove();
			// 		$.each(val[1].cities,function(key,val){
			// 			$("<option value='"+val[1].name+"'>"+val[1].name+"</option>").appendTo(city);
			// 		});
			// 		endLoop = true;
			// 	} 
			// 	if(endLoop){return false;}
			// });
			if(provinceVal=="Mexico"){ // if mexico then select states fomr json
					 
					$.each(dataArr,function(key,val){
						if(provinceVal==val[1].name){
							city.children("option:gt(0)").remove();
							$.each(val[1].states,function(key,val){
								$("<option value='"+val[1].name+"'>"+val[1].name+"</option>").appendTo(city);
							});
							endLoop = true;
						} 
						if(endLoop){return false;}
					});
			}else{ // else select cities from json
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
			}

			//enable city
			province.val() == ""?city.prop("disabled","disabled").closest(".dropdown").addClass("disabled"):city.prop("disabled",false).closest(".dropdown").removeClass("disabled");
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
		self.getOptData();
		
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
				province = $("select[name='country']",self.searchContainer),
				city = $("select[name='city']",self.searchContainer),
				keywordStr = "";

			self.filters = [];
			self.closeTabs();
				
			e.preventDefault();
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
					 if(province.val()=="Mexico"){//if country is mexico then filter AdministrativeArea
				
						self.mapController.searchDealersByLocation(keywordStr, false, {Country: province.val()||"", AdministrativeArea: city.val()||""}, {}, function (dealers,errorMsg) {
				    	self.is_selectLocation = true;
						self.resultsFiltering(dealers,errorMsg);

						}); 
					}else {

				    	self.mapController.searchDealersByLocation(keywordStr, false, {Country: province.val()||"", Locality: city.val()||""}, {}, function (dealers,errorMsg) {
				    	self.is_selectLocation = true;
						self.resultsFiltering(dealers,errorMsg);
						});
					}
				}else {
					if(province.val()=="Mexico"){//if country is mexico then filter AdministrativeArea
				
						self.mapController.searchDealersByProperties({Country: province.val(), AdministrativeArea: city.val()}, {}, function(dealers,errorMsg) {
						self.is_selectLocation = true;
						self.resultsFiltering(dealers,errorMsg);

						}); 
					}else {
				
						self.mapController.searchDealersByProperties({Country: province.val(), Locality: city.val()}, {}, function(dealers,errorMsg) {
							self.is_selectLocation = true;
							self.resultsFiltering(dealers,errorMsg);
						});
					}
				}
			}
		});

		if (sessionStorage['search_province']) {
		    $('select[name=country]', self.searchContainer).val(sessionStorage['search_province']).blur();
		    $('select[name=country]', self.searchContainer).change();
		    $('select[name=country]', self.searchContainer).uniform.update();
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
Author: 		Roy Anonuevo
File name: 		storeLocator.js
Description: 	store-locator functionalities
Dependencies: 	jQuery, jquery.cookie.js, uniformjs
*/
var _da = _da || {};

(function($){
	var storelocator = {

		init: function(){			
			if(!$('.store-locator-form').length || !$("#countryCityDropdownData").length){return;}

			var self = this;

			// cache dom			
			self.$form = $('.store-locator-form');
			self.$country =  self.$form.find("select[name='country']");
			self.$city = self.$form.find("select[name='city']");
			self.$dataConfig = $("#countryCityDropdownData");
			self.dataArr = [];

			// get data and append to the dropdown list
			self.getData();

			self.$form.each(function(i, e){
				var $form = $(e),
					$country = $form.find("select[name='country']");

				// bind listener
				$form.on('submit', self.processForm);				
				$country.on("change", self.populateCity.bind(e));
			});			

			// check if country and city exists
			self.checkCookies();
		},

		getData: function(){
			//initial disable city
			var self = this;

			self.$city.prop("disabled", "disabled").closest(".dropdown").addClass("disabled");

			if (self.$dataConfig.length > 0 && self.$dataConfig.embeddedData().list && self.$dataConfig.embeddedData().list.length) {
				self.dataArr = self.$dataConfig.embeddedData().list[0].countries;
			}

			//import Province data
			if(self.dataArr.length > 0){
				$.each(self.dataArr, function(key,val){
					$("<option value='"+val[1].name+"'>"+val[1].name+"</option>").appendTo(self.$country); 
				});
			}
		},

		processForm: function(e){
			//e.preventDefault();
			var country = $(this).find("select[name='country']").val();
			var	city = $(this).find("select[name='city'] option:selected").text();

			$.cookie('locator-country', country);
			$.cookie('locator-city', city);


		},

		populateCity: function(){
			var self = storelocator,
				$form = $(this),
				$country = $form.find("select[name='country']"),
				$city = $form.find("select[name='city']")
				countryVal = $country.val(),
				endLoop = false;
			
			// select the default value
			$city.val(""); 

			// update select val in uniform
			$city.uniform.update(); 

			$.each(self.dataArr, function(key, val){
				if(countryVal == val[1].name){
					$city.children("option:gt(0)").remove();
					
					if(val[1].cities.length>0) {
						$.each(val[1].cities,function(key,val){
							$("<option value=city>"+val[1].name+"</option>").appendTo($city);
						});
					}
					else if(val[1].states.length>0){
						$.each(val[1].states,function(key,val){
							$("<option value=state>"+val[1].name+"</option>").appendTo($city);
						});
					
					}

					endLoop = true;
				}
				if(endLoop){return false;}
			});

			//enable city
			$country.val() == ""? $city.prop("disabled","disabled").closest(".dropdown").addClass("disabled") : $city.prop("disabled",false).closest(".dropdown").removeClass("disabled");
		},

		checkCookies: function(){
			var self = this;

			if($.cookie('locator-country') && $.cookie('locator-city')){
				var country = $.cookie('locator-country'),
					city = $.cookie('locator-city');

				self.processLocator(country, city);
				
				// remove cookies	
				$.removeCookie('locator-country');
				$.removeCookie('locator-city');
			}
		},

		processLocator: function(country, city){
			if(!$('.dealer-locator').length){return;}

			var $dealerLocator = $('.dealer-locator'),
				$country =  $dealerLocator.find("select[name='country']");
				$city = $dealerLocator.find("select[name='statecity']");

			$country.find("option[value='"+country+"']").attr("selected", "selected");
			$country.trigger("change");
			$country.uniform.update();


			$city.find("option[value='"+city+"']").attr("selected", "selected");
			$city.trigger("change");
			$city.uniform.update();			

			// $dealerLocator.find('.actions-bar .button').trigger("click");

			setTimeout(function(){ $dealerLocator.find('.actions-bar .button').trigger("click"); }, 100);
		}
	}

	$(function(){
		storelocator.init();
	});

})(jQuery);

