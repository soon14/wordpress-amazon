/**
 * 
 */
var BnP = BnP || {};

/*******************************START OF DATA LOADER*********************/
BnP.DerivativeModule = function(dataLoader, viewManager, options) {
	
	
	Events.eventList.buildandprice.model.DerivativeSelectedEvent.handler = function(derivative) {
		var collection = dataLoader.derivatives();
		//TODO: can we move this so the user doesn't lose their progress
		var selectedDrv = collection.getSelected();
		if (selectedDrv && selectedDrv.get('id') !== derivative.get('id')) {
			dataLoader.clearStorageForStep(Constants.state.SELECT_DERIVATIVE);
		}
		collection.select(derivative);
		dataLoader.updateUserPrice('derivative', derivative);
		options.navigate(derivative.get('derivativeURL'), {trigger: true});
	};
	
	var registerEvents = function() {
		
		Events.bind(Events.eventList.buildandprice.model.DerivativeSelectedEvent.name,
				Events.eventList.buildandprice.model.DerivativeSelectedEvent.handler, this);
		
		return publicMethods;
	};
	
	
	var go = function() {
		Events.fireEvent(Events.eventList.buildandprice.router.BlockUIEvent);
		//we should reconstruct the price object as it's out of sync wrt this page.
		dataLoader.fetch( 'Derivative', {callback : function(modelResult) {
//			var model = new collections.DerivativeModelCollection();
			var pricezoneId = dataLoader.pricezoneId();
//			model.url = Helper.buildURL(model.urlRoot, pricezoneId, modelId, Constants.path.drv, dataLoader.userPref);
//			fetchModel(Constants.storage.derivativeCollection,model, function(modelResult) {
				if (modelResult !== undefined && modelResult.length > 0) {
					var panelData = dataLoader.panel({state: Constants.state.SELECT_DERIVATIVE, modelId: options.modelId, path: options.path});
					viewManager.page()
					.derivatives(modelResult, dataLoader.hotdeal())
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
			
		}, modelId: options.modelId, path: Constants.path.drv, derivativeId: options.derivativeId});
	};
	
	var updateOptions = function(newOptions) {
		options = newOptions;
	};
	
//	var selectDerivative = function(drvCollection) {
//		if (options.derivativeId && options.derivativeId != null) {
//			var derivative = drvCollection.get(options.derivativeId);
//			Events.fireEvent(Events.eventList.buildandprice.model.DerivativeSelectedEvent.name, derivative);
//		}
//	};
	
//	var displayDerivatives = function(options, pricezoneId, modelResult) {
//		viewManager.displayParentView(views.SelectDerivativeListView, modelResult);
//		viewManager.displayTitleView(new models.PageTitleModel({title :  Constants.bpt.chm, showLatestOffersBtn: ConfigUtil.showPostcodeSelect()}));
//		displayHeadersView(modelId, Constants.path.drv);
		
//		selectDerivative(modelResult);
		
//		viewManager.page()
//		.derivatives(modelResult).hotdeal()
//			.panel(dataLoader.panel({state: Constants.state.SELECT_DERIVATIVE, modelId: options.modelId, path: options.path}))
//			.header(dataLoader.header({
//				name: dataLoader.nameplates().getSelected().get('name'),
//				stepName: Constants.bpt.chm,
//				state: Constants.state.SELECT_DERIVATIVE,
//				nextPageURL: null
//			}))
//		.go();
//		Events.fireEvent(Events.eventList.buildandprice.router.UnblockUIEvent);
//		updateHeader(
//				Constants.state.SELECT_DERIVATIVE,
//				Helper.constructStepUrl.call(self,{step: Constants.state.SELECT_DERIVATIVE, 
//												   path: Constants.path.drv,
//												   modelId: modelId}), Constants.header.sm);
		
//		displayFooterView({path: Constants.path.drv, modelId : modelId, step: Constants.state.SELECT_DERIVATIVE});
//		updateFooter(SELECT_ENGINE);
		
//	};
	
	var publicMethods = {
		registerEvents: registerEvents,
		updateOptions: updateOptions,
		go: go
	};
	
	return publicMethods;
	
};