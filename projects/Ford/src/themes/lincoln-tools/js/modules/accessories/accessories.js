/**
 * @author Sohrab Zabetian
 * @description accessories module for exterior/interior/accessory pages
 * @project Lincoln Build and Price
 */
(function () {

    var Constants = {
            NAMEPLATE_DETAILS: 'nameplateDetails',
            FRAGMENT: 'nameplates/:nameplateId/series/:seriesId/engines/:engineId/category/:category',
            //TODO: what the hell am i doing here? find a generic way
            CATEGORY_SEQUENCE: {
                exterior: {
                    nextCategory: 'interior',
                    imageGroupId: 'Exterior',
                    omnitureState: '2',
                    headerId: 3
                },
                interior: {
                    nextCategory: 'accessories',
                    imageGroupId: 'Interior',
                    omnitureState: '3',
                    headerId: 4
                },
                accessories: {
                    nextCategory: null,
                    imageGroupId: 'Exterior',
                    omnitureState: '4',
                    omniturePagename: 'features',
                    headerId: 5
                }
            },

            HEADER_IDS: [3, 4, 5]
        },

        _cache = { },

        module = {
            buildPageUrl: function (nameplateId, derivativeId, engineId, category) {
                return '#' + Constants.FRAGMENT
                    .replace(':nameplateId', nameplateId)
                    .replace(':seriesId', derivativeId)
                    .replace(':engineId', engineId)
                    .replace(':category', category);
            },

            trackPage: function (categoryModel) {
                var catName = categoryModel.get('name');
                Backbone.trigger(ND.LBP.Events.TrackOmniture, {
                    state: ND.LBP.Constants.ACCESSORIES_PAGE_NAME,
                    category: {
                        name: (Constants.CATEGORY_SEQUENCE[catName].omniturePagename || catName),
                        //id:  categoryModel.id,
                        omniState: _cache.thisCategory.omnitureState//,
                        //analyticsStep: categoryModel.get('analyticsStep') || (_cache.thisCategory.headerId - 1),
                        //analyticsName: categoryModel.get('analyticsName'),
                    }
                });
            },

            loadAndDisplay: function (nameplateId, derivativeId, engineId, category) {
                //console.log('exteriorModule.loadAndDisplay');

                Backbone.trigger(ND.LBP.Events.BlockUI);

                _cache.nameplateId = nameplateId;
                _cache.derivativeId = derivativeId;
                _cache.category = category;
                _cache.thisCategory = Constants.CATEGORY_SEQUENCE[category];

                module.subscribeToEvents();

                module.dataloader.getNameplateDetails(nameplateId, engineId, true, function (nameplateDetails) {

                    if (nameplateDetails.get('state') == null) {
                        //console.log('app state is null, going back to the beginning');
                        Backbone.trigger(ND.LBP.Events.AppStateIsNull);
                        return;
                    }

                    //console.log('getting images for groupId ' + _cache.thisCategory.imageGroupId);
                    var exteriorInterior = nameplateDetails.get(category),
                        galleryImages = nameplateDetails.get(ND.LBP.Constants.IMAGE_GROUPS)
                                            ? nameplateDetails.get(ND.LBP.Constants.IMAGE_GROUPS).get(_cache.thisCategory.imageGroupId)
                                            : null,
                        headers = module.dataloader.updateHeaders(_cache.thisCategory.headerId, [nameplateId, derivativeId, engineId]),
                        prevNextHeaders = module.dataloader.getNextPrevHeaders();
                    //console.log('Setting imageGroupId: ' + _cache.thisCategory.imageGroupId);

                    _cache.pathUrl = headers.get(_cache.thisCategory.headerId).get('pathURL');

                    _cache.sidebar = module.dataloader.getSidebar({
                        // title: nameplateDetails.get(ND.LBP.Constants.NAME),
                        // description: nameplateDetails.get(ND.LBP.Constants.SIDEBAR_MESSAGES).join(''),
                        pageName: ND.LBP.Constants.ACCESSORIES_PAGE_NAME,
                        buttonData: [
                            {
                                id: 1,
                                name: ND.LBP.Constants.CONTINUE,
                                nextPageURL: prevNextHeaders.next
                            }
                        ],
                        mobileButtonData: [
                            {
                                id: 1,
                                name: ND.LBP.Constants.NEXT,
                                nextPageURL: prevNextHeaders.next
                            }
                        ]
                    });

                    module.setTotalPrice(nameplateDetails);

                    ND.LBP.CommonViews.page()
                        .headers(headers)
                        .exterior(exteriorInterior)
                        .gallery(galleryImages)
                        .sidebar(_cache.sidebar);
                        //.keyFeatures(module.dataloader.getKeyFeatures(nameplateDetails, derivativeId))

                    module.trackPage(exteriorInterior);

                    Backbone.trigger(ND.LBP.Events.UnblockUI);
//                        }
//                    );
                });
            },

            accessoryToggled: function (feature) {
                //console.log('accessoryToggled');
                //only select if it's not selected unless it's an accessory of type not specified below
                var specialType = feature.get('specialType');
                if (specialType === ND.LBP.Constants.COLOUR_TAB_ID ||
                    specialType === ND.LBP.Constants.INTERIOR_TRIM_TAB_ID ||
                    specialType === ND.LBP.Constants.INTERIOR_FABRIC_TAB_ID) {

                    if (!feature.get('selected')) {
                        module.sendAccessoryToggledRequest(feature);
                    }
                } else {
                    module.sendAccessoryToggledRequest(feature);
                }
            },

            sendAccessoryToggledRequest: function (feature) {
                Backbone.trigger(ND.LBP.Events.BlockUI);
                module.dataloader.storeFeatureName(feature.get('name'));
                Backbone.trigger(ND.LBP.Events.SaveProgress, {
                        nameplateId: _cache.nameplateId,
                        currentPathUrl: _cache.pathUrl,
                        changePath: false,
                        selections: [
                            {
                                id: feature.id,
                                selected: !feature.get('selected')
                            }
                        ]
                    },
                    function (nameplateDetails) {


                        _cache.sidebar.set({
                            'description': nameplateDetails.get(ND.LBP.Constants.SIDEBAR_MESSAGES).join('')
                        });
                        module.setTotalPrice(nameplateDetails);
                        Backbone.trigger(ND.LBP.Events.UnblockUI);
                    }
                );
            },

            setTotalPrice: function (nameplateDetails) {
                var prices = nameplateDetails.get(ND.LBP.Constants.PRICES),
                    total = null;

                // Set total to coming soon if total is 0
                if (ND.LBP.Globals.isDerivativePriceHidden) {
                    total = ND.LBP.Config.hidePriceText;
                } else if (typeof prices !== 'undefined' && prices != null && prices.length > 0) {
                    total = ND.PriceFormatter.format(prices.at(0).get('value'));
                }

                nameplateDetails.get(_cache.category).set('total', total);
                _cache.sidebar.set('total', total);
            },

            buttonClicked: function (model) {


                var type = model.get('type'),
                    nextPageUrl = model.get('nextPageURL');
                if (ND.LBP.Constants.NEXT === type) {
                    module.save(function () {
                        module.navigateToUrl(nextPageUrl);
                    });
                }
                else if (ND.LBP.Constants.PREV === type) {
                    module.navigateToUrl(nextPageUrl);
                }
            },

            save: function (callback) {
                module.dataloader.getNameplateDetails(_cache.nameplateId, _cache.engineId, true, function (nameplateDetail) {

                    var featureGroups = nameplateDetail.get(_cache.category).get(ND.LBP.Constants.FEATURE_GROUPS),
                        features,
                        specialType,
                        accessoryEventTriggered = false,
                        omnitureData = {
                            state: ND.LBP.Constants.ACCESSORIES_PAGE_NAME,
                            category: {
                                name: (_cache.thisCategory.omniturePagename || _cache.thisCategory.name),
                                //id:  categoryModel.id,
                                year: nameplateDetail.get('year'),
                                omniState: _cache.thisCategory.omnitureState//,
                                //analyticsStep: categoryModel.get('analyticsStep') || (_cache.thisCategory.headerId - 1),
                                //analyticsName: categoryModel.get('analyticsName'),
                                //isColourCategory: isColourCategory
                            }
                        };
                    featureGroups.each(function (featureGroup) {
                        features = featureGroup.get(ND.LBP.Constants.FEATURES);
                        specialType = featureGroup.get(ND.LBP.Constants.SPECIAL_TYPE);
                        features.each(function (feature) {
                            var state = feature.get('state');
                            if (feature.get('selected') && (state !== 'DEFAULT' && state !== 'INCLUDED')) {
                                //console.log('feature ' + feature.get('name') + ' has specialType ' + specialType);
                                if (specialType === ND.LBP.Constants.COLOUR_TAB_ID) {
                                    Backbone.trigger(ND.LBP.Events.ColorSelected, omnitureData);
                                } else if (specialType === ND.LBP.Constants.RIMS_TAB_ID) {
                                    Backbone.trigger(ND.LBP.Events.RimSelected, omnitureData);
                                } else if (specialType === ND.LBP.Constants.INTERIOR_TRIM_TAB_ID) {
                                    Backbone.trigger(ND.LBP.Events.FabricSelected, omnitureData);
                                } else if (specialType === ND.LBP.Constants.INTERIOR_FABRIC_TAB_ID) {
                                    Backbone.trigger(ND.LBP.Events.TrimSelected, omnitureData);
                                } else if (!accessoryEventTriggered) {
                                    Backbone.trigger(ND.LBP.Events.AccessorySelected, omnitureData);
                                    accessoryEventTriggered = true;
                                }
                            }
                        });
                    });

                    callback();
                });
            },

            headerLinkClicked: function (model, currentHeaderId) {
                //console.log('accessories.headerLinkClicked()');
                var pathURL = model.get('pathURL');
                //we are already on one of these pages
                if (
                //and we are NOT on this category already
                    currentHeaderId < model.id) {
                    //console.log('accessories.headerLinkClicked() changing path');
                    module.save(function () {
                        module.navigateToUrl(pathURL);
                    });
                } else {  //if user is going back, just navigate away
                    module.navigateToUrl(pathURL);
                }
            },

            navigateToUrl: function (pathURL) {
                Backbone.trigger(ND.LBP.Events.UnblockUI);
                Backbone.trigger(ND.LBP.Events.ChangePage, pathURL);
            },

            subscribeToEvents: function () {
                //register events and handlers
                module.unsubscribeFromEvents();
                //console.log(_cache.category + ': subscribeFromEvents');
                Backbone.on(ND.LBP.Events.AccessoryToggled, module.accessoryToggled, module);
                Backbone.on(ND.LBP.Events.ButtonClicked, module.buttonClicked, module);
            },

            unsubscribeFromEvents: function () {
                //unregister events and handlers
                //console.log(_cache.category + ': unsubscribeFromEvents');
                Backbone.off(ND.LBP.Events.AccessoryToggled, module.accessoryToggled);
                Backbone.off(ND.LBP.Events.ButtonClicked, module.buttonClicked);
            },

            clearCache: function () {
                _cache = { };
            },

            _init: function () {
                Backbone.on(ND.LBP.Events.StartOver, module.clearCache, module);
                _.each(Constants.HEADER_IDS, function (currentHeaderId) {
                    Backbone.on(currentHeaderId + ND.LBP.Events.HeaderLinkClicked, function (model) {
                        module.headerLinkClicked(model, currentHeaderId);
                    }, module);
                });

                Backbone.on(ND.LBP.Events.UnsubscribeFromEvents, module.unsubscribeFromEvents, module);
                module.dataloader = ND.LBP.Builder;
                var routes = [
                    {
                        fragment: Constants.FRAGMENT,
                        name: ND.LBP.Constants.ACCESSORIES_PAGE_NAME,
                        buildPageUrl: module.buildPageUrl,
                        action: module.loadAndDisplay
                    }
                ];

                Backbone.on(ND.LBP.Events.RegisterModule, function (registerCallback) {
                    //console.log('exteriorModule.on ' + ND.LBP.Events.RegisterModule + ' event');
                    registerCallback.call(registerCallback, routes);
                });
            }
        };

    module._init();


})();