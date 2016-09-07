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