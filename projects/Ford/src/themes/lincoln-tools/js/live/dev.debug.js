
// vim: ts=4 sts=4 sw=4 expandtab
// -- kriskowal Kris Kowal Copyright (C) 2009-2011 MIT License
// -- tlrobinson Tom Robinson Copyright (C) 2009-2010 MIT License (Narwhal Project)
// -- dantman Daniel Friesen Copyright (C) 2010 XXX TODO License or CLA
// -- fschaefer Florian Sch?¡èfer Copyright (C) 2010 MIT License
// -- Gozala Irakli Gozalishvili Copyright (C) 2010 MIT License
// -- kitcambridge Kit Cambridge Copyright (C) 2011 MIT License
// -- kossnocorp Sasha Koss XXX TODO License or CLA
// -- bryanforbes Bryan Forbes XXX TODO License or CLA
// -- killdream Quildreen Motta Copyright (C) 2011 MIT Licence
// -- michaelficarra Michael Ficarra Copyright (C) 2011 3-clause BSD License
// -- sharkbrainguy Gerard Paapu Copyright (C) 2011 MIT License
// -- bbqsrc Brendan Molloy XXX TODO License or CLA
// -- iwyg XXX TODO License or CLA
// -- DomenicDenicola Domenic Denicola XXX TODO License or CLA
// -- xavierm02 Montillet Xavier XXX TODO License or CLA
// -- Raynos Raynos XXX TODO License or CLA
// -- samsonjs Sami Samhuri XXX TODO License or CLA
// -- rwldrn Rick Waldron Copyright (C) 2011 MIT License
// -- lexer Alexey Zakharov XXX TODO License or CLA

/*!
    Copyright (c) 2009, 280 North Inc. http://280north.com/
    MIT License. http://github.com/280north/narwhal/blob/master/README.md
*/

(function (undefined) {

/**
 * Brings an environment as close to ECMAScript 5 compliance
 * as is possible with the facilities of erstwhile engines.
 *
 * ES5 Draft
 * http://www.ecma-international.org/publications/files/drafts/tc39-2009-050.pdf
 *
 * NOTE: this is a draft, and as such, the URL is subject to change.  If the
 * link is broken, check in the parent directory for the latest TC39 PDF.
 * http://www.ecma-international.org/publications/files/drafts/
 *
 * Previous ES5 Draft
 * http://www.ecma-international.org/publications/files/drafts/tc39-2009-025.pdf
 * This is a broken link to the previous draft of ES5 on which most of the
 * numbered specification references and quotes herein were taken.  Updating
 * these references and quotes to reflect the new document would be a welcome
 * volunteer project.
 *
 * @module
 */

/*whatsupdoc*/

// Shortcut to an often accessed properties, in order to avoid multiple
// dereference that costs universally.
// _Please note: Shortcuts are defined after `Function.prototype.bind` as we
// us it in defining shortcuts.
var call = Function.prototype.call;
var prototypeOfArray = Array.prototype;
var prototypeOfObject = Object.prototype;
var slice = prototypeOfArray.slice;
var owns;
var toString;

// ES-5 15.3.4.5
// http://www.ecma-international.org/publications/files/drafts/tc39-2009-025.pdf

if (!Function.prototype.bind) {
    Function.prototype.bind = function (that) { // .length is 1
        // 1. Let Target be the this value.
        var target = this;
        // 2. If IsCallable(Target) is false, throw a TypeError exception.
        if (typeof target != "function")
            throw new TypeError(); // TODO message
        // 3. Let A be a new (possibly empty) internal list of all of the
        //   argument values provided after thisArg (arg1, arg2 etc), in order.
        // XXX slicedArgs will stand in for "A" if used
        var args = slice.call(arguments, 1); // for normal call
        // 4. Let F be a new native ECMAScript object.
        // 9. Set the [[Prototype]] internal property of F to the standard
        //   built-in Function prototype object as specified in 15.3.3.1.
        // 10. Set the [[Call]] internal property of F as described in
        //   15.3.4.5.1.
        // 11. Set the [[Construct]] internal property of F as described in
        //   15.3.4.5.2.
        // 12. Set the [[HasInstance]] internal property of F as described in
        //   15.3.4.5.3.
        // 13. The [[Scope]] internal property of F is unused and need not
        //   exist.
        var bound = function () {

            if (this instanceof bound) {
                // 15.3.4.5.2 [[Construct]]
                // When the [[Construct]] internal method of a function object,
                // F that was created using the bind function is called with a
                // list of arguments ExtraArgs the following steps are taken:
                // 1. Let target be the value of F's [[TargetFunction]]
                //   internal property.
                // 2. If target has no [[Construct]] internal method, a
                //   TypeError exception is thrown.
                // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
                //   property.
                // 4. Let args be a new list containing the same values as the
                //   list boundArgs in the same order followed by the same
                //   values as the list ExtraArgs in the same order.

                var F = function(){};
                F.prototype = target.prototype;
                var self = new F;

                var result = target.apply(
                    self,
                    args.concat(slice.call(arguments))
                );
                if (result !== null && Object(result) === result)
                    return result;
                return self;

            } else {
                // 15.3.4.5.1 [[Call]]
                // When the [[Call]] internal method of a function object, F,
                // which was created using the bind function is called with a
                // this value and a list of arguments ExtraArgs the following
                // steps are taken:
                // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
                //   property.
                // 2. Let boundThis be the value of F's [[BoundThis]] internal
                //   property.
                // 3. Let target be the value of F's [[TargetFunction]] internal
                //   property.
                // 4. Let args be a new list containing the same values as the list
                //   boundArgs in the same order followed by the same values as
                //   the list ExtraArgs in the same order. 5.  Return the
                //   result of calling the [[Call]] internal method of target
                //   providing boundThis as the this value and providing args
                //   as the arguments.

                // equiv: target.call(this, ...boundArgs, ...args)
                return target.apply(
                    that,
                    args.concat(slice.call(arguments))
                );

            }

        };
        // XXX bound.length is never writable, so don't even try
        //
        // 16. The length own property of F is given attributes as specified in
        //   15.3.5.1.
        // TODO
        // 17. Set the [[Extensible]] internal property of F to true.
        // TODO
        // 18. Call the [[DefineOwnProperty]] internal method of F with
        //   arguments "caller", PropertyDescriptor {[[Value]]: null,
        //   [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]:
        //   false}, and false.
        // TODO
        // 19. Call the [[DefineOwnProperty]] internal method of F with
        //   arguments "arguments", PropertyDescriptor {[[Value]]: null,
        //   [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]:
        //   false}, and false.
        // TODO
        // NOTE Function objects created using Function.prototype.bind do not
        // have a prototype property.
        // XXX can't delete it in pure-js.
        return bound;
    };
}

toString = call.bind(prototypeOfObject.toString);
owns = call.bind(prototypeOfObject.hasOwnProperty);


//
// Array
// =====
//

// ES5 15.4.3.2
if (!Array.isArray) {
    Array.isArray = function (obj) {
        return toString(obj) == "[object Array]";
    };
}

// The IsCallable() check in the Array functions
// has been replaced with a strict check on the
// internal class of the object to trap cases where
// the provided function was actually a regular
// expression literal, which in V8 and
// JavaScriptCore is a typeof "function".  Only in
// V8 are regular expression literals permitted as
// reduce parameters, so it is desirable in the
// general case for the shim to match the more
// strict and common behavior of rejecting regular
// expressions.

// ES5 15.4.4.18
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/array/foreach
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (fun /*, thisp*/) {
        var self = toObject(this),
            thisp = arguments[1],
            i = 0,
            length = self.length >>> 0;

        // If no callback function or if callback is not a callable function
        if (toString(fun) != "[object Function]") {
            throw new TypeError(); // TODO message
        }

        while (i < length) {
            if (i in self) {
                // Invoke the callback function with call, passing arguments:
                // context, property value, property key, thisArg object context
                fun.call(thisp, self[i], i, self);
            }
            i++;
        }
    };
}

// ES5 15.4.4.19
// https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/map
if (!Array.prototype.map) {
    Array.prototype.map = function (fun /*, thisp*/) {
        var self = toObject(this),
            length = self.length >>> 0,
            result = Array(length),
            thisp = arguments[1];

        // If no callback function or if callback is not a callable function
        if (toString(fun) != "[object Function]") {
            throw new TypeError(); // TODO message
        }

        for (var i = 0; i < length; i++) {
            if (i in self)
                result[i] = fun.call(thisp, self[i], i, self);
        }
        return result;
    };
}

// ES5 15.4.4.20
if (!Array.prototype.filter) {
    Array.prototype.filter = function (fun /*, thisp */) {
        var self = toObject(this),
            length = self.length >>> 0,
            result = [],
            thisp = arguments[1];

        // If no callback function or if callback is not a callable function
        if (toString(fun) != "[object Function]") {
            throw new TypeError(); // TODO message
        }

        for (var i = 0; i < length; i++) {
            if (i in self && fun.call(thisp, self[i], i, self))
                result.push(self[i]);
        }
        return result;
    };
}

// ES5 15.4.4.16
if (!Array.prototype.every) {
    Array.prototype.every = function (fun /*, thisp */) {
        var self = toObject(this),
            length = self.length >>> 0,
            thisp = arguments[1];

        // If no callback function or if callback is not a callable function
        if (toString(fun) != "[object Function]") {
            throw new TypeError(); // TODO message
        }

        for (var i = 0; i < length; i++) {
            if (i in self && !fun.call(thisp, self[i], i, self))
                return false;
        }
        return true;
    };
}

// ES5 15.4.4.17
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/some
if (!Array.prototype.some) {
    Array.prototype.some = function (fun /*, thisp */) {
        var self = toObject(this),
            length = self.length >>> 0,
            thisp = arguments[1];

        // If no callback function or if callback is not a callable function
        if (toString(fun) != "[object Function]") {
            throw new TypeError(); // TODO message
        }

        for (var i = 0; i < length; i++) {
            if (i in self && fun.call(thisp, self[i], i, self))
                return true;
        }
        return false;
    };
}

// ES5 15.4.4.21
// https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduce
if (!Array.prototype.reduce) {
    Array.prototype.reduce = function (fun /*, initial*/) {
        var self = toObject(this),
            length = self.length >>> 0;

        // If no callback function or if callback is not a callable function
        if (toString(fun) != "[object Function]") {
            throw new TypeError(); // TODO message
        }

        // no value to return if no initial value and an empty array
        if (!length && arguments.length == 1)
            throw new TypeError(); // TODO message

        var i = 0;
        var result;
        if (arguments.length >= 2) {
            result = arguments[1];
        } else {
            do {
                if (i in self) {
                    result = self[i++];
                    break;
                }

                // if array contains no values, no initial value to return
                if (++i >= length)
                    throw new TypeError(); // TODO message
            } while (true);
        }

        for (; i < length; i++) {
            if (i in self)
                result = fun.call(void 0, result, self[i], i, self);
        }

        return result;
    };
}

// ES5 15.4.4.22
// https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduceRight
if (!Array.prototype.reduceRight) {
    Array.prototype.reduceRight = function (fun /*, initial*/) {
        var self = toObject(this),
            length = self.length >>> 0;

        // If no callback function or if callback is not a callable function
        if (toString(fun) != "[object Function]") {
            throw new TypeError(); // TODO message
        }

        // no value to return if no initial value, empty array
        if (!length && arguments.length == 1)
            throw new TypeError(); // TODO message

        var result, i = length - 1;
        if (arguments.length >= 2) {
            result = arguments[1];
        } else {
            do {
                if (i in self) {
                    result = self[i--];
                    break;
                }

                // if array contains no values, no initial value to return
                if (--i < 0)
                    throw new TypeError(); // TODO message
            } while (true);
        }

        do {
            if (i in this)
                result = fun.call(void 0, result, self[i], i, self);
        } while (i--);

        return result;
    };
}

// ES5 15.4.4.14
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (sought /*, fromIndex */ ) {
        var self = toObject(this),
            length = self.length >>> 0;

        if (!length)
            return -1;

        var i = 0;
        if (arguments.length > 1)
            i = parseInt(arguments[1]);

        // handle negative indices
        i = i >= 0 ? i : length - Math.abs(i);
        for (; i < length; i++) {
            if (i in self && self[i] === sought) {
                return i;
            }
        }
        return -1;
    };
}

// ES5 15.4.4.15
if (!Array.prototype.lastIndexOf) {
    Array.prototype.lastIndexOf = function (sought /*, fromIndex */) {
        var self = toObject(this),
            length = self.length >>> 0;

        if (!length)
            return -1;
        var i = length - 1;
        if (arguments.length > 1)
            i = parseInt(arguments[1]);
        // handle negative indices
        i = i >= 0 ? i : length - Math.abs(i);
        for (; i >= 0; i--) {
            if (i in self && sought === self[i])
                return i;
        }
        return -1;
    };
}

//
// Array
// =====
//

// ES5 15.4.4.12
// http://es5.github.com/#x15.4.4.12
// Default value for second param
// [bugfix, ielt9, old browsers]
// IE < 9 bug: [1,2].splice(0).join("") == "" but should be "12"
if([1,2].splice(0).length != 2) {
    var _origArraySplice = Array.prototype.splice;

    Array.prototype.splice = function(start, deleteCount) {
        if(!arguments.length)return [];

        return _origArraySplice.apply(this, [
                start === void 0 ? 0 : start,
                deleteCount === void 0 ? (this.length - start) : deleteCount
            ].concat(slice.call(arguments, 2)))
    };
}

//
// Object
// ======
//


// ES5 15.2.3.14
// http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation
if (!Object.keys) {

    var hasDontEnumBug = true,
        dontEnums = [
            "toString",
            "toLocaleString",
            "valueOf",
            "hasOwnProperty",
            "isPrototypeOf",
            "propertyIsEnumerable",
            "constructor"
        ],
        dontEnumsLength = dontEnums.length;

    for (var key in {"toString": null})
        hasDontEnumBug = false;

    Object.keys = function keys(object) {

        if ((typeof object != "object" && typeof object != "function") || object === null)
            throw new TypeError("Object.keys called on a non-object");

        var keys = [];
        for (var name in object) {
            if (owns(object, name)) {
                keys.push(name);
            }
        }

        if (hasDontEnumBug) {
            for (var i = 0, ii = dontEnumsLength; i < ii; i++) {
                var dontEnum = dontEnums[i];
                if (owns(object, dontEnum)) {
                    keys.push(dontEnum);
                }
            }
        }

        return keys;
    };

}

//
// Date
// ====
//

// ES5 15.9.5.43
// Format a Date object as a string according to a simplified subset of the ISO 8601
// standard as defined in 15.9.1.15.
if (!Date.prototype.toISOString) {
    Date.prototype.toISOString = function toISOString() {
        var result, length, value;
        if (!isFinite(this))
            throw new RangeError;

        // the date time string format is specified in 15.9.1.15.
        result = [this.getUTCFullYear(), this.getUTCMonth() + 1, this.getUTCDate(),
            this.getUTCHours(), this.getUTCMinutes(), this.getUTCSeconds()];

        length = result.length;
        while (length--) {
            value = result[length];
            // pad months, days, hours, minutes, and seconds to have two digits.
            if (value < 10)
                result[length] = "0" + value;
        }
        // pad milliseconds to have three digits.
        return result.slice(0, 3).join("-") + "T" + result.slice(3).join(":") + "." +
            ("000" + this.getUTCMilliseconds()).slice(-3) + "Z";
    }
}

// ES5 15.9.4.4
if (!Date.now) {
    Date.now = function now() {
        return new Date().getTime();
    };
}

// ES5 15.9.5.44
if (!Date.prototype.toJSON) {
    Date.prototype.toJSON = function toJSON(key) {
        // This function provides a String representation of a Date object for
        // use by JSON.stringify (15.12.3). When the toJSON method is called
        // with argument key, the following steps are taken:

        // 1.  Let O be the result of calling ToObject, giving it the this
        // value as its argument.
        // 2. Let tv be ToPrimitive(O, hint Number).
        // 3. If tv is a Number and is not finite, return null.
        // XXX
        // 4. Let toISO be the result of calling the [[Get]] internal method of
        // O with argument "toISOString".
        // 5. If IsCallable(toISO) is false, throw a TypeError exception.
        if (typeof this.toISOString != "function")
            throw new TypeError(); // TODO message
        // 6. Return the result of calling the [[Call]] internal method of
        // toISO with O as the this value and an empty argument list.
        return this.toISOString();

        // NOTE 1 The argument is ignored.

        // NOTE 2 The toJSON function is intentionally generic; it does not
        // require that its this value be a Date object. Therefore, it can be
        // transferred to other kinds of objects for use as a method. However,
        // it does require that any such object have a toISOString method. An
        // object is free to use the argument key to filter its
        // stringification.
    };
}


//
// String
// ======
//

// ES5 15.5.4.20
var ws = "\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003" +
    "\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028" +
    "\u2029\uFEFF";
if (!String.prototype.trim || ws.trim()) {
    // http://blog.stevenlevithan.com/archives/faster-trim-javascript
    // http://perfectionkills.com/whitespace-deviations/
    ws = "[" + ws + "]";
    var trimBeginRegexp = new RegExp("^" + ws + ws + "*"),
        trimEndRegexp = new RegExp(ws + ws + "*$");
    String.prototype.trim = function trim() {
        return String(this).replace(trimBeginRegexp, "").replace(trimEndRegexp, "");
    };
}

// ES5 15.5.4.14
// http://es5.github.com/#x15.5.4.14
// [bugfix, chrome]
// If separator is undefined, then the result array contains just one String, which is the this value (converted to a String). If limit is not undefined, then the output array is truncated so that it contains no more than limit elements.
// "0".split(undefined, 0) -> []
if("0".split(void 0, 0).length) {
    var oldSplit = String.prototype.split;
    String.prototype.split = function(separator, limit) {
        if(separator === void 0 && limit === 0)return [];
        return oldSplit.apply(this, arguments);
    }
}

// ECMA-262, 3rd B.2.3
// Note an ECMAScript standart, although ECMAScript 3rd Edition has a non-normative section suggesting uniform semantics
// and it should be normalized across all browsers
// [bugfix, IE lt 9] IE < 9 substr() with negative value not working in IE
if("".substr && "0b".substr(-1) !== "b") {
    var oldSubstr = String.prototype.substr;
    /**
* Get the substring of a string
* @param {integer} start where to start the substring
* @param {integer} length how many characters to return
* @return {string}
*/
    String.prototype.substr = function(start, length) {
        return oldSubstr.call(this, start < 0 ? (start = this.length + start) < 0 ? 0 : start : start, length);
    }
}

//
// Util
// ======
//

// http://jsperf.com/to-integer
    //SOHRAB: commented out since JSLINT doesn't allow division by zero
//var toInteger = function (n) {
//    n = +n;
//    if (n !== n) // isNaN
//        n = -1;
//    else if (n !== 0 && n !== (1/0) && n !== -(1/0))
//        n = (n > 0 || -1) * Math.floor(Math.abs(n));
//    return n;
//};

var prepareString = "a"[0] != "a",
    // ES5 9.9
    toObject = function (o) {
        if (o == null) { // this matches both null and undefined
            throw new TypeError(); // TODO message
        }
        // If the implementation doesn't support by-index access of
        // string characters (ex. IE < 7), split the string
        if (prepareString && typeof o == "string" && o) {
            return o.split("");
        }
        return Object(o);
    };

})();

//ES5 15.2.3.5 
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


/*!
 * jQuery JavaScript Library v1.8.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: Tue Nov 13 2012 08:20:33 GMT-0500 (Eastern Standard Time)
 */
(function( window, undefined ) {
var
	// A central reference to the root jQuery(document)
	rootjQuery,

	// The deferred used on DOM ready
	readyList,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,
	location = window.location,
	navigator = window.navigator,

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$,

	// Save a reference to some core methods
	core_push = Array.prototype.push,
	core_slice = Array.prototype.slice,
	core_indexOf = Array.prototype.indexOf,
	core_toString = Object.prototype.toString,
	core_hasOwn = Object.prototype.hasOwnProperty,
	core_trim = String.prototype.trim,

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context, rootjQuery );
	},

	// Used for matching numbers
	core_pnum = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,

	// Used for detecting and trimming whitespace
	core_rnotwhite = /\S/,
	core_rspace = /\s+/,

	// Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	rquickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,

	// Match a standalone tag
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

	// JSON RegExp
	rvalidchars = /^[\],:{}\s]*$/,
	rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
	rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
	rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return ( letter + "" ).toUpperCase();
	},

	// The ready event handler and self cleanup method
	DOMContentLoaded = function() {
		if ( document.addEventListener ) {
			document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
			jQuery.ready();
		} else if ( document.readyState === "complete" ) {
			// we're here because readyState === "complete" in oldIE
			// which is good enough for us to call the dom ready!
			document.detachEvent( "onreadystatechange", DOMContentLoaded );
			jQuery.ready();
		}
	},

	// [[Class]] -> type pairs
	class2type = {};

jQuery.fn = jQuery.prototype = {
	constructor: jQuery,
	init: function( selector, context, rootjQuery ) {
		var match, elem, ret, doc;

		// Handle $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle $(DOMElement)
		if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;
					doc = ( context && context.nodeType ? context.ownerDocument || context : document );

					// scripts is true for back-compat
					selector = jQuery.parseHTML( match[1], doc, true );
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						this.attr.call( selector, context, true );
					}

					return jQuery.merge( this, selector );

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return rootjQuery.ready( selector );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	},

	// Start with an empty selector
	selector: "",

	// The current version of jQuery being used
	jquery: "1.8.3",

	// The default length of a jQuery object is 0
	length: 0,

	// The number of elements contained in the matched element set
	size: function() {
		return this.length;
	},

	toArray: function() {
		return core_slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num == null ?

			// Return a 'clean' array
			this.toArray() :

			// Return just the object
			( num < 0 ? this[ this.length + num ] : this[ num ] );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems, name, selector ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		ret.context = this.context;

		if ( name === "find" ) {
			ret.selector = this.selector + ( this.selector ? " " : "" ) + selector;
		} else if ( name ) {
			ret.selector = this.selector + "." + name + "(" + selector + ")";
		}

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	ready: function( fn ) {
		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	},

	eq: function( i ) {
		i = +i;
		return i === -1 ?
			this.slice( i ) :
			this.slice( i, i + 1 );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	slice: function() {
		return this.pushStack( core_slice.apply( this, arguments ),
			"slice", core_slice.call(arguments).join(",") );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: core_push,
	sort: [].sort,
	splice: [].splice
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	noConflict: function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	},

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready, 1 );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.trigger ) {
			jQuery( document ).trigger("ready").off("ready");
		}
	},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		return !isNaN( parseFloat(obj) ) && isFinite( obj );
	},

	type: function( obj ) {
		return obj == null ?
			String( obj ) :
			class2type[ core_toString.call(obj) ] || "object";
	},

	isPlainObject: function( obj ) {
		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!core_hasOwn.call(obj, "constructor") &&
				!core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.

		var key;
		for ( key in obj ) {}

		return key === undefined || core_hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	error: function( msg ) {
		throw new Error( msg );
	},

	// data: string of html
	// context (optional): If specified, the fragment will be created in this context, defaults to document
	// scripts (optional): If true, will include scripts passed in the html string
	parseHTML: function( data, context, scripts ) {
		var parsed;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			scripts = context;
			context = 0;
		}
		context = context || document;

		// Single tag
		if ( (parsed = rsingleTag.exec( data )) ) {
			return [ context.createElement( parsed[1] ) ];
		}

		parsed = jQuery.buildFragment( [ data ], context, scripts ? null : [] );
		return jQuery.merge( [],
			(parsed.cacheable ? jQuery.clone( parsed.fragment ) : parsed.fragment).childNodes );
	},

	parseJSON: function( data ) {
		if ( !data || typeof data !== "string") {
			return null;
		}

		// Make sure leading/trailing whitespace is removed (IE can't handle it)
		data = jQuery.trim( data );

		// Attempt to parse using the native JSON parser first
		if ( window.JSON && window.JSON.parse ) {
			return window.JSON.parse( data );
		}

		// Make sure the incoming data is actual JSON
		// Logic borrowed from http://json.org/json2.js
		if ( rvalidchars.test( data.replace( rvalidescape, "@" )
			.replace( rvalidtokens, "]" )
			.replace( rvalidbraces, "")) ) {

			return ( new Function( "return " + data ) )();

		}
		jQuery.error( "Invalid JSON: " + data );
	},

	// Cross-browser xml parsing
	parseXML: function( data ) {
		var xml, tmp;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		try {
			if ( window.DOMParser ) { // Standard
				tmp = new DOMParser();
				xml = tmp.parseFromString( data , "text/xml" );
			} else { // IE
				xml = new ActiveXObject( "Microsoft.XMLDOM" );
				xml.async = "false";
				xml.loadXML( data );
			}
		} catch( e ) {
			xml = undefined;
		}
		if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	},

	noop: function() {},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && core_rnotwhite.test( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var name,
			i = 0,
			length = obj.length,
			isObj = length === undefined || jQuery.isFunction( obj );

		if ( args ) {
			if ( isObj ) {
				for ( name in obj ) {
					if ( callback.apply( obj[ name ], args ) === false ) {
						break;
					}
				}
			} else {
				for ( ; i < length; ) {
					if ( callback.apply( obj[ i++ ], args ) === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isObj ) {
				for ( name in obj ) {
					if ( callback.call( obj[ name ], name, obj[ name ] ) === false ) {
						break;
					}
				}
			} else {
				for ( ; i < length; ) {
					if ( callback.call( obj[ i ], i, obj[ i++ ] ) === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Use native String.trim function wherever possible
	trim: core_trim && !core_trim.call("\uFEFF\xA0") ?
		function( text ) {
			return text == null ?
				"" :
				core_trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var type,
			ret = results || [];

		if ( arr != null ) {
			// The window, strings (and functions) also have 'length'
			// Tweaked logic slightly to handle Blackberry 4.7 RegExp issues #6930
			type = jQuery.type( arr );

			if ( arr.length == null || type === "string" || type === "function" || type === "regexp" || jQuery.isWindow( arr ) ) {
				core_push.call( ret, arr );
			} else {
				jQuery.merge( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( core_indexOf ) {
				return core_indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var l = second.length,
			i = first.length,
			j = 0;

		if ( typeof l === "number" ) {
			for ( ; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}

		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, inv ) {
		var retVal,
			ret = [],
			i = 0,
			length = elems.length;
		inv = !!inv;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			retVal = !!callback( elems[ i ], i );
			if ( inv !== retVal ) {
				ret.push( elems[ i ] );
			}
		}

		return ret;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value, key,
			ret = [],
			i = 0,
			length = elems.length,
			// jquery objects are treated as arrays
			isArray = elems instanceof jQuery || length !== undefined && typeof length === "number" && ( ( length > 0 && elems[ 0 ] && elems[ length -1 ] ) || length === 0 || jQuery.isArray( elems ) ) ;

		// Go through the array, translating each of the items to their
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}

		// Go through every key on the object,
		} else {
			for ( key in elems ) {
				value = callback( elems[ key ], key, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}
		}

		// Flatten any nested arrays
		return ret.concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = core_slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context, args.concat( core_slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	access: function( elems, fn, key, value, chainable, emptyGet, pass ) {
		var exec,
			bulk = key == null,
			i = 0,
			length = elems.length;

		// Sets many values
		if ( key && typeof key === "object" ) {
			for ( i in key ) {
				jQuery.access( elems, fn, i, key[i], 1, emptyGet, value );
			}
			chainable = 1;

		// Sets one value
		} else if ( value !== undefined ) {
			// Optionally, function values get executed if exec is true
			exec = pass === undefined && jQuery.isFunction( value );

			if ( bulk ) {
				// Bulk operations only iterate when executing function values
				if ( exec ) {
					exec = fn;
					fn = function( elem, key, value ) {
						return exec.call( jQuery( elem ), value );
					};

				// Otherwise they run against the entire set
				} else {
					fn.call( elems, value );
					fn = null;
				}
			}

			if ( fn ) {
				for (; i < length; i++ ) {
					fn( elems[i], key, exec ? value.call( elems[i], i, fn( elems[i], key ) ) : value, pass );
				}
			}

			chainable = 1;
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				length ? fn( elems[0], key ) : emptyGet;
	},

	now: function() {
		return ( new Date() ).getTime();
	}
});

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready, 1 );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", jQuery.ready, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", DOMContentLoaded );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", jQuery.ready );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

// All jQuery objects should point back to these
rootjQuery = jQuery(document);
// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.split( core_rspace ), function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Control if a given callback is in the list
			has: function( fn ) {
				return jQuery.inArray( fn, list ) > -1;
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				args = args || [];
				args = [ context, args.slice ? args.slice() : args ];
				if ( list && ( !fired || stack ) ) {
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};
jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var action = tuple[ 0 ],
								fn = fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ]( jQuery.isFunction( fn ) ?
								function() {
									var returned = fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise()
											.done( newDefer.resolve )
											.fail( newDefer.reject )
											.progress( newDefer.notify );
									} else {
										newDefer[ action + "With" ]( this === deferred ? newDefer : this, [ returned ] );
									}
								} :
								newDefer[ action ]
							);
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ] = list.fire
			deferred[ tuple[0] ] = list.fire;
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = core_slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? core_slice.call( arguments ) : value;
					if( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});
jQuery.support = (function() {

	var support,
		all,
		a,
		select,
		opt,
		input,
		fragment,
		eventName,
		i,
		isSupported,
		clickFn,
		div = document.createElement("div");

	// Setup
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// Support tests won't run in some limited or non-browser environments
	all = div.getElementsByTagName("*");
	a = div.getElementsByTagName("a")[ 0 ];
	if ( !all || !a || !all.length ) {
		return {};
	}

	// First batch of tests
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px;float:left;opacity:.5";
	support = {
		// IE strips leading whitespace when .innerHTML is used
		leadingWhitespace: ( div.firstChild.nodeType === 3 ),

		// Make sure that tbody elements aren't automatically inserted
		// IE will insert them into empty tables
		tbody: !div.getElementsByTagName("tbody").length,

		// Make sure that link elements get serialized correctly by innerHTML
		// This requires a wrapper element in IE
		htmlSerialize: !!div.getElementsByTagName("link").length,

		// Get the style information from getAttribute
		// (IE uses .cssText instead)
		style: /top/.test( a.getAttribute("style") ),

		// Make sure that URLs aren't manipulated
		// (IE normalizes it by default)
		hrefNormalized: ( a.getAttribute("href") === "/a" ),

		// Make sure that element opacity exists
		// (IE uses filter instead)
		// Use a regex to work around a WebKit issue. See #5145
		opacity: /^0.5/.test( a.style.opacity ),

		// Verify style float existence
		// (IE uses styleFloat instead of cssFloat)
		cssFloat: !!a.style.cssFloat,

		// Make sure that if no value is specified for a checkbox
		// that it defaults to "on".
		// (WebKit defaults to "" instead)
		checkOn: ( input.value === "on" ),

		// Make sure that a selected-by-default option has a working selected property.
		// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
		optSelected: opt.selected,

		// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
		getSetAttribute: div.className !== "t",

		// Tests for enctype support on a form (#6743)
		enctype: !!document.createElement("form").enctype,

		// Makes sure cloning an html5 element does not cause problems
		// Where outerHTML is undefined, this still works
		html5Clone: document.createElement("nav").cloneNode( true ).outerHTML !== "<:nav></:nav>",

		// jQuery.support.boxModel DEPRECATED in 1.8 since we don't support Quirks Mode
		boxModel: ( document.compatMode === "CSS1Compat" ),

		// Will be defined later
		submitBubbles: true,
		changeBubbles: true,
		focusinBubbles: false,
		deleteExpando: true,
		noCloneEvent: true,
		inlineBlockNeedsLayout: false,
		shrinkWrapBlocks: false,
		reliableMarginRight: true,
		boxSizingReliable: true,
		pixelPosition: false
	};

	// Make sure checked status is properly cloned
	input.checked = true;
	support.noCloneChecked = input.cloneNode( true ).checked;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Test to see if it's possible to delete an expando from an element
	// Fails in Internet Explorer
	try {
		delete div.test;
	} catch( e ) {
		support.deleteExpando = false;
	}

	if ( !div.addEventListener && div.attachEvent && div.fireEvent ) {
		div.attachEvent( "onclick", clickFn = function() {
			// Cloning a node shouldn't copy over any
			// bound event handlers (IE does this)
			support.noCloneEvent = false;
		});
		div.cloneNode( true ).fireEvent("onclick");
		div.detachEvent( "onclick", clickFn );
	}

	// Check if a radio maintains its value
	// after being appended to the DOM
	input = document.createElement("input");
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";

	input.setAttribute( "checked", "checked" );

	// #11217 - WebKit loses check when the name is after the checked attribute
	input.setAttribute( "name", "t" );

	div.appendChild( input );
	fragment = document.createDocumentFragment();
	fragment.appendChild( div.lastChild );

	// WebKit doesn't clone checked state correctly in fragments
	support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	support.appendChecked = input.checked;

	fragment.removeChild( input );
	fragment.appendChild( div );

	// Technique from Juriy Zaytsev
	// http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
	// We only care about the case where non-standard event systems
	// are used, namely in IE. Short-circuiting here helps us to
	// avoid an eval call (in setAttribute) which can cause CSP
	// to go haywire. See: https://developer.mozilla.org/en/Security/CSP
	if ( div.attachEvent ) {
		for ( i in {
			submit: true,
			change: true,
			focusin: true
		}) {
			eventName = "on" + i;
			isSupported = ( eventName in div );
			if ( !isSupported ) {
				div.setAttribute( eventName, "return;" );
				isSupported = ( typeof div[ eventName ] === "function" );
			}
			support[ i + "Bubbles" ] = isSupported;
		}
	}

	// Run tests that need a body at doc ready
	jQuery(function() {
		var container, div, tds, marginDiv,
			divReset = "padding:0;margin:0;border:0;display:block;overflow:hidden;",
			body = document.getElementsByTagName("body")[0];

		if ( !body ) {
			// Return for frameset docs that don't have a body
			return;
		}

		container = document.createElement("div");
		container.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px";
		body.insertBefore( container, body.firstChild );

		// Construct the test element
		div = document.createElement("div");
		container.appendChild( div );

		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		// (only IE 8 fails this test)
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		tds = div.getElementsByTagName("td");
		tds[ 0 ].style.cssText = "padding:0;margin:0;border:0;display:none";
		isSupported = ( tds[ 0 ].offsetHeight === 0 );

		tds[ 0 ].style.display = "";
		tds[ 1 ].style.display = "none";

		// Check if empty table cells still have offsetWidth/Height
		// (IE <= 8 fail this test)
		support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );

		// Check box-sizing and margin behavior
		div.innerHTML = "";
		div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";
		support.boxSizing = ( div.offsetWidth === 4 );
		support.doesNotIncludeMarginInBodyOffset = ( body.offsetTop !== 1 );

		// NOTE: To any future maintainer, we've window.getComputedStyle
		// because jsdom on node.js will break without it.
		if ( window.getComputedStyle ) {
			support.pixelPosition = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			support.boxSizingReliable = ( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. For more
			// info see bug #3333
			// Fails in WebKit before Feb 2011 nightlies
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			marginDiv = document.createElement("div");
			marginDiv.style.cssText = div.style.cssText = divReset;
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";
			div.appendChild( marginDiv );
			support.reliableMarginRight =
				!parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );
		}

		if ( typeof div.style.zoom !== "undefined" ) {
			// Check if natively block-level elements act like inline-block
			// elements when setting their display to 'inline' and giving
			// them layout
			// (IE < 8 does this)
			div.innerHTML = "";
			div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1";
			support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 );

			// Check if elements with layout shrink-wrap their children
			// (IE 6 does this)
			div.style.display = "block";
			div.style.overflow = "visible";
			div.innerHTML = "<div></div>";
			div.firstChild.style.width = "5px";
			support.shrinkWrapBlocks = ( div.offsetWidth !== 3 );

			container.style.zoom = 1;
		}

		// Null elements to avoid leaks in IE
		body.removeChild( container );
		container = div = tds = marginDiv = null;
	});

	// Null elements to avoid leaks in IE
	fragment.removeChild( div );
	all = a = select = opt = input = fragment = div = null;

	return support;
})();
var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
	rmultiDash = /([A-Z])/g;

jQuery.extend({
	cache: {},

	deletedIds: [],

	// Remove at next major release (1.9/2.0)
	uuid: 0,

	// Unique for each copy of jQuery on the page
	// Non-digits removed to match rinlinejQuery
	expando: "jQuery" + ( jQuery.fn.jquery + Math.random() ).replace( /\D/g, "" ),

	// The following elements throw uncatchable exceptions if you
	// attempt to add expando properties to them.
	noData: {
		"embed": true,
		// Ban all objects except for Flash (which handle expandos)
		"object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
		"applet": true
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data, pvt /* Internal Use Only */ ) {
		if ( !jQuery.acceptData( elem ) ) {
			return;
		}

		var thisCache, ret,
			internalKey = jQuery.expando,
			getByName = typeof name === "string",

			// We have to handle DOM nodes and JS objects differently because IE6-7
			// can't GC object references properly across the DOM-JS boundary
			isNode = elem.nodeType,

			// Only DOM nodes need the global jQuery cache; JS object data is
			// attached directly to the object so GC can occur automatically
			cache = isNode ? jQuery.cache : elem,

			// Only defining an ID for JS objects if its cache already exists allows
			// the code to shortcut on the same path as a DOM node with no cache
			id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

		// Avoid doing any more work than we need to when trying to get data on an
		// object that has no data at all
		if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && getByName && data === undefined ) {
			return;
		}

		if ( !id ) {
			// Only DOM nodes need a new unique ID for each element since their data
			// ends up in the global cache
			if ( isNode ) {
				elem[ internalKey ] = id = jQuery.deletedIds.pop() || jQuery.guid++;
			} else {
				id = internalKey;
			}
		}

		if ( !cache[ id ] ) {
			cache[ id ] = {};

			// Avoids exposing jQuery metadata on plain JS objects when the object
			// is serialized using JSON.stringify
			if ( !isNode ) {
				cache[ id ].toJSON = jQuery.noop;
			}
		}

		// An object can be passed to jQuery.data instead of a key/value pair; this gets
		// shallow copied over onto the existing cache
		if ( typeof name === "object" || typeof name === "function" ) {
			if ( pvt ) {
				cache[ id ] = jQuery.extend( cache[ id ], name );
			} else {
				cache[ id ].data = jQuery.extend( cache[ id ].data, name );
			}
		}

		thisCache = cache[ id ];

		// jQuery data() is stored in a separate object inside the object's internal data
		// cache in order to avoid key collisions between internal data and user-defined
		// data.
		if ( !pvt ) {
			if ( !thisCache.data ) {
				thisCache.data = {};
			}

			thisCache = thisCache.data;
		}

		if ( data !== undefined ) {
			thisCache[ jQuery.camelCase( name ) ] = data;
		}

		// Check for both converted-to-camel and non-converted data property names
		// If a data property was specified
		if ( getByName ) {

			// First Try to find as-is property data
			ret = thisCache[ name ];

			// Test for null|undefined property data
			if ( ret == null ) {

				// Try to find the camelCased property
				ret = thisCache[ jQuery.camelCase( name ) ];
			}
		} else {
			ret = thisCache;
		}

		return ret;
	},

	removeData: function( elem, name, pvt /* Internal Use Only */ ) {
		if ( !jQuery.acceptData( elem ) ) {
			return;
		}

		var thisCache, i, l,

			isNode = elem.nodeType,

			// See jQuery.data for more information
			cache = isNode ? jQuery.cache : elem,
			id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

		// If there is already no cache entry for this object, there is no
		// purpose in continuing
		if ( !cache[ id ] ) {
			return;
		}

		if ( name ) {

			thisCache = pvt ? cache[ id ] : cache[ id ].data;

			if ( thisCache ) {

				// Support array or space separated string names for data keys
				if ( !jQuery.isArray( name ) ) {

					// try the string as a key before any manipulation
					if ( name in thisCache ) {
						name = [ name ];
					} else {

						// split the camel cased version by spaces unless a key with the spaces exists
						name = jQuery.camelCase( name );
						if ( name in thisCache ) {
							name = [ name ];
						} else {
							name = name.split(" ");
						}
					}
				}

				for ( i = 0, l = name.length; i < l; i++ ) {
					delete thisCache[ name[i] ];
				}

				// If there is no data left in the cache, we want to continue
				// and let the cache object itself get destroyed
				if ( !( pvt ? isEmptyDataObject : jQuery.isEmptyObject )( thisCache ) ) {
					return;
				}
			}
		}

		// See jQuery.data for more information
		if ( !pvt ) {
			delete cache[ id ].data;

			// Don't destroy the parent cache unless the internal data object
			// had been the only thing left in it
			if ( !isEmptyDataObject( cache[ id ] ) ) {
				return;
			}
		}

		// Destroy the cache
		if ( isNode ) {
			jQuery.cleanData( [ elem ], true );

		// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
		} else if ( jQuery.support.deleteExpando || cache != cache.window ) {
			delete cache[ id ];

		// When all else fails, null
		} else {
			cache[ id ] = null;
		}
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return jQuery.data( elem, name, data, true );
	},

	// A method for determining if a DOM node can handle the data expando
	acceptData: function( elem ) {
		var noData = elem.nodeName && jQuery.noData[ elem.nodeName.toLowerCase() ];

		// nodes accept data unless otherwise specified; rejection can be conditional
		return !noData || noData !== true && elem.getAttribute("classid") === noData;
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var parts, part, attr, name, l,
			elem = this[0],
			i = 0,
			data = null;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					attr = elem.attributes;
					for ( l = attr.length; i < l; i++ ) {
						name = attr[i].name;

						if ( !name.indexOf( "data-" ) ) {
							name = jQuery.camelCase( name.substring(5) );

							dataAttr( elem, name, data[ name ] );
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		parts = key.split( ".", 2 );
		parts[1] = parts[1] ? "." + parts[1] : "";
		part = parts[1] + "!";

		return jQuery.access( this, function( value ) {

			if ( value === undefined ) {
				data = this.triggerHandler( "getData" + part, [ parts[0] ] );

				// Try to fetch any internally stored data first
				if ( data === undefined && elem ) {
					data = jQuery.data( elem, key );
					data = dataAttr( elem, key, data );
				}

				return data === undefined && parts[1] ?
					this.data( parts[0] ) :
					data;
			}

			parts[1] = value;
			this.each(function() {
				var self = jQuery( this );

				self.triggerHandler( "setData" + part, parts );
				jQuery.data( this, key, value );
				self.triggerHandler( "changeData" + part, parts );
			});
		}, null, value, arguments.length > 1, null, false );
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
				data === "false" ? false :
				data === "null" ? null :
				// Only convert to a number if it doesn't change the string
				+data + "" === data ? +data :
				rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}
jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery.removeData( elem, type + "queue", true );
				jQuery.removeData( elem, key, true );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	delay: function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var nodeHook, boolHook, fixSpecified,
	rclass = /[\t\r\n]/g,
	rreturn = /\r/g,
	rtype = /^(?:button|input)$/i,
	rfocusable = /^(?:button|input|object|select|textarea)$/i,
	rclickable = /^a(?:rea|)$/i,
	rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
	getSetAttribute = jQuery.support.getSetAttribute;

jQuery.fn.extend({
	attr: function( name, value ) {
		return jQuery.access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	},

	prop: function( name, value ) {
		return jQuery.access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	},

	addClass: function( value ) {
		var classNames, i, l, elem,
			setClass, c, cl;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call(this, j, this.className) );
			});
		}

		if ( value && typeof value === "string" ) {
			classNames = value.split( core_rspace );

			for ( i = 0, l = this.length; i < l; i++ ) {
				elem = this[ i ];

				if ( elem.nodeType === 1 ) {
					if ( !elem.className && classNames.length === 1 ) {
						elem.className = value;

					} else {
						setClass = " " + elem.className + " ";

						for ( c = 0, cl = classNames.length; c < cl; c++ ) {
							if ( setClass.indexOf( " " + classNames[ c ] + " " ) < 0 ) {
								setClass += classNames[ c ] + " ";
							}
						}
						elem.className = jQuery.trim( setClass );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var removes, className, elem, c, cl, i, l;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call(this, j, this.className) );
			});
		}
		if ( (value && typeof value === "string") || value === undefined ) {
			removes = ( value || "" ).split( core_rspace );

			for ( i = 0, l = this.length; i < l; i++ ) {
				elem = this[ i ];
				if ( elem.nodeType === 1 && elem.className ) {

					className = (" " + elem.className + " ").replace( rclass, " " );

					// loop over each item in the removal list
					for ( c = 0, cl = removes.length; c < cl; c++ ) {
						// Remove until there is nothing to remove,
						while ( className.indexOf(" " + removes[ c ] + " ") >= 0 ) {
							className = className.replace( " " + removes[ c ] + " " , " " );
						}
					}
					elem.className = value ? jQuery.trim( className ) : "";
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isBool = typeof stateVal === "boolean";

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					state = stateVal,
					classNames = value.split( core_rspace );

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					state = isBool ? state : !self.hasClass( className );
					self[ state ? "addClass" : "removeClass" ]( className );
				}

			} else if ( type === "undefined" || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// toggle whole className
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	},

	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val,
				self = jQuery(this);

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, self.val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map(val, function ( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				// attributes.value is undefined in Blackberry 4.7 but
				// uses .value. See #6932
				var val = elem.attributes.value;
				return !val || val.specified ? elem.value : elem.text;
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var values = jQuery.makeArray( value );

				jQuery(elem).find("option").each(function() {
					this.selected = jQuery.inArray( jQuery(this).val(), values ) >= 0;
				});

				if ( !values.length ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	},

	// Unused in 1.8, left in so attrFn-stabbers won't die; remove in 1.9
	attrFn: {},

	attr: function( elem, name, value, pass ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( pass && jQuery.isFunction( jQuery.fn[ name ] ) ) {
			return jQuery( elem )[ name ]( value );
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( notxml ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] || ( rboolean.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;

			} else if ( hooks && "set" in hooks && notxml && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && notxml && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {

			ret = elem.getAttribute( name );

			// Non-existent attributes return null, we normalize to undefined
			return ret === null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var propName, attrNames, name, isBool,
			i = 0;

		if ( value && elem.nodeType === 1 ) {

			attrNames = value.split( core_rspace );

			for ( ; i < attrNames.length; i++ ) {
				name = attrNames[ i ];

				if ( name ) {
					propName = jQuery.propFix[ name ] || name;
					isBool = rboolean.test( name );

					// See #9699 for explanation of this approach (setting first, then removal)
					// Do not do this for boolean attributes (see #10870)
					if ( !isBool ) {
						jQuery.attr( elem, name, "" );
					}
					elem.removeAttribute( getSetAttribute ? name : propName );

					// Set corresponding property to false for boolean attributes
					if ( isBool && propName in elem ) {
						elem[ propName ] = false;
					}
				}
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				// We can't allow the type property to be changed (since it causes problems in IE)
				if ( rtype.test( elem.nodeName ) && elem.parentNode ) {
					jQuery.error( "type property can't be changed" );
				} else if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to it's default in case type is set after value
					// This is for element creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		},
		// Use the value property for back compat
		// Use the nodeHook for button elements in IE6/7 (#1954)
		value: {
			get: function( elem, name ) {
				if ( nodeHook && jQuery.nodeName( elem, "button" ) ) {
					return nodeHook.get( elem, name );
				}
				return name in elem ?
					elem.value :
					null;
			},
			set: function( elem, value, name ) {
				if ( nodeHook && jQuery.nodeName( elem, "button" ) ) {
					return nodeHook.set( elem, value, name );
				}
				// Does not return so that setAttribute is also used
				elem.value = value;
			}
		}
	},

	propFix: {
		tabindex: "tabIndex",
		readonly: "readOnly",
		"for": "htmlFor",
		"class": "className",
		maxlength: "maxLength",
		cellspacing: "cellSpacing",
		cellpadding: "cellPadding",
		rowspan: "rowSpan",
		colspan: "colSpan",
		usemap: "useMap",
		frameborder: "frameBorder",
		contenteditable: "contentEditable"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				return ( elem[ name ] = value );
			}

		} else {
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
				return ret;

			} else {
				return elem[ name ];
			}
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				var attributeNode = elem.getAttributeNode("tabindex");

				return attributeNode && attributeNode.specified ?
					parseInt( attributeNode.value, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						undefined;
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	get: function( elem, name ) {
		// Align boolean attributes with corresponding properties
		// Fall back to attribute presence where some booleans are not supported
		var attrNode,
			property = jQuery.prop( elem, name );
		return property === true || typeof property !== "boolean" && ( attrNode = elem.getAttributeNode(name) ) && attrNode.nodeValue !== false ?
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

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	fixSpecified = {
		name: true,
		id: true,
		coords: true
	};

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret;
			ret = elem.getAttributeNode( name );
			return ret && ( fixSpecified[ name ] ? ret.value !== "" : ret.specified ) ?
				ret.value :
				undefined;
		},
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				ret = document.createAttribute( name );
				elem.setAttributeNode( ret );
			}
			return ( ret.value = value + "" );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		});
	});

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		get: nodeHook.get,
		set: function( elem, value, name ) {
			if ( value === "" ) {
				value = "false";
			}
			nodeHook.set( elem, value, name );
		}
	};
}


// Some attributes require a special call on IE
if ( !jQuery.support.hrefNormalized ) {
	jQuery.each([ "href", "src", "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			get: function( elem ) {
				var ret = elem.getAttribute( name, 2 );
				return ret === null ? undefined : ret;
			}
		});
	});
}

if ( !jQuery.support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Normalize to lowercase since IE uppercases css property names
			return elem.style.cssText.toLowerCase() || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}

// Safari mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !jQuery.support.optSelected ) {
	jQuery.propHooks.selected = jQuery.extend( jQuery.propHooks.selected, {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	});
}

// IE6/7 call enctype encoding
if ( !jQuery.support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}

// Radios and checkboxes getter/setter
if ( !jQuery.support.checkOn ) {
	jQuery.each([ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			get: function( elem ) {
				// Handle the case where in Webkit "" is returned instead of "on" if a value isn't specified
				return elem.getAttribute("value") === null ? "on" : elem.value;
			}
		};
	});
}
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = jQuery.extend( jQuery.valHooks[ this ], {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	});
});
var rformElems = /^(?:textarea|input|select)$/i,
	rtypenamespace = /^([^\.]*|)(?:\.(.+)|)$/,
	rhoverHack = /(?:^|\s)hover(\.\S+|)\b/,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	hoverHack = function( events ) {
		return jQuery.event.special.hover ? events : events.replace( rhoverHack, "mouseenter$1 mouseleave$1" );
	};

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	add: function( elem, types, handler, data, selector ) {

		var elemData, eventHandle, events,
			t, tns, type, namespaces, handleObj,
			handleObjIn, handlers, special;

		// Don't attach events to noData or text/comment nodes (allow plain objects tho)
		if ( elem.nodeType === 3 || elem.nodeType === 8 || !types || !handler || !(elemData = jQuery._data( elem )) ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		events = elemData.events;
		if ( !events ) {
			elemData.events = events = {};
		}
		eventHandle = elemData.handle;
		if ( !eventHandle ) {
			elemData.handle = eventHandle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		// jQuery(...).bind("mouseover mouseout", fn);
		types = jQuery.trim( hoverHack(types) ).split( " " );
		for ( t = 0; t < types.length; t++ ) {

			tns = rtypenamespace.exec( types[t] ) || [];
			type = tns[1];
			namespaces = ( tns[2] || "" ).split( "." ).sort();

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: tns[1],
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			handlers = events[ type ];
			if ( !handlers ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	global: {},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var t, tns, type, origType, namespaces, origCount,
			j, events, special, eventType, handleObj,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = jQuery.trim( hoverHack( types || "" ) ).split(" ");
		for ( t = 0; t < types.length; t++ ) {
			tns = rtypenamespace.exec( types[t] ) || [];
			type = origType = tns[1];
			namespaces = tns[2];

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector? special.delegateType : special.bindType ) || type;
			eventType = events[ type ] || [];
			origCount = eventType.length;
			namespaces = namespaces ? new RegExp("(^|\\.)" + namespaces.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null;

			// Remove matching events
			for ( j = 0; j < eventType.length; j++ ) {
				handleObj = eventType[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					 ( !handler || handler.guid === handleObj.guid ) &&
					 ( !namespaces || namespaces.test( handleObj.namespace ) ) &&
					 ( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					eventType.splice( j--, 1 );

					if ( handleObj.selector ) {
						eventType.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( eventType.length === 0 && origCount !== eventType.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery.removeData( elem, "events", true );
		}
	},

	// Events that are safe to short-circuit if no handlers are attached.
	// Native DOM events should not be added, they may have inline handlers.
	customEvent: {
		"getData": true,
		"setData": true,
		"changeData": true
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		// Don't do events on text and comment nodes
		if ( elem && (elem.nodeType === 3 || elem.nodeType === 8) ) {
			return;
		}

		// Event object or event type
		var cache, exclusive, i, cur, old, ontype, special, handle, eventPath, bubbleType,
			type = event.type || event,
			namespaces = [];

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "!" ) >= 0 ) {
			// Exclusive events trigger only for the exact event (no namespaces)
			type = type.slice(0, -1);
			exclusive = true;
		}

		if ( type.indexOf( "." ) >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}

		if ( (!elem || jQuery.event.customEvent[ type ]) && !jQuery.event.global[ type ] ) {
			// No jQuery handlers for this event type, and it can't have inline handlers
			return;
		}

		// Caller can pass in an Event, Object, or just an event type string
		event = typeof event === "object" ?
			// jQuery.Event object
			event[ jQuery.expando ] ? event :
			// Object literal
			new jQuery.Event( type, event ) :
			// Just the event type (string)
			new jQuery.Event( type );

		event.type = type;
		event.isTrigger = true;
		event.exclusive = exclusive;
		event.namespace = namespaces.join( "." );
		event.namespace_re = event.namespace? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
		ontype = type.indexOf( ":" ) < 0 ? "on" + type : "";

		// Handle a global trigger
		if ( !elem ) {

			// TODO: Stop taunting the data cache; remove global events and always attach to document
			cache = jQuery.cache;
			for ( i in cache ) {
				if ( cache[ i ].events && cache[ i ].events[ type ] ) {
					jQuery.event.trigger( event, data, cache[ i ].handle.elem, true );
				}
			}
			return;
		}

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data != null ? jQuery.makeArray( data ) : [];
		data.unshift( event );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		eventPath = [[ elem, special.bindType || type ]];
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			cur = rfocusMorph.test( bubbleType + type ) ? elem : elem.parentNode;
			for ( old = elem; cur; cur = cur.parentNode ) {
				eventPath.push([ cur, bubbleType ]);
				old = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( old === (elem.ownerDocument || document) ) {
				eventPath.push([ old.defaultView || old.parentWindow || window, bubbleType ]);
			}
		}

		// Fire handlers on the event path
		for ( i = 0; i < eventPath.length && !event.isPropagationStopped(); i++ ) {

			cur = eventPath[i][0];
			event.type = eventPath[i][1];

			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}
			// Note that this is a bare JS function and not a jQuery handler
			handle = ontype && cur[ ontype ];
			if ( handle && jQuery.acceptData( cur ) && handle.apply && handle.apply( cur, data ) === false ) {
				event.preventDefault();
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( elem.ownerDocument, data ) === false) &&
				!(type === "click" && jQuery.nodeName( elem, "a" )) && jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				// IE<9 dies on focus/blur to hidden element (#1486)
				if ( ontype && elem[ type ] && ((type !== "focus" && type !== "blur") || event.target.offsetWidth !== 0) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					old = elem[ ontype ];

					if ( old ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( old ) {
						elem[ ontype ] = old;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event || window.event );

		var i, j, cur, ret, selMatch, matched, matches, handleObj, sel, related,
			handlers = ( (jQuery._data( this, "events" ) || {} )[ event.type ] || []),
			delegateCount = handlers.delegateCount,
			args = core_slice.call( arguments ),
			run_all = !event.exclusive && !event.namespace,
			special = jQuery.event.special[ event.type ] || {},
			handlerQueue = [];

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers that should run if there are delegated events
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && !(event.button && event.type === "click") ) {

			for ( cur = event.target; cur != this; cur = cur.parentNode || this ) {

				// Don't process clicks (ONLY) on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					selMatch = {};
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];
						sel = handleObj.selector;

						if ( selMatch[ sel ] === undefined ) {
							selMatch[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( selMatch[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, matches: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( handlers.length > delegateCount ) {
			handlerQueue.push({ elem: this, matches: handlers.slice( delegateCount ) });
		}

		// Run delegates first; they may want to stop propagation beneath us
		for ( i = 0; i < handlerQueue.length && !event.isPropagationStopped(); i++ ) {
			matched = handlerQueue[ i ];
			event.currentTarget = matched.elem;

			for ( j = 0; j < matched.matches.length && !event.isImmediatePropagationStopped(); j++ ) {
				handleObj = matched.matches[ j ];

				// Triggered event must either 1) be non-exclusive and have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( run_all || (!event.namespace && !handleObj.namespace) || event.namespace_re && event.namespace_re.test( handleObj.namespace ) ) {

					event.data = handleObj.data;
					event.handleObj = handleObj;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						event.result = ret;
						if ( ret === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	// *** attrChange attrName relatedNode srcElement  are not normalized, non-W3C, deprecated, will be removed in 1.8 ***
	props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop,
			originalEvent = event,
			fixHook = jQuery.event.fixHooks[ event.type ] || {},
			copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = jQuery.Event( originalEvent );

		for ( i = copy.length; i; ) {
			prop = copy[ --i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Fix target property, if necessary (#1925, IE 6/7/8 & Safari2)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Target should not be a text node (#504, Safari)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328; IE6/7/8)
		event.metaKey = !!event.metaKey;

		return fixHook.filter? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},

		focus: {
			delegateType: "focusin"
		},
		blur: {
			delegateType: "focusout"
		},

		beforeunload: {
			setup: function( data, namespaces, eventHandle ) {
				// We only want to do this special case on windows
				if ( jQuery.isWindow( this ) ) {
					this.onbeforeunload = eventHandle;
				}
			},

			teardown: function( namespaces, eventHandle ) {
				if ( this.onbeforeunload === eventHandle ) {
					this.onbeforeunload = null;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{ type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

// Some plugins are using, but it's undocumented/deprecated and will be removed.
// The 1.7 special event interface should provide all the hooks needed now.
jQuery.event.handle = jQuery.event.dispatch;

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = ( src.defaultPrevented || src.returnValue === false ||
			src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

function returnFalse() {
	return false;
}
function returnTrue() {
	return true;
}

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	preventDefault: function() {
		this.isDefaultPrevented = returnTrue;

		var e = this.originalEvent;
		if ( !e ) {
			return;
		}

		// if preventDefault exists run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// otherwise set the returnValue property of the original event to false (IE)
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		this.isPropagationStopped = returnTrue;

		var e = this.originalEvent;
		if ( !e ) {
			return;
		}
		// if stopPropagation exists run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}
		// otherwise set the cancelBubble property of the original event to true (IE)
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	},
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj,
				selector = handleObj.selector;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !jQuery.support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "_submit_attached" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "_submit_attached", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !jQuery.support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "_change_attached" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "_change_attached", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !jQuery.support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler while someone wants focusin/focusout
		var attaches = 0,
			handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				if ( attaches++ === 0 ) {
					document.addEventListener( orig, handler, true );
				}
			},
			teardown: function() {
				if ( --attaches === 0 ) {
					document.removeEventListener( orig, handler, true );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) { // && selector != null
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	live: function( types, data, fn ) {
		jQuery( this.context ).on( types, this.selector, data, fn );
		return this;
	},
	die: function( types, fn ) {
		jQuery( this.context ).off( types, this.selector || "**", fn );
		return this;
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		if ( this[0] ) {
			return jQuery.event.trigger( type, data, this[0], true );
		}
	},

	toggle: function( fn ) {
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
	},

	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
});

jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		if ( fn == null ) {
			fn = data;
			data = null;
		}

		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};

	if ( rkeyEvent.test( name ) ) {
		jQuery.event.fixHooks[ name ] = jQuery.event.keyHooks;
	}

	if ( rmouseEvent.test( name ) ) {
		jQuery.event.fixHooks[ name ] = jQuery.event.mouseHooks;
	}
});
/*!
 * Sizzle CSS Selector Engine
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license
 * http://sizzlejs.com/
 */
(function( window, undefined ) {

var cachedruns,
	assertGetIdNotName,
	Expr,
	getText,
	isXML,
	contains,
	compile,
	sortOrder,
	hasDuplicate,
	outermostContext,

	baseHasDuplicate = true,
	strundefined = "undefined",

	expando = ( "sizcache" + Math.random() ).replace( ".", "" ),

	Token = String,
	document = window.document,
	docElem = document.documentElement,
	dirruns = 0,
	done = 0,
	pop = [].pop,
	push = [].push,
	slice = [].slice,
	// Use a stripped-down indexOf if a native one is unavailable
	indexOf = [].indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	// Augment a function for special use by Sizzle
	markFunction = function( fn, value ) {
		fn[ expando ] = value == null || value;
		return fn;
	},

	createCache = function() {
		var cache = {},
			keys = [];

		return markFunction(function( key, value ) {
			// Only keep the most recent entries
			if ( keys.push( key ) > Expr.cacheLength ) {
				delete cache[ keys.shift() ];
			}

			// Retrieve with (key + " ") to avoid collision with native Object.prototype properties (see Issue #157)
			return (cache[ key + " " ] = value);
		}, cache );
	},

	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),

	// Regex

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier (http://www.w3.org/TR/css3-selectors/#attribute-selectors)
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	operators = "([*^$|!~]?=)",
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	// Prefer arguments not in parens/brackets,
	//   then attribute selectors and non-pseudos (denoted by :),
	//   then anything else
	// These preferences are here to reduce the number of selectors
	//   needing tokenize in the PSEUDO preFilter
	pseudos = ":(" + characterEncoding + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + attributes + ")|[^:]|\\\\.)*|.*))\\)|)",

	// For matchExpr.POS and matchExpr.needsContext
	pos = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace +
		"*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*" ),
	rpseudo = new RegExp( pseudos ),

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,

	rnot = /^:not/,
	rsibling = /[\x20\t\r\n\f]*[+~]/,
	rendsWithNot = /:not\($/,

	rheader = /h\d/i,
	rinputs = /input|select|textarea|button/i,

	rbackslash = /\\(?!\\)/g,

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"NAME": new RegExp( "^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"POS": new RegExp( pos, "i" ),
		"CHILD": new RegExp( "^:(only|nth|first|last)-child(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		// For use in libraries implementing .is()
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|" + pos, "i" )
	},

	// Support

	// Used for testing something on an element
	assert = function( fn ) {
		var div = document.createElement("div");

		try {
			return fn( div );
		} catch (e) {
			return false;
		} finally {
			// release memory in IE
			div = null;
		}
	},

	// Check if getElementsByTagName("*") returns only elements
	assertTagNameNoComments = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	}),

	// Check if getAttribute returns normalized href attributes
	assertHrefNotNormalized = assert(function( div ) {
		div.innerHTML = "<a href='#'></a>";
		return div.firstChild && typeof div.firstChild.getAttribute !== strundefined &&
			div.firstChild.getAttribute("href") === "#";
	}),

	// Check if attributes should be retrieved by attribute nodes
	assertAttributes = assert(function( div ) {
		div.innerHTML = "<select></select>";
		var type = typeof div.lastChild.getAttribute("multiple");
		// IE8 returns a string for some attributes even when not present
		return type !== "boolean" && type !== "string";
	}),

	// Check if getElementsByClassName can be trusted
	assertUsableClassName = assert(function( div ) {
		// Opera can't find a second classname (in 9.6)
		div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
		if ( !div.getElementsByClassName || !div.getElementsByClassName("e").length ) {
			return false;
		}

		// Safari 3.2 caches class attributes and doesn't catch changes
		div.lastChild.className = "e";
		return div.getElementsByClassName("e").length === 2;
	}),

	// Check if getElementById returns elements by name
	// Check if getElementsByName privileges form controls or returns elements by ID
	assertUsableName = assert(function( div ) {
		// Inject content
		div.id = expando + 0;
		div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>";
		docElem.insertBefore( div, docElem.firstChild );

		// Test
		var pass = document.getElementsByName &&
			// buggy browsers will return fewer than the correct 2
			document.getElementsByName( expando ).length === 2 +
			// buggy browsers will return more than the correct 0
			document.getElementsByName( expando + 0 ).length;
		assertGetIdNotName = !document.getElementById( expando );

		// Cleanup
		docElem.removeChild( div );

		return pass;
	});

// If slice is not available, provide a backup
try {
	slice.call( docElem.childNodes, 0 )[0].nodeType;
} catch ( e ) {
	slice = function( i ) {
		var elem,
			results = [];
		for ( ; (elem = this[i]); i++ ) {
			results.push( elem );
		}
		return results;
	};
}

function Sizzle( selector, context, results, seed ) {
	results = results || [];
	context = context || document;
	var match, elem, xml, m,
		nodeType = context.nodeType;

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( nodeType !== 1 && nodeType !== 9 ) {
		return [];
	}

	xml = isXML( context );

	if ( !xml && !seed ) {
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, slice.call(context.getElementsByTagName( selector ), 0) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && assertUsableClassName && context.getElementsByClassName ) {
				push.apply( results, slice.call(context.getElementsByClassName( m ), 0) );
				return results;
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed, xml );
}

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	return Sizzle( expr, null, null, [ elem ] ).length > 0;
};

// Returns a function to use in pseudos for input types
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

// Returns a function to use in pseudos for buttons
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

// Returns a function to use in pseudos for positionals
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( nodeType ) {
		if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (see #11153)
			if ( typeof elem.textContent === "string" ) {
				return elem.textContent;
			} else {
				// Traverse its children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
		// Do not include comment or processing instruction nodes
	} else {

		// If no nodeType, this is expected to be an array
		for ( ; (node = elem[i]); i++ ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	}
	return ret;
};

isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

// Element contains another
contains = Sizzle.contains = docElem.contains ?
	function( a, b ) {
		var adown = a.nodeType === 9 ? a.documentElement : a,
			bup = b && b.parentNode;
		return a === bup || !!( bup && bup.nodeType === 1 && adown.contains && adown.contains(bup) );
	} :
	docElem.compareDocumentPosition ?
	function( a, b ) {
		return b && !!( a.compareDocumentPosition( b ) & 16 );
	} :
	function( a, b ) {
		while ( (b = b.parentNode) ) {
			if ( b === a ) {
				return true;
			}
		}
		return false;
	};

Sizzle.attr = function( elem, name ) {
	var val,
		xml = isXML( elem );

	if ( !xml ) {
		name = name.toLowerCase();
	}
	if ( (val = Expr.attrHandle[ name ]) ) {
		return val( elem );
	}
	if ( xml || assertAttributes ) {
		return elem.getAttribute( name );
	}
	val = elem.getAttributeNode( name );
	return val ?
		typeof elem[ name ] === "boolean" ?
			elem[ name ] ? name : null :
			val.specified ? val.value : null :
		null;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	// IE6/7 return a modified href
	attrHandle: assertHrefNotNormalized ?
		{} :
		{
			"href": function( elem ) {
				return elem.getAttribute( "href", 2 );
			},
			"type": function( elem ) {
				return elem.getAttribute("type");
			}
		},

	find: {
		"ID": assertGetIdNotName ?
			function( id, context, xml ) {
				if ( typeof context.getElementById !== strundefined && !xml ) {
					var m = context.getElementById( id );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					return m && m.parentNode ? [m] : [];
				}
			} :
			function( id, context, xml ) {
				if ( typeof context.getElementById !== strundefined && !xml ) {
					var m = context.getElementById( id );

					return m ?
						m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id").value === id ?
							[m] :
							undefined :
						[];
				}
			},

		"TAG": assertTagNameNoComments ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== strundefined ) {
					return context.getElementsByTagName( tag );
				}
			} :
			function( tag, context ) {
				var results = context.getElementsByTagName( tag );

				// Filter out possible comments
				if ( tag === "*" ) {
					var elem,
						tmp = [],
						i = 0;

					for ( ; (elem = results[i]); i++ ) {
						if ( elem.nodeType === 1 ) {
							tmp.push( elem );
						}
					}

					return tmp;
				}
				return results;
			},

		"NAME": assertUsableName && function( tag, context ) {
			if ( typeof context.getElementsByName !== strundefined ) {
				return context.getElementsByName( name );
			}
		},

		"CLASS": assertUsableClassName && function( className, context, xml ) {
			if ( typeof context.getElementsByClassName !== strundefined && !xml ) {
				return context.getElementsByClassName( className );
			}
		}
	},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( rbackslash, "" );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[4] || match[5] || "" ).replace( rbackslash, "" );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				3 xn-component of xn+y argument ([+-]?\d*n|)
				4 sign of xn-component
				5 x of xn-component
				6 sign of y-component
				7 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1] === "nth" ) {
				// nth-child requires argument
				if ( !match[2] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[3] = +( match[3] ? match[4] + (match[5] || 1) : 2 * ( match[2] === "even" || match[2] === "odd" ) );
				match[4] = +( ( match[6] + match[7] ) || match[2] === "odd" );

			// other types prohibit arguments
			} else if ( match[2] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var unquoted, excess;
			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			if ( match[3] ) {
				match[2] = match[3];
			} else if ( (unquoted = match[4]) ) {
				// Only check arguments that contain a pseudo
				if ( rpseudo.test(unquoted) &&
					// Get excess from tokenize (recursively)
					(excess = tokenize( unquoted, true )) &&
					// advance to the next closing parenthesis
					(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

					// excess is a negative index
					unquoted = unquoted.slice( 0, excess );
					match[0] = match[0].slice( 0, excess );
				}
				match[2] = unquoted;
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {
		"ID": assertGetIdNotName ?
			function( id ) {
				id = id.replace( rbackslash, "" );
				return function( elem ) {
					return elem.getAttribute("id") === id;
				};
			} :
			function( id ) {
				id = id.replace( rbackslash, "" );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
					return node && node.value === id;
				};
			},

		"TAG": function( nodeName ) {
			if ( nodeName === "*" ) {
				return function() { return true; };
			}
			nodeName = nodeName.replace( rbackslash, "" ).toLowerCase();

			return function( elem ) {
				return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
			};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ expando ][ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( elem.className || (typeof elem.getAttribute !== strundefined && elem.getAttribute("class")) || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem, context ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.substr( result.length - check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.substr( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, argument, first, last ) {

			if ( type === "nth" ) {
				return function( elem ) {
					var node, diff,
						parent = elem.parentNode;

					if ( first === 1 && last === 0 ) {
						return true;
					}

					if ( parent ) {
						diff = 0;
						for ( node = parent.firstChild; node; node = node.nextSibling ) {
							if ( node.nodeType === 1 ) {
								diff++;
								if ( elem === node ) {
									break;
								}
							}
						}
					}

					// Incorporate the offset (or cast to NaN), then check against cycle size
					diff -= last;
					return diff === first || ( diff % first === 0 && diff / first >= 0 );
				};
			}

			return function( elem ) {
				var node = elem;

				switch ( type ) {
					case "only":
					case "first":
						while ( (node = node.previousSibling) ) {
							if ( node.nodeType === 1 ) {
								return false;
							}
						}

						if ( type === "first" ) {
							return true;
						}

						node = elem;

						/* falls through */
					case "last":
						while ( (node = node.nextSibling) ) {
							if ( node.nodeType === 1 ) {
								return false;
							}
						}

						return true;
				}
			};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
			//   not comment, processing instructions, or others
			// Thanks to Diego Perini for the nodeName shortcut
			//   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
			var nodeType;
			elem = elem.firstChild;
			while ( elem ) {
				if ( elem.nodeName > "@" || (nodeType = elem.nodeType) === 3 || nodeType === 4 ) {
					return false;
				}
				elem = elem.nextSibling;
			}
			return true;
		},

		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"text": function( elem ) {
			var type, attr;
			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
			// use getAttribute instead to test this case
			return elem.nodeName.toLowerCase() === "input" &&
				(type = elem.type) === "text" &&
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === type );
		},

		// Input types
		"radio": createInputPseudo("radio"),
		"checkbox": createInputPseudo("checkbox"),
		"file": createInputPseudo("file"),
		"password": createInputPseudo("password"),
		"image": createInputPseudo("image"),

		"submit": createButtonPseudo("submit"),
		"reset": createButtonPseudo("reset"),

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"focus": function( elem ) {
			var doc = elem.ownerDocument;
			return elem === doc.activeElement && (!doc.hasFocus || doc.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		"active": function( elem ) {
			return elem === elem.ownerDocument.activeElement;
		},

		// Positional types
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			for ( var i = 0; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			for ( var i = 1; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			for ( var i = argument < 0 ? argument + length : argument; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			for ( var i = argument < 0 ? argument + length : argument; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

function siblingCheck( a, b, ret ) {
	if ( a === b ) {
		return ret;
	}

	var cur = a.nextSibling;

	while ( cur ) {
		if ( cur === b ) {
			return -1;
		}

		cur = cur.nextSibling;
	}

	return 1;
}

sortOrder = docElem.compareDocumentPosition ?
	function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		return ( !a.compareDocumentPosition || !b.compareDocumentPosition ?
			a.compareDocumentPosition :
			a.compareDocumentPosition(b) & 4
		) ? -1 : 1;
	} :
	function( a, b ) {
		// The nodes are identical, we can exit early
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// Fallback to using sourceIndex (in IE) if it's available on both nodes
		} else if ( a.sourceIndex && b.sourceIndex ) {
			return a.sourceIndex - b.sourceIndex;
		}

		var al, bl,
			ap = [],
			bp = [],
			aup = a.parentNode,
			bup = b.parentNode,
			cur = aup;

		// If the nodes are siblings (or identical) we can do a quick check
		if ( aup === bup ) {
			return siblingCheck( a, b );

		// If no parents were found then the nodes are disconnected
		} else if ( !aup ) {
			return -1;

		} else if ( !bup ) {
			return 1;
		}

		// Otherwise they're somewhere else in the tree so we need
		// to build up a full list of the parentNodes for comparison
		while ( cur ) {
			ap.unshift( cur );
			cur = cur.parentNode;
		}

		cur = bup;

		while ( cur ) {
			bp.unshift( cur );
			cur = cur.parentNode;
		}

		al = ap.length;
		bl = bp.length;

		// Start walking down the tree looking for a discrepancy
		for ( var i = 0; i < al && i < bl; i++ ) {
			if ( ap[i] !== bp[i] ) {
				return siblingCheck( ap[i], bp[i] );
			}
		}

		// We ended someplace up the tree so do a sibling check
		return i === al ?
			siblingCheck( a, bp[i], -1 ) :
			siblingCheck( ap[i], b, 1 );
	};

// Always assume the presence of duplicates if sort doesn't
// pass them to our comparison function (as in Google Chrome).
[0, 0].sort( sortOrder );
baseHasDuplicate = !hasDuplicate;

// Document sorting and removing duplicates
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		i = 1,
		j = 0;

	hasDuplicate = baseHasDuplicate;
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		for ( ; (elem = results[i]); i++ ) {
			if ( elem === results[ i - 1 ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	return results;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

function tokenize( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ expando ][ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( tokens = [] );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			tokens.push( matched = new Token( match.shift() ) );
			soFar = soFar.slice( matched.length );

			// Cast descendant combinators to space
			matched.type = match[0].replace( rtrim, " " );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {

				tokens.push( matched = new Token( match.shift() ) );
				soFar = soFar.slice( matched.length );
				matched.type = type;
				matched.matches = match;
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && combinator.dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( checkNonElements || elem.nodeType === 1  ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( !xml ) {
				var cache,
					dirkey = dirruns + " " + doneName + " ",
					cachedkey = dirkey + cachedruns;
				while ( (elem = elem[ dir ]) ) {
					if ( checkNonElements || elem.nodeType === 1 ) {
						if ( (cache = elem[ expando ]) === cachedkey ) {
							return elem.sizset;
						} else if ( typeof cache === "string" && cache.indexOf(dirkey) === 0 ) {
							if ( elem.sizset ) {
								return elem;
							}
						} else {
							elem[ expando ] = cachedkey;
							if ( matcher( elem, context, xml ) ) {
								elem.sizset = true;
								return elem;
							}
							elem.sizset = false;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( checkNonElements || elem.nodeType === 1 ) {
						if ( matcher( elem, context, xml ) ) {
							return elem;
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator( elementMatcher( matchers ), matcher ) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && tokens.slice( 0, i - 1 ).join("").replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && tokens.join("")
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, expandContext ) {
			var elem, j, matcher,
				setMatched = [],
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				outermost = expandContext != null,
				contextBackup = outermostContext,
				// We must always have either seed elements or context
				elems = seed || byElement && Expr.find["TAG"]( "*", expandContext && context.parentNode || context ),
				// Nested matchers should use non-integer dirruns
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.E);

			if ( outermost ) {
				outermostContext = context !== document && context;
				cachedruns = superMatcher.el;
			}

			// Add elements passing elementMatchers directly to results
			for ( ; (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					for ( j = 0; (matcher = elementMatchers[j]); j++ ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
						cachedruns = ++superMatcher.el;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				for ( j = 0; (matcher = setMatchers[j]); j++ ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	superMatcher.el = 0;
	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ expando ][ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !group ) {
			group = tokenize( selector );
		}
		i = group.length;
		while ( i-- ) {
			cached = matcherFromTokens( group[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	}
	return cached;
};

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function select( selector, context, results, seed, xml ) {
	var i, tokens, token, type, find,
		match = tokenize( selector ),
		j = match.length;

	if ( !seed ) {
		// Try to minimize operations if there is only one group
		if ( match.length === 1 ) {

			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					context.nodeType === 9 && !xml &&
					Expr.relative[ tokens[1].type ] ) {

				context = Expr.find["ID"]( token.matches[0].replace( rbackslash, "" ), context, xml )[0];
				if ( !context ) {
					return results;
				}

				selector = selector.slice( tokens.shift().length );
			}

			// Fetch a seed set for right-to-left matching
			for ( i = matchExpr["POS"].test( selector ) ? -1 : tokens.length - 1; i >= 0; i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( rbackslash, "" ),
						rsibling.test( tokens[0].type ) && context.parentNode || context,
						xml
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && tokens.join("");
						if ( !selector ) {
							push.apply( results, slice.call( seed, 0 ) );
							return results;
						}

						break;
					}
				}
			}
		}
	}

	// Compile and execute a filtering function
	// Provide `match` to avoid retokenization if we modified the selector above
	compile( selector, match )(
		seed,
		context,
		xml,
		results,
		rsibling.test( selector )
	);
	return results;
}

if ( document.querySelectorAll ) {
	(function() {
		var disconnectedMatch,
			oldSelect = select,
			rescape = /'|\\/g,
			rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,

			// qSa(:focus) reports false when true (Chrome 21), no need to also add to buggyMatches since matches checks buggyQSA
			// A support test would require too much code (would include document ready)
			rbuggyQSA = [ ":focus" ],

			// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
			// A support test would require too much code (would include document ready)
			// just skip matchesSelector for :active
			rbuggyMatches = [ ":active" ],
			matches = docElem.matchesSelector ||
				docElem.mozMatchesSelector ||
				docElem.webkitMatchesSelector ||
				docElem.oMatchesSelector ||
				docElem.msMatchesSelector;

		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explictly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select><option selected=''></option></select>";

			// IE8 - Some boolean attributes are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here (do not put tests after this one)
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {

			// Opera 10-12/IE9 - ^= $= *= and empty values
			// Should not select anything
			div.innerHTML = "<p test=''></p>";
			if ( div.querySelectorAll("[test^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:\"\"|'')" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here (do not put tests after this one)
			div.innerHTML = "<input type='hidden'/>";
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push(":enabled", ":disabled");
			}
		});

		// rbuggyQSA always contains :focus, so no need for a length check
		rbuggyQSA = /* rbuggyQSA.length && */ new RegExp( rbuggyQSA.join("|") );

		select = function( selector, context, results, seed, xml ) {
			// Only use querySelectorAll when not filtering,
			// when this is not xml,
			// and when no QSA bugs apply
			if ( !seed && !xml && !rbuggyQSA.test( selector ) ) {
				var groups, i,
					old = true,
					nid = expando,
					newContext = context,
					newSelector = context.nodeType === 9 && selector;

				// qSA works strangely on Element-rooted queries
				// We can work around this by specifying an extra ID on the root
				// and working up from there (Thanks to Andrew Dupont for the technique)
				// IE 8 doesn't work on object elements
				if ( context.nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
					groups = tokenize( selector );

					if ( (old = context.getAttribute("id")) ) {
						nid = old.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", nid );
					}
					nid = "[id='" + nid + "'] ";

					i = groups.length;
					while ( i-- ) {
						groups[i] = nid + groups[i].join("");
					}
					newContext = rsibling.test( selector ) && context.parentNode || context;
					newSelector = groups.join(",");
				}

				if ( newSelector ) {
					try {
						push.apply( results, slice.call( newContext.querySelectorAll(
							newSelector
						), 0 ) );
						return results;
					} catch(qsaError) {
					} finally {
						if ( !old ) {
							context.removeAttribute("id");
						}
					}
				}
			}

			return oldSelect( selector, context, results, seed, xml );
		};

		if ( matches ) {
			assert(function( div ) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				disconnectedMatch = matches.call( div, "div" );

				// This should fail with an exception
				// Gecko does not error, returns false instead
				try {
					matches.call( div, "[test!='']:sizzle" );
					rbuggyMatches.push( "!=", pseudos );
				} catch ( e ) {}
			});

			// rbuggyMatches always contains :active and :focus, so no need for a length check
			rbuggyMatches = /* rbuggyMatches.length && */ new RegExp( rbuggyMatches.join("|") );

			Sizzle.matchesSelector = function( elem, expr ) {
				// Make sure that attribute selectors are quoted
				expr = expr.replace( rattributeQuotes, "='$1']" );

				// rbuggyMatches always contains :active, so no need for an existence check
				if ( !isXML( elem ) && !rbuggyMatches.test( expr ) && !rbuggyQSA.test( expr ) ) {
					try {
						var ret = matches.call( elem, expr );

						// IE 9's matchesSelector returns false on disconnected nodes
						if ( ret || disconnectedMatch ||
								// As well, disconnected nodes are said to be in a document
								// fragment in IE 9
								elem.document && elem.document.nodeType !== 11 ) {
							return ret;
						}
					} catch(e) {}
				}

				return Sizzle( expr, null, null, [ elem ] ).length > 0;
			};
		}
	})();
}

// Deprecated
Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Back-compat
function setFilters() {}
Expr.filters = setFilters.prototype = Expr.pseudos;
Expr.setFilters = new setFilters();

// Override sizzle attribute retrieval
Sizzle.attr = jQuery.attr;
jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


})( window );
var runtil = /Until$/,
	rparentsprev = /^(?:parents|prev(?:Until|All))/,
	isSimple = /^.[^:#\[\.,]*$/,
	rneedsContext = jQuery.expr.match.needsContext,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend({
	find: function( selector ) {
		var i, l, length, n, r, ret,
			self = this;

		if ( typeof selector !== "string" ) {
			return jQuery( selector ).filter(function() {
				for ( i = 0, l = self.length; i < l; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			});
		}

		ret = this.pushStack( "", "find", selector );

		for ( i = 0, l = this.length; i < l; i++ ) {
			length = ret.length;
			jQuery.find( selector, this[i], ret );

			if ( i > 0 ) {
				// Make sure that the results are unique
				for ( n = length; n < ret.length; n++ ) {
					for ( r = 0; r < length; r++ ) {
						if ( ret[r] === ret[n] ) {
							ret.splice(n--, 1);
							break;
						}
					}
				}
			}
		}

		return ret;
	},

	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	not: function( selector ) {
		return this.pushStack( winnow(this, selector, false), "not", selector);
	},

	filter: function( selector ) {
		return this.pushStack( winnow(this, selector, true), "filter", selector );
	},

	is: function( selector ) {
		return !!selector && (
			typeof selector === "string" ?
				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				rneedsContext.test( selector ) ?
					jQuery( selector, this.context ).index( this[0] ) >= 0 :
					jQuery.filter( selector, this ).length > 0 :
				this.filter( selector ).length > 0 );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			ret = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			cur = this[i];

			while ( cur && cur.ownerDocument && cur !== context && cur.nodeType !== 11 ) {
				if ( pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors) ) {
					ret.push( cur );
					break;
				}
				cur = cur.parentNode;
			}
		}

		ret = ret.length > 1 ? jQuery.unique( ret ) : ret;

		return this.pushStack( ret, "closest", selectors );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		var set = typeof selector === "string" ?
				jQuery( selector, context ) :
				jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
			all = jQuery.merge( this.get(), set );

		return this.pushStack( isDisconnected( set[0] ) || isDisconnected( all[0] ) ?
			all :
			jQuery.unique( all ) );
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

jQuery.fn.andSelf = jQuery.fn.addBack;

// A painfully simple check to see if an element is disconnected
// from a document (should be improved, where feasible).
function isDisconnected( node ) {
	return !node || !node.parentNode || node.parentNode.nodeType === 11;
}

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( !runtil.test( name ) ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		ret = this.length > 1 && !guaranteedUnique[ name ] ? jQuery.unique( ret ) : ret;

		if ( this.length > 1 && rparentsprev.test( name ) ) {
			ret = ret.reverse();
		}

		return this.pushStack( ret, name, core_slice.call( arguments ).join(",") );
	};
});

jQuery.extend({
	filter: function( expr, elems, not ) {
		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 ?
			jQuery.find.matchesSelector(elems[0], expr) ? [ elems[0] ] : [] :
			jQuery.find.matches(expr, elems);
	},

	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, keep ) {

	// Can't pass null or undefined to indexOf in Firefox 4
	// Set to 0 to skip string check
	qualifier = qualifier || 0;

	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep(elements, function( elem, i ) {
			var retVal = !!qualifier.call( elem, i, elem );
			return retVal === keep;
		});

	} else if ( qualifier.nodeType ) {
		return jQuery.grep(elements, function( elem, i ) {
			return ( elem === qualifier ) === keep;
		});

	} else if ( typeof qualifier === "string" ) {
		var filtered = jQuery.grep(elements, function( elem ) {
			return elem.nodeType === 1;
		});

		if ( isSimple.test( qualifier ) ) {
			return jQuery.filter(qualifier, filtered, !keep);
		} else {
			qualifier = jQuery.filter( qualifier, filtered );
		}
	}

	return jQuery.grep(elements, function( elem, i ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) === keep;
	});
}
function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
	safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	rnocache = /<(?:script|object|embed|option|style)/i,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rcheckableType = /^(?:checkbox|radio)$/,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /\/(java|ecma)script/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		area: [ 1, "<map>", "</map>" ],
		_default: [ 0, "", "" ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
// unless wrapped in a div with non-breaking characters in front of it.
if ( !jQuery.support.htmlSerialize ) {
	wrapMap._default = [ 1, "X<div>", "</div>" ];
}

jQuery.fn.extend({
	text: function( value ) {
		return jQuery.access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	},

	append: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 ) {
				this.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 ) {
				this.insertBefore( elem, this.firstChild );
			}
		});
	},

	before: function() {
		if ( !isDisconnected( this[0] ) ) {
			return this.domManip(arguments, false, function( elem ) {
				this.parentNode.insertBefore( elem, this );
			});
		}

		if ( arguments.length ) {
			var set = jQuery.clean( arguments );
			return this.pushStack( jQuery.merge( set, this ), "before", this.selector );
		}
	},

	after: function() {
		if ( !isDisconnected( this[0] ) ) {
			return this.domManip(arguments, false, function( elem ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			});
		}

		if ( arguments.length ) {
			var set = jQuery.clean( arguments );
			return this.pushStack( jQuery.merge( this, set ), "after", this.selector );
		}
	},

	// keepData is for internal use only--do not document
	remove: function( selector, keepData ) {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( !selector || jQuery.filter( selector, [ elem ] ).length ) {
				if ( !keepData && elem.nodeType === 1 ) {
					jQuery.cleanData( elem.getElementsByTagName("*") );
					jQuery.cleanData( [ elem ] );
				}

				if ( elem.parentNode ) {
					elem.parentNode.removeChild( elem );
				}
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( elem.getElementsByTagName("*") );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function () {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return jQuery.access( this, function( value ) {
			var elem = this[0] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( jQuery.support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || ["", ""] )[1].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( elem.getElementsByTagName( "*" ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function( value ) {
		if ( !isDisconnected( this[0] ) ) {
			// Make sure that the elements are removed from the DOM before they are inserted
			// this can help fix replacing a parent with child elements
			if ( jQuery.isFunction( value ) ) {
				return this.each(function(i) {
					var self = jQuery(this), old = self.html();
					self.replaceWith( value.call( this, i, old ) );
				});
			}

			if ( typeof value !== "string" ) {
				value = jQuery( value ).detach();
			}

			return this.each(function() {
				var next = this.nextSibling,
					parent = this.parentNode;

				jQuery( this ).remove();

				if ( next ) {
					jQuery(next).before( value );
				} else {
					jQuery(parent).append( value );
				}
			});
		}

		return this.length ?
			this.pushStack( jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value ) :
			this;
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, table, callback ) {

		// Flatten any nested arrays
		args = [].concat.apply( [], args );

		var results, first, fragment, iNoClone,
			i = 0,
			value = args[0],
			scripts = [],
			l = this.length;

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( !jQuery.support.checkClone && l > 1 && typeof value === "string" && rchecked.test( value ) ) {
			return this.each(function() {
				jQuery(this).domManip( args, table, callback );
			});
		}

		if ( jQuery.isFunction(value) ) {
			return this.each(function(i) {
				var self = jQuery(this);
				args[0] = value.call( this, i, table ? self.html() : undefined );
				self.domManip( args, table, callback );
			});
		}

		if ( this[0] ) {
			results = jQuery.buildFragment( args, this, scripts );
			fragment = results.fragment;
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				table = table && jQuery.nodeName( first, "tr" );

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				// Fragments from the fragment cache must always be cloned and never used in place.
				for ( iNoClone = results.cacheable || l - 1; i < l; i++ ) {
					callback.call(
						table && jQuery.nodeName( this[i], "table" ) ?
							findOrAppend( this[i], "tbody" ) :
							this[i],
						i === iNoClone ?
							fragment :
							jQuery.clone( fragment, true, true )
					);
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;

			if ( scripts.length ) {
				jQuery.each( scripts, function( i, elem ) {
					if ( elem.src ) {
						if ( jQuery.ajax ) {
							jQuery.ajax({
								url: elem.src,
								type: "GET",
								dataType: "script",
								async: false,
								global: false,
								"throws": true
							});
						} else {
							jQuery.error("no ajax");
						}
					} else {
						jQuery.globalEval( ( elem.text || elem.textContent || elem.innerHTML || "" ).replace( rcleanScript, "" ) );
					}

					if ( elem.parentNode ) {
						elem.parentNode.removeChild( elem );
					}
				});
			}
		}

		return this;
	}
});

function findOrAppend( elem, tag ) {
	return elem.getElementsByTagName( tag )[0] || elem.appendChild( elem.ownerDocument.createElement( tag ) );
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function cloneFixAttributes( src, dest ) {
	var nodeName;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	// clearAttributes removes the attributes, which we don't want,
	// but also removes the attachEvent events, which we *do* want
	if ( dest.clearAttributes ) {
		dest.clearAttributes();
	}

	// mergeAttributes, in contrast, only merges back on the
	// original attributes, not the events
	if ( dest.mergeAttributes ) {
		dest.mergeAttributes( src );
	}

	nodeName = dest.nodeName.toLowerCase();

	if ( nodeName === "object" ) {
		// IE6-10 improperly clones children of object elements using classid.
		// IE10 throws NoModificationAllowedError if parent is null, #12132.
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( jQuery.support.html5Clone && (src.innerHTML && !jQuery.trim(dest.innerHTML)) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;

	// IE blanks contents when cloning scripts
	} else if ( nodeName === "script" && dest.text !== src.text ) {
		dest.text = src.text;
	}

	// Event data gets referenced instead of copied if the expando
	// gets copied too
	dest.removeAttribute( jQuery.expando );
}

jQuery.buildFragment = function( args, context, scripts ) {
	var fragment, cacheable, cachehit,
		first = args[ 0 ];

	// Set context from what may come in as undefined or a jQuery collection or a node
	// Updated to fix #12266 where accessing context[0] could throw an exception in IE9/10 &
	// also doubles as fix for #8950 where plain objects caused createDocumentFragment exception
	context = context || document;
	context = !context.nodeType && context[0] || context;
	context = context.ownerDocument || context;

	// Only cache "small" (1/2 KB) HTML strings that are associated with the main document
	// Cloning options loses the selected state, so don't cache them
	// IE 6 doesn't like it when you put <object> or <embed> elements in a fragment
	// Also, WebKit does not clone 'checked' attributes on cloneNode, so don't cache
	// Lastly, IE6,7,8 will not correctly reuse cached fragments that were created from unknown elems #10501
	if ( args.length === 1 && typeof first === "string" && first.length < 512 && context === document &&
		first.charAt(0) === "<" && !rnocache.test( first ) &&
		(jQuery.support.checkClone || !rchecked.test( first )) &&
		(jQuery.support.html5Clone || !rnoshimcache.test( first )) ) {

		// Mark cacheable and look for a hit
		cacheable = true;
		fragment = jQuery.fragments[ first ];
		cachehit = fragment !== undefined;
	}

	if ( !fragment ) {
		fragment = context.createDocumentFragment();
		jQuery.clean( args, context, fragment, scripts );

		// Update the cache, but only store false
		// unless this is a second parsing of the same content
		if ( cacheable ) {
			jQuery.fragments[ first ] = cachehit && fragment;
		}
	}

	return { fragment: fragment, cacheable: cacheable };
};

jQuery.fragments = {};

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			l = insert.length,
			parent = this.length === 1 && this[0].parentNode;

		if ( (parent == null || parent && parent.nodeType === 11 && parent.childNodes.length === 1) && l === 1 ) {
			insert[ original ]( this[0] );
			return this;
		} else {
			for ( ; i < l; i++ ) {
				elems = ( i > 0 ? this.clone(true) : this ).get();
				jQuery( insert[i] )[ original ]( elems );
				ret = ret.concat( elems );
			}

			return this.pushStack( ret, name, insert.selector );
		}
	};
});

function getAll( elem ) {
	if ( typeof elem.getElementsByTagName !== "undefined" ) {
		return elem.getElementsByTagName( "*" );

	} else if ( typeof elem.querySelectorAll !== "undefined" ) {
		return elem.querySelectorAll( "*" );

	} else {
		return [];
	}
}

// Used in clean, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var srcElements,
			destElements,
			i,
			clone;

		if ( jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {
			// IE copies events bound via attachEvent when using cloneNode.
			// Calling detachEvent on the clone will also remove the events
			// from the original. In order to get around this, we use some
			// proprietary methods to clear the events. Thanks to MooTools
			// guys for this hotness.

			cloneFixAttributes( elem, clone );

			// Using Sizzle here is crazy slow, so we use getElementsByTagName instead
			srcElements = getAll( elem );
			destElements = getAll( clone );

			// Weird iteration because IE will replace the length property
			// with an element if you are cloning the body and one of the
			// elements on the page has a name or id of "length"
			for ( i = 0; srcElements[i]; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					cloneFixAttributes( srcElements[i], destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			cloneCopyEvent( elem, clone );

			if ( deepDataAndEvents ) {
				srcElements = getAll( elem );
				destElements = getAll( clone );

				for ( i = 0; srcElements[i]; ++i ) {
					cloneCopyEvent( srcElements[i], destElements[i] );
				}
			}
		}

		srcElements = destElements = null;

		// Return the cloned set
		return clone;
	},

	clean: function( elems, context, fragment, scripts ) {
		var i, j, elem, tag, wrap, depth, div, hasBody, tbody, len, handleScript, jsTags,
			safe = context === document && safeFragment,
			ret = [];

		// Ensure that context is a document
		if ( !context || typeof context.createDocumentFragment === "undefined" ) {
			context = document;
		}

		// Use the already-created safe fragment if context permits
		for ( i = 0; (elem = elems[i]) != null; i++ ) {
			if ( typeof elem === "number" ) {
				elem += "";
			}

			if ( !elem ) {
				continue;
			}

			// Convert html string into DOM nodes
			if ( typeof elem === "string" ) {
				if ( !rhtml.test( elem ) ) {
					elem = context.createTextNode( elem );
				} else {
					// Ensure a safe container in which to render the html
					safe = safe || createSafeFragment( context );
					div = context.createElement("div");
					safe.appendChild( div );

					// Fix "XHTML"-style tags in all browsers
					elem = elem.replace(rxhtmlTag, "<$1></$2>");

					// Go to html and back, then peel off extra wrappers
					tag = ( rtagName.exec( elem ) || ["", ""] )[1].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					depth = wrap[0];
					div.innerHTML = wrap[1] + elem + wrap[2];

					// Move to the right depth
					while ( depth-- ) {
						div = div.lastChild;
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !jQuery.support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						hasBody = rtbody.test(elem);
							tbody = tag === "table" && !hasBody ?
								div.firstChild && div.firstChild.childNodes :

								// String was a bare <thead> or <tfoot>
								wrap[1] === "<table>" && !hasBody ?
									div.childNodes :
									[];

						for ( j = tbody.length - 1; j >= 0 ; --j ) {
							if ( jQuery.nodeName( tbody[ j ], "tbody" ) && !tbody[ j ].childNodes.length ) {
								tbody[ j ].parentNode.removeChild( tbody[ j ] );
							}
						}
					}

					// IE completely kills leading whitespace when innerHTML is used
					if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						div.insertBefore( context.createTextNode( rleadingWhitespace.exec(elem)[0] ), div.firstChild );
					}

					elem = div.childNodes;

					// Take out of fragment container (we need a fresh div each time)
					div.parentNode.removeChild( div );
				}
			}

			if ( elem.nodeType ) {
				ret.push( elem );
			} else {
				jQuery.merge( ret, elem );
			}
		}

		// Fix #11356: Clear elements from safeFragment
		if ( div ) {
			elem = div = safe = null;
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !jQuery.support.appendChecked ) {
			for ( i = 0; (elem = ret[i]) != null; i++ ) {
				if ( jQuery.nodeName( elem, "input" ) ) {
					fixDefaultChecked( elem );
				} else if ( typeof elem.getElementsByTagName !== "undefined" ) {
					jQuery.grep( elem.getElementsByTagName("input"), fixDefaultChecked );
				}
			}
		}

		// Append elements to a provided document fragment
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
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var data, id, elem, type,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = jQuery.support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( elem.removeAttribute ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						jQuery.deletedIds.push( id );
					}
				}
			}
		}
	}
});
// Limit scope pollution from any deprecated API
(function() {

var matched, browser;

// Use of jQuery.browser is frowned upon.
// More details: http://api.jquery.com/jQuery.browser
// jQuery.uaMatch maintained for back-compat
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
	return jQuerySub;
};

})();
var curCSS, iframe, iframeDoc,
	ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity=([^)]*)/,
	rposition = /^(top|right|bottom|left)$/,
	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rmargin = /^margin/,
	rnumsplit = new RegExp( "^(" + core_pnum + ")(.*)$", "i" ),
	rnumnonpx = new RegExp( "^(" + core_pnum + ")(?!px)[a-z%]+$", "i" ),
	rrelNum = new RegExp( "^([-+])=(" + core_pnum + ")", "i" ),
	elemdisplay = { BODY: "block" },

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: 0,
		fontWeight: 400
	},

	cssExpand = [ "Top", "Right", "Bottom", "Left" ],
	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],

	eventsToggle = jQuery.fn.toggle;

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function isHidden( elem, el ) {
	elem = el || elem;
	return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
}

function showHide( elements, show ) {
	var elem, display,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		values[ index ] = jQuery._data( elem, "olddisplay" );
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && elem.style.display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", css_defaultDisplay(elem.nodeName) );
			}
		} else {
			display = curCSS( elem, "display" );

			if ( !values[ index ] && display !== "none" ) {
				jQuery._data( elem, "olddisplay", display );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.fn.extend({
	css: function( name, value ) {
		return jQuery.access( this, function( elem, name, value ) {
			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state, fn2 ) {
		var bool = typeof state === "boolean";

		if ( jQuery.isFunction( state ) && jQuery.isFunction( fn2 ) ) {
			return eventsToggle.apply( this, arguments );
		}

		return this.each(function() {
			if ( bool ? state : isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;

				}
			}
		}
	},

	// Exclude the following css properties to add px
	cssNumber: {
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that NaN and null values aren't set. See: #7116
			if ( value == null || type === "number" && isNaN( value ) ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				// Wrapped to prevent IE from throwing errors when 'invalid' values are provided
				// Fixes bug #5509
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, numeric, extra ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( numeric || extra !== undefined ) {
			num = parseFloat( val );
			return numeric || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	},

	// A method for quickly swapping in/out CSS properties to get correct calculations
	swap: function( elem, options, callback ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.call( elem );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	}
});

// NOTE: To any future maintainer, we've window.getComputedStyle
// because jsdom on node.js will break without it.
if ( window.getComputedStyle ) {
	curCSS = function( elem, name ) {
		var ret, width, minWidth, maxWidth,
			computed = window.getComputedStyle( elem, null ),
			style = elem.style;

		if ( computed ) {

			// getPropertyValue is only needed for .css('filter') in IE9, see #12537
			ret = computed.getPropertyValue( name ) || computed[ name ];

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret;
	};
} else if ( document.documentElement.currentStyle ) {
	curCSS = function( elem, name ) {
		var left, rsLeft,
			ret = elem.currentStyle && elem.currentStyle[ name ],
			style = elem.style;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rsLeft = elem.runtimeStyle && elem.runtimeStyle.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				elem.runtimeStyle.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				elem.runtimeStyle.left = rsLeft;
			}
		}

		return ret === "" ? "auto" : ret;
	};
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
			Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
			value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			// we use jQuery.css instead of curCSS here
			// because of the reliableMarginRight CSS hook!
			val += jQuery.css( elem, extra + cssExpand[ i ], true );
		}

		// From this point on we use curCSS for maximum performance (relevant in animations)
		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= parseFloat( curCSS( elem, "padding" + cssExpand[ i ] ) ) || 0;
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= parseFloat( curCSS( elem, "border" + cssExpand[ i ] + "Width" ) ) || 0;
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += parseFloat( curCSS( elem, "padding" + cssExpand[ i ] ) ) || 0;

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += parseFloat( curCSS( elem, "border" + cssExpand[ i ] + "Width" ) ) || 0;
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		valueIsBorderBox = true,
		isBorderBox = jQuery.support.boxSizing && jQuery.css( elem, "boxSizing" ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( jQuery.support.boxSizingReliable || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox
		)
	) + "px";
}


// Try to determine the default display value of an element
function css_defaultDisplay( nodeName ) {
	if ( elemdisplay[ nodeName ] ) {
		return elemdisplay[ nodeName ];
	}

	var elem = jQuery( "<" + nodeName + ">" ).appendTo( document.body ),
		display = elem.css("display");
	elem.remove();

	// If the simple way fails,
	// get element's real default display by attaching it to a temp iframe
	if ( display === "none" || display === "" ) {
		// Use the already-created iframe if possible
		iframe = document.body.appendChild(
			iframe || jQuery.extend( document.createElement("iframe"), {
				frameBorder: 0,
				width: 0,
				height: 0
			})
		);

		// Create a cacheable copy of the iframe document on first call.
		// IE and Opera will allow us to reuse the iframeDoc without re-writing the fake HTML
		// document to it; WebKit & Firefox won't allow reusing the iframe document.
		if ( !iframeDoc || !iframe.createElement ) {
			iframeDoc = ( iframe.contentWindow || iframe.contentDocument ).document;
			iframeDoc.write("<!doctype html><html><body>");
			iframeDoc.close();
		}

		elem = iframeDoc.body.appendChild( iframeDoc.createElement(nodeName) );

		display = curCSS( elem, "display" );
		document.body.removeChild( iframe );
	}

	// Store the correct default display
	elemdisplay[ nodeName ] = display;

	return display;
}

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				if ( elem.offsetWidth === 0 && rdisplayswap.test( curCSS( elem, "display" ) ) ) {
					return jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					});
				} else {
					return getWidthOrHeight( elem, name, extra );
				}
			}
		},

		set: function( elem, value, extra ) {
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.support.boxSizing && jQuery.css( elem, "boxSizing" ) === "border-box"
				) : 0
			);
		}
	};
});

if ( !jQuery.support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			if ( value >= 1 && jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
				style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there there is no filter style applied in a css rule, we are done
				if ( currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

// These hooks cannot be added until DOM ready because the support test
// for it is not run until after DOM ready
jQuery(function() {
	if ( !jQuery.support.reliableMarginRight ) {
		jQuery.cssHooks.marginRight = {
			get: function( elem, computed ) {
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// Work around by temporarily setting element display to inline-block
				return jQuery.swap( elem, { "display": "inline-block" }, function() {
					if ( computed ) {
						return curCSS( elem, "marginRight" );
					}
				});
			}
		};
	}

	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// getComputedStyle returns percent when specified for top/left/bottom/right
	// rather than make the css module depend on the offset module, we just check for it here
	if ( !jQuery.support.pixelPosition && jQuery.fn.position ) {
		jQuery.each( [ "top", "left" ], function( i, prop ) {
			jQuery.cssHooks[ prop ] = {
				get: function( elem, computed ) {
					if ( computed ) {
						var ret = curCSS( elem, prop );
						// if curCSS returns percentage, fallback to offset
						return rnumnonpx.test( ret ) ? jQuery( elem ).position()[ prop ] + "px" : ret;
					}
				}
			};
		});
	}

});

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.hidden = function( elem ) {
		return ( elem.offsetWidth === 0 && elem.offsetHeight === 0 ) || (!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || curCSS( elem, "display" )) === "none");
	};

	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
}

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i,

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ],
				expanded = {};

			for ( i = 0; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});
var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
	rselectTextarea = /^(?:select|textarea)/i;

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function(){
			return this.elements ? jQuery.makeArray( this.elements ) : this;
		})
		.filter(function(){
			return this.name && !this.disabled &&
				( this.checked || rselectTextarea.test( this.nodeName ) ||
					rinput.test( this.type ) );
		})
		.map(function( i, elem ){
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val, i ){
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});

//Serialize an array of form elements or a set of
//key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// If array item is non-scalar (array or object), encode its
				// numeric index to resolve deserialization ambiguity issues.
				// Note that rack (as of 1.0.0) can't currently deserialize
				// nested arrays properly, and attempting to do so may cause
				// a server error. Possible fixes are to modify rack's
				// deserialization algorithm or to provide an option or flag
				// to force array serialization to be shallow.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}
var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rquery = /\?/,
	rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
	rts = /([?&])_=[^&]*/,
	rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,

	// Keep a copy of the old load method
	_load = jQuery.fn.load,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = ["*/"] + ["*"];

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType, list, placeBefore,
			dataTypes = dataTypeExpression.toLowerCase().split( core_rspace ),
			i = 0,
			length = dataTypes.length;

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			for ( ; i < length; i++ ) {
				dataType = dataTypes[ i ];
				// We control if we're asked to add before
				// any existing element
				placeBefore = /^\+/.test( dataType );
				if ( placeBefore ) {
					dataType = dataType.substr( 1 ) || "*";
				}
				list = structure[ dataType ] = structure[ dataType ] || [];
				// then we add to the structure accordingly
				list[ placeBefore ? "unshift" : "push" ]( func );
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR,
		dataType /* internal */, inspected /* internal */ ) {

	dataType = dataType || options.dataTypes[ 0 ];
	inspected = inspected || {};

	inspected[ dataType ] = true;

	var selection,
		list = structure[ dataType ],
		i = 0,
		length = list ? list.length : 0,
		executeOnly = ( structure === prefilters );

	for ( ; i < length && ( executeOnly || !selection ); i++ ) {
		selection = list[ i ]( options, originalOptions, jqXHR );
		// If we got redirected to another dataType
		// we try there if executing only and not done already
		if ( typeof selection === "string" ) {
			if ( !executeOnly || inspected[ selection ] ) {
				selection = undefined;
			} else {
				options.dataTypes.unshift( selection );
				selection = inspectPrefiltersOrTransports(
						structure, options, originalOptions, jqXHR, selection, inspected );
			}
		}
	}
	// If we're only executing or nothing was selected
	// we try the catchall dataType if not done already
	if ( ( executeOnly || !selection ) && !inspected[ "*" ] ) {
		selection = inspectPrefiltersOrTransports(
				structure, options, originalOptions, jqXHR, "*", inspected );
	}
	// unnecessary when only executing (prefilters)
	// but it'll be ignored by the caller in that case
	return selection;
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};
	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}
}

jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	// Don't do a request if no elements are being requested
	if ( !this.length ) {
		return this;
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = url.slice( off, url.length );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// Request the remote document
	jQuery.ajax({
		url: url,

		// if "type" variable is undefined, then "GET" method will be used
		type: type,
		dataType: "html",
		data: params,
		complete: function( jqXHR, status ) {
			if ( callback ) {
				self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
			}
		}
	}).done(function( responseText ) {

		// Save response for use in complete callback
		response = arguments;

		// See if a selector was specified
		self.html( selector ?

			// Create a dummy div to hold the results
			jQuery("<div>")

				// inject the contents of the document in, removing the scripts
				// to avoid any 'Permission Denied' errors in IE
				.append( responseText.replace( rscript, "" ) )

				// Locate the specified elements
				.find( selector ) :

			// If not, just inject the full result
			responseText );

	});

	return this;
};

// Attach a bunch of functions for handling common AJAX events
jQuery.each( "ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split( " " ), function( i, o ){
	jQuery.fn[ o ] = function( f ){
		return this.on( o, f );
	};
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			type: method,
			url: url,
			data: data,
			success: callback,
			dataType: type
		});
	};
});

jQuery.extend({

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		if ( settings ) {
			// Building a settings object
			ajaxExtend( target, jQuery.ajaxSettings );
		} else {
			// Extending ajaxSettings
			settings = target;
			target = jQuery.ajaxSettings;
		}
		ajaxExtend( target, settings );
		return target;
	},

	ajaxSettings: {
		url: ajaxLocation,
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		type: "GET",
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		processData: true,
		async: true,
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			xml: "application/xml, text/xml",
			html: "text/html",
			text: "text/plain",
			json: "application/json, text/javascript",
			"*": allTypes
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText"
		},

		// List of data converters
		// 1) key format is "source_type destination_type" (a single space in-between)
		// 2) the catchall symbol "*" can be used for source_type
		converters: {

			// Convert anything to text
			"* text": window.String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			context: true,
			url: true
		}
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // ifModified key
			ifModifiedKey,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// transport
			transport,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events
			// It's the callbackContext if one was provided in the options
			// and if it's a DOM node or a jQuery collection
			globalEventContext = callbackContext !== s &&
				( callbackContext.nodeType || callbackContext instanceof jQuery ) ?
						jQuery( callbackContext ) : jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {

				readyState: 0,

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( !state ) {
						var lname = name.toLowerCase();
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match === undefined ? null : match;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					statusText = statusText || strAbort;
					if ( transport ) {
						transport.abort( statusText );
					}
					done( 0, statusText );
					return this;
				}
			};

		// Callback for when everything is done
		// It is defined here because jslint complains if it is declared
		// at the end of the function (which would be more logical and readable)
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// If successful, handle type chaining
			if ( status >= 200 && status < 300 || status === 304 ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {

					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ ifModifiedKey ] = modified;
					}
					modified = jqXHR.getResponseHeader("Etag");
					if ( modified ) {
						jQuery.etag[ ifModifiedKey ] = modified;
					}
				}

				// If not modified
				if ( status === 304 ) {

					statusText = "notmodified";
					isSuccess = true;

				// If we have data
				} else {

					isSuccess = ajaxConvert( s, response );
					statusText = isSuccess.state;
					success = isSuccess.data;
					error = isSuccess.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( !statusText || status ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajax" + ( isSuccess ? "Success" : "Error" ),
						[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		// Attach deferreds
		deferred.promise( jqXHR );
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;
		jqXHR.complete = completeDeferred.add;

		// Status-dependent callbacks
		jqXHR.statusCode = function( map ) {
			if ( map ) {
				var tmp;
				if ( state < 2 ) {
					for ( tmp in map ) {
						statusCode[ tmp ] = [ statusCode[tmp], map[tmp] ];
					}
				} else {
					tmp = map[ jqXHR.status ];
					jqXHR.always( tmp );
				}
			}
			return this;
		};

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// We also use the url parameter if available
		s.url = ( ( url || s.url ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().split( core_rspace );

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? 80 : 443 ) ) !=
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? 80 : 443 ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.data;
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Get ifModifiedKey before adding the anti-cache parameter
			ifModifiedKey = s.url;

			// Add anti-cache in url if needed
			if ( s.cache === false ) {

				var ts = jQuery.now(),
					// try replacing _= if it is there
					ret = s.url.replace( rts, "$1_=" + ts );

				// if nothing was replaced, add timestamp to the end
				s.url = ret + ( ( ret === s.url ) ? ( rquery.test( s.url ) ? "&" : "?" ) + "_=" + ts : "" );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			ifModifiedKey = ifModifiedKey || s.url;
			if ( jQuery.lastModified[ ifModifiedKey ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ ifModifiedKey ] );
			}
			if ( jQuery.etag[ ifModifiedKey ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ ifModifiedKey ] );
			}
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
				// Abort if not done already and return
				return jqXHR.abort();

		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;
			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout( function(){
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch (e) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		return jqXHR;
	},

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {}

});

/* Handles responses to an ajax request:
 * - sets all responseXXX fields accordingly
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes,
		responseFields = s.responseFields;

	// Fill responseXXX fields
	for ( type in responseFields ) {
		if ( type in responses ) {
			jqXHR[ responseFields[type] ] = responses[ type ];
		}
	}

	// Remove auto dataType and get content-type in the process
	while( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "content-type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

// Chain conversions given the request and the original response
function ajaxConvert( s, response ) {

	var conv, conv2, current, tmp,
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice(),
		prev = dataTypes[ 0 ],
		converters = {},
		i = 0;

	// Apply the dataFilter if provided
	if ( s.dataFilter ) {
		response = s.dataFilter( response, s.dataType );
	}

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	// Convert to each sequential dataType, tolerating list modification
	for ( ; (current = dataTypes[++i]); ) {

		// There's only work to do if current dataType is non-auto
		if ( current !== "*" ) {

			// Convert response if prev dataType is non-auto and differs from current
			if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split(" ");
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.splice( i--, 0, current );
								}

								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s["throws"] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}

			// Update prev for next iteration
			prev = current;
		}
	}

	return { state: "success", data: response };
}
var oldCallbacks = [],
	rquestion = /\?/,
	rjsonp = /(=)\?(?=&|$)|\?\?/,
	nonce = jQuery.now();

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		data = s.data,
		url = s.url,
		hasCallback = s.jsonp !== false,
		replaceInUrl = hasCallback && rjsonp.test( url ),
		replaceInData = hasCallback && !replaceInUrl && typeof data === "string" &&
			!( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") &&
			rjsonp.test( data );

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( s.dataTypes[ 0 ] === "jsonp" || replaceInUrl || replaceInData ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;
		overwritten = window[ callbackName ];

		// Insert callback into url or form data
		if ( replaceInUrl ) {
			s.url = url.replace( rjsonp, "$1" + callbackName );
		} else if ( replaceInData ) {
			s.data = data.replace( rjsonp, "$1" + callbackName );
		} else if ( hasCallback ) {
			s.url += ( rquestion.test( url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});
// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /javascript|ecmascript/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || document.getElementsByTagName( "head" )[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = "async";

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( head && script.parentNode ) {
							head.removeChild( script );
						}

						// Dereference the script
						script = undefined;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};
				// Use insertBefore instead of appendChild  to circumvent an IE6 bug.
				// This arises when a base node is used (#2709 and #4378).
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( 0, 1 );
				}
			}
		};
	}
});
var xhrCallbacks,
	// #5280: Internet Explorer will keep connections alive if we don't abort on unload
	xhrOnUnloadAbort = window.ActiveXObject ? function() {
		// Abort all pending requests
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( 0, 1 );
		}
	} : false,
	xhrId = 0;

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}

// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject ?
	/* Microsoft failed to properly
	 * implement the XMLHttpRequest in IE7 (can't request local files),
	 * so we use the ActiveXObject when it is available
	 * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
	 * we need a fallback.
	 */
	function() {
		return !this.isLocal && createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

// Determine support properties
(function( xhr ) {
	jQuery.extend( jQuery.support, {
		ajax: !!xhr,
		cors: !!xhr && ( "withCredentials" in xhr )
	});
})( jQuery.ajaxSettings.xhr() );

// Create transport if the browser can provide an xhr
if ( jQuery.support.ajax ) {

	jQuery.ajaxTransport(function( s ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !s.crossDomain || jQuery.support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {

					// Get a new xhr
					var handle, i,
						xhr = s.xhr();

					// Open the socket
					// Passing null username, generates a login popup on Opera (#2865)
					if ( s.username ) {
						xhr.open( s.type, s.url, s.async, s.username, s.password );
					} else {
						xhr.open( s.type, s.url, s.async );
					}

					// Apply custom fields if provided
					if ( s.xhrFields ) {
						for ( i in s.xhrFields ) {
							xhr[ i ] = s.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( s.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( s.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !s.crossDomain && !headers["X-Requested-With"] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Need an extra try/catch for cross domain requests in Firefox 3
					try {
						for ( i in headers ) {
							xhr.setRequestHeader( i, headers[ i ] );
						}
					} catch( _ ) {}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( s.hasContent && s.data ) || null );

					// Listener
					callback = function( _, isAbort ) {

						var status,
							statusText,
							responseHeaders,
							responses,
							xml;

						// Firefox throws exceptions when accessing properties
						// of an xhr when a network error occurred
						// http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
						try {

							// Was never called and is aborted or complete
							if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

								// Only called once
								callback = undefined;

								// Do not keep as active anymore
								if ( handle ) {
									xhr.onreadystatechange = jQuery.noop;
									if ( xhrOnUnloadAbort ) {
										delete xhrCallbacks[ handle ];
									}
								}

								// If it's an abort
								if ( isAbort ) {
									// Abort it manually if needed
									if ( xhr.readyState !== 4 ) {
										xhr.abort();
									}
								} else {
									status = xhr.status;
									responseHeaders = xhr.getAllResponseHeaders();
									responses = {};
									xml = xhr.responseXML;

									// Construct response list
									if ( xml && xml.documentElement /* #4958 */ ) {
										responses.xml = xml;
									}

									// When requesting binary data, IE6-9 will throw an exception
									// on any attempt to access responseText (#11426)
									try {
										responses.text = xhr.responseText;
									} catch( e ) {
									}

									// Firefox throws an exception when accessing
									// statusText for faulty cross-domain requests
									try {
										statusText = xhr.statusText;
									} catch( e ) {
										// We normalize with Webkit giving an empty statusText
										statusText = "";
									}

									// Filter status for non standard behaviors

									// If the request is local and we have data: assume a success
									// (success with no data won't get notified, that's the best we
									// can do given current implementations)
									if ( !status && s.isLocal && !s.crossDomain ) {
										status = responses.text ? 200 : 404;
									// IE - #1450: sometimes returns 1223 when it should be 204
									} else if ( status === 1223 ) {
										status = 204;
									}
								}
							}
						} catch( firefoxAccessException ) {
							if ( !isAbort ) {
								complete( -1, firefoxAccessException );
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, responseHeaders );
						}
					};

					if ( !s.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback, 0 );
					} else {
						handle = ++xhrId;
						if ( xhrOnUnloadAbort ) {
							// Create the active xhrs callbacks list if needed
							// and attach the unload handler
							if ( !xhrCallbacks ) {
								xhrCallbacks = {};
								jQuery( window ).unload( xhrOnUnloadAbort );
							}
							// Add to list of active xhrs callbacks
							xhrCallbacks[ handle ] = callback;
						}
						xhr.onreadystatechange = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback(0,1);
					}
				}
			};
		}
	});
}
var fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([-+])=|)(" + core_pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [function( prop, value ) {
			var end, unit,
				tween = this.createTween( prop, value ),
				parts = rfxnum.exec( value ),
				target = tween.cur(),
				start = +target || 0,
				scale = 1,
				maxIterations = 20;

			if ( parts ) {
				end = +parts[2];
				unit = parts[3] || ( jQuery.cssNumber[ prop ] ? "" : "px" );

				// We need to compute starting value
				if ( unit !== "px" && start ) {
					// Iteratively approximate from a nonzero starting point
					// Prefer the current property, because this process will be trivial if it uses the same units
					// Fallback to end or a simple constant
					start = jQuery.css( tween.elem, prop, true ) || end || 1;

					do {
						// If previous iteration zeroed out, double until we get *something*
						// Use a string for doubling factor so we don't accidentally see scale as unchanged below
						scale = scale || ".5";

						// Adjust and apply
						start = start / scale;
						jQuery.style( tween.elem, prop, start + unit );

					// Update scale, tolerating zero or NaN from tween.cur()
					// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
					} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
				}

				tween.unit = unit;
				tween.start = start;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[1] ? start + ( parts[1] + 1 ) * end : end;
			}
			return tween;
		}]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	}, 0 );
	return ( fxNow = jQuery.now() );
}

function createTweens( animation, props ) {
	jQuery.each( props, function( prop, value ) {
		var collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( collection[ index ].call( animation, prop, value ) ) {

				// we're done with this property
				return;
			}
		}
	});
}

function Animation( elem, properties, options ) {
	var result,
		index = 0,
		tweenerIndex = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end, easing ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;

				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	createTweens( animation, props );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			anim: animation,
			queue: animation.opts.queue,
			elem: elem
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

function defaultPrefilter( elem, props, opts ) {
	var index, prop, value, length, dataShow, toggle, tween, hooks, oldfire,
		anim = this,
		style = elem.style,
		orig = {},
		handled = [],
		hidden = elem.nodeType && isHidden( elem );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		if ( jQuery.css( elem, "display" ) === "inline" &&
				jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !jQuery.support.inlineBlockNeedsLayout || css_defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";

			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !jQuery.support.shrinkWrapBlocks ) {
			anim.done(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}


	// show/hide pass
	for ( index in props ) {
		value = props[ index ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ index ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {
				continue;
			}
			handled.push( index );
		}
	}

	length = handled.length;
	if ( length ) {
		dataShow = jQuery._data( elem, "fxshow" ) || jQuery._data( elem, "fxshow", {} );
		if ( "hidden" in dataShow ) {
			hidden = dataShow.hidden;
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery.removeData( elem, "fxshow", true );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( index = 0 ; index < length ; index++ ) {
			prop = handled[ index ];
			tween = anim.createTween( prop, hidden ? dataShow[ prop ] : 0 );
			orig[ prop ] = dataShow[ prop ] || jQuery.style( elem, prop );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}
	}
}

function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing any value as a 4th parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, false, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Remove in 2.0 - this supports IE8's panic based approach
// to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ||
			// special check for .toggle( handler, handler, ... )
			( !i && jQuery.isFunction( speed ) && jQuery.isFunction( easing ) ) ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations resolve immediately
				if ( empty ) {
					anim.stop( true );
				}
			};

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	}
});

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth? 1 : 0;
	for( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p*Math.PI ) / 2;
	}
};

jQuery.timers = [];
jQuery.fx = Tween.prototype.init;
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	if ( timer() && jQuery.timers.push( timer ) && !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.interval = 13;

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};

// Back Compat <1.8 extension point
jQuery.fx.step = {};

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
}
var rroot = /^(?:body|html)$/i;

jQuery.fn.offset = function( options ) {
	if ( arguments.length ) {
		return options === undefined ?
			this :
			this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
	}

	var docElem, body, win, clientTop, clientLeft, scrollTop, scrollLeft,
		box = { top: 0, left: 0 },
		elem = this[ 0 ],
		doc = elem && elem.ownerDocument;

	if ( !doc ) {
		return;
	}

	if ( (body = doc.body) === elem ) {
		return jQuery.offset.bodyOffset( elem );
	}

	docElem = doc.documentElement;

	// Make sure it's not a disconnected DOM node
	if ( !jQuery.contains( docElem, elem ) ) {
		return box;
	}

	// If we don't have gBCR, just use 0,0 rather than error
	// BlackBerry 5, iOS 3 (original iPhone)
	if ( typeof elem.getBoundingClientRect !== "undefined" ) {
		box = elem.getBoundingClientRect();
	}
	win = getWindow( doc );
	clientTop  = docElem.clientTop  || body.clientTop  || 0;
	clientLeft = docElem.clientLeft || body.clientLeft || 0;
	scrollTop  = win.pageYOffset || docElem.scrollTop;
	scrollLeft = win.pageXOffset || docElem.scrollLeft;
	return {
		top: box.top  + scrollTop  - clientTop,
		left: box.left + scrollLeft - clientLeft
	};
};

jQuery.offset = {

	bodyOffset: function( body ) {
		var top = body.offsetTop,
			left = body.offsetLeft;

		if ( jQuery.support.doesNotIncludeMarginInBodyOffset ) {
			top  += parseFloat( jQuery.css(body, "marginTop") ) || 0;
			left += parseFloat( jQuery.css(body, "marginLeft") ) || 0;
		}

		return { top: top, left: left };
	},

	setOffset: function( elem, options, i ) {
		var position = jQuery.css( elem, "position" );

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		var curElem = jQuery( elem ),
			curOffset = curElem.offset(),
			curCSSTop = jQuery.css( elem, "top" ),
			curCSSLeft = jQuery.css( elem, "left" ),
			calculatePosition = ( position === "absolute" || position === "fixed" ) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
			props = {}, curPosition = {}, curTop, curLeft;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};


jQuery.fn.extend({

	position: function() {
		if ( !this[0] ) {
			return;
		}

		var elem = this[0],

		// Get *real* offsetParent
		offsetParent = this.offsetParent(),

		// Get correct offsets
		offset       = this.offset(),
		parentOffset = rroot.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset();

		// Subtract element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		offset.top  -= parseFloat( jQuery.css(elem, "marginTop") ) || 0;
		offset.left -= parseFloat( jQuery.css(elem, "marginLeft") ) || 0;

		// Add offsetParent borders
		parentOffset.top  += parseFloat( jQuery.css(offsetParent[0], "borderTopWidth") ) || 0;
		parentOffset.left += parseFloat( jQuery.css(offsetParent[0], "borderLeftWidth") ) || 0;

		// Subtract the two offsets
		return {
			top:  offset.top  - parentOffset.top,
			left: offset.left - parentOffset.left
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || document.body;
			while ( offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, "position") === "static") ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || document.body;
		});
	}
});


// Create scrollLeft and scrollTop methods
jQuery.each( {scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return jQuery.access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					 top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}
// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return jQuery.access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, value, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});
// Expose jQuery to the global object
window.jQuery = window.$ = jQuery;

// Expose jQuery as an AMD module, but only for AMD loaders that
// understand the issues with loading multiple versions of jQuery
// in a page that all might call define(). The loader will indicate
// they have special allowances for multiple jQuery versions by
// specifying define.amd.jQuery = true. Register as a named module,
// since jQuery can be concatenated with other files that may use define,
// but not use a proper concatenation script that understands anonymous
// AMD modules. A named AMD is safest and most robust way to register.
// Lowercase jquery is used because AMD module names are derived from
// file names, and jQuery is normally delivered in a lowercase file name.
// Do this after creating the global so that if an AMD module wants to call
// noConflict to hide this version of jQuery, it will work.
if ( typeof define === "function" && define.amd && define.amd.jQuery ) {
	define( "jquery", [], function () { return jQuery; } );
}

})( window );


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


/*! logging.js version 1.0 */
/*jslint onevar: true, undef: true, eqeqeq: true, regexp: true, newcap: true, immed: true */
/*globals jQuery, console, window */
(function($){
	if (!window.console || !console.firebug)
	{
	    var i, defn = function(){}, 
	        names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml",
	    "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];
	
	    window.console = {};
	    for (i = names.length; i--;) {
	        window.console[names[i]] = defn;
	    }
	}
	
	$.fn.log = function (msg) {
		console.log("%s: %o", msg, this); 
		return this;
	};
}(jQuery));


/*
 * switches between links for mobile and desktop for Lincoln RAD site
 * Author: York Zhang
 * file: multi-platform-links.js
 */

/*globals jQuery, ND, window */
var ND = (function(ND, $) {
	
	ND.multiPlatformLinks = function () {
	
		var element;
		
		return {

			init: function( elem ) { 

				var isIE8 = $.browser.msie && $.browser.version < 9;
				/* Check this module needs to be initalised for this page */
				if( !!isIE8 ) { return this; }
				
				// switches between links for mobile and desktop 
				var switchLinks = function() {
					$('#menu, #badge').find("a[data-hrefsmob]").each(function(index) {
						var $this = $(this);
						var	mobLink = $this.attr('data-hrefsmob');
						var	desktopLink = $this.attr('data-link');

						//console.log(mobLink);
						
						if ($(window).width() < 768) {
							$this.attr('href', mobLink);
						} else {
							$this.attr('href', desktopLink);
						}

					});
				};

				$(window).on('resize', function() {
					switchLinks();
				});
			
				switchLinks();
				
				return this;
			
			}
			

		
		
		};	
	};
	
	/* Return ND after it's been augmented */ 
	return ND;	

}(window.ND || {}, jQuery));

(function(ND, $){
	$(function($){
		
		ND.multiPlatformLinks().init();
		
	});
}(window.ND || {}, jQuery));




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


//Ford chooses to use jQuery Touchwipe and all associated files under the MIT license.
/**
 * Copyright (c) 2010 Matt Bryson* Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * jQuery Plugin to obtain touch gestures from iPhone, iPod Touch and iPad, should also work with Android mobile phones (not tested yet!)
 * Common usage: wipe images (left and right to show the previous or next image)
 * 
 * @author Andreas Waltl, netCU Internetagentur (http://www.netcu.de)
 * @version 1.1.1 (9th December 2010) - fix bug (older IE's had problems)
 * @version 1.1 (1st September 2010) - support wipe up and wipe down
 * @version 1.0 (15th July 2010)
 */
 (function($) { 
   $.fn.touchwipe = function(settings) {
     var config = {
    		min_move_x: 20,
    		min_move_y: 20,
 			wipeLeft: function() { },
 			wipeRight: function() { },
 			wipeUp: function() { },
 			wipeDown: function() { },
			preventDefaultEvents: true
	 };
     
     if (settings) $.extend(config, settings);
 
     this.each(function() {
    	 var startX;
    	 var startY;
		 var isMoving = false;

    	 function cancelTouch() {
    		 this.removeEventListener('touchmove', onTouchMove);
    		 startX = null;
    		 isMoving = false;
    	 }	
    	 
    	 function onTouchMove(e) {
    		 if(config.preventDefaultEvents) {
    			 e.preventDefault();
    		 }
    		 if(isMoving) {
	    		 var x = e.touches[0].pageX;
	    		 var y = e.touches[0].pageY;
	    		 var dx = startX - x;
	    		 var dy = startY - y;
	    		 if(Math.abs(dx) >= config.min_move_x) {
	    			cancelTouch();
	    			if(dx > 0) {
	    				config.wipeLeft();
	    			}
	    			else {
	    				config.wipeRight();
	    			}
	    		 }
	    		 else if(Math.abs(dy) >= config.min_move_y) {
		    			cancelTouch();
		    			if(dy > 0) {
		    				config.wipeDown();
		    			}
		    			else {
		    				config.wipeUp();
		    			}
		    		 }
    		 }
    	 }
    	 
    	 function onTouchStart(e)
    	 {
    		 if (e.touches.length == 1) {
    			 startX = e.touches[0].pageX;
    			 startY = e.touches[0].pageY;
    			 isMoving = true;
    			 this.addEventListener('touchmove', onTouchMove, false);
    		 }
    	 }    	 
    	 if ('ontouchstart' in document.documentElement) {
    		 this.addEventListener('touchstart', onTouchStart, false);
    	 }
     });
 
     return this;
   };
 
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


(function($, undefined){
	
	/*
	 * Overlay URL. This reproduces the URL that Facebook URL Linter creates.
	 * eg. http://developers.facebook.com/tools/lint/?url=http%3A%2F%2Fwww.ford.com.au%2Fservlet%2FSatellite%3Fc%3DDFYPage%26cid%3D1248884660596%26pagename%3DFOA%252Fcontroller%26site%3DFOA%23overlay%3D1234567890BD
	 */
	function overlayURL( url, assetid ) {
		url = url || "";
		return escape(url.split('#')[0] + '#overlay=' + assetid).replace("\/", "%2F", "g")			
	}
	
	/*
	 * Overlay Object.
	 */
	var Overlay = function (list, text, rtl) {
		var overlay = this,
			positionNameXaxis = rtl ? 'left' : 'right',
			cacheStore = {};
			cacheStore.identifier = [];//to store the class name of those 360 images which have been already loaded
		
		overlay.container;
		overlay.text = text || {close: "Close",of: "of",prev: "Previous",next: "Next",loading: "Loading Content...",error: "There seems to be a problem."};
		overlay.list = list;
		overlay.fadeSpeed = 200;
		overlay.timeout = 8000;
		overlay.view360Class = "view-360";
		overlay.lightClass = "overlay-light";
		overlay.disclaimerClass = "external-disclaimer";
		
		overlay.init = function (curElem) {
			overlay.prepareBannerModes(curElem);			
			overlay.injectContainer();
			overlay.injectControls();
			overlay.registerLiveEvents();
		};
		
		//** INIT FUNCTIONS
		
		// unload Overlay
		overlay.unloadOverlayMask = function(){// remove mask and hide overlay
			var overlayContainer = $(".overlay-wrap");
			$("body").removeClass("noscroll");
			overlay.hide();
			overlayContainer.fadeOut('800');
			overlayContainer.remove();
		}
		overlay.loadOverlayMask = function(){
			$("body").append('<div class="overlay-wrap"></div>');
			$(".overlay-wrap").click(function(){//trigger when click on mask
				overlay.unloadOverlayMask(this);
			})
		}
		//INIT: Events register once
		overlay.registerLiveEvents = function () {
			$(".close-button A, .close-overlay", overlay.container).live("click", function () {
				overlay.hide();
				overlay.unloadOverlayMask();
				
				$(".overlayblackbg").remove();
				addedBlackbg=false;
				if (overlay.asset != null){
					$.bbq.removeState("overlay");
				}
				
				if($("#overlay").hasClass("syncsltoverlay")==true){
					
					$("#overlay").removeClass("syncsltoverlay");
					
				}
				$.publish('overlay.usercancel');	
				return false;
			});
			
			$(".controls .previous:not(.disabled)", overlay.container).live("click", function () {
				var prevPage = overlay.currentPage * 1 - 1;
				overlay.moveTo(prevPage);
				$.publish('overlay.userprevious');
				return false;
			});
			
			$(".controls .next:not(.disabled)", overlay.container).live("click", function () {
				var prevPage = overlay.currentPage * 1 + 1;
				overlay.moveTo(prevPage);
				$.publish('overlay.usernext');
				return false;
			});
			
			
			$(".click-out A", overlay.container).live("click", function () {
				overlay.hide();
			});			
			
			$(".controls .disabled", overlay.container).live("click", function () {
				return false;
			});
		};
		
		//INIT: Inject Overlay Base mark-up
		overlay.injectContainer = function () {
			var emptyDiv, loading,
			markup = {
				container: function () {
					return '<div id="overlay" class="overlay-box"></div>';
				},
				emptyDIV: function () {
					return '<div class="overlay-box-inner"></div>';
				},
				loading: function () {
					return '<div class="loading"><div class="image"></div><p>' + overlay.text.loading + '</p></div>';
				}
			};
			overlay.jcontainer = $(markup.container())
			overlay.container = overlay.jcontainer.get(0);
			emptyDiv = $(markup.emptyDIV());
			loading = $(markup.loading());
			
			overlay.innerWrapper = emptyDiv; 
			
			overlay.jcontainer.append(emptyDiv).append(loading);
			$("body").append(overlay.container);
		};	
		
		//INIT: Decypher if there is a banner
		overlay.setPositionMode = function(type) {
			overlay.modePosition =  type && overlay.positions[type] ? overlay.positions[type] : overlay.defaultPosition
		};
		
		//INIT: Decypher if there is a banner
		overlay.prepareBannerModes = function(curElem) {
			var jbanner = $('#banner'),
				jhero = $('.principal-hero'),
				offset = '',
				banner = false,
				positions = overlay.positions = {};

			
				
			if( (banner = jhero.size()) ) {
				offset = '0 30';
			} else if ( (banner = jbanner.size())) {
				offset = '0 -5';
			}
			
			//Open overlay in window mode if anchor has class centeroverlay
			if (curElem) {
				
				if (curElem.srcElement)  var currentClasses = curElem.srcElement.className;
 					else if (curElem.target) var currentClasses = curElem.target.className;

 				if (currentClasses.toLowerCase().indexOf("centeroverlay") >= 0)
					banner = false;
 			}			
				
			//C520 feature page, so overlay can open in window mode
			if ($('.featuregeneric .principal-hero').size() > 0)
				banner = false;
						
			positions.banner = {
				of: $('#body'),
				my: 'center bottom',
				at: 'center top',
				offset: offset, 
				collision: 'none',
				//Extra prop for overlay
				scrollTop:true
			};
			
			positions.window = {
				of: window,
				my: 'center',
				at: 'center',
				collision: 'none',
				using: function(hash){
					hash[positionNameXaxis] = (hash[positionNameXaxis] >= 0 ? hash[positionNameXaxis] : 0); 
					$(this).css(hash);
				}
			};

			// Current Position	& Default		   
			overlay.modePosition = overlay.defaultPosition = banner ? positions.banner : positions.window;
			
		};
		
		//INIT: Inject the close button and pagination
		overlay.injectControls = function () {
			var controls, closeButton, markup = {
					closeButton: function () {
						return '<div class="close-button"><span><a href="#">' + overlay.text.close + '</a></span></div>';
					},
					controls: function (item) {
						return '<div class="controls"><ul><li class="pagination"><p><span class="current">1</span> ' + overlay.text.of + ' <span class="total">1</span></p></li><li class="previous"><a href="#" title="' + overlay.text.prev + '">' + overlay.text.prev + '</a></li><li class="next"><a href="#" title="' + overlay.text.next + '">' + overlay.text.next + '</a></li></ul></div>';
					}
				};
			
				//The Close Button
				overlay.closeButton = $(markup.closeButton());

				//Hide Pagination for later showing
				controls = $(markup.controls()).hide();
				
				//Insert into the document
				overlay.jcontainer.append(overlay.closeButton).append(controls);
				
				//View Gallery Button
				if($(".view-gallery").length > 0){		
					var viewGalleryButton = $(".view-gallery").clone(false);	
					overlay.jcontainer.append(viewGalleryButton);
					viewGalleryButton.hide();
				}

				
				//
				if($("#overlay").parent().hasClass("lincoln")==true){
					ND.lincolnResetOl();
				}
				
				
		};
		
		// Push state to history (jQuery.bbq.js)
		overlay.pushState = function(){
			var state = {}, asset;
			
			if ($(overlay.anchor).attr("class")){
				asset = $(overlay.anchor).attr("class").match(/asset-\d+/);
			}
			
			if (asset != null){
				overlay.asset = asset;
				overlay.assetid = asset[0].substr(6);
				state["overlay"] = overlay.assetid;
				$.bbq.pushState(state);
			}
		};
		
		
		var socialCache = {};
		
		// Inject Facebook and Add This Button
		overlay.injectSocial = function(){
			
			var share = $("#overlay .share"),
				parent = share.parent(),
				template,
				render,
				done;
			
			//Fade In Social Widgets
			function doneFn() {
				if( !done ) {
					share.fadeIn(200);
					
					//Special initaliser code for add this.
					window.addthis && window.addthis.button( '.addthis-overlay');
					
					done = true;
				}
			}
			
			
			if( share.size() > 0 && overlay.assetid ) {
				
				if( socialCache[overlay.assetid] ) {
					
					share = socialCache[overlay.assetid];
					
				} else {
					
					//Remove it from the DOM
					share.remove();
					
					//Compile Template
					template = overlay.socialTemplate || (overlay.socialTemplate = $('#tmpl-overlay-share').template());
					
					//Render the Template
					render = $.tmpl(template, {replaceURL: overlayURL( window.location.href, overlay.assetid) });
					
					//using html as tmpl plugin is Beta. html will at least create new DOM elements
					share.html(render.html());
				}
					
				parent.prepend( share.hide() )
				
				//Once the facebook like iframe is loaded.. Fade all social widgets in.
				share.find('iframe').bind('load', doneFn);
				
				//Set a timeout incase the face book iframe takes too long.
				setTimeout(doneFn, 5e2);
				
				//Cache the share DOM element
				socialCache[overlay.assetid] = share;
			}
				
		};
		
		var vrCache = {};
		
		// Support VR in the overlay
		//@param cls, to calculate the given class height and adding to #overlay wrapper, useful for adding extra element in jQuery-reel 360 overlay
		overlay.enableVR = function (cls, _imagesData, visibleContainerIndex) {
			var vrContainer = overlay.jcontainer.find(".vr-container");
			
			var currentIndex = 0, nextIndex = 1;
			if (typeof (visibleContainerIndex) == 'number' && visibleContainerIndex > 0) {
			    currentIndex = 1;
			    nextIndex = 0;
			}
			

			var compareNames = [];
			var cacheData = []; // There appears to be a design flaw somehwere in this system.  I need to re-visit it later.
			
			// Set the overlay's position to absolute for this particular overlay, since we want it to stay in place
			// And I didn't want to change it in the CSS lest it break any other overlay functionality
			var _height=$("#overlay").height();
			if(typeof(cls)!="undefined"){
				_height=_height+$(cls).height();
			}
			$("#overlay").css({
				position:"absolute",
				height:_height+"px"
			});
			
			var pad = function(num, size) {
				    var s = num+"";
				    while (s.length < size) s = "0" + s;
				    return s;
				};
			
			
			
			vrContainer.each(function(index){
				var container = $(this);
				var vr = container.find('.vr'), data, images, imagesData;
				/**
				 * 
				 * JSON spec
				 * 
				 * {
				 * 	"name": "Focus",
				 * 	"vrImages": {
				 * 		"location": http://faptest.edgesuite.net/test-dir/360demo/C346/, // Forward-slash must be included at the end
				 * 	
				 * 	}
				 * }
				 * 
				 */
				// Useful data and images
				
				data = vr.length > 0 ? vr.parent().find(".vr-data").embeddedData() : 0;
				
				var banner = $("#img-banner");
				var colorName = banner.attr("data-color");
				if(banner.length>0&&colorName&&colorName.length>0){
					data.vrImages.filenamePrefix = colorName+"_FINAL_";
					data.vrImages.location = "http://apacvideo.ford.com.edgesuite.net/LCN2014/Desktop/nameplate/360colorizer/"+colorName+"/";
					banner.removeAttr("data-color");//reset attr "data-color"
				}
				
				imagesData = (data && 'vrImages' in data) ? data.vrImages : {};
				
				var _counter=0; //need to change back to 0 later
				if (typeof (_imagesData) != "undefined" && !ND.isEmptyObject(_imagesData) && index == currentIndex) {
					imagesData=_imagesData;
				}
				
				cacheData.push(data);

				// Cache vehicle data for toggle button
				
				overlay.jcontainer.data("cache", cacheData);
				
				// Set the initial image source, for great justice
				if (index === 0) {
					vr.attr("src", imagesData.location + imagesData.filenamePrefix + pad(_counter, imagesData.counterFormat.length) + "." + imagesData.extension)
				}
				
				// If the vr already exists then replace the placeholder with the existing vr.
				// Had to be moved due to automagic above being required and making this entirely ineffective in its old position :(
				/*
				if( vrCache[ vr.attr('src') ] ) {
									vr.replaceWith( vrCache[ vr.attr('src') ] );
									return;
								}*/
				
				
				// Populate the parent array of names with this one, too!  So that we may add them to our button.
				compareNames.push(data.name);
				vr.parent().data("name", data.name);
				
				// Create the overlay dynamically
				$("<span class='car-info'>"+data.name+"</span>").appendTo(container);
				
				images = [];
				for (var i=imagesData.start; i<=imagesData.end; i++){
					images.push(imagesData.location + imagesData.filenamePrefix + pad(i, imagesData.counterFormat.length) + "." + imagesData.extension);
				}
				if (images.length) {
					vr.reel({
						revolution: 500,
						frames: images.length,
						images: images
					}); 
				}
			})

			// VR Cursor
			$('.jquery-reel-interface').on('mousedown', function() {
				if (!$.support.optSelected) {
				    $(this).removeClass('reel-cursor').addClass('grab-cursor-ie');
				} else {
					$(this).addClass('grab-cursor');
				}
			});
			$('.jquery-reel-interface').on('mouseup', function() {
				if (!$.support.optSelected) {
					$(this).removeClass('grab-cursor-ie').addClass('reel-cursor');
				} else {
					$(this).removeClass('grab-cursor');
				}
			});

			// display directions  
			$('.reeldirections').fadeTo(1500, 0.7);

			if (typeof (visibleContainerIndex) == 'number' && visibleContainerIndex > 0) {
			    if ($(vrContainer[currentIndex]).length > 0) {
			        vrContainer.hide();
			        $(vrContainer[currentIndex]).css('display', 'block');
			    }
			}
	
			// Create the toggle button
			if (vrContainer.length > 1) {
				
				var currentElem = vrContainer.eq(currentIndex); // little bit hacky but that's ok
				var vrToggleButton = $("<button class='vr-toggle'>" + overlay.jcontainer.data("cache")[nextIndex].name + "</button>")
					.on("click", function(e){
						var elem = vrToggleButton;
						currentIndex++;
						nextIndex++;
						if (currentIndex >= vrContainer.length) currentIndex = 0;
						if (nextIndex >= vrContainer.length) nextIndex = 0;
						// Change the inner text of this button to correspond with the next car to be toggled.
						// Here comes a repetition of code
						elem.html(vrContainer.eq(nextIndex).find("span.car-info").html()); // Word Display should probably be left to the template for i18n considerations
						// This could probably be cleaned up a bit but it works right at this moment.
						currentElem.css("display", "none");
						// Switch to the next element
						currentElem = vrContainer.eq(currentIndex);
						
						currentElem.css("display", "block");
						
					})
					.appendTo(vrContainer);
			}

			overlay.moveToPosition();
		};
		
		// Save the VR from being trashed
		overlay.storeVR = function() {
			var vr = overlay.jcontainer.find('.vr')
			vrCache[ vr.attr('src') ] = vr;
			vr.detach();
		};
		
		//** EVENT FUNCTIONS
		
		//Reposition the overlay.. Especially on window resize.
		overlay.moveToPosition = function(){
			if (overlay.shown) {
				overlay.jcontainer.position(overlay.modePosition);
				if($("#overlay").position().top<0){
					
					$("#overlay").css("top", "0");
					
				}
				// fixing ipad position issue
				if ( /iPhone|iPad|iPod/.test( navigator.platform ) ) {
					overlay.jcontainer.css("left", "10px");
				}
			}
			
		};
			
		/*
		 * Load the URL.. delegates to 
		 * 	.loadContent() or .loadDisclaimerContent()
		 */
		overlay.load = function (anchor, type, url, options) {
			if($(".overlay-wrap").length==0){
				overlay.loadOverlayMask();
			}
			options = options || {};
			
			//Patch for analytics
			overlay.namedTitle = options.name || "";
			
			//Protect Repeat calls. This will fix the issue of Two ajax calles that occurs when the hash change event
			//calls the overlay to load again. We can fix this by checking that the overlay is already in the same State
			//that the repeat call is asking of it. Why send open and send an Ajax call when the overlay is already open
			//on the same URL and same <a> tag.
			if( overlay.shown ) {
				if( anchor !== null && typeof anchor !== 'undefined' && overlay.anchor === anchor ) { return ; }
				if( (anchor === null || typeof anchor === 'undefined') && overlay.contentUrl === url ) { return ; }
			}
			
			//Try to prevent too much flash execution.
			if( overlay.flashLoadTimer ) {
				clearTimeout( overlay.flashLoadTimer );								
			} 

			// Support disabling the clsoe button for SYNC
			overlay.closeButtonEnabled = (typeof options.disableClose === 'undefined') || !options.disableClose
			
			// Optionsl position Type
			overlay.setPositionMode(options.positionType);				
			
			// Scroll up to the top of the page
			if (overlay.modePosition.scrollTop) {
				$('html, body').animate({scrollTop:0}, 'fast');
			}
			
			// Store ref to the Anchor and a ref to the URL
			overlay.anchor = anchor;
			overlay.contentUrl = $(anchor).attr("href");

			// Support Hash Urls
			overlay.asset = ($(anchor).attr("class") || "").match(/asset-\d+/);
			if (overlay.asset != null){
				overlay.pushState(overlay.asset[0]);
			}

			// Clear settings
			overlay.resetType();

			// Config new settings
			if (type === "urlOnly") {
				overlay.contentUrl = url;
				overlay.loadContent( options.success );
			}
			else if (type === "disclaimer") {
				overlay.loadDisclaimerContent();
				overlay.updateClassDisclaimer();
			}
			else if (type === "overlay-sync"){
				overlay.contentUrl = url;
				$("#overlay").addClass("overlay-sync");
				overlay.loadContent( options.success );
				
			}
			else if(type==="syncoverlay5"){
				
				$("#overlay").addClass("syncsltoverlay");
			    if(addedBlackbg==false){
					
					var pheight=$(document).height(); 
					var pwidth=$(document).width(); 
					$("#overlay").before("<div class='overlayblackbg' style='height:"+pheight+"px;width:"+pwidth+"px;' ></div>");
					$("#overlay").addClass("syncsltoverlay");
					addedBlackbg=true;
				}
				
				overlay.contentUrl = url;
				overlay.loadContent();
				
			}else {
				overlay.loadContent();
				overlay.updateClassOnOverlay();
			}
			
			// Display the overlay on the screen of the user to see.
			overlay.show();			
			overlay.moveToPosition();
		};
		
		
		/* Flexible size of overlay
		 * This function was added very late in the game to try and ease the strict size of the overlay
		 */
		overlay.checkSize = function() {
			var padding = parseInt(overlay.innerWrapper.css('padding-left')) * 2,
				contents = overlay.innerWrapper.children().first(),
				width = contents.outerWidth(),
				height = contents.outerHeight();
			
			if($(".view-gallery").length > 0){
				height = height + 30;
				overlay.jcontainer.find(".secondary").css("min-height","385px");
			}
			overlay.previousWidth = overlay.jcontainer.css('width');
			overlay.previousHeight = overlay.jcontainer.css('height');
			overlay.jcontainer.css({'width':width + padding, 'height':height + padding});			
			overlay.moveToPosition();
			

		};
		
		/*
		 * Reset some CSS that is required for smooth functioning
		 */
		overlay.resetCSS = function() {
			
			overlay.jcontainer.css({
				'display':'block',
				'top':'',
				'left':'',
				'width':overlay.previousWidth,
				'height':overlay.previousHeight
			});
		};
		
		/*
		 * SHOW OVERLAY
		 */
		overlay.show = function (callback) {
			overlay.shown = overlay.shown || false;
			if (!overlay.shown) {
				overlay.shown = true;
				overlay.jcontainer.fadeIn(overlay.fadeSpeed, callback);
			}
			overlay.moveToPosition();			
			
		};

		/*
		 * HIDE OVERLAY
		 */		
		overlay.hide = function () {
			overlay.shown = false;
			overlay.updateClassnames("removeActive");
			
			overlay.storeVR();
			
			//Empty the contents of the overlay
			overlay.empty();
			
			//Hide Pagination
			overlay.jcontainer.find(".controls").hide();
			overlay.jcontainer.find(".view-gallery").hide();
			
			//Hide it will effect;
			overlay.jcontainer.fadeOut(overlay.fadeSpeed, function(){
				//Restore display block (must use Left)
				overlay.resetCSS();				
			})
			
		};
		
		
		/*
		 * EMPTY OVERLAY
		 * We do this so we can kill the flash.. Damn Flash!
		 */		
		overlay.empty = function () {
			
			//Kill that damned flash.
			overlay.jcontainer && overlay.jcontainer.find('.flash').killFlash();
			
			//Empty the contents of the overlay
			overlay.innerWrapper.empty();
		};
		
		/*
		 * When overlay is all done and loaded
		 */
		overlay.done = function() {
			$.publish('overlay.done', { contents: overlay.innerWrapper, assetid: overlay.assetid, name: overlay.namedTitle });
			// And yes, we're gonna call this here too, because I said so.  Rationality not included.  If symptoms persist, seek psychiatric attention.
			setTimeout(overlay.moveToPosition, 1000); // After one second, because this is still failing on silly old firefox.
		}
		
		//External Disclaimer Click Content
		overlay.loadDisclaimerContent = function () {
			var markup = {
				link: function (link) {
					return '<p class="click-out"><a href="' + link.href + '" title="' + link.text + " " + link.href + '" target="_blank">' + link.text + " " + link.href + '</a></p>';
				}
			}
			var link = {
				text: overlay.text.externalLink,
				href: overlay.contentUrl
			};
			var html = overlay.text.disclaimer;
			html = '<div class="ext-disc">' + html + markup.link(link) + "</div>";
			overlay.innerWrapper.html(html);
			overlay.checkSize();
			
		};
		
		
		//Fill the overlay with content
		//@param _activeElIdx, element index to add "touch-active" class for simulate hover state on ipad
		overlay.loadContent = function (successFn, _imagesData, _activeElIdx, visibleContainerIndex) {
			var jcontainer = overlay.jcontainer,
				overlayContentArea = overlay.innerWrapper,
				overlayLoading = $(".loading",jcontainer),
				success,
				noGutsNoGlory,
				pageEnabled = "pagination-enabled",
				counter=0;
			
			// Show or Hide the close button
			if( overlay.closeButtonEnabled ) {
				overlay.closeButton.show();
			} else {
				overlay.closeButton.hide();
			}
			
			jcontainer.addClass("loading");
			overlayLoading.children("P").text(overlay.text.loading);
			overlayLoading.children("DIV.image").show();
						
			//Had to group all these actions so that they could be executed a couple of times.
			noGutsNoGlory = function(fn) {
				overlay.empty();
				if(arguments.length > 0) {
					fn.apply(overlay);
				}
				overlay.updateClassnames();
				
				if (overlay.list.totalCount > 0) {
					jcontainer.addClass(pageEnabled);
					overlay.pagination();
				} else {
					jcontainer.removeClass(pageEnabled);
				}
				
				overlay.customScrollBar();
			}
			
			//Store timestamps so we can compare in the success
			var thisRequest = +new Date();
			overlay.activeRequest = thisRequest;
			//Ajax success
			success = function(data, status, xhr) {
				//If this callback is not the latest Overlay AJAX request, then cancel
				if( thisRequest !== overlay.activeRequest ) {
					return; 
				}
				
				noGutsNoGlory(function(){
					jcontainer.removeClass("loading");
					overlayContentArea.html(data);
					
					$('#overlay .color-picker > ul> li .color').on('click touchstart',function(e){//bind click event ,when click on specific color img, will get the value of attr "data-color" as the folder name
						e.preventDefault();
						var _currentEl = $(this);
						var _cls = _currentEl.children('a').attr('data-color');
						
						if(typeof(_cls)!== 'undefined'){
							var _folder = _currentEl.children('a').attr('data-color').split(' ')[0];
							var _location = "http://apacvideo.ford.com.edgesuite.net/LCN2014/Desktop/nameplate/360colorizer/"+_cls+"/";
							var _fileName = _cls+"_FINAL_";
							var _imagesData={
								location:_location,
								filenamePrefix:_fileName,
								counterFormat:"NN",
								extension:"jpg",
								start:0,
								end:35,
								folder:_folder
							}
							overlay.loadContent(null, _imagesData, _currentEl.closest("li").index(), _currentEl.closest(".vr-container").index());//pass active element index
						}
					})
					
					//Load flash in a timer so that it can be delayed and a little better managed.
					overlay.flashLoadTimer = setTimeout(function() {
						//If this callback is not the latest Overlay AJAX request, then cancel
						if( thisRequest !== overlay.activeRequest ) { return; }
						jcontainer.find('.flash').metaBasedFlash();
					}, 300);
					overlay.checkSize();
					overlay.injectSocial();
					overlay.enableVR("#overlay .color-picker", _imagesData, visibleContainerIndex);
					overlay.done();
					
					if(ND.isIpad()){//if ipad, add class "touch-active" to simulate hover state, auto remove after 5 seconds
						if(ND.isNumeric(_activeElIdx)){// if _activeElIdx is valid number
							var _currentList = $("#overlay .vr-container:visible .color-picker > ul> li:eq("+_activeElIdx+")");
							_currentList.addClass("active");
							setTimeout(function(){// auto remove the active state after 5 seconds
								if(_currentList.hasClass("active")){
									_currentList.removeClass("active");
								}
							},5000);
						}
					}else{//for desktop browsers, normal behaviours
						$("#overlay .vr-container .color-picker > ul> li").hover(function(){
							$(this).toggleClass("active");
						})
					}
				});
				if(_imagesData&&_imagesData.folder){//store success ajax call in , so that dont need to send ajax call again
					//cacheStore[overlay.contentUrl]=data;
					if(!cacheStore.identifier[0]){
						cacheStore.identifier.push({
							color:_imagesData.folder,
							overlayContentUrl:data
						});
					}else{
						var cacheStoreIdLength = cacheStore.identifier.length;
						for(var i=0;i<cacheStoreIdLength;i++){
							if(cacheStore.identifier[i].color==_imagesData.folder){
								counter=1;
								return;
							}
						}
						if(counter==0){
							cacheStore.identifier.push({
								color:_imagesData.folder,
								overlayContentUrl:data
							});
						}
					}
				}
				
				//Publish.
				$.publish('overlay.success');
				
				//Callback too
				if( successFn ) {
					successFn.call();
				}
				else {
					overlay.moveToPosition(); // Seriously, we have to call this everywhere now for some reason, as a failsafe measure.  Might as well be infinite looping.  *sigh*
				}
			};

			overlay.pushState();
			//Store the Response so that the next click doesn't return to the server
			/*if(cacheStore[overlay.contentUrl]) {
				success(cacheStore[overlay.contentUrl]);
				return;
			}*/
			var cacheStoreIdLength = cacheStore.identifier.length;
			for(var i=0;i<cacheStoreIdLength;i++){//stop duplicated ajax call if already called
				if(_imagesData&&_imagesData.folder&&cacheStore.identifier[i]&&cacheStore.identifier[i].color==_imagesData.folder){
					success(cacheStore.identifier[i].overlayContentUrl);
					return;
				}
			}
			
			//Clear the contents so that it is free of content if there is an error.
			noGutsNoGlory();
			$.ajax({
				url:overlay.contentUrl,
				//timeout:overlay.timeout,
				success: success,
				dataType:'html',
				error: function (request, error) {
					//Add the buttons in again... :S .
					noGutsNoGlory();
					overlayLoading.children("DIV.image").hide();
					overlayLoading.children("P").text(overlay.text.error);
					delete cacheStore.identifier;
					//delete cacheStore[overlay.contentUrl];		
				}
			});
			
			
		};
		
		/*
		 * Prefetch the URL and store it in cache
		 * Call this method in advance, if you want to avoid the user seeing the *Loading* Dialog
		 * This change was added for the SYNC USB transfer process which uses abuot 6 overlays in sequence.
		 */
		overlay.prefetch = function( url ) {
			
			// Check if already fetched
			if( cacheStore[url] ) { return; }
			
			// Fetch and store in the local cache store for Overlays.
			$.ajax({
				url: url,
				timeout: overlay.timeout,
				success: function(data) {
					cacheStore[ url ] = data;
				}
			});
		};
		
		/*
		 * Function to initalise of re-inialise the custom scrollbar within the overlay.
		 */
		overlay.customScrollBar = function() {
			//Scroll bars
			overlay.jcontainer
				.find('.secondary .body, .custom-scroll')
				.doOnce(function(){
					$(this)
						.jScrollPane({showArrows:false, scrollbarWidth: 13, scrollbarOnLeft:rtl});
				});
		};
		
		/*
		 * Function to initalise of re-inialise anything with the overlay that needs to be
		 */
		
		overlay.reinitalise = function() {
			overlay.customScrollBar();
		};
		$.subscribe('overlay.reinitalise', overlay.reinitalise );
		
		/*
		 * 	Modify classes for updateClassOnOverlay mode
		 */
		overlay.updateClassOnOverlay = function () {
			var link = $(overlay.anchor);
			overlay.jcontainer.toggleClass( overlay.view360Class, link.hasClass(overlay.view360Class) );
			overlay.jcontainer.toggleClass( overlay.lightClass, link.hasClass(overlay.lightClass) );
		};
		
		/*
		 * 	Modify classes for updateClassDisclaimer mode
		 */
		overlay.updateClassDisclaimer = function () {
			if ($(overlay.anchor).hasClass(overlay.disclaimerClass)) {
				overlay.jcontainer.addClass(overlay.disclaimerClass);
			}
			else {
				overlay.jcontainer.removeClass(overlay.disclaimerClass);
			}
		};

		/*
		 * It frustrates me that in order to support a different size overlay I need to modify the overlay script.
		 * Modify classes for updateClassDisclaimer mode
		 
		overlay.updateClassCalcPrice = function () {
			if ($(overlay.anchor).hasClass(overlay.disclaimerClass)) {
				overlay.jcontainer.addClass(overlay.disclaimerClass);
			}
			else {
				overlay.jcontainer.removeClass(overlay.disclaimerClass);
			}
		};*/
		
		overlay.resetType = function () {
			//Actions that must occur to reset the overlay every time it is shown.
			overlay.jcontainer.removeClass(overlay.lightClass);
			overlay.jcontainer.removeClass(overlay.view360Class);
			overlay.jcontainer.removeClass(overlay.disclaimerClass);			
		};
		
		overlay.updateClassnames = function (method) {
			if (overlay.anchor !== undefined) {
				var overlayType = ".overlay" + (overlay.listType() ? "-" + overlay.listType() : "");
				
				$(overlayType).closest(".item.active").removeClass("active");
				
				if (method !== "removeActive") {
					$(overlay.anchor).closest(".item").addClass("active");
				}
			}
		};
		

		
		overlay.listType = function () {
			var type;
			var classname = $(overlay.anchor).attr("class") || "";
			
			if (classname !== undefined) {
				if (classname.match(/overlay-group/) !== null) {
					var group = classname.match(/group[0-9]*/);
					type = group[0];
				}
				else {
					type = "";
				}

				return type;
			}
			
			return "";
			
		};
		
		overlay.pagination = function () {
			var type = overlay.listType();
			var innerChild = overlay.innerWrapper.children("div");
			var height = innerChild.outerHeight();
			if (type !== "") {
				overlay.updateCurrentPage = overlay.setPagination(overlay.list[type].count);
				overlay.updateCurrentPage(overlay.list[type].items[overlay.contentUrl].order);
				//to stop control displaying with loader
				if ((innerChild.length > 0) && (height > 100 )) {
					overlay.jcontainer.find(".controls").show();
					overlay.jcontainer.find(".view-gallery").show();
				}
				
			}
		};
		
		overlay.setPagination = function (total) {
			// Total
			$(".pagination .total", overlay.container).text(total);
			
			return function (current) {
				// Current
				overlay.currentPage = current;
				$(".pagination .current", overlay.container).text(current);
				overlay.disablePaginationButtons(current, total);				
			};
		};
		
		overlay.disablePaginationButtons = function (current, total) {
			if (current === 1) {
				$(".controls .previous", overlay.container).addClass("disabled");
			}
			else {
				$(".controls .previous", overlay.container).removeClass("disabled");
			}
			if(current === total) {
				$(".controls .next", overlay.container).addClass("disabled");
			}
			else {
				$(".controls .next", overlay.container).removeClass("disabled");
			}
		};
		
		overlay.moveTo = function (prevPage) {
			var type = overlay.listType();
			var items = overlay.list[type].items;
			var href, node;
			
			for (var item in items) {
				if (items[item]["order"] === prevPage) {
					node = items[item]["node"];
					href = items[item]["href"];
				}
			}
			
			overlay.anchor = node;
			overlay.contentUrl = href;
			
			overlay.asset = ($(overlay.anchor).attr("class") || "").match(/asset-\d+/);
			if (overlay.asset != null){
				overlay.pushState(overlay.asset[0]);
			}
			overlay.loadContent();
		};
		
		//redundant
		//overlay.wireEvents = function(){};
		
	};
	
	var populatePaginationList = function () {
		var list = {},
		totalCount = 0,
		count, i, max = 50;
		
		for (i = 1; i < max; i = i + 1) {
			
			if ($("A.overlay-group" + i).size() > 0) {
				count = 0;
				
				list["group"+i] = {};
				$("A.overlay-group" + i).each(function (j) {
					var node = this;
					var href = $(node).attr("href");
					if (href.indexOf("#") == 0){
						href = href.substr(1);
						
					}
					list["group"+i]["items"] = (j === 0) ? {} : list["group"+i]["items"];
					
					if (! list["group"+i]["items"][href]) {
						list["group"+i]["items"][href] = {
							href: href,
							node: node,
							order: count + 1
						};
						totalCount = totalCount + 1;
						count = count + 1;
					}
				});
				list["group"+i]["count"] = count;
				
			}
			else {
				break;
			}
		}
		list["totalCount"] = totalCount;
		
		return list;
	};
	
	
	var appendOverlay = function (curElem) {
		if ($("#overlay").size() === 0) {
			
			var textContainer = $("#javascript-text"),
				text = $(textContainer.html()),
				getText = function( key ) {
					return text.find("."+key).html();
				},				
				textVals = textContainer.size() ? {
					close: getText("close"),
					of: getText("of"),
					prev: getText("prev"),
					next: getText("next"),
					loading: getText("loading"),
					error: getText("error"),
					disclaimer: getText("disclaimer-text"),
					externalLink: getText("disclaimer-link")
				} : null;

			var overlay = new Overlay(populatePaginationList(), textVals, window.ND && ND.rtl);
			
			overlay.init(curElem);

			$(window).bind('resize', function(){
				overlay.moveToPosition();
			}).bind('scroll', function(){
				overlay.moveToPosition();
			});
			
			return overlay;
		}
	};
	
	// This function is called by child window to retrieve the current item information
	getCurrentItem = function(){
		var item = $("#overlay .controls .current").text();
		return item;
	};
	addedBlackbg=false;
	;
	
	$(function(){
		
		var overlay;
		
		$wait(function(){
		if ($("A.overlay, A.external-disclaimer,A.overlay-sync,A.overlay-light").size() > 0) {
				
			if(window.location.toString().indexOf("#overlay")!=-1){
				//overlay = overlay || appendOverlay();
				if ($("#overlay").size() === 0) {
				//console.log("append");
				overlay =  appendOverlay();
				}else{
				//console.log("overlay");	
				overlay =  overlay;
				}
			}	
			
				
			$("A.overlay").bind("click", function (e) {
				
				if ($("#overlay").size() === 0) {
				
				overlay =  appendOverlay(e);
				}else{
					
				overlay = overlay;
				}
			     
				

				//toggle the custom class of the container.
				var reg = /overlay-[^\s$]+/,
                    $this = $(this);
					$overlay = $("#overlay"),
					newClass = $this.attr("class").match(reg);
				if(newClass){
					oldClass = $overlay.attr("class").match(reg);
					oldClass && $overlay.removeClass(oldClass.join(' '));
					$overlay.addClass(newClass[0] + " overlay-box");
				}
				
				if($this.hasClass("blackbackground")){
					
					if(addedBlackbg==false){
					
					var pheight=$(document).height(); 
					var pwidth=$(document).width(); 
					$("#overlay").before("<div class='overlayblackbg' style='height:"+pheight+"px;width:"+pwidth+"px;' ></div>");
					$("#overlay").addClass("syncsltoverlay");
					addedBlackbg=true;
					}
				}
				

                //inject the custom contents if link contains data attributes that start with "tmpl-"
                var tmplData = $this.attr("data");
                if(tmplData && tmplData.indexOf("tmpl-") == 0){
                    overlay.load(null, "urlOnly", $this.attr("href"), {
                        success: function(){
                            var template = $('#' + tmplData).template();
                            $('#' + tmplData.substr(5)).append( $.tmpl( template ) );
                            //reset the scrollbar, since the content has been changed.
                            overlay.reinitalise();
                        }
                    });
                }else{
                    overlay.load(this);
                }

				e.preventDefault();
				e.stopPropagation();
				flag = true;
				return false;
			});
			
			
			$("A.overlay-light").bind("click", function (e) {
				
				if ($("#overlay").size() === 0) {
				
				overlay =  appendOverlay(e);
				}else{
					
				overlay =  overlay;
				}
				
				overlay.load(this);
				$("#overlay").addClass();
				e.preventDefault();
				e.stopPropagation();
				flag = true;
				return false;
			});
			
			$("A.external-disclaimer").live("click", function (e) {
				if ($("#overlay").size() === 0) {
				
				overlay =  appendOverlay(e);
				}else{
					
				overlay =  overlay;
				}
				var href = $(this).attr("href");
				overlay.load(this, "disclaimer")
				e.preventDefault();
				e.stopPropagation();
				return false;
			});
			
			$(".overlay-parent").bind("click", function (e) {
				if ($("#overlay").size() === 0) {
				
				overlay =  appendOverlay(e);
				}else{
					
				overlay =  overlay;
				}
				var link = $(this).find("A:eq(0)");
				if (link.size() > 0) {
					overlay.load(link);
				}
				e.preventDefault();
				e.stopPropagation();
				return false;
			});
			
			
			
			
		}})//end 
		
		//ND.API for Flash
		ND.API.launchOverlay = ND.launchOverlay = function(url, options) {
			overlay = overlay || appendOverlay();

			if(!options) options = {};
			var type = options.type || "urlOnly";

			if (url !== undefined) {
				
				overlay.load(null, type, url, options);
			}

			//implement custom class
			if(options.customClass){
				var reg = /overlay-[^\s$]+/,
					$overlay = $("#overlay"),
					oldClass = $overlay.attr("class").match(reg);
				oldClass && $overlay.removeClass(oldClass.join(' '));
				$overlay.addClass(options.customClass + " overlay-box");
			};
		};
		
		$.subscribe('overlay.launch', function(event, options){
			options && ND.launchOverlay(options.url, options);
		});
		
		
		$.subscribe('overlay.hide', function(event){	
			overlay && overlay.hide();
		});
		
		$.subscribe('overlay.prefetch', function(event, options){
			overlay = overlay || appendOverlay();
			overlay.prefetch( options.url );
		});
		
		ND.API.getOverlay = function(){
			overlay = overlay || appendOverlay();
			return 	overlay;
		};
		
		//Open the overlay if the id exists in URL
		$(window).bind('pageLoadedWithOverlay', function(e){
			if( overlay === undefined) { return;}
			
			var url;

			if( window.location.toString().indexOf("#") > 0 ) {
				
				url = $.bbq.getState("overlay") || "";
				//if( url && $("#overlay").is(':hidden')){
				if( url ){
					$('a[class*=' + url + ']').filter('.overlay').eq(0).trigger("click");
				}
			}

			if ( !url && overlay.shown ) {
				overlay.hide();
			}
		});
		$(window).trigger( 'pageLoadedWithOverlay' );
		
	});
	
})(jQuery);


/*
 * York Zhang
 * Creating a deferred for image loading
 * Reference: http://blog.anderson.geek.nz/2011/07/25/loading-images-with-jquery-deferreds/
 * http://aboutcode.net/2013/01/09/load-images-with-jquery-deferred.html
 */

(function($){
	$.loadImage = function(url) {
	 	// Define a "worker" function that should eventually resolve or reject the deferred object.
	 	var loadImage = function(deferred) {
	    	var image = new Image();
	     
	    	// Set up event handlers to know when the image has loaded
	    	// or fails to load due to an error or abort.
	    	image.onload = loaded;
	    	image.onerror = errored; // URL returns 404, etc
	    	image.onabort = errored; // IE may call this if user clicks "Stop"
	     
	    	// Setting the src property begins loading the image.
	    	image.src = url;
	     
	    	function loaded() {
	    		unbindEvents();
		      	// Calling resolve means the image loaded sucessfully and is ready to use.
	
		    	deferred.resolve(image);

	    	}
	    	function errored() {
		      	unbindEvents();
		      	// Calling reject means we failed to load the image (e.g. 404, server offline, etc).
		      	deferred.reject(image);
		    }
	   		function unbindEvents() {
	      		// Ensures the event callbacks only get called once.
	     	 	image.onload = null;
	     	 	image.onerror = null;
	     	 	image.onabort = null;
	    	}
	  	};
	   
	  	// Create the deferred object that will contain the loaded image.
	  	// We don't want callers to have access to the resolve() and reject() methods, 
	 	// so convert to "read-only" by calling `promise()`.
	 	return $.Deferred(loadImage).promise();
	};
}(jQuery));


/*
	Author: 		Brett Chaney
	Description: 	Detects if user is signed in (via cookie) and display "Welcome Bar"
*/


(function($) {
	$(function() {

		var showWelcomeBar = function() {
			// get user cookie data
			var userCookie 			= $.cookie("dfy.lh.u"),
			 	userCookieParsed 	= JSON.parse(decodeURIComponent(userCookie)),
			 	userTitle 			= userCookieParsed["t"],
			 	userName 			= userCookieParsed["u"],
			 	welcomeMsg			= $(".welcome-bar .user-name").data("msg").replace('{title}', userTitle).replace('{user}', userName);
			
			//if title is Chinese then show name first
			if(userTitle.match(/[\u3400-\u9FBF]/)){
				welcomeMsg			= $(".welcome-bar .user-name").data("msg").replace('{titleName}', userName + ' ' + userTitle);
			}
			else{
				welcomeMsg			= $(".welcome-bar .user-name").data("msg").replace('{titleName}', userTitle + ' ' + userName);
			}
			
			
			// inject welcome message
			$(".welcome-bar .user-name").html(welcomeMsg);

			// display welcome bar
			$(".welcome-bar").show();
			
			//hide "login/register" btn after login
			$("#header UL#eyebrow > LI.text > A, #header UL#toolbar > LI.menu-item > A").each(function(){
				if($(this).prop("href").indexOf("/register")!=-1){//if exist
					$(this).hide();
				}
			})
		};

		if ($.cookie("dfy.lh.u") && $(".welcome-bar")[0]) {
			// if user cookie exists display welcome bar
			showWelcomeBar();
		}

	});
})(jQuery);


/*
 * Top menu toggle
 * AUTHOR: YORK ZHANG
 */

/*globals jQuery, ND, window */

var ND = (function(ND, $) {
	
	//The create function creates the module object; It does no initialise the object
	ND.lincolnNav = function () {
	
		var element;
		var w = $(window);
		
		return {

			init: function( elem ) { 

				element = $(elem || "#menu");
					
				/* Check this module needs to be initalised for this page */
				if( !element || !element.size() ) { return this; }


				$("span.menu-icon").on("click",function(e){
					e.preventDefault();

					if(element.hasClass("active")){
						element.removeClass("active");
					}else{
						element.addClass("active");
					}
				});

				$("#nav").find(".nav-item").on("click",function(e){
					e.preventDefault();

					var $this = $(this);
					var $thisContainer = $this.parent("li")
					//console.log(w.width());
					if((w.width() >= 768) && (w.width() < 977)){
						if($thisContainer.hasClass("active")){
							$thisContainer.removeClass("active");
						}else{
							$("#nav > li").removeClass("active");
							$thisContainer.addClass("active");
						}
					} else if(w.width() < 768){
                        var subMenu = $thisContainer.find('.sub-menu');
                        var arrow = $this.find('span');
                        if(subMenu.hasClass('clps-nav')){
                            subMenu.removeClass('clps-nav').addClass('expand-nav');
                            arrow.removeClass('arrow').addClass('expand-arrow');
                        }else if(subMenu.hasClass('expand-nav')){
                            subMenu.removeClass('expand-nav').addClass('clps-nav');
                            arrow.removeClass('expand-arrow').addClass('arrow');
					}
                    }
				});

				this.colCalulator();
				

				return this;
			
			},


			colCalulator: function(){

				var colWarp = $("#nav").find(".sub-menu.fat-menu");
				var colNum = colWarp.children("li").size();

				var classAdd = "col-" + colNum;

				colWarp.addClass(classAdd);

			}
		
		};	
	};
	
	/* Return ND after it's been augmented */ 
	return ND;	

}(window.ND || {}, jQuery));


(function(ND, $){
	$(function($){

		ND.lincolnNav().init();
		
	});
}(window.ND || {}, jQuery));

/* End File */


/*
 *
 * RAD overlay plugin for Lincoln B&P responsive site
 * Author: York Zhang
 *
 */

;(function($){

	var _radOverlayOpenedFlag = false;

	var defaults = {
		// STYLE CLASS -- Using this additional class to style the overlay which is in a responsive page, the benifit is that we can use pure CSS( in media queres) to style the overlay
		additionalClass: "",

		//OPTIONS
		closeBtnText:"X",

		greyoutClickable: true,

		// CALLBACK
		afterContentLoad: function(){},

		afterOverlayClosed: function(){}
	};

	var F = $.radOverlay = function(){
		F.open.apply(this, arguments);
	};

	$.extend(F, {
		open:function(target, options){
			//console.log("target", target);

			if(_radOverlayOpenedFlag == true) {return;}

			_radOverlayOpenedFlag = true;

			var overlay = {};
			overlay.settings = $.extend({}, defaults, options);

			overlay.content = target.html();
			//empty the target in case there is ID attribute in it.
			target.empty();

			// console.log(overlay.content);
			var additionalClass = (typeof overlay.settings.additionalClass) === "string" ? overlay.settings.additionalClass : "";
			var $overlayWrap = $("<div class='rad-overlay-bg'><div class='rad-overlay-wrap " + additionalClass + "'><span class='close-btn'>" + overlay.settings.closeBtnText + "</span></div></div>");

			var createContainer = function(){
				var pms = $("body").append($overlayWrap).promise();
				return pms;
			};

			var closeOverlay = function(){
				//var $overlayWrap = $(".rad-overlay-bg");

				$overlayWrap.find("span.close-btn").click(function(){
					$overlayWrap.fadeOut(300,function(){
						$overlayWrap.remove();
						$("body").removeClass("noscroll");
						target.html(overlay.content);

						_radOverlayOpenedFlag = false;

						overlay.settings.afterOverlayClosed();
					});


				});

				if(overlay.settings.greyoutClickable){

					$overlayWrap.on('click',function(){
						$overlayWrap.fadeOut(300,function(){
							$overlayWrap.remove();
							$("body").removeClass("noscroll");
							target.html(overlay.content);

							_radOverlayOpenedFlag = false;
							overlay.settings.afterOverlayClosed();
						});
					}).children().on('click',function(e){
						e.stopPropagation();
					});
				}
			};

			createContainer().done(function(){
				$("body").addClass("noscroll");
				closeOverlay();
				$overlayWrap.find("div.rad-overlay-wrap").append(overlay.content);
				overlay.settings.afterContentLoad();
			});
		}
	});

	$.fn.radOverlay = function(options){

		if(this.length == 0) return this;

		// support mutltiple elements
		if(this.length > 1){
			this.each(function(){
				$(this).radOverlay(options);
			});

			return this;
		}

		// create a namespace to be used throughout the plugin
		var overlay = {};

		// set a reference to the element which triggered the overlay
		var el = this;

		/**
		 * ===================================================================================
		 * = PRIVATE FUNCTIONS
		 * ===================================================================================
		 */


		var init = function(){

			// merge user-supplied options with the defaults
			overlay.settings = $.extend({}, defaults, options);
			var additionalClass = (typeof overlay.settings.additionalClass) === "string" ? overlay.settings.additionalClass : "";

			el.on('click',function(e){

				e.preventDefault();

				if(_radOverlayOpenedFlag == true) {return;}

				_radOverlayOpenedFlag = true;



				var $overlayWrap = $("<div class='rad-overlay-bg'><div class='rad-overlay-wrap " + additionalClass + "'><span class='close-btn'>" + overlay.settings.closeBtnText + "</span></div></div>");

				var $this = $(this);

				var required_url = $this.attr("href");

				var containerPms = createContainer($overlayWrap);

				containerPms.done(function(){

					$("body").addClass("noscroll");
					closeOverlay($overlayWrap);
					var dataPromise = getDataPromise(required_url);
					dataPromise.done(function(data){
						//console.log(data);
						$overlayWrap.find("div.rad-overlay-wrap").append(data);

						overlay.settings.afterContentLoad();
					});
				});

			});

		};

		var getDataPromise = function(url){
			return $.ajax({
				dataType: 'html',
				url: url
			});
		};


		var createContainer = function($overlayWrap){

			var pms = $("body").append($overlayWrap).promise();
			return pms;
		};

		var closeOverlay = function($overlayWrap){
			//var $overlayContainer = $(".rad-overlay-bg");

			$overlayWrap.find("span.close-btn").click(function(){
				$overlayWrap.fadeOut(300,function(){
					$overlayWrap.remove();
					$("body").removeClass("noscroll");
					_radOverlayOpenedFlag = false;
				});


			});

			$overlayWrap.on('click',function(){
				$overlayWrap.fadeOut(300,function(){
					$overlayWrap.remove();
					$("body").removeClass("noscroll");
					_radOverlayOpenedFlag = false;
				});
			}).children().on('click',function(e){
				e.stopPropagation();
			});



		};

		init();
		// returns the current jQuery object
		return this;
	};

})(jQuery);



/*
 * Common overlay for Lincoln RAD site (eg. the links in the global footer)
 * Author: York Zhang
 *
 */

/*globals jQuery, ND, window */
var ND = (function(ND, $) {
	
	ND.radCommonOverlay = function () {
	
		var element;
		
		return {

			init: function( elem ) { 

				//element = $(elem || ".comparison-overlay");
					
				/* Check this module needs to be initalised for this page */
				//if( !element || !element.size() ) { return this; }

				$("#footer-links .fullscreen-overlay, .rad-overlay").radOverlay({
					additionalClass: "auto-height-overlay"
				});
				
				/* Return this so it can be chained / assigned
				 * eg. var myModule = ND.myModuleName().init();
				 */
				return this;
			
			}
			

		
		
		};	
	};
	
	/* Return ND after it's been augmented */ 
	return ND;	

}(window.ND || {}, jQuery));

(function(ND, $){
	$(function($){
		
		ND.radCommonOverlay().init();
		
	});
}(window.ND || {}, jQuery));



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




/**
 * @author Sohrab Zabetian
 * 
 * added a utility that contains utility methods accessible across the site
 * 
 */

var ND = window.ND = window.ND || {};

ND.Utils = window.ND.Utils = window.ND.Utils || {};
/**
 * 
 * @returns if the device is an ipad/ipod/iphone
 */
ND.Utils.isTouchDevice = function() {
	if (/iPhone|iPad|iPod/.test(navigator.platform) || 
	   (Modernizr !== undefined && Modernizr.touch)) {
		return true;
	}
	return false;
}

/**
 * 
 * lazily loads an image. Requires the following setup
 * <div data-src="image url" data-alt=" optional name" class="thumb-lazy" >&nbsp;</div>
 * An image tag is created and injected into the div.
 * 
 */
ND.Utils.lazyLoadImage = function(selector) {
	$(selector ? selector : 'div.thumb-lazy').each(function() {
	    var $div = $(this);
	    var src = $div.data('src');
	    var img = new Image();
		
		// call this function after it's loaded
		img.onload = function() {
			// make wrapper fully visible
			$div.html(img);
			img.alt = $div.data('alt');
		};
		// begin loading the image from www.flickr.com
		img.src = src;
		
	});
}




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
  _.partition = function(array, predicate, context) {
    predicate = lookupIterator(predicate);
    var pass = [], fail = [];
    each(array, function(elem) {
      (predicate.call(context, elem) ? pass : fail).push(elem);
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


//     Backbone.js 1.1.0

//     (c) 2010-2011 Jeremy Ashkenas, DocumentCloud Inc.
//     (c) 2011-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

(function(){

  // Initial Setup
  // -------------

  // Save a reference to the global object (`window` in the browser, `exports`
  // on the server).
  var root = this;

  // Save the previous value of the `Backbone` variable, so that it can be
  // restored later on, if `noConflict` is used.
  var previousBackbone = root.Backbone;

  // Create local references to array methods we'll want to use later.
  var array = [];
  var push = array.push;
  var slice = array.slice;
  var splice = array.splice;

  // The top-level namespace. All public Backbone classes and modules will
  // be attached to this. Exported for both the browser and the server.
  var Backbone;
  if (typeof exports !== 'undefined') {
    Backbone = exports;
  } else {
    Backbone = root.Backbone = {};
  }

  // Current version of the library. Keep in sync with `package.json`.
  Backbone.VERSION = '1.1.0';

  // Require Underscore, if we're on the server, and it's not already present.
  var _ = root._;
  if (!_ && (typeof require !== 'undefined')) _ = require('underscore');

  // For Backbone's purposes, jQuery, Zepto, Ender, or My Library (kidding) owns
  // the `$` variable.
  Backbone.$ = root.jQuery || root.Zepto || root.ender || root.$;

  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
  // to its previous owner. Returns a reference to this Backbone object.
  Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this;
  };

  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
  // will fake `"PATCH"`, `"PUT"` and `"DELETE"` requests via the `_method` parameter and
  // set a `X-Http-Method-Override` header.
  Backbone.emulateHTTP = false;

  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
  // `application/json` requests ... will encode the body as
  // `application/x-www-form-urlencoded` instead and will send the model in a
  // form param named `model`.
  Backbone.emulateJSON = false;

  // Backbone.Events
  // ---------------

  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may bind with `on` or remove with `off` callback
  // functions to an event; `trigger`-ing an event fires all callbacks in
  // succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  var Events = Backbone.Events = {

    // Bind an event to a `callback` function. Passing `"all"` will bind
    // the callback to all events fired.
    on: function(name, callback, context) {
      if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
      this._events || (this._events = {});
      var events = this._events[name] || (this._events[name] = []);
      events.push({callback: callback, context: context, ctx: context || this});
      return this;
    },

    // Bind an event to only be triggered a single time. After the first time
    // the callback is invoked, it will be removed.
    once: function(name, callback, context) {
      if (!eventsApi(this, 'once', name, [callback, context]) || !callback) return this;
      var self = this;
      var once = _.once(function() {
        self.off(name, once);
        callback.apply(this, arguments);
      });
      once._callback = callback;
      return this.on(name, once, context);
    },

    // Remove one or many callbacks. If `context` is null, removes all
    // callbacks with that function. If `callback` is null, removes all
    // callbacks for the event. If `name` is null, removes all bound
    // callbacks for all events.
    off: function(name, callback, context) {
      var retain, ev, events, names, i, l, j, k;
      if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
      if (!name && !callback && !context) {
        this._events = {};
        return this;
      }
      names = name ? [name] : _.keys(this._events);
      for (i = 0, l = names.length; i < l; i++) {
        name = names[i];
        if (events = this._events[name]) {
          this._events[name] = retain = [];
          if (callback || context) {
            for (j = 0, k = events.length; j < k; j++) {
              ev = events[j];
              if ((callback && callback !== ev.callback && callback !== ev.callback._callback) ||
                  (context && context !== ev.context)) {
                retain.push(ev);
              }
            }
          }
          if (!retain.length) delete this._events[name];
        }
      }

      return this;
    },

    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    trigger: function(name) {
      if (!this._events) return this;
      var args = slice.call(arguments, 1);
      if (!eventsApi(this, 'trigger', name, args)) return this;
      var events = this._events[name];
      var allEvents = this._events.all;
      if (events) triggerEvents(events, args);
      if (allEvents) triggerEvents(allEvents, arguments);
      return this;
    },

    // Tell this object to stop listening to either specific events ... or
    // to every object it's currently listening to.
    stopListening: function(obj, name, callback) {
      var listeningTo = this._listeningTo;
      if (!listeningTo) return this;
      var remove = !name && !callback;
      if (!callback && typeof name === 'object') callback = this;
      if (obj) (listeningTo = {})[obj._listenId] = obj;
      for (var id in listeningTo) {
        obj = listeningTo[id];
        obj.off(name, callback, this);
        if (remove || _.isEmpty(obj._events)) delete this._listeningTo[id];
      }
      return this;
    }

  };

  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;

  // Implement fancy features of the Events API such as multiple event
  // names `"change blur"` and jQuery-style event maps `{change: action}`
  // in terms of the existing API.
  var eventsApi = function(obj, action, name, rest) {
    if (!name) return true;

    // Handle event maps.
    if (typeof name === 'object') {
      for (var key in name) {
        obj[action].apply(obj, [key, name[key]].concat(rest));
      }
      return false;
    }

    // Handle space separated event names.
    if (eventSplitter.test(name)) {
      var names = name.split(eventSplitter);
      for (var i = 0, l = names.length; i < l; i++) {
        obj[action].apply(obj, [names[i]].concat(rest));
      }
      return false;
    }

    return true;
  };

  // A difficult-to-believe, but optimized internal dispatch function for
  // triggering events. Tries to keep the usual cases speedy (most internal
  // Backbone events have 3 arguments).
  var triggerEvents = function(events, args) {
    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
    switch (args.length) {
      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args);
    }
  };

  var listenMethods = {listenTo: 'on', listenToOnce: 'once'};

  // Inversion-of-control versions of `on` and `once`. Tell *this* object to
  // listen to an event in another object ... keeping track of what it's
  // listening to.
  _.each(listenMethods, function(implementation, method) {
    Events[method] = function(obj, name, callback) {
      var listeningTo = this._listeningTo || (this._listeningTo = {});
      var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
      listeningTo[id] = obj;
      if (!callback && typeof name === 'object') callback = this;
      obj[implementation](name, callback, this);
      return this;
    };
  });

  // Aliases for backwards compatibility.
  Events.bind   = Events.on;
  Events.unbind = Events.off;

  // Allow the `Backbone` object to serve as a global event bus, for folks who
  // want global "pubsub" in a convenient place.
  _.extend(Backbone, Events);

  // Backbone.Model
  // --------------

  // Backbone **Models** are the basic data object in the framework --
  // frequently representing a row in a table in a database on your server.
  // A discrete chunk of data and a bunch of useful, related methods for
  // performing computations and transformations on that data.

  // Create a new model with the specified attributes. A client id (`cid`)
  // is automatically generated and assigned for you.
  var Model = Backbone.Model = function(attributes, options) {
    var attrs = attributes || {};
    options || (options = {});
    this.cid = _.uniqueId('c');
    this.attributes = {};
    if (options.collection) this.collection = options.collection;
    if (options.parse) attrs = this.parse(attrs, options) || {};
    attrs = _.defaults({}, attrs, _.result(this, 'defaults'));
    this.set(attrs, options);
    this.changed = {};
    this.initialize.apply(this, arguments);
  };

  // Attach all inheritable methods to the Model prototype.
  _.extend(Model.prototype, Events, {

    // A hash of attributes whose current and previous value differ.
    changed: null,

    // The value returned during the last failed validation.
    validationError: null,

    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.
    idAttribute: 'id',

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Return a copy of the model's `attributes` object.
    toJSON: function(options) {
      return _.clone(this.attributes);
    },

    // Proxy `Backbone.sync` by default -- but override this if you need
    // custom syncing semantics for *this* particular model.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Get the value of an attribute.
    get: function(attr) {
      return this.attributes[attr];
    },

    // Get the HTML-escaped value of an attribute.
    escape: function(attr) {
      return _.escape(this.get(attr));
    },

    // Returns `true` if the attribute contains a value that is not null
    // or undefined.
    has: function(attr) {
      return this.get(attr) != null;
    },

    // Set a hash of model attributes on the object, firing `"change"`. This is
    // the core primitive operation of a model, updating the data and notifying
    // anyone who needs to know about the change in state. The heart of the beast.
    set: function(key, val, options) {
      var attr, attrs, unset, changes, silent, changing, prev, current;
      if (key == null) return this;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options || (options = {});

      // Run validation.
      if (!this._validate(attrs, options)) return false;

      // Extract attributes and options.
      unset           = options.unset;
      silent          = options.silent;
      changes         = [];
      changing        = this._changing;
      this._changing  = true;

      if (!changing) {
        this._previousAttributes = _.clone(this.attributes);
        this.changed = {};
      }
      current = this.attributes, prev = this._previousAttributes;

      // Check for changes of `id`.
      if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];

      // For each `set` attribute, update or delete the current value.
      for (attr in attrs) {
        val = attrs[attr];
        if (!_.isEqual(current[attr], val)) changes.push(attr);
        if (!_.isEqual(prev[attr], val)) {
          this.changed[attr] = val;
        } else {
          delete this.changed[attr];
        }
        unset ? delete current[attr] : current[attr] = val;
      }

      // Trigger all relevant attribute changes.
      if (!silent) {
        if (changes.length) this._pending = true;
        for (var i = 0, l = changes.length; i < l; i++) {
          this.trigger('change:' + changes[i], this, current[changes[i]], options);
        }
      }

      // You might be wondering why there's a `while` loop here. Changes can
      // be recursively nested within `"change"` events.
      if (changing) return this;
      if (!silent) {
        while (this._pending) {
          this._pending = false;
          this.trigger('change', this, options);
        }
      }
      this._pending = false;
      this._changing = false;
      return this;
    },

    // Remove an attribute from the model, firing `"change"`. `unset` is a noop
    // if the attribute doesn't exist.
    unset: function(attr, options) {
      return this.set(attr, void 0, _.extend({}, options, {unset: true}));
    },

    // Clear all attributes on the model, firing `"change"`.
    clear: function(options) {
      var attrs = {};
      for (var key in this.attributes) attrs[key] = void 0;
      return this.set(attrs, _.extend({}, options, {unset: true}));
    },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged: function(attr) {
      if (attr == null) return !_.isEmpty(this.changed);
      return _.has(this.changed, attr);
    },

    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.
    changedAttributes: function(diff) {
      if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
      var val, changed = false;
      var old = this._changing ? this._previousAttributes : this.attributes;
      for (var attr in diff) {
        if (_.isEqual(old[attr], (val = diff[attr]))) continue;
        (changed || (changed = {}))[attr] = val;
      }
      return changed;
    },

    // Get the previous value of an attribute, recorded at the time the last
    // `"change"` event was fired.
    previous: function(attr) {
      if (attr == null || !this._previousAttributes) return null;
      return this._previousAttributes[attr];
    },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes: function() {
      return _.clone(this._previousAttributes);
    },

    // Fetch the model from the server. If the server's representation of the
    // model differs from its current attributes, they will be overridden,
    // triggering a `"change"` event.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        if (!model.set(model.parse(resp, options), options)) return false;
        if (success) success(model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Set a hash of model attributes, and sync the model to the server.
    // If the server returns an attributes hash that differs, the model's
    // state will be `set` again.
    save: function(key, val, options) {
      var attrs, method, xhr, attributes = this.attributes;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (key == null || typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options = _.extend({validate: true}, options);

      // If we're not waiting and attributes exist, save acts as
      // `set(attr).save(null, opts)` with validation. Otherwise, check if
      // the model will be valid when the attributes, if any, are set.
      if (attrs && !options.wait) {
        if (!this.set(attrs, options)) return false;
      } else {
        if (!this._validate(attrs, options)) return false;
      }

      // Set temporary attributes if `{wait: true}`.
      if (attrs && options.wait) {
        this.attributes = _.extend({}, attributes, attrs);
      }

      // After a successful server-side save, the client is (optionally)
      // updated with the server-side state.
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        // Ensure attributes are restored during synchronous saves.
        model.attributes = attributes;
        var serverAttrs = model.parse(resp, options);
        if (options.wait) serverAttrs = _.extend(attrs || {}, serverAttrs);
        if (_.isObject(serverAttrs) && !model.set(serverAttrs, options)) {
          return false;
        }
        if (success) success(model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);

      method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
      if (method === 'patch') options.attrs = attrs;
      xhr = this.sync(method, this, options);

      // Restore attributes.
      if (attrs && options.wait) this.attributes = attributes;

      return xhr;
    },

    // Destroy this model on the server if it was already persisted.
    // Optimistically removes the model from its collection, if it has one.
    // If `wait: true` is passed, waits for the server to respond before removal.
    destroy: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;

      var destroy = function() {
        model.trigger('destroy', model, model.collection, options);
      };

      options.success = function(resp) {
        if (options.wait || model.isNew()) destroy();
        if (success) success(model, resp, options);
        if (!model.isNew()) model.trigger('sync', model, resp, options);
      };

      if (this.isNew()) {
        options.success();
        return false;
      }
      wrapError(this, options);

      var xhr = this.sync('delete', this, options);
      if (!options.wait) destroy();
      return xhr;
    },

    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.
    url: function() {
      var base = _.result(this, 'urlRoot') || _.result(this.collection, 'url') || urlError();
      if (this.isNew()) return base;
      return base + (base.charAt(base.length - 1) === '/' ? '' : '/') + encodeURIComponent(this.id);
    },

    // **parse** converts a response into the hash of attributes to be `set` on
    // the model. The default implementation is just to pass the response along.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new model with identical attributes to this one.
    clone: function() {
      return new this.constructor(this.attributes);
    },

    // A model is new if it has never been saved to the server, and lacks an id.
    isNew: function() {
      return this.id == null;
    },

    // Check if the model is currently in a valid state.
    isValid: function(options) {
      return this._validate({}, _.extend(options || {}, { validate: true }));
    },

    // Run validation against the next complete set of model attributes,
    // returning `true` if all is well. Otherwise, fire an `"invalid"` event.
    _validate: function(attrs, options) {
      if (!options.validate || !this.validate) return true;
      attrs = _.extend({}, this.attributes, attrs);
      var error = this.validationError = this.validate(attrs, options) || null;
      if (!error) return true;
      this.trigger('invalid', this, error, _.extend(options, {validationError: error}));
      return false;
    }

  });

  // Underscore methods that we want to implement on the Model.
  var modelMethods = ['keys', 'values', 'pairs', 'invert', 'pick', 'omit'];

  // Mix in each Underscore method as a proxy to `Model#attributes`.
  _.each(modelMethods, function(method) {
    Model.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.attributes);
      return _[method].apply(_, args);
    };
  });

  // Backbone.Collection
  // -------------------

  // If models tend to represent a single row of data, a Backbone Collection is
  // more analagous to a table full of data ... or a small slice or page of that
  // table, or a collection of rows that belong together for a particular reason
  // -- all of the messages in this particular folder, all of the documents
  // belonging to this particular author, and so on. Collections maintain
  // indexes of their models, both in order, and for lookup by `id`.

  // Create a new **Collection**, perhaps to contain a specific type of `model`.
  // If a `comparator` is specified, the Collection will maintain
  // its models in sort order, as they're added and removed.
  var Collection = Backbone.Collection = function(models, options) {
    options || (options = {});
    if (options.model) this.model = options.model;
    if (options.comparator !== void 0) this.comparator = options.comparator;
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) this.reset(models, _.extend({silent: true}, options));
  };

  // Default options for `Collection#set`.
  var setOptions = {add: true, remove: true, merge: true};
  var addOptions = {add: true, remove: false};

  // Define the Collection's inheritable methods.
  _.extend(Collection.prototype, Events, {

    // The default model for a collection is just a **Backbone.Model**.
    // This should be overridden in most cases.
    model: Model,

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // The JSON representation of a Collection is an array of the
    // models' attributes.
    toJSON: function(options) {
      return this.map(function(model){ return model.toJSON(options); });
    },

    // Proxy `Backbone.sync` by default.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Add a model, or list of models to the set.
    add: function(models, options) {
      return this.set(models, _.extend({merge: false}, options, addOptions));
    },

    // Remove a model, or a list of models from the set.
    remove: function(models, options) {
      var singular = !_.isArray(models);
      models = singular ? [models] : _.clone(models);
      options || (options = {});
      var i, l, index, model;
      for (i = 0, l = models.length; i < l; i++) {
        model = models[i] = this.get(models[i]);
        if (!model) continue;
        delete this._byId[model.id];
        delete this._byId[model.cid];
        index = this.indexOf(model);
        this.models.splice(index, 1);
        this.length--;
        if (!options.silent) {
          options.index = index;
          model.trigger('remove', model, this, options);
        }
        this._removeReference(model);
      }
      return singular ? models[0] : models;
    },

    // Update a collection by `set`-ing a new list of models, adding new ones,
    // removing models that are no longer present, and merging models that
    // already exist in the collection, as necessary. Similar to **Model#set**,
    // the core operation for updating the data contained by the collection.
    set: function(models, options) {
      options = _.defaults({}, options, setOptions);
      if (options.parse) models = this.parse(models, options);
      var singular = !_.isArray(models);
      models = singular ? (models ? [models] : []) : _.clone(models);
      var i, l, id, model, attrs, existing, sort;
      var at = options.at;
      var targetModel = this.model;
      var sortable = this.comparator && (at == null) && options.sort !== false;
      var sortAttr = _.isString(this.comparator) ? this.comparator : null;
      var toAdd = [], toRemove = [], modelMap = {};
      var add = options.add, merge = options.merge, remove = options.remove;
      var order = !sortable && add && remove ? [] : false;

      // Turn bare objects into model references, and prevent invalid models
      // from being added.
      for (i = 0, l = models.length; i < l; i++) {
        attrs = models[i];
        if (attrs instanceof Model) {
          id = model = attrs;
        } else {
          id = attrs[targetModel.prototype.idAttribute];
        }

        // If a duplicate is found, prevent it from being added and
        // optionally merge it into the existing model.
        if (existing = this.get(id)) {
          if (remove) modelMap[existing.cid] = true;
          if (merge) {
            attrs = attrs === model ? model.attributes : attrs;
            if (options.parse) attrs = existing.parse(attrs, options);
            existing.set(attrs, options);
            if (sortable && !sort && existing.hasChanged(sortAttr)) sort = true;
          }
          models[i] = existing;

        // If this is a new, valid model, push it to the `toAdd` list.
        } else if (add) {
          model = models[i] = this._prepareModel(attrs, options);
          if (!model) continue;
          toAdd.push(model);

          // Listen to added models' events, and index models for lookup by
          // `id` and by `cid`.
          model.on('all', this._onModelEvent, this);
          this._byId[model.cid] = model;
          if (model.id != null) this._byId[model.id] = model;
        }
        if (order) order.push(existing || model);
      }

      // Remove nonexistent models if appropriate.
      if (remove) {
        for (i = 0, l = this.length; i < l; ++i) {
          if (!modelMap[(model = this.models[i]).cid]) toRemove.push(model);
        }
        if (toRemove.length) this.remove(toRemove, options);
      }

      // See if sorting is needed, update `length` and splice in new models.
      if (toAdd.length || (order && order.length)) {
        if (sortable) sort = true;
        this.length += toAdd.length;
        if (at != null) {
          for (i = 0, l = toAdd.length; i < l; i++) {
            this.models.splice(at + i, 0, toAdd[i]);
          }
        } else {
          if (order) this.models.length = 0;
          var orderedModels = order || toAdd;
          for (i = 0, l = orderedModels.length; i < l; i++) {
            this.models.push(orderedModels[i]);
          }
        }
      }

      // Silently sort the collection if appropriate.
      if (sort) this.sort({silent: true});

      // Unless silenced, it's time to fire all appropriate add/sort events.
      if (!options.silent) {
        for (i = 0, l = toAdd.length; i < l; i++) {
          (model = toAdd[i]).trigger('add', model, this, options);
        }
        if (sort || (order && order.length)) this.trigger('sort', this, options);
      }
      
      // Return the added (or merged) model (or models).
      return singular ? models[0] : models;
    },

    // When you have more items than you want to add or remove individually,
    // you can reset the entire set with a new list of models, without firing
    // any granular `add` or `remove` events. Fires `reset` when finished.
    // Useful for bulk operations and optimizations.
    reset: function(models, options) {
      options || (options = {});
      for (var i = 0, l = this.models.length; i < l; i++) {
        this._removeReference(this.models[i]);
      }
      options.previousModels = this.models;
      this._reset();
      models = this.add(models, _.extend({silent: true}, options));
      if (!options.silent) this.trigger('reset', this, options);
      return models;
    },

    // Add a model to the end of the collection.
    push: function(model, options) {
      return this.add(model, _.extend({at: this.length}, options));
    },

    // Remove a model from the end of the collection.
    pop: function(options) {
      var model = this.at(this.length - 1);
      this.remove(model, options);
      return model;
    },

    // Add a model to the beginning of the collection.
    unshift: function(model, options) {
      return this.add(model, _.extend({at: 0}, options));
    },

    // Remove a model from the beginning of the collection.
    shift: function(options) {
      var model = this.at(0);
      this.remove(model, options);
      return model;
    },

    // Slice out a sub-array of models from the collection.
    slice: function() {
      return slice.apply(this.models, arguments);
    },

    // Get a model from the set by id.
    get: function(obj) {
      if (obj == null) return void 0;
      return this._byId[obj.id] || this._byId[obj.cid] || this._byId[obj];
    },

    // Get the model at the given index.
    at: function(index) {
      return this.models[index];
    },

    // Return models with matching attributes. Useful for simple cases of
    // `filter`.
    where: function(attrs, first) {
      if (_.isEmpty(attrs)) return first ? void 0 : [];
      return this[first ? 'find' : 'filter'](function(model) {
        for (var key in attrs) {
          if (attrs[key] !== model.get(key)) return false;
        }
        return true;
      });
    },

    // Return the first model with matching attributes. Useful for simple cases
    // of `find`.
    findWhere: function(attrs) {
      return this.where(attrs, true);
    },

    // Force the collection to re-sort itself. You don't need to call this under
    // normal circumstances, as the set will maintain sort order as each item
    // is added.
    sort: function(options) {
      if (!this.comparator) throw new Error('Cannot sort a set without a comparator');
      options || (options = {});

      // Run sort based on type of `comparator`.
      if (_.isString(this.comparator) || this.comparator.length === 1) {
        this.models = this.sortBy(this.comparator, this);
      } else {
        this.models.sort(_.bind(this.comparator, this));
      }

      if (!options.silent) this.trigger('sort', this, options);
      return this;
    },

    // Pluck an attribute from each model in the collection.
    pluck: function(attr) {
      return _.invoke(this.models, 'get', attr);
    },

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `reset: true` is passed, the response
    // data will be passed through the `reset` method instead of `set`.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var success = options.success;
      var collection = this;
      options.success = function(resp) {
        var method = options.reset ? 'reset' : 'set';
        collection[method](resp, options);
        if (success) success(collection, resp, options);
        collection.trigger('sync', collection, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Create a new instance of a model in this collection. Add the model to the
    // collection immediately, unless `wait: true` is passed, in which case we
    // wait for the server to agree.
    create: function(model, options) {
      options = options ? _.clone(options) : {};
      if (!(model = this._prepareModel(model, options))) return false;
      if (!options.wait) this.add(model, options);
      var collection = this;
      var success = options.success;
      options.success = function(model, resp, options) {
        if (options.wait) collection.add(model, options);
        if (success) success(model, resp, options);
      };
      model.save(null, options);
      return model;
    },

    // **parse** converts a response into a list of models to be added to the
    // collection. The default implementation is just to pass it through.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new collection with an identical list of models as this one.
    clone: function() {
      return new this.constructor(this.models);
    },

    // Private method to reset all internal state. Called when the collection
    // is first initialized or reset.
    _reset: function() {
      this.length = 0;
      this.models = [];
      this._byId  = {};
    },

    // Prepare a hash of attributes (or other model) to be added to this
    // collection.
    _prepareModel: function(attrs, options) {
      if (attrs instanceof Model) {
        if (!attrs.collection) attrs.collection = this;
        return attrs;
      }
      options = options ? _.clone(options) : {};
      options.collection = this;
      var model = new this.model(attrs, options);
      if (!model.validationError) return model;
      this.trigger('invalid', this, model.validationError, options);
      return false;
    },

    // Internal method to sever a model's ties to a collection.
    _removeReference: function(model) {
      if (this === model.collection) delete model.collection;
      model.off('all', this._onModelEvent, this);
    },

    // Internal method called every time a model in the set fires an event.
    // Sets need to update their indexes when models change ids. All other
    // events simply proxy through. "add" and "remove" events that originate
    // in other collections are ignored.
    _onModelEvent: function(event, model, collection, options) {
      if ((event === 'add' || event === 'remove') && collection !== this) return;
      if (event === 'destroy') this.remove(model, options);
      if (model && event === 'change:' + model.idAttribute) {
        delete this._byId[model.previous(model.idAttribute)];
        if (model.id != null) this._byId[model.id] = model;
      }
      this.trigger.apply(this, arguments);
    }

  });

  // Underscore methods that we want to implement on the Collection.
  // 90% of the core usefulness of Backbone Collections is actually implemented
  // right here:
  var methods = ['forEach', 'each', 'map', 'collect', 'reduce', 'foldl',
    'inject', 'reduceRight', 'foldr', 'find', 'detect', 'filter', 'select',
    'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke',
    'max', 'min', 'toArray', 'size', 'first', 'head', 'take', 'initial', 'rest',
    'tail', 'drop', 'last', 'without', 'difference', 'indexOf', 'shuffle',
    'lastIndexOf', 'isEmpty', 'chain'];

  // Mix in each Underscore method as a proxy to `Collection#models`.
  _.each(methods, function(method) {
    Collection.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.models);
      return _[method].apply(_, args);
    };
  });

  // Underscore methods that take a property name as an argument.
  var attributeMethods = ['groupBy', 'countBy', 'sortBy'];

  // Use attributes instead of properties.
  _.each(attributeMethods, function(method) {
    Collection.prototype[method] = function(value, context) {
      var iterator = _.isFunction(value) ? value : function(model) {
        return model.get(value);
      };
      return _[method](this.models, iterator, context);
    };
  });

  // Backbone.View
  // -------------

  // Backbone Views are almost more convention than they are actual code. A View
  // is simply a JavaScript object that represents a logical chunk of UI in the
  // DOM. This might be a single item, an entire list, a sidebar or panel, or
  // even the surrounding frame which wraps your whole app. Defining a chunk of
  // UI as a **View** allows you to define your DOM events declaratively, without
  // having to worry about render order ... and makes it easy for the view to
  // react to specific changes in the state of your models.

  // Creating a Backbone.View creates its initial element outside of the DOM,
  // if an existing element is not provided...
  var View = Backbone.View = function(options) {
    this.cid = _.uniqueId('view');
    options || (options = {});
    _.extend(this, _.pick(options, viewOptions));
    this._ensureElement();
    this.initialize.apply(this, arguments);
    this.delegateEvents();
  };

  // Cached regex to split keys for `delegate`.
  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

  // List of view options to be merged as properties.
  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

  // Set up all inheritable **Backbone.View** properties and methods.
  _.extend(View.prototype, Events, {

    // The default `tagName` of a View's element is `"div"`.
    tagName: 'div',

    // jQuery delegate for element lookup, scoped to DOM elements within the
    // current view. This should be preferred to global lookups where possible.
    $: function(selector) {
      return this.$el.find(selector);
    },

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // **render** is the core function that your view should override, in order
    // to populate its element (`this.el`), with the appropriate HTML. The
    // convention is for **render** to always return `this`.
    render: function() {
      return this;
    },

    // Remove this view by taking the element out of the DOM, and removing any
    // applicable Backbone.Events listeners.
    remove: function() {
      this.$el.remove();
      this.stopListening();
      return this;
    },

    // Change the view's element (`this.el` property), including event
    // re-delegation.
    setElement: function(element, delegate) {
      if (this.$el) this.undelegateEvents();
      this.$el = element instanceof Backbone.$ ? element : Backbone.$(element);
      this.el = this.$el[0];
      if (delegate !== false) this.delegateEvents();
      return this;
    },

    // Set callbacks, where `this.events` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save',
    //       'click .open':       function(e) { ... }
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    // This only works for delegate-able events: not `focus`, `blur`, and
    // not `change`, `submit`, and `reset` in Internet Explorer.
    delegateEvents: function(events) {
      if (!(events || (events = _.result(this, 'events')))) return this;
      this.undelegateEvents();
      for (var key in events) {
        var method = events[key];
        if (!_.isFunction(method)) method = this[events[key]];
        if (!method) continue;

        var match = key.match(delegateEventSplitter);
        var eventName = match[1], selector = match[2];
        method = _.bind(method, this);
        eventName += '.delegateEvents' + this.cid;
        if (selector === '') {
          this.$el.on(eventName, method);
        } else {
          this.$el.on(eventName, selector, method);
        }
      }
      return this;
    },

    // Clears all callbacks previously bound to the view with `delegateEvents`.
    // You usually don't need to use this, but may wish to if you have multiple
    // Backbone views attached to the same DOM element.
    undelegateEvents: function() {
      this.$el.off('.delegateEvents' + this.cid);
      return this;
    },

    // Ensure that the View has a DOM element to render into.
    // If `this.el` is a string, pass it through `$()`, take the first
    // matching element, and re-assign it to `el`. Otherwise, create
    // an element from the `id`, `className` and `tagName` properties.
    _ensureElement: function() {
      if (!this.el) {
        var attrs = _.extend({}, _.result(this, 'attributes'));
        if (this.id) attrs.id = _.result(this, 'id');
        if (this.className) attrs['class'] = _.result(this, 'className');
        var $el = Backbone.$('<' + _.result(this, 'tagName') + '>').attr(attrs);
        this.setElement($el, false);
      } else {
        this.setElement(_.result(this, 'el'), false);
      }
    }

  });

  // Backbone.sync
  // -------------

  // Override this function to change the manner in which Backbone persists
  // models to the server. You will be passed the type of request, and the
  // model in question. By default, makes a RESTful Ajax request
  // to the model's `url()`. Some possible customizations could be:
  //
  // * Use `setTimeout` to batch rapid-fire updates into a single request.
  // * Send up the models as XML instead of JSON.
  // * Persist models via WebSockets instead of Ajax.
  //
  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
  // as `POST`, with a `_method` parameter containing the true HTTP method,
  // as well as all requests with the body as `application/x-www-form-urlencoded`
  // instead of `application/json` with the model in a param named `model`.
  // Useful when interfacing with server-side languages like **PHP** that make
  // it difficult to read the body of `PUT` requests.
  Backbone.sync = function(method, model, options) {
    var type = methodMap[method];

    // Default options, unless specified.
    _.defaults(options || (options = {}), {
      emulateHTTP: Backbone.emulateHTTP,
      emulateJSON: Backbone.emulateJSON
    });

    // Default JSON-request options.
    var params = {type: type, dataType: 'json'};

    // Ensure that we have a URL.
    if (!options.url) {
      params.url = _.result(model, 'url') || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(options.attrs || model.toJSON(options));
    }

    // For older servers, emulate JSON by encoding the request into an HTML-form.
    if (options.emulateJSON) {
      params.contentType = 'application/x-www-form-urlencoded';
      params.data = params.data ? {model: params.data} : {};
    }

    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
    // And an `X-HTTP-Method-Override` header.
    if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
      params.type = 'POST';
      if (options.emulateJSON) params.data._method = type;
      var beforeSend = options.beforeSend;
      options.beforeSend = function(xhr) {
        xhr.setRequestHeader('X-HTTP-Method-Override', type);
        if (beforeSend) return beforeSend.apply(this, arguments);
      };
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET' && !options.emulateJSON) {
      params.processData = false;
    }

    // If we're sending a `PATCH` request, and we're in an old Internet Explorer
    // that still has ActiveX enabled by default, override jQuery to use that
    // for XHR instead. Remove this line when jQuery supports `PATCH` on IE8.
    if (params.type === 'PATCH' && noXhrPatch) {
      params.xhr = function() {
        return new ActiveXObject("Microsoft.XMLHTTP");
      };
    }

    // Make the request, allowing the user to override any Ajax options.
    var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
    model.trigger('request', model, xhr, options);
    return xhr;
  };

  var noXhrPatch = typeof window !== 'undefined' && !!window.ActiveXObject && !(window.XMLHttpRequest && (new XMLHttpRequest).dispatchEvent);

  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'patch':  'PATCH',
    'delete': 'DELETE',
    'read':   'GET'
  };

  // Set the default implementation of `Backbone.ajax` to proxy through to `$`.
  // Override this if you'd like to use a different library.
  Backbone.ajax = function() {
    return Backbone.$.ajax.apply(Backbone.$, arguments);
  };

  // Backbone.Router
  // ---------------

  // Routers map faux-URLs to actions, and fire events when routes are
  // matched. Creating a new one sets its `routes` hash, if not set statically.
  var Router = Backbone.Router = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  };

  // Cached regular expressions for matching named param parts and splatted
  // parts of route strings.
  var optionalParam = /\((.*?)\)/g;
  var namedParam    = /(\(\?)?:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

  // Set up all inheritable **Backbone.Router** properties and methods.
  _.extend(Router.prototype, Events, {

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function(query, num) {
    //       ...
    //     });
    //
    route: function(route, name, callback) {
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (_.isFunction(name)) {
        callback = name;
        name = '';
      }
      if (!callback) callback = this[name];
      var router = this;
      Backbone.history.route(route, function(fragment) {
        var args = router._extractParameters(route, fragment);
        callback && callback.apply(router, args);
        router.trigger.apply(router, ['route:' + name].concat(args));
        router.trigger('route', name, args);
        Backbone.history.trigger('route', router, name, args);
      });
      return this;
    },

    // Simple proxy to `Backbone.history` to save a fragment into the history.
    navigate: function(fragment, options) {
      Backbone.history.navigate(fragment, options);
      return this;
    },

    // Bind all defined routes to `Backbone.history`. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.
    _bindRoutes: function() {
      if (!this.routes) return;
      this.routes = _.result(this, 'routes');
      var route, routes = _.keys(this.routes);
      while ((route = routes.pop()) != null) {
        this.route(route, this.routes[route]);
      }
    },

    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    _routeToRegExp: function(route) {
      route = route.replace(escapeRegExp, '\\$&')
                   .replace(optionalParam, '(?:$1)?')
                   .replace(namedParam, function(match, optional) {
                     return optional ? match : '([^\/]+)';
                   })
                   .replace(splatParam, '(.*?)');
      return new RegExp('^' + route + '$');
    },

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted decoded parameters. Empty or unmatched parameters will be
    // treated as `null` to normalize cross-browser behavior.
    _extractParameters: function(route, fragment) {
      var params = route.exec(fragment).slice(1);
      return _.map(params, function(param) {
        return param ? decodeURIComponent(param) : null;
      });
    }

  });

  // Backbone.History
  // ----------------

  // Handles cross-browser history management, based on either
  // [pushState](http://diveintohtml5.info/history.html) and real URLs, or
  // [onhashchange](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange)
  // and URL fragments. If the browser supports neither (old IE, natch),
  // falls back to polling.
  var History = Backbone.History = function() {
    this.handlers = [];
    _.bindAll(this, 'checkUrl');

    // Ensure that `History` can be used outside of the browser.
    if (typeof window !== 'undefined') {
      this.location = window.location;
      this.history = window.history;
    }
  };

  // Cached regex for stripping a leading hash/slash and trailing space.
  var routeStripper = /^[#\/]|\s+$/g;

  // Cached regex for stripping leading and trailing slashes.
  var rootStripper = /^\/+|\/+$/g;

  // Cached regex for detecting MSIE.
  var isExplorer = /msie [\w.]+/;

  // Cached regex for removing a trailing slash.
  var trailingSlash = /\/$/;

  // Cached regex for stripping urls of hash and query.
  var pathStripper = /[?#].*$/;

  // Has the history handling already been started?
  History.started = false;

  // Set up all inheritable **Backbone.History** properties and methods.
  _.extend(History.prototype, Events, {

    // The default interval to poll for hash changes, if necessary, is
    // twenty times a second.
    interval: 50,

    // Gets the true hash value. Cannot use location.hash directly due to bug
    // in Firefox where location.hash will always be decoded.
    getHash: function(window) {
      var match = (window || this).location.href.match(/#(.*)$/);
      return match ? match[1] : '';
    },

    // Get the cross-browser normalized URL fragment, either from the URL,
    // the hash, or the override.
    getFragment: function(fragment, forcePushState) {
      if (fragment == null) {
        if (this._hasPushState || !this._wantsHashChange || forcePushState) {
          fragment = this.location.pathname;
          var root = this.root.replace(trailingSlash, '');
          if (!fragment.indexOf(root)) fragment = fragment.slice(root.length);
        } else {
          fragment = this.getHash();
        }
      }
      return fragment.replace(routeStripper, '');
    },

    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    start: function(options) {
      if (History.started) throw new Error("Backbone.history has already been started");
      History.started = true;

      // Figure out the initial configuration. Do we need an iframe?
      // Is pushState desired ... is it available?
      this.options          = _.extend({root: '/'}, this.options, options);
      this.root             = this.options.root;
      this._wantsHashChange = this.options.hashChange !== false;
      this._wantsPushState  = !!this.options.pushState;
      this._hasPushState    = !!(this.options.pushState && this.history && this.history.pushState);
      var fragment          = this.getFragment();
      var docMode           = document.documentMode;
      var oldIE             = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));

      // Normalize root to always include a leading and trailing slash.
      this.root = ('/' + this.root + '/').replace(rootStripper, '/');

      if (oldIE && this._wantsHashChange) {
        this.iframe = Backbone.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo('body')[0].contentWindow;
        this.navigate(fragment);
      }

      // Depending on whether we're using pushState or hashes, and whether
      // 'onhashchange' is supported, determine how we check the URL state.
      if (this._hasPushState) {
        Backbone.$(window).on('popstate', this.checkUrl);
      } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
        Backbone.$(window).on('hashchange', this.checkUrl);
      } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }

      // Determine if we need to change the base url, for a pushState link
      // opened by a non-pushState browser.
      this.fragment = fragment;
      var loc = this.location;
      var atRoot = loc.pathname.replace(/[^\/]$/, '$&/') === this.root;

      // Transition from hashChange to pushState or vice versa if both are
      // requested.
      if (this._wantsHashChange && this._wantsPushState) {

        // If we've started off with a route from a `pushState`-enabled
        // browser, but we're currently in a browser that doesn't support it...
        if (!this._hasPushState && !atRoot) {
          this.fragment = this.getFragment(null, true);
          this.location.replace(this.root + this.location.search + '#' + this.fragment);
          // Return immediately as browser will do redirect to new url
          return true;

        // Or if we've started out with a hash-based route, but we're currently
        // in a browser where it could be `pushState`-based instead...
        } else if (this._hasPushState && atRoot && loc.hash) {
          this.fragment = this.getHash().replace(routeStripper, '');
          this.history.replaceState({}, document.title, this.root + this.fragment + loc.search);
        }

      }

      if (!this.options.silent) return this.loadUrl();
    },

    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
    // but possibly useful for unit testing Routers.
    stop: function() {
      Backbone.$(window).off('popstate', this.checkUrl).off('hashchange', this.checkUrl);
      clearInterval(this._checkUrlInterval);
      History.started = false;
    },

    // Add a route to be tested when the fragment changes. Routes added later
    // may override previous routes.
    route: function(route, callback) {
      this.handlers.unshift({route: route, callback: callback});
    },

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`, normalizing across the hidden iframe.
    checkUrl: function(e) {
      var current = this.getFragment();
      if (current === this.fragment && this.iframe) {
        current = this.getFragment(this.getHash(this.iframe));
      }
      if (current === this.fragment) return false;
      if (this.iframe) this.navigate(current);
      this.loadUrl();
    },

    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.
    loadUrl: function(fragment) {
      fragment = this.fragment = this.getFragment(fragment);
      return _.any(this.handlers, function(handler) {
        if (handler.route.test(fragment)) {
          handler.callback(fragment);
          return true;
        }
      });
    },

    // Save a fragment into the hash history, or replace the URL state if the
    // 'replace' option is passed. You are responsible for properly URL-encoding
    // the fragment in advance.
    //
    // The options object can contain `trigger: true` if you wish to have the
    // route callback be fired (not usually desirable), or `replace: true`, if
    // you wish to modify the current URL without adding an entry to the history.
    navigate: function(fragment, options) {
      if (!History.started) return false;
      if (!options || options === true) options = {trigger: !!options};

      var url = this.root + (fragment = this.getFragment(fragment || ''));

      // Strip the fragment of the query and hash for matching.
      fragment = fragment.replace(pathStripper, '');

      if (this.fragment === fragment) return;
      this.fragment = fragment;

      // Don't include a trailing slash on the root.
      if (fragment === '' && url !== '/') url = url.slice(0, -1);

      // If pushState is available, we use it to set the fragment as a real URL.
      if (this._hasPushState) {
        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

      // If hash changes haven't been explicitly disabled, update the hash
      // fragment to store history.
      } else if (this._wantsHashChange) {
        this._updateHash(this.location, fragment, options.replace);
        if (this.iframe && (fragment !== this.getFragment(this.getHash(this.iframe)))) {
          // Opening and closing the iframe tricks IE7 and earlier to push a
          // history entry on hash-tag change.  When replace is true, we don't
          // want this.
          if(!options.replace) this.iframe.document.open().close();
          this._updateHash(this.iframe.location, fragment, options.replace);
        }

      // If you've told us that you explicitly don't want fallback hashchange-
      // based history, then `navigate` becomes a page refresh.
      } else {
        return this.location.assign(url);
      }
      if (options.trigger) return this.loadUrl(fragment);
    },

    // Update the hash location, either replacing the current entry, or adding
    // a new one to the browser history.
    _updateHash: function(location, fragment, replace) {
      if (replace) {
        var href = location.href.replace(/(javascript:|#).*$/, '');
        location.replace(href + '#' + fragment);
      } else {
        // Some browsers require that `hash` contains a leading #.
        location.hash = '#' + fragment;
      }
    }

  });

  // Create the default Backbone.history.
  Backbone.history = new History;

  // Helpers
  // -------

  // Helper function to correctly set up the prototype chain, for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  var extend = function(protoProps, staticProps) {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && _.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) _.extend(child.prototype, protoProps);

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
  };

  // Set up inheritance for the model, collection, router, view and history.
  Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;

  // Throw an error when a URL is needed, and none is supplied.
  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };

  // Wrap an optional error callback with a fallback error event.
  var wrapError = function(model, options) {
    var error = options.error;
    options.error = function(resp) {
      if (error) error(model, resp, options);
      model.trigger('error', model, resp, options);
    };
  };

}).call(this);


/**
 * 
 */
(function($,undefined) {	
	if (!ND) var ND = window.ND = window.ND || {};
	/***
	 * WARNING: SINGLETON ALERT!  SINGLETON ALERT!  CODE: BLACK!
	 */
	ND.PriceFormatter = {
		
		/**
		 * true,0 -> true means use delimiter or not. , means use comma as delimitor for prices, 0 means how many decimal places should be displayed
		 * 
		 * for example if we have true,0 
		 * 
		 * input 2000.00 -> output 2,000
		 *
		 * if we have false,2
		 * 
		 * input 2000 -> output 2000.00
		 * input 2000.999 -> output 2000.99
		 * 
		 * if we have true/2
		 * 
		 * input 2000 -> output 2/000.00
		 * input 2000.999 -> output 2/000.99
		 * 
		 * $ %1
		 * 
		 * 
		 * Internal methods for priceFormatter, shamelessly borrowed from jquery.priceformat.js version 1.7 <http://jquerypriceformat.com>
		 * Originally created By Eduardo Cuducos cuducos [at] gmail [dot] com, and maintained by Flavio Silveira flavio [at] gmail [dot] com
		 * 
		 * usage: var PF = new ND.PriceFormatter({"prefix": "$", thousandsSeparator: ", ", centsLimit: 2});
		 * PF.format("2000.00");
		 */
		initialise: function(options) {
			var defaults =
			{
				data: 'true,0',
				formatString: '',
				prefix: '',
	            suffix: '',
				centsSeparator: '.',
				thousandsSeparator: '',
				limit: false,
				centsLimit: 0,
				clearPrefix: false,
	            clearSufix: false,
				allowNegative: false,
				forceDecimal: false
			};
			
			ND.PriceFormatter.options = $.extend({},defaults, options);
			// Deals with parsing the data options passed to the constructor
			var s = ND.PriceFormatter.options.data.match(/\W+/g);
			var d = ND.PriceFormatter.options.data.split(s);
			if (d[0] === "true") {
				ND.PriceFormatter.options.thousandsSeparator = ND.PriceFormatter.options.thousandsSeparator;
			} else {
				ND.PriceFormatter.options.thousandsSeparator = defaults.thousandsSeparator;
			}
			if (parseInt(d[1]) > 0) {
				ND.PriceFormatter.options.forceDecimal = true;
				ND.PriceFormatter.options.centsLimit = parseInt(d[1]);
			} 
		},
			
			// pre defined options
		internalFormatter: function(value) {
				var obj = value;
				var is_number = /[0-9]/;
		
				// load the pluggings settings
				var prefix = ND.PriceFormatter.options.prefix;
		        var suffix = ND.PriceFormatter.options.suffix;
				var centsSeparator = ND.PriceFormatter.options.centsSeparator;
				var thousandsSeparator = ND.PriceFormatter.options.thousandsSeparator;
				var limit = ND.PriceFormatter.options.limit;
				var centsLimit = ND.PriceFormatter.options.centsLimit;
				var clearPrefix = ND.PriceFormatter.options.clearPrefix;
		        var clearSuffix = ND.PriceFormatter.options.clearSuffix;
				var allowNegative = ND.PriceFormatter.options.allowNegative;
		
				// skip everything that isn't a number
				// and also skip the left zeroes
				function to_numbers (str)
				{
					var formatted = '';
					for (var i=0;i<(str.length);i++)
					{
						char_ = str.charAt(i);
						if (formatted.length==0 && char_==0) char_ = false;
		
						if (char_ && char_.match(is_number))
						{
							if (limit)
							{
								if (formatted.length < limit) formatted = formatted+char_;
							}
							else
							{
								formatted = formatted+char_;
							}
						}
					}
		
					return formatted;
				}
		
				// format to fill with zeros to complete cents chars
				function fill_with_zeroes (str)
				{
					while (str.length<(centsLimit+1)) str = '0'+str;
					return str;
				}
		
				// format as price
				function price_format (str)
				{
					// formatting settings
					var formatted = fill_with_zeroes(to_numbers(str));
					var thousandsFormatted = '';
					var thousandsCount = 0;
		
					// split integer from cents
					var centsVal = formatted.substr(formatted.length-centsLimit,centsLimit);
					var integerVal = formatted.substr(0,formatted.length-centsLimit);
		
					// apply cents pontuation
					formatted = integerVal+centsSeparator+centsVal;
		
					// apply thousands pontuation
					if (thousandsSeparator)
					{
						for (var j=integerVal.length;j>0;j--)
						{
							char_ = integerVal.substr(j-1,1);
							thousandsCount++;
							if (thousandsCount%3==0) char_ = thousandsSeparator+char_;
							thousandsFormatted = char_+thousandsFormatted;
						}
						if (thousandsFormatted.substr(0,1)==thousandsSeparator) thousandsFormatted = thousandsFormatted.substring(1,thousandsFormatted.length);
						formatted = thousandsFormatted+centsSeparator+centsVal;
					}
		
					// if the string contains a dash, it is negative - add it to the begining (except for zero)
					if (allowNegative && str.indexOf('-') != -1 && (integerVal != 0 || centsVal != 0)) formatted = '-' + formatted;
		
					// apply the prefix
					if (prefix) formatted = prefix+formatted;
		            
		            // apply the suffix
					if (suffix) formatted = formatted+suffix;
		
					return formatted;
				}
		
				// filter what user type (only numbers and functional keys)
				function key_check (e)
				{
					var code = (e.keyCode ? e.keyCode : e.which);
					var typed = String.fromCharCode(code);
					var functional = false;
					var str = obj;
					var newValue = price_format(str+typed);
		
					// allow key numbers, 0 to 9
					if((code >= 48 && code <= 57) || (code >= 96 && code <= 105)) functional = true;
		
					// check Backspace, Tab, Enter, Delete, and left/right arrows
					if (code ==  8) functional = true;
					if (code ==  9) functional = true;
					if (code == 13) functional = true;
					if (code == 46) functional = true;
					if (code == 37) functional = true;
					if (code == 39) functional = true;
					if (allowNegative && (code == 189 || code == 109)) functional = true; // dash as well
		
					if (!functional)
					{
						e.preventDefault();
						e.stopPropagation();
						if (str!=newValue) obj = newValue;
					}
		
				}
		
				// inster formatted price as a value of an input field
				function price_it ()
				{
					var str = obj;
					var price = price_format(str);
					if (str != price) obj = price;
				}
		
				// Add prefix on focus
				function add_prefix()
				{
					var val = obj;
					obj = prefix + val;
				}
		        
		        function add_suffix()
				{
					var val = obj;
					obj = val + suffix;
				}
		
				// Clear prefix on blur if is set to true
				function clear_prefix()
				{
					if($.trim(prefix) != '' && clearPrefix)
					{
						var array = obj.split(prefix);
						obj = array[1];
					}
				}
		        
		        // Clear suffix on blur if is set to true
				function clear_suffix()
				{
					if($.trim(suffix) != '' && clearSuffix)
					{
						var array = obj.split(suffix);
						obj = array[0];
					}
				}
				
				price_it();
				return obj;
			},
			
			// Pad with leading zeros
			pad : function(num, size) {
			    var s = num+"";
			    while (s.length < size) s = "0" + s;
			    return s;
			},
		
			format: function(value) {
				var result = value = value.toString();
				try {
					if (ND.PriceFormatter.options === undefined) {
						throw 'Priceformatter not initialized';
					}
					
					//first replace the . coming from the server with centsSeperator
					value = value.replace('.', ND.PriceFormatter.options.centsSeparator);
					
//					console.log('value before : ' + value);
					
				    var length = 0;
				    var centsLimit = ND.PriceFormatter.options.centsLimit;
				    var decimalIdx = value.indexOf(ND.PriceFormatter.options.centsSeparator);
				    //if centsLimit is greater than zero but value has no decimal for instance if we have 500 but 
				    //centLimit = 3 then this line will convert 500 to 500.000
					if (centsLimit > 0 && decimalIdx === -1) {
						value += ND.PriceFormatter.options.centsSeparator + ND.PriceFormatter.pad("0", centsLimit);
						
//						console.log('value += ND.PriceFormatter.options.centsSeparator + ND.PriceFormatter.pad("0", centsLimit) : ' + value);
						
					} else if (decimalIdx > 0 && ((length = value.substring(decimalIdx + 1, value.length).length) < centsLimit)) {
						
//						console.log('value.substring(decimalIdx + 1, value.length): ' + value.substring(decimalIdx + 1, value.length));
						
						value += ND.PriceFormatter.pad("0", centsLimit - length);
						
//						console.log('value += ND.PriceFormatter.pad("0",  - length) : ' + value);
						
					} else if (length > centsLimit) { //value = 100.00000  but cent limit is 2 
						 value = value.substring(0, decimalIdx + 1 + centsLimit);
						 
//						 console.log('value = value.substring(0, decimalIdx + 1 + centsLimit): ' + value);
					}
					var output = ND.PriceFormatter.internalFormatter(value);
					if (!ND.PriceFormatter.options.forceDecimal) {
//						console.log('index of ' + ND.PriceFormatter.options.centsSeparator + ' in ' + output + ' is (output.indexOf(ND.PriceFormatter.options.centsSeparator)): ' + output.indexOf(ND.PriceFormatter.options.centsSeparator));
						output = output.substring(0,output.indexOf(ND.PriceFormatter.options.centsSeparator));
						
//						console.log('output = output.substring(0,output.indexOf(ND.PriceFormatter.options.centsSeparator)); ' + output);
					}
					result = ND.PriceFormatter.options.formatString.replace("%1", output);
					
//					console.log('result: ' + result);
					
				} catch(e) {
					throw e;
				}
				
				return result;
			}
	}; // End of Price Formatter singleton
	
})(jQuery);


/**
 * @author Sohrab Zabetian 
 */

/**
 * Backbone customized Collection functions
 */
Backbone.Collection.prototype.selectable = function() {
	//by default all collection have selection capability.
	//it allows the collection to mark which model is currently visible,
	//selected by the user
	return true;
};

Backbone.Collection.prototype.clickable = function() {
	//by default all collection have selection capability.
	//it allows the collection to mark which model is currently visible,
	//selected by the user
	return false;
};

Backbone.Collection.prototype.supportsMultiSelect = function() {
	//by default all collection have single selection capability.
	return false;
};

/**
 * it allows the collection to mark which model is currently visible
 * @param model
 * @returns whether object was previously selected
 */
Backbone.Collection.prototype.select = function(model) {
	if (this.selectable()) {
		if (!this.supportsMultiSelect()) {
			var selectedObjts = this.where({selected : true});
			if(selectedObjts != null) {
				_.each(selectedObjts, function(obj){
					if (obj.id !== model.id) {
						obj.set('selected', false);
					}
				});
			}
		}
		
		model.set('selected', true);
		if (this.clickable()) {
			model.set('clicked', false);
		}
		return true;
	}
	return false;
};

Backbone.Collection.prototype.deselectAll = function() {
	if (this.selectable()) {
		
		var selectedObjts = this.where({selected : true});
		if(selectedObjts != null) {
			isClickable = this.clickable();
			_.each(selectedObjts, function(obj){
				obj.set('selected', false);
				if (isClickable) {
					obj.set('clicked', false);
				}
			});
		}
	}
};

Backbone.Collection.prototype.click = function(model) {
	if (this.clickable()) {
		var clickedObjects = this.where({clicked : true});
		if(clickedObjects != null) {
			_.each(clickedObjects, function(obj){
				if (obj.id != model.id) {
					obj.set('clicked', false);
				}
			});
		}
		//Util.log('model ' + model.get('id') + ' was clicked');
		model.set('clicked', true);
	}
};

/**
 * Allows the collection to mark which model is currently visible/selected
 * @param id of the model
 * @returns selected model
 */
Backbone.Collection.prototype.selectById = function(id) {
	var model = null;
	if (this.selectable()) {
		var models = this.where({id: id});
		if (models && models.length > 0) {
			 this.select(model = models[0]);
		}
	}
	
	return model;
};

/**
 * Allows the collection to mark which model is currently visible/selected
 * @param id of the model
 * @returns selected model
 */
Backbone.Collection.prototype.clickById = function(id) {
	var model = null;
	if (this.clickable()) {
		var models = this.where({id: id});
		if (models && models.length > 0) {
			 this.click(model = models[0]);
		}
	}
	
	return model;
};

/**
 * it allows the collection to mark which model is currently visible
 */
Backbone.Collection.prototype.getSelected = function() {
	if (this.selectable()) {
		var selectedObjects = this.where({
			selected : true
		});
		if (selectedObjects && selectedObjects != null &&
			 selectedObjects.length > 0) {
			if (this.supportsMultiSelect()) {
				return selectedObjects;
			} else {
				return selectedObjects[0];
			}
		}
	}
	// console.log('could not find any selected objects');
	return null;
};


Backbone.Collection.prototype.getClicked = function() {
	if (this.clickable()) {
		var clickedObjects = this.where({clicked : true});
		if (clickedObjects && clickedObjects != null
				&& clickedObjects.length > 0) {
			return clickedObjects[0];
		}
	}
	return null;
};

Backbone.Collection.prototype.unclick = function(model) {
	if (this.clickable()) {
		var clickedObjects = this.where({clicked : true, id : model.get('id')});
		if (clickedObjects && clickedObjects != null) {
			clickedObjects[0].set('clicked', false);
			return true;
		}
	}
	return false;
}

/**
 * Backbone Customized View functions
 */

/**
 * Changes jQuery template tags to {{ }} instead of <% %> to avoid java tag clash
 * 
 */
_.templateSettings = {
	interpolate : /\{\{(.+?)\}\}/g,
	evaulate : /\{\[(.+?)\]\}/g
 };

 
/**
 * Customize backbone view to include destroy View functionality
 */
Backbone.View.prototype.destroy = function() {
  this.remove();
  this.unbind();
  Events.unbind(null,this);
  /**
   * if view has children, close the children as well
   */
  if (this.children) {
	  _.each(this.children, function(child) {
		 child.destroy(); 
	  });
	  this.children = [];  
  }
};

/**
 * default render method
 * @param id
 * @returns {Backbone.View}
 */
Backbone.View.prototype.render = function() {
	 var html = $(this.template(this.model.toJSON()));
	//TODO: change this to minimize reflow
	 this.translate(html);
	 $(this.el).html(html);
	 return this;
};

Backbone.View.prototype.translate = function(selector) {
	if (!selector) {
		selector = $(this.el);
	}
	Views.Helper.translateTextOnView(selector);
};

Backbone.View.prototype.lazyload = function(selector) {
	$(selector ? selector : 'div.thumb-lazy').each(function() {
	    var $div = $(this);
	    var src = $div.data('src');
	    var img = new Image();
		
		// call this function after it's loaded
		img.onload = function() {
			// make wrapper fully visible
			$div.html(img);
			img.alt = $div.data('alt');
		};
		// begin loading the image from www.flickr.com
		img.src = src;
		
	});
	
};




/**
 * @author Sohrab Zabetian
 * @description Custom Backbone overwrites
 * @project Lincoln Build and Price
 */

_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/gim,
    evaluate: /\{\(\{(.+?)\}\)\}/gim
};

//delete window.console;

Backbone.View.prototype.render = function() {
    $(this.el).html($(this.template(this.model.toJSON())));
    return this;
};

/**
 * Customize backbone view to include destroy View functionality
 */
Backbone.View.prototype.destroy = function() {
    this.off();
    this.remove();
    Backbone.off(null,this);
    /**
     * if view has children, close the children as well
     */
    if (this.children) {
        _.each(this.children, function(child) {
            child.destroy();
        });
        this.children = [];
    }
};


/**
 * @author Sohrab Zabetian
 * @description Events for Lincoln Build and price
 * @project Lincoln Build and Price
 */
ND.LBP = {};
ND.LBP.Events = {
	RegisterModule : 'RegisterModuleEvent',
    GetPage : 'GetPageEvent',
   // NavToNameplate : 'NavToNameplatePageEvent',
   ChangePage: 'ChangePageEvent',  //fired when a module is ready to render a page and requests a page change.

   // InitModules: 'InitModules', //fired by Lincoln app to let modules know they should start..by this point the app has
                               //been initialised.

    NameplateSelected : 'NameplateSelectedEvent',

    SeriesEngineSelected : 'SeriesEngineSelectedEvent',

    //SaveInCookie : 'SaveInCookieEvent',

    LoadFromCookie : 'LoadFromCookieEvent',

    ObjectUpdated:  'ObjectUpdatedEvent',

    ReloadingConfig: 'ReloadingConfigEvent',

    LocationChanged : 'LocationChangedEvent',

    LocationCanceled: 'LocationCanceledEvent',

    ToggleGalleryView: 'ToggleGalleryViewEvent',

    TriggerConflictResolution: 'TriggerConflictResolutionEvent',

    ConfirmSeriesChange: 'ConfirmSeriesChangeEvent',

    AcceptConflictResolution: 'AcceptConflictResolutionEvent',

    RejectConflictResolution : 'RejectConflictResolutionEvent',

    ShareConfigReady: 'ShareConfigReadyEvent',

    ChangeSeries: 'ChangeSeries',

    StartOver: 'StartOverEvent',

    AppStateIsNull: 'AppStateIsNullEvent',

    TryAgain: 'TryAgainEvent',

    ShowLocationOverlay: 'ShowLocationOverlayEvent',

    HideLocationOverlay: 'HideLocationOverlayEvent',

    HeaderLinkClicked: ':HeaderLinkClickedEvent',

    GeneratePDF: 'GeneratePDFEvent',

    ShareConfiguration: 'ShareConfigurationEvent',

    SaveConfiguration: 'SaveConfigurationEvent',

    SaveConfigReady: 'SaveConfigReadyEvent',

    ShareConfiguration: 'ShareConfigurationEvent',

    SaveProgress: 'SaveProgressEvent',

    UnsubscribeFromEvents: 'UnsubscribeFromEventsEvent', //triggered when route changes to ensure no module is handling other pages events

    ErrorOccurred: 'ErrorOccurredEvent',

    SuccessfullySaved: 'SuccessfullySavedEvent',

    CloseOverlay: 'CloseOverlayEvent',

    AccessoryToggled : 'AccessoryToggledEvent',

    ImageGroupUpdated: 'ImageGroupUpdatedEvent',

    ButtonClicked: 'ButtonClickedEvent',

    SummaryButtonsLoaded: 'SummaryButtonsLoadedEvent',

    BlockUI : 'BlockUIEvent',

    UnblockUI : 'UnblockUIEvent',

    LocationUpdated: 'Omni:LocationUpdatedEvent',

    TrackOmniture: 'Omni:TrackOmnitureEvent',

    NameplateChanged: 'Omni:NameplateChangedEvent',

    //OrientationChanged : ':Omni:OrientationChangedEvent',
    ViewPDF: 'Omni:ViewPDFEvent',

    ColorSelected : 'Omni:ColorSelectedEvent',

    RimSelected : 'Omni:RimSelectedEvent',

    TrimSelected : 'Omni:TrimSelectedEvent',

    FabricSelected : 'Omni:FabricSelectedEvent',

    AccessorySelected: 'Omni:AccessorySelectedEvent',

    SocialLinkClicked: 'Omni:SocialLinkClickedEvent'


};


/**
 * @author Sohrab Zabetian
 * @description Constants for Lincoln Build and price
 * @project Lincoln Build and Price
 */

ND.LBP.Constants = {
    MOBILE_SCREEN_SIZE: 768,
    TABLET_SCREEN_SIZE: 977,
    SELECTED_STATES : ['DEFAULT', 'SELECTED', 'INCLUDED'],
    FEATURE_GROUPS: 'featureGroups',
    CONTINUE: 'CONTINUE',
    NEXT: 'next',
    PREV: 'prev',
    CONNECT: 'connect',
    USER_LOCATION : 'userLocation',
    IMAGES : 'images',
    LAYERS: 'layers',
    PRICES : 'prices',
    FEATURES : 'features',
    SERIES : 'series',
    EXTERIOR : 'exterior',
    WHEELS_FEATURE_GROUP : 'Wheels',
    INTERIOR : 'interior',
    ACCESSORIES : 'accessories',
    NO_USER_CHOICE: 'noUserChoice',
    IMAGE_GROUPS : 'imageGroups',
    DERIVATIVES: 'features',
    UNIQUE_FEATURES: 'uniqueFeatures',
    ENGINES : 'options',
    SIDEBAR_MESSAGES : 'selectionMessages',
    DESCRIPTION: 'description',
    STATE: 'state',
    NAME : 'name',
    NAMEPLATE_PAGE_NAME: 'nameplates',
    SERIES_PAGE_NAME: 'series',
    ACCESSORIES_PAGE_NAME : 'exterior',
    SUMMARY_PAGE_NAME: 'summary',
    MODEL_OVERLAY_PAGE_NAME: 'overlay',
    RELOAD_CONFIG_PAGE_NAME: 'reload',
    SPECIAL_TYPE : 'specialType',
    COLOUR_TAB_ID : 'Colours',
    RIMS_TAB_ID : 'Wheels',
    INTERIOR_TRIM_TAB_ID : 'InteriorTrim',
    INTERIOR_FABRIC_TAB_ID: 'InteriorFabric',
    FEATURE_THEME: 'Theme'
};


/**
 * @author Sohrab Zabetian
 * @description Utils used in Lincoln Build and price
 * @project Lincoln Build and Price
 */

ND.LBP.Utils = (function () {
    return {
        /**
         *  convert strings with / to some random text
         *  for instance convert B/C to BAZXXZAC
         * @param str
         * @returns {string}
         */
        removeDotSlash: function (str) {

            return str.split('/').join('AZX').split('.').join('XZA');
        },

        /**
         *  undo the steps in removeDotSlash
         * @param str
         * @returns {string}
         */
        addDotSlash: function (str) {
            return str.split('AZX').join('/').split('XZA').join('.');
        },

        pad2: function (number) {  // always returns a string
            return (number < 10 ? '0' : '') + number;
        }



    };
})();


/**
 * @author Ocampo Ronnel
 * @description Globals/flags
 * @project Lincoln Build and Price
 */
ND.LBP.Globals = {
	isDerivativePriceHidden: false
};


/**
 * @author Sohrab Zabetian
 * @description models for nameplate module
 * @project Lincoln Build and Price
 *
 *
 *
 *
 *     AVAILABLE     Not-selected - Can be selected by the user (could cause a conflict)
 *     DEFAULT       Selected by the system as part of GForce auto-complete
 *     SELECTED      Selected by the user explicitly
 *     INCLUDED      Selected by the system due to another feature requiring it
 *     EXCLUDED      Not-selected ??? Can be selected by user but will cause a conflict
 *     FORBIDDEN     Should never have features in this state.
 */


ND.LBP.CommonModels = (function() {


    var cm = {};

        cm.StateTable = {
                INCLUDED: {     //Selected by the system due to another feature requiring it
                    label: 'Included',
                    isEnabled: false,
                    isHidden: false,
                    collectWERSCodeInternal: false, //we only want to save features users actually selected, so only selected should be true
                    collectWERSCode: true,
                    priceLabel : 'includedInBasePrice'
                },
                DEFAULT: {       //Selected by the system as part of GForce auto-complete
                    label: 'Remove',
                    isEnabled: true,
                    isHidden: false,
                    collectWERSCodeInternal: false, //we only want to save features users actually selected, so only selected should be true
                    collectWERSCode: true,
                    priceLabel : 'includedInBasePrice'

                },
                AVAILABLE: {        //Not-selected - Can be selected by the user (could cause a conflict)
                    label: 'Apply',
                    isEnabled: true,
                    isHidden: false,
                    collectWERSCodeInternal: false, //we only want to save features users actually selected, so only selected should be true
                    collectWERSCode: false,
                    priceLabel : 'freeToSelect'
                },
                EXCLUDED: {         //Not-selected ?????????????????? Can be selected by user but will cause a conflict
                    label: 'Apply',
                    isEnabled: false,
                    isHidden: true,
                    collectWERSCodeInternal: false, //we only want to save features users actually selected, so only selected should be true
                    collectWERSCode: false,
                    priceLabel: 'error'
                },
                SELECTED: {   //Selected by the user explicitly
                    label: 'Remove',
                    isEnabled: true,
                    isHidden: false,
                    collectWERSCodeInternal: true, //we only want to save features users actually selected, so only selected should be true
                    collectWERSCode: true,
                    priceLabel : 'freeToSelect'

                },
                FORBIDDEN: {    //Should never have features in this state.
                    label: 'Data error',
                    isEnabled: false,
                    isHidden: true,
                    collectWERSCodeInternal: false, //we only want to save features users actually selected, so only selected should be true
                    collectWERSCode: false ,
                    priceLabel: 'error'
                },
                EXCLUDED_INCOMPATIBLE_WITH_SERIES: {
                    label: 'EXCLUDED_INCOMPATIBLE_WITH_SERIES',
                    isEnabled: false,
                    isHidden: true,
                    collectWERSCodeInternal: false, //we only want to save features users actually selected, so only selected should be true
                    collectWERSCode: true,
                    priceLabel: 'error'
                }
            };



//    cm.parseObject =  function(key, type, embeddedData, context) {
//        var existing = context.get(key);
//        if (existing == null) {
//
//            return new type (embeddedData, {parse: true});
//        }
//        existing.set(embeddedData, {parse: true});
//        return existing;
//    };

    cm.formatFeaturePrice = function(feature) {
        var prices = feature.get(ND.LBP.Constants.PRICES);
        if (typeof prices !== 'undefined' && prices != null && prices.length > 0) {

            var price = prices.at(0);
            if (price.get('value') === 0) {
                return cm.StateTable[feature.get(ND.LBP.Constants.STATE)].priceLabel;
            }
            return ND.PriceFormatter.format('' + price.get('value'));
        }
        return null;

    };

    cm.parseFeatureData =  function(key, embeddedData, context) {
        var existing = context.get(key);
        if (existing == null) {
           return  new ND.LBP.CommonCollections.Features(embeddedData, {parse:true});
        }
        existing.set(embeddedData, {parse:true});
        return existing;
    } ;

    cm.parseFeatureGroupData = function(key, embeddedData, context) {
        var existing = context.get(key);
        if (existing == null) {
            return  new ND.LBP.ExteriorCollections.FeatureGroups(embeddedData, {parse:true});
        }
        existing.set(embeddedData, {parse:true});
        return existing;
    };

    cm.parseImageData = function(key, embeddedData, context) {

        var existing = context.get(key);
        if (existing == null) {
            return  new ND.LBP.CommonCollections.Images(embeddedData, {parse:true});
        }
        existing.set(embeddedData, {parse:true});
        return existing;
    };

    cm.parsePriceData = function(key, embeddedData, context) {
        var existing = context.get(key);
        if (existing == null) {
            return new ND.LBP.CommonCollections.Prices(embeddedData, {parse:true});
        }
        existing.set(embeddedData, {parse:true});
        return existing;
    };


    cm.parseImagesAndPrices = function(response, options, context) {
//        var isTarget = response['name'] === 'Panoramic Vista Roof with Power Shades';

        for(var key in context) {
            if (key === ND.LBP.Constants.IMAGES) {
                var embeddedClass = undefined,
                    embeddedData = response[key];
                if (typeof embeddedData !== 'undefined') {
                    embeddedClass = cm.parseImageData(key, embeddedData, context);
                }
                response[key] = embeddedClass;
//                if (isTarget) {
//                    console.log('images ----> ' + JSON.stringify(response[key]));
//                }

            }
            else if (key === ND.LBP.Constants.PRICES ) {
                var embeddedClass = undefined,
                    embeddedData = response[key];
                if (typeof embeddedData !== 'undefined') {
                    embeddedClass = cm.parsePriceData(key, embeddedData, context);
                }
                response[key] = embeddedClass;
//                if (isTarget) {
//                    console.log('prices *******> ' + JSON.stringify(response[key]));
//                }
            }
        }
        return response;
    };

    cm.Image = Backbone.Model.extend({
        id: '',
        defaults :{
            name: '',
            sequence: 1,
            description: '',
            src: ''
        }
    });

    cm.Price = Backbone.Model.extend({
        id: '',
        defaults :{
            name: '',
            value: '0.0',
            currency: ''
        }
    });


    cm.Header =  Backbone.Model.extend({
        name : null,
        defaults : {
            pathURL: '',
            isEnabled: false,
            selected: false
        }

    });


    cm.Sidebar = Backbone.Model.extend({
        defaults: {
            title : '',
            description : '',
            pageName: '',
            state: '',
            total: null,
            hidePDFShare: true,
            hideSave: true,
            hideConnect: false,
            hidePDFButton: false
        },

        initialize: function() {
            //this.set('buttons', new ND.LBP.CommonCollections.NavigationButtons());
        },

        buttons : null,
        mobileButtons: null

    });

    cm.NavigationButton =  Backbone.Model.extend({
        defaults: {
            name: '',
            tooltip : '',
            sequence: 0,
            type: ND.LBP.Constants.NEXT
        },
        nextPageURL : null,
        urlRoot : null

    });

    cm.Feature = Backbone.Model.extend({
        id: null,
        images: null,

        state: '',
        defaults : {
            description: '',
            originalState: null,
            featureLabel: '',
            isHidden: false,
            primaryImageSrc: '',
            isEnabled: false,
            specialType: null,
            price : null,
            selected: false

        },
        prices: null,

        parse: function(response, xhr) {
           return cm.parseImagesAndPrices(response, xhr, this);
        }
    });

    cm.ImageVariant = Backbone.Model.extend({
       view : null,
       layers : null

//       initialize: function()  {
//          // console.log('ImageVariant.initialize ' + this.cid);
//       }
    });

    cm.Confirm = Backbone.Model.extend({
       defaults : {
           oldDerivativeName: '',
           newDerivativeName : ''
       }
    });

    cm.ImageGroup = Backbone.Model.extend({
        id: null,
        name: null,
        web: null,
        mobile: null,


        parse : function(response, options) {
            var self = this;
            for(var key in self) {
                if (key === 'web' || key === 'mobile') {
                    var embeddedClass = null,
                        embeddedData = response[key],
                        existing = self.get(key);
                    if (existing == null) {
                        embeddedClass =  new ND.LBP.CommonCollections.ImageVariants(embeddedData, {parse:true});
                    } else {
                        //console.log(key + ' id: ' + existing.get('id'));
                        existing.set(embeddedData, {parse:true});
                        embeddedClass = existing;
                    }
                    response[key] = embeddedClass;
                }
            }
            return response;
        }
    });

    cm.KeyFeatures = Backbone.Model.extend({
        defaults : {
            series: null,
            uniqueFeatures: null
        }
    });

    cm.UserActivity = Backbone.Model.extend({
        state: null,
        selections: null, //id, selected
        buildSaveURL: function (nameplateId) {
           return ND.LBP.Config.saveUrl.replace(':nameplateId', nameplateId);
        }

    });

    cm.UserSelection = Backbone.Model.extend({
        id : null,
        selected: false
    });

    cm.Error = Backbone.Model.extend({
       defaults: {
           message: null
       }
    });


    return cm;

})();


/**
 * @author Sohrab Zabetian
 * @description collections for nameplate module
 * @project Lincoln Build and Price
 */


ND.LBP.CommonCollections = (function(cm) {


    var cc = {};

    cc.Images = Backbone.Collection.extend({
        model: cm.Image,
        comparator: function(model) {
            return model.get('sequence');
        }
    });

    cc.Prices = Backbone.Collection.extend({
        model: cm.Price
    });

    cc.Headers = Backbone.Collection.extend({
        model: cm.Header
    });

    cc.NavigationButtons =  Backbone.Collection.extend({
        model: cm.NavigationButton
    });

    cc.Features = Backbone.Collection.extend({
       model: cm.Feature
    });

    cc.ImageGroups = Backbone.Collection.extend({
        model: cm.ImageGroup
    });

    cc.ImageVariants = Backbone.Collection.extend({
        model: cm.ImageVariant
//        ,
//
//        initialize: function()  {
//            //console.log('ImageVariants.initialize ' + this.cid);
//        }
    });

    //cc.Layers = Backbone.Collection.extend({ });

    cc.UserSelections = Backbone.Collection.extend({
        model: cm.UserSelection
    });

    return cc;
})(ND.LBP.CommonModels);


/**
 * @author Sohrab Zabetian
 * @description models for nameplate module
 * @project Lincoln Build and Price
 */


ND.LBP.NameplateModels = (function() {


    var m = {};

    m.Nameplate = Backbone.Model.extend({

        id: null,
        images: null,

        defaults : {
            sequence: 1,
            brand: 'Lincoln',
            modelName: '',
            modelYear: '',
            articleUrl: '',
            seriesURL : '',
            modelNavigatorPageUrl: '',
            isModelNavigator: false,
            getModelPageUrl: null
        },

        defaultImage: null,
        rollOverImage: null,

        prices: null,

        parse: function(response, xhr) {
            return ND.LBP.CommonModels.parseImagesAndPrices(response, xhr, this);
        }

    });

    return m;


})();


/**
 * @author Sohrab Zabetian
 * @description collections for nameplate module
 * @project Lincoln Build and Price
 */
ND.LBP.NameplateCollections = (function() {


    var c = {};

    c.Nameplates = Backbone.Collection.extend({
       url: function() {
           return ND.LBP.Config.nameplatesURL;
       },
       comparator: function(model) {
            return model.get('sequence');
       },

       model: ND.LBP.NameplateModels.Nameplate

    });

    return c;

})();


/**
 * @author Sohrab Zabetian
 * @description module for series page
 * @project Lincoln Build and Price
 *
 *
 *     AVAILABLE     Not-selected - Can be selected by the user (could cause a conflict)
 *     DEFAULT       Selected by the system as part of GForce auto-complete
 *     SELECTED      Selected by the user explicitly
 *     INCLUDED      Selected by the system due to another feature requiring it
 *     EXCLUDED      Not-selected ??? Can be selected by user but will cause a conflict
 *     FORBIDDEN     Should never have features in this state.
 */


ND.LBP.NameplateDetailModels = (function () {


    var m = {},

        Constants = {
            hiddenState: 'EXCLUDED_INCOMPATIBLE_WITH_SERIES',
            specialFeatureGroupState: {
                INCLUDED: {     //Selected by the system due to another feature requiring it
                    collectWERSCode: true
                },
                DEFAULT: {       //Selected by the system as part of GForce auto-complete
                    collectWERSCode: true
                },
                AVAILABLE: {        //Not-selected - Can be selected by the user (could cause a conflict)
                    collectWERSCode: false
                },
                EXCLUDED: {         //Not-selected ?????????????????? Can be selected by user but will cause a conflict
                    collectWERSCode: false
                },
                SELECTED: {   //Selected by the user explicitly
                    collectWERSCode: true
                },
                FORBIDDEN: {    //Should never have features in this state.
                    collectWERSCode: false
                },
                EXCLUDED_INCOMPATIBLE_WITH_SERIES: {
                    collectWERSCode: false
                }
            }
        };

    m.parseSeriesData = function (key, embeddedData, context) {

        var existing = context.get(key);
        if (existing == null) {
            return  new m.Series(embeddedData, {parse: true});
        }
        //Series is a Model object, need to parse again
        existing.set(existing.parse(embeddedData), {parse: true});
        return existing;
    };


    m.parseDerivativeData = function (key, embeddedData, context) {

        var existing = context.get(key);
        if (existing == null) {
            return  new ND.LBP.NameplateDetailCollections.Derivatives(embeddedData, {parse: true});
        }
        existing.set(embeddedData, {parse: true});
        return existing;
    };

    m.parseEngineData = function (key, embeddedData, context) {

        var existing = context.get(key);
        if (existing == null) {
            return  new ND.LBP.NameplateDetailCollections.Engines(embeddedData, {parse: true});
        }
        existing.set(embeddedData, {parse: true});
        return existing;
    };

    m.NameplateDetails = Backbone.Model.extend({

        id: null,
        state: null,
        defaults: {
            total: null,
            name: '',
            year: ''
        },
        prices: null,
        noUserChoice: null,
        imageGroups: null,
        series: null,
        accessories: null,
        interior: null,
        exterior: null,
        changes: null,
        selectionMessages: null,

        buildFetchURL: function (id) {
            return ND.LBP.Config.nameplateDetailURL.replace('{{id}}', id);
        },

        initialize: function () {
            //console.log('NameplateDetails.initialize');
            this.on(ND.LBP.Events.ObjectUpdated, function (model, response, options, callback) {
                //console.log(ND.LBP.Events.ObjectUpdated + ' was called');
                this.setAndPostProcess(model, response, options, callback);
            }, this);
            this.on('sync', function (model, response, option) {
                //console.log('sync was called');
                this.syncPostProcess(model, response, option);
            }, this);

        },

        findSelectedEngine: function () {
            var selectedDerivative = this.get(ND.LBP.Constants.SERIES).get(ND.LBP.Constants.DERIVATIVES).getSelected(),
                selectedEngine = selectedDerivative.get(ND.LBP.Constants.ENGINES).getSelected();
            return selectedEngine;
        },

        /**
         * Engine comes in form EN-TNYBCLCYZBAF which includes EN-<somecode><engineId><derivativeId>
         * @param engineId in form EN-TNYBCLCYZBAF
         * @param derivativeId  YZBAF
         * @return YBCLC in EN-TNYBCLCYZBAF
         */
        dissembleEngineId: function (engineId, derivativeId) {
            var engineWERSCode = engineId.replace(derivativeId, ''),
                featureGroups = this.get(ND.LBP.Constants.NO_USER_CHOICE).get(ND.LBP.Constants.FEATURE_GROUPS),
                features;

            _.find(featureGroups.models, function (featureGroup) {
                if (featureGroup.get(ND.LBP.Constants.NAME) === 'Engine') {
                    features = featureGroup.get(ND.LBP.Constants.FEATURES);
                    return _.find(features.models, function (feature) {
                        if (engineWERSCode.indexOf(feature.id) >= 0) {
                            engineWERSCode = engineWERSCode.replace(feature.id, '').replace(/^_/,'').replace(/_$/,''); 
                            return true;
                        }
                    });
                }
            });

            //console.log(engineWERSCode);

            return engineWERSCode;
        },

        getAllWERSCodes: function () {
            return this.getWERSCodes(true, 'collectWERSCode');

        },

        getSelectedWERSCode: function () {
            return this.getWERSCodes(false, 'collectWERSCodeInternal');
        },

        getWERSCodes: function (includeNoUserChoice, stateAttributeToCheck) {
            var allFeatureGroups = [
                    this.get(ND.LBP.Constants.ACCESSORIES).get(ND.LBP.Constants.FEATURE_GROUPS),
                    this.get(ND.LBP.Constants.EXTERIOR).get(ND.LBP.Constants.FEATURE_GROUPS),
                    this.get(ND.LBP.Constants.INTERIOR).get(ND.LBP.Constants.FEATURE_GROUPS)
                ],
                WERSCodes = [],
                features,
                checkSpecialStates;


            if (includeNoUserChoice) {
                allFeatureGroups.push(this.get(ND.LBP.Constants.NO_USER_CHOICE).get(ND.LBP.Constants.FEATURE_GROUPS));
            }
//            var specialCount, specialWERSCode = [],
//                regularCount, regularWERSCode = [];
            _.each(allFeatureGroups, function (featureGroups) {
                _.each(featureGroups.models, function (featureGroup) {
//                    specialCount = regularCount = 0;
//                    specialWERSCode = [];
//                    regularWERSCode = [];
//                    if (checkSpecialGroup) {
//                        console.log(featureGroup.get('name') + ': (ND.LBP.Constants.INTERIOR_FABRIC_TAB_ID === featureGroup.get(ND.LBP.Constants.SPECIAL_TYPE)' + (ND.LBP.Constants.INTERIOR_FABRIC_TAB_ID === featureGroup.get(ND.LBP.Constants.SPECIAL_TYPE)));
//                    }
                    features = featureGroup.get(ND.LBP.Constants.FEATURES);
                    if (typeof features !== 'undefined' && features.length > 0) {
                        _.each(features.models, function (feature) {
                            if (checkSpecialStates && Constants.specialFeatureGroupState[feature.get('state')][stateAttributeToCheck]) {
                                WERSCodes.push(feature.id);
//                                specialCount++;
//                                specialWERSCode.push(feature.id)
                            } else if (!checkSpecialStates && ND.LBP.CommonModels.StateTable[feature.get('state')][stateAttributeToCheck]) {

                                if (feature.get('state') !== Constants.hiddenState ||
                                    feature.get('originalState') != null && Constants.specialFeatureGroupState[feature.get('originalState')][stateAttributeToCheck]) {
                                    WERSCodes.push(feature.id);
//                                    regularCount++;
//                                    regularWERSCode.push(feature.id);
                                }


                            }
                        });
                    }
//                    if (checkSpecialGroup) {
//                        console.log('added specialCount: ' + (specialCount) + ': ' + specialWERSCode + ' regularCount: ' + (regularCount) + ' ' + regularWERSCode + ' WERS code for featureGroup ' + featureGroup.get('name'));
//                    }
                });
            });
//            if (checkSpecialGroup) {
//                console.log('total # of WERSCodes ' + (_.uniq(WERSCodes).length) + ' : ' + _.uniq(WERSCodes));
//            }
            return _.uniq(WERSCodes);
        },

        setAndPostProcess: function (model, response, options, callback) {
            this.set(this.parse(response), {silent: true});
            //console.log('setAndPostProcess');
            this.syncPostProcess(model, response, options, callback);
        },

        syncPostProcess: function (model, response, options, callback) {
            //console.log('syncPostProcess');
            var derivatives = this.get(ND.LBP.Constants.SERIES).get(ND.LBP.Constants.DERIVATIVES),
                engines,
                isSelected = false,
                categories = [ND.LBP.Constants.EXTERIOR, ND.LBP.Constants.INTERIOR, ND.LBP.Constants.ACCESSORIES];

            _.each(derivatives.models, function (derivative) {
                engines = derivative.get(ND.LBP.Constants.ENGINES);
                _.each(engines.models, function (engine) {
                    isSelected = ND.LBP.Constants.SELECTED_STATES.indexOf(engine.get('state')) >= 0;
                    engine.set({
                        'seriesName': derivative.get('name'),
                        'derivativeId': derivative.id,
                        'selected': isSelected,
                        'description': derivative.get('description'),
                        'isHidden': Constants.hiddenState === engine.get('state')});
//                    console.log('enigne with name ' + engine.get('name') + ' has series name ' + derivative.get('name'));
                });
                derivative.set({'isHidden': Constants.hiddenState === derivative.get('state'),
                    'selected': engines.getSelected() != null}, {silent: true});
                ////console.log('derivative ' + derivative.get('name') + ' is selected? ' + isSelected);
            });

            //We need to manually trigger an event after model is resynced for efficiency
            //otherwise the gallery refreshes on every image add/removal
//            _.each(this.get(ND.LBP.Constants.IMAGE_GROUPS).models, function(imageGroup) {
//                //console.log('triggering change for imageGroup ' + imageGroup.id);
//                imageGroup.trigger('change');
//            });
            //console.log('triggering ' + ND.LBP.Events.ImageGroupUpdated);

            //this.get(ND.LBP.Constants.IMAGE_GROUPS).

            _.each(categories, function (category) {
                this.postProcessFeatures(this.get(category).get(ND.LBP.Constants.FEATURE_GROUPS));
                //hide others when 'theme' exists..
                var models = new Array();
                var themeName = ND.LBP.Config.themename ? ND.LBP.Config.themename : ND.LBP.Constants.FEATURE_THEME;
                var self = this;
                _.each(self.get(category).get(ND.LBP.Constants.FEATURE_GROUPS).models, function (model) {
                    if (model.get('name') !== themeName || model.get('isHidden')) {
                        models.push(model);
                    }
                });
                if (models.length < self.get(category).get(ND.LBP.Constants.FEATURE_GROUPS).models.length) {
                    //this.get(category).get(ND.LBP.Constants.FEATURE_GROUPS).remove(models);
                    _.each(models, function (singlemodel) {
                        self.get(category).get(ND.LBP.Constants.FEATURE_GROUPS).get(singlemodel).set('isHidden', true);
                    });
                }
            }, this);

            Backbone.trigger(ND.LBP.Events.ImageGroupUpdated);

            if (callback) {
                callback(this);
            }

            if (this.get('changes') != null) {
                this.get('changes').set({'nameplateId': this.id, 'featureName': ND.LBP.Builder.getFeatureName()});
                //console.log('triggering conflict resolution');
                Backbone.trigger(ND.LBP.Events.TriggerConflictResolution, this.get('changes'));
            }

        },

        postProcessFeatures: function (featureGroups) {
            //console.log('setPrimaryImageForFeature');

            if (typeof featureGroups !== 'undefined' && featureGroups != null && featureGroups.length > 0) {
                var
                    hiddenCount,
                    features;
//                    hasOnlyOneFeature;
                _.each(featureGroups.models, function (featureGroup) {
                    hiddenCount = 0;
                    features = featureGroup.get(ND.LBP.Constants.FEATURES);

//                    hasOnlyOneFeature = featureGroup.getAvailableFeatureCount(ND.LBP.CommonModels.StateTable) === 1;

                    features.each(function (feature) {

                        var images = feature.get(ND.LBP.Constants.IMAGES),
                            state = feature.get(ND.LBP.Constants.STATE);
                        if (images.length > 0) {
                            feature.set('primaryImageSrc', images.at(0).get('src'), {silent: true});
                        }

                        if (ND.LBP.CommonModels.StateTable[state].isHidden) {
                            hiddenCount++;
                            //console.log('hide feature ' + feature.get('name'));
                        }

                        //console.log('feature ' + feature.get('name') + ' is in state ' + state + ' > assigned label ' + ND.LBP.CommonModels.StateTable[state].label);

                        feature.set({
                            'featureLabel': ND.LBP.CommonModels.StateTable[state].label,
                            'isEnabled': ND.LBP.CommonModels.StateTable[state].isEnabled,
                            'isHidden': ND.LBP.CommonModels.StateTable[state].isHidden,
                            'price': ND.LBP.CommonModels.formatFeaturePrice(feature),
                            'specialType': featureGroup.get(ND.LBP.Constants.SPECIAL_TYPE),
                            'selected': ND.LBP.Constants.SELECTED_STATES.indexOf(feature.get('state')) >= 0
                        });


                    }, this);

                    //console.log('hide featureGroup ' + featureGroup.get('name') + ' with size ' + features.length + ' ? ' + (hiddenCount === features.length));
                    featureGroup.set('isHidden', hiddenCount === features.length);

                }, this);
            }
        },

        /**
         * Parse the response and convert nested featureGroupAttributes JSON response into GeatureGroupAttributes Backbone objects
         */
        parse: function (response, options) {
            for (var key in this) {
                if (key === ND.LBP.Constants.IMAGES) {
                    var embeddedClass,
                        embeddedData = response[key];
                    if (typeof embeddedData !== 'undefined') {
                        embeddedClass = ND.LBP.CommonModels.parseImageData(key, embeddedData, this);
                        //embeddedClass = ND.LBP.CommonModels.parseObject(key, ND.LBP.CommonCollections.Images, embeddedData, this);
                    }
                    response[key] = embeddedClass;
                } else if (key === ND.LBP.Constants.PRICES) {

                    var embeddedClass,
                        embeddedData = response[key];
                    if (typeof embeddedData !== 'undefined') {
                        embeddedClass = ND.LBP.CommonModels.parsePriceData(key, embeddedData, this);
                        //embeddedClass = ND.LBP.CommonModels.parseObject(key, ND.LBP.CommonCollections.Images, embeddedData, this);
                    }
                    response[key] = embeddedClass;
                } else if (key === ND.LBP.Constants.SERIES) {
                    var embeddedClass;
                    embeddedData = response[key];
                    if (typeof embeddedData !== 'undefined') {
//                        embeddedClass = ND.LBP.CommonModels.parseObject(key, m.Series, embeddedData, this);
                        embeddedClass = m.parseSeriesData(key, embeddedData, this);
                        // embeddedClass =  this.get(ND.LBP.Constants.SERIES) == null ? new m.Series(embeddedData, {parse:true}) : this.get(ND.LBP.Constants.SERIES).set(this.get(key).parse(embeddedData));
                    }
                    response[key] = embeddedClass;
                }
                else if (key === ND.LBP.Constants.EXTERIOR || key === ND.LBP.Constants.INTERIOR ||
                    key === ND.LBP.Constants.ACCESSORIES || key === ND.LBP.Constants.NO_USER_CHOICE) {
                    var embeddedClass,
                        embeddedData = response[key];
                    if (typeof embeddedData !== 'undefined') {
                        var existing = this.get(key);
                        if (existing == null) {
                            embeddedClass = new ND.LBP.ExteriorModels.Accessory(embeddedData, {parse: true});
                        } else {
                            embeddedClass = existing.set(existing.parse(embeddedData));
                        }
//                        embeddedClass = ND.LBP.CommonModels.parseObject(key, ND.LBP.ExteriorModels.Accessory, embeddedData, this);

                    }
                    response[key] = embeddedClass;
                } else if (key === ND.LBP.Constants.IMAGE_GROUPS) {
                    var embeddedClass,
                        embeddedData = response[key];
                    if (typeof embeddedData !== 'undefined') {

                        var existing = this.get(key);
                        if (existing == null) {
                            embeddedClass = new ND.LBP.CommonCollections.ImageGroups(embeddedData, {parse: true});
                        } else {
                            existing.set(embeddedData, {parse: true});
                            embeddedClass = existing;
                        }
                        response[key] = embeddedClass;
                    }
                    //response[key] = embeddedClass;
                } else if (key === 'changes') {
                    var embeddedClass = null;
                    embeddedData = response[key];
                    if (typeof embeddedData !== 'undefined') {
                        embeddedClass = new m.Changes(embeddedData, {parse: true});
                    }
                    response[key] = embeddedClass;
                }
            }
            return response;
        }

    });

    m.Changes = Backbone.Model.extend({
        rollbackState: null,
        additions: null,
        subtractions: null,

        defaults: {
            featureName: ''  //feature to be added/removed
        },

        parse: function (response, xhr) {
            for (var key in this) {
                if (key === 'additions' || key === 'subtractions') {
                    var embeddedClass,
                        embeddedData = response[key];
                    if (typeof embeddedData !== 'undefined') {
                        embeddedClass = new ND.LBP.NameplateDetailCollections.SelectedFeatures(embeddedData, {parse: true});
                    }
                    response[key] = embeddedClass;
                }
            }
            return response;
        }
    });

    m.SelectedFeature = Backbone.Model.extend({
        id: null,
        state: null,
        description: null
    });

    m.Series = Backbone.Model.extend({
        id: null,
        name: null,
        type: null,
        //selectable: true,
        features: null,
        defaults: {
            total: null
        },

        parse: function (response) {
            for (var key in this) {
                if (key === ND.LBP.Constants.DERIVATIVES) {
                    var embeddedClass,// = new ND.LBP.NameplateDetailCollections.Derivatives(),
                        embeddedData = response[key];
                    if (typeof embeddedData !== 'undefined') {
//                        embeddedClass.add(embeddedData, {parse:true});
                        // embeddedClass = ND.LBP.CommonModels.parseObject(key, ND.LBP.NameplateDetailCollections.Derivatives, embeddedData, this);
                        embeddedClass = m.parseDerivativeData(key, embeddedData, this);
                    }
                    response[key] = embeddedClass;
                }
            }
            return response;
        }


    });


    m.Derivative = Backbone.Model.extend({

        id: null,
        name: null,
        uniqueFeatures: null,
        //selectable : true,
        images: null,
        prices: null,
        defaults: {
            selected: false
        },
        options: null,

        parse: function (response, xhr) {
            for (var key in this) {
                if (key === ND.LBP.Constants.ENGINES) {
                    var embeddedClass,// = new ND.LBP.NameplateDetailCollections.Engines(),
                        embeddedData = response[key];
                    if (typeof embeddedData !== 'undefined') {
                        //embeddedClass.add(embeddedData, {parse:true});
                        //embeddedClass = ND.LBP.CommonModels.parseObject(key, ND.LBP.NameplateDetailCollections.Engines, embeddedData, this);
                        embeddedClass = m.parseEngineData(key, embeddedData, this);
                    }
                    response[key] = embeddedClass;
                } else if (key === ND.LBP.Constants.IMAGES) {
                    var embeddedClass,
                        embeddedData = response[key];
                    if (typeof embeddedData !== 'undefined') {
                        embeddedClass = ND.LBP.CommonModels.parseImageData(key, embeddedData, this);
                        //embeddedClass = ND.LBP.CommonModels.parseObject(key, ND.LBP.CommonCollections.Images, embeddedData, this);
                    }
                    response[key] = embeddedClass;
                } else if (key === ND.LBP.Constants.PRICES) {

                    var embeddedClass,
                        embeddedData = response[key];
                    if (typeof embeddedData !== 'undefined') {
                        embeddedClass = ND.LBP.CommonModels.parsePriceData(key, embeddedData, this);
                        //embeddedClass = ND.LBP.CommonModels.parseObject(key, ND.LBP.CommonCollections.Images, embeddedData, this);
                    }
                    response[key] = embeddedClass;
                }
            }
            return response;
        }
    });

    m.Engine = Backbone.Model.extend({
        id: null,
        defaults: {
            description: '',
            selected: false,
            seriesName: '',
            price: null
        },
        state: null
    });

    m.NoUserChoice = Backbone.Model.extend({
        id: null
    });


    return m;


})();


/**
 * @author Sohrab Zabetian
 * @description collections for derivative module
 * @project Lincoln Build and Price
 */


ND.LBP.NameplateDetailCollections = (function(m) {


    var c = {};


//    c.Categories = Backbone.Collection.extend({
//        comparator: function(model) {
//            return model.get('sequence');
//        },
//
//        model: m.Category
//
//    });

//    c.ExteriorCategories = Backbone.Collection.extend({
//        comparator: function(model) {
//            return model.get('sequence');
//        },
//
//        model: m.ExteriorCategory
//
//    });

    c.Derivatives = Backbone.Collection.extend({
//        url: function() {
//            return ND.LBP.Config.derivativesURL;
//        },
        comparator: function(model) {
            return model.get('sequence');
        },

        model: m.Derivative

    });


    c.Engines = Backbone.Collection.extend({
//        url: function() {
//            return ND.LBP.Config.derivativesURL;
//        },
        comparator: function(model) {
            return model.get('sequence');
        },

        model: m.Engine

    });

    c.SelectedFeatures = Backbone.Collection.extend({

        model: m.SelectedFeature
    });

//    c.SeriesCategories =  Backbone.Collection.extend({
//        comparator: function(model) {
//            return model.get('sequence');
//        },
//
//        model: m.SeriesCategory
//
//    });


    return c;

})(ND.LBP.NameplateDetailModels);


/**
 * @author Sohrab Zabetian
 * @description models for accessories module
 * @project Lincoln Build and Price
 */

ND.LBP.ExteriorModels = (function () {


    var m = {};

    m.Accessory = Backbone.Model.extend({

        id: null,
        name: null,
        type: null,
        //selectable: true,
        featureGroups: null,
        defaults : {
            total: null
        },

        /**
         * Parse the response and convert nested JSON response into Backbone objects
         */
        parse: function (response, xhr) {
            for (var key in this) {
                if (key === ND.LBP.Constants.FEATURE_GROUPS) {
                    var embeddedClass,
                        embeddedData = response[key];
                    if (typeof embeddedData !== 'undefined') {
                        embeddedClass = ND.LBP.CommonModels.parseFeatureGroupData(key, embeddedData, this);
                    }
                    response[key] = embeddedClass;
                }
            }
            return response;
        }

    });

    m.FeatureGroup = Backbone.Model.extend({
        id: null,
        name: null,
        type: null,
        specialType: null,
        //selectable: true,
        defaults: {
            sequence: 0,
            isHidden: false
        },

        features: null,

//        getAvailableFeatureCount: function (rules) {
//            var features = this.get('features'),
//                count = 0;
//            if (features.length > 0) {
//               features.each(function(feature) {
//                   if (typeof rules[feature.get('state')] === 'undefined') {
//                       alert('no state');
//                   }  else  if (!rules[feature.get('state')].isHidden) {
//                      count++;
//                   }
//               });
//            }
//            //console.log('featureGroup ' + this.get('name') + ' has feature count ' + count);
//            return count;
//
//        },
        /**
         * Parse the response and convert nested JSON response into Backbone objects
         */
        parse: function (response, xhr) {
            for (var key in this) {
                if (key === ND.LBP.Constants.FEATURES) {
                    var embeddedClass,
                        embeddedData = response[key];
                    if (typeof embeddedData !== 'undefined') {
                        // embeddedClass = ND.LBP.CommonModels.parseFeatureData(key, embeddedData, this);
                        embeddedClass = ND.LBP.CommonModels.parseFeatureData(key, embeddedData, this);
                    }
                    response[key] = embeddedClass;
                }
            }
            return response;
        }
    });

    return m;


})();


/**
 * @author Sohrab Zabetian
 * @description collections for exterior/interior/accessories module
 * @project Lincoln Build and Price
 */
ND.LBP.ExteriorCollections = (function() {


    var c = {};

    c.FeatureGroups = Backbone.Collection.extend({
       model : ND.LBP.ExteriorModels.FeatureGroup,
       comparator: function(model) {
           return model.get('sequence')
       }
    });


    return c;

})();


/**
 * @author Sohrab Zabetian
 * @description module  for nameplate detail module
 * @project Lincoln Build and Price
 *
 *
 *     AVAILABLE     Not-selected - Can be selected by the user (could cause a conflict)
 *     DEFAULT       Selected by the system as part of GForce auto-complete
 *     SELECTED      Selected by the user explicitly
 *     INCLUDED      Selected by the system due to another feature requiring it
 *     EXCLUDED      Not-selected ??? Can be selected by user but will cause a conflict
 *     FORBIDDEN     Should never have features in this state.
 */

ND.LBP.SummeryModels = (function() {


    var m = {};

    m.Summary = Backbone.Model.extend({

        series : null, //selected series name
        seriesRoute: null,
        engine : null, //selected engine name
        categories : null,
        images: null,
        galleryPreview: null,
        total: null,
        defaults: {
            userLocation : 'setLoc'
        }
    });

    m.SummaryCategory = Backbone.Model.extend({

       defaults : {
           name: '',
           sequence: 0,
           categoryRoute: '#'
       },
       accessories : null
    });

    m.SummaryAccessory = Backbone.Model.extend({

        defaults : {
            name: '',
            price : null,
            sequence: 0
        }
    });

    return m;


})();


/**
 * @author Sohrab Zabetian
 * @description collections for summary module
 * @project Lincoln Build and Price
 */


ND.LBP.SummeryCollections = (function(m) {


    var c = {};

    c.SummaryCategories = Backbone.Collection.extend({
        comparator: function(model) {
            return model.get('sequence');
        },

        model: m.SummaryCategory

    });

    c.SummaryAccessories = Backbone.Collection.extend({
        comparator: function(model) {
            return model.get('sequence');
        },

        model: m.SummaryAccessory

    });

    return c;

})(ND.LBP.SummeryModels);


/**
 * @author Sohrab Zabetian
 * @description ReloadConfig models
 * @project Lincoln Build and Price
 *
 */

ND.LBP.ReloadModels = (function () {
    var m = {};

    m.Reload = Backbone.Model.extend({
        key: null,
        site: null,
        state : null,
        priceZoneId: null,
        derivativeId: null,
        modelId: null,
        colourId: null,
        trimId: null,
        engineId: null,
        features: null,
        sfeatures: null,
        postcode: null,
        usage: null,
        type: null
    });


    return m;

})();


/**
 * @author Sohrab Zabetian
 * @description loader
 * @project Lincoln Build and Price
 */

ND.LBP.Builder = (function() {

    var
  //  nm = ND.LBP.NameplateModels,
    nc = ND.LBP.NameplateCollections,
    ndm = ND.LBP.NameplateDetailModels,
   // ndc = ND.LBP.NameplateDetailCollections,
    cm = ND.LBP.CommonModels,
    cc = ND.LBP.CommonCollections,

    l = {  //loader

        _cache : {},

        pf : {    //public functions

            keys : {
                NAMEPLATES : 'nameplates',
                NAMEPLATE_DETAILS : 'nameplateDetails',
                CATEGORIES : 'categories',
                HEADERS : 'headers',
                SIDEBAR : 'sidebar',
                FEATURE_NAME : 'featureName',
                KEY_FEATURES: 'keyFeatures'
            },

            store : function(modelName, model) {
                l._cache[modelName] = model;
            },

            load : function(modelName) {
                return l._cache[modelName];
            },

            remove : function(modelName) {
                delete l._cache[modelName];
            },

            removeAll : function(modelList) {
                for (var i = 0; i < modelList.length; i++) {
                    delete l._cache[modelList[i]];
                }
            },

            reset : function() {
                l._cache[l.pf.keys.NAMEPLATE_DETAILS] = undefined;
                l._cache[l.pf.keys.NAMEPLATES] = undefined;
            },
            /**
             *
             * @param currentCategory
             * @param optionsArray  should be pagename, all values passed to construct url
             * @returns {*}
             */
            updateHeaders: function(currentCategory, optionsArray) {

              var headers = l.pf.getHeaders(),
                  categories = ND.LBP.Config.categories,
                  isNotSeriesTab = true;

                //console.log(currentCategory);
               _.each(headers.models, function(header) {
                   // isNotSeriesTab = (currentCategory > 2 || header.id < 2);
                     //header.id - 1 because headerIds start at 1 and we need to map the id to the arrays above
                    Backbone.trigger.apply(Backbone, [ND.LBP.Events.GetPage, header.get('fragment')].concat(optionsArray, [categories[header.id - 1], function(nextPageUrl) {

                        header.set({'pathURL' : nextPageUrl, 'isEnabled' : ((nextPageUrl.indexOf('undefined') === -1) && (nextPageUrl.indexOf('//') === -1) && isNotSeriesTab), 'selected' : (currentCategory === header.id)}, {silent: true});
                        header.trigger('change'); //manually trigger change, otherwise by line above change event is triggered 3 times
                        // console.log(nextPageUrl);
                       // console.log('current category:  ' + currentCategory + ' header id ' + header.id + ' pathURL ' + header.get('pathURL'));
                    }]));
               });


                return headers;
            },

            storeFeatureName: function(name) {
                l.pf.store(l.pf.keys.FEATURE_NAME, name);
            },

            getFeatureName: function() {
                return l.pf.load(l.pf.keys.FEATURE_NAME);
            },

            getHeaders: function() {
                var headers = l.pf.load(l.pf.keys.HEADERS);
                if (typeof headers === 'undefined') {
                    headers = b.buildHeaders();
                    l.pf.store(l.pf.keys.HEADERS,headers);
                }

                return headers;
            },

            getRouteForPage: function(pagename) {

                var results = l.pf.getHeaders().where({'pagename' : pagename});
                if (results != null && results.length > 0) {
                    //console.log('getRouteForPage for ' + pagename + ' is ' + results[0].get('pathURL'));
                    return results[0].get('pathURL');
                }
                //console.log('getRouteForPage for ' + pagename + ' is null');
                return null;
            },


            getCurrentHeader: function() {
                var headers = l.pf.load(l.pf.keys.HEADERS);
                if (typeof headers !== 'undefined' && headers != null) {
                    return headers.getSelected();
                }
                return null;
            },

            getNextPrevHeaders: function() {
                var headers = l.pf.load(l.pf.keys.HEADERS),
                    response = {next: null, prev: null};
                if (typeof headers !== 'undefined' && headers != null) {
                    var id = headers.getSelected().id;

                    response.next = headers.get((id + 1)) != null ? headers.get((id + 1)).get('pathURL') : null;
                    response.prev = headers.get((id - 1)) != null ? headers.get((id - 1)).get('pathURL') : null;

                }
                return response;
            },

            getNameplates: function(success) {
                l.fetchOrLoad(l.pf.keys.NAMEPLATES, new nc.Nameplates(), function(serverNameplates) {
                    //postprocess

                   // var nameplate = new nm.Nameplate();

                    _.each(serverNameplates.models, function(serverNameplate) {
                        var images = serverNameplate.get('images');
//                        console.log(images.length);

                        var defaultImage,
                            rollOverImage;

                        if (images.length > 1) {
                           defaultImage = images.at(0).get('src');
                           rollOverImage =  images.at(1).get('src');
                        } else if (images.length > 0) {
                            defaultImage = images.at(0).get('src');
                            rollOverImage =  images.at(0).get('src');
                        }

                        serverNameplate.set({'defaultImage': defaultImage,
                                             'rollOverImage': rollOverImage,
                                              'seriesURL' : u.seriesPageUrl(serverNameplate.id)});
//                        console.log(images.at(0).get('src'));
//                        console.log(images.at(1));
                    });

                    success(serverNameplates);
                });
            },

            getNameplateDetails : function(nameplateId, engineId, useCache, success) {
                //need to load nameplates to ensure omniture is up to date.
                l.pf.getNameplates(function(nameplateCollection) {
                    var model = nameplateCollection.selectById(nameplateId),
                        nameplateDetails = new ndm.NameplateDetails(),
                        articleUrl = model.get('articleUrl');

                    //console.log('modelYear for model ' + model.get('modelName') + ' is ' + model.get('modelYear'));
                        //console.log('articleUrl: ' + articleUrl);
                    Backbone.trigger(ND.LBP.Events.NameplateChanged, {
                        name: model.get('modelName'),
                        year: model.get('modelYear'),
                        id: model.id,
                        category : model.get('category'),
                        analyticsCategory : model.get('analyticsCategory'),
                        analyticsName : model.get('analyticsName')
                    });

                    nameplateDetails.url = nameplateDetails.buildFetchURL(nameplateId);
                    if (useCache) {
                        l.fetchOrLoad(l.pf.keys.NAMEPLATE_DETAILS, nameplateDetails, function(seriesDetails) {
                            l.validateAndPostProcessSeries(seriesDetails, nameplateId, engineId, articleUrl, success);
                        });
                    } else {
                        l.fetchFromServer(l.pf.keys.NAMEPLATE_DETAILS, nameplateDetails, function(seriesDetails) {
                            l.validateAndPostProcessSeries(seriesDetails,nameplateId, engineId, articleUrl, success);
                        });
                    }
                });
            },

            getKeyFeatures: function(nameplateDetail, derivativeId) {
                var selectedDerivative = nameplateDetail.get(ND.LBP.Constants.SERIES)
                                                        .get(ND.LBP.Constants.DERIVATIVES)
                                                        .get(derivativeId),
                    keyFeatures = l.pf.load(l.pf.keys.KEY_FEATURES),
                    attributes = {
                        series : selectedDerivative.get('name'),
                        uniqueFeatures: selectedDerivative.get(ND.LBP.Constants.UNIQUE_FEATURES),
                        articleUrl: selectedDerivative.get(ND.LBP.Constants.ENGINES).getSelected().get('articleUrl')
                    };

                if (typeof keyFeatures === 'undefined') {
                    keyFeatures = new cm.KeyFeatures(attributes);
                    l.pf.store(l.pf.keys.KEY_FEATURES,keyFeatures);
                } else {
                    keyFeatures.set(attributes);
                }
                return keyFeatures;
            },

            getSidebar: function(data) {
               var storedSidebar = l.pf.load(l.pf.keys.SIDEBAR);

               if (typeof storedSidebar === 'undefined') {
                   storedSidebar = new cm.Sidebar({
                       buttons: new cc.NavigationButtons(),
                       mobileButtons: new cc.NavigationButtons()
                   });

                   l.pf.store(l.pf.keys.SIDEBAR, storedSidebar);
               }

                var buttons = storedSidebar.get('buttons');
                buttons.reset();

                if (typeof data.buttonData !== 'undefined') {
                    _.each(data.buttonData, function(dataButton) {
                        buttons.add(new cm.NavigationButton(dataButton), {silent: true});
                    });
                }

                var mobileButtons = storedSidebar.get('mobileButtons');
                mobileButtons.reset();

                if (typeof data.mobileButtonData !== 'undefined') {
                    _.each(data.mobileButtonData, function(mobileButton) {
                        mobileButtons.add(new cm.NavigationButton(mobileButton), {silent: true});
                    });
                }

                storedSidebar.set({
                    'title':         data.title,
                    'description':   data.description,
                    'pageName':      data.pageName,
                    'state':         data.state,
                    'hidePDFShare':  (typeof data.hidePDFShare === 'undefined')  ? true  : data.hidePDFShare,
                    'hideSave':      (typeof data.hideSave === 'undefined')      ? true  : data.hideSave,
                    'hideConnect':   (typeof data.hideConnect === 'undefined')   ? false : data.hideConnect,
                    'hidePDFButton': (typeof data.hidePDFButton === 'undefined')  ? false  : data.hidePDFButton
                }, {silent: true});

                storedSidebar.trigger('change');

                return storedSidebar;
            },

            updateSidebarButtonUrl: function(buttonId, url) {
                var storedSidebar = l.pf.load(l.pf.keys.SIDEBAR);
                if (typeof storedSidebar !== 'undefined') {
                    var button = storedSidebar.get('buttons').get(buttonId);
                    if (typeof button !== 'undefined' && button != null) {
                        button.set('nextPageURL', url);
                    }
                    button = storedSidebar.get('mobileButtons').get(buttonId);
                    if (typeof button !== 'undefined' && button != null) {
                        button.set('nextPageURL', url);
                    }
                }
            },

            buildAndStoreEmptyNameplateDetail: function(nameplateId) {
                var nameplateDetails = new ndm.NameplateDetails();
                nameplateDetails.url = nameplateDetails.buildFetchURL(nameplateId);
                l.pf.store(l.pf.keys.NAMEPLATE_DETAILS, nameplateDetails);

                return nameplateDetails;
            }

        },

        validateAndPostProcessSeries: function(seriesDetails, nameplateId, engineId, articleUrl, success) {

            //page reload
//            if (seriesDetails.get('state') == null && (typeof engineId !== 'undefined') && engineId != null) {
//                Backbone.trigger(ND.LBP.Events.SaveProgress, {
//                    nameplateId: nameplateId,
//                    changePath: false,
//                    selections: [{
//                        id: engineId,
//                        selected: true
//                    }]
//                }, function() {
//                    l.postProcessSeries(seriesDetails, articleUrl, success);
//                });
//            } else {
                l.postProcessSeries(seriesDetails, articleUrl, success);
//            }
        },

        postProcessSeries: function(seriesDetails, articleUrl, success) {
            var derivatives = seriesDetails.get(ND.LBP.Constants.SERIES).get(ND.LBP.Constants.DERIVATIVES),
                derivativePrice,
                priceHackConfig = ND.LBP.Config.priceHack,
                enginesNotShowHackConfig = ND.LBP.Config.enginesNotShow,
                hackedPrice;
            //price hack to get around GForce bug on series page
            if (typeof priceHackConfig === 'undefined' || typeof priceHackConfig.isEnabled === 'undefined' || typeof  priceHackConfig.series === 'undefined' ||
                priceHackConfig.isEnabled == false || priceHackConfig.series.length === 0 ) {
                priceHackConfig = {};
                priceHackConfig.series = {};
            }

            derivatives.each(function(derivative) {

                // derivativePrice = ND.LBP.CommonModels.formatFeaturePrice(derivative);
                //console.log('derivativePrice:' + derivativePrice);
                var notshowengines = [];
                derivative.get(ND.LBP.Constants.ENGINES).each(function(engine) {
					derivativePrice = ND.LBP.CommonModels.formatFeaturePrice(derivative);
					if(!derivativePrice) {
					//geforce v3
						var price=engine.get(ND.LBP.Constants.PRICES);
						if(price.length>0&&price[0]&&price[0].value!== 'undefined'){
							/* if(price[0].value === 0){
								derivativePrice=cm.StateTable[engine.get(ND.LBP.Constants.STATE)].priceLabel;
							}
							else */ {
								derivativePrice=ND.PriceFormatter.format('' + price[0].value);
							}
						}
					}
					else {
					//geforce v2
						if (typeof priceHackConfig.series[derivative.get(ND.LBP.Constants.NAME)] !== 'undefined' &&
						   (typeof (hackedPrice = priceHackConfig.series[derivative.get(ND.LBP.Constants.NAME)][engine.get(ND.LBP.Constants.NAME)]) !== 'undefined'))  {

							derivative.get(ND.LBP.Constants.PRICES).reset();
							derivative.get(ND.LBP.Constants.PRICES).add(new ND.LBP.CommonModels.Price(hackedPrice));
							derivativePrice = ND.LBP.CommonModels.formatFeaturePrice(derivative);
						}
						
					}

                    if (enginesNotShowHackConfig && enginesNotShowHackConfig.indexOf(engine.id) >= 0) {
                        notshowengines.push(engine);
                    }

                    engine.set({'articleUrl':  articleUrl, 'price' : derivativePrice});
                });
                //engines not show hack to hide related series on series page
                //enginesNotShowHackConfig='engineID,engineID,...'
                if (notshowengines.length) {
                    derivative.get(ND.LBP.Constants.ENGINES).remove(notshowengines);
                }
            });
            success(seriesDetails);
        },

        fetchOrLoad : function(modelName, modelClass, successCallback) {
            var model = modelClass;
            var cachedModel = l.pf.load(modelName);
            if ((typeof cachedModel === 'undefined') || (cachedModel == null) || (cachedModel.url !== model.url)) {
                $.when(model.fetch())
                    .done(function() {
                        l.pf.store(modelName, model);
                        successCallback(model);
                    }).fail(function() {
                        Backbone.trigger(ND.LBP.Events.ErrorOccurred, new ND.LBP.CommonModels.Error());
                    });
            } else  {
                successCallback(cachedModel);
            }
        },

        /**
         * Loads a FRESH copy of the data from the server and returns when server replies.
         * @param modelName
         * @param modelClass
         * @returns none
         */
        fetchFromServer : function(modelName, modelClass, successCallback) {
            ////console.log('fetchFreshNStore -> ' + modelName);
            var model = modelClass;
            $.when(model.fetch())
                .done(function() {
                    l.pf.store(modelName,model);
                    successCallback(model);
                }).fail(function() {
                    Backbone.trigger(ND.LBP.Events.ErrorOccurred, new ND.LBP.CommonModels.Error());
                });
        }

    },

    b = {   //builder

        buildHeaders: function() {
            var categories = ND.LBP.Config.defaultHeaderConfiguration,
                headers =  new cc.Headers();

            _.each(categories, function(category) {
                headers.add(new cm.Header({id: category.id,
                    name: category.name,
                    header : category.header,
                    fragment: category.fragment,
                    pagename: category.pagename}))
            });

            return headers;
        }
    },

    u = {  //utility
      seriesPageUrl : function(id) {
          return 'nameplates/' + id;
      }
    };


     return l.pf;

})();



(function(window, document, $, undefined){

//    var registeredRoutes = {};

    var Constants =  {
       COOKIE_NAME : 'lbnpfe'  //Lincoln build and price front end
    };

    var _cache = {};

    var LincolnBuildAndPriceApp = Backbone.Router.extend({

        routeDetails : {},

		routes: {
		   //define static routes here
		    '' : 'start',
			'error' : 'navToErrorPage',
		    'reset"': 'navToResetPage' //used to reset the tool
		},

		registerDynamicRoutes: function() {
			//define dynamic routes
			//this.route(":modelId/" + Constants.path.pth,"navToPathsPage");
		},

		initialize: function(options) {
			this.registerDynamicRoutes();
			this.registerEventListeners();

            this.setupPriceFormatter();

            this.setupOnError();
            this.setupConfirmationBeforeLeave();
            this.registerModules();
		},

        setupPriceFormatter: function() {
            var formatterConfig = ND.LBP.Config.priceFormatterConfig;
            ND.PriceFormatter.initialise({
                data: formatterConfig.priceFormat,
                formatString:  formatterConfig.currencySymbol,
                centsSeparator: formatterConfig.monetaryDecimalSeparator,
                thousandsSeparator: formatterConfig.groupingSeparator
            });
        },

		setupOnError: function() {
			window.onerror = function () {
                Backbone.trigger(ND.LBP.Events.UnblockUI);
                Backbone.trigger(ND.LBP.Events.ErrorOccurred, new ND.LBP.CommonModels.Error());
                //wait a bit before registering the listener
                //so we don't kill the overlay too quickly.
                setTimeout(function() {
                    $(window).on('hashchange', function() {
                        Backbone.trigger(ND.LBP.Events.CloseOverlay);
                        $(window).off('hashchange');
                    });
                }, 500);


			};
		},

        setupConfirmationBeforeLeave: function() {
		leaveoutOverlay = function(url) {
			var destinationURL=url;
				$('#bp-leaveout-overlay').remove();
				$('.build-and-price').append($('<div id="bp-leaveout-overlay" class="rad-overlay-bg"></div>'));
				$('#bp-leaveout-overlay').hide();
				$('#bp-leaveout-overlay').html($('#bp-leaveout-overlay-template').html());				
                setTimeout(function(){
							$('#bp-leaveout-overlay .bp-yes').on("click", function(){
							$.cookie('bnp.anchor','N',{ path: '/', expires: 1 });
							$.cookie('dfy.pg.bkbtn',$('#badge a').attr('href'),{ path: '/', expires: 1 });
							if($(this).data("link")) {
									location.href=$(this).data("params")?$(this).data("link")+'?'+$(this).data("params"):$(this).data("link");
									}
							else {
									location.reload();
									}
								}
							);
							$('#bp-leaveout-overlay .bp-no').on("click", function(){
							$.cookie('bnp.anchor','N',{ path: '/', expires: 1 });
									if(destinationURL) {
										if(destinationURL==location.href) {
											location.reload();
										}
										else {									
											location.href=destinationURL;
											}
									} 
									else {
										$('#submit').trigger('click');
									}
								}
							);
							$('#bp-leaveout-overlay').show();
					},1000);
				};	
		$.cookie('bnp.anchor','Y',{ path: '/', expires: 1 });
		$('a').on('click',function(e){
			if($(this).attr('href')&&$(this).attr('href').toLowerCase().indexOf('http')==0&&(!$(this).attr('target')||$(this).attr('target').toLowerCase()!=='_blank')) {
				e.preventDefault();
				e.stopPropagation();
				leaveoutOverlay($(this).attr('href'),null);
				}
			});
		document['search-pannel'].onsubmit = function(e) {
			if($.cookie('bnp.anchor')=='Y') {
			if(e&&e.preventDefault) {
				e.preventDefault();
				e.stopPropagation();
				}
			else {
			event.returnValue = false;
			}
			leaveoutOverlay();
			};
		};
		window.onbeforeunload=function() {		
			window.onunload = function() {
			if($.cookie('bnp.anchor')=='Y') {
				$.cookie('bnp.anchor','N',{ path: '/', expires: 1 });
				location.href=location.href;
				leaveoutOverlay(location.href);
				}
			};
		}

        },

		registerEventListeners : function() {
            var events = ND.LBP.Events;
            //Backbone.on(ND.LBP.Events.SaveInCookie, this.saveInCookie, this);
            Backbone.on(events.HeaderLinkClicked, this.headerLinkClicked , this);
            Backbone.on(events.LoadFromCookie, this.loadFromCookie, this);
            Backbone.on(events.ChangePage, this.changePage, this);
            Backbone.on(events.GetPage, this.getPageUrl, this);
            Backbone.on(events.SaveProgress, this.saveProgress, this);
            Backbone.on(events.LocationChanged, this.updateLocation, this);
            Backbone.on(events.StartOver, this.startOver, this);
            Backbone.on(events.AppStateIsNull, this.appStateIsNull, this);
            Backbone.on(events.TryAgain, this.tryAgain, this);
            Backbone.on(events.RejectConflictResolution, this.rollbackChanges, this);

            //this.on('route', this.routeChanged, this);
		},

//        routeChanged: function(route, params) {
//            console.log('unregister all events in modules');
//            //Backbone.trigger(ND.LBP.Events.UnsubscribeFromEvents);
//        },

        getCookie: function() {
            var bnpCookie = $.cookie(Constants.COOKIE_NAME);
           return ((typeof bnpCookie === 'undefined') || (bnpCookie == null)) ? {}  : JSON.parse(bnpCookie);
        },

        changePage: function(url, replaceUrl) {
            //TODO: before page change we need to trigger an event
            //nextpage.trigger('before'); //register any events you need.

            if (!!replaceUrl) {
                window.location.assign(url);
            } else {
                Backbone.trigger(ND.LBP.Events.UnsubscribeFromEvents);
                var orgurl=url,
                        nexturl='',
                        i=0;
                    $.each(orgurl,function(index,c){
                        if (c==='#') {
                            i++;
                            if(i>1) {
                                nexturl=nexturl+encodeURIComponent("#");
                                }
                            else {
                                nexturl=nexturl+c;
                            }
                        }
                        else {
                            nexturl=nexturl+c;
                        }
                    }); 
                this.navigate(nexturl, {trigger: true});
            }

            //prevPage.trriger('after') //clean up...unregister anything you've got
        },

        headerLinkClicked : function(model) {
            var currentHeader = ND.LBP.Builder.getCurrentHeader();
            Backbone.trigger(currentHeader.id + ND.LBP.Events.HeaderLinkClicked, model);
           // this.changePage(model.get('pathURL'));
        },

        /**
         * arguments should be
         * 1) next route name
         * 2) all parameters (nameplate, derivative, etc)
         * 3) callback
         */
        getPageUrl: function() {
            //call callback function with result of buildPageUrl, passing all arguments
            var args = arguments.length > 2 ? [].slice.call(arguments, 1, arguments.length - 1) : [];
            arguments[arguments.length - 1].call(null, this.routeDetails[arguments[0]].buildPageUrl.apply(null, args));
        },

        saveProgress: function(dataToSave, callback) {

            if (dataToSave.selections.length > 0) {
                var self = this;
                ND.LBP.Builder.getNameplateDetails(dataToSave.nameplateId, null, true, function(nameplateDetail) {

                    _cache = dataToSave;

                    var state = (typeof dataToSave.state === 'undefined' ? nameplateDetail.get('state') : dataToSave.state);
                    var userActivity = new ND.LBP.CommonModels.UserActivity({state: state});
                    userActivity.url = userActivity.buildSaveURL(dataToSave.nameplateId);

                    var uSelections = new ND.LBP.CommonCollections.UserSelections();

                    _.each(dataToSave.selections, function(selection) {
                        uSelections.add(new ND.LBP.CommonModels.UserSelection(selection));
                    });

                    userActivity.set('selections', uSelections);
                    self.save(userActivity, nameplateDetail, callback);
                });
            }
        },

        rollbackChanges: function(changes) {
            var self = this;
            Backbone.trigger(ND.LBP.Events.BlockUI);
            var nameplateId = changes.get('nameplateId');
            if (typeof nameplateId !== 'undefined' && nameplateId != null) {
                ND.LBP.Builder.getNameplateDetails(nameplateId, null, true, function(nameplateDetail) {
                    var changes = nameplateDetail.get('changes'),
                        userActivity;
                    if (typeof changes !== 'undefined' && changes != null) {
                        userActivity = new ND.LBP.CommonModels.UserActivity({state: changes.get('rollbackState')});
                        userActivity.url = userActivity.buildSaveURL(nameplateId);
                        self.save(userActivity, nameplateDetail, function() {
                            if (_cache.changePath) {
                                self.changePage(_cache.currentPathUrl);
                            }
                            Backbone.trigger(ND.LBP.Events.UnblockUI);
                        });
                    }
                });
            }
        },

        save: function(userActivity, nameplateDetail, callback) {
            userActivity.save(null, {
                wait: true,
                success: function(model, response, options) {
                    nameplateDetail.trigger(ND.LBP.Events.ObjectUpdated, model, response, options, callback);
                },
                error: function() {
                    Backbone.trigger(ND.LBP.Events.UnblockUI);
                    Backbone.trigger(ND.LBP.Events.ErrorOccurred, new ND.LBP.CommonModels.Error());
                }
            });
        },

        updateLocation: function(locValue, locText) {
            this.saveInCookie({
                l: locValue,  //location
                d: locText                //display name
            });
            Backbone.trigger(ND.LBP.Events.LocationUpdated, locValue);
        },

        loadFromCookie: function(callback) {
            callback(this.getCookie());
        },

        saveInCookie : function(object) {
            var bnpCookie = this.getCookie();
            $.cookie(Constants.COOKIE_NAME, JSON.stringify($.extend(bnpCookie, object, { "s": ND.LBP.Config.site })), { path: '/', expires: 30 });
        },

		registerModules : function() {
			//fire module registration

           // console.log('Trigger module registration ');
            var self = this;
			Backbone.trigger(ND.LBP.Events.RegisterModule, function(moduleRoutes) {
               // console.log('Lincoln App registering module '  + moduleRoutes);
                //registeredRoutes = $.extend(registeredRoutes, moduleRoute);

                _.each(moduleRoutes, function(moduleRoute) {
                    self.routeDetails[moduleRoute.name] = {
                        buildPageUrl: moduleRoute.buildPageUrl,
                        fragment :  moduleRoute.fragment
                    };
                    self.route(moduleRoute.fragment, moduleRoute.name, moduleRoute.action);
                });

               // console.dir(moduleRoutes);
            });
		},

		/**
		 * Hard reset on all feeds.
		 */
        startOver : function(reset) {
            //clear cache
            if (typeof reset === 'undefined' || reset === true) {
                ND.LBP.Builder.reset();
            }
            //start over
			this.navigate('', {trigger: true, replace: true});
		},
        /**
         *   if app state is null, we need to go back to nameplate page
         */
        appStateIsNull: function() {
            this.startOver(false);
        },

        tryAgain: function() {
            Backbone.trigger(ND.LBP.Events.UnblockUI);
        },

        start: function() {
            //console.log('Lincoln App start');
            //var self = this;
//            this.loadProgressFromCookie(function(cookieValue) {
                var url =  this.routeDetails['nameplates'].buildPageUrl();
////                if (cookieValue != null) {
////                    url = cookieValue.buildPageUrl;
////                }
//
                this.changePage(url);
//            });
        }
	});


    $(document).ready(function () {

		setTimeout(function() {
			var $configData = $('#build-and-price-config');

	        //console.log('Lincoln Build and price config was found');
            //
	        ND.LBP.Config = JSON.parse($configData.html());

	        ND.LBP.Config.getPageConfig = function(id) {
	            return _.findWhere(ND.LBP.Config.defaultHeaderConfiguration, {'id': id});
	        };

	        new LincolnBuildAndPriceApp();
	        Backbone.history.start();

		}, 100);

	});

})(window, document, jQuery);


/**
 * @author Sohrab Zabetian
 * @description views for nameplate module
 * @project Lincoln Build and Price
 */


ND.LBP.NameplateViews = (function($) {


    var v = {};

    v.Nameplates = Backbone.View.extend({

        children : [],

        render: function() {
            var i = 0,
                el = this.$el,
                html = this.template();

            var threeColumns = this.collection.models.length === 3;

            el.html(html);

            if (threeColumns) {
                el.find('.model-select').addClass('is-3-columns');
            }

            var $div = el.find('.row');

            _.each(this.collection.models, function (nameplate) {
                this.children[i] = new v.Nameplate({model: nameplate});

                if (threeColumns) {
                    this.children[i].$el.removeClass('medium-6').addClass('medium-4');
                }

                $div.append(this.children[i++].render().el);
            }, this);

            return this;
        },

        initialize: function() {
            this.template = _.template($('#bp-nameplate-list-template').html());
            this.collection.bind("reset", this.render, this);
        }
    });

    v.Nameplate = Backbone.View.extend({

        tagName: 'div',

        className: 'tier columns medium-6',

        events: {
           'click .bp-nameplate-list-item' : 'nameplateSelected'
        },



        nameplateSelected : function(e) {
            e.preventDefault();
            Backbone.trigger(ND.LBP.Events.NameplateSelected, this.model);
        },

        initialize: function() {

            var model = this.model;

            this.model.set('getModelPageUrl', getModelPageUrl, {silent: true});

            this.template = _.template($("#bp-nameplate-list-item-template").html());

            // this.model.bind('change', this.toggleClass, this);
            this.model.bind('destroy', this.destroy, this);

            var navigatorModels = ND.LBP.Config.navigatorModels.split(",");

            // TODO: remove anti-pattern
            // This logic should be in JSP template
            function getModelPageUrl() {

                var isModelNavigator = navigatorModels.indexOf(model.get('id')) > -1;

                model.set('isModelNavigator', isModelNavigator);

                return model.get('isModelNavigator') ? model.get('modelNavigatorPageUrl')
                                                     : model.get('seriesURL');

            }
        },

        toggleClass: function() {
            //$(this.el).toggleClass('cur', this.model.get('selected'));
        }

    });


    return v;

})(jQuery);


/**
 * @author Sohrab Zabetian
 * @description views for series module
 * @project Lincoln Build and Price
 */


ND.LBP.DerivativeViews = (function($) {


    var v = {},
        events = {
            HideSeriesDetailOverlay : 'HideSeriesDetailOverlayEvent',
            UpdateSeriesImage : 'UpdateSeriesImageEvent'

        };

    v.Derivatives = Backbone.View.extend({

        children : [],


        render: function() {
            var i = 0,
                el = this.$el,
                html = this.template();

            el.html(html);
            var $div = el.find('.series-row');
            var collection = this.model.get(ND.LBP.Constants.DERIVATIVES);

            _.each(collection.models, function (derivative) {
                this.children[i] = new v.Derivative({model:derivative});
                $div.append(this.children[i].render().$el);
                i++;
            }, this);

            if (i === 4) {
                $div.addClass('grid-4');
            }else if (i === 2) {
                $div.addClass('grid-2');
            }else if (i === 5) {
                $div.addClass('grid-5');
				$div.parent().parent().removeClass('large-9');
            }
            this.addTotalPrice();
            return this;
        },

        addTotalPrice : function() {
            this.$el.find('#bp-series-total-price').empty()
                .append( this.totalPriceTemplate({total : this.model.get('total')}));
        },

        initialize: function() {
            this.template = _.template($('#bp-derivative-list-template').html());
            this.totalPriceTemplate = _.template($('#bp-derivative-list-total-price-template').html());
            this.model.on('change:total', this.addTotalPrice, this);
            Backbone.on(events.HideSeriesDetailOverlay, this.hideOverlays, this);
            Backbone.on(events.UpdateSeriesImage, this.updateSeriesImage, this);
        },

        updateSeriesImage: function(imagePath) {
            this.$el.find('.car-stage').empty().append($('<img src="' + ND.LBP.Config.baseImageURL + imagePath + '" />'));
        },

        hideOverlays : function() {
            this.$('.series-detail').attr('class', 'bp-details-overlay hide');
        }
    });

    v.Derivative = Backbone.View.extend({

        tagName: 'li',

        children : [],


        render: function() {

            var i = 0,
                el = this.$el,
                engines = this.model.get(ND.LBP.Constants.ENGINES);

            el.html(this.template(this.model.toJSON()));

            var $div = el.find('.series');
            _.each(engines.models, function (engine) {
                this.children[i] = new v.Engine({model:engine});
                $div.append(this.children[i].render().$el);
                i++;
            }, this);

            this.changeSeriesImage();

            return this;
        },

        initialize: function() {
            this.template = _.template($("#bp-derivative-list-item-template").html());
            this.model.bind('change:selected', this.render, this);
            this.model.bind('destroy', this.destroy, this);
        },

        changeSeriesImage: function() {
            if (this.model.get('selected') && this.model.get(ND.LBP.Constants.IMAGES).length > 0) {
                Backbone.trigger(events.UpdateSeriesImage, this.model.get(ND.LBP.Constants.IMAGES).at(0).get('src'));
            }
        }


    });

    v.Engine = Backbone.View.extend({

        tagName: 'li',

        events: {
            'click .bp-engine-name' : 'engineSelected' ,
            'click .series-options' :  'engineSelected',
            'click .comparison-overlay' : 'showComparisonChart'
        },

        render: function() {

            var el = $(this.el);
            el.toggleClass('active', this.model.get('selected')).html($(this.template(this.model.toJSON())));
            if (!this.firstTime && this.model.get('selected')) {
                this.$('.bp-details-overlay').attr('class', 'bp-details-overlay series-detail');
            }
            this.firstTime = false;
            return this;
        },

        showComparisonChart: function(e) {
            e.preventDefault();
            var comparisonUrl = $(e.currentTarget).data('href');
            if (typeof comparisonUrl !== 'undefined') {
                $.ajax({
                    url: comparisonUrl,
                    type: 'GET'
                }).done(function(data){
                        ND.LBP.ComparisonOverlay(data);
                    }).fail(function(){
                        Backbone.trigger(ND.LBP.Events.ErrorOccurred, new ND.LBP.CommonModels.Error());
                    });
            }
        },

        engineSelected: function(e) {
            Backbone.trigger(events.HideSeriesDetailOverlay);
            Backbone.trigger(ND.LBP.Events.SeriesEngineSelected, this.model);

            e.preventDefault();
            e.stopImmediatePropagation();
            $('body').on('click', this.detectBodyClicks);
        },

        detectBodyClicks : function(e) {
            if (!$(e.target).parents().andSelf().is('.bp-details-overlay')) {
                Backbone.trigger(events.HideSeriesDetailOverlay);
                $("body").off('click', this.detectBodyClicks);
            }
        },

        initialize: function() {
            this.firstTime = true;
            this.template = _.template($("#bp-engine-list-item-template").html());
            this.model.bind('change:selected', this.render, this);
            this.model.bind('destroy', this.destroy, this);
        }

    });


    return v;

})(jQuery);


/**
 * @author Sohrab Zabetian
 * @description views for accessories module
 * @project Lincoln Build and Price
 */
ND.LBP.ExteriorViews = (function($) {


    var v = {},
        events = {
            ToggleSection: 'ToggleSectionEvent', //toggles between tabs in exterior
            HideFeaturePopup : 'HideFeaturePopupEvent'
        };

    v.toggleSection = function(e) {
        var $this = this.$el,
            isExpanded = $this.hasClass('active');

        $this.toggleClass('active', !isExpanded);
    };

    v.AllAccessories = Backbone.View.extend({
        children : [],

        render: function() {
            var i = 0,
                el = this.$el,
                html = this.template({total : this.model.get('total')}),
                $ul,
                specialType,
                featureGroups = this.model.get(ND.LBP.Constants.FEATURE_GROUPS);

            el.html(html);
            $ul = el.find('#bp-exterior-content');

            _.each(featureGroups.models, function(featureGroup) {
                  specialType = featureGroup.get(ND.LBP.Constants.SPECIAL_TYPE);
                if (specialType === ND.LBP.Constants.COLOUR_TAB_ID ||
                    specialType === ND.LBP.Constants.INTERIOR_TRIM_TAB_ID ||
                    specialType === ND.LBP.Constants.INTERIOR_FABRIC_TAB_ID) {
                    this.children[i] = new v.Colours({model : featureGroup });
                } else {
                   this.children[i] = new v.Accessories({id: ('accessory_' + i), model : featureGroup });
                }

                $ul.prepend(this.children[i].render().$el);
                $ul.find('li:empty').remove();
                i++;
           }, this);

            //expand the first section
            //this.children[0].trigger(events.ToggleSection);
            this.addTotalPrice();
            return this;
        },

        addTotalPrice : function() {
            this.$el.find('#bp-exterior-total-price').empty()
                .append( this.totalPriceTemplate({total : this.model.get('total')}));
        },

        initialize: function() {
            this.totalPriceTemplate = _.template($('#bp-derivative-list-total-price-template').html());
            this.template = _.template($('#bp-exterior-template').html());
            this.model.on('change:total', this.addTotalPrice, this);
        }
    });


    v.Colours = Backbone.View.extend({

        tagName: 'li',

        className: 'expanded active',

        children : [],

        events: {
            'click span.title': 'toggleSection'
        },

        toggleSection: v.toggleSection,

        render: function() {
            //console.log('colours.render()');
            var i = 0,
                el = this.$el,
                isHidden = this.model.get('isHidden'),
				iColor = 0;

            el.toggleClass('hide', isHidden);
            if (!isHidden) {
                el.html(this.template(this.model.toJSON()));
                var $ul = this.$('ul.colors'),
                    features = this.model.get('features');

                _.each(features.models, function (feature) {
                    this.children[i] = new v.Colour({model: feature});
                    $ul.append(this.children[i].render().$el);
					if(!this.children[i].render().$el.hasClass('hide')) iColor++;
                    i++;
                }, this);
				if(iColor===10) {
					$ul.addClass('exterior-color-10'); 
					}
				else {
					$ul.removeClass('exterior-color-10');
					}
				
            }
            return this;
        },


        initialize: function() {
            this.template = _.template($('#bp-colour-list-template').html());
            this.model.on('change:isHidden', this.render, this);
            this.on(events.ToggleSection, this.toggleSection, this);
        }
    });

    v.Colour = Backbone.View.extend({
        tagName: 'li',

        events: {
           'click .color' : 'colourSelected'
        },

        colourSelected: function() {

           Backbone.trigger(ND.LBP.Events.AccessoryToggled, this.model);
        },

        render : function() {
            //console.log(this.model.get('name')  + ' isHidden? ' + this.model.get('isHidden'));
            var isSelected = this.model.get('selected');
            $(this.el).html($(this.template(this.model.toJSON())))
                      .toggleClass('hide', this.model.get('isHidden'))
                      .toggleClass('active',isSelected);

            var $colorWrap = this.$('.color-popup-wrap');
            if (isSelected) {
                $colorWrap.addClass('active');
                setTimeout(function() {
                    $colorWrap.removeClass('active');
                }, 5000);
            } else {
                $colorWrap.removeClass('active');
            }
            return this;
        },

        initialize: function() {
            this.template = _.template($('#bp-colour-list-item-template').html());
            this.model.on('change', this.render, this);
            this.on(events.ToggleSection, this.toggleSection, this);
        }
    });

    v.Accessories = Backbone.View.extend({

        tagName: 'li',

        className: 'expanded active',

        children : [],

        events: {
            'click span.title': 'toggleSection',
            'click div.option-thumbnail .image' : 'displayAccessoryDetails'
        },

        toggleSection: v.toggleSection,

        displayAccessoryDetails: function(e) {
            this.hideAllFeatureGroups();
            var popupId = $(e.currentTarget).data('popupid'),
                $popup = $('#' + popupId);
            $popup.addClass('active');

            Backbone.once(events.HideFeaturePopup, function() {
                //console.log('once ' + events.HideFeaturePopup);
                $popup.removeClass('active');
            });

            e.preventDefault();
            e.stopImmediatePropagation();

            $("body").one('click', this.hideAllFeatureGroups);

            //$popup.on('click', this.hideAllFeatureGroups);
            //TODO: figure out a way to hide overlay when someone clicks outside the overlay
             //$(document).not($popup).on('click', this.hideAllFeatureGroups);
        },

        hideAllFeatureGroups : function() {
            //console.log('hideAllFeatureGroups');
            Backbone.trigger(events.HideFeaturePopup);
        },

        render: function() {
            var i = 0,
                el = this.$el,
                isHidden = this.model.get('isHidden');
            el.toggleClass('hide', isHidden);
            //console.log('accessories.render() isHidden:' + isHidden);
            if (!isHidden) {
                el.toggleClass('expanded', el.hasClass('expanded'))
                  .html(this.template(this.model.toJSON()));

                var $ul = el.find('ul.options'),
                    features = this.model.get('features');

                _.each(features.models, function (feature) {
                    this.children[i] = new v.Accessory({model:feature});
                    var list = this.children[i].render().$el;
                    if (!list.hasClass('hide')) $ul.append(list);
                    i++;
                }, this);
            }

            return this;
        },

        initialize: function() {
            this.template = _.template($('#bp-option-list-template').html());
            this.model.on('change:isHidden', this.render, this);
            this.on(events.ToggleSection, this.toggleSection, this);
        }
    });

    v.Accessory = Backbone.View.extend({
        tagName: 'li',

        events: {
            'click .enabled' : 'accessorySelected'
        },

        render : function() {
            $(this.el).html($(this.template(this.model.toJSON())))
                      .toggleClass('hide', this.model.get('isHidden'));

//            var $colorWrap = this.$('.option-popup-wrap'),
//                isSelected = this.model.get('selected');
//            if (isSelected) {
//                $colorWrap.addClass('active').fadeOut(7000);
//            } else {
//                $colorWrap.removeClass('active');
//            }

            return this;
        },

        accessorySelected: function() {
            Backbone.trigger(ND.LBP.Events.AccessoryToggled, this.model);
        },

        initialize: function() {
            this.template = _.template($('#bp-option-list-item-template').html());
            this.model.on('change', this.render, this);
        }
    });

    return v;

})(jQuery);


/**
 * @author Sohrab Zabetian
 * @description views for nameplate module
 * @project Lincoln Build and Price
 */

    //DO NOT CHANGE
ND.LBP.SummaryViews = (function($) {
    //DO NOT CHANGE

    var v = {};

    v.Summary = Backbone.View.extend({

        children : [],

        events: {
            // 'click .car-review' : 'showVehicleOverlay',
            // 'click .close-btn' : 'hideVehicleOverlay',
            'click .bp-set-location' : 'displayLocationOverlay',
            'click .bp-summary-btn' : 'callToActionButtonClicked'
        },

        callToActionButtonClicked: function(e) {
            e.stopImmediatePropagation();
        },

        displayLocationOverlay: function(e) {
            e.preventDefault();
            Backbone.trigger(ND.LBP.Events.ShowLocationOverlay);
        },

        showVehicleOverlay: function(e) {
            e.preventDefault();
            $('#bp-summary-gallery').removeClass('hide');
            setTimeout(function() {
                $(window).on('hashchange', function() {
                    $('body').removeClass('noscroll');
                    $(window).off('hashchange');
                });
            }, 300);
            $('body').addClass('noscroll');
        },

        hideVehicleOverlay: function(e) {
            e.preventDefault();
            $('#bp-summary-gallery').addClass('hide');
            $('body').removeClass('noscroll');
        },

        render: function() {

            //console.log(this.model.toJSON());
            var i = 0,
                el = this.$el,
                html = this.template(this.model.toJSON());

            el.html(html);

            var $summaryDetails = $('#bp-summary-details'),
                categories = this.model.get('categories');

            _.each(categories.models, function (category) {
                this.children[i] = new v.SummaryCategory({ model:category });
                $summaryDetails.append(this.children[i].render().$el);
                i++;
            }, this);

            if (this.model.get('galleryPreview')) {

                // var galleryPreview = this.model.get('galleryPreview').get(ND.LBP.CommonViews.determineDeviceType());

                // this.children[i] = new ND.LBP.CommonViews.GalleryImage({
                //     className: 'active',
                //     noId: true,
                //     el: $('#bp-summary-image').find('.car-review'),
                //     model: galleryPreview.at(0)
                // });

                // this.children[i++].render();

                this.children[i] = new ND.LBP.CommonViews.Gallery({
                    el : $('#bp-summary-image').find('.car-review'),
                    showSwitchBtn: false,
                    model: this.model.get(ND.LBP.Constants.IMAGES)
                });

                this.children[i++].render();
            }

            //Show Location Info not needed. Comment out the code in case that the Clients need again ==!
            //this.renderLocation();
            this.$el.find('#bp-summary-location-title').parent('.location').hide();

            this.renderOverlay();

            return this;
        },

        renderLocation: function() {
            this.$el.find('#bp-summary-location-title').html(
                this.locTemplate({
                    userLocation: this.model.get(ND.LBP.Constants.USER_LOCATION)
                }));
        },

        renderOverlay : function() {
            // var $galleryContainer = $('#bp-summary-gallery').find('.car-stage');
            var $galleryContainer = $('#bp-summary-image').find('.car-review');
            this.children[this.children.length - 1] = new ND.LBP.CommonViews.Gallery({
                el : $galleryContainer,
                showSwitchBtn: false,
                model: this.model.get(ND.LBP.Constants.IMAGES)
            });
            this.children[this.children.length - 1].render();
        },

        initialize: function() {
            this.template = _.template($('#bp-summary-template').html());
            this.locTemplate = _.template($('#bp-summary-location-template').html());
            this.model.bind('change:images', this.renderOverlay, this);
            this.model.bind('change:userLocation', this.renderLocation, this);
            this.model.bind('destroy', this.destroy, this);
        }

    });

    v.SummaryCategory = Backbone.View.extend({
        tagName: 'li',

        initialize: function() {
            this.template = _.template($('#bp-summary-category-template').html());
            this.categoryItemTemplate = _.template($('#bp-summary-category-item-template').html());
            //this.model.bind('change', this.render, this);
            this.model.bind('destroy', this.destroy, this);
        },

        render: function() {
            var el = this.$el;

            el.html(this.template(this.model.toJSON()));
            var $details = el.find('.details'),
                accessories = this.model.get('accessories');
            _.each(accessories.models, function (accessory) {
                $details.append(this.categoryItemTemplate(accessory.toJSON()));
            }, this);

            return this;
        }

    });

    return v;

})(jQuery);


/**
 * @author Sohrab Zabetian
 * @description shared views for all modules
 * @project Lincoln Build and Price
 */

ND.LBP.CommonViews = (function ($, nv, dv, exv, sumv) {


    var v = {},
        events = {
            HideHeader: 'HideHeaderEvent',
            UpdateMobileHeader: 'UpdateMobileHeaderEvent'
        },
        Constants = {
            ACTIVE: 'active'
        };

    v.detectClickOutsideArea = function (context, callback, isPreventDefault) {
        var detectBodyClicks = function (e) {
            //console.log('detectBodyClicks');
            if (isPreventDefault) {
                e.preventDefault();
            }
            if (!$(e.target).parents().andSelf().is(context.id)) {
                callback.call(context);
                $("body").off('click', detectBodyClicks);
            }
        };

        $("body").on('click', detectBodyClicks);
    };

    v.Page = Backbone.View.extend({
        render: function () {
            return this;
        },

        trackPage: function () {
            Backbone.trigger(ND.LBP.Events.TrackOmniture, {state: ND.LBP.Constants.MODEL_OVERLAY_PAGE_NAME});
        },

        show: function () {
            this.trackPage();
            this.$locationOverlay.removeClass('hide');
        },

        hide: function () {
            this.$locationOverlay.addClass('hide');
        },

        events: {
            'click .close-btn': 'cancelLocSelection',
            'click .arrow-btn': 'selectLocation'
        },

        cancelLocSelection: function (e) {
            e.preventDefault();
            Backbone.trigger(ND.LBP.Events.LocationCanceled, null);
            this.hide();
        },

        selectLocation: function (e) {
            e.preventDefault();
            var $select = this.$locationOverlaySelect;
            Backbone.trigger(ND.LBP.Events.LocationChanged, $select.val(), $select.find('option:selected').text());
            this.hide();
        },

        initialize: function () {
            this.$locationOverlaySelect = $('#bp-select-locations');
            this.$locationOverlay = $('#bp-location-overlay');
            Backbone.on(ND.LBP.Events.ShowLocationOverlay, this.show, this);
            Backbone.on(ND.LBP.Events.HideLocationOverlay, this.hide, this);
        }
    });

    v.AlertOverlay = Backbone.View.extend({
        className: 'rad-overlay-bg',

        events: {
            'click .bp-yes': 'confirmChange',
            'click .bp-no': 'cancelChange'
        },

        confirmChange: function () {
            //Backbone.trigger(ND.LBP.Events.AcceptConflictResolution);
            this.hide();
        },

        cancelChange: function () {
//            Backbone.trigger(ND.LBP.Events.RejectConflictResolution, this.model);
            this.hide();
        },

        renderDefault: function (el) {
            el.html(this.alertTemplate());
            return el;
        },

        hide: function () {
            this.destroy();
        },

        initialize: function () {
            this.alertTemplate = _.template($('#bp-alert-overlay-template').html());
            //this.model.on('change', this.render, this);
        }
    });

    v.ConfirmationOverlay = v.AlertOverlay.extend({
        confirmChange: function () {
            Backbone.trigger(ND.LBP.Events.ChangeSeries);
            this.hide();
        },
        cancelChange: function () {
            this.hide();
        },

        render: function () {

            var el = this.$el;
            this.renderDefault(el).find('.message').html(this.confirmationTemplate(this.model.toJSON()));

            return this;
        },


        initialize: function () {
            v.AlertOverlay.prototype.initialize();
            this.confirmationTemplate = _.template($('#bp-confirmation-template').html());
            //this.model.on('change', this.render, this);
        }
    });

    v.SuccessOverlay = v.AlertOverlay.extend({
        events: {
            'click .bp-ok': 'dismiss'
        },

        dismiss: function () {
            this.hide();
        },

        render: function () {

            var el = this.$el;
            this.renderDefault(el).find('.message').html(this.confirmationTemplate({}));
            this.$('.bp-no').remove();
            this.$('.bp-yes').remove();
            this.$('.bp-ok').removeClass('hide');
            return this;
        },

        initialize: function () {
            v.AlertOverlay.prototype.initialize();
            this.confirmationTemplate = _.template($('#bp-success-template').html());
        }
    });

    v.ConflictOverlay = v.AlertOverlay.extend({

        cancelChange: function () {
            Backbone.trigger(ND.LBP.Events.RejectConflictResolution, this.model);
            this.hide();
        },

        render: function () {


            var el = this.$el;
            this.renderDefault(el).find('.message').html(this.conflictTemplate({featureName: this.model.get('featureName')}));
            var $addContainer = this.$('.bp-added-container'),
                $addContainerText = this.$('.bp-added-details'),
                $removeContainer = this.$('.bp-removed-container'),
                $removeContainerText = this.$('.bp-removed-details'),
                self = this,
                toggleContainer = true,
                additions = this.model.get('additions'),
                subtractions = this.model.get('subtractions');
            if (additions != null && additions.length > 0) {
                _.each(additions.models, function (addition) {
                    $addContainerText.append(self.conflictChangeTemplate(addition.toJSON()));
                });
                toggleContainer = false;
            }

            $addContainer.toggleClass('hide', toggleContainer);
            toggleContainer = true;
            if (subtractions != null && subtractions.length > 0) {
                _.each(subtractions.models, function (subtraction) {
                    $removeContainerText.append(self.conflictChangeTemplate(subtraction.toJSON()));
                });
                toggleContainer = false;
            }

            $removeContainer.toggleClass('hide', toggleContainer);

            return this;
        },


        initialize: function () {
            v.AlertOverlay.prototype.initialize();
            this.conflictTemplate = _.template($('#bp-conflict-template').html());
            this.conflictChangeTemplate = _.template($('#bp-conflict-changes-template').html());
            //this.model.on('change', this.render, this);
        }
    });

    v.ErrorOverlay = Backbone.View.extend({
        className: 'rad-overlay-bg',

        events: {
            'click .bp-yes': 'tryAgain',
            'click .bp-no': 'startOver'
        },

        tryAgain: function () {
            this.hide();
            Backbone.trigger(ND.LBP.Events.TryAgain);
        },

        startOver: function () {
            Backbone.trigger(ND.LBP.Events.StartOver);
            this.hide();
        },

        hide: function () {
            this.destroy();
        },

        initialize: function () {
            this.template = _.template($('#bp-error-overlay-template').html());
            Backbone.on(ND.LBP.Events.CloseOverlay, this.hide, this);
        }
    });


    v.Navigation = Backbone.View.extend({

        children: [],

        render: function () {
            return this;
        }
    });

    v.Headers = Backbone.View.extend({

        id: 'bp-headers',

        children: [],

        events: {
            'click .current-step': 'showMobileMenu'
        },

        showMobileMenu: function (e) {
            this.toggleMobileMenu(true);
            e.stopImmediatePropagation();
            v.detectClickOutsideArea(this, function () {
                this.toggleMobileMenu(false);
            }, true);
        },

        removeMobileMenu: function () {
            this.toggleMobileMenu(false);
        },

        toggleMobileMenu: function (show) {
            this.$el.toggleClass(Constants.ACTIVE, show);
        },

        render: function () {
            var i = 0,
                el = this.$el,
                self = this,
                $ul = $('<ul></ul>');

            _.each(this.collection.models, function (step) {
                this.children[i] = new v.Header({model: step});
                // Note: .append(' ') is needed to make "text-align: justify" work
                // http://stackoverflow.com/questions/6865194/fluid-width-with-equally-spaced-divs?rq=1#comment-13627118
                $ul.append(self.children[i].render().$el).append(' ');
                i++;
            }, this);

            el.append($ul);

            return this;
        },

        renderSelectionForMobile: function (step) {
            if (step.get('selected')) {
                //console.log('selected ' + step.get('name'));
                this.$el.find('#bp-mobile-header').remove();
                this.$el.prepend(this.template(step.toJSON()));
            }
        },

        initialize: function () {
            this.template = _.template($('#bp-nav-current-header-template').html());
            Backbone.on(events.HideHeader, this.removeMobileMenu, this);
            Backbone.on(events.UpdateMobileHeader, this.renderSelectionForMobile, this);
            //this.collection.on('change', this.render, this);
        }
    });


    v.Header = Backbone.View.extend({

        tagName: 'li',

        events: {
            'click .disabled': 'preventClick',
            'click .enabled': 'headerClicked'
        },

        preventClick: function (e) {
            e.preventDefault();
            return false;
        },

        headerClicked: function (e) {
            e.preventDefault();
            Backbone.trigger(ND.LBP.Events.HeaderLinkClicked, this.model);
            Backbone.trigger(events.HideHeader);
        },

        render: function () {
            var selected = this.model.get('selected');
            $(this.el).toggleClass(Constants.ACTIVE, selected).html(this.template(this.model.toJSON()));
            if (selected) {
                Backbone.trigger(events.UpdateMobileHeader, this.model);
            }
            return this;
        },

        initialize: function () {
            this.template = _.template($('#bp-nav-header-list-item-template').html());
            this.model.on('change', this.render, this);
            this.model.on('destroy', this.destroy, this);
        }
    });


    v.Sidebar = Backbone.View.extend({

        children: [],

        events: {
            'click #bp-save-btn': 'saveConfiguration',
            'click #bp-share-btn': 'shareConfiguration',
            'click #bp-pdf-btn': 'pdfBtnClicked',
            'click .bp-share-config': 'socialLinkClicked',
            'click .bp-summary-btn' : 'callToActionButtonClicked'
        },

        pdfBtnClicked: function () {
            Backbone.trigger(ND.LBP.Events.ViewPDF);
        },

        saveConfiguration: function (e) {
            e.preventDefault();
            Backbone.trigger(ND.LBP.Events.SaveConfiguration, this.$('#bp-save-form'));
        },

        callToActionButtonClicked: function(e) {

            e.stopImmediatePropagation();
        },

        shareConfiguration: function (e) {
            e.preventDefault();
            Backbone
                .off(ND.LBP.Events.ShareConfigReady)
                .on(ND.LBP.Events.ShareConfigReady, function (url) {
                    this.$('#ckepop').html(this.jiaThisTemplate({shareUrl: encodeURI(url)}));
                    var $popupWrap = this.$('.share-popup-wrap');
                    $popupWrap.addClass('active');


                    v.detectClickOutsideArea({id: '#ckepop'}, function () {
                        $popupWrap.removeClass('active');
                    }, false);

                }, this);

            Backbone.trigger(ND.LBP.Events.ShareConfiguration, this.$('#bp-share-btn').data('shareurl'));


        },

        socialLinkClicked: function () {
            Backbone.trigger(ND.LBP.Events.SocialLinkClicked);
        },

        render: function () {
            //console.log('sidebar.render()');
            var i = 0,
                el = this.$el,
                self = this;
            el.empty().append($(this.template(this.model.toJSON())));
            var $firstButton = this.$('.actions.row.first'),
                $kmiMobileBtn = this.$('#bp-mobile-nav-btns'),
                sidebarButtons = this.model.get('buttons');

            _.each(sidebarButtons.models, function (sidebarButton) {
                this.children[i] = new v.SidebarButtons({model: sidebarButton});
                self.children[i].render().$el.insertBefore($firstButton);
                i++;
            }, this);

            sidebarButtons = this.model.get('mobileButtons');

            _.each(sidebarButtons.models, function (sidebarButton) {
                this.children[i] = new v.MobileSidebarButtons({model: sidebarButton});
                $kmiMobileBtn.append(self.children[i].render().el);
                i++;
            }, this);

            $('a.anchor-btn', $kmiMobileBtn).parent().addClass('next');
	        $('a.anchor-btn', $kmiMobileBtn).on('touchstart mouseover', function (e) {
                e.stopImmediatePropagation();
                $(this).addClass('hover');
            });
            $('a.anchor-btn', $kmiMobileBtn).on('touchend mouseleave', function (e) {
                e.stopImmediatePropagation();
                $(this).removeClass('hover');
            });

            if (this.model.get('pageName') === ND.LBP.Constants.SUMMARY_PAGE_NAME) {
                this.processSummaryLinks();
            }

            return this;
        },

        processSummaryLinks: function () {
            Backbone.trigger(ND.LBP.Events.SummaryButtonsLoaded, this.$el.find('.bp-summary-btn'));
            //HACK, copy call to action buttons from side nav to summary for mobile
            var $mobilCallToActions = $('#bp-mobile-summary-call-to-actions').html(this.$el.find('.bp-summary-call-to-actions').html());
            $mobilCallToActions.find('.actions.row').removeClass('small-hide').addClass('medium-hide');
        },


        initialize: function () {
            this.template = _.template($('#bp-sidebar-template').html());
            this.jiaThisTemplate = _.template($('#bp-jiathis-template').html());
            this.model.on('destroy', this.destroy, this);
            this.model.on('change', this.render, this);
        }
    });

    v.SidebarButtons = Backbone.View.extend({

        className: 'actions row small-hide',

        events: {
            'click .arrow-btn': 'continueClicked'
        },

        continueClicked: function (e) {
            e.preventDefault();
            Backbone.trigger(ND.LBP.Events.ButtonClicked, this.model);
        },

        initialize: function () {
            this.template = _.template($('#bp-sidebar-button-template').html());
            this.model.on('destroy', this.destroy, this);
            this.model.on('change', this.render, this);
        }
    });

    v.MobileSidebarButtons = Backbone.View.extend({

        className: 'columns small-4',

        events: {
            'click .anchor-btn': 'buttonClicked'
        },

        buttonClicked: function (e) {
            e.preventDefault();
            Backbone.trigger(ND.LBP.Events.ButtonClicked, this.model);
        },

        initialize: function () {
            this.template = _.template($('#bp-mobile-sidebar-button-template').html());
            this.model.on('destroy', this.destroy, this);
            this.model.on('change', this.render, this);
        }
    });


    v.Gallery = Backbone.View.extend({
        children: [],

        events: {
            'click .next': 'nextAngle',
            'click .prev': 'prevAngle',
            'click .pager-link': 'angelLink',
            'click .switch-btn': 'switchGallery'
        },

        switchGallery: function (e) {

            Backbone.trigger(ND.LBP.Events.ToggleGalleryView, $(e.currentTarget).data('categoryid'));
        },

        nextAngle: function (e) {
            e.preventDefault();

            var currentAngle = this.$galleryWrapper.find('li.active'),
                newAngle = currentAngle.next('li');

            if (newAngle.length === 0) {
                newAngle = this.$galleryWrapper.children('li').first();
            }

            this.animateToNextImage(currentAngle, newAngle);

            this.updatePage(newAngle.attr('id'));

//            Backbone.trigger(ND.LBP.Events.OrientationChanged) ;
        },

        prevAngle: function (e) {
            e.preventDefault();

            var currentAngle = this.$galleryWrapper.find('li.active'),
                newAngle = currentAngle.prev('li');

            if (newAngle.length === 0) {
                newAngle = this.$galleryWrapper.children('li').last();
            }

            this.animateToNextImage(currentAngle, newAngle);

            this.updatePage(newAngle.attr('id'));

//            Backbone.trigger(ND.LBP.Events.OrientationChanged);
        },

        angelLink: function (e) {
            e.preventDefault();

            var element = $(e.currentTarget);

            if (!element.hasClass(Constants.ACTIVE)) {
                var view = $(e.currentTarget).data('view'),
                    currentAngle = this.$galleryWrapper.find('li.active'),
                    newAngle = this.$('#' + view);
                this.animateToNextImage(currentAngle, newAngle);
                this.updatePage(view);
            }
        },

        animateToNextImage: function ($current, $next) {
            //console.log(' has class ' + $current.attr('class'));
            $current.removeClass(Constants.ACTIVE);
            //console.log('now it has class ' + $current.attr('class'));
            $next.addClass(Constants.ACTIVE);
        },

        updatePage: function (className) {
            var $pager = this.$pager;
            $pager.find('a.active').removeClass(Constants.ACTIVE);
            $pager.find('a.pager-link.' + className).addClass(Constants.ACTIVE);
        },

        render: function () {
            //console.log('gallery.render()');
            if (!this.model) { return this; }
            var i = 0,
                el = this.$el;
            el.empty().prepend($(this.template({id: this.model.id})));
            this.$galleryWrapper = el.find('ul.car-gallery');

            this.$pager = el.find('.pager');
            //console.log('getting layers for ' + vm.pf.determineDeviceType() + ' imageGroupId: ' + this.model.id);
            var layers = this.model.get(vm.pf.determineDeviceType()),
                activeClass,
                hidePager = false;
            if (layers.length === 1) {
                el.find('.controls-direction').hide();
                this.$pager.hide();
                hidePager = true;
            }
            _.each(layers.models, function (layer) {

                activeClass = (i == 0) ? Constants.ACTIVE : '';
                if (!hidePager) {
                    this.$pager.append(this.pagerTemplate({view: layer.get('view'), className: activeClass}));
                }
                this.children[i] = new v.GalleryImage({className: activeClass, model: layer});
                this.$galleryWrapper.append(this.children[i].render().$el);
                i++;
            }, this);

            el.find('.switch-btn').toggleClass('hide', this.showSwitchBtn);


            return this;
        },

        destroy: function () {
            this.off();
            this.$el.empty();
            this.stopListening();

            Backbone.off(ND.LBP.Events.ImageGroupUpdated);
            /**
             * if view has children, close the children as well
             */
            if (this.children) {
                _.each(this.children, function (child) {
                    child.destroy();
                });
                this.children = [];
            }
        },

        initialize: function (options) {
            this.template = _.template($('#bp-gallery-template').html());
            this.pagerTemplate = _.template($('#bp-gallery-pager-template').html());
            this.showSwitchBtn = (typeof options.showSwitchBtn === 'undefined') ? true : options.showSwitchBtn;
            Backbone.on(ND.LBP.Events.ImageGroupUpdated, this.render, this);
        }
    });

    v.GalleryImage = Backbone.View.extend({
        tagName: 'li',

        initialize: function (options) {
            this.noId = options.noId || false;
            this.model.on('destroy', this.destroy, this); // destroy fn unavailable?? Ronnel
            this.model.on('change', this.render, this);
        },

        render: function () {
            //console.log('galleryImage.render()');
            var el,
                index = 0,
                layers = this.model.get('layers');

            el = this.noId ? this.$el : this.$el.attr({id: this.model.get('view')});

            _.each(layers, function (layer) {
                //console.log('displaying layer image ' + layer);
                el.append('<div class="' + (index === 0 ? 'layer-bg' : 'layer')
                    + '" style="z-index:' + index + '"><img src="' + ND.LBP.Config.baseImageURL + layer + '"> </div>');
                index++;
            });

            return this;
        }
    });


    v.KeyFeatures = Backbone.View.extend({
//        children : [],
        events: {
            'click .comparison-overlay': 'showComparisonChart'
        },

        render: function () {
            this.$el.removeClass('hide').append(this.template(this.model.toJSON()));
            return this;
        },

        showComparisonChart: function (e) {
            e.preventDefault();
            var comparisonUrl = $(e.currentTarget).data('href');
            if (typeof comparisonUrl !== 'undefined') {
                $.ajax({
                    url: comparisonUrl,
                    type: 'GET'
                }).done(function (data) {
                    ND.LBP.ComparisonOverlay(data);
                }).fail(function () {
                    Backbone.trigger(ND.LBP.Events.ErrorOccurred, new ND.LBP.CommonModels.Error());
                });
            }
        },

        initialize: function () {
            this.template = _.template($('#bp-keyFeatures-template').html());
            this.model.on('change', this.render, this);
        }
    });


//    v.Hotspots = Backbone.View.extend({
//        className: 'row hotspots-list',
//
//        initialize: function() {
//            this.template = _.template($('#bp-hotspots-template').html());
//        }
//    });

    //View Manager
    var vm = {

        _cache: [],

        _hotspots: null,
        _hasPage: false,
        _hasKeyFeatures: false,
        _hasHeader: false,
        _hasSidebar: false,
        _gallery: null,

        _init: function () {

            Backbone.on(ND.LBP.Events.BlockUI, vm._blockUI, vm.pf);
            Backbone.on(ND.LBP.Events.UnblockUI, vm._unblockUI, vm.pf);
            Backbone.on(ND.LBP.Events.TriggerConflictResolution, vm.pf.conflictAlert, vm);
            Backbone.on(ND.LBP.Events.ConfirmSeriesChange, vm.pf.confirmationAlert, vm);
            Backbone.on(ND.LBP.Events.SuccessfullySaved, vm.pf.successAlert, vm);
//            Backbone.on(ND.LBP.Events.StartOver, vm._clearCache, vm.pf);
            Backbone.on(ND.LBP.Events.ErrorOccurred, vm.pf.error, vm);
            vm._cache['body'] = $('.build-and-price');
            vm._cache['gallery'] = $('<div class="car-stage border-wrap row"></div>');
            vm._cache['summary'] = $('<div class="summary border-wrap row"></div>');
            vm._cache['loader'] = $('<div id="bp-lincoln-loader" class="loading-bkground"><span class="loading-gif"></span></div>');
            vm._cache['alertOverlay'] = $('<div id="bp-alert-overlay" class="rad-overlay-bg"></div>');
            return vm;
        },

//        _clearCache: function(){
//            vm._hotspots = null;
//            vm._hasPage = false;
//            vm._hasKeyFeatures =  false;
//            vm._hasHeader  = false;
//            vm._hasSidebar = false;
//            vm._gallery = null;
//        },

        _blockUI: function () {

            //setTimeout(function() {
            $('body').append(vm._cache['loader']);
            // }, 1000);


        },

        _unblockUI: function () {

            vm._cache['loader'].remove();
        },

        pf: {      //public functions

            page: function () {
                if (!vm._hasPage) {
                    //console.log('create page');

                    vm._cache['page'] = $('.main.columns.large-12');
                    vm._cache['keyFeatures'] = vm._cache['page'].html();
                    vm._cache['page'].empty();
                    new v.Page({ el: $('.build-and-price') });
                    vm._hasPage = true;
                }
                $("html, body").animate({ scrollTop: 0 }, "slow");
                return vm.pf;
            },

            headers: function (steps) {
                if (!vm._hasHeader) {
                    //console.log('create categories');
                    new v.Headers({el: $('.steps-nav'), collection: steps}).render();
                    vm._hasHeader = true;
                }
                return vm.pf;
            },

            nameplates: function (nameplates) {
                //console.log('create nameplates');
                new nv.Nameplates({el: vm._cache['page'], collection: nameplates}).render();
                return vm.pf;
            },

            derivatives: function (series) {
                //console.log('create derivatives');
                new dv.Derivatives({el: vm._cache['page'], model: series}).render();
                return vm.pf;
            },

            exterior: function (exterior) {
                //console.log('create exterior');
                new exv.AllAccessories({el: vm._cache['page'], model: exterior}).render();
                return vm.pf;
            },

            summary: function (summaryModel) {
                //console.log('create summary');
                vm._cache['page'].append(vm._cache['summary']);
                new sumv.Summary({el: vm._cache['page'], model: summaryModel}).render();
                return vm.pf;
            },

            keyFeatures: function (model) {
                //if (!vm._hasKeyFeatures) {
                //console.log('create keyFeatures');
                //{el : vm._cache['page'], collection: features}
                vm._cache['page'].find('.large-9').append(vm._cache['keyFeatures']);

                new v.KeyFeatures({el: '#bp-key-features', model: model}).render();
                //   vm._hasKeyFeatures  = true;
                //}
                return vm.pf;
            },

            gallery: function (gallery) {
                //console.log('create gallery');
                vm._cache['page'].prepend(vm._cache['gallery']);
                if (vm._gallery != null) {
                    vm._gallery.destroy();
                }
                vm._gallery = new v.Gallery({el: $('.car-stage.border-wrap'), model: gallery});
                vm._gallery.render();
                return vm.pf;
            },

            hotspots: function () {
                //console.log('create hotspots');

                if (vm._hotspots == null) {
                    vm._hotspots = _.template($('#bp-hotspots-template').html());
                }

                vm._cache['page'].find('.large-9').append(vm._hotspots());

                return vm.pf;
            },

            sidebar: function (sidebarModel) {
                //console.log('create sidebar');
                // if (!vm._hasSidebar) {
                //     new v.Sidebar({ el: $('.aside.columns.large-3'), model: sidebarModel }).render();
                //     vm._hasSidebar = true;
                // }

                new v.Sidebar({ el: $('.aside.columns.large-3'), model: sidebarModel }).render();
                return vm.pf;
            },

            conflictAlert: function (alertData) {
                //console.log('create alert');
                $('.build-and-price').append(vm._cache['alertOverlay']);
                new v.ConflictOverlay({el: $('#bp-alert-overlay'), model: alertData}).render();
                return vm.pf;
            },

            confirmationAlert: function (alertData) {
                //console.log('create alert');
                $('.build-and-price').append(vm._cache['alertOverlay']);
                new v.ConfirmationOverlay({el: $('#bp-alert-overlay'), model: alertData}).render();
                return vm.pf;
            },

            successAlert: function () {
                $('.build-and-price').append(vm._cache['alertOverlay']);
                new v.SuccessOverlay({el: $('#bp-alert-overlay'), model: {}}).render();
                return vm.pf;
            },

            error: function (alertData) {
                $('.build-and-price').append(vm._cache['alertOverlay']);
                new v.ErrorOverlay({el: $('#bp-alert-overlay'), model: alertData}).render();

                return vm.pf;
            },

            determineDeviceType: function () {
                //console.log('screen.width: '  + screen.width + ' window.outerWidth: ' + window.outerWidth+ ' window.innerWidth: ' + window.innerWidth);
                if (window.screen.width < ND.LBP.Constants.MOBILE_SCREEN_SIZE) {
                    return 'mobile';
                }
                return 'web';
            }
        }
    };


    var pf = vm._init().pf;
    pf.Gallery = v.Gallery;
    pf.GalleryImage = v.GalleryImage;

    return pf;

})(jQuery, ND.LBP.NameplateViews, ND.LBP.DerivativeViews, ND.LBP.ExteriorViews, ND.LBP.SummaryViews);


/**
 * @author Sohrab Zabetian
 * @description nameplate module Lincoln build and price
 * @project Lincoln Build and Price
 */
(function () {

    var Constants = {
            FRAGMENT: 'nameplates',
            HEADER_ID: 1
        },

        _cache = { askForLocation: true },

        module = {

            trackPage: function () {
                Backbone.trigger(ND.LBP.Events.TrackOmniture, {state: ND.LBP.Constants.NAMEPLATE_PAGE_NAME});
            },
			setupConfirmationBeforeLeave: function() {
		leaveoutOverlay = function(url) {
			var destinationURL=url;
				$('#bp-leaveout-overlay').remove();
				$('.build-and-price').append($('<div id="bp-leaveout-overlay" class="rad-overlay-bg"></div>'));
				$('#bp-leaveout-overlay').hide();
				$('#bp-leaveout-overlay').html($('#bp-leaveout-overlay-template').html());				
                setTimeout(function(){
							$('#bp-leaveout-overlay .bp-yes').on("click", function(){
							$.cookie('bnp.anchor','N',{ path: '/', expires: 1 });
							$.cookie('dfy.pg.bkbtn',$('#badge a').attr('href'),{ path: '/', expires: 1 });
							if($(this).data("link")) {
									location.href=$(this).data("params")?$(this).data("link")+'?'+$(this).data("params"):$(this).data("link");
									}
							else {
									location.reload();
									}
								}
							);
							$('#bp-leaveout-overlay .bp-no').on("click", function(){
							$.cookie('bnp.anchor','N',{ path: '/', expires: 1 });
									if(destinationURL) {
										if(destinationURL==location.href) {
											location.reload();
										}
										else {									
											location.href=destinationURL;
											}
									} 
									else {
									$('#submit').trigger('click');
									}
								}
							);
							$('#bp-leaveout-overlay').show();
					},1000);
				};	
		$.cookie('bnp.anchor','Y',{ path: '/', expires: 1 });
		$('a').on('click',function(e){
			if($(this).attr('href')&&$(this).attr('href').toLowerCase().indexOf('http')==0&&(!$(this).attr('target')||$(this).attr('target').toLowerCase()!=='_blank')) {
				e.preventDefault();
				e.stopPropagation();
				leaveoutOverlay($(this).attr('href'),null);
				}
			});
		document['search-pannel'].onsubmit = function(e) {
			if($.cookie('bnp.anchor')=='Y') {
			if(e&&e.preventDefault) {
				e.preventDefault();
				e.stopPropagation();
				}
			else {
			event.returnValue = false;
			}
			leaveoutOverlay();
			};
		};
		window.onbeforeunload=function() {		
			window.onunload = function() {
				if($.cookie('bnp.anchor')=='Y') {
				$.cookie('bnp.anchor','N',{ path: '/', expires: 1 });
				location.href=location.href;
				leaveoutOverlay(location.href);
				}
			};
		}
        },

            loadAndDisplay: function () {

                //console.log('nameplateModule.loadAndDisplay');
                module.subscribeToEvents();
                Backbone.trigger(ND.LBP.Events.BlockUI);
                module.dataloader.getNameplates(function (nameplateCollection) {

                    ND.LBP.CommonViews
                        .page()
                        .headers(module.dataloader.updateHeaders(Constants.HEADER_ID, []))
                        .nameplates(module.filterNameplates(nameplateCollection));

                    /*Show Location Overlay*/
                    /*Comment out the code in case that the Clients need again ==!*/
                    /*Backbone.trigger(ND.LBP.Events.LoadFromCookie, function (cookie) {
                        if (_cache.askForLocation &&
                            !(typeof cookie.d !== 'undefined' &&
                            typeof cookie.l !== 'undefined' &&
                            typeof cookie.s !== 'undefined' && cookie.s === ND.LBP.Config.site)) {
                            Backbone.trigger(ND.LBP.Events.ShowLocationOverlay);
                            _cache.askForLocation = false;

                            Backbone.once(ND.LBP.Events.LocationChanged, module.trackPage, module);
                            Backbone.once(ND.LBP.Events.LocationCanceled, module.trackPage, module)

                        } else {
                            module.trackPage();
                        }
                    });*/
                    
                    module.trackPage(); 
					module.setupConfirmationBeforeLeave();
                    
                    Backbone.trigger(ND.LBP.Events.UnblockUI);

                    $('.nameplate-title').empty();

                });
            },

            filterNameplates: function (nameplateCollection) {
                var modelsNotShowHackConfig = ND.LBP.Config.modelsNotShow;

                if (modelsNotShowHackConfig && modelsNotShowHackConfig.length) {
                    var modelsToShow = [];
                    _.each(nameplateCollection.models, function (model) {
                        if (modelsNotShowHackConfig.indexOf(model.id) == -1) {
                            modelsToShow.push(model);
                        }
                    });

                    // if (notShowModels.length) {
                    //      // Backbone Collection.remove() not working in IE8 :(
                    //     nameplateCollection.remove(notShowModels);
                    // }

                    nameplateCollection.reset(modelsToShow);
                }

                return nameplateCollection;
            },

            saveAndContinue: function (model) {

                module.dataloader.getNameplates(function (nameplateCollection) {
                    nameplateCollection.select(model);
                    var replaceUrl = model.get('isModelNavigator');
                    Backbone.trigger(ND.LBP.Events.ChangePage, model.get('getModelPageUrl')(), replaceUrl);
                });
            },

            headerLinkClicked: function (model) {
                //console.log('nameplate.headerLinkClicked()');
                var pathUrl = model.get('pathURL');
                if (Constants.HEADER_ID < model.id) {
                    //console.log('nameplate.headerLinkClicked() changing path');
                    Backbone.trigger(ND.LBP.Events.ChangePage, pathUrl);
                }
            },

            buildPageUrl: function () {
                return '#' + Constants.FRAGMENT;
            },

            subscribeToEvents: function () {
                //register events and handlers
                Backbone.on(ND.LBP.Events.NameplateSelected, module.saveAndContinue, module);

            },

            unsubscribeFromEvents: function () {
                Backbone.off(ND.LBP.Events.NameplateSelected, module.saveAndContinue);
            },

            clearCache: function () {
                _cache = { askForLocation: true };
            },

            _init: function () {
                Backbone.on(ND.LBP.Events.StartOver, module.clearCache, module);
                Backbone.on(Constants.HEADER_ID + ND.LBP.Events.HeaderLinkClicked, module.headerLinkClicked, module);
                Backbone.on(ND.LBP.Events.UnsubscribeFromEvents, module.unsubscribeFromEvents, module);

                module.dataloader = ND.LBP.Builder;
                var routes = [
                    {
                        fragment: Constants.FRAGMENT,
                        name: ND.LBP.Constants.NAMEPLATE_PAGE_NAME,
                        buildPageUrl: module.buildPageUrl,
                        action: module.loadAndDisplay
                    }
                ];

                Backbone.on(ND.LBP.Events.RegisterModule, function (registerCallback) {
                    //console.log('nameplateModule.on ' + ND.LBP.Events.RegisterModule + ' event');
                    registerCallback.call(registerCallback, routes);
                });
            }
        };

    module._init();

//    Backbone.on(ND.LBP.Events.InitModules, $.proxy(nameplateModule._init, nameplateModule));

})();


/**
 * @author szabetian
 * @description exterior module
 * @project Lincoln Build and Price
 */

/*******************************START OF DATA LOADER*********************/
(function () {

    var Constants = {
            //NAMEPLATE_DETAILS : 'nameplateDetails',
            FRAGMENT: 'nameplates/:nameplateId',
            DERIVATIVE_ID: 'derivativeId',
            HEADER_ID: 2
        },

        _cache = {
            prevEngineId: null,
            prevDerivativeName: null,
            prevEngineName: null
        },

        module = {

            trackPage: function (nameplateDetails) {
                Backbone.trigger(ND.LBP.Events.TrackOmniture, {
                    state: ND.LBP.Constants.SERIES_PAGE_NAME,
                    year: nameplateDetails.get('year')
                });
            },

            loadAndDisplay: function (nameplateId) {
                //console.log('derivativeModule.loadAndDisplay');
                Backbone.trigger(ND.LBP.Events.BlockUI);
                module.subscribeToEvents();
                _cache.nameplateId = nameplateId;

                module.getModel(function (nameplateDetails) {
                    var series = nameplateDetails.get(ND.LBP.Constants.SERIES),
                        allDerivatives = series.get(ND.LBP.Constants.DERIVATIVES),
                        selectedEngine = nameplateDetails.findSelectedEngine();

                    _cache.derivativeId = selectedEngine ? selectedEngine.get(Constants.DERIVATIVE_ID) : '';
                    _cache.engineName = selectedEngine ? selectedEngine.get(ND.LBP.Constants.NAME) : '';
                    _cache.derivativeName = selectedEngine ? allDerivatives.get(_cache.derivativeId).get(ND.LBP.Constants.NAME) : '';
                    _cache.engineId = selectedEngine ? selectedEngine.id : '';

                    //console.log('found selectedEngine with derivativeId ' + selectedEngine.get(Constants.DERIVATIVE_ID));
                    //Backbone.trigger(ND.LBP.Events.GetPage, 'exterior', nameplateId, _cache.derivativeId, ND.LBP.Utils.removeDotSlash(_cache.engineId), 'exterior', function(nextPageUrl) {


                    //have to create headers before sidebar
                    var headerData = module.dataloader.updateHeaders(Constants.HEADER_ID, [nameplateId, _cache.derivativeId, ND.LBP.Utils.removeDotSlash(_cache.engineId)]),
                        nextPrevPages = module.dataloader.getNextPrevHeaders();

                    $('.nameplate-title').text('- ' + nameplateDetails.get('name'));

                    var nameplateValue = nameplateDetails.get('prices').at(0).get('value');

                    // Set global flag isDerivativePriceHidden to true
                    ND.LBP.Globals.isDerivativePriceHidden = nameplateValue == 1;

                    _cache.pathUrl = headerData.get(Constants.HEADER_ID).get('pathURL');
                    //console.log('nextPage url is ' + nextPrevPages.next + ' prevPage url is ' +  nextPrevPages.prev);


                    /* Comment out sidebar in case its needed again */
                    //
                    _cache.sidebar = module.dataloader.getSidebar({
                        // title: nameplateDetails.get(ND.LBP.Constants.NAME),
                        // description: nameplateDetails.get(ND.LBP.Constants.SIDEBAR_MESSAGES).join(''),
                        pageName: ND.LBP.Constants.SERIES_PAGE_NAME,
                        buttonData: [
                            {
                                id: 1,
                                name: ND.LBP.Constants.CONTINUE,
                                nextPageURL: nextPrevPages.next,
                                sequence: 0
                            }
                        ],
                        mobileButtonData: [
                            {
                                id: 1,
                                name: ND.LBP.Constants.NEXT,
                                nextPageURL: nextPrevPages.next,
                                sequence: 0
                            }
                        ]
                    });

                    _cache.sidebar.set('total', null);

                    ND.LBP.CommonViews
                        .page()
                        .headers(headerData)
                        .derivatives(series)
                        .sidebar(_cache.sidebar);

                    Backbone.trigger(ND.LBP.Events.UnblockUI);

                    module.trackPage(nameplateDetails);


                });
            },

//            setTotalPrice: function (nameplateDetails) {
//                var prices = nameplateDetails.get(ND.LBP.Constants.PRICES),
//                    total = null;
//                if (typeof prices !== 'undefined' && prices != null && prices.length > 0) {
//                    total = ND.PriceFormatter.format(prices.at(0).get('value'));
//                }
//                nameplateDetails.get(ND.LBP.Constants.SERIES).set('total', total);
//                _cache.sidebar.set('total', total);
//            },

            updateUserSelection: function (engine) {
                var derivativeId = engine.get(Constants.DERIVATIVE_ID);

                module.dataloader.getNameplateDetails(_cache.nameplateId, null, true, function (nameplateDetails) {

                    var nameplateDerivatives = nameplateDetails.get(ND.LBP.Constants.SERIES).get(ND.LBP.Constants.DERIVATIVES),
                        selectedDerivative = nameplateDerivatives.selectById(derivativeId);

                    _.each(nameplateDerivatives.models, function (derivative) {
                        derivative.get(ND.LBP.Constants.ENGINES).deselectAll();
                    });

                    selectedDerivative.get(ND.LBP.Constants.ENGINES).select(engine);

                    _cache.sidebar.set(Constants.DESCRIPTION, selectedDerivative.get(Constants.DESCRIPTION));

                    _cache.derivativeId = derivativeId;
                    _cache.derivativeName = selectedDerivative.get(ND.LBP.Constants.NAME);
                    _cache.engineId = engine.id;
                    _cache.engineName = engine.get(ND.LBP.Constants.NAME);
                    //will update the headers
                    module.dataloader.updateHeaders(Constants.HEADER_ID, [_cache.nameplateId, _cache.derivativeId, ND.LBP.Utils.removeDotSlash(_cache.engineId)]);
                    //Backbone.trigger(ND.LBP.Events.GetPage, 'exterior', _cache.nameplateId, derivativeId, ND.LBP.Utils.removeDotSlash(engine.id),'exterior', function(pageUrl) {
                    //console.log('updated page url is ' + pageUrl);
//                    var enginePrice = engine.get('price');
//                    if (enginePrice != null) {
//                        _cache.sidebar.set('total', enginePrice);
//                        nameplateDetails.get(ND.LBP.Constants.SERIES).set('total', enginePrice);
//                    }
                    module.dataloader.updateSidebarButtonUrl(1, module.dataloader.getNextPrevHeaders().next);
                    // });

                });
            },

            /**
             *
             * @param model Navigation button
             */
            saveAndContinue: function (model) {

                module.save(function () {
                    Backbone.trigger(ND.LBP.Events.UnblockUI);

                    //update sidebar
					var orgurl=model.get('nextPageURL'),
						nexturl='',
						i=0;
					$.each(orgurl,function(index,c){
						if (c==='#') {
							i++;
							if(i>1) {
								nexturl=nexturl+encodeURIComponent("#");
								}
							else {
								nexturl=nexturl+c;
							}
						}
						else {
							nexturl=nexturl+c;
						}
					});	
                    Backbone.trigger(ND.LBP.Events.ChangePage, nexturl);
                });
            },

            save: function (callback) {
                //confirm with user before switching derivatives
                if (_cache.prevEngineId == null || _cache.engineId !== _cache.prevEngineId) {

                    if (_cache.prevEngineId != null) {
                        Backbone.off(ND.LBP.Events.ChangeSeries);
                        Backbone.once(ND.LBP.Events.ChangeSeries, function () {
                            module.saveProgress(callback);
                        });

                        Backbone.trigger(ND.LBP.Events.ConfirmSeriesChange, new ND.LBP.CommonModels.Confirm({
                            newDerivativeName: _cache.derivativeName + ' ' +  _cache.engineName,
                            oldDerivativeName: _cache.prevDerivativeName + ' ' + _cache.prevEngineName
                        }));
                    } else {
                        module.saveProgress(callback);
                    }

                } else {
                    callback();
                }
            },

            saveProgress: function (callback) {

                Backbone.off(ND.LBP.Events.ChangeSeries);

                _cache.prevEngineId = _cache.engineId;
                _cache.prevDerivativeName = _cache.derivativeName;
                _cache.prevEngineName = _cache.engineName;
                Backbone.trigger(ND.LBP.Events.BlockUI);
                Backbone.trigger(ND.LBP.Events.SaveProgress, {
                    nameplateId: _cache.nameplateId,
                    state: null,
                    currentPathUrl: _cache.pathUrl,
                    changePath: true,
                    selections: [
                        {
                            id: _cache.engineId,
                            selected: true
                        }
                    ]
                }, callback);
            },

            buttonClicked: function (model) {
                var type = model.get('type');
                if (ND.LBP.Constants.NEXT === type && _cache.engineId.length) {
                    module.saveAndContinue(model);
                } else if (ND.LBP.Constants.PREV === type) {
                    Backbone.trigger(ND.LBP.Events.ChangePage, model.get('nextPageURL'));
                }
            },

            getModel: function (callback) {
                module.dataloader.getNameplateDetails(_cache.nameplateId, null, true, callback);
            },

            buildPageUrl: function (nameplateId) {
                return '#' + Constants.FRAGMENT.replace(':nameplateId', nameplateId);
            },

            subscribeToEvents: function () {
                //register events and handlers
                Backbone.on(ND.LBP.Events.SeriesEngineSelected, module.updateUserSelection, module);
                Backbone.on(ND.LBP.Events.ButtonClicked, module.buttonClicked, module);
            },

            unsubscribeFromEvents: function () {
                Backbone.off(ND.LBP.Events.SeriesEngineSelected, module.updateUserSelection);
                Backbone.off(ND.LBP.Events.ButtonClicked, module.buttonClicked);
            },

            headerLinkClicked: function (model) {
                //console.log('series.headerLinkClicked()');
                var pathUrl = model.get('pathURL')
                if (Constants.HEADER_ID < model.id) {
                    //console.log('series.headerLinkClicked() changing path');
                    module.save(function () {
                        Backbone.trigger(ND.LBP.Events.UnblockUI);
                        Backbone.trigger(ND.LBP.Events.ChangePage, pathUrl);
                    });
                } else {   //going back to nameplate page
                    Backbone.trigger(ND.LBP.Events.ChangePage, pathUrl);
                }

            },

            clearCache: function () {
                _cache = {
                    prevEngineId: null,
                    prevDerivativeName: null,
                    prevEngineName: null
                }
            },

            reloadCache: function (reloadModel) {
                _cache = {

                }

                module.dataloader.getNameplateDetails(reloadModel.id, null, true, function (nameplateDetailModel) {

                    var nameplateDerivatives = nameplateDetailModel.get(ND.LBP.Constants.SERIES).get(ND.LBP.Constants.DERIVATIVES),
                        selectedDerivative = nameplateDerivatives.getSelected();

                    _cache.prevDerivativeName = selectedDerivative.get(ND.LBP.Constants.NAME);
                    var engine = selectedDerivative.get(ND.LBP.Constants.ENGINES).getSelected();
                    _cache.prevEngineId = engine.id;
                    _cache.prevEngineName = engine.get(ND.LBP.Constants.NAME);

                });
                Backbone.off(ND.LBP.Events.ReloadingConfig, module.reloadCache);

            },

            _init: function () {
                Backbone.on(ND.LBP.Events.StartOver, module.clearCache, module);
                Backbone.on(Constants.HEADER_ID + ND.LBP.Events.HeaderLinkClicked, module.headerLinkClicked, module);
                Backbone.on(ND.LBP.Events.UnsubscribeFromEvents, module.unsubscribeFromEvents, module);
                Backbone.on(ND.LBP.Events.ReloadingConfig, module.reloadCache, module);
                module.dataloader = ND.LBP.Builder;
                var routes = [
                    {
                        fragment: Constants.FRAGMENT,
                        name: ND.LBP.Constants.SERIES_PAGE_NAME,
                        buildPageUrl: module.buildPageUrl,
                        action: module.loadAndDisplay
                    }
                ];

                Backbone.on(ND.LBP.Events.RegisterModule, function (registerCallback) {
                    //console.log('derivativeModule.on ' + ND.LBP.Events.RegisterModule + ' event');
                    registerCallback.call(registerCallback, routes);
                });
            }
        };

    module._init();

//    Backbone.on(ND.LBP.Events.InitModules, $.proxy(nameplateModule._init, nameplateModule));

})();


/**
 * @author Sohrab Zabetian
 * @description accessories module for exterior/interior/accessory pages
 * @project Lincoln Build and Price
 */
(function () {

    var Constants = {
            NAMEPLATE_DETAILS: 'nameplateDetails',
            FRAGMENT: 'nameplates/:nameplateId/series/:seriesId/engines/:engineId/category/:category',
            //TODO: what the hell am i doing here? find a generic way
            CATEGORY_SEQUENCE: {
                exterior: {
                    nextCategory: 'interior',
                    imageGroupId: 'Exterior',
                    omnitureState: '2',
                    headerId: 3
                },
                interior: {
                    nextCategory: 'accessories',
                    imageGroupId: 'Interior',
                    omnitureState: '3',
                    headerId: 4
                },
                accessories: {
                    nextCategory: null,
                    imageGroupId: 'Exterior',
                    omnitureState: '4',
                    omniturePagename: 'features',
                    headerId: 5
                }
            },

            HEADER_IDS: [3, 4, 5]
        },

        _cache = { },

        module = {
            buildPageUrl: function (nameplateId, derivativeId, engineId, category) {
                return '#' + Constants.FRAGMENT
                    .replace(':nameplateId', nameplateId)
                    .replace(':seriesId', derivativeId)
                    .replace(':engineId', engineId)
                    .replace(':category', category);
            },

            trackPage: function (categoryModel) {
                var catName = categoryModel.get('name');
                Backbone.trigger(ND.LBP.Events.TrackOmniture, {
                    state: ND.LBP.Constants.ACCESSORIES_PAGE_NAME,
                    category: {
                        name: (Constants.CATEGORY_SEQUENCE[catName].omniturePagename || catName),
                        //id:  categoryModel.id,
                        omniState: _cache.thisCategory.omnitureState//,
                        //analyticsStep: categoryModel.get('analyticsStep') || (_cache.thisCategory.headerId - 1),
                        //analyticsName: categoryModel.get('analyticsName'),
                    }
                });
            },

            loadAndDisplay: function (nameplateId, derivativeId, engineId, category) {
                //console.log('exteriorModule.loadAndDisplay');

                Backbone.trigger(ND.LBP.Events.BlockUI);

                _cache.nameplateId = nameplateId;
                _cache.derivativeId = derivativeId;
                _cache.category = category;
                _cache.thisCategory = Constants.CATEGORY_SEQUENCE[category];

                module.subscribeToEvents();

                module.dataloader.getNameplateDetails(nameplateId, engineId, true, function (nameplateDetails) {

                    if (nameplateDetails.get('state') == null) {
                        //console.log('app state is null, going back to the beginning');
                        Backbone.trigger(ND.LBP.Events.AppStateIsNull);
                        return;
                    }

                    //console.log('getting images for groupId ' + _cache.thisCategory.imageGroupId);
                    var exteriorInterior = nameplateDetails.get(category),
                        galleryImages = nameplateDetails.get(ND.LBP.Constants.IMAGE_GROUPS)
                                            ? nameplateDetails.get(ND.LBP.Constants.IMAGE_GROUPS).get(_cache.thisCategory.imageGroupId)
                                            : null,
                        headers = module.dataloader.updateHeaders(_cache.thisCategory.headerId, [nameplateId, derivativeId, engineId]),
                        prevNextHeaders = module.dataloader.getNextPrevHeaders();
                    //console.log('Setting imageGroupId: ' + _cache.thisCategory.imageGroupId);

                    _cache.pathUrl = headers.get(_cache.thisCategory.headerId).get('pathURL');

                    _cache.sidebar = module.dataloader.getSidebar({
                        // title: nameplateDetails.get(ND.LBP.Constants.NAME),
                        // description: nameplateDetails.get(ND.LBP.Constants.SIDEBAR_MESSAGES).join(''),
                        pageName: ND.LBP.Constants.ACCESSORIES_PAGE_NAME,
                        buttonData: [
                            {
                                id: 1,
                                name: ND.LBP.Constants.CONTINUE,
                                nextPageURL: prevNextHeaders.next
                            }
                        ],
                        mobileButtonData: [
                            {
                                id: 1,
                                name: ND.LBP.Constants.NEXT,
                                nextPageURL: prevNextHeaders.next
                            }
                        ]
                    });

                    module.setTotalPrice(nameplateDetails);

                    ND.LBP.CommonViews.page()
                        .headers(headers)
                        .exterior(exteriorInterior)
                        .gallery(galleryImages)
                        .sidebar(_cache.sidebar);
                        //.keyFeatures(module.dataloader.getKeyFeatures(nameplateDetails, derivativeId))

                    module.trackPage(exteriorInterior);

                    Backbone.trigger(ND.LBP.Events.UnblockUI);
//                        }
//                    );
                });
            },

            accessoryToggled: function (feature) {
                //console.log('accessoryToggled');
                //only select if it's not selected unless it's an accessory of type not specified below
                var specialType = feature.get('specialType');
                if (specialType === ND.LBP.Constants.COLOUR_TAB_ID ||
                    specialType === ND.LBP.Constants.INTERIOR_TRIM_TAB_ID ||
                    specialType === ND.LBP.Constants.INTERIOR_FABRIC_TAB_ID) {

                    if (!feature.get('selected')) {
                        module.sendAccessoryToggledRequest(feature);
                    }
                } else {
                    module.sendAccessoryToggledRequest(feature);
                }
            },

            sendAccessoryToggledRequest: function (feature) {
                Backbone.trigger(ND.LBP.Events.BlockUI);
                module.dataloader.storeFeatureName(feature.get('name'));
                Backbone.trigger(ND.LBP.Events.SaveProgress, {
                        nameplateId: _cache.nameplateId,
                        currentPathUrl: _cache.pathUrl,
                        changePath: false,
                        selections: [
                            {
                                id: feature.id,
                                selected: !feature.get('selected')
                            }
                        ]
                    },
                    function (nameplateDetails) {


                        _cache.sidebar.set({
                            'description': nameplateDetails.get(ND.LBP.Constants.SIDEBAR_MESSAGES).join('')
                        });
                        module.setTotalPrice(nameplateDetails);
                        Backbone.trigger(ND.LBP.Events.UnblockUI);
                    }
                );
            },

            setTotalPrice: function (nameplateDetails) {
                var prices = nameplateDetails.get(ND.LBP.Constants.PRICES),
                    total = null;

                // Set total to coming soon if total is 0
                if (ND.LBP.Globals.isDerivativePriceHidden) {
                    total = ND.LBP.Config.hidePriceText;
                } else if (typeof prices !== 'undefined' && prices != null && prices.length > 0) {
                    total = ND.PriceFormatter.format(prices.at(0).get('value'));
                }

                nameplateDetails.get(_cache.category).set('total', total);
                _cache.sidebar.set('total', total);
            },

            buttonClicked: function (model) {


                var type = model.get('type'),
                    nextPageUrl = model.get('nextPageURL');
                if (ND.LBP.Constants.NEXT === type) {
                    module.save(function () {
                        module.navigateToUrl(nextPageUrl);
                    });
                }
                else if (ND.LBP.Constants.PREV === type) {
                    module.navigateToUrl(nextPageUrl);
                }
            },

            save: function (callback) {
                module.dataloader.getNameplateDetails(_cache.nameplateId, _cache.engineId, true, function (nameplateDetail) {

                    var featureGroups = nameplateDetail.get(_cache.category).get(ND.LBP.Constants.FEATURE_GROUPS),
                        features,
                        specialType,
                        accessoryEventTriggered = false,
                        omnitureData = {
                            state: ND.LBP.Constants.ACCESSORIES_PAGE_NAME,
                            category: {
                                name: (_cache.thisCategory.omniturePagename || _cache.thisCategory.name),
                                //id:  categoryModel.id,
                                year: nameplateDetail.get('year'),
                                omniState: _cache.thisCategory.omnitureState//,
                                //analyticsStep: categoryModel.get('analyticsStep') || (_cache.thisCategory.headerId - 1),
                                //analyticsName: categoryModel.get('analyticsName'),
                                //isColourCategory: isColourCategory
                            }
                        };
                    featureGroups.each(function (featureGroup) {
                        features = featureGroup.get(ND.LBP.Constants.FEATURES);
                        specialType = featureGroup.get(ND.LBP.Constants.SPECIAL_TYPE);
                        features.each(function (feature) {
                            var state = feature.get('state');
                            if (feature.get('selected') && (state !== 'DEFAULT' && state !== 'INCLUDED')) {
                                //console.log('feature ' + feature.get('name') + ' has specialType ' + specialType);
                                if (specialType === ND.LBP.Constants.COLOUR_TAB_ID) {
                                    Backbone.trigger(ND.LBP.Events.ColorSelected, omnitureData);
                                } else if (specialType === ND.LBP.Constants.RIMS_TAB_ID) {
                                    Backbone.trigger(ND.LBP.Events.RimSelected, omnitureData);
                                } else if (specialType === ND.LBP.Constants.INTERIOR_TRIM_TAB_ID) {
                                    Backbone.trigger(ND.LBP.Events.FabricSelected, omnitureData);
                                } else if (specialType === ND.LBP.Constants.INTERIOR_FABRIC_TAB_ID) {
                                    Backbone.trigger(ND.LBP.Events.TrimSelected, omnitureData);
                                } else if (!accessoryEventTriggered) {
                                    Backbone.trigger(ND.LBP.Events.AccessorySelected, omnitureData);
                                    accessoryEventTriggered = true;
                                }
                            }
                        });
                    });

                    callback();
                });
            },

            headerLinkClicked: function (model, currentHeaderId) {
                //console.log('accessories.headerLinkClicked()');
                var pathURL = model.get('pathURL');
                //we are already on one of these pages
                if (
                //and we are NOT on this category already
                    currentHeaderId < model.id) {
                    //console.log('accessories.headerLinkClicked() changing path');
                    module.save(function () {
                        module.navigateToUrl(pathURL);
                    });
                } else {  //if user is going back, just navigate away
                    module.navigateToUrl(pathURL);
                }
            },

            navigateToUrl: function (pathURL) {
                Backbone.trigger(ND.LBP.Events.UnblockUI);
                Backbone.trigger(ND.LBP.Events.ChangePage, pathURL);
            },

            subscribeToEvents: function () {
                //register events and handlers
                module.unsubscribeFromEvents();
                //console.log(_cache.category + ': subscribeFromEvents');
                Backbone.on(ND.LBP.Events.AccessoryToggled, module.accessoryToggled, module);
                Backbone.on(ND.LBP.Events.ButtonClicked, module.buttonClicked, module);
            },

            unsubscribeFromEvents: function () {
                //unregister events and handlers
                //console.log(_cache.category + ': unsubscribeFromEvents');
                Backbone.off(ND.LBP.Events.AccessoryToggled, module.accessoryToggled);
                Backbone.off(ND.LBP.Events.ButtonClicked, module.buttonClicked);
            },

            clearCache: function () {
                _cache = { };
            },

            _init: function () {
                Backbone.on(ND.LBP.Events.StartOver, module.clearCache, module);
                _.each(Constants.HEADER_IDS, function (currentHeaderId) {
                    Backbone.on(currentHeaderId + ND.LBP.Events.HeaderLinkClicked, function (model) {
                        module.headerLinkClicked(model, currentHeaderId);
                    }, module);
                });

                Backbone.on(ND.LBP.Events.UnsubscribeFromEvents, module.unsubscribeFromEvents, module);
                module.dataloader = ND.LBP.Builder;
                var routes = [
                    {
                        fragment: Constants.FRAGMENT,
                        name: ND.LBP.Constants.ACCESSORIES_PAGE_NAME,
                        buildPageUrl: module.buildPageUrl,
                        action: module.loadAndDisplay
                    }
                ];

                Backbone.on(ND.LBP.Events.RegisterModule, function (registerCallback) {
                    //console.log('exteriorModule.on ' + ND.LBP.Events.RegisterModule + ' event');
                    registerCallback.call(registerCallback, routes);
                });
            }
        };

    module._init();


})();


/**
 * @author szabetian
 * @description derivatives module
 * @project Lincoln Build and Price
 */

/**
 * @param exc
 */
(function ($) {

    var Constants = {
            FRAGMENT: 'nameplates/:nameplateId/series/:seriesId/engines/:engineId/summary',
            HEADER_ID: 6,
            EXTERIOR_ID: 'Exterior',
            IMAGE_GROUP_SEQUENCE: {
                Exterior: {
                    next: 'Interior'
                },
                Interior: {
                    next: 'Exterior'
                }
            }
        },

        _cache = {
            omniture: {}
        },

        module = {
            buildPageUrl: function (nameplateId, derivativeId, engineId) {
                return '#' + Constants.FRAGMENT.replace(':nameplateId', nameplateId).replace(':seriesId', derivativeId).replace(':engineId', engineId);
            },

            trackPage: function () {
                _cache.omniture.state = ND.LBP.Constants.SUMMARY_PAGE_NAME;
                Backbone.trigger(ND.LBP.Events.TrackOmniture, _cache.omniture);
            },setupConfirmationBeforeLeave: function() {
		leaveoutOverlay = function(url) {
			var destinationURL=url;
				$('#bp-leaveout-overlay').remove();
				$('.build-and-price').append($('<div id="bp-leaveout-overlay" class="rad-overlay-bg"></div>'));
				$('#bp-leaveout-overlay').hide();
				$('#bp-leaveout-overlay').html($('#bp-leaveout-overlay-template').html());				
                setTimeout(function(){
							$('#bp-leaveout-overlay .bp-yes').on("click", function(){
							$.cookie('bnp.anchor','N',{ path: '/', expires: 1 });
							$.cookie('dfy.pg.bkbtn',$('#badge a').attr('href'),{ path: '/', expires: 1 });
							if($(this).data("link")) {
									location.href=$(this).data("params")?$(this).data("link")+'?'+$(this).data("params"):$(this).data("link");
									}
							else {
									location.reload();
									}
								}
							);
							$('#bp-leaveout-overlay .bp-no').on("click", function(){
							$.cookie('bnp.anchor','N',{ path: '/', expires: 1 });
									if(destinationURL) {
										if(destinationURL==location.href) {
											location.reload();
										}
										else {									
											location.href=destinationURL;
											}
									} 
									else {
									$('#submit').trigger('click');
									}
								}
							);
							$('#bp-leaveout-overlay').show();
					},1000);
				};	
		$.cookie('bnp.anchor','Y',{ path: '/', expires: 1 });
		$('a').on('click',function(e){
			if($(this).attr('href')&&$(this).attr('href').toLowerCase().indexOf('http')==0&&(!$(this).attr('target')||$(this).attr('target').toLowerCase()!=='_blank')) {
				e.preventDefault();
				e.stopPropagation();
				leaveoutOverlay($(this).attr('href'),null);
				}
			});
		document['search-pannel'].onsubmit = function(e) {
			if($.cookie('bnp.anchor')=='Y') {
			if(e&&e.preventDefault) {
				e.preventDefault();
				e.stopPropagation();
				}
			else {
			event.returnValue = false;
			}
			leaveoutOverlay();
			};
		};
		window.onbeforeunload=function() {		
			window.onunload = function() {
				if($.cookie('bnp.anchor')=='Y') {
				$.cookie('bnp.anchor','N',{ path: '/', expires: 1 });
				location.href=location.href;
				leaveoutOverlay(location.href);
				}
			};
		}

        },

//            isUserLoggedIn: function() {
//                var userCookie = $.cookie("dfy.lh.u");
//                if (typeof userCookie !== 'undefined' && userCookie != null && userCookie !== '') {
//                  return true;
//                }
//
//                return false;
//            },

            loadAndDisplay: function (nameplateId, derivativeId, engineId) {
                //console.log('summaryModule.loadAndDisplay');
                Backbone.trigger(ND.LBP.Events.BlockUI);

                module.subscribeToEvents();

                _cache.nameplateId = nameplateId;
                _cache.derivativeId = derivativeId;
                _cache.engineId = ND.LBP.Utils.removeDotSlash(engineId);
                _cache.userSelectedIds = '';

                module.dataloader.getNameplateDetails(nameplateId, _cache.engineId, true, function(nameplateDetail) {

                    if (nameplateDetail.get('state') == null) {
                        //console.log('app state is null, going back to the beginning');
                        Backbone.trigger(ND.LBP.Events.AppStateIsNull);
                        return;
                    }

                    var nameplateValue = nameplateDetail.get('prices').at(0).get('value');

                    // Set global flag isDerivativePriceHidden to true
                    ND.LBP.Globals.isDerivativePriceHidden = nameplateValue == 1;

                    var total = module.getTotalPrice(nameplateDetail);

                    if ($('.nameplate-title').is(':empty')) {
                        $('.nameplate-title').text('- ' + nameplateDetail.get('name'));
                    }

                    _cache.headers = module.dataloader.updateHeaders(Constants.HEADER_ID, [nameplateId, derivativeId, engineId]);
                    _cache.summaryModel = module.buildSummaryModel(nameplateDetail, total);

                    var exteriorImages = nameplateDetail.get(ND.LBP.Constants.IMAGE_GROUPS)
                                       ? nameplateDetail.get(ND.LBP.Constants.IMAGE_GROUPS).get('Exterior')
                                       : null;

                    _cache.summaryModel.set({'galleryPreview': exteriorImages, 'images': exteriorImages});

                    Backbone.trigger(ND.LBP.Events.LoadFromCookie, function (cookie) {
                        if (cookie.s !== ND.LBP.Config.site) {
                            cookie = {};
                        }
                        _cache.loc = cookie.l;
                        _cache.locDisplay = cookie.d;
                        _cache.summaryModel.set(ND.LBP.Constants.USER_LOCATION, cookie.d);
                    });


                    _cache.sidebar = module.dataloader.getSidebar({
                        // title: nameplateDetail.get(ND.LBP.Constants.NAME),
                        // description: nameplateDetail.get(ND.LBP.Constants.SIDEBAR_MESSAGES).join(''),
                        pageName: ND.LBP.Constants.SUMMARY_PAGE_NAME,
                        hidePDFShare: false,
                        hideSave: false, /*!module.isUserLoggedIn()*/
                        hidePDFButton: ND.LBP.Globals.isDerivativePriceHidden,
                        buttonData: [],
                        state: nameplateDetail.get('state'),
                        hideConnect: true,
                        mobileButtonData: [
                            // {
                            //    id : 1,
                            //    name: ND.LBP.Constants.CONNECT,
                            //    type: ND.LBP.Constants.CONNECT,
                            //    nextPageURL: ''
                            // }
                        ]
                    });

                    _cache.sidebar.set('total', total);

                    ND.LBP.CommonViews.page()
                        .headers(_cache.headers)
                        .summary(_cache.summaryModel)
                        .keyFeatures(module.dataloader.getKeyFeatures(nameplateDetail, derivativeId))
                        .hotspots()
                        .sidebar(_cache.sidebar);

                    module.trackPage(); 
					module.setupConfirmationBeforeLeave();
                    Backbone.trigger(ND.LBP.Events.UnblockUI);
                });

            },

            getTotalPrice: function (nameplateDetail) {
                var prices = nameplateDetail.get(ND.LBP.Constants.PRICES),
                    total = null;

                if (ND.LBP.Globals.isDerivativePriceHidden) {
                    total = ND.LBP.Config.hidePriceText;
                } else if (typeof prices !== 'undefined' && prices != null && prices.length > 0) {
                    total = ND.PriceFormatter.format(_cache.unformattedTotal = prices.at(0).get('value'));
                }

                return total;
            },


            buildSummaryModel: function (nameplateDetails, total) {
                var derivatives = nameplateDetails.get(ND.LBP.Constants.SERIES).get(ND.LBP.Constants.DERIVATIVES),
                    selectDerivativeEngines = module.getSelectedDerivativeEngine(derivatives);

                selectDerivativeEngines.nameplate = nameplateDetails.get(ND.LBP.Constants.NAME);

                _cache.unformattedOriginalPrice = parseInt(selectDerivativeEngines.enginePrice.replace(/\D/ig, ''));
                _cache.omniture = selectDerivativeEngines;
                _cache.omniture.year = nameplateDetails.get('year');


                var summary = new ND.LBP.SummeryModels.Summary(selectDerivativeEngines),
                    summaryCategories = new ND.LBP.SummeryCollections.SummaryCategories(),
                    categories = [ND.LBP.Constants.EXTERIOR, ND.LBP.Constants.INTERIOR, ND.LBP.Constants.ACCESSORIES];

                _cache.omniture.omnitureFeatures = [];
                _cache.omniture.vehicleOptions = [];

                _.each(categories, function (category) {
                    var accessories = module.getSelectedAccessories(nameplateDetails.get(category));
                    var summaryCategory = new ND.LBP.SummeryModels.SummaryCategory(accessories);
                    summaryCategories.add(summaryCategory);
                }, this);

                summary.set({
                    'categories': summaryCategories,
                    'seriesRoute': module.dataloader.getRouteForPage('series'),
                    'price': selectDerivativeEngines.enginePrice,
                    'total': total
                });

                return summary;
            },

            getSelectedDerivativeEngine: function (derivatives) {
                var foundObject = null,
                    engines;
                _.find(derivatives.models, function (derivative) {
                    engines = derivative.get(ND.LBP.Constants.ENGINES);
                    return _.find(engines.models, function (engine) {
                        if (ND.LBP.Constants.SELECTED_STATES.indexOf(engine.get(ND.LBP.Constants.STATE)) >= 0) {
                            foundObject = {
                                series: derivative.get(ND.LBP.Constants.NAME),
                                seriesId: derivative.id,
                                engine: engine.get(ND.LBP.Constants.NAME),
                                enginePrice: engine.get('price'),
                                engineId: engine.id
                            };

                            _cache.engineName = foundObject.engine;
                            //TODO include engine price in the next launch
                            return true;
                        }
                        return false;
                    }) != null;
                });
                return foundObject;
            },

            getSelectedAccessories: function (accessoriesCategory) {
                var featureGroups = accessoriesCategory.get(ND.LBP.Constants.FEATURE_GROUPS),
                    summaryAccessories = new ND.LBP.SummeryCollections.SummaryAccessories(),
                    features,
                    specialType,
                    seq;

                _.each(featureGroups.models, function (featureGroup) {
                    var isHidden = featureGroup.get('isHidden');

                    if (!isHidden) {
                        features = featureGroup.get(ND.LBP.Constants.FEATURES);
                        specialType = featureGroup.get(ND.LBP.Constants.SPECIAL_TYPE);
                        seq = 0;

                        features.each(function (feature) {

                            // console.log('feature' + (yaya++), feature);
                            if (ND.LBP.Constants.SELECTED_STATES.indexOf(feature.get('state')) >= 0) {

                                if (specialType === ND.LBP.Constants.COLOUR_TAB_ID) {
                                    _cache.omniture.colourId = feature.id;
                                    _cache.colourName = feature.get('name');
                                } else if (specialType === ND.LBP.Constants.INTERIOR_TRIM_TAB_ID) {
                                    _cache.omniture.trimId = feature.id;
                                } else if (specialType === ND.LBP.Constants.INTERIOR_FABRIC_TAB_ID ||
                                    specialType === ND.LBP.Constants.RIMS_TAB_ID) {
                                    _cache.omniture.omnitureFeatures.push(feature.id);
                                } else {
                                    _cache.omniture.vehicleOptions.push(feature.id);
                                }

                                if (specialType !== ND.LBP.Constants.COLOUR_TAB_ID) {

                                    if (_cache.userSelectedIds.length !== 0) {
                                        _cache.userSelectedIds += ',';
                                    }

                                    _cache.userSelectedIds += feature.get('id');
                                }

                                summaryAccessories.add(new ND.LBP.SummeryModels.SummaryAccessory({
                                    name: feature.get(ND.LBP.Constants.NAME),
                                    price: ND.LBP.CommonModels.formatFeaturePrice(feature),
                                    sequence: seq
                                }));

                                seq++;
                            }

                        });
                    }
                });

                if (summaryAccessories.length === 0) {
                    summaryAccessories.add(new ND.LBP.SummeryModels.SummaryAccessory({name: 'none', price: null, sequence: 0}));
                }

                var foundHeaders = _cache.headers.where({pagename: accessoriesCategory.get(ND.LBP.Constants.NAME)}),
                    headerName;

                if (foundHeaders != null && foundHeaders.length > 0) {
                    headerName = foundHeaders[0].get(ND.LBP.Constants.NAME);
                } else {
                    headerName = accessoriesCategory.get(ND.LBP.Constants.NAME);
                }

                return {
                    name: headerName,
                    categoryRoute: module.dataloader.getRouteForPage(accessoriesCategory.get(ND.LBP.Constants.NAME)),
                    accessories: summaryAccessories
                };
            },


            locationChanged: function (locValue, locText) {
                _cache.summaryModel.set(ND.LBP.Constants.USER_LOCATION, locText);
            },

            galleryViewChanged: function (categoryId) {
                module.dataloader.getNameplateDetails(_cache.nameplateId, _cache.engineId, true, function (nameplateDetail) {

                    //TODO update this logic


                    var nextCategoryId = Constants.IMAGE_GROUP_SEQUENCE[categoryId].next;
                    if (typeof nextCategoryId === 'undefined') {
                        nextCategoryId = Constants.EXTERIOR_ID;
                    }

                    var galleryImages = nameplateDetail.get(ND.LBP.Constants.IMAGE_GROUPS).get(nextCategoryId);
                    _cache.summaryModel.set(ND.LBP.Constants.IMAGES, galleryImages);
                    Backbone.trigger(ND.LBP.Events.ImageGroupUpdated);

                });
            },


            populateSummaryButtons: function(links) {

                _.each(links, function(link) {

                   var $link = $(link),
                    params = $link.data('params') || '',
                    isSinglePage = $link.data('singlepage') || false;

                    if (typeof params !== 'undefined' && params.length > 0) {

                        params = params.replace(':catalogId', _cache.nameplateId)
                                       .replace(':wersCode', _cache.derivativeId)
                                       .replace(':price', _cache.unformattedOriginalPrice)
                                       .replace(':engine', encodeURIComponent(_cache.engineId))
                                       .replace(':userSelected', _cache.userSelectedIds);

                        if (isSinglePage) {
                            $link.attr('href', $link.attr('href') + params);
                        } else {
                            var url = $link.attr('href') +
                                      ($link.attr('href').indexOf('?') > 0
                                          ? ('&' + params)
                                          : ('?' + params));
                            $link.attr('href', url);
                        }
                    }
                });
				setTimeout(function() {
					$(".fullscreen-overlay").radOverlay({
						additionalClass: "auto-height-overlay"
					})
				}, 1000);
            },


            saveConfiguration: function (form) {
//                if (module.isUserLoggedIn()) {
                module.dataloader.getNameplateDetails(_cache.nameplateId, _cache.engineId, true, function (nameplateDetails) {

                    var selectedDerivative = nameplateDetails
                                                .get(ND.LBP.Constants.SERIES)
                                                .get(ND.LBP.Constants.DERIVATIVES)
                                                .getSelected();

                    if (typeof selectedDerivative !== 'undefined' && selectedDerivative != null) {
                        var key,
                            allWERSCodes = nameplateDetails.getAllWERSCodes(),
                            selectedWERSCodes = nameplateDetails.getSelectedWERSCode(),
                            engineWERSCode = nameplateDetails.dissembleEngineId(_cache.engineId, _cache.derivativeId);

                        //  console.log('allWERSCodes.length ' + allWERSCodes.length + ' : ' + allWERSCodes);

                        //selectedWERSCodes.push(engineWERSCode);
                        //selectedWERSCodes.push(_cache.derivativeId);
						selectedWERSCodes.push(_cache.engineId);

                        var date = new Date();
                        var timeStamp = date.getFullYear() + '' +
                                        ND.LBP.Utils.pad2(date.getMonth() + 1) + '' +
                                        ND.LBP.Utils.pad2(date.getDate()) + '' +
                                        ND.LBP.Utils.pad2(date.getHours()) + '' +
                                        ND.LBP.Utils.pad2(date.getMinutes()) + '' +
                                        ND.LBP.Utils.pad2(date.getSeconds());
                        var data = {
                            modelId: _cache.nameplateId,
                            derivativeId: _cache.derivativeId,
                            engineId: _cache.engineId,
                            allFeatures: allWERSCodes,
                            selectedFeatures: selectedWERSCodes,
                            postcode: _cache.loc
                        };

                        for (key in data) {
                            $('#lbp-save-' + key).val(data[key]);
                        }

                        /**
                         * The generated URL is too long for IE 8 and since in 2014 we still have to support IE 8 (Yes I know!!),
                         * we have to get around the problem by saving the state in a cookie instead.
                         * this cookie will be read by my-lincoln page (save-buildandprice-config.js) and is passed
                         * back when user saves/cancels a config . However if the cookie is missing, we just load the summary
                         * page with default config :(
                         */
                        $.cookie("dfy.lbp.save.state", nameplateDetails.get('state'), { expires: 7, path: "/" });
                        $.cookie("dfy.lbp.save.name", selectedDerivative.get('name') + ' ' + _cache.engineName + ' ' + _cache.colourName + ' ' + timeStamp, { expires: 7, path: "/" });

                        //disable popup message that requires user to confirm leaving b&p page.
                        window.onbeforeunload = null;

                        form.submit();
                    }
                });
            },

            shareConfiguration: function (shareUrl) {
                Backbone.trigger(ND.LBP.Events.BlockUI);
                module.dataloader.getNameplateDetails(_cache.nameplateId, _cache.engineId, true, function (nameplateDetails) {

                    var selectedWERSCodes = nameplateDetails.getSelectedWERSCode(),
                        engineWERSCode = nameplateDetails.dissembleEngineId(_cache.engineId, _cache.derivativeId);
                    //selectedWERSCodes.push(engineWERSCode);
                    //selectedWERSCodes.push(_cache.derivativeId);
                    $.ajax({
                        type: 'POST',
                        dataType: 'json',
                        contentType: 'application/json; charset=UTF-8',
                        url: shareUrl,
                        data: JSON.stringify({
                            modelId: _cache.nameplateId,
                            //derivativeId: _cache.derivativeId,
                            //engineId: engineWERSCode,
							compoundId:_cache.engineId,
                            colourId: '0',//_cache.omniture.colourId,
                            trimId: '0',//_cache.omniture.trimId,
                            features: selectedWERSCodes,
                            postcode: _cache.loc /*+ ':' + _cache.locDisplay*/,
                            priceZoneId: ND.LBP.Config.priceZoneId,
                            site: ND.LBP.Config.site,
                            usage: 'b'
                        }),
                        success: function (data) {
                            Backbone.trigger(ND.LBP.Events.UnblockUI);
                            if (typeof data !== 'undefined' && data != null && typeof data.url !== 'undefined') {
                                Backbone.trigger(ND.LBP.Events.ShareConfigReady, data.url);
                            }
                        },
                        error: function (data) {
                            Backbone.trigger(ND.LBP.Events.UnblockUI);
                            Backbone.trigger(ND.LBP.Events.ErrorOccurred, new ND.LBP.CommonModels.Error());
                        }
                    });
                });
            },

            buttonClicked: function (model) {
                var type = model.get('type');
                if (ND.LBP.Constants.PREV === type) {
                    Backbone.trigger(ND.LBP.Events.ChangePage, model.get('nextPageURL'));
                }
            },

            subscribeToEvents: function () {
                //register events and handlers
                //console.log('summaryModule.subscribeToEvents');
                Backbone.on(ND.LBP.Events.LocationChanged, module.locationChanged, module);
                Backbone.on(ND.LBP.Events.ToggleGalleryView, module.galleryViewChanged, module);
                Backbone.on(ND.LBP.Events.ButtonClicked, module.buttonClicked, module);
                Backbone.on(ND.LBP.Events.ShareConfiguration, module.shareConfiguration, module);
                Backbone.on(ND.LBP.Events.SaveConfiguration, module.saveConfiguration, module);
                Backbone.on(ND.LBP.Events.SummaryButtonsLoaded, module.populateSummaryButtons, module);
            },

            unsubscribeFromEvents: function () {
                //console.log('summaryModule.unsubscribeFromEvents');
                Backbone.off(ND.LBP.Events.ButtonClicked, module.buttonClicked);
                Backbone.off(ND.LBP.Events.LocationChanged, module.locationChanged);
                Backbone.off(ND.LBP.Events.ToggleGalleryView, module.galleryViewChanged);
                Backbone.off(ND.LBP.Events.ShareConfiguration, module.shareConfiguration);
                Backbone.off(ND.LBP.Events.SaveConfiguration, module.saveConfiguration);
                Backbone.off(ND.LBP.Events.SummaryButtonsLoaded, module.populateSummaryButtons);
            },


            headerLinkClicked: function (model) {
                //console.log('summary.headerLinkClicked()');
                var currentHeader = module.dataloader.getCurrentHeader();
                if (currentHeader.id === Constants.HEADER_ID) {
                    //console.log('summary.headerLinkClicked() changing path');
                    Backbone.trigger(ND.LBP.Events.ChangePage, model.get('pathURL'));
                }
            },

            clearCache: function () {
                _cache = {  omniture: {}};
            },

            _init: function () {
                Backbone.on(ND.LBP.Events.StartOver, module.clearCache, module);
                Backbone.on(Constants.HEADER_ID + ND.LBP.Events.HeaderLinkClicked, module.headerLinkClicked, module);
                Backbone.on(ND.LBP.Events.UnsubscribeFromEvents, module.unsubscribeFromEvents, module);
                module.dataloader = ND.LBP.Builder;
                var routes = [
                    {
                        fragment: Constants.FRAGMENT,
                        name: ND.LBP.Constants.SUMMARY_PAGE_NAME,
                        buildPageUrl: module.buildPageUrl,
                        action: module.loadAndDisplay
                    }
                ];

                Backbone.on(ND.LBP.Events.RegisterModule, function (registerCallback) {
                    //console.log('summaryModule.on ' + ND.LBP.Events.RegisterModule + ' event');
                    registerCallback.call(registerCallback, routes);
                });
            }
        };

    module._init();


})(jQuery);


/**
 * @author szabetian
 * @description reload config module
 * @project Lincoln Build and Price
 */

/**
 * @param exc
 */
(function () {

    var Constants = {
            FRAGMENT: 'load/:uuid',
            STATE_FRAGMENT: 'load-state/:stateAndModelAndDerivativeId',
            USER_VEHICLE_FRAGMENT: 'load-user-vehicles/:key'
        },

        module = {

            /**
             * Share link  http://akamai.wwwdev.dragonfly.ford.com/my-lincoln-configuration/19a756ad-99ba-4328-b140-5491171cc19a
             * 302 Redirect to B&P /lincoln-build-and-price#load/19a756ad-99ba-4328-b140-5491171cc19a
             * AJAX HTTP GET  /servlet/rest/tools/share/19a756ad-99ba-4328-b140-5491171cc19a
             * Returns B&P config as JSON:
             * {"key": "19a756ad-99ba-4328-b140-5491171cc19a","site": "LCNEN2014","priceZoneId": "1137384063721","modelId": "2015_CC9_1007_WSPAD_C_DFYS_null","colourId": "null","trimId": "null","features": ["TPBAR","PN4DU"],"usage": "b","type": "GF"}
             * AJAX POST  /servlet/rest/buildandprice-gf/restore (Payload is above JSON)
             * Returns the ???normal??? B&P configuration JSON response with relevant features selected.
             *
             */
            reloadSharedConfig: function (uuid) {
                module.loadAndDisplay(ND.LBP.Config.reloadConfigURL + uuid);
            },

            reloadConfigWithState: function (stateAndModelAndDerivativeId) {
                var kayValueParams = {};
                if (stateAndModelAndDerivativeId) {
                    var params = stateAndModelAndDerivativeId.split(';'),
                        keyValue;
                    if (params.length > 0) {
                        _.each(params, function (param) {
                            keyValue = param.split(':');
                            if (keyValue.length > 1) {
                                kayValueParams[keyValue[0]] = keyValue[1];
                            }
                        });
                    }
                }
                if (!$.isEmptyObject(kayValueParams)) {
                    Backbone.trigger(ND.LBP.Events.BlockUI);
                    module.dataloader.getNameplates(function (nameplateCollection) {
                        //kayValueParams.m = modelId
                        nameplateCollection.selectById(kayValueParams.m);
                        var nameplateDetail = module.dataloader.buildAndStoreEmptyNameplateDetail(kayValueParams.m),
                            userActivity = new ND.LBP.CommonModels.UserActivity({
                                state: kayValueParams.s
                            });

                        userActivity.url = userActivity.buildSaveURL(kayValueParams.m);
                        userActivity.save(null, {
                            wait: true,
                            success: function (model, response, options) {
                                nameplateDetail.trigger(ND.LBP.Events.ObjectUpdated, model, response, options, function () {
                                    var selectedEngine = nameplateDetail.findSelectedEngine();
                                    //console.log('model');
                                    //console.dir(model);
//                                    Backbone.trigger(ND.LBP.Events.ReloadingConfig, model);
                                    Backbone.trigger(ND.LBP.Events.GetPage, ND.LBP.Constants.SUMMARY_PAGE_NAME,
                                        kayValueParams.m,
                                        kayValueParams.d,
                                        selectedEngine.id,
                                        function (nextPageUrl) {
                                            Backbone.trigger(ND.LBP.Events.ChangePage, nextPageUrl);
                                            Backbone.trigger(ND.LBP.Events.ReloadingConfig, model);
                                        });
                                });

                            },
                            error: function () {
                                Backbone.trigger(ND.LBP.Events.UnblockUI);
                                Backbone.trigger(ND.LBP.Events.ErrorOccurred, new ND.LBP.CommonModels.Error());
                            }
                        });

                    });
                } else {
                    Backbone.trigger(ND.LBP.Events.ErrorOccurred, new ND.LBP.CommonModels.Error());
                }
            },

            reloadConfigWithVehicleKey: function (vehicleKey) {
                Backbone.trigger(ND.LBP.Events.BlockUI);
                var reloadModel = new ND.LBP.ReloadModels.Reload();
                reloadModel.url = ND.LBP.Config.reloadVehicleKeyConfigURL + vehicleKey + '?v=' + new Date().getTime();
                $.when(reloadModel.fetch()).then(function () {

                    if ( reloadModel.get('sfeatures').length === 0 &&  reloadModel.get('features').length > 0) {
                        //PS integration hack!! place features in sfeatures array
                        reloadModel.set('sfeatures', reloadModel.get('features'));
                        reloadModel.set('features', []);
                    }

                    var colourId = reloadModel.get('sfeatures')[0];

                    reloadModel.set({site: ND.LBP.Config.site,
                        trimId: 0,
                        colourId: colourId,
                        features : reloadModel.get('sfeatures'),
                        priceZoneId: ND.LBP.Config.priceZoneId
                    });
                    module.saveReloadedModel(reloadModel.get('modelId'), reloadModel);
                }).fail(function () {
                    Backbone.trigger(ND.LBP.Events.ErrorOccurred, new ND.LBP.CommonModels.Error());
                });
            },

            buildPageUrl: function () {
                return '';
            },

            loadAndDisplay: function (url) {
                Backbone.trigger(ND.LBP.Events.BlockUI);
                Backbone.trigger(ND.LBP.Events.HideLocationOverlay);
                var reloadModel = new ND.LBP.ReloadModels.Reload();
                reloadModel.url = url;
                $.when(reloadModel.fetch()).then(function () {
                    module.saveReloadedModel(reloadModel.get('modelId'), reloadModel);
                }).fail(function () {
                    Backbone.trigger(ND.LBP.Events.ErrorOccurred, new ND.LBP.CommonModels.Error());
                });
            },

            saveReloadedModel: function (nameplateId, reloadModel) {
                //create and save an empty nameplateDetails
                var nameplateDetail = module.dataloader.buildAndStoreEmptyNameplateDetail(nameplateId);

                //Backbone.trigger(ND.LBP.Events.LocationChanged, reloadModel.get('postcode'), null);

                reloadModel.url = ND.LBP.Config.reloadConfigPostURL;

                reloadModel.save(null, {
                    wait: true,
                    success: function (model, response, options) {
                        nameplateDetail.trigger(ND.LBP.Events.ObjectUpdated, model, response, options, function () {
                            //console.dir(reloadModel);
                           // Backbone.trigger(ND.LBP.Events.ReloadingConfig, reloadModel);
//                            var engineId = reloadModel.get('engineId'),
//                                derivativeId = reloadModel.get('derivativeId');
//                            if (typeof derivativeId !== 'undefined' && derivativeId !== '' &&
//                                typeof engineId !== 'undefined' && engineId !== '') {
                            // module.selectDerivativeAndEngineById(nameplateDetail, derivativeId, engineId);

                            var selectedDerivative = nameplateDetail.get(ND.LBP.Constants.SERIES).get(ND.LBP.Constants.DERIVATIVES).getSelected(),
                                selectedEngine;

//                            _.each(nameplateDerivatives.models, function(derivative) {
//                                derivative.get(ND.LBP.Constants.ENGINES).deselectAll();
//                            });
//
                            if (selectedDerivative != null) {
                                selectedEngine = selectedDerivative.get(ND.LBP.Constants.ENGINES).getSelected();
                            }


                            Backbone.trigger(ND.LBP.Events.GetPage, ND.LBP.Constants.SUMMARY_PAGE_NAME,
                                nameplateId,
                                selectedDerivative.id,
                                selectedEngine.id,
                                function (nextPageUrl) {
                                    Backbone.trigger(ND.LBP.Events.ChangePage, nextPageUrl);
                                    Backbone.trigger(ND.LBP.Events.ReloadingConfig, model);
                                }
                            );
//                            } else {
//                                Backbone.trigger(ND.LBP.Events.ErrorOccurred, new ND.LBP.CommonModels.Error());
//                            }

                        });
                    }
                });
            },

//            selectDerivativeAndEngineById: function(nameplateDetailModel, derivativeId, engineId) {
//                var nameplateDerivatives = nameplateDetailModel.get(ND.LBP.Constants.SERIES).get(ND.LBP.Constants.DERIVATIVES),
//                    selectedDerivative = nameplateDerivatives.selectById(derivativeId);
//
//                _.each(nameplateDerivatives.models, function(derivative) {
//                    derivative.get(ND.LBP.Constants.ENGINES).deselectAll();
//                });
//
//                if (selectedDerivative != null) {
//                    selectedDerivative.get(ND.LBP.Constants.ENGINES).selectById(engineId);
//                }
//            },

            clearCache: function () {
            },

            _init: function () {
                module.dataloader = ND.LBP.Builder;
                var routes = [
                    {
                        fragment: Constants.FRAGMENT,
                        name: ND.LBP.Constants.RELOAD_CONFIG_PAGE_NAME,
                        buildPageUrl: module.buildPageUrl,
                        action: module.reloadSharedConfig
                    },
                    {
                        fragment: Constants.STATE_FRAGMENT,
                        name: ND.LBP.Constants.RELOAD_CONFIG_PAGE_NAME,
                        buildPageUrl: module.buildPageUrl,
                        action: module.reloadConfigWithState
                    },
                    {
                        fragment: Constants.USER_VEHICLE_FRAGMENT,
                        name: ND.LBP.Constants.RELOAD_CONFIG_PAGE_NAME,
                        buildPageUrl: module.buildPageUrl,
                        action: module.reloadConfigWithVehicleKey
                    }
                ];

                Backbone.on(ND.LBP.Events.RegisterModule, function (registerCallback) {
                    registerCallback.call(registerCallback, routes);
                });
            }
        };

    module._init();


})();


/**
 * @author Sohrab Zabetian
 * @description Analytics module for Lincoln Build and price
 * @project Lincoln Build and Price
 */
ND.LBP.Analytics = (function() {

    var analytics = {

        region: null,

        nameplate: null,

        usedNameplateIds: {},

        resetOmnitureVars: function() {
            _da.tool = _da.der = _da.nameplate = _da.events = _da.region = undefined;
            _da.funnel.stepname = undefined;
        },

        getDeviceType : function() {
            var prefix = 'ui:rad:';
            if (screen.width < ND.LBP.Constants.MOBILE_SCREEN_SIZE) {
               return prefix + 'phone';
            } else if (screen.width >= ND.LBP.Constants.MOBILE_SCREEN_SIZE && screen.width < ND.LBP.Constants.TABLET_SCREEN_SIZE) {
               return prefix + 'tablet';
            }
            return prefix + 'pc';
        },

        setupOmnitureVars: function(data) {
            _da.funnel.stepname = data.state + data.stepName;
            _da.deviceType = analytics.getDeviceType();
            analytics.setupNameplateVars();
            if (typeof data.events !== 'undefined' && data.events != null) {
                _da.events = data.events.split(',');
            }
        },

        /**
         *
         * @param nameplateData should contain name, modelYear, id, category
         */
        nameplateChanged: function(nameplateData) {
            analytics.nameplate =  nameplateData ;
            //console.log('Omniture: nameplateChanged: ' + nameplateData);
            //each event can be fired once per nameplate per visit
            if (typeof analytics.usedNameplateIds[analytics.nameplate.id] === 'undefined') {

                analytics.usedNameplateIds[analytics.nameplate.id] = 'used'; //some random value

                Backbone.off(ND.LBP.Events.ColorSelected, analytics.colorChanged)
                        .once(ND.LBP.Events.ColorSelected, analytics.colorChanged, analytics);

                Backbone.off(ND.LBP.Events.TrimSelected, analytics.trimChanged)
                        .once(ND.LBP.Events.TrimSelected, analytics.trimChanged, analytics);

                Backbone.off(ND.LBP.Events.FabricSelected, analytics.fabricChanged)
                        .once(ND.LBP.Events.FabricSelected, analytics.fabricChanged, analytics);

                Backbone.off(ND.LBP.Events.RimSelected, analytics.rimChanged)
                        .once(ND.LBP.Events.RimSelected, analytics.rimChanged, analytics);

                Backbone.off(ND.LBP.Events.AccessorySelected, analytics.accessorySelected)
                        .once(ND.LBP.Events.AccessorySelected, analytics.accessorySelected, analytics);
            }
        },

        setupNameplateVars: function() {
            var nameplate = analytics.nameplate;
            if (typeof nameplate !== 'undefined' && nameplate != null) {
                _da.nameplate = {
                    name: (nameplate.analyticsName || nameplate.name),
                    year : nameplate.year,
                    id : nameplate.id,
                    cat : nameplate.analyticsCategory || nameplate.category || ''
                };
            }
           // //console.log('analytics setupNameplateVars ' + _da.nameplate);
        },

        locationChanged: function(loc) {
            //console.log('Omniture: locationChanged: ' + loc);
            analytics.region = loc;
        },

        viewPDF: function() {
            //console.log('viewPDF');
            analytics.resetOmnitureVars();
            var data = {},
                params = analytics.setupParams(data, 'd');
            _da.region = undefined;
            params.pname = _da.pname + ':5' + data.path + 'summary';
            params.link = params.title = _da.pname + data.path + 'vehicle summary:pdf:download';
            params.onclicks = _da.pname +  ' summary:download pdf';
            params.deviceType = analytics.getDeviceType();
            analytics.setupNameplateVars();
            //ND.omniture.trackLink(params);
            $.publish('/analytics/link/', params);
        },

        shareConfig: function() {
            analytics.resetOmnitureVars();
            var data = {},
                params = analytics.setupParams(data, 'o');
            _da.region = undefined;
            params.pname = _da.pname + ':5' + data.path + 'summary';
            params.link = params.title = _da.pname + data.path + 'vehicle summary:share';
            params.onclicks = _da.pname +  ' summary:share';
            params.deviceType = analytics.getDeviceType();
            analytics.setupNameplateVars();
            //ND.omniture.trackLink(params);
            $.publish('/analytics/link/', params);
        },

        saveConfig: function() {
            analytics.resetOmnitureVars();
            var data = {},
                params = analytics.setupParams(data, 'o');
            _da.region = undefined;
            params.pname = _da.pname + ':5' + data.path + 'summary';
            params.link = params.title = _da.pname + data.path + 'vehicle summary:save';
            params.onclicks = _da.pname +  ':summary:save';
            params.deviceType = analytics.getDeviceType();
            analytics.setupNameplateVars();
            //ND.omniture.trackLink(params);
            $.publish('/analytics/link/', params);
        },

        _init: function() {
           Backbone.once(ND.LBP.Events.LocationUpdated, analytics.locationChanged, analytics);
           Backbone.on(ND.LBP.Events.NameplateChanged, analytics.nameplateChanged, analytics);
           Backbone.on(ND.LBP.Events.TrackOmniture, analytics.trackOmniturePage, analytics);
           Backbone.on(ND.LBP.Events.ViewPDF, analytics.viewPDF, analytics);
           Backbone.on(ND.LBP.Events.SocialLinkClicked, analytics.shareConfig, analytics);
           Backbone.on(ND.LBP.Events.SaveConfiguration, analytics.saveConfig, analytics);
        },

        setupRegionVars: function() {
            if (analytics.region != null) {
               _da.region = analytics.region ;
            }
        },

        tabChanged: function(data) {
            analytics.resetOmnitureVars();
            analytics.constructTabPageName(data);
            analytics.setupOmnitureVars(data);
            ND.analyticsTag.trackOmnitureSinglePageApp();
        },

        colorChanged: function(data) {
            //console.log('colorChanged');
            analytics.trackAccessoryChange(data, 2, 'exterior', 'exterior:colour trim', 'color trim:ext');
        },

        rimChanged: function(data) {
            //console.log('rimChanged');
            analytics.trackAccessoryChange(data, 2, 'exterior', 'exterior:rim', 'rims');
        },

        exteriorAccessorySelected: function(data) {
            //console.log('exteriorAccessorySelected');
            analytics.trackAccessoryChange(data, 2, 'features', 'features:exterior', 'color trim:ext');
        },

        trimChanged: function(data) {
            //console.log('trimChanged');
            analytics.trackAccessoryChange(data, 3, 'interior', 'interior:colour trim', 'color trim:int');
        },

        fabricChanged : function(data) {
            //console.log('fabricChanged');
            analytics.trackAccessoryChange(data, 3, 'interior', 'interior:applique', 'applique:int');
        },

        interiorAccessorySelected : function(data) {
            //console.log('interiorAccessorySelected');
            analytics.trackAccessoryChange(data, 3, 'interior', 'interior:accessories', 'accessories:int');
        },

        accessorySelected: function(data) {
            //console.log('accessorySelected');
            analytics.trackAccessoryChange(data, 4, data.category.name, 'features', 'features');
        },

        trackAccessoryChange: function(data, step, pageNameSuffix, linkSuffix, onClicksSuffix) {
            //console.dir(data) ;
            analytics.resetOmnitureVars();
            var params = analytics.setupParams(data, 'o');
            _da.region = undefined;
            params.pname = _da.pname + ':' + step + data.path + pageNameSuffix;
            params.link = params.title = _da.pname + data.path + linkSuffix;
            params.onclicks = _da.pname + ' ' + onClicksSuffix;
            params.deviceType = analytics.getDeviceType();
            analytics.setupNameplateVars();
            //ND.omniture.trackLink(params);
            $.publish('/analytics/link/', params);
        },


        accessoryDetailViewed: function(data) {
            var params = { type: 'o'};
            analytics.resetOmnitureVars();
            //find the selected category and construct its page name
            analytics.constructTabPageName(data);
            params.pname = data.state + data.stepName;
            params.link = params.title = 'vehicle:accessories:pop up:detail';
            params.onclicks = 'accessories: detail popup';
            if (typeof data.state !== 'undefined') {
                //ND.omniture.trackLink(params);
                $.publish('/analytics/link/', params);
            }
        },

        constructTabPageName: function(data) {

            var category = data.category,
                analyticsName = category.name;

                analytics.setPath(data);
                data.state = category.omniState;
                data.isColorTrimTab = data.isColourCategory;
                data.stepName = data.path + analyticsName;
                data.stepNameNoAnalyticsStep = data.path + analyticsName;
        },


        setupParams: function(data, type) {
            var params = { type: type};
            this.resetOmnitureVars();
            this.setPath(data);
            return params;
        },

        setPath: function(data) {
            data.path = ':full:';
        },

        trackOmniturePage: function(data) {

            var stepName, events;
            //make sure these global object exist and clear them all.
            //values should not be carried from page to page.
            analytics.resetOmnitureVars();
            analytics.setupRegionVars();

            switch(data.state) {
                case ND.LBP.Constants.MODEL_OVERLAY_PAGE_NAME:
                    stepName = ':model:postal code';
                    data.state = '0a';
                    break;
                case ND.LBP.Constants.NAMEPLATE_PAGE_NAME:
                    stepName = ':model:select';
                    data.state = '0';
                    break;
                case ND.LBP.Constants.SERIES_PAGE_NAME:
                    data.state = '1';
                    _da.region = undefined;
                        stepName = ':full:derivative';
                    _da.tool = {name : 'event: bp start'};
                    events = 'event6,event43';
                    break;
                case ND.LBP.Constants.ACCESSORIES_PAGE_NAME:
                    //data.state = '2';
                    _da.region = undefined;
                    analytics.tabChanged(data);
                    return;
                case ND.LBP.Constants.SUMMARY_PAGE_NAME:
                    data.state = '5';
                        stepName = ':full:summary';
                    _da.tool = {name : 'event: bp finished'};
                    events = 'event2,event43';
                    //v18	"Body Model,Trim"
                    //v19	"Ext:Int Color Code"
                    //v20	Accessories Picked
                    //v21	Veh. Options Picked
                    //v23	"Option	Pkgs Picked"
                    //v24	"Engine: Trans"
                    //v25 	Price
                    _da.der = {};
                    //get all the ids from user object.
                    _da.der.colour = data.colourId;
                    _da.der.trim = data.trimId;


                    _da.der.optionpacks = undefined;
                    _da.der.features = data.omnitureFeatures.length > 0 ? data.omnitureFeatures.join(',') : undefined;
                    _da.der.options = data.vehicleOptions.length > 0 ? data.vehicleOptions.join(',') : undefined;
                    analytics.setPath(data);
                    _da.der.engine = data.engineId;
                    _da.der.name = data.seriesId;
                    break;
                default :
                    //console.log('unknown step ' + data.state);
            }

            data.stepName = stepName;
            data.events = events;
            analytics.setupOmnitureVars(data);

            //console.dir(_da);

            ND.analyticsTag.trackOmnitureSinglePageApp();

        }
    }

    if (ND.analyticsTag.isSinglePageAppOmnitureConfigured()) {
        analytics._init();
    }


})();


/*
 * @description: Comparison overlay for Lincoln BnP
 * @author: York Zhang
 *
 */

ND.LBP.ComparisonOverlay = function(data) {

    $.radOverlay.open($(data),{
        additionalClass: "comparison_overlay",

        afterContentLoad: function(){
            
            $(".comparison-wrap table tr").each(function(){
                var $this = $(this);
                $this.find("td").eq(0).addClass("always-appear");
                $this.find("td").eq(1).addClass("appear");
            });

            var tableWidth = $(".comparison-wrap .details table").eq(0).width();
            //console.log(tableWidth);
            var containerWidth = $(".comparison-wrap .details").width();
            var scrollbarWidth = containerWidth - tableWidth;
            
            $(".comparison-wrap .header").css({"padding-right":scrollbarWidth});
            

            var $dropdown = $(".comparison-wrap .series-dropdown");
            
            $(".comparison-wrap .header table td").each(function(i,item){
                var $this = $(this);
                $(this).on("click", function(){
                    if(i!=0){
                        if($dropdown.hasClass("active")){
                            $dropdown.removeClass("active");
                        }else{
                            $dropdown.addClass("active");
                        }
                    }
                })
            })
            //console.log($(".comparison-wrap"));
            $dropdown.find("li").each(function(index,item){
                var $this = $(this);
                $this.on("click", function(){
                    var column_index = index + 1;
                    $(".comparison-wrap table td.appear").removeClass("appear");
                    $(".comparison-wrap table tr").each(function(){
                        $(this).find("td").eq(column_index).addClass("appear");
                    });

                    $dropdown.removeClass("active");
                });
                
            });
        }
    });
};


