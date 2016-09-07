/**
 * 
 */
var BnP = BnP || {};

/*******************************START OF DATA LOADER*********************/
BnP.ColorModule = function(dataLoader, viewManager, options) {
	
	/**
	 * data {trim: trimObject, isSystem: true/false}
	 * isSystem indicates whether this trim selection is invoked by the application or the user
	 * the sole purpose of the flag is to determine when to fire an omniture trim selected event.
	 */
	Events.eventList.buildandprice.model.TrimSelectedEvent.handler = function(data) {
		selectTrim(data.trim);
		if (dataLoader.currentGalleryView() === Constants.view.interior) {
			dataLoader.gallery().toggleLayer(data.trim.get('id'));
		} else {
			Events.fireEvent(Events.eventList.buildandprice.model.ToggleViewEvent.name, Constants.view.interior);
		}
//			console.log('TrimSelectedModelEvent: data.isSystem:' + data.isSystem);
//			if (false === data.isSystem) {
//				Events.fireEvent(Events.eventList.buildandprice.omniture.TrimSelectedEvent, {storage: dataLoader});
//			}
	};
	
	/**
	 * data {color: colorObject, isSystem: true/false}
	 * isSystem indicates whether this color selection is invoked by the application or the user
	 * the sole purpose of the flag is to determine when to fire an omniture color selected event.
	 */
	Events.eventList.buildandprice.model.ColorChangedEvent.handler = function(data) {
		selectColor(data);
//		this.selectTrim(color.get('trims').at(0));
		if (dataLoader.currentGalleryView() === Constants.view.exterior) {
			dataLoader.gallery().toggleLayer(data.color.id);
		} else {
			Events.fireEvent(Events.eventList.buildandprice.model.ToggleViewEvent.name,Constants.view.exterior);
		}
//			console.log('ColorChangedModelEvent: data.isSystem:' + data.isSystem);
//			if (false === data.isSystem) {
//				Events.fireEvent(Events.eventList.buildandprice.omniture.ColorSelectedEvent, {storage: this.storage});
//			}
	};
	
	var selectTrim = function(trim) {
		var colorCollection = dataLoader.colors();
		colorCollection.selectTrim(trim);
		
		dataLoader.updateUserPrice('trim', trim);
		
//		this.updateFooter(Constants.state.CUSTOMIZE_DERIVATIVE);
	};

	var selectColor = function(data) {
		var colorCollection = dataLoader.colors();
//		var trimView = new views.TrimListView({collection : data.color.get('trims')});
//		trimView.display();
		
		if (!data.isSystem) {
			viewManager.trims(data.color.get('trims'));
		}
		
		colorCollection.select(data.color);
		var selectedTrim = data.color.get('trims').getSelected();
		if (typeof selectedTrim === 'undefined' || selectedTrim == null) {
			selectedTrim = data.color.get('trims').at(0);
		}
		dataLoader.updateUserPrice('colour', data.color);
		//changing trim as part of selecting colour is always considered a system event, pass true to avoid
		//calling omniture
		Events.fireEvent(Events.eventList.buildandprice.model.TrimSelectedEvent.name, {trim: selectedTrim, isSystem : true});
//		updateFooter();
	};
	
	
	var registerEvents = function() {
		
		Events.bind(Events.eventList.buildandprice.model.TrimSelectedEvent.name, 
				Events.eventList.buildandprice.model.TrimSelectedEvent.handler, this);
		
		Events.bind(Events.eventList.buildandprice.model.ColorChangedEvent.name, 
				Events.eventList.buildandprice.model.ColorChangedEvent.handler, this);
		
		return publicMethods;
	};
	
	
	var go = function() {
		
		Events.fireEvent(Events.eventList.buildandprice.router.BlockUIEvent);
		dataLoader.fetch('Categories', 
						{modelId: options.modelId,
						 path: options.path, 
						 derivativeId: options.derivativeId, 
						 engineId: options.engineId, 
						 cleanup : cleanup,
						 callback: display});
	};
	

	var cleanup = function() {
		dataLoader.clearStorageForStep(Constants.state.CUSTOMIZE_DERIVATIVE);
	};
	
	var display = function() {
			
			//displayDerivativeDetailView(modelId, path, derivativeId);
			Events.fireEvent(Events.eventList.buildandprice.omniture.StateChangedEvent,
					{ state: Constants.state.CUSTOMIZE_DERIVATIVE, path: options.path, storage: dataLoader.storage.storageModel });
		var colorCollection = dataLoader.colors();
		var selectedColor = colorCollection.getSelected();
		if (typeof selectedColor === 'undefined' || selectedColor == null) {
			selectedColor = colorCollection.at(0);
		}
		Events.fireEvent(Events.eventList.buildandprice.model.ColorChangedEvent.name, {color: selectedColor , isSystem: true});
		dataLoader.derivativeDetails().trigger(Events.eventList.buildandprice.router.LoadCompleteEvent);
		
		
		var panelData = dataLoader.panel({state: Constants.state.CUSTOMIZE_DERIVATIVE, modelId: options.modelId, 
			 path: options.path,
			 derivativeId: options.derivativeId, 
			 engineId: options.engineId});

		var headerCollection = BnP.CommonHelper.isPackagePath(options.path) ? dataLoader.packages() : dataLoader.derivatives();

		viewManager.page()
		.colors(colorCollection, selectedColor.get('trims'), dataLoader.gallery(), dataLoader.hotdeal())
				.panel(panelData)
				.header(dataLoader.header({
					name: headerCollection.getSelected().get('name'),
					panel : panelData
				}))
		.go();
		Events.fireEvent(Events.eventList.buildandprice.router.UnblockUIEvent);
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