/**
 * @author Dawood Butt
 * @description collections for filter module
 * @project Latest Offers
 */
//(function(window, document, $, undefined){$(document).on('ready', function() {
/*	if (typeof ND.LO.Config === 'undefined')
	{
		var $configData = $('#rest-services');
		if ($configData.length > 0) {
			//console.log('Latest Offers config was found');
			ND.LO.Config = JSON.parse($configData.html());
		} else {
			console.log('Latest Offers config was NOT found');
		}
	}*/

	ND.LO.Collections.Filters = Backbone.Collection.extend({
	//ND.LO.Collections.Filters = Backbone.CachedModel.extend({
		//cacheObject: ND.LO.Variables.globalCache,
		
		model: ND.LO.Models.Filter,
		//localStorage: new Backbone.LocalStorage('filters-backbone'),
		//url: ND.LO.Config.filtersURL,
		url:  '',
		initialize: function(){
			//console.log("ND.LO.Collections.Filters Initialized.");
			/* var userId = this.get('id');
			if (userId) {
				this.cacheKey = "UserPermissions_" + userId;
			}*/
		},
		parse: function (response) {
		   return response.filters;
		}
	});
	
	/*ND.LO.Collections.Campaigns = Backbone.Collection.extend({
		model: ND.LO.Models.Campaign,
		//localStorage: new Backbone.LocalStorage('campaigns-backbone'),
		//url: ND.LO.Functions.serviceLocator("offersURL"),
		initialize: function(){
			//console.log("ND.LO.Collections.Campaigns Initialized.");
			this.url = ND.LO.Functions.serviceLocator("offersURL");
		},
		parse: function (response) {
		   return response.campaigns;
		}
	});*/
	ND.LO.Collections.ModelsDerivativs = Backbone.Collection.extend({
		model: ND.LO.Models.ModelsDerivative,
		//localStorage: new Backbone.LocalStorage('models-derivativs-backbone'),
		//url: ND.LO.Functions.serviceLocator("model.derivatives"),
		initialize: function(){
			//console.log("ND.LO.Collections.ModelsDerivativs Initialized.");
			this.url = ND.LO.Functions.serviceLocator("model.derivatives");
		},
		comparator: function(model) {
		  	return model.get("name");
		}
	});
	
//});})(window, document, jQuery);