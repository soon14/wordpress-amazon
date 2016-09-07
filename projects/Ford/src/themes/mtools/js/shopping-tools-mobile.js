/**
 * 
 */
(function(window,document, views, models, collections, $){
	
	
	var MobileBuildAndPriceApp = Backbone.Router.extend({
		
//		storage: null,
//		user : null,
//		price : null,
		
		routes: { 
		   
		    "load/:uuid" : "loadConfigAndNavToSummaryPage",
		    ":modelId/next" : "navToDecisionPage",
//		    "error" : "navToErrorPage",
		    "reset" : 'navToResetPage' //used to reset the tool 
		},
		
		initialize: function(options) {
			
			//Util.log('MobileBuildAndPriceApp.initialize()');
			this.configureRoutes();
//			this.storage = new models.Storage();
			this.registerEventListeners();
			this.dataLoader = BnP.DataLoader();
			this.viewManager = views.MasterView();
			this.modules = [];
			this.setupOnError();
			//if pricezone and postcode have been disabled, hide prices 
			if (!ConfigUtil.showPrices()) {
				Events.fireEvent(Events.eventList.buildandprice.router.HidePricesEvent, true);
				Events.fireEvent(Events.eventList.buildandprice.router.HideHotDealPricesEvent);
			} 
//			
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
			this.route(":modelId/" + Constants.path.pth + '/' + Constants.path.pkg, "navToPackagesPage");				
			this.route(":modelId/" + Constants.path.pth,"navToPathsPage");
			if(!ConfigUtil.isShortPath()){
				this.route(":modelId/" + Constants.path.pth + '/' + Constants.path.drv, "navToDerivativesPage");
				this.route(":modelId/" + Constants.path.pth + '/' + Constants.path.drv + '/:derivativeId/engine', "navToEnginesPage");
			}
			this.route(":modelId/" + Constants.path.pth + '/:pathId/:derivativeId/engine/:engineId/customize/colors', "navToCustomizeDerivativePage");
			this.route(":modelId/" + Constants.path.pth + '/:pathId/:derivativeId/engine/:engineId/customize/accessories/:step', 'navToAccessoryPage');
			this.route(":modelId/" + Constants.path.pth + '/:pathId/:derivativeId/engine/:engineId/summary', "navToSummaryPage");
		},
		
		registerEventListeners : function() {
			Events.eventBus.context = this;
			//Events.eventBus.context = this;
			
			Events.bind(Events.eventList.buildandprice.model.ChangePostcodeOrPricezoneEvent.name,
					Events.eventList.buildandprice.model.ChangePostcodeOrPricezoneEvent.handler, this);
			
			if (ConfigUtil.showPricezones()) {
				Events.bind(Events.eventList.buildandprice.model.PricezoneSelectedEvent.name, 
						Events.eventList.buildandprice.model.PricezoneSelectedEvent.handler, this);
				
				Events.bind(Events.eventList.buildandprice.model.PricezoneChangeRequestEvent.name, 
						Events.eventList.buildandprice.model.PricezoneChangeRequestEvent.handler, this);
						
				Events.bind(Events.eventList.buildandprice.model.PricezoneCheckRequestEvent.name, 
						Events.eventList.buildandprice.model.PricezoneCheckRequestEvent.handler, this);
			}

			
			Events.bind(Events.eventList.buildandprice.model.StartOverEvent.name,
					Events.eventList.buildandprice.model.StartOverEvent.handler, this);
			
			Events.bind(Events.eventList.buildandprice.model.ToggleViewEvent.name, 
					Events.eventList.buildandprice.model.ToggleViewEvent.handler, this);
			
			Events.bind(Events.eventList.buildandprice.model.TabChangedEvent.name, 
					Events.eventList.buildandprice.model.TabChangedEvent.handler, this);
			
			Events.bind(Events.eventList.buildandprice.view.SubTabChangedEvent, 
					Events.eventList.buildandprice.model.SubTabChangedEvent.handler, this);
			
			Events.bind(Events.eventList.buildandprice.model.TabChangeRequestEvent.name, 
					Events.eventList.buildandprice.model.TabChangeRequestEvent.handler, this);
			
			Events.bind(Events.eventList.buildandprice.model.StepChangeRequestEvent.name,
					Events.eventList.buildandprice.model.StepChangeRequestEvent.handler, this);
			
			Events.bind(Events.eventList.buildandprice.model.StepChangeHeaderRequestEvent.name,
					Events.eventList.buildandprice.model.StepChangeHeaderRequestEvent.handler, this);
			
			Events.bind(Events.eventList.buildandprice.model.PackageSelectedEvent.name, 
					Events.eventList.buildandprice.model.PackageSelectedEvent.handler, this);

			Events.bind(Events.eventList.buildandprice.model.StartAllModulesEvent.name, 
					Events.eventList.buildandprice.model.StartAllModulesEvent.handler, this);
			
			if (ConfigUtil.showPostcodeSelect()) {
				Events.bind(Events.eventList.buildandprice.view.RegionPostcodeChangeRequestEvent, 
					Events.eventList.buildandprice.model.RegionPostcodeChangeRequestEvent.handler, this);
			}
			
			Events.bind(Events.eventList.buildandprice.model.RestoreCompleteEvent.name, 
					Events.eventList.buildandprice.model.RestoreCompleteEvent.handler, this);
			
			Events.bind(Events.eventList.buildandprice.model.ErrorOccuredEvent.name, 
					Events.eventList.buildandprice.model.ErrorOccuredEvent.handler, this);
			
			Events.bind(Events.eventList.buildandprice.view.PrevPageRequestedEvent, 
					Events.eventList.buildandprice.model.PrevPageRequestedEvent.handler, this);
			
			
			
//			Events.bind(Events.eventList.buildandprice.model.OrientationChangedEvent.name, 
//					Events.eventList.buildandprice.model.OrientationChangedEvent.handler, this);
			
//			Events.bind(Events.eventList.buildandprice.model.HotDealSelectedEvent.name, 
//					Events.eventList.buildandprice.model.HotDealSelectedEvent.handler, this);
		},

		/**
		 * Hard reset on all feeds. 
		 */
		navToResetPage : function() {
			this.navToNameplatesPage();
			this.navigate('',{trigger:false,replace:true});
			//this.navigate('', {trigger: true, replace: true});
		},
	
		navToNameplatesPage : function() {
			if (typeof this.modules['nameplates'] === 'undefined') {
				var module = new BnP.NameplateModule(this.dataLoader, this.viewManager, {navigate: this.navigate});
				this.modules['nameplates'] = module.registerEvents();
			}
			
			this.modules['nameplates'].go();
		},
		
		navToDecisionPage : function(modelId) {
			var nextPage =  '#'  + modelId + '/' + Constants.path.pth ;
			if (ConfigUtil.isShortPath()) { //packages only in shortpath
				nextPage += '/' + Constants.path.pkg;
				// nextPage =  '#'  + modelId + '/' + Constants.path.pkg;
			}
			else if(!BnP.CommonHelper.showPathStep()){
				nextPage += '/' + Constants.path.drv;
			}
//			Util.log('nextPageURL: ' + nextPage);
			this.navigate(nextPage, {trigger: true, replace: true});
		},
		
		navToPathsPage : function(modelId) {
			var pathsModuleId = 'paths', 
				options = {modelId: modelId,
						   navigate: this.navigate};
			if (typeof this.modules[pathsModuleId] === 'undefined') {
				var module = new BnP.PathModule(this.dataLoader, this.viewManager,options); 
				this.modules[pathsModuleId] = module.registerEvents();
			} else {
				this.modules[pathsModuleId].updateOptions(options);
			}
			this.modules[pathsModuleId].go();
		},
		
		navToDerivativesPage : function(modelId, derivativeId) {
			var moduleId = 'derivatives', 
				options = {modelId: modelId,
						  path: Constants.path.drv,
						  derivativeId: derivativeId,
						  navigate: this.navigate};
			if (typeof this.modules[moduleId] === 'undefined') {
				var module = new BnP.DerivativeModule(this.dataLoader, this.viewManager, options); 
				this.modules[moduleId] = module.registerEvents();
			} else {
				this.modules[moduleId].updateOptions(options);
			}
			this.modules[moduleId].go();
		},
		
		navToEnginesPage: function(modelId, derivativeId) {
			var moduleId = 'engines', 
				options = {modelId: modelId, 
					  derivativeId: derivativeId,
					  path: Constants.path.drv,
					  navigate: this.navigate};
			if (typeof this.modules[moduleId] === 'undefined') {
				var module = new BnP.EngineModule(this.dataLoader, this.viewManager, options); 
				this.modules[moduleId] = module.registerEvents();
			} else {
				this.modules[moduleId].updateOptions(options);
			}
			this.modules[moduleId].go();
		},
		
		navToSelectDrivativePage: function(modelId, derivativeId) {
//			Util.log('navToSelectDrivativePage');
			this.navToDerivativesPage(modelId, derivativeId);
		},
		
		navToCustomizeDerivativePage : function(modelId, path, derivativeId, engineId) {
			var moduleId = 'customize', 
				options = {modelId: modelId,
						   derivativeId: derivativeId,
						   path: path,
						   engineId: engineId};

			if (typeof this.modules[moduleId] === 'undefined') {
				var module = new BnP.ColorModule(this.dataLoader, this.viewManager, options); 
				this.modules[moduleId] = module.registerEvents();
			} else {
				this.modules[moduleId].updateOptions(options);
			}
			this.modules[moduleId].go();
		},
		
		registerAccessoryPageModule : function(modelId, path, derivativeId, engineId, categoryId) {
			var categoryModuleId = 'accessories';
			var isModuleCreated = false;
			var options = {
					modelId: modelId, path: Constants.path.drv, derivativeId: derivativeId,
					path: path,
					engineId: engineId, step: categoryId
			};
			if (typeof this.modules[categoryModuleId] === 'undefined') {
				//console.log('create AccessoriesModule');
				var module = new BnP.AccessoriesModule(this.dataLoader, this.viewManager, options);
				this.modules[categoryModuleId] = module.registerEvents();
				isModuleCreated = true;
			}
			return {isModuleCreated : isModuleCreated, options: options};
		},
		
		navToAccessoryPage: function(modelId, path, derivativeId, engineId, categoryId) {
			var categoryModuleId = 'accessories';
			var result = this.registerAccessoryPageModule(modelId, path, derivativeId, engineId, categoryId);
			if (!result.isModuleCreated) {
				//console.log('updating Options');
				this.modules[categoryModuleId].updateOptions(result.options);
			}
			this.modules[categoryModuleId].go();	
		},
	
		navToSummaryPage : function(modelId, path, derivativeId, engineId, isLoadingConfig, showPricesLater) {
			var moduleId = 'summary', 
				options = {
						modelId: modelId, path: path, derivativeId: derivativeId, engineId: engineId, 
						isLoadingConfig: isLoadingConfig, showPricesLater: showPricesLater
					};
			if (typeof this.modules[moduleId] === 'undefined') {
				var module = new BnP.SummaryModule(this.dataLoader, this.viewManager, options);
				this.modules[moduleId] = module.registerEvents();
			} else {
				this.modules[moduleId].updateOptions(options);
			}
			this.modules[moduleId].go();	
			
			//displaySummaryView will unblock UI
		},
		
		loadConfigAndNavToSummaryPage: function(uuid) {
			//for this scenario, we first need to make sure all modules are registered, up and running
			//otherwise if any event is fired, no one will pick it up.
			var moduleId = 'restore';
			if (typeof this.modules[moduleId] === 'undefined') {
				var module = new BnP.RestoreModule(this.dataLoader, this.viewManager, {
					uuid: uuid,
					navigate:this.navigate
				});
				this.modules[moduleId] = module.registerEvents();
			}
			this.modules[moduleId].go();	
		},
		
		navToErrorPage : function(data) {
			this.viewManager.page().error(this.dataLoader.error(data)).go();
			Events.fireEvent(Events.eventList.buildandprice.router.UnblockUIEvent);
		},
		

		navToPackagesPage: function(modelId, packageId) {
			var moduleId = 'packages', 
				options = {modelId: modelId,
						  path: Constants.path.pkg,
						  derivativeId: packageId, 
						  navigate: this.navigate};
			if (typeof this.modules[moduleId] === 'undefined') {
				var module = new BnP.PackagesModule(this.dataLoader, this.viewManager, options); 
				this.modules[moduleId] = module.registerEvents();
			} else {
				this.modules[moduleId].updateOptions(options);
			}
			this.modules[moduleId].go();
			
		},
		
		navToSelectPackagePage: function(modelId, packageId) {
//			Util.log('navToSelectPackagePage');
//			this.navToPackagesPage(modelId, packageId);
		},
		
		selectPackage: function(pkgColResult, packageId) {
//			if (packageId && packageId != null) {
//				var model = pkgColResult.get(packageId);
//				Events.fireEvent(Events.eventList.buildandprice.model.PackageSelectedEvent.name, model);
//			}
		}

	});
		

	
	$(document).ready(function() {
		//console.log('b&p document ready');
		setTimeout(function() {
			
			if (ConfigUtil.showPrices()) {
				ND.shoppingPreferenceManager();
				ND.CalcPrice.init();
			}
			
			var app = new MobileBuildAndPriceApp();
			if (ND.analyticsTag.isSinglePageAppOmnitureConfigured()) {
				var bpAnalytics = new BPAnalytics();
			}

			$(document).on('pagechange',function(e){
				Events.fireEvent(Events.eventList.buildandprice.model.PricezoneCheckRequestEvent.name);
			});

			Backbone.history.start();
		}, 500);
		
	});



})(window, document, BnP.Views, models, collections, jQuery);