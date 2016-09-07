/**
 * @author Sohrab Zabetian
 * 
 * Omniture Analytics
 */
var BPAnalytics = Backbone.Model.extend({
	
	defatuls : {
		region : null
	},
	
	initialize: function() {
//		console.log('BPAnalytics: initialize');
		
		if (ConfigUtil.showPricezones()) {
			Events.bind(Events.eventList.buildandprice.router.UpdatePricezoneEvent,this.storeCurrentPricezone, this);
			Events.bind(Events.eventList.buildandprice.omniture.PricezoneChangedEvent,this.regionChanged, this);
		}
		if (ConfigUtil.showPostcodeSelect()) {
			Events.bind(Events.eventList.buildandprice.model.RegionPostcodeChangedEvent,this.storeCurrentRegion, this);
			Events.bind(Events.eventList.buildandprice.model.RegionPostcodeLoadedFromConfigEvent,this.storeCurrentRegion, this);
			Events.bind(Events.eventList.buildandprice.omniture.RegionPostcodeChangedEvent,this.regionChanged, this);
		}
		
		Events.bind(Events.eventList.buildandprice.omniture.StateChangedEvent,this.trackOmniturePage,this);
		
		Events.bind(Events.eventList.buildandprice.omniture.TabChangedEvent, this.tabChanged, this);
		Events.bind(Events.eventList.buildandprice.omniture.ViewAccessoryDetailsEvent, this.accessoryDetailViewed, this);
		Events.bind(Events.eventList.buildandprice.omniture.ShareLinkClickedEvent, this.shareLinkClicked, this);
		Events.bind(Events.eventList.buildandprice.omniture.SaveAsPDFEvent, this.saveAsPDFClicked, this);
	},
	
	storeCurrentRegion: function(data) {
		this.set('region', data.postcode);
	},
	
	storeCurrentPricezone: function(data) {
		this.set('region', data);
	},
	
	setupParams: function(data, type) {
		var params = { type: type};
		this.resetOmnitureVars();
		this.setPath(data);
		return params;
	},
	
	saveAsPDFClicked: function(data) {
		var params = this.setupParams(data, 'd');
		params.pname = _da.pname + ':4' + data.path + 'summary';
		params.link = params.title = this.constructShareLink(data) + 'pdf';
		params.onclicks = 'build:pdf';
		this.setupNameplateVars(data);
		//ND.omniture.trackLink(params);
		$.publish('/analytics/link/', params);
	},
	
	shareLinkClicked: function(data) {
		var params = this.setupParams(data, 'e');
		params.pname = _da.pname + ':4' + data.path + 'summary';
		params.link = params.title = this.constructShareLink(data) + 'share';
		params.onclicks = 'build:share:' + data.provider;
		this.setupNameplateVars(data);
		//ND.omniture.trackLink(params);
		$.publish('/analytics/link/', params);
	},
	
	constructShareLink: function(data) {
		var link =  _da.pname + data.path + ((data.path === (':' + Constants.path.pkg + ':')) ? '' : 'vehicle summary:');
		return link;
	},
	
	regionChanged: function(data) {
		var params = { type: 'o'};
		this.resetOmnitureVars();
		params.link = params.title = _da.pname + ':0a:model:postal code';
		params.onclicks = 'postal code';
		params.pname = _da.pname + ':0:model:postal code';
		//ND.omniture.trackLink(params);
		$.publish('/analytics/link/', params);
	},
	
	tabChanged: function(data) {
		this.resetOmnitureVars();
		this.setupRegionVars();
		this.constructTabPagename(data);
		if (typeof data.state !== 'undefined') {
			Events.unbind(Events.eventList.buildandprice.omniture.OrientationChangedEvent, this);
			Events.bindOnce(Events.eventList.buildandprice.omniture.OrientationChangedEvent, this.vehicleOrientationChanged, this);
			if (data.isColorTrimTab) {
				Events.unbind(Events.eventList.buildandprice.omniture.ColorSelectedEvent, this);
				Events.bindOnce(Events.eventList.buildandprice.omniture.ColorSelectedEvent, this.colorChanged, this);
				Events.unbind(Events.eventList.buildandprice.omniture.TrimSelectedEvent, this);
				Events.bindOnce(Events.eventList.buildandprice.omniture.TrimSelectedEvent, this.trimChanged, this);
			}
			
			this.setupOmnitureVars(data);
			ND.analyticsTag.trackOmnitureSinglePageApp();
		}
	},
	
	colorChanged: function(data) {
		this.resetOmnitureVars();
		var params = this.setupParams(data, 'o');
		params.pname = _da.pname + ':3a' + data.path + 'colour trim';
		params.link = params.title = _da.pname + data.path + 'colour trim:ext';
		params.onclicks = _da.pname + ':colorizer:ext';
		this.setupNameplateVars(data);
		//ND.omniture.trackLink(params);
		$.publish('/analytics/link/', params);
	},
	trimChanged: function(data) {
		this.resetOmnitureVars();
		var params = this.setupParams(data, 'o');
		_da.region = undefined;
		params.pname = _da.pname + ':3a' + data.path + 'colour trim';
		params.link = params.title = _da.pname + data.path + 'colour trim:int';
		params.onclicks = _da.pname + ':colorizer:int';
		this.setupNameplateVars(data);
		//ND.omniture.trackLink(params);
		$.publish('/analytics/link/', params);
	},
	
	accessoryDetailViewed: function(data) {
		var params = { type: 'o'};
		this.resetOmnitureVars();
		//find the selected category and construct its page name
		this.constructTabPagename(data);
		params.pname = data.state + data.stepName;
		params.link = params.title = 'vehicle:accessories:pop up:detail';
		params.onclicks = 'accessories: detail popup';
		if (typeof data.state !== 'undefined') {
			//ND.omniture.trackLink(params);
			$.publish('/analytics/link/', params);
		}
	},
	
	vehicleOrientationChanged: function (data) {
		var params = { type: 'o'};
		this.resetOmnitureVars();
		this.constructTabPagename(data);
		if (typeof data.state === 'undefined') { //assume something
			data.state= '3';
			data.stepName = 'exterior';
		}
		params.pname = _da.pname + ':' + data.state + data.stepName;
		params.link = params.title = _da.pname +  data.stepNameNoAnalyticsStep + ':360';
		params.onclicks = _da.pname + ':360';
		this.setupNameplateVars(data);
		//ND.omniture.trackLink(params);
		$.publish('/analytics/link/', params);
		
	},
	
	resetOmnitureVars: function() {
		_da.tool = _da.der = _da.nameplate = _da.events = _da.region = undefined;
		_da.funnel.stepname = undefined;
	},
	
	setupRegionVars: function() {
		if (this.get('region') != null) {
			_da.region = this.get('region');
		}
	},
	
	setupOmnitureVars: function(data) {
		_da.funnel.stepname = data.state + data.stepName;
		this.setupNameplateVars(data);
		if (typeof data.events !== 'undefined' && data.events != null) {
			_da.events = data.events.split(',');
		}
	},
	
	setupNameplateVars: function(data) {
		if (typeof data.storage !== 'undefined') {
			var nameplates = data.storage.get(Constants.storage.nameplateCollection);
			
			var selectedNameplate = nameplates.getSelected();
			if (typeof selectedNameplate !== 'undefined' && selectedNameplate != null) {
				_da.nameplate = {name : selectedNameplate.get('analyticsName') || selectedNameplate.get('name'),
								 year :  selectedNameplate.get('modelYear'),
								 id : selectedNameplate.get('id'),
								 cat :  selectedNameplate.get('analyticsCategory') || selectedNameplate.get('category')}; 
			}  
		}
	},
	
	validateAndSetPrice: function(price) {
		var isNumber = false;
		if (price != null && price !== '' && _.isNumber(price)) {
			_da.der.price = parseInt(price, 10);
		} else {
			_da.der.price = undefined;
		}
	},
	
	trackOmniturePage: function(data) {
//		console.log('BPAnalytics: trackOmniturePage: ' + data.state + ' path' + data.path);
//		this.set('state', data.state);
//		this.set('path', data.path);
		
		
		var stepName, events;
		//make sure these global object exist and clear them all.
		//values should not be carried from page to page.
		this.resetOmnitureVars();
		this.setupRegionVars();
		
		
		
		switch(data.state) {
			case Constants.state.SELECT_NAMEPLATE: 
				stepName = ':model:select'; 
				data.state = '0';
				break;
			case Constants.state.SELECT_PATH: //full path 
				stepName = ':package or full';
				data.state = '1';
				break;
			case Constants.state.SELECT_PACKAGE: 
			case Constants.state.SELECT_DERIVATIVE: 
				data.state = '2';
				if (data.path === Constants.path.pkg) {
					stepName = ':package:select';
				} else if(data.path === Constants.path.drv) {
					stepName = ':full:derivative';
				}
				_da.tool = {name : 'event: bp start'};
				events = 'event6,event43';
				break;	
			case Constants.state.CUSTOMIZE_DERIVATIVE: 
				this.tabChanged(data);
				return;
			case Constants.state.SUMMARY:	
				data.state = '4';
				if (data.path === Constants.path.pkg) {
					stepName = ':package';
				} else if(data.path === Constants.path.drv) {
					stepName = ':full';
				}
				stepName += ':summary';
				_da.tool = {name : 'event: bp finished'};
				events = 'event2,event43';
				//v18	"Body Model,Trim"
				//v19	"Ext:Int Color Code"
				//v20	Accessories Picked
				//v21	Veh. Options Picked	
				//v23	"Option	Pkgs Picked"
				//v24	"Engine: Trans"
				//v25 	Price
				_da.der = {};
				//get all the ids from user object.
				var selectedColor = data.storage.get(Constants.storage.colorCollection).getSelected();
				_da.der.colour = selectedColor.get('id');
				_da.der.trim = selectedColor.get('trims').getSelected().get('id');
				
				var options = new Array();
				var features = new Array();
				var optionPacks = new Array();
				var featureObjects = data.userPref.get('featuresObject');
				if (featureObjects != null && featureObjects.length > 0) {
					_.each(featureObjects.models, function(featureObject) {
						if (featureObject.get('groupType') === 'Option Pack') {
							optionPacks.push(featureObject.get('id'));
						} else if (featureObject.get('featuretype') !== 'Accessory') {
							options.push(featureObject.get('id'));
						} else {
							features.push(featureObject.get('id'));
						}
					});
				}
				
				_da.der.optionpacks = optionPacks.length > 0 ? optionPacks.join(',') : undefined;
				_da.der.features = features.length > 0 ? features.join(',') : undefined;
				_da.der.options = options.length > 0 ? options.join(',') : undefined;
				
//				Util.log('_da.der.optionpacks:' + _da.der.optionpacks);
//				Util.log('_da.der.features:' + _da.der.features);
//				Util.log('_da.der.options:' + _da.der.options);
				
				if (data.path === Constants.path.pkg) {
					var packageCollection = data.storage.get(Constants.storage.packageCollection);
					
					var selectedPackage = packageCollection.getSelected();
					_da.der.name = selectedPackage.get('name') + selectedPackage.get('engineTransmission');
					_da.der.engine = selectedPackage.get('engineId');
					
				} else if(data.path === Constants.path.drv) {
					var derivativeCollection = data.storage.get(Constants.storage.derivativeCollection);
					
					var selectedDerivative = derivativeCollection.getSelected();
					
					var engineTx = selectedDerivative.get('engines').getSelected();
					_da.der.name = selectedDerivative.get('name') + engineTx.get('name');
					_da.der.engine = engineTx.get('id');
				}
				
				if (ConfigUtil.usePolkPricing(data.path)) {
					var price = data.userPref.get('unformattedPolkPrice');
					this.validateAndSetPrice(price);
				} else if (ConfigUtil.showPrices()) {
					var price = data.userPref.total();
					this.validateAndSetPrice(price);
				}
//				console.log('price ' + _da.der.price);
				break;
			default : 
				//console.log('unknown step ' + data.state);
		}
		
		data.stepName = stepName;
		data.events = events;
		this.setupOmnitureVars(data);

		ND.analyticsTag.trackOmnitureSinglePageApp();
		
	},
	
	constructTabPagename: function(data) {
		var categoryGroups = data.storage.get(Constants.storage.categoryGrpCollection);
		var categoryGroup = categoryGroups.getSelected();
		
		var analyticsName = null;
		var analyticsStep = null;
		
		var categories = categoryGroup.get('categories');
		//try and collection analytics info from sub-tab
		if (typeof categories !== 'undefined' && categories != null && categories.length > 0) {
			var selectedCategory = categories.getSelected() == null ? categories.at(0) : categories.getSelected();
			//pick the first one
			analyticsName = selectedCategory.get('analyticsName');
			analyticsStep = selectedCategory.get('analyticsStep');
		} else if (categoryGroup.id === 1) { //colour and trim
			analyticsName = categoryGroup.get('analyticsName');
			analyticsStep = categoryGroup.get('analyticsStep');
		}
		if (analyticsName != null && analyticsStep != null) {
			this.setPath(data);
			data.state = '3';
			data.isColorTrimTab = (analyticsName === Constants.analytics.colorTrim);
			data.stepName = analyticsStep + data.path + analyticsName;
			data.stepNameNoAnalyticsStep = data.path + analyticsName;
//			Util.log('tabname:' + data.stepName);
		}
//		Util.log('analyticsName: ' + analyticsName + ' analyticsStep: ' + analyticsStep);
	},
	
	setPath: function(data) {
		var path = Constants.path.pkg; 
		var paths = data.storage.get(Constants.storage.pathCollection);
		if (!ConfigUtil.isShortPath()) {
			path = paths.getSelected().get('key');
		}
		if (path === Constants.path.pkg) {
			path = ':package:';
		} else if(path === Constants.path.drv) {
			path = ':full:';
		}
		data.path = path;
	}
 });