/**
 * 
 */
var BnP = BnP || {};

/*******************************START OF DATA LOADER*********************/
BnP.PackagesModule = function(dataLoader, viewManager, options) {
	
	
    Events.eventList.buildandprice.model.PackageSelectedEvent.handler = function (pkg) {
		var collection = dataLoader.packages();
		//TODO: can we move this so the user doesn't lose their progress
		var selectedPkg = collection.getSelected();
		if (selectedPkg && selectedPkg.get('id') !== pkg.get('id')) {
		    dataLoader.clearStorageForStep(Constants.state.SELECT_PACKAGE);
		}
		collection.select(pkg);
		dataLoader.updateUserPrice('package', pkg);
		options.navigate(pkg.get('derivativeURL'), { trigger: true });
	};
	
	var registerEvents = function() {
		
	    Events.bind(Events.eventList.buildandprice.model.PackageSelectedEvent.name,
				Events.eventList.buildandprice.model.PackageSelectedEvent.handler, this);
		
		return publicMethods;
	};
	
	
	var go = function() {
		Events.fireEvent(Events.eventList.buildandprice.router.BlockUIEvent);
		//we should reconstruct the price object as it's out of sync wrt this page.
		dataLoader.fetch( 'Package', {callback : function(modelResult) {
//			var model = new collections.DerivativeModelCollection();
			var pricezoneId = dataLoader.pricezoneId();
//			model.url = Helper.buildURL(model.urlRoot, pricezoneId, modelId, Constants.path.drv, dataLoader.userPref);
//			fetchModel(Constants.storage.derivativeCollection,model, function(modelResult) {
				if (modelResult !== undefined && modelResult.length > 0) {
					var panelData = dataLoader.panel({
						state: Constants.state.SELECT_DERIVATIVE, 
						modelId: options.modelId, 
						engineId:0,
						path: options.path});

					viewManager.page()
					    .packages(modelResult, dataLoader.hotdeal())
						.panel(panelData)
						.header(dataLoader.header({
							name: dataLoader.nameplates().getSelected().get('name'),
							panel : panelData
						}))
					.go();
					Events.fireEvent(Events.eventList.buildandprice.router.UnblockUIEvent);
					
					
				} else {
//					displayNoContentView(modelId, Constants.path.drv);
					
					Events.fireEvent(Events.eventList.buildandprice.model.ErrorOccuredEvent.name, 
						  {
							title: Constants.bpt.sv, 
						    message: Constants.bpt.cl,
						    showPricezone: ConfigUtil.showPricezones()
						  });
				}
				
				Events.fireEvent(Events.eventList.buildandprice.omniture.StateChangedEvent,
						{ state: Constants.state.SELECT_DERIVATIVE, path: Constants.path.drv, storage: dataLoader.storage.storageModel });
				
//			});
			
		}, modelId: options.modelId, path: Constants.path.pkg, derivativeId: options.derivativeId});
	};
	
	var updateOptions = function(newOptions) {
		options = newOptions;
	};

	
	var publicMethods = {
		registerEvents: registerEvents,
		updateOptions: updateOptions,
		go: go
	};
	
	return publicMethods;
	
};