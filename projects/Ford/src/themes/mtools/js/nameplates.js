/**
 * 
 */
var BnP = BnP || {};

/*******************************START OF DATA LOADER*********************/
BnP.NameplateModule = function(dataLoader, viewManager, options) {
	
	//has to be this name for backward compatibility
	Events.eventList.buildandprice.model.ModelSelectedEvent.handler = function(model) {
		var collection = dataLoader.nameplates();
		
		var selectedModel = collection.getSelected();
		
		if (selectedModel != null && selectedModel.id !== model.id) {
			dataLoader.clearStorageForStep(Constants.state.SELECT_NAMEPLATE);
			collection.select(model);
			dataLoader.updateUserPrice('model', model);
		} else {
			collection.select(model);
			dataLoader.updateUserPrice('model', model);
		}
	
		options.navigate('#' + model.get('nameplateURL'), {trigger: true});
	};
	
	var registerEvents = function() {
		
		Events.bind(Events.eventList.buildandprice.model.ModelSelectedEvent.name, 
				Events.eventList.buildandprice.model.ModelSelectedEvent.handler, this);
		
		return publicMethods;
	};
	
	var go = function() {
		
		Events.fireEvent(Events.eventList.buildandprice.router.BlockUIEvent);
		dataLoader.fetch('Nameplate', {callback: function(nameplateCategories) {
			if (nameplateCategories && nameplateCategories.length > 0) {
				var panelData = dataLoader.panel({state: Constants.state.SELECT_NAMEPLATE});
				
				viewManager.page()
				.nameplates(nameplateCategories)
				.nameplateHeader(dataLoader.header({name: null, panel : panelData}))
				.nameplatePanel(nameplateCategories)
				.go();					
				

			}

			Events.fireEvent(Events.eventList.buildandprice.omniture.StateChangedEvent,
					{ state: Constants.state.SELECT_NAMEPLATE, storage: dataLoader.storage.storageModel });
			Events.fireEvent(Events.eventList.buildandprice.router.UnblockUIEvent);
			}
		});
	};
	
	var publicMethods = {
		registerEvents: registerEvents,
		go: go
	};
	
	return publicMethods;
	
};