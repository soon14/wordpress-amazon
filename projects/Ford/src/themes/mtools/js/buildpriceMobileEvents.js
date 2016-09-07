/**
 * 
 */
Events.eventList.buildandprice = {};
Events.eventList.buildandprice.router = {
	
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
	ShowPricesLaterEvent: 'ShowPricesLaterEvent',
	ShowGalleryCueEvent: 'ShowGalleryCueEvent'
//			,
	/*
	 * occurs when loading configuration (FOA only) and configuration postcode/usage
	 * does not match what's in cookie.
	 */
//		PostcodeMisMatchEvent: 'PostcodeMisMatchEvent'
};

Events.eventList.buildandprice.model = {
	
	ErrorOccuredEvent : {
		name: 'ErrorOccuredModelEvent',
		handler: function(data) {
			this.navToErrorPage(data);
		}
	},
	
	PrevPageRequestedEvent: {
		name: 'PrevPageRequestedModelEvent',
		handler: function() {
			var panel = this.dataLoader.panelData(),
			selectItem = panel.where({'isCurrent' : true})[0],
			index = selectItem.get('step'); //index
//			console.log('back history index ' + index);
			if (index >= 2) {
				var prevItem = panel.at(index - 2);
//				console.log('going back to ' + prevItem.get('headerURL'));
				this.navigate(prevItem.get('headerURL'), {trigger: true});
			} //else we are on nameplate page, done
			
		}
	},
		
	StartAllModulesEvent : {
		name: 'StartAllModulesModelEvent',
		handler: function(data) {
			this.registerAccessoryPageModule(data.modelId, data.path, data.derivativeId, data.engineId, data.categoryId);
			data.callback({path: data.path, askForPostcodeLater: data.askForPostcodeLater, showPricesLater: data.showPricesLater, derivativeId:data.derivativeId, engineId:data.engineId});
		}
	},	
	
	RestoreCompleteEvent : {
		name: 'RestoreCompleteModelEvent',
		handler: function(data) {
			this.navToSummaryPage(data.modelId, data.path, data.derivativeId, data.engineId, data.isLoadingConfig, data.showPricesLater); 
		}
	},
		
	ShareLinkClickedEvent: {
		name: 'ShareLinkClickedModelEvent',
		handler: function(provider) {
	//				Analytics.trackOmnitureAction.call(this, 'ShareLink', provider);
	//				Events.fireEvent(Events.eventList.buildandprice.router.ActionTriggeredEvent, {action : 'ShareLink', value: provider});
			Events.fireEvent(Events.eventList.buildandprice.omniture.ShareLinkClickedEvent, {provider: provider, storage: this.storage});
		}
	},
	
	ViewAccessoryDetailsEvent : {
	    name: 'ViewAccessoryDetailsModelEvent',
	    handler: function () {
	        Events.fireEvent(Events.eventList.buildandprice.omniture.ViewAccessoryDetailsEvent, { storage: this.storage.storageModel });
	    }
	},

	SubTabChangedEvent: {
		name: 'SubTabChangedModelEvent', 
		handler : function(tabId) {
			//Util.log('SubTabChangedModelEvent');
//			var tabIdx = tabId.substring(tabId.indexOf('cat-') + 'cat-'.length, tabId.length);
//			var categoryGroups = this.dataLoader.categoryGroups();
//			var categories = categoryGroups.getSelected().get('categories');
//			categories.selectByOrder(tabIdx);
//			Events.fireEvent(Events.eventList.buildandprice.omniture.TabChangedEvent, {storage: this.storage});
		}
	},
	
	OrientationChangedEvent: {
		name: 'OrientationChangedModelEvent'
	},
	
	ShareLinkClickedEvent: {
		name: 'ShareLinkClickedModelEvent'	
	},
	
	ShareConfigEvent: {
		name : 'ShareConfigModelEvent'
	},
	
	SaveAsPDFEvent : {
		name : 'SaveAsPDFModelEvent'
	},
	
	RequestAQuoteEvent : {
		name: 'RequestAQuoteModelEvent'
	},

	PresentPaymentEvent : {
		name: 'PresentPaymentEvent'
	},
	
	PricezoneSelectedEvent : {
		name :'PricezoneSelectedModelEvent',
		handler : function(pricezoneId) {
			//Util.log('pricezoneSelected');
//			var pcz = this.dataLoader.pricezones();
//			this.storage.destroy();
//			this.storage = new models.Storage();
//			this.userPref.purge();
//			this.storage.set(Constants.storage.pricezoneCollection, pcz);
//			this.updatePricezoneForUserObject(model);
//			Events.fireEvent(Events.eventList.buildandprice.router.UpdatePricezoneEvent, model.get('name'));
//			Events.fireEvent(Events.eventList.buildandprice.omniture.PricezoneChangedEvent, model.get('name'));
//			Util.cookie.save(Constants.cookie.pzid, model.get('id'));
//			this.navigate('reset', {trigger: true});
			var self=this;
			var pricezoneCollection=self.dataLoader.pricezones();
			var pricezone=pricezoneCollection.get(pricezoneId);
			if(pricezone){
				self.dataLoader.updatePricezoneForUserObject(pricezone);
				Util.cookie.save(Constants.cookie.pzid, pricezoneId);
			}
			self.navigate('reset',{trigger:true});
		}
	},
	
	PricezoneChangeRequestEvent: {
		name : 'PricezoneChangeRequestModelEvent',
		handler: function(isFirstLoad) {
//			var self = this;
//			self.fetchPricezones(function(collection) {
//				self.diplayRegionOverlayView(collection);
//			});
			if(isFirstLoad){
				this.viewManager.showPricezone(null,BnP.CommonHelper.isStateCitySelector());
			}
			else{
			var curPricezone=this.dataLoader.pricezones().getSelected();
				this.viewManager.showPricezone(curPricezone,BnP.CommonHelper.isStateCitySelector());
			}
		}
	},
			
	PricezoneCheckRequestEvent:{
		name:'PricezoneCheckRequestModelEvent',
		handler:function(){
			if(this.dataLoader.isFirstLoad && ConfigUtil.showPricezones()){
				var pricezoneCookie=Util.cookie.load(Constants.cookie.pzid);
				if(!pricezoneCookie || !pricezoneCookie.length){
					Events.fireEvent(Events.eventList.buildandprice.model.PricezoneChangeRequestEvent.name,true);
		}
				this.dataLoader.isFirstLoad=false;
			}
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
						var userPref = self.dataLoader.userPref;
						if ((userPref.get('postcode') !== result.postcode) || (userPref.get('usage') !== result.usage)) {
							Events.fireEvent(Events.eventList.buildandprice.model.RegionPostcodeChangedEvent, result);
							Events.fireEvent(Events.eventList.buildandprice.router.HidePricesEvent, !ConfigUtil.showPrices());
							Events.fireEvent(Events.eventList.buildandprice.omniture.RegionPostcodeChangedEvent, result);
							var pcz = self.dataLoader.pricezones();
							self.dataLoader.reset(pcz);
							self.navigate('reset', {trigger: true});
							Events.fireEvent(Events.eventList.buildandprice.router.AskForPostcodeEvent, false);
						}
					} else {
						Events.fireEvent(Events.eventList.buildandprice.router.HidePricesEvent, true);
					}
					
				}}, forceDisplayRegionOverlay);
			}
		}
	},
	
	ChangePostcodeOrPricezoneEvent:{
		name:'ChangePostcodeOrPricezoneEvent',
		handler:function(){
			if(ConfigUtil.showPostcodeSelect()){
				Events.fireEvent(Events.eventList.buildandprice.view.RegionPostcodeChangeRequestEvent, true);				
			}
			else if(ConfigUtil.showPricezones()){
				Events.fireEvent(Events.eventList.buildandprice.model.PricezoneChangeRequestEvent.name);
			}
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
				
			var ddm = this.dataLoader.derivativeDetails();
			ddm.set('view', view);
			var gallery = this.dataLoader.gallery().get('gallery');
			
			var colorCollection = this.dataLoader.colors();
			var color = colorCollection.getSelected();
			
			if (color) {
				if (view == Constants.view.exterior) {
					//console.log('view: ', Constants.view.exterior);
					gallery.toggleLayer(color.get('id'));
//						Analytics.trackOmnitureAction.call(this, 'ViewChanged', Constants.view.exterior);
//						Events.fireEvent(Events.eventList.buildandprice.router.ActionTriggeredEvent, {action : 'ViewChanged', value: Constants.view.exterior});
				} else { //interior
					var trim = color.get('trims').getSelected();
					gallery.toggleLayer(trim.get('id'));
//						Analytics.trackOmnitureAction.call(this, 'ViewChanged', Constants.view.interior);
				}
				Events.fireEvent(Events.eventList.buildandprice.router.ActionTriggeredEvent, {action : 'ViewChanged', value: Constants.view.exterior});
				var features = this.dataLoader.categoryGroups().getSelectedFeatures();
				if (features && features.length > 0) {
					_.each(features, function(feature) {
						gallery.toggleLayer(feature.get('id'));
					});
				}
			}
		}	
	},
	
	
	TabChangeRequestEvent : { 
		name : 'TabChangeRequestModelEvent',
		handler : function(tabOrder) {
//			var categoryGroups = this.dataLoader.categoryGroups();
//			var categoryGroup = categoryGroups.getSelected();
//			var prevIdx = categoryGroup.get('order');
//			var dir = tabOrder - prevIdx; 
//			if (dir > 0) {
//				//call eventbus to notify the view to change to next tab
//				Events.fireEvent(Events.eventList.buildandprice.router.NextTabEvent);
//			} else if (dir < 0) {
//				//call eventbus to notify the view to change to prev tab
//				Events.fireEvent(Events.eventList.buildandprice.router.PrevTabEvent);
//			}
			//this.updateFooter(Constants.state.CUSTOMIZE_DERIVATIVE);
		}
	},
	
	StepChangeRequestEvent: { 
		name : 'StepChangeRequestModelEvent',
		handler : function(url) {
			//Util.log('stepChangeRequest URL: ' + url);
//			this.navigate(url, {trigger: true});
		}
	},
	StepChangeHeaderRequestEvent : {
		name : 'StepChangeHeaderRequestModelEvent',
		handler : function(header) {
//				Util.log('stepChangeRequest URL: ' + header.get('headerURL'));
//				this.updateFooter(header.get('state'));
			this.navigate(header.get('headerURL'), {trigger: true});
		}
	},
	TabChangedEvent : {
		name: 'TabChangedModelEvent', 
		handler : function(tabId) {
//			var tabIdx = tabId.substring(tabId.indexOf('cat-group-') + 'cat-group-'.length, tabId.length);
//			//Util.log('Router.tabchanged: ' + tabIdx);
//			var categoryGroups = this.dataLoader.categoryGroups();
//			categoryGroups.selectByOrder(tabIdx);
//			Events.fireEvent(Events.eventList.buildandprice.omniture.TabChangedEvent, {storage: this.storage});
		    //			//this.updateFooter(Constants.state.CUSTOMIZE_DERIVATIVE);
		}
	},
	
	ModelSelectedEvent: {
		name : 'ModelSelectedModelEvent'
	},
	
	PathSelectedEvent: {
		name: 'PathSelectedModelEvent'
	},
	
	DerivativeSelectedEvent : {
		name :'DerivativeSelectedModelEvent'
	},
	
	FeatureSelectedEvent : { 
		name : 'FeatureSelectedModelEvent'
	},
	
	EngineTrasmissionSelectedEvent : { 
		name: 'EngineTrasmissionSelectedModelEvent'
	},
	
	TrimSelectedEvent : { 
		name : 'TrimSelectedModelEvent'
	},
	
	ColorChangedEvent : { 
		name : 'ColorChangedModelEvent'
	},
	
	PackageSelectedEvent: {
		name : 'PackageSelectedModelEvent'
	},
	
	/*
	 * Takes the user back to Nameplate page and clears the history.
	 */
	StartOverEvent: {
		name :'StartOverModelEvent',
		handler :  function() {

			this.dataLoader.reset();
			this.navigate('reset', {trigger: true});
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
};


Events.eventList.buildandprice.omniture = {
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
};