define("domReady", [], function() {
    function e(e) {
        var t;
        for (t = 0; t < e.length; t += 1)
            e[t](u)
    }
    function t() {
        var t = c;
        l && t.length && (c = [],
        e(t))
    }
    function n() {
        l || (l = !0,
        a && clearInterval(a),
        t())
    }
    function i(e) {
        return l ? e(u) : c.push(e),
        i
    }
    var r, s, a, o = "undefined" != typeof window && window.document, l = !o, u = o ? document : null , c = [];
    if (o) {
        if (document.addEventListener)
            document.addEventListener("DOMContentLoaded", n, !1),
            window.addEventListener("load", n, !1);
        else if (window.attachEvent) {
            window.attachEvent("onload", n),
            s = document.createElement("div");
            try {
                r = null  === window.frameElement
            } catch (h) {}
            s.doScroll && r && window.external && (a = setInterval(function() {
                try {
                    s.doScroll(),
                    n()
                } catch (e) {}
            }, 30))
        }
        "complete" === document.readyState && n()
    }
    return i.version = "2.0.1",
    i.load = function(e, t, n, r) {
        r.isBuild ? n(null ) : i(n)
    }
    ,
    i
}),
define("../../core/./assets/./../utils/dateTime", ["require"], function() {
    var e = {};
    e.MONTHS_NL = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"],
    e.MONTHS_EN = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"],
    e.time = function() {
        var e = window.performance ? window.performance.now || window.performance.webkitNow || window.performance.mozNow : null ;
        return e ? e.bind(window.performance) : Date.now || function() {
            return +new Date
        }
    }(),
    e.dateDiff = function(e, t) {
        return new Date(Math.abs(t.valueOf() - e.valueOf()))
    }
    ,
    e.parseTimestamp = function(e) {
        return new Date(1e3 * parseInt(e, 10))
    }
    ,
    e.parseIsoDate = function(e) {
        var t = e.split(" ")
          , n = t[0].split("-")
          , i = t.length > 1 ? t[1].split(":") : null 
          , r = new Date;
        return r.setDate(parseInt(n[2], 10)),
        r.setMonth(parseInt(n[1], 10) - 1),
        r.setFullYear(parseInt(n[0], 10)),
        i ? (r.setHours(parseInt(i[0], 10)),
        r.setMinutes(parseInt(i[1], 10)),
        r.setSeconds(parseInt(i[2], 10))) : (r.setHours(0),
        r.setMinutes(0),
        r.setSeconds(0)),
        r
    }
    ,
    e.formatTimeStamp = function(e) {
        e = Math.round(e);
        var t = e / 3600 >> 0
          , n = (e / 60 >> 0) % 60
          , i = e % 60;
        return (10 > t ? "0" : "") + t + ":" + (10 > n ? "0" : "") + n + ":" + (10 > i ? "0" : "") + i
    }
    ,
    e.getDateLong = function(t, n) {
        return n instanceof Array || (n = e.MONTHS_NL),
        t.getDate() + " " + n[t.getMonth()] + " " + t.getFullYear()
    }
    ,
    e.getDateShort = function(e, t) {
        t || (t = "-");
        var n = e.getMonth() + 1
          , i = e.getDate();
        return [10 > i ? "0" + i : i, 10 > n ? "0" + n : n, e.getFullYear()].join(t)
    }
    ;
    var t = []
      , n = !1;
    return window.addEventListener && window.addEventListener("message", function(e) {
        if (e.source == window && "nexttick" == e.data) {
            for (var i, r = 0; i = t[r]; r++)
                i();
            t.length = 0,
            n = !1
        }
    }, !1),
    e.nextTick = function(e) {
        return setTimeout(e, 0)
    }
    ,
    e
}),
define("../../core/./assets/./../utils/random", [], function() {
    var e = {};
    e.randomArray = function(e) {
        var t = null 
          , n = null ;
        return function() {
            if ((!t || !t.length) && (t = e.concat(),
            n && t.length > 1))
                for (var i = 0; i < t.length; i++)
                    if (t[i] === n) {
                        t.splice(i, 1);
                        break
                    }
            if (!t.length)
                return null ;
            var r = Math.round(Math.random() * (t.length - 1));
            return n = t.splice(r, 1)[0]
        }
    }
    ,
    e.pickRandom = function(e) {
        var t = Math.round(Math.random() * (e.length - 1));
        return e[t]
    }
    ;
    var t = String("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789").split("");
    return e.id = function(e) {
        e || (e = 8);
        for (var n = "", i = 0; e > i; i++)
            n += t[Math.floor(Math.random() * t.length)];
        return n
    }
    ,
    e.betweenInt = function(e, t) {
        return e + Math.round(Math.random() * (t - e))
    }
    ,
    e.betweenFloat = function(e, t) {
        return e + Math.random() * (t - e)
    }
    ,
    e.radius = function(t, n, i, r, s, a) {
        var o = Math.random() * 2 * Math.PI - Math.PI / 2
          , l = e.betweenFloat(i, s)
          , u = e.betweenFloat(r, a);
        return {
            x: t + Math.cos(o) * l,
            y: n + Math.sin(o) * u
        }
    }
    ,
    e.roll = function(e) {
        return Math.random() < e
    }
    ,
    e
}),
define("../../core/./assets/./../utils/url", ["require"], function() {
    var e = new RegExp("^(http[s]?:)?//")
      , t = /^data:([^;,]+)(?:;charset=([^;,]+))?(?:;(base64))?,/
      , n = /^(.+?)@([2-9])?x(\.jp(?:e)?g|\.png|\.gif|\.webp)?((?:\?|#).*)?$/
      , i = document.createElement("a")
      , r = {}
      , s = (window.devicePixelRatio || 1) >> 0;
    r.createURL = function(e, t) {
        return e + this.createQueryString(t)
    }
    ;
    var a = function(e, t) {
        this.url = e,
        this.pixelRatio = t
    }
    ;
    return a.prototype.toString = function() {
        return this.url
    }
    ,
    r.resolvePixelRatio = function(e, t) {
        var i = 1;
        if (!this.isBlob(e) && !this.isData(e)) {
            var r = e.match(n);
            r && (r[2] ? i = parseInt(r[2], 10) : (i = Math.max(Math.min(s, t || s), 1),
            e = r[1] + "@" + i + "x" + (r[3] || "") + (r[4] || "")))
        }
        return new a(e,i)
    }
    ,
    r.createQueryString = function(e) {
        var t, n = [], i = function(e, t) {
            n.push(encodeURIComponent(e) + "=" + encodeURIComponent(t))
        }
        ;
        for (var r in e)
            if (e.hasOwnProperty(r))
                if (t = e[r],
                t instanceof Array)
                    for (var s = 0, a = t.length; a > s; s++)
                        i(r + "[]", t[s]);
                else
                    t ? "object" == typeof t && (t = JSON.stringify(t)) : t = "",
                    i(r, t);
        return "?" + n.join("&")
    }
    ,
    r.parseQueryString = function(e) {
        if (!e.match(/\S/))
            return {};
        "?" === e.charAt(0) && (e = e.substr(1));
        for (var t, n, i = e.split("&"), r = {}, s = 0, a = i.length; a > s; s++) {
            var o = i[s]
              , l = o.indexOf("=");
            if (l >= 0 ? (t = o.substr(0, l),
            n = o.substr(l + 1)) : (t = o,
            n = ""),
            t = decodeURIComponent(t),
            n = decodeURIComponent(n),
            r.hasOwnProperty(t))
                r[t] instanceof Array ? r[t].push(n) : r[t] = [r[t], n];
            else {
                try {
                    n = JSON.parse(n)
                } catch (u) {}
                r[t] = n
            }
        }
        return r
    }
    ,
    r.parse = function(e, t) {
        i.href = e;
        var n = {
            search: i.search,
            hash: i.hash,
            pathname: i.pathname.replace(/\/\//g, "/"),
            hostname: i.hostname,
            username: i.username,
            password: i.password,
            port: i.port || 80,
            protocol: i.protocol
        };
        return t && (n.query = this.parseQueryString(n.search)),
        n
    }
    ,
    r.format = function(e) {
        var t = "";
        return t += e.protocol ? e.protocol : document.location.protocol,
        t += "//",
        (e.username || e.password) && (t += (e.username || "") + ":" + (e.password || "") + "@"),
        t += e.hostname ? e.hostname : document.location.host,
        e.port && !isNaN(parseInt(e.port)) && (t += ":" + e.port),
        e.path ? t = this.join(t, e.path) : t += "/",
        e.search ? ("?" !== e.search.charAt(0) && (t += "?"),
        t += e.search) : "object" == typeof e.query && (t += this.createQueryString(e.query)),
        e.hash && ("#" !== e.hash.charAt(0) && (t += "#"),
        t += e.hash),
        t
    }
    ,
    r.isAbsolute = function(t) {
        return t.match(e) || "/" === t.charAt(0)
    }
    ,
    r.isBlob = function(e) {
        return 0 === e.indexOf("blob:")
    }
    ,
    r.parseData = function(e) {
        if (!this.isData(e))
            return null ;
        var n = e.match(t);
        return {
            mimetype: n[1],
            charset: n[2] || "text/plain;charset=US-ASCII",
            base64: "base64" === n[3],
            data: e.substr(e.indexOf(",") + 1)
        }
    }
    ,
    r.isData = function(e) {
        return 0 === e.indexOf("data:")
    }
    ,
    r.isRelative = function(e) {
        return !this.isAbsolute(e)
    }
    ,
    r.resolve = function() {
        var e = this.join.apply(this, arguments);
        return i.href = e,
        i.href
    }
    ,
    r.dirname = function(e) {
        return e.split("/").slice(0, -1).join("/")
    }
    ,
    r.basename = function(e, t) {
        var n = e.split("/").pop();
        return t && this.extname(n) === t && (n = n.slice(0, -t.length)),
        n
    }
    ,
    r.extname = function(e) {
        return e.substr(e.lastIndexOf("."))
    }
    ,
    r.join = function(t) {
        var n, i, r, t = Array.prototype.slice.call(arguments, 0), s = [], a = "", o = !1;
        for (r = t.length - 1; r >= 0; r--)
            if (i = t[r],
            this.isAbsolute(i)) {
                var l = i.match(e);
                l ? (a = l[1] || location.protocol,
                t[r] = t[r].substr(l[0].length)) : (o = !0,
                t[r] = t[r].substr(1));
                break
            }
        0 > r && (r = 0);
        for (var u = t.length; u > r; r++) {
            i = t[r],
            n = i.split(/[\/\\]/g);
            for (var c = 0, h = n.length; h > c; c++)
                ".." === n[c] ? s.pop() : "." !== n[c] && "" !== n[c] && s.push(n[c])
        }
        return a ? a + "//" + s.join("/") : o ? "/" + s.join("/") : s.join("/")
    }
    ,
    r
}),
define("../../core/./assets/AssetManager", ["require", "./../utils/dateTime", "./../utils/random", "./../utils/url"], function(e, t, n, i) {
    var r = !!document.all
      , s = function(e, t) {
        if (t = t || document.body,
        !window.jQuery && !document.querySelectorAll)
            throw "Can't preload html template because the required api's are not available (jquery or querySelectorAll)";
        var n = function(e, t) {
            if (document.createTreeWalker)
                for (var n, i = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, null , !1); n = i.nextNode(); )
                    t(n);
            else
                !function r(e) {
                    for (var n, i = e.childNodes, s = 0, a = i.length; a > s; s++)
                        n = i[s],
                        n.nodeType === n.ELEMENT_NODE && (t(n),
                        r(n))
                }(e)
        }
          , i = function(e, t) {
            return window.jQuery ? window.jQuery(e).css(t) : window.getComputedStyle(e)[t]
        }
          , s = function(e) {
            var t, n = document.createElement("div");
            if (window.jQuery)
                t = window.jQuery.parseHTML(e);
            else if (document.implementation && document.implementation.createHTMLDocument) {
                var i = document.implementation.createHTMLDocument("");
                i.body.innerHTML = e,
                t = i.body.childNodes
            } else {
                var i = document.createElement("div");
                i.innerHTML = e,
                t = i.childNodes
            }
            for (var r = 0; r < t.length; r++)
                n.appendChild(t[r]);
            return n
        }
        ;
        return function(a) {
            var o = e;
            "function" == typeof o && (o = o()),
            "string" == typeof o ? o = s(o) : o.jquery && (o = o.get(0)),
            t && o.parentNode !== t && t.appendChild(o);
            var l = this;
            n(o, function(e) {
                var t = r ? "?r=" + Math.random() : "";
                "IMG" === e.tagName && e.src && 0 !== e.src.indexOf("data:") && l.addImage(e.src + t);
                var n = i(e, "backgroundImage");
                if ("none" != n && "" != n && 0 == n.indexOf("url(")) {
                    var s = n.substring(4, n.length - 1).replace(/["']/g, "");
                    l.addImage(s + t)
                }
            }),
            o.parentNode && o.parentNode.removeChild(o),
            a()
        }
    }
      , a = function(e) {
        return function(t, n) {
            var i = new Image;
            if (!e)
                return t(i),
                void 0;
            var s = "";
            r && (s = e.indexOf("?") > -1 ? "&r=" + Math.random() : "?r=" + Math.random()),
            i.onerror = function(e) {
                e && n(new Error("Could not load image: " + i.src))
            }
            ,
            i.onload = function() {
                t(i)
            }
            ,
            i.src = e + s
        }
    }
      , o = function(e, t, n) {
        return function(i, r) {
            var a = null ;
            try {
                a = require("text!" + e)
            } catch (o) {}
            if (null  !== a)
                i(a);
            else {
                var l = require.onError;
                require.onError = function(e) {
                    r("Could not load the following templates: " + e.requireModules.join(",")),
                    require.onError = l
                }
                ,
                require(["text!" + e], function(r) {
                    if (require.onError = l,
                    t) {
                        var a = new p({
                            id: "Preload assets in " + e,
                            parallelTasks: 2
                        });
                        s(r, n).call(a, function() {}),
                        a.start(function() {
                            i(r)
                        })
                    } else
                        i(r)
                })
            }
        }
    }
      , l = {
        IDLE: 0,
        STARTED: 1,
        DONE: 2,
        FAILED: 3
    }
      , u = function(e, t, i) {
        this.next = null ,
        this.action = e,
        this.id = t || n.id(),
        this.preloader = i,
        this.state = l.IDLE
    }
    ;
    u.prototype.doneWrap = function(e) {
        var t = this;
        return function(n) {
            t.state < l.DONE && (t.state = l.DONE,
            e(n))
        }
    }
    ,
    u.prototype.failWrap = function(e) {
        var t = this;
        return function(n) {
            t.state < l.DONE && (t.state = l.FAILED,
            e(n))
        }
    }
    ,
    u.prototype.exec = function(e, t) {
        console.assert(this.state === l.IDLE, "Task " + this.id + " can not be started twice!"),
        this.state = l.STARTED,
        this.action.call(this.preloader, this.doneWrap(e), this.failWrap(t))
    }
    ,
    u.prototype.toString = function() {
        return "Preloader( " + this.preloader.id + " ) -> " + this.id
    }
    ;
    var c = function(e, t) {
        for (var n = 0, i = e.length; i > n; n++)
            t ? e[n](t) : e[n]()
    }
      , h = function() {
        this._count = 0,
        this._completed = 0,
        this._progressCallbacks = []
    }
    ;
    h.prototype.addProgressCallback = function(e) {
        if ("function" != typeof e)
            throw "Callback should be a function";
        this._progressCallbacks.push(e)
    }
    ,
    h.prototype.getCount = function() {
        return this._count
    }
    ,
    h.prototype.getCompleted = function() {
        return this._completed
    }
    ,
    h.prototype.isDone = function() {
        return this._count === this._completed
    }
    ,
    h.prototype.getProgress = function() {
        return this._count > 0 ? this._completed / this._count : 0
    }
    ,
    h.prototype.incrementCount = function() {
        this._count++
    }
    ,
    h.prototype.incrementCompleted = function() {
        this._completed = Math.min(this._completed + 1, this._count),
        this.notifyProgress()
    }
    ,
    h.prototype.notifyProgress = function() {
        c(this._progressCallbacks, this.getProgress())
    }
    ;
    var d = new h
      , p = function(e, t) {
        e = e || {},
        this._head = null ,
        this._tail = null ,
        this._insert = null ,
        this._state = l.IDLE,
        this._doneCallbacks = [],
        this._failCallbacks = [],
        this._progressCallbacks = [],
        this._id = e.id || "",
        this._busy = 0,
        this._parallelTasks = e.parallelTasks || 1,
        this._localProgress = new h;
        var n = this;
        this._localProgress.addProgressCallback(function(e) {
            c(n._progressCallbacks, e)
        }),
        this._sharedProgress = t || d
    }
    ;
    p.prototype.status = l,
    p.prototype.getId = function() {
        return this._id
    }
    ,
    p.prototype.getState = function() {
        return this._state
    }
    ,
    p.prototype.isDone = function() {
        return this._localProgress.isDone()
    }
    ,
    p.prototype.addGroup = function(e) {
        var t = new p(e,this._localProgress);
        return this.add(t, t.getId() + ".wrap"),
        t
    }
    ,
    p.prototype.addQueue = function(e) {
        return e = e || {},
        e.parallelTasks = 1,
        this.addGroup(e)
    }
    ,
    p.prototype.addImage = function(e, t, n) {
        var r = i.resolvePixelRatio(e, n);
        return e = r.toString(),
        this.add(a(e), t || e)
    }
    ,
    p.prototype.addHTML = function(e, t, n) {
        return "undefined" == typeof t && (t = !0),
        "string" != typeof e || /^\s*</.test(e) ? this.add(s(e, n)) : this.add(o(e, t, n), e)
    }
    ,
    p.prototype.add = function(e, t) {
        if (e instanceof p)
            return this.add(function(t, n) {
                e.start(t, n)
            }, t);
        var n = new u(e,t,this);
        return this._localProgress.incrementCount(),
        this._sharedProgress.incrementCount(),
        this._head ? this._state > l.IDLE && this._insert ? (n.next = this._insert.next,
        this._insert.next = n,
        this._insert = n) : (this._tail.next = n,
        this._tail = n) : this._head = this._tail = this._insert = n,
        this
    }
    ,
    p.prototype.next = function() {
        return this._localProgress.isDone() ? void 0 : (this._localProgress.incrementCompleted(),
        this._sharedProgress.incrementCompleted(),
        this._busy--,
        this._localProgress.isDone() ? this._setDone() : this._feedScheduler(),
        this)
    }
    ,
    p.prototype.addDoneCallback = function(e) {
        return console.assert("function" == typeof e, "Callback should be a function"),
        this._doneCallbacks.push(e),
        this
    }
    ,
    p.prototype.addFailCallback = function(e) {
        return console.assert("function" == typeof e, "Callback should be a function"),
        this._failCallbacks.push(e),
        this
    }
    ,
    p.prototype.addProgressCallback = function(e) {
        return console.assert("function" == typeof e, "Callback should be a function"),
        this._progressCallbacks.push(e),
        this
    }
    ,
    p.prototype.error = function(e) {
        return this._setFailed(),
        ("string" == typeof e || e instanceof Error) && console.warn(e),
        this
    }
    ,
    p.prototype._feedScheduler = function() {
        for (var e = []; this._head && this._busy < this._parallelTasks; )
            e.push(this._head),
            this._busy++,
            this._head = this._insert = this._head.next;
        e.length && t.nextTick(function() {
            for (var t = 0, n = e.length; n > t; t++)
                g.schedule(e[t])
        })
    }
    ,
    p.prototype._setDone = function() {
        this._state = l.DONE,
        c(this._doneCallbacks)
    }
    ,
    p.prototype._setFailed = function() {
        this._state = l.FAILED,
        c(this._failCallbacks)
    }
    ,
    p.prototype._setStarted = function() {
        this._state = l.STARTED
    }
    ,
    p.prototype.start = function(e, t, n) {
        return this._state > l.IDLE ? (console.warn("You called start on a preloader which was already started!"),
        this) : ("function" == typeof e && this.addDoneCallback(e),
        "function" == typeof t && this.addFailCallback(t),
        "function" == typeof n && this.addProgressCallback(n),
        this._localProgress.getCount() > 0 ? (this._setStarted(),
        this._feedScheduler()) : this._setDone(),
        this)
    }
    ,
    p.prototype.getAsset = function(e) {
        return f.getResult(e)
    }
    ;
    var f = {
        results: {},
        hasResult: function(e) {
            return this.results.hasOwnProperty(e)
        },
        forgetResult: function(e) {
            return this.hasResult(e) ? (delete this.results[e],
            !0) : !1
        },
        getResult: function(e) {
            return this.hasResult(e) ? this.results[e] : null 
        },
        setResult: function(e, t) {
            this.results[e] = t
        }
    }
      , g = {
        parallelTasks: 8,
        todo: [],
        busy: {},
        busyCount: 0,
        started: !1,
        schedule: function(e) {
            f.hasResult(e.id) ? (t.nextTick(function() {
                e.preloader.next()
            }),
            this.start()) : (this.todo.push(e),
            this.start())
        },
        unregisterAsBusy: function(e) {
            this.busy.hasOwnProperty(e) && (delete this.busy[e],
            this.busyCount--)
        },
        execTask: function(e) {
            e.exec(function(t) {
                t && f.setResult(e.id, t),
                g.unregisterAsBusy(e.id),
                e.preloader.next()
            }, function(t) {
                e.preloader.error(t)
            })
        },
        start: function() {
            for (; this.todo.length && this.busyCount < this.parallelTasks; ) {
                var e = this.todo.pop();
                this.busy[e.id] = e,
                this.busyCount++,
                this.execTask(e)
            }
        }
    }
      , m = {
        createPreloader: function(e) {
            return new p(e)
        },
        getAsset: function(e) {
            return f.getResult(e)
        },
        forgetAsset: function(e) {
            return f.forgetResult(e)
        },
        isLoaded: function(e) {
            return f.hasResult(e)
        }
    };
    return m
}),
define("../../core/utils/jsonRequest", ["require"], function() {
    var e = {
        isSupported: function() {
            return !!window.jQuery
        },
        request: function(e) {
            e.contentType = "application/json; charset=utf-8",
            e.dataType = "json",
            window.jQuery.ajax(e)
        }
    }
      , t = {
        isSupported: function() {
            return !!window.XMLHttpRequest
        },
        request: function(e) {
            var t = function() {
                try {
                    return new window.XMLHttpRequest
                } catch (e) {
                    return new window.ActiveXObject("Microsoft.XMLHTTP")
                }
            }
              , n = t();
            n.onreadystatechange = function() {
                if (n.readyState === n.DONE) {
                    var t = null ;
                    try {
                        t = JSON.parse(n.responseText)
                    } catch (i) {}
                    200 === n.status ? e.success(t) : e.error(t)
                }
            }
            ,
            n.open(e.type.toUpperCase(), e.url),
            n.setRequestHeader("Content-Type", "application/json;charset=UTF-8"),
            n.send(JSON.stringify(e.data))
        }
    }
      , n = function(n) {
        if (n = n || {},
        !n.url)
            throw "No URL specified! Can't post JSON";
        n.success = n.success || function() {}
        ,
        n.error = n.error || function() {}
        ,
        n.data = n.data ? JSON.stringify(n.data) : null ,
        e.isSupported() ? e.request(n) : t.isSupported() && t.request(n)
    }
    ;
    return {
        put: function(e) {
            e = e || {},
            e.type = "PUT",
            n(e)
        },
        post: function(e) {
            e = e || {},
            e.type = "POST",
            n(e)
        }
    }
}),
define("../../core/./utils/ErrorLogger", ["require", "core/utils/jsonRequest"], function(e) {
    var t = e("core/utils/jsonRequest")
      , n = function(e, t, n, i) {
        this.timestamp = new Date,
        this.message = e || "unknown error",
        this.filename = t || "unknown",
        this.linenumber = n || 1,
        this.colno = i || 0
    }
    ;
    n.prototype.toJSON = function() {
        var e = this.message;
        return e && "function" == typeof e.toJSON && (e = e.toJSON()),
        {
            message: e,
            filename: this.filename,
            linenumber: this.linenumber,
            colno: this.colno
        }
    }
    ,
    n.prototype.equals = function(e) {
        return this.message === e.message && this.filename === e.filename && this.linenumber === e.linenumber && this.colno === e.colno
    }
    ,
    n.prototype.save = function(e) {
        t.post({
            url: e,
            data: this
        })
    }
    ;
    var i = function(e) {
        if (e = e || {},
        "string" != typeof e.saveUrl)
            throw "Missing saveUrl for ErrorLogger";
        this.saveUrl = e.saveUrl,
        this.lastBrowserError = null ,
        e.augmentConsole && this.augmentConsole(),
        this.setEnabled(!0)
    }
    ;
    return i.prototype.augmentConsole = function() {
        var e = this
          , t = window.console.error;
        window.console.error = function(n) {
            t.call ? t.call(window.console, n) : t(n),
            e.log({
                message: n
            })
        }
        ;
        var n = window.console.assert;
        window.console.assert = function(t, i) {
            n.call ? n.call(window.console, t, i) : n(t, i),
            e.assert(t, i)
        }
    }
    ,
    i.prototype.assert = function(e, t) {
        e || this.log(t)
    }
    ,
    i.prototype.log = function(e) {
        new n(e).save(this.saveUrl)
    }
    ,
    i.prototype.setEnabled = function(e) {
        if (e) {
            var t = this;
            window.onerror = function() {
                t.onBrowserError.apply(t, arguments)
            }
        } else
            window.onerror = null ;
        return this
    }
    ,
    i.prototype._constructError = function(e, t, i, r) {
        return new n(e,t,i,r)
    }
    ,
    i.prototype.onBrowserError = function(e, t, i, r, s) {
        if (!(this.lastBrowserError && (new Date).getTime() - this.lastBrowserError.timestamp < 250)) {
            var a = new n(e,t,i,r,s);
            this.lastBrowserError && a.equals(this.lastBrowserError) || (a.save(this.saveUrl),
            this.lastBrowserError = a)
        }
    }
    ,
    i
}),
define("../../core/ApplicationBootstrap", ["require", "./assets/AssetManager", "./utils/ErrorLogger"], function(e) {
    var t = e("./assets/AssetManager")
      , n = e("./utils/ErrorLogger")
      , i = {}
      , r = function() {
        var e = {};
        return {
            debug: function() {},
            log: function() {},
            warn: function() {},
            info: function() {},
            assert: function() {},
            clear: function() {},
            count: function() {},
            dir: function() {},
            dirxml: function() {},
            group: function() {},
            groupCollapsed: function() {},
            groupEnd: function() {},
            profile: function() {},
            profileEnd: function() {},
            trace: function() {},
            error: function() {},
            timeStamp: function() {},
            time: function(t) {
                e[t] = +new Date
            },
            timeEnd: function(t) {
                var n = new Date - e[t];
                console.log(t + ": " + n + "ms"),
                delete e[t]
            }
        }
    }
      , s = function(e) {
        var t = window.console;
        t || (t = window.console = {});
        var n, i = r(e);
        for (n in i)
            n in t || (t[n] = i[n])
    }
      , a = "ontouchstart" in document
      , o = function() {
        var e = navigator.userAgent
          , t = [];
        if (e.indexOf("MSIE") > -1) {
            t.push("ie");
            var n = function() {
                for (var e, t = 3, n = document.createElement("div"), i = n.getElementsByTagName("i"); n.innerHTML = "<!--[if gt IE " + ++t + "]><i></i><![endif]-->",
                i[0]; )
                    ;
                return t > 4 ? t : e
            }();
            9 > n && t.push("old-ie"),
            Function("/*@cc_on return document.documentMode===10@*/")() && (n = 10),
            t.push("ie" + n)
        } else
            e.indexOf("Trident") > -1 ? t.push("ie", "ie" + e.match(/rv:(\d+)/)[1]) : e.indexOf("Chrome") > -1 ? t.push("chrome") : e.indexOf("Safari") > -1 ? t.push("safari") : e.indexOf("Mozilla") > -1 && t.push("mozilla");
        e.indexOf("Android") > -1 && (t.push("android"),
        e.indexOf("Mozilla/5.0") > -1 && e.indexOf("AppleWebKit") > -1 && t.push("stock-android")),
        (null  != e.match(/iPad/i) || null  != e.match(/iPhone/i)) && t.push("idevice"),
        (e.indexOf("Webkit") > -1 || e.indexOf("WebKit") > -1) && t.push("webkit"),
        e.indexOf("CriOS") > -1 && t.push("chrome"),
        window.self !== window.top && t.push("iframe"),
        t.push(a ? "touch" : "no-touch"),
        t.push("context-default");
        try {
            (-1 != window.name.indexOf("app_runner_fb") || -1 != window.name.indexOf("iframe_canvas_fb")) && t.push("fb")
        } catch (i) {}
        t.addToDocumentClassName = function() {
            var e = document.body.parentNode.className.split(/\s+/g);
            e[0] || e.shift(),
            document.body.parentNode.className = e.concat(t).join(" ")
        }
        ,
        t.remove = function(e) {
            for (var t = 0; t < this.length; t++)
                if (this[t] === e) {
                    this.splice(t, 1);
                    break
                }
        }
        ,
        t.has = function(e) {
            if (arguments.length > 1) {
                for (var n = 0; n < arguments.length; n++)
                    if (!this.has(arguments[n]))
                        return !1;
                return !0
            }
            if (e = e.toLowerCase(),
            "function" == typeof Array.prototype.indexOf)
                return t.indexOf(e) > -1;
            for (var n = 0; n < t.length; n++)
                if (t[n] === e)
                    return !0;
            return !1
        }
        ;
        var r = window.styleMedia || window.media;
        if (!window.matchMedia && r && (window.matchMedia = function() {
            return function(e) {
                return {
                    matches: r.matchMedium(e || "all"),
                    media: e || "all",
                    addListener: function() {}
                }
            }
        }()),
        window.matchMedia) {
            var s = window.matchMedia("screen and (max-device-width: 480px)")
              , o = function() {
                s.matches ? t.push("mobile") : t.remove("mobile")
            }
            ;
            s.addListener(o),
            o();
            var l = window.matchMedia("only screen and (-webkit-min-device-pixel-ratio: 2),only screen and (   min--moz-device-pixel-ratio: 2),only screen and (     -o-min-device-pixel-ratio: 2/1),only screen and (        min-device-pixel-ratio: 2),only screen and (                min-resolution: 192dpi),", "only screen and (                min-resolution: 2dppx)");
            l.matches && t.push("retina")
        }
        return t
    }
    ;
    return i.bootstrap = function(e) {
        s(e);
        var i = o();
        return i.addToDocumentClassName(),
        console.log("%c Egoframework initialized! ", "background: #000; color: #fff;"),
        {
            settings: e,
            context: "default",
            env: i,
            touch: a,
            errors: new n({
                catchBrowserErrors: !0,
                saveUrl: "/rest/errors",
                augmentConsole: !0
            }),
            assets: t,
            startRouters: function(e, t) {
                if ("undefined" == typeof window.Backbone)
                    throw new Error("Backbone has not been required");
                e instanceof Array || (e = [e]);
                for (var n = 0, i = e.length; i > n; n++)
                    "function" == typeof e[n] ? e[n]() : "object" == typeof e[n] && "function" == typeof e[n].start && e[n].start();
                e.length && window.Backbone.history.start(t)
            }
        }
    }
    ,
    i
}),
define("text", ["module"], function(e) {
    var t, n, i, r, s, a = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"], o = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im, l = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im, u = "undefined" != typeof location && location.href, c = u && location.protocol && location.protocol.replace(/\:/, ""), h = u && location.hostname, d = u && (location.port || void 0), p = {}, f = e.config && e.config() || {};
    return t = {
        version: "2.0.14",
        strip: function(e) {
            if (e) {
                e = e.replace(o, "");
                var t = e.match(l);
                t && (e = t[1])
            } else
                e = "";
            return e
        },
        jsEscape: function(e) {
            return e.replace(/(['\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r").replace(/[\u2028]/g, "\\u2028").replace(/[\u2029]/g, "\\u2029")
        },
        createXhr: f.createXhr || function() {
            var e, t, n;
            if ("undefined" != typeof XMLHttpRequest)
                return new XMLHttpRequest;
            if ("undefined" != typeof ActiveXObject)
                for (t = 0; 3 > t; t += 1) {
                    n = a[t];
                    try {
                        e = new ActiveXObject(n)
                    } catch (i) {}
                    if (e) {
                        a = [n];
                        break
                    }
                }
            return e
        }
        ,
        parseName: function(e) {
            var t, n, i, r = !1, s = e.lastIndexOf("."), a = 0 === e.indexOf("./") || 0 === e.indexOf("../");
            return -1 !== s && (!a || s > 1) ? (t = e.substring(0, s),
            n = e.substring(s + 1)) : t = e,
            i = n || t,
            s = i.indexOf("!"),
            -1 !== s && (r = "strip" === i.substring(s + 1),
            i = i.substring(0, s),
            n ? n = i : t = i),
            {
                moduleName: t,
                ext: n,
                strip: r
            }
        },
        xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,
        useXhr: function(e, n, i, r) {
            var s, a, o, l = t.xdRegExp.exec(e);
            return l ? (s = l[2],
            a = l[3],
            a = a.split(":"),
            o = a[1],
            a = a[0],
            !(s && s !== n || a && a.toLowerCase() !== i.toLowerCase() || (o || a) && o !== r)) : !0
        },
        finishLoad: function(e, n, i, r) {
            i = n ? t.strip(i) : i,
            f.isBuild && (p[e] = i),
            r(i)
        },
        load: function(e, n, i, r) {
            if (r && r.isBuild && !r.inlineText)
                return i(),
                void 0;
            f.isBuild = r && r.isBuild;
            var s = t.parseName(e)
              , a = s.moduleName + (s.ext ? "." + s.ext : "")
              , o = n.toUrl(a)
              , l = f.useXhr || t.useXhr;
            return 0 === o.indexOf("empty:") ? (i(),
            void 0) : (!u || l(o, c, h, d) ? t.get(o, function(n) {
                t.finishLoad(e, s.strip, n, i)
            }, function(e) {
                i.error && i.error(e)
            }) : n([a], function(e) {
                t.finishLoad(s.moduleName + "." + s.ext, s.strip, e, i)
            }),
            void 0)
        },
        write: function(e, n, i) {
            if (p.hasOwnProperty(n)) {
                var r = t.jsEscape(p[n]);
                i.asModule(e + "!" + n, "define(function () { return '" + r + "';});\n")
            }
        },
        writeFile: function(e, n, i, r, s) {
            var a = t.parseName(n)
              , o = a.ext ? "." + a.ext : ""
              , l = a.moduleName + o
              , u = i.toUrl(a.moduleName + o) + ".js";
            t.load(l, i, function() {
                var n = function(e) {
                    return r(u, e)
                }
                ;
                n.asModule = function(e, t) {
                    return r.asModule(e, u, t)
                }
                ,
                t.write(e, l, n, s)
            }, s)
        }
    },
    "node" === f.env || !f.env && "undefined" != typeof process && process.versions && process.versions.node && !process.versions["node-webkit"] && !process.versions["atom-shell"] ? (n = require.nodeRequire("fs"),
    t.get = function(e, t, i) {
        try {
            var r = n.readFileSync(e, "utf8");
            "﻿" === r[0] && (r = r.substring(1)),
            t(r)
        } catch (s) {
            i && i(s)
        }
    }
    ) : "xhr" === f.env || !f.env && t.createXhr() ? t.get = function(e, n, i, r) {
        var s, a = t.createXhr();
        if (a.open("GET", e, !0),
        r)
            for (s in r)
                r.hasOwnProperty(s) && a.setRequestHeader(s.toLowerCase(), r[s]);
        f.onXhr && f.onXhr(a, e),
        a.onreadystatechange = function() {
            var t, r;
            4 === a.readyState && (t = a.status || 0,
            t > 399 && 600 > t ? (r = new Error(e + " HTTP status: " + t),
            r.xhr = a,
            i && i(r)) : n(a.responseText),
            f.onXhrComplete && f.onXhrComplete(a, e))
        }
        ,
        a.send(null )
    }
     : "rhino" === f.env || !f.env && "undefined" != typeof Packages && "undefined" != typeof java ? t.get = function(e, t) {
        var n, i, r = "utf-8", s = new java.io.File(e), a = java.lang.System.getProperty("line.separator"), o = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(s),r)), l = "";
        try {
            for (n = new java.lang.StringBuffer,
            i = o.readLine(),
            i && i.length() && 65279 === i.charAt(0) && (i = i.substring(1)),
            null  !== i && n.append(i); null  !== (i = o.readLine()); )
                n.append(a),
                n.append(i);
            l = String(n.toString())
        } finally {
            o.close()
        }
        t(l)
    }
     : ("xpconnect" === f.env || !f.env && "undefined" != typeof Components && Components.classes && Components.interfaces) && (i = Components.classes,
    r = Components.interfaces,
    Components.utils["import"]("resource://gre/modules/FileUtils.jsm"),
    s = "@mozilla.org/windows-registry-key;1" in i,
    t.get = function(e, t) {
        var n, a, o, l = {};
        s && (e = e.replace(/\//g, "\\")),
        o = new FileUtils.File(e);
        try {
            n = i["@mozilla.org/network/file-input-stream;1"].createInstance(r.nsIFileInputStream),
            n.init(o, 1, 0, !1),
            a = i["@mozilla.org/intl/converter-input-stream;1"].createInstance(r.nsIConverterInputStream),
            a.init(n, "utf-8", n.available(), r.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER),
            a.readString(n.available(), l),
            a.close(),
            n.close(),
            t(l.value)
        } catch (u) {
            throw new Error((o && o.path || "") + ": " + u)
        }
    }
    ),
    t
}),
define("json", ["text"], function(text) {
    function cacheBust(e) {
        return e = e.replace(CACHE_BUST_FLAG, ""),
        e += e.indexOf("?") < 0 ? "?" : "&",
        e + CACHE_BUST_QUERY_PARAM + "=" + Math.round(2147483647 * Math.random())
    }
    var CACHE_BUST_QUERY_PARAM = "bust"
      , CACHE_BUST_FLAG = "!bust"
      , jsonParse = "undefined" != typeof JSON && "function" == typeof JSON.parse ? JSON.parse : function(val) {
        return eval("(" + val + ")")
    }
      , buildMap = {};
    return {
        load: function(e, t, n, i) {
            i.isBuild && (i.inlineJSON === !1 || -1 !== e.indexOf(CACHE_BUST_QUERY_PARAM + "=")) || 0 === t.toUrl(e).indexOf("empty:") ? n(null ) : text.get(t.toUrl(e), function(t) {
                i.isBuild ? (buildMap[e] = t,
                n(t)) : n(jsonParse(t))
            }, n.error, {
                accept: "application/json"
            })
        },
        normalize: function(e, t) {
            return -1 !== e.indexOf(CACHE_BUST_FLAG) && (e = cacheBust(e)),
            t(e)
        },
        write: function(e, t, n) {
            if (t in buildMap) {
                var i = buildMap[t];
                n('define("' + e + "!" + t + '", function(){ return ' + i + ";});\n")
            }
        }
    }
}),
define("json!application_settings.json", function() {
    return {
        __comment__: "Only put settings here which are not dynamic! Use require('settings') to get the settings in this file."
    }
}),
function(e, t) {
    function n(e) {
        var t = ft[e] = {};
        return Z.each(e.split(tt), function(e, n) {
            t[n] = !0
        }),
        t
    }
    function i(e, n, i) {
        if (i === t && 1 === e.nodeType) {
            var r = "data-" + n.replace(mt, "-$1").toLowerCase();
            if (i = e.getAttribute(r),
            "string" == typeof i) {
                try {
                    i = "true" === i ? !0 : "false" === i ? !1 : "null" === i ? null  : +i + "" === i ? +i : gt.test(i) ? Z.parseJSON(i) : i
                } catch (s) {}
                Z.data(e, n, i)
            } else
                i = t
        }
        return i
    }
    function r(e) {
        var t;
        for (t in e)
            if (("data" !== t || !Z.isEmptyObject(e[t])) && "toJSON" !== t)
                return !1;
        return !0
    }
    function s() {
        return !1
    }
    function a() {
        return !0
    }
    function o(e) {
        return !e || !e.parentNode || 11 === e.parentNode.nodeType
    }
    function l(e, t) {
        do
            e = e[t];
        while (e && 1 !== e.nodeType);return e
    }
    function u(e, t, n) {
        if (t = t || 0,
        Z.isFunction(t))
            return Z.grep(e, function(e, i) {
                var r = !!t.call(e, i, e);
                return r === n
            });
        if (t.nodeType)
            return Z.grep(e, function(e) {
                return e === t === n
            });
        if ("string" == typeof t) {
            var i = Z.grep(e, function(e) {
                return 1 === e.nodeType
            });
            if (Lt.test(t))
                return Z.filter(t, i, !n);
            t = Z.filter(t, i)
        }
        return Z.grep(e, function(e) {
            return Z.inArray(e, t) >= 0 === n
        })
    }
    function c(e) {
        var t = Bt.split("|")
          , n = e.createDocumentFragment();
        if (n.createElement)
            for (; t.length; )
                n.createElement(t.pop());
        return n
    }
    function h(e, t) {
        return e.getElementsByTagName(t)[0] || e.appendChild(e.ownerDocument.createElement(t))
    }
    function d(e, t) {
        if (1 === t.nodeType && Z.hasData(e)) {
            var n, i, r, s = Z._data(e), a = Z._data(t, s), o = s.events;
            if (o) {
                delete a.handle,
                a.events = {};
                for (n in o)
                    for (i = 0,
                    r = o[n].length; r > i; i++)
                        Z.event.add(t, n, o[n][i])
            }
            a.data && (a.data = Z.extend({}, a.data))
        }
    }
    function p(e, t) {
        var n;
        1 === t.nodeType && (t.clearAttributes && t.clearAttributes(),
        t.mergeAttributes && t.mergeAttributes(e),
        n = t.nodeName.toLowerCase(),
        "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML),
        Z.support.html5Clone && e.innerHTML && !Z.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && Yt.test(e.type) ? (t.defaultChecked = t.checked = e.checked,
        t.value !== e.value && (t.value = e.value)) : "option" === n ? t.selected = e.defaultSelected : "input" === n || "textarea" === n ? t.defaultValue = e.defaultValue : "script" === n && t.text !== e.text && (t.text = e.text),
        t.removeAttribute(Z.expando))
    }
    function f(e) {
        return "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName("*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll("*") : []
    }
    function g(e) {
        Yt.test(e.type) && (e.defaultChecked = e.checked)
    }
    function m(e, t) {
        if (t in e)
            return t;
        for (var n = t.charAt(0).toUpperCase() + t.slice(1), i = t, r = _n.length; r--; )
            if (t = _n[r] + n,
            t in e)
                return t;
        return i
    }
    function v(e, t) {
        return e = t || e,
        "none" === Z.css(e, "display") || !Z.contains(e.ownerDocument, e)
    }
    function _(e, t) {
        for (var n, i, r = [], s = 0, a = e.length; a > s; s++)
            n = e[s],
            n.style && (r[s] = Z._data(n, "olddisplay"),
            t ? (!r[s] && "none" === n.style.display && (n.style.display = ""),
            "" === n.style.display && v(n) && (r[s] = Z._data(n, "olddisplay", x(n.nodeName)))) : (i = nn(n, "display"),
            !r[s] && "none" !== i && Z._data(n, "olddisplay", i)));
        for (s = 0; a > s; s++)
            n = e[s],
            n.style && (t && "none" !== n.style.display && "" !== n.style.display || (n.style.display = t ? r[s] || "" : "none"));
        return e
    }
    function y(e, t, n) {
        var i = hn.exec(t);
        return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : t
    }
    function b(e, t, n, i) {
        for (var r = n === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0, s = 0; 4 > r; r += 2)
            "margin" === n && (s += Z.css(e, n + vn[r], !0)),
            i ? ("content" === n && (s -= parseFloat(nn(e, "padding" + vn[r])) || 0),
            "margin" !== n && (s -= parseFloat(nn(e, "border" + vn[r] + "Width")) || 0)) : (s += parseFloat(nn(e, "padding" + vn[r])) || 0,
            "padding" !== n && (s += parseFloat(nn(e, "border" + vn[r] + "Width")) || 0));
        return s
    }
    function w(e, t, n) {
        var i = "width" === t ? e.offsetWidth : e.offsetHeight
          , r = !0
          , s = Z.support.boxSizing && "border-box" === Z.css(e, "boxSizing");
        if (0 >= i || null  == i) {
            if (i = nn(e, t),
            (0 > i || null  == i) && (i = e.style[t]),
            dn.test(i))
                return i;
            r = s && (Z.support.boxSizingReliable || i === e.style[t]),
            i = parseFloat(i) || 0
        }
        return i + b(e, t, n || (s ? "border" : "content"), r) + "px"
    }
    function x(e) {
        if (fn[e])
            return fn[e];
        var t = Z("<" + e + ">").appendTo($.body)
          , n = t.css("display");
        return t.remove(),
        ("none" === n || "" === n) && (rn = $.body.appendChild(rn || Z.extend($.createElement("iframe"), {
            frameBorder: 0,
            width: 0,
            height: 0
        })),
        sn && rn.createElement || (sn = (rn.contentWindow || rn.contentDocument).document,
        sn.write("<!doctype html><html><body>"),
        sn.close()),
        t = sn.body.appendChild(sn.createElement(e)),
        n = nn(t, "display"),
        $.body.removeChild(rn)),
        fn[e] = n,
        n
    }
    function T(e, t, n, i) {
        var r;
        if (Z.isArray(t))
            Z.each(t, function(t, r) {
                n || wn.test(e) ? i(e, r) : T(e + "[" + ("object" == typeof r ? t : "") + "]", r, n, i)
            });
        else if (n || "object" !== Z.type(t))
            i(e, t);
        else
            for (r in t)
                T(e + "[" + r + "]", t[r], n, i)
    }
    function P(e) {
        return function(t, n) {
            "string" != typeof t && (n = t,
            t = "*");
            var i, r, s, a = t.toLowerCase().split(tt), o = 0, l = a.length;
            if (Z.isFunction(n))
                for (; l > o; o++)
                    i = a[o],
                    s = /^\+/.test(i),
                    s && (i = i.substr(1) || "*"),
                    r = e[i] = e[i] || [],
                    r[s ? "unshift" : "push"](n)
        }
    }
    function S(e, n, i, r, s, a) {
        s = s || n.dataTypes[0],
        a = a || {},
        a[s] = !0;
        for (var o, l = e[s], u = 0, c = l ? l.length : 0, h = e === Rn; c > u && (h || !o); u++)
            o = l[u](n, i, r),
            "string" == typeof o && (!h || a[o] ? o = t : (n.dataTypes.unshift(o),
            o = S(e, n, i, r, o, a)));
        return (h || !o) && !a["*"] && (o = S(e, n, i, r, "*", a)),
        o
    }
    function k(e, n) {
        var i, r, s = Z.ajaxSettings.flatOptions || {};
        for (i in n)
            n[i] !== t && ((s[i] ? e : r || (r = {}))[i] = n[i]);
        r && Z.extend(!0, e, r)
    }
    function A(e, n, i) {
        var r, s, a, o, l = e.contents, u = e.dataTypes, c = e.responseFields;
        for (s in c)
            s in i && (n[c[s]] = i[s]);
        for (; "*" === u[0]; )
            u.shift(),
            r === t && (r = e.mimeType || n.getResponseHeader("content-type"));
        if (r)
            for (s in l)
                if (l[s] && l[s].test(r)) {
                    u.unshift(s);
                    break
                }
        if (u[0] in i)
            a = u[0];
        else {
            for (s in i) {
                if (!u[0] || e.converters[s + " " + u[0]]) {
                    a = s;
                    break
                }
                o || (o = s)
            }
            a = a || o
        }
        return a ? (a !== u[0] && u.unshift(a),
        i[a]) : void 0
    }
    function C(e, t) {
        var n, i, r, s, a = e.dataTypes.slice(), o = a[0], l = {}, u = 0;
        if (e.dataFilter && (t = e.dataFilter(t, e.dataType)),
        a[1])
            for (n in e.converters)
                l[n.toLowerCase()] = e.converters[n];
        for (; r = a[++u]; )
            if ("*" !== r) {
                if ("*" !== o && o !== r) {
                    if (n = l[o + " " + r] || l["* " + r],
                    !n)
                        for (i in l)
                            if (s = i.split(" "),
                            s[1] === r && (n = l[o + " " + s[0]] || l["* " + s[0]])) {
                                n === !0 ? n = l[i] : l[i] !== !0 && (r = s[0],
                                a.splice(u--, 0, r));
                                break
                            }
                    if (n !== !0)
                        if (n && e["throws"])
                            t = n(t);
                        else
                            try {
                                t = n(t)
                            } catch (c) {
                                return {
                                    state: "parsererror",
                                    error: n ? c : "No conversion from " + o + " to " + r
                                }
                            }
                }
                o = r
            }
        return {
            state: "success",
            data: t
        }
    }
    function j() {
        try {
            return new e.XMLHttpRequest
        } catch (t) {}
    }
    function O() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP")
        } catch (t) {}
    }
    function M() {
        return setTimeout(function() {
            Wn = t
        }, 0),
        Wn = Z.now()
    }
    function E(e, t) {
        Z.each(t, function(t, n) {
            for (var i = (ei[t] || []).concat(ei["*"]), r = 0, s = i.length; s > r; r++)
                if (i[r].call(e, t, n))
                    return
        })
    }
    function D(e, t, n) {
        var i, r = 0, s = Kn.length, a = Z.Deferred().always(function() {
            delete o.elem
        }), o = function() {
            for (var t = Wn || M(), n = Math.max(0, l.startTime + l.duration - t), i = n / l.duration || 0, r = 1 - i, s = 0, o = l.tweens.length; o > s; s++)
                l.tweens[s].run(r);
            return a.notifyWith(e, [l, r, n]),
            1 > r && o ? n : (a.resolveWith(e, [l]),
            !1)
        }
        , l = a.promise({
            elem: e,
            props: Z.extend({}, t),
            opts: Z.extend(!0, {
                specialEasing: {}
            }, n),
            originalProperties: t,
            originalOptions: n,
            startTime: Wn || M(),
            duration: n.duration,
            tweens: [],
            createTween: function(t, n) {
                var i = Z.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
                return l.tweens.push(i),
                i
            },
            stop: function(t) {
                for (var n = 0, i = t ? l.tweens.length : 0; i > n; n++)
                    l.tweens[n].run(1);
                return t ? a.resolveWith(e, [l, t]) : a.rejectWith(e, [l, t]),
                this
            }
        }), u = l.props;
        for (N(u, l.opts.specialEasing); s > r; r++)
            if (i = Kn[r].call(l, e, u, l.opts))
                return i;
        return E(l, u),
        Z.isFunction(l.opts.start) && l.opts.start.call(e, l),
        Z.fx.timer(Z.extend(o, {
            anim: l,
            queue: l.opts.queue,
            elem: e
        })),
        l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
    }
    function N(e, t) {
        var n, i, r, s, a;
        for (n in e)
            if (i = Z.camelCase(n),
            r = t[i],
            s = e[n],
            Z.isArray(s) && (r = s[1],
            s = e[n] = s[0]),
            n !== i && (e[i] = s,
            delete e[n]),
            a = Z.cssHooks[i],
            a && "expand" in a) {
                s = a.expand(s),
                delete e[i];
                for (n in s)
                    n in e || (e[n] = s[n],
                    t[n] = r)
            } else
                t[i] = r
    }
    function I(e, t, n) {
        var i, r, s, a, o, l, u, c, h, d = this, p = e.style, f = {}, g = [], m = e.nodeType && v(e);
        n.queue || (c = Z._queueHooks(e, "fx"),
        null  == c.unqueued && (c.unqueued = 0,
        h = c.empty.fire,
        c.empty.fire = function() {
            c.unqueued || h()
        }
        ),
        c.unqueued++,
        d.always(function() {
            d.always(function() {
                c.unqueued--,
                Z.queue(e, "fx").length || c.empty.fire()
            })
        })),
        1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY],
        "inline" === Z.css(e, "display") && "none" === Z.css(e, "float") && (Z.support.inlineBlockNeedsLayout && "inline" !== x(e.nodeName) ? p.zoom = 1 : p.display = "inline-block")),
        n.overflow && (p.overflow = "hidden",
        Z.support.shrinkWrapBlocks || d.done(function() {
            p.overflow = n.overflow[0],
            p.overflowX = n.overflow[1],
            p.overflowY = n.overflow[2]
        }));
        for (i in t)
            if (s = t[i],
            Qn.exec(s)) {
                if (delete t[i],
                l = l || "toggle" === s,
                s === (m ? "hide" : "show"))
                    continue;g.push(i)
            }
        if (a = g.length) {
            o = Z._data(e, "fxshow") || Z._data(e, "fxshow", {}),
            "hidden" in o && (m = o.hidden),
            l && (o.hidden = !m),
            m ? Z(e).show() : d.done(function() {
                Z(e).hide()
            }),
            d.done(function() {
                var t;
                Z.removeData(e, "fxshow", !0);
                for (t in f)
                    Z.style(e, t, f[t])
            });
            for (i = 0; a > i; i++)
                r = g[i],
                u = d.createTween(r, m ? o[r] : 0),
                f[r] = o[r] || Z.style(e, r),
                r in o || (o[r] = u.start,
                m && (u.end = u.start,
                u.start = "width" === r || "height" === r ? 1 : 0))
        }
    }
    function L(e, t, n, i, r) {
        return new L.prototype.init(e,t,n,i,r)
    }
    function R(e, t) {
        var n, i = {
            height: e
        }, r = 0;
        for (t = t ? 1 : 0; 4 > r; r += 2 - t)
            n = vn[r],
            i["margin" + n] = i["padding" + n] = e;
        return t && (i.opacity = i.width = e),
        i
    }
    function V(e) {
        return Z.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1
    }
    var B, F, $ = e.document, q = e.location, z = e.navigator, H = e.jQuery, U = e.$, G = Array.prototype.push, X = Array.prototype.slice, W = Array.prototype.indexOf, Y = Object.prototype.toString, Q = Object.prototype.hasOwnProperty, J = String.prototype.trim, Z = function(e, t) {
        return new Z.fn.init(e,t,B)
    }
    , K = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source, et = /\S/, tt = /\s+/, nt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, it = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, rt = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, st = /^[\],:{}\s]*$/, at = /(?:^|:|,)(?:\s*\[)+/g, ot = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, lt = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g, ut = /^-ms-/, ct = /-([\da-z])/gi, ht = function(e, t) {
        return (t + "").toUpperCase()
    }
    , dt = function() {
        $.addEventListener ? ($.removeEventListener("DOMContentLoaded", dt, !1),
        Z.ready()) : "complete" === $.readyState && ($.detachEvent("onreadystatechange", dt),
        Z.ready())
    }
    , pt = {};
    Z.fn = Z.prototype = {
        constructor: Z,
        init: function(e, n, i) {
            var r, s, a;
            if (!e)
                return this;
            if (e.nodeType)
                return this.context = this[0] = e,
                this.length = 1,
                this;
            if ("string" == typeof e) {
                if (r = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null , e, null ] : it.exec(e),
                r && (r[1] || !n)) {
                    if (r[1])
                        return n = n instanceof Z ? n[0] : n,
                        a = n && n.nodeType ? n.ownerDocument || n : $,
                        e = Z.parseHTML(r[1], a, !0),
                        rt.test(r[1]) && Z.isPlainObject(n) && this.attr.call(e, n, !0),
                        Z.merge(this, e);
                    if (s = $.getElementById(r[2]),
                    s && s.parentNode) {
                        if (s.id !== r[2])
                            return i.find(e);
                        this.length = 1,
                        this[0] = s
                    }
                    return this.context = $,
                    this.selector = e,
                    this
                }
                return !n || n.jquery ? (n || i).find(e) : this.constructor(n).find(e)
            }
            return Z.isFunction(e) ? i.ready(e) : (e.selector !== t && (this.selector = e.selector,
            this.context = e.context),
            Z.makeArray(e, this))
        },
        selector: "",
        jquery: "1.8.3",
        length: 0,
        size: function() {
            return this.length
        },
        toArray: function() {
            return X.call(this)
        },
        get: function(e) {
            return null  == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e]
        },
        pushStack: function(e, t, n) {
            var i = Z.merge(this.constructor(), e);
            return i.prevObject = this,
            i.context = this.context,
            "find" === t ? i.selector = this.selector + (this.selector ? " " : "") + n : t && (i.selector = this.selector + "." + t + "(" + n + ")"),
            i
        },
        each: function(e, t) {
            return Z.each(this, e, t)
        },
        ready: function(e) {
            return Z.ready.promise().done(e),
            this
        },
        eq: function(e) {
            return e = +e,
            -1 === e ? this.slice(e) : this.slice(e, e + 1)
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        slice: function() {
            return this.pushStack(X.apply(this, arguments), "slice", X.call(arguments).join(","))
        },
        map: function(e) {
            return this.pushStack(Z.map(this, function(t, n) {
                return e.call(t, n, t)
            }))
        },
        end: function() {
            return this.prevObject || this.constructor(null )
        },
        push: G,
        sort: [].sort,
        splice: [].splice
    },
    Z.fn.init.prototype = Z.fn,
    Z.extend = Z.fn.extend = function() {
        var e, n, i, r, s, a, o = arguments[0] || {}, l = 1, u = arguments.length, c = !1;
        for ("boolean" == typeof o && (c = o,
        o = arguments[1] || {},
        l = 2),
        "object" != typeof o && !Z.isFunction(o) && (o = {}),
        u === l && (o = this,
        --l); u > l; l++)
            if (null  != (e = arguments[l]))
                for (n in e)
                    i = o[n],
                    r = e[n],
                    o !== r && (c && r && (Z.isPlainObject(r) || (s = Z.isArray(r))) ? (s ? (s = !1,
                    a = i && Z.isArray(i) ? i : []) : a = i && Z.isPlainObject(i) ? i : {},
                    o[n] = Z.extend(c, a, r)) : r !== t && (o[n] = r));
        return o
    }
    ,
    Z.extend({
        noConflict: function(t) {
            return e.$ === Z && (e.$ = U),
            t && e.jQuery === Z && (e.jQuery = H),
            Z
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
            e ? Z.readyWait++ : Z.ready(!0)
        },
        ready: function(e) {
            if (e === !0 ? !--Z.readyWait : !Z.isReady) {
                if (!$.body)
                    return setTimeout(Z.ready, 1);
                Z.isReady = !0,
                e !== !0 && --Z.readyWait > 0 || (F.resolveWith($, [Z]),
                Z.fn.trigger && Z($).trigger("ready").off("ready"))
            }
        },
        isFunction: function(e) {
            return "function" === Z.type(e)
        },
        isArray: Array.isArray || function(e) {
            return "array" === Z.type(e)
        }
        ,
        isWindow: function(e) {
            return null  != e && e == e.window
        },
        isNumeric: function(e) {
            return !isNaN(parseFloat(e)) && isFinite(e)
        },
        type: function(e) {
            return null  == e ? String(e) : pt[Y.call(e)] || "object"
        },
        isPlainObject: function(e) {
            if (!e || "object" !== Z.type(e) || e.nodeType || Z.isWindow(e))
                return !1;
            try {
                if (e.constructor && !Q.call(e, "constructor") && !Q.call(e.constructor.prototype, "isPrototypeOf"))
                    return !1
            } catch (n) {
                return !1
            }
            var i;
            for (i in e)
                ;
            return i === t || Q.call(e, i)
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e)
                return !1;
            return !0
        },
        error: function(e) {
            throw new Error(e)
        },
        parseHTML: function(e, t, n) {
            var i;
            return e && "string" == typeof e ? ("boolean" == typeof t && (n = t,
            t = 0),
            t = t || $,
            (i = rt.exec(e)) ? [t.createElement(i[1])] : (i = Z.buildFragment([e], t, n ? null  : []),
            Z.merge([], (i.cacheable ? Z.clone(i.fragment) : i.fragment).childNodes))) : null 
        },
        parseJSON: function(t) {
            return t && "string" == typeof t ? (t = Z.trim(t),
            e.JSON && e.JSON.parse ? e.JSON.parse(t) : st.test(t.replace(ot, "@").replace(lt, "]").replace(at, "")) ? new Function("return " + t)() : (Z.error("Invalid JSON: " + t),
            void 0)) : null 
        },
        parseXML: function(n) {
            var i, r;
            if (!n || "string" != typeof n)
                return null ;
            try {
                e.DOMParser ? (r = new DOMParser,
                i = r.parseFromString(n, "text/xml")) : (i = new ActiveXObject("Microsoft.XMLDOM"),
                i.async = "false",
                i.loadXML(n))
            } catch (s) {
                i = t
            }
            return (!i || !i.documentElement || i.getElementsByTagName("parsererror").length) && Z.error("Invalid XML: " + n),
            i
        },
        noop: function() {},
        globalEval: function(t) {
            t && et.test(t) && (e.execScript || function(t) {
                e.eval.call(e, t)
            }
            )(t)
        },
        camelCase: function(e) {
            return e.replace(ut, "ms-").replace(ct, ht)
        },
        nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        },
        each: function(e, n, i) {
            var r, s = 0, a = e.length, o = a === t || Z.isFunction(e);
            if (i)
                if (o) {
                    for (r in e)
                        if (n.apply(e[r], i) === !1)
                            break
                } else
                    for (; a > s && n.apply(e[s++], i) !== !1; )
                        ;
            else if (o) {
                for (r in e)
                    if (n.call(e[r], r, e[r]) === !1)
                        break
            } else
                for (; a > s && n.call(e[s], s, e[s++]) !== !1; )
                    ;
            return e
        },
        trim: J && !J.call("﻿ ") ? function(e) {
            return null  == e ? "" : J.call(e)
        }
         : function(e) {
            return null  == e ? "" : (e + "").replace(nt, "")
        }
        ,
        makeArray: function(e, t) {
            var n, i = t || [];
            return null  != e && (n = Z.type(e),
            null  == e.length || "string" === n || "function" === n || "regexp" === n || Z.isWindow(e) ? G.call(i, e) : Z.merge(i, e)),
            i
        },
        inArray: function(e, t, n) {
            var i;
            if (t) {
                if (W)
                    return W.call(t, e, n);
                for (i = t.length,
                n = n ? 0 > n ? Math.max(0, i + n) : n : 0; i > n; n++)
                    if (n in t && t[n] === e)
                        return n
            }
            return -1
        },
        merge: function(e, n) {
            var i = n.length
              , r = e.length
              , s = 0;
            if ("number" == typeof i)
                for (; i > s; s++)
                    e[r++] = n[s];
            else
                for (; n[s] !== t; )
                    e[r++] = n[s++];
            return e.length = r,
            e
        },
        grep: function(e, t, n) {
            var i, r = [], s = 0, a = e.length;
            for (n = !!n; a > s; s++)
                i = !!t(e[s], s),
                n !== i && r.push(e[s]);
            return r
        },
        map: function(e, n, i) {
            var r, s, a = [], o = 0, l = e.length, u = e instanceof Z || l !== t && "number" == typeof l && (l > 0 && e[0] && e[l - 1] || 0 === l || Z.isArray(e));
            if (u)
                for (; l > o; o++)
                    r = n(e[o], o, i),
                    null  != r && (a[a.length] = r);
            else
                for (s in e)
                    r = n(e[s], s, i),
                    null  != r && (a[a.length] = r);
            return a.concat.apply([], a)
        },
        guid: 1,
        proxy: function(e, n) {
            var i, r, s;
            return "string" == typeof n && (i = e[n],
            n = e,
            e = i),
            Z.isFunction(e) ? (r = X.call(arguments, 2),
            s = function() {
                return e.apply(n, r.concat(X.call(arguments)))
            }
            ,
            s.guid = e.guid = e.guid || Z.guid++,
            s) : t
        },
        access: function(e, n, i, r, s, a, o) {
            var l, u = null  == i, c = 0, h = e.length;
            if (i && "object" == typeof i) {
                for (c in i)
                    Z.access(e, n, c, i[c], 1, a, r);
                s = 1
            } else if (r !== t) {
                if (l = o === t && Z.isFunction(r),
                u && (l ? (l = n,
                n = function(e, t, n) {
                    return l.call(Z(e), n)
                }
                ) : (n.call(e, r),
                n = null )),
                n)
                    for (; h > c; c++)
                        n(e[c], i, l ? r.call(e[c], c, n(e[c], i)) : r, o);
                s = 1
            }
            return s ? e : u ? n.call(e) : h ? n(e[0], i) : a
        },
        now: function() {
            return (new Date).getTime()
        }
    }),
    Z.ready.promise = function(t) {
        if (!F)
            if (F = Z.Deferred(),
            "complete" === $.readyState)
                setTimeout(Z.ready, 1);
            else if ($.addEventListener)
                $.addEventListener("DOMContentLoaded", dt, !1),
                e.addEventListener("load", Z.ready, !1);
            else {
                $.attachEvent("onreadystatechange", dt),
                e.attachEvent("onload", Z.ready);
                var n = !1;
                try {
                    n = null  == e.frameElement && $.documentElement
                } catch (i) {}
                n && n.doScroll && function r() {
                    if (!Z.isReady) {
                        try {
                            n.doScroll("left")
                        } catch (e) {
                            return setTimeout(r, 50)
                        }
                        Z.ready()
                    }
                }()
            }
        return F.promise(t)
    }
    ,
    Z.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(e, t) {
        pt["[object " + t + "]"] = t.toLowerCase()
    }),
    B = Z($);
    var ft = {};
    Z.Callbacks = function(e) {
        e = "string" == typeof e ? ft[e] || n(e) : Z.extend({}, e);
        var i, r, s, a, o, l, u = [], c = !e.once && [], h = function(t) {
            for (i = e.memory && t,
            r = !0,
            l = a || 0,
            a = 0,
            o = u.length,
            s = !0; u && o > l; l++)
                if (u[l].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
                    i = !1;
                    break
                }
            s = !1,
            u && (c ? c.length && h(c.shift()) : i ? u = [] : d.disable())
        }
        , d = {
            add: function() {
                if (u) {
                    var t = u.length;
                    !function n(t) {
                        Z.each(t, function(t, i) {
                            var r = Z.type(i);
                            "function" === r ? (!e.unique || !d.has(i)) && u.push(i) : i && i.length && "string" !== r && n(i)
                        })
                    }(arguments),
                    s ? o = u.length : i && (a = t,
                    h(i))
                }
                return this
            },
            remove: function() {
                return u && Z.each(arguments, function(e, t) {
                    for (var n; (n = Z.inArray(t, u, n)) > -1; )
                        u.splice(n, 1),
                        s && (o >= n && o--,
                        l >= n && l--)
                }),
                this
            },
            has: function(e) {
                return Z.inArray(e, u) > -1
            },
            empty: function() {
                return u = [],
                this
            },
            disable: function() {
                return u = c = i = t,
                this
            },
            disabled: function() {
                return !u
            },
            lock: function() {
                return c = t,
                i || d.disable(),
                this
            },
            locked: function() {
                return !c
            },
            fireWith: function(e, t) {
                return t = t || [],
                t = [e, t.slice ? t.slice() : t],
                u && (!r || c) && (s ? c.push(t) : h(t)),
                this
            },
            fire: function() {
                return d.fireWith(this, arguments),
                this
            },
            fired: function() {
                return !!r
            }
        };
        return d
    }
    ,
    Z.extend({
        Deferred: function(e) {
            var t = [["resolve", "done", Z.Callbacks("once memory"), "resolved"], ["reject", "fail", Z.Callbacks("once memory"), "rejected"], ["notify", "progress", Z.Callbacks("memory")]]
              , n = "pending"
              , i = {
                state: function() {
                    return n
                },
                always: function() {
                    return r.done(arguments).fail(arguments),
                    this
                },
                then: function() {
                    var e = arguments;
                    return Z.Deferred(function(n) {
                        Z.each(t, function(t, i) {
                            var s = i[0]
                              , a = e[t];
                            r[i[1]](Z.isFunction(a) ? function() {
                                var e = a.apply(this, arguments);
                                e && Z.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[s + "With"](this === r ? n : this, [e])
                            }
                             : n[s])
                        }),
                        e = null 
                    }).promise()
                },
                promise: function(e) {
                    return null  != e ? Z.extend(e, i) : i
                }
            }
              , r = {};
            return i.pipe = i.then,
            Z.each(t, function(e, s) {
                var a = s[2]
                  , o = s[3];
                i[s[1]] = a.add,
                o && a.add(function() {
                    n = o
                }, t[1 ^ e][2].disable, t[2][2].lock),
                r[s[0]] = a.fire,
                r[s[0] + "With"] = a.fireWith
            }),
            i.promise(r),
            e && e.call(r, r),
            r
        },
        when: function(e) {
            var t, n, i, r = 0, s = X.call(arguments), a = s.length, o = 1 !== a || e && Z.isFunction(e.promise) ? a : 0, l = 1 === o ? e : Z.Deferred(), u = function(e, n, i) {
                return function(r) {
                    n[e] = this,
                    i[e] = arguments.length > 1 ? X.call(arguments) : r,
                    i === t ? l.notifyWith(n, i) : --o || l.resolveWith(n, i)
                }
            }
            ;
            if (a > 1)
                for (t = new Array(a),
                n = new Array(a),
                i = new Array(a); a > r; r++)
                    s[r] && Z.isFunction(s[r].promise) ? s[r].promise().done(u(r, i, s)).fail(l.reject).progress(u(r, n, t)) : --o;
            return o || l.resolveWith(i, s),
            l.promise()
        }
    }),
    Z.support = function() {
        var t, n, i, r, s, a, o, l, u, c, h, d = $.createElement("div");
        if (d.setAttribute("className", "t"),
        d.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
        n = d.getElementsByTagName("*"),
        i = d.getElementsByTagName("a")[0],
        !n || !i || !n.length)
            return {};
        r = $.createElement("select"),
        s = r.appendChild($.createElement("option")),
        a = d.getElementsByTagName("input")[0],
        i.style.cssText = "top:1px;float:left;opacity:.5",
        t = {
            leadingWhitespace: 3 === d.firstChild.nodeType,
            tbody: !d.getElementsByTagName("tbody").length,
            htmlSerialize: !!d.getElementsByTagName("link").length,
            style: /top/.test(i.getAttribute("style")),
            hrefNormalized: "/a" === i.getAttribute("href"),
            opacity: /^0.5/.test(i.style.opacity),
            cssFloat: !!i.style.cssFloat,
            checkOn: "on" === a.value,
            optSelected: s.selected,
            getSetAttribute: "t" !== d.className,
            enctype: !!$.createElement("form").enctype,
            html5Clone: "<:nav></:nav>" !== $.createElement("nav").cloneNode(!0).outerHTML,
            boxModel: "CSS1Compat" === $.compatMode,
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0,
            boxSizingReliable: !0,
            pixelPosition: !1
        },
        a.checked = !0,
        t.noCloneChecked = a.cloneNode(!0).checked,
        r.disabled = !0,
        t.optDisabled = !s.disabled;
        try {
            delete d.test
        } catch (p) {
            t.deleteExpando = !1
        }
        if (!d.addEventListener && d.attachEvent && d.fireEvent && (d.attachEvent("onclick", h = function() {
            t.noCloneEvent = !1
        }
        ),
        d.cloneNode(!0).fireEvent("onclick"),
        d.detachEvent("onclick", h)),
        a = $.createElement("input"),
        a.value = "t",
        a.setAttribute("type", "radio"),
        t.radioValue = "t" === a.value,
        a.setAttribute("checked", "checked"),
        a.setAttribute("name", "t"),
        d.appendChild(a),
        o = $.createDocumentFragment(),
        o.appendChild(d.lastChild),
        t.checkClone = o.cloneNode(!0).cloneNode(!0).lastChild.checked,
        t.appendChecked = a.checked,
        o.removeChild(a),
        o.appendChild(d),
        d.attachEvent)
            for (u in {
                submit: !0,
                change: !0,
                focusin: !0
            })
                l = "on" + u,
                c = l in d,
                c || (d.setAttribute(l, "return;"),
                c = "function" == typeof d[l]),
                t[u + "Bubbles"] = c;
        return Z(function() {
            var n, i, r, s, a = "padding:0;margin:0;border:0;display:block;overflow:hidden;", o = $.getElementsByTagName("body")[0];
            o && (n = $.createElement("div"),
            n.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px",
            o.insertBefore(n, o.firstChild),
            i = $.createElement("div"),
            n.appendChild(i),
            i.innerHTML = "<table><tr><td></td><td>t</td></tr></table>",
            r = i.getElementsByTagName("td"),
            r[0].style.cssText = "padding:0;margin:0;border:0;display:none",
            c = 0 === r[0].offsetHeight,
            r[0].style.display = "",
            r[1].style.display = "none",
            t.reliableHiddenOffsets = c && 0 === r[0].offsetHeight,
            i.innerHTML = "",
            i.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",
            t.boxSizing = 4 === i.offsetWidth,
            t.doesNotIncludeMarginInBodyOffset = 1 !== o.offsetTop,
            e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(i, null ) || {}).top,
            t.boxSizingReliable = "4px" === (e.getComputedStyle(i, null ) || {
                width: "4px"
            }).width,
            s = $.createElement("div"),
            s.style.cssText = i.style.cssText = a,
            s.style.marginRight = s.style.width = "0",
            i.style.width = "1px",
            i.appendChild(s),
            t.reliableMarginRight = !parseFloat((e.getComputedStyle(s, null ) || {}).marginRight)),
            "undefined" != typeof i.style.zoom && (i.innerHTML = "",
            i.style.cssText = a + "width:1px;padding:1px;display:inline;zoom:1",
            t.inlineBlockNeedsLayout = 3 === i.offsetWidth,
            i.style.display = "block",
            i.style.overflow = "visible",
            i.innerHTML = "<div></div>",
            i.firstChild.style.width = "5px",
            t.shrinkWrapBlocks = 3 !== i.offsetWidth,
            n.style.zoom = 1),
            o.removeChild(n),
            n = i = r = s = null )
        }),
        o.removeChild(d),
        n = i = r = s = a = o = d = null ,
        t
    }();
    var gt = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/
      , mt = /([A-Z])/g;
    Z.extend({
        cache: {},
        deletedIds: [],
        uuid: 0,
        expando: "jQuery" + (Z.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function(e) {
            return e = e.nodeType ? Z.cache[e[Z.expando]] : e[Z.expando],
            !!e && !r(e)
        },
        data: function(e, n, i, r) {
            if (Z.acceptData(e)) {
                var s, a, o = Z.expando, l = "string" == typeof n, u = e.nodeType, c = u ? Z.cache : e, h = u ? e[o] : e[o] && o;
                if (h && c[h] && (r || c[h].data) || !l || i !== t)
                    return h || (u ? e[o] = h = Z.deletedIds.pop() || Z.guid++ : h = o),
                    c[h] || (c[h] = {},
                    u || (c[h].toJSON = Z.noop)),
                    ("object" == typeof n || "function" == typeof n) && (r ? c[h] = Z.extend(c[h], n) : c[h].data = Z.extend(c[h].data, n)),
                    s = c[h],
                    r || (s.data || (s.data = {}),
                    s = s.data),
                    i !== t && (s[Z.camelCase(n)] = i),
                    l ? (a = s[n],
                    null  == a && (a = s[Z.camelCase(n)])) : a = s,
                    a
            }
        },
        removeData: function(e, t, n) {
            if (Z.acceptData(e)) {
                var i, s, a, o = e.nodeType, l = o ? Z.cache : e, u = o ? e[Z.expando] : Z.expando;
                if (l[u]) {
                    if (t && (i = n ? l[u] : l[u].data)) {
                        Z.isArray(t) || (t in i ? t = [t] : (t = Z.camelCase(t),
                        t = t in i ? [t] : t.split(" ")));
                        for (s = 0,
                        a = t.length; a > s; s++)
                            delete i[t[s]];
                        if (!(n ? r : Z.isEmptyObject)(i))
                            return
                    }
                    (n || (delete l[u].data,
                    r(l[u]))) && (o ? Z.cleanData([e], !0) : Z.support.deleteExpando || l != l.window ? delete l[u] : l[u] = null )
                }
            }
        },
        _data: function(e, t, n) {
            return Z.data(e, t, n, !0)
        },
        acceptData: function(e) {
            var t = e.nodeName && Z.noData[e.nodeName.toLowerCase()];
            return !t || t !== !0 && e.getAttribute("classid") === t
        }
    }),
    Z.fn.extend({
        data: function(e, n) {
            var r, s, a, o, l, u = this[0], c = 0, h = null ;
            if (e === t) {
                if (this.length && (h = Z.data(u),
                1 === u.nodeType && !Z._data(u, "parsedAttrs"))) {
                    for (a = u.attributes,
                    l = a.length; l > c; c++)
                        o = a[c].name,
                        o.indexOf("data-") || (o = Z.camelCase(o.substring(5)),
                        i(u, o, h[o]));
                    Z._data(u, "parsedAttrs", !0)
                }
                return h
            }
            return "object" == typeof e ? this.each(function() {
                Z.data(this, e)
            }) : (r = e.split(".", 2),
            r[1] = r[1] ? "." + r[1] : "",
            s = r[1] + "!",
            Z.access(this, function(n) {
                return n === t ? (h = this.triggerHandler("getData" + s, [r[0]]),
                h === t && u && (h = Z.data(u, e),
                h = i(u, e, h)),
                h === t && r[1] ? this.data(r[0]) : h) : (r[1] = n,
                this.each(function() {
                    var t = Z(this);
                    t.triggerHandler("setData" + s, r),
                    Z.data(this, e, n),
                    t.triggerHandler("changeData" + s, r)
                }),
                void 0)
            }, null , n, arguments.length > 1, null , !1))
        },
        removeData: function(e) {
            return this.each(function() {
                Z.removeData(this, e)
            })
        }
    }),
    Z.extend({
        queue: function(e, t, n) {
            var i;
            return e ? (t = (t || "fx") + "queue",
            i = Z._data(e, t),
            n && (!i || Z.isArray(n) ? i = Z._data(e, t, Z.makeArray(n)) : i.push(n)),
            i || []) : void 0
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = Z.queue(e, t)
              , i = n.length
              , r = n.shift()
              , s = Z._queueHooks(e, t)
              , a = function() {
                Z.dequeue(e, t)
            }
            ;
            "inprogress" === r && (r = n.shift(),
            i--),
            r && ("fx" === t && n.unshift("inprogress"),
            delete s.stop,
            r.call(e, a, s)),
            !i && s && s.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return Z._data(e, n) || Z._data(e, n, {
                empty: Z.Callbacks("once memory").add(function() {
                    Z.removeData(e, t + "queue", !0),
                    Z.removeData(e, n, !0)
                })
            })
        }
    }),
    Z.fn.extend({
        queue: function(e, n) {
            var i = 2;
            return "string" != typeof e && (n = e,
            e = "fx",
            i--),
            arguments.length < i ? Z.queue(this[0], e) : n === t ? this : this.each(function() {
                var t = Z.queue(this, e, n);
                Z._queueHooks(this, e),
                "fx" === e && "inprogress" !== t[0] && Z.dequeue(this, e)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                Z.dequeue(this, e)
            })
        },
        delay: function(e, t) {
            return e = Z.fx ? Z.fx.speeds[e] || e : e,
            t = t || "fx",
            this.queue(t, function(t, n) {
                var i = setTimeout(t, e);
                n.stop = function() {
                    clearTimeout(i)
                }
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, n) {
            var i, r = 1, s = Z.Deferred(), a = this, o = this.length, l = function() {
                --r || s.resolveWith(a, [a])
            }
            ;
            for ("string" != typeof e && (n = e,
            e = t),
            e = e || "fx"; o--; )
                i = Z._data(a[o], e + "queueHooks"),
                i && i.empty && (r++,
                i.empty.add(l));
            return l(),
            s.promise(n)
        }
    });
    var vt, _t, yt, bt = /[\t\r\n]/g, wt = /\r/g, xt = /^(?:button|input)$/i, Tt = /^(?:button|input|object|select|textarea)$/i, Pt = /^a(?:rea|)$/i, St = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, kt = Z.support.getSetAttribute;
    Z.fn.extend({
        attr: function(e, t) {
            return Z.access(this, Z.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                Z.removeAttr(this, e)
            })
        },
        prop: function(e, t) {
            return Z.access(this, Z.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            return e = Z.propFix[e] || e,
            this.each(function() {
                try {
                    this[e] = t,
                    delete this[e]
                } catch (n) {}
            })
        },
        addClass: function(e) {
            var t, n, i, r, s, a, o;
            if (Z.isFunction(e))
                return this.each(function(t) {
                    Z(this).addClass(e.call(this, t, this.className))
                });
            if (e && "string" == typeof e)
                for (t = e.split(tt),
                n = 0,
                i = this.length; i > n; n++)
                    if (r = this[n],
                    1 === r.nodeType)
                        if (r.className || 1 !== t.length) {
                            for (s = " " + r.className + " ",
                            a = 0,
                            o = t.length; o > a; a++)
                                s.indexOf(" " + t[a] + " ") < 0 && (s += t[a] + " ");
                            r.className = Z.trim(s)
                        } else
                            r.className = e;
            return this
        },
        removeClass: function(e) {
            var n, i, r, s, a, o, l;
            if (Z.isFunction(e))
                return this.each(function(t) {
                    Z(this).removeClass(e.call(this, t, this.className))
                });
            if (e && "string" == typeof e || e === t)
                for (n = (e || "").split(tt),
                o = 0,
                l = this.length; l > o; o++)
                    if (r = this[o],
                    1 === r.nodeType && r.className) {
                        for (i = (" " + r.className + " ").replace(bt, " "),
                        s = 0,
                        a = n.length; a > s; s++)
                            for (; i.indexOf(" " + n[s] + " ") >= 0; )
                                i = i.replace(" " + n[s] + " ", " ");
                        r.className = e ? Z.trim(i) : ""
                    }
            return this
        },
        toggleClass: function(e, t) {
            var n = typeof e
              , i = "boolean" == typeof t;
            return Z.isFunction(e) ? this.each(function(n) {
                Z(this).toggleClass(e.call(this, n, this.className, t), t)
            }) : this.each(function() {
                if ("string" === n)
                    for (var r, s = 0, a = Z(this), o = t, l = e.split(tt); r = l[s++]; )
                        o = i ? o : !a.hasClass(r),
                        a[o ? "addClass" : "removeClass"](r);
                else
                    ("undefined" === n || "boolean" === n) && (this.className && Z._data(this, "__className__", this.className),
                    this.className = this.className || e === !1 ? "" : Z._data(this, "__className__") || "")
            })
        },
        hasClass: function(e) {
            for (var t = " " + e + " ", n = 0, i = this.length; i > n; n++)
                if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(bt, " ").indexOf(t) >= 0)
                    return !0;
            return !1
        },
        val: function(e) {
            var n, i, r, s = this[0];
            {
                if (arguments.length)
                    return r = Z.isFunction(e),
                    this.each(function(i) {
                        var s, a = Z(this);
                        1 === this.nodeType && (s = r ? e.call(this, i, a.val()) : e,
                        null  == s ? s = "" : "number" == typeof s ? s += "" : Z.isArray(s) && (s = Z.map(s, function(e) {
                            return null  == e ? "" : e + ""
                        })),
                        n = Z.valHooks[this.type] || Z.valHooks[this.nodeName.toLowerCase()],
                        n && "set" in n && n.set(this, s, "value") !== t || (this.value = s))
                    });
                if (s)
                    return n = Z.valHooks[s.type] || Z.valHooks[s.nodeName.toLowerCase()],
                    n && "get" in n && (i = n.get(s, "value")) !== t ? i : (i = s.value,
                    "string" == typeof i ? i.replace(wt, "") : null  == i ? "" : i)
            }
        }
    }),
    Z.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = e.attributes.value;
                    return !t || t.specified ? e.value : e.text
                }
            },
            select: {
                get: function(e) {
                    for (var t, n, i = e.options, r = e.selectedIndex, s = "select-one" === e.type || 0 > r, a = s ? null  : [], o = s ? r + 1 : i.length, l = 0 > r ? o : s ? r : 0; o > l; l++)
                        if (n = i[l],
                        !(!n.selected && l !== r || (Z.support.optDisabled ? n.disabled : null  !== n.getAttribute("disabled")) || n.parentNode.disabled && Z.nodeName(n.parentNode, "optgroup"))) {
                            if (t = Z(n).val(),
                            s)
                                return t;
                            a.push(t)
                        }
                    return a
                },
                set: function(e, t) {
                    var n = Z.makeArray(t);
                    return Z(e).find("option").each(function() {
                        this.selected = Z.inArray(Z(this).val(), n) >= 0
                    }),
                    n.length || (e.selectedIndex = -1),
                    n
                }
            }
        },
        attrFn: {},
        attr: function(e, n, i, r) {
            var s, a, o, l = e.nodeType;
            if (e && 3 !== l && 8 !== l && 2 !== l)
                return r && Z.isFunction(Z.fn[n]) ? Z(e)[n](i) : "undefined" == typeof e.getAttribute ? Z.prop(e, n, i) : (o = 1 !== l || !Z.isXMLDoc(e),
                o && (n = n.toLowerCase(),
                a = Z.attrHooks[n] || (St.test(n) ? _t : vt)),
                i !== t ? null  === i ? (Z.removeAttr(e, n),
                void 0) : a && "set" in a && o && (s = a.set(e, i, n)) !== t ? s : (e.setAttribute(n, i + ""),
                i) : a && "get" in a && o && null  !== (s = a.get(e, n)) ? s : (s = e.getAttribute(n),
                null  === s ? t : s))
        },
        removeAttr: function(e, t) {
            var n, i, r, s, a = 0;
            if (t && 1 === e.nodeType)
                for (i = t.split(tt); a < i.length; a++)
                    r = i[a],
                    r && (n = Z.propFix[r] || r,
                    s = St.test(r),
                    s || Z.attr(e, r, ""),
                    e.removeAttribute(kt ? r : n),
                    s && n in e && (e[n] = !1))
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (xt.test(e.nodeName) && e.parentNode)
                        Z.error("type property can't be changed");
                    else if (!Z.support.radioValue && "radio" === t && Z.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t),
                        n && (e.value = n),
                        t
                    }
                }
            },
            value: {
                get: function(e, t) {
                    return vt && Z.nodeName(e, "button") ? vt.get(e, t) : t in e ? e.value : null 
                },
                set: function(e, t, n) {
                    return vt && Z.nodeName(e, "button") ? vt.set(e, t, n) : (e.value = t,
                    void 0)
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
        prop: function(e, n, i) {
            var r, s, a, o = e.nodeType;
            if (e && 3 !== o && 8 !== o && 2 !== o)
                return a = 1 !== o || !Z.isXMLDoc(e),
                a && (n = Z.propFix[n] || n,
                s = Z.propHooks[n]),
                i !== t ? s && "set" in s && (r = s.set(e, i, n)) !== t ? r : e[n] = i : s && "get" in s && null  !== (r = s.get(e, n)) ? r : e[n]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var n = e.getAttributeNode("tabindex");
                    return n && n.specified ? parseInt(n.value, 10) : Tt.test(e.nodeName) || Pt.test(e.nodeName) && e.href ? 0 : t
                }
            }
        }
    }),
    _t = {
        get: function(e, n) {
            var i, r = Z.prop(e, n);
            return r === !0 || "boolean" != typeof r && (i = e.getAttributeNode(n)) && i.nodeValue !== !1 ? n.toLowerCase() : t
        },
        set: function(e, t, n) {
            var i;
            return t === !1 ? Z.removeAttr(e, n) : (i = Z.propFix[n] || n,
            i in e && (e[i] = !0),
            e.setAttribute(n, n.toLowerCase())),
            n
        }
    },
    kt || (yt = {
        name: !0,
        id: !0,
        coords: !0
    },
    vt = Z.valHooks.button = {
        get: function(e, n) {
            var i;
            return i = e.getAttributeNode(n),
            i && (yt[n] ? "" !== i.value : i.specified) ? i.value : t
        },
        set: function(e, t, n) {
            var i = e.getAttributeNode(n);
            return i || (i = $.createAttribute(n),
            e.setAttributeNode(i)),
            i.value = t + ""
        }
    },
    Z.each(["width", "height"], function(e, t) {
        Z.attrHooks[t] = Z.extend(Z.attrHooks[t], {
            set: function(e, n) {
                return "" === n ? (e.setAttribute(t, "auto"),
                n) : void 0
            }
        })
    }),
    Z.attrHooks.contenteditable = {
        get: vt.get,
        set: function(e, t, n) {
            "" === t && (t = "false"),
            vt.set(e, t, n)
        }
    }),
    Z.support.hrefNormalized || Z.each(["href", "src", "width", "height"], function(e, n) {
        Z.attrHooks[n] = Z.extend(Z.attrHooks[n], {
            get: function(e) {
                var i = e.getAttribute(n, 2);
                return null  === i ? t : i
            }
        })
    }),
    Z.support.style || (Z.attrHooks.style = {
        get: function(e) {
            return e.style.cssText.toLowerCase() || t
        },
        set: function(e, t) {
            return e.style.cssText = t + ""
        }
    }),
    Z.support.optSelected || (Z.propHooks.selected = Z.extend(Z.propHooks.selected, {
        get: function(e) {
            var t = e.parentNode;
            return t && (t.selectedIndex,
            t.parentNode && t.parentNode.selectedIndex),
            null 
        }
    })),
    Z.support.enctype || (Z.propFix.enctype = "encoding"),
    Z.support.checkOn || Z.each(["radio", "checkbox"], function() {
        Z.valHooks[this] = {
            get: function(e) {
                return null  === e.getAttribute("value") ? "on" : e.value
            }
        }
    }),
    Z.each(["radio", "checkbox"], function() {
        Z.valHooks[this] = Z.extend(Z.valHooks[this], {
            set: function(e, t) {
                return Z.isArray(t) ? e.checked = Z.inArray(Z(e).val(), t) >= 0 : void 0
            }
        })
    });
    var At = /^(?:textarea|input|select)$/i
      , Ct = /^([^\.]*|)(?:\.(.+)|)$/
      , jt = /(?:^|\s)hover(\.\S+|)\b/
      , Ot = /^key/
      , Mt = /^(?:mouse|contextmenu)|click/
      , Et = /^(?:focusinfocus|focusoutblur)$/
      , Dt = function(e) {
        return Z.event.special.hover ? e : e.replace(jt, "mouseenter$1 mouseleave$1")
    }
    ;
    Z.event = {
        add: function(e, n, i, r, s) {
            var a, o, l, u, c, h, d, p, f, g, m;
            if (3 !== e.nodeType && 8 !== e.nodeType && n && i && (a = Z._data(e))) {
                for (i.handler && (f = i,
                i = f.handler,
                s = f.selector),
                i.guid || (i.guid = Z.guid++),
                l = a.events,
                l || (a.events = l = {}),
                o = a.handle,
                o || (a.handle = o = function(e) {
                    return "undefined" == typeof Z || e && Z.event.triggered === e.type ? t : Z.event.dispatch.apply(o.elem, arguments)
                }
                ,
                o.elem = e),
                n = Z.trim(Dt(n)).split(" "),
                u = 0; u < n.length; u++)
                    c = Ct.exec(n[u]) || [],
                    h = c[1],
                    d = (c[2] || "").split(".").sort(),
                    m = Z.event.special[h] || {},
                    h = (s ? m.delegateType : m.bindType) || h,
                    m = Z.event.special[h] || {},
                    p = Z.extend({
                        type: h,
                        origType: c[1],
                        data: r,
                        handler: i,
                        guid: i.guid,
                        selector: s,
                        needsContext: s && Z.expr.match.needsContext.test(s),
                        namespace: d.join(".")
                    }, f),
                    g = l[h],
                    g || (g = l[h] = [],
                    g.delegateCount = 0,
                    m.setup && m.setup.call(e, r, d, o) !== !1 || (e.addEventListener ? e.addEventListener(h, o, !1) : e.attachEvent && e.attachEvent("on" + h, o))),
                    m.add && (m.add.call(e, p),
                    p.handler.guid || (p.handler.guid = i.guid)),
                    s ? g.splice(g.delegateCount++, 0, p) : g.push(p),
                    Z.event.global[h] = !0;
                e = null 
            }
        },
        global: {},
        remove: function(e, t, n, i, r) {
            var s, a, o, l, u, c, h, d, p, f, g, m = Z.hasData(e) && Z._data(e);
            if (m && (d = m.events)) {
                for (t = Z.trim(Dt(t || "")).split(" "),
                s = 0; s < t.length; s++)
                    if (a = Ct.exec(t[s]) || [],
                    o = l = a[1],
                    u = a[2],
                    o) {
                        for (p = Z.event.special[o] || {},
                        o = (i ? p.delegateType : p.bindType) || o,
                        f = d[o] || [],
                        c = f.length,
                        u = u ? new RegExp("(^|\\.)" + u.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null ,
                        h = 0; h < f.length; h++)
                            g = f[h],
                            !(!r && l !== g.origType || n && n.guid !== g.guid || u && !u.test(g.namespace) || i && i !== g.selector && ("**" !== i || !g.selector) || (f.splice(h--, 1),
                            g.selector && f.delegateCount--,
                            !p.remove || !p.remove.call(e, g)));
                        0 === f.length && c !== f.length && ((!p.teardown || p.teardown.call(e, u, m.handle) === !1) && Z.removeEvent(e, o, m.handle),
                        delete d[o])
                    } else
                        for (o in d)
                            Z.event.remove(e, o + t[s], n, i, !0);
                Z.isEmptyObject(d) && (delete m.handle,
                Z.removeData(e, "events", !0))
            }
        },
        customEvent: {
            getData: !0,
            setData: !0,
            changeData: !0
        },
        trigger: function(n, i, r, s) {
            if (!r || 3 !== r.nodeType && 8 !== r.nodeType) {
                var a, o, l, u, c, h, d, p, f, g, m = n.type || n, v = [];
                if (Et.test(m + Z.event.triggered))
                    return;
                if (m.indexOf("!") >= 0 && (m = m.slice(0, -1),
                o = !0),
                m.indexOf(".") >= 0 && (v = m.split("."),
                m = v.shift(),
                v.sort()),
                (!r || Z.event.customEvent[m]) && !Z.event.global[m])
                    return;
                if (n = "object" == typeof n ? n[Z.expando] ? n : new Z.Event(m,n) : new Z.Event(m),
                n.type = m,
                n.isTrigger = !0,
                n.exclusive = o,
                n.namespace = v.join("."),
                n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + v.join("\\.(?:.*\\.|)") + "(\\.|$)") : null ,
                h = m.indexOf(":") < 0 ? "on" + m : "",
                !r) {
                    a = Z.cache;
                    for (l in a)
                        a[l].events && a[l].events[m] && Z.event.trigger(n, i, a[l].handle.elem, !0);
                    return
                }
                if (n.result = t,
                n.target || (n.target = r),
                i = null  != i ? Z.makeArray(i) : [],
                i.unshift(n),
                d = Z.event.special[m] || {},
                d.trigger && d.trigger.apply(r, i) === !1)
                    return;
                if (f = [[r, d.bindType || m]],
                !s && !d.noBubble && !Z.isWindow(r)) {
                    for (g = d.delegateType || m,
                    u = Et.test(g + m) ? r : r.parentNode,
                    c = r; u; u = u.parentNode)
                        f.push([u, g]),
                        c = u;
                    c === (r.ownerDocument || $) && f.push([c.defaultView || c.parentWindow || e, g])
                }
                for (l = 0; l < f.length && !n.isPropagationStopped(); l++)
                    u = f[l][0],
                    n.type = f[l][1],
                    p = (Z._data(u, "events") || {})[n.type] && Z._data(u, "handle"),
                    p && p.apply(u, i),
                    p = h && u[h],
                    p && Z.acceptData(u) && p.apply && p.apply(u, i) === !1 && n.preventDefault();
                return n.type = m,
                !(s || n.isDefaultPrevented() || d._default && d._default.apply(r.ownerDocument, i) !== !1 || "click" === m && Z.nodeName(r, "a") || !Z.acceptData(r) || !h || !r[m] || ("focus" === m || "blur" === m) && 0 === n.target.offsetWidth || Z.isWindow(r) || (c = r[h],
                c && (r[h] = null ),
                Z.event.triggered = m,
                r[m](),
                Z.event.triggered = t,
                !c || !(r[h] = c))),
                n.result
            }
        },
        dispatch: function(n) {
            n = Z.event.fix(n || e.event);
            var i, r, s, a, o, l, u, c, h, d = (Z._data(this, "events") || {})[n.type] || [], p = d.delegateCount, f = X.call(arguments), g = !n.exclusive && !n.namespace, m = Z.event.special[n.type] || {}, v = [];
            if (f[0] = n,
            n.delegateTarget = this,
            !m.preDispatch || m.preDispatch.call(this, n) !== !1) {
                if (p && (!n.button || "click" !== n.type))
                    for (s = n.target; s != this; s = s.parentNode || this)
                        if (s.disabled !== !0 || "click" !== n.type) {
                            for (o = {},
                            u = [],
                            i = 0; p > i; i++)
                                c = d[i],
                                h = c.selector,
                                o[h] === t && (o[h] = c.needsContext ? Z(h, this).index(s) >= 0 : Z.find(h, this, null , [s]).length),
                                o[h] && u.push(c);
                            u.length && v.push({
                                elem: s,
                                matches: u
                            })
                        }
                for (d.length > p && v.push({
                    elem: this,
                    matches: d.slice(p)
                }),
                i = 0; i < v.length && !n.isPropagationStopped(); i++)
                    for (l = v[i],
                    n.currentTarget = l.elem,
                    r = 0; r < l.matches.length && !n.isImmediatePropagationStopped(); r++)
                        c = l.matches[r],
                        (g || !n.namespace && !c.namespace || n.namespace_re && n.namespace_re.test(c.namespace)) && (n.data = c.data,
                        n.handleObj = c,
                        a = ((Z.event.special[c.origType] || {}).handle || c.handler).apply(l.elem, f),
                        a !== t && (n.result = a,
                        a === !1 && (n.preventDefault(),
                        n.stopPropagation())));
                return m.postDispatch && m.postDispatch.call(this, n),
                n.result
            }
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(e, t) {
                return null  == e.which && (e.which = null  != t.charCode ? t.charCode : t.keyCode),
                e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(e, n) {
                var i, r, s, a = n.button, o = n.fromElement;
                return null  == e.pageX && null  != n.clientX && (i = e.target.ownerDocument || $,
                r = i.documentElement,
                s = i.body,
                e.pageX = n.clientX + (r && r.scrollLeft || s && s.scrollLeft || 0) - (r && r.clientLeft || s && s.clientLeft || 0),
                e.pageY = n.clientY + (r && r.scrollTop || s && s.scrollTop || 0) - (r && r.clientTop || s && s.clientTop || 0)),
                !e.relatedTarget && o && (e.relatedTarget = o === e.target ? n.toElement : o),
                !e.which && a !== t && (e.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0),
                e
            }
        },
        fix: function(e) {
            if (e[Z.expando])
                return e;
            var t, n, i = e, r = Z.event.fixHooks[e.type] || {}, s = r.props ? this.props.concat(r.props) : this.props;
            for (e = Z.Event(i),
            t = s.length; t; )
                n = s[--t],
                e[n] = i[n];
            return e.target || (e.target = i.srcElement || $),
            3 === e.target.nodeType && (e.target = e.target.parentNode),
            e.metaKey = !!e.metaKey,
            r.filter ? r.filter(e, i) : e
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                delegateType: "focusin"
            },
            blur: {
                delegateType: "focusout"
            },
            beforeunload: {
                setup: function(e, t, n) {
                    Z.isWindow(this) && (this.onbeforeunload = n)
                },
                teardown: function(e, t) {
                    this.onbeforeunload === t && (this.onbeforeunload = null )
                }
            }
        },
        simulate: function(e, t, n, i) {
            var r = Z.extend(new Z.Event, n, {
                type: e,
                isSimulated: !0,
                originalEvent: {}
            });
            i ? Z.event.trigger(r, null , t) : Z.event.dispatch.call(t, r),
            r.isDefaultPrevented() && n.preventDefault()
        }
    },
    Z.event.handle = Z.event.dispatch,
    Z.removeEvent = $.removeEventListener ? function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1)
    }
     : function(e, t, n) {
        var i = "on" + t;
        e.detachEvent && ("undefined" == typeof e[i] && (e[i] = null ),
        e.detachEvent(i, n))
    }
    ,
    Z.Event = function(e, t) {
        return this instanceof Z.Event ? (e && e.type ? (this.originalEvent = e,
        this.type = e.type,
        this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? a : s) : this.type = e,
        t && Z.extend(this, t),
        this.timeStamp = e && e.timeStamp || Z.now(),
        this[Z.expando] = !0,
        void 0) : new Z.Event(e,t)
    }
    ,
    Z.Event.prototype = {
        preventDefault: function() {
            this.isDefaultPrevented = a;
            var e = this.originalEvent;
            e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
        },
        stopPropagation: function() {
            this.isPropagationStopped = a;
            var e = this.originalEvent;
            e && (e.stopPropagation && e.stopPropagation(),
            e.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = a,
            this.stopPropagation()
        },
        isDefaultPrevented: s,
        isPropagationStopped: s,
        isImmediatePropagationStopped: s
    },
    Z.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(e, t) {
        Z.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, i = this, r = e.relatedTarget, s = e.handleObj;
                return s.selector,
                (!r || r !== i && !Z.contains(i, r)) && (e.type = s.origType,
                n = s.handler.apply(this, arguments),
                e.type = t),
                n
            }
        }
    }),
    Z.support.submitBubbles || (Z.event.special.submit = {
        setup: function() {
            return Z.nodeName(this, "form") ? !1 : (Z.event.add(this, "click._submit keypress._submit", function(e) {
                var n = e.target
                  , i = Z.nodeName(n, "input") || Z.nodeName(n, "button") ? n.form : t;
                i && !Z._data(i, "_submit_attached") && (Z.event.add(i, "submit._submit", function(e) {
                    e._submit_bubble = !0
                }),
                Z._data(i, "_submit_attached", !0))
            }),
            void 0)
        },
        postDispatch: function(e) {
            e._submit_bubble && (delete e._submit_bubble,
            this.parentNode && !e.isTrigger && Z.event.simulate("submit", this.parentNode, e, !0))
        },
        teardown: function() {
            return Z.nodeName(this, "form") ? !1 : (Z.event.remove(this, "._submit"),
            void 0)
        }
    }),
    Z.support.changeBubbles || (Z.event.special.change = {
        setup: function() {
            return At.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (Z.event.add(this, "propertychange._change", function(e) {
                "checked" === e.originalEvent.propertyName && (this._just_changed = !0)
            }),
            Z.event.add(this, "click._change", function(e) {
                this._just_changed && !e.isTrigger && (this._just_changed = !1),
                Z.event.simulate("change", this, e, !0)
            })),
            !1) : (Z.event.add(this, "beforeactivate._change", function(e) {
                var t = e.target;
                At.test(t.nodeName) && !Z._data(t, "_change_attached") && (Z.event.add(t, "change._change", function(e) {
                    this.parentNode && !e.isSimulated && !e.isTrigger && Z.event.simulate("change", this.parentNode, e, !0)
                }),
                Z._data(t, "_change_attached", !0))
            }),
            void 0)
        },
        handle: function(e) {
            var t = e.target;
            return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0
        },
        teardown: function() {
            return Z.event.remove(this, "._change"),
            !At.test(this.nodeName)
        }
    }),
    Z.support.focusinBubbles || Z.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        var n = 0
          , i = function(e) {
            Z.event.simulate(t, e.target, Z.event.fix(e), !0)
        }
        ;
        Z.event.special[t] = {
            setup: function() {
                0 === n++ && $.addEventListener(e, i, !0)
            },
            teardown: function() {
                0 === --n && $.removeEventListener(e, i, !0)
            }
        }
    }),
    Z.fn.extend({
        on: function(e, n, i, r, a) {
            var o, l;
            if ("object" == typeof e) {
                "string" != typeof n && (i = i || n,
                n = t);
                for (l in e)
                    this.on(l, n, i, e[l], a);
                return this
            }
            if (null  == i && null  == r ? (r = n,
            i = n = t) : null  == r && ("string" == typeof n ? (r = i,
            i = t) : (r = i,
            i = n,
            n = t)),
            r === !1)
                r = s;
            else if (!r)
                return this;
            return 1 === a && (o = r,
            r = function(e) {
                return Z().off(e),
                o.apply(this, arguments)
            }
            ,
            r.guid = o.guid || (o.guid = Z.guid++)),
            this.each(function() {
                Z.event.add(this, e, r, i, n)
            })
        },
        one: function(e, t, n, i) {
            return this.on(e, t, n, i, 1)
        },
        off: function(e, n, i) {
            var r, a;
            if (e && e.preventDefault && e.handleObj)
                return r = e.handleObj,
                Z(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler),
                this;
            if ("object" == typeof e) {
                for (a in e)
                    this.off(a, n, e[a]);
                return this
            }
            return (n === !1 || "function" == typeof n) && (i = n,
            n = t),
            i === !1 && (i = s),
            this.each(function() {
                Z.event.remove(this, e, i, n)
            })
        },
        bind: function(e, t, n) {
            return this.on(e, null , t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null , t)
        },
        live: function(e, t, n) {
            return Z(this.context).on(e, this.selector, t, n),
            this
        },
        die: function(e, t) {
            return Z(this.context).off(e, this.selector || "**", t),
            this
        },
        delegate: function(e, t, n, i) {
            return this.on(t, e, n, i)
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        },
        trigger: function(e, t) {
            return this.each(function() {
                Z.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            return this[0] ? Z.event.trigger(e, t, this[0], !0) : void 0
        },
        toggle: function(e) {
            var t = arguments
              , n = e.guid || Z.guid++
              , i = 0
              , r = function(n) {
                var r = (Z._data(this, "lastToggle" + e.guid) || 0) % i;
                return Z._data(this, "lastToggle" + e.guid, r + 1),
                n.preventDefault(),
                t[r].apply(this, arguments) || !1
            }
            ;
            for (r.guid = n; i < t.length; )
                t[i++].guid = n;
            return this.click(r)
        },
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    }),
    Z.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
        Z.fn[t] = function(e, n) {
            return null  == n && (n = e,
            e = null ),
            arguments.length > 0 ? this.on(t, null , e, n) : this.trigger(t)
        }
        ,
        Ot.test(t) && (Z.event.fixHooks[t] = Z.event.keyHooks),
        Mt.test(t) && (Z.event.fixHooks[t] = Z.event.mouseHooks)
    }),
    function(e, t) {
        function n(e, t, n, i) {
            n = n || [],
            t = t || M;
            var r, s, a, o, l = t.nodeType;
            if (!e || "string" != typeof e)
                return n;
            if (1 !== l && 9 !== l)
                return [];
            if (a = w(t),
            !a && !i && (r = nt.exec(e)))
                if (o = r[1]) {
                    if (9 === l) {
                        if (s = t.getElementById(o),
                        !s || !s.parentNode)
                            return n;
                        if (s.id === o)
                            return n.push(s),
                            n
                    } else if (t.ownerDocument && (s = t.ownerDocument.getElementById(o)) && x(t, s) && s.id === o)
                        return n.push(s),
                        n
                } else {
                    if (r[2])
                        return L.apply(n, R.call(t.getElementsByTagName(e), 0)),
                        n;
                    if ((o = r[3]) && dt && t.getElementsByClassName)
                        return L.apply(n, R.call(t.getElementsByClassName(o), 0)),
                        n
                }
            return g(e.replace(J, "$1"), t, n, i, a)
        }
        function i(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return "input" === n && t.type === e
            }
        }
        function r(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }
        function s(e) {
            return B(function(t) {
                return t = +t,
                B(function(n, i) {
                    for (var r, s = e([], n.length, t), a = s.length; a--; )
                        n[r = s[a]] && (n[r] = !(i[r] = n[r]))
                })
            })
        }
        function a(e, t, n) {
            if (e === t)
                return n;
            for (var i = e.nextSibling; i; ) {
                if (i === t)
                    return -1;
                i = i.nextSibling
            }
            return 1
        }
        function o(e, t) {
            var i, r, s, a, o, l, u, c = q[j][e + " "];
            if (c)
                return t ? 0 : c.slice(0);
            for (o = e,
            l = [],
            u = y.preFilter; o; ) {
                (!i || (r = K.exec(o))) && (r && (o = o.slice(r[0].length) || o),
                l.push(s = [])),
                i = !1,
                (r = et.exec(o)) && (s.push(i = new O(r.shift())),
                o = o.slice(i.length),
                i.type = r[0].replace(J, " "));
                for (a in y.filter)
                    (r = ot[a].exec(o)) && (!u[a] || (r = u[a](r))) && (s.push(i = new O(r.shift())),
                    o = o.slice(i.length),
                    i.type = a,
                    i.matches = r);
                if (!i)
                    break
            }
            return t ? o.length : o ? n.error(e) : q(e, l).slice(0)
        }
        function l(e, t, n) {
            var i = t.dir
              , r = n && "parentNode" === t.dir
              , s = N++;
            return t.first ? function(t, n, s) {
                for (; t = t[i]; )
                    if (r || 1 === t.nodeType)
                        return e(t, n, s)
            }
             : function(t, n, a) {
                if (a) {
                    for (; t = t[i]; )
                        if ((r || 1 === t.nodeType) && e(t, n, a))
                            return t
                } else
                    for (var o, l = D + " " + s + " ", u = l + v; t = t[i]; )
                        if (r || 1 === t.nodeType) {
                            if ((o = t[j]) === u)
                                return t.sizset;
                            if ("string" == typeof o && 0 === o.indexOf(l)) {
                                if (t.sizset)
                                    return t
                            } else {
                                if (t[j] = u,
                                e(t, n, a))
                                    return t.sizset = !0,
                                    t;
                                t.sizset = !1
                            }
                        }
            }
        }
        function u(e) {
            return e.length > 1 ? function(t, n, i) {
                for (var r = e.length; r--; )
                    if (!e[r](t, n, i))
                        return !1;
                return !0
            }
             : e[0]
        }
        function c(e, t, n, i, r) {
            for (var s, a = [], o = 0, l = e.length, u = null  != t; l > o; o++)
                (s = e[o]) && (!n || n(s, i, r)) && (a.push(s),
                u && t.push(o));
            return a
        }
        function h(e, t, n, i, r, s) {
            return i && !i[j] && (i = h(i)),
            r && !r[j] && (r = h(r, s)),
            B(function(s, a, o, l) {
                var u, h, d, p = [], g = [], m = a.length, v = s || f(t || "*", o.nodeType ? [o] : o, []), _ = !e || !s && t ? v : c(v, p, e, o, l), y = n ? r || (s ? e : m || i) ? [] : a : _;
                if (n && n(_, y, o, l),
                i)
                    for (u = c(y, g),
                    i(u, [], o, l),
                    h = u.length; h--; )
                        (d = u[h]) && (y[g[h]] = !(_[g[h]] = d));
                if (s) {
                    if (r || e) {
                        if (r) {
                            for (u = [],
                            h = y.length; h--; )
                                (d = y[h]) && u.push(_[h] = d);
                            r(null , y = [], u, l)
                        }
                        for (h = y.length; h--; )
                            (d = y[h]) && (u = r ? V.call(s, d) : p[h]) > -1 && (s[u] = !(a[u] = d))
                    }
                } else
                    y = c(y === a ? y.splice(m, y.length) : y),
                    r ? r(null , a, y, l) : L.apply(a, y)
            })
        }
        function d(e) {
            for (var t, n, i, r = e.length, s = y.relative[e[0].type], a = s || y.relative[" "], o = s ? 1 : 0, c = l(function(e) {
                return e === t
            }, a, !0), p = l(function(e) {
                return V.call(t, e) > -1
            }, a, !0), f = [function(e, n, i) {
                return !s && (i || n !== k) || ((t = n).nodeType ? c(e, n, i) : p(e, n, i))
            }
            ]; r > o; o++)
                if (n = y.relative[e[o].type])
                    f = [l(u(f), n)];
                else {
                    if (n = y.filter[e[o].type].apply(null , e[o].matches),
                    n[j]) {
                        for (i = ++o; r > i && !y.relative[e[i].type]; i++)
                            ;
                        return h(o > 1 && u(f), o > 1 && e.slice(0, o - 1).join("").replace(J, "$1"), n, i > o && d(e.slice(o, i)), r > i && d(e = e.slice(i)), r > i && e.join(""))
                    }
                    f.push(n)
                }
            return u(f)
        }
        function p(e, t) {
            var i = t.length > 0
              , r = e.length > 0
              , s = function(a, o, l, u, h) {
                var d, p, f, g = [], m = 0, _ = "0", b = a && [], w = null  != h, x = k, T = a || r && y.find.TAG("*", h && o.parentNode || o), P = D += null  == x ? 1 : Math.E;
                for (w && (k = o !== M && o,
                v = s.el); null  != (d = T[_]); _++) {
                    if (r && d) {
                        for (p = 0; f = e[p]; p++)
                            if (f(d, o, l)) {
                                u.push(d);
                                break
                            }
                        w && (D = P,
                        v = ++s.el)
                    }
                    i && ((d = !f && d) && m--,
                    a && b.push(d))
                }
                if (m += _,
                i && _ !== m) {
                    for (p = 0; f = t[p]; p++)
                        f(b, g, o, l);
                    if (a) {
                        if (m > 0)
                            for (; _--; )
                                !b[_] && !g[_] && (g[_] = I.call(u));
                        g = c(g)
                    }
                    L.apply(u, g),
                    w && !a && g.length > 0 && m + t.length > 1 && n.uniqueSort(u)
                }
                return w && (D = P,
                k = x),
                b
            }
            ;
            return s.el = 0,
            i ? B(s) : s
        }
        function f(e, t, i) {
            for (var r = 0, s = t.length; s > r; r++)
                n(e, t[r], i);
            return i
        }
        function g(e, t, n, i, r) {
            var s, a, l, u, c, h = o(e);
            if (h.length,
            !i && 1 === h.length) {
                if (a = h[0] = h[0].slice(0),
                a.length > 2 && "ID" === (l = a[0]).type && 9 === t.nodeType && !r && y.relative[a[1].type]) {
                    if (t = y.find.ID(l.matches[0].replace(at, ""), t, r)[0],
                    !t)
                        return n;
                    e = e.slice(a.shift().length)
                }
                for (s = ot.POS.test(e) ? -1 : a.length - 1; s >= 0 && (l = a[s],
                !y.relative[u = l.type]); s--)
                    if ((c = y.find[u]) && (i = c(l.matches[0].replace(at, ""), it.test(a[0].type) && t.parentNode || t, r))) {
                        if (a.splice(s, 1),
                        e = i.length && a.join(""),
                        !e)
                            return L.apply(n, R.call(i, 0)),
                            n;
                        break
                    }
            }
            return T(e, h)(i, t, r, n, it.test(e)),
            n
        }
        function m() {}
        var v, _, y, b, w, x, T, P, S, k, A = !0, C = "undefined", j = ("sizcache" + Math.random()).replace(".", ""), O = String, M = e.document, E = M.documentElement, D = 0, N = 0, I = [].pop, L = [].push, R = [].slice, V = [].indexOf || function(e) {
            for (var t = 0, n = this.length; n > t; t++)
                if (this[t] === e)
                    return t;
            return -1
        }
        , B = function(e, t) {
            return e[j] = null  == t || t,
            e
        }
        , F = function() {
            var e = {}
              , t = [];
            return B(function(n, i) {
                return t.push(n) > y.cacheLength && delete e[t.shift()],
                e[n + " "] = i
            }, e)
        }
        , $ = F(), q = F(), z = F(), H = "[\\x20\\t\\r\\n\\f]", U = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+", G = U.replace("w", "w#"), X = "([*^$|!~]?=)", W = "\\[" + H + "*(" + U + ")" + H + "*(?:" + X + H + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + G + ")|)|)" + H + "*\\]", Y = ":(" + U + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + W + ")|[^:]|\\\\.)*|.*))\\)|)", Q = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + H + "*((?:-\\d)?\\d*)" + H + "*\\)|)(?=[^-]|$)", J = new RegExp("^" + H + "+|((?:^|[^\\\\])(?:\\\\.)*)" + H + "+$","g"), K = new RegExp("^" + H + "*," + H + "*"), et = new RegExp("^" + H + "*([\\x20\\t\\r\\n\\f>+~])" + H + "*"), tt = new RegExp(Y), nt = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/, it = /[\x20\t\r\n\f]*[+~]/, rt = /h\d/i, st = /input|select|textarea|button/i, at = /\\(?!\\)/g, ot = {
            ID: new RegExp("^#(" + U + ")"),
            CLASS: new RegExp("^\\.(" + U + ")"),
            NAME: new RegExp("^\\[name=['\"]?(" + U + ")['\"]?\\]"),
            TAG: new RegExp("^(" + U.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + W),
            PSEUDO: new RegExp("^" + Y),
            POS: new RegExp(Q,"i"),
            CHILD: new RegExp("^:(only|nth|first|last)-child(?:\\(" + H + "*(even|odd|(([+-]|)(\\d*)n|)" + H + "*(?:([+-]|)" + H + "*(\\d+)|))" + H + "*\\)|)","i"),
            needsContext: new RegExp("^" + H + "*[>+~]|" + Q,"i")
        }, lt = function(e) {
            var t = M.createElement("div");
            try {
                return e(t)
            } catch (n) {
                return !1
            } finally {
                t = null 
            }
        }
        , ut = lt(function(e) {
            return e.appendChild(M.createComment("")),
            !e.getElementsByTagName("*").length
        }), ct = lt(function(e) {
            return e.innerHTML = "<a href='#'></a>",
            e.firstChild && typeof e.firstChild.getAttribute !== C && "#" === e.firstChild.getAttribute("href")
        }), ht = lt(function(e) {
            e.innerHTML = "<select></select>";
            var t = typeof e.lastChild.getAttribute("multiple");
            return "boolean" !== t && "string" !== t
        }), dt = lt(function(e) {
            return e.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>",
            e.getElementsByClassName && e.getElementsByClassName("e").length ? (e.lastChild.className = "e",
            2 === e.getElementsByClassName("e").length) : !1
        }), pt = lt(function(e) {
            e.id = j + 0,
            e.innerHTML = "<a name='" + j + "'></a><div name='" + j + "'></div>",
            E.insertBefore(e, E.firstChild);
            var t = M.getElementsByName && M.getElementsByName(j).length === 2 + M.getElementsByName(j + 0).length;
            return _ = !M.getElementById(j),
            E.removeChild(e),
            t
        });
        try {
            R.call(E.childNodes, 0)[0].nodeType
        } catch (ft) {
            R = function(e) {
                for (var t, n = []; t = this[e]; e++)
                    n.push(t);
                return n
            }
        }
        n.matches = function(e, t) {
            return n(e, null , null , t)
        }
        ,
        n.matchesSelector = function(e, t) {
            return n(t, null , null , [e]).length > 0
        }
        ,
        b = n.getText = function(e) {
            var t, n = "", i = 0, r = e.nodeType;
            if (r) {
                if (1 === r || 9 === r || 11 === r) {
                    if ("string" == typeof e.textContent)
                        return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling)
                        n += b(e)
                } else if (3 === r || 4 === r)
                    return e.nodeValue
            } else
                for (; t = e[i]; i++)
                    n += b(t);
            return n
        }
        ,
        w = n.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? "HTML" !== t.nodeName : !1
        }
        ,
        x = n.contains = E.contains ? function(e, t) {
            var n = 9 === e.nodeType ? e.documentElement : e
              , i = t && t.parentNode;
            return e === i || !!(i && 1 === i.nodeType && n.contains && n.contains(i))
        }
         : E.compareDocumentPosition ? function(e, t) {
            return t && !!(16 & e.compareDocumentPosition(t))
        }
         : function(e, t) {
            for (; t = t.parentNode; )
                if (t === e)
                    return !0;
            return !1
        }
        ,
        n.attr = function(e, t) {
            var n, i = w(e);
            return i || (t = t.toLowerCase()),
            (n = y.attrHandle[t]) ? n(e) : i || ht ? e.getAttribute(t) : (n = e.getAttributeNode(t),
            n ? "boolean" == typeof e[t] ? e[t] ? t : null  : n.specified ? n.value : null  : null )
        }
        ,
        y = n.selectors = {
            cacheLength: 50,
            createPseudo: B,
            match: ot,
            attrHandle: ct ? {} : {
                href: function(e) {
                    return e.getAttribute("href", 2)
                },
                type: function(e) {
                    return e.getAttribute("type")
                }
            },
            find: {
                ID: _ ? function(e, t, n) {
                    if (typeof t.getElementById !== C && !n) {
                        var i = t.getElementById(e);
                        return i && i.parentNode ? [i] : []
                    }
                }
                 : function(e, n, i) {
                    if (typeof n.getElementById !== C && !i) {
                        var r = n.getElementById(e);
                        return r ? r.id === e || typeof r.getAttributeNode !== C && r.getAttributeNode("id").value === e ? [r] : t : []
                    }
                }
                ,
                TAG: ut ? function(e, t) {
                    return typeof t.getElementsByTagName !== C ? t.getElementsByTagName(e) : void 0
                }
                 : function(e, t) {
                    var n = t.getElementsByTagName(e);
                    if ("*" === e) {
                        for (var i, r = [], s = 0; i = n[s]; s++)
                            1 === i.nodeType && r.push(i);
                        return r
                    }
                    return n
                }
                ,
                NAME: pt && function(e, t) {
                    return typeof t.getElementsByName !== C ? t.getElementsByName(name) : void 0
                }
                ,
                CLASS: dt && function(e, t, n) {
                    return typeof t.getElementsByClassName === C || n ? void 0 : t.getElementsByClassName(e)
                }
            },
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(at, ""),
                    e[3] = (e[4] || e[5] || "").replace(at, ""),
                    "~=" === e[2] && (e[3] = " " + e[3] + " "),
                    e.slice(0, 4)
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(),
                    "nth" === e[1] ? (e[2] || n.error(e[0]),
                    e[3] = +(e[3] ? e[4] + (e[5] || 1) : 2 * ("even" === e[2] || "odd" === e[2])),
                    e[4] = +(e[6] + e[7] || "odd" === e[2])) : e[2] && n.error(e[0]),
                    e
                },
                PSEUDO: function(e) {
                    var t, n;
                    return ot.CHILD.test(e[0]) ? null  : (e[3] ? e[2] = e[3] : (t = e[4]) && (tt.test(t) && (n = o(t, !0)) && (n = t.indexOf(")", t.length - n) - t.length) && (t = t.slice(0, n),
                    e[0] = e[0].slice(0, n)),
                    e[2] = t),
                    e.slice(0, 3))
                }
            },
            filter: {
                ID: _ ? function(e) {
                    return e = e.replace(at, ""),
                    function(t) {
                        return t.getAttribute("id") === e
                    }
                }
                 : function(e) {
                    return e = e.replace(at, ""),
                    function(t) {
                        var n = typeof t.getAttributeNode !== C && t.getAttributeNode("id");
                        return n && n.value === e
                    }
                }
                ,
                TAG: function(e) {
                    return "*" === e ? function() {
                        return !0
                    }
                     : (e = e.replace(at, "").toLowerCase(),
                    function(t) {
                        return t.nodeName && t.nodeName.toLowerCase() === e
                    }
                    )
                },
                CLASS: function(e) {
                    var t = $[j][e + " "];
                    return t || (t = new RegExp("(^|" + H + ")" + e + "(" + H + "|$)")) && $(e, function(e) {
                        return t.test(e.className || typeof e.getAttribute !== C && e.getAttribute("class") || "")
                    })
                },
                ATTR: function(e, t, i) {
                    return function(r) {
                        var s = n.attr(r, e);
                        return null  == s ? "!=" === t : t ? (s += "",
                        "=" === t ? s === i : "!=" === t ? s !== i : "^=" === t ? i && 0 === s.indexOf(i) : "*=" === t ? i && s.indexOf(i) > -1 : "$=" === t ? i && s.substr(s.length - i.length) === i : "~=" === t ? (" " + s + " ").indexOf(i) > -1 : "|=" === t ? s === i || s.substr(0, i.length + 1) === i + "-" : !1) : !0
                    }
                },
                CHILD: function(e, t, n, i) {
                    return "nth" === e ? function(e) {
                        var t, r, s = e.parentNode;
                        if (1 === n && 0 === i)
                            return !0;
                        if (s)
                            for (r = 0,
                            t = s.firstChild; t && (1 !== t.nodeType || (r++,
                            e !== t)); t = t.nextSibling)
                                ;
                        return r -= i,
                        r === n || 0 === r % n && r / n >= 0
                    }
                     : function(t) {
                        var n = t;
                        switch (e) {
                        case "only":
                        case "first":
                            for (; n = n.previousSibling; )
                                if (1 === n.nodeType)
                                    return !1;
                            if ("first" === e)
                                return !0;
                            n = t;
                        case "last":
                            for (; n = n.nextSibling; )
                                if (1 === n.nodeType)
                                    return !1;
                            return !0
                        }
                    }
                },
                PSEUDO: function(e, t) {
                    var i, r = y.pseudos[e] || y.setFilters[e.toLowerCase()] || n.error("unsupported pseudo: " + e);
                    return r[j] ? r(t) : r.length > 1 ? (i = [e, e, "", t],
                    y.setFilters.hasOwnProperty(e.toLowerCase()) ? B(function(e, n) {
                        for (var i, s = r(e, t), a = s.length; a--; )
                            i = V.call(e, s[a]),
                            e[i] = !(n[i] = s[a])
                    }) : function(e) {
                        return r(e, 0, i)
                    }
                    ) : r
                }
            },
            pseudos: {
                not: B(function(e) {
                    var t = []
                      , n = []
                      , i = T(e.replace(J, "$1"));
                    return i[j] ? B(function(e, t, n, r) {
                        for (var s, a = i(e, null , r, []), o = e.length; o--; )
                            (s = a[o]) && (e[o] = !(t[o] = s))
                    }) : function(e, r, s) {
                        return t[0] = e,
                        i(t, null , s, n),
                        !n.pop()
                    }
                }),
                has: B(function(e) {
                    return function(t) {
                        return n(e, t).length > 0
                    }
                }),
                contains: B(function(e) {
                    return function(t) {
                        return (t.textContent || t.innerText || b(t)).indexOf(e) > -1
                    }
                }),
                enabled: function(e) {
                    return e.disabled === !1
                },
                disabled: function(e) {
                    return e.disabled === !0
                },
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex,
                    e.selected === !0
                },
                parent: function(e) {
                    return !y.pseudos.empty(e)
                },
                empty: function(e) {
                    var t;
                    for (e = e.firstChild; e; ) {
                        if (e.nodeName > "@" || 3 === (t = e.nodeType) || 4 === t)
                            return !1;
                        e = e.nextSibling
                    }
                    return !0
                },
                header: function(e) {
                    return rt.test(e.nodeName)
                },
                text: function(e) {
                    var t, n;
                    return "input" === e.nodeName.toLowerCase() && "text" === (t = e.type) && (null  == (n = e.getAttribute("type")) || n.toLowerCase() === t)
                },
                radio: i("radio"),
                checkbox: i("checkbox"),
                file: i("file"),
                password: i("password"),
                image: i("image"),
                submit: r("submit"),
                reset: r("reset"),
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                },
                input: function(e) {
                    return st.test(e.nodeName)
                },
                focus: function(e) {
                    var t = e.ownerDocument;
                    return e === t.activeElement && (!t.hasFocus || t.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                },
                active: function(e) {
                    return e === e.ownerDocument.activeElement
                },
                first: s(function() {
                    return [0]
                }),
                last: s(function(e, t) {
                    return [t - 1]
                }),
                eq: s(function(e, t, n) {
                    return [0 > n ? n + t : n]
                }),
                even: s(function(e, t) {
                    for (var n = 0; t > n; n += 2)
                        e.push(n);
                    return e
                }),
                odd: s(function(e, t) {
                    for (var n = 1; t > n; n += 2)
                        e.push(n);
                    return e
                }),
                lt: s(function(e, t, n) {
                    for (var i = 0 > n ? n + t : n; --i >= 0; )
                        e.push(i);
                    return e
                }),
                gt: s(function(e, t, n) {
                    for (var i = 0 > n ? n + t : n; ++i < t; )
                        e.push(i);
                    return e
                })
            }
        },
        P = E.compareDocumentPosition ? function(e, t) {
            return e === t ? (S = !0,
            0) : (e.compareDocumentPosition && t.compareDocumentPosition ? 4 & e.compareDocumentPosition(t) : e.compareDocumentPosition) ? -1 : 1
        }
         : function(e, t) {
            if (e === t)
                return S = !0,
                0;
            if (e.sourceIndex && t.sourceIndex)
                return e.sourceIndex - t.sourceIndex;
            var n, i, r = [], s = [], o = e.parentNode, l = t.parentNode, u = o;
            if (o === l)
                return a(e, t);
            if (!o)
                return -1;
            if (!l)
                return 1;
            for (; u; )
                r.unshift(u),
                u = u.parentNode;
            for (u = l; u; )
                s.unshift(u),
                u = u.parentNode;
            n = r.length,
            i = s.length;
            for (var c = 0; n > c && i > c; c++)
                if (r[c] !== s[c])
                    return a(r[c], s[c]);
            return c === n ? a(e, s[c], -1) : a(r[c], t, 1)
        }
        ,
        [0, 0].sort(P),
        A = !S,
        n.uniqueSort = function(e) {
            var t, n = [], i = 1, r = 0;
            if (S = A,
            e.sort(P),
            S) {
                for (; t = e[i]; i++)
                    t === e[i - 1] && (r = n.push(i));
                for (; r--; )
                    e.splice(n[r], 1)
            }
            return e
        }
        ,
        n.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }
        ,
        T = n.compile = function(e, t) {
            var n, i = [], r = [], s = z[j][e + " "];
            if (!s) {
                for (t || (t = o(e)),
                n = t.length; n--; )
                    s = d(t[n]),
                    s[j] ? i.push(s) : r.push(s);
                s = z(e, p(r, i))
            }
            return s
        }
        ,
        M.querySelectorAll && function() {
            var e, t = g, i = /'|\\/g, r = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g, s = [":focus"], a = [":active"], l = E.matchesSelector || E.mozMatchesSelector || E.webkitMatchesSelector || E.oMatchesSelector || E.msMatchesSelector;
            lt(function(e) {
                e.innerHTML = "<select><option selected=''></option></select>",
                e.querySelectorAll("[selected]").length || s.push("\\[" + H + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),
                e.querySelectorAll(":checked").length || s.push(":checked")
            }),
            lt(function(e) {
                e.innerHTML = "<p test=''></p>",
                e.querySelectorAll("[test^='']").length && s.push("[*^$]=" + H + "*(?:\"\"|'')"),
                e.innerHTML = "<input type='hidden'/>",
                e.querySelectorAll(":enabled").length || s.push(":enabled", ":disabled")
            }),
            s = new RegExp(s.join("|")),
            g = function(e, n, r, a, l) {
                if (!a && !l && !s.test(e)) {
                    var u, c, h = !0, d = j, p = n, f = 9 === n.nodeType && e;
                    if (1 === n.nodeType && "object" !== n.nodeName.toLowerCase()) {
                        for (u = o(e),
                        (h = n.getAttribute("id")) ? d = h.replace(i, "\\$&") : n.setAttribute("id", d),
                        d = "[id='" + d + "'] ",
                        c = u.length; c--; )
                            u[c] = d + u[c].join("");
                        p = it.test(e) && n.parentNode || n,
                        f = u.join(",")
                    }
                    if (f)
                        try {
                            return L.apply(r, R.call(p.querySelectorAll(f), 0)),
                            r
                        } catch (g) {} finally {
                            h || n.removeAttribute("id")
                        }
                }
                return t(e, n, r, a, l)
            }
            ,
            l && (lt(function(t) {
                e = l.call(t, "div");
                try {
                    l.call(t, "[test!='']:sizzle"),
                    a.push("!=", Y)
                } catch (n) {}
            }),
            a = new RegExp(a.join("|")),
            n.matchesSelector = function(t, i) {
                if (i = i.replace(r, "='$1']"),
                !w(t) && !a.test(i) && !s.test(i))
                    try {
                        var o = l.call(t, i);
                        if (o || e || t.document && 11 !== t.document.nodeType)
                            return o
                    } catch (u) {}
                return n(i, null , null , [t]).length > 0
            }
            )
        }(),
        y.pseudos.nth = y.pseudos.eq,
        y.filters = m.prototype = y.pseudos,
        y.setFilters = new m,
        n.attr = Z.attr,
        Z.find = n,
        Z.expr = n.selectors,
        Z.expr[":"] = Z.expr.pseudos,
        Z.unique = n.uniqueSort,
        Z.text = n.getText,
        Z.isXMLDoc = n.isXML,
        Z.contains = n.contains
    }(e);
    var Nt = /Until$/
      , It = /^(?:parents|prev(?:Until|All))/
      , Lt = /^.[^:#\[\.,]*$/
      , Rt = Z.expr.match.needsContext
      , Vt = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    Z.fn.extend({
        find: function(e) {
            var t, n, i, r, s, a, o = this;
            if ("string" != typeof e)
                return Z(e).filter(function() {
                    for (t = 0,
                    n = o.length; n > t; t++)
                        if (Z.contains(o[t], this))
                            return !0
                });
            for (a = this.pushStack("", "find", e),
            t = 0,
            n = this.length; n > t; t++)
                if (i = a.length,
                Z.find(e, this[t], a),
                t > 0)
                    for (r = i; r < a.length; r++)
                        for (s = 0; i > s; s++)
                            if (a[s] === a[r]) {
                                a.splice(r--, 1);
                                break
                            }
            return a
        },
        has: function(e) {
            var t, n = Z(e, this), i = n.length;
            return this.filter(function() {
                for (t = 0; i > t; t++)
                    if (Z.contains(this, n[t]))
                        return !0
            })
        },
        not: function(e) {
            return this.pushStack(u(this, e, !1), "not", e)
        },
        filter: function(e) {
            return this.pushStack(u(this, e, !0), "filter", e)
        },
        is: function(e) {
            return !!e && ("string" == typeof e ? Rt.test(e) ? Z(e, this.context).index(this[0]) >= 0 : Z.filter(e, this).length > 0 : this.filter(e).length > 0)
        },
        closest: function(e, t) {
            for (var n, i = 0, r = this.length, s = [], a = Rt.test(e) || "string" != typeof e ? Z(e, t || this.context) : 0; r > i; i++)
                for (n = this[i]; n && n.ownerDocument && n !== t && 11 !== n.nodeType; ) {
                    if (a ? a.index(n) > -1 : Z.find.matchesSelector(n, e)) {
                        s.push(n);
                        break
                    }
                    n = n.parentNode
                }
            return s = s.length > 1 ? Z.unique(s) : s,
            this.pushStack(s, "closest", e)
        },
        index: function(e) {
            return e ? "string" == typeof e ? Z.inArray(this[0], Z(e)) : Z.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
        },
        add: function(e, t) {
            var n = "string" == typeof e ? Z(e, t) : Z.makeArray(e && e.nodeType ? [e] : e)
              , i = Z.merge(this.get(), n);
            return this.pushStack(o(n[0]) || o(i[0]) ? i : Z.unique(i))
        },
        addBack: function(e) {
            return this.add(null  == e ? this.prevObject : this.prevObject.filter(e))
        }
    }),
    Z.fn.andSelf = Z.fn.addBack,
    Z.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null 
        },
        parents: function(e) {
            return Z.dir(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return Z.dir(e, "parentNode", n)
        },
        next: function(e) {
            return l(e, "nextSibling")
        },
        prev: function(e) {
            return l(e, "previousSibling")
        },
        nextAll: function(e) {
            return Z.dir(e, "nextSibling")
        },
        prevAll: function(e) {
            return Z.dir(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return Z.dir(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return Z.dir(e, "previousSibling", n)
        },
        siblings: function(e) {
            return Z.sibling((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return Z.sibling(e.firstChild)
        },
        contents: function(e) {
            return Z.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : Z.merge([], e.childNodes)
        }
    }, function(e, t) {
        Z.fn[e] = function(n, i) {
            var r = Z.map(this, t, n);
            return Nt.test(e) || (i = n),
            i && "string" == typeof i && (r = Z.filter(i, r)),
            r = this.length > 1 && !Vt[e] ? Z.unique(r) : r,
            this.length > 1 && It.test(e) && (r = r.reverse()),
            this.pushStack(r, e, X.call(arguments).join(","))
        }
    }),
    Z.extend({
        filter: function(e, t, n) {
            return n && (e = ":not(" + e + ")"),
            1 === t.length ? Z.find.matchesSelector(t[0], e) ? [t[0]] : [] : Z.find.matches(e, t)
        },
        dir: function(e, n, i) {
            for (var r = [], s = e[n]; s && 9 !== s.nodeType && (i === t || 1 !== s.nodeType || !Z(s).is(i)); )
                1 === s.nodeType && r.push(s),
                s = s[n];
            return r
        },
        sibling: function(e, t) {
            for (var n = []; e; e = e.nextSibling)
                1 === e.nodeType && e !== t && n.push(e);
            return n
        }
    });
    var Bt = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video"
      , Ft = / jQuery\d+="(?:null|\d+)"/g
      , $t = /^\s+/
      , qt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi
      , zt = /<([\w:]+)/
      , Ht = /<tbody/i
      , Ut = /<|&#?\w+;/
      , Gt = /<(?:script|style|link)/i
      , Xt = /<(?:script|object|embed|option|style)/i
      , Wt = new RegExp("<(?:" + Bt + ")[\\s/>]","i")
      , Yt = /^(?:checkbox|radio)$/
      , Qt = /checked\s*(?:[^=]|=\s*.checked.)/i
      , Jt = /\/(java|ecma)script/i
      , Zt = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g
      , Kt = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        area: [1, "<map>", "</map>"],
        _default: [0, "", ""]
    }
      , en = c($)
      , tn = en.appendChild($.createElement("div"));
    Kt.optgroup = Kt.option,
    Kt.tbody = Kt.tfoot = Kt.colgroup = Kt.caption = Kt.thead,
    Kt.th = Kt.td,
    Z.support.htmlSerialize || (Kt._default = [1, "X<div>", "</div>"]),
    Z.fn.extend({
        text: function(e) {
            return Z.access(this, function(e) {
                return e === t ? Z.text(this) : this.empty().append((this[0] && this[0].ownerDocument || $).createTextNode(e))
            }, null , e, arguments.length)
        },
        wrapAll: function(e) {
            if (Z.isFunction(e))
                return this.each(function(t) {
                    Z(this).wrapAll(e.call(this, t))
                });
            if (this[0]) {
                var t = Z(e, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && t.insertBefore(this[0]),
                t.map(function() {
                    for (var e = this; e.firstChild && 1 === e.firstChild.nodeType; )
                        e = e.firstChild;
                    return e
                }).append(this)
            }
            return this
        },
        wrapInner: function(e) {
            return Z.isFunction(e) ? this.each(function(t) {
                Z(this).wrapInner(e.call(this, t))
            }) : this.each(function() {
                var t = Z(this)
                  , n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },
        wrap: function(e) {
            var t = Z.isFunction(e);
            return this.each(function(n) {
                Z(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                Z.nodeName(this, "body") || Z(this).replaceWith(this.childNodes)
            }).end()
        },
        append: function() {
            return this.domManip(arguments, !0, function(e) {
                (1 === this.nodeType || 11 === this.nodeType) && this.appendChild(e)
            })
        },
        prepend: function() {
            return this.domManip(arguments, !0, function(e) {
                (1 === this.nodeType || 11 === this.nodeType) && this.insertBefore(e, this.firstChild)
            })
        },
        before: function() {
            if (!o(this[0]))
                return this.domManip(arguments, !1, function(e) {
                    this.parentNode.insertBefore(e, this)
                });
            if (arguments.length) {
                var e = Z.clean(arguments);
                return this.pushStack(Z.merge(e, this), "before", this.selector)
            }
        },
        after: function() {
            if (!o(this[0]))
                return this.domManip(arguments, !1, function(e) {
                    this.parentNode.insertBefore(e, this.nextSibling)
                });
            if (arguments.length) {
                var e = Z.clean(arguments);
                return this.pushStack(Z.merge(this, e), "after", this.selector)
            }
        },
        remove: function(e, t) {
            for (var n, i = 0; null  != (n = this[i]); i++)
                (!e || Z.filter(e, [n]).length) && (!t && 1 === n.nodeType && (Z.cleanData(n.getElementsByTagName("*")),
                Z.cleanData([n])),
                n.parentNode && n.parentNode.removeChild(n));
            return this
        },
        empty: function() {
            for (var e, t = 0; null  != (e = this[t]); t++)
                for (1 === e.nodeType && Z.cleanData(e.getElementsByTagName("*")); e.firstChild; )
                    e.removeChild(e.firstChild);
            return this
        },
        clone: function(e, t) {
            return e = null  == e ? !1 : e,
            t = null  == t ? e : t,
            this.map(function() {
                return Z.clone(this, e, t)
            })
        },
        html: function(e) {
            return Z.access(this, function(e) {
                var n = this[0] || {}
                  , i = 0
                  , r = this.length;
                if (e === t)
                    return 1 === n.nodeType ? n.innerHTML.replace(Ft, "") : t;
                if (!("string" != typeof e || Gt.test(e) || !Z.support.htmlSerialize && Wt.test(e) || !Z.support.leadingWhitespace && $t.test(e) || Kt[(zt.exec(e) || ["", ""])[1].toLowerCase()])) {
                    e = e.replace(qt, "<$1></$2>");
                    try {
                        for (; r > i; i++)
                            n = this[i] || {},
                            1 === n.nodeType && (Z.cleanData(n.getElementsByTagName("*")),
                            n.innerHTML = e);
                        n = 0
                    } catch (s) {}
                }
                n && this.empty().append(e)
            }, null , e, arguments.length)
        },
        replaceWith: function(e) {
            return o(this[0]) ? this.length ? this.pushStack(Z(Z.isFunction(e) ? e() : e), "replaceWith", e) : this : Z.isFunction(e) ? this.each(function(t) {
                var n = Z(this)
                  , i = n.html();
                n.replaceWith(e.call(this, t, i))
            }) : ("string" != typeof e && (e = Z(e).detach()),
            this.each(function() {
                var t = this.nextSibling
                  , n = this.parentNode;
                Z(this).remove(),
                t ? Z(t).before(e) : Z(n).append(e)
            }))
        },
        detach: function(e) {
            return this.remove(e, !0)
        },
        domManip: function(e, n, i) {
            e = [].concat.apply([], e);
            var r, s, a, o, l = 0, u = e[0], c = [], d = this.length;
            if (!Z.support.checkClone && d > 1 && "string" == typeof u && Qt.test(u))
                return this.each(function() {
                    Z(this).domManip(e, n, i)
                });
            if (Z.isFunction(u))
                return this.each(function(r) {
                    var s = Z(this);
                    e[0] = u.call(this, r, n ? s.html() : t),
                    s.domManip(e, n, i)
                });
            if (this[0]) {
                if (r = Z.buildFragment(e, this, c),
                a = r.fragment,
                s = a.firstChild,
                1 === a.childNodes.length && (a = s),
                s)
                    for (n = n && Z.nodeName(s, "tr"),
                    o = r.cacheable || d - 1; d > l; l++)
                        i.call(n && Z.nodeName(this[l], "table") ? h(this[l], "tbody") : this[l], l === o ? a : Z.clone(a, !0, !0));
                a = s = null ,
                c.length && Z.each(c, function(e, t) {
                    t.src ? Z.ajax ? Z.ajax({
                        url: t.src,
                        type: "GET",
                        dataType: "script",
                        async: !1,
                        global: !1,
                        "throws": !0
                    }) : Z.error("no ajax") : Z.globalEval((t.text || t.textContent || t.innerHTML || "").replace(Zt, "")),
                    t.parentNode && t.parentNode.removeChild(t)
                })
            }
            return this
        }
    }),
    Z.buildFragment = function(e, n, i) {
        var r, s, a, o = e[0];
        return n = n || $,
        n = !n.nodeType && n[0] || n,
        n = n.ownerDocument || n,
        1 === e.length && "string" == typeof o && o.length < 512 && n === $ && "<" === o.charAt(0) && !Xt.test(o) && (Z.support.checkClone || !Qt.test(o)) && (Z.support.html5Clone || !Wt.test(o)) && (s = !0,
        r = Z.fragments[o],
        a = r !== t),
        r || (r = n.createDocumentFragment(),
        Z.clean(e, n, r, i),
        s && (Z.fragments[o] = a && r)),
        {
            fragment: r,
            cacheable: s
        }
    }
    ,
    Z.fragments = {},
    Z.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        Z.fn[e] = function(n) {
            var i, r = 0, s = [], a = Z(n), o = a.length, l = 1 === this.length && this[0].parentNode;
            if ((null  == l || l && 11 === l.nodeType && 1 === l.childNodes.length) && 1 === o)
                return a[t](this[0]),
                this;
            for (; o > r; r++)
                i = (r > 0 ? this.clone(!0) : this).get(),
                Z(a[r])[t](i),
                s = s.concat(i);
            return this.pushStack(s, e, a.selector)
        }
    }),
    Z.extend({
        clone: function(e, t, n) {
            var i, r, s, a;
            if (Z.support.html5Clone || Z.isXMLDoc(e) || !Wt.test("<" + e.nodeName + ">") ? a = e.cloneNode(!0) : (tn.innerHTML = e.outerHTML,
            tn.removeChild(a = tn.firstChild)),
            !(Z.support.noCloneEvent && Z.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || Z.isXMLDoc(e)))
                for (p(e, a),
                i = f(e),
                r = f(a),
                s = 0; i[s]; ++s)
                    r[s] && p(i[s], r[s]);
            if (t && (d(e, a),
            n))
                for (i = f(e),
                r = f(a),
                s = 0; i[s]; ++s)
                    d(i[s], r[s]);
            return i = r = null ,
            a
        },
        clean: function(e, t, n, i) {
            var r, s, a, o, l, u, h, d, p, f, m, v = t === $ && en, _ = [];
            for (t && "undefined" != typeof t.createDocumentFragment || (t = $),
            r = 0; null  != (a = e[r]); r++)
                if ("number" == typeof a && (a += ""),
                a) {
                    if ("string" == typeof a)
                        if (Ut.test(a)) {
                            for (v = v || c(t),
                            h = t.createElement("div"),
                            v.appendChild(h),
                            a = a.replace(qt, "<$1></$2>"),
                            o = (zt.exec(a) || ["", ""])[1].toLowerCase(),
                            l = Kt[o] || Kt._default,
                            u = l[0],
                            h.innerHTML = l[1] + a + l[2]; u--; )
                                h = h.lastChild;
                            if (!Z.support.tbody)
                                for (d = Ht.test(a),
                                p = "table" !== o || d ? "<table>" !== l[1] || d ? [] : h.childNodes : h.firstChild && h.firstChild.childNodes,
                                s = p.length - 1; s >= 0; --s)
                                    Z.nodeName(p[s], "tbody") && !p[s].childNodes.length && p[s].parentNode.removeChild(p[s]);
                            !Z.support.leadingWhitespace && $t.test(a) && h.insertBefore(t.createTextNode($t.exec(a)[0]), h.firstChild),
                            a = h.childNodes,
                            h.parentNode.removeChild(h)
                        } else
                            a = t.createTextNode(a);
                    a.nodeType ? _.push(a) : Z.merge(_, a)
                }
            if (h && (a = h = v = null ),
            !Z.support.appendChecked)
                for (r = 0; null  != (a = _[r]); r++)
                    Z.nodeName(a, "input") ? g(a) : "undefined" != typeof a.getElementsByTagName && Z.grep(a.getElementsByTagName("input"), g);
            if (n)
                for (f = function(e) {
                    return !e.type || Jt.test(e.type) ? i ? i.push(e.parentNode ? e.parentNode.removeChild(e) : e) : n.appendChild(e) : void 0
                }
                ,
                r = 0; null  != (a = _[r]); r++)
                    Z.nodeName(a, "script") && f(a) || (n.appendChild(a),
                    "undefined" != typeof a.getElementsByTagName && (m = Z.grep(Z.merge([], a.getElementsByTagName("script")), f),
                    _.splice.apply(_, [r + 1, 0].concat(m)),
                    r += m.length));
            return _
        },
        cleanData: function(e, t) {
            for (var n, i, r, s, a = 0, o = Z.expando, l = Z.cache, u = Z.support.deleteExpando, c = Z.event.special; null  != (r = e[a]); a++)
                if ((t || Z.acceptData(r)) && (i = r[o],
                n = i && l[i])) {
                    if (n.events)
                        for (s in n.events)
                            c[s] ? Z.event.remove(r, s) : Z.removeEvent(r, s, n.handle);
                    l[i] && (delete l[i],
                    u ? delete r[o] : r.removeAttribute ? r.removeAttribute(o) : r[o] = null ,
                    Z.deletedIds.push(i))
                }
        }
    }),
    function() {
        var e, t;
        Z.uaMatch = function(e) {
            e = e.toLowerCase();
            var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
            return {
                browser: t[1] || "",
                version: t[2] || "0"
            }
        }
        ,
        e = Z.uaMatch(z.userAgent),
        t = {},
        e.browser && (t[e.browser] = !0,
        t.version = e.version),
        t.chrome ? t.webkit = !0 : t.webkit && (t.safari = !0),
        Z.browser = t,
        Z.sub = function() {
            function e(t, n) {
                return new e.fn.init(t,n)
            }
            Z.extend(!0, e, this),
            e.superclass = this,
            e.fn = e.prototype = this(),
            e.fn.constructor = e,
            e.sub = this.sub,
            e.fn.init = function(n, i) {
                return i && i instanceof Z && !(i instanceof e) && (i = e(i)),
                Z.fn.init.call(this, n, i, t)
            }
            ,
            e.fn.init.prototype = e.fn;
            var t = e($);
            return e
        }
    }();
    var nn, rn, sn, an = /alpha\([^)]*\)/i, on = /opacity=([^)]*)/, ln = /^(top|right|bottom|left)$/, un = /^(none|table(?!-c[ea]).+)/, cn = /^margin/, hn = new RegExp("^(" + K + ")(.*)$","i"), dn = new RegExp("^(" + K + ")(?!px)[a-z%]+$","i"), pn = new RegExp("^([-+])=(" + K + ")","i"), fn = {
        BODY: "block"
    }, gn = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, mn = {
        letterSpacing: 0,
        fontWeight: 400
    }, vn = ["Top", "Right", "Bottom", "Left"], _n = ["Webkit", "O", "Moz", "ms"], yn = Z.fn.toggle;
    Z.fn.extend({
        css: function(e, n) {
            return Z.access(this, function(e, n, i) {
                return i !== t ? Z.style(e, n, i) : Z.css(e, n)
            }, e, n, arguments.length > 1)
        },
        show: function() {
            return _(this, !0)
        },
        hide: function() {
            return _(this)
        },
        toggle: function(e, t) {
            var n = "boolean" == typeof e;
            return Z.isFunction(e) && Z.isFunction(t) ? yn.apply(this, arguments) : this.each(function() {
                (n ? e : v(this)) ? Z(this).show() : Z(this).hide()
            })
        }
    }),
    Z.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = nn(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": Z.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(e, n, i, r) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var s, a, o, l = Z.camelCase(n), u = e.style;
                if (n = Z.cssProps[l] || (Z.cssProps[l] = m(u, l)),
                o = Z.cssHooks[n] || Z.cssHooks[l],
                i === t)
                    return o && "get" in o && (s = o.get(e, !1, r)) !== t ? s : u[n];
                if (a = typeof i,
                "string" === a && (s = pn.exec(i)) && (i = (s[1] + 1) * s[2] + parseFloat(Z.css(e, n)),
                a = "number"),
                !(null  == i || "number" === a && isNaN(i) || ("number" === a && !Z.cssNumber[l] && (i += "px"),
                o && "set" in o && (i = o.set(e, i, r)) === t)))
                    try {
                        u[n] = i
                    } catch (c) {}
            }
        },
        css: function(e, n, i, r) {
            var s, a, o, l = Z.camelCase(n);
            return n = Z.cssProps[l] || (Z.cssProps[l] = m(e.style, l)),
            o = Z.cssHooks[n] || Z.cssHooks[l],
            o && "get" in o && (s = o.get(e, !0, r)),
            s === t && (s = nn(e, n)),
            "normal" === s && n in mn && (s = mn[n]),
            i || r !== t ? (a = parseFloat(s),
            i || Z.isNumeric(a) ? a || 0 : s) : s
        },
        swap: function(e, t, n) {
            var i, r, s = {};
            for (r in t)
                s[r] = e.style[r],
                e.style[r] = t[r];
            i = n.call(e);
            for (r in t)
                e.style[r] = s[r];
            return i
        }
    }),
    e.getComputedStyle ? nn = function(t, n) {
        var i, r, s, a, o = e.getComputedStyle(t, null ), l = t.style;
        return o && (i = o.getPropertyValue(n) || o[n],
        "" === i && !Z.contains(t.ownerDocument, t) && (i = Z.style(t, n)),
        dn.test(i) && cn.test(n) && (r = l.width,
        s = l.minWidth,
        a = l.maxWidth,
        l.minWidth = l.maxWidth = l.width = i,
        i = o.width,
        l.width = r,
        l.minWidth = s,
        l.maxWidth = a)),
        i
    }
     : $.documentElement.currentStyle && (nn = function(e, t) {
        var n, i, r = e.currentStyle && e.currentStyle[t], s = e.style;
        return null  == r && s && s[t] && (r = s[t]),
        dn.test(r) && !ln.test(t) && (n = s.left,
        i = e.runtimeStyle && e.runtimeStyle.left,
        i && (e.runtimeStyle.left = e.currentStyle.left),
        s.left = "fontSize" === t ? "1em" : r,
        r = s.pixelLeft + "px",
        s.left = n,
        i && (e.runtimeStyle.left = i)),
        "" === r ? "auto" : r
    }
    ),
    Z.each(["height", "width"], function(e, t) {
        Z.cssHooks[t] = {
            get: function(e, n, i) {
                return n ? 0 === e.offsetWidth && un.test(nn(e, "display")) ? Z.swap(e, gn, function() {
                    return w(e, t, i)
                }) : w(e, t, i) : void 0
            },
            set: function(e, n, i) {
                return y(e, n, i ? b(e, t, i, Z.support.boxSizing && "border-box" === Z.css(e, "boxSizing")) : 0)
            }
        }
    }),
    Z.support.opacity || (Z.cssHooks.opacity = {
        get: function(e, t) {
            return on.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
        },
        set: function(e, t) {
            var n = e.style
              , i = e.currentStyle
              , r = Z.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : ""
              , s = i && i.filter || n.filter || "";
            n.zoom = 1,
            t >= 1 && "" === Z.trim(s.replace(an, "")) && n.removeAttribute && (n.removeAttribute("filter"),
            i && !i.filter) || (n.filter = an.test(s) ? s.replace(an, r) : s + " " + r)
        }
    }),
    Z(function() {
        Z.support.reliableMarginRight || (Z.cssHooks.marginRight = {
            get: function(e, t) {
                return Z.swap(e, {
                    display: "inline-block"
                }, function() {
                    return t ? nn(e, "marginRight") : void 0
                })
            }
        }),
        !Z.support.pixelPosition && Z.fn.position && Z.each(["top", "left"], function(e, t) {
            Z.cssHooks[t] = {
                get: function(e, n) {
                    if (n) {
                        var i = nn(e, t);
                        return dn.test(i) ? Z(e).position()[t] + "px" : i
                    }
                }
            }
        })
    }),
    Z.expr && Z.expr.filters && (Z.expr.filters.hidden = function(e) {
        return 0 === e.offsetWidth && 0 === e.offsetHeight || !Z.support.reliableHiddenOffsets && "none" === (e.style && e.style.display || nn(e, "display"))
    }
    ,
    Z.expr.filters.visible = function(e) {
        return !Z.expr.filters.hidden(e)
    }
    ),
    Z.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        Z.cssHooks[e + t] = {
            expand: function(n) {
                var i, r = "string" == typeof n ? n.split(" ") : [n], s = {};
                for (i = 0; 4 > i; i++)
                    s[e + vn[i] + t] = r[i] || r[i - 2] || r[0];
                return s
            }
        },
        cn.test(e) || (Z.cssHooks[e + t].set = y)
    });
    var bn = /%20/g
      , wn = /\[\]$/
      , xn = /\r?\n/g
      , Tn = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i
      , Pn = /^(?:select|textarea)/i;
    Z.fn.extend({
        serialize: function() {
            return Z.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? Z.makeArray(this.elements) : this
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || Pn.test(this.nodeName) || Tn.test(this.type))
            }).map(function(e, t) {
                var n = Z(this).val();
                return null  == n ? null  : Z.isArray(n) ? Z.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(xn, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(xn, "\r\n")
                }
            }).get()
        }
    }),
    Z.param = function(e, n) {
        var i, r = [], s = function(e, t) {
            t = Z.isFunction(t) ? t() : null  == t ? "" : t,
            r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
        }
        ;
        if (n === t && (n = Z.ajaxSettings && Z.ajaxSettings.traditional),
        Z.isArray(e) || e.jquery && !Z.isPlainObject(e))
            Z.each(e, function() {
                s(this.name, this.value)
            });
        else
            for (i in e)
                T(i, e[i], n, s);
        return r.join("&").replace(bn, "+")
    }
    ;
    var Sn, kn, An = /#.*$/, Cn = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, jn = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, On = /^(?:GET|HEAD)$/, Mn = /^\/\//, En = /\?/, Dn = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, Nn = /([?&])_=[^&]*/, In = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, Ln = Z.fn.load, Rn = {}, Vn = {}, Bn = ["*/"] + ["*"];
    try {
        kn = q.href
    } catch (Fn) {
        kn = $.createElement("a"),
        kn.href = "",
        kn = kn.href
    }
    Sn = In.exec(kn.toLowerCase()) || [],
    Z.fn.load = function(e, n, i) {
        if ("string" != typeof e && Ln)
            return Ln.apply(this, arguments);
        if (!this.length)
            return this;
        var r, s, a, o = this, l = e.indexOf(" ");
        return l >= 0 && (r = e.slice(l, e.length),
        e = e.slice(0, l)),
        Z.isFunction(n) ? (i = n,
        n = t) : n && "object" == typeof n && (s = "POST"),
        Z.ajax({
            url: e,
            type: s,
            dataType: "html",
            data: n,
            complete: function(e, t) {
                i && o.each(i, a || [e.responseText, t, e])
            }
        }).done(function(e) {
            a = arguments,
            o.html(r ? Z("<div>").append(e.replace(Dn, "")).find(r) : e)
        }),
        this
    }
    ,
    Z.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(e, t) {
        Z.fn[t] = function(e) {
            return this.on(t, e)
        }
    }),
    Z.each(["get", "post"], function(e, n) {
        Z[n] = function(e, i, r, s) {
            return Z.isFunction(i) && (s = s || r,
            r = i,
            i = t),
            Z.ajax({
                type: n,
                url: e,
                data: i,
                success: r,
                dataType: s
            })
        }
    }),
    Z.extend({
        getScript: function(e, n) {
            return Z.get(e, t, n, "script")
        },
        getJSON: function(e, t, n) {
            return Z.get(e, t, n, "json")
        },
        ajaxSetup: function(e, t) {
            return t ? k(e, Z.ajaxSettings) : (t = e,
            e = Z.ajaxSettings),
            k(e, t),
            e
        },
        ajaxSettings: {
            url: kn,
            isLocal: jn.test(Sn[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": Bn
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
            converters: {
                "* text": e.String,
                "text html": !0,
                "text json": Z.parseJSON,
                "text xml": Z.parseXML
            },
            flatOptions: {
                context: !0,
                url: !0
            }
        },
        ajaxPrefilter: P(Rn),
        ajaxTransport: P(Vn),
        ajax: function(e, n) {
            function i(e, n, i, a) {
                var u, h, _, y, w, T = n;
                2 !== b && (b = 2,
                l && clearTimeout(l),
                o = t,
                s = a || "",
                x.readyState = e > 0 ? 4 : 0,
                i && (y = A(d, x, i)),
                e >= 200 && 300 > e || 304 === e ? (d.ifModified && (w = x.getResponseHeader("Last-Modified"),
                w && (Z.lastModified[r] = w),
                w = x.getResponseHeader("Etag"),
                w && (Z.etag[r] = w)),
                304 === e ? (T = "notmodified",
                u = !0) : (u = C(d, y),
                T = u.state,
                h = u.data,
                _ = u.error,
                u = !_)) : (_ = T,
                (!T || e) && (T = "error",
                0 > e && (e = 0))),
                x.status = e,
                x.statusText = (n || T) + "",
                u ? g.resolveWith(p, [h, T, x]) : g.rejectWith(p, [x, T, _]),
                x.statusCode(v),
                v = t,
                c && f.trigger("ajax" + (u ? "Success" : "Error"), [x, d, u ? h : _]),
                m.fireWith(p, [x, T]),
                c && (f.trigger("ajaxComplete", [x, d]),
                --Z.active || Z.event.trigger("ajaxStop")))
            }
            "object" == typeof e && (n = e,
            e = t),
            n = n || {};
            var r, s, a, o, l, u, c, h, d = Z.ajaxSetup({}, n), p = d.context || d, f = p !== d && (p.nodeType || p instanceof Z) ? Z(p) : Z.event, g = Z.Deferred(), m = Z.Callbacks("once memory"), v = d.statusCode || {}, _ = {}, y = {}, b = 0, w = "canceled", x = {
                readyState: 0,
                setRequestHeader: function(e, t) {
                    if (!b) {
                        var n = e.toLowerCase();
                        e = y[n] = y[n] || e,
                        _[e] = t
                    }
                    return this
                },
                getAllResponseHeaders: function() {
                    return 2 === b ? s : null 
                },
                getResponseHeader: function(e) {
                    var n;
                    if (2 === b) {
                        if (!a)
                            for (a = {}; n = Cn.exec(s); )
                                a[n[1].toLowerCase()] = n[2];
                        n = a[e.toLowerCase()]
                    }
                    return n === t ? null  : n
                },
                overrideMimeType: function(e) {
                    return b || (d.mimeType = e),
                    this
                },
                abort: function(e) {
                    return e = e || w,
                    o && o.abort(e),
                    i(0, e),
                    this
                }
            };
            if (g.promise(x),
            x.success = x.done,
            x.error = x.fail,
            x.complete = m.add,
            x.statusCode = function(e) {
                if (e) {
                    var t;
                    if (2 > b)
                        for (t in e)
                            v[t] = [v[t], e[t]];
                    else
                        t = e[x.status],
                        x.always(t)
                }
                return this
            }
            ,
            d.url = ((e || d.url) + "").replace(An, "").replace(Mn, Sn[1] + "//"),
            d.dataTypes = Z.trim(d.dataType || "*").toLowerCase().split(tt),
            null  == d.crossDomain && (u = In.exec(d.url.toLowerCase()),
            d.crossDomain = !(!u || u[1] === Sn[1] && u[2] === Sn[2] && (u[3] || ("http:" === u[1] ? 80 : 443)) == (Sn[3] || ("http:" === Sn[1] ? 80 : 443)))),
            d.data && d.processData && "string" != typeof d.data && (d.data = Z.param(d.data, d.traditional)),
            S(Rn, d, n, x),
            2 === b)
                return x;
            if (c = d.global,
            d.type = d.type.toUpperCase(),
            d.hasContent = !On.test(d.type),
            c && 0 === Z.active++ && Z.event.trigger("ajaxStart"),
            !d.hasContent && (d.data && (d.url += (En.test(d.url) ? "&" : "?") + d.data,
            delete d.data),
            r = d.url,
            d.cache === !1)) {
                var T = Z.now()
                  , P = d.url.replace(Nn, "$1_=" + T);
                d.url = P + (P === d.url ? (En.test(d.url) ? "&" : "?") + "_=" + T : "")
            }
            (d.data && d.hasContent && d.contentType !== !1 || n.contentType) && x.setRequestHeader("Content-Type", d.contentType),
            d.ifModified && (r = r || d.url,
            Z.lastModified[r] && x.setRequestHeader("If-Modified-Since", Z.lastModified[r]),
            Z.etag[r] && x.setRequestHeader("If-None-Match", Z.etag[r])),
            x.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + Bn + "; q=0.01" : "") : d.accepts["*"]);
            for (h in d.headers)
                x.setRequestHeader(h, d.headers[h]);
            if (!d.beforeSend || d.beforeSend.call(p, x, d) !== !1 && 2 !== b) {
                w = "abort";
                for (h in {
                    success: 1,
                    error: 1,
                    complete: 1
                })
                    x[h](d[h]);
                if (o = S(Vn, d, n, x)) {
                    x.readyState = 1,
                    c && f.trigger("ajaxSend", [x, d]),
                    d.async && d.timeout > 0 && (l = setTimeout(function() {
                        x.abort("timeout")
                    }, d.timeout));
                    try {
                        b = 1,
                        o.send(_, i)
                    } catch (k) {
                        if (!(2 > b))
                            throw k;
                        i(-1, k)
                    }
                } else
                    i(-1, "No Transport");
                return x
            }
            return x.abort()
        },
        active: 0,
        lastModified: {},
        etag: {}
    });
    var $n = []
      , qn = /\?/
      , zn = /(=)\?(?=&|$)|\?\?/
      , Hn = Z.now();
    Z.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = $n.pop() || Z.expando + "_" + Hn++;
            return this[e] = !0,
            e
        }
    }),
    Z.ajaxPrefilter("json jsonp", function(n, i, r) {
        var s, a, o, l = n.data, u = n.url, c = n.jsonp !== !1, h = c && zn.test(u), d = c && !h && "string" == typeof l && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && zn.test(l);
        return "jsonp" === n.dataTypes[0] || h || d ? (s = n.jsonpCallback = Z.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback,
        a = e[s],
        h ? n.url = u.replace(zn, "$1" + s) : d ? n.data = l.replace(zn, "$1" + s) : c && (n.url += (qn.test(u) ? "&" : "?") + n.jsonp + "=" + s),
        n.converters["script json"] = function() {
            return o || Z.error(s + " was not called"),
            o[0]
        }
        ,
        n.dataTypes[0] = "json",
        e[s] = function() {
            o = arguments
        }
        ,
        r.always(function() {
            e[s] = a,
            n[s] && (n.jsonpCallback = i.jsonpCallback,
            $n.push(s)),
            o && Z.isFunction(a) && a(o[0]),
            o = a = t
        }),
        "script") : void 0
    }),
    Z.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function(e) {
                return Z.globalEval(e),
                e
            }
        }
    }),
    Z.ajaxPrefilter("script", function(e) {
        e.cache === t && (e.cache = !1),
        e.crossDomain && (e.type = "GET",
        e.global = !1)
    }),
    Z.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var n, i = $.head || $.getElementsByTagName("head")[0] || $.documentElement;
            return {
                send: function(r, s) {
                    n = $.createElement("script"),
                    n.async = "async",
                    e.scriptCharset && (n.charset = e.scriptCharset),
                    n.src = e.url,
                    n.onload = n.onreadystatechange = function(e, r) {
                        (r || !n.readyState || /loaded|complete/.test(n.readyState)) && (n.onload = n.onreadystatechange = null ,
                        i && n.parentNode && i.removeChild(n),
                        n = t,
                        r || s(200, "success"))
                    }
                    ,
                    i.insertBefore(n, i.firstChild)
                },
                abort: function() {
                    n && n.onload(0, 1)
                }
            }
        }
    });
    var Un, Gn = e.ActiveXObject ? function() {
        for (var e in Un)
            Un[e](0, 1)
    }
     : !1, Xn = 0;
    Z.ajaxSettings.xhr = e.ActiveXObject ? function() {
        return !this.isLocal && j() || O()
    }
     : j,
    function(e) {
        Z.extend(Z.support, {
            ajax: !!e,
            cors: !!e && "withCredentials" in e
        })
    }(Z.ajaxSettings.xhr()),
    Z.support.ajax && Z.ajaxTransport(function(n) {
        if (!n.crossDomain || Z.support.cors) {
            var i;
            return {
                send: function(r, s) {
                    var a, o, l = n.xhr();
                    if (n.username ? l.open(n.type, n.url, n.async, n.username, n.password) : l.open(n.type, n.url, n.async),
                    n.xhrFields)
                        for (o in n.xhrFields)
                            l[o] = n.xhrFields[o];
                    n.mimeType && l.overrideMimeType && l.overrideMimeType(n.mimeType),
                    !n.crossDomain && !r["X-Requested-With"] && (r["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (o in r)
                            l.setRequestHeader(o, r[o])
                    } catch (u) {}
                    l.send(n.hasContent && n.data || null ),
                    i = function(e, r) {
                        var o, u, c, h, d;
                        try {
                            if (i && (r || 4 === l.readyState))
                                if (i = t,
                                a && (l.onreadystatechange = Z.noop,
                                Gn && delete Un[a]),
                                r)
                                    4 !== l.readyState && l.abort();
                                else {
                                    o = l.status,
                                    c = l.getAllResponseHeaders(),
                                    h = {},
                                    d = l.responseXML,
                                    d && d.documentElement && (h.xml = d);
                                    try {
                                        h.text = l.responseText
                                    } catch (p) {}
                                    try {
                                        u = l.statusText
                                    } catch (p) {
                                        u = ""
                                    }
                                    o || !n.isLocal || n.crossDomain ? 1223 === o && (o = 204) : o = h.text ? 200 : 404
                                }
                        } catch (f) {
                            r || s(-1, f)
                        }
                        h && s(o, u, h, c)
                    }
                    ,
                    n.async ? 4 === l.readyState ? setTimeout(i, 0) : (a = ++Xn,
                    Gn && (Un || (Un = {},
                    Z(e).unload(Gn)),
                    Un[a] = i),
                    l.onreadystatechange = i) : i()
                },
                abort: function() {
                    i && i(0, 1)
                }
            }
        }
    });
    var Wn, Yn, Qn = /^(?:toggle|show|hide)$/, Jn = new RegExp("^(?:([-+])=|)(" + K + ")([a-z%]*)$","i"), Zn = /queueHooks$/, Kn = [I], ei = {
        "*": [function(e, t) {
            var n, i, r = this.createTween(e, t), s = Jn.exec(t), a = r.cur(), o = +a || 0, l = 1, u = 20;
            if (s) {
                if (n = +s[2],
                i = s[3] || (Z.cssNumber[e] ? "" : "px"),
                "px" !== i && o) {
                    o = Z.css(r.elem, e, !0) || n || 1;
                    do
                        l = l || ".5",
                        o /= l,
                        Z.style(r.elem, e, o + i);
                    while (l !== (l = r.cur() / a) && 1 !== l && --u)
                }
                r.unit = i,
                r.start = o,
                r.end = s[1] ? o + (s[1] + 1) * n : n
            }
            return r
        }
        ]
    };
    Z.Animation = Z.extend(D, {
        tweener: function(e, t) {
            Z.isFunction(e) ? (t = e,
            e = ["*"]) : e = e.split(" ");
            for (var n, i = 0, r = e.length; r > i; i++)
                n = e[i],
                ei[n] = ei[n] || [],
                ei[n].unshift(t)
        },
        prefilter: function(e, t) {
            t ? Kn.unshift(e) : Kn.push(e)
        }
    }),
    Z.Tween = L,
    L.prototype = {
        constructor: L,
        init: function(e, t, n, i, r, s) {
            this.elem = e,
            this.prop = n,
            this.easing = r || "swing",
            this.options = t,
            this.start = this.now = this.cur(),
            this.end = i,
            this.unit = s || (Z.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var e = L.propHooks[this.prop];
            return e && e.get ? e.get(this) : L.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = L.propHooks[this.prop];
            return this.pos = t = this.options.duration ? Z.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e,
            this.now = (this.end - this.start) * t + this.start,
            this.options.step && this.options.step.call(this.elem, this.now, this),
            n && n.set ? n.set(this) : L.propHooks._default.set(this),
            this
        }
    },
    L.prototype.init.prototype = L.prototype,
    L.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return null  == e.elem[e.prop] || e.elem.style && null  != e.elem.style[e.prop] ? (t = Z.css(e.elem, e.prop, !1, ""),
                t && "auto" !== t ? t : 0) : e.elem[e.prop]
            },
            set: function(e) {
                Z.fx.step[e.prop] ? Z.fx.step[e.prop](e) : e.elem.style && (null  != e.elem.style[Z.cssProps[e.prop]] || Z.cssHooks[e.prop]) ? Z.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
            }
        }
    },
    L.propHooks.scrollTop = L.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    },
    Z.each(["toggle", "show", "hide"], function(e, t) {
        var n = Z.fn[t];
        Z.fn[t] = function(i, r, s) {
            return null  == i || "boolean" == typeof i || !e && Z.isFunction(i) && Z.isFunction(r) ? n.apply(this, arguments) : this.animate(R(t, !0), i, r, s)
        }
    }),
    Z.fn.extend({
        fadeTo: function(e, t, n, i) {
            return this.filter(v).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, i)
        },
        animate: function(e, t, n, i) {
            var r = Z.isEmptyObject(e)
              , s = Z.speed(t, n, i)
              , a = function() {
                var t = D(this, Z.extend({}, e), s);
                r && t.stop(!0)
            }
            ;
            return r || s.queue === !1 ? this.each(a) : this.queue(s.queue, a)
        },
        stop: function(e, n, i) {
            var r = function(e) {
                var t = e.stop;
                delete e.stop,
                t(i)
            }
            ;
            return "string" != typeof e && (i = n,
            n = e,
            e = t),
            n && e !== !1 && this.queue(e || "fx", []),
            this.each(function() {
                var t = !0
                  , n = null  != e && e + "queueHooks"
                  , s = Z.timers
                  , a = Z._data(this);
                if (n)
                    a[n] && a[n].stop && r(a[n]);
                else
                    for (n in a)
                        a[n] && a[n].stop && Zn.test(n) && r(a[n]);
                for (n = s.length; n--; )
                    s[n].elem === this && (null  == e || s[n].queue === e) && (s[n].anim.stop(i),
                    t = !1,
                    s.splice(n, 1));
                (t || !i) && Z.dequeue(this, e)
            })
        }
    }),
    Z.each({
        slideDown: R("show"),
        slideUp: R("hide"),
        slideToggle: R("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, t) {
        Z.fn[e] = function(e, n, i) {
            return this.animate(t, e, n, i)
        }
    }),
    Z.speed = function(e, t, n) {
        var i = e && "object" == typeof e ? Z.extend({}, e) : {
            complete: n || !n && t || Z.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !Z.isFunction(t) && t
        };
        return i.duration = Z.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in Z.fx.speeds ? Z.fx.speeds[i.duration] : Z.fx.speeds._default,
        (null  == i.queue || i.queue === !0) && (i.queue = "fx"),
        i.old = i.complete,
        i.complete = function() {
            Z.isFunction(i.old) && i.old.call(this),
            i.queue && Z.dequeue(this, i.queue)
        }
        ,
        i
    }
    ,
    Z.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        }
    },
    Z.timers = [],
    Z.fx = L.prototype.init,
    Z.fx.tick = function() {
        var e, n = Z.timers, i = 0;
        for (Wn = Z.now(); i < n.length; i++)
            e = n[i],
            !e() && n[i] === e && n.splice(i--, 1);
        n.length || Z.fx.stop(),
        Wn = t
    }
    ,
    Z.fx.timer = function(e) {
        e() && Z.timers.push(e) && !Yn && (Yn = setInterval(Z.fx.tick, Z.fx.interval))
    }
    ,
    Z.fx.interval = 13,
    Z.fx.stop = function() {
        clearInterval(Yn),
        Yn = null 
    }
    ,
    Z.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    },
    Z.fx.step = {},
    Z.expr && Z.expr.filters && (Z.expr.filters.animated = function(e) {
        return Z.grep(Z.timers, function(t) {
            return e === t.elem
        }).length
    }
    );
    var ti = /^(?:body|html)$/i;
    Z.fn.offset = function(e) {
        if (arguments.length)
            return e === t ? this : this.each(function(t) {
                Z.offset.setOffset(this, e, t)
            });
        var n, i, r, s, a, o, l, u = {
            top: 0,
            left: 0
        }, c = this[0], h = c && c.ownerDocument;
        if (h)
            return (i = h.body) === c ? Z.offset.bodyOffset(c) : (n = h.documentElement,
            Z.contains(n, c) ? ("undefined" != typeof c.getBoundingClientRect && (u = c.getBoundingClientRect()),
            r = V(h),
            s = n.clientTop || i.clientTop || 0,
            a = n.clientLeft || i.clientLeft || 0,
            o = r.pageYOffset || n.scrollTop,
            l = r.pageXOffset || n.scrollLeft,
            {
                top: u.top + o - s,
                left: u.left + l - a
            }) : u)
    }
    ,
    Z.offset = {
        bodyOffset: function(e) {
            var t = e.offsetTop
              , n = e.offsetLeft;
            return Z.support.doesNotIncludeMarginInBodyOffset && (t += parseFloat(Z.css(e, "marginTop")) || 0,
            n += parseFloat(Z.css(e, "marginLeft")) || 0),
            {
                top: t,
                left: n
            }
        },
        setOffset: function(e, t, n) {
            var i = Z.css(e, "position");
            "static" === i && (e.style.position = "relative");
            var r, s, a = Z(e), o = a.offset(), l = Z.css(e, "top"), u = Z.css(e, "left"), c = ("absolute" === i || "fixed" === i) && Z.inArray("auto", [l, u]) > -1, h = {}, d = {};
            c ? (d = a.position(),
            r = d.top,
            s = d.left) : (r = parseFloat(l) || 0,
            s = parseFloat(u) || 0),
            Z.isFunction(t) && (t = t.call(e, n, o)),
            null  != t.top && (h.top = t.top - o.top + r),
            null  != t.left && (h.left = t.left - o.left + s),
            "using" in t ? t.using.call(e, h) : a.css(h)
        }
    },
    Z.fn.extend({
        position: function() {
            if (this[0]) {
                var e = this[0]
                  , t = this.offsetParent()
                  , n = this.offset()
                  , i = ti.test(t[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : t.offset();
                return n.top -= parseFloat(Z.css(e, "marginTop")) || 0,
                n.left -= parseFloat(Z.css(e, "marginLeft")) || 0,
                i.top += parseFloat(Z.css(t[0], "borderTopWidth")) || 0,
                i.left += parseFloat(Z.css(t[0], "borderLeftWidth")) || 0,
                {
                    top: n.top - i.top,
                    left: n.left - i.left
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent || $.body; e && !ti.test(e.nodeName) && "static" === Z.css(e, "position"); )
                    e = e.offsetParent;
                return e || $.body
            })
        }
    }),
    Z.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(e, n) {
        var i = /Y/.test(n);
        Z.fn[e] = function(r) {
            return Z.access(this, function(e, r, s) {
                var a = V(e);
                return s === t ? a ? n in a ? a[n] : a.document.documentElement[r] : e[r] : (a ? a.scrollTo(i ? Z(a).scrollLeft() : s, i ? s : Z(a).scrollTop()) : e[r] = s,
                void 0)
            }, e, r, arguments.length, null )
        }
    }),
    Z.each({
        Height: "height",
        Width: "width"
    }, function(e, n) {
        Z.each({
            padding: "inner" + e,
            content: n,
            "": "outer" + e
        }, function(i, r) {
            Z.fn[r] = function(r, s) {
                var a = arguments.length && (i || "boolean" != typeof r)
                  , o = i || (r === !0 || s === !0 ? "margin" : "border");
                return Z.access(this, function(n, i, r) {
                    var s;
                    return Z.isWindow(n) ? n.document.documentElement["client" + e] : 9 === n.nodeType ? (s = n.documentElement,
                    Math.max(n.body["scroll" + e], s["scroll" + e], n.body["offset" + e], s["offset" + e], s["client" + e])) : r === t ? Z.css(n, i, r, o) : Z.style(n, i, r, o)
                }, n, a ? r : t, a, null )
            }
        })
    }),
    e.jQuery = e.$ = Z,
    "function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [], function() {
        return Z
    })
}(window),
function() {
    function e(e) {
        function t(t, n, i, r, s, a) {
            for (; s >= 0 && a > s; s += e) {
                var o = r ? r[s] : s;
                i = n(i, t[o], o, t)
            }
            return i
        }
        return function(n, i, r, s) {
            i = _(i, s, 4);
            var a = !T(n) && v.keys(n)
              , o = (a || n).length
              , l = e > 0 ? 0 : o - 1;
            return arguments.length < 3 && (r = n[a ? a[l] : l],
            l += e),
            t(n, i, r, a, l, o)
        }
    }
    function t(e) {
        return function(t, n, i) {
            n = y(n, i);
            for (var r = null  != t && t.length, s = e > 0 ? 0 : r - 1; s >= 0 && r > s; s += e)
                if (n(t[s], s, t))
                    return s;
            return -1
        }
    }
    function n(e, t) {
        for (var n = C.length, i = "function" == typeof e.constructor ? o : a; n--; ) {
            var r = C[n];
            ("constructor" === r ? v.has(e, r) : r in e && e[r] !== i[r] && !v.contains(t, r)) && t.push(r)
        }
    }
    var i = this
      , r = i._
      , s = Array.prototype
      , a = Object.prototype
      , o = Function.prototype
      , l = s.push
      , u = s.slice
      , c = a.toString
      , h = a.hasOwnProperty
      , d = Array.isArray
      , p = Object.keys
      , f = o.bind
      , g = Object.create
      , m = function() {}
      , v = function(e) {
        return e instanceof v ? e : this instanceof v ? void (this._wrapped = e) : new v(e)
    }
    ;
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = v),
    exports._ = v) : i._ = v,
    v.VERSION = "1.8.0";
    var _ = function(e, t, n) {
        if (void 0 === t)
            return e;
        switch (null  == n ? 3 : n) {
        case 1:
            return function(n) {
                return e.call(t, n)
            }
            ;
        case 2:
            return function(n, i) {
                return e.call(t, n, i)
            }
            ;
        case 3:
            return function(n, i, r) {
                return e.call(t, n, i, r)
            }
            ;
        case 4:
            return function(n, i, r, s) {
                return e.call(t, n, i, r, s)
            }
        }
        return function() {
            return e.apply(t, arguments)
        }
    }
      , y = function(e, t, n) {
        return null  == e ? v.identity : v.isFunction(e) ? _(e, t, n) : v.isObject(e) ? v.matcher(e) : v.property(e)
    }
    ;
    v.iteratee = function(e, t) {
        return y(e, t, 1 / 0)
    }
    ;
    var b = function(e, t) {
        return function(n) {
            var i = arguments.length;
            if (2 > i || null  == n)
                return n;
            for (var r = 1; i > r; r++)
                for (var s = arguments[r], a = e(s), o = a.length, l = 0; o > l; l++) {
                    var u = a[l];
                    t && void 0 !== n[u] || (n[u] = s[u])
                }
            return n
        }
    }
      , w = function(e) {
        if (!v.isObject(e))
            return {};
        if (g)
            return g(e);
        m.prototype = e;
        var t = new m;
        return m.prototype = null ,
        t
    }
      , x = Math.pow(2, 53) - 1
      , T = function(e) {
        var t = e && e.length;
        return "number" == typeof t && t >= 0 && x >= t
    }
    ;
    v.each = v.forEach = function(e, t, n) {
        t = _(t, n);
        var i, r;
        if (T(e))
            for (i = 0,
            r = e.length; r > i; i++)
                t(e[i], i, e);
        else {
            var s = v.keys(e);
            for (i = 0,
            r = s.length; r > i; i++)
                t(e[s[i]], s[i], e)
        }
        return e
    }
    ,
    v.map = v.collect = function(e, t, n) {
        t = y(t, n);
        for (var i = !T(e) && v.keys(e), r = (i || e).length, s = Array(r), a = 0; r > a; a++) {
            var o = i ? i[a] : a;
            s[a] = t(e[o], o, e)
        }
        return s
    }
    ,
    v.reduce = v.foldl = v.inject = e(1),
    v.reduceRight = v.foldr = e(-1),
    v.find = v.detect = function(e, t, n) {
        var i;
        return i = T(e) ? v.findIndex(e, t, n) : v.findKey(e, t, n),
        void 0 !== i && -1 !== i ? e[i] : void 0
    }
    ,
    v.filter = v.select = function(e, t, n) {
        var i = [];
        return t = y(t, n),
        v.each(e, function(e, n, r) {
            t(e, n, r) && i.push(e)
        }),
        i
    }
    ,
    v.reject = function(e, t, n) {
        return v.filter(e, v.negate(y(t)), n)
    }
    ,
    v.every = v.all = function(e, t, n) {
        t = y(t, n);
        for (var i = !T(e) && v.keys(e), r = (i || e).length, s = 0; r > s; s++) {
            var a = i ? i[s] : s;
            if (!t(e[a], a, e))
                return !1
        }
        return !0
    }
    ,
    v.some = v.any = function(e, t, n) {
        t = y(t, n);
        for (var i = !T(e) && v.keys(e), r = (i || e).length, s = 0; r > s; s++) {
            var a = i ? i[s] : s;
            if (t(e[a], a, e))
                return !0
        }
        return !1
    }
    ,
    v.contains = v.includes = v.include = function(e, t) {
        return T(e) || (e = v.values(e)),
        v.indexOf(e, t) >= 0
    }
    ,
    v.invoke = function(e, t) {
        var n = u.call(arguments, 2)
          , i = v.isFunction(t);
        return v.map(e, function(e) {
            var r = i ? t : e[t];
            return null  == r ? r : r.apply(e, n)
        })
    }
    ,
    v.pluck = function(e, t) {
        return v.map(e, v.property(t))
    }
    ,
    v.where = function(e, t) {
        return v.filter(e, v.matcher(t))
    }
    ,
    v.findWhere = function(e, t) {
        return v.find(e, v.matcher(t))
    }
    ,
    v.max = function(e, t, n) {
        var i, r, s = -1 / 0, a = -1 / 0;
        if (null  == t && null  != e) {
            e = T(e) ? e : v.values(e);
            for (var o = 0, l = e.length; l > o; o++)
                i = e[o],
                i > s && (s = i)
        } else
            t = y(t, n),
            v.each(e, function(e, n, i) {
                r = t(e, n, i),
                (r > a || r === -1 / 0 && s === -1 / 0) && (s = e,
                a = r)
            });
        return s
    }
    ,
    v.min = function(e, t, n) {
        var i, r, s = 1 / 0, a = 1 / 0;
        if (null  == t && null  != e) {
            e = T(e) ? e : v.values(e);
            for (var o = 0, l = e.length; l > o; o++)
                i = e[o],
                s > i && (s = i)
        } else
            t = y(t, n),
            v.each(e, function(e, n, i) {
                r = t(e, n, i),
                (a > r || 1 / 0 === r && 1 / 0 === s) && (s = e,
                a = r)
            });
        return s
    }
    ,
    v.shuffle = function(e) {
        for (var t, n = T(e) ? e : v.values(e), i = n.length, r = Array(i), s = 0; i > s; s++)
            t = v.random(0, s),
            t !== s && (r[s] = r[t]),
            r[t] = n[s];
        return r
    }
    ,
    v.sample = function(e, t, n) {
        return null  == t || n ? (T(e) || (e = v.values(e)),
        e[v.random(e.length - 1)]) : v.shuffle(e).slice(0, Math.max(0, t))
    }
    ,
    v.sortBy = function(e, t, n) {
        return t = y(t, n),
        v.pluck(v.map(e, function(e, n, i) {
            return {
                value: e,
                index: n,
                criteria: t(e, n, i)
            }
        }).sort(function(e, t) {
            var n = e.criteria
              , i = t.criteria;
            if (n !== i) {
                if (n > i || void 0 === n)
                    return 1;
                if (i > n || void 0 === i)
                    return -1
            }
            return e.index - t.index
        }), "value")
    }
    ;
    var P = function(e) {
        return function(t, n, i) {
            var r = {};
            return n = y(n, i),
            v.each(t, function(i, s) {
                var a = n(i, s, t);
                e(r, i, a)
            }),
            r
        }
    }
    ;
    v.groupBy = P(function(e, t, n) {
        v.has(e, n) ? e[n].push(t) : e[n] = [t]
    }),
    v.indexBy = P(function(e, t, n) {
        e[n] = t
    }),
    v.countBy = P(function(e, t, n) {
        v.has(e, n) ? e[n]++ : e[n] = 1
    }),
    v.toArray = function(e) {
        return e ? v.isArray(e) ? u.call(e) : T(e) ? v.map(e, v.identity) : v.values(e) : []
    }
    ,
    v.size = function(e) {
        return null  == e ? 0 : T(e) ? e.length : v.keys(e).length
    }
    ,
    v.partition = function(e, t, n) {
        t = y(t, n);
        var i = []
          , r = [];
        return v.each(e, function(e, n, s) {
            (t(e, n, s) ? i : r).push(e)
        }),
        [i, r]
    }
    ,
    v.first = v.head = v.take = function(e, t, n) {
        return null  == e ? void 0 : null  == t || n ? e[0] : v.initial(e, e.length - t)
    }
    ,
    v.initial = function(e, t, n) {
        return u.call(e, 0, Math.max(0, e.length - (null  == t || n ? 1 : t)))
    }
    ,
    v.last = function(e, t, n) {
        return null  == e ? void 0 : null  == t || n ? e[e.length - 1] : v.rest(e, Math.max(0, e.length - t))
    }
    ,
    v.rest = v.tail = v.drop = function(e, t, n) {
        return u.call(e, null  == t || n ? 1 : t)
    }
    ,
    v.compact = function(e) {
        return v.filter(e, v.identity)
    }
    ;
    var S = function(e, t, n, i) {
        for (var r = [], s = 0, a = i || 0, o = e && e.length; o > a; a++) {
            var l = e[a];
            if (T(l) && (v.isArray(l) || v.isArguments(l))) {
                t || (l = S(l, t, n));
                var u = 0
                  , c = l.length;
                for (r.length += c; c > u; )
                    r[s++] = l[u++]
            } else
                n || (r[s++] = l)
        }
        return r
    }
    ;
    v.flatten = function(e, t) {
        return S(e, t, !1)
    }
    ,
    v.without = function(e) {
        return v.difference(e, u.call(arguments, 1))
    }
    ,
    v.uniq = v.unique = function(e, t, n, i) {
        if (null  == e)
            return [];
        v.isBoolean(t) || (i = n,
        n = t,
        t = !1),
        null  != n && (n = y(n, i));
        for (var r = [], s = [], a = 0, o = e.length; o > a; a++) {
            var l = e[a]
              , u = n ? n(l, a, e) : l;
            t ? (a && s === u || r.push(l),
            s = u) : n ? v.contains(s, u) || (s.push(u),
            r.push(l)) : v.contains(r, l) || r.push(l)
        }
        return r
    }
    ,
    v.union = function() {
        return v.uniq(S(arguments, !0, !0))
    }
    ,
    v.intersection = function(e) {
        if (null  == e)
            return [];
        for (var t = [], n = arguments.length, i = 0, r = e.length; r > i; i++) {
            var s = e[i];
            if (!v.contains(t, s)) {
                for (var a = 1; n > a && v.contains(arguments[a], s); a++)
                    ;
                a === n && t.push(s)
            }
        }
        return t
    }
    ,
    v.difference = function(e) {
        var t = S(arguments, !0, !0, 1);
        return v.filter(e, function(e) {
            return !v.contains(t, e)
        })
    }
    ,
    v.zip = function() {
        return v.unzip(arguments)
    }
    ,
    v.unzip = function(e) {
        for (var t = e && v.max(e, "length").length || 0, n = Array(t), i = 0; t > i; i++)
            n[i] = v.pluck(e, i);
        return n
    }
    ,
    v.object = function(e, t) {
        for (var n = {}, i = 0, r = e && e.length; r > i; i++)
            t ? n[e[i]] = t[i] : n[e[i][0]] = e[i][1];
        return n
    }
    ,
    v.indexOf = function(e, t, n) {
        var i = 0
          , r = e && e.length;
        if ("number" == typeof n)
            i = 0 > n ? Math.max(0, r + n) : n;
        else if (n && r)
            return i = v.sortedIndex(e, t),
            e[i] === t ? i : -1;
        if (t !== t)
            return v.findIndex(u.call(e, i), v.isNaN);
        for (; r > i; i++)
            if (e[i] === t)
                return i;
        return -1
    }
    ,
    v.lastIndexOf = function(e, t, n) {
        var i = e ? e.length : 0;
        if ("number" == typeof n && (i = 0 > n ? i + n + 1 : Math.min(i, n + 1)),
        t !== t)
            return v.findLastIndex(u.call(e, 0, i), v.isNaN);
        for (; --i >= 0; )
            if (e[i] === t)
                return i;
        return -1
    }
    ,
    v.findIndex = t(1),
    v.findLastIndex = t(-1),
    v.sortedIndex = function(e, t, n, i) {
        n = y(n, i, 1);
        for (var r = n(t), s = 0, a = e.length; a > s; ) {
            var o = Math.floor((s + a) / 2);
            n(e[o]) < r ? s = o + 1 : a = o
        }
        return s
    }
    ,
    v.range = function(e, t, n) {
        arguments.length <= 1 && (t = e || 0,
        e = 0),
        n = n || 1;
        for (var i = Math.max(Math.ceil((t - e) / n), 0), r = Array(i), s = 0; i > s; s++,
        e += n)
            r[s] = e;
        return r
    }
    ;
    var k = function(e, t, n, i, r) {
        if (!(i instanceof t))
            return e.apply(n, r);
        var s = w(e.prototype)
          , a = e.apply(s, r);
        return v.isObject(a) ? a : s
    }
    ;
    v.bind = function(e, t) {
        if (f && e.bind === f)
            return f.apply(e, u.call(arguments, 1));
        if (!v.isFunction(e))
            throw new TypeError("Bind must be called on a function");
        var n = u.call(arguments, 2);
        return function i() {
            return k(e, i, t, this, n.concat(u.call(arguments)))
        }
    }
    ,
    v.partial = function(e) {
        var t = u.call(arguments, 1);
        return function n() {
            for (var i = 0, r = t.length, s = Array(r), a = 0; r > a; a++)
                s[a] = t[a] === v ? arguments[i++] : t[a];
            for (; i < arguments.length; )
                s.push(arguments[i++]);
            return k(e, n, this, this, s)
        }
    }
    ,
    v.bindAll = function(e) {
        var t, n, i = arguments.length;
        if (1 >= i)
            throw new Error("bindAll must be passed function names");
        for (t = 1; i > t; t++)
            n = arguments[t],
            e[n] = v.bind(e[n], e);
        return e
    }
    ,
    v.memoize = function(e, t) {
        var n = function(i) {
            var r = n.cache
              , s = "" + (t ? t.apply(this, arguments) : i);
            return v.has(r, s) || (r[s] = e.apply(this, arguments)),
            r[s]
        }
        ;
        return n.cache = {},
        n
    }
    ,
    v.delay = function(e, t) {
        var n = u.call(arguments, 2);
        return setTimeout(function() {
            return e.apply(null , n)
        }, t)
    }
    ,
    v.defer = v.partial(v.delay, v, 1),
    v.throttle = function(e, t, n) {
        var i, r, s, a = null , o = 0;
        n || (n = {});
        var l = function() {
            o = n.leading === !1 ? 0 : v.now(),
            a = null ,
            s = e.apply(i, r),
            a || (i = r = null )
        }
        ;
        return function() {
            var u = v.now();
            o || n.leading !== !1 || (o = u);
            var c = t - (u - o);
            return i = this,
            r = arguments,
            0 >= c || c > t ? (a && (clearTimeout(a),
            a = null ),
            o = u,
            s = e.apply(i, r),
            a || (i = r = null )) : a || n.trailing === !1 || (a = setTimeout(l, c)),
            s
        }
    }
    ,
    v.debounce = function(e, t, n) {
        var i, r, s, a, o, l = function() {
            var u = v.now() - a;
            t > u && u >= 0 ? i = setTimeout(l, t - u) : (i = null ,
            n || (o = e.apply(s, r),
            i || (s = r = null )))
        }
        ;
        return function() {
            s = this,
            r = arguments,
            a = v.now();
            var u = n && !i;
            return i || (i = setTimeout(l, t)),
            u && (o = e.apply(s, r),
            s = r = null ),
            o
        }
    }
    ,
    v.wrap = function(e, t) {
        return v.partial(t, e)
    }
    ,
    v.negate = function(e) {
        return function() {
            return !e.apply(this, arguments)
        }
    }
    ,
    v.compose = function() {
        var e = arguments
          , t = e.length - 1;
        return function() {
            for (var n = t, i = e[t].apply(this, arguments); n--; )
                i = e[n].call(this, i);
            return i
        }
    }
    ,
    v.after = function(e, t) {
        return function() {
            return --e < 1 ? t.apply(this, arguments) : void 0
        }
    }
    ,
    v.before = function(e, t) {
        var n;
        return function() {
            return --e > 0 && (n = t.apply(this, arguments)),
            1 >= e && (t = null ),
            n
        }
    }
    ,
    v.once = v.partial(v.before, 2);
    var A = !{
        toString: null 
    }.propertyIsEnumerable("toString")
      , C = ["constructor", "valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
    v.keys = function(e) {
        if (!v.isObject(e))
            return [];
        if (p)
            return p(e);
        var t = [];
        for (var i in e)
            v.has(e, i) && t.push(i);
        return A && n(e, t),
        t
    }
    ,
    v.allKeys = function(e) {
        if (!v.isObject(e))
            return [];
        var t = [];
        for (var i in e)
            t.push(i);
        return A && n(e, t),
        t
    }
    ,
    v.values = function(e) {
        for (var t = v.keys(e), n = t.length, i = Array(n), r = 0; n > r; r++)
            i[r] = e[t[r]];
        return i
    }
    ,
    v.mapObject = function(e, t, n) {
        t = y(t, n);
        for (var i, r = v.keys(e), s = r.length, a = {}, o = 0; s > o; o++)
            i = r[o],
            a[i] = t(e[i], i, e);
        return a
    }
    ,
    v.pairs = function(e) {
        for (var t = v.keys(e), n = t.length, i = Array(n), r = 0; n > r; r++)
            i[r] = [t[r], e[t[r]]];
        return i
    }
    ,
    v.invert = function(e) {
        for (var t = {}, n = v.keys(e), i = 0, r = n.length; r > i; i++)
            t[e[n[i]]] = n[i];
        return t
    }
    ,
    v.functions = v.methods = function(e) {
        var t = [];
        for (var n in e)
            v.isFunction(e[n]) && t.push(n);
        return t.sort()
    }
    ,
    v.extend = b(v.allKeys),
    v.extendOwn = b(v.keys),
    v.findKey = function(e, t, n) {
        t = y(t, n);
        for (var i, r = v.keys(e), s = 0, a = r.length; a > s; s++)
            if (i = r[s],
            t(e[i], i, e))
                return i
    }
    ,
    v.pick = function(e, t, n) {
        var i, r = {};
        if (null  == e)
            return r;
        if (v.isFunction(t)) {
            t = _(t, n);
            for (i in e) {
                var s = e[i];
                t(s, i, e) && (r[i] = s)
            }
        } else {
            var a = S(arguments, !1, !1, 1);
            e = new Object(e);
            for (var o = 0, l = a.length; l > o; o++)
                i = a[o],
                i in e && (r[i] = e[i])
        }
        return r
    }
    ,
    v.omit = function(e, t, n) {
        if (v.isFunction(t))
            t = v.negate(t);
        else {
            var i = v.map(S(arguments, !1, !1, 1), String);
            t = function(e, t) {
                return !v.contains(i, t)
            }
        }
        return v.pick(e, t, n)
    }
    ,
    v.defaults = b(v.allKeys, !0),
    v.clone = function(e) {
        return v.isObject(e) ? v.isArray(e) ? e.slice() : v.extend({}, e) : e
    }
    ,
    v.tap = function(e, t) {
        return t(e),
        e
    }
    ,
    v.isMatch = function(e, t) {
        var n = v.keys(t)
          , i = n.length;
        if (null  == e)
            return !i;
        for (var r = Object(e), s = 0; i > s; s++) {
            var a = n[s];
            if (t[a] !== r[a] || !(a in r))
                return !1
        }
        return !0
    }
    ;
    var j = function(e, t, n, i) {
        if (e === t)
            return 0 !== e || 1 / e === 1 / t;
        if (null  == e || null  == t)
            return e === t;
        e instanceof v && (e = e._wrapped),
        t instanceof v && (t = t._wrapped);
        var r = c.call(e);
        if (r !== c.call(t))
            return !1;
        switch (r) {
        case "[object RegExp]":
        case "[object String]":
            return "" + e == "" + t;
        case "[object Number]":
            return +e !== +e ? +t !== +t : 0 === +e ? 1 / +e === 1 / t : +e === +t;
        case "[object Date]":
        case "[object Boolean]":
            return +e === +t
        }
        var s = "[object Array]" === r;
        if (!s) {
            if ("object" != typeof e || "object" != typeof t)
                return !1;
            var a = e.constructor
              , o = t.constructor;
            if (a !== o && !(v.isFunction(a) && a instanceof a && v.isFunction(o) && o instanceof o) && "constructor" in e && "constructor" in t)
                return !1
        }
        n = n || [],
        i = i || [];
        for (var l = n.length; l--; )
            if (n[l] === e)
                return i[l] === t;
        if (n.push(e),
        i.push(t),
        s) {
            if (l = e.length,
            l !== t.length)
                return !1;
            for (; l--; )
                if (!j(e[l], t[l], n, i))
                    return !1
        } else {
            var u, h = v.keys(e);
            if (l = h.length,
            v.keys(t).length !== l)
                return !1;
            for (; l--; )
                if (u = h[l],
                !v.has(t, u) || !j(e[u], t[u], n, i))
                    return !1
        }
        return n.pop(),
        i.pop(),
        !0
    }
    ;
    v.isEqual = function(e, t) {
        return j(e, t)
    }
    ,
    v.isEmpty = function(e) {
        return null  == e ? !0 : T(e) && (v.isArray(e) || v.isString(e) || v.isArguments(e)) ? 0 === e.length : 0 === v.keys(e).length
    }
    ,
    v.isElement = function(e) {
        return !(!e || 1 !== e.nodeType)
    }
    ,
    v.isArray = d || function(e) {
        return "[object Array]" === c.call(e)
    }
    ,
    v.isObject = function(e) {
        var t = typeof e;
        return "function" === t || "object" === t && !!e
    }
    ,
    v.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"], function(e) {
        v["is" + e] = function(t) {
            return c.call(t) === "[object " + e + "]"
        }
    }),
    v.isArguments(arguments) || (v.isArguments = function(e) {
        return v.has(e, "callee")
    }
    ),
    "function" != typeof /./ && "object" != typeof Int8Array && (v.isFunction = function(e) {
        return "function" == typeof e || !1
    }
    ),
    v.isFinite = function(e) {
        return isFinite(e) && !isNaN(parseFloat(e))
    }
    ,
    v.isNaN = function(e) {
        return v.isNumber(e) && e !== +e
    }
    ,
    v.isBoolean = function(e) {
        return e === !0 || e === !1 || "[object Boolean]" === c.call(e)
    }
    ,
    v.isNull = function(e) {
        return null  === e
    }
    ,
    v.isUndefined = function(e) {
        return void 0 === e
    }
    ,
    v.has = function(e, t) {
        return null  != e && h.call(e, t)
    }
    ,
    v.noConflict = function() {
        return i._ = r,
        this
    }
    ,
    v.identity = function(e) {
        return e
    }
    ,
    v.constant = function(e) {
        return function() {
            return e
        }
    }
    ,
    v.noop = function() {}
    ,
    v.property = function(e) {
        return function(t) {
            return null  == t ? void 0 : t[e]
        }
    }
    ,
    v.propertyOf = function(e) {
        return null  == e ? function() {}
         : function(t) {
            return e[t]
        }
    }
    ,
    v.matcher = v.matches = function(e) {
        return e = v.extendOwn({}, e),
        function(t) {
            return v.isMatch(t, e)
        }
    }
    ,
    v.times = function(e, t, n) {
        var i = Array(Math.max(0, e));
        t = _(t, n, 1);
        for (var r = 0; e > r; r++)
            i[r] = t(r);
        return i
    }
    ,
    v.random = function(e, t) {
        return null  == t && (t = e,
        e = 0),
        e + Math.floor(Math.random() * (t - e + 1))
    }
    ,
    v.now = Date.now || function() {
        return (new Date).getTime()
    }
    ;
    var O = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;"
    }
      , M = v.invert(O)
      , E = function(e) {
        var t = function(t) {
            return e[t]
        }
          , n = "(?:" + v.keys(e).join("|") + ")"
          , i = RegExp(n)
          , r = RegExp(n, "g");
        return function(e) {
            return e = null  == e ? "" : "" + e,
            i.test(e) ? e.replace(r, t) : e
        }
    }
    ;
    v.escape = E(O),
    v.unescape = E(M),
    v.result = function(e, t, n) {
        var i = null  == e ? void 0 : e[t];
        return void 0 === i && (i = n),
        v.isFunction(i) ? i.call(e) : i
    }
    ;
    var D = 0;
    v.uniqueId = function(e) {
        var t = ++D + "";
        return e ? e + t : t
    }
    ,
    v.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var N = /(.)^/
      , I = {
        "'": "'",
        "\\": "\\",
        "\r": "r",
        "\n": "n",
        "\u2028": "u2028",
        "\u2029": "u2029"
    }
      , L = /\\|'|\r|\n|\u2028|\u2029/g
      , R = function(e) {
        return "\\" + I[e]
    }
    ;
    v.template = function(e, t, n) {
        !t && n && (t = n),
        t = v.defaults({}, t, v.templateSettings);
        var i = RegExp([(t.escape || N).source, (t.interpolate || N).source, (t.evaluate || N).source].join("|") + "|$", "g")
          , r = 0
          , s = "__p+='";
        e.replace(i, function(t, n, i, a, o) {
            return s += e.slice(r, o).replace(L, R),
            r = o + t.length,
            n ? s += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'" : i ? s += "'+\n((__t=(" + i + "))==null?'':__t)+\n'" : a && (s += "';\n" + a + "\n__p+='"),
            t
        }),
        s += "';\n",
        t.variable || (s = "with(obj||{}){\n" + s + "}\n"),
        s = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + s + "return __p;\n";
        try {
            var a = new Function(t.variable || "obj","_",s)
        } catch (o) {
            throw o.source = s,
            o
        }
        var l = function(e) {
            return a.call(this, e, v)
        }
          , u = t.variable || "obj";
        return l.source = "function(" + u + "){\n" + s + "}",
        l
    }
    ,
    v.chain = function(e) {
        var t = v(e);
        return t._chain = !0,
        t
    }
    ;
    var V = function(e, t) {
        return e._chain ? v(t).chain() : t
    }
    ;
    v.mixin = function(e) {
        v.each(v.functions(e), function(t) {
            var n = v[t] = e[t];
            v.prototype[t] = function() {
                var e = [this._wrapped];
                return l.apply(e, arguments),
                V(this, n.apply(v, e))
            }
        })
    }
    ,
    v.mixin(v),
    v.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(e) {
        var t = s[e];
        v.prototype[e] = function() {
            var n = this._wrapped;
            return t.apply(n, arguments),
            "shift" !== e && "splice" !== e || 0 !== n.length || delete n[0],
            V(this, n)
        }
    }),
    v.each(["concat", "join", "slice"], function(e) {
        var t = s[e];
        v.prototype[e] = function() {
            return V(this, t.apply(this._wrapped, arguments))
        }
    }),
    v.prototype.value = function() {
        return this._wrapped
    }
    ,
    v.prototype.valueOf = v.prototype.toJSON = v.prototype.value,
    v.prototype.toString = function() {
        return "" + this._wrapped
    }
    ,
    "function" == typeof define && define.amd && define("underscore", [], function() {
        return v
    })
}
.call(this),
function() {
    var e, t = this, n = t.Backbone, i = [], r = i.push, s = i.slice, a = i.splice;
    e = "undefined" != typeof exports ? exports : t.Backbone = {},
    e.VERSION = "1.0.0";
    var o = t._;
    o || "undefined" == typeof require || (o = require("underscore")),
    e.$ = t.jQuery || t.Zepto || t.ender || t.$,
    e.noConflict = function() {
        return t.Backbone = n,
        this
    }
    ,
    e.emulateHTTP = !1,
    e.emulateJSON = !1;
    var l = e.Events = {
        on: function(e, t, n) {
            if (!c(this, "on", e, [t, n]) || !t)
                return this;
            this._events || (this._events = {});
            var i = this._events[e] || (this._events[e] = []);
            return i.push({
                callback: t,
                context: n,
                ctx: n || this
            }),
            this
        },
        once: function(e, t, n) {
            if (!c(this, "once", e, [t, n]) || !t)
                return this;
            var i = this
              , r = o.once(function() {
                i.off(e, r),
                t.apply(this, arguments)
            });
            return r._callback = t,
            this.on(e, r, n)
        },
        off: function(e, t, n) {
            var i, r, s, a, l, u, h, d;
            if (!this._events || !c(this, "off", e, [t, n]))
                return this;
            if (!e && !t && !n)
                return this._events = {},
                this;
            for (a = e ? [e] : o.keys(this._events),
            l = 0,
            u = a.length; u > l; l++)
                if (e = a[l],
                s = this._events[e]) {
                    if (this._events[e] = i = [],
                    t || n)
                        for (h = 0,
                        d = s.length; d > h; h++)
                            r = s[h],
                            (t && t !== r.callback && t !== r.callback._callback || n && n !== r.context) && i.push(r);
                    i.length || delete this._events[e]
                }
            return this
        },
        trigger: function(e) {
            if (!this._events)
                return this;
            var t = s.call(arguments, 1);
            if (!c(this, "trigger", e, t))
                return this;
            var n = this._events[e]
              , i = this._events.all;
            return n && h(n, t),
            i && h(i, arguments),
            this
        },
        stopListening: function(e, t, n) {
            var i = this._listeners;
            if (!i)
                return this;
            var r = !t && !n;
            "object" == typeof t && (n = this),
            e && ((i = {})[e._listenerId] = e);
            for (var s in i)
                i[s].off(t, n, this),
                r && delete this._listeners[s];
            return this
        }
    }
      , u = /\s+/
      , c = function(e, t, n, i) {
        if (!n)
            return !0;
        if ("object" == typeof n) {
            for (var r in n)
                e[t].apply(e, [r, n[r]].concat(i));
            return !1
        }
        if (u.test(n)) {
            for (var s = n.split(u), a = 0, o = s.length; o > a; a++)
                e[t].apply(e, [s[a]].concat(i));
            return !1
        }
        return !0
    }
      , h = function(e, t) {
        var n, i = -1, r = e.length, s = t[0], a = t[1], o = t[2];
        switch (t.length) {
        case 0:
            for (; ++i < r; )
                (n = e[i]).callback.call(n.ctx);
            return;
        case 1:
            for (; ++i < r; )
                (n = e[i]).callback.call(n.ctx, s);
            return;
        case 2:
            for (; ++i < r; )
                (n = e[i]).callback.call(n.ctx, s, a);
            return;
        case 3:
            for (; ++i < r; )
                (n = e[i]).callback.call(n.ctx, s, a, o);
            return;
        default:
            for (; ++i < r; )
                (n = e[i]).callback.apply(n.ctx, t)
        }
    }
      , d = {
        listenTo: "on",
        listenToOnce: "once"
    };
    o.each(d, function(e, t) {
        l[t] = function(t, n, i) {
            var r = this._listeners || (this._listeners = {})
              , s = t._listenerId || (t._listenerId = o.uniqueId("l"));
            return r[s] = t,
            "object" == typeof n && (i = this),
            t[e](n, i, this),
            this
        }
    }),
    l.bind = l.on,
    l.unbind = l.off,
    o.extend(e, l);
    var p = e.Model = function(e, t) {
        var n, i = e || {};
        t || (t = {}),
        this.cid = o.uniqueId("c"),
        this.attributes = {},
        o.extend(this, o.pick(t, f)),
        t.parse && (i = this.parse(i, t) || {}),
        (n = o.result(this, "defaults")) && (i = o.defaults({}, i, n)),
        this.set(i, t),
        this.changed = {},
        this.initialize.apply(this, arguments)
    }
      , f = ["url", "urlRoot", "collection"];
    o.extend(p.prototype, l, {
        changed: null ,
        validationError: null ,
        idAttribute: "id",
        initialize: function() {},
        toJSON: function() {
            return o.clone(this.attributes)
        },
        sync: function() {
            return e.sync.apply(this, arguments)
        },
        get: function(e) {
            return this.attributes[e]
        },
        escape: function(e) {
            return o.escape(this.get(e))
        },
        has: function(e) {
            return null  != this.get(e)
        },
        set: function(e, t, n) {
            var i, r, s, a, l, u, c, h;
            if (null  == e)
                return this;
            if ("object" == typeof e ? (r = e,
            n = t) : (r = {})[e] = t,
            n || (n = {}),
            !this._validate(r, n))
                return !1;
            s = n.unset,
            l = n.silent,
            a = [],
            u = this._changing,
            this._changing = !0,
            u || (this._previousAttributes = o.clone(this.attributes),
            this.changed = {}),
            h = this.attributes,
            c = this._previousAttributes,
            this.idAttribute in r && (this.id = r[this.idAttribute]);
            for (i in r)
                t = r[i],
                o.isEqual(h[i], t) || a.push(i),
                o.isEqual(c[i], t) ? delete this.changed[i] : this.changed[i] = t,
                s ? delete h[i] : h[i] = t;
            if (!l) {
                a.length && (this._pending = !0);
                for (var d = 0, p = a.length; p > d; d++)
                    this.trigger("change:" + a[d], this, h[a[d]], n)
            }
            if (u)
                return this;
            if (!l)
                for (; this._pending; )
                    this._pending = !1,
                    this.trigger("change", this, n);
            return this._pending = !1,
            this._changing = !1,
            this
        },
        unset: function(e, t) {
            return this.set(e, void 0, o.extend({}, t, {
                unset: !0
            }))
        },
        clear: function(e) {
            var t = {};
            for (var n in this.attributes)
                t[n] = void 0;
            return this.set(t, o.extend({}, e, {
                unset: !0
            }))
        },
        hasChanged: function(e) {
            return null  == e ? !o.isEmpty(this.changed) : o.has(this.changed, e)
        },
        changedAttributes: function(e) {
            if (!e)
                return this.hasChanged() ? o.clone(this.changed) : !1;
            var t, n = !1, i = this._changing ? this._previousAttributes : this.attributes;
            for (var r in e)
                o.isEqual(i[r], t = e[r]) || ((n || (n = {}))[r] = t);
            return n
        },
        previous: function(e) {
            return null  != e && this._previousAttributes ? this._previousAttributes[e] : null 
        },
        previousAttributes: function() {
            return o.clone(this._previousAttributes)
        },
        fetch: function(e) {
            e = e ? o.clone(e) : {},
            void 0 === e.parse && (e.parse = !0);
            var t = this
              , n = e.success;
            return e.success = function(i) {
                return t.set(t.parse(i, e), e) ? (n && n(t, i, e),
                t.trigger("sync", t, i, e),
                void 0) : !1
            }
            ,
            R(this, e),
            this.sync("read", this, e)
        },
        save: function(e, t, n) {
            var i, r, s, a = this.attributes;
            if (null  == e || "object" == typeof e ? (i = e,
            n = t) : (i = {})[e] = t,
            !(!i || n && n.wait || this.set(i, n)))
                return !1;
            if (n = o.extend({
                validate: !0
            }, n),
            !this._validate(i, n))
                return !1;
            i && n.wait && (this.attributes = o.extend({}, a, i)),
            void 0 === n.parse && (n.parse = !0);
            var l = this
              , u = n.success;
            return n.success = function(e) {
                l.attributes = a;
                var t = l.parse(e, n);
                return n.wait && (t = o.extend(i || {}, t)),
                o.isObject(t) && !l.set(t, n) ? !1 : (u && u(l, e, n),
                l.trigger("sync", l, e, n),
                void 0)
            }
            ,
            R(this, n),
            r = this.isNew() ? "create" : n.patch ? "patch" : "update",
            "patch" === r && (n.attrs = i),
            s = this.sync(r, this, n),
            i && n.wait && (this.attributes = a),
            s
        },
        destroy: function(e) {
            e = e ? o.clone(e) : {};
            var t = this
              , n = e.success
              , i = function() {
                t.trigger("destroy", t, t.collection, e)
            }
            ;
            if (e.success = function(r) {
                (e.wait || t.isNew()) && i(),
                n && n(t, r, e),
                t.isNew() || t.trigger("sync", t, r, e)
            }
            ,
            this.isNew())
                return e.success(),
                !1;
            R(this, e);
            var r = this.sync("delete", this, e);
            return e.wait || i(),
            r
        },
        url: function() {
            var e = o.result(this, "urlRoot") || o.result(this.collection, "url") || L();
            return this.isNew() ? e : e + ("/" === e.charAt(e.length - 1) ? "" : "/") + encodeURIComponent(this.id)
        },
        parse: function(e) {
            return e
        },
        clone: function() {
            return new this.constructor(this.attributes)
        },
        isNew: function() {
            return null  == this.id
        },
        isValid: function(e) {
            return this._validate({}, o.extend(e || {}, {
                validate: !0
            }))
        },
        _validate: function(e, t) {
            if (!t.validate || !this.validate)
                return !0;
            e = o.extend({}, this.attributes, e);
            var n = this.validationError = this.validate(e, t) || null ;
            return n ? (this.trigger("invalid", this, n, o.extend(t || {}, {
                validationError: n
            })),
            !1) : !0
        }
    });
    var g = ["keys", "values", "pairs", "invert", "pick", "omit"];
    o.each(g, function(e) {
        p.prototype[e] = function() {
            var t = s.call(arguments);
            return t.unshift(this.attributes),
            o[e].apply(o, t)
        }
    });
    var m = e.Collection = function(e, t) {
        t || (t = {}),
        t.url && (this.url = t.url),
        t.model && (this.model = t.model),
        void 0 !== t.comparator && (this.comparator = t.comparator),
        this._reset(),
        this.initialize.apply(this, arguments),
        e && this.reset(e, o.extend({
            silent: !0
        }, t))
    }
      , v = {
        add: !0,
        remove: !0,
        merge: !0
    }
      , _ = {
        add: !0,
        merge: !1,
        remove: !1
    };
    o.extend(m.prototype, l, {
        model: p,
        initialize: function() {},
        toJSON: function(e) {
            return this.map(function(t) {
                return t.toJSON(e)
            })
        },
        sync: function() {
            return e.sync.apply(this, arguments)
        },
        add: function(e, t) {
            return this.set(e, o.defaults(t || {}, _))
        },
        remove: function(e, t) {
            e = o.isArray(e) ? e.slice() : [e],
            t || (t = {});
            var n, i, r, s;
            for (n = 0,
            i = e.length; i > n; n++)
                s = this.get(e[n]),
                s && (delete this._byId[s.id],
                delete this._byId[s.cid],
                r = this.indexOf(s),
                this.models.splice(r, 1),
                this.length--,
                t.silent || (t.index = r,
                s.trigger("remove", s, this, t)),
                this._removeReference(s));
            return this
        },
        set: function(e, t) {
            t = o.defaults(t || {}, v),
            t.parse && (e = this.parse(e, t)),
            o.isArray(e) || (e = e ? [e] : []);
            var n, i, s, l, u, c = t.at, h = this.comparator && null  == c && t.sort !== !1, d = o.isString(this.comparator) ? this.comparator : null , p = [], f = [], g = {};
            for (n = 0,
            i = e.length; i > n; n++)
                (s = this._prepareModel(e[n], t)) && ((l = this.get(s)) ? (t.remove && (g[l.cid] = !0),
                t.merge && (l.set(s.attributes, t),
                h && !u && l.hasChanged(d) && (u = !0))) : t.add && (p.push(s),
                s.on("all", this._onModelEvent, this),
                this._byId[s.cid] = s,
                null  != s.id && (this._byId[s.id] = s)));
            if (t.remove) {
                for (n = 0,
                i = this.length; i > n; ++n)
                    g[(s = this.models[n]).cid] || f.push(s);
                f.length && this.remove(f, t)
            }
            if (p.length && (h && (u = !0),
            this.length += p.length,
            null  != c ? a.apply(this.models, [c, 0].concat(p)) : r.apply(this.models, p)),
            u && this.sort({
                silent: !0
            }),
            t.silent)
                return this;
            for (n = 0,
            i = p.length; i > n; n++)
                (s = p[n]).trigger("add", s, this, t);
            return u && this.trigger("sort", this, t),
            this
        },
        reset: function(e, t) {
            t || (t = {});
            for (var n = 0, i = this.models.length; i > n; n++)
                this._removeReference(this.models[n]);
            return t.previousModels = this.models,
            this._reset(),
            this.add(e, o.extend({
                silent: !0
            }, t)),
            t.silent || this.trigger("reset", this, t),
            this
        },
        push: function(e, t) {
            return e = this._prepareModel(e, t),
            this.add(e, o.extend({
                at: this.length
            }, t)),
            e
        },
        pop: function(e) {
            var t = this.at(this.length - 1);
            return this.remove(t, e),
            t
        },
        unshift: function(e, t) {
            return e = this._prepareModel(e, t),
            this.add(e, o.extend({
                at: 0
            }, t)),
            e
        },
        shift: function(e) {
            var t = this.at(0);
            return this.remove(t, e),
            t
        },
        slice: function(e, t) {
            return this.models.slice(e, t)
        },
        get: function(e) {
            return null  == e ? void 0 : this._byId[null  != e.id ? e.id : e.cid || e]
        },
        at: function(e) {
            return this.models[e]
        },
        where: function(e, t) {
            return o.isEmpty(e) ? t ? void 0 : [] : this[t ? "find" : "filter"](function(t) {
                for (var n in e)
                    if (e[n] !== t.get(n))
                        return !1;
                return !0
            })
        },
        findWhere: function(e) {
            return this.where(e, !0)
        },
        sort: function(e) {
            if (!this.comparator)
                throw new Error("Cannot sort a set without a comparator");
            return e || (e = {}),
            o.isString(this.comparator) || 1 === this.comparator.length ? this.models = this.sortBy(this.comparator, this) : this.models.sort(o.bind(this.comparator, this)),
            e.silent || this.trigger("sort", this, e),
            this
        },
        sortedIndex: function(e, t, n) {
            t || (t = this.comparator);
            var i = o.isFunction(t) ? t : function(e) {
                return e.get(t)
            }
            ;
            return o.sortedIndex(this.models, e, i, n)
        },
        pluck: function(e) {
            return o.invoke(this.models, "get", e)
        },
        fetch: function(e) {
            e = e ? o.clone(e) : {},
            void 0 === e.parse && (e.parse = !0);
            var t = e.success
              , n = this;
            return e.success = function(i) {
                var r = e.reset ? "reset" : "set";
                n[r](i, e),
                t && t(n, i, e),
                n.trigger("sync", n, i, e)
            }
            ,
            R(this, e),
            this.sync("read", this, e)
        },
        create: function(e, t) {
            if (t = t ? o.clone(t) : {},
            !(e = this._prepareModel(e, t)))
                return !1;
            t.wait || this.add(e, t);
            var n = this
              , i = t.success;
            return t.success = function(r) {
                t.wait && n.add(e, t),
                i && i(e, r, t)
            }
            ,
            e.save(null , t),
            e
        },
        parse: function(e) {
            return e
        },
        clone: function() {
            return new this.constructor(this.models)
        },
        _reset: function() {
            this.length = 0,
            this.models = [],
            this._byId = {}
        },
        _prepareModel: function(e, t) {
            if (e instanceof p)
                return e.collection || (e.collection = this),
                e;
            t || (t = {}),
            t.collection = this;
            var n = new this.model(e,t);
            return n._validate(e, t) ? n : (this.trigger("invalid", this, e, t),
            !1)
        },
        _removeReference: function(e) {
            this === e.collection && delete e.collection,
            e.off("all", this._onModelEvent, this)
        },
        _onModelEvent: function(e, t, n, i) {
            ("add" !== e && "remove" !== e || n === this) && ("destroy" === e && this.remove(t, i),
            t && e === "change:" + t.idAttribute && (delete this._byId[t.previous(t.idAttribute)],
            null  != t.id && (this._byId[t.id] = t)),
            this.trigger.apply(this, arguments))
        }
    });
    var y = ["forEach", "each", "map", "collect", "reduce", "foldl", "inject", "reduceRight", "foldr", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "toArray", "size", "first", "head", "take", "initial", "rest", "tail", "drop", "last", "without", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "chain"];
    o.each(y, function(e) {
        m.prototype[e] = function() {
            var t = s.call(arguments);
            return t.unshift(this.models),
            o[e].apply(o, t)
        }
    });
    var b = ["groupBy", "countBy", "sortBy"];
    o.each(b, function(e) {
        m.prototype[e] = function(t, n) {
            var i = o.isFunction(t) ? t : function(e) {
                return e.get(t)
            }
            ;
            return o[e](this.models, i, n)
        }
    });
    var w = e.View = function(e) {
        this.cid = o.uniqueId("view"),
        this._configure(e || {}),
        this._ensureElement(),
        this.initialize.apply(this, arguments),
        this.delegateEvents()
    }
      , x = /^(\S+)\s*(.*)$/
      , T = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
    o.extend(w.prototype, l, {
        tagName: "div",
        $: function(e) {
            return this.$el.find(e)
        },
        initialize: function() {},
        render: function() {
            return this
        },
        remove: function() {
            return this.$el.remove(),
            this.stopListening(),
            this
        },
        setElement: function(t, n) {
            return this.$el && this.undelegateEvents(),
            this.$el = t instanceof e.$ ? t : e.$(t),
            this.el = this.$el[0],
            n !== !1 && this.delegateEvents(),
            this
        },
        delegateEvents: function(e) {
            if (!e && !(e = o.result(this, "events")))
                return this;
            this.undelegateEvents();
            for (var t in e) {
                var n = e[t];
                if (o.isFunction(n) || (n = this[e[t]]),
                n) {
                    var i = t.match(x)
                      , r = i[1]
                      , s = i[2];
                    n = o.bind(n, this),
                    r += ".delegateEvents" + this.cid,
                    "" === s ? this.$el.on(r, n) : this.$el.on(r, s, n)
                }
            }
            return this
        },
        undelegateEvents: function() {
            return this.$el.off(".delegateEvents" + this.cid),
            this
        },
        _configure: function(e) {
            this.options && (e = o.extend({}, o.result(this, "options"), e)),
            o.extend(this, o.pick(e, T)),
            this.options = e
        },
        _ensureElement: function() {
            if (this.el)
                this.setElement(o.result(this, "el"), !1);
            else {
                var t = o.extend({}, o.result(this, "attributes"));
                this.id && (t.id = o.result(this, "id")),
                this.className && (t["class"] = o.result(this, "className"));
                var n = e.$("<" + o.result(this, "tagName") + ">").attr(t);
                this.setElement(n, !1)
            }
        }
    }),
    e.sync = function(t, n, i) {
        var r = P[t];
        o.defaults(i || (i = {}), {
            emulateHTTP: e.emulateHTTP,
            emulateJSON: e.emulateJSON
        });
        var s = {
            type: r,
            dataType: "json"
        };
        if (i.url || (s.url = o.result(n, "url") || L()),
        null  != i.data || !n || "create" !== t && "update" !== t && "patch" !== t || (s.contentType = "application/json",
        s.data = JSON.stringify(i.attrs || n.toJSON(i))),
        i.emulateJSON && (s.contentType = "application/x-www-form-urlencoded",
        s.data = s.data ? {
            model: s.data
        } : {}),
        i.emulateHTTP && ("PUT" === r || "DELETE" === r || "PATCH" === r)) {
            s.type = "POST",
            i.emulateJSON && (s.data._method = r);
            var a = i.beforeSend;
            i.beforeSend = function(e) {
                return e.setRequestHeader("X-HTTP-Method-Override", r),
                a ? a.apply(this, arguments) : void 0
            }
        }
        "GET" === s.type || i.emulateJSON || (s.processData = !1),
        "PATCH" !== s.type || !window.ActiveXObject || window.external && window.external.msActiveXFilteringEnabled || (s.xhr = function() {
            return new ActiveXObject("Microsoft.XMLHTTP")
        }
        );
        var l = i.xhr = e.ajax(o.extend(s, i));
        return n.trigger("request", n, l, i),
        l
    }
    ;
    var P = {
        create: "POST",
        update: "PUT",
        patch: "PATCH",
        "delete": "DELETE",
        read: "GET"
    };
    e.ajax = function() {
        return e.$.ajax.apply(e.$, arguments)
    }
    ;
    var S = e.Router = function(e) {
        e || (e = {}),
        e.routes && (this.routes = e.routes),
        this._bindRoutes(),
        this.initialize.apply(this, arguments)
    }
      , k = /\((.*?)\)/g
      , A = /(\(\?)?:\w+/g
      , C = /\*\w+/g
      , j = /[\-{}\[\]+?.,\\\^$|#\s]/g;
    o.extend(S.prototype, l, {
        initialize: function() {},
        route: function(t, n, i) {
            o.isRegExp(t) || (t = this._routeToRegExp(t)),
            o.isFunction(n) && (i = n,
            n = ""),
            i || (i = this[n]);
            var r = this;
            return e.history.route(t, function(s) {
                var a = r._extractParameters(t, s);
                i && i.apply(r, a),
                r.trigger.apply(r, ["route:" + n].concat(a)),
                r.trigger("route", n, a),
                e.history.trigger("route", r, n, a)
            }),
            this
        },
        navigate: function(t, n) {
            return e.history.navigate(t, n),
            this
        },
        _bindRoutes: function() {
            if (this.routes) {
                this.routes = o.result(this, "routes");
                for (var e, t = o.keys(this.routes); null  != (e = t.pop()); )
                    this.route(e, this.routes[e])
            }
        },
        _routeToRegExp: function(e) {
            return e = e.replace(j, "\\$&").replace(k, "(?:$1)?").replace(A, function(e, t) {
                return t ? e : "([^/]+)"
            }).replace(C, "(.*?)"),
            new RegExp("^" + e + "$")
        },
        _extractParameters: function(e, t) {
            var n = e.exec(t).slice(1);
            return o.map(n, function(e) {
                return e ? decodeURIComponent(e) : null 
            })
        }
    });
    var O = e.History = function() {
        this.handlers = [],
        o.bindAll(this, "checkUrl"),
        "undefined" != typeof window && (this.location = window.location,
        this.history = window.history)
    }
      , M = /^[#\/]|\s+$/g
      , E = /^\/+|\/+$/g
      , D = /msie [\w.]+/
      , N = /\/$/;
    O.started = !1,
    o.extend(O.prototype, l, {
        interval: 50,
        getHash: function(e) {
            var t = (e || this).location.href.match(/#(.*)$/);
            return t ? t[1] : ""
        },
        getFragment: function(e, t) {
            if (null  == e)
                if (this._hasPushState || !this._wantsHashChange || t) {
                    e = this.location.pathname;
                    var n = this.root.replace(N, "");
                    e.indexOf(n) || (e = e.substr(n.length))
                } else
                    e = this.getHash();
            return e.replace(M, "")
        },
        start: function(t) {
            if (O.started)
                throw new Error("Backbone.history has already been started");
            O.started = !0,
            this.options = o.extend({}, {
                root: "/"
            }, this.options, t),
            this.root = this.options.root,
            this._wantsHashChange = this.options.hashChange !== !1,
            this._wantsPushState = !!this.options.pushState,
            this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
            var n = this.getFragment()
              , i = document.documentMode
              , r = D.exec(navigator.userAgent.toLowerCase()) && (!i || 7 >= i);
            this.root = ("/" + this.root + "/").replace(E, "/"),
            r && this._wantsHashChange && (this.iframe = e.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow,
            this.navigate(n)),
            this._hasPushState ? e.$(window).on("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange" in window && !r ? e.$(window).on("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)),
            this.fragment = n;
            var s = this.location
              , a = s.pathname.replace(/[^\/]$/, "$&/") === this.root;
            return this._wantsHashChange && this._wantsPushState && !this._hasPushState && !a ? (this.fragment = this.getFragment(null , !0),
            this.location.replace(this.root + this.location.search + "#" + this.fragment),
            !0) : (this._wantsPushState && this._hasPushState && a && s.hash && (this.fragment = this.getHash().replace(M, ""),
            this.history.replaceState({}, document.title, this.root + this.fragment + s.search)),
            this.options.silent ? void 0 : this.loadUrl())
        },
        stop: function() {
            e.$(window).off("popstate", this.checkUrl).off("hashchange", this.checkUrl),
            clearInterval(this._checkUrlInterval),
            O.started = !1
        },
        route: function(e, t) {
            this.handlers.unshift({
                route: e,
                callback: t
            })
        },
        checkUrl: function() {
            var e = this.getFragment();
            return e === this.fragment && this.iframe && (e = this.getFragment(this.getHash(this.iframe))),
            e === this.fragment ? !1 : (this.iframe && this.navigate(e),
            this.loadUrl() || this.loadUrl(this.getHash()),
            void 0)
        },
        loadUrl: function(e) {
            var t = this.fragment = this.getFragment(e)
              , n = o.any(this.handlers, function(e) {
                return e.route.test(t) ? (e.callback(t),
                !0) : void 0
            });
            return n
        },
        navigate: function(e, t) {
            if (!O.started)
                return !1;
            if (t && t !== !0 || (t = {
                trigger: t
            }),
            e = this.getFragment(e || ""),
            this.fragment !== e) {
                this.fragment = e;
                var n = this.root + e;
                if (this._hasPushState)
                    this.history[t.replace ? "replaceState" : "pushState"]({}, document.title, n);
                else {
                    if (!this._wantsHashChange)
                        return this.location.assign(n);
                    this._updateHash(this.location, e, t.replace),
                    this.iframe && e !== this.getFragment(this.getHash(this.iframe)) && (t.replace || this.iframe.document.open().close(),
                    this._updateHash(this.iframe.location, e, t.replace))
                }
                t.trigger && this.loadUrl(e)
            }
        },
        _updateHash: function(e, t, n) {
            if (n) {
                var i = e.href.replace(/(javascript:|#).*$/, "");
                e.replace(i + "#" + t)
            } else
                e.hash = "#" + t
        }
    }),
    e.history = new O;
    var I = function(e, t) {
        var n, i = this;
        n = e && o.has(e, "constructor") ? e.constructor : function() {
            return i.apply(this, arguments)
        }
        ,
        o.extend(n, i, t);
        var r = function() {
            this.constructor = n
        }
        ;
        return r.prototype = i.prototype,
        n.prototype = new r,
        e && o.extend(n.prototype, e),
        n.__super__ = i.prototype,
        n
    }
    ;
    p.extend = m.extend = S.extend = w.extend = O.extend = I;
    var L = function() {
        throw new Error('A "url" property or function must be specified')
    }
      , R = function(e, t) {
        var n = t.error;
        t.error = function(i) {
            n && n(e, i, t),
            e.trigger("error", e, i, t)
        }
    }
}
.call(this),
define("backbone", ["underscore", "jquery"], function(e) {
    return function() {
        var t;
        return t || e.Backbone
    }
}(this)),
define("tpl", ["text", "underscore"], function(e, t) {
    var n = {}
      , i = "define('{pluginName}!{moduleName}', function () { return {source}; });\n";
    return {
        version: "0.0.2",
        load: function(i, r, s, a) {
            if (n[i])
                s(n[i]);
            else {
                var o = a.tpl && a.tpl.extension || ".html"
                  , l = a.tpl && a.tpl.path || "";
                e.load(l + i + o, r, function(e) {
                    n[i] = t.template(e),
                    s(n[i])
                }, a)
            }
        },
        write: function(e, t, r) {
            var s = n[t]
              , a = s && s.source;
            a && r.asModule(e + "!" + t, i.replace("{pluginName}", e).replace("{moduleName}", t).replace("{source}", a))
        }
    }
}),
define("tpl!templates/chunks/nav-main", [], function() {
    return function(obj) {
        var __p = "";
        with (Array.prototype.join,
        obj || {})
            __p += '<div class="nav-main-item js-nav-main-item" data-id="1" data-href="home">\n\n    <div class="nav-main-item-inner">\n        <div class="nav-main-item-inner-content">\n            <div class="icon icon-home btn-circle">\n            </div>\n            <div class="nav-item-text">\n                Home\n            </div>\n        </div>\n    </div>\n    <div class="nav-main-item-bg-wrap">\n        <div class="nav-main-item-bg">\n            <div class="nav-main-item-bg-inner nav-main-item-bg-inner-home"></div>\n        </div>\n    </div>\n</div>\n<div class="nav-main-item js-nav-main-item" data-id="2" data-href="video">\n    <div class="nav-main-item-inner">\n        <div class="nav-main-item-inner-content">\n            <div class="icon icon-rings btn-circle">\n            </div>\n            <div class="nav-item-text">\n                Film\n            </div>\n        </div>\n    </div>\n    <div class="nav-main-item-bg-wrap">\n        <div class="nav-main-item-bg">\n            <div class="nav-main-item-bg-inner nav-main-item-bg-inner-intro"></div>\n        </div>\n    </div>\n</div>\n<div class="nav-main-item js-nav-main-item" data-id="3" data-href="about">\n    <div class="nav-main-item-inner">\n        <div class="nav-main-item-inner-content">\n            <div class="icon icon-lightbulb btn-circle">\n            </div>\n            <div class="nav-item-text">\n                Over Porsche Marriage\n            </div>\n        </div>\n    </div>\n    <div class="nav-main-item-bg-wrap">\n        <div class="nav-main-item-bg">\n            <div class="nav-main-item-bg-inner nav-main-item-bg-inner-about"></div>\n        </div>\n    </div>\n</div>\n<div class="nav-main-item js-nav-main-item" data-id="4" data-href="app">\n    <div class="nav-main-item-inner">\n        <div class="nav-main-item-inner-content">\n            <div class="icon icon-phone btn-circle">\n            </div>\n            <div class="nav-item-text">\n                Share a Porsche\n            </div>\n        </div>\n    </div>\n    <div class="nav-main-item-bg-wrap">\n        <div class="nav-main-item-bg">\n            <div class="nav-main-item-bg-inner nav-main-item-bg-inner-app"></div>\n        </div>\n    </div>\n</div>';
        return __p
    }
}),
define("view/NavView", ["require", "jquery", "backbone", "underscore", "tpl!templates/chunks/nav-main"], function(e) {
    var t = e("jquery")
      , n = e("backbone")
      , i = e("underscore");
    return n.View.extend({
        template: e("tpl!templates/chunks/nav-main"),
        events: {
            "click .js-nav-main-item": "onNavItemClick"
        },
        initialize: function() {
            this.$el.html(this.template),
            i.bindAll(this, "toggleNav", "gotoHome"),
            this.$body = t("body"),
            this.navOpen = !1,
            this.animating = !1,
            document.getElementById("nav-main-btn").addEventListener("click", this.toggleNav),
            document.getElementById("btn-home").addEventListener("click", this.gotoHome)
        },
        gotoHome: function() {
            this.navOpen && (this.$body.removeClass("state-nav-expanded"),
            this.navOpen = !1),
            "home" != App.pages.getPagePath().toString() && App.pages.gotoPage("home")
        },
        toggleNav: function() {
            this.animating = !0,
            setTimeout(i.bind(function() {
                this.animating = !1
            }, this), 500),
            this.$el.addClass("state-animating"),
            setTimeout(i.bind(function() {
                this.$el.removeClass("state-animating")
            }, this), 1500),
            this.$body.toggleClass("state-nav-expanded"),
            this.navOpen = !this.navOpen;
            var e = App.pageSwapper.getPageView().videoView;
            if (e && e.video && !App.settings.mobile) {
                var t = e.isPaused();
                this.navOpen && !t && (this.forcePaused = !0,
                App.settings.tablet ? e.pauseVideo() : e.muteVideo().then(function() {
                    e.pauseVideo()
                })),
                !this.navOpen && this.forcePaused && (this.forcePaused = !1,
                App.settings.tablet ? e.playVideo() : (e.unmuteVideo(),
                e.playVideo()))
            }
        },
        onNavItemClick: function(e) {
            if (!this.animating) {
                var r = e.currentTarget.getAttribute("data-href");
                if (App.settings.mobile) {
                    if ("video" == r || "join" == r)
                        this.resetNav(),
                        n.Events.trigger("resetAllUserData"),
                        App.pages.gotoPage(r, {
                            instant: !0
                        });
                    else {
                        if (this.animating)
                            return;
                        this.animating = !0,
                        this.$body.addClass("state-nav-navigating"),
                        t(e.currentTarget).addClass("state-active"),
                        setTimeout(i.bind(function() {
                            this.gotoNewPage(r),
                            setTimeout(i.bind(this.hideNav, this), 100)
                        }, this), 800)
                    }
                    r === App.pages.getPagePath().toString() && (this.samePage = !0,
                    App.homeToHome = !0,
                    App.pageSwapper.getPageView().reset())
                } else {
                    if (this.animating)
                        return;
                    this.animating = !0,
                    this.$body.addClass("state-nav-navigating"),
                    t(e.currentTarget).addClass("state-active"),
                    ("video" == r || "join" == r) && n.Events.trigger("resetAllUserData"),
                    r === App.pages.getPagePath().toString() && (App.introShown = !0,
                    this.samePage = !0,
                    App.homeToHome = !0,
                    App.pageSwapper.getPageView().reset()),
                    App.env.has("touch") ? (this.gotoNewPage(r),
                    setTimeout(i.bind(this.hideNav, this), 800)) : setTimeout(i.bind(function() {
                        this.gotoNewPage(r),
                        setTimeout(i.bind(this.hideNav, this), 100)
                    }, this), 800)
                }
            }
        },
        hideNav: function() {
            this.$el.addClass("state-invisible"),
            this.gotoAbout = !1,
            this.animating = !1,
            this.resetNav()
        },
        gotoNewPage: function(e) {
            App.pageSwapper.getPageView().animateContentOut(),
            this.samePage ? (App.pageSwapper.getPageView().afterPageSwap(!0),
            App.pageSwapper.getPageView().transitionIn(),
            this.samePage = !1) : App.pages.gotoPage(e, {
                instant: !0
            })
        },
        resetNav: function() {
            this.$body.removeClass("state-nav-expanded"),
            t(".js-nav-main-item").removeClass("state-active"),
            this.navOpen = !1,
            this.forcePaused = !1,
            setTimeout(i.bind(function() {
                this.$body.removeClass("state-nav-navigating"),
                this.$el.removeClass("state-invisible"),
                this.$el.addClass("state-hidden"),
                setTimeout(i.bind(function() {
                    this.$el.removeClass("state-hidden")
                }, this), 100)
            }, this), 200)
        }
    })
}),
define("../../core/utils/url", ["require"], function() {
    var e = new RegExp("^(http[s]?:)?//")
      , t = /^data:([^;,]+)(?:;charset=([^;,]+))?(?:;(base64))?,/
      , n = /^(.+?)@([2-9])?x(\.jp(?:e)?g|\.png|\.gif|\.webp)?((?:\?|#).*)?$/
      , i = document.createElement("a")
      , r = {}
      , s = (window.devicePixelRatio || 1) >> 0;
    r.createURL = function(e, t) {
        return e + this.createQueryString(t)
    }
    ;
    var a = function(e, t) {
        this.url = e,
        this.pixelRatio = t
    }
    ;
    return a.prototype.toString = function() {
        return this.url
    }
    ,
    r.resolvePixelRatio = function(e, t) {
        var i = 1;
        if (!this.isBlob(e) && !this.isData(e)) {
            var r = e.match(n);
            r && (r[2] ? i = parseInt(r[2], 10) : (i = Math.max(Math.min(s, t || s), 1),
            e = r[1] + "@" + i + "x" + (r[3] || "") + (r[4] || "")))
        }
        return new a(e,i)
    }
    ,
    r.createQueryString = function(e) {
        var t, n = [], i = function(e, t) {
            n.push(encodeURIComponent(e) + "=" + encodeURIComponent(t))
        }
        ;
        for (var r in e)
            if (e.hasOwnProperty(r))
                if (t = e[r],
                t instanceof Array)
                    for (var s = 0, a = t.length; a > s; s++)
                        i(r + "[]", t[s]);
                else
                    t ? "object" == typeof t && (t = JSON.stringify(t)) : t = "",
                    i(r, t);
        return "?" + n.join("&")
    }
    ,
    r.parseQueryString = function(e) {
        if (!e.match(/\S/))
            return {};
        "?" === e.charAt(0) && (e = e.substr(1));
        for (var t, n, i = e.split("&"), r = {}, s = 0, a = i.length; a > s; s++) {
            var o = i[s]
              , l = o.indexOf("=");
            if (l >= 0 ? (t = o.substr(0, l),
            n = o.substr(l + 1)) : (t = o,
            n = ""),
            t = decodeURIComponent(t),
            n = decodeURIComponent(n),
            r.hasOwnProperty(t))
                r[t] instanceof Array ? r[t].push(n) : r[t] = [r[t], n];
            else {
                try {
                    n = JSON.parse(n)
                } catch (u) {}
                r[t] = n
            }
        }
        return r
    }
    ,
    r.parse = function(e, t) {
        i.href = e;
        var n = {
            search: i.search,
            hash: i.hash,
            pathname: i.pathname.replace(/\/\//g, "/"),
            hostname: i.hostname,
            username: i.username,
            password: i.password,
            port: i.port || 80,
            protocol: i.protocol
        };
        return t && (n.query = this.parseQueryString(n.search)),
        n
    }
    ,
    r.format = function(e) {
        var t = "";
        return t += e.protocol ? e.protocol : document.location.protocol,
        t += "//",
        (e.username || e.password) && (t += (e.username || "") + ":" + (e.password || "") + "@"),
        t += e.hostname ? e.hostname : document.location.host,
        e.port && !isNaN(parseInt(e.port)) && (t += ":" + e.port),
        e.path ? t = this.join(t, e.path) : t += "/",
        e.search ? ("?" !== e.search.charAt(0) && (t += "?"),
        t += e.search) : "object" == typeof e.query && (t += this.createQueryString(e.query)),
        e.hash && ("#" !== e.hash.charAt(0) && (t += "#"),
        t += e.hash),
        t
    }
    ,
    r.isAbsolute = function(t) {
        return t.match(e) || "/" === t.charAt(0)
    }
    ,
    r.isBlob = function(e) {
        return 0 === e.indexOf("blob:")
    }
    ,
    r.parseData = function(e) {
        if (!this.isData(e))
            return null ;
        var n = e.match(t);
        return {
            mimetype: n[1],
            charset: n[2] || "text/plain;charset=US-ASCII",
            base64: "base64" === n[3],
            data: e.substr(e.indexOf(",") + 1)
        }
    }
    ,
    r.isData = function(e) {
        return 0 === e.indexOf("data:")
    }
    ,
    r.isRelative = function(e) {
        return !this.isAbsolute(e)
    }
    ,
    r.resolve = function() {
        var e = this.join.apply(this, arguments);
        return i.href = e,
        i.href
    }
    ,
    r.dirname = function(e) {
        return e.split("/").slice(0, -1).join("/")
    }
    ,
    r.basename = function(e, t) {
        var n = e.split("/").pop();
        return t && this.extname(n) === t && (n = n.slice(0, -t.length)),
        n
    }
    ,
    r.extname = function(e) {
        return e.substr(e.lastIndexOf("."))
    }
    ,
    r.join = function(t) {
        var n, i, r, t = Array.prototype.slice.call(arguments, 0), s = [], a = "", o = !1;
        for (r = t.length - 1; r >= 0; r--)
            if (i = t[r],
            this.isAbsolute(i)) {
                var l = i.match(e);
                l ? (a = l[1] || location.protocol,
                t[r] = t[r].substr(l[0].length)) : (o = !0,
                t[r] = t[r].substr(1));
                break
            }
        0 > r && (r = 0);
        for (var u = t.length; u > r; r++) {
            i = t[r],
            n = i.split(/[\/\\]/g);
            for (var c = 0, h = n.length; h > c; c++)
                ".." === n[c] ? s.pop() : "." !== n[c] && "" !== n[c] && s.push(n[c])
        }
        return a ? a + "//" + s.join("/") : o ? "/" + s.join("/") : s.join("/")
    }
    ,
    r
}),
define("../../core/manager/page/./PagePath", ["require", "underscore", "core/utils/url"], function(e) {
    var t = e("underscore")
      , n = e("core/utils/url")
      , i = "/"
      , r = "*"
      , s = function(e, r) {
        if (e.$isPagePath) {
            if (r) {
                var s = e.concat();
                s.patternMatches = e.patternMatches,
                s.matchedPath = e.matchedPath,
                s.query = e.query,
                e = t.extend(s, a)
            }
            return e
        }
        e.charAt(0) !== i && (e = i + e);
        var o = n.parse(e, !0);
        return e = t.filter(o.pathname.split(i), function(e) {
            return "" !== e
        }),
        t.extend(e, {
            patternMatches: {},
            matchedPath: null ,
            query: o.query
        }, a),
        e
    }
      , a = {
        $isPagePath: !0,
        getPatternCount: function() {
            return t.reduce(this, function(e, t) {
                return e + (t === r || ":" === t.charAt(0) ? 1 : 0)
            }, 0)
        },
        compareTo: function(e) {
            if (e = s(e),
            this.length > e.length)
                return -1;
            if (this.length < e.length)
                return 1;
            for (var t = 0, n = this.length; n > t; t++) {
                if (this[t] !== r && e[t] === r)
                    return -1;
                if (this[t] === r && e[t] !== r)
                    return 1
            }
            return 0
        },
        equals: function(e) {
            return s(e).toString() === this.toString()
        },
        hasPatternMatch: function(e) {
            return e = s(e),
            e.length !== this.length ? null  : t.every(e, function(e, t) {
                return e === r || this[t] !== r && e === this[t]
            }, this)
        },
        patternMatch: function(e) {
            if (e = s(e),
            e.length !== this.length)
                return null ;
            var n = {}
              , i = t.every(e, function(e, t) {
                if (":" === e.charAt(0)) {
                    var i = e.substr(1);
                    return n[i] = this[t],
                    !0
                }
                return e === r ? ((n._ || (n._ = [])).push(this[t]),
                !0) : this[t] !== r && e === this[t]
            }, this);
            if (!i)
                return null ;
            var a = s(this, !0);
            return a.matchedPath = e,
            a.patternMatches = t.extend(a.patternMatches, n),
            a
        },
        convert: function(e) {
            var n = 0
              , i = s(e, !0);
            return t.each(i, function(e, s) {
                if (":" === e.charAt(0)) {
                    var a = e.substr(1);
                    t.has(this.patternMatches, a) && (i[s] = this.patternMatches[a])
                } else
                    e === r && n < this.patternMatches._.length && (i[s] = this.patternMatches._[n++])
            }, this),
            i
        },
        toString: function() {
            return this.join(i)
        },
        valueOf: function() {
            return this.toString()
        }
    };
    return s
}),
define("../../core/manager/page/PageManager", ["require", "underscore", "./PagePath", "backbone"], function(e) {
    var t = e("underscore")
      , n = e("./PagePath")
      , i = e("backbone").Events
      , r = function(e, n, i) {
        this.path = e,
        this.factory = n,
        this.factory.prototype.port = t.extend({}, Backbone.Events),
        this.factoryOptions = i || {}
    }
    ;
    r.prototype.sendMessage = function(e) {
        this.factory.prototype.port.trigger("message", e)
    }
    ,
    r.prototype.createInstance = function(e, n) {
        var i = new Backbone.Model({
            path: e,
            args: n
        });
        if (this.factoryOptions.model)
            throw "You are not allowed to overwrite the model of a pageview";
        var r = t.extend({
            model: i
        }, this.factoryOptions);
        return new this.factory(r)
    }
    ;
    var s = function() {
        this._pageDescriptorsSorted = [],
        this._needsSorting = !1,
        this._pagePath = null ,
        this._newPagePath = null ,
        this._pageArgs = null ,
        this._history = [],
        this._delayedPageChange = !1,
        this._redirectedPage = null ,
        this._historyPageChange = !1
    }
    ;
    return s.prototype = {
        constructor: s,
        historyLength: 20,
        register: function(e, i, s) {
            if ("string" != typeof e && !t.isArray(e))
                throw "Path should be a string";
            if (!i)
                throw "No page view function given";
            if (!i.prototype.$isPageView)
                throw "Given factory should be a BasicPageView (function not instance)";
            return s = s || {},
            t.isArray(e) || (e = [e]),
            t.each(e, function(e) {
                e = n(e);
                var t = s && "string" == typeof s.el && "#" === s.el.charAt(0) && e.getPatternCount() > 0;
                t && console.warn("You are targeting the element " + s.el + " with dynamic pages. You should use ." + s.el.substr(1) + " as options.el instead."),
                this._pageDescriptorsSorted.push(new r(e,i,s))
            }, this),
            this._needsSorting = !0,
            this
        },
        delayPageChange: function() {
            this._delayedPageChange = !0
        },
        redirectPage: function(e) {
            this._redirectedPage = e
        },
        createPageView: function(e, t) {
            return this._getDescriptorByPathOrThrow(e).createInstance(e, t)
        },
        getAllRegisteredPaths: function() {
            return t.map(this._pageDescriptorsSorted, function(e) {
                return e.path.toString()
            })
        },
        getAllRegisteredPages: function() {
            return this._pageDescriptorsSorted.concat()
        },
        getPreviousPage: function() {
            return this._history.length ? this._history[this._history.length - 1] : null 
        },
        getPageArgs: function() {
            return this._pageArgs
        },
        getPagePath: function() {
            return this._pagePath
        },
        sendMessage: function(e, t) {
            this._getDescriptorByPathOrThrow(e).sendMessage(t)
        },
        gotoPreviousPage: function(e) {
            this._history.length && (this._historyPageChange = !0,
            this.gotoPage(this._history.pop(), e))
        },
        gotoPage: function(e, t) {
            if (e = n(e),
            !this._equalsCurrentPage(e)) {
                this._sortPagesByPriority();
                var i = this._getDescriptorByPathOrThrow(e);
                return this._pageArgs = t,
                this._newPagePath = e.patternMatch(i.path),
                this._delayedPageChange = !1,
                this._redirectedPage = null ,
                this.trigger("beforepagechange", this._pagePath, this._newPagePath),
                this._redirectedPage ? (this.gotoPage(this._redirectedPage),
                void 0) : (this._delayedPageChange || this._commitPageChange(),
                void 0)
            }
        },
        commitPageChange: function() {
            this._delayedPageChange && this._commitPageChange()
        },
        _commitPageChange: function() {
            if (!this._historyPageChange && this._pagePath)
                for (this._history.push(this._pagePath); this._history.length > this.historyLength; )
                    this._history.shift();
            this._historyPageChange = !1,
            this._delayedPageChange = !1,
            this._redirectedPage = null ,
            this._pagePath = this._newPagePath,
            this._newPagePath = null ,
            this.trigger("afterpagechange", this._pagePath)
        },
        _sortPagesByPriority: function() {
            this._needsSorting && (this._pageDescriptorsSorted.sort(function(e, t) {
                return e.path.compareTo(t.path)
            }),
            this._needsSorting = !1)
        },
        _equalsCurrentPage: function(e) {
            return this._pagePath && this._pagePath.equals(e) || this._newPagePath && this._newPagePath.equals(e)
        },
        _getDescriptorByPath: function(e) {
            return t.find(this._pageDescriptorsSorted, function(t) {
                return e.hasPatternMatch(t.path)
            })
        },
        _getDescriptorByPathOrThrow: function(e) {
            var t = this._getDescriptorByPath(e);
            if (!t)
                throw "There is no page that matches this path : " + e;
            return t
        }
    },
    t.extend(s.prototype, i),
    s
}),
define("../../core/manager/page/PageRouter", ["require", "underscore", "./PagePath", "backbone"], function(e) {
    var t = e("underscore")
      , n = e("./PagePath")
      , i = e("backbone")
      , r = function(e, i) {
        t.extend(this, t.pick(i || {}, "defaultPage", "prefix", "includePages", "urlToPageMapping", "notFoundPage")),
        this.pageManager = e,
        this._mappingList = t.map(this.urlToPageMapping, function(e, t) {
            return {
                pagePath: n(e),
                url: n(t)
            }
        }).sort(function(e, t) {
            return e.pagePath.compareTo(t.pagePath)
        })
    }
    ;
    return r.prototype = {
        constructor: r,
        pageManager: null ,
        defaultPage: "home",
        prefix: "",
        urlToPathMapping: null ,
        notFoundPage: "notFound",
        includePages: "all",
        _pathToUrlMapping: null ,
        _oldGotoPage: null ,
        _getMappingForURL: function(e) {
            return t.find(this._mappingList, function(t) {
                return e.hasPatternMatch(t.url)
            })
        },
        _getMappingForPagePath: function(e) {
            return t.find(this._mappingList, function(t) {
                return e.hasPatternMatch(t.pagePath)
            })
        },
        _isIncludedInRoute: function(e) {
            var n = this.includePages;
            return "all" === n && (n = this.pageManager.getAllRegisteredPaths()),
            t.some(n, function(t) {
                return e.hasPatternMatch(t)
            })
        },
        _routeOtherPages: function(e) {
            e = n(e);
            var i, r = this._getMappingForURL(e);
            if (r) {
                var s = e.patternMatch(r.url);
                i = s.convert(r.pagePath)
            } else
                i = e;
            if (this._isIncludedInRoute(i))
                this._oldGotoPage(i, {
                    router: !0
                });
            else {
                var a = t.isFunction(this.notFoundPage) ? this.notFoundPage(i) : this.notFoundPage;
                a && this.pageManager.gotoPage(this.notFoundPage)
            }
        },
        _routeDefaultPage: function() {
            this._oldGotoPage(this.defaultPage)
        },
        _gotoPage: function(e, t) {
            e = n(e);
            var i = !0;
            if (!this._isIncludedInRoute(e))
                return this._oldGotoPage(e, t);
            t && (this._oldGotoPage(e, t),
            i = !1);
            var r, s = this._getMappingForPagePath(e);
            if (s) {
                var a = e.patternMatch(s.pagePath);
                r = a.convert(s.url)
            } else
                r = e;
            this._router.navigate(this.prefix + r, {
                trigger: i
            })
        },
        start: function() {
            if (this.pageManager.gotoPageSilent)
                throw "A PageRouter can only be applied once to a manager";
            this._oldGotoPage = t.bind(this.pageManager.constructor.prototype.gotoPage, this.pageManager),
            this._router = new i.Router,
            this._router.route("", "page", t.bind(this._routeDefaultPage, this));
            var e = new RegExp("^" + this.prefix + "/?(.+)/?");
            this._router.route(e, "page", t.bind(this._routeOtherPages, this)),
            this.pageManager.gotoPageSilent = this._oldGotoPage,
            this.pageManager.gotoPage = t.bind(this._gotoPage, this)
        }
    },
    r
}),
define("router/MainRouter", ["require", "underscore", "backbone"], function(e) {
    var t = (e("underscore"),
    e("backbone"));
    return t.Router.extend({
        routes: {
            no: "no",
            propose: "propose"
        },
        no: function() {
            App.pages.gotoPage("app", {
                flow: "declined"
            })
        },
        propose: function() {
            console.log("router propose"),
            App.settings.group ? App.pages.gotoPage("propose", {
                flow: "joined"
            }) : App.pages.gotoPage("home", {})
        }
    })
});
var WheelIndicator = function(e, t) {
    function n(e) {
        this._options = u(h, e),
        this._deltaArray = [0, 0, 0],
        this._isAcceleration = !1,
        this._isStopped = !0,
        this._direction = "",
        this._timer = "",
        this._isWorking = !0;
        var t = this;
        this._wheelHandler = function(e) {
            t._isWorking && (s.call(t, e),
            t._options.preventMouse && r(e))
        }
        ,
        o(this._options.elem, c, this._wheelHandler)
    }
    function i(e) {
        e.direction = this._direction,
        this._options.callback.call(this, e)
    }
    function r(t) {
        t = t || e.event,
        t.preventDefault ? t.preventDefault() : t.returnValue = !1
    }
    function s(e) {
        var t = this
          , n = d(e);
        if (0 !== n) {
            var r, s, o = n > 0 ? "down" : "up", l = t._deltaArray.length, u = !1, c = 0;
            for (clearTimeout(t._timer),
            t._timer = setTimeout(function() {
                t._deltaArray = [0, 0, 0],
                t._isStopped = !0,
                t._direction = o
            }, 150),
            s = 0; l > s; s++)
                0 !== t._deltaArray[s] && (t._deltaArray[s] > 0 ? ++c : --c);
            Math.abs(c) === l && (r = c > 0 ? "down" : "up",
            r !== t._direction && (u = !0,
            t._direction = o)),
            t._isStopped || (u ? (t._isAcceleration = !0,
            i.call(this, e)) : Math.abs(c) === l && a.call(this, e)),
            t._isStopped && (t._isStopped = !1,
            t._isAcceleration = !0,
            t._direction = o,
            i.call(this, e)),
            t._deltaArray.shift(),
            t._deltaArray.push(n)
        }
    }
    function a(e) {
        var t = Math.abs(this._deltaArray[0])
          , n = Math.abs(this._deltaArray[1])
          , r = Math.abs(this._deltaArray[2])
          , s = Math.abs(d(e));
        s > r && r > n && n > t && (this._isAcceleration || (i.call(this, e),
        this._isAcceleration = !0)),
        r > s && n >= r && (this._isAcceleration = !1)
    }
    function o(e, t, n) {
        e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent && e.attachEvent("on" + t, n)
    }
    function l(e, t, n) {
        e.removeEventListener ? e.removeEventListener(t, n, !1) : e.detachEvent && e.detachEvent("on" + t, n)
    }
    function u(e, t) {
        var n, i = {};
        for (n in e)
            Object.prototype.hasOwnProperty.call(e, n) && (i[n] = e[n]);
        for (n in t)
            Object.prototype.hasOwnProperty.call(t, n) && (i[n] = t[n]);
        return i
    }
    var c = "onwheel" in t ? "wheel" : "mousewheel"
      , h = {
        callback: function() {},
        elem: t,
        preventMouse: !0
    };
    n.prototype = {
        constructor: n,
        turnOn: function() {
            return this._isWorking = !0,
            this
        },
        turnOff: function() {
            return this._isWorking = !1,
            this
        },
        setOptions: function(e) {
            return this._options = u(this._options, e),
            this
        },
        getOption: function(e) {
            var t = this._options[e];
            if (void 0 !== t)
                return t;
            throw new Error("Unknown option")
        },
        destroy: function() {
            return l(this._options.elem, c, this._wheelHandler),
            this
        }
    };
    var d = function(e) {
        return d = e.wheelDelta && !e.deltaY ? function(e) {
            return -1 * e.wheelDelta
        }
         : function(e) {
            return e.deltaY
        }
        ,
        d(e)
    }
    ;
    return n
}(window, document);
"object" == typeof exports && (module.exports = WheelIndicator),
define("wheelindicator", function(e) {
    return function() {
        var t;
        return t || e.WheelIndicator
    }
}(this)),
define("../../core/utils/dateTime", ["require"], function() {
    var e = {};
    e.MONTHS_NL = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"],
    e.MONTHS_EN = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"],
    e.time = function() {
        var e = window.performance ? window.performance.now || window.performance.webkitNow || window.performance.mozNow : null ;
        return e ? e.bind(window.performance) : Date.now || function() {
            return +new Date
        }
    }(),
    e.dateDiff = function(e, t) {
        return new Date(Math.abs(t.valueOf() - e.valueOf()))
    }
    ,
    e.parseTimestamp = function(e) {
        return new Date(1e3 * parseInt(e, 10))
    }
    ,
    e.parseIsoDate = function(e) {
        var t = e.split(" ")
          , n = t[0].split("-")
          , i = t.length > 1 ? t[1].split(":") : null 
          , r = new Date;
        return r.setDate(parseInt(n[2], 10)),
        r.setMonth(parseInt(n[1], 10) - 1),
        r.setFullYear(parseInt(n[0], 10)),
        i ? (r.setHours(parseInt(i[0], 10)),
        r.setMinutes(parseInt(i[1], 10)),
        r.setSeconds(parseInt(i[2], 10))) : (r.setHours(0),
        r.setMinutes(0),
        r.setSeconds(0)),
        r
    }
    ,
    e.formatTimeStamp = function(e) {
        e = Math.round(e);
        var t = e / 3600 >> 0
          , n = (e / 60 >> 0) % 60
          , i = e % 60;
        return (10 > t ? "0" : "") + t + ":" + (10 > n ? "0" : "") + n + ":" + (10 > i ? "0" : "") + i
    }
    ,
    e.getDateLong = function(t, n) {
        return n instanceof Array || (n = e.MONTHS_NL),
        t.getDate() + " " + n[t.getMonth()] + " " + t.getFullYear()
    }
    ,
    e.getDateShort = function(e, t) {
        t || (t = "-");
        var n = e.getMonth() + 1
          , i = e.getDate();
        return [10 > i ? "0" + i : i, 10 > n ? "0" + n : n, e.getFullYear()].join(t)
    }
    ;
    var t = []
      , n = !1;
    return window.addEventListener && window.addEventListener("message", function(e) {
        if (e.source == window && "nexttick" == e.data) {
            for (var i, r = 0; i = t[r]; r++)
                i();
            t.length = 0,
            n = !1
        }
    }, !1),
    e.nextTick = function(e) {
        return setTimeout(e, 0)
    }
    ,
    e
}),
define("view/MobileSliderView", ["require", "backbone", "core/utils/dateTime"], function(e) {
    var t = e("backbone")
      , n = e("core/utils/dateTime").time;
    return t.View.extend({
        touchEventsSet: !1,
        initialize: function() {
            this.lastTouchPoint = null ,
            this.startTouchTime = 0,
            this.velocityYTotal = 0,
            this.prevLastSectionScroll = 0,
            this.currentAnimation = $.when(),
            this.touchEventsSet || this.setTouchEvents()
        },
        setTouchEvents: function() {
            $(".js-container-main").on("touchstart", _.bind(this.onTouchStart, this)).on("touchmove", _.bind(this.onTouchMove, this)).on("touchend", _.bind(this.onTouchEnd, this)),
            this.touchEventsSet = !0
        },
        onTouchStart: function(e) {
            if (("about" == App.pages.getPagePath().toString() || App.pageSwapper.getPageView().scrollToAboutPossible) && ("home" != App.pages.getPagePath().toString() || App.introShown)) {
                var t = e.originalEvent.changedTouches[0];
                this.lastTouchPoint = {
                    x: t.pageX,
                    y: t.pageY
                },
                this.startTouchTime = n()
            }
        },
        onTouchEnd: function() {
            if (("about" == App.pages.getPagePath().toString() || App.pageSwapper.getPageView().scrollToAboutPossible) && ("home" != App.pages.getPagePath().toString() || App.introShown)) {
                var e = n() - this.startTouchTime
                  , t = -this.velocityYTotal / e;
                t > .15 ? App.aboutVisible ? App.pageSwapper.getPageView().gotoSection("down") : App.pageSwapper.getPageView().gotoAbout() : -.15 > t && App.aboutVisible && App.pageSwapper.getPageView().gotoSection("up"),
                this.velocityYTotal = 0,
                this.lastTouchPoint = null 
            }
        },
        onTouchMove: function(e) {
            if ("about" != App.pages.getPagePath().toString() && App.pageSwapper.getPageView().scrollToAboutPossible && e.preventDefault(),
            ("about" == App.pages.getPagePath().toString() || App.pageSwapper.getPageView().scrollToAboutPossible) && ("home" != App.pages.getPagePath().toString() || App.introShown)) {
                var t = e.originalEvent.changedTouches[0]
                  , n = {
                    x: t.pageX,
                    y: t.pageY
                };
                this.velocityYTotal += n.y - this.lastTouchPoint.y;
                var i = n.y > this.lastTouchPoint.y;
                if (App.aboutVisible) {
                    var r = 0 === App.pageSwapper.getPageView().$lastSection.scrollTop();
                    App.pageSwapper.getPageView().curSection < App.pageSwapper.getPageView().totalSections || r && i ? e.preventDefault() : App.pageSwapper.getPageView().curSection === App.pageSwapper.getPageView().totalSections && (this.velocityYTotal *= .01)
                }
                this.lastTouchPoint = n
            }
        }
    })
}),
!function(e, t) {
    var n = e.GreenSockGlobals = e.GreenSockGlobals || e;
    if (!n.TweenLite) {
        var i, r, s, a, o, l = function(e) {
            var t, i = e.split("."), r = n;
            for (t = 0; t < i.length; t++)
                r[i[t]] = r = r[i[t]] || {};
            return r
        }
        , u = l("com.greensock"), c = 1e-10, h = function(e) {
            var t, n = [], i = e.length;
            for (t = 0; t !== i; n.push(e[t++]))
                ;
            return n
        }
        , d = function() {}
        , p = function() {
            var e = Object.prototype.toString
              , t = e.call([]);
            return function(n) {
                return null  != n && (n instanceof Array || "object" == typeof n && !!n.push && e.call(n) === t)
            }
        }(), f = {}, g = function(i, r, s, a) {
            this.sc = f[i] ? f[i].sc : [],
            f[i] = this,
            this.gsClass = null ,
            this.func = s;
            var o = [];
            this.check = function(u) {
                for (var c, h, d, p, m, v = r.length, _ = v; --v > -1; )
                    (c = f[r[v]] || new g(r[v],[])).gsClass ? (o[v] = c.gsClass,
                    _--) : u && c.sc.push(this);
                if (0 === _ && s)
                    for (h = ("com.greensock." + i).split("."),
                    d = h.pop(),
                    p = l(h.join("."))[d] = this.gsClass = s.apply(s, o),
                    a && (n[d] = p,
                    m = "undefined" != typeof module && module.exports,
                    !m && "function" == typeof define && define.amd ? define((e.GreenSockAMDPath ? e.GreenSockAMDPath + "/" : "") + i.split(".").pop(), [], function() {
                        return p
                    }) : i === t && m && (module.exports = p)),
                    v = 0; v < this.sc.length; v++)
                        this.sc[v].check()
            }
            ,
            this.check(!0)
        }
        , m = e._gsDefine = function(e, t, n, i) {
            return new g(e,t,n,i)
        }
        , v = u._class = function(e, t, n) {
            return t = t || function() {}
            ,
            m(e, [], function() {
                return t
            }, n),
            t
        }
        ;
        m.globals = n;
        var _ = [0, 0, 1, 1]
          , y = []
          , b = v("easing.Ease", function(e, t, n, i) {
            this._func = e,
            this._type = n || 0,
            this._power = i || 0,
            this._params = t ? _.concat(t) : _
        }, !0)
          , w = b.map = {}
          , x = b.register = function(e, t, n, i) {
            for (var r, s, a, o, l = t.split(","), c = l.length, h = (n || "easeIn,easeOut,easeInOut").split(","); --c > -1; )
                for (s = l[c],
                r = i ? v("easing." + s, null , !0) : u.easing[s] || {},
                a = h.length; --a > -1; )
                    o = h[a],
                    w[s + "." + o] = w[o + s] = r[o] = e.getRatio ? e : e[o] || new e
        }
        ;
        for (s = b.prototype,
        s._calcEnd = !1,
        s.getRatio = function(e) {
            if (this._func)
                return this._params[0] = e,
                this._func.apply(null , this._params);
            var t = this._type
              , n = this._power
              , i = 1 === t ? 1 - e : 2 === t ? e : .5 > e ? 2 * e : 2 * (1 - e);
            return 1 === n ? i *= i : 2 === n ? i *= i * i : 3 === n ? i *= i * i * i : 4 === n && (i *= i * i * i * i),
            1 === t ? 1 - i : 2 === t ? i : .5 > e ? i / 2 : 1 - i / 2
        }
        ,
        i = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"],
        r = i.length; --r > -1; )
            s = i[r] + ",Power" + r,
            x(new b(null ,null ,1,r), s, "easeOut", !0),
            x(new b(null ,null ,2,r), s, "easeIn" + (0 === r ? ",easeNone" : "")),
            x(new b(null ,null ,3,r), s, "easeInOut");
        w.linear = u.easing.Linear.easeIn,
        w.swing = u.easing.Quad.easeInOut;
        var T = v("events.EventDispatcher", function(e) {
            this._listeners = {},
            this._eventTarget = e || this
        });
        s = T.prototype,
        s.addEventListener = function(e, t, n, i, r) {
            r = r || 0;
            var s, l, u = this._listeners[e], c = 0;
            for (null  == u && (this._listeners[e] = u = []),
            l = u.length; --l > -1; )
                s = u[l],
                s.c === t && s.s === n ? u.splice(l, 1) : 0 === c && s.pr < r && (c = l + 1);
            u.splice(c, 0, {
                c: t,
                s: n,
                up: i,
                pr: r
            }),
            this !== a || o || a.wake()
        }
        ,
        s.removeEventListener = function(e, t) {
            var n, i = this._listeners[e];
            if (i)
                for (n = i.length; --n > -1; )
                    if (i[n].c === t)
                        return void i.splice(n, 1)
        }
        ,
        s.dispatchEvent = function(e) {
            var t, n, i, r = this._listeners[e];
            if (r)
                for (t = r.length,
                n = this._eventTarget; --t > -1; )
                    i = r[t],
                    i && (i.up ? i.c.call(i.s || n, {
                        type: e,
                        target: n
                    }) : i.c.call(i.s || n))
        }
        ;
        var P = e.requestAnimationFrame
          , S = e.cancelAnimationFrame
          , k = Date.now || function() {
            return (new Date).getTime()
        }
          , A = k();
        for (i = ["ms", "moz", "webkit", "o"],
        r = i.length; --r > -1 && !P; )
            P = e[i[r] + "RequestAnimationFrame"],
            S = e[i[r] + "CancelAnimationFrame"] || e[i[r] + "CancelRequestAnimationFrame"];
        v("Ticker", function(e, t) {
            var n, i, r, s, l, u = this, h = k(), p = t !== !1 && P ? "auto" : !1, f = 500, g = 33, m = "tick", v = function(e) {
                var t, a, o = k() - A;
                o > f && (h += o - g),
                A += o,
                u.time = (A - h) / 1e3,
                t = u.time - l,
                (!n || t > 0 || e === !0) && (u.frame++,
                l += t + (t >= s ? .004 : s - t),
                a = !0),
                e !== !0 && (r = i(v)),
                a && u.dispatchEvent(m)
            }
            ;
            T.call(u),
            u.time = u.frame = 0,
            u.tick = function() {
                v(!0)
            }
            ,
            u.lagSmoothing = function(e, t) {
                f = e || 1 / c,
                g = Math.min(t, f, 0)
            }
            ,
            u.sleep = function() {
                null  != r && (p && S ? S(r) : clearTimeout(r),
                i = d,
                r = null ,
                u === a && (o = !1))
            }
            ,
            u.wake = function(e) {
                null  !== r ? u.sleep() : e ? h += -A + (A = k()) : u.frame > 10 && (A = k() - f + 5),
                i = 0 === n ? d : p && P ? P : function(e) {
                    return setTimeout(e, 0 | 1e3 * (l - u.time) + 1)
                }
                ,
                u === a && (o = !0),
                v(2)
            }
            ,
            u.fps = function(e) {
                return arguments.length ? (n = e,
                s = 1 / (n || 60),
                l = this.time + s,
                void u.wake()) : n
            }
            ,
            u.useRAF = function(e) {
                return arguments.length ? (u.sleep(),
                p = e,
                void u.fps(n)) : p
            }
            ,
            u.fps(e),
            setTimeout(function() {
                "auto" === p && u.frame < 5 && "hidden" !== document.visibilityState && u.useRAF(!1)
            }, 1500)
        }),
        s = u.Ticker.prototype = new u.events.EventDispatcher,
        s.constructor = u.Ticker;
        var C = v("core.Animation", function(e, t) {
            if (this.vars = t = t || {},
            this._duration = this._totalDuration = e || 0,
            this._delay = Number(t.delay) || 0,
            this._timeScale = 1,
            this._active = t.immediateRender === !0,
            this.data = t.data,
            this._reversed = t.reversed === !0,
            X) {
                o || a.wake();
                var n = this.vars.useFrames ? G : X;
                n.add(this, n._time),
                this.vars.paused && this.paused(!0)
            }
        });
        a = C.ticker = new u.Ticker,
        s = C.prototype,
        s._dirty = s._gc = s._initted = s._paused = !1,
        s._totalTime = s._time = 0,
        s._rawPrevTime = -1,
        s._next = s._last = s._onUpdate = s._timeline = s.timeline = null ,
        s._paused = !1;
        var j = function() {
            o && k() - A > 2e3 && a.wake(),
            setTimeout(j, 2e3)
        }
        ;
        j(),
        s.play = function(e, t) {
            return null  != e && this.seek(e, t),
            this.reversed(!1).paused(!1)
        }
        ,
        s.pause = function(e, t) {
            return null  != e && this.seek(e, t),
            this.paused(!0)
        }
        ,
        s.resume = function(e, t) {
            return null  != e && this.seek(e, t),
            this.paused(!1)
        }
        ,
        s.seek = function(e, t) {
            return this.totalTime(Number(e), t !== !1)
        }
        ,
        s.restart = function(e, t) {
            return this.reversed(!1).paused(!1).totalTime(e ? -this._delay : 0, t !== !1, !0)
        }
        ,
        s.reverse = function(e, t) {
            return null  != e && this.seek(e || this.totalDuration(), t),
            this.reversed(!0).paused(!1)
        }
        ,
        s.render = function() {}
        ,
        s.invalidate = function() {
            return this._time = this._totalTime = 0,
            this._initted = this._gc = !1,
            this._rawPrevTime = -1,
            (this._gc || !this.timeline) && this._enabled(!0),
            this
        }
        ,
        s.isActive = function() {
            var e, t = this._timeline, n = this._startTime;
            return !t || !this._gc && !this._paused && t.isActive() && (e = t.rawTime()) >= n && e < n + this.totalDuration() / this._timeScale
        }
        ,
        s._enabled = function(e, t) {
            return o || a.wake(),
            this._gc = !e,
            this._active = this.isActive(),
            t !== !0 && (e && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !e && this.timeline && this._timeline._remove(this, !0)),
            !1
        }
        ,
        s._kill = function() {
            return this._enabled(!1, !1)
        }
        ,
        s.kill = function(e, t) {
            return this._kill(e, t),
            this
        }
        ,
        s._uncache = function(e) {
            for (var t = e ? this : this.timeline; t; )
                t._dirty = !0,
                t = t.timeline;
            return this
        }
        ,
        s._swapSelfInParams = function(e) {
            for (var t = e.length, n = e.concat(); --t > -1; )
                "{self}" === e[t] && (n[t] = this);
            return n
        }
        ,
        s._callback = function(e) {
            var t = this.vars;
            t[e].apply(t[e + "Scope"] || t.callbackScope || this, t[e + "Params"] || y)
        }
        ,
        s.eventCallback = function(e, t, n, i) {
            if ("on" === (e || "").substr(0, 2)) {
                var r = this.vars;
                if (1 === arguments.length)
                    return r[e];
                null  == t ? delete r[e] : (r[e] = t,
                r[e + "Params"] = p(n) && -1 !== n.join("").indexOf("{self}") ? this._swapSelfInParams(n) : n,
                r[e + "Scope"] = i),
                "onUpdate" === e && (this._onUpdate = t)
            }
            return this
        }
        ,
        s.delay = function(e) {
            return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + e - this._delay),
            this._delay = e,
            this) : this._delay
        }
        ,
        s.duration = function(e) {
            return arguments.length ? (this._duration = this._totalDuration = e,
            this._uncache(!0),
            this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== e && this.totalTime(this._totalTime * (e / this._duration), !0),
            this) : (this._dirty = !1,
            this._duration)
        }
        ,
        s.totalDuration = function(e) {
            return this._dirty = !1,
            arguments.length ? this.duration(e) : this._totalDuration
        }
        ,
        s.time = function(e, t) {
            return arguments.length ? (this._dirty && this.totalDuration(),
            this.totalTime(e > this._duration ? this._duration : e, t)) : this._time
        }
        ,
        s.totalTime = function(e, t, n) {
            if (o || a.wake(),
            !arguments.length)
                return this._totalTime;
            if (this._timeline) {
                if (0 > e && !n && (e += this.totalDuration()),
                this._timeline.smoothChildTiming) {
                    this._dirty && this.totalDuration();
                    var i = this._totalDuration
                      , r = this._timeline;
                    if (e > i && !n && (e = i),
                    this._startTime = (this._paused ? this._pauseTime : r._time) - (this._reversed ? i - e : e) / this._timeScale,
                    r._dirty || this._uncache(!1),
                    r._timeline)
                        for (; r._timeline; )
                            r._timeline._time !== (r._startTime + r._totalTime) / r._timeScale && r.totalTime(r._totalTime, !0),
                            r = r._timeline
                }
                this._gc && this._enabled(!0, !1),
                (this._totalTime !== e || 0 === this._duration) && (N.length && Y(),
                this.render(e, t, !1),
                N.length && Y())
            }
            return this
        }
        ,
        s.progress = s.totalProgress = function(e, t) {
            var n = this.duration();
            return arguments.length ? this.totalTime(n * e, t) : n ? this._time / n : this.ratio
        }
        ,
        s.startTime = function(e) {
            return arguments.length ? (e !== this._startTime && (this._startTime = e,
            this.timeline && this.timeline._sortChildren && this.timeline.add(this, e - this._delay)),
            this) : this._startTime
        }
        ,
        s.endTime = function(e) {
            return this._startTime + (0 != e ? this.totalDuration() : this.duration()) / this._timeScale
        }
        ,
        s.timeScale = function(e) {
            if (!arguments.length)
                return this._timeScale;
            if (e = e || c,
            this._timeline && this._timeline.smoothChildTiming) {
                var t = this._pauseTime
                  , n = t || 0 === t ? t : this._timeline.totalTime();
                this._startTime = n - (n - this._startTime) * this._timeScale / e
            }
            return this._timeScale = e,
            this._uncache(!1)
        }
        ,
        s.reversed = function(e) {
            return arguments.length ? (e != this._reversed && (this._reversed = e,
            this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)),
            this) : this._reversed
        }
        ,
        s.paused = function(e) {
            if (!arguments.length)
                return this._paused;
            var t, n, i = this._timeline;
            return e != this._paused && i && (o || e || a.wake(),
            t = i.rawTime(),
            n = t - this._pauseTime,
            !e && i.smoothChildTiming && (this._startTime += n,
            this._uncache(!1)),
            this._pauseTime = e ? t : null ,
            this._paused = e,
            this._active = this.isActive(),
            !e && 0 !== n && this._initted && this.duration() && (t = i.smoothChildTiming ? this._totalTime : (t - this._startTime) / this._timeScale,
            this.render(t, t === this._totalTime, !0))),
            this._gc && !e && this._enabled(!0, !1),
            this
        }
        ;
        var O = v("core.SimpleTimeline", function(e) {
            C.call(this, 0, e),
            this.autoRemoveChildren = this.smoothChildTiming = !0
        });
        s = O.prototype = new C,
        s.constructor = O,
        s.kill()._gc = !1,
        s._first = s._last = s._recent = null ,
        s._sortChildren = !1,
        s.add = s.insert = function(e, t) {
            var n, i;
            if (e._startTime = Number(t || 0) + e._delay,
            e._paused && this !== e._timeline && (e._pauseTime = e._startTime + (this.rawTime() - e._startTime) / e._timeScale),
            e.timeline && e.timeline._remove(e, !0),
            e.timeline = e._timeline = this,
            e._gc && e._enabled(!0, !0),
            n = this._last,
            this._sortChildren)
                for (i = e._startTime; n && n._startTime > i; )
                    n = n._prev;
            return n ? (e._next = n._next,
            n._next = e) : (e._next = this._first,
            this._first = e),
            e._next ? e._next._prev = e : this._last = e,
            e._prev = n,
            this._recent = e,
            this._timeline && this._uncache(!0),
            this
        }
        ,
        s._remove = function(e, t) {
            return e.timeline === this && (t || e._enabled(!1, !0),
            e._prev ? e._prev._next = e._next : this._first === e && (this._first = e._next),
            e._next ? e._next._prev = e._prev : this._last === e && (this._last = e._prev),
            e._next = e._prev = e.timeline = null ,
            e === this._recent && (this._recent = this._last),
            this._timeline && this._uncache(!0)),
            this
        }
        ,
        s.render = function(e, t, n) {
            var i, r = this._first;
            for (this._totalTime = this._time = this._rawPrevTime = e; r; )
                i = r._next,
                (r._active || e >= r._startTime && !r._paused) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (e - r._startTime) * r._timeScale, t, n) : r.render((e - r._startTime) * r._timeScale, t, n)),
                r = i
        }
        ,
        s.rawTime = function() {
            return o || a.wake(),
            this._totalTime
        }
        ;
        var M = v("TweenLite", function(t, n, i) {
            if (C.call(this, n, i),
            this.render = M.prototype.render,
            null  == t)
                throw "Cannot tween a null target.";
            this.target = t = "string" != typeof t ? t : M.selector(t) || t;
            var r, s, a, o = t.jquery || t.length && t !== e && t[0] && (t[0] === e || t[0].nodeType && t[0].style && !t.nodeType), l = this.vars.overwrite;
            if (this._overwrite = l = null  == l ? U[M.defaultOverwrite] : "number" == typeof l ? l >> 0 : U[l],
            (o || t instanceof Array || t.push && p(t)) && "number" != typeof t[0])
                for (this._targets = a = h(t),
                this._propLookup = [],
                this._siblings = [],
                r = 0; r < a.length; r++)
                    s = a[r],
                    s ? "string" != typeof s ? s.length && s !== e && s[0] && (s[0] === e || s[0].nodeType && s[0].style && !s.nodeType) ? (a.splice(r--, 1),
                    this._targets = a = a.concat(h(s))) : (this._siblings[r] = Q(s, this, !1),
                    1 === l && this._siblings[r].length > 1 && Z(s, this, null , 1, this._siblings[r])) : (s = a[r--] = M.selector(s),
                    "string" == typeof s && a.splice(r + 1, 1)) : a.splice(r--, 1);
            else
                this._propLookup = {},
                this._siblings = Q(t, this, !1),
                1 === l && this._siblings.length > 1 && Z(t, this, null , 1, this._siblings);
            (this.vars.immediateRender || 0 === n && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -c,
            this.render(-this._delay))
        }, !0)
          , E = function(t) {
            return t && t.length && t !== e && t[0] && (t[0] === e || t[0].nodeType && t[0].style && !t.nodeType)
        }
          , D = function(e, t) {
            var n, i = {};
            for (n in e)
                H[n] || n in t && "transform" !== n && "x" !== n && "y" !== n && "width" !== n && "height" !== n && "className" !== n && "border" !== n || !(!$[n] || $[n] && $[n]._autoCSS) || (i[n] = e[n],
                delete e[n]);
            e.css = i
        }
        ;
        s = M.prototype = new C,
        s.constructor = M,
        s.kill()._gc = !1,
        s.ratio = 0,
        s._firstPT = s._targets = s._overwrittenProps = s._startAt = null ,
        s._notifyPluginsOfEnabled = s._lazy = !1,
        M.version = "1.18.2",
        M.defaultEase = s._ease = new b(null ,null ,1,1),
        M.defaultOverwrite = "auto",
        M.ticker = a,
        M.autoSleep = 120,
        M.lagSmoothing = function(e, t) {
            a.lagSmoothing(e, t)
        }
        ,
        M.selector = e.$ || e.jQuery || function(t) {
            var n = e.$ || e.jQuery;
            return n ? (M.selector = n,
            n(t)) : "undefined" == typeof document ? t : document.querySelectorAll ? document.querySelectorAll(t) : document.getElementById("#" === t.charAt(0) ? t.substr(1) : t)
        }
        ;
        var N = []
          , I = {}
          , L = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi
          , R = function(e) {
            for (var t, n = this._firstPT, i = 1e-6; n; )
                t = n.blob ? e ? this.join("") : this.start : n.c * e + n.s,
                n.r ? t = Math.round(t) : i > t && t > -i && (t = 0),
                n.f ? n.fp ? n.t[n.p](n.fp, t) : n.t[n.p](t) : n.t[n.p] = t,
                n = n._next
        }
          , V = function(e, t, n, i) {
            var r, s, a, o, l, u, c, h = [e, t], d = 0, p = "", f = 0;
            for (h.start = e,
            n && (n(h),
            e = h[0],
            t = h[1]),
            h.length = 0,
            r = e.match(L) || [],
            s = t.match(L) || [],
            i && (i._next = null ,
            i.blob = 1,
            h._firstPT = i),
            l = s.length,
            o = 0; l > o; o++)
                c = s[o],
                u = t.substr(d, t.indexOf(c, d) - d),
                p += u || !o ? u : ",",
                d += u.length,
                f ? f = (f + 1) % 5 : "rgba(" === u.substr(-5) && (f = 1),
                c === r[o] || r.length <= o ? p += c : (p && (h.push(p),
                p = ""),
                a = parseFloat(r[o]),
                h.push(a),
                h._firstPT = {
                    _next: h._firstPT,
                    t: h,
                    p: h.length - 1,
                    s: a,
                    c: ("=" === c.charAt(1) ? parseInt(c.charAt(0) + "1", 10) * parseFloat(c.substr(2)) : parseFloat(c) - a) || 0,
                    f: 0,
                    r: f && 4 > f
                }),
                d += c.length;
            return p += t.substr(d),
            p && h.push(p),
            h.setRatio = R,
            h
        }
          , B = function(e, t, n, i, r, s, a, o) {
            var l, u, c = "get" === n ? e[t] : n, h = typeof e[t], d = "string" == typeof i && "=" === i.charAt(1), p = {
                t: e,
                p: t,
                s: c,
                f: "function" === h,
                pg: 0,
                n: r || t,
                r: s,
                pr: 0,
                c: d ? parseInt(i.charAt(0) + "1", 10) * parseFloat(i.substr(2)) : parseFloat(i) - c || 0
            };
            return "number" !== h && ("function" === h && "get" === n && (u = t.indexOf("set") || "function" != typeof e["get" + t.substr(3)] ? t : "get" + t.substr(3),
            p.s = c = a ? e[u](a) : e[u]()),
            "string" == typeof c && (a || isNaN(c)) ? (p.fp = a,
            l = V(c, i, o || M.defaultStringFilter, p),
            p = {
                t: l,
                p: "setRatio",
                s: 0,
                c: 1,
                f: 2,
                pg: 0,
                n: r || t,
                pr: 0
            }) : d || (p.s = parseFloat(c),
            p.c = parseFloat(i) - p.s || 0)),
            p.c ? ((p._next = this._firstPT) && (p._next._prev = p),
            this._firstPT = p,
            p) : void 0
        }
          , F = M._internals = {
            isArray: p,
            isSelector: E,
            lazyTweens: N,
            blobDif: V
        }
          , $ = M._plugins = {}
          , q = F.tweenLookup = {}
          , z = 0
          , H = F.reservedProps = {
            ease: 1,
            delay: 1,
            overwrite: 1,
            onComplete: 1,
            onCompleteParams: 1,
            onCompleteScope: 1,
            useFrames: 1,
            runBackwards: 1,
            startAt: 1,
            onUpdate: 1,
            onUpdateParams: 1,
            onUpdateScope: 1,
            onStart: 1,
            onStartParams: 1,
            onStartScope: 1,
            onReverseComplete: 1,
            onReverseCompleteParams: 1,
            onReverseCompleteScope: 1,
            onRepeat: 1,
            onRepeatParams: 1,
            onRepeatScope: 1,
            easeParams: 1,
            yoyo: 1,
            immediateRender: 1,
            repeat: 1,
            repeatDelay: 1,
            data: 1,
            paused: 1,
            reversed: 1,
            autoCSS: 1,
            lazy: 1,
            onOverwrite: 1,
            callbackScope: 1,
            stringFilter: 1
        }
          , U = {
            none: 0,
            all: 1,
            auto: 2,
            concurrent: 3,
            allOnStart: 4,
            preexisting: 5,
            "true": 1,
            "false": 0
        }
          , G = C._rootFramesTimeline = new O
          , X = C._rootTimeline = new O
          , W = 30
          , Y = F.lazyRender = function() {
            var e, t = N.length;
            for (I = {}; --t > -1; )
                e = N[t],
                e && e._lazy !== !1 && (e.render(e._lazy[0], e._lazy[1], !0),
                e._lazy = !1);
            N.length = 0
        }
        ;
        X._startTime = a.time,
        G._startTime = a.frame,
        X._active = G._active = !0,
        setTimeout(Y, 1),
        C._updateRoot = M.render = function() {
            var e, t, n;
            if (N.length && Y(),
            X.render((a.time - X._startTime) * X._timeScale, !1, !1),
            G.render((a.frame - G._startTime) * G._timeScale, !1, !1),
            N.length && Y(),
            a.frame >= W) {
                W = a.frame + (parseInt(M.autoSleep, 10) || 120);
                for (n in q) {
                    for (t = q[n].tweens,
                    e = t.length; --e > -1; )
                        t[e]._gc && t.splice(e, 1);
                    0 === t.length && delete q[n]
                }
                if (n = X._first,
                (!n || n._paused) && M.autoSleep && !G._first && 1 === a._listeners.tick.length) {
                    for (; n && n._paused; )
                        n = n._next;
                    n || a.sleep()
                }
            }
        }
        ,
        a.addEventListener("tick", C._updateRoot);
        var Q = function(e, t, n) {
            var i, r, s = e._gsTweenID;
            if (q[s || (e._gsTweenID = s = "t" + z++)] || (q[s] = {
                target: e,
                tweens: []
            }),
            t && (i = q[s].tweens,
            i[r = i.length] = t,
            n))
                for (; --r > -1; )
                    i[r] === t && i.splice(r, 1);
            return q[s].tweens
        }
          , J = function(e, t, n, i) {
            var r, s, a = e.vars.onOverwrite;
            return a && (r = a(e, t, n, i)),
            a = M.onOverwrite,
            a && (s = a(e, t, n, i)),
            r !== !1 && s !== !1
        }
          , Z = function(e, t, n, i, r) {
            var s, a, o, l;
            if (1 === i || i >= 4) {
                for (l = r.length,
                s = 0; l > s; s++)
                    if ((o = r[s]) !== t)
                        o._gc || o._kill(null , e, t) && (a = !0);
                    else if (5 === i)
                        break;
                return a
            }
            var u, h = t._startTime + c, d = [], p = 0, f = 0 === t._duration;
            for (s = r.length; --s > -1; )
                (o = r[s]) === t || o._gc || o._paused || (o._timeline !== t._timeline ? (u = u || K(t, 0, f),
                0 === K(o, u, f) && (d[p++] = o)) : o._startTime <= h && o._startTime + o.totalDuration() / o._timeScale > h && ((f || !o._initted) && h - o._startTime <= 2e-10 || (d[p++] = o)));
            for (s = p; --s > -1; )
                if (o = d[s],
                2 === i && o._kill(n, e, t) && (a = !0),
                2 !== i || !o._firstPT && o._initted) {
                    if (2 !== i && !J(o, t))
                        continue;o._enabled(!1, !1) && (a = !0)
                }
            return a
        }
          , K = function(e, t, n) {
            for (var i = e._timeline, r = i._timeScale, s = e._startTime; i._timeline; ) {
                if (s += i._startTime,
                r *= i._timeScale,
                i._paused)
                    return -100;
                i = i._timeline
            }
            return s /= r,
            s > t ? s - t : n && s === t || !e._initted && 2 * c > s - t ? c : (s += e.totalDuration() / e._timeScale / r) > t + c ? 0 : s - t - c
        }
        ;
        s._init = function() {
            var e, t, n, i, r, s = this.vars, a = this._overwrittenProps, o = this._duration, l = !!s.immediateRender, u = s.ease;
            if (s.startAt) {
                this._startAt && (this._startAt.render(-1, !0),
                this._startAt.kill()),
                r = {};
                for (i in s.startAt)
                    r[i] = s.startAt[i];
                if (r.overwrite = !1,
                r.immediateRender = !0,
                r.lazy = l && s.lazy !== !1,
                r.startAt = r.delay = null ,
                this._startAt = M.to(this.target, 0, r),
                l)
                    if (this._time > 0)
                        this._startAt = null ;
                    else if (0 !== o)
                        return
            } else if (s.runBackwards && 0 !== o)
                if (this._startAt)
                    this._startAt.render(-1, !0),
                    this._startAt.kill(),
                    this._startAt = null ;
                else {
                    0 !== this._time && (l = !1),
                    n = {};
                    for (i in s)
                        H[i] && "autoCSS" !== i || (n[i] = s[i]);
                    if (n.overwrite = 0,
                    n.data = "isFromStart",
                    n.lazy = l && s.lazy !== !1,
                    n.immediateRender = l,
                    this._startAt = M.to(this.target, 0, n),
                    l) {
                        if (0 === this._time)
                            return
                    } else
                        this._startAt._init(),
                        this._startAt._enabled(!1),
                        this.vars.immediateRender && (this._startAt = null )
                }
            if (this._ease = u = u ? u instanceof b ? u : "function" == typeof u ? new b(u,s.easeParams) : w[u] || M.defaultEase : M.defaultEase,
            s.easeParams instanceof Array && u.config && (this._ease = u.config.apply(u, s.easeParams)),
            this._easeType = this._ease._type,
            this._easePower = this._ease._power,
            this._firstPT = null ,
            this._targets)
                for (e = this._targets.length; --e > -1; )
                    this._initProps(this._targets[e], this._propLookup[e] = {}, this._siblings[e], a ? a[e] : null ) && (t = !0);
            else
                t = this._initProps(this.target, this._propLookup, this._siblings, a);
            if (t && M._onPluginEvent("_onInitAllProps", this),
            a && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)),
            s.runBackwards)
                for (n = this._firstPT; n; )
                    n.s += n.c,
                    n.c = -n.c,
                    n = n._next;
            this._onUpdate = s.onUpdate,
            this._initted = !0
        }
        ,
        s._initProps = function(t, n, i, r) {
            var s, a, o, l, u, c;
            if (null  == t)
                return !1;
            I[t._gsTweenID] && Y(),
            this.vars.css || t.style && t !== e && t.nodeType && $.css && this.vars.autoCSS !== !1 && D(this.vars, t);
            for (s in this.vars)
                if (c = this.vars[s],
                H[s])
                    c && (c instanceof Array || c.push && p(c)) && -1 !== c.join("").indexOf("{self}") && (this.vars[s] = c = this._swapSelfInParams(c, this));
                else if ($[s] && (l = new $[s])._onInitTween(t, this.vars[s], this)) {
                    for (this._firstPT = u = {
                        _next: this._firstPT,
                        t: l,
                        p: "setRatio",
                        s: 0,
                        c: 1,
                        f: 1,
                        n: s,
                        pg: 1,
                        pr: l._priority
                    },
                    a = l._overwriteProps.length; --a > -1; )
                        n[l._overwriteProps[a]] = this._firstPT;
                    (l._priority || l._onInitAllProps) && (o = !0),
                    (l._onDisable || l._onEnable) && (this._notifyPluginsOfEnabled = !0),
                    u._next && (u._next._prev = u)
                } else
                    n[s] = B.call(this, t, s, "get", c, s, 0, null , this.vars.stringFilter);
            return r && this._kill(r, t) ? this._initProps(t, n, i, r) : this._overwrite > 1 && this._firstPT && i.length > 1 && Z(t, this, n, this._overwrite, i) ? (this._kill(n, t),
            this._initProps(t, n, i, r)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (I[t._gsTweenID] = !0),
            o)
        }
        ,
        s.render = function(e, t, n) {
            var i, r, s, a, o = this._time, l = this._duration, u = this._rawPrevTime;
            if (e >= l - 1e-7)
                this._totalTime = this._time = l,
                this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1,
                this._reversed || (i = !0,
                r = "onComplete",
                n = n || this._timeline.autoRemoveChildren),
                0 === l && (this._initted || !this.vars.lazy || n) && (this._startTime === this._timeline._duration && (e = 0),
                (0 > u || 0 >= e && e >= -1e-7 || u === c && "isPause" !== this.data) && u !== e && (n = !0,
                u > c && (r = "onReverseComplete")),
                this._rawPrevTime = a = !t || e || u === e ? e : c);
            else if (1e-7 > e)
                this._totalTime = this._time = 0,
                this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0,
                (0 !== o || 0 === l && u > 0) && (r = "onReverseComplete",
                i = this._reversed),
                0 > e && (this._active = !1,
                0 === l && (this._initted || !this.vars.lazy || n) && (u >= 0 && (u !== c || "isPause" !== this.data) && (n = !0),
                this._rawPrevTime = a = !t || e || u === e ? e : c)),
                this._initted || (n = !0);
            else if (this._totalTime = this._time = e,
            this._easeType) {
                var h = e / l
                  , d = this._easeType
                  , p = this._easePower;
                (1 === d || 3 === d && h >= .5) && (h = 1 - h),
                3 === d && (h *= 2),
                1 === p ? h *= h : 2 === p ? h *= h * h : 3 === p ? h *= h * h * h : 4 === p && (h *= h * h * h * h),
                this.ratio = 1 === d ? 1 - h : 2 === d ? h : .5 > e / l ? h / 2 : 1 - h / 2
            } else
                this.ratio = this._ease.getRatio(e / l);
            if (this._time !== o || n) {
                if (!this._initted) {
                    if (this._init(),
                    !this._initted || this._gc)
                        return;
                    if (!n && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration))
                        return this._time = this._totalTime = o,
                        this._rawPrevTime = u,
                        N.push(this),
                        void (this._lazy = [e, t]);
                    this._time && !i ? this.ratio = this._ease.getRatio(this._time / l) : i && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                }
                for (this._lazy !== !1 && (this._lazy = !1),
                this._active || !this._paused && this._time !== o && e >= 0 && (this._active = !0),
                0 === o && (this._startAt && (e >= 0 ? this._startAt.render(e, t, n) : r || (r = "_dummyGS")),
                this.vars.onStart && (0 !== this._time || 0 === l) && (t || this._callback("onStart"))),
                s = this._firstPT; s; )
                    s.f ? s.t[s.p](s.c * this.ratio + s.s) : s.t[s.p] = s.c * this.ratio + s.s,
                    s = s._next;
                this._onUpdate && (0 > e && this._startAt && e !== -1e-4 && this._startAt.render(e, t, n),
                t || (this._time !== o || i) && this._callback("onUpdate")),
                r && (!this._gc || n) && (0 > e && this._startAt && !this._onUpdate && e !== -1e-4 && this._startAt.render(e, t, n),
                i && (this._timeline.autoRemoveChildren && this._enabled(!1, !1),
                this._active = !1),
                !t && this.vars[r] && this._callback(r),
                0 === l && this._rawPrevTime === c && a !== c && (this._rawPrevTime = 0))
            }
        }
        ,
        s._kill = function(e, t, n) {
            if ("all" === e && (e = null ),
            null  == e && (null  == t || t === this.target))
                return this._lazy = !1,
                this._enabled(!1, !1);
            t = "string" != typeof t ? t || this._targets || this.target : M.selector(t) || t;
            var i, r, s, a, o, l, u, c, h, d = n && this._time && n._startTime === this._startTime && this._timeline === n._timeline;
            if ((p(t) || E(t)) && "number" != typeof t[0])
                for (i = t.length; --i > -1; )
                    this._kill(e, t[i], n) && (l = !0);
            else {
                if (this._targets) {
                    for (i = this._targets.length; --i > -1; )
                        if (t === this._targets[i]) {
                            o = this._propLookup[i] || {},
                            this._overwrittenProps = this._overwrittenProps || [],
                            r = this._overwrittenProps[i] = e ? this._overwrittenProps[i] || {} : "all";
                            break
                        }
                } else {
                    if (t !== this.target)
                        return !1;
                    o = this._propLookup,
                    r = this._overwrittenProps = e ? this._overwrittenProps || {} : "all"
                }
                if (o) {
                    if (u = e || o,
                    c = e !== r && "all" !== r && e !== o && ("object" != typeof e || !e._tempKill),
                    n && (M.onOverwrite || this.vars.onOverwrite)) {
                        for (s in u)
                            o[s] && (h || (h = []),
                            h.push(s));
                        if ((h || !e) && !J(this, n, t, h))
                            return !1
                    }
                    for (s in u)
                        (a = o[s]) && (d && (a.f ? a.t[a.p](a.s) : a.t[a.p] = a.s,
                        l = !0),
                        a.pg && a.t._kill(u) && (l = !0),
                        a.pg && 0 !== a.t._overwriteProps.length || (a._prev ? a._prev._next = a._next : a === this._firstPT && (this._firstPT = a._next),
                        a._next && (a._next._prev = a._prev),
                        a._next = a._prev = null ),
                        delete o[s]),
                        c && (r[s] = 1);
                    !this._firstPT && this._initted && this._enabled(!1, !1)
                }
            }
            return l
        }
        ,
        s.invalidate = function() {
            return this._notifyPluginsOfEnabled && M._onPluginEvent("_onDisable", this),
            this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null ,
            this._notifyPluginsOfEnabled = this._active = this._lazy = !1,
            this._propLookup = this._targets ? {} : [],
            C.prototype.invalidate.call(this),
            this.vars.immediateRender && (this._time = -c,
            this.render(-this._delay)),
            this
        }
        ,
        s._enabled = function(e, t) {
            if (o || a.wake(),
            e && this._gc) {
                var n, i = this._targets;
                if (i)
                    for (n = i.length; --n > -1; )
                        this._siblings[n] = Q(i[n], this, !0);
                else
                    this._siblings = Q(this.target, this, !0)
            }
            return C.prototype._enabled.call(this, e, t),
            this._notifyPluginsOfEnabled && this._firstPT ? M._onPluginEvent(e ? "_onEnable" : "_onDisable", this) : !1
        }
        ,
        M.to = function(e, t, n) {
            return new M(e,t,n)
        }
        ,
        M.from = function(e, t, n) {
            return n.runBackwards = !0,
            n.immediateRender = 0 != n.immediateRender,
            new M(e,t,n)
        }
        ,
        M.fromTo = function(e, t, n, i) {
            return i.startAt = n,
            i.immediateRender = 0 != i.immediateRender && 0 != n.immediateRender,
            new M(e,t,i)
        }
        ,
        M.delayedCall = function(e, t, n, i, r) {
            return new M(t,0,{
                delay: e,
                onComplete: t,
                onCompleteParams: n,
                callbackScope: i,
                onReverseComplete: t,
                onReverseCompleteParams: n,
                immediateRender: !1,
                lazy: !1,
                useFrames: r,
                overwrite: 0
            })
        }
        ,
        M.set = function(e, t) {
            return new M(e,0,t)
        }
        ,
        M.getTweensOf = function(e, t) {
            if (null  == e)
                return [];
            e = "string" != typeof e ? e : M.selector(e) || e;
            var n, i, r, s;
            if ((p(e) || E(e)) && "number" != typeof e[0]) {
                for (n = e.length,
                i = []; --n > -1; )
                    i = i.concat(M.getTweensOf(e[n], t));
                for (n = i.length; --n > -1; )
                    for (s = i[n],
                    r = n; --r > -1; )
                        s === i[r] && i.splice(n, 1)
            } else
                for (i = Q(e).concat(),
                n = i.length; --n > -1; )
                    (i[n]._gc || t && !i[n].isActive()) && i.splice(n, 1);
            return i
        }
        ,
        M.killTweensOf = M.killDelayedCallsTo = function(e, t, n) {
            "object" == typeof t && (n = t,
            t = !1);
            for (var i = M.getTweensOf(e, t), r = i.length; --r > -1; )
                i[r]._kill(n, e)
        }
        ;
        var et = v("plugins.TweenPlugin", function(e, t) {
            this._overwriteProps = (e || "").split(","),
            this._propName = this._overwriteProps[0],
            this._priority = t || 0,
            this._super = et.prototype
        }, !0);
        if (s = et.prototype,
        et.version = "1.18.0",
        et.API = 2,
        s._firstPT = null ,
        s._addTween = B,
        s.setRatio = R,
        s._kill = function(e) {
            var t, n = this._overwriteProps, i = this._firstPT;
            if (null  != e[this._propName])
                this._overwriteProps = [];
            else
                for (t = n.length; --t > -1; )
                    null  != e[n[t]] && n.splice(t, 1);
            for (; i; )
                null  != e[i.n] && (i._next && (i._next._prev = i._prev),
                i._prev ? (i._prev._next = i._next,
                i._prev = null ) : this._firstPT === i && (this._firstPT = i._next)),
                i = i._next;
            return !1
        }
        ,
        s._roundProps = function(e, t) {
            for (var n = this._firstPT; n; )
                (e[this._propName] || null  != n.n && e[n.n.split(this._propName + "_").join("")]) && (n.r = t),
                n = n._next
        }
        ,
        M._onPluginEvent = function(e, t) {
            var n, i, r, s, a, o = t._firstPT;
            if ("_onInitAllProps" === e) {
                for (; o; ) {
                    for (a = o._next,
                    i = r; i && i.pr > o.pr; )
                        i = i._next;
                    (o._prev = i ? i._prev : s) ? o._prev._next = o : r = o,
                    (o._next = i) ? i._prev = o : s = o,
                    o = a
                }
                o = t._firstPT = r
            }
            for (; o; )
                o.pg && "function" == typeof o.t[e] && o.t[e]() && (n = !0),
                o = o._next;
            return n
        }
        ,
        et.activate = function(e) {
            for (var t = e.length; --t > -1; )
                e[t].API === et.API && ($[(new e[t])._propName] = e[t]);
            return !0
        }
        ,
        m.plugin = function(e) {
            if (!(e && e.propName && e.init && e.API))
                throw "illegal plugin definition.";
            var t, n = e.propName, i = e.priority || 0, r = e.overwriteProps, s = {
                init: "_onInitTween",
                set: "setRatio",
                kill: "_kill",
                round: "_roundProps",
                initAll: "_onInitAllProps"
            }, a = v("plugins." + n.charAt(0).toUpperCase() + n.substr(1) + "Plugin", function() {
                et.call(this, n, i),
                this._overwriteProps = r || []
            }, e.global === !0), o = a.prototype = new et(n);
            o.constructor = a,
            a.API = e.API;
            for (t in s)
                "function" == typeof e[t] && (o[s[t]] = e[t]);
            return a.version = e.version,
            et.activate([a]),
            a
        }
        ,
        i = e._gsQueue) {
            for (r = 0; r < i.length; r++)
                i[r]();
            for (s in f)
                f[s].func || e.console.log("GSAP encountered missing dependency: com.greensock." + s)
        }
        o = !1
    }
}("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenLite"),
define("TweenLite", function() {});
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
    _gsScope._gsDefine("easing.Back", ["easing.Ease"], function(e) {
        var t, n, i, r = _gsScope.GreenSockGlobals || _gsScope, s = r.com.greensock, a = 2 * Math.PI, o = Math.PI / 2, l = s._class, u = function(t, n) {
            var i = l("easing." + t, function() {}, !0)
              , r = i.prototype = new e;
            return r.constructor = i,
            r.getRatio = n,
            i
        }
        , c = e.register || function() {}
        , h = function(e, t, n, i) {
            var r = l("easing." + e, {
                easeOut: new t,
                easeIn: new n,
                easeInOut: new i
            }, !0);
            return c(r, e),
            r
        }
        , d = function(e, t, n) {
            this.t = e,
            this.v = t,
            n && (this.next = n,
            n.prev = this,
            this.c = n.v - t,
            this.gap = n.t - e)
        }
        , p = function(t, n) {
            var i = l("easing." + t, function(e) {
                this._p1 = e || 0 === e ? e : 1.70158,
                this._p2 = 1.525 * this._p1
            }, !0)
              , r = i.prototype = new e;
            return r.constructor = i,
            r.getRatio = n,
            r.config = function(e) {
                return new i(e)
            }
            ,
            i
        }
        , f = h("Back", p("BackOut", function(e) {
            return (e -= 1) * e * ((this._p1 + 1) * e + this._p1) + 1
        }), p("BackIn", function(e) {
            return e * e * ((this._p1 + 1) * e - this._p1)
        }), p("BackInOut", function(e) {
            return (e *= 2) < 1 ? .5 * e * e * ((this._p2 + 1) * e - this._p2) : .5 * ((e -= 2) * e * ((this._p2 + 1) * e + this._p2) + 2)
        })), g = l("easing.SlowMo", function(e, t, n) {
            t = t || 0 === t ? t : .7,
            null  == e ? e = .7 : e > 1 && (e = 1),
            this._p = 1 !== e ? t : 0,
            this._p1 = (1 - e) / 2,
            this._p2 = e,
            this._p3 = this._p1 + this._p2,
            this._calcEnd = n === !0
        }, !0), m = g.prototype = new e;
        return m.constructor = g,
        m.getRatio = function(e) {
            var t = e + (.5 - e) * this._p;
            return e < this._p1 ? this._calcEnd ? 1 - (e = 1 - e / this._p1) * e : t - (e = 1 - e / this._p1) * e * e * e * t : e > this._p3 ? this._calcEnd ? 1 - (e = (e - this._p3) / this._p1) * e : t + (e - t) * (e = (e - this._p3) / this._p1) * e * e * e : this._calcEnd ? 1 : t
        }
        ,
        g.ease = new g(.7,.7),
        m.config = g.config = function(e, t, n) {
            return new g(e,t,n)
        }
        ,
        t = l("easing.SteppedEase", function(e) {
            e = e || 1,
            this._p1 = 1 / e,
            this._p2 = e + 1
        }, !0),
        m = t.prototype = new e,
        m.constructor = t,
        m.getRatio = function(e) {
            return 0 > e ? e = 0 : e >= 1 && (e = .999999999),
            (this._p2 * e >> 0) * this._p1
        }
        ,
        m.config = t.config = function(e) {
            return new t(e)
        }
        ,
        n = l("easing.RoughEase", function(t) {
            t = t || {};
            for (var n, i, r, s, a, o, l = t.taper || "none", u = [], c = 0, h = 0 | (t.points || 20), p = h, f = t.randomize !== !1, g = t.clamp === !0, m = t.template instanceof e ? t.template : null , v = "number" == typeof t.strength ? .4 * t.strength : .4; --p > -1; )
                n = f ? Math.random() : 1 / h * p,
                i = m ? m.getRatio(n) : n,
                "none" === l ? r = v : "out" === l ? (s = 1 - n,
                r = s * s * v) : "in" === l ? r = n * n * v : .5 > n ? (s = 2 * n,
                r = .5 * s * s * v) : (s = 2 * (1 - n),
                r = .5 * s * s * v),
                f ? i += Math.random() * r - .5 * r : p % 2 ? i += .5 * r : i -= .5 * r,
                g && (i > 1 ? i = 1 : 0 > i && (i = 0)),
                u[c++] = {
                    x: n,
                    y: i
                };
            for (u.sort(function(e, t) {
                return e.x - t.x
            }),
            o = new d(1,1,null ),
            p = h; --p > -1; )
                a = u[p],
                o = new d(a.x,a.y,o);
            this._prev = new d(0,0,0 !== o.t ? o : o.next)
        }, !0),
        m = n.prototype = new e,
        m.constructor = n,
        m.getRatio = function(e) {
            var t = this._prev;
            if (e > t.t) {
                for (; t.next && e >= t.t; )
                    t = t.next;
                t = t.prev
            } else
                for (; t.prev && e <= t.t; )
                    t = t.prev;
            return this._prev = t,
            t.v + (e - t.t) / t.gap * t.c
        }
        ,
        m.config = function(e) {
            return new n(e)
        }
        ,
        n.ease = new n,
        h("Bounce", u("BounceOut", function(e) {
            return 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
        }), u("BounceIn", function(e) {
            return (e = 1 - e) < 1 / 2.75 ? 1 - 7.5625 * e * e : 2 / 2.75 > e ? 1 - (7.5625 * (e -= 1.5 / 2.75) * e + .75) : 2.5 / 2.75 > e ? 1 - (7.5625 * (e -= 2.25 / 2.75) * e + .9375) : 1 - (7.5625 * (e -= 2.625 / 2.75) * e + .984375)
        }), u("BounceInOut", function(e) {
            var t = .5 > e;
            return e = t ? 1 - 2 * e : 2 * e - 1,
            e = 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375,
            t ? .5 * (1 - e) : .5 * e + .5
        })),
        h("Circ", u("CircOut", function(e) {
            return Math.sqrt(1 - (e -= 1) * e)
        }), u("CircIn", function(e) {
            return -(Math.sqrt(1 - e * e) - 1)
        }), u("CircInOut", function(e) {
            return (e *= 2) < 1 ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
        })),
        i = function(t, n, i) {
            var r = l("easing." + t, function(e, t) {
                this._p1 = e >= 1 ? e : 1,
                this._p2 = (t || i) / (1 > e ? e : 1),
                this._p3 = this._p2 / a * (Math.asin(1 / this._p1) || 0),
                this._p2 = a / this._p2
            }, !0)
              , s = r.prototype = new e;
            return s.constructor = r,
            s.getRatio = n,
            s.config = function(e, t) {
                return new r(e,t)
            }
            ,
            r
        }
        ,
        h("Elastic", i("ElasticOut", function(e) {
            return this._p1 * Math.pow(2, -10 * e) * Math.sin((e - this._p3) * this._p2) + 1
        }, .3), i("ElasticIn", function(e) {
            return -(this._p1 * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - this._p3) * this._p2))
        }, .3), i("ElasticInOut", function(e) {
            return (e *= 2) < 1 ? -.5 * this._p1 * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - this._p3) * this._p2) : .5 * this._p1 * Math.pow(2, -10 * (e -= 1)) * Math.sin((e - this._p3) * this._p2) + 1
        }, .45)),
        h("Expo", u("ExpoOut", function(e) {
            return 1 - Math.pow(2, -10 * e)
        }), u("ExpoIn", function(e) {
            return Math.pow(2, 10 * (e - 1)) - .001
        }), u("ExpoInOut", function(e) {
            return (e *= 2) < 1 ? .5 * Math.pow(2, 10 * (e - 1)) : .5 * (2 - Math.pow(2, -10 * (e - 1)))
        })),
        h("Sine", u("SineOut", function(e) {
            return Math.sin(e * o)
        }), u("SineIn", function(e) {
            return -Math.cos(e * o) + 1
        }), u("SineInOut", function(e) {
            return -.5 * (Math.cos(Math.PI * e) - 1)
        })),
        l("easing.EaseLookup", {
            find: function(t) {
                return e.map[t]
            }
        }, !0),
        c(r.SlowMo, "SlowMo", "ease,"),
        c(n, "RoughEase", "ease,"),
        c(t, "SteppedEase", "ease,"),
        f
    }, !0)
}),
_gsScope._gsDefine && _gsScope._gsQueue.pop()(),
function() {
    var e = function() {
        return _gsScope.GreenSockGlobals || _gsScope
    }
    ;
    "function" == typeof define && define.amd ? define("tween_easing", ["TweenLite"], e) : "undefined" != typeof module && module.exports && (require("../TweenLite.js"),
    module.exports = e())
}();
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
    _gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(e, t, n) {
        var i = function(e) {
            var t, n = [], i = e.length;
            for (t = 0; t !== i; n.push(e[t++]))
                ;
            return n
        }
          , r = function(e, t, n) {
            var i, r, s = e.cycle;
            for (i in s)
                r = s[i],
                e[i] = "function" == typeof r ? r.call(t[n], n) : r[n % r.length];
            delete e.cycle
        }
          , s = function(e, t, i) {
            n.call(this, e, t, i),
            this._cycle = 0,
            this._yoyo = this.vars.yoyo === !0,
            this._repeat = this.vars.repeat || 0,
            this._repeatDelay = this.vars.repeatDelay || 0,
            this._dirty = !0,
            this.render = s.prototype.render
        }
          , a = 1e-10
          , o = n._internals
          , l = o.isSelector
          , u = o.isArray
          , c = s.prototype = n.to({}, .1, {})
          , h = [];
        s.version = "1.18.2",
        c.constructor = s,
        c.kill()._gc = !1,
        s.killTweensOf = s.killDelayedCallsTo = n.killTweensOf,
        s.getTweensOf = n.getTweensOf,
        s.lagSmoothing = n.lagSmoothing,
        s.ticker = n.ticker,
        s.render = n.render,
        c.invalidate = function() {
            return this._yoyo = this.vars.yoyo === !0,
            this._repeat = this.vars.repeat || 0,
            this._repeatDelay = this.vars.repeatDelay || 0,
            this._uncache(!0),
            n.prototype.invalidate.call(this)
        }
        ,
        c.updateTo = function(e, t) {
            var i, r = this.ratio, s = this.vars.immediateRender || e.immediateRender;
            t && this._startTime < this._timeline._time && (this._startTime = this._timeline._time,
            this._uncache(!1),
            this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
            for (i in e)
                this.vars[i] = e[i];
            if (this._initted || s)
                if (t)
                    this._initted = !1,
                    s && this.render(0, !0, !0);
                else if (this._gc && this._enabled(!0, !1),
                this._notifyPluginsOfEnabled && this._firstPT && n._onPluginEvent("_onDisable", this),
                this._time / this._duration > .998) {
                    var a = this._totalTime;
                    this.render(0, !0, !1),
                    this._initted = !1,
                    this.render(a, !0, !1)
                } else if (this._initted = !1,
                this._init(),
                this._time > 0 || s)
                    for (var o, l = 1 / (1 - r), u = this._firstPT; u; )
                        o = u.s + u.c,
                        u.c *= l,
                        u.s = o - u.c,
                        u = u._next;
            return this
        }
        ,
        c.render = function(e, t, n) {
            this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
            var i, r, s, l, u, c, h, d, p = this._dirty ? this.totalDuration() : this._totalDuration, f = this._time, g = this._totalTime, m = this._cycle, v = this._duration, _ = this._rawPrevTime;
            if (e >= p - 1e-7 ? (this._totalTime = p,
            this._cycle = this._repeat,
            this._yoyo && 0 !== (1 & this._cycle) ? (this._time = 0,
            this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = v,
            this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1),
            this._reversed || (i = !0,
            r = "onComplete",
            n = n || this._timeline.autoRemoveChildren),
            0 === v && (this._initted || !this.vars.lazy || n) && (this._startTime === this._timeline._duration && (e = 0),
            (0 > _ || 0 >= e && e >= -1e-7 || _ === a && "isPause" !== this.data) && _ !== e && (n = !0,
            _ > a && (r = "onReverseComplete")),
            this._rawPrevTime = d = !t || e || _ === e ? e : a)) : 1e-7 > e ? (this._totalTime = this._time = this._cycle = 0,
            this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0,
            (0 !== g || 0 === v && _ > 0) && (r = "onReverseComplete",
            i = this._reversed),
            0 > e && (this._active = !1,
            0 === v && (this._initted || !this.vars.lazy || n) && (_ >= 0 && (n = !0),
            this._rawPrevTime = d = !t || e || _ === e ? e : a)),
            this._initted || (n = !0)) : (this._totalTime = this._time = e,
            0 !== this._repeat && (l = v + this._repeatDelay,
            this._cycle = this._totalTime / l >> 0,
            0 !== this._cycle && this._cycle === this._totalTime / l && this._cycle--,
            this._time = this._totalTime - this._cycle * l,
            this._yoyo && 0 !== (1 & this._cycle) && (this._time = v - this._time),
            this._time > v ? this._time = v : this._time < 0 && (this._time = 0)),
            this._easeType ? (u = this._time / v,
            c = this._easeType,
            h = this._easePower,
            (1 === c || 3 === c && u >= .5) && (u = 1 - u),
            3 === c && (u *= 2),
            1 === h ? u *= u : 2 === h ? u *= u * u : 3 === h ? u *= u * u * u : 4 === h && (u *= u * u * u * u),
            this.ratio = 1 === c ? 1 - u : 2 === c ? u : this._time / v < .5 ? u / 2 : 1 - u / 2) : this.ratio = this._ease.getRatio(this._time / v)),
            f === this._time && !n && m === this._cycle)
                return void (g !== this._totalTime && this._onUpdate && (t || this._callback("onUpdate")));
            if (!this._initted) {
                if (this._init(),
                !this._initted || this._gc)
                    return;
                if (!n && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration))
                    return this._time = f,
                    this._totalTime = g,
                    this._rawPrevTime = _,
                    this._cycle = m,
                    o.lazyTweens.push(this),
                    void (this._lazy = [e, t]);
                this._time && !i ? this.ratio = this._ease.getRatio(this._time / v) : i && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
            }
            for (this._lazy !== !1 && (this._lazy = !1),
            this._active || !this._paused && this._time !== f && e >= 0 && (this._active = !0),
            0 === g && (2 === this._initted && e > 0 && this._init(),
            this._startAt && (e >= 0 ? this._startAt.render(e, t, n) : r || (r = "_dummyGS")),
            this.vars.onStart && (0 !== this._totalTime || 0 === v) && (t || this._callback("onStart"))),
            s = this._firstPT; s; )
                s.f ? s.t[s.p](s.c * this.ratio + s.s) : s.t[s.p] = s.c * this.ratio + s.s,
                s = s._next;
            this._onUpdate && (0 > e && this._startAt && this._startTime && this._startAt.render(e, t, n),
            t || (this._totalTime !== g || i) && this._callback("onUpdate")),
            this._cycle !== m && (t || this._gc || this.vars.onRepeat && this._callback("onRepeat")),
            r && (!this._gc || n) && (0 > e && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(e, t, n),
            i && (this._timeline.autoRemoveChildren && this._enabled(!1, !1),
            this._active = !1),
            !t && this.vars[r] && this._callback(r),
            0 === v && this._rawPrevTime === a && d !== a && (this._rawPrevTime = 0))
        }
        ,
        s.to = function(e, t, n) {
            return new s(e,t,n)
        }
        ,
        s.from = function(e, t, n) {
            return n.runBackwards = !0,
            n.immediateRender = 0 != n.immediateRender,
            new s(e,t,n)
        }
        ,
        s.fromTo = function(e, t, n, i) {
            return i.startAt = n,
            i.immediateRender = 0 != i.immediateRender && 0 != n.immediateRender,
            new s(e,t,i)
        }
        ,
        s.staggerTo = s.allTo = function(e, t, a, o, c, d, p) {
            o = o || 0;
            var f, g, m, v, _ = 0, y = [], b = function() {
                a.onComplete && a.onComplete.apply(a.onCompleteScope || this, arguments),
                c.apply(p || a.callbackScope || this, d || h)
            }
            , w = a.cycle, x = a.startAt && a.startAt.cycle;
            for (u(e) || ("string" == typeof e && (e = n.selector(e) || e),
            l(e) && (e = i(e))),
            e = e || [],
            0 > o && (e = i(e),
            e.reverse(),
            o *= -1),
            f = e.length - 1,
            m = 0; f >= m; m++) {
                g = {};
                for (v in a)
                    g[v] = a[v];
                if (w && r(g, e, m),
                x) {
                    x = g.startAt = {};
                    for (v in a.startAt)
                        x[v] = a.startAt[v];
                    r(g.startAt, e, m)
                }
                g.delay = _ + (g.delay || 0),
                m === f && c && (g.onComplete = b),
                y[m] = new s(e[m],t,g),
                _ += o
            }
            return y
        }
        ,
        s.staggerFrom = s.allFrom = function(e, t, n, i, r, a, o) {
            return n.runBackwards = !0,
            n.immediateRender = 0 != n.immediateRender,
            s.staggerTo(e, t, n, i, r, a, o)
        }
        ,
        s.staggerFromTo = s.allFromTo = function(e, t, n, i, r, a, o, l) {
            return i.startAt = n,
            i.immediateRender = 0 != i.immediateRender && 0 != n.immediateRender,
            s.staggerTo(e, t, i, r, a, o, l)
        }
        ,
        s.delayedCall = function(e, t, n, i, r) {
            return new s(t,0,{
                delay: e,
                onComplete: t,
                onCompleteParams: n,
                callbackScope: i,
                onReverseComplete: t,
                onReverseCompleteParams: n,
                immediateRender: !1,
                useFrames: r,
                overwrite: 0
            })
        }
        ,
        s.set = function(e, t) {
            return new s(e,0,t)
        }
        ,
        s.isTweening = function(e) {
            return n.getTweensOf(e, !0).length > 0
        }
        ;
        var d = function(e, t) {
            for (var i = [], r = 0, s = e._first; s; )
                s instanceof n ? i[r++] = s : (t && (i[r++] = s),
                i = i.concat(d(s, t)),
                r = i.length),
                s = s._next;
            return i
        }
          , p = s.getAllTweens = function(t) {
            return d(e._rootTimeline, t).concat(d(e._rootFramesTimeline, t))
        }
        ;
        s.killAll = function(e, n, i, r) {
            null  == n && (n = !0),
            null  == i && (i = !0);
            var s, a, o, l = p(0 != r), u = l.length, c = n && i && r;
            for (o = 0; u > o; o++)
                a = l[o],
                (c || a instanceof t || (s = a.target === a.vars.onComplete) && i || n && !s) && (e ? a.totalTime(a._reversed ? 0 : a.totalDuration()) : a._enabled(!1, !1))
        }
        ,
        s.killChildTweensOf = function(e, t) {
            if (null  != e) {
                var r, a, c, h, d, p = o.tweenLookup;
                if ("string" == typeof e && (e = n.selector(e) || e),
                l(e) && (e = i(e)),
                u(e))
                    for (h = e.length; --h > -1; )
                        s.killChildTweensOf(e[h], t);
                else {
                    r = [];
                    for (c in p)
                        for (a = p[c].target.parentNode; a; )
                            a === e && (r = r.concat(p[c].tweens)),
                            a = a.parentNode;
                    for (d = r.length,
                    h = 0; d > h; h++)
                        t && r[h].totalTime(r[h].totalDuration()),
                        r[h]._enabled(!1, !1)
                }
            }
        }
        ;
        var f = function(e, n, i, r) {
            n = n !== !1,
            i = i !== !1,
            r = r !== !1;
            for (var s, a, o = p(r), l = n && i && r, u = o.length; --u > -1; )
                a = o[u],
                (l || a instanceof t || (s = a.target === a.vars.onComplete) && i || n && !s) && a.paused(e)
        }
        ;
        return s.pauseAll = function(e, t, n) {
            f(!0, e, t, n)
        }
        ,
        s.resumeAll = function(e, t, n) {
            f(!1, e, t, n)
        }
        ,
        s.globalTimeScale = function(t) {
            var i = e._rootTimeline
              , r = n.ticker.time;
            return arguments.length ? (t = t || a,
            i._startTime = r - (r - i._startTime) * i._timeScale / t,
            i = e._rootFramesTimeline,
            r = n.ticker.frame,
            i._startTime = r - (r - i._startTime) * i._timeScale / t,
            i._timeScale = e._rootTimeline._timeScale = t,
            t) : i._timeScale
        }
        ,
        c.progress = function(e) {
            return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - e : e) + this._cycle * (this._duration + this._repeatDelay), !1) : this._time / this.duration()
        }
        ,
        c.totalProgress = function(e) {
            return arguments.length ? this.totalTime(this.totalDuration() * e, !1) : this._totalTime / this.totalDuration()
        }
        ,
        c.time = function(e, t) {
            return arguments.length ? (this._dirty && this.totalDuration(),
            e > this._duration && (e = this._duration),
            this._yoyo && 0 !== (1 & this._cycle) ? e = this._duration - e + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (e += this._cycle * (this._duration + this._repeatDelay)),
            this.totalTime(e, t)) : this._time
        }
        ,
        c.duration = function(t) {
            return arguments.length ? e.prototype.duration.call(this, t) : this._duration
        }
        ,
        c.totalDuration = function(e) {
            return arguments.length ? -1 === this._repeat ? this : this.duration((e - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat,
            this._dirty = !1),
            this._totalDuration)
        }
        ,
        c.repeat = function(e) {
            return arguments.length ? (this._repeat = e,
            this._uncache(!0)) : this._repeat
        }
        ,
        c.repeatDelay = function(e) {
            return arguments.length ? (this._repeatDelay = e,
            this._uncache(!0)) : this._repeatDelay
        }
        ,
        c.yoyo = function(e) {
            return arguments.length ? (this._yoyo = e,
            this) : this._yoyo
        }
        ,
        s
    }, !0),
    _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(e, t, n) {
        var i = function(e) {
            t.call(this, e),
            this._labels = {},
            this.autoRemoveChildren = this.vars.autoRemoveChildren === !0,
            this.smoothChildTiming = this.vars.smoothChildTiming === !0,
            this._sortChildren = !0,
            this._onUpdate = this.vars.onUpdate;
            var n, i, r = this.vars;
            for (i in r)
                n = r[i],
                l(n) && -1 !== n.join("").indexOf("{self}") && (r[i] = this._swapSelfInParams(n));
            l(r.tweens) && this.add(r.tweens, 0, r.align, r.stagger)
        }
          , r = 1e-10
          , s = n._internals
          , a = i._internals = {}
          , o = s.isSelector
          , l = s.isArray
          , u = s.lazyTweens
          , c = s.lazyRender
          , h = _gsScope._gsDefine.globals
          , d = function(e) {
            var t, n = {};
            for (t in e)
                n[t] = e[t];
            return n
        }
          , p = function(e, t, n) {
            var i, r, s = e.cycle;
            for (i in s)
                r = s[i],
                e[i] = "function" == typeof r ? r.call(t[n], n) : r[n % r.length];
            delete e.cycle
        }
          , f = a.pauseCallback = function() {}
          , g = function(e) {
            var t, n = [], i = e.length;
            for (t = 0; t !== i; n.push(e[t++]))
                ;
            return n
        }
          , m = i.prototype = new t;
        return i.version = "1.18.2",
        m.constructor = i,
        m.kill()._gc = m._forcingPlayhead = m._hasPause = !1,
        m.to = function(e, t, i, r) {
            var s = i.repeat && h.TweenMax || n;
            return t ? this.add(new s(e,t,i), r) : this.set(e, i, r)
        }
        ,
        m.from = function(e, t, i, r) {
            return this.add((i.repeat && h.TweenMax || n).from(e, t, i), r)
        }
        ,
        m.fromTo = function(e, t, i, r, s) {
            var a = r.repeat && h.TweenMax || n;
            return t ? this.add(a.fromTo(e, t, i, r), s) : this.set(e, r, s)
        }
        ,
        m.staggerTo = function(e, t, r, s, a, l, u, c) {
            var h, f, m = new i({
                onComplete: l,
                onCompleteParams: u,
                callbackScope: c,
                smoothChildTiming: this.smoothChildTiming
            }), v = r.cycle;
            for ("string" == typeof e && (e = n.selector(e) || e),
            e = e || [],
            o(e) && (e = g(e)),
            s = s || 0,
            0 > s && (e = g(e),
            e.reverse(),
            s *= -1),
            f = 0; f < e.length; f++)
                h = d(r),
                h.startAt && (h.startAt = d(h.startAt),
                h.startAt.cycle && p(h.startAt, e, f)),
                v && p(h, e, f),
                m.to(e[f], t, h, f * s);
            return this.add(m, a)
        }
        ,
        m.staggerFrom = function(e, t, n, i, r, s, a, o) {
            return n.immediateRender = 0 != n.immediateRender,
            n.runBackwards = !0,
            this.staggerTo(e, t, n, i, r, s, a, o)
        }
        ,
        m.staggerFromTo = function(e, t, n, i, r, s, a, o, l) {
            return i.startAt = n,
            i.immediateRender = 0 != i.immediateRender && 0 != n.immediateRender,
            this.staggerTo(e, t, i, r, s, a, o, l)
        }
        ,
        m.call = function(e, t, i, r) {
            return this.add(n.delayedCall(0, e, t, i), r)
        }
        ,
        m.set = function(e, t, i) {
            return i = this._parseTimeOrLabel(i, 0, !0),
            null  == t.immediateRender && (t.immediateRender = i === this._time && !this._paused),
            this.add(new n(e,0,t), i)
        }
        ,
        i.exportRoot = function(e, t) {
            e = e || {},
            null  == e.smoothChildTiming && (e.smoothChildTiming = !0);
            var r, s, a = new i(e), o = a._timeline;
            for (null  == t && (t = !0),
            o._remove(a, !0),
            a._startTime = 0,
            a._rawPrevTime = a._time = a._totalTime = o._time,
            r = o._first; r; )
                s = r._next,
                t && r instanceof n && r.target === r.vars.onComplete || a.add(r, r._startTime - r._delay),
                r = s;
            return o.add(a, 0),
            a
        }
        ,
        m.add = function(r, s, a, o) {
            var u, c, h, d, p, f;
            if ("number" != typeof s && (s = this._parseTimeOrLabel(s, 0, !0, r)),
            !(r instanceof e)) {
                if (r instanceof Array || r && r.push && l(r)) {
                    for (a = a || "normal",
                    o = o || 0,
                    u = s,
                    c = r.length,
                    h = 0; c > h; h++)
                        l(d = r[h]) && (d = new i({
                            tweens: d
                        })),
                        this.add(d, u),
                        "string" != typeof d && "function" != typeof d && ("sequence" === a ? u = d._startTime + d.totalDuration() / d._timeScale : "start" === a && (d._startTime -= d.delay())),
                        u += o;
                    return this._uncache(!0)
                }
                if ("string" == typeof r)
                    return this.addLabel(r, s);
                if ("function" != typeof r)
                    throw "Cannot add " + r + " into the timeline; it is not a tween, timeline, function, or string.";
                r = n.delayedCall(0, r)
            }
            if (t.prototype.add.call(this, r, s),
            (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
                for (p = this,
                f = p.rawTime() > r._startTime; p._timeline; )
                    f && p._timeline.smoothChildTiming ? p.totalTime(p._totalTime, !0) : p._gc && p._enabled(!0, !1),
                    p = p._timeline;
            return this
        }
        ,
        m.remove = function(t) {
            if (t instanceof e) {
                this._remove(t, !1);
                var n = t._timeline = t.vars.useFrames ? e._rootFramesTimeline : e._rootTimeline;
                return t._startTime = (t._paused ? t._pauseTime : n._time) - (t._reversed ? t.totalDuration() - t._totalTime : t._totalTime) / t._timeScale,
                this
            }
            if (t instanceof Array || t && t.push && l(t)) {
                for (var i = t.length; --i > -1; )
                    this.remove(t[i]);
                return this
            }
            return "string" == typeof t ? this.removeLabel(t) : this.kill(null , t)
        }
        ,
        m._remove = function(e, n) {
            t.prototype._remove.call(this, e, n);
            var i = this._last;
            return i ? this._time > i._startTime + i._totalDuration / i._timeScale && (this._time = this.duration(),
            this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0,
            this
        }
        ,
        m.append = function(e, t) {
            return this.add(e, this._parseTimeOrLabel(null , t, !0, e))
        }
        ,
        m.insert = m.insertMultiple = function(e, t, n, i) {
            return this.add(e, t || 0, n, i)
        }
        ,
        m.appendMultiple = function(e, t, n, i) {
            return this.add(e, this._parseTimeOrLabel(null , t, !0, e), n, i)
        }
        ,
        m.addLabel = function(e, t) {
            return this._labels[e] = this._parseTimeOrLabel(t),
            this
        }
        ,
        m.addPause = function(e, t, i, r) {
            var s = n.delayedCall(0, f, i, r || this);
            return s.vars.onComplete = s.vars.onReverseComplete = t,
            s.data = "isPause",
            this._hasPause = !0,
            this.add(s, e)
        }
        ,
        m.removeLabel = function(e) {
            return delete this._labels[e],
            this
        }
        ,
        m.getLabelTime = function(e) {
            return null  != this._labels[e] ? this._labels[e] : -1
        }
        ,
        m._parseTimeOrLabel = function(t, n, i, r) {
            var s;
            if (r instanceof e && r.timeline === this)
                this.remove(r);
            else if (r && (r instanceof Array || r.push && l(r)))
                for (s = r.length; --s > -1; )
                    r[s] instanceof e && r[s].timeline === this && this.remove(r[s]);
            if ("string" == typeof n)
                return this._parseTimeOrLabel(n, i && "number" == typeof t && null  == this._labels[n] ? t - this.duration() : 0, i);
            if (n = n || 0,
            "string" != typeof t || !isNaN(t) && null  == this._labels[t])
                null  == t && (t = this.duration());
            else {
                if (s = t.indexOf("="),
                -1 === s)
                    return null  == this._labels[t] ? i ? this._labels[t] = this.duration() + n : n : this._labels[t] + n;
                n = parseInt(t.charAt(s - 1) + "1", 10) * Number(t.substr(s + 1)),
                t = s > 1 ? this._parseTimeOrLabel(t.substr(0, s - 1), 0, i) : this.duration()
            }
            return Number(t) + n
        }
        ,
        m.seek = function(e, t) {
            return this.totalTime("number" == typeof e ? e : this._parseTimeOrLabel(e), t !== !1)
        }
        ,
        m.stop = function() {
            return this.paused(!0)
        }
        ,
        m.gotoAndPlay = function(e, t) {
            return this.play(e, t)
        }
        ,
        m.gotoAndStop = function(e, t) {
            return this.pause(e, t)
        }
        ,
        m.render = function(e, t, n) {
            this._gc && this._enabled(!0, !1);
            var i, s, a, o, l, h, d, p = this._dirty ? this.totalDuration() : this._totalDuration, f = this._time, g = this._startTime, m = this._timeScale, v = this._paused;
            if (e >= p - 1e-7)
                this._totalTime = this._time = p,
                this._reversed || this._hasPausedChild() || (s = !0,
                o = "onComplete",
                l = !!this._timeline.autoRemoveChildren,
                0 === this._duration && (0 >= e && e >= -1e-7 || this._rawPrevTime < 0 || this._rawPrevTime === r) && this._rawPrevTime !== e && this._first && (l = !0,
                this._rawPrevTime > r && (o = "onReverseComplete"))),
                this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e : r,
                e = p + 1e-4;
            else if (1e-7 > e)
                if (this._totalTime = this._time = 0,
                (0 !== f || 0 === this._duration && this._rawPrevTime !== r && (this._rawPrevTime > 0 || 0 > e && this._rawPrevTime >= 0)) && (o = "onReverseComplete",
                s = this._reversed),
                0 > e)
                    this._active = !1,
                    this._timeline.autoRemoveChildren && this._reversed ? (l = s = !0,
                    o = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (l = !0),
                    this._rawPrevTime = e;
                else {
                    if (this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e : r,
                    0 === e && s)
                        for (i = this._first; i && 0 === i._startTime; )
                            i._duration || (s = !1),
                            i = i._next;
                    e = 0,
                    this._initted || (l = !0)
                }
            else {
                if (this._hasPause && !this._forcingPlayhead && !t) {
                    if (e >= f)
                        for (i = this._first; i && i._startTime <= e && !h; )
                            i._duration || "isPause" !== i.data || i.ratio || 0 === i._startTime && 0 === this._rawPrevTime || (h = i),
                            i = i._next;
                    else
                        for (i = this._last; i && i._startTime >= e && !h; )
                            i._duration || "isPause" === i.data && i._rawPrevTime > 0 && (h = i),
                            i = i._prev;
                    h && (this._time = e = h._startTime,
                    this._totalTime = e + this._cycle * (this._totalDuration + this._repeatDelay))
                }
                this._totalTime = this._time = this._rawPrevTime = e
            }
            if (this._time !== f && this._first || n || l || h) {
                if (this._initted || (this._initted = !0),
                this._active || !this._paused && this._time !== f && e > 0 && (this._active = !0),
                0 === f && this.vars.onStart && 0 !== this._time && (t || this._callback("onStart")),
                d = this._time,
                d >= f)
                    for (i = this._first; i && (a = i._next,
                    d === this._time && (!this._paused || v)); )
                        (i._active || i._startTime <= d && !i._paused && !i._gc) && (h === i && this.pause(),
                        i._reversed ? i.render((i._dirty ? i.totalDuration() : i._totalDuration) - (e - i._startTime) * i._timeScale, t, n) : i.render((e - i._startTime) * i._timeScale, t, n)),
                        i = a;
                else
                    for (i = this._last; i && (a = i._prev,
                    d === this._time && (!this._paused || v)); ) {
                        if (i._active || i._startTime <= f && !i._paused && !i._gc) {
                            if (h === i) {
                                for (h = i._prev; h && h.endTime() > this._time; )
                                    h.render(h._reversed ? h.totalDuration() - (e - h._startTime) * h._timeScale : (e - h._startTime) * h._timeScale, t, n),
                                    h = h._prev;
                                h = null ,
                                this.pause()
                            }
                            i._reversed ? i.render((i._dirty ? i.totalDuration() : i._totalDuration) - (e - i._startTime) * i._timeScale, t, n) : i.render((e - i._startTime) * i._timeScale, t, n)
                        }
                        i = a
                    }
                this._onUpdate && (t || (u.length && c(),
                this._callback("onUpdate"))),
                o && (this._gc || (g === this._startTime || m !== this._timeScale) && (0 === this._time || p >= this.totalDuration()) && (s && (u.length && c(),
                this._timeline.autoRemoveChildren && this._enabled(!1, !1),
                this._active = !1),
                !t && this.vars[o] && this._callback(o)))
            }
        }
        ,
        m._hasPausedChild = function() {
            for (var e = this._first; e; ) {
                if (e._paused || e instanceof i && e._hasPausedChild())
                    return !0;
                e = e._next
            }
            return !1
        }
        ,
        m.getChildren = function(e, t, i, r) {
            r = r || -9999999999;
            for (var s = [], a = this._first, o = 0; a; )
                a._startTime < r || (a instanceof n ? t !== !1 && (s[o++] = a) : (i !== !1 && (s[o++] = a),
                e !== !1 && (s = s.concat(a.getChildren(!0, t, i)),
                o = s.length))),
                a = a._next;
            return s
        }
        ,
        m.getTweensOf = function(e, t) {
            var i, r, s = this._gc, a = [], o = 0;
            for (s && this._enabled(!0, !0),
            i = n.getTweensOf(e),
            r = i.length; --r > -1; )
                (i[r].timeline === this || t && this._contains(i[r])) && (a[o++] = i[r]);
            return s && this._enabled(!1, !0),
            a
        }
        ,
        m.recent = function() {
            return this._recent
        }
        ,
        m._contains = function(e) {
            for (var t = e.timeline; t; ) {
                if (t === this)
                    return !0;
                t = t.timeline
            }
            return !1
        }
        ,
        m.shiftChildren = function(e, t, n) {
            n = n || 0;
            for (var i, r = this._first, s = this._labels; r; )
                r._startTime >= n && (r._startTime += e),
                r = r._next;
            if (t)
                for (i in s)
                    s[i] >= n && (s[i] += e);
            return this._uncache(!0)
        }
        ,
        m._kill = function(e, t) {
            if (!e && !t)
                return this._enabled(!1, !1);
            for (var n = t ? this.getTweensOf(t) : this.getChildren(!0, !0, !1), i = n.length, r = !1; --i > -1; )
                n[i]._kill(e, t) && (r = !0);
            return r
        }
        ,
        m.clear = function(e) {
            var t = this.getChildren(!1, !0, !0)
              , n = t.length;
            for (this._time = this._totalTime = 0; --n > -1; )
                t[n]._enabled(!1, !1);
            return e !== !1 && (this._labels = {}),
            this._uncache(!0)
        }
        ,
        m.invalidate = function() {
            for (var t = this._first; t; )
                t.invalidate(),
                t = t._next;
            return e.prototype.invalidate.call(this)
        }
        ,
        m._enabled = function(e, n) {
            if (e === this._gc)
                for (var i = this._first; i; )
                    i._enabled(e, !0),
                    i = i._next;
            return t.prototype._enabled.call(this, e, n)
        }
        ,
        m.totalTime = function() {
            this._forcingPlayhead = !0;
            var t = e.prototype.totalTime.apply(this, arguments);
            return this._forcingPlayhead = !1,
            t
        }
        ,
        m.duration = function(e) {
            return arguments.length ? (0 !== this.duration() && 0 !== e && this.timeScale(this._duration / e),
            this) : (this._dirty && this.totalDuration(),
            this._duration)
        }
        ,
        m.totalDuration = function(e) {
            if (!arguments.length) {
                if (this._dirty) {
                    for (var t, n, i = 0, r = this._last, s = 999999999999; r; )
                        t = r._prev,
                        r._dirty && r.totalDuration(),
                        r._startTime > s && this._sortChildren && !r._paused ? this.add(r, r._startTime - r._delay) : s = r._startTime,
                        r._startTime < 0 && !r._paused && (i -= r._startTime,
                        this._timeline.smoothChildTiming && (this._startTime += r._startTime / this._timeScale),
                        this.shiftChildren(-r._startTime, !1, -9999999999),
                        s = 0),
                        n = r._startTime + r._totalDuration / r._timeScale,
                        n > i && (i = n),
                        r = t;
                    this._duration = this._totalDuration = i,
                    this._dirty = !1
                }
                return this._totalDuration
            }
            return e && this.totalDuration() ? this.timeScale(this._totalDuration / e) : this
        }
        ,
        m.paused = function(t) {
            if (!t)
                for (var n = this._first, i = this._time; n; )
                    n._startTime === i && "isPause" === n.data && (n._rawPrevTime = 0),
                    n = n._next;
            return e.prototype.paused.apply(this, arguments)
        }
        ,
        m.usesFrames = function() {
            for (var t = this._timeline; t._timeline; )
                t = t._timeline;
            return t === e._rootFramesTimeline
        }
        ,
        m.rawTime = function() {
            return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
        }
        ,
        i
    }, !0),
    _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function(e, t, n) {
        var i = function(t) {
            e.call(this, t),
            this._repeat = this.vars.repeat || 0,
            this._repeatDelay = this.vars.repeatDelay || 0,
            this._cycle = 0,
            this._yoyo = this.vars.yoyo === !0,
            this._dirty = !0
        }
          , r = 1e-10
          , s = t._internals
          , a = s.lazyTweens
          , o = s.lazyRender
          , l = new n(null ,null ,1,0)
          , u = i.prototype = new e;
        return u.constructor = i,
        u.kill()._gc = !1,
        i.version = "1.18.2",
        u.invalidate = function() {
            return this._yoyo = this.vars.yoyo === !0,
            this._repeat = this.vars.repeat || 0,
            this._repeatDelay = this.vars.repeatDelay || 0,
            this._uncache(!0),
            e.prototype.invalidate.call(this)
        }
        ,
        u.addCallback = function(e, n, i, r) {
            return this.add(t.delayedCall(0, e, i, r), n)
        }
        ,
        u.removeCallback = function(e, t) {
            if (e)
                if (null  == t)
                    this._kill(null , e);
                else
                    for (var n = this.getTweensOf(e, !1), i = n.length, r = this._parseTimeOrLabel(t); --i > -1; )
                        n[i]._startTime === r && n[i]._enabled(!1, !1);
            return this
        }
        ,
        u.removePause = function(t) {
            return this.removeCallback(e._internals.pauseCallback, t)
        }
        ,
        u.tweenTo = function(e, n) {
            n = n || {};
            var i, r, s, a = {
                ease: l,
                useFrames: this.usesFrames(),
                immediateRender: !1
            };
            for (r in n)
                a[r] = n[r];
            return a.time = this._parseTimeOrLabel(e),
            i = Math.abs(Number(a.time) - this._time) / this._timeScale || .001,
            s = new t(this,i,a),
            a.onStart = function() {
                s.target.paused(!0),
                s.vars.time !== s.target.time() && i === s.duration() && s.duration(Math.abs(s.vars.time - s.target.time()) / s.target._timeScale),
                n.onStart && s._callback("onStart")
            }
            ,
            s
        }
        ,
        u.tweenFromTo = function(e, t, n) {
            n = n || {},
            e = this._parseTimeOrLabel(e),
            n.startAt = {
                onComplete: this.seek,
                onCompleteParams: [e],
                callbackScope: this
            },
            n.immediateRender = n.immediateRender !== !1;
            var i = this.tweenTo(t, n);
            return i.duration(Math.abs(i.vars.time - e) / this._timeScale || .001)
        }
        ,
        u.render = function(e, t, n) {
            this._gc && this._enabled(!0, !1);
            var i, s, l, u, c, h, d, p, f = this._dirty ? this.totalDuration() : this._totalDuration, g = this._duration, m = this._time, v = this._totalTime, _ = this._startTime, y = this._timeScale, b = this._rawPrevTime, w = this._paused, x = this._cycle;
            if (e >= f - 1e-7)
                this._locked || (this._totalTime = f,
                this._cycle = this._repeat),
                this._reversed || this._hasPausedChild() || (s = !0,
                u = "onComplete",
                c = !!this._timeline.autoRemoveChildren,
                0 === this._duration && (0 >= e && e >= -1e-7 || 0 > b || b === r) && b !== e && this._first && (c = !0,
                b > r && (u = "onReverseComplete"))),
                this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e : r,
                this._yoyo && 0 !== (1 & this._cycle) ? this._time = e = 0 : (this._time = g,
                e = g + 1e-4);
            else if (1e-7 > e)
                if (this._locked || (this._totalTime = this._cycle = 0),
                this._time = 0,
                (0 !== m || 0 === g && b !== r && (b > 0 || 0 > e && b >= 0) && !this._locked) && (u = "onReverseComplete",
                s = this._reversed),
                0 > e)
                    this._active = !1,
                    this._timeline.autoRemoveChildren && this._reversed ? (c = s = !0,
                    u = "onReverseComplete") : b >= 0 && this._first && (c = !0),
                    this._rawPrevTime = e;
                else {
                    if (this._rawPrevTime = g || !t || e || this._rawPrevTime === e ? e : r,
                    0 === e && s)
                        for (i = this._first; i && 0 === i._startTime; )
                            i._duration || (s = !1),
                            i = i._next;
                    e = 0,
                    this._initted || (c = !0)
                }
            else if (0 === g && 0 > b && (c = !0),
            this._time = this._rawPrevTime = e,
            this._locked || (this._totalTime = e,
            0 !== this._repeat && (h = g + this._repeatDelay,
            this._cycle = this._totalTime / h >> 0,
            0 !== this._cycle && this._cycle === this._totalTime / h && this._cycle--,
            this._time = this._totalTime - this._cycle * h,
            this._yoyo && 0 !== (1 & this._cycle) && (this._time = g - this._time),
            this._time > g ? (this._time = g,
            e = g + 1e-4) : this._time < 0 ? this._time = e = 0 : e = this._time)),
            this._hasPause && !this._forcingPlayhead && !t) {
                if (e = this._time,
                e >= m)
                    for (i = this._first; i && i._startTime <= e && !d; )
                        i._duration || "isPause" !== i.data || i.ratio || 0 === i._startTime && 0 === this._rawPrevTime || (d = i),
                        i = i._next;
                else
                    for (i = this._last; i && i._startTime >= e && !d; )
                        i._duration || "isPause" === i.data && i._rawPrevTime > 0 && (d = i),
                        i = i._prev;
                d && (this._time = e = d._startTime,
                this._totalTime = e + this._cycle * (this._totalDuration + this._repeatDelay))
            }
            if (this._cycle !== x && !this._locked) {
                var T = this._yoyo && 0 !== (1 & x)
                  , P = T === (this._yoyo && 0 !== (1 & this._cycle))
                  , S = this._totalTime
                  , k = this._cycle
                  , A = this._rawPrevTime
                  , C = this._time;
                if (this._totalTime = x * g,
                this._cycle < x ? T = !T : this._totalTime += g,
                this._time = m,
                this._rawPrevTime = 0 === g ? b - 1e-4 : b,
                this._cycle = x,
                this._locked = !0,
                m = T ? 0 : g,
                this.render(m, t, 0 === g),
                t || this._gc || this.vars.onRepeat && this._callback("onRepeat"),
                m !== this._time)
                    return;
                if (P && (m = T ? g + 1e-4 : -1e-4,
                this.render(m, !0, !1)),
                this._locked = !1,
                this._paused && !w)
                    return;
                this._time = C,
                this._totalTime = S,
                this._cycle = k,
                this._rawPrevTime = A
            }
            if (!(this._time !== m && this._first || n || c || d))
                return void (v !== this._totalTime && this._onUpdate && (t || this._callback("onUpdate")));
            if (this._initted || (this._initted = !0),
            this._active || !this._paused && this._totalTime !== v && e > 0 && (this._active = !0),
            0 === v && this.vars.onStart && 0 !== this._totalTime && (t || this._callback("onStart")),
            p = this._time,
            p >= m)
                for (i = this._first; i && (l = i._next,
                p === this._time && (!this._paused || w)); )
                    (i._active || i._startTime <= this._time && !i._paused && !i._gc) && (d === i && this.pause(),
                    i._reversed ? i.render((i._dirty ? i.totalDuration() : i._totalDuration) - (e - i._startTime) * i._timeScale, t, n) : i.render((e - i._startTime) * i._timeScale, t, n)),
                    i = l;
            else
                for (i = this._last; i && (l = i._prev,
                p === this._time && (!this._paused || w)); ) {
                    if (i._active || i._startTime <= m && !i._paused && !i._gc) {
                        if (d === i) {
                            for (d = i._prev; d && d.endTime() > this._time; )
                                d.render(d._reversed ? d.totalDuration() - (e - d._startTime) * d._timeScale : (e - d._startTime) * d._timeScale, t, n),
                                d = d._prev;
                            d = null ,
                            this.pause()
                        }
                        i._reversed ? i.render((i._dirty ? i.totalDuration() : i._totalDuration) - (e - i._startTime) * i._timeScale, t, n) : i.render((e - i._startTime) * i._timeScale, t, n)
                    }
                    i = l
                }
            this._onUpdate && (t || (a.length && o(),
            this._callback("onUpdate"))),
            u && (this._locked || this._gc || (_ === this._startTime || y !== this._timeScale) && (0 === this._time || f >= this.totalDuration()) && (s && (a.length && o(),
            this._timeline.autoRemoveChildren && this._enabled(!1, !1),
            this._active = !1),
            !t && this.vars[u] && this._callback(u)))
        }
        ,
        u.getActive = function(e, t, n) {
            null  == e && (e = !0),
            null  == t && (t = !0),
            null  == n && (n = !1);
            var i, r, s = [], a = this.getChildren(e, t, n), o = 0, l = a.length;
            for (i = 0; l > i; i++)
                r = a[i],
                r.isActive() && (s[o++] = r);
            return s
        }
        ,
        u.getLabelAfter = function(e) {
            e || 0 !== e && (e = this._time);
            var t, n = this.getLabelsArray(), i = n.length;
            for (t = 0; i > t; t++)
                if (n[t].time > e)
                    return n[t].name;
            return null 
        }
        ,
        u.getLabelBefore = function(e) {
            null  == e && (e = this._time);
            for (var t = this.getLabelsArray(), n = t.length; --n > -1; )
                if (t[n].time < e)
                    return t[n].name;
            return null 
        }
        ,
        u.getLabelsArray = function() {
            var e, t = [], n = 0;
            for (e in this._labels)
                t[n++] = {
                    time: this._labels[e],
                    name: e
                };
            return t.sort(function(e, t) {
                return e.time - t.time
            }),
            t
        }
        ,
        u.progress = function(e, t) {
            return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - e : e) + this._cycle * (this._duration + this._repeatDelay), t) : this._time / this.duration()
        }
        ,
        u.totalProgress = function(e, t) {
            return arguments.length ? this.totalTime(this.totalDuration() * e, t) : this._totalTime / this.totalDuration()
        }
        ,
        u.totalDuration = function(t) {
            return arguments.length ? -1 !== this._repeat && t ? this.timeScale(this.totalDuration() / t) : this : (this._dirty && (e.prototype.totalDuration.call(this),
            this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat),
            this._totalDuration)
        }
        ,
        u.time = function(e, t) {
            return arguments.length ? (this._dirty && this.totalDuration(),
            e > this._duration && (e = this._duration),
            this._yoyo && 0 !== (1 & this._cycle) ? e = this._duration - e + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (e += this._cycle * (this._duration + this._repeatDelay)),
            this.totalTime(e, t)) : this._time
        }
        ,
        u.repeat = function(e) {
            return arguments.length ? (this._repeat = e,
            this._uncache(!0)) : this._repeat
        }
        ,
        u.repeatDelay = function(e) {
            return arguments.length ? (this._repeatDelay = e,
            this._uncache(!0)) : this._repeatDelay
        }
        ,
        u.yoyo = function(e) {
            return arguments.length ? (this._yoyo = e,
            this) : this._yoyo
        }
        ,
        u.currentLabel = function(e) {
            return arguments.length ? this.seek(e, !0) : this.getLabelBefore(this._time + 1e-8)
        }
        ,
        i
    }, !0),
    function() {
        var e = 180 / Math.PI
          , t = []
          , n = []
          , i = []
          , r = {}
          , s = _gsScope._gsDefine.globals
          , a = function(e, t, n, i) {
            this.a = e,
            this.b = t,
            this.c = n,
            this.d = i,
            this.da = i - e,
            this.ca = n - e,
            this.ba = t - e
        }
          , o = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,"
          , l = function(e, t, n, i) {
            var r = {
                a: e
            }
              , s = {}
              , a = {}
              , o = {
                c: i
            }
              , l = (e + t) / 2
              , u = (t + n) / 2
              , c = (n + i) / 2
              , h = (l + u) / 2
              , d = (u + c) / 2
              , p = (d - h) / 8;
            return r.b = l + (e - l) / 4,
            s.b = h + p,
            r.c = s.a = (r.b + s.b) / 2,
            s.c = a.a = (h + d) / 2,
            a.b = d - p,
            o.b = c + (i - c) / 4,
            a.c = o.a = (a.b + o.b) / 2,
            [r, s, a, o]
        }
          , u = function(e, r, s, a, o) {
            var u, c, h, d, p, f, g, m, v, _, y, b, w, x = e.length - 1, T = 0, P = e[0].a;
            for (u = 0; x > u; u++)
                p = e[T],
                c = p.a,
                h = p.d,
                d = e[T + 1].d,
                o ? (y = t[u],
                b = n[u],
                w = .25 * (b + y) * r / (a ? .5 : i[u] || .5),
                f = h - (h - c) * (a ? .5 * r : 0 !== y ? w / y : 0),
                g = h + (d - h) * (a ? .5 * r : 0 !== b ? w / b : 0),
                m = h - (f + ((g - f) * (3 * y / (y + b) + .5) / 4 || 0))) : (f = h - .5 * (h - c) * r,
                g = h + .5 * (d - h) * r,
                m = h - (f + g) / 2),
                f += m,
                g += m,
                p.c = v = f,
                p.b = 0 !== u ? P : P = p.a + .6 * (p.c - p.a),
                p.da = h - c,
                p.ca = v - c,
                p.ba = P - c,
                s ? (_ = l(c, P, v, h),
                e.splice(T, 1, _[0], _[1], _[2], _[3]),
                T += 4) : T++,
                P = g;
            p = e[T],
            p.b = P,
            p.c = P + .4 * (p.d - P),
            p.da = p.d - p.a,
            p.ca = p.c - p.a,
            p.ba = P - p.a,
            s && (_ = l(p.a, P, p.c, p.d),
            e.splice(T, 1, _[0], _[1], _[2], _[3]))
        }
          , c = function(e, i, r, s) {
            var o, l, u, c, h, d, p = [];
            if (s)
                for (e = [s].concat(e),
                l = e.length; --l > -1; )
                    "string" == typeof (d = e[l][i]) && "=" === d.charAt(1) && (e[l][i] = s[i] + Number(d.charAt(0) + d.substr(2)));
            if (o = e.length - 2,
            0 > o)
                return p[0] = new a(e[0][i],0,0,e[-1 > o ? 0 : 1][i]),
                p;
            for (l = 0; o > l; l++)
                u = e[l][i],
                c = e[l + 1][i],
                p[l] = new a(u,0,0,c),
                r && (h = e[l + 2][i],
                t[l] = (t[l] || 0) + (c - u) * (c - u),
                n[l] = (n[l] || 0) + (h - c) * (h - c));
            return p[l] = new a(e[l][i],0,0,e[l + 1][i]),
            p
        }
          , h = function(e, s, a, l, h, d) {
            var p, f, g, m, v, _, y, b, w = {}, x = [], T = d || e[0];
            h = "string" == typeof h ? "," + h + "," : o,
            null  == s && (s = 1);
            for (f in e[0])
                x.push(f);
            if (e.length > 1) {
                for (b = e[e.length - 1],
                y = !0,
                p = x.length; --p > -1; )
                    if (f = x[p],
                    Math.abs(T[f] - b[f]) > .05) {
                        y = !1;
                        break
                    }
                y && (e = e.concat(),
                d && e.unshift(d),
                e.push(e[1]),
                d = e[e.length - 3])
            }
            for (t.length = n.length = i.length = 0,
            p = x.length; --p > -1; )
                f = x[p],
                r[f] = -1 !== h.indexOf("," + f + ","),
                w[f] = c(e, f, r[f], d);
            for (p = t.length; --p > -1; )
                t[p] = Math.sqrt(t[p]),
                n[p] = Math.sqrt(n[p]);
            if (!l) {
                for (p = x.length; --p > -1; )
                    if (r[f])
                        for (g = w[x[p]],
                        _ = g.length - 1,
                        m = 0; _ > m; m++)
                            v = g[m + 1].da / n[m] + g[m].da / t[m],
                            i[m] = (i[m] || 0) + v * v;
                for (p = i.length; --p > -1; )
                    i[p] = Math.sqrt(i[p])
            }
            for (p = x.length,
            m = a ? 4 : 1; --p > -1; )
                f = x[p],
                g = w[f],
                u(g, s, a, l, r[f]),
                y && (g.splice(0, m),
                g.splice(g.length - m, m));
            return w
        }
          , d = function(e, t, n) {
            t = t || "soft";
            var i, r, s, o, l, u, c, h, d, p, f, g = {}, m = "cubic" === t ? 3 : 2, v = "soft" === t, _ = [];
            if (v && n && (e = [n].concat(e)),
            null  == e || e.length < m + 1)
                throw "invalid Bezier data";
            for (d in e[0])
                _.push(d);
            for (u = _.length; --u > -1; ) {
                for (d = _[u],
                g[d] = l = [],
                p = 0,
                h = e.length,
                c = 0; h > c; c++)
                    i = null  == n ? e[c][d] : "string" == typeof (f = e[c][d]) && "=" === f.charAt(1) ? n[d] + Number(f.charAt(0) + f.substr(2)) : Number(f),
                    v && c > 1 && h - 1 > c && (l[p++] = (i + l[p - 2]) / 2),
                    l[p++] = i;
                for (h = p - m + 1,
                p = 0,
                c = 0; h > c; c += m)
                    i = l[c],
                    r = l[c + 1],
                    s = l[c + 2],
                    o = 2 === m ? 0 : l[c + 3],
                    l[p++] = f = 3 === m ? new a(i,r,s,o) : new a(i,(2 * r + i) / 3,(2 * r + s) / 3,s);
                l.length = p
            }
            return g
        }
          , p = function(e, t, n) {
            for (var i, r, s, a, o, l, u, c, h, d, p, f = 1 / n, g = e.length; --g > -1; )
                for (d = e[g],
                s = d.a,
                a = d.d - s,
                o = d.c - s,
                l = d.b - s,
                i = r = 0,
                c = 1; n >= c; c++)
                    u = f * c,
                    h = 1 - u,
                    i = r - (r = (u * u * a + 3 * h * (u * o + h * l)) * u),
                    p = g * n + c - 1,
                    t[p] = (t[p] || 0) + i * i
        }
          , f = function(e, t) {
            t = t >> 0 || 6;
            var n, i, r, s, a = [], o = [], l = 0, u = 0, c = t - 1, h = [], d = [];
            for (n in e)
                p(e[n], a, t);
            for (r = a.length,
            i = 0; r > i; i++)
                l += Math.sqrt(a[i]),
                s = i % t,
                d[s] = l,
                s === c && (u += l,
                s = i / t >> 0,
                h[s] = d,
                o[s] = u,
                l = 0,
                d = []);
            return {
                length: u,
                lengths: o,
                segments: h
            }
        }
          , g = _gsScope._gsDefine.plugin({
            propName: "bezier",
            priority: -1,
            version: "1.3.4",
            API: 2,
            global: !0,
            init: function(e, t, n) {
                this._target = e,
                t instanceof Array && (t = {
                    values: t
                }),
                this._func = {},
                this._round = {},
                this._props = [],
                this._timeRes = null  == t.timeResolution ? 6 : parseInt(t.timeResolution, 10);
                var i, r, s, a, o, l = t.values || [], u = {}, c = l[0], p = t.autoRotate || n.vars.orientToBezier;
                this._autoRotate = p ? p instanceof Array ? p : [["x", "y", "rotation", p === !0 ? 0 : Number(p) || 0]] : null ;
                for (i in c)
                    this._props.push(i);
                for (s = this._props.length; --s > -1; )
                    i = this._props[s],
                    this._overwriteProps.push(i),
                    r = this._func[i] = "function" == typeof e[i],
                    u[i] = r ? e[i.indexOf("set") || "function" != typeof e["get" + i.substr(3)] ? i : "get" + i.substr(3)]() : parseFloat(e[i]),
                    o || u[i] !== l[0][i] && (o = u);
                if (this._beziers = "cubic" !== t.type && "quadratic" !== t.type && "soft" !== t.type ? h(l, isNaN(t.curviness) ? 1 : t.curviness, !1, "thruBasic" === t.type, t.correlate, o) : d(l, t.type, u),
                this._segCount = this._beziers[i].length,
                this._timeRes) {
                    var g = f(this._beziers, this._timeRes);
                    this._length = g.length,
                    this._lengths = g.lengths,
                    this._segments = g.segments,
                    this._l1 = this._li = this._s1 = this._si = 0,
                    this._l2 = this._lengths[0],
                    this._curSeg = this._segments[0],
                    this._s2 = this._curSeg[0],
                    this._prec = 1 / this._curSeg.length
                }
                if (p = this._autoRotate)
                    for (this._initialRotations = [],
                    p[0] instanceof Array || (this._autoRotate = p = [p]),
                    s = p.length; --s > -1; ) {
                        for (a = 0; 3 > a; a++)
                            i = p[s][a],
                            this._func[i] = "function" == typeof e[i] ? e[i.indexOf("set") || "function" != typeof e["get" + i.substr(3)] ? i : "get" + i.substr(3)] : !1;
                        i = p[s][2],
                        this._initialRotations[s] = this._func[i] ? this._func[i].call(this._target) : this._target[i]
                    }
                return this._startRatio = n.vars.runBackwards ? 1 : 0,
                !0
            },
            set: function(t) {
                var n, i, r, s, a, o, l, u, c, h, d = this._segCount, p = this._func, f = this._target, g = t !== this._startRatio;
                if (this._timeRes) {
                    if (c = this._lengths,
                    h = this._curSeg,
                    t *= this._length,
                    r = this._li,
                    t > this._l2 && d - 1 > r) {
                        for (u = d - 1; u > r && (this._l2 = c[++r]) <= t; )
                            ;
                        this._l1 = c[r - 1],
                        this._li = r,
                        this._curSeg = h = this._segments[r],
                        this._s2 = h[this._s1 = this._si = 0]
                    } else if (t < this._l1 && r > 0) {
                        for (; r > 0 && (this._l1 = c[--r]) >= t; )
                            ;
                        0 === r && t < this._l1 ? this._l1 = 0 : r++,
                        this._l2 = c[r],
                        this._li = r,
                        this._curSeg = h = this._segments[r],
                        this._s1 = h[(this._si = h.length - 1) - 1] || 0,
                        this._s2 = h[this._si]
                    }
                    if (n = r,
                    t -= this._l1,
                    r = this._si,
                    t > this._s2 && r < h.length - 1) {
                        for (u = h.length - 1; u > r && (this._s2 = h[++r]) <= t; )
                            ;
                        this._s1 = h[r - 1],
                        this._si = r
                    } else if (t < this._s1 && r > 0) {
                        for (; r > 0 && (this._s1 = h[--r]) >= t; )
                            ;
                        0 === r && t < this._s1 ? this._s1 = 0 : r++,
                        this._s2 = h[r],
                        this._si = r
                    }
                    o = (r + (t - this._s1) / (this._s2 - this._s1)) * this._prec
                } else
                    n = 0 > t ? 0 : t >= 1 ? d - 1 : d * t >> 0,
                    o = (t - n * (1 / d)) * d;
                for (i = 1 - o,
                r = this._props.length; --r > -1; )
                    s = this._props[r],
                    a = this._beziers[s][n],
                    l = (o * o * a.da + 3 * i * (o * a.ca + i * a.ba)) * o + a.a,
                    this._round[s] && (l = Math.round(l)),
                    p[s] ? f[s](l) : f[s] = l;
                if (this._autoRotate) {
                    var m, v, _, y, b, w, x, T = this._autoRotate;
                    for (r = T.length; --r > -1; )
                        s = T[r][2],
                        w = T[r][3] || 0,
                        x = T[r][4] === !0 ? 1 : e,
                        a = this._beziers[T[r][0]],
                        m = this._beziers[T[r][1]],
                        a && m && (a = a[n],
                        m = m[n],
                        v = a.a + (a.b - a.a) * o,
                        y = a.b + (a.c - a.b) * o,
                        v += (y - v) * o,
                        y += (a.c + (a.d - a.c) * o - y) * o,
                        _ = m.a + (m.b - m.a) * o,
                        b = m.b + (m.c - m.b) * o,
                        _ += (b - _) * o,
                        b += (m.c + (m.d - m.c) * o - b) * o,
                        l = g ? Math.atan2(b - _, y - v) * x + w : this._initialRotations[r],
                        p[s] ? f[s](l) : f[s] = l)
                }
            }
        })
          , m = g.prototype;
        g.bezierThrough = h,
        g.cubicToQuadratic = l,
        g._autoCSS = !0,
        g.quadraticToCubic = function(e, t, n) {
            return new a(e,(2 * t + e) / 3,(2 * t + n) / 3,n)
        }
        ,
        g._cssRegister = function() {
            var e = s.CSSPlugin;
            if (e) {
                var t = e._internals
                  , n = t._parseToProxy
                  , i = t._setPluginRatio
                  , r = t.CSSPropTween;
                t._registerComplexSpecialProp("bezier", {
                    parser: function(e, t, s, a, o, l) {
                        t instanceof Array && (t = {
                            values: t
                        }),
                        l = new g;
                        var u, c, h, d = t.values, p = d.length - 1, f = [], m = {};
                        if (0 > p)
                            return o;
                        for (u = 0; p >= u; u++)
                            h = n(e, d[u], a, o, l, p !== u),
                            f[u] = h.end;
                        for (c in t)
                            m[c] = t[c];
                        return m.values = f,
                        o = new r(e,"bezier",0,0,h.pt,2),
                        o.data = h,
                        o.plugin = l,
                        o.setRatio = i,
                        0 === m.autoRotate && (m.autoRotate = !0),
                        !m.autoRotate || m.autoRotate instanceof Array || (u = m.autoRotate === !0 ? 0 : Number(m.autoRotate),
                        m.autoRotate = null  != h.end.left ? [["left", "top", "rotation", u, !1]] : null  != h.end.x ? [["x", "y", "rotation", u, !1]] : !1),
                        m.autoRotate && (a._transform || a._enableTransforms(!1),
                        h.autoRotate = a._target._gsTransform),
                        l._onInitTween(h.proxy, m, a._tween),
                        o
                    }
                })
            }
        }
        ,
        m._roundProps = function(e, t) {
            for (var n = this._overwriteProps, i = n.length; --i > -1; )
                (e[n[i]] || e.bezier || e.bezierThrough) && (this._round[n[i]] = t)
        }
        ,
        m._kill = function(e) {
            var t, n, i = this._props;
            for (t in this._beziers)
                if (t in e)
                    for (delete this._beziers[t],
                    delete this._func[t],
                    n = i.length; --n > -1; )
                        i[n] === t && i.splice(n, 1);
            return this._super._kill.call(this, e)
        }
    }(),
    _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(e, t) {
        var n, i, r, s, a = function() {
            e.call(this, "css"),
            this._overwriteProps.length = 0,
            this.setRatio = a.prototype.setRatio
        }
        , o = _gsScope._gsDefine.globals, l = {}, u = a.prototype = new e("css");
        u.constructor = a,
        a.version = "1.18.2",
        a.API = 2,
        a.defaultTransformPerspective = 0,
        a.defaultSkewType = "compensated",
        a.defaultSmoothOrigin = !0,
        u = "px",
        a.suffixMap = {
            top: u,
            right: u,
            bottom: u,
            left: u,
            width: u,
            height: u,
            fontSize: u,
            padding: u,
            margin: u,
            perspective: u,
            lineHeight: ""
        };
        var c, h, d, p, f, g, m = /(?:\d|\-\d|\.\d|\-\.\d)+/g, v = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g, _ = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi, y = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g, b = /(?:\d|\-|\+|=|#|\.)*/g, w = /opacity *= *([^)]*)/i, x = /opacity:([^;]*)/i, T = /alpha\(opacity *=.+?\)/i, P = /^(rgb|hsl)/, S = /([A-Z])/g, k = /-([a-z])/gi, A = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi, C = function(e, t) {
            return t.toUpperCase()
        }
        , j = /(?:Left|Right|Width)/i, O = /(M11|M12|M21|M22)=[\d\-\.e]+/gi, M = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i, E = /,(?=[^\)]*(?:\(|$))/gi, D = Math.PI / 180, N = 180 / Math.PI, I = {}, L = document, R = function(e) {
            return L.createElementNS ? L.createElementNS("http://www.w3.org/1999/xhtml", e) : L.createElement(e)
        }
        , V = R("div"), B = R("img"), F = a._internals = {
            _specialProps: l
        }, $ = navigator.userAgent, q = function() {
            var e = $.indexOf("Android")
              , t = R("a");
            return d = -1 !== $.indexOf("Safari") && -1 === $.indexOf("Chrome") && (-1 === e || Number($.substr(e + 8, 1)) > 3),
            f = d && Number($.substr($.indexOf("Version/") + 8, 1)) < 6,
            p = -1 !== $.indexOf("Firefox"),
            (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec($) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec($)) && (g = parseFloat(RegExp.$1)),
            t ? (t.style.cssText = "top:1px;opacity:.55;",
            /^0.55/.test(t.style.opacity)) : !1
        }(), z = function(e) {
            return w.test("string" == typeof e ? e : (e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
        }
        , H = function(e) {
            window.console && console.log(e)
        }
        , U = "", G = "", X = function(e, t) {
            t = t || V;
            var n, i, r = t.style;
            if (void 0 !== r[e])
                return e;
            for (e = e.charAt(0).toUpperCase() + e.substr(1),
            n = ["O", "Moz", "ms", "Ms", "Webkit"],
            i = 5; --i > -1 && void 0 === r[n[i] + e]; )
                ;
            return i >= 0 ? (G = 3 === i ? "ms" : n[i],
            U = "-" + G.toLowerCase() + "-",
            G + e) : null 
        }
        , W = L.defaultView ? L.defaultView.getComputedStyle : function() {}
        , Y = a.getStyle = function(e, t, n, i, r) {
            var s;
            return q || "opacity" !== t ? (!i && e.style[t] ? s = e.style[t] : (n = n || W(e)) ? s = n[t] || n.getPropertyValue(t) || n.getPropertyValue(t.replace(S, "-$1").toLowerCase()) : e.currentStyle && (s = e.currentStyle[t]),
            null  == r || s && "none" !== s && "auto" !== s && "auto auto" !== s ? s : r) : z(e)
        }
        , Q = F.convertToPixels = function(e, n, i, r, s) {
            if ("px" === r || !r)
                return i;
            if ("auto" === r || !i)
                return 0;
            var o, l, u, c = j.test(n), h = e, d = V.style, p = 0 > i;
            if (p && (i = -i),
            "%" === r && -1 !== n.indexOf("border"))
                o = i / 100 * (c ? e.clientWidth : e.clientHeight);
            else {
                if (d.cssText = "border:0 solid red;position:" + Y(e, "position") + ";line-height:0;",
                "%" !== r && h.appendChild && "v" !== r.charAt(0) && "rem" !== r)
                    d[c ? "borderLeftWidth" : "borderTopWidth"] = i + r;
                else {
                    if (h = e.parentNode || L.body,
                    l = h._gsCache,
                    u = t.ticker.frame,
                    l && c && l.time === u)
                        return l.width * i / 100;
                    d[c ? "width" : "height"] = i + r
                }
                h.appendChild(V),
                o = parseFloat(V[c ? "offsetWidth" : "offsetHeight"]),
                h.removeChild(V),
                c && "%" === r && a.cacheWidths !== !1 && (l = h._gsCache = h._gsCache || {},
                l.time = u,
                l.width = 100 * (o / i)),
                0 !== o || s || (o = Q(e, n, i, r, !0))
            }
            return p ? -o : o
        }
        , J = F.calculateOffset = function(e, t, n) {
            if ("absolute" !== Y(e, "position", n))
                return 0;
            var i = "left" === t ? "Left" : "Top"
              , r = Y(e, "margin" + i, n);
            return e["offset" + i] - (Q(e, t, parseFloat(r), r.replace(b, "")) || 0)
        }
        , Z = function(e, t) {
            var n, i, r, s = {};
            if (t = t || W(e, null ))
                if (n = t.length)
                    for (; --n > -1; )
                        r = t[n],
                        (-1 === r.indexOf("-transform") || St === r) && (s[r.replace(k, C)] = t.getPropertyValue(r));
                else
                    for (n in t)
                        (-1 === n.indexOf("Transform") || Pt === n) && (s[n] = t[n]);
            else if (t = e.currentStyle || e.style)
                for (n in t)
                    "string" == typeof n && void 0 === s[n] && (s[n.replace(k, C)] = t[n]);
            return q || (s.opacity = z(e)),
            i = Rt(e, t, !1),
            s.rotation = i.rotation,
            s.skewX = i.skewX,
            s.scaleX = i.scaleX,
            s.scaleY = i.scaleY,
            s.x = i.x,
            s.y = i.y,
            At && (s.z = i.z,
            s.rotationX = i.rotationX,
            s.rotationY = i.rotationY,
            s.scaleZ = i.scaleZ),
            s.filters && delete s.filters,
            s
        }
        , K = function(e, t, n, i, r) {
            var s, a, o, l = {}, u = e.style;
            for (a in n)
                "cssText" !== a && "length" !== a && isNaN(a) && (t[a] !== (s = n[a]) || r && r[a]) && -1 === a.indexOf("Origin") && ("number" == typeof s || "string" == typeof s) && (l[a] = "auto" !== s || "left" !== a && "top" !== a ? "" !== s && "auto" !== s && "none" !== s || "string" != typeof t[a] || "" === t[a].replace(y, "") ? s : 0 : J(e, a),
                void 0 !== u[a] && (o = new ft(u,a,u[a],o)));
            if (i)
                for (a in i)
                    "className" !== a && (l[a] = i[a]);
            return {
                difs: l,
                firstMPT: o
            }
        }
        , et = {
            width: ["Left", "Right"],
            height: ["Top", "Bottom"]
        }, tt = ["marginLeft", "marginRight", "marginTop", "marginBottom"], nt = function(e, t, n) {
            var i = parseFloat("width" === t ? e.offsetWidth : e.offsetHeight)
              , r = et[t]
              , s = r.length;
            for (n = n || W(e, null ); --s > -1; )
                i -= parseFloat(Y(e, "padding" + r[s], n, !0)) || 0,
                i -= parseFloat(Y(e, "border" + r[s] + "Width", n, !0)) || 0;
            return i
        }
        , it = function(e, t) {
            if ("contain" === e || "auto" === e || "auto auto" === e)
                return e + " ";
            (null  == e || "" === e) && (e = "0 0");
            var n = e.split(" ")
              , i = -1 !== e.indexOf("left") ? "0%" : -1 !== e.indexOf("right") ? "100%" : n[0]
              , r = -1 !== e.indexOf("top") ? "0%" : -1 !== e.indexOf("bottom") ? "100%" : n[1];
            return null  == r ? r = "center" === i ? "50%" : "0" : "center" === r && (r = "50%"),
            ("center" === i || isNaN(parseFloat(i)) && -1 === (i + "").indexOf("=")) && (i = "50%"),
            e = i + " " + r + (n.length > 2 ? " " + n[2] : ""),
            t && (t.oxp = -1 !== i.indexOf("%"),
            t.oyp = -1 !== r.indexOf("%"),
            t.oxr = "=" === i.charAt(1),
            t.oyr = "=" === r.charAt(1),
            t.ox = parseFloat(i.replace(y, "")),
            t.oy = parseFloat(r.replace(y, "")),
            t.v = e),
            t || e
        }
        , rt = function(e, t) {
            return "string" == typeof e && "=" === e.charAt(1) ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) : parseFloat(e) - parseFloat(t)
        }
        , st = function(e, t) {
            return null  == e ? t : "string" == typeof e && "=" === e.charAt(1) ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) + t : parseFloat(e)
        }
        , at = function(e, t, n, i) {
            var r, s, a, o, l, u = 1e-6;
            return null  == e ? o = t : "number" == typeof e ? o = e : (r = 360,
            s = e.split("_"),
            l = "=" === e.charAt(1),
            a = (l ? parseInt(e.charAt(0) + "1", 10) * parseFloat(s[0].substr(2)) : parseFloat(s[0])) * (-1 === e.indexOf("rad") ? 1 : N) - (l ? 0 : t),
            s.length && (i && (i[n] = t + a),
            -1 !== e.indexOf("short") && (a %= r,
            a !== a % (r / 2) && (a = 0 > a ? a + r : a - r)),
            -1 !== e.indexOf("_cw") && 0 > a ? a = (a + 9999999999 * r) % r - (0 | a / r) * r : -1 !== e.indexOf("ccw") && a > 0 && (a = (a - 9999999999 * r) % r - (0 | a / r) * r)),
            o = t + a),
            u > o && o > -u && (o = 0),
            o
        }
        , ot = {
            aqua: [0, 255, 255],
            lime: [0, 255, 0],
            silver: [192, 192, 192],
            black: [0, 0, 0],
            maroon: [128, 0, 0],
            teal: [0, 128, 128],
            blue: [0, 0, 255],
            navy: [0, 0, 128],
            white: [255, 255, 255],
            fuchsia: [255, 0, 255],
            olive: [128, 128, 0],
            yellow: [255, 255, 0],
            orange: [255, 165, 0],
            gray: [128, 128, 128],
            purple: [128, 0, 128],
            green: [0, 128, 0],
            red: [255, 0, 0],
            pink: [255, 192, 203],
            cyan: [0, 255, 255],
            transparent: [255, 255, 255, 0]
        }, lt = function(e, t, n) {
            return e = 0 > e ? e + 1 : e > 1 ? e - 1 : e,
            0 | 255 * (1 > 6 * e ? t + 6 * (n - t) * e : .5 > e ? n : 2 > 3 * e ? t + 6 * (n - t) * (2 / 3 - e) : t) + .5
        }
        , ut = a.parseColor = function(e, t) {
            var n, i, r, s, a, o, l, u, c, h, d;
            if (e)
                if ("number" == typeof e)
                    n = [e >> 16, 255 & e >> 8, 255 & e];
                else {
                    if ("," === e.charAt(e.length - 1) && (e = e.substr(0, e.length - 1)),
                    ot[e])
                        n = ot[e];
                    else if ("#" === e.charAt(0))
                        4 === e.length && (i = e.charAt(1),
                        r = e.charAt(2),
                        s = e.charAt(3),
                        e = "#" + i + i + r + r + s + s),
                        e = parseInt(e.substr(1), 16),
                        n = [e >> 16, 255 & e >> 8, 255 & e];
                    else if ("hsl" === e.substr(0, 3))
                        if (n = d = e.match(m),
                        t) {
                            if (-1 !== e.indexOf("="))
                                return e.match(v)
                        } else
                            a = Number(n[0]) % 360 / 360,
                            o = Number(n[1]) / 100,
                            l = Number(n[2]) / 100,
                            r = .5 >= l ? l * (o + 1) : l + o - l * o,
                            i = 2 * l - r,
                            n.length > 3 && (n[3] = Number(e[3])),
                            n[0] = lt(a + 1 / 3, i, r),
                            n[1] = lt(a, i, r),
                            n[2] = lt(a - 1 / 3, i, r);
                    else
                        n = e.match(m) || ot.transparent;
                    n[0] = Number(n[0]),
                    n[1] = Number(n[1]),
                    n[2] = Number(n[2]),
                    n.length > 3 && (n[3] = Number(n[3]))
                }
            else
                n = ot.black;
            return t && !d && (i = n[0] / 255,
            r = n[1] / 255,
            s = n[2] / 255,
            u = Math.max(i, r, s),
            c = Math.min(i, r, s),
            l = (u + c) / 2,
            u === c ? a = o = 0 : (h = u - c,
            o = l > .5 ? h / (2 - u - c) : h / (u + c),
            a = u === i ? (r - s) / h + (s > r ? 6 : 0) : u === r ? (s - i) / h + 2 : (i - r) / h + 4,
            a *= 60),
            n[0] = 0 | a + .5,
            n[1] = 0 | 100 * o + .5,
            n[2] = 0 | 100 * l + .5),
            n
        }
        , ct = function(e, t) {
            var n, i, r, s = e.match(ht) || [], a = 0, o = s.length ? "" : e;
            for (n = 0; n < s.length; n++)
                i = s[n],
                r = e.substr(a, e.indexOf(i, a) - a),
                a += r.length + i.length,
                i = ut(i, t),
                3 === i.length && i.push(1),
                o += r + (t ? "hsla(" + i[0] + "," + i[1] + "%," + i[2] + "%," + i[3] : "rgba(" + i.join(",")) + ")";
            return o
        }
        , ht = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
        for (u in ot)
            ht += "|" + u + "\\b";
        ht = new RegExp(ht + ")","gi"),
        a.colorStringFilter = function(e) {
            var t, n = e[0] + e[1];
            ht.lastIndex = 0,
            ht.test(n) && (t = -1 !== n.indexOf("hsl(") || -1 !== n.indexOf("hsla("),
            e[0] = ct(e[0], t),
            e[1] = ct(e[1], t))
        }
        ,
        t.defaultStringFilter || (t.defaultStringFilter = a.colorStringFilter);
        var dt = function(e, t, n, i) {
            if (null  == e)
                return function(e) {
                    return e
                }
                ;
            var r, s = t ? (e.match(ht) || [""])[0] : "", a = e.split(s).join("").match(_) || [], o = e.substr(0, e.indexOf(a[0])), l = ")" === e.charAt(e.length - 1) ? ")" : "", u = -1 !== e.indexOf(" ") ? " " : ",", c = a.length, h = c > 0 ? a[0].replace(m, "") : "";
            return c ? r = t ? function(e) {
                var t, d, p, f;
                if ("number" == typeof e)
                    e += h;
                else if (i && E.test(e)) {
                    for (f = e.replace(E, "|").split("|"),
                    p = 0; p < f.length; p++)
                        f[p] = r(f[p]);
                    return f.join(",")
                }
                if (t = (e.match(ht) || [s])[0],
                d = e.split(t).join("").match(_) || [],
                p = d.length,
                c > p--)
                    for (; ++p < c; )
                        d[p] = n ? d[0 | (p - 1) / 2] : a[p];
                return o + d.join(u) + u + t + l + (-1 !== e.indexOf("inset") ? " inset" : "")
            }
             : function(e) {
                var t, s, d;
                if ("number" == typeof e)
                    e += h;
                else if (i && E.test(e)) {
                    for (s = e.replace(E, "|").split("|"),
                    d = 0; d < s.length; d++)
                        s[d] = r(s[d]);
                    return s.join(",")
                }
                if (t = e.match(_) || [],
                d = t.length,
                c > d--)
                    for (; ++d < c; )
                        t[d] = n ? t[0 | (d - 1) / 2] : a[d];
                return o + t.join(u) + l
            }
             : function(e) {
                return e
            }
        }
          , pt = function(e) {
            return e = e.split(","),
            function(t, n, i, r, s, a, o) {
                var l, u = (n + "").split(" ");
                for (o = {},
                l = 0; 4 > l; l++)
                    o[e[l]] = u[l] = u[l] || u[(l - 1) / 2 >> 0];
                return r.parse(t, o, s, a)
            }
        }
          , ft = (F._setPluginRatio = function(e) {
            this.plugin.setRatio(e);
            for (var t, n, i, r, s, a = this.data, o = a.proxy, l = a.firstMPT, u = 1e-6; l; )
                t = o[l.v],
                l.r ? t = Math.round(t) : u > t && t > -u && (t = 0),
                l.t[l.p] = t,
                l = l._next;
            if (a.autoRotate && (a.autoRotate.rotation = o.rotation),
            1 === e || 0 === e)
                for (l = a.firstMPT,
                s = 1 === e ? "e" : "b"; l; ) {
                    if (n = l.t,
                    n.type) {
                        if (1 === n.type) {
                            for (r = n.xs0 + n.s + n.xs1,
                            i = 1; i < n.l; i++)
                                r += n["xn" + i] + n["xs" + (i + 1)];
                            n[s] = r
                        }
                    } else
                        n[s] = n.s + n.xs0;
                    l = l._next
                }
        }
        ,
        function(e, t, n, i, r) {
            this.t = e,
            this.p = t,
            this.v = n,
            this.r = r,
            i && (i._prev = this,
            this._next = i)
        }
        )
          , gt = (F._parseToProxy = function(e, t, n, i, r, s) {
            var a, o, l, u, c, h = i, d = {}, p = {}, f = n._transform, g = I;
            for (n._transform = null ,
            I = t,
            i = c = n.parse(e, t, i, r),
            I = g,
            s && (n._transform = f,
            h && (h._prev = null ,
            h._prev && (h._prev._next = null ))); i && i !== h; ) {
                if (i.type <= 1 && (o = i.p,
                p[o] = i.s + i.c,
                d[o] = i.s,
                s || (u = new ft(i,"s",o,u,i.r),
                i.c = 0),
                1 === i.type))
                    for (a = i.l; --a > 0; )
                        l = "xn" + a,
                        o = i.p + "_" + l,
                        p[o] = i.data[l],
                        d[o] = i[l],
                        s || (u = new ft(i,l,o,u,i.rxp[l]));
                i = i._next
            }
            return {
                proxy: d,
                end: p,
                firstMPT: u,
                pt: c
            }
        }
        ,
        F.CSSPropTween = function(e, t, i, r, a, o, l, u, c, h, d) {
            this.t = e,
            this.p = t,
            this.s = i,
            this.c = r,
            this.n = l || t,
            e instanceof gt || s.push(this.n),
            this.r = u,
            this.type = o || 0,
            c && (this.pr = c,
            n = !0),
            this.b = void 0 === h ? i : h,
            this.e = void 0 === d ? i + r : d,
            a && (this._next = a,
            a._prev = this)
        }
        )
          , mt = function(e, t, n, i, r, s) {
            var a = new gt(e,t,n,i - n,r,-1,s);
            return a.b = n,
            a.e = a.xs0 = i,
            a
        }
          , vt = a.parseComplex = function(e, t, n, i, r, s, a, o, l, u) {
            n = n || s || "",
            a = new gt(e,t,0,0,a,u ? 2 : 1,null ,!1,o,n,i),
            i += "";
            var h, d, p, f, g, _, y, b, w, x, T, P, S, k = n.split(", ").join(",").split(" "), A = i.split(", ").join(",").split(" "), C = k.length, j = c !== !1;
            for ((-1 !== i.indexOf(",") || -1 !== n.indexOf(",")) && (k = k.join(" ").replace(E, ", ").split(" "),
            A = A.join(" ").replace(E, ", ").split(" "),
            C = k.length),
            C !== A.length && (k = (s || "").split(" "),
            C = k.length),
            a.plugin = l,
            a.setRatio = u,
            ht.lastIndex = 0,
            h = 0; C > h; h++)
                if (f = k[h],
                g = A[h],
                b = parseFloat(f),
                b || 0 === b)
                    a.appendXtra("", b, rt(g, b), g.replace(v, ""), j && -1 !== g.indexOf("px"), !0);
                else if (r && ht.test(f))
                    P = "," === g.charAt(g.length - 1) ? ")," : ")",
                    S = -1 !== g.indexOf("hsl") && q,
                    f = ut(f, S),
                    g = ut(g, S),
                    w = f.length + g.length > 6,
                    w && !q && 0 === g[3] ? (a["xs" + a.l] += a.l ? " transparent" : "transparent",
                    a.e = a.e.split(A[h]).join("transparent")) : (q || (w = !1),
                    S ? a.appendXtra(w ? "hsla(" : "hsl(", f[0], rt(g[0], f[0]), ",", !1, !0).appendXtra("", f[1], rt(g[1], f[1]), "%,", !1).appendXtra("", f[2], rt(g[2], f[2]), w ? "%," : "%" + P, !1) : a.appendXtra(w ? "rgba(" : "rgb(", f[0], g[0] - f[0], ",", !0, !0).appendXtra("", f[1], g[1] - f[1], ",", !0).appendXtra("", f[2], g[2] - f[2], w ? "," : P, !0),
                    w && (f = f.length < 4 ? 1 : f[3],
                    a.appendXtra("", f, (g.length < 4 ? 1 : g[3]) - f, P, !1))),
                    ht.lastIndex = 0;
                else if (_ = f.match(m)) {
                    if (y = g.match(v),
                    !y || y.length !== _.length)
                        return a;
                    for (p = 0,
                    d = 0; d < _.length; d++)
                        T = _[d],
                        x = f.indexOf(T, p),
                        a.appendXtra(f.substr(p, x - p), Number(T), rt(y[d], T), "", j && "px" === f.substr(x + T.length, 2), 0 === d),
                        p = x + T.length;
                    a["xs" + a.l] += f.substr(p)
                } else
                    a["xs" + a.l] += a.l ? " " + g : g;
            if (-1 !== i.indexOf("=") && a.data) {
                for (P = a.xs0 + a.data.s,
                h = 1; h < a.l; h++)
                    P += a["xs" + h] + a.data["xn" + h];
                a.e = P + a["xs" + h]
            }
            return a.l || (a.type = -1,
            a.xs0 = a.e),
            a.xfirst || a
        }
          , _t = 9;
        for (u = gt.prototype,
        u.l = u.pr = 0; --_t > 0; )
            u["xn" + _t] = 0,
            u["xs" + _t] = "";
        u.xs0 = "",
        u._next = u._prev = u.xfirst = u.data = u.plugin = u.setRatio = u.rxp = null ,
        u.appendXtra = function(e, t, n, i, r, s) {
            var a = this
              , o = a.l;
            return a["xs" + o] += s && o ? " " + e : e || "",
            n || 0 === o || a.plugin ? (a.l++,
            a.type = a.setRatio ? 2 : 1,
            a["xs" + a.l] = i || "",
            o > 0 ? (a.data["xn" + o] = t + n,
            a.rxp["xn" + o] = r,
            a["xn" + o] = t,
            a.plugin || (a.xfirst = new gt(a,"xn" + o,t,n,a.xfirst || a,0,a.n,r,a.pr),
            a.xfirst.xs0 = 0),
            a) : (a.data = {
                s: t + n
            },
            a.rxp = {},
            a.s = t,
            a.c = n,
            a.r = r,
            a)) : (a["xs" + o] += t + (i || ""),
            a)
        }
        ;
        var yt = function(e, t) {
            t = t || {},
            this.p = t.prefix ? X(e) || e : e,
            l[e] = l[this.p] = this,
            this.format = t.formatter || dt(t.defaultValue, t.color, t.collapsible, t.multi),
            t.parser && (this.parse = t.parser),
            this.clrs = t.color,
            this.multi = t.multi,
            this.keyword = t.keyword,
            this.dflt = t.defaultValue,
            this.pr = t.priority || 0
        }
          , bt = F._registerComplexSpecialProp = function(e, t, n) {
            "object" != typeof t && (t = {
                parser: n
            });
            var i, r, s = e.split(","), a = t.defaultValue;
            for (n = n || [a],
            i = 0; i < s.length; i++)
                t.prefix = 0 === i && t.prefix,
                t.defaultValue = n[i] || a,
                r = new yt(s[i],t)
        }
          , wt = function(e) {
            if (!l[e]) {
                var t = e.charAt(0).toUpperCase() + e.substr(1) + "Plugin";
                bt(e, {
                    parser: function(e, n, i, r, s, a, u) {
                        var c = o.com.greensock.plugins[t];
                        return c ? (c._cssRegister(),
                        l[i].parse(e, n, i, r, s, a, u)) : (H("Error: " + t + " js file not loaded."),
                        s)
                    }
                })
            }
        }
        ;
        u = yt.prototype,
        u.parseComplex = function(e, t, n, i, r, s) {
            var a, o, l, u, c, h, d = this.keyword;
            if (this.multi && (E.test(n) || E.test(t) ? (o = t.replace(E, "|").split("|"),
            l = n.replace(E, "|").split("|")) : d && (o = [t],
            l = [n])),
            l) {
                for (u = l.length > o.length ? l.length : o.length,
                a = 0; u > a; a++)
                    t = o[a] = o[a] || this.dflt,
                    n = l[a] = l[a] || this.dflt,
                    d && (c = t.indexOf(d),
                    h = n.indexOf(d),
                    c !== h && (-1 === h ? o[a] = o[a].split(d).join("") : -1 === c && (o[a] += " " + d)));
                t = o.join(", "),
                n = l.join(", ")
            }
            return vt(e, this.p, t, n, this.clrs, this.dflt, i, this.pr, r, s)
        }
        ,
        u.parse = function(e, t, n, i, s, a) {
            return this.parseComplex(e.style, this.format(Y(e, this.p, r, !1, this.dflt)), this.format(t), s, a)
        }
        ,
        a.registerSpecialProp = function(e, t, n) {
            bt(e, {
                parser: function(e, i, r, s, a, o) {
                    var l = new gt(e,r,0,0,a,2,r,!1,n);
                    return l.plugin = o,
                    l.setRatio = t(e, i, s._tween, r),
                    l
                },
                priority: n
            })
        }
        ,
        a.useSVGTransformAttr = d || p;
        var xt, Tt = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","), Pt = X("transform"), St = U + "transform", kt = X("transformOrigin"), At = null  !== X("perspective"), Ct = F.Transform = function() {
            this.perspective = parseFloat(a.defaultTransformPerspective) || 0,
            this.force3D = a.defaultForce3D !== !1 && At ? a.defaultForce3D || "auto" : !1
        }
        , jt = window.SVGElement, Ot = function(e, t, n) {
            var i, r = L.createElementNS("http://www.w3.org/2000/svg", e), s = /([a-z])([A-Z])/g;
            for (i in n)
                r.setAttributeNS(null , i.replace(s, "$1-$2").toLowerCase(), n[i]);
            return t.appendChild(r),
            r
        }
        , Mt = L.documentElement, Et = function() {
            var e, t, n, i = g || /Android/i.test($) && !window.chrome;
            return L.createElementNS && !i && (e = Ot("svg", Mt),
            t = Ot("rect", e, {
                width: 100,
                height: 50,
                x: 100
            }),
            n = t.getBoundingClientRect().width,
            t.style[kt] = "50% 50%",
            t.style[Pt] = "scaleX(0.5)",
            i = n === t.getBoundingClientRect().width && !(p && At),
            Mt.removeChild(e)),
            i
        }(), Dt = function(e, t, n, i, r) {
            var s, o, l, u, c, h, d, p, f, g, m, v, _, y, b = e._gsTransform, w = Lt(e, !0);
            b && (_ = b.xOrigin,
            y = b.yOrigin),
            (!i || (s = i.split(" ")).length < 2) && (d = e.getBBox(),
            t = it(t).split(" "),
            s = [(-1 !== t[0].indexOf("%") ? parseFloat(t[0]) / 100 * d.width : parseFloat(t[0])) + d.x, (-1 !== t[1].indexOf("%") ? parseFloat(t[1]) / 100 * d.height : parseFloat(t[1])) + d.y]),
            n.xOrigin = u = parseFloat(s[0]),
            n.yOrigin = c = parseFloat(s[1]),
            i && w !== It && (h = w[0],
            d = w[1],
            p = w[2],
            f = w[3],
            g = w[4],
            m = w[5],
            v = h * f - d * p,
            o = u * (f / v) + c * (-p / v) + (p * m - f * g) / v,
            l = u * (-d / v) + c * (h / v) - (h * m - d * g) / v,
            u = n.xOrigin = s[0] = o,
            c = n.yOrigin = s[1] = l),
            b && (r || r !== !1 && a.defaultSmoothOrigin !== !1 ? (o = u - _,
            l = c - y,
            b.xOffset += o * w[0] + l * w[2] - o,
            b.yOffset += o * w[1] + l * w[3] - l) : b.xOffset = b.yOffset = 0),
            e.setAttribute("data-svg-origin", s.join(" "))
        }
        , Nt = function(e) {
            return !!(jt && "function" == typeof e.getBBox && e.getCTM && (!e.parentNode || e.parentNode.getBBox && e.parentNode.getCTM))
        }
        , It = [1, 0, 0, 1, 0, 0], Lt = function(e, t) {
            var n, i, r, s, a, o = e._gsTransform || new Ct, l = 1e5;
            if (Pt ? i = Y(e, St, null , !0) : e.currentStyle && (i = e.currentStyle.filter.match(O),
            i = i && 4 === i.length ? [i[0].substr(4), Number(i[2].substr(4)), Number(i[1].substr(4)), i[3].substr(4), o.x || 0, o.y || 0].join(",") : ""),
            n = !i || "none" === i || "matrix(1, 0, 0, 1, 0, 0)" === i,
            (o.svg || e.getBBox && Nt(e)) && (n && -1 !== (e.style[Pt] + "").indexOf("matrix") && (i = e.style[Pt],
            n = 0),
            r = e.getAttribute("transform"),
            n && r && (-1 !== r.indexOf("matrix") ? (i = r,
            n = 0) : -1 !== r.indexOf("translate") && (i = "matrix(1,0,0,1," + r.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") + ")",
            n = 0))),
            n)
                return It;
            for (r = (i || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [],
            _t = r.length; --_t > -1; )
                s = Number(r[_t]),
                r[_t] = (a = s - (s |= 0)) ? (0 | a * l + (0 > a ? -.5 : .5)) / l + s : s;
            return t && r.length > 6 ? [r[0], r[1], r[4], r[5], r[12], r[13]] : r
        }
        , Rt = F.getTransform = function(e, n, i, s) {
            if (e._gsTransform && i && !s)
                return e._gsTransform;
            var o, l, u, c, h, d, p = i ? e._gsTransform || new Ct : new Ct, f = p.scaleX < 0, g = 2e-5, m = 1e5, v = At ? parseFloat(Y(e, kt, n, !1, "0 0 0").split(" ")[2]) || p.zOrigin || 0 : 0, _ = parseFloat(a.defaultTransformPerspective) || 0;
            if (p.svg = !(!e.getBBox || !Nt(e)),
            p.svg && (Dt(e, Y(e, kt, r, !1, "50% 50%") + "", p, e.getAttribute("data-svg-origin")),
            xt = a.useSVGTransformAttr || Et),
            o = Lt(e),
            o !== It) {
                if (16 === o.length) {
                    var y, b, w, x, T, P = o[0], S = o[1], k = o[2], A = o[3], C = o[4], j = o[5], O = o[6], M = o[7], E = o[8], D = o[9], I = o[10], L = o[12], R = o[13], V = o[14], B = o[11], F = Math.atan2(O, I);
                    p.zOrigin && (V = -p.zOrigin,
                    L = E * V - o[12],
                    R = D * V - o[13],
                    V = I * V + p.zOrigin - o[14]),
                    p.rotationX = F * N,
                    F && (x = Math.cos(-F),
                    T = Math.sin(-F),
                    y = C * x + E * T,
                    b = j * x + D * T,
                    w = O * x + I * T,
                    E = C * -T + E * x,
                    D = j * -T + D * x,
                    I = O * -T + I * x,
                    B = M * -T + B * x,
                    C = y,
                    j = b,
                    O = w),
                    F = Math.atan2(-k, I),
                    p.rotationY = F * N,
                    F && (x = Math.cos(-F),
                    T = Math.sin(-F),
                    y = P * x - E * T,
                    b = S * x - D * T,
                    w = k * x - I * T,
                    D = S * T + D * x,
                    I = k * T + I * x,
                    B = A * T + B * x,
                    P = y,
                    S = b,
                    k = w),
                    F = Math.atan2(S, P),
                    p.rotation = F * N,
                    F && (x = Math.cos(-F),
                    T = Math.sin(-F),
                    P = P * x + C * T,
                    b = S * x + j * T,
                    j = S * -T + j * x,
                    O = k * -T + O * x,
                    S = b),
                    p.rotationX && Math.abs(p.rotationX) + Math.abs(p.rotation) > 359.9 && (p.rotationX = p.rotation = 0,
                    p.rotationY = 180 - p.rotationY),
                    p.scaleX = (0 | Math.sqrt(P * P + S * S) * m + .5) / m,
                    p.scaleY = (0 | Math.sqrt(j * j + D * D) * m + .5) / m,
                    p.scaleZ = (0 | Math.sqrt(O * O + I * I) * m + .5) / m,
                    p.skewX = 0,
                    p.perspective = B ? 1 / (0 > B ? -B : B) : 0,
                    p.x = L,
                    p.y = R,
                    p.z = V,
                    p.svg && (p.x -= p.xOrigin - (p.xOrigin * P - p.yOrigin * C),
                    p.y -= p.yOrigin - (p.yOrigin * S - p.xOrigin * j))
                } else if (!(At && !s && o.length && p.x === o[4] && p.y === o[5] && (p.rotationX || p.rotationY) || void 0 !== p.x && "none" === Y(e, "display", n))) {
                    var $ = o.length >= 6
                      , q = $ ? o[0] : 1
                      , z = o[1] || 0
                      , H = o[2] || 0
                      , U = $ ? o[3] : 1;
                    p.x = o[4] || 0,
                    p.y = o[5] || 0,
                    u = Math.sqrt(q * q + z * z),
                    c = Math.sqrt(U * U + H * H),
                    h = q || z ? Math.atan2(z, q) * N : p.rotation || 0,
                    d = H || U ? Math.atan2(H, U) * N + h : p.skewX || 0,
                    Math.abs(d) > 90 && Math.abs(d) < 270 && (f ? (u *= -1,
                    d += 0 >= h ? 180 : -180,
                    h += 0 >= h ? 180 : -180) : (c *= -1,
                    d += 0 >= d ? 180 : -180)),
                    p.scaleX = u,
                    p.scaleY = c,
                    p.rotation = h,
                    p.skewX = d,
                    At && (p.rotationX = p.rotationY = p.z = 0,
                    p.perspective = _,
                    p.scaleZ = 1),
                    p.svg && (p.x -= p.xOrigin - (p.xOrigin * q + p.yOrigin * H),
                    p.y -= p.yOrigin - (p.xOrigin * z + p.yOrigin * U))
                }
                p.zOrigin = v;
                for (l in p)
                    p[l] < g && p[l] > -g && (p[l] = 0)
            }
            return i && (e._gsTransform = p,
            p.svg && (xt && e.style[Pt] ? t.delayedCall(.001, function() {
                $t(e.style, Pt)
            }) : !xt && e.getAttribute("transform") && t.delayedCall(.001, function() {
                e.removeAttribute("transform")
            }))),
            p
        }
        , Vt = function(e) {
            var t, n, i = this.data, r = -i.rotation * D, s = r + i.skewX * D, a = 1e5, o = (0 | Math.cos(r) * i.scaleX * a) / a, l = (0 | Math.sin(r) * i.scaleX * a) / a, u = (0 | Math.sin(s) * -i.scaleY * a) / a, c = (0 | Math.cos(s) * i.scaleY * a) / a, h = this.t.style, d = this.t.currentStyle;
            if (d) {
                n = l,
                l = -u,
                u = -n,
                t = d.filter,
                h.filter = "";
                var p, f, m = this.t.offsetWidth, v = this.t.offsetHeight, _ = "absolute" !== d.position, y = "progid:DXImageTransform.Microsoft.Matrix(M11=" + o + ", M12=" + l + ", M21=" + u + ", M22=" + c, x = i.x + m * i.xPercent / 100, T = i.y + v * i.yPercent / 100;
                if (null  != i.ox && (p = (i.oxp ? .01 * m * i.ox : i.ox) - m / 2,
                f = (i.oyp ? .01 * v * i.oy : i.oy) - v / 2,
                x += p - (p * o + f * l),
                T += f - (p * u + f * c)),
                _ ? (p = m / 2,
                f = v / 2,
                y += ", Dx=" + (p - (p * o + f * l) + x) + ", Dy=" + (f - (p * u + f * c) + T) + ")") : y += ", sizingMethod='auto expand')",
                h.filter = -1 !== t.indexOf("DXImageTransform.Microsoft.Matrix(") ? t.replace(M, y) : y + " " + t,
                (0 === e || 1 === e) && 1 === o && 0 === l && 0 === u && 1 === c && (_ && -1 === y.indexOf("Dx=0, Dy=0") || w.test(t) && 100 !== parseFloat(RegExp.$1) || -1 === t.indexOf(t.indexOf("Alpha")) && h.removeAttribute("filter")),
                !_) {
                    var P, S, k, A = 8 > g ? 1 : -1;
                    for (p = i.ieOffsetX || 0,
                    f = i.ieOffsetY || 0,
                    i.ieOffsetX = Math.round((m - ((0 > o ? -o : o) * m + (0 > l ? -l : l) * v)) / 2 + x),
                    i.ieOffsetY = Math.round((v - ((0 > c ? -c : c) * v + (0 > u ? -u : u) * m)) / 2 + T),
                    _t = 0; 4 > _t; _t++)
                        S = tt[_t],
                        P = d[S],
                        n = -1 !== P.indexOf("px") ? parseFloat(P) : Q(this.t, S, parseFloat(P), P.replace(b, "")) || 0,
                        k = n !== i[S] ? 2 > _t ? -i.ieOffsetX : -i.ieOffsetY : 2 > _t ? p - i.ieOffsetX : f - i.ieOffsetY,
                        h[S] = (i[S] = Math.round(n - k * (0 === _t || 2 === _t ? 1 : A))) + "px"
                }
            }
        }
        , Bt = F.set3DTransformRatio = F.setTransformRatio = function(e) {
            var t, n, i, r, s, a, o, l, u, c, h, d, f, g, m, v, _, y, b, w, x, T, P, S = this.data, k = this.t.style, A = S.rotation, C = S.rotationX, j = S.rotationY, O = S.scaleX, M = S.scaleY, E = S.scaleZ, N = S.x, I = S.y, L = S.z, R = S.svg, V = S.perspective, B = S.force3D;
            if (!(((1 !== e && 0 !== e || "auto" !== B || this.tween._totalTime !== this.tween._totalDuration && this.tween._totalTime) && B || L || V || j || C || 1 !== E) && (!xt || !R) && At))
                return void (A || S.skewX || R ? (A *= D,
                T = S.skewX * D,
                P = 1e5,
                t = Math.cos(A) * O,
                r = Math.sin(A) * O,
                n = Math.sin(A - T) * -M,
                s = Math.cos(A - T) * M,
                T && "simple" === S.skewType && (_ = Math.tan(T),
                _ = Math.sqrt(1 + _ * _),
                n *= _,
                s *= _,
                S.skewY && (t *= _,
                r *= _)),
                R && (N += S.xOrigin - (S.xOrigin * t + S.yOrigin * n) + S.xOffset,
                I += S.yOrigin - (S.xOrigin * r + S.yOrigin * s) + S.yOffset,
                xt && (S.xPercent || S.yPercent) && (g = this.t.getBBox(),
                N += .01 * S.xPercent * g.width,
                I += .01 * S.yPercent * g.height),
                g = 1e-6,
                g > N && N > -g && (N = 0),
                g > I && I > -g && (I = 0)),
                b = (0 | t * P) / P + "," + (0 | r * P) / P + "," + (0 | n * P) / P + "," + (0 | s * P) / P + "," + N + "," + I + ")",
                R && xt ? this.t.setAttribute("transform", "matrix(" + b) : k[Pt] = (S.xPercent || S.yPercent ? "translate(" + S.xPercent + "%," + S.yPercent + "%) matrix(" : "matrix(") + b) : k[Pt] = (S.xPercent || S.yPercent ? "translate(" + S.xPercent + "%," + S.yPercent + "%) matrix(" : "matrix(") + O + ",0,0," + M + "," + N + "," + I + ")");
            if (p && (g = 1e-4,
            g > O && O > -g && (O = E = 2e-5),
            g > M && M > -g && (M = E = 2e-5),
            !V || S.z || S.rotationX || S.rotationY || (V = 0)),
            A || S.skewX)
                A *= D,
                m = t = Math.cos(A),
                v = r = Math.sin(A),
                S.skewX && (A -= S.skewX * D,
                m = Math.cos(A),
                v = Math.sin(A),
                "simple" === S.skewType && (_ = Math.tan(S.skewX * D),
                _ = Math.sqrt(1 + _ * _),
                m *= _,
                v *= _,
                S.skewY && (t *= _,
                r *= _))),
                n = -v,
                s = m;
            else {
                if (!(j || C || 1 !== E || V || R))
                    return void (k[Pt] = (S.xPercent || S.yPercent ? "translate(" + S.xPercent + "%," + S.yPercent + "%) translate3d(" : "translate3d(") + N + "px," + I + "px," + L + "px)" + (1 !== O || 1 !== M ? " scale(" + O + "," + M + ")" : ""));
                t = s = 1,
                n = r = 0
            }
            u = 1,
            i = a = o = l = c = h = 0,
            d = V ? -1 / V : 0,
            f = S.zOrigin,
            g = 1e-6,
            w = ",",
            x = "0",
            A = j * D,
            A && (m = Math.cos(A),
            v = Math.sin(A),
            o = -v,
            c = d * -v,
            i = t * v,
            a = r * v,
            u = m,
            d *= m,
            t *= m,
            r *= m),
            A = C * D,
            A && (m = Math.cos(A),
            v = Math.sin(A),
            _ = n * m + i * v,
            y = s * m + a * v,
            l = u * v,
            h = d * v,
            i = n * -v + i * m,
            a = s * -v + a * m,
            u *= m,
            d *= m,
            n = _,
            s = y),
            1 !== E && (i *= E,
            a *= E,
            u *= E,
            d *= E),
            1 !== M && (n *= M,
            s *= M,
            l *= M,
            h *= M),
            1 !== O && (t *= O,
            r *= O,
            o *= O,
            c *= O),
            (f || R) && (f && (N += i * -f,
            I += a * -f,
            L += u * -f + f),
            R && (N += S.xOrigin - (S.xOrigin * t + S.yOrigin * n) + S.xOffset,
            I += S.yOrigin - (S.xOrigin * r + S.yOrigin * s) + S.yOffset),
            g > N && N > -g && (N = x),
            g > I && I > -g && (I = x),
            g > L && L > -g && (L = 0)),
            b = S.xPercent || S.yPercent ? "translate(" + S.xPercent + "%," + S.yPercent + "%) matrix3d(" : "matrix3d(",
            b += (g > t && t > -g ? x : t) + w + (g > r && r > -g ? x : r) + w + (g > o && o > -g ? x : o),
            b += w + (g > c && c > -g ? x : c) + w + (g > n && n > -g ? x : n) + w + (g > s && s > -g ? x : s),
            C || j || 1 !== E ? (b += w + (g > l && l > -g ? x : l) + w + (g > h && h > -g ? x : h) + w + (g > i && i > -g ? x : i),
            b += w + (g > a && a > -g ? x : a) + w + (g > u && u > -g ? x : u) + w + (g > d && d > -g ? x : d) + w) : b += ",0,0,0,0,1,0,",
            b += N + w + I + w + L + w + (V ? 1 + -L / V : 1) + ")",
            k[Pt] = b
        }
        ;
        u = Ct.prototype,
        u.x = u.y = u.z = u.skewX = u.skewY = u.rotation = u.rotationX = u.rotationY = u.zOrigin = u.xPercent = u.yPercent = u.xOffset = u.yOffset = 0,
        u.scaleX = u.scaleY = u.scaleZ = 1,
        bt("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
            parser: function(e, t, n, i, s, o, l) {
                if (i._lastParsedTransform === l)
                    return s;
                i._lastParsedTransform = l;
                var u, c, h, d, p, f, g, m, v, _, y = e._gsTransform, b = e.style, w = 1e-6, x = Tt.length, T = l, P = {}, S = "transformOrigin";
                if (l.display ? (d = Y(e, "display"),
                b.display = "block",
                u = Rt(e, r, !0, l.parseTransform),
                b.display = d) : u = Rt(e, r, !0, l.parseTransform),
                i._transform = u,
                "string" == typeof T.transform && Pt)
                    d = V.style,
                    d[Pt] = T.transform,
                    d.display = "block",
                    d.position = "absolute",
                    L.body.appendChild(V),
                    c = Rt(V, null , !1),
                    L.body.removeChild(V),
                    c.perspective || (c.perspective = u.perspective),
                    null  != T.xPercent && (c.xPercent = st(T.xPercent, u.xPercent)),
                    null  != T.yPercent && (c.yPercent = st(T.yPercent, u.yPercent));
                else if ("object" == typeof T) {
                    if (c = {
                        scaleX: st(null  != T.scaleX ? T.scaleX : T.scale, u.scaleX),
                        scaleY: st(null  != T.scaleY ? T.scaleY : T.scale, u.scaleY),
                        scaleZ: st(T.scaleZ, u.scaleZ),
                        x: st(T.x, u.x),
                        y: st(T.y, u.y),
                        z: st(T.z, u.z),
                        xPercent: st(T.xPercent, u.xPercent),
                        yPercent: st(T.yPercent, u.yPercent),
                        perspective: st(T.transformPerspective, u.perspective)
                    },
                    m = T.directionalRotation,
                    null  != m)
                        if ("object" == typeof m)
                            for (d in m)
                                T[d] = m[d];
                        else
                            T.rotation = m;
                    "string" == typeof T.x && -1 !== T.x.indexOf("%") && (c.x = 0,
                    c.xPercent = st(T.x, u.xPercent)),
                    "string" == typeof T.y && -1 !== T.y.indexOf("%") && (c.y = 0,
                    c.yPercent = st(T.y, u.yPercent)),
                    c.rotation = at("rotation" in T ? T.rotation : "shortRotation" in T ? T.shortRotation + "_short" : "rotationZ" in T ? T.rotationZ : u.rotation, u.rotation, "rotation", P),
                    At && (c.rotationX = at("rotationX" in T ? T.rotationX : "shortRotationX" in T ? T.shortRotationX + "_short" : u.rotationX || 0, u.rotationX, "rotationX", P),
                    c.rotationY = at("rotationY" in T ? T.rotationY : "shortRotationY" in T ? T.shortRotationY + "_short" : u.rotationY || 0, u.rotationY, "rotationY", P)),
                    c.skewX = null  == T.skewX ? u.skewX : at(T.skewX, u.skewX),
                    c.skewY = null  == T.skewY ? u.skewY : at(T.skewY, u.skewY),
                    (h = c.skewY - u.skewY) && (c.skewX += h,
                    c.rotation += h)
                }
                for (At && null  != T.force3D && (u.force3D = T.force3D,
                g = !0),
                u.skewType = T.skewType || u.skewType || a.defaultSkewType,
                f = u.force3D || u.z || u.rotationX || u.rotationY || c.z || c.rotationX || c.rotationY || c.perspective,
                f || null  == T.scale || (c.scaleZ = 1); --x > -1; )
                    n = Tt[x],
                    p = c[n] - u[n],
                    (p > w || -w > p || null  != T[n] || null  != I[n]) && (g = !0,
                    s = new gt(u,n,u[n],p,s),
                    n in P && (s.e = P[n]),
                    s.xs0 = 0,
                    s.plugin = o,
                    i._overwriteProps.push(s.n));
                return p = T.transformOrigin,
                u.svg && (p || T.svgOrigin) && (v = u.xOffset,
                _ = u.yOffset,
                Dt(e, it(p), c, T.svgOrigin, T.smoothOrigin),
                s = mt(u, "xOrigin", (y ? u : c).xOrigin, c.xOrigin, s, S),
                s = mt(u, "yOrigin", (y ? u : c).yOrigin, c.yOrigin, s, S),
                (v !== u.xOffset || _ !== u.yOffset) && (s = mt(u, "xOffset", y ? v : u.xOffset, u.xOffset, s, S),
                s = mt(u, "yOffset", y ? _ : u.yOffset, u.yOffset, s, S)),
                p = xt ? null  : "0px 0px"),
                (p || At && f && u.zOrigin) && (Pt ? (g = !0,
                n = kt,
                p = (p || Y(e, n, r, !1, "50% 50%")) + "",
                s = new gt(b,n,0,0,s,-1,S),
                s.b = b[n],
                s.plugin = o,
                At ? (d = u.zOrigin,
                p = p.split(" "),
                u.zOrigin = (p.length > 2 && (0 === d || "0px" !== p[2]) ? parseFloat(p[2]) : d) || 0,
                s.xs0 = s.e = p[0] + " " + (p[1] || "50%") + " 0px",
                s = new gt(u,"zOrigin",0,0,s,-1,s.n),
                s.b = d,
                s.xs0 = s.e = u.zOrigin) : s.xs0 = s.e = p) : it(p + "", u)),
                g && (i._transformType = u.svg && xt || !f && 3 !== this._transformType ? 2 : 3),
                s
            },
            prefix: !0
        }),
        bt("boxShadow", {
            defaultValue: "0px 0px 0px 0px #999",
            prefix: !0,
            color: !0,
            multi: !0,
            keyword: "inset"
        }),
        bt("borderRadius", {
            defaultValue: "0px",
            parser: function(e, t, n, s, a) {
                t = this.format(t);
                var o, l, u, c, h, d, p, f, g, m, v, _, y, b, w, x, T = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"], P = e.style;
                for (g = parseFloat(e.offsetWidth),
                m = parseFloat(e.offsetHeight),
                o = t.split(" "),
                l = 0; l < T.length; l++)
                    this.p.indexOf("border") && (T[l] = X(T[l])),
                    h = c = Y(e, T[l], r, !1, "0px"),
                    -1 !== h.indexOf(" ") && (c = h.split(" "),
                    h = c[0],
                    c = c[1]),
                    d = u = o[l],
                    p = parseFloat(h),
                    _ = h.substr((p + "").length),
                    y = "=" === d.charAt(1),
                    y ? (f = parseInt(d.charAt(0) + "1", 10),
                    d = d.substr(2),
                    f *= parseFloat(d),
                    v = d.substr((f + "").length - (0 > f ? 1 : 0)) || "") : (f = parseFloat(d),
                    v = d.substr((f + "").length)),
                    "" === v && (v = i[n] || _),
                    v !== _ && (b = Q(e, "borderLeft", p, _),
                    w = Q(e, "borderTop", p, _),
                    "%" === v ? (h = 100 * (b / g) + "%",
                    c = 100 * (w / m) + "%") : "em" === v ? (x = Q(e, "borderLeft", 1, "em"),
                    h = b / x + "em",
                    c = w / x + "em") : (h = b + "px",
                    c = w + "px"),
                    y && (d = parseFloat(h) + f + v,
                    u = parseFloat(c) + f + v)),
                    a = vt(P, T[l], h + " " + c, d + " " + u, !1, "0px", a);
                return a
            },
            prefix: !0,
            formatter: dt("0px 0px 0px 0px", !1, !0)
        }),
        bt("backgroundPosition", {
            defaultValue: "0 0",
            parser: function(e, t, n, i, s, a) {
                var o, l, u, c, h, d, p = "background-position", f = r || W(e, null ), m = this.format((f ? g ? f.getPropertyValue(p + "-x") + " " + f.getPropertyValue(p + "-y") : f.getPropertyValue(p) : e.currentStyle.backgroundPositionX + " " + e.currentStyle.backgroundPositionY) || "0 0"), v = this.format(t);
                if (-1 !== m.indexOf("%") != (-1 !== v.indexOf("%")) && (d = Y(e, "backgroundImage").replace(A, ""),
                d && "none" !== d)) {
                    for (o = m.split(" "),
                    l = v.split(" "),
                    B.setAttribute("src", d),
                    u = 2; --u > -1; )
                        m = o[u],
                        c = -1 !== m.indexOf("%"),
                        c !== (-1 !== l[u].indexOf("%")) && (h = 0 === u ? e.offsetWidth - B.width : e.offsetHeight - B.height,
                        o[u] = c ? parseFloat(m) / 100 * h + "px" : 100 * (parseFloat(m) / h) + "%");
                    m = o.join(" ")
                }
                return this.parseComplex(e.style, m, v, s, a)
            },
            formatter: it
        }),
        bt("backgroundSize", {
            defaultValue: "0 0",
            formatter: it
        }),
        bt("perspective", {
            defaultValue: "0px",
            prefix: !0
        }),
        bt("perspectiveOrigin", {
            defaultValue: "50% 50%",
            prefix: !0
        }),
        bt("transformStyle", {
            prefix: !0
        }),
        bt("backfaceVisibility", {
            prefix: !0
        }),
        bt("userSelect", {
            prefix: !0
        }),
        bt("margin", {
            parser: pt("marginTop,marginRight,marginBottom,marginLeft")
        }),
        bt("padding", {
            parser: pt("paddingTop,paddingRight,paddingBottom,paddingLeft")
        }),
        bt("clip", {
            defaultValue: "rect(0px,0px,0px,0px)",
            parser: function(e, t, n, i, s, a) {
                var o, l, u;
                return 9 > g ? (l = e.currentStyle,
                u = 8 > g ? " " : ",",
                o = "rect(" + l.clipTop + u + l.clipRight + u + l.clipBottom + u + l.clipLeft + ")",
                t = this.format(t).split(",").join(u)) : (o = this.format(Y(e, this.p, r, !1, this.dflt)),
                t = this.format(t)),
                this.parseComplex(e.style, o, t, s, a)
            }
        }),
        bt("textShadow", {
            defaultValue: "0px 0px 0px #999",
            color: !0,
            multi: !0
        }),
        bt("autoRound,strictUnits", {
            parser: function(e, t, n, i, r) {
                return r
            }
        }),
        bt("border", {
            defaultValue: "0px solid #000",
            parser: function(e, t, n, i, s, a) {
                return this.parseComplex(e.style, this.format(Y(e, "borderTopWidth", r, !1, "0px") + " " + Y(e, "borderTopStyle", r, !1, "solid") + " " + Y(e, "borderTopColor", r, !1, "#000")), this.format(t), s, a)
            },
            color: !0,
            formatter: function(e) {
                var t = e.split(" ");
                return t[0] + " " + (t[1] || "solid") + " " + (e.match(ht) || ["#000"])[0]
            }
        }),
        bt("borderWidth", {
            parser: pt("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
        }),
        bt("float,cssFloat,styleFloat", {
            parser: function(e, t, n, i, r) {
                var s = e.style
                  , a = "cssFloat" in s ? "cssFloat" : "styleFloat";
                return new gt(s,a,0,0,r,-1,n,!1,0,s[a],t)
            }
        });
        var Ft = function(e) {
            var t, n = this.t, i = n.filter || Y(this.data, "filter") || "", r = 0 | this.s + this.c * e;
            100 === r && (-1 === i.indexOf("atrix(") && -1 === i.indexOf("radient(") && -1 === i.indexOf("oader(") ? (n.removeAttribute("filter"),
            t = !Y(this.data, "filter")) : (n.filter = i.replace(T, ""),
            t = !0)),
            t || (this.xn1 && (n.filter = i = i || "alpha(opacity=" + r + ")"),
            -1 === i.indexOf("pacity") ? 0 === r && this.xn1 || (n.filter = i + " alpha(opacity=" + r + ")") : n.filter = i.replace(w, "opacity=" + r))
        }
        ;
        bt("opacity,alpha,autoAlpha", {
            defaultValue: "1",
            parser: function(e, t, n, i, s, a) {
                var o = parseFloat(Y(e, "opacity", r, !1, "1"))
                  , l = e.style
                  , u = "autoAlpha" === n;
                return "string" == typeof t && "=" === t.charAt(1) && (t = ("-" === t.charAt(0) ? -1 : 1) * parseFloat(t.substr(2)) + o),
                u && 1 === o && "hidden" === Y(e, "visibility", r) && 0 !== t && (o = 0),
                q ? s = new gt(l,"opacity",o,t - o,s) : (s = new gt(l,"opacity",100 * o,100 * (t - o),s),
                s.xn1 = u ? 1 : 0,
                l.zoom = 1,
                s.type = 2,
                s.b = "alpha(opacity=" + s.s + ")",
                s.e = "alpha(opacity=" + (s.s + s.c) + ")",
                s.data = e,
                s.plugin = a,
                s.setRatio = Ft),
                u && (s = new gt(l,"visibility",0,0,s,-1,null ,!1,0,0 !== o ? "inherit" : "hidden",0 === t ? "hidden" : "inherit"),
                s.xs0 = "inherit",
                i._overwriteProps.push(s.n),
                i._overwriteProps.push(n)),
                s
            }
        });
        var $t = function(e, t) {
            t && (e.removeProperty ? (("ms" === t.substr(0, 2) || "webkit" === t.substr(0, 6)) && (t = "-" + t),
            e.removeProperty(t.replace(S, "-$1").toLowerCase())) : e.removeAttribute(t))
        }
          , qt = function(e) {
            if (this.t._gsClassPT = this,
            1 === e || 0 === e) {
                this.t.setAttribute("class", 0 === e ? this.b : this.e);
                for (var t = this.data, n = this.t.style; t; )
                    t.v ? n[t.p] = t.v : $t(n, t.p),
                    t = t._next;
                1 === e && this.t._gsClassPT === this && (this.t._gsClassPT = null )
            } else
                this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
        }
        ;
        bt("className", {
            parser: function(e, t, i, s, a, o, l) {
                var u, c, h, d, p, f = e.getAttribute("class") || "", g = e.style.cssText;
                if (a = s._classNamePT = new gt(e,i,0,0,a,2),
                a.setRatio = qt,
                a.pr = -11,
                n = !0,
                a.b = f,
                c = Z(e, r),
                h = e._gsClassPT) {
                    for (d = {},
                    p = h.data; p; )
                        d[p.p] = 1,
                        p = p._next;
                    h.setRatio(1)
                }
                return e._gsClassPT = a,
                a.e = "=" !== t.charAt(1) ? t : f.replace(new RegExp("\\s*\\b" + t.substr(2) + "\\b"), "") + ("+" === t.charAt(0) ? " " + t.substr(2) : ""),
                e.setAttribute("class", a.e),
                u = K(e, c, Z(e), l, d),
                e.setAttribute("class", f),
                a.data = u.firstMPT,
                e.style.cssText = g,
                a = a.xfirst = s.parse(e, u.difs, a, o)
            }
        });
        var zt = function(e) {
            if ((1 === e || 0 === e) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                var t, n, i, r, s, a = this.t.style, o = l.transform.parse;
                if ("all" === this.e)
                    a.cssText = "",
                    r = !0;
                else
                    for (t = this.e.split(" ").join("").split(","),
                    i = t.length; --i > -1; )
                        n = t[i],
                        l[n] && (l[n].parse === o ? r = !0 : n = "transformOrigin" === n ? kt : l[n].p),
                        $t(a, n);
                r && ($t(a, Pt),
                s = this.t._gsTransform,
                s && (s.svg && (this.t.removeAttribute("data-svg-origin"),
                this.t.removeAttribute("transform")),
                delete this.t._gsTransform))
            }
        }
        ;
        for (bt("clearProps", {
            parser: function(e, t, i, r, s) {
                return s = new gt(e,i,0,0,s,2),
                s.setRatio = zt,
                s.e = t,
                s.pr = -10,
                s.data = r._tween,
                n = !0,
                s
            }
        }),
        u = "bezier,throwProps,physicsProps,physics2D".split(","),
        _t = u.length; _t--; )
            wt(u[_t]);
        u = a.prototype,
        u._firstPT = u._lastParsedTransform = u._transform = null ,
        u._onInitTween = function(e, t, o) {
            if (!e.nodeType)
                return !1;
            this._target = e,
            this._tween = o,
            this._vars = t,
            c = t.autoRound,
            n = !1,
            i = t.suffixMap || a.suffixMap,
            r = W(e, ""),
            s = this._overwriteProps;
            var u, p, g, m, v, _, y, b, w, T = e.style;
            if (h && "" === T.zIndex && (u = Y(e, "zIndex", r),
            ("auto" === u || "" === u) && this._addLazySet(T, "zIndex", 0)),
            "string" == typeof t && (m = T.cssText,
            u = Z(e, r),
            T.cssText = m + ";" + t,
            u = K(e, u, Z(e)).difs,
            !q && x.test(t) && (u.opacity = parseFloat(RegExp.$1)),
            t = u,
            T.cssText = m),
            this._firstPT = p = t.className ? l.className.parse(e, t.className, "className", this, null , null , t) : this.parse(e, t, null ),
            this._transformType) {
                for (w = 3 === this._transformType,
                Pt ? d && (h = !0,
                "" === T.zIndex && (y = Y(e, "zIndex", r),
                ("auto" === y || "" === y) && this._addLazySet(T, "zIndex", 0)),
                f && this._addLazySet(T, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (w ? "visible" : "hidden"))) : T.zoom = 1,
                g = p; g && g._next; )
                    g = g._next;
                b = new gt(e,"transform",0,0,null ,2),
                this._linkCSSP(b, null , g),
                b.setRatio = Pt ? Bt : Vt,
                b.data = this._transform || Rt(e, r, !0),
                b.tween = o,
                b.pr = -1,
                s.pop()
            }
            if (n) {
                for (; p; ) {
                    for (_ = p._next,
                    g = m; g && g.pr > p.pr; )
                        g = g._next;
                    (p._prev = g ? g._prev : v) ? p._prev._next = p : m = p,
                    (p._next = g) ? g._prev = p : v = p,
                    p = _
                }
                this._firstPT = m
            }
            return !0
        }
        ,
        u.parse = function(e, t, n, s) {
            var a, o, u, h, d, p, f, g, m, v, _ = e.style;
            for (a in t)
                p = t[a],
                o = l[a],
                o ? n = o.parse(e, p, a, this, n, s, t) : (d = Y(e, a, r) + "",
                m = "string" == typeof p,
                "color" === a || "fill" === a || "stroke" === a || -1 !== a.indexOf("Color") || m && P.test(p) ? (m || (p = ut(p),
                p = (p.length > 3 ? "rgba(" : "rgb(") + p.join(",") + ")"),
                n = vt(_, a, d, p, !0, "transparent", n, 0, s)) : !m || -1 === p.indexOf(" ") && -1 === p.indexOf(",") ? (u = parseFloat(d),
                f = u || 0 === u ? d.substr((u + "").length) : "",
                ("" === d || "auto" === d) && ("width" === a || "height" === a ? (u = nt(e, a, r),
                f = "px") : "left" === a || "top" === a ? (u = J(e, a, r),
                f = "px") : (u = "opacity" !== a ? 0 : 1,
                f = "")),
                v = m && "=" === p.charAt(1),
                v ? (h = parseInt(p.charAt(0) + "1", 10),
                p = p.substr(2),
                h *= parseFloat(p),
                g = p.replace(b, "")) : (h = parseFloat(p),
                g = m ? p.replace(b, "") : ""),
                "" === g && (g = a in i ? i[a] : f),
                p = h || 0 === h ? (v ? h + u : h) + g : t[a],
                f !== g && "" !== g && (h || 0 === h) && u && (u = Q(e, a, u, f),
                "%" === g ? (u /= Q(e, a, 100, "%") / 100,
                t.strictUnits !== !0 && (d = u + "%")) : "em" === g || "rem" === g || "vw" === g || "vh" === g ? u /= Q(e, a, 1, g) : "px" !== g && (h = Q(e, a, h, g),
                g = "px"),
                v && (h || 0 === h) && (p = h + u + g)),
                v && (h += u),
                !u && 0 !== u || !h && 0 !== h ? void 0 !== _[a] && (p || "NaN" != p + "" && null  != p) ? (n = new gt(_,a,h || u || 0,0,n,-1,a,!1,0,d,p),
                n.xs0 = "none" !== p || "display" !== a && -1 === a.indexOf("Style") ? p : d) : H("invalid " + a + " tween value: " + t[a]) : (n = new gt(_,a,u,h - u,n,0,a,c !== !1 && ("px" === g || "zIndex" === a),0,d,p),
                n.xs0 = g)) : n = vt(_, a, d, p, !0, null , n, 0, s)),
                s && n && !n.plugin && (n.plugin = s);
            return n
        }
        ,
        u.setRatio = function(e) {
            var t, n, i, r = this._firstPT, s = 1e-6;
            if (1 !== e || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
                if (e || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6)
                    for (; r; ) {
                        if (t = r.c * e + r.s,
                        r.r ? t = Math.round(t) : s > t && t > -s && (t = 0),
                        r.type)
                            if (1 === r.type)
                                if (i = r.l,
                                2 === i)
                                    r.t[r.p] = r.xs0 + t + r.xs1 + r.xn1 + r.xs2;
                                else if (3 === i)
                                    r.t[r.p] = r.xs0 + t + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3;
                                else if (4 === i)
                                    r.t[r.p] = r.xs0 + t + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4;
                                else if (5 === i)
                                    r.t[r.p] = r.xs0 + t + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4 + r.xn4 + r.xs5;
                                else {
                                    for (n = r.xs0 + t + r.xs1,
                                    i = 1; i < r.l; i++)
                                        n += r["xn" + i] + r["xs" + (i + 1)];
                                    r.t[r.p] = n
                                }
                            else
                                -1 === r.type ? r.t[r.p] = r.xs0 : r.setRatio && r.setRatio(e);
                        else
                            r.t[r.p] = t + r.xs0;
                        r = r._next
                    }
                else
                    for (; r; )
                        2 !== r.type ? r.t[r.p] = r.b : r.setRatio(e),
                        r = r._next;
            else
                for (; r; ) {
                    if (2 !== r.type)
                        if (r.r && -1 !== r.type)
                            if (t = Math.round(r.s + r.c),
                            r.type) {
                                if (1 === r.type) {
                                    for (i = r.l,
                                    n = r.xs0 + t + r.xs1,
                                    i = 1; i < r.l; i++)
                                        n += r["xn" + i] + r["xs" + (i + 1)];
                                    r.t[r.p] = n
                                }
                            } else
                                r.t[r.p] = t + r.xs0;
                        else
                            r.t[r.p] = r.e;
                    else
                        r.setRatio(e);
                    r = r._next
                }
        }
        ,
        u._enableTransforms = function(e) {
            this._transform = this._transform || Rt(this._target, r, !0),
            this._transformType = this._transform.svg && xt || !e && 3 !== this._transformType ? 2 : 3
        }
        ;
        var Ht = function() {
            this.t[this.p] = this.e,
            this.data._linkCSSP(this, this._next, null , !0)
        }
        ;
        u._addLazySet = function(e, t, n) {
            var i = this._firstPT = new gt(e,t,0,0,this._firstPT,2);
            i.e = n,
            i.setRatio = Ht,
            i.data = this
        }
        ,
        u._linkCSSP = function(e, t, n, i) {
            return e && (t && (t._prev = e),
            e._next && (e._next._prev = e._prev),
            e._prev ? e._prev._next = e._next : this._firstPT === e && (this._firstPT = e._next,
            i = !0),
            n ? n._next = e : i || null  !== this._firstPT || (this._firstPT = e),
            e._next = t,
            e._prev = n),
            e
        }
        ,
        u._kill = function(t) {
            var n, i, r, s = t;
            if (t.autoAlpha || t.alpha) {
                s = {};
                for (i in t)
                    s[i] = t[i];
                s.opacity = 1,
                s.autoAlpha && (s.visibility = 1)
            }
            return t.className && (n = this._classNamePT) && (r = n.xfirst,
            r && r._prev ? this._linkCSSP(r._prev, n._next, r._prev._prev) : r === this._firstPT && (this._firstPT = n._next),
            n._next && this._linkCSSP(n._next, n._next._next, r._prev),
            this._classNamePT = null ),
            e.prototype._kill.call(this, s)
        }
        ;
        var Ut = function(e, t, n) {
            var i, r, s, a;
            if (e.slice)
                for (r = e.length; --r > -1; )
                    Ut(e[r], t, n);
            else
                for (i = e.childNodes,
                r = i.length; --r > -1; )
                    s = i[r],
                    a = s.type,
                    s.style && (t.push(Z(s)),
                    n && n.push(s)),
                    1 !== a && 9 !== a && 11 !== a || !s.childNodes.length || Ut(s, t, n)
        }
        ;
        return a.cascadeTo = function(e, n, i) {
            var r, s, a, o, l = t.to(e, n, i), u = [l], c = [], h = [], d = [], p = t._internals.reservedProps;
            for (e = l._targets || l.target,
            Ut(e, c, d),
            l.render(n, !0, !0),
            Ut(e, h),
            l.render(0, !0, !0),
            l._enabled(!0),
            r = d.length; --r > -1; )
                if (s = K(d[r], c[r], h[r]),
                s.firstMPT) {
                    s = s.difs;
                    for (a in i)
                        p[a] && (s[a] = i[a]);
                    o = {};
                    for (a in s)
                        o[a] = c[r][a];
                    u.push(t.fromTo(d[r], n, o, s))
                }
            return u
        }
        ,
        e.activate([a]),
        a
    }, !0),
    function() {
        var e = _gsScope._gsDefine.plugin({
            propName: "roundProps",
            version: "1.5",
            priority: -1,
            API: 2,
            init: function(e, t, n) {
                return this._tween = n,
                !0
            }
        })
          , t = function(e) {
            for (; e; )
                e.f || e.blob || (e.r = 1),
                e = e._next
        }
          , n = e.prototype;
        n._onInitAllProps = function() {
            for (var e, n, i, r = this._tween, s = r.vars.roundProps.join ? r.vars.roundProps : r.vars.roundProps.split(","), a = s.length, o = {}, l = r._propLookup.roundProps; --a > -1; )
                o[s[a]] = 1;
            for (a = s.length; --a > -1; )
                for (e = s[a],
                n = r._firstPT; n; )
                    i = n._next,
                    n.pg ? n.t._roundProps(o, !0) : n.n === e && (2 === n.f && n.t ? t(n.t._firstPT) : (this._add(n.t, e, n.s, n.c),
                    i && (i._prev = n._prev),
                    n._prev ? n._prev._next = i : r._firstPT === n && (r._firstPT = i),
                    n._next = n._prev = null ,
                    r._propLookup[e] = l)),
                    n = i;
            return !1
        }
        ,
        n._add = function(e, t, n, i) {
            this._addTween(e, t, n, n + i, t, !0),
            this._overwriteProps.push(t)
        }
    }(),
    function() {
        _gsScope._gsDefine.plugin({
            propName: "attr",
            API: 2,
            version: "0.5.0",
            init: function(e, t) {
                var n;
                if ("function" != typeof e.setAttribute)
                    return !1;
                for (n in t)
                    this._addTween(e, "setAttribute", e.getAttribute(n) + "", t[n] + "", n, !1, n),
                    this._overwriteProps.push(n);
                return !0
            }
        })
    }(),
    _gsScope._gsDefine.plugin({
        propName: "directionalRotation",
        version: "0.2.1",
        API: 2,
        init: function(e, t) {
            "object" != typeof t && (t = {
                rotation: t
            }),
            this.finals = {};
            var n, i, r, s, a, o, l = t.useRadians === !0 ? 2 * Math.PI : 360, u = 1e-6;
            for (n in t)
                "useRadians" !== n && (o = (t[n] + "").split("_"),
                i = o[0],
                r = parseFloat("function" != typeof e[n] ? e[n] : e[n.indexOf("set") || "function" != typeof e["get" + n.substr(3)] ? n : "get" + n.substr(3)]()),
                s = this.finals[n] = "string" == typeof i && "=" === i.charAt(1) ? r + parseInt(i.charAt(0) + "1", 10) * Number(i.substr(2)) : Number(i) || 0,
                a = s - r,
                o.length && (i = o.join("_"),
                -1 !== i.indexOf("short") && (a %= l,
                a !== a % (l / 2) && (a = 0 > a ? a + l : a - l)),
                -1 !== i.indexOf("_cw") && 0 > a ? a = (a + 9999999999 * l) % l - (0 | a / l) * l : -1 !== i.indexOf("ccw") && a > 0 && (a = (a - 9999999999 * l) % l - (0 | a / l) * l)),
                (a > u || -u > a) && (this._addTween(e, n, r, r + a, n),
                this._overwriteProps.push(n)));
            return !0
        },
        set: function(e) {
            var t;
            if (1 !== e)
                this._super.setRatio.call(this, e);
            else
                for (t = this._firstPT; t; )
                    t.f ? t.t[t.p](this.finals[t.p]) : t.t[t.p] = this.finals[t.p],
                    t = t._next
        }
    })._autoCSS = !0,
    _gsScope._gsDefine("easing.Back", ["easing.Ease"], function(e) {
        var t, n, i, r = _gsScope.GreenSockGlobals || _gsScope, s = r.com.greensock, a = 2 * Math.PI, o = Math.PI / 2, l = s._class, u = function(t, n) {
            var i = l("easing." + t, function() {}, !0)
              , r = i.prototype = new e;
            return r.constructor = i,
            r.getRatio = n,
            i
        }
        , c = e.register || function() {}
        , h = function(e, t, n, i) {
            var r = l("easing." + e, {
                easeOut: new t,
                easeIn: new n,
                easeInOut: new i
            }, !0);
            return c(r, e),
            r
        }
        , d = function(e, t, n) {
            this.t = e,
            this.v = t,
            n && (this.next = n,
            n.prev = this,
            this.c = n.v - t,
            this.gap = n.t - e)
        }
        , p = function(t, n) {
            var i = l("easing." + t, function(e) {
                this._p1 = e || 0 === e ? e : 1.70158,
                this._p2 = 1.525 * this._p1
            }, !0)
              , r = i.prototype = new e;
            return r.constructor = i,
            r.getRatio = n,
            r.config = function(e) {
                return new i(e)
            }
            ,
            i
        }
        , f = h("Back", p("BackOut", function(e) {
            return (e -= 1) * e * ((this._p1 + 1) * e + this._p1) + 1
        }), p("BackIn", function(e) {
            return e * e * ((this._p1 + 1) * e - this._p1)
        }), p("BackInOut", function(e) {
            return (e *= 2) < 1 ? .5 * e * e * ((this._p2 + 1) * e - this._p2) : .5 * ((e -= 2) * e * ((this._p2 + 1) * e + this._p2) + 2)
        })), g = l("easing.SlowMo", function(e, t, n) {
            t = t || 0 === t ? t : .7,
            null  == e ? e = .7 : e > 1 && (e = 1),
            this._p = 1 !== e ? t : 0,
            this._p1 = (1 - e) / 2,
            this._p2 = e,
            this._p3 = this._p1 + this._p2,
            this._calcEnd = n === !0
        }, !0), m = g.prototype = new e;
        return m.constructor = g,
        m.getRatio = function(e) {
            var t = e + (.5 - e) * this._p;
            return e < this._p1 ? this._calcEnd ? 1 - (e = 1 - e / this._p1) * e : t - (e = 1 - e / this._p1) * e * e * e * t : e > this._p3 ? this._calcEnd ? 1 - (e = (e - this._p3) / this._p1) * e : t + (e - t) * (e = (e - this._p3) / this._p1) * e * e * e : this._calcEnd ? 1 : t
        }
        ,
        g.ease = new g(.7,.7),
        m.config = g.config = function(e, t, n) {
            return new g(e,t,n)
        }
        ,
        t = l("easing.SteppedEase", function(e) {
            e = e || 1,
            this._p1 = 1 / e,
            this._p2 = e + 1
        }, !0),
        m = t.prototype = new e,
        m.constructor = t,
        m.getRatio = function(e) {
            return 0 > e ? e = 0 : e >= 1 && (e = .999999999),
            (this._p2 * e >> 0) * this._p1
        }
        ,
        m.config = t.config = function(e) {
            return new t(e)
        }
        ,
        n = l("easing.RoughEase", function(t) {
            t = t || {};
            for (var n, i, r, s, a, o, l = t.taper || "none", u = [], c = 0, h = 0 | (t.points || 20), p = h, f = t.randomize !== !1, g = t.clamp === !0, m = t.template instanceof e ? t.template : null , v = "number" == typeof t.strength ? .4 * t.strength : .4; --p > -1; )
                n = f ? Math.random() : 1 / h * p,
                i = m ? m.getRatio(n) : n,
                "none" === l ? r = v : "out" === l ? (s = 1 - n,
                r = s * s * v) : "in" === l ? r = n * n * v : .5 > n ? (s = 2 * n,
                r = .5 * s * s * v) : (s = 2 * (1 - n),
                r = .5 * s * s * v),
                f ? i += Math.random() * r - .5 * r : p % 2 ? i += .5 * r : i -= .5 * r,
                g && (i > 1 ? i = 1 : 0 > i && (i = 0)),
                u[c++] = {
                    x: n,
                    y: i
                };
            for (u.sort(function(e, t) {
                return e.x - t.x
            }),
            o = new d(1,1,null ),
            p = h; --p > -1; )
                a = u[p],
                o = new d(a.x,a.y,o);
            this._prev = new d(0,0,0 !== o.t ? o : o.next)
        }, !0),
        m = n.prototype = new e,
        m.constructor = n,
        m.getRatio = function(e) {
            var t = this._prev;
            if (e > t.t) {
                for (; t.next && e >= t.t; )
                    t = t.next;
                t = t.prev
            } else
                for (; t.prev && e <= t.t; )
                    t = t.prev;
            return this._prev = t,
            t.v + (e - t.t) / t.gap * t.c
        }
        ,
        m.config = function(e) {
            return new n(e)
        }
        ,
        n.ease = new n,
        h("Bounce", u("BounceOut", function(e) {
            return 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
        }), u("BounceIn", function(e) {
            return (e = 1 - e) < 1 / 2.75 ? 1 - 7.5625 * e * e : 2 / 2.75 > e ? 1 - (7.5625 * (e -= 1.5 / 2.75) * e + .75) : 2.5 / 2.75 > e ? 1 - (7.5625 * (e -= 2.25 / 2.75) * e + .9375) : 1 - (7.5625 * (e -= 2.625 / 2.75) * e + .984375)
        }), u("BounceInOut", function(e) {
            var t = .5 > e;
            return e = t ? 1 - 2 * e : 2 * e - 1,
            e = 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375,
            t ? .5 * (1 - e) : .5 * e + .5
        })),
        h("Circ", u("CircOut", function(e) {
            return Math.sqrt(1 - (e -= 1) * e)
        }), u("CircIn", function(e) {
            return -(Math.sqrt(1 - e * e) - 1)
        }), u("CircInOut", function(e) {
            return (e *= 2) < 1 ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
        })),
        i = function(t, n, i) {
            var r = l("easing." + t, function(e, t) {
                this._p1 = e >= 1 ? e : 1,
                this._p2 = (t || i) / (1 > e ? e : 1),
                this._p3 = this._p2 / a * (Math.asin(1 / this._p1) || 0),
                this._p2 = a / this._p2
            }, !0)
              , s = r.prototype = new e;
            return s.constructor = r,
            s.getRatio = n,
            s.config = function(e, t) {
                return new r(e,t)
            }
            ,
            r
        }
        ,
        h("Elastic", i("ElasticOut", function(e) {
            return this._p1 * Math.pow(2, -10 * e) * Math.sin((e - this._p3) * this._p2) + 1
        }, .3), i("ElasticIn", function(e) {
            return -(this._p1 * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - this._p3) * this._p2))
        }, .3), i("ElasticInOut", function(e) {
            return (e *= 2) < 1 ? -.5 * this._p1 * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - this._p3) * this._p2) : .5 * this._p1 * Math.pow(2, -10 * (e -= 1)) * Math.sin((e - this._p3) * this._p2) + 1
        }, .45)),
        h("Expo", u("ExpoOut", function(e) {
            return 1 - Math.pow(2, -10 * e)
        }), u("ExpoIn", function(e) {
            return Math.pow(2, 10 * (e - 1)) - .001
        }), u("ExpoInOut", function(e) {
            return (e *= 2) < 1 ? .5 * Math.pow(2, 10 * (e - 1)) : .5 * (2 - Math.pow(2, -10 * (e - 1)))
        })),
        h("Sine", u("SineOut", function(e) {
            return Math.sin(e * o)
        }), u("SineIn", function(e) {
            return -Math.cos(e * o) + 1
        }), u("SineInOut", function(e) {
            return -.5 * (Math.cos(Math.PI * e) - 1)
        })),
        l("easing.EaseLookup", {
            find: function(t) {
                return e.map[t]
            }
        }, !0),
        c(r.SlowMo, "SlowMo", "ease,"),
        c(n, "RoughEase", "ease,"),
        c(t, "SteppedEase", "ease,"),
        f
    }, !0)
}),
_gsScope._gsDefine && _gsScope._gsQueue.pop()(),
function(e, t) {
    var n = e.GreenSockGlobals = e.GreenSockGlobals || e;
    if (!n.TweenLite) {
        var i, r, s, a, o, l = function(e) {
            var t, i = e.split("."), r = n;
            for (t = 0; t < i.length; t++)
                r[i[t]] = r = r[i[t]] || {};
            return r
        }
        , u = l("com.greensock"), c = 1e-10, h = function(e) {
            var t, n = [], i = e.length;
            for (t = 0; t !== i; n.push(e[t++]))
                ;
            return n
        }
        , d = function() {}
        , p = function() {
            var e = Object.prototype.toString
              , t = e.call([]);
            return function(n) {
                return null  != n && (n instanceof Array || "object" == typeof n && !!n.push && e.call(n) === t)
            }
        }(), f = {}, g = function(i, r, s, a) {
            this.sc = f[i] ? f[i].sc : [],
            f[i] = this,
            this.gsClass = null ,
            this.func = s;
            var o = [];
            this.check = function(u) {
                for (var c, h, d, p, m, v = r.length, _ = v; --v > -1; )
                    (c = f[r[v]] || new g(r[v],[])).gsClass ? (o[v] = c.gsClass,
                    _--) : u && c.sc.push(this);
                if (0 === _ && s)
                    for (h = ("com.greensock." + i).split("."),
                    d = h.pop(),
                    p = l(h.join("."))[d] = this.gsClass = s.apply(s, o),
                    a && (n[d] = p,
                    m = "undefined" != typeof module && module.exports,
                    !m && "function" == typeof define && define.amd ? define((e.GreenSockAMDPath ? e.GreenSockAMDPath + "/" : "") + i.split(".").pop(), [], function() {
                        return p
                    }) : i === t && m && (module.exports = p)),
                    v = 0; v < this.sc.length; v++)
                        this.sc[v].check()
            }
            ,
            this.check(!0)
        }
        , m = e._gsDefine = function(e, t, n, i) {
            return new g(e,t,n,i)
        }
        , v = u._class = function(e, t, n) {
            return t = t || function() {}
            ,
            m(e, [], function() {
                return t
            }, n),
            t
        }
        ;
        m.globals = n;
        var _ = [0, 0, 1, 1]
          , y = []
          , b = v("easing.Ease", function(e, t, n, i) {
            this._func = e,
            this._type = n || 0,
            this._power = i || 0,
            this._params = t ? _.concat(t) : _
        }, !0)
          , w = b.map = {}
          , x = b.register = function(e, t, n, i) {
            for (var r, s, a, o, l = t.split(","), c = l.length, h = (n || "easeIn,easeOut,easeInOut").split(","); --c > -1; )
                for (s = l[c],
                r = i ? v("easing." + s, null , !0) : u.easing[s] || {},
                a = h.length; --a > -1; )
                    o = h[a],
                    w[s + "." + o] = w[o + s] = r[o] = e.getRatio ? e : e[o] || new e
        }
        ;
        for (s = b.prototype,
        s._calcEnd = !1,
        s.getRatio = function(e) {
            if (this._func)
                return this._params[0] = e,
                this._func.apply(null , this._params);
            var t = this._type
              , n = this._power
              , i = 1 === t ? 1 - e : 2 === t ? e : .5 > e ? 2 * e : 2 * (1 - e);
            return 1 === n ? i *= i : 2 === n ? i *= i * i : 3 === n ? i *= i * i * i : 4 === n && (i *= i * i * i * i),
            1 === t ? 1 - i : 2 === t ? i : .5 > e ? i / 2 : 1 - i / 2
        }
        ,
        i = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"],
        r = i.length; --r > -1; )
            s = i[r] + ",Power" + r,
            x(new b(null ,null ,1,r), s, "easeOut", !0),
            x(new b(null ,null ,2,r), s, "easeIn" + (0 === r ? ",easeNone" : "")),
            x(new b(null ,null ,3,r), s, "easeInOut");
        w.linear = u.easing.Linear.easeIn,
        w.swing = u.easing.Quad.easeInOut;
        var T = v("events.EventDispatcher", function(e) {
            this._listeners = {},
            this._eventTarget = e || this
        });
        s = T.prototype,
        s.addEventListener = function(e, t, n, i, r) {
            r = r || 0;
            var s, l, u = this._listeners[e], c = 0;
            for (null  == u && (this._listeners[e] = u = []),
            l = u.length; --l > -1; )
                s = u[l],
                s.c === t && s.s === n ? u.splice(l, 1) : 0 === c && s.pr < r && (c = l + 1);
            u.splice(c, 0, {
                c: t,
                s: n,
                up: i,
                pr: r
            }),
            this !== a || o || a.wake()
        }
        ,
        s.removeEventListener = function(e, t) {
            var n, i = this._listeners[e];
            if (i)
                for (n = i.length; --n > -1; )
                    if (i[n].c === t)
                        return void i.splice(n, 1)
        }
        ,
        s.dispatchEvent = function(e) {
            var t, n, i, r = this._listeners[e];
            if (r)
                for (t = r.length,
                n = this._eventTarget; --t > -1; )
                    i = r[t],
                    i && (i.up ? i.c.call(i.s || n, {
                        type: e,
                        target: n
                    }) : i.c.call(i.s || n))
        }
        ;
        var P = e.requestAnimationFrame
          , S = e.cancelAnimationFrame
          , k = Date.now || function() {
            return (new Date).getTime()
        }
          , A = k();
        for (i = ["ms", "moz", "webkit", "o"],
        r = i.length; --r > -1 && !P; )
            P = e[i[r] + "RequestAnimationFrame"],
            S = e[i[r] + "CancelAnimationFrame"] || e[i[r] + "CancelRequestAnimationFrame"];
        v("Ticker", function(e, t) {
            var n, i, r, s, l, u = this, h = k(), p = t !== !1 && P ? "auto" : !1, f = 500, g = 33, m = "tick", v = function(e) {
                var t, a, o = k() - A;
                o > f && (h += o - g),
                A += o,
                u.time = (A - h) / 1e3,
                t = u.time - l,
                (!n || t > 0 || e === !0) && (u.frame++,
                l += t + (t >= s ? .004 : s - t),
                a = !0),
                e !== !0 && (r = i(v)),
                a && u.dispatchEvent(m)
            }
            ;
            T.call(u),
            u.time = u.frame = 0,
            u.tick = function() {
                v(!0)
            }
            ,
            u.lagSmoothing = function(e, t) {
                f = e || 1 / c,
                g = Math.min(t, f, 0)
            }
            ,
            u.sleep = function() {
                null  != r && (p && S ? S(r) : clearTimeout(r),
                i = d,
                r = null ,
                u === a && (o = !1))
            }
            ,
            u.wake = function(e) {
                null  !== r ? u.sleep() : e ? h += -A + (A = k()) : u.frame > 10 && (A = k() - f + 5),
                i = 0 === n ? d : p && P ? P : function(e) {
                    return setTimeout(e, 0 | 1e3 * (l - u.time) + 1)
                }
                ,
                u === a && (o = !0),
                v(2)
            }
            ,
            u.fps = function(e) {
                return arguments.length ? (n = e,
                s = 1 / (n || 60),
                l = this.time + s,
                void u.wake()) : n
            }
            ,
            u.useRAF = function(e) {
                return arguments.length ? (u.sleep(),
                p = e,
                void u.fps(n)) : p
            }
            ,
            u.fps(e),
            setTimeout(function() {
                "auto" === p && u.frame < 5 && "hidden" !== document.visibilityState && u.useRAF(!1)
            }, 1500)
        }),
        s = u.Ticker.prototype = new u.events.EventDispatcher,
        s.constructor = u.Ticker;
        var C = v("core.Animation", function(e, t) {
            if (this.vars = t = t || {},
            this._duration = this._totalDuration = e || 0,
            this._delay = Number(t.delay) || 0,
            this._timeScale = 1,
            this._active = t.immediateRender === !0,
            this.data = t.data,
            this._reversed = t.reversed === !0,
            X) {
                o || a.wake();
                var n = this.vars.useFrames ? G : X;
                n.add(this, n._time),
                this.vars.paused && this.paused(!0)
            }
        });
        a = C.ticker = new u.Ticker,
        s = C.prototype,
        s._dirty = s._gc = s._initted = s._paused = !1,
        s._totalTime = s._time = 0,
        s._rawPrevTime = -1,
        s._next = s._last = s._onUpdate = s._timeline = s.timeline = null ,
        s._paused = !1;
        var j = function() {
            o && k() - A > 2e3 && a.wake(),
            setTimeout(j, 2e3)
        }
        ;
        j(),
        s.play = function(e, t) {
            return null  != e && this.seek(e, t),
            this.reversed(!1).paused(!1)
        }
        ,
        s.pause = function(e, t) {
            return null  != e && this.seek(e, t),
            this.paused(!0)
        }
        ,
        s.resume = function(e, t) {
            return null  != e && this.seek(e, t),
            this.paused(!1)
        }
        ,
        s.seek = function(e, t) {
            return this.totalTime(Number(e), t !== !1)
        }
        ,
        s.restart = function(e, t) {
            return this.reversed(!1).paused(!1).totalTime(e ? -this._delay : 0, t !== !1, !0)
        }
        ,
        s.reverse = function(e, t) {
            return null  != e && this.seek(e || this.totalDuration(), t),
            this.reversed(!0).paused(!1)
        }
        ,
        s.render = function() {}
        ,
        s.invalidate = function() {
            return this._time = this._totalTime = 0,
            this._initted = this._gc = !1,
            this._rawPrevTime = -1,
            (this._gc || !this.timeline) && this._enabled(!0),
            this
        }
        ,
        s.isActive = function() {
            var e, t = this._timeline, n = this._startTime;
            return !t || !this._gc && !this._paused && t.isActive() && (e = t.rawTime()) >= n && e < n + this.totalDuration() / this._timeScale
        }
        ,
        s._enabled = function(e, t) {
            return o || a.wake(),
            this._gc = !e,
            this._active = this.isActive(),
            t !== !0 && (e && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !e && this.timeline && this._timeline._remove(this, !0)),
            !1
        }
        ,
        s._kill = function() {
            return this._enabled(!1, !1)
        }
        ,
        s.kill = function(e, t) {
            return this._kill(e, t),
            this
        }
        ,
        s._uncache = function(e) {
            for (var t = e ? this : this.timeline; t; )
                t._dirty = !0,
                t = t.timeline;
            return this
        }
        ,
        s._swapSelfInParams = function(e) {
            for (var t = e.length, n = e.concat(); --t > -1; )
                "{self}" === e[t] && (n[t] = this);
            return n
        }
        ,
        s._callback = function(e) {
            var t = this.vars;
            t[e].apply(t[e + "Scope"] || t.callbackScope || this, t[e + "Params"] || y)
        }
        ,
        s.eventCallback = function(e, t, n, i) {
            if ("on" === (e || "").substr(0, 2)) {
                var r = this.vars;
                if (1 === arguments.length)
                    return r[e];
                null  == t ? delete r[e] : (r[e] = t,
                r[e + "Params"] = p(n) && -1 !== n.join("").indexOf("{self}") ? this._swapSelfInParams(n) : n,
                r[e + "Scope"] = i),
                "onUpdate" === e && (this._onUpdate = t)
            }
            return this
        }
        ,
        s.delay = function(e) {
            return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + e - this._delay),
            this._delay = e,
            this) : this._delay
        }
        ,
        s.duration = function(e) {
            return arguments.length ? (this._duration = this._totalDuration = e,
            this._uncache(!0),
            this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== e && this.totalTime(this._totalTime * (e / this._duration), !0),
            this) : (this._dirty = !1,
            this._duration)
        }
        ,
        s.totalDuration = function(e) {
            return this._dirty = !1,
            arguments.length ? this.duration(e) : this._totalDuration
        }
        ,
        s.time = function(e, t) {
            return arguments.length ? (this._dirty && this.totalDuration(),
            this.totalTime(e > this._duration ? this._duration : e, t)) : this._time
        }
        ,
        s.totalTime = function(e, t, n) {
            if (o || a.wake(),
            !arguments.length)
                return this._totalTime;
            if (this._timeline) {
                if (0 > e && !n && (e += this.totalDuration()),
                this._timeline.smoothChildTiming) {
                    this._dirty && this.totalDuration();
                    var i = this._totalDuration
                      , r = this._timeline;
                    if (e > i && !n && (e = i),
                    this._startTime = (this._paused ? this._pauseTime : r._time) - (this._reversed ? i - e : e) / this._timeScale,
                    r._dirty || this._uncache(!1),
                    r._timeline)
                        for (; r._timeline; )
                            r._timeline._time !== (r._startTime + r._totalTime) / r._timeScale && r.totalTime(r._totalTime, !0),
                            r = r._timeline
                }
                this._gc && this._enabled(!0, !1),
                (this._totalTime !== e || 0 === this._duration) && (N.length && Y(),
                this.render(e, t, !1),
                N.length && Y())
            }
            return this
        }
        ,
        s.progress = s.totalProgress = function(e, t) {
            var n = this.duration();
            return arguments.length ? this.totalTime(n * e, t) : n ? this._time / n : this.ratio
        }
        ,
        s.startTime = function(e) {
            return arguments.length ? (e !== this._startTime && (this._startTime = e,
            this.timeline && this.timeline._sortChildren && this.timeline.add(this, e - this._delay)),
            this) : this._startTime
        }
        ,
        s.endTime = function(e) {
            return this._startTime + (0 != e ? this.totalDuration() : this.duration()) / this._timeScale
        }
        ,
        s.timeScale = function(e) {
            if (!arguments.length)
                return this._timeScale;
            if (e = e || c,
            this._timeline && this._timeline.smoothChildTiming) {
                var t = this._pauseTime
                  , n = t || 0 === t ? t : this._timeline.totalTime();
                this._startTime = n - (n - this._startTime) * this._timeScale / e
            }
            return this._timeScale = e,
            this._uncache(!1)
        }
        ,
        s.reversed = function(e) {
            return arguments.length ? (e != this._reversed && (this._reversed = e,
            this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)),
            this) : this._reversed
        }
        ,
        s.paused = function(e) {
            if (!arguments.length)
                return this._paused;
            var t, n, i = this._timeline;
            return e != this._paused && i && (o || e || a.wake(),
            t = i.rawTime(),
            n = t - this._pauseTime,
            !e && i.smoothChildTiming && (this._startTime += n,
            this._uncache(!1)),
            this._pauseTime = e ? t : null ,
            this._paused = e,
            this._active = this.isActive(),
            !e && 0 !== n && this._initted && this.duration() && (t = i.smoothChildTiming ? this._totalTime : (t - this._startTime) / this._timeScale,
            this.render(t, t === this._totalTime, !0))),
            this._gc && !e && this._enabled(!0, !1),
            this
        }
        ;
        var O = v("core.SimpleTimeline", function(e) {
            C.call(this, 0, e),
            this.autoRemoveChildren = this.smoothChildTiming = !0
        });
        s = O.prototype = new C,
        s.constructor = O,
        s.kill()._gc = !1,
        s._first = s._last = s._recent = null ,
        s._sortChildren = !1,
        s.add = s.insert = function(e, t) {
            var n, i;
            if (e._startTime = Number(t || 0) + e._delay,
            e._paused && this !== e._timeline && (e._pauseTime = e._startTime + (this.rawTime() - e._startTime) / e._timeScale),
            e.timeline && e.timeline._remove(e, !0),
            e.timeline = e._timeline = this,
            e._gc && e._enabled(!0, !0),
            n = this._last,
            this._sortChildren)
                for (i = e._startTime; n && n._startTime > i; )
                    n = n._prev;
            return n ? (e._next = n._next,
            n._next = e) : (e._next = this._first,
            this._first = e),
            e._next ? e._next._prev = e : this._last = e,
            e._prev = n,
            this._recent = e,
            this._timeline && this._uncache(!0),
            this
        }
        ,
        s._remove = function(e, t) {
            return e.timeline === this && (t || e._enabled(!1, !0),
            e._prev ? e._prev._next = e._next : this._first === e && (this._first = e._next),
            e._next ? e._next._prev = e._prev : this._last === e && (this._last = e._prev),
            e._next = e._prev = e.timeline = null ,
            e === this._recent && (this._recent = this._last),
            this._timeline && this._uncache(!0)),
            this
        }
        ,
        s.render = function(e, t, n) {
            var i, r = this._first;
            for (this._totalTime = this._time = this._rawPrevTime = e; r; )
                i = r._next,
                (r._active || e >= r._startTime && !r._paused) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (e - r._startTime) * r._timeScale, t, n) : r.render((e - r._startTime) * r._timeScale, t, n)),
                r = i
        }
        ,
        s.rawTime = function() {
            return o || a.wake(),
            this._totalTime
        }
        ;
        var M = v("TweenLite", function(t, n, i) {
            if (C.call(this, n, i),
            this.render = M.prototype.render,
            null  == t)
                throw "Cannot tween a null target.";
            this.target = t = "string" != typeof t ? t : M.selector(t) || t;
            var r, s, a, o = t.jquery || t.length && t !== e && t[0] && (t[0] === e || t[0].nodeType && t[0].style && !t.nodeType), l = this.vars.overwrite;
            if (this._overwrite = l = null  == l ? U[M.defaultOverwrite] : "number" == typeof l ? l >> 0 : U[l],
            (o || t instanceof Array || t.push && p(t)) && "number" != typeof t[0])
                for (this._targets = a = h(t),
                this._propLookup = [],
                this._siblings = [],
                r = 0; r < a.length; r++)
                    s = a[r],
                    s ? "string" != typeof s ? s.length && s !== e && s[0] && (s[0] === e || s[0].nodeType && s[0].style && !s.nodeType) ? (a.splice(r--, 1),
                    this._targets = a = a.concat(h(s))) : (this._siblings[r] = Q(s, this, !1),
                    1 === l && this._siblings[r].length > 1 && Z(s, this, null , 1, this._siblings[r])) : (s = a[r--] = M.selector(s),
                    "string" == typeof s && a.splice(r + 1, 1)) : a.splice(r--, 1);
            else
                this._propLookup = {},
                this._siblings = Q(t, this, !1),
                1 === l && this._siblings.length > 1 && Z(t, this, null , 1, this._siblings);
            (this.vars.immediateRender || 0 === n && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -c,
            this.render(-this._delay))
        }, !0)
          , E = function(t) {
            return t && t.length && t !== e && t[0] && (t[0] === e || t[0].nodeType && t[0].style && !t.nodeType)
        }
          , D = function(e, t) {
            var n, i = {};
            for (n in e)
                H[n] || n in t && "transform" !== n && "x" !== n && "y" !== n && "width" !== n && "height" !== n && "className" !== n && "border" !== n || !(!$[n] || $[n] && $[n]._autoCSS) || (i[n] = e[n],
                delete e[n]);
            e.css = i
        }
        ;
        s = M.prototype = new C,
        s.constructor = M,
        s.kill()._gc = !1,
        s.ratio = 0,
        s._firstPT = s._targets = s._overwrittenProps = s._startAt = null ,
        s._notifyPluginsOfEnabled = s._lazy = !1,
        M.version = "1.18.2",
        M.defaultEase = s._ease = new b(null ,null ,1,1),
        M.defaultOverwrite = "auto",
        M.ticker = a,
        M.autoSleep = 120,
        M.lagSmoothing = function(e, t) {
            a.lagSmoothing(e, t)
        }
        ,
        M.selector = e.$ || e.jQuery || function(t) {
            var n = e.$ || e.jQuery;
            return n ? (M.selector = n,
            n(t)) : "undefined" == typeof document ? t : document.querySelectorAll ? document.querySelectorAll(t) : document.getElementById("#" === t.charAt(0) ? t.substr(1) : t)
        }
        ;
        var N = []
          , I = {}
          , L = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi
          , R = function(e) {
            for (var t, n = this._firstPT, i = 1e-6; n; )
                t = n.blob ? e ? this.join("") : this.start : n.c * e + n.s,
                n.r ? t = Math.round(t) : i > t && t > -i && (t = 0),
                n.f ? n.fp ? n.t[n.p](n.fp, t) : n.t[n.p](t) : n.t[n.p] = t,
                n = n._next
        }
          , V = function(e, t, n, i) {
            var r, s, a, o, l, u, c, h = [e, t], d = 0, p = "", f = 0;
            for (h.start = e,
            n && (n(h),
            e = h[0],
            t = h[1]),
            h.length = 0,
            r = e.match(L) || [],
            s = t.match(L) || [],
            i && (i._next = null ,
            i.blob = 1,
            h._firstPT = i),
            l = s.length,
            o = 0; l > o; o++)
                c = s[o],
                u = t.substr(d, t.indexOf(c, d) - d),
                p += u || !o ? u : ",",
                d += u.length,
                f ? f = (f + 1) % 5 : "rgba(" === u.substr(-5) && (f = 1),
                c === r[o] || r.length <= o ? p += c : (p && (h.push(p),
                p = ""),
                a = parseFloat(r[o]),
                h.push(a),
                h._firstPT = {
                    _next: h._firstPT,
                    t: h,
                    p: h.length - 1,
                    s: a,
                    c: ("=" === c.charAt(1) ? parseInt(c.charAt(0) + "1", 10) * parseFloat(c.substr(2)) : parseFloat(c) - a) || 0,
                    f: 0,
                    r: f && 4 > f
                }),
                d += c.length;
            return p += t.substr(d),
            p && h.push(p),
            h.setRatio = R,
            h
        }
          , B = function(e, t, n, i, r, s, a, o) {
            var l, u, c = "get" === n ? e[t] : n, h = typeof e[t], d = "string" == typeof i && "=" === i.charAt(1), p = {
                t: e,
                p: t,
                s: c,
                f: "function" === h,
                pg: 0,
                n: r || t,
                r: s,
                pr: 0,
                c: d ? parseInt(i.charAt(0) + "1", 10) * parseFloat(i.substr(2)) : parseFloat(i) - c || 0
            };
            return "number" !== h && ("function" === h && "get" === n && (u = t.indexOf("set") || "function" != typeof e["get" + t.substr(3)] ? t : "get" + t.substr(3),
            p.s = c = a ? e[u](a) : e[u]()),
            "string" == typeof c && (a || isNaN(c)) ? (p.fp = a,
            l = V(c, i, o || M.defaultStringFilter, p),
            p = {
                t: l,
                p: "setRatio",
                s: 0,
                c: 1,
                f: 2,
                pg: 0,
                n: r || t,
                pr: 0
            }) : d || (p.s = parseFloat(c),
            p.c = parseFloat(i) - p.s || 0)),
            p.c ? ((p._next = this._firstPT) && (p._next._prev = p),
            this._firstPT = p,
            p) : void 0
        }
          , F = M._internals = {
            isArray: p,
            isSelector: E,
            lazyTweens: N,
            blobDif: V
        }
          , $ = M._plugins = {}
          , q = F.tweenLookup = {}
          , z = 0
          , H = F.reservedProps = {
            ease: 1,
            delay: 1,
            overwrite: 1,
            onComplete: 1,
            onCompleteParams: 1,
            onCompleteScope: 1,
            useFrames: 1,
            runBackwards: 1,
            startAt: 1,
            onUpdate: 1,
            onUpdateParams: 1,
            onUpdateScope: 1,
            onStart: 1,
            onStartParams: 1,
            onStartScope: 1,
            onReverseComplete: 1,
            onReverseCompleteParams: 1,
            onReverseCompleteScope: 1,
            onRepeat: 1,
            onRepeatParams: 1,
            onRepeatScope: 1,
            easeParams: 1,
            yoyo: 1,
            immediateRender: 1,
            repeat: 1,
            repeatDelay: 1,
            data: 1,
            paused: 1,
            reversed: 1,
            autoCSS: 1,
            lazy: 1,
            onOverwrite: 1,
            callbackScope: 1,
            stringFilter: 1
        }
          , U = {
            none: 0,
            all: 1,
            auto: 2,
            concurrent: 3,
            allOnStart: 4,
            preexisting: 5,
            "true": 1,
            "false": 0
        }
          , G = C._rootFramesTimeline = new O
          , X = C._rootTimeline = new O
          , W = 30
          , Y = F.lazyRender = function() {
            var e, t = N.length;
            for (I = {}; --t > -1; )
                e = N[t],
                e && e._lazy !== !1 && (e.render(e._lazy[0], e._lazy[1], !0),
                e._lazy = !1);
            N.length = 0
        }
        ;
        X._startTime = a.time,
        G._startTime = a.frame,
        X._active = G._active = !0,
        setTimeout(Y, 1),
        C._updateRoot = M.render = function() {
            var e, t, n;
            if (N.length && Y(),
            X.render((a.time - X._startTime) * X._timeScale, !1, !1),
            G.render((a.frame - G._startTime) * G._timeScale, !1, !1),
            N.length && Y(),
            a.frame >= W) {
                W = a.frame + (parseInt(M.autoSleep, 10) || 120);
                for (n in q) {
                    for (t = q[n].tweens,
                    e = t.length; --e > -1; )
                        t[e]._gc && t.splice(e, 1);
                    0 === t.length && delete q[n]
                }
                if (n = X._first,
                (!n || n._paused) && M.autoSleep && !G._first && 1 === a._listeners.tick.length) {
                    for (; n && n._paused; )
                        n = n._next;
                    n || a.sleep()
                }
            }
        }
        ,
        a.addEventListener("tick", C._updateRoot);
        var Q = function(e, t, n) {
            var i, r, s = e._gsTweenID;
            if (q[s || (e._gsTweenID = s = "t" + z++)] || (q[s] = {
                target: e,
                tweens: []
            }),
            t && (i = q[s].tweens,
            i[r = i.length] = t,
            n))
                for (; --r > -1; )
                    i[r] === t && i.splice(r, 1);
            return q[s].tweens
        }
          , J = function(e, t, n, i) {
            var r, s, a = e.vars.onOverwrite;
            return a && (r = a(e, t, n, i)),
            a = M.onOverwrite,
            a && (s = a(e, t, n, i)),
            r !== !1 && s !== !1
        }
          , Z = function(e, t, n, i, r) {
            var s, a, o, l;
            if (1 === i || i >= 4) {
                for (l = r.length,
                s = 0; l > s; s++)
                    if ((o = r[s]) !== t)
                        o._gc || o._kill(null , e, t) && (a = !0);
                    else if (5 === i)
                        break;
                return a
            }
            var u, h = t._startTime + c, d = [], p = 0, f = 0 === t._duration;
            for (s = r.length; --s > -1; )
                (o = r[s]) === t || o._gc || o._paused || (o._timeline !== t._timeline ? (u = u || K(t, 0, f),
                0 === K(o, u, f) && (d[p++] = o)) : o._startTime <= h && o._startTime + o.totalDuration() / o._timeScale > h && ((f || !o._initted) && h - o._startTime <= 2e-10 || (d[p++] = o)));
            for (s = p; --s > -1; )
                if (o = d[s],
                2 === i && o._kill(n, e, t) && (a = !0),
                2 !== i || !o._firstPT && o._initted) {
                    if (2 !== i && !J(o, t))
                        continue;o._enabled(!1, !1) && (a = !0)
                }
            return a
        }
          , K = function(e, t, n) {
            for (var i = e._timeline, r = i._timeScale, s = e._startTime; i._timeline; ) {
                if (s += i._startTime,
                r *= i._timeScale,
                i._paused)
                    return -100;
                i = i._timeline
            }
            return s /= r,
            s > t ? s - t : n && s === t || !e._initted && 2 * c > s - t ? c : (s += e.totalDuration() / e._timeScale / r) > t + c ? 0 : s - t - c
        }
        ;
        s._init = function() {
            var e, t, n, i, r, s = this.vars, a = this._overwrittenProps, o = this._duration, l = !!s.immediateRender, u = s.ease;
            if (s.startAt) {
                this._startAt && (this._startAt.render(-1, !0),
                this._startAt.kill()),
                r = {};
                for (i in s.startAt)
                    r[i] = s.startAt[i];
                if (r.overwrite = !1,
                r.immediateRender = !0,
                r.lazy = l && s.lazy !== !1,
                r.startAt = r.delay = null ,
                this._startAt = M.to(this.target, 0, r),
                l)
                    if (this._time > 0)
                        this._startAt = null ;
                    else if (0 !== o)
                        return
            } else if (s.runBackwards && 0 !== o)
                if (this._startAt)
                    this._startAt.render(-1, !0),
                    this._startAt.kill(),
                    this._startAt = null ;
                else {
                    0 !== this._time && (l = !1),
                    n = {};
                    for (i in s)
                        H[i] && "autoCSS" !== i || (n[i] = s[i]);
                    if (n.overwrite = 0,
                    n.data = "isFromStart",
                    n.lazy = l && s.lazy !== !1,
                    n.immediateRender = l,
                    this._startAt = M.to(this.target, 0, n),
                    l) {
                        if (0 === this._time)
                            return
                    } else
                        this._startAt._init(),
                        this._startAt._enabled(!1),
                        this.vars.immediateRender && (this._startAt = null )
                }
            if (this._ease = u = u ? u instanceof b ? u : "function" == typeof u ? new b(u,s.easeParams) : w[u] || M.defaultEase : M.defaultEase,
            s.easeParams instanceof Array && u.config && (this._ease = u.config.apply(u, s.easeParams)),
            this._easeType = this._ease._type,
            this._easePower = this._ease._power,
            this._firstPT = null ,
            this._targets)
                for (e = this._targets.length; --e > -1; )
                    this._initProps(this._targets[e], this._propLookup[e] = {}, this._siblings[e], a ? a[e] : null ) && (t = !0);
            else
                t = this._initProps(this.target, this._propLookup, this._siblings, a);
            if (t && M._onPluginEvent("_onInitAllProps", this),
            a && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)),
            s.runBackwards)
                for (n = this._firstPT; n; )
                    n.s += n.c,
                    n.c = -n.c,
                    n = n._next;
            this._onUpdate = s.onUpdate,
            this._initted = !0
        }
        ,
        s._initProps = function(t, n, i, r) {
            var s, a, o, l, u, c;
            if (null  == t)
                return !1;
            I[t._gsTweenID] && Y(),
            this.vars.css || t.style && t !== e && t.nodeType && $.css && this.vars.autoCSS !== !1 && D(this.vars, t);
            for (s in this.vars)
                if (c = this.vars[s],
                H[s])
                    c && (c instanceof Array || c.push && p(c)) && -1 !== c.join("").indexOf("{self}") && (this.vars[s] = c = this._swapSelfInParams(c, this));
                else if ($[s] && (l = new $[s])._onInitTween(t, this.vars[s], this)) {
                    for (this._firstPT = u = {
                        _next: this._firstPT,
                        t: l,
                        p: "setRatio",
                        s: 0,
                        c: 1,
                        f: 1,
                        n: s,
                        pg: 1,
                        pr: l._priority
                    },
                    a = l._overwriteProps.length; --a > -1; )
                        n[l._overwriteProps[a]] = this._firstPT;
                    (l._priority || l._onInitAllProps) && (o = !0),
                    (l._onDisable || l._onEnable) && (this._notifyPluginsOfEnabled = !0),
                    u._next && (u._next._prev = u)
                } else
                    n[s] = B.call(this, t, s, "get", c, s, 0, null , this.vars.stringFilter);
            return r && this._kill(r, t) ? this._initProps(t, n, i, r) : this._overwrite > 1 && this._firstPT && i.length > 1 && Z(t, this, n, this._overwrite, i) ? (this._kill(n, t),
            this._initProps(t, n, i, r)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (I[t._gsTweenID] = !0),
            o)
        }
        ,
        s.render = function(e, t, n) {
            var i, r, s, a, o = this._time, l = this._duration, u = this._rawPrevTime;
            if (e >= l - 1e-7)
                this._totalTime = this._time = l,
                this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1,
                this._reversed || (i = !0,
                r = "onComplete",
                n = n || this._timeline.autoRemoveChildren),
                0 === l && (this._initted || !this.vars.lazy || n) && (this._startTime === this._timeline._duration && (e = 0),
                (0 > u || 0 >= e && e >= -1e-7 || u === c && "isPause" !== this.data) && u !== e && (n = !0,
                u > c && (r = "onReverseComplete")),
                this._rawPrevTime = a = !t || e || u === e ? e : c);
            else if (1e-7 > e)
                this._totalTime = this._time = 0,
                this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0,
                (0 !== o || 0 === l && u > 0) && (r = "onReverseComplete",
                i = this._reversed),
                0 > e && (this._active = !1,
                0 === l && (this._initted || !this.vars.lazy || n) && (u >= 0 && (u !== c || "isPause" !== this.data) && (n = !0),
                this._rawPrevTime = a = !t || e || u === e ? e : c)),
                this._initted || (n = !0);
            else if (this._totalTime = this._time = e,
            this._easeType) {
                var h = e / l
                  , d = this._easeType
                  , p = this._easePower;
                (1 === d || 3 === d && h >= .5) && (h = 1 - h),
                3 === d && (h *= 2),
                1 === p ? h *= h : 2 === p ? h *= h * h : 3 === p ? h *= h * h * h : 4 === p && (h *= h * h * h * h),
                this.ratio = 1 === d ? 1 - h : 2 === d ? h : .5 > e / l ? h / 2 : 1 - h / 2
            } else
                this.ratio = this._ease.getRatio(e / l);
            if (this._time !== o || n) {
                if (!this._initted) {
                    if (this._init(),
                    !this._initted || this._gc)
                        return;
                    if (!n && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration))
                        return this._time = this._totalTime = o,
                        this._rawPrevTime = u,
                        N.push(this),
                        void (this._lazy = [e, t]);
                    this._time && !i ? this.ratio = this._ease.getRatio(this._time / l) : i && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                }
                for (this._lazy !== !1 && (this._lazy = !1),
                this._active || !this._paused && this._time !== o && e >= 0 && (this._active = !0),
                0 === o && (this._startAt && (e >= 0 ? this._startAt.render(e, t, n) : r || (r = "_dummyGS")),
                this.vars.onStart && (0 !== this._time || 0 === l) && (t || this._callback("onStart"))),
                s = this._firstPT; s; )
                    s.f ? s.t[s.p](s.c * this.ratio + s.s) : s.t[s.p] = s.c * this.ratio + s.s,
                    s = s._next;
                this._onUpdate && (0 > e && this._startAt && e !== -1e-4 && this._startAt.render(e, t, n),
                t || (this._time !== o || i) && this._callback("onUpdate")),
                r && (!this._gc || n) && (0 > e && this._startAt && !this._onUpdate && e !== -1e-4 && this._startAt.render(e, t, n),
                i && (this._timeline.autoRemoveChildren && this._enabled(!1, !1),
                this._active = !1),
                !t && this.vars[r] && this._callback(r),
                0 === l && this._rawPrevTime === c && a !== c && (this._rawPrevTime = 0))
            }
        }
        ,
        s._kill = function(e, t, n) {
            if ("all" === e && (e = null ),
            null  == e && (null  == t || t === this.target))
                return this._lazy = !1,
                this._enabled(!1, !1);
            t = "string" != typeof t ? t || this._targets || this.target : M.selector(t) || t;
            var i, r, s, a, o, l, u, c, h, d = n && this._time && n._startTime === this._startTime && this._timeline === n._timeline;
            if ((p(t) || E(t)) && "number" != typeof t[0])
                for (i = t.length; --i > -1; )
                    this._kill(e, t[i], n) && (l = !0);
            else {
                if (this._targets) {
                    for (i = this._targets.length; --i > -1; )
                        if (t === this._targets[i]) {
                            o = this._propLookup[i] || {},
                            this._overwrittenProps = this._overwrittenProps || [],
                            r = this._overwrittenProps[i] = e ? this._overwrittenProps[i] || {} : "all";
                            break
                        }
                } else {
                    if (t !== this.target)
                        return !1;
                    o = this._propLookup,
                    r = this._overwrittenProps = e ? this._overwrittenProps || {} : "all"
                }
                if (o) {
                    if (u = e || o,
                    c = e !== r && "all" !== r && e !== o && ("object" != typeof e || !e._tempKill),
                    n && (M.onOverwrite || this.vars.onOverwrite)) {
                        for (s in u)
                            o[s] && (h || (h = []),
                            h.push(s));
                        if ((h || !e) && !J(this, n, t, h))
                            return !1
                    }
                    for (s in u)
                        (a = o[s]) && (d && (a.f ? a.t[a.p](a.s) : a.t[a.p] = a.s,
                        l = !0),
                        a.pg && a.t._kill(u) && (l = !0),
                        a.pg && 0 !== a.t._overwriteProps.length || (a._prev ? a._prev._next = a._next : a === this._firstPT && (this._firstPT = a._next),
                        a._next && (a._next._prev = a._prev),
                        a._next = a._prev = null ),
                        delete o[s]),
                        c && (r[s] = 1);
                    !this._firstPT && this._initted && this._enabled(!1, !1)
                }
            }
            return l
        }
        ,
        s.invalidate = function() {
            return this._notifyPluginsOfEnabled && M._onPluginEvent("_onDisable", this),
            this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null ,
            this._notifyPluginsOfEnabled = this._active = this._lazy = !1,
            this._propLookup = this._targets ? {} : [],
            C.prototype.invalidate.call(this),
            this.vars.immediateRender && (this._time = -c,
            this.render(-this._delay)),
            this
        }
        ,
        s._enabled = function(e, t) {
            if (o || a.wake(),
            e && this._gc) {
                var n, i = this._targets;
                if (i)
                    for (n = i.length; --n > -1; )
                        this._siblings[n] = Q(i[n], this, !0);
                else
                    this._siblings = Q(this.target, this, !0)
            }
            return C.prototype._enabled.call(this, e, t),
            this._notifyPluginsOfEnabled && this._firstPT ? M._onPluginEvent(e ? "_onEnable" : "_onDisable", this) : !1
        }
        ,
        M.to = function(e, t, n) {
            return new M(e,t,n)
        }
        ,
        M.from = function(e, t, n) {
            return n.runBackwards = !0,
            n.immediateRender = 0 != n.immediateRender,
            new M(e,t,n)
        }
        ,
        M.fromTo = function(e, t, n, i) {
            return i.startAt = n,
            i.immediateRender = 0 != i.immediateRender && 0 != n.immediateRender,
            new M(e,t,i)
        }
        ,
        M.delayedCall = function(e, t, n, i, r) {
            return new M(t,0,{
                delay: e,
                onComplete: t,
                onCompleteParams: n,
                callbackScope: i,
                onReverseComplete: t,
                onReverseCompleteParams: n,
                immediateRender: !1,
                lazy: !1,
                useFrames: r,
                overwrite: 0
            })
        }
        ,
        M.set = function(e, t) {
            return new M(e,0,t)
        }
        ,
        M.getTweensOf = function(e, t) {
            if (null  == e)
                return [];
            e = "string" != typeof e ? e : M.selector(e) || e;
            var n, i, r, s;
            if ((p(e) || E(e)) && "number" != typeof e[0]) {
                for (n = e.length,
                i = []; --n > -1; )
                    i = i.concat(M.getTweensOf(e[n], t));
                for (n = i.length; --n > -1; )
                    for (s = i[n],
                    r = n; --r > -1; )
                        s === i[r] && i.splice(n, 1)
            } else
                for (i = Q(e).concat(),
                n = i.length; --n > -1; )
                    (i[n]._gc || t && !i[n].isActive()) && i.splice(n, 1);
            return i
        }
        ,
        M.killTweensOf = M.killDelayedCallsTo = function(e, t, n) {
            "object" == typeof t && (n = t,
            t = !1);
            for (var i = M.getTweensOf(e, t), r = i.length; --r > -1; )
                i[r]._kill(n, e)
        }
        ;
        var et = v("plugins.TweenPlugin", function(e, t) {
            this._overwriteProps = (e || "").split(","),
            this._propName = this._overwriteProps[0],
            this._priority = t || 0,
            this._super = et.prototype
        }, !0);
        if (s = et.prototype,
        et.version = "1.18.0",
        et.API = 2,
        s._firstPT = null ,
        s._addTween = B,
        s.setRatio = R,
        s._kill = function(e) {
            var t, n = this._overwriteProps, i = this._firstPT;
            if (null  != e[this._propName])
                this._overwriteProps = [];
            else
                for (t = n.length; --t > -1; )
                    null  != e[n[t]] && n.splice(t, 1);
            for (; i; )
                null  != e[i.n] && (i._next && (i._next._prev = i._prev),
                i._prev ? (i._prev._next = i._next,
                i._prev = null ) : this._firstPT === i && (this._firstPT = i._next)),
                i = i._next;
            return !1
        }
        ,
        s._roundProps = function(e, t) {
            for (var n = this._firstPT; n; )
                (e[this._propName] || null  != n.n && e[n.n.split(this._propName + "_").join("")]) && (n.r = t),
                n = n._next
        }
        ,
        M._onPluginEvent = function(e, t) {
            var n, i, r, s, a, o = t._firstPT;
            if ("_onInitAllProps" === e) {
                for (; o; ) {
                    for (a = o._next,
                    i = r; i && i.pr > o.pr; )
                        i = i._next;
                    (o._prev = i ? i._prev : s) ? o._prev._next = o : r = o,
                    (o._next = i) ? i._prev = o : s = o,
                    o = a
                }
                o = t._firstPT = r
            }
            for (; o; )
                o.pg && "function" == typeof o.t[e] && o.t[e]() && (n = !0),
                o = o._next;
            return n
        }
        ,
        et.activate = function(e) {
            for (var t = e.length; --t > -1; )
                e[t].API === et.API && ($[(new e[t])._propName] = e[t]);
            return !0
        }
        ,
        m.plugin = function(e) {
            if (!(e && e.propName && e.init && e.API))
                throw "illegal plugin definition.";
            var t, n = e.propName, i = e.priority || 0, r = e.overwriteProps, s = {
                init: "_onInitTween",
                set: "setRatio",
                kill: "_kill",
                round: "_roundProps",
                initAll: "_onInitAllProps"
            }, a = v("plugins." + n.charAt(0).toUpperCase() + n.substr(1) + "Plugin", function() {
                et.call(this, n, i),
                this._overwriteProps = r || []
            }, e.global === !0), o = a.prototype = new et(n);
            o.constructor = a,
            a.API = e.API;
            for (t in s)
                "function" == typeof e[t] && (o[s[t]] = e[t]);
            return a.version = e.version,
            et.activate([a]),
            a
        }
        ,
        i = e._gsQueue) {
            for (r = 0; r < i.length; r++)
                i[r]();
            for (s in f)
                f[s].func || e.console.log("GSAP encountered missing dependency: com.greensock." + s)
        }
        o = !1
    }
}("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenMax"),
define("TweenMax", function() {});
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
    _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function(e, t, n) {
        var i = function(t) {
            e.call(this, t),
            this._repeat = this.vars.repeat || 0,
            this._repeatDelay = this.vars.repeatDelay || 0,
            this._cycle = 0,
            this._yoyo = this.vars.yoyo === !0,
            this._dirty = !0
        }
          , r = 1e-10
          , s = t._internals
          , a = s.lazyTweens
          , o = s.lazyRender
          , l = new n(null ,null ,1,0)
          , u = i.prototype = new e;
        return u.constructor = i,
        u.kill()._gc = !1,
        i.version = "1.18.2",
        u.invalidate = function() {
            return this._yoyo = this.vars.yoyo === !0,
            this._repeat = this.vars.repeat || 0,
            this._repeatDelay = this.vars.repeatDelay || 0,
            this._uncache(!0),
            e.prototype.invalidate.call(this)
        }
        ,
        u.addCallback = function(e, n, i, r) {
            return this.add(t.delayedCall(0, e, i, r), n)
        }
        ,
        u.removeCallback = function(e, t) {
            if (e)
                if (null  == t)
                    this._kill(null , e);
                else
                    for (var n = this.getTweensOf(e, !1), i = n.length, r = this._parseTimeOrLabel(t); --i > -1; )
                        n[i]._startTime === r && n[i]._enabled(!1, !1);
            return this
        }
        ,
        u.removePause = function(t) {
            return this.removeCallback(e._internals.pauseCallback, t)
        }
        ,
        u.tweenTo = function(e, n) {
            n = n || {};
            var i, r, s, a = {
                ease: l,
                useFrames: this.usesFrames(),
                immediateRender: !1
            };
            for (r in n)
                a[r] = n[r];
            return a.time = this._parseTimeOrLabel(e),
            i = Math.abs(Number(a.time) - this._time) / this._timeScale || .001,
            s = new t(this,i,a),
            a.onStart = function() {
                s.target.paused(!0),
                s.vars.time !== s.target.time() && i === s.duration() && s.duration(Math.abs(s.vars.time - s.target.time()) / s.target._timeScale),
                n.onStart && s._callback("onStart")
            }
            ,
            s
        }
        ,
        u.tweenFromTo = function(e, t, n) {
            n = n || {},
            e = this._parseTimeOrLabel(e),
            n.startAt = {
                onComplete: this.seek,
                onCompleteParams: [e],
                callbackScope: this
            },
            n.immediateRender = n.immediateRender !== !1;
            var i = this.tweenTo(t, n);
            return i.duration(Math.abs(i.vars.time - e) / this._timeScale || .001)
        }
        ,
        u.render = function(e, t, n) {
            this._gc && this._enabled(!0, !1);
            var i, s, l, u, c, h, d, p, f = this._dirty ? this.totalDuration() : this._totalDuration, g = this._duration, m = this._time, v = this._totalTime, _ = this._startTime, y = this._timeScale, b = this._rawPrevTime, w = this._paused, x = this._cycle;
            if (e >= f - 1e-7)
                this._locked || (this._totalTime = f,
                this._cycle = this._repeat),
                this._reversed || this._hasPausedChild() || (s = !0,
                u = "onComplete",
                c = !!this._timeline.autoRemoveChildren,
                0 === this._duration && (0 >= e && e >= -1e-7 || 0 > b || b === r) && b !== e && this._first && (c = !0,
                b > r && (u = "onReverseComplete"))),
                this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e : r,
                this._yoyo && 0 !== (1 & this._cycle) ? this._time = e = 0 : (this._time = g,
                e = g + 1e-4);
            else if (1e-7 > e)
                if (this._locked || (this._totalTime = this._cycle = 0),
                this._time = 0,
                (0 !== m || 0 === g && b !== r && (b > 0 || 0 > e && b >= 0) && !this._locked) && (u = "onReverseComplete",
                s = this._reversed),
                0 > e)
                    this._active = !1,
                    this._timeline.autoRemoveChildren && this._reversed ? (c = s = !0,
                    u = "onReverseComplete") : b >= 0 && this._first && (c = !0),
                    this._rawPrevTime = e;
                else {
                    if (this._rawPrevTime = g || !t || e || this._rawPrevTime === e ? e : r,
                    0 === e && s)
                        for (i = this._first; i && 0 === i._startTime; )
                            i._duration || (s = !1),
                            i = i._next;
                    e = 0,
                    this._initted || (c = !0)
                }
            else if (0 === g && 0 > b && (c = !0),
            this._time = this._rawPrevTime = e,
            this._locked || (this._totalTime = e,
            0 !== this._repeat && (h = g + this._repeatDelay,
            this._cycle = this._totalTime / h >> 0,
            0 !== this._cycle && this._cycle === this._totalTime / h && this._cycle--,
            this._time = this._totalTime - this._cycle * h,
            this._yoyo && 0 !== (1 & this._cycle) && (this._time = g - this._time),
            this._time > g ? (this._time = g,
            e = g + 1e-4) : this._time < 0 ? this._time = e = 0 : e = this._time)),
            this._hasPause && !this._forcingPlayhead && !t) {
                if (e = this._time,
                e >= m)
                    for (i = this._first; i && i._startTime <= e && !d; )
                        i._duration || "isPause" !== i.data || i.ratio || 0 === i._startTime && 0 === this._rawPrevTime || (d = i),
                        i = i._next;
                else
                    for (i = this._last; i && i._startTime >= e && !d; )
                        i._duration || "isPause" === i.data && i._rawPrevTime > 0 && (d = i),
                        i = i._prev;
                d && (this._time = e = d._startTime,
                this._totalTime = e + this._cycle * (this._totalDuration + this._repeatDelay))
            }
            if (this._cycle !== x && !this._locked) {
                var T = this._yoyo && 0 !== (1 & x)
                  , P = T === (this._yoyo && 0 !== (1 & this._cycle))
                  , S = this._totalTime
                  , k = this._cycle
                  , A = this._rawPrevTime
                  , C = this._time;
                if (this._totalTime = x * g,
                this._cycle < x ? T = !T : this._totalTime += g,
                this._time = m,
                this._rawPrevTime = 0 === g ? b - 1e-4 : b,
                this._cycle = x,
                this._locked = !0,
                m = T ? 0 : g,
                this.render(m, t, 0 === g),
                t || this._gc || this.vars.onRepeat && this._callback("onRepeat"),
                m !== this._time)
                    return;
                if (P && (m = T ? g + 1e-4 : -1e-4,
                this.render(m, !0, !1)),
                this._locked = !1,
                this._paused && !w)
                    return;
                this._time = C,
                this._totalTime = S,
                this._cycle = k,
                this._rawPrevTime = A
            }
            if (!(this._time !== m && this._first || n || c || d))
                return void (v !== this._totalTime && this._onUpdate && (t || this._callback("onUpdate")));
            if (this._initted || (this._initted = !0),
            this._active || !this._paused && this._totalTime !== v && e > 0 && (this._active = !0),
            0 === v && this.vars.onStart && 0 !== this._totalTime && (t || this._callback("onStart")),
            p = this._time,
            p >= m)
                for (i = this._first; i && (l = i._next,
                p === this._time && (!this._paused || w)); )
                    (i._active || i._startTime <= this._time && !i._paused && !i._gc) && (d === i && this.pause(),
                    i._reversed ? i.render((i._dirty ? i.totalDuration() : i._totalDuration) - (e - i._startTime) * i._timeScale, t, n) : i.render((e - i._startTime) * i._timeScale, t, n)),
                    i = l;
            else
                for (i = this._last; i && (l = i._prev,
                p === this._time && (!this._paused || w)); ) {
                    if (i._active || i._startTime <= m && !i._paused && !i._gc) {
                        if (d === i) {
                            for (d = i._prev; d && d.endTime() > this._time; )
                                d.render(d._reversed ? d.totalDuration() - (e - d._startTime) * d._timeScale : (e - d._startTime) * d._timeScale, t, n),
                                d = d._prev;
                            d = null ,
                            this.pause()
                        }
                        i._reversed ? i.render((i._dirty ? i.totalDuration() : i._totalDuration) - (e - i._startTime) * i._timeScale, t, n) : i.render((e - i._startTime) * i._timeScale, t, n)
                    }
                    i = l
                }
            this._onUpdate && (t || (a.length && o(),
            this._callback("onUpdate"))),
            u && (this._locked || this._gc || (_ === this._startTime || y !== this._timeScale) && (0 === this._time || f >= this.totalDuration()) && (s && (a.length && o(),
            this._timeline.autoRemoveChildren && this._enabled(!1, !1),
            this._active = !1),
            !t && this.vars[u] && this._callback(u)))
        }
        ,
        u.getActive = function(e, t, n) {
            null  == e && (e = !0),
            null  == t && (t = !0),
            null  == n && (n = !1);
            var i, r, s = [], a = this.getChildren(e, t, n), o = 0, l = a.length;
            for (i = 0; l > i; i++)
                r = a[i],
                r.isActive() && (s[o++] = r);
            return s
        }
        ,
        u.getLabelAfter = function(e) {
            e || 0 !== e && (e = this._time);
            var t, n = this.getLabelsArray(), i = n.length;
            for (t = 0; i > t; t++)
                if (n[t].time > e)
                    return n[t].name;
            return null 
        }
        ,
        u.getLabelBefore = function(e) {
            null  == e && (e = this._time);
            for (var t = this.getLabelsArray(), n = t.length; --n > -1; )
                if (t[n].time < e)
                    return t[n].name;
            return null 
        }
        ,
        u.getLabelsArray = function() {
            var e, t = [], n = 0;
            for (e in this._labels)
                t[n++] = {
                    time: this._labels[e],
                    name: e
                };
            return t.sort(function(e, t) {
                return e.time - t.time
            }),
            t
        }
        ,
        u.progress = function(e, t) {
            return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - e : e) + this._cycle * (this._duration + this._repeatDelay), t) : this._time / this.duration()
        }
        ,
        u.totalProgress = function(e, t) {
            return arguments.length ? this.totalTime(this.totalDuration() * e, t) : this._totalTime / this.totalDuration()
        }
        ,
        u.totalDuration = function(t) {
            return arguments.length ? -1 !== this._repeat && t ? this.timeScale(this.totalDuration() / t) : this : (this._dirty && (e.prototype.totalDuration.call(this),
            this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat),
            this._totalDuration)
        }
        ,
        u.time = function(e, t) {
            return arguments.length ? (this._dirty && this.totalDuration(),
            e > this._duration && (e = this._duration),
            this._yoyo && 0 !== (1 & this._cycle) ? e = this._duration - e + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (e += this._cycle * (this._duration + this._repeatDelay)),
            this.totalTime(e, t)) : this._time
        }
        ,
        u.repeat = function(e) {
            return arguments.length ? (this._repeat = e,
            this._uncache(!0)) : this._repeat
        }
        ,
        u.repeatDelay = function(e) {
            return arguments.length ? (this._repeatDelay = e,
            this._uncache(!0)) : this._repeatDelay
        }
        ,
        u.yoyo = function(e) {
            return arguments.length ? (this._yoyo = e,
            this) : this._yoyo
        }
        ,
        u.currentLabel = function(e) {
            return arguments.length ? this.seek(e, !0) : this.getLabelBefore(this._time + 1e-8)
        }
        ,
        i
    }, !0),
    _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(e, t, n) {
        var i = function(e) {
            t.call(this, e),
            this._labels = {},
            this.autoRemoveChildren = this.vars.autoRemoveChildren === !0,
            this.smoothChildTiming = this.vars.smoothChildTiming === !0,
            this._sortChildren = !0,
            this._onUpdate = this.vars.onUpdate;
            var n, i, r = this.vars;
            for (i in r)
                n = r[i],
                l(n) && -1 !== n.join("").indexOf("{self}") && (r[i] = this._swapSelfInParams(n));
            l(r.tweens) && this.add(r.tweens, 0, r.align, r.stagger)
        }
          , r = 1e-10
          , s = n._internals
          , a = i._internals = {}
          , o = s.isSelector
          , l = s.isArray
          , u = s.lazyTweens
          , c = s.lazyRender
          , h = _gsScope._gsDefine.globals
          , d = function(e) {
            var t, n = {};
            for (t in e)
                n[t] = e[t];
            return n
        }
          , p = function(e, t, n) {
            var i, r, s = e.cycle;
            for (i in s)
                r = s[i],
                e[i] = "function" == typeof r ? r.call(t[n], n) : r[n % r.length];
            delete e.cycle
        }
          , f = a.pauseCallback = function() {}
          , g = function(e) {
            var t, n = [], i = e.length;
            for (t = 0; t !== i; n.push(e[t++]))
                ;
            return n
        }
          , m = i.prototype = new t;
        return i.version = "1.18.2",
        m.constructor = i,
        m.kill()._gc = m._forcingPlayhead = m._hasPause = !1,
        m.to = function(e, t, i, r) {
            var s = i.repeat && h.TweenMax || n;
            return t ? this.add(new s(e,t,i), r) : this.set(e, i, r)
        }
        ,
        m.from = function(e, t, i, r) {
            return this.add((i.repeat && h.TweenMax || n).from(e, t, i), r)
        }
        ,
        m.fromTo = function(e, t, i, r, s) {
            var a = r.repeat && h.TweenMax || n;
            return t ? this.add(a.fromTo(e, t, i, r), s) : this.set(e, r, s)
        }
        ,
        m.staggerTo = function(e, t, r, s, a, l, u, c) {
            var h, f, m = new i({
                onComplete: l,
                onCompleteParams: u,
                callbackScope: c,
                smoothChildTiming: this.smoothChildTiming
            }), v = r.cycle;
            for ("string" == typeof e && (e = n.selector(e) || e),
            e = e || [],
            o(e) && (e = g(e)),
            s = s || 0,
            0 > s && (e = g(e),
            e.reverse(),
            s *= -1),
            f = 0; f < e.length; f++)
                h = d(r),
                h.startAt && (h.startAt = d(h.startAt),
                h.startAt.cycle && p(h.startAt, e, f)),
                v && p(h, e, f),
                m.to(e[f], t, h, f * s);
            return this.add(m, a)
        }
        ,
        m.staggerFrom = function(e, t, n, i, r, s, a, o) {
            return n.immediateRender = 0 != n.immediateRender,
            n.runBackwards = !0,
            this.staggerTo(e, t, n, i, r, s, a, o)
        }
        ,
        m.staggerFromTo = function(e, t, n, i, r, s, a, o, l) {
            return i.startAt = n,
            i.immediateRender = 0 != i.immediateRender && 0 != n.immediateRender,
            this.staggerTo(e, t, i, r, s, a, o, l)
        }
        ,
        m.call = function(e, t, i, r) {
            return this.add(n.delayedCall(0, e, t, i), r)
        }
        ,
        m.set = function(e, t, i) {
            return i = this._parseTimeOrLabel(i, 0, !0),
            null  == t.immediateRender && (t.immediateRender = i === this._time && !this._paused),
            this.add(new n(e,0,t), i)
        }
        ,
        i.exportRoot = function(e, t) {
            e = e || {},
            null  == e.smoothChildTiming && (e.smoothChildTiming = !0);
            var r, s, a = new i(e), o = a._timeline;
            for (null  == t && (t = !0),
            o._remove(a, !0),
            a._startTime = 0,
            a._rawPrevTime = a._time = a._totalTime = o._time,
            r = o._first; r; )
                s = r._next,
                t && r instanceof n && r.target === r.vars.onComplete || a.add(r, r._startTime - r._delay),
                r = s;
            return o.add(a, 0),
            a
        }
        ,
        m.add = function(r, s, a, o) {
            var u, c, h, d, p, f;
            if ("number" != typeof s && (s = this._parseTimeOrLabel(s, 0, !0, r)),
            !(r instanceof e)) {
                if (r instanceof Array || r && r.push && l(r)) {
                    for (a = a || "normal",
                    o = o || 0,
                    u = s,
                    c = r.length,
                    h = 0; c > h; h++)
                        l(d = r[h]) && (d = new i({
                            tweens: d
                        })),
                        this.add(d, u),
                        "string" != typeof d && "function" != typeof d && ("sequence" === a ? u = d._startTime + d.totalDuration() / d._timeScale : "start" === a && (d._startTime -= d.delay())),
                        u += o;
                    return this._uncache(!0)
                }
                if ("string" == typeof r)
                    return this.addLabel(r, s);
                if ("function" != typeof r)
                    throw "Cannot add " + r + " into the timeline; it is not a tween, timeline, function, or string.";
                r = n.delayedCall(0, r)
            }
            if (t.prototype.add.call(this, r, s),
            (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
                for (p = this,
                f = p.rawTime() > r._startTime; p._timeline; )
                    f && p._timeline.smoothChildTiming ? p.totalTime(p._totalTime, !0) : p._gc && p._enabled(!0, !1),
                    p = p._timeline;
            return this
        }
        ,
        m.remove = function(t) {
            if (t instanceof e) {
                this._remove(t, !1);
                var n = t._timeline = t.vars.useFrames ? e._rootFramesTimeline : e._rootTimeline;
                return t._startTime = (t._paused ? t._pauseTime : n._time) - (t._reversed ? t.totalDuration() - t._totalTime : t._totalTime) / t._timeScale,
                this
            }
            if (t instanceof Array || t && t.push && l(t)) {
                for (var i = t.length; --i > -1; )
                    this.remove(t[i]);
                return this
            }
            return "string" == typeof t ? this.removeLabel(t) : this.kill(null , t)
        }
        ,
        m._remove = function(e, n) {
            t.prototype._remove.call(this, e, n);
            var i = this._last;
            return i ? this._time > i._startTime + i._totalDuration / i._timeScale && (this._time = this.duration(),
            this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0,
            this
        }
        ,
        m.append = function(e, t) {
            return this.add(e, this._parseTimeOrLabel(null , t, !0, e))
        }
        ,
        m.insert = m.insertMultiple = function(e, t, n, i) {
            return this.add(e, t || 0, n, i)
        }
        ,
        m.appendMultiple = function(e, t, n, i) {
            return this.add(e, this._parseTimeOrLabel(null , t, !0, e), n, i)
        }
        ,
        m.addLabel = function(e, t) {
            return this._labels[e] = this._parseTimeOrLabel(t),
            this
        }
        ,
        m.addPause = function(e, t, i, r) {
            var s = n.delayedCall(0, f, i, r || this);
            return s.vars.onComplete = s.vars.onReverseComplete = t,
            s.data = "isPause",
            this._hasPause = !0,
            this.add(s, e)
        }
        ,
        m.removeLabel = function(e) {
            return delete this._labels[e],
            this
        }
        ,
        m.getLabelTime = function(e) {
            return null  != this._labels[e] ? this._labels[e] : -1
        }
        ,
        m._parseTimeOrLabel = function(t, n, i, r) {
            var s;
            if (r instanceof e && r.timeline === this)
                this.remove(r);
            else if (r && (r instanceof Array || r.push && l(r)))
                for (s = r.length; --s > -1; )
                    r[s] instanceof e && r[s].timeline === this && this.remove(r[s]);
            if ("string" == typeof n)
                return this._parseTimeOrLabel(n, i && "number" == typeof t && null  == this._labels[n] ? t - this.duration() : 0, i);
            if (n = n || 0,
            "string" != typeof t || !isNaN(t) && null  == this._labels[t])
                null  == t && (t = this.duration());
            else {
                if (s = t.indexOf("="),
                -1 === s)
                    return null  == this._labels[t] ? i ? this._labels[t] = this.duration() + n : n : this._labels[t] + n;
                n = parseInt(t.charAt(s - 1) + "1", 10) * Number(t.substr(s + 1)),
                t = s > 1 ? this._parseTimeOrLabel(t.substr(0, s - 1), 0, i) : this.duration()
            }
            return Number(t) + n
        }
        ,
        m.seek = function(e, t) {
            return this.totalTime("number" == typeof e ? e : this._parseTimeOrLabel(e), t !== !1)
        }
        ,
        m.stop = function() {
            return this.paused(!0)
        }
        ,
        m.gotoAndPlay = function(e, t) {
            return this.play(e, t)
        }
        ,
        m.gotoAndStop = function(e, t) {
            return this.pause(e, t)
        }
        ,
        m.render = function(e, t, n) {
            this._gc && this._enabled(!0, !1);
            var i, s, a, o, l, h, d, p = this._dirty ? this.totalDuration() : this._totalDuration, f = this._time, g = this._startTime, m = this._timeScale, v = this._paused;
            if (e >= p - 1e-7)
                this._totalTime = this._time = p,
                this._reversed || this._hasPausedChild() || (s = !0,
                o = "onComplete",
                l = !!this._timeline.autoRemoveChildren,
                0 === this._duration && (0 >= e && e >= -1e-7 || this._rawPrevTime < 0 || this._rawPrevTime === r) && this._rawPrevTime !== e && this._first && (l = !0,
                this._rawPrevTime > r && (o = "onReverseComplete"))),
                this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e : r,
                e = p + 1e-4;
            else if (1e-7 > e)
                if (this._totalTime = this._time = 0,
                (0 !== f || 0 === this._duration && this._rawPrevTime !== r && (this._rawPrevTime > 0 || 0 > e && this._rawPrevTime >= 0)) && (o = "onReverseComplete",
                s = this._reversed),
                0 > e)
                    this._active = !1,
                    this._timeline.autoRemoveChildren && this._reversed ? (l = s = !0,
                    o = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (l = !0),
                    this._rawPrevTime = e;
                else {
                    if (this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e : r,
                    0 === e && s)
                        for (i = this._first; i && 0 === i._startTime; )
                            i._duration || (s = !1),
                            i = i._next;
                    e = 0,
                    this._initted || (l = !0)
                }
            else {
                if (this._hasPause && !this._forcingPlayhead && !t) {
                    if (e >= f)
                        for (i = this._first; i && i._startTime <= e && !h; )
                            i._duration || "isPause" !== i.data || i.ratio || 0 === i._startTime && 0 === this._rawPrevTime || (h = i),
                            i = i._next;
                    else
                        for (i = this._last; i && i._startTime >= e && !h; )
                            i._duration || "isPause" === i.data && i._rawPrevTime > 0 && (h = i),
                            i = i._prev;
                    h && (this._time = e = h._startTime,
                    this._totalTime = e + this._cycle * (this._totalDuration + this._repeatDelay))
                }
                this._totalTime = this._time = this._rawPrevTime = e
            }
            if (this._time !== f && this._first || n || l || h) {
                if (this._initted || (this._initted = !0),
                this._active || !this._paused && this._time !== f && e > 0 && (this._active = !0),
                0 === f && this.vars.onStart && 0 !== this._time && (t || this._callback("onStart")),
                d = this._time,
                d >= f)
                    for (i = this._first; i && (a = i._next,
                    d === this._time && (!this._paused || v)); )
                        (i._active || i._startTime <= d && !i._paused && !i._gc) && (h === i && this.pause(),
                        i._reversed ? i.render((i._dirty ? i.totalDuration() : i._totalDuration) - (e - i._startTime) * i._timeScale, t, n) : i.render((e - i._startTime) * i._timeScale, t, n)),
                        i = a;
                else
                    for (i = this._last; i && (a = i._prev,
                    d === this._time && (!this._paused || v)); ) {
                        if (i._active || i._startTime <= f && !i._paused && !i._gc) {
                            if (h === i) {
                                for (h = i._prev; h && h.endTime() > this._time; )
                                    h.render(h._reversed ? h.totalDuration() - (e - h._startTime) * h._timeScale : (e - h._startTime) * h._timeScale, t, n),
                                    h = h._prev;
                                h = null ,
                                this.pause()
                            }
                            i._reversed ? i.render((i._dirty ? i.totalDuration() : i._totalDuration) - (e - i._startTime) * i._timeScale, t, n) : i.render((e - i._startTime) * i._timeScale, t, n)
                        }
                        i = a
                    }
                this._onUpdate && (t || (u.length && c(),
                this._callback("onUpdate"))),
                o && (this._gc || (g === this._startTime || m !== this._timeScale) && (0 === this._time || p >= this.totalDuration()) && (s && (u.length && c(),
                this._timeline.autoRemoveChildren && this._enabled(!1, !1),
                this._active = !1),
                !t && this.vars[o] && this._callback(o)))
            }
        }
        ,
        m._hasPausedChild = function() {
            for (var e = this._first; e; ) {
                if (e._paused || e instanceof i && e._hasPausedChild())
                    return !0;
                e = e._next
            }
            return !1
        }
        ,
        m.getChildren = function(e, t, i, r) {
            r = r || -9999999999;
            for (var s = [], a = this._first, o = 0; a; )
                a._startTime < r || (a instanceof n ? t !== !1 && (s[o++] = a) : (i !== !1 && (s[o++] = a),
                e !== !1 && (s = s.concat(a.getChildren(!0, t, i)),
                o = s.length))),
                a = a._next;
            return s
        }
        ,
        m.getTweensOf = function(e, t) {
            var i, r, s = this._gc, a = [], o = 0;
            for (s && this._enabled(!0, !0),
            i = n.getTweensOf(e),
            r = i.length; --r > -1; )
                (i[r].timeline === this || t && this._contains(i[r])) && (a[o++] = i[r]);
            return s && this._enabled(!1, !0),
            a
        }
        ,
        m.recent = function() {
            return this._recent
        }
        ,
        m._contains = function(e) {
            for (var t = e.timeline; t; ) {
                if (t === this)
                    return !0;
                t = t.timeline
            }
            return !1
        }
        ,
        m.shiftChildren = function(e, t, n) {
            n = n || 0;
            for (var i, r = this._first, s = this._labels; r; )
                r._startTime >= n && (r._startTime += e),
                r = r._next;
            if (t)
                for (i in s)
                    s[i] >= n && (s[i] += e);
            return this._uncache(!0)
        }
        ,
        m._kill = function(e, t) {
            if (!e && !t)
                return this._enabled(!1, !1);
            for (var n = t ? this.getTweensOf(t) : this.getChildren(!0, !0, !1), i = n.length, r = !1; --i > -1; )
                n[i]._kill(e, t) && (r = !0);
            return r
        }
        ,
        m.clear = function(e) {
            var t = this.getChildren(!1, !0, !0)
              , n = t.length;
            for (this._time = this._totalTime = 0; --n > -1; )
                t[n]._enabled(!1, !1);
            return e !== !1 && (this._labels = {}),
            this._uncache(!0)
        }
        ,
        m.invalidate = function() {
            for (var t = this._first; t; )
                t.invalidate(),
                t = t._next;
            return e.prototype.invalidate.call(this)
        }
        ,
        m._enabled = function(e, n) {
            if (e === this._gc)
                for (var i = this._first; i; )
                    i._enabled(e, !0),
                    i = i._next;
            return t.prototype._enabled.call(this, e, n)
        }
        ,
        m.totalTime = function() {
            this._forcingPlayhead = !0;
            var t = e.prototype.totalTime.apply(this, arguments);
            return this._forcingPlayhead = !1,
            t
        }
        ,
        m.duration = function(e) {
            return arguments.length ? (0 !== this.duration() && 0 !== e && this.timeScale(this._duration / e),
            this) : (this._dirty && this.totalDuration(),
            this._duration)
        }
        ,
        m.totalDuration = function(e) {
            if (!arguments.length) {
                if (this._dirty) {
                    for (var t, n, i = 0, r = this._last, s = 999999999999; r; )
                        t = r._prev,
                        r._dirty && r.totalDuration(),
                        r._startTime > s && this._sortChildren && !r._paused ? this.add(r, r._startTime - r._delay) : s = r._startTime,
                        r._startTime < 0 && !r._paused && (i -= r._startTime,
                        this._timeline.smoothChildTiming && (this._startTime += r._startTime / this._timeScale),
                        this.shiftChildren(-r._startTime, !1, -9999999999),
                        s = 0),
                        n = r._startTime + r._totalDuration / r._timeScale,
                        n > i && (i = n),
                        r = t;
                    this._duration = this._totalDuration = i,
                    this._dirty = !1
                }
                return this._totalDuration
            }
            return e && this.totalDuration() ? this.timeScale(this._totalDuration / e) : this
        }
        ,
        m.paused = function(t) {
            if (!t)
                for (var n = this._first, i = this._time; n; )
                    n._startTime === i && "isPause" === n.data && (n._rawPrevTime = 0),
                    n = n._next;
            return e.prototype.paused.apply(this, arguments)
        }
        ,
        m.usesFrames = function() {
            for (var t = this._timeline; t._timeline; )
                t = t._timeline;
            return t === e._rootFramesTimeline
        }
        ,
        m.rawTime = function() {
            return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
        }
        ,
        i
    }, !0)
}),
_gsScope._gsDefine && _gsScope._gsQueue.pop()(),
function(e) {
    var t = function() {
        return (_gsScope.GreenSockGlobals || _gsScope)[e]
    }
    ;
    "function" == typeof define && define.amd ? define("TimelineMax", ["TweenLite"], t) : "undefined" != typeof module && module.exports && (require("./TweenLite.js"),
    module.exports = t())
}("TimelineMax"),
!function(e) {
    var t, n, i = "0.4.2", r = "hasOwnProperty", s = /[\.\/]/, a = /\s*,\s*/, o = "*", l = function(e, t) {
        return e - t
    }
    , u = {
        n: {}
    }, c = function() {
        for (var e = 0, t = this.length; t > e; e++)
            if ("undefined" != typeof this[e])
                return this[e]
    }
    , h = function() {
        for (var e = this.length; --e; )
            if ("undefined" != typeof this[e])
                return this[e]
    }
    , d = function(e, i) {
        e = String(e);
        var r, s = n, a = Array.prototype.slice.call(arguments, 2), o = d.listeners(e), u = 0, p = [], f = {}, g = [], m = t;
        g.firstDefined = c,
        g.lastDefined = h,
        t = e,
        n = 0;
        for (var v = 0, _ = o.length; _ > v; v++)
            "zIndex" in o[v] && (p.push(o[v].zIndex),
            o[v].zIndex < 0 && (f[o[v].zIndex] = o[v]));
        for (p.sort(l); p[u] < 0; )
            if (r = f[p[u++]],
            g.push(r.apply(i, a)),
            n)
                return n = s,
                g;
        for (v = 0; _ > v; v++)
            if (r = o[v],
            "zIndex" in r)
                if (r.zIndex == p[u]) {
                    if (g.push(r.apply(i, a)),
                    n)
                        break;
                    do
                        if (u++,
                        r = f[p[u]],
                        r && g.push(r.apply(i, a)),
                        n)
                            break;
                    while (r)
                } else
                    f[r.zIndex] = r;
            else if (g.push(r.apply(i, a)),
            n)
                break;
        return n = s,
        t = m,
        g
    }
    ;
    d._events = u,
    d.listeners = function(e) {
        var t, n, i, r, a, l, c, h, d = e.split(s), p = u, f = [p], g = [];
        for (r = 0,
        a = d.length; a > r; r++) {
            for (h = [],
            l = 0,
            c = f.length; c > l; l++)
                for (p = f[l].n,
                n = [p[d[r]], p[o]],
                i = 2; i--; )
                    t = n[i],
                    t && (h.push(t),
                    g = g.concat(t.f || []));
            f = h
        }
        return g
    }
    ,
    d.on = function(e, t) {
        if (e = String(e),
        "function" != typeof t)
            return function() {}
            ;
        for (var n = e.split(a), i = 0, r = n.length; r > i; i++)
            !function(e) {
                for (var n, i = e.split(s), r = u, a = 0, o = i.length; o > a; a++)
                    r = r.n,
                    r = r.hasOwnProperty(i[a]) && r[i[a]] || (r[i[a]] = {
                        n: {}
                    });
                for (r.f = r.f || [],
                a = 0,
                o = r.f.length; o > a; a++)
                    if (r.f[a] == t) {
                        n = !0;
                        break
                    }
                !n && r.f.push(t)
            }(n[i]);
        return function(e) {
            +e == +e && (t.zIndex = +e)
        }
    }
    ,
    d.f = function(e) {
        var t = [].slice.call(arguments, 1);
        return function() {
            d.apply(null , [e, null ].concat(t).concat([].slice.call(arguments, 0)))
        }
    }
    ,
    d.stop = function() {
        n = 1
    }
    ,
    d.nt = function(e) {
        return e ? new RegExp("(?:\\.|\\/|^)" + e + "(?:\\.|\\/|$)").test(t) : t
    }
    ,
    d.nts = function() {
        return t.split(s)
    }
    ,
    d.off = d.unbind = function(e, t) {
        if (!e)
            return void (d._events = u = {
                n: {}
            });
        var n = e.split(a);
        if (n.length > 1)
            for (var i = 0, l = n.length; l > i; i++)
                d.off(n[i], t);
        else {
            n = e.split(s);
            var c, h, p, i, l, f, g, m = [u];
            for (i = 0,
            l = n.length; l > i; i++)
                for (f = 0; f < m.length; f += p.length - 2) {
                    if (p = [f, 1],
                    c = m[f].n,
                    n[i] != o)
                        c[n[i]] && p.push(c[n[i]]);
                    else
                        for (h in c)
                            c[r](h) && p.push(c[h]);
                    m.splice.apply(m, p)
                }
            for (i = 0,
            l = m.length; l > i; i++)
                for (c = m[i]; c.n; ) {
                    if (t) {
                        if (c.f) {
                            for (f = 0,
                            g = c.f.length; g > f; f++)
                                if (c.f[f] == t) {
                                    c.f.splice(f, 1);
                                    break
                                }
                            !c.f.length && delete c.f
                        }
                        for (h in c.n)
                            if (c.n[r](h) && c.n[h].f) {
                                var v = c.n[h].f;
                                for (f = 0,
                                g = v.length; g > f; f++)
                                    if (v[f] == t) {
                                        v.splice(f, 1);
                                        break
                                    }
                                !v.length && delete c.n[h].f
                            }
                    } else {
                        delete c.f;
                        for (h in c.n)
                            c.n[r](h) && c.n[h].f && delete c.n[h].f
                    }
                    c = c.n
                }
        }
    }
    ,
    d.once = function(e, t) {
        var n = function() {
            return d.unbind(e, n),
            t.apply(this, arguments)
        }
        ;
        return d.on(e, n)
    }
    ,
    d.version = i,
    d.toString = function() {
        return "You are running Eve " + i
    }
    ,
    "undefined" != typeof module && module.exports ? module.exports = d : "function" == typeof define && define.amd ? define("eve", [], function() {
        return d
    }) : e.eve = d
}(this),
function(e, t) {
    if ("function" == typeof define && define.amd)
        define("Snap", ["eve"], function(n) {
            return t(e, n)
        });
    else if ("undefined" != typeof exports) {
        var n = require("eve");
        module.exports = t(e, n)
    } else
        t(e, e.eve)
}(window || this, function(e, t) {
    var n = function(t) {
        var n = {}
          , i = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame || function(e) {
            setTimeout(e, 16)
        }
          , r = Array.isArray || function(e) {
            return e instanceof Array || "[object Array]" == Object.prototype.toString.call(e)
        }
          , s = 0
          , a = "M" + (+new Date).toString(36)
          , o = function() {
            return a + (s++).toString(36)
        }
          , l = Date.now || function() {
            return +new Date
        }
          , u = function(e) {
            var t = this;
            if (null  == e)
                return t.s;
            var n = t.s - e;
            t.b += t.dur * n,
            t.B += t.dur * n,
            t.s = e
        }
          , c = function(e) {
            var t = this;
            return null  == e ? t.spd : void (t.spd = e)
        }
          , h = function(e) {
            var t = this;
            return null  == e ? t.dur : (t.s = t.s * e / t.dur,
            void (t.dur = e))
        }
          , d = function() {
            var e = this;
            delete n[e.id],
            e.update(),
            t("mina.stop." + e.id, e)
        }
          , p = function() {
            var e = this;
            e.pdif || (delete n[e.id],
            e.update(),
            e.pdif = e.get() - e.b)
        }
          , f = function() {
            var e = this;
            e.pdif && (e.b = e.get() - e.pdif,
            delete e.pdif,
            n[e.id] = e)
        }
          , g = function() {
            var e, t = this;
            if (r(t.start)) {
                e = [];
                for (var n = 0, i = t.start.length; i > n; n++)
                    e[n] = +t.start[n] + (t.end[n] - t.start[n]) * t.easing(t.s)
            } else
                e = +t.start + (t.end - t.start) * t.easing(t.s);
            t.set(e)
        }
          , m = function() {
            var e = 0;
            for (var r in n)
                if (n.hasOwnProperty(r)) {
                    var s = n[r]
                      , a = s.get();
                    e++,
                    s.s = (a - s.b) / (s.dur / s.spd),
                    s.s >= 1 && (delete n[r],
                    s.s = 1,
                    e--,
                    function(e) {
                        setTimeout(function() {
                            t("mina.finish." + e.id, e)
                        })
                    }(s)),
                    s.update()
                }
            e && i(m)
        }
          , v = function(e, t, r, s, a, l, _) {
            var y = {
                id: o(),
                start: e,
                end: t,
                b: r,
                s: 0,
                dur: s - r,
                spd: 1,
                get: a,
                set: l,
                easing: _ || v.linear,
                status: u,
                speed: c,
                duration: h,
                stop: d,
                pause: p,
                resume: f,
                update: g
            };
            n[y.id] = y;
            var b, w = 0;
            for (b in n)
                if (n.hasOwnProperty(b) && (w++,
                2 == w))
                    break;
            return 1 == w && i(m),
            y
        }
        ;
        return v.time = l,
        v.getById = function(e) {
            return n[e] || null 
        }
        ,
        v.linear = function(e) {
            return e
        }
        ,
        v.easeout = function(e) {
            return Math.pow(e, 1.7)
        }
        ,
        v.easein = function(e) {
            return Math.pow(e, .48)
        }
        ,
        v.easeinout = function(e) {
            if (1 == e)
                return 1;
            if (0 == e)
                return 0;
            var t = .48 - e / 1.04
              , n = Math.sqrt(.1734 + t * t)
              , i = n - t
              , r = Math.pow(Math.abs(i), 1 / 3) * (0 > i ? -1 : 1)
              , s = -n - t
              , a = Math.pow(Math.abs(s), 1 / 3) * (0 > s ? -1 : 1)
              , o = r + a + .5;
            return 3 * (1 - o) * o * o + o * o * o
        }
        ,
        v.backin = function(e) {
            if (1 == e)
                return 1;
            var t = 1.70158;
            return e * e * ((t + 1) * e - t)
        }
        ,
        v.backout = function(e) {
            if (0 == e)
                return 0;
            e -= 1;
            var t = 1.70158;
            return e * e * ((t + 1) * e + t) + 1
        }
        ,
        v.elastic = function(e) {
            return e == !!e ? e : Math.pow(2, -10 * e) * Math.sin(2 * (e - .075) * Math.PI / .3) + 1
        }
        ,
        v.bounce = function(e) {
            var t, n = 7.5625, i = 2.75;
            return 1 / i > e ? t = n * e * e : 2 / i > e ? (e -= 1.5 / i,
            t = n * e * e + .75) : 2.5 / i > e ? (e -= 2.25 / i,
            t = n * e * e + .9375) : (e -= 2.625 / i,
            t = n * e * e + .984375),
            t
        }
        ,
        e.mina = v,
        v
    }("undefined" == typeof t ? function() {}
     : t)
      , i = function(e) {
        function n(e, t) {
            if (e) {
                if (e.nodeType)
                    return x(e);
                if (r(e, "array") && n.set)
                    return n.set.apply(n, e);
                if (e instanceof _)
                    return e;
                if (null  == t)
                    return e = P.doc.querySelector(String(e)),
                    x(e)
            }
            return e = null  == e ? "100%" : e,
            t = null  == t ? "100%" : t,
            new w(e,t)
        }
        function i(e, t) {
            if (t) {
                if ("#text" == e && (e = P.doc.createTextNode(t.text || t["#text"] || "")),
                "#comment" == e && (e = P.doc.createComment(t.text || t["#text"] || "")),
                "string" == typeof e && (e = i(e)),
                "string" == typeof t)
                    return 1 == e.nodeType ? "xlink:" == t.substring(0, 6) ? e.getAttributeNS(U, t.substring(6)) : "xml:" == t.substring(0, 4) ? e.getAttributeNS(G, t.substring(4)) : e.getAttribute(t) : "text" == t ? e.nodeValue : null ;
                if (1 == e.nodeType) {
                    for (var n in t)
                        if (t[S](n)) {
                            var r = k(t[n]);
                            r ? "xlink:" == n.substring(0, 6) ? e.setAttributeNS(U, n.substring(6), r) : "xml:" == n.substring(0, 4) ? e.setAttributeNS(G, n.substring(4), r) : e.setAttribute(n, r) : e.removeAttribute(n)
                        }
                } else
                    "text" in t && (e.nodeValue = t.text)
            } else
                e = P.doc.createElementNS(G, e);
            return e
        }
        function r(e, t) {
            return t = k.prototype.toLowerCase.call(t),
            "finite" == t ? isFinite(e) : "array" == t && (e instanceof Array || Array.isArray && Array.isArray(e)) ? !0 : "null" == t && null  === e || t == typeof e && null  !== e || "object" == t && e === Object(e) || I.call(e).slice(8, -1).toLowerCase() == t
        }
        function s(e) {
            if ("function" == typeof e || Object(e) !== e)
                return e;
            var t = new e.constructor;
            for (var n in e)
                e[S](n) && (t[n] = s(e[n]));
            return t
        }
        function a(e, t) {
            for (var n = 0, i = e.length; i > n; n++)
                if (e[n] === t)
                    return e.push(e.splice(n, 1)[0])
        }
        function o(e, t, n) {
            function i() {
                var r = Array.prototype.slice.call(arguments, 0)
                  , s = r.join("␀")
                  , o = i.cache = i.cache || {}
                  , l = i.count = i.count || [];
                return o[S](s) ? (a(l, s),
                n ? n(o[s]) : o[s]) : (l.length >= 1e3 && delete o[l.shift()],
                l.push(s),
                o[s] = e.apply(t, r),
                n ? n(o[s]) : o[s])
            }
            return i
        }
        function l(e, t, n, i, r, s) {
            if (null  == r) {
                var a = e - n
                  , o = t - i;
                return a || o ? (180 + 180 * j.atan2(-o, -a) / D + 360) % 360 : 0
            }
            return l(e, t, r, s) - l(n, i, r, s)
        }
        function u(e) {
            return e % 360 * D / 180
        }
        function c(e) {
            return 180 * e / D % 360
        }
        function h(e) {
            var t = [];
            return e = e.replace(/(?:^|\s)(\w+)\(([^)]+)\)/g, function(e, n, i) {
                return i = i.split(/\s*,\s*|\s+/),
                "rotate" == n && 1 == i.length && i.push(0, 0),
                "scale" == n && (i.length > 2 ? i = i.slice(0, 2) : 2 == i.length && i.push(0, 0),
                1 == i.length && i.push(i[0], 0, 0)),
                t.push("skewX" == n ? ["m", 1, 0, j.tan(u(i[0])), 1, 0, 0] : "skewY" == n ? ["m", 1, j.tan(u(i[0])), 0, 1, 0, 0] : [n.charAt(0)].concat(i)),
                e
            }),
            t
        }
        function d(e, t) {
            var i = et(e)
              , r = new n.Matrix;
            if (i)
                for (var s = 0, a = i.length; a > s; s++) {
                    var o, l, u, c, h, d = i[s], p = d.length, f = k(d[0]).toLowerCase(), g = d[0] != f, m = g ? r.invert() : 0;
                    "t" == f && 2 == p ? r.translate(d[1], 0) : "t" == f && 3 == p ? g ? (o = m.x(0, 0),
                    l = m.y(0, 0),
                    u = m.x(d[1], d[2]),
                    c = m.y(d[1], d[2]),
                    r.translate(u - o, c - l)) : r.translate(d[1], d[2]) : "r" == f ? 2 == p ? (h = h || t,
                    r.rotate(d[1], h.x + h.width / 2, h.y + h.height / 2)) : 4 == p && (g ? (u = m.x(d[2], d[3]),
                    c = m.y(d[2], d[3]),
                    r.rotate(d[1], u, c)) : r.rotate(d[1], d[2], d[3])) : "s" == f ? 2 == p || 3 == p ? (h = h || t,
                    r.scale(d[1], d[p - 1], h.x + h.width / 2, h.y + h.height / 2)) : 4 == p ? g ? (u = m.x(d[2], d[3]),
                    c = m.y(d[2], d[3]),
                    r.scale(d[1], d[1], u, c)) : r.scale(d[1], d[1], d[2], d[3]) : 5 == p && (g ? (u = m.x(d[3], d[4]),
                    c = m.y(d[3], d[4]),
                    r.scale(d[1], d[2], u, c)) : r.scale(d[1], d[2], d[3], d[4])) : "m" == f && 7 == p && r.add(d[1], d[2], d[3], d[4], d[5], d[6])
                }
            return r
        }
        function p(e) {
            var t = e.node.ownerSVGElement && x(e.node.ownerSVGElement) || e.node.parentNode && x(e.node.parentNode) || n.select("svg") || n(0, 0)
              , i = t.select("defs")
              , r = null  == i ? !1 : i.node;
            return r || (r = b("defs", t.node).node),
            r
        }
        function f(e) {
            return e.node.ownerSVGElement && x(e.node.ownerSVGElement) || n.select("svg")
        }
        function m(e, t, n) {
            function r(e) {
                if (null  == e)
                    return N;
                if (e == +e)
                    return e;
                i(u, {
                    width: e
                });
                try {
                    return u.getBBox().width
                } catch (t) {
                    return 0
                }
            }
            function s(e) {
                if (null  == e)
                    return N;
                if (e == +e)
                    return e;
                i(u, {
                    height: e
                });
                try {
                    return u.getBBox().height
                } catch (t) {
                    return 0
                }
            }
            function a(i, r) {
                null  == t ? l[i] = r(e.attr(i) || 0) : i == t && (l = r(null  == n ? e.attr(i) || 0 : n))
            }
            var o = f(e).node
              , l = {}
              , u = o.querySelector(".svg---mgr");
            switch (u || (u = i("rect"),
            i(u, {
                x: -9e9,
                y: -9e9,
                width: 10,
                height: 10,
                "class": "svg---mgr",
                fill: "none"
            }),
            o.appendChild(u)),
            e.type) {
            case "rect":
                a("rx", r),
                a("ry", s);
            case "image":
                a("width", r),
                a("height", s);
            case "text":
                a("x", r),
                a("y", s);
                break;
            case "circle":
                a("cx", r),
                a("cy", s),
                a("r", r);
                break;
            case "ellipse":
                a("cx", r),
                a("cy", s),
                a("rx", r),
                a("ry", s);
                break;
            case "line":
                a("x1", r),
                a("x2", r),
                a("y1", s),
                a("y2", s);
                break;
            case "marker":
                a("refX", r),
                a("markerWidth", r),
                a("refY", s),
                a("markerHeight", s);
                break;
            case "radialGradient":
                a("fx", r),
                a("fy", s);
                break;
            case "tspan":
                a("dx", r),
                a("dy", s);
                break;
            default:
                a(t, r)
            }
            return o.removeChild(u),
            l
        }
        function v(e) {
            r(e, "array") || (e = Array.prototype.slice.call(arguments, 0));
            for (var t = 0, n = 0, i = this.node; this[t]; )
                delete this[t++];
            for (t = 0; t < e.length; t++)
                "set" == e[t].type ? e[t].forEach(function(e) {
                    i.appendChild(e.node)
                }) : i.appendChild(e[t].node);
            var s = i.childNodes;
            for (t = 0; t < s.length; t++)
                this[n++] = x(s[t]);
            return this
        }
        function _(e) {
            if (e.snap in X)
                return X[e.snap];
            var t;
            try {
                t = e.ownerSVGElement
            } catch (n) {}
            this.node = e,
            t && (this.paper = new w(t)),
            this.type = e.tagName || e.nodeName;
            var i = this.id = H(this);
            if (this.anims = {},
            this._ = {
                transform: []
            },
            e.snap = i,
            X[i] = this,
            "g" == this.type && (this.add = v),
            this.type in {
                g: 1,
                mask: 1,
                pattern: 1,
                symbol: 1
            })
                for (var r in w.prototype)
                    w.prototype[S](r) && (this[r] = w.prototype[r])
        }
        function y(e) {
            this.node = e
        }
        function b(e, t) {
            var n = i(e);
            t.appendChild(n);
            var r = x(n);
            return r
        }
        function w(e, t) {
            var n, r, s, a = w.prototype;
            if (e && "svg" == e.tagName) {
                if (e.snap in X)
                    return X[e.snap];
                var o = e.ownerDocument;
                n = new _(e),
                r = e.getElementsByTagName("desc")[0],
                s = e.getElementsByTagName("defs")[0],
                r || (r = i("desc"),
                r.appendChild(o.createTextNode("Created with Snap")),
                n.node.appendChild(r)),
                s || (s = i("defs"),
                n.node.appendChild(s)),
                n.defs = s;
                for (var l in a)
                    a[S](l) && (n[l] = a[l]);
                n.paper = n.root = n
            } else
                n = b("svg", P.doc.body),
                i(n.node, {
                    height: t,
                    version: 1.1,
                    width: e,
                    xmlns: G
                });
            return n
        }
        function x(e) {
            return e ? e instanceof _ || e instanceof y ? e : e.tagName && "svg" == e.tagName.toLowerCase() ? new w(e) : e.tagName && "object" == e.tagName.toLowerCase() && "image/svg+xml" == e.type ? new w(e.contentDocument.getElementsByTagName("svg")[0]) : new _(e) : e
        }
        function T(e, t) {
            for (var n = 0, i = e.length; i > n; n++) {
                var r = {
                    type: e[n].type,
                    attr: e[n].attr()
                }
                  , s = e[n].children();
                t.push(r),
                s.length && T(s, r.childNodes = [])
            }
        }
        n.version = "0.4.0",
        n.toString = function() {
            return "Snap v" + this.version
        }
        ,
        n._ = {};
        var P = {
            win: e.window,
            doc: e.window.document
        };
        n._.glob = P;
        var S = "hasOwnProperty"
          , k = String
          , A = parseFloat
          , C = parseInt
          , j = Math
          , O = j.max
          , M = j.min
          , E = j.abs
          , D = (j.pow,
        j.PI)
          , N = (j.round,
        "")
          , I = Object.prototype.toString
          , L = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\))\s*$/i
          , R = (n._.separator = /[,\s]+/,
        /[\s]*,[\s]*/)
          , V = {
            hs: 1,
            rg: 1
        }
          , B = /([a-z])[\s,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\s]*,?[\s]*)+)/gi
          , F = /([rstm])[\s,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\s]*,?[\s]*)+)/gi
          , $ = /(-?\d*\.?\d*(?:e[\-+]?\\d+)?)[\s]*,?[\s]*/gi
          , q = 0
          , z = "S" + (+new Date).toString(36)
          , H = function(e) {
            return (e && e.type ? e.type : N) + z + (q++).toString(36)
        }
          , U = "http://www.w3.org/1999/xlink"
          , G = "http://www.w3.org/2000/svg"
          , X = {};
        n.url = function(e) {
            return "url('#" + e + "')"
        }
        ,
        n._.$ = i,
        n._.id = H,
        n.format = function() {
            var e = /\{([^\}]+)\}/g
              , t = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g
              , n = function(e, n, i) {
                var r = i;
                return n.replace(t, function(e, t, n, i, s) {
                    t = t || i,
                    r && (t in r && (r = r[t]),
                    "function" == typeof r && s && (r = r()))
                }),
                r = (null  == r || r == i ? e : r) + ""
            }
            ;
            return function(t, i) {
                return k(t).replace(e, function(e, t) {
                    return n(e, t, i)
                })
            }
        }(),
        n._.clone = s,
        n._.cacher = o,
        n.rad = u,
        n.deg = c,
        n.sin = function(e) {
            return j.sin(n.rad(e))
        }
        ,
        n.tan = function(e) {
            return j.tan(n.rad(e))
        }
        ,
        n.cos = function(e) {
            return j.cos(n.rad(e))
        }
        ,
        n.asin = function(e) {
            return n.deg(j.asin(e))
        }
        ,
        n.acos = function(e) {
            return n.deg(j.acos(e))
        }
        ,
        n.atan = function(e) {
            return n.deg(j.atan(e))
        }
        ,
        n.atan2 = function(e) {
            return n.deg(j.atan2(e))
        }
        ,
        n.angle = l,
        n.len = function(e, t, i, r) {
            return Math.sqrt(n.len2(e, t, i, r))
        }
        ,
        n.len2 = function(e, t, n, i) {
            return (e - n) * (e - n) + (t - i) * (t - i)
        }
        ,
        n.closestPoint = function(e, t, n) {
            function i(e) {
                var i = e.x - t
                  , r = e.y - n;
                return i * i + r * r
            }
            for (var r, s, a, o, l = e.node, u = l.getTotalLength(), c = .125 * (u / l.pathSegList.numberOfItems), h = 1 / 0, d = 0; u >= d; d += c)
                (o = i(a = l.getPointAtLength(d))) < h && (r = a,
                s = d,
                h = o);
            for (c *= .5; c > .5; ) {
                var p, f, g, m, v, _;
                (g = s - c) >= 0 && (v = i(p = l.getPointAtLength(g))) < h ? (r = p,
                s = g,
                h = v) : (m = s + c) <= u && (_ = i(f = l.getPointAtLength(m))) < h ? (r = f,
                s = m,
                h = _) : c *= .5
            }
            return r = {
                x: r.x,
                y: r.y,
                length: s,
                distance: Math.sqrt(h)
            }
        }
        ,
        n.is = r,
        n.snapTo = function(e, t, n) {
            if (n = r(n, "finite") ? n : 10,
            r(e, "array")) {
                for (var i = e.length; i--; )
                    if (E(e[i] - t) <= n)
                        return e[i]
            } else {
                e = +e;
                var s = t % e;
                if (n > s)
                    return t - s;
                if (s > e - n)
                    return t - s + e
            }
            return t
        }
        ,
        n.getRGB = o(function(e) {
            if (!e || (e = k(e)).indexOf("-") + 1)
                return {
                    r: -1,
                    g: -1,
                    b: -1,
                    hex: "none",
                    error: 1,
                    toString: J
                };
            if ("none" == e)
                return {
                    r: -1,
                    g: -1,
                    b: -1,
                    hex: "none",
                    toString: J
                };
            if (!(V[S](e.toLowerCase().substring(0, 2)) || "#" == e.charAt()) && (e = W(e)),
            !e)
                return {
                    r: -1,
                    g: -1,
                    b: -1,
                    hex: "none",
                    error: 1,
                    toString: J
                };
            var t, i, s, a, o, l, u = e.match(L);
            return u ? (u[2] && (s = C(u[2].substring(5), 16),
            i = C(u[2].substring(3, 5), 16),
            t = C(u[2].substring(1, 3), 16)),
            u[3] && (s = C((o = u[3].charAt(3)) + o, 16),
            i = C((o = u[3].charAt(2)) + o, 16),
            t = C((o = u[3].charAt(1)) + o, 16)),
            u[4] && (l = u[4].split(R),
            t = A(l[0]),
            "%" == l[0].slice(-1) && (t *= 2.55),
            i = A(l[1]),
            "%" == l[1].slice(-1) && (i *= 2.55),
            s = A(l[2]),
            "%" == l[2].slice(-1) && (s *= 2.55),
            "rgba" == u[1].toLowerCase().slice(0, 4) && (a = A(l[3])),
            l[3] && "%" == l[3].slice(-1) && (a /= 100)),
            u[5] ? (l = u[5].split(R),
            t = A(l[0]),
            "%" == l[0].slice(-1) && (t /= 100),
            i = A(l[1]),
            "%" == l[1].slice(-1) && (i /= 100),
            s = A(l[2]),
            "%" == l[2].slice(-1) && (s /= 100),
            ("deg" == l[0].slice(-3) || "°" == l[0].slice(-1)) && (t /= 360),
            "hsba" == u[1].toLowerCase().slice(0, 4) && (a = A(l[3])),
            l[3] && "%" == l[3].slice(-1) && (a /= 100),
            n.hsb2rgb(t, i, s, a)) : u[6] ? (l = u[6].split(R),
            t = A(l[0]),
            "%" == l[0].slice(-1) && (t /= 100),
            i = A(l[1]),
            "%" == l[1].slice(-1) && (i /= 100),
            s = A(l[2]),
            "%" == l[2].slice(-1) && (s /= 100),
            ("deg" == l[0].slice(-3) || "°" == l[0].slice(-1)) && (t /= 360),
            "hsla" == u[1].toLowerCase().slice(0, 4) && (a = A(l[3])),
            l[3] && "%" == l[3].slice(-1) && (a /= 100),
            n.hsl2rgb(t, i, s, a)) : (t = M(j.round(t), 255),
            i = M(j.round(i), 255),
            s = M(j.round(s), 255),
            a = M(O(a, 0), 1),
            u = {
                r: t,
                g: i,
                b: s,
                toString: J
            },
            u.hex = "#" + (16777216 | s | i << 8 | t << 16).toString(16).slice(1),
            u.opacity = r(a, "finite") ? a : 1,
            u)) : {
                r: -1,
                g: -1,
                b: -1,
                hex: "none",
                error: 1,
                toString: J
            }
        }, n),
        n.hsb = o(function(e, t, i) {
            return n.hsb2rgb(e, t, i).hex
        }),
        n.hsl = o(function(e, t, i) {
            return n.hsl2rgb(e, t, i).hex
        }),
        n.rgb = o(function(e, t, n, i) {
            if (r(i, "finite")) {
                var s = j.round;
                return "rgba(" + [s(e), s(t), s(n), +i.toFixed(2)] + ")"
            }
            return "#" + (16777216 | n | t << 8 | e << 16).toString(16).slice(1)
        });
        var W = function(e) {
            var t = P.doc.getElementsByTagName("head")[0] || P.doc.getElementsByTagName("svg")[0]
              , n = "rgb(255, 0, 0)";
            return (W = o(function(e) {
                if ("red" == e.toLowerCase())
                    return n;
                t.style.color = n,
                t.style.color = e;
                var i = P.doc.defaultView.getComputedStyle(t, N).getPropertyValue("color");
                return i == n ? null  : i
            }))(e)
        }
          , Y = function() {
            return "hsb(" + [this.h, this.s, this.b] + ")"
        }
          , Q = function() {
            return "hsl(" + [this.h, this.s, this.l] + ")"
        }
          , J = function() {
            return 1 == this.opacity || null  == this.opacity ? this.hex : "rgba(" + [this.r, this.g, this.b, this.opacity] + ")"
        }
          , Z = function(e, t, i) {
            if (null  == t && r(e, "object") && "r" in e && "g" in e && "b" in e && (i = e.b,
            t = e.g,
            e = e.r),
            null  == t && r(e, string)) {
                var s = n.getRGB(e);
                e = s.r,
                t = s.g,
                i = s.b
            }
            return (e > 1 || t > 1 || i > 1) && (e /= 255,
            t /= 255,
            i /= 255),
            [e, t, i]
        }
          , K = function(e, t, i, s) {
            e = j.round(255 * e),
            t = j.round(255 * t),
            i = j.round(255 * i);
            var a = {
                r: e,
                g: t,
                b: i,
                opacity: r(s, "finite") ? s : 1,
                hex: n.rgb(e, t, i),
                toString: J
            };
            return r(s, "finite") && (a.opacity = s),
            a
        }
        ;
        n.color = function(e) {
            var t;
            return r(e, "object") && "h" in e && "s" in e && "b" in e ? (t = n.hsb2rgb(e),
            e.r = t.r,
            e.g = t.g,
            e.b = t.b,
            e.opacity = 1,
            e.hex = t.hex) : r(e, "object") && "h" in e && "s" in e && "l" in e ? (t = n.hsl2rgb(e),
            e.r = t.r,
            e.g = t.g,
            e.b = t.b,
            e.opacity = 1,
            e.hex = t.hex) : (r(e, "string") && (e = n.getRGB(e)),
            r(e, "object") && "r" in e && "g" in e && "b" in e && !("error" in e) ? (t = n.rgb2hsl(e),
            e.h = t.h,
            e.s = t.s,
            e.l = t.l,
            t = n.rgb2hsb(e),
            e.v = t.b) : (e = {
                hex: "none"
            },
            e.r = e.g = e.b = e.h = e.s = e.v = e.l = -1,
            e.error = 1)),
            e.toString = J,
            e
        }
        ,
        n.hsb2rgb = function(e, t, n, i) {
            r(e, "object") && "h" in e && "s" in e && "b" in e && (n = e.b,
            t = e.s,
            i = e.o,
            e = e.h),
            e *= 360;
            var s, a, o, l, u;
            return e = e % 360 / 60,
            u = n * t,
            l = u * (1 - E(e % 2 - 1)),
            s = a = o = n - u,
            e = ~~e,
            s += [u, l, 0, 0, l, u][e],
            a += [l, u, u, l, 0, 0][e],
            o += [0, 0, l, u, u, l][e],
            K(s, a, o, i)
        }
        ,
        n.hsl2rgb = function(e, t, n, i) {
            r(e, "object") && "h" in e && "s" in e && "l" in e && (n = e.l,
            t = e.s,
            e = e.h),
            (e > 1 || t > 1 || n > 1) && (e /= 360,
            t /= 100,
            n /= 100),
            e *= 360;
            var s, a, o, l, u;
            return e = e % 360 / 60,
            u = 2 * t * (.5 > n ? n : 1 - n),
            l = u * (1 - E(e % 2 - 1)),
            s = a = o = n - u / 2,
            e = ~~e,
            s += [u, l, 0, 0, l, u][e],
            a += [l, u, u, l, 0, 0][e],
            o += [0, 0, l, u, u, l][e],
            K(s, a, o, i)
        }
        ,
        n.rgb2hsb = function(e, t, n) {
            n = Z(e, t, n),
            e = n[0],
            t = n[1],
            n = n[2];
            var i, r, s, a;
            return s = O(e, t, n),
            a = s - M(e, t, n),
            i = 0 == a ? null  : s == e ? (t - n) / a : s == t ? (n - e) / a + 2 : (e - t) / a + 4,
            i = 60 * ((i + 360) % 6) / 360,
            r = 0 == a ? 0 : a / s,
            {
                h: i,
                s: r,
                b: s,
                toString: Y
            }
        }
        ,
        n.rgb2hsl = function(e, t, n) {
            n = Z(e, t, n),
            e = n[0],
            t = n[1],
            n = n[2];
            var i, r, s, a, o, l;
            return a = O(e, t, n),
            o = M(e, t, n),
            l = a - o,
            i = 0 == l ? null  : a == e ? (t - n) / l : a == t ? (n - e) / l + 2 : (e - t) / l + 4,
            i = 60 * ((i + 360) % 6) / 360,
            s = (a + o) / 2,
            r = 0 == l ? 0 : .5 > s ? l / (2 * s) : l / (2 - 2 * s),
            {
                h: i,
                s: r,
                l: s,
                toString: Q
            }
        }
        ,
        n.parsePathString = function(e) {
            if (!e)
                return null ;
            var t = n.path(e);
            if (t.arr)
                return n.path.clone(t.arr);
            var i = {
                a: 7,
                c: 6,
                o: 2,
                h: 1,
                l: 2,
                m: 2,
                r: 4,
                q: 4,
                s: 4,
                t: 2,
                v: 1,
                u: 3,
                z: 0
            }
              , s = [];
            return r(e, "array") && r(e[0], "array") && (s = n.path.clone(e)),
            s.length || k(e).replace(B, function(e, t, n) {
                var r = []
                  , a = t.toLowerCase();
                if (n.replace($, function(e, t) {
                    t && r.push(+t)
                }),
                "m" == a && r.length > 2 && (s.push([t].concat(r.splice(0, 2))),
                a = "l",
                t = "m" == t ? "l" : "L"),
                "o" == a && 1 == r.length && s.push([t, r[0]]),
                "r" == a)
                    s.push([t].concat(r));
                else
                    for (; r.length >= i[a] && (s.push([t].concat(r.splice(0, i[a]))),
                    i[a]); )
                        ;
            }),
            s.toString = n.path.toString,
            t.arr = n.path.clone(s),
            s
        }
        ;
        var et = n.parseTransformString = function(e) {
            if (!e)
                return null ;
            var t = [];
            return r(e, "array") && r(e[0], "array") && (t = n.path.clone(e)),
            t.length || k(e).replace(F, function(e, n, i) {
                var r = [];
                n.toLowerCase(),
                i.replace($, function(e, t) {
                    t && r.push(+t)
                }),
                t.push([n].concat(r))
            }),
            t.toString = n.path.toString,
            t
        }
        ;
        n._.svgTransform2string = h,
        n._.rgTransform = /^[a-z][\s]*-?\.?\d/i,
        n._.transform2matrix = d,
        n._unit2px = m,
        P.doc.contains || P.doc.compareDocumentPosition ? function(e, t) {
            var n = 9 == e.nodeType ? e.documentElement : e
              , i = t && t.parentNode;
            return e == i || !(!i || 1 != i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)))
        }
         : function(e, t) {
            if (t)
                for (; t; )
                    if (t = t.parentNode,
                    t == e)
                        return !0;
            return !1
        }
        ,
        n._.getSomeDefs = p,
        n._.getSomeSVG = f,
        n.select = function(e) {
            return e = k(e).replace(/([^\\]):/g, "$1\\:"),
            x(P.doc.querySelector(e))
        }
        ,
        n.selectAll = function(e) {
            for (var t = P.doc.querySelectorAll(e), i = (n.set || Array)(), r = 0; r < t.length; r++)
                i.push(x(t[r]));
            return i
        }
        ,
        setInterval(function() {
            for (var e in X)
                if (X[S](e)) {
                    var t = X[e]
                      , n = t.node;
                    ("svg" != t.type && !n.ownerSVGElement || "svg" == t.type && (!n.parentNode || "ownerSVGElement" in n.parentNode && !n.ownerSVGElement)) && delete X[e]
                }
        }, 1e4),
        _.prototype.attr = function(e, n) {
            var i = this
              , s = i.node;
            if (!e) {
                if (1 != s.nodeType)
                    return {
                        text: s.nodeValue
                    };
                for (var a = s.attributes, o = {}, l = 0, u = a.length; u > l; l++)
                    o[a[l].nodeName] = a[l].nodeValue;
                return o
            }
            if (r(e, "string")) {
                if (!(arguments.length > 1))
                    return t("snap.util.getattr." + e, i).firstDefined();
                var c = {};
                c[e] = n,
                e = c
            }
            for (var h in e)
                e[S](h) && t("snap.util.attr." + h, i, e[h]);
            return i
        }
        ,
        n.parse = function(e) {
            var t = P.doc.createDocumentFragment()
              , n = !0
              , i = P.doc.createElement("div");
            if (e = k(e),
            e.match(/^\s*<\s*svg(?:\s|>)/) || (e = "<svg>" + e + "</svg>",
            n = !1),
            i.innerHTML = e,
            e = i.getElementsByTagName("svg")[0])
                if (n)
                    t = e;
                else
                    for (; e.firstChild; )
                        t.appendChild(e.firstChild);
            return new y(t)
        }
        ,
        n.fragment = function() {
            for (var e = Array.prototype.slice.call(arguments, 0), t = P.doc.createDocumentFragment(), i = 0, r = e.length; r > i; i++) {
                var s = e[i];
                s.node && s.node.nodeType && t.appendChild(s.node),
                s.nodeType && t.appendChild(s),
                "string" == typeof s && t.appendChild(n.parse(s).node)
            }
            return new y(t)
        }
        ,
        n._.make = b,
        n._.wrap = x,
        w.prototype.el = function(e, t) {
            var n = b(e, this.node);
            return t && n.attr(t),
            n
        }
        ,
        _.prototype.children = function() {
            for (var e = [], t = this.node.childNodes, i = 0, r = t.length; r > i; i++)
                e[i] = n(t[i]);
            return e
        }
        ,
        _.prototype.toJSON = function() {
            var e = [];
            return T([this], e),
            e[0]
        }
        ,
        t.on("snap.util.getattr", function() {
            var e = t.nt();
            e = e.substring(e.lastIndexOf(".") + 1);
            var n = e.replace(/[A-Z]/g, function(e) {
                return "-" + e.toLowerCase()
            });
            return tt[S](n) ? this.node.ownerDocument.defaultView.getComputedStyle(this.node, null ).getPropertyValue(n) : i(this.node, e)
        });
        var tt = {
            "alignment-baseline": 0,
            "baseline-shift": 0,
            clip: 0,
            "clip-path": 0,
            "clip-rule": 0,
            color: 0,
            "color-interpolation": 0,
            "color-interpolation-filters": 0,
            "color-profile": 0,
            "color-rendering": 0,
            cursor: 0,
            direction: 0,
            display: 0,
            "dominant-baseline": 0,
            "enable-background": 0,
            fill: 0,
            "fill-opacity": 0,
            "fill-rule": 0,
            filter: 0,
            "flood-color": 0,
            "flood-opacity": 0,
            font: 0,
            "font-family": 0,
            "font-size": 0,
            "font-size-adjust": 0,
            "font-stretch": 0,
            "font-style": 0,
            "font-variant": 0,
            "font-weight": 0,
            "glyph-orientation-horizontal": 0,
            "glyph-orientation-vertical": 0,
            "image-rendering": 0,
            kerning: 0,
            "letter-spacing": 0,
            "lighting-color": 0,
            marker: 0,
            "marker-end": 0,
            "marker-mid": 0,
            "marker-start": 0,
            mask: 0,
            opacity: 0,
            overflow: 0,
            "pointer-events": 0,
            "shape-rendering": 0,
            "stop-color": 0,
            "stop-opacity": 0,
            stroke: 0,
            "stroke-dasharray": 0,
            "stroke-dashoffset": 0,
            "stroke-linecap": 0,
            "stroke-linejoin": 0,
            "stroke-miterlimit": 0,
            "stroke-opacity": 0,
            "stroke-width": 0,
            "text-anchor": 0,
            "text-decoration": 0,
            "text-rendering": 0,
            "unicode-bidi": 0,
            visibility: 0,
            "word-spacing": 0,
            "writing-mode": 0
        };
        t.on("snap.util.attr", function(e) {
            var n = t.nt()
              , r = {};
            n = n.substring(n.lastIndexOf(".") + 1),
            r[n] = e;
            var s = n.replace(/-(\w)/gi, function(e, t) {
                return t.toUpperCase()
            })
              , a = n.replace(/[A-Z]/g, function(e) {
                return "-" + e.toLowerCase()
            });
            tt[S](a) ? this.node.style[s] = null  == e ? N : e : i(this.node, r)
        }),
        function() {}(w.prototype),
        n.ajax = function(e, n, i, s) {
            var a = new XMLHttpRequest
              , o = H();
            if (a) {
                if (r(n, "function"))
                    s = i,
                    i = n,
                    n = null ;
                else if (r(n, "object")) {
                    var l = [];
                    for (var u in n)
                        n.hasOwnProperty(u) && l.push(encodeURIComponent(u) + "=" + encodeURIComponent(n[u]));
                    n = l.join("&")
                }
                return a.open(n ? "POST" : "GET", e, !0),
                n && (a.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
                a.setRequestHeader("Content-type", "application/x-www-form-urlencoded")),
                i && (t.once("snap.ajax." + o + ".0", i),
                t.once("snap.ajax." + o + ".200", i),
                t.once("snap.ajax." + o + ".304", i)),
                a.onreadystatechange = function() {
                    4 == a.readyState && t("snap.ajax." + o + "." + a.status, s, a)
                }
                ,
                4 == a.readyState ? a : (a.send(n),
                a)
            }
        }
        ,
        n.load = function(e, t, i) {
            n.ajax(e, function(e) {
                var r = n.parse(e.responseText);
                i ? t.call(i, r) : t(r)
            })
        }
        ;
        var nt = function(e) {
            var t = e.getBoundingClientRect()
              , n = e.ownerDocument
              , i = n.body
              , r = n.documentElement
              , s = r.clientTop || i.clientTop || 0
              , a = r.clientLeft || i.clientLeft || 0
              , o = t.top + (g.win.pageYOffset || r.scrollTop || i.scrollTop) - s
              , l = t.left + (g.win.pageXOffset || r.scrollLeft || i.scrollLeft) - a;
            return {
                y: o,
                x: l
            }
        }
        ;
        return n.getElementByPoint = function(e, t) {
            var n = this
              , i = (n.canvas,
            P.doc.elementFromPoint(e, t));
            if (P.win.opera && "svg" == i.tagName) {
                var r = nt(i)
                  , s = i.createSVGRect();
                s.x = e - r.x,
                s.y = t - r.y,
                s.width = s.height = 1;
                var a = i.getIntersectionList(s, null );
                a.length && (i = a[a.length - 1])
            }
            return i ? x(i) : null 
        }
        ,
        n.plugin = function(e) {
            e(n, _, w, P, y)
        }
        ,
        P.win.Snap = n,
        n
    }(e || this);
    return i.plugin(function(i, r, s, a, o) {
        function l(e, t) {
            if (null  == t) {
                var n = !0;
                if (t = e.node.getAttribute("linearGradient" == e.type || "radialGradient" == e.type ? "gradientTransform" : "pattern" == e.type ? "patternTransform" : "transform"),
                !t)
                    return new i.Matrix;
                t = i._.svgTransform2string(t)
            } else
                t = i._.rgTransform.test(t) ? f(t).replace(/\.{3}|\u2026/g, e._.transform || "") : i._.svgTransform2string(t),
                p(t, "array") && (t = i.path ? i.path.toString.call(t) : f(t)),
                e._.transform = t;
            var r = i._.transform2matrix(t, e.getBBox(1));
            return n ? r : void (e.matrix = r)
        }
        function u(e) {
            function t(e, t) {
                var n = m(e.node, t);
                n = n && n.match(s),
                n = n && n[2],
                n && "#" == n.charAt() && (n = n.substring(1),
                n && (o[n] = (o[n] || []).concat(function(n) {
                    var i = {};
                    i[t] = URL(n),
                    m(e.node, i)
                })))
            }
            function n(e) {
                var t = m(e.node, "xlink:href");
                t && "#" == t.charAt() && (t = t.substring(1),
                t && (o[t] = (o[t] || []).concat(function(t) {
                    e.attr("xlink:href", "#" + t)
                })))
            }
            for (var i, r = e.selectAll("*"), s = /^\s*url\(("|'|)(.*)\1\)\s*$/, a = [], o = {}, l = 0, u = r.length; u > l; l++) {
                i = r[l],
                t(i, "fill"),
                t(i, "stroke"),
                t(i, "filter"),
                t(i, "mask"),
                t(i, "clip-path"),
                n(i);
                var c = m(i.node, "id");
                c && (m(i.node, {
                    id: i.id
                }),
                a.push({
                    old: c,
                    id: i.id
                }))
            }
            for (l = 0,
            u = a.length; u > l; l++) {
                var h = o[a[l].old];
                if (h)
                    for (var d = 0, p = h.length; p > d; d++)
                        h[d](a[l].id)
            }
        }
        function c(e, t, n) {
            return function(i) {
                var r = i.slice(e, t);
                return 1 == r.length && (r = r[0]),
                n ? n(r) : r
            }
        }
        function h(e) {
            return function() {
                var t = e ? "<" + this.type : ""
                  , n = this.node.attributes
                  , i = this.node.childNodes;
                if (e)
                    for (var r = 0, s = n.length; s > r; r++)
                        t += " " + n[r].name + '="' + n[r].value.replace(/"/g, '\\"') + '"';
                if (i.length) {
                    for (e && (t += ">"),
                    r = 0,
                    s = i.length; s > r; r++)
                        3 == i[r].nodeType ? t += i[r].nodeValue : 1 == i[r].nodeType && (t += b(i[r]).toString());
                    e && (t += "</" + this.type + ">")
                } else
                    e && (t += "/>");
                return t
            }
        }
        var d = r.prototype
          , p = i.is
          , f = String
          , g = i._unit2px
          , m = i._.$
          , v = i._.make
          , _ = i._.getSomeDefs
          , y = "hasOwnProperty"
          , b = i._.wrap;
        d.getBBox = function(e) {
            if (!i.Matrix || !i.path)
                return this.node.getBBox();
            var t = this
              , n = new i.Matrix;
            if (t.removed)
                return i._.box();
            for (; "use" == t.type; )
                if (e || (n = n.add(t.transform().localMatrix.translate(t.attr("x") || 0, t.attr("y") || 0))),
                t.original)
                    t = t.original;
                else {
                    var r = t.attr("xlink:href");
                    t = t.original = t.node.ownerDocument.getElementById(r.substring(r.indexOf("#") + 1))
                }
            var s = t._
              , a = i.path.get[t.type] || i.path.get.deflt;
            try {
                return e ? (s.bboxwt = a ? i.path.getBBox(t.realPath = a(t)) : i._.box(t.node.getBBox()),
                i._.box(s.bboxwt)) : (t.realPath = a(t),
                t.matrix = t.transform().localMatrix,
                s.bbox = i.path.getBBox(i.path.map(t.realPath, n.add(t.matrix))),
                i._.box(s.bbox))
            } catch (o) {
                return i._.box()
            }
        }
        ;
        var w = function() {
            return this.string
        }
        ;
        d.transform = function(e) {
            var t = this._;
            if (null  == e) {
                for (var n, r = this, s = new i.Matrix(this.node.getCTM()), a = l(this), o = [a], u = new i.Matrix, c = a.toTransformString(), h = f(a) == f(this.matrix) ? f(t.transform) : c; "svg" != r.type && (r = r.parent()); )
                    o.push(l(r));
                for (n = o.length; n--; )
                    u.add(o[n]);
                return {
                    string: h,
                    globalMatrix: s,
                    totalMatrix: u,
                    localMatrix: a,
                    diffMatrix: s.clone().add(a.invert()),
                    global: s.toTransformString(),
                    total: u.toTransformString(),
                    local: c,
                    toString: w
                }
            }
            return e instanceof i.Matrix ? (this.matrix = e,
            this._.transform = e.toTransformString()) : l(this, e),
            this.node && ("linearGradient" == this.type || "radialGradient" == this.type ? m(this.node, {
                gradientTransform: this.matrix
            }) : "pattern" == this.type ? m(this.node, {
                patternTransform: this.matrix
            }) : m(this.node, {
                transform: this.matrix
            })),
            this
        }
        ,
        d.parent = function() {
            return b(this.node.parentNode)
        }
        ,
        d.append = d.add = function(e) {
            if (e) {
                if ("set" == e.type) {
                    var t = this;
                    return e.forEach(function(e) {
                        t.add(e)
                    }),
                    this
                }
                e = b(e),
                this.node.appendChild(e.node),
                e.paper = this.paper
            }
            return this
        }
        ,
        d.appendTo = function(e) {
            return e && (e = b(e),
            e.append(this)),
            this
        }
        ,
        d.prepend = function(e) {
            if (e) {
                if ("set" == e.type) {
                    var t, n = this;
                    return e.forEach(function(e) {
                        t ? t.after(e) : n.prepend(e),
                        t = e
                    }),
                    this
                }
                e = b(e);
                var i = e.parent();
                this.node.insertBefore(e.node, this.node.firstChild),
                this.add && this.add(),
                e.paper = this.paper,
                this.parent() && this.parent().add(),
                i && i.add()
            }
            return this
        }
        ,
        d.prependTo = function(e) {
            return e = b(e),
            e.prepend(this),
            this
        }
        ,
        d.before = function(e) {
            if ("set" == e.type) {
                var t = this;
                return e.forEach(function(e) {
                    var n = e.parent();
                    t.node.parentNode.insertBefore(e.node, t.node),
                    n && n.add()
                }),
                this.parent().add(),
                this
            }
            e = b(e);
            var n = e.parent();
            return this.node.parentNode.insertBefore(e.node, this.node),
            this.parent() && this.parent().add(),
            n && n.add(),
            e.paper = this.paper,
            this
        }
        ,
        d.after = function(e) {
            e = b(e);
            var t = e.parent();
            return this.node.nextSibling ? this.node.parentNode.insertBefore(e.node, this.node.nextSibling) : this.node.parentNode.appendChild(e.node),
            this.parent() && this.parent().add(),
            t && t.add(),
            e.paper = this.paper,
            this
        }
        ,
        d.insertBefore = function(e) {
            e = b(e);
            var t = this.parent();
            return e.node.parentNode.insertBefore(this.node, e.node),
            this.paper = e.paper,
            t && t.add(),
            e.parent() && e.parent().add(),
            this
        }
        ,
        d.insertAfter = function(e) {
            e = b(e);
            var t = this.parent();
            return e.node.parentNode.insertBefore(this.node, e.node.nextSibling),
            this.paper = e.paper,
            t && t.add(),
            e.parent() && e.parent().add(),
            this
        }
        ,
        d.remove = function() {
            var e = this.parent();
            return this.node.parentNode && this.node.parentNode.removeChild(this.node),
            delete this.paper,
            this.removed = !0,
            e && e.add(),
            this
        }
        ,
        d.select = function(e) {
            return b(this.node.querySelector(e))
        }
        ,
        d.selectAll = function(e) {
            for (var t = this.node.querySelectorAll(e), n = (i.set || Array)(), r = 0; r < t.length; r++)
                n.push(b(t[r]));
            return n
        }
        ,
        d.asPX = function(e, t) {
            return null  == t && (t = this.attr(e)),
            +g(this, e, t)
        }
        ,
        d.use = function() {
            var e, t = this.node.id;
            return t || (t = this.id,
            m(this.node, {
                id: t
            })),
            e = "linearGradient" == this.type || "radialGradient" == this.type || "pattern" == this.type ? v(this.type, this.node.parentNode) : v("use", this.node.parentNode),
            m(e.node, {
                "xlink:href": "#" + t
            }),
            e.original = this,
            e
        }
        ,
        d.clone = function() {
            var e = b(this.node.cloneNode(!0));
            return m(e.node, "id") && m(e.node, {
                id: e.id
            }),
            u(e),
            e.insertAfter(this),
            e
        }
        ,
        d.toDefs = function() {
            var e = _(this);
            return e.appendChild(this.node),
            this
        }
        ,
        d.pattern = d.toPattern = function(e, t, n, i) {
            var r = v("pattern", _(this));
            return null  == e && (e = this.getBBox()),
            p(e, "object") && "x" in e && (t = e.y,
            n = e.width,
            i = e.height,
            e = e.x),
            m(r.node, {
                x: e,
                y: t,
                width: n,
                height: i,
                patternUnits: "userSpaceOnUse",
                id: r.id,
                viewBox: [e, t, n, i].join(" ")
            }),
            r.node.appendChild(this.node),
            r
        }
        ,
        d.marker = function(e, t, n, i, r, s) {
            var a = v("marker", _(this));
            return null  == e && (e = this.getBBox()),
            p(e, "object") && "x" in e && (t = e.y,
            n = e.width,
            i = e.height,
            r = e.refX || e.cx,
            s = e.refY || e.cy,
            e = e.x),
            m(a.node, {
                viewBox: [e, t, n, i].join(" "),
                markerWidth: n,
                markerHeight: i,
                orient: "auto",
                refX: r || 0,
                refY: s || 0,
                id: a.id
            }),
            a.node.appendChild(this.node),
            a
        }
        ;
        var x = function(e, t, i, r) {
            "function" != typeof i || i.length || (r = i,
            i = n.linear),
            this.attr = e,
            this.dur = t,
            i && (this.easing = i),
            r && (this.callback = r)
        }
        ;
        i._.Animation = x,
        i.animation = function(e, t, n, i) {
            return new x(e,t,n,i)
        }
        ,
        d.inAnim = function() {
            var e = this
              , t = [];
            for (var n in e.anims)
                e.anims[y](n) && !function(e) {
                    t.push({
                        anim: new x(e._attrs,e.dur,e.easing,e._callback),
                        mina: e,
                        curStatus: e.status(),
                        status: function(t) {
                            return e.status(t)
                        },
                        stop: function() {
                            e.stop()
                        }
                    })
                }(e.anims[n]);
            return t
        }
        ,
        i.animate = function(e, i, r, s, a, o) {
            "function" != typeof a || a.length || (o = a,
            a = n.linear);
            var l = n.time()
              , u = n(e, i, l, l + s, n.time, r, a);
            return o && t.once("mina.finish." + u.id, o),
            u
        }
        ,
        d.stop = function() {
            for (var e = this.inAnim(), t = 0, n = e.length; n > t; t++)
                e[t].stop();
            return this
        }
        ,
        d.animate = function(e, i, r, s) {
            "function" != typeof r || r.length || (s = r,
            r = n.linear),
            e instanceof x && (s = e.callback,
            r = e.easing,
            i = e.dur,
            e = e.attr);
            var a, o, l, u, h = [], d = [], g = {}, m = this;
            for (var v in e)
                if (e[y](v)) {
                    m.equal ? (u = m.equal(v, f(e[v])),
                    a = u.from,
                    o = u.to,
                    l = u.f) : (a = +m.attr(v),
                    o = +e[v]);
                    var _ = p(a, "array") ? a.length : 1;
                    g[v] = c(h.length, h.length + _, l),
                    h = h.concat(a),
                    d = d.concat(o)
                }
            var b = n.time()
              , w = n(h, d, b, b + i, n.time, function(e) {
                var t = {};
                for (var n in g)
                    g[y](n) && (t[n] = g[n](e));
                m.attr(t)
            }, r);
            return m.anims[w.id] = w,
            w._attrs = e,
            w._callback = s,
            t("snap.animcreated." + m.id, w),
            t.once("mina.finish." + w.id, function() {
                delete m.anims[w.id],
                s && s.call(m)
            }),
            t.once("mina.stop." + w.id, function() {
                delete m.anims[w.id]
            }),
            m
        }
        ;
        var T = {};
        d.data = function(e, n) {
            var r = T[this.id] = T[this.id] || {};
            if (0 == arguments.length)
                return t("snap.data.get." + this.id, this, r, null ),
                r;
            if (1 == arguments.length) {
                if (i.is(e, "object")) {
                    for (var s in e)
                        e[y](s) && this.data(s, e[s]);
                    return this
                }
                return t("snap.data.get." + this.id, this, r[e], e),
                r[e]
            }
            return r[e] = n,
            t("snap.data.set." + this.id, this, n, e),
            this
        }
        ,
        d.removeData = function(e) {
            return null  == e ? T[this.id] = {} : T[this.id] && delete T[this.id][e],
            this
        }
        ,
        d.outerSVG = d.toString = h(1),
        d.innerSVG = h(),
        d.toDataURL = function() {
            if (e && e.btoa) {
                var t = this.getBBox()
                  , n = i.format('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{width}" height="{height}" viewBox="{x} {y} {width} {height}">{contents}</svg>', {
                    x: +t.x.toFixed(3),
                    y: +t.y.toFixed(3),
                    width: +t.width.toFixed(3),
                    height: +t.height.toFixed(3),
                    contents: this.outerSVG()
                });
                return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(n)))
            }
        }
        ,
        o.prototype.select = d.select,
        o.prototype.selectAll = d.selectAll
    }),
    i.plugin(function(e) {
        function t(e, t, i, r, s, a) {
            return null  == t && "[object SVGMatrix]" == n.call(e) ? (this.a = e.a,
            this.b = e.b,
            this.c = e.c,
            this.d = e.d,
            this.e = e.e,
            void (this.f = e.f)) : void (null  != e ? (this.a = +e,
            this.b = +t,
            this.c = +i,
            this.d = +r,
            this.e = +s,
            this.f = +a) : (this.a = 1,
            this.b = 0,
            this.c = 0,
            this.d = 1,
            this.e = 0,
            this.f = 0))
        }
        var n = Object.prototype.toString
          , i = String
          , r = Math
          , s = "";
        !function(n) {
            function a(e) {
                return e[0] * e[0] + e[1] * e[1]
            }
            function o(e) {
                var t = r.sqrt(a(e));
                e[0] && (e[0] /= t),
                e[1] && (e[1] /= t)
            }
            n.add = function(e, n, i, r, s, a) {
                var o, l, u, c, h = [[], [], []], d = [[this.a, this.c, this.e], [this.b, this.d, this.f], [0, 0, 1]], p = [[e, i, s], [n, r, a], [0, 0, 1]];
                for (e && e instanceof t && (p = [[e.a, e.c, e.e], [e.b, e.d, e.f], [0, 0, 1]]),
                o = 0; 3 > o; o++)
                    for (l = 0; 3 > l; l++) {
                        for (c = 0,
                        u = 0; 3 > u; u++)
                            c += d[o][u] * p[u][l];
                        h[o][l] = c
                    }
                return this.a = h[0][0],
                this.b = h[1][0],
                this.c = h[0][1],
                this.d = h[1][1],
                this.e = h[0][2],
                this.f = h[1][2],
                this
            }
            ,
            n.invert = function() {
                var e = this
                  , n = e.a * e.d - e.b * e.c;
                return new t(e.d / n,-e.b / n,-e.c / n,e.a / n,(e.c * e.f - e.d * e.e) / n,(e.b * e.e - e.a * e.f) / n)
            }
            ,
            n.clone = function() {
                return new t(this.a,this.b,this.c,this.d,this.e,this.f)
            }
            ,
            n.translate = function(e, t) {
                return this.add(1, 0, 0, 1, e, t)
            }
            ,
            n.scale = function(e, t, n, i) {
                return null  == t && (t = e),
                (n || i) && this.add(1, 0, 0, 1, n, i),
                this.add(e, 0, 0, t, 0, 0),
                (n || i) && this.add(1, 0, 0, 1, -n, -i),
                this
            }
            ,
            n.rotate = function(t, n, i) {
                t = e.rad(t),
                n = n || 0,
                i = i || 0;
                var s = +r.cos(t).toFixed(9)
                  , a = +r.sin(t).toFixed(9);
                return this.add(s, a, -a, s, n, i),
                this.add(1, 0, 0, 1, -n, -i)
            }
            ,
            n.x = function(e, t) {
                return e * this.a + t * this.c + this.e
            }
            ,
            n.y = function(e, t) {
                return e * this.b + t * this.d + this.f
            }
            ,
            n.get = function(e) {
                return +this[i.fromCharCode(97 + e)].toFixed(4)
            }
            ,
            n.toString = function() {
                return "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")"
            }
            ,
            n.offset = function() {
                return [this.e.toFixed(4), this.f.toFixed(4)]
            }
            ,
            n.determinant = function() {
                return this.a * this.d - this.b * this.c
            }
            ,
            n.split = function() {
                var t = {};
                t.dx = this.e,
                t.dy = this.f;
                var n = [[this.a, this.c], [this.b, this.d]];
                t.scalex = r.sqrt(a(n[0])),
                o(n[0]),
                t.shear = n[0][0] * n[1][0] + n[0][1] * n[1][1],
                n[1] = [n[1][0] - n[0][0] * t.shear, n[1][1] - n[0][1] * t.shear],
                t.scaley = r.sqrt(a(n[1])),
                o(n[1]),
                t.shear /= t.scaley,
                this.determinant() < 0 && (t.scalex = -t.scalex);
                var i = -n[0][1]
                  , s = n[1][1];
                return 0 > s ? (t.rotate = e.deg(r.acos(s)),
                0 > i && (t.rotate = 360 - t.rotate)) : t.rotate = e.deg(r.asin(i)),
                t.isSimple = !(+t.shear.toFixed(9) || t.scalex.toFixed(9) != t.scaley.toFixed(9) && t.rotate),
                t.isSuperSimple = !+t.shear.toFixed(9) && t.scalex.toFixed(9) == t.scaley.toFixed(9) && !t.rotate,
                t.noRotation = !+t.shear.toFixed(9) && !t.rotate,
                t
            }
            ,
            n.toTransformString = function(e) {
                var t = e || this.split();
                return +t.shear.toFixed(9) ? "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)] : (t.scalex = +t.scalex.toFixed(4),
                t.scaley = +t.scaley.toFixed(4),
                t.rotate = +t.rotate.toFixed(4),
                (t.dx || t.dy ? "t" + [+t.dx.toFixed(4), +t.dy.toFixed(4)] : s) + (1 != t.scalex || 1 != t.scaley ? "s" + [t.scalex, t.scaley, 0, 0] : s) + (t.rotate ? "r" + [+t.rotate.toFixed(4), 0, 0] : s))
            }
        }(t.prototype),
        e.Matrix = t,
        e.matrix = function(e, n, i, r, s, a) {
            return new t(e,n,i,r,s,a)
        }
    }),
    i.plugin(function(e, n, i, r, s) {
        function a(i) {
            return function(r) {
                if (t.stop(),
                r instanceof s && 1 == r.node.childNodes.length && ("radialGradient" == r.node.firstChild.tagName || "linearGradient" == r.node.firstChild.tagName || "pattern" == r.node.firstChild.tagName) && (r = r.node.firstChild,
                p(this).appendChild(r),
                r = h(r)),
                r instanceof n)
                    if ("radialGradient" == r.type || "linearGradient" == r.type || "pattern" == r.type) {
                        r.node.id || g(r.node, {
                            id: r.id
                        });
                        var a = m(r.node.id)
                    } else
                        a = r.attr(i);
                else if (a = e.color(r),
                a.error) {
                    var o = e(p(this).ownerSVGElement).gradient(r);
                    o ? (o.node.id || g(o.node, {
                        id: o.id
                    }),
                    a = m(o.node.id)) : a = r
                } else
                    a = v(a);
                var l = {};
                l[i] = a,
                g(this.node, l),
                this.node.style[i] = y
            }
        }
        function o(e) {
            t.stop(),
            e == +e && (e += "px"),
            this.node.style.fontSize = e
        }
        function l(e) {
            for (var t = [], n = e.childNodes, i = 0, r = n.length; r > i; i++) {
                var s = n[i];
                3 == s.nodeType && t.push(s.nodeValue),
                "tspan" == s.tagName && t.push(1 == s.childNodes.length && 3 == s.firstChild.nodeType ? s.firstChild.nodeValue : l(s))
            }
            return t
        }
        function u() {
            return t.stop(),
            this.node.style.fontSize
        }
        var c = e._.make
          , h = e._.wrap
          , d = e.is
          , p = e._.getSomeDefs
          , f = /^url\(#?([^)]+)\)$/
          , g = e._.$
          , m = e.url
          , v = String
          , _ = e._.separator
          , y = "";
        t.on("snap.util.attr.mask", function(e) {
            if (e instanceof n || e instanceof s) {
                if (t.stop(),
                e instanceof s && 1 == e.node.childNodes.length && (e = e.node.firstChild,
                p(this).appendChild(e),
                e = h(e)),
                "mask" == e.type)
                    var i = e;
                else
                    i = c("mask", p(this)),
                    i.node.appendChild(e.node);
                !i.node.id && g(i.node, {
                    id: i.id
                }),
                g(this.node, {
                    mask: m(i.id)
                })
            }
        }),
        function(e) {
            t.on("snap.util.attr.clip", e),
            t.on("snap.util.attr.clip-path", e),
            t.on("snap.util.attr.clipPath", e)
        }(function(e) {
            if (e instanceof n || e instanceof s) {
                if (t.stop(),
                "clipPath" == e.type)
                    var i = e;
                else
                    i = c("clipPath", p(this)),
                    i.node.appendChild(e.node),
                    !i.node.id && g(i.node, {
                        id: i.id
                    });
                g(this.node, {
                    "clip-path": m(i.node.id || i.id)
                })
            }
        }),
        t.on("snap.util.attr.fill", a("fill")),
        t.on("snap.util.attr.stroke", a("stroke"));
        var b = /^([lr])(?:\(([^)]*)\))?(.*)$/i;
        t.on("snap.util.grad.parse", function(e) {
            e = v(e);
            var t = e.match(b);
            if (!t)
                return null ;
            var n = t[1]
              , i = t[2]
              , r = t[3];
            return i = i.split(/\s*,\s*/).map(function(e) {
                return +e == e ? +e : e
            }),
            1 == i.length && 0 == i[0] && (i = []),
            r = r.split("-"),
            r = r.map(function(e) {
                e = e.split(":");
                var t = {
                    color: e[0]
                };
                return e[1] && (t.offset = parseFloat(e[1])),
                t
            }),
            {
                type: n,
                params: i,
                stops: r
            }
        }),
        t.on("snap.util.attr.d", function(n) {
            t.stop(),
            d(n, "array") && d(n[0], "array") && (n = e.path.toString.call(n)),
            n = v(n),
            n.match(/[ruo]/i) && (n = e.path.toAbsolute(n)),
            g(this.node, {
                d: n
            })
        })(-1),
        t.on("snap.util.attr.#text", function(e) {
            t.stop(),
            e = v(e);
            for (var n = r.doc.createTextNode(e); this.node.firstChild; )
                this.node.removeChild(this.node.firstChild);
            this.node.appendChild(n)
        })(-1),
        t.on("snap.util.attr.path", function(e) {
            t.stop(),
            this.attr({
                d: e
            })
        })(-1),
        t.on("snap.util.attr.class", function(e) {
            t.stop(),
            this.node.className.baseVal = e
        })(-1),
        t.on("snap.util.attr.viewBox", function(e) {
            var n;
            n = d(e, "object") && "x" in e ? [e.x, e.y, e.width, e.height].join(" ") : d(e, "array") ? e.join(" ") : e,
            g(this.node, {
                viewBox: n
            }),
            t.stop()
        })(-1),
        t.on("snap.util.attr.transform", function(e) {
            this.transform(e),
            t.stop()
        })(-1),
        t.on("snap.util.attr.r", function(e) {
            "rect" == this.type && (t.stop(),
            g(this.node, {
                rx: e,
                ry: e
            }))
        })(-1),
        t.on("snap.util.attr.textpath", function(e) {
            if (t.stop(),
            "text" == this.type) {
                var i, r, s;
                if (!e && this.textPath) {
                    for (r = this.textPath; r.node.firstChild; )
                        this.node.appendChild(r.node.firstChild);
                    return r.remove(),
                    void delete this.textPath
                }
                if (d(e, "string")) {
                    var a = p(this)
                      , o = h(a.parentNode).path(e);
                    a.appendChild(o.node),
                    i = o.id,
                    o.attr({
                        id: i
                    })
                } else
                    e = h(e),
                    e instanceof n && (i = e.attr("id"),
                    i || (i = e.id,
                    e.attr({
                        id: i
                    })));
                if (i)
                    if (r = this.textPath,
                    s = this.node,
                    r)
                        r.attr({
                            "xlink:href": "#" + i
                        });
                    else {
                        for (r = g("textPath", {
                            "xlink:href": "#" + i
                        }); s.firstChild; )
                            r.appendChild(s.firstChild);
                        s.appendChild(r),
                        this.textPath = h(r)
                    }
            }
        })(-1),
        t.on("snap.util.attr.text", function(e) {
            if ("text" == this.type) {
                for (var n = this.node, i = function(e) {
                    var t = g("tspan");
                    if (d(e, "array"))
                        for (var n = 0; n < e.length; n++)
                            t.appendChild(i(e[n]));
                    else
                        t.appendChild(r.doc.createTextNode(e));
                    return t.normalize && t.normalize(),
                    t
                }
                ; n.firstChild; )
                    n.removeChild(n.firstChild);
                for (var s = i(e); s.firstChild; )
                    n.appendChild(s.firstChild)
            }
            t.stop()
        })(-1),
        t.on("snap.util.attr.fontSize", o)(-1),
        t.on("snap.util.attr.font-size", o)(-1),
        t.on("snap.util.getattr.transform", function() {
            return t.stop(),
            this.transform()
        })(-1),
        t.on("snap.util.getattr.textpath", function() {
            return t.stop(),
            this.textPath
        })(-1),
        function() {
            function n(n) {
                return function() {
                    t.stop();
                    var i = r.doc.defaultView.getComputedStyle(this.node, null ).getPropertyValue("marker-" + n);
                    return "none" == i ? i : e(r.doc.getElementById(i.match(f)[1]))
                }
            }
            function i(e) {
                return function(n) {
                    t.stop();
                    var i = "marker" + e.charAt(0).toUpperCase() + e.substring(1);
                    if ("" == n || !n)
                        return void (this.node.style[i] = "none");
                    if ("marker" == n.type) {
                        var r = n.node.id;
                        return r || g(n.node, {
                            id: n.id
                        }),
                        void (this.node.style[i] = m(r))
                    }
                }
            }
            t.on("snap.util.getattr.marker-end", n("end"))(-1),
            t.on("snap.util.getattr.markerEnd", n("end"))(-1),
            t.on("snap.util.getattr.marker-start", n("start"))(-1),
            t.on("snap.util.getattr.markerStart", n("start"))(-1),
            t.on("snap.util.getattr.marker-mid", n("mid"))(-1),
            t.on("snap.util.getattr.markerMid", n("mid"))(-1),
            t.on("snap.util.attr.marker-end", i("end"))(-1),
            t.on("snap.util.attr.markerEnd", i("end"))(-1),
            t.on("snap.util.attr.marker-start", i("start"))(-1),
            t.on("snap.util.attr.markerStart", i("start"))(-1),
            t.on("snap.util.attr.marker-mid", i("mid"))(-1),
            t.on("snap.util.attr.markerMid", i("mid"))(-1)
        }(),
        t.on("snap.util.getattr.r", function() {
            return "rect" == this.type && g(this.node, "rx") == g(this.node, "ry") ? (t.stop(),
            g(this.node, "rx")) : void 0
        })(-1),
        t.on("snap.util.getattr.text", function() {
            if ("text" == this.type || "tspan" == this.type) {
                t.stop();
                var e = l(this.node);
                return 1 == e.length ? e[0] : e
            }
        })(-1),
        t.on("snap.util.getattr.#text", function() {
            return this.node.textContent
        })(-1),
        t.on("snap.util.getattr.viewBox", function() {
            t.stop();
            var n = g(this.node, "viewBox");
            return n ? (n = n.split(_),
            e._.box(+n[0], +n[1], +n[2], +n[3])) : void 0
        })(-1),
        t.on("snap.util.getattr.points", function() {
            var e = g(this.node, "points");
            return t.stop(),
            e ? e.split(_) : void 0
        })(-1),
        t.on("snap.util.getattr.path", function() {
            var e = g(this.node, "d");
            return t.stop(),
            e
        })(-1),
        t.on("snap.util.getattr.class", function() {
            return this.node.className.baseVal
        })(-1),
        t.on("snap.util.getattr.fontSize", u)(-1),
        t.on("snap.util.getattr.font-size", u)(-1)
    }),
    i.plugin(function(e, t) {
        var n = /\S+/g
          , i = String
          , r = t.prototype;
        r.addClass = function(e) {
            var t, r, s, a, o = i(e || "").match(n) || [], l = this.node, u = l.className.baseVal, c = u.match(n) || [];
            if (o.length) {
                for (t = 0; s = o[t++]; )
                    r = c.indexOf(s),
                    ~r || c.push(s);
                a = c.join(" "),
                u != a && (l.className.baseVal = a)
            }
            return this
        }
        ,
        r.removeClass = function(e) {
            var t, r, s, a, o = i(e || "").match(n) || [], l = this.node, u = l.className.baseVal, c = u.match(n) || [];
            if (c.length) {
                for (t = 0; s = o[t++]; )
                    r = c.indexOf(s),
                    ~r && c.splice(r, 1);
                a = c.join(" "),
                u != a && (l.className.baseVal = a)
            }
            return this
        }
        ,
        r.hasClass = function(e) {
            var t = this.node
              , i = t.className.baseVal
              , r = i.match(n) || [];
            return !!~r.indexOf(e)
        }
        ,
        r.toggleClass = function(e, t) {
            if (null  != t)
                return t ? this.addClass(e) : this.removeClass(e);
            var i, r, s, a, o = (e || "").match(n) || [], l = this.node, u = l.className.baseVal, c = u.match(n) || [];
            for (i = 0; s = o[i++]; )
                r = c.indexOf(s),
                ~r ? c.splice(r, 1) : c.push(s);
            return a = c.join(" "),
            u != a && (l.className.baseVal = a),
            this
        }
    }),
    i.plugin(function() {
        function e(e) {
            return e
        }
        function n(e) {
            return function(t) {
                return +t.toFixed(3) + e
            }
        }
        var i = {
            "+": function(e, t) {
                return e + t
            },
            "-": function(e, t) {
                return e - t
            },
            "/": function(e, t) {
                return e / t
            },
            "*": function(e, t) {
                return e * t
            }
        }
          , r = String
          , s = /[a-z]+$/i
          , a = /^\s*([+\-\/*])\s*=\s*([\d.eE+\-]+)\s*([^\d\s]+)?\s*$/;
        t.on("snap.util.attr", function(e) {
            var n = r(e).match(a);
            if (n) {
                var o = t.nt()
                  , l = o.substring(o.lastIndexOf(".") + 1)
                  , u = this.attr(l)
                  , c = {};
                t.stop();
                var h = n[3] || ""
                  , d = u.match(s)
                  , p = i[n[1]];
                if (d && d == h ? e = p(parseFloat(u), +n[2]) : (u = this.asPX(l),
                e = p(this.asPX(l), this.asPX(l, n[2] + h))),
                isNaN(u) || isNaN(e))
                    return;
                c[l] = e,
                this.attr(c)
            }
        })(-10),
        t.on("snap.util.equal", function(o, l) {
            var u = r(this.attr(o) || "")
              , c = r(l).match(a);
            if (c) {
                t.stop();
                var h = c[3] || ""
                  , d = u.match(s)
                  , p = i[c[1]];
                return d && d == h ? {
                    from: parseFloat(u),
                    to: p(parseFloat(u), +c[2]),
                    f: n(d)
                } : (u = this.asPX(o),
                {
                    from: u,
                    to: p(u, this.asPX(o, c[2] + h)),
                    f: e
                })
            }
        })(-10)
    }),
    i.plugin(function(n, i, r, s) {
        var a = r.prototype
          , o = n.is;
        a.rect = function(e, t, n, i, r, s) {
            var a;
            return null  == s && (s = r),
            o(e, "object") && "[object Object]" == e ? a = e : null  != e && (a = {
                x: e,
                y: t,
                width: n,
                height: i
            },
            null  != r && (a.rx = r,
            a.ry = s)),
            this.el("rect", a)
        }
        ,
        a.circle = function(e, t, n) {
            var i;
            return o(e, "object") && "[object Object]" == e ? i = e : null  != e && (i = {
                cx: e,
                cy: t,
                r: n
            }),
            this.el("circle", i)
        }
        ;
        var l = function() {
            function e() {
                this.parentNode.removeChild(this)
            }
            return function(t, n) {
                var i = s.doc.createElement("img")
                  , r = s.doc.body;
                i.style.cssText = "position:absolute;left:-9999em;top:-9999em",
                i.onload = function() {
                    n.call(i),
                    i.onload = i.onerror = null ,
                    r.removeChild(i)
                }
                ,
                i.onerror = e,
                r.appendChild(i),
                i.src = t
            }
        }();
        a.image = function(e, t, i, r, s) {
            var a = this.el("image");
            if (o(e, "object") && "src" in e)
                a.attr(e);
            else if (null  != e) {
                var u = {
                    "xlink:href": e,
                    preserveAspectRatio: "none"
                };
                null  != t && null  != i && (u.x = t,
                u.y = i),
                null  != r && null  != s ? (u.width = r,
                u.height = s) : l(e, function() {
                    n._.$(a.node, {
                        width: this.offsetWidth,
                        height: this.offsetHeight
                    })
                }),
                n._.$(a.node, u)
            }
            return a
        }
        ,
        a.ellipse = function(e, t, n, i) {
            var r;
            return o(e, "object") && "[object Object]" == e ? r = e : null  != e && (r = {
                cx: e,
                cy: t,
                rx: n,
                ry: i
            }),
            this.el("ellipse", r)
        }
        ,
        a.path = function(e) {
            var t;
            return o(e, "object") && !o(e, "array") ? t = e : e && (t = {
                d: e
            }),
            this.el("path", t)
        }
        ,
        a.group = a.g = function(e) {
            var t = this.el("g");
            return 1 == arguments.length && e && !e.type ? t.attr(e) : arguments.length && t.add(Array.prototype.slice.call(arguments, 0)),
            t
        }
        ,
        a.svg = function(e, t, n, i, r, s, a, l) {
            var u = {};
            return o(e, "object") && null  == t ? u = e : (null  != e && (u.x = e),
            null  != t && (u.y = t),
            null  != n && (u.width = n),
            null  != i && (u.height = i),
            null  != r && null  != s && null  != a && null  != l && (u.viewBox = [r, s, a, l])),
            this.el("svg", u)
        }
        ,
        a.mask = function(e) {
            var t = this.el("mask");
            return 1 == arguments.length && e && !e.type ? t.attr(e) : arguments.length && t.add(Array.prototype.slice.call(arguments, 0)),
            t
        }
        ,
        a.ptrn = function(e, t, n, i, r, s, a, l) {
            if (o(e, "object"))
                var u = e;
            else
                u = {
                    patternUnits: "userSpaceOnUse"
                },
                e && (u.x = e),
                t && (u.y = t),
                null  != n && (u.width = n),
                null  != i && (u.height = i),
                u.viewBox = null  != r && null  != s && null  != a && null  != l ? [r, s, a, l] : [e || 0, t || 0, n || 0, i || 0];
            return this.el("pattern", u)
        }
        ,
        a.use = function(e) {
            return null  != e ? (e instanceof i && (e.attr("id") || e.attr({
                id: n._.id(e)
            }),
            e = e.attr("id")),
            "#" == String(e).charAt() && (e = e.substring(1)),
            this.el("use", {
                "xlink:href": "#" + e
            })) : i.prototype.use.call(this)
        }
        ,
        a.symbol = function(e, t, n, i) {
            var r = {};
            return null  != e && null  != t && null  != n && null  != i && (r.viewBox = [e, t, n, i]),
            this.el("symbol", r)
        }
        ,
        a.text = function(e, t, n) {
            var i = {};
            return o(e, "object") ? i = e : null  != e && (i = {
                x: e,
                y: t,
                text: n || ""
            }),
            this.el("text", i)
        }
        ,
        a.line = function(e, t, n, i) {
            var r = {};
            return o(e, "object") ? r = e : null  != e && (r = {
                x1: e,
                x2: n,
                y1: t,
                y2: i
            }),
            this.el("line", r)
        }
        ,
        a.polyline = function(e) {
            arguments.length > 1 && (e = Array.prototype.slice.call(arguments, 0));
            var t = {};
            return o(e, "object") && !o(e, "array") ? t = e : null  != e && (t = {
                points: e
            }),
            this.el("polyline", t)
        }
        ,
        a.polygon = function(e) {
            arguments.length > 1 && (e = Array.prototype.slice.call(arguments, 0));
            var t = {};
            return o(e, "object") && !o(e, "array") ? t = e : null  != e && (t = {
                points: e
            }),
            this.el("polygon", t)
        }
        ,
        function() {
            function i() {
                return this.selectAll("stop")
            }
            function r(e, t) {
                var i = c("stop")
                  , r = {
                    offset: +t + "%"
                };
                return e = n.color(e),
                r["stop-color"] = e.hex,
                e.opacity < 1 && (r["stop-opacity"] = e.opacity),
                c(i, r),
                this.node.appendChild(i),
                this
            }
            function s() {
                if ("linearGradient" == this.type) {
                    var e = c(this.node, "x1") || 0
                      , t = c(this.node, "x2") || 1
                      , i = c(this.node, "y1") || 0
                      , r = c(this.node, "y2") || 0;
                    return n._.box(e, i, math.abs(t - e), math.abs(r - i))
                }
                var s = this.node.cx || .5
                  , a = this.node.cy || .5
                  , o = this.node.r || 0;
                return n._.box(s - o, a - o, 2 * o, 2 * o)
            }
            function o(e, n) {
                function i(e, t) {
                    for (var n = (t - h) / (e - d), i = d; e > i; i++)
                        a[i].offset = +(+h + n * (i - d)).toFixed(2);
                    d = e,
                    h = t
                }
                var r, s = t("snap.util.grad.parse", null , n).firstDefined();
                if (!s)
                    return null ;
                s.params.unshift(e),
                r = "l" == s.type.toLowerCase() ? l.apply(0, s.params) : u.apply(0, s.params),
                s.type != s.type.toLowerCase() && c(r.node, {
                    gradientUnits: "userSpaceOnUse"
                });
                var a = s.stops
                  , o = a.length
                  , h = 0
                  , d = 0;
                o--;
                for (var p = 0; o > p; p++)
                    "offset" in a[p] && i(p, a[p].offset);
                for (a[o].offset = a[o].offset || 100,
                i(o, a[o].offset),
                p = 0; o >= p; p++) {
                    var f = a[p];
                    r.addStop(f.color, f.offset)
                }
                return r
            }
            function l(e, t, a, o, l) {
                var u = n._.make("linearGradient", e);
                return u.stops = i,
                u.addStop = r,
                u.getBBox = s,
                null  != t && c(u.node, {
                    x1: t,
                    y1: a,
                    x2: o,
                    y2: l
                }),
                u
            }
            function u(e, t, a, o, l, u) {
                var h = n._.make("radialGradient", e);
                return h.stops = i,
                h.addStop = r,
                h.getBBox = s,
                null  != t && c(h.node, {
                    cx: t,
                    cy: a,
                    r: o
                }),
                null  != l && null  != u && c(h.node, {
                    fx: l,
                    fy: u
                }),
                h
            }
            var c = n._.$;
            a.gradient = function(e) {
                return o(this.defs, e)
            }
            ,
            a.gradientLinear = function(e, t, n, i) {
                return l(this.defs, e, t, n, i)
            }
            ,
            a.gradientRadial = function(e, t, n, i, r) {
                return u(this.defs, e, t, n, i, r)
            }
            ,
            a.toString = function() {
                var e, t = this.node.ownerDocument, i = t.createDocumentFragment(), r = t.createElement("div"), s = this.node.cloneNode(!0);
                return i.appendChild(r),
                r.appendChild(s),
                n._.$(s, {
                    xmlns: "http://www.w3.org/2000/svg"
                }),
                e = r.innerHTML,
                i.removeChild(i.firstChild),
                e
            }
            ,
            a.toDataURL = function() {
                return e && e.btoa ? "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(this))) : void 0
            }
            ,
            a.clear = function() {
                for (var e, t = this.node.firstChild; t; )
                    e = t.nextSibling,
                    "defs" != t.tagName ? t.parentNode.removeChild(t) : a.clear.call({
                        node: t
                    }),
                    t = e
            }
        }()
    }),
    i.plugin(function(e, t) {
        function n(e) {
            var t = n.ps = n.ps || {};
            return t[e] ? t[e].sleep = 100 : t[e] = {
                sleep: 100
            },
            setTimeout(function() {
                for (var n in t)
                    t[L](n) && n != e && (t[n].sleep--,
                    !t[n].sleep && delete t[n])
            }),
            t[e]
        }
        function i(e, t, n, i) {
            return null  == e && (e = t = n = i = 0),
            null  == t && (t = e.y,
            n = e.width,
            i = e.height,
            e = e.x),
            {
                x: e,
                y: t,
                width: n,
                w: n,
                height: i,
                h: i,
                x2: e + n,
                y2: t + i,
                cx: e + n / 2,
                cy: t + i / 2,
                r1: B.min(n, i) / 2,
                r2: B.max(n, i) / 2,
                r0: B.sqrt(n * n + i * i) / 2,
                path: x(e, t, n, i),
                vb: [e, t, n, i].join(" ")
            }
        }
        function r() {
            return this.join(",").replace(R, "$1")
        }
        function s(e) {
            var t = I(e);
            return t.toString = r,
            t
        }
        function a(e, t, n, i, r, s, a, o, u) {
            return null  == u ? p(e, t, n, i, r, s, a, o) : l(e, t, n, i, r, s, a, o, f(e, t, n, i, r, s, a, o, u))
        }
        function o(n, i) {
            function r(e) {
                return +(+e).toFixed(3)
            }
            return e._.cacher(function(e, s, o) {
                e instanceof t && (e = e.attr("d")),
                e = O(e);
                for (var u, c, h, d, p, f = "", g = {}, m = 0, v = 0, _ = e.length; _ > v; v++) {
                    if (h = e[v],
                    "M" == h[0])
                        u = +h[1],
                        c = +h[2];
                    else {
                        if (d = a(u, c, h[1], h[2], h[3], h[4], h[5], h[6]),
                        m + d > s) {
                            if (i && !g.start) {
                                if (p = a(u, c, h[1], h[2], h[3], h[4], h[5], h[6], s - m),
                                f += ["C" + r(p.start.x), r(p.start.y), r(p.m.x), r(p.m.y), r(p.x), r(p.y)],
                                o)
                                    return f;
                                g.start = f,
                                f = ["M" + r(p.x), r(p.y) + "C" + r(p.n.x), r(p.n.y), r(p.end.x), r(p.end.y), r(h[5]), r(h[6])].join(),
                                m += d,
                                u = +h[5],
                                c = +h[6];
                                continue
                            }
                            if (!n && !i)
                                return p = a(u, c, h[1], h[2], h[3], h[4], h[5], h[6], s - m)
                        }
                        m += d,
                        u = +h[5],
                        c = +h[6]
                    }
                    f += h.shift() + h
                }
                return g.end = f,
                p = n ? m : i ? g : l(u, c, h[0], h[1], h[2], h[3], h[4], h[5], 1)
            }, null , e._.clone)
        }
        function l(e, t, n, i, r, s, a, o, l) {
            var u = 1 - l
              , c = z(u, 3)
              , h = z(u, 2)
              , d = l * l
              , p = d * l
              , f = c * e + 3 * h * l * n + 3 * u * l * l * r + p * a
              , g = c * t + 3 * h * l * i + 3 * u * l * l * s + p * o
              , m = e + 2 * l * (n - e) + d * (r - 2 * n + e)
              , v = t + 2 * l * (i - t) + d * (s - 2 * i + t)
              , _ = n + 2 * l * (r - n) + d * (a - 2 * r + n)
              , y = i + 2 * l * (s - i) + d * (o - 2 * s + i)
              , b = u * e + l * n
              , w = u * t + l * i
              , x = u * r + l * a
              , T = u * s + l * o
              , P = 90 - 180 * B.atan2(m - _, v - y) / F;
            return {
                x: f,
                y: g,
                m: {
                    x: m,
                    y: v
                },
                n: {
                    x: _,
                    y: y
                },
                start: {
                    x: b,
                    y: w
                },
                end: {
                    x: x,
                    y: T
                },
                alpha: P
            }
        }
        function u(t, n, r, s, a, o, l, u) {
            e.is(t, "array") || (t = [t, n, r, s, a, o, l, u]);
            var c = j.apply(null , t);
            return i(c.min.x, c.min.y, c.max.x - c.min.x, c.max.y - c.min.y)
        }
        function c(e, t, n) {
            return t >= e.x && t <= e.x + e.width && n >= e.y && n <= e.y + e.height
        }
        function h(e, t) {
            return e = i(e),
            t = i(t),
            c(t, e.x, e.y) || c(t, e.x2, e.y) || c(t, e.x, e.y2) || c(t, e.x2, e.y2) || c(e, t.x, t.y) || c(e, t.x2, t.y) || c(e, t.x, t.y2) || c(e, t.x2, t.y2) || (e.x < t.x2 && e.x > t.x || t.x < e.x2 && t.x > e.x) && (e.y < t.y2 && e.y > t.y || t.y < e.y2 && t.y > e.y)
        }
        function d(e, t, n, i, r) {
            var s = -3 * t + 9 * n - 9 * i + 3 * r
              , a = e * s + 6 * t - 12 * n + 6 * i;
            return e * a - 3 * t + 3 * n
        }
        function p(e, t, n, i, r, s, a, o, l) {
            null  == l && (l = 1),
            l = l > 1 ? 1 : 0 > l ? 0 : l;
            for (var u = l / 2, c = 12, h = [-.1252, .1252, -.3678, .3678, -.5873, .5873, -.7699, .7699, -.9041, .9041, -.9816, .9816], p = [.2491, .2491, .2335, .2335, .2032, .2032, .1601, .1601, .1069, .1069, .0472, .0472], f = 0, g = 0; c > g; g++) {
                var m = u * h[g] + u
                  , v = d(m, e, n, r, a)
                  , _ = d(m, t, i, s, o)
                  , y = v * v + _ * _;
                f += p[g] * B.sqrt(y)
            }
            return u * f
        }
        function f(e, t, n, i, r, s, a, o, l) {
            if (!(0 > l || p(e, t, n, i, r, s, a, o) < l)) {
                var u, c = 1, h = c / 2, d = c - h, f = .01;
                for (u = p(e, t, n, i, r, s, a, o, d); H(u - l) > f; )
                    h /= 2,
                    d += (l > u ? 1 : -1) * h,
                    u = p(e, t, n, i, r, s, a, o, d);
                return d
            }
        }
        function g(e, t, n, i, r, s, a, o) {
            if (!(q(e, n) < $(r, a) || $(e, n) > q(r, a) || q(t, i) < $(s, o) || $(t, i) > q(s, o))) {
                var l = (e * i - t * n) * (r - a) - (e - n) * (r * o - s * a)
                  , u = (e * i - t * n) * (s - o) - (t - i) * (r * o - s * a)
                  , c = (e - n) * (s - o) - (t - i) * (r - a);
                if (c) {
                    var h = l / c
                      , d = u / c
                      , p = +h.toFixed(2)
                      , f = +d.toFixed(2);
                    if (!(p < +$(e, n).toFixed(2) || p > +q(e, n).toFixed(2) || p < +$(r, a).toFixed(2) || p > +q(r, a).toFixed(2) || f < +$(t, i).toFixed(2) || f > +q(t, i).toFixed(2) || f < +$(s, o).toFixed(2) || f > +q(s, o).toFixed(2)))
                        return {
                            x: h,
                            y: d
                        }
                }
            }
        }
        function m(e, t, n) {
            var i = u(e)
              , r = u(t);
            if (!h(i, r))
                return n ? 0 : [];
            for (var s = p.apply(0, e), a = p.apply(0, t), o = ~~(s / 8), c = ~~(a / 8), d = [], f = [], m = {}, v = n ? 0 : [], _ = 0; o + 1 > _; _++) {
                var y = l.apply(0, e.concat(_ / o));
                d.push({
                    x: y.x,
                    y: y.y,
                    t: _ / o
                })
            }
            for (_ = 0; c + 1 > _; _++)
                y = l.apply(0, t.concat(_ / c)),
                f.push({
                    x: y.x,
                    y: y.y,
                    t: _ / c
                });
            for (_ = 0; o > _; _++)
                for (var b = 0; c > b; b++) {
                    var w = d[_]
                      , x = d[_ + 1]
                      , T = f[b]
                      , P = f[b + 1]
                      , S = H(x.x - w.x) < .001 ? "y" : "x"
                      , k = H(P.x - T.x) < .001 ? "y" : "x"
                      , A = g(w.x, w.y, x.x, x.y, T.x, T.y, P.x, P.y);
                    if (A) {
                        if (m[A.x.toFixed(4)] == A.y.toFixed(4))
                            continue;m[A.x.toFixed(4)] = A.y.toFixed(4);
                        var C = w.t + H((A[S] - w[S]) / (x[S] - w[S])) * (x.t - w.t)
                          , j = T.t + H((A[k] - T[k]) / (P[k] - T[k])) * (P.t - T.t);
                        C >= 0 && 1 >= C && j >= 0 && 1 >= j && (n ? v++ : v.push({
                            x: A.x,
                            y: A.y,
                            t1: C,
                            t2: j
                        }))
                    }
                }
            return v
        }
        function v(e, t) {
            return y(e, t)
        }
        function _(e, t) {
            return y(e, t, 1)
        }
        function y(e, t, n) {
            e = O(e),
            t = O(t);
            for (var i, r, s, a, o, l, u, c, h, d, p = n ? 0 : [], f = 0, g = e.length; g > f; f++) {
                var v = e[f];
                if ("M" == v[0])
                    i = o = v[1],
                    r = l = v[2];
                else {
                    "C" == v[0] ? (h = [i, r].concat(v.slice(1)),
                    i = h[6],
                    r = h[7]) : (h = [i, r, i, r, o, l, o, l],
                    i = o,
                    r = l);
                    for (var _ = 0, y = t.length; y > _; _++) {
                        var b = t[_];
                        if ("M" == b[0])
                            s = u = b[1],
                            a = c = b[2];
                        else {
                            "C" == b[0] ? (d = [s, a].concat(b.slice(1)),
                            s = d[6],
                            a = d[7]) : (d = [s, a, s, a, u, c, u, c],
                            s = u,
                            a = c);
                            var w = m(h, d, n);
                            if (n)
                                p += w;
                            else {
                                for (var x = 0, T = w.length; T > x; x++)
                                    w[x].segment1 = f,
                                    w[x].segment2 = _,
                                    w[x].bez1 = h,
                                    w[x].bez2 = d;
                                p = p.concat(w)
                            }
                        }
                    }
                }
            }
            return p
        }
        function b(e, t, n) {
            var i = w(e);
            return c(i, t, n) && 1 == y(e, [["M", t, n], ["H", i.x2 + 10]], 1) % 2
        }
        function w(e) {
            var t = n(e);
            if (t.bbox)
                return I(t.bbox);
            if (!e)
                return i();
            e = O(e);
            for (var r, s = 0, a = 0, o = [], l = [], u = 0, c = e.length; c > u; u++)
                if (r = e[u],
                "M" == r[0])
                    s = r[1],
                    a = r[2],
                    o.push(s),
                    l.push(a);
                else {
                    var h = j(s, a, r[1], r[2], r[3], r[4], r[5], r[6]);
                    o = o.concat(h.min.x, h.max.x),
                    l = l.concat(h.min.y, h.max.y),
                    s = r[5],
                    a = r[6]
                }
            var d = $.apply(0, o)
              , p = $.apply(0, l)
              , f = q.apply(0, o)
              , g = q.apply(0, l)
              , m = i(d, p, f - d, g - p);
            return t.bbox = I(m),
            m
        }
        function x(e, t, n, i, s) {
            if (s)
                return [["M", +e + +s, t], ["l", n - 2 * s, 0], ["a", s, s, 0, 0, 1, s, s], ["l", 0, i - 2 * s], ["a", s, s, 0, 0, 1, -s, s], ["l", 2 * s - n, 0], ["a", s, s, 0, 0, 1, -s, -s], ["l", 0, 2 * s - i], ["a", s, s, 0, 0, 1, s, -s], ["z"]];
            var a = [["M", e, t], ["l", n, 0], ["l", 0, i], ["l", -n, 0], ["z"]];
            return a.toString = r,
            a
        }
        function T(e, t, n, i, s) {
            if (null  == s && null  == i && (i = n),
            e = +e,
            t = +t,
            n = +n,
            i = +i,
            null  != s)
                var a = Math.PI / 180
                  , o = e + n * Math.cos(-i * a)
                  , l = e + n * Math.cos(-s * a)
                  , u = t + n * Math.sin(-i * a)
                  , c = t + n * Math.sin(-s * a)
                  , h = [["M", o, u], ["A", n, n, 0, +(s - i > 180), 0, l, c]];
            else
                h = [["M", e, t], ["m", 0, -i], ["a", n, i, 0, 1, 1, 0, 2 * i], ["a", n, i, 0, 1, 1, 0, -2 * i], ["z"]];
            return h.toString = r,
            h
        }
        function P(t) {
            var i = n(t)
              , a = String.prototype.toLowerCase;
            if (i.rel)
                return s(i.rel);
            e.is(t, "array") && e.is(t && t[0], "array") || (t = e.parsePathString(t));
            var o = []
              , l = 0
              , u = 0
              , c = 0
              , h = 0
              , d = 0;
            "M" == t[0][0] && (l = t[0][1],
            u = t[0][2],
            c = l,
            h = u,
            d++,
            o.push(["M", l, u]));
            for (var p = d, f = t.length; f > p; p++) {
                var g = o[p] = []
                  , m = t[p];
                if (m[0] != a.call(m[0]))
                    switch (g[0] = a.call(m[0]),
                    g[0]) {
                    case "a":
                        g[1] = m[1],
                        g[2] = m[2],
                        g[3] = m[3],
                        g[4] = m[4],
                        g[5] = m[5],
                        g[6] = +(m[6] - l).toFixed(3),
                        g[7] = +(m[7] - u).toFixed(3);
                        break;
                    case "v":
                        g[1] = +(m[1] - u).toFixed(3);
                        break;
                    case "m":
                        c = m[1],
                        h = m[2];
                    default:
                        for (var v = 1, _ = m.length; _ > v; v++)
                            g[v] = +(m[v] - (v % 2 ? l : u)).toFixed(3)
                    }
                else {
                    g = o[p] = [],
                    "m" == m[0] && (c = m[1] + l,
                    h = m[2] + u);
                    for (var y = 0, b = m.length; b > y; y++)
                        o[p][y] = m[y]
                }
                var w = o[p].length;
                switch (o[p][0]) {
                case "z":
                    l = c,
                    u = h;
                    break;
                case "h":
                    l += +o[p][w - 1];
                    break;
                case "v":
                    u += +o[p][w - 1];
                    break;
                default:
                    l += +o[p][w - 2],
                    u += +o[p][w - 1]
                }
            }
            return o.toString = r,
            i.rel = s(o),
            o
        }
        function S(t) {
            var i = n(t);
            if (i.abs)
                return s(i.abs);
            if (N(t, "array") && N(t && t[0], "array") || (t = e.parsePathString(t)),
            !t || !t.length)
                return [["M", 0, 0]];
            var a, o = [], l = 0, u = 0, c = 0, h = 0, d = 0;
            "M" == t[0][0] && (l = +t[0][1],
            u = +t[0][2],
            c = l,
            h = u,
            d++,
            o[0] = ["M", l, u]);
            for (var p, f, g = 3 == t.length && "M" == t[0][0] && "R" == t[1][0].toUpperCase() && "Z" == t[2][0].toUpperCase(), m = d, v = t.length; v > m; m++) {
                if (o.push(p = []),
                f = t[m],
                a = f[0],
                a != a.toUpperCase())
                    switch (p[0] = a.toUpperCase(),
                    p[0]) {
                    case "A":
                        p[1] = f[1],
                        p[2] = f[2],
                        p[3] = f[3],
                        p[4] = f[4],
                        p[5] = f[5],
                        p[6] = +f[6] + l,
                        p[7] = +f[7] + u;
                        break;
                    case "V":
                        p[1] = +f[1] + u;
                        break;
                    case "H":
                        p[1] = +f[1] + l;
                        break;
                    case "R":
                        for (var _ = [l, u].concat(f.slice(1)), y = 2, b = _.length; b > y; y++)
                            _[y] = +_[y] + l,
                            _[++y] = +_[y] + u;
                        o.pop(),
                        o = o.concat(E(_, g));
                        break;
                    case "O":
                        o.pop(),
                        _ = T(l, u, f[1], f[2]),
                        _.push(_[0]),
                        o = o.concat(_);
                        break;
                    case "U":
                        o.pop(),
                        o = o.concat(T(l, u, f[1], f[2], f[3])),
                        p = ["U"].concat(o[o.length - 1].slice(-2));
                        break;
                    case "M":
                        c = +f[1] + l,
                        h = +f[2] + u;
                    default:
                        for (y = 1,
                        b = f.length; b > y; y++)
                            p[y] = +f[y] + (y % 2 ? l : u)
                    }
                else if ("R" == a)
                    _ = [l, u].concat(f.slice(1)),
                    o.pop(),
                    o = o.concat(E(_, g)),
                    p = ["R"].concat(f.slice(-2));
                else if ("O" == a)
                    o.pop(),
                    _ = T(l, u, f[1], f[2]),
                    _.push(_[0]),
                    o = o.concat(_);
                else if ("U" == a)
                    o.pop(),
                    o = o.concat(T(l, u, f[1], f[2], f[3])),
                    p = ["U"].concat(o[o.length - 1].slice(-2));
                else
                    for (var w = 0, x = f.length; x > w; w++)
                        p[w] = f[w];
                if (a = a.toUpperCase(),
                "O" != a)
                    switch (p[0]) {
                    case "Z":
                        l = +c,
                        u = +h;
                        break;
                    case "H":
                        l = p[1];
                        break;
                    case "V":
                        u = p[1];
                        break;
                    case "M":
                        c = p[p.length - 2],
                        h = p[p.length - 1];
                    default:
                        l = p[p.length - 2],
                        u = p[p.length - 1]
                    }
            }
            return o.toString = r,
            i.abs = s(o),
            o
        }
        function k(e, t, n, i) {
            return [e, t, n, i, n, i]
        }
        function A(e, t, n, i, r, s) {
            var a = 1 / 3
              , o = 2 / 3;
            return [a * e + o * n, a * t + o * i, a * r + o * n, a * s + o * i, r, s]
        }
        function C(t, n, i, r, s, a, o, l, u, c) {
            var h, d = 120 * F / 180, p = F / 180 * (+s || 0), f = [], g = e._.cacher(function(e, t, n) {
                var i = e * B.cos(n) - t * B.sin(n)
                  , r = e * B.sin(n) + t * B.cos(n);
                return {
                    x: i,
                    y: r
                }
            });
            if (c)
                P = c[0],
                S = c[1],
                x = c[2],
                T = c[3];
            else {
                h = g(t, n, -p),
                t = h.x,
                n = h.y,
                h = g(l, u, -p),
                l = h.x,
                u = h.y;
                var m = (B.cos(F / 180 * s),
                B.sin(F / 180 * s),
                (t - l) / 2)
                  , v = (n - u) / 2
                  , _ = m * m / (i * i) + v * v / (r * r);
                _ > 1 && (_ = B.sqrt(_),
                i = _ * i,
                r = _ * r);
                var y = i * i
                  , b = r * r
                  , w = (a == o ? -1 : 1) * B.sqrt(H((y * b - y * v * v - b * m * m) / (y * v * v + b * m * m)))
                  , x = w * i * v / r + (t + l) / 2
                  , T = w * -r * m / i + (n + u) / 2
                  , P = B.asin(((n - T) / r).toFixed(9))
                  , S = B.asin(((u - T) / r).toFixed(9));
                P = x > t ? F - P : P,
                S = x > l ? F - S : S,
                0 > P && (P = 2 * F + P),
                0 > S && (S = 2 * F + S),
                o && P > S && (P -= 2 * F),
                !o && S > P && (S -= 2 * F)
            }
            var k = S - P;
            if (H(k) > d) {
                var A = S
                  , j = l
                  , O = u;
                S = P + d * (o && S > P ? 1 : -1),
                l = x + i * B.cos(S),
                u = T + r * B.sin(S),
                f = C(l, u, i, r, s, 0, o, j, O, [S, A, x, T])
            }
            k = S - P;
            var M = B.cos(P)
              , E = B.sin(P)
              , D = B.cos(S)
              , N = B.sin(S)
              , I = B.tan(k / 4)
              , L = 4 / 3 * i * I
              , R = 4 / 3 * r * I
              , V = [t, n]
              , $ = [t + L * E, n - R * M]
              , q = [l + L * N, u - R * D]
              , z = [l, u];
            if ($[0] = 2 * V[0] - $[0],
            $[1] = 2 * V[1] - $[1],
            c)
                return [$, q, z].concat(f);
            f = [$, q, z].concat(f).join().split(",");
            for (var U = [], G = 0, X = f.length; X > G; G++)
                U[G] = G % 2 ? g(f[G - 1], f[G], p).y : g(f[G], f[G + 1], p).x;
            return U
        }
        function j(e, t, n, i, r, s, a, o) {
            for (var l, u, c, h, d, p, f, g, m = [], v = [[], []], _ = 0; 2 > _; ++_)
                if (0 == _ ? (u = 6 * e - 12 * n + 6 * r,
                l = -3 * e + 9 * n - 9 * r + 3 * a,
                c = 3 * n - 3 * e) : (u = 6 * t - 12 * i + 6 * s,
                l = -3 * t + 9 * i - 9 * s + 3 * o,
                c = 3 * i - 3 * t),
                H(l) < 1e-12) {
                    if (H(u) < 1e-12)
                        continue;h = -c / u,
                    h > 0 && 1 > h && m.push(h)
                } else
                    f = u * u - 4 * c * l,
                    g = B.sqrt(f),
                    0 > f || (d = (-u + g) / (2 * l),
                    d > 0 && 1 > d && m.push(d),
                    p = (-u - g) / (2 * l),
                    p > 0 && 1 > p && m.push(p));
            for (var y, b = m.length, w = b; b--; )
                h = m[b],
                y = 1 - h,
                v[0][b] = y * y * y * e + 3 * y * y * h * n + 3 * y * h * h * r + h * h * h * a,
                v[1][b] = y * y * y * t + 3 * y * y * h * i + 3 * y * h * h * s + h * h * h * o;
            return v[0][w] = e,
            v[1][w] = t,
            v[0][w + 1] = a,
            v[1][w + 1] = o,
            v[0].length = v[1].length = w + 2,
            {
                min: {
                    x: $.apply(0, v[0]),
                    y: $.apply(0, v[1])
                },
                max: {
                    x: q.apply(0, v[0]),
                    y: q.apply(0, v[1])
                }
            }
        }
        function O(e, t) {
            var i = !t && n(e);
            if (!t && i.curve)
                return s(i.curve);
            for (var r = S(e), a = t && S(t), o = {
                x: 0,
                y: 0,
                bx: 0,
                by: 0,
                X: 0,
                Y: 0,
                qx: null ,
                qy: null 
            }, l = {
                x: 0,
                y: 0,
                bx: 0,
                by: 0,
                X: 0,
                Y: 0,
                qx: null ,
                qy: null 
            }, u = (function(e, t, n) {
                var i, r;
                if (!e)
                    return ["C", t.x, t.y, t.x, t.y, t.x, t.y];
                switch (!(e[0] in {
                    T: 1,
                    Q: 1
                }) && (t.qx = t.qy = null ),
                e[0]) {
                case "M":
                    t.X = e[1],
                    t.Y = e[2];
                    break;
                case "A":
                    e = ["C"].concat(C.apply(0, [t.x, t.y].concat(e.slice(1))));
                    break;
                case "S":
                    "C" == n || "S" == n ? (i = 2 * t.x - t.bx,
                    r = 2 * t.y - t.by) : (i = t.x,
                    r = t.y),
                    e = ["C", i, r].concat(e.slice(1));
                    break;
                case "T":
                    "Q" == n || "T" == n ? (t.qx = 2 * t.x - t.qx,
                    t.qy = 2 * t.y - t.qy) : (t.qx = t.x,
                    t.qy = t.y),
                    e = ["C"].concat(A(t.x, t.y, t.qx, t.qy, e[1], e[2]));
                    break;
                case "Q":
                    t.qx = e[1],
                    t.qy = e[2],
                    e = ["C"].concat(A(t.x, t.y, e[1], e[2], e[3], e[4]));
                    break;
                case "L":
                    e = ["C"].concat(k(t.x, t.y, e[1], e[2]));
                    break;
                case "H":
                    e = ["C"].concat(k(t.x, t.y, e[1], t.y));
                    break;
                case "V":
                    e = ["C"].concat(k(t.x, t.y, t.x, e[1]));
                    break;
                case "Z":
                    e = ["C"].concat(k(t.x, t.y, t.X, t.Y))
                }
                return e
            }
            ), c = function(e, t) {
                if (e[t].length > 7) {
                    e[t].shift();
                    for (var n = e[t]; n.length; )
                        d[t] = "A",
                        a && (p[t] = "A"),
                        e.splice(t++, 0, ["C"].concat(n.splice(0, 6)));
                    e.splice(t, 1),
                    v = q(r.length, a && a.length || 0)
                }
            }
            , h = function(e, t, n, i, s) {
                e && t && "M" == e[s][0] && "M" != t[s][0] && (t.splice(s, 0, ["M", i.x, i.y]),
                n.bx = 0,
                n.by = 0,
                n.x = e[s][1],
                n.y = e[s][2],
                v = q(r.length, a && a.length || 0))
            }
            , d = [], p = [], f = "", g = "", m = 0, v = q(r.length, a && a.length || 0); v > m; m++) {
                r[m] && (f = r[m][0]),
                "C" != f && (d[m] = f,
                m && (g = d[m - 1])),
                r[m] = u(r[m], o, g),
                "A" != d[m] && "C" == f && (d[m] = "C"),
                c(r, m),
                a && (a[m] && (f = a[m][0]),
                "C" != f && (p[m] = f,
                m && (g = p[m - 1])),
                a[m] = u(a[m], l, g),
                "A" != p[m] && "C" == f && (p[m] = "C"),
                c(a, m)),
                h(r, a, o, l, m),
                h(a, r, l, o, m);
                var _ = r[m]
                  , y = a && a[m]
                  , b = _.length
                  , w = a && y.length;
                o.x = _[b - 2],
                o.y = _[b - 1],
                o.bx = V(_[b - 4]) || o.x,
                o.by = V(_[b - 3]) || o.y,
                l.bx = a && (V(y[w - 4]) || l.x),
                l.by = a && (V(y[w - 3]) || l.y),
                l.x = a && y[w - 2],
                l.y = a && y[w - 1]
            }
            return a || (i.curve = s(r)),
            a ? [r, a] : r
        }
        function M(e, t) {
            if (!t)
                return e;
            var n, i, r, s, a, o, l;
            for (e = O(e),
            r = 0,
            a = e.length; a > r; r++)
                for (l = e[r],
                s = 1,
                o = l.length; o > s; s += 2)
                    n = t.x(l[s], l[s + 1]),
                    i = t.y(l[s], l[s + 1]),
                    l[s] = n,
                    l[s + 1] = i;
            return e
        }
        function E(e, t) {
            for (var n = [], i = 0, r = e.length; r - 2 * !t > i; i += 2) {
                var s = [{
                    x: +e[i - 2],
                    y: +e[i - 1]
                }, {
                    x: +e[i],
                    y: +e[i + 1]
                }, {
                    x: +e[i + 2],
                    y: +e[i + 3]
                }, {
                    x: +e[i + 4],
                    y: +e[i + 5]
                }];
                t ? i ? r - 4 == i ? s[3] = {
                    x: +e[0],
                    y: +e[1]
                } : r - 2 == i && (s[2] = {
                    x: +e[0],
                    y: +e[1]
                },
                s[3] = {
                    x: +e[2],
                    y: +e[3]
                }) : s[0] = {
                    x: +e[r - 2],
                    y: +e[r - 1]
                } : r - 4 == i ? s[3] = s[2] : i || (s[0] = {
                    x: +e[i],
                    y: +e[i + 1]
                }),
                n.push(["C", (-s[0].x + 6 * s[1].x + s[2].x) / 6, (-s[0].y + 6 * s[1].y + s[2].y) / 6, (s[1].x + 6 * s[2].x - s[3].x) / 6, (s[1].y + 6 * s[2].y - s[3].y) / 6, s[2].x, s[2].y])
            }
            return n
        }
        var D = t.prototype
          , N = e.is
          , I = e._.clone
          , L = "hasOwnProperty"
          , R = /,?([a-z]),?/gi
          , V = parseFloat
          , B = Math
          , F = B.PI
          , $ = B.min
          , q = B.max
          , z = B.pow
          , H = B.abs
          , U = o(1)
          , G = o()
          , X = o(0, 1)
          , W = e._unit2px
          , Y = {
            path: function(e) {
                return e.attr("path")
            },
            circle: function(e) {
                var t = W(e);
                return T(t.cx, t.cy, t.r)
            },
            ellipse: function(e) {
                var t = W(e);
                return T(t.cx || 0, t.cy || 0, t.rx, t.ry)
            },
            rect: function(e) {
                var t = W(e);
                return x(t.x || 0, t.y || 0, t.width, t.height, t.rx, t.ry)
            },
            image: function(e) {
                var t = W(e);
                return x(t.x || 0, t.y || 0, t.width, t.height)
            },
            line: function(e) {
                return "M" + [e.attr("x1") || 0, e.attr("y1") || 0, e.attr("x2"), e.attr("y2")]
            },
            polyline: function(e) {
                return "M" + e.attr("points")
            },
            polygon: function(e) {
                return "M" + e.attr("points") + "z"
            },
            deflt: function(e) {
                var t = e.node.getBBox();
                return x(t.x, t.y, t.width, t.height)
            }
        };
        e.path = n,
        e.path.getTotalLength = U,
        e.path.getPointAtLength = G,
        e.path.getSubpath = function(e, t, n) {
            if (this.getTotalLength(e) - n < 1e-6)
                return X(e, t).end;
            var i = X(e, n, 1);
            return t ? X(i, t).end : i
        }
        ,
        D.getTotalLength = function() {
            return this.node.getTotalLength ? this.node.getTotalLength() : void 0
        }
        ,
        D.getPointAtLength = function(e) {
            return G(this.attr("d"), e)
        }
        ,
        D.getSubpath = function(t, n) {
            return e.path.getSubpath(this.attr("d"), t, n)
        }
        ,
        e._.box = i,
        e.path.findDotsAtSegment = l,
        e.path.bezierBBox = u,
        e.path.isPointInsideBBox = c,
        e.closest = function(t, n, r, s) {
            for (var a = 100, o = i(t - a / 2, n - a / 2, a, a), l = [], u = r[0].hasOwnProperty("x") ? function(e) {
                return {
                    x: r[e].x,
                    y: r[e].y
                }
            }
             : function(e) {
                return {
                    x: r[e],
                    y: s[e]
                }
            }
            , h = 0; 1e6 >= a && !h; ) {
                for (var d = 0, p = r.length; p > d; d++) {
                    var f = u(d);
                    if (c(o, f.x, f.y)) {
                        h++,
                        l.push(f);
                        break
                    }
                }
                h || (a *= 2,
                o = i(t - a / 2, n - a / 2, a, a))
            }
            if (1e6 != a) {
                var g, m = 1 / 0;
                for (d = 0,
                p = l.length; p > d; d++) {
                    var v = e.len(t, n, l[d].x, l[d].y);
                    m > v && (m = v,
                    l[d].len = v,
                    g = l[d])
                }
                return g
            }
        }
        ,
        e.path.isBBoxIntersect = h,
        e.path.intersection = v,
        e.path.intersectionNumber = _,
        e.path.isPointInside = b,
        e.path.getBBox = w,
        e.path.get = Y,
        e.path.toRelative = P,
        e.path.toAbsolute = S,
        e.path.toCubic = O,
        e.path.map = M,
        e.path.toString = r,
        e.path.clone = s
    }),
    i.plugin(function(e) {
        var i = Math.max
          , r = Math.min
          , s = function(e) {
            if (this.items = [],
            this.bindings = {},
            this.length = 0,
            this.type = "set",
            e)
                for (var t = 0, n = e.length; n > t; t++)
                    e[t] && (this[this.items.length] = this.items[this.items.length] = e[t],
                    this.length++)
        }
          , a = s.prototype;
        a.push = function() {
            for (var e, t, n = 0, i = arguments.length; i > n; n++)
                e = arguments[n],
                e && (t = this.items.length,
                this[t] = this.items[t] = e,
                this.length++);
            return this
        }
        ,
        a.pop = function() {
            return this.length && delete this[this.length--],
            this.items.pop()
        }
        ,
        a.forEach = function(e, t) {
            for (var n = 0, i = this.items.length; i > n; n++)
                if (e.call(t, this.items[n], n) === !1)
                    return this;
            return this
        }
        ,
        a.animate = function(i, r, s, a) {
            "function" != typeof s || s.length || (a = s,
            s = n.linear),
            i instanceof e._.Animation && (a = i.callback,
            s = i.easing,
            r = s.dur,
            i = i.attr);
            var o = arguments;
            if (e.is(i, "array") && e.is(o[o.length - 1], "array"))
                var l = !0;
            var u, c = function() {
                u ? this.b = u : u = this.b
            }
            , h = 0, d = this, p = a && function() {
                ++h == d.length && a.call(this)
            }
            ;
            return this.forEach(function(e, n) {
                t.once("snap.animcreated." + e.id, c),
                l ? o[n] && e.animate.apply(e, o[n]) : e.animate(i, r, s, p)
            })
        }
        ,
        a.remove = function() {
            for (; this.length; )
                this.pop().remove();
            return this
        }
        ,
        a.bind = function(e, t, n) {
            var i = {};
            if ("function" == typeof t)
                this.bindings[e] = t;
            else {
                var r = n || e;
                this.bindings[e] = function(e) {
                    i[r] = e,
                    t.attr(i)
                }
            }
            return this
        }
        ,
        a.attr = function(e) {
            var t = {};
            for (var n in e)
                this.bindings[n] ? this.bindings[n](e[n]) : t[n] = e[n];
            for (var i = 0, r = this.items.length; r > i; i++)
                this.items[i].attr(t);
            return this
        }
        ,
        a.clear = function() {
            for (; this.length; )
                this.pop()
        }
        ,
        a.splice = function(e, t) {
            e = 0 > e ? i(this.length + e, 0) : e,
            t = i(0, r(this.length - e, t));
            var n, a = [], o = [], l = [];
            for (n = 2; n < arguments.length; n++)
                l.push(arguments[n]);
            for (n = 0; t > n; n++)
                o.push(this[e + n]);
            for (; n < this.length - e; n++)
                a.push(this[e + n]);
            var u = l.length;
            for (n = 0; n < u + a.length; n++)
                this.items[e + n] = this[e + n] = u > n ? l[n] : a[n - u];
            for (n = this.items.length = this.length -= t - u; this[n]; )
                delete this[n++];
            return new s(o)
        }
        ,
        a.exclude = function(e) {
            for (var t = 0, n = this.length; n > t; t++)
                if (this[t] == e)
                    return this.splice(t, 1),
                    !0;
            return !1
        }
        ,
        a.insertAfter = function(e) {
            for (var t = this.items.length; t--; )
                this.items[t].insertAfter(e);
            return this
        }
        ,
        a.getBBox = function() {
            for (var e = [], t = [], n = [], s = [], a = this.items.length; a--; )
                if (!this.items[a].removed) {
                    var o = this.items[a].getBBox();
                    e.push(o.x),
                    t.push(o.y),
                    n.push(o.x + o.width),
                    s.push(o.y + o.height)
                }
            return e = r.apply(0, e),
            t = r.apply(0, t),
            n = i.apply(0, n),
            s = i.apply(0, s),
            {
                x: e,
                y: t,
                x2: n,
                y2: s,
                width: n - e,
                height: s - t,
                cx: e + (n - e) / 2,
                cy: t + (s - t) / 2
            }
        }
        ,
        a.clone = function(e) {
            e = new s;
            for (var t = 0, n = this.items.length; n > t; t++)
                e.push(this.items[t].clone());
            return e
        }
        ,
        a.toString = function() {
            return "Snap‘s set"
        }
        ,
        a.type = "set",
        e.Set = s,
        e.set = function() {
            var e = new s;
            return arguments.length && e.push.apply(e, Array.prototype.slice.call(arguments, 0)),
            e
        }
    }),
    i.plugin(function(e, n) {
        function i(e) {
            var t = e[0];
            switch (t.toLowerCase()) {
            case "t":
                return [t, 0, 0];
            case "m":
                return [t, 1, 0, 0, 1, 0, 0];
            case "r":
                return 4 == e.length ? [t, 0, e[2], e[3]] : [t, 0];
            case "s":
                return 5 == e.length ? [t, 1, 1, e[3], e[4]] : 3 == e.length ? [t, 1, 1] : [t, 1]
            }
        }
        function r(t, n, r) {
            n = g(n).replace(/\.{3}|\u2026/g, t),
            t = e.parseTransformString(t) || [],
            n = e.parseTransformString(n) || [];
            for (var s, a, o, l, h = Math.max(t.length, n.length), d = [], p = [], f = 0; h > f; f++) {
                if (o = t[f] || i(n[f]),
                l = n[f] || i(o),
                o[0] != l[0] || "r" == o[0].toLowerCase() && (o[2] != l[2] || o[3] != l[3]) || "s" == o[0].toLowerCase() && (o[3] != l[3] || o[4] != l[4])) {
                    t = e._.transform2matrix(t, r()),
                    n = e._.transform2matrix(n, r()),
                    d = [["m", t.a, t.b, t.c, t.d, t.e, t.f]],
                    p = [["m", n.a, n.b, n.c, n.d, n.e, n.f]];
                    break
                }
                for (d[f] = [],
                p[f] = [],
                s = 0,
                a = Math.max(o.length, l.length); a > s; s++)
                    s in o && (d[f][s] = o[s]),
                    s in l && (p[f][s] = l[s])
            }
            return {
                from: c(d),
                to: c(p),
                f: u(d)
            }
        }
        function s(e) {
            return e
        }
        function a(e) {
            return function(t) {
                return +t.toFixed(3) + e
            }
        }
        function o(e) {
            return e.join(" ")
        }
        function l(t) {
            return e.rgb(t[0], t[1], t[2])
        }
        function u(e) {
            var t, n, i, r, s, a, o = 0, l = [];
            for (t = 0,
            n = e.length; n > t; t++) {
                for (s = "[",
                a = ['"' + e[t][0] + '"'],
                i = 1,
                r = e[t].length; r > i; i++)
                    a[i] = "val[" + o++ + "]";
                s += a + "]",
                l[t] = s
            }
            return Function("val", "return Snap.path.toString.call([" + l + "])")
        }
        function c(e) {
            for (var t = [], n = 0, i = e.length; i > n; n++)
                for (var r = 1, s = e[n].length; s > r; r++)
                    t.push(e[n][r]);
            return t
        }
        function h(e) {
            return isFinite(parseFloat(e))
        }
        function d(t, n) {
            return e.is(t, "array") && e.is(n, "array") ? t.toString() == n.toString() : !1
        }
        var p = {}
          , f = /[a-z]+$/i
          , g = String;
        p.stroke = p.fill = "colour",
        n.prototype.equal = function(e, n) {
            return t("snap.util.equal", this, e, n).firstDefined()
        }
        ,
        t.on("snap.util.equal", function(t, n) {
            var i, m, v = g(this.attr(t) || ""), _ = this;
            if (h(v) && h(n))
                return {
                    from: parseFloat(v),
                    to: parseFloat(n),
                    f: s
                };
            if ("colour" == p[t])
                return i = e.color(v),
                m = e.color(n),
                {
                    from: [i.r, i.g, i.b, i.opacity],
                    to: [m.r, m.g, m.b, m.opacity],
                    f: l
                };
            if ("viewBox" == t)
                return i = this.attr(t).vb.split(" ").map(Number),
                m = n.split(" ").map(Number),
                {
                    from: i,
                    to: m,
                    f: o
                };
            if ("transform" == t || "gradientTransform" == t || "patternTransform" == t)
                return n instanceof e.Matrix && (n = n.toTransformString()),
                e._.rgTransform.test(n) || (n = e._.svgTransform2string(n)),
                r(v, n, function() {
                    return _.getBBox(1)
                });
            if ("d" == t || "path" == t)
                return i = e.path.toCubic(v, n),
                {
                    from: c(i[0]),
                    to: c(i[1]),
                    f: u(i[0])
                };
            if ("points" == t)
                return i = g(v).split(e._.separator),
                m = g(n).split(e._.separator),
                {
                    from: i,
                    to: m,
                    f: function(e) {
                        return e
                    }
                };
            var y = v.match(f)
              , b = g(n).match(f);
            return y && d(y, b) ? {
                from: parseFloat(v),
                to: parseFloat(n),
                f: a(y)
            } : {
                from: this.asPX(t),
                to: this.asPX(t, n),
                f: s
            }
        })
    }),
    i.plugin(function(e, n, i, r) {
        for (var s = n.prototype, a = "hasOwnProperty", o = ("createTouch" in r.doc), l = ["click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "touchstart", "touchmove", "touchend", "touchcancel"], u = {
            mousedown: "touchstart",
            mousemove: "touchmove",
            mouseup: "touchend"
        }, c = (function(e, t) {
            var n = "y" == e ? "scrollTop" : "scrollLeft"
              , i = t && t.node ? t.node.ownerDocument : r.doc;
            return i[n in i.documentElement ? "documentElement" : "body"][n]
        }
        ), h = function() {
            return this.originalEvent.preventDefault()
        }
        , d = function() {
            return this.originalEvent.stopPropagation()
        }
        , p = function(e, t, n, i) {
            var r = o && u[t] ? u[t] : t
              , s = function(r) {
                var s = c("y", i)
                  , l = c("x", i);
                if (o && u[a](t))
                    for (var p = 0, f = r.targetTouches && r.targetTouches.length; f > p; p++)
                        if (r.targetTouches[p].target == e || e.contains(r.targetTouches[p].target)) {
                            var g = r;
                            r = r.targetTouches[p],
                            r.originalEvent = g,
                            r.preventDefault = h,
                            r.stopPropagation = d;
                            break
                        }
                var m = r.clientX + l
                  , v = r.clientY + s;
                return n.call(i, r, m, v)
            }
            ;
            return t !== r && e.addEventListener(t, s, !1),
            e.addEventListener(r, s, !1),
            function() {
                return t !== r && e.removeEventListener(t, s, !1),
                e.removeEventListener(r, s, !1),
                !0
            }
        }
        , f = [], g = function(e) {
            for (var n, i = e.clientX, r = e.clientY, s = c("y"), a = c("x"), l = f.length; l--; ) {
                if (n = f[l],
                o) {
                    for (var u, h = e.touches && e.touches.length; h--; )
                        if (u = e.touches[h],
                        u.identifier == n.el._drag.id || n.el.node.contains(u.target)) {
                            i = u.clientX,
                            r = u.clientY,
                            (e.originalEvent ? e.originalEvent : e).preventDefault();
                            break
                        }
                } else
                    e.preventDefault();
                var d = n.el.node;
                d.nextSibling,
                d.parentNode,
                d.style.display,
                i += a,
                r += s,
                t("snap.drag.move." + n.el.id, n.move_scope || n.el, i - n.el._drag.x, r - n.el._drag.y, i, r, e)
            }
        }
        , m = function(n) {
            e.unmousemove(g).unmouseup(m);
            for (var i, r = f.length; r--; )
                i = f[r],
                i.el._drag = {},
                t("snap.drag.end." + i.el.id, i.end_scope || i.start_scope || i.move_scope || i.el, n),
                t.off("snap.drag.*." + i.el.id);
            f = []
        }
        , v = l.length; v--; )
            !function(t) {
                e[t] = s[t] = function(n, i) {
                    if (e.is(n, "function"))
                        this.events = this.events || [],
                        this.events.push({
                            name: t,
                            f: n,
                            unbind: p(this.node || document, t, n, i || this)
                        });
                    else
                        for (var r = 0, s = this.events.length; s > r; r++)
                            if (this.events[r].name == t)
                                try {
                                    this.events[r].f.call(this)
                                } catch (a) {}
                    return this
                }
                ,
                e["un" + t] = s["un" + t] = function(e) {
                    for (var n = this.events || [], i = n.length; i--; )
                        if (n[i].name == t && (n[i].f == e || !e))
                            return n[i].unbind(),
                            n.splice(i, 1),
                            !n.length && delete this.events,
                            this;
                    return this
                }
            }(l[v]);
        s.hover = function(e, t, n, i) {
            return this.mouseover(e, n).mouseout(t, i || n)
        }
        ,
        s.unhover = function(e, t) {
            return this.unmouseover(e).unmouseout(t)
        }
        ;
        var _ = [];
        s.drag = function(n, i, r, s, a, o) {
            function l(l, u, h) {
                (l.originalEvent || l).preventDefault(),
                c._drag.x = u,
                c._drag.y = h,
                c._drag.id = l.identifier,
                !f.length && e.mousemove(g).mouseup(m),
                f.push({
                    el: c,
                    move_scope: s,
                    start_scope: a,
                    end_scope: o
                }),
                i && t.on("snap.drag.start." + c.id, i),
                n && t.on("snap.drag.move." + c.id, n),
                r && t.on("snap.drag.end." + c.id, r),
                t("snap.drag.start." + c.id, a || s || c, u, h, l)
            }
            function u(e, n, i) {
                t("snap.draginit." + c.id, c, e, n, i)
            }
            var c = this;
            if (!arguments.length) {
                var h;
                return c.drag(function(e, t) {
                    this.attr({
                        transform: h + (h ? "T" : "t") + [e, t]
                    })
                }, function() {
                    h = this.transform().local
                })
            }
            return t.on("snap.draginit." + c.id, l),
            c._drag = {},
            _.push({
                el: c,
                start: l,
                init: u
            }),
            c.mousedown(u),
            c
        }
        ,
        s.undrag = function() {
            for (var n = _.length; n--; )
                _[n].el == this && (this.unmousedown(_[n].init),
                _.splice(n, 1),
                t.unbind("snap.drag.*." + this.id),
                t.unbind("snap.draginit." + this.id));
            return !_.length && e.unmousemove(g).unmouseup(m),
            this
        }
    }),
    i.plugin(function(e, n, i) {
        var r = (n.prototype,
        i.prototype)
          , s = /^\s*url\((.+)\)/
          , a = String
          , o = e._.$;
        e.filter = {},
        r.filter = function(t) {
            var i = this;
            "svg" != i.type && (i = i.paper);
            var r = e.parse(a(t))
              , s = e._.id()
              , l = (i.node.offsetWidth,
            i.node.offsetHeight,
            o("filter"));
            return o(l, {
                id: s,
                filterUnits: "userSpaceOnUse"
            }),
            l.appendChild(r.node),
            i.defs.appendChild(l),
            new n(l)
        }
        ,
        t.on("snap.util.getattr.filter", function() {
            t.stop();
            var n = o(this.node, "filter");
            if (n) {
                var i = a(n).match(s);
                return i && e.select(i[1])
            }
        }),
        t.on("snap.util.attr.filter", function(i) {
            if (i instanceof n && "filter" == i.type) {
                t.stop();
                var r = i.node.id;
                r || (o(i.node, {
                    id: i.id
                }),
                r = i.id),
                o(this.node, {
                    filter: e.url(r)
                })
            }
            i && "none" != i || (t.stop(),
            this.node.removeAttribute("filter"))
        }),
        e.filter.blur = function(t, n) {
            null  == t && (t = 2);
            var i = null  == n ? t : [t, n];
            return e.format('<feGaussianBlur stdDeviation="{def}"/>', {
                def: i
            })
        }
        ,
        e.filter.blur.toString = function() {
            return this()
        }
        ,
        e.filter.shadow = function(t, n, i, r, s) {
            return "string" == typeof i && (r = i,
            s = r,
            i = 4),
            "string" != typeof r && (s = r,
            r = "#000"),
            r = r || "#000",
            null  == i && (i = 4),
            null  == s && (s = 1),
            null  == t && (t = 0,
            n = 2),
            null  == n && (n = t),
            r = e.color(r),
            e.format('<feGaussianBlur in="SourceAlpha" stdDeviation="{blur}"/><feOffset dx="{dx}" dy="{dy}" result="offsetblur"/><feFlood flood-color="{color}"/><feComposite in2="offsetblur" operator="in"/><feComponentTransfer><feFuncA type="linear" slope="{opacity}"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>', {
                color: r,
                dx: t,
                dy: n,
                blur: i,
                opacity: s
            })
        }
        ,
        e.filter.shadow.toString = function() {
            return this()
        }
        ,
        e.filter.grayscale = function(t) {
            return null  == t && (t = 1),
            e.format('<feColorMatrix type="matrix" values="{a} {b} {c} 0 0 {d} {e} {f} 0 0 {g} {b} {h} 0 0 0 0 0 1 0"/>', {
                a: .2126 + .7874 * (1 - t),
                b: .7152 - .7152 * (1 - t),
                c: .0722 - .0722 * (1 - t),
                d: .2126 - .2126 * (1 - t),
                e: .7152 + .2848 * (1 - t),
                f: .0722 - .0722 * (1 - t),
                g: .2126 - .2126 * (1 - t),
                h: .0722 + .9278 * (1 - t)
            })
        }
        ,
        e.filter.grayscale.toString = function() {
            return this()
        }
        ,
        e.filter.sepia = function(t) {
            return null  == t && (t = 1),
            e.format('<feColorMatrix type="matrix" values="{a} {b} {c} 0 0 {d} {e} {f} 0 0 {g} {h} {i} 0 0 0 0 0 1 0"/>', {
                a: .393 + .607 * (1 - t),
                b: .769 - .769 * (1 - t),
                c: .189 - .189 * (1 - t),
                d: .349 - .349 * (1 - t),
                e: .686 + .314 * (1 - t),
                f: .168 - .168 * (1 - t),
                g: .272 - .272 * (1 - t),
                h: .534 - .534 * (1 - t),
                i: .131 + .869 * (1 - t)
            })
        }
        ,
        e.filter.sepia.toString = function() {
            return this()
        }
        ,
        e.filter.saturate = function(t) {
            return null  == t && (t = 1),
            e.format('<feColorMatrix type="saturate" values="{amount}"/>', {
                amount: 1 - t
            })
        }
        ,
        e.filter.saturate.toString = function() {
            return this()
        }
        ,
        e.filter.hueRotate = function(t) {
            return t = t || 0,
            e.format('<feColorMatrix type="hueRotate" values="{angle}"/>', {
                angle: t
            })
        }
        ,
        e.filter.hueRotate.toString = function() {
            return this()
        }
        ,
        e.filter.invert = function(t) {
            return null  == t && (t = 1),
            e.format('<feComponentTransfer><feFuncR type="table" tableValues="{amount} {amount2}"/><feFuncG type="table" tableValues="{amount} {amount2}"/><feFuncB type="table" tableValues="{amount} {amount2}"/></feComponentTransfer>', {
                amount: t,
                amount2: 1 - t
            })
        }
        ,
        e.filter.invert.toString = function() {
            return this()
        }
        ,
        e.filter.brightness = function(t) {
            return null  == t && (t = 1),
            e.format('<feComponentTransfer><feFuncR type="linear" slope="{amount}"/><feFuncG type="linear" slope="{amount}"/><feFuncB type="linear" slope="{amount}"/></feComponentTransfer>', {
                amount: t
            })
        }
        ,
        e.filter.brightness.toString = function() {
            return this()
        }
        ,
        e.filter.contrast = function(t) {
            return null  == t && (t = 1),
            e.format('<feComponentTransfer><feFuncR type="linear" slope="{amount}" intercept="{amount2}"/><feFuncG type="linear" slope="{amount}" intercept="{amount2}"/><feFuncB type="linear" slope="{amount}" intercept="{amount2}"/></feComponentTransfer>', {
                amount: t,
                amount2: .5 - t / 2
            })
        }
        ,
        e.filter.contrast.toString = function() {
            return this()
        }
    }),
    i.plugin(function(e, t) {
        var n = e._.box
          , i = e.is
          , r = /^[^a-z]*([tbmlrc])/i
          , s = function() {
            return "T" + this.dx + "," + this.dy
        }
        ;
        t.prototype.getAlign = function(e, t) {
            null  == t && i(e, "string") && (t = e,
            e = null ),
            e = e || this.paper;
            var a = e.getBBox ? e.getBBox() : n(e)
              , o = this.getBBox()
              , l = {};
            switch (t = t && t.match(r),
            t = t ? t[1].toLowerCase() : "c") {
            case "t":
                l.dx = 0,
                l.dy = a.y - o.y;
                break;
            case "b":
                l.dx = 0,
                l.dy = a.y2 - o.y2;
                break;
            case "m":
                l.dx = 0,
                l.dy = a.cy - o.cy;
                break;
            case "l":
                l.dx = a.x - o.x,
                l.dy = 0;
                break;
            case "r":
                l.dx = a.x2 - o.x2,
                l.dy = 0;
                break;
            default:
                l.dx = a.cx - o.cx,
                l.dy = 0
            }
            return l.toString = s,
            l
        }
        ,
        t.prototype.align = function(e, t) {
            return this.transform("..." + this.getAlign(e, t))
        }
    }),
    i
});
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
    function e(e, t, n, i) {
        return n = parseFloat(n) - parseFloat(e),
        i = parseFloat(i) - parseFloat(t),
        Math.sqrt(n * n + i * i)
    }
    function t(e) {
        return "string" != typeof e && e.nodeType || (e = _gsScope.TweenLite.selector(e),
        e.length && (e = e[0])),
        e
    }
    function n(e, t, n) {
        var i, r, s = e.indexOf(" ");
        return -1 === s ? (i = void 0 !== n ? n + "" : e,
        r = e) : (i = e.substr(0, s),
        r = e.substr(s + 1)),
        i = -1 !== i.indexOf("%") ? parseFloat(i) / 100 * t : parseFloat(i),
        r = -1 !== r.indexOf("%") ? parseFloat(r) / 100 * t : parseFloat(r),
        i > r ? [r, i] : [i, r]
    }
    function i(n) {
        if (!n)
            return 0;
        n = t(n);
        var i, r, s, a, o, l, u, c, h = n.tagName.toLowerCase();
        if ("path" === h)
            o = n.style.strokeDasharray,
            n.style.strokeDasharray = "none",
            i = n.getTotalLength() || 0,
            n.style.strokeDasharray = o;
        else if ("rect" === h)
            r = n.getBBox(),
            i = 2 * (r.width + r.height);
        else if ("circle" === h)
            i = 2 * Math.PI * parseFloat(n.getAttribute("r"));
        else if ("line" === h)
            i = e(n.getAttribute("x1"), n.getAttribute("y1"), n.getAttribute("x2"), n.getAttribute("y2"));
        else if ("polyline" === h || "polygon" === h)
            for (s = n.getAttribute("points").split(" "),
            i = 0,
            o = s[0].split(","),
            "polygon" === h && (s.push(s[0]),
            -1 === s[0].indexOf(",") && s.push(s[1])),
            l = 1; s.length > l; l++)
                a = s[l].split(","),
                1 === a.length && (a[1] = s[l++]),
                2 === a.length && (i += e(o[0], o[1], a[0], a[1]) || 0,
                o = a);
        else
            "ellipse" === h && (u = parseFloat(n.getAttribute("rx")),
            c = parseFloat(n.getAttribute("ry")),
            i = Math.PI * (3 * (u + c) - Math.sqrt((3 * u + c) * (u + 3 * c))));
        return i || 0
    }
    function r(e, n) {
        if (!e)
            return [0, 0];
        e = t(e),
        n = n || i(e) + 1;
        var r = a(e)
          , s = r.strokeDasharray || ""
          , o = parseFloat(r.strokeDashoffset)
          , l = s.indexOf(",");
        return 0 > l && (l = s.indexOf(" ")),
        s = 0 > l ? n : parseFloat(s.substr(0, l)) || 1e-5,
        s > n && (s = n),
        [Math.max(0, -o), s - o]
    }
    var s, a = document.defaultView ? document.defaultView.getComputedStyle : function() {}
    ;
    s = _gsScope._gsDefine.plugin({
        propName: "drawSVG",
        API: 2,
        version: "0.0.5",
        global: !0,
        overwriteProps: ["drawSVG"],
        init: function(e, t) {
            if (!e.getBBox)
                return !1;
            var s, a, o, l = i(e) + 1;
            return this._style = e.style,
            t === !0 || "true" === t ? t = "0 100%" : t ? -1 === (t + "").indexOf(" ") && (t = "0 " + t) : t = "0 0",
            s = r(e, l),
            a = n(t, l, s[0]),
            this._length = l + 10,
            0 === s[0] && 0 === a[0] ? (o = Math.max(1e-5, a[1] - l),
            this._dash = l + o,
            this._offset = l - s[1] + o,
            this._addTween(this, "_offset", this._offset, l - a[1] + o, "drawSVG")) : (this._dash = s[1] - s[0] || 1e-6,
            this._offset = -s[0],
            this._addTween(this, "_dash", this._dash, a[1] - a[0] || 1e-5, "drawSVG"),
            this._addTween(this, "_offset", this._offset, -a[0], "drawSVG")),
            !0
        },
        set: function(e) {
            this._firstPT && (this._super.setRatio.call(this, e),
            this._style.strokeDashoffset = this._offset,
            this._style.strokeDasharray = (1 === e || 0 === e) && .001 > this._offset && 10 >= this._length - this._dash ? "none" : this._dash + "px," + this._length + "px")
        }
    }),
    s.getLength = i,
    s.getPosition = r
}),
_gsScope._gsDefine && _gsScope._gsQueue.pop()(),
define("tween_svg_plugin", function() {}),
define("tpl!templates/chunks/zenCircle", [], function() {
    return function(obj) {
        var __p = "";
        with (Array.prototype.join,
        obj || {})
            __p += '<div class="init-btn">\n    <svg class="circles-svg"></svg>\n    <svg class="pause-svg"></svg>\n    <svg class="triangle-svg"></svg>\n</div>';
        return __p
    }
}),
define("view/ZenBaseView", ["require", "jquery", "backbone", "tween_easing", "TweenMax", "TimelineMax", "Snap", "tween_svg_plugin", "underscore", "tpl!templates/chunks/zenCircle"], function(e) {
    var t = e("jquery")
      , n = e("backbone")
      , i = (e("tween_easing"),
    e("TweenMax"))
      , r = e("TimelineMax")
      , s = e("Snap")
      , a = (e("tween_svg_plugin"),
    e("underscore"));
    return n.View.extend({
        template: e("tpl!templates/chunks/zenCircle")({}),
        events: {},
        initialize: function() {
            this.$el.append(this.template)
        },
        _drawCircles: function() {
            var e = 400
              , n = 80
              , r = "white";
            t(this.circlesContainer).width(e + "px"),
            t(this.circlesContainer).width(e + "px");
            var s = e / 2
              , o = this.circlesSVG.circle(s, s, n)
              , l = this.circlesSVG.circle(s, s, n)
              , u = this.circlesSVG.circle(s, s, n)
              , c = this.circlesSVG.circle(s, s, n)
              , h = this.circlesSVG.circle(s, s, n)
              , d = this.circlesSVG.circle(s, s, n)
              , p = this.circlesSVG.circle(s, s, n)
              , f = this.circlesSVG.circle(s, s, n)
              , g = [o, l, u, c]
              , m = [h, d, p, f];
            a.each(g, function(e, t) {
                e.attr({
                    id: "circle" + t,
                    "class": "circle",
                    fill: "transparent",
                    stroke: r,
                    strokeWidth: .7
                })
            }),
            a.each(m, function(e, t) {
                e.attr({
                    id: "circleO" + t,
                    "class": "circle-over",
                    fill: "transparent",
                    stroke: r,
                    strokeWidth: 1
                })
            }),
            h.transform("r5,200,200"),
            d.transform("r179,200,200"),
            p.transform("r89,200,200"),
            f.transform("r-89,200,200"),
            this.circles = this.$(".circle"),
            this.circlesOver = this.$(".circle-over"),
            i.set(this.circlesOver, {
                opacity: 0
            })
        },
        _drawPlayButton: function(e) {
            this.triangle = e.polygon(2, 3, 2, 38, 30, 20),
            this.triangle.attr({
                fill: "white",
                stroke: "blue"
            }),
            this.triangleOutline = e.polygon(2, 3, 2, 38, 30, 20),
            this.triangleOutline.attr({
                fill: "transparent",
                stroke: "#9d8752",
                strokeWidth: 3
            });
            var t = this.circlesSVG.filter(s.filter.blur(4, 3));
            this.rect = e.rect(0, 0, 0, 55),
            this.rect.attr({
                "class": "triangleFill",
                fill: "#9d8752",
                stroke: "#9d8752",
                filter: t,
                mask: this.triangle
            })
        },
        _drawPausebutton: function() {
            this.pauseRect1 = this.pauseSVG.rect(25, 55, 10, 36),
            this.pauseRect1.attr({
                "class": "pause-r1",
                fill: "#9d8752"
            }),
            this.pauseRect2 = this.pauseSVG.rect(45, 55, 10, 36),
            this.pauseRect2.attr({
                "class": "pause-r1",
                fill: "#9d8752"
            })
        },
        _setAnimationsPlaybutton: function() {
            this.circlEndState = 50,
            this._circleExpandSpeed = .41,
            this._circleContractSpeed = .6,
            this.fullSpin = new r({
                delay: 0,
                repeat: -1,
                repeatDelay: 0,
                yoyo: !1
            }),
            this.fullSpin.to(this.circlesContainer, 10, {
                rotation: 360,
                delay: 0,
                repeat: -1,
                repeatDelay: 0,
                yoyo: !1,
                ease: Power0.easeNone,
                force3D: !1
            }),
            this.fullSpin.pause()
        },
        _initLineanimations: function() {
            var e = this;
            App.env.has("mozilla") && "none" === this.$el.css("display") || (i.set(this.circlesOver, {
                drawSVG: "50% 50%",
                delay: 0,
                repeat: 0,
                ease: Power1.easeInOut
            }),
            i.staggerTo([this.circlesOver[0], this.circlesOver[1], this.circlesOver[2], this.circlesOver[3]], 1.5, {
                drawSVG: "100%",
                delay: 0,
                repeat: 0,
                ease: Power1.easeOut,
                onComplete: function() {
                    i.to([e.circlesOver[0], e.circlesOver[1], e.circlesOver[2], e.circlesOver[3]], 2.9, {
                        drawSVG: "50% 50%",
                        delay: .15,
                        repeat: -1,
                        repeatDelay: .8,
                        yoyo: !0,
                        ease: Power1.easeInOut
                    }),
                    i.to(e.circlesOver[1], 2.9, {
                        drawSVG: "50% 50%",
                        delay: .25,
                        repeat: -1,
                        repeatDelay: .8,
                        yoyo: !0,
                        ease: Power1.easeInOut
                    }),
                    i.to(e.circlesOver[2], 2.9, {
                        drawSVG: "50% 50%",
                        delay: .38,
                        repeat: -1,
                        repeatDelay: .8,
                        yoyo: !0,
                        ease: Power1.easeInOut
                    }),
                    i.to(e.circlesOver[3], 2.9, {
                        drawSVG: "50% 50%",
                        delay: .48,
                        repeat: -1,
                        repeatDelay: .8,
                        yoyo: !0,
                        ease: Power1.easeInOut
                    })
                }
            }, .12))
        },
        _stopLineAnimations: function() {
            i.killTweensOf(this.circlesOver),
            App.env.has("mozilla") && "none" === this.$el.css("display") || i.to(this.circlesOver, .6, {
                drawSVG: "100%",
                ease: Power1.easeInOut
            }),
            this.tl.play()
        },
        _playInOutSpinCircles: function() {
            var e = 48
              , t = .6;
            try {
                i.to([".custom-vjs-big-play-button"], .1, {
                    autoAlpha: 1,
                    delay: 0
                });
                var n = new r({
                    delay: 0,
                    repeat: 1,
                    repeatDelay: 0,
                    yoyo: !0
                });
                App.env.has("mozilla") && "none" === this.$el.css("display") ? n.add([i.to([this.circles[0], this.circlesOver[0]], t, {
                    xPercent: e
                }), i.to([this.circles[1], this.circlesOver[1]], t, {
                    xPercent: -e
                }), i.to([this.circles[2], this.circlesOver[2]], t, {
                    yPercent: e
                }), i.to([this.circles[3], this.circlesOver[3]], t, {
                    yPercent: -e
                })]) : n.add([i.to([this.circles[0], this.circlesOver[0]], t, {
                    xPercent: e
                }), i.to([this.circles[1], this.circlesOver[1]], t, {
                    xPercent: -e
                }), i.to([this.circles[2], this.circlesOver[2]], t, {
                    yPercent: e
                }), i.to([this.circles[3], this.circlesOver[3]], t, {
                    yPercent: -e
                }), i.staggerTo([this.circlesOver[0], this.circlesOver[1], this.circlesOver[2], this.circlesOver[3]], 1, {
                    drawSVG: "50% 50%"
                }, .1)]),
                n.pause();
                var s = 50
                  , o = 1
                  , l = 0
                  , u = 8;
                this.fullSpin = new r({
                    delay: 1,
                    repeat: 3,
                    repeatDelay: 0,
                    yoyo: !1
                }),
                this.fullSpin.to(this.circlesContainer, u, {
                    rotation: 360,
                    ease: Power0.easeNone,
                    force3D: !1
                }),
                this.fullSpin.seek(0),
                this.fullSpin.play(),
                i.from(".js-play-button", .6, {
                    autoAlpha: 1,
                    scale: 0,
                    transformOrigin: "50% 50%"
                }),
                i.fromTo([this.circles[0], this.circlesOver[0]], o, {
                    autoAlpha: 0
                }, {
                    autoAlpha: 1,
                    xPercent: s,
                    delay: l,
                    ease: Power1.easeInOut
                }),
                i.fromTo([this.circles[1], this.circlesOver[1]], o, {
                    autoAlpha: 0
                }, {
                    autoAlpha: 1,
                    xPercent: -s,
                    delay: l,
                    ease: Power1.easeInOut
                }),
                i.fromTo([this.circles[2], this.circlesOver[2]], o, {
                    autoAlpha: 0
                }, {
                    autoAlpha: 1,
                    yPercent: s,
                    delay: l,
                    ease: Power1.easeInOut
                }),
                i.fromTo([this.circles[3], this.circlesOver[3]], o, {
                    autoAlpha: 0
                }, {
                    autoAlpha: 1,
                    yPercent: -s,
                    delay: l,
                    ease: Power1.easeInOut
                }),
                n.seek(0),
                n.play(),
                setTimeout(a.bind(function() {
                    n.reverse(),
                    this.fullSpin.reverse(),
                    i.to([this.circles[0], this.circlesOver[0]], o, {
                        autoAlpha: 0,
                        xPercent: 0,
                        delay: l,
                        ease: Power1.easeInOut
                    }),
                    i.to([this.circles[1], this.circlesOver[1]], o, {
                        autoAlpha: 0,
                        xPercent: 0,
                        delay: l,
                        ease: Power1.easeInOut
                    }),
                    i.to([this.circles[2], this.circlesOver[2]], o, {
                        autoAlpha: 0,
                        yPercent: 0,
                        delay: l,
                        ease: Power1.easeInOut
                    }),
                    i.to([this.circles[3], this.circlesOver[3]], o, {
                        autoAlpha: 0,
                        yPercent: 0,
                        delay: l,
                        ease: Power1.easeInOut
                    }),
                    i.to(".js-play-button", .9, {
                        autoAlpha: 0,
                        scale: 0,
                        transformOrigin: "50% 50%"
                    }),
                    i.to([".custom-vjs-big-play-button"], .1, {
                        autoAlpha: 0,
                        delay: 1
                    })
                }, this), 850)
            } catch (c) {}
        },
        destroyAll: function() {
            this.triangle = null ,
            this.undelegateEvents(),
            t(this.el).removeData().unbind(),
            this.$el.html(""),
            this.$el.empty()
        }
    })
}),
define("view/ZenPreloaderView", ["require", "view/ZenBaseView"], function(e) {
    var t = e("view/ZenBaseView");
    return t.extend({
        displayPreloader: function() {
            _.bindAll(this, "killPreloader"),
            this.triangleSVG = Snap(".preloader .triangle-svg"),
            this.circlesContainer = $(".preloader .circles-svg"),
            this.circlesSVG = Snap(".preloader .circles-svg"),
            document.getElementsByClassName("preloader")[0];
            var e = 40
              , t = 50;
            this._drawCircles(),
            this._initState(),
            TweenMax.fromTo(this.circlesContainer, 1, {
                opacity: 0
            }, {
                opacity: 1
            }),
            TweenMax.to([this.circles[0], this.circlesOver[0]], 1, {
                xPercent: t,
                opacity: 1,
                ease: Power1.easeOut
            }),
            TweenMax.to([this.circles[1], this.circlesOver[1]], 1, {
                xPercent: -t,
                opacity: 1,
                ease: Power1.easeOut
            }),
            TweenMax.to([this.circles[2], this.circlesOver[2]], 1, {
                yPercent: t,
                opacity: 1,
                ease: Power1.easeOut
            }),
            TweenMax.to([this.circles[3], this.circlesOver[3]], 1, {
                yPercent: -t,
                opacity: 1,
                ease: Power1.easeOut
            }),
            TweenMax.set(this.circlesOver, {
                opacity: 1
            }),
            TweenMax.to(this.circlesOver[0], 2, {
                drawSVG: "50% 50%",
                delay: .1,
                repeat: -1,
                yoyo: !0
            }),
            TweenMax.to(this.circlesOver[1], 3, {
                drawSVG: "50% 50%",
                delay: .1,
                repeat: -1,
                yoyo: !0
            }),
            TweenMax.to(this.circlesOver[2], 2, {
                drawSVG: "50% 50%",
                delay: .1,
                repeat: -1,
                yoyo: !0
            }),
            TweenMax.to(this.circlesOver[3], 3, {
                drawSVG: "50% 50%",
                delay: .1,
                repeat: -1,
                yoyo: !0
            }),
            this.tl = new TimelineMax({
                delay: 1.2,
                repeat: -1,
                repeatDelay: 0,
                yoyo: !0
            }),
            this.tl.add([TweenMax.to([this.circles[0], this.circlesOver[0]], 3, {
                xPercent: e,
                ease: Power1.easeInOut
            }), TweenMax.to([this.circles[1], this.circlesOver[1]], 3, {
                xPercent: -e,
                ease: Power1.easeInOut
            }), TweenMax.to([this.circles[2], this.circlesOver[2]], 3, {
                yPercent: e,
                ease: Power1.easeInOut
            }), TweenMax.to([this.circles[3], this.circlesOver[3]], 3, {
                yPercent: -e,
                ease: Power1.easeInOut
            })])
        },
        _initState: function() {
            TweenMax.set([this.circles[0], this.circlesOver[0]], {
                opacity: 1
            }),
            TweenMax.set([this.circles[1], this.circlesOver[1]], {
                opacity: 1
            }),
            TweenMax.set([this.circles[2], this.circlesOver[2]], {
                opacity: 1
            }),
            TweenMax.set([this.circles[3], this.circlesOver[3]], {
                opacity: 1
            })
        },
        killPreloader: function() {
            var e = document.getElementsByClassName("preloader")[0];
            TweenMax.to([this.circles, this.circlesOver], .65, {
                yPercent: 0,
                xPercent: 0,
                ease: Power1.easeInOut
            }),
            TweenMax.to(this.circlesContainer, .4, {
                opacity: 0,
                delay: .4
            }),
            TweenMax.to(e, .63, {
                delay: .5,
                opacity: 0,
                ease: Power1.easeInOut,
                onComplete: _.bind(function() {
                    this.tl.stop(),
                    TweenMax.killTweensOf(this.circlesOver),
                    TweenMax.killTweensOf(this.circles),
                    this.triangleSVG = null ,
                    this.circlesContainer = $(".preloader .circles-svg"),
                    this.circlesSVG = null ,
                    this.circles = null ,
                    this.circlesOver = null ,
                    this.destroyAll()
                }, this)
            })
        }
    })
}),
define("../../core/assets/./../utils/dateTime", ["require"], function() {
    var e = {};
    e.MONTHS_NL = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"],
    e.MONTHS_EN = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"],
    e.time = function() {
        var e = window.performance ? window.performance.now || window.performance.webkitNow || window.performance.mozNow : null ;
        return e ? e.bind(window.performance) : Date.now || function() {
            return +new Date
        }
    }(),
    e.dateDiff = function(e, t) {
        return new Date(Math.abs(t.valueOf() - e.valueOf()))
    }
    ,
    e.parseTimestamp = function(e) {
        return new Date(1e3 * parseInt(e, 10))
    }
    ,
    e.parseIsoDate = function(e) {
        var t = e.split(" ")
          , n = t[0].split("-")
          , i = t.length > 1 ? t[1].split(":") : null 
          , r = new Date;
        return r.setDate(parseInt(n[2], 10)),
        r.setMonth(parseInt(n[1], 10) - 1),
        r.setFullYear(parseInt(n[0], 10)),
        i ? (r.setHours(parseInt(i[0], 10)),
        r.setMinutes(parseInt(i[1], 10)),
        r.setSeconds(parseInt(i[2], 10))) : (r.setHours(0),
        r.setMinutes(0),
        r.setSeconds(0)),
        r
    }
    ,
    e.formatTimeStamp = function(e) {
        e = Math.round(e);
        var t = e / 3600 >> 0
          , n = (e / 60 >> 0) % 60
          , i = e % 60;
        return (10 > t ? "0" : "") + t + ":" + (10 > n ? "0" : "") + n + ":" + (10 > i ? "0" : "") + i
    }
    ,
    e.getDateLong = function(t, n) {
        return n instanceof Array || (n = e.MONTHS_NL),
        t.getDate() + " " + n[t.getMonth()] + " " + t.getFullYear()
    }
    ,
    e.getDateShort = function(e, t) {
        t || (t = "-");
        var n = e.getMonth() + 1
          , i = e.getDate();
        return [10 > i ? "0" + i : i, 10 > n ? "0" + n : n, e.getFullYear()].join(t)
    }
    ;
    var t = []
      , n = !1;
    return window.addEventListener && window.addEventListener("message", function(e) {
        if (e.source == window && "nexttick" == e.data) {
            for (var i, r = 0; i = t[r]; r++)
                i();
            t.length = 0,
            n = !1
        }
    }, !1),
    e.nextTick = function(e) {
        return setTimeout(e, 0)
    }
    ,
    e
}),
define("../../core/assets/./../utils/random", [], function() {
    var e = {};
    e.randomArray = function(e) {
        var t = null 
          , n = null ;
        return function() {
            if ((!t || !t.length) && (t = e.concat(),
            n && t.length > 1))
                for (var i = 0; i < t.length; i++)
                    if (t[i] === n) {
                        t.splice(i, 1);
                        break
                    }
            if (!t.length)
                return null ;
            var r = Math.round(Math.random() * (t.length - 1));
            return n = t.splice(r, 1)[0]
        }
    }
    ,
    e.pickRandom = function(e) {
        var t = Math.round(Math.random() * (e.length - 1));
        return e[t]
    }
    ;
    var t = String("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789").split("");
    return e.id = function(e) {
        e || (e = 8);
        for (var n = "", i = 0; e > i; i++)
            n += t[Math.floor(Math.random() * t.length)];
        return n
    }
    ,
    e.betweenInt = function(e, t) {
        return e + Math.round(Math.random() * (t - e))
    }
    ,
    e.betweenFloat = function(e, t) {
        return e + Math.random() * (t - e)
    }
    ,
    e.radius = function(t, n, i, r, s, a) {
        var o = Math.random() * 2 * Math.PI - Math.PI / 2
          , l = e.betweenFloat(i, s)
          , u = e.betweenFloat(r, a);
        return {
            x: t + Math.cos(o) * l,
            y: n + Math.sin(o) * u
        }
    }
    ,
    e.roll = function(e) {
        return Math.random() < e
    }
    ,
    e
}),
define("../../core/assets/./../utils/url", ["require"], function() {
    var e = new RegExp("^(http[s]?:)?//")
      , t = /^data:([^;,]+)(?:;charset=([^;,]+))?(?:;(base64))?,/
      , n = /^(.+?)@([2-9])?x(\.jp(?:e)?g|\.png|\.gif|\.webp)?((?:\?|#).*)?$/
      , i = document.createElement("a")
      , r = {}
      , s = (window.devicePixelRatio || 1) >> 0;
    r.createURL = function(e, t) {
        return e + this.createQueryString(t)
    }
    ;
    var a = function(e, t) {
        this.url = e,
        this.pixelRatio = t
    }
    ;
    return a.prototype.toString = function() {
        return this.url
    }
    ,
    r.resolvePixelRatio = function(e, t) {
        var i = 1;
        if (!this.isBlob(e) && !this.isData(e)) {
            var r = e.match(n);
            r && (r[2] ? i = parseInt(r[2], 10) : (i = Math.max(Math.min(s, t || s), 1),
            e = r[1] + "@" + i + "x" + (r[3] || "") + (r[4] || "")))
        }
        return new a(e,i)
    }
    ,
    r.createQueryString = function(e) {
        var t, n = [], i = function(e, t) {
            n.push(encodeURIComponent(e) + "=" + encodeURIComponent(t))
        }
        ;
        for (var r in e)
            if (e.hasOwnProperty(r))
                if (t = e[r],
                t instanceof Array)
                    for (var s = 0, a = t.length; a > s; s++)
                        i(r + "[]", t[s]);
                else
                    t ? "object" == typeof t && (t = JSON.stringify(t)) : t = "",
                    i(r, t);
        return "?" + n.join("&")
    }
    ,
    r.parseQueryString = function(e) {
        if (!e.match(/\S/))
            return {};
        "?" === e.charAt(0) && (e = e.substr(1));
        for (var t, n, i = e.split("&"), r = {}, s = 0, a = i.length; a > s; s++) {
            var o = i[s]
              , l = o.indexOf("=");
            if (l >= 0 ? (t = o.substr(0, l),
            n = o.substr(l + 1)) : (t = o,
            n = ""),
            t = decodeURIComponent(t),
            n = decodeURIComponent(n),
            r.hasOwnProperty(t))
                r[t] instanceof Array ? r[t].push(n) : r[t] = [r[t], n];
            else {
                try {
                    n = JSON.parse(n)
                } catch (u) {}
                r[t] = n
            }
        }
        return r
    }
    ,
    r.parse = function(e, t) {
        i.href = e;
        var n = {
            search: i.search,
            hash: i.hash,
            pathname: i.pathname.replace(/\/\//g, "/"),
            hostname: i.hostname,
            username: i.username,
            password: i.password,
            port: i.port || 80,
            protocol: i.protocol
        };
        return t && (n.query = this.parseQueryString(n.search)),
        n
    }
    ,
    r.format = function(e) {
        var t = "";
        return t += e.protocol ? e.protocol : document.location.protocol,
        t += "//",
        (e.username || e.password) && (t += (e.username || "") + ":" + (e.password || "") + "@"),
        t += e.hostname ? e.hostname : document.location.host,
        e.port && !isNaN(parseInt(e.port)) && (t += ":" + e.port),
        e.path ? t = this.join(t, e.path) : t += "/",
        e.search ? ("?" !== e.search.charAt(0) && (t += "?"),
        t += e.search) : "object" == typeof e.query && (t += this.createQueryString(e.query)),
        e.hash && ("#" !== e.hash.charAt(0) && (t += "#"),
        t += e.hash),
        t
    }
    ,
    r.isAbsolute = function(t) {
        return t.match(e) || "/" === t.charAt(0)
    }
    ,
    r.isBlob = function(e) {
        return 0 === e.indexOf("blob:")
    }
    ,
    r.parseData = function(e) {
        if (!this.isData(e))
            return null ;
        var n = e.match(t);
        return {
            mimetype: n[1],
            charset: n[2] || "text/plain;charset=US-ASCII",
            base64: "base64" === n[3],
            data: e.substr(e.indexOf(",") + 1)
        }
    }
    ,
    r.isData = function(e) {
        return 0 === e.indexOf("data:")
    }
    ,
    r.isRelative = function(e) {
        return !this.isAbsolute(e)
    }
    ,
    r.resolve = function() {
        var e = this.join.apply(this, arguments);
        return i.href = e,
        i.href
    }
    ,
    r.dirname = function(e) {
        return e.split("/").slice(0, -1).join("/")
    }
    ,
    r.basename = function(e, t) {
        var n = e.split("/").pop();
        return t && this.extname(n) === t && (n = n.slice(0, -t.length)),
        n
    }
    ,
    r.extname = function(e) {
        return e.substr(e.lastIndexOf("."))
    }
    ,
    r.join = function(t) {
        var n, i, r, t = Array.prototype.slice.call(arguments, 0), s = [], a = "", o = !1;
        for (r = t.length - 1; r >= 0; r--)
            if (i = t[r],
            this.isAbsolute(i)) {
                var l = i.match(e);
                l ? (a = l[1] || location.protocol,
                t[r] = t[r].substr(l[0].length)) : (o = !0,
                t[r] = t[r].substr(1));
                break
            }
        0 > r && (r = 0);
        for (var u = t.length; u > r; r++) {
            i = t[r],
            n = i.split(/[\/\\]/g);
            for (var c = 0, h = n.length; h > c; c++)
                ".." === n[c] ? s.pop() : "." !== n[c] && "" !== n[c] && s.push(n[c])
        }
        return a ? a + "//" + s.join("/") : o ? "/" + s.join("/") : s.join("/")
    }
    ,
    r
}),
define("../../core/assets/AssetManager", ["require", "./../utils/dateTime", "./../utils/random", "./../utils/url"], function(e, t, n, i) {
    var r = !!document.all
      , s = function(e, t) {
        if (t = t || document.body,
        !window.jQuery && !document.querySelectorAll)
            throw "Can't preload html template because the required api's are not available (jquery or querySelectorAll)";
        var n = function(e, t) {
            if (document.createTreeWalker)
                for (var n, i = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, null , !1); n = i.nextNode(); )
                    t(n);
            else
                !function r(e) {
                    for (var n, i = e.childNodes, s = 0, a = i.length; a > s; s++)
                        n = i[s],
                        n.nodeType === n.ELEMENT_NODE && (t(n),
                        r(n))
                }(e)
        }
          , i = function(e, t) {
            return window.jQuery ? window.jQuery(e).css(t) : window.getComputedStyle(e)[t]
        }
          , s = function(e) {
            var t, n = document.createElement("div");
            if (window.jQuery)
                t = window.jQuery.parseHTML(e);
            else if (document.implementation && document.implementation.createHTMLDocument) {
                var i = document.implementation.createHTMLDocument("");
                i.body.innerHTML = e,
                t = i.body.childNodes
            } else {
                var i = document.createElement("div");
                i.innerHTML = e,
                t = i.childNodes
            }
            for (var r = 0; r < t.length; r++)
                n.appendChild(t[r]);
            return n
        }
        ;
        return function(a) {
            var o = e;
            "function" == typeof o && (o = o()),
            "string" == typeof o ? o = s(o) : o.jquery && (o = o.get(0)),
            t && o.parentNode !== t && t.appendChild(o);
            var l = this;
            n(o, function(e) {
                var t = r ? "?r=" + Math.random() : "";
                "IMG" === e.tagName && e.src && 0 !== e.src.indexOf("data:") && l.addImage(e.src + t);
                var n = i(e, "backgroundImage");
                if ("none" != n && "" != n && 0 == n.indexOf("url(")) {
                    var s = n.substring(4, n.length - 1).replace(/["']/g, "");
                    l.addImage(s + t)
                }
            }),
            o.parentNode && o.parentNode.removeChild(o),
            a()
        }
    }
      , a = function(e) {
        return function(t, n) {
            var i = new Image;
            if (!e)
                return t(i),
                void 0;
            var s = "";
            r && (s = e.indexOf("?") > -1 ? "&r=" + Math.random() : "?r=" + Math.random()),
            i.onerror = function(e) {
                e && n(new Error("Could not load image: " + i.src))
            }
            ,
            i.onload = function() {
                t(i)
            }
            ,
            i.src = e + s
        }
    }
      , o = function(e, t, n) {
        return function(i, r) {
            var a = null ;
            try {
                a = require("text!" + e)
            } catch (o) {}
            if (null  !== a)
                i(a);
            else {
                var l = require.onError;
                require.onError = function(e) {
                    r("Could not load the following templates: " + e.requireModules.join(",")),
                    require.onError = l
                }
                ,
                require(["text!" + e], function(r) {
                    if (require.onError = l,
                    t) {
                        var a = new p({
                            id: "Preload assets in " + e,
                            parallelTasks: 2
                        });
                        s(r, n).call(a, function() {}),
                        a.start(function() {
                            i(r)
                        })
                    } else
                        i(r)
                })
            }
        }
    }
      , l = {
        IDLE: 0,
        STARTED: 1,
        DONE: 2,
        FAILED: 3
    }
      , u = function(e, t, i) {
        this.next = null ,
        this.action = e,
        this.id = t || n.id(),
        this.preloader = i,
        this.state = l.IDLE
    }
    ;
    u.prototype.doneWrap = function(e) {
        var t = this;
        return function(n) {
            t.state < l.DONE && (t.state = l.DONE,
            e(n))
        }
    }
    ,
    u.prototype.failWrap = function(e) {
        var t = this;
        return function(n) {
            t.state < l.DONE && (t.state = l.FAILED,
            e(n))
        }
    }
    ,
    u.prototype.exec = function(e, t) {
        console.assert(this.state === l.IDLE, "Task " + this.id + " can not be started twice!"),
        this.state = l.STARTED,
        this.action.call(this.preloader, this.doneWrap(e), this.failWrap(t))
    }
    ,
    u.prototype.toString = function() {
        return "Preloader( " + this.preloader.id + " ) -> " + this.id
    }
    ;
    var c = function(e, t) {
        for (var n = 0, i = e.length; i > n; n++)
            t ? e[n](t) : e[n]()
    }
      , h = function() {
        this._count = 0,
        this._completed = 0,
        this._progressCallbacks = []
    }
    ;
    h.prototype.addProgressCallback = function(e) {
        if ("function" != typeof e)
            throw "Callback should be a function";
        this._progressCallbacks.push(e)
    }
    ,
    h.prototype.getCount = function() {
        return this._count
    }
    ,
    h.prototype.getCompleted = function() {
        return this._completed
    }
    ,
    h.prototype.isDone = function() {
        return this._count === this._completed
    }
    ,
    h.prototype.getProgress = function() {
        return this._count > 0 ? this._completed / this._count : 0
    }
    ,
    h.prototype.incrementCount = function() {
        this._count++
    }
    ,
    h.prototype.incrementCompleted = function() {
        this._completed = Math.min(this._completed + 1, this._count),
        this.notifyProgress()
    }
    ,
    h.prototype.notifyProgress = function() {
        c(this._progressCallbacks, this.getProgress())
    }
    ;
    var d = new h
      , p = function(e, t) {
        e = e || {},
        this._head = null ,
        this._tail = null ,
        this._insert = null ,
        this._state = l.IDLE,
        this._doneCallbacks = [],
        this._failCallbacks = [],
        this._progressCallbacks = [],
        this._id = e.id || "",
        this._busy = 0,
        this._parallelTasks = e.parallelTasks || 1,
        this._localProgress = new h;
        var n = this;
        this._localProgress.addProgressCallback(function(e) {
            c(n._progressCallbacks, e)
        }),
        this._sharedProgress = t || d
    }
    ;
    p.prototype.status = l,
    p.prototype.getId = function() {
        return this._id
    }
    ,
    p.prototype.getState = function() {
        return this._state
    }
    ,
    p.prototype.isDone = function() {
        return this._localProgress.isDone()
    }
    ,
    p.prototype.addGroup = function(e) {
        var t = new p(e,this._localProgress);
        return this.add(t, t.getId() + ".wrap"),
        t
    }
    ,
    p.prototype.addQueue = function(e) {
        return e = e || {},
        e.parallelTasks = 1,
        this.addGroup(e)
    }
    ,
    p.prototype.addImage = function(e, t, n) {
        var r = i.resolvePixelRatio(e, n);
        return e = r.toString(),
        this.add(a(e), t || e)
    }
    ,
    p.prototype.addHTML = function(e, t, n) {
        return "undefined" == typeof t && (t = !0),
        "string" != typeof e || /^\s*</.test(e) ? this.add(s(e, n)) : this.add(o(e, t, n), e)
    }
    ,
    p.prototype.add = function(e, t) {
        if (e instanceof p)
            return this.add(function(t, n) {
                e.start(t, n)
            }, t);
        var n = new u(e,t,this);
        return this._localProgress.incrementCount(),
        this._sharedProgress.incrementCount(),
        this._head ? this._state > l.IDLE && this._insert ? (n.next = this._insert.next,
        this._insert.next = n,
        this._insert = n) : (this._tail.next = n,
        this._tail = n) : this._head = this._tail = this._insert = n,
        this
    }
    ,
    p.prototype.next = function() {
        return this._localProgress.isDone() ? void 0 : (this._localProgress.incrementCompleted(),
        this._sharedProgress.incrementCompleted(),
        this._busy--,
        this._localProgress.isDone() ? this._setDone() : this._feedScheduler(),
        this)
    }
    ,
    p.prototype.addDoneCallback = function(e) {
        return console.assert("function" == typeof e, "Callback should be a function"),
        this._doneCallbacks.push(e),
        this
    }
    ,
    p.prototype.addFailCallback = function(e) {
        return console.assert("function" == typeof e, "Callback should be a function"),
        this._failCallbacks.push(e),
        this
    }
    ,
    p.prototype.addProgressCallback = function(e) {
        return console.assert("function" == typeof e, "Callback should be a function"),
        this._progressCallbacks.push(e),
        this
    }
    ,
    p.prototype.error = function(e) {
        return this._setFailed(),
        ("string" == typeof e || e instanceof Error) && console.warn(e),
        this
    }
    ,
    p.prototype._feedScheduler = function() {
        for (var e = []; this._head && this._busy < this._parallelTasks; )
            e.push(this._head),
            this._busy++,
            this._head = this._insert = this._head.next;
        e.length && t.nextTick(function() {
            for (var t = 0, n = e.length; n > t; t++)
                g.schedule(e[t])
        })
    }
    ,
    p.prototype._setDone = function() {
        this._state = l.DONE,
        c(this._doneCallbacks)
    }
    ,
    p.prototype._setFailed = function() {
        this._state = l.FAILED,
        c(this._failCallbacks)
    }
    ,
    p.prototype._setStarted = function() {
        this._state = l.STARTED
    }
    ,
    p.prototype.start = function(e, t, n) {
        return this._state > l.IDLE ? (console.warn("You called start on a preloader which was already started!"),
        this) : ("function" == typeof e && this.addDoneCallback(e),
        "function" == typeof t && this.addFailCallback(t),
        "function" == typeof n && this.addProgressCallback(n),
        this._localProgress.getCount() > 0 ? (this._setStarted(),
        this._feedScheduler()) : this._setDone(),
        this)
    }
    ,
    p.prototype.getAsset = function(e) {
        return f.getResult(e)
    }
    ;
    var f = {
        results: {},
        hasResult: function(e) {
            return this.results.hasOwnProperty(e)
        },
        forgetResult: function(e) {
            return this.hasResult(e) ? (delete this.results[e],
            !0) : !1
        },
        getResult: function(e) {
            return this.hasResult(e) ? this.results[e] : null 
        },
        setResult: function(e, t) {
            this.results[e] = t
        }
    }
      , g = {
        parallelTasks: 8,
        todo: [],
        busy: {},
        busyCount: 0,
        started: !1,
        schedule: function(e) {
            f.hasResult(e.id) ? (t.nextTick(function() {
                e.preloader.next()
            }),
            this.start()) : (this.todo.push(e),
            this.start())
        },
        unregisterAsBusy: function(e) {
            this.busy.hasOwnProperty(e) && (delete this.busy[e],
            this.busyCount--)
        },
        execTask: function(e) {
            e.exec(function(t) {
                t && f.setResult(e.id, t),
                g.unregisterAsBusy(e.id),
                e.preloader.next()
            }, function(t) {
                e.preloader.error(t)
            })
        },
        start: function() {
            for (; this.todo.length && this.busyCount < this.parallelTasks; ) {
                var e = this.todo.pop();
                this.busy[e.id] = e,
                this.busyCount++,
                this.execTask(e)
            }
        }
    }
      , m = {
        createPreloader: function(e) {
            return new p(e)
        },
        getAsset: function(e) {
            return f.getResult(e)
        },
        forgetAsset: function(e) {
            return f.forgetResult(e)
        },
        isLoaded: function(e) {
            return f.hasResult(e)
        }
    };
    return m
}),
define("../../core/view/page/PageSwapperView", ["require", "backbone", "core/assets/AssetManager"], function(e) {
    var t = e("backbone")
      , n = e("core/assets/AssetManager")
      , i = t.View.extend({
        autoStart: !0,
        manager: null ,
        initialize: function(e) {
            if (_.extend(this, _.pick(e, "autoStart", "manager")),
            !this.manager)
                throw new Error("No pageManager specified! Use the 'manager' option");
            this._pageView = null ,
            this._pageViews = {},
            this._loadingPageView = null ,
            this.autoStart && this.start()
        },
        start: function() {
            this.listenTo(this.manager, "beforepagechange", this.onBeforePageChange),
            this.listenTo(this.manager, "afterpagechange", this.onAfterPageChange),
            this.manager.getPagePath() && this.onAfterPageChange(this.manager.getPagePath())
        },
        stop: function() {
            this.stopListening(this.manager)
        },
        getPageView: function() {
            return this._pageView
        },
        transitionInPage: function() {},
        transitionOutPage: function() {},
        transitionSwapPage: function() {},
        shouldSwapPage: function() {
            return !1
        },
        _getOrCreatePageView: function(e, t) {
            if (this._pageViews[String(e)]) {
                var n = this._pageViews[String(e)];
                return n.model.set({
                    path: e,
                    args: t
                }),
                n
            }
            return this._pageViews[String(e)] = this.manager.createPageView(e, t)
        },
        _exitPageView: function(e) {
            var t = this;
            return e ? $.when(this.transitionOutPage(e)).then(function() {
                return e.hide()
            }).then(function() {
                _.result(e, "destroyOnHide") && (delete t._pageViews[String(e.model.get("path"))],
                e.remove())
            }) : null 
        },
        _enterPageView: function() {
            this._pageView = this._getOrCreatePageView(this.manager.getPagePath(), this.manager.getPageArgs()),
            console.log("entering page " + this.manager.getPagePath()),
            this._pageView.$el.parent().is(this.$el) || this.$el.append(this._pageView.$el),
            this._pageView._autoRender(),
            this._pageView.show(),
            this._pageView.transitionIn(this._pageView.model),
            this.transitionInPage(this._pageView)
        },
        _swapPageView: function() {
            var e = this._pageView;
            this._enterPageView();
            var t = this._pageView;
            this.$el.attr("data-swap", e.model.get("path") + " -> " + t.model.get("path")),
            e.$el.attr("data-swap-old", ""),
            t.$el.attr("data-swap-new", "");
            var n = this;
            return $.when(this.transitionSwapPage(e, t)).then(function() {
                return n._exitPageView(e)
            }).then(function() {
                n.$el.removeAttr("data-swap"),
                e.$el.removeAttr("data-swap-old"),
                t.$el.removeAttr("data-swap-new")
            })
        },
        _preloadPageAssets: function(e, t) {
            var i = $.Deferred()
              , r = n.createPreloader({
                id: "preload_" + t
            });
            return e.preloadAssets(r),
            r.start(i.resolve, i.reject),
            i.promise()
        },
        onBeforePageChange: function(e, t) {
            this._loadingPageView && (this._loadingPageView.abortLoad(),
            this._loadingPageView = null );
            var n = this._getOrCreatePageView(t, this.manager.getPageArgs())
              , i = this
              , r = $.when(n.isLoaded() ? null  : n.load(), this._preloadPageAssets(n, t));
            "resolved" !== r.state() && (console.info("Preloading assets for " + t + "..."),
            this._loadingPageView = n,
            this.manager.delayPageChange(),
            this.trigger("loading"),
            r = r.fail(function() {
                i.trigger("loaderror")
            }).then(function() {
                console.info("Assets for " + t + " were loaded")
            })),
            r.then(function() {
                i.trigger("loaddone");
                var e = i._pageView && i._pageView.transitionOut(t) === !1;
                i._loadingPageView && !e ? i.manager.commitPageChange() : !i._loadingPageView && e && i.manager.delayPageChange()
            }).always(function() {
                i._loadingPageView = null 
            })
        },
        onAfterPageChange: function(e) {
            var t = this
              , n = !1;
            if (this._pageView) {
                var i = this._pageView.model.get("path");
                n = this.shouldSwapPage(i, e)
            }
            n ? this._swapPageView() : $.when(this._exitPageView(this._pageView)).then(function() {
                t._enterPageView()
            })
        }
    });
    return i
}),
define("view/CustomPageSwapperView", ["require", "core/view/page/PageSwapperView"], function(e) {
    var t = e("core/view/page/PageSwapperView");
    return t.extend({
        shouldSwapPage: function() {
            return !0
        },
        transitionInPage: function(e) {
            window.scrollTo(0, 0);
            var t = !!App.pages.getPreviousPage();
            t || e.afterPageSwap(!0)
        },
        transitionSwapPage: function(e, t) {
            var n = $.Deferred()
              , i = App.pages.getPageArgs() && App.pages.getPageArgs().instant
              , r = i ? 0 : 450
              , s = e.model.get("path").toString()
              , a = t.model.get("path").toString();
            return "about" != a && "about" != s || "home" != a && "home" != s && "accept" != a && "accept" != s || i ? $("body").removeClass("state-scollingAbout") : (r = 1500,
            setTimeout(function() {
                t.$el.addClass("state-content-animated")
            }, 50),
            $("body").addClass("state-scollingAbout")),
            i ? e.$el.addClass("state-instant") : e.$el.removeClass("state-instant"),
            e.$el.removeClass("state-active"),
            e.beforePageSwap(!1),
            t.beforePageSwap(!0),
            setTimeout(function() {
                e.afterPageSwap(!1),
                t.afterPageSwap(!0),
                Backbone.Events.trigger("pageSwap"),
                n.resolve(),
                App.aboutVisible = "about" == a,
                setTimeout(function() {
                    "about" == s && $("body").removeClass("state-animateAbout state-scrolledDown"),
                    App.animatingAbout = !1
                }, 50)
            }, r),
            n.promise()
        }
    })
}),
function() {
    function e() {
        try {
            "undefined" != typeof AudioContext ? t = new AudioContext : "undefined" != typeof webkitAudioContext ? t = new webkitAudioContext : n = !1
        } catch (e) {
            n = !1
        }
        if (!n)
            if ("undefined" != typeof Audio)
                try {
                    var a = new Audio;
                    "undefined" == typeof a.oncanplaythrough && (s = "canplay")
                } catch (e) {
                    i = !0
                }
            else
                i = !0;
        try {
            var a = new Audio;
            a.muted && (i = !0)
        } catch (e) {}
        var o = /iP(hone|od|ad)/.test(navigator.platform)
          , l = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)
          , u = l ? parseInt(l[1], 10) : null ;
        if (o && u && 9 > u) {
            var c = /safari/.test(window.navigator.userAgent.toLowerCase());
            (window.navigator.standalone && !c || !window.navigator.standalone && !c) && (n = !1)
        }
        n && (r = "undefined" == typeof t.createGain ? t.createGainNode() : t.createGain(),
        r.gain.value = 1,
        r.connect(t.destination))
    }
    var t = null 
      , n = !0
      , i = !1
      , r = null 
      , s = "canplaythrough";
    e();
    var a = function() {
        this.init()
    }
    ;
    a.prototype = {
        init: function() {
            var e = this || o;
            return e._codecs = {},
            e._howls = [],
            e._muted = !1,
            e._volume = 1,
            e.state = t ? t.state || "running" : "running",
            e.autoSuspend = !0,
            e._autoSuspend(),
            e.mobileAutoEnable = !0,
            e.noAudio = i,
            e.usingWebAudio = n,
            e.ctx = t,
            e.masterGain = r,
            i || e._setupCodecs(),
            e
        },
        volume: function(e) {
            var t = this || o;
            if (e = parseFloat(e),
            "undefined" != typeof e && e >= 0 && 1 >= e) {
                t._volume = e,
                n && (r.gain.value = e);
                for (var i = 0; i < t._howls.length; i++)
                    if (!t._howls[i]._webAudio)
                        for (var s = t._howls[i]._getSoundIds(), a = 0; a < s.length; a++) {
                            var l = t._howls[i]._soundById(s[a]);
                            l && l._node && (l._node.volume = l._volume * e)
                        }
                return t
            }
            return t._volume
        },
        mute: function(e) {
            var t = this || o;
            t._muted = e,
            n && (r.gain.value = e ? 0 : t._volume);
            for (var i = 0; i < t._howls.length; i++)
                if (!t._howls[i]._webAudio)
                    for (var s = t._howls[i]._getSoundIds(), a = 0; a < s.length; a++) {
                        var l = t._howls[i]._soundById(s[a]);
                        l && l._node && (l._node.muted = e ? !0 : l._muted)
                    }
            return t
        },
        unload: function() {
            for (var n = this || o, i = n._howls.length - 1; i >= 0; i--)
                n._howls[i].unload();
            return n.usingWebAudio && "undefined" != typeof t.close && (n.ctx = null ,
            t.close(),
            e(),
            n.ctx = t),
            n
        },
        codecs: function(e) {
            return (this || o)._codecs[e]
        },
        _setupCodecs: function() {
            var e = this || o
              , t = new Audio
              , n = t.canPlayType("audio/mpeg;").replace(/^no$/, "")
              , i = /OPR\//.test(navigator.userAgent);
            return e._codecs = {
                mp3: !(i || !n && !t.canPlayType("audio/mp3;").replace(/^no$/, "")),
                mpeg: !!n,
                opus: !!t.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
                ogg: !!t.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
                oga: !!t.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
                wav: !!t.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""),
                aac: !!t.canPlayType("audio/aac;").replace(/^no$/, ""),
                caf: !!t.canPlayType("audio/x-caf;").replace(/^no$/, ""),
                m4a: !!(t.canPlayType("audio/x-m4a;") || t.canPlayType("audio/m4a;") || t.canPlayType("audio/aac;")).replace(/^no$/, ""),
                mp4: !!(t.canPlayType("audio/x-mp4;") || t.canPlayType("audio/mp4;") || t.canPlayType("audio/aac;")).replace(/^no$/, ""),
                weba: !!t.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, ""),
                webm: !!t.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, ""),
                dolby: !!t.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/, "")
            },
            e
        },
        _enableMobileAudio: function() {
            var e = this || o
              , n = /iPhone|iPad|iPod|Android|BlackBerry|BB10|Silk/i.test(navigator.userAgent)
              , i = !!("ontouchend" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0);
            if (!t || !e._mobileEnabled && n && i) {
                e._mobileEnabled = !1;
                var r = function() {
                    var n = t.createBuffer(1, 1, 22050)
                      , i = t.createBufferSource();
                    i.buffer = n,
                    i.connect(t.destination),
                    "undefined" == typeof i.start ? i.noteOn(0) : i.start(0),
                    i.onended = function() {
                        i.disconnect(0),
                        e._mobileEnabled = !0,
                        e.mobileAutoEnable = !1,
                        document.removeEventListener("touchend", r, !0)
                    }
                }
                ;
                return document.addEventListener("touchend", r, !0),
                e
            }
        },
        _autoSuspend: function() {
            var e = this;
            if (e.autoSuspend && t && "undefined" != typeof t.suspend && n) {
                for (var i = 0; i < e._howls.length; i++)
                    if (e._howls[i]._webAudio)
                        for (var r = 0; r < e._howls[i]._sounds.length; r++)
                            if (!e._howls[i]._sounds[r]._paused)
                                return e;
                return e._suspendTimer = setTimeout(function() {
                    e.autoSuspend && (e._suspendTimer = null ,
                    e.state = "suspending",
                    t.suspend().then(function() {
                        e.state = "suspended",
                        e._resumeAfterSuspend && (delete e._resumeAfterSuspend,
                        e._autoResume())
                    }))
                }, 3e4),
                e
            }
        },
        _autoResume: function() {
            var e = this;
            if (t && "undefined" != typeof t.resume && n)
                return "running" === e.state && e._suspendTimer ? (clearTimeout(e._suspendTimer),
                e._suspendTimer = null ) : "suspended" === e.state ? (e.state = "resuming",
                t.resume().then(function() {
                    e.state = "running"
                }),
                e._suspendTimer && (clearTimeout(e._suspendTimer),
                e._suspendTimer = null )) : "suspending" === e.state && (e._resumeAfterSuspend = !0),
                e
        }
    };
    var o = new a
      , l = function(e) {
        var t = this;
        return e.src && 0 !== e.src.length ? (t.init(e),
        void 0) : (console.error("An array of source files must be passed with any new Howl."),
        void 0)
    }
    ;
    l.prototype = {
        init: function(e) {
            var i = this;
            return i._autoplay = e.autoplay || !1,
            i._format = "string" != typeof e.format ? e.format : [e.format],
            i._html5 = e.html5 || !1,
            i._muted = e.mute || !1,
            i._loop = e.loop || !1,
            i._pool = e.pool || 5,
            i._preload = "boolean" == typeof e.preload ? e.preload : !0,
            i._rate = e.rate || 1,
            i._sprite = e.sprite || {},
            i._src = "string" != typeof e.src ? e.src : [e.src],
            i._volume = void 0 !== e.volume ? e.volume : 1,
            i._duration = 0,
            i._state = "unloaded",
            i._sounds = [],
            i._endTimers = {},
            i._queue = [],
            i._onend = e.onend ? [{
                fn: e.onend
            }] : [],
            i._onfade = e.onfade ? [{
                fn: e.onfade
            }] : [],
            i._onload = e.onload ? [{
                fn: e.onload
            }] : [],
            i._onloaderror = e.onloaderror ? [{
                fn: e.onloaderror
            }] : [],
            i._onpause = e.onpause ? [{
                fn: e.onpause
            }] : [],
            i._onplay = e.onplay ? [{
                fn: e.onplay
            }] : [],
            i._onstop = e.onstop ? [{
                fn: e.onstop
            }] : [],
            i._onmute = e.onmute ? [{
                fn: e.onmute
            }] : [],
            i._onvolume = e.onvolume ? [{
                fn: e.onvolume
            }] : [],
            i._onrate = e.onrate ? [{
                fn: e.onrate
            }] : [],
            i._onseek = e.onseek ? [{
                fn: e.onseek
            }] : [],
            i._webAudio = n && !i._html5,
            "undefined" != typeof t && t && o.mobileAutoEnable && o._enableMobileAudio(),
            o._howls.push(i),
            i._preload && i.load(),
            i
        },
        load: function() {
            var e = this
              , t = null ;
            if (i)
                return e._emit("loaderror", null , "No audio support."),
                void 0;
            "string" == typeof e._src && (e._src = [e._src]);
            for (var n = 0; n < e._src.length; n++) {
                var r, s;
                if (e._format && e._format[n] ? r = e._format[n] : (s = e._src[n],
                r = /^data:audio\/([^;,]+);/i.exec(s),
                r || (r = /\.([^.]+)$/.exec(s.split("?", 1)[0])),
                r && (r = r[1].toLowerCase())),
                o.codecs(r)) {
                    t = e._src[n];
                    break
                }
            }
            return t ? (e._src = t,
            e._state = "loading",
            "https:" === window.location.protocol && "http:" === t.slice(0, 5) && (e._html5 = !0,
            e._webAudio = !1),
            new u(e),
            e._webAudio && h(e),
            e) : (e._emit("loaderror", null , "No codec support for selected audio sources."),
            void 0)
        },
        play: function(e) {
            var n = this
              , i = arguments
              , r = null ;
            if ("number" == typeof e)
                r = e,
                e = null ;
            else if ("undefined" == typeof e) {
                e = "__default";
                for (var a = 0, l = 0; l < n._sounds.length; l++)
                    n._sounds[l]._paused && !n._sounds[l]._ended && (a++,
                    r = n._sounds[l]._id);
                1 === a ? e = null  : r = null 
            }
            var u = r ? n._soundById(r) : n._inactiveSound();
            if (!u)
                return null ;
            if (r && !e && (e = u._sprite || "__default"),
            "loaded" !== n._state && !n._sprite[e])
                return n._queue.push({
                    event: "play",
                    action: function() {
                        n.play(n._soundById(u._id) ? u._id : void 0)
                    }
                }),
                u._id;
            if (r && !u._paused)
                return i[1] || setTimeout(function() {
                    n._emit("play", u._id)
                }, 0),
                u._id;
            n._webAudio && o._autoResume();
            var c = u._seek > 0 ? u._seek : n._sprite[e][0] / 1e3
              , h = (n._sprite[e][0] + n._sprite[e][1]) / 1e3 - c
              , d = 1e3 * h / Math.abs(u._rate);
            1 / 0 !== d && (n._endTimers[u._id] = setTimeout(n._ended.bind(n, u), d)),
            u._paused = !1,
            u._ended = !1,
            u._sprite = e,
            u._seek = c,
            u._start = n._sprite[e][0] / 1e3,
            u._stop = (n._sprite[e][0] + n._sprite[e][1]) / 1e3,
            u._loop = !(!u._loop && !n._sprite[e][2]);
            var p = u._node;
            if (n._webAudio) {
                var f = function() {
                    n._refreshBuffer(u);
                    var e = u._muted || n._muted ? 0 : u._volume * o.volume();
                    p.gain.setValueAtTime(e, t.currentTime),
                    u._playStart = t.currentTime,
                    "undefined" == typeof p.bufferSource.start ? u._loop ? p.bufferSource.noteGrainOn(0, c, 86400) : p.bufferSource.noteGrainOn(0, c, h) : u._loop ? p.bufferSource.start(0, c, 86400) : p.bufferSource.start(0, c, h),
                    n._endTimers[u._id] || 1 / 0 === d || (n._endTimers[u._id] = setTimeout(n._ended.bind(n, u), d)),
                    i[1] || setTimeout(function() {
                        n._emit("play", u._id)
                    }, 0)
                }
                ;
                "loaded" === n._state ? f() : (n.once("load", f, u._id),
                n._clearTimer(u._id))
            } else {
                var g = function() {
                    p.currentTime = c,
                    p.muted = u._muted || n._muted || o._muted || p.muted,
                    p.volume = u._volume * o.volume(),
                    p.playbackRate = u._rate,
                    setTimeout(function() {
                        p.play(),
                        i[1] || n._emit("play", u._id)
                    }, 0)
                }
                ;
                if (4 === p.readyState || window && window.ejecta || !p.readyState && navigator.isCocoonJS)
                    g();
                else {
                    var m = function() {
                        1 / 0 !== d && (n._endTimers[u._id] = setTimeout(n._ended.bind(n, u), d)),
                        g(),
                        p.removeEventListener(s, m, !1)
                    }
                    ;
                    p.addEventListener(s, m, !1),
                    n._clearTimer(u._id)
                }
            }
            return u._id
        },
        pause: function(e) {
            var t = this;
            if ("loaded" !== t._state)
                return t._queue.push({
                    event: "pause",
                    action: function() {
                        t.pause(e)
                    }
                }),
                t;
            for (var n = t._getSoundIds(e), i = 0; i < n.length; i++) {
                t._clearTimer(n[i]);
                var r = t._soundById(n[i]);
                if (r && !r._paused) {
                    if (r._seek = t.seek(n[i]),
                    r._paused = !0,
                    t._stopFade(n[i]),
                    r._node)
                        if (t._webAudio) {
                            if (!r._node.bufferSource)
                                return t;
                            "undefined" == typeof r._node.bufferSource.stop ? r._node.bufferSource.noteOff(0) : r._node.bufferSource.stop(0),
                            r._node.bufferSource = null 
                        } else
                            isNaN(r._node.duration) && 1 / 0 !== r._node.duration || r._node.pause();
                    arguments[1] || t._emit("pause", r._id)
                }
            }
            return t
        },
        stop: function(e) {
            var t = this;
            if ("loaded" !== t._state)
                return "undefined" != typeof t._sounds[0]._sprite && t._queue.push({
                    event: "stop",
                    action: function() {
                        t.stop(e)
                    }
                }),
                t;
            for (var n = t._getSoundIds(e), i = 0; i < n.length; i++) {
                t._clearTimer(n[i]);
                var r = t._soundById(n[i]);
                if (r && !r._paused) {
                    if (r._seek = r._start || 0,
                    r._paused = !0,
                    r._ended = !0,
                    t._stopFade(n[i]),
                    r._node)
                        if (t._webAudio) {
                            if (!r._node.bufferSource)
                                return t;
                            "undefined" == typeof r._node.bufferSource.stop ? r._node.bufferSource.noteOff(0) : r._node.bufferSource.stop(0),
                            r._node.bufferSource = null 
                        } else
                            isNaN(r._node.duration) && 1 / 0 !== r._node.duration || (r._node.pause(),
                            r._node.currentTime = r._start || 0);
                    t._emit("stop", r._id)
                }
            }
            return t
        },
        mute: function(e, n) {
            var i = this;
            if ("loaded" !== i._state)
                return i._queue.push({
                    event: "mute",
                    action: function() {
                        i.mute(e, n)
                    }
                }),
                i;
            if ("undefined" == typeof n) {
                if ("boolean" != typeof e)
                    return i._muted;
                i._muted = e
            }
            for (var r = i._getSoundIds(n), s = 0; s < r.length; s++) {
                var a = i._soundById(r[s]);
                a && (a._muted = e,
                i._webAudio && a._node ? a._node.gain.setValueAtTime(e ? 0 : a._volume * o.volume(), t.currentTime) : a._node && (a._node.muted = o._muted ? !0 : e),
                i._emit("mute", a._id))
            }
            return i
        },
        volume: function() {
            var e, n, i = this, r = arguments;
            if (0 === r.length)
                return i._volume;
            if (1 === r.length) {
                var s = i._getSoundIds()
                  , a = s.indexOf(r[0]);
                a >= 0 ? n = parseInt(r[0], 10) : e = parseFloat(r[0])
            } else
                r.length >= 2 && (e = parseFloat(r[0]),
                n = parseInt(r[1], 10));
            var l;
            if (!("undefined" != typeof e && e >= 0 && 1 >= e))
                return l = n ? i._soundById(n) : i._sounds[0],
                l ? l._volume : 0;
            if ("loaded" !== i._state)
                return i._queue.push({
                    event: "volume",
                    action: function() {
                        i.volume.apply(i, r)
                    }
                }),
                i;
            "undefined" == typeof n && (i._volume = e),
            n = i._getSoundIds(n);
            for (var u = 0; u < n.length; u++)
                l = i._soundById(n[u]),
                l && (l._volume = e,
                r[2] || i._stopFade(n[u]),
                i._webAudio && l._node && !l._muted ? l._node.gain.setValueAtTime(e * o.volume(), t.currentTime) : l._node && !l._muted && (l._node.volume = e * o.volume()),
                i._emit("volume", l._id));
            return i
        },
        fade: function(e, n, i, r) {
            var s = this;
            if ("loaded" !== s._state)
                return s._queue.push({
                    event: "fade",
                    action: function() {
                        s.fade(e, n, i, r)
                    }
                }),
                s;
            s.volume(e, r);
            for (var a = s._getSoundIds(r), o = 0; o < a.length; o++) {
                var l = s._soundById(a[o]);
                if (l)
                    if (r || s._stopFade(a[o]),
                    s._webAudio && !l._muted) {
                        var u = t.currentTime
                          , c = u + i / 1e3;
                        l._volume = e,
                        l._node.gain.setValueAtTime(e, u),
                        l._node.gain.linearRampToValueAtTime(n, c),
                        l._timeout = setTimeout(function(e, i) {
                            delete i._timeout,
                            setTimeout(function() {
                                i._volume = n,
                                s._emit("fade", e)
                            }, c - t.currentTime > 0 ? Math.ceil(1e3 * (c - t.currentTime)) : 0)
                        }
                        .bind(s, a[o], l), i)
                    } else {
                        var h = Math.abs(e - n)
                          , d = e > n ? "out" : "in"
                          , p = h / .01
                          , f = i / p;
                        !function() {
                            var t = e;
                            l._interval = setInterval(function(e, i) {
                                t += "in" === d ? .01 : -.01,
                                t = Math.max(0, t),
                                t = Math.min(1, t),
                                t = Math.round(100 * t) / 100,
                                s.volume(t, e, !0),
                                t === n && (clearInterval(i._interval),
                                delete i._interval,
                                s._emit("fade", e))
                            }
                            .bind(s, a[o], l), f)
                        }()
                    }
            }
            return s
        },
        _stopFade: function(e) {
            var n = this
              , i = n._soundById(e);
            return i._interval ? (clearInterval(i._interval),
            delete i._interval,
            n._emit("fade", e)) : i._timeout && (clearTimeout(i._timeout),
            delete i._timeout,
            i._node.gain.cancelScheduledValues(t.currentTime),
            n._emit("fade", e)),
            n
        },
        loop: function() {
            var e, t, n, i = this, r = arguments;
            if (0 === r.length)
                return i._loop;
            if (1 === r.length) {
                if ("boolean" != typeof r[0])
                    return n = i._soundById(parseInt(r[0], 10)),
                    n ? n._loop : !1;
                e = r[0],
                i._loop = e
            } else
                2 === r.length && (e = r[0],
                t = parseInt(r[1], 10));
            for (var s = i._getSoundIds(t), a = 0; a < s.length; a++)
                n = i._soundById(s[a]),
                n && (n._loop = e,
                i._webAudio && n._node && n._node.bufferSource && (n._node.bufferSource.loop = e));
            return i
        },
        rate: function() {
            var e, t, n = this, i = arguments;
            if (0 === i.length)
                t = n._sounds[0]._id;
            else if (1 === i.length) {
                var r = n._getSoundIds()
                  , s = r.indexOf(i[0]);
                s >= 0 ? t = parseInt(i[0], 10) : e = parseFloat(i[0])
            } else
                2 === i.length && (e = parseFloat(i[0]),
                t = parseInt(i[1], 10));
            var a;
            if ("number" != typeof e)
                return a = n._soundById(t),
                a ? a._rate : n._rate;
            if ("loaded" !== n._state)
                return n._queue.push({
                    event: "rate",
                    action: function() {
                        n.rate.apply(n, i)
                    }
                }),
                n;
            "undefined" == typeof t && (n._rate = e),
            t = n._getSoundIds(t);
            for (var o = 0; o < t.length; o++)
                if (a = n._soundById(t[o])) {
                    a._rate = e,
                    n._webAudio && a._node && a._node.bufferSource ? a._node.bufferSource.playbackRate.value = e : a._node && (a._node.playbackRate = e);
                    var l = n.seek(t[o])
                      , u = (n._sprite[a._sprite][0] + n._sprite[a._sprite][1]) / 1e3 - l
                      , c = 1e3 * u / Math.abs(a._rate);
                    n._clearTimer(t[o]),
                    n._endTimers[t[o]] = setTimeout(n._ended.bind(n, a), c),
                    n._emit("rate", a._id)
                }
            return n
        },
        seek: function() {
            var e, n, i = this, r = arguments;
            if (0 === r.length)
                n = i._sounds[0]._id;
            else if (1 === r.length) {
                var s = i._getSoundIds()
                  , a = s.indexOf(r[0]);
                a >= 0 ? n = parseInt(r[0], 10) : (n = i._sounds[0]._id,
                e = parseFloat(r[0]))
            } else
                2 === r.length && (e = parseFloat(r[0]),
                n = parseInt(r[1], 10));
            if ("undefined" == typeof n)
                return i;
            if ("loaded" !== i._state)
                return i._queue.push({
                    event: "seek",
                    action: function() {
                        i.seek.apply(i, r)
                    }
                }),
                i;
            var o = i._soundById(n);
            if (o) {
                if (!(e >= 0))
                    return i._webAudio ? o._seek + (i.playing(n) ? t.currentTime - o._playStart : 0) : o._node.currentTime;
                var l = i.playing(n);
                l && i.pause(n, !0),
                o._seek = e,
                i._clearTimer(n),
                l && i.play(n, !0),
                i._emit("seek", n)
            }
            return i
        },
        playing: function(e) {
            var t = this
              , n = t._soundById(e) || t._sounds[0];
            return n ? !n._paused : !1
        },
        duration: function(e) {
            var t = this
              , n = t._soundById(e) || t._sounds[0];
            return t._duration / n._rate
        },
        state: function() {
            return this._state
        },
        unload: function() {
            for (var e = this, t = e._sounds, n = 0; n < t.length; n++) {
                t[n]._paused || (e.stop(t[n]._id),
                e._emit("end", t[n]._id)),
                e._webAudio || (t[n]._node.src = "",
                t[n]._node.removeEventListener("error", t[n]._errorFn, !1),
                t[n]._node.removeEventListener(s, t[n]._loadFn, !1)),
                delete t[n]._node,
                e._clearTimer(t[n]._id);
                var i = o._howls.indexOf(e);
                i >= 0 && o._howls.splice(i, 1)
            }
            return c && delete c[e._src],
            e._state = "unloaded",
            e._sounds = [],
            e = null ,
            null 
        },
        on: function(e, t, n, i) {
            var r = this
              , s = r["_on" + e];
            return "function" == typeof t && s.push(i ? {
                id: n,
                fn: t,
                once: i
            } : {
                id: n,
                fn: t
            }),
            r
        },
        off: function(e, t, n) {
            var i = this
              , r = i["_on" + e];
            if (t) {
                for (var s = 0; s < r.length; s++)
                    if (t === r[s].fn && n === r[s].id) {
                        r.splice(s, 1);
                        break
                    }
            } else if (e)
                i["_on" + e] = [];
            else
                for (var a = Object.keys(i), s = 0; s < a.length; s++)
                    0 === a[s].indexOf("_on") && Array.isArray(i[a[s]]) && (i[a[s]] = []);
            return i
        },
        once: function(e, t, n) {
            var i = this;
            return i.on(e, t, n, 1),
            i
        },
        _emit: function(e, t, n) {
            for (var i = this, r = i["_on" + e], s = r.length - 1; s >= 0; s--)
                r[s].id && r[s].id !== t && "load" !== e || (setTimeout(function(e) {
                    e.call(this, t, n)
                }
                .bind(i, r[s].fn), 0),
                r[s].once && i.off(e, r[s].fn, r[s].id));
            return i
        },
        _loadQueue: function() {
            var e = this;
            if (e._queue.length > 0) {
                var t = e._queue[0];
                e.once(t.event, function() {
                    e._queue.shift(),
                    e._loadQueue()
                }),
                t.action()
            }
            return e
        },
        _ended: function(e) {
            var n = this
              , i = e._sprite
              , r = !(!e._loop && !n._sprite[i][2]);
            if (n._emit("end", e._id),
            !n._webAudio && r && n.stop(e._id).play(e._id),
            n._webAudio && r) {
                n._emit("play", e._id),
                e._seek = e._start || 0,
                e._playStart = t.currentTime;
                var s = 1e3 * (e._stop - e._start) / Math.abs(e._rate);
                n._endTimers[e._id] = setTimeout(n._ended.bind(n, e), s)
            }
            return n._webAudio && !r && (e._paused = !0,
            e._ended = !0,
            e._seek = e._start || 0,
            n._clearTimer(e._id),
            e._node.bufferSource = null ,
            o._autoSuspend()),
            n._webAudio || r || n.stop(e._id),
            n
        },
        _clearTimer: function(e) {
            var t = this;
            return t._endTimers[e] && (clearTimeout(t._endTimers[e]),
            delete t._endTimers[e]),
            t
        },
        _soundById: function(e) {
            for (var t = this, n = 0; n < t._sounds.length; n++)
                if (e === t._sounds[n]._id)
                    return t._sounds[n];
            return null 
        },
        _inactiveSound: function() {
            var e = this;
            e._drain();
            for (var t = 0; t < e._sounds.length; t++)
                if (e._sounds[t]._ended)
                    return e._sounds[t].reset();
            return new u(e)
        },
        _drain: function() {
            var e = this
              , t = e._pool
              , n = 0
              , i = 0;
            if (!(e._sounds.length < t)) {
                for (i = 0; i < e._sounds.length; i++)
                    e._sounds[i]._ended && n++;
                for (i = e._sounds.length - 1; i >= 0; i--) {
                    if (t >= n)
                        return;
                    e._sounds[i]._ended && (e._webAudio && e._sounds[i]._node && e._sounds[i]._node.disconnect(0),
                    e._sounds.splice(i, 1),
                    n--)
                }
            }
        },
        _getSoundIds: function(e) {
            var t = this;
            if ("undefined" == typeof e) {
                for (var n = [], i = 0; i < t._sounds.length; i++)
                    n.push(t._sounds[i]._id);
                return n
            }
            return [e]
        },
        _refreshBuffer: function(e) {
            var n = this;
            return e._node.bufferSource = t.createBufferSource(),
            e._node.bufferSource.buffer = c[n._src],
            e._panner ? e._node.bufferSource.connect(e._panner) : e._node.bufferSource.connect(e._node),
            e._node.bufferSource.loop = e._loop,
            e._loop && (e._node.bufferSource.loopStart = e._start || 0,
            e._node.bufferSource.loopEnd = e._stop),
            e._node.bufferSource.playbackRate.value = n._rate,
            n
        }
    };
    var u = function(e) {
        this._parent = e,
        this.init()
    }
    ;
    if (u.prototype = {
        init: function() {
            var e = this
              , t = e._parent;
            return e._muted = t._muted,
            e._loop = t._loop,
            e._volume = t._volume,
            e._muted = t._muted,
            e._rate = t._rate,
            e._seek = 0,
            e._paused = !0,
            e._ended = !0,
            e._sprite = "__default",
            e._id = Math.round(Date.now() * Math.random()),
            t._sounds.push(e),
            e.create(),
            e
        },
        create: function() {
            var e = this
              , n = e._parent
              , i = o._muted || e._muted || e._parent._muted ? 0 : e._volume * o.volume();
            return n._webAudio ? (e._node = "undefined" == typeof t.createGain ? t.createGainNode() : t.createGain(),
            e._node.gain.setValueAtTime(i, t.currentTime),
            e._node.paused = !0,
            e._node.connect(r)) : (e._node = new Audio,
            e._errorFn = e._errorListener.bind(e),
            e._node.addEventListener("error", e._errorFn, !1),
            e._loadFn = e._loadListener.bind(e),
            e._node.addEventListener(s, e._loadFn, !1),
            e._node.src = n._src,
            e._node.preload = "auto",
            e._node.volume = i,
            e._node.load()),
            e
        },
        reset: function() {
            var e = this
              , t = e._parent;
            return e._muted = t._muted,
            e._loop = t._loop,
            e._volume = t._volume,
            e._muted = t._muted,
            e._rate = t._rate,
            e._seek = 0,
            e._paused = !0,
            e._ended = !0,
            e._sprite = "__default",
            e._id = Math.round(Date.now() * Math.random()),
            e
        },
        _errorListener: function() {
            var e = this;
            e._node.error && 4 === e._node.error.code && (o.noAudio = !0),
            e._parent._emit("loaderror", e._id, e._node.error ? e._node.error.code : 0),
            e._node.removeEventListener("error", e._errorListener, !1)
        },
        _loadListener: function() {
            var e = this
              , t = e._parent;
            t._duration = Math.ceil(10 * e._node.duration) / 10,
            0 === Object.keys(t._sprite).length && (t._sprite = {
                __default: [0, 1e3 * t._duration]
            }),
            "loaded" !== t._state && (t._state = "loaded",
            t._emit("load"),
            t._loadQueue()),
            t._autoplay && t.play(),
            e._node.removeEventListener(s, e._loadFn, !1)
        }
    },
    n)
        var c = {}
          , h = function(e) {
            var t = e._src;
            if (c[t])
                return e._duration = c[t].duration,
                f(e),
                void 0;
            if (/^data:[^;]+;base64,/.test(t)) {
                window.atob = window.atob || function(e) {
                    for (var t, n, i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", r = String(e).replace(/=+$/, ""), s = 0, a = 0, o = ""; n = r.charAt(a++); ~n && (t = s % 4 ? 64 * t + n : n,
                    s++ % 4) ? o += String.fromCharCode(255 & t >> (6 & -2 * s)) : 0)
                        n = i.indexOf(n);
                    return o
                }
                ;
                for (var n = atob(t.split(",")[1]), i = new Uint8Array(n.length), r = 0; r < n.length; ++r)
                    i[r] = n.charCodeAt(r);
                p(i.buffer, e)
            } else {
                var s = new XMLHttpRequest;
                s.open("GET", t, !0),
                s.responseType = "arraybuffer",
                s.onload = function() {
                    var t = (s.status + "")[0];
                    return "2" !== t && "3" !== t ? (e._emit("loaderror", null , "Failed loading audio file with status: " + s.status + "."),
                    void 0) : (p(s.response, e),
                    void 0)
                }
                ,
                s.onerror = function() {
                    e._webAudio && (e._html5 = !0,
                    e._webAudio = !1,
                    e._sounds = [],
                    delete c[t],
                    e.load())
                }
                ,
                d(s)
            }
        }
          , d = function(e) {
            try {
                e.send()
            } catch (t) {
                e.onerror()
            }
        }
          , p = function(e, n) {
            t.decodeAudioData(e, function(e) {
                e && n._sounds.length > 0 && (c[n._src] = e,
                f(n, e))
            }, function() {
                n._emit("loaderror", null , "Decoding audio data failed.")
            })
        }
          , f = function(e, t) {
            t && !e._duration && (e._duration = t.duration),
            0 === Object.keys(e._sprite).length && (e._sprite = {
                __default: [0, 1e3 * e._duration]
            }),
            "loaded" !== e._state && (e._state = "loaded",
            e._emit("load"),
            e._loadQueue()),
            e._autoplay && e.play()
        }
        ;
    "function" == typeof define && define.amd && define("howler", [], function() {
        return {
            Howler: o,
            Howl: l
        }
    }),
    "undefined" != typeof exports && (exports.Howler = o,
    exports.Howl = l),
    "undefined" != typeof window ? (window.HowlerGlobal = a,
    window.Howler = o,
    window.Howl = l,
    window.Sound = u) : "undefined" != typeof global && (global.HowlerGlobal = a,
    global.Howler = o,
    global.Howl = l,
    global.Sound = u)
}(),
define("../../core/utils/PageVisibilityListener", ["require", "underscore", "backbone"], function(e) {
    var t = e("underscore")
      , n = e("backbone")
      , i = function() {
        var e = t.isUndefined(document.hidden) ? t.find(["webkit", "moz", "ms"], function(e) {
            return !t.isUndefined(document[e + "Hidden"])
        }) : "";
        return {
            supported: !t.isUndefined(e),
            prefix: e
        }
    }()
      , r = function() {
        this.init()
    }
    ;
    return i.supported ? t.extend(r.prototype, {
        init: function() {
            t.bindAll(this, "onVisibilityChange")
        },
        start: function() {
            document.addEventListener(i.prefix + "visibilitychange", this.onVisibilityChange, !1),
            this.onVisibilityChange()
        },
        stop: function() {
            document.removeEventListener(i.prefix + "visibilitychange", this.onVisibilityChange, !1)
        },
        onVisibilityChange: function() {
            this.trigger("change", this.isVisible())
        },
        isVisible: function() {
            return !("" !== i.prefix ? document[i.prefix + "Hidden"] : document.hidden)
        }
    }) : t.extend(r.prototype, {
        init: function() {
            t.bindAll(this, "onFocus", "onBlur")
        },
        start: function() {
            document.attachEvent ? (document.attachEvent("onfocusin", this.onFocus),
            document.attachEvent("onfocusout", this.onBlur)) : (window.addEventListener("focus", this.onFocus, !1),
            window.addEventListener("blur", this.onBlur, !1))
        },
        stop: function() {
            document.detachEvent ? (document.detachEvent("onfocusin", this.onFocus),
            document.detachEvent("onfocusout", this.onBlur)) : (window.removeEventListener("focus", this.onFocus, !1),
            window.removeEventListener("blur", this.onBlur, !1))
        },
        onFocus: function() {
            this.visible = !0,
            this.trigger("change", this.visible)
        },
        onBlur: function() {
            this.visible = !1,
            this.trigger("change", this.visible)
        },
        isVisible: function() {
            return this.visible
        }
    }),
    t.extend(r.prototype, n.Events),
    r.hasVisibilityApiSupport = function() {
        return i.supported
    }
    ,
    r
}),
define("controllers/AudioManager", ["require", "underscore", "backbone", "howler", "jquery", "TweenMax", "core/utils/PageVisibilityListener"], function(e) {
    var t = e("underscore")
      , n = e("backbone")
      , i = (e("howler"),
    e("jquery"))
      , r = e("TweenMax")
      , s = e("core/utils/PageVisibilityListener")
      , a = {
        BG: {
            allowMultiple: !1
        }
    }
      , o = function(e, t, n) {
        this.channelId = t,
        this.options = n || {},
        this.file = e,
        this.howl = null ,
        this.loaded = !1
    }
    ;
    o.prototype.createHowl = function() {
        return this.howl ? this.howl : (this.howl = new Howl({
            src: [location.origin+"/wordpress-amazon/works/porschemarriage/assets/web/audio/" + this.file + ".mp3"],
            autoplay: !1,
            loop: !!this.options.loop,
            html5: !1
        }),
        this.howl.on("load", t.bind(function() {
            this.loaded = !0
        }, this)),
        this.howl)
    }
    ,
    o.prototype.create = function() {
        var e, s = "playing", a = this.createHowl(), o = {
            play: function() {
                a.play()
            },
            seek: function(e) {
                a.seek(e)
            },
            stop: function(t) {
                "stopped" !== s && (e && a.stop(),
                s = "stopped",
                t || this.trigger("stop"))
            },
            pause: function() {
                "stopped" !== this.state && a.pause()
            },
            unmute: function() {
                var e = i.Deferred();
                return r.to(a, .5, {
                    volume: 1,
                    onComplete: e.resolve
                }),
                e.promise()
            },
            mute: function() {
                var e = i.Deferred();
                return r.to(a, .5, {
                    volume: 0,
                    onComplete: e.resolve
                }),
                e.promise()
            }
        }, l = !!this.options.loop;
        return this.howl.on("end", function() {
            l || o.trigger("ended")
        }),
        t.extend(o, n.Events),
        o
    }
    ;
    var l = function() {
        this._globalVolume = 1,
        this.muted = !1,
        this.activeChannels = {},
        this.restoreMute = !0,
        this.audioFadeInterval = 0,
        s.hasVisibilityApiSupport() && (this.visibilityListener = new s,
        this.listenTo(this.visibilityListener, "change", this.onChangePageVisibility),
        this.visibilityListener.start())
    }
    ;
    return l.prototype = {
        GENERAL: new o("loop","BG",{
            loop: !0
        }),
        $body: i("body"),
        onChangePageVisibility: function(e) {
            e ? this.restoreMute || this.unmute(!0) : (this.restoreMute = this.muted,
            this.mute(!0))
        },
        enableiOSAudio: function() {
            App.env.has("idevice") && Howler.ctx && (console.info("sample rate: " + Howler.ctx.sampleRate),
            44100 !== Howler.ctx.sampleRate && (window.__WRONG_SAMPLERATE__ = Howler.ctx.sampleRate,
            console.warn("wrong sample rate! " + Howler.ctx.sampleRate),
            Howler.unload()),
            Howler._enableMobileAudio())
        },
        preload: function(e, t) {
            e.add(function(e) {
                if (t.loaded)
                    e();
                else {
                    var n = t.createHowl();
                    n.on("load", e)
                }
            })
        },
        play: function(e) {
            if (App.env.has("stock-android"))
                return {
                    play: function() {},
                    stop: function() {},
                    pause: function() {}
                };
            var t = this.activeChannels[e.channelId];
            if (t || (t = this.activeChannels[e.channelId] = []),
            t.length) {
                var n = a[e.channelId];
                n.allowMultiple || this.stopChannel(e.channelId)
            }
            var i = e.create();
            return i.once("ended", function() {
                t.splice(t.indexOf(i), 1)
            }),
            i.once("stop", function() {
                t.splice(t.indexOf(i), 1)
            }),
            i.play(),
            t.push(i),
            i
        },
        stopChannel: function(e) {
            var t = this.activeChannels[e];
            if (t)
                for (console.log("stop channel", e, t.length); t.length; )
                    t.pop().stop(!0)
        },
        pauseChannel: function(e) {
            var n = this.activeChannels[e];
            n && t.each(n, function(e) {
                e.pause()
            }, this)
        },
        fadeOutChannel: function(e) {
            var n = this.activeChannels[e];
            if (n) {
                var r = [];
                return t.each(n, function(e) {
                    r.push(e.mute())
                }, this),
                i.when.apply(null , r)
            }
        },
        fadeInChannel: function(e) {
            var n = this.activeChannels[e];
            if (n) {
                var r = [];
                return t.each(n, function(e) {
                    r.push(e.unmute())
                }, this),
                i.when.apply(null , r)
            }
        },
        rewindChannel: function(e) {
            var n = this.activeChannels[e];
            n && t.each(n, function(e) {
                e.seek(0)
            }, this)
        },
        resumeChannel: function(e) {
            var n = this.activeChannels[e];
            n && t.each(n, function(e) {
                e.play()
            }, this)
        },
        stopAll: function() {
            t.each(t.keys(this.activeChannels), function(e) {
                this.stopChannel(e)
            }, this)
        },
        mute: function(e) {
            clearInterval(this.audioFadeInterval),
            e ? this.globalVolume = 0 : this.audioFadeInterval = setInterval(t.bind(function() {
                var e = this.globalVolume - .08;
                0 >= e && (e = 0,
                clearInterval(this.audioFadeInterval)),
                this.globalVolume = e
            }, this), 100),
            this.muted = !0,
            this.$body.addClass("state-muted"),
            this.trigger("mutechange", !0)
        },
        unmute: function(e) {
            clearInterval(this.audioFadeInterval),
            e ? this.globalVolume = 1 : this.audioFadeInterval = setInterval(t.bind(function() {
                var e = this.globalVolume + .08;
                e >= 1 && (e = 1,
                clearInterval(this.audioFadeInterval)),
                this.globalVolume = e
            }, this), 100),
            this.muted = !1,
            this.$body.removeClass("state-muted"),
            this.trigger("mutechange", !1)
        }
    },
    Object.defineProperty(l.prototype, "globalVolume", {
        get: function() {
            return this._globalVolume
        },
        set: function(e) {
            this._globalVolume = e,
            Howler.volume(e)
        }
    }),
    t.extend(l.prototype, n.Events),
    l
}),
define("view/ZenVideoButtons", ["require", "view/ZenBaseView"], function(e) {
    var t = e("view/ZenBaseView");
    return t.extend({
        initQuickShowPlay: function() {
            $(this.el).empty(),
            this.$el.append(this.template),
            this.triangleSVG = Snap(".custom-vjs-big-play-button .triangle-svg"),
            this.circlesContainer = $(".custom-vjs-big-play-button .circles-svg"),
            this.circlesSVG = Snap(".custom-vjs-big-play-button .circles-svg"),
            this.pauseSVG = Snap(".custom-vjs-big-play-button .pause-svg"),
            this.playbutton = $(".custom-vjs-big-play-button .triangle-svg"),
            this.playing = !1,
            this._drawCircles(),
            this._drawPlayButton(this.triangleSVG),
            this._drawPausebutton(),
            this.triangleFillSVG = this.$(".triangleFill");
            try {
                TweenMax.to(this.triangleFillSVG, 1, {
                    delay: 0,
                    width: 48
                }),
                TweenMax.set([this.$el, this.pauseSVG, this.playbutton], {
                    autoAlpha: 0
                })
            } catch (e) {}
        },
        displayQuickPlayState: function() {
            this.playing = !0,
            TweenMax.set(this.$(".pause-svg"), {
                autoAlpha: 0
            }),
            TweenMax.set(this.$el, {
                autoAlpha: 1
            }),
            TweenMax.to(this.$(".triangle-svg"), .35, {
                delay: .5,
                autoAlpha: 1
            }),
            TweenMax.to(this.$(".triangle-svg"), .35, {
                delay: 1.5,
                autoAlpha: 0,
                onComplete: _.bind(function() {
                    this.playing = !1
                }, this)
            }),
            this._playInOutSpinCircles()
        },
        displayQuickPauseState: function() {
            try {
                this.playing = !0,
                TweenMax.set(this.$(".triangle-svg"), {
                    autoAlpha: 0
                }),
                TweenMax.set(this.$el, {
                    autoAlpha: 1
                }),
                TweenMax.to(this.$(".pause-svg"), .35, {
                    delay: .5,
                    autoAlpha: 1
                }),
                TweenMax.to(this.$(".pause-svg"), .35, {
                    delay: 1.5,
                    autoAlpha: 0,
                    onComplete: _.bind(function() {
                        this.playing = !1
                    }, this)
                }),
                this._playInOutSpinCircles()
            } catch (e) {}
        },
        clear: function() {
            try {
                this.destroyAll()
            } catch (e) {}
        }
    })
}),
define("tpl!templates/chunks/video", [], function() {
    return function(obj) {
        var __t, __p = "";
        with (Array.prototype.join,
        obj || {})
            __p += '\n    <video id="' + (null  == (__t = videoId) ? "" : __t) + '" class="video-js vjs-default-skin" ' + (null  == (__t = poster ? 'poster="'+location.origin+'/wordpress-amazon/works/porschemarriage/assets/web/images/' + poster + '"' : "") ? "" : __t) + ' controls preload="auto"  width="auto" height="auto">\n        ',
            App.settings.mobile ? __p += '\n            <source src="assets/web/videos/mobile/' + (null  == (__t = video) ? "" : __t) + '.mp4" type="video/mp4">\n            <track label="English" kind="subtitles" srclang="en" src="assets/web/videos/mobile/' + (null  == (__t = video) ? "" : __t) + '.vtt"  default>\n        ' : App.settings.tablet ? __p += '\n            <source src="/assets/web/videos/tablet/' + (null  == (__t = video) ? "" : __t) + '.mp4" type="video/mp4">\n            <source src="/assets/web/videos/tablet/' + (null  == (__t = video) ? "" : __t) + '.webm" type="video/webm">\n            <track label="English" kind="subtitles" srclang="en" src="assets/web/videos/tablet/' + (null  == (__t = video) ? "" : __t) + '.vtt"  default>\n        ' : (__p += '\n            <source src='+location.origin+'/wordpress-amazon/works/porschemarriage/assets/web/videos/desktop/' + (null  == (__t = video) ? "" : __t) + '.mp4 type="video/mp4">\n            <source src="/assets/web/videos/desktop/' + (null  == (__t = video) ? "" : __t) + '.webm" type="video/webm">\n            ',
            App.env.has("mozilla") || (__p += '<track label="English" kind="subtitles" srclang="en" src="'+location.origin+'/wordpress-amazon/works/porschemarriage/assets/web/videos/desktop/' + (null  == (__t = video) ? "" : __t) + '.vtt"  default>'),
            __p += "\n        "),
            __p += "\n    </video>\n    ",
            App.settings.mobile && (__p += '\n        <div class="video-mobile-spinner layout-absolute-centered"></div>\n    '),
            __p += "";
        return __p
    }
}),
define("view/VideoView", ["require", "jquery", "backbone", "view/ZenVideoButtons", "TweenMax", "underscore", "tpl!templates/chunks/video"], function(e) {
    var t = e("jquery")
      , n = e("backbone")
      , i = e("view/ZenVideoButtons")
      , r = e("TweenMax")
      , s = e("underscore");
    window.HELP_IMPROVE_VIDEOJS = !1,
    window.VIDEOJS_NO_BASE_THEME = !1;
    var a = {
        init: function(e) {
            this.vidArgs = e,
            this.playingDeferred = t.Deferred(),
            this.loadVideo(e)
        },
        hasAudio: function() {
            return !0
        },
        loadVideo: function(e) {
            s.bindAll(this, "videoEnded", "_initPlayPauseButton");
            var t = this;
            App.videojs.getPlayers()[e.videoId] && (console.debug("old video exists so dispose first"),
            App.videojs.getPlayers()[e.videoId].dispose()),
            this.video = App.videojs(document.getElementById(e.videoId), {
                width: "100%",
                height: "100%",
                inactivityTimeout: 0,
                controls: e && e.controls,
                customSkipButton: !0,
                customControlsOnMobile: !1
            });
            var n = !1;
            this._videoEnded = !1,
            this.video.on("ended", function() {
                t.videoEnded()
            }),
            App.env.has("mozilla") || (this._initPlayPauseButton(),
            this.video.on("pause", s.bind(function() {
                1 == n && 1 == this._playbuttonActive && 0 == this.playbuttonView.playing && 0 == this._videoEnded && t.playbuttonView.displayQuickPauseState()
            }, this)),
            this.video.on("play", s.bind(function() {
                1 == n && 1 == this._playbuttonActive && 0 == this.playbuttonView.playing && 0 == this._videoEnded && t.playbuttonView.displayQuickPlayState()
            }, this))),
            this.video.on("playing", s.bind(function() {
                this.playingDeferred.resolve()
            }, this)),
            this.video.on("seeking", function() {
                n = !1
            }),
            this.video.on("seeked", function() {
                n = !0
            }),
            this.video.on("ready", function() {
                n = !0
            }),
            this.video.muted(App.audio && App.audio.muted),
            this.$el.on("mousemove", s.bind(this.onMouseMove, this)).on("touchstart", s.bind(this.onClick, this)),
            App.audio && App.audio.on("mutechange", this.onGlobalMuteChange, this)
        },
        onClick: function() {
            this.video.paused() ? this.video.play() : this.video.pause()
        },
        onGlobalMuteChange: function(e) {
            e ? this.muteVideo() : this.unmuteVideo()
        },
        _initPlayPauseButton: function() {
            this._playbuttonActive = !0,
            this.playbutton = this.$(".custom-vjs-big-play-button"),
            this.playbuttonView = new i({
                el: this.playbutton
            }),
            this.playbuttonView.initQuickShowPlay(),
            n.Events.on("skipVideo", s.bind(function() {
                try {
                    null  != this.playbuttonView && (this._playbuttonActive = !1,
                    this.playbuttonView.clear(),
                    this.playbuttonView = null )
                } catch (e) {}
            }, this))
        },
        videoEnded: function() {
            if (this._videoEnded = !0,
            this.trigger("allowbgaudio"),
            n.Events.trigger("video-" + this.vidArgs.videoId + "-ended"),
            !App.env.has("mozilla"))
                try {
                    null  != this.playbuttonView && (this.playbutton.clear(),
                    this.playbuttonView = null )
                } catch (e) {}
        },
        muteVideo: function() {
            var e = t.Deferred()
              , n = {
                volume: this.video.volume()
            }
              , i = this;
            return r.to(n, 1, {
                volume: 0,
                onComplete: function() {
                    i.video.muted(!0),
                    e.resolve()
                },
                onUpdate: function() {
                    i.video.volume(n.volume)
                }
            }),
            e.promise()
        },
        unmuteVideo: function() {
            var e = t.Deferred();
            this.video.muted(!1);
            var n = {
                volume: this.video.volume()
            }
              , i = this;
            return r.to(n, 1, {
                volume: 1,
                onComplete: e.resolve,
                onUpdate: function() {
                    i.video.volume(n.volume)
                }
            }),
            e.promise()
        },
        isPaused: function() {
            return this.video.paused()
        },
        playVideo: function() {
            App.env.has("mozilla") || null  != this.playbuttonView || this._initPlayPauseButton();
            var e = t.Deferred()
              , n = this.video.play();
            return n && n.then ? n.then(e.resolve).catch(function() {}) : setTimeout(e.resolve, 50),
            setTimeout(s.bind(function() {
                this.showScrubber(),
                this.$el.addClass("show")
            }, this), 20),
            e.promise()
        },
        showScrubber: function() {
            this.scrubberVisible || (this.scrubberVisible = !0,
            this.$el.addClass("state-scrubber-visible"),
            clearTimeout(this.timeout),
            this.timeout = setTimeout(s.bind(function() {
                this.$el.removeClass("state-scrubber-visible"),
                this.scrubberVisible = !1
            }, this), 3e3))
        },
        onMouseMove: function() {
            this.scrubberVisible || this.showScrubber()
        },
        pauseVideo: function() {
            this.video.pause()
        },
        restartVideo: function(e) {
            if ("beforePageSwap" === e || "reset" === e)
                App.env.has("touch") && (this._playbuttonActive = !1,
                this.video.play(),
                this.video.pause(),
                this.video.currentTime(0));
            else {
                this._playbuttonActive = !1,
                this.video.currentTime(0);
                var n = this;
                t.when(this.playVideo()).then(function() {
                    n._playbuttonActive = !0
                })
            }
        }
    }
      , o = {
        init: function(e) {
            var i = this;
            this.vidArgs = e,
            this.video = this.$("video")[0],
            this.video.addEventListener("ended", function() {
                n.Events.trigger("video-" + e.videoId + "-ended"),
                i.videoEnded()
            }, !1),
            t("video").on("webkitendfullscreen", s.bind(i.videoEnded, this)),
            this.requestFullscreen = this.video.requestFullscreen || this.video.msRequestFullscreen || this.video.mozRequestFullScreen || this.video.webkitRequestFullscreen || this.video.webkitRequestFullScreen
        },
        hasAudio: function() {
            return !0
        },
        isFullScreen: function() {
            return document.fullScreen || document.webkitIsFullScreen
        },
        videoEnded: function() {
            if (this.isFullScreen()) {
                var e = document.webkitCancelFullscreen || document.webkitExitFullscreen;
                e && e.call(document)
            } else if (this.video.webkitDisplayingFullscreen)
                try {
                    this.video.webkitExitFullScreen()
                } catch (t) {}
            this.trigger("allowbgaudio"),
            n.Events.trigger("video-" + this.vidArgs.videoId + "-ended")
        },
        playVideo: function() {
            var e = !1
              , n = App.pages._history.length > 0;
            if (n && App.env.has("idevice") && (this.video.play(),
            e = !0),
            !e) {
                try {
                    this.video.currentTime = 0
                } catch (i) {}
                (!App.env.has("touch") || n) && this.video.play(),
                setTimeout(s.bind(function() {
                    this.$el.addClass("show")
                }, this), 10)
            }
            if (App.env.has("stock-android")) {
                var r = t(t("#vid_html5_api").get(0)).height();
                t("#vid_html5_api").css("margin-top", -Math.round(r / 2))
            }
        },
        isPaused: function() {
            return this.video.paused
        },
        pauseVideo: function() {
            this.video.pause()
        },
        restartVideo: function(e) {
            if ("beforePageSwap" === e || "reset" === e) {
                try {
                    this.video.currentTime = 0
                } catch (t) {}
                this.playVideo()
            }
        },
        muteVideo: function() {
            return t.when()
        },
        unmuteVideo: function() {}
    }
      , l = n.View.extend({
        events: {},
        initialize: function(t) {
            App.settings.mobile ? s.extend(this, o) : s.extend(this, a),
            this.initialHtml = e("tpl!templates/chunks/video")({
                video: t.video,
                videoId: t.videoId,
                poster: t.poster
            }),
            this.$el.html(this.initialHtml),
            this.init(t)
        }
    });
    return l
}),
define("tpl!templates/chunks/video-loop", [], function() {
    return function(obj) {
        var __t, __p = "";
        with (Array.prototype.join,
        obj || {})
            __p += '<video src='+location.origin+'/wordpress-amazon/works/porschemarriage/assets/web/videos/desktop/' + (null  == (__t = video) ? "" : __t) + '.mp4 preload="auto" ' + (null  == (__t = poster ? 'poster="/wordpress-amazon/works/porschemarriage/assets/web/images/' + poster + '"' : "") ? "" : __t) + " " + (null  == (__t = loop ? "loop" : "") ? "" : __t) + " " + (null  == (__t = muted ? "muted" : "") ? "" : __t) + ">\n",
            1 == audio && (__p += "\n        ",
            App.env.has("mozilla") || (__p += '<track label="English" kind="subtitles" srclang="en" src="assets/web3/videos/desktop/' + (null  == (__t = video) ? "" : __t) + '.vtt"  default>'),
            __p += "\n    "),
            __p += "\n</video>\n";
        return __p
    }
}),
define("view/BackgroundVideoView", ["require", "jquery", "backbone", "TweenMax", "underscore", "tpl!templates/chunks/video-loop"], function(e) {
    var t = e("jquery")
      , n = e("backbone")
      , i = e("TweenMax")
      , r = e("underscore")
      , s = {
        type: "backgroundVideo",
        init: function(t) {
            var n = this.defaultMuted = !(t && t.audio);
            t && (this.args = t),
            App.audio && App.audio.muted && (n = !0),
            this.initialHtml = e("tpl!templates/chunks/video-loop")({
                video: this.args.video,
                audio: this.args.audio,
                poster: this.args.poster,
                muted: n,
                videoId: this.args.videoId,
                loop: this.args.loop
            }),
            this.$el.html(this.initialHtml),
            this.restoreBgAudio = !0,
            this.$video = this.$("video");
            var i = this;
            this.$video.on("ended", function() {
                i.args.loopLastPart && i.restartLoop()
            }),
            this.$video.on("playing", function() {
                i.$el.removeClass("hidden")
            }),
            this.$video.on("timeupdate", function() {
                i.trigger("timeupdate", i.$video.get(0).currentTime)
            }),
            App.audio && App.audio.on("mutechange", this.onGlobalMuteChange, this)
        },
        hasAudio: function() {
            return this.args && this.args.audio
        },
        onGlobalMuteChange: function(e) {
            this.defaultMuted || (e ? this.muteVideo() : this.unmuteVideo())
        },
        restartLoop: function() {
            if (this.args && this.args.audio && App.audio && this.restoreBgAudio && (this.$video[0].muted = !0,
            this.trigger("allowbgaudio"),
            this.restoreBgAudio = !1,
            this.defaultMuted = !0),
            this.$video[0].currentTime = this.args.loopFrom,
            this.$video[0].seeking) {
                var e = this;
                this.$video.one("seeked", function() {
                    e.$video[0].play()
                })
            } else
                this.$video[0].play()
        },
        playVideo: function() {
            this.$video[0].play()
        },
        pauseVideo: function() {
            this.$video[0].pause()
        },
        restartVideo: function(e) {
            if ("reset" !== e && "beforePageSwap" != e)
                if (isNaN(this.$video[0].duration) || (this.$video[0].currentTime = this.args.startingPoint ? this.args.startingPoint : 0),
                this.$video[0].seeking) {
                    var t = this;
                    this.$video.one("seeked", function() {
                        t.$video[0].play(),
                        App.pageSwapper.getPageView().$el.addClass("state-videoRestarted")
                    })
                } else
                    App.pageSwapper.getPageView().$el.addClass("state-videoRestarted"),
                    this.$video[0].play()
        },
        muteVideo: function() {
            var e = t.Deferred()
              , n = this;
            return i.to(this.$video.get(0), .5, {
                volume: 0,
                onComplete: function() {
                    n.$video.get(0).muted = !0,
                    e.resolve()
                }
            }),
            e.promise()
        },
        unmuteVideo: function() {
            var e = t.Deferred();
            return this.defaultMuted ? e.resolve() : (this.$video.get(0).muted = !1,
            i.to(this.$video.get(0), .5, {
                volume: 1,
                onComplete: e.resolve
            })),
            e.promise()
        },
        playing: function() {
            return t.when()
        }
    }
      , a = {
        init: function(e) {
            this.args = e,
            this.autoplay = !1,
            this.destroyed = !1,
            requirejs(["jsmpeg"], r.bind(this.onJSMPEGLoaded, this)),
            this.scriptLoaded = t.Deferred(),
            this.setLoopVideoSource()
        },
        onJSMPEGLoaded: function(e) {
            this.jsmpeg = e,
            this.loopCanvas = document.createElement("canvas"),
            this.loopCanvas.setAttribute("data-loop", ""),
            this.$el.append(this.loopCanvas),
            this.scriptLoaded.resolve()
        },
        setLoopVideoSource: function() {
            this.scriptLoaded.then(r.bind(function() {
                this.destroyed || (this.player && this.player.stop(),
                this.player = new this.jsmpeg("assets/web2/videos/" + (App.settings.tablet ? "tablet/" : "mobile/") + this.args.video + (App.settings.tablet ? "-tablet" : "-mobile") + ".mpg",{
                    canvas: this.loopCanvas,
                    autoplay: this.autoplay,
                    loop: !!this.args.loop,
                    seekable: !0,
                    onload: r.bind(this.onVideoLoaded, this),
                    onfinished: r.bind(this.onVideoFinished, this)
                }))
            }, this))
        },
        onVideoLoaded: function() {
            App.pageSwapper.getPageView().$el.addClass("state-videoLoaded")
        },
        hasAudio: function() {
            return !1
        },
        playVideo: function() {
            this.player ? this.player.play() : this.autoplay = !0
        },
        pauseVideo: function() {
            this.player ? this.player.pause() : this.autoplay = !1
        },
        restartVideo: function(e) {
            "afterPageSwap" === e && (App.pageSwapper.getPageView().$el.addClass("state-videoRestarted"),
            this.player && this.player.seekToTime(this.args.startingPoint ? this.args.startingPoint : 0),
            this.playVideo())
        },
        muteVideo: function() {},
        unmuteVideo: function() {},
        restartLoop: function() {},
        playing: function() {
            return t.when()
        },
        onVideoFinished: function() {
            this.args && this.args.loopLastPart && (this.player.seekToTime(this.args.loopFrom, !0),
            this.player.play()),
            this.trigger("allowbgaudio")
        }
    }
      , o = {
        init: function() {},
        playVideo: function() {},
        restartVideo: function() {},
        pauseVideo: function() {},
        muteVideo: function() {},
        unmuteVideo: function() {},
        restartLoop: function() {},
        hasAudio: function() {
            return !1
        }
    };
    return n.View.extend({
        events: {},
        initialize: function(e) {
            var t = App.settings.tablet || App.settings.mobile;
            !t || App.settings.tablet && e.forceDesktopBehaviour ? r.extend(this, s) : t && (App.settings.tablet || App.env.has("stock-android") || App.env.has("ie") ? r.extend(this, o) : r.extend(this, a)),
            this.init(e)
        }
    })
}),
define("tpl!templates/chunks/button-svg", [], function() {
    return function(obj) {
        var __p = "";
        with (Array.prototype.join,
        obj || {})
            __p += '<svg>\n\n    <rect rx="1" ry="1" class="js-rect1" x="4.5" y="4.5" fill="none" stroke="#FFFFFF" stroke-width="1" />\n    <rect rx="1" ry="1"  class="js-rect1bg" x="4.5" y="4.5" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1" />\n\n    <rect rx="1" ry="1"  transform="rotate(180, 85.5, 22.5)" class="js-rect2" x="4.5" y="4.5" fill="none" stroke="#FFFFFF" stroke-width="1" />\n    <rect rx="1" ry="1"  transform="rotate(180, 85.5, 22.5)" class="js-rect2bg" x="4.5" y="4.5" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1" />\n\n</svg>';
        return __p
    }
}),
define("view/ButtonView", ["require", "jquery", "backbone", "TweenMax", "tween_easing", "tween_svg_plugin", "underscore", "tpl!templates/chunks/button-svg"], function(e) {
    var t = e("jquery")
      , n = e("backbone")
      , i = e("TweenMax");
    return e("tween_easing"),
    e("tween_svg_plugin"),
    e("underscore"),
    n.View.extend({
        template: e("tpl!templates/chunks/button-svg")({}),
        animationTime: .3,
        easing: Power2.easeOut,
        events: {
            mouseenter: "onMouseEnter",
            mouseleave: "onMouseLeave",
            touchstart: "onMouseEnter",
            touchend: "onMouseLeave",
            click: "onClick"
        },
        initialize: function() {
            if (!(this.$el.hasClass("content-mobile") && !App.settings.mobile || this.$el.hasClass("content-desktop") && App.settings.mobile || (this.$el.append(this.template),
            this.width = this.$el.outerWidth(),
            this.height = this.$el.outerHeight(),
            !this.width || 0 == this.width || !this.height || 0 == this.height))) {
                this.width > 220 && (this.width = 220),
                this.$el.css("width", this.width + 2 + "px"),
                this.rect1 = this.$(".js-rect1")[0],
                this.rect2 = this.$(".js-rect2")[0],
                this.rect1bg = this.$(".js-rect1bg")[0],
                this.rect2bg = this.$(".js-rect2bg")[0],
                i.set([this.rect1, this.rect2, this.rect1bg, this.rect2bg], {
                    autoAlpha: 1
                }),
                App.env.has("mozilla") && "none" === this.$el.css("display") || (i.set(this.rect1, {
                    drawSVG: "50% 50%"
                }),
                i.set(this.rect2, {
                    drawSVG: "50% 50%"
                }));
                var e = this;
                i.set(this.rect1, {
                    attr: {
                        width: e.width - 9,
                        height: e.height - 9
                    }
                }),
                i.set(this.rect2, {
                    attr: {
                        width: e.width - 9,
                        height: e.height - 9
                    }
                }),
                i.set(this.rect1bg, {
                    attr: {
                        width: e.width - 9,
                        height: e.height - 9
                    }
                }),
                i.set(this.rect2bg, {
                    attr: {
                        width: e.width - 9,
                        height: e.height - 9
                    }
                }),
                this.rect2.setAttribute("transform", "rotate(180, " + e.width / 2 + ", " + e.height / 2 + ")"),
                this.rect2bg.setAttribute("transform", "rotate(180, " + e.width / 2 + ", " + e.height / 2 + ")"),
                this.animating = !1,
                this.href = this.$el.attr("data-href"),
                this.flow = this.$el.attr("data-flow")
            }
        },
        onMouseEnter: function() {
            if (!this.expanded) {
                var e = this;
                i.set([this.rect1, this.rect2, this.rect1bg, this.rect2bg], {
                    autoAlpha: 1
                }),
                App.env.has("mozilla") && "none" === this.$el.css("display") || i.to(this.rect1, this.animationTime, {
                    drawSVG: "0% 100%",
                    attr: {
                        x: "0.5",
                        width: e.width - 1
                    },
                    ease: this.ease
                }),
                i.to(this.rect1bg, this.animationTime, {
                    attr: {
                        x: "0.5",
                        width: e.width - 1
                    },
                    ease: this.ease
                }),
                App.env.has("mozilla") && "none" === this.$el.css("display") || i.to(this.rect2, this.animationTime, {
                    drawSVG: "0% 100%",
                    attr: {
                        y: "0.5",
                        height: e.height - 1
                    },
                    ease: this.ease
                }),
                i.to(this.rect2bg, this.animationTime, {
                    attr: {
                        y: "0.5",
                        height: e.height - 1
                    },
                    ease: this.ease
                })
            }
        },
        onMouseLeave: function(e) {
            if (!this.animating && !this.expanded) {
                var t = this;
                i.set([this.rect1, this.rect2, this.rect1bg, this.rect2bg], {
                    autoAlpha: 1
                }),
                App.env.has("mozilla") && "none" === this.$el.css("display") || i.to(this.rect1, this.animationTime, {
                    drawSVG: "50% 50%",
                    attr: {
                        x: "4.5",
                        width: t.width - 9
                    },
                    ease: this.ease
                }),
                i.to(this.rect1bg, this.animationTime, {
                    attr: {
                        x: "4.5",
                        width: t.width - 9
                    },
                    ease: this.ease
                }),
                App.env.has("mozilla") && "none" === this.$el.css("display") || i.to(this.rect2, this.animationTime, {
                    drawSVG: "50% 50%",
                    attr: {
                        y: "4.5",
                        height: t.height - 9
                    },
                    ease: this.ease
                }),
                i.to(this.rect2bg, this.animationTime, {
                    attr: {
                        y: "4.5",
                        height: t.height - 9
                    },
                    ease: this.ease,
                    onComplete: function() {
                        "expand" == e && t.expand()
                    }
                })
            }
        },
        onClick: function(e) {
            var r = this;
            if (!this.expanded) {
                if (this.$el.hasClass("js-button-email"))
                    return this.onMouseLeave("expand"),
                    void 0;
                if (this.$el.hasClass("js-button-skip"))
                    n.Events.trigger("skipVideo");
                else if (this.$el.hasClass("js-button-social"))
                    return this.onMouseLeave(),
                    void 0;
                if (!t(e.currentTarget).attr("href")) {
                    this.animating = !0,
                    this.$el.addClass("state-js-animate");
                    var s = App.settings.mobile || App.settings.tablet;
                    if (this.href || (this.href = this.$el.attr("data-href")),
                    this.flow || (this.flow = this.$el.attr("data-flow")),
                    s)
                        return r.href && App.pages.gotoPage(r.href, {
                            flow: r.flow
                        }),
                        void 0;
                    "about" == App.pages.getPagePath().slice() && (t("body").addClass("state-animateAbout"),
                    App.pageSwapper.getPageView().$el.removeClass("state-active")),
                    i.set([this.rect1, this.rect2, this.rect1bg, this.rect2bg], {
                        autoAlpha: 1
                    }),
                    App.env.has("mozilla") && "none" === this.$el.css("display") || (i.to(this.rect1, this.animationTime, {
                        drawSVG: "50% 50%",
                        ease: this.ease
                    }),
                    i.to(this.rect1bg, this.animationTime, {
                        drawSVG: "50% 50%",
                        ease: this.ease
                    }),
                    i.to(this.rect2, this.animationTime, {
                        drawSVG: "50% 50%",
                        ease: this.ease
                    }),
                    i.to(this.rect2bg, this.animationTime, {
                        drawSVG: "50% 50%",
                        ease: this.ease
                    })),
                    i.to(this.$el, this.animationTime, {
                        opacity: 0,
                        ease: this.ease,
                        delay: this.animationTime / 2,
                        onComplete: function() {
                            r.animating = !1,
                            r.$el.removeClass("state-js-animate"),
                            s || r.gotoSamePage || r.href && App.pages.gotoPage(r.href, {
                                flow: r.flow
                            })
                        }
                    })
                }
            }
        },
        resetButton: function() {},
        expand: function() {
            var e = this;
            this.$el.addClass("state-js-animate"),
            this.$el.addClass("state-expanded"),
            this.animating = !0,
            this.expanded = !0,
            i.to(this.rect1bg, this.animationTime, {
                opacity: 0,
                ease: this.ease
            }),
            i.to(this.rect2bg, this.animationTime, {
                opacity: 0,
                ease: this.ease
            }),
            i.to(this.$el, this.animationTime, {
                width: 400,
                ease: this.ease,
                delay: .1,
                onComplete: function() {
                    e.animating = !1,
                    e.$el.find(".js-input-email").focus()
                }
            })
        },
        contract: function() {
            var e = this;
            this.$el.addClass("state-js-animate"),
            this.animating = !0,
            e.$el.removeClass("state-expanded"),
            i.to(this.rect1bg, this.animationTime, {
                opacity: 1,
                ease: this.ease,
                delay: .2
            }),
            i.to(this.rect2bg, this.animationTime, {
                opacity: 1,
                ease: this.ease,
                delay: .2
            }),
            i.to(this.$el, this.animationTime, {
                width: e.width,
                ease: this.ease,
                onComplete: function() {
                    e.expanded = !1,
                    e.animating = !1
                }
            })
        }
    })
}),
define("view/ZenPlayButtonView", ["require", "view/ZenBaseView"], function(e) {
    var t = e("view/ZenBaseView");
    return t.extend({
        delayedShow: null ,
        initPlayButton: function() {
            _.bindAll(this, "onMouseOverPlayButton", "onMouseOutPlayButton", "_setAnimationsPlaybutton"),
            $(this.el).empty(),
            this.$el.append(this.template),
            TweenMax.set(this.$el, {
                opacity: 0
            }),
            this.circlesContainer = $(".js-btn-video .circles-svg"),
            this.circlesSVG = Snap(".js-btn-video .circles-svg"),
            this.triangleSVG = Snap(".js-btn-video .triangle-svg")
        },
        show: function() {
            this.$el.removeClass("hidden"),
            this._drawPlayButton(this.triangleSVG),
            this._drawCircles(),
            this._setAnimationsPlaybutton(),
            this.triangleFillSVG = this.$(".triangleFill"),
            TweenMax.to(this.$el, .45, {
                opacity: 1,
                delay: .2
            }),
            TweenMax.fromTo(this.triangleFillSVG, 1, {
                opacity: 0
            }, {
                opacity: 1,
                delay: 1.2
            }),
            TweenMax.from([this.circles[0], this.circlesOver[0]], .95, {
                xPercent: 50,
                delay: .9,
                ease: Power1.easeInOut
            }),
            TweenMax.from([this.circles[1], this.circlesOver[1]], .95, {
                xPercent: -50,
                delay: .9,
                ease: Power1.easeInOut
            }),
            TweenMax.from([this.circles[2], this.circlesOver[2]], .95, {
                yPercent: 50,
                delay: .9,
                ease: Power1.easeInOut
            }),
            TweenMax.from([this.circles[3], this.circlesOver[3]], .95, {
                yPercent: -50,
                delay: .9,
                ease: Power1.easeInOut
            }),
            TweenMax.from(this.circlesContainer, 3, {
                rotation: 360,
                delay: 0,
                ease: Power0.easeOut
            }),
            App.env.has("mozilla") && "none" === this.$el.css("display") || TweenMax.set(this.circlesOver, {
                drawSVG: "100%"
            })
        },
        onMouseOverPlayButton: function() {
            this._setAnimationsPlaybutton(),
            TweenMax.to(this.$(".triangleFill"), 1, {
                delay: 0,
                width: 48
            }),
            this.fullSpin.seek(0),
            this.fullSpin.play(),
            App.env.has("mozilla") && "none" === this.$el.css("display") || TweenMax.set(this.circlesOver, {
                drawSVG: "100%"
            }),
            TweenMax.to([this.circles[0], this.circlesOver[0]], this._circleExpandSpeed, {
                xPercent: this.circlEndState,
                opacity: 1,
                delay: 0,
                ease: Power1.easeInOut,
                overwrite: 1,
                force3D: !0
            }),
            TweenMax.to([this.circles[1], this.circlesOver[1]], this._circleExpandSpeed, {
                xPercent: -this.circlEndState,
                opacity: 1,
                delay: 0,
                ease: Power1.easeInOut,
                overwrite: 1,
                force3D: !0
            }),
            TweenMax.to([this.circles[2], this.circlesOver[2]], this._circleExpandSpeed, {
                yPercent: this.circlEndState,
                opacity: 1,
                delay: 0,
                ease: Power1.easeInOut,
                overwrite: 1,
                force3D: !0
            }),
            TweenMax.to([this.circles[3], this.circlesOver[3]], this._circleExpandSpeed, {
                yPercent: -this.circlEndState,
                opacity: 1,
                delay: 0,
                ease: Power1.easeInOut,
                overwrite: 1,
                force3D: !0
            }),
            this.tl = new TimelineMax({
                delay: .5,
                repeat: -1,
                repeatDelay: 0,
                yoyo: !0
            }),
            this.tl.add([TweenMax.to([this.circles[0], this.circlesOver[0]], 2, {
                xPercent: 43,
                ease: Power1.easeInOut
            }), TweenMax.to([this.circles[1], this.circlesOver[1]], 2.2, {
                xPercent: -43,
                ease: Power1.easeInOut
            }), TweenMax.to([this.circles[2], this.circlesOver[2]], 2, {
                yPercent: 43,
                ease: Power1.easeInOut
            }), TweenMax.to([this.circles[3], this.circlesOver[3]], 2.3, {
                yPercent: -43,
                ease: Power1.easeInOut
            })]),
            this.tl.play(),
            this._initLineanimations()
        },
        onMouseOutPlayButton: function() {
            this._setAnimationsPlaybutton(),
            TweenMax.to(this.$(".triangleFill"), 1, {
                delay: 0,
                width: 0
            }),
            this.fullSpin.stop(),
            this.tl.stop(),
            TweenMax.killTweensOf(".circle"),
            TweenMax.killTweensOf(".circle-over"),
            this.tl = null ,
            TweenMax.to(this.circlesContainer, .6, {
                rotation: 0,
                delay: 0,
                ease: Power0.easeNone
            }),
            TweenMax.to(this.circles, this._circleContractSpeed, {
                yPercent: 0,
                xPercent: 0,
                opacity: .5,
                ease: Power1.easeInOut,
                overwrite: 1
            }),
            TweenMax.to(this.circlesOver, this._circleContractSpeed, {
                yPercent: 0,
                xPercent: 0,
                opacity: 0,
                ease: Power1.easeInOut,
                overwrite: 1
            })
        },
        closeButton: function() {
            TweenMax.to(this.circlesContainer, .6, {
                rotation: 0,
                delay: 0,
                ease: Power0.easeNone
            }),
            TweenMax.to(this.$(".triangle-svg"), .4, {
                opacity: 0,
                delay: .3
            }),
            TweenMax.to([this.circles, this.circlesOver], this._circleContractSpeed, {
                yPercent: 0,
                xPercent: 0,
                opacity: 0,
                ease: Power1.easeInOut,
                overwrite: 1
            })
        }
    })
}),
define("../../core/utils/VisibilityToggle", ["require", "underscore", "jquery", "core/utils/PageVisibilityListener"], function(e) {
    var t = e("underscore")
      , n = e("jquery")
      , i = e("core/utils/PageVisibilityListener")
      , r = document.createElement("div")
      , s = function() {
        return t.find({
            transition: {
                end: "transitionend"
            },
            WebkitTransition: {
                end: "webkitTransitionEnd"
            },
            MSTransition: {
                end: "MSTransitionEnd"
            },
            MozTransition: {
                end: "transitionend"
            },
            OTransition: {
                end: "oTransitionEnd otransitionend"
            }
        }, function(e, n) {
            return !t.isUndefined(r.style[n])
        })
    }()
      , a = function() {
        return t.find({
            animation: {
                end: "animationend",
                playState: "animationPlayState"
            },
            WebkitAnimation: {
                end: "webkitAnimationEnd",
                playState: "webkitAnimationPlayState"
            },
            MSAnimation: {
                end: "MSAnimationEnd",
                playState: "msAnimationPlayState"
            },
            MozAnimation: {
                end: "animationend",
                playState: "animationPlayState"
            },
            OAnimation: {
                end: "oAnimationEnd oanimationend",
                playState: "oAnimationPlayState"
            }
        }, function(e, n) {
            return !t.isUndefined(r.style[n])
        })
    }()
      , o = [];
    s && o.push(s.end),
    a && o.push(a.end);
    var l = function(e) {
        t.bindAll(this, "onCSSHideFinished", "_finishHide"),
        e = t.defaults(e || {}, {
            cssClass: null ,
            hideDelay: null ,
            defaultShown: !0
        }),
        this.cssClass = e.cssClass,
        this.hideDelay = e.hideDelay,
        this.$el = e.$el || e.el,
        this.useCSSEvents = o.length > 0 && null  === this.hideDelay,
        this.hideDeferred = null ,
        this.isShown = e.defaultShown,
        this.showTimeout = 0,
        this.animationPlaying = !0,
        this.visibilityListener = new i,
        this.$el.jquery || (this.$el = n(this.$el))
    }
    ;
    return l.prototype.toggle = function() {
        this.isShown ? this.hide() : this.show()
    }
    ,
    l.prototype.show = function() {
        if (!this.isShown && (this._deattachHideCompleteListener(),
        this._deattachPageHideListener(),
        this.$el.attr("hidden", !1).css("display", "block"),
        this.hideDeferred = null ,
        this.isShown = !0,
        null  !== this.cssClass)) {
            this._setAnimationPlaying(!1),
            t.isObject(this.cssClass) && this.$el.removeClass(this.cssClass.hide);
            var e = this;
            this.showTimeout = setTimeout(function() {
                e._setShowClass(),
                e._setAnimationPlaying(!0)
            }, 16)
        }
    }
    ,
    l.prototype.hide = function(e) {
        return this.isShown ? (this.hideDeferred = n.Deferred(),
        this.isShown = !1,
        clearTimeout(this.showTimeout),
        null  !== this.cssClass ? e ? (this._setAnimationPlaying(!1),
        this._setHideClass(),
        this._finishHide()) : (this._attachHideCompleteListener(),
        this._attachPageHideListener(),
        this._setAnimationPlaying(!0),
        this._setHideClass()) : this._finishHide(),
        this.hideDeferred.promise()) : this.hideDeferred
    }
    ,
    l.prototype.onCSSHideFinished = function(e) {
        e.target === this.$el.get(0) && this._finishHide()
    }
    ,
    l.prototype._finishHide = function() {
        this._deattachPageHideListener(),
        this._deattachHideCompleteListener(),
        this._setAnimationPlaying(!1),
        this.$el.attr("hidden", !0).css("display", "none"),
        this.hideDeferred.resolve()
    }
    ,
    l.prototype._attachPageHideListener = function() {
        this.visibilityListener.isVisible() && i.hasVisibilityApiSupport() && this.visibilityListener.on("change", this._finishHide)
    }
    ,
    l.prototype._deattachPageHideListener = function() {
        this.visibilityListener.off("change", this._finishHide)
    }
    ,
    l.prototype._deattachHideCompleteListener = function() {
        this.useCSSEvents && this.$el.off(o.join(" "), this.onCSSHideFinished)
    }
    ,
    l.prototype._attachHideCompleteListener = function() {
        this.useCSSEvents ? this.$el.one(o.join(" "), this.onCSSHideFinished) : setTimeout(this._finishHide, Math.max(this.hideDelay, 0))
    }
    ,
    l.prototype._setShowClass = function() {
        t.isObject(this.cssClass) ? this.$el.addClass(this.cssClass.show) : this.$el.addClass(this.cssClass)
    }
    ,
    l.prototype._setHideClass = function() {
        t.isObject(this.cssClass) ? this.$el.removeClass(this.cssClass.show).addClass(this.cssClass.hide) : this.$el.removeClass(this.cssClass)
    }
    ,
    l.prototype._setAnimationPlaying = function(e) {
        this.animationPlaying !== e && (this.animationPlaying = e,
        a && this.cssClass && this.$el.css(a.playState, e ? "running" : "paused"))
    }
    ,
    l
}),
define("../../core/view/page/BasicPageView", ["require", "underscore", "core/utils/url", "backbone", "jquery", "core/utils/VisibilityToggle", "core/assets/AssetManager"], function(e) {
    var t = e("underscore")
      , n = e("core/utils/url")
      , i = e("backbone")
      , r = e("jquery")
      , s = e("core/utils/VisibilityToggle")
      , a = e("core/assets/AssetManager")
      , o = function() {}
    ;
    o.prototype = {
        cssClass: null ,
        hideDelay: null 
    };
    var l = i.View.extend({
        $isPageView: !0,
        baseTemplateData: {},
        template: null ,
        templateURL: null ,
        autoRender: !0,
        preloadTemplateContents: !0,
        allowScripts: !1,
        ignoreRootElement: !1,
        cssClass: void 0,
        hideDelay: void 0,
        _loadedTemplateURL: null ,
        _loaded: null ,
        _needRender: !0,
        _shown: !1,
        preloadAssets: function() {},
        initTemplateData: function() {
            return {}
        },
        initViews: function() {},
        transitionIn: function() {},
        transitionOut: function() {
            return !0
        },
        destroyOnHide: function() {
            return !1
        },
        initialize: function(e) {
            t.extend(this, t.pick(e, "destroyOnHide", "templateURL", "template", "autoRender", "preloadTemplateContents", "allowScripts", "cssClass", "hideDelay", "ignoreRootElement")),
            (!this.$el.length || this.$el.data("path") && this.$el.data("path") !== this.model.get("path").toString()) && this.setElement(this.createElement()),
            (this.$el.parent().length > 0 || !this.getResolvedTemplateURL()) && (this._loaded = r.when(),
            this._loadedTemplateURL = this.getResolvedTemplateURL()),
            this.templateURL || "string" != typeof this.template || (this.template = t.template(this.template));
            var e = new o;
            e.el = this.$el,
            t.isUndefined(this.hideDelay) || (e.hideDelay = this.hideDelay),
            t.isUndefined(this.cssClass) || (e.cssClass = this.cssClass),
            this.visibility = new s(e)
        },
        createElement: function() {
            var e = document.createElement(t.result(this, "tagName"))
              , n = t.result(this, "id");
            n && (e.id = n);
            var i = t.result(this, "className");
            return i && (e.className = i),
            t.each(t.result(this, "attributes"), function(t, n) {
                e.setAttribute(n, t)
            }),
            e
        },
        isLoaded: function() {
            return !this.hasChangedTemplateURL() && this._loaded && "resolved" === this._loaded.state()
        },
        hasChangedTemplateURL: function() {
            return this.templateURL && this._loadedTemplateURL !== this.getResolvedTemplateURL()
        },
        getResolvedTemplateURL: function() {
            var e = t.result(this, "templateURL");
            return e ? i.history.constructor.started && i.history._hasPushState ? n.resolve(i.history.root, e) : n.isAbsolute(e) ? e.match(/^\/[^/]/) ? "//" + document.location.host + e : e : n.resolve("../", e) : null 
        },
        abortLoad: function() {
            this.isLoaded() || (this._loaded && this._loaded.reject(),
            this._loaded = null )
        },
        load: function() {
            if (this.hasChangedTemplateURL()) {
                this._loaded = r.Deferred(),
                this._loadedTemplateURL = this.getResolvedTemplateURL(),
                console.debug("Load page template " + this._loadedTemplateURL);
                var e = a.createPreloader();
                e.addHTML(this._loadedTemplateURL, this.preloadTemplateContents, this.el),
                this.preloadAssets(e),
                e.start(t.bind(this.onTemplateLoaded, this), t.bind(this.onTemplateError, this)),
                this.trigger("loadstart")
            }
            return this._loaded.promise()
        },
        onTemplateError: function(e) {
            this._loaded.reject(e),
            this.trigger("loaderror", e)
        },
        onTemplateLoaded: function() {
            console.debug("Page template " + this._loadedTemplateURL + " was loaded");
            var e = a.getAsset(this._loadedTemplateURL);
            console.assert(null  !== e, "Page template contents was not found!"),
            this.template = t.template(e),
            this._needRender = !0,
            a.forgetAsset(this._loadedTemplateURL),
            this._loaded.resolve(),
            this.trigger("loaddone")
        },
        _renderTemplate: function() {
            var e, n = t.extend(this.initTemplateData() || {}, t.result(this, "baseTemplateData"));
            try {
                e = r.parseHTML(this.template(n), document, this.allowScripts)
            } catch (i) {
                throw new Error("The template could not be rendered. Reason: " + i.message)
            }
            this.ignoreRootElement && (e = r(e).children()),
            this.$el.empty().append(e)
        },
        render: function() {
            console.debug("Rendering page template"),
            this.el.setAttribute("data-path", this.model.get("path").toString()),
            this.template && this._renderTemplate(),
            this.initViews();
            var e = this.events;
            return "function" == typeof e && (e = e()),
            e !== l.prototype.events && (e = t.extend({}, l.prototype.events, e)),
            this.delegateEvents(e),
            this
        },
        show: function() {
            this._shown = !0,
            this.visibility.show()
        },
        hide: function() {
            return this._shown = !1,
            this.visibility.hide()
        },
        _autoRender: function() {
            this.autoRender && this._needRender && (this.render(),
            this._needRender = !1)
        }
    });
    return Object.defineProperty && Object.defineProperty(l.prototype, "args", {
        get: function() {
            return console.warn("this.args is deprecated! Please use this.model.get('args')"),
            this.model.get("args")
        }
    }),
    l.prototype.defaultVisibilityOptions = o.prototype,
    l
}),
define("tpl!templates/popups/conditions", [], function() {
    return function(obj) {
        var __p = "";
        with (Array.prototype.join,
        obj || {})
            __p += '<div class="popup popup-conditions">\n    <section class="section section-scrollable">\n        <div class="section-inner">\n            <div class="btn-close js-btn-closepopup"></div>\n            <div class="layout-wrap">\n                <h2 class="layout-marginbottom">\n                    Actievoorwaarden<br>Porsche Marriage\n                </h2>\n                <div class="font-left">\n                    <h4>Artikel 1 Algemeen</h4>\n                    <ol>\n                        <li>Deze voorwaarden zijn van toepassing op de actie <strong>‘Porsche Marriage’</strong> (hierna te noemen: “Actie”).</li>\n                        <li>De Actie wordt georganiseerd door Pon’s Automobielhandel B.V., Business Unit Porsche, gevestigd aan de Zuiderinslag 8, 3833 BP te Leusden (hierna te noemen: “Porsche”) en is door ACHTUNG! ontwikkeld voor Porsche.</li>\n                        <li>De Actie vindt online plaats op www.porsche.nl/porschemarriage (hierna te noemen: “Site”).</li>\n                        <li>De Actieperiode loopt van dinsdag 19 april 2016 vanaf 12.00 uur tot en met dinsdag 31 mei 2016 23:59:59 uur. Na afloop van de actieperiode is deelname niet langer mogelijk en kan niet meer worden meegedongen naar de prijs (hierna: de “Prijs”).</li>\n                        <li>Door deelname verklaart de deelnemer uitdrukkelijk van deze actievoorwaarden kennis te hebben genomen en daarmee in te stemmen.</li>\n\n                        <h4>Artikel 2 Deelname</h4>\n                        <li>Deelname aan deze Actie is mogelijk voor een ieder die woonachtig is in Nederland, minimaal 27 jaar is en minimaal 5 jaar in het bezit is van een geldig rijbewijs. Dat geldt voor alle individuele deelnemers.</li>\n                        <li>Geen van de 4 leden van een Deelnemersgroep mag in het verleden een wettelijke rijontzegging hebben gekregen, ongeacht de reden. Tevens mag geen van de individuele deelnemers van de Deelnemersgroep in het verleden zijn geweigerd voor een autoverzekering, ongeacht de reden.</li>\n                        <li>Personeelsleden van Porsche, haar dealerorganisatie, ACHTUNG!, hun familieleden en anderen die direct/indirect zijn verbonden met de Actie zijn uitgesloten van deelname aan de Actie.</li>\n                        <li>Een persoon wordt deelnemer (hierna te noemen: “Deelnemer”) aan de Actie wanneer hij/zij naam en e-mailadres juist en volledig op de Site invult in de daarvoor bestemde invulvelden en deze actievoorwaarden heeft geaccepteerd op de Site.</li>\n                        <li>Een groep wordt deelnemersgroep (hierna te noemen: “Deelnemersgroep”) aan de Actie wanneer alle individuele 4 leden van de groep voldoen aan bovenstaande punten 6 t/m 9 en zijn of haar naam en e-mailadres juist en volledig op de Site invult in de daarvoor bestemde invulvelden en deze actievoorwaarden heeft geaccepteerd op de Site.</li>\n                        <li>Een Deelnemersgroep bestaat uitsluitend uit 4 Deelnemers.</li>\n                        <li>Als één of meer Deelnemers van een Deelnemersgroep niet de juiste en volledig gevraagde gegevens opgeeft en/of niet voldoet aan de bovenstaande punten 6 t/m 10 is de gehele Deelnemersgroep van deelname uitgesloten. Bij het verstrekken van onjuiste en/of onvolledige gegevens behoudt Porsche zich het recht voor om de Prijs niet uit te keren.</li>\n                        <li>Door deelname aan deze Actie wordt de Deelnemersgroep met al haar Deelnemers geacht in te stemmen met een gezamenlijk huwelijk (hierna te noemen: “Huwelijk”) welke in Kinnaur (India) wordt voltrokken en niet rechtsgeldig is.</li>\n                        <li>Door deelname aan deze Actie wordt de Deelnemersgroep met al haar Deelnemers geacht op de hoogte te zijn van deze actievoorwaarden en hiermee akkoord te gaan.</li>\n                        <li>Deelnemen aan deze Actie is kosteloos. Kosten voor de internetverbinding zijn voor rekening van de Deelnemer.</li>\n                        <li>De Deelnemersgroep kan deelname tot en met dinsdag 31 mei 2016 tot 23:59:59 uur nog intrekken door een email te sturen naar: <a href="mailto:info@shareaporsche.nl">info@shareaporsche.nl</a>. Dit kan door alle 4 Deelnemers van een Deelnemersgroep worden gedaan.</li>\n                        <li>Alle inzendingen ontvangen na 31 mei 2016 23:59:59 uur zijn uitgesloten van deelname aan de Actie en worden niet in behandeling genomen.</li>\n\n                        <h4>Artikel 3 Gegevens</h4>\n                        <li>De deelnemer garandeert dat alle verstrekte gegevens correct, up-to-date en volledig zijn.</li>\n                        <li>De persoonsgegevens van deelnemers worden – indien de deelnemer hier toestemming voor heeft gegeven – door Porsche opgeslagen in een database die voldoet aan de relevante wet- en regelgeving kunnen worden gebruikt conform artikel 6 van deze actievoorwaarden.</li>\n\n                        <h4>Artikel 4 Winnaar</h4>\n                        <li>Op 10 juni 2016 worden er 10 mogelijke winnaarsgroepen (hierna te noemen: “Winnaarsgroep”) gekozen. De mogelijke Winnaarsgroepen worden gekozen op basis van de motivatie die ingevuld kan worden als een Deelnemersgroep compleet is. De 10 mogelijke Winnaarsgroepen worden op 10 juni 2016 op de hoogte gebracht.</li>\n                        <li>De uiteindelijke Winnaarsgroep wordt op 25 of 26 juni 2016 op onpartijdige wijze gekozen. De Winnaarsgroep krijgt 8 dagen de tijd om de Prijs op te eisen. Zo niet heeft Porsche het recht om de Prijs toe te kennen aan een nieuw te kiezen Winnaarsgroep.</li>\n                        <li>Bij weigering van de Prijs of enige andere reden van niet-uitkering van de Prijs, vervalt het recht op de Prijs bij de Winnaarsgroep met al haar individuele Deelnemers en wordt de Prijs uitgekeerd aan een nieuw te kiezen Winnaarsgroep. De Prijs vervalt in ieder geval indien onvolledig of onjuist verstrekte informatie belet dat de Winnaarsgroep, inclusief al haar 4 individuele leden, van de Prijs op de hoogte kan worden gebracht.</li>\n\n                        <h4>Artikel 5 Prijs\n                        <li>De Prijs is tweedelig:\n                            <ol>\n                                <li>De Winnaarsgroep krijgt een jaar lang de beschikking over een Porsche 911 (991-1 Carrera 2) met kenteken: 6-TJT-36 en een kilometerlimiet van 20.000km. De auto is en zal altijd eigendom blijven van Porsche, gevestigd aan de Zuiderinslag 8, 3833 BP te Leusden.</li>\n                                <li>Een reis naar Kinnaur (India) waar het Huwelijk tussen alle leden van de Winnaarsgroep zal plaatsvinden. Kinnaur, India is één van de weinige plekken ter wereld waar groepshuwelijken gebruikelijk zijn. Het Huwelijk is een voorwaarde om in aanmerking te komen van de prijs zoals hierboven genoemd in Artikel 5 23 a. Het huwelijk is niet rechtsgeldig en het enige gezamenlijke goed zal een Porsche zijn. De Winnaarsgroep zal, samen met Porsche, een aantal dagen naar India gaan om het huwelijk te voltrekken.</li>\n                            </ol>\n                        </li>\n                        <li>De waarde van de Prijs ter waarde van €26.764,32 is tweedelig en is opgebouwd uit de (a) beschikking over een Porsche 911 voor 1 jaar (991-1 Carrera 2), inclusief wegenbelasting, verzekering en onderhoud en (b) een reis naar Kinnaur (India), inclusief 4 vluchten retour Amsterdam – New Delhi, maximaal 4 x 5 overnachtingen in Kinnaur (India) en overige kosten met betrekking tot vervoer, eten en drinken beperkt tot een totale waarde van €800.</li>\n                        <li>De Winnaarsgroep dient zelf zorg te dragen voor brandstof en alle overige (auto gerelateerde) kosten.</li>\n                        <li>Over de uitslag van deze Actie kan niet worden gecorrespondeerd.</li>\n                        <li>De Prijs kan niet worden uitbetaald of ingewisseld in contanten en is niet overdraagbaar.</li>\n                        <li>De Prijs mag niet na uitkering (online) te koop worden aangeboden.</li>\n                        <li>De uit te loven Prijs is op basis van beschikbaarheid. Op het moment dat deze onverhoopt niet beschikbaar is, dan behoudt Porsche zich het recht voor om een ander, gelijkwaardig of gelijksoortig alternatief ter beschikking te stellen.</li>\n                        <li>Aan de getoonde beelden en beschrijvingen van de Prijs op de Site kan de Deelnemersgroep inclusief al haar individuele deelnemers op geen enkele wijze rechten ontlenen.</li>\n                        <li>Porsche behoudt zich tevens het recht voor om de Actie te allen tijde, naar eigen goeddunken en zonder voorafgaande kennisgeving, te beëindigen, te onderbreken of te wijzigen en/of de actievoorwaarden en/of de prijzen te wijzigen indien de omstandigheden dit vereisen, zonder op enige wijze tot schadevergoeding gehouden te zijn jegens de Deelnemers en/of Deelnemersgroep. De actievoorwaarden worden niet ten nadelen van de Deelnemers gewijzigd.</li>\n                        <li>Porsche en de door haar ingeschakelde derden of hulppersonen, waaronder ACHTUNG!, zijn in geen geval aansprakelijk voor enige (vermogens)schade en/of ander nadeel veroorzaakt door of op enige wijze verband houdende met de Actie, inclusief doch niet beperkt tot (i) deelname aan de Actie, (ii) het onvermogen om deel te nemen, (iii) het gebruikmaken van de Prijs, en (iv) de uitslagen van de Actie.</li>\n                        <li>Ondanks de grootst mogelijke zorg die Porsche aan het beheer van de website en de organisatie van de campagne besteedt, is het mogelijk dat de verstrekte informatie onvolledig of onjuist is. Druk- en/of spelfouten of andere vergelijkbare fouten in door Porsche openbaar gemaakt materiaal, van welke aard dan ook, kunnen Porsche niet worden tegengeworpen en kunnen op geen enkele wijze een verplichting voor Porsche in het leven roepen. Porsche is niet verantwoordelijk of aansprakelijk voor kosten die de Deelnemer en/of Deelnemersgroep in verband met deelname aan deze Actie maakt. De Deelnemer en/of Deelnemersgroep vrijwaart Porsche van aanspraken van derden in verband met een niet nakoming van deze algemene voorwaarden of in verband met het handelen of nalaten van de Deelnemer en/of Deelnemersgroep.</li>\n\n                        <h4>Artikel 6 Privacy</h4>\n                        <li>Gegevens worden niet zonder toestemming van de Deelnemer gebruikt door Porsche voor een ander doel dan waarvoor de gegevens zijn verstrekt. Tevens worden gegevens niet zonder toestemming van de Deelnemer ter beschikking gesteld aan derden voor een ander doel dan waarvoor de gegevens zijn verstrekt.</li>\n                        <li>Indien daartoe specifiek toestemming is gegeven, kunnen Deelnemers productinformatie en acties ontvangen van Porsche.</li>\n                        <li>De (persoonlijke) gegevens die Porsche verkrijgt in het kader van deze Actie worden conform de relevante wet- en regelgeving behandeld. Porsche zal de (persoonlijke) gegevens alleen gebruiken voor de uitvoering van en communicatie rond de Actie, waaronder mede begrepen het contact opnemen met de Winnaarsgroep. Deelnemer en/of Deelnemersgroep kan een verzoek doen om inzage en/of correctie van zijn gegevens door een e-mail te zenden aan <a href="mailto:info@shareaporsche.nl">info@shareaporsche.nl</a>.</li>\n\n                        <h4>Artikel 7 Kansspelbelasting</h4>\n                        <li>Porsche zal de verschuldigde kansspelbelasting voor haar rekening nemen.</li>\n\n                        <h4>Artikel 8 Disclaimer</h4>\n                            <li>Indien en voor zover enige bepaling van deze voorwaarden nietig wordt verklaard of vernietigd wordt, zullen de overige bepalingen van de voorwaarden onverminderd van kracht blijven. Alsdan zal een nieuwe bepaling worden vastgesteld ter vervanging van de nietige/vernietigende bepaling, waarbij zoveel mogelijk de strekking van de nietige/vernietigde bepaling in acht zal worden genomen.</li>\n                            <li>Porsche is onherroepelijk gerechtigd de inzendingen openbaar te maken en/of te verveelvoudigen door middel van vastlegging en/of publicatie op internet of gedrukte media. In geen geval ontstaat door dit gebruik enige aanspraak op vergoeding. Behoudens voor zover dit wettelijk is toegestaan, mag niets van deze site worden verveelvoudigd, bewerkt of openbaar gemaakt, in welke vorm of op welke wijze dan ook, zonder toestemming van Porsche.</li>\n                            <li>Porsche is onherroepelijk gerechtigd de huwelijksceremonie in Kinnaur, India vast te leggen en openbaar te maken en/of te verveelvoudigen door middel van vastlegging en/of publicatie op internet of gedrukte media. In geen geval ontstaat door dit gebruik enige aanspraak op vergoeding. Behoudens voor zover dit wettelijk is toegestaan, mag niets van deze site worden verveelvoudigd, bewerkt of openbaar gemaakt, in welke vorm of op welke wijze dan ook, zonder toestemming van Porsche.</li>\n                            <li>Porsche is niet verantwoordelijk voor eventuele technische problemen, waaronder het uitvallen van de internetverbinding, waardoor eventuele deelname niet mogelijk is.</li>\n                            <li>Porsche handelt bij deze Actie in overeenstemming met de gedragscode voor promotionele kansspelen. Tevens zijn deze algemene voorwaarden opgesteld conform de gedragscode voor promotionele kansspelen.</li>\n                            <li>Deze Actievoorwaarden zijn verkrijgbaar via <a href="http://www.porsche.nl/porschemarriage" target="_blank">www.porsche.nl/porschemarriage</a> en kunnen worden opgeslagen en afgedrukt.</li>\n                            <li>Op deze voorwaarden is Nederlands recht van toepassing. Alle eventuele geschillen die hieruit voortvloeien of anderszins verband houden met de Actie of de Site worden voorgelegd aan de daartoe bevoegde rechter.</li>\n                            <li>Bij vragen en/of klachten over deze Actie kunt u per e-mail contact opnemen met Porsche via <a href="mailto:info@shareaporsche.nl">info@shareaporsche.nl</a>.</li>\n                            <li>Deze Actie betreft een groot promotioneel kansspel (zoals bedoeld in de Gedragscode Promotionele Kansspelen van 1 januari 2014.</li>\n                    </ol>\n                </div>\n            </div>\n        </div>\n    </section>\n</div>\n\n\n';
        return __p
    }
}),
define("view/DefaultPageView", ["require", "jquery", "view/ButtonView", "wheelindicator", "core/view/page/BasicPageView", "tpl!templates/popups/conditions"], function(e) {
    var t = e("jquery")
      , n = e("view/ButtonView")
      , i = (e("wheelindicator"),
    e("core/view/page/BasicPageView"));
    return i.extend({
        className: "page",
        destroyOnHide: !0,
        conditionsTemplate: e("tpl!templates/popups/conditions"),
        events: {},
        initViews: function() {
            _.bindAll(this, "resetAllButtons"),
            this.renderButtons(),
            this.$body = t("body");
            var e = this;
            this.$body.delegate(".js-btn-conditions", "click", function(t) {
                e.onConditionsClick(t)
            })
        },
        beforePageSwap: function(e) {
            if (this.videoView)
                if (e)
                    this.videoView.restartVideo("beforePageSwap");
                else if (this.videoView.off("allowbgaudio"),
                App.settings.tablet)
                    this.videoView.pauseVideo();
                else {
                    var n = this;
                    t.when(this.videoView.muteVideo()).then(function() {
                        n.videoView.pauseVideo()
                    })
                }
        },
        afterPageSwap: function(e) {
            if (e) {
                var t = App.pages.getPageArgs() && App.pages.getPageArgs().instant;
                t ? (this.$el.addClass("state-instant"),
                setTimeout(_.bind(function() {
                    this.$el.removeClass("state-instant")
                }, this), 100)) : this.$el.removeClass("state-instant"),
                this.animateContent(),
                this.videoView ? (this.videoView.restartVideo("afterPageSwap"),
                App.audio && (this.videoView.hasAudio() ? (App.audio.fadeOutChannel("BG").then(function() {
                    App.audio.pauseChannel("BG")
                }),
                this.videoView.on("allowbgaudio", function() {
                    App.audio.rewindChannel("BG"),
                    App.audio.resumeChannel("BG"),
                    App.audio.fadeInChannel("BG")
                }, this)) : (App.audio.resumeChannel("BG"),
                App.audio.fadeInChannel("BG")))) : App.audio && (App.audio.resumeChannel("BG"),
                App.audio.fadeInChannel("BG"))
            }
        },
        gotoAbout: function() {
            this.scrollToAboutPossible && (t("body").addClass("state-scrolledDown state-scrolledOnce"),
            App.animatingAbout = !0,
            App.settings.mobile || App.settings.tablet || !App.renderVideoImage ? setTimeout(function() {
                App.pages.gotoPage("about", {
                    scrolled: !0
                })
            }, 50) : (this.getVideoImage(),
            setTimeout(function() {
                App.pages.gotoPage("about", {
                    scrolled: !0
                })
            }, 500)))
        },
        getVideoImage: function() {
            this.videoView.pauseVideo();
            var e = this.$("video")[0]
              , n = this.$("#image-canvas")
              , i = n[0]
              , r = i.getContext("2d");
            this.$el.outerWidth();
            var s = this.$el.outerHeight();
            r.canvas.width = s * (16 / 9),
            r.canvas.height = s,
            r.drawImage(e, 0, 0, i.width, i.height);
            var a = i.toDataURL();
            this.$(".js-col-image").each(function() {
                t(this).attr("src", a)
            })
        },
        onConditionsClick: function(e) {
            e.preventDefault(),
            App.popupContainer.html(this.conditionsTemplate);
            var t = this;
            App.popupContainer.find(".js-btn-closepopup").click(function() {
                t.onConditionsCloseClick()
            }),
            this.$body.addClass("state-popup"),
            App.popupContainer.addClass("state-active")
        },
        onConditionsCloseClick: function() {
            this.$body.removeClass("state-popup"),
            App.popupContainer.removeClass("state-active"),
            App.popupContainer.empty()
        },
        renderButtons: function() {
            this._pageButtons = [];
            var e = this;
            this.$(".js-button-animated").each(function() {
                var i = new n({
                    el: t(this)
                });
                e._pageButtons.push(i)
            })
        },
        resetAllButtons: function() {
            _.each(this._pageButtons, function(e) {
                e.resetButton()
            })
        },
        animateContent: function() {
            this.$el.addClass("state-active");
            var e = this;
            setTimeout(function() {
                var t = "app" == App.pageSwapper.getPageView().model.get("path").toString() && "declined" == App.pages.getPageArgs().flow && (!App.settings.mobile || App.pages.getPreviousPage() && App.pages.getPreviousPage().length > 0)
                  , n = "propose" == App.pageSwapper.getPageView().model.get("path").toString() && App.settings.group && App.settings.group.users >= 3 && (App.settings.inGroup || App.settings.groupOwner) && !App.settings.mobile;
                n || t || e.$el.addClass("state-content-animated")
            }, 50),
            this.videoView && "backgroundVideo" != this.videoView.type ? this.$body.addClass("state-video") : this.$body.removeClass("state-video")
        },
        animateContentOut: function() {
            this.$el.removeClass("state-content-animated")
        },
        reset: function() {
            App.pages._pageArgs = {},
            this.render(),
            this.$el.removeClass("state-content-animated"),
            this.videoView && this.videoView.restartVideo("reset")
        },
        transitionIn: function() {
            this.scrollToAboutPossible || "about" == App.pageSwapper.getPageView().model.get("path").toString() ? App.scrolling.turnOn() : App.scrolling.turnOff(),
            this.resetAllButtons()
        },
        transitionOut: function() {
            return this.videoView && setTimeout(_.bind(function() {
                this.videoView.off(),
                this.videoView.remove()
            }, this), 1e3),
            !0
        }
    })
});
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
!function(e) {
    var t = e.GreenSockGlobals || e
      , n = function(e) {
        var n, i = e.split("."), r = t;
        for (n = 0; i.length > n; n++)
            r[i[n]] = r = r[i[n]] || {};
        return r
    }
      , i = n("com.greensock.utils")
      , r = function(e) {
        var t = e.nodeType
          , n = "";
        if (1 === t || 9 === t || 11 === t) {
            if ("string" == typeof e.textContent)
                return e.textContent;
            for (e = e.firstChild; e; e = e.nextSibling)
                n += r(e)
        } else if (3 === t || 4 === t)
            return e.nodeValue;
        return n
    }
      , s = document
      , a = s.defaultView ? s.defaultView.getComputedStyle : function() {}
      , o = /([A-Z])/g
      , l = function(e, t, n, i) {
        var r;
        return (n = n || a(e, null )) ? (e = n.getPropertyValue(t.replace(o, "-$1").toLowerCase()),
        r = e || n.length ? e : n[t]) : e.currentStyle && (n = e.currentStyle,
        r = n[t]),
        i ? r : parseInt(r, 10) || 0
    }
      , u = function(e) {
        return e.length && e[0] && (e[0].nodeType && e[0].style && !e.nodeType || e[0].length && e[0][0]) ? !0 : !1
    }
      , c = function(e) {
        var t, n, i, r = [], s = e.length;
        for (t = 0; s > t; t++)
            if (n = e[t],
            u(n))
                for (i = n.length,
                i = 0; n.length > i; i++)
                    r.push(n[i]);
            else
                r.push(n);
        return r
    }
      , h = ")eefec303079ad17405c"
      , d = /(?:<br>|<br\/>|<br \/>)/gi
      , p = s.all && !s.addEventListener
      , f = "<div style='position:relative;display:inline-block;" + (p ? "*display:inline;*zoom:1;'" : "'")
      , g = function(e) {
        e = e || "";
        var t = -1 !== e.indexOf("++")
          , n = 1;
        return t && (e = e.split("++").join("")),
        function() {
            return f + (e ? " class='" + e + (t ? n++ : "") + "'>" : ">")
        }
    }
      , m = i.SplitText = t.SplitText = function(e, t) {
        if ("string" == typeof e && (e = m.selector(e)),
        !e)
            throw "cannot split a null element.";
        this.elements = u(e) ? c(e) : [e],
        this.chars = [],
        this.words = [],
        this.lines = [],
        this._originals = [],
        this.vars = t || {},
        this.split(t)
    }
      , v = function(e, t, n) {
        var i = e.nodeType;
        if (1 === i || 9 === i || 11 === i)
            for (e = e.firstChild; e; e = e.nextSibling)
                v(e, t, n);
        else
            (3 === i || 4 === i) && (e.nodeValue = e.nodeValue.split(t).join(n))
    }
      , _ = function(e, t) {
        for (var n = t.length; --n > -1; )
            e.push(t[n])
    }
      , y = function(e, t, n, i, o) {
        d.test(e.innerHTML) && (e.innerHTML = e.innerHTML.replace(d, h));
        var u, c, p, f, m, y, b, w, x, T, P, S, k, A, C = r(e), j = t.type || t.split || "chars,words,lines", O = -1 !== j.indexOf("lines") ? [] : null , M = -1 !== j.indexOf("words"), E = -1 !== j.indexOf("chars"), D = "absolute" === t.position || t.absolute === !0, N = D ? "&#173; " : " ", I = -999, L = a(e), R = l(e, "paddingLeft", L), V = l(e, "borderBottomWidth", L) + l(e, "borderTopWidth", L), B = l(e, "borderLeftWidth", L) + l(e, "borderRightWidth", L), F = l(e, "paddingTop", L) + l(e, "paddingBottom", L), $ = l(e, "paddingLeft", L) + l(e, "paddingRight", L), q = l(e, "textAlign", L, !0), z = e.clientHeight, H = e.clientWidth, U = "</div>", G = g(t.wordsClass), X = g(t.charsClass), W = -1 !== (t.linesClass || "").indexOf("++"), Y = t.linesClass, Q = -1 !== C.indexOf("<"), J = !0, Z = [], K = [], et = [];
        for (W && (Y = Y.split("++").join("")),
        Q && (C = C.split("<").join("{{LT}}")),
        u = C.length,
        f = G(),
        m = 0; u > m; m++)
            if (b = C.charAt(m),
            ")" === b && C.substr(m, 20) === h)
                f += (J ? U : "") + "<BR/>",
                J = !1,
                m !== u - 20 && C.substr(m + 20, 20) !== h && (f += " " + G(),
                J = !0),
                m += 19;
            else if (" " === b && " " !== C.charAt(m - 1) && m !== u - 1 && C.substr(m - 20, 20) !== h) {
                for (f += J ? U : "",
                J = !1; " " === C.charAt(m + 1); )
                    f += N,
                    m++;
                (")" !== C.charAt(m + 1) || C.substr(m + 1, 20) !== h) && (f += N + G(),
                J = !0)
            } else
                f += E && " " !== b ? X() + b + "</div>" : b;
        for (e.innerHTML = f + (J ? U : ""),
        Q && v(e, "{{LT}}", "<"),
        y = e.getElementsByTagName("*"),
        u = y.length,
        w = [],
        m = 0; u > m; m++)
            w[m] = y[m];
        if (O || D)
            for (m = 0; u > m; m++)
                x = w[m],
                p = x.parentNode === e,
                (p || D || E && !M) && (T = x.offsetTop,
                O && p && T !== I && "BR" !== x.nodeName && (c = [],
                O.push(c),
                I = T),
                D && (x._x = x.offsetLeft,
                x._y = T,
                x._w = x.offsetWidth,
                x._h = x.offsetHeight),
                O && (M !== p && E || (c.push(x),
                x._x -= R),
                p && m && (w[m - 1]._wordEnd = !0),
                "BR" === x.nodeName && x.nextSibling && "BR" === x.nextSibling.nodeName && O.push([])));
        for (m = 0; u > m; m++)
            x = w[m],
            p = x.parentNode === e,
            "BR" !== x.nodeName ? (D && (S = x.style,
            M || p || (x._x += x.parentNode._x,
            x._y += x.parentNode._y),
            S.left = x._x + "px",
            S.top = x._y + "px",
            S.position = "absolute",
            S.display = "block",
            S.width = x._w + 1 + "px",
            S.height = x._h + "px"),
            M ? p && "" !== x.innerHTML ? K.push(x) : E && Z.push(x) : p ? (e.removeChild(x),
            w.splice(m--, 1),
            u--) : !p && E && (T = !O && !D && x.nextSibling,
            e.appendChild(x),
            T || e.appendChild(s.createTextNode(" ")),
            Z.push(x))) : O || D ? (e.removeChild(x),
            w.splice(m--, 1),
            u--) : M || e.appendChild(x);
        if (O) {
            for (D && (P = s.createElement("div"),
            e.appendChild(P),
            k = P.offsetWidth + "px",
            T = P.offsetParent === e ? 0 : e.offsetLeft,
            e.removeChild(P)),
            S = e.style.cssText,
            e.style.cssText = "display:none;"; e.firstChild; )
                e.removeChild(e.firstChild);
            for (A = !D || !M && !E,
            m = 0; O.length > m; m++) {
                for (c = O[m],
                P = s.createElement("div"),
                P.style.cssText = "display:block;text-align:" + q + ";position:" + (D ? "absolute;" : "relative;"),
                Y && (P.className = Y + (W ? m + 1 : "")),
                et.push(P),
                u = c.length,
                y = 0; u > y; y++)
                    "BR" !== c[y].nodeName && (x = c[y],
                    P.appendChild(x),
                    A && (x._wordEnd || M) && P.appendChild(s.createTextNode(" ")),
                    D && (0 === y && (P.style.top = x._y + "px",
                    P.style.left = R + T + "px"),
                    x.style.top = "0px",
                    T && (x.style.left = x._x - T + "px")));
                0 === u && (P.innerHTML = "&nbsp;"),
                M || E || (P.innerHTML = r(P).split(String.fromCharCode(160)).join(" ")),
                D && (P.style.width = k,
                P.style.height = x._h + "px"),
                e.appendChild(P)
            }
            e.style.cssText = S
        }
        D && (z > e.clientHeight && (e.style.height = z - F + "px",
        z > e.clientHeight && (e.style.height = z + V + "px")),
        H > e.clientWidth && (e.style.width = H - $ + "px",
        H > e.clientWidth && (e.style.width = H + B + "px"))),
        _(n, Z),
        _(i, K),
        _(o, et)
    }
      , b = m.prototype;
    b.split = function(e) {
        this.isSplit && this.revert(),
        this.vars = e || this.vars,
        this._originals.length = this.chars.length = this.words.length = this.lines.length = 0;
        for (var t = this.elements.length; --t > -1; )
            this._originals[t] = this.elements[t].innerHTML,
            y(this.elements[t], this.vars, this.chars, this.words, this.lines);
        return this.chars.reverse(),
        this.words.reverse(),
        this.lines.reverse(),
        this.isSplit = !0,
        this
    }
    ,
    b.revert = function() {
        if (!this._originals)
            throw "revert() call wasn't scoped properly.";
        for (var e = this._originals.length; --e > -1; )
            this.elements[e].innerHTML = this._originals[e];
        return this.chars = [],
        this.words = [],
        this.lines = [],
        this.isSplit = !1,
        this
    }
    ,
    m.selector = e.$ || e.jQuery || function(t) {
        var n = e.$ || e.jQuery;
        return n ? (m.selector = n,
        n(t)) : "undefined" == typeof document ? t : document.querySelectorAll ? document.querySelectorAll(t) : document.getElementById("#" === t.charAt(0) ? t.substr(1) : t)
    }
    ,
    m.version = "0.3.3"
}(_gsScope),
function(e) {
    var t = function() {
        return (_gsScope.GreenSockGlobals || _gsScope)[e]
    }
    ;
    "function" == typeof define && define.amd ? define("tween_splittext_plugin", ["TweenLite"], t) : "undefined" != typeof module && module.exports && (module.exports = t())
}("SplitText"),
define("view/TextAnimationView", ["require", "jquery", "underscore", "backbone", "TimelineMax", "TweenMax", "tween_splittext_plugin"], function(e) {
    var t = e("jquery")
      , n = e("underscore")
      , i = e("backbone")
      , r = e("TimelineMax")
      , s = (e("TweenMax"),
    e("tween_splittext_plugin"));
    return i.View.extend({
        $textElms: [],
        startDelay: .5,
        autoPlay: !1,
        position: 0,
        initialize: function(e) {
            n.extend(this, n.pick(e, "startDelay", "autoPlay")),
            this.timeline = new r({
                onComplete: n.bind(function() {
                    t(this.el).trigger("complete")
                }, this)
            }),
            this.position = this.startDelay,
            n.each(e.textElms, n.bind(function(i, r) {
                var a = i.$el
                  , o = n.shuffle(new s(a.find(".split"),{
                    type: "chars"
                }).chars)
                  , l = Math.round(1e3 * (.5 / o.length)) / 1e3
                  , u = 1;
                n.each(o, function(e) {
                    t(e).css("display", "inline")
                }),
                this.$textElms.push(a),
                this.timeline.set(a, {
                    onComplete: function() {
                        a.addClass(r == e.textElms.length - 1 ? "textInEnd" : "textIn")
                    }
                }, this.position),
                this.timeline.staggerFrom(o, .75 * u, {
                    opacity: 0,
                    ease: Power2.easeIn
                }, l, this.position),
                this.timeline.staggerFrom(o, 1.5 * u, {
                    textShadow: "0px 0px 8px white",
                    color: "none",
                    ease: Power2.easeInOut
                }, l, this.position),
                this.position += i.duration
            }, this)),
            this.autoPlay || this.timeline.pause()
        },
        addAction: function(e, t, n) {
            return this.timeline.set(e, {
                onComplete: t
            }, n),
            this
        },
        play: function() {
            n.each(this.$textElms, function(e) {
                e.removeClass("textIn textInEnd")
            }),
            this.timeline.restart()
        },
        resume: function() {
            this.timeline.resume()
        },
        pause: function() {
            this.timeline.pause()
        }
    })
}),
define("tpl!templates/pages/home", [], function() {
    return function(obj) {
        var __t, __p = "";
        with (Array.prototype.join,
        obj || {}) {
            __p += '<section class="section section-home section-content-centered section-content-centered-mobile js-section">\n\n    <div class="section-slide-cols">\n        ';
            for (var i = 0; i < (App.settings.mobile ? 4 : 8); i++)
                __p += '\n        <div data-id="' + (null  == (__t = i + 1) ? "" : __t) + '" class="section-slide-col js-section-slide-col"></div>\n        ';
            __p += '\n    </div>\n\n    <div class="section-inner section-slide-inner js-section-inner">\n        <div class="section-inner-content">\n\n            <div class="layout-wrap content-intro-home content-intro-home-0 js-content-intro-home">\n                <h2 id="js-home-intro-text-0" class="split">De inschrijvingen voor <br>Porsche Marriage zijn gesloten.</h2>\n            </div>\n\n            <div class="layout-wrap content-intro-home content-intro-home-2 js-content-intro-home">\n                <h1 class="font-border split" id="js-home-intro-text-2">\n                    &nbsp;Porsche<br>Marriage\n                </h1>\n                <div class="layout-marginbottom sub-text">\n                    We maken binnenkort de gelukkige verloofden bekend. Deze groep zal trouwen in India en een Porsche 911 delen als bruidsschat. Maar u kunt ook zonder te trouwen een Porsche delen via <span class="js-btn-app state-link">Share a Porsche</span>.\n                </div>\n\n                <div class="btn-circle btn-play-home btn-circle-animated js-btn-video">\n                </div>\n            </div>\n\n        </div>\n\n        <div class="section-bottom">\n            <div class="btn-scrolldown js-btn-about">\n                Over Porsche Marriage\n            </div>\n        </div>\n\n    </div>\n\n    <div class="section-bg sectionbg-videoloop js-sectionbg-videoloop">\n    </div>\n\n</section>\n\n'
        }
        return __p
    }
}),
define("view/pages/HomeView", ["require", "jquery", "view/VideoView", "view/BackgroundVideoView", "view/ButtonView", "view/ZenPlayButtonView", "view/DefaultPageView", "view/TextAnimationView", "tpl!templates/pages/home"], function(e) {
    var t = e("jquery")
      , n = (e("view/VideoView"),
    e("view/BackgroundVideoView"))
      , i = (e("view/ButtonView"),
    e("view/ZenPlayButtonView"))
      , r = e("view/DefaultPageView")
      , s = e("view/TextAnimationView");
    return r.extend({
        template: e("tpl!templates/pages/home"),
        className: "page page-home section-slide",
        scrollToAboutPossible: !0,
        events: {
            "click .js-btn-video": "onVideoClick",
            "click .js-btn-about": "gotoAbout",
            "click .js-btn-app": "gotoApp"
        },
        onVideoClick: function() {
            App.settings.mobile || App.settings.tablet ? App.pages.gotoPage("video") : (this.playbuttonView.closeButton(),
            setTimeout(function() {
                App.pages.gotoPage("video")
            }, 550))
        },
        gotoApp: function() {
            App.pages.gotoPage("app")
        },
        initViews: function() {
            console.log(this.model.get("args")),
            _.bindAll(this, "onVideoClick");
            var e = 2.84
              , i = App.pages.getPreviousPage() && "about" == App.pages.getPreviousPage().slice() && !App.homeToHome;
            if (this.startingPoint = i ? e : 0,
            console.log(i),
            this.videoView = new n({
                el: this.$(".js-sectionbg-videoloop"),
                poster: i ? "bg-home-slider.jpg" : "poster-home.jpg",
                startingPoint: this.startingPoint,
                video: "home",
                loop: !1,
                loopLastPart: !0,
                loopFrom: e
            }),
            App.homeToHome = !1,
            !App.introShown) {
                this.textAnimationView = new s({
                    el: this.$el,
                    startDelay: App.settings.tablet ? .1 : 1,
                    textElms: [{
                        $el: this.$el.find(".content-intro-home-0"),
                        duration: 4
                    }, {
                        $el: this.$el.find(".content-intro-home-2"),
                        duration: 4
                    }]
                });
                var a = this.$el.find(".content-intro-home-2 .sub-text");
                this.textAnimationView.timeline.from(a, 1, {
                    opacity: 0,
                    ease: Power2.easeInOut
                }, "-=1"),
                this.textAnimationView.timeline.from(a, 2, {
                    textShadow: "0px 0px 8px white",
                    color: "none",
                    ease: Power2.easeInOut
                }, "-=1"),
                this.textAnimationView.addAction(this.$el, _.bind(function() {
                    this.$el.find(".font-border").addClass("show")
                }, this), this.textAnimationView.position - 3).addAction(this.$el, _.bind(function() {
                    App.settings.tablet || this.playbuttonView.show()
                }, this), this.textAnimationView.position - 3).addAction(this.$el, _.bind(function() {
                    t("#nav-main-btn").removeClass("hidden")
                }, this), 3.5).addAction(this.$el, _.bind(function() {
                    t(".header .btn-audio").removeClass("hidden")
                }, this), 4).addAction(this.$el, _.bind(function() {
                    this.activateScroll(),
                    this.finishIntro()
                }, this), this.textAnimationView.position - 1)
            }
            r.prototype.initViews.apply(this)
        },
        addPlayButton: function() {
            this.playbutton = document.getElementsByClassName("js-btn-video")[0],
            this.playbuttonView = new i({
                el: this.playbutton,
                appendId: "home"
            }),
            this.playbuttonView.initPlayButton(),
            this.playbutton.addEventListener("mouseenter", this.playbuttonView.onMouseOverPlayButton),
            this.playbutton.addEventListener("mouseleave", this.playbuttonView.onMouseOutPlayButton),
            this.playbutton.addEventListener("touchstart", this.playbuttonView.onMouseOverPlayButton),
            this.playbutton.addEventListener("touchend", this.playbuttonView.onMouseOutPlayButton)
        },
        removePlayButton: function() {
            this.playbutton.removeEventListener("mouseenter", this.playbuttonView.onMouseOverPlayButton),
            this.playbutton.removeEventListener("mouseleave", this.playbuttonView.onMouseOutPlayButton),
            this.playbutton.removeEventListener("touchstart", this.playbuttonView.onMouseOverPlayButton),
            this.playbutton.removeEventListener("touchend", this.playbuttonView.onMouseOutPlayButton),
            this.playbuttonView.destroyAll(),
            this.playbutton = null ,
            this.playbuttonView = null 
        },
        activateScroll: function() {
            this.$(".btn-scrolldown").removeClass("hidden"),
            App.scrolling.turnOn()
        },
        transitionIn: function() {
            this.$el.removeClass("state-animated"),
            setTimeout(_.bind(function() {
                this.$el.addClass("state-animated")
            }, this), 20),
            App.settings.tablet || this.addPlayButton(),
            App.introShown ? App.settings.tablet || this.playbuttonView.show() : (App.settings.tablet || this.$(".btn-circle").addClass("hidden"),
            this.$(".btn-scrolldown").addClass("hidden"),
            App.scrolling.turnOff(),
            this.textAnimationView.play()),
            App.pages.getPreviousPage() || App.introShown || (t("#nav-main-btn").addClass("hidden"),
            t(".header .btn-audio").addClass("hidden")),
            r.prototype.transitionIn.apply(this)
        },
        finishIntro: function() {
            App.introShown = !0,
            t("body").addClass("state-introShown")
        },
        transitionOut: function() {
            return App.settings.tablet || this.removePlayButton(),
            this.finishIntro(),
            this.activateScroll(),
            r.prototype.transitionOut.apply(this)
        }
    })
}),
define("tpl!templates/pages/about", [], function() {
    return function(obj) {
        var __t, __p = "";
        with (Array.prototype.join,
        obj || {}) {
            __p += "";
            var colsAmount = 8;
            App.settings.mobile && (colsAmount = 4),
            __p += '\n\n<div class="section-container-inner js-section-scroller-wrap">\n\n    <section class="section section-slide section-about js-section" data-id="1">\n\n        <div class="section-slide-cols">\n\n            ';
            for (var i = 0; colsAmount > i; i++)
                __p += '\n                <div data-id="' + (null  == (__t = i + 1) ? "" : __t) + '" class="section-slide-col js-section-slide-col"></div>\n            ';
            if (__p += '\n\n        </div>\n\n        <div class="section-inner section-slide-inner js-section-inner">\n            <div class="section-inner-content">\n                <div class="section-slide-content-animated section-slide-content-animated-1">\n                    <h2 class="font-border layout-center">Over Porsche Marriage</h2>\n                </div>\n                <div class="layout-wrap section-slide-content-animated section-slide-content-animated-2">\n                    Deelnemers werden gevraagd om hun 3 beste vrienden een aanzoek te doen. 1620 verlovingen, 1750 aanzoeken en 540 potentiële huwelijken. Slechts één groep gelukkigen zal trouwen in India en een Porsche 911 Carrera als bruidsschat delen. De gelukkige winnaars worden 25 juni bekend gemaakt op Circuitpark Zandvoort.\n                </div>\n            </div>\n            <div class="section-bottom section-slide-bottom">\n                <div class="btn-scrolldown js-btn-next">\n                    ' + (null  == (__t = App.settings.mobile ? "Het aanzoek" : "Hoe werkt het") ? "" : __t) + "\n                </div>\n            </div>\n        </div>\n\n    </section>\n\n    ",
            App.settings.mobile) {
                __p += '\n\n\n    <section class="section section-how section-slide js-section" data-id="2">\n\n        <div class="section-slide-cols">\n            ';
                for (var i = 0; colsAmount > i; i++)
                    __p += '\n                <div data-id="' + (null  == (__t = i + 1) ? "" : __t) + '" class="section-slide-col js-section-slide-col"></div>\n            ';
                __p += '\n        </div>\n\n        <div class="section-inner section-slide-inner js-section-inner">\n            <div class="section-inner-content">\n                <div class="layout-wrap">\n                    <div class="layout-col layout-paddingright-double layout-col-1-3">\n                        <div class="section-slide-content-animated section-slide-content-animated-1">\n                            <h3 class="font-center font-border">Het aanzoek</h3>\n                        </div>\n                        <div class="section-slide-content-animated section-slide-content-animated-2">\n                            U moest minimaal drie vrienden een aanzoek doen. U verloofde zich met de eerste drie vrienden die u het JA-woord gaven.\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class="section-bottom section-slide-bottom">\n                <div class="btn-scrolldown js-btn-next">\n                    De verloving\n                </div>\n            </div>\n        </div>\n    </section>\n\n    <section class="section section-how section-slide js-section" data-id="3">\n\n        <div class="section-slide-cols">\n            ';
                for (var i = 0; colsAmount > i; i++)
                    __p += '\n                <div data-id="' + (null  == (__t = i + 1) ? "" : __t) + '" class="section-slide-col js-section-slide-col"></div>\n            ';
                __p += '\n        </div>\n\n        <div class="section-inner section-slide-inner js-section-inner">\n            <div class="section-inner-content">\n                <div class="layout-wrap">\n                    <div class="layout-col layout-paddingright-double layout-col-1-3">\n                        <div class="section-slide-content-animated section-slide-content-animated-1">\n                            <h3 class="font-center font-border">De verloving</h3>\n                        </div>\n                        <div class="section-slide-content-animated section-slide-content-animated-2">\n                            Uw vrienden moesten voor 31 mei 2016 23:59:59 het aanzoek geaccepteerd hebben om kans te maken op een unieke bruiloft en een jaar lang Porsche delen.\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class="section-bottom section-slide-bottom">\n                <div class="btn-scrolldown js-btn-next">\n                    De ceremonie\n                </div>\n            </div>\n        </div>\n    </section>\n\n    <section class="section section-how section-slide js-section" data-id="4">\n\n        <div class="section-slide-cols">\n            ';
                for (var i = 0; colsAmount > i; i++)
                    __p += '\n                <div data-id="' + (null  == (__t = i + 1) ? "" : __t) + '" class="section-slide-col js-section-slide-col"></div>\n            ';
                __p += '\n        </div>\n\n        <div class="section-inner section-slide-inner js-section-inner">\n            <div class="section-inner-content">\n                <div class="layout-wrap">\n                    <div class="layout-col layout-paddingright-double layout-col-1-3">\n                        <div class="section-slide-content-animated section-slide-content-animated-1">\n                            <h3 class="font-center font-border">De ceremonie</h3>\n                        </div>\n                        <div class="section-slide-content-animated section-slide-content-animated-2">\n                            Eén vriendengroep gaat trouwen in Kinnaur, India en mag een jaar lang een Porsche 911 delen.\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class="section-bottom section-slide-bottom">\n                <div class="btn-scrolldown js-btn-next">\n                    De bruiloft\n                </div>\n            </div>\n        </div>\n    </section>\n\n    '
            } else {
                __p += '\n\n        <section class="section section-how section-slide js-section" data-id="2">\n\n            <div class="section-slide-cols">\n                ';
                for (var i = 0; colsAmount > i; i++)
                    __p += '\n                    <div data-id="' + (null  == (__t = i + 1) ? "" : __t) + '" class="section-slide-col js-section-slide-col"></div>\n                ';
                __p += '\n            </div>\n\n            <div class="section-inner section-slide-inner js-section-inner">\n                <div class="section-inner-content">\n                    <div class="layout-marginbottom-double section-slide-content-animated section-slide-content-animated-1">\n                        <h2 class="layout-center">Hoe werkt het</h2>\n                    </div>\n                    <div class="layout-wrap section-slide-content-animated section-slide-content-animated-2">\n                        <div class="layout-col layout-paddingright-double layout-col-1-3">\n                            <h3 class="font-center font-border">Het aanzoek</h3>\n                            <p>\n                                U moest minimaal drie vrienden een aanzoek doen. U verloofde zich met de eerste drie vrienden die u het JA-woord gaven.\n                            </p>\n                        </div>\n                        <div class="layout-col layout-paddingleft layout-paddingright layout-col-1-3">\n                            <h3 class="font-center font-border">De verloving</h3>\n                            <p>\n                                Uw vrienden moesten voor 31 mei 2016 23:59:59 het aanzoek geaccepteerd hebben om kans te maken op een unieke bruiloft en een jaar lang Porsche delen.\n                            </p>\n                        </div>\n                        <div class="layout-col layout-paddingleft-double  layout-col-1-3">\n                            <h3 class="font-center font-border">De ceremonie</h3>\n                            <p>\n                                Eén vriendengroep gaat trouwen in Kinnaur, India en mag een jaar lang een Porsche 911 delen.\n                            </p>\n                        </div>\n                    </div>\n                </div>\n                <div class="section-bottom section-slide-bottom">\n                    <div class="btn-scrolldown js-btn-next">\n                        De bruiloft\n                    </div>\n                </div>\n            </div>\n        </section>\n\n    '
            }
            __p += '\n\n    <section class="section section-wedding-honeymoon section-slide js-section" data-id="' + (null  == (__t = App.settings.mobile ? 5 : 3) ? "" : __t) + '">\n\n        <div class="section-slide-cols">\n            ';
            for (var i = 0; colsAmount > i; i++)
                __p += '\n                <div data-id="' + (null  == (__t = i + 1) ? "" : __t) + '" class="section-slide-col js-section-slide-col"></div>\n            ';
            __p += '\n        </div>\n        <div class="section-inner section-slide-inner js-section-inner">\n\n            <div class="section-inner-content">\n                <div class="layout-wrap">\n                    <div class="section-slide-content-animated section-slide-content-animated-1">\n                        <h2 class="font-border layout-center">De bruiloft</h2>\n                    </div>\n                    <div class="section-slide-content-animated section-slide-content-animated-2">\n                        Een gelukkige groep van 4 vrienden belooft elkaar eeuwige trouw en zal trouwen in India. Kinnaur is een regio in India die bekend staat om een zeldzame traditie: polygame huwelijksvoltrekking.\n                    </div>\n                </div>\n            </div>\n\n\n            <div class="section-bottom section-slide-bottom">\n                <div class="btn-scrolldown js-btn-next">\n                    De bruidsschat\n                </div>\n            </div>\n\n        </div>\n\n    </section>\n\n    <section class="section section-dowry section-slide js-section" data-id="' + (null  == (__t = App.settings.mobile ? 6 : 4) ? "" : __t) + '">\n        <div class="section-slide-cols">\n            ';
            for (var i = 0; colsAmount > i; i++)
                __p += '\n                <div data-id="' + (null  == (__t = i + 1) ? "" : __t) + '" class="section-slide-col js-section-slide-col"></div>\n            ';
            __p += '\n        </div>\n        <div class="section-inner section-slide-inner js-section-inner">\n\n            <div class="section-inner-content">\n                <div class="layout-wrap">\n                    <div class="section-slide-content-animated section-slide-content-animated-1">\n                        <h2 class="font-border layout-center">De bruidsschat</h2>\n                    </div>\n                    <div class="section-slide-content-animated section-slide-content-animated-2">\n                        Samen met uw nieuwe partners deelt u een Porsche 911 Carrera voor een heel jaar. In de Share a Porsche app kunt u samen de bruidsschat eerlijk verdelen.\n                    </div>\n                </div>\n            </div>\n\n            <div class="section-bottom section-slide-bottom">\n                <div class="btn-scrolldown js-btn-next">\n                    FAQ\n                </div>\n            </div>\n\n        </div>\n    </section>\n\n    <section class="section section-faq section-slide section-scrollable js-section" data-id="' + (null  == (__t = App.settings.mobile ? 7 : 5) ? "" : __t) + '">\n        <div class="section-inner section-slide-inner js-section-inner">\n            <div class="layout-wrap">\n                <div class="section-slide-content-animated section-slide-content-animated-1">\n                    <h2 class="font-border layout-center">FAQ</h2>\n                </div>\n                <div class="layout-clear layout-margintop">\n                    <div class="layout-col layout-paddingright section-slide-content-animated section-slide-content-animated-2">\n                        <div class="faq-item">\n                            <h3 class="font-border faq-item-header">\n                                Is dit echt?\n                            </h3>\n                            <p>\n                                Ja. Uiteindelijk gaan vier deelnemers aan Porsche Marriage echt naar India om daar te trouwen tijdens een officiële polygame huwelijksceremonie.\n                            </p>\n                        </div>\n\n                        <div class="faq-item">\n                            <h3 class="font-border faq-item-header">\n                                Is het legaal om met je vrienden te trouwen?\n                            </h3>\n                            <p>\n                                Niet in Nederland, wel in Kinnaur, India. Vandaar dat daar de ceremonie wordt gehouden.\n                            </p>\n                        </div>\n\n                        <div class="faq-item">\n                            <h3 class="font-border faq-item-header">\n                                Onder welke huwelijkse voorwaarden trouwen we?\n                            </h3>\n                            <p>\n                                U deelt het komende jaar een Porsche met elkaar. Verder niets.\n                            </p>\n                        </div>\n\n                        <div class="faq-item">\n                            <h3 class="font-border faq-item-header">\n                                Krijgen we dezelfde achternaam?\n                            </h3>\n                            <p>\n                                Nee, dat is volgens de Nederlandse wetgeving niet mogelijk.\n                            </p>\n                        </div>\n\n                        <div class="faq-item">\n                            <h3 class="font-border faq-item-header">\n                                Wat houdt de ceremonie in India in?\n                            </h3>\n                            <p>\n                                Kinnaur, India is een van de weinig overgebleven plekken waar nog polygame huwelijken worden voltrokken. De officiële ceremonie zal in besloten kring plaatsvinden.\n                            </p>\n                        </div>\n\n                        <div class="faq-item">\n                            <h3 class="font-border faq-item-header">\n                                Waarom is de ceremonie in India?\n                            </h3>\n                            <p>\n                                Kinnaur is een regio in India die bekend staat om een zeldzame traditie: polygame huwelijksvoltrekking.\n                            </p>\n                        </div>\n\n                        <div class="faq-item">\n                            <h3 class="font-border faq-item-header">\n                                Mogen vrouwen ook meedoen?\n                            </h3>\n                            <p>\n                                Uiteraard! Alle groepssamentellingen zijn toegestaan.\n                            </p>\n                        </div>\n\n                        <div class="faq-item">\n                            <h3 class="font-border faq-item-header">\n                                Hoe moeten we met z’n vieren een Porsche delen?\n                            </h3>\n                            <p>\n                                Daarvoor hebben wij de unieke Share a Porsche-app ontwikkeld die het Porsche delen eenvoudig en overzichtelijk maakt.\n                            </p>\n                        </div>\n\n                        <div class="faq-item">\n                            <h3 class="font-border faq-item-header">\n                                Welk model Porsche krijgen we?\n                            </h3>\n                            <p>\n                                Een 911 (991-1). Zie <a href="#" class="js-btn-conditions">voorwaarden</a>.\n                            </p>\n                        </div>\n\n                        <div class="faq-item">\n                            <h3 class="font-border faq-item-header">\n                                Passen we wel met z’n vieren in een Porsche?\n                            </h3>\n                            <p>\n                                Dat hangt van uw lengte af.\n                            </p>\n                        </div>\n\n\n                        <!--<div class="faq-item">-->\n                            <!--<h3 class="font-border faq-item-header">-->\n                                <!--Waarom is de minimum leeftijd 25 jaar?-->\n                            <!--</h3>-->\n                            <!--<p>-->\n                                <!--Dit is een voorwaarde vanuit de verzekering.-->\n                            <!--</p>-->\n                        <!--</div>-->\n\n\n                        <div class="faq-item">\n                            <h3 class="font-border faq-item-header">\n                                Hoe werkt Share a Porsche?\n                            </h3>\n                            <p>\n                                Met Share a Porsche kunt u met maximaal 3 andere vrienden een Porsche delen, 1 of 2 jaar lang. U betaalt alleen voor uw \'bundel\' met een vooraf bepaald jaarkilometrage en de brandstof. Dankzij de unieke app kunt u eenvoudig met elkaar afspreken wie er wanneer in de Porsche mag rijden. Meer informatie vindt u <a href="http://www.shareaporsche.nl/" target="_blank">hier</a>.\n                            </p>\n                        </div>\n\n                    </div>\n\n                    <div class="layout-col layout-paddingleft section-slide-content-animated section-slide-content-animated-3">\n\n                        <div class="faq-item">\n                            <h3 class="font-border faq-item-header">\n                                Ik ben al getrouwd, kan ik nog meedoen?\n                            </h3>\n                            <p>\n                                Dat kan zeker. Maar voortaan moet uw echtgenote u delen met drie vrienden. Ze mag natuurlijk wel meerijden in de Porsche die u met uw vrienden deelt.\n                            </p>\n                        </div>\n\n                        <div class="faq-item">\n                            <h3 class="font-border faq-item-header">\n                                Moet ik mijn vrienden zoenen als we gaan trouwen?\n                            </h3>\n                            <p>\n                                Nee dat hoeft niet maar het mag wel.\n                            </p>\n                        </div>\n\n                        <div class="faq-item">\n                            <h3 class="font-border faq-item-header">\n                                Hoe verloopt de huwelijksnacht?\n                            </h3>\n                            <p>\n                                U krijgt ieder een eigen hotelkamer om de nacht in door te brengen.\n                            </p>\n                        </div>\n\n                        <div class="faq-item">\n                            <h3 class="font-border faq-item-header">\n                                Mag ik na het trouwen meteen scheiden van mijn vrienden en toch in de Porsche rijden?\n                            </h3>\n                            <p>\n                                Nee, u blijft gedurende de tijd dat u een Porsche met elkaar deelt \'getrouwd\' en u zult eerlijk de Porsche met uw vrienden moeten delen. Gelukkig gaat dat heel makkelijk dankzij de \'Share a Porsche\' app.\n                            </p>\n                        </div>\n\n                        <div class="faq-item">\n                            <h3 class="font-border faq-item-header">\n                                Moeten we terug naar India als we willen scheiden?\n                            </h3>\n                            <p>\n                                Nee hoor, de ceremonie is niet zodanig dat jullie weer terug moeten. Dit huwelijk is niet rechtsgeldig in Nederland.\n                            </p>\n                        </div>\n\n                        <div class="faq-item">\n                            <h3 class="font-border faq-item-header">\n                                Kunnen er andere mensen voor de ceremonie worden uitgenodigd?\n                            </h3>\n                            <p>\n                                Helaas niet. Het staat u uiteraard vrij om de ceremonie in Nederland nog eens over te doen.\n                            </p>\n                        </div>\n\n                        <div class="faq-item">\n                            <h3 class="font-border faq-item-header">\n                                Krijgen we echt een Porsche tot onze beschikking?\n                            </h3>\n                            <p>\n                                Ja. Zo kunnen jullie meteen kennis maken met \'Share a Porsche\'.\n                            </p>\n                        </div>\n\n                        <div class="faq-item">\n                            <h3 class="font-border faq-item-header">\n                                Krijgen we allemaal een Porsche?\n                            </h3>\n                            <p>\n                                Nee, jullie krijgen samen de beschikking over één Porsche.\n                            </p>\n                        </div>\n\n                        <div class="faq-item">\n                            <h3 class="font-border faq-item-header">\n                                Is de Porsche echt gratis?\n                            </h3>\n                            <p>\n                                Normaal betaalt u met Share a Porsche alleen voor een ‘bundel’ met een bepaald jaarkilometrage en de brandstof. De winnaars van Porsche Marriage betalen gedurende één jaar alleen brandstof. Zie de <a href="#" class="js-btn-conditions">voorwaarden</a>.\n                            </p>\n                        </div>\n\n                        <div class="faq-item">\n                            <h3 class="font-border faq-item-header">\n                                Wanneer moet de Porsche weer worden ingeleverd?\n                            </h3>\n                            <p>\n                                Precies een jaar na aflevering. U wordt hiervan een aantal weken van tevoren op de hoogte gesteld.\n                            </p>\n                        </div>\n\n                        <div class="faq-item">\n                            <p>\n                                De voorwaarden voor deelname vindt u <a href="#" class="js-btn-conditions">hier</a>.\n                            </p>\n                        </div>\n\n                    </div>\n                </div>\n                <div class="layout-clear font-center layout-marginbottom">\n                    <div class="button button-faq-bottom js-button-animated js-button-about" data-href="app">\n                        Share a Porsche\n                    </div>\n                </div>\n            </div>\n        </div>\n    </section>\n\n</div>\n\n\n<div class="button button-bottom-right button-sectionscroller js-button-animated js-button-about content-desktop" data-href="app">\n    Share a Porsche\n</div>'
        }
        return __p
    }
}),
define("view/pages/AboutView", ["require", "jquery", "view/DefaultPageView", "tpl!templates/pages/about"], function(e) {
    var t = e("jquery")
      , n = e("view/DefaultPageView");
    return n.extend({
        template: e("tpl!templates/pages/about"),
        className: "page page-about",
        isAnimatingSection: !1,
        events: {
            scroll: "onScroll",
            "click .js-btn-next": "onNextClick"
        },
        initViews: function() {
            n.prototype.initViews.apply(this),
            this.totalSections = this.$(".js-section").length,
            this.$body = t("body"),
            this.$lastSection = this.$(".js-section[data-id='" + this.totalSections + "']"),
            this.$lastSection.on("scroll", _.bind(this.onLastSectionScroll, this)).on("onwheel" in document ? "wheel" : "mousewheel", _.bind(this.onLastSectionScroll, this)),
            this.curSection = 1,
            App.aboutVisible = !0,
            this.showSectionInstant(this.curSection)
        },
        showSectionInstant: function(e) {
            this.$(".js-section").addClass("state-instant").removeClass("state-up state-active animate-active-up animate-up-active"),
            setTimeout(_.bind(function() {
                this.$(".js-section").removeClass("state-instant")
            }, this), 20),
            App.pages.getPageArgs() && App.pages.getPageArgs().scrolled ? setTimeout(_.bind(function() {
                this.$(".js-section[data-id='" + e + "']").addClass("state-active state-content-animated")
            }, this), 40) : (this.$(".js-section[data-id='" + e + "']").addClass("state-active"),
            setTimeout(_.bind(function() {
                this.$(".js-section[data-id='" + e + "']").addClass("state-content-animated")
            }, this), 200))
        },
        onNextClick: function() {
            this.gotoSection("down")
        },
        gotoSection: function(e, t) {
            App.animatingAbout || this.animate(e, t)
        },
        onLastSectionScroll: function(e) {
            if (this.curSection == this.totalSections && this.isAnimatingSection)
                return e.target.scrollTop = 0,
                e.preventDefault(),
                void 0;
            if (App.env.has("mozilla")) {
                if ("scroll" == e.type) {
                    parseInt(e.originalEvent.wheelDelta || -e.originalEvent.detail || e.originalEvent.deltaY || e.originalEvent.clientY);
                    var t;
                    if (e.target.scrollTop < 20 && e.target.scrollTop < this.prevScrollPos)
                        var t = !0;
                    this.prevScrollPos = e.target.scrollTop
                }
            } else
                var t = e.type.indexOf("wheel") > -1 && Number(e.originalEvent.wheelDelta || e.originalEvent.deltaY) > 0 && 0 === e.currentTarget.scrollTop;
            t && this.disableLastSection()
        },
        animate: function(e) {
            if (!this.animating) {
                var n = t.Deferred();
                if (!e)
                    return n.resolve().promise();
                if ("down" == e) {
                    if (this.curSection >= this.totalSections)
                        return;
                    this.$oldSection && this.$oldSection.removeClass("state-active"),
                    this.curSection++,
                    this.$body.addClass("state-scrolledDown")
                } else if ("up" == e)
                    if (this.curSection <= 1) {
                        if (!App.pages.getPageArgs() || !App.pages.getPageArgs().scrolled)
                            return;
                        App.animatingAbout = !0,
                        App.pages.gotoPage(App.pages.getPreviousPage(), {
                            scrolled: !0
                        })
                    } else
                        this.curSection=this.curSection-2,
                        this.$oldSection && this.$oldSection.removeClass("state-active");
                return "down" == e && (this.$oldSection = this.$(".js-section[data-id='" + (this.curSection - 1) + "']")),
                "up" == e && (this.$oldSection = this.$(".js-section[data-id='" + (this.curSection + 1) + "']")),
                this.$newSection = this.$(".js-section[data-id='" + this.curSection + "']"),
                "down" == e && (this.$oldSection.removeClass("state-active state-content-animated animate-up-active").addClass("state-up animate-active-up"),
                this.$newSection.addClass("state-active state-content-animated")),
                "up" == e && (this.$oldSection.removeClass("animate-up-active animate-active-up"),
                setTimeout(_.bind(function() {
                    this.$oldSection.removeClass("state-active state-content-animated")
                }, this), 20),
                this.$newSection.removeClass("state-up animate-active-up").addClass("state-active state-content-animated animate-up-active")),
                this.animating = !0,
                setTimeout(_.bind(function() {
                    this.animating = !1
                }, this), 1e3),
                this.curSection == this.totalSections && this.activateLastSection(),
                n.promise()
            }
        },
        activateLastSection: function() {
            this.prevLastSectionScroll = 0,
            this.$lastSection.scrollTop(0),
            this.$body.addClass("state-lastSection"),
            App.scrolling.turnOff()
        },
        disableLastSection: function() {
            this.$body.removeClass("state-lastSection"),
            App.scrolling.turnOn()
        },
        transitionIn: function() {
            n.prototype.transitionIn.apply(this)
        },
        transitionOut: function() {
            return this.$lastSection.off(),
            n.prototype.transitionOut.apply(this)
        }
    })
}),
define("tpl!templates/pages/video", [], function() {
    return function(obj) {
        var __p = "";
        with (Array.prototype.join,
        obj || {})
            __p += '<div class="section section-video js-section-video section-video-withbutton">\n    <div class="section-inner js-section-video-inner"></div>\n    <div class="button button-bottom-right button-skipvideo js-button-animated js-button-skip content-desktop" data-href="app">\n        Share a Porsche\n    </div>\n</div>\n';
        return __p
    }
}),
define("view/pages/IntroVideoView", ["require", "jquery", "view/VideoView", "view/DefaultPageView", "tpl!templates/pages/video"], function(e) {
    var t = (e("jquery"),
    e("view/VideoView"))
      , n = e("view/DefaultPageView");
    return n.extend({
        template: e("tpl!templates/pages/video"),
        className: "page page-introvideo",
        events: {
            "click .js-btn-closevideo": "onCloseVideo"
        },
        initViews: function() {
            n.prototype.initViews.apply(this),
            this.videoView = new t({
                el: this.$(".js-section-video-inner"),
                controls: !0,
                poster: "bg-nav-intro.jpg",
                videoId: "intro",
                video: "intro"
            });
            var e = this;
            Backbone.Events.on("video-intro-ended", function() {
                e.gotoNextPage()
            })
        },
        onCloseVideo: function() {
            App.pages.gotoPage("home")
        },
        gotoNextPage: function() {
            App.pages.gotoPage("accept")
        },
        transitionIn: function() {
            n.prototype.transitionIn.apply(this)
        },
        transitionOut: function() {
            return n.prototype.transitionOut.apply(this)
        }
    })
}),
define("tpl!templates/pages/accept", [], function() {
    return function(obj) {
        var __t, __p = "";
        with (Array.prototype.join,
        obj || {}) {
            __p += '\n<div class="section section-accept section-content-centered">\n    <canvas id="image-canvas"></canvas>\n\n    <div class="section-slide-cols">\n        ';
            for (var i = 0; i < (App.settings.mobile ? 4 : 8); i++)
                __p += '\n        <div data-id="' + (null  == (__t = i + 1) ? "" : __t) + '" class="section-slide-col js-section-slide-col">\n            ',
                App.renderVideoImage && (__p += '\n                <div class="section-slide-col-image-wrap">\n                    <img class="section-slide-col-image js-col-image">\n                </div>\n            '),
                __p += "\n        </div>\n        ";
            __p += '\n    </div>\n\n    <div class="section-inner">\n        <div class="layout-wrap">\n            <h2 class="layout-marginbottom-double accept-title">\n                <span class="split">\n                    Helaas, u bent te laat. <br>U kunt nog wel een Porsche delen zonder te trouwen.\n                </span>\n            </h2>\n            <div class="content-animated-default content-animated-default-2">\n                <div class="button js-button-animated" data-href="app">\n                    Vertel me er meer over\n                </div>\n            </div>\n        </div>\n\n        <div class="section-bottom">\n            <div class="btn-scrolldown js-btn-about">\n                Over Porsche Marriage\n            </div>\n        </div>\n    </div>\n\n    <div class="section-bg sectionbg-videoloop js-sectionbg-videoloop">\n    </div>\n\n</div>'
        }
        return __p
    }
}),
define("view/pages/AcceptView", ["require", "jquery", "view/BackgroundVideoView", "view/DefaultPageView", "view/TextAnimationView", "tpl!templates/pages/accept"], function(e) {
    var t = e("jquery")
      , n = e("view/BackgroundVideoView")
      , i = e("view/DefaultPageView")
      , r = e("view/TextAnimationView");
    return i.extend({
        template: e("tpl!templates/pages/accept"),
        className: "page page-accept section-slide",
        scrollToAboutPossible: !0,
        events: {
            "click .js-btn-about": "gotoAbout"
        },
        initViews: function() {
            i.prototype.initViews.apply(this);
            var e = !App.settings.mobile
              , t = 2.05;
            this.startingPoint = this.model.get("args") && this.model.get("args").scrolled ? t : 0,
            this.videoView = new n({
                el: this.$(".js-sectionbg-videoloop"),
                poster: App.pages.getPageArgs() && App.pages.getPageArgs().scrolled ? "bg-accept-slider.jpg" : "poster-accept.jpg",
                startingPoint: this.startingPoint,
                video: "accept",
                loop: !1,
                loopLastPart: e,
                loopFrom: 2.05
            }),
            App.introShown || (this.textAnimationView = new r({
                startDelay: 1,
                textElms: [{
                    $el: this.$el.find(".accept-title"),
                    duration: 5
                }]
            }),
            this.textAnimationView.addAction(this.$el, _.bind(function() {
                this.finishIntro()
            }, this), 5),
            this.textAnimationView.play())
        },
        finishIntro: function() {
            App.introShown = !0,
            t("body").addClass("state-introShown")
        },
        transitionIn: function() {
            i.prototype.transitionIn.apply(this)
        },
        transitionOut: function() {
            return this.finishIntro(),
            i.prototype.transitionOut.apply(this)
        }
    })
}),
define("tpl!templates/pages/app", [], function() {
    return function(obj) {
        var __p = "";
        with (Array.prototype.join,
        obj || {})
            __p += '<div class="section section-app section-content-centered">\n\n    <div class="section-inner section-inner-sidebar">\n        <div class="layout-wrap">\n            <h3 class="font-border content-animated-mobile content-animated-mobile-1">Share a Porsche</h3>\n            <div class="content-animated-mobile content-animated-mobile-2">\n                <p>\n                    Een droom komt dichterbij met Share a Porsche. Met Share a Porsche deelt u met 2, 3 of 4 personen een Porsche. Het delen geldt voor het rijplezier en de kosten. Elke deelnemer kiest een ‘bundel’ met een bepaald jaarkilometrage en het bijbehorende, vaste maandbedrag. Weet u al met wie u dit gaat doen?\n                </p>\n                <a href="http://www.shareaporsche.nl" target="_blank" class="button js-button-animated">\n                    Ontdek Share a Porsche\n                </a>\n            </div>\n        </div>\n    </div>\n\n    <div class="section-bg section-bg-app js-sectionbg-videoloop">\n    </div>\n\n</div>';
        return __p
    }
}),
define("view/pages/AppView", ["require", "jquery", "view/VideoView", "view/BackgroundVideoView", "view/DefaultPageView", "tpl!templates/pages/app"], function(e) {
    var t = (e("jquery"),
    e("view/VideoView"))
      , n = e("view/BackgroundVideoView")
      , i = e("view/DefaultPageView");
    return i.extend({
        template: e("tpl!templates/pages/app"),
        className: "page page-app",
        events: {},
        addContentAnimatedClass: !0,
        initViews: function() {
            i.prototype.initViews.apply(this),
            this.setVideo()
        },
        playBackgroundVideoLoop: function() {
            var e = 13.2;
            this.$el.addClass("state-active state-declined");
            var t = !App.settings.mobile;
            t ? (this.videoView = new n({
                el: this.$(".js-sectionbg-videoloop"),
                forceDesktopBehaviour: !0,
                video: "join-declined-total",
                audio: !0,
                loop: !1,
                autoplay: !1,
                loopLastPart: !0,
                loopFrom: e
            }),
            this.videoView.on("timeupdate", function(e) {
                e >= 8.8 && this.$el.addClass("state-content-animated")
            }, this)) : (this.videoView = new n({
                el: this.$(".js-sectionbg-videoloop"),
                forceDesktopBehaviour: !1,
                video: "loop-app",
                audio: !1,
                loop: !0,
                autoplay: !1
            }),
            this.$el.addClass("state-content-animated")),
            this.videoView.restartVideo()
        },
        playDeclinedMobileVideo: function() {
            this.addContentAnimatedClass = !1;
            var e = document.createElement("div");
            e.className = "section section-video section-video-fullscreen js-section-video";
            var n = document.createElement("div");
            n.className = "section-inner js-section-video-inner",
            e.appendChild(n),
            this.el.appendChild(e),
            this.introVideoView = new t({
                el: this.$(".js-section-video-inner"),
                videoId: "join-declined-intro",
                video: "join-declined-intro"
            }),
            this.introVideoView.playVideo();
            var i = this;
            Backbone.Events.on("video-join-declined-intro-ended", function() {
                i.el.removeChild(e),
                i.$el.addClass("state-active state-content-animated")
            })
        },
        setVideo: function() {
            this.addContentAnimatedClass = !0,
            App.settings.mobile || App.settings.tablet || (this.videoView = new n({
                el: this.$(".js-sectionbg-videoloop"),
                poster: "bg-nav-app.jpg",
                video: "app",
                loop: !0,
                autoplay: !1
            }))
        },
        transitionIn: function() {
            var e = this;
            this.addContentAnimatedClass && setTimeout(function() {
                e.$el.addClass("state-content-animated")
            }, 20)
        },
        transitionOut: function() {
            return i.prototype.transitionOut.apply(this)
        }
    })
}),
define("application", ["require", "settings", "view/NavView", "core/manager/page/PageManager", "core/manager/page/PageRouter", "router/MainRouter", "wheelindicator", "view/MobileSliderView", "view/ZenPreloaderView", "view/CustomPageSwapperView", "controllers/AudioManager", "./view/pages/HomeView", "./view/pages/AboutView", "./view/pages/IntroVideoView", "./view/pages/AcceptView", "./view/pages/AppView"], function(e) {
    var t = (e("settings"),
    e("view/NavView"))
      , n = e("core/manager/page/PageManager")
      , i = e("core/manager/page/PageRouter")
      , r = e("router/MainRouter")
      , s = e("wheelindicator")
      , a = e("view/MobileSliderView")
      , o = e("view/ZenPreloaderView")
      , l = e("view/CustomPageSwapperView")
      , u = e("controllers/AudioManager");
    return function(c) {
        return c.renderVideoImage = !1,
        c.renderVideoImage && $("body").addClass("state-renderVideoImage"),
        c.pages = new n,
        c.pages.register("home", e("./view/pages/HomeView")).register("about", e("./view/pages/AboutView")).register("video", e("./view/pages/IntroVideoView")).register("accept", e("./view/pages/AcceptView")).register("app", e("./view/pages/AppView")),
        c.pageSwapper = new l({
            el: document.getElementById("page-container"),
            manager: c.pages
        }),
        c.nav = new t({
            el: document.getElementById("nav-wrap")
        }),
        c.preloadstartTime = new Date,
        c.introShown = !1,
        App.settings.mobile || App.settings.tablet ? App.mobileSlider = new a : c.audio = new u,
        c.pageVisible = !0,
        App.settings.mobile && $("body").addClass("mobile"),
        c.scrolling = new s({
            elem: document.querySelector("#page-container"),
            callback: _.throttle(function(e) {
                App.animatingAbout || ("down" == e.direction && App.pageSwapper.getPageView().scrollToAboutPossible ? App.pageSwapper.getPageView().gotoAbout() : "about" == App.pageSwapper.getPageView().model.get("path").toString() && App.pageSwapper.getPageView().gotoSection(e.direction))
            }, 150, {
                leading: !1,
                trailing: !0
            })
        }),
        App.userMuted = !1,
        $(document).on("click", ".btn-audio", function() {
            c.audio.muted ? c.audio.unmute() : c.audio.mute(),
            App.userMuted = !App.userMuted
        }),
        Backbone.Events.on("resetAllUserData", function() {}),
        {
            preload: function(e) {
                App.settings.mobile || (this.preloaderDisplayed = !1,
                this.preloaderTimer = setTimeout(_.bind(function() {
                    this.preloaderDisplayed = !0,
                    this.preloaderDIV = document.getElementsByClassName("js-preloader")[0],
                    this.preloaderView = new o({
                        el: this.preloaderDIV
                    }),
                    this.preloaderView.displayPreloader()
                }, this), 1e3)),
                e.add(function(e) {
                    App.settings.mobile ? e() : requirejs(["videojs"], function(t) {
                        window.HELP_IMPROVE_VIDEOJS = !1,
                        window.VIDEOJS_NO_BASE_THEME = !1,
                        App.videojs = t;
                        var n = App.videojs.getComponent("BigPlayButton")
                          , i = App.videojs.extend(n, {
                            constructor: function(e, t) {
                                n.call(this, e, t)
                            },
                            createEl: function(e, t, i) {
                                var r = n.prototype.createEl.call(this, e, t, i);
                                return r.removeChild(this.controlTextEl_),
                                r
                            },
                            buildCSSClass: function() {
                                return "custom-vjs-big-play-button"
                            }
                        });
                        App.videojs.registerComponent("BigPlayButton", i),
                        e()
                    })
                });
                var t = e.addGroup({
                    id: "images",
                    parallelTasks: 4
                });
                App.settings.mobile || (t.addImage(App.settings.serverPath + "/assets/web/images/bg-nav-intro.jpg"),
                t.addImage(App.settings.serverPath + "/assets/web/images/bg-nav-join.jpg"),
                t.addImage(App.settings.serverPath + "/assets/web/images/bg-about.jpg"),
                App.settings.tablet ? t.addImage(App.settings.serverPath + "/assets/web/images/bg-tablet-app.jpg") : (t.addImage(App.settings.serverPath + "/assets/web/images/bg-nav-app.jpg"),
                t.addImage(App.settings.serverPath + "/assets/web/images/bg-home-slider.jpg"),
                t.addImage(App.settings.serverPath + "/assets/web/images/poster-accept.jpg"),
                t.addImage(App.settings.serverPath + "/assets/web/images/poster-home.jpg"),
                t.addImage(App.settings.serverPath + "/assets/web/images/bg-accept-slider.jpg")))
            },
            preloadError: function() {},
            preloadProgress: function() {},
            start: function() {
                App.settings.mobile || App.settings.tablet || !App.audio || App.audio.play(App.audio.GENERAL),
                App.popupContainer = $("#popup-container");
                var e = "home";
                App.settings.groupOwner || App.settings.group && App.settings.group.users >= 3 ? e = App.settings.groupOwner && App.settings.group && App.settings.group.users >= 3 && 0 == App.settings.group.hasMotivation ? "motivation" : "propose" : App.settings.group && (e = App.settings.inGroup ? "propose" : App.settings.mobile || App.settings.tablet ? "home" : "video");
                var t = new i(c.pages,{
                    defaultPage: e,
                    prefix: "",
                    urlToPathMapping: null ,
                    includePages: "all",
                    notFoundPage: e
                })
                  , n = function() {
                    return new r
                }
                ;
                (App.settings.mobile || App.settings.tablet) && ("/video" == window.location.pathname || "/join" == window.location.pathname) && (window.location = "/");
                var s = function() {
                    var e = navigator.userAgent
                      , i = e.indexOf("Mozilla/5.0") > -1 && e.indexOf("Android ") > -1 && e.indexOf("AppleWebKit") > -1 && e.indexOf("Version") > -1
                      , r = i && parseFloat(e.match(/Android\s+([0-9]+\.[0-9]+)/)[1]) < 4.4
                      , s = App.env.has("idevice") && parseFloat(navigator.appVersion.match(/OS\s+(\d+)/)[1]) < 8;
                    if (s || r) {
                        var a = document.getElementById("old-mobile-browser-notice-screen");
                        a.className = r ? "active android" : "active ios",
                        document.documentElement.className += " old-mobile"
                    } else
                        c.startRouters([t, n], {
                            pushState: !0
                        })
                }
                ;
                App.settings.mobile ? ($("body").addClass("state-loaded").removeClass("state-loading"),
                s()) : (clearTimeout(this.preloaderTimer),
                1 == this.preloaderDisplayed ? (this.preloaderView.killPreloader(),
                setTimeout(_.bind(function() {
                    $("body").addClass("state-loaded").removeClass("state-loading"),
                    s()
                }, this), 500)) : ($("body").addClass("state-loaded").removeClass("state-loading"),
                s()))
            }
        }
    }
});
var core = "../../core"
  , libs = "libs"
  , paths = function(e) {
    for (var t in e)
        e.hasOwnProperty(t) && (e[t] = e[t].replace(/\$\{CORE\}/, core).replace(/\$\{LIBS\}/, libs));
    return e
}
;
requirejs.config({
    map: {
        "*": {
            tween: "TweenLite_css",
            core: core,
            libs: libs,
            settings: "json!application_settings.json",
            application: "application"
        }
    },
    paths: paths({
        jquery: "${LIBS}/jQuery/jquery.min",
        underscore: "${LIBS}/underscore/underscore-min",
        backbone: "${LIBS}/backbone/backbone-min",
        "backbone.touch": "${LIBS}/backbone.touch",
        text: "${LIBS}/text/text",
        tpl: "${LIBS}/nonBower/tpl",
        json: "${LIBS}/requirejs-plugins/src/json",
        domReady: "${LIBS}/domReady/domReady",
        TweenLite: "${LIBS}/gsap/src/minified/TweenLite.min",
        TweenLite_css: "${LIBS}/nonBower/TweenLiteWithCSS",
        TweenMax: "${LIBS}/gsap/src/minified/TweenMax.min",
        TimelineMax: "${LIBS}/gsap/src/minified/TimelineMax.min",
        tween_easing: "${LIBS}/gsap/src/minified/easing/EasePack.min",
        tween_bezier_plugin: "${LIBS}/gsap/src/minified/plugins/BezierPlugin.min",
        TweenLite_css_plugin: "${LIBS}/gsap/src/minified/plugins/CSSPlugin.min",
        tween_svg_plugin: "${LIBS}/nonBower/greensock/plugins/DrawSVGPlugin.min",
        tween_splittext_plugin: "${LIBS}/nonBower/greensock/utils/SplitText.min",
        tween_scrolltoplugin: "${LIBS}/gsap/src/minified/plugins/ScrollToPlugin.min",
        swfobject: "${LIBS}/swfobject/swfobject/src/swfobject",
        binaryfile: "${LIBS}/nonBower/binaryfile",
        Snap: "${LIBS}/nonBower/snap.svg-min",
        exif: "${LIBS}/exif-js/exif",
        megapix: "${LIBS}/nonBower/megapix-image",
        jq_form: "${LIBS}/nonBower/jquery.form",
        templates: "../templates",
        async: "${LIBS}/requirejs-plugins/src/async",
        depend: "${LIBS}/requirejs-plugins/src/depend",
        font: "${LIBS}/requirejs-plugins/src/font",
        goog: "${LIBS}/requirejs-plugins/src/goog",
        image: "${LIBS}/requirejs-plugins/src/image",
        mdown: "${LIBS}/requirejs-plugins/src/mdown",
        noext: "${LIBS}/requirejs-plugins/src/noext",
        propertyparser: "${LIBS}/requirejs-plugins/src/propertyParser",
        "markdown.converter": "${LIBS}/requirejs-plugins/lib/Markdown.Converter",
        gsap: "${LIBS}/gsap/src/uncompressed/TweenMax",
        "exif-js": "${LIBS}/exif-js/exif",
        howler: "${LIBS}/howler/howler.custom",
        jsmpeg: "../../../assets/web/js_dynamic/jsmpeg",
        wheelindicator: "${LIBS}/nonBower/wheel-indicator",
        videojs: "../../../assets/web/js_dynamic/video.min",
        hammerjs: "${LIBS}/hammerjs/hammer",
        iphoneInlineVideo: "${LIBS}/nonBower/iphone-inline-video"
    }),
    shim: {
        iphoneInlineVideo: {
            exports: "makeVideoPlayableInline"
        },
        jsmpeg: {
            exports: "jsmpeg"
        },
        underscore: {
            exports: "_"
        },
        exif: {
            deps: ["binaryfile"],
            exports: "EXIF"
        },
        backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },
        swfobject: {
            exports: "swfobject"
        },
        wheelindicator: {
            exports: "WheelIndicator"
        }
    }
}),
define("release_build_536", ["domReady", "core/ApplicationBootstrap", "application"], function(e, t, n) {
    var i = function() {
        var e = window.SETTINGS || {};
        if (window.App = t.bootstrap(e),
        "function" != typeof n)
            throw "application module should be a function";
        var i = n(window.App);
        if ("function" != typeof i.start)
            throw "A start method is required";
        var r = window.App.assets.createPreloader({
            id: "main"
        });
        "window.onload" === Egoframework.preloadBehaviour && r.add(window.Egoframework.windowLoaded, "window.onload"),
        "function" == typeof i.preload && i.preload(r),
        r.start(function() {
            i.start(),
            window.App.ready = !0
        }, function(e) {
            "function" == typeof i.preloadError ? i.preloadError(e) : (window.App.errors.log({
                message: "Error occured in preloader"
            }),
            console.error("Error preloading application"))
        }, function(e) {
            "function" == typeof i.preloadProgress && i.preloadProgress(e)
        })
    }
    ;
    e(i)
});
//# sourceMappingURL=release_build_536.js.map
