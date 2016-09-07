
// GWS Version v3.13

//-------- openlayers --------//
/*

  OpenLayers.js -- OpenLayers Map Viewer Library

  Copyright (c) 2006-2012 by OpenLayers Contributors
  Published under the 2-clause BSD license.
  See http://openlayers.org/dev/license.txt for the full text of the license, and http://openlayers.org/dev/authors.txt for full list of contributors.

  Includes compressed code under the following licenses:

  (For uncompressed versions of the code used, please see the
  OpenLayers Github repository: <https://github.com/openlayers/openlayers>)

*/
/**
 * Contains XMLHttpRequest.js <http://code.google.com/p/xmlhttprequest/>
 * Copyright 2007 Sergey Ilinsky (http://www.ilinsky.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 */
/**
 * OpenLayers.Util.pagePosition is based on Yahoo's getXY method, which is
 * Copyright (c) 2006, Yahoo! Inc.
 * All rights reserved.
 *
 * Redistribution and use of this software in source and binary forms, with or
 * without modification, are permitted provided that the following conditions
 * are met:
 *
 * * Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * * Neither the name of Yahoo! Inc. nor the names of its contributors may be
 *   used to endorse or promote products derived from this software without
 *   specific prior written permission of Yahoo! Inc.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */
var OpenLayers = {
    VERSION_NUMBER: "Release 2.12",
    singleFile: true,
    _getScriptLocation: (function () {
        var r = new RegExp("(^|(.*?\\/))(OpenLayers[^\\/]*?\\.js)(\\?|$)"),
            s = document.getElementsByTagName('script'),
            src, m, l = "";
        for (var i = 0, len = s.length; i < len; i++) {
            src = s[i].getAttribute('src');
            if (src) {
                m = src.match(r);
                if (m) {
                    l = m[1];
                    break;
                }
            }
        }
        return (function () {
            return l;
        });
    })(),
    ImgPath: ''
};
OpenLayers.Class = function () {
    var len = arguments.length;
    var P = arguments[0];
    var F = arguments[len - 1];
    var C = typeof F.initialize == "function" ? F.initialize : function () {
            P.prototype.initialize.apply(this, arguments);
        };
    if (len > 1) {
        var newArgs = [C, P].concat(Array.prototype.slice.call(arguments).slice(1, len - 1), F);
        OpenLayers.inherit.apply(null, newArgs);
    } else {
        C.prototype = F;
    }
    return C;
};
OpenLayers.inherit = function (C, P) {
    var F = function () {};
    F.prototype = P.prototype;
    C.prototype = new F;
    var i, l, o;
    for (i = 2, l = arguments.length; i < l; i++) {
        o = arguments[i];
        if (typeof o === "function") {
            o = o.prototype;
        }
        OpenLayers.Util.extend(C.prototype, o);
    }
};
OpenLayers.Util = OpenLayers.Util || {};
OpenLayers.Util.extend = function (destination, source) {
    destination = destination || {};
    if (source) {
        for (var property in source) {
            var value = source[property];
            if (value !== undefined) {
                destination[property] = value;
            }
        }
        var sourceIsEvt = typeof window.Event == "function" && source instanceof window.Event;
        if (!sourceIsEvt && source.hasOwnProperty && source.hasOwnProperty("toString")) {
            destination.toString = source.toString;
        }
    }
    return destination;
};
OpenLayers.Animation = (function (window) {
    var isNative = !! (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame);
    var requestFrame = (function () {
        var request = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback, element) {
                window.setTimeout(callback, 16);
            };
        return function (callback, element) {
            request.apply(window, [callback, element]);
        };
    })();
    var counter = 0;
    var loops = {};

    function start(callback, duration, element) {
        duration = duration > 0 ? duration : Number.POSITIVE_INFINITY;
        var id = ++counter;
        var start = +new Date;
        loops[id] = function () {
            if (loops[id] && +new Date - start <= duration) {
                callback();
                if (loops[id]) {
                    requestFrame(loops[id], element);
                }
            } else {
                delete loops[id];
            }
        };
        requestFrame(loops[id], element);
        return id;
    }

    function stop(id) {
        delete loops[id];
    }
    return {
        isNative: isNative,
        requestFrame: requestFrame,
        start: start,
        stop: stop
    };
})(window);
OpenLayers.Tween = OpenLayers.Class({
    easing: null,
    begin: null,
    finish: null,
    duration: null,
    callbacks: null,
    time: null,
    animationId: null,
    playing: false,
    initialize: function (easing) {
        this.easing = (easing) ? easing : OpenLayers.Easing.Expo.easeOut;
    },
    start: function (begin, finish, duration, options) {
        this.playing = true;
        this.begin = begin;
        this.finish = finish;
        this.duration = duration;
        this.callbacks = options.callbacks;
        this.time = 0;
        OpenLayers.Animation.stop(this.animationId);
        this.animationId = null;
        if (this.callbacks && this.callbacks.start) {
            this.callbacks.start.call(this, this.begin);
        }
        this.animationId = OpenLayers.Animation.start(OpenLayers.Function.bind(this.play, this));
    },
    stop: function () {
        if (!this.playing) {
            return;
        }
        if (this.callbacks && this.callbacks.done) {
            this.callbacks.done.call(this, this.finish);
        }
        OpenLayers.Animation.stop(this.animationId);
        this.animationId = null;
        this.playing = false;
    },
    play: function () {
        var value = {};
        for (var i in this.begin) {
            var b = this.begin[i];
            var f = this.finish[i];
            if (b == null || f == null || isNaN(b) || isNaN(f)) {
                throw new TypeError('invalid value for Tween');
            }
            var c = f - b;
            value[i] = this.easing.apply(this, [this.time, b, c, this.duration]);
        }
        this.time++;
        if (this.callbacks && this.callbacks.eachStep) {
            this.callbacks.eachStep.call(this, value);
        }
        if (this.time > this.duration) {
            this.stop();
        }
    },
    CLASS_NAME: "OpenLayers.Tween"
});
OpenLayers.Easing = {
    CLASS_NAME: "OpenLayers.Easing"
};
OpenLayers.Easing.Linear = {
    easeIn: function (t, b, c, d) {
        return c * t / d + b;
    },
    easeOut: function (t, b, c, d) {
        return c * t / d + b;
    },
    easeInOut: function (t, b, c, d) {
        return c * t / d + b;
    },
    CLASS_NAME: "OpenLayers.Easing.Linear"
};
OpenLayers.Easing.Expo = {
    easeIn: function (t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOut: function (t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOut: function (t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    CLASS_NAME: "OpenLayers.Easing.Expo"
};
OpenLayers.Easing.Quad = {
    easeIn: function (t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    easeOut: function (t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    easeInOut: function (t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    CLASS_NAME: "OpenLayers.Easing.Quad"
};
OpenLayers.String = {
    startsWith: function (str, sub) {
        return (str.indexOf(sub) == 0);
    },
    contains: function (str, sub) {
        return (str.indexOf(sub) != -1);
    },
    trim: function (str) {
        return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    },
    camelize: function (str) {
        var oStringList = str.split('-');
        var camelizedString = oStringList[0];
        for (var i = 1, len = oStringList.length; i < len; i++) {
            var s = oStringList[i];
            camelizedString += s.charAt(0).toUpperCase() + s.substring(1);
        }
        return camelizedString;
    },
    format: function (template, context, args) {
        if (!context) {
            context = window;
        }
        var replacer = function (str, match) {
            var replacement;
            var subs = match.split(/\.+/);
            for (var i = 0; i < subs.length; i++) {
                if (i == 0) {
                    replacement = context;
                }
                replacement = replacement[subs[i]];
            }
            if (typeof replacement == "function") {
                replacement = args ? replacement.apply(null, args) : replacement();
            }
            if (typeof replacement == 'undefined') {
                return 'undefined';
            } else {
                return replacement;
            }
        };
        return template.replace(OpenLayers.String.tokenRegEx, replacer);
    },
    tokenRegEx: /\$\{([\w.]+?)\}/g,
    numberRegEx: /^([+-]?)(?=\d|\.\d)\d*(\.\d*)?([Ee]([+-]?\d+))?$/,
    isNumeric: function (value) {
        return OpenLayers.String.numberRegEx.test(value);
    },
    numericIf: function (value) {
        return OpenLayers.String.isNumeric(value) ? parseFloat(value) : value;
    }
};
OpenLayers.Number = {
    decimalSeparator: ".",
    thousandsSeparator: ",",
    limitSigDigs: function (num, sig) {
        var fig = 0;
        if (sig > 0) {
            fig = parseFloat(num.toPrecision(sig));
        }
        return fig;
    },
    format: function (num, dec, tsep, dsep) {
        dec = (typeof dec != "undefined") ? dec : 0;
        tsep = (typeof tsep != "undefined") ? tsep : OpenLayers.Number.thousandsSeparator;
        dsep = (typeof dsep != "undefined") ? dsep : OpenLayers.Number.decimalSeparator;
        if (dec != null) {
            num = parseFloat(num.toFixed(dec));
        }
        var parts = num.toString().split(".");
        if (parts.length == 1 && dec == null) {
            dec = 0;
        }
        var integer = parts[0];
        if (tsep) {
            var thousands = /(-?[0-9]+)([0-9]{3})/;
            while (thousands.test(integer)) {
                integer = integer.replace(thousands, "$1" + tsep + "$2");
            }
        }
        var str;
        if (dec == 0) {
            str = integer;
        } else {
            var rem = parts.length > 1 ? parts[1] : "0";
            if (dec != null) {
                rem = rem + new Array(dec - rem.length + 1).join("0");
            }
            str = integer + dsep + rem;
        }
        return str;
    }
};
OpenLayers.Function = {
    bind: function (func, object) {
        var args = Array.prototype.slice.apply(arguments, [2]);
        return function () {
            var newArgs = args.concat(Array.prototype.slice.apply(arguments, [0]));
            return func.apply(object, newArgs);
        };
    },
    bindAsEventListener: function (func, object) {
        return function (event) {
            return func.call(object, event || window.event);
        };
    },
    False: function () {
        return false;
    },
    True: function () {
        return true;
    },
    Void: function () {}
};
OpenLayers.Array = {
    filter: function (array, callback, caller) {
        var selected = [];
        if (Array.prototype.filter) {
            selected = array.filter(callback, caller);
        } else {
            var len = array.length;
            if (typeof callback != "function") {
                throw new TypeError();
            }
            for (var i = 0; i < len; i++) {
                if (i in array) {
                    var val = array[i];
                    if (callback.call(caller, val, i, array)) {
                        selected.push(val);
                    }
                }
            }
        }
        return selected;
    }
};
OpenLayers.Bounds = OpenLayers.Class({
    left: null,
    bottom: null,
    right: null,
    top: null,
    centerLonLat: null,
    initialize: function (left, bottom, right, top) {
        if (OpenLayers.Util.isArray(left)) {
            top = left[3];
            right = left[2];
            bottom = left[1];
            left = left[0];
        }
        if (left != null) {
            this.left = OpenLayers.Util.toFloat(left);
        }
        if (bottom != null) {
            this.bottom = OpenLayers.Util.toFloat(bottom);
        }
        if (right != null) {
            this.right = OpenLayers.Util.toFloat(right);
        }
        if (top != null) {
            this.top = OpenLayers.Util.toFloat(top);
        }
    },
    clone: function () {
        return new OpenLayers.Bounds(this.left, this.bottom, this.right, this.top);
    },
    equals: function (bounds) {
        var equals = false;
        if (bounds != null) {
            equals = ((this.left == bounds.left) && (this.right == bounds.right) && (this.top == bounds.top) && (this.bottom == bounds.bottom));
        }
        return equals;
    },
    toString: function () {
        return [this.left, this.bottom, this.right, this.top].join(",");
    },
    toArray: function (reverseAxisOrder) {
        if (reverseAxisOrder === true) {
            return [this.bottom, this.left, this.top, this.right];
        } else {
            return [this.left, this.bottom, this.right, this.top];
        }
    },
    toBBOX: function (decimal, reverseAxisOrder) {
        if (decimal == null) {
            decimal = 6;
        }
        var mult = Math.pow(10, decimal);
        var xmin = Math.round(this.left * mult) / mult;
        var ymin = Math.round(this.bottom * mult) / mult;
        var xmax = Math.round(this.right * mult) / mult;
        var ymax = Math.round(this.top * mult) / mult;
        if (reverseAxisOrder === true) {
            return ymin + "," + xmin + "," + ymax + "," + xmax;
        } else {
            return xmin + "," + ymin + "," + xmax + "," + ymax;
        }
    },
    toGeometry: function () {
        return new OpenLayers.Geometry.Polygon([new OpenLayers.Geometry.LinearRing([new OpenLayers.Geometry.Point(this.left, this.bottom), new OpenLayers.Geometry.Point(this.right, this.bottom), new OpenLayers.Geometry.Point(this.right, this.top), new OpenLayers.Geometry.Point(this.left, this.top)])]);
    },
    getWidth: function () {
        return (this.right - this.left);
    },
    getHeight: function () {
        return (this.top - this.bottom);
    },
    getSize: function () {
        return new OpenLayers.Size(this.getWidth(), this.getHeight());
    },
    getCenterPixel: function () {
        return new OpenLayers.Pixel((this.left + this.right) / 2, (this.bottom + this.top) / 2);
    },
    getCenterLonLat: function () {
        if (!this.centerLonLat) {
            this.centerLonLat = new OpenLayers.LonLat((this.left + this.right) / 2, (this.bottom + this.top) / 2);
        }
        return this.centerLonLat;
    },
    scale: function (ratio, origin) {
        if (origin == null) {
            origin = this.getCenterLonLat();
        }
        var origx, origy;
        if (origin.CLASS_NAME == "OpenLayers.LonLat") {
            origx = origin.lon;
            origy = origin.lat;
        } else {
            origx = origin.x;
            origy = origin.y;
        }
        var left = (this.left - origx) * ratio + origx;
        var bottom = (this.bottom - origy) * ratio + origy;
        var right = (this.right - origx) * ratio + origx;
        var top = (this.top - origy) * ratio + origy;
        return new OpenLayers.Bounds(left, bottom, right, top);
    },
    add: function (x, y) {
        if ((x == null) || (y == null)) {
            throw new TypeError('Bounds.add cannot receive null values');
        }
        return new OpenLayers.Bounds(this.left + x, this.bottom + y, this.right + x, this.top + y);
    },
    extend: function (object) {
        var bounds = null;
        if (object) {
            switch (object.CLASS_NAME) {
            case "OpenLayers.LonLat":
                bounds = new OpenLayers.Bounds(object.lon, object.lat, object.lon, object.lat);
                break;
            case "OpenLayers.Geometry.Point":
                bounds = new OpenLayers.Bounds(object.x, object.y, object.x, object.y);
                break;
            case "OpenLayers.Bounds":
                bounds = object;
                break;
            }
            if (bounds) {
                this.centerLonLat = null;
                if ((this.left == null) || (bounds.left < this.left)) {
                    this.left = bounds.left;
                }
                if ((this.bottom == null) || (bounds.bottom < this.bottom)) {
                    this.bottom = bounds.bottom;
                }
                if ((this.right == null) || (bounds.right > this.right)) {
                    this.right = bounds.right;
                }
                if ((this.top == null) || (bounds.top > this.top)) {
                    this.top = bounds.top;
                }
            }
        }
    },
    containsLonLat: function (ll, options) {
        if (typeof options === "boolean") {
            options = {
                inclusive: options
            };
        }
        options = options || {};
        var contains = this.contains(ll.lon, ll.lat, options.inclusive),
            worldBounds = options.worldBounds;
        if (worldBounds && !contains) {
            var worldWidth = worldBounds.getWidth();
            var worldCenterX = (worldBounds.left + worldBounds.right) / 2;
            var worldsAway = Math.round((ll.lon - worldCenterX) / worldWidth);
            contains = this.containsLonLat({
                lon: ll.lon - worldsAway * worldWidth,
                lat: ll.lat
            }, {
                inclusive: options.inclusive
            });
        }
        return contains;
    },
    containsPixel: function (px, inclusive) {
        return this.contains(px.x, px.y, inclusive);
    },
    contains: function (x, y, inclusive) {
        if (inclusive == null) {
            inclusive = true;
        }
        if (x == null || y == null) {
            return false;
        }
        x = OpenLayers.Util.toFloat(x);
        y = OpenLayers.Util.toFloat(y);
        var contains = false;
        if (inclusive) {
            contains = ((x >= this.left) && (x <= this.right) && (y >= this.bottom) && (y <= this.top));
        } else {
            contains = ((x > this.left) && (x < this.right) && (y > this.bottom) && (y < this.top));
        }
        return contains;
    },
    intersectsBounds: function (bounds, options) {
        if (typeof options === "boolean") {
            options = {
                inclusive: options
            };
        }
        options = options || {};
        if (options.worldBounds) {
            var self = this.wrapDateLine(options.worldBounds);
            bounds = bounds.wrapDateLine(options.worldBounds);
        } else {
            self = this;
        }
        if (options.inclusive == null) {
            options.inclusive = true;
        }
        var intersects = false;
        var mightTouch = (self.left == bounds.right || self.right == bounds.left || self.top == bounds.bottom || self.bottom == bounds.top);
        if (options.inclusive || !mightTouch) {
            var inBottom = (((bounds.bottom >= self.bottom) && (bounds.bottom <= self.top)) || ((self.bottom >= bounds.bottom) && (self.bottom <= bounds.top)));
            var inTop = (((bounds.top >= self.bottom) && (bounds.top <= self.top)) || ((self.top > bounds.bottom) && (self.top < bounds.top)));
            var inLeft = (((bounds.left >= self.left) && (bounds.left <= self.right)) || ((self.left >= bounds.left) && (self.left <= bounds.right)));
            var inRight = (((bounds.right >= self.left) && (bounds.right <= self.right)) || ((self.right >= bounds.left) && (self.right <= bounds.right)));
            intersects = ((inBottom || inTop) && (inLeft || inRight));
        }
        if (options.worldBounds && !intersects) {
            var world = options.worldBounds;
            var width = world.getWidth();
            var selfCrosses = !world.containsBounds(self);
            var boundsCrosses = !world.containsBounds(bounds);
            if (selfCrosses && !boundsCrosses) {
                bounds = bounds.add(-width, 0);
                intersects = self.intersectsBounds(bounds, {
                    inclusive: options.inclusive
                });
            } else if (boundsCrosses && !selfCrosses) {
                self = self.add(-width, 0);
                intersects = bounds.intersectsBounds(self, {
                    inclusive: options.inclusive
                });
            }
        }
        return intersects;
    },
    containsBounds: function (bounds, partial, inclusive) {
        if (partial == null) {
            partial = false;
        }
        if (inclusive == null) {
            inclusive = true;
        }
        var bottomLeft = this.contains(bounds.left, bounds.bottom, inclusive);
        var bottomRight = this.contains(bounds.right, bounds.bottom, inclusive);
        var topLeft = this.contains(bounds.left, bounds.top, inclusive);
        var topRight = this.contains(bounds.right, bounds.top, inclusive);
        return (partial) ? (bottomLeft || bottomRight || topLeft || topRight) : (bottomLeft && bottomRight && topLeft && topRight);
    },
    determineQuadrant: function (lonlat) {
        var quadrant = "";
        var center = this.getCenterLonLat();
        quadrant += (lonlat.lat < center.lat) ? "b" : "t";
        quadrant += (lonlat.lon < center.lon) ? "l" : "r";
        return quadrant;
    },
    transform: function (source, dest) {
        this.centerLonLat = null;
        var ll = OpenLayers.Projection.transform({
            'x': this.left,
            'y': this.bottom
        }, source, dest);
        var lr = OpenLayers.Projection.transform({
            'x': this.right,
            'y': this.bottom
        }, source, dest);
        var ul = OpenLayers.Projection.transform({
            'x': this.left,
            'y': this.top
        }, source, dest);
        var ur = OpenLayers.Projection.transform({
            'x': this.right,
            'y': this.top
        }, source, dest);
        this.left = Math.min(ll.x, ul.x);
        this.bottom = Math.min(ll.y, lr.y);
        this.right = Math.max(lr.x, ur.x);
        this.top = Math.max(ul.y, ur.y);
        return this;
    },
    wrapDateLine: function (maxExtent, options) {
        options = options || {};
        var leftTolerance = options.leftTolerance || 0;
        var rightTolerance = options.rightTolerance || 0;
        var newBounds = this.clone();
        if (maxExtent) {
            var width = maxExtent.getWidth();
            while (newBounds.left < maxExtent.left && newBounds.right - rightTolerance <= maxExtent.left) {
                newBounds = newBounds.add(width, 0);
            }
            while (newBounds.left + leftTolerance >= maxExtent.right && newBounds.right > maxExtent.right) {
                newBounds = newBounds.add(-width, 0);
            }
            var newLeft = newBounds.left + leftTolerance;
            if (newLeft < maxExtent.right && newLeft > maxExtent.left && newBounds.right - rightTolerance > maxExtent.right) {
                newBounds = newBounds.add(-width, 0);
            }
        }
        return newBounds;
    },
    CLASS_NAME: "OpenLayers.Bounds"
});
OpenLayers.Bounds.fromString = function (str, reverseAxisOrder) {
    var bounds = str.split(",");
    return OpenLayers.Bounds.fromArray(bounds, reverseAxisOrder);
};
OpenLayers.Bounds.fromArray = function (bbox, reverseAxisOrder) {
    return reverseAxisOrder === true ? new OpenLayers.Bounds(bbox[1], bbox[0], bbox[3], bbox[2]) : new OpenLayers.Bounds(bbox[0], bbox[1], bbox[2], bbox[3]);
};
OpenLayers.Bounds.fromSize = function (size) {
    return new OpenLayers.Bounds(0, size.h, size.w, 0);
};
OpenLayers.Bounds.oppositeQuadrant = function (quadrant) {
    var opp = "";
    opp += (quadrant.charAt(0) == 't') ? 'b' : 't';
    opp += (quadrant.charAt(1) == 'l') ? 'r' : 'l';
    return opp;
};
OpenLayers.Element = {
    visible: function (element) {
        return OpenLayers.Util.getElement(element).style.display != 'none';
    },
    toggle: function () {
        for (var i = 0, len = arguments.length; i < len; i++) {
            var element = OpenLayers.Util.getElement(arguments[i]);
            var display = OpenLayers.Element.visible(element) ? 'none' : '';
            element.style.display = display;
        }
    },
    remove: function (element) {
        element = OpenLayers.Util.getElement(element);
        element.parentNode.removeChild(element);
    },
    getHeight: function (element) {
        element = OpenLayers.Util.getElement(element);
        return element.offsetHeight;
    },
    hasClass: function (element, name) {
        var names = element.className;
        return ( !! names && new RegExp("(^|\\s)" + name + "(\\s|$)").test(names));
    },
    addClass: function (element, name) {
        if (!OpenLayers.Element.hasClass(element, name)) {
            element.className += (element.className ? " " : "") + name;
        }
        return element;
    },
    removeClass: function (element, name) {
        var names = element.className;
        if (names) {
            element.className = OpenLayers.String.trim(names.replace(new RegExp("(^|\\s+)" + name + "(\\s+|$)"), " "));
        }
        return element;
    },
    toggleClass: function (element, name) {
        if (OpenLayers.Element.hasClass(element, name)) {
            OpenLayers.Element.removeClass(element, name);
        } else {
            OpenLayers.Element.addClass(element, name);
        }
        return element;
    },
    getStyle: function (element, style) {
        element = OpenLayers.Util.getElement(element);
        var value = null;
        if (element && element.style) {
            value = element.style[OpenLayers.String.camelize(style)];
            if (!value) {
                if (document.defaultView && document.defaultView.getComputedStyle) {
                    var css = document.defaultView.getComputedStyle(element, null);
                    value = css ? css.getPropertyValue(style) : null;
                } else if (element.currentStyle) {
                    value = element.currentStyle[OpenLayers.String.camelize(style)];
                }
            }
            var positions = ['left', 'top', 'right', 'bottom'];
            if (window.opera && (OpenLayers.Util.indexOf(positions, style) != -1) && (OpenLayers.Element.getStyle(element, 'position') == 'static')) {
                value = 'auto';
            }
        }
        return value == 'auto' ? null : value;
    }
};
OpenLayers.LonLat = OpenLayers.Class({
    lon: 0.0,
    lat: 0.0,
    initialize: function (lon, lat) {
        if (OpenLayers.Util.isArray(lon)) {
            lat = lon[1];
            lon = lon[0];
        }
        this.lon = OpenLayers.Util.toFloat(lon);
        this.lat = OpenLayers.Util.toFloat(lat);
    },
    toString: function () {
        return ("lon=" + this.lon + ",lat=" + this.lat);
    },
    toShortString: function () {
        return (this.lon + ", " + this.lat);
    },
    clone: function () {
        return new OpenLayers.LonLat(this.lon, this.lat);
    },
    add: function (lon, lat) {
        if ((lon == null) || (lat == null)) {
            throw new TypeError('LonLat.add cannot receive null values');
        }
        return new OpenLayers.LonLat(this.lon + OpenLayers.Util.toFloat(lon), this.lat + OpenLayers.Util.toFloat(lat));
    },
    equals: function (ll) {
        var equals = false;
        if (ll != null) {
            equals = ((this.lon == ll.lon && this.lat == ll.lat) || (isNaN(this.lon) && isNaN(this.lat) && isNaN(ll.lon) && isNaN(ll.lat)));
        }
        return equals;
    },
    transform: function (source, dest) {
        var point = OpenLayers.Projection.transform({
            'x': this.lon,
            'y': this.lat
        }, source, dest);
        this.lon = point.x;
        this.lat = point.y;
        return this;
    },
    wrapDateLine: function (maxExtent) {
        var newLonLat = this.clone();
        if (maxExtent) {
            while (newLonLat.lon < maxExtent.left) {
                newLonLat.lon += maxExtent.getWidth();
            }
            while (newLonLat.lon > maxExtent.right) {
                newLonLat.lon -= maxExtent.getWidth();
            }
        }
        return newLonLat;
    },
    CLASS_NAME: "OpenLayers.LonLat"
});
OpenLayers.LonLat.fromString = function (str) {
    var pair = str.split(",");
    return new OpenLayers.LonLat(pair[0], pair[1]);
};
OpenLayers.LonLat.fromArray = function (arr) {
    var gotArr = OpenLayers.Util.isArray(arr),
        lon = gotArr && arr[0],
        lat = gotArr && arr[1];
    return new OpenLayers.LonLat(lon, lat);
};
OpenLayers.Pixel = OpenLayers.Class({
    x: 0.0,
    y: 0.0,
    initialize: function (x, y) {
        this.x = parseFloat(x);
        this.y = parseFloat(y);
    },
    toString: function () {
        return ("x=" + this.x + ",y=" + this.y);
    },
    clone: function () {
        return new OpenLayers.Pixel(this.x, this.y);
    },
    equals: function (px) {
        var equals = false;
        if (px != null) {
            equals = ((this.x == px.x && this.y == px.y) || (isNaN(this.x) && isNaN(this.y) && isNaN(px.x) && isNaN(px.y)));
        }
        return equals;
    },
    distanceTo: function (px) {
        return Math.sqrt(Math.pow(this.x - px.x, 2) +
            Math.pow(this.y - px.y, 2));
    },
    add: function (x, y) {
        if ((x == null) || (y == null)) {
            throw new TypeError('Pixel.add cannot receive null values');
        }
        return new OpenLayers.Pixel(this.x + x, this.y + y);
    },
    offset: function (px) {
        var newPx = this.clone();
        if (px) {
            newPx = this.add(px.x, px.y);
        }
        return newPx;
    },
    CLASS_NAME: "OpenLayers.Pixel"
});
OpenLayers.Size = OpenLayers.Class({
    w: 0.0,
    h: 0.0,
    initialize: function (w, h) {
        this.w = parseFloat(w);
        this.h = parseFloat(h);
    },
    toString: function () {
        return ("w=" + this.w + ",h=" + this.h);
    },
    clone: function () {
        return new OpenLayers.Size(this.w, this.h);
    },
    equals: function (sz) {
        var equals = false;
        if (sz != null) {
            equals = ((this.w == sz.w && this.h == sz.h) || (isNaN(this.w) && isNaN(this.h) && isNaN(sz.w) && isNaN(sz.h)));
        }
        return equals;
    },
    CLASS_NAME: "OpenLayers.Size"
});
OpenLayers.Console = {
    log: function () {},
    debug: function () {},
    info: function () {},
    warn: function () {},
    error: function () {},
    userError: function (error) {
        alert(error);
    },
    assert: function () {},
    dir: function () {},
    dirxml: function () {},
    trace: function () {},
    group: function () {},
    groupEnd: function () {},
    time: function () {},
    timeEnd: function () {},
    profile: function () {},
    profileEnd: function () {},
    count: function () {},
    CLASS_NAME: "OpenLayers.Console"
};
(function () {
    var scripts = document.getElementsByTagName("script");
    for (var i = 0, len = scripts.length; i < len; ++i) {
        if (scripts[i].src.indexOf("firebug.js") != -1) {
            if (console) {
                OpenLayers.Util.extend(OpenLayers.Console, console);
                break;
            }
        }
    }
})();
OpenLayers.Lang = {
    code: null,
    defaultCode: "en",
    getCode: function () {
        if (!OpenLayers.Lang.code) {
            OpenLayers.Lang.setCode();
        }
        return OpenLayers.Lang.code;
    },
    setCode: function (code) {
        var lang;
        if (!code) {
            code = (OpenLayers.BROWSER_NAME == "msie") ? navigator.userLanguage : navigator.language;
        }
        var parts = code.split('-');
        parts[0] = parts[0].toLowerCase();
        if (typeof OpenLayers.Lang[parts[0]] == "object") {
            lang = parts[0];
        }
        if (parts[1]) {
            var testLang = parts[0] + '-' + parts[1].toUpperCase();
            if (typeof OpenLayers.Lang[testLang] == "object") {
                lang = testLang;
            }
        }
        if (!lang) {
            OpenLayers.Console.warn('Failed to find OpenLayers.Lang.' + parts.join("-") + ' dictionary, falling back to default language');
            lang = OpenLayers.Lang.defaultCode;
        }
        OpenLayers.Lang.code = lang;
    },
    translate: function (key, context) {
        var dictionary = OpenLayers.Lang[OpenLayers.Lang.getCode()];
        var message = dictionary && dictionary[key];
        if (!message) {
            message = key;
        }
        if (context) {
            message = OpenLayers.String.format(message, context);
        }
        return message;
    }
};
OpenLayers.i18n = OpenLayers.Lang.translate;
OpenLayers.Util = OpenLayers.Util || {};
OpenLayers.Util.getElement = function () {
    var elements = [];
    for (var i = 0, len = arguments.length; i < len; i++) {
        var element = arguments[i];
        if (typeof element == 'string') {
            element = document.getElementById(element);
        }
        if (arguments.length == 1) {
            return element;
        }
        elements.push(element);
    }
    return elements;
};
OpenLayers.Util.isElement = function (o) {
    return !!(o && o.nodeType === 1);
};
OpenLayers.Util.isArray = function (a) {
    return (Object.prototype.toString.call(a) === '[object Array]');
};
if (typeof window.$ === "undefined") {
    window.$ = OpenLayers.Util.getElement;
}
OpenLayers.Util.removeItem = function (array, item) {
    for (var i = array.length - 1; i >= 0; i--) {
        if (array[i] == item) {
            array.splice(i, 1);
        }
    }
    return array;
};
OpenLayers.Util.indexOf = function (array, obj) {
    if (typeof array.indexOf == "function") {
        return array.indexOf(obj);
    } else {
        for (var i = 0, len = array.length; i < len; i++) {
            if (array[i] == obj) {
                return i;
            }
        }
        return -1;
    }
};
OpenLayers.Util.modifyDOMElement = function (element, id, px, sz, position, border, overflow, opacity) {
    if (id) {
        element.id = id;
    }
    if (px) {
        element.style.left = px.x + "px";
        element.style.top = px.y + "px";
    }
    if (sz) {
        element.style.width = sz.w + "px";
        element.style.height = sz.h + "px";
    }
    if (position) {
        element.style.position = position;
    }
    if (border) {
        element.style.border = border;
    }
    if (overflow) {
        element.style.overflow = overflow;
    }
    if (parseFloat(opacity) >= 0.0 && parseFloat(opacity) < 1.0) {
        element.style.filter = 'alpha(opacity=' + (opacity * 100) + ')';
        element.style.opacity = opacity;
    } else if (parseFloat(opacity) == 1.0) {
        element.style.filter = '';
        element.style.opacity = '';
    }
};
OpenLayers.Util.createDiv = function (id, px, sz, imgURL, position, border, overflow, opacity) {
    var dom = document.createElement('div');
    if (imgURL) {
        dom.style.backgroundImage = 'url(' + imgURL + ')';
    }
    if (!id) {
        id = OpenLayers.Util.createUniqueID("OpenLayersDiv");
    }
    if (!position) {
        position = "absolute";
    }
    OpenLayers.Util.modifyDOMElement(dom, id, px, sz, position, border, overflow, opacity);
    return dom;
};
OpenLayers.Util.createImage = function (id, px, sz, imgURL, position, border, opacity, delayDisplay) {
    var image = document.createElement("img");
    if (!id) {
        id = OpenLayers.Util.createUniqueID("OpenLayersDiv");
    }
    if (!position) {
        position = "relative";
    }
    OpenLayers.Util.modifyDOMElement(image, id, px, sz, position, border, null, opacity);
    if (delayDisplay) {
        image.style.display = "none";

        function display() {
            image.style.display = "";
            OpenLayers.Event.stopObservingElement(image);
        }
        OpenLayers.Event.observe(image, "load", display);
        OpenLayers.Event.observe(image, "error", display);
    }
    image.style.alt = id;
    image.galleryImg = "no";
    if (imgURL) {
        image.src = imgURL;
    }
    return image;
};
OpenLayers.IMAGE_RELOAD_ATTEMPTS = 0;
OpenLayers.Util.alphaHackNeeded = null;
OpenLayers.Util.alphaHack = function () {
    if (OpenLayers.Util.alphaHackNeeded == null) {
        var arVersion = navigator.appVersion.split("MSIE");
        var version = parseFloat(arVersion[1]);
        var filter = false;
        try {
            filter = !! (document.body.filters);
        } catch (e) {}
        OpenLayers.Util.alphaHackNeeded = (filter && (version >= 5.5) && (version < 7));
    }
    return OpenLayers.Util.alphaHackNeeded;
};
OpenLayers.Util.modifyAlphaImageDiv = function (div, id, px, sz, imgURL, position, border, sizing, opacity) {
    OpenLayers.Util.modifyDOMElement(div, id, px, sz, position, null, null, opacity);
    var img = div.childNodes[0];
    if (imgURL) {
        img.src = imgURL;
    }
    OpenLayers.Util.modifyDOMElement(img, div.id + "_innerImage", null, sz, "relative", border);
    if (OpenLayers.Util.alphaHack()) {
        if (div.style.display != "none") {
            div.style.display = "inline-block";
        }
        if (sizing == null) {
            sizing = "scale";
        }
        div.style.filter = "progid:DXImageTransform.Microsoft" + ".AlphaImageLoader(src='" + img.src + "', " + "sizingMethod='" + sizing + "')";
        if (parseFloat(div.style.opacity) >= 0.0 && parseFloat(div.style.opacity) < 1.0) {
            div.style.filter += " alpha(opacity=" + div.style.opacity * 100 + ")";
        }
        img.style.filter = "alpha(opacity=0)";
    }
};
OpenLayers.Util.createAlphaImageDiv = function (id, px, sz, imgURL, position, border, sizing, opacity, delayDisplay) {
    var div = OpenLayers.Util.createDiv();
    var img = OpenLayers.Util.createImage(null, null, null, null, null, null, null, delayDisplay);
    img.className = "olAlphaImg";
    div.appendChild(img);
    OpenLayers.Util.modifyAlphaImageDiv(div, id, px, sz, imgURL, position, border, sizing, opacity);
    return div;
};
OpenLayers.Util.upperCaseObject = function (object) {
    var uObject = {};
    for (var key in object) {
        uObject[key.toUpperCase()] = object[key];
    }
    return uObject;
};
OpenLayers.Util.applyDefaults = function (to, from) {
    to = to || {};
    var fromIsEvt = typeof window.Event == "function" && from instanceof window.Event;
    for (var key in from) {
        if (to[key] === undefined || (!fromIsEvt && from.hasOwnProperty && from.hasOwnProperty(key) && !to.hasOwnProperty(key))) {
            to[key] = from[key];
        }
    }
    if (!fromIsEvt && from && from.hasOwnProperty && from.hasOwnProperty('toString') && !to.hasOwnProperty('toString')) {
        to.toString = from.toString;
    }
    return to;
};
OpenLayers.Util.getParameterString = function (params) {
    var paramsArray = [];
    for (var key in params) {
        var value = params[key];
        if ((value != null) && (typeof value != 'function')) {
            var encodedValue;
            if (typeof value == 'object' && value.constructor == Array) {
                var encodedItemArray = [];
                var item;
                for (var itemIndex = 0, len = value.length; itemIndex < len; itemIndex++) {
                    item = value[itemIndex];
                    encodedItemArray.push(encodeURIComponent((item === null || item === undefined) ? "" : item));
                }
                encodedValue = encodedItemArray.join(",");
            } else {
                encodedValue = encodeURIComponent(value);
            }
            paramsArray.push(encodeURIComponent(key) + "=" + encodedValue);
        }
    }
    return paramsArray.join("&");
};
OpenLayers.Util.urlAppend = function (url, paramStr) {
    var newUrl = url;
    if (paramStr) {
        var parts = (url + " ").split(/[?&]/);
        newUrl += (parts.pop() === " " ? paramStr : parts.length ? "&" + paramStr : "?" + paramStr);
    }
    return newUrl;
};
OpenLayers.Util.getImagesLocation = function () {
    return OpenLayers.ImgPath || (OpenLayers._getScriptLocation() + "img/");
};
OpenLayers.Util.getImageLocation = function (image) {
    return OpenLayers.Util.getImagesLocation() + image;
};
OpenLayers.Util.Try = function () {
    var returnValue = null;
    for (var i = 0, len = arguments.length; i < len; i++) {
        var lambda = arguments[i];
        try {
            returnValue = lambda();
            break;
        } catch (e) {}
    }
    return returnValue;
};
OpenLayers.Util.getXmlNodeValue = function (node) {
    var val = null;
    OpenLayers.Util.Try(function () {
        val = node.text;
        if (!val) {
            val = node.textContent;
        }
        if (!val) {
            val = node.firstChild.nodeValue;
        }
    }, function () {
        val = node.textContent;
    });
    return val;
};
OpenLayers.Util.mouseLeft = function (evt, div) {
    var target = (evt.relatedTarget) ? evt.relatedTarget : evt.toElement;
    while (target != div && target != null) {
        target = target.parentNode;
    }
    return (target != div);
};
OpenLayers.Util.DEFAULT_PRECISION = 14;
OpenLayers.Util.toFloat = function (number, precision) {
    if (precision == null) {
        precision = OpenLayers.Util.DEFAULT_PRECISION;
    }
    if (typeof number !== "number") {
        number = parseFloat(number);
    }
    return precision === 0 ? number : parseFloat(number.toPrecision(precision));
};
OpenLayers.Util.rad = function (x) {
    return x * Math.PI / 180;
};
OpenLayers.Util.deg = function (x) {
    return x * 180 / Math.PI;
};
OpenLayers.Util.VincentyConstants = {
    a: 6378137,
    b: 6356752.3142,
    f: 1 / 298.257223563
};
OpenLayers.Util.distVincenty = function (p1, p2) {
    var ct = OpenLayers.Util.VincentyConstants;
    var a = ct.a,
        b = ct.b,
        f = ct.f;
    var L = OpenLayers.Util.rad(p2.lon - p1.lon);
    var U1 = Math.atan((1 - f) * Math.tan(OpenLayers.Util.rad(p1.lat)));
    var U2 = Math.atan((1 - f) * Math.tan(OpenLayers.Util.rad(p2.lat)));
    var sinU1 = Math.sin(U1),
        cosU1 = Math.cos(U1);
    var sinU2 = Math.sin(U2),
        cosU2 = Math.cos(U2);
    var lambda = L,
        lambdaP = 2 * Math.PI;
    var iterLimit = 20;
    while (Math.abs(lambda - lambdaP) > 1e-12 && --iterLimit > 0) {
        var sinLambda = Math.sin(lambda),
            cosLambda = Math.cos(lambda);
        var sinSigma = Math.sqrt((cosU2 * sinLambda) * (cosU2 * sinLambda) +
            (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda) * (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda));
        if (sinSigma == 0) {
            return 0;
        }
        var cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda;
        var sigma = Math.atan2(sinSigma, cosSigma);
        var alpha = Math.asin(cosU1 * cosU2 * sinLambda / sinSigma);
        var cosSqAlpha = Math.cos(alpha) * Math.cos(alpha);
        var cos2SigmaM = cosSigma - 2 * sinU1 * sinU2 / cosSqAlpha;
        var C = f / 16 * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
        lambdaP = lambda;
        lambda = L + (1 - C) * f * Math.sin(alpha) * (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));
    }
    if (iterLimit == 0) {
        return NaN;
    }
    var uSq = cosSqAlpha * (a * a - b * b) / (b * b);
    var A = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
    var B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
    var deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) -
        B / 6 * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)));
    var s = b * A * (sigma - deltaSigma);
    var d = s.toFixed(3) / 1000;
    return d;
};
OpenLayers.Util.destinationVincenty = function (lonlat, brng, dist) {
    var u = OpenLayers.Util;
    var ct = u.VincentyConstants;
    var a = ct.a,
        b = ct.b,
        f = ct.f;
    var lon1 = lonlat.lon;
    var lat1 = lonlat.lat;
    var s = dist;
    var alpha1 = u.rad(brng);
    var sinAlpha1 = Math.sin(alpha1);
    var cosAlpha1 = Math.cos(alpha1);
    var tanU1 = (1 - f) * Math.tan(u.rad(lat1));
    var cosU1 = 1 / Math.sqrt((1 + tanU1 * tanU1)),
        sinU1 = tanU1 * cosU1;
    var sigma1 = Math.atan2(tanU1, cosAlpha1);
    var sinAlpha = cosU1 * sinAlpha1;
    var cosSqAlpha = 1 - sinAlpha * sinAlpha;
    var uSq = cosSqAlpha * (a * a - b * b) / (b * b);
    var A = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
    var B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
    var sigma = s / (b * A),
        sigmaP = 2 * Math.PI;
    while (Math.abs(sigma - sigmaP) > 1e-12) {
        var cos2SigmaM = Math.cos(2 * sigma1 + sigma);
        var sinSigma = Math.sin(sigma);
        var cosSigma = Math.cos(sigma);
        var deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) -
            B / 6 * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)));
        sigmaP = sigma;
        sigma = s / (b * A) + deltaSigma;
    }
    var tmp = sinU1 * sinSigma - cosU1 * cosSigma * cosAlpha1;
    var lat2 = Math.atan2(sinU1 * cosSigma + cosU1 * sinSigma * cosAlpha1, (1 - f) * Math.sqrt(sinAlpha * sinAlpha + tmp * tmp));
    var lambda = Math.atan2(sinSigma * sinAlpha1, cosU1 * cosSigma - sinU1 * sinSigma * cosAlpha1);
    var C = f / 16 * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
    var L = lambda - (1 - C) * f * sinAlpha * (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));
    var revAz = Math.atan2(sinAlpha, -tmp);
    return new OpenLayers.LonLat(lon1 + u.deg(L), u.deg(lat2));
};
OpenLayers.Util.getParameters = function (url) {
    url = (url === null || url === undefined) ? window.location.href : url;
    var paramsString = "";
    if (OpenLayers.String.contains(url, '?')) {
        var start = url.indexOf('?') + 1;
        var end = OpenLayers.String.contains(url, "#") ? url.indexOf('#') : url.length;
        paramsString = url.substring(start, end);
    }
    var parameters = {};
    var pairs = paramsString.split(/[&;]/);
    for (var i = 0, len = pairs.length; i < len; ++i) {
        var keyValue = pairs[i].split('=');
        if (keyValue[0]) {
            var key = keyValue[0];
            try {
                key = decodeURIComponent(key);
            } catch (err) {
                key = unescape(key);
            }
            var value = (keyValue[1] || '').replace(/\+/g, " ");
            try {
                value = decodeURIComponent(value);
            } catch (err) {
                value = unescape(value);
            }
            value = value.split(",");
            if (value.length == 1) {
                value = value[0];
            }
            parameters[key] = value;
        }
    }
    return parameters;
};
OpenLayers.Util.lastSeqID = 0;
OpenLayers.Util.createUniqueID = function (prefix) {
    if (prefix == null) {
        prefix = "id_";
    }
    OpenLayers.Util.lastSeqID += 1;
    return prefix + OpenLayers.Util.lastSeqID;
};
OpenLayers.INCHES_PER_UNIT = {
    'inches': 1.0,
    'ft': 12.0,
    'mi': 63360.0,
    'm': 39.3701,
    'km': 39370.1,
    'dd': 4374754,
    'yd': 36
};
OpenLayers.INCHES_PER_UNIT["in"] = OpenLayers.INCHES_PER_UNIT.inches;
OpenLayers.INCHES_PER_UNIT["degrees"] = OpenLayers.INCHES_PER_UNIT.dd;
OpenLayers.INCHES_PER_UNIT["nmi"] = 1852 * OpenLayers.INCHES_PER_UNIT.m;
OpenLayers.METERS_PER_INCH = 0.02540005080010160020;
OpenLayers.Util.extend(OpenLayers.INCHES_PER_UNIT, {
    "Inch": OpenLayers.INCHES_PER_UNIT.inches,
    "Meter": 1.0 / OpenLayers.METERS_PER_INCH,
    "Foot": 0.30480060960121920243 / OpenLayers.METERS_PER_INCH,
    "IFoot": 0.30480000000000000000 / OpenLayers.METERS_PER_INCH,
    "ClarkeFoot": 0.3047972651151 / OpenLayers.METERS_PER_INCH,
    "SearsFoot": 0.30479947153867624624 / OpenLayers.METERS_PER_INCH,
    "GoldCoastFoot": 0.30479971018150881758 / OpenLayers.METERS_PER_INCH,
    "IInch": 0.02540000000000000000 / OpenLayers.METERS_PER_INCH,
    "MicroInch": 0.00002540000000000000 / OpenLayers.METERS_PER_INCH,
    "Mil": 0.00000002540000000000 / OpenLayers.METERS_PER_INCH,
    "Centimeter": 0.01000000000000000000 / OpenLayers.METERS_PER_INCH,
    "Kilometer": 1000.00000000000000000000 / OpenLayers.METERS_PER_INCH,
    "Yard": 0.91440182880365760731 / OpenLayers.METERS_PER_INCH,
    "SearsYard": 0.914398414616029 / OpenLayers.METERS_PER_INCH,
    "IndianYard": 0.91439853074444079983 / OpenLayers.METERS_PER_INCH,
    "IndianYd37": 0.91439523 / OpenLayers.METERS_PER_INCH,
    "IndianYd62": 0.9143988 / OpenLayers.METERS_PER_INCH,
    "IndianYd75": 0.9143985 / OpenLayers.METERS_PER_INCH,
    "IndianFoot": 0.30479951 / OpenLayers.METERS_PER_INCH,
    "IndianFt37": 0.30479841 / OpenLayers.METERS_PER_INCH,
    "IndianFt62": 0.3047996 / OpenLayers.METERS_PER_INCH,
    "IndianFt75": 0.3047995 / OpenLayers.METERS_PER_INCH,
    "Mile": 1609.34721869443738887477 / OpenLayers.METERS_PER_INCH,
    "IYard": 0.91440000000000000000 / OpenLayers.METERS_PER_INCH,
    "IMile": 1609.34400000000000000000 / OpenLayers.METERS_PER_INCH,
    "NautM": 1852.00000000000000000000 / OpenLayers.METERS_PER_INCH,
    "Lat-66": 110943.316488932731 / OpenLayers.METERS_PER_INCH,
    "Lat-83": 110946.25736872234125 / OpenLayers.METERS_PER_INCH,
    "Decimeter": 0.10000000000000000000 / OpenLayers.METERS_PER_INCH,
    "Millimeter": 0.00100000000000000000 / OpenLayers.METERS_PER_INCH,
    "Dekameter": 10.00000000000000000000 / OpenLayers.METERS_PER_INCH,
    "Decameter": 10.00000000000000000000 / OpenLayers.METERS_PER_INCH,
    "Hectometer": 100.00000000000000000000 / OpenLayers.METERS_PER_INCH,
    "GermanMeter": 1.0000135965 / OpenLayers.METERS_PER_INCH,
    "CaGrid": 0.999738 / OpenLayers.METERS_PER_INCH,
    "ClarkeChain": 20.1166194976 / OpenLayers.METERS_PER_INCH,
    "GunterChain": 20.11684023368047 / OpenLayers.METERS_PER_INCH,
    "BenoitChain": 20.116782494375872 / OpenLayers.METERS_PER_INCH,
    "SearsChain": 20.11676512155 / OpenLayers.METERS_PER_INCH,
    "ClarkeLink": 0.201166194976 / OpenLayers.METERS_PER_INCH,
    "GunterLink": 0.2011684023368047 / OpenLayers.METERS_PER_INCH,
    "BenoitLink": 0.20116782494375872 / OpenLayers.METERS_PER_INCH,
    "SearsLink": 0.2011676512155 / OpenLayers.METERS_PER_INCH,
    "Rod": 5.02921005842012 / OpenLayers.METERS_PER_INCH,
    "IntnlChain": 20.1168 / OpenLayers.METERS_PER_INCH,
    "IntnlLink": 0.201168 / OpenLayers.METERS_PER_INCH,
    "Perch": 5.02921005842012 / OpenLayers.METERS_PER_INCH,
    "Pole": 5.02921005842012 / OpenLayers.METERS_PER_INCH,
    "Furlong": 201.1684023368046 / OpenLayers.METERS_PER_INCH,
    "Rood": 3.778266898 / OpenLayers.METERS_PER_INCH,
    "CapeFoot": 0.3047972615 / OpenLayers.METERS_PER_INCH,
    "Brealey": 375.00000000000000000000 / OpenLayers.METERS_PER_INCH,
    "ModAmFt": 0.304812252984505969011938 / OpenLayers.METERS_PER_INCH,
    "Fathom": 1.8288 / OpenLayers.METERS_PER_INCH,
    "NautM-UK": 1853.184 / OpenLayers.METERS_PER_INCH,
    "50kilometers": 50000.0 / OpenLayers.METERS_PER_INCH,
    "150kilometers": 150000.0 / OpenLayers.METERS_PER_INCH
});
OpenLayers.Util.extend(OpenLayers.INCHES_PER_UNIT, {
    "mm": OpenLayers.INCHES_PER_UNIT["Meter"] / 1000.0,
    "cm": OpenLayers.INCHES_PER_UNIT["Meter"] / 100.0,
    "dm": OpenLayers.INCHES_PER_UNIT["Meter"] * 100.0,
    "km": OpenLayers.INCHES_PER_UNIT["Meter"] * 1000.0,
    "kmi": OpenLayers.INCHES_PER_UNIT["nmi"],
    "fath": OpenLayers.INCHES_PER_UNIT["Fathom"],
    "ch": OpenLayers.INCHES_PER_UNIT["IntnlChain"],
    "link": OpenLayers.INCHES_PER_UNIT["IntnlLink"],
    "us-in": OpenLayers.INCHES_PER_UNIT["inches"],
    "us-ft": OpenLayers.INCHES_PER_UNIT["Foot"],
    "us-yd": OpenLayers.INCHES_PER_UNIT["Yard"],
    "us-ch": OpenLayers.INCHES_PER_UNIT["GunterChain"],
    "us-mi": OpenLayers.INCHES_PER_UNIT["Mile"],
    "ind-yd": OpenLayers.INCHES_PER_UNIT["IndianYd37"],
    "ind-ft": OpenLayers.INCHES_PER_UNIT["IndianFt37"],
    "ind-ch": 20.11669506 / OpenLayers.METERS_PER_INCH
});
OpenLayers.DOTS_PER_INCH = 72;
OpenLayers.Util.normalizeScale = function (scale) {
    var normScale = (scale > 1.0) ? (1.0 / scale) : scale;
    return normScale;
};
OpenLayers.Util.getResolutionFromScale = function (scale, units) {
    var resolution;
    if (scale) {
        if (units == null) {
            units = "degrees";
        }
        var normScale = OpenLayers.Util.normalizeScale(scale);
        resolution = 1 / (normScale * OpenLayers.INCHES_PER_UNIT[units] * OpenLayers.DOTS_PER_INCH);
    }
    return resolution;
};
OpenLayers.Util.getScaleFromResolution = function (resolution, units) {
    if (units == null) {
        units = "degrees";
    }
    var scale = resolution * OpenLayers.INCHES_PER_UNIT[units] * OpenLayers.DOTS_PER_INCH;
    return scale;
};
OpenLayers.Util.pagePosition = function (forElement) {
    var pos = [0, 0];
    var viewportElement = OpenLayers.Util.getViewportElement();
    if (!forElement || forElement == window || forElement == viewportElement) {
        return pos;
    }
    var BUGGY_GECKO_BOX_OBJECT = OpenLayers.IS_GECKO && document.getBoxObjectFor && OpenLayers.Element.getStyle(forElement, 'position') == 'absolute' && (forElement.style.top == '' || forElement.style.left == '');
    var parent = null;
    var box;
    if (forElement.getBoundingClientRect) {
        box = forElement.getBoundingClientRect();
        var scrollTop = viewportElement.scrollTop;
        var scrollLeft = viewportElement.scrollLeft;
        pos[0] = box.left + scrollLeft;
        pos[1] = box.top + scrollTop;
    } else if (document.getBoxObjectFor && !BUGGY_GECKO_BOX_OBJECT) {
        box = document.getBoxObjectFor(forElement);
        var vpBox = document.getBoxObjectFor(viewportElement);
        pos[0] = box.screenX - vpBox.screenX;
        pos[1] = box.screenY - vpBox.screenY;
    } else {
        pos[0] = forElement.offsetLeft;
        pos[1] = forElement.offsetTop;
        parent = forElement.offsetParent;
        if (parent != forElement) {
            while (parent) {
                pos[0] += parent.offsetLeft;
                pos[1] += parent.offsetTop;
                parent = parent.offsetParent;
            }
        }
        var browser = OpenLayers.BROWSER_NAME;
        if (browser == "opera" || (browser == "safari" && OpenLayers.Element.getStyle(forElement, 'position') == 'absolute')) {
            pos[1] -= document.body.offsetTop;
        }
        parent = forElement.offsetParent;
        while (parent && parent != document.body) {
            pos[0] -= parent.scrollLeft;
            if (browser != "opera" || parent.tagName != 'TR') {
                pos[1] -= parent.scrollTop;
            }
            parent = parent.offsetParent;
        }
    }
    return pos;
};
OpenLayers.Util.getViewportElement = function () {
    var viewportElement = arguments.callee.viewportElement;
    if (viewportElement == undefined) {
        viewportElement = (OpenLayers.BROWSER_NAME == "msie" && document.compatMode != 'CSS1Compat') ? document.body : document.documentElement;
        arguments.callee.viewportElement = viewportElement;
    }
    return viewportElement;
};
OpenLayers.Util.isEquivalentUrl = function (url1, url2, options) {
    options = options || {};
    OpenLayers.Util.applyDefaults(options, {
        ignoreCase: true,
        ignorePort80: true,
        ignoreHash: true
    });
    var urlObj1 = OpenLayers.Util.createUrlObject(url1, options);
    var urlObj2 = OpenLayers.Util.createUrlObject(url2, options);
    for (var key in urlObj1) {
        if (key !== "args") {
            if (urlObj1[key] != urlObj2[key]) {
                return false;
            }
        }
    }
    for (var key in urlObj1.args) {
        if (urlObj1.args[key] != urlObj2.args[key]) {
            return false;
        }
        delete urlObj2.args[key];
    }
    for (var key in urlObj2.args) {
        return false;
    }
    return true;
};
OpenLayers.Util.createUrlObject = function (url, options) {
    options = options || {};
    if (!(/^\w+:\/\//).test(url)) {
        var loc = window.location;
        var port = loc.port ? ":" + loc.port : "";
        var fullUrl = loc.protocol + "//" + loc.host.split(":").shift() + port;
        if (url.indexOf("/") === 0) {
            url = fullUrl + url;
        } else {
            var parts = loc.pathname.split("/");
            parts.pop();
            url = fullUrl + parts.join("/") + "/" + url;
        }
    }
    if (options.ignoreCase) {
        url = url.toLowerCase();
    }
    var a = document.createElement('a');
    a.href = url;
    var urlObject = {};
    urlObject.host = a.host.split(":").shift();
    urlObject.protocol = a.protocol;
    if (options.ignorePort80) {
        urlObject.port = (a.port == "80" || a.port == "0") ? "" : a.port;
    } else {
        urlObject.port = (a.port == "" || a.port == "0") ? "80" : a.port;
    }
    urlObject.hash = (options.ignoreHash || a.hash === "#") ? "" : a.hash;
    var queryString = a.search;
    if (!queryString) {
        var qMark = url.indexOf("?");
        queryString = (qMark != -1) ? url.substr(qMark) : "";
    }
    urlObject.args = OpenLayers.Util.getParameters(queryString);
    urlObject.pathname = (a.pathname.charAt(0) == "/") ? a.pathname : "/" + a.pathname;
    return urlObject;
};
OpenLayers.Util.removeTail = function (url) {
    var head = null;
    var qMark = url.indexOf("?");
    var hashMark = url.indexOf("#");
    if (qMark == -1) {
        head = (hashMark != -1) ? url.substr(0, hashMark) : url;
    } else {
        head = (hashMark != -1) ? url.substr(0, Math.min(qMark, hashMark)) : url.substr(0, qMark);
    }
    return head;
};
OpenLayers.IS_GECKO = (function () {
    var ua = navigator.userAgent.toLowerCase();
    return ua.indexOf("webkit") == -1 && ua.indexOf("gecko") != -1;
})();
OpenLayers.CANVAS_SUPPORTED = (function () {
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
})();
OpenLayers.BROWSER_NAME = (function () {
    var name = "";
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("opera") != -1) {
        name = "opera";
    } else if (ua.indexOf("msie") != -1) {
        name = "msie";
    } else if (ua.indexOf("safari") != -1) {
        name = "safari";
    } else if (ua.indexOf("mozilla") != -1) {
        if (ua.indexOf("firefox") != -1) {
            name = "firefox";
        } else {
            name = "mozilla";
        }
    }
    return name;
})();
OpenLayers.Util.getBrowserName = function () {
    return OpenLayers.BROWSER_NAME;
};
OpenLayers.Util.getRenderedDimensions = function (contentHTML, size, options) {
    var w, h;
    var container = document.createElement("div");
    container.style.visibility = "hidden";
    var containerElement = (options && options.containerElement) ? options.containerElement : document.body;
    var parentHasPositionAbsolute = false;
    var superContainer = null;
    var parent = containerElement;
    while (parent && parent.tagName.toLowerCase() != "body") {
        var parentPosition = OpenLayers.Element.getStyle(parent, "position");
        if (parentPosition == "absolute") {
            parentHasPositionAbsolute = true;
            break;
        } else if (parentPosition && parentPosition != "static") {
            break;
        }
        parent = parent.parentNode;
    }
    if (parentHasPositionAbsolute && (containerElement.clientHeight === 0 || containerElement.clientWidth === 0)) {
        superContainer = document.createElement("div");
        superContainer.style.visibility = "hidden";
        superContainer.style.position = "absolute";
        superContainer.style.overflow = "visible";
        superContainer.style.width = document.body.clientWidth + "px";
        superContainer.style.height = document.body.clientHeight + "px";
        superContainer.appendChild(container);
    }
    container.style.position = "absolute";
    if (size) {
        if (size.w) {
            w = size.w;
            container.style.width = w + "px";
        } else if (size.h) {
            h = size.h;
            container.style.height = h + "px";
        }
    }
    if (options && options.displayClass) {
        container.className = options.displayClass;
    }
    var content = document.createElement("div");
    content.innerHTML = contentHTML;
    content.style.overflow = "visible";
    if (content.childNodes) {
        for (var i = 0, l = content.childNodes.length; i < l; i++) {
            if (!content.childNodes[i].style) continue;
            content.childNodes[i].style.overflow = "visible";
        }
    }
    container.appendChild(content);
    if (superContainer) {
        containerElement.appendChild(superContainer);
    } else {
        containerElement.appendChild(container);
    }
    if (!w) {
        w = parseInt(content.scrollWidth);
        container.style.width = w + "px";
    }
    if (!h) {
        h = parseInt(content.scrollHeight);
    }
    container.removeChild(content);
    if (superContainer) {
        superContainer.removeChild(container);
        containerElement.removeChild(superContainer);
    } else {
        containerElement.removeChild(container);
    }
    return new OpenLayers.Size(w, h);
};
OpenLayers.Util.getScrollbarWidth = function () {
    var scrollbarWidth = OpenLayers.Util._scrollbarWidth;
    if (scrollbarWidth == null) {
        var scr = null;
        var inn = null;
        var wNoScroll = 0;
        var wScroll = 0;
        scr = document.createElement('div');
        scr.style.position = 'absolute';
        scr.style.top = '-1000px';
        scr.style.left = '-1000px';
        scr.style.width = '100px';
        scr.style.height = '50px';
        scr.style.overflow = 'hidden';
        inn = document.createElement('div');
        inn.style.width = '100%';
        inn.style.height = '200px';
        scr.appendChild(inn);
        document.body.appendChild(scr);
        wNoScroll = inn.offsetWidth;
        scr.style.overflow = 'scroll';
        wScroll = inn.offsetWidth;
        document.body.removeChild(document.body.lastChild);
        OpenLayers.Util._scrollbarWidth = (wNoScroll - wScroll);
        scrollbarWidth = OpenLayers.Util._scrollbarWidth;
    }
    return scrollbarWidth;
};
OpenLayers.Util.getFormattedLonLat = function (coordinate, axis, dmsOption) {
    if (!dmsOption) {
        dmsOption = 'dms';
    }
    coordinate = (coordinate + 540) % 360 - 180;
    var abscoordinate = Math.abs(coordinate);
    var coordinatedegrees = Math.floor(abscoordinate);
    var coordinateminutes = (abscoordinate - coordinatedegrees) / (1 / 60);
    var tempcoordinateminutes = coordinateminutes;
    coordinateminutes = Math.floor(coordinateminutes);
    var coordinateseconds = (tempcoordinateminutes - coordinateminutes) / (1 / 60);
    coordinateseconds = Math.round(coordinateseconds * 10);
    coordinateseconds /= 10;
    if (coordinateseconds >= 60) {
        coordinateseconds -= 60;
        coordinateminutes += 1;
        if (coordinateminutes >= 60) {
            coordinateminutes -= 60;
            coordinatedegrees += 1;
        }
    }
    if (coordinatedegrees < 10) {
        coordinatedegrees = "0" + coordinatedegrees;
    }
    var str = coordinatedegrees + "\u00B0";
    if (dmsOption.indexOf('dm') >= 0) {
        if (coordinateminutes < 10) {
            coordinateminutes = "0" + coordinateminutes;
        }
        str += coordinateminutes + "'";
        if (dmsOption.indexOf('dms') >= 0) {
            if (coordinateseconds < 10) {
                coordinateseconds = "0" + coordinateseconds;
            }
            str += coordinateseconds + '"';
        }
    }
    if (axis == "lon") {
        str += coordinate < 0 ? OpenLayers.i18n("W") : OpenLayers.i18n("E");
    } else {
        str += coordinate < 0 ? OpenLayers.i18n("S") : OpenLayers.i18n("N");
    }
    return str;
};
OpenLayers.Event = {
    observers: false,
    KEY_SPACE: 32,
    KEY_BACKSPACE: 8,
    KEY_TAB: 9,
    KEY_RETURN: 13,
    KEY_ESC: 27,
    KEY_LEFT: 37,
    KEY_UP: 38,
    KEY_RIGHT: 39,
    KEY_DOWN: 40,
    KEY_DELETE: 46,
    element: function (event) {
        return event.target || event.srcElement;
    },
    isSingleTouch: function (event) {
        return event.touches && event.touches.length == 1;
    },
    isMultiTouch: function (event) {
        return event.touches && event.touches.length > 1;
    },
    isLeftClick: function (event) {
        return (((event.which) && (event.which == 1)) || ((event.button) && (event.button == 1)));
    },
    isRightClick: function (event) {
        return (((event.which) && (event.which == 3)) || ((event.button) && (event.button == 2)));
    },
    stop: function (event, allowDefault) {
        if (!allowDefault) {
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        }
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },
    findElement: function (event, tagName) {
        var element = OpenLayers.Event.element(event);
        while (element.parentNode && (!element.tagName || (element.tagName.toUpperCase() != tagName.toUpperCase()))) {
            element = element.parentNode;
        }
        return element;
    },
    observe: function (elementParam, name, observer, useCapture) {
        var element = OpenLayers.Util.getElement(elementParam);
        useCapture = useCapture || false;
        if (name == 'keypress' && (navigator.appVersion.match(/Konqueror|Safari|KHTML/) || element.attachEvent)) {
            name = 'keydown';
        }
        if (!this.observers) {
            this.observers = {};
        }
        if (!element._eventCacheID) {
            var idPrefix = "eventCacheID_";
            if (element.id) {
                idPrefix = element.id + "_" + idPrefix;
            }
            element._eventCacheID = OpenLayers.Util.createUniqueID(idPrefix);
        }
        var cacheID = element._eventCacheID;
        if (!this.observers[cacheID]) {
            this.observers[cacheID] = [];
        }
        this.observers[cacheID].push({
            'element': element,
            'name': name,
            'observer': observer,
            'useCapture': useCapture
        });
        if (element.addEventListener) {
            element.addEventListener(name, observer, useCapture);
        } else if (element.attachEvent) {
            element.attachEvent('on' + name, observer);
        }
    },
    stopObservingElement: function (elementParam) {
        var element = OpenLayers.Util.getElement(elementParam);
        var cacheID = element._eventCacheID;
        this._removeElementObservers(OpenLayers.Event.observers[cacheID]);
    },
    _removeElementObservers: function (elementObservers) {
        if (elementObservers) {
            for (var i = elementObservers.length - 1; i >= 0; i--) {
                var entry = elementObservers[i];
                var args = new Array(entry.element, entry.name, entry.observer, entry.useCapture);
                var removed = OpenLayers.Event.stopObserving.apply(this, args);
            }
        }
    },
    stopObserving: function (elementParam, name, observer, useCapture) {
        useCapture = useCapture || false;
        var element = OpenLayers.Util.getElement(elementParam);
        var cacheID = element._eventCacheID;
        if (name == 'keypress') {
            if (navigator.appVersion.match(/Konqueror|Safari|KHTML/) || element.detachEvent) {
                name = 'keydown';
            }
        }
        var foundEntry = false;
        var elementObservers = OpenLayers.Event.observers[cacheID];
        if (elementObservers) {
            var i = 0;
            while (!foundEntry && i < elementObservers.length) {
                var cacheEntry = elementObservers[i];
                if ((cacheEntry.name == name) && (cacheEntry.observer == observer) && (cacheEntry.useCapture == useCapture)) {
                    elementObservers.splice(i, 1);
                    if (elementObservers.length == 0) {
                        delete OpenLayers.Event.observers[cacheID];
                    }
                    foundEntry = true;
                    break;
                }
                i++;
            }
        }
        if (foundEntry) {
            if (element.removeEventListener) {
                element.removeEventListener(name, observer, useCapture);
            } else if (element && element.detachEvent) {
                element.detachEvent('on' + name, observer);
            }
        }
        return foundEntry;
    },
    unloadCache: function () {
        if (OpenLayers.Event && OpenLayers.Event.observers) {
            for (var cacheID in OpenLayers.Event.observers) {
                var elementObservers = OpenLayers.Event.observers[cacheID];
                OpenLayers.Event._removeElementObservers.apply(this, [elementObservers]);
            }
            OpenLayers.Event.observers = false;
        }
    },
    CLASS_NAME: "OpenLayers.Event"
};
OpenLayers.Event.observe(window, 'unload', OpenLayers.Event.unloadCache, false);
OpenLayers.Events = OpenLayers.Class({
    BROWSER_EVENTS: ["mouseover", "mouseout", "mousedown", "mouseup", "mousemove", "click", "dblclick", "rightclick", "dblrightclick", "resize", "focus", "blur", "touchstart", "touchmove", "touchend", "keydown"],
    listeners: null,
    object: null,
    element: null,
    eventHandler: null,
    fallThrough: null,
    includeXY: false,
    extensions: null,
    extensionCount: null,
    clearMouseListener: null,
    initialize: function (object, element, eventTypes, fallThrough, options) {
        OpenLayers.Util.extend(this, options);
        this.object = object;
        this.fallThrough = fallThrough;
        this.listeners = {};
        this.extensions = {};
        this.extensionCount = {};
        if (element != null) {
            this.attachToElement(element);
        }
    },
    destroy: function () {
        for (var e in this.extensions) {
            if (typeof this.extensions[e] !== "boolean") {
                this.extensions[e].destroy();
            }
        }
        this.extensions = null;
        if (this.element) {
            OpenLayers.Event.stopObservingElement(this.element);
            if (this.element.hasScrollEvent) {
                OpenLayers.Event.stopObserving(window, "scroll", this.clearMouseListener);
            }
        }
        this.element = null;
        this.listeners = null;
        this.object = null;
        this.fallThrough = null;
        this.eventHandler = null;
    },
    addEventType: function (eventName) {},
    attachToElement: function (element) {
        if (this.element) {
            OpenLayers.Event.stopObservingElement(this.element);
        } else {
            this.eventHandler = OpenLayers.Function.bindAsEventListener(this.handleBrowserEvent, this);
            this.clearMouseListener = OpenLayers.Function.bind(this.clearMouseCache, this);
        }
        this.element = element;
        for (var i = 0, len = this.BROWSER_EVENTS.length; i < len; i++) {
            OpenLayers.Event.observe(element, this.BROWSER_EVENTS[i], this.eventHandler);
        }
        OpenLayers.Event.observe(element, "dragstart", OpenLayers.Event.stop);
    },
    on: function (object) {
        for (var type in object) {
            if (type != "scope" && object.hasOwnProperty(type)) {
                this.register(type, object.scope, object[type]);
            }
        }
    },
    register: function (type, obj, func, priority) {
        if (type in OpenLayers.Events && !this.extensions[type]) {
            this.extensions[type] = new OpenLayers.Events[type](this);
        }
        if (func != null) {
            if (obj == null) {
                obj = this.object;
            }
            var listeners = this.listeners[type];
            if (!listeners) {
                listeners = [];
                this.listeners[type] = listeners;
                this.extensionCount[type] = 0;
            }
            var listener = {
                obj: obj,
                func: func
            };
            if (priority) {
                listeners.splice(this.extensionCount[type], 0, listener);
                if (typeof priority === "object" && priority.extension) {
                    this.extensionCount[type]++;
                }
            } else {
                listeners.push(listener);
            }
        }
    },
    registerPriority: function (type, obj, func) {
        this.register(type, obj, func, true);
    },
    un: function (object) {
        for (var type in object) {
            if (type != "scope" && object.hasOwnProperty(type)) {
                this.unregister(type, object.scope, object[type]);
            }
        }
    },
    unregister: function (type, obj, func) {
        if (obj == null) {
            obj = this.object;
        }
        var listeners = this.listeners[type];
        if (listeners != null) {
            for (var i = 0, len = listeners.length; i < len; i++) {
                if (listeners[i].obj == obj && listeners[i].func == func) {
                    listeners.splice(i, 1);
                    break;
                }
            }
        }
    },
    remove: function (type) {
        if (this.listeners[type] != null) {
            this.listeners[type] = [];
        }
    },
    triggerEvent: function (type, evt) {
        var listeners = this.listeners[type];
        if (!listeners || listeners.length == 0) {
            return undefined;
        }
        if (evt == null) {
            evt = {};
        }
        evt.object = this.object;
        evt.element = this.element;
        if (!evt.type) {
            evt.type = type;
        }
        listeners = listeners.slice();
        var continueChain;
        for (var i = 0, len = listeners.length; i < len; i++) {
            var callback = listeners[i];
            continueChain = callback.func.apply(callback.obj, [evt]);
            if ((continueChain != undefined) && (continueChain == false)) {
                break;
            }
        }
        if (!this.fallThrough) {
            OpenLayers.Event.stop(evt, true);
        }
        return continueChain;
    },
    handleBrowserEvent: function (evt) {
        var type = evt.type,
            listeners = this.listeners[type];
        if (!listeners || listeners.length == 0) {
            return;
        }
        var touches = evt.touches;
        if (touches && touches[0]) {
            var x = 0;
            var y = 0;
            var num = touches.length;
            var touch;
            for (var i = 0; i < num; ++i) {
                touch = touches[i];
                x += touch.clientX;
                y += touch.clientY;
            }
            evt.clientX = x / num;
            evt.clientY = y / num;
        }
        if (this.includeXY) {
            evt.xy = this.getMousePosition(evt);
        }
        this.triggerEvent(type, evt);
    },
    clearMouseCache: function () {
        this.element.scrolls = null;
        this.element.lefttop = null;
        var body = document.body;
        if (body && !((body.scrollTop != 0 || body.scrollLeft != 0) && navigator.userAgent.match(/iPhone/i))) {
            this.element.offsets = null;
        }
    },
    getMousePosition: function (evt) {
        if (!this.includeXY) {
            this.clearMouseCache();
        } else if (!this.element.hasScrollEvent) {
            OpenLayers.Event.observe(window, "scroll", this.clearMouseListener);
            this.element.hasScrollEvent = true;
        }
        if (!this.element.scrolls) {
            var viewportElement = OpenLayers.Util.getViewportElement();
            this.element.scrolls = [viewportElement.scrollLeft, viewportElement.scrollTop];
        }
        if (!this.element.lefttop) {
            this.element.lefttop = [(document.documentElement.clientLeft || 0), (document.documentElement.clientTop || 0)];
        }
        if (!this.element.offsets) {
            this.element.offsets = OpenLayers.Util.pagePosition(this.element);
        }
        return new OpenLayers.Pixel((evt.clientX + this.element.scrolls[0]) - this.element.offsets[0] - this.element.lefttop[0], (evt.clientY + this.element.scrolls[1]) - this.element.offsets[1] - this.element.lefttop[1]);
    },
    CLASS_NAME: "OpenLayers.Events"
});
OpenLayers.Projection = OpenLayers.Class({
    proj: null,
    projCode: null,
    titleRegEx: /\+title=[^\+]*/,
    initialize: function (projCode, options) {
        OpenLayers.Util.extend(this, options);
        this.projCode = projCode;
        if (window.Proj4js) {
            this.proj = new Proj4js.Proj(projCode);
        }
    },
    getCode: function () {
        return this.proj ? this.proj.srsCode : this.projCode;
    },
    getUnits: function () {
        return this.proj ? this.proj.units : null;
    },
    toString: function () {
        return this.getCode();
    },
    equals: function (projection) {
        var p = projection,
            equals = false;
        if (p) {
            if (!(p instanceof OpenLayers.Projection)) {
                p = new OpenLayers.Projection(p);
            }
            if (window.Proj4js && this.proj.defData && p.proj.defData) {
                equals = this.proj.defData.replace(this.titleRegEx, "") == p.proj.defData.replace(this.titleRegEx, "");
            } else if (p.getCode) {
                var source = this.getCode(),
                    target = p.getCode();
                equals = source == target || !! OpenLayers.Projection.transforms[source] && OpenLayers.Projection.transforms[source][target] === OpenLayers.Projection.nullTransform;
            }
        }
        return equals;
    },
    destroy: function () {
        delete this.proj;
        delete this.projCode;
    },
    CLASS_NAME: "OpenLayers.Projection"
});
OpenLayers.Projection.transforms = {};
OpenLayers.Projection.defaults = {
    "EPSG:4326": {
        units: "degrees",
        maxExtent: [-180, -90, 180, 90],
        yx: true
    },
    "CRS:84": {
        units: "degrees",
        maxExtent: [-180, -90, 180, 90]
    },
    "EPSG:900913": {
        units: "m",
        maxExtent: [-20037508.34, -20037508.34, 20037508.34, 20037508.34]
    }
};
OpenLayers.Projection.addTransform = function (from, to, method) {
    if (method === OpenLayers.Projection.nullTransform) {
        var defaults = OpenLayers.Projection.defaults[from];
        if (defaults && !OpenLayers.Projection.defaults[to]) {
            OpenLayers.Projection.defaults[to] = defaults;
        }
    }
    if (!OpenLayers.Projection.transforms[from]) {
        OpenLayers.Projection.transforms[from] = {};
    }
    OpenLayers.Projection.transforms[from][to] = method;
};
OpenLayers.Projection.transform = function (point, source, dest) {
    if (source && dest) {
        if (!(source instanceof OpenLayers.Projection)) {
            source = new OpenLayers.Projection(source);
        }
        if (!(dest instanceof OpenLayers.Projection)) {
            dest = new OpenLayers.Projection(dest);
        }
        if (source.proj && dest.proj) {
            point = Proj4js.transform(source.proj, dest.proj, point);
        } else {
            var sourceCode = source.getCode();
            var destCode = dest.getCode();
            var transforms = OpenLayers.Projection.transforms;
            if (transforms[sourceCode] && transforms[sourceCode][destCode]) {
                transforms[sourceCode][destCode](point);
            }
        }
    }
    return point;
};
OpenLayers.Projection.nullTransform = function (point) {
    return point;
};
(function () {
    var pole = 20037508.34;

    function inverseMercator(xy) {
        xy.x = 180 * xy.x / pole;
        xy.y = 180 / Math.PI * (2 * Math.atan(Math.exp((xy.y / pole) * Math.PI)) - Math.PI / 2);
        return xy;
    }

    function forwardMercator(xy) {
        xy.x = xy.x * pole / 180;
        xy.y = Math.log(Math.tan((90 + xy.y) * Math.PI / 360)) / Math.PI * pole;
        return xy;
    }

    function map(base, codes) {
        var add = OpenLayers.Projection.addTransform;
        var same = OpenLayers.Projection.nullTransform;
        var i, len, code, other, j;
        for (i = 0, len = codes.length; i < len; ++i) {
            code = codes[i];
            add(base, code, forwardMercator);
            add(code, base, inverseMercator);
            for (j = i + 1; j < len; ++j) {
                other = codes[j];
                add(code, other, same);
                add(other, code, same);
            }
        }
    }
    var mercator = ["EPSG:900913", "EPSG:3857", "EPSG:102113", "EPSG:102100"],
        geographic = ["CRS:84", "urn:ogc:def:crs:EPSG:6.6:4326", "EPSG:4326"],
        i;
    for (i = mercator.length - 1; i >= 0; --i) {
        map(mercator[i], geographic);
    }
    for (i = geographic.length - 1; i >= 0; --i) {
        map(geographic[i], mercator);
    }
})();
OpenLayers.Map = OpenLayers.Class({
    Z_INDEX_BASE: {
        BaseLayer: 100,
        Overlay: 325,
        Feature: 725,
        Popup: 750,
        Control: 1000
    },
    id: null,
    fractionalZoom: false,
    events: null,
    allOverlays: false,
    div: null,
    dragging: false,
    size: null,
    viewPortDiv: null,
    layerContainerOrigin: null,
    layerContainerDiv: null,
    layers: null,
    controls: null,
    popups: null,
    baseLayer: null,
    center: null,
    resolution: null,
    zoom: 0,
    panRatio: 1.5,
    options: null,
    tileSize: null,
    projection: "EPSG:4326",
    units: null,
    resolutions: null,
    maxResolution: null,
    minResolution: null,
    maxScale: null,
    minScale: null,
    maxExtent: null,
    minExtent: null,
    restrictedExtent: null,
    numZoomLevels: 16,
    theme: null,
    displayProjection: null,
    fallThrough: true,
    panTween: null,
    eventListeners: null,
    panMethod: OpenLayers.Easing.Expo.easeOut,
    panDuration: 50,
    paddingForPopups: null,
    minPx: null,
    maxPx: null,
    initialize: function (div, options) {
        if (arguments.length === 1 && typeof div === "object") {
            options = div;
            div = options && options.div;
        }
        this.tileSize = new OpenLayers.Size(OpenLayers.Map.TILE_WIDTH, OpenLayers.Map.TILE_HEIGHT);
        this.paddingForPopups = new OpenLayers.Bounds(15, 15, 15, 15);
        this.theme = OpenLayers._getScriptLocation() + 'theme/default/style.css';
        this.options = OpenLayers.Util.extend({}, options);
        OpenLayers.Util.extend(this, options);
        var projCode = this.projection instanceof OpenLayers.Projection ? this.projection.projCode : this.projection;
        OpenLayers.Util.applyDefaults(this, OpenLayers.Projection.defaults[projCode]);
        if (this.maxExtent && !(this.maxExtent instanceof OpenLayers.Bounds)) {
            this.maxExtent = new OpenLayers.Bounds(this.maxExtent);
        }
        if (this.minExtent && !(this.minExtent instanceof OpenLayers.Bounds)) {
            this.minExtent = new OpenLayers.Bounds(this.minExtent);
        }
        if (this.restrictedExtent && !(this.restrictedExtent instanceof OpenLayers.Bounds)) {
            this.restrictedExtent = new OpenLayers.Bounds(this.restrictedExtent);
        }
        if (this.center && !(this.center instanceof OpenLayers.LonLat)) {
            this.center = new OpenLayers.LonLat(this.center);
        }
        this.layers = [];
        this.id = OpenLayers.Util.createUniqueID("OpenLayers.Map_");
        this.div = OpenLayers.Util.getElement(div);
        if (!this.div) {
            this.div = document.createElement("div");
            this.div.style.height = "1px";
            this.div.style.width = "1px";
        }
        OpenLayers.Element.addClass(this.div, 'olMap');
        var id = this.id + "_OpenLayers_ViewPort";
        this.viewPortDiv = OpenLayers.Util.createDiv(id, null, null, null, "relative", null, "hidden");
        this.viewPortDiv.style.width = "100%";
        this.viewPortDiv.style.height = "100%";
        this.viewPortDiv.className = "olMapViewport";
        this.div.appendChild(this.viewPortDiv);
        this.events = new OpenLayers.Events(this, this.viewPortDiv, null, this.fallThrough, {
            includeXY: true
        });
        id = this.id + "_OpenLayers_Container";
        this.layerContainerDiv = OpenLayers.Util.createDiv(id);
        this.layerContainerDiv.style.width = '100px';
        this.layerContainerDiv.style.height = '100px';
        this.layerContainerDiv.style.zIndex = this.Z_INDEX_BASE['Popup'] - 1;
        this.viewPortDiv.appendChild(this.layerContainerDiv);
        this.updateSize();
        if (this.eventListeners instanceof Object) {
            this.events.on(this.eventListeners);
        }
        if (parseFloat(navigator.appVersion.split("MSIE")[1]) < 9) {
            this.events.register("resize", this, this.updateSize);
        } else {
            this.updateSizeDestroy = OpenLayers.Function.bind(this.updateSize, this);
            OpenLayers.Event.observe(window, 'resize', this.updateSizeDestroy);
        }
        if (this.theme) {
            var addNode = true;
            var nodes = document.getElementsByTagName('link');
            for (var i = 0, len = nodes.length; i < len; ++i) {
                if (OpenLayers.Util.isEquivalentUrl(nodes.item(i).href, this.theme)) {
                    addNode = false;
                    break;
                }
            }
            if (addNode) {
                var cssNode = document.createElement('link');
                cssNode.setAttribute('rel', 'stylesheet');
                cssNode.setAttribute('type', 'text/css');
                cssNode.setAttribute('href', this.theme);
                document.getElementsByTagName('head')[0].appendChild(cssNode);
            }
        }
        if (this.controls == null) {
            this.controls = [];
            if (OpenLayers.Control != null) {
                if (OpenLayers.Control.Navigation) {
                    this.controls.push(new OpenLayers.Control.Navigation());
                } else if (OpenLayers.Control.TouchNavigation) {
                    this.controls.push(new OpenLayers.Control.TouchNavigation());
                }
                if (OpenLayers.Control.Zoom) {
                    this.controls.push(new OpenLayers.Control.Zoom());
                } else if (OpenLayers.Control.PanZoom) {
                    this.controls.push(new OpenLayers.Control.PanZoom());
                }
                if (OpenLayers.Control.ArgParser) {
                    this.controls.push(new OpenLayers.Control.ArgParser());
                }
                if (OpenLayers.Control.Attribution) {
                    this.controls.push(new OpenLayers.Control.Attribution());
                }
            }
        }
        for (var i = 0, len = this.controls.length; i < len; i++) {
            this.addControlToMap(this.controls[i]);
        }
        this.popups = [];
        this.unloadDestroy = OpenLayers.Function.bind(this.destroy, this);
        OpenLayers.Event.observe(window, 'unload', this.unloadDestroy);
        if (options && options.layers) {
            delete this.center;
            this.addLayers(options.layers);
            if (options.center && !this.getCenter()) {
                this.setCenter(options.center, options.zoom);
            }
        }
    },
    getViewport: function () {
        return this.viewPortDiv;
    },
    render: function (div) {
        this.div = OpenLayers.Util.getElement(div);
        OpenLayers.Element.addClass(this.div, 'olMap');
        this.viewPortDiv.parentNode.removeChild(this.viewPortDiv);
        this.div.appendChild(this.viewPortDiv);
        this.updateSize();
    },
    unloadDestroy: null,
    updateSizeDestroy: null,
    destroy: function () {
        if (!this.unloadDestroy) {
            return false;
        }
        if (this.panTween) {
            this.panTween.stop();
            this.panTween = null;
        }
        OpenLayers.Event.stopObserving(window, 'unload', this.unloadDestroy);
        this.unloadDestroy = null;
        if (this.updateSizeDestroy) {
            OpenLayers.Event.stopObserving(window, 'resize', this.updateSizeDestroy);
        } else {
            this.events.unregister("resize", this, this.updateSize);
        }
        this.paddingForPopups = null;
        if (this.controls != null) {
            for (var i = this.controls.length - 1; i >= 0; --i) {
                this.controls[i].destroy();
            }
            this.controls = null;
        }
        if (this.layers != null) {
            for (var i = this.layers.length - 1; i >= 0; --i) {
                this.layers[i].destroy(false);
            }
            this.layers = null;
        }
        if (this.viewPortDiv) {
            this.div.removeChild(this.viewPortDiv);
        }
        this.viewPortDiv = null;
        if (this.eventListeners) {
            this.events.un(this.eventListeners);
            this.eventListeners = null;
        }
        this.events.destroy();
        this.events = null;
        this.options = null;
    },
    setOptions: function (options) {
        var updatePxExtent = this.minPx && options.restrictedExtent != this.restrictedExtent;
        OpenLayers.Util.extend(this, options);
        updatePxExtent && this.moveTo(this.getCachedCenter(), this.zoom, {
            forceZoomChange: true
        });
    },
    getTileSize: function () {
        return this.tileSize;
    },
    getBy: function (array, property, match) {
        var test = (typeof match.test == "function");
        var found = OpenLayers.Array.filter(this[array], function (item) {
            return item[property] == match || (test && match.test(item[property]));
        });
        return found;
    },
    getLayersBy: function (property, match) {
        return this.getBy("layers", property, match);
    },
    getLayersByName: function (match) {
        return this.getLayersBy("name", match);
    },
    getLayersByClass: function (match) {
        return this.getLayersBy("CLASS_NAME", match);
    },
    getControlsBy: function (property, match) {
        return this.getBy("controls", property, match);
    },
    getControlsByClass: function (match) {
        return this.getControlsBy("CLASS_NAME", match);
    },
    getLayer: function (id) {
        var foundLayer = null;
        for (var i = 0, len = this.layers.length; i < len; i++) {
            var layer = this.layers[i];
            if (layer.id == id) {
                foundLayer = layer;
                break;
            }
        }
        return foundLayer;
    },
    setLayerZIndex: function (layer, zIdx) {
        layer.setZIndex(this.Z_INDEX_BASE[layer.isBaseLayer ? 'BaseLayer' : 'Overlay'] + zIdx * 5);
    },
    resetLayersZIndex: function () {
        for (var i = 0, len = this.layers.length; i < len; i++) {
            var layer = this.layers[i];
            this.setLayerZIndex(layer, i);
        }
    },
    addLayer: function (layer) {
        for (var i = 0, len = this.layers.length; i < len; i++) {
            if (this.layers[i] == layer) {
                return false;
            }
        }
        if (this.events.triggerEvent("preaddlayer", {
            layer: layer
        }) === false) {
            return false;
        }
        if (this.allOverlays) {
            layer.isBaseLayer = false;
        }
        layer.div.className = "olLayerDiv";
        layer.div.style.overflow = "";
        this.setLayerZIndex(layer, this.layers.length);
        if (layer.isFixed) {
            this.viewPortDiv.appendChild(layer.div);
        } else {
            this.layerContainerDiv.appendChild(layer.div);
        }
        this.layers.push(layer);
        layer.setMap(this);
        if (layer.isBaseLayer || (this.allOverlays && !this.baseLayer)) {
            if (this.baseLayer == null) {
                this.setBaseLayer(layer);
            } else {
                layer.setVisibility(false);
            }
        } else {
            layer.redraw();
        }
        this.events.triggerEvent("addlayer", {
            layer: layer
        });
        layer.events.triggerEvent("added", {
            map: this,
            layer: layer
        });
        layer.afterAdd();
        return true;
    },
    addLayers: function (layers) {
        for (var i = 0, len = layers.length; i < len; i++) {
            this.addLayer(layers[i]);
        }
    },
    removeLayer: function (layer, setNewBaseLayer) {
        if (this.events.triggerEvent("preremovelayer", {
            layer: layer
        }) === false) {
            return;
        }
        if (setNewBaseLayer == null) {
            setNewBaseLayer = true;
        }
        if (layer.isFixed) {
            this.viewPortDiv.removeChild(layer.div);
        } else {
            this.layerContainerDiv.removeChild(layer.div);
        }
        OpenLayers.Util.removeItem(this.layers, layer);
        layer.removeMap(this);
        layer.map = null;
        if (this.baseLayer == layer) {
            this.baseLayer = null;
            if (setNewBaseLayer) {
                for (var i = 0, len = this.layers.length; i < len; i++) {
                    var iLayer = this.layers[i];
                    if (iLayer.isBaseLayer || this.allOverlays) {
                        this.setBaseLayer(iLayer);
                        break;
                    }
                }
            }
        }
        this.resetLayersZIndex();
        this.events.triggerEvent("removelayer", {
            layer: layer
        });
        layer.events.triggerEvent("removed", {
            map: this,
            layer: layer
        });
    },
    getNumLayers: function () {
        return this.layers.length;
    },
    getLayerIndex: function (layer) {
        return OpenLayers.Util.indexOf(this.layers, layer);
    },
    setLayerIndex: function (layer, idx) {
        var base = this.getLayerIndex(layer);
        if (idx < 0) {
            idx = 0;
        } else if (idx > this.layers.length) {
            idx = this.layers.length;
        }
        if (base != idx) {
            this.layers.splice(base, 1);
            this.layers.splice(idx, 0, layer);
            for (var i = 0, len = this.layers.length; i < len; i++) {
                this.setLayerZIndex(this.layers[i], i);
            }
            this.events.triggerEvent("changelayer", {
                layer: layer,
                property: "order"
            });
            if (this.allOverlays) {
                if (idx === 0) {
                    this.setBaseLayer(layer);
                } else if (this.baseLayer !== this.layers[0]) {
                    this.setBaseLayer(this.layers[0]);
                }
            }
        }
    },
    raiseLayer: function (layer, delta) {
        var idx = this.getLayerIndex(layer) + delta;
        this.setLayerIndex(layer, idx);
    },
    setBaseLayer: function (newBaseLayer) {
        if (newBaseLayer != this.baseLayer) {
            if (OpenLayers.Util.indexOf(this.layers, newBaseLayer) != -1) {
                var center = this.getCachedCenter();
                var newResolution = OpenLayers.Util.getResolutionFromScale(this.getScale(), newBaseLayer.units);
                if (this.baseLayer != null && !this.allOverlays) {
                    this.baseLayer.setVisibility(false);
                }
                this.baseLayer = newBaseLayer;
                if (!this.allOverlays || this.baseLayer.visibility) {
                    this.baseLayer.setVisibility(true);
                    if (this.baseLayer.inRange === false) {
                        this.baseLayer.redraw();
                    }
                }
                if (center != null) {
                    var newZoom = this.getZoomForResolution(newResolution || this.resolution, true);
                    this.setCenter(center, newZoom, false, true);
                }
                this.events.triggerEvent("changebaselayer", {
                    layer: this.baseLayer
                });
            }
        }
    },
    addControl: function (control, px) {
        this.controls.push(control);
        this.addControlToMap(control, px);
    },
    addControls: function (controls, pixels) {
        var pxs = (arguments.length === 1) ? [] : pixels;
        for (var i = 0, len = controls.length; i < len; i++) {
            var ctrl = controls[i];
            var px = (pxs[i]) ? pxs[i] : null;
            this.addControl(ctrl, px);
        }
    },
    addControlToMap: function (control, px) {
        control.outsideViewport = (control.div != null);
        if (this.displayProjection && !control.displayProjection) {
            control.displayProjection = this.displayProjection;
        }
        control.setMap(this);
        var div = control.draw(px);
        if (div) {
            if (!control.outsideViewport) {
                div.style.zIndex = this.Z_INDEX_BASE['Control'] +
                    this.controls.length;
                this.viewPortDiv.appendChild(div);
            }
        }
        if (control.autoActivate) {
            control.activate();
        }
    },
    getControl: function (id) {
        var returnControl = null;
        for (var i = 0, len = this.controls.length; i < len; i++) {
            var control = this.controls[i];
            if (control.id == id) {
                returnControl = control;
                break;
            }
        }
        return returnControl;
    },
    removeControl: function (control) {
        if ((control) && (control == this.getControl(control.id))) {
            if (control.div && (control.div.parentNode == this.viewPortDiv)) {
                this.viewPortDiv.removeChild(control.div);
            }
            OpenLayers.Util.removeItem(this.controls, control);
        }
    },
    addPopup: function (popup, exclusive) {
        if (exclusive) {
            for (var i = this.popups.length - 1; i >= 0; --i) {
                this.removePopup(this.popups[i]);
            }
        }
        popup.map = this;
        this.popups.push(popup);
        var popupDiv = popup.draw();
        if (popupDiv) {
            popupDiv.style.zIndex = this.Z_INDEX_BASE['Popup'] +
                this.popups.length;
            this.layerContainerDiv.appendChild(popupDiv);
        }
    },
    removePopup: function (popup) {
        OpenLayers.Util.removeItem(this.popups, popup);
        if (popup.div) {
            try {
                this.layerContainerDiv.removeChild(popup.div);
            } catch (e) {}
        }
        popup.map = null;
    },
    getSize: function () {
        var size = null;
        if (this.size != null) {
            size = this.size.clone();
        }
        return size;
    },
    updateSize: function () {
        var newSize = this.getCurrentSize();
        if (newSize && !isNaN(newSize.h) && !isNaN(newSize.w)) {
            this.events.clearMouseCache();
            var oldSize = this.getSize();
            if (oldSize == null) {
                this.size = oldSize = newSize;
            }
            if (!newSize.equals(oldSize)) {
                this.size = newSize;
                for (var i = 0, len = this.layers.length; i < len; i++) {
                    this.layers[i].onMapResize();
                }
                var center = this.getCachedCenter();
                if (this.baseLayer != null && center != null) {
                    var zoom = this.getZoom();
                    this.zoom = null;
                    this.setCenter(center, zoom);
                }
            }
        }
    },
    getCurrentSize: function () {
        var size = new OpenLayers.Size(this.div.clientWidth, this.div.clientHeight);
        if (size.w == 0 && size.h == 0 || isNaN(size.w) && isNaN(size.h)) {
            size.w = this.div.offsetWidth;
            size.h = this.div.offsetHeight;
        }
        if (size.w == 0 && size.h == 0 || isNaN(size.w) && isNaN(size.h)) {
            size.w = parseInt(this.div.style.width);
            size.h = parseInt(this.div.style.height);
        }
        return size;
    },
    calculateBounds: function (center, resolution) {
        var extent = null;
        if (center == null) {
            center = this.getCachedCenter();
        }
        if (resolution == null) {
            resolution = this.getResolution();
        }
        if ((center != null) && (resolution != null)) {
            var halfWDeg = (this.size.w * resolution) / 2;
            var halfHDeg = (this.size.h * resolution) / 2;
            extent = new OpenLayers.Bounds(center.lon - halfWDeg, center.lat - halfHDeg, center.lon + halfWDeg, center.lat + halfHDeg);
        }
        return extent;
    },
    getCenter: function () {
        var center = null;
        var cachedCenter = this.getCachedCenter();
        if (cachedCenter) {
            center = cachedCenter.clone();
        }
        return center;
    },
    getCachedCenter: function () {
        if (!this.center && this.size) {
            this.center = this.getLonLatFromViewPortPx({
                x: this.size.w / 2,
                y: this.size.h / 2
            });
        }
        return this.center;
    },
    getZoom: function () {
        return this.zoom;
    },
    pan: function (dx, dy, options) {
        options = OpenLayers.Util.applyDefaults(options, {
            animate: true,
            dragging: false
        });
        if (options.dragging) {
            if (dx != 0 || dy != 0) {
                this.moveByPx(dx, dy);
            }
        } else {
            var centerPx = this.getViewPortPxFromLonLat(this.getCachedCenter());
            var newCenterPx = centerPx.add(dx, dy);
            if (this.dragging || !newCenterPx.equals(centerPx)) {
                var newCenterLonLat = this.getLonLatFromViewPortPx(newCenterPx);
                if (options.animate) {
                    this.panTo(newCenterLonLat);
                } else {
                    this.moveTo(newCenterLonLat);
                    if (this.dragging) {
                        this.dragging = false;
                        this.events.triggerEvent("moveend");
                    }
                }
            }
        }
    },
    panTo: function (lonlat) {
        if (this.panMethod && this.getExtent().scale(this.panRatio).containsLonLat(lonlat)) {
            if (!this.panTween) {
                this.panTween = new OpenLayers.Tween(this.panMethod);
            }
            var center = this.getCachedCenter();
            if (lonlat.equals(center)) {
                return;
            }
            var from = this.getPixelFromLonLat(center);
            var to = this.getPixelFromLonLat(lonlat);
            var vector = {
                x: to.x - from.x,
                y: to.y - from.y
            };
            var last = {
                x: 0,
                y: 0
            };
            this.panTween.start({
                x: 0,
                y: 0
            }, vector, this.panDuration, {
                callbacks: {
                    eachStep: OpenLayers.Function.bind(function (px) {
                        var x = px.x - last.x,
                            y = px.y - last.y;
                        this.moveByPx(x, y);
                        last.x = Math.round(px.x);
                        last.y = Math.round(px.y);
                    }, this),
                    done: OpenLayers.Function.bind(function (px) {
                        this.moveTo(lonlat);
                        this.dragging = false;
                        this.events.triggerEvent("moveend");
                    }, this)
                }
            });
        } else {
            this.setCenter(lonlat);
        }
    },
    setCenter: function (lonlat, zoom, dragging, forceZoomChange) {
        this.panTween && this.panTween.stop();
        this.moveTo(lonlat, zoom, {
            'dragging': dragging,
            'forceZoomChange': forceZoomChange
        });
    },
    moveByPx: function (dx, dy) {
        var hw = this.size.w / 2;
        var hh = this.size.h / 2;
        var x = hw + dx;
        var y = hh + dy;
        var wrapDateLine = this.baseLayer.wrapDateLine;
        var xRestriction = 0;
        var yRestriction = 0;
        if (this.restrictedExtent) {
            xRestriction = hw;
            yRestriction = hh;
            wrapDateLine = false;
        }
        dx = wrapDateLine || x <= this.maxPx.x - xRestriction && x >= this.minPx.x + xRestriction ? Math.round(dx) : 0;
        dy = y <= this.maxPx.y - yRestriction && y >= this.minPx.y + yRestriction ? Math.round(dy) : 0;
        if (dx || dy) {
            if (!this.dragging) {
                this.dragging = true;
                this.events.triggerEvent("movestart");
            }
            this.center = null;
            if (dx) {
                this.layerContainerDiv.style.left = parseInt(this.layerContainerDiv.style.left) - dx + "px";
                this.minPx.x -= dx;
                this.maxPx.x -= dx;
            }
            if (dy) {
                this.layerContainerDiv.style.top = parseInt(this.layerContainerDiv.style.top) - dy + "px";
                this.minPx.y -= dy;
                this.maxPx.y -= dy;
            }
            var layer, i, len;
            for (i = 0, len = this.layers.length; i < len; ++i) {
                layer = this.layers[i];
                if (layer.visibility && (layer === this.baseLayer || layer.inRange)) {
                    layer.moveByPx(dx, dy);
                    layer.events.triggerEvent("move");
                }
            }
            this.events.triggerEvent("move");
        }
    },
    adjustZoom: function (zoom) {
        var resolution, resolutions = this.baseLayer.resolutions,
            maxResolution = this.getMaxExtent().getWidth() / this.size.w;
        if (this.getResolutionForZoom(zoom) > maxResolution) {
            for (var i = zoom | 0, ii = resolutions.length; i < ii; ++i) {
                if (resolutions[i] <= maxResolution) {
                    zoom = i;
                    break;
                }
            }
        }
        return zoom;
    },
    moveTo: function (lonlat, zoom, options) {
        if (lonlat != null && !(lonlat instanceof OpenLayers.LonLat)) {
            lonlat = new OpenLayers.LonLat(lonlat);
        }
        if (!options) {
            options = {};
        }
        if (zoom != null) {
            zoom = parseFloat(zoom);
            if (!this.fractionalZoom) {
                zoom = Math.round(zoom);
            }
        }
        if (this.baseLayer.wrapDateLine) {
            var requestedZoom = zoom;
            zoom = this.adjustZoom(zoom);
            if (zoom !== requestedZoom) {
                lonlat = this.getCenter();
            }
        }
        var dragging = options.dragging || this.dragging;
        var forceZoomChange = options.forceZoomChange;
        if (!this.getCachedCenter() && !this.isValidLonLat(lonlat)) {
            lonlat = this.maxExtent.getCenterLonLat();
            this.center = lonlat.clone();
        }
        if (this.restrictedExtent != null) {
            if (lonlat == null) {
                lonlat = this.center;
            }
            if (zoom == null) {
                zoom = this.getZoom();
            }
            var resolution = this.getResolutionForZoom(zoom);
            var extent = this.calculateBounds(lonlat, resolution);
            if (!this.restrictedExtent.containsBounds(extent)) {
                var maxCenter = this.restrictedExtent.getCenterLonLat();
                if (extent.getWidth() > this.restrictedExtent.getWidth()) {
                    lonlat = new OpenLayers.LonLat(maxCenter.lon, lonlat.lat);
                } else if (extent.left < this.restrictedExtent.left) {
                    lonlat = lonlat.add(this.restrictedExtent.left -
                        extent.left, 0);
                } else if (extent.right > this.restrictedExtent.right) {
                    lonlat = lonlat.add(this.restrictedExtent.right -
                        extent.right, 0);
                }
                if (extent.getHeight() > this.restrictedExtent.getHeight()) {
                    lonlat = new OpenLayers.LonLat(lonlat.lon, maxCenter.lat);
                } else if (extent.bottom < this.restrictedExtent.bottom) {
                    lonlat = lonlat.add(0, this.restrictedExtent.bottom -
                        extent.bottom);
                } else if (extent.top > this.restrictedExtent.top) {
                    lonlat = lonlat.add(0, this.restrictedExtent.top -
                        extent.top);
                }
            }
        }
        var zoomChanged = forceZoomChange || ((this.isValidZoomLevel(zoom)) && (zoom != this.getZoom()));
        var centerChanged = (this.isValidLonLat(lonlat)) && (!lonlat.equals(this.center));
        if (zoomChanged || centerChanged || dragging) {
            dragging || this.events.triggerEvent("movestart");
            if (centerChanged) {
                if (!zoomChanged && this.center) {
                    this.centerLayerContainer(lonlat);
                }
                this.center = lonlat.clone();
            }
            var res = zoomChanged ? this.getResolutionForZoom(zoom) : this.getResolution();
            if (zoomChanged || this.layerContainerOrigin == null) {
                this.layerContainerOrigin = this.getCachedCenter();
                this.layerContainerDiv.style.left = "0px";
                this.layerContainerDiv.style.top = "0px";
                var maxExtent = this.getMaxExtent({
                    restricted: true
                });
                var maxExtentCenter = maxExtent.getCenterLonLat();
                var lonDelta = this.center.lon - maxExtentCenter.lon;
                var latDelta = maxExtentCenter.lat - this.center.lat;
                var extentWidth = Math.round(maxExtent.getWidth() / res);
                var extentHeight = Math.round(maxExtent.getHeight() / res);
                this.minPx = {
                    x: (this.size.w - extentWidth) / 2 - lonDelta / res,
                    y: (this.size.h - extentHeight) / 2 - latDelta / res
                };
                this.maxPx = {
                    x: this.minPx.x + Math.round(maxExtent.getWidth() / res),
                    y: this.minPx.y + Math.round(maxExtent.getHeight() / res)
                };
            }
            if (zoomChanged) {
                this.zoom = zoom;
                this.resolution = res;
            }
            var bounds = this.getExtent();
            if (this.baseLayer.visibility) {
                this.baseLayer.moveTo(bounds, zoomChanged, options.dragging);
                options.dragging || this.baseLayer.events.triggerEvent("moveend", {
                    zoomChanged: zoomChanged
                });
            }
            bounds = this.baseLayer.getExtent();
            for (var i = this.layers.length - 1; i >= 0; --i) {
                var layer = this.layers[i];
                if (layer !== this.baseLayer && !layer.isBaseLayer) {
                    var inRange = layer.calculateInRange();
                    if (layer.inRange != inRange) {
                        layer.inRange = inRange;
                        if (!inRange) {
                            layer.display(false);
                        }
                        this.events.triggerEvent("changelayer", {
                            layer: layer,
                            property: "visibility"
                        });
                    }
                    if (inRange && layer.visibility) {
                        layer.moveTo(bounds, zoomChanged, options.dragging);
                        options.dragging || layer.events.triggerEvent("moveend", {
                            zoomChanged: zoomChanged
                        });
                    }
                }
            }
            this.events.triggerEvent("move");
            dragging || this.events.triggerEvent("moveend");
            if (zoomChanged) {
                for (var i = 0, len = this.popups.length; i < len; i++) {
                    this.popups[i].updatePosition();
                }
                this.events.triggerEvent("zoomend");
            }
        }
    },
    centerLayerContainer: function (lonlat) {
        var originPx = this.getViewPortPxFromLonLat(this.layerContainerOrigin);
        var newPx = this.getViewPortPxFromLonLat(lonlat);
        if ((originPx != null) && (newPx != null)) {
            var oldLeft = parseInt(this.layerContainerDiv.style.left);
            var oldTop = parseInt(this.layerContainerDiv.style.top);
            var newLeft = Math.round(originPx.x - newPx.x);
            var newTop = Math.round(originPx.y - newPx.y);
            this.layerContainerDiv.style.left = newLeft + "px";
            this.layerContainerDiv.style.top = newTop + "px";
            var dx = oldLeft - newLeft;
            var dy = oldTop - newTop;
            this.minPx.x -= dx;
            this.maxPx.x -= dx;
            this.minPx.y -= dy;
            this.maxPx.y -= dy;
        }
    },
    isValidZoomLevel: function (zoomLevel) {
        return ((zoomLevel != null) && (zoomLevel >= 0) && (zoomLevel < this.getNumZoomLevels()));
    },
    isValidLonLat: function (lonlat) {
        var valid = false;
        if (lonlat != null) {
            var maxExtent = this.getMaxExtent();
            var worldBounds = this.baseLayer.wrapDateLine && maxExtent;
            valid = maxExtent.containsLonLat(lonlat, {
                worldBounds: worldBounds
            });
        }
        return valid;
    },
    getProjection: function () {
        var projection = this.getProjectionObject();
        return projection ? projection.getCode() : null;
    },
    getProjectionObject: function () {
        var projection = null;
        if (this.baseLayer != null) {
            projection = this.baseLayer.projection;
        }
        return projection;
    },
    getMaxResolution: function () {
        var maxResolution = null;
        if (this.baseLayer != null) {
            maxResolution = this.baseLayer.maxResolution;
        }
        return maxResolution;
    },
    getMaxExtent: function (options) {
        var maxExtent = null;
        if (options && options.restricted && this.restrictedExtent) {
            maxExtent = this.restrictedExtent;
        } else if (this.baseLayer != null) {
            maxExtent = this.baseLayer.maxExtent;
        }
        return maxExtent;
    },
    getNumZoomLevels: function () {
        var numZoomLevels = null;
        if (this.baseLayer != null) {
            numZoomLevels = this.baseLayer.numZoomLevels;
        }
        return numZoomLevels;
    },
    getExtent: function () {
        var extent = null;
        if (this.baseLayer != null) {
            extent = this.baseLayer.getExtent();
        }
        return extent;
    },
    getResolution: function () {
        var resolution = null;
        if (this.baseLayer != null) {
            resolution = this.baseLayer.getResolution();
        } else if (this.allOverlays === true && this.layers.length > 0) {
            resolution = this.layers[0].getResolution();
        }
        return resolution;
    },
    getUnits: function () {
        var units = null;
        if (this.baseLayer != null) {
            units = this.baseLayer.units;
        }
        return units;
    },
    getScale: function () {
        var scale = null;
        if (this.baseLayer != null) {
            var res = this.getResolution();
            var units = this.baseLayer.units;
            scale = OpenLayers.Util.getScaleFromResolution(res, units);
        }
        return scale;
    },
    getZoomForExtent: function (bounds, closest) {
        var zoom = null;
        if (this.baseLayer != null) {
            zoom = this.baseLayer.getZoomForExtent(bounds, closest);
        }
        return zoom;
    },
    getResolutionForZoom: function (zoom) {
        var resolution = null;
        if (this.baseLayer) {
            resolution = this.baseLayer.getResolutionForZoom(zoom);
        }
        return resolution;
    },
    getZoomForResolution: function (resolution, closest) {
        var zoom = null;
        if (this.baseLayer != null) {
            zoom = this.baseLayer.getZoomForResolution(resolution, closest);
        }
        return zoom;
    },
    zoomTo: function (zoom) {
        if (this.isValidZoomLevel(zoom)) {
            this.setCenter(null, zoom);
        }
    },
    zoomIn: function () {
        this.zoomTo(this.getZoom() + 1);
    },
    zoomOut: function () {
        this.zoomTo(this.getZoom() - 1);
    },
    zoomToExtent: function (bounds, closest) {
        if (!(bounds instanceof OpenLayers.Bounds)) {
            bounds = new OpenLayers.Bounds(bounds);
        }
        var center = bounds.getCenterLonLat();
        if (this.baseLayer.wrapDateLine) {
            var maxExtent = this.getMaxExtent();
            bounds = bounds.clone();
            while (bounds.right < bounds.left) {
                bounds.right += maxExtent.getWidth();
            }
            center = bounds.getCenterLonLat().wrapDateLine(maxExtent);
        }
        this.setCenter(center, this.getZoomForExtent(bounds, closest));
    },
    zoomToMaxExtent: function (options) {
        var restricted = (options) ? options.restricted : true;
        var maxExtent = this.getMaxExtent({
            'restricted': restricted
        });
        this.zoomToExtent(maxExtent);
    },
    zoomToScale: function (scale, closest) {
        var res = OpenLayers.Util.getResolutionFromScale(scale, this.baseLayer.units);
        var halfWDeg = (this.size.w * res) / 2;
        var halfHDeg = (this.size.h * res) / 2;
        var center = this.getCachedCenter();
        var extent = new OpenLayers.Bounds(center.lon - halfWDeg, center.lat - halfHDeg, center.lon + halfWDeg, center.lat + halfHDeg);
        this.zoomToExtent(extent, closest);
    },
    getLonLatFromViewPortPx: function (viewPortPx) {
        var lonlat = null;
        if (this.baseLayer != null) {
            lonlat = this.baseLayer.getLonLatFromViewPortPx(viewPortPx);
        }
        return lonlat;
    },
    getViewPortPxFromLonLat: function (lonlat) {
        var px = null;
        if (this.baseLayer != null) {
            px = this.baseLayer.getViewPortPxFromLonLat(lonlat);
        }
        return px;
    },
    getLonLatFromPixel: function (px) {
        return this.getLonLatFromViewPortPx(px);
    },
    getPixelFromLonLat: function (lonlat) {
        var px = this.getViewPortPxFromLonLat(lonlat);
        px.x = Math.round(px.x);
        px.y = Math.round(px.y);
        return px;
    },
    getGeodesicPixelSize: function (px) {
        var lonlat = px ? this.getLonLatFromPixel(px) : (this.getCachedCenter() || new OpenLayers.LonLat(0, 0));
        var res = this.getResolution();
        var left = lonlat.add(-res / 2, 0);
        var right = lonlat.add(res / 2, 0);
        var bottom = lonlat.add(0, -res / 2);
        var top = lonlat.add(0, res / 2);
        var dest = new OpenLayers.Projection("EPSG:4326");
        var source = this.getProjectionObject() || dest;
        if (!source.equals(dest)) {
            left.transform(source, dest);
            right.transform(source, dest);
            bottom.transform(source, dest);
            top.transform(source, dest);
        }
        return new OpenLayers.Size(OpenLayers.Util.distVincenty(left, right), OpenLayers.Util.distVincenty(bottom, top));
    },
    getViewPortPxFromLayerPx: function (layerPx) {
        var viewPortPx = null;
        if (layerPx != null) {
            var dX = parseInt(this.layerContainerDiv.style.left);
            var dY = parseInt(this.layerContainerDiv.style.top);
            viewPortPx = layerPx.add(dX, dY);
        }
        return viewPortPx;
    },
    getLayerPxFromViewPortPx: function (viewPortPx) {
        var layerPx = null;
        if (viewPortPx != null) {
            var dX = -parseInt(this.layerContainerDiv.style.left);
            var dY = -parseInt(this.layerContainerDiv.style.top);
            layerPx = viewPortPx.add(dX, dY);
            if (isNaN(layerPx.x) || isNaN(layerPx.y)) {
                layerPx = null;
            }
        }
        return layerPx;
    },
    getLonLatFromLayerPx: function (px) {
        px = this.getViewPortPxFromLayerPx(px);
        return this.getLonLatFromViewPortPx(px);
    },
    getLayerPxFromLonLat: function (lonlat) {
        var px = this.getPixelFromLonLat(lonlat);
        return this.getLayerPxFromViewPortPx(px);
    },
    CLASS_NAME: "OpenLayers.Map"
});
OpenLayers.Map.TILE_WIDTH = 256;
OpenLayers.Map.TILE_HEIGHT = 256;
OpenLayers.Layer = OpenLayers.Class({
    id: null,
    name: null,
    div: null,
    opacity: 1,
    alwaysInRange: null,
    RESOLUTION_PROPERTIES: ['scales', 'resolutions', 'maxScale', 'minScale', 'maxResolution', 'minResolution', 'numZoomLevels', 'maxZoomLevel'],
    events: null,
    map: null,
    isBaseLayer: false,
    alpha: false,
    displayInLayerSwitcher: true,
    visibility: true,
    attribution: null,
    inRange: false,
    imageSize: null,
    options: null,
    eventListeners: null,
    gutter: 0,
    projection: null,
    units: null,
    scales: null,
    resolutions: null,
    maxExtent: null,
    minExtent: null,
    maxResolution: null,
    minResolution: null,
    numZoomLevels: null,
    minScale: null,
    maxScale: null,
    displayOutsideMaxExtent: false,
    wrapDateLine: false,
    metadata: null,
    initialize: function (name, options) {
        this.metadata = {};
        this.addOptions(options);
        this.name = name;
        if (this.id == null) {
            this.id = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_");
            this.div = OpenLayers.Util.createDiv(this.id);
            this.div.style.width = "100%";
            this.div.style.height = "100%";
            this.div.dir = "ltr";
            this.events = new OpenLayers.Events(this, this.div);
            if (this.eventListeners instanceof Object) {
                this.events.on(this.eventListeners);
            }
        }
    },
    destroy: function (setNewBaseLayer) {
        if (setNewBaseLayer == null) {
            setNewBaseLayer = true;
        }
        if (this.map != null) {
            this.map.removeLayer(this, setNewBaseLayer);
        }
        this.projection = null;
        this.map = null;
        this.name = null;
        this.div = null;
        this.options = null;
        if (this.events) {
            if (this.eventListeners) {
                this.events.un(this.eventListeners);
            }
            this.events.destroy();
        }
        this.eventListeners = null;
        this.events = null;
    },
    clone: function (obj) {
        if (obj == null) {
            obj = new OpenLayers.Layer(this.name, this.getOptions());
        }
        OpenLayers.Util.applyDefaults(obj, this);
        obj.map = null;
        return obj;
    },
    getOptions: function () {
        var options = {};
        for (var o in this.options) {
            options[o] = this[o];
        }
        return options;
    },
    setName: function (newName) {
        if (newName != this.name) {
            this.name = newName;
            if (this.map != null) {
                this.map.events.triggerEvent("changelayer", {
                    layer: this,
                    property: "name"
                });
            }
        }
    },
    addOptions: function (newOptions, reinitialize) {
        if (this.options == null) {
            this.options = {};
        }
        if (newOptions) {
            if (typeof newOptions.projection == "string") {
                newOptions.projection = new OpenLayers.Projection(newOptions.projection);
            }
            if (newOptions.projection) {
                OpenLayers.Util.applyDefaults(newOptions, OpenLayers.Projection.defaults[newOptions.projection.getCode()]);
            }
            if (newOptions.maxExtent && !(newOptions.maxExtent instanceof OpenLayers.Bounds)) {
                newOptions.maxExtent = new OpenLayers.Bounds(newOptions.maxExtent);
            }
            if (newOptions.minExtent && !(newOptions.minExtent instanceof OpenLayers.Bounds)) {
                newOptions.minExtent = new OpenLayers.Bounds(newOptions.minExtent);
            }
        }
        OpenLayers.Util.extend(this.options, newOptions);
        OpenLayers.Util.extend(this, newOptions);
        if (this.projection && this.projection.getUnits()) {
            this.units = this.projection.getUnits();
        }
        if (this.map) {
            var resolution = this.map.getResolution();
            var properties = this.RESOLUTION_PROPERTIES.concat(["projection", "units", "minExtent", "maxExtent"]);
            for (var o in newOptions) {
                if (newOptions.hasOwnProperty(o) && OpenLayers.Util.indexOf(properties, o) >= 0) {
                    this.initResolutions();
                    if (reinitialize && this.map.baseLayer === this) {
                        this.map.setCenter(this.map.getCenter(), this.map.getZoomForResolution(resolution), false, true);
                        this.map.events.triggerEvent("changebaselayer", {
                            layer: this
                        });
                    }
                    break;
                }
            }
        }
    },
    onMapResize: function () {},
    redraw: function () {
        var redrawn = false;
        if (this.map) {
            this.inRange = this.calculateInRange();
            var extent = this.getExtent();
            if (extent && this.inRange && this.visibility) {
                var zoomChanged = true;
                this.moveTo(extent, zoomChanged, false);
                this.events.triggerEvent("moveend", {
                    "zoomChanged": zoomChanged
                });
                redrawn = true;
            }
        }
        return redrawn;
    },
    moveTo: function (bounds, zoomChanged, dragging) {
        var display = this.visibility;
        if (!this.isBaseLayer) {
            display = display && this.inRange;
        }
        this.display(display);
    },
    moveByPx: function (dx, dy) {},
    setMap: function (map) {
        if (this.map == null) {
            this.map = map;
            this.maxExtent = this.maxExtent || this.map.maxExtent;
            this.minExtent = this.minExtent || this.map.minExtent;
            this.projection = this.projection || this.map.projection;
            if (typeof this.projection == "string") {
                this.projection = new OpenLayers.Projection(this.projection);
            }
            this.units = this.projection.getUnits() || this.units || this.map.units;
            this.initResolutions();
            if (!this.isBaseLayer) {
                this.inRange = this.calculateInRange();
                var show = ((this.visibility) && (this.inRange));
                this.div.style.display = show ? "" : "none";
            }
            this.setTileSize();
        }
    },
    afterAdd: function () {},
    removeMap: function (map) {},
    getImageSize: function (bounds) {
        return (this.imageSize || this.tileSize);
    },
    setTileSize: function (size) {
        var tileSize = (size) ? size : ((this.tileSize) ? this.tileSize : this.map.getTileSize());
        this.tileSize = tileSize;
        if (this.gutter) {
            this.imageSize = new OpenLayers.Size(tileSize.w + (2 * this.gutter), tileSize.h + (2 * this.gutter));
        }
    },
    getVisibility: function () {
        return this.visibility;
    },
    setVisibility: function (visibility) {
        if (visibility != this.visibility) {
            this.visibility = visibility;
            this.display(visibility);
            this.redraw();
            if (this.map != null) {
                this.map.events.triggerEvent("changelayer", {
                    layer: this,
                    property: "visibility"
                });
            }
            this.events.triggerEvent("visibilitychanged");
        }
    },
    display: function (display) {
        if (display != (this.div.style.display != "none")) {
            this.div.style.display = (display && this.calculateInRange()) ? "block" : "none";
        }
    },
    calculateInRange: function () {
        var inRange = false;
        if (this.alwaysInRange) {
            inRange = true;
        } else {
            if (this.map) {
                var resolution = this.map.getResolution();
                inRange = ((resolution >= this.minResolution) && (resolution <= this.maxResolution));
            }
        }
        return inRange;
    },
    setIsBaseLayer: function (isBaseLayer) {
        if (isBaseLayer != this.isBaseLayer) {
            this.isBaseLayer = isBaseLayer;
            if (this.map != null) {
                this.map.events.triggerEvent("changebaselayer", {
                    layer: this
                });
            }
        }
    },
    initResolutions: function () {
        var i, len, p;
        var props = {}, alwaysInRange = true;
        for (i = 0, len = this.RESOLUTION_PROPERTIES.length; i < len; i++) {
            p = this.RESOLUTION_PROPERTIES[i];
            props[p] = this.options[p];
            if (alwaysInRange && this.options[p]) {
                alwaysInRange = false;
            }
        }
        if (this.alwaysInRange == null) {
            this.alwaysInRange = alwaysInRange;
        }
        if (props.resolutions == null) {
            props.resolutions = this.resolutionsFromScales(props.scales);
        }
        if (props.resolutions == null) {
            props.resolutions = this.calculateResolutions(props);
        }
        if (props.resolutions == null) {
            for (i = 0, len = this.RESOLUTION_PROPERTIES.length; i < len; i++) {
                p = this.RESOLUTION_PROPERTIES[i];
                props[p] = this.options[p] != null ? this.options[p] : this.map[p];
            }
            if (props.resolutions == null) {
                props.resolutions = this.resolutionsFromScales(props.scales);
            }
            if (props.resolutions == null) {
                props.resolutions = this.calculateResolutions(props);
            }
        }
        var maxResolution;
        if (this.options.maxResolution && this.options.maxResolution !== "auto") {
            maxResolution = this.options.maxResolution;
        }
        if (this.options.minScale) {
            maxResolution = OpenLayers.Util.getResolutionFromScale(this.options.minScale, this.units);
        }
        var minResolution;
        if (this.options.minResolution && this.options.minResolution !== "auto") {
            minResolution = this.options.minResolution;
        }
        if (this.options.maxScale) {
            minResolution = OpenLayers.Util.getResolutionFromScale(this.options.maxScale, this.units);
        }
        if (props.resolutions) {
            props.resolutions.sort(function (a, b) {
                return (b - a);
            });
            if (!maxResolution) {
                maxResolution = props.resolutions[0];
            }
            if (!minResolution) {
                var lastIdx = props.resolutions.length - 1;
                minResolution = props.resolutions[lastIdx];
            }
        }
        this.resolutions = props.resolutions;
        if (this.resolutions) {
            len = this.resolutions.length;
            this.scales = new Array(len);
            for (i = 0; i < len; i++) {
                this.scales[i] = OpenLayers.Util.getScaleFromResolution(this.resolutions[i], this.units);
            }
            this.numZoomLevels = len;
        }
        this.minResolution = minResolution;
        if (minResolution) {
            this.maxScale = OpenLayers.Util.getScaleFromResolution(minResolution, this.units);
        }
        this.maxResolution = maxResolution;
        if (maxResolution) {
            this.minScale = OpenLayers.Util.getScaleFromResolution(maxResolution, this.units);
        }
    },
    resolutionsFromScales: function (scales) {
        if (scales == null) {
            return;
        }
        var resolutions, i, len;
        len = scales.length;
        resolutions = new Array(len);
        for (i = 0; i < len; i++) {
            resolutions[i] = OpenLayers.Util.getResolutionFromScale(scales[i], this.units);
        }
        return resolutions;
    },
    calculateResolutions: function (props) {
        var viewSize, wRes, hRes;
        var maxResolution = props.maxResolution;
        if (props.minScale != null) {
            maxResolution = OpenLayers.Util.getResolutionFromScale(props.minScale, this.units);
        } else if (maxResolution == "auto" && this.maxExtent != null) {
            viewSize = this.map.getSize();
            wRes = this.maxExtent.getWidth() / viewSize.w;
            hRes = this.maxExtent.getHeight() / viewSize.h;
            maxResolution = Math.max(wRes, hRes);
        }
        var minResolution = props.minResolution;
        if (props.maxScale != null) {
            minResolution = OpenLayers.Util.getResolutionFromScale(props.maxScale, this.units);
        } else if (props.minResolution == "auto" && this.minExtent != null) {
            viewSize = this.map.getSize();
            wRes = this.minExtent.getWidth() / viewSize.w;
            hRes = this.minExtent.getHeight() / viewSize.h;
            minResolution = Math.max(wRes, hRes);
        }
        if (typeof maxResolution !== "number" && typeof minResolution !== "number" && this.maxExtent != null) {
            var tileSize = this.map.getTileSize();
            maxResolution = Math.max(this.maxExtent.getWidth() / tileSize.w, this.maxExtent.getHeight() / tileSize.h);
        }
        var maxZoomLevel = props.maxZoomLevel;
        var numZoomLevels = props.numZoomLevels;
        if (typeof minResolution === "number" && typeof maxResolution === "number" && numZoomLevels === undefined) {
            var ratio = maxResolution / minResolution;
            numZoomLevels = Math.floor(Math.log(ratio) / Math.log(2)) + 1;
        } else if (numZoomLevels === undefined && maxZoomLevel != null) {
            numZoomLevels = maxZoomLevel + 1;
        }
        if (typeof numZoomLevels !== "number" || numZoomLevels <= 0 || (typeof maxResolution !== "number" && typeof minResolution !== "number")) {
            return;
        }
        var resolutions = new Array(numZoomLevels);
        var base = 2;
        if (typeof minResolution == "number" && typeof maxResolution == "number") {
            base = Math.pow((maxResolution / minResolution), (1 / (numZoomLevels - 1)));
        }
        var i;
        if (typeof maxResolution === "number") {
            for (i = 0; i < numZoomLevels; i++) {
                resolutions[i] = maxResolution / Math.pow(base, i);
            }
        } else {
            for (i = 0; i < numZoomLevels; i++) {
                resolutions[numZoomLevels - 1 - i] = minResolution * Math.pow(base, i);
            }
        }
        return resolutions;
    },
    getResolution: function () {
        var zoom = this.map.getZoom();
        return this.getResolutionForZoom(zoom);
    },
    getExtent: function () {
        return this.map.calculateBounds();
    },
    getZoomForExtent: function (extent, closest) {
        var viewSize = this.map.getSize();
        var idealResolution = Math.max(extent.getWidth() / viewSize.w, extent.getHeight() / viewSize.h);
        return this.getZoomForResolution(idealResolution, closest);
    },
    getDataExtent: function () {},
    getResolutionForZoom: function (zoom) {
        zoom = Math.max(0, Math.min(zoom, this.resolutions.length - 1));
        var resolution;
        if (this.map.fractionalZoom) {
            var low = Math.floor(zoom);
            var high = Math.ceil(zoom);
            resolution = this.resolutions[low] -
                ((zoom - low) * (this.resolutions[low] - this.resolutions[high]));
        } else {
            resolution = this.resolutions[Math.round(zoom)];
        }
        return resolution;
    },
    getZoomForResolution: function (resolution, closest) {
        var zoom, i, len;
        if (this.map.fractionalZoom) {
            var lowZoom = 0;
            var highZoom = this.resolutions.length - 1;
            var highRes = this.resolutions[lowZoom];
            var lowRes = this.resolutions[highZoom];
            var res;
            for (i = 0, len = this.resolutions.length; i < len; ++i) {
                res = this.resolutions[i];
                if (res >= resolution) {
                    highRes = res;
                    lowZoom = i;
                }
                if (res <= resolution) {
                    lowRes = res;
                    highZoom = i;
                    break;
                }
            }
            var dRes = highRes - lowRes;
            if (dRes > 0) {
                zoom = lowZoom + ((highRes - resolution) / dRes);
            } else {
                zoom = lowZoom;
            }
        } else {
            var diff;
            var minDiff = Number.POSITIVE_INFINITY;
            for (i = 0, len = this.resolutions.length; i < len; i++) {
                if (closest) {
                    diff = Math.abs(this.resolutions[i] - resolution);
                    if (diff > minDiff) {
                        break;
                    }
                    minDiff = diff;
                } else {
                    if (this.resolutions[i] < resolution) {
                        break;
                    }
                }
            }
            zoom = Math.max(0, i - 1);
        }
        return zoom;
    },
    getLonLatFromViewPortPx: function (viewPortPx) {
        var lonlat = null;
        var map = this.map;
        if (viewPortPx != null && map.minPx) {
            var res = map.getResolution();
            var maxExtent = map.getMaxExtent({
                restricted: true
            });
            var lon = (viewPortPx.x - map.minPx.x) * res + maxExtent.left;
            var lat = (map.minPx.y - viewPortPx.y) * res + maxExtent.top;
            lonlat = new OpenLayers.LonLat(lon, lat);
            if (this.wrapDateLine) {
                lonlat = lonlat.wrapDateLine(this.maxExtent);
            }
        }
        return lonlat;
    },
    getViewPortPxFromLonLat: function (lonlat, resolution) {
        var px = null;
        if (lonlat != null) {
            resolution = resolution || this.map.getResolution();
            var extent = this.map.calculateBounds(null, resolution);
            px = new OpenLayers.Pixel((1 / resolution * (lonlat.lon - extent.left)), (1 / resolution * (extent.top - lonlat.lat)));
        }
        return px;
    },
    setOpacity: function (opacity) {
        if (opacity != this.opacity) {
            this.opacity = opacity;
            var childNodes = this.div.childNodes;
            for (var i = 0, len = childNodes.length; i < len; ++i) {
                var element = childNodes[i].firstChild || childNodes[i];
                var lastChild = childNodes[i].lastChild;
                if (lastChild && lastChild.nodeName.toLowerCase() === "iframe") {
                    element = lastChild.parentNode;
                }
                OpenLayers.Util.modifyDOMElement(element, null, null, null, null, null, null, opacity);
            }
            if (this.map != null) {
                this.map.events.triggerEvent("changelayer", {
                    layer: this,
                    property: "opacity"
                });
            }
        }
    },
    getZIndex: function () {
        return this.div.style.zIndex;
    },
    setZIndex: function (zIndex) {
        this.div.style.zIndex = zIndex;
    },
    adjustBounds: function (bounds) {
        if (this.gutter) {
            var mapGutter = this.gutter * this.map.getResolution();
            bounds = new OpenLayers.Bounds(bounds.left - mapGutter, bounds.bottom - mapGutter, bounds.right + mapGutter, bounds.top + mapGutter);
        }
        if (this.wrapDateLine) {
            var wrappingOptions = {
                'rightTolerance': this.getResolution(),
                'leftTolerance': this.getResolution()
            };
            bounds = bounds.wrapDateLine(this.maxExtent, wrappingOptions);
        }
        return bounds;
    },
    CLASS_NAME: "OpenLayers.Layer"
});
OpenLayers.Layer.HTTPRequest = OpenLayers.Class(OpenLayers.Layer, {
    URL_HASH_FACTOR: (Math.sqrt(5) - 1) / 2,
    url: null,
    params: null,
    reproject: false,
    initialize: function (name, url, params, options) {
        OpenLayers.Layer.prototype.initialize.apply(this, [name, options]);
        this.url = url;
        if (!this.params) {
            this.params = OpenLayers.Util.extend({}, params);
        }
    },
    destroy: function () {
        this.url = null;
        this.params = null;
        OpenLayers.Layer.prototype.destroy.apply(this, arguments);
    },
    clone: function (obj) {
        if (obj == null) {
            obj = new OpenLayers.Layer.HTTPRequest(this.name, this.url, this.params, this.getOptions());
        }
        obj = OpenLayers.Layer.prototype.clone.apply(this, [obj]);
        return obj;
    },
    setUrl: function (newUrl) {
        this.url = newUrl;
    },
    mergeNewParams: function (newParams) {
        this.params = OpenLayers.Util.extend(this.params, newParams);
        var ret = this.redraw();
        if (this.map != null) {
            this.map.events.triggerEvent("changelayer", {
                layer: this,
                property: "params"
            });
        }
        return ret;
    },
    redraw: function (force) {
        if (force) {
            return this.mergeNewParams({
                "_olSalt": Math.random()
            });
        } else {
            return OpenLayers.Layer.prototype.redraw.apply(this, []);
        }
    },
    selectUrl: function (paramString, urls) {
        var product = 1;
        for (var i = 0, len = paramString.length; i < len; i++) {
            product *= paramString.charCodeAt(i) * this.URL_HASH_FACTOR;
            product -= Math.floor(product);
        }
        return urls[Math.floor(product * urls.length)];
    },
    getFullRequestString: function (newParams, altUrl) {
        var url = altUrl || this.url;
        var allParams = OpenLayers.Util.extend({}, this.params);
        allParams = OpenLayers.Util.extend(allParams, newParams);
        var paramsString = OpenLayers.Util.getParameterString(allParams);
        if (OpenLayers.Util.isArray(url)) {
            url = this.selectUrl(paramsString, url);
        }
        var urlParams = OpenLayers.Util.upperCaseObject(OpenLayers.Util.getParameters(url));
        for (var key in allParams) {
            if (key.toUpperCase() in urlParams) {
                delete allParams[key];
            }
        }
        paramsString = OpenLayers.Util.getParameterString(allParams);
        return OpenLayers.Util.urlAppend(url, paramsString);
    },
    CLASS_NAME: "OpenLayers.Layer.HTTPRequest"
});
OpenLayers.Tile = OpenLayers.Class({
    events: null,
    eventListeners: null,
    id: null,
    layer: null,
    url: null,
    bounds: null,
    size: null,
    position: null,
    isLoading: false,
    initialize: function (layer, position, bounds, url, size, options) {
        this.layer = layer;
        this.position = position.clone();
        this.setBounds(bounds);
        this.url = url;
        if (size) {
            this.size = size.clone();
        }
        this.id = OpenLayers.Util.createUniqueID("Tile_");
        OpenLayers.Util.extend(this, options);
        this.events = new OpenLayers.Events(this);
        if (this.eventListeners instanceof Object) {
            this.events.on(this.eventListeners);
        }
    },
    unload: function () {
        if (this.isLoading) {
            this.isLoading = false;
            this.events.triggerEvent("unload");
        }
    },
    destroy: function () {
        this.layer = null;
        this.bounds = null;
        this.size = null;
        this.position = null;
        if (this.eventListeners) {
            this.events.un(this.eventListeners);
        }
        this.events.destroy();
        this.eventListeners = null;
        this.events = null;
    },
    draw: function (deferred) {
        if (!deferred) {
            this.clear();
        }
        var draw = this.shouldDraw();
        if (draw && !deferred) {
            draw = this.events.triggerEvent("beforedraw") !== false;
        }
        return draw;
    },
    shouldDraw: function () {
        var withinMaxExtent = false,
            maxExtent = this.layer.maxExtent;
        if (maxExtent) {
            var map = this.layer.map;
            var worldBounds = map.baseLayer.wrapDateLine && map.getMaxExtent();
            if (this.bounds.intersectsBounds(maxExtent, {
                inclusive: false,
                worldBounds: worldBounds
            })) {
                withinMaxExtent = true;
            }
        }
        return withinMaxExtent || this.layer.displayOutsideMaxExtent;
    },
    setBounds: function (bounds) {
        bounds = bounds.clone();
        if (this.layer.map.baseLayer.wrapDateLine) {
            var worldExtent = this.layer.map.getMaxExtent(),
                tolerance = this.layer.map.getResolution();
            bounds = bounds.wrapDateLine(worldExtent, {
                leftTolerance: tolerance,
                rightTolerance: tolerance
            });
        }
        this.bounds = bounds;
    },
    moveTo: function (bounds, position, redraw) {
        if (redraw == null) {
            redraw = true;
        }
        this.setBounds(bounds);
        this.position = position.clone();
        if (redraw) {
            this.draw();
        }
    },
    clear: function (draw) {},
    CLASS_NAME: "OpenLayers.Tile"
});
OpenLayers.Tile.Image = OpenLayers.Class(OpenLayers.Tile, {
    url: null,
    imgDiv: null,
    frame: null,
    imageReloadAttempts: null,
    layerAlphaHack: null,
    asyncRequestId: null,
    blankImageUrl: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAQAIBRAA7",
    maxGetUrlLength: null,
    canvasContext: null,
    crossOriginKeyword: null,
    initialize: function (layer, position, bounds, url, size, options) {
        OpenLayers.Tile.prototype.initialize.apply(this, arguments);
        this.url = url;
        this.layerAlphaHack = this.layer.alpha && OpenLayers.Util.alphaHack();
        if (this.maxGetUrlLength != null || this.layer.gutter || this.layerAlphaHack) {
            this.frame = document.createElement("div");
            this.frame.style.position = "absolute";
            this.frame.style.overflow = "hidden";
        }
        if (this.maxGetUrlLength != null) {
            OpenLayers.Util.extend(this, OpenLayers.Tile.Image.IFrame);
        }
    },
    destroy: function () {
        if (this.imgDiv) {
            this.clear();
            this.imgDiv = null;
            this.frame = null;
        }
        this.asyncRequestId = null;
        OpenLayers.Tile.prototype.destroy.apply(this, arguments);
    },
    draw: function () {
        var drawn = OpenLayers.Tile.prototype.draw.apply(this, arguments);
        if (drawn) {
            if (this.layer != this.layer.map.baseLayer && this.layer.reproject) {
                this.bounds = this.getBoundsFromBaseLayer(this.position);
            }
            if (this.isLoading) {
                this._loadEvent = "reload";
            } else {
                this.isLoading = true;
                this._loadEvent = "loadstart";
            }
            this.positionTile();
            this.renderTile();
        } else {
            this.unload();
        }
        return drawn;
    },
    renderTile: function () {
        this.layer.div.appendChild(this.getTile());
        if (this.layer.async) {
            var id = this.asyncRequestId = (this.asyncRequestId || 0) + 1;
            this.layer.getURLasync(this.bounds, function (url) {
                if (id == this.asyncRequestId) {
                    this.url = url;
                    this.initImage();
                }
            }, this);
        } else {
            this.url = this.layer.getURL(this.bounds);
            this.initImage();
        }
    },
    positionTile: function () {
        var style = this.getTile().style,
            size = this.frame ? this.size : this.layer.getImageSize(this.bounds);
        style.left = this.position.x + "%";
        style.top = this.position.y + "%";
        style.width = size.w + "%";
        style.height = size.h + "%";
    },
    clear: function () {
        OpenLayers.Tile.prototype.clear.apply(this, arguments);
        var img = this.imgDiv;
        if (img) {
            OpenLayers.Event.stopObservingElement(img);
            var tile = this.getTile();
            if (tile.parentNode === this.layer.div) {
                this.layer.div.removeChild(tile);
            }
            this.setImgSrc();
            if (this.layerAlphaHack === true) {
                img.style.filter = "";
            }
            OpenLayers.Element.removeClass(img, "olImageLoadError");
        }
        this.canvasContext = null;
    },
    getImage: function () {
        if (!this.imgDiv) {
            this.imgDiv = document.createElement("img");
            this.imgDiv.className = "olTileImage";
            this.imgDiv.galleryImg = "no";
            var style = this.imgDiv.style;
            if (this.frame) {
                var left = 0,
                    top = 0;
                if (this.layer.gutter) {
                    left = this.layer.gutter / this.layer.tileSize.w * 100;
                    top = this.layer.gutter / this.layer.tileSize.h * 100;
                }
                style.left = -left + "%";
                style.top = -top + "%";
                style.width = (2 * left + 100) + "%";
                style.height = (2 * top + 100) + "%";
            }
            style.visibility = "hidden";
            style.opacity = 0;
            if (this.layer.opacity < 1) {
                style.filter = 'alpha(opacity=' +
                    (this.layer.opacity * 100) + ')';
            }
            style.position = "absolute";
            if (this.layerAlphaHack) {
                style.paddingTop = style.height;
                style.height = "0";
                style.width = "100%";
            }
            if (this.frame) {
                this.frame.appendChild(this.imgDiv);
            }
        }
        return this.imgDiv;
    },
    initImage: function () {
        this.events.triggerEvent(this._loadEvent);
        var img = this.getImage();
        if (this.url && img.getAttribute("src") == this.url) {
            this.onImageLoad();
        } else {
            var load = OpenLayers.Function.bind(function () {
                OpenLayers.Event.stopObservingElement(img);
                OpenLayers.Event.observe(img, "load", OpenLayers.Function.bind(this.onImageLoad, this));
                OpenLayers.Event.observe(img, "error", OpenLayers.Function.bind(this.onImageError, this));
                this.imageReloadAttempts = 0;
                this.setImgSrc(this.url);
            }, this);
            if (img.getAttribute("src") == this.blankImageUrl) {
                load();
            } else {
                OpenLayers.Event.observe(img, "load", load);
                OpenLayers.Event.observe(img, "error", load);
                if (this.crossOriginKeyword) {
                    img.removeAttribute("crossorigin");
                }
                img.src = this.blankImageUrl;
            }
        }
    },
    setImgSrc: function (url) {
        var img = this.imgDiv;
        img.style.visibility = 'hidden';
        img.style.opacity = 0;
        if (url) {
            if (this.crossOriginKeyword) {
                if (url.substr(0, 5) !== 'data:') {
                    img.setAttribute("crossorigin", this.crossOriginKeyword);
                } else {
                    img.removeAttribute("crossorigin");
                }
            }
            img.src = url;
        }
    },
    getTile: function () {
        return this.frame ? this.frame : this.getImage();
    },
    createBackBuffer: function () {
        if (!this.imgDiv || this.isLoading) {
            return;
        }
        var backBuffer;
        if (this.frame) {
            backBuffer = this.frame.cloneNode(false);
            backBuffer.appendChild(this.imgDiv);
        } else {
            backBuffer = this.imgDiv;
        }
        this.imgDiv = null;
        return backBuffer;
    },
    onImageLoad: function () {
        var img = this.imgDiv;
        OpenLayers.Event.stopObservingElement(img);
        img.style.visibility = 'inherit';
        img.style.opacity = this.layer.opacity;
        this.isLoading = false;
        this.canvasContext = null;
        this.events.triggerEvent("loadend");
        if (parseFloat(navigator.appVersion.split("MSIE")[1]) < 7 && this.layer && this.layer.div) {
            var span = document.createElement("span");
            span.style.display = "none";
            var layerDiv = this.layer.div;
            layerDiv.appendChild(span);
            window.setTimeout(function () {
                span.parentNode === layerDiv && span.parentNode.removeChild(span);
            }, 0);
        }
        if (this.layerAlphaHack === true) {
            img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" +
                img.src + "', sizingMethod='scale')";
        }
    },
    onImageError: function () {
        var img = this.imgDiv;
        if (img.src != null) {
            this.imageReloadAttempts++;
            if (this.imageReloadAttempts <= OpenLayers.IMAGE_RELOAD_ATTEMPTS) {
                this.setImgSrc(this.layer.getURL(this.bounds));
            } else {
                OpenLayers.Element.addClass(img, "olImageLoadError");
                this.events.triggerEvent("loaderror");
                this.onImageLoad();
            }
        }
    },
    getCanvasContext: function () {
        if (OpenLayers.CANVAS_SUPPORTED && this.imgDiv && !this.isLoading) {
            if (!this.canvasContext) {
                var canvas = document.createElement("canvas");
                canvas.width = this.size.w;
                canvas.height = this.size.h;
                this.canvasContext = canvas.getContext("2d");
                this.canvasContext.drawImage(this.imgDiv, 0, 0);
            }
            return this.canvasContext;
        }
    },
    CLASS_NAME: "OpenLayers.Tile.Image"
});
OpenLayers.Layer.Grid = OpenLayers.Class(OpenLayers.Layer.HTTPRequest, {
    tileSize: null,
    tileOriginCorner: "bl",
    tileOrigin: null,
    tileOptions: null,
    tileClass: OpenLayers.Tile.Image,
    grid: null,
    singleTile: false,
    ratio: 1.5,
    buffer: 0,
    transitionEffect: null,
    numLoadingTiles: 0,
    tileLoadingDelay: 85,
    serverResolutions: null,
    moveTimerId: null,
    deferMoveGriddedTiles: null,
    tileQueueId: null,
    tileQueue: null,
    loading: false,
    backBuffer: null,
    gridResolution: null,
    backBufferResolution: null,
    backBufferLonLat: null,
    backBufferTimerId: null,
    removeBackBufferDelay: null,
    className: null,
    initialize: function (name, url, params, options) {
        OpenLayers.Layer.HTTPRequest.prototype.initialize.apply(this, arguments);
        this.grid = [];
        this.tileQueue = [];
        if (this.removeBackBufferDelay === null) {
            this.removeBackBufferDelay = this.singleTile ? 0 : 2500;
        }
        if (this.className === null) {
            this.className = this.singleTile ? 'olLayerGridSingleTile' : 'olLayerGrid';
        }
        if (!OpenLayers.Animation.isNative) {
            this.deferMoveGriddedTiles = OpenLayers.Function.bind(function () {
                this.moveGriddedTiles(true);
                this.moveTimerId = null;
            }, this);
        }
    },
    setMap: function (map) {
        OpenLayers.Layer.HTTPRequest.prototype.setMap.call(this, map);
        OpenLayers.Element.addClass(this.div, this.className);
    },
    removeMap: function (map) {
        if (this.moveTimerId !== null) {
            window.clearTimeout(this.moveTimerId);
            this.moveTimerId = null;
        }
        this.clearTileQueue();
        if (this.backBufferTimerId !== null) {
            window.clearTimeout(this.backBufferTimerId);
            this.backBufferTimerId = null;
        }
    },
    destroy: function () {
        this.removeBackBuffer();
        this.clearGrid();
        this.grid = null;
        this.tileSize = null;
        OpenLayers.Layer.HTTPRequest.prototype.destroy.apply(this, arguments);
    },
    clearGrid: function () {
        this.clearTileQueue();
        if (this.grid) {
            for (var iRow = 0, len = this.grid.length; iRow < len; iRow++) {
                var row = this.grid[iRow];
                for (var iCol = 0, clen = row.length; iCol < clen; iCol++) {
                    var tile = row[iCol];
                    this.destroyTile(tile);
                }
            }
            this.grid = [];
            this.gridResolution = null;
        }
    },
    clone: function (obj) {
        if (obj == null) {
            obj = new OpenLayers.Layer.Grid(this.name, this.url, this.params, this.getOptions());
        }
        obj = OpenLayers.Layer.HTTPRequest.prototype.clone.apply(this, [obj]);
        if (this.tileSize != null) {
            obj.tileSize = this.tileSize.clone();
        }
        obj.grid = [];
        obj.gridResolution = null;
        obj.backBuffer = null;
        obj.backBufferTimerId = null;
        obj.tileQueue = [];
        obj.tileQueueId = null;
        obj.loading = false;
        obj.moveTimerId = null;
        return obj;
    },
    moveTo: function (bounds, zoomChanged, dragging) {
        OpenLayers.Layer.HTTPRequest.prototype.moveTo.apply(this, arguments);
        bounds = bounds || this.map.getExtent();
        if (bounds != null) {
            var forceReTile = !this.grid.length || zoomChanged;
            var tilesBounds = this.getTilesBounds();
            var resolution = this.map.getResolution();
            var serverResolution = this.getServerResolution(resolution);
            if (this.singleTile) {
                if (forceReTile || (!dragging && !tilesBounds.containsBounds(bounds))) {
                    if (zoomChanged && this.transitionEffect !== 'resize') {
                        this.removeBackBuffer();
                    }
                    if (!zoomChanged || this.transitionEffect === 'resize') {
                        this.applyBackBuffer(serverResolution);
                    }
                    this.initSingleTile(bounds);
                }
            } else {
                forceReTile = forceReTile || !tilesBounds.intersectsBounds(bounds, {
                    worldBounds: this.map.baseLayer.wrapDateLine && this.map.getMaxExtent()
                });
                if (resolution !== serverResolution) {
                    bounds = this.map.calculateBounds(null, serverResolution);
                    if (forceReTile) {
                        var scale = serverResolution / resolution;
                        this.transformDiv(scale);
                    }
                } else {
                    this.div.style.width = '100%';
                    this.div.style.height = '100%';
                    this.div.style.left = '0%';
                    this.div.style.top = '0%';
                }
                if (forceReTile) {
                    if (zoomChanged && this.transitionEffect === 'resize') {
                        this.applyBackBuffer(serverResolution);
                    }
                    this.initGriddedTiles(bounds);
                } else {
                    this.moveGriddedTiles();
                }
            }
        }
    },
    getTileData: function (loc) {
        var data = null,
            x = loc.lon,
            y = loc.lat,
            numRows = this.grid.length;
        if (this.map && numRows) {
            var res = this.map.getResolution(),
                tileWidth = this.tileSize.w,
                tileHeight = this.tileSize.h,
                bounds = this.grid[0][0].bounds,
                left = bounds.left,
                top = bounds.top;
            if (x < left) {
                if (this.map.baseLayer.wrapDateLine) {
                    var worldWidth = this.map.getMaxExtent().getWidth();
                    var worldsAway = Math.ceil((left - x) / worldWidth);
                    x += worldWidth * worldsAway;
                }
            }
            var dtx = (x - left) / (res * tileWidth);
            var dty = (top - y) / (res * tileHeight);
            var col = Math.floor(dtx);
            var row = Math.floor(dty);
            if (row >= 0 && row < numRows) {
                var tile = this.grid[row][col];
                if (tile) {
                    data = {
                        tile: tile,
                        i: Math.floor((dtx - col) * tileWidth),
                        j: Math.floor((dty - row) * tileHeight)
                    };
                }
            }
        }
        return data;
    },
    queueTileDraw: function (evt) {
        var tile = evt.object;
        if (!~OpenLayers.Util.indexOf(this.tileQueue, tile)) {
            this.tileQueue.push(tile);
        }
        if (!this.tileQueueId) {
            this.tileQueueId = OpenLayers.Animation.start(OpenLayers.Function.bind(this.drawTileFromQueue, this), null, this.div);
        }
        return false;
    },
    drawTileFromQueue: function () {
        if (this.tileQueue.length === 0) {
            this.clearTileQueue();
        } else {
            this.tileQueue.shift().draw(true);
        }
    },
    clearTileQueue: function () {
        OpenLayers.Animation.stop(this.tileQueueId);
        this.tileQueueId = null;
        this.tileQueue = [];
    },
    destroyTile: function (tile) {
        this.removeTileMonitoringHooks(tile);
        tile.destroy();
    },
    getServerResolution: function (resolution) {
        resolution = resolution || this.map.getResolution();
        if (this.serverResolutions && OpenLayers.Util.indexOf(this.serverResolutions, resolution) === -1) {
            var i, serverResolution;
            for (i = this.serverResolutions.length - 1; i >= 0; i--) {
                serverResolution = this.serverResolutions[i];
                if (serverResolution > resolution) {
                    resolution = serverResolution;
                    break;
                }
            }
            if (i === -1) {
                throw 'no appropriate resolution in serverResolutions';
            }
        }
        return resolution;
    },
    getServerZoom: function () {
        var resolution = this.getServerResolution();
        return this.serverResolutions ? OpenLayers.Util.indexOf(this.serverResolutions, resolution) : this.map.getZoomForResolution(resolution) + (this.zoomOffset || 0);
    },
    transformDiv: function (scale) {
        this.div.style.width = 100 * scale + '%';
        this.div.style.height = 100 * scale + '%';
        var size = this.map.getSize();
        var lcX = parseInt(this.map.layerContainerDiv.style.left, 10);
        var lcY = parseInt(this.map.layerContainerDiv.style.top, 10);
        var x = (lcX - (size.w / 2.0)) * (scale - 1);
        var y = (lcY - (size.h / 2.0)) * (scale - 1);
        this.div.style.left = x + '%';
        this.div.style.top = y + '%';
    },
    getResolutionScale: function () {
        return parseInt(this.div.style.width, 10) / 100;
    },
    applyBackBuffer: function (resolution) {
        if (this.backBufferTimerId !== null) {
            this.removeBackBuffer();
        }
        var backBuffer = this.backBuffer;
        if (!backBuffer) {
            backBuffer = this.createBackBuffer();
            if (!backBuffer) {
                return;
            }
            this.div.insertBefore(backBuffer, this.div.firstChild);
            this.backBuffer = backBuffer;
            var topLeftTileBounds = this.grid[0][0].bounds;
            this.backBufferLonLat = {
                lon: topLeftTileBounds.left,
                lat: topLeftTileBounds.top
            };
            this.backBufferResolution = this.gridResolution;
        }
        var style = backBuffer.style;
        var ratio = this.backBufferResolution / resolution;
        style.width = 100 * ratio + '%';
        style.height = 100 * ratio + '%';
        var position = this.getViewPortPxFromLonLat(this.backBufferLonLat, resolution);
        var leftOffset = parseInt(this.map.layerContainerDiv.style.left, 10);
        var topOffset = parseInt(this.map.layerContainerDiv.style.top, 10);
        backBuffer.style.left = Math.round(position.x - leftOffset) + '%';
        backBuffer.style.top = Math.round(position.y - topOffset) + '%';
    },
    createBackBuffer: function () {
        var backBuffer;
        if (this.grid.length > 0) {
            backBuffer = document.createElement('div');
            backBuffer.id = this.div.id + '_bb';
            backBuffer.className = 'olBackBuffer';
            backBuffer.style.position = 'absolute';
            backBuffer.style.width = '100%';
            backBuffer.style.height = '100%';
            for (var i = 0, lenI = this.grid.length; i < lenI; i++) {
                for (var j = 0, lenJ = this.grid[i].length; j < lenJ; j++) {
                    var tile = this.grid[i][j].createBackBuffer();
                    if (!tile) {
                        continue;
                    }
                    tile.style.top = (i * this.tileSize.h) + '%';
                    tile.style.left = (j * this.tileSize.w) + '%';
                    backBuffer.appendChild(tile);
                }
            }
        }
        return backBuffer;
    },
    removeBackBuffer: function () {
        if (this.backBuffer) {
            this.div.removeChild(this.backBuffer);
            this.backBuffer = null;
            this.backBufferResolution = null;
            if (this.backBufferTimerId !== null) {
                window.clearTimeout(this.backBufferTimerId);
                this.backBufferTimerId = null;
            }
        }
    },
    moveByPx: function (dx, dy) {
        if (!this.singleTile) {
            this.moveGriddedTiles();
        }
    },
    setTileSize: function (size) {
        if (this.singleTile) {
            size = this.map.getSize();
            size.h = parseInt(size.h * this.ratio);
            size.w = parseInt(size.w * this.ratio);
        }
        OpenLayers.Layer.HTTPRequest.prototype.setTileSize.apply(this, [size]);
    },
    getTilesBounds: function () {
        var bounds = null;
        var length = this.grid.length;
        if (length) {
            var bottomLeftTileBounds = this.grid[length - 1][0].bounds,
                width = this.grid[0].length * bottomLeftTileBounds.getWidth(),
                height = this.grid.length * bottomLeftTileBounds.getHeight();
            bounds = new OpenLayers.Bounds(bottomLeftTileBounds.left, bottomLeftTileBounds.bottom, bottomLeftTileBounds.left + width, bottomLeftTileBounds.bottom + height);
        }
        return bounds;
    },
    initSingleTile: function (bounds) {
        this.clearTileQueue();
        var center = bounds.getCenterLonLat();
        var tileWidth = bounds.getWidth() * this.ratio;
        var tileHeight = bounds.getHeight() * this.ratio;
        var tileBounds = new OpenLayers.Bounds(center.lon - (tileWidth / 2), center.lat - (tileHeight / 2), center.lon + (tileWidth / 2), center.lat + (tileHeight / 2));
        var px = this.map.getLayerPxFromLonLat({
            lon: tileBounds.left,
            lat: tileBounds.top
        });
        if (!this.grid.length) {
            this.grid[0] = [];
        }
        var tile = this.grid[0][0];
        if (!tile) {
            tile = this.addTile(tileBounds, px);
            this.addTileMonitoringHooks(tile);
            tile.draw();
            this.grid[0][0] = tile;
        } else {
            tile.moveTo(tileBounds, px);
        }
        this.removeExcessTiles(1, 1);
        this.gridResolution = this.getServerResolution();
    },
    calculateGridLayout: function (bounds, origin, resolution) {
        var tilelon = resolution * this.tileSize.w;
        var tilelat = resolution * this.tileSize.h;
        var offsetlon = bounds.left - origin.lon;
        var tilecol = Math.floor(offsetlon / tilelon) - this.buffer;
        var tilecolremain = offsetlon / tilelon - tilecol;
        var tileoffsetx = -tilecolremain * this.tileSize.w;
        var tileoffsetlon = origin.lon + tilecol * tilelon;
        var offsetlat = bounds.top - (origin.lat + tilelat);
        var tilerow = Math.ceil(offsetlat / tilelat) + this.buffer;
        var tilerowremain = tilerow - offsetlat / tilelat;
        var tileoffsety = -tilerowremain * this.tileSize.h;
        var tileoffsetlat = origin.lat + tilerow * tilelat;
        return {
            tilelon: tilelon,
            tilelat: tilelat,
            tileoffsetlon: tileoffsetlon,
            tileoffsetlat: tileoffsetlat,
            tileoffsetx: tileoffsetx,
            tileoffsety: tileoffsety
        };
    },
    getTileOrigin: function () {
        var origin = this.tileOrigin;
        if (!origin) {
            var extent = this.getMaxExtent();
            var edges = ({
                "tl": ["left", "top"],
                "tr": ["right", "top"],
                "bl": ["left", "bottom"],
                "br": ["right", "bottom"]
            })[this.tileOriginCorner];
            origin = new OpenLayers.LonLat(extent[edges[0]], extent[edges[1]]);
        }
        return origin;
    },
    initGriddedTiles: function (bounds) {
        this.clearTileQueue();
        var viewSize = this.map.getSize();
        var minRows = Math.ceil(viewSize.h / this.tileSize.h) +
            Math.max(1, 2 * this.buffer);
        var minCols = Math.ceil(viewSize.w / this.tileSize.w) +
            Math.max(1, 2 * this.buffer);
        var origin = this.getTileOrigin();
        var resolution = this.getServerResolution();
        var tileLayout = this.calculateGridLayout(bounds, origin, resolution);
        var tileoffsetx = Math.round(tileLayout.tileoffsetx);
        var tileoffsety = Math.round(tileLayout.tileoffsety);
        var tileoffsetlon = tileLayout.tileoffsetlon;
        var tileoffsetlat = tileLayout.tileoffsetlat;
        var tilelon = tileLayout.tilelon;
        var tilelat = tileLayout.tilelat;
        var startX = tileoffsetx;
        var startLon = tileoffsetlon;
        var rowidx = 0;
        var layerContainerDivLeft = parseInt(this.map.layerContainerDiv.style.left);
        var layerContainerDivTop = parseInt(this.map.layerContainerDiv.style.top);
        var tileData = [],
            center = this.map.getCenter();
        do {
            var row = this.grid[rowidx++];
            if (!row) {
                row = [];
                this.grid.push(row);
            }
            tileoffsetlon = startLon;
            tileoffsetx = startX;
            var colidx = 0;
            do {
                var tileBounds = new OpenLayers.Bounds(tileoffsetlon, tileoffsetlat, tileoffsetlon + tilelon, tileoffsetlat + tilelat);
                var x = tileoffsetx;
                x -= layerContainerDivLeft;
                var y = tileoffsety;
                y -= layerContainerDivTop;
                var px = new OpenLayers.Pixel(x, y);
                var tile = row[colidx++];
                if (!tile) {
                    tile = this.addTile(tileBounds, px);
                    this.addTileMonitoringHooks(tile);
                    row.push(tile);
                } else {
                    tile.moveTo(tileBounds, px, false);
                }
                var tileCenter = tileBounds.getCenterLonLat();
                tileData.push({
                    tile: tile,
                    distance: Math.pow(tileCenter.lon - center.lon, 2) + Math.pow(tileCenter.lat - center.lat, 2)
                });
                tileoffsetlon += tilelon;
                tileoffsetx += this.tileSize.w;
            } while ((tileoffsetlon <= bounds.right + tilelon * this.buffer) || colidx < minCols);
            tileoffsetlat -= tilelat;
            tileoffsety += this.tileSize.h;
        } while ((tileoffsetlat >= bounds.bottom - tilelat * this.buffer) || rowidx < minRows);
        this.removeExcessTiles(rowidx, colidx);
        this.gridResolution = this.getServerResolution();
        tileData.sort(function (a, b) {
            return a.distance - b.distance;
        });
        for (var i = 0, ii = tileData.length; i < ii; ++i) {
            tileData[i].tile.draw();
        }
    },
    getMaxExtent: function () {
        return this.maxExtent;
    },
    addTile: function (bounds, position) {
        var tile = new this.tileClass(this, position, bounds, null, this.tileSize, this.tileOptions);
        tile.events.register("beforedraw", this, this.queueTileDraw);
        return tile;
    },
    addTileMonitoringHooks: function (tile) {
        tile.onLoadStart = function () {
            if (this.loading === false) {
                this.loading = true;
                this.events.triggerEvent("loadstart");
            }
            this.events.triggerEvent("tileloadstart", {
                tile: tile
            });
            this.numLoadingTiles++;
        };
        tile.onLoadEnd = function () {
            this.numLoadingTiles--;
            this.events.triggerEvent("tileloaded", {
                tile: tile
            });
            if (this.tileQueue.length === 0 && this.numLoadingTiles === 0) {
                this.loading = false;
                this.events.triggerEvent("loadend");
                if (this.backBuffer) {
                    this.backBufferTimerId = window.setTimeout(OpenLayers.Function.bind(this.removeBackBuffer, this), this.removeBackBufferDelay);
                }
            }
        };
        tile.onLoadError = function () {
            this.events.triggerEvent("tileerror", {
                tile: tile
            });
        };
        tile.events.on({
            "loadstart": tile.onLoadStart,
            "loadend": tile.onLoadEnd,
            "unload": tile.onLoadEnd,
            "loaderror": tile.onLoadError,
            scope: this
        });
    },
    removeTileMonitoringHooks: function (tile) {
        tile.unload();
        tile.events.un({
            "loadstart": tile.onLoadStart,
            "loadend": tile.onLoadEnd,
            "unload": tile.onLoadEnd,
            "loaderror": tile.onLoadError,
            scope: this
        });
    },
    moveGriddedTiles: function (deferred) {
        if (!deferred && !OpenLayers.Animation.isNative) {
            if (this.moveTimerId != null) {
                window.clearTimeout(this.moveTimerId);
            }
            this.moveTimerId = window.setTimeout(this.deferMoveGriddedTiles, this.tileLoadingDelay);
            return;
        }
        var buffer = this.buffer || 1;
        var scale = this.getResolutionScale();
        while (true) {
            var tlViewPort = {
                x: (this.grid[0][0].position.x * scale) + parseInt(this.div.style.left, 10) + parseInt(this.map.layerContainerDiv.style.left),
                y: (this.grid[0][0].position.y * scale) + parseInt(this.div.style.top, 10) + parseInt(this.map.layerContainerDiv.style.top)
            };
            var tileSize = {
                w: this.tileSize.w * scale,
                h: this.tileSize.h * scale
            };
            if (tlViewPort.x > -tileSize.w * (buffer - 1)) {
                this.shiftColumn(true);
            } else if (tlViewPort.x < -tileSize.w * buffer) {
                this.shiftColumn(false);
            } else if (tlViewPort.y > -tileSize.h * (buffer - 1)) {
                this.shiftRow(true);
            } else if (tlViewPort.y < -tileSize.h * buffer) {
                this.shiftRow(false);
            } else {
                break;
            }
        }
    },
    shiftRow: function (prepend) {
        var modelRowIndex = (prepend) ? 0 : (this.grid.length - 1);
        var grid = this.grid;
        var modelRow = grid[modelRowIndex];
        var resolution = this.getServerResolution();
        var deltaY = (prepend) ? -this.tileSize.h : this.tileSize.h;
        var deltaLat = resolution * -deltaY;
        var row = (prepend) ? grid.pop() : grid.shift();
        for (var i = 0, len = modelRow.length; i < len; i++) {
            var modelTile = modelRow[i];
            var bounds = modelTile.bounds.clone();
            var position = modelTile.position.clone();
            bounds.bottom = bounds.bottom + deltaLat;
            bounds.top = bounds.top + deltaLat;
            position.y = position.y + deltaY;
            row[i].moveTo(bounds, position);
        }
        if (prepend) {
            grid.unshift(row);
        } else {
            grid.push(row);
        }
    },
    shiftColumn: function (prepend) {
        var deltaX = (prepend) ? -this.tileSize.w : this.tileSize.w;
        var resolution = this.getServerResolution();
        var deltaLon = resolution * deltaX;
        for (var i = 0, len = this.grid.length; i < len; i++) {
            var row = this.grid[i];
            var modelTileIndex = (prepend) ? 0 : (row.length - 1);
            var modelTile = row[modelTileIndex];
            var bounds = modelTile.bounds.clone();
            var position = modelTile.position.clone();
            bounds.left = bounds.left + deltaLon;
            bounds.right = bounds.right + deltaLon;
            position.x = position.x + deltaX;
            var tile = prepend ? this.grid[i].pop() : this.grid[i].shift();
            tile.moveTo(bounds, position);
            if (prepend) {
                row.unshift(tile);
            } else {
                row.push(tile);
            }
        }
    },
    removeExcessTiles: function (rows, columns) {
        var i, l;
        while (this.grid.length > rows) {
            var row = this.grid.pop();
            for (i = 0, l = row.length; i < l; i++) {
                var tile = row[i];
                this.destroyTile(tile);
            }
        }
        for (i = 0, l = this.grid.length; i < l; i++) {
            while (this.grid[i].length > columns) {
                var row = this.grid[i];
                var tile = row.pop();
                this.destroyTile(tile);
            }
        }
    },
    onMapResize: function () {
        if (this.singleTile) {
            this.clearGrid();
            this.setTileSize();
        }
    },
    getTileBounds: function (viewPortPx) {
        var maxExtent = this.maxExtent;
        var resolution = this.getResolution();
        var tileMapWidth = resolution * this.tileSize.w;
        var tileMapHeight = resolution * this.tileSize.h;
        var mapPoint = this.getLonLatFromViewPortPx(viewPortPx);
        var tileLeft = maxExtent.left + (tileMapWidth * Math.floor((mapPoint.lon -
            maxExtent.left) / tileMapWidth));
        var tileBottom = maxExtent.bottom + (tileMapHeight * Math.floor((mapPoint.lat -
            maxExtent.bottom) / tileMapHeight));
        return new OpenLayers.Bounds(tileLeft, tileBottom, tileLeft + tileMapWidth, tileBottom + tileMapHeight);
    },
    CLASS_NAME: "OpenLayers.Layer.Grid"
});
OpenLayers.Handler = OpenLayers.Class({
    id: null,
    control: null,
    map: null,
    keyMask: null,
    active: false,
    evt: null,
    initialize: function (control, callbacks, options) {
        OpenLayers.Util.extend(this, options);
        this.control = control;
        this.callbacks = callbacks;
        var map = this.map || control.map;
        if (map) {
            this.setMap(map);
        }
        this.id = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_");
    },
    setMap: function (map) {
        this.map = map;
    },
    checkModifiers: function (evt) {
        if (this.keyMask == null) {
            return true;
        }
        var keyModifiers = (evt.shiftKey ? OpenLayers.Handler.MOD_SHIFT : 0) | (evt.ctrlKey ? OpenLayers.Handler.MOD_CTRL : 0) | (evt.altKey ? OpenLayers.Handler.MOD_ALT : 0);
        return (keyModifiers == this.keyMask);
    },
    activate: function () {
        if (this.active) {
            return false;
        }
        var events = OpenLayers.Events.prototype.BROWSER_EVENTS;
        for (var i = 0, len = events.length; i < len; i++) {
            if (this[events[i]]) {
                this.register(events[i], this[events[i]]);
            }
        }
        this.active = true;
        return true;
    },
    deactivate: function () {
        if (!this.active) {
            return false;
        }
        var events = OpenLayers.Events.prototype.BROWSER_EVENTS;
        for (var i = 0, len = events.length; i < len; i++) {
            if (this[events[i]]) {
                this.unregister(events[i], this[events[i]]);
            }
        }
        this.active = false;
        return true;
    },
    callback: function (name, args) {
        if (name && this.callbacks[name]) {
            this.callbacks[name].apply(this.control, args);
        }
    },
    register: function (name, method) {
        this.map.events.registerPriority(name, this, method);
        this.map.events.registerPriority(name, this, this.setEvent);
    },
    unregister: function (name, method) {
        this.map.events.unregister(name, this, method);
        this.map.events.unregister(name, this, this.setEvent);
    },
    setEvent: function (evt) {
        this.evt = evt;
        return true;
    },
    destroy: function () {
        this.deactivate();
        this.control = this.map = null;
    },
    CLASS_NAME: "OpenLayers.Handler"
});
OpenLayers.Handler.MOD_NONE = 0;
OpenLayers.Handler.MOD_SHIFT = 1;
OpenLayers.Handler.MOD_CTRL = 2;
OpenLayers.Handler.MOD_ALT = 4;
OpenLayers.Handler.Click = OpenLayers.Class(OpenLayers.Handler, {
    delay: 300,
    single: true,
    'double': false,
    pixelTolerance: 0,
    dblclickTolerance: 13,
    stopSingle: false,
    stopDouble: false,
    timerId: null,
    touch: false,
    down: null,
    last: null,
    first: null,
    rightclickTimerId: null,
    touchstart: function (evt) {
        if (!this.touch) {
            this.unregisterMouseListeners();
            this.touch = true;
        }
        this.down = this.getEventInfo(evt);
        this.last = this.getEventInfo(evt);
        return true;
    },
    touchmove: function (evt) {
        this.last = this.getEventInfo(evt);
        return true;
    },
    touchend: function (evt) {
        if (this.down) {
            evt.xy = this.last.xy;
            evt.lastTouches = this.last.touches;
            this.handleSingle(evt);
            this.down = null;
        }
        return true;
    },
    unregisterMouseListeners: function () {
        this.map.events.un({
            mousedown: this.mousedown,
            mouseup: this.mouseup,
            click: this.click,
            dblclick: this.dblclick,
            scope: this
        });
    },
    mousedown: function (evt) {
        this.down = this.getEventInfo(evt);
        this.last = this.getEventInfo(evt);
        return true;
    },
    mouseup: function (evt) {
        var propagate = true;
        if (this.checkModifiers(evt) && this.control.handleRightClicks && OpenLayers.Event.isRightClick(evt)) {
            propagate = this.rightclick(evt);
        }
        return propagate;
    },
    rightclick: function (evt) {
        if (this.passesTolerance(evt)) {
            if (this.rightclickTimerId != null) {
                this.clearTimer();
                this.callback('dblrightclick', [evt]);
                return !this.stopDouble;
            } else {
                var clickEvent = this['double'] ? OpenLayers.Util.extend({}, evt) : this.callback('rightclick', [evt]);
                var delayedRightCall = OpenLayers.Function.bind(this.delayedRightCall, this, clickEvent);
                this.rightclickTimerId = window.setTimeout(delayedRightCall, this.delay);
            }
        }
        return !this.stopSingle;
    },
    delayedRightCall: function (evt) {
        this.rightclickTimerId = null;
        if (evt) {
            this.callback('rightclick', [evt]);
        }
    },
    click: function (evt) {
        if (!this.last) {
            this.last = this.getEventInfo(evt);
        }
        this.handleSingle(evt);
        return !this.stopSingle;
    },
    dblclick: function (evt) {
        this.handleDouble(evt);
        return !this.stopDouble;
    },
    handleDouble: function (evt) {
        if (this.passesDblclickTolerance(evt)) {
            if (this["double"]) {
                this.callback("dblclick", [evt]);
            }
            this.clearTimer();
        }
    },
    handleSingle: function (evt) {
        if (this.passesTolerance(evt)) {
            if (this.timerId != null) {
                if (this.last.touches && this.last.touches.length === 1) {
                    if (this["double"]) {
                        OpenLayers.Event.stop(evt);
                    }
                    this.handleDouble(evt);
                }
                if (!this.last.touches || this.last.touches.length !== 2) {
                    this.clearTimer();
                }
            } else {
                this.first = this.getEventInfo(evt);
                var clickEvent = this.single ? OpenLayers.Util.extend({}, evt) : null;
                this.queuePotentialClick(clickEvent);
            }
        }
    },
    queuePotentialClick: function (evt) {
        this.timerId = window.setTimeout(OpenLayers.Function.bind(this.delayedCall, this, evt), this.delay);
    },
    passesTolerance: function (evt) {
        var passes = true;
        if (this.pixelTolerance != null && this.down && this.down.xy) {
            passes = this.pixelTolerance >= this.down.xy.distanceTo(evt.xy);
            if (passes && this.touch && this.down.touches.length === this.last.touches.length) {
                for (var i = 0, ii = this.down.touches.length; i < ii; ++i) {
                    if (this.getTouchDistance(this.down.touches[i], this.last.touches[i]) > this.pixelTolerance) {
                        passes = false;
                        break;
                    }
                }
            }
        }
        return passes;
    },
    getTouchDistance: function (from, to) {
        return Math.sqrt(Math.pow(from.clientX - to.clientX, 2) +
            Math.pow(from.clientY - to.clientY, 2));
    },
    passesDblclickTolerance: function (evt) {
        var passes = true;
        if (this.down && this.first) {
            passes = this.down.xy.distanceTo(this.first.xy) <= this.dblclickTolerance;
        }
        return passes;
    },
    clearTimer: function () {
        if (this.timerId != null) {
            window.clearTimeout(this.timerId);
            this.timerId = null;
        }
        if (this.rightclickTimerId != null) {
            window.clearTimeout(this.rightclickTimerId);
            this.rightclickTimerId = null;
        }
    },
    delayedCall: function (evt) {
        this.timerId = null;
        if (evt) {
            this.callback("click", [evt]);
        }
    },
    getEventInfo: function (evt) {
        var touches;
        if (evt.touches) {
            var len = evt.touches.length;
            touches = new Array(len);
            var touch;
            for (var i = 0; i < len; i++) {
                touch = evt.touches[i];
                touches[i] = {
                    clientX: touch.clientX,
                    clientY: touch.clientY
                };
            }
        }
        return {
            xy: evt.xy,
            touches: touches
        };
    },
    deactivate: function () {
        var deactivated = false;
        if (OpenLayers.Handler.prototype.deactivate.apply(this, arguments)) {
            this.clearTimer();
            this.down = null;
            this.first = null;
            this.last = null;
            this.touch = false;
            deactivated = true;
        }
        return deactivated;
    },
    CLASS_NAME: "OpenLayers.Handler.Click"
});
OpenLayers.Kinetic = OpenLayers.Class({
    threshold: 0,
    deceleration: 0.0035,
    nbPoints: 100,
    delay: 200,
    points: undefined,
    timerId: undefined,
    initialize: function (options) {
        OpenLayers.Util.extend(this, options);
    },
    begin: function () {
        OpenLayers.Animation.stop(this.timerId);
        this.timerId = undefined;
        this.points = [];
    },
    update: function (xy) {
        this.points.unshift({
            xy: xy,
            tick: new Date().getTime()
        });
        if (this.points.length > this.nbPoints) {
            this.points.pop();
        }
    },
    end: function (xy) {
        var last, now = new Date().getTime();
        for (var i = 0, l = this.points.length, point; i < l; i++) {
            point = this.points[i];
            if (now - point.tick > this.delay) {
                break;
            }
            last = point;
        }
        if (!last) {
            return;
        }
        var time = new Date().getTime() - last.tick;
        var dist = Math.sqrt(Math.pow(xy.x - last.xy.x, 2) +
            Math.pow(xy.y - last.xy.y, 2));
        var speed = dist / time;
        if (speed == 0 || speed < this.threshold) {
            return;
        }
        var theta = Math.asin((xy.y - last.xy.y) / dist);
        if (last.xy.x <= xy.x) {
            theta = Math.PI - theta;
        }
        return {
            speed: speed,
            theta: theta
        };
    },
    move: function (info, callback) {
        var v0 = info.speed;
        var fx = Math.cos(info.theta);
        var fy = -Math.sin(info.theta);
        var initialTime = new Date().getTime();
        var lastX = 0;
        var lastY = 0;
        var timerCallback = function () {
            if (this.timerId == null) {
                return;
            }
            var t = new Date().getTime() - initialTime;
            var p = (-this.deceleration * Math.pow(t, 2)) / 2.0 + v0 * t;
            var x = p * fx;
            var y = p * fy;
            var args = {};
            args.end = false;
            var v = -this.deceleration * t + v0;
            if (v <= 0) {
                OpenLayers.Animation.stop(this.timerId);
                this.timerId = null;
                args.end = true;
            }
            args.x = x - lastX;
            args.y = y - lastY;
            lastX = x;
            lastY = y;
            callback(args.x, args.y, args.end);
        };
        this.timerId = OpenLayers.Animation.start(OpenLayers.Function.bind(timerCallback, this));
    },
    CLASS_NAME: "OpenLayers.Kinetic"
});
OpenLayers.Control = OpenLayers.Class({
    id: null,
    map: null,
    div: null,
    type: null,
    allowSelection: false,
    displayClass: "",
    title: "",
    autoActivate: false,
    active: null,
    handler: null,
    eventListeners: null,
    events: null,
    initialize: function (options) {
        this.displayClass = this.CLASS_NAME.replace("OpenLayers.", "ol").replace(/\./g, "");
        OpenLayers.Util.extend(this, options);
        this.events = new OpenLayers.Events(this);
        if (this.eventListeners instanceof Object) {
            this.events.on(this.eventListeners);
        }
        if (this.id == null) {
            this.id = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_");
        }
    },
    destroy: function () {
        if (this.events) {
            if (this.eventListeners) {
                this.events.un(this.eventListeners);
            }
            this.events.destroy();
            this.events = null;
        }
        this.eventListeners = null;
        if (this.handler) {
            this.handler.destroy();
            this.handler = null;
        }
        if (this.handlers) {
            for (var key in this.handlers) {
                if (this.handlers.hasOwnProperty(key) && typeof this.handlers[key].destroy == "function") {
                    this.handlers[key].destroy();
                }
            }
            this.handlers = null;
        }
        if (this.map) {
            this.map.removeControl(this);
            this.map = null;
        }
        this.div = null;
    },
    setMap: function (map) {
        this.map = map;
        if (this.handler) {
            this.handler.setMap(map);
        }
    },
    draw: function (px) {
        if (this.div == null) {
            this.div = OpenLayers.Util.createDiv(this.id);
            this.div.className = this.displayClass;
            if (!this.allowSelection) {
                this.div.className += " olControlNoSelect";
                this.div.setAttribute("unselectable", "on", 0);
                this.div.onselectstart = OpenLayers.Function.False;
            }
            if (this.title != "") {
                this.div.title = this.title;
            }
        }
        if (px != null) {
            this.position = px.clone();
        }
        this.moveTo(this.position);
        return this.div;
    },
    moveTo: function (px) {
        if ((px != null) && (this.div != null)) {
            this.div.style.left = px.x + "px";
            this.div.style.top = px.y + "px";
        }
    },
    activate: function () {
        if (this.active) {
            return false;
        }
        if (this.handler) {
            this.handler.activate();
        }
        this.active = true;
        if (this.map) {
            OpenLayers.Element.addClass(this.map.viewPortDiv, this.displayClass.replace(/ /g, "") + "Active");
        }
        this.events.triggerEvent("activate");
        return true;
    },
    deactivate: function () {
        if (this.active) {
            if (this.handler) {
                this.handler.deactivate();
            }
            this.active = false;
            if (this.map) {
                OpenLayers.Element.removeClass(this.map.viewPortDiv, this.displayClass.replace(/ /g, "") + "Active");
            }
            this.events.triggerEvent("deactivate");
            return true;
        }
        return false;
    },
    CLASS_NAME: "OpenLayers.Control"
});
OpenLayers.Control.TYPE_BUTTON = 1;
OpenLayers.Control.TYPE_TOGGLE = 2;
OpenLayers.Control.TYPE_TOOL = 3;
OpenLayers.Handler.Drag = OpenLayers.Class(OpenLayers.Handler, {
    started: false,
    stopDown: true,
    dragging: false,
    touch: false,
    last: null,
    start: null,
    lastMoveEvt: null,
    oldOnselectstart: null,
    interval: 0,
    timeoutId: null,
    documentDrag: false,
    documentEvents: null,
    initialize: function (control, callbacks, options) {
        OpenLayers.Handler.prototype.initialize.apply(this, arguments);
        if (this.documentDrag === true) {
            var me = this;
            this._docMove = function (evt) {
                me.mousemove({
                    xy: {
                        x: evt.clientX,
                        y: evt.clientY
                    },
                    element: document
                });
            };
            this._docUp = function (evt) {
                me.mouseup({
                    xy: {
                        x: evt.clientX,
                        y: evt.clientY
                    }
                });
            };
        }
    },
    dragstart: function (evt) {
        var propagate = true;
        this.dragging = false;
        if (this.checkModifiers(evt) && (OpenLayers.Event.isLeftClick(evt) || OpenLayers.Event.isSingleTouch(evt))) {
            this.started = true;
            this.start = evt.xy;
            this.last = evt.xy;
            OpenLayers.Element.addClass(this.map.viewPortDiv, "olDragDown");
            this.down(evt);
            this.callback("down", [evt.xy]);
            OpenLayers.Event.stop(evt);
            if (!this.oldOnselectstart) {
                this.oldOnselectstart = document.onselectstart ? document.onselectstart : OpenLayers.Function.True;
            }
            document.onselectstart = OpenLayers.Function.False;
            propagate = !this.stopDown;
        } else {
            this.started = false;
            this.start = null;
            this.last = null;
        }
        return propagate;
    },
    dragmove: function (evt) {
        this.lastMoveEvt = evt;
        if (this.started && !this.timeoutId && (evt.xy.x != this.last.x || evt.xy.y != this.last.y)) {
            if (this.documentDrag === true && this.documentEvents) {
                if (evt.element === document) {
                    this.adjustXY(evt);
                    this.setEvent(evt);
                } else {
                    this.removeDocumentEvents();
                }
            }
            if (this.interval > 0) {
                this.timeoutId = setTimeout(OpenLayers.Function.bind(this.removeTimeout, this), this.interval);
            }
            this.dragging = true;
            this.move(evt);
            this.callback("move", [evt.xy]);
            if (!this.oldOnselectstart) {
                this.oldOnselectstart = document.onselectstart;
                document.onselectstart = OpenLayers.Function.False;
            }
            this.last = evt.xy;
        }
        return true;
    },
    dragend: function (evt) {
        if (this.started) {
            if (this.documentDrag === true && this.documentEvents) {
                this.adjustXY(evt);
                this.removeDocumentEvents();
            }
            var dragged = (this.start != this.last);
            this.started = false;
            this.dragging = false;
            OpenLayers.Element.removeClass(this.map.viewPortDiv, "olDragDown");
            this.up(evt);
            this.callback("up", [evt.xy]);
            if (dragged) {
                this.callback("done", [evt.xy]);
            }
            document.onselectstart = this.oldOnselectstart;
        }
        return true;
    },
    down: function (evt) {},
    move: function (evt) {},
    up: function (evt) {},
    out: function (evt) {},
    mousedown: function (evt) {
        return this.dragstart(evt);
    },
    touchstart: function (evt) {
        if (!this.touch) {
            this.touch = true;
            this.map.events.un({
                mousedown: this.mousedown,
                mouseup: this.mouseup,
                mousemove: this.mousemove,
                click: this.click,
                scope: this
            });
        }
        return this.dragstart(evt);
    },
    mousemove: function (evt) {
        return this.dragmove(evt);
    },
    touchmove: function (evt) {
        return this.dragmove(evt);
    },
    removeTimeout: function () {
        this.timeoutId = null;
        if (this.dragging) {
            this.mousemove(this.lastMoveEvt);
        }
    },
    mouseup: function (evt) {
        return this.dragend(evt);
    },
    touchend: function (evt) {
        evt.xy = this.last;
        return this.dragend(evt);
    },
    mouseout: function (evt) {
        if (this.started && OpenLayers.Util.mouseLeft(evt, this.map.viewPortDiv)) {
            if (this.documentDrag === true) {
                this.addDocumentEvents();
            } else {
                var dragged = (this.start != this.last);
                this.started = false;
                this.dragging = false;
                OpenLayers.Element.removeClass(this.map.viewPortDiv, "olDragDown");
                this.out(evt);
                this.callback("out", []);
                if (dragged) {
                    this.callback("done", [evt.xy]);
                }
                if (document.onselectstart) {
                    document.onselectstart = this.oldOnselectstart;
                }
            }
        }
        return true;
    },
    click: function (evt) {
        return (this.start == this.last);
    },
    activate: function () {
        var activated = false;
        if (OpenLayers.Handler.prototype.activate.apply(this, arguments)) {
            this.dragging = false;
            activated = true;
        }
        return activated;
    },
    deactivate: function () {
        var deactivated = false;
        if (OpenLayers.Handler.prototype.deactivate.apply(this, arguments)) {
            this.touch = false;
            this.started = false;
            this.dragging = false;
            this.start = null;
            this.last = null;
            deactivated = true;
            OpenLayers.Element.removeClass(this.map.viewPortDiv, "olDragDown");
        }
        return deactivated;
    },
    adjustXY: function (evt) {
        var pos = OpenLayers.Util.pagePosition(this.map.viewPortDiv);
        evt.xy.x -= pos[0];
        evt.xy.y -= pos[1];
    },
    addDocumentEvents: function () {
        OpenLayers.Element.addClass(document.body, "olDragDown");
        this.documentEvents = true;
        OpenLayers.Event.observe(document, "mousemove", this._docMove);
        OpenLayers.Event.observe(document, "mouseup", this._docUp);
    },
    removeDocumentEvents: function () {
        OpenLayers.Element.removeClass(document.body, "olDragDown");
        this.documentEvents = false;
        OpenLayers.Event.stopObserving(document, "mousemove", this._docMove);
        OpenLayers.Event.stopObserving(document, "mouseup", this._docUp);
    },
    CLASS_NAME: "OpenLayers.Handler.Drag"
});
OpenLayers.Handler.Box = OpenLayers.Class(OpenLayers.Handler, {
    dragHandler: null,
    boxDivClassName: 'olHandlerBoxZoomBox',
    boxOffsets: null,
    initialize: function (control, callbacks, options) {
        OpenLayers.Handler.prototype.initialize.apply(this, arguments);
        this.dragHandler = new OpenLayers.Handler.Drag(this, {
            down: this.startBox,
            move: this.moveBox,
            out: this.removeBox,
            up: this.endBox
        }, {
            keyMask: this.keyMask
        });
    },
    destroy: function () {
        OpenLayers.Handler.prototype.destroy.apply(this, arguments);
        if (this.dragHandler) {
            this.dragHandler.destroy();
            this.dragHandler = null;
        }
    },
    setMap: function (map) {
        OpenLayers.Handler.prototype.setMap.apply(this, arguments);
        if (this.dragHandler) {
            this.dragHandler.setMap(map);
        }
    },
    startBox: function (xy) {
        this.callback("start", []);
        this.zoomBox = OpenLayers.Util.createDiv('zoomBox', {
            x: -9999,
            y: -9999
        });
        this.zoomBox.className = this.boxDivClassName;
        this.zoomBox.style.zIndex = this.map.Z_INDEX_BASE["Popup"] - 1;
        this.map.viewPortDiv.appendChild(this.zoomBox);
        OpenLayers.Element.addClass(this.map.viewPortDiv, "olDrawBox");
    },
    moveBox: function (xy) {
        var startX = this.dragHandler.start.x;
        var startY = this.dragHandler.start.y;
        var deltaX = Math.abs(startX - xy.x);
        var deltaY = Math.abs(startY - xy.y);
        var offset = this.getBoxOffsets();
        this.zoomBox.style.width = (deltaX + offset.width + 1) + "px";
        this.zoomBox.style.height = (deltaY + offset.height + 1) + "px";
        this.zoomBox.style.left = (xy.x < startX ? startX - deltaX - offset.left : startX - offset.left) + "px";
        this.zoomBox.style.top = (xy.y < startY ? startY - deltaY - offset.top : startY - offset.top) + "px";
    },
    endBox: function (end) {
        var result;
        if (Math.abs(this.dragHandler.start.x - end.x) > 5 || Math.abs(this.dragHandler.start.y - end.y) > 5) {
            var start = this.dragHandler.start;
            var top = Math.min(start.y, end.y);
            var bottom = Math.max(start.y, end.y);
            var left = Math.min(start.x, end.x);
            var right = Math.max(start.x, end.x);
            result = new OpenLayers.Bounds(left, bottom, right, top);
        } else {
            result = this.dragHandler.start.clone();
        }
        this.removeBox();
        this.callback("done", [result]);
    },
    removeBox: function () {
        this.map.viewPortDiv.removeChild(this.zoomBox);
        this.zoomBox = null;
        this.boxOffsets = null;
        OpenLayers.Element.removeClass(this.map.viewPortDiv, "olDrawBox");
    },
    activate: function () {
        if (OpenLayers.Handler.prototype.activate.apply(this, arguments)) {
            this.dragHandler.activate();
            return true;
        } else {
            return false;
        }
    },
    deactivate: function () {
        if (OpenLayers.Handler.prototype.deactivate.apply(this, arguments)) {
            if (this.dragHandler.deactivate()) {
                if (this.zoomBox) {
                    this.removeBox();
                }
            }
            return true;
        } else {
            return false;
        }
    },
    getBoxOffsets: function () {
        if (!this.boxOffsets) {
            var testDiv = document.createElement("div");
            testDiv.style.position = "absolute";
            testDiv.style.border = "1px solid black";
            testDiv.style.width = "3px";
            document.body.appendChild(testDiv);
            var w3cBoxModel = testDiv.clientWidth == 3;
            document.body.removeChild(testDiv);
            var left = parseInt(OpenLayers.Element.getStyle(this.zoomBox, "border-left-width"));
            var right = parseInt(OpenLayers.Element.getStyle(this.zoomBox, "border-right-width"));
            var top = parseInt(OpenLayers.Element.getStyle(this.zoomBox, "border-top-width"));
            var bottom = parseInt(OpenLayers.Element.getStyle(this.zoomBox, "border-bottom-width"));
            this.boxOffsets = {
                left: left,
                right: right,
                top: top,
                bottom: bottom,
                width: w3cBoxModel === false ? left + right : 0,
                height: w3cBoxModel === false ? top + bottom : 0
            };
        }
        return this.boxOffsets;
    },
    CLASS_NAME: "OpenLayers.Handler.Box"
});
OpenLayers.Control.ZoomBox = OpenLayers.Class(OpenLayers.Control, {
    type: OpenLayers.Control.TYPE_TOOL,
    out: false,
    keyMask: null,
    alwaysZoom: false,
    draw: function () {
        this.handler = new OpenLayers.Handler.Box(this, {
            done: this.zoomBox
        }, {
            keyMask: this.keyMask
        });
    },
    zoomBox: function (position) {
        if (position instanceof OpenLayers.Bounds) {
            var bounds;
            if (!this.out) {
                var minXY = this.map.getLonLatFromPixel({
                    x: position.left,
                    y: position.bottom
                });
                var maxXY = this.map.getLonLatFromPixel({
                    x: position.right,
                    y: position.top
                });
                bounds = new OpenLayers.Bounds(minXY.lon, minXY.lat, maxXY.lon, maxXY.lat);
            } else {
                var pixWidth = Math.abs(position.right - position.left);
                var pixHeight = Math.abs(position.top - position.bottom);
                var zoomFactor = Math.min((this.map.size.h / pixHeight), (this.map.size.w / pixWidth));
                var extent = this.map.getExtent();
                var center = this.map.getLonLatFromPixel(position.getCenterPixel());
                var xmin = center.lon - (extent.getWidth() / 2) * zoomFactor;
                var xmax = center.lon + (extent.getWidth() / 2) * zoomFactor;
                var ymin = center.lat - (extent.getHeight() / 2) * zoomFactor;
                var ymax = center.lat + (extent.getHeight() / 2) * zoomFactor;
                bounds = new OpenLayers.Bounds(xmin, ymin, xmax, ymax);
            }
            var lastZoom = this.map.getZoom();
            this.map.zoomToExtent(bounds);
            if (lastZoom == this.map.getZoom() && this.alwaysZoom == true) {
                this.map.zoomTo(lastZoom + (this.out ? -1 : 1));
            }
        } else {
            if (!this.out) {
                this.map.setCenter(this.map.getLonLatFromPixel(position), this.map.getZoom() + 1);
            } else {
                this.map.setCenter(this.map.getLonLatFromPixel(position), this.map.getZoom() - 1);
            }
        }
    },
    CLASS_NAME: "OpenLayers.Control.ZoomBox"
});
OpenLayers.Control.DragPan = OpenLayers.Class(OpenLayers.Control, {
    type: OpenLayers.Control.TYPE_TOOL,
    panned: false,
    interval: 1,
    documentDrag: false,
    kinetic: null,
    enableKinetic: false,
    kineticInterval: 10,
    draw: function () {
        if (this.enableKinetic) {
            var config = {
                interval: this.kineticInterval
            };
            if (typeof this.enableKinetic === "object") {
                config = OpenLayers.Util.extend(config, this.enableKinetic);
            }
            this.kinetic = new OpenLayers.Kinetic(config);
        }
        this.handler = new OpenLayers.Handler.Drag(this, {
            "move": this.panMap,
            "done": this.panMapDone,
            "down": this.panMapStart
        }, {
            interval: this.interval,
            documentDrag: this.documentDrag
        });
    },
    panMapStart: function () {
        if (this.kinetic) {
            this.kinetic.begin();
        }
    },
    panMap: function (xy) {
        if (this.kinetic) {
            this.kinetic.update(xy);
        }
        this.panned = true;
        this.map.pan(this.handler.last.x - xy.x, this.handler.last.y - xy.y, {
            dragging: true,
            animate: false
        });
    },
    panMapDone: function (xy) {
        if (this.panned) {
            var res = null;
            if (this.kinetic) {
                res = this.kinetic.end(xy);
            }
            this.map.pan(this.handler.last.x - xy.x, this.handler.last.y - xy.y, {
                dragging: !! res,
                animate: false
            });
            if (res) {
                var self = this;
                this.kinetic.move(res, function (x, y, end) {
                    self.map.pan(x, y, {
                        dragging: !end,
                        animate: false
                    });
                });
            }
            this.panned = false;
        }
    },
    CLASS_NAME: "OpenLayers.Control.DragPan"
});
OpenLayers.Handler.MouseWheel = OpenLayers.Class(OpenLayers.Handler, {
    wheelListener: null,
    mousePosition: null,
    interval: 0,
    delta: 0,
    cumulative: true,
    initialize: function (control, callbacks, options) {
        OpenLayers.Handler.prototype.initialize.apply(this, arguments);
        this.wheelListener = OpenLayers.Function.bindAsEventListener(this.onWheelEvent, this);
    },
    destroy: function () {
        OpenLayers.Handler.prototype.destroy.apply(this, arguments);
        this.wheelListener = null;
    },
    onWheelEvent: function (e) {
        if (!this.map || !this.checkModifiers(e)) {
            return;
        }
        var overScrollableDiv = false;
        var overLayerDiv = false;
        var overMapDiv = false;
        var elem = OpenLayers.Event.element(e);
        while ((elem != null) && !overMapDiv && !overScrollableDiv) {
            if (!overScrollableDiv) {
                try {
                    if (elem.currentStyle) {
                        overflow = elem.currentStyle["overflow"];
                    } else {
                        var style = document.defaultView.getComputedStyle(elem, null);
                        var overflow = style.getPropertyValue("overflow");
                    }
                    overScrollableDiv = (overflow && (overflow == "auto") || (overflow == "scroll"));
                } catch (err) {}
            }
            if (!overLayerDiv) {
                for (var i = 0, len = this.map.layers.length; i < len; i++) {
                    if (elem == this.map.layers[i].div || elem == this.map.layers[i].pane) {
                        overLayerDiv = true;
                        break;
                    }
                }
            }
            overMapDiv = (elem == this.map.div);
            elem = elem.parentNode;
        }
        if (!overScrollableDiv && overMapDiv) {
            if (overLayerDiv) {
                var delta = 0;
                if (!e) {
                    e = window.event;
                }
                if (e.wheelDelta) {
                    delta = e.wheelDelta / 120;
                    if (window.opera && window.opera.version() < 9.2) {
                        delta = -delta;
                    }
                } else if (e.detail) {
                    delta = -e.detail / 3;
                }
                this.delta = this.delta + delta;
                if (this.interval) {
                    window.clearTimeout(this._timeoutId);
                    this._timeoutId = window.setTimeout(OpenLayers.Function.bind(function () {
                        this.wheelZoom(e);
                    }, this), this.interval);
                } else {
                    this.wheelZoom(e);
                }
            }
            OpenLayers.Event.stop(e);
        }
    },
    wheelZoom: function (e) {
        var delta = this.delta;
        this.delta = 0;
        if (delta) {
            if (this.mousePosition) {
                e.xy = this.mousePosition;
            }
            if (!e.xy) {
                e.xy = this.map.getPixelFromLonLat(this.map.getCenter());
            }
            if (delta < 0) {
                this.callback("down", [e, this.cumulative ? delta : -1]);
            } else {
                this.callback("up", [e, this.cumulative ? delta : 1]);
            }
        }
    },
    mousemove: function (evt) {
        this.mousePosition = evt.xy;
    },
    activate: function (evt) {
        if (OpenLayers.Handler.prototype.activate.apply(this, arguments)) {
            var wheelListener = this.wheelListener;
            OpenLayers.Event.observe(window, "DOMMouseScroll", wheelListener);
            OpenLayers.Event.observe(window, "mousewheel", wheelListener);
            OpenLayers.Event.observe(document, "mousewheel", wheelListener);
            return true;
        } else {
            return false;
        }
    },
    deactivate: function (evt) {
        if (OpenLayers.Handler.prototype.deactivate.apply(this, arguments)) {
            var wheelListener = this.wheelListener;
            OpenLayers.Event.stopObserving(window, "DOMMouseScroll", wheelListener);
            OpenLayers.Event.stopObserving(window, "mousewheel", wheelListener);
            OpenLayers.Event.stopObserving(document, "mousewheel", wheelListener);
            return true;
        } else {
            return false;
        }
    },
    CLASS_NAME: "OpenLayers.Handler.MouseWheel"
});
OpenLayers.Control.Navigation = OpenLayers.Class(OpenLayers.Control, {
    dragPan: null,
    dragPanOptions: null,
    pinchZoom: null,
    pinchZoomOptions: null,
    documentDrag: false,
    zoomBox: null,
    zoomBoxEnabled: true,
    zoomWheelEnabled: true,
    mouseWheelOptions: null,
    handleRightClicks: false,
    zoomBoxKeyMask: OpenLayers.Handler.MOD_SHIFT,
    autoActivate: true,
    initialize: function (options) {
        this.handlers = {};
        OpenLayers.Control.prototype.initialize.apply(this, arguments);
    },
    destroy: function () {
        this.deactivate();
        if (this.dragPan) {
            this.dragPan.destroy();
        }
        this.dragPan = null;
        if (this.zoomBox) {
            this.zoomBox.destroy();
        }
        this.zoomBox = null;
        if (this.pinchZoom) {
            this.pinchZoom.destroy();
        }
        this.pinchZoom = null;
        OpenLayers.Control.prototype.destroy.apply(this, arguments);
    },
    activate: function () {
        this.dragPan.activate();
        if (this.zoomWheelEnabled) {
            this.handlers.wheel.activate();
        }
        this.handlers.click.activate();
        if (this.zoomBoxEnabled) {
            this.zoomBox.activate();
        }
        if (this.pinchZoom) {
            this.pinchZoom.activate();
        }
        return OpenLayers.Control.prototype.activate.apply(this, arguments);
    },
    deactivate: function () {
        if (this.pinchZoom) {
            this.pinchZoom.deactivate();
        }
        this.zoomBox.deactivate();
        this.dragPan.deactivate();
        this.handlers.click.deactivate();
        this.handlers.wheel.deactivate();
        return OpenLayers.Control.prototype.deactivate.apply(this, arguments);
    },
    draw: function () {
        if (this.handleRightClicks) {
            this.map.viewPortDiv.oncontextmenu = OpenLayers.Function.False;
        }
        var clickCallbacks = {
            'click': this.defaultClick,
            'dblclick': this.defaultDblClick,
            'dblrightclick': this.defaultDblRightClick
        };
        var clickOptions = {
            'double': true,
            'stopDouble': true
        };
        this.handlers.click = new OpenLayers.Handler.Click(this, clickCallbacks, clickOptions);
        this.dragPan = new OpenLayers.Control.DragPan(OpenLayers.Util.extend({
            map: this.map,
            documentDrag: this.documentDrag
        }, this.dragPanOptions));
        this.zoomBox = new OpenLayers.Control.ZoomBox({
            map: this.map,
            keyMask: this.zoomBoxKeyMask
        });
        this.dragPan.draw();
        this.zoomBox.draw();
        this.handlers.wheel = new OpenLayers.Handler.MouseWheel(this, {
            "up": this.wheelUp,
            "down": this.wheelDown
        }, this.mouseWheelOptions);
        if (OpenLayers.Control.PinchZoom) {
            this.pinchZoom = new OpenLayers.Control.PinchZoom(OpenLayers.Util.extend({
                map: this.map
            }, this.pinchZoomOptions));
        }
    },
    defaultClick: function (evt) {
        if (evt.lastTouches && evt.lastTouches.length == 2) {
            this.map.zoomOut();
        }
    },
    defaultDblClick: function (evt) {
        var newCenter = this.map.getLonLatFromViewPortPx(evt.xy);
        this.map.setCenter(newCenter, this.map.zoom + 1);
    },
    defaultDblRightClick: function (evt) {
        var newCenter = this.map.getLonLatFromViewPortPx(evt.xy);
        this.map.setCenter(newCenter, this.map.zoom - 1);
    },
    wheelChange: function (evt, deltaZ) {
        var currentZoom = this.map.getZoom();
        var newZoom = this.map.getZoom() + Math.round(deltaZ);
        newZoom = Math.max(newZoom, 0);
        newZoom = Math.min(newZoom, this.map.getNumZoomLevels());
        if (newZoom === currentZoom) {
            return;
        }
        var size = this.map.getSize();
        var deltaX = size.w / 2 - evt.xy.x;
        var deltaY = evt.xy.y - size.h / 2;
        var newRes = this.map.baseLayer.getResolutionForZoom(newZoom);
        var zoomPoint = this.map.getLonLatFromPixel(evt.xy);
        var newCenter = new OpenLayers.LonLat(zoomPoint.lon + deltaX * newRes, zoomPoint.lat + deltaY * newRes);
        this.map.setCenter(newCenter, newZoom);
    },
    wheelUp: function (evt, delta) {
        this.wheelChange(evt, delta || 1);
    },
    wheelDown: function (evt, delta) {
        this.wheelChange(evt, delta || -1);
    },
    disableZoomBox: function () {
        this.zoomBoxEnabled = false;
        this.zoomBox.deactivate();
    },
    enableZoomBox: function () {
        this.zoomBoxEnabled = true;
        if (this.active) {
            this.zoomBox.activate();
        }
    },
    disableZoomWheel: function () {
        this.zoomWheelEnabled = false;
        this.handlers.wheel.deactivate();
    },
    enableZoomWheel: function () {
        this.zoomWheelEnabled = true;
        if (this.active) {
            this.handlers.wheel.activate();
        }
    },
    CLASS_NAME: "OpenLayers.Control.Navigation"
});
OpenLayers.Layer.Image = OpenLayers.Class(OpenLayers.Layer, {
    isBaseLayer: true,
    url: null,
    extent: null,
    size: null,
    tile: null,
    aspectRatio: null,
    initialize: function (name, url, extent, size, options) {
        this.url = url;
        this.extent = extent;
        this.maxExtent = extent;
        this.size = size;
        OpenLayers.Layer.prototype.initialize.apply(this, [name, options]);
        this.aspectRatio = (this.extent.getHeight() / this.size.h) / (this.extent.getWidth() / this.size.w);
    },
    destroy: function () {
        if (this.tile) {
            this.removeTileMonitoringHooks(this.tile);
            this.tile.destroy();
            this.tile = null;
        }
        OpenLayers.Layer.prototype.destroy.apply(this, arguments);
    },
    clone: function (obj) {
        if (obj == null) {
            obj = new OpenLayers.Layer.Image(this.name, this.url, this.extent, this.size, this.getOptions());
        }
        obj = OpenLayers.Layer.prototype.clone.apply(this, [obj]);
        return obj;
    },
    setMap: function (map) {
        if (this.options.maxResolution == null) {
            this.options.maxResolution = this.aspectRatio * this.extent.getWidth() / this.size.w;
        }
        OpenLayers.Layer.prototype.setMap.apply(this, arguments);
    },
    moveTo: function (bounds, zoomChanged, dragging) {
        OpenLayers.Layer.prototype.moveTo.apply(this, arguments);
        var firstRendering = (this.tile == null);
        if (zoomChanged || firstRendering) {
            this.setTileSize();
            var ulPx = this.map.getLayerPxFromLonLat({
                lon: this.extent.left,
                lat: this.extent.top
            });
            if (firstRendering) {
                this.tile = new OpenLayers.Tile.Image(this, ulPx, this.extent, null, this.tileSize);
                this.addTileMonitoringHooks(this.tile);
            } else {
                this.tile.size = this.tileSize.clone();
                this.tile.position = ulPx.clone();
            }
            this.tile.draw();
        }
    },
    setTileSize: function () {
        var tileWidth = this.extent.getWidth() / this.map.getResolution();
        var tileHeight = this.extent.getHeight() / this.map.getResolution();
        this.tileSize = new OpenLayers.Size(tileWidth, tileHeight);
    },
    addTileMonitoringHooks: function (tile) {
        tile.onLoadStart = function () {
            this.events.triggerEvent("loadstart");
        };
        tile.events.register("loadstart", this, tile.onLoadStart);
        tile.onLoadEnd = function () {
            this.events.triggerEvent("loadend");
        };
        tile.events.register("loadend", this, tile.onLoadEnd);
        tile.events.register("unload", this, tile.onLoadEnd);
    },
    removeTileMonitoringHooks: function (tile) {
        tile.unload();
        tile.events.un({
            "loadstart": tile.onLoadStart,
            "loadend": tile.onLoadEnd,
            "unload": tile.onLoadEnd,
            scope: this
        });
    },
    setUrl: function (newUrl) {
        this.url = newUrl;
        this.tile.draw();
    },
    getURL: function (bounds) {
        return this.url;
    },
    CLASS_NAME: "OpenLayers.Layer.Image"
});
OpenLayers.Handler.Pinch = OpenLayers.Class(OpenLayers.Handler, {
    started: false,
    stopDown: false,
    pinching: false,
    last: null,
    start: null,
    touchstart: function (evt) {
        var propagate = true;
        this.pinching = false;
        if (OpenLayers.Event.isMultiTouch(evt)) {
            this.started = true;
            this.last = this.start = {
                distance: this.getDistance(evt.touches),
                delta: 0,
                scale: 1
            };
            this.callback("start", [evt, this.start]);
            propagate = !this.stopDown;
        } else {
            this.started = false;
            this.start = null;
            this.last = null;
        }
        OpenLayers.Event.stop(evt);
        return propagate;
    },
    touchmove: function (evt) {
        if (this.started && OpenLayers.Event.isMultiTouch(evt)) {
            this.pinching = true;
            var current = this.getPinchData(evt);
            this.callback("move", [evt, current]);
            this.last = current;
            OpenLayers.Event.stop(evt);
        }
        return true;
    },
    touchend: function (evt) {
        if (this.started) {
            this.started = false;
            this.pinching = false;
            this.callback("done", [evt, this.start, this.last]);
            this.start = null;
            this.last = null;
        }
        return true;
    },
    activate: function () {
        var activated = false;
        if (OpenLayers.Handler.prototype.activate.apply(this, arguments)) {
            this.pinching = false;
            activated = true;
        }
        return activated;
    },
    deactivate: function () {
        var deactivated = false;
        if (OpenLayers.Handler.prototype.deactivate.apply(this, arguments)) {
            this.started = false;
            this.pinching = false;
            this.start = null;
            this.last = null;
            deactivated = true;
        }
        return deactivated;
    },
    getDistance: function (touches) {
        var t0 = touches[0];
        var t1 = touches[1];
        return Math.sqrt(Math.pow(t0.clientX - t1.clientX, 2) +
            Math.pow(t0.clientY - t1.clientY, 2));
    },
    getPinchData: function (evt) {
        var distance = this.getDistance(evt.touches);
        var scale = distance / this.start.distance;
        return {
            distance: distance,
            delta: this.last.distance - distance,
            scale: scale
        };
    },
    CLASS_NAME: "OpenLayers.Handler.Pinch"
});
OpenLayers.Events.buttonclick = OpenLayers.Class({
    target: null,
    events: ['mousedown', 'mouseup', 'click', 'dblclick', 'touchstart', 'touchmove', 'touchend', 'keydown'],
    startRegEx: /^mousedown|touchstart$/,
    cancelRegEx: /^touchmove$/,
    completeRegEx: /^mouseup|touchend$/,
    initialize: function (target) {
        this.target = target;
        for (var i = this.events.length - 1; i >= 0; --i) {
            this.target.register(this.events[i], this, this.buttonClick, {
                extension: true
            });
        }
    },
    destroy: function () {
        for (var i = this.events.length - 1; i >= 0; --i) {
            this.target.unregister(this.events[i], this, this.buttonClick);
        }
        delete this.target;
    },
    getPressedButton: function (element) {
        var depth = 3,
            button;
        do {
            if (OpenLayers.Element.hasClass(element, "olButton")) {
                button = element;
                break;
            }
            element = element.parentNode;
        } while (--depth > 0 && element);
        return button;
    },
    buttonClick: function (evt) {
        var propagate = true,
            element = OpenLayers.Event.element(evt);
        if (element && (OpenLayers.Event.isLeftClick(evt) || !~evt.type.indexOf("mouse"))) {
            var button = this.getPressedButton(element);
            if (button) {
                if (evt.type === "keydown") {
                    switch (evt.keyCode) {
                    case OpenLayers.Event.KEY_RETURN:
                    case OpenLayers.Event.KEY_SPACE:
                        this.target.triggerEvent("buttonclick", {
                            buttonElement: button
                        });
                        OpenLayers.Event.stop(evt);
                        propagate = false;
                        break;
                    }
                } else if (this.startEvt) {
                    if (this.completeRegEx.test(evt.type)) {
                        var pos = OpenLayers.Util.pagePosition(button);
                        this.target.triggerEvent("buttonclick", {
                            buttonElement: button,
                            buttonXY: {
                                x: this.startEvt.clientX - pos[0],
                                y: this.startEvt.clientY - pos[1]
                            }
                        });
                    }
                    if (this.cancelRegEx.test(evt.type)) {
                        delete this.startEvt;
                    }
                    OpenLayers.Event.stop(evt);
                    propagate = false;
                }
                if (this.startRegEx.test(evt.type)) {
                    this.startEvt = evt;
                    OpenLayers.Event.stop(evt);
                    propagate = false;
                }
            } else {
                delete this.startEvt;
            }
        }
        return propagate;
    }
});
OpenLayers.Control.PinchZoom = OpenLayers.Class(OpenLayers.Control, {
    type: OpenLayers.Control.TYPE_TOOL,
    containerCenter: null,
    pinchOrigin: null,
    currentCenter: null,
    autoActivate: true,
    initialize: function (options) {
        OpenLayers.Control.prototype.initialize.apply(this, arguments);
        this.handler = new OpenLayers.Handler.Pinch(this, {
            start: this.pinchStart,
            move: this.pinchMove,
            done: this.pinchDone
        }, this.handlerOptions);
    },
    activate: function () {
        var activated = OpenLayers.Control.prototype.activate.apply(this, arguments);
        if (activated) {
            this.map.events.on({
                moveend: this.updateContainerCenter,
                scope: this
            });
            this.updateContainerCenter();
        }
        return activated;
    },
    deactivate: function () {
        var deactivated = OpenLayers.Control.prototype.deactivate.apply(this, arguments);
        if (this.map && this.map.events) {
            this.map.events.un({
                moveend: this.updateContainerCenter,
                scope: this
            });
        }
        return deactivated;
    },
    updateContainerCenter: function () {
        var container = this.map.layerContainerDiv;
        this.containerCenter = {
            x: parseInt(container.style.left, 10) + 50,
            y: parseInt(container.style.top, 10) + 50
        };
    },
    pinchStart: function (evt, pinchData) {
        this.pinchOrigin = evt.xy;
        this.currentCenter = evt.xy;
    },
    pinchMove: function (evt, pinchData) {
        var scale = pinchData.scale;
        var containerCenter = this.containerCenter;
        var pinchOrigin = this.pinchOrigin;
        var current = evt.xy;
        var dx = Math.round((current.x - pinchOrigin.x) + (scale - 1) * (containerCenter.x - pinchOrigin.x));
        var dy = Math.round((current.y - pinchOrigin.y) + (scale - 1) * (containerCenter.y - pinchOrigin.y));
        this.applyTransform("translate(" + dx + "px, " + dy + "px) scale(" + scale + ")");
        this.currentCenter = current;
    },
    applyTransform: function (transform) {
        var style = this.map.layerContainerDiv.style;
        style['-webkit-transform'] = transform;
        style['-moz-transform'] = transform;
    },
    pinchDone: function (evt, start, last) {
        this.applyTransform("");
        var zoom = this.map.getZoomForResolution(this.map.getResolution() / last.scale, true);
        if (zoom !== this.map.getZoom() || !this.currentCenter.equals(this.pinchOrigin)) {
            var resolution = this.map.getResolutionForZoom(zoom);
            var location = this.map.getLonLatFromPixel(this.pinchOrigin);
            var zoomPixel = this.currentCenter;
            var size = this.map.getSize();
            location.lon += resolution * ((size.w / 2) - zoomPixel.x);
            location.lat -= resolution * ((size.h / 2) - zoomPixel.y);
            this.map.div.clientWidth = this.map.div.clientWidth;
            this.map.setCenter(location, zoom);
        }
    },
    CLASS_NAME: "OpenLayers.Control.PinchZoom"
});
OpenLayers.Control.TouchNavigation = OpenLayers.Class(OpenLayers.Control, {
    dragPan: null,
    dragPanOptions: null,
    pinchZoom: null,
    pinchZoomOptions: null,
    clickHandlerOptions: null,
    documentDrag: false,
    autoActivate: true,
    initialize: function (options) {
        this.handlers = {};
        OpenLayers.Control.prototype.initialize.apply(this, arguments);
    },
    destroy: function () {
        this.deactivate();
        if (this.dragPan) {
            this.dragPan.destroy();
        }
        this.dragPan = null;
        if (this.pinchZoom) {
            this.pinchZoom.destroy();
            delete this.pinchZoom;
        }
        OpenLayers.Control.prototype.destroy.apply(this, arguments);
    },
    activate: function () {
        if (OpenLayers.Control.prototype.activate.apply(this, arguments)) {
            this.dragPan.activate();
            this.handlers.click.activate();
            this.pinchZoom.activate();
            return true;
        }
        return false;
    },
    deactivate: function () {
        if (OpenLayers.Control.prototype.deactivate.apply(this, arguments)) {
            this.dragPan.deactivate();
            this.handlers.click.deactivate();
            this.pinchZoom.deactivate();
            return true;
        }
        return false;
    },
    draw: function () {
        var clickCallbacks = {
            click: this.defaultClick,
            dblclick: this.defaultDblClick
        };
        var clickOptions = OpenLayers.Util.extend({
            "double": true,
            stopDouble: true,
            pixelTolerance: 2
        }, this.clickHandlerOptions);
        this.handlers.click = new OpenLayers.Handler.Click(this, clickCallbacks, clickOptions);
        this.dragPan = new OpenLayers.Control.DragPan(OpenLayers.Util.extend({
            map: this.map,
            documentDrag: this.documentDrag
        }, this.dragPanOptions));
        this.dragPan.draw();
        this.pinchZoom = new OpenLayers.Control.PinchZoom(OpenLayers.Util.extend({
            map: this.map
        }, this.pinchZoomOptions));
    },
    defaultClick: function (evt) {
        if (evt.lastTouches && evt.lastTouches.length == 2) {
            this.map.zoomOut();
        }
    },
    defaultDblClick: function (evt) {
        var newCenter = this.map.getLonLatFromViewPortPx(evt.xy);
        this.map.setCenter(newCenter, this.map.zoom + 1);
    },
    CLASS_NAME: "OpenLayers.Control.TouchNavigation"
});

OpenLayers.Control.OverviewMap = OpenLayers.Class(OpenLayers.Control, {
    element: null,
    ovmap: null,
    size: {
        w: 180,
        h: 90
    },
    layers: null,
    minRectSize: 15,
    minRectDisplayClass: "RectReplacement",
    minRatio: 8,
    maxRatio: 32,
    mapOptions: null,
    autoPan: false,
    handlers: null,
    resolutionFactor: 1,
    maximized: false,
    initialize: function (options) {
        this.layers = [];
        this.handlers = {};
        OpenLayers.Control.prototype.initialize.apply(this, [options]);
    },
    destroy: function () {
        if (!this.mapDiv) {
            return;
        }
        if (this.handlers.click) {
            this.handlers.click.destroy();
        }
        if (this.handlers.drag) {
            this.handlers.drag.destroy();
        }
        this.ovmap && this.ovmap.viewPortDiv.removeChild(this.extentRectangle);
        this.extentRectangle = null;
        if (this.rectEvents) {
            this.rectEvents.destroy();
            this.rectEvents = null;
        }
        if (this.ovmap) {
            this.ovmap.destroy();
            this.ovmap = null;
        }
        this.element.removeChild(this.mapDiv);
        this.mapDiv = null;
        this.div.removeChild(this.element);
        this.element = null;
        if (this.maximizeDiv) {
            this.div.removeChild(this.maximizeDiv);
            this.maximizeDiv = null;
        }
        if (this.minimizeDiv) {
            this.div.removeChild(this.minimizeDiv);
            this.minimizeDiv = null;
        }
        this.map.events.un({
            buttonclick: this.onButtonClick,
            moveend: this.update,
            changebaselayer: this.baseLayerDraw,
            scope: this
        });
        OpenLayers.Control.prototype.destroy.apply(this, arguments);
    },
    draw: function () {
        OpenLayers.Control.prototype.draw.apply(this, arguments);
        if (this.layers.length === 0) {
            if (this.map.baseLayer) {
                var layer = this.map.baseLayer.clone();
                this.layers = [layer];
            } else {
                this.map.events.register("changebaselayer", this, this.baseLayerDraw);
                return this.div;
            }
        }
        this.element = document.createElement('div');
        this.element.className = this.displayClass + 'Element';
        this.element.style.display = 'none';
        this.mapDiv = document.createElement('div');
        this.mapDiv.style.width = this.size.w + 'px';
        this.mapDiv.style.height = this.size.h + 'px';
        this.mapDiv.style.position = 'relative';
        this.mapDiv.style.overflow = 'hidden';
        this.mapDiv.id = OpenLayers.Util.createUniqueID('overviewMap');
        this.extentRectangle = document.createElement('div');
        this.extentRectangle.style.position = 'absolute';
        this.extentRectangle.style.zIndex = 1000;
        this.extentRectangle.className = this.displayClass + 'ExtentRectangle';
        this.element.appendChild(this.mapDiv);
        this.div.appendChild(this.element);
        if (!this.outsideViewport) {
            this.div.className += " " + this.displayClass + 'Container';
            var img = OpenLayers.Util.getImageLocation('layer-switcher-maximize.png');
            this.maximizeDiv = OpenLayers.Util.createAlphaImageDiv(this.displayClass + 'MaximizeButton', null, null, img, 'absolute');
            this.maximizeDiv.style.display = 'none';
            this.maximizeDiv.className = this.displayClass + 'MaximizeButton olButton';
            this.div.appendChild(this.maximizeDiv);
            var img = OpenLayers.Util.getImageLocation('layer-switcher-minimize.png');
            this.minimizeDiv = OpenLayers.Util.createAlphaImageDiv('OpenLayers_Control_minimizeDiv', null, null, img, 'absolute');
            this.minimizeDiv.style.display = 'none';
            this.minimizeDiv.className = this.displayClass + 'MinimizeButton olButton';
            this.div.appendChild(this.minimizeDiv);
            this.minimizeControl();
        } else {
            this.element.style.display = '';
        }
        if (this.map.getExtent()) {
            this.update();
        }
        this.map.events.on({
            buttonclick: this.onButtonClick,
            moveend: this.update,
            scope: this
        });
        if (this.maximized) {
            this.maximizeControl();
        }
        return this.div;
    },
    baseLayerDraw: function () {
        this.draw();
        this.map.events.unregister("changebaselayer", this, this.baseLayerDraw);
    },
    rectDrag: function (px) {
        var deltaX = this.handlers.drag.last.x - px.x;
        var deltaY = this.handlers.drag.last.y - px.y;
        if (deltaX != 0 || deltaY != 0) {
            var rectTop = this.rectPxBounds.top;
            var rectLeft = this.rectPxBounds.left;
            var rectHeight = Math.abs(this.rectPxBounds.getHeight());
            var rectWidth = this.rectPxBounds.getWidth();
            var newTop = Math.max(0, (rectTop - deltaY));
            newTop = Math.min(newTop, this.ovmap.size.h - this.hComp - rectHeight);
            var newLeft = Math.max(0, (rectLeft - deltaX));
            newLeft = Math.min(newLeft, this.ovmap.size.w - this.wComp - rectWidth);
            this.setRectPxBounds(new OpenLayers.Bounds(newLeft, newTop + rectHeight, newLeft + rectWidth, newTop));
        }
    },
    mapDivClick: function (evt) {
        var pxCenter = this.rectPxBounds.getCenterPixel();
        var deltaX = evt.xy.x - pxCenter.x;
        var deltaY = evt.xy.y - pxCenter.y;
        var top = this.rectPxBounds.top;
        var left = this.rectPxBounds.left;
        var height = Math.abs(this.rectPxBounds.getHeight());
        var width = this.rectPxBounds.getWidth();
        var newTop = Math.max(0, (top + deltaY));
        newTop = Math.min(newTop, this.ovmap.size.h - height);
        var newLeft = Math.max(0, (left + deltaX));
        newLeft = Math.min(newLeft, this.ovmap.size.w - width);
        this.setRectPxBounds(new OpenLayers.Bounds(newLeft, newTop + height, newLeft + width, newTop));
        this.updateMapToRect();
    },
    onButtonClick: function (evt) {
        if (evt.buttonElement === this.minimizeDiv) {
            this.minimizeControl();
        } else if (evt.buttonElement === this.maximizeDiv) {
            this.maximizeControl();
        }
    },
    maximizeControl: function (e) {
        this.element.style.display = '';
        this.showToggle(false);
        if (e != null) {
            OpenLayers.Event.stop(e);
        }
    },
    minimizeControl: function (e) {
        this.element.style.display = 'none';
        this.showToggle(true);
        if (e != null) {
            OpenLayers.Event.stop(e);
        }
    },
    showToggle: function (minimize) {
        this.maximizeDiv.style.display = minimize ? '' : 'none';
        this.minimizeDiv.style.display = minimize ? 'none' : '';
    },
    update: function () {
        if (this.ovmap == null) {
            this.createMap();
        }
        if (this.autoPan || !this.isSuitableOverview()) {
            this.updateOverview();
        }
        this.updateRectToMap();
    },
    isSuitableOverview: function () {
        var mapExtent = this.map.getExtent();
        var maxExtent = this.map.maxExtent;
        var testExtent = new OpenLayers.Bounds(Math.max(mapExtent.left, maxExtent.left), Math.max(mapExtent.bottom, maxExtent.bottom), Math.min(mapExtent.right, maxExtent.right), Math.min(mapExtent.top, maxExtent.top));
        if (this.ovmap.getProjection() != this.map.getProjection()) {
            testExtent = testExtent.transform(this.map.getProjectionObject(), this.ovmap.getProjectionObject());
        }
        var resRatio = this.ovmap.getResolution() / this.map.getResolution();
        return ((resRatio > this.minRatio) && (resRatio <= this.maxRatio) && (this.ovmap.getExtent().containsBounds(testExtent)));
    },
    updateOverview: function () {
        var mapRes = this.map.getResolution();
        var targetRes = this.ovmap.getResolution();
        var resRatio = targetRes / mapRes;
        if (resRatio > this.maxRatio) {
            targetRes = this.minRatio * mapRes;
        } else if (resRatio <= this.minRatio) {
            targetRes = this.maxRatio * mapRes;
        }
        var center;
        if (this.ovmap.getProjection() != this.map.getProjection()) {
            center = this.map.center.clone();
            center.transform(this.map.getProjectionObject(), this.ovmap.getProjectionObject());
        } else {
            center = this.map.center;
        }
        this.ovmap.setCenter(center, this.ovmap.getZoomForResolution(targetRes * this.resolutionFactor));
        this.updateRectToMap();
    },
    createMap: function () {
        var options = OpenLayers.Util.extend({
            controls: [],
            maxResolution: 'auto',
            fallThrough: false
        }, this.mapOptions);
        this.ovmap = new OpenLayers.Map(this.mapDiv, options);
        this.ovmap.viewPortDiv.appendChild(this.extentRectangle);
        OpenLayers.Event.stopObserving(window, 'unload', this.ovmap.unloadDestroy);
        this.ovmap.addLayers(this.layers);
        this.ovmap.zoomToMaxExtent();
        this.wComp = parseInt(OpenLayers.Element.getStyle(this.extentRectangle, 'border-left-width')) +
            parseInt(OpenLayers.Element.getStyle(this.extentRectangle, 'border-right-width'));
        this.wComp = (this.wComp) ? this.wComp : 2;
        this.hComp = parseInt(OpenLayers.Element.getStyle(this.extentRectangle, 'border-top-width')) +
            parseInt(OpenLayers.Element.getStyle(this.extentRectangle, 'border-bottom-width'));
        this.hComp = (this.hComp) ? this.hComp : 2;
        this.handlers.drag = new OpenLayers.Handler.Drag(this, {
            move: this.rectDrag,
            done: this.updateMapToRect
        }, {
            map: this.ovmap
        });
        this.handlers.click = new OpenLayers.Handler.Click(this, {
            "click": this.mapDivClick
        }, {
            "single": true,
            "double": false,
            "stopSingle": true,
            "stopDouble": true,
            "pixelTolerance": 1,
            map: this.ovmap
        });
        this.handlers.click.activate();
        this.rectEvents = new OpenLayers.Events(this, this.extentRectangle, null, true);
        this.rectEvents.register("mouseover", this, function (e) {
            if (!this.handlers.drag.active && !this.map.dragging) {
                this.handlers.drag.activate();
            }
        });
        this.rectEvents.register("mouseout", this, function (e) {
            if (!this.handlers.drag.dragging) {
                this.handlers.drag.deactivate();
            }
        });
        if (this.ovmap.getProjection() != this.map.getProjection()) {
            var sourceUnits = this.map.getProjectionObject().getUnits() || this.map.units || this.map.baseLayer.units;
            var targetUnits = this.ovmap.getProjectionObject().getUnits() || this.ovmap.units || this.ovmap.baseLayer.units;
            this.resolutionFactor = sourceUnits && targetUnits ? OpenLayers.INCHES_PER_UNIT[sourceUnits] / OpenLayers.INCHES_PER_UNIT[targetUnits] : 1;
        }
    },
    updateRectToMap: function () {
        var bounds;
        if (this.ovmap.getProjection() != this.map.getProjection()) {
            bounds = this.map.getExtent().transform(this.map.getProjectionObject(), this.ovmap.getProjectionObject());
        } else {
            bounds = this.map.getExtent();
        }
        var pxBounds = this.getRectBoundsFromMapBounds(bounds);
        if (pxBounds) {
            this.setRectPxBounds(pxBounds);
        }
    },
    updateMapToRect: function () {
        var lonLatBounds = this.getMapBoundsFromRectBounds(this.rectPxBounds);
        if (this.ovmap.getProjection() != this.map.getProjection()) {
            lonLatBounds = lonLatBounds.transform(this.ovmap.getProjectionObject(), this.map.getProjectionObject());
        }
        this.map.panTo(lonLatBounds.getCenterLonLat());
    },
    setRectPxBounds: function (pxBounds) {
        var top = Math.max(pxBounds.top, 0);
        var left = Math.max(pxBounds.left, 0);
        var bottom = Math.min(pxBounds.top + Math.abs(pxBounds.getHeight()), this.ovmap.size.h - this.hComp);
        var right = Math.min(pxBounds.left + pxBounds.getWidth(), this.ovmap.size.w - this.wComp);
        var width = Math.max(right - left, 0);
        var height = Math.max(bottom - top, 0);
        if (width < this.minRectSize || height < this.minRectSize) {
            this.extentRectangle.className = this.displayClass +
                this.minRectDisplayClass;
            var rLeft = left + (width / 2) - (this.minRectSize / 2);
            var rTop = top + (height / 2) - (this.minRectSize / 2);
            this.extentRectangle.style.top = Math.round(rTop) + 'px';
            this.extentRectangle.style.left = Math.round(rLeft) + 'px';
            this.extentRectangle.style.height = this.minRectSize + 'px';
            this.extentRectangle.style.width = this.minRectSize + 'px';
        } else {
            this.extentRectangle.className = this.displayClass + 'ExtentRectangle';
            this.extentRectangle.style.top = Math.round(top) + 'px';
            this.extentRectangle.style.left = Math.round(left) + 'px';
            this.extentRectangle.style.height = Math.round(height) + 'px';
            this.extentRectangle.style.width = Math.round(width) + 'px';
        }
        this.rectPxBounds = new OpenLayers.Bounds(Math.round(left), Math.round(bottom), Math.round(right), Math.round(top));
    },
    getRectBoundsFromMapBounds: function (lonLatBounds) {
        var leftBottomPx = this.getOverviewPxFromLonLat({
            lon: lonLatBounds.left,
            lat: lonLatBounds.bottom
        });
        var rightTopPx = this.getOverviewPxFromLonLat({
            lon: lonLatBounds.right,
            lat: lonLatBounds.top
        });
        var bounds = null;
        if (leftBottomPx && rightTopPx) {
            bounds = new OpenLayers.Bounds(leftBottomPx.x, leftBottomPx.y, rightTopPx.x, rightTopPx.y);
        }
        return bounds;
    },
    getMapBoundsFromRectBounds: function (pxBounds) {
        var leftBottomLonLat = this.getLonLatFromOverviewPx({
            x: pxBounds.left,
            y: pxBounds.bottom
        });
        var rightTopLonLat = this.getLonLatFromOverviewPx({
            x: pxBounds.right,
            y: pxBounds.top
        });
        return new OpenLayers.Bounds(leftBottomLonLat.lon, leftBottomLonLat.lat, rightTopLonLat.lon, rightTopLonLat.lat);
    },
    getLonLatFromOverviewPx: function (overviewMapPx) {
        var size = this.ovmap.size;
        var res = this.ovmap.getResolution();
        var center = this.ovmap.getExtent().getCenterLonLat();
        var deltaX = overviewMapPx.x - (size.w / 2);
        var deltaY = overviewMapPx.y - (size.h / 2);
        return {
            lon: center.lon + deltaX * res,
            lat: center.lat - deltaY * res
        };
    },
    getOverviewPxFromLonLat: function (lonlat) {
        var res = this.ovmap.getResolution();
        var extent = this.ovmap.getExtent();
        if (extent) {
            return {
                x: Math.round(1 / res * (lonlat.lon - extent.left)),
                y: Math.round(1 / res * (extent.top - lonlat.lat))
            };
        }
    },
    CLASS_NAME: 'OpenLayers.Control.OverviewMap'
});
OpenLayers.Control.Zoom = OpenLayers.Class(OpenLayers.Control, {
    zoomInText: "+",
    zoomInId: "olZoomInLink",
    zoomOutText: "-",
    zoomOutId: "olZoomOutLink",
    draw: function () {
        var div = OpenLayers.Control.prototype.draw.apply(this),
            links = this.getOrCreateLinks(div),
            zoomIn = links.zoomIn,
            zoomOut = links.zoomOut,
            eventsInstance = this.map.events;
        if (zoomOut.parentNode !== div) {
            eventsInstance = this.events;
            eventsInstance.attachToElement(zoomOut.parentNode);
        }
        eventsInstance.register("buttonclick", this, this.onZoomClick);
        this.zoomInLink = zoomIn;
        this.zoomOutLink = zoomOut;
        return div;
    },
    getOrCreateLinks: function (el) {
        var zoomIn = document.getElementById(this.zoomInId),
            zoomOut = document.getElementById(this.zoomOutId);
        if (!zoomIn) {
            zoomIn = document.createElement("a");
            zoomIn.href = "#zoomIn";
            zoomIn.appendChild(document.createTextNode(this.zoomInText));
            zoomIn.className = "olControlZoomIn";
            el.appendChild(zoomIn);
        }
        OpenLayers.Element.addClass(zoomIn, "olButton");
        if (!zoomOut) {
            zoomOut = document.createElement("a");
            zoomOut.href = "#zoomOut";
            zoomOut.appendChild(document.createTextNode(this.zoomOutText));
            zoomOut.className = "olControlZoomOut";
            el.appendChild(zoomOut);
        }
        OpenLayers.Element.addClass(zoomOut, "olButton");
        return {
            zoomIn: zoomIn,
            zoomOut: zoomOut
        };
    },
    onZoomClick: function (evt) {
        var button = evt.buttonElement;
        if (button === this.zoomInLink) {
            this.map.zoomIn();
        } else if (button === this.zoomOutLink) {
            this.map.zoomOut();
        }
    },
    destroy: function () {
        if (this.map) {
            this.map.events.unregister("buttonclick", this, this.onZoomClick);
        }
        delete this.zoomInLink;
        delete this.zoomOutLink;
        OpenLayers.Control.prototype.destroy.apply(this);
    },
    CLASS_NAME: "OpenLayers.Control.Zoom"
});
OpenLayers.ProxyHost = "";
OpenLayers.Request = {
    DEFAULT_CONFIG: {
        method: "GET",
        url: window.location.href,
        async: true,
        user: undefined,
        password: undefined,
        params: null,
        proxy: OpenLayers.ProxyHost,
        headers: {},
        data: null,
        callback: function () {},
        success: null,
        failure: null,
        scope: null
    },
    URL_SPLIT_REGEX: /([^:]*:)\/\/([^:]*:?[^@]*@)?([^:\/\?]*):?([^\/\?]*)/,
    events: new OpenLayers.Events(this),
    makeSameOrigin: function (url, proxy) {
        var sameOrigin = url.indexOf("http") !== 0;
        var urlParts = !sameOrigin && url.match(this.URL_SPLIT_REGEX);
        if (urlParts) {
            var location = window.location;
            sameOrigin = urlParts[1] == location.protocol && urlParts[3] == location.hostname;
            var uPort = urlParts[4],
                lPort = location.port;
            if (uPort != 80 && uPort != "" || lPort != "80" && lPort != "") {
                sameOrigin = sameOrigin && uPort == lPort;
            }
        }
        if (!sameOrigin) {
            if (proxy) {
                if (typeof proxy == "function") {
                    url = proxy(url);
                } else {
                    url = proxy + encodeURIComponent(url);
                }
            } else {
                OpenLayers.Console.warn(OpenLayers.i18n("proxyNeeded"), {
                    url: url
                });
            }
        }
        return url;
    },
    issue: function (config) {
        var defaultConfig = OpenLayers.Util.extend(this.DEFAULT_CONFIG, {
            proxy: OpenLayers.ProxyHost
        });
        config = OpenLayers.Util.applyDefaults(config, defaultConfig);
        var customRequestedWithHeader = false,
            headerKey;
        for (headerKey in config.headers) {
            if (config.headers.hasOwnProperty(headerKey)) {
                if (headerKey.toLowerCase() === 'x-requested-with') {
                    customRequestedWithHeader = true;
                }
            }
        }
        if (customRequestedWithHeader === false) {
            config.headers['X-Requested-With'] = 'XMLHttpRequest';
        }
        var request = new OpenLayers.Request.XMLHttpRequest();
        var url = OpenLayers.Util.urlAppend(config.url, OpenLayers.Util.getParameterString(config.params || {}));
        url = OpenLayers.Request.makeSameOrigin(url, config.proxy);
        request.open(config.method, url, config.async, config.user, config.password);
        for (var header in config.headers) {
            request.setRequestHeader(header, config.headers[header]);
        }
        var events = this.events;
        var self = this;
        request.onreadystatechange = function () {
            if (request.readyState == OpenLayers.Request.XMLHttpRequest.DONE) {
                var proceed = events.triggerEvent("complete", {
                    request: request,
                    config: config,
                    requestUrl: url
                });
                if (proceed !== false) {
                    self.runCallbacks({
                        request: request,
                        config: config,
                        requestUrl: url
                    });
                }
            }
        };
        if (config.async === false) {
            request.send(config.data);
        } else {
            window.setTimeout(function () {
                if (request.readyState !== 0) {
                    request.send(config.data);
                }
            }, 0);
        }
        return request;
    },
    runCallbacks: function (options) {
        var request = options.request;
        var config = options.config;
        var complete = (config.scope) ? OpenLayers.Function.bind(config.callback, config.scope) : config.callback;
        var success;
        if (config.success) {
            success = (config.scope) ? OpenLayers.Function.bind(config.success, config.scope) : config.success;
        }
        var failure;
        if (config.failure) {
            failure = (config.scope) ? OpenLayers.Function.bind(config.failure, config.scope) : config.failure;
        }
        if (OpenLayers.Util.createUrlObject(config.url).protocol == "file:" && request.responseText) {
            request.status = 200;
        }
        complete(request);
        if (!request.status || (request.status >= 200 && request.status < 300)) {
            this.events.triggerEvent("success", options);
            if (success) {
                success(request);
            }
        }
        if (request.status && (request.status < 200 || request.status >= 300)) {
            this.events.triggerEvent("failure", options);
            if (failure) {
                failure(request);
            }
        }
    },
    GET: function (config) {
        config = OpenLayers.Util.extend(config, {
            method: "GET"
        });
        return OpenLayers.Request.issue(config);
    },
    POST: function (config) {
        config = OpenLayers.Util.extend(config, {
            method: "POST"
        });
        config.headers = config.headers ? config.headers : {};
        if (!("CONTENT-TYPE" in OpenLayers.Util.upperCaseObject(config.headers))) {
            config.headers["Content-Type"] = "application/xml";
        }
        return OpenLayers.Request.issue(config);
    },
    PUT: function (config) {
        config = OpenLayers.Util.extend(config, {
            method: "PUT"
        });
        config.headers = config.headers ? config.headers : {};
        if (!("CONTENT-TYPE" in OpenLayers.Util.upperCaseObject(config.headers))) {
            config.headers["Content-Type"] = "application/xml";
        }
        return OpenLayers.Request.issue(config);
    },
    DELETE: function (config) {
        config = OpenLayers.Util.extend(config, {
            method: "DELETE"
        });
        return OpenLayers.Request.issue(config);
    },
    HEAD: function (config) {
        config = OpenLayers.Util.extend(config, {
            method: "HEAD"
        });
        return OpenLayers.Request.issue(config);
    },
    OPTIONS: function (config) {
        config = OpenLayers.Util.extend(config, {
            method: "OPTIONS"
        });
        return OpenLayers.Request.issue(config);
    }
};
(function () {
    var oXMLHttpRequest = window.XMLHttpRequest;
    var bGecko = !! window.controllers,
        bIE = window.document.all && !window.opera,
        bIE7 = bIE && window.navigator.userAgent.match(/MSIE 7.0/);

    function fXMLHttpRequest() {
        this._object = oXMLHttpRequest && !bIE7 ? new oXMLHttpRequest : new window.ActiveXObject("Microsoft.XMLHTTP");
        this._listeners = [];
    };

    function cXMLHttpRequest() {
        return new fXMLHttpRequest;
    };
    cXMLHttpRequest.prototype = fXMLHttpRequest.prototype;
    if (bGecko && oXMLHttpRequest.wrapped)
        cXMLHttpRequest.wrapped = oXMLHttpRequest.wrapped;
    cXMLHttpRequest.UNSENT = 0;
    cXMLHttpRequest.OPENED = 1;
    cXMLHttpRequest.HEADERS_RECEIVED = 2;
    cXMLHttpRequest.LOADING = 3;
    cXMLHttpRequest.DONE = 4;
    cXMLHttpRequest.prototype.readyState = cXMLHttpRequest.UNSENT;
    cXMLHttpRequest.prototype.responseText = '';
    cXMLHttpRequest.prototype.responseXML = null;
    cXMLHttpRequest.prototype.status = 0;
    cXMLHttpRequest.prototype.statusText = '';
    cXMLHttpRequest.prototype.priority = "NORMAL";
    cXMLHttpRequest.prototype.onreadystatechange = null;
    cXMLHttpRequest.onreadystatechange = null;
    cXMLHttpRequest.onopen = null;
    cXMLHttpRequest.onsend = null;
    cXMLHttpRequest.onabort = null;
    cXMLHttpRequest.prototype.open = function (sMethod, sUrl, bAsync, sUser, sPassword) {
        delete this._headers;
        if (arguments.length < 3)
            bAsync = true;
        this._async = bAsync;
        var oRequest = this,
            nState = this.readyState,
            fOnUnload;
        if (bIE && bAsync) {
            fOnUnload = function () {
                if (nState != cXMLHttpRequest.DONE) {
                    fCleanTransport(oRequest);
                    oRequest.abort();
                }
            };
            window.attachEvent("onunload", fOnUnload);
        }
        if (cXMLHttpRequest.onopen)
            cXMLHttpRequest.onopen.apply(this, arguments);
        if (arguments.length > 4)
            this._object.open(sMethod, sUrl, bAsync, sUser, sPassword);
        else
        if (arguments.length > 3)
            this._object.open(sMethod, sUrl, bAsync, sUser);
        else
            this._object.open(sMethod, sUrl, bAsync);
        this.readyState = cXMLHttpRequest.OPENED;
        fReadyStateChange(this);
        this._object.onreadystatechange = function () {
            if (bGecko && !bAsync)
                return;
            oRequest.readyState = oRequest._object.readyState;
            fSynchronizeValues(oRequest);
            if (oRequest._aborted) {
                oRequest.readyState = cXMLHttpRequest.UNSENT;
                return;
            }
            if (oRequest.readyState == cXMLHttpRequest.DONE) {
                delete oRequest._data;
                fCleanTransport(oRequest);
                if (bIE && bAsync)
                    window.detachEvent("onunload", fOnUnload);
            }
            if (nState != oRequest.readyState)
                fReadyStateChange(oRequest);
            nState = oRequest.readyState;
        }
    };

    function fXMLHttpRequest_send(oRequest) {
        oRequest._object.send(oRequest._data);
        if (bGecko && !oRequest._async) {
            oRequest.readyState = cXMLHttpRequest.OPENED;
            fSynchronizeValues(oRequest);
            while (oRequest.readyState < cXMLHttpRequest.DONE) {
                oRequest.readyState++;
                fReadyStateChange(oRequest);
                if (oRequest._aborted)
                    return;
            }
        }
    };
    cXMLHttpRequest.prototype.send = function (vData) {
        if (cXMLHttpRequest.onsend)
            cXMLHttpRequest.onsend.apply(this, arguments);
        if (!arguments.length)
            vData = null;
        if (vData && vData.nodeType) {
            vData = window.XMLSerializer ? new window.XMLSerializer().serializeToString(vData) : vData.xml;
            if (!this._headers["Content-Type"])
                this._object.setRequestHeader("Content-Type", "application/xml");
        }
        this._data = vData;
        fXMLHttpRequest_send(this);
    };
    cXMLHttpRequest.prototype.abort = function () {
        if (cXMLHttpRequest.onabort)
            cXMLHttpRequest.onabort.apply(this, arguments);
        if (this.readyState > cXMLHttpRequest.UNSENT)
            this._aborted = true;
        this._object.abort();
        fCleanTransport(this);
        this.readyState = cXMLHttpRequest.UNSENT;
        delete this._data;
    };
    cXMLHttpRequest.prototype.getAllResponseHeaders = function () {
        return this._object.getAllResponseHeaders();
    };
    cXMLHttpRequest.prototype.getResponseHeader = function (sName) {
        return this._object.getResponseHeader(sName);
    };
    cXMLHttpRequest.prototype.setRequestHeader = function (sName, sValue) {
        if (!this._headers)
            this._headers = {};
        this._headers[sName] = sValue;
        return this._object.setRequestHeader(sName, sValue);
    };
    cXMLHttpRequest.prototype.addEventListener = function (sName, fHandler, bUseCapture) {
        for (var nIndex = 0, oListener; oListener = this._listeners[nIndex]; nIndex++)
            if (oListener[0] == sName && oListener[1] == fHandler && oListener[2] == bUseCapture)
                return;
        this._listeners.push([sName, fHandler, bUseCapture]);
    };
    cXMLHttpRequest.prototype.removeEventListener = function (sName, fHandler, bUseCapture) {
        for (var nIndex = 0, oListener; oListener = this._listeners[nIndex]; nIndex++)
            if (oListener[0] == sName && oListener[1] == fHandler && oListener[2] == bUseCapture)
                break;
        if (oListener)
            this._listeners.splice(nIndex, 1);
    };
    cXMLHttpRequest.prototype.dispatchEvent = function (oEvent) {
        var oEventPseudo = {
            'type': oEvent.type,
            'target': this,
            'currentTarget': this,
            'eventPhase': 2,
            'bubbles': oEvent.bubbles,
            'cancelable': oEvent.cancelable,
            'timeStamp': oEvent.timeStamp,
            'stopPropagation': function () {},
            'preventDefault': function () {},
            'initEvent': function () {}
        };
        if (oEventPseudo.type == "readystatechange" && this.onreadystatechange)
            (this.onreadystatechange.handleEvent || this.onreadystatechange).apply(this, [oEventPseudo]);
        for (var nIndex = 0, oListener; oListener = this._listeners[nIndex]; nIndex++)
            if (oListener[0] == oEventPseudo.type && !oListener[2])
                (oListener[1].handleEvent || oListener[1]).apply(this, [oEventPseudo]);
    };
    cXMLHttpRequest.prototype.toString = function () {
        return '[' + "object" + ' ' + "XMLHttpRequest" + ']';
    };
    cXMLHttpRequest.toString = function () {
        return '[' + "XMLHttpRequest" + ']';
    };

    function fReadyStateChange(oRequest) {
        if (cXMLHttpRequest.onreadystatechange)
            cXMLHttpRequest.onreadystatechange.apply(oRequest);
        oRequest.dispatchEvent({
            'type': "readystatechange",
            'bubbles': false,
            'cancelable': false,
            'timeStamp': new Date + 0
        });
    };

    function fGetDocument(oRequest) {
        var oDocument = oRequest.responseXML,
            sResponse = oRequest.responseText;
        if (bIE && sResponse && oDocument && !oDocument.documentElement && oRequest.getResponseHeader("Content-Type").match(/[^\/]+\/[^\+]+\+xml/)) {
            oDocument = new window.ActiveXObject("Microsoft.XMLDOM");
            oDocument.async = false;
            oDocument.validateOnParse = false;
            oDocument.loadXML(sResponse);
        }
        if (oDocument)
            if ((bIE && oDocument.parseError != 0) || !oDocument.documentElement || (oDocument.documentElement && oDocument.documentElement.tagName == "parsererror"))
                return null;
        return oDocument;
    };

    function fSynchronizeValues(oRequest) {
        try {
            oRequest.responseText = oRequest._object.responseText;
        } catch (e) {}
        try {
            oRequest.responseXML = fGetDocument(oRequest._object);
        } catch (e) {}
        try {
            oRequest.status = oRequest._object.status;
        } catch (e) {}
        try {
            oRequest.statusText = oRequest._object.statusText;
        } catch (e) {}
    };

    function fCleanTransport(oRequest) {
        oRequest._object.onreadystatechange = new window.Function;
    };
    if (!window.Function.prototype.apply) {
        window.Function.prototype.apply = function (oRequest, oArguments) {
            if (!oArguments)
                oArguments = [];
            oRequest.__func = this;
            oRequest.__func(oArguments[0], oArguments[1], oArguments[2], oArguments[3], oArguments[4]);
            delete oRequest.__func;
        };
    };
    OpenLayers.Request.XMLHttpRequest = cXMLHttpRequest;
})();
OpenLayers.Handler.Keyboard = OpenLayers.Class(OpenLayers.Handler, {
    KEY_EVENTS: ["keydown", "keyup"],
    eventListener: null,
    observeElement: null,
    initialize: function (control, callbacks, options) {
        OpenLayers.Handler.prototype.initialize.apply(this, arguments);
        this.eventListener = OpenLayers.Function.bindAsEventListener(this.handleKeyEvent, this);
    },
    destroy: function () {
        this.deactivate();
        this.eventListener = null;
        OpenLayers.Handler.prototype.destroy.apply(this, arguments);
    },
    activate: function () {
        if (OpenLayers.Handler.prototype.activate.apply(this, arguments)) {
            this.observeElement = this.observeElement || document;
            for (var i = 0, len = this.KEY_EVENTS.length; i < len; i++) {
                OpenLayers.Event.observe(this.observeElement, this.KEY_EVENTS[i], this.eventListener);
            }
            return true;
        } else {
            return false;
        }
    },
    deactivate: function () {
        var deactivated = false;
        if (OpenLayers.Handler.prototype.deactivate.apply(this, arguments)) {
            for (var i = 0, len = this.KEY_EVENTS.length; i < len; i++) {
                OpenLayers.Event.stopObserving(this.observeElement, this.KEY_EVENTS[i], this.eventListener);
            }
            deactivated = true;
        }
        return deactivated;
    },
    handleKeyEvent: function (evt) {
        if (this.checkModifiers(evt)) {
            this.callback(evt.type, [evt]);
        }
    },
    CLASS_NAME: "OpenLayers.Handler.Keyboard"
});
OpenLayers.Control.KeyboardDefaults = OpenLayers.Class(OpenLayers.Control, {
    autoActivate: true,
    slideFactor: 75,
    observeElement: null,
    draw: function () {
        var observeElement = this.observeElement || document;
        this.handler = new OpenLayers.Handler.Keyboard(this, {
            "keydown": this.defaultKeyPress
        }, {
            observeElement: observeElement
        });
    },
    defaultKeyPress: function (evt) {
        var size, handled = true;
        switch (evt.keyCode) {
        case OpenLayers.Event.KEY_LEFT:
            this.map.pan(-this.slideFactor, 0);
            break;
        case OpenLayers.Event.KEY_RIGHT:
            this.map.pan(this.slideFactor, 0);
            break;
        case OpenLayers.Event.KEY_UP:
            this.map.pan(0, -this.slideFactor);
            break;
        case OpenLayers.Event.KEY_DOWN:
            this.map.pan(0, this.slideFactor);
            break;
        case 33:
            size = this.map.getSize();
            this.map.pan(0, -0.75 * size.h);
            break;
        case 34:
            size = this.map.getSize();
            this.map.pan(0, 0.75 * size.h);
            break;
        case 35:
            size = this.map.getSize();
            this.map.pan(0.75 * size.w, 0);
            break;
        case 36:
            size = this.map.getSize();
            this.map.pan(-0.75 * size.w, 0);
            break;
        case 43:
        case 61:
        case 187:
        case 107:
            this.map.zoomIn();
            break;
        case 45:
        case 109:
        case 189:
        case 95:
            this.map.zoomOut();
            break;
        default:
            handled = false;
        }
        if (handled) {
            OpenLayers.Event.stop(evt);
        }
    },
    CLASS_NAME: "OpenLayers.Control.KeyboardDefaults"
});
OpenLayers.Layer.Zoomify = OpenLayers.Class(OpenLayers.Layer.Grid, {
    size: null,
    isBaseLayer: true,
    standardTileSize: 256,
    tileOriginCorner: "tl",
    numberOfTiers: 0,
    tileCountUpToTier: null,
    tierSizeInTiles: null,
    tierImageSize: null,
    initialize: function (name, url, size, options) {
        this.initializeZoomify(size);
        OpenLayers.Layer.Grid.prototype.initialize.apply(this, [name, url, size, {},
            options
        ]);
    },
    initializeZoomify: function (size) {
        var imageSize = size.clone();
        var tiles = new OpenLayers.Size(Math.ceil(imageSize.w / this.standardTileSize), Math.ceil(imageSize.h / this.standardTileSize));
        this.tierSizeInTiles = [tiles];
        this.tierImageSize = [imageSize];
        while (imageSize.w > this.standardTileSize || imageSize.h > this.standardTileSize) {
            imageSize = new OpenLayers.Size(Math.floor(imageSize.w / 2), Math.floor(imageSize.h / 2));
            tiles = new OpenLayers.Size(Math.ceil(imageSize.w / this.standardTileSize), Math.ceil(imageSize.h / this.standardTileSize));
            this.tierSizeInTiles.push(tiles);
            this.tierImageSize.push(imageSize);
        }
        this.tierSizeInTiles.reverse();
        this.tierImageSize.reverse();
        this.numberOfTiers = this.tierSizeInTiles.length;
        this.tileCountUpToTier = [0];
        for (var i = 1; i < this.numberOfTiers; i++) {
            this.tileCountUpToTier.push(this.tierSizeInTiles[i - 1].w * this.tierSizeInTiles[i - 1].h +
                this.tileCountUpToTier[i - 1]);
        }
    },
    destroy: function () {
        OpenLayers.Layer.Grid.prototype.destroy.apply(this, arguments);
        this.tileCountUpToTier.length = 0;
        this.tierSizeInTiles.length = 0;
        this.tierImageSize.length = 0;
    },
    clone: function (obj) {
        if (obj == null) {
            obj = new OpenLayers.Layer.Zoomify(this.name, this.url, this.size, this.options);
        }
        obj = OpenLayers.Layer.Grid.prototype.clone.apply(this, [obj]);
        return obj;
    },
    getURL: function (bounds) {
        bounds = this.adjustBounds(bounds);
        var res = this.map.getResolution();
        var x = Math.round((bounds.left - this.tileOrigin.lon) / (res * this.tileSize.w));
        var y = Math.round((this.tileOrigin.lat - bounds.top) / (res * this.tileSize.h));
        var z = this.map.getZoom();
        var tileIndex = x + y * this.tierSizeInTiles[z].w + this.tileCountUpToTier[z];
        var path = "TileGroup" + Math.floor((tileIndex) / 256) + "/" + z + "-" + x + "-" + y + ".jpg";
        var url = this.url;
        if (OpenLayers.Util.isArray(url)) {
            url = this.selectUrl(path, url);
        }
        return url + path;
    },
    getImageSize: function () {
        if (arguments.length > 0) {
            var bounds = this.adjustBounds(arguments[0]);
            var res = this.map.getResolution();
            var x = Math.round((bounds.left - this.tileOrigin.lon) / (res * this.tileSize.w));
            var y = Math.round((this.tileOrigin.lat - bounds.top) / (res * this.tileSize.h));
            var z = this.map.getZoom();
            var w = this.standardTileSize;
            var h = this.standardTileSize;
            if (x == this.tierSizeInTiles[z].w - 1) {
                var w = this.tierImageSize[z].w % this.standardTileSize;
                if (w == 0) {
                    w = this.standardTileSize;
                }
            }
            if (y == this.tierSizeInTiles[z].h - 1) {
                var h = this.tierImageSize[z].h % this.standardTileSize;
                if (h == 0) {
                    h = this.standardTileSize;
                }
            }
            if (x == this.tierSizeInTiles[z].w) {
                w = Math.ceil(this.size.w / Math.pow(2, this.numberOfTiers - 1 - z) - this.tierImageSize[z].w);
            }
            if (y == this.tierSizeInTiles[z].h) {
                h = Math.ceil(this.size.h / Math.pow(2, this.numberOfTiers - 1 - z) - this.tierImageSize[z].h);
            }
            return (new OpenLayers.Size(w, h));
        } else {
            return this.tileSize;
        }
    },
    setMap: function (map) {
        OpenLayers.Layer.Grid.prototype.setMap.apply(this, arguments);
        this.tileOrigin = new OpenLayers.LonLat(this.map.maxExtent.left, this.map.maxExtent.top);
    },
    calculateGridLayout: function (bounds, origin, resolution) {
        var tilelon = resolution * this.tileSize.w;
        var tilelat = resolution * this.tileSize.h;
        var offsetlon = bounds.left - origin.lon;
        var tilecol = Math.floor(offsetlon / tilelon) - this.buffer;
        var tilecolremain = offsetlon / tilelon - tilecol;
        var tileoffsetx = -tilecolremain * this.tileSize.w;
        var tileoffsetlon = origin.lon + tilecol * tilelon;
        var offsetlat = origin.lat - bounds.top + tilelat;
        var tilerow = Math.floor(offsetlat / tilelat) - this.buffer;
        var tilerowremain = tilerow - offsetlat / tilelat;
        var tileoffsety = tilerowremain * this.tileSize.h;
        var tileoffsetlat = origin.lat - tilelat * tilerow;
        return {
            tilelon: tilelon,
            tilelat: tilelat,
            tileoffsetlon: tileoffsetlon,
            tileoffsetlat: tileoffsetlat,
            tileoffsetx: tileoffsetx,
            tileoffsety: tileoffsety
        };
    },
    CLASS_NAME: "OpenLayers.Layer.Zoomify"
});
//-------- spritespin --------//
(function () {
  var Loader = this.SpriteLoader = {};
  Loader.preload = function(images, callback){
    if (typeof (images) === "string") { images = [images]; }
    var i, data = {
      callback : callback,
      numLoaded: 0,
      numImages: images.length,
      images   : []
    };
    for (i = 0; i < images.length; i += 1 ) {
      Loader.load(images[i], data); 
    }
  };
  Loader.load = function(imageSource, data){
    var image = new Image();
    data.images.push(image);
    image.onload = function(){
      data.numLoaded += 1;
      if (data.numLoaded === data.numImages) { 
        data.callback(data.images); 
      }
    }; 
    image.src = imageSource;
  };
}());
(function($, window) {
  var Spin = window.SpriteSpin = {};
  var api = Spin.api = {};
  Spin.modules = {};
  Spin.behaviors = {};
      
  Spin.disableSelection = function(e){
    e.attr('unselectable', 'on')
     .css({
        "-moz-user-select": "none",
        "-khtml-user-select": "none",
        "-webkit-user-select": "none",
        "user-select": 'none'
     })
     .on('selectstart', false);
    return e;
  };

  Spin.updateInput = function(e, data){
    if (e.touches === undefined && e.originalEvent !== undefined){
      // jQuery Event normalization does not preserve the 'event.touches'
      // try to grab touches from the original event
      e.touches = e.originalEvent.touches;
    }
    
    data.oldX = data.currentX;
    data.oldY = data.currentY;
    
    if (e.touches !== undefined && e.touches.length > 0){
      data.currentX = e.touches[0].clientX;
      data.currentY = e.touches[0].clientY;
    } else {
      data.currentX = e.clientX;
      data.currentY = e.clientY;
    }
    
    if (data.startX === undefined || data.startY === undefined){
      data.startX = data.currentX;
      data.startY = data.currentY;
      data.clickframe = data.frame;
    }
    
    if (data.oldX === undefined || data.oldY === undefined){
      data.oldX = data.currentX;
      data.oldY = data.currentY;
    }
    
    // total drag distance
    data.dX = data.currentX - data.startX;
    data.dY = data.currentY - data.startY;
    data.dW = data.dX * data.dragDirX + data.dY * data.dragDirY;
    
    // frame drag distance
    data.ddX = data.currentX - data.oldX;
    data.ddY = data.currentY - data.oldY;
    data.ddW = data.ddX * data.dragDirX + data.ddY * data.dragDirY;
    
    return false;
  };
  
  Spin.resetInput = function(data){
    // initial touch or click position
    data.startX = undefined;
    data.startY = undefined;
    // touch or click position in current frame
    data.currentX = undefined;
    data.currentY = undefined;
    // touch or click position in last frame
    data.oldX = undefined;
    data.oldY = undefined;
    // total drag distance, respecting the start position
    data.dX = 0;
    data.dY = 0;
    data.dW = 0;
    // total drag distance, respecting the last frame position
    data.ddX = 0;
    data.ddY = 0;
    data.ddW = 0;
    
    if (typeof(data.module.resetInput) === "function"){
      data.module.resetInput(data);
    }
  };
  
  Spin.clamp = function(value, min, max){ 
    return (value > max ? max : (value < min ? min : value));
  };
  
  Spin.wrap = function(value, min, max, size){
    while (value > max){ value -= size; } 
    while (value < min){ value += size; }
    return value;
  };
  
  Spin.reload = function(data, andInit){
    if (andInit && data.module.initialize){
      data.module.initialize(data);
    }
    
    Spin.prepareBackground(data);
    Spin.preloadImages(data, function(){
      Spin.rebindEvents(data);
      data.module.reload(data);
      data.target.trigger("onLoad", data);
    });
  };
  
  Spin.preloadImages = function(data, callback) {
    data.preload.fadeIn(250, function(){
      SpriteLoader.preload(data.source, function(images){
        data.preload.fadeOut(250, function() {
            data.preload.hide();
        });
        data.stage.show();
        if (data.canvas){
          data.canvas.show();
        }
        data.images = images;
        callback.apply(data.target, [data]);
      });
    });
  };
  
  Spin.prepareBackground = function(data){
    var w = [data.width, "px"].join("");
    var h = [data.height, "px"].join("");
    
    data.target.css({ 
      width    : w, 
      height   : h,
      position : "relative"
    });
    
    var css = {
      width    : w, 
      height   : h,
      top      : "0px", 
      left     : "0px",
      position : "absolute"  
    };
    $.extend(css, data.preloadCSS || {});
    data.preload.css(css).html(data.preloadHtml || "").hide();
    
    data.stage.css({
      width    : w, 
      height   : h,
      top      : "0px", 
      left     : "0px",
      position : "absolute"
    }).hide();
    
    if (data.canvas){
      data.canvas[0].width = data.width;
      data.canvas[0].height = data.height;      
      data.canvas.css({
        width    : w, 
        height   : h,
        top      : "0px", 
        left     : "0px",
        position : "absolute"
      }).hide();
    }
  };
  
  Spin.draw = function(data){
    data.module.draw(data);
  };
  
  Spin.rebindEvents = function(data){
    var target = data.target;
    // unbind all events
    target.unbind('.spritespin');
  
    // use custom or build in behavior
    var beh = data.behavior;
    if (typeof(data.behavior) === "string"){
      beh = Spin.behaviors[data.behavior];
    }
    beh = beh || {};
    
    var prevent = function(e){
      if (e.cancelable){ e.preventDefault(); }
      return false;
    };
    
    // rebind interaction events
    target.bind('mousedown.spritespin',  beh.mousedown  || $.noop);
    target.bind('mousemove.spritespin',  beh.mousemove  || $.noop);
    target.bind('mouseup.spritespin',    beh.mouseup    || $.noop);
    target.bind('mouseenter.spritespin', beh.mouseenter || $.noop);
    target.bind('mouseover.spritespin',  beh.mouseover  || $.noop);
    target.bind('mouseleave.spritespin', beh.mouseleave || $.noop);
    target.bind('dblclick.spritespin',   beh.dblclick   || $.noop);
    target.bind('onFrame.spritespin',    beh.onFrame    || $.noop);
  
    if (data.touchable){
      target.bind('touchstart.spritespin',  beh.mousedown  || $.noop);
      target.bind('touchmove.spritespin',   beh.mousemove  || $.noop);
      target.bind('touchend.spritespin',    beh.mouseup    || $.noop); 
      target.bind('touchcancel.spritespin', beh.mouseleave || $.noop);
      target.bind('click.spritespin',         prevent); 
      target.bind('gesturestart.spritespin',  prevent); 
      target.bind('gesturechange.spritespin', prevent); 
      target.bind('gestureend.spritespin',    prevent); 
    }
            
    // disable selection
      target.bind("mousedown.spritespin selectstart.spritespin", prevent);

      target.bind("onFrame.spritespin", function(event, data){
        Spin.draw(data);
      });
      target.bind("onLoad.spritespin", function(event, data){
        data.target.spritespin("animate", data.animate, data.loop);
      });
      
      // bind custom events
      if (typeof(data.onFrame) === "function"){
        target.bind("onFrame.spritespin", data.onFrame);
      }
      if (typeof(data.onLoad) === "function"){
        target.bind("onLoad.spritespin", data.onLoad);
      }
  };
    
  $.fn.spritespin = function(method) {
    if ( api[method] ) {
      return api[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    }
    if (typeof(method) === 'object' || !method) {
      return api.init.apply(this, arguments);
    }
    $.error( 'Method ' +  method + ' does not exist on jQuery.spritespin' );
  };


    api.init = function(options){
    // Default settings
    var settings = {
      // dimensions
      width             : undefined,              // Window width (or frame width)
      height            : undefined,              // Window height (or frame height)
      frames            : 36,                     // Total number of frames
      frame             : 0,                      // Initial frame number
      module            : "360",
      behavior          : "drag",
      // animation & update
      animate           : true,                   // Run animation when after initialize
      loop              : false,                  // Repeat animation in a loop
      loopFrame         : 0,                      // Indicates the loop start frame
      frameStep         : 1,                      // Number of frames to increment on each animation update
      frameTime         : 36,                     // Time between updates
      frameWrap         : true,                   // Same as 'loob' but for user interaction (behavior)
      reverse           : false,                  // If true animation is played backward
      sense             : 1,                      // Interaction sensitivity used by behavior implementations
      orientation       : "horizontal",
      
      // appearance               
      source            : undefined,              // Stiched source image
      preloadHtml       : undefined,              // Html to appear when images are preloaded
      preloadCSS        : undefined,
      
      // events
      onFrame           : undefined,              // Occurs whe frame has been updated
      onLoad            : undefined,              // Occurs when images are loaded
      touchable         : undefined              // Tells spritespin that it is running on a touchable device
    };
    
    // extending options
    options = (options || {});
    $.extend(settings, options);
    
    return this.each(function(){
      var $this = $(this);
      var data  = $this.data('spritespin');
      
      if (!data){
        // spritespin is not initialized
        
        var images = $this.find("img");
        var i = 0;
        if (images.length > 0){
          settings.source = [];
          for(i = 0; i < images.length; i += 1){
            settings.source.push($(images[i]).attr("src"));
          }
        }
        
        if (typeof(settings.source) === "string"){
          settings.source = [settings.source];
        }
        
        // disable selection & hide overflow
        Spin.disableSelection($this).css({ 
          overflow : "hidden", 
          position : "relative"
        });
        
        // build inner html
        $this.empty();
        $this.append($("<div class='spritespin-stage'/>"));
        $this.append($("<div class='spritespin-preload'/>"));
        $this.addClass("spritespin-instance");

        if (settings.enableCanvas){
          var canvas = $("<canvas class='spritespin-canvas'/>")[0];
          var supported = !!(canvas.getContext && canvas.getContext('2d'));
          if (supported){
            settings.canvas = $(canvas);
            settings.context = canvas.getContext("2d");
            $this.append(settings.canvas);
          }
        }

        // resolve module
        if (typeof(settings.module) === "string"){
          settings.module = SpriteSpin.modules[settings.module];
        }
        
        // build data
        settings.target = $this;
        settings.stage = $this.find(".spritespin-stage");
        settings.preload = $this.find(".spritespin-preload");
        settings.animation = null;
        settings.touchable =(settings.touchable || (/iphone|ipod|ipad|android/i).test(window.navigator.userAgent));
        
        $this.data('spritespin', settings);
        SpriteSpin.reload(settings, true);
      } else {
        // spritespin is initialized.
        $.extend(data, options);

        if (options.source){
          // when images are passed, need to reload the plugin
          SpriteSpin.reload(data);
        } else {
          // otherwise just reanimate spritespin
          $this.spritespin("animate", data.animate, data.loop);
        }
      }
    });
  };
  
    api.destroy = function(){
    return this.each(function(){
      var $this = $(this);
      $this.unbind('.spritespin');
      var data = $this.data('spritespin');
      if (data && data.animation){
        window.clearInterval(data.animation);
        data.animation = null;
      }
      $this.removeData('spritespin');
    });
  };

  // Updates a single frame to the specified frame number. If no value is 
  // given this will increment the current frame counter.
  // Triggers the onFrame event
  api.update = function(frame){
    return this.each(function(){
      var $this = $(this);
      var data = $this.data('spritespin');
      
      // update frame counter
      if (frame === undefined){
        data.frame += ((data.animation && data.reverse) ? -data.frameStep : data.frameStep);
      } else {
        data.frame = frame;
      }
      
      // wrap/clamp the frame value to fit in range [0, data.frames]
      if ( data.animation ||                    // wrap frame during animation
          (!data.animation && data.frameWrap)){   // wrap frame during user input 
        data.frame = Spin.wrap(data.frame, 0, data.frames - 1, data.frames);
      } else {
        data.frame = Spin.clamp(data.frame, 0, data.frames - 1);
      }

      // stop animation if the loopFrame is reached
      if (!data.loop && data.animation && (data.frame === data.loopFrame)){
        api.animate.apply(data.target, [false]);
      }
      
      data.target.trigger("onFrame", data);
    });
  };

  // Starts or stops the animation depend on the animate paramter.
  // In case when animation is already running pass "false" to stop.
  // In case when animation is not running pass "true" to start.
  // To keep animation running forever pass "true" for the loop parameter.
  // To detect whether the animation is running or not, do not pass any
  // parameters.
  api.animate = function(animate, loop){
    if (animate === undefined){
      return $(this).data('spritespin').animation !== null;
    } 
    return this.each(function(){
      var $this = $(this);
      var data = $this.data('spritespin');
      
      // check the loop variable and update settings
      if (typeof(loop) === "boolean"){
        data.loop = loop;
      }
      // toggle and update animation settings
      if (animate === "toggle"){
        data.animate = !data.animate;
      }
      //
      if (typeof(animate) === "boolean"){
        data.animate = animate;
      }
      // stop the running animation
      if (data.animation){
        window.clearInterval(data.animation);
        data.animation = null;
      }
      // start animation
      if (data.animate){
        data.animation = window.setInterval(function(){ 
          try { 
            $this.spritespin("update"); 
          } catch(err){
            // The try catch block is a hack for Opera Browser
            // Opera sometimes rises an exception here and
            // stops performing the script
          }
        }, data.frameTime);
      }  
    });
  };

  // Gets the current framenumber when no parameter is passed or
  // updates the spinner to the sepcified frame.
  api.frame = function(frame){
    if (frame === undefined){
      return $(this).data('spritespin').frame;
    }
    return this.each(function(){
      $(this).spritespin("update", frame);
    });        
  };

  // Gets or sets a value indicating whether the animation is looped or not.
  // Starts the animation when settings.animate is set to true passed value
  // is defined
  api.loop = function(value){
    if (value === undefined){
      return $(this).data('spritespin').loop;
    }
    return this.each(function(){
      var $this = $(this);
      $this.spritespin("animate", $this.data('spritespin').animate, value);
    }); 
  };

  api.next = function(){
    return this.each(function(){
      var $this = $(this); $this.spritespin("frame", $this.spritespin("frame") + 1);
    });
  };
  
  api.prev = function(){
    return this.each(function(){
      var $this = $(this); $this.spritespin("frame", $this.spritespin("frame") - 1);
    });
  };
  
  api.animateTo = function(frame){
    return this.each(function(){
      var $this = $(this); $this.spritespin({
        animate : true,
        loop : false,
        loopFrame : frame
      });
    });
  };

  Spin.behaviors.none = {
    name : "none",
    mousedown  : $.noop,
    mousemove  : $.noop,
    mouseup    : $.noop,
    
    mouseenter : $.noop,
    mouseover  : $.noop,
    mouseleave : $.noop,
    dblclick   : $.noop,
    
    onFrame : $.noop
  };
  
}(jQuery, window));
(function($, window, Spin){
  Spin.behaviors.click = {
    name : "click",
    mouseup    : function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      Spin.updateInput(e, data);
      $this.spritespin("animate", false); // stop animation

      var h, p, o = data.target.offset();
      if (data.orientation == "horizontal"){
        h = data.width / 2;
        p = data.currentX - o.left;
      } else {
        h = data.height / 2;
        p = data.currentY - o.top;        
      }
      if (p > h){
        $this.spritespin("frame", data.frame + 1);
        data.reverse = false;
      } else {
        $this.spritespin("frame", data.frame - 1);
        data.reverse = true;
      }
    }
  };
}(jQuery, window, window.SpriteSpin));
(function($, window, Spin){
  Spin.behaviors.drag = {
    name : "drag",
    mousedown  : function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      Spin.updateInput(e, data);
      data.onDrag = true;
    },
    mousemove  : function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      if (data.onDrag){
        Spin.updateInput(e, data);
        
        var d;
        if (data.orientation == "horizontal"){
          d = data.dX / data.width;
        } else {
          d = data.dY / data.height;
        }
      
        var dFrame = d * data.frames * data.sense;
        var frame = Math.round(data.clickframe + dFrame);
        $this.spritespin("update", frame);  // update to frame
        $this.spritespin("animate", false);  // stop animation
      }
    },
    mouseup    : function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      Spin.resetInput(data);
      data.onDrag = false;
    },
    mouseleave : function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      Spin.resetInput(data);
      data.onDrag = false;
    }
  };  
}(jQuery, window, window.SpriteSpin));
(function($, window, Spin){
  Spin.behaviors.hold = {
    name : "hold",
    mousedown  : function(e){
      var $this = $(this), data = $this.data('spritespin');
      Spin.updateInput(e, data);
      data.onDrag = true;
      $this.spritespin("animate", true);
    },
    mousemove  : function(e){
      var $this = $(this), data = $this.data('spritespin');
      
      if (data.onDrag){
        Spin.updateInput(e, data);
        
        var h, d, o = data.target.offset();
        if (data.orientation == "horizontal"){
          h = (data.width / 2);
          d = (data.currentX - o.left - h) / h;
        } else {
          h = (data.height / 2);
          d = (data.currentY - o.top - h) / h;
        }
        data.reverse = d < 0;
        d = d < 0 ? -d : d;
        data.frameTime = 80 * (1 - d) + 20;        
      }
    },
    mouseup    : function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      Spin.resetInput(data);
      data.onDrag = false;
      $this.spritespin("animate", false);
    },
    mouseleave : function(e){
      var $this = $(this), data = $this.data('spritespin');
      Spin.resetInput(data);
      data.onDrag = false;
      $this.spritespin("animate", false);
    },
    onFrame : function(e){
      var $this = $(this);
      $this.spritespin("animate", true);
    }
  };
}(jQuery, window, window.SpriteSpin));
(function($, window, Spin){
  Spin.behaviors.swipe = {
    name : "swipe",
    mousedown  : function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      Spin.updateInput(e, data);
      data.onDrag = true;
    },
    mousemove  : function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      if (data.onDrag){
        Spin.updateInput(e, data);
        
        var frame = data.frame;
        var snap = data.snap || 0.25;
        var d, s;
        
        if (data.orientation == "horizontal"){
          d = data.dX; 
          s = data.width * snap;
        } else {
          d = data.dY; 
          s = data.height * snap;
        }
        
        if (d > s){
          frame = data.frame - 1;       
          data.onDrag = false;
        } else if (d < -s){
          frame = data.frame + 1;
          data.onDrag = false;
        }
        
        $this.spritespin("update", frame);  // update to frame
        $this.spritespin("animate", false); // stop animation
      }
    },
    mouseup    : function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      data.onDrag = false;
      Spin.resetInput(data);
    },
    mouseleave : function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      data.onDrag = false;
      Spin.resetInput(data);
    }
  };  
}(jQuery, window, window.SpriteSpin));
(function($, window) {
  
  var Module = window.SpriteSpin.modules["360"] = {};
  
  Module.reload = function(data){
    var images = $(data.images);

    // clear the stage and refill with images
    data.stage.empty()

    // precalculate and cache options for this module
    data.modopts = {
      is_sprite : (data.images.length == 1),
      resX      : (data.resolutionX || data.images[0].width),
      resY      : (data.resolutionY || data.images[0].height),
      offX      : (data.offsetX || 0),
      offY      : (data.offsetY || 0),
      stepX     : (data.stepX || data.width),
      stepY     : (data.stepY || data.height),
      numFramesX: (data.framesX || data.frames),
      oldFrame  : data.frame,
      images    : images
    };

    if (!data.modopts.is_sprite && !data.canvas){
      data.stage.append(images);
    }

    images.css({
      width: data.modopts.resX,
      height: data.modopts.resY
    });

    Module.draw(data);
  };
  
  Module.draw = function(data){    
    if (data.modopts.is_sprite){
      Module.drawSpritesheet(data);
    } else{
      Module.drawImages(data);
    }
  };

  Module.drawSpritesheet = function(data){
    // Assumes all images are batched in a single sprite image

    var opts = data.modopts;
    var image = data.source[0];
    var frameX = (data.frame % opts.numFramesX);
    var frameY = (data.frame / opts.numFramesX)|0;
    var x = opts.offX + frameX * opts.stepX;
    var y = opts.offY + frameY * opts.stepY;

    if (data.canvas){
      data.context.clearRect(0, 0, data.width, data.height);
      data.context.drawImage(data.images[0], x, y, data.width, data.height, 0, 0, data.width, data.height);
      return;
    }

    data.stage.css({
      width      : [data.width, "px"].join(""),
      height     : [data.height, "px"].join(""),
      "background-image"    : ["url('", image, "')"].join(""),
      "background-repeat"   : "no-repeat",
      "background-position" : [-x, "px ", -y, "px"].join(""),
      // Spritesheets may easily exceed the maximum image size for iphones.
      // In this case the browser will scale down the image automaticly and
      // this will break the logic how spritespin works.
      // Here we set the webkit css attribute to display the background in its
      // original dimension even if it has been scaled down.
      "-webkit-background-size" : [opts.resX, "px ", opts.resY, "px"].join(""),
      "-moz-background-size" : [opts.resX, "px ", opts.resY, "px"].join(""),
      "background-size" : [opts.resX, "px ", opts.resY, "px"].join("")
    }); 
  };

  Module.drawImages = function(data){
    var img = data.images[data.frame];
    if (data.canvas){
      data.context.clearRect(0, 0, data.width, data.height);
      data.context.drawImage(img, 0, 0);
      return;
    }

    var frame = data.stage.css({
      width      : [data.width, "px"].join(""),
      height     : [data.height, "px"].join("")
    }).children().hide()[data.frame];
    SpriteSpin.disableSelection($(frame)).show();
  };

}(window.jQuery, window));
(function($, window) {
  var Module = window.SpriteSpin.modules.gallery = {};
  
  Module.reload = function(data){
    data.images = [];
    data.offsets = [];
    data.stage.empty();
    data.speed = 500;
    data.opacity = 0.25;
    data.oldFrame = 0;
    var size = 0, i = 0;
    for(i = 0; i < data.source.length; i+= 1){
      var img = $("<img src='" + data.source[i] + "'/>");
      data.stage.append(img);
      data.images.push(img);
      data.offsets.push(-size + (data.width - img[0].width) / 2);
      size += img[0].width;
      
      img.css({ opacity : 0.25 });
    }
    data.stage.css({ width : size });
    data.images[data.oldFrame].animate({ opacity : 1 }, data.speed);
  };
  
  Module.draw = function(data){
    if ((data.oldFrame != data.frame) && data.offsets){
      data.stage.stop(true, false);
      data.stage.animate({ 
        "left" : data.offsets[data.frame]
      }, data.speed);
      
      data.images[data.oldFrame].animate({ opacity : data.opacity }, data.speed);
      data.oldFrame = data.frame;
      data.images[data.oldFrame].animate({ opacity : 1 }, data.speed);
    } else {
      //console.log(data.dX);
      data.stage.css({
        "left" : data.offsets[data.frame] + data.dX
      });
    }
  };
  
  Module.resetInput = function(data){
    if (!data.onDrag){
      data.stage.animate({
        "left" : data.offsets[data.frame]
      });
    }
  };
}(jQuery, window));
(function($, window) {  
  var Module = window.SpriteSpin.modules.panorama = {};

  Module.reload = function(data){
    data.stage.empty();             // clear the stage
    var opts = data.modopts = {};   // precalculate and cache options for this module
    opts.resX = (data.resolutionX || data.images[0].width);
    opts.resY = (data.resolutionY || data.images[0].height);
    if (data.orientation == "horizontal"){
      opts.frames = (data.frames || opts.resX);
    } else {
      opts.frames = (data.frames || opts.resY);
    }
    
    Module.drawFirst(data);
  };
  
  // The function was stripped to do only necessary CSS updates
  Module.draw = function(data){      
    var opts = data.modopts;
    var x, y;
       
    if (data.orientation == "horizontal"){
      x = (data.frame % opts.frames);
      y = 0;      
    } else {
      x = 0;
      y = (data.frame % opts.frames);
    }
    data.stage.css({
      "background-position"     : [-x, "px ", -y, "px"].join("")
    });
  };
  
   // Renamed original draw function which is called only once at Load/Reload
  Module.drawFirst = function(data){      
    var opts = data.modopts;
    var x, y;

    if (data.orientation == "horizontal"){
      x = (data.frame % opts.frames);
      y = 0;      
    } else {
      x = 0;
      y = (data.frame % opts.frames);
    }
    data.stage.css({
      width      : [data.width, "px"].join(""),
      height     : [data.height, "px"].join(""),
      "background-image"        : ["url('", data.source[0], "')"].join(""),
      "background-repeat"       : "repeat-both",
      "background-position"     : [-x, "px ", -y, "px"].join(""),
      "-webkit-background-size" : [opts.resX, "px ", opts.resY, "px"].join("")
    });
  };
  
}(window.jQuery, window));
//-------- ngbs --------//
/*global jQuery, window */
(function () {
    "use strict";
    var MessageBus, Widgets, BaseObject, classes, _message_bus;

    BaseObject = function () {};


    function objectify(object_parts, args) {
        args = args || []; // passing undefined to Function.apply will throw an error "Object expected" in IE.
        // this could be a native constructor not a user supplied function
        var obj, part, static_part, Superclass = null;

        if (typeof object_parts === 'function') {
            object_parts = object_parts.apply(null, args);
            if (typeof object_parts !== 'object') {
                return false;
            }
        }

        obj = object_parts.constructor;

        Superclass = object_parts.superclass || BaseObject;
        object_parts.superclass = new Superclass();
        obj.prototype = new Superclass();

        /*jslint forin: true */
        for (part in object_parts) {
            obj.prototype[part] = object_parts[part];
        }

        obj.prototype.constructor = object_parts.constructor; // IE8 doesn't enumerate the constructor property, set it manually
        for (static_part in Superclass) {
            if (!(Superclass.prototype[static_part]) && static_part !== "prototype") {
                obj[static_part] = Superclass[static_part];
            }
        }

        return obj;
    }

    MessageBus = objectify({
        /**
         * @class ngbs._message_bus
         * The message bus is simply a wrapper for jQuery custom events. Using the message bus
         * you can send "messages" back and forth between widgets and views.<br><br>
         * Changes from the current system:<br>
         * - Initialized as a "private" variable, rather than a property of "Widgets"<br><br>
         *
         * This is not accessible outside the ngbs closure.
         * @dependency jQuery
         * @todo figure out a better nomenclature for widgets
         */
        constructor: function () {

            this.is_queueing = false;
            this.message_queue = [];
            this.messages_attached = [];
        },


        /**
         * Pause the queue
         * @private
         */
        pause: function () {
            this.is_queueing = true;
        },

        /**
         * Play the queue
         * @private
         */
        play: function () {
            var i, l, que;
            for (i = 0, l = this.message_queue.length; i < l; i++) {
                que = this.message_queue[i]; // the item in the message queue
                jQuery(que.element).trigger(que.event, [que.data]);
            }

            this.is_queueing = false;
        },

        /**
         * Send an event
         * @param {String|HTMLElement|Object} element Element to send the event to; takes anything accepted by jQuery()
         * @param {String} event The name of the event
         * @param {Object} data Data passed to listener as the second parameter
         */
        send: function (element, event, data) {
            if (this.is_queueing) {
                this.message_queue.push({
                    event: "message-" + event,
                    element: element,
                    data: data || {}
                });
            } else {
                jQuery(element).trigger("message-" + event, [data]);
            }
        },

        /**
         * Listen for an event
         * @param {String|HTMLElement|Object} element Element to send the event to; takes anything accepted by jQuery()
         * @param {String} event The name of the event
         * @param {Function} callback The callback function
         * @param {Boolean} isDelegated Is the listener delegated
         */
        listen : function (elements, event, callback, isDelegated) {
            if (isDelegated) {
                jQuery(document).delegate(elements, "message-" + event, callback);
            } else {
                jQuery(elements).bind("message-" + event, callback);
            }
        },

        /**
         * Remove an event listener
         * @param {String|HTMLElement|Object} element Element to send the event to; takes anything accepted by jQuery()
         * @param {String} event The name of the event
         * @param {Function} callback The callback function
         */
        remove: function (elements, event, callback) {
            if (callback) {
                jQuery(elements).unbind("message-" + event, callback);
            } else {
                jQuery(elements).unbind("message-" + event);
            }
        }
    });

    Widgets = objectify({
        /**
         * @class ngbs
         * Changes from the current system:
         * - .before, .add removed, replaced with .page [for pages] and .widget [for widgets]
         * - jQuery no longer passed as a parameter
         *
         * @dependency jQuery
         */
        constructor: function () {
            this._loaded = false;
            this._widgets = [];

            this._message_bus = _message_bus;

            /**
             * Whether or not we are in debug mode
             * @type Boolean
             */
            this.debug = window._NGBSDEBUG;

            /**
             * create a first-class JavaScript object from an object literal.
             * @method objectify
             *
             * @param {Object} object_parts Either an object literal or a function which returns an object literal
             * the following values have special meaning:
             * <ul><li>constructor: {Function} this is the constructor for the object</li>
             * <li>superclass: {Object} (optional) this is the parent class,
             * if no superclass is provided it defaults to BaseObject</li></ul>
             * @param {Array} args Only used if object_parts is a function which return an object
             * @return {Function} First-class javascript object
             */
            this.objectify = objectify;
        },


        /**
         * Essentially just a page that runs immediately.  Useful for interfacing with legacy code
         * @param {Function} callback Function to execute when this widget is invoked
         */
        legacy: function (callback) {

            this.widget(false, callback, true);

        },

        /**
         * Add a page.  Does the same thing as .widget, except it does not match elements
         * @param {Function} callback Function to execute when this widget is invoked
         * @param {Boolean} immediate Whether to invoke immediately or defer to DOMReady
         */
        page: function (callback, immediate) {

            this.widget(false, callback, immediate);
        },

        /**
         * Add a widget
         * @param {String} name The name of the widget, must not be an integer
         * @param {Function} callback Function to execute when this widget is invoked
         * @param {Boolean} immediate Whether to invoke immediately or defer to DOMReady
         */
        widget: function (name, callback, immediate) {

            if (typeof callback !== "function") {
                callback = this.objectify(callback);
            }

            var index = this._widgets.push({
                callback: callback,
                loaded: false,
                name: name
            });

            if (this._loaded || !!immediate) {
                this.initialize(index - 1, callback);
            }
        },

        /**
         * Intializes a widget or page
         * @param {String|Integer} name The name of a widget or index of a page
         * @private
         */
        initialize: function (index) {

            var $elements, blackhole, widget = this._widgets[index];

            if (widget.name) {
                $elements = jQuery("." + widget.name);
            }

            if (widget.callback.prototype instanceof BaseObject) {
                blackhole = new widget.callback(this._message_bus, $elements);
            } else {
                widget.callback(this._message_bus, $elements);
            }

            blackhole = null;


        },

        /**
         * Runs onDOMReady and intializes pages, then widgets
         * @private
         */
        load: function () {
            var name, i, l;
            this._message_bus.pause();

            for (i = 0, l = this._widgets.length; i < l; i++) {
                if (this._widgets[i].loaded === false) {

                    this.initialize(i);
                    this._widgets[i].loaded = true;
                }
            }

            this._message_bus.play();
            this._loaded = true;
        },


        /**
         * Re-initialize a widget for testing purposes
         * @private
         */
        _reinitialize: function (name) {
            var i, l, $elements, widget, blackhole;

            for (i = 0, l = this._widgets.length; i < l; i++) {
                if (this._widgets[i].name === name) {
                    widget = this._widgets[i];

                    $elements = jQuery("." + widget.name);
                    if (widget.callback.prototype instanceof BaseObject) {
                        blackhole = new widget.callback(this._message_bus, $elements);
                    } else {
                        widget.callback(this._message_bus, $elements);
                    }

                }
            }

        }

    });

    classes = (window.ngbs && window.ngbs._classes) || {};
    _message_bus = new MessageBus();

    window.ngbs = new Widgets();
    window.ngbs.u = {};

    window.ngbs._classes = window.ngbs._classes || classes;
    // for tests, please do not instantiate these on your own. Thanks.
    window.ngbs._classes.Widgets = Widgets;
    window.ngbs._classes.MessageBus = MessageBus;
    window.ngbs._classes.BaseObject = BaseObject;

    jQuery(document).ready(function () {
        if (window.ngbs.metrics) {
            window.ngbs.metrics._load();
        }
        window.ngbs.load();
    });

}());



/*global jQuery, console, ngbs, __params NGBS_002*/
(function (ngbs, jQuery, window) {
    'use strict';

    if (!ngbs.u) {
        return;
    }

    ngbs.u.region = (function () {

        var SERVICES = {
            'fpi' : '/services/geo/PostalCodes.json?postalCode='
            //'locatedealer' : 'http://www.inventory.lincoln.com/dealer/Dealers?&make=Lincoln&zipcode=90210'
            //'locatedealer' : 'dealer/Dealers'
        };

        var Region = function (callback, oldMetrics) {
            this.val = '';
            this.baseURL = __params.baseURL || '';
            this.make = __params.make || '';
            this.zipCode = ngbs.u.cookie.zip();
            this.oldMetrics = (oldMetrics === true) ? true : false;
            this.callback = (callback && typeof (callback) === 'function') ? callback : false;

            this.init();
        };

        Region.prototype = {

            init: function () {
                var regionCookie;
                //console.log(this.zipCode);
                if (this.zipCode === false || (typeof this.zipCode === "undefined")) {
                    this.setDefaultCookie();
                    if (this.callback !== false) {
                        this.callback();
                    }
                    if (this.oldMetrics) {
                        jQuery(document.body).trigger('region-set');
                    }
                    return false;
                }

                regionCookie = ngbs.u.cookie.get('regions');
                if (regionCookie === false) {
                    this.setCookieRegion();
                } else {
                    this.isRegionZipTodate(regionCookie);
                }

            },
            setDefaultCookie: function () {
                var cookieName, value, options;
                cookieName = "regions";
                options = {
                    'domain': document.domain,
                    'expires': '1',
                    'path': '/'
                };
                value = 'zip=00000&FDAF=none&LMDA=none&DMA=none&Marketing=none&PACode=none';
                ngbs.u.cookie.set(cookieName, value, options);
            },
            setCookieRegion: function () {
                var cookieName, value, options,
                    regionData, self;
                self = this;

                cookieName = "regions";
                this.getRegionData(function () {
                    value = self.val;
                    options = {
                        'domain': document.domain,
                        'expires': '1',
                        'path': '/'
                    };
                    ngbs.u.cookie.set(cookieName, value, options);
                    if (self.callback !== false) {
                        self.callback();
                    }
                    if (self.oldMetrics) {
                        jQuery(document.body).trigger('region-set');
                    }
                });
            },

            getRegionData: function (setRegioncallback) {
                var self = this;
                jQuery.ajax({
                    url: this.baseURL + SERVICES.fpi + this.zipCode,
                    dataType: 'json',
                    error: function (xhr, status) {
                        //console.log(status);
                    }
                }).done(function (data) {
                    if (data) {
                        self.val += self.handelData(data.Response);
                    }
                }, function () {
                    self.getLocateDealerData(setRegioncallback);
                }).fail(function () {
                    self.setDefaultCookie();
                    if (self.callback !== false) {
                        self.callback();
                    }
                    if (self.oldMetrics) {
                        jQuery(document.body).trigger('region-set');
                    }
                });
            },

            getLocateDealerData: function (setRegioncallback) {
                var serviceUrl, self;
                self = this;

                //TODO touchpoint
                serviceUrl = this.baseURL + '/core-services/dealers/byzipcode.json?zipCode=' + this.zipCode + '&distance=50&pageSize=1&pageIndex=1';
                jQuery.ajax({
                    url: serviceUrl,
                    dataType: 'json',
                    error: function (xhr, status) {
                        //console.log(status);
                    }
                }).done(function (data) {
                    if (data) {
                        self.val += '&PACode=' + data.Response.Dealer.PACode;
                    }
                }, function () {
                    if (setRegioncallback && typeof (setRegioncallback) === 'function') {
                        setRegioncallback();
                    }
                }).fail(function () {
                    self.setDefaultCookie();
                    if (self.callback !== false) {
                        self.callback();
                    }
                    if (self.oldMetrics) {
                        jQuery(document.body).trigger('region-set');
                    }
                });
            },

            handelData: function (data) {
                var processData = '';
                var oDealer, PACode, encodeUrl;
                var i = 0;
                var aValue = [];
                var zip = 'zip=' + data.PostalCode.Name.content;
                var regions = data.PostalCode.Regions.Region;
                processData += zip;
                if (regions) {
                    jQuery.each(regions, function (k, v) {
                        aValue.push(v.type + '=' + v.Code);
                    });
                    processData += "&" + aValue.join('&');
                }
                return processData;
            },

            isRegionZipTodate: function (regionCookie) {
                var aux, zip;
                aux = regionCookie.split('&', 1).join();
                aux = aux.split('=');
                if (aux[0] === 'zip') {
                    zip = aux[1];
                    //console.log(this.zipCode + '-----' + zip);
                    if (this.zipCode !== zip) {
                        this.setCookieRegion();
                    } else {
                        if (this.callback !== false) {
                            this.callback();
                        }
                        if (this.oldMetrics) {
                            jQuery(document.body).trigger('region-set');
                        }
                    }
                } else {
                    this.setCookieRegion();
                }
            }
        };

        Region.factory = function (callback, oldMetrics) {
            return new Region(callback, oldMetrics);
        };
        return Region.factory;
    }());

}(ngbs, jQuery, window));

//NGBS_007
/*global ngbs, unescape */
(function (ngbs) {
    'use strict';

    /**
     * @class ngbs.u.cookie
     * @singleton
     */
    ngbs.u.cookie = (function () {

        /**
         * Resolves options parameter for set/setSub
         * @private
         */
        var resolveOptions = function (options) {
            var values = [];

            if (typeof options.expires === "number") {
                var ex = new Date();
                ex.setDate(ex.getDate() + options.expires);
                values.push("expires=" + ex.toUTCString());
            }

            if (typeof options.path === "string") {
                values.push("path=" + options.path);
            }

            if (typeof options.domain === "string") {
                values.push("domain=" + options.domain);
            }

            if (typeof options.secure !== 'undefined') {
                values.push("secure");
            }

            return values.length ? '; ' + values.join('; ') : '';

        };

        return {

            /**
             * Gets a cookie
             *
             * @param {String} main The main cookie to check (eg "FPI")
             * @returns {String|Boolean} Returns the cookie if found, false it not found
             * @namespace
             */
            get: function (main) {
                var cookies, i, cookie, key, value, length;

                if (document.cookie.indexOf(main) !== -1) {
                    cookies = document.cookie.split(';');

                    for (i = 0, length = cookies.length; i < length; i++) {
                        cookie = cookies[i].split('=');
                        key = cookie.shift().replace(/^\s*/, '').replace(/\s*$/, '');
                        if (cookie.length && key === main) {
                            return unescape(cookie.join('='));
                        }
                    }
                }
                return false;

            },


            /**
             * Gets a 'sub'-cookie
             *
             * @param {String} main The main cookie to check (eg "FPI")
             * @param {String} sub The sub cookie to return (eg "zip")
             * @param {String} sep Optional, separator the subcookie uses (FPI uses &, userInfo uses ,). Defaults to &
             * @returns {String|Boolean} Returns the cookie if found, false it not found
             */
            getSub: function (main, sub, sep) {
                var cookie, subCookies, subCookie, i, l;

                sep = sep || '&';

                cookie = this.get(main);
                if (cookie) {
                    subCookies = cookie.split(sep);

                    for (i = 0, l = subCookies.length; i < l; i++) {
                        subCookie = subCookies[i].split('=');
                        if (subCookie.length === 2 && subCookie[0] === sub) {
                            return unescape(subCookie[1]);
                        }
                    }
                }
                return false;

            },

            /**
             * Sets a cookie
             * @param {String} cookie The name of the cookie to set
             * @param {String} value The value of the cookie to set
             * @param {Object} options Optional<ul>
             *      <li>domain</li>
             *      <li>expires -  Number of days until the cookie expires (negative numbers are accepted); if falsey, will set a session-cookie</li>
             *      <li>path</li>
             *      <li>secure</li></ul>
             */
            set: function (cookie, value, options) {
                options = options || {};
                options = resolveOptions(options);

                value = encodeURI(value).replace(/;/g, '%3B');
                document.cookie = cookie + "=" + value + options;
            },


            /**
             * Sets a 'sub'-cookie
             * @param {String} cookie The name of the 'main'-cookie to set
             * @param {String} sub The name of the 'sub'-cookie to set
             * @param {String} value The value of the cookie to set
             * @param {Object} options Optional<ul>
             *      <li>domain</li>
             *      <li>expires -  Number of days until the cookie expires (negative numbers are accepted); if falsey, will set a session-cookie</li>
             *      <li>path</li>
             *      <li>secure</li>
             *      <li>separator,sep - Separator character; default is &</li></ul>
             */
            setSub: function (cookie, sub, value, options) {
                options = options || {};
                var ex = new Date(),
                    sep = options.sep || options.separator || '&',
                    old_main = this.get(cookie),
                    old_sub = this.getSub(cookie, sub, sep),
                    encoded = (encodeURI(value).replace(/;/g, '%3B'));

                options = resolveOptions(options);

                if (old_sub) {
                    value = old_main.replace(old_sub, encoded);
                } else {
                    value = old_main + sep + sub + '=' + encoded;
                }
                document.cookie = cookie + "=" + value + options;
            },

            /**
             * Returns the current ZIP code.  First tries FPI (user-set) then tries userInfo (Akamai set QA/Prod only)
             * @param {Boolean} Pass in true to supress zip code from Akamai
             * @returns {String|Boolean} Returns the cookie if found, false it not found
             */
            zip: function (ignoreAkami) {
                var userZip, zip;
                ignoreAkami = ignoreAkami || false;

                zip = this.getSub("FPI", "zip");

                if (!zip && !ignoreAkami) {
                    userZip = this.getSub("userInfo", "zip", ",");
                    zip = (userZip && userZip !== '') ? userZip : false;
                    zip = zip ? zip.substr(0, 5) : zip;
                }

                return zip;
            },
            /**
             * Sets the FPI cookie zip to the provided zipcode
             * @param {Number|String} Value of the new zip
             * @param {Object} Options for the cookie
             * @returns {Boolean} Returns true if provides zip is valid, false otherwise
             * */
            setZip: function (zipCode, options) {
                //Minimal validation. Do not trust this if you absolutely need to be sure the zipcode is valid
                var re = /\d{5}/;
                if (re.test(zipCode)) {
                    this.setSub("FPI", "zip", zipCode, options);
                    return true;
                }
                return false;
            }
        };
    }());

}(ngbs));



//-------- ngbs-overrides --------//
//ngbs-overrides.js

ngbs.metrics = {
    page: function(){return;},
    click: function(){return;},
    _load: function(){return;}
};
//-------- mustangreveal --------//
/*global ngbs, jQuery */
ngbs.page(function (message_bus) {
    'use strict';

    var $ = jQuery, page;

    var S550 = function () {
        this.PREFIX = 's550-';
        this.$container = $('#' + this.PREFIX + 'container');
        this.$sections = this.$container.find('.' + this.PREFIX + 'section');
        this.$nav = this.$container.find('.autofill-stickynav');
        this.$navItems = this.$nav.find('li');
        this.ACT_CLASS = 'active';
        this.HID_CLASS = 'hidden';
        this.firedBuzz = false;
        this.firedSocial = false;

        this.init();
        this.bindHandlers();
    };

    S550.prototype = {
        init: function () {
            this.updateHead();
            this.isMobile = ('ontouchstart' in document.body || 'ontouchstart' in window || 'ontouchstart' in document.documentElement) && ($(window).width() <= 480);
            this.badBrowser = (navigator.appVersion.indexOf("MSIE 9") === -1 && navigator.appVersion.indexOf("MSIE 1") === -1);

            this.configurePictureLoader();
            this.getContentDirection();
            if (!this.badBrowser)
                this.configureCollapser();
            this.configureNav();
            this.configureBillboard();
            this.configureViewpoints();
            this.configureGallerySlider();
            this.configureView360();
            this.configureRevealer();
            this.configureBuzz();
            this.configureSocialFeed();
            !this.isMobile && this.configureParallax();
            this.configureBackToTop();
            message_bus.send(document.body, 's550-metrics', {action: 'page', name: 'mr-page'});
        },

        updateHead: function () {
            var $head = $("head"),
                imageSrc = jQuery(".getupdates-social-list").find('.share-facebook').data('image');
            //$head.append('<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0"/>');
            $head.append('<meta property="og:image" content="' + imageSrc + ' " />');
        },

        bindHandlers: function () {
            var self = this;

            this.$container.on('click', '.feature-buttons', function (e) {
                e.preventDefault();
                if ($(this).hasClass('open') && !$(this).data('opened')) {
                    message_bus.send(document.body, 's550-metrics', {action: 'click', name: 'mr-feature-read-more-interaction', feature: $(this).data('feature-id')});
                    $(this).attr('data-opened', true);
                }
                $(this).toggleClass('open').toggleClass("close").prev('.feature-list').slideToggle();
                GWS && GWS.broadcast('features-button', $(this));
            });

            this.$container.on('click', '#s550-getupdates a', function (e) {
                e.preventDefault();
                if ($(this).data('id')) {
                    GWS && GWS.broadcast('getupdates-' + $(this).data('id'), $(this));
                }
            });

            this.$container.on('click', '.get-updates-link', function () {
                self.configureForm();
                GWS && GWS.broadcast('getupdates-getupdates', $(this));
            });

            this.$container.on('click', 'buzz-item a', function () {
                GWS && GWS.broadcast('carousel-slider-read-article');
            });

            $('.share-btn').on('click', function (e) {
                e.preventDefault();
                self.share($(this));
                var social = $(this).data('id');
                if (social) {
                    if (self.isMobile && social === 'email') {
                        ngbs.metrics.page('mr-share-email-mobile');
                    } else {
                        message_bus.send(document.body, 's550-metrics', {action: 'click', name: 'mr-social-share', social: social});
                    }
                }
            });

            this.$container.on('click', '#s550-buzz-slider .arrow', function () {
                if (!self.firedBuzz) {
                    message_bus.send(document.body, 's550-metrics', {action: 'click', name: 'mr-buzz-news-interaction'});
                    self.firedBuzz = true;
                }
            });

            this.$container.on('click', '#s550-social-slider .arrow', function () {
                if (!self.firedSocial) {
                    message_bus.send(document.body, 's550-metrics', {action: 'click', name: 'mr-buzz-social-interaction'});
                    self.firedSocial = true;
                }
            });

            this.$container.on('click', '.section-collapser', function () {
                var section = $(this).parent().attr('data-title');
                if (!$(this).hasClass('collapsed') && section) {
                    section = section.toLowerCase();
                    ngbs.metrics.page('mr-page-' + section);
                }
            });
        },

        getSections: function () {
            var sections = [],
                name,
                i = 0;

            for (i; i < this.$sections.length; i++) {
                name = $(this.$sections[i]).attr('id').replace(this.PREFIX, '');
                sections.push(name);
            }

            return sections;
        },

        getElement: function (elem) {
            if (this.$container.find(elem).length) {
                return this.$container.find(elem);
            }
            return false;
        },

        getContentDirection: function () {
            if ($('[dir="rtl"]').length) {
                this.direction = 'right';
            } else {
                this.direction = 'left';
            }
        },

        configurePictureLoader: function () {
            var timer, self = this;
            message_bus.send(document.body, 'picture-loader', {
                onInitialized: function () {
                },
                onComplete: function () {
                    $('#s550-features .section-collapser, #s550-buzz .section-collapser').trigger("click");
                },
                onChange: function () {
                    if (!self.badBrowser) {
                        clearTimeout(timer);
                        timer = setTimeout(function () {
                            message_bus.send(document.body, 'parallax-refresh');
                        }, 100);
                    }
                }
            });
        },

        configureNav: function () {
            if (this.$nav.length) {
                message_bus.send(document.body, 'sticky-add', {
                    $el: this.$nav,
                    items: this.getSections(),
                    offset: this.$nav.offset().top
                });
            }
        },

        configureBillboard: function () {
            var $billboard = this.getElement('#s550-billboard-slider'),
                self = this;

            if ($billboard) {
                var $innerAnimation = $billboard.find(".carousel-text");
                message_bus.send(document.body, 'carousel-create', {
                    $el: $billboard,
                    onInitialized: function () {
                        if ($billboard.height() > 0) {
                            self.showSections();
                        } else {
                            window.setTimeout(function () {
                                self.showSections();
                            }, 1000);
                        }
                    },
                    onSlideStart: function (data) {
                        if (data.toPage !== data.currentPage) {
                            $innerAnimation.eq(data.toPage - 1).stop().animate({"margin-left":  (data.currentPage < data.toPage) ? "-100%" : "100%"}, data.speed);
                            $innerAnimation.eq(data.toPage).css({"margin-left": (data.currentPage < data.toPage) ? "100%" : "-100%"})
                        }
                    },
                    onSlideEnd: function (data) {
                        $innerAnimation.eq(data.toPage - 1).css({"margin-left": 0});
                        $innerAnimation.eq(data.toPage).stop().animate({"margin-left": 0}, data.speed / 3);
                    }
                });
            }
        },

        configureViewpoints: function () {
            var self = this,
                section,
                highligtNavigation = {
                    $el: $("#s550-billboard, #s550-gallery, #s550-features, #s550-buzz, #s550-CTA"),
                    offset: this.$nav.outerHeight(),
                    inside: function (context, data) {
                        section = data.$el[0].id.replace('s550-', '');
                        self.$navItems.removeClass(self.ACT_CLASS);
                        self.$navItems.filter('[data-section="' + section + '"]').addClass(self.ACT_CLASS);
                    }
                },
                animate360 = {
                    $el: this.$container.find("#s550-view360"),
                    offset: function () {
                        return $(window).height() - self.$container.find(".view360-player").height()
                    },
                    crossing: function (context, data) {
                        if (data.direction === "down") {
                            if (!self.badBrowser) {
                                self.$container.find(".view360-player").spritespin("animate", true, false);
                                context.active = false;//one animation only
                            }
                        }
                    }
                };
            message_bus.send(document.body, 'viewpoints', highligtNavigation);
            message_bus.send(document.body, 'viewpoints', animate360);

        },

        configureBackToTop: function () {
            var $button = this.getElement('.back-to-top-button');

            if ($button) {
                message_bus.send(document.body, 'back-to-top-config', {
                    $el: $button
                });
            }
        },

        configureGallerySlider: function () {
            var $gallery = this.getElement('.gallery-slider');

            if ($gallery) {
                message_bus.send(document.body, 'gallery-add', {
                    $el: $gallery,
                    arrows: $gallery.data('arrows'),
                    scrollbar: $gallery.data('scrollbar'),
                    direction: this.direction,
                    zoom: !this.isMobile
                });
            }
        },

        configureView360: function () {
            this.$container.find('.feature-list').hide();

            var $view360 = this.$container.find('#s550-view360-view'),
                data = {
                    $el: $view360/*,
                    onFrame: function (e) {
                        console.log(e)
                    }*/
                };
            message_bus.send(document.body, 'view360-apply', data);
        },

        configureRevealer: function () {
            var $revealer = this.getElement('.reveal-slider'),
                $borders;

            if ($revealer) {
                $revealer.find('.scroller-limit').append("<div class='limit-border'/>");
                $borders = $revealer.find(".limit-border");
                message_bus.send(document.body, 'revealer-config', {
                    $el: $revealer,
                    onDrag: function (event) {
                        $borders.eq(0).css({opacity: 1 - (event.value / 100)});
                        $borders.eq(1).css({opacity: event.value / 100});
                    }
                });
            }
        },

        configureBuzz: function () {
            var $buzz = this.getElement('#' + this.PREFIX + 'buzz'),
                padding = 16,
                $carouselItem,
                $buzzItem,
                $itemClone;

            if ($buzz) {
                if (this.isMobile) {
                    $carouselItem = $buzz.find(".carousel-item");
                    $buzzItem = $buzz.find(".buzz-item");

                    $buzz.attr('data-adjustslide', true);

                    $("#s550-buzz-slider").find(".carousel-widget").css({"padding-left": padding})
                    $buzzItem.width($buzz.width() - (padding * 4));

                    $carouselItem.width($buzz.width() - (padding * 2));
                    $carouselItem.last().css({width: $carouselItem.last().width() + (padding * 2) });
                }
                message_bus.send(document.body, 'carousel-create', {
                    $el: $buzz.find("#s550-buzz-slider"),
                    name: 'news'
                });
            }
        },

        configureSocialFeed: function () {
            var i = 0,
                self = this,
                $social = this.getElement("#s550-social-feed");

            if ($social) {
                $social.hide();
                var $carousel = $social.find('.carousel-slider-list');
                $.ajax({
                    url: $social.data("feed-source"),
                    data: {'networks[]': ['facebook', 'twitter']},
                    dataType: 'jsonp'
                }).done(function (response) {
                    var data = self.shuffleArray(response.data);
                    //console.log(data);
                    if (data.length) {
                        $social.show();
                        for (i = 0; i <= 20; i ++) {
                            var item = data[i],
                                text = "",
                                $li = jQuery("<li></li>");
                            $li.addClass('carousel-item');
                            if (item && item.network && (item.message || item.text)) {
                                if (item.network  == "facebook") {
                                    text = item.message.substring(0, 200) + '...';
                                    $li.addClass('fb');
                                } else {
                                    text = item.text;
                                    $li.addClass('tw');
                                }
                                $li.html('<div><span class="social-icon"></span><p>' + text + '</p></div>');
                                $carousel.append($li);
                            }
                        }
                        if (self.isMobile) {
                            $social.find('.carousel-item').width($social.width());
                            $social.find('.carousel-slider').attr('data-adjustslide', true);
                        }
                        message_bus.send(document.body, 'carousel-create', {
                            $el: $social.find("#s550-social-slider"),
                            name: 'social'
                        });
                    }
                });
            }
        },

        share: function ($link) {
            var url = $link.attr('href'),
                location = $link.attr('data-deeplink') || window.location.href;

            if ($link.hasClass('share-twitter') || $link.hasClass('share-google')) {
                url += encodeURIComponent(location);
            }

            if ($link.hasClass('share-twitter')) {
                if ($link.data('text')) {
                    url += '&text=' + $link.data('text');
                }
                if ($link.data('hashtags')) {
                    url += '&hashtags=' + $link.data('hashtags');
                }
            }

            if ($link.hasClass('share-facebook')) {
                if (this.isMobile) {
                    url = url.replace('s=100', 'm2w&s=100');
                }
                url += '&p[url]=' + encodeURIComponent(location) + '&p[title]=' + encodeURIComponent($link.data('title')) + '&p[summary]=' + encodeURIComponent($link.data('summary')) + '&p[images][0]=' + encodeURIComponent($link.data('image'));
            }

            if ($link.hasClass('share-by-email')) {
                if (this.isMobile) {
                    window.location.href = 'mailto:?body=' + encodeURIComponent(($link.data('description') || '') + '\n\n' + location) + '&subject=' + encodeURIComponent($link.data('title')) || '';
                } else {
                    this.openEmailWindow($link.data());
                }
            } else {
                window.open(url);
            }
            return false;
        },

        openEmailWindow: function (data) {
            var width = 715,
                height = 550,
                left = screen.width / 2 - width / 2,
                top = screen.height / 2 - height / 2,
                location = data.deeplink || window.location.href,
                params = {'t' : data.title,
                    'l' : location,
                    'd' : data.description,
                    's' : data.image,
                    'n' : __params.metricsname,
                    'y' : __params.year,
                    'level' : 'asset'},
                params_encoded = ngbs.u.encoder(JSON.stringify(params), "base64").encode().replace(/\=/g, "%3D");

            window.open('/share-email?params=' + params_encoded, '', 'width=' + width + ',height=' + height + ',top=' + top + ',left=' + left + ',location=no,resizable=no,scrollbars=no,toolbar=no');
            //this.metrics.email.share();
            return false;
        },

        shuffleArray: function (arr) {
            for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
            return arr;
        },

        configureParallax: function () {
            var $parallax = this.getElement('.parallax-feature, .reveal-slider-player'),
                $parallaxRevealer = this.getElement('.reveal-slider-player');

            if ($parallax) {
                var obj = {$el: $parallax},
                    data = $.extend(obj, $parallax.data());
                message_bus.send(document.body, 'parallax', data);
            }
        },

        configureCollapser: function () {
            message_bus.send(document.body, 'section-collapser', {$el: this.$sections});
        },

        configureScrolling: function () {
            message_bus.send(document.body, 'smooth-scrolling');
        },

        configureForm: function () {
            var $combo = $('#getupdates-vehicles-select-1');

            if ($combo.length) {
                window.setTimeout(function () {
                    $combo.find('option[data-name="Mustang"]').attr('selected', 'selected');
                }, 100);
            }
        },

        showSections: function ($section) {
            var $sections = $section || this.$sections;
            $sections.removeClass(this.HID_CLASS);
        },

        hideSections: function ($section) {
            var $sections = $section || this.$sections;
            $sections.addClass(this.HID_CLASS);
        }
    };

    message_bus.listen(document.body, 's550-metrics', function (e, data) {
        if (page && page.isMobile) {
            ngbs.metrics[data.action](data.name + '-mobile', data);
        } else {
            ngbs.metrics[data.action](data.name, data);
        }
    });

    message_bus.listen(document.body, 'page-init', function (e, data) {
        page = new S550();
    });

});
//-------- picture-loader --------//
/*global ngbs, jQuery */
ngbs.widget('picture-loader', function (message_bus, $elements) {
    'use strict';

    var $ = jQuery, pictureLoader, firstRound = true, timer;

    function PictureLoader(options) {
        this.$preImages = jQuery(".picture-loader");
        this.mediaCount = this.$preImages.length;
        this.loadedCount = 0;
        this.options = options;
        this.largerWidth = $(window).width();
        this.init();
        this.bindings();

        if (navigator.appName.indexOf("Internet Explorer") !== -1) {
            this.badBrowser = (navigator.appVersion.indexOf("MSIE 9") === -1 && navigator.appVersion.indexOf("MSIE 1") === -1);
        }

        if (typeof options.onInitialized === "function") {
            options.onInitialized();
        }
    }

    PictureLoader.prototype.init = function () {
        this.retina = this.checkPixelRatio();
        this.update();
    };

    PictureLoader.prototype.loadedCheck = function (src, firstTime) {
        var self = this, interval, count;
        $("<img>").on("load", function () {
            self.loadedCount++;
            if (self.mediaCount === self.loadedCount) {
                if (firstTime && typeof self.options.onComplete === 'function') {
                    self.options.onComplete();
                } else if (typeof self.options.onChange === 'function') {
                    self.options.onChange();
                }
            }
        }).attr("src", src);
    };

    PictureLoader.prototype.replaceImage = function ($elem, firstTime) {
        var self = this, $parent = $elem.parent(), finalSrc, classes, alt;

        $parent.find("img").remove();
        classes = $elem.data("class") || "";
        alt = $parent.data("alt") || "";

        if (this.retina && $elem.data("retina")) {
            finalSrc = $elem.data("retina");
        } else {
            finalSrc = $elem.data("src");
        }

        if (firstTime) {
            $elem.html("<img src='" + finalSrc + "' class='" + classes + "' alt='" + alt + "'/>");
        } else {
            $("<img>").on("load", function () {
                $elem.html("<img src='" + finalSrc + "' class='" + classes + "' alt='" + alt + "'/>");
            }).attr("src", finalSrc);
        }
        self.loadedCheck(finalSrc, firstTime);
    };

    PictureLoader.prototype.update = function () {
        var self = this,
            wWidth = $(window).width();
        this.loadedCount = 0;
        this.$preImages.each(function (index, outer) {
            var $preImage = $(outer);
            var generalClasses = $preImage.data("class");
            $preImage.find(".media-selector").each(function (index, inner) {
                var $this = $(inner),
                    minViewport = parseInt($this.data("min-width"), 10) || 0,
                    maxViewport = parseInt($this.data("max-width"), 10) || 9999999999999; //huge screens from the future ;)

                if (wWidth >= minViewport && wWidth <= maxViewport) {
                    if (!firstRound) {
                        if (wWidth < self.largerWidth && $this.data("force-replace")) {
                            self.replaceImage($this, false);
                        } else if (wWidth > self.largerWidth) {
                            self.replaceImage($this, false);
                        }
                    } else {
                        this.largerWidth = minViewport;//setting at the lowest viewport (width config) size of current viewport
                        self.replaceImage($this, true);
                    }
                    return false;
                }
            });
        });
        firstRound = false;
    };

    PictureLoader.prototype.bindings = function () {
        var self = this;
        $(window).on("resize", function () {
            if (!self.badBrowser) {
                clearTimeout(timer);
                setTimeout(function () {
                    self.update();
                }, 1000);
            }
        });
    };

    PictureLoader.prototype.checkPixelRatio = function () {
        var returnValue, mediaQuery = "(-webkit-min-device-pixel-ratio: 2), (min--moz-device-pixel-ratio: 2), (-o-min-device-pixel-ratio: 2/2), (min-resolution: 2dppx)";
        if (window.devicePixelRatio > 1) {
            returnValue = true;
        } else if (window.matchMedia && window.matchMedia(mediaQuery).matches) {
            returnValue = true;
        } else {
            returnValue = false;
        }
        return returnValue;
    };

    message_bus.listen(document.body, 'picture-loader', function (e, data) {
        pictureLoader = new PictureLoader(data);
    });

});
//-------- autofill-stickynav --------//
/*global ngbs, jQuery */
ngbs.widget('autofill-stickynav', function (message_bus, $elements) {
    'use strict';

    var $ = jQuery, sticky;

    function Sticky(config) {
        this.$nav = config.$el;
        this.$content = this.$nav.find('.nav-content');
        this.$items = this.$content.find('li');
        this.offset = config.offset;
        this.items_active = config.items;
        this.duration = config.duration || 500;
        this.CLASS_NAV = 'sticky';
        this.CLASS_ACT = 'active';
        this.CLASS_DIS = 'disabled';

        this.init();
        this.bindHandlers();
    }

    Sticky.prototype = {
        init: function () {
            this.populateNav();
        },

        bindHandlers: function () {
            var self = this;

            this.$content.on('click', 'a', function (e) {
                e.preventDefault();
                var $item = $(this).parent('li');
                GWS && GWS.broadcast('subnav-item', $(this));
                if ($item.data('section')) {
                    $(window).trigger('disableViewPoints');
                    self.toggleActive($item);
                    self.scrollTo($(this).attr('href'));
                }
                if ($item.data('metric')) {
                    message_bus.send(document.body, 's550-metrics', {action: 'click',  name: 'mr-' + $item.data('metric') + '-interaction'});
                }
            });

            $(window).on('scroll', function () {
                if ($(window).scrollTop() >= self.offset) {
                    self.enable();
                } else {
                    self.disable();
                }
                GWS && GWS.broadcast('subnav-scroll');
            });
        },

        populateNav: function () {
            var self = this;

            this.$items.each(function () {
                if ($.inArray($(this).data('section'), self.items_active) > -1 || ($(this).data('show') === true)) {
                    $(this).removeClass(self.CLASS_DIS);
                } else {
                    $(this).remove();
                }
            });
        },

        enable: function () {
            this.$nav.addClass(this.CLASS_NAV);
        },

        disable: function () {
            this.$nav.removeClass(this.CLASS_NAV);
        },

        toggleActive: function ($item) {
            this.$content.find('li').removeClass(this.CLASS_ACT);
            $item.addClass(this.CLASS_ACT);
        },

        scrollTo: function (anchor) {
            var position = $(anchor).offset().top - this.$content.outerHeight() + 1;

            $('html, body').stop().animate({
                scrollTop: position
            }, sticky.duration, function () {
                $(window).trigger('enableViewPoints');
            });
        }

    };

    message_bus.listen(document.body, 'sticky-add', function (e, data) {
        sticky = new Sticky(data);
    });

});

//-------- carousel-slider --------//
/*global ngbs, __params, jQuery */
ngbs.widget("carousel-slider", function (message_bus, $elements) {
    'use strict';
    var $ = jQuery;

    var timerControls, clickEvent = ("ontouchstart" in window) ? "touchstart" : "click";

    function Carousel(options) {
        if (options.$el.hasClass("carousel-enabled")) {
            return;
        }

        this.$el = options.$el;
        this.options = {
            name: options.name,
            selector: ".carousel-item", //jquery string selector for every slide
            initialPage: this.$el.data('initialpage') || 0, // initial page
            showArrows: this.$el.data('arrows') == false ? false : true, // show arrow at the sides of the carousel

            speed: this.$el.data('speed') || 400, // global aniamtion speed
            animate: this.$el.data('animate') == false ? false : true, //apply jquery animations, maybe you want to use CSS3 transitions
            easing: this.$el.data('easing') || "swing",

            autoscroll: this.$el.data('autoscroll') || false, // auto scroll carousel
            autoscrollTime: this.$el.data('autoscrolltime') || 4000, // ms of timeout, slide next page when autoscroll is true
            scrollAmount: this.$el.data('scrollamount') || 0, // not implemented yet :( //0 if you want to scroll page by page else apply continous scrolling, this is the amount of pixesls

            adjustSlide: this.$el.data('adjustslide') == false ? false : true, //adjust slide width to fit container according amount of pages

            forceCarousel: this.$el.data('forcecaruosel') || false, // force carousel even if there is just one slide

            hideControls: this.$el.data('hidecontrols') || false, // hide controls on start
            autoControls: this.$el.data('autocontrols') == false ? false : true, // when hideControls is true, this flag automatically show/hide controls when user mouseover or touches carousel

            cycle: this.$el.data('cycle') == false ? false : true, // when using scrollByPage if the end of carousel is reached, start from the beggining, same backwards :P
            infinite: this.$el.data('infinite') || false, // not implemented yet :(

            /* all callback function returns the instance as the context, please make sure data IS a function */
            onInitialized: options.onInitialized || this.$el.data('oninitialized') || undefined, //callback trggered when successful initialized
            onSlideStart: options.onSlideStart || this.$el.data('onslidestart') || undefined, //callback triggered when starting changing slide (params sent > slide position index)
            onSlideEnd: options.onSlideEnd || this.$el.data('onslideend') || undefined //callback triggered when finishing changing slide (params sent > slide position index)
        };

        this.$disclaimer = options.$disclaimer;
        this.animating = false;
        this.firedSwipe = false;
        this.init();
    }

    Carousel.prototype.getImgsToLoad = function () {
        var $imgs = this.$slides.find('img[data-lazy]');
        this.imgsLoaded = 0;
        return $imgs;
    };

    Carousel.prototype.init = function () {
        var self = this;

        this.$slider = this.$el.find(".carousel-slider-list");
        this.$slides = this.$slider.find(this.options.selector);

        this.imgsToLoad = this.getImgsToLoad();

        this.slidesLength = this.$slides.length;
        if (this.slidesLength === 1 && !this.options.forceCarousel) {//there is just one slide and carousel not forced
            return;
        }

        if (this.imgsToLoad.length) {
            this.imgsToLoad.each(function (i, e) {
                self.loadImg($(e));
            });
        } else {
            this.launchCarousel();
        }
    };

    Carousel.prototype.loadImg = function ($img) {
        var self = this,
            newSrc = $img.data('lazy');

        $('<img>').load(function () {
            $img.attr('src', newSrc);
            self.imgsLoaded++;
            self.checkLoaded();
        }).attr('src', newSrc);
    };

    Carousel.prototype.checkLoaded = function () {
        if (this.imgsLoaded === this.imgsToLoad.length) {
            this.launchCarousel();
        }
    };

    Carousel.prototype.launchCarousel = function () {
        var sliderWidth = 0;

        this.$el.addClass("carousel-enabled");

        this.createControls();

        if (this.options.adjustSlide) {
            sliderWidth = 100 * this.slidesLength + "%";
            this.$slides.addClass("fit-width").css({width: (100 / this.slidesLength).toFixed(2) + "%"});
        } else {
            this.$slider.width('auto');
            this.$slides.each(function (index, elem) {
                sliderWidth += $(this).outerWidth();
            });
            this.totalSlidesWidth = sliderWidth;
            this.trimLeft = this.$slider.outerWidth() - this.totalSlidesWidth;
            sliderWidth += "px";
        }
        this.$slider.css({width: sliderWidth, "height": "auto"});

        //TODO: add function here
        /*blGlobal.utils.disableSelect(this.$navigationArrows);*/
        this.visibleSlides = Math.round(this.$el.outerWidth() / this.$slides.first().outerWidth());
        this.totalPages = Math.ceil(this.$slides.length / this.visibleSlides);

        this.slideTo({to: this.options.initialPage, animate: false});
        if (this.options.autoscroll) {
            this.autoscroll();
        }

        if (this.options.hideControls) {
            this.hideControls();
            if (this.options.autoControls) {
                this.autoControls();
            }
        }

        if ("touchstart" in window || 'ontouchstart' in document.documentElement) {
            this.mobileNavigation();//touch-enabled environment detected, check: doesn't override proto.bindings
        }

        this.bindings();

        if (typeof this.options.onInitialized === "function") {
            this.options.onInitialized.call();
        }

    };

    Carousel.prototype.bindings = function () {
        var self = this;
        this.$navigationButtons.on(clickEvent, function () {
            self.autoscrollPause();
            self.slideTo($(this).index());
            GWS && GWS.broadcast('carousel-slider-bullet');
        });

        this.$navigationArrows.on(clickEvent, function () {
            self.autoscrollPause();
            if ($(this).hasClass("carousel-prev")) {
                self.prev();
            } else {//should be carousel-next
                self.next();
            }
            GWS && GWS.broadcast('carousel-slider-arrow');
        });

        $(window).on("resize", function () {
            self.updateView();
        })

    };

    //TODO: check all this functions, selectors, variables, etc., this needs a lot of work, and should be on bindings !!!
    Carousel.prototype.mobileNavigation = function () {
        var initialX, scrollY, scrollLen, scrollYLen, absScrollLen = 0,
            self = this,
            viewportWidth = $(window).width(),
            minScrollLen = viewportWidth / 6,
            slideWidth = this.$el.find(".carousel-item").width();

        this.$slides.on("touchstart", function (evt) {
            if (evt.touches === undefined && evt.originalEvent !== undefined){
                evt.touches = evt.originalEvent.touches;
            }

            initialX = evt.touches[0].pageX;
            scrollY = evt.touches[0].pageY;
            scrollYLen = 0;
        });

        this.$slides.on("touchmove", function (evt) {
            var isScrolling, delta;
            var event = evt.originalEvent;

            // ensure swiping with one touch and not pinching
            if (event.touches.length > 1 || event.scale && event.scale !== 1) return;

            var touches = event.touches[0];
            // measure change in x and y
            delta = {
                x: touches.pageX - initialX,
                y: touches.pageY - scrollY
            };
            // determine if scrolling test has run - one time test
            if ( typeof isScrolling == 'undefined') {
                isScrolling = !!(isScrolling || Math.abs(delta.x) < Math.abs(delta.y));
            }
            // if user is not trying to scroll vertically
            if (!isScrolling) {
                if (evt.touches === undefined && evt.originalEvent !== undefined){
                    evt.touches = evt.originalEvent.touches;
                }
                scrollLen = -((evt.touches[0].clientX || evt.touches[0].pageX) - initialX);
                absScrollLen = Math.abs(scrollLen);
                if (absScrollLen > 10 && absScrollLen <= 15) {
                    //blGlobal.utils.disableScrolling();
                } else if (absScrollLen > 15) {
                    scrollYLen = (evt.touches[0].clientY || evt.touches[0].pageY) - scrollY;
                    if (delta.x > 0) {
                        if (!self.animating)
                            self.prev();
                    } else if (delta.x < 0) {
                        if (!self.animating)
                            self.next();
                    }
                }
                self.autoscrollPause();
                if (self.options.name && !self.firedSwipe) {
                    ngbs.metrics.click('mr-buzz-' + self.options.name + '-interaction-mobile')
                    self.firedSwipe = true;
                }
            }
        });
    };

    Carousel.prototype.next = function () {
        return this.slideTo(this.currentPage + 1);
    };

    Carousel.prototype.prev = function () {
        return this.slideTo(this.currentPage - 1);
    };

    Carousel.prototype.slideTo = function (options) {
        var self = this, toPage, left, timer;
        this.animating = true;
        if (typeof options === "number") {
            toPage = this.checkRange(options);
        } else if (typeof options === "object") {
            toPage = options.to;
        } else {
            toPage = -1;
        }

        if (toPage === -1) {
            return false;
        }

        this.updateControls(toPage);
        this.$slider.attr("data-page", toPage);


        if (this.options.adjustSlide) {
            left = -100 * toPage + "%";
        } else {
            if (this.options.scrollAmount) {
                left = parseInt(this.$slider.css("margin-left"), 10) - this.options.scrollAmount;
            } else {
                var moveTo = (Math.abs(toPage * this.$slides.width() * this.visibleSlides)) * (-1);
                left = moveTo;
            }

            if (left < this.trimLeft && toPage !== 0) {
                left = this.trimLeft;
                this.currentPage = this.slidesLength - 1;
            }
        }

        (typeof self.options.onSlideStart === "function") && self.options.onSlideStart.call(self, {toPage: toPage, currentPage: self.currentPage, speed: self.options.speed});
        if (this.options.animate) {

            this.$slider.stop().animate({"margin-left": left}, self.options.speed, self.options.easing, function () {
                self.animating = false;
                (typeof self.options.onSlideEnd === "function") && self.options.onSlideEnd.call(self, {toPage: toPage, currentPage: self.currentPage, speed: self.options.speed});
            });
        } else {
            this.$slider.stop().css({"margin-left": left});
            (typeof self.options.onSlideEnd === "function") && self.options.onSlideEnd.call(self, {to: toPage, currentPage: self.currentPage, speed: self.options.speed});
        }
        this.currentPage = toPage;
        return true;
    };

    /* check slides length and current page to avoid going out of bounds */
    Carousel.prototype.checkRange = function (toPage) {
        if (toPage === this.currentPage) {
            return -1;
        } else if (toPage < 0) {
            if (this.options.cycle) {
                return (this.slidesLength - 1);
            } else {
                return 0;
            }
        } else if (toPage > this.slidesLength - 1) {
            if (this.options.cycle) {
                return 0;
            } else {
                return this.slidesLength - 1;
            }
        } else {
            return toPage;
        }
    };

    //TODO: revision to selectors and DOM nodes creation performance
    Carousel.prototype.createControls = function () {
        var bullets = "", i;
        for (i = 0; i < this.slidesLength; i++) {
            bullets += "<li class='carousel-meatball'></li>";
        }
        this.$slider.after("<div class='carousel-text-centered'><ul class='carousel-navigation'>" + bullets + "</ul></div>");
        if (this.options.showArrows) {
            this.$slider.after("<div class='carousel-prev arrow'></div><div class='carousel-next arrow'></div>");
        }

        this.$navigationArrows = this.$el.find(".arrow");
        this.$navigationButtons = this.$el.find(".carousel-meatball");

        if (this.$disclaimer && this.$disclaimer.length) {
            this.$disclaimer.addClass("carousel-disclaimer").appendTo(this.$el);
        }
    };

    Carousel.prototype.showControls = function (options) {
        options = $.extend({}, this.options, options);
        if (options.animate) {
            this.$navigationArrows.fadeIn(options.speed);
            this.$navigationButtons.fadeIn(options.speed);
        } else {
            this.$navigationArrows.show();
            this.$navigationButtons.show();
        }
    };

    Carousel.prototype.hideControls = function (options) {
        options = $.extend({}, this.options, options);
        if (options.animate) {
            this.$navigationArrows.fadeOut(options.speed);
            this.$navigationButtons.fadeOut(options.speed);
        } else {
            this.$navigationArrows.hide();
            this.$navigationButtons.hide();
        }
    };

    /*
        Not touch friendly :(
    */
    Carousel.prototype.autoControls = function () {
        var self = this;
        this.$el.on('mouseenter', function (e) {
            clearTimeout(timerControls);
            timerControls = setTimeout(function () {
                self.showControls();
            }, self.options.speed / 2);
        });

        this.$el.on('mouseleave', function (e) {
            clearTimeout(timerControls);
            timerControls = setTimeout(function () {
                self.hideControls();
            }, self.options.speed / 2);
        });
    };


    //TODO: update function to refresh carousel if new items are found
    Carousel.prototype.updateView = function () {
        if (!this.options.adjustSlide) {
            this.trimLeft = this.$slider.parent().outerWidth() - this.totalSlidesWidth;
        }
    };

    Carousel.prototype.updateControls = function (toPage) {
        /*
            checking if we should show prev/next arrow depending options (cycle, etc.)
        */
        if (this.options.adjustSlide) {
            if (toPage === 0 && !this.options.cycle && !this.options.hideControls) {
                if (this.options.animate) {
                    this.$navigationArrows.eq(0).fadeOut();//prev arrow
                    if (this.slidesLength === 2) {
                        this.$navigationArrows.eq(1).fadeIn()
                    }
                } else {
                    this.$navigationArrows.eq(0).hide();//prev arrow
                    if (this.slidesLength === 2) {
                        this.$navigationArrows.eq(1).show()
                    }
                }
            } else if (toPage === this.slidesLength - 1  && !this.options.cycle && !this.options.hideControls) {
                if (this.options.animate) {
                    this.$navigationArrows.eq(1).fadeOut();//next arrow
                    if (this.slidesLength === 2) {
                        this.$navigationArrows.eq(0).fadeIn()
                    }
                } else {
                    this.$navigationArrows.eq(1).hide();//next arrow
                    if (this.slidesLength === 2) {
                        this.$navigationArrows.eq(0).show()
                    }
                }
            } else if (!this.options.hideControls) {
                if (this.options.animate) {
                    this.$navigationArrows.fadeIn();
                } else {
                    this.$navigationArrows.show();
                }
            }
        } else {
            if (toPage !== 0) {
                if (this.options.animate) {
                    this.$navigationArrows.eq(0).fadeIn();//next arrow
                } else {
                    this.$navigationArrows.eq(0).show();//next arrow
                }
            } else {
                if (this.options.animate) {
                    this.$navigationArrows.eq(0).fadeOut();//next arrow
                } else {
                    this.$navigationArrows.eq(0).hide();//next arrow
                }
            }

            if (toPage !== (this.totalPages - 1)) {
                if (this.options.animate) {
                    this.$navigationArrows.eq(1).fadeIn();//next arrow
                } else {
                    this.$navigationArrows.eq(1).show();//next arrow
                }
            } else {
                if (this.options.animate) {
                    this.$navigationArrows.eq(1).fadeOut();//next arrow
                } else {
                    this.$navigationArrows.eq(1).hide();//next arrow
                }
            }
        }

        /*
            update meatball images on/off
        */
        this.$navigationButtons.removeClass("active").eq(toPage).addClass("active");
    };

    Carousel.prototype.autoscroll = function (interval) {
        var self = this, interval = interval || this.options.autoscrollTime;
        this.timer = setTimeout(function () {
            if (self.next()) {
                self.autoscroll(interval + self.options.speed);
            }
        }, interval);
    };

    Carousel.prototype.autoscrollPause = function () {
        clearTimeout(this.timer);
    };

    /*
        you need to pass $el as a jQuery collection of a UL to apply the carousel or a DIV containing an UL
        message_bus.send(document.body, 'carousel-create', {
            $el: jQuery collection,
            .
            .
            .
            .
        });
    */

    message_bus.listen(document.body, 'carousel-create', function (e, data) {
        var config = {}, i = 0, carousel;
        config = $.extend({}, data);
        data.$el.each(function (index, $el) {
            config.$el = data.$el.eq(index);
            carousel = new Carousel(config);
        });
    });

});
//-------- gallery-slider --------//
/*global ngbs, jQuery */
ngbs.widget("gallery-slider", function (message_bus, $elements) {
    'use strict';

    var $ = jQuery, gallery;

    function GallerySlider(config) {
        this.$gallery = config.$el;
        this.$container = this.$gallery.find('.gallery-container');
        this.$wrapper = this.$container.find('.gallery-wrapper');
        this.$photos = this.$wrapper.find('.gallery-photo');
        this.$scrollbar = this.$container.find('.gallery-scroller');
        this.$arrows = this.$container.find('.arrow');
        if (this.$scrollbar.length) {
            this.$wheel = this.$scrollbar.find('.wheel');
        }
        this.zoomEnabled = config.zoom;
        this.firedScroll = false;
        this.firedFull = false;
        this.ACT_CLASS = 'active';
        this.DIS_CLASS = 'disabled';

        if (navigator.appName.indexOf("Internet Explorer") !== -1) {
            this.badBrowser = (navigator.appVersion.indexOf("MSIE 9") === -1 && navigator.appVersion.indexOf("MSIE 1") === -1);
        }

        this.touchSupport = 'ontouchstart' in document.body;
        this.animating = false;
        this.init();
    }

    GallerySlider.prototype = {
        init: function () {
            var self = this;

            this.buildImgs();

            this.imgsToLoad = this.getImgsToLoad();

            if (this.imgsToLoad.length) {
                this.imgsToLoad.each(function (i, e) {
                    self.loadImg($(e));
                });
            } else {
                this.launch();
            }

            if (this.touchSupport) {
                this.addSwipeSupport();
            }
        },

        buildImgs: function () {
            this.$photos.each(function (index, elem) {
                var $this = $(elem),
                    wWidth = $(window).width(),
                    $input = $this.find("input[type='hidden']"),
                    src = "",
                    width = 0;
                $this.find("img").remove();
                if (wWidth <= 568) {
                    src = $input.data("small") || $input.data("medium") || $input.data("large");
                } else if (wWidth > 568 && wWidth <= 768) {
                    src = $input.data("medium") || $input.data("large");
                } else if (wWidth > 768) {
                    src = $input.data("large");
                }
                $this.append("<img src='" + src + "' >");
            });
        },

        getImgsToLoad: function () {
            var $imgs = this.$photos.find('img[data-lazy]');
            this.imgsLoaded = 0;
            return $imgs;
        },

        loadImg: function ($img) {
            var self = this,
                newSrc = $img.data('lazy');

            $('<img>').load(function () {
                $img.attr('src',  newSrc);
                self.imgsLoaded++;
                self.checkLoaded();
            }).attr('src', newSrc);
        },

        checkLoaded: function () {
            var self = this;
            if (this.imgsLoaded === this.imgsToLoad.length) {
                window.setTimeout(function () {
                    self.launch();
                }, 1000);
            }
        },

        launch: function () {
            this.$gallery.addClass('gallery-enabled');
            this.configureWrapper();
            this.checkArrows();
            this.setHandlers();
        },

        setHandlers: function () {
            var self = this;

            this.$container.on('click', '.gallery-scroller', function (e) {
                if (!$(e.target).is(self.$wheel)) {
                    var shift = self.calculateShift(e.clientX);
                    self.moveTo(self.$wrapper, -shift.wrapper, true);
                    self.moveTo(self.$wheel, shift.scroller, true);
                    if (!self.firedScroll) {
                        message_bus.send(document.body, 's550-metrics', {action: 'click', name: 'mr-gallery-scroll-interaction'});
                        self.firedScroll = true;
                    }
                    GWS && GWS.broadcast('gallery-slider-scroll-click');
                }
            });

            this.$container.on('mousedown', '.wheel', '.gallery-scroller', function (e) {
                e.preventDefault();
                self.isMouseDown = true;
                self.configureDrag(e);
                GWS && GWS.broadcast('gallery-slider-scroll-mousedown');
            });

            this.$container.on('click', '.arrow', function () {
                var position = $(this).hasClass('prev') ? -1 : 1;
                self.handleArrows(position);
                if (!self.firedScroll) {
                    message_bus.send(document.body, 's550-metrics', {action: 'click', name: 'mr-gallery-scroll-interaction'});
                    self.firedScroll = true;
                }
                GWS && GWS.broadcast('gallery-slider-arrow');
            });

            // Clear touch events from arrows so it doesn't collapse
            // with swipe functionality
            this.$container.on("touchstart", '.arrow', function (e) {
                e.preventDefault();
                var position = $(this).hasClass('prev') ? -1 : 1;
                self.handleArrows(position);
                if (!self.firedScroll) {
                    ngbs.metrics.click('mr-gallery-scroll-interaction-mobile')
                    self.firedScroll = true;
                }
                GWS && GWS.broadcast('gallery-slider-arrow');
                e.stopPropagation();
            });
            this.$container.on("touchmove", '.arrow', function (e) {
                e.preventDefault();
                e.stopPropagation();
            });
            this.$container.on("touchend", '.arrow', function (e) {
                e.preventDefault();
                e.stopPropagation();
            });

            $('body, html').on('mousemove', function (e) {
                if (e.which === 1 && self.isMouseDown) {
                    self.configureDrag(e);
                    if (!self.firedScroll) {
                        message_bus.send(document.body, 's550-metrics', {action: 'click', name: 'mr-gallery-scroll-interaction'});
                        self.firedScroll = true;
                    }
                    GWS && GWS.broadcast('gallery-slider-scroll-mousemove');
                }
            });

            $('body, html').on('mouseup', function () {
                if (self.isMouseDown) {
                    self.isMouseDown = false;
                    GWS && GWS.broadcast('gallery-slider-scroll-mouseup');
                }
            });

            this.$container.on('click', '.zoomable', function (e) {
                e.stopPropagation();

                if (self.zoomEnabled) {
                    self.fireZoom($(this));
                    if (!self.firedFull) {
                        message_bus.send(document.body, 's550-metrics', {action: 'click', name: 'mr-gallery-full-interaction'});
                        self.firedFull = true;
                    }
                    GWS && GWS.broadcast('gallery-slider-image', $(this));
                }
            });

            $(window).on("resize", function () {
                if (!self.badBrowser) {
                    self.buildImgs();
                    self.configureWrapper();
                }
            })

        },

        checkArrows: function () {
            if (this.$arrows) {
                this.$arrows.removeClass(this.DIS_CLASS);
                if (this.$wrapper.position().left === 0) {
                    this.$arrows.filter('.prev').addClass(this.DIS_CLASS);
                } else if (this.$wrapper.position().left - this.$container.outerWidth() + this.$wrapper.outerWidth() === 0) {
                    this.$arrows.filter('.next').addClass(this.DIS_CLASS);
                }
            }
        },

        configureWrapper: function () {
            var self = this,
                wrapper_width = 0,
                totalImgs = this.$photos.length,
                loaded = 0,
                timer,
                $img,
                width;

            this.$photos.each(function (index, elem) {
                $("<img/>").on("load", function () {
                    loaded++;
                }).attr("src", $(this).find("img").attr("src"));
            });

            timer = setInterval(function () {
                if (totalImgs === loaded) {
                    clearTimeout(timer);
                    self.$photos.each(function () {
                        var $photo = $(this),
                            $img = $photo.find('img');

                        //Fix problem with ie7 width calculations
                        if (self.badBrowser) {
                            wrapper_width += $img.outerWidth();
                        } else {
                            wrapper_width += $photo.outerWidth();
                            $img.css('width', $photo.outerWidth());
                        }
                    });
                    if (wrapper_width > 0)
                       self.$wrapper.width(wrapper_width + 1);

                    if (self.zoomEnabled) {
                        self.checkDeepLink();
                    }
                }
            }, 100);
        },

        configureDrag: function (e) {
            var offset = e.clientX,
                left = this.$wheel.offset().left,
                left_end,
                shift = {};

            switch (e.type) {
            case 'mousedown':
                this.wheel_left_ini = offset;
                this.wheel_left_end = null;
                break;
            case 'mousemove':
                this.wheel_left_end = offset;
                break;
            }

            if (this.wheel_left_end) {
                shift = this.calculateShift(this.wheel_left_end);
                this.moveTo(this.$wrapper, -shift.wrapper);
                this.moveTo(this.$wheel, shift.scroller);
            }
        },

        handleArrows: function (position) {
            var $active = this.$photos.filter('.' + this.ACT_CLASS),
                left = $active.position().left,
                width = $active.outerWidth(),
                wrapper_offset,
                scrollbar_offset;
            if (!this.animating) {
                this.animating = true;
                switch (position) {
                case -1:
                    if (this.$wrapper.position().left !== -left) {
                        wrapper_offset = left;
                    } else {
                        wrapper_offset = $active.prev('.gallery-photo').position().left;
                    }
                    break;
                case 1:
                    wrapper_offset = left + $active.outerWidth();
                    break;
                }

                if (-wrapper_offset <= -(this.$wrapper.outerWidth() - this.$container.outerWidth())) {
                    wrapper_offset = this.$wrapper.outerWidth() - this.$container.outerWidth();
                }

                this.moveTo(this.$wrapper, -wrapper_offset, true);

                if (this.$wheel) {
                    scrollbar_offset = wrapper_offset / (this.$wrapper.outerWidth() - this.$container.outerWidth()) * (this.$scrollbar.outerWidth() - this.$wheel.outerWidth());
                    this.moveTo(this.$wheel, scrollbar_offset, true);
                }
            }
        },

        calculateShift: function (x) {
            var scrollbar_width = this.$scrollbar.outerWidth(),
                wheel_width = this.$wheel.outerWidth(),
                wheel_axis = wheel_width / 2,
                scrollbar_left = x + wheel_axis >= scrollbar_width ? scrollbar_width - wheel_width
                                : x - wheel_axis <= 0 ? 0
                                : x - wheel_axis,
                wrapper_left = (this.$wrapper.outerWidth() - this.$container.outerWidth()) * scrollbar_left / (scrollbar_width - wheel_width);

            return {wrapper: wrapper_left, scroller: scrollbar_left};
        },

        moveTo: function ($elem, offset, animate) {
            var self = this;

            if (animate) {
                $elem.animate({left: offset}, 500, function () {self.callback(); self.animating = false; });
            } else {
                $elem.css('left', offset);
                this.callback();
            }
        },

        callback: function () {
            this.toggleActive();
            this.checkArrows();
        },

        toggleActive: function () {
            var self = this;

            this.$photos.removeClass(this.ACT_CLASS);
            this.$photos.each(function () {
                if (self.$wrapper.position().left <= -$(this).position().left && self.$wrapper.position().left > -$(this).position().left - $(this).outerWidth()) {
                    $($(this)[0]).addClass(self.ACT_CLASS);
                    return;
                }
            });
        },

        addSwipeSupport: function () {
            var initialX, scrollY, scrollLen, scrollYLen, absScrollLen = 0,
                self = this,
                viewportWidth = $(window).width(),
                minScrollLen = viewportWidth / 6;

            this.$gallery.on("touchstart", function (event) {
                var evt = event.originalEvent;
                initialX = evt.touches[0].pageX;
                scrollY = evt.touches[0].pageY;
                scrollYLen = 0;
            });

            this.$gallery.on("touchmove", function (evt) {
                var isScrolling, delta, position;
                var event = evt.originalEvent;

                // ensure swiping with one touch and not pinching
                if (event.touches.length > 1 || event.scale && event.scale !== 1) return;

                var touches = event.touches[0];
                // measure change in x and y
                delta = {
                    x: touches.pageX - initialX,
                    y: touches.pageY - scrollY
                };
                // determine if scrolling test has run - one time test
                if ( typeof isScrolling == 'undefined') {
                    isScrolling = !!(isScrolling || Math.abs(delta.x) < Math.abs(delta.y));
                }
                // if user is not trying to scroll vertically
                if (!isScrolling) {
                    if (evt.touches === undefined && evt.originalEvent !== undefined){
                        evt.touches = evt.originalEvent.touches;
                    }
                    scrollLen = -((evt.touches[0].clientX || evt.touches[0].pageX) - initialX);
                    absScrollLen = Math.abs(scrollLen);
                    if (absScrollLen > 10 && absScrollLen <= 15) {
                        //blGlobal.utils.disableScrolling();
                    } else if (absScrollLen > 15) {
                        scrollYLen = (evt.touches[0].clientY || evt.touches[0].pageY) - scrollY;
                        if (delta.x > 0) {
                            if (!self.animating)
                                position = -1;
                        } else if (delta.x < 0) {
                            if (!self.animating)
                                position = 1;
                        }
                        self.handleArrows(position);
                        if (!self.firedScroll) {
                            ngbs.metrics.click('mr-gallery-scroll-interaction-mobile')
                            self.firedScroll = true;
                        }
                    }
                }
            });
        },

        checkDeepLink: function () {
            /*jslint regexp: true */
            var url_parts = this.checkRegex(),
                self = this;

            if (url_parts) {
                var photo = url_parts[4].indexOf('&') > -1 ? url_parts[4].split('&')[0] : url_parts[4];
                this.$photos.each(function () {
                    if (photo === $(this).data('name')) {
                        self.fireZoom($(this), window.location.href);
                        return false;
                    }
                });
            }
        },

        checkRegex: function () {
            var regex = /(\?|\&)(gallery)(\=)(.*)/;
            return window.location.href.match(regex);
        },

        constructDeepLink: function (name) {
            var url_parts = this.checkRegex(),
                href = window.location.href,
                deeplink,
                param;

            if (url_parts) {
                var target = url_parts[4].indexOf('&') > -1 ? url_parts[4].split('&')[0] : url_parts[4];
                deeplink = href.replace(target, name);
            } else {
                param = href.indexOf('?') > -1 ? '&' : '?';
                deeplink = href + param + 'gallery=' + name;
            }
            return deeplink;
        },

        fireZoom: function ($selected, deeplink) {
            message_bus.send(document.body, 'zoom-open', {
                $el: $selected,
                config: $.extend($selected.data(), {deeplink: deeplink || this.constructDeepLink($selected.data('name'))})
            });
        }
    };

    message_bus.listen(document.body, 'gallery-add', function (e, data) {
        gallery = new GallerySlider(data);
    });

    message_bus.listen(document.body, 'zoom-deeplink', function (e, data) {
        gallery.fireZoom(data.$el);
    });

});

//-------- zoom-fullscreen --------//
/*global ngbs, jQuery, OpenLayers, GWS */
ngbs.widget('zoom-fullscreen', function (message_bus, $elements) {
    'use strict';
    var $ = jQuery, Zoom;

    function ZoomFullscreen() {
        this.$container = $('.zoom-fullscreen');
        this.$controls = this.$container.find('.zoom-controlbar');
        this.in_place = false;
        this.firedZoom = false;
        this.ACT_CLASS = 'active';
        this.DIS_CLASS = 'disabled';
    }

    ZoomFullscreen.prototype = {
        init: function (data) {
            this.$selected = data.$el;
            this.config = data.config;
            this.$controls.find('li').first().addClass('first');

            if (!this.in_place) {
                this.$container.prependTo('body');
                this.in_place = true;
            }

            if (this.$controls.find('.save').length) {
                this.configureSave();
            }

            if (this.$controls.find('.share-btn').length) {
                this.configureShare();
            }

            this.configureZoom();
            this.bindHandlers();
        },

        bindHandlers: function () {
            var self = this;

            this.$container.on('click', '.zoom-arrow', function () {
                if (!$(this).hasClass(self.DIS_CLASS)) {
                    if ($(this).hasClass('prev')) {
                        self.$selected = self.$selected.prev();
                    } else {
                        self.$selected = self.$selected.next();
                    }
                    self.destroy();
                    message_bus.send(document.body, 'zoom-deeplink', {$el: self.$selected});
                    GWS && GWS.broadcast('zoom-fullscreen-arrow');
                }
            });

            this.$container.on('click', '.zoom-close', function () {
                self.close();
                GWS && GWS.broadcast('zoom-fullscreen-close');
            });

            this.$controls.on('click', '.save', function () {
                GWS && GWS.broadcast('zoom-fullscreen-save');
            });

            this.$controls.on('click', '.share', function () {
                $(this).find('.share-popup').toggleClass(self.ACT_CLASS);
                GWS && GWS.broadcast('zoom-fullscreen-share');
            });
        },

        configureSave: function () {
            var href = this.config.src,
                dwld = this.config.name ? '=' + this.config.name : '';

            this.$controls.find('.save').html('<a href="' + href + '" download' + dwld + ' target="_blank"></a>');
        },

        configureShare: function () {
            this.$controls.find('.share-btn').attr('data-deeplink', this.config.deeplink);
        },

        configureZoom: function () {
            var zoomify,
                width = this.config.width || 5000,
                height = this.config.height || 2300,
                url = this.config.tilespath,
                options,
                image,
                resolutions = [],
                overviewOptions,
                overview,
                zoom,
                zoomW,
                zoomMin,
                i;

            this.open();

            zoomify = new OpenLayers.Layer.Zoomify('Zoomify', url, new OpenLayers.Size(width, height));
            zoomify.transitionEffect = 'resize';
            zoomify.isBaseLayer = false;

            for (i = zoomify.numberOfTiers - 1; i >= 0; i--) {
                resolutions.push(Math.pow(2, i));
            }

            image = new OpenLayers.Layer.Image('Image', url + 'TileGroup0/0-0-0.jpg', new OpenLayers.Bounds(0, 0, width, height), zoomify.tierImageSize[0], {
                alwaysInRange: true
            });

            options = {
                resolutions: resolutions,
                maxExtent: new OpenLayers.Bounds(0, 0, width, height),
                restrictedExtent: new OpenLayers.Bounds(0, 0, width, height),
                numZoomLevels: zoomify.numberOfTiers,
                units: 'pixels',
                controls: [],
                theme: null
            };

            this.map = new OpenLayers.Map('zoom-flip-map', options);

            // add layers
            this.map.addLayer(zoomify);
            this.map.addLayer(image);

            // add controls
            this.map.addControl(new OpenLayers.Control.Zoom({
                zoomInId: 'zoomin',
                zoomOutId: 'zoomout'
            }));
            this.map.addControl(new OpenLayers.Control.KeyboardDefaults());
            this.map.addControl(new OpenLayers.Control.Navigation({
                mouseWheelOptions: {
                    cumulative: false,
                    interval: 0
                },
                dragPanOptions: {
                    enableKinetic: false
                },
                zoomBoxEnabled: false,
                zoomWheelEnabled: true
            }));

            // overview map
            if (this.$container.find('#zoom-overviewmap').length) {
                overviewOptions = {
                    div: document.getElementById('zoom-overviewmap'),
                    size: zoomify.tierImageSize[0],
                    autoPan: false,
                    mapOptions: {
                        numZoomLevels: 1
                    }
                };
                overview = new OpenLayers.Control.OverviewMap(overviewOptions);
                overview.isSuitableOverview = function () {
                    return true;
                };
                this.map.addControl(overview);
            }

            // zoom to fit the viewport
            for (i = 0; i <= options.numZoomLevels; i++) {
                zoomW = image.size.w * resolutions[zoomify.numberOfTiers - 1 - i];
                if (zoomW >= this.map.size.w) {
                    zoomMin = i;
                    this.map.zoomTo(zoomMin);
                    break;
                }
            }

            // zoomin/out listener, prevents zooming passed the minZoom
            this.map.events.register('zoomend', this, function (event) {
                var x = this.map.getZoom();
                if (x < zoomMin) {
                    this.map.zoomTo(zoomMin);
                }
                this.fireZoomMetrics();
            });

            this.map.events.register('move', this, function () {
                this.fireZoomMetrics();
            });
        },

        checkArrows: function () {
            var $arrows = this.$container.find('.zoom-arrow');

            $arrows.addClass(this.DIS_CLASS);

            if (this.$selected.prev().length) {
                $arrows.filter('.prev').removeClass(this.DIS_CLASS);
            }

            if (this.$selected.next().length) {
                $arrows.filter('.next').removeClass(this.DIS_CLASS);
            }
        },

        open: function () {
            this.$container.addClass(this.ACT_CLASS);
            this.checkArrows();
            message_bus.send(document.body, 'view360-remove');
        },

        close: function () {
            this.$container.removeClass(this.ACT_CLASS);
            this.destroy();
        },

        destroy: function () {
            this.map.destroy();
        },

        fireZoomMetrics: function () {
            if (!this.firedZoom) {
                message_bus.send(document.body, 's550-metrics', {action: 'click', name: 'mr-gallery-zoom-interaction'});
                this.firedZoom = true;
            }
        }
    };

    message_bus.listen(document.body, 'zoom-open', function (e, data) {
        if (!(Zoom instanceof ZoomFullscreen)) {
            Zoom = new ZoomFullscreen();
        } else {
            Zoom.$controls.off('click');
            Zoom.$container.off('click');
        }
        Zoom.init(data);
    });

});
//-------- view360 --------//
/*global ngbs, jQuery, GWS */
ngbs.widget('view360', function (message_bus, $elements) {
    "use strict";
    var $ = jQuery, view360;

    var View360 = function (options) {
        if (options instanceof jQuery) {
            this.$el = options;
        } else {
            this.$el = options.$el;
        }

        this.options = {
            showControls: this.$el.data('showcontrols') == false ? false : true,
            showArrows: this.$el.data('showarrows') == false ? false : true,
            autoHideControls: this.$el.data('autohidecontrols') == false ? false : true,
            initialColor: parseInt(this.$el.data('initialcolor'), 10) || 0,
            initialTrim: parseInt(this.$el.data('initialtrim'), 10) || 0,
            initialBackground: parseInt(this.$el.data('initialbackground'), 10) || 0,
            fixedOnBadIE: this.$el.data('fixedonbadie') == false ? false : true,
            direction: this.$el.data('direction') || -1
        };
        this.init(options);
    };

    View360.prototype.init = function (options) {
        var self = this, $initialColor;


        this.$player = this.$el.find(".view360-player");
        this.$components = this.$el.find(".view360-components");
        this.$arrows = this.$el.find(".view360-arrows").children("div");
        this.firedSpin = false;
        this.firedColor = false;
        this.firedRim = false;

        this.$components.find(".view360-color-picker li").each(function (index, elem) {
            var color = $(this).data("color");
            $(this).attr("data-index", index).css({"background-color": color});
        });

        if (!this.options.showControls) {
            this.$components.hide();
        }

        if (!this.options.showArrows) {
            this.$arrows.hide();
        }

        this.fn = options.onFrame || function () {};//setting onFrame event

        this.readSettings();

        if (this.resX && this.resY) {
            this.ratio = (this.resX / this.framesX) / (this.resY / this.framesY);
        }

        if (this.options.fixedOnBadIE) {
            if (navigator.appName.indexOf("Internet Explorer") !== -1) {
                this.badBrowser = (navigator.appVersion.indexOf("MSIE 9") === -1 && navigator.appVersion.indexOf("MSIE 1") === -1);
                if (this.badBrowser) {
                    this.$arrows.parent().addClass('light');
                }
            }
        }

        this.bindings();

        this.trimPath = this.$components.find(".view360-trims li").eq(this.options.initialTrim).addClass("active").data("trim-path");
        this.backgroundSuffix = this.$components.find(".view360-backgrounds li").eq(this.options.initialBackground).addClass("active").data("background-id");

        $initialColor = this.$components.find(".view360-color-picker li").eq(this.options.initialColor);
        this.changeColor($initialColor);
        $initialColor.addClass('active');
        this.preload = this.preloadHtml();
        this.render();

    };

    View360.prototype.readSettings = function () {
        var self = this, wWidth = $(window).width();

        this.$el.find(".qualityChoser").each(function (index, elem) {
            var $this = $(elem),
                minViewport = parseInt($this.data("min-width"), 10) || 0,
                maxViewport = parseInt($this.data("max-width"), 10) || 9999999999999; //huge screens from the future ;)

            if (wWidth >= minViewport && wWidth < maxViewport) {
                self.quality = $this.val();
                self.extension = $this.data("extension");
                self.framesX = parseInt($this.data("columns"), 10);
                self.framesY = parseInt($this.data("rows"), 10);
                self.framesCount = self.framesX * self.framesY;
                self.resX = parseInt($this.data("asset-width"), 10);
                self.resY = parseInt($this.data("asset-height"), 10);

                return false;
            }
        });
    };

    View360.prototype.preloadHtml = function () {
        //style='background-image: url(" + this.trimPath + this.folder + this.quality + "preload.jpg)'
        return "<div class='view360-preloader'><div class='view360-spinner-container'></div></div>";
    };

    View360.prototype.bindings = function () {
        var self = this,
            timer,
            resizeTimer;

        this.$arrows.on("mousedown", function () {
            var $this = $(this);
            if (!self.badBrowser) {
                timer = setInterval(function () {
                    if ($this.data("direction") === "right") {
                        self.$player.spritespin("animate", false);
                        self.$player.spritespin("prev");
                    } else {
                        self.$player.spritespin("animate", false);
                        self.$player.spritespin("next");
                    }
                }, 60);
            }
        }).on("mouseup mouseleave", function () {
            if (!self.badBrowser) {
                clearInterval(timer);
                self.fireRotateMetrics();
                GWS && GWS.broadcast('360-view-rotate');
            }
        });


        this.$components.on("click", "li", function () {
            var $this = $(this), $parent = $this.parent();
            if ($this.hasClass("active")) {
                return;
            }

            $parent.find("li").removeClass("active");
            $this.addClass("active");

            if ($parent.hasClass("trims")) {
                self.trimPath = $this.data("trim-path");
                if (self.$components.find('.view360-modifier-label') && self.$components.find('.view360-modifier-label').css('display') === 'block') {
                    self.$components.find('.view360-modifier-label').text($this.find('.picker-title').text());
                }
                if (!self.firedRim) {
                    message_bus.send(document.body, 's550-metrics', {action: 'click', name: 'mr-360-rim-interaction'});
                    self.firedRim = true;
                }
                GWS && GWS.broadcast('360-view-wheel', $this);
            } else if ($parent.hasClass("backgrounds")) {
                self.backgroundSuffix = $this.data("background-id");
            } else if ($parent.hasClass("colors")) {
                self.changeColor($this);
                if (!self.firedColor) {
                    message_bus.send(document.body, 's550-metrics', {action: 'click', name: 'mr-360-colorizor-interaction'});
                    self.firedColor = true;
                }
                GWS && GWS.broadcast('360-view-color', $this);
            }
            self.preload = self.preloadHtml();
            self.render();
        });


        if (/android/i.test(navigator.userAgent) && /webkit/i.test(navigator.userAgent) || /chrome/i.test(navigator.userAgent)) {
            this.$player.on("touchstart", function (e) {
                e.preventDefault();
            });
        }

        this.$player.on("mousedown", function () {
            if (!self.badBrowser) {
                self.$player.spritespin("animate", false).addClass("playing");
                //TODO: convert to function
                if (self.options.autoHideControls) {
                    self.$components.stop(false, true).fadeOut();
                }

                $(window).on("mouseup", function () {
                    self.$player.removeClass("playing");

                    if (self.options.autoHideControls) {
                        self.$components.stop(false, true).fadeIn();
                    }
                    self.fireRotateMetrics();
                    GWS && GWS.broadcast('360-view-rotate');
                });
            }
        });

        this.$player.on("touchstart", function () {
            self.fireRotateMetrics();
        });

        $(window).on("resize", function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                self.readjust();
            }, 200);
        });
    };

    View360.prototype.render = function (options) {
        var self = this, widgetWidth = this.$el.width(), config = $.extend({}, options);

        config.source = this.trimPath + this.folder + this.quality + this.filename + this.backgroundSuffix + this.extension;
        this.currentOptions = {
            width: widgetWidth,
            height: widgetWidth / self.ratio,

            resolutionX: widgetWidth * self.framesX,
            resolutionY: (widgetWidth / self.ratio) * self.framesY,

            resX: self.resX,
            resY: self.resY,

            frames: this.framesCount,
            framesX: this.framesX,
            frame: config.frame || this.$player.hasClass("spritespin-instance") ? this.$player.spritespin("frame") : 0,

            animate: false,

            sense: config.direction || self.options.direction,
            source: config.source,
            preloadHtml: this.preload
        };

        this.destroy();
    };

    View360.prototype.changeColor = function ($elem) {
        this.folder = $elem.data("folder");
        this.filename = $elem.data("filename");
        if (this.$components.find('.picker-label') && this.$components.find('.picker-label').css('display') === 'block') {
            this.$components.find('.picker-label').text($elem.find('.picker-title').text());
        }
    };

    View360.prototype.destroy = function () {
        var self = this;
        this.$player.removeClass('light');
        if (this.badBrowser) {
            self.$player.addClass('light');
            message_bus.send(document.body, 'view360-light-init', {
                element: self.$player,
                options: self.currentOptions
            });
        } else {
            this.$player.spritespin("destroy");
            this.$player.spritespin(this.currentOptions);
        }
    };

    View360.prototype.readjust = function (player, width) {
        var self = this;
        if (this.badBrowser) {
            message_bus.send(document.body, 'view360-light-reset', {
                element: self.$player,
                options: self.currentOptions
            });
        } else {
            //this.currentOptions.frame = this.$player.spritespin("frame"); //last used frame
            this.preload = undefined;
            this.render(this.currentOptions);
        }
    };

    View360.prototype.fireRotateMetrics = function () {
        if (!this.firedSpin) {
            message_bus.send(document.body, 's550-metrics', {action: 'click', name: 'mr-360-spin-interaction'});
            this.firedSpin = true;
        }
    };

    message_bus.listen(document.body, 'view360-apply', function (e, data) {
        view360 = new View360(data);
    });

    message_bus.listen(document.body, 'view360-remove', function (e, data) {
        view360.destroy();
    });
});
//-------- view360-light --------//
/*global ngbs, jQuery */
jQuery(function () {
    "use strict";
    var $ = jQuery;
    var currFrame = 1,
        currX = 1,
        currY = 0,
        frames = 360,
        framesX = 4,
        animating = false,
        index = 30,
        initalX = 0,
        currXPos = false,
        ratio = 2.23,
        drag = false,
        initialized = false,
        arrowInterval = false,
        $arrows = jQuery(".view360-arrows"),
        $container,
        $frameContainer;

    function goToFirst() {
        currFrame = 1;
        currX = 1;
        animateLeft();
    }

    function animateLeft() {
        currFrame++;
        currX++;
        var nextPos = {x: 0, y: 0};

        nextPos.y = (Math.ceil(currFrame / framesX) - 1)  * $container.height();
        nextPos.x = (currX - 1) * $container.width();

        $frameContainer.css({
            'left': (-1) * nextPos.x + 'px',
            'top' : (-1) * nextPos.y + 'px'
        });
        if (currX >= 4) {
            currX = 0;
        }
    }

    function animateRight() {
        currFrame--;
        currX--;

        if (currX <= 0) {
            currX = 4;
        }

        var nextPos = {x: 0, y: 0};

        nextPos.y = (Math.ceil(currFrame / framesX) - 1)  * $container.height();
        nextPos.x = (currX - 1) * $container.width();

        $frameContainer.css({
            'left': (-1) * nextPos.x + 'px',
            'top' : (-1) * nextPos.y + 'px'
        });
    }

    function goToLast() {
        currFrame = 36;
        currX = 4;
        animateRight();
    }

    function reset360() {
        if ($container !== undefined && $container.length > 0 && $frameContainer !== undefined && $frameContainer.length > 0) {
            animating = false;
            drag = false;
            currFrame = 1;
            currX = 1;
            currY = 0;
            $frameContainer.css({
                'top': 0,
                'left': 0
            });
        }
    }

    function bindEvents() {
        $container.find('.draggable').on('mousedown', function (e) {
            e.preventDefault();
            animating = true;
            drag = true;
            initalX =  e.clientX;
        });

        $container.find('.draggable').on('mouseup', function (e) {
            e.preventDefault();
            animating = false;
            drag = false;
            initalX = false;
        });

        $arrows.on('mousedown', 'div', function (e) {
            drag = false;
            e.preventDefault();
            var direction = jQuery(this).data('direction');
            if (direction === 'left') {
                arrowInterval = setInterval(function () {
                    if (currFrame < 36) {
                        animateLeft();
                        animating = false;
                        setTimeout(function () {
                            animating = true;
                        }, 50);
                    } else if (currFrame === 36) {
                        currX = 4;
                        goToFirst();
                    }
                }, 100);
            } else if (direction === 'right') {
                arrowInterval = setInterval(function () {
                    if (currFrame < 1) {
                        currFrame = 1;
                    }
                    if (currFrame > 1) {
                        animateRight();
                        animating = false;
                        setTimeout(function () {
                            animating = true;
                        }, 50);
                    } else if (currFrame === 1) {
                        goToLast();
                    }
                }, 100);

            }
            e.stopPropagation();
        });

        $arrows.find('div').on('mouseup', function (e) {
            drag = false;
            animating = false;
            e.preventDefault();
            clearInterval(arrowInterval);
            e.stopPropagation();
        });

        $arrows.find('div').on('mouseleave', function (e) {
            drag = false;
            animating = false;
            e.preventDefault();
            clearInterval(arrowInterval);
            e.stopPropagation();
        });

        $container.find('.draggable').on('mousemove', function (event) {
            event.preventDefault();
            if (animating === true) {
                currXPos = event.clientX;
                if (currXPos > initalX && (currXPos - initalX) > 50) {
                    if (currFrame > 1) {
                        animateRight();
                        animating = false;
                        setTimeout(function () {
                            if (drag) {
                                animating = true;
                            }
                        }, 30);
                    } else if (currFrame === 1) {
                        goToLast();
                    }

                } else if ((currXPos < initalX) && (currFrame <= 36) && (initalX - currXPos) > 50) {
                    if (currFrame === 36) {
                        currX = 4;
                        goToFirst();
                    } else {
                        animateLeft();
                        //console.log('left ||| frame: ' + currFrame + ' currX: ' + currX);
                        animating = false;
                        setTimeout(function () {
                            if (drag) {
                                animating = true;
                            }
                        }, 30);
                    }
                }
            }
        });

        jQuery(window).on('resize', function () {
            $container.height($container.width() / ratio);
            $frameContainer.width($container.width() * framesX);
            reset360();
        });
    }

    function init($ele, options) {
        if (!initialized) {
            $container = $ele;
            $container.html('<div class="draggable"></div>');

            $frameContainer = jQuery('<img/>');
            $frameContainer.attr('src', options.source);

            $container.find('.draggable').html($frameContainer);

            $container.height($container.width() / ratio);
            $frameContainer.width($container.width() * framesX);

            bindEvents();
            initialized = true;
        } else {
            $frameContainer.attr('src', options.source);
        }
    }

    ngbs._message_bus.listen(document.body, 'view360-light-init', function (e, data) {
        init(data.element, data.options);
    });

    ngbs._message_bus.listen(document.body, 'view360-light-reset', function (e, data) {
        if (initialized) {
            reset360();
        } else {
            init(data.element, data.options);
        }
    });
});
//-------- reveal-slider --------//
/*global ngbs, __params, jQuery, blGlobal */
ngbs.widget('reveal-slider', function (message_bus, $elements) {
    'use strict';

    var $ = jQuery, revealer;

    var defaultSettings = {
        maskSelector: "*:first"
    }

    function Revealer(options) {
        if (options.$el.hasClass("reveal-slider-enabled")) {
            return;
        }
        this.$slider = options.$el;
        this.options = $.extend({}, defaultSettings, options);
        this.onDrag = options.onDrag;
        this.$scroller = this.$slider.find('.reveal-scroller');
        this.$dragger = this.$scroller.find('.scroller-dragger');
        this.$limits = this.$scroller.find('.scroller-limit');
        this.$background = this.$slider.find('.reveal-img').eq(0);

        this.rangeStart = this.$slider.data('rangestart') || 0;
        this.rangeEnd = this.$slider.data('rangeend') || 100;
        this.initPos = this.$slider.data('initposition') || 0;
        this.lastPos = this.initPos;
        this.firedMetric = false;

        this.init();
    }

    Revealer.prototype.init = function () {
        this.$slider.addClass("reveal-slider-enabled");
        //this.drag(this.initPos * (this.$scroller.outerWidth() - this.$dragger.outerWidth()) / 100);
        this.drag(0);

        this.setHandlers();
    };

    Revealer.prototype.setHandlers = function () {
        var self = this;

        this.$dragger.on('mousedown touchstart', function (e) {
            e.preventDefault();
            e.stopPropagation();
            GWS && GWS.broadcast('reveal-slider-scroll-mousedown');

            $('body').on('mouseup touchend', function (e) {
                self.$dragger.removeClass("active");
                $('body').off('mousemove.reveal-slider, touchmove.reveal-slider');
                GWS && GWS.broadcast('reveal-slider-scroll-mouseup');
            }).on('mousemove.reveal-slider, touchmove.reveal-slider', function (e) {
                e.preventDefault();
                self.$dragger.addClass("active");
                self.calculateDrag(e);
                if (!self.firedMetric) {
                    message_bus.send(document.body, 's550-metrics', {action: 'click', name: 'mr-convertible-interaction'});
                    self.firedMetric = true;
                }
                GWS && GWS.broadcast('reveal-slider-scroll-mousemove');
            });
        });
    };

    Revealer.prototype.calculateDrag = function (e) {
        var value,
            pageX = e.originalEvent.clientX || e.clientX || e.originalEvent.touches[0].clientX || e.touches[0].clientX || e.originalEvent.pageX || e.pageX || e.originalEvent.touches[0].pageX || e.touches[0].pageX,
            scrollerWidth = this.$scroller.outerWidth(),
            draggerWidth = this.$dragger.outerWidth(),
            draggerAxis = draggerWidth / 2;

        value = pageX - this.$scroller.offset().left - draggerAxis;
        value = value >= scrollerWidth - draggerWidth ? scrollerWidth - draggerWidth : value <= 0 ? 0 : value;
        this.drag(value);
    };

    Revealer.prototype.drag = function (val) {
        var draggerOffset = val * 100 / this.$scroller.outerWidth(),
            value = val * 100 / (this.$scroller.outerWidth() - this.$dragger.outerWidth()),
            bounded = (value * (this.rangeEnd - this.rangeStart) / 100) + this.rangeStart;

        this.$dragger.css('left', draggerOffset + '%');
        this.play(bounded);
        this.lastPos = bounded;
        if (typeof this.onDrag === "function") {
            this.onDrag({
                value: value,
                bounded: bounded
            });
        }
    };

    Revealer.prototype.play = function (value) {
        this.$background.css('left', value + '%').find(this.options.maskSelector).css('left', -value + '%');
    };

    message_bus.listen(document.body, 'revealer-update', function (e, data) {
        revealer.play(revealer.lastPos);
    });

    message_bus.listen(document.body, 'revealer-config', function (e, data) {
        revealer = new Revealer(data);
    });

});

//-------- back-to-top --------//
/*global ngbs, jQuery */
ngbs.widget('back-to-top-button', function (message_bus, $elements) {
    'use strict';
    var $ = jQuery, button;

    function BackToTop(config) {
        this.$widget = config.$el;
        this.$button = this.$widget.find('.btt-button');
        this.duration = config.duration || 500;
        this.$button.on('click', function () {
            $('body, html').animate({scrollTop: 0}, self.duration);
            GWS.broadcast('back-to-top');
        });
    }

    message_bus.listen(document.body, 'back-to-top-config', function (e, data) {
        button = new BackToTop(data);
    });

});

//-------- wechat-qr-barcode --------//
/*global ngbs, jQuery */
ngbs.widget('wechat-barcode', function () {
    'use strict';
    var $           = jQuery,
        $WeChatBtn  = $(".share-by-wechat"),
        $WeChatQR   = $(".wechat-qrcode");

    function WeChatBarcode() {

        $WeChatBtn.on("click", function() {
            if ($WeChatQR.hasClass("show")) {
                $WeChatQR.removeClass("show");
            } else {
                $WeChatQR.addClass("show");
            }
        });

    }

    WeChatBarcode();

});
//-------- viewpoints --------//
/*global ngbs, jQuery, console */
ngbs.widget("viewpoints", function (message_bus, $elements) {
    'use strict';

    var $ = jQuery, viewpoint;

    var defaultSettings = {
            offset: 0,
            autoUpdate: true, //update viewpoint on window resize/load
            forceUpdate: false //force update viewpoint on scrolling
        };

    function ViewPoints(options) {
        this.viewpoints = options.$el;
        this.options = $.extend({}, defaultSettings, options);
        this.init(options);

        return this.viewpoints;
    }

    ViewPoints.prototype.init = function (options) {
        var self = this;

        //this.offset = options.offset || 0; //done in update()

        this.active = true;

        this.offsets = [];
        this.heights = [];
        this.triggered = [];

        this.inside = options.inside;
        this.before = options.before;
        this.after = options.after;
        this.crossing = options.crossing;

        this.update();
        this.bindHandlers();
        this.events();

        $(window).trigger("scroll");
    };

    ViewPoints.prototype.bindHandlers = function () {
        var self = this,
            $window = $(window),
            i,
            triggeredDown = [],
            triggeredUp = [],
            scroll,
            oldScroll,
            direction;

        for (i = 0; i < this.viewpoints.length; i++) {
            triggeredDown.push(false);
            triggeredUp.push(false);
        }

        if (this.options.autoUpdate) {
            $window.on("resize.viewpoints, load", function () {
                self.update();
            });
            if (this.options.forceUpdate) {
                $window.on("scroll.viewpoints", function () {
                    if (++i % 3 === 0) {
                        self.update();
                    }
                });
            }
        }

        $window.on("scroll.viewpoints", function () {
            var data = {};

            if (!self.active) {
                return;
            }
            scroll = $window.scrollTop() + self.offset;

            //dont do anything if someone triggers jQuery(window).trgger("scroll")
            if (oldScroll === scroll) {
                return;
            }

            if (scroll > oldScroll) {
                direction = "down";
            } else if (scroll < oldScroll) {
                direction = "up";
            }

            data = {
                direction: direction,
                scrollTop: scroll - self.offset,
                scroll: scroll
            };

            self.viewpoints.each(function (index, elem) {
                if (self.inside && scroll >= self.offsets[index] && scroll <= self.offsets[index] + self.heights[index] && !self.triggered[index]) {
                    //clear triggered status flag for every viewpoint
                    $.each(self.triggered, function (key, value) {
                        self.triggered[key] = false;
                    });
                    //then we set the status flag as triggered for this viewpoint
                    self.triggered[index] = true;
                    data.$el = $(elem);
                    self.inside(self, data);
                }
                if (self.before && scroll < self.offsets[index]) {
                    data.$el = $(elem);
                    self.before(self, data);
                }
                if (self.after && scroll > self.offsets[index] + self.heights[index]) {
                    data.$el = $(elem);
                    self.after(self, data);
                }

                //crossing element (waypoint ;) )
                if (self.crossing) {
                    if (scroll >= self.offsets[index] && direction === "down" && !triggeredDown[index]) {
                        data.$el = $(elem);
                        self.crossing(self, data);
                        triggeredDown[index] = true;
                        triggeredUp[index] = false;
                    } else if (scroll <= self.offsets[index] && direction === "up" && !triggeredUp[index]) {
                        data.$el = $(elem);
                        self.crossing(self, data);
                        triggeredDown[index] = false;
                        triggeredUp[index] = true;
                    }
                }
            });
            oldScroll = scroll;
        });
    };

    ViewPoints.prototype.destroy = function () {
        $(window).off("scroll.viewpoints");
    };

    ViewPoints.prototype.update = function () {
        var self = this;

        this.offsets.length = 0;
        this.heights.length = 0;
        this.triggered.length = 0;

        this.viewpoints.each(function (index, elem) {
            self.offsets.push($(elem).offset().top);
            self.heights.push($(elem).outerHeight());
            self.triggered.push(false);
        });

        if (typeof this.options.offset === "function") {
            this.offset = this.options.offset();
        } else {
            this.offset = this.options.offset || 0;
        }
    };

    ViewPoints.prototype.enable = function () {
        this.active = false;
    };

    ViewPoints.prototype.disable = function () {
        this.active = true;
    };

    ViewPoints.prototype.events = function () {
        var self = this;
        message_bus.listen(document.body, 'viewpoints-update', function (e, data) {
            self.update();
        });

        message_bus.listen(document.body, 'viewpoints-enable', function (e, data) {
            self.enable();
        });

        message_bus.listen(document.body, 'viewpoints-disable', function (e, data) {
            self.disable();
        });
    };

    message_bus.listen(document.body, 'viewpoints', function (e, data) {
        viewpoint = new ViewPoints(data);
    });

    /*
        ViewPoints(options):

        options: object
            $el = jquery target elements
            offset = offset to apply (can be a function if you want variable offset, only executed on init/update )

            inside (retunrObject) = triggered when element is inside viewport
            before (retunrObject) = triggered when element is before top viewport
            after (retunrObject) = triggered when element is after top viewport

            retunrObject {
                $el: jQuery target element
                direction: "up" || "down"
                scroll: scroll value with offset
                scrollTop: current window scroll top value
            }

    */
});

//-------- parallax --------//

/*global ngbs, __params, jQuery */
ngbs.widget("parallax", function (message_bus, $elements) {
    'use strict';

    var $ = jQuery, parallax,
        scroll = 0,
        wWidth,
        offsetTop = [],
        heights = [];

    var defaultSettings = {
        adjustSize: false,
        heightcrop: 1.75 / 2, //height of parallax container to avoid "black" gaps at the bottom (1 = same height)
        animate: true, //use animations when type = "container"
        animateSpeed: 180,
        offset: 0
    };

    function Parallax(options) {
        this.options = $.extend({}, defaultSettings, options);

        this.$el = options.$el || $();
        this.$container = options.cont || $("body");
        this.init();
    }

    Parallax.prototype.init = function () {
        var self = this, imagesLen, timer;

        this.$el.wrap("<div class='parallax-container' />");
        this.$parallax = this.$el.parent(".parallax-container");
        this.$insideImages = this.$parallax.find("img");
        imagesLen = this.$insideImages.length;
        this.active = true;

        if (imagesLen) {
            this.insideImagesCount = 0;
            this.$insideImages.each(function (index, elem) {
                $("<img/>").on("load", function () {
                    self.insideImagesCount++;
                }).attr("src", elem.src);
            });
            timer = setInterval(function () {
                if (self.insideImagesCount === imagesLen) {
                    clearInterval(timer);
                    self.updateView();
                    self.bindings();
                }
            }, 500);
        } else {
            self.updateView();
            self.bindings();
        }
    };

    Parallax.prototype.bindings = function () {
        var self = this, resizing;
        $(window).on("resize", function () {
            //Holy timeouts
            clearTimeout(resizing);
            resizing = setTimeout(function () {
                //self.recalculate();
                self.updateView();
            }, 500);
        }).on("scroll", function () {
            if (self.active) {
                scroll = $(window).scrollTop() - self.options.offset; //do you have issues on IE8? this could be the problem, jQuery failing -.-
                self.parallax(scroll);
            }
        });
    };

    /*
        Make parallax to background image of element
    */
    Parallax.prototype.parallax = function (scroll) {
        var self = this, value;
        this.$parallax.each(function (index, parallaxContainer) {
            var $this = $(parallaxContainer),
                $parallax,
                containerHeight,
                containerMoveLength,
                parallaxHeight,
                parallaxMoveHeight,
                top,
                containerOffsetPerc,
                parallaxValue,
                offsetTop = $this.offset().top - self.wHeight;


            $parallax = $this.children().eq(0);//should be children object with height > 0

            containerHeight = $this.height();//onResize
            containerMoveLength = (self.wHeight + containerHeight);
            parallaxHeight = $parallax.height();//onResize
            parallaxMoveHeight = (containerHeight + parallaxHeight);

            if (scroll > offsetTop && scroll < (offsetTop + $this.outerHeight() + self.wHeight)) {
                top = -1 * (scroll - $this.offset().top - containerHeight);
                containerOffsetPerc = 100 - (top * 100 / containerMoveLength);

                parallaxValue = (parallaxHeight - containerHeight) * containerOffsetPerc / 100;
                if (self.options.animate) {
                    $parallax.css("position", "relative").stop().animate({"top": -parallaxValue + "px"}, self.options.animateSpeed);
                } else {
                    $parallax.css({"position": "relative", "top": -parallaxValue + "px"});
                }
            }
        });
    };

    Parallax.prototype.disable = function () {
        var self = this;
        /* for type background */
        /*this.$el.removeClass("parallax-target");
        this.$parallax.css({"background-image": "none"});*/


        this.active = false;
    };

    Parallax.prototype.enable = function () {
        var self = this;
        /* for type background */
        //this.$el.addClass("parallax-target");
        /*this.$el.each(function (index, elem) {
            //self.$parallax.eq(index).css({"background-image": "url(" + elem.src + ")" });
        });*/


        this.active = true;
    };

    Parallax.prototype.updateView = function () {
        var self = this, newHeight;
        this.wHeight = $(window).height();
        this.wWidth = $(window).width();
        if (self.options.heightcrop !== 1) {
            newHeight = self.options.heightcrop * self.$el.height();
            self.$parallax.css({
                "height": newHeight
            });
        }
        this.parallax(scroll);
        message_bus.send(document.body, "paralax-update-view-done");
    };

    message_bus.listen(document.body, 'parallax-refresh', function (e, data) {
        parallax.updateView();
    });

    message_bus.listen(document.body, 'parallax-enable', function (e, data) {
        parallax.enable();
    });

    message_bus.listen(document.body, 'parallax-disable', function (e, data) {
        parallax.disable();
    });

    message_bus.listen(document.body, 'parallax', function (e, data) {
        if ('ontouchstart' in document.body || 'ontouchstart' in window || 'ontouchstart' in document.documentElement) {
            return false;
        }
        parallax = new Parallax(data);
    });

});

//-------- smooth-scrolling --------//
/*global ngbs, __params, jQuery, blGlobal */
ngbs.widget("smooth-scrolling", function (message_bus, $elements) {
    'use strict';

    var $ = jQuery;
    var scrolling;
    var defaultSettings = {
        speed: 200, // duration/speed of animation
        distance: 150, // how much each mouse wheel even must scroll
        deltaScalar: 3, // 8| cuack / dont' touch this :P
        easing: "linear"
    };

    function Scrolling(options) {
        this.options = $.extend({}, defaultSettings, options);
        if (navigator.appVersion.indexOf("Mac") > -1) {
            return; //MacOS maybe with trackpad enabled events.
        }
        this.bindings();
    }

    Scrolling.prototype.bindings = function () {
        var self = this;
        $(window).on("mousewheel.scrolling", function (e) {
            self.wheel(e.originalEvent);
        });
    };

    Scrolling.prototype.wheel = function (event) {
        var self = this,
            delta = 0;
        event.preventDefault();

        if (event.wheelDelta) {
            delta = event.wheelDelta / (self.options.deltaScalar * 40);
        } else if (event.detail) {
            delta = -event.detail / self.options.deltaScalar;
        }
        $('html, body').stop(false, false).animate({scrollTop: $(window).scrollTop() - (self.options.distance * delta)}, self.options.speed, self.options.easing);
    };

    Scrolling.prototype.disable = function () {
        $(window).off("mousewheel.scrolling");
    };

    Scrolling.prototype.enable = function () {
        this.bindings();
    };

    message_bus.listen(document.body, 'smooth-scrolling', function (e, data) {
        data = data || {};
        scrolling = new Scrolling(data);
    });

    message_bus.listen(document.body, 'smooth-scrolling-disable', function (e, data) {
        scrolling.disable();
    });

    message_bus.listen(document.body, 'smooth-scrolling-enable', function (e, data) {
        scrolling.enable();
    });

});
//-------- section-collapser --------//
/*global ngbs, jQuery */
ngbs.widget('section-collapser', function (message_bus, $elements) {
    'use strict';
    var $ = jQuery, collapser, defaultSetting = {
        speed: 400
    };

    function Collapser(options) {
        this.$el = options.$el;
        this.options = $.extend({}, defaultSetting, options);
        this.init();
        this.bindings();
    }

    Collapser.prototype.init = function () {
        this.$el.each(function (index, elem) {
            var $this = $(elem), hidden = false;

            if (!$this.data("collapsible")) {
                return;
            }
            if ($this.data("collapsed") === true) {
                hidden = true;
            }

            $this.wrapInner("<div class='collapsible' style='display: " + (hidden ? "none" : "block") + "'/>");
            $this.prepend("<div class='section-collapser " + (hidden ? "collapsed" : "") + "'>" + ($this.data("title") ? $this.data("title") : $this[0].id) + "<div class='collapser-status' /></div>");
        });

        this.$collapserBtn = this.$el.find(".section-collapser");
        this.$collapserArea = this.$el.find(".collapsible");
    };

    Collapser.prototype.bindings = function () {
        var self = this;
        this.$collapserBtn.on("click", function (e) {

            e.preventDefault();
            $(this).toggleClass("collapsed").next(".collapsible").slideToggle(
                self.options.speed,
                function () {
                    if (typeof self.options.onChange === "function") {
                        self.options.onChange();
                    }
                }
            );
        });
    };

    Collapser.prototype.deactivate = function () {
        this.$el.find(".section-collapser").hide();
        this.$el.find(".collapsible").show();
    };

    Collapser.prototype.activate = function () {
        this.$el.find(".section-collapser").show();
        this.$el.find(".collapsible").hide();
    };

    message_bus.listen(document.body, 'section-collapser', function (e, data) {
        collapser = new Collapser(data);
    });

});
//-------- GWS --------//
var GWS = (function () {
    var $ = jQuery,
        events = {};
    var initiated = false;
    var init = function(){
        if(initiated){
            return;
        }
        this.$widgets = $('.GWS-widget');
        if(this.$widgets.length){
            this.$widgets.wrapAll('<div id="s550-container"></div>');
            window.ngbs._message_bus.send(document.body, 'page-init');

            $.each(".feature-buttons.open", function(i, obj){
                $(this).attr("data-feature-id", $(this));
            });
        }
        initiated = true;
    };
    
    var broadcast = function (event, obj) {
        if(typeof obj == "undefined"){
            obj = {};
        }
        var data;
        if (event in events){
            try{
                if (obj instanceof HTMLElement) {
                    obj = $(obj);
                }
            }
            catch(e){}
            if (obj instanceof jQuery) {
                data = $(obj).data();
                var id = $(obj).attr('id');
                if (typeof id !== 'undefined' && id !== false) {
                    data = $.extend(data, {"id": id});
                }
            }
            else{
                data = obj; //custom data object is ok too
            }
            data.event = event;
            events[event](data); //execute and pass applicable data object
            return true;
        }
        return false;
    };
    var listen = function (event, func) { //will replace previous listener, not append another function (current design)
        if (typeof func == 'function') {
            events[event] = func;
            return true;
        }
        return false;
    };
    var ignore = function (event) {
        if (event in events){
            delete events[event];
            return true;
        }
        return false;
    };
    return {
        listen: listen,
        broadcast: broadcast,
        ignore: ignore,
        init: init
    };
})();


/* This loads the S550 Widget scripts.js code */

var s550eventmap = {};

function flagEventFired(event) {
    s550eventmap[event] = true;
}

function hasEventFired(event) {
    var hasfired = !((s550eventmap[event] === undefined) || (s550eventmap[event] === false));
    return hasfired;
}

function showShareThisLink(socialId, url) {
    $.publish('/analytics/link/', { title : 'share this', nameplate : 'none', link : true, type : 'e', onclicks : 'share this:' + socialId });
    window.open(url);
}

function showFollowLink(socialId, url) {
    $.publish('/analytics/link/', { title : 'social:follow', nameplate : 'none', link : true, type : 'e', onclicks : 'social:follow:' + socialId, events : 'event4' });
    window.open(url);
}

function publishS550Link(title, linktype, onclicks, throttleKey) {
    if (throttleKey === undefined) {
        $.publish('/analytics/link/', { title : title, link : true, type : linktype, onclicks : onclicks });
    } else {
        if (!hasEventFired(throttleKey)) {
            flagEventFired(throttleKey);
            $.publish('/analytics/link/', { title : title, link : true, type : linktype, onclicks : onclicks });
        }
    }
}

$(function() {
    
    // Run GWS.init manually if the auto-init.js script is not included
    GWS.init();

    // Subscribe to events in the S550 widgets
    GWS.listen('features-button', function(data) {
        var onclicks = '', eventKey = '';
        if (data.featuresId) {
            if (data.featuresId === 'performance') {
                onclicks = eventKey = 'reveal:performance:read more:ford mustang';
                publishS550Link('reveal:5:performance:read more', 'o', onclicks, eventKey);
            } else if (data.featuresId === 'tech') {
                onclicks = eventKey = 'reveal:tech:read more:ford mustang';
                publishS550Link('reveal:6:tech:read more', 'o', onclicks, eventKey); 
            }
        }
    });
    
    GWS.listen('gallery-slider-image', function(data) {
        publishS550Link('reveal:1:gallery:image', 'o', 'reveal:gallery:image:ford mustang', 'gallery-slider-image');
    });
    
    GWS.listen('gallery-slider-arrow', function(data) {
        publishS550Link('reveal:1:gallery:scroll', 'o', 'reveal:gallery:scroll:ford mustang', 'gallery-slider-arrow');
    });

    GWS.listen('360-view-rotate', function(data) {
        publishS550Link('reveal:2:360:spin', 'o', 'reveal:360:spin:ford mustang', '360-view-rotate');
    });

    GWS.listen('360-view-color', function(data) {
        publishS550Link('reveal:2:360:colorizor', 'o', 'reveal:360:colorizor:ford mustang', '360-view-color');
    });

    GWS.listen('360-view-wheel', function(data) {
        publishS550Link('reveal:2:360:select rim', 'o', 'reveal:360:select rim:ford mustang', '360-view-wheel');
    });

    GWS.listen('zoom-fullscreen-save', function(data) {
        publishS550Link('reveal:1:gallery:image:download', 'd', 'reveal:gallery:image:download:ford mustang', 'zoom-fullscreen-save');
    });

    GWS.listen('reveal-slider-scroll-mousemove', function(data) {
        publishS550Link('reveal:7:convertible', 'o', 'reveal:convertible:ford mustang', 'reveal-slider-scroll-mousemove');
    });

    // Page initialization settings
    if ($('#s550-billboard').length > 0) {
        
        // Attach click event handlers for the social media sites in the gallery
        var socialMediaSites = ['facebook', 'twitter', 'googleplus', 'weibo'];
        $.each(socialMediaSites, function(index, socialMediaSite) {
            $("a[data-id='" + socialMediaSite + "']").each(function(index, value) {
                var anchor = value;
                $(anchor).unbind();
                var url = $(anchor).data("url");
                if (index === 0) {
                    $(anchor).click(function(event) {
                        showShareThisLink(socialMediaSite, url);
                        return false;
                    });
                } else {
                    $(anchor).click(function(event) {
                        showFollowLink(socialMediaSite, url);
                        return false;
                    });
                }
            });
        });
        
        // Override email handling
        $("a.share-by-email").each(function(index, value) {
            var emailLink = $(this);
            var pev2 = (index === 0) ? "share this" : "social:follow";
            var c5 = (index === 0) ? "share this:email" : "social:follow:email";
            emailLink.unbind();
            emailLink.on('click', function(event) {
                $.publish('/analytics/link/', { title : pev2, nameplate : 'none', link : true, type : 'e', onclicks : c5, events : 'event4' });
                window.location.href = 'mailto:' + emailLink.data('email');
            });
        });
        
        // Attach tracking to the subnav items (do not use IE8-unsupported methods)
        var s550SubnavItems = ['gallery', 'features'];
        $("ul.nav-content").find("li > a").each(function() {
            var link = $(this);
            var linkHref = $(this).attr("href");
            $.each(s550SubnavItems, function(key, value) {
                if (linkHref === '#s550-'+value) {
                    $(link).on('click', function(event) {
                        publishS550Link('reveal:0:' + value, 'o', 'reveal:' + value + ':ford mustang', 'subnav:' + value);
                    });
                    return false;
                }
            });
        });

        // Attach event handlers for the get-updates links
        var getUpdates  = document.querySelectorAll('.get-updates-link');
        if (getUpdates.length >= 2) {
            if (typeof getUpdates[0] !== 'undefined') {
                var getUpdatesLink1 = getUpdates[0].getAttribute("href");
                getUpdates[0].onclick = function() {
                    window.location = getUpdatesLink1;
                }; 
            }
            if (typeof getUpdates[1] !== 'undefined') {
                var getUpdatesLink2 = getUpdates[1].getAttribute("href");
                getUpdates[1].onclick = function() {
                    window.location = getUpdatesLink2;
                };
            }
        }
    };
});

