/**
 * global self executing function
 * 
 * @author Sohrab Zabetian 
 */

var models = (function(window, document, $, Backbone, undefined) {	
	/*******************************MODELS**************************************/
	var models = {};
	
	models.UserPref = Backbone.Model.extend({
		modelObject: null,
		derivativeObject: null,
		packageObject: null,
		colourObject: null,
		trimObject: null,
		engineObject: null,
		featuresObject: null,
		defaults : {
			site: '',
			priceZoneId: '',
			postcode: '',
			polkPrice: null,
			unformattedPolkPrice: null,
			usage: '',
			usageLabel: '',
			features: new Array()
		},
		
		modelId: null,
		derivativeId: null,
		packageId: null,
		tempPostcode: null,
		tempUsage: null,
		colourId: null,
		trimId: null,
		engineId: null,
		
		initialize: function() {
			Events.bind(Events.eventList.buildandprice.model.RegionPostcodeChangedEvent, this.setRegionDetails, this);
		},
		
		purge: function() {
			this.set({
				packageObject: undefined,
				derivativeObject : undefined,
				engineObject : null,
				colourObject: null,
				trimObject: null,
				featuresObject: new collections.FeatureCollection(),
				packageId: undefined,
				derivativeId : undefined,
				polkPrice: null,
				unformattedPolkPrice: null,
				engineId:null,
				colourId:null,
				trimId: null,
				features: new Array()
			});
		},
		
		setRegionDetails: function(result) {
			//console.log('setRegionDetails: ' + result.postcode);
			this.set({postcode: result.postcode, usage: result.usage, usageLabel: result.usageLabel});
		},
		
			
		total : function() {
			var total = 0;
			
			var inclusionList = new Array('packageObject','colourObject','trimObject','engineObject');
			
			_.each(inclusionList, function(item) {
				//we do not want to include the model price:
				var value = this.get(item);
				if (value && value != null) {
					total += parseFloat(value.get('price'));
//					console.log(item + ' has price ' + value.get('price'));
				}
			}, this);
			
			_.each(this.get('featuresObject').models, function(feature) {
				total += parseFloat(feature.get('price'));
//				console.log('feature ' + feature.get('name') + ' has price ' + feature.get('price'));
			});
			
//			console.log('total Price is ' + total + ', formatted price is ' + ND.PriceFormatter.format(total.toString()));
			return total;
		},
		
		/**
		 * Total result to be sent to polk:
		 * 
		 * engine price + color + trim + all accessories of featureType != 'Accessory'
		 */
		totalOptionsForPOLK : function() {
			var total = 0;
			var inclusionList = new Array('colourObject', 'trimObject');
			_.each(inclusionList, function(key) {
				var value = this.get(key);
				if (value && value != null) {
					total += parseFloat(value.get('price'));
//					console.log(key + ' has price ' + value.get('price'));
				}
			}, this);
			
			_.each(this.get('featuresObject').models, function(feature) {
				if (feature.get('featuretype') !== 'Accessory') {
					total += parseFloat(feature.get('price'));
//					console.log('feature ' + feature.get('name') + ' has price ' + feature.get('price'));
				}
			});
//			console.log('totalOptionsForPOLK Price is ' + total + ', formatted price is ' + ND.PriceFormatter.format(total.toString()));
			return total;
		},
		
		/**
		 * Result from POLK rest call + featureType === 'Accessory'
		 */
		totalWithPOLK: function(polkPrice) {
			var total = parseFloat(polkPrice);
			_.each(this.get('featuresObject').models, function(feature) {
				if (feature.get('featuretype') === 'Accessory') {
					total += parseFloat(feature.get('price'));
//					console.log('feature ' + feature.get('name') + ' has price ' + feature.get('price'));
				}
			});
//			console.log('totalWithPOLK Price is ' + total + ', formatted price is ' + ND.PriceFormatter.format(total.toString()));
			return total;
		},
		/**
		 * Override toJSON to pass the essential attributes to the server only.
		 */
		toJSON: function() {
			var inclusionList = new Array('modelId',
			 					'derivativeId',
			 					'packageId',
			 					'colourId',
			 					'postcode',
			 					'usage',
			 					'priceZoneId',
			 					'site',
			 					'trimId',
			 					'engineId',
			 					'features');
			var json = {};
			_.each(inclusionList, function(attr) {
				json[attr] = this.get(attr);
			},this);
			return json;
		},
		urlRoot: Config.buildandprice.urls.shareURL
	});
	
	models.ErrorModel = Backbone.Model.extend({
		title:null,
		message: null,
		defaults : {
			showPricezone: true
		},
		initialize : function() {
			Events.bindToEvent(this, Events.eventList.buildandprice.view.StartOverEvent,
					Events.eventList.buildandprice.model.StartOverEvent.name, this);
			Events.bindToEvent(this, Events.eventList.buildandprice.view.PricezoneChangeRequestEvent,
					Events.eventList.buildandprice.model.PricezoneChangeRequestEvent.name, this);
		}
	});
	
	models.PageTitleModel = Backbone.Model.extend({
		title : '',
		defaults : {
			showLatestOffersBtn: false
		}
	});
	
	models.PriceZoneModel = Backbone.Model.extend({
		id:null,
		name: null,
		priceFormat: null,
		defaults: {
			decimalSeparator: ',',
	        monetaryDecimalSeparator: ',',
	        groupingSeparator: ',',
			'default': false,
			pricesDisabled: false,
			selected : false
		}
	});
	
	
	models.DerivativeModel = Backbone.Model.extend({
		id:null,
		name:'bp-derivative',
		modelCode: null,
		priceZoneId: null,
		nameAuthoring: null,
		derivativeURL : null, //for mobile 
		defaults: {
			thumbnailURL:'',
			imageURL:'',
			midResURL: '',//for mobile 
			engines: null,
			displayPrice: 0,
			order: 0,
			price : 0,
			selected : false,
			hotDealUrl: '#'
		},
		
		initialize : function() {
			Events.bindToEvent(this, Events.eventList.buildandprice.view.DerivativeSelectedEvent,
					Events.eventList.buildandprice.model.DerivativeSelectedEvent.name, this);
		}
	});
	
	models.PackageModel = models.DerivativeModel.extend({
		name:'bp-package',
		engineTransmission: null,
		engineId: null,
		initialize : function() {
			Events.bindToEvent(this, Events.eventList.buildandprice.view.PackageSelectedEvent, 
					Events.eventList.buildandprice.model.PackageSelectedEvent.name, this);
		}
	});
	
	models.Nameplate = Backbone.Model.extend({
		category:null,
		id:null,
		imageURL:null ,
		modelCode:null, 
		name:null, 
		nameplateURL : null,
		byoImageURL: null,
		modelYear: null,
		defaults: {
			makeCode : '',
			order: 0, 
			makeId : '',
			makeName : 'Ford',
			displayPrice : 0,
			thumbnailURL:'',
			pkgImageURL: '',
			hotDealUrl: null,
			hotDealSmobUrl: null,
			analyticsCategory: '',
			analyticsName: '',
			price:0,
			selected : false
		},
		
		initialize : function() {
			Events.bindToEvent(this, Events.eventList.buildandprice.view.ModelSelectedEvent, 
					Events.eventList.buildandprice.model.ModelSelectedEvent.name, this);
			this.set('nameplateURL', this.get('id'));
		}
		
	});
	
	models.NameplateCategory = Backbone.Model.extend({
		name: null,
		defaults : {
			order: 0,
			selected : false
		}
	});
	
	models.PathModel = Backbone.Model.extend({
		name : null,
		title: null,
		instruction: null,
		imageURL : null,
		pathURL : null,
		key : null,
		defaults : {
			selected : false
		},
		
		initialize : function() {
			Events.bindToEvent(this, Events.eventList.buildandprice.view.PathSelectedEvent, 
					Events.eventList.buildandprice.model.PathSelectedEvent.name, this);
		}
	});
	
	models.FeatureModel = Backbone.Model.extend({
		accessoryId:null,
	 	bpdisplayorder:null,
		bpvalue:null,
		compdisplayorder:null,
		featureImage:null,
		featuretype:null,
		groupType:null,
		name:null,
		partNumber:null,
		derivativeId: null,
		pricezoneId: null,
		featureGroupAttributes: null,
		dependentFeaturesIds: null,
		defaults :{
			price:0,
			displayPrice: 0,
			numImages: 4,
			featureDetailUrl: Config.featureDetailUrl,
			thumbnailUrl: '',
			disabled: false,
			/*
			 * An accessory could be a dependentFeature of other accessories.
			 * In cases where two accessories have overlapping dependentFeatures,
			 * we need to impose a lock on the accessory, to track how many other accessories
			 * have selected this accessory as a dependent feature. Primarily used to track
			 * whether an accessory should be enabled or disabled (only when it's a dependentFeature)
			 */
			dependentFeatureLockCount: 0,
			note:null,
			className: null,
			isOptionPack : false,
			isMutuallyExclusive: false,
			hasDependentFeatures: false, 
			spriteUrl : '',
			spriteMidResUrl: '', //for mobile
			message : '',
			selected : false
		},
		
		initialize : function() {
			Events.bindToEvent(this, Events.eventList.buildandprice.view.FeatureSelectedEvent, 
					Events.eventList.buildandprice.model.FeatureSelectedEvent.name);
		},
		
		/**
		 * Parse the response and convert nested featureGroupAttributes JSON response into GeatureGroupAttributes Backbone objects
		 */
		parse : function(response, xhr) {
			for(var key in this) {
				if (key === 'featureGroupAttributes' ) {
					var embeddedClass = new collections.FeatureGroupAttributeCollection();
		            var embeddedData = response[key];
		            if (embeddedData !== undefined) {
		            	embeddedClass.add(embeddedData, {parse:true});
		            }
		            response[key] = embeddedClass;
				}
			}
			return response;
		}
		

	});
	
	models.CategoryGroupModel = Backbone.Model.extend({
		name:null,
		categories : null,
		order : null,
		
		defaults : {
			containsFeatureGroup: false,
			categoryGrouping: '',
			analyticsName: null,
			analyticsStep: null,
			selected : false
		},
		/**
		 * Parse the response and convert nested feature JSON response into Feature Backbone objects
		 */
		parse : function(response, xhr) {
			for(var key in this) {
				if (key === 'categories' ) {
					var embeddedClass = new collections.CategoryCollection();
		            var embeddedData = response[key];
		            if (embeddedData !== undefined) {
		            	embeddedClass.add(embeddedData, {parse:true});
		            }
		            response[key] = embeddedClass;
				}
			}
			return response;
		}
		
	});
	
	models.SortDirModel = Backbone.Model.extend({
		defaults: { 
			name: '',
			price: ''
		}
	});
	
	
	models.CategoryModel = Backbone.Model.extend({
		id: null,
		name:null,
		derivativeId: null,
		pageURL:null, //for mobile
		className : function() {
			return this.get('name').replace(' ', '-');
		},
		features: null,
		defaults: {
			sortDir: new models.SortDirModel(),
			selected : false,
			order:0,
			ASC : 1,
			DESC : -1,
			analyticsName: null,
			analyticsStep: null
		},
		
		initialize: function() {
			this.bind(Events.eventList.buildandprice.view.SortFeaturesByPriceEvent, this.sortByPrice, this);
			this.bind(Events.eventList.buildandprice.view.SortFeaturesByNameEvent, this.sortByName, this);
		},
		
		sortByPrice: function() {
			
			var sortDir = this.get('sortDir');
			var dir = sortDir.get('price');
			var priceSortDir = this.get('DESC');
			if (dir === '' || dir === 'sortdesc') {
				priceSortDir = this.get('ASC');
			} 
			//Util.log('CategoryModel.sortyByPrice: ' + dir);
			sortDir.set('price',this.getSortDir(priceSortDir));
			sortDir.set('name','');
			this.get('features').sortByPrice(priceSortDir);
		},
		
		sortByName: function() {
			var sortDir = this.get('sortDir');
			var dir = sortDir.get('name');
			var nameSortDir = this.get('DESC');
			if (dir === '' || dir === 'sortdesc') {
				nameSortDir = this.get('ASC');
			} 
			//Util.log('CategoryModel.sortyByName: ' +  dir);
			sortDir.set('name',this.getSortDir(nameSortDir));
			sortDir.set('price','');
			this.get('features').sortByName(nameSortDir);
		},
		
		getSortDir: function(dir) {
			if (dir ===  this.get('ASC')){
				return 'sortasc';
			} 
			return 'sortdesc';
		},
		
		/**
		 * Parse the response and convert nested feature JSON response into Feature Backbone objects
		 */
		parse : function(response, xhr) { 
			for(var key in this) {
				if (key == 'features' ) {
					var embeddedClass = new collections.FeatureCollection();
		            var embeddedData = response[key];
		            if (embeddedData !== undefined) {
		            	embeddedClass.add(embeddedData, {parse:true});
		            }
		            response[key] = embeddedClass;
				}
			}
			return response;
		}
		
		
	});

	models.TrimModel = Backbone.Model.extend({
		imageURL:null,
		bpvalue:null,
		note:null,
		name:null,
		id:null,
		
		defaults: {
			spriteUrl:'',
			thumbnailUrl:'',
			price:0,
			displayPrice: 0,
			order:1,
			numImages: 1,
			selected : false,
			isColour: false //used for price suffix
		},
		initialize: function() {
			Events.bindToEvent(this, Events.eventList.buildandprice.view.TrimSelectedEvent, Events.eventList.buildandprice.model.TrimSelectedEvent.name, this);
		}
	});



	models.ColorModel = Backbone.Model.extend({
		bpvalue:null ,
		id:null ,
		majorValue:null ,
		name:null ,
		note:null,
		trims: null,
		
		defaults: {
			numImages: 1,
			spriteUrl:'',
			thumbnailUrl:'',
			order:1,
			spriteMidResUrl: '',
			price:0,
			displayPrice: 0,
			selected : false,
			isColour: true //used for price suffix
		},
		
		/**
		 * Parse the response and convert nested trims JSON response into Trim Backbone objects
		 */
		parse : function(response, xhr) {
			for(var key in this) {
				if (key == 'trims' ) {
					var embeddedClass = new collections.TrimCollection();
		            var embeddedData = response[key];
		            if (embeddedData !== undefined) {
		            	embeddedClass.add(embeddedData, {parse:true});
		            }
		            response[key] = embeddedClass;
				}
			}
			return response;
		}, 
		
		initialize : function() {
			Events.bindToEvent(this, Events.eventList.buildandprice.view.ColorChangedEvent,Events.eventList.buildandprice.model.ColorChangedEvent.name, this);
		}
		
	});

	models.FeatureGroupAttribute = Backbone.Model.extend({
		featureName:null,
		categoryName:null,
		id:null
	});

	models.EngineTransmission = Backbone.Model.extend({
		bpdisplayorder:null,
		bpvalue:null,
		compdisplayorder:null,
		compvalue:null,
		detailpageid:null,
		featureContent:null,
		featureImage:null,
		featuretype:null,
		groupType:null,
		id:null,
		multiResImage:null,
		name:null,
		note:null,
		partNumber:null,
		specdisplayorder:null,
		specvalue:null,
		toolsdisplayflag:null,
		
		defaults: {
			price:0,
			priceDiff:0,
			displayPrice: 0,
			hotDealUrl: '#', //for mobile
			selected : false
		},
		
		initialize : function() {
			Events.bindToEvent(this, Events.eventList.buildandprice.view.EngineTrasmissionSelectedEvent,
					Events.eventList.buildandprice.model.EngineTrasmissionSelectedEvent.name, this);
		}

	});

	models.HeaderModel = Backbone.Model.extend({
		order: null,
		heading : null,
		step : null,
		headerURL : null,
		derivativeName: null,
		state : null,
		postcode : null,
		usageLabel: null,
		defaults : {
			showPricezoneSelect: true,
			enabled: false,
			isCurrent : false,
			visited: false
		},
		
		initialize: function() {
			Events.bind(Events.eventList.buildandprice.router.UpdatePricezoneEvent, this.updatePostcode, this);
			Events.bind(Events.eventList.buildandprice.model.RegionPostcodeChangedEvent, this.regionPostcodeChanged, this);
			Events.bindToEvent(this, Events.eventList.buildandprice.view.PricezoneChangeRequestEvent,
									 Events.eventList.buildandprice.model.PricezoneChangeRequestEvent.name, this);
			this.bind(Events.eventList.buildandprice.view.StepChangeRequestEvent, this.stepChangeRequest, this);
			Events.bindToEvent(this, Events.eventList.buildandprice.view.StepChangeHeaderRequestEvent, 
									 Events.eventList.buildandprice.model.StepChangeHeaderRequestEvent.name, this);
		},
		
		updatePostcode : function(postcode) {
//			console.log('updatePostcode is actually being used!!! Remove this console.log');
			this.set('postcode', postcode);
		},
		
		regionPostcodeChanged: function(result) {
//			//Util.log('regionPostcodeChanged');
			if (result) {
				this.set({'postcode' : result.postcode, 'usage' : result.usage, 'usageLabel' : result.usageLabel});
			} else {
				this.set({'postcode' : '', 'usage' : '', 'usageLabel' : ''});
			}
		},
		
		stepChangeRequest : function(href) {
			Events.fireEvent(Events.eventList.buildandprice.model.StepChangeRequestEvent.name, href);
		}
		
	});
	
	models.MobileHeaderModel = Backbone.Model.extend({
		heading : null,
		step : null,
		nameplate : null,
		totalSteps : null,
		postcode : null,
		usageLabel: null,
		defaults : {
			showPricezoneSelect: true
		},
		
		initialize: function() {
			Events.bind(Events.eventList.buildandprice.router.UpdatePricezoneEvent, this.updatePostcode, this);
			Events.bind(Events.eventList.buildandprice.model.RegionPostcodeChangedEvent, this.regionPostcodeChanged, this);
			Events.bindToEvent(this, Events.eventList.buildandprice.view.PricezoneChangeRequestEvent, 
									 Events.eventList.buildandprice.model.PricezoneChangeRequestEvent.name, this);
		},
		
		updatePostcode : function(postcode) {
//			console.log('updatePostcode is actually being used!!! Remove this console.log');
			this.set('postcode', postcode);
		},
		
		regionPostcodeChanged: function(result) {
//			//Util.log('regionPostcodeChanged');
			if (result) {
				this.set({'postcode' : result.postcode, 'usage' : result.usage, 'usageLabel' : result.usageLabel});
			} else {
				this.set({'postcode' : '', 'usage' : '', 'usageLabel' : ''});
			}
		}
		
	});

	models.FooterModel = Backbone.Model.extend({
		defaults : {
			price: 0.0,
			priceZoneId: null,
			derivativeName: '',
			engine : '',
			transmission: '',
			nextButtonText: '',
			nextButtonURL: '',
			prevButtonText: '',
			prevButtonURL: '',
			prevEnabled: false,
			nextEnabled: false,
			vehicleThumbnailUrl: '',
			hasError: false,
			isPackage: false,
			postcodeHint: null,
			currentDate :  (function() {
				var d = new Date();
			    var date = d.getDate();
			    var month = d.getMonth() + 1; //Months are zero based
			    var year = d.getFullYear();
			    
			    return date + '/' + month + '/' + year;
			})()

		},
		
		initialize: function() {
			Events.bindToEvent(this, Events.eventList.buildandprice.view.SaveAsPDFEvent, Events.eventList.buildandprice.model.SaveAsPDFEvent.name);
			Events.bindToEvent(this, Events.eventList.buildandprice.view.ShareConfigEvent, Events.eventList.buildandprice.model.ShareConfigEvent.name);
			this.bind(Events.eventList.buildandprice.view.TabChangeRequestEvent, this.tabChangeRequested, this);
			this.bind(Events.eventList.buildandprice.view.StepChangeRequestEvent, this.stepChangeRequest, this);
			Events.bindToEvent(this, Events.eventList.buildandprice.view.RequestAQuoteEvent, Events.eventList.buildandprice.model.RequestAQuoteEvent.name);
			if(typeof Events.eventList.buildandprice.model.PresentPaymentEvent !== "undefined"){
				Events.bindToEvent(this, Events.eventList.buildandprice.view.PresentPaymentEvent, Events.eventList.buildandprice.model.PresentPaymentEvent.name);
			}
		},
		
		tabChangeRequested : function(order) {
			Events.fireEvent(Events.eventList.buildandprice.model.TabChangeRequestEvent.name, order);
		},
		
		stepChangeRequest : function(href) {
			Events.fireEvent(Events.eventList.buildandprice.model.StepChangeRequestEvent.name, href);
		},
		
		update : function(derivativeName, price, engine, nextEnabled, nextBtnURL, prevBtnURL, nextBtnText, prevBtnText) {
			this.set({'derivativeName': derivativeName,
					  'price': price, 
					  'engine': engine, 
					  'nextEnabled': nextEnabled,
					  'nextButtonURL': nextBtnURL,
					  'prevButtonURL': prevBtnURL});
			
			if (nextBtnText && nextBtnText != null) {
				this.set('nextButtonText', nextBtnText);
			}
			
			if (prevBtnText && prevBtnText != null) {
				this.set('prevButtonText', prevBtnText);
			}
		},
		
		setNextButton : function(url, name) {
			if (url == '') {
				this.set('nextEnabled', false);
			}
			this.set('nextButtonURL', url);
			this.set('nextButtonText', name);
		},
		
		setPrevButton : function(url, name) {
			if (url == '') {
				this.set('nextPrev', false);
			}
			this.set('prevButtonURL', url);
			if (name) {
				this.set('prevButtonText', name);
			}
		}
		
	});

	models.DerivativeDetailModel = Backbone.Model.extend({
		id:null,
		imageURL:null ,
		derivativeName:null, 
		engineTransmission:null,
		name: null,
		summary: null,
		thumbnailURL:null,
		currentCategory : 0,
		defaults : {
			price:0,
			order:0,
			showVehicleDisclaimer: false,
			derivativeCode:'', 
			hasNext: true,
			hasPrev : false,
			view : 'exterior'
		},
		
		initialize: function() {
			this.currentCategory = 0;
			this.url = this.urlRoot + this.get('id');
//			console.log('DerivativeDetailModel.url ' + this.url);
//			this.bind(Events.eventList.buildandprice.view.ToggleViewEvent, this.toggleView, this);
			Events.bindToEvent(this, Events.eventList.buildandprice.view.ToggleViewEvent, Events.eventList.buildandprice.model.ToggleViewEvent.name);
			Events.bindToEvent(this, Events.eventList.buildandprice.view.TabChangedEvent, Events.eventList.buildandprice.model.TabChangedEvent.name);
		},
		
		
//		toggleView : function(view) {
//			this.set('view', view);
//			Events.fireEvent(Events.eventList.buildandprice.model.ToggleViewEvent.name, view);
//		},
		
		
		urlRoot : Config.buildandprice.urls.derivativeDetailURL
		

	});

	models.GalleryModel = Backbone.Model.extend({
		imageURL : null,
		className: '',
		defaults : {
			visible : false,
			layer : 0,
			slideHeight: 292, // our single page height
			slideWidth:615, // our single page width
			slideYpos: 0, // current Y position of our bg-image (in both pages)
			numImages: 1,
			zIndex: 1,
			spriteLength: 615
		}
		
	});
	
	models.MobileGallery = Backbone.Model.extend({
		imageURL : null,
		className: '',
		defaults : {
			visible : false,
			selected: false,
			layer : 0,
			slideNumber : 0,
			slideHeight: 61, // our single page height
			slideWidth:320, // our single page width
			spriteLength: 320,
			slideYpos: 0, // current Y position of our bg-image (in both pages)
			numMidResImages: 1,
			zIndex: 1
		}
		
	});
	
	models.GalleryWrapper = Backbone.Model.extend({
		showArrows: false,
		gallery : null,
		
		initialize: function() {
			Events.bind(Events.eventList.buildandprice.model.HideArrowsEvent, this.hideArrows, this);
			Events.bind(Events.eventList.buildandprice.model.ShowArrowsEvent, this.showArrows, this);
		},
		
		hideArrows : function() {
			this.set('showArrows', false);
		},
		
		showArrows : function() {
			this.set('showArrows', true);
		}
	});

	models.SummaryCategory = Backbone.Model.extend({
		category : null,
		categoryTotal : null,
		features : null,
		defaults : {
			collapsed : false,
			order : 0
		},
	
		collapse : function() {
			this.set('collapsed', true);
		},
		
		expand : function() {
			this.set('collapsed', false);
		}
	});
	
	models.SummaryFeature = Backbone.Model.extend({
		name : null,
		featureGroups: null,
		defaults : {
			nameSuffix: null,
			price : '',
			priceSuffix : null,
			pricePrefix: null,
			isChild: false
		}
	});
	
	models.HotDeal = Backbone.Model.extend({
		id:null,
		nameplateId:null,
		derivativeId:null,
		defaults : {
			hotDealUrl: null,
			hotDealSmobUrl: null,
			derivativename:'',
			order : 0,
			nameplatename:'',
			offerprice: 0,
			displayPrice: 0,
			pricedisclaimer: '',
			heroImageThumbnailUrl: '',
			imageURL: ''
		}
//	,
//		initialize: function() {
//			Events.bindToEvent(this, Events.eventList.buildandprice.view.HotDealSelectedEvent, 
//					Events.eventList.buildandprice.model.HotDealSelectedEvent.name, this.model);
//		}
	});
	
	models.HotDealContainer = Backbone.Model.extend({
		hotdeals : null,
		latestOffersInstructions : null
	});
	
	models.Storage = Backbone.Model.extend({
		derivativeDetailModel: null,
		categoryGroupCollection: null,
		pricezoneCollection: null,
		nameplateCollection : null,
		headerCollection : null,
		derivativeCollection : null,
		packageCollection : null,
		colorCollection : null,
		hotDealCollection: null,
		pathCollection : null,
		footerModel : null,
		galleryCollection : null
	});
	
	return models;
	
})(window, document, jQuery, Backbone /* nkircher: Added backbone as an injected dependency */);