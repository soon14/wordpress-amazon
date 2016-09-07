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