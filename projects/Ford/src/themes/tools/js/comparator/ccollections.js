/**
 * global self executing function
 * 
 * @author Sohrab Zabetian 
 */
var ComparatorCollections = (function(window, document, m, $, undefined) {
	/**
	 * Customize backbone collection to include select & getSelected functionality
	 */
	
	var collections = {};
	
	collections.Pricezones = Backbone.Collection.extend({
		model: m.PriceZoneModel,
		urlRoot : Config.comparator.urls.pricezoneListURL,
		
		initialize: function() {
			this.bind(Events.eventList.comparator.view.PricezoneSelectedEvent, this.pricezoneSelected, this);
		},
		
		pricezoneSelected : function(id) {
			var model = this.selectById(id);
			Events.fireEvent(Events.eventList.comparator.model.PricezoneSelectedEvent.name, model);
		},
		
		comparator: function(model) {
			return model.get('name');
	    }
	});
	
	collections.Nameplates = Backbone.Collection.extend({
		model: m.Nameplate,
		urlRoot: Config.comparator.urls.modelListURL,
		
		supportsMultiSelect : function() {
			return true;
		},
		
		clickable : function() {
			return true;
		},
		
		comparator: function(model) {
			return parseInt(model.get('order'));
	    }
	});
	
	collections.Derivatives = Backbone.Collection.extend({
		model: m.Derivative,
		urlRoot : Config.comparator.urls.derivativeListURL,
		
		supportsMultiSelect : function() {
			return true;
		},
		
		comparator: function(model) {
			return parseInt(model.get('order'));
	    }
		
	});
	
	collections.ComparableDerivatives = Backbone.Collection.extend({
		model: m.ComparableDerivative
	});
	
	collections.ComparableCategories = Backbone.Collection.extend({
		model: m.ComparableCategory
	});
	
	collections.Tables = Backbone.Collection.extend({
		model: m.Table
	});
	
	collections.Rows = Backbone.Collection.extend({
		model: m.Row
	});
	
	collections.Columns = Backbone.Collection.extend({
		model: m.Column
	});
	
	collections.ComparableFeatures = Backbone.Collection.extend({
		model : m.ComparableFeature
	});
	
	return collections;
	
})(window, document, ComparatorModels, jQuery);