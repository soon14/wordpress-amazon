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