/**
 * @author Dawood Butt
 * @description collections for offer module
 * @project Latest Offers
 */
//(function(window, document, $, undefined){$(document).on('ready', function() {
	/*if (typeof ND.LO.Config === 'undefined')
	{
		var $configData = $('#rest-services');
		if ($configData.length > 0) {
			//console.log('Latest Offers config was found');
			ND.LO.Config = JSON.parse($configData.html());
		} else {
			console.log('Latest Offers config was NOT found');
		}
		
	}*/

	ND.LO.Collections.HotDealsCampaigns = Backbone.Collection.extend({
		model: ND.LO.Models.HotDealCampaign,
		//localStorage: new Backbone.LocalStorage('category-features-backbone'),
		//url: ND.LO.Functions.serviceLocator("derivative.category-features"),
		initialize: function(){
			//console.log("ND.LO.Collections.categoryFeatures Initialized.");
			this.url = ND.LO.Functions.serviceLocator("offersURL");
		}
	});
	
	ND.LO.Collections.Offers = Backbone.Collection.extend({
		model: ND.LO.Models.Offer,
		//localStorage: new Backbone.LocalStorage('offers-backbone'),
		//url: ND.LO.Functions.serviceLocator("offersURL"),
		initialize: function(){
			//console.log("ND.LO.Collections.Offers Initialized.");
			this.url = ND.LO.Functions.serviceLocator("offersURL");
			 /*this.fetch({
				success: this.fetchSuccess,
				error: this.fetchError
			});
			this.deferred = new $.Deferred();*/
		},
		parse: function (response) {
			//HotDeals = new ND.LO.Collections.Offers();
			//HotDeals.add(response.HotDeals);        
			//this.set({HotDeals: HotDeals});

			//campaigns = new ND.LO.Collections.Offers();
			//campaigns.add(response.campaigns);        
			//this.set({campaigns: campaigns});
		   return response.HotDeals;
		},
		/*parse: function(response) {

		},*/ 
		/*deferred: Function.constructor.prototype,
			fetchSuccess: function (collection, response) {
				collection.deferred.resolve();
		},
		fetchError: function (collection, response) {
			throw new Error("Offers fetch did get collection from API");
		},*/

		///////////////////++++SORT++++///////////////////
		comparator: function(offer) {
			//debugger;
			//return offer.offerPrice;
		  	return offer.get("order");
		  	//return [offer.get("offerPrice"), offer.get("title")]
		},
		byPrice: function(direction) {
			/*var sortedCollection = new ND.LO.Collections.Offers(this.models);
			sortedCollection.comparator = function(offer) {
				return offer.offerPrice;
			};
			sortedCollection.sort();
			return sortedCollection;*/
//debugger;
				if (ND.LO.Variables.priceSortDirection === "ASC")
				{
					ND.LO.Variables.priceSortDirection = 'DESC';
					//$(".price-filter").addClass("downarrow");
					return this.sortedBy(function(offer) {
						return offer.get("offerprice");
					});
				}
				else if (ND.LO.Variables.priceSortDirection === "DESC")
				{
					ND.LO.Variables.priceSortDirection = 'ASC';
					//$(".price-filter").removeClass('downarrow');
					return this.sortedBy(function(offer) {
						return -offer.get("offerprice");
					});
				}
		},
		byDefault: function() {
			/*var sortedCollection = new ND.LO.Collections.Offers(this.models);
			sortedCollection.comparator = function(offer) {
				return offer.offerPrice;
			};
			sortedCollection.sort();
			return sortedCollection;*/
			return this.sortedBy(function(offer) {
				//return offer.order;
				return offer.get("order");
			});
		},

		sortedBy: function(comparator) {
			//debugger;
			var sortedCollection = ND.LO.Offers.filter();
			//var sortedCollection = new ND.LO.Collections.Offers(this.models);

			var sortedCollection = new ND.LO.Collections.Offers(this.models).filter();
			sortedCollection.comparator = comparator;
			sortedCollection.sort();
			return sortedCollection;
		},
		///////////////////----SORT----///////////////////

		///////////////////++++FILTER++++///////////////////
		filter: function() {
			/*var filteredOffers = this.select(function(offer) {
				//return offer.get('completed_at') !== null;
				return offer.isComplete();
			});
			return new ND.LO.Collections.Offers(filteredOffers);*/
			return this.filtered(function(offer) {
				return offer.isFilterOffer();
			});
		},
		filtered: function(criteriaFunction) {
			//debugger;
			//return new  ND.LO.Collections.Offers(this.select(criteriaFunction));
			return new ND.LO.Collections.Offers(this.select(criteriaFunction));
		},
		filterOffer : function(offer){
			//debugger;
			return _(this.filter(function(offer) {
				return offer.isFilterOffer();
			}));
		}
		///////////////////----FILTER----///////////////////
	});

	//_.extend(ND.LO.Collections.Offers.prototype, FilterableCollectionMixin);
	//_.extend(ND.LO.Collections.Offers.prototype, SortableCollectionMixin);
	
	ND.LO.Collections.DerivativeCategoryFeatures = Backbone.Collection.extend({
		model: ND.LO.Models.DerivativeCategoryFeature,
		//localStorage: new Backbone.LocalStorage('category-features-backbone'),
		//url: ND.LO.Functions.serviceLocator("derivative.category-features"),
		initialize: function(){
			//console.log("ND.LO.Collections.categoryFeatures Initialized.");
			this.url = ND.LO.Functions.serviceLocator("derivative.category-features");
		}
	});
	
	ND.LO.Collections.CategoryFeatures = Backbone.Collection.extend({
		model: ND.LO.Models.categoryFeature,
		//localStorage: new Backbone.LocalStorage('category-features-backbone'),
		//url: ND.LO.Functions.serviceLocator("derivative.category-features"),
		initialize: function(){
			//console.log("ND.LO.Collections.categoryFeatures Initialized.");
			this.url = ND.LO.Functions.serviceLocator("derivative.category-features");
		},
		parse: function (response) {
		   return response.derivatives;
		}
	});
	
	ND.LO.Collections.Categories = Backbone.Collection.extend({
		model: ND.LO.Models.Category,
		//localStorage: new Backbone.LocalStorage('categories-backbone'),
		//url: ND.LO.Functions.serviceLocator("derivative.category-features"),
		initialize: function(){
			//console.log("ND.LO.Collections.Categories Initialized.");
			this.url = ND.LO.Functions.serviceLocator("derivative.category-features");
		},
		parse: function (response) {
		   return response.categories;
		}
	});
	
	

	
//});})(window, document, jQuery);