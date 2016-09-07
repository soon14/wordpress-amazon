/**
 * @author szabetian
 * @description exterior module
 * @project Lincoln Build and Price
 */

/*******************************START OF DATA LOADER*********************/
(function () {

    var Constants = {
            //NAMEPLATE_DETAILS : 'nameplateDetails',
            FRAGMENT: 'nameplates/:nameplateId',
            DERIVATIVE_ID: 'derivativeId',
            HEADER_ID: 2
        },

        _cache = {
            prevEngineId: null,
            prevDerivativeName: null,
            prevEngineName: null
        },

        module = {

            trackPage: function (nameplateDetails) {
                Backbone.trigger(ND.LBP.Events.TrackOmniture, {
                    state: ND.LBP.Constants.SERIES_PAGE_NAME,
                    year: nameplateDetails.get('year')
                });
            },

            loadAndDisplay: function (nameplateId) {
                //console.log('derivativeModule.loadAndDisplay');
                Backbone.trigger(ND.LBP.Events.BlockUI);
                module.subscribeToEvents();
                _cache.nameplateId = nameplateId;

                module.getModel(function (nameplateDetails) {
                    var series = nameplateDetails.get(ND.LBP.Constants.SERIES),
                        allDerivatives = series.get(ND.LBP.Constants.DERIVATIVES),
                        selectedEngine = nameplateDetails.findSelectedEngine();

                    _cache.derivativeId = selectedEngine ? selectedEngine.get(Constants.DERIVATIVE_ID) : '';
                    _cache.engineName = selectedEngine ? selectedEngine.get(ND.LBP.Constants.NAME) : '';
                    _cache.derivativeName = selectedEngine ? allDerivatives.get(_cache.derivativeId).get(ND.LBP.Constants.NAME) : '';
                    _cache.engineId = selectedEngine ? selectedEngine.id : '';

                    //console.log('found selectedEngine with derivativeId ' + selectedEngine.get(Constants.DERIVATIVE_ID));
                    //Backbone.trigger(ND.LBP.Events.GetPage, 'exterior', nameplateId, _cache.derivativeId, ND.LBP.Utils.removeDotSlash(_cache.engineId), 'exterior', function(nextPageUrl) {


                    //have to create headers before sidebar
                    var headerData = module.dataloader.updateHeaders(Constants.HEADER_ID, [nameplateId, _cache.derivativeId, ND.LBP.Utils.removeDotSlash(_cache.engineId)]),
                        nextPrevPages = module.dataloader.getNextPrevHeaders();

                    $('.nameplate-title').text('- ' + nameplateDetails.get('name'));

                    var nameplateValue = nameplateDetails.get('prices').at(0).get('value');

                    // Set global flag isDerivativePriceHidden to true
                    ND.LBP.Globals.isDerivativePriceHidden = nameplateValue == 1;

                    _cache.pathUrl = headerData.get(Constants.HEADER_ID).get('pathURL');
                    //console.log('nextPage url is ' + nextPrevPages.next + ' prevPage url is ' +  nextPrevPages.prev);


                    /* Comment out sidebar in case its needed again */
                    //
                    _cache.sidebar = module.dataloader.getSidebar({
                        // title: nameplateDetails.get(ND.LBP.Constants.NAME),
                        // description: nameplateDetails.get(ND.LBP.Constants.SIDEBAR_MESSAGES).join(''),
                        pageName: ND.LBP.Constants.SERIES_PAGE_NAME,
                        buttonData: [
                            {
                                id: 1,
                                name: ND.LBP.Constants.CONTINUE,
                                nextPageURL: nextPrevPages.next,
                                sequence: 0
                            }
                        ],
                        mobileButtonData: [
                            {
                                id: 1,
                                name: ND.LBP.Constants.NEXT,
                                nextPageURL: nextPrevPages.next,
                                sequence: 0
                            }
                        ]
                    });

                    _cache.sidebar.set('total', null);

                    ND.LBP.CommonViews
                        .page()
                        .headers(headerData)
                        .derivatives(series)
                        .sidebar(_cache.sidebar);

                    Backbone.trigger(ND.LBP.Events.UnblockUI);

                    module.trackPage(nameplateDetails);


                });
            },

//            setTotalPrice: function (nameplateDetails) {
//                var prices = nameplateDetails.get(ND.LBP.Constants.PRICES),
//                    total = null;
//                if (typeof prices !== 'undefined' && prices != null && prices.length > 0) {
//                    total = ND.PriceFormatter.format(prices.at(0).get('value'));
//                }
//                nameplateDetails.get(ND.LBP.Constants.SERIES).set('total', total);
//                _cache.sidebar.set('total', total);
//            },

            updateUserSelection: function (engine) {
                var derivativeId = engine.get(Constants.DERIVATIVE_ID);

                module.dataloader.getNameplateDetails(_cache.nameplateId, null, true, function (nameplateDetails) {

                    var nameplateDerivatives = nameplateDetails.get(ND.LBP.Constants.SERIES).get(ND.LBP.Constants.DERIVATIVES),
                        selectedDerivative = nameplateDerivatives.selectById(derivativeId);

                    _.each(nameplateDerivatives.models, function (derivative) {
                        derivative.get(ND.LBP.Constants.ENGINES).deselectAll();
                    });

                    selectedDerivative.get(ND.LBP.Constants.ENGINES).select(engine);

                    _cache.sidebar.set(Constants.DESCRIPTION, selectedDerivative.get(Constants.DESCRIPTION));

                    _cache.derivativeId = derivativeId;
                    _cache.derivativeName = selectedDerivative.get(ND.LBP.Constants.NAME);
                    _cache.engineId = engine.id;
                    _cache.engineName = engine.get(ND.LBP.Constants.NAME);
                    //will update the headers
                    module.dataloader.updateHeaders(Constants.HEADER_ID, [_cache.nameplateId, _cache.derivativeId, ND.LBP.Utils.removeDotSlash(_cache.engineId)]);
                    //Backbone.trigger(ND.LBP.Events.GetPage, 'exterior', _cache.nameplateId, derivativeId, ND.LBP.Utils.removeDotSlash(engine.id),'exterior', function(pageUrl) {
                    //console.log('updated page url is ' + pageUrl);
//                    var enginePrice = engine.get('price');
//                    if (enginePrice != null) {
//                        _cache.sidebar.set('total', enginePrice);
//                        nameplateDetails.get(ND.LBP.Constants.SERIES).set('total', enginePrice);
//                    }
                    module.dataloader.updateSidebarButtonUrl(1, module.dataloader.getNextPrevHeaders().next);
                    // });

                });
            },

            /**
             *
             * @param model Navigation button
             */
            saveAndContinue: function (model) {

                module.save(function () {
                    Backbone.trigger(ND.LBP.Events.UnblockUI);

                    //update sidebar
					var orgurl=model.get('nextPageURL'),
						nexturl='',
						i=0;
					$.each(orgurl,function(index,c){
						if (c==='#') {
							i++;
							if(i>1) {
								nexturl=nexturl+encodeURIComponent("#");
								}
							else {
								nexturl=nexturl+c;
							}
						}
						else {
							nexturl=nexturl+c;
						}
					});	
                    Backbone.trigger(ND.LBP.Events.ChangePage, nexturl);
                });
            },

            save: function (callback) {
                //confirm with user before switching derivatives
                if (_cache.prevEngineId == null || _cache.engineId !== _cache.prevEngineId) {

                    if (_cache.prevEngineId != null) {
                        Backbone.off(ND.LBP.Events.ChangeSeries);
                        Backbone.once(ND.LBP.Events.ChangeSeries, function () {
                            module.saveProgress(callback);
                        });

                        Backbone.trigger(ND.LBP.Events.ConfirmSeriesChange, new ND.LBP.CommonModels.Confirm({
                            newDerivativeName: _cache.derivativeName + ' ' +  _cache.engineName,
                            oldDerivativeName: _cache.prevDerivativeName + ' ' + _cache.prevEngineName
                        }));
                    } else {
                        module.saveProgress(callback);
                    }

                } else {
                    callback();
                }
            },

            saveProgress: function (callback) {

                Backbone.off(ND.LBP.Events.ChangeSeries);

                _cache.prevEngineId = _cache.engineId;
                _cache.prevDerivativeName = _cache.derivativeName;
                _cache.prevEngineName = _cache.engineName;
                Backbone.trigger(ND.LBP.Events.BlockUI);
                Backbone.trigger(ND.LBP.Events.SaveProgress, {
                    nameplateId: _cache.nameplateId,
                    state: null,
                    currentPathUrl: _cache.pathUrl,
                    changePath: true,
                    selections: [
                        {
                            id: _cache.engineId,
                            selected: true
                        }
                    ]
                }, callback);
            },

            buttonClicked: function (model) {
                var type = model.get('type');
                if (ND.LBP.Constants.NEXT === type && _cache.engineId.length) {
                    module.saveAndContinue(model);
                } else if (ND.LBP.Constants.PREV === type) {
                    Backbone.trigger(ND.LBP.Events.ChangePage, model.get('nextPageURL'));
                }
            },

            getModel: function (callback) {
                module.dataloader.getNameplateDetails(_cache.nameplateId, null, true, callback);
            },

            buildPageUrl: function (nameplateId) {
                return '#' + Constants.FRAGMENT.replace(':nameplateId', nameplateId);
            },

            subscribeToEvents: function () {
                //register events and handlers
                Backbone.on(ND.LBP.Events.SeriesEngineSelected, module.updateUserSelection, module);
                Backbone.on(ND.LBP.Events.ButtonClicked, module.buttonClicked, module);
            },

            unsubscribeFromEvents: function () {
                Backbone.off(ND.LBP.Events.SeriesEngineSelected, module.updateUserSelection);
                Backbone.off(ND.LBP.Events.ButtonClicked, module.buttonClicked);
            },

            headerLinkClicked: function (model) {
                //console.log('series.headerLinkClicked()');
                var pathUrl = model.get('pathURL')
                if (Constants.HEADER_ID < model.id) {
                    //console.log('series.headerLinkClicked() changing path');
                    module.save(function () {
                        Backbone.trigger(ND.LBP.Events.UnblockUI);
                        Backbone.trigger(ND.LBP.Events.ChangePage, pathUrl);
                    });
                } else {   //going back to nameplate page
                    Backbone.trigger(ND.LBP.Events.ChangePage, pathUrl);
                }

            },

            clearCache: function () {
                _cache = {
                    prevEngineId: null,
                    prevDerivativeName: null,
                    prevEngineName: null
                }
            },

            reloadCache: function (reloadModel) {
                _cache = {

                }

                module.dataloader.getNameplateDetails(reloadModel.id, null, true, function (nameplateDetailModel) {

                    var nameplateDerivatives = nameplateDetailModel.get(ND.LBP.Constants.SERIES).get(ND.LBP.Constants.DERIVATIVES),
                        selectedDerivative = nameplateDerivatives.getSelected();

                    _cache.prevDerivativeName = selectedDerivative.get(ND.LBP.Constants.NAME);
                    var engine = selectedDerivative.get(ND.LBP.Constants.ENGINES).getSelected();
                    _cache.prevEngineId = engine.id;
                    _cache.prevEngineName = engine.get(ND.LBP.Constants.NAME);

                });
                Backbone.off(ND.LBP.Events.ReloadingConfig, module.reloadCache);

            },

            _init: function () {
                Backbone.on(ND.LBP.Events.StartOver, module.clearCache, module);
                Backbone.on(Constants.HEADER_ID + ND.LBP.Events.HeaderLinkClicked, module.headerLinkClicked, module);
                Backbone.on(ND.LBP.Events.UnsubscribeFromEvents, module.unsubscribeFromEvents, module);
                Backbone.on(ND.LBP.Events.ReloadingConfig, module.reloadCache, module);
                module.dataloader = ND.LBP.Builder;
                var routes = [
                    {
                        fragment: Constants.FRAGMENT,
                        name: ND.LBP.Constants.SERIES_PAGE_NAME,
                        buildPageUrl: module.buildPageUrl,
                        action: module.loadAndDisplay
                    }
                ];

                Backbone.on(ND.LBP.Events.RegisterModule, function (registerCallback) {
                    //console.log('derivativeModule.on ' + ND.LBP.Events.RegisterModule + ' event');
                    registerCallback.call(registerCallback, routes);
                });
            }
        };

    module._init();

//    Backbone.on(ND.LBP.Events.InitModules, $.proxy(nameplateModule._init, nameplateModule));

})();