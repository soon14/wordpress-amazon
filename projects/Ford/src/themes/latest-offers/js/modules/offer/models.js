/**
 * @author Dawood Butt
 * @description models for offer module
 * @project Latest Offers
 */
//(function(window, document, $, undefined){$(document).on('ready', function() {

	// Reusable Mixin,
	//FilterableCollectionMixin
	/*var FilterableCollectionMixin = {
		filtered: function(criteriaFunction) {
			var sourceCollection = this;
			var filteredCollection = new this.constructor;
			var applyFilter = function() {
				filteredCollection.reset(sourceCollection.select(criteriaFunction));
			};
			this.bind("change", applyFilter);
			this.bind("add", applyFilter);
			this.bind("remove", applyFilter);
			applyFilter();
			return filteredCollection;
			//return new this.constructor(this.select(criteriaFunction));
		}
	};*/// End of FilterableCollectionMixin.

	//SortableCollectionMixin
	/*var SortableCollectionMixin = {
		sortedBy: function(comparator) {
				//var sortedCollection = new this.constructor(this.models);
//				sortedCollection.comparator = comparator;
//				sortedCollection.sort();
//				return sortedCollection;
				var sourceCollection = this;
				var sortedCollection = new this.constructor;
				sortedCollection.comparator = comparator;
				var applySort = function() {
					sortedCollection.reset(sourceCollection.models);
					sortedCollection.sort();
				};
				this.on("change", applySort);
				this.on("add", applySort);
				this.on("remove", applySort);
				applySort();
				return sortedCollection;
			}
	};*/ // End of SortableCollectionMixin
	///////////////////////////////////////////////////////////
	ND.LO.Models.Offer = Backbone.Model.extend({
		/*initialize : function() {
			// the following line forces 'this' to refer to the Hotdeal instance in the 
			// function `fetch_success`
			_.bindAll(this, 'fetch_success');
			this.bind('change', this.fetch_success);
		  },
		  // specifying the URL as a function gives us a bit more flexibility
		  url : function() {
			return ND.LO.Config.offersURL;
		  },
		  // invoked automatically when the change event is invoked which happens when fetch is successful
		  fetch_success : function() {
			 this.HotDeals = this.get('HotDeals');
			 this.campaigns = this.get('campaigns');
		  },*/
			defaults: {
				  order: -1,
				  id: "",
				  uriparameter: "",
				  nameplatename: "",
				  nameplatecks: "",
				  nameplateId: "",
				  derivativeId: "",
				  derivativename: "",
				  derivativemarketingname: "",
				  derivativecks: "",
				  pricedisclaimer: "",
				  blurbs: "",
				  features: "",
				  logo1: "",
				  logo2: "",
				  logo3: "",
				  differentiatorlabel1: "",
				  differentiatorlabel2: "",
				  differentiatorlabel3: "",
				  localdisclaimer: "",
				  offerprice: "",
				  offerregion: "",
				  campaigns: [],
				  category: "",
				  status: "",
				  createdby: "",
				  createddate: "",
				  updatedby: "",
				  updateddate: "",
				  name: "",
				  template: "",
				  expiryDate: "",
				  indexImage: "",
				  indexImageMainUrl: "",
				  indexImageThumbnailUrl: "",
				  smobIndexImage: "",
				  smobIndexImageMainUrl: "",
				  smobIndexImageThumbnailUrl: "",
				  heroImage: "",
				  heroImageMainUrl: "",
				  heroImageThumbnailUrl: "",
				  smobHeroImage: "",
				  smobHeroImageMainUrl: "",
				  smobHeroImageThumbnailUrl: "",
				  hotDealUrl: "",
				  hotDealSmobUrl: "",
				  categoryFeatures: {}
			},
			/*parse: function(response) {
				delete response.campaigns;
				return response;
				
				//var HotDealsJSON = response.HotDeals;
				//var HotDealsCollection = ND.LO.Collections.Offers(HotDealsJSON);
				//response.HotDeals = HotDealsCollection;
				//return response;
			},*/
			/*initialize: function(){
				this.set({
					 HotDeals: new ND.LO.Collections.Offers(this.get('HotDeals')),
					 campaigns: new ND.LO.Collections.Offers(this.get('campaigns')),
				});
			},*/

			isFilterOffer: function() {
				
				//return this.get('categoryFeatures')['categories'][0]['features'][0].value == 'H'; //&& 
				//this.get('categoryFeatures') < ND.LO.Variables.Price[1];
				//debugger;
				//return this.get("categoryFeatures")["categories"][0]["features"][0].value == "H";
//return this.get("categoryFeatures")["categories"][0]["features"][0].value.indexOf("U") != -1;
				//debugger;
				return eval(this.filterCriterion(this.get("campaigns")));
			},

			filterCriterion: function(offerCampaigns) {
				
				
				//debugger;
				for (var filter in ND.LO.Variables.FilteringAnswers) {
					
					var filteredAnswers = ND.LO.Variables.FilteringAnswers[filter];
					if (filteredAnswers.length > 0)
					{
						if (filter == "Offer")
						{
							var filterCriteria = '';
							for (var filterAnswer in filteredAnswers)
							{
								// important check that this is objects own property 
							  	// not from prototype filterAnswer inherited
							  	if(filteredAnswers.hasOwnProperty(filterAnswer))
								{
									//debugger;
									if (offerCampaigns.length > 0)
									{
										//debugger;
										for (var campaign in offerCampaigns)
										{
											if (filterCriteria == '')
											{
												filterCriteria = 'this.get("campaigns")['+campaign+'] == "'+filteredAnswers[filterAnswer]+'"';
											}
											else
											{
												filterCriteria = filterCriteria + ' || this.get("campaigns")['+campaign+'] == "'+filteredAnswers[filterAnswer]+'"';
											}
										}
									}
									//alert(filterAnswer + " = " + filteredAnswers[filterAnswer]);
								}
							}
							this.insertFilterCriteria(filterCriteria);
						}
						else if (filter == "BodyType")
						{
							////////////////////////////////////
							//debugger;
							/*var reqIndex = -1;
							var filterdFilters = _.where( ND.LO.Functions.getFilterJSON(), {type: 'SpecFeatures'} );
							for (var itr in filterdFilters)
							{
								//console.log( filterdFilters[itr].label.split(' ').join('').split('/').join('-').split('&').join('-').toLowerCase() );
								
								if ( filterdFilters[itr].label.toLowerCase().indexOf("body") > -1 );
								{
									reqIndex = itr;
									break;
								}
							}*/
							
							/*for (var i in this.getFilterJSON()) {
								alert(this.getFilterJSON()[i]["label"]);
							}*/
							///////////////////////////////////////////////////////
							///////////////////////////////////////////////////////
							/*if (reqIndex != -1)
							{
								var indexFilters = this.computeIndex("Filters", filterdFilters[reqIndex].label)[0];
								var indexBody = this.computeIndex("Filters", filterdFilters[reqIndex].label)[1];
								
							}
							else
							{
								var indexFilters = this.computeIndex("Filters", "Body Type")[0];
								var indexBody = this.computeIndex("Filters", "Body Type")[1];
							}*/
							var indexFilters = this.computeIndex("Filters", "Body Type")[0];
							var indexBody = this.computeIndex("Filters", "Body Type")[1];
							////////////////////////////////////
							var filterCriteria = '';
							for (var filterAnswer in filteredAnswers)
							{
								// important check that this is objects own property 
							  	// not from prototype filterAnswer inherited
							  	if(filteredAnswers.hasOwnProperty(filterAnswer))
								{
									
									//alert(filterAnswer + " = " + filteredAnswers[filterAnswer]);
									
									var featureCounter = 0;
									for (var feature in this.get("categoryFeatures"))
									{featureCounter++;}
									if (featureCounter != 0)
									{
										if (indexFilters != -1 && indexBody != -1)
										{
											//debugger;
											if (typeof(this.get("categoryFeatures")["categories"][indexFilters]["features"][indexBody].value) !== 'undefined')
											{
												var evalStr = 'this.get("categoryFeatures")["categories"]['+indexFilters+']["features"]['+indexBody+'].value.indexOf("'+filteredAnswers[filterAnswer]+'")';

												if (filterCriteria == '')
												{
													//var evalStr = 'this.get("categoryFeatures")["categories"]['+indexFilters+']["features"]['+indexBody+'].value';
													//filterCriteria = evalStr+' == "'+filteredAnswers[filterAnswer]+'"';
													filterCriteria = evalStr+' != -1';
												}
												else
												{
													filterCriteria = filterCriteria + ' || '+evalStr+' != -1';
												}
											}
											else
											{
												if (filterCriteria == '')
												{
													filterCriteria = 'false';
												}
												else
												{
													filterCriteria = filterCriteria + ' && false';
												}
											}
										}
									}
								}
							}
							this.insertFilterCriteria(filterCriteria);
							////////////////////////////////////
						}
						else if (filter == "FuelType")
						{
							/////////////////
							/*var reqIndex = -1;
							var filterdFilters = _.where( ND.LO.Functions.getFilterJSON(), {type: 'SpecFeatures'} );
							debugger;
							for (var itr in filterdFilters)
							{
								//console.log( filterdFilters[itr].label.split(' ').join('').split('/').join('-').split('&').join('-').toLowerCase() );
								
								if ( filterdFilters[itr].label.toLowerCase().indexOf("fuel") > -1 );
								{
									reqIndex = itr;
									break;
								}
							}*/
							////////////////////////////////////
							/*if (reqIndex != -1)
							{
								var indexFilters = this.computeIndex("Filters", filterdFilters[reqIndex].label)[0];
								var indexFuel = this.computeIndex("Filters", filterdFilters[reqIndex].label)[1];
								
							}
							else
							{
								var indexFilters = this.computeIndex("Filters", "Fuel Type")[0];
								var indexFuel = this.computeIndex("Filters", "Fuel Type")[1];
							}*/
							var indexFilters = this.computeIndex("Filters", "Fuel Type")[0];
							var indexFuel = this.computeIndex("Filters", "Fuel Type")[1];
							////////////////////////////////////
							var filterCriteria = '';
							for (var filterAnswer in filteredAnswers)
							{
								// important check that this is objects own property 
							  	// not from prototype filterAnswer inherited
							  	if(filteredAnswers.hasOwnProperty(filterAnswer))
								{
									//alert(filterAnswer + " = " + filteredAnswers[filterAnswer]);
									var featureCounter = 0;
									for (var feature in this.get("categoryFeatures"))
									{featureCounter++;}
									if (featureCounter != 0)
									{
										if (indexFilters != -1 && indexFuel != -1)
										{
											//debugger;
											if (typeof(this.get("categoryFeatures")["categories"][indexFilters]["features"][indexFuel].value) !== 'undefined')
											{
												var evalStr = 'this.get("categoryFeatures")["categories"]['+indexFilters+']["features"]['+indexFuel+'].value.indexOf("'+filteredAnswers[filterAnswer]+'")';

												if (filterCriteria == '')
												{
													//var evalStr = 'this.get("categoryFeatures")["categories"]['+indexFuel+']["features"]['+indexBody+'].value';
													//filterCriteria = evalStr+' == "'+filteredAnswers[filterAnswer]+'"';
													filterCriteria = evalStr+' != -1';
												}
												else
												{
													filterCriteria = filterCriteria + ' || '+evalStr+' != -1';
												}
											}
											else
											{
												if (filterCriteria == '')
												{
													filterCriteria = 'false';
												}
												else
												{
													filterCriteria = filterCriteria + ' && false';
												}
											}
										}
									}
								}
							}
							this.insertFilterCriteria(filterCriteria);
							////////////////////////////////////
						}
						else if (filter == "Towing")
						{
							//debugger;
							////////////////////////////////////
							var indexFilters = this.computeIndex("Filters", "Towing")[0];
							var indexTowing = this.computeIndex("Filters", "Towing")[1];
							////////////////////////////////////
							var filterCriteria = '';
							for (var filterAnswer in filteredAnswers)
							{
								// important check that this is objects own property 
							  	// not from prototype filterAnswer inherited
							  	if(filteredAnswers.hasOwnProperty(filterAnswer))
								{
									//alert(filterAnswer + " = " + filteredAnswers[filterAnswer]);
									var featureCounter = 0;
									for (var feature in this.get("categoryFeatures"))
									{featureCounter++;}
									if (featureCounter != 0)
									{
										if (indexFilters != -1 && indexTowing != -1)
										{
											//debugger;
											if (typeof(this.get("categoryFeatures")["categories"][indexFilters]["features"][indexTowing].value) !== 'undefined')
											{
												var evalStr = 'this.get("categoryFeatures")["categories"]['+indexFilters+']["features"]['+indexTowing+'].value.indexOf("'+filteredAnswers[filterAnswer]+'")';

												if (filterCriteria == '')
												{
													//var evalStr = 'this.get("categoryFeatures")["categories"]['+indexTowing+']["features"]['+indexBody+'].value';
													//filterCriteria = evalStr+' == "'+filteredAnswers[filterAnswer]+'"';
													filterCriteria = evalStr+' != -1';
												}
												else
												{
													filterCriteria = filterCriteria + ' || '+evalStr+' != -1';
												}
											}
											else
											{
												if (filterCriteria == '')
												{
													filterCriteria = 'false';
												}
												else
												{
													filterCriteria = filterCriteria + ' && false';
												}
											}
										}
									}
								}
							}
							this.insertFilterCriteria(filterCriteria);
							////////////////////////////////////
						}
						else if (filter == "Price")
						{
							//alert(filterAnswer + " = " + filteredAnswers[filterAnswer]);
							if (ND.LO.Variables.filterVar == '')
							{
								ND.LO.Variables.filterVar = '( this.get("offerprice") >= '+filteredAnswers[0]+' && this.get("offerprice") <= '+filteredAnswers[1]+' )';
							}
							else
							{
								ND.LO.Variables.filterVar = ND.LO.Variables.filterVar + ' && ( this.get("offerprice") >= '+filteredAnswers[0]+' && this.get("offerprice") <= '+filteredAnswers[1]+' )';
							}
						}
						else if (filter == "Models")
						{
							var filterCriteria = '';
							for (var filterAnswer in filteredAnswers)
							{
								// important check that this is objects own property 
							  	// not from prototype filterAnswer inherited
							  	if(filteredAnswers.hasOwnProperty(filterAnswer))
								{
									//alert(filterAnswer + " = " + filteredAnswers[filterAnswer]);
									if (filterCriteria == '')
									{
										filterCriteria = 'this.get("nameplateId") == "'+filteredAnswers[filterAnswer]+'"';
									}
									else
									{
										filterCriteria = filterCriteria + ' || this.get("nameplateId") == "'+filteredAnswers[filterAnswer]+'"';
									}
								}
							}
							this.insertFilterCriteria(filterCriteria);
							
						}
					}
				}
				//debugger;
				var filterVar = ND.LO.Variables.filterVar;
				//debugger;
				ND.LO.Variables.filterVar = '';
				//debugger;
				return filterVar;
			},

			insertFilterCriteria: function(filterCriteria) {
				if (filterCriteria != '')
				{
					if (ND.LO.Variables.filterVar == '')
					{
						ND.LO.Variables.filterVar = '('+filterCriteria+')';
					}
					else
					{
						ND.LO.Variables.filterVar = ND.LO.Variables.filterVar +' && ( '+filterCriteria+' )';
					}
					
				}
			},
			computeIndex: function(filter, feature) {
				var filterIndex = -1;
				var featureIndex = -1;
				$(ND.LO.Variables.catCollection.toJSON()).each(function(key, val) {
					if (val.name == filter)
					{
						filterIndex = key;
						$(val.features).each(function(keyFeatures, valFeatures) {
							if (valFeatures.name == feature)
							{
								featureIndex = keyFeatures;
								return false;
							}
							//console.log(keyFeatures+'|'+valFeatures)
						});
						return false;
					}
					//console.log(key+'|'+val);
				});
				/////////////////
				return [filterIndex, featureIndex];
				/////////////////
			}			
		});

		ND.LO.Models.HotDealCampaign = Backbone.Model.extend({
			defaults: {
					HotDeals: [],
					campaigns: []
			}
		});

		ND.LO.Models.DerivativeCategoryFeature = Backbone.Model.extend({
			defaults: {
					derivatives: [],
					categories: []
			}
		});

		ND.LO.Models.categoryFeature = Backbone.Model.extend({
			defaults: {
				derivativeId: "",
				name: "",
				thumbnailURL: "",
				imageId: "",
				nameplateId: "",
				categories: [
					{
						id: "",
						features: [
							{
								value: "",
								id: "",
								featureUrl: ""
							}
						]
					}
				]
			}
		});
		ND.LO.Models.Category = Backbone.Model.extend({
			defaults: {
				name: "",
				id: "",
				features: [
					{
						name: "",
						id: "",
						note: ""
					}
				]
			}
		});

//});})(window, document, jQuery);