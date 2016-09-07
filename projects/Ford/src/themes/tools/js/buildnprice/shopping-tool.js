/**
 * global self executing function
 * 
 * @author Sohrab Zabetian 
 */
(function(window,document, views, models, collections, $, undefined){
	
	/**
	 * In charge of managing pages and loading information for each page.
	 */
	var BuildAndPriceApp = Backbone.Router.extend({
		storage: null,
		user : null,
		price : null,
		 
		routes: { 
		   
		    ":modelId/customize/:path/:derivativeId": "navToCustomizeDerivativePage",
		    ":modelId/summary/:path/:derivativeId": "navToSummaryPage" ,
		    "load/:uuid" : "loadConfigAndNavToSummaryPage",
		    ":modelId/next" : "navToDecisionPage",
		    "error" : "navToErrorPage",
		    "reset" : 'navToResetPage' //used to reset the tool 
		},
		
		initialize: function(options) {
			//Util.log('BuildAndPriceApp.initialize()');
			this.configureRoutes();
			this.storage = new models.Storage();
			this.userPref = new models.UserPref({'featuresObject': new collections.FeatureCollection()});
			this.registerEventListeners();
			this.viewManager = views.ViewManager();
			this.viewManager.initialise();
			this.setupOnError();
			//if pricezone and postcode have been disabled, hide prices 
			if (!ConfigUtil.showPrices()) {
				Events.fireEvent(Events.eventList.buildandprice.router.HidePricesEvent, true);
				Events.fireEvent(Events.eventList.buildandprice.router.HideHotDealPricesEvent);
			} 
		},
		
		setupOnError: function() {
			var self = this;
			window.onerror = function () {
				self.navigate('', {trigger : true});
				Events.fireEvent(Events.eventList.buildandprice.router.UnblockUIEvent);
			};
		},
		
		configureRoutes: function() {
			this.route("","navToNameplatesPage");
			if (ConfigUtil.isShortPath()) {
				this.route(":modelId/" + Constants.path.pkg, "navToPackagesPage");
				this.route(":modelId/" + Constants.path.pkg + '/select/:pkgId', "navToSelectPackagePage");
			} else {
				this.route(":modelId/" + Constants.path.pth,"navToPathsPage");
				this.route(":modelId/" + Constants.path.pkg, "navToPackagesPage");
				this.route(":modelId/" + Constants.path.drv, "navToDerivativesPage");
				this.route(":modelId/" + Constants.path.drv + '/select/:drvId', "navToSelectDrivativePage");
			}
		},
		
		registerEventListeners : function() {
			Events.eventBus.context = this;
			
			if (ConfigUtil.showPricezones()) {
				Events.bind(Events.eventList.buildandprice.model.PricezoneSelectedEvent.name, 
						Events.eventList.buildandprice.model.PricezoneSelectedEvent.handler, this);
				
				Events.bind(Events.eventList.buildandprice.model.PricezoneChangeRequestEvent.name, 
						Events.eventList.buildandprice.model.PricezoneChangeRequestEvent.handler, this);
			}
			
			Events.bind(Events.eventList.buildandprice.model.StartOverEvent.name,
					Events.eventList.buildandprice.model.StartOverEvent.handler, this);
			Events.bind(Events.eventList.buildandprice.model.ToggleViewEvent.name, 
					Events.eventList.buildandprice.model.ToggleViewEvent.handler, this);
			
			Events.bind(Events.eventList.buildandprice.model.TabChangedEvent.name, 
					Events.eventList.buildandprice.model.TabChangedEvent.handler, this);
			
			Events.bind(Events.eventList.buildandprice.view.SubTabChangedEvent, 
					Events.eventList.buildandprice.model.SubTabChangedEvent.handler, this);
			
			Events.bind(Events.eventList.buildandprice.model.PathSelectedEvent.name,
					Events.eventList.buildandprice.model.PathSelectedEvent.handler, this);
			Events.bind(Events.eventList.buildandprice.model.TabChangeRequestEvent.name, 
					Events.eventList.buildandprice.model.TabChangeRequestEvent.handler, this);
			Events.bind(Events.eventList.buildandprice.model.StepChangeRequestEvent.name,
					Events.eventList.buildandprice.model.StepChangeRequestEvent.handler, this);
			Events.bind(Events.eventList.buildandprice.model.StepChangeHeaderRequestEvent.name,
					Events.eventList.buildandprice.model.StepChangeHeaderRequestEvent.handler, this);
			Events.bind(Events.eventList.buildandprice.model.SaveAsPDFEvent.name,
					Events.eventList.buildandprice.model.SaveAsPDFEvent.handler, this);
			Events.bind(Events.eventList.buildandprice.model.ShareConfigEvent.name,  
					Events.eventList.buildandprice.model.ShareConfigEvent.handler, this);
			Events.bind(Events.eventList.buildandprice.model.PackageSelectedEvent.name, 
					Events.eventList.buildandprice.model.PackageSelectedEvent.handler, this);
			Events.bind(Events.eventList.buildandprice.model.DerivativeSelectedEvent.name,
					Events.eventList.buildandprice.model.DerivativeSelectedEvent.handler, this);
			Events.bind(Events.eventList.buildandprice.model.ModelSelectedEvent.name, 
					Events.eventList.buildandprice.model.ModelSelectedEvent.handler, this);
			Events.bind(Events.eventList.buildandprice.model.FeatureSelectedEvent.name,
					Events.eventList.buildandprice.model.FeatureSelectedEvent.handler, this);
			Events.bind(Events.eventList.buildandprice.model.TrimSelectedEvent.name, 
					Events.eventList.buildandprice.model.TrimSelectedEvent.handler, this);
			Events.bind(Events.eventList.buildandprice.model.ColorChangedEvent.name, 
					Events.eventList.buildandprice.model.ColorChangedEvent.handler, this);
			Events.bind(Events.eventList.buildandprice.model.EngineTrasmissionSelectedEvent.name, 
					Events.eventList.buildandprice.model.EngineTrasmissionSelectedEvent.handler, this);
			Events.bind(Events.eventList.buildandprice.model.RequestAQuoteEvent.name, 
					Events.eventList.buildandprice.model.RequestAQuoteEvent.handler, this);
			
			if(Events.eventList.buildandprice.model.PresentPaymentEvent.name){
				Events.bind(Events.eventList.buildandprice.model.PresentPaymentEvent.name, 
					Events.eventList.buildandprice.model.PresentPaymentEvent.handler, this);
			}

			Events.bind(Events.eventList.buildandprice.view.ShareLinkClickedEvent, 
					Events.eventList.buildandprice.model.ShareLinkClickedEvent.handler, this);
			
			Events.bind(Events.eventList.buildandprice.view.ViewAccessoryDetailsEvent, 
					Events.eventList.buildandprice.model.ViewAccessoryDetailsEvent.handler, this);
			
			if (ConfigUtil.showPostcodeSelect()) {
				Events.bind(Events.eventList.buildandprice.view.RegionPostcodeChangeRequestEvent, 
					Events.eventList.buildandprice.model.RegionPostcodeChangeRequestEvent.handler, this);
			}
			
			Events.bind(Events.eventList.buildandprice.model.OrientationChangedEvent.name, 
					Events.eventList.buildandprice.model.OrientationChangedEvent.handler, this);
			
			
			
//			Events.bind(Events.eventList.buildandprice.model.HotDealSelectedEvent.name, 
//					Events.eventList.buildandprice.model.HotDealSelectedEvent.handler, this);
			
			
		},

		navToGenericErrorPage : function(list) {
			this.navigate('#error', {trigger : true});
			Events.fireEvent(Events.eventList.buildandprice.router.UnblockUIEvent);
		},
		
		/**
		 * Hard reset on all feeds. 
		 */
		navToResetPage : function() {
			this.navigate('', {trigger: true, replace: true});
		},
	
		navToNameplatesPage : function() {
			Events.fireEvent(Events.eventList.buildandprice.router.BlockUIEvent);
			var self = this;
			this.fetchPricezonesAndNameplates(function(collection) {
				var view;
				if (collection && collection.length > 0) {
					if (ConfigUtil.showNameplateSegments()) {
						var nameplateCategories = new collections.NameplateCategoryCollection();
						Helper.buildNameplateCategoriesFromNameplates(collection, nameplateCategories);
						view = views.NameplateCagetoryListView;
						collection = nameplateCategories;
					} else {
						Helper.buildDecisionPageUrls(collection);
						view = views.NameplateListView;
					}	
					
					this.viewManager.displayParentView(view, collection);
					if (ConfigUtil.showPostcodeSelect()) {
						self.viewManager.displayChildView(views.FOANameplateHeaderListView, new models.HeaderModel({
							headerURL : '#',
							state: Constants.state.NO_STATE,
							postcode : this.userPref.get('postcode'), 
							usageLabel: this.userPref.get('usageLabel'),
							enabled : true}));
					} else if (ConfigUtil.showPricezones()){
						var pricezones = self.storage.get(Constants.storage.pricezoneCollection);
						var selectedPricezone = pricezones.getSelected();
						self.viewManager.displayChildView(views.NameplateHeaderListView, new models.HeaderModel({
							headerURL : '#',
							state: Constants.state.NO_STATE,
							postcode : selectedPricezone ? selectedPricezone.get('name') : '', 
							usageLabel : '',
							enabled : true}));
					}
				}
				if (ConfigUtil.showPostcodeSelect()) {
					this.removeHotDealsView();
				}
				Events.fireEvent(Events.eventList.buildandprice.omniture.StateChangedEvent,
						{state: Constants.state.SELECT_NAMEPLATE, storage: self.storage});
				Events.fireEvent(Events.eventList.buildandprice.router.UnblockUIEvent);
			});
		},
		
		navToDecisionPage : function(modelId) {
			var nextPage =  '#'  + modelId + '/';
			if (ConfigUtil.isShortPath()) { //packages only in shortpath
				nextPage +=  Constants.path.pkg;
			} 
			else if(!Helper.showPathStep()){
				nextPage +=  Constants.path.drv;
			}
			else {
				nextPage += Constants.path.pth; //derivatives + packages...let the user choose
			}
//			Util.log('nextPageURL: ' + nextPage);
			this.navigate(nextPage, {trigger: true, replace: true});
		},
		
		navToPathsPage : function(modelId) {
			Events.fireEvent(Events.eventList.buildandprice.router.BlockUIEvent);
			var self = this;
			this.fetchPricezonesNameplatesAndPaths(function(paths) {
				self.viewManager.displayParentView(views.SelectPathListView, paths);
				self.viewManager.displayTitleView(new models.PageTitleModel({title : Constants.bpt.chp}));
				self.displayHeadersView(modelId);
				self.updateHeader(Constants.state.SELECT_PATH, Helper.constructStepUrl.call(self, 
						{step: Constants.state.SELECT_PATH, modelId : modelId}));
				Events.fireEvent(Events.eventList.buildandprice.omniture.StateChangedEvent,
						{state: Constants.state.SELECT_PATH, storage: self.storage});
				Events.fireEvent(Events.eventList.buildandprice.router.UnblockUIEvent);
				if (ConfigUtil.showPostcodeSelect()) {
					self.removeHotDealsView();
				}
			}, modelId);
		},
		
		navToDerivativesPage : function(modelId, derivativeId) {
			Events.fireEvent(Events.eventList.buildandprice.router.BlockUIEvent);
			var self = this;
			//we should reconstruct the price object as it's out of sync wrt this page.
			this.fetchPricezonesNameplatesAndPaths(function(paths) {
				var model = new collections.DerivativeModelCollection();
				model.url = Helper.buildURL(model.urlRoot, self.getPricezoneId(), modelId, Constants.path.drv, self.userPref);
				self.fetchModel(Constants.storage.derivativeCollection,model, function(modelResult) {
					if (modelResult !== undefined && modelResult.length > 0) {
						Helper.postProcessDerivatives.call(self, modelResult);
						self.viewManager.displayParentView(views.SelectDerivativeListView, modelResult);
						self.viewManager.displayTitleView(new models.PageTitleModel({title :  Constants.bpt.chm, showLatestOffersBtn: ConfigUtil.showPostcodeSelect()}));
						self.displayHeadersView(modelId, Constants.path.drv);
						self.updateHeader(
								Constants.state.SELECT_DERIVATIVE,
								Helper.constructStepUrl.call(self,{step: Constants.state.SELECT_DERIVATIVE, 
																   path: Constants.path.drv,
																   modelId: modelId}), Constants.header.sm);
						
						self.displayFooterView({path: Constants.path.drv, modelId : modelId, step: Constants.state.SELECT_DERIVATIVE});
						self.updateFooter(Constants.state.SELECT_ENGINE);
						
						self.selectDerivative(modelResult, derivativeId);
						
						if (ConfigUtil.showPostcodeSelect()) {
							self.displayHotDealsView(modelId);
						}
					} else {
						self.displayNoContentView(modelId, Constants.path.drv);
					}
					
					Events.fireEvent(Events.eventList.buildandprice.omniture.StateChangedEvent,
							{state: Constants.state.SELECT_DERIVATIVE, path: Constants.path.drv, storage: self.storage});
					Events.fireEvent(Events.eventList.buildandprice.router.UnblockUIEvent);
				});
				
			}, modelId, Constants.path.drv);
			
		},
		
		navToSelectDrivativePage: function(modelId, derivativeId) {
//			Util.log('navToSelectDrivativePage');
			this.navToDerivativesPage(modelId, derivativeId);
		},
		
		selectDerivative: function(drvCollection, derivativeId) {
			if (derivativeId && derivativeId != null) {
				var derivative = drvCollection.get(derivativeId);
				Events.fireEvent(Events.eventList.buildandprice.model.DerivativeSelectedEvent.name, derivative);
			}
		},
		
		navToPackagesPage: function(modelId, packageId) {
			Events.fireEvent(Events.eventList.buildandprice.router.BlockUIEvent);
			var self = this;
			//we should reconstruct the price object as it's out of sync wrt this page.
			this.fetchPricezonesNameplatesAndPaths(function(paths) {
				var pkgCol = new collections.PackageModelCollection();
				pkgCol.url = Helper.buildURL(pkgCol.urlRoot, self.getPricezoneId(), modelId, Constants.path.pkg);
				self.fetchModel(Constants.storage.packageCollection, pkgCol, function(pkgColResult) {
					if (pkgColResult !== undefined && pkgColResult.length > 0) {
						Helper.postProcessPackages.call(self, pkgColResult);
						self.viewManager.displayParentView(views.SelectPackageListView, pkgColResult);
						self.viewManager.displayTitleView(new models.PageTitleModel({title : Constants.bpt.cp}));
						self.displayHeadersView(modelId, Constants.path.pkg);
						self.updateHeader(Constants.state.SELECT_PACKAGE, 
								Helper.constructStepUrl.call(self,{step: Constants.state.SELECT_PACKAGE,path: Constants.path.pkg,modelId : modelId})
								, ConfigUtil.isShortPath() ? undefined : Constants.header.sp);
						self.displayFooterView({path : Constants.path.pkg, modelId : modelId, step : Constants.state.SELECT_PACKAGE});
						
						
						self.selectPackage(pkgColResult, packageId);
						
						
						self.updateFooter(Constants.state.SELECT_PACKAGE);
					} else {
						self.displayNoContentView(modelId, Constants.path.pkg);
					}
					Events.fireEvent(Events.eventList.buildandprice.omniture.StateChangedEvent, 
							{state: Constants.state.SELECT_PACKAGE, path: Constants.path.pkg, storage: self.storage});
					Events.fireEvent(Events.eventList.buildandprice.router.UnblockUIEvent);
					if (ConfigUtil.showPostcodeSelect()) {
						self.removeHotDealsView();
					}
				});
			}, modelId, Constants.path.pkg);
			
		},
		
		navToSelectPackagePage: function(modelId, packageId) {
//			Util.log('navToSelectPackagePage');
			this.navToPackagesPage(modelId, packageId);
		},
		
		selectPackage: function(pkgColResult, packageId) {
			if (packageId && packageId != null) {
				var model = pkgColResult.get(packageId);
				Events.fireEvent(Events.eventList.buildandprice.model.PackageSelectedEvent.name, model);
			}
		},
		
		navToCustomizeDerivativePage : function(modelId, path, derivativeId) {
//			console.log('navToCustomizeDerivativePage');
			Events.fireEvent(Events.eventList.buildandprice.router.BlockUIEvent);
			var self = this;
			this.postProcessDerivativeDetails(modelId, path, derivativeId, function() {
				self.clearStorageForStep.call(self, Constants.state.CUSTOMIZE_DERIVATIVE);
			},
			function() {
			
				self.displayDerivativeDetailView(modelId, path, derivativeId);
				Events.fireEvent(Events.eventList.buildandprice.omniture.StateChangedEvent,
						{state: Constants.state.CUSTOMIZE_DERIVATIVE, path: path, storage: self.storage});
				Events.fireEvent(Events.eventList.buildandprice.router.UnblockUIEvent);
			});
		},
	
		navToSummaryPage : function(modelId, path, derivativeId, isLoadingConfig, showPricesLater) {
			Events.fireEvent(Events.eventList.buildandprice.router.BlockUIEvent);
			isLoadingConfig = (typeof isLoadingConfig !== 'undefined') ? isLoadingConfig : false;
			showPricesLater = (typeof showPricesLater !== 'undefined') ? showPricesLater : false;
			var footer = this.storage.get(Constants.storage.footerModel);
			if (typeof footer === 'undefined' || footer == null) {
				//need to create a footer if one doesn't exist.
				footer = this.createFooter({path: path,derivativeId : derivativeId, step: Constants.state.SUMMARY});
			}
			
			if (ConfigUtil.usePolkPricing(path)) {
				//Util.log('hello');
				var tmpPostcode= this.userPref.get('tempPostcode');
				var tmpUsage = this.userPref.get('tempUsage');
				var postcode = this.userPref.get('postcode');
				var usage = this.userPref.get('usage');
				if (tmpPostcode != postcode || 
					tmpUsage != usage) {
					
					var postcodeHint = Constants.bpt.postcodeMisMatch;
					if (typeof tmpPostcode === 'undefined' || tmpPostcode == null || typeof tmpUsage === 'undefined' ||
						tmpUsage == null || tmpPostcode === '' || tmpUsage === '') {
						postcodeHint = postcodeHint.replace(/%1/g, Constants.bpt.regionNotSpecified)
						.replace(/%2/g, '');
					} else {
						postcodeHint = postcodeHint
						.replace(/%1/g, tmpPostcode)
						.replace(/%2/g, Helper.getUsageLabelFromLabel(tmpUsage));
					}
					if (typeof postcode === 'undefined' || typeof usage === 'undefined' || 
						postcode == null || usage == null || postcode === '') {
						postcodeHint = postcodeHint.replace(/%3/g, Constants.bpt.yourRegionNotSpecified).replace(/%4/g, '');
					} else {
						postcodeHint = postcodeHint
						.replace(/%3/g, postcode)
						.replace(/%4/g, Helper.getUsageLabelFromLabel(usage));
					}
					
					footer.set("postcodeHint", postcodeHint);
				}
				
				if (typeof tmpPostcode === 'undefined') {
					footer.set("postcodeHint", null);
				}
				
				var userJSON = this.userPref.toJSON();
				tmpPostcode = (typeof tmpPostcode !== 'undefined')  ? tmpPostcode : null;
				tmpUsage = (typeof tmpUsage !== 'undefined') ? tmpUsage : null;
				var data = {
					'postcode' : userJSON.postcode,
					'usage' : userJSON.usage,
					'options' : this.userPref.totalOptionsForPOLK(),
					'engineid' : userJSON.engineId,
					'derivatives' : new Array(userJSON.derivativeId)
				};
				if (tmpPostcode != null && tmpUsage != null) {
					data.postcode = tmpPostcode;
					data.usage = tmpUsage;
				}
				this.userPref.unset('tempPostcode'); //remove these attributes
				this.userPref.unset('tempUsage');
				
				var self = this;
				if (data.postcode != null && data.postcode !== '' && data.usage != null && data.usage !== '') {
					$.ajax({
						dataType: 'json',
						url:Config.buildandprice.urls.driveawayURL + '&data=' + JSON.stringify(data),
						success: function(result, textStatus, jqXHR) {
							if (result.error === false) {
								if (result.derivatives && result.derivatives.length > 0) {
									var polkPrice = self.userPref.totalWithPOLK(result.derivatives[0].price);
									self.userPref.set('unformattedPolkPrice', polkPrice);
									self.userPref.set('polkPrice', ND.PriceFormatter.format(polkPrice.toString()));
									footer.set('hasError', false);
								}
							} else {
								footer.set('hasError', true);
								self.userPref.set('unformattedPolkPrice', null);
								self.userPref.set('polkPrice', result.errorMessage);
							}
							
							self.displaySummaryView(modelId, path, derivativeId, footer, isLoadingConfig, showPricesLater);
						},
						error: function (request, error) {
							//ignore?	
							footer.set('hasError', true);
							self.userPref.set('polkPrice', Constants.bpt.errorCalcPrice);
							self.userPref.set('unformattedPolkPrice', null);
							self.displaySummaryView(modelId, path, derivativeId, footer, isLoadingConfig, showPricesLater);
						}
					});
				} else {
					footer.set('hasError', true);
					self.userPref.set('polkPrice', Constants.bpt.selectRegionToViewPrices);
					self.userPref.set('unformattedPolkPrice', null);
					this.displaySummaryView(modelId, path, derivativeId, footer, isLoadingConfig, showPricesLater);
				}
				
			} else {
				this.displaySummaryView(modelId, path, derivativeId, footer, isLoadingConfig, showPricesLater);
			}
			
			//displaySummaryView will unblock UI
		},
		
		navToErrorPage : function() {
			this.viewManager.displayParentView(views.ErrorView, new models.ErrorModel());
			this.viewManager.displayTitleView(new models.PageTitleModel({title : Constants.bpt.et}));
			if (ConfigUtil.showPostcodeSelect()) {
				this.removeHotDealsView();
			}
		},
		
		loadConfigAndNavToSummaryPage: function(uuid) {
			Events.fireEvent(Events.eventList.buildandprice.router.BlockUIEvent);
			var self = this;
			this.userPref.url = this.userPref.urlRoot + uuid;
			var askForPostcodeLater = false;
			var showPricesLater = false;
			$.when(self.userPref.fetch())
			.done(function() {
				
				//first load pricezones
				self.fetchPricezones(function(collection) {
					//load the saved pricezone from server.
					var defaultPricezone = collection.get(self.userPref.get('priceZoneId'));
					if (typeof defaultPricezone === 'undefined' || defaultPricezone == null) {
						defaultPricezone = collection.where({'default': 'true'});
						if (defaultPricezone  && defaultPricezone.length > 0) {
							defaultPricezone = defaultPricezone[0];
						} else {
							defaultPricezone = collection.at(0);
						}
					}
					collection.select(defaultPricezone);
					//initialise price formatter
					Helper.initialisePriceFormatter(defaultPricezone);
					self.storage.set(Constants.storage.pricezoneCollection, collection);
					self.updatePricezoneForUserObject(defaultPricezone);
					var pricezoneId = defaultPricezone.get('id');
					
					Events.fireEvent(Events.eventList.buildandprice.router.UpdatePricezoneEvent, defaultPricezone.get('name'));
					
					//first check region if we are in FOA
					var derivativeId = self.userPref.get('derivativeId');
					//if we have postcodes (usually FOA)
					if (ConfigUtil.showPostcodeSelect() && typeof derivativeId !== 'undefined' && derivativeId != null) {
						//read the cookie and see if we have stored the postcode before
						ND.API.requestCookieValuesBuildAndPrice({complete: 
							function(result) {
								//our saved postcode from loaded config
								var postcode = self.userPref.get('postcode');
								var usage = self.userPref.get('usage');
								
								//postcode from cookie
								if (typeof result !== 'undefined' && result != null && result.postcode) {
									self.userPref.set({ //we need to keep both, crazy logic to start to shape up :P
										'tempPostcode': postcode,
										'tempUsage': usage,
										'postcode': result.postcode,
										'usage': result.usage,
										'usageLabel': result.usageLabel
									});
									showPricesLater = true;
									//let omniture know which region is selected.
								} else {
									self.userPref.set({
										'tempPostcode': postcode,
										'tempUsage': usage,
										'postcode': '',
										'usage': ''
									});
									askForPostcodeLater = true;
								}
									
								if (typeof postcode === 'undefined' || postcode == null || postcode === '') {
									Events.fireEvent(Events.eventList.buildandprice.router.HidePricesEvent, true);
								} else {
									Events.fireEvent(Events.eventList.buildandprice.model.RegionPostcodeLoadedFromConfigEvent, {postcode: postcode});
								}
							}
						});
					}
					
					//first load nameplates
					var nc = new collections.NameplateCollection();
					nc.url = Helper.buildURL(nc.urlRoot, self.getPricezoneId(),null, null, self.userPref);
					self.fetchModel(Constants.storage.nameplateCollection, nc, function(nameplates) {
						//set the selected nameplate
						var modelId = self.userPref.get('modelId');
						var toBeSelectedNameplate = nameplates.get(modelId);
						if (typeof toBeSelectedNameplate !== 'undefined' && toBeSelectedNameplate != null) {
							nameplates.select(toBeSelectedNameplate);
							
							var derivativeId = null;
							var path = Constants.path.pkg;
							if (ConfigUtil.isShortPath() || typeof self.userPref.get('packageId') !== 'undefined' ) {
								self.createPaths(path, toBeSelectedNameplate, modelId);
								//load package details
								var packages = new collections.PackageModelCollection();
								packages.url = Helper.buildURL(packages.urlRoot, pricezoneId, modelId, path);
								self.fetchModel(Constants.storage.packageCollection, packages, function(packagesResult) {
									//select user selected package
									derivativeId = self.userPref.get('packageId');
									
									var toBeSelectedPackage = packagesResult.selectById(derivativeId);
									if(typeof toBeSelectedPackage !== 'undefined' && toBeSelectedPackage != null) {
//										packages.select(toBeSelectedPackage);
//										self.storage.set(Constants.storage.packageCollection, packages);
										self.updateUserPrice('package', toBeSelectedPackage);
										self.loadDerivativeDetails(pricezoneId,modelId, path, derivativeId, askForPostcodeLater, showPricesLater);
									} else {
										self.navToGenericErrorPage();
									}
								});
							} else {
								path = Constants.path.drv;
								self.createPaths(path, toBeSelectedNameplate, modelId);
								var derivatives = new collections.DerivativeModelCollection();
								derivatives.url = Helper.buildURL(derivatives.urlRoot,pricezoneId, modelId, path, self.userPref);
								self.fetchModel(Constants.storage.derivativeCollection, derivatives, function(derivativesResult) {
									//select user selected package
									derivativeId = self.userPref.get('derivativeId');
									
									var toBeSelectedDerivative = derivativesResult.selectById(derivativeId);
									if(typeof toBeSelectedDerivative !== 'undefined' && toBeSelectedDerivative != null) {
//											derivatives.select(toBeSelectedDerivative);
//											self.storage.set(Constants.storage.derivativeCollection, derivatives);
										self.updateUserPrice('derivative', toBeSelectedDerivative);
										
										var engines = new collections.EngineTransmissionCollection();
										engines.url = Helper.buildURL(engines.urlRoot,pricezoneId, derivativeId, '', self.userPref);
										$.when(engines.fetch()).then(function() {
											Helper.postProcessEngines(engines);
											var selectedEngine = engines.selectById(self.userPref.get('engineId'));
											if (typeof selectedEngine !== 'undefined'  && selectedEngine != null) {
												toBeSelectedDerivative.set('engines', engines);
												self.updateUserPrice('engine', selectedEngine);
												self.loadDerivativeDetails(pricezoneId,modelId, path, derivativeId, askForPostcodeLater, showPricesLater);
											} else {
												self.navToGenericErrorPage();
											}
										});
										
									} else {
										self.navToGenericErrorPage();
									}
								});
							}
							
							
						} else {
							self.navToGenericErrorPage();
						}
					});
				});
			 }).fail($.proxy(self.navToGenericErrorPage, self));
			
		},
		
		postProcessDerivativeDetails : function(modelId, path, derivativeId, cleanupCallback, onCompleteCallback) {
			//Util.log('postProcessDerivativeDetails');
			
			var derivativeDetailModel = this.storage.get(Constants.storage.derivativeDetailsModel);
			var galleryCollection = this.storage.get(Constants.storage.galleryCollection);
			var categoryGroupCollection = this.storage.get(Constants.storage.categoryGrpCollection);
			var colorCollection = this.storage.get(Constants.storage.colorCollection);
			
			if (typeof this.storage.get(Constants.storage.footerModel) === 'undefined') {
				this.createFooter({path: path, derivativeId : derivativeId, step: Constants.state.CUSTOMIZE_DERIVATIVE});
			}
			
			//decide whether to use cached data or pull everything from the server.
			if (derivativeDetailModel != null && galleryCollection  != null && 
				categoryGroupCollection != null &&
				colorCollection != null && (derivativeId == derivativeDetailModel.get('id'))) {
				if (typeof onCompleteCallback !== 'undefined') {
					onCompleteCallback.call(self);
				}
			} else {
				
				var pricezoneId = this.getPricezoneId();
				derivativeDetailModel = new models.DerivativeDetailModel({id : derivativeId});
				derivativeDetailModel.url = Helper.buildURL(derivativeDetailModel.urlRoot, pricezoneId,derivativeId, path); 
				colorCollection = new collections.ColorCollection();
				colorCollection.url = Helper.buildURL(colorCollection.urlRoot, pricezoneId, derivativeId, path); 
				categoryGroupCollection = new collections.CategoryGroupCollection();
				categoryGroupCollection.url = Helper.buildURL(categoryGroupCollection.urlRoot, pricezoneId, derivativeId, path);
				galleryCollection = new collections.GalleryCollection();
				if (typeof cleanupCallback !== 'undefined') {
					cleanupCallback.call(self);
				}
				var self = this;
				$.when(categoryGroupCollection.fetch(),
					this.deferredFetchAndPersist(Constants.storage.derivativeDetailsModel, derivativeDetailModel),
					this.deferredFetchAndPersist(Constants.storage.colorCollection, colorCollection))
				.then(function() {
					Helper.postProcessColorTrims(colorCollection);
					galleryCollection.addBaseSprites(colorCollection, 'color');
					
					_.each(categoryGroupCollection.models, function(categoryGroup) {
						var categories = categoryGroup.get(Constants.attr.catgs);
						var containsFeatureGroup = false;
						if (categories != null) {
							_.each(categories.models, function(category) {
								var features = category.get(Constants.attr.feats);
								if (features && features != null) {
									var mutuallyExclusiveFeatures = features.where({groupType : Constants.values.mutuallyExclusiveOptions});
									//we need to remove mutually exclusive features from list of features before continuing.
									//they are symbolic features that maintain relationship between real features.
									if (mutuallyExclusiveFeatures && mutuallyExclusiveFeatures != null) {
										//remove mx features
										features.remove(mutuallyExclusiveFeatures);
										_.each(mutuallyExclusiveFeatures, function(mutuallyExclusiveFeature) {
											//extract mx features relational data
											var featureGroupAttributes = mutuallyExclusiveFeature.get('featureGroupAttributes');
											if (featureGroupAttributes != null && featureGroupAttributes.length > 0) {
												//search for ids in real feature list
												var fgaIdList = featureGroupAttributes.pluck('id');
												_.each(fgaIdList, function(id) {
													var feature = features.get(id);
													if (feature != null) {
														//add the relation to each real feature.
														var fgaCollection = new collections.FeatureGroupAttributeCollection();
														var newFgaList = _.without(fgaIdList, id);
														_.each(newFgaList, function(filteredId) {
															fgaCollection.add(new models.FeatureGroupAttribute({id: filteredId}));
														});
														feature.set({'featureGroupAttributes': fgaCollection, 'isMutuallyExclusive': true});
													} else {
														//console.log('WARN: could not find MX feature with id: ' + id);
													}
												});
											}
										});
									}
									galleryCollection.addAccessorySprites(features, 'feature');
									var optionPackFeatures = features.where({groupType : Constants.values.optionPack});
									if (optionPackFeatures && optionPackFeatures != null) {
										_.each(optionPackFeatures, function(optionPackFeature) {
											optionPackFeature.set({'featureDetailUrl': '#', 'isOptionPack': true});
											var featureGroupAttributes = optionPackFeature.get('featureGroupAttributes');
											if (featureGroupAttributes != null && featureGroupAttributes.length > 0) {
									            //we do not have a feature details for feature groups
												containsFeatureGroup = true;
											}
										});
									}
									
									var dependentFeatures = features.reject(function(feature) {
										return feature.get('dependentFeaturesIds') == null;
									});
									
									if (dependentFeatures && dependentFeatures != null) {
										_.each(dependentFeatures, function(dependentFeature) {
											if (dependentFeature.get('isMutuallyExclusive')) {
												alert('Unsupported publishing setup!! A mutually exclusive feature cannot have dependent features');
											}
											dependentFeature.set('hasDependentFeatures', true);
											
											//convert dependentFeaturesIds from "1,2,3,4,5,6" to an array
											dependentFeature.set('dependentFeaturesIds',
													dependentFeature.get('dependentFeaturesIds').split(','));
										});
									}
								}
							 });
						}
						if (containsFeatureGroup) {
							categoryGroup.set('containsFeatureGroup', containsFeatureGroup);
						}
					});
					
					self.getSelectedPackageDerivative(self.storage, {pkgCallback: function(pkg) {
						//Need to pass in a dummy engine because we don't have one.
						self.updateUserPrice('engine', new models.EngineTransmission({id : derivativeDetailModel.get('engineId')}));
						pkg.set('engineId', derivativeDetailModel.get('engineId'), {silent:true});
						
					}});
					Helper.postProcessVehicleOptionsCollection(categoryGroupCollection, pricezoneId, derivativeId);
					self.storage.set(Constants.storage.categoryGrpCollection, categoryGroupCollection);
					self.storage.set(Constants.storage.galleryCollection, galleryCollection);
					
					
					if (typeof onCompleteCallback !== 'undefined') {
						onCompleteCallback.call(self);
					}
				});
			}
			
		},
			
		loadDerivativeDetails: function(pricezoneId, modelId, path, derivativeId, askForPostcodeLater, showPricesLater) {
			
			var self = this;
			this.postProcessDerivativeDetails(modelId, path, derivativeId,undefined, function() {
				//Util.log('postProcessDerivativeDetails.callback = loadDerivativeDetails');
				
				var colorId = self.userPref.get('colourId');
				var colorCollection = self.storage.get(Constants.storage.colorCollection);
				var colorToBeSelected = colorCollection.get(colorId);
				if (typeof colorToBeSelected !== 'undefined' && colorToBeSelected != null) {
					colorCollection.select(colorToBeSelected);
					self.updateUserPrice('colour', colorToBeSelected);
					//Util.log('selectedColor');
					//select trims
					var trimId = self.userPref.get('trimId');
					var trims = colorToBeSelected.get('trims');
					if (trims && trims.length > 0) {
						var trimToBeSelected = trims.get(trimId);
						if (trimToBeSelected && trimToBeSelected != null) {
							trims.select(trimToBeSelected);
							self.updateUserPrice('trim', trimToBeSelected);
							//Util.log('selectedTrim');
							var savedFeatureIds = self.userPref.get(Constants.attr.feats);
							//console.dir(savedFeatureIds);
							if (typeof savedFeatureIds !== 'undefined' && savedFeatureIds != null && savedFeatureIds.length > 0) {
								//Util.log('hasFeatures');
								var categoryGrpCollection = self.storage.get(Constants.storage.categoryGrpCollection);
							
								var featuresToBeSelected = categoryGrpCollection.fetchFeatures(savedFeatureIds);
								
//								if (featuresToBeSelected.length !== savedFeatureIds.length) {
//									self.navToGenericErrorPage();
//									return;
//								}
								_.each(featuresToBeSelected, function(featureToBeSelected) {
									self.toggleFeaturesByType(featureToBeSelected);
								});
							}
						//	once everything is set do final step:
							if (ConfigUtil.showPostcodeSelect()) {
								self.displayHotDealsView(modelId);
							}
							self.navToSummaryPage(modelId, path, derivativeId, askForPostcodeLater, showPricesLater);
							self.navigate(Helper.constructStepUrl.call(self,{step: Constants.state.SUMMARY, modelId : modelId, path: path, derivativeId : derivativeId}), {replace: true, trigger: false});
						}
					} else {
						//NO TRIM, 
						self.navToGenericErrorPage();
					}
				} else {
					//NO COLOUR, 
					self.navToGenericErrorPage();
				}
			});
		},
		
		displayNoContentView : function(modelId, path) {
			this.viewManager.displayParentView(views.NoVehiclesView, 
					new models.ErrorModel({title: Constants.bpt.sv, 
										   message: Constants.bpt.cl,
										   showPricezone: ConfigUtil.showPricezones()}));
			this.displayHeadersView(modelId, path);
			this.updateHeader(Constants.state.SELECT_PACKAGE, Helper.constructStepUrl.call(self,{step: Constants.state.SELECT_PACKAGE, path: path, modelId : modelId}));
		},
		
		displayHeadersView : function(modelId, path) {
			
			var headerCollection = this.storage.get(Constants.storage.headerCollection);
			if (!headerCollection && headerCollection == null) {
				headerCollection = Helper.constructHeader.call(this, modelId, path);
				this.storage.set(Constants.storage.headerCollection, headerCollection);
			}
			
			if (ConfigUtil.isShortPath()) {
				this.viewManager.displayChildView(views.ShortPathHeaderListView, headerCollection);
			} else {
				this.viewManager.displayChildView(views.HeaderListView, headerCollection);
			}
		},
		
		toggleFeaturesByType: function(model) {
			//call the appropriate feature method based on flags set
			if (model.get('isOptionPack')) {
				this.toggleOptionPackSelection(model, false);
			} else if (model.get('isMutuallyExclusive')) {
				this.toggleMutuallyExclusiveFeatureSelection(model, false);
			} else if (model.get('hasDependentFeatures')) {
				this.toggleDependentFeatureSelection(model, false);
			} else {
				this.toggleFeatureSelection(model);
			}
		},
		
		/**
		 * Enable this and all previous steps
		 */
		updateHeader: function(activeIdx, url, updatedName, unvisitSteps) {
			var steps = this.storage.get(Constants.storage.headerCollection);
			
			var isNameplateHeader = true;
			var modelName = Helper.getNameplateName.call(this);
			_.each(steps.models, function(step) {
				var state = step.get('state');
				if (isNameplateHeader === true && //update the nameplate header if it has changed.
					0 === step.get('order') && 
					modelName !== step.get('heading')) {
					step.set('heading', modelName);
					isNameplateHeader = false;
				}
				isCurrentState = (state == activeIdx);
				step.set('enabled',  ((state <= activeIdx) || step.get('visited')));
				step.set('isCurrent', isCurrentState);
				if (isCurrentState) {
					step.set('visited', true);
					step.set('headerURL', url);
					if (updatedName !== undefined) {
						step.set('heading', updatedName);
					}
				}
			});
		},
		
		unvisitHeaders: function(step) {
			var headers = this.storage.get(Constants.storage.headerCollection);
			_.each(headers.models, function(header) {
				header.set({'visited': header.get('state') <= step, 'enabled': header.get('state') <= step});
			});
		},
		
		createFooter: function(options) {
			var model = this.storage.get(Constants.storage.footerModel);
			if (!model) {
				model = new models.FooterModel();
				options.step = options.step + 1;
				model.setNextButton(Helper.constructStepUrl.call(this, options), Constants.header.c);
				options.step = options.step - 2; 
				model.setPrevButton(Helper.constructStepUrl.call(this, options), Constants.header.p);
				this.storage.set(Constants.storage.footerModel, model);
			}
			return model;
		},
		
		displayFooterView : function(options) {
			var model = this.createFooter(options);
			this.viewManager.displayChildView(views.FooterView, model);
			if ((!ConfigUtil.isShortPath() && options.step >= Constants.state.SELECT_PACKAGE) || 
				(ConfigUtil.isShortPath() && options.step > Constants.state.SELECT_PACKAGE)) {
				this.viewManager.displayChildView(views.BackButtonView, model);
			}
		},
		
		displayHotDealsView : function(modelId) {
			var hotdeals = this.storage.get(Constants.storage.hotdealCollection);
			if (typeof hotdeals === 'undefined' || hotdeals == null || hotdeals.url.indexOf(modelId) < 0) {
				
				//console.log('recreating hotdeals');
				
				hotdeals = new collections.HotDealCollection();
				
				hotdeals.url = hotdeals.urlRoot + '/' +  Config.site + '/' + modelId;
				var postcode = this.userPref.get('postcode');
				if (postcode != '') {
					hotdeals.url += '/' + postcode;
				}
				//console.log('fetch n persist hotdeals');
				var self = this;
				$.when(self.deferredFetchAndPersist(Constants.storage.hotdealCollection, hotdeals)).then(function() {
					Helper.postProcessHotDeals(hotdeals, self.storage.get(Constants.storage.derivativeCollection));
					self.buildHotDealContainer(hotdeals);
				});
			} else {
				this.buildHotDealContainer(hotdeals);
			}
		},
		
		buildHotDealContainer: function(hotdeals) {
			
			var nameplateNames = _.uniq(hotdeals.pluck('nameplatename'));
			
			var title = Constants.bpt.latestOffersInstructions.replace('%1', nameplateNames.sort().join(', '));
			var model = new models.HotDealContainer({latestOffersInstructions: title, hotdeals: hotdeals});
			this.viewManager.displayIndependantView('HotDealsView',views.HotDealsView, model);
		},
		
		displaySummaryView : function(modelId, path, derivativeId, footer, isLoadingConfig, showPricesLater) {
			
			footer.set('id', derivativeId);
			footer.set('priceZoneId', this.getPricezoneId());
			footer.set('isPackage', path === Constants.path.pkg);
			var color = this.storage.get(Constants.storage.colorCollection).getSelected();
			footer.set('vehicleThumbnailUrl', color.get('thumbnailUrl'));
			footer.set('unformattedPolkPrice', this.userPref.get('unformattedPolkPrice'));
			footer.set('locationValue', this.userPref.get('postcode') + ' ' + this.userPref.get('usageLabel'));
			
			var nameplateId = this.storage.get(Constants.storage.nameplateCollection).getSelected().get('id');
			this.viewManager.displayParentView(views.SummaryView, footer);
			this.displayHeadersView(nameplateId, path);
			this.updateHeader(Constants.state.CUSTOMIZE_DERIVATIVE, Helper.constructStepUrl.call(this,
					{step: Constants.state.CUSTOMIZE_DERIVATIVE,
					 modelId : modelId,
					 path: path,
					 derivativeId : derivativeId}));
			this.updateHeader(Constants.state.SUMMARY, Helper.constructStepUrl.call(this, 
					{step : Constants.state.SUMMARY, 
					 modelId : modelId,
					 path: path,
					 derivativeId: derivativeId}));
			
			this.viewManager.displayTitleView(new models.PageTitleModel({title: null,
					showLatestOffersBtn: (ConfigUtil.showPostcodeSelect() && (path !== Constants.path.pkg))}));
			
			//update customize derivative header as well to fix reload configuration navigation error.
			
			this.viewManager.displayChildView(views.BackButtonView, footer);
			this.updateFooter(Constants.state.SUMMARY);
			
			var summaryCategories = new collections.SummaryCategoryCollection();
			
			var categoryGroupCollection = this.storage.get(Constants.storage.categoryGrpCollection);
			
			var trim = color.get('trims').getSelected();
			var colorTrimPrice = parseFloat(color.get('price')) + parseFloat(trim.get('price'));
			var categorySummary = new models.SummaryCategory({category : Constants.bpt.ct,
														  categoryTotal : ND.PriceFormatter.format(colorTrimPrice.toString()), 
														  order : 1});
			var summaryFeatures = new collections.SummaryFeatureCollection();
			summaryFeatures.add(new models.SummaryFeature({name : color.get('name'), price : ND.PriceFormatter.format(color.get('price')), nameSuffix : Constants.priceSuffix.colour}));
			summaryFeatures.add(new models.SummaryFeature({name : trim.get('name'), price : ND.PriceFormatter.format(trim.get('price'))}));
			categorySummary.set(Constants.attr.feats, summaryFeatures);
			summaryCategories.add(categorySummary);
			Helper.postProcessCategoryGroups(categoryGroupCollection, categorySummary, summaryFeatures, summaryCategories, this.userPref.get(Constants.attr.feats));
			this.viewManager.displayChildView(views.PriceCategoryBreakdownListView, summaryCategories);
			Events.fireEvent(Events.eventList.buildandprice.omniture.StateChangedEvent, 
					{state: Constants.state.SUMMARY, path: path, storage: this.storage, userPref: this.userPref });
			if (isLoadingConfig && ConfigUtil.showPostcodeSelect()) {
				Events.fireEvent(Events.eventList.buildandprice.router.AskForPostcodeEvent, true);
			}
			if (showPricesLater && ConfigUtil.showPrices()) {
				Events.fireEvent(Events.eventList.buildandprice.router.ShowPricesLaterEvent);
			}
			Events.fireEvent(Events.eventList.buildandprice.router.UnblockUIEvent);
		},
		
		removeHotDealsView: function() {
			this.viewManager.removeIndependantView('HotDealsView');
		},
	
		/**
		 * 
		 * Need to get postcode and usage from user before continuing.
		 * @param callback
		 * @param modelId
		 */
		fetchPricezonesAndNameplates : function(callback, modelId) {
			var self = this;
			if (ConfigUtil.showPostcodeSelect()) {
				
				//we need to handle a special case for omniture.
				//first we need to see if we have a cookie already in the browser.
				ND.API.requestCookieValuesBuildAndPrice({complete: 
					function(result) {
					   //if NO cookie exists
						if (typeof result === 'undefined' || result == null || result.postcode == null || result.postcode === '') {
							//open the overlay and ask the user to enter a postcode
							ND.API.requestChangePriceBuildAndPrice({complete: function(result) {
								//pass false for fromExistingCookie param to trigger set of events
								self.processRegionPostcode(result, false, callback, modelId);
							}}, false);
						} else {//if a cookie already exists
							//pass true for fromExistingCookie param to trigger set of events
							self.processRegionPostcode(result, true, callback, modelId);
						}
					}
				});
				
			} else {
				self.loadPricezones.call(self, callback, modelId);
			}
		},
		
		processRegionPostcode: function(result, fromExistingCookie, callback, modelId) {
			
			if (fromExistingCookie) {//do not trigger omniture region changed event
				Events.fireEvent(Events.eventList.buildandprice.model.RegionPostcodeChangedEvent, result);
				Events.fireEvent(Events.eventList.buildandprice.router.HidePricesEvent, !ConfigUtil.showPrices());
			} else {
				if (result && result.postcode) { //fire omniture region changed event
					if (((this.userPref.get('postcode') !== result.postcode) || (this.userPref.get('usage') !== result.usage))) {
						Events.fireEvent(Events.eventList.buildandprice.omniture.RegionPostcodeChangedEvent, result);
						Events.fireEvent(Events.eventList.buildandprice.model.RegionPostcodeChangedEvent, result);
						Events.fireEvent(Events.eventList.buildandprice.router.HidePricesEvent, !ConfigUtil.showPrices());
					} 
				} else {
					Events.fireEvent(Events.eventList.buildandprice.router.HidePricesEvent, true);
				}
			}
			
			this.loadPricezones.call(this, callback, modelId);
		},
		
		/**
		 * Fetches pricezones and selects the appropriate pricezone. 
		 * Then fetches nameplates and selects the given nameplate by modelId
		 * @param callback : method to call once data is loaded + processed
		 * @param modelId
		 */
		loadPricezones: function(callback, modelId) {
			var self = this;
			this.fetchPricezones(function(collection) {
				$.proxy(Helper.processPricezone, self)(collection);
				if (ConfigUtil.showPricezones()) {
					Events.fireEvent(Events.eventList.buildandprice.router.UpdatePricezoneEvent, collection.getSelected().get('name'));
				}
				var nc = new collections.NameplateCollection();
				nc.url = Helper.buildURL(nc.urlRoot, self.getPricezoneId(), null, null, self.userPref);
				self.fetchModel(Constants.storage.nameplateCollection, nc, function(ncCol) {
					if (modelId) {
						var toSelect = ncCol.get(modelId);
						ncCol.select(toSelect);
						self.updateUserPrice('model', toSelect);
					}
					callback.call(self, ncCol);
				});
			});
		},
		
		fetchPricezonesNameplatesAndPaths : function(callback, modelId, path) {
			var self = this;
			this.fetchPricezonesAndNameplates(function(nameplateCollection) {
				var nameplate = nameplateCollection.getSelected();
				var paths = self.createPaths(path, nameplate, modelId);
				$.proxy(callback, self)(paths);
			}, modelId);
		},
		
		
		createPaths : function(path, nameplate, modelId) {
			var prevPaths = this.storage.get(Constants.storage.pathCollection);
			
			var paths = new collections.PathCollection();
			
			var nameplateName = nameplate.get('name');
			var hotDealUrl = nameplate.get('hotDealUrl');
			var pkg = new models.PathModel({key: Constants.path.pkg, 
				imageURL : nameplate.get('pkgImageURL'), 
				pathURL : (hotDealUrl != null) ? hotDealUrl : 
						  (Helper.constructStepUrl.call(this, {step: Constants.state.SELECT_PACKAGE, path: Constants.path.pkg, modelId : modelId})), 
				name : Constants.bpt.czp,
				title : Constants.bpt.sczp, 
				instruction: Constants.bpt.ppi.replace('%1', nameplateName)
			});
			
			var drv = new models.PathModel({key: Constants.path.drv, 
				imageURL : nameplate.get('byoImageURL'),
				pathURL : (Helper.constructStepUrl.call(this, {step: Constants.state.SELECT_DERIVATIVE, path: Constants.path.drv, modelId :modelId})), 
				name : Constants.bpt.byon, 
				title : Constants.bpt.byot, 
				instruction: Constants.bpt.pbyoi.replace('%1', nameplateName)
			});
			paths.add(pkg);
			paths.add(drv);
			
			if (typeof path === 'undefined' && prevPaths != null) {
				path = prevPaths.getSelected();
				if (path != null) {
					if (path.get('key') === pkg.get('key')) {
						path = pkg;
					} else if (path.get('key') === drv.get('key')) {
						path = drv;
					}
					paths.select(path);
				}
			} else if ((typeof path !== 'undefined') && path != null) {
				if (path === pkg.get('key')) {
					path = pkg;
				} else if (path === drv.get('key')) {
					path = drv;
				}
				paths.select(path);
			} 
			this.storage.set(Constants.storage.pathCollection, paths);
			
			return paths;
		},
		
		fetchPricezones: function(successFunction) {
			this.fetchModel(Constants.storage.pricezoneCollection,new collections.PricezoneCollection(), successFunction);
		},
		
		displayEngineView : function(derivative) {
			
			var engines = derivative.get('engines');
			if (engines === null) {
				//Util.log('displayEngineView: derivative has no engines ' + derivative.get('name'));
				
				Events.fireEvent(Events.eventList.buildandprice.router.BlockUIEvent);
				var collection = new collections.EngineTransmissionCollection();
				collection.url = Helper.buildURL(collection.urlRoot,this.getPricezoneId(), derivative.id, '', this.userPref);
				var self = this;
				$.when(collection.fetch()).then(function() {
					Helper.postProcessEngines(collection);
					self.updateUserPrice('engine', collection.getSelected());
					derivative.set('engines', collection);
					self.viewManager.displayChildView(views.EngineTransmissionListView, collection);
					self.updateFooter(Constants.state.SELECT_ENGINE);
					Events.fireEvent(Events.eventList.buildandprice.router.UnblockUIEvent);
				}).fail($.proxy(self.navToGenericErrorPage, self));
			} else {
				//Util.log('displayEngineView: derivative ' + derivative.get('name') + ' has engines');
				this.viewManager.displayChildView(views.EngineTransmissionListView, engines);
				this.updateFooter(Constants.state.SELECT_ENGINE);
			}
		},
		
		displayDerivativeDetailView : function(modelId, path, derivativeId) {
			
			var derivativeDetailModel = this.storage.get(Constants.storage.derivativeDetailsModel);
			var galleryCollection = this.storage.get(Constants.storage.galleryCollection);
			var categoryGroupCollection = this.storage.get(Constants.storage.categoryGrpCollection);
			var colorCollection = this.storage.get(Constants.storage.colorCollection);
			derivativeDetailModel.set('showVehicleDisclaimer', (ConfigUtil.showPostcodeSelect() && (path !== Constants.path.pkg)));
			var masterView = this.viewManager.displayParentView(views.DerivativeDetailView, derivativeDetailModel);
			masterView.displayChildView(new views.CategoryGroupHeaderListView({collection : categoryGroupCollection}));
			masterView.displayChildView(new views.GalleryView({collection : galleryCollection}));
			masterView.displayChildView(new views.CategoryGroupBodyListView({collection : categoryGroupCollection}));
			
			categoryGroupCollection.select(categoryGroupCollection.at(0));
			
			masterView.displayChildView(new views.ColorListView({parent : '#cat-group-0', collection : colorCollection}));
			
			var selectedColor = colorCollection.getSelected();
			if (!selectedColor || selectedColor == null) {
				selectedColor = colorCollection.at(0);
			}
			//console.log('displayDerivativeDetailView: isSystem: true');
			Events.fireEvent(Events.eventList.buildandprice.model.ColorChangedEvent.name, {color: selectedColor, isSystem: true});
			derivativeDetailModel.trigger(Events.eventList.buildandprice.router.LoadCompleteEvent);
			this.viewManager.displayTitleView(new models.PageTitleModel(
					{title : (path === Constants.path.pkg) ? Constants.bpt.czpk : Constants.bpt.czm,
					 showLatestOffersBtn: (ConfigUtil.showPostcodeSelect() && (path !== Constants.path.pkg))}));
			this.displayHeadersView(null,path);
			this.updateHeader(Constants.state.CUSTOMIZE_DERIVATIVE, Helper.constructStepUrl.call(this,
					{step: Constants.state.CUSTOMIZE_DERIVATIVE,
					 path: path, 
					 derivativeId : derivativeId,
					 modelId: modelId}));
			this.updateFooter(Constants.state.CUSTOMIZE_DERIVATIVE);
			this.displayFooterView({path: path, derivativeId: derivativeId, step : Constants.state.CUSTOMIZE_DERIVATIVE});
		},
		
		diplayRegionOverlayView : function(collection) {
			this.viewManager.displayIndependantView('PricezoneView',views.PricezoneOverlayView, collection);
		},
			
		updateUserPrice : function(property, object) {
			if (property != 'features') {
				this.userPref.set( property + 'Object', object);
				this.userPref.set( property + 'Id' , object.get('id'));
			} else {
				this.updateUserPriceFeatures(object);
			}
		},
		
		updateUserPriceFeatures: function(object, isSelected) {
			isSelected = (typeof isSelected !== 'undefined') ? isSelected : object.get('selected');
			var features = this.userPref.get(Constants.attr.feats + 'Object');
//			Util.log('updateUserPriceFeatures(isSelected:' + isSelected + ')');
			if (isSelected) {
				//make sure we r not doule adding features
				var existingFeature = features.get(object.get('id'));
				if (existingFeature == null) {
					features.add(object);
//					Util.log('adding feature ' + object.get('name'));
					this.userPref.get(Constants.attr.feats).push(object.get('id'));
				}
			} else {
				var featureIds = this.userPref.get(Constants.attr.feats);
//				Util.log('removing feature ' + object.get('name'));
				//+
//						' featureIds: ' + featureIds +
//						', id of feature to remove ' + object.get('id'));
				features.remove(object);
				
				var i = _.indexOf(featureIds, object.get('id'));
				if (i >= 0) {
//					var slicedFeatures =
					featureIds.splice(i, 1);
//					console.log('removing from featureIds ' + slicedFeatures);
					this.userPref.set(Constants.attr.feats,featureIds);
				}
			}
			this.userPref.set(Constants.attr.feats + 'Object', features);
		},
		
		updatePricezoneForUserObject: function(pricezone) {
			this.userPref.set('priceZoneId', pricezone.get('id'));
			this.userPref.set('site', Config.site);
		},
		
		getPricezoneId: function() {
			var pricezoneId = this.userPref.get('priceZoneId');
			if (!pricezoneId || pricezoneId == null) {
				pricezoneId = Config.priceZoneId;
			}
			return pricezoneId;
		},
	
		/*****************************model manager **********************/
		
		/**
		 * Loads a FRESH copy of the data from the server and returns when server replies.
		 * @param modelName
		 * @param modelClass
		 * @returns none
		 */
		deferredFetchAndPersist: function(modelName, modelClass) {
			var deferred = $.Deferred();
				var model = modelClass;
				var self = this;
				
				$.when(model.fetch())
				.done(function() {
						self.storage.set(modelName,model);
						
						deferred.resolve();
					})
				.fail($.proxy(self.navToGenericErrorPage, self));
			return deferred.promise();
		},
		
		fetchModel: function(modelName, modelClass, successCallback) {
			var model = modelClass;
			var self = this;
			var cachedModel = self.storage.get(modelName);
			if (!cachedModel || (cachedModel == null) || (cachedModel.url != model.url)) {
				
				$.when(model.fetch())
				.done(function() {
						self.storage.set(modelName, model); 
						successCallback(model);
						
				 })
				 .fail($.proxy(self.navToGenericErrorPage, self));
			} else  {
				successCallback(cachedModel);
			}
		},
		
		
		updateFooter: function(step) {
			var footer = this.storage.get(Constants.storage.footerModel);
			var models = this.storage.get(Constants.storage.nameplateCollection);
			var engines = null;
			var price = ND.PriceFormatter.format('0');
			var path;
			this.getSelectedPackageDerivative(
				this.storage,{
				pkgCallback:function(pkg) {
					path = Constants.path.pkg;
				}, 
				drvCallback: function(drv) {
					engines = drv.get('engines');
					path = Constants.path.drv;
				}
				});
			price = ND.PriceFormatter.format(this.userPref.total().toString());
			
			var selectedEngine = null, 
			selectedModel = models.getSelected();
			var engineName = '';
			var nextButtonPath = '';
			var engineSelected = false;
			var vehicleName = '';
			var selectedPathValue;
			var modelId = selectedModel.get('id');
	//		Util.log('updateFooter: ' + step);
			switch(step) {
				case Constants.state.SELECT_ENGINE:
					if (engines && engines != null) {
						selectedEngine = engines.getSelected();
						engineSelected = selectedEngine != null;
						if (engineSelected) {
							engineName = selectedEngine.get('name');
						}
					}
					//NO break;
				case Constants.state.SELECT_DERIVATIVE: 
				case Constants.state.SELECT_PACKAGE: 
					var self = this;
					this.getSelectedPackageDerivative(
						this.storage,{
						pkgCallback: function(pkg) {
							nextButtonPath = Helper.constructStepUrl.call(self,
																		 {step: Constants.state.CUSTOMIZE_DERIVATIVE, 
																		  path: Constants.path.pkg, 
																		  derivativeId : pkg.get('id'),
																		  modelId : modelId});
							engineName = pkg.get('engineTransmission');
							engineSelected = true;
							//price has to match the selected package and need to say from x price
							price = Constants.bpt.f + pkg.get('displayPrice');
							vehicleName = pkg.get('name');
						}, 
						drvCallback : function(drv) {
							nextButtonPath = Helper.constructStepUrl.call(self,
																		 {step: Constants.state.CUSTOMIZE_DERIVATIVE, 
								 										  path: Constants.path.drv, 
								 										  derivativeId : drv.get('id'),
																		  modelId : modelId});
							vehicleName = drv.get('name');
							//price has to match the selected derivative and need to say from x price
							if (engineSelected) {
								price = Constants.bpt.f + ND.PriceFormatter.format(selectedEngine.get('price').toString());
							} else {
								price = Constants.bpt.f + drv.get('displayPrice');
							}
						}
					});
					var prevPageLabel = null;
					var prevButtonPath = null;
					if (!ConfigUtil.isShortPath()) {
						prevPageLabel = 'bpt-path-sel';
						prevButtonPath = Helper.constructStepUrl.call(self,{step: Constants.state.SELECT_PATH, modelId: modelId});
					}
	//				Util.log('prevButtonPath: ' + prevButtonPath + ' prevPageLabel:' + prevPageLabel);
					footer.update(vehicleName,
							  price,
							  engineName,
							  engineSelected,
							  nextButtonPath,
							  prevButtonPath,
							  Constants.header.c, 
							  prevPageLabel);
					break;	
				case Constants.state.CUSTOMIZE_DERIVATIVE: 
				case Constants.state.SUMMARY:	
					var selectedDerivative,	isEngineSelected = false,nextTabLabel = null,
						prevTabLabel = null,nextTabHref = null,prevTabHref = null;
					selectedPathValue = Constants.path.pkg;
					prevTabLabel = 'bpt-package-sel';
					this.getSelectedPackageDerivative(
							this.storage,{
							pkgCallback: function(pkg) {
								isEngineSelected = true;
								selectedDerivative = pkg;
								engineName = selectedDerivative.get('engineTransmission');
							}, 
							drvCallback: function(drv) {
								selectedPathValue = Constants.path.drv;
								var selectedEngine = engines.getSelected();
								isEngineSelected = (selectedEngine != null);
								selectedDerivative = drv;
								prevTabLabel = 'bpt-derivative-sel';
								engineName = isEngineSelected ? selectedEngine.get('name') : '';
							}
						});
					
					var categoryGroups = this.storage.get(Constants.storage.categoryGrpCollection);
					
    				//console.log(categoryGroups);
					//categoryGroups = _.without(categoryGroups.models, _.findWhere(categoryGroups.models, {"attributes": "hideInBuildPrice"}));
					//var test =_.where(categoryGroups, {"attributes":{"hideInBuildPrice":"Yes"}});
					if (step === Constants.state.CUSTOMIZE_DERIVATIVE) {
						var currentTab = parseInt(categoryGroups.getSelected().get('order'));
						
						var nextTab = null;
						var prevTab = null;
						if ((currentTab + 1) < categoryGroups.length) {
							nextTab = (currentTab + 1);
								if(categoryGroups.at(nextTab).get('hideInBuildPrice') == "Yes"){
									if(!(typeof categoryGroups.at(nextTab + 1) === "undefined")){
										nextTabLabel = categoryGroups.at(nextTab + 1).get('categoryGrouping');
										nextTabHref = 'cat-group-' + (nextTab + 1);
									} else {
										nextTabHref = Helper.constructStepUrl.call(this,
										{step: Constants.state.SUMMARY,
										path: selectedPathValue,
										derivativeId: selectedDerivative.get('id'),
										modelId: modelId});
										nextTabLabel = 'bpt-summary';
									}
								} else {
									nextTabLabel = categoryGroups.at(nextTab).get('categoryGrouping');
									nextTabHref = 'cat-group-' + nextTab;
								}
							
						} else {
							nextTabHref = Helper.constructStepUrl.call(this,
										{step: Constants.state.SUMMARY,
										path: selectedPathValue,
										derivativeId: selectedDerivative.get('id'),
										modelId: modelId});
							nextTabLabel = 'bpt-summary';
						}
						
						if ((currentTab - 1) >= 0) {
							prevTab = (currentTab - 1);
							if(categoryGroups.at(prevTab).get('hideInBuildPrice') == "Yes"){
								prevTabLabel = categoryGroups.at((prevTab - 1)).get('categoryGrouping');
								prevTabHref = 'cat-group-' + (prevTab - 1);
							} else {
								prevTabLabel = categoryGroups.at(prevTab).get('categoryGrouping');
								prevTabHref = 'cat-group-' + prevTab;
							}
						} else {
							prevTabHref = Helper.constructStepUrl.call(this,
									{step: Constants.state.SELECT_PACKAGE, 
									 path: selectedPathValue,
									 modelId: modelId});
									
						}
					} else { //Constants.state.SUMMARY
						prevTabLabel = categoryGroups.at(0).get('categoryGrouping');
						prevTabHref = Helper.constructStepUrl.call(this,
								{step: Constants.state.CUSTOMIZE_DERIVATIVE, 
								 path: selectedPathValue, 
								 derivativeId : selectedDerivative.get('id'),
								 modelId: modelId});
						if (ConfigUtil.showPostcodeSelect() && Constants.path.drv === path) {
							price = this.userPref.get('polkPrice');
							//console.log('polkPrice in userPref is ' + price);
						};
					}
						
					footer.update(selectedDerivative.get('name'),
						  price,
						  engineName,
						  isEngineSelected,
						  nextTabHref,
						  prevTabHref,
						  nextTabLabel,
						  prevTabLabel);
					break;
				case Constants.state.SELECT_PATH:
					break;
				default : 
					//console.log('unknown step ' + step);
			}
		},
	
		selectTrim : function(trim) {
			var colorCollection = this.storage.get(Constants.storage.colorCollection);
			colorCollection.selectTrim(trim);
			
			this.updateUserPrice('trim', trim);
			
			this.updateFooter(Constants.state.CUSTOMIZE_DERIVATIVE);
		},

		selectColor: function(data) {
			var colorCollection = this.storage.get(Constants.storage.colorCollection);
			var trimView = new views.TrimListView({collection : data.color.get('trims')});
			trimView.display();
			colorCollection.select(data.color);
			var selectedTrim = data.color.get('trims').getSelected();
			if (typeof selectedTrim === 'undefined' || selectedTrim == null) {
				selectedTrim = data.color.get('trims').at(0);
			}
			this.updateUserPrice('colour', data.color);
			//changing trim as part of selecting colour is always considered a system event, pass true to avoid
			//calling omniture
			Events.fireEvent(Events.eventList.buildandprice.model.TrimSelectedEvent.name, {trim: selectedTrim, isSystem : true});
			this.updateFooter(Constants.state.CUSTOMIZE_DERIVATIVE);
		},
		
		toggleOptionPackSelection: function(model, isPartOfAnotherAccessory, isSelectedByParent) {
			var isSelected;
			if (!isPartOfAnotherAccessory) {
				isSelected = !model.get('selected');
				model.set('selected', isSelected);
				//now that prices of feature groups have been removed add price of option pack to total price.
				this.updateUserPriceFeatures(model);
				//update the gallery
				this.updateFeatureInGallery(model, false);
			} else if (typeof isSelectedByParent !== 'undefined'){
				isSelected = isSelectedByParent; //model is already uptodate, do not modify
			}
			
			var fgAttr = model.get('featureGroupAttributes');
			if (fgAttr != null && fgAttr.length > 0) {
				var categoryGroupCollection = this.storage.get(Constants.storage.categoryGrpCollection);
				var message = isSelected ? Constants.bpt.featurePartOfOptionPack : '';
				//pass null for select to preserve previous value of the feature.
				var selectedFeatureGroups = 
					categoryGroupCollection.toggleFeatures(fgAttr.pluck('id'), null, isSelected);
				_.each(selectedFeatureGroups, function(selectedFeatureGroup) {
					var isOptionPackDeselectedAndFeatureSelected = !isSelected && selectedFeatureGroup.get('selected');
					//Two conditions:
					//1- When option is selected, we must pass false as we DO NOT want the price of featureGroupAttributes in Option pack
					//only price of option pack is calculated.
					//2- When option is not selected, if featureGroupAttribute was previously selected, add its value back to total value
					this.updateUserPriceFeatures(selectedFeatureGroup, isOptionPackDeselectedAndFeatureSelected);
					
					//update the gallery, pass false to hide these features from the gallery
					this.updateFeatureInGallery(selectedFeatureGroup, isSelected ? false : selectedFeatureGroup.get('selected'));
					selectedFeatureGroup.set('message', message);
					//console.log('toggleOptionPackSelection -> ' + selectedFeatureGroup.get('name') + ' message = ' + message);
					
					if (selectedFeatureGroup.get('isMutuallyExclusive')) {
						this.toggleMutuallyExclusiveFeatureSelection(selectedFeatureGroup,true,isSelected || selectedFeatureGroup.get('selected'));
					} else if (selectedFeatureGroup.get('hasDependentFeatures')) {
						//this feature is only have a parent when option pack is selected
						this.toggleDependentFeatureSelection(selectedFeatureGroup, true, isSelected || selectedFeatureGroup.get('selected'), isSelected);
					}
				}, this);
			}
			/*
			 * Option packs dependent features can ONLY be other Option packs 
			 * 
			 */
			if (model.get('hasDependentFeatures')) {
				var fgAttrIds = model.get('dependentFeaturesIds');
				if (fgAttrIds != null && fgAttrIds.length > 0) {
					//find dependent features of option pack and select them
					var categoryGroupCollection = this.storage.get(Constants.storage.categoryGrpCollection);
					var optionPacksDependentFeatures = 
						categoryGroupCollection.fetchFeatures(fgAttrIds);
					
					var message = isSelected ? Constants.bpt.featurePartOfDependentFeature : '';
					
					_.each(optionPacksDependentFeatures, function(optionPacksDependentFeature) {
						
						if (optionPacksDependentFeature.get('isOptionPack')) {
							//this.toggleOptionPackSelection(model, true);
							//optionPacksDependentFeatureIds.push(optionPacksDependentFeature.get('id'));
							
//							if (optionPacksDependentFeatureIds.length > 0) {
								var selectedOptionPacksDependentFeatures = 
									categoryGroupCollection.toggleFeatures(new Array(optionPacksDependentFeature.get('id')), null, isSelected);
								_.each(selectedOptionPacksDependentFeatures, function(selectedOptionPacksDependentFeature) {
									
									this.updateUserPriceFeatures(optionPacksDependentFeature, isSelected);
//									//update the gallery
									this.updateFeatureInGallery(optionPacksDependentFeature, isSelected);
									
									optionPacksDependentFeature.set('message', message);
									//console.log('toggleOptionPackSelection -> ' + optionPacksDependentFeature.get('name') + ' message = ' + message);
									
									if (!isSelected && selectedOptionPacksDependentFeature.get('selected')) {
										selectedOptionPacksDependentFeature.set('selected', false, {silent: true});
										this.toggleOptionPackSelection(selectedOptionPacksDependentFeature, false);
									} else {
										this.toggleOptionPackSelection(selectedOptionPacksDependentFeature, true, isSelected);
									}
								}, this);
//							}
							
							
						} else {
							window.alert('Unsupported publishing configuration: Dependent Features of Option pack' + 
									model.get('id') + ' Can only be other option packs, '
									+ optionPacksDependentFeature.get('id') + ' is not an option pack');
						}
					}, this);
				}
			}
		},
		/**
		 * 
		 * @param model
		 * @param isPartOfAnotherAccessory
		 * @param isParentSelectedOrWasSelected a feature might not be truly selected (selected flag has not been set to preserve previous state), but
		 *  it is selected as part of its parent. 
		 */
		toggleDependentFeatureSelection: function(model, isPartOfAnotherAccessory, isParentSelectedOrWasSelected, isParentSelected) {
			var isSelected;
			if (!isPartOfAnotherAccessory) {
				isSelected = !model.get('selected');
				model.set('selected', isSelected);
				//now that prices of feature groups have been removed add price of option pack to total price.
				this.updateUserPriceFeatures(model, isSelected);
				//update the gallery
				this.updateFeatureInGallery(model, isSelected);
				isParentSelected = isSelected;
			} else if (typeof isSelectedByParent !== 'undefined') {
				isSelected = isParentSelectedOrWasSelected;
			} 
			
			var fgAttrIds = model.get('dependentFeaturesIds');
			if (fgAttrIds != null && fgAttrIds.length > 0) {
				var categoryGroupCollection = this.storage.get(Constants.storage.categoryGrpCollection);
				//according to the requirements mutual exclusive features are all mutual
				//i.e. if A is MX with B and C, B is MX with C and A, C is MX with A and B.
				//but the publisher may make a mistake.
				var selectedDependentFeatures = categoryGroupCollection.fetchFeatures(fgAttrIds);
				_.each(selectedDependentFeatures, function(selectedDependentFeature) {
						selectedDependentFeature.set('dependentFeatureLockCount', 
								selectedDependentFeature.get('dependentFeatureLockCount') + (isParentSelected ? 1 : -1) );
//						Util.log('Parent Feature ' + model.get('name') +
//								' updated the lock for ' + 
//								selectedDependentFeature.get('name') + 
//								' to ' + selectedDependentFeature.get('dependentFeatureLockCount'));
					
					selectedDependentFeature.set('message', 
							(!isParentSelectedOrWasSelected && 
							selectedDependentFeature.get('dependentFeatureLockCount') === 0) ?
							'' : 
							Constants.bpt.featurePartOfDependentFeature);
					
					//console.log('toggleDependentFeatureSelection -> ' + selectedDependentFeature.get('name') + ' message = ' + selectedDependentFeature.get('message'));
				});
				
				selectedDependentFeatures = 
					categoryGroupCollection.toggleFeatures(fgAttrIds, null, isSelected);
				
				_.each(selectedDependentFeatures, function(selectedDependentFeature) {
					
					if (selectedDependentFeature.get('hasDependentFeatures')) {
						window.alert('Unsupported publishing configuration: Feature ' + 
								selectedDependentFeature.get('id') +
								' is a dependent features. Cascading dependent features are not supported.');
					}
					
					
					//Util.log(selectedDependentFeature.get('name') + ' has ' + selectedDependentFeature.get('dependentFeatureLockCount') + ' locks');
					//if parent feature is selected, add the child to the total price
					//otherwise see if it was previously selected, if so add it to the price
					this.updateUserPriceFeatures(selectedDependentFeature, isSelected || selectedDependentFeature.get('selected'));
					//if parent feature is selected, display the child
					//otherwise see if it was previously selected, if so display the child
					this.updateFeatureInGallery(selectedDependentFeature, isSelected || selectedDependentFeature.get('selected'));
					
				}, this);
			}
		},
		
		toggleMutuallyExclusiveFeatureSelection: function(model, isPartOfAnotherAccessory, isSelectedByParent) {
			var isSelected;
			if (!isPartOfAnotherAccessory) {
				isSelected = !model.get('selected');
				model.set('selected', isSelected);
				//now that prices of feature groups have been removed add price of option pack to total price.
				this.updateUserPriceFeatures(model,isSelected);
				//update the gallery
				this.updateFeatureInGallery(model,isSelected);
			} else if (typeof isSelectedByParent !== 'undefined'){
				isSelected = isSelectedByParent; //model is already uptodate, do not modify
			}
			
			if (!isSelectedByParent && !isPartOfAnotherAccessory && isSelected) {
				model.set('message', '');
			}
			var fgAttr = model.get('featureGroupAttributes');
			if (fgAttr != null && fgAttr.length > 0) {
				var categoryGroupCollection = this.storage.get(Constants.storage.categoryGrpCollection);
				//according to the requirements mutual exclusive features are all mutual
				//i.e. if A is MX with B and C, B is MX with C and A, C is MX with A and B.
				//but the publisher may make a mistake.
								
				var selectedFeatureGroups = 
					categoryGroupCollection.toggleFeatures(fgAttr.pluck('id'), null, isSelected);
				var message = isSelected ? Constants.bpt.featurePartOfMutualExclusive : '', 
					selectedFeatureGroup;
				
				
				for(var i = 0; i < selectedFeatureGroups.length; i++) {
					selectedFeatureGroup = selectedFeatureGroups[i];
					
					if (isPartOfAnotherAccessory && !isSelected && selectedFeatureGroup.get('selected')) {
						selectedFeatureGroup.set('selected', false, {silent: true});
						this.toggleMutuallyExclusiveFeatureSelection(selectedFeatureGroup, false);
						return;
					}
					
					
					//while we are keeping the state of the features, we should remove them from userPref storage
					//to ensure price is up to date.
					this.updateUserPriceFeatures(selectedFeatureGroup, false);
					//update the gallery, pass false to hide these features from the gallery
					this.updateFeatureInGallery(selectedFeatureGroup, false);
					
					if (selectedFeatureGroup.get('hasDependentFeatures')) {
						window.alert('Unsupported publishing configuration: Feature ' + 
								selectedFeatureGroup.get('id') +
								' is mutually exclusive and has dependent features. This tool does not support this combination.');
					} else if (selectedFeatureGroup.get('isOptionPack')) {
						window.alert('Unsupported publishing configuration: Feature ' + 
								selectedFeatureGroup.get('id') +
								' is mutually exclusive and is an option pack. This tool does not support this combination.');
					}
					//console.log('feature ID: ' + selectedFeatureGroup.id + ' feature name ' + selectedFeatureGroup.get('name'));
					selectedFeatureGroup.set('message', message);
					
				}
				
			}
			
		},
		
		toggleFeatureSelection: function(model) {
			model.set({'selected': !model.get('selected'), 'message' : ''});
			this.updateUserPriceFeatures(model);
			this.updateFeatureInGallery(model);
		},
		
		updateFeatureInGallery: function(model, isShown) {
			var view = Helper.getCurrentCarView(this.storage);
			//only switch to an exterior view when on interior view and feature is selected 
			if (view !== Constants.view.exterior) {
				if (model.get('spriteUrl') != '' && (typeof isShown !== 'undefined' ? isShown : true)) {
					Events.fireEvent(Events.eventList.buildandprice.model.ToggleViewEvent.name,Constants.view.exterior);
				} 
			} else {
				var gallery = this.storage.get(Constants.storage.galleryCollection);
//					if (selectedFeatureGroups != null && selectedFeatureGroups.length > 0) {
//						_.each(selectedFeatureGroups, function(selectedFeatureGroup) {
//							//pass true into toggleLayer to hide any accessory being displayed
//							//we do not want to show accesories if an option pack /mutual exclusive feature is selected
//							gallery.toggleLayer(selectedFeatureGroup.get('id'), true);
//						});
//					} else {
				gallery.toggleLayer(model.get('id'), isShown);
//					}
			}
		},
	
		clearStorageForStep : function(step) {
			//Util.log('clearStorageForStep: ' + step);
			switch(step) {
			
				case Constants.state.SELECT_NAMEPLATE:
					this.unvisitHeaders(step);
					this.userPref.purge();
					break;
				case Constants.state.SELECT_PATH:
					var storage = this.storage;
					storage.set(Constants.storage.derivativeDetailsModel, null);
					storage.set(Constants.storage.categoryGrpCollection, null);
					storage.set(Constants.storage.headerCollection, null);
					storage.set(Constants.storage.derivativeCollection, null);
					storage.set(Constants.storage.packageCollection, null);
					storage.set(Constants.storage.colorCollection, null);
					storage.set(Constants.storage.footerModel, null);
					storage.set(Constants.storage.galleryCollection, null);
					this.userPref.purge();
					break;
				case Constants.state.SELECT_DERIVATIVE:
				case Constants.state.SELECT_PACKAGE:
					this.unvisitHeaders(step);
					break;
				case Constants.state.CUSTOMIZE_DERIVATIVE:
					this.userPref.set({
						featuresObject: new collections.FeatureCollection(),
						features: new Array()
					});
					break;
			}
		},
	
		getSelectedPackageDerivative : function(storage, callbacks) {
			var pkgPath = drvPath = false, selectedPackage,selectedDerivative;
			var packages = storage.get(Constants.storage.packageCollection);
			if (ConfigUtil.isShortPath()) {
				selectedPackage = packages.getSelected();
				pkgPath = (selectedPackage != null);
			} else {
				var paths = storage.get(Constants.storage.pathCollection);
				var selectedPath = paths.getSelected();
				if (typeof selectedPath !== 'undefined' && selectedPath != null) {
					if (selectedPath.get('key') === Constants.path.pkg) {
						selectedPackage = packages ? packages.getSelected() : null;
						pkgPath = (selectedPackage != null);
					} else {//derivative
						var derivatives = storage.get(Constants.storage.derivativeCollection);
						selectedDerivative = derivatives ? derivatives.getSelected() : null;
						drvPath = (selectedDerivative != null);
					}
				}
			}
			if (typeof callbacks !== 'undefined') {
				if (pkgPath && typeof callbacks.pkgCallback !== 'undefined') {
					callbacks.pkgCallback.call(null,selectedPackage);
				} else if (drvPath && typeof callbacks.drvCallback !== 'undefined') {
					callbacks.drvCallback.call(null,selectedDerivative);
				}
			}
		}
		
	});
	
	
	
	/******************************END OF EVENTS***********************/
	
	
	$(document).ready(function() {
		if ($('body').hasClass('shoppingtool')) {
			window.BuildAndPriceApp = new BuildAndPriceApp();
			if (ND.analyticsTag.isSinglePageAppOmnitureConfigured()) {
				var bpAnalytics = new BPAnalytics();
			}
			Backbone.history.start(); 
		}
	});
})(window, document, Views.Buildandprice, models, collections, jQuery);