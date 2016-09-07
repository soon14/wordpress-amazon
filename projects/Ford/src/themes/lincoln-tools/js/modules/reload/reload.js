/**
 * @author szabetian
 * @description reload config module
 * @project Lincoln Build and Price
 */

/**
 * @param exc
 */
(function () {

    var Constants = {
            FRAGMENT: 'load/:uuid',
            STATE_FRAGMENT: 'load-state/:stateAndModelAndDerivativeId',
            USER_VEHICLE_FRAGMENT: 'load-user-vehicles/:key'
        },

        module = {

            /**
             * Share link  http://akamai.wwwdev.dragonfly.ford.com/my-lincoln-configuration/19a756ad-99ba-4328-b140-5491171cc19a
             * 302 Redirect to B&P /lincoln-build-and-price#load/19a756ad-99ba-4328-b140-5491171cc19a
             * AJAX HTTP GET  /servlet/rest/tools/share/19a756ad-99ba-4328-b140-5491171cc19a
             * Returns B&P config as JSON:
             * {"key": "19a756ad-99ba-4328-b140-5491171cc19a","site": "LCNEN2014","priceZoneId": "1137384063721","modelId": "2015_CC9_1007_WSPAD_C_DFYS_null","colourId": "null","trimId": "null","features": ["TPBAR","PN4DU"],"usage": "b","type": "GF"}
             * AJAX POST  /servlet/rest/buildandprice-gf/restore (Payload is above JSON)
             * Returns the ‘normal’ B&P configuration JSON response with relevant features selected.
             *
             */
            reloadSharedConfig: function (uuid) {
                module.loadAndDisplay(ND.LBP.Config.reloadConfigURL + uuid);
            },

            reloadConfigWithState: function (stateAndModelAndDerivativeId) {
                var kayValueParams = {};
                if (stateAndModelAndDerivativeId) {
                    var params = stateAndModelAndDerivativeId.split(';'),
                        keyValue;
                    if (params.length > 0) {
                        _.each(params, function (param) {
                            keyValue = param.split(':');
                            if (keyValue.length > 1) {
                                kayValueParams[keyValue[0]] = keyValue[1];
                            }
                        });
                    }
                }
                if (!$.isEmptyObject(kayValueParams)) {
                    Backbone.trigger(ND.LBP.Events.BlockUI);
                    module.dataloader.getNameplates(function (nameplateCollection) {
                        //kayValueParams.m = modelId
                        nameplateCollection.selectById(kayValueParams.m);
                        var nameplateDetail = module.dataloader.buildAndStoreEmptyNameplateDetail(kayValueParams.m),
                            userActivity = new ND.LBP.CommonModels.UserActivity({
                                state: kayValueParams.s
                            });

                        userActivity.url = userActivity.buildSaveURL(kayValueParams.m);
                        userActivity.save(null, {
                            wait: true,
                            success: function (model, response, options) {
                                nameplateDetail.trigger(ND.LBP.Events.ObjectUpdated, model, response, options, function () {
                                    var selectedEngine = nameplateDetail.findSelectedEngine();
                                    //console.log('model');
                                    //console.dir(model);
//                                    Backbone.trigger(ND.LBP.Events.ReloadingConfig, model);
                                    Backbone.trigger(ND.LBP.Events.GetPage, ND.LBP.Constants.SUMMARY_PAGE_NAME,
                                        kayValueParams.m,
                                        kayValueParams.d,
                                        selectedEngine.id,
                                        function (nextPageUrl) {
                                            Backbone.trigger(ND.LBP.Events.ChangePage, nextPageUrl);
                                            Backbone.trigger(ND.LBP.Events.ReloadingConfig, model);
                                        });
                                });

                            },
                            error: function () {
                                Backbone.trigger(ND.LBP.Events.UnblockUI);
                                Backbone.trigger(ND.LBP.Events.ErrorOccurred, new ND.LBP.CommonModels.Error());
                            }
                        });

                    });
                } else {
                    Backbone.trigger(ND.LBP.Events.ErrorOccurred, new ND.LBP.CommonModels.Error());
                }
            },

            reloadConfigWithVehicleKey: function (vehicleKey) {
                Backbone.trigger(ND.LBP.Events.BlockUI);
                var reloadModel = new ND.LBP.ReloadModels.Reload();
                reloadModel.url = ND.LBP.Config.reloadVehicleKeyConfigURL + vehicleKey + '?v=' + new Date().getTime();
                $.when(reloadModel.fetch()).then(function () {

                    if ( reloadModel.get('sfeatures').length === 0 &&  reloadModel.get('features').length > 0) {
                        //PS integration hack!! place features in sfeatures array
                        reloadModel.set('sfeatures', reloadModel.get('features'));
                        reloadModel.set('features', []);
                    }

                    var colourId = reloadModel.get('sfeatures')[0];

                    reloadModel.set({site: ND.LBP.Config.site,
                        trimId: 0,
                        colourId: colourId,
                        features : reloadModel.get('sfeatures'),
                        priceZoneId: ND.LBP.Config.priceZoneId
                    });
                    module.saveReloadedModel(reloadModel.get('modelId'), reloadModel);
                }).fail(function () {
                    Backbone.trigger(ND.LBP.Events.ErrorOccurred, new ND.LBP.CommonModels.Error());
                });
            },

            buildPageUrl: function () {
                return '';
            },

            loadAndDisplay: function (url) {
                Backbone.trigger(ND.LBP.Events.BlockUI);
                Backbone.trigger(ND.LBP.Events.HideLocationOverlay);
                var reloadModel = new ND.LBP.ReloadModels.Reload();
                reloadModel.url = url;
                $.when(reloadModel.fetch()).then(function () {
                    module.saveReloadedModel(reloadModel.get('modelId'), reloadModel);
                }).fail(function () {
                    Backbone.trigger(ND.LBP.Events.ErrorOccurred, new ND.LBP.CommonModels.Error());
                });
            },

            saveReloadedModel: function (nameplateId, reloadModel) {
                //create and save an empty nameplateDetails
                var nameplateDetail = module.dataloader.buildAndStoreEmptyNameplateDetail(nameplateId);

                //Backbone.trigger(ND.LBP.Events.LocationChanged, reloadModel.get('postcode'), null);

                reloadModel.url = ND.LBP.Config.reloadConfigPostURL;

                reloadModel.save(null, {
                    wait: true,
                    success: function (model, response, options) {
                        nameplateDetail.trigger(ND.LBP.Events.ObjectUpdated, model, response, options, function () {
                            //console.dir(reloadModel);
                           // Backbone.trigger(ND.LBP.Events.ReloadingConfig, reloadModel);
//                            var engineId = reloadModel.get('engineId'),
//                                derivativeId = reloadModel.get('derivativeId');
//                            if (typeof derivativeId !== 'undefined' && derivativeId !== '' &&
//                                typeof engineId !== 'undefined' && engineId !== '') {
                            // module.selectDerivativeAndEngineById(nameplateDetail, derivativeId, engineId);

                            var selectedDerivative = nameplateDetail.get(ND.LBP.Constants.SERIES).get(ND.LBP.Constants.DERIVATIVES).getSelected(),
                                selectedEngine;

//                            _.each(nameplateDerivatives.models, function(derivative) {
//                                derivative.get(ND.LBP.Constants.ENGINES).deselectAll();
//                            });
//
                            if (selectedDerivative != null) {
                                selectedEngine = selectedDerivative.get(ND.LBP.Constants.ENGINES).getSelected();
                            }


                            Backbone.trigger(ND.LBP.Events.GetPage, ND.LBP.Constants.SUMMARY_PAGE_NAME,
                                nameplateId,
                                selectedDerivative.id,
                                selectedEngine.id,
                                function (nextPageUrl) {
                                    Backbone.trigger(ND.LBP.Events.ChangePage, nextPageUrl);
                                    Backbone.trigger(ND.LBP.Events.ReloadingConfig, model);
                                }
                            );
//                            } else {
//                                Backbone.trigger(ND.LBP.Events.ErrorOccurred, new ND.LBP.CommonModels.Error());
//                            }

                        });
                    }
                });
            },

//            selectDerivativeAndEngineById: function(nameplateDetailModel, derivativeId, engineId) {
//                var nameplateDerivatives = nameplateDetailModel.get(ND.LBP.Constants.SERIES).get(ND.LBP.Constants.DERIVATIVES),
//                    selectedDerivative = nameplateDerivatives.selectById(derivativeId);
//
//                _.each(nameplateDerivatives.models, function(derivative) {
//                    derivative.get(ND.LBP.Constants.ENGINES).deselectAll();
//                });
//
//                if (selectedDerivative != null) {
//                    selectedDerivative.get(ND.LBP.Constants.ENGINES).selectById(engineId);
//                }
//            },

            clearCache: function () {
            },

            _init: function () {
                module.dataloader = ND.LBP.Builder;
                var routes = [
                    {
                        fragment: Constants.FRAGMENT,
                        name: ND.LBP.Constants.RELOAD_CONFIG_PAGE_NAME,
                        buildPageUrl: module.buildPageUrl,
                        action: module.reloadSharedConfig
                    },
                    {
                        fragment: Constants.STATE_FRAGMENT,
                        name: ND.LBP.Constants.RELOAD_CONFIG_PAGE_NAME,
                        buildPageUrl: module.buildPageUrl,
                        action: module.reloadConfigWithState
                    },
                    {
                        fragment: Constants.USER_VEHICLE_FRAGMENT,
                        name: ND.LBP.Constants.RELOAD_CONFIG_PAGE_NAME,
                        buildPageUrl: module.buildPageUrl,
                        action: module.reloadConfigWithVehicleKey
                    }
                ];

                Backbone.on(ND.LBP.Events.RegisterModule, function (registerCallback) {
                    registerCallback.call(registerCallback, routes);
                });
            }
        };

    module._init();


})();