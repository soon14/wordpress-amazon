/**
 * @author Sohrab Zabetian
 * @description models for accessories module
 * @project Lincoln Build and Price
 */

ND.LBP.ExteriorModels = (function () {


    var m = {};

    m.Accessory = Backbone.Model.extend({

        id: null,
        name: null,
        type: null,
        //selectable: true,
        featureGroups: null,
        defaults : {
            total: null
        },

        /**
         * Parse the response and convert nested JSON response into Backbone objects
         */
        parse: function (response, xhr) {
            for (var key in this) {
                if (key === ND.LBP.Constants.FEATURE_GROUPS) {
                    var embeddedClass,
                        embeddedData = response[key];
                    if (typeof embeddedData !== 'undefined') {
                        embeddedClass = ND.LBP.CommonModels.parseFeatureGroupData(key, embeddedData, this);
                    }
                    response[key] = embeddedClass;
                }
            }
            return response;
        }

    });

    m.FeatureGroup = Backbone.Model.extend({
        id: null,
        name: null,
        type: null,
        specialType: null,
        //selectable: true,
        defaults: {
            sequence: 0,
            isHidden: false
        },

        features: null,

//        getAvailableFeatureCount: function (rules) {
//            var features = this.get('features'),
//                count = 0;
//            if (features.length > 0) {
//               features.each(function(feature) {
//                   if (typeof rules[feature.get('state')] === 'undefined') {
//                       alert('no state');
//                   }  else  if (!rules[feature.get('state')].isHidden) {
//                      count++;
//                   }
//               });
//            }
//            //console.log('featureGroup ' + this.get('name') + ' has feature count ' + count);
//            return count;
//
//        },
        /**
         * Parse the response and convert nested JSON response into Backbone objects
         */
        parse: function (response, xhr) {
            for (var key in this) {
                if (key === ND.LBP.Constants.FEATURES) {
                    var embeddedClass,
                        embeddedData = response[key];
                    if (typeof embeddedData !== 'undefined') {
                        // embeddedClass = ND.LBP.CommonModels.parseFeatureData(key, embeddedData, this);
                        embeddedClass = ND.LBP.CommonModels.parseFeatureData(key, embeddedData, this);
                    }
                    response[key] = embeddedClass;
                }
            }
            return response;
        }
    });

    return m;


})();