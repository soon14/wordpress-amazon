ND.CP.Collections = (function($, Backbone, models) {

	var collections = {};

	collections.CPDerivative = Backbone.Collection.extend({
		model : models.CPDerivative
	});

	collections.CPColour = Backbone.Collection.extend({

		model: models.CPColour,

		buildUrl : function(id) {
			this.url = this.baseUrl.replace('{derivativeId}', id);
		}

	});

	collections.CPTrim = Backbone.Collection.extend({
		model : models.CPTrim,
		initialize : function(trimsArray) {
			_.each(trimsArray, function(model){
				this.collection.add(new models.CPTrim(
					{
						name: model.name,
						imageURL: model.imageURL
					}
				));
			}, this);
		}
	});

	return collections;

})(jQuery, Backbone, ND.CP.Models);