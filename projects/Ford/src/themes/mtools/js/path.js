/**
 * 
 */
var BnP = BnP || {};

/*******************************START OF DATA LOADER*********************/
BnP.PathModule = function(dataLoader, viewManager, options) {
	
	Events.eventList.buildandprice.model.PathSelectedEvent.handler = function (path) {
		paths = dataLoader.paths();
		var prevPath = paths.getSelected();
//				Util.log('prevPath.key:' + ((prevPath != null) ? prevPath.get('key') : ''));
		if (prevPath != null && prevPath.get('key') !== path.get('key')) {
			//user is changing path, wipe out storage.
			dataLoader.clearStorageForStep(Constants.state.SELECT_PATH);
		}		
		paths.select(path);
		var pathUrl = path.get('pathURL');
		if (pathUrl.charAt(0) === '#') {
			options.navigate(pathUrl, {trigger: true});
		} else {
			window.location = pathUrl;
		}
	};
	
	
	var registerEvents = function() {
		
		Events.bind(Events.eventList.buildandprice.model.PathSelectedEvent.name,
				Events.eventList.buildandprice.model.PathSelectedEvent.handler, this);
		
		return publicMethods;
	};
	
	var updateOptions = function(newOptions) {
		options = newOptions;
	};
	
	var go = function() {
		Events.fireEvent(Events.eventList.buildandprice.router.BlockUIEvent);
		dataLoader.fetch( 'Path', {callback: function(paths) {
			
			var panelData = dataLoader.panel({state: Constants.state.SELECT_PATH, modelId: options.modelId});
			viewManager.page().paths(paths)
			.header(dataLoader.header({
						name: dataLoader.nameplates().getSelected().get('name'),
						panel : panelData
					}))
			.panel(panelData)
			.go();
			
//			self.viewManager.displayParentView(views.SelectPathListView, paths);
//			self.viewManager.displayTitleView(new models.PageTitleModel({title : Constants.bpt.chp}));
//			self.displayHeadersView(modelId);
//			self.updateHeader(Constants.state.SELECT_PATH, Helper.constructStepUrl.call(self, 
//					{step: Constants.state.SELECT_PATH, modelId : modelId}));
			Events.fireEvent(Events.eventList.buildandprice.omniture.StateChangedEvent,
					{ state: Constants.state.SELECT_PATH, storage: dataLoader.storage.storageModel });
			Events.fireEvent(Events.eventList.buildandprice.router.UnblockUIEvent);
			
//			if (ConfigUtil.showPostcodeSelect()) {
//				self.removeHotDealsView();
//			}
			
			
		}, modelId : options.modelId});
	};
	
	var publicMethods = {
		registerEvents: registerEvents,
		updateOptions: updateOptions,
		go: go
	};
	
	return publicMethods;
	
};