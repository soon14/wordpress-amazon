var define1, require1;
(function() {
    var contexts = {},
        globalDefQueue = [],
        defQueue = {},
        reqFile = 0;
    newContext = function() {
        context = {};
        registry = {};
        Module = function(dep, factory, id) {
            this.id = id;
            // this.events = getOwn(undefEvents, map.id) || {};
            this.events = {};
            this.factory = factory;
            this.dep = dep;
            this.depExports = [];
            dep.forEach(function(val) {
                registry[val] = this;
                registry[val].on('defined', function(id, depExports) {
                    console.log(depExports);
                    this.depExports.push(depExports);
                    // registry[this.id].init(defQueue[this.id][0], defQueue[this.id][2]);
                    this.dep.splice(this.dep.findIndex(function(val) { return val === id }), 1);
                    if (registry[this.id] && this.dep.length === 0) {
                        var tmpExport = this.factory.apply(null, this.depExports);
                        registry[this.id].emit(this.id, tmpExport);
                    }
                    else if(this.dep.length ===0) {
                    	this.factory.apply(null, this.depExports);
                    }
                }.bind(this));
            }, this);
        };
        Module.prototype = {
            init: function(id, factory) {
                this.exports = factory.apply();
                this.emit(id, this.exports);
            },
            on: function(name, cb) {
                var cbs = this.events[name];
                if (!cbs) {
                    cbs = this.events[name] = [];
                }
                cbs.push(cb);
            },
            emit: function(id, depExport) {
                this.events['defined'][0](id, depExport);
            }
        };
        config = function(deps, callback, id) {

            setTimeout(function() {
                console.log(deps);
                console.log(contexts);
                new context.Module(deps, callback, id);
                load(deps);
            });
        };
        onScriptLoad = function(evt) {
            if (evt.type === 'load') {
                var mid = evt.currentTarget.getAttribute('data-requiremodule');
                if (globalDefQueue.length) {
                    defQueue[mid] = globalDefQueue[0];
                    globalDefQueue = [];
                    if (defQueue[mid][1].length === 0) {
                        registry[defQueue[mid][0]].init(defQueue[mid][0], defQueue[mid][2]);
                    } else {
                        contexts.config(defQueue[mid][1], defQueue[mid][2], defQueue[mid][0]);
                    }
                }
            }
        };
        load = function(deps) {
            deps.forEach(function(val) {

                var node = document.createElement('script');
                node.type = "text/javascript";
                node.charset = 'utf-8';
                node.async = true;
                node.src = './' + val + '.js';
                node.addEventListener('load', contexts.onScriptLoad);
                node.setAttribute('data-requiremodule', val);
                document.getElementsByTagName('head')[0].appendChild(node);
            })
        };
        context = { config: config, Module: Module, onScriptLoad: onScriptLoad };
        return context;

    };
    define1 = function(name, deps, callback) {
        globalDefQueue.push([name, deps, callback]);
    };
    require1 = function(deps, callback, id) {
        if (!contexts.Module) contexts = newContext();
        if (!id) {
            contexts.config(deps, callback, ++reqFile);
        } else {
            contexts.config(deps, callback, id);
        }
    };
    var cfg = {};
    var script = document.getElementsByTagName('script')[0];
    cfg.id = [script.dataset.main];
    require1(cfg.id, null, ++reqFile);
})();
console.log(require1);