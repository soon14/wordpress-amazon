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