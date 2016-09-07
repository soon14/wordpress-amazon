/**
 * @author Sohrab Zabetian
 * @description loader
 * @project Lincoln Build and Price
 */

ND.LBP.Builder = (function() {

    var
  //  nm = ND.LBP.NameplateModels,
    nc = ND.LBP.NameplateCollections,
    ndm = ND.LBP.NameplateDetailModels,
   // ndc = ND.LBP.NameplateDetailCollections,
    cm = ND.LBP.CommonModels,
    cc = ND.LBP.CommonCollections,

    l = {  //loader

        _cache : {},

        pf : {    //public functions

            keys : {
                NAMEPLATES : 'nameplates',
                NAMEPLATE_DETAILS : 'nameplateDetails',
                CATEGORIES : 'categories',
                HEADERS : 'headers',
                SIDEBAR : 'sidebar',
                FEATURE_NAME : 'featureName',
                KEY_FEATURES: 'keyFeatures'
            },

            store : function(modelName, model) {
                l._cache[modelName] = model;
            },

            load : function(modelName) {
                return l._cache[modelName];
            },

            remove : function(modelName) {
                delete l._cache[modelName];
            },

            removeAll : function(modelList) {
                for (var i = 0; i < modelList.length; i++) {
                    delete l._cache[modelList[i]];
                }
            },

            reset : function() {
                l._cache[l.pf.keys.NAMEPLATE_DETAILS] = undefined;
                l._cache[l.pf.keys.NAMEPLATES] = undefined;
            },
            /**
             *
             * @param currentCategory
             * @param optionsArray  should be pagename, all values passed to construct url
             * @returns {*}
             */
            updateHeaders: function(currentCategory, optionsArray) {

              var headers = l.pf.getHeaders(),
                  categories = ND.LBP.Config.categories,
                  isNotSeriesTab = true;

                //console.log(currentCategory);
               _.each(headers.models, function(header) {
                   // isNotSeriesTab = (currentCategory > 2 || header.id < 2);
                     //header.id - 1 because headerIds start at 1 and we need to map the id to the arrays above
                    Backbone.trigger.apply(Backbone, [ND.LBP.Events.GetPage, header.get('fragment')].concat(optionsArray, [categories[header.id - 1], function(nextPageUrl) {

                        header.set({'pathURL' : nextPageUrl, 'isEnabled' : ((nextPageUrl.indexOf('undefined') === -1) && (nextPageUrl.indexOf('//') === -1) && isNotSeriesTab), 'selected' : (currentCategory === header.id)}, {silent: true});
                        header.trigger('change'); //manually trigger change, otherwise by line above change event is triggered 3 times
                        // console.log(nextPageUrl);
                       // console.log('current category:  ' + currentCategory + ' header id ' + header.id + ' pathURL ' + header.get('pathURL'));
                    }]));
               });


                return headers;
            },

            storeFeatureName: function(name) {
                l.pf.store(l.pf.keys.FEATURE_NAME, name);
            },

            getFeatureName: function() {
                return l.pf.load(l.pf.keys.FEATURE_NAME);
            },

            getHeaders: function() {
                var headers = l.pf.load(l.pf.keys.HEADERS);
                if (typeof headers === 'undefined') {
                    headers = b.buildHeaders();
                    l.pf.store(l.pf.keys.HEADERS,headers);
                }

                return headers;
            },

            getRouteForPage: function(pagename) {

                var results = l.pf.getHeaders().where({'pagename' : pagename});
                if (results != null && results.length > 0) {
                    //console.log('getRouteForPage for ' + pagename + ' is ' + results[0].get('pathURL'));
                    return results[0].get('pathURL');
                }
                //console.log('getRouteForPage for ' + pagename + ' is null');
                return null;
            },


            getCurrentHeader: function() {
                var headers = l.pf.load(l.pf.keys.HEADERS);
                if (typeof headers !== 'undefined' && headers != null) {
                    return headers.getSelected();
                }
                return null;
            },

            getNextPrevHeaders: function() {
                var headers = l.pf.load(l.pf.keys.HEADERS),
                    response = {next: null, prev: null};
                if (typeof headers !== 'undefined' && headers != null) {
                    var id = headers.getSelected().id;

                    response.next = headers.get((id + 1)) != null ? headers.get((id + 1)).get('pathURL') : null;
                    response.prev = headers.get((id - 1)) != null ? headers.get((id - 1)).get('pathURL') : null;

                }
                return response;
            },

            getNameplates: function(success) {
                l.fetchOrLoad(l.pf.keys.NAMEPLATES, new nc.Nameplates(), function(serverNameplates) {
                    //postprocess

                   // var nameplate = new nm.Nameplate();

                    _.each(serverNameplates.models, function(serverNameplate) {
                        var images = serverNameplate.get('images');
//                        console.log(images.length);

                        var defaultImage,
                            rollOverImage;

                        if (images.length > 1) {
                           defaultImage = images.at(0).get('src');
                           rollOverImage =  images.at(1).get('src');
                        } else if (images.length > 0) {
                            defaultImage = images.at(0).get('src');
                            rollOverImage =  images.at(0).get('src');
                        }

                        serverNameplate.set({'defaultImage': defaultImage,
                                             'rollOverImage': rollOverImage,
                                              'seriesURL' : u.seriesPageUrl(serverNameplate.id)});
//                        console.log(images.at(0).get('src'));
//                        console.log(images.at(1));
                    });

                    success(serverNameplates);
                });
            },

            getNameplateDetails : function(nameplateId, engineId, useCache, success) {
                //need to load nameplates to ensure omniture is up to date.
                l.pf.getNameplates(function(nameplateCollection) {
                    var model = nameplateCollection.selectById(nameplateId),
                        nameplateDetails = new ndm.NameplateDetails(),
                        articleUrl = model.get('articleUrl');

                    //console.log('modelYear for model ' + model.get('modelName') + ' is ' + model.get('modelYear'));
                        //console.log('articleUrl: ' + articleUrl);
                    Backbone.trigger(ND.LBP.Events.NameplateChanged, {
                        name: model.get('modelName'),
                        year: model.get('modelYear'),
                        id: model.id,
                        category : model.get('category'),
                        analyticsCategory : model.get('analyticsCategory'),
                        analyticsName : model.get('analyticsName')
                    });

                    nameplateDetails.url = nameplateDetails.buildFetchURL(nameplateId);
                    if (useCache) {
                        l.fetchOrLoad(l.pf.keys.NAMEPLATE_DETAILS, nameplateDetails, function(seriesDetails) {
                            l.validateAndPostProcessSeries(seriesDetails, nameplateId, engineId, articleUrl, success);
                        });
                    } else {
                        l.fetchFromServer(l.pf.keys.NAMEPLATE_DETAILS, nameplateDetails, function(seriesDetails) {
                            l.validateAndPostProcessSeries(seriesDetails,nameplateId, engineId, articleUrl, success);
                        });
                    }
                });
            },

            getKeyFeatures: function(nameplateDetail, derivativeId) {
                var selectedDerivative = nameplateDetail.get(ND.LBP.Constants.SERIES)
                                                        .get(ND.LBP.Constants.DERIVATIVES)
                                                        .get(derivativeId),
                    keyFeatures = l.pf.load(l.pf.keys.KEY_FEATURES),
                    attributes = {
                        series : selectedDerivative.get('name'),
                        uniqueFeatures: selectedDerivative.get(ND.LBP.Constants.UNIQUE_FEATURES),
                        articleUrl: selectedDerivative.get(ND.LBP.Constants.ENGINES).getSelected().get('articleUrl')
                    };

                if (typeof keyFeatures === 'undefined') {
                    keyFeatures = new cm.KeyFeatures(attributes);
                    l.pf.store(l.pf.keys.KEY_FEATURES,keyFeatures);
                } else {
                    keyFeatures.set(attributes);
                }
                return keyFeatures;
            },

            getSidebar: function(data) {
               var storedSidebar = l.pf.load(l.pf.keys.SIDEBAR);

               if (typeof storedSidebar === 'undefined') {
                   storedSidebar = new cm.Sidebar({
                       buttons: new cc.NavigationButtons(),
                       mobileButtons: new cc.NavigationButtons()
                   });

                   l.pf.store(l.pf.keys.SIDEBAR, storedSidebar);
               }

                var buttons = storedSidebar.get('buttons');
                buttons.reset();

                if (typeof data.buttonData !== 'undefined') {
                    _.each(data.buttonData, function(dataButton) {
                        buttons.add(new cm.NavigationButton(dataButton), {silent: true});
                    });
                }

                var mobileButtons = storedSidebar.get('mobileButtons');
                mobileButtons.reset();

                if (typeof data.mobileButtonData !== 'undefined') {
                    _.each(data.mobileButtonData, function(mobileButton) {
                        mobileButtons.add(new cm.NavigationButton(mobileButton), {silent: true});
                    });
                }

                storedSidebar.set({
                    'title':         data.title,
                    'description':   data.description,
                    'pageName':      data.pageName,
                    'state':         data.state,
                    'hidePDFShare':  (typeof data.hidePDFShare === 'undefined')  ? true  : data.hidePDFShare,
                    'hideSave':      (typeof data.hideSave === 'undefined')      ? true  : data.hideSave,
                    'hideConnect':   (typeof data.hideConnect === 'undefined')   ? false : data.hideConnect,
                    'hidePDFButton': (typeof data.hidePDFButton === 'undefined')  ? false  : data.hidePDFButton
                }, {silent: true});

                storedSidebar.trigger('change');

                return storedSidebar;
            },

            updateSidebarButtonUrl: function(buttonId, url) {
                var storedSidebar = l.pf.load(l.pf.keys.SIDEBAR);
                if (typeof storedSidebar !== 'undefined') {
                    var button = storedSidebar.get('buttons').get(buttonId);
                    if (typeof button !== 'undefined' && button != null) {
                        button.set('nextPageURL', url);
                    }
                    button = storedSidebar.get('mobileButtons').get(buttonId);
                    if (typeof button !== 'undefined' && button != null) {
                        button.set('nextPageURL', url);
                    }
                }
            },

            buildAndStoreEmptyNameplateDetail: function(nameplateId) {
                var nameplateDetails = new ndm.NameplateDetails();
                nameplateDetails.url = nameplateDetails.buildFetchURL(nameplateId);
                l.pf.store(l.pf.keys.NAMEPLATE_DETAILS, nameplateDetails);

                return nameplateDetails;
            }

        },

        validateAndPostProcessSeries: function(seriesDetails, nameplateId, engineId, articleUrl, success) {

            //page reload
//            if (seriesDetails.get('state') == null && (typeof engineId !== 'undefined') && engineId != null) {
//                Backbone.trigger(ND.LBP.Events.SaveProgress, {
//                    nameplateId: nameplateId,
//                    changePath: false,
//                    selections: [{
//                        id: engineId,
//                        selected: true
//                    }]
//                }, function() {
//                    l.postProcessSeries(seriesDetails, articleUrl, success);
//                });
//            } else {
                l.postProcessSeries(seriesDetails, articleUrl, success);
//            }
        },

        postProcessSeries: function(seriesDetails, articleUrl, success) {
            var derivatives = seriesDetails.get(ND.LBP.Constants.SERIES).get(ND.LBP.Constants.DERIVATIVES),
                derivativePrice,
                priceHackConfig = ND.LBP.Config.priceHack,
                enginesNotShowHackConfig = ND.LBP.Config.enginesNotShow,
                hackedPrice;
            //price hack to get around GForce bug on series page
            if (typeof priceHackConfig === 'undefined' || typeof priceHackConfig.isEnabled === 'undefined' || typeof  priceHackConfig.series === 'undefined' ||
                priceHackConfig.isEnabled == false || priceHackConfig.series.length === 0 ) {
                priceHackConfig = {};
                priceHackConfig.series = {};
            }

            derivatives.each(function(derivative) {

                // derivativePrice = ND.LBP.CommonModels.formatFeaturePrice(derivative);
                //console.log('derivativePrice:' + derivativePrice);
                var notshowengines = [];
                derivative.get(ND.LBP.Constants.ENGINES).each(function(engine) {
					derivativePrice = ND.LBP.CommonModels.formatFeaturePrice(derivative);
					if(!derivativePrice) {
					//geforce v3
						var price=engine.get(ND.LBP.Constants.PRICES);
						if(price.length>0&&price[0]&&price[0].value!== 'undefined'){
							/* if(price[0].value === 0){
								derivativePrice=cm.StateTable[engine.get(ND.LBP.Constants.STATE)].priceLabel;
							}
							else */ {
								derivativePrice=ND.PriceFormatter.format('' + price[0].value);
							}
						}
					}
					else {
					//geforce v2
						if (typeof priceHackConfig.series[derivative.get(ND.LBP.Constants.NAME)] !== 'undefined' &&
						   (typeof (hackedPrice = priceHackConfig.series[derivative.get(ND.LBP.Constants.NAME)][engine.get(ND.LBP.Constants.NAME)]) !== 'undefined'))  {

							derivative.get(ND.LBP.Constants.PRICES).reset();
							derivative.get(ND.LBP.Constants.PRICES).add(new ND.LBP.CommonModels.Price(hackedPrice));
							derivativePrice = ND.LBP.CommonModels.formatFeaturePrice(derivative);
						}
						
					}

                    if (enginesNotShowHackConfig && enginesNotShowHackConfig.indexOf(engine.id) >= 0) {
                        notshowengines.push(engine);
                    }

                    engine.set({'articleUrl':  articleUrl, 'price' : derivativePrice});
                });
                //engines not show hack to hide related series on series page
                //enginesNotShowHackConfig='engineID,engineID,...'
                if (notshowengines.length) {
                    derivative.get(ND.LBP.Constants.ENGINES).remove(notshowengines);
                }
            });
            success(seriesDetails);
        },

        fetchOrLoad : function(modelName, modelClass, successCallback) {
            var model = modelClass;
            var cachedModel = l.pf.load(modelName);
            if ((typeof cachedModel === 'undefined') || (cachedModel == null) || (cachedModel.url !== model.url)) {
                $.when(model.fetch())
                    .done(function() {
                        l.pf.store(modelName, model);
                        successCallback(model);
                    }).fail(function() {
                        Backbone.trigger(ND.LBP.Events.ErrorOccurred, new ND.LBP.CommonModels.Error());
                    });
            } else  {
                successCallback(cachedModel);
            }
        },

        /**
         * Loads a FRESH copy of the data from the server and returns when server replies.
         * @param modelName
         * @param modelClass
         * @returns none
         */
        fetchFromServer : function(modelName, modelClass, successCallback) {
            ////console.log('fetchFreshNStore -> ' + modelName);
            var model = modelClass;
            $.when(model.fetch())
                .done(function() {
                    l.pf.store(modelName,model);
                    successCallback(model);
                }).fail(function() {
                    Backbone.trigger(ND.LBP.Events.ErrorOccurred, new ND.LBP.CommonModels.Error());
                });
        }

    },

    b = {   //builder

        buildHeaders: function() {
            var categories = ND.LBP.Config.defaultHeaderConfiguration,
                headers =  new cc.Headers();

            _.each(categories, function(category) {
                headers.add(new cm.Header({id: category.id,
                    name: category.name,
                    header : category.header,
                    fragment: category.fragment,
                    pagename: category.pagename}))
            });

            return headers;
        }
    },

    u = {  //utility
      seriesPageUrl : function(id) {
          return 'nameplates/' + id;
      }
    };


     return l.pf;

})();

