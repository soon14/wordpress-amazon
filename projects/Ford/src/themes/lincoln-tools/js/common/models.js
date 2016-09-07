/**
 * @author Sohrab Zabetian
 * @description models for nameplate module
 * @project Lincoln Build and Price
 *
 *
 *
 *
 *     AVAILABLE     Not-selected - Can be selected by the user (could cause a conflict)
 *     DEFAULT       Selected by the system as part of GForce auto-complete
 *     SELECTED      Selected by the user explicitly
 *     INCLUDED      Selected by the system due to another feature requiring it
 *     EXCLUDED      Not-selected – Can be selected by user but will cause a conflict
 *     FORBIDDEN     Should never have features in this state.
 */


ND.LBP.CommonModels = (function() {


    var cm = {};

        cm.StateTable = {
                INCLUDED: {     //Selected by the system due to another feature requiring it
                    label: 'Included',
                    isEnabled: false,
                    isHidden: false,
                    collectWERSCodeInternal: false, //we only want to save features users actually selected, so only selected should be true
                    collectWERSCode: true,
                    priceLabel : 'includedInBasePrice'
                },
                DEFAULT: {       //Selected by the system as part of GForce auto-complete
                    label: 'Remove',
                    isEnabled: true,
                    isHidden: false,
                    collectWERSCodeInternal: false, //we only want to save features users actually selected, so only selected should be true
                    collectWERSCode: true,
                    priceLabel : 'includedInBasePrice'

                },
                AVAILABLE: {        //Not-selected - Can be selected by the user (could cause a conflict)
                    label: 'Apply',
                    isEnabled: true,
                    isHidden: false,
                    collectWERSCodeInternal: false, //we only want to save features users actually selected, so only selected should be true
                    collectWERSCode: false,
                    priceLabel : 'freeToSelect'
                },
                EXCLUDED: {         //Not-selected Ã¢â‚¬â€œ Can be selected by user but will cause a conflict
                    label: 'Apply',
                    isEnabled: false,
                    isHidden: true,
                    collectWERSCodeInternal: false, //we only want to save features users actually selected, so only selected should be true
                    collectWERSCode: false,
                    priceLabel: 'error'
                },
                SELECTED: {   //Selected by the user explicitly
                    label: 'Remove',
                    isEnabled: true,
                    isHidden: false,
                    collectWERSCodeInternal: true, //we only want to save features users actually selected, so only selected should be true
                    collectWERSCode: true,
                    priceLabel : 'freeToSelect'

                },
                FORBIDDEN: {    //Should never have features in this state.
                    label: 'Data error',
                    isEnabled: false,
                    isHidden: true,
                    collectWERSCodeInternal: false, //we only want to save features users actually selected, so only selected should be true
                    collectWERSCode: false ,
                    priceLabel: 'error'
                },
                EXCLUDED_INCOMPATIBLE_WITH_SERIES: {
                    label: 'EXCLUDED_INCOMPATIBLE_WITH_SERIES',
                    isEnabled: false,
                    isHidden: true,
                    collectWERSCodeInternal: false, //we only want to save features users actually selected, so only selected should be true
                    collectWERSCode: true,
                    priceLabel: 'error'
                }
            };



//    cm.parseObject =  function(key, type, embeddedData, context) {
//        var existing = context.get(key);
//        if (existing == null) {
//
//            return new type (embeddedData, {parse: true});
//        }
//        existing.set(embeddedData, {parse: true});
//        return existing;
//    };

    cm.formatFeaturePrice = function(feature) {
        var prices = feature.get(ND.LBP.Constants.PRICES);
        if (typeof prices !== 'undefined' && prices != null && prices.length > 0) {

            var price = prices.at(0);
            if (price.get('value') === 0) {
                return cm.StateTable[feature.get(ND.LBP.Constants.STATE)].priceLabel;
            }
            return ND.PriceFormatter.format('' + price.get('value'));
        }
        return null;

    };

    cm.parseFeatureData =  function(key, embeddedData, context) {
        var existing = context.get(key);
        if (existing == null) {
           return  new ND.LBP.CommonCollections.Features(embeddedData, {parse:true});
        }
        existing.set(embeddedData, {parse:true});
        return existing;
    } ;

    cm.parseFeatureGroupData = function(key, embeddedData, context) {
        var existing = context.get(key);
        if (existing == null) {
            return  new ND.LBP.ExteriorCollections.FeatureGroups(embeddedData, {parse:true});
        }
        existing.set(embeddedData, {parse:true});
        return existing;
    };

    cm.parseImageData = function(key, embeddedData, context) {

        var existing = context.get(key);
        if (existing == null) {
            return  new ND.LBP.CommonCollections.Images(embeddedData, {parse:true});
        }
        existing.set(embeddedData, {parse:true});
        return existing;
    };

    cm.parsePriceData = function(key, embeddedData, context) {
        var existing = context.get(key);
        if (existing == null) {
            return new ND.LBP.CommonCollections.Prices(embeddedData, {parse:true});
        }
        existing.set(embeddedData, {parse:true});
        return existing;
    };


    cm.parseImagesAndPrices = function(response, options, context) {
//        var isTarget = response['name'] === 'Panoramic Vista Roof with Power Shades';

        for(var key in context) {
            if (key === ND.LBP.Constants.IMAGES) {
                var embeddedClass = undefined,
                    embeddedData = response[key];
                if (typeof embeddedData !== 'undefined') {
                    embeddedClass = cm.parseImageData(key, embeddedData, context);
                }
                response[key] = embeddedClass;
//                if (isTarget) {
//                    console.log('images ----> ' + JSON.stringify(response[key]));
//                }

            }
            else if (key === ND.LBP.Constants.PRICES ) {
                var embeddedClass = undefined,
                    embeddedData = response[key];
                if (typeof embeddedData !== 'undefined') {
                    embeddedClass = cm.parsePriceData(key, embeddedData, context);
                }
                response[key] = embeddedClass;
//                if (isTarget) {
//                    console.log('prices *******> ' + JSON.stringify(response[key]));
//                }
            }
        }
        return response;
    };

    cm.Image = Backbone.Model.extend({
        id: '',
        defaults :{
            name: '',
            sequence: 1,
            description: '',
            src: ''
        }
    });

    cm.Price = Backbone.Model.extend({
        id: '',
        defaults :{
            name: '',
            value: '0.0',
            currency: ''
        }
    });


    cm.Header =  Backbone.Model.extend({
        name : null,
        defaults : {
            pathURL: '',
            isEnabled: false,
            selected: false
        }

    });


    cm.Sidebar = Backbone.Model.extend({
        defaults: {
            title : '',
            description : '',
            pageName: '',
            state: '',
            total: null,
            hidePDFShare: true,
            hideSave: true,
            hideConnect: false,
            hidePDFButton: false
        },

        initialize: function() {
            //this.set('buttons', new ND.LBP.CommonCollections.NavigationButtons());
        },

        buttons : null,
        mobileButtons: null

    });

    cm.NavigationButton =  Backbone.Model.extend({
        defaults: {
            name: '',
            tooltip : '',
            sequence: 0,
            type: ND.LBP.Constants.NEXT
        },
        nextPageURL : null,
        urlRoot : null

    });

    cm.Feature = Backbone.Model.extend({
        id: null,
        images: null,

        state: '',
        defaults : {
            description: '',
            originalState: null,
            featureLabel: '',
            isHidden: false,
            primaryImageSrc: '',
            isEnabled: false,
            specialType: null,
            price : null,
            selected: false

        },
        prices: null,

        parse: function(response, xhr) {
           return cm.parseImagesAndPrices(response, xhr, this);
        }
    });

    cm.ImageVariant = Backbone.Model.extend({
       view : null,
       layers : null

//       initialize: function()  {
//          // console.log('ImageVariant.initialize ' + this.cid);
//       }
    });

    cm.Confirm = Backbone.Model.extend({
       defaults : {
           oldDerivativeName: '',
           newDerivativeName : ''
       }
    });

    cm.ImageGroup = Backbone.Model.extend({
        id: null,
        name: null,
        web: null,
        mobile: null,


        parse : function(response, options) {
            var self = this;
            for(var key in self) {
                if (key === 'web' || key === 'mobile') {
                    var embeddedClass = null,
                        embeddedData = response[key],
                        existing = self.get(key);
                    if (existing == null) {
                        embeddedClass =  new ND.LBP.CommonCollections.ImageVariants(embeddedData, {parse:true});
                    } else {
                        //console.log(key + ' id: ' + existing.get('id'));
                        existing.set(embeddedData, {parse:true});
                        embeddedClass = existing;
                    }
                    response[key] = embeddedClass;
                }
            }
            return response;
        }
    });

    cm.KeyFeatures = Backbone.Model.extend({
        defaults : {
            series: null,
            uniqueFeatures: null
        }
    });

    cm.UserActivity = Backbone.Model.extend({
        state: null,
        selections: null, //id, selected
        buildSaveURL: function (nameplateId) {
           return ND.LBP.Config.saveUrl.replace(':nameplateId', nameplateId);
        }

    });

    cm.UserSelection = Backbone.Model.extend({
        id : null,
        selected: false
    });

    cm.Error = Backbone.Model.extend({
       defaults: {
           message: null
       }
    });


    return cm;

})();