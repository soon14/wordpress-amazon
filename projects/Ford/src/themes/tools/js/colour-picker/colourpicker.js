/**
 * global self executing function
 */
(function(window,document, $){

	/**
	 * In charge of managing pages and loading information for each page.
	 */
	var ColourPickerApp = Backbone.Router.extend({

		selectedDerivativeId:null,

		selectedDerivative:null, // holds a reference to the currently selected derivative
		selectedColour:null, // holds a reference to the currently selected colour
		selectedTrim:null, // holds a reference to the currently selected trim

		derivativeCollection : null,  // holds the loaded derivatives
		colourCollection : null, // holds a reference to the currently loaded selection of colours
		trimCollection : null, // holds a reference to the currently loaded selection of trim

		derivativeSelectorView: null,
		carView : null,
		colourSelectorView: null,
		trimView : null,
		trimSelectorView : null,
		viewManager: null,

		routes: {
			":derivativeId": "setDerivativeId"
		},

		setDerivativeId: function(derivativeId) {
			this.selectedDerivativeId = derivativeId;
		},

		initialize: function() {

			this.setupConfig();
			this.setupCollections();
			this.setupViews();
			this.setupEvents();

			Backbone.trigger(ND.CP.Events.ApplicationReady);

		},

		setupConfig:function() {
			var $config = $('#colour-picker-config');

			if ($config.length > 0) {
				this.settings = $.extend(ND.CP.settings, JSON.parse($config.html()));
			}
		},

		setupCollections:function() {
			this.derivativeCollection = new ND.CP.Collections.CPDerivative();
			this.derivativeCollection.url = this.settings.derivativesRESTPointURL;

			this.colourCollection = new ND.CP.Collections.CPColour();
			this.colourCollection.baseUrl = this.settings.colourTrimRESTPointURL;

			this.trimCollection = new ND.CP.Collections.CPTrim();
		},

		setupViews:function() {
			this.derivativeSelectorView = new ND.CP.Views.CPDerivativeSelector({collection: this.derivativeCollection});
			this.colourSelectorView = new ND.CP.Views.CPColourSelector({collection: this.colourCollection});
			this.carView = new ND.CP.Views.CPCar();
			this.trimView = new ND.CP.Views.CPTrim();
			this.trimSelectorView = new ND.CP.Views.CPTrimSelector({collection: this.trimCollection});
			this.viewManager = ND.CP.Views.ViewManager();
			this.viewManager.initialise();
		},

		setupEvents: function() {

			var self = this;

			/**
			 * COLLECTION EVENTS
			 */

			// derivative data reset/loaded
			self.derivativeCollection.on('request', function() {
				Backbone.trigger(ND.CP.Events.BlockUI);
			});

			self.derivativeCollection.on('reset', function() {
				Backbone.trigger(ND.CP.Events.UnblockUI);
				Backbone.trigger(ND.CP.Events.DerivativesLoaded);
			});

			self.colourCollection.on('request', function() {
				Backbone.trigger(ND.CP.Events.BlockUI);
			});

			self.colourCollection.on('sync', function() {
				Backbone.trigger(ND.CP.Events.UnblockUI);
				Backbone.trigger(ND.CP.Events.ColoursLoaded);
			});

			self.trimCollection.on('reset', function() {
				Backbone.trigger(ND.CP.Events.TrimsLoaded);
			});


			/**
			 * APPLICATION EVENTS
			 */

			// APPLICATION READY
			Backbone.on(ND.CP.Events.ApplicationReady, function() {
				self.derivativeCollection.fetch({reset: true});
			});

			// DERIVATIVES LOADED FROM SERVER
			Backbone.on(ND.CP.Events.DerivativesLoaded, function() {
				if (!self.derivativeCollection.length) return false; // show 'no derivatives' message

				var selectedDerivative = (self.selectedDerivativeId) ? self.derivativeCollection.get(self.selectedDerivativeId) : self.derivativeCollection.at(0);
				Backbone.trigger(ND.CP.Events.ChangeSelectedDerivative, selectedDerivative);
			});

			// DERIVATIVE CHANGED
			Backbone.on(ND.CP.Events.ChangeSelectedDerivative, function(model) {
				self.selectedDerivative = model;
				self.derivativeCollection.select(model);
				self.navigate(model.get('id'));
				self.colourCollection.buildUrl(self.selectedDerivative.id);
				self.colourCollection.fetch({reset: true});
			});

			// COLOURS LOADED FROM SERVER
			Backbone.on(ND.CP.Events.ColoursLoaded, function() {
				if (!self.colourCollection.length) return false;//fire event and return

				var selectedColour = self.colourCollection.at(0);
				Backbone.trigger(ND.CP.Events.ChangeSelectedColour, selectedColour);
			});

			// COLOUR CHANGED
			Backbone.on(ND.CP.Events.ChangeSelectedColour, function(model) {

				self.selectedColour = model;
				self.colourCollection.select(self.selectedColour);

				self.carView.model = self.selectedColour;
				self.carView.render();

				self.trimSelectorView.collection.reset(self.selectedColour.get('trims'));
			});

			// TRIMS LOADED
			Backbone.on(ND.CP.Events.TrimsLoaded, function () {
			    var selectedTrim = self.trimCollection.at(0);
			    Backbone.trigger(ND.CP.Events.ChangeSelectedTrim, selectedTrim);
			});

			// TRIM CHANGED
			Backbone.on(ND.CP.Events.ChangeSelectedTrim, function (model) {
			    if (model) {
			        self.selectedTrim = model;
			        self.trimCollection.select(self.selectedTrim);
			        self.trimView.model = self.selectedTrim;
			        self.trimView.render();
			    }
			    else {
			        self.trimView.model = null;
			        self.trimView.render();
			    }
			});

		}
		
	});
	
	
	
	/******************************END OF EVENTS***********************/
	
	$(document).ready(function() {
	    if ($('#content > #colour-picker').length) {
	        _.templateSettings = {
	        	interpolate: /\{\{\=(.+?)\}\}/gim,
	        	evaluate: /\{\{(.+?)\}\}/gim
	        };
			window.CPApp = new ColourPickerApp();
			if (ND.analyticsTag.isSinglePageAppOmnitureConfigured()) {
				var cpAnalytics = new ND.CP.Analytics();
			}
			Backbone.history.start();
		}
	});
})(window, document, jQuery);