/**
 * @author Dawood Butt
 * @description Custom Backbone overwrites
 * @project Latest Offers
 */
 _.templateSettings = {

	//Three regexes:
	//interpolate is for <%= ... %>.
	//escape is for <%- ... %>.
	//evaluate is for <% ... %>.
	//////////////////////////////////////////////////////
	evaluate:    /\{\{(.+?)\}\}/g,					   //
    interpolate: /\{\{=(.+?)\}\}/g,					  //
	escape: /\{\{-(.+?)\}\}/g						   //
	//////////////////////////////////////////////////////
};
$.ajaxSetup({ cache: true });
////////////////////////
//Cache Class
/*Backbone.Cache = function() {
    this.store = {};
};
$.extend(Backbone.Cache.prototype, Backbone.Events, {
    set: function(key, value) {
        this.trigger("set", key, value);
        this.store[key] = value;
    },
    has: function(key) {
        var isHas = !!this.store[key];
        this.trigger("has", key, isHas);
        return isHas;
    },
    get: function(key) {
        var value = this.store[key];
        this.trigger("get", key, value);
        return value;
    },
    remove: function(key) {
        var value = this.store[key];
        this.trigger("remove", key, value);
        delete this.store[key];
        return value;
    },
    clear: function() {
        this.trigger("clear");
        this.store = {};
    }
});*///
////////////////////////
//Fetch Cache
/*Backbone.CachedModel = Backbone.Model.extend({
    fetch: function(options) {
        // If the model has required info for cache
        if (this.cacheKey && this.cacheObject) {
            options = options || {};
            var cacheObject = this.cacheObject,
                cacheKey = this.cacheKey,
                success = options.success;

            // Checking whether the cache object already holds the required data
            if (cacheObject.has(cacheKey)) {
                var resp = cacheObject.get(cacheKey);

                // Do the same as the fetch method does when the data received
                this.set(this.parse(resp, options), options);
                if (success) success(this, resp, options);

                // Returns deferred as the original fetch
                return $.Deferred().resolve();
            } else {
                // The cache object doesn't hold the required data
                // Preparing success method that set the cache 
                options.success = function(entity, resp, options) {
                    cacheObject.set(cacheKey, resp);
                    if (success) success(entity, resp, options);
                };
                // Calling the original fetch
                return Backbone.Model.prototype.fetch.call(this, options);
            }
        } else {
            // No cache for this model, calling the original fetch
            return Backbone.Model.prototype.fetch.call(this, options);
        }
    }
});*/// End of Fetch Cache.
