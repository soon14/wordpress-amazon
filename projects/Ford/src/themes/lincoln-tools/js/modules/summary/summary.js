/**
 * @author szabetian
 * @description derivatives module
 * @project Lincoln Build and Price
 */

/**
 * @param exc
 */
(function ($) {

    var Constants = {
            FRAGMENT: 'nameplates/:nameplateId/series/:seriesId/engines/:engineId/summary',
            HEADER_ID: 6,
            EXTERIOR_ID: 'Exterior',
            IMAGE_GROUP_SEQUENCE: {
                Exterior: {
                    next: 'Interior'
                },
                Interior: {
                    next: 'Exterior'
                }
            }
        },

        _cache = {
            omniture: {}
        },

        module = {
            buildPageUrl: function (nameplateId, derivativeId, engineId) {
                return '#' + Constants.FRAGMENT.replace(':nameplateId', nameplateId).replace(':seriesId', derivativeId).replace(':engineId', engineId);
            },

            trackPage: function () {
                _cache.omniture.state = ND.LBP.Constants.SUMMARY_PAGE_NAME;
                Backbone.trigger(ND.LBP.Events.TrackOmniture, _cache.omniture);
            },setupConfirmationBeforeLeave: function() {
		leaveoutOverlay = function(url) {
			var destinationURL=url;
				$('#bp-leaveout-overlay').remove();
				$('.build-and-price').append($('<div id="bp-leaveout-overlay" class="rad-overlay-bg"></div>'));
				$('#bp-leaveout-overlay').hide();
				$('#bp-leaveout-overlay').html($('#bp-leaveout-overlay-template').html());				
                setTimeout(function(){
							$('#bp-leaveout-overlay .bp-yes').on("click", function(){
							$.cookie('bnp.anchor','N',{ path: '/', expires: 1 });
							$.cookie('dfy.pg.bkbtn',$('#badge a').attr('href'),{ path: '/', expires: 1 });
							if($(this).data("link")) {
									location.href=$(this).data("params")?$(this).data("link")+'?'+$(this).data("params"):$(this).data("link");
									}
							else {
									location.reload();
									}
								}
							);
							$('#bp-leaveout-overlay .bp-no').on("click", function(){
							$.cookie('bnp.anchor','N',{ path: '/', expires: 1 });
									if(destinationURL) {
										if(destinationURL==location.href) {
											location.reload();
										}
										else {									
											location.href=destinationURL;
											}
									} 
									else {
									$('#submit').trigger('click');
									}
								}
							);
							$('#bp-leaveout-overlay').show();
					},1000);
				};	
		$.cookie('bnp.anchor','Y',{ path: '/', expires: 1 });
		$('a').on('click',function(e){
			if($(this).attr('href')&&$(this).attr('href').toLowerCase().indexOf('http')==0&&(!$(this).attr('target')||$(this).attr('target').toLowerCase()!=='_blank')) {
				e.preventDefault();
				e.stopPropagation();
				leaveoutOverlay($(this).attr('href'),null);
				}
			});
		document['search-pannel'].onsubmit = function(e) {
			if($.cookie('bnp.anchor')=='Y') {
			if(e&&e.preventDefault) {
				e.preventDefault();
				e.stopPropagation();
				}
			else {
			event.returnValue = false;
			}
			leaveoutOverlay();
			};
		};
		window.onbeforeunload=function() {		
			window.onunload = function() {
				if($.cookie('bnp.anchor')=='Y') {
				$.cookie('bnp.anchor','N',{ path: '/', expires: 1 });
				location.href=location.href;
				leaveoutOverlay(location.href);
				}
			};
		}

        },

//            isUserLoggedIn: function() {
//                var userCookie = $.cookie("dfy.lh.u");
//                if (typeof userCookie !== 'undefined' && userCookie != null && userCookie !== '') {
//                  return true;
//                }
//
//                return false;
//            },

            loadAndDisplay: function (nameplateId, derivativeId, engineId) {
                //console.log('summaryModule.loadAndDisplay');
                Backbone.trigger(ND.LBP.Events.BlockUI);

                module.subscribeToEvents();

                _cache.nameplateId = nameplateId;
                _cache.derivativeId = derivativeId;
                _cache.engineId = ND.LBP.Utils.removeDotSlash(engineId);
                _cache.userSelectedIds = '';

                module.dataloader.getNameplateDetails(nameplateId, _cache.engineId, true, function(nameplateDetail) {

                    if (nameplateDetail.get('state') == null) {
                        //console.log('app state is null, going back to the beginning');
                        Backbone.trigger(ND.LBP.Events.AppStateIsNull);
                        return;
                    }

                    var nameplateValue = nameplateDetail.get('prices').at(0).get('value');

                    // Set global flag isDerivativePriceHidden to true
                    ND.LBP.Globals.isDerivativePriceHidden = nameplateValue == 1;

                    var total = module.getTotalPrice(nameplateDetail);

                    if ($('.nameplate-title').is(':empty')) {
                        $('.nameplate-title').text('- ' + nameplateDetail.get('name'));
                    }

                    _cache.headers = module.dataloader.updateHeaders(Constants.HEADER_ID, [nameplateId, derivativeId, engineId]);
                    _cache.summaryModel = module.buildSummaryModel(nameplateDetail, total);

                    var exteriorImages = nameplateDetail.get(ND.LBP.Constants.IMAGE_GROUPS)
                                       ? nameplateDetail.get(ND.LBP.Constants.IMAGE_GROUPS).get('Exterior')
                                       : null;

                    _cache.summaryModel.set({'galleryPreview': exteriorImages, 'images': exteriorImages});

                    Backbone.trigger(ND.LBP.Events.LoadFromCookie, function (cookie) {
                        if (cookie.s !== ND.LBP.Config.site) {
                            cookie = {};
                        }
                        _cache.loc = cookie.l;
                        _cache.locDisplay = cookie.d;
                        _cache.summaryModel.set(ND.LBP.Constants.USER_LOCATION, cookie.d);
                    });


                    _cache.sidebar = module.dataloader.getSidebar({
                        // title: nameplateDetail.get(ND.LBP.Constants.NAME),
                        // description: nameplateDetail.get(ND.LBP.Constants.SIDEBAR_MESSAGES).join(''),
                        pageName: ND.LBP.Constants.SUMMARY_PAGE_NAME,
                        hidePDFShare: false,
                        hideSave: false, /*!module.isUserLoggedIn()*/
                        hidePDFButton: ND.LBP.Globals.isDerivativePriceHidden,
                        buttonData: [],
                        state: nameplateDetail.get('state'),
                        hideConnect: true,
                        mobileButtonData: [
                            // {
                            //    id : 1,
                            //    name: ND.LBP.Constants.CONNECT,
                            //    type: ND.LBP.Constants.CONNECT,
                            //    nextPageURL: ''
                            // }
                        ]
                    });

                    _cache.sidebar.set('total', total);

                    ND.LBP.CommonViews.page()
                        .headers(_cache.headers)
                        .summary(_cache.summaryModel)
                        .keyFeatures(module.dataloader.getKeyFeatures(nameplateDetail, derivativeId))
                        .hotspots()
                        .sidebar(_cache.sidebar);

                    module.trackPage(); 
					module.setupConfirmationBeforeLeave();
                    Backbone.trigger(ND.LBP.Events.UnblockUI);
                });

            },

            getTotalPrice: function (nameplateDetail) {
                var prices = nameplateDetail.get(ND.LBP.Constants.PRICES),
                    total = null;

                if (ND.LBP.Globals.isDerivativePriceHidden) {
                    total = ND.LBP.Config.hidePriceText;
                } else if (typeof prices !== 'undefined' && prices != null && prices.length > 0) {
                    total = ND.PriceFormatter.format(_cache.unformattedTotal = prices.at(0).get('value'));
                }

                return total;
            },


            buildSummaryModel: function (nameplateDetails, total) {
                var derivatives = nameplateDetails.get(ND.LBP.Constants.SERIES).get(ND.LBP.Constants.DERIVATIVES),
                    selectDerivativeEngines = module.getSelectedDerivativeEngine(derivatives);

                selectDerivativeEngines.nameplate = nameplateDetails.get(ND.LBP.Constants.NAME);

                _cache.unformattedOriginalPrice = parseInt(selectDerivativeEngines.enginePrice.replace(/\D/ig, ''));
                _cache.omniture = selectDerivativeEngines;
                _cache.omniture.year = nameplateDetails.get('year');


                var summary = new ND.LBP.SummeryModels.Summary(selectDerivativeEngines),
                    summaryCategories = new ND.LBP.SummeryCollections.SummaryCategories(),
                    categories = [ND.LBP.Constants.EXTERIOR, ND.LBP.Constants.INTERIOR, ND.LBP.Constants.ACCESSORIES];

                _cache.omniture.omnitureFeatures = [];
                _cache.omniture.vehicleOptions = [];

                _.each(categories, function (category) {
                    var accessories = module.getSelectedAccessories(nameplateDetails.get(category));
                    var summaryCategory = new ND.LBP.SummeryModels.SummaryCategory(accessories);
                    summaryCategories.add(summaryCategory);
                }, this);

                summary.set({
                    'categories': summaryCategories,
                    'seriesRoute': module.dataloader.getRouteForPage('series'),
                    'price': selectDerivativeEngines.enginePrice,
                    'total': total
                });

                return summary;
            },

            getSelectedDerivativeEngine: function (derivatives) {
                var foundObject = null,
                    engines;
                _.find(derivatives.models, function (derivative) {
                    engines = derivative.get(ND.LBP.Constants.ENGINES);
                    return _.find(engines.models, function (engine) {
                        if (ND.LBP.Constants.SELECTED_STATES.indexOf(engine.get(ND.LBP.Constants.STATE)) >= 0) {
                            foundObject = {
                                series: derivative.get(ND.LBP.Constants.NAME),
                                seriesId: derivative.id,
                                engine: engine.get(ND.LBP.Constants.NAME),
                                enginePrice: engine.get('price'),
                                engineId: engine.id
                            };

                            _cache.engineName = foundObject.engine;
                            //TODO include engine price in the next launch
                            return true;
                        }
                        return false;
                    }) != null;
                });
                return foundObject;
            },

            getSelectedAccessories: function (accessoriesCategory) {
                var featureGroups = accessoriesCategory.get(ND.LBP.Constants.FEATURE_GROUPS),
                    summaryAccessories = new ND.LBP.SummeryCollections.SummaryAccessories(),
                    features,
                    specialType,
                    seq;

                _.each(featureGroups.models, function (featureGroup) {
                    var isHidden = featureGroup.get('isHidden');

                    if (!isHidden) {
                        features = featureGroup.get(ND.LBP.Constants.FEATURES);
                        specialType = featureGroup.get(ND.LBP.Constants.SPECIAL_TYPE);
                        seq = 0;

                        features.each(function (feature) {

                            // console.log('feature' + (yaya++), feature);
                            if (ND.LBP.Constants.SELECTED_STATES.indexOf(feature.get('state')) >= 0) {

                                if (specialType === ND.LBP.Constants.COLOUR_TAB_ID) {
                                    _cache.omniture.colourId = feature.id;
                                    _cache.colourName = feature.get('name');
                                } else if (specialType === ND.LBP.Constants.INTERIOR_TRIM_TAB_ID) {
                                    _cache.omniture.trimId = feature.id;
                                } else if (specialType === ND.LBP.Constants.INTERIOR_FABRIC_TAB_ID ||
                                    specialType === ND.LBP.Constants.RIMS_TAB_ID) {
                                    _cache.omniture.omnitureFeatures.push(feature.id);
                                } else {
                                    _cache.omniture.vehicleOptions.push(feature.id);
                                }

                                if (specialType !== ND.LBP.Constants.COLOUR_TAB_ID) {

                                    if (_cache.userSelectedIds.length !== 0) {
                                        _cache.userSelectedIds += ',';
                                    }

                                    _cache.userSelectedIds += feature.get('id');
                                }

                                summaryAccessories.add(new ND.LBP.SummeryModels.SummaryAccessory({
                                    name: feature.get(ND.LBP.Constants.NAME),
                                    price: ND.LBP.CommonModels.formatFeaturePrice(feature),
                                    sequence: seq
                                }));

                                seq++;
                            }

                        });
                    }
                });

                if (summaryAccessories.length === 0) {
                    summaryAccessories.add(new ND.LBP.SummeryModels.SummaryAccessory({name: 'none', price: null, sequence: 0}));
                }

                var foundHeaders = _cache.headers.where({pagename: accessoriesCategory.get(ND.LBP.Constants.NAME)}),
                    headerName;

                if (foundHeaders != null && foundHeaders.length > 0) {
                    headerName = foundHeaders[0].get(ND.LBP.Constants.NAME);
                } else {
                    headerName = accessoriesCategory.get(ND.LBP.Constants.NAME);
                }

                return {
                    name: headerName,
                    categoryRoute: module.dataloader.getRouteForPage(accessoriesCategory.get(ND.LBP.Constants.NAME)),
                    accessories: summaryAccessories
                };
            },


            locationChanged: function (locValue, locText) {
                _cache.summaryModel.set(ND.LBP.Constants.USER_LOCATION, locText);
            },

            galleryViewChanged: function (categoryId) {
                module.dataloader.getNameplateDetails(_cache.nameplateId, _cache.engineId, true, function (nameplateDetail) {

                    //TODO update this logic


                    var nextCategoryId = Constants.IMAGE_GROUP_SEQUENCE[categoryId].next;
                    if (typeof nextCategoryId === 'undefined') {
                        nextCategoryId = Constants.EXTERIOR_ID;
                    }

                    var galleryImages = nameplateDetail.get(ND.LBP.Constants.IMAGE_GROUPS).get(nextCategoryId);
                    _cache.summaryModel.set(ND.LBP.Constants.IMAGES, galleryImages);
                    Backbone.trigger(ND.LBP.Events.ImageGroupUpdated);

                });
            },


            populateSummaryButtons: function(links) {

                _.each(links, function(link) {

                   var $link = $(link),
                    params = $link.data('params') || '',
                    isSinglePage = $link.data('singlepage') || false;

                    if (typeof params !== 'undefined' && params.length > 0) {

                        params = params.replace(':catalogId', _cache.nameplateId)
                                       .replace(':wersCode', _cache.derivativeId)
                                       .replace(':price', _cache.unformattedOriginalPrice)
                                       .replace(':engine', encodeURIComponent(_cache.engineId))
                                       .replace(':userSelected', _cache.userSelectedIds);

                        if (isSinglePage) {
                            $link.attr('href', $link.attr('href') + params);
                        } else {
                            var url = $link.attr('href') +
                                      ($link.attr('href').indexOf('?') > 0
                                          ? ('&' + params)
                                          : ('?' + params));
                            $link.attr('href', url);
                        }
                    }
                });
				setTimeout(function() {
					$(".fullscreen-overlay").radOverlay({
						additionalClass: "auto-height-overlay"
					})
				}, 1000);
            },


            saveConfiguration: function (form) {
//                if (module.isUserLoggedIn()) {
                module.dataloader.getNameplateDetails(_cache.nameplateId, _cache.engineId, true, function (nameplateDetails) {

                    var selectedDerivative = nameplateDetails
                                                .get(ND.LBP.Constants.SERIES)
                                                .get(ND.LBP.Constants.DERIVATIVES)
                                                .getSelected();

                    if (typeof selectedDerivative !== 'undefined' && selectedDerivative != null) {
                        var key,
                            allWERSCodes = nameplateDetails.getAllWERSCodes(),
                            selectedWERSCodes = nameplateDetails.getSelectedWERSCode(),
                            engineWERSCode = nameplateDetails.dissembleEngineId(_cache.engineId, _cache.derivativeId);

                        //  console.log('allWERSCodes.length ' + allWERSCodes.length + ' : ' + allWERSCodes);

                        //selectedWERSCodes.push(engineWERSCode);
                        //selectedWERSCodes.push(_cache.derivativeId);
						selectedWERSCodes.push(_cache.engineId);

                        var date = new Date();
                        var timeStamp = date.getFullYear() + '' +
                                        ND.LBP.Utils.pad2(date.getMonth() + 1) + '' +
                                        ND.LBP.Utils.pad2(date.getDate()) + '' +
                                        ND.LBP.Utils.pad2(date.getHours()) + '' +
                                        ND.LBP.Utils.pad2(date.getMinutes()) + '' +
                                        ND.LBP.Utils.pad2(date.getSeconds());
                        var data = {
                            modelId: _cache.nameplateId,
                            derivativeId: _cache.derivativeId,
                            engineId: _cache.engineId,
                            allFeatures: allWERSCodes,
                            selectedFeatures: selectedWERSCodes,
                            postcode: _cache.loc
                        };

                        for (key in data) {
                            $('#lbp-save-' + key).val(data[key]);
                        }

                        /**
                         * The generated URL is too long for IE 8 and since in 2014 we still have to support IE 8 (Yes I know!!),
                         * we have to get around the problem by saving the state in a cookie instead.
                         * this cookie will be read by my-lincoln page (save-buildandprice-config.js) and is passed
                         * back when user saves/cancels a config . However if the cookie is missing, we just load the summary
                         * page with default config :(
                         */
                        $.cookie("dfy.lbp.save.state", nameplateDetails.get('state'), { expires: 7, path: "/" });
                        $.cookie("dfy.lbp.save.name", selectedDerivative.get('name') + ' ' + _cache.engineName + ' ' + _cache.colourName + ' ' + timeStamp, { expires: 7, path: "/" });

                        //disable popup message that requires user to confirm leaving b&p page.
                        window.onbeforeunload = null;

                        form.submit();
                    }
                });
            },

            shareConfiguration: function (shareUrl) {
                Backbone.trigger(ND.LBP.Events.BlockUI);
                module.dataloader.getNameplateDetails(_cache.nameplateId, _cache.engineId, true, function (nameplateDetails) {

                    var selectedWERSCodes = nameplateDetails.getSelectedWERSCode(),
                        engineWERSCode = nameplateDetails.dissembleEngineId(_cache.engineId, _cache.derivativeId);
                    //selectedWERSCodes.push(engineWERSCode);
                    //selectedWERSCodes.push(_cache.derivativeId);
                    $.ajax({
                        type: 'POST',
                        dataType: 'json',
                        contentType: 'application/json; charset=UTF-8',
                        url: shareUrl,
                        data: JSON.stringify({
                            modelId: _cache.nameplateId,
                            //derivativeId: _cache.derivativeId,
                            //engineId: engineWERSCode,
							compoundId:_cache.engineId,
                            colourId: '0',//_cache.omniture.colourId,
                            trimId: '0',//_cache.omniture.trimId,
                            features: selectedWERSCodes,
                            postcode: _cache.loc /*+ ':' + _cache.locDisplay*/,
                            priceZoneId: ND.LBP.Config.priceZoneId,
                            site: ND.LBP.Config.site,
                            usage: 'b'
                        }),
                        success: function (data) {
                            Backbone.trigger(ND.LBP.Events.UnblockUI);
                            if (typeof data !== 'undefined' && data != null && typeof data.url !== 'undefined') {
                                Backbone.trigger(ND.LBP.Events.ShareConfigReady, data.url);
                            }
                        },
                        error: function (data) {
                            Backbone.trigger(ND.LBP.Events.UnblockUI);
                            Backbone.trigger(ND.LBP.Events.ErrorOccurred, new ND.LBP.CommonModels.Error());
                        }
                    });
                });
            },

            buttonClicked: function (model) {
                var type = model.get('type');
                if (ND.LBP.Constants.PREV === type) {
                    Backbone.trigger(ND.LBP.Events.ChangePage, model.get('nextPageURL'));
                }
            },

            subscribeToEvents: function () {
                //register events and handlers
                //console.log('summaryModule.subscribeToEvents');
                Backbone.on(ND.LBP.Events.LocationChanged, module.locationChanged, module);
                Backbone.on(ND.LBP.Events.ToggleGalleryView, module.galleryViewChanged, module);
                Backbone.on(ND.LBP.Events.ButtonClicked, module.buttonClicked, module);
                Backbone.on(ND.LBP.Events.ShareConfiguration, module.shareConfiguration, module);
                Backbone.on(ND.LBP.Events.SaveConfiguration, module.saveConfiguration, module);
                Backbone.on(ND.LBP.Events.SummaryButtonsLoaded, module.populateSummaryButtons, module);
            },

            unsubscribeFromEvents: function () {
                //console.log('summaryModule.unsubscribeFromEvents');
                Backbone.off(ND.LBP.Events.ButtonClicked, module.buttonClicked);
                Backbone.off(ND.LBP.Events.LocationChanged, module.locationChanged);
                Backbone.off(ND.LBP.Events.ToggleGalleryView, module.galleryViewChanged);
                Backbone.off(ND.LBP.Events.ShareConfiguration, module.shareConfiguration);
                Backbone.off(ND.LBP.Events.SaveConfiguration, module.saveConfiguration);
                Backbone.off(ND.LBP.Events.SummaryButtonsLoaded, module.populateSummaryButtons);
            },


            headerLinkClicked: function (model) {
                //console.log('summary.headerLinkClicked()');
                var currentHeader = module.dataloader.getCurrentHeader();
                if (currentHeader.id === Constants.HEADER_ID) {
                    //console.log('summary.headerLinkClicked() changing path');
                    Backbone.trigger(ND.LBP.Events.ChangePage, model.get('pathURL'));
                }
            },

            clearCache: function () {
                _cache = {  omniture: {}};
            },

            _init: function () {
                Backbone.on(ND.LBP.Events.StartOver, module.clearCache, module);
                Backbone.on(Constants.HEADER_ID + ND.LBP.Events.HeaderLinkClicked, module.headerLinkClicked, module);
                Backbone.on(ND.LBP.Events.UnsubscribeFromEvents, module.unsubscribeFromEvents, module);
                module.dataloader = ND.LBP.Builder;
                var routes = [
                    {
                        fragment: Constants.FRAGMENT,
                        name: ND.LBP.Constants.SUMMARY_PAGE_NAME,
                        buildPageUrl: module.buildPageUrl,
                        action: module.loadAndDisplay
                    }
                ];

                Backbone.on(ND.LBP.Events.RegisterModule, function (registerCallback) {
                    //console.log('summaryModule.on ' + ND.LBP.Events.RegisterModule + ' event');
                    registerCallback.call(registerCallback, routes);
                });
            }
        };

    module._init();


})(jQuery);