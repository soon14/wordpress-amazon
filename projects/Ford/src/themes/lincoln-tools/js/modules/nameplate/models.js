/**
 * @author Sohrab Zabetian
 * @description models for nameplate module
 * @project Lincoln Build and Price
 */


ND.LBP.NameplateModels = (function() {


    var m = {};

    m.Nameplate = Backbone.Model.extend({

        id: null,
        images: null,

        defaults : {
            sequence: 1,
            brand: 'Lincoln',
            modelName: '',
            modelYear: '',
            articleUrl: '',
            seriesURL : '',
            modelNavigatorPageUrl: '',
            isModelNavigator: false,
            getModelPageUrl: null
        },

        defaultImage: null,
        rollOverImage: null,

        prices: null,

        parse: function(response, xhr) {
            return ND.LBP.CommonModels.parseImagesAndPrices(response, xhr, this);
        }

    });

    return m;


})();