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