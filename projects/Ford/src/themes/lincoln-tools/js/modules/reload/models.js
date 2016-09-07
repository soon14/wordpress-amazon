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