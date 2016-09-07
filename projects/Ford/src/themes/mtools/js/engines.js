/**
 * 
 */
var BnP = BnP || {};

/*******************************START OF DATA LOADER*********************/
BnP.EngineModule = function(dataLoader, viewManager, options) {
	
	Events.eventList.buildandprice.model.EngineTrasmissionSelectedEvent.handler = function(engine) {
		var derivatives = dataLoader.derivatives();
		derivatives.getSelected().get('engines').select(engine);
		dataLoader.updateUserPrice('engine', engine);
//			//this.updateFooter(Constants.state.SELECT_ENGINE);
		options.navigate(engine.get('engineURL'), {trigger: true});
	};
	
	var registerEvents = function() {
		Events.bind(Events.eventList.buildandprice.model.EngineTrasmissionSelectedEvent.name, 
				Events.eventList.buildandprice.model.EngineTrasmissionSelectedEvent.handler, this);
		
		return publicMethods;
	};
	
	
	var go = function() {
		Events.fireEvent(Events.eventList.buildandprice.router.BlockUIEvent);
		//console.log('navToEnginesPage');
		dataLoader.fetch( 'Engine', {callback : function(engines) {
			    var derivative = dataLoader.derivatives().getSelected(),
			    	panelData = dataLoader.panel({state: Constants.state.SELECT_ENGINE, modelId: options.modelId, 
						 path: Constants.path.drv, derivativeId : options.derivativeId});
				viewManager.page()
				.engines(derivative.get('name'), derivative.get('thumbnailURL'), engines, dataLoader.hotdeal())
					.panel(panelData)
					.header(dataLoader.header({
						name: derivative.get('name'),
						panel : panelData
					}))
				.go();
				Events.fireEvent(Events.eventList.buildandprice.router.UnblockUIEvent);
				Events.fireEvent(Events.eventList.buildandprice.omniture.StateChangedEvent,
                            { state: Constants.state.SELECT_ENGINE, path: Constants.path.drv, storage: dataLoader.storage.storageModel });
//				self.updateFooter(self.SELECT_ENGINE);
		}, modelId: options.modelId, path: Constants.path.drv, derivativeId: options.derivativeId});
		
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