/**
 * global self executing function
 * 
 * @author Sohrab Zabetian 
 */

var ComparatorModels = (function(window, document, $, Backbone, undefined) {	
	/*******************************MODELS**************************************/
	var models = {};
	
	
	models.ErrorModel = Backbone.Model.extend({
		title:null,
		message: null,
		defaults : {
			showPricezone: true
		},
		initialize : function() {
			Events.bindToEvent(this, Events.eventList.comparator.view.StartOverEvent,
									 Events.eventList.comparator.model.StartOverEvent.name,
							   this);
			Events.bindToEvent(this, Events.eventList.comparator.view.PricezoneChangeRequestEvent, 
									 Events.eventList.comparator.model.PricezoneChangeRequestEvent.name,
							   this);
		}
	});
	
	models.PriceZoneModel = Backbone.Model.extend({
		id:null,
		name: null,
		priceFormat: null,
		defaults: {
			'default': false,
			pricesDisabled: false,
			selected : false
		}
	});
	
	models.NameplateContainer  = Backbone.Model.extend({
		defaults: {
			errorMessage: '',
			vehicleCount: 0,
			enabled: false
		},
		nameplates: null
		
	});
	
	models.Nameplate = Backbone.Model.extend({
		category:null,
		id:null,
		imageURL:null ,
		modelCode:null, 
		name:null, 
		order:null, 
		nameplateURL : null,
		byoImageURL: null,
		modelYear: null,
		packageImageURL: null,
		defaults: {
			makeCode : '',
			makeId : '',
			makeName : 'Ford',
			displayPrice : 0,
			thumbnailURL:'',
			count: '',
			price:0,
			selected : false,
			clicked : false
		},
		
		derivatives : null,
		
		initialize : function() {
			Events.bindToEvent(this, Events.eventList.comparator.view.NameplateClickedEvent, 
									 Events.eventList.comparator.router.NameplateClickedEvent.name,
							   this);
			//this.set('nameplateURL', this.get('id'));
		}
		
	});
	
	models.Derivative = Backbone.Model.extend({
		id:null,
		name:'c-derivative',
		modelCode: null,
		priceZoneId: null,
		nameAuthoring: null,
		defaults: {
			thumbnailURL:'',
			imageURL:'',
			displayPrice: 0,
			order: 0,
			price : 0,
			selected : false
		},
		
		initialize : function() {
			Events.bindToEvent(this, Events.eventList.comparator.view.DerivativeSelectedEvent,
									 Events.eventList.comparator.router.DerivativeSelectedEvent.name, this);
		}
	});
	
	models.ComparisonChart = Backbone.Model.extend({
		derivatives : null,
		categories : null,
		tables: null,
		urlRoot: Config.comparator.urls.compareURL,
		defaults : {
			hasKeyFeature: false,
			derivativeIds: [],
			startOver: false,
			canAdd : true
		},
		
		getDerivativeCount: function() {
			return ((this.derivativeIds && this.derivativeIds != null) ? this.derivativeIds.length : 0);
		},
		
		/**
		 * Parse the response and convert nested feature JSON response into Feature Backbone objects
		 */
		parse : function(response, xhr) {
			for(var key in this) {
				var embeddedClass = null;
				if (key == 'categories' ) {
					embeddedClass = new ComparatorCollections.ComparableCategories();
				} else if (key == 'derivatives') {
					embeddedClass = new ComparatorCollections.ComparableDerivatives();
				}
				
				if (embeddedClass != null) {
					var embeddedData = response[key];
			        embeddedClass.add(embeddedData, {parse:true});
			        response[key] = embeddedClass;
				}
			}
			return response;
		}
	});
	
	models.Table = Backbone.Model.extend({
		defaults : {
			title: '',
			order: 0,
			isOpen: false
		},
		rows : null
	});
	
	models.Row = Backbone.Model.extend({
		header: null,
		columns : null,
		defaults : {
			order : 0,
			hasNote: false,
			noteCounter : 0,
			note: null
		}
	});
	
	models.Column = Backbone.Model.extend({
		derivativeId: null,
		defaults : {
			value: ''
		}
	});
	
	models.ComparableDerivative = Backbone.Model.extend({
		derivativeId: null,
		name: null,
		defaults: {
			thumbnailURL: '',
			displayPrice: 0,
			nameplateId: '',
			summary: '',
			order: 0,
			price : 0
		},
		categories: null,
		
		/**
		 * Parse the response and convert nested feature JSON response into Feature Backbone objects
		 */
		parse : function(response, xhr) {
			for(var key in this) {
				if (key == 'categories' ) {
					var embeddedClass = new ComparatorCollections.ComparableCategories();
		            var embeddedData = response[key];
		            embeddedClass.add(embeddedData, {parse:true});
		            response[key] = embeddedClass;
				}
			}
			return response;
		}
	});
	
	models.ComparableCategory = Backbone.Model.extend({
		name:null,
		features: null,
		/**
		 * Parse the response and convert nested feature JSON response into Feature Backbone objects
		 */
		parse : function(response, xhr) {
			for(var key in this) {
				if (key == 'features' ) {
					var embeddedClass = new ComparatorCollections.ComparableFeatures();
		            var embeddedData = response[key];
		            embeddedClass.add(embeddedData, {parse:true});
		            response[key] = embeddedClass;
				}
			}
			return response;
		}
	});
	
	models.ComparableFeature = Backbone.Model.extend({
		name:null,
		defualts : {
			value: ''
		},
		noteAssigned: null,
		note: null
	});
	
	models.Storage = Backbone.Model.extend({
		pricezoneCollection: null,
		nameplateCollection : null,
		comparisonChart : null,
		nameplateContainer : null
	});
	
	return models;
	
})(window, document, jQuery, Backbone);