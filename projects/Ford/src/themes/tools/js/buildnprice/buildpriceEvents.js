/**
 * 
 */
Events.eventList.buildandprice = {
		/**
		 * Events are grouped based on where they are fired.
		 * view events are Fired from View objects, etc
		 */
		view: {
		
			ChangeVehicleEvent: 'ChangeVehicleEvent',
			PricezoneChangeRequestEvent: 'PricezoneChangeRequestEvent',
			PathSelectedEvent: 'PathSelectedEvent',
			DerivativeSelectedEvent: 'DerivativeSelectedEvent',
			PackageSelectedEvent: 'PackageSelectedEvent',
			SaveAsPDFEvent : 'SaveAsPDFEvent',
			ShareConfigEvent : 'ShareConfigEvent',
			TrimSelectedEvent: 'TrimSelectedEvent',
			ColorChangedEvent: 'ColorChangedEvent',
			ModelSelectedEvent: 'ModelSelectedEvent',
			PricezoneSelectedEvent : 'PricezoneSelectedEvent',
			ToggleViewEvent: 'ToggleViewEvent',
			RequestAQuoteEvent: 'RequestAQuoteEvent',
			PresentPaymentEvent: 'PresentPaymentEvent',
			TabChangeRequestEvent :'TabChangeRequestEvent',
			StepChangeRequestEvent: 'StepChangeRequestEvent',
			StepChangeHeaderRequestEvent: 'StepChangeHeaderRequestEvent',
			TabChangedEvent : 'TabChangedEvent',
			FeatureSelectedEvent : 'FeatureSelectedEvent',
			DerivativeSelectedEvent : 'DerivativeSelectedEvent',
			NextOrientationEvent: 'NextOrientationEvent',
			PrevOrientationEvent: 'PrevOrientationEvent',
			StartOverEvent : 'StartOverEvent',
			EngineTrasmissionSelectedEvent : 'EngineTrasmissionSelectedEvent',
			SortFeaturesByPriceEvent : 'SortFeaturesByPriceEvent',
			SortFeaturesByNameEvent : 'SortFeaturesByNameEvent',
			RegionPostcodeChangeRequestEvent: 'RegionPostcodeChangeRequestEvent',
			HotDealSelectedEvent: 'HotDealSelectedEvent',
			UpdateScrollBarEvent: 'UpdateScrollBarEvent',
			SubTabChangedEvent: 'SubTabChangedEvent',
			ViewAccessoryDetailsEvent: 'ViewAccessoryDetailsEvent'
		}, 
		
		omniture : {
			RegionPostcodeChangedEvent: 'Omniture:RegionPostcodeChangedEvent',
			PricezoneChangedEvent: 'Omniture:PricezoneChangedEvent',
			StateChangedEvent: 'Omniture:StateChangedEvent',
			TabChangedEvent: 'Omniture:TabChangedEvent',
			ViewAccessoryDetailsEvent: 'Omniture:ViewAccessoryDetailsEvent',
			ColorSelectedEvent: 'Omniture:ColorSelectedEvent',
			TrimSelectedEvent: 'Omniture:TrimSelectedEvent',
			OrientationChangedEvent: 'Omniture:OrientationChangedEvent',
			ShareLinkClickedEvent: 'Omniture:ShareLinkClickedEvent',
			SaveAsPDFEvent: 'Omniture:SaveAsPDFEvent'
		},
		
		model : {
			
			ShareLinkClickedEvent: {
				name: 'ShareLinkClickedModelEvent',
				handler: function(provider) {
//					Analytics.trackOmnitureAction.call(this, 'ShareLink', provider);
//					Events.fireEvent(Events.eventList.buildandprice.router.ActionTriggeredEvent, {action : 'ShareLink', value: provider});
					Events.fireEvent(Events.eventList.buildandprice.omniture.ShareLinkClickedEvent, {provider: provider, storage: this.storage});
				}
			},
			
			OrientationChangedEvent: {
				name: 'OrientationChangedModelEvent',
				handler: function() {
					Events.fireEvent(Events.eventList.buildandprice.omniture.OrientationChangedEvent, {storage: this.storage});
				}	
			},
			
			SubTabChangedEvent: {
				name: 'SubTabChangedModelEvent', 
				handler : function(tabId) {
					//Util.log('SubTabChangedModelEvent');
					var tabIdx = tabId.substring(tabId.indexOf('cat-') + 'cat-'.length, tabId.length);
					var categoryGroups = this.storage.get(Constants.storage.categoryGrpCollection);
					var categories = categoryGroups.getSelected().get('categories');
					categories.selectByOrder(tabIdx);
					Events.fireEvent(Events.eventList.buildandprice.omniture.TabChangedEvent, {storage: this.storage});
				}
			},
			ViewAccessoryDetailsEvent: {
				name: 'ViewAccessoryDetailsModelEvent', 
				handler: function() {
					Events.fireEvent(Events.eventList.buildandprice.omniture.ViewAccessoryDetailsEvent, {storage: this.storage});
				}
			},
			
			PricezoneSelectedEvent : {
				name :'PricezoneSelectedModelEvent',
				handler : function(model) {
					//Util.log('pricezoneSelected');
					var pcz = this.storage.get(Constants.storage.pricezoneCollection);
					this.storage.destroy();
					this.storage = new models.Storage();
					this.storage.set(Constants.storage.pricezoneCollection, pcz);
					this.userPref.purge();
					this.updatePricezoneForUserObject(model);
					Events.fireEvent(Events.eventList.buildandprice.router.UpdatePricezoneEvent, model.get('name'));
					Events.fireEvent(Events.eventList.buildandprice.omniture.PricezoneChangedEvent, model.get('name'));
					Util.cookie.save(Constants.cookie.pzid, model.get('id'));
					this.navigate('reset', {trigger: true});
				}
			},
			
			PricezoneChangeRequestEvent: {
				name : 'PricezoneChangeRequestModelEvent',
				handler: function() {
					var self = this;
					self.fetchPricezones(function(collection) {
						self.diplayRegionOverlayView(collection);
					});
				}
			},
			
			RegionPostcodeChangeRequestEvent: {
				name: 'RegionPostcodeChangeRequestModelEvent',
				handler: function(forceDisplayRegionOverlay) {
					//Util.log('Handling RegionPostcodeChangeRequestEvent: ' + forceDisplayRegionOverlay);
					forceDisplayRegionOverlay = forceDisplayRegionOverlay || false;
					if (ConfigUtil.showPostcodeSelect()) {
						//Display region overlay if no region is set.
						//if forceDisplayRegionOverlay is set to true, region overlay will be opened regardless of the status of cookie.
						//if forceDisplayRegionOverlay is set to false, region overlay will be opened only if region cookie is not set.
						var self = this;
						ND.API.requestChangePriceBuildAndPrice({complete: function(result) {
							//fire an event and let whomever is listening to update themselves.
							if (typeof result !== 'undefined' && result != null && result.postcode) {
								if ((self.userPref.get('postcode') !== result.postcode) || (self.userPref.get('usage') !== result.usage)) {
									Events.fireEvent(Events.eventList.buildandprice.model.RegionPostcodeChangedEvent, result);
									Events.fireEvent(Events.eventList.buildandprice.router.HidePricesEvent, !ConfigUtil.showPrices());
									Events.fireEvent(Events.eventList.buildandprice.omniture.RegionPostcodeChangedEvent, result);
									var pcz = self.storage.get(Constants.storage.pricezoneCollection);
									self.storage.destroy();
									self.storage = new models.Storage();
									self.storage.set(Constants.storage.pricezoneCollection, pcz);
									self.navigate('reset', {trigger: true});
									self.userPref.purge();
									Events.fireEvent(Events.eventList.buildandprice.router.AskForPostcodeEvent, false);
								}
							} else {
								Events.fireEvent(Events.eventList.buildandprice.router.HidePricesEvent, true);
							}
							
						}}, forceDisplayRegionOverlay);
					}
				}
			},
			/**
			 * data {trim: trimObject, isSystem: true/false}
			 * isSystem indicates whether this trim selection is invoked by the application or the user
			 * the sole purpose of the flag is to determine when to fire an omniture trim selected event.
			 */
			TrimSelectedEvent: { 
				name : 'TrimSelectedModelEvent',
				handler : function(data) {
					this.selectTrim(data.trim);
					var view = Helper.getCurrentCarView(this.storage);
					if (view == Constants.view.interior) {
						this.storage.get(Constants.storage.galleryCollection).toggleLayer(data.trim.get('id'));
					} else {
						Events.fireEvent(Events.eventList.buildandprice.model.ToggleViewEvent.name, Constants.view.interior);
					}
//					console.log('TrimSelectedModelEvent: data.isSystem:' + data.isSystem);
					if (false === data.isSystem) {
						Events.fireEvent(Events.eventList.buildandprice.omniture.TrimSelectedEvent, {storage: this.storage});
					}
				}
			},
			/**
			 * data {color: colorObject, isSystem: true/false}
			 * isSystem indicates whether this color selection is invoked by the application or the user
			 * the sole purpose of the flag is to determine when to fire an omniture color selected event.
			 */
			ColorChangedEvent: { 
				name : 'ColorChangedModelEvent',
				handler : function(data) {
					this.selectColor(data);
					var view = Helper.getCurrentCarView(this.storage);
//					this.selectTrim(color.get('trims').at(0));
					if (view == Constants.view.exterior) {
						this.storage.get(Constants.storage.galleryCollection).toggleLayer(data.color.get('id'));
					} else {
						Events.fireEvent(Events.eventList.buildandprice.model.ToggleViewEvent.name,Constants.view.exterior);
					}
//					console.log('ColorChangedModelEvent: data.isSystem:' + data.isSystem);
					if (false === data.isSystem) {
						Events.fireEvent(Events.eventList.buildandprice.omniture.ColorSelectedEvent, {storage: this.storage});
					}
				}
			},
			
			SaveAsPDFEvent : {
				name :'SaveAsPDFModelEvent',
				handler :  function () {
					
					var inclusionList = ['modelId',
					 					'derivativeId',
					 					'packageId',
					 					'colourId',
					 					'postcode',
					 					'usage',
					 					'priceZoneId',
					 					'site',
					 					'trimId',
					 					'engineId',
					 					'features'];
					var params = '?',
                        value = null;
					_.each(inclusionList, function(key) {
						value = this.userPref.get(key);
						if (value !== undefined && value != null) {
							if (key !== 'features') {
								params += (key + '=');
								params += (value + '&');
							} else {
								params += ('features=');
								params += (_.uniq(value).join(',') + '&');
							}
						}
					}, this);
					if (params.length > 1 && (params.charAt(params.length - 1) === '&')) {
						params = params.substring(0,params.length - 1 );
					}
					
					var vehicleName = '',
                        path;
					this.getSelectedPackageDerivative(
						this.storage, {
							pkgCallback: function(pkg) {
								vehicleName = pkg.get('name');
								path = Constants.path.pkg;
							},
							drvCallback : function(drv) {
								vehicleName = drv.get('name');
								path = Constants.path.drv;
							}
						});
//					var nameplateCollection = this.storage.get(Constants.storage.nameplateCollection);
//					var nameplate = nameplateCollection.getSelected();
					Events.fireEvent(Events.eventList.buildandprice.omniture.SaveAsPDFEvent, {storage: this.storage});
					window.open(Config.buildandprice.urls.viewPDFURL + vehicleName + params);
				}
			},
			ToggleViewEvent: {
				name :'ToggleViewModelEvent',
				/**
				 * If Exterior view : Save current visible layers. then find the selected trim and display it
				 * if Interior view : Save interior view and select selected color and all its layers.
				 * @param view
				 */
				handler: function(view) {
						
					var ddm = this.storage.get(Constants.storage.derivativeDetailsModel);
					ddm.set('view', view);
					var gallery = this.storage.get(Constants.storage.galleryCollection);
					
					var colorCollection = this.storage.get(Constants.storage.colorCollection);
					var color = colorCollection.getSelected();
					
					if (color) {
						if (view == Constants.view.exterior) {
							//console.log('view: ', Constants.view.exterior);
							gallery.toggleLayer(color.get('id'));
//							Analytics.trackOmnitureAction.call(this, 'ViewChanged', Constants.view.exterior);
//							Events.fireEvent(Events.eventList.buildandprice.router.ActionTriggeredEvent, {action : 'ViewChanged', value: Constants.view.exterior});
						} else { //interior
							var trim = color.get('trims').getSelected();
							gallery.toggleLayer(trim.get('id'));
//							Analytics.trackOmnitureAction.call(this, 'ViewChanged', Constants.view.interior);
						}
						Events.fireEvent(Events.eventList.buildandprice.router.ActionTriggeredEvent, {action : 'ViewChanged', value: Constants.view.exterior});
						var features = this.storage.get(Constants.storage.categoryGrpCollection).getSelectedFeatures();
						if (features && features.length > 0) {
							_.each(features, function(feature) {
								gallery.toggleLayer(feature.get('id'));
							});
						}
					}
				}	
			},
			ShareConfigEvent : {
				name : 'ShareConfigModelEvent', 
				handler : function() {
					this.userPref.url = Config.buildandprice.urls.shareURL;
					Events.fireEvent(Events.eventList.buildandprice.router.BlockUIEvent);
					
					this.userPref.save().done(function(model, response) {
						Events.fireEvent(Events.eventList.buildandprice.router.UnblockUIEvent);
						Events.fireEvent(Events.eventList.buildandprice.router.ShareReadyEvent, model.url);
					}).fail($.proxy(this.navToGenericErrorPage, this));
				}
			},
			PresentPaymentEvent : {
				name : 'PresentPaymentModelEvent',
				handler : function(formId) {
					var nameplateCollection = this.storage.get(Constants.storage.nameplateCollection);
					var nameplate = nameplateCollection.getSelected();
					//construct the ctx parameter.
					var submitBtn = $("#bp-payment-presenter-btn");
					var currentUrl = submitBtn.data("url");
					var separator = (currentUrl.indexOf("?")===-1)?"?":"&";
					var ctx = 'm:' + nameplate.get('id');
					
					var newUrl = currentUrl + separator + "ctx=" + encodeURIComponent(ctx);
					
					window.location.href = newUrl;
				}
			},
			RequestAQuoteEvent : {
				name : 'RequestAQuoteModelEvent',
				handler : function(formId) {
					
					var colorCollection = this.storage.get(Constants.storage.colorCollection),
                        color = colorCollection.getSelected(),
                        trim = color.get('trims').getSelected(),
                        nameplateCollection = this.storage.get(Constants.storage.nameplateCollection),
                        nameplate = nameplateCollection.getSelected(),
                        derivative = this.storage.get(Constants.storage.derivativeDetailsModel),
                        engineName = '',
                        engineId  = '',
                        packageId = '',
                        self = this,
                        featureObjects = this.userPref.get('featureObject'),
                        featureNames = [];
					this.getSelectedPackageDerivative(
					this.storage, {
						pkgCallback:function(pkg) {
							engineName = derivative.get('engineTransmission');
							engineId = derivative.get('engineId');
							packageId = derivative.get('id');
						}, 
						drvCallback : function(drv) {
							var derivativeCollection = self.storage.get(Constants.storage.derivativeCollection),
                                engine = derivativeCollection.getSelected().get('engines').getSelected();
							engineName = engine.get('name');
							engineId = engine.get('id');
						}
					});
                    var categoryFeature = {};
                    if (featureObjects != null && featureObjects.models.length > 0) {
                        _.each(featureObjects.models, function(featureObject) {
                            featureNames.push(featureObject.get('name'));
                        });
                        var categoryGroupCollection = self.storage.get(Constants.storage.categoryGrpCollection);

                        _.each(categoryGroupCollection.models, function(categoryGroup) {
                                var categories = categoryGroup.get(Constants.attr.catgs);
                                if (categories != null) {
                                    _.each(categories.models, function (category) {

                                        var features = category.get(Constants.attr.feats),
                                            selectedFeature = [];
                                        if (features != null) {
                                            _.each(featureObjects.models, function(featureObject) {
                                                var feature = features.get(featureObject.id);
                                                if (feature != null) {
                                                    selectedFeature.push(featureObject.get('name'));
                                                }
                                            });
                                        }
                                        categoryFeature[category.get('name')] = selectedFeature.join(',');
                                    });
                                }
                        });


                    }
                   
					var data = {
						makeckscode : nameplate.get('makeCode'),
						makeid : nameplate.get('makeId'),
						makename: nameplate.get('makeName'),
						
						modelckscode: nameplate.get('modelCode'),
						modelid: nameplate.get('id'),
						modelname: nameplate.get('name'),
						
						pricezoneid: this.userPref.get('priceZoneId'),
						
						derivativeyear: derivative.get('year'),
						
						derivativeckscode: derivative.get('derivativeCode'),
						derivativename: derivative.get('name'),
						
						enginename: engineName,
						engineid: engineId,
						
						colourname: color.get('name'),
						trimname: trim.get('name'),
						colourid: color.get('id'),
						trimid: trim.get('id'),
						features: this.userPref.get('features').join(','),
                        featureNames: featureNames.join(',')

					};

					//construct the ctx parameter.
					var ctx = 'm:' + data.modelid + ';';
					if (packageId !== '') {
						data.packageid = packageId;
					} else {
						data.derivativeid = derivative.get('id');
						ctx += 'd:' + data.derivativeid;
					}
					var postcode = this.userPref.get('postcode');
					if (ConfigUtil.showPostcodeSelect() && postcode !== '') {
						data.postcode = postcode;
						data.usage = this.userPref.get('usage');
					}
					
					$.each(data, function(key) {
						$('#bp-rq-' + key).val(data[key]);
					});
					var site = this.userPref.get('site');
					var form = $(formId);
					if (site && site === 'FMX') {
						var action = form.attr('action');
						action += ('&cat=' + data.derivativeckscode + 
								   '&opc=Color Exterior - ' + data.colourname + ', Color Interior -' + data.trimname);
						form.attr('action', action);
					}
					//append ctx parameter
					form.attr('action', form.attr('action') + '&ctx=' + ctx);
					
					form.submit();
					
				}
			},
			TabChangeRequestEvent : { 
				name : 'TabChangeRequestModelEvent',
				handler : function(tabOrder) {
					var categoryGroups = this.storage.get(Constants.storage.categoryGrpCollection);
					var categoryGroup = categoryGroups.getSelected();
					var prevIdx = categoryGroup.get('order');
					var dir = tabOrder - prevIdx; 
					if (dir > 0) {
						//call eventbus to notify the view to change to next tab
						Events.fireEvent(Events.eventList.buildandprice.router.NextTabEvent);
					} else if (dir < 0) {
						//call eventbus to notify the view to change to prev tab
						Events.fireEvent(Events.eventList.buildandprice.router.PrevTabEvent);
					}
					this.updateFooter(Constants.state.CUSTOMIZE_DERIVATIVE);
				}
			},
			StepChangeRequestEvent: { 
				name : 'StepChangeRequestModelEvent',
				handler : function(url) {
					//Util.log('stepChangeRequest URL: ' + url);
					this.navigate(url, {trigger: true});
				}
			},
			StepChangeHeaderRequestEvent : {
				name : 'StepChangeHeaderRequestModelEvent',
				handler : function(header) {
//					Util.log('stepChangeRequest URL: ' + header.get('headerURL'));
//					this.updateFooter(header.get('state'));
					this.navigate(header.get('headerURL'), {trigger: true});
				}
			},
			TabChangedEvent : {
				name: 'TabChangedModelEvent', 
				handler : function(tabId) {
					var tabIdx = tabId.substring(tabId.indexOf('cat-group-') + 'cat-group-'.length, tabId.length);
					//Util.log('Router.tabchanged: ' + tabIdx);
					var categoryGroups = this.storage.get(Constants.storage.categoryGrpCollection);
					categoryGroups.selectByOrder(tabIdx);
					Events.fireEvent(Events.eventList.buildandprice.omniture.TabChangedEvent, {storage: this.storage});
					this.updateFooter(Constants.state.CUSTOMIZE_DERIVATIVE);
				}
			},
			
			FeatureSelectedEvent : { 
				name : 'FeatureSelectedModelEvent',
				handler : function(model) {
					this.toggleFeaturesByType(model);
					this.updateFooter(Constants.state.CUSTOMIZE_DERIVATIVE);
				}
			},
			ModelSelectedEvent: {
				name : 'ModelSelectedModelEvent',
				handler : function(model) {
					var collection = this.storage.get(Constants.storage.nameplateCollection);
					
					var selectedModel = collection.getSelected();
					
					if (selectedModel && selectedModel.get('id') !== model.get('id')) {
						this.clearStorageForStep(Constants.state.SELECT_NAMEPLATE);
						collection.select(model);
						this.updateUserPrice('model', model);
					} else {
						collection.select(model);
						this.updateUserPrice('model', model);
					}
				
//					Util.log('nextPage Path: #' + model.get('nameplateURL'));
					this.navigate('#' + model.get('nameplateURL'), {trigger: true});
				}
			},
			PathSelectedEvent: {
				name: 'PathSelectedModelEvent',
				handler : function (path) {
					paths = this.storage.get(Constants.storage.pathCollection);
					var prevPath = paths.getSelected();
//					Util.log('prevPath.key:' + ((prevPath != null) ? prevPath.get('key') : ''));
					if (prevPath != null && prevPath.get('key') !== path.get('key')) {
						//user is changing path, wipe out storage.
						this.clearStorageForStep(Constants.state.SELECT_PATH);
					}		
					paths.select(path);
					var pathUrl = path.get('pathURL');
					if (pathUrl.charAt(0) === '#') {
						this.navigate(pathUrl, {trigger: true});
					} else {
						window.location = pathUrl;
					}
				}
			},
			PackageSelectedEvent: {
				name : 'PackageSelectedModelEvent',
				handler : function(pkg) {
					var collection = this.storage.get(Constants.storage.packageCollection);
					var selectedPkg = collection.getSelected();
					if (selectedPkg != null && selectedPkg.get('id') !== pkg.get('id')) {
						this.clearStorageForStep(Constants.state.SELECT_PACKAGE);
					}
					collection.select(pkg);
					
					this.updateUserPrice('package', pkg);
					this.updateFooter(Constants.state.SELECT_PACKAGE);
					
				}
			},
			DerivativeSelectedEvent: {
				name :'DerivativeSelectedModelEvent', 
				handler : function(derivative) {
					var collection = this.storage.get(Constants.storage.derivativeCollection);
					//TODO: can we move this so the user doesn't lose their progress
					var selectedDrv = collection.getSelected();
					if (selectedDrv != null && selectedDrv.get('id') !== derivative.get('id')) {
						this.clearStorageForStep(Constants.state.SELECT_DERIVATIVE);
					}
					collection.select(derivative);
					this.updateUserPrice('derivative', derivative);
					this.displayEngineView(derivative);
				}
			},
			/*
			 * Takes the user back to Nameplate page and clears the history.
			 */
			StartOverEvent: {
				name :'StartOverModelEvent',
				handler :  function() {
					this.storage.destroy();
					this.storage = new models.Storage();
					this.userPref.purge();
					this.navigate('reset', {trigger: true});
				}
			},
			EngineTrasmissionSelectedEvent : { 
				name: 'EngineTrasmissionSelectedModelEvent', 
				handler : function(engine) {
					var derivatives = this.storage.get(Constants.storage.derivativeCollection);
					derivatives.getSelected().get('engines').select(engine);
					this.updateUserPrice('engine', engine);
					this.updateFooter(Constants.state.SELECT_ENGINE);	
				}
			},
			
			
			/*
			 * Notifies the view to re-render the sorted list
			 */
			FeaturesSortCompletedEvent: 'FeaturesSortCompletedModelEvent',
			RegionPostcodeChangedEvent: 'RegionPostcodeChangedModelEvent',
			ShowArrowsEvent: 'ShowArrawsModelEvent',
			HideArrowsEvent: 'HideArrawsModelEvent',
			RegionPostcodeLoadedFromConfigEvent: 'RegionPostcodeLoadedFromConfigModelEvent' //to notify omniture only
		},
		
		router: {
			ActionTriggeredEvent: 'ActionTriggeredEvent',
			/*
			 * Sends a request to view to change currently selected tab
			 */
			NextTabEvent: 'NextTabEvent',
			PrevTabEvent: 'PrevTabEvent',
			/*
			 * PDF is ready to be served
			 */
			PDFReadyEvent: 'PDFReadyEvent',
			ShareReadyEvent: 'ShareReadyEvent',
			/*
			 * Block and unblock UI to prevent user from clicking away.
			 */
			BlockUIEvent: 'BlockUIEvent',
			UnblockUIEvent: 'UnblockUIEvent',
			UpdatePricezoneEvent : 'UpdatePricezoneEvent',//to update the pricezone on UI
			/*
			 * Fired when Loading customized page is completed. 
			 */
			LoadCompleteEvent: 'LoadCompleteEvent',
			EnginesLoadedEvent : 'EnginesLoadedEvent',
			HidePricesEvent: 'HidePricesEvent',
			HideHotDealPricesEvent: 'HideHotDealPricesEvent',
			/*
			 * Used only when ConfigUtil.showPostcodeSelect = true 
			 * If a user reloads a configuration but does not have a postcode cookie,
			 * Then the configuration will load but as soon as the user navigates away from
			 * summary page the user should be asked to enter a postcode.
			 * 
			 * Accepts a parameter (true or false)
			 * 
			 * pass in False when user switches postcode before changing the page.
			 * 
			 */
			AskForPostcodeEvent: 'AskForPostcodeEvent',
			ShowPricesLaterEvent: 'ShowPricesLaterEvent'
//				,
			/*
			 * occurs when loading configuration (FOA only) and configuration postcode/usage
			 * does not match what's in cookie.
			 */
//			PostcodeMisMatchEvent: 'PostcodeMisMatchEvent' 
		}
};
	