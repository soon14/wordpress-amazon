/**
 * global self executing function

 */

ND.CP = window.ND.CP || {};

ND.CP.Models = (function($, Backbone, undefined) {

	var models = {};

	models.CPDerivative = Backbone.Model.extend({});

	models.CPColour = Backbone.Model.extend({});

	models.CPTrim = Backbone.Model.extend({});

	return models;

})(jQuery, Backbone);