/**
 * @author Sohrab Zabetian
 * @description module for series page
 * @project Lincoln Build and Price
 *
 *
 *     AVAILABLE     Not-selected - Can be selected by the user (could cause a conflict)
 *     DEFAULT       Selected by the system as part of GForce auto-complete
 *     SELECTED      Selected by the user explicitly
 *     INCLUDED      Selected by the system due to another feature requiring it
 *     EXCLUDED      Not-selected – Can be selected by user but will cause a conflict
 *     FORBIDDEN     Should never have features in this state.
 */


ND.LBP.NameplateDetailModels = (function () {


    var m = {},

        Constants = {
            hiddenState: 'EXCLUDED_INCOMPATIBLE_WITH_SERIES',
            specialFeatureGroupState: {
                INCLUDED: {     //Selected by the system due to another feature requiring it
                    collectWERSCode: true
                },
                DEFAULT: {       //Selected by the system as part of GForce auto-complete
                    collectWERSCode: true
                },
                AVAILABLE: {        //Not-selected - Can be selected by the user (could cause a conflict)
                    collectWERSCode: false
                },
                EXCLUDED: {         //Not-selected Ã¢â‚¬â€œ Can be selected by user but will cause a conflict
                    collectWERSCode: false
                },
                SELECTED: {   //Selected by the user explicitly
                    collectWERSCode: true
                },
                FORBIDDEN: {    //Should never have features in this state.
                    collectWERSCode: false
                },
                EXCLUDED_INCOMPATIBLE_WITH_SERIES: {
                    collectWERSCode: false
                }
            }
        };

    m.parseSeriesData = function (key, embeddedData, context) {

        var existing = context.get(key);
        if (existing == null) {
            return  new m.Series(embeddedData, {parse: true});
        }
        //Series is a Model object, need to parse again
        existing.set(existing.parse(embeddedData), {parse: true});
        return existing;
    };


    m.parseDerivativeData = function (key, embeddedData, context) {

        var existing = context.get(key);
        if (existing == null) {
            return  new ND.LBP.NameplateDetailCollections.Derivatives(embeddedData, {parse: true});
        }
        existing.set(embeddedData, {parse: true});
        return existing;
    };

    m.parseEngineData = function (key, embeddedData, context) {

        var existing = context.get(key);
        if (existing == null) {
            return  new ND.LBP.NameplateDetailCollections.Engines(embeddedData, {parse: true});
        }
        existing.set(embeddedData, {parse: true});
        return existing;
    };

    m.NameplateDetails = Backbone.Model.extend({

        id: null,
        state: null,
        defaults: {
            total: null,
            name: '',
            year: ''
        },
        prices: null,
        noUserChoice: null,
        imageGroups: null,
        series: null,
        accessories: null,
        interior: null,
        exterior: null,
        changes: null,
        selectionMessages: null,

        buildFetchURL: function (id) {
            return ND.LBP.Config.nameplateDetailURL.replace('{{id}}', id);
        },

        initialize: function () {
            //console.log('NameplateDetails.initialize');
            this.on(ND.LBP.Events.ObjectUpdated, function (model, response, options, callback) {
                //console.log(ND.LBP.Events.ObjectUpdated + ' was called');
                this.setAndPostProcess(model, response, options, callback);
            }, this);
            this.on('sync', function (model, response, option) {
                //console.log('sync was called');
                this.syncPostProcess(model, response, option);
            }, this);

        },

        findSelectedEngine: function () {
            var selectedDerivative = this.get(ND.LBP.Constants.SERIES).get(ND.LBP.Constants.DERIVATIVES).getSelected(),
                selectedEngine = selectedDerivative.get(ND.LBP.Constants.ENGINES).getSelected();
            return selectedEngine;
        },

        /**
         * Engine comes in form EN-TNYBCLCYZBAF which includes EN-<somecode><engineId><derivativeId>
         * @param engineId in form EN-TNYBCLCYZBAF
         * @param derivativeId  YZBAF
         * @return YBCLC in EN-TNYBCLCYZBAF
         */
        dissembleEngineId: function (engineId, derivativeId) {
            var engineWERSCode = engineId.replace(derivativeId, ''),
                featureGroups = this.get(ND.LBP.Constants.NO_USER_CHOICE).get(ND.LBP.Constants.FEATURE_GROUPS),
                features;

            _.find(featureGroups.models, function (featureGroup) {
                if (featureGroup.get(ND.LBP.Constants.NAME) === 'Engine') {
                    features = featureGroup.get(ND.LBP.Constants.FEATURES);
                    return _.find(features.models, function (feature) {
                        if (engineWERSCode.indexOf(feature.id) >= 0) {
                            engineWERSCode = engineWERSCode.replace(feature.id, '').replace(/^_/,'').replace(/_$/,''); 
                            return true;
                        }
                    });
                }
            });

            //console.log(engineWERSCode);

            return engineWERSCode;
        },

        getAllWERSCodes: function () {
            return this.getWERSCodes(true, 'collectWERSCode');

        },

        getSelectedWERSCode: function () {
            return this.getWERSCodes(false, 'collectWERSCodeInternal');
        },

        getWERSCodes: function (includeNoUserChoice, stateAttributeToCheck) {
            var allFeatureGroups = [
                    this.get(ND.LBP.Constants.ACCESSORIES).get(ND.LBP.Constants.FEATURE_GROUPS),
                    this.get(ND.LBP.Constants.EXTERIOR).get(ND.LBP.Constants.FEATURE_GROUPS),
                    this.get(ND.LBP.Constants.INTERIOR).get(ND.LBP.Constants.FEATURE_GROUPS)
                ],
                WERSCodes = [],
                features,
                checkSpecialStates;


            if (includeNoUserChoice) {
                allFeatureGroups.push(this.get(ND.LBP.Constants.NO_USER_CHOICE).get(ND.LBP.Constants.FEATURE_GROUPS));
            }
//            var specialCount, specialWERSCode = [],
//                regularCount, regularWERSCode = [];
            _.each(allFeatureGroups, function (featureGroups) {
                _.each(featureGroups.models, function (featureGroup) {
//                    specialCount = regularCount = 0;
//                    specialWERSCode = [];
//                    regularWERSCode = [];
//                    if (checkSpecialGroup) {
//                        console.log(featureGroup.get('name') + ': (ND.LBP.Constants.INTERIOR_FABRIC_TAB_ID === featureGroup.get(ND.LBP.Constants.SPECIAL_TYPE)' + (ND.LBP.Constants.INTERIOR_FABRIC_TAB_ID === featureGroup.get(ND.LBP.Constants.SPECIAL_TYPE)));
//                    }
                    features = featureGroup.get(ND.LBP.Constants.FEATURES);
                    if (typeof features !== 'undefined' && features.length > 0) {
                        _.each(features.models, function (feature) {
                            if (checkSpecialStates && Constants.specialFeatureGroupState[feature.get('state')][stateAttributeToCheck]) {
                                WERSCodes.push(feature.id);
//                                specialCount++;
//                                specialWERSCode.push(feature.id)
                            } else if (!checkSpecialStates && ND.LBP.CommonModels.StateTable[feature.get('state')][stateAttributeToCheck]) {

                                if (feature.get('state') !== Constants.hiddenState ||
                                    feature.get('originalState') != null && Constants.specialFeatureGroupState[feature.get('originalState')][stateAttributeToCheck]) {
                                    WERSCodes.push(feature.id);
//                                    regularCount++;
//                                    regularWERSCode.push(feature.id);
                                }


                            }
                        });
                    }
//                    if (checkSpecialGroup) {
//                        console.log('added specialCount: ' + (specialCount) + ': ' + specialWERSCode + ' regularCount: ' + (regularCount) + ' ' + regularWERSCode + ' WERS code for featureGroup ' + featureGroup.get('name'));
//                    }
                });
            });
//            if (checkSpecialGroup) {
//                console.log('total # of WERSCodes ' + (_.uniq(WERSCodes).length) + ' : ' + _.uniq(WERSCodes));
//            }
            return _.uniq(WERSCodes);
        },

        setAndPostProcess: function (model, response, options, callback) {
            this.set(this.parse(response), {silent: true});
            //console.log('setAndPostProcess');
            this.syncPostProcess(model, response, options, callback);
        },

        syncPostProcess: function (model, response, options, callback) {
            //console.log('syncPostProcess');
            var derivatives = this.get(ND.LBP.Constants.SERIES).get(ND.LBP.Constants.DERIVATIVES),
                engines,
                isSelected = false,
                categories = [ND.LBP.Constants.EXTERIOR, ND.LBP.Constants.INTERIOR, ND.LBP.Constants.ACCESSORIES];

            _.each(derivatives.models, function (derivative) {
                engines = derivative.get(ND.LBP.Constants.ENGINES);
                _.each(engines.models, function (engine) {
                    isSelected = ND.LBP.Constants.SELECTED_STATES.indexOf(engine.get('state')) >= 0;
                    engine.set({
                        'seriesName': derivative.get('name'),
                        'derivativeId': derivative.id,
                        'selected': isSelected,
                        'description': derivative.get('description'),
                        'isHidden': Constants.hiddenState === engine.get('state')});
//                    console.log('enigne with name ' + engine.get('name') + ' has series name ' + derivative.get('name'));
                });
                derivative.set({'isHidden': Constants.hiddenState === derivative.get('state'),
                    'selected': engines.getSelected() != null}, {silent: true});
                ////console.log('derivative ' + derivative.get('name') + ' is selected? ' + isSelected);
            });

            //We need to manually trigger an event after model is resynced for efficiency
            //otherwise the gallery refreshes on every image add/removal
//            _.each(this.get(ND.LBP.Constants.IMAGE_GROUPS).models, function(imageGroup) {
//                //console.log('triggering change for imageGroup ' + imageGroup.id);
//                imageGroup.trigger('change');
//            });
            //console.log('triggering ' + ND.LBP.Events.ImageGroupUpdated);

            //this.get(ND.LBP.Constants.IMAGE_GROUPS).

            _.each(categories, function (category) {
                this.postProcessFeatures(this.get(category).get(ND.LBP.Constants.FEATURE_GROUPS));
                //hide others when 'theme' exists..
                var models = new Array();
                var themeName = ND.LBP.Config.themename ? ND.LBP.Config.themename : ND.LBP.Constants.FEATURE_THEME;
                var self = this;
                _.each(self.get(category).get(ND.LBP.Constants.FEATURE_GROUPS).models, function (model) {
                    if (model.get('name') !== themeName || model.get('isHidden')) {
                        models.push(model);
                    }
                });
                if (models.length < self.get(category).get(ND.LBP.Constants.FEATURE_GROUPS).models.length) {
                    //this.get(category).get(ND.LBP.Constants.FEATURE_GROUPS).remove(models);
                    _.each(models, function (singlemodel) {
                        self.get(category).get(ND.LBP.Constants.FEATURE_GROUPS).get(singlemodel).set('isHidden', true);
                    });
                }
            }, this);

            Backbone.trigger(ND.LBP.Events.ImageGroupUpdated);

            if (callback) {
                callback(this);
            }

            if (this.get('changes') != null) {
                this.get('changes').set({'nameplateId': this.id, 'featureName': ND.LBP.Builder.getFeatureName()});
                //console.log('triggering conflict resolution');
                Backbone.trigger(ND.LBP.Events.TriggerConflictResolution, this.get('changes'));
            }

        },

        postProcessFeatures: function (featureGroups) {
            //console.log('setPrimaryImageForFeature');

            if (typeof featureGroups !== 'undefined' && featureGroups != null && featureGroups.length > 0) {
                var
                    hiddenCount,
                    features;
//                    hasOnlyOneFeature;
                _.each(featureGroups.models, function (featureGroup) {
                    hiddenCount = 0;
                    features = featureGroup.get(ND.LBP.Constants.FEATURES);

//                    hasOnlyOneFeature = featureGroup.getAvailableFeatureCount(ND.LBP.CommonModels.StateTable) === 1;

                    features.each(function (feature) {

                        var images = feature.get(ND.LBP.Constants.IMAGES),
                            state = feature.get(ND.LBP.Constants.STATE);
                        if (images.length > 0) {
                            feature.set('primaryImageSrc', images.at(0).get('src'), {silent: true});
                        }

                        if (ND.LBP.CommonModels.StateTable[state].isHidden) {
                            hiddenCount++;
                            //console.log('hide feature ' + feature.get('name'));
                        }

                        //console.log('feature ' + feature.get('name') + ' is in state ' + state + ' > assigned label ' + ND.LBP.CommonModels.StateTable[state].label);

                        feature.set({
                            'featureLabel': ND.LBP.CommonModels.StateTable[state].label,
                            'isEnabled': ND.LBP.CommonModels.StateTable[state].isEnabled,
                            'isHidden': ND.LBP.CommonModels.StateTable[state].isHidden,
                            'price': ND.LBP.CommonModels.formatFeaturePrice(feature),
                            'specialType': featureGroup.get(ND.LBP.Constants.SPECIAL_TYPE),
                            'selected': ND.LBP.Constants.SELECTED_STATES.indexOf(feature.get('state')) >= 0
                        });


                    }, this);

                    //console.log('hide featureGroup ' + featureGroup.get('name') + ' with size ' + features.length + ' ? ' + (hiddenCount === features.length));
                    featureGroup.set('isHidden', hiddenCount === features.length);

                }, this);
            }
        },

        /**
         * Parse the response and convert nested featureGroupAttributes JSON response into GeatureGroupAttributes Backbone objects
         */
        parse: function (response, options) {
            for (var key in this) {
                if (key === ND.LBP.Constants.IMAGES) {
                    var embeddedClass,
                        embeddedData = response[key];
                    if (typeof embeddedData !== 'undefined') {
                        embeddedClass = ND.LBP.CommonModels.parseImageData(key, embeddedData, this);
                        //embeddedClass = ND.LBP.CommonModels.parseObject(key, ND.LBP.CommonCollections.Images, embeddedData, this);
                    }
                    response[key] = embeddedClass;
                } else if (key === ND.LBP.Constants.PRICES) {

                    var embeddedClass,
                        embeddedData = response[key];
                    if (typeof embeddedData !== 'undefined') {
                        embeddedClass = ND.LBP.CommonModels.parsePriceData(key, embeddedData, this);
                        //embeddedClass = ND.LBP.CommonModels.parseObject(key, ND.LBP.CommonCollections.Images, embeddedData, this);
                    }
                    response[key] = embeddedClass;
                } else if (key === ND.LBP.Constants.SERIES) {
                    var embeddedClass;
                    embeddedData = response[key];
                    if (typeof embeddedData !== 'undefined') {
//                        embeddedClass = ND.LBP.CommonModels.parseObject(key, m.Series, embeddedData, this);
                        embeddedClass = m.parseSeriesData(key, embeddedData, this);
                        // embeddedClass =  this.get(ND.LBP.Constants.SERIES) == null ? new m.Series(embeddedData, {parse:true}) : this.get(ND.LBP.Constants.SERIES).set(this.get(key).parse(embeddedData));
                    }
                    response[key] = embeddedClass;
                }
                else if (key === ND.LBP.Constants.EXTERIOR || key === ND.LBP.Constants.INTERIOR ||
                    key === ND.LBP.Constants.ACCESSORIES || key === ND.LBP.Constants.NO_USER_CHOICE) {
                    var embeddedClass,
                        embeddedData = response[key];
                    if (typeof embeddedData !== 'undefined') {
                        var existing = this.get(key);
                        if (existing == null) {
                            embeddedClass = new ND.LBP.ExteriorModels.Accessory(embeddedData, {parse: true});
                        } else {
                            embeddedClass = existing.set(existing.parse(embeddedData));
                        }
//                        embeddedClass = ND.LBP.CommonModels.parseObject(key, ND.LBP.ExteriorModels.Accessory, embeddedData, this);

                    }
                    response[key] = embeddedClass;
                } else if (key === ND.LBP.Constants.IMAGE_GROUPS) {
                    var embeddedClass,
                        embeddedData = response[key];
                    if (typeof embeddedData !== 'undefined') {

                        var existing = this.get(key);
                        if (existing == null) {
                            embeddedClass = new ND.LBP.CommonCollections.ImageGroups(embeddedData, {parse: true});
                        } else {
                            existing.set(embeddedData, {parse: true});
                            embeddedClass = existing;
                        }
                        response[key] = embeddedClass;
                    }
                    //response[key] = embeddedClass;
                } else if (key === 'changes') {
                    var embeddedClass = null;
                    embeddedData = response[key];
                    if (typeof embeddedData !== 'undefined') {
                        embeddedClass = new m.Changes(embeddedData, {parse: true});
                    }
                    response[key] = embeddedClass;
                }
            }
            return response;
        }

    });

    m.Changes = Backbone.Model.extend({
        rollbackState: null,
        additions: null,
        subtractions: null,

        defaults: {
            featureName: ''  //feature to be added/removed
        },

        parse: function (response, xhr) {
            for (var key in this) {
                if (key === 'additions' || key === 'subtractions') {
                    var embeddedClass,
                        embeddedData = response[key];
                    if (typeof embeddedData !== 'undefined') {
                        embeddedClass = new ND.LBP.NameplateDetailCollections.SelectedFeatures(embeddedData, {parse: true});
                    }
                    response[key] = embeddedClass;
                }
            }
            return response;
        }
    });

    m.SelectedFeature = Backbone.Model.extend({
        id: null,
        state: null,
        description: null
    });

    m.Series = Backbone.Model.extend({
        id: null,
        name: null,
        type: null,
        //selectable: true,
        features: null,
        defaults: {
            total: null
        },

        parse: function (response) {
            for (var key in this) {
                if (key === ND.LBP.Constants.DERIVATIVES) {
                    var embeddedClass,// = new ND.LBP.NameplateDetailCollections.Derivatives(),
                        embeddedData = response[key];
                    if (typeof embeddedData !== 'undefined') {
//                        embeddedClass.add(embeddedData, {parse:true});
                        // embeddedClass = ND.LBP.CommonModels.parseObject(key, ND.LBP.NameplateDetailCollections.Derivatives, embeddedData, this);
                        embeddedClass = m.parseDerivativeData(key, embeddedData, this);
                    }
                    response[key] = embeddedClass;
                }
            }
            return response;
        }


    });


    m.Derivative = Backbone.Model.extend({

        id: null,
        name: null,
        uniqueFeatures: null,
        //selectable : true,
        images: null,
        prices: null,
        defaults: {
            selected: false
        },
        options: null,

        parse: function (response, xhr) {
            for (var key in this) {
                if (key === ND.LBP.Constants.ENGINES) {
                    var embeddedClass,// = new ND.LBP.NameplateDetailCollections.Engines(),
                        embeddedData = response[key];
                    if (typeof embeddedData !== 'undefined') {
                        //embeddedClass.add(embeddedData, {parse:true});
                        //embeddedClass = ND.LBP.CommonModels.parseObject(key, ND.LBP.NameplateDetailCollections.Engines, embeddedData, this);
                        embeddedClass = m.parseEngineData(key, embeddedData, this);
                    }
                    response[key] = embeddedClass;
                } else if (key === ND.LBP.Constants.IMAGES) {
                    var embeddedClass,
                        embeddedData = response[key];
                    if (typeof embeddedData !== 'undefined') {
                        embeddedClass = ND.LBP.CommonModels.parseImageData(key, embeddedData, this);
                        //embeddedClass = ND.LBP.CommonModels.parseObject(key, ND.LBP.CommonCollections.Images, embeddedData, this);
                    }
                    response[key] = embeddedClass;
                } else if (key === ND.LBP.Constants.PRICES) {

                    var embeddedClass,
                        embeddedData = response[key];
                    if (typeof embeddedData !== 'undefined') {
                        embeddedClass = ND.LBP.CommonModels.parsePriceData(key, embeddedData, this);
                        //embeddedClass = ND.LBP.CommonModels.parseObject(key, ND.LBP.CommonCollections.Images, embeddedData, this);
                    }
                    response[key] = embeddedClass;
                }
            }
            return response;
        }
    });

    m.Engine = Backbone.Model.extend({
        id: null,
        defaults: {
            description: '',
            selected: false,
            seriesName: '',
            price: null
        },
        state: null
    });

    m.NoUserChoice = Backbone.Model.extend({
        id: null
    });


    return m;


})();